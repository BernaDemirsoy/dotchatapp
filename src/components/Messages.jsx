import React,{useEffect,useState} from 'react';
import * as signalR from '@microsoft/signalr';
import "../style/messages.scss";
import {getAllChatMessage,findGroupChatIdByClientId} from "../services/api"
import { useSelector } from 'react-redux';
import { BiCheckDouble } from "react-icons/bi";
export default function Messages({receiveMessage,currentChat,currentUser}) {
  const connection = useSelector(state => state.connection);
  const [messages,setmessages]=useState([]);
  const [defaultMsg,setDefault]=useState("Henüz bir mesajlaşma kaydı Yok");
  const [memberIds,setmembersIds]=useState([]);
  const connectionId = useSelector(state => state.connectionId);
  const fetchMessagesData=async()=>{
    const response=await getAllChatMessage(currentChat.chatGroupId);
    if(response.status==200){
        if(response.data.length>0){
          setmessages(response.data);
        }
        else{
          setmessages([]);
        }
    } 
  }
  useEffect(()=>{
  fetchMessagesData(); 
 console.log(messages);
 console.log(receiveMessage);
  },[currentChat,receiveMessage]);

  const formatDate = (dateTimeString) => {
    const dateTimeObject = new Date(dateTimeString);
    return dateTimeObject.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};
  return (
    <div className='msg-Container'>
      {
        
         messages.length===0 ? <div>{defaultMsg}</div>: messages.map((message)=>{
          return(
            <div>
              <div className={`message ${message.userId!=currentUser.data.id?"sended":"recieved"}`}>
                <div className="content">
                  <p className='msg'>
                    {message.message}
                  </p>
                  <div className='delivered-date-container'>
                    <p className='deliveredDate'>{formatDate(message.deliveredDate)}</p>
                    <p className={`status ${message.isRead?"readed":"unreaded"}`}>{message.isRead?"Okundu":"İletildi"}</p>
                    <BiCheckDouble size={20} className={`check ${message.isRead?"readed":"unreaded"}`}/>
                 
                  </div>
                </div>
              </div>
            </div>
          )
         })
      }
       
    </div>
  )
}
