const Concert = require('../models/concert.model');

// route 1 - get all - mongoose added
exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

// route 2 - get by id - mongoose added
exports.getById = async (req, res) => {
    try {
        const dep = await Concert.findById(req.params.id);
        if(!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

// route 3 - post - mongoose added
exports.addDoc = async (req, res) => {
    try {  
      const { performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ performer, genre, price, day, image });
      await newConcert.save();
      res.json({ message: 'OK' });  
    } catch(err) {
      res.status(500).json({ message: err });
    }  
};

// route 4 - put - mongoose added
exports.editDoc = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
      const dep = await Concert.findById(req.params.id);
      if(dep) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

// route 5 - delete - mongoose added

exports.deleteDoc = async (req, res) => {
    try {
      const dep = await Concert.findById(req.params.id);
      if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};