import express from "express"
import Admin from "../shemes/admin.js"
import CallRequests, { ICallRequests } from "../shemes/callRequests.js"
import JobRecquests, { IJobRequest, IJobRequests } from "../shemes/jobRequests.js"
import { ITypeRequestBody } from "../types/ITypedRequest.js"
import AdminRequestsService from "../services/AdminRequests.js"
import mongoose from "mongoose"

type IBlocked = IJobRequest["time"]

class AdminRerqustsController {
    getInfo = async (req: express.Request, res: express.Response) => {
        try {
            const popAdmin = await Admin
                .findOne({})
                .populate<{ jobRequests: IJobRequests }>("jobRequests")
                .populate<{ callRequests: ICallRequests }>("callRequests")
            // const popCallRequests = await Admin.findOne({}).populate<{ callRequests: ICallRequests }>("callRequests")
            if (popAdmin) {
                const result = {
                    calls: popAdmin.callRequests.requests,
                    jobs: popAdmin.jobRequests.requests,
                }
                res.status(200).send(result)
            }
        } catch (error) {
            res.status(500).send({ message: error })
        }
    }
    createBlock = async (req: ITypeRequestBody<IBlocked>, res: express.Response) => {
        try {
            const body = req.body
            const [dayOfWeek, timeOfDay] = body.dayInfo
            const schedule = await AdminRequestsService.createBlock()
            if (!schedule[dayOfWeek][timeOfDay]) {
                const AdminModle = await Admin.findOne({})
                const JobRequestModel = await JobRecquests.findById(AdminModle?.jobRequests)
                JobRequestModel?.requests.push({
                    // _id: new mongoose.Types.ObjectId(),
                    prise: 0,
                    address: "blocked",
                    description: "blocked",
                    phoneNumber: "blocked",
                    title: "blocked",
                    time: body
                })

                JobRequestModel?.save()
                    .then(result => { res.status(200).send({ result }) })
                    .catch(err => { res.status(500).send({ message: err.message }) })

            } else res.status(400).send({ message: "space in the schedule is busy" })
        } catch (error) {
            res.status(500).send({ message: error })
        }
    }
    deleteItemRequest = async (req: ITypeRequestBody<{ id?: mongoose.Types.ObjectId }>, res: express.Response) => {
        try {
            const id = req.body.id
            const AdminModel = await Admin.findOne({})

            if (id) {

                const JobRequestModel = await JobRecquests
                    .findOneAndUpdate(
                        { _id: AdminModel?.jobRequests },
                        { $pull: { requests: { _id: id } } },//this have a push
                        { new: true }
                    )

                JobRequestModel?.save()
                    .then(result => res.status(200).send(result))
                    .catch(err => res.status(500).send({ message: err }))
            } else res.status(400).send({ message: "id is required" })
        } catch (err) {
            res.status(500).send({ message: err })
        }
    }
    deleteCall = async (req: ITypeRequestBody<{ id: mongoose.Types.ObjectId }>, res: express.Response) => {
        const id = req.body.id
        if (!id) {
            return res.status(400).send({ message: "id is requied" })
        }
        const AdminModel = await Admin.findOne({})
        const CallRequestsModel = await CallRequests.findOneAndUpdate(
            { _id: AdminModel?.callRequests },
            { $pull: { requests: { _id: id } } },
            { new: true }
        )
        CallRequestsModel?.save()
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send({ message: err }))
    }
}

export default new AdminRerqustsController()