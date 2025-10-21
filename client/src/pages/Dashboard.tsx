import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootState } from "../store/index.ts";

const Dashboard: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
    }
  }, [userData, navigate]);
  return (
    <div>
      <h1>User Dashboard</h1>
      {userData.user ? (
        <div>
          <h2>Welcome, {userData.user.name}!</h2>
          <p>Email: {userData.user.email}</p>
          <p>Role: {userData.user.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
