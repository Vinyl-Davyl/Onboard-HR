import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/employees`;

//  Create New Employee(not using try catch to execute request, createAsyncThunk instead)
const createEmployee = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

const employeeService = {
  createEmployee,
};

// Alternatively
// export const createEmployee = async (formData) => {
//   const response = await axios.post(API_URL, formData);
//   return response.data;
// };

export default employeeService;
