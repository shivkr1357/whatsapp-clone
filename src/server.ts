import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import routes from "./routes/index";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1", routes);

const initServer = async () => {
   await connectDB()
      .then(() => {
         console.log("Database connected");
         app.listen(port, () => {
            console.log("Listening to port " + port);
         });
      })
      .catch(() => {
         console.log("Unable to connect to Database");
      });
};

initServer();
