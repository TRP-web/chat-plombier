export interface ICallRequest {
   _id: string
   phoneNumber: string,
   name?: string
}
export interface ICallRequests {
   requests: ICallRequest[]
}
//--------------

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
   _id: string
   title: string
   description: string
   name?: string
   phoneNumber: string
   email?: string
   address: string
   prise: number
   time: {
       futureDate: string
       dateCreated: Date,
       dayInfo: [IDayOfWeek, ITimeOfDay]
   }
}

export interface IJobRequests {
   requests: IJobRequest[]
}
