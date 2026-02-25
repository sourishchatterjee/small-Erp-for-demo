// import { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import {
//     HiOutlineViewGrid,
//     HiOutlineCube,
//     HiOutlineClipboardList,
//     HiOutlineDocumentReport,
//     HiOutlineChevronDown,
//     HiOutlineChevronUp,
//     HiOutlineDatabase,
//     HiOutlineTruck,
//     HiOutlineTag,
//     HiOutlineColorSwatch,
//     HiOutlineScale,
//     HiOutlineDocumentAdd,
//     HiOutlineDocumentText,
//     HiOutlineEye,
//     HiOutlineChartBar,
//     HiOutlineCalendar,
//     HiOutlineTrendingDown,
//     HiOutlineCog,
//     HiOutlineQuestionMarkCircle,
//     HiOutlineLogout,
// } from 'react-icons/hi';

// // ── Menu Config ───────────────────────────────────────────────
// const menuSections = [
//     {
//         items: [
//             { title: 'Dashboard', path: '/', icon: HiOutlineViewGrid },
//         ],
//     },
//     {
//         label: 'Inventory',
//         items: [
//             {
//                 title: 'Master',
//                 icon: HiOutlineDatabase,
//                 children: [
//                     { title: 'Product', path: '/master/product', icon: HiOutlineCube },
//                     { title: 'Unit',    path: '/master/unit',    icon: HiOutlineScale },
//                     { title: 'Vendor',  path: '/master/vendor',  icon: HiOutlineTruck },
//                     {title:"AddStore",  path:"master/addstore",icon: HiOutlineDocumentAdd},
//                 ],
//             },
//             { title: 'Stocks', path: '/stocks', icon: HiOutlineTag },
//         ],
//     },
//     {
//         label: 'Procurement',
//         items: [
//             {
//                 title: 'Orders',
//                 icon: HiOutlineClipboardList,
//                 children: [
//                     { title: 'Create PO',       path: '/orders/create-po',       icon: HiOutlineDocumentAdd },
//                     { title: 'Purchase Orders', path: '/orders/purchase-orders', icon: HiOutlineDocumentText },
//                     // { title: 'Track Orders',    path: '/orders/track',           icon: HiOutlineEye },
//                 ],
//             },
//         ],
//     },
//     {
//         label: 'Analytics',
//         items: [
//             {
//                 title: 'Reports',
//                 icon: HiOutlineDocumentReport,
//                 children: [
//                     { title: 'Vendor Report',   path: '/reports/vendor',         icon: HiOutlineTruck },
//                     { title: 'Purchase Report', path: '/reports/purchase',       icon: HiOutlineChartBar },
//                     { title: 'Stock Report',    path: '/reports/stock',          icon: HiOutlineCube },
//                     { title: 'Monthly Report',  path: '/reports/monthly',        icon: HiOutlineCalendar },
//                     { title: 'Used Materials',  path: '/reports/used-materials', icon: HiOutlineColorSwatch },
//                     { title: 'Date Wise',       path: '/reports/date-wise',      icon: HiOutlineCalendar },
//                     { title: 'Lowest Stock',    path: '/reports/lowest-stock',   icon: HiOutlineTrendingDown },
//                 ],
//             },
//         ],
//     },
// ];

// const bottomItems = [
//     // { title: 'Settings', path: '/settings', icon: HiOutlineCog },
//     // { title: 'Help',     path: '/help',     icon: HiOutlineQuestionMarkCircle },
//     { title: 'Logout',   path: '/logout',   icon: HiOutlineLogout },
// ];

// // ── Styles ────────────────────────────────────────────────────
// const S = {

//     // Blue dot for active child — visible on white background
//     sideActiveDot: {
//         width: 8,
//         height: 8,
//         borderRadius: '50%',
//         background: '#2563eb',
//         flexShrink: 0,
//     },

//     // Invisible placeholder dot to keep alignment on inactive children
//     sideDotPlaceholder: {
//         width: 8,
//         height: 8,
//         flexShrink: 0,
//     },

//     sideAside: {
//         width: 'var(--sidebar-width, 280px)',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         zIndex: 40,
//         display: 'flex',
//         flexDirection: 'column',
//         background: '#ffffff',
//         borderRight: '1px solid #e5e7eb',
//     },

//     // Logo
//     sideLogoWrap: {
//         height: 72,
//         display: 'flex',
//         alignItems: 'center',
//         gap: 14,
//         padding: '0 24px',
//         borderBottom: '1px solid #e5e7eb',
//         flexShrink: 0,
//     },
//     sideLogoBox: {
//         width: 40,
//         height: 40,
//         background: '#2563eb',
//         borderRadius: 8,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: '#fff',
//         fontWeight: 700,
//         fontSize: 14,
//         flexShrink: 0,
//         userSelect: 'none',
//     },
//     sideLogoTitle: {
//         fontSize: 17,
//         fontWeight: 700,
//         color: '#1f2937',
//         lineHeight: 1.2,
//         margin: 0,
//     },
//     sideLogoSub: {
//         fontSize: 11,
//         color: '#3b82f6',
//         fontWeight: 600,
//         letterSpacing: '0.12em',
//         textTransform: 'uppercase',
//         margin: 0,
//     },

//     // Nav
//     sideNav: {
//         flex: 1,
//         overflowY: 'auto',
//         overflowX: 'hidden',
//     },
//     sideSectionWrap: {},
//     sideSectionDivider: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: 8,
//         margin: '12px 24px 4px',
//     },
//     sideSectionLabel: {
//         fontSize: 11,
//         fontWeight: 700,
//         color: '#9ca3af',
//         textTransform: 'uppercase',
//         letterSpacing: '0.12em',
//         whiteSpace: 'nowrap',
//     },
//     sideSectionLine: {
//         flex: 1,
//         height: 1,
//         background: '#f3f4f6',
//     },
//     sideSectionList: {
//         margin: '0 0 4px',
//         padding: 0,
//         listStyle: 'none',
//     },

//     // Nav item (leaf)
//     sideNavItem: (isActive) => ({
//         display: 'flex',
//         alignItems: 'center',
//         gap: 16,
//         padding: '13px 24px',
//         fontSize: 15,
//         fontWeight: 500,
//         color: isActive ? '#ffffff' : '#4b5563',
//         background: isActive ? '#2563eb' : 'transparent',
//         textDecoration: 'none',
//         transition: 'background 0.1s, color 0.1s',
//         cursor: 'pointer',
//     }),
//     sideNavItemHover: {
//         background: '#eff6ff',
//         color: '#1d4ed8',
//     },
//     sideNavIcon: (isActive) => ({
//         fontSize: 22,
//         flexShrink: 0,
//         color: isActive ? '#ffffff' : '#9ca3af',
//     }),
//     sideNavLabel: {
//         flex: 1,
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap',
//     },

//     // Group parent button
//     sideGroupBtn: (isActive, isOpen) => ({
//         width: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         gap: 16,
//         padding: '13px 24px',
//         fontSize: 15,
//         fontWeight: 500,
//         color: isActive ? '#ffffff' : isOpen ? '#1d4ed8' : '#4b5563',
//         background: isActive ? '#2563eb' : isOpen ? '#eff6ff' : 'transparent',
//         border: 'none',
//         cursor: 'pointer',
//         textAlign: 'left',
//         transition: 'background 0.1s, color 0.1s',
//     }),
//     sideGroupIcon: (isActive, isOpen) => ({
//         fontSize: 22,
//         flexShrink: 0,
//         color: isActive ? '#ffffff' : isOpen ? '#2563eb' : '#9ca3af',
//     }),
//     sideGroupLabel: {
//         flex: 1,
//         textAlign: 'left',
//     },
//     sideChevron: (isActive) => ({
//         fontSize: 16,
//         flexShrink: 0,
//         color: isActive ? '#ffffff' : '#9ca3af',
//     }),

//     // Children list
//     sideChildList: {
//         margin: 0,
//         padding: 0,
//         listStyle: 'none',
//         background: '#f9fafb',
//         borderTop: '1px solid #f3f4f6',
//         borderBottom: '1px solid #f3f4f6',
//     },

//     // Child item — light blue bg + blue text when active (NO solid fill)
//     sideChildItem: (isActive) => ({
//         display: 'flex',
//         alignItems: 'center',
//         gap: 12,
//         paddingTop: 10,
//         paddingBottom: 10,
//         paddingLeft: 52,
//         paddingRight: 24,
//         fontSize: 14,
//         fontWeight: isActive ? 600 : 500,
//         color: isActive ? '#2563eb' : '#6b7280',
//         background: isActive ? '#eff6ff' : 'transparent',
//         textDecoration: 'none',
//         transition: 'background 0.1s, color 0.1s',
//     }),
//     sideChildIcon: (isActive) => ({
//         fontSize: 17,
//         flexShrink: 0,
//         color: isActive ? '#2563eb' : '#9ca3af',
//     }),
//     sideChildLabel: {
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap',
//     },

//     // Bottom section
//     sideBottomWrap: {
//         flexShrink: 0,
//         borderTop: '1px solid #e5e7eb',
//     },
//     sideBottomDivider: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: 8,
//         margin: '12px 24px 4px',
//     },
//     sideBottomLabel: {
//         fontSize: 11,
//         fontWeight: 700,
//         color: '#9ca3af',
//         textTransform: 'uppercase',
//         letterSpacing: '0.12em',
//     },
//     sideBottomLine: {
//         flex: 1,
//         height: 1,
//         background: '#f3f4f6',
//     },
//     sideBottomList: {
//         margin: 0,
//         padding: '0 0 16px',
//         listStyle: 'none',
//     },
//     sideBottomItem: (isActive, isLogout) => ({
//         display: 'flex',
//         alignItems: 'center',
//         gap: 16,
//         padding: '13px 24px',
//         fontSize: 15,
//         fontWeight: 500,
//         color: isActive ? '#ffffff' : isLogout ? '#ef4444' : '#4b5563',
//         background: isActive ? '#2563eb' : 'transparent',
//         textDecoration: 'none',
//         transition: 'background 0.1s, color 0.1s',
//         cursor: 'pointer',
//     }),
//     sideBottomIcon: (isActive, isLogout) => ({
//         fontSize: 22,
//         flexShrink: 0,
//         color: isActive ? '#ffffff' : isLogout ? '#f87171' : '#9ca3af',
//     }),
// };

// // ── Hover helper ──────────────────────────────────────────────
// function useHover() {
//     const [hovered, setHovered] = useState(false);
//     return {
//         hovered,
//         onMouseEnter: () => setHovered(true),
//         onMouseLeave: () => setHovered(false),
//     };
// }

// // ── NavItem (leaf) ────────────────────────────────────────────
// function NavItem({ item }) {
//     const Icon = item.icon;
//     const { hovered, onMouseEnter, onMouseLeave } = useHover();

//     return (
//         <NavLink
//             to={item.path}
//             end
//             style={({ isActive }) => ({
//                 ...S.sideNavItem(isActive),
//                 ...(hovered && !isActive ? S.sideNavItemHover : {}),
//             })}
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//         >
//             {({ isActive }) => (
//                 <>
//                     <Icon style={S.sideNavIcon(isActive)} />
//                     <span style={S.sideNavLabel}>{item.title}</span>
//                 </>
//             )}
//         </NavLink>
//     );
// }

// // ── Child NavLink — blue dot only when active ─────────────────
// function ChildNavLink({ child, ChildIcon }) {
//     const { hovered, onMouseEnter, onMouseLeave } = useHover();

//     return (
//         <NavLink
//             to={child.path}
//             end
//             style={({ isActive }) => ({
//                 ...S.sideChildItem(isActive),
//                 ...(hovered && !isActive
//                     ? { background: '#f0f9ff', color: '#1d4ed8' }
//                     : {}),
//             })}
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//         >
//             {({ isActive }) => (
//                 <>
//                     {/* Dot: blue when active, invisible placeholder when not */}
//                     <span style={isActive ? S.sideActiveDot : S.sideDotPlaceholder} />

//                     <ChildIcon style={S.sideChildIcon(isActive)} />

//                     <span style={S.sideChildLabel}>{child.title}</span>
//                 </>
//             )}
//         </NavLink>
//     );
// }

// // ── GroupItem (has children) ──────────────────────────────────
// function GroupItem({ item, expanded, onToggle }) {
//     const location = useLocation();
//     const Icon = item.icon;
//     const isOpen = expanded[item.title] ?? false;
//     const parentActive = item.children?.some((c) => location.pathname === c.path);
//     const { hovered, onMouseEnter, onMouseLeave } = useHover();

//     return (
//         <li>
//             <button
//                 onClick={() => onToggle(item.title)}
//                 onMouseEnter={onMouseEnter}
//                 onMouseLeave={onMouseLeave}
//                 style={{
//                     ...S.sideGroupBtn(parentActive, isOpen),
//                     ...(hovered && !parentActive && !isOpen
//                         ? { background: '#eff6ff', color: '#1d4ed8' }
//                         : {}),
//                 }}
//             >
//                 <Icon style={S.sideGroupIcon(parentActive, isOpen)} />
//                 <span style={S.sideGroupLabel}>{item.title}</span>
//                 {isOpen
//                     ? <HiOutlineChevronUp  style={S.sideChevron(parentActive)} />
//                     : <HiOutlineChevronDown style={S.sideChevron(parentActive)} />
//                 }
//             </button>

//             {isOpen && (
//                 <ul style={S.sideChildList}>
//                     {item.children.map((child) => {
//                         const ChildIcon = child.icon;
//                         return (
//                             <li key={child.path}>
//                                 <ChildNavLink child={child} ChildIcon={ChildIcon} />
//                             </li>
//                         );
//                     })}
//                 </ul>
//             )}
//         </li>
//     );
// }

// // ── Bottom NavLink ────────────────────────────────────────────
// function BottomNavLink({ item, Icon, isLogout }) {
//     const { hovered, onMouseEnter, onMouseLeave } = useHover();
//     return (
//         <NavLink
//             to={item.path}
//             style={({ isActive }) => ({
//                 ...S.sideBottomItem(isActive, isLogout),
//                 ...(hovered && !isActive
//                     ? {
//                         background: isLogout ? '#fff1f2' : '#eff6ff',
//                         color: isLogout ? '#dc2626' : '#1d4ed8',
//                       }
//                     : {}),
//             })}
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//         >
//             {({ isActive }) => (
//                 <>
//                     <Icon style={S.sideBottomIcon(isActive, isLogout)} />
//                     <span>{item.title}</span>
//                 </>
//             )}
//         </NavLink>
//     );
// }

// // ── Sidebar ───────────────────────────────────────────────────
// export default function Sidebar() {
//     const location = useLocation();

//     const getDefaultExpanded = () => {
//         const state = {};
//         menuSections.forEach((section) => {
//             section.items.forEach((item) => {
//                 if (item.children?.some((c) => location.pathname.startsWith(c.path))) {
//                     state[item.title] = true;
//                 }
//             });
//         });
//         return state;
//     };

//     const [expanded, setExpanded] = useState(getDefaultExpanded);

//     const toggleExpand = (title) =>
//         setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));

//     return (
//         <aside style={S.sideAside}>

//             {/* ── Logo ── */}
//             <div style={S.sideLogoWrap}>
//                 <div style={S.sideLogoBox}>PE</div>
//                 <div>
//                     <h1 style={S.sideLogoTitle}>Purchase ERP</h1>
//                     <p style={S.sideLogoSub}>Stock Management</p>
//                 </div>
//             </div>

//             {/* ── Nav ── */}
//             <nav style={S.sideNav}>
//                 {menuSections.map((section, sIdx) => (
//                     <div key={sIdx} style={S.sideSectionWrap}>
//                         {sIdx > 0 && (
//                             <div style={S.sideSectionDivider}>
//                                 {section.label && (
//                                     <span style={S.sideSectionLabel}>{section.label}</span>
//                                 )}
//                                 <div style={S.sideSectionLine} />
//                             </div>
//                         )}
//                         <ul style={S.sideSectionList}>
//                             {section.items.map((item) =>
//                                 item.children ? (
//                                     <GroupItem
//                                         key={item.title}
//                                         item={item}
//                                         expanded={expanded}
//                                         onToggle={toggleExpand}
//                                     />
//                                 ) : (
//                                     <li key={item.path}>
//                                         <NavItem item={item} />
//                                     </li>
//                                 )
//                             )}
//                         </ul>
//                     </div>
//                 ))}
//             </nav>

//             {/* ── Bottom system section ── */}
//             <div style={S.sideBottomWrap}>
//                 <div style={S.sideBottomDivider}>
//                     <span style={S.sideBottomLabel}>System</span>
//                     <div style={S.sideBottomLine} />
//                 </div>
//                 <ul style={S.sideBottomList}>
//                     {bottomItems.map((item) => {
//                         const Icon = item.icon;
//                         const isLogout = item.title === 'Logout';
//                         return (
//                             <li key={item.path}>
//                                 <BottomNavLink item={item} Icon={Icon} isLogout={isLogout} />
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </div>
//         </aside>
//     );
// }
























import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineClipboardList,
    HiOutlineDocumentReport,
    HiOutlineChevronDown,
    HiOutlineChevronUp,
    HiOutlineDatabase,
    HiOutlineTruck,
    HiOutlineTag,
    HiOutlineColorSwatch,
    HiOutlineScale,
    HiOutlineDocumentAdd,
    HiOutlineDocumentText,
    HiOutlineEye,
    HiOutlineChartBar,
    HiOutlineCalendar,
    HiOutlineTrendingDown,
    HiOutlineCog,
    HiOutlineQuestionMarkCircle,
    HiOutlineLogout,
    HiOutlineArchive,
    HiOutlineExclamation,
    HiOutlineMinusCircle,
} from 'react-icons/hi';

// ── Menu Config ───────────────────────────────────────────────
const menuSections = [
    {
        items: [
            { title: 'Dashboard', path: '/', icon: HiOutlineViewGrid },
        ],
    },
    {
        label: 'Inventory',
        items: [
            {
                title: 'Master',
                icon: HiOutlineDatabase,
                children: [
                    { title: 'Product',   path: '/master/product',   icon: HiOutlineCube },
                    { title: 'Unit',      path: '/master/unit',      icon: HiOutlineScale },
                    { title: 'Vendor',    path: '/master/vendor',    icon: HiOutlineTruck },
                    { title: 'Add Store', path: '/master/addstore',  icon: HiOutlineDocumentAdd },
                ],
            },
            {
                title: 'Stocks',
                icon: HiOutlineArchive,
                children: [
                    { title: 'All Stocks', path: '/stocks',           icon: HiOutlineTag },
                    { title: 'Low Stock',  path: 'stocks/lowest-stock', icon: HiOutlineTrendingDown },
                    { title: 'Stock Out',  path: 'stocks/stock-out', icon: HiOutlineMinusCircle },
                ],
            },
        ],
    },
    {
        label: 'Procurement',
        items: [
            {
                title: 'Orders',
                icon: HiOutlineClipboardList,
                children: [
                    { title: 'Create PO',       path: '/orders/create-po',       icon: HiOutlineDocumentAdd },
                    { title: 'Purchase Orders', path: '/orders/purchase-orders', icon: HiOutlineDocumentText },
                ],
            },
        ],
    },
    {
        label: 'Analytics',
        items: [
            {
                title: 'Reports',
                icon: HiOutlineDocumentReport,
                children: [
                    { title: 'Vendor Report',   path: '/reports/vendor',         icon: HiOutlineTruck },
                    { title: 'Purchase Report', path: '/reports/purchase',       icon: HiOutlineChartBar },
                    { title: 'Stock Report',    path: '/reports/stock',          icon: HiOutlineCube },
                    { title: 'Monthly Report',  path: '/reports/monthly',        icon: HiOutlineCalendar },
                    { title: 'Used Materials',  path: '/reports/used-materials', icon: HiOutlineColorSwatch },
                    { title: 'Date Wise',       path: '/reports/date-wise',      icon: HiOutlineCalendar },
                    { title: 'Lowest Stock',    path: '/reports/lowest-stock',   icon: HiOutlineTrendingDown },
                ],
            },
        ],
    },
];

const bottomItems = [
    { title: 'Logout', path: '/logout', icon: HiOutlineLogout },
];

// ── Styles ────────────────────────────────────────────────────
const S = {
    sideActiveDot: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#2563eb',
        flexShrink: 0,
    },
    sideDotPlaceholder: {
        width: 8,
        height: 8,
        flexShrink: 0,
    },
    sideAside: {
        width: 'var(--sidebar-width, 280px)',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        borderRight: '1px solid #e5e7eb',
    },
    sideLogoWrap: {
        height: 72,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '0 24px',
        borderBottom: '1px solid #e5e7eb',
        flexShrink: 0,
    },
    sideLogoBox: {
        width: 40,
        height: 40,
        background: '#2563eb',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 700,
        fontSize: 14,
        flexShrink: 0,
        userSelect: 'none',
    },
    sideLogoTitle: {
        fontSize: 17,
        fontWeight: 700,
        color: '#1f2937',
        lineHeight: 1.2,
        margin: 0,
    },
    sideLogoSub: {
        fontSize: 11,
        color: '#3b82f6',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        margin: 0,
    },
    sideNav: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    sideSectionWrap: {},
    sideSectionDivider: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        margin: '12px 24px 4px',
    },
    sideSectionLabel: {
        fontSize: 11,
        fontWeight: 700,
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        whiteSpace: 'nowrap',
    },
    sideSectionLine: {
        flex: 1,
        height: 1,
        background: '#f3f4f6',
    },
    sideSectionList: {
        margin: '0 0 4px',
        padding: 0,
        listStyle: 'none',
    },
    sideNavItem: (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '13px 24px',
        fontSize: 15,
        fontWeight: 500,
        color: isActive ? '#ffffff' : '#4b5563',
        background: isActive ? '#2563eb' : 'transparent',
        textDecoration: 'none',
        transition: 'background 0.1s, color 0.1s',
        cursor: 'pointer',
    }),
    sideNavItemHover: {
        background: '#eff6ff',
        color: '#1d4ed8',
    },
    sideNavIcon: (isActive) => ({
        fontSize: 22,
        flexShrink: 0,
        color: isActive ? '#ffffff' : '#9ca3af',
    }),
    sideNavLabel: {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    sideGroupBtn: (isActive, isOpen) => ({
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '13px 24px',
        fontSize: 15,
        fontWeight: 500,
        color: isActive ? '#ffffff' : isOpen ? '#1d4ed8' : '#4b5563',
        background: isActive ? '#2563eb' : isOpen ? '#eff6ff' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background 0.1s, color 0.1s',
    }),
    sideGroupIcon: (isActive, isOpen) => ({
        fontSize: 22,
        flexShrink: 0,
        color: isActive ? '#ffffff' : isOpen ? '#2563eb' : '#9ca3af',
    }),
    sideGroupLabel: {
        flex: 1,
        textAlign: 'left',
    },
    sideChevron: (isActive) => ({
        fontSize: 16,
        flexShrink: 0,
        color: isActive ? '#ffffff' : '#9ca3af',
    }),
    sideChildList: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
        background: '#f9fafb',
        borderTop: '1px solid #f3f4f6',
        borderBottom: '1px solid #f3f4f6',
    },
    sideChildItem: (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 52,
        paddingRight: 24,
        fontSize: 14,
        fontWeight: isActive ? 600 : 500,
        color: isActive ? '#2563eb' : '#6b7280',
        background: isActive ? '#eff6ff' : 'transparent',
        textDecoration: 'none',
        transition: 'background 0.1s, color 0.1s',
    }),
    sideChildIcon: (isActive) => ({
        fontSize: 17,
        flexShrink: 0,
        color: isActive ? '#2563eb' : '#9ca3af',
    }),
    sideChildLabel: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },

    // Special badge for low stock / stock out warning indicators
    sideChildBadge: (variant) => ({
        marginLeft: 'auto',
        fontSize: 10,
        fontWeight: 700,
        borderRadius: 99,
        padding: '2px 7px',
        flexShrink: 0,
        ...(variant === 'warning'
            ? { background: '#fef3c7', color: '#d97706', border: '1px solid #fde68a' }
            : variant === 'danger'
            ? { background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' }
            : {}),
    }),

    sideBottomWrap: {
        flexShrink: 0,
        borderTop: '1px solid #e5e7eb',
    },
    sideBottomDivider: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        margin: '12px 24px 4px',
    },
    sideBottomLabel: {
        fontSize: 11,
        fontWeight: 700,
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
    },
    sideBottomLine: {
        flex: 1,
        height: 1,
        background: '#f3f4f6',
    },
    sideBottomList: {
        margin: 0,
        padding: '0 0 16px',
        listStyle: 'none',
    },
    sideBottomItem: (isActive, isLogout) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '13px 24px',
        fontSize: 15,
        fontWeight: 500,
        color: isActive ? '#ffffff' : isLogout ? '#ef4444' : '#4b5563',
        background: isActive ? '#2563eb' : 'transparent',
        textDecoration: 'none',
        transition: 'background 0.1s, color 0.1s',
        cursor: 'pointer',
    }),
    sideBottomIcon: (isActive, isLogout) => ({
        fontSize: 22,
        flexShrink: 0,
        color: isActive ? '#ffffff' : isLogout ? '#f87171' : '#9ca3af',
    }),
};

// ── Badge config for special child items ──────────────────────
const CHILD_BADGES = {
    '/stocks/low-stock': { label: 'Low',  variant: 'warning' },
    '/stocks/stock-out': { label: 'Out',  variant: 'danger'  },
};

// ── Hover helper ──────────────────────────────────────────────
function useHover() {
    const [hovered, setHovered] = useState(false);
    return {
        hovered,
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
    };
}

// ── NavItem (leaf) ────────────────────────────────────────────
function NavItem({ item }) {
    const Icon = item.icon;
    const { hovered, onMouseEnter, onMouseLeave } = useHover();
    return (
        <NavLink
            to={item.path}
            end
            style={({ isActive }) => ({
                ...S.sideNavItem(isActive),
                ...(hovered && !isActive ? S.sideNavItemHover : {}),
            })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {({ isActive }) => (
                <>
                    <Icon style={S.sideNavIcon(isActive)} />
                    <span style={S.sideNavLabel}>{item.title}</span>
                </>
            )}
        </NavLink>
    );
}

// ── Child NavLink ─────────────────────────────────────────────
function ChildNavLink({ child, ChildIcon }) {
    const { hovered, onMouseEnter, onMouseLeave } = useHover();
    const badge = CHILD_BADGES[child.path];

    return (
        <NavLink
            to={child.path}
            end
            style={({ isActive }) => ({
                ...S.sideChildItem(isActive),
                ...(hovered && !isActive
                    ? { background: '#f0f9ff', color: '#1d4ed8' }
                    : {}),
            })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {({ isActive }) => (
                <>
                    <span style={isActive ? S.sideActiveDot : S.sideDotPlaceholder} />
                    <ChildIcon style={S.sideChildIcon(isActive)} />
                    <span style={S.sideChildLabel}>{child.title}</span>
                    {badge && (
                        <span style={S.sideChildBadge(badge.variant)}>
                            {badge.label}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );
}

// ── GroupItem (has children) ──────────────────────────────────
function GroupItem({ item, expanded, onToggle }) {
    const location = useLocation();
    const Icon = item.icon;
    const isOpen = expanded[item.title] ?? false;
    const parentActive = item.children?.some((c) => location.pathname === c.path);
    const { hovered, onMouseEnter, onMouseLeave } = useHover();

    return (
        <li>
            <button
                onClick={() => onToggle(item.title)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{
                    ...S.sideGroupBtn(parentActive, isOpen),
                    ...(hovered && !parentActive && !isOpen
                        ? { background: '#eff6ff', color: '#1d4ed8' }
                        : {}),
                }}
            >
                <Icon style={S.sideGroupIcon(parentActive, isOpen)} />
                <span style={S.sideGroupLabel}>{item.title}</span>
                {isOpen
                    ? <HiOutlineChevronUp  style={S.sideChevron(parentActive)} />
                    : <HiOutlineChevronDown style={S.sideChevron(parentActive)} />
                }
            </button>

            {isOpen && (
                <ul style={S.sideChildList}>
                    {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                            <li key={child.path}>
                                <ChildNavLink child={child} ChildIcon={ChildIcon} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}

// ── Bottom NavLink ────────────────────────────────────────────
function BottomNavLink({ item, Icon, isLogout }) {
    const { hovered, onMouseEnter, onMouseLeave } = useHover();
    return (
        <NavLink
            to={item.path}
            style={({ isActive }) => ({
                ...S.sideBottomItem(isActive, isLogout),
                ...(hovered && !isActive
                    ? {
                        background: isLogout ? '#fff1f2' : '#eff6ff',
                        color: isLogout ? '#dc2626' : '#1d4ed8',
                      }
                    : {}),
            })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {({ isActive }) => (
                <>
                    <Icon style={S.sideBottomIcon(isActive, isLogout)} />
                    <span>{item.title}</span>
                </>
            )}
        </NavLink>
    );
}

// ── Sidebar ───────────────────────────────────────────────────
export default function Sidebar() {
    const location = useLocation();

    const getDefaultExpanded = () => {
        const state = {};
        menuSections.forEach((section) => {
            section.items.forEach((item) => {
                if (item.children?.some((c) => location.pathname.startsWith(c.path))) {
                    state[item.title] = true;
                }
            });
        });
        return state;
    };

    const [expanded, setExpanded] = useState(getDefaultExpanded);

    const toggleExpand = (title) =>
        setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));

    return (
        <aside style={S.sideAside}>

            {/* ── Logo ── */}
            <div style={S.sideLogoWrap}>
                <div style={S.sideLogoBox}>PE</div>
                <div>
                    <h1 style={S.sideLogoTitle}>Purchase ERP</h1>
                    <p style={S.sideLogoSub}>Stock Management</p>
                </div>
            </div>

            {/* ── Nav ── */}
            <nav style={S.sideNav}>
                {menuSections.map((section, sIdx) => (
                    <div key={sIdx} style={S.sideSectionWrap}>
                        {sIdx > 0 && (
                            <div style={S.sideSectionDivider}>
                                {section.label && (
                                    <span style={S.sideSectionLabel}>{section.label}</span>
                                )}
                                <div style={S.sideSectionLine} />
                            </div>
                        )}
                        <ul style={S.sideSectionList}>
                            {section.items.map((item) =>
                                item.children ? (
                                    <GroupItem
                                        key={item.title}
                                        item={item}
                                        expanded={expanded}
                                        onToggle={toggleExpand}
                                    />
                                ) : (
                                    <li key={item.path}>
                                        <NavItem item={item} />
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* ── Bottom system section ── */}
            <div style={S.sideBottomWrap}>
                <div style={S.sideBottomDivider}>
                    <span style={S.sideBottomLabel}>System</span>
                    <div style={S.sideBottomLine} />
                </div>
                <ul style={S.sideBottomList}>
                    {bottomItems.map((item) => {
                        const Icon = item.icon;
                        const isLogout = item.title === 'Logout';
                        return (
                            <li key={item.path}>
                                <BottomNavLink item={item} Icon={Icon} isLogout={isLogout} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}