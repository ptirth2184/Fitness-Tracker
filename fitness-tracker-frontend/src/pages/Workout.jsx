// src/pages/Workout.jsx
import { useEffect, useState } from "react";

const Workout = () => {
  const [formData, setFormData] = useState({ type: "", duration: "", date: "" });
  const [workouts, setWorkouts] = useState([]);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchWorkouts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/workouts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setWorkouts(data);
    } catch (err) {
      console.error("Error fetching workouts:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Workout logged!");
        setFormData({ type: "", duration: "", date: "" });
        fetchWorkouts(); // refresh list
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting workout:", err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Log Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input
          type="text"
          name="type"
          placeholder="Workout Type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={formData.duration}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Log Workout
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Previous Workouts</h3>
        <ul className="mt-2 space-y-2">
          {workouts.map((w) => (
            <li key={w._id} className="bg-white p-3 rounded shadow">
              {w.type} - {w.duration} min on {new Date(w.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Workout;
