// Yıldırım LGS Koçu: Soru havuzundan deneme, flashcard ve PDF
(() => {
const $ = id => document.getElementById(id);
const P = () => window.LGSPOOL;
const ORDER = ['tr','ink','din','ing','mat','fen'];   // LGS sırası: önce sözel, sonra sayısal
const SN = {tr:'Türkçe', ink:'İnkılap Tarihi', din:'Din Kültürü', ing:'İngilizce', mat:'Matematik', fen:'Fen Bilimleri'};
const SE = {tr:'📖', ink:'🇹🇷', din:'🕊️', ing:'🇬🇧', mat:'➗', fen:'🔬'};
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const toast = m => { const t = $('toast'); if (!t) return; t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2400); };
const review = (id, ok) => window.dispatchEvent(new CustomEvent('lgs-review', {detail:{id, ok}}));

const css = `
.qz{position:fixed;inset:0;z-index:65;background:rgba(40,50,30,.35);display:none;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto}
.qz.open{display:flex}
.qz-box{width:min(860px,100%);background:rgba(255,252,243,.98);border-radius:26px;padding:20px;box-shadow:0 20px 50px rgba(0,0,0,.25);animation:pageIn .35s;margin:auto 0}
.qz-top{display:flex;align-items:center;gap:10px;margin-bottom:12px}.qz-top h2{margin:0;font-size:22px;flex:1}
.qz-x{border:0;background:#f3ead8;border-radius:999px;width:36px;height:36px;font-size:16px;cursor:pointer}
.qz-opts{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 14px}
.qz-opts button{border:2px solid var(--stroke);background:#fff;border-radius:999px;padding:7px 13px;font-weight:800;font-size:13.5px;cursor:pointer}
.qz-opts button.on{border-color:#f2a541;background:#fff1d4}
.qz-q{border:1px solid var(--stroke);background:#fff;border-radius:18px;padding:12px;margin:12px 0}
.qz-q img{max-width:100%;max-height:420px;display:block;margin:8px auto;border-radius:10px}
.qz-bub{display:flex;gap:10px;margin-top:8px}
.qz-bub button{width:44px;height:44px;border-radius:50%;border:2px solid #b9a98a;background:#fff;font:700 17px 'Baloo 2',sans-serif;cursor:pointer}
.qz-bub button.on{background:#3a2a10;color:#fff;border-color:#3a2a10}
.qz-bub button.ok{background:#6fa35a;color:#fff;border-color:#6fa35a}.qz-bub button.no{background:#e2604f;color:#fff;border-color:#e2604f}
.qz-res{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;text-align:center;margin:10px 0}
.qz-res div{background:#fff;border-radius:16px;padding:10px;border:1px solid var(--stroke)}.qz-res b{display:block;font:700 30px 'Baloo 2',sans-serif}
.qz-timer{font:700 18px 'Baloo 2',sans-serif;padding:6px 12px;border-radius:999px;background:#fff1d4}
.fc-wrap{perspective:1200px;margin:10px auto;max-width:620px}
.fc{position:relative;height:440px;transition:transform .6s;transform-style:preserve-3d;cursor:pointer}
.fc.flip{transform:rotateY(180deg)}
.fc>div{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:22px;background:#fff;border:1px solid var(--stroke);box-shadow:0 10px 26px rgba(60,70,40,.15);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;text-align:center}
.fc .back{transform:rotateY(180deg);background:linear-gradient(135deg,#fff8e6,#eef7e6)}
.fc img{max-width:100%;max-height:340px;border-radius:10px}
.fc .big{font:700 64px 'Baloo 2',sans-serif;color:#4c7d3a}
.qz-note{color:var(--muted);font-weight:700;font-size:13px}
@media (max-width:600px){.qz-res{grid-template-columns:repeat(2,1fr)}.fc{height:380px}}
`;
document.head.insertAdjacentHTML('beforeend', '<style>' + css + '</style>');
document.body.insertAdjacentHTML('beforeend', '<div class="qz" id="qz"><div class="qz-box" id="qzBox"></div></div>');
const close = () => { clearInterval(timer); $('qz').classList.remove('open'); };
$('qz').onclick = e => { if (e.target === $('qz')) close(); };

let cfg = {mode:'deneme', s:'all', n:20, solved:false, time:true}, set = [], timer = null;
const pool = () => (P() ? P().items() : []).filter(i => i.img && (cfg.solved || !i.solved) && (cfg.s === 'all' || i.s === cfg.s));
function pickSet(){
  let l = shuffle(pool()); if (cfg.n !== 'all') l = l.slice(0, cfg.n);
  if (cfg.mode === 'deneme') l.sort((a, b) => ORDER.indexOf(a.s) - ORDER.indexOf(b.s));
  return l;
}
const head = t => `<div class="qz-top"><h2>${t}</h2><button class="qz-x" data-x>✕</button></div>`;
const bindX = () => $('qzBox').querySelectorAll('[data-x]').forEach(b => b.onclick = close);
const imgs = async l => Promise.all(l.map(i => P().img(i)));

function setup(){
  const all = (P() ? P().items() : []), cnt = s => all.filter(i => i.img && (cfg.solved || !i.solved) && (s === 'all' || i.s === s)).length;
  const noAns = all.filter(i => i.img && !i.a).length, opt = (k, v, t) => `<button data-k="${k}" data-v="${v}" class="${String(cfg[k]) === String(v) ? 'on' : ''}">${t}</button>`;
  $('qzBox').innerHTML = head(cfg.mode === 'deneme' ? '📝 Havuzdan deneme oluştur' : '🃏 Flashcard ile tekrar')
    + `<div class="qz-opts">${opt('mode','deneme','📝 Deneme')}${opt('mode','kart','🃏 Flashcard')}</div>
    <b>Ders</b><div class="qz-opts">${opt('s','all',`🌈 Genel (${cnt('all')})`)}${ORDER.map(k => opt('s', k, `${SE[k]} ${SN[k]} (${cnt(k)})`)).join('')}</div>
    <b>Soru sayısı</b><div class="qz-opts">${[10,20,40].map(n => opt('n', n, n + ' soru')).join('')}${opt('n','all','Hepsi')}</div>
    <div class="qz-opts">${opt('solved', !cfg.solved, cfg.solved ? '✅ Çözdüklerim de dahil' : '⬜ Çözdüklerim dahil değil')}${cfg.mode === 'deneme' ? opt('time', !cfg.time, cfg.time ? '⏱️ Süre tut: açık' : '⏱️ Süre tut: kapalı') : ''}</div>
    ${noAns ? `<p class="qz-note">⚠ ${noAns} sorunun doğru cevabı girilmemiş. Bu sorular cevap anahtarında "?" olarak görünür. Cevabı Soru Havuzu'ndaki karttan girebilirsin.</p>` : ''}
    <p class="qz-note">Sadece fotoğrafı olan sorular kullanılır. ${cfg.mode === 'deneme' && cfg.s === 'all' ? 'Genel denemede sorular LGS sırasıyla dizilir: önce sözel, sonra sayısal.' : ''}</p>
    <div class="row" style="margin-top:8px"><button class="btn green" id="qzGo" style="flex:1;font-size:17px">▶ Başla</button><button class="btn" id="qzPdf" style="flex:1;font-size:17px">📄 PDF indir / yazdır</button></div>`;
  bindX();
  $('qzBox').querySelectorAll('[data-k]').forEach(b => b.onclick = () => { const k = b.dataset.k, v = b.dataset.v; cfg[k] = k === 'n' ? (v === 'all' ? 'all' : +v) : (v === 'true' ? true : v === 'false' ? false : v); setup(); });
  $('qzGo').onclick = () => { set = pickSet(); if (!set.length) return toast('Bu seçimde fotoğraflı soru yok 📸'); cfg.mode === 'deneme' ? runExam() : runCards(); };
  $('qzPdf').onclick = () => { set = pickSet(); if (!set.length) return toast('Bu seçimde fotoğraflı soru yok 📸'); pdf(set); };
}

// ── deneme ──
let ans = {};
async function runExam(){
  ans = {}; clearInterval(timer);
  const t0 = Date.now(), lim = Math.round(set.length * 1.75 * 60);   // LGS temposu: soru başına ~1,5-2 dk
  $('qzBox').innerHTML = head(`📝 Deneme · ${set.length} soru`) + `<div class="row"><span class="qz-timer" id="qzT" ${cfg.time ? '' : 'hidden'}></span><span class="qz-note">Cevaplarını işaretle, bitince "Bitir"e bas. Emin olmadığını boş bırakabilirsin.</span></div><div id="qzList">⏳ Sorular yükleniyor…</div><button class="btn green" id="qzEnd" style="width:100%;font-size:17px;margin-top:6px">🏁 Bitir ve kontrol et</button>`;
  bindX();
  if (cfg.time) timer = setInterval(() => { const left = lim - Math.round((Date.now() - t0) / 1000), m = Math.floor(Math.abs(left) / 60), s = Math.abs(left) % 60;
    $('qzT').textContent = (left < 0 ? '⏰ +' : '⏱️ ') + m + ':' + String(s).padStart(2, '0'); }, 500);
  const src = await imgs(set);
  $('qzList').innerHTML = set.map((q, i) => `<div class="qz-q" data-i="${i}"><b>${i + 1}.</b> <span class="qz-note">${SE[q.s]} ${SN[q.s]}${q.t ? ' · ' + esc(q.t) : ''}</span>
    ${src[i] ? `<img src="${src[i]}" alt="">` : '<p class="qz-note">Fotoğraf bu cihazda yok.</p>'}<div class="qz-bub">${['A','B','C','D'].map(x => `<button data-a="${x}">${x}</button>`).join('')}</div></div>`).join('');
  $('qzList').querySelectorAll('.qz-q').forEach(d => d.querySelectorAll('[data-a]').forEach(b => b.onclick = () => {
    const i = d.dataset.i, on = !b.classList.contains('on'); d.querySelectorAll('[data-a]').forEach(x => x.classList.remove('on'));
    if (on){ b.classList.add('on'); ans[i] = b.dataset.a; } else delete ans[i]; }));
  $('qzEnd').onclick = () => { if (Object.keys(ans).length < set.length && !confirm('Boş bıraktığın sorular var. Bitirmek istiyor musun?')) return; finishExam(Math.round((Date.now() - t0) / 1000)); };
}
function finishExam(sec){
  clearInterval(timer);
  let d = 0, y = 0, b = 0, k = 0;
  set.forEach((q, i) => {
    const box = $('qzList').querySelector(`[data-i="${i}"]`), my = ans[i];
    box.querySelectorAll('[data-a]').forEach(x => { x.onclick = null; if (q.a && x.dataset.a === q.a) x.classList.add('ok'); if (my && x.dataset.a === my && my !== q.a) x.classList.add('no'); });
    if (!q.a){ k++; return; } if (!my) b++; else if (my === q.a){ d++; review(q.id, true); } else { y++; review(q.id, false); }
  });
  const net = Math.max(0, d - y / 3);
  $('qzEnd').outerHTML = '';
  $('qzList').insertAdjacentHTML('beforebegin', `<div class="qz-res"><div>✅<b>${d}</b>doğru</div><div>❌<b>${y}</b>yanlış</div><div>⬜<b>${b}</b>boş</div><div>🎯<b>${String(Math.round(net * 100) / 100).replace('.', ',')}</b>net</div></div>
    <p class="qz-note">Süre: ${Math.floor(sec / 60)} dk ${sec % 60} sn${k ? ` · ${k} sorunun cevabı girilmediği için değerlendirilmedi` : ''}. Doğru ve yanlışların Bilkuş'un tekrar takvimine işlendi 🦉 Yeşil doğru cevap, kırmızı senin yanlışın.</p>
    <div class="row"><button class="btn" id="qzAgain">🔁 Yeni deneme</button><button class="btn ghost" id="qzPdf2">📄 Bu denemeyi PDF yap</button></div>`);
  $('qzAgain').onclick = setup; $('qzPdf2').onclick = () => pdf(set);
  $('qzBox').scrollIntoView({behavior:'smooth'});
  if (window.confetti) {}
}

// ── flashcard ──
let fi = 0, fs = {ok:0, bad:0};
async function runCards(){
  fi = 0; fs = {ok:0, bad:0}; set = shuffle(set); drawCard();
}
async function drawCard(){
  if (fi >= set.length){
    $('qzBox').innerHTML = head('🃏 Tekrar bitti!') + `<div class="qz-res"><div>✅<b>${fs.ok}</b>bildim</div><div>❌<b>${fs.bad}</b>bilemedim</div><div>🃏<b>${set.length}</b>kart</div><div>🎯<b>%${Math.round(fs.ok / Math.max(1, fs.ok + fs.bad) * 100)}</b>başarı</div></div>
      <p class="qz-note">Bilemediklerin Bilkuş'un tekrar listesine yarın için eklendi 🦉</p><div class="row"><button class="btn" id="qzAgain">🔁 Yeniden karıştır</button><button class="btn ghost" id="qzPdf2">📄 Bu kartları PDF yap</button></div>`;
    bindX(); $('qzAgain').onclick = () => runCards(); $('qzPdf2').onclick = () => pdf(set); return;
  }
  const q = set[fi], src = await P().img(q);
  $('qzBox').innerHTML = head(`🃏 Kart ${fi + 1} / ${set.length}`) + `<div class="fc-wrap"><div class="fc" id="fc">
      <div class="front"><span class="qz-note">${SE[q.s]} ${SN[q.s]}${q.t ? ' · ' + esc(q.t) : ''}</span>${src ? `<img src="${src}" alt="">` : '<p>Fotoğraf yok</p>'}<span class="qz-note">Çöz, sonra çevirmek için dokun 👆</span></div>
      <div class="back"><span class="qz-note">Doğru cevap</span>${q.a ? `<div class="big">${q.a}</div>` : `<p>Cevap girilmemiş. Şimdi gir:</p><div class="qz-bub">${['A','B','C','D'].map(x => `<button data-set="${x}">${x}</button>`).join('')}</div>`}
        ${q.note ? `<p><b>Notun:</b> ${esc(q.note)}</p>` : ''}${q.t ? `<p class="qz-note">Konu: ${esc(q.t)}</p>` : ''}</div></div></div>
    <div class="row" style="justify-content:center"><button class="btn pink" id="fcNo" style="font-size:17px">❌ Bilemedim</button><button class="btn green" id="fcOk" style="font-size:17px">✅ Bildim</button></div>`;
  bindX();
  $('fc').onclick = e => { if (!e.target.closest('[data-set]')) $('fc').classList.toggle('flip'); };
  $('fc').querySelectorAll('[data-set]').forEach(b => b.onclick = () => { P().setAnswer(q.id, b.dataset.set); q.a = b.dataset.set; b.parentElement.outerHTML = `<div class="big">${q.a}</div>`; });
  $('fcOk').onclick = () => { fs.ok++; review(q.id, true); fi++; drawCard(); };
  $('fcNo').onclick = () => { fs.bad++; review(q.id, false); fi++; drawCard(); };
}

// ── PDF (yazdır → PDF olarak kaydet) ──
async function pdf(l){
  const w = window.open('', '_blank');
  if (!w) return toast('Açılır pencere engellendi. Tarayıcıda bu siteye izin ver.');
  w.document.write('<p style="font-family:sans-serif;padding:20px">⏳ PDF hazırlanıyor…</p>');
  const src = await imgs(l), title = cfg.mode === 'deneme' ? (cfg.s === 'all' ? 'Genel Deneme' : SN[cfg.s] + ' Denemesi') : 'Tekrar Kartları';
  const name = (() => { try{ return JSON.parse(localStorage.getItem('yildirimLGS_v1') || '{}').name || ''; }catch(_){ return ''; } })();
  const date = new Date().toLocaleDateString('tr-TR');
  const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>${esc(title)} · ${date}</title><style>
    @page{size:A4;margin:14mm} body{font-family:Arial,Helvetica,sans-serif;color:#222;margin:0}
    h1{font-size:20px;margin:0 0 4px} .sub{color:#666;font-size:12px;margin-bottom:14px;border-bottom:2px solid #f2a541;padding-bottom:8px}
    .q{page-break-inside:avoid;break-inside:avoid;margin:0 0 16px;padding:10px;border:1px solid #ddd;border-radius:8px}
    .q b{font-size:15px} .q small{color:#777} .q img{display:block;max-width:100%;max-height:115mm;margin:8px auto}
    .opts{font-size:14px;letter-spacing:10px;margin-top:4px} .key{page-break-before:always;break-before:page}
    table{border-collapse:collapse;width:100%;font-size:13px} td,th{border:1px solid #ccc;padding:5px 8px;text-align:left} th{background:#f6eedb}
    .hint{position:fixed;top:8px;right:8px;background:#fff3d6;border:1px solid #f2a541;padding:8px 12px;border-radius:8px;font-size:13px} @media print{.hint{display:none}}
  </style></head><body><div class="hint">PDF olarak kaydetmek için yazdırma penceresinde <b>"PDF olarak kaydet"</b>i seç.</div>
  <h1>🐇 ${esc(title)}</h1><div class="sub">Yıldırım LGS Koçu · ${date}${name ? ' · ' + esc(name) : ''} · ${l.length} soru · Net = Doğru − Yanlış ÷ 3</div>
  ${l.map((q, i) => `<div class="q"><b>${i + 1}.</b> <small>${SN[q.s]}${q.t ? ' · ' + esc(q.t) : ''}</small>${src[i] ? `<img src="${src[i]}">` : '<p><i>(fotoğraf bu cihazda bulunamadı)</i></p>'}<div class="opts">Ⓐ Ⓑ Ⓒ Ⓓ</div></div>`).join('')}
  <div class="key"><h1>🔑 Cevap Anahtarı</h1><div class="sub">${esc(title)} · ${date}</div>
  <table><tr><th>Soru</th><th>Cevap</th><th>Ders</th><th>Konu</th></tr>${l.map((q, i) => `<tr><td>${i + 1}</td><td><b>${q.a || '?'}</b></td><td>${SN[q.s]}</td><td>${esc(q.t || '')}</td></tr>`).join('')}</table></div>
  <script>window.onload = () => setTimeout(() => window.print(), 400);<\/script></body></html>`;
  w.document.open(); w.document.write(html); w.document.close();
}

window.LGSQUIZ = { open(mode){ cfg.mode = mode; setup(); $('qz').classList.add('open'); } };
})();
