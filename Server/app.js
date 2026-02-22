import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import AuthRoutes from "./Routes/AuthRoutes.js";
import ImageUploadRoutes from "./Routes/ProfileRoutes.js";
import SearchRoutes from "./Routes/SearchRoutes.js";
import UserRoutes from "./Routes/UserRoutes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", AuthRoutes);
app.use("/profile", ImageUploadRoutes);
app.use("/search", SearchRoutes);
app.use("/user", UserRoutes);

export default app;
