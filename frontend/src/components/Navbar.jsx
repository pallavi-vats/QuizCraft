import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/history">History</Link>
    </nav>
  );
}

export default Navbar;
