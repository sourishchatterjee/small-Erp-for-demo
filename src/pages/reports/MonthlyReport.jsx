import React from "react";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { monthlyPurchaseData, purchaseOrders } from "../../data/data";

const styles = {
  "monthlypurchase-page": {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f0f4ff 0%, #fafbff 50%, #f5f7ff 100%)",
    padding: "32px 24px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: "#1e293b",
  },
  "monthlypurchase-header": {
    marginBottom: "32px",
    borderLeft: "3px solid #6366f1",
    paddingLeft: "16px",
  },
  "monthlypurchase-title": {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
  },
  "monthlypurchase-subtitle": {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
    letterSpacing: "0.3px",
  },
  "monthlypurchase-stats-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  "monthlypurchase-stat-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "monthlypurchase-stat-accent-indigo": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #6366f1, #818cf8)",
    borderRadius: "14px 14px 0 0",
  },
  "monthlypurchase-stat-accent-blue": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #3b82f6, #93c5fd)",
    borderRadius: "14px 14px 0 0",
  },
  "monthlypurchase-stat-accent-emerald": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #10b981, #34d399)",
    borderRadius: "14px 14px 0 0",
  },
  "monthlypurchase-stat-label": {
    fontSize: "11px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "8px",
    fontWeight: "600",
  },
  "monthlypurchase-stat-value": {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    lineHeight: 1,
  },
  "monthlypurchase-stat-value-blue": {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1,
  },
  "monthlypurchase-stat-value-emerald": {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #10b981, #34d399)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1,
  },
  "monthlypurchase-chart-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "monthlypurchase-chart-title": {
    fontSize: "13px",
    fontWeight: "700",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    marginBottom: "20px",
    margin: "0 0 20px 0",
  },
  "monthlypurchase-table-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "monthlypurchase-table-scroll": {
    overflowX: "auto",
  },
  "monthlypurchase-table": {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13.5px",
  },
  "monthlypurchase-thead": {
    background: "#f8fafc",
    borderBottom: "1.5px solid #e2e8f0",
  },
  "monthlypurchase-th": {
    padding: "14px 18px",
    textAlign: "left",
    fontSize: "10.5px",
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.9px",
    whiteSpace: "nowrap",
  },
  "monthlypurchase-tr": {
    borderBottom: "1px solid #f1f5f9",
    transition: "background 0.15s",
  },
  "monthlypurchase-td": {
    padding: "14px 18px",
    color: "#475569",
    verticalAlign: "middle",
  },
  "monthlypurchase-td-month": {
    padding: "14px 18px",
    fontWeight: "700",
    color: "#1e293b",
    fontFamily: "monospace",
    fontSize: "13px",
    verticalAlign: "middle",
  },
  "monthlypurchase-td-total": {
    padding: "14px 18px",
    fontWeight: "700",
    color: "#6366f1",
    verticalAlign: "middle",
  },
  "monthlypurchase-delivered-chip": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    background: "#ecfdf5",
    color: "#059669",
    border: "1px solid #a7f3d0",
  },
  "monthlypurchase-count-chip": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "26px",
    height: "26px",
    borderRadius: "6px",
    background: "#f1f5f9",
    fontSize: "12px",
    fontWeight: "700",
    color: "#64748b",
    border: "1px solid #e2e8f0",
    padding: "0 8px",
  },
};

const customTooltipStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  boxShadow: "0 4px 16px rgba(99,102,241,0.1)",
  padding: "10px 14px",
  fontSize: "13px",
  color: "#1e293b",
};

export default function MonthlyReport() {
  const months = [
    ...new Set(purchaseOrders.map((po) => po.date.slice(0, 7))),
  ].sort();

  const monthlyBreakdown = months.map((m) => {
    const pos = purchaseOrders.filter((po) => po.date.startsWith(m));
    return {
      month: m,
      count: pos.length,
      total: pos.reduce((s, po) => s + po.total, 0),
      delivered: pos.filter((po) => po.status === "Delivered").length,
    };
  });

  const grandTotal = monthlyBreakdown.reduce((s, m) => s + m.total, 0);

  const [hoveredRow, setHoveredRow] = React.useState(null);

  return (
    <div
      className="monthlypurchase-page"
      style={styles["monthlypurchase-page"]}
    >
      {/* Header */}
      <div
        className="monthlypurchase-header"
        style={styles["monthlypurchase-header"]}
      >
        <h1
          className="monthlypurchase-title"
          style={styles["monthlypurchase-title"]}
        >
          Month Wise Report
        </h1>
        <p
          className="monthlypurchase-subtitle"
          style={styles["monthlypurchase-subtitle"]}
        >
          Monthly purchase trends and analysis
        </p>
      </div>

      {/* Stats */}
      <div
        className="monthlypurchase-stats-grid"
        style={styles["monthlypurchase-stats-grid"]}
      >
        <div
          className="monthlypurchase-stat-card"
          style={styles["monthlypurchase-stat-card"]}
        >
          <div style={styles["monthlypurchase-stat-accent-indigo"]} />
          <p
            className="monthlypurchase-stat-label"
            style={styles["monthlypurchase-stat-label"]}
          >
            Total Months
          </p>
          <p
            className="monthlypurchase-stat-value"
            style={styles["monthlypurchase-stat-value"]}
          >
            {months.length}
          </p>
        </div>
        <div
          className="monthlypurchase-stat-card"
          style={styles["monthlypurchase-stat-card"]}
        >
          <div style={styles["monthlypurchase-stat-accent-blue"]} />
          <p
            className="monthlypurchase-stat-label"
            style={styles["monthlypurchase-stat-label"]}
          >
            Total Purchase
          </p>
          <p
            className="monthlypurchase-stat-value-blue"
            style={styles["monthlypurchase-stat-value-blue"]}
          >
            ₹{grandTotal.toLocaleString()}
          </p>
        </div>
        <div
          className="monthlypurchase-stat-card"
          style={styles["monthlypurchase-stat-card"]}
        >
          <div style={styles["monthlypurchase-stat-accent-emerald"]} />
          <p
            className="monthlypurchase-stat-label"
            style={styles["monthlypurchase-stat-label"]}
          >
            Avg Monthly
          </p>
          <p
            className="monthlypurchase-stat-value-emerald"
            style={styles["monthlypurchase-stat-value-emerald"]}
          >
            ₹
            {months.length
              ? Math.round(grandTotal / months.length).toLocaleString()
              : 0}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div
        className="monthlypurchase-chart-card"
        style={styles["monthlypurchase-chart-card"]}
      >
        <h3
          className="monthlypurchase-chart-title"
          style={styles["monthlypurchase-chart-title"]}
        >
          Monthly Purchase Trend
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyPurchaseData} barCategoryGap="35%">
            <defs>
              <linearGradient
                id="monthlypurchase-bar-grad"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12,
                fill: "#94a3b8",
                fontFamily: "DM Sans, sans-serif",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fontSize: 12,
                fill: "#94a3b8",
                fontFamily: "DM Sans, sans-serif",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(v) => [`₹${v.toLocaleString()}`, "Amount"]}
              contentStyle={customTooltipStyle}
              cursor={{ fill: "rgba(99,102,241,0.05)", radius: 6 }}
            />
            <Bar
              dataKey="amount"
              fill="url(#monthlypurchase-bar-grad)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div
        className="monthlypurchase-table-card"
        style={styles["monthlypurchase-table-card"]}
      >
        <div
          className="monthlypurchase-table-scroll"
          style={styles["monthlypurchase-table-scroll"]}
        >
          <table
            className="monthlypurchase-table"
            style={styles["monthlypurchase-table"]}
          >
            <thead
              className="monthlypurchase-thead"
              style={styles["monthlypurchase-thead"]}
            >
              <tr>
                {["Month", "Total POs", "Delivered", "Total Amount"].map(
                  (h) => (
                    <th
                      key={h}
                      className="monthlypurchase-th"
                      style={styles["monthlypurchase-th"]}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {monthlyBreakdown.map((m, i) => (
                <tr
                  key={m.month}
                  className="monthlypurchase-tr"
                  style={{
                    ...styles["monthlypurchase-tr"],
                    background: hoveredRow === i ? "#f5f7ff" : "#ffffff",
                  }}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td
                    className="monthlypurchase-td-month"
                    style={styles["monthlypurchase-td-month"]}
                  >
                    {m.month}
                  </td>
                  <td
                    className="monthlypurchase-td"
                    style={styles["monthlypurchase-td"]}
                  >
                    <span
                      className="monthlypurchase-count-chip"
                      style={styles["monthlypurchase-count-chip"]}
                    >
                      {m.count}
                    </span>
                  </td>
                  <td
                    className="monthlypurchase-td"
                    style={styles["monthlypurchase-td"]}
                  >
                    <span
                      className="monthlypurchase-delivered-chip"
                      style={styles["monthlypurchase-delivered-chip"]}
                    >
                      {m.delivered}
                    </span>
                  </td>
                  <td
                    className="monthlypurchase-td-total"
                    style={styles["monthlypurchase-td-total"]}
                  >
                    ₹{m.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
