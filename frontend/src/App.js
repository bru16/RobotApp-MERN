import { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Redirect, Route, Switch } from "react-router-dom";
import Home from './Components/Home'
import LandingPage from './Components/LandingPage';
import LoginForm from './Components/auth/LoginForm';
import SignupForm from './Components/auth/SignupForm';
import { toast } from 'react-toastify';
import { useAuth } from './context/authContext'
import SingleRobot from './Components/SingleRobot'
import Favorites from './Components/Favorites'
import Loading from './Components/Loading';
import NewRobot from './Components/NewRobot'

function App() {
  const auth = useAuth(); //useContext
  toast.configure() // for notifications
  useEffect(() => {
    const expiryDate = localStorage.getItem('expiryDate');
    if (expiryDate && (Date.now() >= expiryDate)) {
      auth.logout();
    }
  })

  return (
    <div>
      {auth.user ? <Navbar /> : <Redirect to="/" />}
      <Switch>
        <Route exact path="/" component={() => <LandingPage user={auth.user} />} />
        <Route path="/login" component={() => (auth.user ? <Redirect to="/home" /> : <LoginForm />)} />
        <Route path="/signup" component={() => (auth.user ? <Redirect to="/home" /> : <SignupForm />)} />
        <Route path="/home" component={() => (auth.user ? <Home token={auth.user.token} /> : <Redirect to="/login" />)} />
        <Route path="/robot/:id" component={() => (auth.user ? <SingleRobot token={auth.user.token} /> : <Redirect to="/login" />)} />
        <Route path="/favorite" component={() => (auth.user ? <Favorites /> : <Redirect to="/login" />)} />
        <Route path="/new" component={() => (auth.user ? <NewRobot token={auth.user.token} /> : <Redirect to="/login" />)} />
        <Route path="/load" component={Loading} />
      </Switch>
    </div>
  );
}

export default App;
