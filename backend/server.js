// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const helmet = require("helmet"); // eklendi
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");


const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

// Middleware
app.use(helmet()); // HTTP header'larını güvenli hâle getirir
app.use(cors(corsOptions));
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Çok fazla istek gönderildi."
}));
app.use(mongoSanitize());
app.use(xss()); // XSS saldırılarını temizler
app.use(hpp()); // HTTP parametre kirliliğini önler

// Veritabanına bağlan
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);



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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


