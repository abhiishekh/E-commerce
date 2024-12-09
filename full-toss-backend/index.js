import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'
dotenv.config()
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL).then(()=>console.log("Database connected")).catch((e)=>console.log("An error occured" + e))

const app = express()
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173','https://iplshopping.vercel.app']
}));

app.use('/',userRoute)
app.use('/api/v1',userRoute)
app.use('/api/v1',productRoute)

app.listen(PORT,()=>{console.log(`listenning on port ${PORT}`)})