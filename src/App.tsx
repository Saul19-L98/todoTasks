import {useState} from 'react';
import Modal from 'react-modal';
import FormModal from './components/FormModal';
import TasksView from './components/TasksView';

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
    <div>
      <TasksView handleOpenModal={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <FormModal handleCloseModal={closeModal} />
      </Modal>
    </div>
  );
}

export default App;
