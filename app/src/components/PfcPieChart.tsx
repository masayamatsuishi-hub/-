import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { PfcCalorieBreakdown } from '../utils/nutrition'

const COLORS = { protein: '#34d399', fat: '#fbbf24', carbs: '#38bdf8' }

export default function PfcPieChart({ breakdown }: { breakdown: PfcCalorieBreakdown }) {
  const data = [
    { name: 'タンパク質', value: Math.round(breakdown.proteinKcal), color: COLORS.protein },
    { name: '脂質', value: Math.round(breakdown.fatKcal), color: COLORS.fat },
    { name: '炭水化物', value: Math.round(breakdown.carbsKcal), color: COLORS.carbs },
  ]

  const isEmpty = data.every((d) => d.value === 0)

  return (
    <div className="w-full">
      <div className="relative h-44 w-full">
        {isEmpty ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">まだ記録がありません</div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={2}>
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#f1f5f9' }}
                  formatter={(value, name) => [`${value} kcal`, name] as [string, string]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-slate-500">PFCバランス</span>
            </div>
          </>
        )}
      </div>
      <div className="mt-2 flex justify-center gap-4 text-xs">
        <span className="flex items-center gap-1 text-slate-300">
          <i className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.protein }} />
          P {breakdown.proteinPct.toFixed(0)}%
        </span>
        <span className="flex items-center gap-1 text-slate-300">
          <i className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.fat }} />
          F {breakdown.fatPct.toFixed(0)}%
        </span>
        <span className="flex items-center gap-1 text-slate-300">
          <i className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.carbs }} />
          C {breakdown.carbsPct.toFixed(0)}%
        </span>
      </div>
    </div>
  )
}
