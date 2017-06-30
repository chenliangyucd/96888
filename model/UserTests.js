
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserTestsSchema =  new Schema({
  name: String
});

module.exports = mongoose.model('user_tests', UserTestsSchema);