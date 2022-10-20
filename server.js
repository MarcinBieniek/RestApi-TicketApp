const express = require('express');
const path = require('path');

const app = express();

// add middleware
app.use(express.urlencoded ({ extended:false }));
app.use(express.json());

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

app.use('/api/', testimonialsRoutes); 
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});