import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Redirect, Route, Switch, useParams } from "react-router-dom";
import Home from './Components/Home'
import LandingPage from './Components/LandingPage';
import LoginForm from './Components/auth/LoginForm';
import SignupForm from './Components/auth/SignupForm';
import { toast } from 'react-toastify';
import { useAuth } from './context/authContext'
import SingleRobot from './Components/SingleRobot'
import Favorites from './Components/Favorites'
import Loading from './Components/Loading';

function App() {
  const auth = useAuth(); //useContext
  toast.configure() // for notifications
  console.log(auth.user);
  useEffect(() => {
    const expiryDate = localStorage.getItem('expiryDate');
    if (expiryDate && (Date.now() >= expiryDate)) {
      auth.logout();
    }
  })

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={() => (auth.user ? <Redirect to="/home" /> : <LoginForm />)} />
          <Route path="/signup" component={() => (auth.user ? <Redirect to="/home" /> : <SignupForm />)} />
          <Route path="/home" component={() => (auth.user ? <Home token={auth.user.token} /> : <Redirect to="/login" />)} />
          <Route path="/robot/:id" component={() => (auth.user ? <SingleRobot token={auth.user.token} /> : <Redirect to="/login" />)} />
          <Route path="/favorite" component={() => (auth.user ? <Favorites /> : <Redirect to="/login" />)} />
          <Route path="/load" component={Loading} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
