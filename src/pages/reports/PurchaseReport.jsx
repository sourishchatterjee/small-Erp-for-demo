import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { purchaseOrders } from "../../data/data";

const styles = {
  // Layout
  wrapper: {
    padding: "24px",
    fontFamily: "'Inter', sans-serif",
  },

  // Page Header
  pageHeader: {
    marginBottom: "24px",
  },
  pageTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0",
  },
  pageSubtitle: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
  },

  // Summary Cards Grid
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    padding: "16px",
  },
  cardLabel: {
    fontSize: "11px",
    color: "#94a3b8",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: "0 0 6px 0",
  },
  cardValueSlate: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  cardValueBlue: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#2563eb",
    margin: 0,
  },
  cardValueEmerald: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#059669",
    margin: 0,
  },

  // Table Card
  tableCard: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    padding: "20px",
  },

  // Filter Row
  filterRow: {
    marginBottom: "16px",
  },
  select: {
    height: "36px",
    padding: "0 12px",
    fontSize: "13px",
    color: "#334155",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    outline: "none",
    cursor: "pointer",
    width: "176px",
    appearance: "auto",
  },

  // Table
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  thead: {
    backgroundColor: "#f8fafc",
  },
  th: {
    padding: "10px 14px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: "1px solid #e2e8f0",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "11px 14px",
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
    verticalAlign: "middle",
  },
  tdPoId: {
    padding: "11px 14px",
    borderBottom: "1px solid #f1f5f9",
    fontWeight: "600",
    color: "#2563eb",
    verticalAlign: "middle",
  },
  tdTotal: {
    padding: "11px 14px",
    borderBottom: "1px solid #f1f5f9",
    fontWeight: "500",
    color: "#334155",
    verticalAlign: "middle",
  },

  // Badges
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },
  badgeSuccess: {
    backgroundColor: "#f0fdf4",
    color: "#16a34a",
  },
  badgeInfo: {
    backgroundColor: "#eff6ff",
    color: "#3b82f6",
  },
  badgeWarning: {
    backgroundColor: "#fffbeb",
    color: "#d97706",
  },
  badgeGray: {
    backgroundColor: "#f1f5f9",
    color: "#64748b",
  },
};

const statusBadgeStyle = {
  Delivered: styles.badgeSuccess,
  Shipped: styles.badgeInfo,
  Approved: styles.badgeInfo,
  Pending: styles.badgeWarning,
  Draft: styles.badgeGray,
};

export default function PurchaseReport() {
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = filterStatus
    ? purchaseOrders.filter((po) => po.status === filterStatus)
    : purchaseOrders;

  const totalValue = filtered.reduce((s, po) => s + po.total, 0);

  return (
    <div className="purchasereports-wrapper" style={styles.wrapper}>
      {/* Page Header */}
      <div className="purchasereports-page-header" style={styles.pageHeader}>
        <h1 className="purchasereports-page-title" style={styles.pageTitle}>
          Purchase Wise Report
        </h1>
        <p
          className="purchasereports-page-subtitle"
          style={styles.pageSubtitle}
        >
          All purchase orders summary
        </p>
      </div>

      {/* Summary Cards */}
      <div className="purchasereports-summary-grid" style={styles.summaryGrid}>
        <div
          className="purchasereports-card purchasereports-card--total-pos"
          style={styles.card}
        >
          <p className="purchasereports-card-label" style={styles.cardLabel}>
            Total POs
          </p>
          <p
            className="purchasereports-card-value"
            style={styles.cardValueSlate}
          >
            {filtered.length}
          </p>
        </div>
        <div
          className="purchasereports-card purchasereports-card--total-value"
          style={styles.card}
        >
          <p className="purchasereports-card-label" style={styles.cardLabel}>
            Total Value
          </p>
          <p
            className="purchasereports-card-value"
            style={styles.cardValueBlue}
          >
            ₹{totalValue.toLocaleString()}
          </p>
        </div>
        <div
          className="purchasereports-card purchasereports-card--avg-value"
          style={styles.card}
        >
          <p className="purchasereports-card-label" style={styles.cardLabel}>
            Avg PO Value
          </p>
          <p
            className="purchasereports-card-value"
            style={styles.cardValueEmerald}
          >
            ₹
            {filtered.length
              ? Math.round(totalValue / filtered.length).toLocaleString()
              : 0}
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="purchasereports-table-card" style={styles.tableCard}>
        {/* Filter Row */}
        <div className="purchasereports-filter-row" style={styles.filterRow}>
          <select
            className="purchasereports-select"
            style={styles.select}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Draft</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>

        {/* Table */}
        <div
          className="purchasereports-table-wrapper"
          style={styles.tableWrapper}
        >
          <table className="purchasereports-table" style={styles.table}>
            <thead className="purchasereports-thead" style={styles.thead}>
              <tr className="purchasereports-tr">
                {["PO ID", "Vendor", "Date", "Items", "Total", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="purchasereports-th"
                      style={styles.th}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="purchasereports-tbody">
              {filtered.map((po) => (
                <tr key={po.id} className="purchasereports-tr">
                  <td
                    className="purchasereports-td purchasereports-td--po-id"
                    style={styles.tdPoId}
                  >
                    {po.id}
                  </td>
                  <td
                    className="purchasereports-td purchasereports-td--vendor"
                    style={styles.td}
                  >
                    {po.vendor}
                  </td>
                  <td
                    className="purchasereports-td purchasereports-td--date"
                    style={styles.td}
                  >
                    {po.date}
                  </td>
                  <td
                    className="purchasereports-td purchasereports-td--items"
                    style={styles.td}
                  >
                    {po.items.length} items
                  </td>
                  <td
                    className="purchasereports-td purchasereports-td--total"
                    style={styles.tdTotal}
                  >
                    ₹{po.total.toLocaleString()}
                  </td>
                  <td
                    className="purchasereports-td purchasereports-td--status"
                    style={styles.td}
                  >
                    <span
                      className="purchasereports-badge"
                      style={{
                        ...styles.badge,
                        ...statusBadgeStyle[po.status],
                      }}
                    >
                      {po.status}
                    </span>
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
