import { createContext, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess, authFailure, authStart } from "../redux/authSlice";
import axios from "axios";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { user: action.payload, loading: false, error: null };
    case "REGISTER_SUCCESS":
      return { user: action.payload, loading: false, error: null };
    case "AUTH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, loading: false, error: null });
  const reduxDispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      reduxDispatch(loginSuccess(user));
    }
  }, [reduxDispatch]);

  const register = async (name, email, password, role) => {
    try {
      dispatch({ type: "AUTH_START" });
      reduxDispatch(authStart());
      const res = await axios.post("/api/auth/register", { name, email, password, role });
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      reduxDispatch(loginSuccess(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE", payload: error.response?.data?.message || "Registration failed" });
      reduxDispatch(authFailure(error.response?.data?.message || "Registration failed"));
    }
  };

  const login = async (email, password) => {
    try {
      dispatch({ type: "AUTH_START" });
      reduxDispatch(authStart());
      const res = await axios.post("/api/auth/login", { email, password });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      reduxDispatch(loginSuccess(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE", payload: error.response?.data?.message || "Login failed" });
      reduxDispatch(authFailure(error.response?.data?.message || "Login failed"));
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    reduxDispatch(logoutSuccess());
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, error: state.error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
