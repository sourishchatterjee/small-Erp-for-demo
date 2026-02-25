import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineBell, HiOutlineLogout } from 'react-icons/hi';

const pageTitles = {
    '/': 'Dashboard',
    '/stocks': 'Stock Management',
    '/master/material-type': 'Material Types',
    '/master/product': 'Products',
    '/master/unit': 'Units',
    '/master/vendor': 'Vendors',
    '/orders/create-po': 'Create Purchase Order',
    '/orders/purchase-orders': 'Purchase Orders',
    '/orders/track': 'Track Orders',
    '/reports/vendor': 'Vendor Report',
    '/reports/purchase': 'Purchase Report',
    '/reports/stock': 'Stock Report',
    '/reports/monthly': 'Monthly Report',
    '/reports/used-materials': 'Used Materials Report',
    '/reports/date-wise': 'Date Wise Report',
    '/reports/lowest-stock': 'Lowest Stock Report',
};

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const title = pageTitles[location.pathname] || 'Purchase ERP';

    const handleLogout = () => {
        localStorage.removeItem('erp_auth');
        navigate('/login');
    };

    return (
        <header
            style={{ height: 'var(--navbar-height)', left: 'var(--sidebar-width)' }}
            className="fixed top-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6"
        >
            <div>
                <h2 className="text-lg font-bold text-slate-800">{title}</h2>
                <p className="text-xs text-slate-400">
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
            </div>

            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="search-box hidden md:block">
                    <HiOutlineSearch className="search-icon" />
                    <input type="text" placeholder="Search..." />
                </div>

                {/* Notification */}
                <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <HiOutlineBell className="text-xl" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Logout"
                >
                    <HiOutlineLogout className="text-xl" />
                </button>
            </div>
        </header>
    );
}
