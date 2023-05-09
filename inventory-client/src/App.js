import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/login';
import "./styles/global.css"
import Home from './pages/home';


function App() {
  return (
    <Router>
      <div>
       <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/home" element={<Home />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;