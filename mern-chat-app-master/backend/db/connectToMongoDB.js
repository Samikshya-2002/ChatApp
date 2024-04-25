import mongoose from "mongoose";

const dburl=process.env.MONGO_DB_URL;
const connectToMongoDB = async () => {
	try {
		await mongoose.connect(dburl || "mongodb://localhost:27017/mern-chat-app"); //||"mongodb://localhost:27017/mern-chat-app");
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
