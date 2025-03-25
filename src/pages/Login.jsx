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
    <form onSubmit={handleLogin} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">Login</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
        Sign In
      </button>
    </form>
  );
};

export default Login;
