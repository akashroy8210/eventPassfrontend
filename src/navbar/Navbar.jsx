import React from 'react'
import {Link} from "react-router-dom"
function Navbar() {
  return (
    <header className="site-header">
      <h1 className="site-title">Event Pass</h1>
      <nav className="site-nav">
        <Link to='/login' >Login</Link>
        <Link to='/' >Signup</Link>
        <Link to="/admin">Admin Login</Link>
        <Link to='/scanner' >Scanner</Link>
        <Link to='/dashboard' >Dashboard</Link>
      </nav>
    </header>
  )
}

export default Navbar
