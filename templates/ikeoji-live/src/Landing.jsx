import React, { useEffect, useState } from 'react';
import './landing.css';

const asset = name => `/assets/separated/${name}.jpg`;
const concerns = ['若い子向けのライブは、騒がしすぎて気後れしてしまう', '休日に刺激がなく、何をしても心から楽しめない', '「大人の色気」を感じる格好いいものに触れたい', '自分が入ってもいい「落ち着ける場所」が見つからない'];
const audience = ['騒がしいだけのライブはもう卒業した、大人の女性・男性', '魅力的な「イケオジ」のパフォーマンスを間近で見たい方', '下北沢のカルチャーは好きだが、自分が行っても浮かないか不安な方', '毎日の中に、久しぶりの「ときめき」を求めている方', '質の高い音楽と、落ち着いた雰囲気を両立させたい方'];
const values = [
  { image: 'singer', title: <>人生の厚みを感じる<br />パフォーマンス</>, text: '経験豊富な演者だからこそ表現できる、歌詞や音の「深み」に酔いしれる。' },
  { image: 'bar', title: '下北沢の隠れ家的な空間', text: '騒がしさを離れ、洗練された大人のための場所で、ゆっくりと音楽に没頭。' },
  { image: 'guitarist', title: <>忘れかけていた<br />「ときめき」</>, text: 'ステージ上で輝く「格好いい大人」の姿に、心震える非日常体験。' },
];
const comparisons = [
  ['雰囲気', '勢いがあり熱いが、騒がしく気後れすることも', '上品で格式が高く、少し敷居が高い', '大人の色気と遊び心が融合。リラックスできる熱量。'],
  ['音楽性・表現', 'エネルギッシュで荒削りな魅力', '完成された芸術性と深い感動がある', '経験に裏打ちされた深みのあるパフォーマンス'],
  ['客層・空気感', '若年層が中心で、ノリが激しいことが多い', '年齢層が高めで、静かで厳粛な雰囲気', '同世代が中心で、落ち着きと親近感がある'],
  ['楽しみ方', 'ジャンプや声出しで一体感を楽しむ', '静かに鑑賞し、余韻を味わう', 'お酒や会話も楽しみながら、音楽に酔いしれる'],
  ['総合評価', '体力も気力も必要で、疲れることも', '素晴らしいが、緊張してしまうことも', '等身大で格好いい大人を応援できる、唯一無二の体験'],
];
const faqs = [
  ['一人での参加は多いですか？', 'はい、お一人での参加も大歓迎です。同じ価値観を持つ同世代の方が多いため、お一人でも気兼ねなくお楽しみいただけます。'],
  ['どのような服装で行けばいいですか？', '特に決まりはございません。カジュアルな服装でも、少しおしゃれをしてお越しいただいても、どちらでも下北沢の夜に馴染みます。'],
  ['ライブハウスは座って見られますか？', '会場の設営状況により、座席の有無や数を調整中です。詳細は決まり次第お知らせします。'],
  ['チケットのキャンセルはできますか？', 'キャンセルに関するご案内は現在準備中です。詳細は決まり次第お知らせします。'],
];
function Cta({ children = 'チケット予約・詳細はこちら', large = false }) {
  return <a className={`ticket-button${large ? ' ticket-large' : ''}`} href="#contact"><span>{children}</span><span aria-hidden="true">›</span></a>;
}
function NumberLabel({ number, children }) { return <p className="number-label"><span>{number}</span><i>{children}</i></p>; }
function Checks({ items }) { return <ul className="checks">{items.map(t => <li key={t}>{t}</li>)}</ul>; }

function ContactForm() {
  const [review, setReview] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  return <section className="contact" id="contact" aria-labelledby="contact-title"><div className="contact-inner">
    <p className="eyebrow">CONTACT</p><h2 id="contact-title">お問い合わせ</h2><p className="contact-lead">イベントに関するご質問・ご相談はこちらから。</p>
    <p className="availability" role="note">現在、受付準備中です。フォームの入力・確認はできますが、お問い合わせはまだ送信されません。</p>
    {review ? <div className="review" role="status" tabIndex="-1" ref={el => el?.focus()}><h3>入力内容の確認</h3><dl><dt>お名前</dt><dd>{review.name}</dd><dt>メールアドレス</dt><dd>{review.email}</dd><dt>お問い合わせ内容</dt><dd>{review.message}</dd></dl><p>まだ送信されていません。受付開始までお待ちください。</p><button className="secondary-button" onClick={() => setReview(null)}>入力内容を修正する</button></div>
    : <form className="form" onSubmit={e => { e.preventDefault(); setReview({...form}); }}>
      <label htmlFor="name">お名前 <span>必須</span></label><input id="name" name="name" autoComplete="name" required maxLength="100" value={form.name} onChange={change} placeholder="例）山田 太郎" />
      <label htmlFor="email">メールアドレス <span>必須</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength="254" value={form.email} onChange={change} placeholder="例）info@example.com" />
      <label htmlFor="message">お問い合わせ内容 <span>必須</span></label><textarea id="message" name="message" required rows="5" maxLength="5000" value={form.message} onChange={change} placeholder="ご質問やご相談をご入力ください" />
      <button className="ticket-button form-submit" type="submit">入力内容を確認する <span aria-hidden="true">›</span></button>
    </form>}
  </div></section>;
}
export default function Landing() {
  const [showFloating, setShowFloating] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setShowFloating(!entry.isIntersecting));
    observer.observe(document.getElementById('contact'));
    return () => observer.disconnect();
  }, []);
  return <><a className="skip-link" href="#contact">お問い合わせへ移動</a><main className="landing">
    <section className="hero" aria-labelledby="hero-title"><picture className="hero-photo"><source media="(max-width:768px)" srcSet={asset('hero-mobile')} /><img src={asset('hero')} alt="夜のステージで演奏する男性アーティスト" fetchPriority="high" /></picture><h1 id="hero-title"><span>下北沢の<em>夜。</em></span><span>大人の<em>色気</em>と</span><span><em>音楽</em>に、</span><span><em>酔</em>いしれる。</span></h1><p className="hero-description">若手には出せない、人生の機微が宿るパフォーマンス。<br />日常を脱ぎ捨て、心震える「本物」のエンターテインメントを。</p><div className="event-overview"><p className="event-name">イベント名 掲載保留</p><dl className="event-facts"><div><dt>開催日時</dt><dd>近日公開</dd></div><div><dt>開催場所</dt><dd>近日公開</dd></div><div><dt>出演者情報</dt><dd>近日公開</dd></div></dl><Cta /><p className="fineprint">※開催日時、会場、出演者情報の詳細は順次公開いたします。</p></div></section>
    <section className="story problem" style={{ '--photo': `url(${asset('problem')})` }}><NumberLabel number="01">Problem</NumberLabel><div className="story-copy"><h2>「最近、心から<br className="mobile-only" />ワクワクしていますか？」</h2><p>毎日同じことの繰り返し。<br />仕事や家事に追われ、自分を後回しにする日々。<br />ふとした瞬間に、何かが足りないと感じることはありませんか？</p><Checks items={concerns} /></div></section>
    <section className="story gap" style={{ '--photo': `url(${asset('gap')})` }}><NumberLabel number="02">Gap</NumberLabel><div className="story-copy"><h2>「求めているのは、<br />もっと深い<em className="red">『熱』</em>。」</h2><p>話題のイベントに足を運んでみたけれど……</p><ul className="negatives"><li>周りが若すぎて浮いてしまった</li><li>ずっと立ちっぱなしで、<br />音楽を楽しむどころではなかった</li><li>きれいにまとまっているけれど、<br />魂を揺さぶられる感覚がない</li></ul><p>そんな経験はありませんか？</p></div></section>
    <section className="story risk" style={{ '--photo': `url(${asset('risk')})` }}><NumberLabel number="03">Risk</NumberLabel><div className="story-copy"><h2>このまま、心に蓋をした<br />毎日を過ごしますか？</h2><p>「もう大人だから」「今さらときめくなんて」と<br />自分を抑え込む必要はありません。<br />良質な刺激のない日常は、<br />少しずつあなたの活力を奪ってしまいます。</p><p className="gold">心から「格好いい」と思えるものに出会う体験は、<br />明日を生きるエネルギーに変わるはずです。</p></div></section>
    <section className="story concept" style={{ '--photo': `url(${asset('concept')})` }}><NumberLabel number="04">Concept</NumberLabel><div className="story-copy"><h2>大人の遊び場、下北沢。<br />経験が紡ぎ出す、極上の夜。</h2><p>若手の「勢い」だけでは決して出せない。<br />長い時間をかけて磨き上げられた「経験」と「余裕」、<br />そして溢れ出る「大人の色気」。</p><p>ここは、魅力溢れる「イケオジ」たちが主役のステージ。<br />下北沢というカルチャー発信地で、<br />人生の機微を知る大人たちのための、<br />深く、熱いパフォーマンスをお届けします。</p></div></section>
    <section className="values"><p className="section-kicker">このライブでしか味わえない</p><h2>「<em>3</em>つの価値」</h2><div className="ornament" aria-hidden="true" /><div className="value-grid">{values.map((v,i) => <article className="value-card" key={v.image}><img src={asset(v.image)} alt={['歌う男性アーティスト','静かなバーのカウンター','ギターを奏でる男性'][i]} loading="lazy" /><div><span className="value-number">0{i+1}</span><h3>{v.title}</h3><p>{v.text}</p></div></article>)}</div></section>
    <section className="energy" style={{ '--photo': `url(${asset('energy')})` }}><h2>明日からまた頑張れる、<br />特別なエネルギーをチャージ。</h2><div className="ornament" aria-hidden="true" /><p>ライブが終わった帰り道、<br />あなたはきっと清々しい高揚感に包まれているはずです。</p><ul className="benefits">{['日常の疲れがリセットされ、心が軽くなる','同世代が輝く姿に「自分もまだまだこれからだ」と勇気をもらえる','「新しい推し」に出会い、日々の生活に彩りが加わる','感想を誰かに話したくなる、特別な思い出ができる'].map((b,i)=><li key={b}><span aria-hidden="true">0{i+1}</span><p>{b}</p></li>)}</ul></section>
    <section className="audience" style={{ '--photo': `url(${asset('audience')})` }}><h2>こんな方に、<br />ぜひお越しいただきたい。</h2><div className="ornament" aria-hidden="true" /><Checks items={audience} /></section>
    <section className="comparison"><h2>大人のあなたが、<br />今、本当に楽しめる場所を。</h2><div className="ornament" aria-hidden="true" /><div className="table-scroll" tabIndex="0" role="region" aria-label="ライブの特徴を比較する表。横にスクロールできます。"><table><caption className="sr-only">若手バンド、クラシック、本イベントの特徴比較</caption><thead><tr><th scope="col">比較項目</th><th scope="col">若手バンドのライブ</th><th scope="col">クラシックコンサート</th><th scope="col">本イベント</th></tr></thead><tbody>{comparisons.map(row=><tr key={row[0]}>{row.map((c,i)=>i===0?<th scope="row" key={i}>{c}</th>:<td key={i}>{c}</td>)}</tr>)}</tbody></table></div><p className="mobile-only table-hint">表は左右にスクロールできます。</p></section>
    <section className="atmosphere" style={{ '--photo': `url(${asset('atmosphere')})` }}><h2>大切にしたいのは、<br />大人のための空気感。</h2><div className="ornament" aria-hidden="true" /><p>恐れ入りますが、以下のような方は<br />ご満足いただけない可能性がございます。</p><ul className="etiquette"><li>モッシュやダイブなど、<br />激しいノリを重視する方</li><li>大音量で騒ぐことだけを<br />目的としている方</li><li>静かに音楽を楽しむ<br />雰囲気を大切にできない方</li></ul></section>
    <section className="faq"><header><h2>よくある<br />ご質問</h2><p className="section-kicker">FAQ</p></header><div className="faq-list">{faqs.map(([q,a])=><details key={q} open><summary><span className="qa-letter" aria-hidden="true">Q</span><span>{q}</span><span className="toggle" aria-hidden="true" /></summary><div className="answer"><span className="qa-letter" aria-hidden="true">A</span><p>{a}</p></div></details>)}</div></section>
    <section className="closing"><div className="closing-copy"><h2>下北沢で、<br />忘れられない<br /><em>大人の夜を。</em></h2><p>あなたの毎日を彩る、<br />新しいときめきがここにあります。<br />定員に達し次第受付終了となりますので、<br />お早めにご予約ください。</p><div className="ornament" aria-hidden="true" /><p className="fineprint">開催場所・日時：詳細は順次公開<br />チケット料金・支払い方法：詳細は順次公開</p></div><div className="closing-action"><Cta large>チケットを予約する</Cta><p className="fineprint">現在、イベントの詳細・予約受付は準備中です。<br />ボタンからお問い合わせ欄へ進めます。</p></div></section>
    <ContactForm /><footer><a href="#hero-title">ページの先頭へ ↑</a><p>IKEOZI LIVE · SHIMOKITAZAWA</p></footer>
  </main>{showFloating && <a className="floating-contact" href="#contact">お問い合わせ <span aria-hidden="true">›</span></a>}</>;
}
