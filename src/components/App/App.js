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
import { CurrentUserContext } from '../../context/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [numberOfCardsToRender, setNumberOfCardsToRender] = useState(0);
  const [numberOfCardsToAdd, setNumberOfCardsToAdd] = useState(0);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isRequestOk, setIsRequestOk] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const routesForHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const routesForFooter = ['/', '/movies', '/saved-movies'];

  useEffect(() => {
    if (localStorage.getItem('token')) {
      mainApi.tokenCheck()
        .then(() => {
          setIsLoggedIn(true);
          setIsUserChecked(true);
          console.log('эффект check token')
        })
        .catch(err => {
          console.log(err);
          localStorage.removeItem('token');
        })
    } else {
      setIsUserChecked(true);
    }
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    Promise.all([mainApi.getUserData(), mainApi.getSavedMovies()])
      .then(([user, movies]) => {
        setCurrentUser(user);
        console.log('got current user', user)
        setSavedMovies(movies.filter((item) => item.owner === user._id));
        setSavedMoviesIds(movies.filter((item) => item.owner === user._id).map(item => item.movieId));
        console.log('got saved movies', movies.filter((item) => item.owner === user._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }, [isLoggedIn])

  // поиск фильмов

  const getMovies = (filterCallback) => {
    setIsDataLoading(true);
    return moviesApi.getMovies()
      .then((res) => {
        setMovies(res);
        filterCallback(res);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsDataLoading(false)
      })
  }

  const handleMoviesSearchSumit = (filterCallback) => {
    getMovies(filterCallback);
  }

  // служебные
  const resizeHandler = () => {
    setTimeout(() => {
      setCurrentWidth(window.innerWidth);
    }, 6000)
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
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

  // сохранение карточек 
  const handleSaveMovies = (movie) => {
    return mainApi.addMovieToSaved(movie)
      .then((newMovie) => {
        console.log(newMovie);
        setSavedMovies([newMovie, ...savedMovies]);
        setSavedMoviesIds([newMovie.movieId, ...savedMoviesIds])
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleDeleteMoviesFromSaved = (movie) => {
    return mainApi.deleteFromSaved(movie)
      .then((res) => {
        console.log(res);
        setSavedMovies(state => state.filter(el => el._id !== res._id));
        setSavedMoviesIds(state => state.filter(el => el !== res.movieId));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleDislikeMovie = (id) => {
    const movieToDelete = savedMovies.find((el) => el.movieId === id);
    handleDeleteMoviesFromSaved(movieToDelete);
  }
  // регистрация и авторизация 

  const handleInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(false);
    setIsRequestOk(false);
  }
  const handleRegisterSubmit = ({ name, password, email }) => {
    mainApi.register({ name, password, email })
      .then(() => {
        handleLoginSubmit({ password: password, email: email });
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
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
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }

  const handleExit = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.clear();
    setCurrentUser({});
  }

  const handleUpdateUserInfo = ({ name, email }) => {
    mainApi.editUserData({ name, email })
      .then((res) => {
        setIsRequestOk(!isRequestOk);
        setIsInfoTooltipOpen(true);
        setCurrentUser(res);

      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }
  console.log(movies)

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {isUserChecked ?
          <>
            {routesForHeader.includes(location.pathname) ?
              <Header
                loggedIn={isLoggedIn} />
              : null}
            <Routes>
              <Route path='/' element={<Main />}></Route>
              <Route
                path="/movies"
                element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                    <Movies movies={movies}
                      onSearchSubmit={handleMoviesSearchSumit}
                      numberOfCardsToRender={numberOfCardsToRender}
                      numberOfCardsToAdd={numberOfCardsToAdd}
                      onSaveMovie={handleSaveMovies}
                      onDeleteMovie={handleDeleteMoviesFromSaved}
                      savedMoviesIds={savedMoviesIds}
                      onDislikeMovie={handleDislikeMovie}
                      isDataLoading={isDataLoading}
                      isRequestOk={isRequestOk}
                      isInfoTooltipOpen={isInfoTooltipOpen}
                      onCloseInfoTooltip={handleInfoTooltipOpen} />
                  </ProtectedRoute>
                } />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                    <SavedMovies savedMovies={savedMovies}
                      onDeleteMovie={handleDeleteMoviesFromSaved}
                      savedMoviesIds={savedMoviesIds}
                      isDataLoading={isDataLoading} />
                  </ProtectedRoute>
                } />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                    <Profile loggedIn={isLoggedIn}
                      onExit={handleExit}
                      onUpdateUserInfo={handleUpdateUserInfo}
                      isRequestOk={isRequestOk}
                      isInfoTooltipOpen={isInfoTooltipOpen}
                      onCloseInfoTooltip={handleInfoTooltipOpen} />
                  </ProtectedRoute>
                } />
              <Route path='/signup' element={<Register onRegisterSubmit={handleRegisterSubmit}
                isRequestOk={isRequestOk}
                isInfoTooltipOpen={isInfoTooltipOpen}
                onCloseInfoTooltip={handleInfoTooltipOpen} />}></Route>
              <Route path='/signin' element={<Login onLoginSubmit={handleLoginSubmit}
                isRequestOk={isRequestOk}
                isInfoTooltipOpen={isInfoTooltipOpen}
                onCloseInfoTooltip={handleInfoTooltipOpen} />}></Route>
              <Route path='*' element={<PageNotFound />}></Route>
            </Routes>
            {routesForFooter.includes(location.pathname) ?
              <Footer />
              : null}
          </>
          :
          <Preloader />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
