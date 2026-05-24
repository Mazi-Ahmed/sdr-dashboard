function MetricCard({ label, value, delta, positive }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
      <div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-medium">{value}</div>
      <div className={`text-xs ${positive ? 'text-green-600' : 'text-red-500'}`}>
        {positive ? '▲' : '▼'} {delta}
      </div>
    </div>
  )
}

export default MetricCard