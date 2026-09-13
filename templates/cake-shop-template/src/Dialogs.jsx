import React, { useEffect, useRef, useState } from "react";
import {
  X,
  ArrowRight,
  CheckCircle,
  ShoppingBag,
  Minus,
  Plus,
} from "@phosphor-icons/react";
import { products, categories, yen } from "./content";
export function Modal({ title, onClose, children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current,
      previous = document.activeElement,
      overflow = document.body.style.overflow;
    d.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      d.close();
      document.body.style.overflow = overflow;
      const target = previous?.isConnected && previous !== document.body
        ? previous
        : document.querySelector('.header .brand');
      target?.focus?.();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby="modal-title"
      onCancel={onClose}
    >
      <button className="modal-close" aria-label="閉じる" onClick={onClose}>
        <X />
      </button>
      <span className="eyebrow">PÂTISSERIE LUMIÈRE</span>
      <h2 id="modal-title">{title}</h2>
      {children}
    </dialog>
  );
}
export function ShopDialog({ initialCategory, onClose, onSelect }) {
  const [category, setCategory] = useState(initialCategory),
    [search, setSearch] = useState("");
  const visible = products.filter(
    (p) =>
      (category === "すべて" || p.category === category) &&
      p.name.includes(search.trim()),
  );
  return (
    <Modal title="オンラインショップ" className="shop-modal" onClose={onClose}>
      <p className="demo-note">
        商品選択のデモです。注文・在庫確保・決済は行いません。
      </p>
      <label className="search-label">
        商品を探す
        <input
          type="search"
          value={search}
          placeholder="商品名を入力"
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <div className="category-tabs" aria-label="商品カテゴリー">
        {["すべて", ...categories.map((c) => c.name)].map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p role="status" className="result-count">
        {visible.length}件の商品
      </p>
      <div className="shop-grid">
        {visible.map((p) => (
          <button
            className="shop-product"
            key={p.id}
            onClick={() => onSelect(p)}
          >
            <img src={`/assets/${p.image}.png`} alt={p.name} />
            <h3>{p.name}</h3>
            <p>
              {yen(p.price)}
              <small>（税込）</small>
            </p>
            <span>
              商品を見る <ArrowRight />
            </span>
          </button>
        ))}
      </div>
      {!visible.length && (
        <div className="empty-state">
          <ShoppingBag />
          <h3>商品が見つかりませんでした</h3>
          <p>商品名やカテゴリーを変えてお試しください。</p>
          <button
            className="button"
            onClick={() => {
              setSearch("");
              setCategory("すべて");
            }}
          >
            すべての商品を見る
            <ArrowRight />
          </button>
        </div>
      )}
    </Modal>
  );
}
export function OrderDialog({ product: p, onClose }) {
  const [step, setStep] = useState("select"),
    [quantity, setQuantity] = useState(1),
    [size, setSize] = useState("4号"),
    [date, setDate] = useState(""),
    [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [consent, setConsent] = useState(false);
  const heading = useRef(null);
  const price = p.custom
      ? { "4号": 3600, "5号": 4500, "6号": 5400 }[size]
      : p.price,
    total = price * quantity;
  useEffect(() => {
    if (step !== "select") heading.current?.focus();
  }, [step]);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");
  const titles = {
    select: p.name,
    input: "お受け取り情報（デモ）",
    review: "選んだ内容を確認",
    done: "デモの確認が完了しました",
  };
  return (
    <Modal title={titles[step]} onClose={onClose} className="order-modal">
      <p className="demo-note">
        入力・確認だけのデモです。実際の個人情報は入力しないでください。送信・保存・注文確定・決済は行いません。
      </p>
      <div ref={heading} tabIndex={-1} className="step-content">
        {step === "select" && (
          <>
            <img
              className="detail-image"
              src={`/assets/${p.image}.png`}
              alt={p.name}
            />
            <p className="product-detail">
              {p.detail ||
                "誕生日や記念日に。サイズを選んで、ご希望のお受け取り日を入力する流れを体験できます。デザインや価格は表示例です。"}
            </p>
            <p className="allergens">
              原材料表示例：{p.allergens || "小麦・卵・乳成分"}
              。実際の原材料・製造環境は店舗にご確認ください。
            </p>
            {p.custom && (
              <label>
                サイズ
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  <option>4号</option>
                  <option>5号</option>
                  <option>6号</option>
                </select>
              </label>
            )}
            <div className="quantity-line">
              <span>数量</span>
              <div>
                <button
                  aria-label="数量を減らす"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => q - 1)}
                >
                  <Minus />
                </button>
                <output aria-live="polite">{quantity}</output>
                <button
                  aria-label="数量を増やす"
                  disabled={quantity >= 10}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus />
                </button>
              </div>
              <strong>
                {yen(total)}
                <small>（税込）</small>
              </strong>
            </div>
            <button className="button wide" onClick={() => setStep("input")}>
              この内容で進む（デモ）
              <ArrowRight />
            </button>
          </>
        )}
        {step === "input" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep("review");
            }}
          >
            <label>
              お受け取り希望日 必須
              <input
                required
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <p className="field-note">
              空き状況や実際の営業日は確認されません。
            </p>
            <label>
              お名前 必須
              <input
                required
                maxLength={80}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="デモ用のお名前"
                autoComplete="off"
              />
            </label>
            <label>
              メールアドレス 必須
              <input
                required
                type="email"
                maxLength={160}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@example.com"
                autoComplete="off"
              />
            </label>
            <label className="consent">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              注文されないデモであることを確認しました。
            </label>
            <div className="modal-actions">
              <button
                type="button"
                className="button outline"
                onClick={() => setStep("select")}
              >
                商品に戻る
              </button>
              <button className="button" type="submit">
                内容を確認する
                <ArrowRight />
              </button>
            </div>
          </form>
        )}
        {step === "review" && (
          <>
            <dl className="review">
              {[
                ["商品", p.name],
                ...(p.custom ? [["サイズ", size]] : []),
                ["数量", `${quantity}点`],
                ["合計（表示例）", `${yen(total)}（税込）`],
                ["受け取り希望日", date],
                ["お名前", name],
                ["メールアドレス", email],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt>{a}</dt>
                  <dd>{b}</dd>
                </div>
              ))}
            </dl>
            <p>こちらの内容はお店には届きません。注文や予約は成立しません。</p>
            <div className="modal-actions">
              <button
                className="button outline"
                onClick={() => setStep("input")}
              >
                入力を修正する
              </button>
              <button className="button" onClick={() => setStep("done")}>
                デモの確認を終える
                <ArrowRight />
              </button>
            </div>
          </>
        )}
        {step === "done" && (
          <div className="done">
            <CheckCircle />
            <h3>ご確認ありがとうございました。</h3>
            <p>
              注文は送信されていません。
              <br />
              実際に使う際は、外部のショップや予約サービス、決済機能を接続してください。
            </p>
            <button className="button" onClick={onClose}>
              ページへ戻る
              <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
