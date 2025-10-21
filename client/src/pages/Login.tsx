import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { User } from "../types";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        const userData: User = data.user;
        dispatch({ type: "user/setUser", payload: userData });
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (e) {
      setError("Server error");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Log in to Freelance Marketplace</h2>
          <p className="auth-subtitle">
            Welcome back! Please enter your details.
          </p>
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-btn">
            Log In
          </button>
          <div className="auth-footer">
            <span className="auth-footer-text">
              Don't have an account?{" "}
              <a href="/register" className="auth-link">
                Sign Up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
