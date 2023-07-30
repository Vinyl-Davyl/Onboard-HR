import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice";
import employeeReducer from "../redux/features/employee/employeeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
});
