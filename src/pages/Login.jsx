import {React,useState,useEffect} from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom';
import logo from  "../assets/logo.svg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card, Image, Form, Button,Stack } from 'react-bootstrap';
import '../index.css';
import { login,connectingLog} from '../services/api';
import { useSelector } from 'react-redux';

function Login() {
  const navigate = useNavigate();
  const[email,setEmail]=useState("");
  const[passwordHash,setPasswordHash]=useState("");
  const connection = useSelector(state => state.connection);
  const connectionId = useSelector(state => state.connectionId);

  async function fetchData(userData){
    const response=await connectingLog(userData);
    if(response.status==200){
      console.log("Log alındı");
    }
    else            
    console.log("log alınamadı"); 
  }

    //Localde saklanan veriyi Web Crypto API kullanarak şifreleme işlemi
    function EncryptData(data){
      const textToEncrypt =JSON.stringify(data);
      crypto.subtle.digest('SHA-256', new TextEncoder().encode(textToEncrypt ))
    .then(hashBuffer => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const encryptedData = btoa(hashArray.map(byte => String.fromCharCode(byte)).join(''));

      // Şifrelenmiş veriyi localStorage'e kaydetme
      localStorage.setItem("dot-chat-user", encryptedData);
    })
    .catch(error => console.error(error));
  }

  const handleSubmit= async(e)=>{
        e.preventDefault();
        
        try {
            const response= await login({
                email:email,
                passwordHash:passwordHash,
                
            });
            
            if(response.status==200){
              EncryptData(response.data);
                  let user=response.data;
                  // debugger;
                  // console.log(connection);
                  // console.log(connectionId?"connectionId":"yok");
                  let userData={
                      user:user,
                      connectionId:connectionId
                  }
                  console.log(userData);
                  fetchData(userData);
                  navigate(`/chat/${userData.user.id}`);   
            }
        } catch (error) {
            alert(error.message)
        }
       
    }
   
  return (
    <>
    <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh", fontFamily: "'Josefin Sans', sans-serif"}}>
            <Row className="justify-content-md-center">
                <Card className="bg-white"style={{width:'450px', height:'auto',color:'#FF4B91',border:'solid 10px',borderColor:"#FF4B91"}}>
                    <Row className='justify-content-md-center'>
                        <Image variant="top" src={logo} style={{width: '350px', height: '250px', flexFlow:'row',alignItems:'center'}} alt="logo" />
                    </Row>
                    <Card.Body>
                        <Form onSubmit={(e)=>handleSubmit(e)}>

                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label style={{fontWeight: 700}}>Email address</Form.Label>
                                <Form.Control type='email' placeholder='Email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label style={{fontWeight: 700}}>Password</Form.Label>
                                <Form.Control  type='password' placeholder='Password' name='passwordHash' value={passwordHash} onChange={(e)=>setPasswordHash(e.target.value)} />
                            </Form.Group>
                            
                            <Form.Group>

                            <Stack gap={2} className="d-flex justify-content-center text-center">
                                <Button variant="primary" size="sm" type="submit" style={{fontWeight: 700}}>
                                    Login
                                </Button>
                                <span>Need an account ?
                                <Link to={`/register`}>
                                  Register
                                </Link></span>
                            </Stack>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    </>

  )
}

export default Login