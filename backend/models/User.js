// backend/models/User.js

const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

// Geçici user şeması
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["patient", "doctor", "admin"],
        default: "patient"
    },
    createdAt: {
        type: Date,
        default: Date.now
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
