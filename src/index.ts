import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import authRoute from "./routes/Auth.route";
import errorHandler from "./middlewares/ErrorHandler";

import cors from 'cors';
import cartRoute from "./routes/cart.route";
import foodItemRoute from "./routes/food-item.route";
import orderRoute from "./routes/order.route";
import adminRoute from "./routes/admin.route";

env.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to db"))
  .catch((er) => console.log(er));

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/food-item", foodItemRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/admin", adminRoute);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});

