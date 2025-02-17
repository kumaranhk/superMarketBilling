import mongooseConnect from "./src/utils/mongoose-connect.js";
import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import router from "./routes/routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
mongooseConnect();

app.use((req, res, next) => {
    console.log(`[${Date()}] :::: ${req.method} ${req.url}`);
    next();
});

app.use('/api',router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server listening in port', PORT);
});