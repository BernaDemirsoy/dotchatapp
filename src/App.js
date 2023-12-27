import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Chat from "./pages/Chat"

import SetAvatar from './pages/SetAvatar'
import Layout from './pages/Layout'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Layout/>}>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login />}/>
          <Route path='setAvatar/:userId' element={<SetAvatar/>}/>
          <Route path='chat/:userId' element={<Chat/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}
