const express = require('express');

const app = express();

// add middleware
app.use(express.urlencoded ({ extended:false }));
app.use(express.json());

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');

app.use('/api/', testimonialsRoutes); 

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});