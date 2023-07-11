import React, { useEffect } from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/authSlice";
import { getEmployees } from "../../redux/features/employee/employeeSlice";
import EmployeeList from "../../components/employee/employeeList/EmployeeList";

const Dashboard = () => {
  // using redirect hook on session expiration
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const employeeState = useSelector((state) => state.employee); // Get the entire employee state

  const { employees, isLoading, isError, message } = employeeState;
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getEmployees());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <h2>Dashboard</h2>
      <EmployeeList />
    </div>
  );
};

export default Dashboard;
