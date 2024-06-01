import { useState } from 'react'
import './App.css'
import ChatArea from './ChatArea'
import Context from './Contexts'

function App() {

  return (
    <>
      <div>
        <Context />
        <ChatArea />
      </div>
    </>
  )
}

export default App
