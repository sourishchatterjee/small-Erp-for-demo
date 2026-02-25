// import React, { useState } from "react";

// import { products as initialData, materialTypes, units } from '../../data/data';
// function StockOut() {
//   const [formData, setFormData] = useState({
//     itemName: "",
//     quantity: "",
//     date: "",
//     remarks: ""
//   });

//   // ✅ Dummy Data Preloaded
//   const [stockList, setStockList] = useState([
//     {
//       id: 1,
//       itemName: "Cement Bags",
//       quantity: 50,
//       date: "2026-02-20",
//       remarks: "Issued for Site A construction"
//     },
//     {
//       id: 2,
//       itemName: "Steel Rods",
//       quantity: 120,
//       date: "2026-02-22",
//       remarks: "Foundation work"
//     },
//     {
//       id: 3,
//       itemName: "Paint Buckets",
//       quantity: 30,
//       date: "2026-02-23",
//       remarks: "Interior finishing"
//     }
//   ]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleAddStock = () => {
//     if (!formData.itemName || !formData.quantity || !formData.date) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const newEntry = {
//       id: Date.now(),
//       ...formData
//     };

//     setStockList([newEntry, ...stockList]);

//     setFormData({
//       itemName: "",
//       quantity: "",
//       date: "",
//       remarks: ""
//     });
//   };

//   const handleDelete = (id) => {
//     const filtered = stockList.filter((item) => item.id !== id);
//     setStockList(filtered);
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <h2 style={styles.title}>Stock Out Management</h2>
//       </div>

//       {/* Form Section */}
//       <div style={styles.formCard}>
//         <div style={styles.formRow}>
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Item Name *</label>
//             <input
//               type="text"
//               name="itemName"
//               value={formData.itemName}
//               onChange={handleChange}
//               style={styles.input}
//               placeholder="Enter item name"
//             />
//           </div>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Quantity *</label>
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               style={styles.input}
//               placeholder="Enter quantity"
//             />
//           </div>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Date *</label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               style={styles.input}
//             />
//           </div>
//         </div>

//         <div style={{ ...styles.inputGroup, marginTop: "15px" }}>
//           <label style={styles.label}>Remarks</label>
//           <textarea
//             name="remarks"
//             value={formData.remarks}
//             onChange={handleChange}
//             style={styles.textarea}
//             placeholder="Enter remarks"
//           />
//         </div>

//         <div style={{ marginTop: "20px", textAlign: "right" }}>
//           <button style={styles.button} onClick={handleAddStock}>
//             Add Stock Out
//           </button>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div style={styles.tableCard}>
//         <h3 style={styles.subTitle}>Stock Out Records</h3>

//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Item</th>
//               <th style={styles.th}>Quantity</th>
//               <th style={styles.th}>Date</th>
//               <th style={styles.th}>Remarks</th>
//               <th style={styles.th}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stockList.length === 0 ? (
//               <tr>
//                 <td colSpan="5" style={styles.noData}>
//                   No stock-out records available
//                 </td>
//               </tr>
//             ) : (
//               stockList.map((item) => (
//                 <tr key={item.id}>
//                   <td style={styles.td}>{item.itemName}</td>
//                   <td style={styles.td}>{item.quantity}</td>
//                   <td style={styles.td}>{item.date}</td>
//                   <td style={styles.td}>{item.remarks}</td>
//                   <td style={styles.td}>
//                     <button
//                       style={styles.deleteBtn}
//                       onClick={() => handleDelete(item.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /* ✅ Inline Styles */
// const styles = {
//   container: {
//     padding: "30px",
//     backgroundColor: "#f4f6f9",
//     minHeight: "100vh",
//     fontFamily: "Arial, sans-serif"
//   },
//   header: {
//     marginBottom: "20px"
//   },
//   title: {
//     margin: 0,
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#333"
//   },
//   formCard: {
//     backgroundColor: "#ffffff",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//     marginBottom: "30px"
//   },
//   formRow: {
//     display: "flex",
//     gap: "20px",
//     flexWrap: "wrap"
//   },
//   inputGroup: {
//     flex: 1,
//     minWidth: "220px",
//     display: "flex",
//     flexDirection: "column"
//   },
//   label: {
//     marginBottom: "6px",
//     fontSize: "14px",
//     fontWeight: "500",
//     color: "#555"
//   },
//   input: {
//     padding: "8px 10px",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//     fontSize: "14px"
//   },
//   textarea: {
//     padding: "8px 10px",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//     minHeight: "70px",
//     resize: "none"
//   },
//   button: {
//     padding: "8px 16px",
//     backgroundColor: "#1976d2",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "14px"
//   },
//   tableCard: {
//     backgroundColor: "#ffffff",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
//   },
//   subTitle: {
//     marginBottom: "15px",
//     fontSize: "18px",
//     fontWeight: "600"
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse"
//   },
//   th: {
//     textAlign: "left",
//     padding: "10px",
//     backgroundColor: "#f0f2f5",
//     borderBottom: "1px solid #ddd",
//     fontSize: "14px"
//   },
//   td: {
//     padding: "10px",
//     borderBottom: "1px solid #eee",
//     fontSize: "14px"
//   },
//   noData: {
//     textAlign: "center",
//     padding: "15px",
//     color: "#888"
//   },
//   deleteBtn: {
//     padding: "5px 10px",
//     backgroundColor: "#d32f2f",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "12px"
//   }
// };

// export default StockOut;










import React, { useState } from "react";
import Select from "react-select";
import { products as initialData, materialTypes, units } from "../../data/data";

// ─── react-select custom styles ───────────────────────────────────────────────
const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "38px",
    borderRadius: "6px",
    border: state.isFocused ? "1.5px solid #1976d2" : "1.5px solid #e2e8f0",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(25,118,210,0.10)" : "none",
    fontSize: "13px",
    transition: "border 0.2s",
    "&:hover": { borderColor: "#1976d2" },
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "13px",
    backgroundColor: state.isSelected
      ? "#1976d2"
      : state.isFocused
      ? "#e3f0fb"
      : "#fff",
    color: state.isSelected ? "#fff" : "#1e293b",
  }),
  placeholder: (base) => ({ ...base, color: "#94a3b8", fontSize: "13px" }),
  singleValue: (base) => ({ ...base, color: "#1e293b", fontSize: "13px" }),
  menu: (base) => ({ ...base, borderRadius: "8px", zIndex: 99 }),
};

// ─── Build options from data ──────────────────────────────────────────────────
const productOptions = initialData.map((p) => ({
  value: p.id ?? p.name,
  label: p.name,
  unit: p.unit ?? "",
}));

const materialOptions = materialTypes?.map((m) => ({
  value: m.id ?? m.name,
  label: m.name,
})) ?? [];

const unitOptions = units?.map((u) => ({
  value: u.id ?? u.name,
  label: u.name,
})) ?? [];

// ─── Status badge helper ──────────────────────────────────────────────────────
const StatusBadge = ({ qty }) => {
  const isHigh = qty >= 100;
  const isMid = qty >= 30 && qty < 100;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        backgroundColor: isHigh ? "#dcfce7" : isMid ? "#fef9c3" : "#fee2e2",
        color: isHigh ? "#16a34a" : isMid ? "#a16207" : "#dc2626",
      }}
    >
      {qty}
    </span>
  );
};

function StockOut() {
  const [formData, setFormData] = useState({
    product: null,
    materialType: null,
    unit: null,
    quantity: "",
    date: "",
    remarks: "",
  });

  const [stockList, setStockList] = useState([
    {
      id: 1,
      itemName: "Cement Bags",
      materialType: "Raw Material",
      unit: "Bags",
      quantity: 50,
      date: "2026-02-20",
      remarks: "Issued for Site A construction",
    },
    {
      id: 2,
      itemName: "Steel Rods",
      materialType: "Metal",
      unit: "Nos",
      quantity: 120,
      date: "2026-02-22",
      remarks: "Foundation work",
    },
    {
      id: 3,
      itemName: "Paint Buckets",
      materialType: "Finish",
      unit: "Buckets",
      quantity: 30,
      date: "2026-02-23",
      remarks: "Interior finishing",
    },
  ]);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.product) e.product = "Required";
    if (!formData.quantity || isNaN(formData.quantity) || Number(formData.quantity) <= 0)
      e.quantity = "Enter valid quantity";
    if (!formData.date) e.date = "Required";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    const entry = {
      id: Date.now(),
      itemName: formData.product.label,
      materialType: formData.materialType?.label ?? "—",
      unit: formData.unit?.label ?? formData.product.unit ?? "—",
      quantity: Number(formData.quantity),
      date: formData.date,
      remarks: formData.remarks,
    };
    setStockList([entry, ...stockList]);
    setFormData({ product: null, materialType: null, unit: null, quantity: "", date: "", remarks: "" });
  };

  const handleDelete = (id) => setStockList(stockList.filter((i) => i.id !== id));

  // ── summary ──
  const totalQty = stockList.reduce((s, i) => s + Number(i.quantity), 0);
  const totalItems = stockList.length;

  return (
    <div style={S.page}>

      {/* ── Page Header ── */}
      <div style={S.pageHeader}>
        <div>
          <p style={S.pageSub}>Inventory Management</p>
          <h2 style={S.pageTitle}>Stock Out</h2>
        </div>
        <div style={S.statsRow}>
          <div style={S.statBox}>
            <span style={S.statVal}>{totalItems}</span>
            <span style={S.statLabel}>Total Records</span>
          </div>
          <div style={{ ...S.statBox, borderColor: "#1976d2" }}>
            <span style={{ ...S.statVal, color: "#1976d2" }}>{totalQty}</span>
            <span style={S.statLabel}>Total Qty Out</span>
          </div>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div style={S.card}>
        <div style={S.cardHeader}>
          <span style={S.cardDot} />
          <span style={S.cardTitle}>New Stock Out Entry</span>
        </div>

        {/* Row 1 */}
        <div style={S.row}>
          <div style={{ ...S.field, flex: 2 }}>
            <label style={S.label}>Product / Item <span style={S.req}>*</span></label>
            <Select
              options={productOptions}
              value={formData.product}
              onChange={(opt) => {
                setFormData({ ...formData, product: opt, unit: opt?.unit ? { value: opt.unit, label: opt.unit } : formData.unit });
                setErrors({ ...errors, product: undefined });
              }}
              placeholder="Search or select product..."
              styles={selectStyles}
              isClearable
            />
            {errors.product && <span style={S.err}>{errors.product}</span>}
          </div>

          <div style={S.field}>
            <label style={S.label}>Material Type</label>
            <Select
              options={materialOptions}
              value={formData.materialType}
              onChange={(opt) => setFormData({ ...formData, materialType: opt })}
              placeholder="Select type..."
              styles={selectStyles}
              isClearable
            />
          </div>

          <div style={S.field}>
            <label style={S.label}>Unit</label>
            <Select
              options={unitOptions}
              value={formData.unit}
              onChange={(opt) => setFormData({ ...formData, unit: opt })}
              placeholder="Select unit..."
              styles={selectStyles}
              isClearable
            />
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ ...S.row, marginTop: "16px" }}>
          <div style={S.field}>
            <label style={S.label}>Quantity <span style={S.req}>*</span></label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={(e) => { setFormData({ ...formData, quantity: e.target.value }); setErrors({ ...errors, quantity: undefined }); }}
              style={{ ...S.input, ...(errors.quantity ? S.inputErr : {}) }}
              placeholder="0"
              min="1"
            />
            {errors.quantity && <span style={S.err}>{errors.quantity}</span>}
          </div>

          <div style={S.field}>
            <label style={S.label}>Date <span style={S.req}>*</span></label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => { setFormData({ ...formData, date: e.target.value }); setErrors({ ...errors, date: undefined }); }}
              style={{ ...S.input, ...(errors.date ? S.inputErr : {}) }}
            />
            {errors.date && <span style={S.err}>{errors.date}</span>}
          </div>

          <div style={{ ...S.field, flex: 2 }}>
            <label style={S.label}>Remarks</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              style={S.input}
              placeholder="Optional note..."
            />
          </div>
        </div>

        {/* Actions */}
        <div style={S.formFooter}>
          <button
            style={S.clearBtn}
            onClick={() => { setFormData({ product: null, materialType: null, unit: null, quantity: "", date: "", remarks: "" }); setErrors({}); }}
          >
            Clear
          </button>
          <button style={S.addBtn} onClick={handleAdd}>
            + Add Stock Out
          </button>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div style={S.card}>
        <div style={S.cardHeader}>
          <span style={{ ...S.cardDot, backgroundColor: "#dc2626" }} />
          <span style={S.cardTitle}>Stock Out Records</span>
          <span style={S.countBadge}>{stockList.length} entries</span>
        </div>

        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                {["#", "Item / Product", "Material Type", "Unit", "Quantity", "Date", "Remarks", "Action"].map((h) => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stockList.length === 0 ? (
                <tr>
                  <td colSpan={8} style={S.empty}>
                    <div style={{ fontSize: "28px", marginBottom: "6px" }}>📭</div>
                    No stock-out records found
                  </td>
                </tr>
              ) : (
                stockList.map((item, idx) => (
                  <tr key={item.id} style={idx % 2 === 0 ? S.rowEven : S.rowOdd}>
                    <td style={{ ...S.td, color: "#94a3b8", fontWeight: "600" }}>{idx + 1}</td>
                    <td style={{ ...S.td, fontWeight: "600", color: "#1e293b" }}>{item.itemName}</td>
                    <td style={S.td}>
                      <span style={S.typePill}>{item.materialType}</span>
                    </td>
                    <td style={{ ...S.td, color: "#64748b" }}>{item.unit}</td>
                    <td style={S.td}><StatusBadge qty={item.quantity} /></td>
                    <td style={{ ...S.td, color: "#475569" }}>
                      {new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ ...S.td, color: "#64748b", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.remarks || "—"}
                    </td>
                    <td style={S.td}>
                      <button style={S.delBtn} onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Styles ─────────────────────────────────────────────────────────────────── */
const S = {
  page: { padding: "28px", backgroundColor: "#f1f5f9", minHeight: "100vh", fontFamily: "'Inter', Arial, sans-serif" },

  // Header
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", flexWrap: "wrap", gap: "12px" },
  pageSub: { margin: 0, fontSize: "12px", fontWeight: "500", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase" },
  pageTitle: { margin: "4px 0 0", fontSize: "22px", fontWeight: "700", color: "#1e293b" },
  statsRow: { display: "flex", gap: "12px" },
  statBox: { display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 20px", backgroundColor: "#fff", borderRadius: "8px", border: "1.5px solid #e2e8f0", minWidth: "90px" },
  statVal: { fontSize: "20px", fontWeight: "700", color: "#1e293b" },
  statLabel: { fontSize: "11px", color: "#94a3b8", marginTop: "2px", fontWeight: "500" },

  // Card
  card: { backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: "20px", overflow: "hidden" },
  cardHeader: { display: "flex", alignItems: "center", gap: "8px", padding: "14px 20px", borderBottom: "1px solid #f1f5f9", backgroundColor: "#fafbfc" },
  cardDot: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#1976d2", display: "inline-block" },
  cardTitle: { fontSize: "14px", fontWeight: "600", color: "#1e293b" },
  countBadge: { marginLeft: "auto", fontSize: "12px", backgroundColor: "#eff6ff", color: "#1976d2", padding: "2px 10px", borderRadius: "20px", fontWeight: "600" },

  // Form
  row: { display: "flex", gap: "16px", flexWrap: "wrap", padding: "18px 20px 0" },
  field: { flex: 1, minWidth: "180px", display: "flex", flexDirection: "column" },
  label: { marginBottom: "5px", fontSize: "12px", fontWeight: "600", color: "#64748b", letterSpacing: "0.3px" },
  input: { padding: "8px 10px", borderRadius: "6px", border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#1e293b", outline: "none", transition: "border 0.2s" },
  inputErr: { borderColor: "#dc2626" },
  req: { color: "#dc2626" },
  err: { fontSize: "11px", color: "#dc2626", marginTop: "3px" },
  formFooter: { padding: "16px 20px", display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid #f1f5f9", marginTop: "16px" },
  clearBtn: { padding: "8px 18px", backgroundColor: "#fff", color: "#64748b", border: "1.5px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "500" },
  addBtn: { padding: "8px 20px", backgroundColor: "#1976d2", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", letterSpacing: "0.2px" },

  // Table
  tableWrap: { overflowX: "auto", padding: "0 0 4px" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "700px" },
  th: { textAlign: "left", padding: "10px 14px", backgroundColor: "#f8fafc", borderBottom: "1.5px solid #e2e8f0", fontSize: "12px", fontWeight: "600", color: "#64748b", letterSpacing: "0.3px", textTransform: "uppercase", whiteSpace: "nowrap" },
  td: { padding: "10px 14px", borderBottom: "1px solid #f1f5f9", fontSize: "13px", color: "#334155", verticalAlign: "middle" },
  rowEven: { backgroundColor: "#fff" },
  rowOdd: { backgroundColor: "#fafbfc" },
  empty: { textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: "14px" },
  typePill: { display: "inline-block", padding: "2px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", backgroundColor: "#eff6ff", color: "#1976d2" },
  delBtn: { padding: "5px 12px", backgroundColor: "#fff0f0", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "5px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
};

export default StockOut;
