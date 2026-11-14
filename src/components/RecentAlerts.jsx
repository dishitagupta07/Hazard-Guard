
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react'

function RecentAlerts({ alerts }) {
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
          <CheckCircle size={25} />
          <h3>No active alerts</h3>
          <p>All monitored sensors are currently within configured limits.</p>
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
