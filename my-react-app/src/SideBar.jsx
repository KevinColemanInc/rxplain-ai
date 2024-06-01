import { useState } from 'react'
import './SideBar.css'

function SideBar() {

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  }

  return (
      <div 
        className = {`sidebar ${isOpen ? 'open' : ''}`}
        onMouseEnter = {handleMouseEnter}
        onMouseLeave = {handleMouseLeave}
      >
        <div className = "side-container">
          <h3>Chats</h3>
        </div>
      </div>
  )
}

export default SideBar
