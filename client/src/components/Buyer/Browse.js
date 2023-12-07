import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
//import {Button,Card} from 'react-bootstrap'
import Cookies from 'universal-cookie'
import Logout from '../important/Logout'
import { Button } from 'react-bootstrap'
const cookies=new Cookies()
export default function Courses({error,setError}){
  const navigate=useNavigate()
  const {token,user}=cookies.get('BUYER-TOKEN')
  console.log(user)
  const [Components,setComponents] =React.useState([])
    React.useEffect(()=>{
      fetch("http://localhost:3001/buyer/browse",{
      method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },})
          .then(async (res) => {
              if(res.status === 400){
                //console.log("Heree ...")
                  setError("Session Timed Out")
                  Logout()
                  navigate('/login')
              }else{
                  const {items}=await res.json()
                  setComponents(items)
              }
          }).catch(err => {setError('Failed to Fetch')
            setError('Something Went Wrong')
            navigate('/login')  
        })
    },[])
    function Display(){
      if(Components.length!==0){
        const dataElements=Components.map((x)=>{
          //console.log(x)
          return (
            <div key={Components.indexOf(x)} className="">
                  <div className="row text-center">
                      <p className='lil col-5 p-1'>{x.itemTitle}</p>
                      <p className='lil col-2 p-1'>{x.costPerItem}</p>
                      <p className='lil col-2 p-1'>{x.sellerName || x.sellerEmail}</p>
                      <p className='lil col-3 p-1'><Link className="danger" to={`/chats?with=${x.sellerEmail}`}>Chat here</Link></p>
                  </div>
            </div>
              // <tr key={Components.indexOf(x)}>
              //   <td>{x.itemTitle}</td>
              //   <td>{x.costPerItem}</td>
              //   <td>{x.sellerName}</td>
              //   <td><Link className="danger" to={`/chats?with=${x.sellerEmail}`}>Chat here</Link></td>
              // </tr>
            );
         })
        return dataElements
      }else{
        return (
          <h4>Nothing To Show</h4>
        )
      }
      }
    return (
      <div className='container mt-5'>
      {error?
        <h2>{error}</h2>:
        <div className='m-auto mt-1 mb-1 col'>
                  <div className=" bg-info row text-center">
                      <h4 className='col-5 p-1'>Component</h4>
                      <h4  className='lil col-2 p-1'>Cost</h4>
                      <h4 className='lil col-2 p-1'>Seller</h4>
                      <h4 className='lil col-3 p-1'></h4>
                  </div>
                  {Display()}
            </div>}
      </div>
    )
}