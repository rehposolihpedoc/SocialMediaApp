const { Schema, model } = require('mongoose');
const reactionsSchema = require('./reaction');

// schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:(newDate)=>newDate.toLocaleDateString(),
    },
    username: {
      type: String,
      required: true,
    },
    
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const thought = model('thought', thoughtSchema);

module.exports = thought;