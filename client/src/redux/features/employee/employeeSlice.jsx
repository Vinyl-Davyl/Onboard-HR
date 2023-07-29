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
export const createEmployee = createAsyncThunk(
  // giving it a name
  "employees/create",
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

// Get all Employeee
export const getEmployees = createAsyncThunk(
  // giving it a name
  "employees/getAll",
  async (_, thunkAPI) => {
    try {
      return await employeeService.getEmployees();
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
    builder.addCase(createEmployee.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      // employee in JSON
      console.log(action.payload);
      // pushing employee inside employees array to create new employee next
      state.employees.push(action.payload);
      toast.success("Employee added successfully");
    });
    builder
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get employees
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE } = employeeSlice.actions;

// exporting isLoading state to be used on addEmployee(& any part of app) when loading
// export const selectIsLoading = (state) => state.employee.isLoading;
export const selectIsLoading = (state) => state.employee;

export default employeeSlice.reducer;
