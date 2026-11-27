import React, { useState, useEffect } from 'react';
import { IconEdit, IconPlus, IconSave, IconClose, IconWarning, IconUsers } from './Icons';

export default function SubjectModal({ subject, onSave, onClose }) {
  const isEdit = Boolean(subject);
  const [form, setForm] = useState({ id: '', name: '', code: '', studentsRaw: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (subject) {
      setForm({
        id: subject.id,
        name: subject.name,
        code: subject.code,
        studentsRaw: subject.students.join(', '),
      });
    }
  }, [subject]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { id, name, code, studentsRaw } = form;

    if (!id.trim() || !name.trim() || !code.trim()) {
      setError('Subject ID, Name, and Code are all required.');
      return;
    }

    const students = studentsRaw.split(/[\s,]+/).map(s => s.trim()).filter(Boolean);
    if (students.length === 0) {
      setError('Please enter at least one Student ID.');
      return;
    }

    const duplicates = students.filter((s, i) => students.indexOf(s) !== i);
    if (duplicates.length > 0) {
      setError(`Duplicate student IDs: ${[...new Set(duplicates)].join(', ')}`);
      return;
    }

    onSave({ id: id.trim(), name: name.trim(), code: code.trim(), students });
  }

  const studentCount = form.studentsRaw.split(/[\s,]+/).filter(Boolean).length;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {isEdit
              ? <><IconEdit size={16} color="var(--blue)" /> Edit Subject</>
              : <><IconPlus size={16} color="var(--blue)" /> Add New Subject</>
            }
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <IconClose size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="alert alert-error">
                <IconWarning size={16} /> {error}
              </div>
            )}
            <div className="form-row">
              <div className="form-group">
                <label>Subject ID *</label>
                <input
                  name="id"
                  value={form.id}
                  onChange={handleChange}
                  placeholder="e.g. CS101"
                  disabled={isEdit}
                  style={isEdit ? { opacity: 0.6 } : {}}
                />
              </div>
              <div className="form-group">
                <label>Subject Code *</label>
                <input
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="e.g. CS101"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: 14 }}>
              <label>Subject Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Introduction to Programming"
              />
            </div>

            <div className="form-group" style={{ marginTop: 14 }}>
              <label>Student IDs (comma or space separated) *</label>
              <textarea
                name="studentsRaw"
                value={form.studentsRaw}
                onChange={handleChange}
                placeholder="e.g. S01, S02, S03, S04"
                rows={4}
              />
              <span style={{
                fontSize: '.75rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                marginTop: 4,
              }}>
                <IconUsers size={13} color="var(--blue)" />
                {studentCount} student{studentCount !== 1 ? 's' : ''} entered
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit
                ? <><IconSave size={15} /> Save Changes</>
                : <><IconPlus size={15} /> Add Subject</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
