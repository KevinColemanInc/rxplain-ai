import { useState } from 'react';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      const userMessage = { text: input, user: 'me' };
      setMessages([...messages, userMessage]);
      setInput('');

      try {
        const response = await fetch('/api/llm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (response.ok) {
          const data = await response.json();
          const llmMessage = { text: data.response, user: 'gpt' };
          setMessages((prevMessages) => [...prevMessages, llmMessage]);
        } else {
          console.error('Failed to get response from the LLM');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user === 'me' ? 'my-message' : 'gpt-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      
    <div className="input-area">
      <form onSubmit={handleSendMessage} className="input-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="input-field"
        />
        <button type="submit" className="send-button">
        ↑
        </button>
      </form>
    </div>

    </div>
  );
}

export default Chat;
