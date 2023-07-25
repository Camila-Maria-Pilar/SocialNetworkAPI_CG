const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

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
    get: (createdAt) => moment(createdAt).format('YYYY-MM-DD hh:mm:ss'),
  },
},
{
  toJSON: {
    getters: true,
  },
  id: false,
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
