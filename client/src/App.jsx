
import Navbar from './components/Navbar'
import './index.css'
import Main from './pages/Main';

import {BrowserRouter,Route,Routes} from 'react-router-dom';
function App() {

  return (
<BrowserRouter>
<Routes>
  <Route  path='/' element={<Main/>}/>
</Routes>
</BrowserRouter>
      
  )
}

export default App
