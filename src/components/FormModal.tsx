import {useState,useEffect,useRef} from 'react';
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
    
    const subtitle = useRef<HTMLHeadingElement>(null);

    const handleSubmitAction:SubmitHandler<Task> = (data) => {    
        console.log(data);
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
        <div>
            <h2 ref={subtitle}>Hello From Modal</h2>
            <button onClick={handleCloseModal}>close</button>
            <div>I am a modal</div>
            <form onSubmit={handleSubmit(handleSubmitAction)}>
                <label>
                    Title:
                </label>
                <input
                    type="text"
                    {...register("title",{required:true,minLength:5})}
                />
                {errors.title?.type === 'required' && <span>This is field is required</span>}
                {errors.title?.type === 'minLength' && <span>Title is to short</span>}
                <br />
                <label>
                    Description:
                </label>
                <textarea
                    {...register("description",{required:true,minLength:20})}
                />
                    {errors.description?.type === 'required' && <span>This is field is required</span>}
                    {errors.description?.type === 'minLength' && <span>Description is to short</span>}
                <br />
                <label>
                    Supervisor:
                </label>
                <input
                    type="text"
                    {...register("supervisor",{required:true})}
                />
                    {errors.description?.type === 'required' && <span>This is field is required</span>}
                <br />
                <label>
                    Limit Date:
                </label>
                <input
                    type="date"
                    {...register("date",{required:true})}
                />
                    {errors.date?.type === 'required' && <span>This is field is required</span>}
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FormModal;