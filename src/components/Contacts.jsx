import React,{useState,useEffect} from 'react'
import logo from "../assets/logo.svg"
import "../style/contacts.scss"

export default function Contacts({contacts,currentUser,changeChat}) {
  const [currentUserName,setCurrentUserName]=useState(undefined);
  const [currentUserImage,setCurrentUserImage]=useState(undefined);
  const [currentSelected,setCurrentSelected]=useState(undefined);
  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.data.avatarImage);
      setCurrentUserName(currentUser.data.userName);
    }
  },[currentUser]);

  const changeCurrentChat=(index,contact)=>{
    setCurrentSelected(index)
    changeChat(contact)
  }
  return (
    <>
    {currentUserImage && currentUserName &&(

      <div className='c-container'>
        <div className="brand">
          <img src={logo} alt='logo'></img>
          <h3>DotChat</h3>
        </div>
        <div className="contacts">
        {
            contacts.map((contact,index)=>{
              return (
                <div className={`contact ${index===currentSelected?"selected":""}`} key={index} onClick={()=>changeCurrentChat(index,contact)}>
                    <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt='avatar'></img>
                    </div>
                    <div className="username">
                      <h3>{contact.userName}</h3>
                    </div>
                </div>
              )
            })
          }  
          
        </div>
        <div className="current-user">
          <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt='avatar'></img>
              </div>
              <div className="username">
                 <h2>{currentUserName}</h2>
              </div>
          </div>
      </div>

    )
    }
    </>
  )
}
