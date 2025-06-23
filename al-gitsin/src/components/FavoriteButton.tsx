import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoriteContext";
import type { Product } from "../types/product";

const FavoriteButton = ({ product }: { product: Product }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <button onClick={() => toggleFavorite(product)} style={{ background: "none", border: "none", cursor: "pointer" }}>
      {isFavorite(product.id) ? (
        <FaHeart color="orange" size={20} />
      ) : (
        <FaRegHeart color="gray" size={20} />
      )}
    </button>
  );
};

export default FavoriteButton;