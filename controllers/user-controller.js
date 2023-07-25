const User = require('../models/User');
const Thought = require('../models/Thought');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends');
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);

    // Remove the user from their friends' friend lists
    await User.updateMany(
      { _id: { $in: deletedUser.friends } },
      { $pull: { friends: deletedUser._id } }
    );

    // Remove the user's associated thoughts
    await Thought.deleteMany({ username: deletedUser.username });

    res.json(deletedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
