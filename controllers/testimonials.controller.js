const Testimonial = require('../models/testimonial.model');

// route 1 - get all - mongoose added
exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

// route 2 - get random - mongoose added
exports.getRandom = async (req, res) => {
    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Testimonial.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

// route 3 - get by id - mongoose added
exports.getById = async (req, res) => {
    try {
      const dep = await Testimonial.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

// route 4 - post - mongoose added
exports.addDoc = async (req, res) => {
    try {  
      const { author, text } = req.body;
      const newTestimonial = new Testimonial({ author, text });
      await newTestimonial.save();
      res.json({ message: 'OK' });  
    } catch(err) {
      res.status(500).json({ message: err });
    }  
};

// route 5 - edit - mongoose added

exports.editDoc = async (req, res) => {
    const { author, text } = req.body;
    try {
      const dep = await Testimonial.findById(req.params.id);
      if(dep) {
        await Testimonial.updateOne({ _id: req.params.id }, { $set: { author, text }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

// route 6 - delete - mongoose added

exports.deleteDoc = async (req, res) => {
    try {
      const dep = await Testimonial.findById(req.params.id);
      if(dep) {
        await Testimonial.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};
