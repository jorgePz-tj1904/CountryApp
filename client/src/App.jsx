import Login from './Components/login/Login'
import Home from './Components/home/Home';
import { Route, Routes} from 'react-router-dom';
import Detail from './Components/cards/Detail/Detail';
import Form from './Components/Form/Form';
import Activities from './Components/Activities/Activities';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/create-activity' element={<Form/>}/>
          <Route path='/activities' element={<Activities/>}/>
        </Routes>
      </Provider>
    </>
  )
}

export default App
