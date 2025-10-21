import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
    const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: "user/setUser", payload: data.user });
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
          <h2>Sign up for Freelance Marketplace</h2>
          <p className="auth-subtitle">Join thousands of freelancers and clients.</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
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
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password (min. 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="auth-input"
            >
              <option value="">Select your role</option>
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          <button type="submit" className="auth-btn">
            Create Account
          </button>
          
          <div className="auth-footer">
            <span className="auth-footer-text">
              Already have an account? <a href="/login" className="auth-link">Log In</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
