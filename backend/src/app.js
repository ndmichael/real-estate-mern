import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://real-estate-mern-li5w.onrender.com"] // production
    : ["http://localhost:5173"]; // local dev

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Backend API is running.");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/agent", agentRoutes);

export default app;
