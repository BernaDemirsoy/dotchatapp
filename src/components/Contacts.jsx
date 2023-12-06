import React,{useState,useEffect} from 'react'
import logo from "../assets/logo.svg"
import "../style/contacts.scss"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';

import { FormControl } from '@mui/material';
import Stack from '@mui/material/Stack';
import { PiAddressBookFill } from "react-icons/pi";

export default function Contacts({groups,contacts,currentUser,changeChat}) {
  const [currentUserName,setCurrentUserName]=useState(undefined);
  const [currentUserImage,setCurrentUserImage]=useState(undefined);
  const [currentSelected,setCurrentSelected]=useState(undefined);
  const [contactsArea,setContactsAres]=useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isGrupAdiEnabled,setIsGrupAdiEnabled]=useState(false);
  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.data.avatarImage);
      setCurrentUserName(currentUser.data.userName);
    }
  },[currentUser]);

  const handleAutocompleteChange = (event, value) => {
    setSelectedOptions(value);
    console.log(value.length);
    if(value.length>=2){
      setIsGrupAdiEnabled(true);
    }
    else{
      setIsGrupAdiEnabled(false);
    }
  };
 
  const handleCreateGroup=(e)=>{
    //buraya grup oluşturma apisi gelecek
  };

  const handleChangeContactsArea=()=>{
    setContactsAres(!contactsArea);
  }
  const changeCurrentChat=(index,contact)=>{
    setCurrentSelected(index)
    changeChat(contact)
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
                <FormControl margin='normal' sx={{ gap:5, color:"white"}}>
                <Autocomplete
                      multiple
                      sx={{ width: 300 }}
                      id="tags-outlined"
                      options={contacts}
                      getOptionLabel={(contact) => (
                        <div>
                          <AvatarGroup max={1}>
                          <Avatar style={{width:"1.5rem",height:"1.5rem",margin:"0"}} alt="avat" src={`data:image/svg+xml;base64,${contact.avatarImage}`} />
                          </AvatarGroup>
                          {contact.userName}
                        </div>
                      )}
                      filterSelectedOptions
                      value={selectedOptions}
                      onChange={handleAutocompleteChange}
                      renderInput={(params) => (
                        <TextField 
                        sx={{ backgroundColor:"#FF4B91", color:'white', borderRadius:2}}
                          {...params}
                          label="Kullanıcı Liste"
                          // placeholder="Kullanıcı Liste"
                        />
                      )}
                    />
                    <TextField label="Grup Adı" sx={{
                      backgroundColor: "#FF4B91",
                      color: "whitesmoke",
                      borderRadius: 2,
                    }}
                    disabled={!isGrupAdiEnabled}/>
                    <Button type="submit"color="secondary" variant="contained" sx={{ backgroundColor:"#FF4B91"}}disableElevation onClick={(e)=>handleCreateGroup(e)}>
                    Konuşmayı Başlat!
                  </Button>
                </FormControl>
                    
                </>
             : groups?
            contacts.map((group,index)=>{
              return (
                <div className={`group ${index===currentSelected?"selected":""}`} key={index} onClick={()=>changeCurrentChat(index,group)}>
                    <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${group.avatarImage}`} alt='avatar'></img>
                    </div>
                    <div className="description">
                      <h3>{group.description}</h3>
                    </div>
                </div>
              )
            }):<span>Henüz hiç bir sohbet başlatmadınız</span>
          }  
          
        </div>
        
      </div>

    )
    }
    </>
  )
}
