import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error,setError]=useState()
  const { login } = useContext(AuthContext)
  const handleLogin = async () => {
    try {
      const res = await api.post("/users/login", {  email, password })
      login(res.data.token)
      localStorage.setItem("token",res.data.token)
      if(res.data.role==="admin")
        {navigate("/admin")}
      else{navigate("/dashboard")}
    } catch (err) {
      setError(err.response.data.message)
      console.log(err.response.data.message)
    }
  }
  return (
    <section className="page auth-page">
      <div className="panel auth-panel">
        {error && <p className="message error-message">{error}</p>}
        <p className="eyebrow">Welcome Back</p>
        <h2>Login</h2>
        <label htmlFor="emial">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>login</button>
      </div>
    </section>
  )
}

export default Login

