const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine(
  'hbs',
  hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' })
);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
];

app.get('/', (req, res) => {
  res.send('my app');
});

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  // res.json(db[req.params.id]);
  res.json(db.find(({ id }) => id == req.params.id));
});

app.get('testimonials/asd', (req, res) => {
  res.send('random');
});

/* app.get('/testimonials/random', (req, res) => {
  // res.json(db.find(({ id }) => id == Math.floor(Math.random() * db.length)));
  // console.log(Math.floor(Math.random() * db.length));
  // console.log('hey');
  //   res.json(db[Math.floor(Math.random() * db.length)]);
  res.send('random');
}); */

app.post('/testimonials', (req, res) => {
  res.json('testimonials');
  const { author, text } = req.body;

  if (author && text) {
    res.send({ message: 'ok' });
  } else {
    res.json({ message: 'NOT OK' });
  }
});

app.put('/testimonials/:id', (req, res) => {
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
