import { useState } from 'react';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX, HiOutlineSearch } from 'react-icons/hi';
import { materialTypes as initialData } from '../../data/data';

export default function MaterialType() {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', code: '', description: '', status: 'Active' });

    const filtered = data.filter(
        (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.code.toLowerCase().includes(search.toLowerCase())
    );

    const openAdd = () => { setEditing(null); setForm({ name: '', code: '', description: '', status: 'Active' }); setModal(true); };
    const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModal(true); };

    const handleSave = () => {
        if (!form.name || !form.code) return;
        if (editing) {
            setData(data.map((d) => (d.id === editing.id ? { ...d, ...form } : d)));
        } else {
            setData([...data, { ...form, id: Date.now() }]);
        }
        setModal(false);
    };

    const handleDelete = (id) => {
        if (confirm('Delete this material type?')) setData(data.filter((d) => d.id !== id));
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Material Types</h1>
                    <p className="page-subtitle">Manage raw material categories</p>
                </div>
                <button className="btn btn-primary" onClick={openAdd}><HiOutlinePlus /> Add Material Type</button>
            </div>

            <div className="card p-5">
                <div className="mb-4">
                    <div className="search-box">
                        <HiOutlineSearch className="search-icon" />
                        <input type="text" placeholder="Search materials..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="erp-table">
                        <thead>
                            <tr><th>#</th><th>Name</th><th>Code</th><th>Description</th><th>Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {filtered.map((m, i) => (
                                <tr key={m.id}>
                                    <td>{i + 1}</td>
                                    <td className="font-semibold">{m.name}</td>
                                    <td><span className="badge badge-info">{m.code}</span></td>
                                    <td>{m.description}</td>
                                    <td><span className={`badge ${m.status === 'Active' ? 'badge-success' : 'badge-gray'}`}>{m.status}</span></td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="btn btn-secondary btn-sm" onClick={() => openEdit(m)}><HiOutlinePencil /></button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}><HiOutlineTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && <tr><td colSpan={6} className="text-center py-8 text-slate-400">No material types found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {modal && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-slate-800">{editing ? 'Edit' : 'Add'} Material Type</h3>
                            <button onClick={() => setModal(false)} className="text-slate-400 hover:text-slate-600"><HiOutlineX className="text-xl" /></button>
                        </div>
                        <div className="space-y-4">
                            <div><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Steel" /></div>
                            <div><label className="form-label">Code</label><input className="form-input" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="e.g. STL" /></div>
                            <div><label className="form-label">Description</label><input className="form-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" /></div>
                            <div><label className="form-label">Status</label><select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>Inactive</option></select></div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
