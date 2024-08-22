import mongoogse from "mongoose";
export const connectDB = async () => {
   const mongoURI = process.env.MONGO_URI;
   if (mongoURI) await mongoogse.connect(mongoURI);
};
