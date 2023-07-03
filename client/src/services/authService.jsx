import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async (userData) => {
  try {
    // Save FE/BE cookies, withCredentials
    const response = axios.get(`${BACKEND_URL}/api/users/register`, userData, {
      withCredentials: true,
    });
    if ((response.statusText = "OK")) {
      toast.success("User Registered Successfully");
    }
    return response.data;
  } catch (error) {
    // gets all possible error scenerio
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
