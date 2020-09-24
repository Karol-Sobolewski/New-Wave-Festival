const express = require('express');
const cors = require('express-cors');
const path = require('path');
const socket = require('socket.io');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();


app.set('view engine', '.hbs');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/seats', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port:`, 8000);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found...' });
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
