import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import config from './config'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import ChangePassword from './Pages/ChangePassword'
import PageError from './Pages/PageError'
import Public from './Pages/Public'

const App = () =>{
    return (
    <Router>
        <Routes>
          <Route path="/" element={<Home urlInfo={config.urls.home} />}></Route>
          <Route path={config.urls.home.path} element={<Home urlInfo={config.urls.home} />}></Route>
          <Route path={config.urls.user.signIn.path} element={<SignIn urlInfo={config.urls.user.signIn}/>}></Route>                    
          <Route path={config.urls.user.changePassword.path + '/:token'} element={<ChangePassword urlInfo={config.urls.user.changePassword} />}></Route>                                        
          <Route path={config.urls.error.path + '/:message'} element={<PageError urlInfo={config.urls.error}/>}></Route>                              
          <Route path={config.urls.public.path} element={<Public urlInfo={config.urls.public} />}></Route>
        </Routes>      
    </Router>        
    )
}

export default App