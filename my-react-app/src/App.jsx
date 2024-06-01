import { useState } from 'react'
import './App.css'
import ChatArea from './ChatArea'
import Contexts from './Contexts'
import SideBar from './SideBar'

function App() {

  return (
    <>
      <div>
        <Contexts/>
        <SideBar/>
        <ChatArea />
      </div>
    </>
  )
}

export default App
