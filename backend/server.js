// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Veritabanına bağlan
connectDB();

// Test route ekleyelim
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

// Test endpoint
app.get("/", (req, res) => {
    res.send("API çalışıyor!");
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server in çalıştığı port ${PORT}`);
});
