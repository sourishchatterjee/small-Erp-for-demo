// import { useState } from 'react';
// import { HiOutlineSearch } from 'react-icons/hi';
// import { stocks } from '../../data/data';

// export default function StockReport() {
//     const [search, setSearch] = useState('');

//     const getStatus = (qty, reorder) => {
//         if (qty <= reorder * 0.3) return { label: 'Critical', cls: 'badge-danger' };
//         if (qty <= reorder) return { label: 'Low', cls: 'badge-warning' };
//         return { label: 'OK', cls: 'badge-success' };
//     };

//     const filtered = stocks.filter(
//         (s) => s.product.toLowerCase().includes(search.toLowerCase()) || s.sku.toLowerCase().includes(search.toLowerCase())
//     ); 

//     const totalItems = stocks.length;
//     const lowItems = stocks.filter((s) => s.currentQty <= s.reorderLevel).length;
//     const critItems = stocks.filter((s) => s.currentQty <= s.reorderLevel * 0.3).length;

//     return (
//         <div>
//             <div className="page-header">
//                 <div>
//                     <h1 className="page-title">Stock Wise Report</h1>
//                     <p className="page-subtitle">Inventory level analysis</p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
//                 <div className="card p-4"><p className="text-xs text-slate-400">Total Products</p><p className="text-2xl font-bold text-slate-800">{totalItems}</p></div>
//                 <div className="card p-4"><p className="text-xs text-slate-400">OK Level</p><p className="text-2xl font-bold text-green-600">{totalItems - lowItems}</p></div>
//                 <div className="card p-4"><p className="text-xs text-slate-400">Low Level</p><p className="text-2xl font-bold text-amber-600">{lowItems - critItems}</p></div>
//                 <div className="card p-4"><p className="text-xs text-slate-400">Critical</p><p className="text-2xl font-bold text-red-600">{critItems}</p></div>
//             </div>

//             <div className="card p-5">
//                 <div className="mb-4">
//                     <div className="search-box">
//                         <HiOutlineSearch className="search-icon" />
//                         <input type="text" placeholder="Search stock..." value={search} onChange={(e) => setSearch(e.target.value)} />
//                     </div>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="erp-table">
//                         <thead>
//                             <tr><th>SKU</th><th>Product</th><th>Qty</th><th>Unit</th><th>Reorder</th><th>Deficit</th><th>Status</th></tr>
//                         </thead>
//                         <tbody>
//                             {filtered.map((s) => {
//                                 const status = getStatus(s.currentQty, s.reorderLevel);
//                                 const deficit = s.currentQty < s.reorderLevel ? s.reorderLevel - s.currentQty : 0;
//                                 return (
//                                     <tr key={s.id}>
//                                         <td><span className="badge badge-info">{s.sku}</span></td>
//                                         <td className="font-semibold">{s.product}</td>
//                                         <td className="font-medium">{s.currentQty}</td>
//                                         <td>{s.unit}</td>
//                                         <td>{s.reorderLevel}</td>
//                                         <td className={deficit ? 'text-red-500 font-medium' : 'text-slate-400'}>{deficit || '—'}</td>
//                                         <td><span className={`badge ${status.cls}`}>{status.label}</span></td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }







import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { stocks } from '../../data/data';

const styles = {
  "stockrepo-page": {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #fafbff 50%, #f5f7ff 100%)",
    padding: "32px 24px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: "#1e293b",
  },
  "stockrepo-header": {
    marginBottom: "32px",
    borderLeft: "3px solid #6366f1",
    paddingLeft: "16px",
  },
  "stockrepo-title": {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
  },
  "stockrepo-subtitle": {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
    letterSpacing: "0.3px",
  },
  "stockrepo-stats-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  "stockrepo-stat-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "stockrepo-stat-accent-indigo": {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #6366f1, #818cf8)",
    borderRadius: "14px 14px 0 0",
  },
  "stockrepo-stat-accent-emerald": {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #10b981, #34d399)",
    borderRadius: "14px 14px 0 0",
  },
  "stockrepo-stat-accent-amber": {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #f59e0b, #fcd34d)",
    borderRadius: "14px 14px 0 0",
  },
  "stockrepo-stat-accent-red": {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #ef4444, #fca5a5)",
    borderRadius: "14px 14px 0 0",
  },
  "stockrepo-stat-label": {
    fontSize: "11px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "8px",
    fontWeight: "600",
  },
  "stockrepo-stat-value": {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    lineHeight: 1,
  },
  "stockrepo-stat-value-emerald": {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #10b981, #34d399)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1,
  },
  "stockrepo-stat-value-amber": {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1,
  },
  "stockrepo-stat-value-red": {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #ef4444, #f87171)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1,
  },
  "stockrepo-table-card": {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
  },
  "stockrepo-search-wrap": {
    padding: "18px 20px",
    borderBottom: "1px solid #f1f5f9",
  },
  "stockrepo-search-box": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#f8fafc",
    border: "1.5px solid #e2e8f0",
    borderRadius: "9px",
    padding: "9px 14px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  "stockrepo-search-icon": {
    color: "#94a3b8",
    fontSize: "16px",
    flexShrink: 0,
  },
  "stockrepo-search-input": {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    color: "#1e293b",
    width: "100%",
  },
  "stockrepo-table-scroll": {
    overflowX: "auto",
  },
  "stockrepo-table": {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13.5px",
  },
  "stockrepo-thead": {
    background: "#f8fafc",
    borderBottom: "1.5px solid #e2e8f0",
  },
  "stockrepo-th": {
    padding: "14px 18px",
    textAlign: "left",
    fontSize: "10.5px",
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.9px",
    whiteSpace: "nowrap",
  },
  "stockrepo-tr": {
    borderBottom: "1px solid #f1f5f9",
    transition: "background 0.15s",
  },
  "stockrepo-td": {
    padding: "14px 18px",
    color: "#475569",
    verticalAlign: "middle",
  },
  "stockrepo-td-product": {
    padding: "14px 18px",
    fontWeight: "700",
    color: "#1e293b",
    verticalAlign: "middle",
  },
  "stockrepo-td-qty": {
    padding: "14px 18px",
    fontWeight: "700",
    color: "#1e293b",
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
    OK: { background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" },
    Low: { background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a" },
    Critical: { background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" },
  };
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.4px",
    ...(map[label] || map.OK),
  };
};

export default function StockReport() {
  const [search, setSearch] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const getStatus = (qty, reorder) => {
    if (qty <= reorder * 0.3) return { label: 'Critical' };
    if (qty <= reorder) return { label: 'Low' };
    return { label: 'OK' };
  };

  const filtered = stocks.filter(
    (s) =>
      s.product.toLowerCase().includes(search.toLowerCase()) ||
      s.sku.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = stocks.length;
  const lowItems = stocks.filter((s) => s.currentQty <= s.reorderLevel).length;
  const critItems = stocks.filter((s) => s.currentQty <= s.reorderLevel * 0.3).length;

  return (
    <div className="stockrepo-page" style={styles["stockrepo-page"]}>
      {/* Header */}
      <div className="stockrepo-header" style={styles["stockrepo-header"]}>
        <h1 className="stockrepo-title" style={styles["stockrepo-title"]}>
          Stock Wise Report
        </h1>
        <p className="stockrepo-subtitle" style={styles["stockrepo-subtitle"]}>
          Inventory level analysis
        </p>
      </div>

      {/* Stats */}
      <div className="stockrepo-stats-grid" style={styles["stockrepo-stats-grid"]}>
        <div className="stockrepo-stat-card" style={styles["stockrepo-stat-card"]}>
          <div style={styles["stockrepo-stat-accent-indigo"]} />
          <p className="stockrepo-stat-label" style={styles["stockrepo-stat-label"]}>Total Products</p>
          <p className="stockrepo-stat-value" style={styles["stockrepo-stat-value"]}>{totalItems}</p>
        </div>
        <div className="stockrepo-stat-card" style={styles["stockrepo-stat-card"]}>
          <div style={styles["stockrepo-stat-accent-emerald"]} />
          <p className="stockrepo-stat-label" style={styles["stockrepo-stat-label"]}>OK Level</p>
          <p className="stockrepo-stat-value-emerald" style={styles["stockrepo-stat-value-emerald"]}>{totalItems - lowItems}</p>
        </div>
        <div className="stockrepo-stat-card" style={styles["stockrepo-stat-card"]}>
          <div style={styles["stockrepo-stat-accent-amber"]} />
          <p className="stockrepo-stat-label" style={styles["stockrepo-stat-label"]}>Low Level</p>
          <p className="stockrepo-stat-value-amber" style={styles["stockrepo-stat-value-amber"]}>{lowItems - critItems}</p>
        </div>
        <div className="stockrepo-stat-card" style={styles["stockrepo-stat-card"]}>
          <div style={styles["stockrepo-stat-accent-red"]} />
          <p className="stockrepo-stat-label" style={styles["stockrepo-stat-label"]}>Critical</p>
          <p className="stockrepo-stat-value-red" style={styles["stockrepo-stat-value-red"]}>{critItems}</p>
        </div>
      </div>

      {/* Table Card */}
      <div className="stockrepo-table-card" style={styles["stockrepo-table-card"]}>
        {/* Search */}
        <div className="stockrepo-search-wrap" style={styles["stockrepo-search-wrap"]}>
          <div
            className="stockrepo-search-box"
            style={{
              ...styles["stockrepo-search-box"],
              borderColor: searchFocused ? "#6366f1" : "#e2e8f0",
              boxShadow: searchFocused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
              background: searchFocused ? "#ffffff" : "#f8fafc",
            }}
          >
            <HiOutlineSearch className="stockrepo-search-icon" style={styles["stockrepo-search-icon"]} />
            <input
              className="stockrepo-search-input"
              style={styles["stockrepo-search-input"]}
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
        <div className="stockrepo-table-scroll" style={styles["stockrepo-table-scroll"]}>
          <table className="stockrepo-table" style={styles["stockrepo-table"]}>
            <thead className="stockrepo-thead" style={styles["stockrepo-thead"]}>
              <tr>
                {["SKU", "Product", "Qty", "Unit", "Reorder", "Deficit", "Status"].map((h) => (
                  <th key={h} className="stockrepo-th" style={styles["stockrepo-th"]}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const status = getStatus(s.currentQty, s.reorderLevel);
                const deficit = s.currentQty < s.reorderLevel ? s.reorderLevel - s.currentQty : 0;
                return (
                  <tr
                    key={s.id}
                    className="stockrepo-tr"
                    style={{
                      ...styles["stockrepo-tr"],
                      background: hoveredRow === i ? "#f5f7ff" : "#ffffff",
                    }}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="stockrepo-td" style={styles["stockrepo-td"]}>
                      <span className="stockrepo-sku-badge" style={skuBadgeStyle}>{s.sku}</span>
                    </td>
                    <td className="stockrepo-td-product" style={styles["stockrepo-td-product"]}>
                      {s.product}
                    </td>
                    <td className="stockrepo-td-qty" style={styles["stockrepo-td-qty"]}>
                      {s.currentQty}
                    </td>
                    <td className="stockrepo-td" style={{ ...styles["stockrepo-td"], color: "#94a3b8", fontSize: "12px", fontWeight: "600" }}>
                      {s.unit}
                    </td>
                    <td className="stockrepo-td" style={styles["stockrepo-td"]}>
                      {s.reorderLevel}
                    </td>
                    <td className="stockrepo-td" style={{
                      ...styles["stockrepo-td"],
                      fontWeight: deficit ? "700" : "400",
                      color: deficit ? "#ef4444" : "#cbd5e1",
                    }}>
                      {deficit ? (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}>
                          <span style={{ fontSize: "11px" }}>▼</span>
                          {deficit}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="stockrepo-td" style={styles["stockrepo-td"]}>
                      <span className="stockrepo-status-badge" style={statusBadgeStyle(status.label)}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "56px",
                      color: "#94a3b8",
                      fontSize: "14px",
                    }}
                  >
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