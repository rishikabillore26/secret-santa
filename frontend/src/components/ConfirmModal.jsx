import React from 'react';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', isDanger = false, isLoading = false }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-content-animated festive-rath-modal" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-clean">
          <h3 className="modal-heading-text" style={{ color: isDanger ? '#f87171' : '#fef08a' }}>
            {title}
          </h3>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="modal-close-btn"
          >
            &times;
          </button>
        </div>

        <p style={{ margin: '14px 0 24px', color: '#cbd5e1', fontSize: '0.96rem', lineHeight: '1.6' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
