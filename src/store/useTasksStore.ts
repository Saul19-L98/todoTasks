import {create, StateCreator} from 'zustand';
import {persist,devtools} from 'zustand/middleware';
import { TaskStore } from '../interfaces/interface';

const taskStore: StateCreator<TaskStore> = (set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleCompleted: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
  })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
});

export const useTaskStore = create<TaskStore>()(
  persist(
    devtools((...a) => ({
      ...taskStore(...a),
    })),
    { name: "Tasks-persist" }
  )
);
