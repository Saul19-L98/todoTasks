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
        <div>
            <h2>{task.title}</h2>
            <div>
                <p>{task.description}</p>
                <p>{task.supervisor}</p>
                <p>{task.date}</p>
            </div>
            <div>
            <input type="checkbox" onChange={() => tasksCompletedHandler(task.id)} checked={task.completed} />
            <button onClick={() => deleteTaskHandler(task.id)}>Delete</button>
            </div>
        </div>
    )
}

export default ListTask;