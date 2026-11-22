import React from 'react';

export default function StatCard({ label, value, helper, icon: Icon, badgeText, accentClass }) {
  return (
    <article className={`stat-card ${accentClass || ''}`}>
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        <div className="stat-icon-wrap" aria-hidden="true">
          <Icon size={16} />
        </div>
      </div>

      <div className="stat-value-row">
        <strong className="stat-value">{value}</strong>
        {badgeText && <span className="stat-pill">{badgeText}</span>}
      </div>

      <p className="stat-helper">{helper}</p>
    </article>
  );
}
