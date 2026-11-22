import React from 'react';

const STATUS_OPTIONS = ['All', 'To do', 'In progress', 'Completed'];

export default function FilterTabs({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  counts,
  searchBar,
  onResetFilters,
  hasActiveFilters,
}) {
  return (
    <div className="filter-toolbar">
      <div className="status-tabs" role="tablist" aria-label="Filter tasks by status">
        {STATUS_OPTIONS.map((status) => {
          const isActive = statusFilter === status;
          const count =
            status === 'All'
              ? counts.total
              : status === 'To do'
              ? counts.todo
              : status === 'In progress'
              ? counts.inProgress
              : counts.completed;

          return (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-tab-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => onStatusChange(status)}
            >
              <span>{status}</span>
              <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="filter-right-controls">
        {searchBar}

        <div className="priority-select-wrap">
          <label htmlFor="priority-filter" className="sr-only">
            Filter by priority
          </label>
          <select
            id="priority-filter"
            className="priority-select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            <option value="All">Priority: All</option>
            <option value="High">Priority: High</option>
            <option value="Medium">Priority: Medium</option>
            <option value="Low">Priority: Low</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button type="button" className="btn-ghost-sm" onClick={onResetFilters}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
