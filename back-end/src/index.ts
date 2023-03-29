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
app.use(adminRouter)
app.use(adminRequestsRouter)
app.use(userRouter)

await mongoose.connect(DB_URL!, {}).then(() => { console.log("MongoDB (mongoose) has connected") })
app.listen(PORT, () => console.log("server has started"))

// await createAdmin()
console.log(Number(new Date()))
// process.once("SIGUSR2", () => {
//     process.kill(process.pid, "SIGUSR2")
// })

// process.on("SIGINT", () => {
//     // this is only called on ctrl+c, not restart
//     process.kill(process.pid, "SIGINT")
// })