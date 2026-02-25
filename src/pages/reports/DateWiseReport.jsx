// import { useState } from "react";
// import { purchaseOrders } from "../../data/data";

// const statusColor = {
//   Delivered: "badge-success",
//   Shipped: "badge-info",
//   Approved: "badge-info",
//   Pending: "badge-warning",
//   Draft: "badge-gray",
// };

// export default function DateWiseReport() {
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const filtered = purchaseOrders.filter((po) => {
//     if (fromDate && po.date < fromDate) return false;
//     if (toDate && po.date > toDate) return false;
//     return true;
//   });

//   const totalValue = filtered.reduce((s, po) => s + po.total, 0);

//   return (
//     <div>
//       <div className="page-header">
//         <div>
//           <h1 className="page-title">Date Wise Report</h1>
//           <p className="page-subtitle">Filter purchase orders by date range</p>
//         </div>
//       </div>

//       <div className="card p-5 mb-5">
//         <div className="flex flex-wrap items-end gap-4">
//           <div>
//             <label className="form-label">From Date</label>
//             <input
//               type="date"
//               className="form-input !w-48"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="form-label">To Date</label>
//             <input
//               type="date"
//               className="form-input !w-48"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//             />
//           </div>
//           <button
//             className="btn btn-secondary"
//             onClick={() => {
//               setFromDate("");
//               setToDate("");
//             }}
//           >
//             Clear
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         <div className="card p-4">
//           <p className="text-xs text-slate-400">Orders Found</p>
//           <p className="text-2xl font-bold text-slate-800">{filtered.length}</p>
//         </div>
//         <div className="card p-4">
//           <p className="text-xs text-slate-400">Total Value</p>
//           <p className="text-2xl font-bold text-blue-600">
//             ₹{totalValue.toLocaleString()}
//           </p>
//         </div>
//       </div>

//       <div className="card p-5">
//         <div className="overflow-x-auto"> 
//           <table className="erp-table">
//             <thead>
//               <tr>
//                 <th>PO ID</th>
//                 <th>Vendor</th>
//                 <th>Date</th>
//                 <th>Items</th>
//                 <th>Total</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((po) => (
//                 <tr key={po.id}>
//                   <td className="font-semibold text-blue-600">{po.id}</td>
//                   <td>{po.vendor}</td>
//                   <td>{po.date}</td>
//                   <td>{po.items.length}</td>
//                   <td className="font-medium">₹{po.total.toLocaleString()}</td>
//                   <td>
//                     <span className={`badge ${statusColor[po.status]}`}>
//                       {po.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//               {filtered.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="text-center py-8 text-slate-400">
//                     No orders in this range
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }














import { useState } from "react";
import { purchaseOrders } from "../../data/data";

const styles = {
  "vendor-repo-page": {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #fafbff 50%, #f5f7ff 100%)",
    padding: "32px 24px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: "#1e293b",
  },
  "vendor-repo-header": {
    marginBottom: "32px",
    borderLeft: "3px solid #6366f1",
    paddingLeft: "16px",
  },
  "vendor-repo-title": {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
  },
  "vendor-repo-subtitle": {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
    letterSpacing: "0.3px",
  },
  "vendor-repo-filter-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px 24px",
    marginBottom: "24px",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "vendor-repo-filter-row": {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    gap: "16px",
  },
  "vendor-repo-field": {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  "vendor-repo-label": {
    fontSize: "11px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  "vendor-repo-input": {
    background: "#f8fafc",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    padding: "9px 14px",
    fontSize: "14px",
    color: "#1e293b",
    width: "180px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  "vendor-repo-clear-btn": {
    background: "#f1f5ff",
    border: "1.5px solid #c7d2fe",
    borderRadius: "8px",
    padding: "9px 20px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#6366f1",
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.2px",
  },
  "vendor-repo-stats-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  "vendor-repo-stat-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "vendor-repo-stat-accent-indigo": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #6366f1, #818cf8)",
    borderRadius: "14px 14px 0 0",
  },
  "vendor-repo-stat-accent-emerald": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #10b981, #34d399)",
    borderRadius: "14px 14px 0 0",
  },
  "vendor-repo-stat-label": {
    fontSize: "11px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "8px",
    fontWeight: "600",
  },
  "vendor-repo-stat-value": {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    lineHeight: 1,
  },
  "vendor-repo-stat-value-indigo": {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #6366f1, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1,
  },
  "vendor-repo-table-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "vendor-repo-table-scroll": {
    overflowX: "auto",
  },
  "vendor-repo-table": {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13.5px",
  },
  "vendor-repo-thead": {
    background: "#f8fafc",
    borderBottom: "1.5px solid #e2e8f0",
  },
  "vendor-repo-th": {
    padding: "14px 18px",
    textAlign: "left",
    fontSize: "10.5px",
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.9px",
    whiteSpace: "nowrap",
  },
  "vendor-repo-tr": {
    borderBottom: "1px solid #f1f5f9",
    transition: "background 0.15s",
  },
  "vendor-repo-td": {
    padding: "14px 18px",
    color: "#475569",
    verticalAlign: "middle",
  },
  "vendor-repo-td-id": {
    padding: "14px 18px",
    fontWeight: "700",
    color: "#6366f1",
    fontFamily: "monospace",
    fontSize: "13px",
    verticalAlign: "middle",
  },
  "vendor-repo-td-total": {
    padding: "14px 18px",
    fontWeight: "700",
    color: "#1e293b",
    verticalAlign: "middle",
  },
  "vendor-repo-empty": {
    textAlign: "center",
    padding: "56px",
    color: "#94a3b8",
    fontSize: "14px",
  },
  "vendor-repo-empty-icon": {
    fontSize: "36px",
    marginBottom: "12px",
    opacity: 0.5,
  },
};

const statusStyles = {
  Delivered: {
    background: "#ecfdf5",
    color: "#059669",
    border: "1px solid #a7f3d0",
  },
  Shipped: {
    background: "#eff6ff",
    color: "#2563eb",
    border: "1px solid #bfdbfe",
  },
  Approved: {
    background: "#eef2ff",
    color: "#6366f1",
    border: "1px solid #c7d2fe",
  },
  Pending: {
    background: "#fffbeb",
    color: "#d97706",
    border: "1px solid #fde68a",
  },
  Draft: {
    background: "#f8fafc",
    color: "#64748b",
    border: "1px solid #e2e8f0",
  },
};

const badgeStyle = (status) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 10px",
  borderRadius: "20px",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.4px",
  ...(statusStyles[status] || statusStyles.Draft),
});

export default function DateWiseReport() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [inputFocus, setInputFocus] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [clearHover, setClearHover] = useState(false);

  const filtered = purchaseOrders.filter((po) => {
    if (fromDate && po.date < fromDate) return false;
    if (toDate && po.date > toDate) return false;
    return true;
  });

  const totalValue = filtered.reduce((s, po) => s + po.total, 0);

  const inputStyle = (id) => ({
    ...styles["vendor-repo-input"],
    borderColor: inputFocus === id ? "#6366f1" : "#e2e8f0",
    boxShadow: inputFocus === id ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
    background: inputFocus === id ? "#ffffff" : "#f8fafc",
  });

  return (
    <div className="vendor-repo-page" style={styles["vendor-repo-page"]}>
      {/* Header */}
      <div className="vendor-repo-header" style={styles["vendor-repo-header"]}>
        <h1 className="vendor-repo-title" style={styles["vendor-repo-title"]}>
          Date Wise Report
        </h1>
        <p className="vendor-repo-subtitle" style={styles["vendor-repo-subtitle"]}>
          Filter purchase orders by date range
        </p>
      </div>

      {/* Filter Card */}
      <div className="vendor-repo-filter-card" style={styles["vendor-repo-filter-card"]}>
        <div className="vendor-repo-filter-row" style={styles["vendor-repo-filter-row"]}>
          <div className="vendor-repo-field" style={styles["vendor-repo-field"]}>
            <label className="vendor-repo-label" style={styles["vendor-repo-label"]}>
              From Date
            </label>
            <input
              className="vendor-repo-input"
              type="date"
              style={inputStyle("from")}
              value={fromDate}
              onFocus={() => setInputFocus("from")}
              onBlur={() => setInputFocus(null)}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="vendor-repo-field" style={styles["vendor-repo-field"]}>
            <label className="vendor-repo-label" style={styles["vendor-repo-label"]}>
              To Date
            </label>
            <input
              className="vendor-repo-input"
              type="date"
              style={inputStyle("to")}
              value={toDate}
              onFocus={() => setInputFocus("to")}
              onBlur={() => setInputFocus(null)}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <button
            className="vendor-repo-clear-btn"
            style={{
              ...styles["vendor-repo-clear-btn"],
              background: clearHover ? "#e0e7ff" : "#f1f5ff",
              transform: clearHover ? "translateY(-1px)" : "none",
              boxShadow: clearHover ? "0 4px 12px rgba(99,102,241,0.15)" : "none",
            }}
            onMouseEnter={() => setClearHover(true)}
            onMouseLeave={() => setClearHover(false)}
            onClick={() => {
              setFromDate("");
              setToDate("");
            }}
          >
            ✕ Clear
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="vendor-repo-stats-grid" style={styles["vendor-repo-stats-grid"]}>
        <div className="vendor-repo-stat-card" style={styles["vendor-repo-stat-card"]}>
          <div style={styles["vendor-repo-stat-accent-indigo"]} />
          <p className="vendor-repo-stat-label" style={styles["vendor-repo-stat-label"]}>
            Orders Found
          </p>
          <p className="vendor-repo-stat-value" style={styles["vendor-repo-stat-value"]}>
            {filtered.length}
          </p>
        </div>
        <div className="vendor-repo-stat-card" style={styles["vendor-repo-stat-card"]}>
          <div style={styles["vendor-repo-stat-accent-emerald"]} />
          <p className="vendor-repo-stat-label" style={styles["vendor-repo-stat-label"]}>
            Total Value
          </p>
          <p
            className="vendor-repo-stat-value-indigo"
            style={styles["vendor-repo-stat-value-indigo"]}
          >
            ₹{totalValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="vendor-repo-table-card" style={styles["vendor-repo-table-card"]}>
        <div className="vendor-repo-table-scroll" style={styles["vendor-repo-table-scroll"]}>
          <table className="vendor-repo-table" style={styles["vendor-repo-table"]}>
            <thead className="vendor-repo-thead" style={styles["vendor-repo-thead"]}>
              <tr>
                {["PO ID", "Vendor", "Date", "Items", "Total", "Status"].map((h) => (
                  <th
                    key={h}
                    className="vendor-repo-th"
                    style={styles["vendor-repo-th"]}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((po, i) => (
                <tr
                  key={po.id}
                  className="vendor-repo-tr"
                  style={{
                    ...styles["vendor-repo-tr"],
                    background: hoveredRow === i ? "#f5f7ff" : "#ffffff",
                  }}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="vendor-repo-td-id" style={styles["vendor-repo-td-id"]}>
                    {po.id}
                  </td>
                  <td className="vendor-repo-td" style={styles["vendor-repo-td"]}>
                    {po.vendor}
                  </td>
                  <td
                    className="vendor-repo-td"
                    style={{
                      ...styles["vendor-repo-td"],
                      fontFamily: "monospace",
                      fontSize: "13px",
                      color: "#64748b",
                    }}
                  >
                    {po.date}
                  </td>
                  <td
                    className="vendor-repo-td"
                    style={{ ...styles["vendor-repo-td"], textAlign: "center" }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "26px",
                        height: "26px",
                        borderRadius: "6px",
                        background: "#f1f5f9",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#64748b",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      {po.items.length}
                    </span>
                  </td>
                  <td className="vendor-repo-td-total" style={styles["vendor-repo-td-total"]}>
                    ₹{po.total.toLocaleString()}
                  </td>
                  <td className="vendor-repo-td" style={styles["vendor-repo-td"]}>
                    <span className="vendor-repo-badge" style={badgeStyle(po.status)}>
                      {po.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="vendor-repo-empty"
                    style={styles["vendor-repo-empty"]}
                  >
                    <div style={styles["vendor-repo-empty-icon"]}>📋</div>
                    <div>No orders found in this date range</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}