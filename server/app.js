import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import ConnectDb from "./db/ConnectDb.js";
import homeSliderRouter from "./routes/Home/homeHeaderSlider/HomeHeaderSlider.js";
import homeCategoryRouter from "./routes/Home/homeCategory/HomeCategory.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true,              
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/uploads", express.static("uploads/"));

ConnectDb();

app.use("/api/homeslider", homeSliderRouter);
app.use("/api/homecategory", homeCategoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});