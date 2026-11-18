// Yıldırım LGS Koçu: Analiz + Soru Havuzu eklentisi
(() => {
const $ = id => document.getElementById(id);
const SYNC_URL = 'https://script.google.com/macros/s/AKfycbzrof3onkEL2nBjbHXawH0cGcwyn1iNKKeA8FTuBmkDvJJ7NVJ5GKD78Jsjsbe1sMFFbQ/exec';
const SUBJ = [
  {k:'tr', n:'Türkçe', q:20, e:'📖', c:'#e07a5f'}, {k:'mat', n:'Matematik', q:20, e:'➗', c:'#3d85c6'},
  {k:'fen', n:'Fen Bilimleri', q:20, e:'🔬', c:'#6fa35a'}, {k:'ink', n:'İnkılap Tarihi', q:10, e:'🇹🇷', c:'#c0392b'},
  {k:'din', n:'Din Kültürü', q:10, e:'🕊️', c:'#9b7bd4'}, {k:'ing', n:'İngilizce', q:10, e:'🇬🇧', c:'#e0a800'},
];
const TOPICS = {
  tr:['Sözcükte Anlam','Cümlede Anlam','Paragrafta Anlam','Fiilimsiler','Cümlenin Ögeleri','Fiilde Çatı','Cümle Türleri','Yazım Kuralları','Noktalama İşaretleri','Söz Sanatları','Metin Türleri','Anlatım Bozuklukları','Sözel Mantık ve Görsel Okuma'],
  mat:['Çarpanlar ve Katlar','Üslü İfadeler','Kareköklü İfadeler','Veri Analizi','Basit Olayların Olasılığı','Cebirsel İfadeler ve Özdeşlikler','Doğrusal Denklemler','Eşitsizlikler','Üçgenler','Eşlik ve Benzerlik','Dönüşüm Geometrisi','Geometrik Cisimler'],
  fen:['Mevsimler ve İklim','DNA ve Genetik Kod','Basınç','Madde ve Endüstri','Basit Makineler','Enerji Dönüşümleri ve Çevre Bilimi','Elektrik Yükleri ve Elektrik Enerjisi'],
  ink:['Bir Kahraman Doğuyor','Millî Uyanış: Bağımsızlık Yolunda Atılan Adımlar','Millî Bir Destan: Ya İstiklal Ya Ölüm!','Atatürkçülük ve Çağdaşlaşan Türkiye','Demokratikleşme Çabaları','Atatürk Dönemi Türk Dış Politikası',"Atatürk'ün Ölümü ve Sonrası"],
  din:['Kader İnancı','Zekât ve Sadaka','Din ve Hayat',"Hz. Muhammed'in Örnekliği","Kur'an-ı Kerim ve Özellikleri"],
  ing:['Friendship','Teen Life','In the Kitchen','On the Phone','The Internet','Adventures','Tourism','Chores','Science','Natural Forces'],
};
const WHY = {
  bilgi:  {n:'Bilgi eksiği', e:'🧠', c:'#3d85c6'},
  dikkat: {n:'Dikkatsizlik', e:'😵', c:'#e07a5f'},
  sure:   {n:'Süre yetmedi', e:'⏱️', c:'#e0a800'},
  emin:   {n:'Emin değilim', e:'❓', c:'#9b7bd4'},
};
const sj = k => SUBJ.find(s => s.k === k);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const main = () => { try{ return JSON.parse(localStorage.getItem('yildirimLGS_v1') || '{}'); }catch(_){ return {}; } };
const topicsOf = k => TOPICS[k].concat((main().extra || {})[k] || []);
const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); };
const toast = m => { const t = $('toast'); if (!t) return; t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2200); };
const say = (m, ms = 4500) => { const b = $('bubble'); if (!b) return; b.textContent = m; b.classList.add('show'); clearTimeout(say.t); say.t = setTimeout(() => b.classList.remove('show'), ms); };

// ───────── veri (yanlış/soru kayıtları) ─────────
const KEY = 'yildirimLGS_ek_v1';
const blank = () => ({items:[], deleted:[], updatedAt:0});
let E; try{ E = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || '{}')); }catch(_){ E = blank(); }
const saveLocal = () => { try{ localStorage.setItem(KEY, JSON.stringify(E)); }catch(_){ toast('⚠ Kaydedilemedi'); } };
const save = () => { E.updatedAt = Date.now(); saveLocal(); schedulePush(); };
const code = () => main().code || '';
const syncOn = () => /^[\w-]{6,30}$/.test(code());
const api = async (body) => { const r = await fetch(SYNC_URL, {method:'POST', body:JSON.stringify(body)}); const j = await r.json(); if (!j.ok) throw new Error(j.err); return j; };
let pushT;
function schedulePush(){ if (!syncOn()) return; clearTimeout(pushT); pushT = setTimeout(push, 1500); }
async function push(){
  if (!syncOn()) return;
  try{ await api({action:'save', code:code() + '-yanlis', data:JSON.stringify(E)}); }catch(_){}
  for (const it of E.items.filter(i => i.img && !i.up)) {
    try{ const d = await idb.get(it.id); if (d){ await api({action:'img_save', code:code(), id:it.id, data:d.split(',')[1]}); it.up = 1; saveLocal(); } }catch(_){}
  }
}
function merge(a, b){
  const del = new Set([...(a.deleted||[]), ...(b.deleted||[])]), m = new Map();
  [...(a.items||[]), ...(b.items||[])].forEach(i => { if (del.has(i.id)) return; const o = m.get(i.id); if (!o || (i.u||0) > (o.u||0)) m.set(i.id, {...i, up: (o && o.up) || i.up}); });
  return {items:[...m.values()].sort((x, y) => y.id.localeCompare(x.id)), deleted:[...del].slice(-500), updatedAt:Math.max(a.updatedAt||0, b.updatedAt||0)};
}
async function pull(){
  if (!syncOn()) return;
  try{
    const r = await fetch(SYNC_URL + '?action=load&code=' + encodeURIComponent(code() + '-yanlis')); const j = await r.json();
    if (j.ok && j.data){ const before = JSON.stringify(E); E = merge(E, JSON.parse(j.data)); saveLocal(); if (JSON.stringify(E) !== before) refresh(); }
    if (j.ok && JSON.stringify(E) !== (j.data || '')) schedulePush();
  }catch(_){}
}

// ───────── fotoğraflar: bu cihazda IndexedDB, bulutta E-Tablo ─────────
const idb = (() => {
  let dbp; const db = () => dbp = dbp || new Promise((res, rej) => { const r = indexedDB.open('lgsFoto', 1); r.onupgradeneeded = () => r.result.createObjectStore('img'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const tx = async (mode, fn) => { const d = await db(); return new Promise((res, rej) => { const t = d.transaction('img', mode), st = t.objectStore('img'), q = fn(st); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); };
  return { get: id => tx('readonly', s => s.get(id)), set: (id, v) => tx('readwrite', s => s.put(v, id)), del: id => tx('readwrite', s => s.delete(id)) };
})();
async function imgFor(it){
  let d = await idb.get(it.id).catch(() => null);
  if (!d && it.img && syncOn()){
    try{ const j = await api({action:'img_get', code:code(), id:it.id}); if (j.data){ d = 'data:image/jpeg;base64,' + j.data; await idb.set(it.id, d); } }catch(_){}
  }
  return d;
}
function shrink(file){
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => { const im = new Image(); im.onload = () => {
      const k = Math.min(1, 1100 / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', .72));
    }; im.onerror = rej; im.src = fr.result; };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}

// ───────── arayüz ─────────
const css = `
.ek-chips{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.ek-chip{border:1px solid var(--stroke);background:var(--paper2);border-radius:999px;padding:6px 12px;font-weight:800;font-size:13px;cursor:pointer;transition:.2s}
.ek-chip.on{color:#fff;border-color:transparent}
.ek-why{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.ek-why button{border:2px solid var(--stroke);background:var(--paper2);border-radius:16px;padding:10px 6px;font-weight:800;font-size:13px;transition:.2s}
.ek-why button b{display:block;font-size:22px}
.ek-why button.on{border-color:var(--sun);background:#fff3d6;transform:translateY(-2px)}
.ek-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;margin-top:12px}
.ek-card{border-radius:18px;background:var(--paper2);border:1px solid var(--stroke);overflow:hidden;display:flex;flex-direction:column;animation:pageIn .4s}
.ek-card.solved{opacity:.6}
.ek-ph{height:150px;background:linear-gradient(135deg,#eef5e6,#fbf3e3);display:grid;place-items:center;font-size:40px;cursor:zoom-in;overflow:hidden}
.ek-ph img{width:100%;height:100%;object-fit:cover}
.ek-body{padding:10px 12px;font-size:13.5px;font-weight:700;flex:1;display:flex;flex-direction:column;gap:5px}
.ek-tag{display:inline-block;padding:3px 9px;border-radius:999px;font-size:12px;font-weight:800;color:#fff}
.ek-act{display:flex;gap:6px;padding:0 10px 10px}
.ek-act button{flex:1;border:1px solid var(--stroke);background:var(--paper);border-radius:12px;padding:7px;font-weight:800;font-size:12.5px}
.ek-drop{display:block;border:2px dashed var(--stroke);border-radius:18px;padding:16px;text-align:center;cursor:pointer;font-weight:800;color:var(--muted);background:var(--paper2)}
.ek-drop img{max-height:160px;border-radius:12px;display:block;margin:0 auto}
.ek-bar{display:flex;height:26px;border-radius:999px;overflow:hidden;margin:8px 0}
.ek-bar span{display:grid;place-items:center;color:#fff;font-size:12px;font-weight:800;white-space:nowrap;overflow:hidden}
.ek-row{display:grid;grid-template-columns:minmax(120px,1.1fr) 2fr 34px;gap:10px;align-items:center;margin:7px 0;font-size:13.5px;font-weight:700}
.ek-row .trk{display:flex;height:16px;border-radius:99px;overflow:hidden;background:rgba(111,163,90,.12)}
.ek-light{position:fixed;inset:0;z-index:70;background:rgba(20,25,15,.85);display:none;align-items:center;justify-content:center;padding:20px;cursor:zoom-out}
.ek-light.open{display:flex} .ek-light img{max-width:100%;max-height:100%;border-radius:12px}
.ek-tip{padding:12px 14px;border-radius:16px;background:#fff6dd;border:1px solid #f2d18b;font-weight:700;font-size:14px;margin-top:8px}
.ek-svg svg{width:100%;height:280px;display:block}
@media (max-width:900px){.ek-why{grid-template-columns:repeat(2,1fr)}}
`;
document.head.insertAdjacentHTML('beforeend', '<style>' + css + '</style>');
const nav = document.querySelector('nav.top'), sync = $('syncChip');
nav.insertBefore(Object.assign(document.createElement('button'), {className:'tab', innerHTML:'📸 Soru Havuzu', onclick:() => go('havuz')}), sync).dataset.p = 'havuz';
nav.insertBefore(Object.assign(document.createElement('button'), {className:'tab', innerHTML:'📈 Analiz', onclick:() => go('analiz')}), sync).dataset.p = 'analiz';
function go(p){
  document.querySelectorAll('.tab[data-p]').forEach(t => t.classList.toggle('on', t.dataset.p === p));
  document.querySelectorAll('.page').forEach(x => x.classList.toggle('on', x.id === 'p-' + p));
  window.scrollTo({top:0, behavior:'smooth'}); refresh();
}
const opts = (arr, sel) => arr.map(([v, t]) => `<option value="${esc(v)}" ${v === sel ? 'selected' : ''}>${esc(t)}</option>`).join('');
const wrap = document.querySelector('.wrap');
wrap.insertAdjacentHTML('beforeend', `
<section class="page" id="p-havuz">
  <div class="grid g2" style="margin-top:16px">
    <div class="card paper">
      <h2>➕ Yanlış / soru ekle</h2>
      <label class="ek-drop" id="ekDrop"><input type="file" id="ekFile" accept="image/*" hidden><span id="ekDropTxt">📷 Fotoğraf çek ya da seç<br><small style="font-weight:600">(isteğe bağlı)</small></span></label>
      <div class="row" style="margin-top:10px"><select id="ekSubj" style="flex:1">${opts(SUBJ.map(s => [s.k, s.e + ' ' + s.n]), 'mat')}</select><select id="ekTopic" style="flex:1.4"></select></div>
      <h3 style="margin-top:12px">Neden yanlış yaptın?</h3>
      <div class="ek-why" id="ekWhy">${Object.entries(WHY).map(([k, w]) => `<button data-w="${k}" class="${k === 'bilgi' ? 'on' : ''}"><b>${w.e}</b>${w.n}</button>`).join('')}</div>
      <textarea id="ekNote" rows="2" style="width:100%;margin-top:10px;resize:vertical" placeholder="Kısa not (ör. işaret hatası yaptım, formülü unuttum)"></textarea>
      <button class="btn green" id="ekSave" style="width:100%;margin-top:10px;font-size:17px">💾 Havuza ekle</button>
    </div>
    <div class="card paper">
      <h2>🗂️ Soru havuzum</h2>
      <div class="ek-chips" id="ekFilt"></div>
      <label style="font-weight:800;font-size:13px;display:flex;gap:6px;align-items:center"><input type="checkbox" id="ekOpen"> Sadece tekrar çözmediklerim</label>
      <div class="muted" style="font-weight:700;font-size:13px;margin-top:6px" id="ekCount"></div>
    </div>
  </div>
  <div class="ek-grid" id="ekGrid"></div>
</section>
<section class="page" id="p-analiz">
  <div class="card paper" style="margin-top:16px">
    <h2>📈 Ders ders net gelişimi</h2>
    <p class="muted" style="margin:0;font-weight:700;font-size:13px">Dersler farklı soru sayısında olduğu için başarı yüzdesi gösteriliyor (net ÷ soru sayısı).</p>
    <div class="ek-chips" id="anChips"></div>
    <div class="ek-svg" id="anChart"></div>
    <div id="anAvg"></div>
  </div>
  <div class="grid g2" style="margin-top:16px">
    <div class="card paper"><h2>🔍 Yanlışların nereden geliyor?</h2><div id="anWhy"></div></div>
    <div class="card paper"><h2>🎯 En çok yanlış yaptığın konular</h2><div class="ek-chips" id="anTopFilt"></div><div id="anTop"></div></div>
  </div>
</section>`);
document.body.insertAdjacentHTML('beforeend', '<div class="ek-light" id="ekLight"><img alt=""></div>');
$('ekLight').onclick = () => $('ekLight').classList.remove('open');

// ── form ──
let ekImg = null, ekWhy = 'bilgi', ekF = 'all', anOn = new Set(SUBJ.map(s => s.k)), anTopF = 'all';
const fillT = () => { $('ekTopic').innerHTML = '<option value="">Konu seç (bilmiyorsan boş bırak)</option>' + topicsOf($('ekSubj').value).map(t => `<option>${esc(t)}</option>`).join(''); };
fillT(); $('ekSubj').onchange = fillT;
$('ekWhy').querySelectorAll('button').forEach(b => b.onclick = () => { $('ekWhy').querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on'); ekWhy = b.dataset.w; });
$('ekFile').onchange = async e => {
  const f = e.target.files[0]; if (!f) return;
  try{ ekImg = await shrink(f); $('ekDropTxt').innerHTML = `<img src="${ekImg}" alt=""><small>Değiştirmek için dokun</small>`; }
  catch(_){ toast('⚠ Fotoğraf okunamadı'); }
};
$('ekSave').onclick = async () => {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const it = {id, s:$('ekSubj').value, t:$('ekTopic').value, w:ekWhy, note:$('ekNote').value.trim(), d:today(), img:!!ekImg, solved:false, u:Date.now()};
  if (ekImg) await idb.set(id, ekImg).catch(() => toast('⚠ Fotoğraf bu cihaza kaydedilemedi'));
  E.items.unshift(it); save();
  ekImg = null; $('ekFile').value = ''; $('ekNote').value = ''; $('ekDropTxt').innerHTML = '📷 Fotoğraf çek ya da seç<br><small style="font-weight:600">(isteğe bağlı)</small>';
  toast('📸 Havuza eklendi'); say(ekWhy === 'dikkat' ? 'Dikkatsizlik mi? Soruyu yavaş oku, şıkları kontrol et 👀' : 'Yanlışını yazmak, onu bir daha yapmamanın ilk adımı 💪');
  refresh();
};

// ── havuz listesi ──
function renderPool(){
  const counts = {}; E.items.forEach(i => counts[i.s] = (counts[i.s] || 0) + 1);
  $('ekFilt').innerHTML = [['all', '🌈 Tümü', E.items.length]].concat(SUBJ.map(s => [s.k, s.e + ' ' + s.n, counts[s.k] || 0]))
    .map(([k, n, c]) => `<span class="ek-chip ${ekF === k ? 'on' : ''}" data-f="${k}" style="${ekF === k ? 'background:' + (k === 'all' ? '#6fa35a' : sj(k).c) : ''}">${n} · ${c}</span>`).join('');
  $('ekFilt').querySelectorAll('[data-f]').forEach(c => c.onclick = () => { ekF = c.dataset.f; renderPool(); });
  const list = E.items.filter(i => (ekF === 'all' || i.s === ekF) && (!$('ekOpen').checked || !i.solved));
  $('ekCount').textContent = `${list.length} soru · ${list.filter(i => !i.solved).length} tanesi tekrar çözülmeyi bekliyor`;
  $('ekGrid').innerHTML = list.length ? list.map(i => { const s = sj(i.s), w = WHY[i.w] || WHY.emin;
    return `<div class="ek-card ${i.solved ? 'solved' : ''}" data-id="${i.id}">
      <div class="ek-ph" data-ph="${i.id}">${i.img ? '⏳' : s.e}</div>
      <div class="ek-body"><span>${s.e} ${esc(s.n)}</span><span style="font-weight:800">${esc(i.t || 'Konu belirtilmedi')}</span>
        <span><span class="ek-tag" style="background:${w.c}">${w.e} ${w.n}</span></span>
        ${i.note ? `<span class="muted" style="font-weight:600">${esc(i.note)}</span>` : ''}
        <span class="muted" style="font-size:12px">${i.d.split('-').reverse().join('.')}</span></div>
      <div class="ek-act"><button data-a="solve">${i.solved ? '↺ Geri al' : '✅ Çözdüm'}</button><button data-a="ask" title="ChatGPT'ye sor">🆘</button><button data-a="del" title="Sil">🗑</button></div></div>`; }).join('')
    : '<div class="card paper muted" style="font-weight:700">Burası henüz boş. Denemede yanlış yaptığın soruların fotoğrafını ekle, burada ders ders birikir 📚</div>';
  $('ekGrid').querySelectorAll('.ek-card').forEach(card => {
    const it = E.items.find(i => i.id === card.dataset.id), ph = card.querySelector('.ek-ph');
    if (it.img) imgFor(it).then(d => { if (d){ ph.innerHTML = `<img src="${d}" alt="">`; ph.onclick = () => { $('ekLight').querySelector('img').src = d; $('ekLight').classList.add('open'); }; } else ph.textContent = '🖼️'; });
    card.querySelectorAll('[data-a]').forEach(b => b.onclick = async () => {
      if (b.dataset.a === 'solve'){ it.solved = !it.solved; it.u = Date.now(); save(); if (it.solved) say('Bir yanlış daha tarihe karıştı! 🎉'); renderPool(); }
      if (b.dataset.a === 'del' && confirm('Bu soru havuzdan silinsin mi?')){
        E.items = E.items.filter(x => x.id !== it.id); E.deleted.push(it.id); save(); idb.del(it.id).catch(() => {});
        if (it.img && syncOn()) api({action:'img_del', code:code(), id:it.id}).catch(() => {});
        renderPool();
      }
      if (b.dataset.a === 'ask'){
        const p = `Ben LGS'ye hazırlanan 8. sınıf öğrencisiyim. Ders: ${sj(it.s).n}${it.t ? ', konu: ' + it.t : ''}. Bu soruyu yanlış yaptım (${(WHY[it.w] || WHY.emin).n.toLowerCase()}).${it.note ? ' Notum: ' + it.note : ''}\n(Sorunun fotoğrafını ekliyorum.)\n\nBana cevabı hemen söyleme. Önce nerede hata yapmış olabileceğimi bulmama yardım et, sonra adım adım çözümü göster. En sonda bu konudan bana 2 benzer soru sor.`;
        try{ await navigator.clipboard.writeText(p); }catch(_){}
        window.open('https://chatgpt.com/?q=' + encodeURIComponent(p), '_blank');
      }
    });
  });
}
$('ekOpen').onchange = renderPool;

// ── analiz ──
function renderAnalysis(){
  const ex = (main().exams || []).slice().sort((a, b) => a.date.localeCompare(b.date));
  $('anChips').innerHTML = SUBJ.map(s => `<span class="ek-chip ${anOn.has(s.k) ? 'on' : ''}" data-k="${s.k}" style="${anOn.has(s.k) ? 'background:' + s.c : ''}">${s.e} ${s.n}</span>`).join('');
  $('anChips').querySelectorAll('[data-k]').forEach(c => c.onclick = () => { anOn.has(c.dataset.k) ? anOn.delete(c.dataset.k) : anOn.add(c.dataset.k); renderAnalysis(); });
  if (!ex.length){ $('anChart').innerHTML = '<p class="muted" style="font-weight:700">Deneme girdikçe ders ders grafiğin burada oluşacak 🌱</p>'; $('anAvg').innerHTML = ''; }
  else {
    const W = 680, H = 280, P = 38, x = i => ex.length === 1 ? W/2 : P + i * (W - 2*P) / (ex.length - 1), y = v => H - P - v / 100 * (H - 2*P);
    let g = ''; for (let v = 0; v <= 100; v += 25) g += `<line x1="${P}" x2="${W-P}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(111,140,90,.2)"/><text x="${P-8}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="#6c7a5c" font-weight="700">%${v}</text>`;
    ex.forEach((e, i) => g += `<text x="${x(i)}" y="${H-12}" text-anchor="middle" font-size="10.5" fill="#6c7a5c" font-weight="700">${esc(e.date.slice(5).split('-').reverse().join('.'))}</text>`);
    SUBJ.filter(s => anOn.has(s.k)).forEach(s => {
      const pts = ex.map((e, i) => [x(i), y(Math.max(0, ((e.s[s.k] || [0,0,0])[2]) / s.q * 100))]);
      g += `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${s.c}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>`;
      g += pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#fff" stroke="${s.c}" stroke-width="3"><title>${s.n} · ${esc(ex[i].name)}: ${(ex[i].s[s.k] || [0,0,0])[2]} net</title></circle>`).join('');
    });
    $('anChart').innerHTML = `<svg viewBox="0 0 ${W} ${H}">${g}</svg>`;
    const last = ex.slice(-3);
    const avg = SUBJ.map(s => ({s, p: last.reduce((a, e) => a + ((e.s[s.k] || [0,0,0])[2]) / s.q * 100, 0) / last.length})).sort((a, b) => a.p - b.p);
    $('anAvg').innerHTML = `<h3 style="margin-top:10px">Son ${last.length} denemenin ortalaması</h3>` + avg.map(({s, p}) =>
      `<div class="ek-row"><span>${s.e} ${s.n}</span><div class="trk"><span style="width:${Math.max(2, p)}%;background:${s.c}"></span></div><span>%${Math.round(p)}</span></div>`).join('')
      + `<div class="ek-tip">💡 En çok gelişime açık dersin: <b>${avg[0].s.e} ${avg[0].s.n}</b>. Bu hafta odak seanslarının birkaçını ona ayırabilirsin.</div>`;
  }
  // neden dağılımı
  const all = E.items, n = all.length, wc = {}; all.forEach(i => wc[i.w] = (wc[i.w] || 0) + 1);
  if (!n) $('anWhy').innerHTML = '<p class="muted" style="font-weight:700">📸 Soru Havuzu\'na yanlışlarını ekledikçe burada neden yanlış yaptığın görünecek.</p>';
  else {
    const top = Object.entries(wc).sort((a, b) => b[1] - a[1])[0][0];
    const tips = {
      bilgi:'Yanlışlarının çoğu bilgi eksiğinden. Bu konuların anlatımına geri dön; 🆘 Takıldım ile ChatGPT\'den konuyu anlatmasını isteyebilirsin.',
      dikkat:'Yanlışlarının çoğu dikkatsizlikten, yani aslında biliyorsun! 💪 Soru kökündeki "değildir / yanlıştır" gibi ifadelerin altını çiz, işlemi bitirince şıkları bir kez daha kontrol et.',
      sure:'Süre yetmiyor. Odak sekmesinde süre tutarak soru çöz; takıldığın soruyu işaretleyip geç, sona dön.',
      emin:'Emin olmadığın çok soru var. Bunları tekrar çözüp gerçekten bilgi eksiği mi dikkatsizlik mi olduğunu işaretle.',
    };
    $('anWhy').innerHTML = `<div class="ek-bar">${Object.entries(WHY).filter(([k]) => wc[k]).map(([k, w]) => `<span style="width:${wc[k]/n*100}%;background:${w.c}" title="${w.n}: ${wc[k]}">${w.e} %${Math.round(wc[k]/n*100)}</span>`).join('')}</div>`
      + Object.entries(WHY).map(([k, w]) => `<div class="ek-row"><span>${w.e} ${w.n}</span><div class="trk"><span style="width:${(wc[k]||0)/n*100}%;background:${w.c}"></span></div><span>${wc[k]||0}</span></div>`).join('')
      + `<div class="ek-tip">💡 ${tips[top]}</div>`;
  }
  // konu sıralaması
  $('anTopFilt').innerHTML = [['all','🌈 Tümü']].concat(SUBJ.map(s => [s.k, s.e + ' ' + s.n])).map(([k, t]) => `<span class="ek-chip ${anTopF === k ? 'on' : ''}" data-f="${k}" style="${anTopF === k ? 'background:' + (k === 'all' ? '#6fa35a' : sj(k).c) : ''}">${t}</span>`).join('');
  $('anTopFilt').querySelectorAll('[data-f]').forEach(c => c.onclick = () => { anTopF = c.dataset.f; renderAnalysis(); });
  const byT = {}; all.filter(i => anTopF === 'all' || i.s === anTopF).forEach(i => { const k = i.s + '|' + (i.t || 'Konu belirtilmedi'); (byT[k] = byT[k] || {n:0}).n++; byT[k][i.w] = (byT[k][i.w] || 0) + 1; });
  const rows = Object.entries(byT).sort((a, b) => b[1].n - a[1].n).slice(0, 8), mx = rows.length ? rows[0][1].n : 1;
  $('anTop').innerHTML = rows.length ? rows.map(([k, v]) => { const [s, t] = k.split('|');
    return `<div class="ek-row"><span>${sj(s).e} ${esc(t)}</span><div class="trk" style="width:${v.n/mx*100}%">${Object.entries(WHY).filter(([w]) => v[w]).map(([w, d]) => `<span style="flex:${v[w]};background:${d.c}" title="${d.n}: ${v[w]}"></span>`).join('')}</div><span>${v.n}</span></div>`; }).join('')
    + `<div class="muted" style="font-size:12.5px;font-weight:700;margin-top:6px">${Object.values(WHY).map(w => `<span style="color:${w.c}">■</span> ${w.n}`).join(' · ')}</div>`
    : '<p class="muted" style="font-weight:700">Henüz kayıt yok.</p>';
}
function refresh(){ const p = document.querySelector('.page.on')?.id; if (p === 'p-havuz') renderPool(); if (p === 'p-analiz') renderAnalysis(); }
pull();
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') pull(); });
setInterval(pull, 90000);
})();
