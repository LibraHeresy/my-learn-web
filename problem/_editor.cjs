// 编辑器增强脚本：Tab 缩进 + Alt+Shift+F 格式化
// 通过 attachEditor 函数注入到所有 textarea#code

const editorScript = `
    // ===== 编辑器增强：Tab 缩进 + Alt+Shift+F 格式化 =====
    function attachEditor(textareaId) {
      const ta = document.getElementById(textareaId);
      if (!ta) return;

      // Tab 键缩进
      ta.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = ta.selectionStart;
          const end = ta.selectionEnd;
          const value = ta.value;
          const lineStart = value.lastIndexOf('\\n', start - 1) + 1;

          if (e.shiftKey) {
            // Shift+Tab：反向缩进当前行（去掉行首最多 2 个空格）
            const lineEnd = value.indexOf('\\n', start);
            const endPos = lineEnd === -1 ? value.length : lineEnd;
            const line = value.substring(lineStart, endPos);
            const match = line.match(/^[ \\t]+/);
            if (match) {
              const remove = Math.min(2, match[0].length);
              const newValue = value.substring(0, lineStart) + value.substring(lineStart + remove);
              ta.value = newValue;
              const newPos = start - remove;
              ta.selectionStart = ta.selectionEnd = Math.max(lineStart, newPos);
            }
          } else {
            // 有选中文本：对每行整体缩进
            if (start !== end) {
              const selected = value.substring(start, end);
              const lines = selected.split('\\n');
              const indented = lines.map(l => '  ' + l).join('\\n');
              ta.value = value.substring(0, start) + indented + value.substring(end);
              ta.selectionStart = start;
              ta.selectionEnd = start + indented.length;
            } else {
              // 无选中：插入 2 个空格
              ta.value = value.substring(0, start) + '  ' + value.substring(end);
              ta.selectionStart = ta.selectionEnd = start + 2;
            }
          }
        }

        // Alt+Shift+F 格式化
        if (e.key === 'F' && e.altKey && e.shiftKey) {
          e.preventDefault();
          try {
            ta.value = formatJS(ta.value);
          } catch (err) {
            // 格式化失败则忽略
          }
        }
      });

      // 轻量 JS 格式化：基于缩进的简单美化
      function formatJS(code) {
        const lines = code.split('\\n');
        let indent = 0;
        const indentUnit = '  ';
        const result = [];
        // 记录模板字符串状态（简化处理）
        let inTemplate = false;

        for (let raw of lines) {
          let line = raw.trim();

          // 跳过空行
          if (line === '') {
            result.push('');
            continue;
          }

          // 处理行尾注释
          const hasTrailingComment = false;

          // 计算缩进：如果这行是收尾的 } 或 ) 等，先减少缩进
          const closes = line.startsWith('}') || line.startsWith(')') || line.startsWith(']') || line.startsWith('>');
          if (closes) {
            indent = Math.max(0, indent - 1);
          }

          result.push(indentUnit.repeat(indent) + line);

          // 计算这行对缩进的影响
          const opens = (line.match(/[{\\[(]/g) || []).length;
          const closesCount = (line.match(/[}\\]\\)]/g) || []).length;
          indent += opens - closesCount;
          if (indent < 0) indent = 0;
        }

        return result.join('\\n');
      }
    }

    // 自动为 code 文本框附加编辑器功能
    attachEditor('code');
`;

module.exports = { editorScript };
