import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Navbar from './components/Navbar'
import AirbnbHomepage from "./pages/HomePage"
import PropertyPage from './pages/PropertyPage'
import BookingPage from './pages/BookingPage'
import SearchPage from './pages/SearchPage'



function App() {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AirbnbHomepage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/booking_request/:id" element={<BookingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>

  </>
}

export default App