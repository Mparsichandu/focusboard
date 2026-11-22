import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function TaskForm({ isOpen, onClose, onSave, initialTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (initialTask) {
        setTitle(initialTask.title || '');
        setDescription(initialTask.description || '');
        setCategory(initialTask.category || 'Design');
        setStatus(initialTask.status || 'To do');
        setPriority(initialTask.priority || 'Medium');
        setDueDate(initialTask.dueDate || '');
      } else {
        setTitle('');
        setDescription('');
        setCategory('Design');
        setStatus('To do');
        setPriority('Medium');
        setDueDate('2026-11-28');
      }
      setError('');
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 30);
    }
  }, [isOpen, initialTask]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title is required. Please enter a clear task name.');
      titleInputRef.current?.focus();
      return;
    }

    onSave({
      ...(initialTask ? { id: initialTask.id } : {}),
      title: trimmedTitle,
      description: description.trim(),
      category,
      status,
      priority,
      dueDate,
    });
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h2 id="task-modal-heading" className="modal-title">
              {initialTask ? 'Edit task' : 'Create new task'}
            </h2>
            <p className="modal-subtitle">
              Add clear details to stay on top of your work.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="modal-form">
          <div className="form-group">
            <label htmlFor="task-title-input" className="form-label">
              Task title <span className="required-star">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="task-title-input"
              type="text"
              className={`form-control ${error ? 'has-error' : ''}`}
              placeholder="e.g., Update landing page"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'title-error-msg' : undefined}
              required
            />
            {error && (
              <p id="title-error-msg" className="form-error-text" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="task-desc-input" className="form-label">
              Description
            </label>
            <textarea
              id="task-desc-input"
              className="form-control form-textarea"
              rows={3}
              placeholder="Add notes about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="task-status-select" className="form-label">
                Status
              </label>
              <select
                id="task-status-select"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-priority-select" className="form-label">
                Priority
              </label>
              <select
                id="task-priority-select"
                className="form-control"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="task-due-input" className="form-label">
                Due date
              </label>
              <input
                id="task-due-input"
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-category-select" className="form-label">
                Category
              </label>
              <select
                id="task-category-select"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Research">Research</option>
              </select>
            </div>
          </div>

          <p className="required-note">* Required field</p>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {initialTask ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
