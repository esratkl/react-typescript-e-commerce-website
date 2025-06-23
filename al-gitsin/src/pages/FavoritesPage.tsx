import { useFavorites } from "../context/FavoriteContext";
import ProductCard from "../components/ProductCard";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="home-grid">
      {favorites.length === 0 ? (
        <p>Henüz favorilere ürün eklenmedi.</p>
      ) : (
        favorites.map(product => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  );
};

export default FavoritesPage;
