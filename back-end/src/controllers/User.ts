import { ITypeRequestBody } from "../types/ITypedRequest.js"
import express from "express"
import Admin from "../shemes/admin.js"
import UserService from "../services/User.js"
import JobRecquests, { IJobRequest, IJobRequests } from "../shemes/jobRequests.js"
import CallRequests from "../shemes/callRequests.js"
import mongoose from "mongoose"

interface ICallRequest {
    phoneNumber: string | undefined
    name?: string | undefined
}

// export interface IJobMethodRequest extends Omit<IJobRequest, "name" | "email"> {
//     name?: string
//     email?: string
// }
type IJobMethodRequest = Omit<IJobRequest, "_id">
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

    createJob = async (req: ITypeRequestBody<IJobMethodRequest>, res: express.Response) => {
        try {
            const body = req.body
            const bodyDay = body.time.dayInfo[0]
            const bodyDayTime = body.time.dayInfo[1]
            const AdminModel = await Admin.findOne({})

            if (AdminModel) {
                const jobRequestsModel = await JobRecquests.findById(AdminModel.jobRequests)
                const schedule = UserService.getSchedule(jobRequestsModel!)

                if (schedule[bodyDay][bodyDayTime] === false) {
                    const request = body
                    jobRequestsModel?.requests.push(request)
                    jobRequestsModel?.save().then(result => {
                        res.status(200).send({ message: "job request has created", jobRequest: result })
                    }).catch(err => res.status(400).send({ message: err.message }))

                } else res.status(400).send({ message: "schedule is busy" })
            } else res.status(500).send({ message: "server error: have't found an admin" })
        } catch (err) {
            res.status(500).send({ message: "server error" })
            console.log(err)
        }
    }

    getSchedule = async (req: express.Request, res: express.Response) => {
        try {
            const popJobRequests = await Admin.findOne({}).populate<{ jobRequests: IJobRequests }>("jobRequests")
            if (popJobRequests) {
                res.status(200).send(UserService.getSchedule(popJobRequests.jobRequests))
            } else res.status(500).send({ message: "admin don't find" })
        } catch (err) {
            res.status(500).send({ message: "server error" })
            console.log(err)
        }

    }
}

export default new UserController()