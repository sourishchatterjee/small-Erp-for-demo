import { useState } from 'react';
import { purchaseOrders, vendors } from '../../data/data';

const styles = {
  "vendorwiserepo-page": {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #fafbff 50%, #f5f7ff 100%)",
    padding: "32px 24px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: "#1e293b",
  },
  "vendorwiserepo-header": {
    marginBottom: "32px",
    borderLeft: "3px solid #6366f1",
    paddingLeft: "16px",
  },
  "vendorwiserepo-title": {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
  },
  "vendorwiserepo-subtitle": {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
    letterSpacing: "0.3px",
  },
  "vendorwiserepo-stats-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  "vendorwiserepo-stat-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "vendorwiserepo-stat-accent-indigo": {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #6366f1, #818cf8)",
    borderRadius: "14px 14px 0 0",
  },
  "vendorwiserepo-stat-accent-emerald": {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #10b981, #34d399)",
    borderRadius: "14px 14px 0 0",
  },
  "vendorwiserepo-stat-accent-blue": {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #3b82f6, #93c5fd)",
    borderRadius: "14px 14px 0 0",
  },
  "vendorwiserepo-stat-label": {
    fontSize: "11px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "8px",
    fontWeight: "600",
  },
  "vendorwiserepo-stat-value": {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    lineHeight: 1,
  },
  "vendorwiserepo-stat-value-emerald": {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #10b981, #34d399)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1,
  },
  "vendorwiserepo-stat-value-blue": {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1,
  },
  "vendorwiserepo-table-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "vendorwiserepo-table-scroll": {
    overflowX: "auto",
  },
  "vendorwiserepo-table": {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13.5px",
  },
  "vendorwiserepo-thead": {
    background: "#f8fafc",
    borderBottom: "1.5px solid #e2e8f0",
  },
  "vendorwiserepo-th": {
    padding: "14px 18px",
    textAlign: "left",
    fontSize: "10.5px",
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.9px",
    whiteSpace: "nowrap",
  },
  "vendorwiserepo-tr": {
    borderBottom: "1px solid #f1f5f9",
    transition: "background 0.15s",
  },
  "vendorwiserepo-td": {
    padding: "14px 18px",
    color: "#475569",
    verticalAlign: "middle",
  },
  "vendorwiserepo-td-name": {
    padding: "14px 18px",
    fontWeight: "700",
    color: "#1e293b",
    verticalAlign: "middle",
  },
  "vendorwiserepo-td-amount": {
    padding: "14px 18px",
    fontWeight: "700",
    color: "#6366f1",
    verticalAlign: "middle",
  },
};

export default function VendorReport() {
  const [hoveredRow, setHoveredRow] = useState(null);

  const vendorStats = vendors.map((v) => {
    const pos = purchaseOrders.filter((po) => po.vendor === v.name);
    const totalAmount = pos.reduce((sum, po) => sum + po.total, 0);
    const delivered = pos.filter((po) => po.status === 'Delivered').length;
    return { ...v, totalOrders: pos.length, totalAmount, delivered };
  });

  const grandTotal = vendorStats.reduce((s, v) => s + v.totalAmount, 0);
  const activeCount = vendors.filter((v) => v.status === 'Active').length;

  const vendorInitial = (name) => name?.charAt(0)?.toUpperCase() || '?';

  const avatarColors = [
    { bg: "#eef2ff", color: "#6366f1" },
    { bg: "#ecfdf5", color: "#059669" },
    { bg: "#eff6ff", color: "#2563eb" },
    { bg: "#fdf4ff", color: "#9333ea" },
    { bg: "#fff7ed", color: "#ea580c" },
    { bg: "#fef2f2", color: "#dc2626" },
  ];

  return (
    <div className="vendorwiserepo-page" style={styles["vendorwiserepo-page"]}>
      {/* Header */}
      <div className="vendorwiserepo-header" style={styles["vendorwiserepo-header"]}>
        <h1 className="vendorwiserepo-title" style={styles["vendorwiserepo-title"]}>
          Vendor Wise Report
        </h1>
        <p className="vendorwiserepo-subtitle" style={styles["vendorwiserepo-subtitle"]}>
          Purchase analysis by vendor
        </p>
      </div>

      {/* Stats */}
      <div className="vendorwiserepo-stats-grid" style={styles["vendorwiserepo-stats-grid"]}>
        <div className="vendorwiserepo-stat-card" style={styles["vendorwiserepo-stat-card"]}>
          <div style={styles["vendorwiserepo-stat-accent-indigo"]} />
          <p className="vendorwiserepo-stat-label" style={styles["vendorwiserepo-stat-label"]}>Total Vendors</p>
          <p className="vendorwiserepo-stat-value" style={styles["vendorwiserepo-stat-value"]}>{vendors.length}</p>
        </div>
        <div className="vendorwiserepo-stat-card" style={styles["vendorwiserepo-stat-card"]}>
          <div style={styles["vendorwiserepo-stat-accent-emerald"]} />
          <p className="vendorwiserepo-stat-label" style={styles["vendorwiserepo-stat-label"]}>Active Vendors</p>
          <p className="vendorwiserepo-stat-value-emerald" style={styles["vendorwiserepo-stat-value-emerald"]}>{activeCount}</p>
        </div>
        <div className="vendorwiserepo-stat-card" style={styles["vendorwiserepo-stat-card"]}>
          <div style={styles["vendorwiserepo-stat-accent-blue"]} />
          <p className="vendorwiserepo-stat-label" style={styles["vendorwiserepo-stat-label"]}>Total Purchase Value</p>
          <p className="vendorwiserepo-stat-value-blue" style={styles["vendorwiserepo-stat-value-blue"]}>₹{grandTotal.toLocaleString()}</p>
        </div>
      </div>

      {/* Table */}
      <div className="vendorwiserepo-table-card" style={styles["vendorwiserepo-table-card"]}>
        <div className="vendorwiserepo-table-scroll" style={styles["vendorwiserepo-table-scroll"]}>
          <table className="vendorwiserepo-table" style={styles["vendorwiserepo-table"]}>
            <thead className="vendorwiserepo-thead" style={styles["vendorwiserepo-thead"]}>
              <tr>
                {["Vendor", "City", "Status", "Total POs", "Delivered", "Total Amount"].map((h) => (
                  <th key={h} className="vendorwiserepo-th" style={styles["vendorwiserepo-th"]}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vendorStats.map((v, i) => {
                const avatarColor = avatarColors[i % avatarColors.length];
                return (
                  <tr
                    key={v.id}
                    className="vendorwiserepo-tr"
                    style={{
                      ...styles["vendorwiserepo-tr"],
                      background: hoveredRow === i ? "#f5f7ff" : "#ffffff",
                    }}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {/* Vendor name with avatar */}
                    <td className="vendorwiserepo-td-name" style={styles["vendorwiserepo-td-name"]}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: avatarColor.bg,
                          color: avatarColor.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          fontWeight: "800",
                          flexShrink: 0,
                          border: `1px solid ${avatarColor.color}22`,
                        }}>
                          {vendorInitial(v.name)}
                        </div>
                        {v.name}
                      </div>
                    </td>

                    {/* City */}
                    <td className="vendorwiserepo-td" style={{ ...styles["vendorwiserepo-td"], fontSize: "13px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ color: "#cbd5e1", fontSize: "11px" }}>📍</span>
                        {v.city}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="vendorwiserepo-td" style={styles["vendorwiserepo-td"]}>
                      <span className="vendorwiserepo-status-badge" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: "0.4px",
                        ...(v.status === "Active"
                          ? { background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" }
                          : { background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0" }),
                      }}>
                        <span style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: v.status === "Active" ? "#10b981" : "#94a3b8",
                          display: "inline-block",
                        }} />
                        {v.status}
                      </span>
                    </td>

                    {/* Total POs */}
                    <td className="vendorwiserepo-td" style={styles["vendorwiserepo-td"]}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "28px",
                        height: "26px",
                        borderRadius: "6px",
                        background: "#f1f5f9",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#64748b",
                        border: "1px solid #e2e8f0",
                        padding: "0 8px",
                      }}>
                        {v.totalOrders}
                      </span>
                    </td>

                    {/* Delivered */}
                    <td className="vendorwiserepo-td" style={styles["vendorwiserepo-td"]}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "700",
                        background: "#ecfdf5",
                        color: "#059669",
                        border: "1px solid #a7f3d0",
                      }}>
                        {v.delivered}
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="vendorwiserepo-td-amount" style={styles["vendorwiserepo-td-amount"]}>
                      ₹{v.totalAmount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}