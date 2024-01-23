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
import {createGroup,getAllGroupChats,createGroupMembers,groupExistingControl} from "../services/api"
import { useSelector } from 'react-redux';

export default function Contacts({contacts,currentUser,changeChat,setChatType}) {
   const connectionId = useSelector(state => state.connectionId);
   const connection = useSelector(state => state.connection);

  const [currentUserName,setCurrentUserName]=useState(undefined);
  const [currentUserImage,setCurrentUserImage]=useState(undefined);
  const [currentSelected,setCurrentSelected]=useState(undefined);
  const [contactsArea,setContactsAres]=useState(false);
  const [whichChatType,setValueforWhichChatType]=useState(0);
  const [groups, setGroupChats] = useState([]);
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
      setChatType(newValue);
      setCurrentSelected(undefined);
  };

  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.data.avatarImage);
      setCurrentUserName(currentUser.data.userName);
    }
  },[currentUser]);
  const createGroupForStarting=async()=>{
    try {
        // const data=new FormData();
        
        contacts.forEach(async contact => { 

            const exist=await groupExistingControl(contact.chatGroupId);
            const chatgroups=exist.data;
              if(chatgroups.length==0){
                    const data={
                      
                      description:currentUser.data.userName+"//"+contact.userName,
                      IsBinaryGroup:1};
                      debugger;
                    const response=await createGroup(data);
                    if(!(response.status=="200" && response.data!=null)){
                      console.log(response.error.message);
                    }else
                    {
                      console.log("grubun versi");
                      console.log(response);
                      const memberInfo={
                        currentUserId:currentUser.data.id,
                        chatGroup:response.data,
                        contactUser:contact};

                          //Yaratılan gruba member ataması yapıldı
                          const finalResonse=await createGroupMembers(memberInfo);
                          console.log("grup member bilgileri");
                          console.log(finalResonse.data);
                      };
                
              };
        });
       
 
    } catch (error) {
      alert(error.message+"grup oluşturulurken hata alındı");
    }
    
  };
  useEffect(()=>{
    allChatGroup();
  },[]);

  useEffect(()=>{

    if(contacts.length>0){
      createGroupForStarting();
    }
  },[contacts]);

  const allChatGroup=async()=>{
    const filteredId=0;
    const response=await getAllGroupChats(filteredId);
    if(response.data!=null && response.status=="200"){
      //console.log(response.data);
      setGroupChats(response.data);
    }  
  }
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

  //Api fonksiyonu
  async function createGroupFunc(data){

    try {
      //group yaratıldı
      const response=await createGroup(data);
      if(!(response.status=="200" && response.data!=null)){
       console.log(response.error.message);
      }else
      {
        console.log("grubun versi");
        console.log(response);
      }
      
    } catch (error) {
      
      console.log(error.message || "Bir hata oluştu.");
    }
  } 
  const handleCreateGroup=async(e)=>{
    e.preventDefault();
    const data=new FormData();
    try {
      const file=groupAvatarImage;
        const fileBase64Shorthed=await shortenBase64(file);
        console.log(fileBase64Shorthed);
        data.append("connectionId",connectionId);
        data.append("description",groupName);
        data.append("groupAvatarImage",fileBase64Shorthed);
        createGroupFunc(data);
        handleGroups();
        console.log(groups.length);
    } catch (error) {
      console.log(error.message || "Bir hata oluştu.");
    }
  };

  const handleChangeContactsArea=()=>{
    setContactsAres(!contactsArea);
  }
  const changeCurrentChat=(index,group)=>{
    debugger;
    setCurrentSelected(index)
    changeChat(group)
  }
  const handleGroups=()=>{
    connection.on("groups",grouplist=>{

      console.log("Serverdan gelen grup array");
      var filteredGroup=grouplist.filter(group => group.isBinaryGroup === 0);
      console.log(filteredGroup);
      setGroupChats(filteredGroup);
    });
    setContactsAres(!contactsArea);
   
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
                  }):<span>Henüz konuşma başlatılacak hiç kimse yok!</span>
                  }
                </div>
              )}

              {value === 'two' && (
                <div>
                  {groups.length>0?
                  groups.map((group,index)=>{
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
                  }):<span>Henüz hiç bir grup oluşturulmadı!</span>
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
