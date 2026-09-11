import './App.css';

import Navbar from './components/Navbar/Navbar';

import Home from './Pages/Home/Home.jsx';
import About from './Pages/About/About.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import Favorites from './Pages/Favorites/Favorites.jsx';

import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* STARTING PAGE */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />


        {/* LOGIN PAGE */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* REGISTER PAGE */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* HOME PAGE */}

        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <>
                <Navbar />
                <Home />
              </>
            </ProtectedRoutes>
          }
        />


        {/* ABOUT PAGE */}

        <Route
          path="/about"
          element={
            <ProtectedRoutes>
              <>
                <Navbar />
                <About />
              </>
            </ProtectedRoutes>
          }
        />


        {/* CONTACT PAGE */}

        <Route
          path="/contact"
          element={
            <ProtectedRoutes>
              <>
                <Navbar />
                <Contact />
              </>
            </ProtectedRoutes>
          }
        />


        {/* FAVORITES PAGE */}

        <Route
          path="/favs"
          element={
            <ProtectedRoutes>
              <>
                <Navbar />
                <Favorites />
              </>
            </ProtectedRoutes>
          }
        />


        {/* ANY UNKNOWN URL */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;