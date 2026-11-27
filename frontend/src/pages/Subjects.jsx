import React, { useState } from 'react';
import { api } from '../utils/api';
import SubjectModal from '../components/SubjectModal';
import {
  IconPlus, IconEdit, IconTrash, IconRefresh, IconSearch,
  IconBook, IconCheck, IconWarning, IconInbox,
} from '../components/Icons';

export default function Subjects({ subjects, onRefresh }) {
  const [modalOpen, setModalOpen]       = useState(false);
  const [editSubject, setEditSubject]   = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch]   = useState('');

  function flash(msg, isError = false) {
    if (isError) { setError(msg); setSuccess(''); }
    else         { setSuccess(msg); setError(''); }
    setTimeout(() => { setError(''); setSuccess(''); }, 3500);
  }

  async function handleSave(data) {
    try {
      if (editSubject) {
        await api.updateSubject(data.id, { name: data.name, code: data.code, students: data.students });
        flash(`Subject "${data.name}" updated successfully.`);
      } else {
        await api.createSubject(data);
        flash(`Subject "${data.name}" added successfully.`);
      }
      setModalOpen(false);
      setEditSubject(null);
      onRefresh();
    } catch (err) {
      flash(err.response?.data?.error || 'Failed to save subject.', true);
    }
  }

  async function handleDelete(id) {
    try {
      await api.deleteSubject(id);
      flash('Subject deleted.');
      setDeleteConfirm(null);
      onRefresh();
    } catch (err) {
      flash(err.response?.data?.error || 'Delete failed.', true);
      setDeleteConfirm(null);
    }
  }

  async function handleReset() {
    if (!window.confirm('Reset all subjects to sample data? This cannot be undone.')) return;
    try {
      await api.resetSubjects();
      flash('Reset to sample data.');
      onRefresh();
    } catch {
      flash('Reset failed.', true);
    }
  }

  const filtered = subjects.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Subject Management</h1>
          <p>Add, edit, or remove examination subjects and manage student enrollments.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary btn-sm" onClick={handleReset}>
            <IconRefresh size={14} /> Reset to Sample Data
          </button>
          <button className="btn btn-primary" onClick={() => { setEditSubject(null); setModalOpen(true); }}>
            <IconPlus size={15} /> Add Subject
          </button>
        </div>
      </div>

      {error   && <div className="alert alert-error"><IconWarning size={15} /> {error}</div>}
      {success && <div className="alert alert-success"><IconCheck size={15} /> {success}</div>}

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <IconBook size={16} color="var(--blue)" />
            All Subjects ({subjects.length})
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: 10, pointerEvents: 'none' }}>
              <IconSearch size={14} color="var(--text-muted)" />
            </span>
            <input
              style={{ maxWidth: 220, paddingLeft: 32, fontSize: '.82rem' }}
              placeholder="Search subjects…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrap">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div style={{ marginBottom: 12 }}>
                <IconInbox size={40} color="var(--text-muted)" />
              </div>
              <p>No subjects found. Add one to get started.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject ID</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Enrolled Students</th>
                  <th>Student IDs (preview)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id}>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{i + 1}</td>
                    <td><span className="chip chip-blue">{s.id}</span></td>
                    <td>
                      <code style={{ fontSize: '.82rem', color: 'var(--text-heading)' }}>{s.code}</code>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{s.name}</td>
                    <td><span className="chip chip-green">{s.students.length} students</span></td>
                    <td style={{ fontSize: '.75rem', color: 'var(--text-body)', maxWidth: 240 }}>
                      {s.students.slice(0, 6).join(', ')}
                      {s.students.length > 6 && ` … +${s.students.length - 6} more`}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 7 }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => { setEditSubject(s); setModalOpen(true); }}
                        >
                          <IconEdit size={13} /> Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteConfirm(s)}
                        >
                          <IconTrash size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalOpen && (
        <SubjectModal
          subject={editSubject}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditSubject(null); }}
        />
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconTrash size={16} color="var(--danger)" /> Confirm Delete
              </div>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '.9rem', color: 'var(--text-body)' }}>
                Are you sure you want to delete <strong style={{ color: 'var(--text-heading)' }}>{deleteConfirm.name}</strong>?
                This will also remove it from any generated timetable.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.id)}>
                <IconTrash size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
