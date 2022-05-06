import '../../vendor/normalize.css';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import Movies from '../Movies/Movies';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      <Header location={location}/>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/movies' element={<Movies />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
