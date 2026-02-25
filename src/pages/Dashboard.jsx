// import {
//     HiOutlineCurrencyRupee,
//     HiOutlineClipboardList,
//     HiOutlineTruck,
//     HiOutlineExclamationCircle,
// } from 'react-icons/hi';
// import {
//     BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//     LineChart, Line, PieChart, Pie, Cell, Legend,
// } from 'recharts';
// import { dashboardStats, monthlyPurchaseData, stockTrendData, categoryData, purchaseOrders } from '../data/data';

// const statCards = [
//     { title: 'Total Stock Value', value: `₹${(dashboardStats.totalStockValue / 100000).toFixed(1)}L`, change: '+8.2%', icon: HiOutlineCurrencyRupee, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
//     { title: 'Pending POs', value: dashboardStats.pendingPOs, change: '2 new', icon: HiOutlineClipboardList, gradient: 'from-amber-400 to-orange-500', bg: 'bg-orange-50' },
//     { title: 'Active Vendors', value: dashboardStats.activeVendors, change: '+1 this month', icon: HiOutlineTruck, gradient: 'from-emerald-400 to-green-500', bg: 'bg-green-50' },
//     { title: 'Low Stock Items', value: dashboardStats.lowStockItems, change: 'Needs attention', icon: HiOutlineExclamationCircle, gradient: 'from-rose-400 to-red-500', bg: 'bg-red-50' },
// ];

// const statusColor = {
//     Delivered: 'badge-success',
//     Shipped: 'badge-info',
//     Approved: 'badge-info',
//     Pending: 'badge-warning',
//     Draft: 'badge-gray',
// };

// export default function Dashboard() {
//     return (
//         <div className="space-y-6">
//             {/* Stat Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
//                 {statCards.map((s) => {
//                     const Icon = s.icon;
//                     return (
//                         <div key={s.title} className="stat-card">
//                             <div className={`icon-box bg-gradient-to-br ${s.gradient} text-white shadow-md`}>
//                                 <Icon />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-slate-400 font-medium">{s.title}</p>
//                                 <p className="text-2xl font-bold text-slate-800 mt-0.5">{s.value}</p>
//                                 <p className="text-[11px] text-slate-400 mt-1">{s.change}</p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Charts Row */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Monthly Purchase */}
//                 <div className="card p-5">
//                     <h3 className="text-sm font-bold text-slate-700 mb-4">Monthly Purchase Trend</h3>
//                     <ResponsiveContainer width="100%" height={260}>
//                         <BarChart data={monthlyPurchaseData}>
//                             <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                             <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
//                             <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
//                             <Tooltip
//                                 contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.1)' }}
//                                 formatter={(v) => [`₹${(v / 1000).toFixed(0)}K`, 'Amount']}
//                             />
//                             <Bar dataKey="amount" fill="url(#blueGradient)" radius={[6, 6, 0, 0]} />
//                             <defs>
//                                 <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
//                                     <stop offset="0%" stopColor="#3b82f6" />
//                                     <stop offset="100%" stopColor="#93c5fd" />
//                                 </linearGradient>
//                             </defs>
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>

//                 {/* Stock Trend */}
//                 <div className="card p-5">
//                     <h3 className="text-sm font-bold text-slate-700 mb-4">Stock Levels Over Time</h3>
//                     <ResponsiveContainer width="100%" height={260}>
//                         <LineChart data={stockTrendData}>
//                             <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                             <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
//                             <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
//                             <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.1)' }} />
//                             <Line type="monotone" dataKey="steel" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
//                             <Line type="monotone" dataKey="copper" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4 }} />
//                             <Line type="monotone" dataKey="aluminum" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} />
//                             <Line type="monotone" dataKey="plastic" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
//                             <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>

//             {/* Pie Chart & Recent POs */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//                 <div className="card p-5">
//                     <h3 className="text-sm font-bold text-slate-700 mb-4">Stock by Category</h3>
//                     <ResponsiveContainer width="100%" height={250}>
//                         <PieChart>
//                             <Pie
//                                 data={categoryData}
//                                 cx="50%"
//                                 cy="50%"
//                                 innerRadius={55}
//                                 outerRadius={90}
//                                 paddingAngle={3}
//                                 dataKey="value"
//                             >
//                                 {categoryData.map((entry, i) => (
//                                     <Cell key={i} fill={entry.color} />
//                                 ))}
//                             </Pie>
//                             <Tooltip formatter={(v) => [`${v}%`, 'Share']} contentStyle={{ borderRadius: 10, border: 'none' }} />
//                             <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </div>

//                 <div className="card p-5 lg:col-span-2">
//                     <h3 className="text-sm font-bold text-slate-700 mb-4">Recent Purchase Orders</h3>
//                     <div className="overflow-x-auto">
//                         <table className="erp-table">
//                             <thead>
//                                 <tr>
//                                     <th>PO ID</th>
//                                     <th>Vendor</th>
//                                     <th>Date</th>
//                                     <th>Amount</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {purchaseOrders.slice(0, 5).map((po) => (
//                                     <tr key={po.id}>
//                                         <td className="font-semibold text-blue-600">{po.id}</td>
//                                         <td>{po.vendor}</td>
//                                         <td>{po.date}</td>
//                                         <td className="font-medium">₹{po.total.toLocaleString()}</td>
//                                         <td><span className={`badge ${statusColor[po.status]}`}>{po.status}</span></td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import {
    HiOutlineCurrencyRupee,
    HiOutlineClipboardList,
    HiOutlineTruck,
    HiOutlineExclamationCircle,
    HiOutlineArrowNarrowUp,
    HiOutlineArrowNarrowDown,
} from 'react-icons/hi';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area,
} from 'recharts';

// ── Mock Data ─────────────────────────────────────────────────
const monthlyPurchase = [
    { month: 'Sep', amount: 180000 },
    { month: 'Oct', amount: 210000 },
    { month: 'Nov', amount: 190000 },
    { month: 'Dec', amount: 290000 },
    { month: 'Jan', amount: 265000 },
    { month: 'Feb', amount: 360000 },
];

const stockTrend = [
    { month: 'Sep', steel: 720, copper: 640, aluminum: 310, plastic: 190 },
    { month: 'Oct', steel: 740, copper: 600, aluminum: 290, plastic: 210 },
    { month: 'Nov', steel: 800, copper: 580, aluminum: 320, plastic: 185 },
    { month: 'Dec', steel: 760, copper: 620, aluminum: 340, plastic: 200 },
    { month: 'Jan', steel: 790, copper: 680, aluminum: 300, plastic: 175 },
    { month: 'Feb', steel: 710, copper: 720, aluminum: 280, plastic: 160 },
];

const categoryData = [
    { name: 'Steel',    value: 38, color: '#3b82f6' },
    { name: 'Copper',   value: 22, color: '#06b6d4' },
    { name: 'Aluminum', value: 18, color: '#8b5cf6' },
    { name: 'Plastic',  value: 13, color: '#10b981' },
    { name: 'Others',   value: 9,  color: '#f59e0b' },
];

const areaData = [
    { month: 'Sep', received: 42, dispatched: 28 },
    { month: 'Oct', received: 55, dispatched: 34 },
    { month: 'Nov', received: 38, dispatched: 45 },
    { month: 'Dec', received: 70, dispatched: 52 },
    { month: 'Jan', received: 63, dispatched: 41 },
    { month: 'Feb', received: 80, dispatched: 60 },
];

const recentOrders = [
    { id: 'PO-2026-001', vendor: 'Tata Steel Ltd',      date: '2026-02-01', amount: 78000,  status: 'Delivered' },
    { id: 'PO-2026-002', vendor: 'Hindalco Industries', date: '2026-02-05', amount: 32000,  status: 'Shipped'   },
    { id: 'PO-2026-003', vendor: 'Finolex Cables',      date: '2026-02-08', amount: 122000, status: 'Approved'  },
    { id: 'PO-2026-004', vendor: 'Supreme Industries',  date: '2026-02-10', amount: 100400, status: 'Pending'   },
    { id: 'PO-2026-005', vendor: 'JSW Steel',           date: '2026-02-12', amount: 21600,  status: 'Draft'     },
];

const topVendors = [
    { name: 'Tata Steel Ltd',      orders: 18, amount: 480000, color: '#3b82f6' },
    { name: 'Hindalco Industries', orders: 12, amount: 312000, color: '#06b6d4' },
    { name: 'JSW Steel',           orders: 10, amount: 260000, color: '#8b5cf6' },
    { name: 'Finolex Cables',      orders: 8,  amount: 198000, color: '#10b981' },
];

const statCards = [
    {
        title: 'Total Stock Value', value: '₹12.9L', change: '+8.2%', up: true, sub: 'vs last month',
        icon: HiOutlineCurrencyRupee,
        iconBg: '#eff6ff', iconColor: '#2563eb',
        changeBg: '#f0fdf4', changeColor: '#15803d',
    },
    {
        title: 'Pending POs', value: '3', change: '+2', up: true, sub: 'new today',
        icon: HiOutlineClipboardList,
        iconBg: '#fff7ed', iconColor: '#ea580c',
        changeBg: '#fff7ed', changeColor: '#c2410c',
    },
    {
        title: 'Active Vendors', value: '5', change: '+1', up: true, sub: 'this month',
        icon: HiOutlineTruck,
        iconBg: '#f0fdf4', iconColor: '#16a34a',
        changeBg: '#f0fdf4', changeColor: '#15803d',
    },
    {
        title: 'Low Stock Items', value: '4', change: '-2', up: false, sub: 'needs reorder',
        icon: HiOutlineExclamationCircle,
        iconBg: '#fff1f2', iconColor: '#dc2626',
        changeBg: '#fff1f2', changeColor: '#b91c1c',
    },
];

const statusStyles = {
    Delivered: { background: '#dcfce7', color: '#15803d' },
    Shipped:   { background: '#dbeafe', color: '#1d4ed8' },
    Approved:  { background: '#cffafe', color: '#0e7490' },
    Pending:   { background: '#fef3c7', color: '#b45309' },
    Draft:     { background: '#f1f5f9', color: '#475569' },
};

// ── Styles object ─────────────────────────────────────────────
const S = {
    dbWrapper: {
        padding: '28px 24px',
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
    },
    dbPageHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
    },
    dbPageTitle: {
        fontSize: 22,
        fontWeight: 700,
        color: '#0f172a',
        lineHeight: 1.2,
        margin: 0,
    },
    dbPageSubtitle: {
        fontSize: 13,
        color: '#94a3b8',
        marginTop: 4,
    },
    dbDateBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        fontWeight: 600,
        color: '#64748b',
        background: '#fff',
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        padding: '8px 16px',
        borderRadius: 12,
    },
    dbGrid4: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20,
    },
    dbGrid2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
    },
    dbGrid3: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
    },
    dbCard: {
        background: '#ffffff',
        borderRadius: 18,
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        padding: 24,
    },
    dbStatCard: {
        background: '#ffffff',
        borderRadius: 18,
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        transition: 'box-shadow 0.2s, transform 0.2s',
        cursor: 'default',
    },
    dbStatIconBox: {
        width: 56,
        height: 56,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: 26,
    },
    dbStatLabel: {
        fontSize: 11,
        fontWeight: 700,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        margin: 0,
    },
    dbStatValue: {
        fontSize: 28,
        fontWeight: 800,
        color: '#0f172a',
        lineHeight: 1.1,
        margin: '4px 0 0',
    },
    dbStatChangeRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginTop: 6,
    },
    dbStatChangePill: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        fontSize: 11,
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: 999,
    },
    dbStatChangeSub: {
        fontSize: 11,
        color: '#94a3b8',
    },
    dbChartHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    dbChartTitle: {
        fontSize: 15,
        fontWeight: 700,
        color: '#0f172a',
        margin: 0,
    },
    dbChartSubtitle: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 3,
    },
    dbChartTag: {
        fontSize: 11,
        fontWeight: 700,
        padding: '5px 12px',
        borderRadius: 8,
        flexShrink: 0,
    },
    dbTooltip: {
        background: '#fff',
        border: '1px solid #f1f5f9',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        padding: '10px 14px',
        fontSize: 13,
    },
    dbTooltipLabel: {
        fontWeight: 700,
        color: '#334155',
        marginBottom: 4,
        fontSize: 12,
    },
    dbTooltipRow: {
        fontWeight: 600,
        fontSize: 12,
    },

    /* Table */
    dbTableWrap: { overflowX: 'auto', margin: '0 -4px' },
    dbTable: { width: '100%', borderCollapse: 'collapse' },
    dbTh: {
        textAlign: 'left',
        padding: '10px 12px',
        fontSize: 11,
        fontWeight: 700,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        borderBottom: '1px solid #f1f5f9',
        whiteSpace: 'nowrap',
        background: 'transparent',
    },
    dbTd: {
        padding: '13px 12px',
        fontSize: 13,
        color: '#334155',
        borderBottom: '1px solid #f8fafc',
    },
    dbTdPoId: {
        padding: '13px 12px',
        fontSize: 13,
        fontWeight: 700,
        color: '#2563eb',
        borderBottom: '1px solid #f8fafc',
        whiteSpace: 'nowrap',
    },
    dbTdAmt: {
        padding: '13px 12px',
        fontSize: 13,
        fontWeight: 700,
        color: '#0f172a',
        borderBottom: '1px solid #f8fafc',
        whiteSpace: 'nowrap',
    },
    dbBadge: {
        display: 'inline-block',
        fontSize: 11.5,
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: 999,
        letterSpacing: '0.02em',
    },

    /* Vendor bars */
    dbVendorRow: { marginBottom: 18 },
    dbVendorTop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    dbVendorLeft: { display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 },
    dbVendorBadge: {
        width: 28,
        height: 28,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
    },
    dbVendorName: {
        fontSize: 13,
        fontWeight: 600,
        color: '#334155',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    dbVendorAmt: {
        fontSize: 12,
        fontWeight: 700,
        color: '#0f172a',
        flexShrink: 0,
        marginLeft: 8,
    },
    dbBarTrack: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    dbBarBg: {
        flex: 1,
        height: 6,
        background: '#f1f5f9',
        borderRadius: 999,
        overflow: 'hidden',
    },
    dbBarFill: {
        height: '100%',
        borderRadius: 999,
        transition: 'width 0.5s ease',
    },
    dbBarLabel: {
        fontSize: 11,
        color: '#94a3b8',
        fontWeight: 500,
        width: 36,
        textAlign: 'right',
        flexShrink: 0,
    },

    /* Pie legend */
    dbPieLegend: { marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 },
    dbPieLegendRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dbPieLegendLeft: { display: 'flex', alignItems: 'center', gap: 8 },
    dbPieDot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
    dbPieName: { fontSize: 12.5, color: '#475569', fontWeight: 500 },
    dbPieVal: { fontSize: 12.5, fontWeight: 700, color: '#0f172a' },

    /* View all btn */
    dbViewAllBtn: {
        fontSize: 12,
        fontWeight: 700,
        color: '#2563eb',
        background: '#eff6ff',
        border: 'none',
        padding: '6px 14px',
        borderRadius: 8,
        cursor: 'pointer',
    },
};

// ── Custom Recharts Tooltip ───────────────────────────────────
function DbTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={S.dbTooltip}>
            <p style={S.dbTooltipLabel}>{label}</p>
            {payload.map((p, i) => (
                <p key={i} style={{ ...S.dbTooltipRow, color: p.color }}>
                    {p.name}:{' '}
                    {p.value > 999 ? `₹${(p.value / 1000).toFixed(0)}K` : p.value}
                </p>
            ))}
        </div>
    );
}

// ── Dashboard ─────────────────────────────────────────────────
export default function Dashboard() {
    return (
        <div className="db-wrapper" style={S.dbWrapper}>

            {/* ── Page Header ── */}
            <div className="db-page-header" style={S.dbPageHeader}>
                <div className="db-page-heading">
                    <h1 className="db-page-title" style={S.dbPageTitle}>Dashboard</h1>
                    <p className="db-page-subtitle" style={S.dbPageSubtitle}>
                        Welcome back — here's what's happening today.
                    </p>
                </div>
                <div className="db-date-badge" style={S.dbDateBadge}>
                    📅&nbsp;
                    {new Date().toLocaleDateString('en-IN', {
                        weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
                    })}
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="db-stat-grid" style={S.dbGrid4}>
                {statCards.map((s) => {
                    const Icon = s.icon;
                    const Arrow = s.up ? HiOutlineArrowNarrowUp : HiOutlineArrowNarrowDown;
                    return (
                        <div className="db-stat-card" key={s.title} style={S.dbStatCard}>
                            <div
                                className="db-stat-icon-box"
                                style={{ ...S.dbStatIconBox, background: s.iconBg }}
                            >
                                <Icon style={{ fontSize: 26, color: s.iconColor }} />
                            </div>
                            <div className="db-stat-body" style={{ minWidth: 0, flex: 1 }}>
                                <p className="db-stat-label" style={S.dbStatLabel}>{s.title}</p>
                                <p className="db-stat-value" style={S.dbStatValue}>{s.value}</p>
                                <div className="db-stat-change-row" style={S.dbStatChangeRow}>
                                    <span
                                        className="db-stat-change-pill"
                                        style={{
                                            ...S.dbStatChangePill,
                                            background: s.changeBg,
                                            color: s.changeColor,
                                        }}
                                    >
                                        <Arrow style={{ fontSize: 12 }} />
                                        {s.change}
                                    </span>
                                    <span className="db-stat-change-sub" style={S.dbStatChangeSub}>
                                        {s.sub}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Row 2: Bar + Area ── */}
            <div className="db-charts-row-2" style={S.dbGrid2}>

                {/* Bar Chart */}
                <div className="db-card-bar" style={S.dbCard}>
                    <div className="db-chart-header" style={S.dbChartHeader}>
                        <div>
                            <h3 className="db-chart-title" style={S.dbChartTitle}>Monthly Purchase Trend</h3>
                            <p className="db-chart-subtitle" style={S.dbChartSubtitle}>Total purchase amount per month</p>
                        </div>
                        <span className="db-chart-tag-blue" style={{ ...S.dbChartTag, background: '#eff6ff', color: '#2563eb' }}>
                            FY 2026
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={monthlyPurchase} barSize={30} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="dbBarGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%"   stopColor="#3b82f6" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#bfdbfe" stopOpacity={0.8} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                            <Tooltip content={<DbTooltip />} cursor={{ fill: '#f8fafc', radius: 6 }} />
                            <Bar dataKey="amount" name="Amount" fill="url(#dbBarGrad)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Area Chart */}
                <div className="db-card-area" style={S.dbCard}>
                    <div className="db-chart-header" style={S.dbChartHeader}>
                        <div>
                            <h3 className="db-chart-title" style={S.dbChartTitle}>Stock Movement</h3>
                            <p className="db-chart-subtitle" style={S.dbChartSubtitle}>Received vs dispatched units</p>
                        </div>
                        <span className="db-chart-tag-green" style={{ ...S.dbChartTag, background: '#f0fdf4', color: '#16a34a' }}>
                            Live
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={areaData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="dbAreaBlue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="dbAreaGreen" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<DbTooltip />} cursor={{ stroke: '#e2e8f0' }} />
                            <Area type="monotone" dataKey="received"   name="Received"   stroke="#3b82f6" strokeWidth={2.5} fill="url(#dbAreaBlue)"  dot={{ r: 3.5, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                            <Area type="monotone" dataKey="dispatched" name="Dispatched" stroke="#10b981" strokeWidth={2.5} fill="url(#dbAreaGreen)" dot={{ r: 3.5, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                            <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12, paddingTop: 14 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ── Row 3: Line + Donut Pie ── */}
            <div className="db-charts-row-3" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>

                {/* Line Chart */}
                <div className="db-card-line" style={S.dbCard}>
                    <div className="db-chart-header" style={S.dbChartHeader}>
                        <div>
                            <h3 className="db-chart-title" style={S.dbChartTitle}>Stock Levels Over Time</h3>
                            <p className="db-chart-subtitle" style={S.dbChartSubtitle}>Material-wise inventory trend</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={stockTrend} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<DbTooltip />} cursor={{ stroke: '#e2e8f0' }} />
                            <Line type="monotone" dataKey="steel"    name="Steel"    stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3.5, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                            <Line type="monotone" dataKey="copper"   name="Copper"   stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 3.5, fill: '#06b6d4', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                            <Line type="monotone" dataKey="aluminum" name="Aluminum" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3.5, fill: '#8b5cf6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                            <Line type="monotone" dataKey="plastic"  name="Plastic"  stroke="#10b981" strokeWidth={2.5} dot={{ r: 3.5, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                            <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12, paddingTop: 14 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Donut Pie */}
                <div className="db-card-pie" style={S.dbCard}>
                    <div className="db-chart-header-pie" style={{ marginBottom: 8 }}>
                        <h3 className="db-chart-title" style={S.dbChartTitle}>Stock by Category</h3>
                        <p className="db-chart-subtitle" style={S.dbChartSubtitle}>Share by material type</p>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%" cy="50%"
                                innerRadius={52} outerRadius={85}
                                paddingAngle={3}
                                dataKey="value"
                                startAngle={90} endAngle={-270}
                            >
                                {categoryData.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(v) => [`${v}%`, 'Share']}
                                contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.10)', fontSize: 13 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Custom legend */}
                    <div className="db-pie-legend" style={S.dbPieLegend}>
                        {categoryData.map((c) => (
                            <div className="db-pie-legend-row" key={c.name} style={S.dbPieLegendRow}>
                                <div className="db-pie-legend-left" style={S.dbPieLegendLeft}>
                                    <span className="db-pie-dot" style={{ ...S.dbPieDot, background: c.color }} />
                                    <span className="db-pie-name" style={S.dbPieName}>{c.name}</span>
                                </div>
                                <span className="db-pie-val" style={S.dbPieVal}>{c.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Row 4: Recent POs + Top Vendors ── */}
            <div className="db-bottom-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>

                {/* Recent Orders */}
                <div className="db-card-orders" style={S.dbCard}>
                    <div className="db-orders-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <div>
                            <h3 className="db-orders-title" style={S.dbChartTitle}>Recent Purchase Orders</h3>
                            <p className="db-orders-subtitle" style={S.dbChartSubtitle}>Last 5 purchase orders</p>
                        </div>
                        <button className="db-view-all-btn" style={S.dbViewAllBtn}>
                            View All →
                        </button>
                    </div>
                    <div className="db-table-wrap" style={S.dbTableWrap}>
                        <table className="db-table" style={S.dbTable}>
                            <thead>
                                <tr>
                                    {['PO ID', 'Vendor', 'Date', 'Amount', 'Status'].map((h) => (
                                        <th className="db-th" key={h} style={S.dbTh}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((po) => (
                                    <tr className="db-tr" key={po.id}>
                                        <td className="db-td-poid"  style={S.dbTdPoId}>{po.id}</td>
                                        <td className="db-td-vendor" style={{ ...S.dbTd, fontWeight: 500 }}>{po.vendor}</td>
                                        <td className="db-td-date"   style={{ ...S.dbTd, color: '#94a3b8', whiteSpace: 'nowrap' }}>{po.date}</td>
                                        <td className="db-td-amt"    style={S.dbTdAmt}>₹{po.amount.toLocaleString('en-IN')}</td>
                                        <td className="db-td-status" style={S.dbTd}>
                                            <span
                                                className="db-status-badge"
                                                style={{ ...S.dbBadge, ...statusStyles[po.status] }}
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

                {/* Top Vendors */}
                <div className="db-card-vendors" style={S.dbCard}>
                    <div className="db-vendors-header" style={{ marginBottom: 20 }}>
                        <h3 className="db-vendors-title" style={S.dbChartTitle}>Top Vendors</h3>
                        <p className="db-vendors-subtitle" style={S.dbChartSubtitle}>By purchase volume</p>
                    </div>
                    <div className="db-vendors-list">
                        {topVendors.map((v, i) => {
                            const pct = Math.round((v.amount / topVendors[0].amount) * 100);
                            return (
                                <div className="db-vendor-row" key={v.name} style={S.dbVendorRow}>
                                    <div className="db-vendor-top" style={S.dbVendorTop}>
                                        <div className="db-vendor-left" style={S.dbVendorLeft}>
                                            <div
                                                className="db-vendor-rank"
                                                style={{ ...S.dbVendorBadge, background: v.color }}
                                            >
                                                {i + 1}
                                            </div>
                                            <span className="db-vendor-name" style={S.dbVendorName}>{v.name}</span>
                                        </div>
                                        <span className="db-vendor-amt" style={S.dbVendorAmt}>
                                            ₹{(v.amount / 1000).toFixed(0)}K
                                        </span>
                                    </div>
                                    <div className="db-bar-track" style={S.dbBarTrack}>
                                        <div className="db-bar-bg" style={S.dbBarBg}>
                                            <div
                                                className="db-bar-fill"
                                                style={{ ...S.dbBarFill, width: `${pct}%`, background: v.color }}
                                            />
                                        </div>
                                        <span className="db-bar-label" style={S.dbBarLabel}>{v.orders} POs</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
}
