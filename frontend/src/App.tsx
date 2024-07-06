
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Tech from './pages/Tech';
import Career from './pages/Career';
import Personal from './pages/Personal';
import Trading from './pages/Trading';
import AddBlog from './components/AddBlog';
import Project from './pages/Project';


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
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;
