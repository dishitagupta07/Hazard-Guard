
import {
  Thermometer,
  Activity,
  Flame,
  Wind,
  CircleHelp,
} from 'lucide-react'

import {
  getLabStatus,
  getSensorStatus,
} from '../utils/statusUtils'

function LabOverviewCard({ lab }) {
  const status = getLabStatus(lab)

  const sensorIcons = {
    temperature: Thermometer,
    humidity: Activity,
    flame: Flame,
    presence: Activity,
    mq2: Wind,
    mq7: Wind,
  }

  function formatValue(sensor) {
    if (sensor.value === null || sensor.value === undefined) {
      return 'Unavailable'
    }

    if (sensor.id === 'flame') {
      return sensor.value ? 'Detected' : 'Not detected'
    }

    if (sensor.id === 'presence') {
      return sensor.value ? 'Present' : 'Not present'
    }

    return `${sensor.value} ${sensor.unit || ''}`.trim()
  }

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <div>
          <span className="lab-label">
            {lab.id.replace('_', ' ')}
          </span>
          <h3>{lab.name}</h3>
        </div>

        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="sensor-list">
        {lab.sensors.map((sensor) => {
          const Icon = sensorIcons[sensor.id] || CircleHelp
          const sensorStatus = getSensorStatus(sensor, lab.deviceOnline)

          return (
            <div className="sensor-row" key={sensor.id}>
              <div className="sensor-icon">
                <Icon size={18} />
              </div>

              <div className="sensor-info">
                <span>{sensor.name}</span>
                <strong>{formatValue(sensor)}</strong>
              </div>

              <span
                className={`sensor-indicator ${sensorStatus.toLowerCase()}`}
              >
                {sensorStatus}
              </span>
            </div>
          )
        })}
      </div>

      <div className="lab-footer">
        <span>{lab.sensorCount} sensors configured</span>

        <span>
          {lab.deviceOnline === null
            ? 'Demo mode'
            : lab.deviceOnline
              ? 'Device connected'
              : 'Device offline'}
        </span>
      </div>
    </div>
  )
}

export default LabOverviewCard
