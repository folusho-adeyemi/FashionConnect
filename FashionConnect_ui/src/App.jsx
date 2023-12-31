import './App.css';
import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main'
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';
import EditProfile from './components/EditProfile/EditProfile';
import ProfileView from './components/ProfileView/ProfileView';
import Collections from './components/Collections/Collections';
import CreateCollection from './components/CreateCollection/CreateCollection';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ConfirmToken from './components/ConfirmToken/ConfirmToken';

function App() {

  useEffect(() => {
    // To Initialize the Facebook SDK with my App ID
    window.fbAsyncInit = function() {
      FB.init({
        appId: '198473312947810',
        xfbml: true,
        version: 'v12.0'
      });
    };

    // To Load the Facebook SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const [user, setUser] = useState(() => {
    try {
      // Retrieve the user data from storage or set it to null if not found
      const storedUser = localStorage.getItem('user');

      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      throw error

    }
  })
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  const userId = user ? user.id : null

  return (
    <div className="app">
      <UserContext.Provider value={{ user, updateUser }}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={ <Main /> } /> */}
            <Route path="/" element={user ? <Main userId={userId} /> : <LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/profile" element={user ? <ProfileView user={user} /> : null} />
            <Route path="/collections/:userId" element={user ? <Collections userId={userId} /> : null} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/newcollection" element={user ? <CreateCollection userId={userId} /> : null} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={user ? <ConfirmToken email={user.email} /> : null} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
