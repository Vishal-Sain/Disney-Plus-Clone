import React from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useNavigate,
} from "react-router-dom";
import Detail from './Components/Detail';
import Login from './Components/Login';


function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <Routes>
        <Route path='/login' element={ <Login />}>
        </Route>
        <Route path='/home'  element={ <Home />}>
        </Route>
        <Route path='/detail/:id' element={ <Detail />}>
        </Route>
        <Route path='*' element={<Login />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
