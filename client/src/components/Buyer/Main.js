import React, { useState } from 'react';
import Cookies from 'universal-cookie'
import YourBids from './YourBids'
import Auction from './Auction'
import { Alert } from 'react-bootstrap';
const cookies = new Cookies()
const YourPage = ({error,setError}) => {
  // Assume flag is initially false
  const {token}= cookies.get("BUYER-TOKEN")
  const [flag, setFlag] = useState(false);

  // Function to toggle the flag
  const toggleFlag = () => {
    setFlag(!flag);
  };

  return (
    <div className='main'>
        <div className="container col mt-5">
        {error && <Alert variant={error.class} onClose={()=>setError('')} dismissible>
                        <p>
                           {error.message}
                        </p>
                    </Alert>
          }
      {/* Button to toggle the flag */}
      <button onClick={toggleFlag}>{flag?"All Auctions":"Your Bids"}</button>

      {/* Conditionally render ComponentA or ComponentB based on the flag */}
      {!flag ? <Auction error={error} token={token} setError={setError}/> : <YourBids error={error} token={token}setError={setError}/>}
    </div>
    </div>
  );
};

export default YourPage;
