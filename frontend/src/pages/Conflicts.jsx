import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import ConflictGraph from '../components/ConflictGraph';
import { IconConflict, IconGraph, IconRefresh, IconBolt, IconBook, IconInfo, IconCheck } from '../components/Icons';

export default function Conflicts({ subjects, timetableResult }) {
  const [conflicts, setConflicts] = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  useEffect(() => { fetchConflicts(); }, [subjects]);

  async function fetchConflicts() {
    if (subjects.length === 0) {
      setConflicts({ adjacency: {}, conflictPairs: [] });
      return;
    }
    setLoading(true);
    try {
      const res = await api.getConflicts();
      setConflicts(res.data.data);
      setError('');
    } catch {
      setError('Failed to load conflict data.');
    } finally {
      setLoading(false);
    }
  }

  const assignment    = timetableResult?.algorithm?.assignment || null;
  const adjacency     = conflicts?.adjacency || {};
  const conflictPairs = conflicts?.conflictPairs || [];
  const subjectMap    = Object.fromEntries(subjects.map(s => [s.id, s]));

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Conflict Visualization</h1>
          <p>Subjects connected by an edge share common students and cannot be scheduled in the same slot.</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={fetchConflicts}>
          <IconRefresh size={14} /> Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <IconBolt size={15} /> {error}
        </div>
      )}

      {/* Summary pills */}
      <div className="info-row">
        <div className="info-pill">
          <IconConflict size={14} color="var(--blue)" />
          <strong>{conflictPairs.length}</strong> conflict pairs
        </div>
        <div className="info-pill">
          <IconBook size={14} color="var(--blue)" />
          <strong>{subjects.length}</strong> subjects (nodes)
        </div>
        <div className="info-pill">
          <IconInfo size={14} color="var(--blue)" />
          {assignment
            ? <><strong>Colored</strong> — slot assignments visible</>
            : <>Uncolored — generate timetable to see slots</>
          }
        </div>
      </div>

      {/* Graph card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div className="card-title">
            <IconGraph size={16} color="var(--blue)" />
            Conflict Graph
          </div>
          <span style={{ fontSize: '.78rem', color: 'var(--text-body)' }}>
            Nodes = subjects · Edges = shared students · Colors = exam slots
          </span>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <span>Building graph…</span>
            </div>
          ) : (
            <ConflictGraph subjects={subjects} adjacency={adjacency} assignment={assignment} />
          )}
        </div>
      </div>

      {/* Conflict pairs table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <IconBolt size={16} color="var(--blue)" />
            Conflict Pairs ({conflictPairs.length})
          </div>
        </div>
        <div className="table-wrap">
          {conflictPairs.length === 0 ? (
            <div className="empty-state">
              <div style={{ marginBottom: 12 }}>
                <IconCheck size={40} color="var(--text-muted)" />
              </div>
              <p>No conflicts detected. All subjects can share the same slot.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject A</th>
                  <th></th>
                  <th>Subject B</th>
                  <th>Common Students</th>
                  <th>Student IDs</th>
                </tr>
              </thead>
              <tbody>
                {conflictPairs.map((pair, i) => {
                  const sA = subjectMap[pair.subjectA];
                  const sB = subjectMap[pair.subjectB];
                  return (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{i + 1}</td>
                      <td>
                        <span className="chip chip-blue">{pair.subjectA}</span>
                        {sA && <span style={{ marginLeft: 7, fontSize: '.8rem', color: 'var(--text-body)' }}>{sA.name}</span>}
                      </td>
                      <td>
                        <span className="conflict-arrow" style={{ display: 'flex', justifyContent: 'center' }}>
                          <IconConflict size={15} color="var(--blue)" />
                        </span>
                      </td>
                      <td>
                        <span className="chip chip-blue">{pair.subjectB}</span>
                        {sB && <span style={{ marginLeft: 7, fontSize: '.8rem', color: 'var(--text-body)' }}>{sB.name}</span>}
                      </td>
                      <td><span className="chip chip-red">{pair.commonStudents.length}</span></td>
                      <td style={{ fontSize: '.75rem', color: 'var(--text-body)' }}>
                        {pair.commonStudents.slice(0, 8).join(', ')}
                        {pair.commonStudents.length > 8 && ` … +${pair.commonStudents.length - 8}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
