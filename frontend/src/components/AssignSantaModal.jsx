import React, { useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';

export default function AssignSantaModal({ isOpen, onClose, employee, onAssigned }) {
  const [candidates, setCandidates] = useState([]);
  const [selectedRecipientId, setSelectedRecipientId] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && employee) {
      loadCandidates();
    }
  }, [isOpen, employee]);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminApi.getCandidates(employee.id);
      setCandidates(data);
      if (data.length > 0) {
        setSelectedRecipientId(String(data[0].id));
      } else {
        setSelectedRecipientId('');
      }
    } catch (err) {
      setError(err.message || 'Failed to load eligible candidates.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !employee) return null;

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!selectedRecipientId) {
      setError('Please select an employee.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await adminApi.assignSanta(employee.id, parseInt(selectedRecipientId, 10));
      onAssigned();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save Secret Santa assignment.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content-animated">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>🎁</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--xmas-red)' }}>
              Secret Santa Assignment
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            &times;
          </button>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Choose who <strong>{employee.name}</strong> will give a Secret Santa gift to:
        </p>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div className="candy-spinner" />
        ) : candidates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 12px', background: '#fafaf9', borderRadius: '8px', border: '1px dashed #d1d5db' }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>🎄</div>
            <p style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>
              No available recipients
            </p>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              All other employees have already been selected as recipients for someone else!
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirm}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, marginBottom: '6px' }}>
                Select Gift Recipient:
              </label>
              <select
                className="form-control"
                value={selectedRecipientId}
                onChange={(e) => setSelectedRecipientId(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--border-light)', fontSize: '0.92rem' }}
                required
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#6b7280', background: '#f3f4f6', padding: '8px 12px', borderRadius: '6px', marginBottom: '20px' }}>
              ℹ️ <strong>Rules:</strong> The list excludes {employee.name} and any employee already selected by another Santa. A Santa can only be assigned once.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="btn-festive btn-outline-festive"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-festive btn-green"
                disabled={saving || !selectedRecipientId}
              >
                {saving ? 'Assigning...' : 'Confirm Assignment ✓'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
