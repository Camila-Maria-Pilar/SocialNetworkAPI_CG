const Thought = require('../models/Thought');

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
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

    res.json(newThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndRemove(req.params.id);
    res.json(deletedThought);
  } catch (err) {
    res.status(400).json(err);
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
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
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
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
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
