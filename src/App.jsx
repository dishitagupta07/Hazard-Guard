import { useState } from "react";

import LiveMonitoring from "./pages/LiveMonitoring";
import AlertHistory from "./pages/AlertHistory";

function App() {
  const [page, setPage] = useState("monitoring");

  return (
    <div>
      <div style={{
        display: "flex",
        gap: "15px",
        padding: "15px",
        background: "#101A2A"
      }}>
        <button onClick={() => setPage("monitoring")}>
          Live Monitoring
        </button>

        <button onClick={() => setPage("alerts")}>
          Alert History
        </button>
      </div>

      {page === "monitoring"
        ? <LiveMonitoring />
        : <AlertHistory />
      }
    </div>
  );
}

export default App;
