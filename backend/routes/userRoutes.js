// routes/userRoutes.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST - Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update a user
router.put('/:email', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Get a single user by email
router.get('/:email', async (req, res) => {
  console.log(req.params.email);
  try {
    // console.log(req.params.email);
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// DELETE - Delete a user
router.delete('/users/:email', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ email: req.params.email });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
