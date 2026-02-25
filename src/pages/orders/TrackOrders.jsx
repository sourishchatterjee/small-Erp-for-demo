import { purchaseOrders } from '../../data/data';

const steps = ['Created', 'Approved', 'Shipped', 'Delivered'];

const statusToStep = {
    Draft:     0,
    Pending:   0,
    Approved:  1,
    Shipped:   2,
    Delivered: 3,
    Cancelled: -1,
};

// ── Styles ────────────────────────────────────────────────────
const S = {
    trkWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
    },

    // Page Header
    trkPageHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
    },
    trkPageTitle: {
        fontSize: 22,
        fontWeight: 700,
        color: '#0f172a',
        margin: 0,
        lineHeight: 1.2,
    },
    trkPageSubtitle: {
        fontSize: 13,
        color: '#94a3b8',
        margin: '4px 0 0',
    },

    // Orders list
    trkOrderList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },

    // Card
    trkCard: {
        background: '#ffffff',
        borderRadius: 18,
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        padding: 24,
        transition: 'box-shadow 0.2s',
    },

    // Card header row
    trkCardHeader: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 24,
    },
    trkCardHeaderLeft: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    },
    trkPoId: {
        fontSize: 15,
        fontWeight: 700,
        color: '#0f172a',
        margin: 0,
    },
    trkVendorName: {
        fontSize: 13,
        color: '#94a3b8',
        margin: 0,
    },
    trkCardHeaderRight: {
        textAlign: 'right',
    },
    trkPoTotal: {
        fontSize: 18,
        fontWeight: 800,
        color: '#2563eb',
        margin: 0,
        lineHeight: 1.2,
    },
    trkDeliveryDate: {
        fontSize: 12,
        color: '#94a3b8',
        margin: '3px 0 0',
    },

    // Cancelled banner
    trkCancelledBanner: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 18px',
        background: '#fff1f2',
        border: '1px solid #fecdd3',
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 600,
        color: '#be123c',
    },

    // Stepper row
    trkStepperRow: {
        display: 'flex',
        alignItems: 'center',
    },

    // Each step slot (flex-1 to stretch)
    trkStepSlot: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
    },

    // Step column (dot + label)
    trkStepCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
    },

    // Step dot
    trkStepDotDone: {
        width: 36,
        height: 36,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 700,
        background: '#2563eb',
        border: '2px solid #2563eb',
        color: '#ffffff',
        boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
        flexShrink: 0,
        transition: 'all 0.2s',
    },
    trkStepDotPending: {
        width: 36,
        height: 36,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 700,
        background: '#ffffff',
        border: '2px solid #e2e8f0',
        color: '#94a3b8',
        flexShrink: 0,
        transition: 'all 0.2s',
    },

    // Step label
    trkStepLabelDone: {
        fontSize: 11,
        fontWeight: 600,
        color: '#2563eb',
        whiteSpace: 'nowrap',
    },
    trkStepLabelPending: {
        fontSize: 11,
        fontWeight: 500,
        color: '#94a3b8',
        whiteSpace: 'nowrap',
    },

    // Connector line
    trkConnectorDone: {
        flex: 1,
        height: 3,
        background: '#3b82f6',
        borderRadius: 999,
        margin: '0 8px',
        marginBottom: 22, // nudge up to align with dot center
    },
    trkConnectorPending: {
        flex: 1,
        height: 3,
        background: '#e2e8f0',
        borderRadius: 999,
        margin: '0 8px',
        marginBottom: 22,
    },
};

// ── Component ─────────────────────────────────────────────────
export default function TrackOrders() {
    return (
        <div className="trk-wrapper" style={S.trkWrapper}>

            {/* ── Page Header ── */}
            <div className="trk-page-header" style={S.trkPageHeader}>
                <div className="trk-page-heading">
                    <h1 className="trk-page-title"   style={S.trkPageTitle}>Track Orders</h1>
                    <p className="trk-page-subtitle" style={S.trkPageSubtitle}>
                        Monitor purchase order delivery progress
                    </p>
                </div>
            </div>

            {/* ── Orders List ── */}
            <div className="trk-order-list" style={S.trkOrderList}>
                {purchaseOrders.map((po) => {
                    const currentStep = statusToStep[po.status] ?? 0;
                    const isCancelled = po.status === 'Cancelled';

                    return (
                        <div
                            className="trk-card"
                            key={po.id}
                            style={S.trkCard}
                            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(59,130,246,0.09)')}
                            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)')}
                        >
                            {/* ── Card Header ── */}
                            <div className="trk-card-header" style={S.trkCardHeader}>
                                <div className="trk-card-header-left" style={S.trkCardHeaderLeft}>
                                    <h3 className="trk-po-id"      style={S.trkPoId}>{po.id}</h3>
                                    <p className="trk-vendor-name" style={S.trkVendorName}>{po.vendor}</p>
                                </div>
                                <div className="trk-card-header-right" style={S.trkCardHeaderRight}>
                                    <p className="trk-po-total"      style={S.trkPoTotal}>
                                        ₹{po.total.toLocaleString('en-IN')}
                                    </p>
                                    <p className="trk-delivery-date" style={S.trkDeliveryDate}>
                                        Delivery: {po.deliveryDate}
                                    </p>
                                </div>
                            </div>

                            {/* ── Cancelled ── */}
                            {isCancelled ? (
                                <div className="trk-cancelled-banner" style={S.trkCancelledBanner}>
                                    ❌ This order has been cancelled
                                </div>
                            ) : (
                                /* ── Stepper ── */
                                <div className="trk-stepper-row" style={S.trkStepperRow}>
                                    {steps.map((step, i) => {
                                        const done   = i <= currentStep;
                                        const isLast = i === steps.length - 1;

                                        return (
                                            <div
                                                className="trk-step-slot"
                                                key={step}
                                                style={S.trkStepSlot}
                                            >
                                                {/* Dot + Label */}
                                                <div className="trk-step-col" style={S.trkStepCol}>
                                                    <div
                                                        className={done ? 'trk-step-dot-done' : 'trk-step-dot-pending'}
                                                        style={done ? S.trkStepDotDone : S.trkStepDotPending}
                                                    >
                                                        {done ? '✓' : i + 1}
                                                    </div>
                                                    <span
                                                        className={done ? 'trk-step-label-done' : 'trk-step-label-pending'}
                                                        style={done ? S.trkStepLabelDone : S.trkStepLabelPending}
                                                    >
                                                        {step}
                                                    </span>
                                                </div>

                                                {/* Connector */}
                                                {!isLast && (
                                                    <div
                                                        className={i < currentStep ? 'trk-connector-done' : 'trk-connector-pending'}
                                                        style={i < currentStep ? S.trkConnectorDone : S.trkConnectorPending}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
