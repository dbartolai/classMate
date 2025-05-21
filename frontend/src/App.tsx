import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Generate from './Generate'
import Quiz from './Quiz'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Generate/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
