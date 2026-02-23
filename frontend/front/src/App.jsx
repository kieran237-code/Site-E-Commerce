import React from 'react'
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
const App = () => {
  return (
    <BrowserRouter>
     <Navbar/>
      <Routes>
        < Route path='/' element={< Home /> } />
        <Route path='/product/:id' element={< ProductDetails/>} />
        <Route path='a-propos' element={<About />} />
        <Route path='/faqs' element= {<FAQs/>} />
        <Route path='/contact' element ={<Contact/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
