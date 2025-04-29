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

// import mongoose from "mongoose";

// const connectDB = async () => {
//   const uri = process.env.MONGODB_URI;

//   if (!uri) {
//     throw new Error("MONGODB_URI is not defined in .env");
//   }

//   // Check if already connected to MongoDB
//   if (mongoose.connection.readyState === 1) {
//     console.log("MongoDB is already connected");
//     return;
//   }

//   // Connect to MongoDB
//   try {
//     await mongoose.connect(uri);
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     // process.exit(1); // Optionally exit the process
//   }
// };

// export default connectDB;

// lib/mongoose.ts

import mongoose from "mongoose";

declare global {
  var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in your .env file");
}

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

global.mongoose = cached;

export default dbConnect;


// import mongoose from "mongoose";

// declare global {
//   var mongoose: {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
//   };
// }

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI in your .env file");
// }

// let cached = global.mongoose || { conn: null, promise: null };

// async function dbConnect(): Promise<typeof mongoose> {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     // 👇 Enable debug mode for Mongoose
//     mongoose.set("debug", true);

//     // 👇 Force dbName and a 5 second server selection timeout
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       dbName: "propertypulse",
//       serverSelectionTimeoutMS: 5000,
//       bufferCommands: false,
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// global.mongoose = cached;

// export default dbConnect;

