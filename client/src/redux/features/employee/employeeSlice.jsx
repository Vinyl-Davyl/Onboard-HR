// createAsyncThunk helping creae http request from redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";
import { toast } from "react-toastify";

const initialState = {
  employee: null,
  employees: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Employeee
const createEmployeee = createAsyncThunk(
  // giving it a name
  "employeees/create",
  async (formData, thunkAPI) => {
    try {
      return await employeeService.createEmployee(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("store value");
    },
  },

  // storing responses from createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(createEmployeee.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createEmployeee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      // employee in JSON
      console.log(action.payload);
      // pushing employee inside employees array to create new employee next
      state.products.push(action.payload);
      toast.success("Employee added successfully");
    });
    builder.addCase(createEmployeee.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    });
  },
});

export const { CALC_STORE_VALUE } = employeeSlice.actions;

export default employeeSlice.reducer;
