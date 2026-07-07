import { useState } from 'react'
import MealLogSection from '../components/MealLogSection'
import TrainingLogSection from '../components/TrainingLogSection'

type Tab = 'meal' | 'training'

export default function LogPage() {
  const [tab, setTab] = useState<Tab>('meal')

  return (
    <div className="space-y-5 px-4 py-5">
      <h1 className="text-lg font-bold">記録</h1>

      <div className="flex gap-2 rounded-lg bg-slate-900 p-1">
        <button
          type="button"
          onClick={() => setTab('meal')}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            tab === 'meal' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
          }`}
        >
          🍚 食事
        </button>
        <button
          type="button"
          onClick={() => setTab('training')}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            tab === 'training' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
          }`}
        >
          🏃 運動
        </button>
      </div>

      {tab === 'meal' ? <MealLogSection /> : <TrainingLogSection />}
    </div>
  )
}
