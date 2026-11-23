import React, { useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';
import SantaRath from './SantaRath';

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
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-content-animated festive-rath-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-rath-flight-track">
          <SantaRath mode="mini" width={200} />
        </div>

        <div className="modal-header-clean">
          <div>
            <h3 className="modal-heading-text">
              🛷 Secret Santa Assignment
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.86rem', margin: '3px 0 0' }}>
              Select who <strong style={{ color: '#fef08a' }}>{employee.name}</strong> will be Santa for
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            disabled={saving}
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="modal-error-banner">
            🎅 {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <div className="candy-spinner" />
          </div>
        ) : candidates.length === 0 ? (
          <div className="empty-sub-box" style={{ textAlign: 'center', padding: '24px 16px', margin: '16px 0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎄</div>
            <p style={{ fontWeight: 600, color: '#fef08a', fontSize: '1rem' }}>
              No available recipients
            </p>
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', marginTop: '6px' }}>
              All other eligible employees have already been matched with another Santa!
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirm} style={{ marginTop: '16px' }}>
            <div className="form-group-clean">
              <label className="form-label-gold">
                Select Gift Recipient:
              </label>
              <select
                className="form-control-rath"
                value={selectedRecipientId}
                onChange={(e) => setSelectedRecipientId(e.target.value)}
                required
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id} style={{ background: '#0f172a', color: '#f8fafc' }}>
                    🎁 {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="rath-rules-pill">
              ℹ️ <strong>Confidential Assignment:</strong> Candidate list excludes {employee.name} and anyone already assigned. Assignments are permanent and confidential.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
