import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await fetch("https://smart-nhv2.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error); // Display error message
        return;
      }

      const data = await response.json();

      // Store user ID and name in localStorage
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);

      alert("Login successful!");
      console.log("User ID:", data.user.id);
      console.log("User Name:", data.user.name);

      // Redirect to another page (e.g., dashboard)
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;