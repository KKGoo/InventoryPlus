import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./components/login";
import "./styles/global.css";
import Home from "./pages/home";
import PrivateRoute from "./components/common/protectedRoute";
import EnterpriseInventory from './pages/inventory';

function App() {

  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/home' element={<PrivateRoute/>}>
            <Route exact path='/home' element={<Home/>}/>
          </Route>
          <Route exact path='/inventory' element={<PrivateRoute/>}>
            <Route exact path='/inventory:nit' element={<EnterpriseInventory/>}/>
          </Route>
          <Route exact path='/' element={<LogIn/>}/>
        </Routes>
      </Fragment>
    </Router>
    
  );
}

export default App;
