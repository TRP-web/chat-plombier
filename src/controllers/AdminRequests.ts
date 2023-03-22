import express from "express"

class AdminRerqustsController {
    getInfo = (req: express.Request, res: express.Response) => {
        res.status(200).send("admin info")
    }
}

export default new AdminRerqustsController()