
import {
  getDashboardLabs,
  getDashboardSource,
} from '../services/dashboardService'

import {
  getOverallStatus,
  getAlertsFromLabs,
} from '../utils/statusUtils'

import OverallSafetyStatus from '../components/OverallSafetyStatus'
import LabOverviewCard from '../components/LabOverviewCard'
import RecentAlerts from '../components/RecentAlerts'

import { Bell, Activity, Building2 } from 'lucide-react'

function Dashboard() {
  // Get laboratory data from the dashboard service
  const labs = getDashboardLabs()
  const dataSource = getDashboardSource()

  // Calculate overall safety status and alerts
  const overallStatus = getOverallStatus(labs)
  const alerts = getAlertsFromLabs(labs)

  // Calculate dashboard statistics
  const totalSensors = labs.reduce(
    (total, lab) => total + lab.sensorCount,
    0
  )

  const activeAlerts = alerts.length

  return (
    <section className="dashboard-content">

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Safety Overview</h2>
        <p>
          Monitor environmental conditions across your classrooms
          and laboratories.
        </p>
      </div>

      {/* Overall Safety Status */}
      <OverallSafetyStatus status={overallStatus} />

      {/* Overview Statistics */}
      <div className="overview-grid">

        <div className="overview-card">
          <div className="card-top">
            <span>MONITORED LABS</span>
            <Building2 size={19} />
          </div>
          <h2>{String(labs.length).padStart(2, '0')}</h2>
          <p>Laboratories configured for monitoring.</p>
        </div>

        <div className="overview-card">
          <div className="card-top">
            <span>TOTAL SENSORS</span>
            <Activity size={19} />
          </div>
          <h2>{String(totalSensors).padStart(2, '0')}</h2>
          <p>Sensors configured across both laboratories.</p>
        </div>

        <div className="overview-card">
          <div className="card-top">
            <span>ACTIVE ALERTS</span>
            <Bell size={19} />
          </div>
          <h2>{String(activeAlerts).padStart(2, '0')}</h2>
          <p>Alerts currently requiring attention.</p>
        </div>

      </div>

      {/* Laboratory Overview */}
      <div className="section-heading">
        <div>
          <h2>Laboratory Overview</h2>
          <p>Environmental monitoring by location</p>
        </div>
      </div>

      <div className="lab-grid">
        {labs.map((lab) => (
          <LabOverviewCard key={lab.id} lab={lab} />
        ))}
      </div>

      {/* Recent Alerts */}
      <RecentAlerts alerts={alerts} />

      {/* Demo Notice */}
      {dataSource === 'demo' && (
        <div className="demo-notice">
          <Activity size={17} />
          <span>
            Demonstration data only. Live sensor readings will be
            connected through the ESP32 and backend.
          </span>
        </div>
      )}

    </section>
  )
}

export default Dashboard
