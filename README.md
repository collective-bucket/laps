# LAPS!

Fethiye’de bir büfe sitesi. Canlı adres [lapsfethiye.com](https://lapsfethiye.com);
`www` aynı siteyi açar. Kaynak `public/` altındadır.

Kelime işareti bu lisansın kapsamında değildir ve yeniden çizilmez.

## Yayın

Firebase projesi `collective-bucket`, hosting hedefi `laps` → `cbucket-laps`.
`main` dalına push, GitHub Actions üzerinden (workload identity) yalnızca bu
hedefi yayınlar. `cleanUrls` açık, sondaki eğik çizgi yok. Kanonik adres eğik
çizgisiz kök alan adıdır.

## Yapı

- `index.html` — ana sayfa. Tabela sloganı `Burger · Sandwich · Coffee`.
- `menu.html`, `menu.json`, `assets/menu.js` — kart menü. Fiyat alanı yoksa
  fiyat basılmaz. QR görseli `assets/menu-qr.png`, tam adres
  `https://lapsfethiye.com/menu`.
- `assets/menu-google-{tr,en,ru}.png` — Google işletme profili için menü
  görselleri (1080×1350, fiyatsız). `tools/menu-image.html` bunları
  `menu.json` ve `i18n.js`ten üretir; `tools/` yayına çıkmaz. Menü değişince
  yeniden üret (bkz. Yerel).
- `aydinlatma.html`, `cerezler.html`, `kullanim-sartlari.html` — taslak yasal
  metinler, `noindex`.
- `assets/i18n.js` — Türkçe, İngilizce, Rusça. Kaynak HTML, `lang="tr"`, başlık
  ve açıklama Türkçe durur.
- `assets/track.js` — çerez onayını günceller; etiketi ikinci kez eklemez.
  GA4 `G-13VJYX1E77` her sayfanın başındadır. Consent Mode varsayılanı
  reddedilmiştir; ölçüm çerezi yalnızca kabulden sonra açılır.

## Tercihler

Sayfa kâğıt beyazıdır. Tabela renkleri vurgu olarak kullanılır: yeşil
`#1c3e25`, krem `#f9e5c0`. Yazı tipi Helvetica Neue.

`laps_lang` çerezi yalnızca ziyaretçi TR, EN veya RU düğmesine basınca yazılır
ve altı ay durur. Tarayıcı diline göre otomatik geçiş yoktur. Sözlükte Türkçe
yoktur; Türkçe, HTML’deki kaynak metindir.

Fiyat, çalışma saati ve e-posta uydurulmaz. Menüde fiyat yoktur. Menünün
kaynağı işletmenin Yemeksepeti ve Trendyol Go hesabıdır; ürün adları ve
açıklamalar oradaki gibi yazılır. Kahveler platformda yoktur, sitede kalır.
Çıtır tavuk burger notu hindistan cevizi içerdiğini söyler.

Online sipariş düğmeleri ana sayfa, menü ve iletişimde aynıdır:
[Yemeksepeti](https://www.yemeksepeti.com/restaurant/rg7c/laps-rg7c) ve
[Trendyol Go](https://tgoyemek.com/restoranlar/491837).

İşyeri adresi ve telefon sitede yazılı olanlardır.
Resmi Instagram hesabı `https://www.instagram.com/lapsfethiye`.

## Yerel

```bash
npm install
npm run serve
```

Firebase emülatörü temiz adresleri açar (`/menu`). Düz bir Python sunucusunda
temiz adres yoktur; menü `/menu.html` ile açılır.

Google menü görsellerini yeniden üretmek için repo kökünde:

```bash
python3 -m http.server 8090 &
npx playwright install chromium   # bir kez
for l in tr en ru; do
  npx playwright screenshot --viewport-size=1080,1350 \
    --wait-for-selector='[data-ready]' \
    "http://localhost:8090/tools/menu-image.html?lang=$l" \
    public/assets/menu-google-$l.png
done
```
