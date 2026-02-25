import { useState } from 'react';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineDocumentText, HiOutlineX, HiOutlineEye } from 'react-icons/hi';
import { vendors, products } from '../../data/data';

// ── Mock PO Store ──────────────────────────────────────────────
const EXISTING_POS = [
    {
        id: 'PO-2026-A1B', date: '12 Jan 2026', delivery: '2026-02-01',
        status: 'Sent', vendor: 'Apex Supplies Co.',
        items: [
            { product: 'Office Chair', qty: 4, rate: 4500 },
            { product: 'Monitor 27"', qty: 1, rate: 18500 },
        ],
    },
    {
        id: 'PO-2026-C3D', date: '18 Jan 2026', delivery: '2026-02-15',
        status: 'Draft', vendor: 'BlueStar Materials',
        items: [
            { product: 'Standing Desk', qty: 2, rate: 12000 },
        ],
    },
    {
        id: 'PO-2026-E5F', date: '22 Jan 2026', delivery: '2026-03-01',
        status: 'Confirmed', vendor: 'Delta Logistics',
        items: [
            { product: 'Ethernet Cable 10m', qty: 10, rate: 350 },
            { product: 'UPS 1500VA',         qty: 1,  rate: 7800 },
            { product: 'Webcam HD',          qty: 3,  rate: 2100 },
        ],
    },
];

const STATUS_COLOR = {
    Sent:      { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
    Draft:     { bg: '#f8fafc', color: '#94a3b8', border: '#e2e8f0' },
    Confirmed: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    Cancelled: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
};

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const poTotal = (po) => po.items.reduce((s, it) => s + it.qty * it.rate, 0);

// ── Styles ────────────────────────────────────────────────────
const S = {
    // Root
    poOuter:  { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f8fafc' },
    poScroll: { flex: 1, overflowY: 'auto', overflowX: 'hidden' },
    poWrapper: { maxWidth: 1080, margin: '0 auto', padding: '28px 28px 48px', display: 'flex', flexDirection: 'column', gap: 22 },

    // Page header
    poPageHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
    poPageTitle:  { fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 },
    poPageSub:    { fontSize: 13, color: '#94a3b8', marginTop: 4 },

    // Add Purchase button
    poAddPurchaseBtn: {
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 20px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#fff', border: 'none', borderRadius: 11,
        fontSize: 14, fontWeight: 700, cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(59,130,246,0.30)',
        transition: 'opacity 0.15s',
    },

    // ── Purchase List Table Card ──
    poListCard: {
        background: '#fff', borderRadius: 16,
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        overflow: 'hidden',
    },
    poListHeader: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 24px', borderBottom: '1px solid #f1f5f9',
    },
    poListTitle: { fontSize: 14, fontWeight: 700, color: '#334155', margin: 0 },
    poListCount: {
        fontSize: 11, fontWeight: 700, background: '#eff6ff',
        color: '#2563eb', borderRadius: 99, padding: '2px 10px', marginLeft: 8,
    },

    // List Table
    poTableWrap: { overflowX: 'auto' },
    poTable:     { width: '100%', borderCollapse: 'collapse' },
    poTh: {
        textAlign: 'left', padding: '11px 16px', fontSize: 11,
        fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase',
        letterSpacing: '0.07em', borderBottom: '1px solid #f1f5f9',
        background: '#f8fafc', whiteSpace: 'nowrap',
    },
    poTd:    { padding: '13px 16px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' },
    poTdNum: { padding: '13px 16px', fontSize: 12, color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', width: 40 },
    poTdAmt: { padding: '13px 16px', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' },

    // Status badge
    poStatusBadge: { display: 'inline-flex', alignItems: 'center', gap: 5, borderRadius: 20, padding: '4px 11px', fontSize: 12, fontWeight: 700 },

    // Row action buttons
    poViewBtn: {
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '5px 12px', background: '#f1f5f9', color: '#475569',
        border: '1px solid #e2e8f0', borderRadius: 7,
        fontSize: 12, fontWeight: 600, cursor: 'pointer',
    },

    // Empty state
    poEmpty: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '56px 24px',
        color: '#94a3b8', textAlign: 'center',
    },

    // ── Divider between table and form ──
    poDivider: {
        display: 'flex', alignItems: 'center', gap: 12,
        margin: '4px 0',
    },
    poDividerLine: { flex: 1, height: 1, background: '#e2e8f0' },
    poDividerLabel: {
        fontSize: 11, fontWeight: 700, color: '#94a3b8',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        whiteSpace: 'nowrap',
    },

    // ── Form Section ──
    poFormSection: {
        background: '#fff', borderRadius: 16,
        border: '1.5px solid #bfdbfe',
        boxShadow: '0 2px 12px rgba(37,99,235,0.07)',
        overflow: 'hidden',
    },
    poFormSectionHeader: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 24px', borderBottom: '1px solid #e2e8f0',
        background: 'linear-gradient(135deg, #eff6ff, #f8fafc)',
    },
    poFormSectionTitle: { fontSize: 15, fontWeight: 800, color: '#1e40af', margin: 0 },
    poFormSectionSub:   { fontSize: 12, color: '#64748b', marginTop: 3 },
    poFormCloseBtn: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: 8,
        background: '#fee2e2', border: '1px solid #fecaca',
        color: '#dc2626', cursor: 'pointer', fontSize: 16,
    },
    poFormBody: { padding: 24, display: 'flex', flexDirection: 'column', gap: 20 },

    // PO Selector banner
    poBanner: {
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 18px', background: '#f8fafc',
        border: '1px solid #e2e8f0', borderRadius: 12,
        flexWrap: 'wrap',
    },
    poBannerIcon: {
        width: 36, height: 36, borderRadius: 9,
        background: 'linear-gradient(135deg,#3b82f6,#2563eb)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: 16, flexShrink: 0,
    },
    poBannerText:   { flex: 1, minWidth: 0 },
    poBannerTitle:  { fontSize: 13, fontWeight: 700, color: '#1e293b', margin: 0 },
    poBannerSub:    { fontSize: 11, color: '#94a3b8', marginTop: 1 },
    poBannerSelect: {
        padding: '8px 13px', border: '1.5px solid #e2e8f0', borderRadius: 9,
        fontSize: 13, fontFamily: 'Inter, sans-serif', background: '#fff',
        color: '#1e293b', cursor: 'pointer', outline: 'none', minWidth: 200,
    },
    poClearBtn: {
        padding: '7px 13px', background: '#fee2e2', color: '#dc2626',
        border: '1px solid #fecaca', borderRadius: 8, fontSize: 12,
        fontWeight: 600, cursor: 'pointer',
    },

    // Info strip
    poInfoStrip: {
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        padding: '10px 14px', background: '#eff6ff',
        border: '1px solid #bfdbfe', borderRadius: 10,
    },
    poInfoLabel: { fontSize: 12, fontWeight: 700, color: '#2563eb' },
    poInfoPill: {
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: 'white', border: '1px solid #bfdbfe',
        borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 600, color: '#334155',
    },

    // Success banner
    poSuccessBanner: {
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 18px', background: '#f0fdf4',
        border: '1px solid #bbf7d0', borderRadius: 11,
        fontSize: 14, fontWeight: 600, color: '#15803d',
    },

    // Cards inside form
    poCard: {
        background: '#ffffff', borderRadius: 14,
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: 22,
    },
    poCardLocked: {
        background: '#fafbff', borderRadius: 14,
        border: '1.5px solid #bfdbfe',
        boxShadow: '0 1px 4px rgba(37,99,235,0.06)', padding: 22,
    },
    poSectionTitle: { fontSize: 13, fontWeight: 700, color: '#334155', margin: '0 0 16px' },
    poLockedBadge: {
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: 11, fontWeight: 700, background: '#eff6ff',
        color: '#2563eb', border: '1px solid #bfdbfe',
        borderRadius: 20, padding: '2px 9px', marginLeft: 8,
    },

    // Grid
    poGrid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14 },

    // Form groups
    poFormGroup:         { display: 'flex', flexDirection: 'column', gap: 5 },
    poFormLabel:         { fontSize: 12, fontWeight: 600, color: '#475569' },
    poFormInput: {
        width: '100%', padding: '9px 13px', border: '1.5px solid #e2e8f0',
        borderRadius: 9, fontSize: 13, fontFamily: 'Inter, sans-serif',
        background: '#fff', color: '#1e293b', outline: 'none', boxSizing: 'border-box',
    },
    poFormInputReadonly: {
        width: '100%', padding: '9px 13px', border: '1.5px solid #e2e8f0',
        borderRadius: 9, fontSize: 13, fontFamily: 'Inter, sans-serif',
        background: '#f8fafc', color: '#64748b', outline: 'none',
        boxSizing: 'border-box', cursor: 'not-allowed',
    },
    poFormInputLocked: {
        width: '100%', padding: '9px 13px', border: '1.5px solid #bfdbfe',
        borderRadius: 9, fontSize: 13, fontFamily: 'Inter, sans-serif',
        background: '#f0f7ff', color: '#1e40af', outline: 'none',
        boxSizing: 'border-box', cursor: 'not-allowed', fontWeight: 600,
    },
    poFormSelect: {
        width: '100%', padding: '9px 13px', border: '1.5px solid #e2e8f0',
        borderRadius: 9, fontSize: 13, fontFamily: 'Inter, sans-serif',
        background: '#fff', color: '#1e293b', cursor: 'pointer',
        outline: 'none', boxSizing: 'border-box',
    },

    // Line items
    poLineItemsHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    poAddItemBtn: {
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 13px', background: '#eff6ff', color: '#2563eb',
        border: '1px solid #dbeafe', borderRadius: 8,
        fontSize: 12, fontWeight: 600, cursor: 'pointer',
    },

    // Inline table
    poInlineTableWrap: { overflowX: 'auto' },
    poInlineTable:     { width: '100%', borderCollapse: 'collapse' },
    poItemTh: {
        textAlign: 'left', padding: '9px 12px', fontSize: 11,
        fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase',
        letterSpacing: '0.07em', borderBottom: '1px solid #f1f5f9',
        background: '#f8fafc', whiteSpace: 'nowrap',
    },
    poItemTd:    { padding: '9px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' },
    poItemTdNum: { padding: '9px 12px', fontSize: 11, color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', width: 36 },
    poItemTdAmt: { padding: '9px 12px', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' },
    poItemTdAmtLocked: { padding: '9px 12px', fontSize: 13, fontWeight: 700, color: '#2563eb', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' },

    poTableSelect: {
        width: '100%', minWidth: 150, padding: '7px 10px',
        border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 12,
        fontFamily: 'Inter, sans-serif', background: '#fff',
        color: '#1e293b', cursor: 'pointer', outline: 'none',
    },
    poTableInput: {
        padding: '7px 10px', border: '1.5px solid #e2e8f0',
        borderRadius: 7, fontSize: 12, fontFamily: 'Inter, sans-serif',
        background: '#fff', color: '#1e293b', outline: 'none',
        width: 80, boxSizing: 'border-box',
    },
    poTableInputWide: {
        padding: '7px 10px', border: '1.5px solid #e2e8f0',
        borderRadius: 7, fontSize: 12, fontFamily: 'Inter, sans-serif',
        background: '#fff', color: '#1e293b', outline: 'none',
        width: 100, boxSizing: 'border-box',
    },
    poTableCellLocked: {
        display: 'inline-block', padding: '6px 11px',
        background: '#f0f7ff', border: '1.5px solid #bfdbfe',
        borderRadius: 7, fontSize: 12, fontWeight: 600,
        color: '#1e40af', minWidth: 70,
    },

    poRemoveBtn: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, borderRadius: 7,
        border: '1px solid #fecaca', background: '#fee2e2',
        color: '#dc2626', cursor: 'pointer', fontSize: 14,
    },

    // Tfoot
    poTfoot:         { background: '#f8fafc' },
    poTfootLabelTd:  { padding: '13px 12px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#334155', borderTop: '2px solid #e2e8f0' },
    poTfootValueTd:  { padding: '13px 12px', fontSize: 18, fontWeight: 800, color: '#2563eb', borderTop: '2px solid #e2e8f0', whiteSpace: 'nowrap' },

    // Footer actions
    poFormFooter: { display: 'flex', justifyContent: 'flex-end', gap: 10 },
    poDraftBtn: {
        padding: '10px 20px', background: '#f0f4fb', color: '#3b82f6',
        border: '1px solid #dbeafe', borderRadius: 10,
        fontSize: 13, fontWeight: 600, cursor: 'pointer',
    },
    poSubmitBtn: {
        padding: '10px 22px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#fff', border: 'none', borderRadius: 10,
        fontSize: 13, fontWeight: 700, cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(59,130,246,0.30)',
    },
};

const focusStyle = { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59,130,246,0.12)' };
const blurStyle  = { borderColor: '#e2e8f0', boxShadow: 'none' };

// ══════════════════════════════════════════════════════════════
//  PURCHASE TABLE (list view)
// ══════════════════════════════════════════════════════════════
function PurchaseTable({ purchases, onView }) {
    return (
        <div style={S.poListCard}>
            <div style={S.poListHeader}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={S.poListTitle}>All Purchases</span>
                    <span style={S.poListCount}>{purchases.length}</span>
                </div>
            </div>
            <div style={S.poTableWrap}>
                {purchases.length === 0 ? (
                    <div style={S.poEmpty}>
                        <div style={{ fontSize: 38, marginBottom: 10 }}>🧾</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>No purchases yet</div>
                        <div style={{ fontSize: 12, marginTop: 4 }}>Click "Add Purchase" to create your first PO</div>
                    </div>
                ) : (
                    <table style={S.poTable}>
                        <thead>
                            <tr>
                                {['#', 'PO ID', 'Date', 'Vendor', 'Items', 'Total', 'Status', 'Action'].map((h, i) => (
                                    <th key={i} style={S.poTh}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((po, i) => {
                                const sc = STATUS_COLOR[po.status] || STATUS_COLOR.Draft;
                                return (
                                    <tr
                                        key={po.id}
                                        style={{ background: 'white', cursor: 'pointer' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                                        onClick={() => onView(po)}
                                    >
                                        <td style={S.poTdNum}>{i + 1}</td>
                                        <td style={{ ...S.poTd, fontWeight: 700, color: '#2563eb' }}>{po.id}</td>
                                        <td style={{ ...S.poTd, color: '#64748b' }}>{po.date}</td>
                                        <td style={{ ...S.poTd, fontWeight: 600 }}>{po.vendor}</td>
                                        <td style={{ ...S.poTd, color: '#64748b' }}>{po.items.length} item{po.items.length !== 1 ? 's' : ''}</td>
                                        <td style={S.poTdAmt}>{fmt(poTotal(po))}</td>
                                        <td style={S.poTd}>
                                            <span style={{
                                                ...S.poStatusBadge,
                                                background: sc.bg, color: sc.color,
                                                border: `1px solid ${sc.border}`,
                                            }}>
                                                <span style={{ fontSize: 8 }}>&#9679;</span>
                                                {po.status}
                                            </span>
                                        </td>
                                        <td style={S.poTd} onClick={(e) => e.stopPropagation()}>
                                            <button style={S.poViewBtn} onClick={() => onView(po)}>
                                                <HiOutlineEye style={{ fontSize: 14 }} /> View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
//  VIEW MODAL (slide-in detail panel)
// ══════════════════════════════════════════════════════════════
function ViewPODetail({ po, onClose }) {
    const sc = STATUS_COLOR[po.status] || STATUS_COLOR.Draft;
    const total = poTotal(po);
    return (
        <div style={S.poFormSection}>
            {/* Header */}
            <div style={{
                ...S.poFormSectionHeader,
                background: 'linear-gradient(135deg, #f0f7ff, #fafbff)',
            }}>
                <div>
                    <h3 style={{ ...S.poFormSectionTitle, color: '#0f172a' }}>
                        {po.id}
                        <span style={{
                            ...S.poLockedBadge,
                            background: sc.bg, color: sc.color,
                            border: `1px solid ${sc.border}`,
                        }}>
                            <span style={{ fontSize: 8 }}>&#9679;</span> {po.status}
                        </span>
                    </h3>
                    <p style={S.poFormSectionSub}>
                        Created: {po.date} &nbsp;·&nbsp; Delivery: {po.delivery}
                    </p>
                </div>
                <button style={S.poFormCloseBtn} onClick={onClose}><HiOutlineX /></button>
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Summary Pills */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {[
                        ['Vendor', po.vendor],
                        ['Delivery', po.delivery],
                        ['Items', `${po.items.length} item${po.items.length !== 1 ? 's' : ''}`],
                        ['Total', fmt(total)],
                    ].map(([k, v]) => (
                        <div key={k} style={{
                            display: 'flex', flexDirection: 'column', gap: 2,
                            background: '#f8fafc', border: '1px solid #f1f5f9',
                            borderRadius: 10, padding: '10px 16px', minWidth: 100,
                        }}>
                            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{v}</span>
                        </div>
                    ))}
                </div>

                {/* Items Table */}
                <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                        Line Items
                    </div>
                    <div style={S.poInlineTableWrap}>
                        <table style={S.poInlineTable}>
                            <thead>
                                <tr>
                                    {['#', 'Product', 'Qty', 'Rate', 'Amount'].map((h, i) => (
                                        <th key={i} style={S.poItemTh}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {po.items.map((it, i) => (
                                    <tr key={i} style={{ background: i % 2 === 0 ? '#fafafa' : 'white' }}>
                                        <td style={S.poItemTdNum}>{i + 1}</td>
                                        <td style={S.poItemTd}>{it.product}</td>
                                        <td style={S.poItemTd}>{it.qty}</td>
                                        <td style={S.poItemTd}>{fmt(it.rate)}</td>
                                        <td style={S.poItemTdAmtLocked}>{fmt(it.qty * it.rate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot style={S.poTfoot}>
                                <tr>
                                    <td colSpan={4} style={S.poTfootLabelTd}>Grand Total</td>
                                    <td style={S.poTfootValueTd}>{fmt(total)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
//  CREATE FORM
// ══════════════════════════════════════════════════════════════
function CreatePOForm({ onClose, onCreated }) {
    const [selectedPOId, setSelectedPOId] = useState('');
    const [vendor, setVendor]             = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [items, setItems]               = useState([{ product: '', qty: '', rate: '' }]);
    const [submitted, setSubmitted]       = useState(false);

    const isLocked  = !!selectedPOId;
    const selectedPO = EXISTING_POS.find((p) => p.id === selectedPOId) || null;

    const handlePOSelect = (poId) => {
        setSelectedPOId(poId);
        if (!poId) { setVendor(''); setDeliveryDate(''); setItems([{ product: '', qty: '', rate: '' }]); return; }
        const po = EXISTING_POS.find((p) => p.id === poId);
        if (!po) return;
        setVendor(po.vendor);
        setDeliveryDate(po.delivery);
        setItems(po.items.map((it) => ({ ...it })));
    };

    const addItem    = () => setItems([...items, { product: '', qty: '', rate: '' }]);
    const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
    const updateItem = (i, field, val) => {
        const updated = [...items];
        updated[i][field] = val;
        if (field === 'product') {
            const p = products.find((pr) => pr.name === val);
            if (p) updated[i].rate = p.price;
        }
        setItems(updated);
    };

    const total = items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!vendor || items.some((it) => !it.product || !it.qty)) return;
    //     setSubmitted(true);
    //     setTimeout(() => {
    //         setSubmitted(false);
    //         if (onCreated) onCreated({
    //             id: `PO-2026-${Math.random().toString(36).slice(2,6).toUpperCase()}`,
    //             date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    //             delivery: deliveryDate,
    //             status: 'Sent',
    //             vendor,
    //             items: items.filter((it) => it.product),
    //         });
    //         onClose();
    //     }, 1800);
    // };




    const handleSubmit = (e) => {
    e.preventDefault();
    if (!vendor || items.some((it) => !it.product || !it.qty)) return;
    setSubmitted(true);
    setTimeout(() => {
        const newPO = {
            id: `PO-2026-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
            date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            delivery: deliveryDate,
            status: 'Sent',
            vendor,
            items: items.filter((it) => it.product),
        };
        setSubmitted(false);
        if (onCreated) onCreated(newPO);  // ← pushes to table + switches view to 'table'
    }, 1800);
};


    return (
        <div style={S.poFormSection}>
            {/* Form Header */}
            <div style={S.poFormSectionHeader}>
                <div>
                    <h3 style={S.poFormSectionTitle}>New Purchase Order</h3>
                    <p style={S.poFormSectionSub}>
                        {isLocked ? `Auto-filled from ${selectedPO?.id}` : 'Select an existing PO to auto-fill, or fill manually'}
                    </p>
                </div>
                <button style={S.poFormCloseBtn} onClick={onClose}><HiOutlineX /></button>
            </div>

            <div style={S.poFormBody}>
                {/* Success */}
                {submitted && (
                    <div style={S.poSuccessBanner}>
                        <span style={{ fontSize: 18 }}>&#10003;</span>
                        Purchase Order created &amp; sent successfully!
                    </div>
                )}

                {/* PO Selector */}
                <div style={S.poBanner}>
                    <div style={S.poBannerIcon}><HiOutlineDocumentText /></div>
                    <div style={S.poBannerText}>
                        <p style={S.poBannerTitle}>Load from Existing PO</p>
                        <p style={S.poBannerSub}>Choose a PO to auto-fill, or leave empty to fill manually</p>
                    </div>
                    <select
                        style={S.poBannerSelect}
                        value={selectedPOId}
                        onChange={(e) => handlePOSelect(e.target.value)}
                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                        onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
                    >
                        <option value="">-- Select a PO --</option>
                        {EXISTING_POS.map((po) => (
                            <option key={po.id} value={po.id}>
                                {po.id} · {po.vendor} · {po.status}
                            </option>
                        ))}
                    </select>
                    {isLocked && (
                        <button style={S.poClearBtn} onClick={() => handlePOSelect('')}>Clear</button>
                    )}
                </div>

                {/* Info Strip */}
                {isLocked && selectedPO && (
                    <div style={S.poInfoStrip}>
                        <span style={S.poInfoLabel}>Auto-filled from:</span>
                        <span style={S.poInfoPill}>{selectedPO.id}</span>
                        <span style={S.poInfoPill}>
                            <span style={{ color: STATUS_COLOR[selectedPO.status]?.color }}>&#9679;</span>
                            {selectedPO.status}
                        </span>
                        <span style={S.poInfoPill}>Created: {selectedPO.date}</span>
                        <span style={S.poInfoPill}>{selectedPO.items.length} items</span>
                        <span style={{ ...S.poInfoPill, fontWeight: 800, color: '#2563eb' }}>{fmt(total)}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {/* Order Details */}
                    <div style={isLocked ? S.poCardLocked : S.poCard}>
                        <h3 style={S.poSectionTitle}>
                            Order Details
                            {isLocked && <span style={S.poLockedBadge}>&#128274; Auto-filled</span>}
                        </h3>
                        <div style={S.poGrid3}>
                            {/* PO Number */}
                            <div style={S.poFormGroup}>
                                <label style={S.poFormLabel}>PO Number</label>
                                <input style={S.poFormInputReadonly}
                                    value={isLocked ? selectedPO.id : `PO-2026-${String(Date.now()).slice(-4)}`}
                                    readOnly />
                            </div>
                            {/* Vendor */}
                            <div style={S.poFormGroup}>
                                <label style={S.poFormLabel}>Vendor</label>
                                {isLocked
                                    ? <input style={S.poFormInputLocked} value={vendor} readOnly />
                                    : (
                                        <select style={S.poFormSelect} value={vendor}
                                            onChange={(e) => setVendor(e.target.value)} required
                                            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                            onBlur={(e)  => Object.assign(e.target.style, blurStyle)}>
                                            <option value="">Select Vendor</option>
                                            {vendors.filter((v) => v.status === 'Active').map((v) => (
                                                <option key={v.id} value={v.name}>{v.name}</option>
                                            ))}
                                        </select>
                                    )
                                }
                            </div>
                            {/* Delivery */}
                            <div style={S.poFormGroup}>
                                <label style={S.poFormLabel}>Expected Delivery</label>
                                {isLocked
                                    ? <input style={S.poFormInputLocked} value={deliveryDate} readOnly />
                                    : (
                                        <input style={S.poFormInput} type="date" value={deliveryDate}
                                            onChange={(e) => setDeliveryDate(e.target.value)} required
                                            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                            onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />
                                    )
                                }
                            </div>
                            {/* Status (locked only) */}
                            {isLocked && (
                                <div style={S.poFormGroup}>
                                    <label style={S.poFormLabel}>PO Status</label>
                                    <div style={{
                                        padding: '9px 13px',
                                        border: `1.5px solid ${STATUS_COLOR[selectedPO.status]?.border || '#e2e8f0'}`,
                                        borderRadius: 9,
                                        background: STATUS_COLOR[selectedPO.status]?.bg || '#f8fafc',
                                        fontSize: 13, fontWeight: 700,
                                        color: STATUS_COLOR[selectedPO.status]?.color || '#64748b',
                                        display: 'inline-flex', alignItems: 'center', gap: 6,
                                    }}>
                                        <span style={{ fontSize: 8 }}>&#9679;</span>
                                        {selectedPO.status}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Line Items */}
                    <div style={isLocked ? S.poCardLocked : S.poCard}>
                        <div style={S.poLineItemsHeader}>
                            <h3 style={{ ...S.poSectionTitle, margin: 0 }}>
                                Line Items
                                {isLocked && <span style={S.poLockedBadge}>&#128274; Auto-filled</span>}
                            </h3>
                            {!isLocked && (
                                <button type="button" style={S.poAddItemBtn} onClick={addItem}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = '#dbeafe')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = '#eff6ff')}>
                                    <HiOutlinePlus style={{ fontSize: 15 }} /> Add Item
                                </button>
                            )}
                        </div>
                        <div style={S.poInlineTableWrap}>
                            <table style={S.poInlineTable}>
                                <thead>
                                    <tr>
                                        {['#', 'Product', 'Qty', 'Rate (Rs)', 'Amount', ''].map((h, i) => (
                                            <th key={i} style={S.poItemTh}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((it, i) => (
                                        <tr key={i} style={{ background: i % 2 === 0 ? '#fafafa' : 'white' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = isLocked ? '#f0f7ff' : '#f8fafc')}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? '#fafafa' : 'white')}>
                                            <td style={S.poItemTdNum}>{i + 1}</td>
                                            <td style={S.poItemTd}>
                                                {isLocked ? <span style={S.poTableCellLocked}>{it.product}</span>
                                                    : (
                                                        <select style={S.poTableSelect} value={it.product}
                                                            onChange={(e) => updateItem(i, 'product', e.target.value)}
                                                            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                                            onBlur={(e)  => Object.assign(e.target.style, blurStyle)}>
                                                            <option value="">Select Product</option>
                                                            {products.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                                                        </select>
                                                    )}
                                            </td>
                                            <td style={S.poItemTd}>
                                                {isLocked ? <span style={S.poTableCellLocked}>{it.qty}</span>
                                                    : <input style={S.poTableInput} type="number" value={it.qty}
                                                        onChange={(e) => updateItem(i, 'qty', e.target.value)}
                                                        placeholder="0" min="0"
                                                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                                        onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />}
                                            </td>
                                            <td style={S.poItemTd}>
                                                {isLocked ? <span style={S.poTableCellLocked}>{fmt(it.rate)}</span>
                                                    : <input style={S.poTableInputWide} type="number" value={it.rate}
                                                        onChange={(e) => updateItem(i, 'rate', e.target.value)}
                                                        placeholder="0" min="0"
                                                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                                        onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />}
                                            </td>
                                            <td style={isLocked ? S.poItemTdAmtLocked : S.poItemTdAmt}>
                                                {fmt((Number(it.qty) || 0) * (Number(it.rate) || 0))}
                                            </td>
                                            <td style={S.poItemTd}>
                                                {!isLocked && items.length > 1 && (
                                                    <button type="button" style={S.poRemoveBtn} onClick={() => removeItem(i)}
                                                        onMouseEnter={(e) => (e.currentTarget.style.background = '#fecaca')}
                                                        onMouseLeave={(e) => (e.currentTarget.style.background = '#fee2e2')}>
                                                        <HiOutlineTrash />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot style={S.poTfoot}>
                                    <tr>
                                        <td colSpan={4} style={S.poTfootLabelTd}>Grand Total</td>
                                        <td colSpan={2} style={S.poTfootValueTd}>{fmt(total)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={S.poFormFooter}>
                        <button type="button" style={S.poDraftBtn}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#dbeafe')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#f0f4fb')}>
                            Save as Draft
                        </button>
                        <button type="submit" style={S.poSubmitBtn}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                            {isLocked ? 'Confirm & Send PO' : 'Create & Send PO'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function PurchaseManager() {
    const [purchases, setPurchases] = useState(EXISTING_POS);
    const [view, setView]           = useState('table');   // 'table' | 'create' | 'detail'
    const [selectedPO, setSelectedPO] = useState(null);

    const handleView = (po) => {
        setSelectedPO(po);
        setView('detail');
    };

    const handleCreated = (newPO) => {
        setPurchases((prev) => [newPO, ...prev]);
        setView('table');   // ← go back to table after submit
    };

    return (
        <div style={S.poOuter}>
            <div style={S.poScroll}>
                <div style={S.poWrapper}>

                    {/* ── Page Header ── */}
                    <div style={S.poPageHeader}>
                        <div>
                            <h1 style={S.poPageTitle}>Purchases</h1>
                            <p style={S.poPageSub}>
                                {view === 'create'
                                    ? 'Fill in the details to create a new purchase order'
                                    : 'Manage all purchase orders in one place'}
                            </p>
                        </div>

                        {/* FIX: Button toggles between "Add Purchase" and "Back to List" */}
                        {view === 'create' ? (
                            // When form is open → show a Back button instead
                            <button
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '10px 18px',
                                    background: '#f1f5f9', color: '#475569',
                                    border: '1px solid #e2e8f0', borderRadius: 11,
                                    fontSize: 14, fontWeight: 600, cursor: 'pointer',
                                }}
                                onClick={() => setView('table')}
                                onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                            >
                                &#8592; Back to List
                            </button>
                        ) : (
                            // Table/detail view → show Add Purchase
                            <button
                                style={S.poAddPurchaseBtn}
                                onClick={() => { setView('create'); setSelectedPO(null); }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                            >
                                <HiOutlinePlus style={{ fontSize: 17 }} />
                                Add Purchase
                            </button>
                        )}
                    </div>

                    {/* ══════════════════════════════════════════════
                        VIEW: TABLE  — purchases list
                    ══════════════════════════════════════════════ */}
                    {view === 'table' && (
                        <PurchaseTable purchases={purchases} onView={handleView} />
                    )}

                    {/* ══════════════════════════════════════════════
                        VIEW: DETAIL  — read-only PO detail
                    ══════════════════════════════════════════════ */}
                    {view === 'detail' && selectedPO && (
                        <>
                            {/* Keep table visible in detail view so user can switch rows */}
                            <PurchaseTable purchases={purchases} onView={handleView} />

                            <div style={S.poDivider}>
                                <div style={S.poDividerLine} />
                                <span style={S.poDividerLabel}>Order Details</span>
                                <div style={S.poDividerLine} />
                            </div>

                            <ViewPODetail
                                po={selectedPO}
                                onClose={() => { setView('table'); setSelectedPO(null); }}
                            />
                        </>
                    )}

                    {/* ══════════════════════════════════════════════
                        VIEW: CREATE  — form only, NO table
                    ══════════════════════════════════════════════ */}
                    {view === 'create' && (
                        <CreatePOForm
                            onClose={() => setView('table')}
                            onCreated={handleCreated}
                        />
                    )}

                </div>
            </div>
        </div>
    );
}
