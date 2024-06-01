import { useState, useEffect } from "react";
import "./Chat.css";
import ResponseBox from "./ResponseBox.jsx";

function Chat({ onPhraseClick }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false); // Dummy state for force update

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      const userMessage = { text: input, user: "me" };
      setInput("");

      // Default response to be rendered
      const defaultResponse =
        "Sure, here's some information about lentil soup with marked interesting or complex phrases: Lentil soup is a [hearty](hearty) and [nutritious](nutritious) dish made from [lentils](lentils), a type of [legume](legume) known for their [high protein](high protein) and [fiber content](fiber content). [Lentils](lentils) come in various [colors](colors) such as [brown](brown), [green](green), and [red](red), each offering a slightly different [texture](texture) and [flavor profile](flavor profile). To make lentil soup, [lentils](lentils) are [cooked](cooked) with [aromatic](aromatic) [vegetables](vegetables) such as [onions](onions), [carrots](carrots), and [celery](celery) in a [flavorful](flavorful) [broth](broth) or [stock](stock). [Herbs](herbs) and [spices](spices) like [cumin](cumin), [coriander](coriander), and [bay leaves](bay leaves) are often added to enhance the [taste](taste) and [aroma](aroma) of the soup.";

      try {
        const response = await fetch(
          "https://683f-131-107-8-152.ngrok-free.app/prompt",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              new_context: "",
              old_context: "old_context_value",
              history: [{ role: "system", message: "example message" }],
              more_information: "optional info",
              text_input: input,
            }),
          }
        );

        if (response.ok) {
          const data = await response.text();
          const llmMessage = { text: data, user: "gpt" };
          setMessages((prevMessages) => [
            ...prevMessages,
            userMessage,
            llmMessage,
          ]);
          // Toggle forceUpdate to trigger re-render
          setForceUpdate((prev) => !prev);
        } else {
          console.error("Failed to get response from the LLM");
        }
      } catch (error) {
        console.error("Error:", error);
      }
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
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.user === "me" ? "my-message" : "gpt"
            }`}
          >
            {message.user === "me" ? (
              message.text
            ) : (
              <ResponseBox onPhraseClick={onPhraseClick} text={message.text} />
            )}
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
