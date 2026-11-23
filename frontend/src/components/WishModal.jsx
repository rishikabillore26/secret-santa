import React, { useState, useEffect } from 'react';

export default function WishModal({ isOpen, onClose, onSave, wishToEdit }) {
  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (wishToEdit) {
      setProductName(wishToEdit.productName || '');
      setProductUrl(wishToEdit.productUrl || '');
      setNote(wishToEdit.note || '');
    } else {
      setProductName('');
      setProductUrl('');
      setNote('');
    }
    setError('');
  }, [wishToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!productName.trim()) {
      setError('Please provide a name for your wish item.');
      return;
    }

    if (productUrl.trim() && !/^https?:\/\/.+/.test(productUrl.trim())) {
      setError('Product link must be a valid URL starting with http:// or https://');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({
        productName: productName.trim(),
        productUrl: productUrl.trim() || null,
        note: note.trim() || null
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save wish.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content-animated" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem' }}>🎁</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--xmas-red)' }}>
              {wishToEdit ? 'Edit Christmas Wish' : 'Add to Your Wishlist'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={isSubmitting}
            style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            &times;
          </button>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '16px' }}>
            🎅 {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px', color: '#1f2937' }}>
              Item Name *
            </label>
            <input
              type="text"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Wireless Noise-Cancelling Headphones"
              maxLength={255}
              required
              autoFocus
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--border-light)', fontSize: '0.92rem' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px', color: '#1f2937' }}>
              Product Link (optional)
            </label>
            <input
              type="url"
              className="form-control"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              placeholder="https://example.com/item"
              maxLength={1000}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--border-light)', fontSize: '0.92rem' }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px', color: '#1f2937' }}>
              Description / Notes (optional)
            </label>
            <textarea
              className="form-control"
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Preferred color is Forest Green or Navy Blue, Size M"
              maxLength={500}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--border-light)', fontSize: '0.92rem', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              className="btn-festive btn-outline-festive"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-festive btn-red btn-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : wishToEdit ? 'Save Changes' : 'Add to Wishlist 🎄'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
