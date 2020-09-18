const express = require('express');

const router = express.Router();
const db = require('../db/db');

router.route('/').get((req, res) => {
  res.json(db.concerts);
});

router.route('/:id').get((req, res) => {
  res.json(db.concerts.find(({ id }) => id == req.params.id));
});

router.route('/').post((req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    res.send({ message: 'ok' });
  } else {
    res.json({ message: 'NOT OK' });
  }
  res.json('concerts');
});

router.route('/:id').put((req, res) => {
  res.json({ message: 'Ok put concert' });
});

router.route('/:id').delete((req, res) => {
  res.json({ message: 'Ok delete concert' });
});

module.exports = router;
