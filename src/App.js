import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import config from './config'
import PHome from './Pages/PHome'
import PSignIn from './Pages/PSignIn'
import PChangePassword from './Pages/PChangePassword'
import PPageError from './Pages/PPageError'
import PPublic from './Pages/PPublic'
import CAppNavBar from "./Components/CAppNavbar"

const aaa = () => {
  return (
    <Routes>
      <Route path={config.urls.user.signIn.path} element={<PSignIn urlInfo={config.urls.user.signIn}/>}></Route>                    
      <Route path={config.urls.user.changePassword.path + '/:token'} element={<PChangePassword urlInfo={config.urls.user.changePassword} />}></Route>                                        
      <Route path={config.urls.error.path + '/:message'} element={<PPageError urlInfo={config.urls.error}/>}></Route>                              
    </Routes>
  )
}

const bbb = () => {
  return (
    <Routes>
        <Route element={<CAppNavBar />}></Route>        
        <Route path="/" element={<PHome urlInfo={config.urls.home} />}></Route>
        <Route path={config.urls.home.path} element={<PHome urlInfo={config.urls.home} />}></Route>
        <Route path={config.urls.public.path} element={<PPublic urlInfo={config.urls.public} />}></Route>
    </Routes>
  )
}  

const App = () =>{

  return (    
    <Router>     

      <Routes>
        <Route path={config.urls.user.signIn.path} element={<PSignIn urlInfo={config.urls.user.signIn}/>}></Route>                    
        <Route path={config.urls.user.changePassword.path + '/:token'} element={<PChangePassword urlInfo={config.urls.user.changePassword} />}></Route>                                        
        <Route path={config.urls.error.path + '/:message'} element={<PPageError urlInfo={config.urls.error}/>}></Route>                              

        <Route index path="/" element={<PHome urlInfo={config.urls.home} />}></Route>
        <Route path={config.urls.public.path} element={<PPublic urlInfo={config.urls.public} />}></Route>
      </Routes>      

    </Router>        
    )
}

export default App