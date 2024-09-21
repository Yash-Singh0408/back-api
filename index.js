import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/Database.js";
import studentRouter from './router/student.router.js'
import authRouter from './router/auth.router.js'
import eventRouter from './router/Event.Router.js'
import adminRouter from './router/admin.router.js'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: 'https://front-app-neon.vercel.app', // Replace with your frontend URL
    credentials: true // This is necessary to allow cookies
  }));

// Add this after setting up the cors middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://front-app-neon.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

//Initialize Port Number
const PORT = process.env.PORT || 4000;

//Connect DB
connectDB();

//Routes
app.use('/api/student',studentRouter)
app.use('/api/auth',authRouter)
app.use('/api/event',eventRouter)
app.use('/api/admin',adminRouter)

//Listining
app.listen(PORT, () => console.log(`Server is Started On ${PORT}`));

