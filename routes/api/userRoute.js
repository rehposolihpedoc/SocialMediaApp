// CRUD USERS
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,

} = require('../../controllers/userController');

// 3001/api/users
router.route('/').get(getUsers).post(createUser);

// 3001/api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// 3001/api/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(removeFriend);
module.exports = router;
