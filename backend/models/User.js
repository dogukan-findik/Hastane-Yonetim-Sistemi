// backend/models/User.js

const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

// Geçici user şeması
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }],
    phone: {
        type: String,
        match: /^[0-9]{10,11}$/
    },
    address: {
        type: String
    }
}, {
    timestamps: true
});

/* Şifre hashing
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});
*/

// Modeli export et
module.exports = mongoose.model("User", userSchema);
