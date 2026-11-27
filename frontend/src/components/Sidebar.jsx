import React from 'react';
import {
  IconDashboard, IconBook, IconConflict,
  IconGear, IconCalendar, IconBrain,
} from './Icons';

const NAV_ITEMS = [
  { id: 'dashboard',  Icon: IconDashboard, label: 'Dashboard' },
  { id: 'subjects',   Icon: IconBook,      label: 'Subject Management' },
  { id: 'conflicts',  Icon: IconConflict,  label: 'Conflict Visualization' },
  { id: 'generator',  Icon: IconGear,      label: 'Timetable Generator' },
  { id: 'timetable',  Icon: IconCalendar,  label: 'Timetable View' },
  { id: 'analysis',   Icon: IconBrain,     label: 'Algorithm Analysis' },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 34, height: 34,
            background: 'var(--blue)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <IconCalendar size={18} color="#fff" />
          </span>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '.95rem', lineHeight: 1.2 }}>
              ExamScheduler
            </div>
            <div style={{ color: 'rgba(255,255,255,.45)', fontSize: '.72rem', marginTop: 2 }}>
              Smart Timetable System
            </div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {NAV_ITEMS.map(({ id, Icon, label }) => (
          <button
            key={id}
            className={`nav-item ${activePage === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <span className="nav-icon">
              <Icon
                size={17}
                color={activePage === id ? '#fff' : 'rgba(255,255,255,0.65)'}
              />
            </span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        Graph Coloring · Backtracking
      </div>
    </aside>
  );
}
