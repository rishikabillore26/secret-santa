import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FestiveFooter from '../components/FestiveFooter';
import SantaCap from '../components/SantaCap';
import JingleBell from '../components/JingleBell';
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

        {/* Santa Entrance Animation Banner */}
        <div className="santa-banner-box">
          <SantaCap size={36} className="card-corner-cap" />
          <div className="santa-walker">
            <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="30" r="14" fill="#fed7aa" />
              <path d="M36 26C38 12 60 12 64 26Z" fill="#dc2626" />
              <circle cx="68" cy="20" r="5" fill="#ffffff" />
              <path d="M40 32C42 46 58 46 60 32C56 42 44 42 40 32Z" fill="#ffffff" />
              <rect x="36" y="44" width="28" height="30" rx="8" fill="#dc2626" />
              <rect x="36" y="58" width="28" height="6" fill="#1f2937" />
              <rect x="47" y="56" width="6" height="10" stroke="#fbbf24" strokeWidth="2" fill="none" />
              <rect x="38" y="74" width="10" height="12" rx="4" fill="#1f2937" />
              <rect x="52" y="74" width="10" height="12" rx="4" fill="#1f2937" />
              <circle cx="28" cy="50" r="16" fill="#15803d" />
              <path d="M22 38L32 46" stroke="#fbbf24" strokeWidth="3" />
              <circle cx="68" cy="46" r="6" fill="#ffffff" />
              <path d="M68 42L76 34" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <JingleBell size={24} />
              <h2 style={{ fontFamily: 'var(--font-festive)', fontSize: '2.2rem', color: '#fef08a', margin: 0, textShadow: '0 0 12px rgba(251, 191, 36, 0.4)' }}>
                My Christmas Wishlist 📜
              </h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginTop: '4px', margin: 0 }}>
              Santa and your Secret Santa are listening! Add the gifts you'd love to unwrap this year.
            </p>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(153, 27, 27, 0.85)', border: '1px solid #ef4444', color: '#fee2e2', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
            🎅 {error}
          </div>
        )}

        {/* Card Header & Add Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fef08a', textShadow: '0 0 8px rgba(251, 191, 36, 0.3)' }}>
              Your Gift Wishes ({wishes.length})
            </span>
          </div>

          {/* Maximum 3 wishes constraint enforced in UI (hides once 3 exist) */}
          {wishes.length < 3 && (
            <button
              onClick={handleOpenAdd}
              className="btn-festive btn-red btn-glow"
              style={{ fontSize: '0.98rem', padding: '11px 24px' }}
            >
              <span>+ Add Wish</span>
              <span>🎁</span>
            </button>
          )}
        </div>

        {/* Wishlist Items List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div className="candy-spinner" />
          </div>
        ) : wishes.length === 0 ? (
          <div className="festive-card empty-wishlist-box" style={{ textAlign: 'center', padding: '54px 20px' }}>
            <SantaCap size={36} className="card-corner-cap" />
            <div style={{ fontSize: '3.6rem', marginBottom: '14px', animation: 'giftBounce 2.5s infinite ease-in-out' }}>
              🎁
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#fef08a', marginBottom: '8px' }}>
              No wishes yet, add your first one!
            </h3>
            <p style={{ color: '#cbd5e1', maxWidth: '440px', margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Tell your Secret Santa what makes you smile! It could be coffee beans, warm socks, gadgets, or books.
            </p>
            <button
              onClick={handleOpenAdd}
              className="btn-festive btn-green btn-glow"
              style={{ padding: '12px 28px', fontSize: '1rem' }}
            >
              <span>+ Create Your First Wish ✨</span>
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
