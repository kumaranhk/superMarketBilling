import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

export const generateJwt = (data) => {
    console.log(data);
    const token = jwt.sign(data, jwt_secret, { expiresIn: '120m' });
    return token;
}
export const verrifyJwt = (token) => {
    try {
        const decodedData = jwt.verify(token, jwt_secret, (err, decoded) => {
            if (err) {
                Error("Unable to decode the token");
            }
            return decoded;
        });
        return decodedData;
    } catch (error) {
        console.log(error);
        return false;
    }
}