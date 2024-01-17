import React,{useEffect,useState} from 'react';
import * as signalR from '@microsoft/signalr';
import "../style/messages.scss";
import {getAllChatMessage,findGroupChatIdByClientId} from "../services/api"
import { useSelector } from 'react-redux';
export default function Messages({receiveMessage}) {
  const connection = useSelector(state => state.connection);
  const [messages,setmessages]=useState([]);
  const [memberIds,setmembersIds]=useState([]);
  // const connectionId = useSelector(state => state.connectionId);

  // useEffect(async()=>{
  // //   const data={
  // //     clientUserId:currentChat.id,
  // //     currentUserId:currentUser.data.id,
  // // };
  // // const result=await findGroupChatIdByClientId(data);
  // // if(result.status==200){
  // //   setmembersIds(result.data);
  // // }
  
  // //   const response=await getAllChatMessage(data);
  // //   if(response.status==200){
  // //     debugger;
  // //     setmessages(response.data);
  // //   }
  // console.log(receiveMessage);
  // },[])
  return (
    <div className='msg-Container'>
       {receiveMessage}
    </div>
  )
}
