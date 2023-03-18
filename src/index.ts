import * as dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT
//---------------------------------//
import express from "express";

const app = express()
app.use(express.json)

// await mongoose.connect(DB_URL, {}).then(() => { console.log("MongoDB (mongoose) has connected") })

app.listen(PORT, () => console.log("server has started"))