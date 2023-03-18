import * as dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT
//---------------------------------//
import express from "express";
import adminRouter from "./routers/admin.js";
import adminRequests from "./routers/adminRequests.js";

const app = express()
app.use(express.json())
console.log(PORT)
app.use(adminRouter)
app.use(adminRequests)

// await mongoose.connect(DB_URL, {}).then(() => { console.log("MongoDB (mongoose) has connected") })

app.listen(PORT, () => console.log("server has started"))