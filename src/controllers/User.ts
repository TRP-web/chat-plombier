import { ITypeRequestBody } from "../types/ITypedRequest.js"
import express from "express"
import Admin from "../shemes/admin.js"
import UserService from "../services/User.js"
import JobRecquests, { IJobRequest } from "../shemes/jobRequests.js"
import CallRequests from "../shemes/callRequests.js"

interface ICallRequest {
    phoneNumber: string | undefined
    name?: string | undefined
}

// export interface IJobMethodRequest extends Omit<IJobRequest, "name" | "email"> {
//     name?: string
//     email?: string
// }

class UserController {
    createCall = async (req: ITypeRequestBody<ICallRequest>, res: express.Response) => {
        try {
            const { phoneNumber, name } = req.body
            if (phoneNumber) {
                const AdminModel = await Admin.findOne({})
                if (AdminModel) {
                    const callRequestsModel = await CallRequests.findById(AdminModel.callRequests)

                    if (name) callRequestsModel?.requests.push({ phoneNumber, name })
                    else callRequestsModel?.requests.push({ phoneNumber })
                    callRequestsModel?.save().then(result => {
                        res.status(200).send({ message: "call request has created", newRequest: result })
                    })

                } else res.status(500).send({ message: "server error: have't found an admin" })
            } else res.status(400).send({ message: "phone is required" })
        } catch (err) {
            res.status(500).send({ message: "server error" })
            console.log(err)
        }
    }
    createJob = async (req: ITypeRequestBody<IJobRequest>, res: express.Response) => {
        try {
            const body = req.body
            const isBodyFull = UserService.createJob(body)

            if (isBodyFull.result) {
                const AdminModel = await Admin.findOne({})
                if (AdminModel) {
                    const jobRequestsModel = await JobRecquests.findById(AdminModel.jobRequests)
                    jobRequestsModel?.requests.push(body)
                    jobRequestsModel?.save().then(result => {
                        res.status(200).send({ message: "job request has created", jobRequest: result })
                    })
                } else res.status(500).send({ message: "server error: have't found an admin" })
            } else res.status(400).send({ message: `${isBodyFull.badkey} is required` })
        } catch (err) {
            res.status(500).send({ message: "server error" })
            console.log(err)
        }
    }
}

export default new UserController()