"use client";
import { useEffect, useRef, useState } from "react";
import { BRANDS } from "@/data/brands";
import { T } from "@/data/translations";
import { waLink } from "@/data/site";
import { useLocale } from "@/lib/hooks";
import { on, persist, remember, takeIntent } from "@/lib/store";

/** Enquiry form: validates name + phone, then opens WhatsApp with the details pre-filled. */
export function ContactForm() {
  const locale = useLocale();
  const L = T[locale];
  const [f, setF] = useState(() => ({ ...persist.form }));
  const [msg, setMsg] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const update = (patch: Partial<typeof f>) =>
    setF((cur) => {
      const next = { ...cur, ...patch };
      remember("form", next);
      return next;
    });

  /* prefill from "Ask about…" / "Request a quote" (same page or from a brand page) */
  useEffect(() => {
    const apply = (o: { brand?: number; msg?: string }, focusDelay: number) => {
      update({ ...(o.brand !== undefined && { brand: o.brand }), ...(o.msg !== undefined && { msg: o.msg }) });
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), focusDelay);
    };
    const off = on("prefill", (o) => apply(o, o.focusDelay));
    const it = takeIntent("prefill");
    if (it) apply(it, 80);
    return off;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = f.name.trim(), phone = f.phone.trim();
    if (!name || !phone) {
      setMsg(L.err);
      (!name ? nameRef : phoneRef).current?.focus();
      return;
    }
    const text = [
      `${L.l_name}: ${name}`,
      `${L.l_phone}: ${phone}`,
      `${L.l_type}: ${L.types[f.type]}`,
      `${L.l_brand}: ${f.brand > 0 ? BRANDS[f.brand - 1].n : L.anyBrand}`,
      f.msg.trim(),
    ]
      .filter(Boolean)
      .join("\n");
    setMsg(L.ok);
    const a = document.createElement("a");
    a.href = waLink(text);
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <form id="form" className="rv" noValidate onSubmit={submit}>
      <div className="field half">
        <label htmlFor="fName">{L.l_name}</label>
        <input id="fName" name="name" autoComplete="name" required ref={nameRef} value={f.name} onChange={(e) => update({ name: e.target.value })} />
      </div>
      <div className="field half">
        <label htmlFor="fPhone">{L.l_phone}</label>
        <input id="fPhone" name="phone" type="tel" autoComplete="tel" dir="ltr" required ref={phoneRef} value={f.phone} onChange={(e) => update({ phone: e.target.value })} />
      </div>
      <div className="field half">
        <label htmlFor="fType">{L.l_type}</label>
        <select id="fType" name="type" value={f.type} onChange={(e) => update({ type: +e.target.value })}>
          {L.types.map((t, i) => <option key={i} value={i}>{t}</option>)}
        </select>
      </div>
      <div className="field half">
        <label htmlFor="fBrand">{L.l_brand}</label>
        <select id="fBrand" name="brand" value={f.brand} onChange={(e) => update({ brand: +e.target.value })}>
          <option value={0}>{L.anyBrand}</option>
          {BRANDS.map((b, i) => <option key={b.slug} value={i + 1}>{b.n}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="fMsg">{L.l_msg}</label>
        <textarea id="fMsg" name="message" value={f.msg} onChange={(e) => update({ msg: e.target.value })}></textarea>
      </div>
      <p className="form-msg" id="formMsg" role="status">{msg}</p>
      <div className="form-foot">
        <p className="form-note">{L.f_note}</p>
        <button className="btn solid" type="submit">{L.send}</button>
      </div>
    </form>
  );
}
