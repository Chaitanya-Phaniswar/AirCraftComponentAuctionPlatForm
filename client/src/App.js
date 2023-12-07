import './App.css';
import React from "react"
import Navbarn from "./components/Navbar"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from  './components/Home'
import Login from './components/Buyer/Login'
import Cookies from 'universal-cookie';
import Admin from './components/Seller/Login'
import Register from './components/Buyer/Register'
import Main from './components/Seller/Main';
import SellerRegister from './components/Seller/Register';
import Browse from './components/Buyer/Browse'
import Main2 from './components/Buyer/Main'
import Chat from './components/Chat'
import Purchase from './components/Purchase';
const cookies = new Cookies()
function App() {
  //const [userContext,setuserContext] = useContext(UserContext)
  const [error,setError]=React.useState("")
  return(
    <BrowserRouter>
        <Navbarn error={error}/>
        <Routes>
          <Route path='/' element={<Home error={error} setError={setError}/>}/>
          <Route path='/login' element={<Login error={error} setError={setError}/>}/>
          <Route path='/register' element={<Register error={error} setError={setError}/>}/> 
          <Route path="/browse" element={<Browse error={error} setError={setError}/>} />
          <Route path="/chats" element={<Chat error={error} setError={setError}/>}/>
          <Route path='/auctions' element={<Main2 error={error} setError={setError}/>}/>

          {!cookies.get('BUYER-TOKEN') && 
            <>
              <Route path='/admin' element={<Home error={error} setError={setError}/>} />
              <Route path='/admin/login' element={<Admin error={error} setError={setError}/>}/>
              <Route path="/admin/inventory" element={<Main error={error} setError={setError}/>}/>
              <Route path="/admin/register" element={<SellerRegister error={error} setError={setError}/>}/>
              <Route path='/purchases' element={<Purchase error={error} setError={setError}/>}/>
            </>
          }
          { (cookies.get('BUYER-TOKEN') || cookies.get('SELLER-TOKEN') ) &&
              <Route path='/purchases' element={<Purchase error={error} setError={setError}/>}/>
          }
        </Routes>
    </BrowserRouter>

  )}
export default App;
