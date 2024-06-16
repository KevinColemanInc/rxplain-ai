import { useRef, useState } from "react";
import Chat from "./Chat";
import { AnimatePresence } from "framer-motion";

function ChatArea({ contexts }) {
  const [chatWindows, setChatWindows] = useState([""]);
  const scrollList = useRef();

  function onPhraseClick(url, chatWindowIndex) {
    setChatWindows((prev) => {
      const newIndex = chatWindowIndex + 1;
      if (!prev[newIndex]) {
        // Scroll to the end of the chat list
        setTimeout(() => {
          scrollList.current.scrollTo({
            left: scrollList.current.scrollWidth,
            behavior: "smooth",
          });
        }, 50);
        return [...prev, url];
      } else {
        prev[newIndex] = url;
        prev.splice(newIndex + 1, prev.length - newIndex - 1);
        return [...prev];
      }
    });
  }

  return (
    <div
      ref={scrollList}
      className="flex h-full gap-4 flex-row overflow-x-auto pb-5 w-full snap snap-x snap-mandatory"
    >
      <AnimatePresence>
        {chatWindows.map((chatWindow, index) => (
          <Chat
            key={index}
            onPhraseClick={(url) => onPhraseClick(url, index)}
            prompt={chatWindow}
            containerClassName={
              chatWindows.length < 2 ? "mx-auto" : "snap-center"
            }
            contexts={contexts}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ChatArea;
