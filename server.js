const express = require('express');
const helmet = require('helmet');
const cors = require('express-cors');
const path = require('path');
const socket = require('socket.io');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const mongoose = require('mongoose');

const app = express();

app.use(helmet());


app.set('view engine', '.hbs');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found...' });
});

mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@newwavefestival.ohx0i.mongodb.net/neWaveDB?retryWrites=true&w=majority`, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});


const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    /*socket.on('seatsUpdated', (seat) => {
      console.log('Update');
      
  });*/
  socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left')
    });
});