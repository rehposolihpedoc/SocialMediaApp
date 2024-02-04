const {Thought, User} = require('../models');

module.exports = {
    //Get all thoughts
    async getThoughts(req, res) {
        try {
          const thoughts = await Thought.find();
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
     //Get a single thought by id
      async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId })
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
     
     //create new thoughts
      async createNewThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          //Then find one user
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          );
    
          if (!user) {
            return res.status(404).json({
              message: 'Thought created, but user ID match not found',
            });
          }
          res.json('Created new thought!;-)');
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      //Update thoughts
      async updateAThought(req, res) {
        try {
          const aThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!aThought) {
            return res.status(404).json({ message: 'Sorry there is no thought with this id!' });
          }
    
          res.json(aThought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      //delete thougths
      async deleteAThought(req, res) {
        try {
          const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
        // find the user who made the thought
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $pull: { thoughts: {_id:req.params.thoughtId }} },
            { new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'Thought created but there is no user with this id!' });
          }
    
          res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
      //Add Reactions to thoughts
      async addThoughtReactions (req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'There is no thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Remove reactions to thoughts
      async removeThoughtReactions(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          )
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },






















}