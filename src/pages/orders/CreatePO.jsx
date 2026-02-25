// import { useState } from 'react';
// import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
// import { vendors, products } from '../../data/data';

// export default function CreatePO() {
//     const [vendor, setVendor] = useState('');
//     const [deliveryDate, setDeliveryDate] = useState('');
//     const [items, setItems] = useState([{ product: '', qty: '', rate: '' }]);
//     const [submitted, setSubmitted] = useState(false);

//     const addItem = () => setItems([...items, { product: '', qty: '', rate: '' }]);
//     const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
//     const updateItem = (i, field, val) => {
//         const updated = [...items];
//         updated[i][field] = val;
//         if (field === 'product') {
//             const p = products.find((pr) => pr.name === val);
//             if (p) updated[i].rate = p.price;
//         }
//         setItems(updated);
//     };

//     const total = items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!vendor || items.some((it) => !it.product || !it.qty)) return;
//         setSubmitted(true);
//         setTimeout(() => setSubmitted(false), 3000);
//     };

//     return (
//         <div>
//             <div className="page-header">
//                 <div>
//                     <h1 className="page-title">Create Purchase Order</h1>
//                     <p className="page-subtitle">Send a new PO to vendor</p>
//                 </div>
//             </div>

//             {submitted && (
//                 <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl text-sm font-medium">
//                     ✅ Purchase Order created successfully!
//                 </div>
//             )}

//             <form onSubmit={handleSubmit}>
//                 <div className="card p-6 mb-5">
//                     <h3 className="text-sm font-bold text-slate-700 mb-4">Order Details</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                             <label className="form-label">PO Number</label>
//                             <input className="form-input bg-slate-50" value={`PO-2026-${String(Date.now()).slice(-3)}`} readOnly />
//                         </div>
//                         <div>
//                             <label className="form-label">Vendor</label>
//                             <select className="form-select" value={vendor} onChange={(e) => setVendor(e.target.value)} required>
//                                 <option value="">Select Vendor</option>
//                                 {vendors.filter((v) => v.status === 'Active').map((v) => (
//                                     <option key={v.id} value={v.name}>{v.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="form-label">Expected Delivery</label>
//                             <input type="date" className="form-input" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} required />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="card p-6 mb-5">
//                     <div className="flex items-center justify-between mb-4">
//                         <h3 className="text-sm font-bold text-slate-700">Line Items</h3>
//                         <button type="button" className="btn btn-secondary btn-sm" onClick={addItem}><HiOutlinePlus /> Add Item</button>
//                     </div>
//                     <div className="overflow-x-auto">
//                         <table className="erp-table">
//                             <thead>
//                                 <tr><th>#</th><th>Product</th><th>Quantity</th><th>Rate (₹)</th><th>Amount (₹)</th><th></th></tr>
//                             </thead>
//                             <tbody>
//                                 {items.map((it, i) => (
//                                     <tr key={i}>
//                                         <td>{i + 1}</td>
//                                         <td>
//                                             <select className="form-select !text-sm" value={it.product} onChange={(e) => updateItem(i, 'product', e.target.value)}>
//                                                 <option value="">Select Product</option>
//                                                 {products.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
//                                             </select>
//                                         </td>
//                                         <td><input type="number" className="form-input !text-sm !w-24" value={it.qty} onChange={(e) => updateItem(i, 'qty', e.target.value)} placeholder="0" /></td>
//                                         <td><input type="number" className="form-input !text-sm !w-28" value={it.rate} onChange={(e) => updateItem(i, 'rate', e.target.value)} placeholder="0" /></td>
//                                         <td className="font-semibold">₹{((Number(it.qty) || 0) * (Number(it.rate) || 0)).toLocaleString()}</td>
//                                         <td>{items.length > 1 && <button type="button" className="btn btn-danger btn-sm" onClick={() => removeItem(i)}><HiOutlineTrash /></button>}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                             <tfoot>
//                                 <tr>
//                                     <td colSpan={4} className="text-right font-bold text-slate-700">Grand Total</td>
//                                     <td className="font-bold text-lg text-blue-600" colSpan={2}>₹{total.toLocaleString()}</td>
//                                 </tr>
//                             </tfoot>
//                         </table>
//                     </div>
//                 </div>

//                 <div className="flex justify-end gap-3">
//                     <button type="button" className="btn btn-secondary">Save as Draft</button>
//                     <button type="submit" className="btn btn-primary">Create & Send PO</button>
//                 </div>
//             </form>
//         </div>
//     );
// }


















// import { useState } from 'react';
// import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
// import { vendors, products } from '../../data/data';

// // ── Styles ────────────────────────────────────────────────────
// const S = {
//     poWrapper: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 24,
//     },

//     // Page Header
//     poPageHeader: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         flexWrap: 'wrap',
//         gap: 12,
//     },
//     poPageTitle: {
//         fontSize: 22,
//         fontWeight: 700,
//         color: '#0f172a',
//         margin: 0,
//         lineHeight: 1.2,
//     },
//     poPageSubtitle: {
//         fontSize: 13,
//         color: '#94a3b8',
//         marginTop: 4,
//         margin: '4px 0 0',
//     },

//     // Success Banner
//     poSuccessBanner: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: 10,
//         padding: '12px 20px',
//         background: '#f0fdf4',
//         border: '1px solid #bbf7d0',
//         borderRadius: 12,
//         fontSize: 14,
//         fontWeight: 600,
//         color: '#15803d',
//     },

//     // Card
//     poCard: {
//         background: '#ffffff',
//         borderRadius: 18,
//         border: '1px solid #f1f5f9',
//         boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
//         padding: 24,
//     },

//     // Section title
//     poSectionTitle: {
//         fontSize: 14,
//         fontWeight: 700,
//         color: '#334155',
//         margin: '0 0 18px',
//     },

//     // 3-col grid
//     poGrid3: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//         gap: 16,
//     },

//     // Form group
//     poFormGroup: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 6,
//     },
//     poFormLabel: {
//         fontSize: 13,
//         fontWeight: 600,
//         color: '#475569',
//     },
//     poFormInput: {
//         width: '100%',
//         padding: '10px 14px',
//         border: '1.5px solid #e2e8f0',
//         borderRadius: 10,
//         fontSize: 14,
//         fontFamily: 'Inter, sans-serif',
//         background: '#fff',
//         color: '#1e293b',
//         outline: 'none',
//         boxSizing: 'border-box',
//         transition: 'border-color 0.2s, box-shadow 0.2s',
//     },
//     poFormInputReadonly: {
//         width: '100%',
//         padding: '10px 14px',
//         border: '1.5px solid #e2e8f0',
//         borderRadius: 10,
//         fontSize: 14,
//         fontFamily: 'Inter, sans-serif',
//         background: '#f8fafc',
//         color: '#94a3b8',
//         outline: 'none',
//         boxSizing: 'border-box',
//         cursor: 'not-allowed',
//     },
//     poFormSelect: {
//         width: '100%',
//         padding: '10px 14px',
//         border: '1.5px solid #e2e8f0',
//         borderRadius: 10,
//         fontSize: 14,
//         fontFamily: 'Inter, sans-serif',
//         background: '#fff',
//         color: '#1e293b',
//         cursor: 'pointer',
//         outline: 'none',
//         boxSizing: 'border-box',
//         transition: 'border-color 0.2s, box-shadow 0.2s',
//     },

//     // Line Items header row
//     poLineItemsHeader: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 18,
//     },
//     poAddItemBtn: {
//         display: 'inline-flex',
//         alignItems: 'center',
//         gap: 6,
//         padding: '7px 14px',
//         background: '#eff6ff',
//         color: '#2563eb',
//         border: '1px solid #dbeafe',
//         borderRadius: 8,
//         fontSize: 13,
//         fontWeight: 600,
//         cursor: 'pointer',
//         transition: 'background 0.15s',
//     },

//     // Table
//     poTableWrap: { overflowX: 'auto' },
//     poTable: { width: '100%', borderCollapse: 'collapse' },
//     poTh: {
//         textAlign: 'left',
//         padding: '11px 14px',
//         fontSize: 11,
//         fontWeight: 700,
//         color: '#94a3b8',
//         textTransform: 'uppercase',
//         letterSpacing: '0.07em',
//         borderBottom: '1px solid #f1f5f9',
//         background: '#f8fafc',
//         whiteSpace: 'nowrap',
//     },
//     poTd: {
//         padding: '10px 14px',
//         fontSize: 13.5,
//         color: '#334155',
//         borderBottom: '1px solid #f8fafc',
//         verticalAlign: 'middle',
//     },
//     poTdNum: {
//         padding: '10px 14px',
//         fontSize: 13,
//         color: '#94a3b8',
//         fontWeight: 600,
//         borderBottom: '1px solid #f8fafc',
//         verticalAlign: 'middle',
//         width: 40,
//     },
//     poTdAmt: {
//         padding: '10px 14px',
//         fontSize: 13.5,
//         fontWeight: 700,
//         color: '#0f172a',
//         borderBottom: '1px solid #f8fafc',
//         verticalAlign: 'middle',
//         whiteSpace: 'nowrap',
//     },

//     // Inline table inputs
//     poTableSelect: {
//         width: '100%',
//         minWidth: 160,
//         padding: '8px 12px',
//         border: '1.5px solid #e2e8f0',
//         borderRadius: 8,
//         fontSize: 13,
//         fontFamily: 'Inter, sans-serif',
//         background: '#fff',
//         color: '#1e293b',
//         cursor: 'pointer',
//         outline: 'none',
//         transition: 'border-color 0.2s, box-shadow 0.2s',
//     },
//     poTableInput: {
//         padding: '8px 12px',
//         border: '1.5px solid #e2e8f0',
//         borderRadius: 8,
//         fontSize: 13,
//         fontFamily: 'Inter, sans-serif',
//         background: '#fff',
//         color: '#1e293b',
//         outline: 'none',
//         width: 90,
//         boxSizing: 'border-box',
//         transition: 'border-color 0.2s, box-shadow 0.2s',
//     },
//     poTableInputWide: {
//         padding: '8px 12px',
//         border: '1.5px solid #e2e8f0',
//         borderRadius: 8,
//         fontSize: 13,
//         fontFamily: 'Inter, sans-serif',
//         background: '#fff',
//         color: '#1e293b',
//         outline: 'none',
//         width: 110,
//         boxSizing: 'border-box',
//         transition: 'border-color 0.2s, box-shadow 0.2s',
//     },

//     // Delete row btn
//     poRemoveBtn: {
//         display: 'inline-flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 30,
//         height: 30,
//         borderRadius: 7,
//         border: '1px solid #fecaca',
//         background: '#fee2e2',
//         color: '#dc2626',
//         cursor: 'pointer',
//         fontSize: 15,
//         transition: 'background 0.15s',
//     },

//     // Tfoot
//     poTfoot: {
//         background: '#f8fafc',
//     },
//     poTfootLabelTd: {
//         padding: '14px 14px',
//         textAlign: 'right',
//         fontSize: 14,
//         fontWeight: 700,
//         color: '#334155',
//         borderTop: '2px solid #e2e8f0',
//     },
//     poTfootValueTd: {
//         padding: '14px 14px',
//         fontSize: 18,
//         fontWeight: 800,
//         color: '#2563eb',
//         borderTop: '2px solid #e2e8f0',
//         whiteSpace: 'nowrap',
//     },

//     // Footer actions
//     poFormFooter: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         gap: 12,
//         paddingBottom: 8,
//     },
//     poDraftBtn: {
//         display: 'inline-flex',
//         alignItems: 'center',
//         gap: 6,
//         padding: '10px 22px',
//         background: '#f0f4fb',
//         color: '#3b82f6',
//         border: '1px solid #dbeafe',
//         borderRadius: 10,
//         fontSize: 14,
//         fontWeight: 600,
//         cursor: 'pointer',
//         transition: 'background 0.15s',
//     },
//     poSubmitBtn: {
//         display: 'inline-flex',
//         alignItems: 'center',
//         gap: 6,
//         padding: '10px 22px',
//         background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
//         color: '#fff',
//         border: 'none',
//         borderRadius: 10,
//         fontSize: 14,
//         fontWeight: 600,
//         cursor: 'pointer',
//         boxShadow: '0 2px 8px rgba(59,130,246,0.30)',
//         transition: 'opacity 0.15s',
//     },
// };

// const focusStyle = { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59,130,246,0.12)' };
// const blurStyle  = { borderColor: '#e2e8f0', boxShadow: 'none' };

// // ── Component ─────────────────────────────────────────────────
// export default function CreatePO() {
//     const [vendor, setVendor]             = useState('');
//     const [deliveryDate, setDeliveryDate] = useState('');
//     const [items, setItems]               = useState([{ product: '', qty: '', rate: '' }]);
//     const [submitted, setSubmitted]       = useState(false);

//     const addItem = () => setItems([...items, { product: '', qty: '', rate: '' }]);

//     const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

//     const updateItem = (i, field, val) => {
//         const updated = [...items];
//         updated[i][field] = val;
//         if (field === 'product') {
//             const p = products.find((pr) => pr.name === val);
//             if (p) updated[i].rate = p.price;
//         }
//         setItems(updated);
//     };

//     const total = items.reduce(
//         (sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0),
//         0
//     );

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!vendor || items.some((it) => !it.product || !it.qty)) return;
//         setSubmitted(true);
//         setTimeout(() => setSubmitted(false), 3000);
//     };

//     return (
//         <div className="po-wrapper" style={S.poWrapper}>

//             {/* ── Page Header ── */}
//             <div className="po-page-header" style={S.poPageHeader}>
//                 <div className="po-page-heading">
//                     <h1 className="po-page-title"    style={S.poPageTitle}>Create Purchase Order</h1>
//                     <p className="po-page-subtitle"  style={S.poPageSubtitle}>Send a new PO to vendor</p>
//                 </div>
//             </div>

//             {/* ── Success Banner ── */}
//             {submitted && (
//                 <div className="po-success-banner" style={S.poSuccessBanner}>
//                     ✅ Purchase Order created successfully!
//                 </div>
//             )}

//             <form className="po-form" onSubmit={handleSubmit}>

//                 {/* ── Order Details Card ── */}
//                 <div className="po-card po-details-card" style={{ ...S.poCard, marginBottom: 20 }}>
//                     <h3 className="po-section-title" style={S.poSectionTitle}>Order Details</h3>
//                     <div className="po-grid-3" style={S.poGrid3}>

//                         {/* PO Number */}
//                         <div className="po-form-group" style={S.poFormGroup}>
//                             <label className="po-form-label" style={S.poFormLabel}>PO Number</label>
//                             <input
//                                 className="po-form-input-readonly"
//                                 style={S.poFormInputReadonly}
//                                 value={`PO-2026-${String(Date.now()).slice(-3)}`}
//                                 readOnly
//                             />
//                         </div>

//                         {/* Vendor */}
//                         <div className="po-form-group" style={S.poFormGroup}>
//                             <label className="po-form-label" style={S.poFormLabel}>Vendor</label>
//                             <select
//                                 className="po-form-select"
//                                 style={S.poFormSelect}
//                                 value={vendor}
//                                 onChange={(e) => setVendor(e.target.value)}
//                                 required
//                                 onFocus={(e) => Object.assign(e.target.style, focusStyle)}
//                                 onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
//                             >
//                                 <option value="">Select Vendor</option>
//                                 {vendors
//                                     .filter((v) => v.status === 'Active')
//                                     .map((v) => (
//                                         <option key={v.id} value={v.name}>{v.name}</option>
//                                     ))}
//                             </select>
//                         </div>

//                         {/* Delivery Date */}
//                         <div className="po-form-group" style={S.poFormGroup}>
//                             <label className="po-form-label" style={S.poFormLabel}>Expected Delivery</label>
//                             <input
//                                 className="po-form-input"
//                                 style={S.poFormInput}
//                                 type="date"
//                                 value={deliveryDate}
//                                 onChange={(e) => setDeliveryDate(e.target.value)}
//                                 required
//                                 onFocus={(e) => Object.assign(e.target.style, focusStyle)}
//                                 onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* ── Line Items Card ── */}
//                 <div className="po-card po-items-card" style={{ ...S.poCard, marginBottom: 20 }}>
//                     <div className="po-line-items-header" style={S.poLineItemsHeader}>
//                         <h3 className="po-section-title" style={{ ...S.poSectionTitle, margin: 0 }}>
//                             Line Items
//                         </h3>
//                         <button
//                             type="button"
//                             className="po-add-item-btn"
//                             style={S.poAddItemBtn}
//                             onClick={addItem}
//                             onMouseEnter={(e) => (e.currentTarget.style.background = '#dbeafe')}
//                             onMouseLeave={(e) => (e.currentTarget.style.background = '#eff6ff')}
//                         >
//                             <HiOutlinePlus style={{ fontSize: 16 }} />
//                             Add Item
//                         </button>
//                     </div>

//                     <div className="po-table-wrap" style={S.poTableWrap}>
//                         <table className="po-table" style={S.poTable}>
//                             <thead>
//                                 <tr className="po-thead-row">
//                                     {['#', 'Product', 'Quantity', 'Rate (₹)', 'Amount (₹)', ''].map((h, idx) => (
//                                         <th className="po-th" key={idx} style={S.poTh}>{h}</th>
//                                     ))}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {items.map((it, i) => (
//                                     <tr
//                                         className="po-tr"
//                                         key={i}
//                                         onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
//                                         onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
//                                     >
//                                         {/* # */}
//                                         <td className="po-td-num" style={S.poTdNum}>{i + 1}</td>

//                                         {/* Product */}
//                                         <td className="po-td-product" style={S.poTd}>
//                                             <select
//                                                 className="po-table-select"
//                                                 style={S.poTableSelect}
//                                                 value={it.product}
//                                                 onChange={(e) => updateItem(i, 'product', e.target.value)}
//                                                 onFocus={(e) => Object.assign(e.target.style, focusStyle)}
//                                                 onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
//                                             >
//                                                 <option value="">Select Product</option>
//                                                 {products.map((p) => (
//                                                     <option key={p.id} value={p.name}>{p.name}</option>
//                                                 ))}
//                                             </select>
//                                         </td>

//                                         {/* Quantity */}
//                                         <td className="po-td-qty" style={S.poTd}>
//                                             <input
//                                                 className="po-table-input"
//                                                 style={S.poTableInput}
//                                                 type="number"
//                                                 value={it.qty}
//                                                 onChange={(e) => updateItem(i, 'qty', e.target.value)}
//                                                 placeholder="0"
//                                                 min="0"
//                                                 onFocus={(e) => Object.assign(e.target.style, focusStyle)}
//                                                 onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
//                                             />
//                                         </td>

//                                         {/* Rate */}
//                                         <td className="po-td-rate" style={S.poTd}>
//                                             <input
//                                                 className="po-table-input-wide"
//                                                 style={S.poTableInputWide}
//                                                 type="number"
//                                                 value={it.rate}
//                                                 onChange={(e) => updateItem(i, 'rate', e.target.value)}
//                                                 placeholder="0"
//                                                 min="0"
//                                                 onFocus={(e) => Object.assign(e.target.style, focusStyle)}
//                                                 onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
//                                             />
//                                         </td>

//                                         {/* Amount */}
//                                         <td className="po-td-amount" style={S.poTdAmt}>
//                                             ₹{((Number(it.qty) || 0) * (Number(it.rate) || 0)).toLocaleString('en-IN')}
//                                         </td>

//                                         {/* Remove */}
//                                         <td className="po-td-remove" style={S.poTd}>
//                                             {items.length > 1 && (
//                                                 <button
//                                                     type="button"
//                                                     className="po-remove-btn"
//                                                     style={S.poRemoveBtn}
//                                                     onClick={() => removeItem(i)}
//                                                     title="Remove row"
//                                                     onMouseEnter={(e) => (e.currentTarget.style.background = '#fecaca')}
//                                                     onMouseLeave={(e) => (e.currentTarget.style.background = '#fee2e2')}
//                                                 >
//                                                     <HiOutlineTrash />
//                                                 </button>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>

//                             {/* Grand Total */}
//                             <tfoot className="po-tfoot" style={S.poTfoot}>
//                                 <tr className="po-tfoot-row">
//                                     <td
//                                         colSpan={4}
//                                         className="po-tfoot-label"
//                                         style={S.poTfootLabelTd}
//                                     >
//                                         Grand Total
//                                     </td>
//                                     <td
//                                         colSpan={2}
//                                         className="po-tfoot-value"
//                                         style={S.poTfootValueTd}
//                                     >
//                                         ₹{total.toLocaleString('en-IN')}
//                                     </td>
//                                 </tr>
//                             </tfoot>
//                         </table>
//                     </div>
//                 </div>

//                 {/* ── Footer Actions ── */}
//                 <div className="po-form-footer" style={S.poFormFooter}>
//                     <button
//                         type="button"
//                         className="po-draft-btn"
//                         style={S.poDraftBtn}
//                         onMouseEnter={(e) => (e.currentTarget.style.background = '#dbeafe')}
//                         onMouseLeave={(e) => (e.currentTarget.style.background = '#f0f4fb')}
//                     >
//                         Save as Draft
//                     </button>
//                     <button
//                         type="submit"
//                         className="po-submit-btn"
//                         style={S.poSubmitBtn}
//                         onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
//                         onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
//                     >
//                         Create &amp; Send PO
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }














import { useState, useRef, useEffect } from "react";

// ── Mock Data ──────────────────────────────────────────────────────────────
const VENDORS = [
  { id: 1, name: "Apex Supplies Co.", contact: "apex@supplies.com", status: "Active", avatar: "AS" },
  { id: 2, name: "BlueStar Materials", contact: "blue@star.in", status: "Active", avatar: "BM" },
  { id: 3, name: "CoreTech Parts", contact: "core@tech.io", status: "Active", avatar: "CP" },
  { id: 4, name: "Delta Logistics", contact: "delta@log.net", status: "Active", avatar: "DL" },
  { id: 5, name: "Everest Traders", contact: "ev@traders.com", status: "Active", avatar: "ET" },
];

const PRODUCTS = [
  { id: 1, name: "Office Chair", price: 4500 },
  { id: 2, name: "Standing Desk", price: 12000 },
  { id: 3, name: 'Monitor 27"', price: 18500 },
  { id: 4, name: "Mechanical Keyboard", price: 3200 },
  { id: 5, name: "Ethernet Cable 10m", price: 350 },
  { id: 6, name: "UPS 1500VA", price: 7800 },
  { id: 7, name: "Webcam HD", price: 2100 },
];

// ── Shared helpers ─────────────────────────────────────────────────────────
const fmt = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
const uid = () => Math.random().toString(36).slice(2, 8).toUpperCase();
const now = () =>
  new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// ── Global PO Store ────────────────────────────────────────────────────────
let _pos = [];
const _listeners = new Set();
function getPos() { return _pos; }
function addPo(po) { _pos = [po, ..._pos]; _listeners.forEach((fn) => fn()); }
function usePOStore() {
  const [pos, setPos] = useState(_pos);
  useEffect(() => {
    const fn = () => setPos([..._pos]);
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  }, []);
  return pos;
}

// ── SEED demo POs ──────────────────────────────────────────────────────────
(function seed() {
  if (_pos.length) return;
  _pos = [
    {
      id: "PO-2026-A1B", date: "12 Jan 2026", delivery: "2026-02-01", status: "Sent",
      vendors: [VENDORS[0], VENDORS[2]], total: 41000,
      items: [
        { product: "Office Chair", qty: 4, rate: 4500 },
        { product: 'Monitor 27"', qty: 1, rate: 18500 },
      ],
      chats: {
        1: [
          { from: "us", text: "Please confirm availability.", ts: "10:00 AM" },
          { from: "vendor", text: "Yes, all items in stock!", ts: "10:45 AM" },
        ],
        3: [{ from: "us", text: "Can you deliver by Feb 1?", ts: "10:05 AM" }],
      },
    },
    {
      id: "PO-2026-C3D", date: "18 Jan 2026", delivery: "2026-02-15", status: "Draft",
      vendors: [VENDORS[1]], total: 24000,
      items: [{ product: "Standing Desk", qty: 2, rate: 12000 }],
      chats: { 2: [] },
    },
    {
      id: "PO-2026-E5F", date: "22 Jan 2026", delivery: "2026-03-01", status: "Confirmed",
      vendors: [VENDORS[3], VENDORS[4]], total: 15700,
      items: [
        { product: "Ethernet Cable 10m", qty: 10, rate: 350 },
        { product: "UPS 1500VA", qty: 1, rate: 7800 },
        { product: "Webcam HD", qty: 3, rate: 2100 },
      ],
      chats: {
        4: [{ from: "vendor", text: "Order confirmed. ETA March 1.", ts: "9:00 AM" }],
        5: [],
      },
    },
  ];
})();

// ══════════════════════════════════════════════════════════════════════════
//  CREATE PO
// ══════════════════════════════════════════════════════════════════════════
function CreatePO({ onCreated }) {
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [vendorSearch, setVendorSearch] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [items, setItems] = useState([{ product: "", qty: "", rate: "" }]);
  const [submitted, setSubmitted] = useState(false);
  const [vendorDropOpen, setVendorDropOpen] = useState(false);

  const toggleVendor = (v) => {
    setSelectedVendors((prev) =>
      prev.find((x) => x.id === v.id)
        ? prev.filter((x) => x.id !== v.id)
        : [...prev, v]
    );
  };

  const addItem = () =>
    setItems([...items, { product: "", qty: "", rate: "" }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, val) => {
    const up = [...items];
    up[i][field] = val;
    if (field === "product") {
      const p = PRODUCTS.find((pr) => pr.name === val);
      if (p) up[i].rate = p.price;
    }
    setItems(up);
  };

  const total = items.reduce(
    (s, it) => s + (Number(it.qty) || 0) * (Number(it.rate) || 0),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedVendors.length || items.some((it) => !it.product || !it.qty))
      return;
    const po = {
      id: `PO-2026-${uid()}`,
      date: now(),
      delivery: deliveryDate,
      status: "Sent",
      vendors: selectedVendors,
      items: items.filter((it) => it.product),
      total,
      chats: Object.fromEntries(selectedVendors.map((v) => [v.id, []])),
    };
    addPo(po);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedVendors([]);
      setItems([{ product: "", qty: "", rate: "" }]);
      setDeliveryDate("");
      if (onCreated) onCreated();
    }, 2000);
  };

  const filteredVendors = VENDORS.filter(
    (v) =>
      v.status === "Active" &&
      v.name.toLowerCase().includes(vendorSearch.toLowerCase())
  );

  return (
    // FIX 1: Outer wrapper fills the full height and scrolls — submit button always visible
    <div style={cs.createOuter}>
      <div style={cs.createScroll}>
        <div style={cs.pageWrap}>
          {/* Header */}
          <div style={cs.pageHeader}>
            <div>
              <h1 style={cs.pageTitle}>Create Purchase Order</h1>
              <p style={cs.pageSub}>
                Send a single PO to one or multiple vendors simultaneously
              </p>
            </div>
          </div>

          {submitted && (
            <div style={cs.successBanner}>
              <span style={{ fontSize: 20 }}>&#10003;</span>
              Purchase Order created &amp; dispatched to{" "}
              {selectedVendors.length} vendor
              {selectedVendors.length > 1 ? "s" : ""}!
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* Order Details */}
            <div style={cs.card}>
              <h3 style={cs.sectionTitle}>Order Details</h3>
              <div style={cs.grid3}>
                {/* PO Number */}
                <div style={cs.fg}>
                  <label style={cs.label}>PO Number</label>
                  <input
                    style={cs.inputReadonly}
                    readOnly
                    value={`PO-2026-${String(Date.now()).slice(-4)}`}
                  />
                </div>

                {/* Multi-Vendor Picker */}
                <div
                  style={{
                    ...cs.fg,
                    gridColumn: "span 1",
                    position: "relative",
                  }}
                >
                  <label style={cs.label}>
                    Vendors{" "}
                    <span style={cs.badge}>{selectedVendors.length} selected</span>
                  </label>
                  <div
                    style={cs.vendorPicker}
                    onClick={() => setVendorDropOpen((o) => !o)}
                  >
                    {selectedVendors.length === 0 ? (
                      <span style={{ color: "#94a3b8" }}>
                        Select vendors…
                      </span>
                    ) : (
                      <div style={cs.chipRow}>
                        {selectedVendors.map((v) => (
                          <span key={v.id} style={cs.chip}>
                            {v.name}
                            {/* FIX 2: use × char instead of × entity */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVendor(v);
                              }}
                              style={cs.chipX}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <span
                      style={{
                        color: "#94a3b8",
                        marginLeft: "auto",
                        fontSize: 12,
                        flexShrink: 0,
                      }}
                    >
                      ▾
                    </span>
                  </div>
                  {vendorDropOpen && (
                    <div style={cs.dropdown}>
                      <input
                        style={cs.dropSearch}
                        placeholder="Search vendors…"
                        value={vendorSearch}
                        onChange={(e) => setVendorSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                      {filteredVendors.map((v) => {
                        const sel = !!selectedVendors.find(
                          (x) => x.id === v.id
                        );
                        return (
                          <div
                            key={v.id}
                            style={{
                              ...cs.dropItem,
                              background: sel ? "#eff6ff" : "white",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleVendor(v);
                            }}
                          >
                            <div
                              style={{
                                ...cs.avatar,
                                background: sel ? "#2563eb" : "#e2e8f0",
                                color: sel ? "white" : "#64748b",
                              }}
                            >
                              {v.avatar}
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: "#1e293b",
                                }}
                              >
                                {v.name}
                              </div>
                              <div
                                style={{ fontSize: 11, color: "#94a3b8" }}
                              >
                                {v.contact}
                              </div>
                            </div>
                            {sel && (
                              <span
                                style={{
                                  marginLeft: "auto",
                                  color: "#2563eb",
                                  fontSize: 16,
                                }}
                              >
                                &#10003;
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Delivery */}
                <div style={cs.fg}>
                  <label style={cs.label}>Expected Delivery</label>
                  <input
                    style={cs.input}
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Vendor Preview Pills */}
            {selectedVendors.length > 0 && (
              <div style={cs.vendorPreviewRow}>
                <span
                  style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}
                >
                  PO will be sent to:
                </span>
                {selectedVendors.map((v) => (
                  <div key={v.id} style={cs.vendorPill}>
                    <div
                      style={{
                        ...cs.avatar,
                        width: 22,
                        height: 22,
                        fontSize: 9,
                      }}
                    >
                      {v.avatar}
                    </div>
                    {v.name}
                  </div>
                ))}
              </div>
            )}

            {/* Line Items */}
            <div style={cs.card}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                }}
              >
                <h3 style={{ ...cs.sectionTitle, margin: 0 }}>Line Items</h3>
                <button type="button" style={cs.addBtn} onClick={addItem}>
                  + Add Item
                </button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["#", "Product", "Qty", "Rate (Rs)", "Amount (Rs)", ""].map(
                        (h, i) => (
                          <th key={i} style={cs.th}>
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, i) => (
                      <tr
                        key={i}
                        style={{
                          background: i % 2 === 0 ? "#fafafa" : "white",
                        }}
                      >
                        <td style={cs.tdN}>{i + 1}</td>
                        <td style={cs.td}>
                          <select
                            style={cs.tSel}
                            value={it.product}
                            onChange={(e) =>
                              updateItem(i, "product", e.target.value)
                            }
                          >
                            <option value="">Select…</option>
                            {PRODUCTS.map((p) => (
                              <option key={p.id} value={p.name}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td style={cs.td}>
                          <input
                            style={{ ...cs.tIn, width: 80 }}
                            type="number"
                            value={it.qty}
                            onChange={(e) =>
                              updateItem(i, "qty", e.target.value)
                            }
                            placeholder="0"
                            min="0"
                          />
                        </td>
                        <td style={cs.td}>
                          <input
                            style={{ ...cs.tIn, width: 110 }}
                            type="number"
                            value={it.rate}
                            onChange={(e) =>
                              updateItem(i, "rate", e.target.value)
                            }
                            placeholder="0"
                            min="0"
                          />
                        </td>
                        <td
                          style={{
                            ...cs.td,
                            fontWeight: 700,
                            color: "#0f172a",
                          }}
                        >
                          {fmt(
                            (Number(it.qty) || 0) * (Number(it.rate) || 0)
                          )}
                        </td>
                        <td style={cs.td}>
                          {items.length > 1 && (
                            <button
                              type="button"
                              style={cs.removeBtn}
                              onClick={() => removeItem(i)}
                            >
                              {/* FIX 2: plain trash icon, no emoji encoding issues */}
                              &#128465;
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          textAlign: "right",
                          padding: "14px",
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#334155",
                          borderTop: "2px solid #e2e8f0",
                        }}
                      >
                        Grand Total
                      </td>
                      <td
                        colSpan={2}
                        style={{
                          padding: "14px",
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#2563eb",
                          borderTop: "2px solid #e2e8f0",
                        }}
                      >
                        {fmt(total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* FIX 3: Footer always rendered, sticky at bottom via normal flow */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                paddingBottom: 24,
                paddingTop: 4,
              }}
            >
              <button type="button" style={cs.draftBtn}>
                Save as Draft
              </button>
              <button type="submit" style={cs.submitBtn}>
                Create &amp; Send to {selectedVendors.length || "…"} Vendor
                {selectedVendors.length !== 1 ? "s" : ""}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  VIEW POs
// ══════════════════════════════════════════════════════════════════════════
// function ViewPOs() {
//   const pos = usePOStore();
//   const [selectedPO, setSelectedPO] = useState(null);
//   const [activeVendor, setActiveVendor] = useState(null);
//   const [chatInput, setChatInput] = useState("");
//   const [localChats, setLocalChats] = useState({});
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeVendor, localChats]);

//   const openDetails = (po) => {
//     setSelectedPO(po);
//     setActiveVendor(null);
//     setLocalChats(po.chats || {});
//   };

//   const closeDetails = () => {
//     setSelectedPO(null);
//     setActiveVendor(null);
//   };

//   const sendMessage = () => {
//     if (!chatInput.trim() || !activeVendor || !selectedPO) return;
//     setLocalChats((prev) => {
//       const msgs = prev[activeVendor.id] || [];
//       return {
//         ...prev,
//         [activeVendor.id]: [
//           ...msgs,
//           {
//             from: "us",
//             text: chatInput.trim(),
//             ts: new Date().toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//           },
//         ],
//       };
//     });
//     setChatInput("");
//     setTimeout(() => {
//       const replies = [
//         "Thank you, we'll process this shortly.",
//         "Noted! We'll confirm the delivery date.",
//         "Received. Our team will get back to you.",
//         "Understood. Checking stock availability now.",
//         "Sure! We can accommodate this request.",
//       ];
//       setLocalChats((prev) => {
//         const msgs = prev[activeVendor.id] || [];
//         return {
//           ...prev,
//           [activeVendor.id]: [
//             ...msgs,
//             {
//               from: "vendor",
//               text: replies[Math.floor(Math.random() * replies.length)],
//               ts: new Date().toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               }),
//             },
//           ],
//         };
//       });
//     }, 1200);
//   };

//   const statusColor = {
//     Sent: "#2563eb",
//     Draft: "#94a3b8",
//     Confirmed: "#16a34a",
//     Cancelled: "#dc2626",
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100%",          // FIX 4: use 100% not 100vh to respect parent
//         overflow: "hidden",
//         fontFamily: "'DM Sans', system-ui, sans-serif",
//         background: "#f8fafc",
//       }}
//     >
//       {/* ── Left: PO Table ── */}
//       <div
//         style={{
//           // FIX 5: when PO selected, left col shrinks; when closed it expands back
//           flex: selectedPO ? "0 0 400px" : "1 1 auto",
//           borderRight: "1px solid #e2e8f0",
//           display: "flex",
//           flexDirection: "column",
//           overflow: "hidden",
//           transition: "flex 0.3s",
//           minWidth: 0,
//         }}
//       >
//         <div
//           style={{
//             padding: "24px 24px 16px",
//             borderBottom: "1px solid #f1f5f9",
//             flexShrink: 0,
//           }}
//         >
//           <h1
//             style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" }}
//           >
//             Purchase Orders
//           </h1>
//           <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>
//             {pos.length} orders total
//           </p>
//         </div>

//         <div style={{ overflowY: "auto", flex: 1 }}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
//               <tr>
//                 {["PO ID", "Date", "Vendors", "Total", "Status", "Actions"].map(
//                   (h) => (
//                     <th key={h} style={cs.th}>
//                       {h}
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {pos.map((po) => (
//                 <tr
//                   key={po.id}
//                   style={{
//                     background:
//                       selectedPO?.id === po.id ? "#eff6ff" : "white",
//                     borderBottom: "1px solid #f1f5f9",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => openDetails(po)}
//                 >
//                   <td
//                     style={{
//                       ...cs.td,
//                       fontWeight: 700,
//                       color: "#2563eb",
//                       fontSize: 12,
//                     }}
//                   >
//                     {po.id}
//                   </td>
//                   <td style={{ ...cs.td, fontSize: 12, color: "#64748b" }}>
//                     {po.date}
//                   </td>
//                   <td style={cs.td}>
//                     <div style={{ display: "flex", gap: 4 }}>
//                       {po.vendors.slice(0, 2).map((v) => (
//                         <span
//                           key={v.id}
//                           style={{
//                             ...cs.avatar,
//                             width: 24,
//                             height: 24,
//                             fontSize: 9,
//                           }}
//                         >
//                           {v.avatar}
//                         </span>
//                       ))}
//                       {po.vendors.length > 2 && (
//                         <span
//                           style={{
//                             fontSize: 11,
//                             color: "#64748b",
//                             alignSelf: "center",
//                           }}
//                         >
//                           +{po.vendors.length - 2}
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td style={{ ...cs.td, fontWeight: 700, fontSize: 13 }}>
//                     {fmt(po.total)}
//                   </td>
//                   <td style={cs.td}>
//                     <span
//                       style={{
//                         ...cs.statusBadge,
//                         background:
//                           (statusColor[po.status] || "#94a3b8") + "18",
//                         color: statusColor[po.status] || "#94a3b8",
//                         border: `1px solid ${
//                           statusColor[po.status] || "#94a3b8"
//                         }30`,
//                       }}
//                     >
//                       {po.status}
//                     </span>
//                   </td>
//                   <td style={cs.td} onClick={(e) => e.stopPropagation()}>
//                     <div style={{ display: "flex", gap: 6 }}>
//                       <button
//                         style={cs.viewBtn}
//                         onClick={() => openDetails(po)}
//                       >
//                         View
//                       </button>
//                       <button
//                         style={cs.detailBtn}
//                         onClick={() => openDetails(po)}
//                       >
//                         Details
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ── Middle: PO Detail ── */}
//       {selectedPO && (
//         <div
//           style={{
//             flex: "1 1 auto",
//             borderRight: "1px solid #e2e8f0",
//             overflowY: "auto",
//             background: "white",
//             minWidth: 0,
//           }}
//         >
//           <div
//             style={{
//               padding: "24px",
//               borderBottom: "1px solid #f1f5f9",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-start",
//               flexShrink: 0,
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   fontSize: 11,
//                   fontWeight: 700,
//                   color: "#94a3b8",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.08em",
//                 }}
//               >
//                 Purchase Order
//               </div>
//               <h2
//                 style={{
//                   margin: "6px 0 2px",
//                   fontSize: 22,
//                   fontWeight: 800,
//                   color: "#0f172a",
//                 }}
//               >
//                 {selectedPO.id}
//               </h2>
//               <div style={{ fontSize: 13, color: "#64748b" }}>
//                 Created: {selectedPO.date} · Delivery:{" "}
//                 {selectedPO.delivery || "N/A"}
//               </div>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 gap: 8,
//                 alignItems: "center",
//                 flexShrink: 0,
//               }}
//             >
//               <span
//                 style={{
//                   ...cs.statusBadge,
//                   background:
//                     (statusColor[selectedPO.status] || "#94a3b8") + "18",
//                   color: statusColor[selectedPO.status] || "#94a3b8",
//                   border: `1px solid ${
//                     statusColor[selectedPO.status] || "#94a3b8"
//                   }30`,
//                   fontSize: 13,
//                   padding: "6px 14px",
//                 }}
//               >
//                 {selectedPO.status}
//               </span>
//               {/* FIX 6: close button now calls closeDetails to reset both selectedPO and activeVendor */}
//               <button
//                 style={{ ...cs.viewBtn, fontSize: 13 }}
//                 onClick={closeDetails}
//               >
//                 Close
//               </button>
//             </div>
//           </div>

//           {/* PO Items */}
//           <div style={{ padding: "24px" }}>
//             <h4
//               style={{
//                 fontSize: 13,
//                 fontWeight: 700,
//                 color: "#475569",
//                 margin: "0 0 12px",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.06em",
//               }}
//             >
//               Line Items
//             </h4>
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 marginBottom: 24,
//               }}
//             >
//               <thead>
//                 <tr>
//                   {["Product", "Qty", "Rate", "Amount"].map((h) => (
//                     <th key={h} style={cs.th}>
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedPO.items.map((it, i) => (
//                   <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                     <td style={cs.td}>{it.product}</td>
//                     <td style={cs.td}>{it.qty}</td>
//                     <td style={cs.td}>{fmt(it.rate)}</td>
//                     <td style={{ ...cs.td, fontWeight: 700 }}>
//                       {fmt(it.qty * it.rate)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td
//                     colSpan={3}
//                     style={{
//                       textAlign: "right",
//                       padding: "12px 14px",
//                       fontWeight: 700,
//                       fontSize: 14,
//                       borderTop: "2px solid #e2e8f0",
//                       color: "#334155",
//                     }}
//                   >
//                     Grand Total
//                   </td>
//                   <td
//                     style={{
//                       padding: "12px 14px",
//                       fontSize: 18,
//                       fontWeight: 800,
//                       color: "#2563eb",
//                       borderTop: "2px solid #e2e8f0",
//                     }}
//                   >
//                     {fmt(selectedPO.total)}
//                   </td>
//                 </tr>
//               </tfoot>
//             </table>

//             {/* Summary */}
//             <div
//               style={{
//                 background: "#f8fafc",
//                 borderRadius: 12,
//                 padding: "16px 20px",
//                 border: "1px solid #f1f5f9",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: 12,
//                   fontWeight: 700,
//                   color: "#94a3b8",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.06em",
//                   marginBottom: 10,
//                 }}
//               >
//                 Order Summary
//               </div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "8px 0",
//                 }}
//               >
//                 {[
//                   ["PO ID", selectedPO.id],
//                   ["Date", selectedPO.date],
//                   ["Delivery", selectedPO.delivery || "N/A"],
//                   ["Vendors", selectedPO.vendors.length],
//                   ["Items", selectedPO.items.length],
//                   ["Total", fmt(selectedPO.total)],
//                 ].map(([k, v]) => (
//                   <div key={k} style={{ display: "flex", gap: 6 }}>
//                     <span
//                       style={{
//                         fontSize: 12,
//                         color: "#94a3b8",
//                         minWidth: 70,
//                       }}
//                     >
//                       {k}
//                     </span>
//                     <span
//                       style={{
//                         fontSize: 12,
//                         fontWeight: 600,
//                         color: "#334155",
//                       }}
//                     >
//                       {v}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Vendors List ── */}
//       {selectedPO && (
//         <div
//           style={{
//             // FIX 7: fixed width, only shown when PO is selected, independent of chat panel
//             flex: "0 0 220px",
//             borderRight: "1px solid #e2e8f0",
//             overflowY: "auto",
//             background: "#fafafa",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div
//             style={{
//               padding: "20px 16px 14px",
//               borderBottom: "1px solid #f1f5f9",
//               flexShrink: 0,
//             }}
//           >
//             <div
//               style={{
//                 fontSize: 11,
//                 fontWeight: 700,
//                 color: "#94a3b8",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.08em",
//               }}
//             >
//               Vendors
//             </div>
//             <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
//               {selectedPO.vendors.length} recipient
//               {selectedPO.vendors.length !== 1 ? "s" : ""}
//             </div>
//           </div>
//           <div style={{ padding: "10px", flex: 1, overflowY: "auto" }}>
//             {selectedPO.vendors.map((v) => {
//               const msgs = localChats[v.id] || [];
//               const unread = msgs.filter((m) => m.from === "vendor").length;
//               const isActive = activeVendor?.id === v.id;
//               return (
//                 <div
//                   key={v.id}
//                   onClick={() => setActiveVendor(v)}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 10,
//                     padding: "11px 12px",
//                     borderRadius: 10,
//                     marginBottom: 6,
//                     cursor: "pointer",
//                     background: isActive ? "#eff6ff" : "white",
//                     border: isActive
//                       ? "1.5px solid #bfdbfe"
//                       : "1.5px solid #f1f5f9",
//                     transition: "all 0.15s",
//                   }}
//                 >
//                   <div
//                     style={{
//                       ...cs.avatar,
//                       background: isActive ? "#2563eb" : "#e2e8f0",
//                       color: isActive ? "white" : "#64748b",
//                       flexShrink: 0,
//                     }}
//                   >
//                     {v.avatar}
//                   </div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div
//                       style={{
//                         fontSize: 12,
//                         fontWeight: 700,
//                         color: "#1e293b",
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {v.name}
//                     </div>
//                     <div
//                       style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}
//                     >
//                       {msgs.length} message{msgs.length !== 1 ? "s" : ""}
//                     </div>
//                   </div>
//                   {unread > 0 && (
//                     <span
//                       style={{
//                         background: "#2563eb",
//                         color: "white",
//                         borderRadius: 99,
//                         fontSize: 10,
//                         fontWeight: 700,
//                         padding: "2px 6px",
//                         flexShrink: 0,
//                       }}
//                     >
//                       {unread}
//                     </span>
//                   )}
//                   <span style={{ color: "#94a3b8", fontSize: 12 }}>›</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* ── Chat Panel ── */}
//       {/* FIX 8: Chat panel is ALWAYS rendered when a PO is selected,
//            but shows empty state when no vendor is active.
//            This prevents the vendor list from losing its border/layout
//            when activeVendor is null. */}
//       {selectedPO && (
//         <div
//           style={{
//             flex: "0 0 320px",
//             display: "flex",
//             flexDirection: "column",
//             background: "white",
//             overflow: "hidden",
//             borderLeft: "1px solid #e2e8f0",
//           }}
//         >
//           {activeVendor ? (
//             <>
//               {/* Chat Header */}
//               <div
//                 style={{
//                   padding: "16px 20px",
//                   borderBottom: "1px solid #f1f5f9",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 10,
//                   flexShrink: 0,
//                 }}
//               >
//                 <div
//                   style={{
//                     ...cs.avatar,
//                     background: "#2563eb",
//                     color: "white",
//                   }}
//                 >
//                   {activeVendor.avatar}
//                 </div>
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <div
//                     style={{
//                       fontSize: 14,
//                       fontWeight: 700,
//                       color: "#1e293b",
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {activeVendor.name}
//                   </div>
//                   <div style={{ fontSize: 11, color: "#94a3b8" }}>
//                     PO Chat · {selectedPO.id}
//                   </div>
//                 </div>
//                 {/* FIX 9: close chat → only clear activeVendor, NOT selectedPO */}
//                 <button
//                   style={{ ...cs.viewBtn, fontSize: 12, flexShrink: 0 }}
//                   onClick={() => setActiveVendor(null)}
//                 >
//                   Close
//                 </button>
//               </div>

//               {/* PO Context Chip */}
//               <div
//                 style={{
//                   padding: "10px 16px",
//                   background: "#f8fafc",
//                   borderBottom: "1px solid #f1f5f9",
//                   flexShrink: 0,
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: 11,
//                     background: "#eff6ff",
//                     border: "1px solid #bfdbfe",
//                     borderRadius: 8,
//                     padding: "6px 10px",
//                     color: "#2563eb",
//                     fontWeight: 600,
//                   }}
//                 >
//                   {selectedPO.id} · {selectedPO.items.length} items ·{" "}
//                   {fmt(selectedPO.total)}
//                 </div>
//               </div>

//               {/* Messages */}
//               <div
//                 style={{
//                   flex: 1,
//                   overflowY: "auto",
//                   padding: "16px",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 10,
//                 }}
//               >
//                 {(localChats[activeVendor.id] || []).length === 0 && (
//                   <div
//                     style={{
//                       textAlign: "center",
//                       color: "#94a3b8",
//                       fontSize: 13,
//                       marginTop: 40,
//                     }}
//                   >
//                     <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
//                     Start the conversation with {activeVendor.name}
//                   </div>
//                 )}
//                 {(localChats[activeVendor.id] || []).map((msg, i) => {
//                   const isUs = msg.from === "us";
//                   return (
//                     <div
//                       key={i}
//                       style={{
//                         display: "flex",
//                         flexDirection: isUs ? "row-reverse" : "row",
//                         gap: 8,
//                         alignItems: "flex-end",
//                       }}
//                     >
//                       {!isUs && (
//                         <div
//                           style={{
//                             ...cs.avatar,
//                             width: 26,
//                             height: 26,
//                             fontSize: 9,
//                             flexShrink: 0,
//                           }}
//                         >
//                           {activeVendor.avatar}
//                         </div>
//                       )}
//                       <div style={{ maxWidth: "75%" }}>
//                         <div
//                           style={{
//                             padding: "9px 13px",
//                             borderRadius: isUs
//                               ? "14px 14px 4px 14px"
//                               : "14px 14px 14px 4px",
//                             background: isUs
//                               ? "linear-gradient(135deg, #3b82f6, #2563eb)"
//                               : "#f1f5f9",
//                             color: isUs ? "white" : "#1e293b",
//                             fontSize: 13,
//                             lineHeight: 1.4,
//                           }}
//                         >
//                           {msg.text}
//                         </div>
//                         <div
//                           style={{
//                             fontSize: 10,
//                             color: "#94a3b8",
//                             marginTop: 3,
//                             textAlign: isUs ? "right" : "left",
//                           }}
//                         >
//                           {msg.ts}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//                 <div ref={chatEndRef} />
//               </div>

//               {/* Chat Input */}
//               <div
//                 style={{
//                   padding: "12px 16px",
//                   borderTop: "1px solid #f1f5f9",
//                   display: "flex",
//                   gap: 8,
//                   flexShrink: 0,
//                 }}
//               >
//                 <input
//                   style={{
//                     flex: 1,
//                     padding: "10px 14px",
//                     borderRadius: 10,
//                     border: "1.5px solid #e2e8f0",
//                     fontSize: 13,
//                     fontFamily: "inherit",
//                     outline: "none",
//                     minWidth: 0,
//                   }}
//                   placeholder={`Message ${activeVendor.name}…`}
//                   value={chatInput}
//                   onChange={(e) => setChatInput(e.target.value)}
//                   onKeyDown={(e) =>
//                     e.key === "Enter" && !e.shiftKey && sendMessage()
//                   }
//                 />
//                 <button
//                   onClick={sendMessage}
//                   style={{
//                     padding: "10px 14px",
//                     background:
//                       "linear-gradient(135deg, #3b82f6, #2563eb)",
//                     color: "white",
//                     border: "none",
//                     borderRadius: 10,
//                     cursor: "pointer",
//                     fontSize: 14,
//                     fontWeight: 700,
//                     flexShrink: 0,
//                   }}
//                 >
//                   &#8594;
//                 </button>
//               </div>
//             </>
//           ) : (
//             /* FIX 10: Empty state when no vendor selected — layout stays intact */
//             <div
//               style={{
//                 flex: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 padding: 24,
//                 color: "#94a3b8",
//                 textAlign: "center",
//               }}
//             >
//               <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
//               <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>
//                 Select a vendor
//               </div>
//               <div style={{ fontSize: 12, marginTop: 4 }}>
//                 Click a vendor to open chat
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


// ══════════════════════════════════════════════════════════════════════════
//  VIEW POs  — Full screen table → slides left on row click
// ══════════════════════════════════════════════════════════════════════════
function ViewPOs() {
  const pos = usePOStore();
  const [selectedPO, setSelectedPO] = useState(null);
  const [activeVendor, setActiveVendor] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [localChats, setLocalChats] = useState({});
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeVendor, localChats]);

  const openDetails = (po) => {
    setSelectedPO(po);
    setActiveVendor(null);
    setLocalChats(po.chats || {});
  };

  const closeDetails = () => {
    setSelectedPO(null);
    setActiveVendor(null);
  };

  const sendMessage = () => {
    if (!chatInput.trim() || !activeVendor || !selectedPO) return;
    setLocalChats((prev) => {
      const msgs = prev[activeVendor.id] || [];
      return {
        ...prev,
        [activeVendor.id]: [
          ...msgs,
          {
            from: "us",
            text: chatInput.trim(),
            ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      };
    });
    setChatInput("");
    setTimeout(() => {
      const replies = [
        "Thank you, we'll process this shortly.",
        "Noted! We'll confirm the delivery date.",
        "Received. Our team will get back to you.",
        "Understood. Checking stock availability now.",
        "Sure! We can accommodate this request.",
      ];
      setLocalChats((prev) => {
        const msgs = prev[activeVendor.id] || [];
        return {
          ...prev,
          [activeVendor.id]: [
            ...msgs,
            {
              from: "vendor",
              text: replies[Math.floor(Math.random() * replies.length)],
              ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ],
        };
      });
    }, 1200);
  };

  const statusColor = {
    Sent: "#2563eb",
    Draft: "#94a3b8",
    Confirmed: "#16a34a",
    Cancelled: "#dc2626",
  };

  return (
    <div style={cs.viewRoot}>

      {/* ══════════════════════════════════════════════
          LEFT PANEL — full width when no PO selected,
          collapses to 420px when a PO is opened
      ══════════════════════════════════════════════ */}
      <div
        style={{
          // KEY: width animates via transition
          width: selectedPO ? 420 : "100%",
          minWidth: selectedPO ? 420 : "unset",
          maxWidth: selectedPO ? 420 : "unset",
          flexShrink: 0,
          borderRight: selectedPO ? "1px solid #e2e8f0" : "none",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
          background: "#fff",
        }}
      >
        {/* Header */}
        <div style={cs.leftHeader}>
          <div>
            <h1 style={cs.leftTitle}>Purchase Orders</h1>
            <p style={cs.leftSub}>{pos.length} orders total</p>
          </div>
          {/* Show a hint when in full-screen mode */}
          {!selectedPO && (
            <div style={cs.hintBadge}>
              Click a row to view details
            </div>
          )}
        </div>

        {/* Table */}
        <div style={{ overflowY: "auto", overflowX: "auto", flex: 1 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: selectedPO ? 380 : 700 }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <tr>
                {/* Show fewer columns when collapsed to save space */}
                {(selectedPO
                  ? ["PO ID", "Date", "Total", "Status", ""]
                  : ["PO ID", "Date", "Vendors", "Total", "Status", "Actions"]
                ).map((h) => (
                  <th key={h} style={cs.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pos.map((po) => (
                <tr
                  key={po.id}
                  style={{
                    background: selectedPO?.id === po.id ? "#eff6ff" : "white",
                    borderBottom: "1px solid #f1f5f9",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onClick={() => openDetails(po)}
                >
                  <td style={{ ...cs.td, fontWeight: 700, color: "#2563eb", fontSize: 12 }}>
                    {po.id}
                  </td>
                  <td style={{ ...cs.td, fontSize: 12, color: "#64748b" }}>
                    {po.date}
                  </td>

                  {/* Vendors column — only in full-screen mode */}
                  {!selectedPO && (
                    <td style={cs.td}>
                      <div style={{ display: "flex", gap: 4 }}>
                        {po.vendors.slice(0, 2).map((v) => (
                          <span key={v.id} style={{ ...cs.avatar, width: 24, height: 24, fontSize: 9 }}>
                            {v.avatar}
                          </span>
                        ))}
                        {po.vendors.length > 2 && (
                          <span style={{ fontSize: 11, color: "#64748b", alignSelf: "center" }}>
                            +{po.vendors.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                  )}

                  <td style={{ ...cs.td, fontWeight: 700, fontSize: 13 }}>
                    {fmt(po.total)}
                  </td>
                  <td style={cs.td}>
                    <span
                      style={{
                        ...cs.statusBadge,
                        background: (statusColor[po.status] || "#94a3b8") + "18",
                        color: statusColor[po.status] || "#94a3b8",
                        border: `1px solid ${statusColor[po.status] || "#94a3b8"}30`,
                      }}
                    >
                      {po.status}
                    </span>
                  </td>

                  {/* Actions column — full-screen mode shows buttons; collapsed shows arrow */}
                  {selectedPO ? (
                    <td style={{ ...cs.td, textAlign: "center" }}>
                      {selectedPO?.id === po.id
                        ? <span style={{ color: "#2563eb", fontWeight: 800, fontSize: 16 }}>&#8594;</span>
                        : <span style={{ color: "#cbd5e1", fontSize: 14 }}>›</span>
                      }
                    </td>
                  ) : (
                    <td style={cs.td} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={cs.viewBtn} onClick={() => openDetails(po)}>View</button>
                        <button style={cs.detailBtn} onClick={() => openDetails(po)}>Details</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          RIGHT PANELS — only mount when a PO is open
      ══════════════════════════════════════════════ */}
      {selectedPO && (
        <>
          {/* ── Middle: PO Detail ── */}
          <div style={cs.detailPanel}>
            {/* Detail Header */}
            <div style={cs.detailHeader}>
              <div>
                <div style={cs.detailLabel}>Purchase Order</div>
                <h2 style={cs.detailTitle}>{selectedPO.id}</h2>
                <div style={{ fontSize: 13, color: "#64748b" }}>
                  Created: {selectedPO.date} · Delivery: {selectedPO.delivery || "N/A"}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                <span
                  style={{
                    ...cs.statusBadge,
                    background: (statusColor[selectedPO.status] || "#94a3b8") + "18",
                    color: statusColor[selectedPO.status] || "#94a3b8",
                    border: `1px solid ${statusColor[selectedPO.status] || "#94a3b8"}30`,
                    fontSize: 13,
                    padding: "6px 14px",
                  }}
                >
                  {selectedPO.status}
                </span>
                <button style={cs.viewBtn} onClick={closeDetails}>Close</button>
              </div>
            </div>

            {/* Line Items */}
            <div style={{ padding: "24px" }}>
              <h4 style={cs.sectionLabel}>Line Items</h4>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
                <thead>
                  <tr>
                    {["Product", "Qty", "Rate", "Amount"].map((h) => (
                      <th key={h} style={cs.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedPO.items.map((it, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={cs.td}>{it.product}</td>
                      <td style={cs.td}>{it.qty}</td>
                      <td style={cs.td}>{fmt(it.rate)}</td>
                      <td style={{ ...cs.td, fontWeight: 700 }}>{fmt(it.qty * it.rate)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} style={{ textAlign: "right", padding: "12px 14px", fontWeight: 700, fontSize: 14, borderTop: "2px solid #e2e8f0", color: "#334155" }}>
                      Grand Total
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: 18, fontWeight: 800, color: "#2563eb", borderTop: "2px solid #e2e8f0" }}>
                      {fmt(selectedPO.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Order Summary */}
              <div style={cs.summaryBox}>
                <div style={cs.summaryTitle}>Order Summary</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 0" }}>
                  {[
                    ["PO ID", selectedPO.id],
                    ["Date", selectedPO.date],
                    ["Delivery", selectedPO.delivery || "N/A"],
                    ["Vendors", selectedPO.vendors.length],
                    ["Items", selectedPO.items.length],
                    ["Total", fmt(selectedPO.total)],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 6 }}>
                      <span style={{ fontSize: 12, color: "#94a3b8", minWidth: 70 }}>{k}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Vendors List ── */}
          <div style={cs.vendorPanel}>
            <div style={cs.vendorPanelHeader}>
              <div style={cs.sectionLabel}>Vendors</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                {selectedPO.vendors.length} recipient{selectedPO.vendors.length !== 1 ? "s" : ""}
              </div>
            </div>
            <div style={{ padding: "10px", flex: 1, overflowY: "auto" }}>
              {selectedPO.vendors.map((v) => {
                const msgs = localChats[v.id] || [];
                const unread = msgs.filter((m) => m.from === "vendor").length;
                const isActive = activeVendor?.id === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setActiveVendor(v)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "11px 12px", borderRadius: 10, marginBottom: 6,
                      cursor: "pointer",
                      background: isActive ? "#eff6ff" : "white",
                      border: isActive ? "1.5px solid #bfdbfe" : "1.5px solid #f1f5f9",
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ ...cs.avatar, background: isActive ? "#2563eb" : "#e2e8f0", color: isActive ? "white" : "#64748b", flexShrink: 0 }}>
                      {v.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {v.name}
                      </div>
                      <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}>
                        {msgs.length} message{msgs.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                    {unread > 0 && (
                      <span style={{ background: "#2563eb", color: "white", borderRadius: 99, fontSize: 10, fontWeight: 700, padding: "2px 6px", flexShrink: 0 }}>
                        {unread}
                      </span>
                    )}
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>›</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Chat Panel (always present when PO open) ── */}
          <div style={cs.chatPanel}>
            {activeVendor ? (
              <>
                {/* Chat Header */}
                <div style={cs.chatHeader}>
                  <div style={{ ...cs.avatar, background: "#2563eb", color: "white" }}>
                    {activeVendor.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {activeVendor.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>
                      PO Chat · {selectedPO.id}
                    </div>
                  </div>
                  <button style={{ ...cs.viewBtn, fontSize: 12, flexShrink: 0 }} onClick={() => setActiveVendor(null)}>
                    Close
                  </button>
                </div>

                {/* Context Chip */}
                <div style={cs.chatChipWrap}>
                  <div style={cs.chatChip}>
                    {selectedPO.id} · {selectedPO.items.length} items · {fmt(selectedPO.total)}
                  </div>
                </div>

                {/* Messages */}
                <div style={cs.chatMessages}>
                  {(localChats[activeVendor.id] || []).length === 0 && (
                    <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, marginTop: 40 }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
                      Start the conversation with {activeVendor.name}
                    </div>
                  )}
                  {(localChats[activeVendor.id] || []).map((msg, i) => {
                    const isUs = msg.from === "us";
                    return (
                      <div key={i} style={{ display: "flex", flexDirection: isUs ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
                        {!isUs && (
                          <div style={{ ...cs.avatar, width: 26, height: 26, fontSize: 9, flexShrink: 0 }}>
                            {activeVendor.avatar}
                          </div>
                        )}
                        <div style={{ maxWidth: "75%" }}>
                          <div style={{
                            padding: "9px 13px",
                            borderRadius: isUs ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                            background: isUs ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "#f1f5f9",
                            color: isUs ? "white" : "#1e293b",
                            fontSize: 13, lineHeight: 1.4,
                          }}>
                            {msg.text}
                          </div>
                          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3, textAlign: isUs ? "right" : "left" }}>
                            {msg.ts}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div style={cs.chatInputRow}>
                  <input
                    style={cs.chatInput}
                    placeholder={`Message ${activeVendor.name}…`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  />
                  <button onClick={sendMessage} style={cs.chatSendBtn}>&#8594;</button>
                </div>
              </>
            ) : (
              /* Empty state — no vendor selected */
              <div style={cs.chatEmpty}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>Select a vendor</div>
                <div style={{ fontSize: 12, marginTop: 4, color: "#94a3b8" }}>Click a vendor to open chat</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  APP SHELL
// ══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("view");

  return (
    <div
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top Nav */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #e2e8f0",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          height: 54,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 16,
            color: "#0f172a",
            marginRight: 32,
          }}
        >
          PO Manager
        </div>
        {[
          ["view", "View POs"],
          ["create", "Create PO"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: "0 18px",
              height: "100%",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              color: tab === key ? "#2563eb" : "#64748b",
              borderBottom:
                tab === key
                  ? "2.5px solid #2563eb"
                  : "2.5px solid transparent",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content — FIX 11: flex:1 + overflow:hidden so children control their own scroll */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
        {tab === "view" ? (
          <ViewPOs />
        ) : (
          <CreatePO onCreated={() => setTab("view")} />
        )}
      </div>
    </div>
  );
}

// ── Shared Component Styles ────────────────────────────────────────────────
// const cs = {
//   // FIX 12: CreatePO outer fills height, inner scrolls
//   createOuter: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden",
//     background: "#f8fafc",
//   },
//   createScroll: {
//     flex: 1,
//     overflowY: "auto",
//     overflowX: "hidden",
//   },
//   pageWrap: {
//     maxWidth: 960,
//     margin: "0 auto",
//     padding: 28,
//     display: "flex",
//     flexDirection: "column",
//     gap: 20,
//   },
//   pageHeader: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//   },
//   pageTitle: { fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 },
//   pageSub: { fontSize: 13, color: "#94a3b8", marginTop: 4, margin: "4px 0 0" },
//   successBanner: {
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     padding: "12px 20px",
//     background: "#f0fdf4",
//     border: "1px solid #bbf7d0",
//     borderRadius: 12,
//     fontSize: 14,
//     fontWeight: 600,
//     color: "#15803d",
//   },
//   card: {
//     background: "#fff",
//     borderRadius: 16,
//     border: "1px solid #f1f5f9",
//     boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
//     padding: 24,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: 700,
//     color: "#334155",
//     margin: "0 0 16px",
//   },
//   grid3: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: 16,
//   },
//   fg: { display: "flex", flexDirection: "column", gap: 6 },
//   label: { fontSize: 13, fontWeight: 600, color: "#475569" },
//   badge: {
//     fontSize: 11,
//     fontWeight: 700,
//     background: "#eff6ff",
//     color: "#2563eb",
//     borderRadius: 99,
//     padding: "2px 8px",
//     marginLeft: 6,
//   },
//   input: {
//     padding: "10px 14px",
//     border: "1.5px solid #e2e8f0",
//     borderRadius: 10,
//     fontSize: 14,
//     fontFamily: "inherit",
//     background: "#fff",
//     color: "#1e293b",
//     outline: "none",
//     boxSizing: "border-box",
//     width: "100%",
//   },
//   inputReadonly: {
//     padding: "10px 14px",
//     border: "1.5px solid #e2e8f0",
//     borderRadius: 10,
//     fontSize: 14,
//     fontFamily: "inherit",
//     background: "#f8fafc",
//     color: "#94a3b8",
//     outline: "none",
//     boxSizing: "border-box",
//     width: "100%",
//     cursor: "not-allowed",
//   },
//   vendorPicker: {
//     display: "flex",
//     alignItems: "center",
//     flexWrap: "wrap",
//     gap: 6,
//     padding: "8px 12px",
//     border: "1.5px solid #e2e8f0",
//     borderRadius: 10,
//     minHeight: 44,
//     cursor: "pointer",
//     background: "#fff",
//     userSelect: "none",
//   },
//   chipRow: { display: "flex", flexWrap: "wrap", gap: 4, flex: 1 },
//   chip: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 4,
//     background: "#eff6ff",
//     color: "#2563eb",
//     border: "1px solid #bfdbfe",
//     borderRadius: 20,
//     padding: "3px 10px",
//     fontSize: 12,
//     fontWeight: 600,
//   },
//   chipX: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     color: "#2563eb",
//     fontSize: 14,
//     padding: 0,
//     lineHeight: 1,
//     display: "flex",
//   },
//   dropdown: {
//     position: "absolute",
//     top: "100%",
//     left: 0,
//     right: 0,
//     background: "white",
//     border: "1.5px solid #e2e8f0",
//     borderRadius: 12,
//     boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
//     zIndex: 100,
//     overflow: "hidden",
//     marginTop: 4,
//   },
//   dropSearch: {
//     width: "100%",
//     padding: "10px 14px",
//     border: "none",
//     borderBottom: "1px solid #f1f5f9",
//     fontSize: 13,
//     fontFamily: "inherit",
//     outline: "none",
//     boxSizing: "border-box",
//   },
//   dropItem: {
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     padding: "10px 14px",
//     cursor: "pointer",
//     transition: "background 0.1s",
//   },
//   avatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     background: "#e2e8f0",
//     color: "#64748b",
//     fontSize: 11,
//     fontWeight: 800,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexShrink: 0,
//   },
//   vendorPreviewRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//     flexWrap: "wrap",
//     padding: "10px 16px",
//     background: "#eff6ff",
//     borderRadius: 10,
//     border: "1px solid #bfdbfe",
//   },
//   vendorPill: {
//     display: "flex",
//     alignItems: "center",
//     gap: 6,
//     background: "white",
//     border: "1px solid #bfdbfe",
//     borderRadius: 20,
//     padding: "4px 10px 4px 6px",
//     fontSize: 12,
//     fontWeight: 600,
//     color: "#1e293b",
//   },
//   addBtn: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 6,
//     padding: "7px 14px",
//     background: "#eff6ff",
//     color: "#2563eb",
//     border: "1px solid #dbeafe",
//     borderRadius: 8,
//     fontSize: 13,
//     fontWeight: 600,
//     cursor: "pointer",
//   },
//   th: {
//     textAlign: "left",
//     padding: "10px 14px",
//     fontSize: 11,
//     fontWeight: 700,
//     color: "#94a3b8",
//     textTransform: "uppercase",
//     letterSpacing: "0.07em",
//     borderBottom: "1px solid #f1f5f9",
//     background: "#f8fafc",
//     whiteSpace: "nowrap",
//   },
//   td: {
//     padding: "10px 14px",
//     fontSize: 13,
//     color: "#334155",
//     verticalAlign: "middle",
//   },
//   tdN: {
//     padding: "10px 14px",
//     fontSize: 12,
//     color: "#94a3b8",
//     fontWeight: 600,
//     verticalAlign: "middle",
//     width: 36,
//   },
//   tSel: {
//     width: "100%",
//     minWidth: 160,
//     padding: "7px 10px",
//     border: "1.5px solid #e2e8f0",
//     borderRadius: 8,
//     fontSize: 13,
//     fontFamily: "inherit",
//     background: "#fff",
//     color: "#1e293b",
//     cursor: "pointer",
//     outline: "none",
//   },
//   tIn: {
//     padding: "7px 10px",
//     border: "1.5px solid #e2e8f0",
//     borderRadius: 8,
//     fontSize: 13,
//     fontFamily: "inherit",
//     background: "#fff",
//     color: "#1e293b",
//     outline: "none",
//     boxSizing: "border-box",
//   },
//   removeBtn: {
//     padding: "5px 9px",
//     background: "#fee2e2",
//     color: "#dc2626",
//     border: "1px solid #fecaca",
//     borderRadius: 7,
//     cursor: "pointer",
//     fontSize: 13,
//   },
//   statusBadge: {
//     display: "inline-flex",
//     alignItems: "center",
//     borderRadius: 20,
//     padding: "3px 10px",
//     fontSize: 11,
//     fontWeight: 700,
//   },
//   viewBtn: {
//     padding: "5px 12px",
//     background: "#f1f5f9",
//     color: "#475569",
//     border: "1px solid #e2e8f0",
//     borderRadius: 7,
//     fontSize: 12,
//     fontWeight: 600,
//     cursor: "pointer",
//   },
//   detailBtn: {
//     padding: "5px 12px",
//     background: "#eff6ff",
//     color: "#2563eb",
//     border: "1px solid #bfdbfe",
//     borderRadius: 7,
//     fontSize: 12,
//     fontWeight: 600,
//     cursor: "pointer",
//   },
//   draftBtn: {
//     padding: "10px 22px",
//     background: "#f0f4fb",
//     color: "#3b82f6",
//     border: "1px solid #dbeafe",
//     borderRadius: 10,
//     fontSize: 14,
//     fontWeight: 600,
//     cursor: "pointer",
//   },
//   submitBtn: {
//     padding: "10px 22px",
//     background: "linear-gradient(135deg, #3b82f6, #2563eb)",
//     color: "#fff",
//     border: "none",
//     borderRadius: 10,
//     fontSize: 14,
//     fontWeight: 600,
//     cursor: "pointer",
//     boxShadow: "0 2px 8px rgba(59,130,246,0.30)",
//   },
// };


const cs = {
  // ── CreatePO layout ───────────────────────────────────────────────────
  createOuter: {
    flex: 1, display: "flex", flexDirection: "column",
    overflow: "hidden", background: "#f8fafc",
  },
  createScroll: { flex: 1, overflowY: "auto", overflowX: "hidden" },
  pageWrap: {
    maxWidth: 960, margin: "0 auto", padding: 28,
    display: "flex", flexDirection: "column", gap: 20,
  },
  pageHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between" },
  pageTitle: { fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 },
  pageSub: { fontSize: 13, color: "#94a3b8", marginTop: 4, margin: "4px 0 0" },
  successBanner: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "12px 20px", background: "#f0fdf4",
    border: "1px solid #bbf7d0", borderRadius: 12,
    fontSize: 14, fontWeight: 600, color: "#15803d",
  },
  card: {
    background: "#fff", borderRadius: 16,
    border: "1px solid #f1f5f9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)", padding: 24,
  },
  sectionTitle: { fontSize: 14, fontWeight: 700, color: "#334155", margin: "0 0 16px" },
  grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 },
  fg: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#475569" },
  badge: {
    fontSize: 11, fontWeight: 700, background: "#eff6ff",
    color: "#2563eb", borderRadius: 99, padding: "2px 8px", marginLeft: 6,
  },
  input: {
    padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10,
    fontSize: 14, fontFamily: "inherit", background: "#fff", color: "#1e293b",
    outline: "none", boxSizing: "border-box", width: "100%",
  },
  inputReadonly: {
    padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10,
    fontSize: 14, fontFamily: "inherit", background: "#f8fafc", color: "#94a3b8",
    outline: "none", boxSizing: "border-box", width: "100%", cursor: "not-allowed",
  },
  vendorPicker: {
    display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6,
    padding: "8px 12px", border: "1.5px solid #e2e8f0", borderRadius: 10,
    minHeight: 44, cursor: "pointer", background: "#fff", userSelect: "none",
  },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 4, flex: 1 },
  chip: {
    display: "inline-flex", alignItems: "center", gap: 4,
    background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe",
    borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600,
  },
  chipX: {
    background: "none", border: "none", cursor: "pointer",
    color: "#2563eb", fontSize: 14, padding: 0, lineHeight: 1, display: "flex",
  },
  dropdown: {
    position: "absolute", top: "100%", left: 0, right: 0,
    background: "white", border: "1.5px solid #e2e8f0", borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100,
    overflow: "hidden", marginTop: 4,
  },
  dropSearch: {
    width: "100%", padding: "10px 14px", border: "none",
    borderBottom: "1px solid #f1f5f9", fontSize: 13,
    fontFamily: "inherit", outline: "none", boxSizing: "border-box",
  },
  dropItem: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 14px", cursor: "pointer", transition: "background 0.1s",
  },
  vendorPreviewRow: {
    display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
    padding: "10px 16px", background: "#eff6ff",
    borderRadius: 10, border: "1px solid #bfdbfe",
  },
  vendorPill: {
    display: "flex", alignItems: "center", gap: 6, background: "white",
    border: "1px solid #bfdbfe", borderRadius: 20, padding: "4px 10px 4px 6px",
    fontSize: 12, fontWeight: 600, color: "#1e293b",
  },
  addBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "7px 14px", background: "#eff6ff", color: "#2563eb",
    border: "1px solid #dbeafe", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  tSel: {
    width: "100%", minWidth: 160, padding: "7px 10px",
    border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13,
    fontFamily: "inherit", background: "#fff", color: "#1e293b",
    cursor: "pointer", outline: "none",
  },
  tIn: {
    padding: "7px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8,
    fontSize: 13, fontFamily: "inherit", background: "#fff",
    color: "#1e293b", outline: "none", boxSizing: "border-box",
  },
  removeBtn: {
    padding: "5px 9px", background: "#fee2e2", color: "#dc2626",
    border: "1px solid #fecaca", borderRadius: 7, cursor: "pointer", fontSize: 13,
  },
  draftBtn: {
    padding: "10px 22px", background: "#f0f4fb", color: "#3b82f6",
    border: "1px solid #dbeafe", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
  submitBtn: {
    padding: "10px 22px", background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600,
    cursor: "pointer", boxShadow: "0 2px 8px rgba(59,130,246,0.30)",
  },

  // ── Shared ────────────────────────────────────────────────────────────
  avatar: {
    width: 32, height: 32, borderRadius: 8, background: "#e2e8f0",
    color: "#64748b", fontSize: 11, fontWeight: 800,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  th: {
    textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 700,
    color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em",
    borderBottom: "1px solid #f1f5f9", background: "#f8fafc", whiteSpace: "nowrap",
  },
  td: { padding: "10px 14px", fontSize: 13, color: "#334155", verticalAlign: "middle" },
  tdN: { padding: "10px 14px", fontSize: 12, color: "#94a3b8", fontWeight: 600, verticalAlign: "middle", width: 36 },
  statusBadge: {
    display: "inline-flex", alignItems: "center",
    borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700,
  },
  viewBtn: {
    padding: "5px 12px", background: "#f1f5f9", color: "#475569",
    border: "1px solid #e2e8f0", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer",
  },
  detailBtn: {
    padding: "5px 12px", background: "#eff6ff", color: "#2563eb",
    border: "1px solid #bfdbfe", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer",
  },

  // ── ViewPOs layout ────────────────────────────────────────────────────
  viewRoot: {
    display: "flex",
    width:"100%",
    height: "100%",
    overflow: "hidden",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    background: "#f8fafc",
  },
  leftHeader: {
    padding: "24px 24px 16px",
    borderBottom: "1px solid #f1f5f9",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
  },
  leftTitle: { margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" },
  leftSub: { margin: "4px 0 0", fontSize: 13, color: "#94a3b8" },
  hintBadge: {
    fontSize: 12, fontWeight: 600, color: "#64748b",
    background: "#f1f5f9", border: "1px solid #e2e8f0",
    borderRadius: 20, padding: "5px 14px",
  },

  // Detail panel
  detailPanel: {
    flex: "1 1 auto", borderRight: "1px solid #e2e8f0",
    overflowY: "auto", background: "white", minWidth: 0,
    display: "flex", flexDirection: "column",
  },
  detailHeader: {
    padding: "24px", borderBottom: "1px solid #f1f5f9",
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", flexShrink: 0,
  },
  detailLabel: {
    fontSize: 11, fontWeight: 700, color: "#94a3b8",
    textTransform: "uppercase", letterSpacing: "0.08em",
  },
  detailTitle: { margin: "6px 0 2px", fontSize: 22, fontWeight: 800, color: "#0f172a" },
  sectionLabel: {
    fontSize: 13, fontWeight: 700, color: "#475569",
    margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.06em",
  },
  summaryBox: {
    background: "#f8fafc", borderRadius: 12,
    padding: "16px 20px", border: "1px solid #f1f5f9",
  },
  summaryTitle: {
    fontSize: 12, fontWeight: 700, color: "#94a3b8",
    textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10,
  },

  // Vendor panel
  vendorPanel: {
    flex: "0 0 220px", borderRight: "1px solid #e2e8f0",
    overflowY: "auto", background: "#fafafa",
    display: "flex", flexDirection: "column",
  },
  vendorPanelHeader: {
    padding: "20px 16px 14px", borderBottom: "1px solid #f1f5f9", flexShrink: 0,
  },

  // Chat panel
  chatPanel: {
    flex: "0 0 320px", display: "flex", flexDirection: "column",
    background: "white", overflow: "hidden", borderLeft: "1px solid #e2e8f0",
  },
  chatHeader: {
    padding: "16px 20px", borderBottom: "1px solid #f1f5f9",
    display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
  },
  chatChipWrap: {
    padding: "10px 16px", background: "#f8fafc",
    borderBottom: "1px solid #f1f5f9", flexShrink: 0,
  },
  chatChip: {
    fontSize: 11, background: "#eff6ff", border: "1px solid #bfdbfe",
    borderRadius: 8, padding: "6px 10px", color: "#2563eb", fontWeight: 600,
  },
  chatMessages: {
    flex: 1, overflowY: "auto", padding: "16px",
    display: "flex", flexDirection: "column", gap: 10,
  },
  chatInputRow: {
    padding: "12px 16px", borderTop: "1px solid #f1f5f9",
    display: "flex", gap: 8, flexShrink: 0,
  },
  chatInput: {
    flex: 1, padding: "10px 14px", borderRadius: 10,
    border: "1.5px solid #e2e8f0", fontSize: 13,
    fontFamily: "inherit", outline: "none", minWidth: 0,
  },
  chatSendBtn: {
    padding: "10px 14px",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "white", border: "none", borderRadius: 10,
    cursor: "pointer", fontSize: 14, fontWeight: 700, flexShrink: 0,
  },
  chatEmpty: {
    flex: 1, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: 24, color: "#94a3b8", textAlign: "center",
  },
};
