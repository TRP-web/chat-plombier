import { IDayOfWeek, IJobRequest, IJobRequests, ITimeOfDay } from "../shemes/jobRequests.js"
import { ISchedule } from "../models/ISchedule.js"
type IEnDays = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
class UserScrvice {

    createJob = (obj: IJobRequest): { result: boolean, badkey?: string } => {

        const objKeys = Object.keys(obj)
        const requiredArray = ["title", "description", "phoneNumber", "address", "time"]
        for (let index = 0; index < requiredArray.length; index++) {
            const elem = requiredArray[index]
            if (!objKeys.includes(elem)) {
                return { result: false, badkey: elem }
            }
        }

        return { result: true }
    }
    week = 604800000
    msDay = 1000 * 60 * 60 * 24
    getSchedule = (requestsJobArray: IJobRequests): ISchedule => {

        const array = requestsJobArray.requests
        const dateNow = new Date()

        const schedule: ISchedule = {
            nextMonday: { afternoon: false, evening: false, morning: false },
            nextTuesday: { afternoon: false, evening: false, morning: false },
            nextWednesday: { afternoon: false, evening: false, morning: false },
            nextThursday: { afternoon: false, evening: false, morning: false },
            nextFriday: { afternoon: false, evening: false, morning: false },
            nextSaturday: { afternoon: false, evening: false, morning: false },
            nextSunday: { afternoon: false, evening: false, morning: false }
        }
        for (let index = 0; index < array.length; index++) {
            const element = array[index]
            const timeGep = Number(dateNow) - Number(element.time.dateCreated)

            const enDays: IEnDays[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

            if (timeGep < this.week) { // condition can be bad
                const elemDay: IDayOfWeek = element.time.dayInfo[0]
                //---getting next date of day ---//
                const day: any = elemDay.replace("next", "")
                const date = new Date(),
                    targetDay = enDays.indexOf(day),
                    targetDate = new Date(
                        Number(new Date()) + this.msDay
                    ),
                    delta = targetDay - date.getDay()
                console.log(delta)
                if (delta > 0) {
                    targetDate.setDate(date.getDate() + delta)
                } else if (delta === 0) {
                    targetDate.setDate(date.getDate() + 7) // test condition
                }
                else {
                    targetDate.setDate(date.getDate() + 7 + delta)
                }

                const futureDate = new Intl.DateTimeFormat("en",
                    { day: "numeric", month: "numeric", year: "numeric" }
                ).format(targetDate)
                console.log(futureDate, element.time.futureDate)
                if (futureDate === element.time.futureDate) {
                    const elemTime: ITimeOfDay = element.time.dayInfo[1]
                    schedule[elemDay][elemTime] = true
                }
            }
        }
        return schedule
    }
}

export default new UserScrvice()