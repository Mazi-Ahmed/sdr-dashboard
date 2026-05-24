const stages = [
  { name: 'Prospecting', count: 24, value: '$48k', color: 'bg-blue-200', width: 'w-full' },
  { name: 'Outreach',    count: 18, value: '$62k', color: 'bg-blue-400', width: 'w-3/4' },
  { name: 'Meeting set', count: 9,  value: '$81k', color: 'bg-green-400', width: 'w-1/2' },
  { name: 'Proposal',    count: 5,  value: '$74k', color: 'bg-amber-400', width: 'w-1/3' },
  { name: 'Closed won',  count: 3,  value: '$22k', color: 'bg-green-600', width: 'w-1/4' },
]

function PipelineStages() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">Pipeline by stage</div>
      <div className="flex flex-col gap-3">
        {stages.map(stage => (
          <div key={stage.name} className="flex items-center gap-3">
            <div className="w-24 text-sm text-gray-600 shrink-0">{stage.name}</div>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${stage.color} ${stage.width}`} />
            </div>
            <div className="text-sm font-medium w-8 text-center">{stage.count}</div>
            <div className="text-sm text-gray-400 w-12 text-right">{stage.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PipelineStages