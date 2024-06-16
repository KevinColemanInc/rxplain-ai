import { useState } from "react";
import "./App.css";
import ChatArea from "./ChatArea";
import Contexts from "./Contexts";
import { Toaster } from "react-hot-toast";

function App() {
  const [filters, setFilters] = useState([
    "I feel light headed and sometimes I have trouble understanding things",
    "Provide examples",
    "explain like I am five",
  ]);

  return (
    <main className="flex flex-col justify-center items-center gap-4 h-screen w-screen bg-gray-100 p-5">
      <Contexts
        filters={filters}
        setFilters={setFilters}
        className="flex justify-center w-full max-w-screen-2xl"
      />
      <ChatArea
        contexts={filters}
        className="flex-1 max-h-[80vh] grid grid-cols-1 w-full"
      />

      <Toaster position="top-center" />
    </main>
  );
}

export default App;
