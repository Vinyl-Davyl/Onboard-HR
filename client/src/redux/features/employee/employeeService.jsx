import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/employees/`;

//  Create New Employee(not using try catch to execute request, createAsyncThunk instead)
const createEmployee = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all Employees
const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete an Employee
const deleteEmployee = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

// Get an Employee
const getEmployee = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Update Employee
const updateEmployee = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const employeeService = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};

// Alternatively
// export const createEmployee = async (formData) => {
//   const response = await axios.post(API_URL, formData);
//   return response.data;
// };

export default employeeService;
