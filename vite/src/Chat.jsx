import { useEffect, useRef, useState } from "react";
import ResponseBox from "./ResponseBox.jsx";
import { useStateCallback } from "./useStateCallback.js";
import { motion } from "framer-motion";
import DropdownButton from "./DropdownButton.jsx";
import toast from "react-hot-toast";

function Chat({ onPhraseClick, prompt, contexts, containerClassName }) {
  const [input, setInput] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false); // Dummy state for force update
  const [isStreamingMessage, setIsStreamingMessage] = useState(false); // Dummy state for force update
  const [messages, setMessages] = useStateCallback([]);
  const hasCalledLLMRef = useRef(false); // Ref to track if callLLM has been called

  useEffect(() => {
    if (prompt && prompt.trim() !== "" && !hasCalledLLMRef.current) {
      console.log("Calling callLLM with prompt:", prompt);
      setMessages(
        () => [],
        (updatedMessages) => {
          callLLM("Tell me about " + prompt, updatedMessages).finally(() => {
            hasCalledLLMRef.current = false; // Reset the ref to false after calling callLLM
          });
        }
      );
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

  const callLLM = async (input, listMessages = messages) => {
    if (input.trim() === "") return;
    const userMessage = { content: input, role: "user" };
    setInput("");

    const messageIndex = listMessages.length + 1;

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    let host = "http://localhost:8000";
    if (import.meta.env.PROD) {
      host = "https://rxplain-api.kcoleman.me/";
    }

    try {
      const response = await fetch("http://localhost:8000/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_context: contexts.join(" "),
          history: listMessages,
          text_input: input,
        }),
      });

      if (response.ok) {
        const reader = response.body.getReader();
        let decoder = new TextDecoder();
        let partialMessage = "";
        let done = false;
        setIsStreamingMessage(true);

        while (!done) {
          const { value, done: isDone } = await reader.read();
          done = isDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: !done });
            partialMessage += chunk;

            const llmMessage = { content: partialMessage, role: "system" };

            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
              if (newMessages[messageIndex]) {
                newMessages[messageIndex] = llmMessage;
              } else {
                newMessages.push(llmMessage);
              }
              return newMessages;
            });
          }
        }
        // Toggle forceUpdate to trigger re-render
        setForceUpdate((prev) => !prev);
        console.log("messages.messages", listMessages);
      } else {
        console.error("Failed to get response from the LLM");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsStreamingMessage(false);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className={`${containerClassName} flex flex-col h-full border w-[calc(100%-0.25rem)] md:w-6/12 border-gray-300 rounded flex-shrink-0 bg-white`}
    >
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto p-2.5 rounded-[5px] mb-2.5">
        {messages.map(
          (message, index) =>
            message.content && (
              <>
                <div key={index} className="flex items-start gap-2.5">
                  <ResponseBox
                    text={message.content}
                    onPhraseClick={onPhraseClick}
                  />
                  <DropdownButton
                    onCopy={() => {
                      navigator.clipboard.writeText(message.content);
                      toast.success("Copied message!");
                    }}
                  />
                </div>
              </>
            )
        )}
      </div>
      <div className="p-0 rounded border-none m-2.5 bg-gray-100">
        <form onSubmit={handleSendMessage} className="flex m-2.5">
          <input
            type="text"
            disabled={isStreamingMessage}
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none"
          />
          <button
            type="submit"
            disabled={isStreamingMessage}
            className="py-1.5 px-2.5 rounded-[50px] border-none bg-gray-400 text-white ml-2.5 hover:bg-blue-400 active:bg-blue-400"
          >
            ↑
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Chat;
