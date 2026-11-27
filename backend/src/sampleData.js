/**
 * Realistic sample data: 10 subjects, 35 students.
 * Student IDs are assigned so that multiple subjects share students,
 * creating a rich conflict graph for demonstration.
 */

const sampleSubjects = [
  {
    id: 'CS101',
    name: 'Introduction to Programming',
    code: 'CS101',
    students: ['S01','S02','S03','S04','S05','S06','S07','S08','S09','S10'],
  },
  {
    id: 'CS201',
    name: 'Data Structures',
    code: 'CS201',
    students: ['S05','S06','S07','S08','S11','S12','S13','S14','S15'],
  },
  {
    id: 'CS301',
    name: 'Algorithms & Complexity',
    code: 'CS301',
    students: ['S09','S10','S11','S12','S16','S17','S18','S19','S20'],
  },
  {
    id: 'CS401',
    name: 'Database Systems',
    code: 'CS401',
    students: ['S13','S14','S15','S16','S21','S22','S23','S24'],
  },
  {
    id: 'CS501',
    name: 'Operating Systems',
    code: 'CS501',
    students: ['S17','S18','S19','S20','S21','S25','S26','S27'],
  },
  {
    id: 'CS601',
    name: 'Computer Networks',
    code: 'CS601',
    students: ['S22','S23','S24','S25','S28','S29','S30'],
  },
  {
    id: 'MATH201',
    name: 'Discrete Mathematics',
    code: 'MATH201',
    students: ['S01','S02','S03','S11','S12','S16','S17','S28'],
  },
  {
    id: 'MATH301',
    name: 'Linear Algebra',
    code: 'MATH301',
    students: ['S04','S05','S13','S18','S22','S29','S30','S31'],
  },
  {
    id: 'PHY201',
    name: 'Physics for Engineers',
    code: 'PHY201',
    students: ['S06','S07','S08','S14','S19','S23','S26','S32','S33'],
  },
  {
    id: 'ENG101',
    name: 'Technical Writing',
    code: 'ENG101',
    students: ['S09','S10','S15','S20','S24','S27','S30','S34','S35'],
  },
];

module.exports = { sampleSubjects };
