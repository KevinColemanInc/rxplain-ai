import { useState } from "react";
import Chat from "./Chat";

function ChatArea({ contexts }) {
  console.log("chatarea.contexts", contexts);

  const [chatWindows, setChatWindows] = useState([""]);

  function onPhraseClick(url) {
    console.log("onPhraseClick", url);
    setChatWindows((prev) => [...prev, url]);
  }

  return (
    <>
      <div className="chat-area">
        {chatWindows.map((chatWindow, index) => (
          <Chat
            key={index}
            onPhraseClick={onPhraseClick}
            prompt={chatWindow}
            contexts={contexts}
          />
        ))}
      </div>
    </>
  );
}

export default ChatArea;
