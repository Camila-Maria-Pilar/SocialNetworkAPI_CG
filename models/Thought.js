const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

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
    get: (createdAt) => moment(createdAt).format('YYYY-MM-DD hh:mm:ss'),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema], // Defined below as a nested schema
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
