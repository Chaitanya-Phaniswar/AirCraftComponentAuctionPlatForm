// BuyerAuctions.js

import React, { useState, useEffect } from 'react';
import { Card ,Button,Alert} from 'react-bootstrap';
import Popup from './Payment'
const BuyerAuctions = ({ error,setError,token}) => {
  const [buyerAuctions, setBuyerAuctions] = useState([]);
  function calculateTimeLeft(createdAt, auctionDuration) {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);
    const endTime = new Date(createdAtDate.getTime() + auctionDuration * 60 * 60 * 1000);
  
    const timeLeftMilliseconds = endTime - currentDate;
  
    if (timeLeftMilliseconds <= 0) {
      // Auction has ended
      return "Ended";
    }
  
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeLeftMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeftMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeftMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    //const seconds = Math.floor((timeLeftMilliseconds % (1000 * 60)) / 1000);
  
    return days+":"+hours+":"+minutes;
  }
        // Replace 'your-api-endpoint' with the actual endpoint to fetch buyer auctions
        React.useEffect(()=>{
            fetch(`http://localhost:3001/auction/mybids`,{
            method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },})
                .then(async (res) => {
                    //console.log("WHYHERE")
                    if(res.status === 200){
                        const p=await res.json()
                        console.log(p)
                        setBuyerAuctions(p.yourbids)
                    }
                }).catch(err => {
                  setError({class:"danger",message:'Something Went Wrong'})
              })
        },[error])

        function tryog(x){
            fetch(`http://localhost:3001/auction/complete/${x._id}`,{
            method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },}).then(async res =>{
                const resp=await res.json()
                if(res.status === 200){
                    setError(resp)
                }
              })
        }
  return (
        
    <div className='row colorit'>
     <div className="m-auto mt-1 mb-1 col">
      <h2>Your Bids</h2>
      {buyerAuctions.map((auction) => (
        <Card key={auction._id} className="mb-4">
          <Card.Body>
            <div className='row'>
                <div className='col-8'>
            <Card.Title><b>{auction.itemTitle}</b></Card.Title>
            <Card.Text>{auction.itemDescription}</Card.Text>
            <Card.Text>Seller: <b>{auction.seller}</b></Card.Text>
            </div>
            <div className='col'>
            <Card.Text className="text-primary">Time Left: <b>{calculateTimeLeft(auction.createdAt,auction.auctionDuration)} Minutes</b></Card.Text>
            {auction.highestBid && <Card.Text>Current Bid: <b className='text-success'>${auction.highestBid.amount}</b></Card.Text>}
            <Card.Text>
            
             {calculateTimeLeft(auction.createdAt,auction.auctionDuration) === 'Ended' && <Button variant="primary btn-small" onClick={()=>tryog(auction)}>
                                Complete Payment
                            </Button>}
            </Card.Text>
            </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
    </div>
  );
};

export default BuyerAuctions;
