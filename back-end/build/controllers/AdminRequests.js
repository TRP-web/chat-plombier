import Admin from "../shemes/admin.js";
import JobRecquests from "../shemes/jobRequests.js";
import AdminRequestsService from "../services/AdminRequests.js";
class AdminRerqustsController {
    constructor() {
        this.getInfo = async (req, res) => {
            try {
                const popAdmin = await Admin
                    .findOne({})
                    .populate("jobRequests")
                    .populate("callRequests");
                if (popAdmin) {
                    const result = {
                        calls: popAdmin.callRequests.requests,
                        jobs: popAdmin.jobRequests.requests,
                    };
                    res.status(200).send(result);
                }
            }
            catch (error) {
                res.status(500).send({ message: error });
            }
        };
        this.createBlock = async (req, res) => {
            try {
                const body = req.body;
                const [dayOfWeek, timeOfDay] = body.dayInfo;
                const schedule = await AdminRequestsService.createBlock();
                if (!schedule[dayOfWeek][timeOfDay]) {
                    const AdminModle = await Admin.findOne({});
                    const JobRequestModel = await JobRecquests.findById(AdminModle === null || AdminModle === void 0 ? void 0 : AdminModle.jobRequests);
                    JobRequestModel === null || JobRequestModel === void 0 ? void 0 : JobRequestModel.requests.push({
                        prise: 0,
                        address: "blocked",
                        description: "blocked",
                        phoneNumber: "blocked",
                        title: "blocked",
                        time: body
                    });
                    JobRequestModel === null || JobRequestModel === void 0 ? void 0 : JobRequestModel.save().then(result => { res.status(200).send({ result }); }).catch(err => { res.status(500).send({ message: err.message }); });
                }
                else
                    res.status(400).send({ message: "space in the schedule is busy" });
            }
            catch (error) {
                res.status(500).send({ message: error });
            }
        };
        this.deleteItemRequest = async (req, res) => {
            try {
                const id = req.body.id;
                const AdminModel = await Admin.findOne({});
                if (id) {
                    const JobRequestModel = await JobRecquests
                        .findOneAndUpdate({ _id: AdminModel === null || AdminModel === void 0 ? void 0 : AdminModel.jobRequests }, { $pull: { requests: { _id: id } } }, { new: true });
                    JobRequestModel === null || JobRequestModel === void 0 ? void 0 : JobRequestModel.save().then(result => res.status(200).send(result)).catch(err => res.status(500).send({ message: err }));
                }
                else
                    res.status(400).send({ message: "id is required" });
            }
            catch (err) {
                res.status(500).send({ message: err });
            }
        };
    }
}
export default new AdminRerqustsController();
//# sourceMappingURL=AdminRequests.js.map