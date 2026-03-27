import React from 'react'
import { useState } from 'react'
import api from '../utils/api'
import { Scanner } from '@yudiel/react-qr-scanner'

function ScannerPage() {
    const [result, setResult] = useState('')
    const handleScan = async (data) => {
        if (data) {
            try {
                const res = await api.post("/qr/verify", { token:data })
                setResult(res.data.message)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <section className="page scanner-page">
            <div className="panel scanner-panel">
            <h2>Qr Scanner</h2>
            <p className="page-copy">Scan attendee passes and confirm entry status in real time.</p>

            <div className="scanner-shell">
                <Scanner
                    onScan={handleScan}
                    style={{ width: '100%' }}
                    constraints={{ facingMode: 'environment' }}
                />
            </div>
            {result && <p className="message success-message">{result}</p>}
            </div>
        </section>
    )
}


export default ScannerPage
