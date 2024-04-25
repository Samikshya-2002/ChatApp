import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		// origin: ["http://localhost:3000"],
		origin:"*",
		methods: ["GET", "POST"],
	},
});

// export const getReceiverSocketId = (receiverId) => {
// 	return userSocketMap[receiverId];
// };

const userSocketMap = {}; // usersocketmap is an object wth this{userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") 
	{
		userSocketMap[userId] = socket.id;
	}

	socket.on("sendMessage",({senderId , receiverId ,message}) =>{
		const receiverSocketId = userSocketMap[receiverId];
		if(receiverSocketId )
		{
			io.to(receiverSocketId).emit("recieveMessage",{senderId,message});
		}
	} )

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap)); //gets all online users
	});
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

export { app, io, server };
