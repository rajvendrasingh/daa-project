import React from 'react';
import {
  IconDashboard, IconBook, IconConflict,
  IconGear, IconCalendar, IconBrain,
} from './Icons';

const PAGE_META = {
  dashboard: { label: 'Dashboard',              Icon: IconDashboard },
  subjects:  { label: 'Subject Management',     Icon: IconBook      },
  conflicts: { label: 'Conflict Visualization', Icon: IconConflict  },
  generator: { label: 'Timetable Generator',    Icon: IconGear      },
  timetable: { label: 'Timetable View',         Icon: IconCalendar  },
  analysis:  { label: 'Algorithm Analysis',     Icon: IconBrain     },
};

export default function Topbar({ activePage, backendOnline }) {
  const { label, Icon } = PAGE_META[activePage] || { label: activePage, Icon: IconDashboard };

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 32, height: 32,
          background: 'var(--blue-light)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={16} color="var(--blue)" />
        </span>
        <div>
          <div className="topbar-title">{label}</div>
          <div className="topbar-breadcrumb">Smart Exam Timetable Generator · University Portal</div>
        </div>
      </div>

      <div className="topbar-spacer" />

      <div className={`badge-status ${backendOnline ? '' : 'offline'}`}>
        <span className="dot" />
        {backendOnline ? 'API Online' : 'API Offline'}
      </div>
    </header>
  );
}
