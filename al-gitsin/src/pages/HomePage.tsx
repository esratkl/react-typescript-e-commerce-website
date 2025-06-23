import ProductCard from "../components/ProductCard";
import CategoryBar from "../components/CategoryBar";
import type { Product } from "../types/product";
import iphoneImg from "../assets/iphone-17-pro-max-gac1.jpg";
import kulaklikImg from "../assets/kulaklik.jpg";
import tabletImg from "../assets/tablet.webp";
import akilliSaatImg from "../assets/akillisaat.webp";
import bilgisayarImg from "../assets/bilgisayar.webp";
import oyunkonsoluImg from "../assets/oyunkonsolu.jpg";
import elbiseImg from "../assets/elbise.webp";
import kadinMontImg from "../assets/kadinmont.webp";
import kadinSweatshirtImg from "../assets/kadinsweatshirt.webp";
import erkekTisortImg from "../assets/erkektshirt.webp";
import erkekAyakkabiImg from "../assets/erkekayakkabi.webp";
import erkekSaatImg from "../assets/erkeksaat.jpg";
import cantaImg from "../assets/canta.webp";
import sneakerImg from "../assets/sneaker.webp";
import sneakerImg2 from "../assets/sneaker2.webp";
import rujImg from "../assets/ruj.jpg";
import rujImg2 from "../assets/ruj.avif";
import fondotenImg from "../assets/fondöten.webp";
import evdekorasyonImg from "../assets/evdekorasyon.jpg";
import cocukayakkabiImg from "../assets/cocukayakkabi.webp";
import annecantasiImg from "../assets/annecantasi.jpg";
import cocukmontImg from "../assets/cocukmont.webp";
import masalambasiImg from "../assets/masalambasi.webp";
import koltuktakimiImg from "../assets/koltuktakimi.webp";
import { useState } from "react";

interface HomePageProps {
  searchQuery: string;
}

const categories = [
  "Tümü",
  "Kadın",
  "Erkek",
  "Anne&Çocuk",
  "Elektronik",
  "Ev&Yaşam",
  "Ayakkabı&Çanta",
  "Kozmetik",
];

const sampleProducts: Product[] = [
  { id: 1, title: "Telefon", price: 9999, image: iphoneImg, category: "Elektronik", brand: "Apple", color: "Gri", rating: 4.5, reviewCount: 120 },
  { id: 2, title: "Bilgisayar", price: 15999, image: bilgisayarImg, category: "Elektronik", brand: "HP", color: "Siyah", rating: 4.2, reviewCount: 85 },
  { id: 3, title: "Tablet", price: 7999, image: tabletImg, category: "Elektronik", brand: "Samsung", color: "Gümüş", rating: 4.0, reviewCount: 60 },
  { id: 4, title: "Akıllı Saat", price: 2999, image: akilliSaatImg, category: "Elektronik", brand: "Xiaomi", color: "Siyah", rating: 4.3, reviewCount: 45 },
  { id: 5, title: "Kulaklık", price: 499, image: kulaklikImg, category: "Elektronik", brand: "Sony", color: "Beyaz", rating: 4.1, reviewCount: 30 },
  { id: 6, title: "Oyun Konsolu", price: 4999, image: oyunkonsoluImg, category: "Elektronik", brand: "Sony", color: "Siyah", rating: 4.8, reviewCount: 200 },
  { id: 7, title: "Elbise", price: 299, image: elbiseImg, category: "Kadın", brand: "Zara", color: "Mavi", rating: 4.4, reviewCount: 75 },
  { id: 8, title: "Kadın Mont", price: 699, image: kadinMontImg, category: "Kadın", brand: "The North Face", color: "Siyah", rating: 4.6, reviewCount: 50 },
  { id: 9, title: "Kadın Sweatshirt", price: 249, image: kadinSweatshirtImg, category: "Kadın", brand: "LC Waikiki", color: "Gri", rating: 4.3, reviewCount: 80 },
  { id: 10, title: "Erkek Tişört", price: 149, image: erkekTisortImg, category: "Erkek", brand: "LC Waikiki", color: "Beyaz", rating: 4.2, reviewCount: 40 },
  { id: 11, title: "Erkek Spor Ayakkabı", price: 499, image: erkekAyakkabiImg, category: "Erkek", brand: "Nike", color: "Gri", rating: 4.7, reviewCount: 110 },
  { id: 12, title: "Erkek Saat", price: 899, image: erkekSaatImg, category: "Erkek", brand: "Casio", color: "Siyah", rating: 4.3, reviewCount: 65 },
  { id: 13, title: "Anne Çantası", price: 399, image: annecantasiImg, category: "Anne&Çocuk", brand: "Chicco", color: "Bej", rating: 4.5, reviewCount: 55 },
  { id: 14, title: "Çocuk Ayakkabı", price: 249, image: cocukayakkabiImg, category: "Anne&Çocuk", brand: "Benetton", color: "Mavi", rating: 4.0, reviewCount: 30 },
  {id: 15, title: "Çocuk Mont", price: 399, image: cocukmontImg, category: "Anne&Çocuk", brand: "Adidas", color: "Kırmızı", rating: 4.1, reviewCount: 25 },
  { id: 16, title: "Ev Dekorasyon Seti", price: 799, image: evdekorasyonImg, category: "Ev&Yaşam", brand: "IKEA", color: "Beyaz", rating: 4.2, reviewCount: 90 },
  {id: 17, title: "Masa Lambası", price: 899, image: masalambasiImg, category: "Ev&Yaşam", brand: "Koçtaş", color: "Gri", rating: 4.3, reviewCount: 80 },
  {id : 18, title: "Koltuk Takımı", price: 299, image: koltuktakimiImg, category: "Ev&Yaşam", brand: "H&M Home", color: "Renkli", rating: 4.4, reviewCount: 70 },
  { id: 19, title: "Kadın Omuz Çantası", price: 349, image: cantaImg, category: "Ayakkabı&Çanta", brand: "Defacto", color: "Bej", rating: 4.1, reviewCount: 33 },
  { id: 20, title: "Sneaker Ayakkabı", price: 599, image: sneakerImg, category: "Ayakkabı&Çanta", brand: "Puma", color: "Gri", rating: 4.4, reviewCount: 78 },
  { id: 21, title: "Kadın Sneaker Ayakkabı", price: 599, image: sneakerImg2, category: "Ayakkabı&Çanta", brand: "Lacoste", color: "Beyaz", rating: 4.5, reviewCount: 78 },
  { id: 22, title: "Ruj - Mat Kırmızı", price: 99, image: rujImg, category: "Kozmetik", brand: "Maybelline", color: "Kırmızı", rating: 4.4, reviewCount: 65 },
  { id: 23, title: "Lipstick", price: 99, image: rujImg2, category: "Kozmetik", brand: "MAC", color: "Kırmızı", rating: 4.4, reviewCount: 65 },
  { id: 24, title: "Fondöten - 24H Kalıcı", price: 179, image: fondotenImg, category: "Kozmetik", brand: "L'Oréal", color: "Bej", rating: 4.6, reviewCount: 92 },
];

const HomePage: React.FC<HomePageProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sortOption, setSortOption] = useState("recommended");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const categoryFiltered = selectedCategory === "Tümü"
    ? sampleProducts
    : sampleProducts.filter(p => p.category === selectedCategory);

  const searchFiltered = categoryFiltered.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const brandFiltered = selectedBrand
    ? searchFiltered.filter(product => product.brand === selectedBrand)
    : searchFiltered;

  const colorFiltered = selectedColor
    ? brandFiltered.filter(product => product.color === selectedColor)
    : brandFiltered;

  const priceFiltered = colorFiltered.filter(product =>
    product.price >= minPrice && product.price <= maxPrice
  );

  const sortedProducts = [...priceFiltered].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "rating-desc") return (b.rating ?? 0) - (a.rating ?? 0);
    if (sortOption === "reviews-desc") return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
    return 0;
  });

  const brands = [...new Set(sampleProducts.map(p => p.brand))];
  const colors = [...new Set(sampleProducts.map(p => p.color))];

  return (
    <div>
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="home-header">
        <div className="sort-filter">
          <select
            className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="recommended">Önerilen</option>
            <option value="price-asc">Fiyat: Artan</option>
            <option value="price-desc">Fiyat: Azalan</option>
            <option value="rating-desc">Puan: Yüksekten Düşüğe</option>
            <option value="reviews-desc">Yorum Sayısı: Yüksekten Düşüğe</option>
          </select>

          <select
            className="sort-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Marka (Tümü)</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <select
            className="sort-select"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">Renk (Tümü)</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>

          <button className="sort-select" onClick={() => setShowPriceModal(true)}>Fiyat</button>
        </div>
      </div>

      {showPriceModal && (
        <div className="modal-overlay">
          <div className="price-modal">
            <h3>Fiyat Aralığı</h3>
            <input
              type="number"
              placeholder="Min"
              value={minPrice === 0 ? "" : minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice === Infinity ? "" : maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowPriceModal(false)}>Uygula</button>
              <button onClick={() => {
                setMinPrice(0);
                setMaxPrice(Infinity);
                setShowPriceModal(false);
              }}>Sıfırla</button>
            </div>
          </div>
        </div>
      )}

      <div className="home-grid">
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Aradığınız kriterlere uygun ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
