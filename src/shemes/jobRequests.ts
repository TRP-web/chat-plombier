import mongoose from "mongoose"

export enum IJobRequestsName {
    name = "JobRecquests"
}

export interface IJobRequest {
    title: string
    description: string
    name?: string
    phoneNumber: string
    email?: string
    address: string
}

export interface IJobRequests {
    requests: IJobRequest[]
}

const schemaJobRecquest = new mongoose.Schema<IJobRequest>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    address: { type: String, required: true },
})
const schemaJobRecquests = new mongoose.Schema<IJobRequests>({
    requests: { type: [schemaJobRecquest], required: true }
})

const JobRecquests = mongoose.model(IJobRequestsName.name, schemaJobRecquests)
export default JobRecquests