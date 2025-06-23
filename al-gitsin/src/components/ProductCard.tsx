import type { Product } from "../types/product";
import { useCart } from "../hooks/useCart";
import FavoriteButton from "./FavoriteButton";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-card__image"
      />

      <div className="product-card__details">
        <div className="product-card__top">
          <span className="product-card__brand">{product.brand}</span>
          <span className="product-card__title">{product.title}</span>
        </div>

        <div className="product-card__rating">
          <span className="star">⭐</span>
          <span className="rating-number">
            {product.rating !== undefined ? product.rating.toFixed(1) : "N/A"}
          </span>
          <span className="review-count">({product.reviewCount} yorum)</span>
        </div>

        <p className="product-card__price">{product.price}₺</p>

        <div className="product-card__actions">
          <FavoriteButton product={product} />
          <button className="button" onClick={() => addToCart(product)}>
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>

  );
};

export default ProductCard;
