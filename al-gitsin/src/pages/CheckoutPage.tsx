import { useState } from "react";

const CheckoutPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [address, setAddress] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return <div className="checkout-confirm">✅ Siparişiniz başarıyla alındı! 🎉</div>;
  }

  return (
    <div className="checkout-page">
      <h2>Ödeme Bilgileri</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          placeholder="Kart Numarası"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          required
        />
        <textarea
          placeholder="Teslimat Adresi"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
        <button className="button" type="submit">Siparişi Onayla</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
