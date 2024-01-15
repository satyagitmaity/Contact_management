const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../Models/userModel")
//@desc Register a user
//@route POST/api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory...")
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered...")
    }
    //Hashing Password: 
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    if (user) {
        res.status(201).json({_id : user.id, email : user.email})
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }
})
//@desc Login a user
//@route POST/api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory...")
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.name,
                    email: user.email,
                    id : user.id
                }
            }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "1d"}
        )   
        res.status(201).json({accessToken})
    } else {
        res.status(401)
        throw new Error("Email or Password is incorrect")
    }
})
//@desc Current user info
//@route GET/api/users/current
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user)
})

//@desc Update user info
//@route PUT/api/users/:id
//@access private
const updateUser = asyncHandler(async(req, res) => {
    const userId = req.params.id;
    const userInfo = await User.findById(userId)
    if (!userInfo) {
        res.status(404)
        throw new Error("User not found...")
    }
    if (userInfo.id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User don't have permission to update other user information")
    }
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedUser)
})

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    updateUser
}