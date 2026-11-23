import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import ChristmasLights from '../components/ChristmasLights';
import Snowfall from '../components/Snowfall';
import FestiveFooter from '../components/FestiveFooter';
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
      <ChristmasLights />
      <Snowfall />
      <Navbar />

      <main className="page-container">
        {toast && (
          <div
            style={{
              position: 'fixed',
              top: '75px',
              right: '24px',
              background: '#ffffff',
              border: '2px solid var(--xmas-green)',
              borderRadius: '12px',
              padding: '12px 20px',
              boxShadow: '0 12px 30px rgba(26, 111, 59, 0.25)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'bounceDrop 0.4s ease'
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>🏷️</span>
            <span style={{ fontWeight: 600, color: 'var(--xmas-green-dark)' }}>{toast}</span>
          </div>
        )}

        <div className="festive-card">
          <div className="card-ribbon" />
          <h2 className="festive-heading">Administrator Dashboard 🎅</h2>
          <p className="festive-sub" style={{ marginBottom: 0 }}>
            Pair employees for the office Secret Santa exchange. Pairings and wishlist details remain strictly confidential.
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
            🎅 {error}
          </div>
        )}

        {/* 5 Stats Cards Row including Unassigned count */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <div className="stat-card" style={{ borderTop: '4px solid #3b82f6' }}>
            <div className="stat-title">Total Employees</div>
            <div className="stat-value">{counts.total}</div>
          </div>
          <div className="stat-card" style={{ borderTop: '4px solid #ef4444', background: counts.unassigned > 0 ? '#fff5f5' : '#ffffff' }}>
            <div className="stat-title" style={{ color: '#b91c1c', fontWeight: 600 }}>🔔 Haven’t Assigned</div>
            <div className="stat-value red">{counts.unassigned}</div>
          </div>
          <div className="stat-card" style={{ borderTop: '4px solid var(--xmas-green)' }}>
            <div className="stat-title">Santas Assigned</div>
            <div className="stat-value green">{counts.assigned}</div>
          </div>
          <div className="stat-card" style={{ borderTop: '4px solid var(--xmas-green)' }}>
            <div className="stat-title">Wishlists Submitted</div>
            <div className="stat-value green">{counts.submitted}</div>
          </div>
          <div className="stat-card" style={{ borderTop: '4px solid var(--xmas-gold)' }}>
            <div className="stat-title">Wishlists Pending</div>
            <div className="stat-value" style={{ color: 'var(--xmas-gold)' }}>{counts.pending}</div>
          </div>
        </div>

        {/* Employee List Section with Filter Buttons */}
        <section className="festive-card">
          <div className="card-ribbon" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
            <h3 className="festive-heading" style={{ fontSize: '1.4rem', margin: 0 }}>
              Office Employees List
            </h3>

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

          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '18px' }}>
            Click <strong>Secret Santa</strong> next to any unassigned employee to select their recipient. Candidates exclude the Santa and anyone already chosen as a recipient.
          </p>

          {loading ? (
            <div className="candy-spinner" />
          ) : filteredEmployees.length === 0 ? (
            <div className="empty-box" style={{ padding: '36px 16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>❄️</div>
              <p style={{ fontWeight: 600, color: 'var(--text-dark)' }}>
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
                      <td>{idx + 1}</td>
                      <td style={{ fontWeight: 600, color: '#111827' }}>{emp.name}</td>
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
                          <button
                            className="btn-festive"
                            style={{
                              background: '#fef3c7',
                              color: '#92400e',
                              fontSize: '0.82rem',
                              padding: '5px 14px',
                              cursor: 'default',
                              border: '1px solid #fde68a'
                            }}
                            disabled
                          >
                            Assigned ✓
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenAssignModal(emp)}
                            className="btn-festive btn-red btn-glow"
                            style={{ padding: '6px 16px', fontSize: '0.84rem' }}
                          >
                            🎅 Secret Santa
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

      <AssignSantaModal
        isOpen={!!selectedSantaForModal}
        onClose={() => setSelectedSantaForModal(null)}
        employee={selectedSantaForModal}
        onAssigned={handleAssignedSuccess}
      />
    </>
  );
}
