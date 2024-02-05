const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId; // Moved this line after requiring mongoose
const { users, thoughts, reactions } = require("./data");
const user = require("../models/user");
const thought = require("../models/thought");
const reactions = require("../models/reaction")

const seedDatabase = async () => {
    try {
      console.log("Seeding database...");
      
      // Clear existing data
      await user.deleteMany({});
      await thought.deleteMany({});
  
      // Insert new data
      await user.insertMany(users);
      await thought.insertMany(thoughts);
      await reactions.insertMany(reactions);
  
      console.log("All data imported!");
      process.exit(0);
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  };
  

seedDatabase();