// concerts.routes.js
const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getById);
router.post('/concerts', ConcertController.addDoc);
router.put('/concerts/:id', ConcertController.editDoc);
router.delete('/concerts/:id', ConcertController.deleteDoc);

module.exports = router;