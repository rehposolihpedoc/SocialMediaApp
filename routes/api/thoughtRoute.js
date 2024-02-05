//CRUD THOUGTS
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReactions,
  removeReactions,
} = require('../../controllers/thoughtController');

// 3001/api/thoughts
router.route('/').get(getThoughts).post(createThought);

// 3001/api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// 3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReactions);

// 3001/api/thoughts/:thoughtId/reaction/:responseId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReactions);

module.exports = router;