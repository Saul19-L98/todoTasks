import React,{useState,useEffect,useRef,Dispatch,SetStateAction} from 'react';
import Modal from 'react-modal';
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { useTaskStore } from './store/useTasksStore';

interface FormValues {
  id:string;
  title: string;
  description: string;
  supervisor: string;
  date: string;
  completed:boolean;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement(document.getElementById('root')! as HTMLDivElement);

function App() {
  let subtitle = useRef<HTMLHeadingElement>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  // task state to reset the form to its initial values.
  const [task, setTask] = useState<FormValues>();
  
  /////////////////////////////////////////////////////////////////////////////////////////
  //NOTE: Zustand
  const tasks = useTaskStore(state => state.tasks);
  const { addTask,incompleteTask,deleteTask,completedTask } = useTaskStore();
  /////////////////////////////////////////////////////////////////////////////////////////

  const { register, reset, formState:{errors}, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    const initialState: FormValues = { 
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

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmitAction:SubmitHandler<FormValues> = (data) => {    
    console.log(data);
    const newTask = {
      ...data,
      id: uuidv4(),
      completed: false,
    }
    addTask(newTask);
    reset();
    closeModal();
  }

  const tasksCompletedHandler = (id:string) => {
    completedTask(id);
  }

  const notCompletedYetHandler = (id:string) => {
    incompleteTask(id);
  }

  const deleteTaskHandler = (id: string) => {
    deleteTask(id);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <div id='section1'>
        <h1>Task to do 😪</h1>
        {
          tasks?.map( (task) => {
            if(task.completed){
              return null;
            }
            return(
              (
                <div key={task.id}>
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
              <div key={task.id}>
                <h2>{task.title}</h2>
                <div>
                  <p>{task.description}</p>
                  <p>{task.supervisor}</p>
                  <p>{task.date}</p>
                </div>
                <div>
                <input type="checkbox" onChange={() => notCompletedYetHandler(task.id)} checked={task.completed} />
                  <button onClick={() => deleteTaskHandler(task.id)}>Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={subtitle}>Hello From Modal</h2>
        <button onClick={closeModal}>close</button>
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
      </Modal>
    </div>
  );
}

export default App;
