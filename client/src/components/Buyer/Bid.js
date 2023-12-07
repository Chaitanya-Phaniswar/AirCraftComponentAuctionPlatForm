// Popup.js

import React,{useState} from 'react';
import { Modal, Button,Form } from 'react-bootstrap';

const Popup = ({ show, handleClose,item,token ,setError}) => {
  
    const [bidAmount, setBidAmount] = useState('');
    function onSubmit(obj){
        fetch(`http://localhost:3001/auction/createbid/${item._id}`,{
          mode: 'cors',
          method: "POST",
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj)
      }).then(async (res) => {
          console.log(res)
          const data = await res.json()
          if(res.status === 401){
              setError(data.message)
          }else if(res.status === 400){
              setError(data.message)
           }else if(res.status === 201){
              setError(data)
              handleClose()
            }
          }).catch(err => {setError({class:"danger",message:"Failed To Fetch"})
        })
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({
        bidAmount: parseFloat(bidAmount),
      });
      setBidAmount('');
    };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Auction for <span className='text-success'>{item.itemTitle}</span></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="startingBid">
            <Form.Label>Bid Proposal:</Form.Label>
            <Form.Control
            type="number"
            placeholder="Enter starting bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            />
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* Add additional buttons or actions as needed */}
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
