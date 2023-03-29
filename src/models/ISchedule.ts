export interface IScheduleDay {
    morning: boolean
    afternoon: boolean
    evening: boolean
}
export interface ISchedule {
    nextMonday: IScheduleDay
    nextTuesday: IScheduleDay
    nextWednesday: IScheduleDay
    nextThursday: IScheduleDay
    nextFriday: IScheduleDay
    nextSaturday: IScheduleDay
    nextSunday: IScheduleDay
}
