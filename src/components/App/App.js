import '../../vendor/normalize.css';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Movies from '../Movies/Movies';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const resizeHandler = () => {
    setCurrentWidth(window.innerWidth);
  }

  const handleBurgerMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    console.log(currentWidth);
  }, [currentWidth])


  const location = useLocation();

  return (
    <div className="App">
      <Header 
      location={location} 
      currentWidth={currentWidth} 
      isMobileMenuOpen={isMobileMenuOpen} 
      onBurgerMenuClick={handleBurgerMenuClick}
      onCloseMobileMenu={closeMobileMenu}/>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/movies' element={<Movies location={location}/>}></Route>
        <Route path='/saved-movies' element={<Movies location={location}/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
