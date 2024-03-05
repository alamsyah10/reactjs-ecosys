import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './assets/pages/Login/Login';
import ProfilePage from './assets/pages/Profile/Profile';
import Logout from './assets/pages/Logout/Logout';
import Ingredients from './assets/pages/Ingredient/PickIngredientPage';
import OptimalIngredients from './assets/pages/Ingredient/optimal-ingredient/OptimalIngredient';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="optimal-ingredients" element={<OptimalIngredients />} />
          <Route path="logout" element={<Logout />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
