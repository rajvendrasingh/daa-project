import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Conflicts from './pages/Conflicts';
import Generator from './pages/Generator';
import TimetableView from './pages/TimetableView';
import Analysis from './pages/Analysis';
import { api } from './utils/api';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [subjects, setSubjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [timetableResult, setTimetableResult] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);

  const loadSubjectsAndStats = useCallback(async () => {
    try {
      const [subRes, statRes] = await Promise.all([api.getSubjects(), api.getStats()]);
      setSubjects(subRes.data.data);
      setStats(statRes.data.data);
      setBackendOnline(true);
    } catch {
      setBackendOnline(false);
    }
  }, []);

  useEffect(() => {
    loadSubjectsAndStats();
  }, [loadSubjectsAndStats]);

  // Update stats whenever timetableResult changes
  useEffect(() => {
    if (timetableResult) {
      setStats(prev => ({
        ...prev,
        totalSlots: timetableResult.algorithm?.colorsUsed,
      }));
    }
  }, [timetableResult]);

  function handleGenerated(result) {
    setTimetableResult(result);
    setPage('timetable');
  }

  function renderPage() {
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            stats={{ ...stats, totalSlots: timetableResult?.algorithm?.colorsUsed }}
            timetableResult={timetableResult}
            onNavigate={setPage}
          />
        );
      case 'subjects':
        return <Subjects subjects={subjects} onRefresh={loadSubjectsAndStats} />;
      case 'conflicts':
        return <Conflicts subjects={subjects} timetableResult={timetableResult} />;
      case 'generator':
        return (
          <Generator
            subjects={subjects}
            timetableResult={timetableResult}
            onGenerated={handleGenerated}
            onNavigate={setPage}
          />
        );
      case 'timetable':
        return <TimetableView timetableResult={timetableResult} onNavigate={setPage} />;
      case 'analysis':
        return <Analysis timetableResult={timetableResult} />;
      default:
        return null;
    }
  }

  return (
    <div className="app-layout">
      <Sidebar activePage={page} onNavigate={setPage} />
      <div className="main-content">
        <Topbar activePage={page} backendOnline={backendOnline} />
        <main className="page-body">
          {!backendOnline && (
            <div className="alert alert-error" style={{ marginBottom: 20 }}>
              ⚠️ Cannot reach the backend API at <code>http://localhost:5000</code>.
              Make sure the backend server is running.
            </div>
          )}
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
