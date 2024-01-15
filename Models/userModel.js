const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add a user email"],
        unique: [true, "email address is already taken"]
    },
    password: {
        type: String,
        required:[true, "Please add a user password"]
    }
},
{timestamps : true}
);

module.exports = mongoose.model("User", userSchema)
