import React,{useState,useEffect} from 'react'
import * as signalR from '@microsoft/signalr';
import "../style/chatContainer.scss"
import ChatInput from './ChatInput';
import Messages from './Messages';
import {sendMessage} from "../services/api"
import { useSelector } from 'react-redux';
export default function ChatContainer({currentChat}) {

    const connection = useSelector(state => state.connection);
    // const connectionId = useSelector(state => state.connectionId);

    const [receiveMessage,setReceiveMessage]=useState("");

    const handleSendMsg=async(msg)=>{
        const data={
            message:msg,
            groupId:currentChat.id
        };
        if (connection) {
            const response=await sendMessage(data);
            if(response){
                console.log("Mesaj gönderildi");
            }
            else{
                console.log("mesaj gönderilemedi");
            }
            
            // connection.invoke('SendMessageAsync', msg).catch(error => console.log(`Mesaj gönderilirken hata oluştu: ${error}`));
          } else {
            console.log('Bağlantı "Connected" durumunda değil.');
        }
    };
    const handleReceiveMsg=async(msg)=>{

        if (connection) {
            connection.on("receiveMessage",msg=>{
                setReceiveMessage(msg);
            });
        }else {
            console.log('Bağlantı "Connected" durumunda değil.');
        }
    };
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
        </div>
        <Messages connection={connection} receiveMessage={receiveMessage}></Messages>
        <ChatInput handleSendMsg={handleSendMsg} handleReceiveMsg={handleReceiveMsg}></ChatInput>
    </div>
    )}
    </>
  )
}
