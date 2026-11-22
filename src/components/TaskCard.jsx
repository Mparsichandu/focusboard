import React from 'react';
import { Calendar, Pencil, Trash2, CheckCircle2, Circle, Clock } from 'lucide-react';

function formatDueDate(dateStr) {
  if (!dateStr) return 'No due date';
  const parsed = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const isCompleted = task.status === 'Completed';

  const getStatusClass = (status) => {
    if (status === 'Completed') return 'status-completed';
    if (status === 'In progress') return 'status-progress';
    return 'status-todo';
  };

  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'priority-high';
    if (priority === 'Medium') return 'priority-medium';
    return 'priority-low';
  };

  const toggleQuickComplete = () => {
    const nextStatus = isCompleted ? 'To do' : 'Completed';
    onStatusChange(task.id, nextStatus);
  };

  return (
    <article className={`task-row ${isCompleted ? 'is-completed' : ''}`}>
      <div className="task-row-main">
        <button
          type="button"
          className={`task-check-btn ${isCompleted ? 'checked' : ''}`}
          onClick={toggleQuickComplete}
          aria-label={
            isCompleted
              ? `Mark "${task.title}" as To do`
              : `Mark "${task.title}" as Completed`
          }
        >
          {isCompleted ? (
            <CheckCircle2 size={19} />
          ) : task.status === 'In progress' ? (
            <Clock size={19} />
          ) : (
            <Circle size={19} />
          )}
        </button>

        <div className="task-text-block">
          <h3 className="task-title">{task.title}</h3>
          {task.description && <p className="task-desc">{task.description}</p>}
        </div>
      </div>

      <div className="task-row-meta">
        <span className="badge badge-category">{task.category || 'General'}</span>

        <span className={`badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>

        <div className="task-status-control">
          <label htmlFor={`status-${task.id}`} className="sr-only">
            Status for {task.title}
          </label>
          <select
            id={`status-${task.id}`}
            className={`status-select ${getStatusClass(task.status)}`}
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <span className="task-due">
          <Calendar size={14} aria-hidden="true" />
          <span>{formatDueDate(task.dueDate)}</span>
        </span>

        <div className="task-actions">
          <button
            type="button"
            className="action-icon-btn"
            onClick={() => onEdit(task)}
            aria-label={`Edit task ${task.title}`}
            title="Edit task"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            className="action-icon-btn danger"
            onClick={() => onDelete(task)}
            aria-label={`Delete task ${task.title}`}
            title="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
