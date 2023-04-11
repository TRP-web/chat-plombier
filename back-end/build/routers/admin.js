import express from "express";
import AdminController from "../controllers/Admin.js";
export var IAdminRouters;
(function (IAdminRouters) {
    IAdminRouters["login"] = "/log-in";
})(IAdminRouters = IAdminRouters || (IAdminRouters = {}));
const adminRouter = express.Router();
adminRouter.post(IAdminRouters.login, AdminController.logIn);
export default adminRouter;
//# sourceMappingURL=admin.js.map