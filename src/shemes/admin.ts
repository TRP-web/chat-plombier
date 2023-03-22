import mongoose from "mongoose"
import { ICallRequestsName } from "./callRequests.js"
import { IJobRequestsName } from "./jobRequests.js"

export enum IAdminName {
    name = "Admin"
}

export interface IAdmin {
    callRequests: mongoose.Types.ObjectId
    jobRequests: mongoose.Types.ObjectId
}

const schemaAdmin = new mongoose.Schema<IAdmin>({
    callRequests: { type: mongoose.Schema.Types.ObjectId, required: true, ref: ICallRequestsName.name, },
    jobRequests: { type: mongoose.Schema.Types.ObjectId, required: true, ref: IJobRequestsName.name }
})

const Admin = mongoose.model(IAdminName.name, schemaAdmin)
export default Admin