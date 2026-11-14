
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  ShieldQuestion,
} from 'lucide-react'

function OverallSafetyStatus({ status }) {
  const statusDetails = {
    Normal: {
      icon: ShieldCheck,
      message: 'All monitored conditions are within configured limits.',
    },

    Warning: {
      icon: ShieldAlert,
      message: 'Attention required. One or more sensors show unusual readings.',
    },

    Critical: {
      icon: ShieldX,
      message: 'Critical condition detected. Immediate attention required.',
    },

    Unknown: {
      icon: ShieldQuestion,
      message: 'Sensor data unavailable or incomplete. Check device connectivity.',
    },
  }

  const details = statusDetails[status] || statusDetails.Unknown
  const Icon = details.icon

  return (
    <div className={`safety-status ${status.toLowerCase()}`}>
      <div className="safety-icon">
        <Icon size={25} />
      </div>

      <div>
        <span className="safety-label">OVERALL SAFETY STATUS</span>
        <h2>{status}</h2>
        <p>{details.message}</p>
      </div>
    </div>
  )
}

export default OverallSafetyStatus
