import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { verrifyJwt } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(req.headers.authorization);
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: ReasonPhrases.UNAUTHORIZED });
    const [_, access_token] = token.split(' ');
    try {
        const decodedData = verrifyJwt(access_token);
        if (!decodedData) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: ReasonPhrases.UNAUTHORIZED });
        req.user = decodedData;
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: ReasonPhrases.UNAUTHORIZED });
    }
    next();
}