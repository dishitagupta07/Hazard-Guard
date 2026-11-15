
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import {
  Thermometer,
  Droplets,
  Flame,
  Users,
  Wifi,
  Wind,
  Activity,
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

import { apiRequest } from "../services/api";
import "../styles/monitoring.css";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

function MetricCard({ title, value, unit, icon: Icon, status }) {
  return (
    <div className="monitor-metric-card">
      <div className="monitor-metric-header">
        <span>{title}</span>
        <Icon size={21} />
      </div>

      <h2>
        {value ?? "—"} <small>{unit}</small>
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
          <CartesianGrid strokeDasharray="3 3" stroke="#263449" />

          <XAxis dataKey="time" stroke="#94A3B8" tick={{ fontSize: 12 }} />

          <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} />

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
            connectNulls={false}
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
          <CartesianGrid strokeDasharray="3 3" stroke="#263449" />

          <XAxis dataKey="time" stroke="#94A3B8" />

          <YAxis
            domain={[0, 1]}
            ticks={[0, 1]}
            tickFormatter={(value) => value === 1 ? "Present" : "Absent"}
            stroke="#94A3B8"
          />

          <Tooltip
            formatter={(value) => [
              value === 1 ? "Present" : "Absent",
              "Occupancy",
            ]}
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

function formatChartData(readings, labId) {
  return readings.map((reading) => ({
    time: new Date(reading.recordedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: reading.temperature,
    humidity: reading.humidity,
    occupancy: reading.humanDetected === null
      ? null
      : reading.humanDetected ? 1 : 0,
    mq2: reading.mq2Raw,
    mq7: reading.mq7Raw,
  }));
}

function LiveMonitoring() {
  const [selectedLab, setSelectedLab] = useState("LAB1");
  const [readings, setReadings] = useState({ LAB1: null, LAB2: null });
  const [chartData, setChartData] = useState({ LAB1: [], LAB2: [] });
  const [deviceStatus, setDeviceStatus] = useState({
    LAB1: false,
    LAB2: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadLabData = async (labId) => {
      const [latestResponse, historyResponse] = await Promise.all([
        apiRequest(`/sensors/latest/${labId}`),
        apiRequest(`/sensors/history/${labId}?limit=50`),
      ]);

      if (!mounted) return;

      setReadings((previous) => ({
        ...previous,
        [labId]: latestResponse.data,
      }));

      setChartData((previous) => ({
        ...previous,
        [labId]: formatChartData(historyResponse.data || [], labId),
      }));
    };

    const loadAllData = async () => {
      try {
        setLoading(true);
        setError("");

        const summaryResponse = await apiRequest("/dashboard/summary");

        if (!mounted) return;

        const devices = summaryResponse.data.devices || [];

        setDeviceStatus({
          LAB1: devices.some((d) => d.labId === "LAB1" && d.isOnline),
          LAB2: devices.some((d) => d.labId === "LAB2" && d.isOnline),
        });

        await Promise.all([
          loadLabData("LAB1"),
          loadLabData("LAB2"),
        ]);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadAllData();

    const socket = io(SOCKET_URL);

    socket.on("newSensorReading", (reading) => {
      if (!mounted || !reading?.labId) return;

      const labId = reading.labId;

      if (labId !== "LAB1" && labId !== "LAB2") return;

      setReadings((previous) => ({
        ...previous,
        [labId]: reading,
      }));

      setChartData((previous) => ({
        ...previous,
        [labId]: [
          ...previous[labId],
          ...formatChartData([reading], labId),
        ].slice(-50),
      }));

      setDeviceStatus((previous) => ({
        ...previous,
        [labId]: true,
      }));
    });

    socket.on("deviceStatusUpdate", (device) => {
      if (!mounted || !device?.labId) return;

      setDeviceStatus((previous) => ({
        ...previous,
        [device.labId]: device.isOnline,
      }));
    });

    return () => {
      mounted = false;
      socket.disconnect();
    };
  }, []);

  const isLab1 = selectedLab === "LAB1";
  const sensorData = readings[selectedLab];
  const history = chartData[selectedLab];
  const isOnline = deviceStatus[selectedLab];

  const displayValue = (value) => value ?? "—";

  const sensorStatus = "Unknown";

  if (loading) {
    return <div className="monitoring-page">Loading sensor data...</div>;
  }

  return (
    <div className="monitoring-page">
      <div className="monitor-page-header">
        <div>
          <h1>Live Monitoring</h1>
          <p>Real-time environmental monitoring and sensor analytics</p>
        </div>

        <div className="monitor-connection">
          <Wifi size={18} />
          <span>ESP32 {isOnline ? "Online" : "Offline"}</span>
          <span className={`connection-indicator ${isOnline ? "online" : "offline"}`}></span>
        </div>
      </div>

      {error && (
        <p className="monitor-error">
          Unable to load sensor data: {error}
        </p>
      )}

      <div className="monitor-lab-tabs">
        <button
          className={isLab1 ? "selected" : ""}
          onClick={() => setSelectedLab("LAB1")}
        >
          LAB 1
        </button>

        <button
          className={!isLab1 ? "selected" : ""}
          onClick={() => setSelectedLab("LAB2")}
        >
          LAB 2
        </button>
      </div>

      <div className="monitor-section-heading">
        <div>
          <h2>{isLab1 ? "Lab 1" : "Lab 2"} Overview</h2>
          <p>Latest recorded environmental sensor readings</p>
        </div>

        <span className="live-indicator">
          <span className={isOnline ? "online-dot" : "offline-dot"}></span>
{isOnline ? "LIVE DATA" : "DEVICE OFFLINE"}
        </span>
      </div>

      <div className="monitor-metrics-grid">
        <MetricCard
          title="Temperature"
          value={displayValue(sensorData?.temperature)}
          unit="°C"
          icon={Thermometer}
          status={sensorStatus}
        />

        <MetricCard
          title="Humidity"
          value={displayValue(sensorData?.humidity)}
          unit="%"
          icon={Droplets}
          status={sensorStatus}
        />

        {isLab1 ? (
          <>
            <MetricCard
              title="Flame Sensor"
              value={
                sensorData?.flameDetected == null
                  ? "Unavailable"
                  : sensorData.flameDetected ? "Detected" : "Not Detected"
              }
              unit=""
              icon={Flame}
              status={sensorStatus}
            />

            <MetricCard
              title="Human Presence"
              value={
                sensorData?.humanDetected == null
                  ? "Unavailable"
                  : sensorData.humanDetected ? "Present" : "Absent"
              }
              unit=""
              icon={Users}
              status={sensorStatus}
            />
          </>
        ) : (
          <>
            <MetricCard
              title="MQ-2 Smoke Reading"
              value={displayValue(sensorData?.mq2Raw)}
              unit="ADC"
              icon={Wind}
              status={sensorStatus}
            />

            <MetricCard
              title="MQ-7 CO Reading"
              value={displayValue(sensorData?.mq7Raw)}
              unit="ADC"
              icon={Activity}
              status={sensorStatus}
            />
          </>
        )}
      </div>

      <div className="monitor-section-heading">
        <div>
          <h2>Sensor Analytics</h2>
          <p>Historical sensor readings over time</p>
        </div>

        <span className="chart-label">Historical Data</span>
      </div>

      <div className="monitor-charts-grid">
        <SensorChart
          title="Temperature vs Time"
          data={history}
          dataKey="temperature"
          unit="°C"
          color="#22D3EE"
        />

        <SensorChart
          title="Humidity vs Time"
          data={history}
          dataKey="humidity"
          unit="%"
          color="#22C55E"
        />

        {isLab1 ? (
          <PresenceChart data={history} />
        ) : (
          <>
            <SensorChart
              title="MQ-2 Smoke Sensor Reading"
              data={history}
              dataKey="mq2"
              unit="ADC"
              color="#F59E0B"
            />

            <SensorChart
              title="MQ-7 CO Sensor Reading"
              data={history}
              dataKey="mq7"
              unit="ADC"
              color="#EF4444"
            />
          </>
        )}
      </div>

      {isLab1 && (
        <div className="monitor-flame-panel">
          <div className="flame-panel-icon">
            <Flame size={27} />
          </div>

          <div className="flame-panel-content">
            <h3>Fire Safety Status</h3>
            <p>
              {!sensorData
                ? "No flame sensor reading available."
                : sensorData.flameDetected
                  ? "The latest recorded reading indicates flame detection."
                  : "The latest recorded reading indicates no flame detection."}
            </p>
          </div>

          <span className="normal">
            {sensorData?.flameDetected == null
              ? "UNKNOWN"
              : sensorData.flameDetected ? "DETECTED" : "NOT DETECTED"}
          </span>
        </div>
      )}

      <div className="monitor-footer">
        <ShieldCheck size={18} />

        <span>{isLab1 ? "Lab 1" : "Lab 2"} monitoring system</span>

        <span className="monitor-footer-status">
          Device {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default LiveMonitoring;
