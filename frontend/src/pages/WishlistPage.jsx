import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FestiveFooter from '../components/FestiveFooter';
import SantaRath from '../components/SantaRath';
import ChristmasTree from '../components/ChristmasTree';
import WishModal from '../components/WishModal';
import ConfirmModal from '../components/ConfirmModal';
import { employeeApi } from '../api/employeeApi';

export default function WishlistPage() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishToEdit, setWishToEdit] = useState(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [wishToDelete, setWishToDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await employeeApi.getWishes();
      setWishes(data);
    } catch (err) {
      setError(err.message || 'Failed to load your wishlist.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setWishToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (wish) => {
    setWishToEdit(wish);
    setIsModalOpen(true);
  };

  const handleSaveWish = async (wishData) => {
    if (wishToEdit) {
      const updated = await employeeApi.updateWish(wishToEdit.id, wishData);
      setWishes(wishes.map((w) => (w.id === updated.id ? updated : w)));
      showToast('Wish updated on Santa’s Rath! 🎁');
    } else {
      const created = await employeeApi.addWish(wishData);
      setWishes([...wishes, created]);
      showToast('New wish packed onto Santa’s Rath! 🎄');
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleOpenDelete = (wish) => {
    setWishToDelete(wish);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!wishToDelete) return;
    try {
      setDeletingId(wishToDelete.id);
      await employeeApi.deleteWish(wishToDelete.id);
      setTimeout(() => {
        setWishes(wishes.filter((w) => w.id !== wishToDelete.id));
        setDeletingId(null);
        setDeleteConfirmOpen(false);
        setWishToDelete(null);
        showToast('Wish removed from your list! ✨');
      }, 400);
    } catch (err) {
      setError(err.message || 'Failed to delete wish.');
      setDeletingId(null);
    }
  };

  return (
    <>
      <Navbar />

      <main className="page-container">
        {/* Toast Notification */}
        {toast && (
          <div className="rath-toast-pill">
            <span style={{ fontSize: '1.2rem' }}>✨</span>
            <span>{toast}</span>
          </div>
        )}

        {/* Santa's Rath Hero Banner */}
        <div className="festive-card rath-banner-card">
          <div className="rath-banner-left">
            <div className="pill-badge-gold">
              <span>🛷 Holiday Gift Registry</span>
            </div>
            <h2 className="festive-heading" style={{ fontSize: '2.1rem', margin: '8px 0 6px' }}>
              My Christmas Wishlist 📜
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.98rem', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
              Add up to 3 gifts you'd love to unwrap this holiday season. Santa's Rath will deliver your list to your Secret Santa!
            </p>
          </div>

          <div className="rath-banner-right">
            <SantaRath mode="hero" width={320} />
          </div>
        </div>

        {error && (
          <div className="rath-error-card">
            🎅 {error}
          </div>
        )}

        {/* Wishlist Header & Add Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fef08a' }}>
              Your Gift Wishes
            </span>
            <span className="count-pill">
              {wishes.length} / 3
            </span>
          </div>

          {/* Maximum 3 wishes constraint enforced in UI (hides once 3 exist) */}
          {wishes.length < 3 && (
            <button
              onClick={handleOpenAdd}
              className="btn-festive btn-red btn-glow"
              style={{ fontSize: '0.98rem', padding: '11px 24px' }}
            >
              <span>+ Add Wish to Rath</span>
              <span>🎁</span>
            </button>
          )}
        </div>

        {/* Wishlist Items List or Waiting Empty State with Rath & Tree */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div className="candy-spinner" />
          </div>
        ) : wishes.length === 0 ? (
          /* EMPTY STATE WITH RATH AND TREE */
          <div className="festive-card rath-empty-state">
            <div className="empty-rath-scene">
              <div className="tree-col">
                <ChristmasTree size={160} />
              </div>
              <div className="rath-col">
                <SantaRath mode="hero" width={360} />
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', color: '#fef08a', marginBottom: '8px' }}>
              No wishes on Santa’s Rath yet!
            </h3>
            <p style={{ color: '#cbd5e1', maxWidth: '480px', margin: '0 auto 26px', fontSize: '1rem', lineHeight: 1.6 }}>
              Tell your Secret Santa what you'd love to unwrap this year: coffee beans, warm socks, gadgets, books or games!
            </p>

            <button
              onClick={handleOpenAdd}
              className="btn-festive btn-gold btn-glow"
              style={{ padding: '13px 34px', fontSize: '1.05rem' }}
            >
              <span>+ Add Your First Wish to Rath ✨🎁</span>
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishes.map((wish, index) => (
              <div
                key={wish.id}
                className={`gift-tag-card ${deletingId === wish.id ? 'card-deleting' : ''}`}
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <div className="gift-tag-ribbon-seal" />
                <div>
                  <div className="gift-tag-hole" aria-hidden="true" />
                  <h4 className="gift-tag-title">{wish.productName}</h4>

                  {wish.note && (
                    <p className="gift-tag-note">
                      "{wish.note}"
                    </p>
                  )}

                  {wish.productUrl && (
                    <a
                      href={wish.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gift-tag-link"
                    >
                      <span>🔗 View Store Link</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>

                <div className="gift-tag-actions">
                  <button
                    onClick={() => handleOpenEdit(wish)}
                    className="btn-tag-action btn-edit"
                    title="Edit Wish"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleOpenDelete(wish)}
                    className="btn-tag-action btn-delete"
                    title="Delete Wish"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <FestiveFooter />
      </main>

      {/* Add / Edit Wish Modal */}
      <WishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWish}
        wishToEdit={wishToEdit}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="Remove Gift Wish?"
        message={`Are you sure you want to remove "${wishToDelete?.productName}" from Santa's Rath?`}
        confirmText="Remove Wish"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setWishToDelete(null);
        }}
      />
    </>
  );
}
