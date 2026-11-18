// Yıldırım LGS Koçu: Bilkuş 🦉 (veriye dayalı, öğrenen koç; konu anlatmaz, yönlendirir)
(() => {
const $ = id => document.getElementById(id);
const OWL = 'data:image/webp;base64,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';
const SUBJ = [
  {k:'tr', n:'Türkçe', q:20, e:'📖'}, {k:'mat', n:'Matematik', q:20, e:'➗'}, {k:'fen', n:'Fen Bilimleri', q:20, e:'🔬'},
  {k:'ink', n:'İnkılap Tarihi', q:10, e:'🇹🇷'}, {k:'din', n:'Din Kültürü', q:10, e:'🕊️'}, {k:'ing', n:'İngilizce', q:10, e:'🇬🇧'},
];
const sj = k => SUBJ.find(s => s.k === k) || SUBJ[0];
const EXAM = new Date('2027-06-13T09:30:00+03:00');
const WHYN = {bilgi:'bilgi eksiği', dikkat:'dikkatsizlik', sure:'süre', emin:'emin olamama'};
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const read = k => { try{ return JSON.parse(localStorage.getItem(k) || '{}'); }catch(_){ return {}; } };
const M = () => Object.assign({exams:[], topics:{}, pomo:{}, days:[], stuck:[], extra:{}}, read('yildirimLGS_v1'));
const E = () => Object.assign({items:[]}, read('yildirimLGS_ek_v1'));
const day = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
const addDays = (s, n) => { const d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + n); return day(d); };
const daysLeft = () => Math.max(0, Math.ceil((EXAM - new Date()) / 864e5));
const f1 = x => (Math.round(x * 10) / 10).toString().replace('.', ',');
const pick = a => a[Math.floor(Math.random() * a.length)];

// ───────── Bilkuş'un hafızası (bu cihazda) ─────────
const KK = 'yildirimLGS_koc_v1';
const K = Object.assign({syn:{}, srs:{}, w:{}, load:3, plan:null, hist:[], goal:0}, read(KK));
const saveK = () => { try{ localStorage.setItem(KK, JSON.stringify(K)); }catch(_){} };

// ───────── 1) Konu hâkimiyeti modeli: verilerden sürekli güncellenir ─────────
function mastery(){
  const m = M(), e = E(), map = {};
  const get = (s, t) => { const k = s + '|' + t; if (!(k in map)){ const st = ((m.topics || {})[s] || {})[t] || 0; map[k] = [0.5, 0.35, 0.78][st]; } return k; };
  Object.entries(m.topics || {}).forEach(([s, ts]) => Object.keys(ts).forEach(t => get(s, t)));
  e.items.slice().sort((a, b) => (a.u || 0) - (b.u || 0)).forEach(i => {
    if (!i.t) return; const k = get(i.s, i.t);
    map[k] *= {bilgi:.7, dikkat:.94, sure:.92, emin:.85}[i.w] || .9;
    if (i.solved) map[k] += .15 * (1 - map[k]);
    const r = K.srs[i.id]; if (r) map[k] += (r.ok || 0) * .08 * (1 - map[k]) - (r.bad || 0) * .05 * map[k];
  });
  (m.stuck || []).forEach(x => { if (x.t){ const k = get(x.s, x.t); map[k] *= .92; } });
  return Object.entries(map).map(([k, v]) => { const [s, t] = k.split('|'); return {s, t, m:Math.max(.02, Math.min(.98, v))}; });
}
function whyOf(s, t){ const c = {}; E().items.filter(i => i.s === s && i.t === t).forEach(i => c[i.w] = (c[i.w] || 0) + 1); return Object.entries(c).sort((a, b) => b[1] - a[1])[0]?.[0]; }

// ───────── 2) Aralıklı tekrar (Leitner) ─────────
const BOX = [1, 2, 4, 7, 15];
function dueItems(){
  const t = day(); return E().items.filter(i => !i.solved).filter(i => { const r = K.srs[i.id]; return !r || r.due <= t; })
    .sort((a, b) => ((K.srs[a.id] || {}).b || 0) - ((K.srs[b.id] || {}).b || 0));
}
function review(id, ok){
  const r = K.srs[id] || {b:0, ok:0, bad:0};
  if (ok){ r.b = Math.min(4, r.b + 1); r.ok++; } else { r.b = 0; r.bad++; }
  r.due = addDays(day(), BOX[r.b]); K.srs[id] = r; saveK(); return r;
}

// ───────── 3) Deneme analizi ─────────
const subjAvg = (ex, k, n = 3) => { const l = ex.slice(-n); return l.length ? l.reduce((a, e) => a + ((e.s[k] || [0,0,0])[2]) / sj(k).q, 0) / l.length : null; };
function slope(pts){ const n = pts.length; if (n < 2) return 0; const mx = pts.reduce((a, p) => a + p[0], 0) / n, my = pts.reduce((a, p) => a + p[1], 0) / n;
  const num = pts.reduce((a, p) => a + (p[0] - mx) * (p[1] - my), 0), den = pts.reduce((a, p) => a + (p[0] - mx) ** 2, 0); return den ? num / den : 0; }
const exams = () => M().exams.slice().sort((a, b) => a.date.localeCompare(b.date));

// ───────── 4) Öğrenen günlük plan ─────────
const W = t => K.w[t] ?? 1;
function closeYesterday(){
  if (!K.plan || K.plan.date === day()) return;
  const p = K.plan, done = p.tasks.filter(x => x.done).length, ratio = p.tasks.length ? done / p.tasks.length : 0;
  p.tasks.forEach(x => { if (!x.done && !x.x) K.w[x.type] = Math.max(.4, W(x.type) - .05); });
  K.hist.push({date:p.date, n:p.tasks.length, done}); K.hist = K.hist.slice(-30);
  if (ratio >= .8) K.load = Math.min(6, K.load + 1); else if (ratio < .4) K.load = Math.max(2, K.load - 1);
  K.plan = null; saveK();
}
function buildPlan(){
  closeYesterday();
  if (K.plan && K.plan.date === day()) return K.plan;
  const c = [], ex = exams(), due = dueItems(), ms = mastery().sort((a, b) => a.m * (sj(a.s).q === 20 ? .9 : 1) - b.m * (sj(b.s).q === 20 ? .9 : 1));
  if (due.length) c.push({type:'srs', p:3 + Math.min(3, due.length / 3), txt:`🔁 Soru havuzundan ${Math.min(5, due.length)} soruyu yeniden çöz (tekrar zamanı geldi)`, act:'srs'});
  ms.slice(0, 3).forEach((x, i) => {
    const w = whyOf(x.s, x.t);
    if (w === 'dikkat') c.push({type:'dikkat', p:2.6 - i * .3, txt:`✏️ ${sj(x.s).e} ${x.t}: 15 soru çöz, her soruda kökü iki kez oku`, act:'pomo'});
    else c.push({type:'konu', p:2.8 - i * .3, txt:`📖 ${sj(x.s).e} ${x.t}: konuyu tekrar et, sonra 10 soru çöz`, act:'pomo'});
  });
  if (ex.length){
    const weak = SUBJ.map(s => ({s, a:subjAvg(ex, s.k)})).sort((a, b) => a.a - b.a)[0];
    c.push({type:'ders', p:2.2, txt:`🍅 ${weak.s.e} ${weak.s.n} için 2 odak seansı (en düşük ortalaman: %${Math.round(weak.a * 100)})`, act:'pomo'});
  }
  const m = M(), rep = [];
  Object.entries(m.topics || {}).forEach(([s, ts]) => Object.entries(ts).forEach(([t, v]) => { if (v === 1) rep.push({s, t}); }));
  rep.filter(r => !ms.slice(0, 3).some(x => x.s === r.s && x.t === r.t)).slice(0, 2).forEach(r => c.push({type:'tekrar', p:1.8, txt:`🟡 ${sj(r.s).e} ${r.t}: "tekrar lazım" demiştin, 1 odak seansı ayır`, act:'pomo'}));
  const last = ex[ex.length - 1];
  if (!last || (new Date() - new Date(last.date)) / 864e5 > 7) c.push({type:'deneme', p:2.5, txt:'📝 Bu hafta bir deneme çöz ve netlerini gir', act:'exams'});
  if (!c.length) c.push({type:'genel', p:1, txt:'🍅 2 odak seansıyla en sevmediğin dersten soru çöz', act:'pomo'}, {type:'genel', p:.9, txt:'📝 Deneme netlerini girmeye başla, sana özel plan çıkarayım', act:'exams'});
  const tasks = c.sort((a, b) => b.p * W(b.type) - a.p * W(a.type)).slice(0, K.load).map((x, i) => ({...x, id:i, done:false}));
  K.plan = {date:day(), tasks}; saveK(); return K.plan;
}

// ───────── 5) Niyet anlama + öğrenme ─────────
const norm = s => s.toLocaleLowerCase('tr').replace(/[^a-zçğıöşü0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const stems = s => norm(s).split(' ').filter(w => w.length > 2).map(w => w.slice(0, 5));
const INT = {
  guvenlik:['intihar','ölmek ist','kendime zarar','yaşamak istemiyorum','canıma kıy','kendimi öldür'],
  plan:['bugün','ne çalış','neye çalış','plan','program','ne yapay','neler yapay','nereden başla'],
  durum:['nasıl gid','durum','ilerle','geliş','rapor','özet'],
  deneme:['deneme','net','analiz','sınav sonu','puan','son sınav'],
  zayif:['zayıf','eksik','hangi konu','kötü','zorlan','en kötü'],
  dikkat:['dikkat','dikkatsiz','yanlış oku','soruyu kaçır'],
  sure:['süre','yetişm','zaman yet','hızlan','yavaş','bitiremi'],
  motiv:['motiv','sıkıl','yoruldum','bıktım','yapamıyor','yapamayacağ','üzgün','stres','kayg','korkuyor','moral','yetersiz','ağla'],
  tekrar:['tekrar','havuz','yanlışlarım','gözden geçir','eski soru'],
  sinav:['kaç gün','ne zaman','kalan gün','lgs ne','sınava kaç'],
  hedef:['hedef','kaç net yap','lise','istiyorum'],
  soru:['soru','çöz','anlamadım','anlat','nasıl yapılır','formül','nedir','ne demek','neden','açıkla'],
  selam:['merhaba','selam','günaydın','iyi akşam','naber','hey','nasılsın'],
  tesekkur:['teşekkür','sağ ol','sağol','eyvallah','süper','harika','tamamdır'],
};
let pending = null;
function intent(text){
  const n = norm(text), st = stems(text), sc = {};
  for (const [k, ws] of Object.entries(INT)) ws.forEach(w => { if (n.includes(w)) sc[k] = (sc[k] || 0) + 1; });
  if (sc.guvenlik) return 'guvenlik';
  st.forEach(s => Object.entries(K.syn[s] || {}).forEach(([k, c]) => sc[k] = (sc[k] || 0) + .6 * c));
  if (/hedef\w*\s*\d+|\d+\s*net/.test(n) && sc.hedef) return 'hedef';
  if (sc.soru && Object.keys(sc).length > 1) sc.soru -= .5;
  const best = Object.entries(sc).sort((a, b) => b[1] - a[1])[0];
  return best && best[1] > .5 ? best[0] : null;
}
function learn(intentKey){
  if (!pending || Date.now() - pending.t > 120000) return;
  pending.st.forEach(s => { K.syn[s] = K.syn[s] || {}; K.syn[s][intentKey] = Math.min(5, (K.syn[s][intentKey] || 0) + 1); });
  pending = null; saveK();
}

// ───────── Cevaplar ─────────
const btn = (txt, act, extra = '') => `<button class="bk-act" data-act="${act}" ${extra}>${txt}</button>`;
const name = () => M().name || 'şampiyon';
const R = {
  selam(){ const p = buildPlan(), d = p.tasks.filter(t => t.done).length;
    return `Merhaba ${esc(name())}! 🦉 Sınava <b>${daysLeft()} gün</b> var. Bugünkü planında ${p.tasks.length} görevin var, ${d} tanesini bitirdin.<br>Ne konuşalım?`; },
  plan(){
    const p = buildPlan();
    return `📅 <b>Bugünün planı</b> (${p.tasks.length} görev)<div class="bk-plan">` + p.tasks.map(t =>
      `<div class="bk-task ${t.done ? 'done' : ''} ${t.x ? 'gone' : ''}" data-id="${t.id}"><label><input type="checkbox" ${t.done ? 'checked' : ''}> <span>${esc(t.txt)}</span></label>
       <span class="bk-tbtn">${btn('▶', 'go:' + t.act, 'title="Başla"')}${btn('✕', 'skip:' + t.id, 'title="Bu bana uymadı"')}</span></div>`).join('') + '</div>'
      + `<small class="bk-note">Planı senin verilerinden çıkarıyorum. Bitirdikçe günlük görev sayın artar, uymayan önerileri ✕ ile geçersen bir dahakine onları daha az öneririm.</small>`;
  },
  deneme(){
    const ex = exams(); if (!ex.length) return 'Henüz deneme girmemişsin. 📝 İlk denemeni girersen sana ders ders analiz çıkarırım.<br>' + btn('📊 Deneme gir', 'go:exams');
    const L = ex[ex.length - 1], P = ex[ex.length - 2], best = Math.max(...ex.map(e => e.net));
    let h = `📊 <b>${esc(L.name)}</b>: <b>${f1(L.net)} net</b>`;
    if (P) h += ` (${L.net >= P.net ? '▲ +' : '▼ '}${f1(L.net - P.net)} öncekine göre)`;
    if (L.net >= best && ex.length > 1) h += ' 👑 rekor!';
    h += '<ul class="bk-ul">' + SUBJ.map(s => { const v = L.s[s.k] || [0,0,0], pv = P ? (P.s[s.k] || [0,0,0])[2] : null, bos = s.q - v[0] - v[1];
      const tr = slope(ex.slice(-5).map((e, i) => [i, (e.s[s.k] || [0,0,0])[2]]));
      let note = ''; if (v[0] + v[1] && v[1] / (v[0] + v[1]) >= .35) note = ' · yanlışı çok'; else if (bos / s.q >= .3) note = ' · boşu çok';
      return `<li>${s.e} ${s.n}: <b>${f1(v[2])}</b>/${s.q}${pv !== null ? ` (${v[2] >= pv ? '+' : ''}${f1(v[2] - pv)})` : ''}${ex.length >= 3 ? (tr > .3 ? ' 📈' : tr < -.3 ? ' 📉' : ' ➡️') : ''}${note}</li>`; }).join('') + '</ul>';
    const tips = [];
    SUBJ.forEach(s => { const v = L.s[s.k] || [0,0,0]; if (v[0] + v[1] >= 4 && v[1] / (v[0] + v[1]) >= .35) tips.push(`${s.n}'de yanlış oranın yüksek: emin olmadığın soruyu boş bırakmayı düşün, 3 yanlış 1 doğruyu götürüyor.`); });
    SUBJ.forEach(s => { const v = L.s[s.k] || [0,0,0]; if ((s.q - v[0] - v[1]) / s.q >= .3) tips.push(`${s.n}'de çok boş var: süre mi yetmedi, konu mu eksik? Soru Havuzu'na işaretlersen ayırt ederim.`); });
    if (ex.length >= 3){
      const t0 = new Date(ex[0].date), pts = ex.map(e => [(new Date(e.date) - t0) / 864e5, e.net]), sl = slope(pts);
      if (sl > 0){ const proj = Math.min(90, L.net + sl * daysLeft() * .6); h += `<p>📈 Haftada ortalama <b>+${f1(sl * 7)} net</b> artıyorsun. Bu tempoyla sınavda <b>${Math.round(proj)} civarı</b> mümkün (kaba tahmin, garanti değil).</p>`; }
      else h += '<p>➡️ Son denemelerde netlerin yatay gidiyor. Zayıf konulara odaklanınca kırılır, merak etme.</p>';
    }
    if (tips.length) h += '<p>💡 ' + tips.slice(0, 2).join('<br>💡 ') + '</p>';
    return h + btn('📈 Analiz sekmesini aç', 'go:analiz');
  },
  durum(){
    const m = M(), e = E(), wk = Object.entries(m.pomo || {}).filter(([d]) => d > addDays(day(), -7)).reduce((a, [, n]) => a + n, 0);
    const ex = exams(), un = e.items.filter(i => !i.solved).length, hist = K.hist.slice(-7), done = hist.reduce((a, h) => a + h.done, 0), all = hist.reduce((a, h) => a + h.n, 0);
    let h = `🧭 <b>Genel durumun</b><ul class="bk-ul"><li>🍅 Son 7 günde <b>${wk}</b> odak seansı</li><li>📝 ${ex.length} deneme${ex.length ? `, en iyi: <b>${f1(Math.max(...ex.map(x => x.net)))}</b>` : ''}</li><li>📸 Havuzda <b>${un}</b> tekrar bekleyen soru</li>`;
    if (all) h += `<li>✅ Son ${hist.length} günün planlarından %${Math.round(done / all * 100)}'ini bitirdin</li>`;
    h += `<li>⏳ Sınava ${daysLeft()} gün</li></ul>`;
    const ms = mastery().sort((a, b) => a.m - b.m).slice(0, 3);
    if (ms.length) h += 'Şu an en çok dikkat isteyen konular: ' + ms.map(x => `<b>${esc(x.t)}</b>`).join(', ') + '.';
    return h + '<br>' + btn('📅 Bugünün planı', 'say:plan');
  },
  zayif(){
    const ms = mastery().sort((a, b) => a.m - b.m).slice(0, 6);
    if (!ms.length) return 'Henüz yeterli verim yok. Konular sekmesinde konuları işaretlersen ve Soru Havuzu\'na yanlışlarını eklersen zayıf konularını ben bulurum 🔍<br>' + btn('📸 Soru Havuzu', 'go:havuz');
    return '🎯 <b>Tahmini hâkimiyetine göre öncelik sırası</b><ul class="bk-ul">' + ms.map(x => { const w = whyOf(x.s, x.t);
      return `<li>${sj(x.s).e} ${esc(x.t)}: <span class="bk-bar"><i style="width:${Math.round(x.m * 100)}%"></i></span>${w ? ` <small>(çoğu ${WHYN[w]})</small>` : ''}</li>`; }).join('') + '</ul>'
      + '<small class="bk-note">Bu tahmin yanlışlarına, tekrarlarına ve konu işaretlerine göre her gün güncelleniyor. Bilgi eksiği varsa konu tekrarı, dikkatsizlik varsa bol soru çözümü öneririm.</small>';
  },
  dikkat(){
    const it = E().items, d = it.filter(i => i.w === 'dikkat').length;
    return `😵 ${it.length ? `Havuzundaki ${it.length} yanlışın <b>${d}</b> tanesi dikkatsizlikten. ` : ''}Dikkatsizlik bilgi eksiğinden iyi haber: aslında biliyorsun! Şunları dene:
      <ul class="bk-ul"><li>Soru kökündeki <b>"değildir, yanlıştır, en az"</b> gibi kelimelerin altını çiz.</li><li>İşlemi bitirince cevabı soruya geri koyup kontrol et.</li><li>İki şık arasında kaldığında soruyu baştan oku.</li><li>Yorgunken dikkat düşer: 25 dakika çalış, 5 dakika mola.</li></ul>` + btn('⏱️ Odak seansı başlat', 'go:pomo');
  },
  sure(){
    return `⏱️ LGS'de sözel bölümde 50 soruya 75 dakika, sayısal bölümde 40 soruya 80 dakika var. Yani sözelde soru başına yaklaşık <b>1,5 dakika</b>, sayısalda <b>2 dakika</b>.
      <ul class="bk-ul"><li><b>Turlama:</b> 1 dakikada çözemediğin soruyu işaretle, geç, sona dön.</li><li>Evde soru çözerken süre tut. Odak sayacını kullanabilirsin.</li><li>Paragraf sorularında önce soru kökünü oku, sonra metni.</li></ul>` + btn('⏱️ Süre tutarak çalış', 'go:pomo');
  },
  motiv(){
    const ex = exams(), m = M(), wk = Object.values(m.pomo || {}).reduce((a, n) => a + n, 0);
    let ev = []; if (ex.length > 1 && ex[ex.length - 1].net > ex[0].net) ev.push(`ilk denemenden bu yana <b>+${f1(ex[ex.length - 1].net - ex[0].net)} net</b> arttırdın`);
    if (wk) ev.push(`şimdiye kadar <b>${wk}</b> odak seansı yaptın`);
    return `${pick(['Seni anlıyorum, bu dönem gerçekten yorucu olabiliyor 💛', 'Böyle hissetmen çok normal, LGS uzun bir maraton 🏃', 'Bazen herkesin enerjisi düşer, bu senin yapamayacağın anlamına gelmez 🌱'])}
      ${ev.length ? '<br>Bak ne yapmışsın: ' + ev.join(', ') + '. Bunlar boşa gitmiyor!' : ''}
      <br><br>Şimdi büyük düşünme, sadece <b>tek küçük adım</b>: 1 odak seansı, sonra mola. Gerçekten çok bunaldıysan bugün dinlen, yarın devam edersin. Bu kadar yorgun hissetmen uzun sürerse ailenle ya da öğretmeninle konuşmayı unutma.<br>` + btn('🍅 Sadece 25 dakika', 'go:pomo');
  },
  guvenlik(){
    return `💛 Bunu yazdığın için teşekkür ederim. Şu an çok zor bir şey yaşıyor olabilirsin ve bununla yalnız kalmamalısın.<br><br><b>Lütfen hemen ailenden biriyle, öğretmeninle ya da okulundaki rehber öğretmenle konuş.</b> Kendini güvende hissetmiyorsan ya da acil bir durum varsa <b>112</b>'yi ara.<br><br>Ben bir çalışma koçuyum. Sana bu konuda gerçekten yardım edebilecek olan, seni seven ve yanında olan insanlar.`;
  },
  tekrar(){
    const due = dueItems();
    if (!due.length){ const n = E().items.filter(i => !i.solved).length; return n ? `🔁 Bugün tekrar zamanı gelen soru yok. Havuzunda ${n} soru var, zamanı gelince sana hatırlatırım.` : '🔁 Havuzun boş. Denemede yanlış yaptığın soruları Soru Havuzu\'na ekle, ben de seni doğru zamanda tekrar ettireyim.<br>' + btn('📸 Soru Havuzu', 'go:havuz'); }
    return `🔁 Tekrar zamanı gelen <b>${due.length}</b> soru var. Bunları doğru zamanlarda karşına çıkarıyorum: doğru çözdükçe aralık açılıyor (1 → 2 → 4 → 7 → 15 gün).<br>` + btn('▶ Tekrara başla', 'review');
  },
  sinav(){ const d = daysLeft(), w = Math.floor(d / 7); return `⏳ LGS <b>13 Haziran 2027</b>'de. Sınava <b>${d} gün</b> (${w} hafta) var.<br>Önerim: haftada 1 deneme, günde 2-4 odak seansı ve her gün havuzdan birkaç tekrar. ${w > 20 ? 'Önünde bolca zaman var, düzenli gitmek yeter 🌱' : 'Son düzlüğe yaklaşıyoruz, düzen her şey 💪'}`; },
  hedef(text){
    const n = (norm(text).match(/\d+/) || [])[0];
    if (n && +n <= 90){ K.goal = +n; saveK(); }
    const ex = exams(), L = ex[ex.length - 1];
    if (!K.goal) return '🎯 Hedef netini söyler misin? Örneğin "hedefim 75" yaz, ona göre haftalık hedef çıkarayım.';
    if (!L) return `🎯 Hedefini <b>${K.goal} net</b> olarak kaydettim. İlk denemeni girince ne kadar yol olduğunu hesaplarım.`;
    const gap = K.goal - L.net, wks = Math.max(1, daysLeft() / 7);
    if (gap <= 0) return `🎯 Hedefin ${K.goal} net ve son denemende ${f1(L.net)} yaptın, hedefi geçtin! 🎉 Yeni hedef koymak ister misin?`;
    return `🎯 Hedefin <b>${K.goal} net</b>. Son denemen ${f1(L.net)}, arada <b>${f1(gap)} net</b> var. Kalan ${Math.round(wks)} haftada bu, haftada yaklaşık <b>+${f1(gap / wks)} net</b> demek. ${gap / wks < 1 ? 'Gayet ulaşılabilir! 💪' : 'İddialı ama planlı gidersek olur 🔥'}`;
  },
  soru(text){
    const q = encodeURIComponent(`8. sınıf LGS ${text}`), p = encodeURIComponent(`Ben LGS'ye hazırlanan 8. sınıf öğrencisiyim. ${text}\nBana cevabı hemen söyleme, önce ipucu ver. Türkçe ve kısa cümlelerle anlat.`);
    return `🦉 Bu bir konu sorusu gibi duruyor. Ben konu anlatmıyorum, çünkü yanlış bilgi vermek istemem. Ama seni doğru yere yönlendirebilirim:<br>`
      + `<a class="bk-act" href="https://chatgpt.com/?q=${p}" target="_blank" rel="noopener">🤖 ChatGPT'ye sor</a><a class="bk-act" href="https://www.google.com/search?q=${q}" target="_blank" rel="noopener">🔎 Google'da ara</a>${btn('🆘 Takıldım sayfası', 'go:ask')}`;
  },
  tesekkur(){ return pick(['Rica ederim! 🦉 Hadi bir seans daha?', 'Ne demek, beraber başaracağız 💪', 'Her zaman buradayım! 🌟']); },
  bilmiyorum(){ return `Bunu tam anlayamadım 🤔 Aşağıdakilerden biri mi demek istedin? Seçersen bir dahakine anlarım.`; },
};

// ───────── Arayüz ─────────
const css = `
.bk-fab{position:fixed;right:16px;bottom:118px;z-index:30;border:0;border-radius:999px;padding:8px 16px 8px 8px;display:flex;align-items:center;gap:8px;font:700 15px 'Baloo 2',Nunito,sans-serif;color:#3a2a10;background:linear-gradient(135deg,#ffe7b0,#ffc98a);box-shadow:0 8px 22px rgba(120,80,30,.3);cursor:pointer;transition:.25s}
.bk-fab:hover{transform:translateY(-3px) scale(1.04)}
.bk-fab svg{width:46px;height:46px}
.bk-owl{overflow:visible;animation:bkFloat 3.2s ease-in-out infinite}
.bk-owl .lid{transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0);animation:bkBlink 4.6s infinite}
.bk-owl .lid.r{animation-delay:.04s}
.bk-owl.think{animation:bkThink 1.1s ease-in-out infinite}
.bk-owl.happy{animation:bkHop .7s cubic-bezier(.3,0,.3,1) 2}
@keyframes bkFloat{50%{transform:translateY(-4px) rotate(-2deg)}}
@keyframes bkBlink{0%,90%,100%{transform:scaleY(0)}93%,95%{transform:scaleY(1)}}
@keyframes bkThink{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
@keyframes bkHop{30%{transform:translateY(-12px) scale(.96,1.06)}60%{transform:translateY(0) scale(1.06,.94)}}
.bk-panel{position:fixed;right:16px;bottom:16px;z-index:60;width:min(410px,calc(100vw - 32px));height:min(640px,calc(100vh - 32px));display:flex;flex-direction:column;border-radius:26px;overflow:hidden;background:rgba(255,252,243,.97);border:1px solid var(--stroke);box-shadow:0 20px 50px rgba(50,60,30,.3);transform:translateY(30px) scale(.95);opacity:0;pointer-events:none;transition:.35s cubic-bezier(.3,1.4,.5,1)}
.bk-panel.open{transform:none;opacity:1;pointer-events:auto}
.bk-head{display:flex;align-items:center;gap:10px;padding:10px 14px;background:linear-gradient(135deg,#f6e3c4,#efd2a8);border-bottom:1px solid var(--stroke)}
.bk-head svg{width:62px;height:62px}
.bk-head b{font:700 21px 'Baloo 2',sans-serif;display:block}
.bk-head small{font-weight:700;color:var(--muted)}
.bk-x{margin-left:auto;border:0;background:rgba(255,255,255,.6);border-radius:999px;width:34px;height:34px;font-size:16px;cursor:pointer}
.bk-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
.bk-m{max-width:88%;padding:10px 13px;border-radius:18px;font-size:14.5px;line-height:1.5;font-weight:600;animation:pageIn .35s}
.bk-m.bot{background:#fff;border:1px solid var(--stroke);border-bottom-left-radius:6px;align-self:flex-start}
.bk-m.me{background:linear-gradient(135deg,#d7efc6,#bfe3a5);border-bottom-right-radius:6px;align-self:flex-end}
.bk-m p{margin:8px 0 4px}
.bk-ul{margin:6px 0;padding-left:18px} .bk-ul li{margin:3px 0}
.bk-act{display:inline-block;margin:6px 6px 0 0;border:1px solid var(--stroke);background:#fff6e0;border-radius:999px;padding:6px 12px;font:700 13px Nunito,sans-serif;color:#5a3d10;text-decoration:none;cursor:pointer}
.bk-act:hover{background:#ffe9b8}
.bk-note{display:block;color:var(--muted);font-weight:600;margin-top:6px}
.bk-plan{margin-top:6px}
.bk-task{display:flex;align-items:center;gap:6px;padding:7px 8px;border-radius:12px;background:#fbf6ea;margin:5px 0}
.bk-task label{flex:1;display:flex;gap:6px;align-items:flex-start;cursor:pointer}
.bk-task.done span{text-decoration:line-through;opacity:.6}
.bk-task.gone{display:none}
.bk-tbtn{display:flex;gap:2px}.bk-tbtn .bk-act{margin:0;padding:3px 8px}
.bk-bar{display:inline-block;width:80px;height:8px;border-radius:9px;background:#eee;vertical-align:middle;overflow:hidden}
.bk-bar i{display:block;height:100%;background:linear-gradient(90deg,#e2604f,#f2a541,#6fa35a);background-size:80px 100%}
.bk-chips{display:flex;gap:6px;overflow-x:auto;padding:8px 12px;border-top:1px solid var(--stroke)}
.bk-chips button{flex:none;border:1px solid var(--stroke);background:#fff;border-radius:999px;padding:6px 11px;font:700 12.5px Nunito,sans-serif;cursor:pointer}
.bk-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--stroke)}
.bk-form input{flex:1;border:1px solid var(--stroke);border-radius:999px;padding:10px 14px;font:600 14px Nunito,sans-serif;outline:none;background:#fff}
.bk-form button{border:0;border-radius:999px;padding:0 16px;font-weight:800;background:linear-gradient(135deg,#ffd27a,#f2a541);cursor:pointer}
.bk-dots span{display:inline-block;width:7px;height:7px;margin:0 2px;border-radius:50%;background:#c9b48f;animation:bkDot 1s infinite}
.bk-dots span:nth-child(2){animation-delay:.15s}.bk-dots span:nth-child(3){animation-delay:.3s}
@keyframes bkDot{50%{transform:translateY(-5px);opacity:.5}}
.bk-card img{max-width:100%;border-radius:12px;margin-top:6px;display:block}
@media (max-width:600px){.bk-fab span{display:none}.bk-fab{padding:6px}}
`;
document.head.insertAdjacentHTML('beforeend', '<style>' + css + '</style>');
const owl = (cls = '') => `<svg class="bk-owl ${cls}" viewBox="0 0 512 512"><image href="${OWL}" width="512" height="512"/>
  <g class="lid"><ellipse cx="216" cy="189" rx="60" ry="58" fill="#fbe8c8"/><path d="M158 191 Q216 252 274 191" fill="none" stroke="#2c1f24" stroke-width="9" stroke-linecap="round"/></g>
  <g class="lid r"><ellipse cx="354" cy="190" rx="54" ry="56" fill="#fbe8c8"/><path d="M302 192 Q354 248 406 192" fill="none" stroke="#2c1f24" stroke-width="9" stroke-linecap="round"/></g></svg>`;
document.body.insertAdjacentHTML('beforeend', `
<button class="bk-fab" id="bkFab" title="Bilkuş'a sor">${owl()}<span>Bilkuş'a sor</span></button>
<div class="bk-panel" id="bkPanel">
  <div class="bk-head"><span id="bkOwl">${owl()}</span><div><b>Bilkuş</b><small>Çalışma koçun · senin verilerinden öğrenir</small></div><button class="bk-x" id="bkX">✕</button></div>
  <div class="bk-msgs" id="bkMsgs"></div>
  <div class="bk-chips" id="bkChips"></div>
  <form class="bk-form" id="bkForm"><input id="bkIn" placeholder="Bilkuş'a yaz… (ör. bugün ne çalışayım?)" autocomplete="off"><button>➤</button></form>
</div>`);
const CHIPS = [['plan','📅 Bugün ne çalışayım?'], ['deneme','📊 Son denemem'], ['zayif','🎯 Zayıf konularım'], ['tekrar','🔁 Tekrar zamanı'], ['durum','🧭 Nasıl gidiyorum?'], ['dikkat','😵 Dikkatsizlik'], ['sure','⏱️ Süre yetmiyor'], ['motiv','💪 Motivasyon'], ['hedef','🎯 Hedefim'], ['sinav','⏳ Kaç gün kaldı?']];
$('bkChips').innerHTML = CHIPS.map(([k, t]) => `<button data-k="${k}">${t}</button>`).join('');
const owlEl = () => $('bkOwl').querySelector('svg');
function add(html, who = 'bot'){
  const d = document.createElement('div'); d.className = 'bk-m ' + who; d.innerHTML = html; $('bkMsgs').appendChild(d);
  $('bkMsgs').scrollTop = $('bkMsgs').scrollHeight; bind(d); return d;
}
function reply(key, text = ''){
  const o = owlEl(); o.classList.add('think');
  const t = add('<span class="bk-dots"><span></span><span></span><span></span></span>');
  setTimeout(() => {
    o.classList.remove('think'); o.classList.add('happy'); setTimeout(() => o.classList.remove('happy'), 1500);
    t.innerHTML = (R[key] || R.bilmiyorum)(text); bind(t); $('bkMsgs').scrollTop = $('bkMsgs').scrollHeight;
  }, 450 + Math.random() * 400);
}
function goTab(p){ const t = document.querySelector(`.tab[data-p="${p}"]`); if (t) t.click(); if (innerWidth < 700) close(); }
let rq = [];
function nextReview(){
  const it = rq.shift();
  if (!it){ add('🎉 Bugünkü tekrarlar bitti! Doğru çözdüklerin daha geç, yapamadıkların yarın tekrar gelecek.'); return; }
  const s = sj(it.s), d = add(`<div class="bk-card">🔁 <b>${s.e} ${esc(it.t || s.n)}</b>${it.note ? `<br><small>Notun: ${esc(it.note)}</small>` : ''}<div class="bk-img">${it.img ? '⏳ fotoğraf yükleniyor…' : '<small>(fotoğraf yok, havuzdaki kayda bakarak çöz)</small>'}</div>
    <div>Bu soruyu şimdi yeniden çöz. Nasıl gitti?</div>${it.a ? `<details><summary style="cursor:pointer;font-weight:800">👀 Cevabı göster</summary>Doğru cevap: <b>${it.a}</b></details>` : ''}${btn('✅ Doğru çözdüm', 'rv:1:' + it.id)}${btn('❌ Yine yapamadım', 'rv:0:' + it.id)}</div>`);
  if (it.img) loadImg(it.id).then(src => { const b = d.querySelector('.bk-img'); b.innerHTML = src ? `<img src="${src}" alt="">` : '<small>Fotoğraf bu cihazda yok, Soru Havuzu sekmesinde açınca gelir.</small>'; });
}
function loadImg(id){
  return new Promise(res => { try{ const r = indexedDB.open('lgsFoto', 1); r.onupgradeneeded = () => r.result.createObjectStore('img');
    r.onsuccess = () => { try{ const q = r.result.transaction('img').objectStore('img').get(id); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); }catch(_){ res(null); } }; r.onerror = () => res(null); }catch(_){ res(null); } });
}
function bind(root){
  root.querySelectorAll('[data-act]').forEach(b => b.onclick = e => {
    e.preventDefault(); const a = b.dataset.act;
    if (a === 'go:srs'){ rq = dueItems().slice(0, 5); nextReview(); } else if (a.startsWith('go:')) goTab(a.slice(3));
    else if (a.startsWith('say:')) reply(a.slice(4));
    else if (a.startsWith('skip:')){ const t = K.plan?.tasks.find(x => x.id == a.slice(5)); if (t){ t.x = true; K.w[t.type] = Math.max(.4, W(t.type) - .15); saveK(); b.closest('.bk-task').classList.add('gone'); } }
    else if (a === 'review'){ rq = dueItems().slice(0, 5); nextReview(); }
    else if (a.startsWith('rv:')){ const [, ok, id] = a.split(':'); const r = review(id, ok === '1');
      b.parentElement.querySelectorAll('[data-act^="rv:"]').forEach(x => x.remove());
      b.parentElement.insertAdjacentHTML('beforeend', `<div><small>${ok === '1' ? `👏 Süper! ${BOX[r.b]} gün sonra tekrar soracağım.${r.b === 4 ? ' Artık öğrenmiş görünüyorsun, havuzda ✅ Çözdüm diyebilirsin.' : ''}` : '💪 Sorun değil, yarın tekrar karşına çıkaracağım.'}</small></div>`);
      nextReview(); }
  });
  root.querySelectorAll('.bk-task input').forEach(cb => cb.onchange = () => {
    const id = cb.closest('.bk-task').dataset.id, t = K.plan?.tasks.find(x => x.id == id); if (!t) return;
    t.done = cb.checked; if (cb.checked) K.w[t.type] = Math.min(1.6, W(t.type) + .05);
    cb.closest('.bk-task').classList.toggle('done', cb.checked); saveK();
    if (K.plan.tasks.filter(x => !x.x).every(x => x.done)){ add('🎉 Bugünün planını bitirdin! Harikasın. Yarın sana biraz daha iddialı bir plan hazırlayacağım 🦉'); }
  });
}
window.addEventListener('lgs-review', e => { if (e.detail && e.detail.id) review(e.detail.id, !!e.detail.ok); });
let opened = false;
const open = () => { $('bkPanel').classList.add('open'); $('bkFab').style.display = 'none'; if (!opened){ opened = true; reply('selam'); } setTimeout(() => $('bkIn').focus(), 300); };
const close = () => { $('bkPanel').classList.remove('open'); $('bkFab').style.display = ''; };
$('bkFab').onclick = open; $('bkX').onclick = close;
$('bkChips').querySelectorAll('button').forEach(b => b.onclick = () => { learn(b.dataset.k); add(esc(b.textContent), 'me'); reply(b.dataset.k); });
$('bkForm').onsubmit = e => {
  e.preventDefault(); const v = $('bkIn').value.trim(); if (!v) return; $('bkIn').value = '';
  add(esc(v), 'me'); const k = intent(v);
  if (!k){ pending = {st:stems(v), t:Date.now()}; reply('bilmiyorum'); return; }
  pending = null; reply(k, v);
};
})();
