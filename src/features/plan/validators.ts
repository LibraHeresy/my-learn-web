import { getAllLessons } from '../../content-loaders/lessons'
import { getAllProjects } from '../../content-loaders/projects'
import { studyPlanPhases, studyPlanWeeks } from './studyPlan'

export function validateStudyPlan(): string[] {
  const errors: string[] = []

  const lessonIds = new Set(getAllLessons().map((lesson) => lesson.id))
  const projectIds = new Set(getAllProjects().map((project) => project.id))
  const phaseIds = new Set(studyPlanPhases.map((phase) => phase.id))

  const weekIds = studyPlanWeeks.map((week) => week.id)
  if (new Set(weekIds).size !== weekIds.length) {
    errors.push('studyPlanWeeks 存在重复 week.id')
  }

  const weekNumbers = studyPlanWeeks.map((week) => week.weekNumber).sort((a, b) => a - b)
  weekNumbers.forEach((weekNumber, index) => {
    if (weekNumber !== index + 1) {
      errors.push(`周次不连续：期望第 ${index + 1} 周，实际为第 ${weekNumber} 周`)
    }
  })

  const dayIds = new Set<string>()
  const taskIds = new Set<string>()

  for (const week of studyPlanWeeks) {
    if (!phaseIds.has(week.phaseId)) {
      errors.push(`week "${week.id}" 指向不存在的 phaseId "${week.phaseId}"`)
    }

    if (week.days.length !== 6) {
      errors.push(`week "${week.id}" 应有 6 天，实际为 ${week.days.length} 天`)
    }

    week.days.forEach((day, dayIndex) => {
      if (day.order !== dayIndex + 1) {
        errors.push(`week "${week.id}" 的 day.order 不连续：期望 ${dayIndex + 1}，实际 ${day.order}`)
      }

      if (dayIds.has(day.id)) {
        errors.push(`重复的 day.id: "${day.id}"`)
      }
      dayIds.add(day.id)

      if (day.tasks.length === 0) {
        errors.push(`day "${day.id}" 没有任务`)
      }

      day.tasks.forEach((task) => {
        if (taskIds.has(task.id)) {
          errors.push(`重复的 task.id: "${task.id}"`)
        }
        taskIds.add(task.id)

        if (task.targetType === 'lesson' && task.targetId && !lessonIds.has(task.targetId)) {
          errors.push(`task "${task.id}" 指向不存在的 lesson "${task.targetId}"`)
        }

        if (task.targetType === 'project' && task.targetId && !projectIds.has(task.targetId)) {
          errors.push(`task "${task.id}" 指向不存在的 project "${task.targetId}"`)
        }

        if (task.targetType === 'quiz' && task.targetId !== 'quiz') {
          errors.push(`task "${task.id}" 的 quiz targetId 必须是 "quiz"`)
        }

        if (task.completionMode === 'auto-quiz' && !task.quizGoal) {
          errors.push(`task "${task.id}" 是 auto-quiz，但缺少 quizGoal`)
        }

        if (task.completionMode !== 'auto-quiz' && task.quizGoal) {
          errors.push(`task "${task.id}" 不是 auto-quiz，却带有 quizGoal`)
        }
      })
    })
  }

  for (const phase of studyPlanPhases) {
    const coveredWeeks = studyPlanWeeks.filter((week) => week.phaseId === phase.id).map((week) => week.weekNumber)
    if (coveredWeeks.length === 0) {
      errors.push(`phase "${phase.id}" 没有对应的周计划`)
      continue
    }
    const minWeek = Math.min(...coveredWeeks)
    const maxWeek = Math.max(...coveredWeeks)
    if (phase.startWeek !== minWeek || phase.endWeek !== maxWeek) {
      errors.push(
        `phase "${phase.id}" 的周区间与实际不符：声明 ${phase.startWeek}-${phase.endWeek}，实际 ${minWeek}-${maxWeek}`,
      )
    }
  }

  return errors
}
