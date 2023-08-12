import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import Sidebar from "./components/sidebar/Sidebar";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/authSlice";
import AddEmployee from "./pages/addEmployee/AddEmployee";
import EmployeeDetail from "./components/employee/employeeDetail/employeeDetail";
import EditEmployee from "./pages/editEmployee/EditEmployee";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";

// enable save credentials accross entire app when making requests, skip adding const response = axios.get(``, userData, {withCredentials: true})
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  // getting login status, using from services
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-employee"
          element={
            <Sidebar>
              <Layout>
                <AddEmployee />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/employee-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <EmployeeDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-employee/:id"
          element={
            <Sidebar>
              <Layout>
                <EditEmployee />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
