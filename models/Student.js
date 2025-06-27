const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true }
}, { timestamps: true });

studentSchema.index({ email: 1 });

module.exports = mongoose.model('Student', studentSchema);