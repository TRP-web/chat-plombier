import dotenv from "dotenv"
dotenv.config()
const password = process.env.PASSWORD
const secret = process.env.SECRET
//-----------------------///
import express from "express"
import { ITypeRequestBody } from "../types/ITypedRequest.js"
import jwt from "jsonwebtoken"

class AdminController {

	logIn = async (req: ITypeRequestBody<{ password: string }>, res: express.Response) => {
		try {
			if (password === req.body.password) {
				if (secret !== undefined) {
					const token = jwt.sign({}, secret, { expiresIn: "24h" })
					res
						// .setHeader("Set-cookie", "a=4")
						.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24, }) //httpOnly: true
						.status(200)
						.send({ message: "good request", token, })

				} else {
					throw new Error("secret is required")
				}
			} else {
				res.status(400).send({ message: "bad password" })
			}
		} catch (err) {
			res.status(500).send({ message: "bad request" })
		}
	}
}

export default new AdminController()