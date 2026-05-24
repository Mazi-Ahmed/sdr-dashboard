import { useState } from 'react'

const activityTypes = ['Call', 'Email', 'LinkedIn', 'Meeting', 'Demo', 'Follow-up']

const typeStyles = {
  'Call':      'bg-blue-50 text-blue-700',
  'Email':     'bg-purple-50 text-purple-700',
  'LinkedIn':  'bg-sky-50 text-sky-700',
  'Meeting':   'bg-green-50 text-green-700',
  'Demo':      'bg-amber-50 text-amber-700',
  'Follow-up': 'bg-orange-50 text-orange-700',
}

function Activity({ activity, setActivity, quota, setQuota, deals }) {
  const [showLog, setShowLog] = useState(false)
  const [showQuota, setShowQuota] = useState(false)
  const [newEntry, setNewEntry] = useState({ type: 'Call', company: '', notes: '', date: new Date().toISOString().slice(0, 10) })
  const [quotaEdit, setQuotaEdit] = useState(quota)

  const today = new Date().toISOString().slice(0, 10)
  const todayActivity = activity.filter(a => a.date === today)
  const monthActivity = activity.filter(a => a.date?.slice(0, 7) === today.slice(0, 7))

  const counts = (arr) => activityTypes.reduce((acc, t) => {
    acc[t] = arr.filter(a => a.type === t).length
    return acc
  }, {})

  const todayCounts = counts(todayActivity)
  const monthCounts = counts(monthActivity)

  const meetingsThisMonth = monthCounts['Meeting'] + monthCounts['Demo']
  const meetingPct = Math.min(Math.round((meetingsThisMonth / quota.meetingGoal) * 100), 100)

  function logActivity() {
    if (!newEntry.company) return
    setActivity(prev => [{ ...newEntry, id: Date.now() }, ...prev])
    setNewEntry({ type: 'Call', company: '', notes: '', date: today })
    setShowLog(false)
  }

  function saveQuota() {
    setQuota({ meetingGoal: Number(quotaEdit.meetingGoal), revenueGoal: Number(quotaEdit.revenueGoal) })
    setShowQuota(false)
  }

  function deleteEntry(id) {
    setActivity(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium">Activity</h1>
          <p className="text-sm text-gray-400 mt-1">{todayActivity.length} logged today · {monthActivity.length} this month</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowQuota(!showQuota)}
            className="text-sm px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"
          >
            Set quota
          </button>
          <button
            onClick={() => setShowLog(!showLog)}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Log activity
          </button>
        </div>
      </div>

      {showQuota && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
          <div className="text-sm font-medium text-gray-700">Monthly quota targets</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' }}>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Meetings booked goal</label>
              <input
                type="number"
                value={quotaEdit.meetingGoal}
                onChange={e => setQuotaEdit(p => ({ ...p, meetingGoal: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Revenue goal ($)</label>
              <input
                type="number"
                value={quotaEdit.revenueGoal}
                onChange={e => setQuotaEdit(p => ({ ...p, revenueGoal: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={saveQuota} className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
            <button onClick={() => setShowQuota(false)} className="text-sm px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      {showLog && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
          <div className="text-sm font-medium text-gray-700">Log activity</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem' }}>
            <select
              value={newEntry.type}
              onChange={e => setNewEntry(p => ({ ...p, type: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              {activityTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <input
              placeholder="Company"
              value={newEntry.company}
              onChange={e => setNewEntry(p => ({ ...p, company: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={newEntry.date}
              onChange={e => setNewEntry(p => ({ ...p, date: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <input
            placeholder="Notes (optional)"
            value={newEntry.notes}
            onChange={e => setNewEntry(p => ({ ...p, notes: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
          />
          <div className="flex gap-2">
            <button onClick={logActivity} className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
            <button onClick={() => setShowLog(false)} className="text-sm px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
          <div className="text-xs text-gray-400 uppercase tracking-wide">Quota progress</div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Meetings booked</span>
                <span className="font-medium">{meetingsThisMonth} / {quota.meetingGoal}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${meetingPct}%` }} />
              </div>
              <div className="text-xs text-gray-400 mt-1">{meetingPct}% of monthly goal</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
          <div className="text-xs text-gray-400 uppercase tracking-wide">Today's activity</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.5rem' }}>
            {activityTypes.map(t => (
              <div key={t} className="flex flex-col gap-0.5">
                <div className="text-lg font-medium">{todayCounts[t]}</div>
                <div className="text-xs text-gray-400">{t}s</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
        <div className="text-xs text-gray-400 uppercase tracking-wide">This month</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: '0.5rem' }}>
          {activityTypes.map(t => (
            <div key={t} className="flex flex-col gap-1">
              <div className="text-xl font-medium">{monthCounts[t]}</div>
              <div className="text-xs text-gray-400">{t}s</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
          Activity log
        </div>
        {activity.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-gray-400">No activity logged yet</div>
        )}
        {activity.map(entry => (
          <div key={entry.id} className="flex items-center gap-4 px-5 py-3 border-b border-gray-50 hover:bg-gray-50 last:border-0">
            <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${typeStyles[entry.type]}`}>{entry.type}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800">{entry.company}</div>
              {entry.notes && <div className="text-xs text-gray-400 mt-0.5">{entry.notes}</div>}
            </div>
            <div className="text-xs text-gray-400 shrink-0">{entry.date}</div>
            <button
              onClick={() => deleteEntry(entry.id)}
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

export default Activity