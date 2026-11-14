
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
