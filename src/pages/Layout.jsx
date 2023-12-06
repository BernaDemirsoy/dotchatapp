import {React,useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import { Provider } from 'react-redux';
import store from '../store';
import ConnectionProvider from '../components/ConnectionProvider';
import Navbarx from '../components/Navbarx'
import Home from './Home';

function Layout() {
    
  return (
    <>
     <Provider store={store}>
       <ConnectionProvider> 
        <Navbarx ></Navbarx>
        <Home />
      </ConnectionProvider>
     </Provider>
    </>
  )
}

export default Layout