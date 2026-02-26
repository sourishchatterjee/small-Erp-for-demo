
// ////////////////////////////////////////////////////////////////////////////////////////////


// import { useState, useRef, useEffect } from "react";

// // ── Mock Data ──────────────────────────────────────────────────────────────
// const VENDORS = [
//   { id: 1, name: "Apex Supplies Co.", contact: "apex@supplies.com", status: "Active", avatar: "AS" },
//   { id: 2, name: "BlueStar Materials", contact: "blue@star.in", status: "Active", avatar: "BM" },
//   { id: 3, name: "CoreTech Parts", contact: "core@tech.io", status: "Active", avatar: "CP" },
//   { id: 4, name: "Delta Logistics", contact: "delta@log.net", status: "Active", avatar: "DL" },
//   { id: 5, name: "Everest Traders", contact: "ev@traders.com", status: "Active", avatar: "ET" },
// ];

// // ✅ No price field — vendor will reply with price
// const PRODUCTS = [
//   { id: 1, name: "Office Chair" },
//   { id: 2, name: "Standing Desk" },
//   { id: 3, name: 'Monitor 27"' },
//   { id: 4, name: "Mechanical Keyboard" },
//   { id: 5, name: "Ethernet Cable 10m" },
//   { id: 6, name: "UPS 1500VA" },
//   { id: 7, name: "Webcam HD" },
// ];

// const fmt = (n) => `\u20b9${Number(n).toLocaleString("en-IN")}`;
// const uid = () => Math.random().toString(36).slice(2, 8).toUpperCase();
// const now = () => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

// // ── Global PO Store ────────────────────────────────────────────────────────
// let _pos = [];
// const _listeners = new Set();
// function addPo(po) { _pos = [po, ..._pos]; _listeners.forEach((fn) => fn()); }
// function updatePo(po) { _pos = _pos.map((p) => (p.id === po.id ? po : p)); _listeners.forEach((fn) => fn()); }
// function usePOStore() {
//   const [pos, setPos] = useState(_pos);
//   useEffect(() => {
//     const fn = () => setPos([..._pos]);
//     _listeners.add(fn);
//     return () => _listeners.delete(fn);
//   }, []);
//   return pos;
// }

// // ── SEED demo POs ──────────────────────────────────────────────────────────
// (function seed() {
//   if (_pos.length) return;
//   _pos = [
//     {
//       id: "PO-2026-A1B", date: "12 Jan 2026", delivery: "2026-02-01", status: "Sent",
//       vendors: [VENDORS[0], VENDORS[2]],
//       items: [
//         { product: "Office Chair", qty: 4, remarks: "Ergonomic, with lumbar support" },
//         { product: 'Monitor 27"', qty: 1, remarks: "IPS panel, 144Hz preferred" },
//       ],
//       chats: {
//         1: [
//           { from: "us", text: "Please confirm availability.", ts: "10:00 AM" },
//           { from: "vendor", text: "Yes, all items in stock!", ts: "10:45 AM" },
//         ],
//         3: [{ from: "us", text: "Can you deliver by Feb 1?", ts: "10:05 AM" }],
//       },
//     },
//     {
//       id: "PO-2026-C3D", date: "18 Jan 2026", delivery: "2026-02-15", status: "Draft",
//       vendors: [VENDORS[1]],
//       items: [{ product: "Standing Desk", qty: 2, remarks: "Height adjustable, min 70cm" }],
//       chats: { 2: [] },
//     },
//     {
//       id: "PO-2026-E5F", date: "22 Jan 2026", delivery: "2026-03-01", status: "Confirmed",
//       vendors: [VENDORS[3], VENDORS[4]],
//       items: [
//         { product: "Ethernet Cable 10m", qty: 10, remarks: "CAT6, shielded" },
//         { product: "UPS 1500VA", qty: 1, remarks: "ISI certified" },
//         { product: "Webcam HD", qty: 3, remarks: "1080p, USB-A" },
//       ],
//       chats: {
//         4: [{ from: "vendor", text: "Order confirmed. ETA March 1.", ts: "9:00 AM" }],
//         5: [],
//       },
//     },
//   ];
// })();

// // ══════════════════════════════════════════════════════════════════════════
// //  CREATE / EDIT PO
// //  ─ No price / rate / amount anywhere in this form
// //  ─ Items: product + qty + remarks only
// //  ─ editPO prop → pre-fills form for editing an existing PO
// // ══════════════════════════════════════════════════════════════════════════
// function CreatePO({ onCreated, editPO }) {
//   const isEdit = !!editPO;

//   const [selectedVendors, setSelectedVendors] = useState(isEdit ? editPO.vendors : []);
//   const [vendorSearch, setVendorSearch] = useState("");
//   const [deliveryDate, setDeliveryDate] = useState(isEdit ? (editPO.delivery || "") : "");
//   // ✅ items shape: { product, qty, remarks } — no rate
//   const [items, setItems] = useState(
//     isEdit
//       ? editPO.items.map((it) => ({ product: it.product, qty: it.qty, remarks: it.remarks || "" }))
//       : [{ product: "", qty: "", remarks: "" }]
//   );
//   const [submitted, setSubmitted] = useState(false);
//   const [vendorDropOpen, setVendorDropOpen] = useState(false);

//   const toggleVendor = (v) => {
//     setSelectedVendors((prev) =>
//       prev.find((x) => x.id === v.id) ? prev.filter((x) => x.id !== v.id) : [...prev, v]
//     );
//   };

//   // ✅ No rate auto-fill on product select
//   const addItem = () => setItems([...items, { product: "", qty: "", remarks: "" }]);
//   const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
//   const updateItem = (i, field, val) => {
//     const up = [...items];
//     up[i][field] = val;
//     setItems(up);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedVendors.length || items.some((it) => !it.product || !it.qty)) return;

//     if (isEdit) {
//       const updated = {
//         ...editPO,
//         delivery: deliveryDate,
//         vendors: selectedVendors,
//         items: items.filter((it) => it.product),
//         chats: editPO.chats,
//       };
//       updatePo(updated);
//       setSubmitted(true);
//       setTimeout(() => { setSubmitted(false); if (onCreated) onCreated(); }, 1800);
//     } else {
//       const po = {
//         id: `PO-2026-${uid()}`,
//         date: now(),
//         delivery: deliveryDate,
//         status: "Sent",
//         vendors: selectedVendors,
//         items: items.filter((it) => it.product),
//         chats: Object.fromEntries(selectedVendors.map((v) => [v.id, []])),
//       };
//       addPo(po);
//       setSubmitted(true);
//       setTimeout(() => {
//         setSubmitted(false);
//         setSelectedVendors([]);
//         setItems([{ product: "", qty: "", remarks: "" }]);
//         setDeliveryDate("");
//         if (onCreated) onCreated();
//       }, 2000);
//     }
//   };

//   const filteredVendors = VENDORS.filter(
//     (v) => v.status === "Active" && v.name.toLowerCase().includes(vendorSearch.toLowerCase())
//   );

//   return (
//     <div style={cs.createOuter}>
//       <div style={cs.createScroll}>
//         <div style={cs.pageWrap}>

//           {/* ── Header ── */}
//           <div style={cs.pageHeader}>
//             <div>
//               <h1 style={cs.pageTitle}>
//                 {isEdit ? "Edit Purchase Order" : "Create Purchase Order"}
//               </h1>
//               <p style={cs.pageSub}>
//                 {isEdit
//                   ? `Editing ${editPO.id} · Originally created on ${editPO.date}`
//                   : "Send a PO to vendors — they will reply with HSN code, price & delivery date"}
//               </p>
//             </div>
//             {isEdit && (
//               <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#2563eb" }}>
//                 &#9998; Editing: {editPO.id}
//               </div>
//             )}
//           </div>

//           {/* ✅ Info banner — vendor-reply workflow hint */}
//           <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, fontSize: 13, color: "#1d4ed8" }}>
//             <span style={{ fontSize: 18, flexShrink: 0 }}>&#8505;</span>
//             <span>
//               Fill in <strong>product name</strong>, <strong>quantity</strong> and <strong>remarks / specifications</strong> only.
//               The vendor will reply back with <strong>HSN code, unit price, confirmed quantity</strong> and <strong>delivery date</strong>.
//             </span>
//           </div>

//           {submitted && (
//             <div style={cs.successBanner}>
//               <span style={{ fontSize: 20 }}>&#10003;</span>
//               {isEdit
//                 ? `Purchase Order ${editPO.id} updated successfully!`
//                 : `Purchase Order created & dispatched to ${selectedVendors.length} vendor${selectedVendors.length > 1 ? "s" : ""}!`}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

//             {/* ── Order Details card ── */}
//             <div style={cs.card}>
//               <h3 style={cs.sectionTitle}>Order Details</h3>
//               <div style={cs.grid3}>

//                 {/* PO Number */}
//                 <div style={cs.fg}>
//                   <label style={cs.label}>PO Number</label>
//                   <input
//                     style={cs.inputReadonly}
//                     readOnly
//                     value={isEdit ? editPO.id : `PO-2026-${String(Date.now()).slice(-4)}`}
//                   />
//                 </div>

//                 {/* Multi-Vendor Picker */}
//                 <div style={{ ...cs.fg, gridColumn: "span 1", position: "relative" }}>
//                   <label style={cs.label}>
//                     Vendors <span style={cs.badge}>{selectedVendors.length} selected</span>
//                   </label>
//                   <div style={cs.vendorPicker} onClick={() => setVendorDropOpen((o) => !o)}>
//                     {selectedVendors.length === 0 ? (
//                       <span style={{ color: "#94a3b8" }}>Select vendors…</span>
//                     ) : (
//                       <div style={cs.chipRow}>
//                         {selectedVendors.map((v) => (
//                           <span key={v.id} style={cs.chip}>
//                             {v.name}
//                             <button
//                               type="button"
//                               onClick={(e) => { e.stopPropagation(); toggleVendor(v); }}
//                               style={cs.chipX}
//                             >
//                               &#215;
//                             </button>
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                     <span style={{ color: "#94a3b8", marginLeft: "auto", fontSize: 12, flexShrink: 0 }}>&#9660;</span>
//                   </div>
//                   {vendorDropOpen && (
//                     <div style={cs.dropdown}>
//                       <input
//                         style={cs.dropSearch}
//                         placeholder="Search vendors…"
//                         value={vendorSearch}
//                         onChange={(e) => setVendorSearch(e.target.value)}
//                         onClick={(e) => e.stopPropagation()}
//                         autoFocus
//                       />
//                       {filteredVendors.map((v) => {
//                         const sel = !!selectedVendors.find((x) => x.id === v.id);
//                         return (
//                           <div
//                             key={v.id}
//                             style={{ ...cs.dropItem, background: sel ? "#eff6ff" : "white" }}
//                             onClick={(e) => { e.stopPropagation(); toggleVendor(v); }}
//                           >
//                             <div style={{ ...cs.avatar, background: sel ? "#2563eb" : "#e2e8f0", color: sel ? "white" : "#64748b" }}>
//                               {v.avatar}
//                             </div>
//                             <div>
//                               <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{v.name}</div>
//                               <div style={{ fontSize: 11, color: "#94a3b8" }}>{v.contact}</div>
//                             </div>
//                             {sel && <span style={{ marginLeft: "auto", color: "#2563eb", fontSize: 16 }}>&#10003;</span>}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>

//                 {/* Expected Delivery */}
//                 <div style={cs.fg}>
//                   <label style={cs.label}>Expected Delivery</label>
//                   <input
//                     style={cs.input}
//                     type="date"
//                     value={deliveryDate}
//                     onChange={(e) => setDeliveryDate(e.target.value)}
//                     required
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* Vendor preview pills */}
//             {selectedVendors.length > 0 && (
//               <div style={cs.vendorPreviewRow}>
//                 <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>PO will be sent to:</span>
//                 {selectedVendors.map((v) => (
//                   <div key={v.id} style={cs.vendorPill}>
//                     <div style={{ ...cs.avatar, width: 22, height: 22, fontSize: 9 }}>{v.avatar}</div>
//                     {v.name}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* ── Line Items card ── */}
//             <div style={cs.card}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
//                 <h3 style={{ ...cs.sectionTitle, margin: 0 }}>Line Items</h3>
//                 <button type="button" style={cs.addBtn} onClick={addItem}>+ Add Item</button>
//               </div>
//               <div style={{ overflowX: "auto" }}>
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     <tr>
//                       {/* ✅ Only: #, Product, Qty, Remarks — NO Rate, NO Amount */}
//                       {["#", "Product", "Qty", "Remarks / Specs", ""].map((h, i) => (
//                         <th key={i} style={cs.th}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {items.map((it, i) => (
//                       <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "white" }}>
//                         <td style={cs.tdN}>{i + 1}</td>

//                         {/* Product dropdown */}
//                         <td style={cs.td}>
//                           <select
//                             style={cs.tSel}
//                             value={it.product}
//                             onChange={(e) => updateItem(i, "product", e.target.value)}
//                           >
//                             <option value="">Select…</option>
//                             {PRODUCTS.map((p) => (
//                               <option key={p.id} value={p.name}>{p.name}</option>
//                             ))}
//                           </select>
//                         </td>

//                         {/* Qty */}
//                         <td style={cs.td}>
//                           <input
//                             style={{ ...cs.tIn, width: 80 }}
//                             type="number"
//                             value={it.qty}
//                             onChange={(e) => updateItem(i, "qty", e.target.value)}
//                             placeholder="0"
//                             min="0"
//                           />
//                         </td>

//                         {/* ✅ Remarks — replaces Rate + Amount */}
//                         <td style={cs.td}>
//                           <input
//                             style={{ ...cs.tIn, width: 280 }}
//                             type="text"
//                             value={it.remarks || ""}
//                             onChange={(e) => updateItem(i, "remarks", e.target.value)}
//                             placeholder="e.g. ISI mark, CAT6, brand specs…"
//                           />
//                         </td>

//                         {/* Remove row */}
//                         <td style={cs.td}>
//                           {items.length > 1 && (
//                             <button type="button" style={cs.removeBtn} onClick={() => removeItem(i)}>
//                               &#128465;
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                   {/* ✅ NO <tfoot> Grand Total — price comes from vendor reply */}
//                 </table>
//               </div>
//             </div>

//             {/* ── Footer buttons ── */}
//             <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingBottom: 24, paddingTop: 4 }}>
//               <button type="button" style={cs.draftBtn} onClick={() => onCreated && onCreated()}>
//                 {isEdit ? "Discard Changes" : "Save as Draft"}
//               </button>
//               <button type="submit" style={cs.submitBtn}>
//                 {isEdit
//                   ? "Update PO"
//                   : `Send to ${selectedVendors.length || "…"} Vendor${selectedVendors.length !== 1 ? "s" : ""}`}
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// //======================================


// // ══════════════════════════════════════════════════════════════════════════
// //  VIEW POs
// //  ─ "View" button  → hides table, shows full-screen PO detail
// //  ─ "← Back to List" → returns to table
// //  ─ "Edit / Details" → switches to CreatePO tab with PO pre-filled
// // ══════════════════════════════════════════════════════════════════════════
// function ViewPOs({ onEdit }) {
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
//             ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
//               ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

//   // ── TABLE VIEW (no PO selected) ──────────────────────────────────────────
//   if (!selectedPO) {
//     return (
//       <div style={cs.viewRoot}>
//         <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#fff" }}>

//           <div style={cs.leftHeader}>
//             <div>
//               <h1 style={cs.leftTitle}>Purchase Orders</h1>
//               <p style={cs.leftSub}>{pos.length} orders total</p>
//             </div>
//             <div style={cs.hintBadge}>Click View to see full details</div>
//           </div>

//           <div style={{ overflowY: "auto", overflowX: "auto", flex: 1 }}>
//             <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
//               <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
//                 <tr>
//                   {["PO ID", "Date", "Vendors", "Status", "Items", "Actions"].map((h) => (
//                     <th key={h} style={cs.th}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {pos.map((po) => (
//                   <tr
//                     key={po.id}
//                     style={{ background: "white", borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
//                     onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
//                     onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
//                   >
//                     <td style={{ ...cs.td, fontWeight: 700, color: "#2563eb", fontSize: 12 }}>{po.id}</td>
//                     <td style={{ ...cs.td, fontSize: 12, color: "#64748b" }}>{po.date}</td>
//                     <td style={cs.td}>
//                       <div style={{ display: "flex", gap: 4 }}>
//                         {po.vendors.slice(0, 2).map((v) => (
//                           <span key={v.id} style={{ ...cs.avatar, width: 24, height: 24, fontSize: 9 }}>{v.avatar}</span>
//                         ))}
//                         {po.vendors.length > 2 && (
//                           <span style={{ fontSize: 11, color: "#64748b", alignSelf: "center" }}>+{po.vendors.length - 2}</span>
//                         )}
//                       </div>
//                     </td>
//                     <td style={cs.td}>
//                       <span style={{
//                         ...cs.statusBadge,
//                         background: (statusColor[po.status] || "#94a3b8") + "18",
//                         color: statusColor[po.status] || "#94a3b8",
//                         border: `1px solid ${statusColor[po.status] || "#94a3b8"}30`,
//                       }}>
//                         {po.status}
//                       </span>
//                     </td>
//                     <td style={{ ...cs.td, fontSize: 12, color: "#475569" }}>
//                       {po.items.length} item{po.items.length !== 1 ? "s" : ""}
//                     </td>
//                     <td style={cs.td} onClick={(e) => e.stopPropagation()}>
//                       <div style={{ display: "flex", gap: 6 }}>
//                         <button style={cs.viewBtn} onClick={() => openDetails(po)}>
//                           View
//                         </button>
//                         <button style={cs.editBtn} onClick={() => onEdit(po)}>
//                            Edit / Details
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── DETAIL VIEW (full screen — table completely hidden) ──────────────────
//   return (
//     <div style={{ ...cs.viewRoot, background: "#f8fafc" }}>
//       <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

//         {/* Detail header */}
//         <div style={cs.detailHeader}>
//           <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//             <button style={cs.backBtn} onClick={closeDetails}>
//               &#8592; Back to List
//             </button>
//             <div style={{ width: 1, height: 28, background: "#e2e8f0" }} />
//             <div>
//               <div style={cs.detailLabel}>Purchase Order</div>
//               <h2 style={cs.detailTitle}>{selectedPO.id}</h2>
//             </div>
//           </div>
//           <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
//             <span style={{
//               ...cs.statusBadge,
//               background: (statusColor[selectedPO.status] || "#94a3b8") + "18",
//               color: statusColor[selectedPO.status] || "#94a3b8",
//               border: `1px solid ${statusColor[selectedPO.status] || "#94a3b8"}30`,
//               fontSize: 13, padding: "6px 14px",
//             }}>
//               {selectedPO.status}
//             </span>
//             <button style={cs.editBtn} onClick={() => { closeDetails(); onEdit(selectedPO); }}>
//               &#9998; Edit / Details
//             </button>
//           </div>
//         </div>

//         {/* Three-column body */}
//         <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

//           {/* ── PO detail panel ── */}
//           <div style={cs.detailPanel}>
//             <div style={{ padding: "24px" }}>
//               <div style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
//                 Created: {selectedPO.date} &nbsp;&middot;&nbsp; Delivery: {selectedPO.delivery || "N/A"}
//               </div>

//               <h4 style={cs.sectionLabel}>Line Items</h4>
//               <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
//                 <thead>
//                   <tr>
//                     {["Product", "Qty", "Remarks / Specs"].map((h) => (
//                       <th key={h} style={cs.th}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedPO.items.map((it, i) => (
//                     <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fafafa" : "white" }}>
//                       <td style={{ ...cs.td, fontWeight: 600 }}>{it.product}</td>
//                       <td style={cs.td}>{it.qty}</td>
//                       <td style={{ ...cs.td, color: "#64748b" }}>{it.remarks || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>No remarks</span>}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Vendor-reply awaited notice */}
//               <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#fefce8", border: "1px solid #fde68a", borderRadius: 10, fontSize: 13, color: "#92400e" }}>
//                 <span style={{ fontSize: 18 }}>&#8987;</span>
//                 <span>Awaiting vendor reply with <strong>HSN code, unit price, confirmed qty</strong> and <strong>delivery date</strong>.</span>
//               </div>




//               {/* Order Summary */}
//               <div style={{ ...cs.summaryBox, marginTop: 20 }}>
//                 <div style={cs.summaryTitle}>Order Summary</div>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 0" }}>
//                   {[
//                     ["PO ID", selectedPO.id],
//                     ["Date", selectedPO.date],
//                     ["Delivery", selectedPO.delivery || "N/A"],
//                     ["Vendors", selectedPO.vendors.map((v) => v.name).join(", ")],
//                     ["Items", `${selectedPO.items.length} item${selectedPO.items.length !== 1 ? "s" : ""}`],
//                     ["Price", "Pending vendor reply"],
//                   ].map(([k, v]) => (
//                     <div key={k} style={{ display: "flex", gap: 6 }}>
//                       <span style={{ fontSize: 12, color: "#94a3b8", minWidth: 72 }}>{k}</span>
//                       <span style={{ fontSize: 12, fontWeight: 600, color: k === "Price" ? "#f59e0b" : "#334155" }}>{v}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── Vendor list panel ── */}
//           <div style={cs.vendorPanel}>
//             <div style={cs.vendorPanelHeader}>
//               <div style={cs.sectionLabel}>Vendors</div>
//               <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
//                 {selectedPO.vendors.length} recipient{selectedPO.vendors.length !== 1 ? "s" : ""}
//               </div>
//             </div>
//             <div style={{ padding: "10px", flex: 1, overflowY: "auto" }}>
//               {selectedPO.vendors.map((v) => {
//                 const msgs = localChats[v.id] || [];
//                 const unread = msgs.filter((m) => m.from === "vendor").length;
//                 const isActive = activeVendor?.id === v.id;
//                 return (
//                   <div
//                     key={v.id}
//                     onClick={() => setActiveVendor(v)}
//                     style={{
//                       display: "flex", alignItems: "center", gap: 10,
//                       padding: "11px 12px", borderRadius: 10, marginBottom: 6,
//                       cursor: "pointer",
//                       background: isActive ? "#eff6ff" : "white",
//                       border: isActive ? "1.5px solid #bfdbfe" : "1.5px solid #f1f5f9",
//                       transition: "all 0.15s",
//                     }}
//                   >
//                     <div style={{ ...cs.avatar, background: isActive ? "#2563eb" : "#e2e8f0", color: isActive ? "white" : "#64748b", flexShrink: 0 }}>
//                       {v.avatar}
//                     </div>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                         {v.name}
//                       </div>
//                       <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}>
//                         {msgs.length} message{msgs.length !== 1 ? "s" : ""}
//                       </div>
//                     </div>
//                     {unread > 0 && (
//                       <span style={{ background: "#2563eb", color: "white", borderRadius: 99, fontSize: 10, fontWeight: 700, padding: "2px 6px", flexShrink: 0 }}>
//                         {unread}
//                       </span>
//                     )}
//                     <span style={{ color: "#94a3b8", fontSize: 12 }}>&#8250;</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* ── Chat panel ── */}
//           <div style={cs.chatPanel}>
//             {activeVendor ? (
//               <>
//                 <div style={cs.chatHeader}>
//                   <div style={{ ...cs.avatar, background: "#2563eb", color: "white" }}>{activeVendor.avatar}</div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                       {activeVendor.name}
//                     </div>
//                     <div style={{ fontSize: 11, color: "#94a3b8" }}>PO Chat &middot; {selectedPO.id}</div>
//                   </div>
//                   <button style={{ ...cs.viewBtn, fontSize: 12, flexShrink: 0 }} onClick={() => setActiveVendor(null)}>Close</button>
//                 </div>
//                 <div style={cs.chatChipWrap}>
//                   <div style={cs.chatChip}>
//                     {selectedPO.id} &middot; {selectedPO.items.length} items
//                   </div>
//                 </div>
//                 <div style={cs.chatMessages}>
//                   {(localChats[activeVendor.id] || []).length === 0 && (
//                     <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, marginTop: 40 }}>
//                       <div style={{ fontSize: 32, marginBottom: 8 }}>&#128172;</div>
//                       Start the conversation with {activeVendor.name}
//                     </div>
//                   )}
//                   {(localChats[activeVendor.id] || []).map((msg, i) => {
//                     const isUs = msg.from === "us";
//                     return (
//                       <div key={i} style={{ display: "flex", flexDirection: isUs ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
//                         {!isUs && (
//                           <div style={{ ...cs.avatar, width: 26, height: 26, fontSize: 9, flexShrink: 0 }}>{activeVendor.avatar}</div>
//                         )}
//                         <div style={{ maxWidth: "75%" }}>
//                           <div style={{
//                             padding: "9px 13px",
//                             borderRadius: isUs ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
//                             background: isUs ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "#f1f5f9",
//                             color: isUs ? "white" : "#1e293b",
//                             fontSize: 13, lineHeight: 1.4,
//                           }}>
//                             {msg.text}
//                           </div>
//                           <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3, textAlign: isUs ? "right" : "left" }}>
//                             {msg.ts}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                   <div ref={chatEndRef} />
//                 </div>
//                 <div style={cs.chatInputRow}>
//                   <input
//                     style={cs.chatInput}
//                     placeholder={`Message ${activeVendor.name}…`}
//                     value={chatInput}
//                     onChange={(e) => setChatInput(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
//                   />
//                   <button onClick={sendMessage} style={cs.chatSendBtn}>&#8594;</button>
//                 </div>
//               </>
//             ) : (
//               <div style={cs.chatEmpty}>
//                 <div style={{ fontSize: 36, marginBottom: 12 }}>&#128172;</div>
//                 <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>Select a vendor</div>
//                 <div style={{ fontSize: 12, marginTop: 4, color: "#94a3b8" }}>Click a vendor on the left to open chat</div>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════════
// //  APP SHELL
// //  tab: "view" | "create"
// //  editPO: null (create mode) | PO object (edit mode)
// // ══════════════════════════════════════════════════════════════════════════
// export default function App() {
//   const [tab, setTab] = useState("view");
//   const [editPO, setEditPO] = useState(null);

//   const handleEdit = (po) => {
//     setEditPO(po);
//     setTab("create");
//   };

//   const handleCreated = () => {
//     setEditPO(null);
//     setTab("view");
//   };

//   const handleTabSwitch = (key) => {
//     if (key === "view") setEditPO(null);
//     setTab(key);
//   };

//   return (
//     <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

//       {/* Top nav */}
//       <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0 24px", display: "flex", alignItems: "center", height: 54, flexShrink: 0 }}>
//         <div style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginRight: 32 }}>PO Manager</div>
//         {[["view", "View POs"], ["create", editPO ? `Edit: ${editPO.id}` : "Create PO"]].map(([key, label]) => (
//           <button
//             key={key}
//             onClick={() => handleTabSwitch(key)}
//             style={{
//               padding: "0 18px", height: "100%", border: "none", background: "none",
//               cursor: "pointer", fontSize: 13, fontWeight: 700,
//               color: tab === key ? "#2563eb" : "#64748b",
//               borderBottom: tab === key ? "2.5px solid #2563eb" : "2.5px solid transparent",
//               transition: "all 0.15s",
//             }}
//           >
//             {label}
//           </button>
//         ))}
//         {editPO && (
//           <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#2563eb", fontWeight: 600 }}>
//             <span style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 20, padding: "4px 12px" }}>
//               &#9998; Editing {editPO.id}
//             </span>
//             <button
//               onClick={() => { setEditPO(null); setTab("view"); }}
//               style={{ padding: "4px 10px", background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer" }}
//             >
//               Cancel Edit
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Content area */}
//       <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
//         {tab === "view"
//           ? <ViewPOs onEdit={handleEdit} />
//           : <CreatePO onCreated={handleCreated} editPO={editPO} />
//         }
//       </div>
//     </div>
//   );
// }

// // ── Styles ─────────────────────────────────────────────────────────────────
// const cs = {
//   // CreatePO
//   createOuter: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#f8fafc" },
//   createScroll: { flex: 1, overflowY: "auto", overflowX: "hidden" },
//   pageWrap: { maxWidth: 960, margin: "0 auto", padding: 28, display: "flex", flexDirection: "column", gap: 20 },
//   pageHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 },
//   pageTitle: { fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 },
//   pageSub: { fontSize: 13, color: "#94a3b8", marginTop: 4, margin: "4px 0 0" },
//   successBanner: { display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#15803d" },
//   card: { background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", padding: 24 },
//   sectionTitle: { fontSize: 14, fontWeight: 700, color: "#334155", margin: "0 0 16px" },
//   grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 },
//   fg: { display: "flex", flexDirection: "column", gap: 6 },
//   label: { fontSize: 13, fontWeight: 600, color: "#475569" },
//   badge: { fontSize: 11, fontWeight: 700, background: "#eff6ff", color: "#2563eb", borderRadius: 99, padding: "2px 8px", marginLeft: 6 },
//   input: { padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "#fff", color: "#1e293b", outline: "none", boxSizing: "border-box", width: "100%" },
//   inputReadonly: { padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "#f8fafc", color: "#94a3b8", outline: "none", boxSizing: "border-box", width: "100%", cursor: "not-allowed" },
//   vendorPicker: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, padding: "8px 12px", border: "1.5px solid #e2e8f0", borderRadius: 10, minHeight: 44, cursor: "pointer", background: "#fff", userSelect: "none" },
//   chipRow: { display: "flex", flexWrap: "wrap", gap: 4, flex: 1 },
//   chip: { display: "inline-flex", alignItems: "center", gap: 4, background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 },
//   chipX: { background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: 14, padding: 0, lineHeight: 1, display: "flex" },
//   dropdown: { position: "absolute", top: "100%", left: 0, right: 0, background: "white", border: "1.5px solid #e2e8f0", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100, overflow: "hidden", marginTop: 4 },
//   dropSearch: { width: "100%", padding: "10px 14px", border: "none", borderBottom: "1px solid #f1f5f9", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
//   dropItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", transition: "background 0.1s" },
//   vendorPreviewRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: "10px 16px", background: "#eff6ff", borderRadius: 10, border: "1px solid #bfdbfe" },
//   vendorPill: { display: "flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #bfdbfe", borderRadius: 20, padding: "4px 10px 4px 6px", fontSize: 12, fontWeight: 600, color: "#1e293b" },
//   addBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#eff6ff", color: "#2563eb", border: "1px solid #dbeafe", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" },
//   tSel: { width: "100%", minWidth: 160, padding: "7px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#1e293b", cursor: "pointer", outline: "none" },
//   tIn: { padding: "7px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#1e293b", outline: "none", boxSizing: "border-box" },
//   removeBtn: { padding: "5px 9px", background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 7, cursor: "pointer", fontSize: 13 },
//   draftBtn: { padding: "10px 22px", background: "#f0f4fb", color: "#3b82f6", border: "1px solid #dbeafe", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" },
//   submitBtn: { padding: "10px 22px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(59,130,246,0.30)" },

//   // Shared
//   avatar: { width: 32, height: 32, borderRadius: 8, background: "#e2e8f0", color: "#64748b", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
//   th: { textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: "1px solid #f1f5f9", background: "#f8fafc", whiteSpace: "nowrap" },
//   td: { padding: "10px 14px", fontSize: 13, color: "#334155", verticalAlign: "middle" },
//   tdN: { padding: "10px 14px", fontSize: 12, color: "#94a3b8", fontWeight: 600, verticalAlign: "middle", width: 36 },
//   statusBadge: { display: "inline-flex", alignItems: "center", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
//   viewBtn: { padding: "5px 12px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" },
//   editBtn: { padding: "5px 12px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" },
//   backBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" },

//   // ViewPOs
//   viewRoot: { display: "flex", width: "100%", height: "100%", overflow: "hidden", fontFamily: "'DM Sans', system-ui, sans-serif" },
//   leftHeader: { padding: "24px 24px 16px", borderBottom: "1px solid #f1f5f9", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" },
//   leftTitle: { margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" },
//   leftSub: { margin: "4px 0 0", fontSize: 13, color: "#94a3b8" },
//   hintBadge: { fontSize: 12, fontWeight: 600, color: "#64748b", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 20, padding: "5px 14px" },

//   detailHeader: { padding: "18px 24px", borderBottom: "1px solid #f1f5f9", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: "white" },
//   detailLabel: { fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" },
//   detailTitle: { margin: "3px 0 0", fontSize: 20, fontWeight: 800, color: "#0f172a" },
//   sectionLabel: { fontSize: 12, fontWeight: 700, color: "#475569", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.06em" },
//   summaryBox: { background: "#f8fafc", borderRadius: 12, padding: "16px 20px", border: "1px solid #f1f5f9" },
//   summaryTitle: { fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 },

//   detailPanel: { flex: "1 1 auto", overflowY: "auto", background: "white", minWidth: 0, borderRight: "1px solid #e2e8f0" },
//   vendorPanel: { flex: "0 0 220px", borderRight: "1px solid #e2e8f0", overflowY: "auto", background: "#fafafa", display: "flex", flexDirection: "column" },
//   vendorPanelHeader: { padding: "20px 16px 14px", borderBottom: "1px solid #f1f5f9", flexShrink: 0 },

//   chatPanel: { flex: "0 0 320px", display: "flex", flexDirection: "column", background: "white", overflow: "hidden" },
//   chatHeader: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
//   chatChipWrap: { padding: "10px 16px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9", flexShrink: 0 },
//   chatChip: { fontSize: 11, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "6px 10px", color: "#2563eb", fontWeight: 600 },
//   chatMessages: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 },
//   chatInputRow: { padding: "12px 16px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 8, flexShrink: 0 },
//   chatInput: { flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, fontFamily: "inherit", outline: "none", minWidth: 0 },
//   chatSendBtn: { padding: "10px 14px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, flexShrink: 0 },
//   chatEmpty: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, color: "#94a3b8", textAlign: "center" },
// };




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// import { useState, useRef, useEffect } from "react";

// // ── Mock Data ──────────────────────────────────────────────────────────────
// const VENDORS = [
//   { id: 1, name: "Apex Supplies Co.", contact: "apex@supplies.com", status: "Active", avatar: "AS" },
//   { id: 2, name: "BlueStar Materials", contact: "blue@star.in", status: "Active", avatar: "BM" },
//   { id: 3, name: "CoreTech Parts", contact: "core@tech.io", status: "Active", avatar: "CP" },
//   { id: 4, name: "Delta Logistics", contact: "delta@log.net", status: "Active", avatar: "DL" },
//   { id: 5, name: "Everest Traders", contact: "ev@traders.com", status: "Active", avatar: "ET" },
// ];

// // ✅ No price field — vendor will reply with price
// const PRODUCTS = [
//   { id: 1, name: "Office Chair" },
//   { id: 2, name: "Standing Desk" },
//   { id: 3, name: 'Monitor 27"' },
//   { id: 4, name: "Mechanical Keyboard" },
//   { id: 5, name: "Ethernet Cable 10m" },
//   { id: 6, name: "UPS 1500VA" },
//   { id: 7, name: "Webcam HD" },
// ];

// // ── Base prices for dummy vendor replies ──────────────────────────────────
// const BASE_PRICES = {
//   "Office Chair": 8500,
//   "Standing Desk": 22000,
//   'Monitor 27"': 18000,
//   "Mechanical Keyboard": 4500,
//   "Ethernet Cable 10m": 350,
//   "UPS 1500VA": 12000,
//   "Webcam HD": 3200,
// };

// const fmt = (n) => `\u20b9${Number(n).toLocaleString("en-IN")}`;
// const uid = () => Math.random().toString(36).slice(2, 8).toUpperCase();
// const now = () => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

// // ── Global PO Store ────────────────────────────────────────────────────────
// let _pos = [];
// const _listeners = new Set();
// function addPo(po) { _pos = [po, ..._pos]; _listeners.forEach((fn) => fn()); }
// function updatePo(po) { _pos = _pos.map((p) => (p.id === po.id ? po : p)); _listeners.forEach((fn) => fn()); }
// function usePOStore() {
//   const [pos, setPos] = useState(_pos);
//   useEffect(() => {
//     const fn = () => setPos([..._pos]);
//     _listeners.add(fn);
//     return () => _listeners.delete(fn);
//   }, []);
//   return pos;
// }

// // ── SEED demo POs ──────────────────────────────────────────────────────────
// (function seed() {
//   if (_pos.length) return;
//   _pos = [
//     {
//       id: "PO-2026-A1B", date: "12 Jan 2026", delivery: "2026-02-01", status: "Sent",
//       vendors: [VENDORS[0], VENDORS[2]],
//       items: [
//         { product: "Office Chair", qty: 4, remarks: "Ergonomic, with lumbar support" },
//         { product: 'Monitor 27"', qty: 1, remarks: "IPS panel, 144Hz preferred" },
//       ],
//       chats: {
//         1: [
//           { from: "us", text: "Please confirm availability.", ts: "10:00 AM" },
//           { from: "vendor", text: "Yes, all items in stock!", ts: "10:45 AM" },
//         ],
//         3: [{ from: "us", text: "Can you deliver by Feb 1?", ts: "10:05 AM" }],
//       },
//     },
//     {
//       id: "PO-2026-C3D", date: "18 Jan 2026", delivery: "2026-02-15", status: "Draft",
//       vendors: [VENDORS[1]],
//       items: [{ product: "Standing Desk", qty: 2, remarks: "Height adjustable, min 70cm" }],
//       chats: { 2: [] },
//     },
//     {
//       id: "PO-2026-E5F", date: "22 Jan 2026", delivery: "2026-03-01", status: "Confirmed",
//       vendors: [VENDORS[3], VENDORS[4]],
//       items: [
//         { product: "Ethernet Cable 10m", qty: 10, remarks: "CAT6, shielded" },
//         { product: "UPS 1500VA", qty: 1, remarks: "ISI certified" },
//         { product: "Webcam HD", qty: 3, remarks: "1080p, USB-A" },
//       ],
//       chats: {
//         4: [{ from: "vendor", text: "Order confirmed. ETA March 1.", ts: "9:00 AM" }],
//         5: [],
//       },
//     },
//   ];
// })();

// // ══════════════════════════════════════════════════════════════════════════
// //  HELPER: Generate dummy vendor quote messages + compute total
// //  Each vendor gets a different price multiplier so totals differ
// // ══════════════════════════════════════════════════════════════════════════
// const VENDOR_MULTIPLIERS = {
//   1: 1.12,  // Apex Supplies Co.   — 2nd cheapest-ish (varies per PO)
//   2: 1.05,  // BlueStar Materials  — cheapest
//   3: 1.20,  // CoreTech Parts      — 3rd
//   4: 1.08,  // Delta Logistics     — depends on items
//   5: 1.25,  // Everest Traders     — most expensive
// };

// function generateVendorQuoteMessages(vendor, items) {
//   const mult = VENDOR_MULTIPLIERS[vendor.id] || 1.1;
//   // Vary per-vendor slightly using vendor id as seed offset
//   const seed = vendor.id * 37;
//   let lineItems = [];
//   let grandTotal = 0;

//   items.forEach((it) => {
//     const base = BASE_PRICES[it.product] || 1000;
//     // Small random variation per product per vendor (deterministic-ish)
//     const variation = 1 + ((seed % 7) - 3) * 0.01;
//     const unitPrice = Math.round(base * mult * variation);
//     const lineTotal = unitPrice * Number(it.qty);
//     grandTotal += lineTotal;
//     lineItems.push({ product: it.product, qty: it.qty, unitPrice, lineTotal });
//   });

//   const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   // Build a readable quote message
//   let quoteText = `Hi! Here's our quotation for ${items.map(i => i.product).join(", ")}:\n\n`;
//   lineItems.forEach((li) => {
//     quoteText += `• ${li.product} × ${li.qty} — ${fmt(li.unitPrice)}/unit = ${fmt(li.lineTotal)}\n`;
//   });
//   quoteText += `\n Grand Total: ${fmt(grandTotal)}\n Delivery: Within 7–10 working days. Please confirm to proceed!`;

//   return {
//     messages: [{ from: "vendor", text: quoteText, ts, isQuote: true }],
//     grandTotal,
//   };
// }

// // ══════════════════════════════════════════════════════════════════════════
// //  CREATE / EDIT PO
// // ══════════════════════════════════════════════════════════════════════════
// function CreatePO({ onCreated, editPO }) {
//   const isEdit = !!editPO;

//   const [selectedVendors, setSelectedVendors] = useState(isEdit ? editPO.vendors : []);
//   const [vendorSearch, setVendorSearch] = useState("");
//   const [deliveryDate, setDeliveryDate] = useState(isEdit ? (editPO.delivery || "") : "");
//   const [items, setItems] = useState(
//     isEdit
//       ? editPO.items.map((it) => ({ product: it.product, qty: it.qty, remarks: it.remarks || "" }))
//       : [{ product: "", qty: "", remarks: "" }]
//   );
//   const [submitted, setSubmitted] = useState(false);
//   const [vendorDropOpen, setVendorDropOpen] = useState(false);

//   const toggleVendor = (v) => {
//     setSelectedVendors((prev) =>
//       prev.find((x) => x.id === v.id) ? prev.filter((x) => x.id !== v.id) : [...prev, v]
//     );
//   };

//   const addItem = () => setItems([...items, { product: "", qty: "", remarks: "" }]);
//   const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
//   const updateItem = (i, field, val) => {
//     const up = [...items];
//     up[i][field] = val;
//     setItems(up);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedVendors.length || items.some((it) => !it.product || !it.qty)) return;

//     if (isEdit) {
//       const updated = {
//         ...editPO,
//         delivery: deliveryDate,
//         vendors: selectedVendors,
//         items: items.filter((it) => it.product),
//         chats: editPO.chats,
//       };
//       updatePo(updated);
//       setSubmitted(true);
//       setTimeout(() => { setSubmitted(false); if (onCreated) onCreated(); }, 1800);
//     } else {
//       const po = {
//         id: `PO-2026-${uid()}`,
//         date: now(),
//         delivery: deliveryDate,
//         status: "Sent",
//         vendors: selectedVendors,
//         items: items.filter((it) => it.product),
//         chats: Object.fromEntries(selectedVendors.map((v) => [v.id, []])),
//       };
//       addPo(po);
//       setSubmitted(true);
//       setTimeout(() => {
//         setSubmitted(false);
//         setSelectedVendors([]);
//         setItems([{ product: "", qty: "", remarks: "" }]);
//         setDeliveryDate("");
//         if (onCreated) onCreated();
//       }, 2000);
//     }
//   };

//   const filteredVendors = VENDORS.filter(
//     (v) => v.status === "Active" && v.name.toLowerCase().includes(vendorSearch.toLowerCase())
//   );

//   return (
//     <div style={cs.createOuter}>
//       <div style={cs.createScroll}>
//         <div style={cs.pageWrap}>

//           {/* ── Header ── */}
//           <div style={cs.pageHeader}>
//             <div>
//               <h1 style={cs.pageTitle}>
//                 {isEdit ? "Edit Purchase Order" : "Create Purchase Order"}
//               </h1>
//               <p style={cs.pageSub}>
//                 {isEdit
//                   ? `Editing ${editPO.id} · Originally created on ${editPO.date}`
//                   : "Send a PO to vendors — they will reply with HSN code, price & delivery date"}
//               </p>
//             </div>
//             {isEdit && (
//               <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#2563eb" }}>
//                 &#9998; Editing: {editPO.id}
//               </div>
//             )}
//           </div>

//           {/* ✅ Info banner */}
//           <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, fontSize: 13, color: "#1d4ed8" }}>
//             <span style={{ fontSize: 18, flexShrink: 0 }}>&#8505;</span>
//             <span>
//               Fill in <strong>product name</strong>, <strong>quantity</strong> and <strong>remarks / specifications</strong> only.
//               The vendor will reply back with <strong>HSN code, unit price, confirmed quantity</strong> and <strong>delivery date</strong>.
//             </span>
//           </div>

//           {submitted && (
//             <div style={cs.successBanner}>
//               <span style={{ fontSize: 20 }}>&#10003;</span>
//               {isEdit
//                 ? `Purchase Order ${editPO.id} updated successfully!`
//                 : `Purchase Order created & dispatched to ${selectedVendors.length} vendor${selectedVendors.length > 1 ? "s" : ""}!`}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

//             {/* ── Order Details card ── */}
//             <div style={cs.card}>
//               <h3 style={cs.sectionTitle}>Order Details</h3>
//               <div style={cs.grid3}>

//                 <div style={cs.fg}>
//                   <label style={cs.label}>PO Number</label>
//                   <input
//                     style={cs.inputReadonly}
//                     readOnly
//                     value={isEdit ? editPO.id : `PO-2026-${String(Date.now()).slice(-4)}`}
//                   />
//                 </div>

//                 <div style={{ ...cs.fg, gridColumn: "span 1", position: "relative" }}>
//                   <label style={cs.label}>
//                     Vendors <span style={cs.badge}>{selectedVendors.length} selected</span>
//                   </label>
//                   <div style={cs.vendorPicker} onClick={() => setVendorDropOpen((o) => !o)}>
//                     {selectedVendors.length === 0 ? (
//                       <span style={{ color: "#94a3b8" }}>Select vendors…</span>
//                     ) : (
//                       <div style={cs.chipRow}>
//                         {selectedVendors.map((v) => (
//                           <span key={v.id} style={cs.chip}>
//                             {v.name}
//                             <button
//                               type="button"
//                               onClick={(e) => { e.stopPropagation(); toggleVendor(v); }}
//                               style={cs.chipX}
//                             >
//                               &#215;
//                             </button>
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                     <span style={{ color: "#94a3b8", marginLeft: "auto", fontSize: 12, flexShrink: 0 }}>&#9660;</span>
//                   </div>
//                   {vendorDropOpen && (
//                     <div style={cs.dropdown}>
//                       <input
//                         style={cs.dropSearch}
//                         placeholder="Search vendors…"
//                         value={vendorSearch}
//                         onChange={(e) => setVendorSearch(e.target.value)}
//                         onClick={(e) => e.stopPropagation()}
//                         autoFocus
//                       />
//                       {filteredVendors.map((v) => {
//                         const sel = !!selectedVendors.find((x) => x.id === v.id);
//                         return (
//                           <div
//                             key={v.id}
//                             style={{ ...cs.dropItem, background: sel ? "#eff6ff" : "white" }}
//                             onClick={(e) => { e.stopPropagation(); toggleVendor(v); }}
//                           >
//                             <div style={{ ...cs.avatar, background: sel ? "#2563eb" : "#e2e8f0", color: sel ? "white" : "#64748b" }}>
//                               {v.avatar}
//                             </div>
//                             <div>
//                               <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{v.name}</div>
//                               <div style={{ fontSize: 11, color: "#94a3b8" }}>{v.contact}</div>
//                             </div>
//                             {sel && <span style={{ marginLeft: "auto", color: "#2563eb", fontSize: 16 }}>&#10003;</span>}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>

//                 <div style={cs.fg}>
//                   <label style={cs.label}>Expected Delivery</label>
//                   <input
//                     style={cs.input}
//                     type="date"
//                     value={deliveryDate}
//                     onChange={(e) => setDeliveryDate(e.target.value)}
//                     required
//                   />
//                 </div>

//               </div>
//             </div>

//             {selectedVendors.length > 0 && (
//               <div style={cs.vendorPreviewRow}>
//                 <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>PO will be sent to:</span>
//                 {selectedVendors.map((v) => (
//                   <div key={v.id} style={cs.vendorPill}>
//                     <div style={{ ...cs.avatar, width: 22, height: 22, fontSize: 9 }}>{v.avatar}</div>
//                     {v.name}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* ── Line Items card ── */}
//             <div style={cs.card}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
//                 <h3 style={{ ...cs.sectionTitle, margin: 0 }}>Line Items</h3>
//                 <button type="button" style={cs.addBtn} onClick={addItem}>+ Add Item</button>
//               </div>
//               <div style={{ overflowX: "auto" }}>
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     <tr>
//                       {["#", "Product", "Qty", "Remarks / Specs", ""].map((h, i) => (
//                         <th key={i} style={cs.th}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {items.map((it, i) => (
//                       <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "white" }}>
//                         <td style={cs.tdN}>{i + 1}</td>
//                         <td style={cs.td}>
//                           <select
//                             style={cs.tSel}
//                             value={it.product}
//                             onChange={(e) => updateItem(i, "product", e.target.value)}
//                           >
//                             <option value="">Select…</option>
//                             {PRODUCTS.map((p) => (
//                               <option key={p.id} value={p.name}>{p.name}</option>
//                             ))}
//                           </select>
//                         </td>
//                         <td style={cs.td}>
//                           <input
//                             style={{ ...cs.tIn, width: 80 }}
//                             type="number"
//                             value={it.qty}
//                             onChange={(e) => updateItem(i, "qty", e.target.value)}
//                             placeholder="0"
//                             min="0"
//                           />
//                         </td>
//                         <td style={cs.td}>
//                           <input
//                             style={{ ...cs.tIn, width: 280 }}
//                             type="text"
//                             value={it.remarks || ""}
//                             onChange={(e) => updateItem(i, "remarks", e.target.value)}
//                             placeholder="e.g. ISI mark, CAT6, brand specs…"
//                           />
//                         </td>
//                         <td style={cs.td}>
//                           {items.length > 1 && (
//                             <button type="button" style={cs.removeBtn} onClick={() => removeItem(i)}>
//                               &#128465;
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* ── Footer buttons ── */}
//             <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingBottom: 24, paddingTop: 4 }}>
//               <button type="button" style={cs.draftBtn} onClick={() => onCreated && onCreated()}>
//                 {isEdit ? "Discard Changes" : "Save as Draft"}
//               </button>
//               <button type="submit" style={cs.submitBtn}>
//                 {isEdit
//                   ? "Update PO"
//                   : `Send to ${selectedVendors.length || "…"} Vendor${selectedVendors.length !== 1 ? "s" : ""}`}
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// // ══════════════════════════════════════════════════════════════════════════
// //  VIEW POs
// // ══════════════════════════════════════════════════════════════════════════
// function ViewPOs({ onEdit }) {
//   const pos = usePOStore();
//   const [selectedPO, setSelectedPO] = useState(null);
//   const [activeVendor, setActiveVendor] = useState(null);
//   const [chatInput, setChatInput] = useState("");
//   const [localChats, setLocalChats] = useState({});
//   // NEW: store vendor quote totals keyed by vendorId, per PO session
//   const [vendorTotals, setVendorTotals] = useState({});
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeVendor, localChats]);

//   const openDetails = (po) => {
//     setSelectedPO(po);
//     setActiveVendor(null);

//     // Start with existing chats
//     const baseChats = { ...(po.chats || {}) };
//     const totals = {};

//     // For each vendor, if their chat has no quote message yet, generate one after a delay
//     // We'll store pre-generated quotes immediately but "reveal" them via state updates
//     const initialChats = { ...baseChats };
//     const initialTotals = {};

//     po.vendors.forEach((v) => {
//       const { messages, grandTotal } = generateVendorQuoteMessages(v, po.items);
//       // Check if vendor already has a quote in existing chats
//       const existingMsgs = baseChats[v.id] || [];
//       const hasQuote = existingMsgs.some((m) => m.isQuote);
//       if (!hasQuote) {
//         // Will append quote messages
//         initialChats[v.id] = existingMsgs; // start without quote
//       }
//       initialTotals[v.id] = grandTotal;
//     });

//     setLocalChats(initialChats);
//     setVendorTotals(initialTotals);

//     // Stagger vendor quote replies: each vendor replies one after the other
//     // Sort vendors by their grand total ascending so the cheapest replies last (arrives last but sorted in UI)
//     const vendorsSortedByTotal = [...po.vendors].sort(
//       (a, b) => (initialTotals[a.id] || 0) - (initialTotals[b.id] || 0)
//     );

//     vendorsSortedByTotal.forEach((v, idx) => {
//       const { messages } = generateVendorQuoteMessages(v, po.items);
//       const existingMsgs = baseChats[v.id] || [];
//       const hasQuote = existingMsgs.some((m) => m.isQuote);
//       if (!hasQuote) {
//         // Delay: cheapest vendor replies last (so they "arrive" in order expensive→cheap)
//         // But we want ascending display — vendor list sorts by total, not by arrival time
//         const delay = (idx + 1) * 1400;
//         setTimeout(() => {
//           setLocalChats((prev) => ({
//             ...prev,
//             [v.id]: [...(prev[v.id] || []), ...messages],
//           }));
//         }, delay);
//       }
//     });
//   };

//   const closeDetails = () => {
//     setSelectedPO(null);
//     setActiveVendor(null);
//     setVendorTotals({});
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
//             ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
//               ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

//   // ── TABLE VIEW ───────────────────────────────────────────────────────────
//   if (!selectedPO) {
//     return (
//       <div style={cs.viewRoot}>
//         <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#fff" }}>

//           <div style={cs.leftHeader}>
//             <div>
//               <h1 style={cs.leftTitle}>Purchase Orders</h1>
//               <p style={cs.leftSub}>{pos.length} orders total</p>
//             </div>
//             <div style={cs.hintBadge}>Click View to see full details</div>
//           </div>

//           <div style={{ overflowY: "auto", overflowX: "auto", flex: 1 }}>
//             <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
//               <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
//                 <tr>
//                   {["PO ID", "Date", "Vendors", "Status", "Items", "Actions"].map((h) => (
//                     <th key={h} style={cs.th}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {pos.map((po) => (
//                   <tr
//                     key={po.id}
//                     style={{ background: "white", borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
//                     onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
//                     onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
//                   >
//                     <td style={{ ...cs.td, fontWeight: 700, color: "#2563eb", fontSize: 12 }}>{po.id}</td>
//                     <td style={{ ...cs.td, fontSize: 12, color: "#64748b" }}>{po.date}</td>
//                     <td style={cs.td}>
//                       <div style={{ display: "flex", gap: 4 }}>
//                         {po.vendors.slice(0, 2).map((v) => (
//                           <span key={v.id} style={{ ...cs.avatar, width: 24, height: 24, fontSize: 9 }}>{v.avatar}</span>
//                         ))}
//                         {po.vendors.length > 2 && (
//                           <span style={{ fontSize: 11, color: "#64748b", alignSelf: "center" }}>+{po.vendors.length - 2}</span>
//                         )}
//                       </div>
//                     </td>
//                     <td style={cs.td}>
//                       <span style={{
//                         ...cs.statusBadge,
//                         background: (statusColor[po.status] || "#94a3b8") + "18",
//                         color: statusColor[po.status] || "#94a3b8",
//                         border: `1px solid ${statusColor[po.status] || "#94a3b8"}30`,
//                       }}>
//                         {po.status}
//                       </span>
//                     </td>
//                     <td style={{ ...cs.td, fontSize: 12, color: "#475569" }}>
//                       {po.items.length} item{po.items.length !== 1 ? "s" : ""}
//                     </td>
//                     <td style={cs.td} onClick={(e) => e.stopPropagation()}>
//                       <div style={{ display: "flex", gap: 6 }}>
//                         <button style={cs.viewBtn} onClick={() => openDetails(po)}>
//                           View
//                         </button>
//                         <button style={cs.editBtn} onClick={() => onEdit(po)}>
//                            Edit / Details
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── DETAIL VIEW ──────────────────────────────────────────────────────────
//   // NEW: Sort vendors ascending by their quoted grand total (cheapest first = best deal)
//   const sortedVendors = [...selectedPO.vendors].sort(
//     (a, b) => (vendorTotals[a.id] || Infinity) - (vendorTotals[b.id] || Infinity)
//   );

//   return (
//     <div style={{ ...cs.viewRoot, background: "#f8fafc" }}>
//       <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

//         {/* Detail header */}
//         <div style={cs.detailHeader}>
//           <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//             <button style={cs.backBtn} onClick={closeDetails}>
//               &#8592; Back to List
//             </button>
//             <div style={{ width: 1, height: 28, background: "#e2e8f0" }} />
//             <div>
//               <div style={cs.detailLabel}>Purchase Order</div>
//               <h2 style={cs.detailTitle}>{selectedPO.id}</h2>
//             </div>
//           </div>
//           <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
//             <span style={{
//               ...cs.statusBadge,
//               background: (statusColor[selectedPO.status] || "#94a3b8") + "18",
//               color: statusColor[selectedPO.status] || "#94a3b8",
//               border: `1px solid ${statusColor[selectedPO.status] || "#94a3b8"}30`,
//               fontSize: 13, padding: "6px 14px",
//             }}>
//               {selectedPO.status}
//             </span>
//             <button style={cs.editBtn} onClick={() => { closeDetails(); onEdit(selectedPO); }}>
//               &#9998; Edit / Details
//             </button>
//           </div>
//         </div>

//         {/* Three-column body */}
//         <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

//           {/* ── PO detail panel ── */}
//           <div style={cs.detailPanel}>
//             <div style={{ padding: "24px" }}>
//               <div style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
//                 Created: {selectedPO.date} &nbsp;&middot;&nbsp; Delivery: {selectedPO.delivery || "N/A"}
//               </div>

//               <h4 style={cs.sectionLabel}>Line Items</h4>
//               <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
//                 <thead>
//                   <tr>
//                     {["Product", "Qty", "Remarks / Specs"].map((h) => (
//                       <th key={h} style={cs.th}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedPO.items.map((it, i) => (
//                     <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fafafa" : "white" }}>
//                       <td style={{ ...cs.td, fontWeight: 600 }}>{it.product}</td>
//                       <td style={cs.td}>{it.qty}</td>
//                       <td style={{ ...cs.td, color: "#64748b" }}>{it.remarks || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>No remarks</span>}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Vendor-reply awaited notice */}
//               <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#fefce8", border: "1px solid #fde68a", borderRadius: 10, fontSize: 13, color: "#92400e" }}>
//                 <span style={{ fontSize: 18 }}>&#8987;</span>
//                 <span>Awaiting vendor reply with <strong>HSN code, unit price, confirmed qty</strong> and <strong>delivery date</strong>.</span>
//               </div>

//               {/* Order Summary */}
//               <div style={{ ...cs.summaryBox, marginTop: 20 }}>
//                 <div style={cs.summaryTitle}>Order Summary</div>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 0" }}>
//                   {[
//                     ["PO ID", selectedPO.id],
//                     ["Date", selectedPO.date],
//                     ["Delivery", selectedPO.delivery || "N/A"],
//                     ["Vendors", selectedPO.vendors.map((v) => v.name).join(", ")],
//                     ["Items", `${selectedPO.items.length} item${selectedPO.items.length !== 1 ? "s" : ""}`],
//                     ["Price", "Pending vendor reply"],
//                   ].map(([k, v]) => (
//                     <div key={k} style={{ display: "flex", gap: 6 }}>
//                       <span style={{ fontSize: 12, color: "#94a3b8", minWidth: 72 }}>{k}</span>
//                       <span style={{ fontSize: 12, fontWeight: 600, color: k === "Price" ? "#f59e0b" : "#334155" }}>{v}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── Vendor list panel — sorted ascending by quoted total ── */}
//           <div style={cs.vendorPanel}>
//             <div style={cs.vendorPanelHeader}>
//               <div style={cs.sectionLabel}>Vendors</div>
//               <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
//                 {selectedPO.vendors.length} recipient{selectedPO.vendors.length !== 1 ? "s" : ""} · sorted by price ↑
//               </div>
//             </div>


//             <div style={{ padding: "10px", flex: 1, overflowY: "auto" }}>
//               {sortedVendors.map((v, idx) => {
//                 const msgs = localChats[v.id] || [];
//                 const unread = msgs.filter((m) => m.from === "vendor").length;
//                 const isActive = activeVendor?.id === v.id;
//                 const total = vendorTotals[v.id];
//                 const hasReplied = msgs.some((m) => m.isQuote);
//                 const isBest = idx === 0 && hasReplied;

//                 return (
//                   <div
//                     key={v.id}
//                     onClick={() => setActiveVendor(v)}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 10,
//                       padding: "11px 12px",
//                       borderRadius: 10,
//                       marginBottom: 6,
//                       cursor: "pointer",
//                       background: isBest
//                         ? (isActive ? "#f0fdf4" : "#f0fdf4")
//                         : (isActive ? "#eff6ff" : "white"),
//                       border: isBest
//                         ? `1.5px solid ${isActive ? "#86efac" : "#bbf7d0"}`
//                         : (isActive ? "1.5px solid #bfdbfe" : "1.5px solid #f1f5f9"),
//                       transition: "all 0.15s",
//                       position: "relative",
//                     }}
//                   >
//                     {/* Rank badge */}
//                     <div style={{
//                       position: "absolute",
//                       top: -7,
//                       left: 10,
//                       fontSize: 9,
//                       fontWeight: 800,
//                       background: isBest ? "#16a34a" : (idx === 1 ? "#2563eb" : "#94a3b8"),
//                       color: "white",
//                       borderRadius: 99,
//                       padding: "1px 6px",
//                       letterSpacing: "0.04em",
//                     }}>
//                       {isBest ? "BEST" : `#${idx + 1}`}
//                     </div>

//                     <div style={{
//                       ...cs.avatar,
//                       background: isBest ? "#16a34a" : (isActive ? "#2563eb" : "#e2e8f0"),
//                       color: (isBest || isActive) ? "white" : "#64748b",
//                       flexShrink: 0,
//                     }}>
//                       {v.avatar}
//                     </div>

//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                         {v.name}
//                       </div>
//                       {/* Show quoted total if vendor has replied */}
//                       {hasReplied && total ? (
//                         <div style={{ fontSize: 11, color: isBest ? "#16a34a" : "#64748b", fontWeight: 700, marginTop: 1 }}>
//                           {fmt(total)}
//                         </div>
//                       ) : (
//                         <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1, fontStyle: "italic" }}>
//                           {msgs.length > 0 ? `${msgs.length} msg` : "Awaiting reply…"}
//                         </div>
//                       )}
//                     </div>

//                     {unread > 0 && (
//                       <span style={{ background: isBest ? "#16a34a" : "#2563eb", color: "white", borderRadius: 99, fontSize: 10, fontWeight: 700, padding: "2px 6px", flexShrink: 0 }}>
//                         {unread}
//                       </span>
//                     )}
//                     <span style={{ color: "#94a3b8", fontSize: 12 }}>&#8250;</span>
//                   </div>
//                 );
//               })}
//             </div>


//           </div>



//           {/* ── Chat panel ── */}
//           <div style={cs.chatPanel}>
//             {activeVendor ? (
//               <>
//                 <div style={cs.chatHeader}>
//                   <div style={{ ...cs.avatar, background: "#2563eb", color: "white" }}>{activeVendor.avatar}</div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                       {activeVendor.name}
//                     </div>
//                     <div style={{ fontSize: 11, color: "#94a3b8" }}>PO Chat &middot; {selectedPO.id}</div>
//                   </div>
//                   <button style={{ ...cs.viewBtn, fontSize: 12, flexShrink: 0 }} onClick={() => setActiveVendor(null)}>Close</button>
//                 </div>
//                 <div style={cs.chatChipWrap}>
//                   <div style={cs.chatChip}>
//                     {selectedPO.id} &middot; {selectedPO.items.length} items
//                   </div>
//                 </div>
//                 <div style={cs.chatMessages}>
//                   {(localChats[activeVendor.id] || []).length === 0 && (
//                     <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, marginTop: 40 }}>
//                       <div style={{ fontSize: 32, marginBottom: 8 }}>&#128172;</div>
//                       Start the conversation with {activeVendor.name}
//                     </div>
//                   )}
//                   {(localChats[activeVendor.id] || []).map((msg, i) => {
//                     const isUs = msg.from === "us";
//                     return (
//                       <div key={i} style={{ display: "flex", flexDirection: isUs ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
//                         {!isUs && (
//                           <div style={{ ...cs.avatar, width: 26, height: 26, fontSize: 9, flexShrink: 0 }}>{activeVendor.avatar}</div>
//                         )}
//                         <div style={{ maxWidth: "80%" }}>
//                           <div style={{
//                             padding: "9px 13px",
//                             borderRadius: isUs ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
//                             background: msg.isQuote
//                               ? "linear-gradient(135deg, #f0fdf4, #dcfce7)"
//                               : (isUs ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "#f1f5f9"),
//                             color: isUs ? "white" : "#1e293b",
//                             fontSize: msg.isQuote ? 12 : 13,
//                             lineHeight: 1.6,
//                             border: msg.isQuote ? "1px solid #86efac" : "none",
//                             whiteSpace: "pre-wrap",
//                           }}>
//                             {msg.text}
//                           </div>
//                           <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3, textAlign: isUs ? "right" : "left" }}>
//                             {msg.ts}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                   <div ref={chatEndRef} />
//                 </div>
//                 <div style={cs.chatInputRow}>
//                   <input
//                     style={cs.chatInput}
//                     placeholder={`Message ${activeVendor.name}…`}
//                     value={chatInput}
//                     onChange={(e) => setChatInput(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
//                   />
//                   <button onClick={sendMessage} style={cs.chatSendBtn}>&#8594;</button>
//                 </div>
//               </>
//             ) : (
//               <div style={cs.chatEmpty}>
//                 <div style={{ fontSize: 36, marginBottom: 12 }}>&#128172;</div>
//                 <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>Select a vendor</div>
//                 <div style={{ fontSize: 12, marginTop: 4, color: "#94a3b8" }}>Click a vendor on the left to open chat</div>
//               </div>
//             )}
//           </div>



//         </div>
//       </div>
//     </div>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════════
// //  APP SHELL
// // ══════════════════════════════════════════════════════════════════════════
// export default function App() {
//   const [tab, setTab] = useState("view");
//   const [editPO, setEditPO] = useState(null);

//   const handleEdit = (po) => {
//     setEditPO(po);
//     setTab("create");
//   };

//   const handleCreated = () => {
//     setEditPO(null);
//     setTab("view");
//   };

//   const handleTabSwitch = (key) => {
//     if (key === "view") setEditPO(null);
//     setTab(key);
//   };

//   return (
//     <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

//       {/* Top nav */}
//       <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0 24px", display: "flex", alignItems: "center", height: 54, flexShrink: 0 }}>
//         <div style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginRight: 32 }}>PO Manager</div>
//         {[["view", "View POs"], ["create", editPO ? `Edit: ${editPO.id}` : "Create PO"]].map(([key, label]) => (
//           <button
//             key={key}
//             onClick={() => handleTabSwitch(key)}
//             style={{
//               padding: "0 18px", height: "100%", border: "none", background: "none",
//               cursor: "pointer", fontSize: 13, fontWeight: 700,
//               color: tab === key ? "#2563eb" : "#64748b",
//               borderBottom: tab === key ? "2.5px solid #2563eb" : "2.5px solid transparent",
//               transition: "all 0.15s",
//             }}
//           >
//             {label}
//           </button>
//         ))}
//         {editPO && (
//           <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#2563eb", fontWeight: 600 }}>
//             <span style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 20, padding: "4px 12px" }}>
//               &#9998; Editing {editPO.id}
//             </span>
//             <button
//               onClick={() => { setEditPO(null); setTab("view"); }}
//               style={{ padding: "4px 10px", background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer" }}
//             >
//               Cancel Edit
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Content area */}
//       <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
//         {tab === "view"
//           ? <ViewPOs onEdit={handleEdit} />
//           : <CreatePO onCreated={handleCreated} editPO={editPO} />
//         }
//       </div>
//     </div>
//   );
// }

// // ── Styles ─────────────────────────────────────────────────────────────────
// const cs = {
//   createOuter: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#f8fafc" },
//   createScroll: { flex: 1, overflowY: "auto", overflowX: "hidden" },
//   pageWrap: { maxWidth: 960, margin: "0 auto", padding: 28, display: "flex", flexDirection: "column", gap: 20 },
//   pageHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 },
//   pageTitle: { fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 },
//   pageSub: { fontSize: 13, color: "#94a3b8", marginTop: 4, margin: "4px 0 0" },
//   successBanner: { display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#15803d" },
//   card: { background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", padding: 24 },
//   sectionTitle: { fontSize: 14, fontWeight: 700, color: "#334155", margin: "0 0 16px" },
//   grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 },
//   fg: { display: "flex", flexDirection: "column", gap: 6 },
//   label: { fontSize: 13, fontWeight: 600, color: "#475569" },
//   badge: { fontSize: 11, fontWeight: 700, background: "#eff6ff", color: "#2563eb", borderRadius: 99, padding: "2px 8px", marginLeft: 6 },
//   input: { padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "#fff", color: "#1e293b", outline: "none", boxSizing: "border-box", width: "100%" },
//   inputReadonly: { padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "#f8fafc", color: "#94a3b8", outline: "none", boxSizing: "border-box", width: "100%", cursor: "not-allowed" },
//   vendorPicker: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, padding: "8px 12px", border: "1.5px solid #e2e8f0", borderRadius: 10, minHeight: 44, cursor: "pointer", background: "#fff", userSelect: "none" },
//   chipRow: { display: "flex", flexWrap: "wrap", gap: 4, flex: 1 },
//   chip: { display: "inline-flex", alignItems: "center", gap: 4, background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 },
//   chipX: { background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: 14, padding: 0, lineHeight: 1, display: "flex" },
//   dropdown: { position: "absolute", top: "100%", left: 0, right: 0, background: "white", border: "1.5px solid #e2e8f0", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100, overflow: "hidden", marginTop: 4 },
//   dropSearch: { width: "100%", padding: "10px 14px", border: "none", borderBottom: "1px solid #f1f5f9", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
//   dropItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", transition: "background 0.1s" },
//   vendorPreviewRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: "10px 16px", background: "#eff6ff", borderRadius: 10, border: "1px solid #bfdbfe" },
//   vendorPill: { display: "flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #bfdbfe", borderRadius: 20, padding: "4px 10px 4px 6px", fontSize: 12, fontWeight: 600, color: "#1e293b" },
//   addBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#eff6ff", color: "#2563eb", border: "1px solid #dbeafe", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" },
//   tSel: { width: "100%", minWidth: 160, padding: "7px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#1e293b", cursor: "pointer", outline: "none" },
//   tIn: { padding: "7px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#1e293b", outline: "none", boxSizing: "border-box" },
//   removeBtn: { padding: "5px 9px", background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 7, cursor: "pointer", fontSize: 13 },
//   draftBtn: { padding: "10px 22px", background: "#f0f4fb", color: "#3b82f6", border: "1px solid #dbeafe", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" },
//   submitBtn: { padding: "10px 22px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(59,130,246,0.30)" },

//   // Shared
//   avatar: { width: 32, height: 32, borderRadius: 8, background: "#e2e8f0", color: "#64748b", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
//   th: { textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: "1px solid #f1f5f9", background: "#f8fafc", whiteSpace: "nowrap" },
//   td: { padding: "10px 14px", fontSize: 13, color: "#334155", verticalAlign: "middle" },
//   tdN: { padding: "10px 14px", fontSize: 12, color: "#94a3b8", fontWeight: 600, verticalAlign: "middle", width: 36 },
//   statusBadge: { display: "inline-flex", alignItems: "center", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
//   viewBtn: { padding: "5px 12px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" },
//   editBtn: { padding: "5px 12px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" },
//   backBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" },

//   // ViewPOs
//   viewRoot: { display: "flex", width: "100%", height: "100%", overflow: "hidden", fontFamily: "'DM Sans', system-ui, sans-serif" },
//   leftHeader: { padding: "24px 24px 16px", borderBottom: "1px solid #f1f5f9", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" },
//   leftTitle: { margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" },
//   leftSub: { margin: "4px 0 0", fontSize: 13, color: "#94a3b8" },
//   hintBadge: { fontSize: 12, fontWeight: 600, color: "#64748b", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 20, padding: "5px 14px" },

//   detailHeader: { padding: "18px 24px", borderBottom: "1px solid #f1f5f9", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: "white" },
//   detailLabel: { fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" },
//   detailTitle: { margin: "3px 0 0", fontSize: 20, fontWeight: 800, color: "#0f172a" },
//   sectionLabel: { fontSize: 12, fontWeight: 700, color: "#475569", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.06em" },
//   summaryBox: { background: "#f8fafc", borderRadius: 12, padding: "16px 20px", border: "1px solid #f1f5f9" },
//   summaryTitle: { fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 },

//   detailPanel: { flex: "1 1 auto", overflowY: "auto", background: "white", minWidth: 0, borderRight: "1px solid #e2e8f0" },
//   vendorPanel: { flex: "0 0 220px", borderRight: "1px solid #e2e8f0", overflowY: "auto", background: "#fafafa", display: "flex", flexDirection: "column" },
//   vendorPanelHeader: { padding: "20px 16px 14px", borderBottom: "1px solid #f1f5f9", flexShrink: 0 },

//   chatPanel: { flex: "0 0 320px", display: "flex", flexDirection: "column", background: "white", overflow: "hidden" },
//   chatHeader: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
//   chatChipWrap: { padding: "10px 16px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9", flexShrink: 0 },
//   chatChip: { fontSize: 11, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "6px 10px", color: "#2563eb", fontWeight: 600 },
//   chatMessages: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 },
//   chatInputRow: { padding: "12px 16px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 8, flexShrink: 0 },
//   chatInput: { flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, fontFamily: "inherit", outline: "none", minWidth: 0 },
//   chatSendBtn: { padding: "10px 14px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, flexShrink: 0 },
//   chatEmpty: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, color: "#94a3b8", textAlign: "center" },
// };





























import { useState, useRef, useEffect } from "react";

// ── Mock Data ──────────────────────────────────────────────────────────────
const VENDORS = [
  { id: 1, name: "Apex Supplies Co.", contact: "apex@supplies.com", status: "Active", avatar: "AS" },
  { id: 2, name: "BlueStar Materials", contact: "blue@star.in", status: "Active", avatar: "BM" },
  { id: 3, name: "CoreTech Parts", contact: "core@tech.io", status: "Active", avatar: "CP" },
  { id: 4, name: "Delta Logistics", contact: "delta@log.net", status: "Active", avatar: "DL" },
  { id: 5, name: "Everest Traders", contact: "ev@traders.com", status: "Active", avatar: "ET" },
];

// ✅ No price field — vendor will reply with price
const PRODUCTS = [
  { id: 1, name: "Office Chair" },
  { id: 2, name: "Standing Desk" },
  { id: 3, name: 'Monitor 27"' },
  { id: 4, name: "Mechanical Keyboard" },
  { id: 5, name: "Ethernet Cable 10m" },
  { id: 6, name: "UPS 1500VA" },
  { id: 7, name: "Webcam HD" },
];

// ── Base prices for dummy vendor replies ──────────────────────────────────
const BASE_PRICES = {
  "Office Chair": 8500,
  "Standing Desk": 22000,
  'Monitor 27"': 18000,
  "Mechanical Keyboard": 4500,
  "Ethernet Cable 10m": 350,
  "UPS 1500VA": 12000,
  "Webcam HD": 3200,
};

// ── Manufacturer names per vendor per product ─────────────────────────────
// Each vendor sources from different manufacturers, giving unique options
const VENDOR_MANUFACTURERS = {
  1: { // Apex Supplies Co.
    "Office Chair":       "ErgoMax India",
    "Standing Desk":      "FlexiDesk Pro",
    'Monitor 27"':        "ViewSonic",
    "Mechanical Keyboard":"Zebronics",
    "Ethernet Cable 10m": "D-Link",
    "UPS 1500VA":         "APC by Schneider",
    "Webcam HD":          "Logitech",
  },
  2: { // BlueStar Materials
    "Office Chair":       "Featherlite",
    "Standing Desk":      "Godrej Interio",
    'Monitor 27"':        "BenQ",
    "Mechanical Keyboard":"Keychron",
    "Ethernet Cable 10m": "Belkin",
    "UPS 1500VA":         "Luminous",
    "Webcam HD":          "HP",
  },
  3: { // CoreTech Parts
    "Office Chair":       "Durian Furniture",
    "Standing Desk":      "Spacewood",
    'Monitor 27"':        "LG Electronics",
    "Mechanical Keyboard":"Corsair",
    "Ethernet Cable 10m": "TP-Link",
    "UPS 1500VA":         "Microtek",
    "Webcam HD":          "Zebronics",
  },
  4: { // Delta Logistics
    "Office Chair":       "Nilkamal",
    "Standing Desk":      "Wakefit",
    'Monitor 27"':        "Samsung",
    "Mechanical Keyboard":"HyperX",
    "Ethernet Cable 10m": "Syska",
    "UPS 1500VA":         "Su-Kam",
    "Webcam HD":          "Intex",
  },
  5: { // Everest Traders
    "Office Chair":       "Herman Miller",
    "Standing Desk":      "IKEA",
    'Monitor 27"':        "Dell",
    "Mechanical Keyboard":"Das Keyboard",
    "Ethernet Cable 10m": "Schneider Electric",
    "UPS 1500VA":         "Eaton",
    "Webcam HD":          "Microsoft",
  },
};

const fmt = (n) => `\u20b9${Number(n).toLocaleString("en-IN")}`;
const uid = () => Math.random().toString(36).slice(2, 8).toUpperCase();
const now = () => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

// ── Global PO Store ────────────────────────────────────────────────────────
let _pos = [];
const _listeners = new Set();
function addPo(po) { _pos = [po, ..._pos]; _listeners.forEach((fn) => fn()); }
function updatePo(po) { _pos = _pos.map((p) => (p.id === po.id ? po : p)); _listeners.forEach((fn) => fn()); }
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
      vendors: [VENDORS[0], VENDORS[2]],
      items: [
        { product: "Office Chair", qty: 4, remarks: "Ergonomic, with lumbar support" },
        { product: 'Monitor 27"', qty: 1, remarks: "IPS panel, 144Hz preferred" },
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
      vendors: [VENDORS[1]],
      items: [{ product: "Standing Desk", qty: 2, remarks: "Height adjustable, min 70cm" }],
      chats: { 2: [] },
    },
    {
      id: "PO-2026-E5F", date: "22 Jan 2026", delivery: "2026-03-01", status: "Confirmed",
      vendors: [VENDORS[3], VENDORS[4]],
      items: [
        { product: "Ethernet Cable 10m", qty: 10, remarks: "CAT6, shielded" },
        { product: "UPS 1500VA", qty: 1, remarks: "ISI certified" },
        { product: "Webcam HD", qty: 3, remarks: "1080p, USB-A" },
      ],
      chats: {
        4: [{ from: "vendor", text: "Order confirmed. ETA March 1.", ts: "9:00 AM" }],
        5: [],
      },
    },
  ];
})();

// ══════════════════════════════════════════════════════════════════════════
//  HELPER: Generate dummy vendor quote messages + compute total
//  Each vendor gets a different price multiplier so totals differ
// ══════════════════════════════════════════════════════════════════════════
const VENDOR_MULTIPLIERS = {
  1: 1.12,  // Apex Supplies Co.   — 2nd cheapest-ish (varies per PO)
  2: 1.05,  // BlueStar Materials  — cheapest
  3: 1.20,  // CoreTech Parts      — 3rd
  4: 1.08,  // Delta Logistics     — depends on items
  5: 1.25,  // Everest Traders     — most expensive
};

function generateVendorQuoteMessages(vendor, items) {
  const mult = VENDOR_MULTIPLIERS[vendor.id] || 1.1;
  const seed = vendor.id * 37;
  let lineItems = [];
  let grandTotal = 0;
  const mfgMap = VENDOR_MANUFACTURERS[vendor.id] || {};
  const manufacturersList = [];

  items.forEach((it) => {
    const base = BASE_PRICES[it.product] || 1000;
    const variation = 1 + ((seed % 7) - 3) * 0.01;
    const unitPrice = Math.round(base * mult * variation);
    const lineTotal = unitPrice * Number(it.qty);
    const mfg = mfgMap[it.product] || "Generic Brand";
    grandTotal += lineTotal;
    lineItems.push({ product: it.product, qty: it.qty, unitPrice, lineTotal, manufacturer: mfg });
    if (!manufacturersList.includes(mfg)) manufacturersList.push(mfg);
  });

  const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  let quoteText = `Hi! Here's our quotation:\n\n`;
  lineItems.forEach((li) => {
    quoteText += `• ${li.product} (${li.manufacturer})\n  ${li.qty} × ${fmt(li.unitPrice)}/unit = ${fmt(li.lineTotal)}\n\n`;
  });
  quoteText += ` Grand Total: ${fmt(grandTotal)}\n Delivery: Within 7–10 working days.\nPlease confirm to proceed!`;

  return {
    messages: [{ from: "vendor", text: quoteText, ts, isQuote: true }],
    grandTotal,
    manufacturers: mfgMap,
    manufacturersList,
  };
}

// ══════════════════════════════════════════════════════════════════════════
//  CREATE / EDIT PO
// ══════════════════════════════════════════════════════════════════════════
function CreatePO({ onCreated, editPO }) {
  const isEdit = !!editPO;

  const [selectedVendors, setSelectedVendors] = useState(isEdit ? editPO.vendors : []);
  const [vendorSearch, setVendorSearch] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(isEdit ? (editPO.delivery || "") : "");
  const [items, setItems] = useState(
    isEdit
      ? editPO.items.map((it) => ({ product: it.product, qty: it.qty, remarks: it.remarks || "" }))
      : [{ product: "", qty: "", remarks: "" }]
  );
  const [submitted, setSubmitted] = useState(false);
  const [vendorDropOpen, setVendorDropOpen] = useState(false);

  const toggleVendor = (v) => {
    setSelectedVendors((prev) =>
      prev.find((x) => x.id === v.id) ? prev.filter((x) => x.id !== v.id) : [...prev, v]
    );
  };

  const addItem = () => setItems([...items, { product: "", qty: "", remarks: "" }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, val) => {
    const up = [...items];
    up[i][field] = val;
    setItems(up);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedVendors.length || items.some((it) => !it.product || !it.qty)) return;

    if (isEdit) {
      const updated = {
        ...editPO,
        delivery: deliveryDate,
        vendors: selectedVendors,
        items: items.filter((it) => it.product),
        chats: editPO.chats,
      };
      updatePo(updated);
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); if (onCreated) onCreated(); }, 1800);
    } else {
      const po = {
        id: `PO-2026-${uid()}`,
        date: now(),
        delivery: deliveryDate,
        status: "Sent",
        vendors: selectedVendors,
        items: items.filter((it) => it.product),
        chats: Object.fromEntries(selectedVendors.map((v) => [v.id, []])),
      };
      addPo(po);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSelectedVendors([]);
        setItems([{ product: "", qty: "", remarks: "" }]);
        setDeliveryDate("");
        if (onCreated) onCreated();
      }, 2000);
    }
  };

  const filteredVendors = VENDORS.filter(
    (v) => v.status === "Active" && v.name.toLowerCase().includes(vendorSearch.toLowerCase())
  );

  return (
    <div style={cs.createOuter}>
      <div style={cs.createScroll}>
        <div style={cs.pageWrap}>

          {/* ── Header ── */}
          <div style={cs.pageHeader}>
            <div>
              <h1 style={cs.pageTitle}>
                {isEdit ? "Edit Purchase Order" : "Create Purchase Order"}
              </h1>
              <p style={cs.pageSub}>
                {isEdit
                  ? `Editing ${editPO.id} · Originally created on ${editPO.date}`
                  : "Send a PO to vendors — they will reply with HSN code, price & delivery date"}
              </p>
            </div>
            {isEdit && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#2563eb" }}>
                &#9998; Editing: {editPO.id}
              </div>
            )}
          </div>

          {/* ✅ Info banner */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, fontSize: 13, color: "#1d4ed8" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>&#8505;</span>
            <span>
              Fill in <strong>product name</strong>, <strong>quantity</strong> and <strong>remarks / specifications</strong> only.
              The vendor will reply back with <strong>HSN code, unit price, confirmed quantity</strong> and <strong>delivery date</strong>.
            </span>
          </div>

          {submitted && (
            <div style={cs.successBanner}>
              <span style={{ fontSize: 20 }}>&#10003;</span>
              {isEdit
                ? `Purchase Order ${editPO.id} updated successfully!`
                : `Purchase Order created & dispatched to ${selectedVendors.length} vendor${selectedVendors.length > 1 ? "s" : ""}!`}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* ── Order Details card ── */}
            <div style={cs.card}>
              <h3 style={cs.sectionTitle}>Order Details</h3>
              <div style={cs.grid3}>

                <div style={cs.fg}>
                  <label style={cs.label}>PO Number</label>
                  <input
                    style={cs.inputReadonly}
                    readOnly
                    value={isEdit ? editPO.id : `PO-2026-${String(Date.now()).slice(-4)}`}
                  />
                </div>

                <div style={{ ...cs.fg, gridColumn: "span 1", position: "relative" }}>
                  <label style={cs.label}>
                    Vendors <span style={cs.badge}>{selectedVendors.length} selected</span>
                  </label>
                  <div style={cs.vendorPicker} onClick={() => setVendorDropOpen((o) => !o)}>
                    {selectedVendors.length === 0 ? (
                      <span style={{ color: "#94a3b8" }}>Select vendors…</span>
                    ) : (
                      <div style={cs.chipRow}>
                        {selectedVendors.map((v) => (
                          <span key={v.id} style={cs.chip}>
                            {v.name}
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); toggleVendor(v); }}
                              style={cs.chipX}
                            >
                              &#215;
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <span style={{ color: "#94a3b8", marginLeft: "auto", fontSize: 12, flexShrink: 0 }}>&#9660;</span>
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
                        const sel = !!selectedVendors.find((x) => x.id === v.id);
                        return (
                          <div
                            key={v.id}
                            style={{ ...cs.dropItem, background: sel ? "#eff6ff" : "white" }}
                            onClick={(e) => { e.stopPropagation(); toggleVendor(v); }}
                          >
                            <div style={{ ...cs.avatar, background: sel ? "#2563eb" : "#e2e8f0", color: sel ? "white" : "#64748b" }}>
                              {v.avatar}
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{v.name}</div>
                              <div style={{ fontSize: 11, color: "#94a3b8" }}>{v.contact}</div>
                            </div>
                            {sel && <span style={{ marginLeft: "auto", color: "#2563eb", fontSize: 16 }}>&#10003;</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

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

            {selectedVendors.length > 0 && (
              <div style={cs.vendorPreviewRow}>
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>PO will be sent to:</span>
                {selectedVendors.map((v) => (
                  <div key={v.id} style={cs.vendorPill}>
                    <div style={{ ...cs.avatar, width: 22, height: 22, fontSize: 9 }}>{v.avatar}</div>
                    {v.name}
                  </div>
                ))}
              </div>
            )}

            {/* ── Line Items card ── */}
            <div style={cs.card}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <h3 style={{ ...cs.sectionTitle, margin: 0 }}>Line Items</h3>
                <button type="button" style={cs.addBtn} onClick={addItem}>+ Add Item</button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["#", "Product", "Qty", "Remarks / Specs", ""].map((h, i) => (
                        <th key={i} style={cs.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "white" }}>
                        <td style={cs.tdN}>{i + 1}</td>
                        <td style={cs.td}>
                          <select
                            style={cs.tSel}
                            value={it.product}
                            onChange={(e) => updateItem(i, "product", e.target.value)}
                          >
                            <option value="">Select…</option>
                            {PRODUCTS.map((p) => (
                              <option key={p.id} value={p.name}>{p.name}</option>
                            ))}
                          </select>
                        </td>
                        <td style={cs.td}>
                          <input
                            style={{ ...cs.tIn, width: 80 }}
                            type="number"
                            value={it.qty}
                            onChange={(e) => updateItem(i, "qty", e.target.value)}
                            placeholder="0"
                            min="0"
                          />
                        </td>
                        <td style={cs.td}>
                          <input
                            style={{ ...cs.tIn, width: 280 }}
                            type="text"
                            value={it.remarks || ""}
                            onChange={(e) => updateItem(i, "remarks", e.target.value)}
                            placeholder="e.g. ISI mark, CAT6, brand specs…"
                          />
                        </td>
                        <td style={cs.td}>
                          {items.length > 1 && (
                            <button type="button" style={cs.removeBtn} onClick={() => removeItem(i)}>
                              &#128465;
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Footer buttons ── */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingBottom: 24, paddingTop: 4 }}>
              <button type="button" style={cs.draftBtn} onClick={() => onCreated && onCreated()}>
                {isEdit ? "Discard Changes" : "Save as Draft"}
              </button>
              <button type="submit" style={cs.submitBtn}>
                {isEdit
                  ? "Update PO"
                  : `Send to ${selectedVendors.length || "…"} Vendor${selectedVendors.length !== 1 ? "s" : ""}`}
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
function ViewPOs({ onEdit }) {
  const pos = usePOStore();
  const [selectedPO, setSelectedPO] = useState(null);
  const [activeVendor, setActiveVendor] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [localChats, setLocalChats] = useState({});
  // NEW: store vendor quote totals keyed by vendorId, per PO session
  const [vendorTotals, setVendorTotals] = useState({});
  // NEW: store manufacturer lists per vendorId { vendorId: ["Brand A", "Brand B"] }
  const [vendorManufacturers, setVendorManufacturers] = useState({});
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeVendor, localChats]);

  const openDetails = (po) => {
    setSelectedPO(po);
    setActiveVendor(null);

    // Start with existing chats
    const baseChats = { ...(po.chats || {}) };
    const totals = {};

    // For each vendor, if their chat has no quote message yet, generate one after a delay
    // We'll store pre-generated quotes immediately but "reveal" them via state updates
    const initialChats = { ...baseChats };
    const initialTotals = {};
    const initialMfgs = {};

    po.vendors.forEach((v) => {
      const { messages, grandTotal, manufacturersList } = generateVendorQuoteMessages(v, po.items);
      // Check if vendor already has a quote in existing chats
      const existingMsgs = baseChats[v.id] || [];
      const hasQuote = existingMsgs.some((m) => m.isQuote);
      if (!hasQuote) {
        // Will append quote messages
        initialChats[v.id] = existingMsgs; // start without quote
      }
      initialTotals[v.id] = grandTotal;
      initialMfgs[v.id] = manufacturersList;
    });

    setLocalChats(initialChats);
    setVendorTotals(initialTotals);
    setVendorManufacturers(initialMfgs);

    // Stagger vendor quote replies: each vendor replies one after the other
    // Sort vendors by their grand total ascending so the cheapest replies last (arrives last but sorted in UI)
    const vendorsSortedByTotal = [...po.vendors].sort(
      (a, b) => (initialTotals[a.id] || 0) - (initialTotals[b.id] || 0)
    );

    vendorsSortedByTotal.forEach((v, idx) => {
      const { messages } = generateVendorQuoteMessages(v, po.items);
      const existingMsgs = baseChats[v.id] || [];
      const hasQuote = existingMsgs.some((m) => m.isQuote);
      if (!hasQuote) {
        // Delay: cheapest vendor replies last (so they "arrive" in order expensive→cheap)
        // But we want ascending display — vendor list sorts by total, not by arrival time
        const delay = (idx + 1) * 1400;
        setTimeout(() => {
          setLocalChats((prev) => ({
            ...prev,
            [v.id]: [...(prev[v.id] || []), ...messages],
          }));
        }, delay);
      }
    });
  };

  const closeDetails = () => {
    setSelectedPO(null);
    setActiveVendor(null);
    setVendorTotals({});
    setVendorManufacturers({});
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

  // ── TABLE VIEW ───────────────────────────────────────────────────────────
  if (!selectedPO) {
    return (
      <div style={cs.viewRoot}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#fff" }}>

          <div style={cs.leftHeader}>
            <div>
              <h1 style={cs.leftTitle}>Purchase Orders</h1>
              <p style={cs.leftSub}>{pos.length} orders total</p>
            </div>
            <div style={cs.hintBadge}>Click View to see full details</div>
          </div>

          <div style={{ overflowY: "auto", overflowX: "auto", flex: 1 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <tr>
                  {["PO ID", "Date", "Vendors", "Status", "Items", "Actions"].map((h) => (
                    <th key={h} style={cs.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pos.map((po) => (
                  <tr
                    key={po.id}
                    style={{ background: "white", borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  >
                    <td style={{ ...cs.td, fontWeight: 700, color: "#2563eb", fontSize: 12 }}>{po.id}</td>
                    <td style={{ ...cs.td, fontSize: 12, color: "#64748b" }}>{po.date}</td>
                    <td style={cs.td}>
                      <div style={{ display: "flex", gap: 4 }}>
                        {po.vendors.slice(0, 2).map((v) => (
                          <span key={v.id} style={{ ...cs.avatar, width: 24, height: 24, fontSize: 9 }}>{v.avatar}</span>
                        ))}
                        {po.vendors.length > 2 && (
                          <span style={{ fontSize: 11, color: "#64748b", alignSelf: "center" }}>+{po.vendors.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td style={cs.td}>
                      <span style={{
                        ...cs.statusBadge,
                        background: (statusColor[po.status] || "#94a3b8") + "18",
                        color: statusColor[po.status] || "#94a3b8",
                        border: `1px solid ${statusColor[po.status] || "#94a3b8"}30`,
                      }}>
                        {po.status}
                      </span>
                    </td>
                    <td style={{ ...cs.td, fontSize: 12, color: "#475569" }}>
                      {po.items.length} item{po.items.length !== 1 ? "s" : ""}
                    </td>
                    <td style={cs.td} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={cs.viewBtn} onClick={() => openDetails(po)}>
                          View
                        </button>
                        <button style={cs.editBtn} onClick={() => onEdit(po)}>
                           Edit / Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ── DETAIL VIEW ──────────────────────────────────────────────────────────
  // NEW: Sort vendors ascending by their quoted grand total (cheapest first = best deal)
  const sortedVendors = [...selectedPO.vendors].sort(
    (a, b) => (vendorTotals[a.id] || Infinity) - (vendorTotals[b.id] || Infinity)
  );

  return (
    <div style={{ ...cs.viewRoot, background: "#f8fafc" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Detail header */}
        <div style={cs.detailHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button style={cs.backBtn} onClick={closeDetails}>
              &#8592; Back to List
            </button>
            <div style={{ width: 1, height: 28, background: "#e2e8f0" }} />
            <div>
              <div style={cs.detailLabel}>Purchase Order</div>
              <h2 style={cs.detailTitle}>{selectedPO.id}</h2>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
            <span style={{
              ...cs.statusBadge,
              background: (statusColor[selectedPO.status] || "#94a3b8") + "18",
              color: statusColor[selectedPO.status] || "#94a3b8",
              border: `1px solid ${statusColor[selectedPO.status] || "#94a3b8"}30`,
              fontSize: 13, padding: "6px 14px",
            }}>
              {selectedPO.status}
            </span>
            <button style={cs.editBtn} onClick={() => { closeDetails(); onEdit(selectedPO); }}>
              &#9998; Edit / Details
            </button>
          </div>
        </div>

        {/* Three-column body */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* ── PO detail panel ── */}
          <div style={cs.detailPanel}>
            <div style={{ padding: "24px" }}>
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
                Created: {selectedPO.date} &nbsp;&middot;&nbsp; Delivery: {selectedPO.delivery || "N/A"}
              </div>

              <h4 style={cs.sectionLabel}>Line Items</h4>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
                <thead>
                  <tr>
                    {["Product", "Qty", "Remarks / Specs"].map((h) => (
                      <th key={h} style={cs.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedPO.items.map((it, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fafafa" : "white" }}>
                      <td style={{ ...cs.td, fontWeight: 600 }}>{it.product}</td>
                      <td style={cs.td}>{it.qty}</td>
                      <td style={{ ...cs.td, color: "#64748b" }}>{it.remarks || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>No remarks</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Vendor-reply awaited notice */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#fefce8", border: "1px solid #fde68a", borderRadius: 10, fontSize: 13, color: "#92400e" }}>
                <span style={{ fontSize: 18 }}>&#8987;</span>
                <span>Awaiting vendor reply with <strong>HSN code, unit price, confirmed qty</strong> and <strong>delivery date</strong>.</span>
              </div>

              {/* Order Summary */}
              <div style={{ ...cs.summaryBox, marginTop: 20 }}>
                <div style={cs.summaryTitle}>Order Summary</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 0" }}>
                  {[
                    ["PO ID", selectedPO.id],
                    ["Date", selectedPO.date],
                    ["Delivery", selectedPO.delivery || "N/A"],
                    ["Vendors", selectedPO.vendors.map((v) => v.name).join(", ")],
                    ["Items", `${selectedPO.items.length} item${selectedPO.items.length !== 1 ? "s" : ""}`],
                    ["Price", "Pending vendor reply"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 6 }}>
                      <span style={{ fontSize: 12, color: "#94a3b8", minWidth: 72 }}>{k}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: k === "Price" ? "#f59e0b" : "#334155" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Vendor list panel — sorted ascending by quoted total ── */}
          <div style={cs.vendorPanel}>
            <div style={cs.vendorPanelHeader}>
              <div style={cs.sectionLabel}>Vendors</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                {selectedPO.vendors.length} recipient{selectedPO.vendors.length !== 1 ? "s" : ""} · sorted by price ↑
              </div>
            </div>
            <div style={{ padding: "10px", flex: 1, overflowY: "auto" }}>
              {sortedVendors.map((v, idx) => {
                const msgs = localChats[v.id] || [];
                const unread = msgs.filter((m) => m.from === "vendor").length;
                const isActive = activeVendor?.id === v.id;
                const total = vendorTotals[v.id];
                const hasReplied = msgs.some((m) => m.isQuote);
                const isBest = idx === 0 && hasReplied;
                const mfgList = vendorManufacturers[v.id] || [];

                return (
                  <div
                    key={v.id}
                    onClick={() => setActiveVendor(v)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "11px 12px",
                      borderRadius: 10,
                      marginBottom: 6,
                      cursor: "pointer",
                      background: isBest
                        ? (isActive ? "#f0fdf4" : "#f0fdf4")
                        : (isActive ? "#eff6ff" : "white"),
                      border: isBest
                        ? `1.5px solid ${isActive ? "#86efac" : "#bbf7d0"}`
                        : (isActive ? "1.5px solid #bfdbfe" : "1.5px solid #f1f5f9"),
                      transition: "all 0.15s",
                      position: "relative",
                    }}
                  >
                    {/* Rank badge */}
                    <div style={{
                      position: "absolute",
                      top: -7,
                      left: 10,
                      fontSize: 9,
                      fontWeight: 800,
                      background: isBest ? "#16a34a" : (idx === 1 ? "#2563eb" : "#94a3b8"),
                      color: "white",
                      borderRadius: 99,
                      padding: "1px 6px",
                      letterSpacing: "0.04em",
                    }}>
                      {isBest ? "BEST" : `#${idx + 1}`}
                    </div>

                    <div style={{
                      ...cs.avatar,
                      background: isBest ? "#16a34a" : (isActive ? "#2563eb" : "#e2e8f0"),
                      color: (isBest || isActive) ? "white" : "#64748b",
                      flexShrink: 0,
                    }}>
                      {v.avatar}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {v.name}
                      </div>
                      {/* Show quoted total if vendor has replied */}
                      {hasReplied && total ? (
                        <>
                          <div style={{ fontSize: 11, color: isBest ? "#16a34a" : "#64748b", fontWeight: 700, marginTop: 1 }}>
                            {fmt(total)}
                          </div>
                          {/* Manufacturer names — one per line as small pills */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 4 }}>
                            {mfgList.map((mfg) => (
                              <span key={mfg} style={{
                                fontSize: 9,
                                fontWeight: 600,
                                background: isBest ? "#dcfce7" : "#f1f5f9",
                                color: isBest ? "#15803d" : "#475569",
                                border: `1px solid ${isBest ? "#bbf7d0" : "#e2e8f0"}`,
                                borderRadius: 4,
                                padding: "1px 5px",
                                whiteSpace: "nowrap",
                              }}>
                                {mfg}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1, fontStyle: "italic" }}>
                          {msgs.length > 0 ? `${msgs.length} msg` : "Awaiting reply…"}
                        </div>
                      )}
                    </div>

                    {unread > 0 && (
                      <span style={{ background: isBest ? "#16a34a" : "#2563eb", color: "white", borderRadius: 99, fontSize: 10, fontWeight: 700, padding: "2px 6px", flexShrink: 0 }}>
                        {unread}
                      </span>
                    )}
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>&#8250;</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Chat panel ── */}
          <div style={cs.chatPanel}>
            {activeVendor ? (
              <>
                <div style={cs.chatHeader}>
                  <div style={{ ...cs.avatar, background: "#2563eb", color: "white" }}>{activeVendor.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {activeVendor.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>PO Chat &middot; {selectedPO.id}</div>
                  </div>
                  <button style={{ ...cs.viewBtn, fontSize: 12, flexShrink: 0 }} onClick={() => setActiveVendor(null)}>Close</button>
                </div>
                <div style={cs.chatChipWrap}>
                  <div style={cs.chatChip}>
                    {selectedPO.id} &middot; {selectedPO.items.length} items
                  </div>
                </div>
                <div style={cs.chatMessages}>
                  {(localChats[activeVendor.id] || []).length === 0 && (
                    <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, marginTop: 40 }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>&#128172;</div>
                      Start the conversation with {activeVendor.name}
                    </div>
                  )}
                  {(localChats[activeVendor.id] || []).map((msg, i) => {
                    const isUs = msg.from === "us";
                    return (
                      <div key={i} style={{ display: "flex", flexDirection: isUs ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
                        {!isUs && (
                          <div style={{ ...cs.avatar, width: 26, height: 26, fontSize: 9, flexShrink: 0 }}>{activeVendor.avatar}</div>
                        )}
                        <div style={{ maxWidth: "80%" }}>
                          <div style={{
                            padding: "9px 13px",
                            borderRadius: isUs ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                            background: msg.isQuote
                              ? "linear-gradient(135deg, #f0fdf4, #dcfce7)"
                              : (isUs ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "#f1f5f9"),
                            color: isUs ? "white" : "#1e293b",
                            fontSize: msg.isQuote ? 12 : 13,
                            lineHeight: 1.6,
                            border: msg.isQuote ? "1px solid #86efac" : "none",
                            whiteSpace: "pre-wrap",
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
              <div style={cs.chatEmpty}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>&#128172;</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>Select a vendor</div>
                <div style={{ fontSize: 12, marginTop: 4, color: "#94a3b8" }}>Click a vendor on the left to open chat</div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  APP SHELL
// ══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("view");
  const [editPO, setEditPO] = useState(null);

  const handleEdit = (po) => {
    setEditPO(po);
    setTab("create");
  };

  const handleCreated = () => {
    setEditPO(null);
    setTab("view");
  };

  const handleTabSwitch = (key) => {
    if (key === "view") setEditPO(null);
    setTab(key);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Top nav */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0 24px", display: "flex", alignItems: "center", height: 54, flexShrink: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginRight: 32 }}>PO Manager</div>
        {[["view", "View POs"], ["create", editPO ? `Edit: ${editPO.id}` : "Create PO"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleTabSwitch(key)}
            style={{
              padding: "0 18px", height: "100%", border: "none", background: "none",
              cursor: "pointer", fontSize: 13, fontWeight: 700,
              color: tab === key ? "#2563eb" : "#64748b",
              borderBottom: tab === key ? "2.5px solid #2563eb" : "2.5px solid transparent",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
        {editPO && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#2563eb", fontWeight: 600 }}>
            <span style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 20, padding: "4px 12px" }}>
              &#9998; Editing {editPO.id}
            </span>
            <button
              onClick={() => { setEditPO(null); setTab("view"); }}
              style={{ padding: "4px 10px", background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer" }}
            >
              Cancel Edit
            </button>
          </div>
        )}
      </div>

      {/* Content area */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
        {tab === "view"
          ? <ViewPOs onEdit={handleEdit} />
          : <CreatePO onCreated={handleCreated} editPO={editPO} />
        }
      </div>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const cs = {
  createOuter: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#f8fafc" },
  createScroll: { flex: 1, overflowY: "auto", overflowX: "hidden" },
  pageWrap: { maxWidth: 960, margin: "0 auto", padding: 28, display: "flex", flexDirection: "column", gap: 20 },
  pageHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 },
  pageTitle: { fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 },
  pageSub: { fontSize: 13, color: "#94a3b8", marginTop: 4, margin: "4px 0 0" },
  successBanner: { display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#15803d" },
  card: { background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", padding: 24 },
  sectionTitle: { fontSize: 14, fontWeight: 700, color: "#334155", margin: "0 0 16px" },
  grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 },
  fg: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#475569" },
  badge: { fontSize: 11, fontWeight: 700, background: "#eff6ff", color: "#2563eb", borderRadius: 99, padding: "2px 8px", marginLeft: 6 },
  input: { padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "#fff", color: "#1e293b", outline: "none", boxSizing: "border-box", width: "100%" },
  inputReadonly: { padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "#f8fafc", color: "#94a3b8", outline: "none", boxSizing: "border-box", width: "100%", cursor: "not-allowed" },
  vendorPicker: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, padding: "8px 12px", border: "1.5px solid #e2e8f0", borderRadius: 10, minHeight: 44, cursor: "pointer", background: "#fff", userSelect: "none" },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 4, flex: 1 },
  chip: { display: "inline-flex", alignItems: "center", gap: 4, background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 },
  chipX: { background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: 14, padding: 0, lineHeight: 1, display: "flex" },
  dropdown: { position: "absolute", top: "100%", left: 0, right: 0, background: "white", border: "1.5px solid #e2e8f0", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100, overflow: "hidden", marginTop: 4 },
  dropSearch: { width: "100%", padding: "10px 14px", border: "none", borderBottom: "1px solid #f1f5f9", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  dropItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", transition: "background 0.1s" },
  vendorPreviewRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: "10px 16px", background: "#eff6ff", borderRadius: 10, border: "1px solid #bfdbfe" },
  vendorPill: { display: "flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #bfdbfe", borderRadius: 20, padding: "4px 10px 4px 6px", fontSize: 12, fontWeight: 600, color: "#1e293b" },
  addBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#eff6ff", color: "#2563eb", border: "1px solid #dbeafe", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" },
  tSel: { width: "100%", minWidth: 160, padding: "7px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#1e293b", cursor: "pointer", outline: "none" },
  tIn: { padding: "7px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#1e293b", outline: "none", boxSizing: "border-box" },
  removeBtn: { padding: "5px 9px", background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 7, cursor: "pointer", fontSize: 13 },
  draftBtn: { padding: "10px 22px", background: "#f0f4fb", color: "#3b82f6", border: "1px solid #dbeafe", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  submitBtn: { padding: "10px 22px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(59,130,246,0.30)" },

  // Shared
  avatar: { width: 32, height: 32, borderRadius: 8, background: "#e2e8f0", color: "#64748b", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  th: { textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: "1px solid #f1f5f9", background: "#f8fafc", whiteSpace: "nowrap" },
  td: { padding: "10px 14px", fontSize: 13, color: "#334155", verticalAlign: "middle" },
  tdN: { padding: "10px 14px", fontSize: 12, color: "#94a3b8", fontWeight: 600, verticalAlign: "middle", width: 36 },
  statusBadge: { display: "inline-flex", alignItems: "center", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
  viewBtn: { padding: "5px 12px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" },
  editBtn: { padding: "5px 12px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" },
  backBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" },

  // ViewPOs
  viewRoot: { display: "flex", width: "100%", height: "100%", overflow: "hidden", fontFamily: "'DM Sans', system-ui, sans-serif" },
  leftHeader: { padding: "24px 24px 16px", borderBottom: "1px solid #f1f5f9", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" },
  leftTitle: { margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" },
  leftSub: { margin: "4px 0 0", fontSize: 13, color: "#94a3b8" },
  hintBadge: { fontSize: 12, fontWeight: 600, color: "#64748b", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 20, padding: "5px 14px" },

  detailHeader: { padding: "18px 24px", borderBottom: "1px solid #f1f5f9", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", background: "white" },
  detailLabel: { fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" },
  detailTitle: { margin: "3px 0 0", fontSize: 20, fontWeight: 800, color: "#0f172a" },
  sectionLabel: { fontSize: 12, fontWeight: 700, color: "#475569", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.06em" },
  summaryBox: { background: "#f8fafc", borderRadius: 12, padding: "16px 20px", border: "1px solid #f1f5f9" },
  summaryTitle: { fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 },

  detailPanel: { flex: "1 1 auto", overflowY: "auto", background: "white", minWidth: 0, borderRight: "1px solid #e2e8f0" },
  vendorPanel: { flex: "0 0 220px", borderRight: "1px solid #e2e8f0", overflowY: "auto", background: "#fafafa", display: "flex", flexDirection: "column" },
  vendorPanelHeader: { padding: "20px 16px 14px", borderBottom: "1px solid #f1f5f9", flexShrink: 0 },

  chatPanel: { flex: "0 0 320px", display: "flex", flexDirection: "column", background: "white", overflow: "hidden" },
  chatHeader: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
  chatChipWrap: { padding: "10px 16px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9", flexShrink: 0 },
  chatChip: { fontSize: 11, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "6px 10px", color: "#2563eb", fontWeight: 600 },
  chatMessages: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 },
  chatInputRow: { padding: "12px 16px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 8, flexShrink: 0 },
  chatInput: { flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, fontFamily: "inherit", outline: "none", minWidth: 0 },
  chatSendBtn: { padding: "10px 14px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, flexShrink: 0 },
  chatEmpty: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, color: "#94a3b8", textAlign: "center" },
};