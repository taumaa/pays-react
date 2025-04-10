import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Header from './components/Header'

import Home from './views/Home'
import Country from './views/Country'
import Favorite from './views/Favorite'
import './App.css'
import Container from './components/Container'
import Footer from './components/Footer'
function App() {


  return (
    <Container>
      <Router>
        <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:countryName" element={<Country />} />
            <Route path="/favorites" element={<Favorite />} />
          </Routes>
        <Footer />
      </Router>
    </Container>
  )
}

export default App
