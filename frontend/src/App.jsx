import { Routes, Route } from 'react-router-dom';

// --- Import Components ---
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute'; 

// --- Import Pages ---
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import MenuPage from './pages/MenuPage'; 
import AdminMenuPage from './pages/AdminMenuPage'; // <-- 1. IMPORT NEW ADMIN PAGE

function App() {
  return (
    <>
      <Header />
      
      <main className="py-3" style={{ minHeight: '80vh' }}>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/menu" element={<MenuPage />} />
          
          {/* --- Private Routes --- */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/menu" element={<AdminMenuPage />} /> {/* <-- 2. ADD NEW ADMIN ROUTE */}
          </Route>

        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;