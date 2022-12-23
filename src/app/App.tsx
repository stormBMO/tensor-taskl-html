import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouting from './routing/AppRouting';
import Footer from '../components/Footer';
import Header from '../components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouting />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
