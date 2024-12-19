import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import NewMovie from './pages/NewMovie';
import EditMovie from './pages/EditMovie';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="login" replace />} />
          <Route path='login' element={<Login />}/>
          <Route path='/movies' element={<ProtectedRoute><Layout />
          </ProtectedRoute>}>
            {/* <Route path='/app' element={<Navigate to="/app/dashboard" />}> */}
              <Route path="/movies" element={<Dashboard />}/>
              <Route path="/movies/new" element={<NewMovie />}/>
              <Route path="/movies/:id/edit" element={<EditMovie />}/>
            {/* </Route> */}
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
