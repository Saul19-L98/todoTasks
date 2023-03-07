import ListTask from './ListTask';
import { useTaskStore } from '../store/useTasksStore';

interface TasksViewProps{
    handleOpenModal: () => void;
}

function TasksView({handleOpenModal}:TasksViewProps){

    const tasks = useTaskStore(state => state.tasks);

    return(
        <>
            <button onClick={handleOpenModal}>Open Modal</button>
            <div id='section1'>
                <h1>Task to do 😪</h1>
                {
                    tasks?.map( (task) => {
                        if(task.completed){
                            return null;
                        }
                        return(
                            (
                                <ListTask key={task.id} task={task} />
                            )
                        )
                    })
                }
            </div>
            <div id='section2'>
                <h1>Tasks Completed 😎</h1>
                {
                    tasks?.map( (task) => {
                        if(!task.completed){
                            return null;
                        }
                        return (
                            <ListTask key={task.id} task={task} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default TasksView;