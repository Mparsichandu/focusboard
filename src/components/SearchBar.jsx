import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-input-wrap">
      <Search size={16} className="search-icon" aria-hidden="true" />
      <label htmlFor="task-search-input" className="sr-only">
        Search tasks by title
      </label>
      <input
        id="task-search-input"
        type="search"
        className="search-input"
        placeholder="Find a task..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
