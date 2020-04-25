import React from 'react';


import Navbar from './components/Navbar/Navbar';
import Routes from './routes';



function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes />
      </main>
    </div>
  );
}

export default App;
