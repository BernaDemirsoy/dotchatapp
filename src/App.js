import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import Home from "./pages/Home"
import SetAvatar from './pages/SetAvatar'
import Layout from './pages/Layout'

export default function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/'  element={<Home/>}>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login />}/>
          <Route path='setAvatar/:userId' element={<SetAvatar/>}/>
          <Route path='chat/:userId' element={<Chat/>}/>
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
