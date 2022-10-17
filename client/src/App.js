import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PolicyBooking from './pages/PolicyBooking'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import UserBookings from './pages/UserBookings';
import AddPolicy from './pages/AddPolicy';
import AdminHome from './pages/AdminHome';
import EditPolicy from './pages/EditPolicy';
import 'antd/dist/antd.min.css';
function App() {
  const ProtectedRoute=()=>{
    return localStorage.getItem('user')?<Home />:<Navigate to='/login'/>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<ProtectedRoute />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/userbookings' element={<UserBookings />} />
          <Route exact path='/booking/:policyid' element={<PolicyBooking />} />
          <Route exact path='/addpolicy' element={<AddPolicy />} />
          <Route exact path='/editpolicy/:policyid' element={<EditPolicy />} />
          <Route exact path='/admin' element={<AdminHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
