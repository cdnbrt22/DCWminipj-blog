import React from 'react';
import Routes from './routes';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Navbar/Footer';


function App() {
  return (
    <div className="App">
     
      <main>
        {/* <Navbar /> */}
        <Routes />
      </main>
      <Footer />
    </div>
    
  );
}

export default App;
