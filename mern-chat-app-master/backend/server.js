import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
console.log("load env variable",process.env.PORT )

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); //to hold path of current directory



app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist"))); //to serve html css or js in frontend  combines absolute path stored in dirname with the relativ efrontend files path

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
}); //defined to serve index.html used to enable client side routing in singlepage application

server.listen(PORT, () => {
	connectToMongoDB(); //calls the func to connect to MongoDB
	console.log(`Server Running on port ${PORT}`);
});
