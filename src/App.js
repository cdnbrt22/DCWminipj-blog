import React from 'react';
import Routes from "./routes";
import Navbar from "./components/Navbar/Navbar";


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
