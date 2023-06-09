import React, { useCallback, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Redirect,
  Route
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
//cannot place places/placeId above places/new otherwise every matching request triggers former and never latter.
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  //now this new value will be passed down to all components down here that are interested.

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element = { <Users /> } />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Redirect to="/" />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element = {<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={ <Auth />} />
        <Redirect to="/auth" />
      </Routes>
    );
  }
  //default whenever we are on any route which is not handled before.
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
