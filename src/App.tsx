import React,{useState,useEffect,useRef,Dispatch,SetStateAction} from 'react';
import Modal from 'react-modal';
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
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

  // task state for form
  const [task, setTask] = useState<FormValues>();

  // list state
  const [listTasks, setListTasks] = useState<FormValues[]>([]);

  //task completed
  const [tasksCompleted,setTasksCompleted] = useState<FormValues[]>([]);

  const { register, reset, formState:{errors}, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    const initialState: FormValues = { 
      title:"", 
      description:"", 
      supervisor:"", 
      date:"",
      completed:false 
    }
    setTask(initialState);
    //setListTasks([initialState]);
    //setTasksCompleted([initialState]);
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
    setListTasks(prevState => {
      // If prevState is empty, return a new array with only the new task
    if (prevState.length === 0) {
      return [
        {
          title: data.title,
          description: data.description,
          supervisor: data.supervisor,
          date: data.date,
          completed: false,
        },
      ];
    }
    // Otherwise, concatenate the prevState and the new task
    else {
      return [
        ...prevState,
        {
          title: data.title,
          description: data.description,
          supervisor: data.supervisor,
          date: data.date,
          completed:false,
        },
      ];
    }
    })
    reset();
    closeModal();
  }

  const tasksCompletedHandler = (index:number) => {
    setListTasks(prevState => {
      const updatedTasks = [...prevState];
      updatedTasks[index].completed = true;
      return updatedTasks.filter(task => !task.completed);
    });
  
    setTasksCompleted(prevState => {
      const completedTask = listTasks[index];
      return [...(prevState || []), completedTask];
    });
  }

  const notCompletedYetHandler = (index:number) => {
    setTasksCompleted((prevCompleted) => {
      const updatedCompleted = [...prevCompleted];
      const taskToMove = updatedCompleted[index];
      taskToMove.completed = false;
      setListTasks((prevList) => [...prevList, taskToMove]);
      return updatedCompleted.filter((task, i) => i !== index);
    });
  }

  const deleteTaskHandler = (index: number, setTasks: Dispatch<SetStateAction<FormValues[]>>) => {
    setTasks((prevTasks) => prevTasks.filter((task, i) => i !== index));
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
          listTasks?.map( (listtask,index) => (
            <div key={index}>
              <h2>{listtask.title}</h2>
              <div>
                <p>{listtask.description}</p>
                <p>{listtask.supervisor}</p>
                <p>{listtask.date}</p>
              </div>
              <div>
                <input type="checkbox" onChange={() => tasksCompletedHandler(index)} checked={listtask.completed} />
                <button onClick={() => deleteTaskHandler(index, setListTasks)}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
      <div id='section2'>
        <h1>Tasks Completed 😎</h1>
        {
          tasksCompleted?.map( (taskCompleted,index) => (
            <div key={index}>
              <h2>{taskCompleted.title}</h2>
              <div>
                <p>{taskCompleted.description}</p>
                <p>{taskCompleted.supervisor}</p>
                <p>{taskCompleted.date}</p>
              </div>
              <div>
              <input type="checkbox" onChange={() => notCompletedYetHandler(index)} checked={taskCompleted.completed} />
                <button onClick={() => deleteTaskHandler(index, setTasksCompleted)}>Delete</button>
              </div>
            </div>
          ))
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
