import {React,useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from  "../assets/logo.svg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card, Image, Form, Button,Stack } from 'react-bootstrap';
import '../index.css';
import { register} from '../services/api';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';


function Register() {

    const navigate = useNavigate();
    const[userName,setUserName]=useState("");
    const[email,setEmail]=useState("");
    const[passwordHash,setPasswordHash]=useState("");
    const[confirmedPasswordHash,setConfirmedPasswordHash]=useState("");
    const connection = useSelector(state => state.connection);
    const connectionId = useSelector(state => state.connectionId);

    // useEffect(()=>{
    //     if(localStorage.getItem("dot-chat-user")){
    //         navigate("/");
    //     }
    // },[]);
    
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
           
            const data={
                userName:userName,
                email:email,
                passwordHash:passwordHash,
                confirmedPasswordHash:confirmedPasswordHash
            };
            const response= await register(data);
            const result=response.data.result.succeeded;
            if(result){
                toast.success("Kullanıcı başarıyla eklendi.", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                const userId=response.data.user.id;
                console.log(response.data.user.id);
                EncryptData(response.data.user);
                debugger;
                navigate(`/setavatar/${userId}`);  
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
                            
                            <Form.Group className="mb-3" controlId="formGroupUsername">
                                <Form.Label style={{fontWeight: 700}}>User Name</Form.Label>
                                <Form.Control type='text' placeholder='Username' name='userName' value={userName} onChange={(e)=>setUserName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label style={{fontWeight: 700}}>Email address</Form.Label>
                                <Form.Control type='email' placeholder='Email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label style={{fontWeight: 700}}>Password</Form.Label>
                                <Form.Control  type='password' placeholder='Password' name='passwordHash' value={passwordHash} onChange={(e)=>setPasswordHash(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label style={{fontWeight: 700}}>Confirmed Password</Form.Label>
                                <Form.Control type='password' placeholder='Confirmed Password' name='confirmedPasswordHash' value={confirmedPasswordHash} onChange={(e)=>setConfirmedPasswordHash(e.target.value)} />
                            </Form.Group>
                            <Form.Group>

                            <Stack gap={2} className="d-flex justify-content-center text-center">
                                <Button variant="primary" size="sm" type="submit" style={{fontWeight: 700}}>
                                    Create User
                                </Button>
                                <span>Already have an account ? <Link to={`/login`}>Login</Link></span>
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

export default Register;