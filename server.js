const express = require('express');
const uuid = require('uuid').v4;
const db = require('./db.js');

const app = express();

// add middleware
app.use(express.urlencoded ({ extended:false }));
app.use(express.json());

//endpoints

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials)
})

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials.find((testimonial) => testimonial.id == req.params.id));
})

//random not working
app.get('/testimontials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * (db.testimonials.length))]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuid();
  const newTestimonial = { id: id, author, text };
  db.testimonial.push(newTestimonial);
  res.json({ message: 'ok!' });
});

app.put(
  '/testimonials/:id',
  (req, res) => {
      const { author, text } = req.body;
      const id = +req.params.id;
      const testimonial = db.testimonial.find((testimonial) => testimonial.id === id);
      testimonial.author = author;
      testimonial.text = text;
      res.json({ message: 'ok!' });    },
  (err) => {
      console.log(err);
  }
);

app.delete(
  '/testimonials/:id',
  (req, res) => {
      const id = +req.params.id;
      db.testimonial.splice(
          db.testimonial.findIndex((testimonial) => testimonial.id === id),
          1
      );
      res.json({ message: 'Testimonial deleted' });
  },
  (err) => {
      console.log(err);
  }
);

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});