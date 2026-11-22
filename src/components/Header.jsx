import React from 'react';
import { Bell, Plus, Sparkles } from 'lucide-react';

export default function Header({ onOpenNewTask, activeNavLabel }) {
  return (
    <>
      {/* Top Workspace Bar */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="mobile-brand">
            <div className="brand-icon small" aria-hidden="true">
              <Sparkles size={14} />
            </div>
            <span className="brand-name">FocusBoard</span>
          </div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span className="breadcrumb-muted">Workspace</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{activeNavLabel}</span>
          </nav>
        </div>

        <div className="topbar-right">
          <button
            type="button"
            className="icon-circle-btn"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={17} />
          </button>
          <div className="avatar-badge" aria-label="User Profile" title="Workspace Member">
            FB
          </div>
        </div>
      </header>

      {/* Hero Greeting & Primary CTA */}
      <section className="hero-header">
        <div>
          <h1 className="hero-title">Your work, in focus.</h1>
          <p className="hero-subtitle">
            Plan your day, stay organized, and celebrate small wins.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary desktop-new-task-btn"
          onClick={onOpenNewTask}
        >
          <Plus size={16} aria-hidden="true" />
          <span>New task</span>
        </button>
      </section>
    </>
  );
}
