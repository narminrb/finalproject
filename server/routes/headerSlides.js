const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Create a schema & model if not already defined
const HeaderSlide = mongoose.model('HeaderSlide', new mongoose.Schema({
  name: String,
  description: String,
  image: String,
}, { timestamps: true }));

// GET slides
router.get('/', async (req, res) => {
  const slides = await HeaderSlide.find();
  res.json(slides);
});

// POST slide
router.post('/', async (req, res) => {
  try {
    const newSlide = new HeaderSlide(req.body);
    await newSlide.save();
    res.status(201).json(newSlide);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create slide' });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the slide by id
      const deleted = await HeaderSlide.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Slide not found' });
      }
  
      // Optionally: delete image from storage if applicable here
  
      res.json({ message: 'Slide deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
