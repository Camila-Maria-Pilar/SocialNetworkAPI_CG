const Thought = require('../models/Thought');
const User = require('../models/User'); 


const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch thoughts.' });
  }
};

const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch thought.' });
  }
};

const createThought = async (req, res) => {
  try {
    const { thoughtText, username } = req.body;
    const newThought = await Thought.create({ thoughtText, username });

    // Add the new thought's _id to the associated user's thoughts array field
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create thought.', details: err.message });
  }
};

const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update thought.', details: err.message });
  }
};

const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndRemove(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }
    res.json(deletedThought);
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete thought.', details: err.message });
  }
};

const createReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }
    res.json(thought);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create reaction.', details: err.message });
  }
};

const deleteReaction = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }
    res.json(thought);
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete reaction.', details: err.message });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
