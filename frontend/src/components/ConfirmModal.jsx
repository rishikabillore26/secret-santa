import React from 'react';
import SantaCap from './SantaCap';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', isDanger = false, isLoading = false }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-content-animated festive-dark-modal" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <SantaCap size={32} className="modal-corner-cap" />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: isDanger ? '#f87171' : '#fef08a', margin: 0, textShadow: '0 0 10px rgba(251, 191, 36, 0.3)' }}>
            {title}
          </h3>
          <button
            onClick={onCancel}
            disabled={isLoading}
            style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer', color: '#e2e8f0' }}
          >
            &times;
          </button>
        </div>

        <p style={{ marginBottom: '24px', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            className="btn-festive btn-outline-festive"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className={isDanger ? 'btn-festive btn-red' : 'btn-festive btn-green'}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
