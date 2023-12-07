
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Cookies from 'universal-cookie';
const cookies = new Cookies()
const BuyerAuctions = ({ error,setError}) => {
  const {user,token} = cookies.get('BUYER-TOKEN')?cookies.get('BUYER-TOKEN'):cookies.get('SELLER-TOKEN')
  console.log(user)
  const [items, setItems] = useState([]);
  
        React.useEffect(()=>{
            fetch(`http://localhost:3001/purchases/`,{
            method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },})
                .then(async (res) => {
                    //console.log("WHYHERE")
                    if(res.status === 200){
                        const p=await res.json()
                        console.log(p)
                        setError(p.error)
                        setItems(p.solditems || p.purchases)
                        //console.log(Inventory)
                    }
                }).catch(err => {
                  setError({class:"danger",message:'Something Went Wrong'})
              })
        },[])
  return (
    <div className='main'>
        <div className="container col mt-5">
    <div className='row colorit'>
     <div className="m-auto mt-1 mb-1 col">
      <h2>{user.proffession==='Buyer'?"ITems Purchases": "ITems Sold"}</h2>
      {items.map((auction) => (
        <Card key={auction._id} className="mb-4">
          <Card.Body>
            <div className='row'>
                <div className='col-8'>
                    <Card.Title><b>{auction.itemTitle}</b></Card.Title>
                    <Card.Text>{auction.itemDescription}</Card.Text>
                    <Card.Text>Seller: <b>{auction.seller}</b></Card.Text>
                </div>
                <div className='col'>
                    <Card.Text className="text-primary">{user.proffession === 'Seller'?"Sold on":"Bought on"}: <b>{auction.createdAt}</b></Card.Text>
                    <Card.Text>Buyer: <b>{auction.buyer}</b></Card.Text>
                    <Card.Text>Cost: <b>${auction.boughtAt}</b></Card.Text>
                </div>

            {/* Add more auction details as needed */}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
    </div>
    </div>
    </div>
  );
};

export default BuyerAuctions;
