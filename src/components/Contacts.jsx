import React,{useState,useEffect} from 'react'
import logo from "../assets/logo.svg"
import "../style/contacts.scss"
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FormControl,FormGroup  } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import { PiAddressBookFill } from "react-icons/pi";
import {createGroupMembers,createGroup,getAllGroupChats} from "../services/api"
import { useSelector } from 'react-redux';

export default function Contacts({contacts,currentUser,optionsUser,changeChat}) {
   const connectionId = useSelector(state => state.connectionId);
   const connection = useSelector(state => state.connection);

  const [currentUserName,setCurrentUserName]=useState(undefined);
  const [currentUserImage,setCurrentUserImage]=useState(undefined);
  const [currentSelected,setCurrentSelected]=useState(undefined);
  const [contactsArea,setContactsAres]=useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [isGrupAdiEnabled,setIsGrupAdiEnabled]=useState(false);
  const [groupName,setGroupName]=useState("");
  const [groupAvatarImage,setgroupAvatarImage]=useState(undefined);
  const [value, setValue] = useState('one');

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

  const handleChange = (event, newValue) => {
      setValue(newValue);
      setCurrentSelected(undefined);
  };

  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.data.avatarImage);
      setCurrentUserName(currentUser.data.userName);
      allChatGroup();
    }
  },[currentUser]);


 // File'ı base64'e çevirme
const toBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject(new Error('Geçersiz dosya türü'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

//Base64'ün kısaltılması
const shortenBase64 = async (file) => {
  try {
    const base64String = await toBase64(file);

    // Kısaltma işlemi için örnek bir özet algoritması (SHA256)
    const hashedValue = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(base64String));

    // ArrayBuffer'ı hexadecimal bir stringe dönüştürme
    const hexString = Array.from(new Uint8Array(hashedValue)).map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hexString;
  } catch (error) {
    console.error('Hata:', error);
  }
};

  const handleAutocompleteChange = (event, value) => {
    setSelectedOptions(value);
  
    if(value.length>=2){
      setIsGrupAdiEnabled(true);
    }
    else{
      setIsGrupAdiEnabled(false);
    }
  };
 
  //Api fonksiyonu
  async function createGroupFunc(data){
  
    try {
      //group yaratıldı
      const response=await createGroup(data);
      console.log("grubun versi");
      console.log(response);
      if(!(response.status=="200" && response.data!=null)){
       console.log(response.error.message);
      };
      handleGroups();
    } catch (error) {
      
      console.log(error.message || "Bir hata oluştu.");
    }
  } 
  const handleCreateGroup=async(e)=>{
    e.preventDefault();
    // console.log(selectedOptions);
    const data=new FormData();
    try {
      const file=groupAvatarImage;
        const fileBase64Shorthed=await shortenBase64(file);
        console.log(fileBase64Shorthed);
        data.append("connectionId",connectionId);
        data.append("description",groupName);
        data.append("groupAvatarImage",fileBase64Shorthed);
        createGroupFunc(data);
        setContactsAres(!contactsArea);
    } catch (error) {
      console.log(error.message || "Bir hata oluştu.");
    }
  };
  const allChatGroup=async()=>{
    const response=await getAllGroupChats(currentUser.data.id);
    if(response.data!=null && response.status=="200"){
      console.log(response.data);
      setGroupChats(response.data);
    }
  }
  const handleChangeContactsArea=()=>{
    setContactsAres(!contactsArea);
    allChatGroup();
  }
  const changeCurrentChat=(index,group)=>{
    setCurrentSelected(index)
    changeChat(group)
  }
  const handleGroups=()=>{
    connection.on("groups",groups=>{
      console.log("Serverdan gelen grup array");
      console.log(groups);
    });
  }
  return (
    <>
    {currentUserImage && currentUserName &&(

      <div className='c-container'>
        <div className='c-container-header'>
            <div className="current-user">
              <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt='avatar'></img>
                  </div>
                  <div className="username">
                    <h2>{currentUserName}</h2>
                  </div>
              </div>
              <button onClick={handleChangeContactsArea}>
              <PiAddressBookFill></PiAddressBookFill>
              </button>
              
        </div>
        <div className="contacts">
        
        { contactsArea ?
                <>
                <FormControl size='small' margin='normal' sx={{ gap:5, color:"white"}}>
                  
                  <FormGroup>
                  <TextField label="Channel Name" sx={{
                      backgroundColor: "#FF4B91",
                      color: "whitesmoke",
                      borderRadius: 2,
                    }}
                    onChange={(e)=>setGroupName(e.target.value)}
                    value={groupName}
                    // disabled={!isGrupAdiEnabled}
                  />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      // disabled={!isGrupAdiEnabled}
                    >
                      {!groupAvatarImage?"Select a profile picture":groupAvatarImage.name}
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => {
                          if (e.target.files.length > 0) {
                            setgroupAvatarImage(e.target.files[0]);
                          } else {
                            setgroupAvatarImage(null);
                          }
                        }}
                      />
                    </Button>
                  </FormGroup>
                   
                    <Button type="submit" color="secondary" variant="contained" sx={{ backgroundColor:"#FF4B91"}} disableElevation onClick={(e)=>handleCreateGroup(e)}>
                    Create a new Channel!
                  </Button>
                </FormControl>
                    
                </>
             : <Box className="box" >
             <Tabs
               value={value}
               onChange={handleChange}
               textColor="secondary"
               indicatorColor="secondary"
               aria-label="secondary tabs example"
             >
               <Tab className="tab"value="one" label="Contacts" />
               <Tab className="tab"  value="two" label="Channels" />
              
             </Tabs>
             {value === 'one' && (
                <div>
                  {contacts.length>0?
                  contacts.map((contact,index)=>{
                  return (
                    <div className={`group ${index===currentSelected?"selected":""}`} key={index} onClick={()=>changeCurrentChat(index,contact)}>
                        <div className="avatar">
                          <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt='avatar'></img>
                        </div>
                        <div className="description">
                          <h3>{contact.userName}</h3>
                        </div>
                    </div>
                  )
                  }):<span>Henüz hiç bir grup oluşturmadınız</span>
                  }
                </div>
              )}

              {value === 'two' && (
                <div>
                  {groupChats.length>0?
                  groupChats.map((group,index)=>{
                  return (
                    <div className={`group ${index===currentSelected?"selected":""}`} key={index} onClick={()=>changeCurrentChat(index,group)}>
                        <div className="avatar">
                          <img src={`data:image/svg+xml;base64,${group.groupAvatarImage}`} alt='avatar'></img>
                        </div>
                        <div className="description">
                          <h3>{group.description}</h3>
                        </div>
                    </div>
                  )
                  }):<span>Henüz hiç bir sohbet başlatmadınız</span>
                  }
                </div>
              )}
           </Box>
          }  
          
        </div>
        
      </div>

    )
    }
    </>
  )
}
