// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");


const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

// Middleware


// Veritabanına bağlan
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

const randevuRoutes = require("./routes/RandevuRoutes");
app.use("/api/randevu", randevuRoutes);

const doktorRoutes = require("./routes/DoktorRoutes");
app.use("/api/doctors", doktorRoutes);

const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);

// Test endpoint
app.get("/", (req, res) => {
    res.send("API çalışıyor!");
});

app.use("/uploads", express.static("uploads"));

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);
});
