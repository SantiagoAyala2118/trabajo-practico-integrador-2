import mongoose from "mongoose";

export const startDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://127.0.0.1:27017/${process.env.MONGODB_URI}`
    );
    // await mongoose.connection.dropDatabase();
    console.log("Database connected succesfuly");
  } catch (err) {
    console.error("Error conecting to the database", err);
  }
};
