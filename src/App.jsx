import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home'
import Detials from './pages/Detials';
import MediaPage from './pages/MediaPage';
import Footer from './components/Footer';

function App() {
  return (
    <>
     <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Detials />}/>
          <Route path="/confirm/:itemId" element={<MediaPage/>}/>
        </Routes> 
        <Footer/>
      </Router>
    </>
  )
}

export default App
