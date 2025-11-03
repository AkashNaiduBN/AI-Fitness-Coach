import Head from 'next/head'
import PlanForm from '../components/PlanForm'
import PlanDisplay from '../components/PlanDisplay'
import { useState } from 'react'

export default function Home() {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Head>
        <title>AI Fitness Coach — Mac Studio Edition</title>
        <meta name="description" content="AI-powered fitness assistant — personalized workout & diet plans." />
      </Head>

      <main className="container p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">AI Fitness Coach</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-4 rounded-xl shadow bg-white/5">
            <PlanForm setPlan={setPlan} setLoading={setLoading} />
          </div>
          <div className="card p-4 rounded-xl shadow bg-white/5">
            <PlanDisplay plan={plan} loading={loading} />
          </div>
        </div>
      </main>
    </>
  )
}
