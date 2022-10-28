// seats.routes.js
const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/:id', SeatController.getById);
router.post('/seats', SeatController.addDoc);
router.put('/seats/:id', SeatController.editDoc);
router.delete('/seats/:id', SeatController.deleteDoc);

module.exports = router;