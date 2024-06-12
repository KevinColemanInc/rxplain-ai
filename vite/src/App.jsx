import { useState } from "react";
import "./App.css";
import ChatArea from "./ChatArea";
import Contexts from "./Contexts";

function App() {
  const [filters, setFilters] = useState([]);

  return (
    <main className="flex flex-col justify-center gap-4 h-svh w-svw bg-gray-100">
      <Contexts filters={filters} setFilters={setFilters} />
      <div className="flex-1 max-h-[80svh] grid grid-cols-1">
        <ChatArea contexts={filters} />
      </div>
    </main>
  );
}

export default App;
