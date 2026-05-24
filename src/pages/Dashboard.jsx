import { useMemo } from 'react'
import MetricCard from '../components/metrics/MetricCard'
import PipelineStages from '../components/pipeline/PipelineStages'
import TaskList from '../components/tasks/TaskList'

const stages = ['Prospecting', 'Outreach', 'Meeting set', 'Proposal', 'Closed won']

function Dashboard({ deals, tasks, activity, quota }) {
  const today = new Date().toISOString().slice(0, 10)
  const thisMonth = today.slice(0, 7)

  const todayActivity = useMemo(() => activity.filter(a => a.date === today), [activity, today])
  const monthActivity = useMemo(() => activity.filter(a => a.date?.slice(0, 7) === thisMonth), [activity, thisMonth])

  const todayCalls    = todayActivity.filter(a => a.type === 'Call').length
  const todayEmails   = todayActivity.filter(a => a.type === 'Email').length
  const monthMeetings = monthActivity.filter(a => a.type === 'Meeting' || a.type === 'Demo').length
  const meetingPct    = Math.min(Math.round((monthMeetings / quota.meetingGoal) * 100), 100)

  const openTasks     = tasks.filter(t => !t.done).length
  const overdueTasks  = tasks.filter(t => t.tag === 'Overdue' && !t.done).length

  const totalPipeline = deals.reduce((sum, d) => sum + (d.value || 0), 0)
  const hotDeals      = deals.filter(d => d.stage === 'Proposal' || d.stage === 'Meeting set')

  const metrics = [
    {
      label: 'Calls today',
      value: todayCalls,
      delta: todayCalls === 0 ? 'None logged yet' : `${todayCalls} logged`,
      positive: todayCalls > 0,
    },
    {
      label: 'Emails today',
      value: todayEmails,
      delta: todayEmails === 0 ? 'None logged yet' : `${todayEmails} logged`,
      positive: todayEmails > 0,
    },
    {
      label: 'Meetings this month',
      value: monthMeetings,
      delta: `${meetingPct}% of ${quota.meetingGoal} goal`,
      positive: meetingPct >= 50,
    },
    {
      label: 'Total pipeline',
      value: `$${(totalPipeline / 1000).toFixed(0)}k`,
      delta: `${deals.length} open deals`,
      positive: true,
    },
  ]

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-xl font-medium">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem' }}>
        {metrics.map(m => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {overdueTasks > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-sm">▼</span>
            <span className="text-sm text-red-700 font-medium">
              {overdueTasks} overdue {overdueTasks === 1 ? 'task' : 'tasks'} need attention
            </span>
          </div>
          <a href="/tasks" className="text-xs text-red-500 hover:text-red-700">View tasks →</a>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
        <PipelineStages deals={deals} />
        <TaskList tasks={tasks} setTasks={undefined} />
      </div>

      {hotDeals.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
            Hot deals — needs attention
          </div>
          {hotDeals.map(deal => (
            <div key={deal.id} className="flex items-center gap-4 px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{deal.company}</div>
                <div className="text-xs text-gray-400">{deal.contact}</div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700">{deal.stage}</span>
              <div className="text-sm font-medium">${deal.value.toLocaleString()}</div>
              {deal.lastContact >= 5 && (
                <span className="text-xs text-red-500 font-medium">{deal.lastContact}d no contact</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">Monthly quota</div>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${meetingPct}%`,
                background: meetingPct >= 100 ? '#16a34a' : meetingPct >= 50 ? '#2563eb' : '#f59e0b'
              }}
            />
          </div>
          <div className="text-sm font-medium shrink-0">{meetingPct}%</div>
          <div className="text-xs text-gray-400 shrink-0">{monthMeetings} / {quota.meetingGoal} meetings</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard