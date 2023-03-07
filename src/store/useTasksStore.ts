import {create} from 'zustand';
interface Task {
  id: string;
  title: string;
  description: string;
  supervisor: string;
  date: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  completeTask: (id: string) => void;
  incompleteTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  completeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      ),
    })),
  incompleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: false } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));