//CRUD THOUGTS
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createNewThought,
  updateAThought,
  deleteAThought,
  addThoughtReactions,
  removeThoughtReactions,
} = require('../../controllers/thoughtController');

// 3001/api/thoughts
router.route('/').get(getThoughts).post(createNewThought);

// 3001/api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateAThought)
  .delete(deleteAThought);

// 3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addThoughtReactions);

// 3001/api/thoughts/:thoughtId/reaction/:responseId
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReactions);

module.exports = router;