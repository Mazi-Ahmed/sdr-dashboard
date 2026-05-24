import { useState } from 'react'

const tagStyles = {
  Overdue:     'bg-red-50 text-red-700',
  Today:       'bg-blue-50 text-blue-700',
  'This week': 'bg-green-50 text-green-700',
}

function TaskList({ tasks = [], setTasks }) {
  function toggleTask(id) {
    if (!setTasks) return
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const visible = tasks.slice(0, 5)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">
        Tasks &amp; follow-ups
        <span className="ml-2 text-gray-300">({tasks.filter(t => !t.done).length} open)</span>
      </div>
      <div className="flex flex-col">
        {visible.length === 0 && (
          <div className="text-sm text-gray-400 py-4 text-center">No tasks yet</div>
        )}
        {visible.map(task => (
          <div key={task.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
            <input
              type="checkbox"
              checked={!!task.done}
              onChange={() => toggleTask(task.id)}
              className="w-4 h-4 accent-blue-600 cursor-pointer shrink-0"
            />
            <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-300' : 'text-gray-700'}`}>
              {task.text}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${tagStyles[task.tag]}`}>
              {task.tag}
            </span>
          </div>
        ))}
      </div>
      {tasks.length > 5 && (
        <a href="/tasks" className="text-xs text-blue-500 hover:text-blue-700 mt-3 block">
          View all {tasks.length} tasks →
        </a>
      )}
    </div>
  )
}

export default TaskList