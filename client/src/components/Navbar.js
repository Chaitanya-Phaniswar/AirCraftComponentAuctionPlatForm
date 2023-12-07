import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'universal-cookie'
import Logout,{AdminLogout} from './important/Logout';
import image from '../assets/useful.png'

const cookies = new Cookies()
function CollapsibleExample({error}) {
  console.log(cookies.get('BUYER-TOKEN'))
  return (
    <div className='nav-bar'>
    {cookies.get('BUYER-TOKEN') &&
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">ACC Bidder</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="/auctions">Browse Auctions</Nav.Link>
          </Nav>
          {cookies.get("BUYER-TOKEN")?
            <Nav>
            <Nav.Link href='/' onClick={Logout}>Logout</Nav.Link>
            <Nav.Link href='/purchases'>{cookies.get("BUYER-TOKEN").user.username}<img className='icon' alt="" src={image}></img></Nav.Link>
            </Nav>
            :<Nav>
                  <Nav.Link href='/login'>Login</Nav.Link>
            </Nav>
          }     
        </Navbar.Collapse>
      </Container>
    </Navbar>
    }
    {cookies.get('SELLER-TOKEN') &&
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
            <Navbar.Brand href="/">  ACC Bidder  </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/admin/inventory">Inventory</Nav.Link>
              </Nav>
              {cookies.get('SELLER-TOKEN')?
                <Nav>
                  <Nav.Link href='/' onClick={AdminLogout}>Logout</Nav.Link>
                  <Nav.Link href='/chats' >Chats</Nav.Link>
                  <Nav.Link href='/purchases'>{cookies.get("SELLER-TOKEN").user.username}<img className='icon' alt="" src={image}></img></Nav.Link>
                </Nav>
                :<Nav>
                <Nav.Link href='/login'>Login</Nav.Link>
                </Nav>
              }     
            </Navbar.Collapse>
          </Container>
        </Navbar>
    }
    </div>
  );
}

export default CollapsibleExample;