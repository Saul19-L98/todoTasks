export interface Task {
    id: string;
    title: string;
    description: string;
    supervisor: string;
    date: string;
    completed: boolean;
}

export interface TaskStore {
    tasks: Task[];
    addTask: (task: Task) => void;
    toggleCompleted: (id:string) => void;
    deleteTask: (id: string) => void;
}