import { useState } from "react";
import "./App.css";
import ChatArea from "./ChatArea";
import Contexts from "./Contexts";

function App() {
  const [filters, setFilters] = useState([]);

  return (
    <>
      <Contexts filters={filters} setFilters={setFilters} />
      <ChatArea contexts={filters} />
    </>
  );
}

export default App;
