// ─── Dummy Data for Purchase ERP ───

export const materialTypes = [
    { id: 1, name: "Steel", code: "STL", description: "Various steel grades", status: "Active" },
    { id: 2, name: "Copper", code: "CPR", description: "Copper raw material", status: "Active" },
    { id: 3, name: "Aluminum", code: "ALM", description: "Aluminum alloys", status: "Active" },
    { id: 4, name: "Plastic", code: "PLS", description: "Industrial plastic", status: "Active" },
    { id: 5, name: "Rubber", code: "RBR", description: "Natural & synthetic rubber", status: "Inactive" },
    { id: 6, name: "Brass", code: "BRS", description: "Brass alloys", status: "Active" },
    { id: 7, name: "Wood", code: "WOD", description: "Industrial lumber", status: "Active" },
    { id: 8, name: "Glass", code: "GLS", description: "Industrial glass sheets", status: "Active" },
];

export const units = [
    { id: 1, name: "Kilogram", abbreviation: "Kg" },
    { id: 2, name: "Pieces", abbreviation: "Pcs" },
    { id: 3, name: "Litre", abbreviation: "Ltr" },
    { id: 4, name: "Metre", abbreviation: "Mtr" },
    { id: 5, name: "Ton", abbreviation: "Ton" },
    { id: 6, name: "Box", abbreviation: "Box" },
    { id: 7, name: "Roll", abbreviation: "Roll" },
    { id: 8, name: "Sheet", abbreviation: "Sht" },
];

export const products = [
    { id: 1, name: "MS Flat Bar 25mm", materialType: "Steel", unit: "Kg", price: 72, sku: "STL-FB-025" },
    { id: 2, name: "Copper Wire 2.5mm", materialType: "Copper", unit: "Mtr", price: 185, sku: "CPR-WR-025" },
    { id: 3, name: "Aluminum Sheet 1mm", materialType: "Aluminum", unit: "Sht", price: 320, sku: "ALM-SH-001" },
    { id: 4, name: "PVC Granules", materialType: "Plastic", unit: "Kg", price: 95, sku: "PLS-GR-001" },
    { id: 5, name: "Rubber Gasket 50mm", materialType: "Rubber", unit: "Pcs", price: 12, sku: "RBR-GK-050" },
    { id: 6, name: "Brass Rod 12mm", materialType: "Brass", unit: "Kg", price: 540, sku: "BRS-RD-012" },
    { id: 7, name: "Teak Wood Plank", materialType: "Wood", unit: "Pcs", price: 1200, sku: "WOD-TP-001" },
    { id: 8, name: "Tempered Glass 6mm", materialType: "Glass", unit: "Sht", price: 850, sku: "GLS-TG-006" },
    { id: 9, name: "SS Round Bar 20mm", materialType: "Steel", unit: "Kg", price: 210, sku: "STL-RB-020" },
    { id: 10, name: "Copper Tube 15mm", materialType: "Copper", unit: "Mtr", price: 295, sku: "CPR-TB-015" },
    { id: 11, name: "Nylon Bushings", materialType: "Plastic", unit: "Pcs", price: 18, sku: "PLS-NB-001" },
    { id: 12, name: "Plywood 18mm", materialType: "Wood", unit: "Sht", price: 1650, sku: "WOD-PW-018" },
];

export const vendors = [
    { id: 1, name: "Tata Steel Ltd", contact: "Rajesh Kumar", email: "rajesh@tatasteel.com", phone: "9876543210", gst: "27AABCT1234D1ZG", city: "Mumbai", address: "Plot 12, MIDC, Andheri East", status: "Active" },
    { id: 2, name: "Hindalco Industries", contact: "Priya Sharma", email: "priya@hindalco.com", phone: "9876543211", gst: "27AABCH5678E1ZH", city: "Pune", address: "Gate 4, Industrial Area", status: "Active" },
    { id: 3, name: "Finolex Cables", contact: "Amit Patel", email: "amit@finolex.com", phone: "9876543212", gst: "27AABCF9012F1ZI", city: "Pune", address: "Pimpri-Chinchwad", status: "Active" },
    { id: 4, name: "Supreme Industries", contact: "Sunil Mehta", email: "sunil@supreme.com", phone: "9876543213", gst: "27AABCS3456G1ZJ", city: "Mumbai", address: "Powai, Hiranandani", status: "Active" },
    { id: 5, name: "Godrej Materials", contact: "Neha Desai", email: "neha@godrej.com", phone: "9876543214", gst: "27AABCG7890H1ZK", city: "Chennai", address: "Ambattur Industrial Estate", status: "Inactive" },
    { id: 6, name: "JSW Steel", contact: "Vikram Singh", email: "vikram@jsw.com", phone: "9876543215", gst: "27AABCJ1234I1ZL", city: "Bellary", address: "Toranagallu, Bellary", status: "Active" },
];

export const stocks = [
    { id: 1, product: "MS Flat Bar 25mm", sku: "STL-FB-025", currentQty: 450, unit: "Kg", reorderLevel: 100, lastUpdated: "2026-02-20" },
    { id: 2, product: "Copper Wire 2.5mm", sku: "CPR-WR-025", currentQty: 85, unit: "Mtr", reorderLevel: 200, lastUpdated: "2026-02-18" },
    { id: 3, product: "Aluminum Sheet 1mm", sku: "ALM-SH-001", currentQty: 32, unit: "Sht", reorderLevel: 50, lastUpdated: "2026-02-22" },
    { id: 4, product: "PVC Granules", sku: "PLS-GR-001", currentQty: 800, unit: "Kg", reorderLevel: 300, lastUpdated: "2026-02-21" },
    { id: 5, product: "Rubber Gasket 50mm", sku: "RBR-GK-050", currentQty: 15, unit: "Pcs", reorderLevel: 100, lastUpdated: "2026-02-19" },
    { id: 6, product: "Brass Rod 12mm", sku: "BRS-RD-012", currentQty: 120, unit: "Kg", reorderLevel: 50, lastUpdated: "2026-02-23" },
    { id: 7, product: "Teak Wood Plank", sku: "WOD-TP-001", currentQty: 45, unit: "Pcs", reorderLevel: 20, lastUpdated: "2026-02-17" },
    { id: 8, product: "Tempered Glass 6mm", sku: "GLS-TG-006", currentQty: 8, unit: "Sht", reorderLevel: 25, lastUpdated: "2026-02-15" },
    { id: 9, product: "SS Round Bar 20mm", sku: "STL-RB-020", currentQty: 310, unit: "Kg", reorderLevel: 100, lastUpdated: "2026-02-22" },
    { id: 10, product: "Copper Tube 15mm", sku: "CPR-TB-015", currentQty: 62, unit: "Mtr", reorderLevel: 80, lastUpdated: "2026-02-20" },
    { id: 11, product: "Nylon Bushings", sku: "PLS-NB-001", currentQty: 500, unit: "Pcs", reorderLevel: 200, lastUpdated: "2026-02-21" },
    { id: 12, product: "Plywood 18mm", sku: "WOD-PW-018", currentQty: 22, unit: "Sht", reorderLevel: 30, lastUpdated: "2026-02-18" },
];

export const purchaseOrders = [
    { id: "PO-2026-001", vendor: "Tata Steel Ltd", date: "2026-02-01", deliveryDate: "2026-02-15", status: "Delivered", items: [{ product: "MS Flat Bar 25mm", qty: 500, rate: 72, amount: 36000 }, { product: "SS Round Bar 20mm", qty: 200, rate: 210, amount: 42000 }], total: 78000 },
    { id: "PO-2026-002", vendor: "Hindalco Industries", date: "2026-02-05", deliveryDate: "2026-02-20", status: "Shipped", items: [{ product: "Aluminum Sheet 1mm", qty: 100, rate: 320, amount: 32000 }], total: 32000 },
    { id: "PO-2026-003", vendor: "Finolex Cables", date: "2026-02-08", deliveryDate: "2026-02-22", status: "Approved", items: [{ product: "Copper Wire 2.5mm", qty: 500, rate: 185, amount: 92500 }, { product: "Copper Tube 15mm", qty: 100, rate: 295, amount: 29500 }], total: 122000 },
    { id: "PO-2026-004", vendor: "Supreme Industries", date: "2026-02-10", deliveryDate: "2026-02-25", status: "Pending", items: [{ product: "PVC Granules", qty: 1000, rate: 95, amount: 95000 }, { product: "Nylon Bushings", qty: 300, rate: 18, amount: 5400 }], total: 100400 },
    { id: "PO-2026-005", vendor: "JSW Steel", date: "2026-02-12", deliveryDate: "2026-02-28", status: "Draft", items: [{ product: "MS Flat Bar 25mm", qty: 300, rate: 72, amount: 21600 }], total: 21600 },
    { id: "PO-2026-006", vendor: "Tata Steel Ltd", date: "2026-01-15", deliveryDate: "2026-01-30", status: "Delivered", items: [{ product: "SS Round Bar 20mm", qty: 400, rate: 210, amount: 84000 }], total: 84000 },
    { id: "PO-2026-007", vendor: "Hindalco Industries", date: "2026-01-20", deliveryDate: "2026-02-05", status: "Delivered", items: [{ product: "Aluminum Sheet 1mm", qty: 80, rate: 320, amount: 25600 }], total: 25600 },
    { id: "PO-2026-008", vendor: "Finolex Cables", date: "2026-01-25", deliveryDate: "2026-02-10", status: "Delivered", items: [{ product: "Copper Wire 2.5mm", qty: 300, rate: 185, amount: 55500 }], total: 55500 },
];

export const users = [
    { id: 1, name: "Admin User", email: "admin@erp.com", role: "Admin", status: "Active", lastLogin: "2026-02-24" },
    { id: 2, name: "Rajesh Manager", email: "rajesh@erp.com", role: "Manager", status: "Active", lastLogin: "2026-02-23" },
    { id: 3, name: "Priya Purchase", email: "priya@erp.com", role: "Purchase Officer", status: "Active", lastLogin: "2026-02-22" },
    { id: 4, name: "Sunil Store", email: "sunil@erp.com", role: "Store Keeper", status: "Active", lastLogin: "2026-02-21" },
    { id: 5, name: "Neha Accounts", email: "neha@erp.com", role: "Accountant", status: "Inactive", lastLogin: "2026-02-10" },
];

export const dashboardStats = {
    totalStockValue: 1285400,
    pendingPOs: 3,
    activeVendors: 5,
    lowStockItems: 4,
};

export const monthlyPurchaseData = [
    { month: "Sep", amount: 185000 },
    { month: "Oct", amount: 220000 },
    { month: "Nov", amount: 195000 },
    { month: "Dec", amount: 310000 },
    { month: "Jan", amount: 265100 },
    { month: "Feb", amount: 354000 },
];

export const stockTrendData = [
    { month: "Sep", steel: 820, copper: 310, aluminum: 150, plastic: 600 },
    { month: "Oct", steel: 750, copper: 280, aluminum: 120, plastic: 700 },
    { month: "Nov", steel: 900, copper: 350, aluminum: 180, plastic: 550 },
    { month: "Dec", steel: 680, copper: 250, aluminum: 90, plastic: 800 },
    { month: "Jan", steel: 810, copper: 320, aluminum: 110, plastic: 750 },
    { month: "Feb", steel: 760, copper: 147, aluminum: 32, plastic: 1300 },
];

export const categoryData = [
    { name: "Steel", value: 38, color: "#3B82F6" },
    { name: "Copper", value: 22, color: "#06B6D4" },
    { name: "Aluminum", value: 12, color: "#8B5CF6" },
    { name: "Plastic", value: 15, color: "#10B981" },
    { name: "Others", value: 13, color: "#F59E0B" },
];

export const usedMaterialsData = [
    { month: "Sep 2025", material: "Steel", used: 320, unit: "Kg" },
    { month: "Sep 2025", material: "Copper", used: 150, unit: "Mtr" },
    { month: "Oct 2025", material: "Steel", used: 410, unit: "Kg" },
    { month: "Oct 2025", material: "Aluminum", used: 60, unit: "Sht" },
    { month: "Nov 2025", material: "Plastic", used: 500, unit: "Kg" },
    { month: "Nov 2025", material: "Steel", used: 280, unit: "Kg" },
    { month: "Dec 2025", material: "Copper", used: 200, unit: "Mtr" },
    { month: "Dec 2025", material: "Brass", used: 90, unit: "Kg" },
    { month: "Jan 2026", material: "Steel", used: 350, unit: "Kg" },
    { month: "Jan 2026", material: "Plastic", used: 400, unit: "Kg" },
    { month: "Feb 2026", material: "Aluminum", used: 45, unit: "Sht" },
    { month: "Feb 2026", material: "Copper", used: 180, unit: "Mtr" },
];
