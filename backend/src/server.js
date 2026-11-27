const express = require('express');
const cors = require('cors');
const { graphColoringWithBacktracking, buildConflictGraph } = require('./graphColoring');
const { buildTimetable } = require('./timetableBuilder');
const { sampleSubjects } = require('./sampleData');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory subject store (initialized with sample data)
let subjectStore = sampleSubjects.map(s => ({ ...s }));

// ─── Subjects API ────────────────────────────────────────────────

// GET all subjects
app.get('/api/subjects', (req, res) => {
  res.json({ success: true, data: subjectStore });
});

// POST new subject
app.post('/api/subjects', (req, res) => {
  const { id, name, code, students } = req.body;

  if (!id || !name || !code) {
    return res.status(400).json({ success: false, error: 'id, name, and code are required.' });
  }
  if (subjectStore.find(s => s.id === id)) {
    return res.status(409).json({ success: false, error: `Subject with id "${id}" already exists.` });
  }

  const parsedStudents = Array.isArray(students) ? students : [];
  const subject = { id: id.trim(), name: name.trim(), code: code.trim(), students: parsedStudents };
  subjectStore.push(subject);
  res.status(201).json({ success: true, data: subject });
});

// PUT update subject
app.put('/api/subjects/:id', (req, res) => {
  const idx = subjectStore.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, error: 'Subject not found.' });

  const { name, code, students } = req.body;
  if (name) subjectStore[idx].name = name.trim();
  if (code) subjectStore[idx].code = code.trim();
  if (Array.isArray(students)) subjectStore[idx].students = students;

  res.json({ success: true, data: subjectStore[idx] });
});

// DELETE subject
app.delete('/api/subjects/:id', (req, res) => {
  const idx = subjectStore.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, error: 'Subject not found.' });
  const removed = subjectStore.splice(idx, 1)[0];
  res.json({ success: true, data: removed });
});

// POST reset to sample data
app.post('/api/subjects/reset', (req, res) => {
  subjectStore = sampleSubjects.map(s => ({ ...s }));
  res.json({ success: true, message: 'Reset to sample data.', data: subjectStore });
});

// ─── Conflict Graph API ──────────────────────────────────────────

app.get('/api/conflicts', (req, res) => {
  if (subjectStore.length === 0) {
    return res.json({ success: true, data: { adjacency: {}, conflictPairs: [] } });
  }
  const { adjacency, conflictPairs } = buildConflictGraph(subjectStore);

  // Convert Sets to arrays for JSON
  const adjacencyObj = {};
  for (const [id, set] of Object.entries(adjacency)) {
    adjacencyObj[id] = Array.from(set);
  }

  res.json({ success: true, data: { adjacency: adjacencyObj, conflictPairs } });
});

// ─── Timetable Generation API ────────────────────────────────────

app.post('/api/generate', (req, res) => {
  const { startDate } = req.body;

  if (subjectStore.length === 0) {
    return res.status(400).json({ success: false, error: 'No subjects to schedule.' });
  }

  const result = graphColoringWithBacktracking(subjectStore);

  if (!result.success) {
    return res.status(422).json({ success: false, error: result.error });
  }

  const timetable = buildTimetable(result.assignment, subjectStore, startDate || null);

  res.json({
    success: true,
    data: {
      timetable,
      algorithm: {
        colorsUsed: result.colorsUsed,
        executionTimeMs: result.executionTimeMs,
        iterations: result.stats.iterations,
        backtracks: result.stats.backtracks,
        totalConflicts: result.conflictPairs.length,
        adjacency: result.adjacency,
        conflictPairs: result.conflictPairs,
        assignment: result.assignment,
      },
    },
  });
});

// ─── Dashboard Stats API ─────────────────────────────────────────

app.get('/api/stats', (req, res) => {
  const allStudents = new Set();
  subjectStore.forEach(s => s.students.forEach(id => allStudents.add(id)));

  const { conflictPairs } = buildConflictGraph(subjectStore);

  res.json({
    success: true,
    data: {
      totalSubjects: subjectStore.length,
      totalStudents: allStudents.size,
      totalConflicts: conflictPairs.length,
    },
  });
});

// ─── Health Check ────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Smart Exam Timetable API running on http://localhost:${PORT}`);
});
