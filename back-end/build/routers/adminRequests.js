import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;
import express from "express";
import jwt from "jsonwebtoken";
import AdminRerqustsController from "../controllers/AdminRequests.js";
export var IAdminRequestRouters;
(function (IAdminRequestRouters) {
    IAdminRequestRouters["createBlock"] = "/create-block";
    IAdminRequestRouters["deleteBlock"] = "/delete-block";
    IAdminRequestRouters["info"] = "/get-info";
})(IAdminRequestRouters = IAdminRequestRouters || (IAdminRequestRouters = {}));
const adminRequestsRouter = express.Router();
adminRequestsRouter.use("/admin", (req, res, next) => {
    const token = req.header("token");
    if (token) {
        jwt.verify(token, SECRET, (err, decode) => {
            if (decode) {
                next();
            }
            else {
                res.status(400).send({ message: "bad token", });
            }
        });
    }
    else
        res.status(400).send({ message: "bad token" });
});
adminRequestsRouter.get(IAdminRequestRouters.info, AdminRerqustsController.getInfo);
adminRequestsRouter.post(IAdminRequestRouters.createBlock, AdminRerqustsController.createBlock);
adminRequestsRouter.delete(IAdminRequestRouters.deleteBlock, AdminRerqustsController.deleteItemRequest);
export default adminRequestsRouter;
//# sourceMappingURL=adminRequests.js.map