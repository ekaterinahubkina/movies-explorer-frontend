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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');
  const [isSearchCheckboxChecked, setIsSearchCheckboxChecked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const routesForHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const routesForFooter = ['/', '/movies', '/saved-movies'];

  useEffect(() => {
    mainApi.tokenCheck()
      .then(() => {
        setIsLoggedIn(true);
        setIsUserChecked(true);
      })
      .catch(err => {
        console.log(err);
        setIsUserChecked(true);
        localStorage.removeItem('token');
      })
  }, [isUserChecked])

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

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    moviesApi.getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch(err => console.log(err))
  }, [isLoggedIn])
  // поиск фильмов

  const handleSearchInputChange = (str) => {
    setSearchMessage(str);
    console.log(searchMessage);
  }

  const handleSearchCheckboxChange = () => {
    setIsSearchCheckboxChecked(!isSearchCheckboxChecked);
  }

  const filterMovies = (arr, str) => {
    let filteredMovies = [];
    filteredMovies = arr.filter((item) => {
      const nameRuToLowerCase = item.nameRU.toLowerCase();
      const searchMessageToLowerCase = str.toLowerCase();
      return nameRuToLowerCase.includes(searchMessageToLowerCase);
    })
    return isSearchCheckboxChecked ?
      filteredMovies.filter((item) => {
        return item.duration <= 40;
      })
      :
      filteredMovies;
  }

  const handleMoviesSearchSumit = () => {
    setFilteredMovies(filterMovies(movies, searchMessage));
  }
  console.log(filteredMovies);

  // служебные
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
  console.log(filteredMovies);
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
        {isUserChecked ?
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={isLoggedIn}>
                  <Movies movies={filteredMovies}
                    location={location}
                    searchMessage={searchMessage}
                    onSearchInputChange={handleSearchInputChange}
                    onSearchSubmit={handleMoviesSearchSumit}
                    isSearchCheckboxChecked={isSearchCheckboxChecked}
                    onSearchCheckboxChange={handleSearchCheckboxChange} />
                </ProtectedRoute>
              } />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={isLoggedIn}>
                  <SavedMovies location={location} searchMessage={searchMessage} onSearchInputChange={handleSearchInputChange} />
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
