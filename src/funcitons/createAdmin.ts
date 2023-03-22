import mongoose from "mongoose"
import Admin from "../shemes/admin.js"
import CallRequests from "../shemes/callRequests.js"
import JobRecquests from "../shemes/jobRequests.js"

const createAdmin = async () => {
    const CallRequestsModel = new CallRequests({ requests: [] })
    const JobRequestsModel = new JobRecquests({ requests: [] })
    const AdminModel = new Admin({
        callRequests: CallRequestsModel._id,
        jobRequests: JobRequestsModel._id
    })
    AdminModel.save().then(() => {
        console.log("admin has created")
    })
    CallRequestsModel.save()
    JobRequestsModel.save()
}

export default createAdmin