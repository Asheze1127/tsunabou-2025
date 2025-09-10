import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Preparedness from './pages/Preparedness';
import Map from './pages/Map';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { Signup } from './pages/Signup';
import { useLoginStore } from './store/login.store';
import { Login } from './components/features/Login';

function App() {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  return (
    <Router>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/preparedness" element={<Preparedness />} />
            <Route path="/map" element={<Map />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;