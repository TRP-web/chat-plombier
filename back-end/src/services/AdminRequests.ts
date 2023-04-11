import http from "http"
import { ISchedule } from "../models/ISchedule.js"
class AdminRequestsService {
    createBlock = async (): Promise<ISchedule> => {
        const promise = new Promise((resolve: (value: ISchedule) => void, reject) => {
            try {

                http.get("http://localhost:3000/get-schedule", (res) => {
                    let data = ""
                    res.on("data", (chunk) => {
                        data = data + chunk

                    })
                    res.on("end", () => {
                        const result: ISchedule = JSON.parse(data)
                        resolve(result)
                    })
                    res.on("error", (err) => {
                        console.log(err)
                    })
                })
            } catch (error) {
                reject(error)
            }
        })

        return promise




    }
}

export default new AdminRequestsService()