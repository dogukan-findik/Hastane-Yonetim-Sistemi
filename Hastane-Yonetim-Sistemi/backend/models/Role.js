// backend/models/Role.js

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ["admin", "doctor", "patient"], // Roller tanımlanıyor
    },
    permissions: {
        type: [String], // Roller için izinler
        default: [],
    },
}, {
    timestamps: true,
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
