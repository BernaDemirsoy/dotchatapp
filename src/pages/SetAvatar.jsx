import {React,useState,useEffect} from 'react'
import {  useNavigate,useParams } from 'react-router-dom';
import loader from "../assets/loading.gif"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image, Form, Button,Stack } from 'react-bootstrap';
import '../index.css';
import { selectAvatar,setAvatar} from '../services/api';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

export default function SetAvatar() {
    const navigate=useNavigate();
    const {userId}=useParams();
    const connection = useSelector(state => state.connection);
    const connectionId = useSelector(state => state.connectionId);
    const [avatars,setAvatars]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);

    //Localde saklanan veriyi Web Crypto API kullanarak şifreleme işlemi
    async function EncryptData(data){
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

    // useEffect(()=>{
    //     if(localStorage.getItem("dot-chat-user")){
    //         navigate(`/login/${connection}/${connectionId}`);   
    //     }
    // },[]);

    const setProfilePicture= async()=>{
        debugger;
        if(selectedAvatar===undefined){
            alert("please select an avatar")
        }else{
            console.log(userId);
            const data={
               
                avatarImage:avatars[selectedAvatar],
                isAvatarImageSet:true
            }
            const response=await setAvatar(userId,data);
            const result=response.data.result.succeeded;
            debugger;
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
                EncryptData(response.data.user);
                navigate(`/chat/${userId}`);   
            }
        }
    }
    useEffect(()=>{

        async function fetchData() {
            try {
              const data = await selectAvatar();
              setAvatars(data);
              setIsLoading(false);
            } catch (error) {
              console.error('Error fetching avatars:', error);
            }
        }
        fetchData();
    },[]);
    
  return (
    <>
    {
        isLoading ? <Container className='fullscreen-container'>
            <Image src={loader} alt='loader' className='loader'></Image>
        </Container> :(
                 <Container fluid className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                 <Row className="mb-5" >
                     <Col style={{backgroundColor:"#AF2655",color:"white",borderRadius:"10px"}}>
                     <h1>Pick an Avatar as your profile picture</h1>
                     </Col>
                 </Row>
                 <Row className='col-md-9 mx-auto text-center mb-5' >
                 { 
                 avatars.map((avatar,index)=>
                     {
                     return(
                             <Col key={index} className={`avatar ${selectedAvatar===index ? "selected" : ""}`}>
                             <Image className='picavatar' src={`data:image/svg+xml;base64,${avatar}`} 
                             alt='avatar'
                             onClick={()=>setSelectedAvatar(index)}
                             // style={{width:"200px",borderColor:"#AF2655",borderRadius:"360px",border:"10px solid"}}
                             ></Image>
                             </Col>           
                         );
                     })
                 }       
                 </Row>
                 <Row >
                     <button  className="button" onClick={()=>setProfilePicture()}>
                         Set as Profile Picture
                     </button>
                 </Row>
                
             </Container>

        )
            
    }
       
    </>

  )
}


