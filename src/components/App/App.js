import '../../vendor/normalize.css';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../context/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const routesForHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const routesForFooter = ['/', '/movies', '/saved-movies'];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    mainApi.tokenCheck()
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem('token');
      })
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    mainApi.getUserData()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
  }, [isLoggedIn])

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



  const handleRegisterSubmit = ({ name, password, email }) => {
    mainApi.register({ name, password, email })
      .then(() => {
        navigate('/signin', { replace: true })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleLoginSubmit = ({ password, email }) => {
    mainApi.login({ password, email })
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleExit = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setCurrentUser({});
  }

  const handleUpdateUserInfo = ({ name, email }) => {
    mainApi.editUserData({ name, email })
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {routesForHeader.includes(location.pathname) ?
          <Header
            location={location}
            currentWidth={currentWidth}
            isMobileMenuOpen={isMobileMenuOpen}
            onBurgerMenuClick={handleBurgerMenuClick}
            onCloseMobileMenu={closeMobileMenu} />
          : null}
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/movies' element={<Movies location={location} />}></Route>
          <Route path='/saved-movies' element={<SavedMovies location={location} />}></Route>
          <Route path='/profile' element={<Profile loggedIn={isLoggedIn} onExit={handleExit} onUpdateUserInfo={handleUpdateUserInfo} />}></Route>
          <Route path='/signup' element={<Register onRegisterSubmit={handleRegisterSubmit} />}></Route>
          <Route path='/signin' element={<Login onLoginSubmit={handleLoginSubmit} />}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
        {routesForFooter.includes(location.pathname) ?
          <Footer />
          : null}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
