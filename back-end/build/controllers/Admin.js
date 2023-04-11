import dotenv from "dotenv";
dotenv.config();
const password = process.env.PASSWORD;
const secret = process.env.SECRET;
import jwt from "jsonwebtoken";
class AdminController {
    constructor() {
        this.logIn = async (req, res) => {
            try {
                if (password === req.body.password) {
                    if (secret !== undefined) {
                        const token = jwt.sign({}, secret, { expiresIn: "24h" });
                        res.status(200).send({ message: "good request", token });
                    }
                    else {
                        throw new Error("secret is required");
                    }
                }
                else {
                    res.status(500).send({ message: "bad password" });
                }
            }
            catch (err) {
                res.status(500).send({ message: "bad request" });
            }
        };
    }
}
export default new AdminController();
//# sourceMappingURL=Admin.js.map