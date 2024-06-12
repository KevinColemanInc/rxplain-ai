import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import ResponseBox from "./ResponseBox.jsx";

function Chat({ onPhraseClick, prompt, contexts, containerClassName }) {
  const [input, setInput] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false); // Dummy state for force update
  const [messages, setMessages] = useState([]);
  const hasCalledLLMRef = useRef(false); // Ref to track if callLLM has been called

  useEffect(() => {
    if (prompt && prompt.trim() !== "" && !hasCalledLLMRef.current) {
      console.log("Calling callLLM with prompt:", prompt);
      setMessages(() => []);
      callLLM("Tell me about " + prompt).finally(() => {
        hasCalledLLMRef.current = false; // Reset the ref to false after calling callLLM
      });
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
      const response = await fetch("http://localhost:8000/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_context: contexts.join(" "),
          history: messages,
          text_input: input,
        }),
      });

      if (response.ok) {
        const data = await response.json();
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
    <div
      className={`${containerClassName} flex flex-col h-full w-100 max-w-600 border border-gray-300 rounded flex-shrink-0 bg-white`}
    >
      <div className="flex-1 overflow-y-auto p-2.5 rounded-[5px] mb-2.5">
        {messages.map(
          (message, index) =>
            message.content && (
              <div
                key={index}
                className={`my-1.5 p-2.5 rounded-[5px] ${message.role === "user" ? "bg-blue-200 self-end text-right rounded-[30px]" : "bg-white self-start text-left"}`}
              >
                {message.role === "user" ? (
                  <div className="text-black font-medium font-mono">
                    {message.content}
                  </div>
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
      <div className="p-0 rounded border-none m-2.5 bg-gray-100">
        <form onSubmit={handleSendMessage} className="flex m-2.5">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none"
          />
          <button
            type="submit"
            className="py-1.5 px-2.5 rounded-[50px] border-none bg-gray-400 text-white ml-2.5 hover:bg-blue-400 active:bg-blue-400"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
