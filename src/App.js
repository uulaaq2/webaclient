import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import SignIn from './Pages/SignIn/SignIn'

const App = () =>{
    return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>                    
        </Routes>      
    </Router>        
    )
}

export default App