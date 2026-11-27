/**
 * Converts raw algorithm output (slot numbers) into a full timetable
 * with dates, times, rooms, and display metadata.
 */

const TIME_SLOTS = [
  { label: '08:00 AM – 10:00 AM', start: '08:00', end: '10:00' },
  { label: '10:30 AM – 12:30 PM', start: '10:30', end: '12:30' },
  { label: '01:00 PM – 03:00 PM', start: '13:00', end: '15:00' },
  { label: '03:30 PM – 05:30 PM', start: '15:30', end: '17:30' },
];

/**
 * Given the graph-coloring assignment { subjectId: slotNumber }
 * and a list of subjects, produce a detailed timetable.
 *
 * Slots are mapped to actual dates starting from `startDate`.
 * Each exam day has up to `slotsPerDay` time slots.
 */
function buildTimetable(assignment, subjects, startDateISO = null) {
  const startDate = startDateISO ? new Date(startDateISO) : getNextMonday();
  const subjectMap = Object.fromEntries(subjects.map(s => [s.id, s]));

  // Group subjects by their assigned slot number
  const slotGroups = {}; // slotNumber -> [subjectId]
  for (const [subjectId, slotNum] of Object.entries(assignment)) {
    if (!slotGroups[slotNum]) slotGroups[slotNum] = [];
    slotGroups[slotNum].push(subjectId);
  }

  const totalSlots = Object.keys(slotGroups).length;
  const slotsPerDay = TIME_SLOTS.length;

  const timetable = [];

  for (let slotNum = 1; slotNum <= totalSlots; slotNum++) {
    const dayOffset = Math.floor((slotNum - 1) / slotsPerDay);
    const timeIndex = (slotNum - 1) % slotsPerDay;

    const examDate = new Date(startDate);
    // Skip weekends
    let workday = 0;
    let d = new Date(startDate);
    while (workday <= dayOffset) {
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        if (workday === dayOffset) break;
        workday++;
      }
      d.setDate(d.getDate() + 1);
    }

    const dateStr = d.toLocaleDateString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });
    const dateISO = d.toISOString().split('T')[0];

    const subjectsInSlot = slotGroups[slotNum] || [];
    for (const subjectId of subjectsInSlot) {
      const subject = subjectMap[subjectId];
      if (!subject) continue;
      timetable.push({
        slotNumber: slotNum,
        subjectId: subject.id,
        subjectName: subject.name,
        subjectCode: subject.code,
        date: dateStr,
        dateISO,
        timeSlot: TIME_SLOTS[timeIndex].label,
        timeStart: TIME_SLOTS[timeIndex].start,
        timeEnd: TIME_SLOTS[timeIndex].end,
        enrolledStudents: subject.students.length,
        room: assignRoom(subject.students.length),
      });
    }
  }

  // Sort by date then time
  timetable.sort((a, b) => {
    if (a.dateISO !== b.dateISO) return a.dateISO.localeCompare(b.dateISO);
    return a.timeStart.localeCompare(b.timeStart);
  });

  return timetable;
}

function assignRoom(studentCount) {
  if (studentCount <= 30) return 'Hall A';
  if (studentCount <= 60) return 'Hall B';
  return 'Main Auditorium';
}

function getNextMonday() {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? 1 : (8 - day) % 7 || 7;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

module.exports = { buildTimetable };
