import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import ResponseBox from "./ResponseBox.jsx";

function Chat({ onPhraseClick, prompt, contexts }) {
  const [input, setInput] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false); // Dummy state for force update
  const [messages, setMessages] = useState([]);
  const hasCalledLLMRef = useRef(false); // Ref to track if callLLM has been called

  useEffect(() => {
    if (prompt && prompt.trim() !== "" && !hasCalledLLMRef.current) {
      console.log("Calling callLLM with prompt:", prompt);
      callLLM("Tell me about " + prompt);
      hasCalledLLMRef.current = true; // Set the ref to true after calling callLLM
    } else {
      console.log(
        "Skipping callLLM due to empty or undefined prompt or already called"
      );
    }
  }, [prompt]);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const callLLM = async (input) => {
    if (input.trim() === "") return;
    const userMessage = { content: input, role: "user" };
    setInput("");

    try {
      const response = await fetch(
        "https://683f-131-107-8-152.ngrok-free.app/prompt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_context: contexts.join(" "),
            history: messages,
            more_information: "optional info",
            text_input: input,
          }),
        }
      );

      if (response.ok) {
        const data = await response.text();
        const llmMessage = { content: data, role: "system" };
        setMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          llmMessage,
        ]);
        // Toggle forceUpdate to trigger re-render
        setForceUpdate((prev) => !prev);
        console.log("messages.messages", messages);
      } else {
        console.error("Failed to get response from the LLM");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      callLLM(input);
    }
  };

  // UseEffect to force re-render when forceUpdate changes
  useEffect(() => {
    // Do nothing here, just using forceUpdate to trigger re-render
  }, [forceUpdate]);

  return (
    <div className="chat-container">
      <div className="messages-container">
        {/* Render both user messages and default responses */}
        {messages.map(
          (message, index) =>
            message.content && (
              <div
                key={index}
                className={`message ${
                  message.role === "user" ? "my-message" : "gpt"
                }`}
              >
                {message.role === "user" ? (
                  <div>{message.content}</div> // Render user message.text
                ) : (
                  <ResponseBox
                    onPhraseClick={onPhraseClick}
                    text={message.content}
                  />
                )}
              </div>
            )
        )}
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
