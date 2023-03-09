import { Task } from "../interfaces/interface";
import { useTaskStore } from "../store/useTasksStore";
import getDays from "../helpers/getDays";

interface ListProps{
    task:Task;
}

function List({task}:ListProps){

    const {deleteTask,toggleCompleted} = useTaskStore();

    const tasksCompletedHandler = (id:string) => {
        toggleCompleted(id);
    }

    const deleteTaskHandler = (id: string) => {
    deleteTask(id);
    }

    const {days,isOnTime} = getDays(task.date);

    return(
        <div className="mt-8 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-orange-200 to-white">
            <div className="inline-block mt-6 py-2 px-4 flex justify-center">
                <h2 className="text-3xl font-bold p-4 rounded bg-blue-700 text-white">{task.title}</h2>
            </div>
            <div className="p-4">
                <div className="mt-4 p-3 w-full inline-block rounded bg-rose-400 text-white">
                    <h3 className="font-bold text-xl">Description</h3>
                    <p>{task.description}</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="mt-4 inline-block py-2 px-4 rounded bg-green-700 text-white">
                        <p>🙉 Assigned person: {task.supervisor}</p>
                    </div>
                    <div className="mt-4 w-2/6">
                        {isOnTime && (
                            <p className="inline-block py-2 px-4 rounded bg-purple-800 text-white">
                                📅 Days remaining: {days}
                            </p>
                        )}
                        {!isOnTime && (
                            <p className="inline-block py-2 px-4 rounded bg-red-600 text-white">
                                ❌ Past days: {days}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center p-4">
            <input type="checkbox" onChange={() => tasksCompletedHandler(task.id)} checked={task.completed} className="h-6 w-6 rounded-full bg-white border-gray-400 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:scale-110 cursor-pointer"/>
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

export default List;