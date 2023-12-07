import React, { useState } from 'react';
import Cookies from 'universal-cookie'
import Inventory from './Inventory';
import ShowAuctions from './ShowAuctions'
import { Alert ,Button} from 'react-bootstrap';
const cookies = new Cookies()
const YourPage = ({error,setError}) => {
  // Assume flag is initially false
  const {token}= cookies.get("SELLER-TOKEN")
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
      <Button onClick={toggleFlag} variant='info'>{flag?"Go to Inventory":"Go to Auctions"}</Button>

      {/* Conditionally render ComponentA or ComponentB based on the flag */}
      {!flag ? <Inventory error={error} token={token} setError={setError}/> : <ShowAuctions error={error} token={token}setError={setError}/>}
    </div>
    </div>
  );
};

export default YourPage;
