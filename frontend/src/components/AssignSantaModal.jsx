import React, { useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';
import SantaCap from './SantaCap';
import JingleBell from './JingleBell';

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
      <div className="modal-content-animated festive-dark-modal" onClick={(e) => e.stopPropagation()}>
        <SantaCap size={36} className="modal-corner-cap" />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <JingleBell size={26} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#fef08a', margin: 0, textShadow: '0 0 10px rgba(251, 191, 36, 0.4)' }}>
              Secret Santa Assignment
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', cursor: 'pointer', color: '#e2e8f0' }}
          >
            &times;
          </button>
        </div>

        <p style={{ fontSize: '0.94rem', color: '#cbd5e1', marginBottom: '18px', lineHeight: 1.5 }}>
          Choose who <strong style={{ color: '#fef08a' }}>{employee.name}</strong> will be Secret Santa for:
        </p>

        {error && (
          <div style={{ background: 'rgba(153, 27, 27, 0.85)', border: '1px solid #ef4444', color: '#fee2e2', padding: '10px 14px', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '16px' }}>
            🎅 {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <div className="candy-spinner" />
          </div>
        ) : candidates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 16px', background: 'rgba(30, 48, 77, 0.7)', borderRadius: '12px', border: '1.5px dashed rgba(251, 191, 36, 0.4)', marginBottom: '16px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎄</div>
            <p style={{ fontWeight: 600, color: '#fef08a', fontSize: '1rem' }}>
              No available recipients
            </p>
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', marginTop: '6px' }}>
              All other eligible employees have already been matched with another Santa!
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirm}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px', color: '#fde68a' }}>
                Select Gift Recipient:
              </label>
              <select
                className="form-control-festive"
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

            <div style={{ fontSize: '0.82rem', color: '#94a3b8', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px 14px', borderRadius: '8px', marginBottom: '22px', lineHeight: 1.5 }}>
              ℹ️ <strong>Rules:</strong> The list excludes {employee.name} and anyone already selected by another Santa. A Santa can only be assigned once.
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
