import { createSlice } from "@reduxjs/toolkit";

let name;
try {
  name = JSON.parse(localStorage.getItem("name"));
} catch (error) {
  // Handle parsing error
  name = "";
}

const initialState = {
  isLoggedIn: false,
  // initial things to be stored
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // setting the actions
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      // saving name to localStorage
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

// exporting actions
export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

// exporting state
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
