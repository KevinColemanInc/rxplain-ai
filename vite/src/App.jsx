import { useState } from "react";
import "./App.css";
import ChatArea from "./ChatArea";
import Contexts from "./Contexts";

function App() {
  const [filters, setFilters] = useState([]);

  return (
    <main className="flex flex-col justify-center gap-4 h-svh w-svw">
      <Contexts filters={filters} setFilters={setFilters} />
      <ChatArea contexts={filters} />
    </main>
  );
}

export default App;
