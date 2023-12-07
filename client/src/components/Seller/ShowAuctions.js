// SellerListings.js
import React, { useState } from 'react';
import {Card,CardGroup,Button} from 'react-bootstrap'

const SellerListings = ({token,setError,error}) => {
  const [sellerListings, setSellerListings] = useState([]);
  const deleteAuction=async(id)=>{
    fetch(`http://localhost:3001/auction/delete/${id}`,{
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(async (res)=>{
        if(res.status===200){
            setError({class:"success",message:"Auction Removed"})
        }
    })
    } 
  React.useEffect(()=>{
    fetch(`http://localhost:3001/auction/auctions`,{
    method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },})
        .then(async (res) => {
            console.log("WHYHERE")
            if(res.status === 200){
                const p=await res.json()
                console.log(p)
                setSellerListings(p)
                //console.log(Inventory)
            }
        }).catch(err => {
          setError('Something Went Wrong')
      })
},[error])
  return (<>
    
    <div className='row colorit'>
     <div className="m-auto mt-1 mb-1 col">
      <h2 className="mb-4">Seller Listings</h2>
      <CardGroup>
        {sellerListings.map((listing) => (
          <Card key={listing._id}>
            <Card.Body>
              <Card.Title><b>{listing.itemTitle}<Button varient='warning' onClick={()=>deleteAuction(listing._id)}>Delete</Button></b></Card.Title>
              <Card.Text><b>{listing.itemDescription}</b></Card.Text>
              <Card.Text></Card.Text>
              <Card.Text>Starting Bid: <b>${listing.startingBid}</b></Card.Text>
              <Card.Text>Auction Duration: {listing.auctionDuration} hours</Card.Text>
              {listing.highestBid && <Card.Text>
                Highest Bid: <b>${listing.highestBid.amount}</b> by <b>{listing.highestBid.buyer}</b>
              </Card.Text>}
              {/* Add more details as needed */}
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </div>
    </div>
    </>
  );
};

export default SellerListings;
