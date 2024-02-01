import React,{useState,useEffect} from 'react'
import * as signalR from '@microsoft/signalr';
import "../style/chatContainer.scss"
import ChatInput from './ChatInput';
import Messages from './Messages';
import {sendMessageToBinaryGroup} from "../services/api"
import { useSelector } from 'react-redux';
import Logout from '../components/Logout';
export default function ChatContainer({currentChat,currentUser,chatType,contacts,setCounter}) {

    const connection = useSelector(state => state.connection);
    const [receiveMessage,setReceiveMessage]=useState("");
   

    const handleSendMsg=async(msg)=>{
        
        try {
            if(chatType=="one"){
                const data={
                    message:msg,
                    receiverClientId:currentChat.id,
                    currentUserId:currentUser.data.id,
                    chatGroupId:currentChat.chatGroupId
                };
                if (connection) {
                    
                    const response=await sendMessageToBinaryGroup(data);
                    if(response.status==200){
                        console.log(response.data);
                        connection.invoke("SendMessageToBinaryGroup",data).catch(error=>console.error(error));
                        debugger;
                        await handleSendUnreadedMessage();
                       
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
     useEffect(() => {
        
        const finalDataArray = [];
        if (connection) {
          connection.on("receiveMessage", (msg) => {
            setReceiveMessage(msg);
            const listedData = {};
            connection.on("receiveCount", (count) => {
              debugger;
              listedData.name = count.userName;
              listedData.count = count.count;
              const finalData = { ...listedData };
              finalDataArray.push(finalData);
              setCounter(finalDataArray);
            });

          });

         
        }
       
        
      }, [connection]);
      
      const handleSendUnreadedMessage = async () => {
        if (contacts.length > 0) {

              let data = {
                groupChatId: currentChat.chatGroupId,
                currentUserId: currentUser.data.id,
                receiverUserId: currentChat.id,
              };
      
              await connection.invoke("SetUnreadedMessage", data).catch((error) => console.error(error));
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
           <Logout></Logout>
        </div>
        <Messages  receiveMessage={receiveMessage} currentChat={currentChat} currentUser={currentUser}></Messages>
        <ChatInput handleSendMsg={handleSendMsg} ></ChatInput>
    </div>
    )}
    </>
  )
}
