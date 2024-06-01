import { useState } from 'react'
import './App.css'
import ChatArea from './ChatArea'
import Contexts from './Contexts'

function App() {

  return (
    <>
      <div>
        <Contexts/>
        <ChatArea />
      </div>
    </>
  )
}

export default App
