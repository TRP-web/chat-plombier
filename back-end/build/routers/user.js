import express from "express";
import UserController from "../controllers/User.js";
export var IUserRouters;
(function (IUserRouters) {
    IUserRouters["createCall"] = "/create-call";
    IUserRouters["createJob"] = "/create-job";
    IUserRouters["getSchedual"] = "/get-schedule";
})(IUserRouters = IUserRouters || (IUserRouters = {}));
const userRouter = express.Router();
userRouter.post(IUserRouters.createCall, UserController.createCall);
userRouter.post(IUserRouters.createJob, UserController.createJob);
userRouter.get(IUserRouters.getSchedual, UserController.getSchedule);
export default userRouter;
//# sourceMappingURL=user.js.map