import React,{useContext} from "react";
import Cookies from 'universal-cookie'
import {Alert} from 'react-bootstrap'
import { Navigate, useNavigate } from "react-router-dom";
const cookies = new Cookies()
export default function Home({error,setError}){
    console.log(error)
    const navigate=useNavigate()
    function login(){
       if(cookies.get('BUYER-TOKEN')){
           navigate('/browse')
        }else{
            navigate('/login')
        }
    }
    function admin(x){
      if(cookies.get('SELLER-TOKEN')){
         if(x===1){
            navigate('/admin/inventory')
         }else if(x===2){
            navigate('/admin/chats')
         }
      }else{
         navigate('/admin/login')
      }
    }
    return (
        <div className="main">
            {error && <Alert variant={error.class} onClose={()=>setError('')} dismissible>
                        <p>
                           {error.message}
                        </p>
                    </Alert>
            }
         <h1 className="">Welcome to Aircraft Component Auction Platform</h1>
         <div>
            {
            cookies.get('BUYER-TOKEN') || cookies.get('SELLER-TOKEN')?
            (  cookies.get('BUYER-TOKEN')?
                  <button className="btn btn-secondary me-2" onClick={login}>
                     Browse Components
                  </button>:
                  <>
                  <button className="btn btn-secondary me-2" onClick={()=>admin(1)}>
                      Inventory
                  </button>
                  <button className="btn btn-secondary me-2" onClick={()=>admin(2)}>
                      Chats
                  </button></>)
                  :
                  <div>
                     <button className="btn btn-secondary me-2" onClick={login}>Buyer Login</button>
                     <button className="btn btn-secondary me-2" onClick={admin}>Seller Login</button>
                   </div>
               }
   
         </div>
        </div>
        )
}