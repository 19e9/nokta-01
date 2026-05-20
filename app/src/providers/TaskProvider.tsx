import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { Task, TaskDraft } from '@/src/types/task';

const STORAGE_KEY = 'campus-todo/tasks';

const seedTasks: Task[] = [
  {
    id: 'physics-lab',
    title: 'Fizik Laboratuvari',
    description: 'Deney raporu ve veri tablosunu yukle.',
    category: 'Ders',
    priority: 'Acil',
    completed: false,
    dueLabel: 'Bugun 18:00',
  },
  {
    id: 'club-pitch',
    title: 'Kulup Sunumu',
    description: 'Etkinlik akisini toparla ve afis briefini guncelle.',
    category: 'Kulup',
    priority: 'Normal',
    completed: true,
    dueLabel: 'Cuma',
  },
];

interface TaskContextValue {
  tasks: Task[];
  hydrated: boolean;
  addTask: (draft: TaskDraft) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
  getTask: (taskId: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextValue | null>(null);

async function persistTasks(tasks: Task[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function TaskProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const load = async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);

      if (raw) {
        try {
          setTasks(JSON.parse(raw) as Task[]);
        } catch {
          setTasks(seedTasks);
        }
      } else {
        await persistTasks(seedTasks);
      }

      setHydrated(true);
    };

    void load();
  }, []);

  const value: TaskContextValue = {
    tasks,
    hydrated,
    addTask: async (draft) => {
      const nextTask: Task = {
        id: Date.now().toString(36),
        title: draft.title.trim(),
        description: draft.description.trim(),
        category: draft.category,
        priority: draft.priority,
        completed: false,
        dueLabel: draft.dueLabel.trim(),
      };

      const nextTasks = [nextTask, ...tasks];
      setTasks(nextTasks);
      await persistTasks(nextTasks);
    },
    toggleTask: async (taskId) => {
      const nextTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(nextTasks);
      await persistTasks(nextTasks);
    },
    removeTask: async (taskId) => {
      const nextTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(nextTasks);
      await persistTasks(nextTasks);
    },
    getTask: (taskId) => tasks.find((task) => task.id === taskId),
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider');
  }

  return context;
}
