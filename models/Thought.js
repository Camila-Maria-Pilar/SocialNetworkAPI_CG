const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

// Define the Reaction sub-schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
  },
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Use the Reaction sub-schema
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
