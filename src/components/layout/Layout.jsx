import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className="min-h-screen bg-[#f0f4fb]">
            <Sidebar />
            <Navbar />
            <main
                style={{
                    marginLeft: 'var(--sidebar-width)',
                    marginTop: 'var(--navbar-height)',
                }}
                className="p-6 min-h-[calc(100vh-var(--navbar-height)-60px)]"
            >
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
