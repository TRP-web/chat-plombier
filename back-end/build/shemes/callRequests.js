import mongoose from "mongoose";
export var ICallRequestsName;
(function (ICallRequestsName) {
    ICallRequestsName["name"] = "CallRequests";
})(ICallRequestsName = ICallRequestsName || (ICallRequestsName = {}));
const schemaCallRequest = new mongoose.Schema({
    phoneNumber: { type: String, required: [true, "phoneNumber is required"] },
    name: { type: String, required: false }
});
const schemaCallrequests = new mongoose.Schema({
    requests: { type: [schemaCallRequest], required: true }
});
const CallRequests = mongoose.model(ICallRequestsName.name, schemaCallrequests);
export default CallRequests;
//# sourceMappingURL=callRequests.js.map