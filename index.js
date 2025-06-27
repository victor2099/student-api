const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Student = require('./models/Student');


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/studentdb');

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

app.post('/students', async (req, res) => {
  const { firstName, lastName, email, age } = req.body;
  if (!firstName || !lastName || !email || typeof age !== 'number') {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }
  try {
    const student = new Student({ firstName, lastName, email, age });
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/students/count', async (req, res) => {
  const count = await Student.countDocuments();
  res.json({ count });
});

app.get('/students', async (req, res) => {
  const { page = 1, limit = 10, lastName } = req.query;

  const filter = lastName ? { lastName: new RegExp(`^${lastName}$`, 'i') } : {};

  try {
    const students = await Student.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.put('/students/:id', async (req, res) => {
  const updates = req.body;
  try {
    if (updates.email) {
      const emailExists = await Student.findOne({ email: updates.email, _id: { $ne: req.params.id } });
      if (emailExists) return res.status(409).json({ error: 'Email already exists' });
    }
    const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted', id: deleted._id });
  } catch {
    res.status(404).json({ error: 'Student not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));