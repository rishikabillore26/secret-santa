import React, { useState, useEffect } from 'react';
import SantaRath from './SantaRath';

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
      <div className="modal-content-animated festive-rath-modal" onClick={(e) => e.stopPropagation()}>
        {/* Animated Mini Rath gliding along modal top */}
        <div className="modal-rath-flight-track">
          <SantaRath mode="mini" width={220} />
        </div>

        {/* Modal Header */}
        <div className="modal-header-clean">
          <div>
            <h3 className="modal-heading-text">
              {wishToEdit ? '✏️ Edit Christmas Wish' : '🎁 Add to Your Wishlist'}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.86rem', margin: '3px 0 0' }}>
              Load this gift onto Santa's Rath for your Secret Santa!
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="modal-error-banner">
            🎅 {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          <div className="form-group-clean">
            <label className="form-label-gold">
              Item Name *
            </label>
            <input
              type="text"
              className="form-control-rath"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Wireless Headphones, Wool Blanket, Coffee Tumbler..."
              maxLength={255}
              required
              autoFocus
            />
          </div>

          <div className="form-group-clean">
            <label className="form-label-gold">
              Product Link (optional)
            </label>
            <input
              type="url"
              className="form-control-rath"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              placeholder="https://amazon.com/... or store link"
              maxLength={1000}
            />
          </div>

          <div className="form-group-clean" style={{ marginBottom: '24px' }}>
            <label className="form-label-gold">
              Description / Notes (optional)
            </label>
            <textarea
              className="form-control-rath"
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Preferred color: Emerald green or Navy, Size L"
              maxLength={500}
              style={{ fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
              className="btn-festive btn-gold btn-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Packing into Rath...' : wishToEdit ? 'Save Changes' : 'Pack into Rath 🎁'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
