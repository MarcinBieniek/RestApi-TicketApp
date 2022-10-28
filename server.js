const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');

const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
  req.io = io;
  next();
});

// add middleware
app.use(express.urlencoded ({ extended:false }));
app.use(express.json());
app.use(cors());

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

app.use('/api/', testimonialsRoutes); 
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

// connects our backend code with the database
mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 7000, () => {
  console.log('Server is running on port: 7000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket is on!');
});