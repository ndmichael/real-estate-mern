import { configureStore } from "@reduxjs/toolkit";
import { searchPropertiesApi } from "./searchPropertiesApi";
import authReducer from "./authSlice";
import propertyReducer from "./propertySlice";
import agentReducer from './agentSlice';
import dashboardStat from './admin/dashboardSlice';
import adminUsers from './admin/usersSlice';
import adminAgents from "./admin/agentsSlice";
import adminInquiries from "./admin/inquiriesSlice";
import agentInquiries from "./inquiry/inquiriesSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    agent: agentReducer,
    adminDashboardStat: dashboardStat,
    adminUsers: adminUsers,
    adminAgents: adminAgents,
    inquiries: adminInquiries,
    agentInquiries: agentInquiries,

    [searchPropertiesApi.reducerPath]: searchPropertiesApi.reducer,
  },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(searchPropertiesApi.middleware),
});

export default store;
