import { useState } from "react";
import "./App.css";
import ChatArea from "./ChatArea";
import Contexts from "./Contexts";

function App() {
  const [filters, setFilters] = useState([]);

  return (
    <main className="flex flex-col justify-center items-center gap-4 h-screen w-screen bg-gray-100">
      <Contexts
        filters={filters}
        setFilters={setFilters}
        className="flex justify-center w-full max-w-screen-2xl"
      />
      <div className="flex-1 max-h-[80vh] grid grid-cols-1 w-full">
        <ChatArea contexts={filters} />
      </div>
    </main>
  );
}

export default App;
