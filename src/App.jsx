import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from "./routes/ProtectedRoutes"
import ScannerPage from './pages/Scanner'
import Signup from './pages/Signup'
import Navbar from './navbar/Navbar'
function App() {

  return (
    <div className="app-shell">
      <Navbar/>
      <main className="app-content">
        <Routes>
      
      <Route path='/' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route 
      path='/dashboard'
      element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
      <Route 
      path='/scanner'
      element={
        <ProtectedRoute adminOnly={true}>
          <ScannerPage/>
        </ProtectedRoute>
      }/>
      <Route
      path='/admin'
      element={
        <ProtectedRoute adminOnly={true}>
          <AdminDashboard/>
        </ProtectedRoute>
      }/>
    </Routes>
      </main>
    </div>
  )
}

export default App
