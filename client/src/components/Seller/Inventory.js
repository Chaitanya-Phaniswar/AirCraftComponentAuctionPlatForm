import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { AdminLogout } from '../important/Logout';
import { useNavigate } from 'react-router-dom';
import AddItems from './AddItem'
import { Button,Alert } from 'react-bootstrap';
import Popup from './CreateAuction'
const cookies = new Cookies()
export default function Inventory(props) {
    const [showPopup, setShowPopup] = useState(false);
    const handleShow = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);
    const navigate=useNavigate()
    const {error,setError,token} =props
    const [Inventory,setInventory]=React.useState([])
    const [modalItem,setModalItem]= React.useState([])
    const deleteItem=async(id)=>{
        fetch(`http://localhost:3001/seller/delete/${id}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(async (res)=>{
            const resi= await res.json()
            if(resi.message){
                setInventory(past => {
                    console.log(past)
                    return past.filter(x => x._id !== id)
                })
                setError("Success")
            }
        })
    } 
    React.useEffect(()=>{
        fetch(`http://localhost:3001/seller/inventory`,{
        method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },})
            .then(async (res) => {
                console.log("WHYHERE",res)
                if(res.status === 400){
                    setError({class:"warning",message:"Session Timed Out"})
                    AdminLogout()
                    navigate('/admin')
                }else{
                    const p=await res.json()
                    console.log(p)
                    setInventory(p.Inventory)
                    //console.log(Inventory)
                }
            }).catch(err => {
              setError('Something Went Wrong')
              navigate('/admin')  
          })
    },[])
    function trythis(x){
        handleShow()
        setModalItem(x)
    }
    function works(Inventory){
        console.log("Inventory",Inventory)
        if (Inventory == []){
            return <p>Nothing to Show</p>
        }
        return Inventory.map((x)=>{
            //console.log(x)
        return (
            <div key={Inventory.indexOf(x)} className="m-auto mt-1 mb-1 p-10">
                <div className="card-body">
                    <div className="row">
                        <p className='lil col-6'>{x.itemTitle}
                            <Button variant="primary btn-small" onClick={()=>trythis(x)}>
                                Send to Auction
                            </Button>
                            <Popup show={showPopup} item={modalItem} setError={setError} token={token} handleClose={handleClose} />
                            </p>
                        <p className='lil col-3'>{x.inInventory}
                        </p>
                        <p className='lil col-3'>${x.costPerItem}<Button className='btn-danger' onClick={()=>deleteItem(x._id)}>Delete</Button></p>
                    </div>
                </div>
            </div>
            );
        })
    }

  return (
    <>
            <div className='row colorit'>
                <div className="m-auto mt-1 mb-1 col">
                    <div className="card ">
                        <div className="card-body">
                            <div className="bg-info row">
                            <h5 className='lil col-6 m-0'>Component name</h5>
                            <h5 className='lil col-3 m-0'>Count</h5>
                            <h5 className='lil col-3 m-0'>Cost</h5>
                            </div>
                            {works(Inventory)}
                        </div>
                    </div>
                </div>
            <div className='col p-200'>
                    <AddItems token={token} navigate={navigate} setError={setError} setInventory={setInventory}/>
            </div>
           </div>
    </>
  );
}