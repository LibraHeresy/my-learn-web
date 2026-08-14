import {
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  unlink,
  writeFile,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkDirective from "remark-directive";
import type {
  BlockAttrs,
  BlockName,
  BlockNode,
  BlockType,
  CompiledLesson,
  CompiledProjectMeta,
  CompiledProjectStep,
  ContentBodyNode,
  ContentMeta,
  TaskBlockNode,
  TaskStep,
} from "../src/content-runtime/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const lessonsRoot = path.join(projectRoot, "src", "content", "lessons");
const prologueRoot = path.join(projectRoot, "src", "content", "prologue");
const projectsRoot = path.join(projectRoot, "src", "content", "projects");
const generatedDir = path.join(projectRoot, "src", "generated");
const lessonsMetaFile = path.join(generatedDir, "lessons-meta.json");
const lessonsOutDir = path.join(generatedDir, "lessons");
const projectsMetaFile = path.join(generatedDir, "projects-meta.json");
const projectsOutDir = path.join(generatedDir, "projects");
const generatedTaxonomyFile = path.join(generatedDir, "taxonomy.json");
const searchIndexFile = path.join(generatedDir, "search-index.json");
const glossarySourceFile = path.join(
  projectRoot,
  "src",
  "content",
  "glossary",
  "terms.yaml",
);
const glossaryGeneratedFile = path.join(generatedDir, "glossary.json");
const taxonomySourceFile = path.join(
  projectRoot,
  "src",
  "content",
  "taxonomy.yaml",
);
const quizSourceDir = path.join(projectRoot, "src", "content", "quiz");
const generatedQuizFile = path.join(generatedDir, "quiz.json"); // 旧格式，仅用于清理
const generatedQuizGemsFile = path.join(generatedDir, "quiz-gems.json");
const generatedQuizQuestionsDir = path.join(generatedDir, "quiz-questions");
const buildCacheFile = path.join(generatedDir, ".build-cache.json");

// ---------- 增量编译：文件 Hash 缓存 ----------

interface BuildCache {
  compiler: string;
  glossary: string;
  taxonomy: string;
  lessons: Record<string, string>; // lessonDir 相对路径 -> hash
  projects: Record<string, string>; // projectDir 相对路径 -> hash
  quiz: Record<string, string>; // 文件名 -> hash
}

async function loadBuildCache(): Promise<BuildCache> {
  try {
    const raw = await readFile(buildCacheFile, "utf8");
    const parsed = JSON.parse(raw) as Partial<BuildCache>;
    return {
      compiler: typeof parsed.compiler === "string" ? parsed.compiler : "",
      glossary: typeof parsed.glossary === "string" ? parsed.glossary : "",
      taxonomy: typeof parsed.taxonomy === "string" ? parsed.taxonomy : "",
      lessons:
        parsed.lessons && typeof parsed.lessons === "object"
          ? (parsed.lessons as Record<string, string>)
          : {},
      projects:
        parsed.projects && typeof parsed.projects === "object"
          ? (parsed.projects as Record<string, string>)
          : {},
      quiz:
        parsed.quiz && typeof parsed.quiz === "object"
          ? (parsed.quiz as Record<string, string>)
          : {},
    };
  } catch {
    return {
      compiler: "",
      glossary: "",
      taxonomy: "",
      lessons: {},
      projects: {},
      quiz: {},
    };
  }
}

async function saveBuildCache(cache: BuildCache): Promise<void> {
  await writeFile(
    buildCacheFile,
    JSON.stringify(cache, null, 2) + "\n",
    "utf8",
  );
}

async function hashFiles(filePaths: string[]): Promise<string> {
  const hash = createHash("md5");
  for (const fp of filePaths) {
    try {
      const content = await readFile(fp, "utf8");
      hash.update(content);
    } catch {
      hash.update("");
    }
  }
  return hash.digest("hex");
}

async function hashLessonDir(lessonDir: string, mode: string): Promise<string> {
  const files = [
    path.join(lessonDir, "meta.yaml"),
    path.join(lessonDir, "lesson.md"),
  ];
  if (mode === "sandbox") {
    files.push(
      path.join(lessonDir, "starter", "index.html"),
      path.join(lessonDir, "starter", "style.css"),
      path.join(lessonDir, "starter", "script.js"),
    );
  }
  return hashFiles(files);
}

async function hashProjectDir(projectDir: string): Promise<string> {
  const metaPath = path.join(projectDir, "meta.yaml");
  const jsonPath = path.join(projectDir, "project.json");

  const extraFiles: string[] = [];
  try {
    const raw = await readFile(jsonPath, "utf8");
    const parsed = JSON.parse(raw) as {
      steps?: Array<Record<string, unknown>>;
    };
    if (Array.isArray(parsed.steps)) {
      const fields = [
        "content",
        "task",
        "hint",
        "purpose",
        "expectedResult",
      ] as const;
      for (const step of parsed.steps) {
        for (const field of fields) {
          const v = step[field];
          if (!v || typeof v !== "object") continue;
          const mdFile = (v as any).mdFile;
          if (typeof mdFile !== "string") continue;
          if (!mdFile.endsWith(".md")) continue;
          const resolved = path.resolve(projectDir, mdFile);
          const rel = path.relative(projectDir, resolved);
          if (rel.startsWith("..") || path.isAbsolute(rel)) continue;
          extraFiles.push(resolved);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  const unique = Array.from(new Set([metaPath, jsonPath, ...extraFiles]));
  return hashFiles(unique);
}

async function atomicWriteFile(filePath: string, data: string): Promise<void> {
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.${Math.random().toString(16).slice(2)}.tmp`;
  await writeFile(tmpPath, data, "utf8");
  try {
    await rename(tmpPath, filePath);
  } catch (error) {
    try {
      await unlink(tmpPath);
    } catch (e) {
      console.log(e);
    }
    throw error;
  }
}

const allowedModes = new Set(["sandbox", "local"]);
const allowedBlockNames = new Set<BlockName>([
  "analogy",
  "prerequisite",
  "explain",
  "example",
  "task",
  "hint",
  "recap",
  "diagram",
  "predict",
]);

function isBlockName(value: string): value is BlockName {
  return allowedBlockNames.has(value as BlockName);
}

function toBlockType(name: BlockName): BlockType {
  return `block:${name}` as BlockType;
}

type GlossaryEntry = {
  key: string;
  explanation: string;
  analogy?: string;
  priority?: "core" | "important" | "extended";
  related?: string[];
};

function parseGlossaryYaml(input: string): GlossaryEntry[] {
  const parsed = yaml.load(input);
  if (!Array.isArray(parsed)) return [];

  const allowedPriorities = new Set(["core", "important", "extended"]);

  return parsed.flatMap((item) => {
    if (!item || typeof item !== "object") return [];

    const record = item as Record<string, unknown>;
    if (
      typeof record.key !== "string" ||
      typeof record.explanation !== "string"
    )
      return [];

    const priority =
      typeof record.priority === "string" &&
      allowedPriorities.has(record.priority)
        ? (record.priority as GlossaryEntry["priority"])
        : undefined;

    const related = Array.isArray(record.related)
      ? record.related.filter(
          (value): value is string =>
            typeof value === "string" && value.trim().length > 0,
        )
      : undefined;

    return [
      {
        key: record.key,
        explanation: record.explanation,
        analogy:
          typeof record.analogy === "string" ? record.analogy : undefined,
        priority,
        related: related?.length ? related : undefined,
      },
    ];
  });
}

function escapeTermKey(key: string): string {
  return key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function injectTerms(text: string, termKeys: string[]): string {
  if (!text) return text;
  if (!termKeys.length) return text;

  const protectRegex =
    /\{\{term:[^}]+\}\}|```[\s\S]*?```|:::\w+\{[^}]*\}|`[^`\n]*`|\[[^\]]+\]\([^)]+\)/g;
  const protectedParts: Array<{ start: number; end: number; value: string }> =
    [];

  for (const match of text.matchAll(protectRegex)) {
    const index = match.index ?? 0;
    protectedParts.push({
      start: index,
      end: index + match[0].length,
      value: match[0],
    });
  }

  let output = "";
  let cursor = 0;
  for (const part of protectedParts) {
    if (part.start > cursor) {
      output += injectTermsInPlain(text.slice(cursor, part.start), termKeys);
    }
    output += part.value;
    cursor = part.end;
  }
  if (cursor < text.length)
    output += injectTermsInPlain(text.slice(cursor), termKeys);
  return output;
}

function injectTermsInPlain(text: string, termKeys: string[]): string {
  // Sort by length descending: process longer keys first to minimize nesting
  const sorted = [...termKeys].sort((a, b) => b.length - a.length);

  // Protected regions: {{term:...}} markers and backtick code
  const markerRegex = /\{\{term:[^}]+\}\}|`[^`\n]*`/g;

  function replaceInUnprotected(
    input: string,
    regex: RegExp,
    replacement: string,
  ): string {
    const markers: Array<{ start: number; end: number }> = [];
    for (const m of input.matchAll(markerRegex)) {
      markers.push({ start: m.index!, end: m.index! + m[0].length });
    }
    let out = "";
    let cursor = 0;
    for (const mk of markers) {
      if (mk.start > cursor) {
        out += input.slice(cursor, mk.start).replace(regex, replacement);
      }
      out += input.slice(mk.start, mk.end);
      cursor = mk.end;
    }
    if (cursor < input.length) {
      out += input.slice(cursor).replace(regex, replacement);
    }
    return out;
  }

  let out = text;
  for (const key of sorted) {
    const escaped = escapeTermKey(key);
    const useWordBoundary = /^[A-Za-z0-9_]+$/.test(key);
    const regex = useWordBoundary
      ? new RegExp(`\\b${escaped}\\b`, "g")
      : new RegExp(escaped, "g");
    out = replaceInUnprotected(out, regex, `{{term:${key}}}`);
  }
  return out;
}

function applyGlossaryToBody(
  body: ContentBodyNode[],
  termKeys: string[],
): ContentBodyNode[] {
  if (!termKeys.length) return body;

  return body.map((node) => {
    if (node.type === "paragraph") {
      const t = node.text.trimStart();
      if (t.startsWith(":::") || t.startsWith("::::")) return node;
      return { ...node, text: injectTerms(node.text, termKeys) };
    }
    if (node.type === "heading") return node;
    if (node.type === "term") return node;
    if (node.type === "code") return node;
    // SVG 配图内容不做术语注入（避免 {{term:xxx}} 破坏 SVG 结构）
    if (node.type === "block:diagram") return node;
    if (node.type === "list") {
      return {
        ...node,
        items: node.items.map((item) => ({
          ...item,
          text: injectTerms(item.text, termKeys),
          children: item.children?.map((c) => ({
            ...c,
            text: injectTerms(c.text, termKeys),
          })),
        })),
      };
    }
    if (node.type === "table") {
      return {
        ...node,
        headers: node.headers.map((h) => injectTerms(h, termKeys)),
        rows: node.rows.map((row) =>
          row.map((cell) => injectTerms(cell, termKeys)),
        ),
      };
    }

    // 判别联合展开：保留 discriminant 并更新文本字段，用类型断言维持联合兼容性
    if (node.type === "block:task") {
      const taskNode = node as TaskBlockNode;
      const next: TaskBlockNode = {
        ...taskNode,
        content: injectTerms(taskNode.content, termKeys),
        steps: taskNode.steps.map((step) => ({
          ...step,
          content: injectTerms(step.content, termKeys),
          purpose: step.purpose
            ? injectTerms(step.purpose, termKeys)
            : undefined,
          expected: step.expected
            ? injectTerms(step.expected, termKeys)
            : undefined,
        })),
      };
      return next;
    }
    const next: BlockNode = {
      ...(node as Exclude<BlockNode, TaskBlockNode>),
      content: injectTerms(
        (node as Exclude<BlockNode, TaskBlockNode>).content,
        termKeys,
      ),
    };
    return next;
  });
}

const mdProcessor = unified()
  .use(remarkParse as any)
  .use(remarkDirective as any);

/** Extract raw source substring for an AST node by its position offsets */
function nodeSource(
  src: string,
  node: { position?: { start: { offset?: number }; end: { offset?: number } } },
): string {
  const pos = node.position;
  if (!pos || pos.start.offset === undefined) return "";
  return src.slice(pos.start.offset, pos.end.offset ?? src.length).trim();
}

/**
 * remark-directive 对 :::task 内多个 ::::step 的嵌套有 bug（只嵌入第一个步骤）。
 * 此函数直接从原始文本（已经剥去 :::task{...} 开头和 ::: 结尾）手工解析步骤。
 */
function parseTaskSteps(rawInner: string): {
  content: string;
  steps: TaskStep[];
} {
  const lines = rawInner.split("\n");
  const steps: TaskStep[] = [];
  const nonStepLines: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trimEnd();
    const stepOpen = trimmed.match(/^::::step(?:\{([^}]*)\})?\s*$/);
    if (stepOpen) {
      i += 1;
      const stepLines: string[] = [];
      while (i < lines.length && lines[i].trimEnd() !== "::::") {
        stepLines.push(lines[i]);
        i += 1;
      }
      if (i >= lines.length) throw new Error("Unclosed ::::step block");
      const attrsRaw = stepOpen[1] ?? "";
      const purpose = attrsRaw
        .match(/purpose="((?:[^"\\]|\\.)*)"/)?.[1]
        ?.replace(/\\(.)/g, "$1");
      const expected = attrsRaw
        .match(/expected="((?:[^"\\]|\\.)*)"/)?.[1]
        ?.replace(/\\(.)/g, "$1");
      steps.push({
        content: stepLines.join("\n").trim(),
        purpose: purpose || undefined,
        expected: expected || undefined,
      });
      i += 1; // skip closing ::::
      continue;
    }
    nonStepLines.push(lines[i]);
    i += 1;
  }

  return { content: nonStepLines.join("\n").trim(), steps };
}

function normalizeDirectiveTitleEscapes(input: string): string {
  return input.replace(
    /^:::(?!:)(?!task\b)([a-z][\w-]*)\{([^}]*)\}[ \t]*(?:\r)?$/gim,
    (full, name: string, attrsRaw: string) => {
      const m = attrsRaw.match(/(^|[,\s])title="((?:[^"\\]|\\.)*)"/);
      if (!m) return full;

      const rawTitle = m[2];
      if (!rawTitle.includes('\\"')) return full;

      const decodedTitle = rawTitle.replace(/\\(.)/g, "$1");
      const safeTitle = decodedTitle.includes("'")
        ? decodedTitle.replace(/'/g, "’")
        : decodedTitle;

      const fixedAttrs = attrsRaw.replace(
        /(^|[,\s])title="((?:[^"\\]|\\.)*)"/,
        `$1title='${safeTitle}'`,
      );
      return `:::${name}{${fixedAttrs}}`;
    },
  );
}

function parseLessonMarkdown(input: string): ContentBodyNode[] {
  const normalized = normalizeDirectiveTitleEscapes(input);
  // ── Pre-extract :::task blocks (remark-directive doesn't handle multiple
  //    nested ::::step siblings correctly; pre-extract avoids the issue) ────
  const taskBlocks: BlockNode[] = [];
  let taskIdx = 0;
  const modified = normalized.replace(
    /^:::task([^\n]*)\n([\s\S]*?)^:::[ \t]*(?:\r)?$/gm,
    (_, attrsLine, inner) => {
      const title = attrsLine.match(/\{.*?title="((?:[^"\\]|\\.)*)"/)?.[1];
      const blockAttrs: BlockAttrs | undefined = title ? { title } : undefined;
      const { content, steps } = parseTaskSteps(inner.trim());
      taskBlocks.push({
        type: "block:task",
        name: "task",
        attrs: blockAttrs,
        content,
        steps,
      });
      return `<!-- __task_${taskIdx++}__ -->`;
    },
  );

  // ── Remark parse on the task-free modified string ───────────────────────
  const tree = mdProcessor.parse(modified) as {
    type: string;
    children: unknown[];
  };
  const body: ContentBodyNode[] = [];

  function tryParsePipeTable(
    text: string,
  ): { headers: string[]; rows: string[][] } | null {
    const normalizedText = text.replace(/\r\n/g, "\n").trim();
    const lines = normalizedText.split("\n").map((l) => l.trim());
    if (lines.length < 3) return null;

    const isTableRow = (line: string) => /^\|.+\|$/.test(line);
    const isTableSep = (line: string) => /^\|[\s\-:|]+\|$/.test(line);
    const parseRow = (line: string) =>
      line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());

    if (!isTableRow(lines[0])) return null;
    if (!isTableSep(lines[1])) return null;
    if (!isTableRow(lines[2])) return null;
    if (!lines.every((l, idx) => (idx === 1 ? isTableSep(l) : isTableRow(l))))
      return null;

    const headers = parseRow(lines[0]);
    const rows = lines.slice(2).map(parseRow);
    return { headers, rows };
  }

  function parseListNode(listNode: any, allowChildren: boolean): any {
    const rawItems = (listNode.children ?? []) as any[];
    const items = rawItems.map((li: any) => {
      const liChildren = (li.children ?? []) as any[];
      const main =
        liChildren.find((c: any) => c.type === "paragraph") ?? liChildren[0];
      const text = main ? nodeSource(modified, main) : "";
      const nested = allowChildren
        ? liChildren.find((c: any) => c.type === "list")
        : undefined;
      const children = nested
        ? (parseListNode(nested, false).items as any[])
        : undefined;
      return { text, children };
    });
    return { type: "list", ordered: Boolean(listNode.ordered), items };
  }

  for (const rawNode of tree.children) {
    const node = rawNode as { type: string; [key: string]: unknown };

    // ── Task placeholder ──────────────────────────────────────────────────
    if (node.type === "html") {
      const m = (node.value as string | undefined)?.match(
        /<!--\s*__task_(\d+)__\s*-->/,
      );
      if (m) {
        body.push(taskBlocks[parseInt(m[1])]);
        continue;
      }
    }

    // ── Heading ───────────────────────────────────────────────────────────
    if (node.type === "heading") {
      const raw = nodeSource(modified, node as any);
      body.push({
        type: "heading",
        depth: node.depth as number,
        text: raw.replace(/^#+\s*/, ""),
      });
      continue;
    }

    // ── Paragraph ─────────────────────────────────────────────────────────
    if (node.type === "paragraph") {
      // Special case: single inline code acting as a named code snippet
      // e.g. `html <div class="foo">` – treated as code block with lang prefix
      const children = node.children as unknown[];
      if (children.length === 1) {
        const child = children[0] as { type: string; value?: string };
        if (child.type === "inlineCode") {
          const raw = (child.value ?? "").trim();
          const langMatch = raw.match(
            /^(html|css|js|ts|tsx|jsx|json|yaml|yml|bash|sh)\s+([\s\S]*)$/i,
          );
          if (langMatch) {
            body.push({
              type: "code",
              language: langMatch[1].toLowerCase(),
              code: langMatch[2],
            });
            continue;
          }
        }
      }
      const text = nodeSource(modified, node as any);
      const table = tryParsePipeTable(text);
      if (table) {
        body.push({
          type: "table",
          headers: table.headers,
          rows: table.rows,
        } as any);
        continue;
      }
      body.push({ type: "paragraph", text });
      continue;
    }

    if (node.type === "list") {
      body.push(parseListNode(node as any, true));
      continue;
    }

    // ── Fenced code block ─────────────────────────────────────────────────
    if (node.type === "code") {
      body.push({
        type: "code",
        language: (node.lang as string) || "text",
        code: node.value as string,
      });
      continue;
    }

    // ── Container directive (non-task blocks) ─────────────────────────────
    if (node.type === "containerDirective") {
      const name = node.name as string;
      if (!isBlockName(name as BlockName)) {
        throw new Error(`Unsupported block :::${name}`);
      }
      const bname = name as BlockName;
      const attrs = node.attributes as Record<string, string> | undefined;
      const blockAttrs: BlockAttrs | undefined =
        attrs?.title || attrs?.emoji || attrs?.answer
          ? {
              title: attrs.title,
              emoji: attrs.emoji,
              answer: attrs.answer,
            }
          : undefined;
      const children = (node.children ?? []) as unknown[];
      const content = children
        .map((c: any) => nodeSource(modified, c))
        .join("\n\n")
        .trim();
      // bname 此处绝不是 'task'（task 块已在正则预提取阶段处理），
      // toBlockType 返回值涵盖 BlockType 联合，TypeScript 无法自动收窄，故用类型断言。
      body.push({
        type: toBlockType(bname),
        name: bname,
        attrs: blockAttrs,
        content,
      } as Exclude<BlockNode, TaskBlockNode>);
    }
  }

  return body;
}

function toMeta(data: Record<string, unknown>): ContentMeta {
  const required = [
    "id",
    "title",
    "track",
    "chapter",
    "order",
    "mode",
  ] as const;
  for (const key of required) {
    if (!(key in data)) throw new Error(`Missing required meta field: ${key}`);
  }

  // 兼容 analogy 和旧字段 musicAnalogy
  if (!("analogy" in data) && !("musicAnalogy" in data))
    throw new Error(`Missing required meta field: analogy`);

  if (typeof data.order !== "number")
    throw new Error("meta.order must be a number");
  const mode = String(data.mode);
  if (!allowedModes.has(mode))
    throw new Error("meta.mode must be sandbox or local");

  return {
    id: String(data.id),
    title: String(data.title),
    track: String(data.track),
    chapter: String(data.chapter),
    order: Number(data.order),
    mode: mode as ContentMeta["mode"],
    analogy: String(
      "analogy" in data ? data.analogy : data.musicAnalogy
    ),
  };
}

async function collectLessonDirs(root: string): Promise<string[]> {
  const result: string[] = [];

  async function walk(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });
    const hasMeta = entries.some(
      (entry) => entry.isFile() && entry.name === "meta.yaml",
    );
    const hasLesson = entries.some(
      (entry) => entry.isFile() && entry.name === "lesson.md",
    );
    if (hasMeta && hasLesson) {
      result.push(dir);
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) await walk(path.join(dir, entry.name));
    }
  }

  await walk(root);
  return result;
}

// local 模式课程的"开始前准备"清单（按章节定制，构建期自动注入正文头部）
const LOCAL_PREP: Record<string, string> = {
  "engineering-tooling":
    "本节在本地动手：需要安装 VS Code、Node.js，并打开终端。完成标准：按步骤操作后看到预期输出。",
  "vue-framework":
    "本节在本地动手：需要 Node.js 与 npm/yarn，用终端创建并运行 Vue 项目。",
  "ai-basics":
    "本节在本地动手：准备一个 AI 对话工具（豆包、DeepSeek 等），跟着步骤实际操作。",
  "ai-frontend":
    "本节在本地动手：准备 AI 工具与 VS Code，把 AI 生成的代码在本地运行验证。",
  "ai-project":
    "本节在本地动手：准备 AI 工具、VS Code 与终端，按步骤完成并部署项目。",
  "js-advanced":
    "本节在本地动手：用浏览器 DevTools 的控制台或本地 HTML 文件跟着步骤实操。",
  "async-data":
    "本节在本地动手：用浏览器 DevTools 的控制台或本地 HTML 文件跟着步骤实操。",
};

function injectLocalPrep(
  body: ContentBodyNode[],
  mode: string,
  chapter: string,
): ContentBodyNode[] {
  if (mode !== "local") return body;
  const prep = LOCAL_PREP[chapter];
  if (!prep) return body;
  const prepBlock: ContentBodyNode = {
    type: "block:hint",
    name: "hint",
    attrs: { title: "开始前准备 🧰" },
    content: prep,
  } as ContentBodyNode;
  return [prepBlock, ...body];
}

async function compileLesson(lessonDir: string): Promise<CompiledLesson> {
  const metaPath = path.join(lessonDir, "meta.yaml");
  const lessonPath = path.join(lessonDir, "lesson.md");
  const [metaRaw, lessonRaw] = await Promise.all([
    readFile(metaPath, "utf8"),
    readFile(lessonPath, "utf8"),
  ]);

  let meta: ContentMeta;
  try {
    meta = toMeta(yaml.load(metaRaw) as Record<string, unknown>);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(
      `Failed to parse ${path.relative(projectRoot, metaPath)}: ${msg}`,
    );
  }
  let body: ContentBodyNode[];
  try {
    body = parseLessonMarkdown(lessonRaw);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(
      `Failed to parse ${path.relative(projectRoot, lessonPath)}: ${msg}`,
    );
  }

  let html = "";
  let css = "";
  let js = "";
  if (meta.mode === "sandbox") {
    [html, css, js] = await Promise.all([
      readFile(path.join(lessonDir, "starter", "index.html"), "utf8"),
      readFile(path.join(lessonDir, "starter", "style.css"), "utf8"),
      readFile(path.join(lessonDir, "starter", "script.js"), "utf8"),
    ]);
  }

  return {
    id: meta.id,
    meta,
    body: injectLocalPrep(body, meta.mode, meta.chapter),
    starter: {
      html,
      css,
      js,
    },
  };
}
function toProjectMeta(data: Record<string, unknown>): SourceProjectMeta {
  const required = [
    "id",
    "title",
    "subtitle",
    "icon",
    "track",
    "order",
    "mode",
  ] as const;
  for (const key of required) {
    if (!(key in data))
      throw new Error(`Missing required project meta field: ${key}`);
  }

  // 兼容 analogy 和旧字段 musicAnalogy
  if (!("analogy" in data) && !("musicAnalogy" in data))
    throw new Error(`Missing required project meta field: analogy`);

  if (typeof data.order !== "number")
    throw new Error("project meta.order must be a number");
  const mode = String(data.mode);
  if (!allowedModes.has(mode))
    throw new Error("project meta.mode must be sandbox or local");

  return {
    id: String(data.id),
    title: String(data.title),
    subtitle: String(data.subtitle),
    icon: String(data.icon),
    track: String(data.track),
    order: Number(data.order),
    mode: mode as SourceProjectMeta["mode"],
    analogy: String(
      "analogy" in data ? data.analogy : data.musicAnalogy
    ),
  };
}

type ParsedProject = {
  id: string;
  meta: SourceProjectMeta;
  steps: ResolvedProjectStep[];
};

type SourceProjectMeta = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  track: string;
  order: number;
  mode: "sandbox" | "local";
  analogy: string;
};

type SourceProjectStep = {
  title: string;
  content: SourceMarkdownField;
  task: SourceMarkdownField;
  hint?: SourceMarkdownField;
  purpose?: SourceMarkdownField;
  expectedResult?: SourceMarkdownField;
  starterCode?: {
    html: string;
    css: string;
    js: string;
  };
};

type SourceMarkdownField =
  | string
  | {
      mdFile: string;
    };

type ResolvedProjectStep = {
  title: string;
  content: string;
  task: string;
  hint?: string;
  purpose?: string;
  expectedResult?: string;
  starterCode?: {
    html: string;
    css: string;
    js: string;
  };
};

async function collectProjectDirs(root: string): Promise<string[]> {
  const result: string[] = [];

  async function walk(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });
    const hasMeta = entries.some(
      (entry) => entry.isFile() && entry.name === "meta.yaml",
    );
    const hasProjectJson = entries.some(
      (entry) => entry.isFile() && entry.name === "project.json",
    );
    if (hasMeta && hasProjectJson) {
      result.push(dir);
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) await walk(path.join(dir, entry.name));
    }
  }

  await walk(root);
  return result;
}

function isMarkdownFileRef(value: unknown): value is { mdFile: string } {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record.mdFile === "string";
}

function resolveProjectMdFilePath(projectDir: string, mdFile: string): string {
  if (!mdFile.endsWith(".md")) throw new Error(`mdFile must end with .md`);
  const resolved = path.resolve(projectDir, mdFile);
  const rel = path.relative(projectDir, resolved);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`mdFile must be within the project directory`);
  }
  return resolved;
}

async function readProjectMarkdownField(
  projectDir: string,
  jsonPath: string,
  projectId: string,
  stepTitle: string,
  fieldName: "content" | "task" | "hint" | "purpose" | "expectedResult",
  value: SourceMarkdownField | undefined,
  required: boolean,
): Promise<string | undefined> {
  if (value == null) {
    if (required) {
      throw new Error(
        `Invalid project.json: missing required field "${fieldName}" in project "${projectId}" step "${stepTitle}" (${path.relative(projectRoot, jsonPath)})`,
      );
    }
    return undefined;
  }

  if (typeof value === "string") return value;
  if (!isMarkdownFileRef(value)) {
    throw new Error(
      `Invalid project.json: field "${fieldName}" must be a string or { mdFile: string } in project "${projectId}" step "${stepTitle}" (${path.relative(projectRoot, jsonPath)})`,
    );
  }

  const absPath = resolveProjectMdFilePath(projectDir, value.mdFile);
  try {
    return await readFile(absPath, "utf8");
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(
      `Failed to read ${path.relative(projectRoot, absPath)} referenced by project "${projectId}" step "${stepTitle}" field "${fieldName}" (${path.relative(projectRoot, jsonPath)}): ${msg}`,
    );
  }
}

async function compileProject(projectDir: string): Promise<ParsedProject> {
  const metaPath = path.join(projectDir, "meta.yaml");
  const jsonPath = path.join(projectDir, "project.json");
  const [metaRaw, jsonRaw] = await Promise.all([
    readFile(metaPath, "utf8"),
    readFile(jsonPath, "utf8"),
  ]);

  let meta: SourceProjectMeta;
  try {
    meta = toProjectMeta(yaml.load(metaRaw) as Record<string, unknown>);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(
      `Failed to parse ${path.relative(projectRoot, metaPath)}: ${msg}`,
    );
  }

  const parsed = JSON.parse(jsonRaw) as { steps?: SourceProjectStep[] };
  if (!Array.isArray(parsed.steps)) {
    throw new Error(
      `Invalid project.json: missing steps array in ${path.relative(projectRoot, jsonPath)}`,
    );
  }

  const resolvedSteps: ResolvedProjectStep[] = await Promise.all(
    parsed.steps.map(async (step, index) => {
      const stepTitle =
        typeof step?.title === "string" ? step.title : `#${index + 1}`;

      return {
        title: stepTitle,
        content: (await readProjectMarkdownField(
          projectDir,
          jsonPath,
          meta.id,
          stepTitle,
          "content",
          step?.content,
          true,
        )) as string,
        task: (await readProjectMarkdownField(
          projectDir,
          jsonPath,
          meta.id,
          stepTitle,
          "task",
          step?.task,
          true,
        )) as string,
        hint: await readProjectMarkdownField(
          projectDir,
          jsonPath,
          meta.id,
          stepTitle,
          "hint",
          step?.hint,
          false,
        ),
        purpose: await readProjectMarkdownField(
          projectDir,
          jsonPath,
          meta.id,
          stepTitle,
          "purpose",
          step?.purpose,
          false,
        ),
        expectedResult: await readProjectMarkdownField(
          projectDir,
          jsonPath,
          meta.id,
          stepTitle,
          "expectedResult",
          step?.expectedResult,
          false,
        ),
        starterCode: step?.starterCode,
      };
    }),
  );

  return {
    id: meta.id,
    meta,
    steps: resolvedSteps,
  };
}

function compileProjectStepBodies(
  projectId: string,
  step: ResolvedProjectStep,
  termKeys: string[],
): CompiledProjectStep {
  function compileRequiredField(fieldName: "content" | "task", value: string) {
    const injected = injectTerms(value, termKeys);
    try {
      return {
        body: parseLessonMarkdown(injected),
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(
        `Failed to parse project "${projectId}" step "${step.title}" field "${fieldName}": ${msg}`,
      );
    }
  }

  function compileOptionalField(
    fieldName: "hint" | "purpose" | "expectedResult",
    value?: string,
  ) {
    if (!value) return undefined;
    const injected = injectTerms(value, termKeys);
    try {
      return parseLessonMarkdown(injected);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(
        `Failed to parse project "${projectId}" step "${step.title}" field "${fieldName}": ${msg}`,
      );
    }
  }

  const contentBody = compileRequiredField("content", step.content).body;
  const taskBody = compileRequiredField("task", step.task).body;
  const hintBody = compileOptionalField("hint", step.hint);
  const purposeBody = compileOptionalField("purpose", step.purpose);
  const expectedResultBody = compileOptionalField(
    "expectedResult",
    step.expectedResult,
  );

  return {
    title: step.title,
    starterCode: step.starterCode,
    contentBody,
    taskBody,
    hintBody,
    purposeBody,
    expectedResultBody,
  };
}

function compileProjectMetaBody(
  meta: SourceProjectMeta,
  termKeys: string[],
): CompiledProjectMeta {
  const injectedAnalogy = injectTerms(meta.analogy, termKeys);
  try {
    return {
      ...meta,
      analogy: injectedAnalogy,
      analogyBody: parseLessonMarkdown(injectedAnalogy),
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(
      `Failed to parse project "${meta.id}" meta.analogy: ${msg}`,
    );
  }
}

// ---------- Taxonomy ----------

type TaxonomyTrack = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  order: number;
};
type TaxonomyChapter = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  order: number;
};
type Taxonomy = { tracks: TaxonomyTrack[]; chapters: TaxonomyChapter[] };

async function buildTaxonomy(): Promise<void> {
  const raw = await readFile(taxonomySourceFile, "utf8");
  const taxonomy = yaml.load(raw) as Taxonomy;
  await atomicWriteFile(
    generatedTaxonomyFile,
    JSON.stringify(taxonomy, null, 2) + "\n",
  );
}

// ---------- Quiz ----------

type CompiledGem = {
  id: string;
  name: string;
  icon: string;
  achievement: string;
  order: number;
  levels: CompiledQuizLevel[];
};

type CompiledQuizLevel = {
  level: number;
  type: string;
  threshold: number;
  name: string;
  count: number;
  questions: CompiledQuizQuestion[];
};

type CompiledQuizQuestion = {
  id: number;
  difficulty: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

async function compileQuiz(): Promise<void> {
  const gems: CompiledGem[] = [];

  let entries: string[];
  try {
    entries = await readdir(quizSourceDir);
  } catch {
    // No quiz dir — skip
    await atomicWriteFile(
      generatedQuizGemsFile,
      JSON.stringify({ gems: [] }, null, 2) + "\n",
    );
    await rm(generatedQuizQuestionsDir, { recursive: true, force: true });
    return;
  }

  for (const entry of entries.sort()) {
    if (!entry.endsWith(".yaml")) continue;
    const raw = await readFile(path.join(quizSourceDir, entry), "utf8");
    const data = yaml.load(raw) as {
      gem: {
        id: string;
        name: string;
        icon: string;
        achievement: string;
        order: number;
      };
      levels: Array<{
        level: number;
        type: string;
        threshold: number;
        name: string;
        questions: Array<{
          id: number;
          difficulty: number;
          question: string;
          options: string[];
          answer: number;
          explanation: string;
        }>;
      }>;
    };

    const gem: CompiledGem = {
      id: String(data.gem.id),
      name: String(data.gem.name),
      icon: String(data.gem.icon),
      achievement: String(data.gem.achievement),
      order: Number(data.gem.order),
      levels: (data.levels ?? []).map((l) => ({
        level: Number(l.level),
        type: String(l.type),
        threshold: Number(l.threshold),
        name: String(l.name),
        count: (l.questions ?? []).length,
        questions: (l.questions ?? []).map((q) => ({
          id: Number(q.id),
          difficulty: Number(q.difficulty ?? 1),
          question: String(q.question ?? ""),
          options: (q.options ?? []).map(String),
          answer: Number(q.answer ?? 0),
          explanation: String(q.explanation ?? ""),
        })),
      })),
    };

    gems.push(gem);
  }

  gems.sort((a, b) => a.order - b.order);

  // 拆分输出：quiz-gems.json 只含元数据（含 questionIds 供按需定位），
  // quiz-questions/{gemId}.json 每 gem 一份题目，运行时按需加载，避免 947KB 全量进 bundle
  const gemMeta = gems.map((g) => ({
    id: g.id,
    name: g.name,
    icon: g.icon,
    achievement: g.achievement,
    order: g.order,
    questionIds: g.levels.flatMap((l) => l.questions.map((q) => q.id)),
    levels: g.levels.map((l) => ({
      level: l.level,
      type: l.type,
      threshold: l.threshold,
      name: l.name,
      count: l.count,
    })),
  }));

  await mkdir(generatedQuizQuestionsDir, { recursive: true });
  await Promise.all(
    gems.map((g) => {
      const flat = g.levels.flatMap((l) =>
        l.questions.map((q) => ({ ...q, gem: g.id, level: l.level })),
      );
      return atomicWriteFile(
        path.join(generatedQuizQuestionsDir, `${g.id}.json`),
        JSON.stringify(flat, null, 2) + "\n",
      );
    }),
  );

  await atomicWriteFile(
    generatedQuizGemsFile,
    JSON.stringify({ gems: gemMeta }, null, 2) + "\n",
  );
  // 清理旧的全量 quiz.json
  await rm(generatedQuizFile, { force: true });
}

// ---------- Main ----------

export async function main() {
  await mkdir(generatedDir, { recursive: true });
  await mkdir(lessonsOutDir, { recursive: true });
  await mkdir(projectsOutDir, { recursive: true });

  // 加载增量编译缓存
  const cache = await loadBuildCache();
  const compilerHash = await hashFiles([__filename]);
  const compilerChanged = compilerHash !== cache.compiler;
  const newCache: BuildCache = {
    compiler: compilerHash,
    glossary: cache.glossary,
    taxonomy: cache.taxonomy,
    lessons: { ...cache.lessons },
    projects: { ...cache.projects },
    quiz: { ...cache.quiz },
  };

  // --- 术语表 ---
  let glossary: GlossaryEntry[] = [];
  let glossaryChanged = false;
  try {
    const glossaryRaw = await readFile(glossarySourceFile, "utf8");
    const glossaryHash = createHash("md5").update(glossaryRaw).digest("hex");
    if (glossaryHash !== cache.glossary) {
      glossary = parseGlossaryYaml(glossaryRaw);
      newCache.glossary = glossaryHash;
      glossaryChanged = true;
    } else {
      glossary = parseGlossaryYaml(glossaryRaw);
    }
  } catch {
    glossaryChanged = cache.glossary !== "";
    newCache.glossary = "";
  }
  const termKeys = glossary.map((g) => g.key).filter(Boolean);

  // --- 课程编译（增量）---
  const [lessonDirs, prologueDirs] = await Promise.all([
    collectLessonDirs(lessonsRoot),
    collectLessonDirs(prologueRoot).catch(() => [] as string[]),
  ]);
  const allLessonDirs = [...lessonDirs, ...prologueDirs];

  // 先读取所有 meta.yaml 以确定 mode
  const lessonModes: Record<string, string> = {};
  await Promise.all(
    allLessonDirs.map(async (dir) => {
      try {
        const raw = await readFile(path.join(dir, "meta.yaml"), "utf8");
        const data = yaml.load(raw) as Record<string, unknown>;
        lessonModes[dir] = String(data.mode || "local");
      } catch {
        lessonModes[dir] = "local";
      }
    }),
  );

  // 计算哪些课程需要重编译
  const lessonHashes = await Promise.all(
    allLessonDirs.map((dir) => hashLessonDir(dir, lessonModes[dir])),
  );

  const dirtyLessonDirs = allLessonDirs.filter((dir, i) => {
    const key = path.relative(projectRoot, dir);
    return (
      compilerChanged ||
      glossaryChanged ||
      lessonHashes[i] !== cache.lessons[key]
    );
  });

  // 重编译有变化的课程
  let compiledAll: ReturnType<typeof applyGlossaryToBody> extends infer _
    ? any[]
    : never;
  if (dirtyLessonDirs.length === allLessonDirs.length) {
    // 全量重编译
    const compiledRaw = await Promise.all(
      allLessonDirs.map((dir) => compileLesson(dir)),
    );
    compiledAll = compiledRaw.map((lesson) => ({
      ...lesson,
      body: applyGlossaryToBody(lesson.body, termKeys),
    }));
    allLessonDirs.forEach((dir, i) => {
      newCache.lessons[path.relative(projectRoot, dir)] = lessonHashes[i];
    });
  } else {
    // 增量：只重编译有变化的课程
    const dirtyCompiled = await Promise.all(
      dirtyLessonDirs.map((dir) => compileLesson(dir)),
    );

    // 读取没有变化的课程（从已生成 JSON 加载）
    const unchangedDirs = allLessonDirs.filter((dir) => {
      const key = path.relative(projectRoot, dir);
      return (
        !compilerChanged &&
        !glossaryChanged &&
        lessonHashes[allLessonDirs.indexOf(dir)] === cache.lessons[key]
      );
    });
    const unchangedLoaded = await Promise.all(
      unchangedDirs.map(async (dir) => {
        try {
          const meta = yaml.load(
            await readFile(path.join(dir, "meta.yaml"), "utf8"),
          ) as Record<string, unknown>;
          const id = String(meta.id);
          const json = await readFile(
            path.join(lessonsOutDir, `${id}.json`),
            "utf8",
          );
          return JSON.parse(json);
        } catch {
          return null;
        }
      }),
    );

    compiledAll = [
      ...dirtyCompiled.map((l) => ({
        ...l,
        body: applyGlossaryToBody(l.body, termKeys),
      })),
      ...unchangedLoaded.filter(Boolean),
    ];

    // 更新有变化课程的 hash
    dirtyLessonDirs.forEach((dir) => {
      newCache.lessons[path.relative(projectRoot, dir)] =
        lessonHashes[allLessonDirs.indexOf(dir)];
    });

    if (dirtyLessonDirs.length > 0) {
      const skipped = allLessonDirs.length - dirtyLessonDirs.length;
      console.log(
        `[incremental] ${dirtyLessonDirs.length} lesson(s) changed, ${skipped} skipped`,
      );
    }
  }

  const compiled = compiledAll;
  compiled.sort((a, b) => a.meta.order - b.meta.order);

  // --- 项目编译（增量）---
  const projectDirs = await collectProjectDirs(projectsRoot);
  const projectHashes = await Promise.all(projectDirs.map(hashProjectDir));

  const dirtyProjectDirs = projectDirs.filter((dir, i) => {
    const key = path.relative(projectRoot, dir);
    return (
      compilerChanged ||
      glossaryChanged ||
      projectHashes[i] !== cache.projects[key]
    );
  });

  let compiledProjects;
  if (dirtyProjectDirs.length === projectDirs.length) {
    const raw = await Promise.all(
      projectDirs.map((dir) => compileProject(dir)),
    );
    compiledProjects = raw.map((project) => ({
      ...project,
      meta: compileProjectMetaBody(project.meta, termKeys),
      steps: project.steps.map((step) =>
        compileProjectStepBodies(project.id, step, termKeys),
      ),
    }));
    projectDirs.forEach((dir, i) => {
      newCache.projects[path.relative(projectRoot, dir)] = projectHashes[i];
    });
  } else {
    const dirtyRaw = await Promise.all(
      dirtyProjectDirs.map((dir) => compileProject(dir)),
    );
    const dirtyMapped = dirtyRaw.map((project) => ({
      ...project,
      meta: compileProjectMetaBody(project.meta, termKeys),
      steps: project.steps.map((step) =>
        compileProjectStepBodies(project.id, step, termKeys),
      ),
    }));

    const unchangedProjects = projectDirs.filter((dir) => {
      const key = path.relative(projectRoot, dir);
      return (
        !compilerChanged &&
        !glossaryChanged &&
        projectHashes[projectDirs.indexOf(dir)] === cache.projects[key]
      );
    });
    const unchangedProjectsLoaded = await Promise.all(
      unchangedProjects.map(async (dir) => {
        try {
          const meta = yaml.load(
            await readFile(path.join(dir, "meta.yaml"), "utf8"),
          ) as Record<string, unknown>;
          const id = String(meta.id);
          const json = await readFile(
            path.join(projectsOutDir, `${id}.json`),
            "utf8",
          );
          return JSON.parse(json);
        } catch {
          return null;
        }
      }),
    );

    compiledProjects = [
      ...dirtyMapped,
      ...unchangedProjectsLoaded.filter(Boolean),
    ];
    dirtyProjectDirs.forEach((dir) => {
      newCache.projects[path.relative(projectRoot, dir)] =
        projectHashes[projectDirs.indexOf(dir)];
    });

    if (dirtyProjectDirs.length > 0) {
      const skipped = projectDirs.length - dirtyProjectDirs.length;
      console.log(
        `[incremental] ${dirtyProjectDirs.length} project(s) changed, ${skipped} skipped`,
      );
    }
  }
  compiledProjects.sort((a: any, b: any) => a.meta.order - b.meta.order);

  // --- 打单输出 ---
  const lessonsMeta = compiled.map(({ id, meta }: any) => ({ id, meta }));
  const projectsMetaList = compiledProjects.map(({ id, meta, steps }: any) => ({
    id,
    meta,
    stepCount: steps.length,
  }));

  // --- 生成搜索索引 ---
  function extractBodyText(body: ContentBodyNode[]): string {
    const parts: string[] = [];
    for (const node of body) {
      if ("text" in node && typeof node.text === "string")
        parts.push(node.text);
      if (node.type === "list") {
        for (const item of node.items) {
          parts.push(item.text);
          if (item.children) {
            for (const c of item.children) parts.push(c.text);
          }
        }
      }
      if (node.type === "table") {
        parts.push(...node.headers);
        for (const row of node.rows) parts.push(...row);
      }
      if ("content" in node && typeof node.content === "string") {
        parts.push(
          node.content.replace(/\{\{term:[^}]+\}\}/g, (m: string) =>
            m.slice(7, -2),
          ),
        );
      }
      if ("attrs" in node && (node as any).attrs?.title)
        parts.push((node as any).attrs.title);
    }
    return parts.join(" ").slice(0, 600);
  }

  const searchIndex = compiled.map((l: any) => ({
    id: l.id,
    title: l.meta.title,
    track: l.meta.track,
    chapter: l.meta.chapter,
    bodyText: extractBodyText(l.body || []),
  }));

  await Promise.all([
    atomicWriteFile(
      lessonsMetaFile,
      `${JSON.stringify(lessonsMeta, null, 2)}\n`,
    ),
    ...compiled.map((l: any) =>
      writeFile(
        path.join(lessonsOutDir, `${l.id}.json`),
        `${JSON.stringify(l, null, 2)}\n`,
      ),
    ),
    atomicWriteFile(
      projectsMetaFile,
      `${JSON.stringify(projectsMetaList, null, 2)}\n`,
    ),
    ...compiledProjects.map((p: any) =>
      writeFile(
        path.join(projectsOutDir, `${p.id}.json`),
        `${JSON.stringify(p, null, 2)}\n`,
      ),
    ),
    atomicWriteFile(
      glossaryGeneratedFile,
      `${JSON.stringify(glossary, null, 2)}\n`,
    ),
    atomicWriteFile(
      searchIndexFile,
      `${JSON.stringify(searchIndex, null, 2)}\n`,
    ),
    buildTaxonomy(),
    compileQuiz(),
  ]);

  await saveBuildCache(newCache);

  const quizData = JSON.parse(await readFile(generatedQuizGemsFile, "utf8"));
  console.log(
    `Compiled ${compiled.length} lesson(s), ${compiledProjects.length} project(s), ${quizData.gems?.length || 0} quiz gem(s) to ${path.relative(projectRoot, generatedDir)}`,
  );
}

const isDirectRun = process.argv[1]
  ?.replace(/\\/g, "/")
  .endsWith("scripts/build-content.ts");
if (isDirectRun) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
