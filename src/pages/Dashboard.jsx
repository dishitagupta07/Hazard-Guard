
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import {
  getDashboardLabs,
  getDashboardSource,
} from '../services/dashboardService'

import OverallSafetyStatus from '../components/OverallSafetyStatus'
import LabOverviewCard from '../components/LabOverviewCard'
import RecentAlerts from '../components/RecentAlerts'

import { Bell, Activity, Building2 } from 'lucide-react'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

function Dashboard() {
  const [labs, setLabs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const dataSource = getDashboardSource()

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getDashboardLabs()

        const formattedLabs = data.labs.map((lab) => {
          const reading = data.latestReadings[lab.labId]

          const device = data.devices.find(
            (item) => item.labId === lab.labId
          )

          const sensors = [
            {
              id: 'temperature',
              name: 'Temperature (DHT22)',
              value: reading?.temperature ?? null,
              unit: '°C',
            },
            {
              id: 'humidity',
              name: 'Humidity (DHT22)',
              value: reading?.humidity ?? null,
              unit: '%',
            },
          ]

          if (lab.labId === 'LAB1') {
            sensors.push(
              {
                id: 'flame',
                name: 'Flame Sensor',
                value: reading?.flameDetected ?? null,
              },
              {
                id: 'presence',
                name: 'Human Presence (mmWave Radar)',
                value: reading?.humanDetected ?? null,
              }
            )
          }

          if (lab.labId === 'LAB2') {
            sensors.push(
              {
                id: 'mq2',
                name: 'MQ-2 Gas Sensor',
                value: reading?.mq2Raw ?? null,
                unit: 'raw',
              },
              {
                id: 'mq7',
                name: 'MQ-7 CO Sensor',
                value: reading?.mq7Raw ?? null,
                unit: 'raw',
              }
            )
          }

          return {
            id: lab.labId,
            name: lab.name,
            sensorCount: sensors.length,
            sensors,
            deviceOnline: device?.isOnline ?? false,
            lastUpdated: reading?.recordedAt ?? null,
          }
        })

        setLabs(formattedLabs)
      } catch (err) {
        console.error('Dashboard error:', err)
        setError(err.message || 'Unable to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()

    // Connect to backend Socket.IO server
    const socket = io(SOCKET_URL)

    // Update sensor values whenever new data arrives
    socket.on('newSensorReading', (reading) => {
      setLabs((previousLabs) =>
        previousLabs.map((lab) => {
          if (lab.id !== reading.labId) return lab

          const updatedValues = {
            temperature: reading.temperature,
            humidity: reading.humidity,
            flame: reading.flameDetected,
            presence: reading.humanDetected,
            mq2: reading.mq2Raw,
            mq7: reading.mq7Raw,
          }

          return {
            ...lab,
            lastUpdated: reading.recordedAt,
            sensors: lab.sensors.map((sensor) => {
              const newValue = updatedValues[sensor.id]

              return newValue !== undefined
                ? { ...sensor, value: newValue }
                : sensor
            }),
          }
        })
      )
    })

    // Update device online/offline status
    socket.on('deviceStatusUpdate', (device) => {
      setLabs((previousLabs) =>
        previousLabs.map((lab) =>
          lab.id === device.labId
            ? { ...lab, deviceOnline: device.isOnline }
            : lab
        )
      )
    })

    return () => {
      socket.off('newSensorReading')
      socket.off('deviceStatusUpdate')
      socket.disconnect()
    }
  }, [])

  if (loading) {
    return (
      <section className="dashboard-content">
        <h2>Loading dashboard...</h2>
      </section>
    )
  }

  if (error) {
    return (
      <section className="dashboard-content">
        <h2>Unable to load dashboard</h2>
        <p>{error}</p>
        <p>Check that your backend server is running.</p>
      </section>
    )
  }

  const totalSensors = labs.reduce(
    (total, lab) => total + lab.sensorCount,
    0
  )

  const activeAlerts = 0
  const overallStatus = 'Unknown'

  return (
    <section className="dashboard-content">
      <div className="welcome-section">
        <h2>Safety Overview</h2>
        <p>
          Monitor environmental conditions across your classrooms
          and laboratories.
        </p>
      </div>

      <OverallSafetyStatus status={overallStatus} />

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
          <p>Alert API integration pending.</p>
        </div>
      </div>

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

      <RecentAlerts alerts={[]} />

      {dataSource === 'live' && (
        <div className="demo-notice">
          <Activity size={17} />
          <span>
            Connected to the HAZARD GUARD backend. Safety
            assessments and alerts will be displayed when their
            backend APIs are integrated.
          </span>
        </div>
      )}
    </section>
  )
}

export default Dashboard
