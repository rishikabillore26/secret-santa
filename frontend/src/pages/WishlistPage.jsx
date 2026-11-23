import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChristmasLights from '../components/ChristmasLights';
import Snowfall from '../components/Snowfall';
import FestiveFooter from '../components/FestiveFooter';
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
      <ChristmasLights />
      <Snowfall />
      <Navbar />

      <main className="page-container">
        {/* Toast Notification */}
        {toast && (
          <div
            style={{
              position: 'fixed',
              top: '75px',
              right: '24px',
              background: '#ffffff',
              border: '2px solid var(--xmas-red)',
              borderRadius: '12px',
              padding: '12px 20px',
              boxShadow: '0 12px 30px rgba(194, 37, 43, 0.25)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'bounceDrop 0.4s ease'
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>🏷️</span>
            <span style={{ fontWeight: 600, color: 'var(--xmas-red-dark)' }}>{toast}</span>
          </div>
        )}

        {/* Santa Entrance Animation Banner */}
        <div className="santa-banner-box">
          <div className="santa-walker">
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="30" r="14" fill="#fecaca" />
              <path d="M36 26C38 12 60 12 64 26Z" fill="#c2252b" />
              <circle cx="68" cy="20" r="5" fill="#ffffff" />
              <path d="M40 32C42 46 58 46 60 32C56 42 44 42 40 32Z" fill="#ffffff" />
              <rect x="36" y="44" width="28" height="30" rx="8" fill="#c2252b" />
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
            <h2 style={{ fontFamily: 'var(--font-festive)', fontSize: '2rem', color: 'var(--xmas-red)' }}>
              My Christmas Wishlist 📜
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#4b5563' }}>
              Santa and your team are listening! Add the gifts you'd love to unwrap this year.
            </p>
          </div>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
            🎅 {error}
          </div>
        )}

        {/* Card Header & Add Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              Your Gift Wishes ({wishes.length})
            </span>
          </div>

          {/* Hide Add Wish button once 3 wishes exist (enforced on backend, no text about limit) */}
          {wishes.length < 3 && (
            <button
              type="button"
              onClick={handleOpenAdd}
              className="btn-festive btn-red btn-glow"
              style={{ fontSize: '1rem', padding: '10px 22px' }}
            >
              <span>+</span>
              <span>Add Wish 🎁</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="candy-spinner" />
        ) : wishes.length === 0 ? (
          <div className="festive-card" style={{ textAlign: 'center', padding: '52px 20px' }}>
            <div className="card-ribbon" />
            <div style={{ fontSize: '3.5rem', marginBottom: '14px' }}>🎁</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--xmas-red)', marginBottom: '8px' }}>
              No wishes yet, add your first one!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto 24px' }}>
              Tell your Secret Santa what makes you smile! Name the item, add an optional link and description.
            </p>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="btn-festive btn-green btn-glow"
              style={{ fontSize: '1rem', padding: '12px 28px' }}
            >
              + Create Your First Wish 🎄
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className={`gift-tag-card ${deletingId === wish.id ? 'card-deleting' : ''}`}
              >
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
                      <span>🔗 View Item Link</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>

                <div className="gift-tag-actions">
                  <button
                    onClick={() => handleOpenEdit(wish)}
                    className="btn-festive btn-outline-festive"
                    style={{ padding: '5px 12px', fontSize: '0.82rem' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleOpenDelete(wish)}
                    className="btn-festive"
                    style={{ background: '#fee2e2', color: '#991b1b', padding: '5px 12px', fontSize: '0.82rem' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <FestiveFooter />
      </main>

      <WishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWish}
        wishToEdit={wishToEdit}
      />

      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="Remove Gift Wish"
        message={`Are you sure you want to remove "${wishToDelete?.productName}" from your wishlist?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setWishToDelete(null);
        }}
        confirmText="Remove Wish"
        isDanger={true}
      />
    </>
  );
}
