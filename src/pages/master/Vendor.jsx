// import { useState } from 'react';
// import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX, HiOutlineSearch } from 'react-icons/hi';
// import { vendors as initialData } from '../../data/data';

// export default function Vendor() {
//     const [data, setData] = useState(initialData);
//     const [search, setSearch] = useState('');
//     const [modal, setModal] = useState(false);
//     const [editing, setEditing] = useState(null);
//     const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', gst: '', city: '', address: '', status: 'Active' });

//     const filtered = data.filter(
//         (v) => v.name.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase())
//     );

//     const openAdd = () => { setEditing(null); setForm({ name: '', contact: '', email: '', phone: '', gst: '', city: '', address: '', status: 'Active' }); setModal(true); };
//     const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModal(true); };

//     const handleSave = () => {
//         if (!form.name || !form.contact) return;
//         if (editing) {
//             setData(data.map((d) => (d.id === editing.id ? { ...d, ...form } : d)));
//         } else {
//             setData([...data, { ...form, id: Date.now() }]);
//         }
//         setModal(false);
//     };

//     const handleDelete = (id) => {
//         if (confirm('Delete this vendor?')) setData(data.filter((d) => d.id !== id));
//     };

//     return (
//         <div>
//             <div className="page-header">
//                 <div>
//                     <h1 className="page-title">Vendors</h1>
//                     <p className="page-subtitle">Manage vendor / supplier records</p>
//                 </div>
//                 <button className="btn btn-primary" onClick={openAdd}><HiOutlinePlus /> Add Vendor</button>
//             </div>

//             <div className="card p-5">
//                 <div className="mb-4">
//                     <div className="search-box">
//                         <HiOutlineSearch className="search-icon" />
//                         <input type="text" placeholder="Search vendors..." value={search} onChange={(e) => setSearch(e.target.value)} />
//                     </div>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="erp-table">
//                         <thead>
//                             <tr><th>#</th><th>Vendor Name</th><th>Contact Person</th><th>Email</th><th>Phone</th><th>City</th><th>GST</th><th>Status</th><th>Actions</th></tr>
//                         </thead>
//                         <tbody>
//                             {filtered.map((v, i) => (
//                                 <tr key={v.id}>
//                                     <td>{i + 1}</td>
//                                     <td className="font-semibold">{v.name}</td>
//                                     <td>{v.contact}</td>
//                                     <td className="text-blue-600">{v.email}</td>
//                                     <td>{v.phone}</td>
//                                     <td>{v.city}</td>
//                                     <td className="text-xs font-mono">{v.gst}</td>
//                                     <td><span className={`badge ${v.status === 'Active' ? 'badge-success' : 'badge-gray'}`}>{v.status}</span></td>
//                                     <td>
//                                         <div className="flex gap-1">
//                                             <button className="btn btn-secondary btn-sm" onClick={() => openEdit(v)}><HiOutlinePencil /></button>
//                                             <button className="btn btn-danger btn-sm" onClick={() => handleDelete(v.id)}><HiOutlineTrash /></button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                             {filtered.length === 0 && <tr><td colSpan={9} className="text-center py-8 text-slate-400">No vendors found</td></tr>}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {modal && (
//                 <div className="modal-overlay" onClick={() => setModal(false)}>
//                     <div className="modal-content !max-w-lg" onClick={(e) => e.stopPropagation()}>
//                         <div className="flex items-center justify-between mb-5">
//                             <h3 className="text-lg font-bold text-slate-800">{editing ? 'Edit' : 'Add'} Vendor</h3>
//                             <button onClick={() => setModal(false)} className="text-slate-400 hover:text-slate-600"><HiOutlineX className="text-xl" /></button>
//                         </div>
//                         <div className="space-y-4">
//                             <div><label className="form-label">Vendor Name</label><input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Company name" /></div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div><label className="form-label">Contact Person</label><input className="form-input" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Person name" /></div>
//                                 <div><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" /></div>
//                             </div>
//                             <div><label className="form-label">Email</label><input className="form-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@company.com" /></div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div><label className="form-label">City</label><input className="form-input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" /></div>
//                                 <div><label className="form-label">GST Number</label><input className="form-input" value={form.gst} onChange={(e) => setForm({ ...form, gst: e.target.value })} placeholder="GST No." /></div>
//                             </div>
//                             <div><label className="form-label">Address</label><input className="form-input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full address" /></div>
//                             <div><label className="form-label">Status</label><select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>Inactive</option></select></div>
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
import { vendors as initialData } from '../../data/data';

const styles = {
    VVWrapper: {
        padding: '24px',
        fontFamily: 'sans-serif',
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
    },
    VVHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
    },
    VVTitle: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#1e293b',
        margin: 0,
    },
    VVSubtitle: {
        fontSize: '13px',
        color: '#94a3b8',
        marginTop: '4px',
        marginBottom: 0,
    },
    VVBtnPrimary: {
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
    VVCard: {
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        padding: '20px',
    },
    VVSearchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid #e2e8f0',
        padding: '8px 14px',
        backgroundColor: '#f8fafc',
        marginBottom: '16px',
    },
    VVSearchIcon: {
        color: '#94a3b8',
        fontSize: '16px',
        flexShrink: 0,
    },
    VVSearchInput: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: '13.5px',
        color: '#334155',
        width: '100%',
    },
    VVTableWrapper: {
        overflowX: 'auto',
    },
    VVTable: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13.5px',
    },
    VVThead: {
        backgroundColor: '#f1f5f9',
    },
    VVTh: {
        textAlign: 'left',
        padding: '11px 16px',
        fontWeight: '600',
        color: '#475569',
        fontSize: '12.5px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: '1px solid #e2e8f0',
        whiteSpace: 'nowrap',
    },
    VVTd: {
        padding: '11px 16px',
        color: '#334155',
        borderBottom: '1px solid #f1f5f9',
        whiteSpace: 'nowrap',
    },
    VVTdBold: {
        padding: '11px 16px',
        color: '#1e293b',
        fontWeight: '600',
        borderBottom: '1px solid #f1f5f9',
        whiteSpace: 'nowrap',
    },
    VVTdBlue: {
        padding: '11px 16px',
        color: '#2563eb',
        borderBottom: '1px solid #f1f5f9',
        whiteSpace: 'nowrap',
    },
    VVTdMono: {
        padding: '11px 16px',
        color: '#334155',
        fontSize: '12px',
        fontFamily: 'monospace',
        borderBottom: '1px solid #f1f5f9',
        whiteSpace: 'nowrap',
    },
    VVActionsCell: {
        padding: '11px 16px',
        borderBottom: '1px solid #f1f5f9',
    },
    VVActionRow: {
        display: 'flex',
        gap: '6px',
    },
    VVBadgeSuccess: {
        display: 'inline-block',
        padding: '3px 10px',
        backgroundColor: '#dcfce7',
        color: '#16a34a',
        fontSize: '12px',
        fontWeight: '600',
        borderRadius: '0px',
    },
    VVBadgeGray: {
        display: 'inline-block',
        padding: '3px 10px',
        backgroundColor: '#f1f5f9',
        color: '#64748b',
        fontSize: '12px',
        fontWeight: '600',
        borderRadius: '0px',
    },
    VVBtnEdit: {
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
    VVBtnDelete: {
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
    VVEmptyRow: {
        textAlign: 'center',
        padding: '32px',
        color: '#94a3b8',
        fontSize: '13.5px',
    },
    VVModalOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15,23,42,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    VVModalContent: {
        backgroundColor: '#ffffff',
        padding: '28px',
        width: '100%',
        maxWidth: '520px',
        borderRadius: '0px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    VVModalHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    VVModalTitle: {
        fontSize: '17px',
        fontWeight: '700',
        color: '#1e293b',
        margin: 0,
    },
    VVModalClose: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#94a3b8',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    VVFormGroup: {
        marginBottom: '16px',
    },
    VVFormLabel: {
        display: 'block',
        fontSize: '12.5px',
        fontWeight: '600',
        color: '#475569',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
    },
    VVFormInput: {
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
    VVFormSelect: {
        width: '100%',
        padding: '9px 13px',
        border: '1px solid #e2e8f0',
        fontSize: '13.5px',
        color: '#1e293b',
        backgroundColor: '#f8fafc',
        outline: 'none',
        boxSizing: 'border-box',
        borderRadius: '0px',
        cursor: 'pointer',
    },
    VVFormGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '16px',
    },
    VVModalFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        marginTop: '24px',
    },
    VVBtnSecondary: {
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

export default function Vendor() {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', gst: '', city: '', address: '', status: 'Active' });

    const filtered = data.filter(
        (v) =>
            v.name.toLowerCase().includes(search.toLowerCase()) ||
            v.city.toLowerCase().includes(search.toLowerCase())
    );

    const openAdd = () => {
        setEditing(null);
        setForm({ name: '', contact: '', email: '', phone: '', gst: '', city: '', address: '', status: 'Active' });
        setModal(true);
    };

    const openEdit = (item) => {
        setEditing(item);
        setForm({ ...item });
        setModal(true);
    };

    const handleSave = () => {
        if (!form.name || !form.contact) return;
        if (editing) {
            setData(data.map((d) => (d.id === editing.id ? { ...d, ...form } : d)));
        } else {
            setData([...data, { ...form, id: Date.now() }]);
        }
        setModal(false);
    };

    const handleDelete = (id) => {
        if (confirm('Delete this vendor?')) setData(data.filter((d) => d.id !== id));
    };

    return (
        <div style={styles.VVWrapper}>
            {/* Header */}
            <div style={styles.VVHeader}>
                <div>
                    <h1 style={styles.VVTitle}>Vendors</h1>
                    <p style={styles.VVSubtitle}>Manage vendor / supplier records</p>
                </div>
                <button style={styles.VVBtnPrimary} onClick={openAdd}>
                    <HiOutlinePlus /> Add Vendor
                </button>
            </div>

            {/* Card */}
            <div style={styles.VVCard}>
                {/* Search */}
                <div style={styles.VVSearchBox}>
                    <HiOutlineSearch style={styles.VVSearchIcon} />
                    <input
                        style={styles.VVSearchInput}
                        type="text"
                        placeholder="Search vendors..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div style={styles.VVTableWrapper}>
                    <table style={styles.VVTable}>
                        <thead style={styles.VVThead}>
                            <tr>
                                <th style={styles.VVTh}>#</th>
                                <th style={styles.VVTh}>Vendor Name</th>
                                <th style={styles.VVTh}>Contact Person</th>
                                <th style={styles.VVTh}>Email</th>
                                <th style={styles.VVTh}>Phone</th>
                                <th style={styles.VVTh}>City</th>
                                <th style={styles.VVTh}>GST</th>
                                <th style={styles.VVTh}>Status</th>
                                <th style={styles.VVTh}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((v, i) => (
                                <tr key={v.id}>
                                    <td style={styles.VVTd}>{i + 1}</td>
                                    <td style={styles.VVTdBold}>{v.name}</td>
                                    <td style={styles.VVTd}>{v.contact}</td>
                                    <td style={styles.VVTdBlue}>{v.email}</td>
                                    <td style={styles.VVTd}>{v.phone}</td>
                                    <td style={styles.VVTd}>{v.city}</td>
                                    <td style={styles.VVTdMono}>{v.gst}</td>
                                    <td style={styles.VVTd}>
                                        <span style={v.status === 'Active' ? styles.VVBadgeSuccess : styles.VVBadgeGray}>
                                            {v.status}
                                        </span>
                                    </td>
                                    <td style={styles.VVActionsCell}>
                                        <div style={styles.VVActionRow}>
                                            <button style={styles.VVBtnEdit} onClick={() => openEdit(v)}>
                                                <HiOutlinePencil />
                                            </button>
                                            <button style={styles.VVBtnDelete} onClick={() => handleDelete(v.id)}>
                                                <HiOutlineTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={9} style={styles.VVEmptyRow}>
                                        No vendors found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modal && (
                <div style={styles.VVModalOverlay} onClick={() => setModal(false)}>
                    <div style={styles.VVModalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.VVModalHeader}>
                            <h3 style={styles.VVModalTitle}>{editing ? 'Edit' : 'Add'} Vendor</h3>
                            <button style={styles.VVModalClose} onClick={() => setModal(false)}>
                                <HiOutlineX />
                            </button>
                        </div>

                        {/* Vendor Name */}
                        <div style={styles.VVFormGroup}>
                            <label style={styles.VVFormLabel}>Vendor Name</label>
                            <input
                                style={styles.VVFormInput}
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Company name"
                            />
                        </div>

                        {/* Contact + Phone grid */}
                        <div style={styles.VVFormGrid}>
                            <div>
                                <label style={styles.VVFormLabel}>Contact Person</label>
                                <input
                                    style={styles.VVFormInput}
                                    value={form.contact}
                                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                                    placeholder="Person name"
                                />
                            </div>
                            <div>
                                <label style={styles.VVFormLabel}>Phone</label>
                                <input
                                    style={styles.VVFormInput}
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    placeholder="9876543210"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div style={styles.VVFormGroup}>
                            <label style={styles.VVFormLabel}>Email</label>
                            <input
                                style={styles.VVFormInput}
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="email@company.com"
                            />
                        </div>

                        {/* City + GST grid */}
                        <div style={styles.VVFormGrid}>
                            <div>
                                <label style={styles.VVFormLabel}>City</label>
                                <input
                                    style={styles.VVFormInput}
                                    value={form.city}
                                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                                    placeholder="City"
                                />
                            </div>
                            <div>
                                <label style={styles.VVFormLabel}>GST Number</label>
                                <input
                                    style={styles.VVFormInput}
                                    value={form.gst}
                                    onChange={(e) => setForm({ ...form, gst: e.target.value })}
                                    placeholder="GST No."
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div style={styles.VVFormGroup}>
                            <label style={styles.VVFormLabel}>Address</label>
                            <input
                                style={styles.VVFormInput}
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                placeholder="Full address"
                            />
                        </div>

                        {/* Status */}
                        <div style={styles.VVFormGroup}>
                            <label style={styles.VVFormLabel}>Status</label>
                            <select
                                style={styles.VVFormSelect}
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        {/* Footer */}
                        <div style={styles.VVModalFooter}>
                            <button style={styles.VVBtnSecondary} onClick={() => setModal(false)}>
                                Cancel
                            </button>
                            <button style={styles.VVBtnPrimary} onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}