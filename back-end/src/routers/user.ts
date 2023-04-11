import express from "express"
import UserController from "../controllers/User.js"
export enum IUserRouters {
    createCall = "/create-call",
    createJob = "/create-job",
    getSchedual = "/get-schedule"
}

const userRouter = express.Router()

userRouter.post(IUserRouters.createCall, UserController.createCall)
userRouter.post(IUserRouters.createJob, UserController.createJob)
userRouter.get(IUserRouters.getSchedual, UserController.getSchedule)
export default userRouter