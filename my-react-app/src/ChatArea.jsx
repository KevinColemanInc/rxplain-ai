import { useState } from "react";
import Chat from "./Chat";

function ChatArea() {
  const [chatWindows, setChatWindows] = useState([
    <Chat onPhraseClick={onPhraseClick} prompt={"Hello!"} />,
  ]);

  function onPhraseClick(url) {
    console.log("onPhraseClick", url);
    setChatWindows((prev) => [
      ...prev,
      <Chat onPhraseClick={onPhraseClick} prompt={"Tell me about " + url} />,
    ]);
  }

  return (
    <>
      <div className="chat-area">
        {chatWindows.map((chatWindow, index) => chatWindow)}
      </div>
    </>
  );
}

export default ChatArea;
