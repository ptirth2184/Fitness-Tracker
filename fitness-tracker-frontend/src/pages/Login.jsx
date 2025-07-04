import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 space-y-4">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-semibold">
          Login
        </button>
        <div className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
                Register here
            </Link>
        </div>

      </form>
    </div>
  );
};

export default Login;
