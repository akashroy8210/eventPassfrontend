import React from 'react'
import { useState ,useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
function Signup() {
    const navigate=useNavigate()
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [error,setError]=useState()

    const handleSignup=async()=>{
        try{
            const res=await api.post("/users/signup",{name,email,password})
            navigate("/login")
        }catch(error){
          setError(error.response.data.message)
            console.log(error)
        }
  }
  return (
    <section className="page auth-page">
      <div className="panel auth-panel">
        {error && <p className="message error-message">{error}</p>}
        <p className="eyebrow">Create Your Pass</p>
        <h2>Signup</h2>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={handleSignup}>Signup</button>
      </div>
    </section>
  )
}

export default Signup
