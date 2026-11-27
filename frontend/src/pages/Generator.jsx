import React, { useState } from 'react';
import { api } from '../utils/api';
import {
  IconRocket, IconRefresh, IconCalendar, IconTable,
  IconPalette, IconClock, IconBolt, IconRepeat, IconBook,
  IconCheck, IconWarning, IconInfo,
} from '../components/Icons';

// Blue-family slot badge scale
const SLOT_COLORS = ['#2563EB','#1D4ED8','#3B82F6','#60A5FA','#93C5FD','#1E3A5F','#0F172A','#BFDBFE'];
const LIGHT_BG    = new Set(['#BFDBFE','#93C5FD']);

function slotBadgeStyle(slot) {
  const bg = SLOT_COLORS[(slot - 1) % SLOT_COLORS.length];
  return {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '3px 11px', borderRadius: 12,
    background: bg,
    color: LIGHT_BG.has(bg) ? '#1E293B' : '#FFFFFF',
    fontSize: '.78rem', fontWeight: 700,
  };
}

export default function Generator({ subjects, timetableResult, onGenerated, onNavigate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [startDate, setStartDate] = useState('');

  async function handleGenerate() {
    if (subjects.length === 0) {
      setError('No subjects available. Add subjects first.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await api.generate(startDate || undefined);
      onGenerated(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const algo = timetableResult?.algorithm;

  const statCards = [
    { label: 'Slots Used',      value: algo?.colorsUsed,          Icon: IconPalette },
    { label: 'Execution Time',  value: algo ? `${algo.executionTimeMs} ms` : '—', Icon: IconClock },
    { label: 'Total Conflicts', value: algo?.totalConflicts,       Icon: IconBolt   },
    { label: 'Backtracks',      value: algo?.backtracks,           Icon: IconRepeat },
    { label: 'Iterations',      value: algo?.iterations,           Icon: IconRefresh },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Timetable Generator</h1>
          <p>Run the Graph Coloring with Backtracking algorithm to produce a conflict-free timetable.</p>
        </div>
      </div>

      {error && <div className="alert alert-error"><IconWarning size={15} /> {error}</div>}

      {/* Settings card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div className="card-title">
            <IconCalendar size={16} color="var(--blue)" /> Generation Settings
          </div>
        </div>
        <div className="card-body">
          <div className="form-row" style={{ alignItems: 'flex-end' }}>
            <div className="form-group" style={{ maxWidth: 260 }}>
              <label>Exam Start Date (optional)</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <span style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>
                Defaults to next Monday if not set.
              </span>
            </div>
            <div>
              <button className="btn btn-primary btn-lg" onClick={handleGenerate} disabled={loading}>
                {loading
                  ? <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite' }} /> Generating…</>
                  : <><IconRocket size={16} /> Generate Timetable</>
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-run info */}
      {!timetableResult && (
        <div className="alert alert-info">
          <IconInfo size={15} />
          The algorithm will process <strong>{subjects.length} subjects</strong> and assign minimum exam slots
          using Graph Coloring with Backtracking. No conflicting subjects will share a slot.
        </div>
      )}

      {/* Result stats */}
      {algo && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          {statCards.map(({ label, value, Icon }) => (
            <div className="stat-card" key={label}>
              <div className="stat-icon">
                <Icon size={20} color="var(--blue)" />
              </div>
              <div>
                <div className="stat-value" style={{ fontSize: '1.5rem' }}>{value ?? '—'}</div>
                <div className="stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slot assignments */}
      {algo?.assignment && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="card-header">
            <div className="card-title">
              <IconPalette size={16} color="var(--blue)" /> Slot Assignments
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline btn-sm" onClick={() => onNavigate('timetable')}>
                <IconCalendar size={13} /> View Full Timetable
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleGenerate} disabled={loading}>
                <IconRefresh size={13} /> Regenerate
              </button>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Name</th>
                  <th>Assigned Slot</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(algo.assignment)
                  .sort((a, b) => a[1] - b[1])
                  .map(([subjectId, slot]) => {
                    const subject = subjects.find(s => s.id === subjectId);
                    return (
                      <tr key={subjectId}>
                        <td><span className="chip chip-blue">{subjectId}</span></td>
                        <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>
                          {subject?.name || subjectId}
                        </td>
                        <td><span style={slotBadgeStyle(slot)}>Slot {slot}</span></td>
                        <td><span className="chip chip-green">{subject?.students.length ?? '?'} students</span></td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Conflict-free verification */}
      {algo?.conflictPairs && algo.conflictPairs.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <IconCheck size={16} color="var(--blue)" /> Conflict-Free Verification
            </div>
          </div>
          <div className="card-body">
            <div className="alert alert-success" style={{ marginBottom: 16 }}>
              <IconCheck size={15} />
              All {algo.conflictPairs.length} conflict pairs have been assigned different slots.
              No student has two exams at the same time.
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Subject A</th>
                    <th>Slot A</th>
                    <th>Subject B</th>
                    <th>Slot B</th>
                    <th>Same Slot?</th>
                  </tr>
                </thead>
                <tbody>
                  {algo.conflictPairs.map((pair, i) => {
                    const slotA = algo.assignment[pair.subjectA];
                    const slotB = algo.assignment[pair.subjectB];
                    const conflict = slotA === slotB;
                    return (
                      <tr key={i}>
                        <td><span className="chip chip-blue">{pair.subjectA}</span></td>
                        <td><span style={slotBadgeStyle(slotA)}>Slot {slotA}</span></td>
                        <td><span className="chip chip-blue">{pair.subjectB}</span></td>
                        <td><span style={slotBadgeStyle(slotB)}>Slot {slotB}</span></td>
                        <td>
                          {conflict
                            ? <span className="chip chip-red">Conflict</span>
                            : <span className="chip chip-green" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                <IconCheck size={11} color="var(--navy-mid)" /> OK
                              </span>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
