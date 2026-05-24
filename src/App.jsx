import { useLocalStorage } from './hooks/useLocalStorage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Pipeline from './pages/Pipeline'
import Tasks from './pages/Tasks'
import Activity from './pages/Activity'

const defaultDeals = [
  { id: 1, company: 'Acme Corp',          contact: 'Marco Rivera',    stage: 'Proposal',    value: 28000, lastContact: 3  },
  { id: 2, company: 'Globex Industries',  contact: 'Sara Nguyen',     stage: 'Meeting set', value: 19000, lastContact: 1  },
  { id: 3, company: 'Initech LLC',        contact: 'Paul Giamatti',   stage: 'Proposal',    value: 34000, lastContact: 12 },
  { id: 4, company: 'Umbrella Solutions', contact: 'Dana Park',       stage: 'Outreach',    value: 11000, lastContact: 2  },
  { id: 5, company: 'Hooli',             contact: 'Jared Dunn',      stage: 'Prospecting', value: 22000, lastContact: 5  },
]

const defaultTasks = [
  { id: 1, text: 'Follow up: Initech proposal',    company: 'Initech LLC',        due: '2026-05-23', tag: 'Overdue',   done: false },
  { id: 2, text: 'Call Marco @ Acme 2pm',          company: 'Acme Corp',          due: '2026-05-24', tag: 'Today',     done: false },
  { id: 3, text: 'Reply to Umbrella intro email',  company: 'Umbrella Solutions', due: '2026-05-24', tag: 'Today',     done: false },
  { id: 4, text: 'Book discovery call with Hooli', company: 'Hooli',              due: '2026-05-26', tag: 'This week', done: false },
]

function App() {
const [deals, setDeals] = useLocalStorage('sdr-deals', defaultDeals)
const [tasks, setTasks] = useLocalStorage('sdr-tasks', defaultTasks)
const [quota, setQuota] = useLocalStorage('sdr-quota', {
  meetingGoal: 30,
  revenueGoal: 50000,
})

const [activity, setActivity] = useLocalStorage('sdr-activity', [])

  function handleImport({ deals: newDeals, tasks: newTasks }) {
    if (newDeals?.length) setDeals(newDeals.map((d, i) => ({ ...d, id: Date.now() + i })))
    if (newTasks?.length) setTasks(newTasks.map((t, i) => ({ ...t, id: Date.now() + i, done: false })))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard deals={deals} tasks={tasks} activity={activity} quota={quota} />} />
          <Route path="pipeline" element={<Pipeline deals={deals} setDeals={setDeals} />} />
          <Route path="tasks" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
          <Route path="activity" element={<Activity activity={activity} setActivity={setActivity} quota={quota} setQuota={setQuota} deals={deals} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App