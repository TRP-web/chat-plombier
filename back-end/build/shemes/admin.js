import mongoose from "mongoose";
import { ICallRequestsName } from "./callRequests.js";
import { IJobRequestsName } from "./jobRequests.js";
export var IAdminName;
(function (IAdminName) {
    IAdminName["name"] = "Admin";
})(IAdminName = IAdminName || (IAdminName = {}));
const schemaAdmin = new mongoose.Schema({
    callRequests: { type: mongoose.Schema.Types.ObjectId, required: true, ref: ICallRequestsName.name, },
    jobRequests: { type: mongoose.Schema.Types.ObjectId, required: true, ref: IJobRequestsName.name }
});
const Admin = mongoose.model(IAdminName.name, schemaAdmin);
export default Admin;
//# sourceMappingURL=admin.js.map