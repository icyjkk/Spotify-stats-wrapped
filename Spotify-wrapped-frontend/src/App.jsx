import AuthHandler from "./Auth/AuthHandler";
import { Route, Routes } from 'react-router-dom'
import Dash from "./Dash/Dash";

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthHandler />} />
      <Route path='/dashboard' element={<Dash />} />
    </Routes>
  )
}

export default App
