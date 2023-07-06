import Login from './Components/login/Login'
import Home from './Components/home/Home';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Detail from './Components/cards/Detail/Detail';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
