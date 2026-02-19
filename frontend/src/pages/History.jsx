import { useEffect, useState } from "react";
import { getAttempts } from "../api/quizApi";

function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAttempts()
      .then(res => {
        setData(res || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("History fetch error:", err);
        setData([]);
        setLoading(false);
      });
  }, []);

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="text-center text-lg font-medium">
        Loading history...
      </div>
    );
  }

  // ---------- STATS ----------
  const total = data.length;

  const avg =
    total === 0
      ? 0
      : Math.round(
          data.reduce((acc, cur) => acc + (cur.score || 0), 0) / total
        );

  const best =
    total === 0 ? 0 : Math.max(...data.map(a => a.score || 0));

  return (
    <div className="space-y-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold">
        Performance Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Attempts</p>
          <h2 className="text-3xl font-bold">{total}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Average Score</p>
          <h2 className="text-3xl font-bold">{avg}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Best Score</p>
          <h2 className="text-3xl font-bold">{best}</h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-left">

          {/* HEADER */}
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Score</th>
              <th className="p-4">Performance</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {data.length === 0 ? (
              <tr>
                <td className="p-6 text-center" colSpan="3">
                  No attempts yet
                </td>
              </tr>
            ) : (
              data.map((item, i) => {
                const percent = item.total
                  ? Math.round((item.score / item.total) * 100)
                  : 0;

                return (
                  <tr key={i} className="border-t">

                    {/* DATE */}
                    <td className="p-4">
                      {new Date(
                        item.created_at || item.date
                      ).toLocaleString()}
                    </td>

                    {/* SCORE */}
                    <td className="p-4 font-semibold">
                      {item.score}/{item.total}
                    </td>

                    {/* PERFORMANCE BADGE */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                          ${
                            percent >= 70
                              ? "bg-green-100 text-green-700"
                              : percent >= 40
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {percent}%{" "}
                        {percent >= 70
                          ? "Excellent"
                          : percent >= 40
                          ? "Average"
                          : "Needs Practice"}
                      </span>
                    </td>

                  </tr>
                );
              })
            )}

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default History;
