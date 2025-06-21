import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoute from './routes/contact.routes.js';

const app=express();
dotenv.config({path: new URL('../.env', import.meta.url)});

app.use(cors());
app.use(express.json());


app.use('/', contactRoute);


app.get('/', (req, res)=>{
    res.send("Backend is running successfully...");
});

app.listen(8800, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});