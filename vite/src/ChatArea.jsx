import { useRef, useState } from "react";
import Chat from "./Chat";

function ChatArea({ contexts }) {
  const [chatWindows, setChatWindows] = useState([""]);
  const scrollList = useRef();

  function onPhraseClick(url, chatWindowIndex) {
    setChatWindows((prev) => {
      const newIndex = chatWindowIndex + 1;
      if (!prev[newIndex]) {
        // Scroll to the end of the chat list
        setTimeout(() => {
          scrollList.current.scrollLeft = scrollList.current.scrollWidth;
        }, 50);
        return [...prev, url];
      } else {
        prev[newIndex] = url;
        return [...prev];
      }
    });
  }

  return (
    <>
      <div ref={scrollList} className="chat-area">
        {chatWindows.map((chatWindow, index) => (
          <Chat
            key={index}
            onPhraseClick={(url) => onPhraseClick(url, index)}
            prompt={chatWindow}
            containerClassName={chatWindows.length < 2 ? "mx-auto" : ""}
            contexts={contexts}
          />
        ))}
      </div>
    </>
  );
}

export default ChatArea;
