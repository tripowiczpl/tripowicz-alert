import { useState } from "react";

// ── PRAWDZIWI SUBSKRYBENCI z formularza ──
const SUBSCRIBERS = [
  {
    id: 1, name: "Monika", email: "m.tychowska@promatic.pl", whatsapp: "537853800",
    preferences: ["WSZYSTKO"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"], // "gdzie mąż dowiezie"
    budgetFlight: 99999, // "wtedy kiedy najtaniej"
    duration: ["1 do 3 dni","4 do 6 dni","7 do 9 dni","10 do 13 dni"],
    notes: "Wszystkie kierunki, elastyczna"
  },
  {
    id: 2, name: "Alicja", email: "ala@dimenti.pl",
    preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Góry","Egzotyka","Skandynawia - dzika przyroda","City break (Londyn, Rzym, Barcelona)","Safari","Pomysł na krótki lot (do 2,5h)","Pomysł na średniej długości lot (3-6 h)","Pomysł na długi lot (powyżej 6 h)","Pomysły na podróże z dziećmi"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"],
    budgetFlight: 2000,
    duration: ["1 do 3 dni","4 do 6 dni","7 do 9 dni","10 do 13 dni"],
    notes: "Kiedy tanie loty, max do 2000 zł lot+nocleg"
  },
  {
    id: 3, name: "Paulina", email: "zpaulina93@wp.pl",
    preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Góry","Egzotyka","Skandynawia - dzika przyroda","City break (Londyn, Rzym, Barcelona)","Safari","Pomysł na krótki lot (do 2,5h)","Pomysł na średniej długości lot (3-6 h)","Pomysł na długi lot (powyżej 6 h)","Pomysły na podróże z dziećmi"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"],
    budgetFlight: 1000,
    duration: ["4 do 6 dni","7 do 9 dni"],
    notes: "Wtedy kiedy jest najlepsza oferta, budżet całość 3000"
  },
  {
    id: 4, name: "Paulina P.", email: "p.paluszkiewicz@onet.eu", whatsapp: "792606540",
    preferences: ["Ciepłe kierunki (Europa)","City break (Londyn, Rzym, Barcelona)","Pomysły na podróże z dziećmi","Góry"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"], // "dostosuję się"
    budgetFlight: 1000,
    duration: ["4 do 6 dni","7 do 9 dni"],
    notes: "Dzieci 4 i 10 lat, atrakcje, góry, wycieczki rowerowe"
  },
  {
    id: 5, name: "Agnieszka", email: "A.szwed@promatic.pl", whatsapp: "883225266",
    preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Góry","Egzotyka","Skandynawia - dzika przyroda","City break (Londyn, Rzym, Barcelona)","Safari","Pomysł na krótki lot (do 2,5h)","Pomysł na średniej długości lot (3-6 h)","Pomysł na długi lot (powyżej 6 h)","Pomysły na podróże z dziećmi"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"],
    budgetFlight: 2000,
    duration: ["1 do 3 dni","4 do 6 dni","7 do 9 dni"],
    notes: "Dziecko 4 lata (nie każda oferta z dziećmi), bliskość natury"
  },
  {
    id: 6, name: "Marta", whatsapp: "609938348", email: null,
    preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Góry","Egzotyka","City break (Londyn, Rzym, Barcelona)","Pomysły na podróże z dziećmi"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ","Drezno"],
    budgetFlight: 1000,
    duration: ["1 do 3 dni","4 do 6 dni","7 do 9 dni"],
    notes: "Dziecko 5 lat, okazje i tanio, tylko WhatsApp"
  },
  {
    id: 7, name: "Katarzyna", email: "katarzynaszopiakk@gmail.com",
    preferences: ["Egzotyka","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Pomysł na długi lot (powyżej 6 h)"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ","Reykjavík"],
    budgetFlight: 99999, // 2000zł+
    duration: ["10 do 13 dni","15 do 21 dni"],
    notes: "Konkretnie Japonia i Korea, listopad za rok, 15-21 dni, budżet 9000 zł"
  },
  {
    id: 8, name: "Sionn", email: "Sionna.pol@gmail.com", whatsapp: "692976155",
    preferences: ["Ciepłe kierunki (Europa)","City break (Londyn, Rzym, Barcelona)","Egzotyka","Pomysł na krótki lot (do 2,5h)","Pomysł na średniej długości lot (3-6 h)"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"],
    budgetFlight: 99999, // 2000zł+
    duration: ["4 do 6 dni","7 do 9 dni"],
    notes: "Kair (piramidy), Finlandia (biegówki), dziecko 6 lat, budżet 5000 na Kair / 2000 city break"
  },
  {
    id: 9, name: "Gabriela", email: "miklaszewskagabriela96@gmail.com",
    preferences: ["Góry","Skandynawia - dzika przyroda","Ciepłe kierunki (Europa)","Pomysł na średniej długości lot (3-6 h)"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ","Gdańsk"],
    budgetFlight: 1000,
    duration: ["4 do 6 dni","7 do 9 dni","10 do 13 dni"],
    notes: "Miejsca z ciekawą przyrodą bez upałów, marzec-maj, wrzesień-listopad, bliskość natury"
  },
  {
    id: 10, name: "Paulina Sz.", email: "paulinaszwed1993@gmail.com",
    preferences: ["Ciepłe kierunki (Europa)","City break (Londyn, Rzym, Barcelona)","Pomysły na podróże z dziećmi","Pomysł na krótki lot (do 2,5h)"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"],
    budgetFlight: 300,
    duration: ["1 do 3 dni","4 do 6 dni"],
    notes: "Bliźniaczki 5 lat, Wielkanoc 2026, budżet do 300 zł/lot, plaża+miasto"
  },
  {
    id: 11, name: "Joanna", email: "Joannabaczek81@gmail.com",
    preferences: ["Ciepłe kierunki (Europa)","City break (Londyn, Rzym, Barcelona)","Pomysł na krótki lot (do 2,5h)","Pomysł na średniej długości lot (3-6 h)"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"],
    budgetFlight: 2000,
    duration: ["4 do 6 dni","7 do 9 dni"],
    notes: "Ciepło i słońce, wylot w czwartek, dziecko"
  },
  {
    id: 12, name: "Olga", email: "olga.bilczewska@gmail.com",
    preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Góry","Egzotyka","Skandynawia - dzika przyroda","City break (Londyn, Rzym, Barcelona)","Safari","Pomysł na krótki lot (do 2,5h)","Pomysł na średniej długości lot (3-6 h)","Pomysł na długi lot (powyżej 6 h)"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"],
    budgetFlight: 1000,
    duration: ["1 do 3 dni","4 do 6 dni","7 do 9 dni","10 do 13 dni"],
    notes: "Wszystko co ciekawe, obojętna na termin i długość"
  },
  {
    id: 13, name: "Agata", email: "amoscicka@vp.pl",
    preferences: ["Ciepłe kierunki (Europa)","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Góry","Egzotyka","City break (Londyn, Rzym, Barcelona)","Safari","Pomysł na krótki lot (do 2,5h)","Pomysł na średniej długości lot (3-6 h)","Pomysł na długi lot (powyżej 6 h)"],
    airports: ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ","Rzeszów"],
    budgetFlight: 300,
    duration: ["1 do 3 dni","4 do 6 dni","7 do 9 dni"],
    notes: "Oferty cenowo korzystne, dziecko 11 lat opcjonalnie, bliskość natury, budżet całość 1200 zł/os"
  },
];

// ── MAPOWANIE kierunek → kategorie ──
const DEST_TAGS = {
  "Belgia":     ["Ciepłe kierunki (Europa)","City break (Londyn, Rzym, Barcelona)","Pomysł na krótki lot (do 2,5h)"],
  "Włochy":     ["Ciepłe kierunki (Europa)","City break (Londyn, Rzym, Barcelona)","Pomysł na krótki lot (do 2,5h)","Pomysł na średniej długości lot (3-6 h)"],
  "Chorwacja":  ["Ciepłe kierunki (Europa)","Pomysł na krótki lot (do 2,5h)"],
  "Grecja":     ["Ciepłe kierunki (Europa)","Pomysł na krótki lot (do 2,5h)"],
  "Rumunia":    ["Ciepłe kierunki (Europa)","Góry","Pomysł na krótki lot (do 2,5h)"],
  "Islandia":   ["Skandynawia - dzika przyroda","Góry","Pomysł na średniej długości lot (3-6 h)"],
  "Norwegia":   ["Skandynawia - dzika przyroda","Góry","Pomysł na średniej długości lot (3-6 h)"],
  "Szwecja":    ["Skandynawia - dzika przyroda","City break (Londyn, Rzym, Barcelona)","Pomysł na średniej długości lot (3-6 h)"],
  "Finlandia":  ["Skandynawia - dzika przyroda","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Pomysł na średniej długości lot (3-6 h)"],
  "Francja":    ["Ciepłe kierunki (Europa)","City break (Londyn, Rzym, Barcelona)","Pomysł na krótki lot (do 2,5h)"],
  "Hiszpania":  ["Ciepłe kierunki (Europa)","City break (Londyn, Rzym, Barcelona)","Pomysł na krótki lot (do 2,5h)"],
  "Portugalia": ["Ciepłe kierunki (Europa)","City break (Londyn, Rzym, Barcelona)","Pomysł na średniej długości lot (3-6 h)"],
  "Maroko":     ["Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Egzotyka","Pomysł na średniej długości lot (3-6 h)"],
  "Tajlandia":  ["Egzotyka","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Pomysł na długi lot (powyżej 6 h)"],
  "Japonia":    ["Egzotyka","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Pomysł na długi lot (powyżej 6 h)"],
  "Kenia":      ["Safari","Egzotyka","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Pomysł na długi lot (powyżej 6 h)"],
  "Tanzania":   ["Safari","Egzotyka","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Pomysł na długi lot (powyżej 6 h)"],
  "Kair":       ["Egzotyka","Ciepłe kierunki dalej (Azja, Afryka, plus 6h lotem)","Pomysł na średniej długości lot (3-6 h)"],
  "Albania":    ["Ciepłe kierunki (Europa)","Pomysł na krótki lot (do 2,5h)"],
  "Czarnogóra": ["Ciepłe kierunki (Europa)","Pomysł na krótki lot (do 2,5h)"],
  "Bułgaria":   ["Ciepłe kierunki (Europa)","Pomysł na krótki lot (do 2,5h)"],
  "Londyn":     ["City break (Londyn, Rzym, Barcelona)","Pomysł na krótki lot (do 2,5h)","Pomysł na średniej długości lot (3-6 h)"],
  "Barcelona":  ["City break (Londyn, Rzym, Barcelona)","Ciepłe kierunki (Europa)","Pomysł na krótki lot (do 2,5h)"],
};

const BUDGET_MAP = { "do 300 zł": 300, "do 600zł": 600, "do 1000zł": 1000, "do 2000zł": 2000, "2000zł+": 99999 };
const AIRPORTS_LIST = ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"];
const DURATIONS = ["1 do 3 dni","4 do 6 dni","7 do 9 dni","10 do 13 dni"];

function matchFlight(flight, sub) {
  const price = parseFloat(flight.price) || 0;
  // lotnisko
  const airportOk = sub.airports.some(a => a === flight.airport || sub.airports.includes("WRO") && flight.airport === "WRO");
  if (!airportOk && !sub.airports.some(a => ["WRO","PRG","PED","BER","POZ","KTW","KRK","VIE","WAW","LDZ"].includes(a) && a === flight.airport)) return false;
  // budżet
  if (price > sub.budgetFlight) return false;
  return true;
}

function getCategoryMatch(flight, sub) {
  if (sub.preferences.includes("WSZYSTKO")) return ["✓ Wszystkie kierunki"];
  const tags = DEST_TAGS[flight.destination] || [];
  return sub.preferences.filter(p => tags.includes(p));
}

const EMPTY = { destination: "", airport: "", price: "", dates: "", duration: "4 do 6 dni", description: "", link: "" };

const C = {
  bg: "#0f0e0c", surface: "#161412", border: "#252018",
  gold: "#e8a030", goldDim: "#c07820", text: "#f0ebe2",
  muted: "#7a7060", subtle: "#b0a890", green: "#8ab080",
};

const inp = {
  width: "100%", background: C.surface, border: `1px solid ${C.border}`,
  color: C.text, padding: "10px 14px", fontSize: 14,
  fontFamily: "Georgia, serif", outline: "none", boxSizing: "border-box",
};

export default function App() {
  const [tab, setTab] = useState("queue");
  const [queue, setQueue] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [previewSub, setPreviewSub] = useState(null);

  const upd = (k, v) => { setForm(f => ({ ...f, [k]: v })); setSent(false); };

  const addToQueue = () => {
    if (!form.destination || !form.airport || !form.price) return;
    setQueue(q => [...q, { ...form, id: Date.now() }]);
    setForm(EMPTY);
    setSent(false);
    setPreviewSub(null);
  };

  const matchSummary = SUBSCRIBERS.map(sub => {
    const flights = queue.filter(f => {
      const airOk = sub.airports.some(a => a === f.airport);
      const budgetOk = parseFloat(f.price) <= sub.budgetFlight;
      return airOk && budgetOk;
    });
    return { sub, flights };
  }).filter(x => x.flights.length > 0);

  const tabs = [["queue","✈ Kolejka"], ["preview","📬 Wysyłka"], ["subs",`👥 Subskrybenci (${SUBSCRIBERS.length})`]];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif", color: C.text }}>
      {/* HEADER */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "20px 28px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ background: C.gold, color: C.bg, fontWeight: 900, fontSize: 11, letterSpacing: 3, padding: "6px 14px", textTransform: "uppercase" }}>TRIPOWICZ</div>
        <div style={{ fontSize: 11, letterSpacing: 2, color: C.muted, textTransform: "uppercase" }}>Alert System</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tabs.map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? C.gold : "transparent",
              color: tab === t ? C.bg : C.muted,
              border: `1px solid ${tab === t ? C.gold : C.border}`,
              padding: "6px 14px", fontSize: 11, letterSpacing: 1,
              textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>

        {/* ═══ QUEUE ═══ */}
        {tab === "queue" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 22 }}>Dodaj okazję do kolejki</div>
              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Kierunek</label>
                  <input value={form.destination} onChange={e => upd("destination", e.target.value)} placeholder="np. Islandia, Włochy, Chorwacja…" list="dests" style={inp} />
                  <datalist id="dests">{Object.keys(DEST_TAGS).map(d => <option key={d} value={d} />)}</datalist>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Lotnisko wylotowe</label>
                    <select value={form.airport} onChange={e => upd("airport", e.target.value)} style={inp}>
                      <option value="">Wybierz</option>
                      {AIRPORTS_LIST.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Cena (zł / os. RT)</label>
                    <input value={form.price} onChange={e => upd("price", e.target.value)} type="number" placeholder="399" style={inp} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Daty</label>
                  <input value={form.dates} onChange={e => upd("dates", e.target.value)} placeholder="np. 13–20 maja" style={inp} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Długość pobytu</label>
                  <select value={form.duration} onChange={e => upd("duration", e.target.value)} style={inp}>
                    {DURATIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Opis</label>
                  <textarea value={form.description} onChange={e => upd("description", e.target.value)} placeholder="Co warto zobaczyć, czemu warto…" rows={3} style={{ ...inp, resize: "vertical" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Link do zakupu</label>
                  <input value={form.link} onChange={e => upd("link", e.target.value)} placeholder="https://ryanair.com/…" style={inp} />
                </div>
                <button onClick={addToQueue} disabled={!form.destination || !form.airport || !form.price} style={{
                  background: C.gold, color: C.bg, border: "none", padding: "13px",
                  fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                  cursor: "pointer", opacity: (!form.destination || !form.airport || !form.price) ? 0.4 : 1,
                  fontFamily: "Georgia, serif",
                }}>+ Dodaj do kolejki</button>
              </div>
            </div>

            {/* Queue list */}
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
                <div key={f.id} style={{ border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.gold}`, padding: "16px 20px", marginBottom: 10, position: "relative" }}>
                  <button onClick={() => setQueue(q => q.filter(x => x.id !== f.id))} style={{ position: "absolute", top: 10, right: 14, background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 18 }}>×</button>
                  <div style={{ fontWeight: 700 }}>
                    <span style={{ color: C.gold, fontSize: 10, fontWeight: 400, marginRight: 8 }}>#{i+1}</span>
                    {f.destination}
                  </div>
                  <div style={{ display: "flex", gap: 14, marginTop: 7, fontSize: 12, color: C.subtle }}>
                    <span>✈ {f.airport}</span>
                    <span style={{ color: C.gold, fontWeight: 700 }}>{f.price} zł</span>
                    <span>{f.dates || f.duration}</span>
                  </div>
                  {f.description && <div style={{ marginTop: 7, fontSize: 11, color: C.muted }}>{f.description.slice(0,90)}{f.description.length>90?"…":""}</div>}
                </div>
              ))}
              {queue.length >= 1 && (
                <button onClick={() => setTab("preview")} style={{ background: "transparent", border: `1px solid ${C.gold}`, color: C.gold, padding: "11px", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", width: "100%", marginTop: 6, fontFamily: "Georgia, serif" }}>
                  Podgląd wysyłki →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ═══ PREVIEW ═══ */}
        {tab === "preview" && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 24 }}>
              Podgląd wysyłki — {queue.length} {queue.length===1?"lot":"lotów"} w kolejce
            </div>
            {queue.length === 0 && <div style={{ border: `1px solid ${C.border}`, padding: 24, color: C.muted }}>Brak lotów. Wróć do kolejki i dodaj okazje.</div>}
            {queue.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 14 }}>Kto dostanie maila</div>
                  {matchSummary.length === 0 && <div style={{ border: `1px solid ${C.border}`, padding: 20, color: C.muted, fontSize: 13 }}>Nikt nie pasuje. Sprawdź lotnisko i ceny.</div>}
                  {matchSummary.map(({ sub, flights }) => (
                    <div key={sub.id} onClick={() => setPreviewSub(previewSub?.id === sub.id ? null : sub)}
                      style={{ border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.gold}`, padding: "14px 18px", marginBottom: 8, cursor: "pointer", background: previewSub?.id === sub.id ? C.surface : "transparent" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontWeight: 700 }}>{sub.name}</span>
                          <span style={{ fontSize: 11, color: C.muted, marginLeft: 10 }}>{sub.email || `WhatsApp: ${sub.whatsapp}`}</span>
                        </div>
                        <span style={{ background: C.gold, color: C.bg, fontSize: 10, fontWeight: 700, padding: "3px 9px" }}>
                          {flights.length} {flights.length===1?"lot":"loty"}
                        </span>
                      </div>
                      <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {flights.map(f => {
                          const cats = getCategoryMatch(f, sub);
                          return (
                            <span key={f.id} style={{ fontSize: 10, background: "#1a1810", border: `1px solid ${C.border}`, padding: "2px 8px", color: C.subtle }}>
                              {f.destination} · {f.price}zł {cats.length > 0 ? `· ${cats[0].split(" ")[0]}` : ""}
                            </span>
                          );
                        })}
                      </div>
                      {sub.notes && <div style={{ marginTop: 6, fontSize: 10, color: "#5a5040", fontStyle: "italic" }}>📌 {sub.notes}</div>}
                    </div>
                  ))}

                  <div style={{ marginTop: 16, padding: "12px 16px", border: `1px solid ${C.border}`, fontSize: 12, color: C.subtle }}>
                    <span style={{ color: C.gold, fontWeight: 700, fontSize: 20 }}>{matchSummary.length}</span> z {SUBSCRIBERS.length} subskrybentów dostanie maila
                  </div>

                  {matchSummary.length > 0 && !sent && (
                    <button onClick={() => setSent(true)} style={{ background: C.gold, color: C.bg, border: "none", padding: "13px", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", width: "100%", marginTop: 10, fontFamily: "Georgia, serif" }}>
                      📧 Wyślij digest do {matchSummary.length} osób
                    </button>
                  )}
                  {sent && (
                    <div style={{ marginTop: 10, border: "1px solid #4a6040", background: "#131a11", padding: "14px 18px", fontSize: 13, color: C.green }}>
                      ✓ Alert wysłany do {matchSummary.length} subskrybentów!
                      <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>W wersji produkcyjnej – przez Resend API</div>
                    </div>
                  )}
                </div>

                {/* Email preview */}
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 14 }}>
                    {previewSub ? `Podgląd maila → ${previewSub.name}` : "← Kliknij osobę żeby zobaczyć jej maila"}
                  </div>
                  {previewSub && (() => {
                    const flights = queue.filter(f => {
                      const airOk = previewSub.airports.some(a => a === f.airport);
                      const budgetOk = parseFloat(f.price) <= previewSub.budgetFlight;
                      return airOk && budgetOk;
                    });
                    return (
                      <div style={{ background: "#faf8f3", color: "#1a1810", padding: "26px 22px", fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.75 }}>
                        <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: 1, marginBottom: 2 }}>✈ Tripowicz Alert</div>
                        <div style={{ fontSize: 11, color: "#9a9080", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #e0d8cc" }}>
                          tripowicz.com · Przemek · {new Date().toLocaleDateString("pl-PL")}
                        </div>
                        <div style={{ marginBottom: 20, fontSize: 14 }}>
                          Cześć <strong>{previewSub.name}</strong>! 🗺️<br />
                          Mam dla Ciebie <strong>{flights.length} {flights.length===1?"okazję podróżniczą":"okazje podróżnicze"}</strong> — dopasowane specjalnie dla Ciebie.
                        </div>
                        {flights.map((f, i) => (
                          <div key={f.id} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < flights.length-1 ? "1px solid #e8e0d4" : "none" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                              <div style={{ fontWeight: 700, fontSize: 17 }}>{f.destination}</div>
                              <div style={{ fontWeight: 900, fontSize: 20, color: C.goldDim }}>{f.price} zł</div>
                            </div>
                            <div style={{ fontSize: 11, color: "#8a8070", marginTop: 3 }}>
                              ✈ z {f.airport} &nbsp;·&nbsp; 📅 {f.dates || f.duration}
                            </div>
                            {f.description && <div style={{ marginTop: 9, fontSize: 13, color: "#4a3820", lineHeight: 1.6 }}>{f.description}</div>}
                            {f.link && <div style={{ marginTop: 10 }}><span style={{ background: C.goldDim, color: "white", padding: "6px 16px", fontSize: 12, fontWeight: 700 }}>Kup bilety →</span></div>}
                          </div>
                        ))}
                        <div style={{ fontSize: 10, color: "#aaa", borderTop: "1px solid #e0d8cc", paddingTop: 12, marginTop: 4 }}>
                          Tripowicz Alert · tripowicz.com · Wypisz się
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ SUBSCRIBERS ═══ */}
        {tab === "subs" && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 24 }}>
              Twoi subskrybenci — {SUBSCRIBERS.length} osób
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {SUBSCRIBERS.map(sub => (
                <div key={sub.id} style={{ border: `1px solid ${C.border}`, padding: "14px 20px", display: "grid", gridTemplateColumns: "160px 1fr 160px", gap: 16, alignItems: "start" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{sub.name}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2, wordBreak: "break-all" }}>{sub.email || "—"}</div>
                    {sub.whatsapp && <div style={{ fontSize: 11, color: "#6a8060", marginTop: 2 }}>📱 {sub.whatsapp}</div>}
                  </div>
                  <div style={{ fontSize: 11, color: C.subtle }}>
                    <div style={{ color: C.muted, marginBottom: 4 }}>
                      {sub.preferences.includes("WSZYSTKO") ? "🌍 Wszystkie kierunki" : sub.preferences.slice(0,3).join(" · ") + (sub.preferences.length > 3 ? ` +${sub.preferences.length-3}` : "")}
                    </div>
                    {sub.notes && <div style={{ color: "#5a5040", fontStyle: "italic", fontSize: 10 }}>📌 {sub.notes}</div>}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, textAlign: "right" }}>
                    <div>💰 {sub.budgetFlight === 99999 ? "bez limitu" : `do ${sub.budgetFlight} zł`}</div>
                    <div style={{ marginTop: 4 }}>{sub.airports.filter(a => AIRPORTS_LIST.includes(a)).slice(0,3).join(", ")}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
