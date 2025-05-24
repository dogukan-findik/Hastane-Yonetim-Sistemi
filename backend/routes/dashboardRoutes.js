const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/DashboardController');

// Dashboard istatistiklerini getir
router.get('/stats', dashboardController.getDashboardStats);

// Son aktiviteleri getir
router.get('/activities', dashboardController.getRecentActivities);

module.exports = router; 