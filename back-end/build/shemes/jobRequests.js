import mongoose from "mongoose";
export var IJobRequestsName;
(function (IJobRequestsName) {
    IJobRequestsName["name"] = "JobRecquests";
})(IJobRequestsName = IJobRequestsName || (IJobRequestsName = {}));
export var ITimeOfDayList;
(function (ITimeOfDayList) {
    ITimeOfDayList["morning"] = "morning";
    ITimeOfDayList["afternoon"] = "afternoon";
    ITimeOfDayList["evening"] = "evening";
})(ITimeOfDayList = ITimeOfDayList || (ITimeOfDayList = {}));
export var IDayOfWeekList;
(function (IDayOfWeekList) {
    IDayOfWeekList["nextMonday"] = "nextMonday";
    IDayOfWeekList["nextTuesday"] = "nextTuesday";
    IDayOfWeekList["nextWednesday"] = "nextWednesday";
    IDayOfWeekList["nextThursday"] = "nextThursday";
    IDayOfWeekList["nextFriday"] = "nextFriday";
    IDayOfWeekList["nextSaturday"] = "nextSaturday";
    IDayOfWeekList["nextSunday"] = "nextSunday";
})(IDayOfWeekList = IDayOfWeekList || (IDayOfWeekList = {}));
const schemaJobRecquest = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: [true, "\"title\" is required"] },
    description: { type: String, required: [true, "\"description\" is required"] },
    name: { type: String, required: false },
    phoneNumber: { type: String, required: [true, "\"phoneNumber\" is required"] },
    email: { type: String, required: false },
    address: { type: String, required: [true, "\"address\" is required"] },
    prise: { type: Number, required: [true, "\"prise\" is required"] },
    time: {
        dateCreated: { type: Date, required: [true, "\"dateCreated\" is required"] },
        dayInfo: { type: [String], required: [true, "\"dayInfo\" is required"] }
    }
});
const schemaJobRecquests = new mongoose.Schema({
    requests: { type: [schemaJobRecquest], required: true }
});
const JobRecquests = mongoose.model(IJobRequestsName.name, schemaJobRecquests);
export default JobRecquests;
//# sourceMappingURL=jobRequests.js.map