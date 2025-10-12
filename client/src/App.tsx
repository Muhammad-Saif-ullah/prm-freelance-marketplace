import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [status, setStatus] = useState<string>("");

  const checkAPIStatus = async () => {
    try {
      setStatus("Checking API status...");
      const response = await fetch("http://localhost:3000");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStatus(`✓ Connected: ${data.message}`);
    } catch (error) {
      setStatus("✗ Error connecting to API");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="home-container">
              <div className="home-hero">
                <h1>Welcome to Freelance Marketplace</h1>
                <p>Connect with top talent or find your next opportunity</p>
                <div className="btn-group">
                  <a href="/register" className="btn-primary">Get Started</a>
                  <a href="/login" className="btn-secondary">Log In</a>
                </div>
                <div className="card card-centered">
                  <h3>API Status Check</h3>
                  <button onClick={checkAPIStatus} className="btn-primary mb-16">
                    Check API Connection
                  </button>
                  {status && (
                    <p className={`status-message ${status.includes('✓') ? 'status-success' : 'status-error'}`}>
                      {status}
                    </p>
                  )}
                </div>
              </div>
            </div>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
