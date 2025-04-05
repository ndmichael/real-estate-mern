import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import propertyReducer from "./propertySlice";
import agentReducer from './agentSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    agent: agentReducer,
  },
});

export default store;
