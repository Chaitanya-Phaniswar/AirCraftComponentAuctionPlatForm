import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate,Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
function BasicExample({error,setError}) {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [user,setUser] =React.useState({email: '',username: '',password: '',proffession: 'Buyer'})
    const navigate = useNavigate()
    const handle=(event)=>{
      const {name, value}=event.target
      setUser(prev => ({...prev,[name]: value})) 
  }
  const onsubmit = async (event) =>{

      event.preventDefault();
        fetch('http://localhost:3001/buyer/register',{
        mode: 'cors',
        method: "POST",
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email:user.email, proffession: 'Buyer',password: user.password,username: user.username})
        }).then(async res => {
          console.log(res)
          const rt= await res.json()
           //console.log("Here",rt)
          if(res.status === 201){
            setError(rt)
            navigate('/login')
          }
          setError(rt)
        })
      }

    return (
      <div className="main">
      <div className="container col-6">

        {error && <Alert variant={error.class} onClose={()=>setError('')} dismissible>
                        <p>
                           {error.message}
                        </p>
                    </Alert>
          }
        <Form className="bg-dark rounded pt-3 pb-3 my-color">
        <div className="row text-center text-primary">
          <h3><b>Buyer Registration</b></h3>
       </div>
        <Form.Group className="mb-3 m-auto col-10" controlId="formBasicEmail">
          <Form.Label className="text-light">Email</Form.Label>
          <Form.Control type="email" name='email' onChange={handle} value={user.eamil} placeholder="email" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3 m-auto col-10" controlId="formBasicUsername">
          <Form.Label className="text-light">Username</Form.Label>
          <Form.Control type="text" name='username' value={user.username} onChange={handle} placeholder="username" />
        </Form.Group>

        <Form.Group className="mb-3 m-auto col-10" controlId="formBasicPassword">
          <Form.Label className="text-light">Password</Form.Label>
          <Form.Control type="password" name='password' value={user.password} onChange={handle} placeholder="Password" />
        </Form.Group>
        
        <div className="row">
        <Button variant="primary" className="col-6 m-auto mt-3 mb-3" type="submit" disabled={isSubmitting} onClick={onsubmit}>
          Submit
        </Button>
        </div>
        <div className="row align-items-space-between">
        <Link to='/' className="m-auto col-4">Return home</Link>
        <Link to='/login' className="m-auto col-4">Exixting User sign in here</Link>
      </div>
    </Form>
    </div>
  </div>
  );
}

export default BasicExample;