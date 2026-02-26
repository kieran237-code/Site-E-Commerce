import React from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Admin from './pages/Amin';
import Login from './pages/connexion';
import SearchResults from './pages/SearchResults';

// --- COMPOSANT DE PROTECTION ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken'); 
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const hideOnRoutes = ['/admin', '/connexion'];
  const shouldHide = hideOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Navbar />}
      {children}
      {!shouldHide && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/search" element={<SearchResults />} />
          <Route path='/' element={<Home />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path='/a-propos' element={<About />} />
          <Route path='/faqs' element={<FAQs />} />
          <Route path='/contact' element={<Contact />} />
          
          {/* ROUTE PROTÉGÉE  */}
          <Route 
            path='/admin' 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
          
          <Route path='/connexion' element={<Login />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  )
}

export default App;