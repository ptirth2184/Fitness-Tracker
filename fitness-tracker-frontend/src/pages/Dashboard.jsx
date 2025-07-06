import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [badges, setBadges] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const name = localStorage.getItem("name");
    setUsername(name || "");

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [wRes, mRes, waterRes, badgeRes] = await Promise.all([
          fetch("http://localhost:5000/api/workouts", { headers }),
          fetch("http://localhost:5000/api/meals", { headers }),
          fetch("http://localhost:5000/api/water", { headers }),
          fetch("http://localhost:5000/api/badges", { headers }),
        ]);

        const workoutsData = await wRes.json();
        const mealsData = await mRes.json();
        const waterData = await waterRes.json();
        const badgeData = await badgeRes.json();

        setWorkouts(workoutsData.slice(0, 3));
        setMeals(mealsData.slice(0, 3));
        setWaterIntake(waterData.totalIntake || 0);
        setBadges(badgeData || []);
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome {username || "Back"} 👋</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Workouts */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">🏋️ Workouts</h2>
          {workouts.length ? (
            <ul className="space-y-1 text-sm">
              {workouts.map((w) => (
                <li key={w._id}>📌 {w.type} - {w.duration} min</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No workouts yet.</p>
          )}
          <button
            onClick={() => navigate("/workouts")}
            className="mt-3 text-blue-600 hover:underline text-sm"
          >
            Log a workout →
          </button>
        </div>

        {/* Meals */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">🍱 Meals</h2>
          {meals.length ? (
            <ul className="space-y-1 text-sm">
              {meals.map((m) => (
                <li key={m._id}>📍 {m.mealType} - {m.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No meals logged.</p>
          )}
          <button
            onClick={() => navigate("/meals")}
            className="mt-3 text-green-600 hover:underline text-sm"
          >
            Track a meal →
          </button>
        </div>

        {/* Water Intake */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">💧 Water Intake</h2>
          <p className="text-lg">{waterIntake} ml today</p>
          <button
            onClick={() => navigate("/water")}
            className="mt-3 text-blue-500 hover:underline text-sm"
          >
            Add water →
          </button>
        </div>

        {/* Achievements */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">🏅 Achievements</h2>
          {badges.length ? (
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b._id} className="bg-yellow-300 text-sm px-2 py-1 rounded">
                  🏆 {b.title}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No badges yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
