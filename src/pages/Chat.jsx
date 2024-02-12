import React, { useState,useEffect} from 'react'
import { useNavigate, useParams} from "react-router-dom";
import * as signalR from '@microsoft/signalr';
import '../style/chat.scss';
import {getAllContacts,getUserById,groupExistingControl,createGroupMembers,createGroup} from '../services/api'
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { useSelector } from 'react-redux';

function Chat() {
  const connection = useSelector(state => state.connection);
  const connectionId = useSelector(state => state.connectionId);
  const {userId}=useParams();
  const [contacts,setContacts]=useState([]);
  const [newContacts,setNewContacts]=useState([]);
  const [currentChat,setcurrentChat]=useState(undefined);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [optionsUser,setOptionUser]=useState(undefined);
  const [chatType,setChatType]=useState("one");
  const [isLoaded,setIsLoaded]=useState(false);
  const [counterRealTime,setCounter]=useState([]);
  const [receiverMessageExists,setReceiverMessageExists]=useState(false);
  const [isCreateGroupExecuted, setIsCreateGroupExecuted] = useState(false);
  const navigate=useNavigate();
  
 const fetchUser=async()=>{
    try {
      const user=await getUserById(userId);
      console.log("user");
      console.log(user);
      if(user){
        const optionsUser={
          id:user.data.id,
          email:user.data.email,
          userName:user.data.userName,
          avatarImage:user.data.avatarImage,
          isAvatarImageSet:user.data.isAvatarImageSet
        };
        setCurrentUser(user);
        setOptionUser(optionsUser);
        setIsLoaded(true);
      }
    } catch (error) {
      console.log("Kullanıcı bulunamadı");
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("dot-chat-user") ==null){
      navigate(`/login`);
    }else{ 
    fetchUser(userId);
    }
  },[]);

  async function fetchData(user){
    connection.invoke("GetUser",user).catch(error=>console.error(error));
  }
  useEffect(()=>{

    if(currentUser){
      fetchData(currentUser.data);
    }
    
  },[connectionId]);

const allContacts=async()=>{
  const response=await getAllContacts(userId);
  // console.log(response.data);
  if(response.data!=null){
    setContacts(response.data);
  }
};


useEffect(()=>{
  if(currentUser){
     if(currentUser.data.isAvatarImageSet){
       allContacts();
     }else{
       navigate(`/setavatar/${currentUser.id}`)
     }
  }
  },[currentUser]);


const handleChatChange=(chat)=>{
setcurrentChat(chat);

}
const handleChatType=(type)=>{
  setChatType(type);
}

const handleCount=(counter)=>{
  setCounter(counter);
  console.log("chatteyim");
  console.log(counter);
}

  return (
    <div className='fully-container'>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} setChatType={handleChatType} currentChat={currentChat} counterRealTime={counterRealTime} />
        {isLoaded && currentChat===undefined?
        (<Welcome currentUser={currentUser}/>) :
        (<ChatContainer currentUser={currentUser} currentChat={currentChat} chatType={chatType} contacts={contacts} setCounter={handleCount}/>)
        }
      </div>
    </div>
  )
}


export default Chat