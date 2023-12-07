import React from "react";
import Cookies from "universal-cookie";
import Button from 'react-bootstrap/Button';
import { Alert } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {useNavigate,Link} from 'react-router-dom'

//import { UserContext } from "../context/UserContext";
const cookies=new Cookies({})
function BasicExample({error,setError}) {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [user,setUser] =React.useState({email: '',password: ''})
  const handle=(event)=>{
      const {name, value}=event.target
      setUser(prev => ({...prev,[name]: value})) 
  }
  const onsubmit = event =>{
      event.preventDefault();
      setIsSubmitting(true)
      fetch('http://localhost:3001/seller/login',{
          mode: 'cors',
          method: "POST",
          credentials: 'include',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(user)
      }).then(async (res) => {
          //console.log(res)
          const data = await res.json()
          if(res.status === 401){
              setError(data)
          }else if(res.status === 400){
              setError(data)
           }else if(res.status === 200){
              cookies.set('SELLER-TOKEN',{token: data.token,user: data.user},{path: '/'})
              setError(data.error)
              navigate('/admin')
            }
            setIsSubmitting(false)
          }).catch(err => {setError("Failed To Fetch")
        setIsSubmitting(false)})
    }
    return (
      <div className="main">
        <div className="container col-6 col-sm-6 mt-50px">
          {error && <Alert variant={error.class} onClose={()=>setError('')} dismissible>
                        <p>
                           {error.message}
                        </p>
                    </Alert>
          }
    <Form className="bg-work rounded pt-3 pb-3 mycolor" onSubmit={onsubmit}>
    <div className="row-auto text-center text-"><h3><b>Seller Login</b></h3>
       </div>
      <Form.Group className="mb-3 m-auto col-10" controlId="formBasicEmail">
        <Form.Label className="textc">User Email</Form.Label>
        <Form.Control type="email" name='email' onChange={handle} value={user.email} placeholder="Email" required />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3 m-auto col-10" controlId="formBasicPassword">
        <Form.Label className="textc">Password</Form.Label>
        <Form.Control type="password" name='password' value={user.password} onChange={handle} placeholder="Password" required />
      </Form.Group>
      <div className="row">
      <Button variant="primary" className="col-6 m-auto mt-3 mb-3" type="submit" disabled={isSubmitting} onSubmit={onsubmit}>
        Submit
      </Button>
      </div>
      <div className="row align-items-spacearound">
        <Link to='/' className="m-auto col-4">Home</Link>
        <Link to='/admin/register' className="m-auto col-4">Register for Seller</Link>
      </div>
    </Form>
    </div>
    </div>
  );
}

export default BasicExample;