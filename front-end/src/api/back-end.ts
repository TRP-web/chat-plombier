import axios from "axios"
const backEnd = axios.create({
    baseURL: process.env.SERVER,
})

export enum IUrls {
    login = "/log-in",
    createBlock = "/create-block",
    deleteBlock = "/delete-block",
    info = "/get-info",
    createCall = "/create-call",
    createJob = "/create-job",
    getSchedual = "/get-schedule",
}

export default backEnd