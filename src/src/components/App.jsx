import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home'
import NavigationBar from './NavBar'

function App() {

  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
