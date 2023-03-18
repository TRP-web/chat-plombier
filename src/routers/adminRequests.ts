import express from "express"

enum IAdminRequestRouters {
    getNumbers = "/get-numbers",
    getRequests = "/get-requests",
    createBlock = "/block"
}

const adminRequests = express.Router()
adminRequests.use((req: express.Request, res: express.Response, next) => {
    const token = req.header("token")
    next()
})

adminRequests.get(IAdminRequestRouters.getNumbers, () => console.log("fun"))

export default adminRequests