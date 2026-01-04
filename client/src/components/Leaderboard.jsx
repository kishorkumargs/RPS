import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Leaderboard( { refreshKey } ) {
  const { user } = useAuth();
  const [players, setPlayers] = useState([{username:"Kishor Kumar",highScore: 72},{_id: 2, username: "Murugan M", highScore: 68}]);
  const [loading, setLoading] = useState(true);
  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("/leaderboard");
      setPlayers(res.data);
    } catch (e) {
      console.error("Failed to fetch leaderboard", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [refreshKey]);


  if(loading) return <p>Loading leaderboard...</p>;
  return (
    <div>
      <p className="text-xl font-bold mb-1">Top Players</p>
      {players.length === 0 ? (
        <p>No data yet</p>
        ) : (
        <ul>
          {players.map((p, i) => (
            <li key={i}
              className={
              p._id === user?.id
              ? "bg-red-500 hover:bg-red-400 font-bold rounded-sm p-1 mb-1"
              : "p-1 rounded-sm hover:bg-gray-500 mb-1"}
              >
              #{i + 1} {p.username} - {p.highScore}
            </li>
          ))}
        </ul>
        )
      }
    </div>
  );
}

export default Leaderboard;