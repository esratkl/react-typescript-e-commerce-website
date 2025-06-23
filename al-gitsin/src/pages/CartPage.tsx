import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [cardInfo, setCardInfo] = useState({ name: "", number: "", cvv: "" });

  const total = cart.reduce(
    (acc, product) => acc + product.price * (product.count || 1),
    0
  );

  const handleConfirmOrder = () => {
    if (cardInfo.name && cardInfo.number && cardInfo.cvv) {
      setOrderConfirmed(true);
      setShowCheckoutForm(false);
      clearCart();
    }
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Sepet</h1>

      {orderConfirmed && (
        <div className="checkout-confirm-message">
          ✅ Siparişiniz başarıyla alındı!
        </div>
      )}

      {cart.length === 0 && !orderConfirmed ? (
        <p className="cart-empty">Sepet boş</p>
      ) : (
        <>
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img
                src={product.image}
                alt={product.title}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <p className="cart-item-title">{product.title}</p>
                <p className="cart-item-price">
                  {product.price}₺ x {product.count}
                </p>
                <p className="cart-item-subtotal">
                  Ürün Toplamı: {product.price * (product.count || 1)}₺
                </p>

                <div className="cart-quantity-controls">
                  <button onClick={() => decreaseQuantity(product.id)}>-</button>
                  <span>{product.count}</span>
                  <button onClick={() => increaseQuantity(product.id)}>+</button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(product.id)}
                className="remove-button"
              >
                🗑️Sil
              </button>
            </div>
          ))}

          <div className="cart-total">Genel Toplam: {total}₺</div>

          <div className="cart-checkout-button-wrapper">
            <button className="checkout-button" onClick={() => setShowCheckoutForm(true)}>
              Ödeme Yap
            </button>
          </div>
        </>
      )}

      {showCheckoutForm && (
        <div className="checkout-form-overlay">
          <div className="checkout-form">
            <button className="checkout-form-close" onClick={() => setShowCheckoutForm(false)}>
              ✕
            </button>
            <h2>Ödeme Bilgileri</h2>
            <input
              type="text"
              placeholder="Kart Üzerindeki İsim"
              value={cardInfo.name}
              onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Kart Numarası"
              value={cardInfo.number}
              onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
            />
            <input
              type="text"
              placeholder="CVV"
              value={cardInfo.cvv}
              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
            />
            <button className="checkout-form-confirm" onClick={handleConfirmOrder}>
              Onayla ve Siparişi Tamamla
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
