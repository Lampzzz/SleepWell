import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Importing custom modules
import connection from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoute from "./routes/userRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import recordRoutes from "./routes/recordRoute.js";
import superAdminRoute from "./routes/superAdminRoute.js";
import reminderRoute from "./routes/reminderRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
connection();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://sleepwell-client.vercel.app"],
    credentials: true,
  })
);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/images", express.static(path.join(__dirname, "upload/images")));
app.use("/videos", express.static(path.join(__dirname, "upload/videos")));

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoute);
app.use("/admin", adminRoutes);
app.use("/record", recordRoutes);
app.use("/super-admin", superAdminRoute);
app.use("/reminder", reminderRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello World");
});
