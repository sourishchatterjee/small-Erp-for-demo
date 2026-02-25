import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MaterialType from './pages/master/MaterialType';
import Product from './pages/master/Product';
import Unit from './pages/master/Unit';
import Vendor from './pages/master/Vendor';
import Stock from './pages/Stock';
import CreatePO from './pages/orders/CreatePO';
import PurchaseOrders from './pages/orders/PurchaseOrders';
import TrackOrders from './pages/orders/TrackOrders';
import VendorReport from './pages/reports/VendorReport';
import PurchaseReport from './pages/reports/PurchaseReport';
import StockReport from './pages/reports/StockReport';
import MonthlyReport from './pages/reports/MonthlyReport';
import UsedMaterialsReport from './pages/reports/UsedMaterialsReport';
import DateWiseReport from './pages/reports/DateWiseReport';
import LowestStockReport from './pages/reports/LowestStockReport';
import AddStore from './pages/master/AddStore';

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('erp_auth') === 'true';
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          {/* Master */}
          <Route path="master/material-type" element={<MaterialType />} />
          <Route path="master/product" element={<Product />} />
          <Route path="master/unit" element={<Unit />} />
          <Route path="master/vendor" element={<Vendor />} />
          <Route path='master/addstore' element={<AddStore/>}/>

          
          {/* Stocks */}
          <Route path="stocks" element={<Stock />} />
          {/* Orders */}
          <Route path="orders/create-po" element={<CreatePO />} />
          <Route path="orders/purchase-orders" element={<PurchaseOrders />} />
          <Route path="orders/track" element={<TrackOrders />} />
          {/* Reports */}
          <Route path="reports/vendor" element={<VendorReport />} />
          <Route path="reports/purchase" element={<PurchaseReport />} />
          <Route path="reports/stock" element={<StockReport />} />
          <Route path="reports/monthly" element={<MonthlyReport />} />
          <Route path="reports/used-materials" element={<UsedMaterialsReport />} />
          <Route path="reports/date-wise" element={<DateWiseReport />} />
          <Route path="reports/lowest-stock" element={<LowestStockReport />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}