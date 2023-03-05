import React,{useState,useEffect,useRef} from 'react';
import Modal from 'react-modal';
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  title: string;
  description: string;
  supervisor: string;
  date: string;
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
  const [listTasks, setListTasks] = useState<FormValues[]>();

  const { register,reset, formState:{errors}, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    setTask({ title:"", description:"", supervisor:"", date:"" });
    setListTasks([{ title:"", description:"", supervisor:"", date:"" }]);
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
    setListTasks(prevState => ([...prevState!,{
      title:data.title,
      description:data.description,
      supervisor:data.supervisor,
      date:data.date
    }]))
    reset();
    closeModal();
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <div>
        {
          listTasks?.map( (listtask,index) => (
            <div key={index}>
              <h2>{listtask.title}</h2>
              <div>
                <p>{listtask.description}</p>
                <p>{listtask.supervisor}</p>
                <p>{listtask.date}</p>
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
