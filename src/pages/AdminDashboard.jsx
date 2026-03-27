import React from 'react'
import { useEffect,useState } from "react";
import api from "../utils/api"
function AdminDashboard() {
    const [logs ,setLogs]=useState([])
    const fetchLogs=async()=>{
        try{
            const res=await api.get("/admin/scanlogs")
            setLogs(res.data.logs)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchLogs()
    },[])
  return (
    <section className="page admin-page">
      <div className="panel admin-panel">
      <p className="eyebrow">Control Room</p>
      <h2>Admin Dashboard</h2>
      <div className="table-shell">
      <table>
        <thead>
            <tr>
                <th>User</th>
                <th>Email</th>
                <th>Status</th>
                <th>Scanned By</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody>
            {logs.map((log)=>{
                return (
                    <tr key={log._id}>
                    <td>{log.userId?.name}</td>
                    <td>{log.userId?.email}</td>
                    <td>{log.status}</td>
                    <td>{log.scannedBy?.name}</td>   
                    <td>{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
                )
                
            })}
        </tbody>
      </table>
      </div>
      </div>
    </section>
  )
}

export default AdminDashboard
