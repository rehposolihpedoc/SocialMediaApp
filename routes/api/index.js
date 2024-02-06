const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoute');
const userRoutes = require('./userRoute');
// 3001/api/thoughts
router.use('/thoughts', thoughtRoutes);
// 3001/api/users
router.use('/users', userRoutes);

module.exports = router;
