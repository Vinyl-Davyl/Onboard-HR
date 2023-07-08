// createAsyncThunk helping creae http request from redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("store value");
    },
  },
  // storing responses from createAsyncThunk
  extraReducers: (builder) => {},
});

export const { CALC_STORE_VALUE } = employeeSlice.actions;

export default employeeSlice.reducer;
