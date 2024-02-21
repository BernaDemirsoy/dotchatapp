import React, { useEffect } from 'react';
import {updateConnectionLog,closedConnectionLog} from '../services/api';
import { useDispatch } from 'react-redux';
import { setConnection,setConnectionId } from '../features/action';
import { HubConnectionBuilder } from '@microsoft/signalr';

const ConnectionProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
   
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5189/Chat") 
      .build();

    dispatch(setConnection(connection));

    connection.start()
    .then(() => {
      console.log('Bağlantı başarıyla başlatıldı.');
      // Access connectionId after the connection is started
      // console.log('ConnectionId:', connection.connectionId);
      // dispatch(setConnectionId(connection.connectionId));
    })
    .catch(error => {
      console.error('Bağlantı başlatılırken hata oluştu:', error);
    });
      

  },[]);

  return <>{children}</>;
};

export default ConnectionProvider;
