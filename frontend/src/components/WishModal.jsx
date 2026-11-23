import React, { useState, useEffect } from 'react';
import SantaCap from './SantaCap';
import JingleBell from './JingleBell';

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
      <div className="modal-content-animated festive-dark-modal" onClick={(e) => e.stopPropagation()}>
        <SantaCap size={36} className="modal-corner-cap" />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <JingleBell size={26} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fef08a', margin: 0, textShadow: '0 0 10px rgba(251, 191, 36, 0.4)' }}>
              {wishToEdit ? 'Edit Christmas Wish' : 'Add to Your Wishlist'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={isSubmitting}
            style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', cursor: 'pointer', color: '#e2e8f0', transition: 'all 0.2s ease' }}
          >
            &times;
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(153, 27, 27, 0.85)', border: '1px solid #ef4444', color: '#fee2e2', padding: '10px 14px', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '16px' }}>
            🎅 {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px', color: '#fde68a' }}>
              Item Name *
            </label>
            <input
              type="text"
              className="form-control-festive"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Wireless Headphones, Warm Wool Scarf, Book..."
              maxLength={255}
              required
              autoFocus
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px', color: '#fde68a' }}>
              Product Link (optional)
            </label>
            <input
              type="url"
              className="form-control-festive"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              placeholder="https://example.com/item"
              maxLength={1000}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px', color: '#fde68a' }}>
              Description / Notes (optional)
            </label>
            <textarea
              className="form-control-festive"
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Preferred color is Forest Green or Navy Blue, Size M"
              maxLength={500}
              style={{ fontFamily: 'inherit' }}
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
              {isSubmitting ? 'Saving...' : wishToEdit ? 'Save Changes' : 'Add to Wishlist 🎁'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
