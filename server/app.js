import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import ConnectDb from "./db/ConnectDb.js";
import homeSliderRouter from "./routes/Home/homeHeaderSlider/HomeHeaderSlider.js";
import homeCategoryRouter from "./routes/Home/homeCategory/HomeCategory.js";
import homePopularRouter from "./routes/Home/homePopular/HomePopular.js";
import blogRouter from './routes/Blog/Blog.js'
import blogPageRouter from './routes/Blog/BlogPage.js'
import aboutRouter from './routes/About/AboutPage.js'
import aboutOffersRouter from './routes/About/AboutOffers.js'
import brandsRouter from './routes/Brands/Brands.js'
import contactRouter from './routes/Contact/Contact.js'
import contactElementsRouter from './routes/Contact/ContactElements.js'
import shopRouter from './routes/Shop/Shop.js'
import shopReviewRouter from './routes/Shop/ShopReview.js'

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
app.use("/api/homepopular", homePopularRouter);
app.use("/api/blog",blogRouter)
app.use("/api/blogpage",blogPageRouter)
app.use("/api/aboutpage",aboutRouter)
app.use("/api/aboutoffers",aboutOffersRouter)
app.use("/api/brands",brandsRouter)
app.use("/api/contacts",contactRouter)
app.use("/api/contactelements",contactElementsRouter)
app.use("/api/shop",shopRouter)
app.use("/api/reviews",shopReviewRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});