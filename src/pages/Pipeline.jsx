import { useState } from 'react'

const stageStyles = {
  'Prospecting': 'bg-blue-50 text-blue-700',
  'Outreach':    'bg-purple-50 text-purple-700',
  'Meeting set': 'bg-green-50 text-green-700',
  'Proposal':    'bg-amber-50 text-amber-700',
  'Closed won':  'bg-green-100 text-green-800',
  'Closed lost': 'bg-red-50 text-red-700',
}

const stages = ['All', 'Prospecting', 'Outreach', 'Meeting set', 'Proposal', 'Closed won']

function AgingBadge({ days }) {
  if (days >= 10) return <span className="text-xs font-medium text-red-600">{days}d !</span>
  if (days >= 5)  return <span className="text-xs text-amber-500">{days}d</span>
  return <span className="text-xs text-gray-400">{days}d</span>
}

function Pipeline({ deals, setDeals }) {
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [newDeal, setNewDeal] = useState({ company: '', contact: '', stage: 'Prospecting', value: '' })

  const filtered = filter === 'All' ? deals : deals.filter(d => d.stage === filter)

  const totalValue = filtered.reduce((sum, d) => sum + d.value, 0)

  function addDeal() {
    if (!newDeal.company ) return
    setDeals(prev => [...prev, { ...newDeal, id: Date.now(), value: Number(newDeal.value), lastContact: 0 }])
    setNewDeal({ company: '', contact: '', stage: 'Prospecting', value: '' })
    setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium">Pipeline</h1>
          <p className="text-sm text-gray-400 mt-1">{filtered.length} deals · ${totalValue.toLocaleString()} total value</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add deal
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
          <div className="text-sm font-medium text-gray-700">New deal</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '0.75rem' }}>
            <input
              placeholder="Company"
              value={newDeal.company}
              onChange={e => setNewDeal(p => ({ ...p, company: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <input
              placeholder="Contact name"
              value={newDeal.contact}
              onChange={e => setNewDeal(p => ({ ...p, contact: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <select
              value={newDeal.stage}
              onChange={e => setNewDeal(p => ({ ...p, stage: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              {stages.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
            </select>
            <input
              placeholder="Value e.g. 15000"
              value={newDeal.value}
              onChange={e => setNewDeal(p => ({ ...p, value: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={addDeal} className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save deal</button>
            <button onClick={() => setShowForm(false)} className="text-sm px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {stages.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filter === s
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
              <th className="text-left px-5 py-3 w-40">Company</th>
              <th className="text-left px-5 py-3 w-36">Contact</th>
              <th className="text-left px-5 py-3 w-32">Stage</th>
              <th className="text-right px-5 py-3 w-28">Value</th>
              <th className="text-right px-5 py-3 w-24">Last contact</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(deal => (
              <tr key={deal.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                <td className="px-5 py-3 font-medium text-gray-800">{deal.company}</td>
                <td className="px-5 py-3 text-gray-500">{deal.contact}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${stageStyles[deal.stage]}`}>
                    {deal.stage}
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-medium">${deal.value.toLocaleString()}</td>
                <td className="px-5 py-3 text-right"><AgingBadge days={deal.lastContact} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Pipeline