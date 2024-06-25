import express from 'express';
import {config} from "dotenv";
import morgan from 'morgan';

config();


const app = express();

//middleware
app.use(express.json());

//remove it in backend
app.use(morgan("dev"));

export default app;