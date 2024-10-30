import "./App.css";
import Register from "../components/authentication/Registration";
import Login from "../components/authentication/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import { useEffect, useState } from "react";


function App() {

  const [login, setLogin] = useState(false)

  useEffect(()=>{
    console.log(localStorage.getItem('expense-tracker-token'))
    if (localStorage.getItem('expense-tracker-token')){
      setLogin(true)
    }
  }, [])

  return (
    <div>
      {login ? <Dashboard /> : 
      <Routes>
      <Route path="*" element={<Navigate to={"/login"} />} />
      <Route path="/login" element={<Login />} key={"login-page"} />
      <Route path="/register" element={<Register />} key={"register-page"} />
    </Routes>
    }
    </div>
  );
}

export default App;
