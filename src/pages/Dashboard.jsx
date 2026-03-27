import React, { use } from 'react'
import { useContext, useState,useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import api from '../utils/api'
function Dashboard() {
    const { logout } = useContext(AuthContext)
    const [qrCode, setQrCode] = useState('')
    const [error,setError]=useState()
    const generateQR = async () => {
        try {
            const res =await  api.get("/qr/generate")
            setQrCode(res.data.qr)
        } catch (error) {
            setError(error.response.data.message)
            console.log(error.response.data.message)
        }
    }
  useEffect(() => {
        const interval = setInterval(() => {
            generateQR();
        }, 300000); // 5 min

        return () => clearInterval(interval);
    }, []);
    return (
        <section className="page dashboard-page">
            <div className="panel dashboard-panel">
            {error&& <p className="message error-message">{error}</p>}
            <p className="eyebrow">Attendee Access</p>
            <h2>Dashboard</h2>
            <p className="page-copy">Generate your pass and keep it ready for event entry.</p>
            <div className="action-row">
            <button onClick={generateQR}>Generate QR</button>
            <button onClick={logout} className="secondary-action">Logout</button>
            </div>
            {qrCode && (
                <div className="qr-card">
                    <h3>Your Qr code:</h3>
                    <img src={qrCode} alt="QR code" style={{ width: "250px" }} />
                </div>
            )}
            </div>
        </section>
    )
}

export default Dashboard
