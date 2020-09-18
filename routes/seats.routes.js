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
  const { author, text } = req.body;

  if (author && text) {
    res.send({ message: 'ok' });
  } else {
    res.json({ message: 'NOT OK' });
  }
  res.json('seats');
});

router.route('/:id').put((req, res) => {
  res.json({ message: 'Ok put seat' });
});

router.route('/:id').delete((req, res) => {
  res.json({ message: 'OK delete seat' });
});

module.exports = router;
