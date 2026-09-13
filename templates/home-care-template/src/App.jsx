import React, { useRef, useState } from "react";
import {
  ArrowRight,
  CalendarBlank,
  Car,
  CaretLeft,
  CaretRight,
  Heart,
  HouseLine,
  List,
  MapPin,
  Phone,
  Train,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import {
  navigation,
  services,
  reasons,
  voices,
  flowSteps,
  faqs,
  extraFaqs,
} from "./content";
import { Action, DetailDialog, Consultation } from "./Dialogs";
import "./home-care.css";
const assets = "/assets/";
function Brand() {
  return (
    <a className="brand" href="#home" aria-label="あすの訪問介護 トップ">
      <img src={`${assets}logo.png`} alt="" />
      <span>
        <strong>あすの訪問介護</strong>
        <small>住み慣れた場所で、これからも。</small>
      </span>
    </a>
  );
}
function Icon({ as: C, ...props }) {
  return <C weight="duotone" aria-hidden="true" {...props} />;
}
export function App() {
  const [menuOpen, setMenuOpen] = useState(false),
    [detail, setDetail] = useState(null),
    [consult, setConsult] = useState(null),
    [voiceIndex, setVoiceIndex] = useState(0),
    [moreFaq, setMoreFaq] = useState(false);
  const menuButton = useRef(null);
  const startConsult = (service = "") => {
    setDetail(null);
    setMenuOpen(false);
    setConsult({ service });
  };
  const info = (title, body, image) => setDetail({ title, body, image });
  const priceInfo = () =>
    info(
      "ご利用料金について",
      <>
        <p>
          掲載料金は、レイアウトを確認するための架空の表示例です。実際の費用はサービス内容、時間、負担割合などによって異なります。
        </p>
        <p>
          ご利用にあたっては、事業所とケアマネジャーにご確認ください。テンプレートを公開する際は、現行の料金と条件に変更してください。
        </p>
        <Action onClick={() => startConsult("料金について")}>
          料金について相談する
        </Action>
      </>,
    );
  const mapInfo = () =>
    info(
      "事業所案内・地図について",
      <>
        <p>
          事業所名・住所・電話番号・地図は架空の表示例です。実在の施設への案内ではありません。
        </p>
        <p>
          実際に使う場合は、事業所の正確な住所、対応エリア、GoogleマップのURLに置き換えてください。
        </p>
      </>,
    );
  return (
    <div className="page-shell">
      <a className="skip-link" href="#main">
        本文へ移動
      </a>
      <header id="home" className="site-header">
        <Brand />
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <List />}
        </button>
        <nav
          id="main-navigation"
          aria-label="メインナビゲーション"
          className={menuOpen ? "open" : ""}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setMenuOpen(false);
              menuButton.current?.focus();
            }
          }}
        >
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <button className="header-contact" onClick={() => startConsult()}>
          <CalendarBlank aria-hidden="true" />
          お問い合わせ
        </button>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-photo"
            src={`${assets}hero.png`}
            alt="住み慣れた家で笑い合う高齢の女性と訪問介護士のイメージ"
            fetchPriority="high"
          />
          <div className="hero-copy">
            <h1 id="hero-title">
              住み慣れた家で、
              <br />
              いつもの暮らしを
              <br />
              これからも。
            </h1>
            <p>
              あすの訪問介護は、
              <br />
              一人ひとりに寄り添ったケアで、
              <br />
              ご自宅での安心した生活を支えます。
            </p>
            <div className="hero-benefits">
              {[
                [Heart, "安心・丁寧な", "ケア"],
                [UsersThree, "経験豊富な", "スタッフ"],
                [HouseLine, "24時間相談", "対応"],
              ].map(([I, a, b]) => (
                <div key={a}>
                  <span className="benefit-icon">
                    <Icon as={I} />
                  </span>
                  <strong>
                    {a}
                    <br />
                    {b}
                  </strong>
                </div>
              ))}
            </div>
            <Action onClick={() => startConsult()}>まずは無料で相談する</Action>
          </div>
          <p className="hero-note">
            その人らしい
            <br />
            毎日を、
            <br />
            いっしょに。
          </p>
          <div className="hero-badge">
            地域で
            <strong>
              <em>10</em>年以上の
            </strong>
            安心の実績
          </div>
        </section>
        <div className="news-strip">
          <span>お知らせ</span>
          <time dateTime="2024-09-01">2024.09.01</time>
          <button
            onClick={() =>
              info(
                "秋の介護相談会を開催します",
                <>
                  <p>
                    9月15日・海老名市文化会館での相談会を想定した、お知らせの表示例です。実際のイベントは開催されません。
                  </p>
                  <p>
                    日々の介護のお悩みやサービスの利用について、気軽に相談できるご案内を掲載できます。
                  </p>
                </>,
              )
            }
          >
            秋の介護相談会を開催します（9/15・海老名市文化会館）
          </button>
          <button
            className="news-list"
            onClick={() =>
              info(
                "お知らせ",
                <p>
                  2024.09.01　秋の介護相談会を開催します。
                  <br />
                  このお知らせはサンプルです。実際の開催情報に変更してご利用ください。
                </p>,
              )
            }
          >
            一覧を見る
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
        <section id="services" className="services section-pad">
          <div className="section-heading">
            <h2>訪問介護サービス</h2>
            <p>日常生活のさまざまな場面で、安心できるサポートを提供します。</p>
          </div>
          <div className="service-grid">
            {services.map((s) => (
              <button
                className="service-card"
                key={s.name}
                onClick={() =>
                  setDetail({
                    title: s.name,
                    body: <p>{s.detail}</p>,
                    image: s.image,
                    service: true,
                  })
                }
              >
                <img
                  src={`${assets}${s.image}.png`}
                  alt={`${s.name}のイメージ`}
                  loading="lazy"
                />
                <Icon as={s.icon} />
                <h3>{s.name}</h3>
                <p>
                  {s.summary.map((line) => (
                    <React.Fragment key={line}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </button>
            ))}
          </div>
        </section>
        <section id="features" className="features section-pad">
          <h2>
            あすの訪問介護が
            <br />
            選ばれる <em>5</em>つの理由
          </h2>
          <div className="reasons-grid">
            {reasons.map(([I, a, b], i) => (
              <div className="reason" key={a}>
                <Icon as={I} />
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>
                  {a}
                  <br />
                  {b}
                </strong>
              </div>
            ))}
          </div>
        </section>
        <section id="about" className="about">
          <img
            src={`${assets}care-story.png`}
            alt="ご本人の話に耳を傾ける訪問介護士のイメージ"
            loading="lazy"
          />
          <div className="about-copy">
            <h2>
              その人らしい暮らしを、
              <br />
              これからも。
            </h2>
            <p>
              私たちは、住み慣れたご自宅で安心して
              <br className="desktop-break" />
              暮らし続けられるように、心を込めた
              <br className="desktop-break" />
              訪問介護サービスを提供しています。
              <br />
              利用者様の想いに寄り添い、ご家族の
              <br className="desktop-break" />
              安心も支えることが、私たちの使命です。
            </p>
            <Action
              outline
              onClick={() =>
                info(
                  "私たちの想い",
                  <>
                    <p>
                      住み慣れた場所で、これからも。その願いに寄り添うことから、私たちのお手伝いは始まります。
                    </p>
                    <p>
                      ご本人の「自分でできること」を大切にし、必要なところに手を添える。ご家族も無理なく過ごせるように、対話を重ねながら支えます。
                    </p>
                  </>,
                  "care-story",
                )
              }
            >
              私たちの想いを見る
            </Action>
          </div>
          <div className="about-room">
            <img
              src={`${assets}living-room.png`}
              alt="明るい窓と木の家具があるリビングのイメージ"
              loading="lazy"
            />
            <p>
              なじみの場所で、
              <br />
              いつもの暮らしを。
            </p>
          </div>
        </section>
        <section id="voice" className="voices section-pad">
          <h2>ご利用者様の声</h2>
          <div className="voice-slider">
            <button
              className="slider-control previous"
              aria-label="前の利用者の声へ"
              onClick={() =>
                setVoiceIndex((voiceIndex + voices.length - 1) % voices.length)
              }
            >
              <CaretLeft />
            </button>
            <div className="voice-grid">
              {voices.map((_, i) => {
                const v = voices[(voiceIndex + i) % voices.length];
                return (
                  <article key={v.image}>
                    <img
                      src={`${assets}${v.image}.png`}
                      alt={`${v.person}のイメージ`}
                      loading="lazy"
                    />
                    <div>
                      <p>{v.quote}</p>
                      <span>{v.person}</span>
                    </div>
                  </article>
                );
              })}
            </div>
            <button
              className="slider-control next"
              aria-label="次の利用者の声へ"
              onClick={() => setVoiceIndex((voiceIndex + 1) % voices.length)}
            >
              <CaretRight />
            </button>
          </div>
          <p className="sr-only" role="status">
            先頭の声：{voices[voiceIndex].person}。掲載内容は架空の利用例です。
          </p>
        </section>
        <section id="flow" className="flow section-pad">
          <h2>ご利用開始までの流れ</h2>
          <ol className="flow-grid">
            {flowSteps.map(([I, title, a, b], i) => (
              <li key={title}>
                <span className="flow-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <Icon as={I} />
                <p>
                  {a}
                  <br />
                  {b}
                </p>
                {i < 3 && (
                  <CaretRight className="flow-next" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </section>
        <div className="price-staff section-pad">
          <section id="price" className="price">
            <h2>ご利用料金の目安</h2>
            <p className="price-note">
              介護保険の自己負担割合により異なります。詳しくはお問い合わせください。
            </p>
            <div className="price-grid">
              {[
                ["身体介護（例）", "20分以上30分未満", "250"],
                ["生活援助（例）", "20分以上45分未満", "180"],
              ].map(([title, time, value]) => (
                <button onClick={priceInfo} className="price-card" key={title}>
                  <h3>{title}</h3>
                  <p>{time}</p>
                  <strong>
                    約 <em>{value}</em>円〜
                  </strong>
                </button>
              ))}
            </div>
            <Action outline onClick={priceInfo}>
              料金の詳細を見る
            </Action>
          </section>
          <section id="staff" className="staff">
            <div>
              <h2>スタッフ紹介</h2>
              <p>
                思いやりと専門性を持った、
                <br />
                スタッフが、
                <br />
                心を込めてサポートします。
              </p>
              <Action
                outline
                onClick={() =>
                  info(
                    "スタッフ紹介",
                    <>
                      <p>
                        経験を共有し、学び合いながら、ご本人に合ったお手伝いを考えるチームです。
                      </p>
                      <p>
                        ここに掲載した写真と紹介文は架空のサンプルです。実際に使用する場合は、スタッフの許可を得た写真・役職・資格・紹介文に変更してください。
                      </p>
                    </>,
                    "staff",
                  )
                }
              >
                スタッフ紹介を見る
              </Action>
            </div>
            <img
              src={`${assets}staff.png`}
              alt="訪問介護スタッフ3人のイメージ"
              loading="lazy"
            />
          </section>
        </div>
        <div className="access-faq section-pad">
          <section id="access" className="access">
            <h2>事業所情報・アクセス</h2>
            <div className="access-layout">
              <div>
                <p>
                  <MapPin aria-hidden="true" />
                  <span>
                    神奈川県海老名市中央1-2-3
                    <br />
                    あすの訪問介護センター
                  </span>
                </p>
                <p>
                  <Train aria-hidden="true" />
                  <span>小田急線・相鉄線 海老名駅 徒歩5分</span>
                </p>
                <p>
                  <Car aria-hidden="true" />
                  <span>駐車場あり</span>
                </p>
                <Action outline onClick={mapInfo}>
                  Googleマップで見る
                </Action>
              </div>
              <button
                className="map-button"
                onClick={mapInfo}
                aria-label="アクセス地図の説明を見る"
              >
                <img
                  src={`${assets}map.png`}
                  alt="あすの訪問介護の架空のアクセス地図"
                  loading="lazy"
                />
              </button>
            </div>
          </section>
          <section id="faq" className="faq">
            <h2>よくある質問</h2>
            <div id="faq-items">
              {(moreFaq ? [...faqs, ...extraFaqs] : faqs).map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span className="faq-symbol">
                      <CaretRight aria-hidden="true" />
                    </span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
            <Action
              outline
              aria-expanded={moreFaq}
              aria-controls="faq-items"
              onClick={() => setMoreFaq(!moreFaq)}
            >
              {moreFaq ? "質問を少なく表示する" : "よくある質問をもっと見る"}
            </Action>
          </section>
        </div>
        <section className="closing">
          <img
            src={`${assets}hands.png`}
            alt="そっと手を重ねる介助のイメージ"
            loading="lazy"
          />
          <p>
            いつもの暮らしに、
            <br />
            やさしい安心を。
          </p>
          <div>
            <h2>まずはお気軽にご相談ください。</h2>
            <Action onClick={() => startConsult()}>
              お問い合わせ・相談する
            </Action>
            <small>相談は無料です。ご家族だけのご相談も歓迎します。</small>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <Brand />
          <nav aria-label="フッターナビゲーション">
            {navigation.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
          <button
            className="phone"
            onClick={() =>
              info(
                "お電話でのご相談",
                <>
                  <p>
                    046-123-4567
                    は架空の電話番号です。このデモでは電話を発信しません。
                  </p>
                  <p>
                    実際に使用する際は、正しい電話番号と受付時間を設定してください。
                  </p>
                </>,
              )
            }
          >
            <Phone aria-hidden="true" />
            <span>
              046-123-4567<small>受付時間 8:30〜17:30（平日）</small>
            </span>
          </button>
        </div>
        <div className="footer-bottom">
          <span>© 2024 あすの訪問介護. All rights reserved.</span>
          <div>
            <button
              onClick={() =>
                info(
                  "プライバシーポリシー",
                  <>
                    <p>
                      このテンプレートの相談フォームは入力確認のみで、入力内容を送信・保存しません。ページを閉じると入力内容は破棄されます。
                    </p>
                    <p>
                      実際に公開する際は、運営者・利用目的・委託先・連絡窓口など、運営に合った内容を用意してください。フォントはGoogle
                      Fontsから読み込みます。
                    </p>
                  </>,
                )
              }
            >
              プライバシーポリシー
            </button>
            <a href="#home">サイトトップ</a>
          </div>
        </div>
        <p className="template-notice">
          架空の訪問介護事業所のテンプレートです。写真・利用者の声・実績・料金・住所・電話番号は表示例です。相談送信・予約確定・決済は行いません。
        </p>
      </footer>
      {detail && (
        <DetailDialog
          content={detail}
          onClose={() => setDetail(null)}
          onConsult={startConsult}
        />
      )}
      {consult && (
        <Consultation
          initialService={consult.service}
          onClose={() => setConsult(null)}
        />
      )}
    </div>
  );
}
