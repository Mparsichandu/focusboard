import React from 'react';
import TaskCard from './TaskCard.jsx';
import { ClipboardList } from 'lucide-react';

export default function TaskList({ tasks, onStatusChange, onEdit, onDelete, onResetFilters }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state" role="status">
        <div className="empty-state-icon" aria-hidden="true">
          <ClipboardList size={26} />
        </div>
        <h3>No matching tasks found</h3>
        <p>Try adjusting your search keywords, status tab, or priority filter.</p>
        {onResetFilters && (
          <button type="button" className="btn-secondary" onClick={onResetFilters}>
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="task-list" role="list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
