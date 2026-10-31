import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import CV from './pages/CV';
import Notes from './pages/Notes';
import Dev from './pages/Dev';
import KallyfitLanding from './pages/KallyfitLanding';
import KallyfitLeaderboard from './pages/KallyfitLeaderboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="CV" element={<CV />} />
          <Route path="notes" element={<Notes />} />
          <Route path="dev" element={<Dev />} />
          <Route path="dev/kallyfit" element={<KallyfitLanding />} />
          <Route path="dev/kallyfit/leaderboard" element={<KallyfitLeaderboard />} />
          {/* Aquí puedes añadir rutas para otras páginas independientes en el futuro */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
