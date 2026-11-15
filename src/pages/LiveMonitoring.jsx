import { useState } from "react";

import {
  Thermometer,
  Droplets,
  Flame,
  Users,
  Wifi,
  Wind,
  Activity,
  Radio,
  ShieldCheck,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import {
  lab1Data,
  lab2Data,
  lab1ChartData,
  lab2ChartData,
} from "../data/mockData.js";

import "../styles/monitoring.css";


function MetricCard({ title, value, unit, icon: Icon, status }) {
  return (
    <div className="monitor-metric-card">

      <div className="monitor-metric-header">
        <span>{title}</span>
        <Icon size={21} />
      </div>

      <h2>
        {value} <small>{unit}</small>
      </h2>

      <span className={`monitor-status ${status.toLowerCase()}`}>
        <span className="status-dot"></span>
        {status}
      </span>

    </div>
  );
}


function SensorChart({ title, data, dataKey, unit, color }) {
  return (
    <div className="monitor-chart-card">

      <h3>{title}</h3>

      <ResponsiveContainer width="100%" height={260}>

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#263449"
          />

          <XAxis
            dataKey="time"
            stroke="#94A3B8"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            stroke="#94A3B8"
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#151F30",
              border: "1px solid #263449",
              borderRadius: "8px",
              color: "#F1F5F9",
            }}
            formatter={(value) => [`${value} ${unit}`, title]}
          />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}


function PresenceChart({ data }) {
  return (
    <div className="monitor-chart-card">

      <h3>Human Presence Timeline</h3>

      <ResponsiveContainer width="100%" height={260}>

        <AreaChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#263449"
          />

          <XAxis
            dataKey="time"
            stroke="#94A3B8"
          />

          <YAxis
            domain={[0, 1]}
            ticks={[0, 1]}
            tickFormatter={(value) =>
              value === 1 ? "Present" : "Absent"
            }
            stroke="#94A3B8"
          />

          <Tooltip
            formatter={(value) =>
              [value === 1 ? "Present" : "Absent", "Occupancy"]
            }
          />

          <Area
            type="stepAfter"
            dataKey="occupancy"
            stroke="#22D3EE"
            fill="#22D3EE"
            fillOpacity={0.2}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}


function LiveMonitoring() {

  const [selectedLab, setSelectedLab] = useState("Lab 1");

  const isLab1 = selectedLab === "Lab 1";

  const sensorData = isLab1 ? lab1Data : lab2Data;

  const chartData = isLab1
    ? lab1ChartData
    : lab2ChartData;


  return (

    <div className="monitoring-page">

      {/* PAGE HEADER */}

      <div className="monitor-page-header">

        <div>
          <h1>Live Monitoring</h1>

          <p>
            Real-time environmental monitoring and sensor analytics
          </p>
        </div>

        <div className="monitor-connection">

          <Wifi size={18} />

          <span>ESP32 {sensorData.esp32Status}</span>

          <span className="connection-indicator"></span>

        </div>

      </div>


      {/* LAB TABS */}

      <div className="monitor-lab-tabs">

        <button
          className={isLab1 ? "selected" : ""}
          onClick={() => setSelectedLab("Lab 1")}
        >
          LAB 1
        </button>

        <button
          className={!isLab1 ? "selected" : ""}
          onClick={() => setSelectedLab("Lab 2")}
        >
          LAB 2
        </button>

      </div>


      {/* SENSOR OVERVIEW */}

      <div className="monitor-section-heading">

        <div>
          <h2>{selectedLab} Overview</h2>
          <p>Current environmental sensor readings</p>
        </div>

        <span className="live-indicator">
          <span></span> LIVE DATA
        </span>

      </div>


      <div className="monitor-metrics-grid">

        <MetricCard
          title="Temperature"
          value={sensorData.temperature}
          unit="°C"
          icon={Thermometer}
          status="Normal"
        />

        <MetricCard
          title="Humidity"
          value={sensorData.humidity}
          unit="%"
          icon={Droplets}
          status="Normal"
        />


        {isLab1 ? (

          <>

            <MetricCard
              title="Flame Sensor"
              value={sensorData.flame ? "Detected" : "Not Detected"}
              unit=""
              icon={Flame}
              status={sensorData.flame ? "Critical" : "Normal"}
            />

            <MetricCard
              title="Human Presence"
              value={sensorData.humanPresence ? "Present" : "Absent"}
              unit=""
              icon={Users}
              status="Normal"
            />

          </>

        ) : (

          <>

            <MetricCard
              title="MQ-2 Smoke Reading"
              value={sensorData.mq2}
              unit="ADC"
              icon={Wind}
              status="Normal"
            />

            <MetricCard
              title="MQ-7 CO Reading"
              value={sensorData.mq7}
              unit="ADC"
              icon={Activity}
              status="Normal"
            />

          </>

        )}

      </div>


      {/* ANALYTICS */}

      <div className="monitor-section-heading">

        <div>
          <h2>Sensor Analytics</h2>
          <p>Historical sensor readings over time</p>
        </div>

        <span className="chart-label">
          Historical Data
        </span>

      </div>


      <div className="monitor-charts-grid">

        <SensorChart
          title="Temperature vs Time"
          data={chartData}
          dataKey="temperature"
          unit="°C"
          color="#22D3EE"
        />

        <SensorChart
          title="Humidity vs Time"
          data={chartData}
          dataKey="humidity"
          unit="%"
          color="#22C55E"
        />


        {isLab1 ? (

          <PresenceChart data={chartData} />

        ) : (

          <>

            <SensorChart
              title="MQ-2 Smoke Sensor Reading"
              data={chartData}
              dataKey="mq2"
              unit="ADC"
              color="#F59E0B"
            />

            <SensorChart
              title="MQ-7 CO Sensor Reading"
              data={chartData}
              dataKey="mq7"
              unit="ADC"
              color="#EF4444"
            />

          </>

        )}

      </div>


      {/* FLAME STATUS PANEL */}

      {isLab1 && (

        <div className="monitor-flame-panel">

          <div className="flame-panel-icon">
            <Flame size={27} />
          </div>

          <div className="flame-panel-content">

            <h3>Fire Safety Status</h3>

            <p>
              {sensorData.flame
                ? "Warning! Flame detected inside Lab 1."
                : "No flame detected. No fire indication from the sensor."}
            </p>

          </div>

          <span className={sensorData.flame ? "critical" : "normal"}>
            {sensorData.flame ? "CRITICAL" : "NORMAL"}
          </span>

        </div>

      )}


      {/* FOOTER STATUS */}

      <div className="monitor-footer">

        <ShieldCheck size={18} />

        <span>
          {selectedLab} monitoring system
        </span>

        <span className="monitor-footer-status">
          Device {sensorData.esp32Status}
        </span>

      </div>

    </div>

  );

}

export default LiveMonitoring;