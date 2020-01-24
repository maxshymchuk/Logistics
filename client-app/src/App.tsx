import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  fetch("http://localhost:8888/users", { 
    method: 'GET', 
    mode: 'no-cors',
    credentials: 'same-origin',
  }).then(res => console.log(res))
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
