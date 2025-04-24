// import mongoose from "mongoose";

// let connected = false;

// const connectDB = async () => {
//   mongoose.set("strictQuery", true);

//   //   if the database is already connected, don't connect again
//   if (connected) {
//     console.log("MongoDB is already connected");
//     return;
//   }

//   //   Connect to mongoDB
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     connected = true;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default connectDB;

// mongodb+srv://onyangoemmanuel14:emmanuel333@cluster0.rwzw6cq.mongodb.net/propertypulse?authSource=admin

import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env");
  }

  // Check if already connected to MongoDB
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected");
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // process.exit(1); // Optionally exit the process
  }
};

export default connectDB;
