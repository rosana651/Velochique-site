import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

