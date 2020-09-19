import React from "react";
import "./css/App.css";


const Header = () => (
  <div className='header grid'>
    <h1 className='title'>Jiffy</h1>
  </div>
)

function App() {
  return (
    <div className="page">
      <Header />
    </div>
  );
}

export default App;
