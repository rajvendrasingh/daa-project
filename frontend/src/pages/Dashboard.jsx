import React from 'react';
import {
  IconBook, IconUsers, IconBolt, IconPalette, IconCheck, IconClock,
  IconConflict, IconGear, IconBrain, IconCalendar, IconArrowRight, IconRepeat,
} from '../components/Icons';

export default function Dashboard({ stats, timetableResult, onNavigate }) {
  const { totalSubjects = 0, totalStudents = 0, totalConflicts = 0 } = stats || {};
  const slotsUsed = timetableResult?.algorithm?.colorsUsed ?? '—';
  const generated = Boolean(timetableResult);

  const statCards = [
    { Icon: IconBook,     value: totalSubjects,  label: 'Total Subjects'    },
    { Icon: IconUsers,    value: totalStudents,   label: 'Total Students'    },
    { Icon: IconBolt,     value: totalConflicts,  label: 'Total Conflicts'   },
    { Icon: IconPalette,  value: slotsUsed,       label: 'Exam Slots Used'   },
    {
      Icon: generated ? IconCheck : IconClock,
      value: generated ? 'Generated' : 'Pending',
      label: 'Timetable Status',
      smallValue: true,
    },
  ];

  const quickCards = [
    { page: 'subjects',  Icon: IconBook,     title: 'Manage Subjects',    desc: 'Add, edit, or delete subjects and assign students.' },
    { page: 'conflicts', Icon: IconConflict, title: 'View Conflict Graph', desc: 'Visualize which subjects share common students.' },
    { page: 'generator', Icon: IconGear,     title: 'Generate Timetable', desc: 'Run the Graph Coloring algorithm instantly.' },
    { page: 'analysis',  Icon: IconBrain,    title: 'Algorithm Analysis', desc: 'Complexity, execution stats, and how backtracking works.' },
  ];

  const steps = [
    { Icon: IconBook,     title: 'Input Subjects',       desc: 'Each subject with its enrolled student list is added to the system.' },
    { Icon: IconConflict, title: 'Build Conflict Graph',  desc: 'Subjects sharing common students become connected vertices in the graph.' },
    { Icon: IconPalette,  title: 'Graph Coloring',        desc: 'Each exam slot is a color. No two adjacent vertices can share the same color.' },
    { Icon: IconRepeat,   title: 'Backtracking',          desc: 'The algorithm tries slots, backtracks on conflict, and finds the minimum number.' },
    { Icon: IconCalendar, title: 'Build Timetable',       desc: 'Slot assignments are mapped to real dates and times in a calendar view.' },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Welcome to Smart Exam Timetable Generator</h1>
          <p>Automated examination scheduling powered by Graph Coloring with Backtracking algorithm.</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        {statCards.map(({ Icon, value, label, smallValue }) => (
          <div className="stat-card" key={label}>
            <div className="stat-icon">
              <Icon size={20} color="var(--blue)" />
            </div>
            <div>
              <div className="stat-value" style={smallValue ? { fontSize: '1.1rem', marginTop: 4 } : {}}>
                {value}
              </div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick-action cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
        {quickCards.map(({ page, Icon, title, desc }) => (
          <div
            key={page}
            className="card quick-card"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigate(page)}
          >
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 22px' }}>
              <div style={{
                width: 44, height: 44,
                borderRadius: 10,
                background: 'var(--blue-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={20} color="var(--blue)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-heading)', marginBottom: 3 }}>{title}</div>
                <div style={{ fontSize: '.82rem', color: 'var(--text-body)' }}>{desc}</div>
              </div>
              <IconArrowRight size={16} color="var(--text-muted)" />
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <div className="card-title">
            <IconGear size={16} color="var(--blue)" />
            How the Algorithm Works
          </div>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
            {steps.map(({ Icon, title, desc }, i) => (
              <div key={title} style={{
                padding: '14px 16px',
                borderRadius: 8,
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
                  <span style={{
                    background: 'var(--navy)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 22, height: 22,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.72rem', fontWeight: 700, flexShrink: 0,
                  }}>{i + 1}</span>
                  <div style={{
                    width: 28, height: 28,
                    background: 'var(--blue-light)',
                    borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={15} color="var(--blue)" />
                  </div>
                  <strong style={{ fontSize: '.85rem', color: 'var(--text-heading)' }}>{title}</strong>
                </div>
                <p style={{ fontSize: '.78rem', color: 'var(--text-body)', lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
