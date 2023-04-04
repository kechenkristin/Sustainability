import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Chat from "./pages/chat/chat";

function App() {
  return (
      <Router>
        <Routes>
            <Route path = '/react/' element = {<Chat></Chat>}></Route>
        </Routes>
      </Router>
  );
}

export default App;