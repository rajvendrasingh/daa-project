import React, { useState } from 'react';
import { IconCalendar, IconTable, IconRefresh, IconPalette, IconBook, IconClock, IconGear } from '../components/Icons';

const SLOT_COLORS = ['#2563EB','#1D4ED8','#3B82F6','#60A5FA','#93C5FD','#1E3A5F','#0F172A','#BFDBFE'];
const LIGHT_BG    = new Set(['#BFDBFE','#93C5FD']);

function slotBadgeStyle(slotNumber) {
  const bg = SLOT_COLORS[(slotNumber - 1) % SLOT_COLORS.length];
  return {
    display: 'inline-block',
    padding: '2px 10px', borderRadius: 10,
    background: bg,
    color: LIGHT_BG.has(bg) ? '#1E293B' : '#FFFFFF',
    fontSize: '.73rem', fontWeight: 700,
  };
}

export default function TimetableView({ timetableResult, onNavigate }) {
  const timetable = timetableResult?.timetable || [];
  const [view, setView] = useState('calendar');

  if (!timetableResult) {
    return (
      <div>
        <div className="page-header">
          <div className="page-header-left">
            <h1>Timetable View</h1>
            <p>Generated timetable with dates, times, and room assignments.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="empty-state">
              <div style={{ marginBottom: 14 }}>
                <IconCalendar size={44} color="var(--text-muted)" />
              </div>
              <p>No timetable generated yet.</p>
              <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => onNavigate('generator')}>
                <IconGear size={15} /> Go to Generator
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const byDate = {};
  for (const entry of timetable) {
    if (!byDate[entry.dateISO]) byDate[entry.dateISO] = { label: entry.date, entries: [] };
    byDate[entry.dateISO].entries.push(entry);
  }
  const sortedDates = Object.keys(byDate).sort();

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Examination Timetable</h1>
          <p>
            {timetable.length} exams across {sortedDates.length} day(s) using{' '}
            {timetableResult.algorithm?.colorsUsed} slot(s).
          </p>
        </div>
        <div className="page-header-actions">
          <button
            className={`btn btn-sm ${view === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('calendar')}
          >
            <IconCalendar size={14} /> Calendar
          </button>
          <button
            className={`btn btn-sm ${view === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('table')}
          >
            <IconTable size={14} /> Table
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => onNavigate('generator')}>
            <IconRefresh size={14} /> Regenerate
          </button>
        </div>
      </div>

      {/* Summary pills */}
      <div className="info-row">
        <div className="info-pill">
          <IconPalette size={14} color="var(--blue)" />
          <strong>{timetableResult.algorithm?.colorsUsed}</strong> exam slots
        </div>
        <div className="info-pill">
          <IconCalendar size={14} color="var(--blue)" />
          <strong>{sortedDates.length}</strong> exam days
        </div>
        <div className="info-pill">
          <IconBook size={14} color="var(--blue)" />
          <strong>{timetable.length}</strong> total exams
        </div>
        <div className="info-pill">
          <IconClock size={14} color="var(--blue)" />
          Generated in <strong>{timetableResult.algorithm?.executionTimeMs} ms</strong>
        </div>
      </div>

      {/* Calendar view */}
      {view === 'calendar' ? (
        <div className="timetable-grid">
          {sortedDates.map(dateISO => {
            const { label, entries } = byDate[dateISO];
            const sorted = [...entries].sort((a, b) => a.timeStart.localeCompare(b.timeStart));
            return (
              <div className="timetable-day" key={dateISO}>
                <div className="timetable-day-header">
                  <IconCalendar size={15} color="rgba(255,255,255,0.85)" />
                  <span>{label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '.75rem', opacity: .7 }}>
                    {entries.length} exam{entries.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="timetable-day-body">
                  {sorted.map((entry, i) => (
                    <div
                      key={entry.subjectId + i}
                      className={`exam-entry slot-color-${(entry.slotNumber - 1) % 8 + 1}`}
                    >
                      <div className="exam-time">
                        <IconClock size={12} color="var(--blue)" style={{ marginRight: 4 }} />
                        {entry.timeSlot}
                      </div>
                      <div className="exam-info">
                        <div className="exam-name">{entry.subjectName}</div>
                        <div className="exam-meta">
                          Code: {entry.subjectCode} · Room: {entry.room} · {entry.enrolledStudents} students
                        </div>
                      </div>
                      <div className="exam-slot-badge">Slot {entry.slotNumber}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table view */
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <IconTable size={16} color="var(--blue)" /> Full Timetable
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Slot</th>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Room</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((entry, i) => (
                  <tr key={entry.subjectId + i}>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{i + 1}</td>
                    <td><span style={slotBadgeStyle(entry.slotNumber)}>Slot {entry.slotNumber}</span></td>
                    <td>
                      <code style={{ fontSize: '.82rem', color: 'var(--text-heading)' }}>
                        {entry.subjectCode}
                      </code>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{entry.subjectName}</td>
                    <td style={{ fontSize: '.82rem' }}>{entry.date}</td>
                    <td style={{ fontSize: '.8rem', whiteSpace: 'nowrap' }}>{entry.timeSlot}</td>
                    <td><span className="chip chip-purple">{entry.room}</span></td>
                    <td><span className="chip chip-green">{entry.enrolledStudents}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
