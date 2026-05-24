import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', icon: '▦' },
  { to: '/pipeline', label: 'Pipeline', icon: '◈' },
  { to: '/tasks', label: 'Tasks', icon: '✓' },
  { to: '/activity', label: 'Activity',  icon: '◎' },
]

function Sidebar() {
  return (
    <div className="w-48 h-screen border-r border-gray-200 flex flex-col p-4 gap-1 shrink-0">
      <div className="text-base font-medium mb-6 px-3 pt-2">SDR Dashboard</div>
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
            }`
          }
        >
          <span className="text-base">{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar