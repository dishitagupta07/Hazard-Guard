
export const mockLabs = [
  {
    id: 'LAB_1',
    name: 'Lab 1',
    sensorCount: 3,
    sensors: [
      {
        id: 'temperature',
        name: 'Temperature (DHT22)',
        value: 28.5,
        unit: '°C',
        status: 'Normal',
      },
      {
        id: 'humidity',
        name: 'Humidity (DHT22)',
        value: 60,
        unit: '%',
        status: 'Normal',
      },
      {
        id: 'flame',
        name: 'Flame Sensor',
        value: false,
        unit: '',
        status: 'Normal',
      },
      {
        id: 'presence',
        name: 'Human Presence (RCW Radar)',
        value: true,
        unit: '',
        status: 'Normal',
      },
    ],
    deviceOnline: null,
    lastUpdated: new Date().toISOString(),
  },

  {
    id: 'LAB_2',
    name: 'Lab 2',
    sensorCount: 3,
    sensors: [
      {
        id: 'temperature',
        name: 'Temperature (DHT22)',
        value: 29.2,
        unit: '°C',
        status: 'Normal',
      },
      {
        id: 'humidity',
        name: 'Humidity (DHT22)',
        value: 55,
        unit: '%',
        status: 'Normal',
      },
      {
        id: 'mq2',
        name: 'MQ-2 Gas Sensor',
        value: 420,
        unit: 'raw',
        status: 'Normal',
      },
      {
        id: 'mq7',
        name: 'MQ-7 CO Sensor',
        value: 380,
        unit: 'raw',
        status: 'Normal',
      },
    ],
    deviceOnline: null,
    lastUpdated: new Date().toISOString(),
  },
]

export const mockAlerts = []

// ==========================================
// LIVE MONITORING DATA (Person 2)
// ==========================================

export const lab1Data = {
  temperature: 28.5,
  humidity: 60,
  flame: false,
  humanPresence: true,
  esp32Status: "Offline",
};

export const lab2Data = {
  temperature: 29.2,
  humidity: 55,
  mq2: 420,
  mq7: 380,
  esp32Status: "Offline",
};

// LAB 1 GRAPH DATA

export const lab1ChartData = [
  { time: "09:00", temperature: 25, humidity: 55, occupancy: 0 },
  { time: "09:10", temperature: 26, humidity: 57, occupancy: 1 },
  { time: "09:20", temperature: 27, humidity: 59, occupancy: 1 },
  { time: "09:30", temperature: 28, humidity: 60, occupancy: 1 },
  { time: "09:40", temperature: 28.5, humidity: 60, occupancy: 0 },
  { time: "09:50", temperature: 28, humidity: 59, occupancy: 1 },
  { time: "10:00", temperature: 28.5, humidity: 60, occupancy: 1 },
];

// LAB 2 GRAPH DATA

export const lab2ChartData = [
  { time: "09:00", temperature: 26, humidity: 50, mq2: 300, mq7: 300 },
  { time: "09:10", temperature: 27, humidity: 52, mq2: 320, mq7: 320 },
  { time: "09:20", temperature: 28, humidity: 53, mq2: 350, mq7: 340 },
  { time: "09:30", temperature: 29, humidity: 54, mq2: 380, mq7: 350 },
  { time: "09:40", temperature: 29.2, humidity: 55, mq2: 400, mq7: 365 },
  { time: "09:50", temperature: 29.2, humidity: 55, mq2: 420, mq7: 380 },
];

// ALERT HISTORY DEMO DATA

export const initialAlerts = [
  {
    id: 1,
    title: "High Temperature Detected",
    lab: "Lab 1",
    sensor: "DHT22",
    description: "Temperature crossed the warning threshold.",
    severity: "Warning",
    date: "2026-11-14",
    time: "09:45 AM",
    status: "Resolved",
    acknowledged: true,
  },
  {
    id: 2,
    title: "Smoke Level Increased",
    lab: "Lab 2",
    sensor: "MQ-2",
    description: "Smoke sensor reading is above normal range.",
    severity: "Critical",
    date: "2026-11-14",
    time: "09:30 AM",
    status: "Resolved",
    acknowledged: true,
  },
  {
    id: 3,
    title: "Human Presence Detected",
    lab: "Lab 1",
    sensor: "mmWave Radar",
    description: "Human presence detected inside the laboratory.",
    severity: "Info",
    date: "2026-11-14",
    time: "09:15 AM",
    status: "Resolved",
    acknowledged: true,
  },
  {
    id: 4,
    title: "CO Level Warning",
    lab: "Lab 2",
    sensor: "MQ-7",
    description: "CO sensor reading requires attention.",
    severity: "Warning",
    date: "2026-11-14",
    time: "08:50 AM",
    status: "Resolved",
    acknowledged: true,
  },
];
