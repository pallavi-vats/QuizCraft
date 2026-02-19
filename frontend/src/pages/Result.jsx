import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.total) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
        <p className="text-lg font-semibold">No result available</p>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  const percent = Math.round((state.score / state.total) * 100);

  // 🎯 performance message
  const getMessage = () => {
    if (percent >= 80) return "Excellent performance 🚀";
    if (percent >= 50) return "Good job 👍";
    return "Keep practicing 📚";
  };

  // 🎨 color based on score
  const color =
    percent >= 80
      ? "text-green-600"
      : percent >= 50
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* RESULT CARD */}
      <div className="bg-white p-10 rounded-2xl shadow-md text-center space-y-4">

        <h1 className="text-3xl font-bold text-gray-800">
          Quiz Result
        </h1>

        <p className={`text-6xl font-extrabold ${color}`}>
          {percent}%
        </p>

        <p className="text-gray-600 text-lg">
          {state.score} / {state.total} correct
        </p>

        <p className="text-sm text-gray-500">
          {getMessage()}
        </p>

        {/* progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div
            className="h-3 rounded-full transition-all duration-500 bg-indigo-600"
            style={{ width: `${percent}%` }}
          />
        </div>

      </div>

      {/* DETAILS SECTION */}
      {state.details && (
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Answer Review
          </h2>

          {state.details.map((item, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 space-y-1"
            >
              <p className="font-medium">
                {i + 1}. {item.question}
              </p>

              <p>
                Your Answer:
                <span className={`ml-2 font-semibold ${
                  item.correct ? "text-green-600" : "text-red-500"
                }`}>
                  {item.user_answer || "Not answered"}
                </span>
              </p>

              {!item.correct && (
                <p className="text-green-600">
                  Correct Answer: {item.correct_answer}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition"
        >
          Try Again
        </button>

        <button
          onClick={() => navigate("/history")}
          className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          View History
        </button>
      </div>

    </div>
  );
}

export default Result;
