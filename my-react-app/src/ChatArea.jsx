import { useState } from "react";
import Chat from "./Chat";

function ChatArea() {
  function onPhraseClick(url) {
    console.log("onPhraseClick", url);
  }

  return (
    <>
      <div className="chat-area">
        <Chat onPhraseClick={onPhraseClick} />
      </div>
    </>
  );
}

export default ChatArea;
