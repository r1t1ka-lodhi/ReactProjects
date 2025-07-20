import './App.css'
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthService from './appwrite/auth.js';
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/footer.jsx';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    AuthService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);


  return !loading ? 
  <div className='min-h-screen flex flex-wrap 
  content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
        TODO:<Outlet />
      </main>
      <Footer />
      <h1></h1>
    </div>
  </div> : null
    

}

export default App
