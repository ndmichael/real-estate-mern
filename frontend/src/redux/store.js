import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import propertyReducer from "./propertySlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    user: userSlice
  },
});

export default store;
