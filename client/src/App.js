// import {Routes, Route, Link, BrowserRouter} from 'react-router-dom';
// import Login from './components/Auth/Login'
// import Register from './components/Auth/Register'
// import Home from './components/Home/Home'
// import About from './components/About/About'
// import Navbar from './components/Nav/Navbar'
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//       </BrowserRouter>
//     </div>
    
//   );
// }

// export default App;
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Service from './components/Service/Service';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route path="/home" element={<ProtectedRoute element={Home} />} />
            <Route path="/about" element={<ProtectedRoute element={About} />} />
            <Route path="/services" element={<ProtectedRoute element={Service} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
