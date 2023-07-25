const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');
const Reaction = require('./models/Reaction');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_network_db';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Helper function to create and save records
async function createRecord(model, data) {
  try {
    return await model.create(data);
  } catch (error) {
    console.error('Error creating record:', error.message);
    return null;
  }
}

// Seed data
const seedData = {
  users: [
    {
      username: 'user1',
      email: 'user1@example.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      thoughts: [],
      friends: [],
    },
  ],
  thoughts: [
    {
      thoughtText: 'This is thought 1.',
      username: 'user1',
      reactions: [],
    },
    {
      thoughtText: 'Thought 2 is amazing!',
      username: 'user2',
      reactions: [],
    },
  ],
  reactions: [
    {
      reactionBody: 'I agree!',
      username: 'user2',
    },
    {
      reactionBody: 'Interesting thought.',
      username: 'user1',
    },
  ],
};

async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();
    await Reaction.deleteMany();

    // Insert seed data
    const users = await createRecord(User, seedData.users);
    const thoughts = await createRecord(Thought, seedData.thoughts);
    const reactions = await createRecord(Reaction, seedData.reactions);

    if (users && thoughts && reactions) {
      // Associate thoughts with users
      users[0].thoughts.push(thoughts[0]);
      users[1].thoughts.push(thoughts[1]);

      // Associate reactions with thoughts
      thoughts[0].reactions.push(reactions[0]);
      thoughts[1].reactions.push(reactions[1]);

      // Save the updated records
      await users[0].save();
      await users[1].save();
      await thoughts[0].save();
      await thoughts[1].save();

      console.log('Seed data inserted successfully!');
    } else {
      console.error('Failed to insert seed data.');
    }

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error.message);
    mongoose.connection.close();
  }
}

seedDatabase();
