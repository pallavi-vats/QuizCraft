import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="w-60 bg-white border-r border-gray-200 p-5">

      <h1 className="text-2xl font-bold text-indigo-600 mb-8">
        QuizCraft
      </h1>

      <nav className="space-y-2">
        <Link to="/" className={linkStyle("/")}>Home</Link>
        <Link to="/quiz" className={linkStyle("/quiz")}>Quiz</Link>
        <Link to="/history" className={linkStyle("/history")}>History</Link>
        

      </nav>

    </div>
  );
}

export default Sidebar;
