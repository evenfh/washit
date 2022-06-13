import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import MyReservations from './components/MyReservations';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservasjoner" element={<MyReservations />} />
      </Routes>
    </div>
  );
}

export default App;
