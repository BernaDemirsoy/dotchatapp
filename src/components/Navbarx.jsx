import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Image, Form, Button,Nav,Navbar, Row,Col } from 'react-bootstrap';
import logo from  "../assets/logo.svg"
import {logout} from '../services/api'
import { useSelector } from 'react-redux';

function Navbarx() {

  const navigate = useNavigate();
  // const connection = useSelector(state => state.connection);
  // const connectionId = useSelector(state => state.connectionId);

  const handleLogin=()=>{
    navigate(`/login/`);   
  }

  const handleLogout=async()=>{
    try {
      const response=await logout();
        if(response.status==200){
          if(localStorage.getItem("dot-chat-user")){

            localStorage.clear();
          }
          console.log("yes");
          navigate("/");
        }
        console.log("no");
    } catch (error) {
      console.log("Logout olunamadı"+error);
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
    <Container fluid >
      <Navbar.Brand href="/chat" style={{fontFamily:'sans-serif',fontSize:'30px', textDecorationStyle:'double',color:'#AF2655'}}>
      <Image variant="top" src={logo} style={{width: '80px', height: '60px', flexFlow:'row',alignItems:'center'}} alt="logo" />
      {' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
        {/* <Nav.Link href="/Chat">Chat</Nav.Link> */}
        </Nav>
        <Form className="d-flex ">
         <Row>
          <Col>
          <Button variant="outline-primary" onClick={handleLogin}>Login</Button>
          </Col>
          <Col>
          <Button variant="outline-dark" onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navbarx