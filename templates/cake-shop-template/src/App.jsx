import React, { useState } from "react";
import {
  ArrowRight,
  Leaf,
  Cake,
  Heart,
  Gift,
  UsersThree,
  MapPin,
  Train,
  Car,
  CalendarBlank,
  List,
  X,
  Plus,
  Minus,
  InstagramLogo,
  FacebookLogo,
  ChatCircle,
} from "@phosphor-icons/react";
import { products, categories, nav, news, faqs, yen } from "./content";
import { Modal, ShopDialog, OrderDialog } from "./Dialogs";
import "./cake.css";
const Image = ({ name, alt, ...props }) => (
  <img src={`/assets/${name}.png`} alt={alt} {...props} />
);
function Brand() {
  return (
    <a className="brand" href="#home" aria-label="Pâtisserie Lumière トップ">
      <Image name="logo" alt="" />
      <span>
        <strong>Pâtisserie Lumière</strong>
        <small>パティスリー ルミエール</small>
      </span>
    </a>
  );
}
export function Button({
  children,
  onClick,
  href,
  outline = false,
  className = "",
  ...rest
}) {
  const C = href ? "a" : "button";
  return (
    <C
      {...rest}
      href={href}
      onClick={onClick}
      className={`button ${outline ? "outline" : ""} ${className}`}
    >
      {children}
      <ArrowRight aria-hidden="true" />
    </C>
  );
}
export function App() {
  const [menu, setMenu] = useState(false),
    [dialog, setDialog] = useState(null),
    [shopCategory, setShopCategory] = useState(null),
    [order, setOrder] = useState(null),
    [allFaq, setAllFaq] = useState(false);
  const show = (title, body, image) => setDialog({ title, body, image });
  const showShop = (category = "すべて") => {
    setDialog(null);
    setShopCategory(category);
  };
  const startOrder = (product) => {
    setShopCategory(null);
    setDialog(null);
    setOrder(product);
  };
  const info = () =>
    show(
      "店舗のご案内",
      <>
        <p>
          店舗名、住所、駐車場、営業時間は架空の表示例です。実在の店舗への案内ではありません。
        </p>
        <p>
          実際に公開する際は、正しい店舗情報とGoogleマップのURLを設定してください。
        </p>
      </>,
      "shop",
    );
  const features = [
    [Leaf, "こだわりの", "厳選素材"],
    [Cake, "季節を感じる", "限定スイーツ"],
    [Heart, "大切な日の", "オーダーケーキ"],
    [Gift, "手土産・ギフトに", "ぴったり"],
    [UsersThree, "地域に愛される", "まちのパティスリー"],
  ];
  return (
    <div className="page-shell">
      <a className="skip-link" href="#main">
        本文へ移動
      </a>
      <header id="home" className="header">
        <Brand />
        <button
          className="menu-toggle"
          aria-label={menu ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menu}
          aria-controls="main-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <List />}
        </button>
        <nav
          id="main-nav"
          aria-label="メインナビゲーション"
          className={menu ? "open" : ""}
        >
          {nav.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <button className="shop-button" onClick={() => showShop()}>
          <CalendarBlank aria-hidden="true" />
          オンラインショップ
        </button>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            name="hero"
            alt="苺を飾った白いクリームのホールケーキ"
            fetchPriority="high"
            className="hero-photo"
          />
          <div className="hero-copy">
            <h1 id="hero-title">
              甘い幸せで、
              <br />
              日常をちょっと特別に。
            </h1>
            <p>
              季節のフルーツと、
              <br />
              やさしい素材でつくる
              <br />
              心に残るケーキを、あなたに。
            </p>
            <Button href="#seasonal">ケーキを見に行く</Button>
          </div>
          <p className="hero-note">
            A little
            <br />
            sweetness
            <br />
            in your day.
          </p>
          <div className="hero-badge">
            <span>地元で愛されて</span>
            <strong>
              10<small>年</small>
            </strong>
            <span>
              みんなの
              <br />
              街のケーキ屋さん
            </span>
          </div>
        </section>
        <section className="features" aria-label="ルミエールの特徴">
          {features.map(([Icon, a, b]) => (
            <div key={a}>
              <Icon weight="fill" aria-hidden="true" />
              <strong>
                {a}
                <br />
                {b}
              </strong>
            </div>
          ))}
        </section>
        <section className="about" id="about">
          <div className="about-copy">
            <span className="eyebrow">ABOUT</span>
            <h2>私たちの想い</h2>
            <h3>
              ケーキで、
              <br />
              人を笑顔にしたい。
            </h3>
            <p>
              パティスリー ルミエールは、
              <br />
              地元の皆さまに愛されるケーキ屋として、
              <br />
              ひとつひとつ丁寧に、心を込めて
              <br />
              お菓子をつくっています。
              <br />
              大切な人と過ごす時間が、
              <br />
              もっと特別なものになりますように。
            </p>
            <Button
              outline
              onClick={() =>
                show(
                  "ケーキで、人を笑顔にしたい。",
                  <>
                    <p>
                      いつもの日も、大切な記念日も。ひと口で心がほどけるようなお菓子を届けたい。その想いを込めて、素材の味と手仕事を大切にしています。
                    </p>
                    <p>
                      このストーリーは架空の店舗の表示例です。お店の想いやこだわりに合わせて、自由に編集できます。
                    </p>
                  </>,
                  "chef",
                )
              }
            >
              私たちの想いを見る
            </Button>
          </div>
          <div className="chef-photo">
            <Image
              name="chef"
              alt="苺のケーキを丁寧に仕上げるパティシエ"
              loading="lazy"
            />
            <p>
              Sweets
              <br />
              make people
              <br />
              happy.
              <br />
              happy.
            </p>
          </div>
        </section>
        <section className="seasonal section-pad" id="seasonal">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Seasonal Cake</span>
              <h2>季節のおすすめ</h2>
            </div>
            <button className="text-link" onClick={() => showShop("生ケーキ")}>
              季節のケーキをもっと見る
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <div className="seasonal-grid">
            {products.slice(0, 4).map((p) => (
              <button
                className="product-card"
                key={p.id}
                onClick={() => startOrder(p)}
              >
                <Image name={p.image} alt={p.name} loading="lazy" />
                <h3>{p.name}</h3>
                <strong>
                  {yen(p.price)}
                  <small>（税込）</small>
                </strong>
                <p>{p.description}</p>
              </button>
            ))}
          </div>
        </section>
        <section className="custom-order">
          <Image
            name="birthday"
            alt="Happy Birthdayのプレートと苺を飾ったお祝いのケーキ"
            loading="lazy"
          />
          <div>
            <h2>
              大切な一日に、
              <br />
              世界にひとつだけのケーキを。
            </h2>
            <p>
              誕生日、記念日、結婚祝いなど、
              <br />
              ご希望に合わせたオーダーケーキを
              <br />
              お作りします。
            </p>
            <Button
              outline
              onClick={() =>
                startOrder({
                  id: "custom",
                  name: "オーダーケーキ",
                  image: "birthday",
                  price: 3600,
                  custom: true,
                })
              }
            >
              オーダーケーキの詳細を見る
            </Button>
          </div>
        </section>
        <section className="lineup section-pad" id="lineup">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Lineup</span>
              <h2>商品ラインナップ</h2>
            </div>
            <button className="text-link" onClick={() => showShop()}>
              商品一覧を見る
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <div className="category-grid">
            {categories.map((c) => (
              <button key={c.name} onClick={() => showShop(c.name)}>
                <Image name={c.image} alt={c.name} loading="lazy" />
                <strong>{c.name}</strong>
              </button>
            ))}
          </div>
        </section>
        <div className="shop-news section-pad">
          <section id="shop" className="shop">
            <span className="eyebrow">Shop</span>
            <h2>店舗のご案内</h2>
            <div className="shop-content">
              <button
                className="shop-photo"
                onClick={info}
                aria-label="店舗の詳細を見る"
              >
                <Image
                  name="shop"
                  alt="Pâtisserie Lumièreの木の温もりを感じる外観"
                  loading="lazy"
                />
              </button>
              <div>
                <p>
                  <MapPin weight="fill" aria-hidden="true" />
                  <span>
                    神奈川県海老名市中央1-2-3
                    <br />
                    ルミエールビル1F
                  </span>
                </p>
                <p>
                  <Train weight="fill" aria-hidden="true" />
                  <span>
                    小田急線・相鉄線 海老名駅
                    <br />
                    徒歩5分
                  </span>
                </p>
                <p>
                  <Car weight="fill" aria-hidden="true" />
                  <span>駐車場3台あり</span>
                </p>
                <Button outline onClick={info}>
                  Googleマップで見る
                </Button>
              </div>
            </div>
          </section>
          <section className="news">
            <div className="section-heading">
              <div>
                <span className="eyebrow">News</span>
                <h2>お知らせ</h2>
              </div>
              <button
                className="text-link"
                onClick={() =>
                  show(
                    "お知らせ一覧",
                    <div className="news-list-modal">
                      {news.map(([date, title, body]) => (
                        <section key={date}>
                          <time>{date}</time>
                          <h3>{title}</h3>
                          <p>{body}</p>
                        </section>
                      ))}
                    </div>,
                  )
                }
              >
                一覧を見る
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
            {news.map(([date, title, body]) => (
              <button
                className="news-item"
                key={date}
                onClick={() =>
                  show(
                    title,
                    <>
                      <time>{date}</time>
                      <p>{body}</p>
                    </>,
                  )
                }
              >
                <time>{date}</time>
                <span>{title}</span>
              </button>
            ))}
          </section>
        </div>
        <section className="faq-gift section-pad" id="faq">
          <div className="section-heading">
            <h2>よくある質問</h2>
            <button
              className="text-link"
              aria-expanded={allFaq}
              onClick={() => setAllFaq(!allFaq)}
            >
              {allFaq ? "質問を少なく表示する" : "よくある質問をもっと見る"}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <div className="faq-gift-grid">
            <div className="faq-list">
              {faqs.slice(0, allFaq ? faqs.length : 4).map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span>
                      <Plus className="plus" />
                      <Minus className="minus" />
                    </span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
            <div className="gift-banner">
              <Image
                name="gift-banner"
                alt="ベージュのリボンを結んだ上品なギフトボックス"
                loading="lazy"
              />
              <div>
                <h3>
                  手土産や
                  <br />
                  大切な方への贈り物に。
                </h3>
                <p>
                  焼き菓子の詰め合わせや
                  <br />
                  季節のギフトをご用意しています。
                </p>
                <Button onClick={() => showShop("ギフトセット")}>
                  ギフト商品を見る
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="closing">
          <Image
            name="closing"
            alt="緑を望む窓辺に苺のショートケーキと紅茶"
            loading="lazy"
          />
          <div>
            <h2>
              ケーキがあると、
              <br />
              毎日はちょっとやさしくなる。
            </h2>
            <p>あなたの暮らしに、甘い幸せを。</p>
            <Button href="#seasonal">ケーキを見に行く</Button>
          </div>
          <span className="signature">
            Pâtisserie
            <br />
            Lumière
          </span>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-main">
          <Brand />
          <nav aria-label="フッターナビゲーション">
            {nav
              .filter(([_, id]) => id !== "seasonal")
              .map(([label, id]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            <button
              onClick={() =>
                show(
                  "お問い合わせについて",
                  <p>
                    お問い合わせ先は未設定です。店舗の連絡先や外部フォームを接続してご利用ください。このページからメッセージは送信されません。
                  </p>,
                )
              }
            >
              お問い合わせ
            </button>
          </nav>
          <div className="socials">
            {[
              [InstagramLogo, "Instagram"],
              [FacebookLogo, "Facebook"],
              [ChatCircle, "LINE"],
            ].map(([Icon, name]) => (
              <button
                key={name}
                aria-label={name}
                onClick={() =>
                  show(
                    `${name}について`,
                    <p>
                      SNSのリンクは未設定です。実際のお店の公式{name}
                      アカウントへ接続してください。
                    </p>,
                  )
                }
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>
        <p className="copyright">
          © 2024 Pâtisserie Lumière. All rights reserved.
        </p>
        <p className="template-notice">
          架空のケーキ店のテンプレートです。商品・価格・原材料・店舗情報は表示例です。注文送信・予約確定・決済は行いません。
        </p>
      </footer>
      {dialog && (
        <Modal title={dialog.title} onClose={() => setDialog(null)}>
          {dialog.image && (
            <Image
              name={dialog.image}
              alt={dialog.title}
              className="detail-image"
            />
          )}
          <div className="detail-body">{dialog.body}</div>
        </Modal>
      )}
      {shopCategory !== null && (
        <ShopDialog
          initialCategory={shopCategory}
          onClose={() => setShopCategory(null)}
          onSelect={startOrder}
        />
      )}
      {order && <OrderDialog product={order} onClose={() => setOrder(null)} />}
    </div>
  );
}
