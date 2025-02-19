import { ReasonPhrases, StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model.js";
import { generateJwt } from "../../utils/jwt.js";

export const logIn = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const user = await userModel.findOne({ email });
        console.log(user)
        if (user.password === password && user.email === email) {
            const user = await userModel.findOne({ email }, { __v: 0, password: 0, updatedAt: 0, createdAt: 0 });
            const accessToken = generateJwt({ ...user._doc })
            return res.status(StatusCodes.OK).json({ access_token: accessToken });
        }
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid email or password" });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}