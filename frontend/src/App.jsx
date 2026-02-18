import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  return (
    <div>
      <h1>QuizCraft</h1>
      <h2>{msg}</h2>
    </div>
  );
}

export default App;
