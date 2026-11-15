
import { AlertTriangle, Clock, Bell } from 'lucide-react'

function RecentAlerts({ alerts = [] }) {
  return (
    <div className="recent-alerts-card">
      <div className="recent-alerts-header">
        <div>
          <h2>Recent Alerts</h2>
          <p>Latest detected environmental conditions</p>
        </div>

        <span className="alert-count">{alerts.length} alerts</span>
      </div>

      {alerts.length === 0 ? (
        <div className="empty-alerts">
          <Bell size={25} />
          <h3>Alert system integration pending</h3>
          <p>
            Alerts will appear here once the risk assessment
            and alert management module is connected.
          </p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map((alert) => (
            <div className="alert-row" key={alert.id}>
              <div className={`alert-icon ${alert.severity.toLowerCase()}`}>
                <AlertTriangle size={19} />
              </div>

              <div className="alert-information">
                <strong>{alert.title}</strong>
                <span>
                  {alert.labName} · {alert.sensor}
                </span>
                <small>
                  <Clock size={12} />
                  {new Date(alert.timestamp).toLocaleString()}
                </small>
              </div>

              <span className={`alert-severity ${alert.severity.toLowerCase()}`}>
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentAlerts
