import express from "express";
import { UserModule } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwt_secret = process.env.jwt_secret;
const route = express.Router();

route.post("/signup", async function (req, res) {
  const { username, name, email, password, phone, iplTeam } = req.body;

  try {
    const existinguser = await UserModule.findOne({$or:[{username},{email}]})
    if(existinguser){
      if(existinguser.username === username){
        return res.status(400).json({message:"username allready taken"})
      }
      if(existinguser.email === email){
        return res.status(400).json({message:"email allready registered"})
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await UserModule.create({
      username,
      name,
      email,
      password: hashedPassword,
      phone,
      iplTeam,
    });

    if (!response) {
      return res.status(301).json({ message: "Could not create user" });
    }
    const token = jwt.sign({ _id: response._id }, jwt_secret, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Successful creation", token });
  } catch (error) {
    console.log("Error during signup:", error.message);
    if(error.name == 'validationError'){

      return res.status(400).json({ message: "invalid input data", error:error.message });
    }
    return res.status(500).json({message:"Something went wrong"})
  }
});

route.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("medetory fields are required");
    return;
  }

  try {
    const response = await UserModule.findOne({
      email: email,
    });
    if (!response) {
      console.log("user not found");
      res.status(204).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, response.password);
    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ _id: response._id }, jwt_secret, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log("something went wrong " + error);
    return res.status(500).json({
      message: "something went wrong",
    });
  }
});

export default route;
