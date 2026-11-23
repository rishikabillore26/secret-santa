import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import FestiveFooter from '../components/FestiveFooter';
import SantaRath from '../components/SantaRath';
import AssignSantaModal from '../components/AssignSantaModal';
import { adminApi } from '../api/adminApi';

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSantaForModal, setSelectedSantaForModal] = useState(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  // Filter state: 'all', 'unassigned', 'assigned', 'submitted', 'pending'
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminApi.getDashboard();
      setDashboardData(data);
    } catch (err) {
      setError(err.message || 'Failed to load admin dashboard.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAssignModal = (employee) => {
    if (employee.assigned) return;
    setSelectedSantaForModal(employee);
  };

  const handleAssignedSuccess = () => {
    setToast('Secret Santa assigned successfully! 🎁');
    setTimeout(() => setToast(''), 3500);
    loadDashboard();
  };

  const employees = dashboardData?.employees || [];

  const counts = useMemo(() => {
    const total = employees.length;
    const assigned = employees.filter((e) => e.assigned).length;
    const unassigned = total - assigned;
    const submitted = employees.filter((e) => e.status === 'Submitted').length;
    const pending = total - submitted;
    return { total, assigned, unassigned, submitted, pending };
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    if (activeFilter === 'unassigned') {
      return employees.filter((e) => !e.assigned);
    }
    if (activeFilter === 'assigned') {
      return employees.filter((e) => e.assigned);
    }
    if (activeFilter === 'submitted') {
      return employees.filter((e) => e.status === 'Submitted');
    }
    if (activeFilter === 'pending') {
      return employees.filter((e) => e.status === 'Pending');
    }
    return employees;
  }, [employees, activeFilter]);

  return (
    <>
      <Navbar />

      <main className="page-container">
        {toast && (
          <div className="rath-toast-pill">
            <span style={{ fontSize: '1.2rem' }}>✨</span>
            <span>{toast}</span>
          </div>
        )}

        {/* Admin Rath Hero Banner */}
        <div className="festive-card rath-banner-card">
          <div className="rath-banner-left">
            <div className="pill-badge-gold">
              <span>👑 Administrator Portal</span>
            </div>
            <h2 className="festive-heading" style={{ fontSize: '2.1rem', margin: '8px 0 6px' }}>
              Secret Santa Control Center 🛷
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.98rem', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
              Pair office employees for the Secret Santa exchange. Santa's Rath will manage deliveries while keeping all pairs strictly confidential.
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

        {/* 5 Stats Cards Row */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <div className="stat-card" style={{ borderTop: '4px solid #38bdf8' }}>
            <div className="stat-title">Total Employees</div>
            <div className="stat-value" style={{ color: '#38bdf8' }}>{counts.total}</div>
          </div>
          <div className="stat-card" style={{ borderTop: '4px solid #ef4444', background: counts.unassigned > 0 ? 'rgba(239, 68, 68, 0.18)' : undefined }}>
            <div className="stat-title" style={{ color: '#fca5a5', fontWeight: 600 }}>🔔 Haven’t Assigned</div>
            <div className="stat-value red">{counts.unassigned}</div>
          </div>
          <div className="stat-card" style={{ borderTop: '4px solid #22c55e' }}>
            <div className="stat-title">Santas Assigned</div>
            <div className="stat-value green">{counts.assigned}</div>
          </div>
          <div className="stat-card" style={{ borderTop: '4px solid #22c55e' }}>
            <div className="stat-title">Wishlists Submitted</div>
            <div className="stat-value green">{counts.submitted}</div>
          </div>
          <div className="stat-card" style={{ borderTop: '4px solid #fbbf24' }}>
            <div className="stat-title">Wishlists Pending</div>
            <div className="stat-value" style={{ color: '#fbbf24' }}>{counts.pending}</div>
          </div>
        </div>

        {/* Employee List Section with Filter Buttons */}
        <section className="festive-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
            <div>
              <h3 className="festive-heading" style={{ fontSize: '1.45rem', margin: 0 }}>
                Office Employee Registry
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '4px 0 0' }}>
                Select an employee as Santa to assign their secret recipient
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              >
                All ({counts.total})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('unassigned')}
                className={`filter-tab ${activeFilter === 'unassigned' ? 'active alert' : ''}`}
              >
                🔔 Haven't Assigned ({counts.unassigned})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('assigned')}
                className={`filter-tab ${activeFilter === 'assigned' ? 'active' : ''}`}
              >
                ✓ Assigned ({counts.assigned})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('submitted')}
                className={`filter-tab ${activeFilter === 'submitted' ? 'active' : ''}`}
              >
                Submitted ({counts.submitted})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('pending')}
                className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
              >
                Pending ({counts.pending})
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="candy-spinner" />
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="empty-sub-box" style={{ padding: '36px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>❄️</div>
              <p style={{ fontWeight: 600, color: '#fef08a' }}>
                {activeFilter === 'unassigned'
                  ? 'All employees have been assigned a Secret Santa! 🎉'
                  : 'No employees match the selected filter.'}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>Employee Name</th>
                    <th>Wishlist Status</th>
                    <th>Secret Santa Status</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp, idx) => (
                    <tr key={emp.id}>
                      <td style={{ color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 600, color: '#f8fafc' }}>
                        🎁 {emp.name}
                      </td>
                      <td>
                        {emp.status === 'Submitted' ? (
                          <span className="chip chip-submitted">Submitted</span>
                        ) : (
                          <span className="chip chip-pending">Pending</span>
                        )}
                      </td>
                      <td>
                        {emp.assigned ? (
                          <span className="chip chip-assigned">Assigned ✓</span>
                        ) : (
                          <span className="chip chip-unassigned">
                            Not Assigned
                          </span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {emp.assigned ? (
                          <span className="assigned-status-badge">
                            Assigned ✓
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenAssignModal(emp)}
                            className="btn-festive btn-red btn-glow"
                            style={{ padding: '7px 18px', fontSize: '0.85rem' }}
                          >
                            <span>🛷 Secret Santa</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <FestiveFooter />
      </main>

      {/* Manual Selection Modal */}
      <AssignSantaModal
        isOpen={Boolean(selectedSantaForModal)}
        onClose={() => setSelectedSantaForModal(null)}
        employee={selectedSantaForModal}
        onAssigned={handleAssignedSuccess}
      />
    </>
  );
}
