
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Tech from './pages/Tech';
import Career from './pages/Career';
import Personal from './pages/Personal';
import Trading from './pages/Trading';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/tech" element={<Tech/>} />
        <Route path="/career" element={<Career/>} />
        <Route path="/personal" element={<Personal/>} />
        <Route path="/trading" element={<Trading/>}/>
      </Routes>
    </Router>
  );
}

export default App;
