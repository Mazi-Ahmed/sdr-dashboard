const stages = [
  { name: 'Prospecting', color: 'bg-blue-200' },
  { name: 'Outreach',    color: 'bg-blue-400' },
  { name: 'Meeting set', color: 'bg-green-400' },
  { name: 'Proposal',    color: 'bg-amber-400' },
  { name: 'Closed won',  color: 'bg-green-600' },
]

function PipelineStages({ deals = [] }) {
  const maxCount = Math.max(...stages.map(s => deals.filter(d => d.stage === s.name).length), 1)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">Pipeline by stage</div>
      <div className="flex flex-col gap-3">
        {stages.map(stage => {
          const count = deals.filter(d => d.stage === stage.name).length
          const value = deals.filter(d => d.stage === stage.name).reduce((s, d) => s + (d.value || 0), 0)
          const width = Math.round((count / maxCount) * 100)
          return (
            <div key={stage.name} className="flex items-center gap-3">
              <div className="w-24 text-sm text-gray-600 shrink-0">{stage.name}</div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${stage.color} transition-all`} style={{ width: `${width}%` }} />
              </div>
              <div className="text-sm font-medium w-6 text-center">{count}</div>
              <div className="text-sm text-gray-400 w-14 text-right">${(value / 1000).toFixed(0)}k</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PipelineStages