const Seat = require('../models/seat.model');

// route 1 - get all - mongoose added
exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

// route 2 - get by id - mongoose added
exports.getById = async (req, res) => {
    try {
      const dep = await Seat.findById(req.params.id);
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
      const { day, seat, client, email } = req.body;
      const newSeat = new Seat({ day, seat, client, email });
      await newSeat.save();
      res.json({ message: 'OK' });  
    } catch(err) {
      res.status(500).json({ message: err });
    }  
};

// route 4 - put
exports.editDoc = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
      const dep = await Seat.findById(req.params.id);
      if(dep) {
        await Seat.updateOne({ _id: req.params.id }, { $set: { day, seat, client, email }});
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
      const dep = await Seat.findById(req.params.id);
      if(dep) {
        await Seat.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};