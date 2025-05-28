import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import LandingPage from './LandingPage/LandingPage'
import Onboarding from './Onboarding/Onboarding'
import ProtectedRoute from './ProtectedRoute'

function App() {

  return (
    <>
      <Router>
        <Routes>

          {/* PUBLIC PAGES */}
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          {/* PROTECTED PAGES */}
          <Route element={<ProtectedRoute/>}>
            <Route path="/welcome" element={<Onboarding/>}/>
            <Route path="/dashboard" element={
              <div>
                <h1> Logged in successfully </h1>
                
              </div>
              }/>
          </Route>


          <Route path="/*" element={<h1>404 Not Found</h1>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
