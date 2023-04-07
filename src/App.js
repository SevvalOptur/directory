import Screen from './components/screen'
import Register from './components/register'
import './assets/css/style.css';
import Login from './components/login'
import Sevval from './components/sevval'


import {Routes, Route, Navigate} from "react-router-dom"


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const token = window.localStorage.getItem("token");

  return (
    <Routes>
      {/* <Route exact path='/' element={isLoggedIn=="true"?<Screen/>:<Login/>} /> */}
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>}  />
      <Route path="/sevval" element={<Sevval/>}  />
      <Route path="/dashboard" element={token?<Screen/>:<Login/>} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>

  );
}

export default App;


