// seats.routes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid').v4;

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find((data) => data.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = uuid();
    const newSeat = { id: id, day, seat, client, email };

    if (
        !db.seats.some((seat) => seat.day == newSeat.day && seat.seat == newSeat.seat)) {
            db.seats.push(newSeat);
            req.io.emit('seatsUpdated', db.seats)
            res.json({ message: 'ok!' });
    } else {
        res.json({ message: 'The slot is already taken...' });
        res.status(409).json({ message: 'The slot is already taken...' });
    }   

    
});

router.route('/seats/:id').put(
    (req, res) => {
        const { day, seat, client, email } = req.body;
        const id = req.params.id;
        const seatEdit = db.seats.find((seat) => seat.id === id);
        seatEdit.day = day;
        seatEdit.seat = seat;
        seatEdit.client = client;
        seatEdit.email = email;

        res.json({ message: 'ok!' });
    },
    (err) => {
        console.log(err);
    }
);

router.route('/seats/:id').delete(
    (req, res) => {
        const id = +req.params.id;
        db.seats.splice(
            db.seats.findIndex((data) => data.id === id),
            1
        );
        res.json({ message: 'Seat deleted' });
    },
    (err) => {
        console.log(err);
    }
);

module.exports = router;