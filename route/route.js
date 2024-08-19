const express = require('express');
const router = express.Router();
const ClothesService = require('../service/service');
const ClothesController = require('../controller/controller');

const { Clothes } = require('../models');
const clothesService = new ClothesService(Clothes);
const clothesController = new ClothesController(clothesService);

router.post('/clothes', clothesController.createClothes.bind(clothesController));
router.get('/clothes', clothesController.getAllClothes.bind(clothesController));
router.get('/clothes/search', clothesController.searchClothes.bind(clothesController));
router.patch('/clothes/:id', clothesController.updateClothes.bind(clothesController));
router.delete('/clothes/:id', clothesController.deleteClothes.bind(clothesController));
router.patch('/clothes/:id/add-stock', clothesController.addStock.bind(clothesController));
router.patch('/clothes/:id/reduce-stock', clothesController.reduceStock.bind(clothesController));
router.get('/clothes/out-of-stock', clothesController.getOutOfStockClothes.bind(clothesController));
router.get('/clothes/low-stock', clothesController.getLowStockClothes.bind(clothesController));

module.exports = router;
