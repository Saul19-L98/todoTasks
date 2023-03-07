import {create} from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  id: string;
  title: string;
  description: string;
  supervisor: string;
  date: string;
  completed: boolean;
}

interface TaskStore {
  listTasks: FormValues[];
  tasksCompleted: FormValues[];
  addTask: (task: FormValues) => void;
  // completeTask: (id: string) => void;
  // unCompleteTask: (id: string) => void;
  // deleteTask: (id: string) => void;
}

export const useTasksStore = create<TaskStore>((set, get) => ({
  listTasks: [],
  tasksCompleted: [],

  addTask: (task:FormValues) =>
    set((state) => ({
      listTasks: [
        ...state.listTasks,
        {
          ...task,
          id: task.id || uuidv4(),
        },
      ],
    })),

  
}));