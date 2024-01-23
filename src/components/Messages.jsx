import React,{useEffect,useState} from 'react';
import * as signalR from '@microsoft/signalr';
import "../style/messages.scss";
import {getAllChatMessage,findGroupChatIdByClientId} from "../services/api"
import { useSelector } from 'react-redux';
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
  debugger;
 console.log(messages);
  },[currentChat,receiveMessage])
  return (
    <div className='msg-Container'>
      {
        
         messages.length===0 ? <div>{defaultMsg}</div>: messages.map((message)=>{
          return(
            <div>
              <div className={`message ${message.userId!=currentUser.data.id?"sended":"recieved"}`}>
                <div className="content">
                  <p>
                    {message.message}
                  </p>
                </div>
              </div>
            </div>
          )
         })
      }
       
    </div>
  )
}
