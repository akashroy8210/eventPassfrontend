import React from 'react'
import { useState } from 'react'
import api from '../utils/api'
import { Scanner } from '@yudiel/react-qr-scanner'
import {useNavigate} from 'react-router-dom'

function ScannerPage() {
    const navigate=useNavigate()
    const [result, setResult] = useState('')
    const [error, setError] = useState('')
    const [lastScanned,setLastScanned]=useState('')
    const handleScan = async (token) => {
        if(!token|| token===lastScanned) return 
        try{
            setLastScanned(token)
            setError('')
            const res=await api.post('/qr/verify',{token})
            setResult(res.data.message)
            navigate('/admin')
        }catch(error){
            setResult("")
            setError(error.response.data.message)
            console.log(error.response.data.message)
        }
    }
    return (
        <section className="page scanner-page">
            <div className="panel scanner-panel">
            <h2>Qr Scanner</h2>
            <p className="page-copy">Scan attendee passes and confirm entry status in real time.</p>

            <div className="scanner-shell">
                <Scanner
                    onScan={(detectedCodes)=>{
                        const token=detectedCodes?.[0]?.rawValue
                        console.log('SCANNED:',token,detectedCodes)
                        if(token){
                            setResult("")
                            setError("")
                            handleScan(token)
                        }
                    }}
                    onError={(err)=>{
                        console.log(err)
                        setError(err?.message|| 'camera/scanner error')
                    }}
                
                    style={{ width: '100%' }}
                    constraints={{ facingMode: 'environment' }}
                />
            </div>
            {result && <p className="message success-message">{result}</p>}
            {error && <p className="message error-message">{error}</p>}
            </div>
        </section>
    )
}


export default ScannerPage
