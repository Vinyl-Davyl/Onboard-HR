import React from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const Dashboard = () => {
  // using redirect hook on session expiration
  useRedirectLoggedOutUser("/login");
  return <div>Dashboard</div>;
};

export default Dashboard;
