import React, { useState } from "react";
import "../index.css";

// --- Tipler ---
interface Adres {
  id: number;
  etiket: string;
  adres: string;
}
interface Kart {
  id: number;
  tip: string;
  son4: string;
  sonKullanma: string;
}
interface BildirimTercihleri {
  email: boolean;
  sms: boolean;
}
interface Kullanici {
  ad: string;
  email: string;
  profilResmi: string;
  sonGiris: string;
  adresler: Adres[];
  kartlar: Kart[];
  bildirimTercihleri: BildirimTercihleri;
}
interface Siparis {
  id: string;
  tarih: string;
  toplam: number;
  durum: string;
}

const mockKullanici: Kullanici = {
  ad: "Esra Tokal",
  email: "esra@gmail.com.com",
  profilResmi: "https://ui-avatars.com/api/?name=Esra+T",
  sonGiris: "2024-06-01 14:23",
  adresler: [
    { id: 1, etiket: "Ev", adres: "Atatürk Cad. No:10, İstanbul" },
    { id: 2, etiket: "İş", adres: "Teknopark, Ankara" },
  ],
  kartlar: [
    { id: 1, tip: "Visa", son4: "1234", sonKullanma: "12/26" },
    { id: 2, tip: "Mastercard", son4: "5678", sonKullanma: "11/25" },
  ],
  bildirimTercihleri: { email: true, sms: false },
};
const mockSiparisler: Siparis[] = [
  { id: "SIP-1001", tarih: "2024-05-20", toplam: 199.99, durum: "Teslim Edildi" },
  { id: "SIP-1002", tarih: "2024-04-15", toplam: 89.5, durum: "Kargoda" },
  { id: "SIP-1003", tarih: "2024-03-10", toplam: 49.99, durum: "İptal Edildi" },
];

const ProfilBilgilerim: React.FC<{
  kullanici: Pick<Kullanici, "ad" | "email" | "profilResmi">;
  guncelle: (data: { ad: string; email: string; profilResmi: string }) => void;
}> = ({ kullanici, guncelle }) => {
  const [duzenle, setDuzenle] = useState(false);
  const [form, setForm] = useState({
    ad: kullanici.ad,
    email: kullanici.email,
    profilResmi: kullanici.profilResmi,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    guncelle(form);
    setDuzenle(false);
  };
  return (
    <section className="hesabim-section hesabim-profile-section">
      <h2>Profil Bilgilerim</h2>
      <div className="hesabim-profile-flex">
        <img className="hesabim-profile-pic" src={form.profilResmi} alt="Profil" />
        <div className="hesabim-profile-info">
          {duzenle ? (
            <form onSubmit={handleSave} className="hesabim-profile-form">
              <input name="ad" value={form.ad} onChange={handleChange} placeholder="Ad Soyad" required />
              <input name="email" value={form.email} onChange={handleChange} placeholder="E-posta" type="email" required />
              <input name="profilResmi" value={form.profilResmi} onChange={handleChange} placeholder="Profil Fotoğrafı URL" />
              <div className="hesabim-profile-actions">
                <button type="submit">Kaydet</button>
                <button type="button" onClick={() => setDuzenle(false)}>İptal</button>
              </div>
            </form>
          ) : (
            <>
              <div className="hesabim-profile-name">{kullanici.ad}</div>
              <div className="hesabim-profile-email">{kullanici.email}</div>
              <button onClick={() => setDuzenle(true)}>Düzenle</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const siparisDurumRenk: Record<string, string> = {
  "Teslim Edildi": "hesabim-order-status hesabim-delivered",
  "Kargoda": "hesabim-order-status hesabim-shipped",
  "İptal Edildi": "hesabim-order-status hesabim-cancelled",
};
const SiparisGecmisi: React.FC<{ siparisler: Siparis[] }> = ({ siparisler }) => (
  <section className="hesabim-section">
    <h2>Sipariş Geçmişi</h2>
    <div className="hesabim-order-table-wrap">
      <table className="hesabim-order-table">
        <thead>
          <tr>
            <th>Sipariş No</th>
            <th>Tarih</th>
            <th>Tutar</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {siparisler.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.tarih}</td>
              <td>{s.toplam.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</td>
              <td>
                <span className={siparisDurumRenk[s.durum] || "hesabim-order-status"}>
                  {s.durum}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const Adreslerim: React.FC<{
  adresler: Adres[];
  ekle: (a: { etiket: string; adres: string }) => void;
  duzenle: (id: number, a: { etiket: string; adres: string }) => void;
  sil: (id: number) => void;
}> = ({ adresler, ekle, duzenle, sil }) => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ etiket: "", adres: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) duzenle(editId, form);
    else ekle(form);
    setForm({ etiket: "", adres: "" });
    setShowForm(false);
    setEditId(null);
  };
  const handleEdit = (a: Adres) => {
    setForm({ etiket: a.etiket, adres: a.adres });
    setEditId(a.id);
    setShowForm(true);
  };
  return (
    <section className="hesabim-section">
      <h2>Adreslerim</h2>
      <ul className="hesabim-address-list">
        {adresler.map((a) => (
          <li key={a.id} className="hesabim-address-item">
            <div>
              <b>{a.etiket}:</b> {a.adres}
            </div>
            <div>
              <button onClick={() => handleEdit(a)}>Düzenle</button>
              <button onClick={() => sil(a.id)}>Sil</button>
            </div>
          </li>
        ))}
      </ul>
      {showForm ? (
        <form className="hesabim-address-form" onSubmit={handleSubmit}>
          <input
            name="etiket"
            value={form.etiket}
            onChange={e => setForm({ ...form, etiket: e.target.value })}
            placeholder="Etiket (Ev, İş...)"
            required
          />
          <input
            name="adres"
            value={form.adres}
            onChange={e => setForm({ ...form, adres: e.target.value })}
            placeholder="Adres"
            required
          />
          <button type="submit">{editId !== null ? "Kaydet" : "Ekle"}</button>
          <button type="button" onClick={() => { setShowForm(false); setEditId(null); }}>İptal</button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Adres Ekle</button>
      )}
    </section>
  );
};

const OdemeYontemleri: React.FC<{
  kartlar: Kart[];
  ekle: (k: { tip: string; son4: string; sonKullanma: string }) => void;
  sil: (id: number) => void;
}> = ({ kartlar, ekle, sil }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ tip: "", son4: "", sonKullanma: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ekle(form);
    setForm({ tip: "", son4: "", sonKullanma: "" });
    setShowForm(false);
  };
  return (
    <section className="hesabim-section">
      <h2>Ödeme Yöntemleri</h2>
      <ul className="hesabim-payment-list">
        {kartlar.map((k) => (
          <li key={k.id} className="hesabim-payment-item">
            <span>
              {k.tip} ****{k.son4} (SKT: {k.sonKullanma})
            </span>
            <button onClick={() => sil(k.id)}>Sil</button>
          </li>
        ))}
      </ul>
      {showForm ? (
        <form className="hesabim-address-form" onSubmit={handleSubmit}>
          <input
            name="tip"
            value={form.tip}
            onChange={e => setForm({ ...form, tip: e.target.value })}
            placeholder="Kart Tipi (Visa, Mastercard...)"
            required
          />
          <input
            name="son4"
            value={form.son4}
            onChange={e => setForm({ ...form, son4: e.target.value })}
            placeholder="Son 4 Hane"
            required
            maxLength={4}
          />
          <input
            name="sonKullanma"
            value={form.sonKullanma}
            onChange={e => setForm({ ...form, sonKullanma: e.target.value })}
            placeholder="SKT (AA/YY)"
            required
            maxLength={5}
          />
          <button type="submit">Ekle</button>
          <button type="button" onClick={() => setShowForm(false)}>İptal</button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Kart Ekle</button>
      )}
    </section>
  );
};

const GuvenlikAyarlar: React.FC<{
  sonGiris: string;
  sifreDegistir: (eski: string, yeni: string) => void;
}> = ({ sonGiris, sifreDegistir }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ eski: "", yeni: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sifreDegistir(form.eski, form.yeni);
    setShowForm(false);
    setForm({ eski: "", yeni: "" });
  };
  return (
    <section className="hesabim-section">
      <h2>Güvenlik Ayarları</h2>
      <div>Son giriş: {sonGiris}</div>
      <button onClick={() => setShowForm((v) => !v)}>
        {showForm ? "İptal" : "Şifre Değiştir"}
      </button>
      {showForm && (
        <form className="hesabim-security-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Mevcut şifre"
            value={form.eski}
            onChange={e => setForm({ ...form, eski: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Yeni şifre"
            value={form.yeni}
            onChange={e => setForm({ ...form, yeni: e.target.value })}
            required
          />
          <button type="submit">Kaydet</button>
        </form>
      )}
    </section>
  );
};

const BildirimTercihleri: React.FC<{
  tercihler: BildirimTercihleri;
  toggle: (tip: "email" | "sms") => void;
}> = ({ tercihler, toggle }) => (
  <section className="hesabim-section">
    <h2>Bildirim Tercihleri</h2>
    <div className="hesabim-notif-row">
      <label>
        <input
          type="checkbox"
          checked={tercihler.email}
          onChange={() => toggle("email")}
        />
        E-posta bildirimleri
      </label>
    </div>
    <div className="hesabim-notif-row">
      <label>
        <input
          type="checkbox"
          checked={tercihler.sms}
          onChange={() => toggle("sms")}
        />
        SMS bildirimleri
      </label>
    </div>
  </section>
);

const HesabimiSil: React.FC<{ sil: () => void }> = ({ sil }) => {
  const [onay, setOnay] = useState(false);
  return (
    <section className="hesabim-section hesabim-delete-section">
      <h2>Hesabımı Sil</h2>
      <p className="hesabim-delete-warning">
        Uyarı: Hesabınızı silmek geri alınamaz!
      </p>
      {onay ? (
        <button className="hesabim-delete-btn" onClick={sil}>
          Silmeyi Onayla
        </button>
      ) : (
        <button onClick={() => setOnay(true)}>Hesabımı Sil</button>
      )}
    </section>
  );
};

const AccountPage: React.FC = () => {
  const [kullanici, setKullanici] = useState<Kullanici>(mockKullanici);
  const [siparisler, setSiparisler] = useState<Siparis[]>(mockSiparisler);

  const adresEkle = (adres: { etiket: string; adres: string }) =>
    setKullanici(prev => ({
      ...prev,
      adresler: [...prev.adresler, { ...adres, id: Date.now() }],
    }));
  const adresDuzenle = (id: number, guncel: { etiket: string; adres: string }) =>
    setKullanici(prev => ({
      ...prev,
      adresler: prev.adresler.map(a => a.id === id ? { ...a, ...guncel } : a),
    }));
  const adresSil = (id: number) =>
    setKullanici(prev => ({
      ...prev,
      adresler: prev.adresler.filter(a => a.id !== id),
    }));

  const kartEkle = (k: { tip: string; son4: string; sonKullanma: string }) =>
    setKullanici(prev => ({
      ...prev,
      kartlar: [...prev.kartlar, { ...k, id: Date.now() }],
    }));
  const kartSil = (id: number) =>
    setKullanici(prev => ({
      ...prev,
      kartlar: prev.kartlar.filter(k => k.id !== id),
    }));

  const bildirimToggle = (tip: "email" | "sms") =>
    setKullanici(prev => ({
      ...prev,
      bildirimTercihleri: {
        ...prev.bildirimTercihleri,
        [tip]: !prev.bildirimTercihleri[tip],
      },
    }));

  const profilGuncelle = (data: { ad: string; email: string; profilResmi: string }) =>
    setKullanici(prev => ({
      ...prev,
      ...data,
    }));

  const sifreDegistir = (eski: string, yeni: string) => {
    alert("Şifre değiştirildi (örnek)");
  };

  const hesapSil = () => {
    alert("Hesap silindi (örnek)");
  };

  return (
    <div className="hesabim-root">
      <h1 className="hesabim-title">Hesabım</h1>
      <div className="hesabim-grid">
        <div className="hesabim-main">
          <ProfilBilgilerim kullanici={kullanici} guncelle={profilGuncelle} />
          <SiparisGecmisi siparisler={siparisler} />
          <Adreslerim adresler={kullanici.adresler} ekle={adresEkle} duzenle={adresDuzenle} sil={adresSil} />
          <OdemeYontemleri kartlar={kullanici.kartlar} ekle={kartEkle} sil={kartSil} />
        </div>
        <aside className="hesabim-sidebar">
          <GuvenlikAyarlar sonGiris={kullanici.sonGiris} sifreDegistir={sifreDegistir} />
          <BildirimTercihleri tercihler={kullanici.bildirimTercihleri} toggle={bildirimToggle} />
          <HesabimiSil sil={hesapSil} />
        </aside>
      </div>
    </div>
  );
};

export default AccountPage;