import { useState } from 'react';
import {
    HiOutlinePlus, HiOutlinePencil, HiOutlineTrash,
    HiOutlineX, HiOutlineSearch,
} from 'react-icons/hi';
import { products as initialData, materialTypes, units } from '../../data/data';

// ── Styles ────────────────────────────────────────────────────
const S = {
    prodWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
    },

    // Page Header
    prodPageHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
    },
    prodPageTitle: {
        fontSize: 22,
        fontWeight: 700,
        color: '#0f172a',
        margin: 0,
        lineHeight: 1.2,
    },
    prodPageSubtitle: {
        fontSize: 13,
        color: '#94a3b8',
        marginTop: 4,
    },

    // Add Button
    prodAddBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 20px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(59,130,246,0.30)',
        transition: 'opacity 0.15s',
    },

    // Card
    prodCard: {
        background: '#ffffff',
        borderRadius: 18,
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        padding: 24,
    },

    // Filter row
    prodFilterRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
    },
    prodSearchBox: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    prodSearchIcon: {
        position: 'absolute',
        left: 12,
        fontSize: 16,
        color: '#94a3b8',
        pointerEvents: 'none',
    },
    prodSearchInput: {
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 38,
        paddingRight: 14,
        border: '1.5px solid #e2e8f0',
        borderRadius: 10,
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        width: 260,
        background: '#fff',
        color: '#1e293b',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    prodFilterSelect: {
        padding: '9px 14px',
        border: '1.5px solid #e2e8f0',
        borderRadius: 10,
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        background: '#fff',
        color: '#1e293b',
        width: 192,
        cursor: 'pointer',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    },

    // Table
    prodTableWrap: { overflowX: 'auto' },
    prodTable: { width: '100%', borderCollapse: 'collapse' },
    prodTh: {
        textAlign: 'left',
        padding: '11px 14px',
        fontSize: 11,
        fontWeight: 700,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        borderBottom: '1px solid #f1f5f9',
        background: '#f8fafc',
        whiteSpace: 'nowrap',
    },
    prodTd: {
        padding: '13px 14px',
        fontSize: 13.5,
        color: '#334155',
        borderBottom: '1px solid #f8fafc',
        verticalAlign: 'middle',
    },
    prodTdBold: {
        padding: '13px 14px',
        fontSize: 13.5,
        fontWeight: 600,
        color: '#0f172a',
        borderBottom: '1px solid #f8fafc',
        verticalAlign: 'middle',
    },
    prodTdAmt: {
        padding: '13px 14px',
        fontSize: 13.5,
        fontWeight: 600,
        color: '#0f172a',
        borderBottom: '1px solid #f8fafc',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
    },
    prodSkuBadge: {
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 999,
        fontSize: 11.5,
        fontWeight: 700,
        background: '#dbeafe',
        color: '#1d4ed8',
        letterSpacing: '0.03em',
    },
    prodActionRow: {
        display: 'flex',
        gap: 6,
        alignItems: 'center',
    },
    prodEditBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 8,
        border: '1px solid #dbeafe',
        background: '#eff6ff',
        color: '#2563eb',
        cursor: 'pointer',
        fontSize: 15,
        transition: 'background 0.15s',
    },
    prodDeleteBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 8,
        border: '1px solid #fecaca',
        background: '#fee2e2',
        color: '#dc2626',
        cursor: 'pointer',
        fontSize: 15,
        transition: 'background 0.15s',
    },
    prodEmptyCell: {
        textAlign: 'center',
        padding: '40px 14px',
        fontSize: 14,
        color: '#94a3b8',
        borderBottom: '1px solid #f8fafc',
    },

    // Modal overlay
    prodModalOverlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        animation: 'fadeIn 0.2s ease',
    },
    prodModalContent: {
        background: '#fff',
        borderRadius: 18,
        padding: 28,
        width: '90%',
        maxWidth: 520,
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
        animation: 'slideUp 0.25s ease',
    },
    prodModalHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    prodModalTitle: {
        fontSize: 18,
        fontWeight: 700,
        color: '#0f172a',
        margin: 0,
    },
    prodModalCloseBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 8,
        border: 'none',
        background: '#f1f5f9',
        color: '#64748b',
        cursor: 'pointer',
        fontSize: 18,
        transition: 'background 0.15s',
    },

    // Form
    prodFormBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    prodFormRow2: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
    },
    prodFormGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
    },
    prodFormLabel: {
        fontSize: 13,
        fontWeight: 600,
        color: '#475569',
    },
    prodFormInput: {
        width: '100%',
        padding: '10px 14px',
        border: '1.5px solid #e2e8f0',
        borderRadius: 10,
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        background: '#fff',
        color: '#1e293b',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box',
    },
    prodFormSelect: {
        width: '100%',
        padding: '10px 14px',
        border: '1.5px solid #e2e8f0',
        borderRadius: 10,
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        background: '#fff',
        color: '#1e293b',
        cursor: 'pointer',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box',
    },

    // Modal footer
    prodModalFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 24,
    },
    prodCancelBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '9px 20px',
        background: '#f0f4fb',
        color: '#3b82f6',
        border: '1px solid #dbeafe',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.15s',
    },
    prodSaveBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '9px 20px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(59,130,246,0.30)',
        transition: 'opacity 0.15s',
    },
};

// ── Component ─────────────────────────────────────────────────
export default function Product() {
    const [data, setData]           = useState(initialData);
    const [search, setSearch]       = useState('');
    const [filterType, setFilterType] = useState('');
    const [modal, setModal]         = useState(false);
    const [editing, setEditing]     = useState(null);
    const [form, setForm]           = useState({
        name: '', materialType: '', unit: '', price: '', sku: '',
    });

    const filtered = data.filter((p) => {
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.sku.toLowerCase().includes(search.toLowerCase());
        const matchType = !filterType || p.materialType === filterType;
        return matchSearch && matchType;
    });

    const openAdd = () => {
        setEditing(null);
        setForm({
            name: '',
            materialType: materialTypes[0]?.name || '',
            unit: units[0]?.abbreviation || '',
            price: '',
            sku: '',
        });
        setModal(true);
    };

    const openEdit = (item) => {
        setEditing(item);
        setForm({ ...item });
        setModal(true);
    };

    const handleSave = () => {
        if (!form.name || !form.sku) return;
        if (editing) {
            setData(data.map((d) =>
                d.id === editing.id ? { ...d, ...form, price: Number(form.price) } : d
            ));
        } else {
            setData([...data, { ...form, id: Date.now(), price: Number(form.price) }]);
        }
        setModal(false);
    };

    const handleDelete = (id) => {
        if (confirm('Delete this product?')) setData(data.filter((d) => d.id !== id));
    };

    // Focus styles via onFocus/onBlur
    const focusStyle  = { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59,130,246,0.12)' };
    const blurStyle   = { borderColor: '#e2e8f0', boxShadow: 'none' };

    return (
        <div className="prod-wrapper" style={S.prodWrapper}>

            {/* ── Page Header ── */}
            <div className="prod-page-header" style={S.prodPageHeader}>
                <div className="prod-page-heading">
                    <h1 className="prod-page-title"    style={S.prodPageTitle}>Products</h1>
                    <p className="prod-page-subtitle"  style={S.prodPageSubtitle}>Manage product catalog</p>
                </div>
                <button
                    className="prod-add-btn"
                    style={S.prodAddBtn}
                    onClick={openAdd}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                    <HiOutlinePlus style={{ fontSize: 18 }} />
                    Add Product
                </button>
            </div>

            {/* ── Table Card ── */}
            <div className="prod-card" style={S.prodCard}>

                {/* Filter row */}
                <div className="prod-filter-row" style={S.prodFilterRow}>
                    <div className="prod-search-box" style={S.prodSearchBox}>
                        <HiOutlineSearch className="prod-search-icon" style={S.prodSearchIcon} />
                        <input
                            className="prod-search-input"
                            style={S.prodSearchInput}
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                            onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
                        />
                    </div>
                    <select
                        className="prod-filter-select"
                        style={S.prodFilterSelect}
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                        onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
                    >
                        <option value="">All Types</option>
                        {materialTypes.map((m) => (
                            <option key={m.id} value={m.name}>{m.name}</option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <div className="prod-table-wrap" style={S.prodTableWrap}>
                    <table className="prod-table" style={S.prodTable}>
                        <thead>
                            <tr className="prod-thead-row">
                                {['#', 'SKU', 'Product Name', 'Material', 'Unit', 'Price (₹)', 'Actions'].map((h) => (
                                    <th className="prod-th" key={h} style={S.prodTh}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p, i) => (
                                <tr
                                    className="prod-tr"
                                    key={p.id}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <td className="prod-td-num"    style={S.prodTd}>{i + 1}</td>
                                    <td className="prod-td-sku"    style={S.prodTd}>
                                        <span className="prod-sku-badge" style={S.prodSkuBadge}>{p.sku}</span>
                                    </td>
                                    <td className="prod-td-name"   style={S.prodTdBold}>{p.name}</td>
                                    <td className="prod-td-mat"    style={S.prodTd}>{p.materialType}</td>
                                    <td className="prod-td-unit"   style={S.prodTd}>{p.unit}</td>
                                    <td className="prod-td-price"  style={S.prodTdAmt}>₹{p.price.toLocaleString('en-IN')}</td>
                                    <td className="prod-td-actions" style={S.prodTd}>
                                        <div className="prod-action-row" style={S.prodActionRow}>
                                            <button
                                                className="prod-edit-btn"
                                                style={S.prodEditBtn}
                                                onClick={() => openEdit(p)}
                                                title="Edit"
                                                onMouseEnter={(e) => (e.currentTarget.style.background = '#dbeafe')}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = '#eff6ff')}
                                            >
                                                <HiOutlinePencil />
                                            </button>
                                            <button
                                                className="prod-delete-btn"
                                                style={S.prodDeleteBtn}
                                                onClick={() => handleDelete(p.id)}
                                                title="Delete"
                                                onMouseEnter={(e) => (e.currentTarget.style.background = '#fecaca')}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = '#fee2e2')}
                                            >
                                                <HiOutlineTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr className="prod-empty-row">
                                    <td colSpan={7} className="prod-empty-cell" style={S.prodEmptyCell}>
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Modal ── */}
            {modal && (
                <div
                    className="prod-modal-overlay"
                    style={S.prodModalOverlay}
                    onClick={() => setModal(false)}
                >
                    <div
                        className="prod-modal-content"
                        style={S.prodModalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="prod-modal-header" style={S.prodModalHeader}>
                            <h3 className="prod-modal-title" style={S.prodModalTitle}>
                                {editing ? 'Edit' : 'Add'} Product
                            </h3>
                            <button
                                className="prod-modal-close-btn"
                                style={S.prodModalCloseBtn}
                                onClick={() => setModal(false)}
                                onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                            >
                                <HiOutlineX />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="prod-form-body" style={S.prodFormBody}>

                            {/* Product Name */}
                            <div className="prod-form-group" style={S.prodFormGroup}>
                                <label className="prod-form-label" style={S.prodFormLabel}>
                                    Product Name
                                </label>
                                <input
                                    className="prod-form-input"
                                    style={S.prodFormInput}
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Product name"
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
                                />
                            </div>

                            {/* SKU */}
                            <div className="prod-form-group" style={S.prodFormGroup}>
                                <label className="prod-form-label" style={S.prodFormLabel}>SKU</label>
                                <input
                                    className="prod-form-input"
                                    style={S.prodFormInput}
                                    value={form.sku}
                                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                                    placeholder="e.g. STL-FB-025"
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
                                />
                            </div>

                            {/* Material Type + Unit */}
                            <div className="prod-form-row-2" style={S.prodFormRow2}>
                                <div className="prod-form-group" style={S.prodFormGroup}>
                                    <label className="prod-form-label" style={S.prodFormLabel}>
                                        Material Type
                                    </label>
                                    <select
                                        className="prod-form-select"
                                        style={S.prodFormSelect}
                                        value={form.materialType}
                                        onChange={(e) => setForm({ ...form, materialType: e.target.value })}
                                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                        onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
                                    >
                                        {materialTypes.map((m) => (
                                            <option key={m.id} value={m.name}>{m.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="prod-form-group" style={S.prodFormGroup}>
                                    <label className="prod-form-label" style={S.prodFormLabel}>Unit</label>
                                    <select
                                        className="prod-form-select"
                                        style={S.prodFormSelect}
                                        value={form.unit}
                                        onChange={(e) => setForm({ ...form, unit: e.target.value })}
                                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                        onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
                                    >
                                        {units.map((u) => (
                                            <option key={u.id} value={u.abbreviation}>
                                                {u.name} ({u.abbreviation})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="prod-form-group" style={S.prodFormGroup}>
                                <label className="prod-form-label" style={S.prodFormLabel}>
                                    Price (₹)
                                </label>
                                <input
                                    className="prod-form-input"
                                    style={S.prodFormInput}
                                    type="number"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    placeholder="0"
                                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="prod-modal-footer" style={S.prodModalFooter}>
                            <button
                                className="prod-cancel-btn"
                                style={S.prodCancelBtn}
                                onClick={() => setModal(false)}
                                onMouseEnter={(e) => (e.currentTarget.style.background = '#dbeafe')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = '#f0f4fb')}
                            >
                                Cancel
                            </button>
                            <button
                                className="prod-save-btn"
                                style={S.prodSaveBtn}
                                onClick={handleSave}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
