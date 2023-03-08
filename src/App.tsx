import {useState} from 'react';
import Modal from 'react-modal';
import FormModal from './components/FormModal';
import TasksView from './components/TasksView';
// import Footer from './components/Footer';

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

Modal.setAppElement(document.getElementById('root')! as HTMLDivElement);

function App() {
  /////////////////////////////////////////////////////////////////////////////////////////
  //NOTE: Modal functionality.
  //State form madal
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  /////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-center h-24 bg-orange-500 text-white'>
        <h1 className='text-4xl'>To Do List 📃</h1>
      </div>
      <TasksView handleOpenModal={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={
          "mx-auto my-8 w-4/5 h-[100hv]  bg-primary rounded-xl drop-shadow-2xl"
        }
      >
        <FormModal handleCloseModal={closeModal} />
      </Modal>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
