//IMPORT REACT
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//IMPORT CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
//IMPORT COMPONENTS
import ApiYouTube from './Components/ApiYouTube/ApiYouTube.jsx'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApiYouTube />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
