const mongoose = require('mongoose');

const ActiveDebateSchema = mongoose.Schema({
  topic: String,
  debate: { type: mongoose.Schema.Types.ObjectId, ref: 'Debate' },
  for: { type: mongoose.Schema.Types.ObjectId, ref: 'For' },
  against: { type: mongoose.Schema.Types.ObjectId, ref: 'Against' },
  spectator: { type: mongoose.Schema.Types.ObjectId, ref: 'Spectator' }
});

const ActiveDebate = module.exports = mongoose.model('ActiveDebate', ActiveDebateSchema);

module.exports.addActiveDebate = (debate, callback) => {
  debate.save(callback);
};

module.exports.getAllActiveDebates = (callback) => {
  ActiveDebate.find(callback);
};