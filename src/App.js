import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Caesar from './components/caesar';
import Home from './components/home';
import Mcd from './components/mcd';
import NavBar from './layouts/navbar';
import AffineCaesar from './components/affineCaesar';
import Tcr from './components/teoremaChinoResiduo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <NavBar /> }>
            <Route index element={ <Home /> } />
            <Route path='caesar' element={ <Caesar /> } />
            <Route path='mcd' element={ <Mcd /> } />
            <Route path='affineCaesar' element={ <AffineCaesar /> } />
            <Route path='tcr' element={ <Tcr /> } />
            <Route path='*' element={ <Navigate replace to="/"/> }/>
          </Route>
        </Routes> 
        </BrowserRouter>
    </div>
  );
}

export default App;
