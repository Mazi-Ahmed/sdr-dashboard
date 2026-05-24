import MetricCard from '../components/metrics/MetricCard'
import PipelineStages from '../components/pipeline/PipelineStages'
import TaskList from '../components/tasks/TaskList'


const metrics = [
  { label: 'Calls today',     value: '12',  delta: '+3 vs avg',  positive: true },
  { label: 'Emails sent',     value: '34',  delta: '+8 vs avg',  positive: true },
  { label: 'Meetings booked', value: '2',   delta: 'Goal: 3',    positive: false },
  { label: 'Pipeline added',  value: '$19k', delta: '+$4k vs avg', positive: true },
]

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-xl font-medium">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Friday, May 24 · Week 18</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem' }}>
        {metrics.map(m => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
        <PipelineStages />
        <TaskList />
      </div>
    </div>
  )
}

export default Dashboard