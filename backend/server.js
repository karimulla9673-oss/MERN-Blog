import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Verify environment variable
console.log("SECRET_KEY loaded:", process.env.SECRET_KEY ? "✓ Yes" : "✗ No");

// ===== Middleware =====
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://mern-blog-1-bkmw.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ===== API Routes =====
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// ===== React Frontend (only if serving frontend from backend) =====
// In your case frontend is on Render Static Site, so this part is optional
//const __dirname = path.resolve();
//app.use(express.static(path.join(__dirname, "/frontend/dist")));
//app.get("*", (_, res) => {
  //res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
  connectDB();
});

// Updated CORS config
