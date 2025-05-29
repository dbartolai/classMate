import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './UserContext.tsx'
// import Onboarding from './Onboarding/Onboarding.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </StrictMode>,
)

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Onboarding/>
//   </StrictMode>,
// )
