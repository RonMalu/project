import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Observations from './pages/Observations';
import ObservationForm from './pages/ObservationForm';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/observations"
              element={
                <ProtectedRoute>
                  <Observations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/observations/new"
              element={
                <ProtectedRoute>
                  <ObservationForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/observations/:id/edit"
              element={
                <ProtectedRoute>
                  <ObservationForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
