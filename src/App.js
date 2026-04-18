import { useState } from "react";

const SUBSCRIBERS = [
  { id: 1, name: "Monika", email: "m.tychowska@promatic.pl", whatsapp: "537853800", preferences: ["WSZYSTKO"], budgetFlight: 99999, notes: "Wszystkie kierunki, elastyczna" },
  { id: 2, name: "Alicja", email: "ala@dimenti.pl", preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej","Góry","Egzotyka","Skandynawia","City break","Safari","Krótki lot","Średni lot","Długi lot","Z dziećmi"], budgetFlight: 2000, notes: "Kiedy tanie, max 2000 zł lot+nocleg" },
  { id: 3, name: "Paulina", email: "zpaulina93@wp.pl", preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej","Góry","Egzotyka","Skandynawia","City break","Safari","Krótki lot","Średni lot","Długi lot","Z dziećmi"], budgetFlight: 1000, notes: "Kiedy najlepsza oferta, budżet całość 3000" },
  { id: 4, name: "Paulina P.", email: "p.paluszkiewicz@onet.eu", whatsapp: "792606540", preferences: ["Ciepłe kierunki (Europa)","City break","Z dziećmi","Góry"], budgetFlight: 1000, notes: "Dzieci 4 i 10 lat, atrakcje, góry, wycieczki rowerowe" },
  { id: 5, name: "Agnieszka", email: "A.szwed@promatic.pl", whatsapp: "883225266", preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej","Góry","Egzotyka","Skandynawia","City break","Safari","Krótki lot","Średni lot","Długi lot","Z dziećmi"], budgetFlight: 2000, notes: "Dziecko 4 lata, bliskość natury" },
  { id: 6, name: "Marta", whatsapp: "609938348", email: null, preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej","Góry","Egzotyka","City break","Z dziećmi"], budgetFlight: 1000, notes: "Dziecko 5 lat, tylko WhatsApp" },
  { id: 7, name: "Katarzyna", email: "katarzynaszopiakk@gmail.com", preferences: ["Egzotyka","Ciepłe kierunki dalej","Długi lot"], budgetFlight: 99999, notes: "Japonia i Korea, listopad, 15-21 dni, budżet 9000 zł" },
  { id: 8, name: "Sionn", email: "Sionna.pol@gmail.com", whatsapp: "692976155", preferences: ["Ciepłe kierunki (Europa)","City break","Egzotyka","Krótki lot","Średni lot"], budgetFlight: 99999, notes: "Kair (piramidy), Finlandia, dziecko 6 lat" },
  { id: 9, name: "Gabriela", email: "miklaszewskagabriela96@gmail.com", preferences: ["Góry","Skandynawia","Ciepłe kierunki (Europa)","Średni lot"], budgetFlight: 1000, notes: "Przyroda bez upałów, marzec-maj, wrzesień-listopad" },
  { id: 10, name: "Paulina Sz.", email: "paulinaszwed1993@gmail.com", preferences: ["Ciepłe kierunki (Europa)","City break","Z dziećmi","Krótki lot"], budgetFlight: 300, notes: "Bliźniaczki 5 lat, budżet do 300 zł/lot" },
  { id: 11, name: "Joanna", email: "Joannabaczek81@gmail.com", preferences: ["Ciepłe kierunki (Europa)","City break","Krótki lot","Średni lot"], budgetFlight: 2000, notes: "Ciepło i słońce, wylot w czwartek" },
  { id: 12, name: "Olga", email: "olga.bilczewska@gmail.com", preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej","Góry","Egzotyka","Skandynawia","City break","Safari","Krótki lot","Średni lot","Długi lot"], budgetFlight: 1000, notes: "Wszystko co ciekawe" },
  { id: 13, name: "Agata", email: "amoscicka@vp.pl", preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej","Góry","Egzotyka","City break","Safari","Krótki lot","Średni lot","Długi lot"], budgetFlight: 300, notes: "Oferty cenowo korzystne, bliskość natury, budżet całość 1200 zł/os" },
];

const CATEGORIES = [
  "Ciepłe kierunki (Europa)",
  "Ciepłe kierunki dalej",
  "Góry",
  "Egzotyka",
  "Skandynawia",
  "City break",
  "Safari",
  "Krótki lot",
  "Średni lot",
  "Długi lot",
  "Z dziećmi",
];

const AIRPORTS = ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"];
const DURATIONS = ["1 do 3 dni","4 do 6 dni","7 do 9 dni","10 do 13 dni"];

const EMPTY = { destination: "", airport: "", price: "", dates: "", duration: "4 do 6 dni", description: "", link: "", categories: [] };

const C = {
  bg: "#0f0e0c", surface: "#161412", border: "#252018",
  gold: "#e8a030", goldDim: "#c07820", text: "#f0ebe2",
  muted: "#7a7060", subtle: "#b0a890", green: "#8ab080",
};

const inp = { width: "100%", background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif", outline: "none", boxSizing: "border-box" };
const lbl = { display: "block", fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 6 };

function matchSub(sub, flight) {
  const budgetOk = parseFloat(flight.price) <= sub.budgetFlight;
  if (!budgetOk) return false;
  if (sub.preferences.includes("WSZYSTKO")) return true;
  return flight.categories.some(cat => sub.preferences.includes(cat));
}

function generateEmailText(sub, flights) {
  const flightLines = flights.map((f, i) => {
    return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${i + 1}. ${f.destination.toUpperCase()} — ${f.price} zł / os.
✈ Lotnisko: ${f.airport}
📅 Daty: ${f.dates || f.duration}
${f.description ? `\n${f.description}\n` : ""}${f.link ? `\n🔗 Kup bilety: ${f.link}` : ""}`;
  }).join("\n\n");

  return `Cześć ${sub.name}! ✈️

Mam dla Ciebie ${flights.length} ${flights.length === 1 ? "okazję podróżniczą" : "okazje podróżnicze"} — dopasowane specjalnie dla Ciebie.

${flightLines}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pozdrawiam,
Przemek
Tripowicz Alert — tripowicz.pl`;
}

export default function App() {
  const [tab, setTab] = useState("queue");
  const [queue, setQueue] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [copiedId, setCopiedId] = useState(null);
  const [expandedSub, setExpandedSub] = useState(null);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const toggleCat = (cat) => {
    setForm(f => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter(c => c !== cat)
        : [...f.categories, cat]
    }));
  };

  const addToQueue = () => {
    if (!form.destination || !form.airport || !form.price || form.categories.length === 0) return;
    setQueue(q => [...q, { ...form, id: Date.now() }]);
    setForm(EMPTY);
  };

  // Per-subscriber: which flights match them
  const matchSummary = SUBSCRIBERS.map(sub => ({
    sub,
    flights: queue.filter(f => matchSub(sub, f)),
  })).filter(x => x.flights.length > 0);

  const copyEmail = (sub, flights) => {
    const text = generateEmailText(sub, flights);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(sub.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const tabs = [["queue", "✈ Kolejka"], ["preview", "📬 Wyniki"], ["subs", `👥 Subskrybenci (${SUBSCRIBERS.length})`]];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif", color: C.text }}>
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "20px 28px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ background: C.gold, color: C.bg, fontWeight: 900, fontSize: 11, letterSpacing: 3, padding: "6px 14px", textTransform: "uppercase" }}>TRIPOWICZ</div>
        <div style={{ fontSize: 11, letterSpacing: 2, color: C.muted, textTransform: "uppercase" }}>Alert System</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tabs.map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? C.gold : "transparent", color: tab === t ? C.bg : C.muted, border: `1px solid ${tab === t ? C.gold : C.border}`, padding: "6px 14px", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 20px" }}>

        {/* ══ QUEUE ══ */}
        {tab === "queue" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 22 }}>Dodaj okazję</div>
              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <label style={lbl}>Kierunek</label>
                  <input value={form.destination} onChange={e => upd("destination", e.target.value)} placeholder="np. Grecja, Islandia, Włochy…" style={inp} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={lbl}>Lotnisko</label>
                    <select value={form.airport} onChange={e => upd("airport", e.target.value)} style={inp}>
                      <option value="">Wybierz</option>
                      {AIRPORTS.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Cena (zł / os. RT)</label>
                    <input value={form.price} onChange={e => upd("price", e.target.value)} type="number" placeholder="399" style={inp} />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Daty</label>
                  <input value={form.dates} onChange={e => upd("dates", e.target.value)} placeholder="np. 13–20 maja" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Długość pobytu</label>
                  <select value={form.duration} onChange={e => upd("duration", e.target.value)} style={inp}>
                    {DURATIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>

                {/* KATEGORIE - kluczowe! */}
                <div>
                  <label style={lbl}>Typ kierunku — zaznacz wszystkie pasujące ⚠️</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {CATEGORIES.map(cat => (
                      <button key={cat} onClick={() => toggleCat(cat)} style={{
                        background: form.categories.includes(cat) ? C.gold : C.surface,
                        color: form.categories.includes(cat) ? C.bg : C.muted,
                        border: `1px solid ${form.categories.includes(cat) ? C.gold : C.border}`,
                        padding: "5px 10px", fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif",
                      }}>{cat}</button>
                    ))}
                  </div>
                  {form.categories.length === 0 && <div style={{ fontSize: 10, color: "#a04030", marginTop: 6 }}>⚠ Wybierz przynajmniej jedną kategorię</div>}
                </div>

                <div>
                  <label style={lbl}>Opis</label>
                  <textarea value={form.description} onChange={e => upd("description", e.target.value)} placeholder="Co warto zobaczyć, czemu warto…" rows={3} style={{ ...inp, resize: "vertical" }} />
                </div>
                <div>
                  <label style={lbl}>Link do zakupu</label>
                  <input value={form.link} onChange={e => upd("link", e.target.value)} placeholder="https://ryanair.com/…" style={inp} />
                </div>

                <button onClick={addToQueue}
                  disabled={!form.destination || !form.airport || !form.price || form.categories.length === 0}
                  style={{ background: C.gold, color: C.bg, border: "none", padding: "13px", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", opacity: (!form.destination || !form.airport || !form.price || form.categories.length === 0) ? 0.4 : 1, fontFamily: "Georgia, serif" }}>
                  + Dodaj do kolejki
                </button>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 22 }}>
                Kolejka — {queue.length} {queue.length === 1 ? "lot" : queue.length < 5 ? "loty" : "lotów"}
              </div>
              {queue.length === 0 && (
                <div style={{ border: `1px dashed ${C.border}`, padding: 36, color: "#3a3020", fontSize: 13, textAlign: "center" }}>
                  Dodaj pierwszą okazję →
                </div>
              )}
              {queue.map((f, i) => (
                <div key={f.id} style={{ border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.gold}`, padding: "14px 18px", marginBottom: 10, position: "relative" }}>
                  <button onClick={() => setQueue(q => q.filter(x => x.id !== f.id))} style={{ position: "absolute", top: 10, right: 14, background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 18 }}>×</button>
                  <div style={{ fontWeight: 700 }}><span style={{ color: C.gold, fontSize: 10, marginRight: 8 }}>#{i + 1}</span>{f.destination}</div>
                  <div style={{ display: "flex", gap: 12, marginTop: 6, fontSize: 12, color: C.subtle }}>
                    <span>✈ {f.airport}</span>
                    <span style={{ color: C.gold, fontWeight: 700 }}>{f.price} zł</span>
                    <span>{f.dates || f.duration}</span>
                  </div>
                  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {f.categories.map(c => <span key={c} style={{ fontSize: 9, background: "#2a2010", border: `1px solid ${C.border}`, padding: "2px 7px", color: C.gold }}>{c}</span>)}
                  </div>
                </div>
              ))}
              {queue.length >= 1 && (
                <button onClick={() => setTab("preview")} style={{ background: "transparent", border: `1px solid ${C.gold}`, color: C.gold, padding: "11px", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", width: "100%", marginTop: 6, fontFamily: "Georgia, serif" }}>
                  Zobacz wyniki i maile →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ══ PREVIEW ══ */}
        {tab === "preview" && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>
              Wyniki dopasowania
            </div>
            {queue.length === 0 && <div style={{ border: `1px solid ${C.border}`, padding: 24, color: C.muted }}>Brak lotów w kolejce.</div>}

            {queue.length > 0 && (
              <>
                <div style={{ marginBottom: 20, padding: "12px 16px", border: `1px solid ${C.border}`, fontSize: 13, color: C.subtle }}>
                  <span style={{ color: C.gold, fontWeight: 700, fontSize: 22 }}>{matchSummary.length}</span> z {SUBSCRIBERS.length} subskrybentów pasuje do Twojej kolejki
                  {matchSummary.length > 0 && <span style={{ color: C.muted, fontSize: 11, marginLeft: 12 }}>— kliknij osobę żeby skopiować gotowego maila</span>}
                </div>

                {matchSummary.map(({ sub, flights }) => (
                  <div key={sub.id} style={{ border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.gold}`, marginBottom: 10 }}>
                    {/* Header */}
                    <div onClick={() => setExpandedSub(expandedSub === sub.id ? null : sub.id)}
                      style={{ padding: "14px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{sub.name}</span>
                        <span style={{ fontSize: 12, color: C.muted, marginLeft: 12 }}>{sub.email || `📱 ${sub.whatsapp}`}</span>
                        <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {flights.map(f => (
                            <span key={f.id} style={{ fontSize: 10, background: "#1a1810", border: `1px solid ${C.border}`, padding: "2px 8px", color: C.subtle }}>
                              {f.destination} · {f.price} zł
                            </span>
                          ))}
                        </div>
                        {sub.notes && <div style={{ marginTop: 5, fontSize: 10, color: "#5a5040", fontStyle: "italic" }}>📌 {sub.notes}</div>}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                        <span style={{ background: C.gold, color: C.bg, fontSize: 10, fontWeight: 700, padding: "3px 9px" }}>
                          {flights.length} {flights.length === 1 ? "lot" : "loty"}
                        </span>
                        {sub.email && (
                          <button
                            onClick={e => { e.stopPropagation(); copyEmail(sub, flights); }}
                            style={{ background: copiedId === sub.id ? "#2a4020" : C.surface, border: `1px solid ${copiedId === sub.id ? C.green : C.border}`, color: copiedId === sub.id ? C.green : C.muted, padding: "5px 12px", fontSize: 10, cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                            {copiedId === sub.id ? "✓ Skopiowano!" : "📋 Kopiuj maila"}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expanded email preview */}
                    {expandedSub === sub.id && (
                      <div style={{ borderTop: `1px solid ${C.border}`, padding: "16px 18px" }}>
                        <div style={{ fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 10 }}>Podgląd maila</div>
                        <pre style={{ background: C.surface, border: `1px solid ${C.border}`, padding: "16px 18px", fontSize: 12, color: C.subtle, lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "Georgia, serif", margin: 0 }}>
                          {generateEmailText(sub, flights)}
                        </pre>
                        {sub.email && (
                          <button
                            onClick={() => copyEmail(sub, flights)}
                            style={{ marginTop: 10, background: copiedId === sub.id ? "#2a4020" : C.gold, border: "none", color: copiedId === sub.id ? C.green : C.bg, padding: "10px 20px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: 2, textTransform: "uppercase", width: "100%" }}>
                            {copiedId === sub.id ? "✓ Skopiowano do schowka!" : "📋 Kopiuj do schowka"}
                          </button>
                        )}
                        {!sub.email && (
                          <div style={{ marginTop: 10, padding: "10px 14px", border: `1px solid ${C.border}`, fontSize: 12, color: C.muted }}>
                            📱 Ta osoba podała tylko WhatsApp: <strong style={{ color: C.text }}>{sub.whatsapp}</strong> — wyślij ręcznie
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ══ SUBSCRIBERS ══ */}
        {tab === "subs" && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 24 }}>
              Subskrybenci — {SUBSCRIBERS.length} osób
            </div>
            {SUBSCRIBERS.map(sub => (
              <div key={sub.id} style={{ border: `1px solid ${C.border}`, padding: "12px 18px", marginBottom: 8, display: "grid", gridTemplateColumns: "150px 1fr 140px", gap: 14, alignItems: "start" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{sub.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2, wordBreak: "break-all" }}>{sub.email || "—"}</div>
                  {sub.whatsapp && <div style={{ fontSize: 11, color: "#6a8060", marginTop: 2 }}>📱 {sub.whatsapp}</div>}
                </div>
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {sub.preferences.includes("WSZYSTKO")
                      ? <span style={{ fontSize: 10, background: "#2a2010", border: `1px solid ${C.border}`, padding: "2px 8px", color: C.gold }}>🌍 WSZYSTKO</span>
                      : sub.preferences.map(p => <span key={p} style={{ fontSize: 10, background: "#1a1810", border: `1px solid ${C.border}`, padding: "2px 7px", color: C.subtle }}>{p}</span>)
                    }
                  </div>
                  {sub.notes && <div style={{ marginTop: 6, fontSize: 10, color: "#5a5040", fontStyle: "italic" }}>📌 {sub.notes}</div>}
                </div>
                <div style={{ fontSize: 11, color: C.muted, textAlign: "right" }}>
                  <div>💰 {sub.budgetFlight === 99999 ? "bez limitu" : `do ${sub.budgetFlight} zł`}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
