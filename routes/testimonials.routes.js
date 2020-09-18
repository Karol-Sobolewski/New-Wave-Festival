const express = require('express');

const router = express.Router();
const db = require('../db/db');

router.route('/').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
  res.send('random');
});

router.route('/:id').get((req, res) => {
  res.json(db.testimonials.find(({ id }) => id == req.params.id));
});

router.route('/').post((req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    res.json({ message: 'ok' });
  } else {
    res.json({ message: 'NOT OK' });
  }
  res.json('testimonials');
});

router.route('/:id').put((req, res) => {
  res.json({ message: 'OK put testimonial' });
});

router.route('/:id').delete((req, res) => {
  res.json({ message: 'Ok delete testimonial' });
});

module.exports = router;
