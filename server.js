const express = require('express');
const cors = require('express-cors');
const db = require('./db/db');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('my app');
});

app.use('/testimonials', testimonialsRoutes);
app.use('/concerts', concertsRoutes);
app.use('/seats', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

// module.exports = router;
