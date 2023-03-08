import {useState,useEffect} from 'react';
import { Task } from '../interfaces/interface';
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { useTaskStore } from '../store/useTasksStore';

interface FormModalProps {
    handleCloseModal: () => void;
}

function FormModal ({ handleCloseModal }:FormModalProps){
    // task state to reset the form to its initial values.
    const [task, setTask] = useState<Task>();

    const {addTask} = useTaskStore();

    const { register, reset, formState:{errors}, handleSubmit } = useForm<Task>();

    useEffect(() => {
        const initialState: Task = { 
            id: "",
            title:"", 
            description:"", 
            supervisor:"", 
            date:"",
            completed:false 
        }
        setTask(initialState);
    }, []); 
    
    // effect runs when task state is updated
    useEffect(() => {
        // reset form with task data
        reset(task);
    }, [task,reset]);

    const handleSubmitAction:SubmitHandler<Task> = (data) => {    
        const newTask = {
            ...data,
            id: uuidv4(),
            completed: false,
        }
        addTask(newTask);
        reset();
        handleCloseModal();
    }
    return (
        <div className="w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleSubmitAction)}>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" {...register("title",{required:true,minLength:5})}/>
                    {errors.title?.type === 'required' && <span className="text-red-500 text-xs italic">This field is required</span>}
                    {errors.title?.type === 'minLength' && <span className="text-red-500 text-xs italic">Title is too short</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" {...register("description",{required:true,minLength:20})}></textarea>
                    {errors.description?.type === 'required' && <span className="text-red-500 text-xs italic">This field is required</span>}
                    {errors.description?.type === 'minLength' && <span className="text-red-500 text-xs italic">Description is too short</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supervisor">
                        Supervisor
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="supervisor" type="text" placeholder="Supervisor" {...register("supervisor",{required:true})}/>
                    {errors.supervisor?.type === 'required' && <span className="text-red-500 text-xs italic">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Limit Date
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" {...register("date",{required:true})}/>
                    {errors.date?.type === 'required' && <span className="text-red-500 text-xs italic">This field is required</span>}
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormModal;