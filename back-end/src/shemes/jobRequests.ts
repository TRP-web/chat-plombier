import mongoose from "mongoose"

export enum IJobRequestsName {
    name = "JobRecquests"
}

export enum ITimeOfDayList {
    morning = "morning",
    afternoon = "afternoon",
    evening = "evening"
}

export type ITimeOfDay = ITimeOfDayList.afternoon | ITimeOfDayList.morning | ITimeOfDayList.evening

export enum IDayOfWeekList {
    nextMonday = "nextMonday",
    nextTuesday = "nextTuesday",
    nextWednesday = "nextWednesday",
    nextThursday = "nextThursday",
    nextFriday = "nextFriday",
    nextSaturday = "nextSaturday",
    nextSunday = "nextSunday"
}

export type IDayOfWeek =
    IDayOfWeekList.nextMonday |
    IDayOfWeekList.nextTuesday |
    IDayOfWeekList.nextWednesday |
    IDayOfWeekList.nextThursday |
    IDayOfWeekList.nextFriday |
    IDayOfWeekList.nextSaturday |
    IDayOfWeekList.nextSunday

export interface IJobRequest {
    _id?: mongoose.Types.ObjectId
    title: string
    description: string
    name?: string
    phoneNumber: string
    email?: string
    address: string
    time: {
        dateCreated: Date,
        dayInfo: [IDayOfWeek, ITimeOfDay]
    }
}

export interface IJobRequests {
    requests: IJobRequest[]
}

const schemaJobRecquest = new mongoose.Schema<IJobRequest>({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    title: { type: String, required: [true, "\"title\" is required"] },
    description: { type: String, required: [true, "\"description\" is required"] },
    name: { type: String, required: false },
    phoneNumber: { type: String, required: [true, "\"phoneNumber\" is required"] },
    email: { type: String, required: false },
    address: { type: String, required: [true, "\"address\" is required"] },
    time: {
        dateCreated: { type: Date, required: [true, "\"dateCreated\" is required"] },
        dayInfo: { type: [String], required: [true, "\"dayInfo\" is required"] }
    }
})
const schemaJobRecquests = new mongoose.Schema<IJobRequests>({
    requests: { type: [schemaJobRecquest], required: true }
})

const JobRecquests = mongoose.model(IJobRequestsName.name, schemaJobRecquests)
export default JobRecquests