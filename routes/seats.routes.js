const { Router } = require('express');
const express = require('express');

const router = express.Router();
const db = require('../db/db');

router.route('/').get((req, res) => {
  res.json(db.seats);
});

router.route('/:id').get((req, res) => {
  res.json(db.seats.find(({ id }) => id == req.params.id));
});

router.route('/').post((req, res) => {
  const seatFilter = db.seats.filter(seat => seat.day == req.body.day);
  if (seatFilter.some(seat => seat.seat == req.body.seat)) {
    res.status(403).json({ message: 'The slot is already taken...' });

  }
  else {
    const newId = db.seats[db.seats.length - 1].id + 1;
    db.seats.push({
      id: newId,
      day: req.body.day,
      seat: req.body.seat,
      client: req.body.client,
      email: req.body.email,
    });
    res.json({ client: req.body.client })
    req.io.emit('seatsUpdated', db.seats);
    res.json({ message: 'OK' });
  }


});

router.route('/:id').put((req, res) => {
  res.json({ message: 'Ok put seat' });
});

router.route('/:id').delete((req, res) => {
  res.json({ message: 'OK delete seat' });
});

module.exports = router;
