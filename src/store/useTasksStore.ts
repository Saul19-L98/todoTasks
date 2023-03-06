import {create} from "zustand";


interface Task{
    id: number;
    title: string;
    description: string;
    supervisor: string;
    date: string;
    completed:boolean;
};

interface TasksStore{
listTasks: Task[];
tasksCompleted: Task[];
addTask: (taskName: Task) => void;
tasksCompletedHandler: (index: number) => void;
notCompletedYetHandler: (index: number) => void;
};

const useTasksStore = create<TasksStore>((set) => ({
    listTasks: [],
    tasksCompleted: [],
    addTask: (taskName) =>
        set((state) => ({
        listTasks: [
            ...state.listTasks,
            taskName
        ],
    })),
    tasksCompletedHandler: (index) =>
        set((state) => {
        const updatedTasks = [...state.listTasks];
        updatedTasks[index].completed = true;
        return {
            tasksCompleted: [...state.tasksCompleted, updatedTasks[index]],
            listTasks: updatedTasks.filter((task) => !task.completed),
        };
    }),
    notCompletedYetHandler: (index) =>
        set((state) => {
        const updatedTasks = [...state.tasksCompleted];
        updatedTasks[index].completed = false;
        return {
            listTasks: [...state.listTasks, updatedTasks[index]],
            tasksCompleted: updatedTasks.filter((task) => task.completed),
        };
    }),
}));

export default useTasksStore