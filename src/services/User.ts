import { IJobRequest } from "../shemes/jobRequests.js"
import { ICallRequests } from "../shemes/callRequests.js"

class UserScrvice {
    createCall = (array: ICallRequests) => {
        console.log(array)
    }
    createJob = (obj: IJobRequest): {result: boolean, badkey?: string} => {

        // for (const key in objectt) {
        //     console.log(objectt[key])
        // }
        const objKeys = Object.keys(obj)
        const requiredArray = ["title", "description", "phoneNumber", "address"]
        for (let index = 0; index < requiredArray.length; index++) {
            const elem = requiredArray[index]
            if (!objKeys.includes(elem)) {
                return {result: false, badkey: elem}
            }
        }

        return {result: true}
    }
}

export default new UserScrvice()