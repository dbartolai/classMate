import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import GenerateQuiz from './Generate'
import Quiz from './Quiz'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GenerateQuiz/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
