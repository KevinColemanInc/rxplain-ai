import { useEffect, useRef, useState } from "react";
import ResponseBox from "./ResponseBox.jsx";
import { useStateCallback } from "./useStateCallback.js";

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
        },
      );
      hasCalledLLMRef.current = true; // Set the ref to true after calling callLLM
    } else {
      console.log(
        "Skipping callLLM due to empty or undefined prompt or already called",
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

    try {
      const response = await fetch("http://localhost:8000/prompt-static", {
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
    <div
      className={`${containerClassName} flex flex-col h-full w-full max-w-screen-2xl border border-gray-300 rounded flex-shrink-0 bg-white `}
    >
      <div className="flex-1 overflow-y-auto p-2.5 rounded-[5px] mb-2.5 w-max">
        {messages.map(
          (message, index) =>
            message.content && (
              <>
                <div key={index} className="flex items-start gap-2.5">
                  <ResponseBox
                    text={message.content}
                    onPhraseClick={onPhraseClick}
                  />
                  <button
                    id="dropdownMenuIconButton"
                    data-dropdown-toggle="dropdownDots"
                    data-dropdown-placement="bottom-start"
                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 4 15"
                    >
                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                  </button>
                  <div
                    id="dropdownDots"
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Reply
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Forward
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Copy
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Report
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ),
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
    </div>
  );
}

export default Chat;
