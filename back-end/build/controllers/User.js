import Admin from "../shemes/admin.js";
import UserService from "../services/User.js";
import JobRecquests from "../shemes/jobRequests.js";
import CallRequests from "../shemes/callRequests.js";
class UserController {
    constructor() {
        this.createCall = async (req, res) => {
            try {
                const { phoneNumber, name } = req.body;
                if (phoneNumber) {
                    const AdminModel = await Admin.findOne({});
                    if (AdminModel) {
                        const callRequestsModel = await CallRequests.findById(AdminModel.callRequests);
                        if (name)
                            callRequestsModel === null || callRequestsModel === void 0 ? void 0 : callRequestsModel.requests.push({ phoneNumber, name });
                        else
                            callRequestsModel === null || callRequestsModel === void 0 ? void 0 : callRequestsModel.requests.push({ phoneNumber });
                        callRequestsModel === null || callRequestsModel === void 0 ? void 0 : callRequestsModel.save().then(result => {
                            res.status(200).send({ message: "call request has created", newRequest: result });
                        });
                    }
                    else
                        res.status(500).send({ message: "server error: have't found an admin" });
                }
                else
                    res.status(400).send({ message: "phone is required" });
            }
            catch (err) {
                res.status(500).send({ message: "server error" });
            }
        };
        this.createJob = async (req, res) => {
            try {
                const body = req.body;
                const bodyDay = body.time.dayInfo[0];
                const bodyDayTime = body.time.dayInfo[1];
                const AdminModel = await Admin.findOne({});
                if (AdminModel) {
                    const jobRequestsModel = await JobRecquests.findById(AdminModel.jobRequests);
                    const schedule = UserService.getSchedule(jobRequestsModel);
                    if (schedule[bodyDay][bodyDayTime] === false) {
                        const request = body;
                        jobRequestsModel === null || jobRequestsModel === void 0 ? void 0 : jobRequestsModel.requests.push(request);
                        jobRequestsModel === null || jobRequestsModel === void 0 ? void 0 : jobRequestsModel.save().then(result => {
                            res.status(200).send({ message: "job request has created", jobRequest: result });
                        }).catch(err => res.status(400).send({ message: err.message }));
                    }
                    else
                        res.status(400).send({ message: "schedule is busy" });
                }
                else
                    res.status(500).send({ message: "server error: have't found an admin" });
            }
            catch (err) {
                res.status(500).send({ message: "server error" });
            }
        };
        this.getSchedule = async (req, res) => {
            try {
                const popJobRequests = await Admin.findOne({}).populate("jobRequests");
                if (popJobRequests) {
                    res.status(200).send(UserService.getSchedule(popJobRequests.jobRequests));
                }
                else
                    res.status(500).send({ message: "admin don't find" });
            }
            catch (err) {
                res.status(500).send({ message: "server error" });
            }
        };
    }
}
export default new UserController();
//# sourceMappingURL=User.js.map