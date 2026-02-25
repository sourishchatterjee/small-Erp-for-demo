// import { stocks } from '../../data/data';

// export default function LowestStockReport() {
//     const sorted = [...stocks].sort((a, b) => {
//         const ratioA = a.currentQty / a.reorderLevel;
//         const ratioB = b.currentQty / b.reorderLevel;
//         return ratioA - ratioB;
//     });

//     const getStatus = (qty, reorder) => {
//         if (qty <= reorder * 0.3) return { label: 'Critical', cls: 'badge-danger' };
//         if (qty <= reorder) return { label: 'Low', cls: 'badge-warning' };
//         return { label: 'OK', cls: 'badge-success' };
//     };

//     const criticalItems = sorted.filter((s) => s.currentQty <= s.reorderLevel * 0.3);
//     const lowItems = sorted.filter((s) => s.currentQty > s.reorderLevel * 0.3 && s.currentQty <= s.reorderLevel);

//     return (
//         <div>
//             <div className="page-header">
//                 <div>
//                     <h1 className="page-title">Lowest Stock Report</h1>
//                     <p className="page-subtitle">Items with critically low inventory levels</p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//                 <div className="card p-4 border-l-4 border-red-400"><p className="text-xs text-slate-400">Critical Items</p><p className="text-2xl font-bold text-red-600">{criticalItems.length}</p></div>
//                 <div className="card p-4 border-l-4 border-amber-400"><p className="text-xs text-slate-400">Low Items</p><p className="text-2xl font-bold text-amber-600">{lowItems.length}</p></div>
//                 <div className="card p-4 border-l-4 border-blue-400"><p className="text-xs text-slate-400">Total Tracked</p><p className="text-2xl font-bold text-slate-800">{stocks.length}</p></div>
//             </div>

//             <div className="card p-5">
//                 <div className="overflow-x-auto">
//                     <table className="erp-table">
//                         <thead>
//                             <tr><th>Priority</th><th>SKU</th><th>Product</th><th>Current Qty</th><th>Reorder Level</th><th>Deficit</th><th>Fill %</th><th>Status</th></tr>
//                         </thead>
//                         <tbody>
//                             {sorted.map((s, i) => {
//                                 const status = getStatus(s.currentQty, s.reorderLevel);
//                                 const deficit = s.currentQty < s.reorderLevel ? s.reorderLevel - s.currentQty : 0;
//                                 const fillPct = Math.round((s.currentQty / s.reorderLevel) * 100);
//                                 return (
//                                     <tr key={s.id}>
//                                         <td className="font-bold text-slate-500">{i + 1}</td>
//                                         <td><span className="badge badge-info">{s.sku}</span></td>
//                                         <td className="font-semibold">{s.product}</td>
//                                         <td className="font-medium">{s.currentQty}</td>
//                                         <td>{s.reorderLevel}</td>
//                                         <td className={deficit ? 'text-red-500 font-medium' : 'text-slate-400'}>{deficit || '—'}</td>
//                                         <td>
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
//                                                     <div
//                                                         className={`h-full rounded-full ${fillPct > 100 ? 'bg-green-400' : fillPct > 50 ? 'bg-amber-400' : 'bg-red-400'}`}
//                                                         style={{ width: `${Math.min(fillPct, 100)}%` }}
//                                                     />
//                                                 </div>
//                                                 <span className="text-xs text-slate-500">{fillPct}%</span>
//                                             </div>
//                                         </td>
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












import { stocks } from '../../data/data';

const styles = {
    // Layout
    wrapper: {
        padding: '24px',
        fontFamily: "'Inter', sans-serif",
    },
    pageHeader: {
        marginBottom: '24px',
    },
    pageTitle: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0 0 4px 0',
    },
    pageSubtitle: {
        fontSize: '13px',
        color: '#94a3b8',
        margin: 0,
    },

    // Summary Cards Grid
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        padding: '16px',
    },
    cardCritical: {
        borderLeft: '4px solid #f87171',
    },
    cardLow: {
        borderLeft: '4px solid #fbbf24',
    },
    cardTotal: {
        borderLeft: '4px solid #60a5fa',
    },
    cardLabel: {
        fontSize: '11px',
        color: '#94a3b8',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    cardValueRed: {
        fontSize: '26px',
        fontWeight: '700',
        color: '#dc2626',
        margin: 0,
    },
    cardValueAmber: {
        fontSize: '26px',
        fontWeight: '700',
        color: '#d97706',
        margin: 0,
    },
    cardValueSlate: {
        fontSize: '26px',
        fontWeight: '700',
        color: '#1e293b',
        margin: 0,
    },

    // Table Card
    tableCard: {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        padding: '20px',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px',
    },
    thead: {
        backgroundColor: '#f8fafc',
    },
    th: {
        padding: '10px 14px',
        textAlign: 'left',
        fontSize: '11px',
        fontWeight: '600',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        borderBottom: '1px solid #e2e8f0',
        whiteSpace: 'nowrap',
    },
    td: {
        padding: '11px 14px',
        borderBottom: '1px solid #f1f5f9',
        color: '#334155',
        verticalAlign: 'middle',
    },
    tdPriority: {
        padding: '11px 14px',
        borderBottom: '1px solid #f1f5f9',
        fontWeight: '700',
        color: '#94a3b8',
        verticalAlign: 'middle',
    },
    tdProductName: {
        padding: '11px 14px',
        borderBottom: '1px solid #f1f5f9',
        fontWeight: '600',
        color: '#1e293b',
        verticalAlign: 'middle',
    },
    tdQty: {
        padding: '11px 14px',
        borderBottom: '1px solid #f1f5f9',
        fontWeight: '500',
        color: '#334155',
        verticalAlign: 'middle',
    },
    tdDeficitRed: {
        padding: '11px 14px',
        borderBottom: '1px solid #f1f5f9',
        color: '#ef4444',
        fontWeight: '500',
        verticalAlign: 'middle',
    },
    tdDeficitNone: {
        padding: '11px 14px',
        borderBottom: '1px solid #f1f5f9',
        color: '#94a3b8',
        verticalAlign: 'middle',
    },

    // Badge base
    badge: {
        display: 'inline-block',
        padding: '3px 9px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.3px',
    },
    badgeInfo: {
        backgroundColor: '#eff6ff',
        color: '#3b82f6',
    },
    badgeDanger: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
    },
    badgeWarning: {
        backgroundColor: '#fffbeb',
        color: '#d97706',
    },
    badgeSuccess: {
        backgroundColor: '#f0fdf4',
        color: '#16a34a',
    },

    // Progress bar
    progressBarTrack: {
        width: '64px',
        height: '7px',
        backgroundColor: '#f1f5f9',
        borderRadius: '999px',
        overflow: 'hidden',
    },
    progressBarFillRed: {
        height: '100%',
        borderRadius: '999px',
        backgroundColor: '#f87171',
    },
    progressBarFillAmber: {
        height: '100%',
        borderRadius: '999px',
        backgroundColor: '#fbbf24',
    },
    progressBarFillGreen: {
        height: '100%',
        borderRadius: '999px',
        backgroundColor: '#4ade80',
    },
    progressWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    progressLabel: {
        fontSize: '11px',
        color: '#94a3b8',
        minWidth: '32px',
    },
};

export default function LowestStockReport() {
    const sorted = [...stocks].sort((a, b) => {
        const ratioA = a.currentQty / a.reorderLevel;
        const ratioB = b.currentQty / b.reorderLevel;
        return ratioA - ratioB;
    });

    const getStatus = (qty, reorder) => {
        if (qty <= reorder * 0.3) return { label: 'Critical', badgeStyle: { ...styles.badge, ...styles.badgeDanger } };
        if (qty <= reorder)       return { label: 'Low',      badgeStyle: { ...styles.badge, ...styles.badgeWarning } };
        return                           { label: 'OK',       badgeStyle: { ...styles.badge, ...styles.badgeSuccess } };
    };

    const getProgressFill = (fillPct) => {
        if (fillPct > 100) return styles.progressBarFillGreen;
        if (fillPct > 50)  return styles.progressBarFillAmber;
        return styles.progressBarFillRed;
    };

    const criticalItems = sorted.filter((s) => s.currentQty <= s.reorderLevel * 0.3);
    const lowItems = sorted.filter(
        (s) => s.currentQty > s.reorderLevel * 0.3 && s.currentQty <= s.reorderLevel
    );

    return (
        <div className="lowest-stock-wrapper" style={styles.wrapper}>

            {/* Page Header */}
            <div className="lowest-stock-page-header" style={styles.pageHeader}>
                <h1 className="lowest-stock-page-title" style={styles.pageTitle}>
                    Lowest Stock Report
                </h1>
                <p className="lowest-stock-page-subtitle" style={styles.pageSubtitle}>
                    Items with critically low inventory levels
                </p>
            </div>

            {/* Summary Cards */}
            <div className="lowest-stock-summary-grid" style={styles.summaryGrid}>
                <div className="lowest-stock-card lowest-stock-card--critical"
                    style={{ ...styles.card, ...styles.cardCritical }}>
                    <p className="lowest-stock-card-label" style={styles.cardLabel}>Critical Items</p>
                    <p className="lowest-stock-card-value" style={styles.cardValueRed}>{criticalItems.length}</p>
                </div>
                <div className="lowest-stock-card lowest-stock-card--low"
                    style={{ ...styles.card, ...styles.cardLow }}>
                    <p className="lowest-stock-card-label" style={styles.cardLabel}>Low Items</p>
                    <p className="lowest-stock-card-value" style={styles.cardValueAmber}>{lowItems.length}</p>
                </div>
                <div className="lowest-stock-card lowest-stock-card--total"
                    style={{ ...styles.card, ...styles.cardTotal }}>
                    <p className="lowest-stock-card-label" style={styles.cardLabel}>Total Tracked</p>
                    <p className="lowest-stock-card-value" style={styles.cardValueSlate}>{stocks.length}</p>
                </div>
            </div>

            {/* Table Card */}
            <div className="lowest-stock-table-card" style={styles.tableCard}>
                <div className="lowest-stock-table-wrapper" style={styles.tableWrapper}>
                    <table className="lowest-stock-table" style={styles.table}>
                        <thead className="lowest-stock-thead" style={styles.thead}>
                            <tr>
                                {['Priority', 'SKU', 'Product', 'Current Qty', 'Reorder Level', 'Deficit', 'Fill %', 'Status'].map((h) => (
                                    <th key={h} className="lowest-stock-th" style={styles.th}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="lowest-stock-tbody">
                            {sorted.map((s, i) => {
                                const status  = getStatus(s.currentQty, s.reorderLevel);
                                const deficit = s.currentQty < s.reorderLevel ? s.reorderLevel - s.currentQty : 0;
                                const fillPct = Math.round((s.currentQty / s.reorderLevel) * 100);

                                return (
                                    <tr key={s.id} className="lowest-stock-tr">
                                        <td className="lowest-stock-td lowest-stock-td--priority" style={styles.tdPriority}>
                                            {i + 1}
                                        </td>
                                        <td className="lowest-stock-td lowest-stock-td--sku" style={styles.td}>
                                            <span className="lowest-stock-badge lowest-stock-badge--info"
                                                style={{ ...styles.badge, ...styles.badgeInfo }}>
                                                {s.sku}
                                            </span>
                                        </td>
                                        <td className="lowest-stock-td lowest-stock-td--product" style={styles.tdProductName}>
                                            {s.product}
                                        </td>
                                        <td className="lowest-stock-td lowest-stock-td--qty" style={styles.tdQty}>
                                            {s.currentQty}
                                        </td>
                                        <td className="lowest-stock-td lowest-stock-td--reorder" style={styles.td}>
                                            {s.reorderLevel}
                                        </td>
                                        <td className="lowest-stock-td lowest-stock-td--deficit"
                                            style={deficit ? styles.tdDeficitRed : styles.tdDeficitNone}>
                                            {deficit || '—'}
                                        </td>
                                        <td className="lowest-stock-td lowest-stock-td--fill" style={styles.td}>
                                            <div className="lowest-stock-progress-wrapper" style={styles.progressWrapper}>
                                                <div className="lowest-stock-progress-track" style={styles.progressBarTrack}>
                                                    <div
                                                        className="lowest-stock-progress-fill"
                                                        style={{
                                                            ...getProgressFill(fillPct),
                                                            width: `${Math.min(fillPct, 100)}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="lowest-stock-progress-label" style={styles.progressLabel}>
                                                    {fillPct}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="lowest-stock-td lowest-stock-td--status" style={styles.td}>
                                            <span className="lowest-stock-badge" style={status.badgeStyle}>
                                                {status.label}
                                            </span>
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
