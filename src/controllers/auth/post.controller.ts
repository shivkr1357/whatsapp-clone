import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import User from "../../models/user.model";
import generateToken from "../../utils/generateTokens";

const SignUp: RequestHandler = async (req, res) => {

   const user = await User.findOne({ email: req.body.email });

   if (user) {
      return res
         .status(400)
         .json({ error: true, message: "User already exist , please login" });
   }

   const salt = await bcrypt.genSalt(Number(process.env.SALT));
   const hashPassword = await bcrypt.hash(req.body.password, salt);

   await new User({ ...req.body, password: hashPassword }).save();

   res.status(201).json({
      error: false,
      message: "Account created successfully",
   });
};

const SignIn: RequestHandler = async (req, res) => {
   try {
      // check if there is any unwanted data in the body

      // Find one user using the unique email
      const user = await User.findOne({ email: req.body.email });

      // if user not found return
      if (!user) {
         return res.status(401).json({
            error: true,
            message: "User does not exist with this email",
         });
      }

      // verify the hashed password

      const verifiedPassword = await bcrypt.compare(
         req.body.password,
         user.password
      );

      if (!verifiedPassword) {
         return res
            .status(401)
            .json({ error: true, message: "Invalid Password" });
      }

      //   // generate access token and refresh token
      const { accessToken, refreshToken } = await generateToken(user);

      return res.status(200).json({
         error: false,
         accessToken,
         refreshToken,
         message: "User Logged In successfully",
      });
   } catch (error) {}
};

export default { SignIn, SignUp };
