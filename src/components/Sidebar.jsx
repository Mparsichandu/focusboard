import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Settings, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, active: true },
  { id: 'tasks', label: 'My tasks', icon: CheckSquare, active: false },
  { id: 'calendar', label: 'Calendar', icon: Calendar, active: false },
  { id: 'settings', label: 'Settings', icon: Settings, active: false },
];

export default function Sidebar({ activeNav, onSelectNav }) {
  return (
    <>
      {/* Desktop / Tablet Sidebar */}
      <aside className="sidebar" aria-label="Workspace Navigation">
        <div className="sidebar-brand">
          <div className="brand-icon" aria-hidden="true">
            <Sparkles size={18} />
          </div>
          <span className="brand-name">FocusBoard</span>
        </div>

        <div className="sidebar-section-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-link ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelectNav(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation (390px) */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`mobile-nav-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelectNav(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label === 'My tasks' ? 'Tasks' : item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
