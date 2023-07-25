const Thought = require('../models/Thought');

// Controller functions (implement these)
const getAllThoughts = (req, res) => {
  // Implement logic to get all thoughts
};

const getThoughtById = (req, res) => {
  // Implement logic to get a single thought by _id
};

const createThought = (req, res) => {
  // Implement logic to create a new thought
};

const updateThought = (req, res) => {
  // Implement logic to update a thought by _id
};

const deleteThought = (req, res) => {
  // Implement logic to delete a thought by _id
};

const createReaction = (req, res) => {
  // Implement logic to create a reaction in a thought's reactions array field
};

const deleteReaction = (req, res) => {
  // Implement logic to pull and remove a reaction by the reactionId value
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
