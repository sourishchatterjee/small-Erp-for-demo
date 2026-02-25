export default function Footer() {
    return (
        <footer
            style={{ marginLeft: 'var(--sidebar-width)' }}
            className="border-t border-slate-200 bg-white/60 backdrop-blur-sm py-4 px-6 flex items-center justify-between text-xs text-slate-400"
        >
            <p>© 2026 Purchase ERP — Stock Management System</p>
            <p>v1.0.0</p>
        </footer>
    );
}
