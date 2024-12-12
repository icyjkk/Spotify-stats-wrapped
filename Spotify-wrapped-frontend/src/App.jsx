import AuthHandler from "./Auth/AuthHandler";
import Dash from "./Dash/Dash";
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthHandler />} />
      <Route path='/dashboard' element={<Dash />} />
    </Routes>
  )
}

export default App
