import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

function Quiz() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const topic = params.get("topic");
  const count = params.get("count");

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  // ---------------- MOCK QUESTIONS ----------------
  useEffect(() => {
    if (topic && count) {
      setTimeout(() => {
        const mockQuestions = Array.from(
          { length: Number(count) },
          (_, i) => ({
            question: `Sample Question ${i + 1} on ${topic}?`,
            options: ["Option A", "Option B", "Option C", "Option D"]
          })
        );

        setQuestions(mockQuestions);
        setLoading(false);
      }, 800);
    }
  }, [topic, count]);

  // ---------------- SELECT ANSWER ----------------
  const setAnswer = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  // ---------------- PROGRESS CALC ----------------
  const progress =
    questions.length === 0
      ? 0
      : Math.round((Object.keys(answers).length / questions.length) * 100);

  // ---------------- SUBMIT ----------------
  const submit = () => {
    const total = questions.length;
    const score = Object.keys(answers).length;

    const details = questions.map((q, i) => ({
      question: q.question,
      user_answer: answers[i],
      correct_answer: "Option A",
      correct: true
    }));

    navigate("/result", {
      state: { score, total, details }
    });
  };

  // ---------------- LOADING SCREEN ----------------
  if (loading)
    return (
      <div className="flex justify-center items-center h-96 text-xl font-semibold">
        Loading Quiz...
      </div>
    );

  // ---------------- UI ----------------
  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <h1 className="text-3xl font-bold">
        Quiz on {topic}
      </h1>

      <p className="text-gray-500">
        Answer all questions before submitting
      </p>

      {/* PROGRESS BAR */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* QUESTIONS */}
      {questions.map((q, i) => (
        <div key={i}>
          <p className="text-sm text-gray-400 mb-1">
            Question {i + 1} of {questions.length}
          </p>

          <QuestionCard
            question={q}
            selected={answers[i]}
            setSelected={(val) => setAnswer(i, val)}
          />
        </div>
      ))}

      {/* SUBMIT BUTTON */}
      <button
        onClick={submit}
        disabled={Object.keys(answers).length !== questions.length}
        className={`w-full py-3 rounded-lg font-semibold text-white transition
          ${
            Object.keys(answers).length === questions.length
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        Submit Quiz
      </button>

    </div>
  );
}

export default Quiz;
