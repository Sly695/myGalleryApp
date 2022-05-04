import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import GalleryScreen from './Screens/GalleryScreen/galleryScreen';
import Home from './Components/Home/Home'
import FeedScreen from './Screens/FeedScreen/FeedScreen';
import MessageScreen from './Screens/MessageScreen/MessageScreen';


//Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import token from './Reducers/token';
import username from './Reducers/username';
import email from './Reducers/email';
import update from './Reducers/update'

const store = createStore(combineReducers({token, username, email, update}))

function App() {

  return (
    <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/gallery' element={<GalleryScreen />} />
            <Route exact path='/message' element={<MessageScreen/>} />
            <Route exact path='/feed' element={<FeedScreen/>} />
          </Routes>
        </Router>
    </Provider>
  );
}

export default App;
