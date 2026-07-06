import { NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const NAV_ITEMS = [
  { to: '/', label: 'ホーム', icon: '🏠' },
  { to: '/log', label: '記録', icon: '📝' },
  { to: '/history', label: '履歴', icon: '📅' },
  { to: '/advice', label: 'AI相談', icon: '🤖' },
  { to: '/settings', label: '設定', icon: '⚙️' },
]

export default function Layout() {
  const profile = useAuthStore((s) => s.profile)

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <span className="text-lg font-bold tracking-tight text-emerald-400">FuuSpo</span>
        {profile && (
          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
            {profile.is_pro ? '⭐ Pro' : 'Free'}
          </span>
        )}
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md border-t border-slate-800 bg-slate-950/95 backdrop-blur">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs ${
                isActive ? 'text-emerald-400' : 'text-slate-500'
              }`
            }
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
