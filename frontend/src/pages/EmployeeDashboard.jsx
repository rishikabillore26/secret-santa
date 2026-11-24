import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FestiveFooter from '../components/FestiveFooter';
import SantaRath from '../components/SantaRath';
import RathDeliverySection from '../components/RathDeliverySection';
import { employeeApi } from '../api/employeeApi';
import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  const [status, setStatus] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await employeeApi.getStatus();
      setStatus(data);
    } catch (err) {
      setError(err.message || 'Failed to load employee status.');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchRecipient = async () => {
    try {
      setError('');
      const data = await employeeApi.getRecipient();
      setRecipient(data);
      return data;
    } catch (err) {
      setError(err.message || 'Could not reveal your Secret Santa recipient.');
      throw err;
    }
  };

  return (
    <>
      <Navbar />

      <main className="page-container">
        {error && (
          <div className="rath-error-card">
            🎅 {error}
          </div>
        )}

        {/* Quick Wishlist Banner with Santa's Rath Hero */}
        <div className="festive-card rath-banner-card">
          <div className="rath-banner-left">
            <div>
            </div>
            <h2 className="festive-heading" style={{ fontSize: '2.1rem', margin: '8px 0 6px' }}>
              Your Secret Santa Headquarters
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.98rem', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
              You currently have <strong style={{ color: '#fef08a' }}>{status?.wishCount ?? 0} of 3 wishes</strong> saved on your wishlist.
            </p>
            <div style={{ marginTop: '18px' }}>
              <Link to="/wishlist" className="btn-festive btn-red btn-glow" style={{ fontSize: '0.98rem', padding: '11px 26px' }}>
                <span>🎁 Open My Wishlist</span>
              </Link>
            </div>
          </div>

          <div className="rath-banner-right">
            <SantaRath mode="hero" width={320} />
          </div>
        </div>

        {/* Section: My Secret Santa Recipient featuring Santa's Rath Delivery */}
        <RathDeliverySection
          status={status}
          recipient={recipient}
          onReveal={handleFetchRecipient}
          loading={loading}
          error={error}
        />

        <FestiveFooter />
      </main>
    </>
  );
}
