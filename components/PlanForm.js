import { useState } from 'react'
import axios from 'axios'

export default function PlanForm({ setPlan, setLoading }) {
  const [form, setForm] = useState({
    name: '',
    age: 25,
    gender: 'Male',
    heightCm: 170,
    weightKg: 70,
    goal: 'Weight Loss',
    level: 'Beginner',
    location: 'Home',
    dietPref: 'Non-Veg',
    medical: ''
  })

  function onChange(e) {
    setForm(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setPlan(null)
    try {
      const res = await axios.post('/api/generate-plan', { user: form })
      setPlan(res.data)
    } catch (err) {
      alert('Failed to generate plan — check console for details.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm">Name</label>
        <input name="name" value={form.name} onChange={onChange} className="w-full mt-1 p-2 rounded bg-black/20" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Age</label>
          <input name="age" type="number" value={form.age} onChange={onChange} className="w-full mt-1 p-2 rounded bg-black/20" />
        </div>
        <div>
          <label className="block text-sm">Gender</label>
          <select name="gender" value={form.gender} onChange={onChange} className="w-full mt-1 p-2 rounded bg-black/20">
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Height (cm)</label>
          <input name="heightCm" type="number" value={form.heightCm} onChange={onChange} className="w-full mt-1 p-2 rounded bg-black/20" />
        </div>
        <div>
          <label className="block text-sm">Weight (kg)</label>
          <input name="weightKg" type="number" value={form.weightKg} onChange={onChange} className="w-full mt-1 p-2 rounded bg-black/20" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Fitness Goal</label>
          <select name="goal" value={form.goal} onChange={onChange} className="w-full mt-1 p-2 rounded bg-black/20">
            <option>Weight Loss</option><option>Muscle Gain</option><option>Maintenance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Level</label>
          <select name="level" value={form.level} onChange={onChange} className="w-full mt-1 p-2 rounded bg-black/20">
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Workout Location</label>
          <select name="location" value={form.location} onChange={onChange} className="w-full mt-1 p-2 rounded bg-black/20">
            <option>Home</option><option>Gym</option><option>Outdoor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Dietary Preference</label>
          <select name="dietPref" value={form.dietPref} onChange={onChange} className="w-full mt-1 p-2 rounded bg-black/20">
            <option>Non-Veg</option><option>Veg</option><option>Vegan</option><option>Keto</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm">Medical history / Notes (optional)</label>
        <textarea name="medical" value={form.medical} onChange={onChange} className="w-full mt-1 p-2 rounded bg-black/20" />
      </div>

      <div className="flex items-center gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-white text-black font-semibold">Generate Plan</button>
        <button type="button" onClick={() => { setForm({ name:'', age:25, gender:'Male', heightCm:170, weightKg:70, goal:'Weight Loss', level:'Beginner', location:'Home', dietPref:'Non-Veg', medical:'' })}} className="px-3 py-2 rounded border">Reset</button>
      </div>
    </form>
  )
}
