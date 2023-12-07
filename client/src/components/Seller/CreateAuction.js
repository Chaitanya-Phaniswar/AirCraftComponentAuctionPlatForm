// Popup.js

import React,{useState} from 'react';
import { Modal, Button,Form } from 'react-bootstrap';

const Popup = ({ show, handleClose,item,token ,setError}) => {
  
    const [auctionDuration, setAuctionDuration] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [startingBid, setStartingBid] = useState('');
    function onSubmit(obj){
        fetch(`http://localhost:3001/auction/createAuction/${item._id}`,{
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
              setError(data.error)
              handleClose()
            }
          }).catch(err => {setError({class:"danger",message:"Failed To Fetch"})
        })
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validate form data if needed
  
      // Call the onSubmit function with the form data
      onSubmit({
        auctionDuration: parseInt(auctionDuration, 10),
        itemDescription,
        startingBid: parseFloat(startingBid),
      });
  
      // Clear the form fields
      setAuctionDuration('');
      setItemDescription('');
      setStartingBid('');
    };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Auction for <span className='text-success'>{item.itemTitle}</span></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="auctionDuration">
            <Form.Label>Auction Duration (in hours):</Form.Label>
            <Form.Control
            type="number"
            placeholder="Enter duration"
            value={auctionDuration}
            onChange={(e) => setAuctionDuration(e.target.value)}
            required
            />
        </Form.Group>

        <Form.Group controlId="startingBid">
            <Form.Label>Starting Bid:</Form.Label>
            <Form.Control
            type="number"
            placeholder="Enter starting bid"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            required
            />
        </Form.Group>

        <Form.Group controlId="itemDescription">
            <Form.Label>Item Description:</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter item description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
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
