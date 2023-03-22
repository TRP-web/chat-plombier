import mongoose from "mongoose"

export enum ICallRequestsName {
    name = "CallRequests"
}

interface ICallRequest {
    phoneNumber: string,
    name?: string
}
export interface ICallRequests {
    requests: ICallRequest[]
}

const schemaCallRequest = new mongoose.Schema<ICallRequest>({
    phoneNumber: { type: String, required: true },
    name: { type: String, required: false }
})

const schemaCallrequests = new mongoose.Schema<ICallRequests>({
    requests: {type: [schemaCallRequest], required: true}
})

const CallRequests = mongoose.model(ICallRequestsName.name, schemaCallrequests)
export default CallRequests