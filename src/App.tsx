import React,{FormEvent, useRef,useState} from 'react';
import Modal from 'react-modal';

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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [limitDate, setLimitDate] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log("Title: ", title);
    console.log("Description: ", description);
    console.log("Supervisor: ", supervisor);
    console.log("Limit Date: ", limitDate);
    closeModal();
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={subtitle}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form onSubmit={handleSubmit}>
        <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <br />
          <label>
            Supervisor:
            <input
              type="text"
              value={supervisor}
              onChange={(event) => setSupervisor(event.target.value)}
            />
          </label>
          <br />
          <label>
            Limit Date:
            <input
              type="date"
              value={limitDate}
              onChange={(event) => setLimitDate(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
}

export default App;
