import { useState, useMemo } from "react";

// ── Mock Stock-Out Data ────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  "Office Chair",
  "Standing Desk",
  'Monitor 27"',
  "Mechanical Keyboard",
  "Ethernet Cable 10m",
  "UPS 1500VA",
  "Webcam HD",
  "Printer Paper A4",
  "Wireless Mouse",
  "USB-C Hub",
  "Desk Lamp",
  "Surge Protector",
];

const CATEGORIES = {
  "Office Chair": "Furniture",
  "Standing Desk": "Furniture",
  'Monitor 27"': "Electronics",
  "Mechanical Keyboard": "Electronics",
  "Ethernet Cable 10m": "Networking",
  "UPS 1500VA": "Power",
  "Webcam HD": "Electronics",
  "Printer Paper A4": "Stationery",
  "Wireless Mouse": "Electronics",
  "USB-C Hub": "Electronics",
  "Desk Lamp": "Furniture",
  "Surge Protector": "Power",
};

const STOCK_OUT_EVENTS = [
  {
    id: 1,
    product: "Office Chair",
    date: "2026-01-05",
    qty: 12,
    location: "Warehouse A",
    reason: "High Demand",
    daysOut: 8,
  },
  {
    id: 2,
    product: "Webcam HD",
    date: "2026-01-08",
    qty: 30,
    location: "Warehouse B",
    reason: "Supply Delay",
    daysOut: 14,
  },
  {
    id: 3,
    product: "Mechanical Keyboard",
    date: "2026-01-11",
    qty: 20,
    location: "Warehouse A",
    reason: "High Demand",
    daysOut: 5,
  },
  {
    id: 4,
    product: "UPS 1500VA",
    date: "2026-01-15",
    qty: 6,
    location: "Warehouse C",
    reason: "Damaged Stock",
    daysOut: 20,
  },
  {
    id: 5,
    product: "Printer Paper A4",
    date: "2026-01-18",
    qty: 500,
    location: "Warehouse A",
    reason: "High Demand",
    daysOut: 3,
  },
  {
    id: 6,
    product: 'Monitor 27"',
    date: "2026-01-22",
    qty: 8,
    location: "Warehouse B",
    reason: "Vendor Delay",
    daysOut: 18,
  },
  {
    id: 7,
    product: "Standing Desk",
    date: "2026-01-25",
    qty: 5,
    location: "Warehouse A",
    reason: "Supply Delay",
    daysOut: 12,
  },
  {
    id: 8,
    product: "Wireless Mouse",
    date: "2026-01-28",
    qty: 45,
    location: "Warehouse C",
    reason: "High Demand",
    daysOut: 6,
  },
  {
    id: 9,
    product: "Ethernet Cable 10m",
    date: "2026-02-02",
    qty: 80,
    location: "Warehouse B",
    reason: "Logistics Issue",
    daysOut: 9,
  },
  {
    id: 10,
    product: "USB-C Hub",
    date: "2026-02-05",
    qty: 22,
    location: "Warehouse A",
    reason: "High Demand",
    daysOut: 4,
  },
  {
    id: 11,
    product: "Desk Lamp",
    date: "2026-02-08",
    qty: 15,
    location: "Warehouse C",
    reason: "Vendor Delay",
    daysOut: 11,
  },
  {
    id: 12,
    product: "Surge Protector",
    date: "2026-02-10",
    qty: 18,
    location: "Warehouse A",
    reason: "Damaged Stock",
    daysOut: 7,
  },
  {
    id: 13,
    product: "Webcam HD",
    date: "2026-02-12",
    qty: 10,
    location: "Warehouse B",
    reason: "High Demand",
    daysOut: 2,
  },
  {
    id: 14,
    product: "Office Chair",
    date: "2026-02-15",
    qty: 7,
    location: "Warehouse A",
    reason: "Supply Delay",
    daysOut: 16,
  },
  {
    id: 15,
    product: "Mechanical Keyboard",
    date: "2026-02-18",
    qty: 14,
    location: "Warehouse C",
    reason: "High Demand",
    daysOut: 3,
  },
  {
    id: 16,
    product: 'Monitor 27"',
    date: "2026-02-20",
    qty: 4,
    location: "Warehouse B",
    reason: "Vendor Delay",
    daysOut: 22,
  },
  {
    id: 17,
    product: "UPS 1500VA",
    date: "2026-02-22",
    qty: 9,
    location: "Warehouse A",
    reason: "Damaged Stock",
    daysOut: 5,
  },
  {
    id: 18,
    product: "Printer Paper A4",
    date: "2026-02-24",
    qty: 300,
    location: "Warehouse C",
    reason: "High Demand",
    daysOut: 1,
  },
];

const STATUS_CONFIG = {
  Critical: {
    bg: "#fff1f2",
    color: "#e11d48",
    border: "#fecdd3",
    dot: "#e11d48",
  },
  Pending: {
    bg: "#fffbeb",
    color: "#d97706",
    border: "#fde68a",
    dot: "#f59e0b",
  },
  Ordered: {
    bg: "#eff6ff",
    color: "#2563eb",
    border: "#bfdbfe",
    dot: "#3b82f6",
  },
  Restocked: {
    bg: "#f0fdf4",
    color: "#16a34a",
    border: "#bbf7d0",
    dot: "#22c55e",
  },
};

const REASON_COLORS = {
  "High Demand": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "Supply Delay": { bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
  "Damaged Stock": { bg: "#fff1f2", color: "#be123c", border: "#fecdd3" },
  "Vendor Delay": { bg: "#f0f9ff", color: "#0369a1", border: "#bae6fd" },
  "Logistics Issue": { bg: "#f5f3ff", color: "#6d28d9", border: "#ddd6fe" },
};

const CAT_COLORS = {
  Furniture: { bg: "#fef3c7", color: "#92400e" },
  Electronics: { bg: "#ede9fe", color: "#5b21b6" },
  Networking: { bg: "#e0f2fe", color: "#0369a1" },
  Power: { bg: "#fee2e2", color: "#991b1b" },
  Stationery: { bg: "#f0fdf4", color: "#166534" },
};

const STAT_CARDS = [
  {
    label: "Total Events",
    key: "total",
    accent: "#334155",
    bg: "#f8fafc",
    border: "#e2e8f0",
    bar: "#94a3b8",
  },
  {
    label: "Critical",
    key: "critical",
    accent: "#e11d48",
    bg: "#fff1f2",
    border: "#fecdd3",
    bar: "#e11d48",
  },
  {
    label: "Pending Reorder",
    key: "pending",
    accent: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    bar: "#f59e0b",
  },
  {
    label: "Units Out",
    key: "totalQty",
    accent: "#6d28d9",
    bg: "#faf5ff",
    border: "#ddd6fe",
    bar: "#7c3aed",
  },
  {
    label: "Avg Days Out",
    key: "avgDays",
    accent: "#0369a1",
    bg: "#f0f9ff",
    border: "#bae6fd",
    bar: "#0ea5e9",
    suffix: "d",
  },
];

function formatDate(d) {
  if (!d) return "-";
  const [y, m, day] = d.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${day} ${months[+m - 1]} ${y}`;
}

export default function StockOutReport() {
  const [fromDate, setFromDate] = useState("2026-01-01");
  const [toDate, setToDate] = useState("2026-02-28");
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [sortCol, setSortCol] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [hoveredRow, setHoveredRow] = useState(null);

  const filtered = useMemo(() => {
    return STOCK_OUT_EVENTS.filter((ev) => {
      const inRange =
        (!fromDate || ev.date >= fromDate) && (!toDate || ev.date <= toDate);
      const matchProd =
        selectedProduct === "All Products" || ev.product === selectedProduct;
      return inRange && matchProd;
    }).sort((a, b) => {
      let av = a[sortCol],
        bv = b[sortCol];
      if (typeof av === "string") {
        av = av.toLowerCase();
        bv = bv.toLowerCase();
      }
      return sortDir === "asc" ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
    });
  }, [fromDate, toDate, selectedProduct, sortCol, sortDir]);

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("desc");
    }
  };

  const stats = useMemo(() => {
    const critical = filtered.filter(
      (e) => e.reorderStatus === "Critical",
    ).length;
    const pending = filtered.filter(
      (e) => e.reorderStatus === "Pending",
    ).length;
    const totalQty = filtered.reduce((s, e) => s + e.qty, 0);
    const avgDays = filtered.length
      ? Math.round(
          filtered.reduce((s, e) => s + e.daysOut, 0) / filtered.length,
        )
      : 0;
    return { critical, pending, totalQty, avgDays, total: filtered.length };
  }, [filtered]);

  const SortIcon = ({ col }) => (
    <span
      style={{
        fontSize: 9,
        marginLeft: 4,
        opacity: sortCol === col ? 1 : 0.3,
        fontWeight: 900,
      }}
    >
      {sortCol === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  return (
    <div style={s.root}>
      {/* ── Top strip ── */}
      <div style={s.topStrip}>
        <div style={s.titleBlock}>
          {/* <div style={s.titleIcon}>
            <div style={s.titleIconInner} />
          </div> */}
          <div>
            <h1 style={s.title}>Stock-Out Report</h1>
            <p style={s.subtitle}>
              Track inventory shortages, reasons &amp; reorder status
            </p>
          </div>
        </div>

        <div style={s.filtersRow}>
          <div style={s.filterGroup}>
            <label style={s.filterLabel}>From Date</label>
            <input
              type="date"
              style={s.dateInput}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div style={s.filterSep}>&#8594;</div>

          <div style={s.filterGroup}>
            <label style={s.filterLabel}>To Date</label>
            <input
              type="date"
              style={s.dateInput}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div style={{ ...s.filterGroup, minWidth: 200 }}>
            <label style={s.filterLabel}>Product</label>
            <select
              style={s.selectInput}
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="All Products">All Products</option>
              {ALL_PRODUCTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <button
            style={s.clearBtn}
            onClick={() => {
              setFromDate("2026-01-01");
              setToDate("2026-02-28");
              setSelectedProduct("All Products");
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div style={s.statsRow}>
        {STAT_CARDS.map(({ label, key, accent, bg, border, bar, suffix }) => {
          const raw = stats[key];
          const value = suffix ? `${raw}${suffix}` : raw;
          return (
            <div
              key={label}
              style={{
                ...s.statCard,
                background: bg,
                border: `1.5px solid ${border}`,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 36,
                  borderRadius: 99,
                  background: bar,
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: accent,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#94a3b8",
                    marginTop: 3,
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Table ── */}
      <div style={s.tableWrap}>
        {filtered.length === 0 ? (
          <div style={s.emptyState}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#f1f5f9",
                border: "1.5px solid #e2e8f0",
                margin: "0 auto 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  border: "2.5px solid #cbd5e1",
                  borderRadius: 3,
                }}
              />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#334155" }}>
              No stock-out events found
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>
              Try adjusting the date range or product filter
            </div>
          </div>
        ) : (
          <table style={s.table}>
            <thead>
              <tr>
                {[
                  { key: "id", label: "#", w: 44 },
                  { key: "product", label: "Product", w: 180 },
                  { key: "date", label: "Date", w: 120 },
                  { key: "qty", label: "Qty Out", w: 90 },
                  { key: "location", label: "Location", w: 130 },
                  { key: "reason", label: "Reason", w: 150 },
                  { key: "daysOut", label: "Days Out", w: 100 },
                  // { key: "reorderStatus", label: "Status",   w: 120 },
                ].map(({ key, label, w }) => (
                  <th
                    key={key}
                    style={{
                      ...s.th,
                      minWidth: w,
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    onClick={() => toggleSort(key)}
                  >
                    {label}
                    <SortIcon col={key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((ev, idx) => {
                const sc = STATUS_CONFIG[ev.reorderStatus];
                const cat = CATEGORIES[ev.product];
                const cc = CAT_COLORS[cat] || {
                  bg: "#f1f5f9",
                  color: "#475569",
                };
                const rc = REASON_COLORS[ev.reason] || {
                  bg: "#f1f5f9",
                  color: "#475569",
                  border: "#e2e8f0",
                };
                const isHovered = hoveredRow === ev.id;

                return (
                  <tr
                    key={ev.id}
                    style={{
                      background: isHovered
                        ? "#f8fafc"
                        : idx % 2 === 0
                          ? "white"
                          : "#fafafa",
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background 0.12s",
                      cursor: "default",
                    }}
                    onMouseEnter={() => setHoveredRow(ev.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {/* # */}
                    <td
                      style={{
                        ...s.td,
                        color: "#94a3b8",
                        fontWeight: 700,
                        fontSize: 11,
                        textAlign: "center",
                      }}
                    >
                      {idx + 1}
                    </td>

                    {/* Product + category pill */}
                    <td style={s.td}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#1e293b",
                        }}
                      >
                        {ev.product}
                      </div>
                      <span
                        style={{
                          display: "inline-block",
                          marginTop: 3,
                          fontSize: 9,
                          fontWeight: 700,
                          background: cc.bg,
                          color: cc.color,
                          padding: "1px 6px",
                          borderRadius: 4,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {cat}
                      </span>
                    </td>

                    {/* Date */}
                    <td
                      style={{
                        ...s.td,
                        fontSize: 12,
                        color: "#475569",
                        fontWeight: 600,
                      }}
                    >
                      {formatDate(ev.date)}
                    </td>

                    {/* Qty */}
                    <td style={{ ...s.td, textAlign: "center" }}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 800,
                          color:
                            ev.qty >= 50
                              ? "#e11d48"
                              : ev.qty >= 20
                                ? "#d97706"
                                : "#334155",
                        }}
                      >
                        {ev.qty}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#94a3b8",
                          marginLeft: 2,
                        }}
                      >
                        units
                      </span>
                    </td>

                    {/* Location */}
                    <td style={s.td}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          background: "#f1f5f9",
                          border: "1px solid #e2e8f0",
                          borderRadius: 6,
                          padding: "3px 9px",
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#475569",
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 2,
                            background: "#94a3b8",
                            flexShrink: 0,
                          }}
                        />
                        {ev.location}
                      </div>
                    </td>

                    {/* Reason — colored tag */}
                    <td style={s.td}>
                      <span
                        style={{
                          display: "inline-block",
                          background: rc.bg,
                          color: rc.color,
                          border: `1px solid ${rc.border}`,
                          borderRadius: 6,
                          padding: "3px 9px",
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {ev.reason}
                      </span>
                    </td>

                    {/* Days Out */}
                    <td style={{ ...s.td, textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color:
                              ev.daysOut >= 15
                                ? "#e11d48"
                                : ev.daysOut >= 7
                                  ? "#d97706"
                                  : "#16a34a",
                          }}
                        >
                          {ev.daysOut}d
                        </span>
                        <div
                          style={{
                            width: 50,
                            height: 4,
                            background: "#f1f5f9",
                            borderRadius: 99,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${Math.min((ev.daysOut / 25) * 100, 100)}%`,
                              background:
                                ev.daysOut >= 15
                                  ? "#e11d48"
                                  : ev.daysOut >= 7
                                    ? "#f59e0b"
                                    : "#22c55e",
                              borderRadius: 99,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Reorder Status
                    <td style={s.td}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          background: sc.bg,
                          color: sc.color,
                          border: `1px solid ${sc.border}`,
                          borderRadius: 20,
                          padding: "4px 10px",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: sc.dot,
                            flexShrink: 0,
                            boxShadow:
                              ev.reorderStatus === "Critical"
                                ? `0 0 6px ${sc.dot}`
                                : "none",
                          }}
                        />
                        {ev.reorderStatus}
                      </span>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={s.footer}>
        <span style={{ color: "#94a3b8", fontSize: 12 }}>
          Showing{" "}
          <strong style={{ color: "#334155" }}>{filtered.length}</strong> of{" "}
          <strong style={{ color: "#334155" }}>
            {STOCK_OUT_EVENTS.length}
          </strong>{" "}
          events
        </span>
        <div style={{ display: "flex", gap: 14 }}>
          {["Critical", "Pending", "Ordered", "Restocked"].map((st) => {
            const sc = STATUS_CONFIG[st];
            return (
              <div
                key={st}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  color: sc.color,
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: sc.dot,
                  }}
                />
                {st}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const s = {
  root: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    background: "#f8fafc",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  topStrip: {
    background: "white",
    borderBottom: "1px solid #e2e8f0",
    padding: "20px 28px 18px",
    flexShrink: 0,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap",
  },
  titleBlock: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  titleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
    border: "1.5px solid #fecaca",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  titleIconInner: {
    width: 18,
    height: 18,
    borderRadius: 3,
    background: "#e11d48",
    opacity: 0.85,
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    margin: "3px 0 0",
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: 500,
  },
  filtersRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 12,
    flexWrap: "wrap",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },
  filterSep: {
    fontSize: 16,
    color: "#cbd5e1",
    paddingBottom: 9,
    fontWeight: 600,
  },
  dateInput: {
    padding: "9px 12px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 13,
    fontFamily: "inherit",
    color: "#1e293b",
    background: "#fff",
    outline: "none",
    cursor: "pointer",
    minWidth: 150,
    fontWeight: 600,
  },
  selectInput: {
    padding: "9px 12px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 13,
    fontFamily: "inherit",
    color: "#1e293b",
    background: "#fff",
    outline: "none",
    cursor: "pointer",
    width: "100%",
    fontWeight: 600,
  },
  clearBtn: {
    padding: "9px 18px",
    background: "#f8fafc",
    color: "#475569",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.02em",
    marginBottom: 1,
  },
  statsRow: {
    display: "flex",
    gap: 12,
    padding: "16px 28px",
    flexShrink: 0,
    flexWrap: "wrap",
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "12px 18px",
    borderRadius: 12,
    flex: "1 1 120px",
    minWidth: 120,
  },
  tableWrap: {
    flex: 1,
    overflowX: "auto",
    overflowY: "auto",
    margin: "0 28px",
    background: "white",
    borderRadius: 14,
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 900,
  },
  th: {
    textAlign: "left",
    padding: "11px 14px",
    fontSize: 11,
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    borderBottom: "2px solid #f1f5f9",
    background: "#f8fafc",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "11px 14px",
    fontSize: 13,
    color: "#334155",
    verticalAlign: "middle",
  },
  emptyState: {
    padding: "80px 20px",
    textAlign: "center",
    color: "#94a3b8",
  },
  footer: {
    padding: "14px 28px",
    borderTop: "1px solid #e2e8f0",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
    flexWrap: "wrap",
    gap: 10,
    marginTop: "auto",
  },
};
