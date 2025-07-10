import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ImportInspections from './pages/ImportInspections';
import NewImportInspection from './pages/NewImportInspection';
import FarmInspections from './pages/FarmInspections';
import NewFarmInspection from './pages/NewFarmInspection';
import PestSurveillance from './pages/PestSurveillance';
import PublicBooking from './pages/PublicBooking';
import Bookings from './pages/Bookings';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <img 
            src="/BAHFSA APP.png" 
            alt="BAHFSA Logo" 
            className="mx-auto h-16 w-auto mb-4 animate-pulse"
          />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/book-inspection" element={<PublicBooking />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/import-inspections" element={<ImportInspections />} />
                  <Route path="/import-inspections/new" element={<NewImportInspection />} />
                  <Route path="/farm-inspections" element={<FarmInspections />} />
                  <Route path="/farm-inspections/new" element={<NewFarmInspection />} />
                  <Route path="/pest-surveillance" element={<PestSurveillance />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/reports" element={<div className="p-6">Reports - Payment required </div>} />
                  <Route path="/analytics" element={<div className="p-6">Analytics - Payment required</div>} />
                  <Route path="/users" element={<div className="p-6">User Management - Payment required</div>} />
                  <Route path="/settings" element={<div className="p-6">Settings - Payment required</div>} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;