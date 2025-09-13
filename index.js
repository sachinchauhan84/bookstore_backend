import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();

// ✅ CORS setup (allow your Vercel frontend)
app.use(cors({
    origin: process.env.FRONTEND_URL || "*", // e.g. https://your-frontend.vercel.app
    credentials: true,
}));

app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI;

// connect to mongoDB
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
});

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// health check route
app.get("/", (req, res) => {
    res.send("📚 Bookstore API is running!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
});
