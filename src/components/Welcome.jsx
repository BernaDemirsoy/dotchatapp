import React, { useState,useEffect} from 'react'
import "../style/welcome.scss"
import Robot from "../assets/robot.gif"
export default function Welcome({currentUser}) {
useEffect(()=>{
console.log(currentUser);
},[])
  return (
    <div className='w-container'>
     <img src={Robot} alt="Robot"/>
     <h1>Welcome, <span>{currentUser.data.userName}!</span></h1>
     <h3>Please select a chat to start messaging!</h3>
    </div>
  )
}
