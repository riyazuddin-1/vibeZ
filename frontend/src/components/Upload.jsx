import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import config from '../config.json'

function Upload({width}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    var formData = new FormData(form);
    fetch(config['backend-server']+'upload', {
        method: 'POST',
        body: formData
    }).then((response)=> {
        console.log(response);
        document.getElementById("notify").innerHTML = "Uploaded successfully";
    })
}

  return (
    <>
      <Button variant={"primary " + width} onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload music</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='d-flex flex-column gap-2' onSubmit={submitHandler}>
            <label className='form-label' htmlFor='title'>Title</label>
            <input className='form-control' type='text' name='title' id='title' placeholder='title' required/>
            <label className='form-label' htmlFor='credits'>Credits to</label>
            <input className='form-control' type='text' name='credits' id='credits' placeholder='Ex: singer (or) composer'/>
            <label className='form-label' htmlFor='file'>Select the file(.mp3)</label>
            <input className="form-control" type="file" accept="audio/mp3" placeholder="Choose file" name="music" id="file" required/>
            <input className="form-control btn-primary" type="submit"/>
          </form>
        </Modal.Body>
        <Modal.Footer id='notify'>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Upload;