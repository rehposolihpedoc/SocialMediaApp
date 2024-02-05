const User = require('../models/user');
const Thought = require('../models/thought');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .populate("thoughts");
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate("thoughts");

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createNewUser(req, res) {
    console.log(req.body);
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user by its ID 
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// Delete a user
  async deleteUser(req, res) {
      try {
        const user = await User.findOneAndRemove(
        { _id: req.params.userId }, 
        { new: true }
      );

      if (!user) {
        return res.status(404)
          .json({ message: 'User is created but there is no user with this id!' });
      }

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // 
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Friend added, but found no user with that ID',
        });
      }

      res.json('Created the add friend 🎉');
    } catch (err) {}

  },
  
  async removeFriend(req, res) {

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Friend created but no user with this id!' });
      }

      res.json({ message: 'Friend successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }

  },


};
