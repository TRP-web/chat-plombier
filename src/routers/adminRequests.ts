import dotenv from "dotenv"
dotenv.config()
const SECRET = process.env.SECRET
//-----------------------------//
import express from "express"
import jwt from "jsonwebtoken"
import AdminRerqustsController from "../controllers/AdminRequests.js"

enum IAdminRequestRouters {
    createBlock = "/create-block",
    deleteBlock = "/delete-block",
    info = "/get-info"
}

const adminRequestsRouter = express.Router()
adminRequestsRouter.use("/admin", (req: express.Request, res: express.Response, next) => {
    const token = req.header("token")
    if (token) {
        jwt.verify(token, SECRET!, (err, decode) => {
            console.log(decode)
            if (decode) {
                next()
            } else {
                res.status(400).send({ message: "bad token", })
            }
        })
    } else res.status(400).send({message: "bad token"})
})

adminRequestsRouter.get(IAdminRequestRouters.info, AdminRerqustsController.getInfo)

export default adminRequestsRouter