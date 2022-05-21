import '../../vendor/normalize.css';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../context/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [numberOfCardsToRender, setNumberOfCardsToRender] = useState(0);
  const [numberOfCardsToAdd, setNumberOfCardsToAdd] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const routesForHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const routesForFooter = ['/', '/movies', '/saved-movies'];

  useEffect(() => {
    mainApi.tokenCheck()
      .then(() => {
        setIsLoggedIn(true);
        setIsUserChecked(true);
        console.log('user Checked')
      })
      .catch(err => {
        console.log(err);
        setIsUserChecked(true);
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
        console.log('got current user')
      })
      .catch(err => console.log(err));
  }, [isLoggedIn])

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     return;
  //   }
  //   moviesApi.getMovies()
  //     .then((res) => {
  //       setMovies(res);
  //     })
  //     .catch(err => console.log(err))
  // }, [isLoggedIn])
  // поиск фильмов

  const getMovies = (filterCallback) => {
    return moviesApi.getMovies()
      .then((res) => {
        setMovies(res);
        filterCallback(res);
      })
      .catch(err => console.log(err));
  }

  const handleMoviesSearchSumit = (filterCallback) => {
    getMovies(filterCallback);
  }

  // служебные
  const resizeHandler = () => {
    setTimeout(() => {
      setCurrentWidth(window.innerWidth);
    }, 1000000)

  }

  const handleBurgerMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return window.removeEventListener('resize', resizeHandler);
  }, [])

  useMemo(() => {
    let res;
    let add;
    switch (true) {
      case currentWidth >= 1280:
        res = 12;
        add = 3;
        break;
      case currentWidth >= 768:
        res = 8;
        add = 2;
        break;
      case currentWidth >= 320:
        res = 5;
        add = 2;
        break;
      default:
        res = 6;
        add = 3;
        break;
    }
    console.log(currentWidth);
    setNumberOfCardsToRender(res);
    setNumberOfCardsToAdd(add);
  }, [currentWidth]
  );






  // регистрация и авторизация 
  const handleRegisterSubmit = ({ name, password, email }) => {
    mainApi.register({ name, password, email })
      .then(() => {
        navigate('/signin');
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
  console.log(movies)

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
        {isUserChecked ?
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={isLoggedIn}>
                  <Movies movies={movies}
                    onSearchSubmit={handleMoviesSearchSumit}
                    numberOfCardsToRender={numberOfCardsToRender}
                    numberOfCardsToAdd={numberOfCardsToAdd} />
                </ProtectedRoute>
              } />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={isLoggedIn}>
                  <SavedMovies location={location} />
                </ProtectedRoute>
              } />
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={isLoggedIn}>
                  <Profile loggedIn={isLoggedIn} onExit={handleExit} onUpdateUserInfo={handleUpdateUserInfo} />
                </ProtectedRoute>
              } />
            <Route path='/signup' element={<Register onRegisterSubmit={handleRegisterSubmit} />}></Route>
            <Route path='/signin' element={<Login onLoginSubmit={handleLoginSubmit} />}></Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
          :
          null}
        {routesForFooter.includes(location.pathname) ?
          <Footer />
          : null}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
