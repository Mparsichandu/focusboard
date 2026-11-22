import React, { useState, useMemo } from 'react';
import { Layers, Clock, CheckCircle2, Plus } from 'lucide-react';
import { SAMPLE_TASKS } from './data/sampleTasks.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import FocusNotes from './components/FocusNotes.jsx';
import StatCard from './components/StatCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import FilterTabs from './components/FilterTabs.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', SAMPLE_TASKS);
  const [activeNav, setActiveNav] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Derived Statistics (never hardcoded)
  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, inProgress, completed, todo, completionRate };
  }, [tasks]);

  // Combined Search + Status + Priority Filter
  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch || task.title.toLowerCase().includes(normalizedSearch);
      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== '' || statusFilter !== 'All' || priorityFilter !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  // Create or Update Task
  const handleSaveTask = (taskPayload) => {
    if (taskPayload.id) {
      setTasks((prev) =>
        prev.map((item) =>
          item.id === taskPayload.id ? { ...item, ...taskPayload } : item
        )
      );
    } else {
      const newTask = {
        ...taskPayload,
        id: Date.now(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Inline Status Change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const navLabelMap = {
    overview: 'Overview',
    tasks: 'My tasks',
    calendar: 'Calendar',
    settings: 'Settings',
  };

  return (
    <div className="app-shell">
      <Sidebar activeNav={activeNav} onSelectNav={setActiveNav} />

      <div className="main-wrapper">
        <Header
          onOpenNewTask={openCreateModal}
          activeNavLabel={navLabelMap[activeNav] || 'Overview'}
        />

        <main className="dashboard-content">
          {/* 3-Slide Focus Notes Carousel */}
          <FocusNotes completionRate={stats.completionRate} />

          {/* Overview Statistics */}
          <section className="stats-section" aria-label="Task Overview Statistics">
            <h2 className="mobile-section-heading">Overview</h2>
            <div className="stats-grid">
              <StatCard
                label="Total tasks"
                value={stats.total}
                helper="Across all projects"
                icon={Layers}
              />
              <StatCard
                label="In progress"
                value={stats.inProgress}
                helper="Keep the momentum"
                icon={Clock}
              />
              <StatCard
                label="Completed"
                value={stats.completed}
                badgeText={`${stats.completionRate}%`}
                helper="Great work this week"
                icon={CheckCircle2}
                accentClass="stat-completed"
              />
            </div>
          </section>

          {/* My Tasks Section */}
          <section className="tasks-section" aria-label="My Tasks">
            <div className="tasks-section-header">
              <div>
                <h2 className="section-title">My tasks</h2>
                <p className="section-subtitle">
                  Manage and track everything in one place.
                </p>
              </div>

              <div className="tasks-header-actions">
                {hasActiveFilters && (
                  <button
                    type="button"
                    className="link-btn"
                    onClick={handleResetFilters}
                  >
                    View all tasks
                  </button>
                )}
                <button
                  type="button"
                  className="mobile-add-fab"
                  onClick={openCreateModal}
                  aria-label="Create new task"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <FilterTabs
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
              counts={stats}
              hasActiveFilters={hasActiveFilters}
              onResetFilters={handleResetFilters}
              searchBar={
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              }
            />

            <TaskList
              tasks={filteredTasks}
              onStatusChange={handleStatusChange}
              onEdit={openEditModal}
              onDelete={(task) => setTaskToDelete(task)}
              onResetFilters={hasActiveFilters ? handleResetFilters : null}
            />
          </section>
        </main>
      </div>

      {/* Reusable Create / Edit Task Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />

      {/* Delete Confirmation Dialog */}
      {taskToDelete && (
        <div
          className="modal-backdrop"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-desc"
          onClick={(e) => {
            if (e.target === e.currentTarget) setTaskToDelete(null);
          }}
        >
          <div className="modal-card confirm-modal">
            <h2 id="delete-dialog-title" className="modal-title">
              Delete task?
            </h2>
            <p id="delete-dialog-desc" className="confirm-text">
              Are you sure you want to delete{' '}
              <strong>&ldquo;{taskToDelete.title}&rdquo;</strong>? This action cannot
              be undone.
            </p>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setTaskToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleConfirmDelete}
              >
                Delete task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
