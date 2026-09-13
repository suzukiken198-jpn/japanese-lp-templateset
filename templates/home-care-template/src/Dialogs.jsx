import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle, X } from "@phosphor-icons/react";
import { services } from "./content";
export function Action({
  children,
  className = "",
  outline = false,
  ...props
}) {
  return (
    <button
      className={`action ${outline ? "outline" : ""} ${className}`}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden="true" />
    </button>
  );
}
function useModal(ref, onClose) {
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = before;
      previous?.focus?.();
    };
  }, []);
}
export function DetailDialog({ content, onClose, onConsult }) {
  const ref = useRef(null);
  useModal(ref, onClose);
  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
    >
      <button className="dialog-close" onClick={onClose} aria-label="閉じる">
        <X />
      </button>
      <p className="eyebrow">ASUNO HOME CARE</p>
      <h2 id="dialog-title">{content.title}</h2>
      {content.image && (
        <img
          className="dialog-photo"
          src={`/assets/${content.image}.png`}
          alt={content.title + "のイメージ"}
        />
      )}
      <div className="dialog-copy">{content.body}</div>
      {content.service && (
        <Action onClick={() => onConsult(content.title)}>
          このサービスについて相談する
        </Action>
      )}
    </dialog>
  );
}
export function Consultation({ initialService, onClose }) {
  const ref = useRef(null),
    heading = useRef(null);
  useModal(ref, onClose);
  const [step, setStep] = useState("input");
  const [values, setValues] = useState({
    service: initialService || "ご利用についての相談",
    relation: "ご本人",
    name: "",
    email: "",
    consent: false,
  });
  const update = (e) =>
    setValues((v) => ({
      ...v,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  useEffect(() => {
    if (step !== "input") heading.current?.focus();
  }, [step]);
  return (
    <dialog
      className="dialog consultation"
      ref={ref}
      aria-labelledby="consult-title"
      onCancel={onClose}
    >
      <button
        className="dialog-close"
        aria-label="相談フォームを閉じる"
        onClick={onClose}
      >
        <X />
      </button>
      <p className="eyebrow">CONTACT / TEMPLATE DEMO</p>
      <h2 id="consult-title" ref={heading} tabIndex={-1}>
        {step === "input"
          ? "無料相談の入力デモ"
          : step === "review"
            ? "入力内容の確認"
            : "デモの確認が完了しました"}
      </h2>
      <p className="demo-notice">
        入力・確認だけのデモです。送信・保存・予約確定は行いません。実際の個人情報や介護・健康に関する情報は入力しないでください。
      </p>
      {step === "input" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep("review");
          }}
        >
          <label>
            ご相談内容
            <select name="service" value={values.service} onChange={update}>
              <option>ご利用についての相談</option>
              {services.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
              <option>料金について</option>
            </select>
          </label>
          <label>
            ご相談される方
            <select name="relation" value={values.relation} onChange={update}>
              <option>ご本人</option>
              <option>ご家族</option>
              <option>ケアマネジャー</option>
              <option>その他</option>
            </select>
          </label>
          <label>
            お名前 <span className="required">必須</span>
            <input
              name="name"
              value={values.name}
              onChange={update}
              required
              maxLength={80}
              autoComplete="off"
              placeholder="デモ用のお名前"
            />
          </label>
          <label>
            メールアドレス <span className="required">必須</span>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={update}
              required
              maxLength={160}
              autoComplete="off"
              placeholder="demo@example.com"
            />
          </label>
          <label className="consent">
            <input
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={update}
              required
            />
            送信されないデモであることを確認しました。
          </label>
          <Action type="submit">入力内容を確認する</Action>
        </form>
      )}
      {step === "review" && (
        <>
          <dl className="review-list">
            {[
              ["ご相談内容", values.service],
              ["ご相談される方", values.relation],
              ["お名前", values.name],
              ["メールアドレス", values.email],
            ].map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p>この内容は事業所には届きません。確認後はデモを終了できます。</p>
          <div className="dialog-actions">
            <Action outline onClick={() => setStep("input")}>
              入力を修正する
            </Action>
            <Action onClick={() => setStep("finished")}>
              デモの確認を終える
            </Action>
          </div>
        </>
      )}
      {step === "finished" && (
        <>
          <CheckCircle
            className="completion-icon"
            weight="duotone"
            aria-hidden="true"
          />
          <p>
            ご確認ありがとうございました。お問い合わせは送信されていません。実際に利用する場合は、外部の予約サービスや送信機能を接続してください。
          </p>
          <Action onClick={onClose}>ページへ戻る</Action>
        </>
      )}
    </dialog>
  );
}
