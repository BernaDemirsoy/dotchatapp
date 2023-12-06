import React, { useState,useEffect} from 'react'
import { useNavigate, useParams} from "react-router-dom";
import * as signalR from '@microsoft/signalr';
import '../style/chat.scss';
import {getAllContacts,getUserById} from '../services/api'
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { useSelector } from 'react-redux';

function Chat() {
  const connection = useSelector(state => state.connection);
  const connectionId = useSelector(state => state.connectionId);
  const {userId}=useParams();
  const [contacts,setContacts]=useState([]);
  const [currentChat,setcurrentChat]=useState(undefined);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);
  const navigate=useNavigate();
  
 const fetchUser=async()=>{
    try {

      const user=await getUserById(userId);
      console.log(user);
      if(user){
        setCurrentUser(user);
        setIsLoaded(true);
      }
    } catch (error) {
      console.log("Kullanıcı bulunamadı");
    }
  }
const allContacts=async()=>{
  const response=await getAllContacts(userId);
  console.log(response.data);
  if(response.data!=null){
    setContacts(response.data)
  }
}
  useEffect(()=>{
    if(localStorage.getItem("dot-chat-user") ==null){
      navigate(`/login`);
    }else{ 
    fetchUser(userId);
    }
  },[])
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
  return (
    <div className='fully-container'>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {isLoaded && currentChat===undefined?
        (<Welcome currentUser={currentUser}/>) :
        (<ChatContainer currentChat={currentChat}/>)
        }
      </div>
    </div>
  )
}


export default Chat