import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RedirectModal = ({ showModal, setError,token,modalItem,handleClose }) => {
  useEffect(() => {
    fetch(`http://localhost:3001/auction/mybids`,{
            method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
        }).then(async res => {
            if(res.status ==200){
                const resposne = await res.json()
                setError(resposne.error)
                clearTimeout(redirectTimeout)
            }
        })
    const redirectTimeout = setTimeout(() => {
        const newTab = window.open('htmj.html', '_blank');
        newTab.focus(); 
        handleClose()// Replace with the actual path
    }, 3000);
  }, []);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment processing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You will be redirected to the payment page shortly.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RedirectModal;
