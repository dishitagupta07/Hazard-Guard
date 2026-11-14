
import { useState } from 'react'
import {
  LayoutDashboard,
  Activity,
  History,
  Shield,
  Bell,
  ChevronRight,
} from 'lucide-react'

import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Live Monitoring', icon: Activity },
    { name: 'Alert History', icon: History },
  ]

  return (
    <div className="app-container">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">
            <Shield size={23} />
          </div>

          <div>
            <h2>HAZARD GUARD</h2>
            <p>Environmental Safety</p>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="section-label">MAIN MENU</p>

          <nav>
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <button
                  key={item.name}
                  className={`nav-item ${
                    activePage === item.name ? 'active' : ''
                  }`}
                  onClick={() => setActivePage(item.name)}
                >
                  <Icon size={19} />
                  <span>{item.name}</span>

                  {activePage === item.name && (
                    <ChevronRight size={16} className="nav-arrow" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-bottom">
          <div className="system-indicator">
            <span className="status-dot"></span>

            <div>
              <p>System Interface</p>
              <span>Development Mode</span>
            </div>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="topbar">

          <div className="page-heading">
            <p>HAZARD GUARD / OVERVIEW</p>
            <h1>{activePage}</h1>
          </div>

          <div className="topbar-right">

            <div className="environment-tag">
              <span className="status-dot"></span>
              Prototype
            </div>

            <button
              className="notification-button"
              onClick={() => setActivePage('Alert History')}
              title="View Alert History"
              aria-label="View Alert History"
            >
              <Bell size={19} />
            </button>

          </div>
        </header>

        {/* Page Rendering */}
        {activePage === 'Dashboard' && <Dashboard />}

        {activePage === 'Live Monitoring' && (
          <div className="placeholder-page">
            <Activity size={32} />
            <h2>Live Monitoring</h2>
            <p>
              Real-time sensor readings and graphs will appear here.
            </p>
          </div>
        )}

        {activePage === 'Alert History' && (
          <div className="placeholder-page">
            <History size={32} />
            <h2>Alert History</h2>
            <p>
              Active and previous safety alerts will appear here.
            </p>
          </div>
        )}

      </main>
    </div>
  )
}

export default App
