import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddItem = ({token,setError,navigate,setInventory}) => {
  const [formData, setFormData] = useState({
    itemName: '',
    costPerItem: 0,
    inInventory: 0
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("HEllo",name)
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formData,"Jello")
    fetch('http://localhost:3001/seller/additem',{
          mode: 'cors',
          method: "POST",
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      }).then(async (res) => {
          console.log(res)
          const data = await res.json()
          if(res.status === 401){
              setError(data.message)
          }else if(res.status === 400){
              setError(data.message)
           }else if(res.status === 200){
              console.log('Came here',data)
              setFormData({
                itemName: '',
                costPerItem: 0,
                inInventory: 0
              })
              setInventory(data.Inventory)
    
            }
            //setIsSubmitting(false)
          }).catch(err => {setError("Failed To Fetch")
        setError('NONE')})
  };

  return (

    <Form className="bg-work rounded p-10 pt-3 pb-3 mycolor" onSubmit={handleSubmit}>
      <h3 className="col-6 mb-3 m-auto">Add ITEM</h3>
      <Form.Group className="col-6 mb-3 m-auto" controlId="formBasicName">
        <Form.Label>Item Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Item name"
          name="itemName"
          value={formData.itemName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className=" col-6 mb-3 m-auto" controlId="formBasicEmail">
        <Form.Label>Cost per piece</Form.Label>
        <Form.Control
          type="number"
          placeholder="cost per piece"
          name="costPerItem"
          value={formData.costPerItem}
          onChange={handleInputChange}
        required/>
      </Form.Group>

      <Form.Group className=" col-6 mb-3 m-auto" controlId="formBasicPhone">
        <Form.Label>Count</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter phone"
          name="inInventory"
          value={formData.inInventory}
          onChange={handleInputChange}
        required/>
      </Form.Group>

    <Form.Group className="col-6 m-auto mt-3 mb-3 my-btn" >
        <Button className="col-12" variant="primary" type="submit">
            Add Item
        </Button>
      </Form.Group>
    </Form>
  );
};

export default AddItem;
