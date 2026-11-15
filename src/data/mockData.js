// LAB 1 SENSOR DATA

export const lab1Data = {
  temperature: 28.5,
  humidity: 62,
  flame: false,
  humanPresence: true,
  esp32Status: "Online",
};

// LAB 2 SENSOR DATA

export const lab2Data = {
  temperature: 30.2,
  humidity: 58,
  mq2: 420,
  mq7: 185,
  esp32Status: "Online",
};

// LAB 1 GRAPH DATA

export const lab1ChartData = [
  { time: "09:00", temperature: 25, humidity: 55, occupancy: 0 },
  { time: "09:10", temperature: 26, humidity: 57, occupancy: 1 },
  { time: "09:20", temperature: 27, humidity: 59, occupancy: 1 },
  { time: "09:30", temperature: 28, humidity: 60, occupancy: 1 },
  { time: "09:40", temperature: 28.5, humidity: 62, occupancy: 0 },
  { time: "09:50", temperature: 28, humidity: 61, occupancy: 1 },
  { time: "10:00", temperature: 28.5, humidity: 62, occupancy: 1 },
];

// LAB 2 GRAPH DATA

export const lab2ChartData = [
  { time: "09:00", temperature: 26, humidity: 50, mq2: 300, mq7: 120 },
  { time: "09:10", temperature: 27, humidity: 52, mq2: 320, mq7: 130 },
  { time: "09:20", temperature: 28, humidity: 54, mq2: 350, mq7: 145 },
  { time: "09:30", temperature: 29, humidity: 55, mq2: 380, mq7: 160 },
  { time: "09:40", temperature: 30, humidity: 56, mq2: 400, mq7: 170 },
  { time: "09:50", temperature: 30.2, humidity: 58, mq2: 420, mq7: 185 },
];

// ALERT DATA

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
    status: "Active",
    acknowledged: false,
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
    status: "Active",
    acknowledged: false,
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
    status: "Active",
    acknowledged: false,
  },
];