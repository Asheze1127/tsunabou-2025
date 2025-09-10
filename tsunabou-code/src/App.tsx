import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Preparedness from './pages/Preparedness';
import Map from './pages/Map';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { useLoginStore } from './store/login.store';

function App() {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/preparedness" element={<Preparedness />} />
              <Route path="/map" element={<Map />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      ) : (
        <h1>Login</h1>
      )}
    </>
  );
}

export default App;