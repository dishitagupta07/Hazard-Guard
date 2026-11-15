import { useState } from "react";

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  ShieldAlert,
  Bell,
} from "lucide-react";

import { initialAlerts } from "../data/mockData.js";

import "../styles/monitoring.css";


function AlertHistory() {

  const [alerts, setAlerts] = useState(initialAlerts);

  const [search, setSearch] = useState("");

  const [labFilter, setLabFilter] = useState("All");

  const [sensorFilter, setSensorFilter] = useState("All");

  const [severityFilter, setSeverityFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  const [dateFilter, setDateFilter] = useState("");


  // ACKNOWLEDGE ALERT

  const acknowledgeAlert = (id) => {

    setAlerts((previousAlerts) =>

      previousAlerts.map((alert) =>

        alert.id === id
          ? { ...alert, acknowledged: true }
          : alert

      )

    );

  };


  // FILTER ALERTS

  const filteredAlerts = alerts.filter((alert) => {

    const matchesSearch =

      alert.title.toLowerCase().includes(search.toLowerCase()) ||

      alert.sensor.toLowerCase().includes(search.toLowerCase()) ||

      alert.lab.toLowerCase().includes(search.toLowerCase()) ||

      alert.description.toLowerCase().includes(search.toLowerCase());


    const matchesLab =
      labFilter === "All" || alert.lab === labFilter;


    const matchesSensor =
      sensorFilter === "All" || alert.sensor === sensorFilter;


    const matchesSeverity =
      severityFilter === "All" || alert.severity === severityFilter;


    const matchesStatus =
      statusFilter === "All" || alert.status === statusFilter;


    const matchesDate =
      dateFilter === "" || alert.date === dateFilter;


    return (

      matchesSearch &&
      matchesLab &&
      matchesSensor &&
      matchesSeverity &&
      matchesStatus &&
      matchesDate

    );

  });


  // SEPARATE ACTIVE AND PREVIOUS ALERTS

  const activeAlerts = filteredAlerts.filter(
    (alert) => alert.status === "Active"
  );

  const previousAlerts = filteredAlerts.filter(
    (alert) => alert.status === "Resolved"
  );


  // COUNT ACTIVE ALERTS

  const totalActiveAlerts = alerts.filter(
    (alert) => alert.status === "Active"
  ).length;


  // CLEAR FILTERS

  const clearFilters = () => {

    setSearch("");
    setLabFilter("All");
    setSensorFilter("All");
    setSeverityFilter("All");
    setStatusFilter("All");
    setDateFilter("");

  };


  return (

    <div className="monitoring-page">


      {/* HEADER */}

      <div className="monitor-page-header">

        <div>

          <h1>Alert History</h1>

          <p>
            Monitor, acknowledge and track laboratory safety alerts
          </p>

        </div>


        <div className="alert-count-box">

          <ShieldAlert size={20} />

          <span>{totalActiveAlerts} Active Alerts</span>

        </div>

      </div>



      {/* ACTIVE ALERTS */}

      <div className="monitor-section-heading">

        <div>

          <h2>
            <AlertTriangle size={21} />
            Active Alerts
          </h2>

          <p>Alerts that require attention</p>

        </div>

        <span className="alert-total">
          {activeAlerts.length} Alerts
        </span>

      </div>


      <div className="active-alerts-list">

        {activeAlerts.length === 0 ? (

          <div className="alert-empty-state">

            <CheckCircle size={38} />

            <h3>No Active Alerts</h3>

            <p>
              No active alerts match the selected filters.
            </p>

          </div>

        ) : (

          activeAlerts.map((alert) => (

            <div
              className={`history-alert-card ${alert.severity.toLowerCase()}`}
              key={alert.id}
            >

              <div className="history-alert-icon">

                <AlertTriangle size={25} />

              </div>


              <div className="history-alert-content">

                <div className="history-alert-title">

                  <h3>{alert.title}</h3>

                  <span className={`severity-tag ${alert.severity.toLowerCase()}`}>
                    {alert.severity}
                  </span>

                </div>


                <p>{alert.description}</p>


                <div className="history-alert-meta">

                  <span>{alert.lab}</span>

                  <span>{alert.sensor}</span>

                  <span>
                    <Clock size={14} />
                    {alert.date} | {alert.time}
                  </span>

                </div>

              </div>


              <div className="history-alert-action">

                {alert.acknowledged ? (

                  <span className="acknowledged-label">

                    <CheckCircle size={16} />

                    Acknowledged

                  </span>

                ) : (

                  <button
                    className="acknowledge-button"
                    onClick={() => acknowledgeAlert(alert.id)}
                  >

                    Acknowledge

                  </button>

                )}

              </div>

            </div>

          ))

        )}

      </div>



      {/* PREVIOUS ALERTS HEADING */}

      <div className="monitor-section-heading previous-heading">

        <div>

          <h2>
            <Bell size={21} />
            Previous Alert History
          </h2>

          <p>Previously resolved alert records</p>

        </div>

        <span className="alert-total">
          {previousAlerts.length} Records
        </span>

      </div>



      {/* FILTERS */}

      <div className="alert-filter-panel">


        <div className="alert-search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search alerts, labs or sensors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <select
          value={labFilter}
          onChange={(e) => setLabFilter(e.target.value)}
        >

          <option value="All">All Labs</option>

          <option value="Lab 1">Lab 1</option>

          <option value="Lab 2">Lab 2</option>

        </select>


        <select
          value={sensorFilter}
          onChange={(e) => setSensorFilter(e.target.value)}
        >

          <option value="All">All Sensors</option>

          <option value="DHT22">DHT22</option>

          <option value="Flame Sensor">Flame Sensor</option>

          <option value="mmWave Radar">mmWave Radar</option>

          <option value="MQ-2">MQ-2</option>

          <option value="MQ-7">MQ-7</option>

        </select>


        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >

          <option value="All">All Severity</option>

          <option value="Critical">Critical</option>

          <option value="Warning">Warning</option>

          <option value="Info">Info</option>

        </select>


        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >

          <option value="All">All Status</option>

          <option value="Active">Active</option>

          <option value="Resolved">Resolved</option>

        </select>


        <input
          className="alert-date-input"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />


        <button
          className="clear-filter-button"
          onClick={clearFilters}
        >

          Clear Filters

        </button>

      </div>



      {/* HISTORY TABLE */}

      <div className="alert-table-container">

        <table className="alert-history-table">

          <thead>

            <tr>

              <th>Date / Time</th>

              <th>Lab</th>

              <th>Sensor</th>

              <th>Alert</th>

              <th>Severity</th>

              <th>Status</th>

            </tr>

          </thead>


          <tbody>

            {previousAlerts.length === 0 ? (

              <tr>

                <td colSpan="6" className="alert-no-records">

                  No previous alerts found.

                </td>

              </tr>

            ) : (

              previousAlerts.map((alert) => (

                <tr key={alert.id}>

                  <td>

                    {alert.date}

                    <br />

                    <small>{alert.time}</small>

                  </td>


                  <td>{alert.lab}</td>


                  <td>{alert.sensor}</td>


                  <td>{alert.title}</td>


                  <td>

                    <span className={`severity-tag ${alert.severity.toLowerCase()}`}>

                      {alert.severity}

                    </span>

                  </td>


                  <td>

                    <span className="resolved-label">

                      <CheckCircle size={15} />

                      Resolved

                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


    </div>

  );

}

export default AlertHistory;