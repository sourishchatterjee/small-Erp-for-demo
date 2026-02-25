import { useState } from 'react';
import { HiOutlineOfficeBuilding, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineUser, HiOutlineMail, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX, HiOutlineSearch } from 'react-icons/hi';

// ── Mock Data ──────────────────────────────────────────────────
const INITIAL_STORES = [
    { id: 1, name: 'Main Warehouse', code: 'STR-001', type: 'Warehouse', manager: 'Rahul Sharma', phone: '9812345678', email: 'main@warehouse.in', city: 'Mumbai', state: 'Maharashtra', status: 'Active' },
    { id: 2, name: 'North Branch',   code: 'STR-002', type: 'Branch',    manager: 'Priya Singh',  phone: '9823456789', email: 'north@branch.in',  city: 'Delhi',  state: 'Delhi',        status: 'Active' },
    { id: 3, name: 'South Depot',    code: 'STR-003', type: 'Depot',     manager: 'Anil Kumar',   phone: '9834567890', email: 'south@depot.in',   city: 'Chennai',state: 'Tamil Nadu',   status: 'Inactive' },
];

const STORE_TYPES  = ['Warehouse', 'Branch', 'Depot', 'Outlet', 'Cold Storage'];
const INDIA_STATES = ['Andhra Pradesh','Delhi','Gujarat','Karnataka','Kerala','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'];

const STATUS_STYLE = {
    Active:   { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    Inactive: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
};

// ── Styles ─────────────────────────────────────────────────────
const S = {
    // Root
    asOuter:  { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f8fafc' },
    asScroll: { flex: 1, overflowY: 'auto', overflowX: 'hidden' },
    asWrap:   { maxWidth: 1080, margin: '0 auto', padding: '28px 28px 48px', display: 'flex', flexDirection: 'column', gap: 22 },

    // Page header
    asPageHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
    asPageTitle:  { fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 },
    asPageSub:    { fontSize: 13, color: '#94a3b8', marginTop: 4 },

    // Add Store button
    asAddBtn: {
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 20px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#fff', border: 'none', borderRadius: 11,
        fontSize: 14, fontWeight: 700, cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(59,130,246,0.28)',
    },
    asBackBtn: {
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 18px', background: '#f1f5f9', color: '#475569',
        border: '1px solid #e2e8f0', borderRadius: 11,
        fontSize: 14, fontWeight: 600, cursor: 'pointer',
    },

    // Stat cards row
    asStatsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 },
    asStatCard: {
        background: '#fff', borderRadius: 14, border: '1px solid #f1f5f9',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)', padding: '18px 20px',
        display: 'flex', flexDirection: 'column', gap: 4,
    },
    asStatLabel: { fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' },
    asStatValue: { fontSize: 26, fontWeight: 800, color: '#0f172a', lineHeight: 1 },
    asStatSub:   { fontSize: 12, color: '#64748b', marginTop: 2 },

    // Search + filter bar
    asToolbar: {
        display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
        padding: '14px 20px', background: '#fff',
        border: '1px solid #f1f5f9', borderRadius: 14,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    },
    asSearchWrap: {
        display: 'flex', alignItems: 'center', gap: 8, flex: 1,
        minWidth: 180, background: '#f8fafc', border: '1.5px solid #e2e8f0',
        borderRadius: 9, padding: '8px 13px',
    },
    asSearchInput: {
        flex: 1, border: 'none', background: 'transparent', outline: 'none',
        fontSize: 13, color: '#1e293b', fontFamily: 'Inter, sans-serif',
    },
    asFilterSelect: {
        padding: '8px 13px', border: '1.5px solid #e2e8f0', borderRadius: 9,
        fontSize: 13, fontFamily: 'Inter, sans-serif', background: '#fff',
        color: '#1e293b', cursor: 'pointer', outline: 'none',
    },

    // Table card
    asTableCard: {
        background: '#fff', borderRadius: 16,
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)', overflow: 'hidden',
    },
    asTableHeader: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 22px', borderBottom: '1px solid #f1f5f9',
    },
    asTableTitle: { fontSize: 14, fontWeight: 700, color: '#334155', margin: 0 },
    asTableCount: {
        fontSize: 11, fontWeight: 700, background: '#eff6ff',
        color: '#2563eb', borderRadius: 99, padding: '2px 10px', marginLeft: 8,
    },
    asTableWrap: { overflowX: 'auto' },
    asTable:     { width: '100%', borderCollapse: 'collapse' },
    asTh: {
        textAlign: 'left', padding: '11px 16px', fontSize: 11,
        fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase',
        letterSpacing: '0.07em', borderBottom: '1px solid #f1f5f9',
        background: '#f8fafc', whiteSpace: 'nowrap',
    },
    asTd:     { padding: '13px 16px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' },
    asTdBold: { padding: '13px 16px', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' },
    asTdCode: { padding: '13px 16px', fontSize: 12, fontWeight: 700, color: '#2563eb', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' },

    // Status badge
    asStatusBadge: { display: 'inline-flex', alignItems: 'center', gap: 5, borderRadius: 20, padding: '4px 11px', fontSize: 12, fontWeight: 700 },

    // Action buttons
    asEditBtn: {
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '5px 11px', background: '#eff6ff', color: '#2563eb',
        border: '1px solid #bfdbfe', borderRadius: 7,
        fontSize: 12, fontWeight: 600, cursor: 'pointer',
    },
    asDeleteBtn: {
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '5px 11px', background: '#fee2e2', color: '#dc2626',
        border: '1px solid #fecaca', borderRadius: 7,
        fontSize: 12, fontWeight: 600, cursor: 'pointer',
    },

    // Type pill
    asTypePill: {
        display: 'inline-flex', alignItems: 'center',
        background: '#f1f5f9', color: '#475569',
        borderRadius: 20, padding: '3px 10px',
        fontSize: 11, fontWeight: 700, border: '1px solid #e2e8f0',
    },

    // Empty state
    asEmpty: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '56px 24px',
        color: '#94a3b8', textAlign: 'center',
    },

    // ── Form Section ──
    asFormCard: {
        background: '#fff', borderRadius: 16,
        border: '1.5px solid #bfdbfe',
        boxShadow: '0 2px 12px rgba(37,99,235,0.07)',
        overflow: 'hidden',
    },
    asFormHeader: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 24px', borderBottom: '1px solid #e2e8f0',
        background: 'linear-gradient(135deg, #eff6ff, #f8fafc)',
    },
    asFormTitle: { fontSize: 15, fontWeight: 800, color: '#1e40af', margin: 0 },
    asFormSub:   { fontSize: 12, color: '#64748b', marginTop: 3 },
    asFormClose: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: 8,
        background: '#fee2e2', border: '1px solid #fecaca',
        color: '#dc2626', cursor: 'pointer', fontSize: 16,
    },
    asFormBody:  { padding: 28, display: 'flex', flexDirection: 'column', gap: 22 },

    // Form cards inside form
    asInnerCard: {
        background: '#f8fafc', borderRadius: 12,
        border: '1px solid #f1f5f9', padding: 20,
    },
    asInnerTitle: { fontSize: 13, fontWeight: 700, color: '#334155', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 7 },
    asInnerIcon:  { width: 26, height: 26, borderRadius: 7, background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 },

    // Grid
    asGrid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14 },
    asGrid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 },

    // Form group
    asFormGroup: { display: 'flex', flexDirection: 'column', gap: 5 },
    asLabel:     { fontSize: 12, fontWeight: 600, color: '#475569' },
    asRequired:  { color: '#ef4444', marginLeft: 2 },
    asInput: {
        width: '100%', padding: '10px 13px', border: '1.5px solid #e2e8f0',
        borderRadius: 9, fontSize: 13, fontFamily: 'Inter, sans-serif',
        background: '#fff', color: '#1e293b', outline: 'none', boxSizing: 'border-box',
    },
    asSelect: {
        width: '100%', padding: '10px 13px', border: '1.5px solid #e2e8f0',
        borderRadius: 9, fontSize: 13, fontFamily: 'Inter, sans-serif',
        background: '#fff', color: '#1e293b', cursor: 'pointer',
        outline: 'none', boxSizing: 'border-box',
    },
    asTextarea: {
        width: '100%', padding: '10px 13px', border: '1.5px solid #e2e8f0',
        borderRadius: 9, fontSize: 13, fontFamily: 'Inter, sans-serif',
        background: '#fff', color: '#1e293b', outline: 'none',
        boxSizing: 'border-box', resize: 'vertical', minHeight: 80,
    },

    // Toggle
    asToggleRow:   { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' },
    asToggleLabel: { display: 'flex', flexDirection: 'column', gap: 2 },
    asToggleTitle: { fontSize: 13, fontWeight: 600, color: '#1e293b' },
    asToggleSub:   { fontSize: 11, color: '#94a3b8' },
    asToggleTrack: (active) => ({
        width: 44, height: 24, borderRadius: 99, cursor: 'pointer', border: 'none',
        background: active ? '#2563eb' : '#e2e8f0',
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
        display: 'flex', alignItems: 'center', padding: '0 3px',
    }),
    asToggleThumb: (active) => ({
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
        transform: active ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform 0.2s',
    }),

    // Footer
    asFooter:     { display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 4 },
    asCancelBtn:  {
        padding: '10px 20px', background: '#f1f5f9', color: '#475569',
        border: '1px solid #e2e8f0', borderRadius: 10,
        fontSize: 13, fontWeight: 600, cursor: 'pointer',
    },
    asSaveBtn: {
        padding: '10px 24px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#fff', border: 'none', borderRadius: 10,
        fontSize: 13, fontWeight: 700, cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(59,130,246,0.28)',
    },

    // Success banner
    asSuccess: {
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 18px', background: '#f0fdf4',
        border: '1px solid #bbf7d0', borderRadius: 11,
        fontSize: 14, fontWeight: 600, color: '#15803d',
    },

    // Delete confirm modal
    asModalOverlay: {
        position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, backdropFilter: 'blur(2px)',
    },
    asModalBox: {
        background: '#fff', borderRadius: 18, padding: 28,
        width: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
        display: 'flex', flexDirection: 'column', gap: 16,
    },
    asModalTitle: { fontSize: 16, fontWeight: 800, color: '#0f172a', margin: 0 },
    asModalSub:   { fontSize: 13, color: '#64748b', marginTop: 4, lineHeight: 1.5 },
    asModalBtns:  { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 },
    asModalCancel: {
        padding: '9px 18px', background: '#f1f5f9', color: '#475569',
        border: '1px solid #e2e8f0', borderRadius: 9,
        fontSize: 13, fontWeight: 600, cursor: 'pointer',
    },
    asModalDelete: {
        padding: '9px 18px', background: '#dc2626', color: '#fff',
        border: 'none', borderRadius: 9,
        fontSize: 13, fontWeight: 700, cursor: 'pointer',
    },
};

const focusStyle = { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59,130,246,0.12)' };
const blurStyle  = { borderColor: '#e2e8f0', boxShadow: 'none' };
const emptyForm  = { name: '', code: '', type: '', manager: '', phone: '', email: '', city: '', state: '', address: '', status: true };

// ══════════════════════════════════════════════════════════════
//  STORE FORM  (Add / Edit)
// ══════════════════════════════════════════════════════════════
function StoreForm({ initial, onSave, onCancel, isEdit }) {
    const [form, setForm] = useState(initial || emptyForm);
    const [success, setSuccess] = useState(false);

    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            onSave({ ...form, id: initial?.id || Date.now() });
        }, 1400);
    };

    return (
        <div style={S.asFormCard}>
            {/* Header */}
            <div style={S.asFormHeader}>
                <div>
                    <h3 style={S.asFormTitle}>{isEdit ? 'Edit Store' : 'Add New Store'}</h3>
                    <p style={S.asFormSub}>{isEdit ? `Editing: ${initial?.name}` : 'Fill in the details to register a new store'}</p>
                </div>
                <button style={S.asFormClose} onClick={onCancel}><HiOutlineX /></button>
            </div>

            <div style={S.asFormBody}>
                {success && (
                    <div style={S.asSuccess}>
                        <span style={{ fontSize: 18 }}>&#10003;</span>
                        Store {isEdit ? 'updated' : 'added'} successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                    {/* ── Store Information ── */}
                    <div style={S.asInnerCard}>
                        <div style={S.asInnerTitle}>
                            <span style={S.asInnerIcon}><HiOutlineOfficeBuilding /></span>
                            Store Information
                        </div>
                        <div style={S.asGrid2}>
                            <div style={S.asFormGroup}>
                                <label style={S.asLabel}>Store Name <span style={S.asRequired}>*</span></label>
                                <input style={S.asInput} placeholder="e.g. Main Warehouse"
                                    value={form.name} onChange={(e) => set('name', e.target.value)}
                                    required
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />
                            </div>
                            <div style={S.asFormGroup}>
                                <label style={S.asLabel}>Store Code <span style={S.asRequired}>*</span></label>
                                <input style={S.asInput} placeholder="e.g. STR-004"
                                    value={form.code} onChange={(e) => set('code', e.target.value)}
                                    required
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />
                            </div>
                            <div style={S.asFormGroup}>
                                <label style={S.asLabel}>Store Type <span style={S.asRequired}>*</span></label>
                                <select style={S.asSelect} value={form.type}
                                    onChange={(e) => set('type', e.target.value)} required
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)}>
                                    <option value="">Select Type</option>
                                    {STORE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div style={S.asFormGroup}>
                                <label style={S.asLabel}>Address</label>
                                <input style={S.asInput} placeholder="Street / Building"
                                    value={form.address} onChange={(e) => set('address', e.target.value)}
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />
                            </div>
                        </div>
                    </div>

                    {/* ── Location ── */}
                    <div style={S.asInnerCard}>
                        <div style={S.asInnerTitle}>
                            <span style={S.asInnerIcon}><HiOutlineLocationMarker /></span>
                            Location
                        </div>
                        <div style={S.asGrid3}>
                            <div style={S.asFormGroup}>
                                <label style={S.asLabel}>City <span style={S.asRequired}>*</span></label>
                                <input style={S.asInput} placeholder="e.g. Mumbai"
                                    value={form.city} onChange={(e) => set('city', e.target.value)}
                                    required
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />
                            </div>
                            <div style={S.asFormGroup}>
                                <label style={S.asLabel}>State <span style={S.asRequired}>*</span></label>
                                <select style={S.asSelect} value={form.state}
                                    onChange={(e) => set('state', e.target.value)} required
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)}>
                                    <option value="">Select State</option>
                                    {INDIA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div style={S.asFormGroup}>
                                <label style={S.asLabel}>PIN Code</label>
                                <input style={S.asInput} placeholder="e.g. 400001"
                                    value={form.pin || ''} onChange={(e) => set('pin', e.target.value)}
                                    maxLength={6}
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />
                            </div>
                        </div>
                    </div>

                    {/* ── Manager / Contact ── */}
                    <div style={S.asInnerCard}>
                        <div style={S.asInnerTitle}>
                            <span style={S.asInnerIcon}><HiOutlineUser /></span>
                            Manager &amp; Contact
                        </div>
                        <div style={S.asGrid3}>
                            <div style={S.asFormGroup}>
                                <label style={S.asLabel}>Manager Name <span style={S.asRequired}>*</span></label>
                                <input style={S.asInput} placeholder="Full name"
                                    value={form.manager} onChange={(e) => set('manager', e.target.value)}
                                    required
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />
                            </div>
                            <div style={S.asFormGroup}>
                                <label style={S.asLabel}>Phone <span style={S.asRequired}>*</span></label>
                                <input style={S.asInput} placeholder="10-digit number"
                                    value={form.phone} onChange={(e) => set('phone', e.target.value)}
                                    required maxLength={10}
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />
                            </div>
                            <div style={S.asFormGroup}>
                                <label style={S.asLabel}>Email</label>
                                <input style={S.asInput} type="email" placeholder="store@company.in"
                                    value={form.email} onChange={(e) => set('email', e.target.value)}
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)} />
                            </div>
                        </div>
                    </div>

                    {/* ── Status Toggle ── */}
                    <div style={{ ...S.asInnerCard, padding: '16px 20px' }}>
                        <div style={S.asToggleRow}>
                            <div style={S.asToggleLabel}>
                                <span style={S.asToggleTitle}>Store Status</span>
                                <span style={S.asToggleSub}>
                                    {form.status ? 'Store is Active and operational' : 'Store is Inactive'}
                                </span>
                            </div>
                            <button
                                type="button"
                                style={S.asToggleTrack(form.status)}
                                onClick={() => set('status', !form.status)}
                            >
                                <div style={S.asToggleThumb(form.status)} />
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={S.asFooter}>
                        <button type="button" style={S.asCancelBtn} onClick={onCancel}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f5f9')}>
                            Cancel
                        </button>
                        <button type="submit" style={S.asSaveBtn}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                            {isEdit ? 'Save Changes' : 'Add Store'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
//  DELETE CONFIRM MODAL
// ══════════════════════════════════════════════════════════════
function DeleteModal({ store, onConfirm, onCancel }) {
    return (
        <div style={S.asModalOverlay}>
            <div style={S.asModalBox}>
                <div>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>&#128465;</div>
                    <h3 style={S.asModalTitle}>Delete Store?</h3>
                    <p style={S.asModalSub}>
                        Are you sure you want to delete <strong>{store.name}</strong> ({store.code})?
                        This action cannot be undone.
                    </p>
                </div>
                <div style={S.asModalBtns}>
                    <button style={S.asModalCancel} onClick={onCancel}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f5f9')}>
                        Cancel
                    </button>
                    <button style={S.asModalDelete} onClick={onConfirm}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function AddStore() {
    const [stores, setStores]       = useState(INITIAL_STORES);
    const [view, setView]           = useState('table');       // 'table' | 'add' | 'edit'
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [search, setSearch]       = useState('');
    const [filterType, setFilterType]   = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // ── Derived stats ──
    const activeCount   = stores.filter((s) => s.status === true  || s.status === 'Active').length;
    const inactiveCount = stores.filter((s) => s.status === false || s.status === 'Inactive').length;
    const typeSet       = [...new Set(stores.map((s) => s.type).filter(Boolean))];

    // ── Filtered list ──
    const filtered = stores.filter((s) => {
        const q = search.toLowerCase();
        const matchSearch = !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.city?.toLowerCase().includes(q) || s.manager?.toLowerCase().includes(q);
        const storeStatus = s.status === true || s.status === 'Active' ? 'Active' : 'Inactive';
        const matchType   = !filterType   || s.type === filterType;
        const matchStatus = !filterStatus || storeStatus === filterStatus;
        return matchSearch && matchType && matchStatus;
    });

    // ── Handlers ──
    const handleSave = (data) => {
        const statusStr = data.status === true || data.status === 'Active' ? 'Active' : 'Inactive';
        const normalized = { ...data, status: statusStr };
        if (editTarget) {
            setStores((prev) => prev.map((s) => s.id === normalized.id ? normalized : s));
        } else {
            setStores((prev) => [{ ...normalized, id: Date.now() }, ...prev]);
        }
        setView('table');
        setEditTarget(null);
    };

    const handleEdit = (store) => {
        setEditTarget({ ...store, status: store.status === 'Active' });
        setView('edit');
    };

    const handleDeleteConfirm = () => {
        setStores((prev) => prev.filter((s) => s.id !== deleteTarget.id));
        setDeleteTarget(null);
    };

    return (
        <div style={S.asOuter}>
            <div style={S.asScroll}>
                <div style={S.asWrap}>

                    {/* ── Page Header ── */}
                    <div style={S.asPageHeader}>
                        <div>
                            <h1 style={S.asPageTitle}>Store Management</h1>
                            <p style={S.asPageSub}>
                                {view === 'add'  ? 'Fill in details to register a new store' :
                                 view === 'edit' ? `Editing: ${editTarget?.name}` :
                                 'Manage all store locations and branches'}
                            </p>
                        </div>
                        {view === 'table' ? (
                            <button style={S.asAddBtn}
                                onClick={() => { setEditTarget(null); setView('add'); }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                                <HiOutlinePlus style={{ fontSize: 17 }} /> Add Store
                            </button>
                        ) : (
                            <button style={S.asBackBtn}
                                onClick={() => { setView('table'); setEditTarget(null); }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f5f9')}>
                                &#8592; Back to List
                            </button>
                        )}
                    </div>

                    {/* ══════════════════════════════════════════════
                        TABLE VIEW
                    ══════════════════════════════════════════════ */}
                    {view === 'table' && (
                        <>
                            {/* Stat Cards */}
                            <div style={S.asStatsRow}>
                                {[
                                    { label: 'Total Stores',    value: stores.length,  sub: 'Registered locations' },
                                    { label: 'Active',          value: activeCount,    sub: 'Operational stores' },
                                    { label: 'Inactive',        value: inactiveCount,  sub: 'Temporarily closed' },
                                    { label: 'Store Types',     value: typeSet.length, sub: 'Different categories' },
                                ].map((card) => (
                                    <div key={card.label} style={S.asStatCard}>
                                        <span style={S.asStatLabel}>{card.label}</span>
                                        <span style={S.asStatValue}>{card.value}</span>
                                        <span style={S.asStatSub}>{card.sub}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Toolbar */}
                            <div style={S.asToolbar}>
                                <div style={S.asSearchWrap}>
                                    <HiOutlineSearch style={{ color: '#94a3b8', fontSize: 16, flexShrink: 0 }} />
                                    <input
                                        style={S.asSearchInput}
                                        placeholder="Search by name, code, city or manager…"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {search && (
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, fontSize: 14 }}
                                            onClick={() => setSearch('')}>&#10005;</button>
                                    )}
                                </div>
                                <select style={S.asFilterSelect} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                    <option value="">All Types</option>
                                    {STORE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <select style={S.asFilterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                    <option value="">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Table */}
                            <div style={S.asTableCard}>
                                <div style={S.asTableHeader}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={S.asTableTitle}>All Stores</span>
                                        <span style={S.asTableCount}>{filtered.length}</span>
                                    </div>
                                </div>
                                <div style={S.asTableWrap}>
                                    {filtered.length === 0 ? (
                                        <div style={S.asEmpty}>
                                            <div style={{ fontSize: 38, marginBottom: 10 }}>&#127978;</div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>No stores found</div>
                                            <div style={{ fontSize: 12, marginTop: 4 }}>Try adjusting your search or filters</div>
                                        </div>
                                    ) : (
                                        <table style={S.asTable}>
                                            <thead>
                                                <tr>
                                                    {['#', 'Code', 'Store Name', 'Type', 'Manager', 'Location', 'Contact', 'Status', 'Actions'].map((h, i) => (
                                                        <th key={i} style={S.asTh}>{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filtered.map((store, i) => {
                                                    const ss = STATUS_STYLE[store.status] || STATUS_STYLE.Inactive;
                                                    return (
                                                        <tr key={store.id}
                                                            style={{ background: 'white', cursor: 'default' }}
                                                            onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                                                            onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}>
                                                            <td style={{ ...S.asTd, color: '#94a3b8', fontWeight: 600, width: 36 }}>{i + 1}</td>
                                                            <td style={S.asTdCode}>{store.code}</td>
                                                            <td style={S.asTdBold}>{store.name}</td>
                                                            <td style={S.asTd}>
                                                                <span style={S.asTypePill}>{store.type}</span>
                                                            </td>
                                                            <td style={S.asTd}>{store.manager}</td>
                                                            <td style={{ ...S.asTd, color: '#64748b' }}>
                                                                {store.city}{store.state ? `, ${store.state}` : ''}
                                                            </td>
                                                            <td style={{ ...S.asTd, color: '#64748b' }}>{store.phone}</td>
                                                            <td style={S.asTd}>
                                                                <span style={{ ...S.asStatusBadge, background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                                                                    <span style={{ fontSize: 8 }}>&#9679;</span>
                                                                    {store.status}
                                                                </span>
                                                            </td>
                                                            <td style={S.asTd}>
                                                                <div style={{ display: 'flex', gap: 6 }}>
                                                                    <button style={S.asEditBtn} onClick={() => handleEdit(store)}
                                                                        onMouseEnter={(e) => (e.currentTarget.style.background = '#dbeafe')}
                                                                        onMouseLeave={(e) => (e.currentTarget.style.background = '#eff6ff')}>
                                                                        <HiOutlinePencil /> Edit
                                                                    </button>
                                                                    <button style={S.asDeleteBtn} onClick={() => setDeleteTarget(store)}
                                                                        onMouseEnter={(e) => (e.currentTarget.style.background = '#fecaca')}
                                                                        onMouseLeave={(e) => (e.currentTarget.style.background = '#fee2e2')}>
                                                                        <HiOutlineTrash /> Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* ══════════════════════════════════════════════
                        ADD / EDIT FORM VIEW
                    ══════════════════════════════════════════════ */}
                    {(view === 'add' || view === 'edit') && (
                        <StoreForm
                            initial={editTarget}
                            isEdit={view === 'edit'}
                            onSave={handleSave}
                            onCancel={() => { setView('table'); setEditTarget(null); }}
                        />
                    )}

                </div>
            </div>

            {/* ── Delete Confirm Modal ── */}
            {deleteTarget && (
                <DeleteModal
                    store={deleteTarget}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}
