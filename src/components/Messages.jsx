import React from 'react';
import * as signalR from '@microsoft/signalr';
import "../style/messages.scss";
import { useSelector } from 'react-redux';
export default function Messages({receiveMessage}) {
  const connection = useSelector(state => state.connection);
  // const connectionId = useSelector(state => state.connectionId);
  return (
    <div className='msg-Container'>{receiveMessage}</div>
  )
}
