import { useState } from 'react';
import { usedMaterialsData } from '../../data/data';

const styles = {
    // Layout
    wrapper: {
        padding: '24px',
        fontFamily: "'Inter', sans-serif",
    },

    // Page Header
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
    cardLabel: {
        fontSize: '11px',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        margin: '0 0 6px 0',
    },
    cardValueSlate: {
        fontSize: '26px',
        fontWeight: '700',
        color: '#1e293b',
        margin: 0,
    },
    cardValueBlue: {
        fontSize: '26px',
        fontWeight: '700',
        color: '#2563eb',
        margin: 0,
    },
    cardValueEmerald: {
        fontSize: '26px',
        fontWeight: '700',
        color: '#059669',
        margin: 0,
    },

    // Table Card
    tableCard: {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        padding: '20px',
    },

    // Filter Row
    filterRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '16px',
    },
    select: {
        height: '36px',
        padding: '0 12px',
        fontSize: '13px',
        color: '#334155',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        outline: 'none',
        cursor: 'pointer',
        width: '176px',
        appearance: 'auto',
    },

    // Table
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
    tdMonth: {
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
    tdEmpty: {
        padding: '32px 14px',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '13px',
        borderBottom: '1px solid #f1f5f9',
        verticalAlign: 'middle',
    },
};

export default function UsedMaterialsReport() {
    const [filterMonth, setFilterMonth] = useState('');
    const [filterMaterial, setFilterMaterial] = useState('');

    const months    = [...new Set(usedMaterialsData.map((d) => d.month))];
    const materials = [...new Set(usedMaterialsData.map((d) => d.material))];

    const filtered = usedMaterialsData.filter((d) => {
        return (
            (!filterMonth    || d.month    === filterMonth) &&
            (!filterMaterial || d.material === filterMaterial)
        );
    });

    const totalUsed = filtered.reduce((s, d) => s + d.used, 0);

    return (
        <div className="usematerialrepo-wrapper" style={styles.wrapper}>

            {/* Page Header */}
            <div className="usematerialrepo-page-header" style={styles.pageHeader}>
                <h1 className="usematerialrepo-page-title" style={styles.pageTitle}>
                    Used Materials Report
                </h1>
                <p className="usematerialrepo-page-subtitle" style={styles.pageSubtitle}>
                    Month-wise material consumption data
                </p>
            </div>

            {/* Summary Cards */}
            <div className="usematerialrepo-summary-grid" style={styles.summaryGrid}>
                <div className="usematerialrepo-card usematerialrepo-card--total-records" style={styles.card}>
                    <p className="usematerialrepo-card-label" style={styles.cardLabel}>Total Records</p>
                    <p className="usematerialrepo-card-value" style={styles.cardValueSlate}>
                        {filtered.length}
                    </p>
                </div>
                <div className="usematerialrepo-card usematerialrepo-card--unique-materials" style={styles.card}>
                    <p className="usematerialrepo-card-label" style={styles.cardLabel}>Unique Materials</p>
                    <p className="usematerialrepo-card-value" style={styles.cardValueBlue}>
                        {materials.length}
                    </p>
                </div>
                <div className="usematerialrepo-card usematerialrepo-card--total-qty" style={styles.card}>
                    <p className="usematerialrepo-card-label" style={styles.cardLabel}>Total Qty Used</p>
                    <p className="usematerialrepo-card-value" style={styles.cardValueEmerald}>
                        {totalUsed.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Table Card */}
            <div className="usematerialrepo-table-card" style={styles.tableCard}>

                {/* Filters */}
                <div className="usematerialrepo-filter-row" style={styles.filterRow}>
                    <select
                        className="usematerialrepo-select usematerialrepo-select--month"
                        style={styles.select}
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        {months.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>

                    <select
                        className="usematerialrepo-select usematerialrepo-select--material"
                        style={styles.select}
                        value={filterMaterial}
                        onChange={(e) => setFilterMaterial(e.target.value)}
                    >
                        <option value="">All Materials</option>
                        {materials.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <div className="usematerialrepo-table-wrapper" style={styles.tableWrapper}>
                    <table className="usematerialrepo-table" style={styles.table}>
                        <thead className="usematerialrepo-thead" style={styles.thead}>
                            <tr className="usematerialrepo-tr">
                                {['#', 'Month', 'Material', 'Quantity Used', 'Unit'].map((h) => (
                                    <th key={h} className="usematerialrepo-th" style={styles.th}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="usematerialrepo-tbody">
                            {filtered.length > 0 ? (
                                filtered.map((d, i) => (
                                    <tr key={i} className="usematerialrepo-tr">
                                        <td className="usematerialrepo-td usematerialrepo-td--index" style={styles.td}>
                                            {i + 1}
                                        </td>
                                        <td className="usematerialrepo-td usematerialrepo-td--month" style={styles.tdMonth}>
                                            {d.month}
                                        </td>
                                        <td className="usematerialrepo-td usematerialrepo-td--material" style={styles.td}>
                                            {d.material}
                                        </td>
                                        <td className="usematerialrepo-td usematerialrepo-td--qty" style={styles.tdQty}>
                                            {d.used}
                                        </td>
                                        <td className="usematerialrepo-td usematerialrepo-td--unit" style={styles.td}>
                                            {d.unit}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="usematerialrepo-tr usematerialrepo-tr--empty">
                                    <td
                                        className="usematerialrepo-td usematerialrepo-td--empty"
                                        style={styles.tdEmpty}
                                        colSpan={5}
                                    >
                                        No data found
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
