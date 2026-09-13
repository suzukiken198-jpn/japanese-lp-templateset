import { useEffect, useRef, useState } from 'react';
import { Heart, ChartBar, UsersThree, Leaf, ArrowRight, CaretLeft, CaretRight, MapPin, Train, Car, Plus, Minus, List, X, InstagramLogo, XLogo, ChatCircleDots } from '@phosphor-icons/react';
import './landing.css';

const navigation = [['ホーム', 'home'], ['サービス', 'service'], ['選ばれる理由', 'features'], ['料金プラン', 'price'], ['お客様の声', 'voice'], ['よくある質問', 'faq'], ['アクセス', 'access']];
const benefits = [[Heart, <>丁寧な<br />カウンセリング</>], [ChartBar, <>成果につながる<br />サポート</>], [UsersThree, <>同じ想いの仲間と<br />つながる</>], [Leaf, <>ライフスタイル<br />に合わせた提案</>]];
const features = [
  { image: 'feature-staff.png', title: '経験豊富な専門スタッフ', copy: <>各分野のプロが<br />しっかりサポート。</> },
  { image: 'feature-plan.png', title: '柔軟なプラン設計', copy: <>ライフスタイルに合わせて<br />無理なく続けられる。</> },
  { image: 'feature-room.png', title: '快適な環境', copy: <>落ち着いた空間で<br />集中できる。</> },
];
const plans = [
  { name: 'ライトプラン', price: '9,800', description: 'まずは気軽に始めたい方に' },
  { name: 'スタンダードプラン', price: '19,800', description: '一番人気の基本プラン', recommended: true },
  { name: 'プレミアムプラン', price: '29,800', description: 'しっかり成果を目指す方に' },
];
const reviews = [
  { title: '自分のやりたかったことに一歩踏み出せました！', copy: '丁寧に話を聞いてもらい、安心してスタートできました。今では毎日が充実しています。', person: '30代 女性' },
  { title: '自分のペースで、目標を整理できました。', copy: '忙しい日々の中でも、できることから少しずつ。相談の時間が、次の一歩を考えるきっかけになりました。', person: 'ご利用者の声・表示例 02' },
  { title: 'これからの「やりたい」が見えてきました。', copy: 'ひとりでは気づかなかった選択肢を知ることができました。無理のないプランで、前向きに取り組んでいます。', person: 'ご利用者の声・表示例 03' },
];
const faqs = [
  ['初心者でも大丈夫ですか？', 'はい。はじめての方にも、目標や現在の状況をうかがいながら、取り組みやすい内容をご提案します。実際の対応範囲は、運営者のサービス内容に合わせて設定してください。'],
  ['料金の支払い方法を教えてください', 'このページの料金はテンプレート用の表示例です。支払い方法、税表示、課金日などは公開前に実際の条件へ差し替えてください。このデモではお支払いは発生しません。'],
  ['どのような人が利用していますか？', '新しいことを始めたい方や、自分らしいライフスタイルを考えたい方に向けたサービスを想定しています。掲載する体験談は、本人の許可を得た実際の内容に差し替えてください。'],
  ['途中でプランの変更はできますか？', 'プラン変更の受付時期・手続き・料金差額の扱いは、実際のサービスごとに設定してください。こちらは回答の表示例であり、変更を確約する案内ではありません。'],
  ['オンラインでの相談は可能ですか？', 'オンライン・対面を選べる相談フォームのデモを用意しています。実際の対応方法と予約先を設定してからご利用ください。'],
  ['解約はいつでもできますか？', '解約期限・手続き・返金の条件は、実際のサービスに合わせて設定してください。このテンプレート上では契約や自動課金は行いません。'],
];
const steps = [ ['無料相談予約', 'Webから簡単予約'], ['カウンセリング', '目的やお悩みをヒアリング'], ['プランのご提案', '最適なプランをご提案'], ['ご利用開始', '一緒に目標に向けてスタート！'] ];
const info = {
  service: ['サービス紹介', 'あなたの目標やライフスタイルをうかがい、カウンセリング・プラン設計・継続サポートを組み合わせてご提案するサービスを想定しています。', '提供内容・対応時間・担当者などはサンプルです。実際のサービスに合わせて編集してください。'],
  company: ['会社概要', '会社名：BRAND（サンプル）／所在地：公開前に設定してください。', 'このページはLPテンプレートです。実在する会社や店舗の案内ではありません。'],
  privacy: ['プライバシーポリシー', 'このデモのフォーム入力は、画面上での内容確認にのみ利用されます。外部への送信・サーバー保存・決済は行いません。', '実際にフォームを運用する際は、取得情報・利用目的・保存期間・問い合わせ窓口等を定めたポリシーに差し替えてください。'],
  legal: ['特定商取引法に基づく表記', '販売者・価格の税表示・支払い方法・提供時期・解約および返金条件などは未設定です。', 'このページからの販売・決済は行っていません。販売開始前に必要な情報を整えてください。'],
  social: ['SNSリンクは準備中です', '公開前に、運営するSNSアカウントのURLを設定してください。', 'このテンプレートから自動的に投稿やメッセージ送信が行われることはありません。'],
};
function Heading({ label, children }) { return <div className="section-title"><p>{label}</p><h2>{children}</h2></div>; }

export function App() {
  const [menu, setMenu] = useState(false);
  const [review, setReview] = useState(0);
  const [modal, setModal] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('まずは無料相談');
  const [form, setForm] = useState({ name: '', email: '', method: 'オンライン', message: '', demo: false });
  const [confirmed, setConfirmed] = useState(false);
  const dialog = useRef(null);
  useEffect(() => { if (modal && !dialog.current.open) dialog.current.showModal(); else if (!modal && dialog.current.open) dialog.current.close(); }, [modal]);
  function close() { setModal(null); setConfirmed(false); }
  function consult(plan = 'まずは無料相談') { setSelectedPlan(plan); setForm({ name: '', email: '', method: 'オンライン', message: '', demo: false }); setConfirmed(false); setMenu(false); setModal('consult'); }
  function update(e) { const { name, value, type, checked } = e.target; setForm(previous => ({ ...previous, [name]: type === 'checkbox' ? checked : value })); }
  function cta(text = '無料で相談する', className = '', plan) { return <button className={`cta ${className}`} onClick={() => consult(plan)}>{text}<ArrowRight size={18} aria-hidden="true" /></button>; }
  const voice = reviews[review];
  return <>
    <a className="skip-link" href="#main">本文へ移動</a>
    <header className="site-header" id="home"><a className="brand" href="#home">BRAND</a><nav className={menu ? 'navigation is-open' : 'navigation'} aria-label="メインナビゲーション">{navigation.map(([name, id]) => <a href={`#${id}`} key={id} onClick={() => setMenu(false)}>{name}</a>)}</nav>{cta('無料で相談する', 'header-cta')}<button className="menu-button" aria-label={menu ? 'メニューを閉じる' : 'メニューを開く'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <List />}</button></header>
    <main id="main">
      <section className="hero"><img className="hero-image" src="/assets/hero.png" alt="青空と街並みを背景に笑顔で見上げる女性" fetchPriority="high" /><div className="hero-copy"><h1>わたしらしい<br />未来を、<br /><span>ここから。</span></h1><p>今日の一歩が、<br />明日を変える。</p>{cta('まずは無料で相談する')}<small>オンラインでもご相談いただけます</small></div><div className="hero-side"><p>あなたの<br />やりたいが、<br />きっと見つかる。</p><div className="satisfaction"><img src="/assets/badge.png" alt="" /><div><span>相談満足度</span><strong>92<small>%</small></strong></div><small className="sample-stat">表示例・実際の実績ではありません</small></div></div></section>
      <section className="about content-width"><Heading label="ABOUT">あなたの「やりたい」を、カタチにする。</Heading><p className="about-intro">私たちは、挑戦するすべての人に寄り添い、<br />理想のライフスタイルを実現するサポートをします。</p><div className="benefits">{benefits.map(([Icon, title], i) => <div key={i}><span className="benefit-icon"><Icon weight="light" aria-hidden="true" /></span><h3>{title}</h3></div>)}</div></section>
      <section className="service" id="service"><img src="/assets/service.png" alt="窓際の木のデスクに置かれたノートパソコンと青いマグカップ" loading="lazy" /><div><p className="section-label">SERVICE</p><h2>サービス紹介</h2><p className="service-copy">一人ひとりの目標に合わせた<br />最適なプランをご提案します。</p><button className="outline-button" onClick={() => setModal('service')}>サービスの詳細を見る<ArrowRight aria-hidden="true" /></button></div></section>
      <section className="features content-width" id="features"><Heading label="FEATURE">選ばれる3つの理由</Heading><div className="feature-grid">{features.map((feature, i) => <article className="feature-card" key={feature.title}><div className="feature-image"><img src={`/assets/${feature.image}`} alt={feature.title} loading="lazy" /><span>{String(i + 1).padStart(2, '0')}</span></div><div className="feature-copy"><h3>{feature.title}</h3><p>{feature.copy}</p></div></article>)}</div></section>
      <section className="voice content-width" id="voice"><Heading label="VOICE">ご利用者の声</Heading><div className="voice-slider"><button className="slider-arrow" aria-label="前の声を見る" onClick={() => setReview((review + reviews.length - 1) % reviews.length)}><CaretLeft weight="light" /></button><article className="voice-card" aria-live="polite"><img src="/assets/avatar.png" alt="ご利用者の声のサンプル写真" loading="lazy" /><div><h3>{voice.title}</h3><p>{voice.copy}</p><span>{voice.person}</span><small>※体験談・人物はテンプレート用のサンプルです。</small></div></article><button className="slider-arrow" aria-label="次の声を見る" onClick={() => setReview((review + 1) % reviews.length)}><CaretRight weight="light" /></button></div><div className="slider-dots" aria-label="表示する声を選択">{reviews.map((_, i) => <button key={i} aria-label={`${i + 1}件目の声を表示`} aria-pressed={review === i} onClick={() => setReview(i)}><span /></button>)}</div></section>
      <section className="pricing content-width" id="price"><Heading label="PRICE">料金プラン</Heading><div className="plans">{plans.map(plan => <article className={`plan ${plan.recommended ? 'recommended' : ''}`} key={plan.name}>{plan.recommended && <div className="recommended-label">おすすめ</div>}<h3>{plan.name}</h3><p className="plan-price">月額 <strong>{plan.price}</strong>円</p><p className="plan-description">{plan.description}</p><button className={plan.recommended ? 'plan-button filled' : 'plan-button'} onClick={() => consult(plan.name)}>プランを選ぶ<ArrowRight aria-hidden="true" /></button></article>)}</div><p className="sample-note">※料金・おすすめ表示はサンプルです。税表示・提供内容・支払い条件は公開前に設定してください。</p></section>
      <section className="flow content-width" id="flow"><Heading label="FLOW">ご利用開始までの流れ</Heading><ol className="flow-grid">{steps.map(([title, copy], i) => <li key={title}><div><span>{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></div>{i < 3 && <CaretRight className="flow-arrow" weight="light" aria-hidden="true" />}</li>)}</ol></section>
      <section className="faq content-width" id="faq"><Heading label="FAQ"><span className="sr-only">よくある質問</span></Heading><div className="faq-grid">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus className="plus" aria-hidden="true" /><Minus className="minus" aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>
      <section className="access" id="access"><div className="access-copy"><p className="section-label">ACCESS</p><h2>アクセス</h2><div className="address"><MapPin weight="fill" aria-hidden="true" /><p>東京都渋谷区神南1-1-1<br />BRANDビル 3F<span>※所在地はサンプルです</span></p></div><ul><li><Train aria-hidden="true" />JR渋谷駅 徒歩5分</li><li><Train aria-hidden="true" />東京メトロ 渋谷駅 徒歩3分</li><li><Car aria-hidden="true" />近隣にコインパーキングあり</li></ul><a className="outline-button" href="https://www.google.com/maps/search/?api=1&query=%E6%B8%8B%E8%B0%B7%E9%A7%85" target="_blank" rel="noopener noreferrer">Googleマップで周辺を見る<ArrowRight aria-hidden="true" /></a></div><div className="map-image"><img src="/assets/map.png" alt="アクセス図の表示イメージ。実際の所在地を示す地図ではありません" loading="lazy" /><span>アクセス図（サンプル）</span></div><img className="access-room" src="/assets/reception.png" alt="木と緑を取り入れた受付のサンプル写真" loading="lazy" /></section>
      <section className="closing"><img src="/assets/closing.png" alt="緑の中で笑顔を見せる女性" loading="lazy" /><p className="closing-script">新しい自分に、<br /><span>出会おう。</span></p><div className="closing-copy"><h2>まずは無料で相談する</h2>{cta()}<p>オンライン対応・無理な勧誘はありません。</p><small>※相談は入力確認のみのデモです。</small></div></section>
    </main>
    <footer className="site-footer"><div><a className="brand" href="#home">BRAND</a><p>LIFE DESIGN FOR A BETTER YOU</p></div><nav aria-label="運営情報"><button onClick={() => setModal('company')}>会社概要</button><button onClick={() => setModal('privacy')}>プライバシーポリシー</button><button onClick={() => setModal('legal')}>特定商取引法に基づく表記</button><button onClick={() => consult()}>お問い合わせ</button></nav><div className="footer-right"><div className="socials"><button aria-label="Instagramの設定案内" onClick={() => setModal('social')}><InstagramLogo /></button><button aria-label="Xの設定案内" onClick={() => setModal('social')}><XLogo /></button><button aria-label="メッセージ窓口の設定案内" onClick={() => setModal('social')}><ChatCircleDots weight="fill" /></button></div><small>© 2026 BRAND. Template demo.</small></div></footer>
    <dialog ref={dialog} className="modal" aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === dialog.current) close(); }}><div className="modal-content"><button className="modal-close" aria-label="閉じる" onClick={close}><X /></button>{modal === 'consult' ? <><p className="section-label">FREE CONSULTATION / DEMO</p><h2 id="dialog-title">{confirmed ? '入力内容の確認' : '無料相談の入力デモ'}</h2><p className="modal-notice">受付準備中です。入力内容は外部に送信・保存されません。実際の予約・契約・決済は行われません。</p>{confirmed ? <div className="review-state"><p className="review-status" role="status">入力内容を確認しました。<br /><strong>まだ送信されていません。</strong></p><dl><dt>お名前</dt><dd>{form.name}</dd><dt>メールアドレス</dt><dd>{form.email}</dd><dt>ご希望のプラン</dt><dd>{selectedPlan}</dd><dt>相談方法</dt><dd>{form.method}</dd><dt>ご相談内容</dt><dd>{form.message || '未記入'}</dd></dl><button className="outline-button" onClick={() => setConfirmed(false)}>入力内容を修正する</button><button className="cta" onClick={close}>確認を終える</button></div> : <form onSubmit={event => { event.preventDefault(); setConfirmed(true); }}><label>お名前 <span>必須</span><input autoFocus name="name" value={form.name} onChange={update} autoComplete="name" required maxLength={80} /></label><label>メールアドレス <span>必須</span><input name="email" type="email" value={form.email} onChange={update} autoComplete="email" required maxLength={160} /></label><label>ご希望のプラン<select value={selectedPlan} onChange={event => setSelectedPlan(event.target.value)}><option>まずは無料相談</option>{plans.map(plan => <option key={plan.name}>{plan.name}</option>)}</select></label><label>相談方法<select name="method" value={form.method} onChange={update}><option>オンライン</option><option>対面</option><option>相談して決めたい</option></select></label><label>ご相談内容<textarea name="message" value={form.message} onChange={update} rows={3} maxLength={2000} /></label><label className="demo-check"><input type="checkbox" name="demo" checked={form.demo} onChange={update} required /><span>入力確認のみのデモで、予約は送信されないことを確認しました。</span></label><button className="cta" type="submit">入力内容を確認する<ArrowRight aria-hidden="true" /></button></form>}</> : modal && info[modal] ? <><p className="section-label">INFORMATION / SAMPLE</p><h2 id="dialog-title">{info[modal][0]}</h2><p className="info-copy">{info[modal][1]}</p><p className="modal-notice">{info[modal][2]}</p>{modal === 'service' && cta('無料相談の入力デモへ')}<button className="outline-button info-close" onClick={close}>閉じる</button></> : null}</div></dialog>
  </>;
}
