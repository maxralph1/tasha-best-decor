import asyncHandler from 'express-async-handler'; 
import jwt from 'jsonwebtoken'; 
import User from '../../models/User.js'; 


const verifyMailLinkAuthenticate = asyncHandler(async (req, res) => {
    try {
        const userFound = await User.findOne({ username: req?.params?.username, email_verify_token: req?.params?.token }).exec();

        if (!userFound) return res.status(400).send("Invalid/expired link");

        try {
            jwt.verify(userFound?.email_verify_token, process.env.EMAIL_VERIFY_TOKEN_SECRET); 
        } catch (error) {
            return res.status(400).send("Verification failed");
        }

        userFound.email_verified = new Date().toISOString();;
        userFound.email_verify_token = ''; 
        userFound.online = true;
        userFound.last_time_active = ''; 

        const access = jwt.sign(
            {
                "user": {
                    "user_id": userFound._id, 
                    "username": userFound.username, 
                    "first_name": userFound.first_name, 
                    "other_names": userFound.other_names, 
                    "last_name": userFound.last_name, 
                    "user_image": userFound.user_image_path.url, 
                    "enterprise_name": userFound.enterprise_name, 
                    "email": userFound.email, 
                    "phone": userFound.phone, 
                    "address": userFound.address, 
                    "role": userFound.role, 
                    "verified": userFound.verified, 
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: 60 * 60 }
        );

        const refresh = jwt.sign(
            { "user_id": userFound._id }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: 60 * 60 }
        ); 

        userFound.save()
            .then(function () {
                res.cookie('jwt', refresh, {
                    httpOnly: true, 
                    secure: false, 
                    sameSite: 'None', 
                    maxAge: 1 * 60 * 60 * 1000      // 1 hour
                });

                res.json({ access })
            })
            .catch(function (error) {
                return res.status(400).json(error);
            });

        // await userFound?.save();

        // res.json({ message: "Email verification sucessful." });
    } catch (error) {
        res.status(400).json({ message: "An error occured", details: `${error}` });
    }
});


export default verifyMailLinkAuthenticate; 