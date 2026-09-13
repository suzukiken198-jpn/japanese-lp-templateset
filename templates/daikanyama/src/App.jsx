import { useRef, useState } from 'react';
import { ArrowRight, BookOpen, Coffee, Plant, X, List } from '@phosphor-icons/react';

const stories = {
  products: { label: 'Products', title: '日々を整える、小さな贅沢を。', body: '手に触れる質感、ふと感じる香り。毎日の何気ないひとときに寄り添う、上質な日用品との出会いを。', note: '厳選された、暮らしの道具。' },
  cafe: { label: 'Café', title: '一杯の時間が、心をほどく。', body: '窓から差し込む光と、ゆっくり立ちのぼる湯気。お気に入りの一冊を片手に、自分のための静かな時間をお過ごしください。', note: 'ひと息つける、あなたの居場所。' },
  journal: { label: 'Journal', title: 'よりよく生きるためのヒントを、ここで。', body: 'いつもの日々を少し違う角度から眺めてみる。ものの選び方、心地よい時間のつくり方。暮らしを彩る、小さな気づきをお届けします。', note: '日常を彩る、読みものとの出会い。' },
};
function Photo({ scene }) { return <div aria-hidden="true" className={`photo photo--${scene}`} />; }
export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [detail, setDetail] = useState('products');
  const dialog = useRef(null);
  const openDetail = (key) => { setDetail(key); setMenuOpen(false); dialog.current.showModal(); };
  const closeDetail = () => dialog.current.close();
  const item = stories[detail];
  return <div className="site">
    <a className="skip-link" href="#about">本文へ移動</a>
    <main>
      <section id="top" className="hero" aria-labelledby="hero-title">
        <Photo scene="hero" />
        <header className="header">
          <a className="brand" href="#top" aria-label="relie 代官山 トップ"><span>relie</span><small>DAIKANYAMA</small></a>
          <nav className="desktop-nav" aria-label="メインナビゲーション"><a href="#about">About</a><a href="#scenes">Scenes</a><button onClick={() => openDetail('products')}>Products</button><button onClick={() => openDetail('journal')}>Journal</button><button onClick={() => openDetail('access')}>Access</button></nav>
          <a className="header-tagline" href="#about">静けさの、先へ</a>
          <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={25} weight="thin" /> : <List size={25} weight="thin" />}</button>
        </header>
        <nav id="mobile-nav" className="mobile-nav" hidden={!menuOpen} aria-label="スマートフォン用ナビゲーション"><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#scenes" onClick={() => setMenuOpen(false)}>Scenes</a><button onClick={() => openDetail('products')}>Products</button><button onClick={() => openDetail('journal')}>Journal</button><button onClick={() => openDetail('access')}>Access</button></nav>
        <div className="hero-copy"><h1 id="hero-title">日常の、<br />少し先に<br />ある場所。</h1><p className="hero-description">代官山の路地裏で、<br />時間がゆっくりとほどけていく。<br />ここは、心を整えるための隠れ家です。</p><p className="hero-eyebrow">A QUIET PLACE<br />IN DAIKANYAMA</p></div>
        <p className="vertical-copy">いい時間は、<br />きっと、どこかにある。</p>
      </section>
      <section id="about" className="about" aria-labelledby="about-title">
        <Photo scene="store" />
        <div className="about-content"><h2 id="about-title">ひと息で、<br />暮らしはもっと、豊かになる。</h2><p className="about-description">慌ただしい毎日の中に、ふと訪れる静かな余白。<br className="desktop-break" />relieは、そんな時間を大切にする人のための場所です。<br className="desktop-break" />上質なもの、心地よい空間、そして丁寧に選ばれた日用品。<br className="desktop-break" />ここで出会うすべてが、あなたの暮らしを少しだけ豊かにします。</p>
          <div className="features"><button onClick={() => openDetail('products')}><Plant weight="thin" /><span>厳選された<br />上質なアイテム</span></button><button onClick={() => openDetail('cafe')}><Coffee weight="thin" /><span>心がほどける<br />カフェスペース</span></button><button onClick={() => openDetail('journal')}><BookOpen weight="thin" /><span>日常を彩る<br />読みものと出会い</span></button></div>
        </div><p className="about-aside">A RICHER<br />LIFE<br />BEGINS<br />HERE.</p>
      </section>
      <section id="scenes" className="scenes" aria-label="relieで出会う3つの時間">{Object.entries(stories).map(([key, story]) => <button id={key} key={key} className="scene" onClick={() => openDetail(key)} aria-label={`${story.label}：詳しく見る`}><Photo scene={key} /><div className="scene-copy"><h2>{story.label}</h2><p>{key === 'products' ? <>日々を整える、<br />小さな贅沢を。</> : key === 'cafe' ? <>一杯の時間が、<br />心をほどく。</> : <>よりよく生きるための<br />ヒントを、ここで。</>}</p><ArrowRight weight="thin" aria-hidden="true" /></div></button>)}</section>
      <footer id="access" className="visit"><Photo scene="footer" /><h2>美しい時間を、<br />代官山で。</h2><button className="visit-button" onClick={() => openDetail('access')}>VISIT US <ArrowRight size={30} weight="thin" aria-hidden="true" /></button><p className="location">DAIKANYAMA<br />TOKYO<br />EST. 2021</p></footer>
    </main>
    <dialog ref={dialog} className="detail-dialog" aria-labelledby="detail-title" onClick={(event) => { if (event.target === event.currentTarget) closeDetail(); }}><button className="dialog-close" onClick={closeDetail} aria-label="閉じる" autoFocus><X size={25} weight="thin" /></button><div className="dialog-inner"><Photo scene={detail === 'access' ? 'store' : detail} /><div className="dialog-copy"><p className="dialog-eyebrow">RELIE DAIKANYAMA / {item?.label ?? 'ACCESS'}</p><h2 id="detail-title">{item?.title ?? <>美しい時間を、<br />代官山で。</>}</h2>{item ? <><p>{item.body}</p><p className="dialog-note">{item.note}</p><button className="text-link" onClick={() => openDetail('access')}>relieを訪れる <ArrowRight size={24} weight="thin" /></button></> : <><p>静かな路地裏で、<br />あなたのためのひとときを。</p><dl className="access-details"><div><dt>エリア</dt><dd>東京・代官山</dd></div><div><dt>住所・営業時間</dt><dd>ご案内準備中</dd></div></dl><p className="access-note">詳しい店舗情報は、決まり次第こちらでお知らせします。</p></>}</div></div></dialog>
  </div>;
}
