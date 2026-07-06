interface MacroBarProps {
  label: string
  actual: number
  target: number
  unit?: string
  colorClass?: string
}

export default function MacroBar({ label, actual, target, unit = 'g', colorClass = 'bg-emerald-500' }: MacroBarProps) {
  const pct = target > 0 ? Math.min(100, (actual / target) * 100) : 0
  const overTarget = target > 0 && actual > target

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="tabular-nums text-slate-400">
          {Math.round(actual)} / {Math.round(target)} {unit}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full transition-all ${overTarget ? 'bg-amber-500' : colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
