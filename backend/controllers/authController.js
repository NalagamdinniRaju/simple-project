// const bscrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken") 
// const User = require("../models/User")

// const register = async (req, res) => {
//   try {
//     const {name, email, password} = req.body;
    
//     const user = await User.findOne({ email: email });
//     if(!user) {
//         res.status(400).json({message: "User Already Existed"})
//     }
//     const hashedPassword = await bscrypt.hash(password, 10);
    
//     const newUser = new User({name, email, password:hashedPassword})
//     await newUser.save();

//     res.status(200).json({message: "User Created Successfully", newUser})
//   } catch (error) {
//     res.status(400).json({message: "Internal Server Error", error})
//     console.log(error)
//   }
// }

// const login = async (req,res) => {
//   try {
//     const{email,password} = req.body;
//     const user = await User.findOne({email:email}) 
//     if(!user){
//         res.status(400).json({meessage: "User Not Found"})
//     }
//     const isMatch = await bscrypt.compare(password, user.password);

//     if(!isMatch){
//         res.status(400).json({message: "Invalid Password"})
//     }

//     const token = jwt.sign({id : user._id}, "NRSRaju", {expiresIn:"10hr"})

//     res.status(200).json({message: "User Login Successfully", token})

//   } catch (error) {
//     res.status(500).json({message: "Internal Server Error", error})
//   }
// }

// module.exports = {
//     register,
//     login
// }

const bcrypt = require("bcryptjs")  // Fixed typo in 'bscrypt'
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const register = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email: email });
    if(existingUser) {  // Changed !user to existingUser
        return res.status(400).json({message: "User Already Exists"})  // Added return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({name, email, password: hashedPassword})
    await newUser.save();

    return res.status(200).json({message: "User Created Successfully", newUser})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error", error})  // Changed 400 to 500
  }
}

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    
    // Find user
    const user = await User.findOne({ email: email })  // Fixed findOne syntax
    if(!user){
        return res.status(400).json({message: "User Not Found"})  // Added return
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid Password"})  // Added return
    }

    // Generate token
    const token = jwt.sign({id: user._id}, "NRSRaju", {expiresIn: "10h"})

    return res.status(200).json({message: "User Login Successfully", token})
  } catch (error) {
    return res.status(500).json({message: "Internal Server Error", error})
  }
}

module.exports = {
    register,
    login
}