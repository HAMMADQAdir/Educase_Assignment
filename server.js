import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import db from "./utils/db_config.js"
const PORT  = process.env.PORT || 3000;

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

import schoolRoute from './route/school.route.js';
app.use("/api/school",schoolRoute);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})