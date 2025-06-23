import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import { FavoriteProvider } from "./context/FavoriteContext";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import FavoritesPage from "./pages/FavoritesPage";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <UserProvider>
      <CartProvider>
        <FavoriteProvider>
          <BrowserRouter>
            <Navbar onSearch={setSearchQuery} />
            <Routes>
              <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
          </BrowserRouter>
        </FavoriteProvider>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
