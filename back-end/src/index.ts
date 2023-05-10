import * as dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
import moment from "moment"

//---------------------------------//
import express from "express"
import mongoose from "mongoose"
import adminRouter from "./routers/admin.js"
import adminRequestsRouter from "./routers/adminRequests.js"
import userRouter from "./routers/user.js"
import createAdmin from "./funcitons/createAdmin.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(adminRouter)
app.use(adminRequestsRouter)
app.use(userRouter)

await mongoose.connect(DB_URL!, {}).then(() => { console.log("MongoDB (mongoose) has connected") })
app.listen(PORT, () => console.log("server has started"))

// createAdmin()
const date = new Date()
console.log(moment().month(date.getMonth()).day(5).format("D"))