import { useState } from 'react'

const initialTasks = [
  { id: 1, text: 'Follow up: Initech proposal', tag: 'Overdue' },
  { id: 2, text: 'Call Marco @ Acme 2pm', tag: 'Today' },
  { id: 3, text: 'Reply to Umbrella intro email', tag: 'Today' },
  { id: 4, text: 'Book discovery call with Hooli', tag: 'This week' },
]

const tagStyles = {
  Overdue: 'bg-red-50 text-red-700',
  Today: 'bg-blue-50 text-blue-700',
  'This week': 'bg-green-50 text-green-700',
}

function TaskList() {
  const [tasks, setTasks] = useState(initialTasks)

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">Tasks &amp; follow-ups</div>
      <div className="flex flex-col">
        {tasks.map(task => (
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
    </div>
  )
}

export default TaskList