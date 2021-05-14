  
const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const reportController = require('./src/controllers/reportController');

// Rotas da home
route.get('/', homeController.index);
route.post('/index/register', homeController.register);

// Rotas de Relatórios
route.get('/report', reportController.index);

module.exports = route;