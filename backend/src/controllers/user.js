import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import crypto from "crypto";
import RevokedToken from "../models/revokedToken.js";

class UserController {
      async createUser(req, res){
            const session = await mongoose.startSession();
            try{
                  session.startTransaction()
                  const { fullname, username, password } = req.body;

                  if (!fullname.trim() || !username.trim() || !password.trim()) {
                        session.abortTransaction()
                        return res.status(400).json({
                              success: false,
                              message: "All fields are required"
                        })
                  }

                  const findUser = await User.findOne({username});
                  if (findUser) {
                        session.abortTransaction()
                         return res.status(400).json({
                              success: false,
                              message: "Username already exists",
                        })
                  }
                  const genSalt = await bcrypt.genSalt(12);
                  const hashedPassword = await bcrypt.hash(password, genSalt);

                  const user = await User.create({
                              fullname: fullname.trim(),
                              username: username.trim().toLowerCase() ,
                              password: hashedPassword
                        })

                        session.commitTransaction();
                        return res.status(201).json({
                              success: true,
                              message: "Account created successfully",
                              fullname: user.fullname,
                              username: user.username,
                              id: user._id,
                              notes: user.notes
                        })
            } catch(error){
                  session.abortTransaction()
                    if (error.code === 11000) {
                        if (error.keyPattern?.username) {
                              return res.status(409).json({
                                    status: "error",
                                    message: "Username already exists"
                              });
                        }
                  }
                  return res.status(500).json({
                        success: false,
                        message: error.message,
                  })
            } finally {
                  session.endSession()
            }
      }

      async getUser(req, res) {
            try {
                  const { id } = req.params;
                  const user = await User.findById(id);
                  if (!user) {
                        return res.status(404).json({
                              success: false,
                              message: "User not found"
                        })
                  }
                  return res.status(200).json({
                        success: true,
                        user
                  })
            } catch(error){
                  return res.status(500).json({
                        success: false,
                        message: error.message
                  })
            }
      }

      async getAllUsers(req,res){
            try {
                  const users = await User.find().select("-password");

                  if(users.length === 0){
                        return res.status(404).json({
                              success: false,
                              message: "No user records found"
                        })
                  }
                  return res.status(200).json({
                        success: true,
                        users
                  })
            } catch(error){
                  return res.status(500).json({
                        success: false,
                        message: error.message
                  })
            }
      }

      async login(req, res){
            try {
                  const { username, password } = req.body;

                  if(!username.trim() || !password.trim()){
                        return res.status(400).json({
                              success: false,
                              message: "All fields are required"
                        })
                  }
                  const user = await User.findOne({ username: username.toLowerCase() })

                  if(!user){
                        return res.status(404).json({
                              success: false,
                              message: "Account not found"
                        })
                  }

                  const isMatched = await bcrypt.compare(password,user.password);

                  if(!isMatched){
                        return res.status(404).json({
                              success: false,
                              message: "Invalid credientials"
                        })
                  }

                  const token = jwt.sign({
                        userId: user._id,
                        jti: crypto.randomUUID()
                  }, process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRES_IN }
                  );

                  return res.status(200).json({
                        success: true,
                        message: "Login successful",
                        token,
                        userId: user._id,
                        fullname: user.fullname,
                        username: user.username
                  })

            } catch(error){
                  return res.status(500).json({
                        success: false,
                        message: error.message
                  })
            }
      }

      async logout(req, res) {
    try {
        const { jti, exp } = req.token;

        if (!jti || !exp) {
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }

        await RevokedToken.create({
            jti,
            expiresAt: new Date(exp * 1000)
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
}
}

export default new UserController