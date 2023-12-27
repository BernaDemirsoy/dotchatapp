import React,{useState} from 'react';
import * as signalR from '@microsoft/signalr';
import "../style/chatInput.scss";
import Picker from "emoji-picker-react";
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';
export default function ChatInput({handleSendMsg,handleReceiveMsg}) {
    const [showEmejiPicker,setShowEmojiPicker]=useState(false);
    const [msg,setMessage]=useState("");

    const handleEmojiPickerHideShow=()=>{
        setShowEmojiPicker(!showEmejiPicker);
    }
    const handleEmojiClick=(emoji)=>{
        let message=msg;
        message+=emoji.emoji;
        setMessage(message);
    }
    const sendChat=(event)=>{
        event.preventDefault();
        if(msg.length>0){ 
            handleSendMsg(msg);
            setMessage("");
        }
        
    }
  return (
    <div className='ci-Container'>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                    showEmejiPicker && <Picker className="picker" onEmojiClick={(e)=>handleEmojiClick(e)}/>
                }
            </div>
        </div>
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input type='text' placeholder='type your message here' value={msg} onChange={(e)=>setMessage(e.target.value)}></input>
            <button className='submit'>
                <IoMdSend></IoMdSend>
            </button>
        </form>
    </div>
  )
}
