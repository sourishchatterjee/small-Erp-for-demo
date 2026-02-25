// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
// import loginIllustration from '../assets/login-illustration.png';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPwd, setShowPwd] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userFocus, setUserFocus] = useState(false);
//   const [passFocus, setPassFocus] = useState(false);
//   const [btnHover, setBtnHover] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     setTimeout(() => {
//       if (username === 'admin' && password === 'admin123') {
//         localStorage.setItem('erp_auth', 'true');
//         navigate('/');
//       } else {
//         setError('Invalid credentials. Try admin / admin123');
//       }
//       setLoading(false);
//     }, 800);
//   };

//   return (
//     <>
//       <style>{`
//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.88); }
//           to   { opacity: 1; transform: scale(1); }
//         }
//         @keyframes spinLoader {
//           to { transform: rotate(360deg); }
//         }
//         @keyframes pulse-ring {
//           0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.35), 0 0 0 0 rgba(255,255,255,0.15); }
//           70%  { box-shadow: 0 0 0 14px rgba(255,255,255,0), 0 0 0 28px rgba(255,255,255,0); }
//           100% { box-shadow: 0 0 0 0 rgba(255,255,255,0), 0 0 0 0 rgba(255,255,255,0); }
//         }

//         .lp-root {
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: radial-gradient(ellipse at 60% 40%, #c7d9f8 0%, #dde6f5 50%, #e8eef7 100%);
//           padding: 24px;
//           font-family: 'Segoe UI', 'DM Sans', sans-serif;
//         }

//         .lp-card {
//           display: flex;
//           width: 100%;
//           max-width: 980px;
//           min-height: 600px;
//           border-radius: 28px;
//           overflow: hidden;
//           box-shadow:
//             0 32px 80px rgba(30,58,138,0.22),
//             0 8px 32px rgba(30,58,138,0.12);
//           animation: fadeIn 0.5s ease both;
//         }

//         /* ─────────── LEFT PANEL ─────────── */
//         .lp-left {
//           flex: 1.1;
//           position: relative;
//           background: linear-gradient(145deg, #0f2a75 0%, #1d4ed8 45%, #3b82f6 80%, #60a5fa 100%);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 52px 44px 44px;
//           overflow: hidden;
//           gap: 0;
//         }

//         /* decorative blobs */
//         .lp-blob {
//           position: absolute;
//           border-radius: 50%;
//           pointer-events: none;
//         }
//         .lp-blob-1 {
//           width: 380px; height: 380px;
//           bottom: -140px; left: -120px;
//           background: rgba(255,255,255,0.06);
//         }
//         .lp-blob-2 {
//           width: 260px; height: 260px;
//           top: -90px; right: -70px;
//           background: rgba(255,255,255,0.05);
//         }
//         .lp-blob-3 {
//           width: 160px; height: 160px;
//           top: 50%; left: -40px;
//           background: rgba(255,255,255,0.04);
//         }

//         /* image ring */
//         .lp-img-outer {
//           position: relative;
//           z-index: 2;
//           width: 340px;
//           height: 340px;
//           border-radius: 50%;
//           border: 3px solid rgba(255,255,255,0.9);
//           background: rgba(255,255,255,0.1);
//           backdrop-filter: blur(4px);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 36px;
//           flex-shrink: 0;
//           animation: scaleIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both,
//                      pulse-ring 3s ease-in-out 1s infinite;
//         }

//         /* second ring layer */
//         .lp-img-outer::before {
//           content: '';
//           position: absolute;
//           inset: -10px;
//           border-radius: 50%;
//           border: 1.5px solid rgba(255,255,255,0.25);
//           pointer-events: none;
//         }
//         /* third ring layer */
//         .lp-img-outer::after {
//           content: '';
//           position: absolute;
//           inset: -22px;
//           border-radius: 50%;
//           border: 1px solid rgba(255,255,255,0.1);
//           pointer-events: none;
//         }

//         .lp-img {
//           width: 90%;
//           height: 90%;
//           object-fit: contain;
//           display: block;
//           filter: drop-shadow(0 12px 36px rgba(15,42,117,0.4));
//           border-radius: 50%;
//         }

//         /* text */
//         .lp-left-heading {
//           position: relative;
//           z-index: 2;
//           font-size: 27px;
//           font-weight: 800;
//           color: #000000;
//           text-align: center;
//           letter-spacing: -0.5px;
//           line-height: 1.25;
//           margin-bottom: 12px;
//           animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both;
//         }
//         .lp-left-sub {
//           position: relative;
//           z-index: 2;
//           font-size: 14px;
//           font-weight: 500;
//           color: #0f172a;
//           text-align: center;
//           line-height: 1.7;
//           max-width: 280px;
//           animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both;
//         }

//         /* ─────────── RIGHT PANEL ─────────── */
//         .lp-right {
//           width: 400px;
//           flex-shrink: 0;
//           background: #ffffff;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           padding: 52px 44px;
//           animation: fadeIn 0.6s ease 0.2s both;
//         }

//         .lp-right-heading {
//           font-size: 24px;
//           font-weight: 800;
//           color: #1e293b;
//           margin-bottom: 4px;
//           letter-spacing: -0.4px;
//         }
//         .lp-right-sub {
//           font-size: 13px;
//           color: #94a3b8;
//           margin-bottom: 36px;
//         }

//         .lp-field {
//           margin-bottom: 20px;
//         }
//         .lp-label {
//           display: block;
//           font-size: 11px;
//           font-weight: 700;
//           color: #64748b;
//           text-transform: uppercase;
//           letter-spacing: 0.8px;
//           margin-bottom: 8px;
//         }
//         .lp-input-wrap {
//           position: relative;
//         }
//         .lp-input-icon {
//           position: absolute;
//           left: 14px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #94a3b8;
//           font-size: 17px;
//           pointer-events: none;
//           display: flex;
//           align-items: center;
//         }
//         .lp-input {
//           width: 100%;
//           padding: 12px 44px;
//           border: 1.5px solid #e2e8f0;
//           border-radius: 11px;
//           font-size: 14px;
//           color: #1e293b;
//           background: #f8fafc;
//           outline: none;
//           transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
//           font-family: inherit;
//         }
//         .lp-input:focus {
//           border-color: #2563eb;
//           box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
//           background: #ffffff;
//         }
//         .lp-eye-btn {
//           position: absolute;
//           right: 13px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #94a3b8;
//           font-size: 17px;
//           padding: 3px;
//           display: flex;
//           align-items: center;
//           transition: color 0.15s;
//         }
//         .lp-eye-btn:hover { color: #475569; }

//         .lp-error {
//           background: #fef2f2;
//           border: 1px solid #fecaca;
//           color: #dc2626;
//           font-size: 13px;
//           padding: 10px 14px;
//           border-radius: 10px;
//           margin-bottom: 18px;
//         }

//         .lp-btn {
//           width: 100%;
//           padding: 14px;
//           background: linear-gradient(135deg, #0f2a75 0%, #1d4ed8 100%);
//           color: #ffffff;
//           border: none;
//           border-radius: 11px;
//           font-size: 15px;
//           font-weight: 700;
//           cursor: pointer;
//           letter-spacing: 0.3px;
//           box-shadow: 0 4px 18px rgba(29,78,216,0.38);
//           margin-bottom: 22px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
//           font-family: inherit;
//         }
//         .lp-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 28px rgba(29,78,216,0.45);
//         }
//         .lp-btn:disabled { opacity: 0.72; cursor: not-allowed; }

//         .lp-spinner {
//           width: 18px; height: 18px;
//           border: 2.5px solid rgba(255,255,255,0.35);
//           border-top-color: #ffffff;
//           border-radius: 50%;
//           animation: spinLoader 0.75s linear infinite;
//           flex-shrink: 0;
//         }

//         .lp-divider {
//           text-align: center;
//           font-size: 12px;
//           color: #cbd5e1;
//           margin-bottom: 18px;
//           position: relative;
//         }
//         .lp-divider::before,
//         .lp-divider::after {
//           content: '';
//           position: absolute;
//           top: 50%;
//           width: 38%;
//           height: 1px;
//           background: #e2e8f0;
//         }
//         .lp-divider::before { left: 0; }
//         .lp-divider::after  { right: 0; }

//         .lp-demo {
//           background: #f8fafc;
//           border: 1px solid #e2e8f0;
//           border-radius: 10px;
//           padding: 12px 16px;
//           text-align: center;
//         }
//         .lp-demo-label {
//           font-size: 11px;
//           color: #94a3b8;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.6px;
//           margin-bottom: 5px;
//         }
//         .lp-demo-creds {
//           font-size: 13px;
//           font-family: 'Courier New', monospace;
//           color: #334155;
//           font-weight: 700;
//           background: rgba(29,78,216,0.07);
//           padding: 4px 12px;
//           border-radius: 6px;
//           display: inline-block;
//         }
//       `}</style>

//       <div className="lp-root">
//         <div className="lp-card">

//           {/* ── LEFT ── */}
//           <div className="lp-left">
//             <div className="lp-blob lp-blob-1" />
//             <div className="lp-blob lp-blob-2" />
//             <div className="lp-blob lp-blob-3" />

//             {/* Large centered image with triple ring */}
//             <div className="lp-img-outer">
//               <img
//                 src={loginIllustration}
//                 alt="ERP Illustration"
//                 className="lp-img"
//               />
//             </div>

//             {/* Animated black text */}
//             <h2 className="lp-left-heading">Welcome to TechERP</h2>
//             <p className="lp-left-sub">
//               Manage purchase orders, vendors<br />
//               &amp; inventory — all in one place.
//             </p>
//           </div>

//           {/* ── RIGHT ── */}
//           <div className="lp-right">
//             <h2 className="lp-right-heading">Welcome back!</h2>
//             <p className="lp-right-sub">Sign in to your account</p>

//             <form onSubmit={handleLogin}>
//               {/* Username */}
//               <div className="lp-field">
//                 <label className="lp-label">Email Address</label>
//                 <div className="lp-input-wrap">
//                   <span className="lp-input-icon"><HiOutlineUser /></span>
//                   <input
//                     className="lp-input"
//                     type="text"
//                     value={username}
//                     placeholder="example@email.com"
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="lp-field">
//                 <label className="lp-label">Password</label>
//                 <div className="lp-input-wrap">
//                   <span className="lp-input-icon"><HiOutlineLockClosed /></span>
//                   <input
//                     className="lp-input"
//                     type={showPwd ? 'text' : 'password'}
//                     value={password}
//                     placeholder="Enter your password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="lp-eye-btn"
//                     onClick={() => setShowPwd(!showPwd)}
//                   >
//                     {showPwd ? <HiOutlineEyeOff /> : <HiOutlineEye />}
//                   </button>
//                 </div>
//               </div>

//               {error && <div className="lp-error">{error}</div>}

//               <button
//                 type="submit"
//                 className="lp-btn"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <><div className="lp-spinner" /> Signing in...</>
//                 ) : 'Login Now'}
//               </button>
//             </form>

//             <div className="lp-divider">OR</div>

//             <div className="lp-demo">
//               <p className="lp-demo-label">Demo Credentials</p>
//               <span className="lp-demo-creds">admin / admin123</span>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }





















import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import loginIllustration from '../assets/login-illustration.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('erp_auth', 'true');
        navigate('/');
      } else {
        setError('Invalid credentials. Try admin / admin123');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes lp-fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes lp-slideUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes lp-scaleIn { from { opacity:0; transform:scale(0.93) } to { opacity:1; transform:scale(1) } }
        @keyframes lp-spin    { to   { transform:rotate(360deg) } }
        @keyframes lp-glow {
          0%, 100% { box-shadow: 0 0 0 3px rgba(96,165,250,0.5),  0 0 24px rgba(59,130,246,0.3); }
          50%       { box-shadow: 0 0 0 6px rgba(96,165,250,0.25), 0 0 48px rgba(59,130,246,0.5); }
        }

        /* ── root ── */
        .lp-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 55% 40%, #c3d7f8 0%, #dce8f8 45%, #eaf0fb 100%);
          padding: 10px;
          font-family: 'Segoe UI', 'DM Sans', sans-serif;
          horizontal-scroll
        }

        /* ── card ── */
        .lp-card {
          display: flex;
          width: 100%;
          max-width: 1000px;
          min-height: 620px;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 28px 70px rgba(15,42,117,0.22), 0 6px 24px rgba(15,42,117,0.1);
          animation: lp-fadeIn 0.5s ease both;
        }

        /* ═══════════════ LEFT PANEL ═══════════════ */
        .lp-left {
          flex: 1.15;
          position: relative;
          background: linear-gradient(150deg, #0f2a75 0%, #1a47c8 40%, #3b82f6 75%, #60a5fa 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 38px 30px;
          overflow: hidden;
          gap: 18px;
        }

        /* blobs */
        .lp-blob { position:absolute; border-radius:50%; pointer-events:none; }
        .lp-blob-1 { width:360px; height:360px; bottom:-130px; left:-110px; background:rgba(255,255,255,0.05); }
        .lp-blob-2 { width:240px; height:240px; top:-80px;    right:-60px;  background:rgba(255,255,255,0.04); }

        /* ── IMAGE FRAME ── rectangular with blue overlay border */
        .lp-img-frame {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 340px;
          max-hight:70px;
          border-radius: 20px;
          overflow: hidden;
          /* blue border via outline layering */
          border: 3px solid rgba(147,197,253,0.85);
          animation: lp-scaleIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both,
                     lp-glow 3s ease-in-out 1s infinite;
          flex-shrink: 0;
        }

        /* outer glow ring (::before) */
        .lp-img-frame::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 26px;
          border: 1.5px solid rgba(147,197,253,0.35);
          pointer-events: none;
          z-index: 3;
        }

        /* blue overlay on top of image */
        .lp-img-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(29,78,216,0.22) 0%,
            rgba(59,130,246,0.1) 40%,
            rgba(15,42,117,0.28) 100%
          );
          border-radius: 18px;
          pointer-events: none;
          z-index: 2;
        }

        .lp-img-frame img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 18px;
        }

        /* ── left text ── */
        .lp-left-title {
          position: relative;
          z-index: 2;
          font-size: 26px;
          font-weight: 800;
          color: #000000;
          text-align: center;
          letter-spacing: -0.5px;
          line-height: 1.3;
          animation: lp-slideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both;
        }
        .lp-left-sub {
          position: relative;
          z-index: 2;
          font-size: 14px;
          font-weight: 500;
          color: #0f172a;
          text-align: center;
          line-height: 1.7;
          max-width: 300px;
          animation: lp-slideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s both;
        }

        /* ═══════════════ RIGHT PANEL ═══════════════ */
        .lp-right {
          width: 400px;
          flex-shrink: 0;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 52px 44px;
          animation: lp-fadeIn 0.6s ease 0.25s both;
        }

        .lp-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }
        .lp-logo-box {
          width: 38px; height: 38px;
          border-radius: 9px;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: #fff; letter-spacing: 0.3px;
          box-shadow: 0 4px 10px rgba(29,78,216,0.3);
        }
        .lp-logo-name {
          font-size: 19px; font-weight: 800;
          color: #1e293b; letter-spacing: -0.3px;
        }

        .lp-r-heading {
          font-size: 22px; font-weight: 800;
          color: #1e293b; margin-bottom: 4px;
          letter-spacing: -0.4px;
        }
        .lp-r-sub {
          font-size: 13px; color: #94a3b8;
          margin-bottom: 30px;
        }

        .lp-field { margin-bottom: 18px; }
        .lp-label {
          display: block;
          font-size: 11px; font-weight: 700;
          color: #64748b; text-transform: uppercase;
          letter-spacing: 0.8px; margin-bottom: 7px;
        }
        .lp-input-wrap { position: relative; }
        .lp-input-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%);
          color: #94a3b8; font-size: 17px;
          pointer-events: none;
          display: flex; align-items: center;
        }
        .lp-input {
          width: 100%;
          padding: 11px 42px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px; color: #1e293b;
          background: #f8fafc; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: inherit;
        }
        .lp-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.11);
          background: #fff;
        }
        .lp-eye {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #94a3b8; font-size: 17px; padding: 3px;
          display: flex; align-items: center;
          transition: color 0.15s;
        }
        .lp-eye:hover { color: #475569; }

        .lp-error {
          background: #fef2f2; border: 1px solid #fecaca;
          color: #dc2626; font-size: 13px;
          padding: 10px 14px; border-radius: 9px;
          margin-bottom: 16px;
        }

        .lp-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #0f2a75 0%, #1d4ed8 100%);
          color: #fff; border: none; border-radius: 10px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          letter-spacing: 0.3px;
          box-shadow: 0 4px 16px rgba(29,78,216,0.36);
          margin-bottom: 20px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          font-family: inherit;
        }
        .lp-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(29,78,216,0.42);
        }
        .lp-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .lp-spinner {
          width: 17px; height: 17px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: lp-spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        .lp-divider {
          text-align: center; font-size: 12px;
          color: #cbd5e1; margin-bottom: 16px;
          position: relative;
        }
        .lp-divider::before, .lp-divider::after {
          content: ''; position: absolute;
          top: 50%; width: 38%; height: 1px;
          background: #e2e8f0;
        }
        .lp-divider::before { left: 0; }
        .lp-divider::after  { right: 0; }

        .lp-demo {
          background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 10px; padding: 12px 16px;
          text-align: center;
        }
        .lp-demo-tag {
          font-size: 11px; color: #94a3b8; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.6px;
          margin-bottom: 5px;
        }
        .lp-demo-val {
          font-size: 13px; font-family: 'Courier New', monospace;
          color: #334155; font-weight: 700;
          background: rgba(29,78,216,0.07);
          padding: 4px 12px; border-radius: 6px;
          display: inline-block;
        }
      `}</style>

      <div className="lp-root">
        <div className="lp-card">

          {/* ── LEFT ── */}
          <div className="lp-left">
            <div className="lp-blob lp-blob-1" />
            <div className="lp-blob lp-blob-2" />

            {/* Rectangular image with blue overlay border */}
            <div className="lp-img-frame">
              <img src={loginIllustration} alt="ERP Illustration" />
            </div>

            {/* <h2 className="lp-left-title">Welcome to TechERP</h2> */}
            <p className="lp-left-sub">
              Manage purchase orders, vendors &amp; inventory<br />— all in one place.
            </p>
          </div>

          {/* ── RIGHT ── */}
          <div className="lp-right">
            {/* Logo */}
            <div className="lp-logo-row">
              <div className="lp-logo-box">PE</div>
              <span className="lp-logo-name">TechERP</span>
            </div>

            <h2 className="lp-r-heading">Welcome back!</h2>
            <p className="lp-r-sub">Sign in to your account to continue</p>

            <form onSubmit={handleLogin}>
              <div className="lp-field">
                <label className="lp-label">Email Address</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon"><HiOutlineUser /></span>
                  <input
                    className="lp-input"
                    type="text"
                    value={username}
                    placeholder="example@email.com"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="lp-field">
                <label className="lp-label">Password</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon"><HiOutlineLockClosed /></span>
                  <input
                    className="lp-input"
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="lp-eye" onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
              </div>

              {error && <div className="lp-error">{error}</div>}

              <button type="submit" className="lp-btn" disabled={loading}>
                {loading
                  ? <><div className="lp-spinner" /> Signing in...</>
                  : 'Login Now'}
              </button>
            </form>

            <div className="lp-divider">OR</div>

            <div className="lp-demo">
              <p className="lp-demo-tag">Demo Credentials</p>
              <span className="lp-demo-val">admin / admin123</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}