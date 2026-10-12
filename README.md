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

Fiyat, çalışma saati ve e-posta uydurulmaz. Basılı menüdeki yazımlar korunur:
`jalapone`, `chedar`, `sweetchilly`, `Görali`, `Patsos`, `Chessburger`. Tavuk
burger notu hindistan cevizi içerdiğini söyler.

“Yusuf Çelik” ana sayfa ve menü alt bilgisinde yoktur; aydınlatma ve kullanım
şartlarındaki künyede durur. İşyeri adresi ve telefon sitede yazılı olanlardır.
Resmi Instagram hesabı `https://www.instagram.com/lapsfethiye`.

## Yerel

```bash
npm install
npm run serve
```

Firebase emülatörü temiz adresleri açar (`/menu`). Düz bir Python sunucusunda
temiz adres yoktur; menü `/menu.html` ile açılır.
