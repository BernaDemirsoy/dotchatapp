import React,{useState,useEffect} from 'react'
import * as signalR from '@microsoft/signalr';
import "../style/chatContainer.scss"
import ChatInput from './ChatInput';
import Messages from './Messages';
import {sendMessageToBinaryGroup} from "../services/api"
import { useSelector } from 'react-redux';
import Logout from '../components/Logout';
export default function ChatContainer({currentChat,currentUser,chatType,receiverMessageNumber}) {

    const connection = useSelector(state => state.connection);
    const [receiveMessage,setReceiveMessage]=useState("");
    const [count,setCount]=useState(0);

    const handleSendMsg=async(msg)=>{
        
        try {
            if(chatType=="one"){
                const data={
                    message:msg,
                    receiverClientId:currentChat.id,
                    currentUserId:currentUser.data.id,
                };
                if (connection) {
                    
                    const response=await sendMessageToBinaryGroup(data);
                    if(response.status==200){
                        console.log(response.data);
                        connection.invoke("SendMessageToBinaryGroup",data).catch(error=>console.error(error));
                        // handleReceiveMsg(msg);
                       
                    }
                    
                    
                } else {
                    console.log('Bağlantı "Connected" durumunda değil.');
                }
            }
            else if(chatType=="two"){
    
            }
            else{
                console.log("chattype alınırken hata oldu");
            }
        } catch (error) {
            console.log(error.message);
        }
        
     };  
     useEffect(()=>{
        count=0;
        if(connection){
            connection.on("receiveMessage",msg=>{
                setReceiveMessage(msg);
                count++;
                setCount(count);
                receiverMessageNumber(count);
            });
        };
        console.log(receiveMessage);
     },[connection])
   
    
  return (
    <>
    {currentChat && (
        <div className='cc-Container'>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.groupAvatarImage || currentChat.avatarImage}`} alt='avatar'></img>
                </div>
                <div className="userName">
                    <h3>{currentChat.description??currentChat.userName}</h3>
                </div>
                
            </div>
           <Logout></Logout>
        </div>
        <Messages  receiveMessage={receiveMessage} currentChat={currentChat} currentUser={currentUser}></Messages>
        <ChatInput handleSendMsg={handleSendMsg} ></ChatInput>
    </div>
    )}
    </>
  )
}
