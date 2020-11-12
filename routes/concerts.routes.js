const express = require('express');

const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/random', ConcertController.getRandom);

router.get('/concerts/:id', ConcertController.getById);

router.post('/concerts', ConcertController.addNew);

router.put('/concerts/:id', ConcertController.modify);

router.delete('/concerts/:id', ConcertController.remove);

/*
router.route('/').get((req, res) => {
  res.json(db.concerts);
});
*/

/*
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
*/
module.exports = router;
