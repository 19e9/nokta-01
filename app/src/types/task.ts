export const TASK_CATEGORIES = ['Ders', 'Sinav', 'Proje', 'Kulup'] as const;
export const TASK_PRIORITIES = ['Acil', 'Normal'] as const;
export const TASK_FILTERS = ['Tumu', 'Aktif', 'Tamamlanan'] as const;

export type TaskCategory = (typeof TASK_CATEGORIES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskFilter = (typeof TASK_FILTERS)[number];

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  dueLabel: string;
}

export interface TaskDraft {
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueLabel: string;
}
