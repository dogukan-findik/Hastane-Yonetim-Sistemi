// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Veritabanına bağlan
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test route ekleyelim
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

// Dashboard routes
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

// Randevu routes
const randevuRoutes = require("./routes/RandevuRoutes");
app.use("/api/randevu", randevuRoutes);

const doktorRoutes = require("./routes/DoktorRoutes");
app.use("/api/doctors", doktorRoutes);

// File upload routes
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);

const raporRoutes = require('./routes/RaporRoutes');
app.use('/api/raporlar', raporRoutes);

// Test endpoint
app.get("/", (req, res) => {
    res.send("API çalışıyor!");
});

app.use('/uploads', express.static('uploads'));

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server in çalıştığı port ${PORT}`);
});
