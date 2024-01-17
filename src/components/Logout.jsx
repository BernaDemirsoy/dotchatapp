import React from 'react'
import { useNavigate } from 'react-router-dom'
import {logout} from "../services/api"
import {BiPowerOff} from 'react-icons/bi'
import '../style/logout.scss'

export default function Logout() {
    const navigate=useNavigate();
    const handleClick=async()=>{
        
        
        const response= await logout();
        if(response.status==200){
            localStorage.clear();
            navigate("/login");
        }
      
    };
  return (
    <button onClick={handleClick} className='button'>
        <BiPowerOff></BiPowerOff>
    </button>
  )
}
