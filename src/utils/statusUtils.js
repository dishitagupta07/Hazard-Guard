
export function getSensorStatus(sensor, deviceOnline = true) {
  // Never show an old reading as currently Normal or Critical
  // when the device is offline.
  if (!deviceOnline) return 'Unknown'

  if (!sensor || sensor.value === null || sensor.value === undefined) {
    return 'Unknown'
  }

  switch (sensor.id) {
    case 'flame':
      return sensor.value === true ? 'Critical' : 'Normal'

    case 'temperature':
      if (sensor.value >= 45) return 'Critical'
      if (sensor.value >= 35) return 'Warning'
      return 'Normal'

    case 'humidity':
      if (sensor.value >= 85 || sensor.value <= 20) return 'Warning'
      return 'Normal'

    case 'mq2':
    case 'mq7':
      if (sensor.value >= 800) return 'Critical'
      if (sensor.value >= 600) return 'Warning'
      return 'Normal'

    case 'presence':
      return 'Normal'

    default:
      return 'Unknown'
  }
}



export function getLabStatus(lab) {
  if (!lab.deviceOnline) return 'Unknown'

  const statuses = lab.sensors.map((sensor) =>
    getSensorStatus(sensor, lab.deviceOnline)
  )

  if (statuses.includes('Critical')) return 'Critical'
  if (statuses.includes('Warning')) return 'Warning'
  if (statuses.includes('Unknown')) return 'Unknown'

  return 'Normal'
}


export function getOverallStatus(labs) {
  const statuses = labs.map(getLabStatus)

  if (statuses.includes('Critical')) return 'Critical'
  if (statuses.includes('Warning')) return 'Warning'
  if (statuses.includes('Unknown')) return 'Unknown'

  return 'Normal'
}

export function getAlertsFromLabs(labs) {
  const alerts = []

  labs.forEach((lab) => {
    lab.sensors.forEach((sensor) => {
      const severity = getSensorStatus(sensor)

      if (severity === 'Normal' || severity === 'Unknown') {
        return
      }

      const titles = {
        flame: 'Flame detected',
        temperature: 'Abnormal temperature detected',
        humidity: 'Abnormal humidity detected',
        mq2: 'Elevated MQ-2 sensor reading',
        mq7: 'Elevated MQ-7 sensor reading',
      }

      alerts.push({
        id: `${lab.id}_${sensor.id}`,
        labId: lab.id,
        labName: lab.name,
        sensor: sensor.name,
        sensorId: sensor.id,
        title: titles[sensor.id] || `${sensor.name} condition detected`,
        severity,
        status: 'Active',
        timestamp: lab.lastUpdated,
      })
    })
  })

  return alerts.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )
}
