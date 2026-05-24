import { useState } from 'react'

const tagStyles = {
  Overdue:     'bg-red-50 text-red-700',
  Today:       'bg-blue-50 text-blue-700',
  'This week': 'bg-green-50 text-green-700',
}

const filters = ['All', 'Overdue', 'Today', 'This week']

function Tasks({ tasks, setTasks }) {
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [newTask, setNewTask] = useState({ text: '', company: '', due: '', tag: 'Today' })

  const filtered = filter === 'All' ? tasks : tasks.filter(t => t.tag === filter)
  const doneCount = tasks.filter(t => t.done).length

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function addTask() {
    if (!newTask.text) return
    setTasks(prev => [...prev, { ...newTask, id: Date.now(), done: false }])
    setNewTask({ text: '', company: '', due: '', tag: 'Today' })
    setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium">Tasks</h1>
          <p className="text-sm text-gray-400 mt-1">
            {doneCount} of {tasks.length} completed
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add task
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
          <div className="text-sm font-medium text-gray-700">New task</div>
          <input
            placeholder="Task description"
            value={newTask.text}
            onChange={e => setNewTask(p => ({ ...p, text: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem' }}>
            <input
              placeholder="Company"
              value={newTask.company}
              onChange={e => setNewTask(p => ({ ...p, company: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={newTask.due}
              onChange={e => setNewTask(p => ({ ...p, due: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <select
              value={newTask.tag}
              onChange={e => setNewTask(p => ({ ...p, tag: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              {filters.filter(f => f !== 'All').map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={addTask} className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save task</button>
            <button onClick={() => setShowForm(false)} className="text-sm px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            {f}
            {f !== 'All' && (
              <span className="ml-1 opacity-60">
                {tasks.filter(t => t.tag === f && !t.done).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-gray-400">No tasks here</div>
        )}
        {filtered.map((task, i) => (
          <div
            key={task.id}
            className={`flex items-center gap-4 px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0 ${task.done ? 'opacity-50' : ''}`}
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="w-4 h-4 accent-blue-600 cursor-pointer shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {task.text}
              </div>
              {task.company && (
                <div className="text-xs text-gray-400 mt-0.5">{task.company}</div>
              )}
            </div>
            {task.due && (
              <div className="text-xs text-gray-400 shrink-0">{task.due}</div>
            )}
            <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${tagStyles[task.tag]}`}>
              {task.tag}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-xs text-gray-300 hover:text-red-400 transition-colors shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks