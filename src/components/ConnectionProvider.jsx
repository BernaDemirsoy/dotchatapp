import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setConnection,setConnectionId } from '../features/action';
import { HubConnectionBuilder } from '@microsoft/signalr';

const ConnectionProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Bağlantıyı oluştur
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7063/Chat")  // Hub URL'sini belirtin
      .build();

    // Bağlantıyı Redux store'a set et
    dispatch(setConnection(connection));

    // Bağlantıyı başlat
    connection.start()
      .then(() => {
        console.log('Bağlantı başarıyla başlatıldı.');
      })
      .catch(error => {
        console.error('Bağlantı başlatılırken hata oluştu:', error);
      });

      // UserJoin olayını dinleme
       connection.on("UserJoin", (connectionId) => {
        console.log(`User connectionID: ${connectionId}`);
        dispatch(setConnectionId(connectionId));
      });

  }, [dispatch]);

  return <>{children}</>;
};

export default ConnectionProvider;