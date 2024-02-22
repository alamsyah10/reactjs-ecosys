import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './assets/pages/Login/Login';
import ProfilePage from './assets/pages/Profile/Profile';
import Logout from './assets/pages/Logout/Logout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="logout" element={<Logout />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
