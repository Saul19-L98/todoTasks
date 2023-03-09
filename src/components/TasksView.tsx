import List from './List';
import { useTaskStore } from '../store/useTasksStore';

interface TasksViewProps{
    handleOpenModal: () => void;
}

function TasksView({handleOpenModal}:TasksViewProps){

    const tasks = useTaskStore(state => state.tasks);

    return(
        <>
        <div className="flex justify-center items-center m-6">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-sm" onClick={handleOpenModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a1 1 0 01-1-1V11H4a1 1 0 010-2h5V4a1 1 0 112 0v5h5a1 1 0 110 2h-5v6a1 1 0 01-1 1z" clipRule="evenodd" />
            </svg>
            Add new Task
        </button>
        </div>
        {   
            tasks.length === 0 && (
                <div className='flex justify-center h-screen'>
                    <div className="bg-gray-200 rounded-lg p-4 w-96 h-48 flex flex-col justify-center items-center">
                    <span className="text-5xl mb-4">😪</span>
                        <p className="text-lg font-bold text-center text-gray-600">Please create a task</p>
                    </div>
                </div>
            )
        }
        {tasks.length > 0 &&
        (<div className="grid grid-cols-1 gap-4 p-4 rounded-lg md:grid-cols-2">
            <div id="section1" className="bg-white p-4 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Tasks to do 😪</h1>
                {
                    tasks?.map( (task) => {
                        if(task.completed){
                            return null;
                        }
                        return(
                            (
                                <List key={task.id} task={task} />
                            )
                        )
                    })
                }
            </div>
            <div id="section2" className="bg-white p-4 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Tasks Completed 😎</h1>
                {
                    tasks?.map( (task) => {
                        if(!task.completed){
                            return null;
                        }
                        return (
                            <List key={task.id} task={task} />
                        )
                    })
                }
            </div>
        </div>)
        }
        </>
    )
}

export default TasksView;