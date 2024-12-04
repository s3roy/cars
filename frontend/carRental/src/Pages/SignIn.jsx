import React, { useState } from "react";
import API_BASE_URL from "../constant/api";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token
        localStorage.setItem("userID", data.userId); // Save token
        localStorage.setItem("username", email.split("@")[0]); // Save username (or fetch from API)
        setMessage("Login Successful!");
        navigate("/"); // Redirect to home page
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "80%",
        left: "40%",
        maxWidth: "400px",
        marginTop: "200px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Sign In</h2>
      <form
        onSubmit={handleSignIn}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "100%",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "100%",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#ff4d30",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </form>
      {message && (
        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: message.startsWith("Error") ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default SignIn;
