import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FestiveFooter from '../components/FestiveFooter';
import JingleBell from '../components/JingleBell';
import RealisticSanta from '../components/RealisticSanta';
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
      showToast('Wish updated on Santa’s list! 🎁');
    } else {
      const created = await employeeApi.addWish(wishData);
      setWishes([...wishes, created]);
      showToast('New wish dropped under the tree! 🎄');
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
        showToast('Wish removed from your tag! ✨');
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
          <div
            style={{
              position: 'fixed',
              top: '75px',
              right: '24px',
              background: 'linear-gradient(135deg, rgba(22, 36, 60, 0.98), rgba(10, 18, 32, 0.98))',
              border: '2px solid #fbbf24',
              borderRadius: '12px',
              padding: '12px 20px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(251, 191, 36, 0.3)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'bounceDrop 0.4s ease'
            }}
          >
            <JingleBell size={22} />
            <span style={{ fontWeight: 600, color: '#fef08a' }}>{toast}</span>
          </div>
        )}

        {/* Santa & Christmas Tree Banner */}
        <div className="santa-banner-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <RealisticSanta pose="sitting" size={105} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <JingleBell size={26} />
                <h2 style={{ fontFamily: 'var(--font-festive)', fontSize: '2.3rem', color: '#fef08a', margin: 0, textShadow: '0 0 14px rgba(251, 191, 36, 0.45)' }}>
                  My Christmas Wishlist 📜
                </h2>
              </div>
              <p style={{ fontSize: '0.96rem', color: '#cbd5e1', marginTop: '6px', margin: 0 }}>
                Santa and your Secret Santa are listening! Add the gifts you'd love to unwrap this year.
              </p>
            </div>
          </div>

          <div style={{ marginRight: '10px' }}>
            <ChristmasTree size={120} />
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(153, 27, 27, 0.85)', border: '1px solid #ef4444', color: '#fee2e2', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
            🎅 {error}
          </div>
        )}

        {/* Card Header & Add Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fef08a', textShadow: '0 0 10px rgba(251, 191, 36, 0.35)' }}>
              Your Gift Wishes ({wishes.length} / 3)
            </span>
          </div>

          {/* Maximum 3 wishes constraint enforced in UI (hides once 3 exist) */}
          {wishes.length < 3 && (
            <button
              onClick={handleOpenAdd}
              className="btn-festive btn-red btn-glow"
              style={{ fontSize: '1rem', padding: '12px 26px' }}
            >
              <span>+ Add Wish</span>
              <span>🎁</span>
            </button>
          )}
        </div>

        {/* Wishlist Items List or Waiting Empty State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div className="candy-spinner" />
          </div>
        ) : wishes.length === 0 ? (
          /* SANTA SITTING DIRECTLY ABOVE "No wishes yet, add your first one!" WAITING */
          <div className="festive-card empty-wishlist-interactive-stage" style={{ textAlign: 'center', padding: '48px 24px 40px', position: 'relative' }}>
            <div className="card-ribbon" />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {/* Christmas Tree Beside Santa */}
              <div className="empty-state-tree">
                <ChristmasTree size={170} />
              </div>

              {/* Realistic Santa Sitting and Waiting with his scroll */}
              <div className="santa-perched-waiting-slot">
                <div className="santa-speech-bubble">
                  Ho Ho Ho! I'm waiting for your wish! 🎅✨
                </div>
                <RealisticSanta pose="waiting" size={150} />
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#fef08a', marginBottom: '10px', textShadow: '0 0 12px rgba(251, 191, 36, 0.4)' }}>
              No wishes yet, add your first one!
            </h3>
            <p style={{ color: '#cbd5e1', maxWidth: '500px', margin: '0 auto 26px', fontSize: '1rem', lineHeight: 1.6 }}>
              Santa is sitting by the tree checking his quill and list! Tell your Secret Santa what makes you smile: gadgets, warm hoodies, coffee, or books.
            </p>

            <button
              onClick={handleOpenAdd}
              className="btn-festive btn-green btn-glow"
              style={{ padding: '14px 34px', fontSize: '1.08rem' }}
            >
              <span>+ Create Your First Wish ✨🎁</span>
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
                      <span>🔗 View Item</span>
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

      {/* Add / Edit Wish Modal with Santa sitting on top of the title */}
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
        message={`Are you sure you want to remove "${wishToDelete?.productName}" from your Christmas wishlist?`}
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
