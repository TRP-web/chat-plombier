import express from "express"
import AdminController from "../controllers/Admin.js"

export enum IAdminRouters {
    login = "/log-in",
}

const adminRouter = express.Router()

adminRouter.post(IAdminRouters.login, AdminController.logIn)

export default adminRouter