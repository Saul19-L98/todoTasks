import { Task } from "../interfaces/interface";
import { useTaskStore } from "../store/useTasksStore";

interface LisTaskProps{
    task:Task;
}

function ListTask({task}:LisTaskProps){

    const {deleteTask,toggleCompleted} = useTaskStore();

    const tasksCompletedHandler = (id:string) => {
        toggleCompleted(id);
    }

    const deleteTaskHandler = (id: string) => {
    deleteTask(id);
    }

    return(
        <div className="mt-8 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-orange-200 to-white">
            <h2 className="text-2xl font-bold p-4">{task.title}</h2>
            <div className="p-4">
                <div className="m-1 p-3">
                    <h3 className="font-bold">Description</h3>
                    <p>{task.description}</p>
                </div>
                <div className="mt-1">
                    <p>🙉 Assigned person: {task.supervisor}</p>
                </div>
                <div className="mt-1">
                    <p>📅 Limit Date: {task.date}</p>
                </div>
            </div>
            <div className="flex justify-between items-center p-4">
                <input type="checkbox" onChange={() => tasksCompletedHandler(task.id)} checked={task.completed} className="h-6 w-6 rounded-full bg-white border-gray-400 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" />
                <button onClick={() => deleteTaskHandler(task.id)} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-shadow duration-300">
                <svg className="h-6 w-6 inline-block align-middle mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                </svg>
                Delete
                </button>
            </div>
        </div>
    )
}

export default ListTask;