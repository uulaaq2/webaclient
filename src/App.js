import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import config from './config'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import ChangePassword from './Pages/ChangePassword'

const App = () =>{
    return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path={config.urls.home.path} element={<Home />}></Route>
          <Route path={config.urls.user.signIn.path} element={<SignIn />}></Route>                    
          <Route path={config.urls.user.changePassword.path + '/:token'} element={<ChangePassword />}></Route>                                        
        </Routes>      
    </Router>        
    )
}

export default App