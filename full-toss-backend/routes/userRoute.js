import express from "express";
import { ProductModule, UserModule } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwt_secret = process.env.jwt_secret;
const route = express.Router();

route.get('/',function(req,res){
  res.send("backend is working")
})
route.post("/signup", async function (req, res) {
  const { username, name, email, password, phone, iplTeam } = req.body;

  try {
    const existinguser = await UserModule.findOne({
      $or: [{ username }, { email }],
    });
    if (existinguser) {
      if (existinguser.username === username) {
        return res.status(400).json({ message: "username allready taken" });
      }
      if (existinguser.email === email) {
        return res.status(400).json({ message: "email allready registered" });
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
    const id = response._id

    res.status(200).json({ message: "Successful creation", token,id });
  } catch (error) {
    console.log("Error during signup:", error.message);
    if (error.name == "validationError") {
      return res
        .status(400)
        .json({ message: "invalid input data", error: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
});

route.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("mandatory fields are required");
    return;
  }

  try {
    const response = await UserModule.findOne({
      email: email,
    });
    if (!response) {
      console.log("user not found");
      return res.status(204).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, response.password);
    if (!isMatch) {
      console.log("Incorrect username or password");
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    }

    const token = jwt.sign({ _id: response._id }, jwt_secret, {
      expiresIn: "1d",
    });
    const id = response._id

    res.status(200).json({
      message:"login successful",
      token,
      id,
    });
  } catch (error) {
    console.log("something went wrong " + error);
    return res.status(500).json({
      message: "something went wrong",
    });
  }
});
route.get("/user/:id", async function (req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      message: "no token provided",
    });
  }
  try {
    const response = await UserModule.findOne({
      _id: id,
    });
    if (!response && !response.data){

      return res.status(400).json({
        message: "No user found",
      });
    }
    res.status(200).json({
      response
    })

  } catch (error) {
    console.log("Something went wrong " + error)
    res.status(500).json({
      message:"something went wrong",
      error:error.message
    })
  }
});
route.get('/user',async function(req,res){
  try {
    
    const response = await UserModule.find()
    if(!response && !response.data){
      res.status(404).json({
        message:'no User Found'
      })

    }
    res.status(201).json({
      response
    })
  } catch (error) {
    console.log("Something went wrong "+error)
    return res.status(500).json({
      message:"Something went wrogn",
      error:error.message
    })
  }
})
route.get('/cartitems',async function(req,res){
  const token = req.headers.token

  try {
    const verifiedData = jwt.verify(token,jwt_secret)
    const userId = verifiedData._id
    const response = await UserModule.findOne({
      _id:userId
    })
    
    if(!response){
      console.log("user not fond with token Id")
      return 
    }
    const productId = response.items

    const arr = await ProductModule.find({
      _id:productId
    })
    if(arr.length === 0){
      return res.status(404).json({
        message:"Cart is empty"
      })
    }
    res.status(201).json({
      arr
    })
  } catch (error) {
    console.log("Something went wrong" + error)
    return res.status(500).json({
      message:"bad server response",
      error:error.message
    })
    
  }
})

route.post('/addtocart/:id',async function(req,res){
    const productId = req.params.id

    const token = req.headers.token
    if(!token){
      return res.status(401).json({
        message:"token not available"
      })
    }
    try {
    const userId = jwt.verify(token, jwt_secret)._id
    if (!userId) {
      return res.status(401).json({ message: "User ID from token is invalid" });
    }

    const product = await ProductModule.findOne({
      _id:productId
    })
    if(!product){
      return res.status(401).json({
        message:"product not available"
      })
    }
      const response = await UserModule.findOneAndUpdate(
       { _id:userId},
        {$addToSet:{items:productId}},
        {new:true}
      )
      if(!response){
        return res.status(404).json({
          message:"user not found"
        })
      }
      res.status(201).json({
        message:"product added to cart",
        response
      })
    } catch (error) {
      console.error(error);
    res.status(500).json({ message: 'Server error' });
    }
})
route.delete('/removefromcart/:id', async function(req, res) {
  const productId = req.params.id; 
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const verifiedData = jwt.verify(token, jwt_secret);
    const userId = verifiedData._id;
    const user = await UserModule.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productIndex = user.items.findIndex(item => item.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    user.items.splice(productIndex, 1);
    await user.save();

    return res.status(200).json({ message: "Product removed from cart", items: user.items });

  } catch (error) {
    console.log("Something went wrong: " + error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default route;
