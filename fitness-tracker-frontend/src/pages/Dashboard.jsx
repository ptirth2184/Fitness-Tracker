import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: fetch user info from backend here
    // setUsername("Tirth"); // hardcoded for now
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
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

      {/* Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Workout Tracker */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">🏋️ Workouts</h2>
          {/* Workout logging and list will go here */}
        </div>

        {/* Meal Tracker */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">🍱 Meals</h2>
          {/* Meal log and list will go here */}
        </div>

        {/* Water Intake */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">💧 Water Intake</h2>
          {/* Add + Total water logic will go here */}
        </div>

        {/* Badges / Achievements */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">🏅 Achievements</h2>
          {/* Display badges here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
