import React from 'react'

export default function PlanDisplay({ plan, loading }) {
  if (loading) return <div>Generating plan — please wait...</div>
  if (!plan)
    return (
      <div className="opacity-80">
        Your personalized plan will appear here. Fill the form and click <strong>Generate Plan</strong>.
      </div>
    )

  const renderSection = (data) => {
    if (!data) return <p className="italic opacity-70">No data available</p>
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data)
        return (
          <pre className="whitespace-pre-wrap mt-2 bg-black/20 p-3 rounded text-sm">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        )
      } catch {
        return (
          <pre className="whitespace-pre-wrap mt-2 bg-black/20 p-3 rounded text-sm">
            {data}
          </pre>
        )
      }
    }
    return (
      <pre className="whitespace-pre-wrap mt-2 bg-black/20 p-3 rounded text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    )
  }

  const playTTS = async () => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `${plan.workout}\n${plan.diet}\n${plan.tips}` }),
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audio.play()
    } catch (err) {
      alert('TTS not configured or failed.')
      console.error(err)
    }
  }

  const generateImage = async () => {
    try {
      const res = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'A person following this workout plan' }),
      })
      const data = await res.json()
      if (data.imageUrl) window.open(data.imageUrl, '_blank')
      else alert('Image generation failed.')
    } catch (err) {
      alert('Image generation not configured or failed.')
      console.error(err)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Plan for {plan.user?.name || 'User'}</h2>

      <div className="mb-3">
        <strong>Workout Plan</strong>
        {renderSection(plan.workout)}
      </div>

      <div className="mb-3">
        <strong>Diet Plan</strong>
        {renderSection(plan.diet)}
      </div>

      <div className="mb-3">
        <strong>AI Tips</strong>
        {renderSection(plan.tips)}
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={playTTS} className="px-3 py-2 rounded border">
          Read Plan (TTS)
        </button>
        <button onClick={generateImage} className="px-3 py-2 rounded border">
          Generate Images
        </button>
      </div>
    </div>
  )
}
