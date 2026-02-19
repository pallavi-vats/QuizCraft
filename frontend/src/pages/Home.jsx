import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  const startQuiz = () => {
    if (!topic) return alert("Enter topic");
    navigate(`/quiz?topic=${topic}&count=${count}`);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 w-[500px] space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Start Quiz
          </h1>

          <p className="text-gray-500 text-sm">
            Generate AI quiz instantly
          </p>
        </div>

        <input
          className="w-full border border-gray-300 bg-white p-3 rounded-lg text-gray-900"
          placeholder="Enter topic"
          value={topic}
          onChange={(e)=>setTopic(e.target.value)}
        />

        <input
          type="number"
          className="w-full border border-gray-300 bg-white p-3 rounded-lg text-gray-900"
          value={count}
          onChange={(e)=>setCount(e.target.value)}
        />

        <button
          onClick={startQuiz}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition"
        >
          Start Quiz
        </button>

      </div>

    </div>
  );
}

export default Home;
