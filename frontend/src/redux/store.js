import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import propertyReducer from "./propertySlice";
import agentReducer from './agentSlice';
import dashboardStat from './admin/dashboardSlice';
import adminUsers from './admin/usersSlice';
import adminAgents from "./admin/agentsSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    agent: agentReducer,
    adminDashboardStat: dashboardStat,
    adminUsers: adminUsers,
    adminAgents: adminAgents,
  },
});

export default store;
