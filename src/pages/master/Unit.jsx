// import { useState } from 'react';
// import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX, HiOutlineSearch } from 'react-icons/hi';
// import { units as initialData } from '../../data/data';

// export default function Unit() {
//     const [data, setData] = useState(initialData);
//     const [search, setSearch] = useState('');
//     const [modal, setModal] = useState(false);
//     const [editing, setEditing] = useState(null);
//     const [form, setForm] = useState({ name: '', abbreviation: '' });

//     const filtered = data.filter(
//         (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.abbreviation.toLowerCase().includes(search.toLowerCase())
//     );

//     const openAdd = () => { setEditing(null); setForm({ name: '', abbreviation: '' }); setModal(true); };
//     const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModal(true); };

//     const handleSave = () => {
//         if (!form.name || !form.abbreviation) return;
//         if (editing) {
//             setData(data.map((d) => (d.id === editing.id ? { ...d, ...form } : d)));
//         } else {
//             setData([...data, { ...form, id: Date.now() }]);
//         }
//         setModal(false);
//     };

//     const handleDelete = (id) => {
//         if (confirm('Delete this unit?')) setData(data.filter((d) => d.id !== id));
//     };

//     return (
//         <div>
//             <div className="page-header">
//                 <div>
//                     <h1 className="page-title">Units</h1>
//                     <p className="page-subtitle">Manage measurement units</p>
//                 </div>
//                 <button className="btn btn-primary" onClick={openAdd}><HiOutlinePlus /> Add Unit</button>
//             </div>

//             <div className="card p-5">
//                 <div className="mb-4">
//                     <div className="search-box">
//                         <HiOutlineSearch className="search-icon" />
//                         <input type="text" placeholder="Search units..." value={search} onChange={(e) => setSearch(e.target.value)} />
//                     </div>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="erp-table">
//                         <thead>
//                             <tr><th>#</th><th>Unit Name</th><th>Abbreviation</th><th>Actions</th></tr>
//                         </thead>
//                         <tbody>
//                             {filtered.map((u, i) => (
//                                 <tr key={u.id}>
//                                     <td>{i + 1}</td>
//                                     <td className="font-semibold">{u.name}</td>
//                                     <td><span className="badge badge-info">{u.abbreviation}</span></td>
//                                     <td>
//                                         <div className="flex gap-1">
//                                             <button className="btn btn-secondary btn-sm" onClick={() => openEdit(u)}><HiOutlinePencil /></button>
//                                             <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}><HiOutlineTrash /></button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                             {filtered.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-slate-400">No units found</td></tr>}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {modal && (
//                 <div className="modal-overlay" onClick={() => setModal(false)}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <div className="flex items-center justify-between mb-5">
//                             <h3 className="text-lg font-bold text-slate-800">{editing ? 'Edit' : 'Add'} Unit</h3>
//                             <button onClick={() => setModal(false)} className="text-slate-400 hover:text-slate-600"><HiOutlineX className="text-xl" /></button>
//                         </div>
//                         <div className="space-y-4">
//                             <div><label className="form-label">Unit Name</label><input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Kilogram" /></div>
//                             <div><label className="form-label">Abbreviation</label><input className="form-input" value={form.abbreviation} onChange={(e) => setForm({ ...form, abbreviation: e.target.value })} placeholder="e.g. Kg" /></div>
//                         </div>
//                         <div className="flex justify-end gap-2 mt-6">
//                             <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
//                             <button className="btn btn-primary" onClick={handleSave}>Save</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }







import { useState } from 'react';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX, HiOutlineSearch } from 'react-icons/hi';
import { units as initialData } from '../../data/data';

const styles = {
    productWrapper: {
        padding: '24px',
        fontFamily: 'sans-serif',
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
    },
    productHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
    },
    productTitle: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#1e293b',
        margin: 0,
    },
    productSubtitle: {
        fontSize: '13px',
        color: '#94a3b8',
        marginTop: '4px',
        marginBottom: 0,
    },
    productBtnPrimary: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        padding: '9px 18px',
        fontSize: '13.5px',
        fontWeight: '600',
        cursor: 'pointer',
        borderRadius: '0px',
    },
    productCard: {
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        padding: '20px',
    },
    productSearchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid #e2e8f0',
        padding: '8px 14px',
        backgroundColor: '#f8fafc',
        marginBottom: '16px',
    },
    productSearchIcon: {
        color: '#94a3b8',
        fontSize: '16px',
        flexShrink: 0,
    },
    productSearchInput: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: '13.5px',
        color: '#334155',
        width: '100%',
    },
    productTableWrapper: {
        overflowX: 'auto',
    },
    productTable: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13.5px',
    },
    productThead: {
        backgroundColor: '#f1f5f9',
    },
    productTh: {
        textAlign: 'left',
        padding: '11px 16px',
        fontWeight: '600',
        color: '#475569',
        fontSize: '12.5px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: '1px solid #e2e8f0',
    },
    productTd: {
        padding: '11px 16px',
        color: '#334155',
        borderBottom: '1px solid #f1f5f9',
    },
    productTdBold: {
        padding: '11px 16px',
        color: '#1e293b',
        fontWeight: '600',
        borderBottom: '1px solid #f1f5f9',
    },
    productBadge: {
        display: 'inline-block',
        padding: '3px 10px',
        backgroundColor: '#dbeafe',
        color: '#1d4ed8',
        fontSize: '12px',
        fontWeight: '600',
        borderRadius: '0px',
    },
    productActionsCell: {
        padding: '11px 16px',
        borderBottom: '1px solid #f1f5f9',
    },
    productActionRow: {
        display: 'flex',
        gap: '6px',
    },
    productBtnEdit: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 10px',
        backgroundColor: '#f1f5f9',
        color: '#475569',
        border: '1px solid #e2e8f0',
        cursor: 'pointer',
        fontSize: '15px',
        borderRadius: '0px',
    },
    productBtnDelete: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 10px',
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        border: '1px solid #fecaca',
        cursor: 'pointer',
        fontSize: '15px',
        borderRadius: '0px',
    },
    productEmptyRow: {
        textAlign: 'center',
        padding: '32px',
        color: '#94a3b8',
        fontSize: '13.5px',
    },
    productModalOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15,23,42,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    productModalContent: {
        backgroundColor: '#ffffff',
        padding: '28px',
        width: '100%',
        maxWidth: '420px',
        borderRadius: '0px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    },
    productModalHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    productModalTitle: {
        fontSize: '17px',
        fontWeight: '700',
        color: '#1e293b',
        margin: 0,
    },
    productModalClose: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#94a3b8',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    productFormGroup: {
        marginBottom: '16px',
    },
    productFormLabel: {
        display: 'block',
        fontSize: '12.5px',
        fontWeight: '600',
        color: '#475569',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
    },
    productFormInput: {
        width: '100%',
        padding: '9px 13px',
        border: '1px solid #e2e8f0',
        fontSize: '13.5px',
        color: '#1e293b',
        backgroundColor: '#f8fafc',
        outline: 'none',
        boxSizing: 'border-box',
        borderRadius: '0px',
    },
    productModalFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        marginTop: '24px',
    },
    productBtnSecondary: {
        padding: '9px 18px',
        fontSize: '13.5px',
        fontWeight: '600',
        border: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        color: '#475569',
        cursor: 'pointer',
        borderRadius: '0px',
    },
};

export default function Unit() {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', abbreviation: '' });

    const filtered = data.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.abbreviation.toLowerCase().includes(search.toLowerCase())
    );

    const openAdd = () => {
        setEditing(null);
        setForm({ name: '', abbreviation: '' });
        setModal(true);
    };

    const openEdit = (item) => {
        setEditing(item);
        setForm({ ...item });
        setModal(true);
    };

    const handleSave = () => {
        if (!form.name || !form.abbreviation) return;
        if (editing) {
            setData(data.map((d) => (d.id === editing.id ? { ...d, ...form } : d)));
        } else {
            setData([...data, { ...form, id: Date.now() }]);
        }
        setModal(false);
    };

    const handleDelete = (id) => {
        if (confirm('Delete this unit?')) setData(data.filter((d) => d.id !== id));
    };

    return (
        <div style={styles.productWrapper}>
            {/* Header */}
            <div style={styles.productHeader}>
                <div>
                    <h1 style={styles.productTitle}>Units</h1>
                    <p style={styles.productSubtitle}>Manage measurement units</p>
                </div>
                <button style={styles.productBtnPrimary} onClick={openAdd}>
                    <HiOutlinePlus /> Add Unit
                </button>
            </div>

            {/* Card */}
            <div style={styles.productCard}>
                {/* Search */}
                <div style={styles.productSearchBox}>
                    <HiOutlineSearch style={styles.productSearchIcon} />
                    <input
                        style={styles.productSearchInput}
                        type="text"
                        placeholder="Search units..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div style={styles.productTableWrapper}>
                    <table style={styles.productTable}>
                        <thead style={styles.productThead}>
                            <tr>
                                <th style={styles.productTh}>#</th>
                                <th style={styles.productTh}>Unit Name</th>
                                <th style={styles.productTh}>Abbreviation</th>
                                <th style={styles.productTh}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u, i) => (
                                <tr key={u.id}>
                                    <td style={styles.productTd}>{i + 1}</td>
                                    <td style={styles.productTdBold}>{u.name}</td>
                                    <td style={styles.productTd}>
                                        <span style={styles.productBadge}>{u.abbreviation}</span>
                                    </td>
                                    <td style={styles.productActionsCell}>
                                        <div style={styles.productActionRow}>
                                            <button style={styles.productBtnEdit} onClick={() => openEdit(u)}>
                                                <HiOutlinePencil />
                                            </button>
                                            <button style={styles.productBtnDelete} onClick={() => handleDelete(u.id)}>
                                                <HiOutlineTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={4} style={styles.productEmptyRow}>
                                        No units found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modal && (
                <div style={styles.productModalOverlay} onClick={() => setModal(false)}>
                    <div style={styles.productModalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.productModalHeader}>
                            <h3 style={styles.productModalTitle}>{editing ? 'Edit' : 'Add'} Unit</h3>
                            <button style={styles.productModalClose} onClick={() => setModal(false)}>
                                <HiOutlineX />
                            </button>
                        </div>

                        <div style={styles.productFormGroup}>
                            <label style={styles.productFormLabel}>Unit Name</label>
                            <input
                                style={styles.productFormInput}
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="e.g. Kilogram"
                            />
                        </div>
                        <div style={styles.productFormGroup}>
                            <label style={styles.productFormLabel}>Abbreviation</label>
                            <input
                                style={styles.productFormInput}
                                value={form.abbreviation}
                                onChange={(e) => setForm({ ...form, abbreviation: e.target.value })}
                                placeholder="e.g. Kg"
                            />
                        </div>

                        <div style={styles.productModalFooter}>
                            <button style={styles.productBtnSecondary} onClick={() => setModal(false)}>
                                Cancel
                            </button>
                            <button style={styles.productBtnPrimary} onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}