import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/dbconnection.js";
import userRouter from "./Routes/user.routes.js";
import productRouter from "./Routes/product.routes.js";
import { login } from "./Controllers/authController.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());


app.use("/user", userRouter);
app.use("/products", productRouter);
app.post("/login", login);

try {
  await sequelize.authenticate();
  console.log("connection established!");
} catch (error) {
  console.log(error)
  console.log("unable to connect!");
}

app.listen(process.env.PORT, () => {
  console.log("listening on port: " + process.env.PORT);
});