import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { stocks as initialData } from '../data/data';

const styles = {
  "stockmgmt-page": {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #fafbff 50%, #f5f7ff 100%)",
    padding: "32px 24px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: "#1e293b",
  },
  "stockmgmt-header": {
    marginBottom: "32px",
    borderLeft: "3px solid #6366f1",
    paddingLeft: "16px",
  },
  "stockmgmt-title": {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
  },
  "stockmgmt-subtitle": {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
    letterSpacing: "0.3px",
  },
  "stockmgmt-stats-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  "stockmgmt-stat-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
    transition: "box-shadow 0.2s",
  },
  "stockmgmt-stat-icon-ok": {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "800",
    color: "#059669",
    flexShrink: 0,
  },
  "stockmgmt-stat-icon-low": {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "800",
    color: "#d97706",
    flexShrink: 0,
  },
  "stockmgmt-stat-icon-critical": {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "800",
    color: "#dc2626",
    flexShrink: 0,
  },
  "stockmgmt-stat-label": {
    fontSize: "11px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    fontWeight: "600",
    marginBottom: "2px",
  },
  "stockmgmt-stat-desc": {
    fontSize: "13px",
    fontWeight: "700",
    color: "#334155",
  },
  "stockmgmt-table-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "stockmgmt-search-wrap": {
    padding: "18px 20px",
    borderBottom: "1px solid #f1f5f9",
  },
  "stockmgmt-search-box": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#f8fafc",
    border: "1.5px solid #e2e8f0",
    borderRadius: "9px",
    padding: "9px 14px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  "stockmgmt-search-icon": {
    color: "#94a3b8",
    fontSize: "16px",
    flexShrink: 0,
  },
  "stockmgmt-search-input": {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    color: "#1e293b",
    width: "100%",
  },
  "stockmgmt-table-scroll": {
    overflowX: "auto",
  },
  "stockmgmt-table": {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13.5px",
  },
  "stockmgmt-thead": {
    background: "#f8fafc",
    borderBottom: "1.5px solid #e2e8f0",
  },
  "stockmgmt-th": {
    padding: "14px 18px",
    textAlign: "left",
    fontSize: "10.5px",
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.9px",
    whiteSpace: "nowrap",
  },
  "stockmgmt-tr": {
    borderBottom: "1px solid #f1f5f9",
    transition: "background 0.15s",
  },
  "stockmgmt-td": {
    padding: "14px 18px",
    color: "#475569",
    verticalAlign: "middle",
  },
  "stockmgmt-td-index": {
    padding: "14px 18px",
    color: "#cbd5e1",
    fontSize: "12px",
    fontWeight: "600",
    verticalAlign: "middle",
  },
  "stockmgmt-td-product": {
    padding: "14px 18px",
    fontWeight: "700",
    color: "#1e293b",
    verticalAlign: "middle",
  },
  "stockmgmt-td-qty": {
    padding: "14px 18px",
    fontWeight: "700",
    color: "#1e293b",
    verticalAlign: "middle",
  },
  "stockmgmt-td-date": {
    padding: "14px 18px",
    color: "#94a3b8",
    fontSize: "12px",
    fontFamily: "monospace",
    verticalAlign: "middle",
  },
};

const skuBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 10px",
  borderRadius: "20px",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.4px",
  background: "#eef2ff",
  color: "#6366f1",
  border: "1px solid #c7d2fe",
  fontFamily: "monospace",
};

const statusBadgeStyle = (label) => {
  const map = {
    OK:       { background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" },
    Low:      { background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a" },
    Critical: { background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" },
  };
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.4px",
    ...(map[label] || map.OK),
  };
};

const dotColor = { OK: "#10b981", Low: "#f59e0b", Critical: "#ef4444" };

export default function Stock() {
  const [search, setSearch] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const getStatus = (qty, reorder) => {
    if (qty <= reorder * 0.3) return { label: 'Critical' };
    if (qty <= reorder) return { label: 'Low' };
    return { label: 'OK' };
  };

  const filtered = initialData.filter(
    (s) =>
      s.product.toLowerCase().includes(search.toLowerCase()) ||
      s.sku.toLowerCase().includes(search.toLowerCase())
  );

  const criticalCount = initialData.filter((s) => s.currentQty <= s.reorderLevel * 0.3).length;
  const lowCount = initialData.filter((s) => s.currentQty > s.reorderLevel * 0.3 && s.currentQty <= s.reorderLevel).length;
  const okCount = initialData.filter((s) => s.currentQty > s.reorderLevel).length;

  return (
    <div className="stockmgmt-page" style={styles["stockmgmt-page"]}>
      {/* Header */}
      <div className="stockmgmt-header" style={styles["stockmgmt-header"]}>
        <h1 className="stockmgmt-title" style={styles["stockmgmt-title"]}>
          Stock Management
        </h1>
        <p className="stockmgmt-subtitle" style={styles["stockmgmt-subtitle"]}>
          Current inventory levels
        </p>
      </div>

      {/* Quick Stats */}
      <div className="stockmgmt-stats-grid" style={styles["stockmgmt-stats-grid"]}>
        <div className="stockmgmt-stat-card" style={styles["stockmgmt-stat-card"]}>
          <div className="stockmgmt-stat-icon-ok" style={styles["stockmgmt-stat-icon-ok"]}>
            {okCount}
          </div>
          <div>
            <p className="stockmgmt-stat-label" style={styles["stockmgmt-stat-label"]}>OK Stock</p>
            <p className="stockmgmt-stat-desc" style={styles["stockmgmt-stat-desc"]}>Adequate Level</p>
          </div>
        </div>
        <div className="stockmgmt-stat-card" style={styles["stockmgmt-stat-card"]}>
          <div className="stockmgmt-stat-icon-low" style={styles["stockmgmt-stat-icon-low"]}>
            {lowCount}
          </div>
          <div>
            <p className="stockmgmt-stat-label" style={styles["stockmgmt-stat-label"]}>Low Stock</p>
            <p className="stockmgmt-stat-desc" style={styles["stockmgmt-stat-desc"]}>Needs Reorder</p>
          </div>
        </div>
        <div className="stockmgmt-stat-card" style={styles["stockmgmt-stat-card"]}>
          <div className="stockmgmt-stat-icon-critical" style={styles["stockmgmt-stat-icon-critical"]}>
            {criticalCount}
          </div>
          <div>
            <p className="stockmgmt-stat-label" style={styles["stockmgmt-stat-label"]}>Critical</p>
            <p className="stockmgmt-stat-desc" style={styles["stockmgmt-stat-desc"]}>Immediate Action</p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="stockmgmt-table-card" style={styles["stockmgmt-table-card"]}>
        {/* Search */}
        <div className="stockmgmt-search-wrap" style={styles["stockmgmt-search-wrap"]}>
          <div
            className="stockmgmt-search-box"
            style={{
              ...styles["stockmgmt-search-box"],
              borderColor: searchFocused ? "#6366f1" : "#e2e8f0",
              boxShadow: searchFocused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
              background: searchFocused ? "#ffffff" : "#f8fafc",
            }}
          >
            <HiOutlineSearch
              className="stockmgmt-search-icon"
              style={styles["stockmgmt-search-icon"]}
            />
            <input
              className="stockmgmt-search-input"
              style={styles["stockmgmt-search-input"]}
              type="text"
              placeholder="Search by product or SKU..."
              value={search}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="stockmgmt-table-scroll" style={styles["stockmgmt-table-scroll"]}>
          <table className="stockmgmt-table" style={styles["stockmgmt-table"]}>
            <thead className="stockmgmt-thead" style={styles["stockmgmt-thead"]}>
              <tr>
                {["#", "SKU", "Product", "Current Qty", "Unit", "Reorder Level", "Status", "Last Updated"].map((h) => (
                  <th key={h} className="stockmgmt-th" style={styles["stockmgmt-th"]}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const status = getStatus(s.currentQty, s.reorderLevel);
                return (
                  <tr
                    key={s.id}
                    className="stockmgmt-tr"
                    style={{
                      ...styles["stockmgmt-tr"],
                      background: hoveredRow === i ? "#f5f7ff" : "#ffffff",
                    }}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="stockmgmt-td-index" style={styles["stockmgmt-td-index"]}>
                      {i + 1}
                    </td>
                    <td className="stockmgmt-td" style={styles["stockmgmt-td"]}>
                      <span className="stockmgmt-sku-badge" style={skuBadgeStyle}>{s.sku}</span>
                    </td>
                    <td className="stockmgmt-td-product" style={styles["stockmgmt-td-product"]}>
                      {s.product}
                    </td>
                    <td className="stockmgmt-td-qty" style={styles["stockmgmt-td-qty"]}>
                      {s.currentQty}
                    </td>
                    <td className="stockmgmt-td" style={{ ...styles["stockmgmt-td"], color: "#94a3b8", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {s.unit}
                    </td>
                    <td className="stockmgmt-td" style={styles["stockmgmt-td"]}>
                      {s.reorderLevel}
                    </td>
                    <td className="stockmgmt-td" style={styles["stockmgmt-td"]}>
                      <span className="stockmgmt-status-badge" style={statusBadgeStyle(status.label)}>
                        <span style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: dotColor[status.label],
                          display: "inline-block",
                          flexShrink: 0,
                        }} />
                        {status.label}
                      </span>
                    </td>
                    <td className="stockmgmt-td-date" style={styles["stockmgmt-td-date"]}>
                      {s.lastUpdated}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "56px", color: "#94a3b8", fontSize: "14px" }}>
                    <div style={{ fontSize: "32px", marginBottom: "10px", opacity: 0.4 }}>📦</div>
                    No products match your search
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