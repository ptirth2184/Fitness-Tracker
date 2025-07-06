import { useState } from "react";

const Dashboard = () => {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ type, duration, note }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Log a Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Workout Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Duration (mins)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
