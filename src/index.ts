import * as dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
//---------------------------------//
import express from "express"
import mongoose from "mongoose"
import createAdmin from "./funcitons/createAdmin.js"
import adminRouter from "./routers/admin.js"
import adminRequestsRouter from "./routers/adminRequests.js"
import userRouter from "./routers/user.js"

const app = express()
app.use(express.json())
console.log(PORT)
app.use(adminRouter)
app.use(adminRequestsRouter)
app.use(userRouter)

await mongoose.connect(DB_URL!, {}).then(() => { console.log("MongoDB (mongoose) has connected") })
console.log()
app.listen(PORT, () => console.log("server has started"))

// await createAdmin()