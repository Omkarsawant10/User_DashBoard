import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 flex">
        <aside className="hidden md:block fixed left-0 top-0 h-screen w-72 p-6 border-r border-white/10 bg-white/5">
          <div className="mb-6">
            <div className="text-xl font-bold">User Insights</div>
            <div className="text-xs text-slate-400">User Dashboard</div>
          </div>
          <nav className="space-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`
              }
            >
              Users
            </NavLink>
          </nav>
        </aside>
        <main className="flex-1 ml-72 p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}
