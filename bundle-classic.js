
document.addEventListener('DOMContentLoaded', () => {

  // === i18n engine ===
  const T = {
    id: {
      'menu.review': 'Review Generator',
      'menu.food': 'Foto Makanan Profesional',
      'nav.product-review': 'Review Produk',
      'nav.skincare-review': 'Review Skincare',
      'nav.fashion': 'Review Fashion',
      'nav.unboxing': 'Unboxing Scene',
      'nav.product-ads': 'Story Iklan',
      'nav.food-review': 'Review Makanan',
      'nav.tutorial': 'Tutorial Pakai',
      'nav.daily': 'Day in My Life',
      'nav.testi': 'Testimoni',
      'nav.grwm': 'GRWM',
    },
    en: {
      'menu.review': 'Review Generator',
      'menu.food': 'Professional Food Photo',
      'nav.product-review': 'Product Review',
      'nav.skincare-review': 'Skincare Review',
      'nav.fashion': 'Fashion Review',
      'nav.unboxing': 'Unboxing Scene',
      'nav.product-ads': 'Ad Story',
      'nav.food-review': 'Food Review',
      'nav.tutorial': 'Usage Tutorial',
      'nav.daily': 'Day in My Life',
      'nav.testi': 'Testimonial',
      'nav.grwm': 'GRWM',
    },
  };
  function getLang() { return localStorage.getItem('app_language') || 'id'; }
  function applyLanguage() {
    const lang = getLang();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (T[lang] && T[lang][key]) el.textContent = T[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (T[lang] && T[lang][key]) el.setAttribute('placeholder', T[lang][key]);
    });
  }
  window.__applyLanguage = applyLanguage;

  // === Tab switching ===
  function switchTab(tabId) {
    document.querySelectorAll('.main-content-panel').forEach(p => p.classList.add('hidden'));
    const panel = document.getElementById('content-' + tabId);
    if (panel) panel.classList.remove('hidden');
    document.querySelectorAll('.main-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(b => b.classList.add('active'));
    closeDrawer();
    window.scrollTo(0, 0);
  }
  window.__switchTab = switchTab;
  document.querySelectorAll('.main-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  // === Sidebar show/hide (toggle desktop + drawer mobile) ===
  const backdropEl = document.getElementById('sidebar-backdrop');
  const menuToggle = document.getElementById('menu-toggle');
  const navShow = document.getElementById('nav-show');
  const navHide = document.getElementById('nav-hide');
  function openNav() { document.body.classList.add('nav-open'); }
  function closeNav() { document.body.classList.remove('nav-open'); }
  function closeDrawer() { if (window.innerWidth < 1024) closeNav(); } // dipakai switchTab: tutup hanya di mobile
  if (menuToggle) menuToggle.addEventListener('click', openNav);
  if (navShow) navShow.addEventListener('click', openNav);
  if (navHide) navHide.addEventListener('click', closeNav);
  if (backdropEl) backdropEl.addEventListener('click', closeNav);
  if (window.innerWidth >= 1024) document.body.classList.add('nav-open'); // default: desktop terbuka, mobile tertutup

  // === Helper HTML-escape (anti-XSS saat inject innerHTML) ===
  window.escHtml = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  };

  // === Helper copy (execCommand — jalan di iframe Canvas yang blokir Clipboard API) ===
  window.copyText = function (text) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.top = '-1000px'; ta.style.left = '0'; ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus(); ta.select(); ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { console.error('copy gagal', e); return false; }
  };

  // === Helper download global ===
  window.downloadDataURINew = function (dataURI, filename) {
    const a = document.createElement('a');
    a.href = dataURI; a.download = filename || 'storyboard.png';
    document.body.appendChild(a); a.click(); a.remove();
  };

  // === Helper kompres gambar (return {base64, mimeType, dataUrl}) ===
  window.compressImage = function (file, maxDim = 1280, quality = 0.85) {
    return new Promise((resolve, reject) => {
      const process = (blob) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > height && width > maxDim) { height = height * maxDim / width; width = maxDim; }
          else if (height > maxDim) { width = width * maxDim / height; height = maxDim; }
          const canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve({ base64: dataUrl.split(',')[1], mimeType: 'image/jpeg', dataUrl });
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(blob);
      };
      if (file.type === 'image/heic' || /\.heic$/i.test(file.name)) {
        window.heic2any({ blob: file, toType: 'image/jpeg', quality })
          .then(process).catch(reject);
      } else { process(file); }
    });
  };

  // === IIFE fitur ditambahkan di task-task berikut, DI SINI ===

  const AUDIO_DIRECTIONS = {
    ugc: 'AUDIO: The on-screen presenter looks into the camera and speaks ONE short, natural review line (lip-synced) as part of a continuous testimonial script across scenes. Tone: casual, friendly, convincing. Add light ambient room tone.',
    ugc_music: 'AUDIO: The on-screen presenter looks into the camera and speaks ONE short, natural review line (lip-synced) as part of a continuous testimonial script across scenes. Tone: casual, friendly, convincing. Layer an upbeat, catchy background music track underneath the voice, mixed low so the speech stays clear and out front.',
    voiceover: 'AUDIO: A professional off-screen voiceover narrator sells the product; the on-screen subject stays silent (visual talent only). The narration flows seamlessly from the previous scene into the next as one continuous script. Add subtle background music.',
    asmr: 'AUDIO: No human speech. Emphasize crisp product/ASMR sound effects relevant to the scene (food sizzle, unboxing crinkle, liquid/texture sounds) layered over soft, gentle music.',
    cinematic: 'AUDIO: No narration or dialogue. Mood-driven cinematic background music that drives the pacing, with thin ambient sound effects only.'
  };
  const LANG_LABEL = { id: 'Indonesian', en: 'English' };

  // === DURATION ENGINE ===
  // Mode Durasi Video: 1 foto ≈ 2 detik video. Satu klip = satu generate di platform image-to-video.
  window.VIDEO_PLATFORMS = {
    omni:     { label: 'Gemini Omni', perClip: 5, clipSec: 10 },
    seedance: { label: 'Seedance',    perClip: 7, clipSec: 14 }
  };
  window.clipPlan = function (platformKey, durationSec) {
    const pf = window.VIDEO_PLATFORMS[platformKey];
    const clips = Math.max(1, Math.round(durationSec / pf.clipSec));
    return { clips, photos: clips * pf.perClip, perClip: pf.perClip, clipSec: pf.clipSec };
  };
  window.durationOptions = function (platformKey, maxSec = 60) {
    const pf = window.VIDEO_PLATFORMS[platformKey];
    const out = [];
    for (let s = pf.clipSec; s <= maxSec; s += pf.clipSec) out.push(s);
    return out;
  };
  // === END DURATION ENGINE ===

  // === MODEL LIBRARY ===
  // Pustaka model AI (menu AI Influencer): prompt murni + util konversi + wrapper IndexedDB.
  window.buildModelPrompt = function (c) {
    c = c || {};
    const age = { remaja: 'late-teenage', '20an': 'mid-20s', '30an': 'mid-30s', '40plus': 'mid-40s' }[c.usia] || 'mid-20s';
    const look = { indonesia: 'Indonesian', asia: 'East Asian', barat: 'Western Caucasian' }[c.look] || 'Indonesian';
    const person = c.gender === 'pria' ? 'man' : 'woman';
    const veil = (c.gender !== 'pria' && c.hijab === 'hijab') ? ', wearing a neat modern hijab' : '';
    return `Photorealistic half-body studio portrait photo of a ${age} ${look} ${person}${veil}, facing the camera with a natural friendly smile, plain light neutral studio background, soft diffused lighting, sharp focus on the face, natural skin texture, high detail, suitable as a model reference photo. No text, no watermark.`;
  };
  window.b64ToBlob = function (b64, mime) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  };
  window.blobToB64 = function (blob) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result).split(',')[1]);
      r.onerror = rej;
      r.readAsDataURL(blob);
    });
  };
  window.modelDB = {
    _open() {
      return new Promise((res, rej) => {
        const rq = indexedDB.open('ssp_models', 1);
        rq.onupgradeneeded = () => rq.result.createObjectStore('models', { keyPath: 'id' });
        rq.onsuccess = () => res(rq.result);
        rq.onerror = () => rej(rq.error);
      });
    },
    async put(rec) {
      const db = await this._open();
      return new Promise((res, rej) => {
        const tx = db.transaction('models', 'readwrite');
        tx.objectStore('models').put(rec);
        tx.oncomplete = () => { document.dispatchEvent(new CustomEvent('ssp-models-changed')); res(); };
        tx.onerror = () => rej(tx.error);
      });
    },
    async list() {
      const db = await this._open();
      return new Promise((res, rej) => {
        const rq = db.transaction('models', 'readonly').objectStore('models').getAll();
        rq.onsuccess = () => res((rq.result || []).sort((a, b) => b.id.localeCompare(a.id)));
        rq.onerror = () => rej(rq.error);
      });
    },
    async remove(id) {
      const db = await this._open();
      return new Promise((res, rej) => {
        const tx = db.transaction('models', 'readwrite');
        tx.objectStore('models').delete(id);
        tx.oncomplete = () => { document.dispatchEvent(new CustomEvent('ssp-models-changed')); res(); };
        tx.onerror = () => rej(tx.error);
      });
    }
  };
  // === END MODEL LIBRARY ===

  // === UI DIALOGS ===
  // Pengganti dialog native alert/confirm — diblokir diam-diam oleh sandbox iframe Canvas
  // (tanpa allow-modals, confirm langsung return false tanpa tampil).
  function buildUiDialog(pesan, buttonsHtml) {
    const modal = document.createElement('div');
    modal.className = 'image-preview-modal';
    modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-sm w-full" onclick="event.stopPropagation()">
      <p class="text-sm text-gray-700 mb-5 leading-relaxed" data-msg></p>
      <div class="flex gap-2 justify-end" data-btns></div>
    </div>`;
    modal.querySelector('[data-msg]').textContent = pesan;
    modal.querySelector('[data-btns]').innerHTML = buttonsHtml;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
    return { modal, close };
  }
  window.uiNotify = function (pesan) {
    return new Promise((res) => {
      const { modal, close } = buildUiDialog(pesan,
        '<button type="button" data-ok class="btn-primary font-semibold py-2 px-5 rounded-lg text-sm">OK</button>');
      const done = () => { close(); res(); };
      modal.querySelector('[data-ok]').addEventListener('click', done);
      modal.addEventListener('click', (e) => { if (e.target === modal) done(); });
    });
  };
  window.uiConfirm = function (pesan, labelYa) {
    return new Promise((res) => {
      const { modal, close } = buildUiDialog(pesan,
        '<button type="button" data-no class="btn-secondary font-semibold py-2 px-5 rounded-lg text-sm">Batal</button>' +
        `<button type="button" data-yes class="font-semibold py-2 px-5 rounded-lg text-sm" style="background:#dc2626;color:#fff;">${labelYa || 'Hapus'}</button>`);
      const done = (v) => { close(); res(v); };
      modal.querySelector('[data-yes]').addEventListener('click', () => done(true));
      modal.querySelector('[data-no]').addEventListener('click', () => done(false));
      modal.addEventListener('click', (e) => { if (e.target === modal) done(false); });
    });
  };
  // === END UI DIALOGS ===

  // === INFLUENCER STUDIO ===
  (function initInfluencerStudio() {
    const genBtn = document.getElementById('influencer-generate-btn');
    if (!genBtn) return;
    const apiKey = "";
    const resultBox = document.getElementById('influencer-result-box');
    const saveRow = document.getElementById('influencer-save-row');
    const regenBtn = document.getElementById('influencer-regen-btn');
    const nameInput = document.getElementById('influencer-save-name');
    const saveBtn = document.getElementById('influencer-save-btn');
    const libGrid = document.getElementById('influencer-library-grid');
    const libCount = document.getElementById('influencer-lib-count');
    const hijabGroup = document.getElementById('influencer-hijab-group');
    let currentB64 = null;
    let currentMime = 'image/png';
    let currentSource = 'generate';

    function influencerPick(gridId) {
      const grid = document.getElementById(gridId);
      grid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-val]'); if (!btn) return;
        grid.querySelectorAll('.theme-chip').forEach(x => x.classList.remove('selected'));
        btn.classList.add('selected');
        if (gridId === 'influencer-gender-options') hijabGroup.classList.toggle('hidden', btn.dataset.val === 'pria');
      });
    }
    ['influencer-gender-options', 'influencer-age-options', 'influencer-look-options', 'influencer-hijab-options'].forEach(influencerPick);

    function pickedVal(gridId) { return document.querySelector(`#${gridId} .theme-chip.selected`)?.dataset.val || ''; }
    function currentCfg() {
      return {
        gender: pickedVal('influencer-gender-options'),
        usia: pickedVal('influencer-age-options'),
        look: pickedVal('influencer-look-options'),
        hijab: pickedVal('influencer-hijab-options')
      };
    }

    async function generateModel() {
      genBtn.disabled = true; regenBtn.disabled = true;
      resultBox.innerHTML = '<div class="loader"></div>';
      const prompt = window.buildModelPrompt(currentCfg());
      const retries = 3; let lastError = null;
      for (let i = 0; i < retries; i++) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
          const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '3:4' } },
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
          };
          const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          const result = await res.json();
          const b64 = result?.candidates?.[0]?.content?.parts?.find(x => x.inlineData)?.inlineData?.data;
          if (!b64) throw new Error('No image data received');
          currentB64 = b64; currentMime = 'image/png'; currentSource = 'generate';
          resultBox.innerHTML = `<img src="data:image/png;base64,${b64}" class="rounded-xl max-h-[420px] w-auto mx-auto" alt="Model AI">`;
          saveRow.classList.remove('hidden');
          genBtn.disabled = false; regenBtn.disabled = false;
          return;
        } catch (err) {
          lastError = err; console.error(`Influencer attempt ${i + 1} failed:`, err);
          if (i < retries - 1) await new Promise(rz => setTimeout(rz, 1000 * Math.pow(2, i)));
        }
      }
      if (lastError) resultBox.innerHTML = '<p class="text-sm text-red-500 p-4">Gagal membuat model — coba lagi.</p>';
      genBtn.disabled = false; regenBtn.disabled = false;
    }
    genBtn.addEventListener('click', generateModel);
    regenBtn.addEventListener('click', generateModel);

    const uploadBtn = document.getElementById('influencer-upload-btn');
    const uploadInput = document.getElementById('influencer-upload-input');
    uploadBtn.addEventListener('click', () => uploadInput.click());
    uploadInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      e.target.value = null;
      if (!file) return;
      try {
        const { base64, mimeType, dataUrl } = await window.compressImage(file);
        currentB64 = base64; currentMime = mimeType; currentSource = 'upload';
        resultBox.innerHTML = `<img src="${dataUrl}" class="rounded-xl max-h-[420px] w-auto mx-auto" alt="Foto model upload">`;
        saveRow.classList.remove('hidden');
      } catch (err) {
        console.error('upload model failed:', err);
        window.uiNotify('File tidak bisa dibaca — pastikan itu file gambar (JPG/PNG/HEIC).');
      }
    });

    saveBtn.addEventListener('click', async () => {
      const name = nameInput.value.trim();
      if (!name) { window.uiNotify('Kasih nama modelnya dulu ya.'); nameInput.focus(); return; }
      if (!currentB64) return;
      let existing = [];
      try { existing = await window.modelDB.list(); } catch (err) {}
      if (existing.length >= 5) { window.uiNotify('Pustaka penuh (maksimal 5 model). Hapus salah satu dulu ya.'); return; }
      const rec = { id: String(Date.now()), name, mime: currentMime, cfg: currentSource === 'upload' ? { source: 'upload' } : currentCfg(), createdAt: new Date().toISOString() };
      let cloudOk = false;
      try { if (window.modelCloud) cloudOk = await window.modelCloud.upload(Object.assign({}, rec, { base64: currentB64 })); }
      catch (err) { console.error('cloud upload failed:', err); }
      try {
        await window.modelDB.put(Object.assign({}, rec, { blob: window.b64ToBlob(currentB64, currentMime), cloud: cloudOk }));
        nameInput.value = '';
        renderLibrary();
      } catch (err) {
        console.error('modelDB put failed:', err);
        window.uiNotify('Penyimpanan browser tidak tersedia (mode private/incognito?). Model tidak tersimpan — kamu tetap bisa klik kanan foto untuk menyimpannya manual.');
      }
    });

    async function renderLibrary() {
      let list = [];
      try { list = await window.modelDB.list(); }
      catch (err) { console.error('modelDB list failed:', err); libGrid.innerHTML = '<p class="text-sm text-gray-400 col-span-full">Penyimpanan browser tidak tersedia di sesi ini.</p>'; return; }
      libCount.textContent = `${list.length}/5 model`;
      if (!list.length) { libGrid.innerHTML = '<p class="text-sm text-gray-400 col-span-full">Belum ada model — racik di atas lalu Simpan.</p>'; return; }
      libGrid.innerHTML = '';
      list.forEach(m => {
        const objUrl = URL.createObjectURL(m.blob);
        const card = document.createElement('div');
        card.className = 'rounded-xl border-2 border-gray-100 overflow-hidden bg-white';
        card.innerHTML = `<img src="${objUrl}" class="w-full aspect-[3/4] object-cover" alt="${window.escHtml(m.name)}">
          <div class="p-2">
            <p class="text-sm font-semibold text-gray-800 truncate">${window.escHtml(m.name)}</p>
            <p class="text-[11px] text-gray-400">${new Date(m.createdAt).toLocaleDateString('id-ID')}</p>
            <div class="flex gap-1 mt-2">
              <a href="${objUrl}" download="model_${m.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png" class="flex-1 btn-secondary text-xs font-semibold py-1.5 rounded-lg text-center"><i class="fas fa-download pointer-events-none"></i></a>
              <button type="button" data-del="${m.id}" class="flex-1 text-xs font-semibold py-1.5 rounded-lg" style="color:#dc2626;border:1px solid rgba(220,38,38,.3);"><i class="fas fa-trash pointer-events-none"></i></button>
            </div>
          </div>`;
        card.querySelector('[data-del]').addEventListener('click', async (e) => {
          const delBtn = e.currentTarget;
          if (!(await window.uiConfirm(`Hapus model "${m.name}"?`))) return;
          delBtn.disabled = true;
          if (m.cloud === true && window.modelCloud) {
            const ok = await window.modelCloud.del(m.id);
            if (!ok) {
              delBtn.disabled = false;
              window.uiNotify('Gagal menghapus di server — cek koneksi lalu coba lagi.');
              return;
            }
          }
          try { await window.modelDB.remove(m.id); renderLibrary(); }
          catch (err) { console.error(err); delBtn.disabled = false; }
        });
        libGrid.appendChild(card);
      });
    }
    renderLibrary();
    document.addEventListener('ssp-models-changed', renderLibrary);
  })();
  // === END INFLUENCER STUDIO ===

  // === FACTORY: satu tab review = satu pemanggilan createReviewTab(cfg) ===
  function createReviewTab(cfg) {
    const p = cfg.prefix;
    const apiKey = "";
    const imageInput = document.getElementById(`${p}-image-input`);
    if (!imageInput) return;
    const uploadArea = document.getElementById(`${p}-image-upload-area`);
    const previewContainer = document.getElementById(`${p}-image-preview-container`);
    const modelInput = document.getElementById(`${p}-model-image-input`);
    const hasModel = !!modelInput;
    const modelUploadArea = hasModel ? document.getElementById(`${p}-model-image-upload-area`) : null;
    const modelPreviewContainer = hasModel ? document.getElementById(`${p}-model-image-preview-container`) : null;
    const modelPreview = hasModel ? document.getElementById(`${p}-model-image-preview`) : null;
    const modelRemoveBtn = hasModel ? document.getElementById(`${p}-remove-model-image-btn`) : null;
    const descInput = document.getElementById(`${p}-product-desc-input`);
    const descBtn = document.getElementById(`${p}-generate-desc-btn`);
    const themeInput = document.getElementById(`${p}-photo-theme-input`);
    const themeGrid = document.getElementById(`${p}-theme-options`);
    const customThemeContainer = document.getElementById(`${p}-custom-theme-container`);
    let selectedTheme = '';
    if (themeGrid) {
      themeGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-theme]'); if (!btn) return;
        themeGrid.querySelectorAll('.theme-chip').forEach(x => x.classList.remove('selected'));
        btn.classList.add('selected');
        selectedTheme = btn.dataset.theme;
        if (customThemeContainer) customThemeContainer.classList.toggle('hidden', selectedTheme !== 'custom');
      });
    }
    const generateBtn = document.getElementById(`${p}-generate-btn`);
    const grid = document.getElementById(`${p}-b-roll-grid`);
    const downloadAllBtn = document.getElementById(`${p}-download-all-btn`);
    const countGrid = document.getElementById(`${p}-count-selection-grid`);

    // Tombol "Semua Prompt Video" di samping Unduh Semua (dibuat dinamis)
    // Gaya audio + bahasa untuk prompt video (global per fitur)
    let audioStyle = 'voiceover';
    let audioLang = 'id';
    let videoAllBtn = null, audioStyleSel = null, audioLangBtn = null;
    if (downloadAllBtn && downloadAllBtn.parentNode) {
      const wrap = document.createElement('div');
      wrap.className = 'flex items-center gap-2';
      downloadAllBtn.parentNode.insertBefore(wrap, downloadAllBtn);
      videoAllBtn = document.createElement('button');
      videoAllBtn.type = 'button';
      videoAllBtn.className = 'btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden';
      videoAllBtn.innerHTML = '<i class="fas fa-film mr-1"></i>Semua Prompt Video';
      videoAllBtn.addEventListener('click', () => {
        if (!durState.on) { generateAllVideoPrompts(); return; }
        const plan = window.clipPlan(durState.platform, durState.duration);
        const n = grid.querySelectorAll('.result-card').length;
        showChoiceModal('Prompt video bentuk apa?', [
          { label: `<i class="fas fa-image mr-2"></i>Per Scene — ${n} prompt (1 foto = 1 generate video)`, onPick: generateAllVideoPrompts },
          { label: `<i class="fas fa-clapperboard mr-2"></i>Per Klip — ${Math.ceil(n / plan.perClip)} prompt (${plan.perClip} foto = 1 klip ${plan.clipSec} dtk)`, onPick: generateAllClipPrompts }
        ]);
      });

      audioStyleSel = document.createElement('select');
      audioStyleSel.id = `${p}-audio-style`;
      audioStyleSel.className = 'btn-secondary text-sm font-semibold py-2 px-3 rounded-lg hidden';
      audioStyleSel.innerHTML = '<option value="ugc">🎤 Model bicara (UGC)</option><option value="ugc_music">🎤🎶 Model bicara + musik</option><option value="voiceover">🗣️ Voiceover narasi</option><option value="asmr">🔊 ASMR + musik</option><option value="cinematic">🎬 Sinematik musik</option>';
      audioStyleSel.value = audioStyle;
      audioStyleSel.addEventListener('change', () => { audioStyle = audioStyleSel.value; });

      audioLangBtn = document.createElement('button');
      audioLangBtn.type = 'button';
      audioLangBtn.id = `${p}-audio-lang`;
      audioLangBtn.className = 'btn-secondary text-sm font-semibold py-2 px-3 rounded-lg hidden';
      const renderLang = () => { audioLangBtn.innerHTML = `<i class="fas fa-language mr-1"></i>${audioLang.toUpperCase()}`; };
      renderLang();
      audioLangBtn.addEventListener('click', () => { audioLang = audioLang === 'id' ? 'en' : 'id'; renderLang(); });

      wrap.appendChild(audioStyleSel);
      wrap.appendChild(audioLangBtn);
      wrap.appendChild(videoAllBtn);
      wrap.appendChild(downloadAllBtn);
    }

    let selectedCount = 4;
    let images = [];
    let modelBase64 = null, modelMime = null;

    function ratio() { return document.querySelector(`#${p}-ratio-selection .ratio-btn.selected`)?.dataset.ratio || '16:9'; }
    function aspectClass(r) { return r === '1:1' ? 'aspect-square' : r === '3:4' ? 'aspect-[3/4]' : r === '9:16' ? 'aspect-[9/16]' : 'aspect-video'; }
    function updateBtn() {
      generateBtn.disabled = images.length === 0 || !descInput.value.trim();
      descBtn.disabled = images.length === 0;
    }

    document.querySelectorAll(`#${p}-ratio-selection .ratio-btn`).forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll(`#${p}-ratio-selection .ratio-btn`).forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
    }));
    countGrid.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-count]'); if (!b) return;
      countGrid.querySelectorAll('button').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected'); selectedCount = parseInt(b.dataset.count, 10);
    });

    // === Mode Durasi Video: toggle + platform + durasi (spec 2026-08-03-durasi-story) ===
    const durState = { on: true, platform: 'omni', duration: 10 };
    const modeWrap = document.createElement('div');
    modeWrap.className = 'flex gap-2 mb-3';
    modeWrap.innerHTML = `<button type="button" data-mode="duration" class="theme-chip selected"><i class="fas fa-film mr-1"></i>Durasi Video</button><button type="button" data-mode="count" class="theme-chip"><i class="fas fa-images mr-1"></i>Jumlah Foto</button>`;
    const durPanel = document.createElement('div');
    durPanel.id = `${p}-duration-panel`;
    countGrid.parentNode.insertBefore(modeWrap, countGrid);
    countGrid.parentNode.insertBefore(durPanel, countGrid);
    countGrid.classList.add('hidden');

    function renderDurPanel() {
      const opts = window.durationOptions(durState.platform);
      if (!opts.includes(durState.duration)) durState.duration = opts[0];
      const plan = window.clipPlan(durState.platform, durState.duration);
      durPanel.innerHTML = `
        <div class="text-xs font-semibold text-gray-500 mb-1">Platform video</div>
        <div class="flex flex-wrap gap-2 mb-3">${Object.entries(window.VIDEO_PLATFORMS).map(([k, v]) => `<button type="button" data-platform="${k}" class="theme-chip ${k === durState.platform ? 'selected' : ''}">${v.label} — ${v.clipSec} dtk/klip</button>`).join('')}</div>
        <div class="text-xs font-semibold text-gray-500 mb-1">Durasi story</div>
        <div class="flex flex-wrap gap-2 mb-3">${opts.map(s => `<button type="button" data-duration="${s}" class="theme-chip ${s === durState.duration ? 'selected' : ''}">${s} dtk</button>`).join('')}</div>
        <p class="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-lg p-2" data-clip-info><i class="fas fa-info-circle mr-1"></i>= ${plan.photos} foto · ${plan.clips} klip × ${plan.perClip} foto (${plan.clipSec} dtk/klip)</p>`;
    }
    renderDurPanel();
    durPanel.addEventListener('click', (e) => {
      const pb = e.target.closest('[data-platform]');
      const db = e.target.closest('[data-duration]');
      if (pb) durState.platform = pb.dataset.platform;
      else if (db) durState.duration = parseInt(db.dataset.duration, 10);
      else return;
      renderDurPanel();
    });
    modeWrap.addEventListener('click', (e) => {
      const mb = e.target.closest('[data-mode]'); if (!mb) return;
      durState.on = mb.dataset.mode === 'duration';
      modeWrap.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('selected', x === mb));
      durPanel.classList.toggle('hidden', !durState.on);
      countGrid.classList.toggle('hidden', durState.on);
    });
    function effectiveCount() { return durState.on ? window.clipPlan(durState.platform, durState.duration).photos : selectedCount; }
    function retryPlaceholder(id) {
      return `<div class="text-center p-3"><p class="text-xs text-red-500 mb-2">Scene gagal dibuat</p><button data-action="${p}-regenerate" data-scene-id="${id}" class="action-btn bg-fuchsia-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>Coba Lagi</button></div>`;
    }
    function showChoiceModal(title, choices) {
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-4"><h3 class="text-base font-bold text-gray-800">${title}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <div class="space-y-2" data-choices></div>
      </div>`;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      const wrap = modal.querySelector('[data-choices]');
      choices.forEach(c => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'w-full btn-secondary py-2.5 px-4 rounded-lg font-semibold text-sm text-left';
        b.innerHTML = c.label;
        b.addEventListener('click', () => { close(); c.onPick(); });
        wrap.appendChild(b);
      });
      modal.querySelector('[data-close]').addEventListener('click', close);
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
    }

    imageInput.addEventListener('change', (e) => { handleFiles(e.target.files); e.target.value = null; });
    function handleFiles(files) {
      if (!files.length) return;
      uploadArea.classList.add('hidden');
      previewContainer.classList.remove('hidden');
      Array.from(files).forEach(file => {
        window.compressImage(file).then(({ base64, mimeType, dataUrl }) => {
          const id = Date.now() + Math.random();
          images.push({ base64, mimeType, id });
          const wrap = document.createElement('div');
          wrap.className = 'relative group';
          wrap.innerHTML = `<img src="${dataUrl}" class="rounded-lg w-full h-24 object-cover"><button class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"><i class="fas fa-times text-xs pointer-events-none"></i></button>`;
          previewContainer.appendChild(wrap);
          wrap.querySelector('button').addEventListener('click', () => {
            images = images.filter(x => x.id !== id);
            wrap.remove();
            if (!images.length) { uploadArea.classList.remove('hidden'); previewContainer.classList.add('hidden'); }
            updateBtn();
          });
          updateBtn();
        }).catch(err => console.error('compress error', err));
      });
    }

    if (hasModel) {
      modelInput.addEventListener('change', (e) => {
        const file = e.target.files[0]; if (!file) return;
        window.compressImage(file).then(({ base64, mimeType, dataUrl }) => {
          modelBase64 = base64; modelMime = mimeType; modelPreview.src = dataUrl;
          modelUploadArea.classList.add('hidden'); modelPreviewContainer.classList.remove('hidden');
        });
      });
      modelRemoveBtn.addEventListener('click', () => {
        modelBase64 = null; modelMime = null; modelInput.value = '';
        modelUploadArea.classList.remove('hidden'); modelPreviewContainer.classList.add('hidden');
      });

      const libBtn = document.createElement('button');
      libBtn.type = 'button';
      libBtn.id = `${p}-library-btn`;
      libBtn.className = 'btn-secondary w-full text-sm font-semibold py-2 px-3 rounded-lg mt-3 hidden';
      libBtn.innerHTML = '<i class="fas fa-user-astronaut mr-1"></i>Pilih dari Pustaka Model';
      modelPreviewContainer.insertAdjacentElement('afterend', libBtn);
      libBtn.addEventListener('click', async () => {
        let list = [];
        try { list = await window.modelDB.list(); } catch (err) { console.error(err); }
        if (!list.length) { window.uiNotify('Belum ada model tersimpan — buat dulu di menu AI Influencer.'); return; }
        showChoiceModal('Pilih model dari pustaka', list.map(m => ({
          label: `<span class="flex items-center gap-3"><img src="${URL.createObjectURL(m.blob)}" class="w-12 h-12 rounded-lg object-cover shrink-0">${window.escHtml(m.name)}</span>`,
          onPick: async () => {
            modelBase64 = await window.blobToB64(m.blob);
            modelMime = m.mime;
            modelPreview.src = URL.createObjectURL(m.blob);
            modelUploadArea.classList.add('hidden');
            modelPreviewContainer.classList.remove('hidden');
          }
        })));
      });
      async function refreshLibBtn() {
        try { libBtn.classList.toggle('hidden', !(await window.modelDB.list()).length); }
        catch { libBtn.classList.add('hidden'); }
      }
      document.addEventListener('ssp-models-changed', refreshLibBtn);
      refreshLibBtn();
    }

    descInput.addEventListener('input', updateBtn);

    descBtn.addEventListener('click', async () => {
      const orig = descBtn.innerHTML;
      descBtn.innerHTML = '<div class="loader !w-4 !h-4 !border-2"></div>'; descBtn.disabled = true;
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const parts = [{ text: cfg.descUserText }];
        if (images.length) parts.push({ inlineData: { mimeType: images[0].mimeType, data: images[0].base64 } });
        const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts }], systemInstruction: { parts: [{ text: cfg.descPrompt }] } }) });
        const result = await res.json();
        descInput.value = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
        updateBtn();
      } catch (err) { console.error(err); descInput.value = 'Gagal membuat deskripsi. Coba lagi.'; }
      finally { descBtn.innerHTML = orig; descBtn.disabled = false; }
    });

    async function analyzeAndGetPrompts() {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const r = ratio();
      let systemPrompt = cfg.buildSystemPrompt({ count: effectiveCount(), ratio: r, model: !!modelBase64 });
      if (durState.on) {
        const plan = window.clipPlan(durState.platform, durState.duration);
        systemPrompt += `\n\n**CLIP STRUCTURE (IMPORTANT):** These ${plan.photos} scenes will become ${plan.clips} separate video clip(s) of ${plan.clipSec} seconds each (${plan.perClip} scenes per clip, ~2 seconds per scene). Structure the story as ${plan.clips} chapter(s) of ONE continuous narrative, one chapter per clip. The LAST scene of each chapter must work as a smooth narrative AND visual bridge into the first scene of the next chapter, so separately generated clips cut together seamlessly in an editor.`;
      }
      let theme = '';
      if (themeGrid) {
        theme = selectedTheme === 'custom'
          ? (themeInput ? themeInput.value.trim() : '')
          : selectedTheme.trim();
      } else if (themeInput) {
        theme = themeInput.value.trim();
      }
      let userQuery = `Analyze this ${cfg.subject}. Description: "${descInput.value.trim()}". Desired aspect ratio is ${r}.`;
      if (theme) userQuery += `\nPhoto Theme: "${theme}"`;
      const parts = [{ text: userQuery }];
      images.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      if (modelBase64) parts.push({ inlineData: { mimeType: modelMime, data: modelBase64 } });
      const payload = { contents: [{ parts }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { responseMimeType: "application/json", responseSchema: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, prompt: { type: "STRING" } }, required: ["title", "prompt"] } } } };
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await res.json();
      let raw = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!raw) throw new Error('Invalid response structure from API.');
      raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const s = raw.indexOf('['), e2 = raw.lastIndexOf(']');
      if (s === -1 || e2 === -1) throw new Error('No valid JSON array in response.');
      return JSON.parse(raw.substring(s, e2 + 1));
    }

    function buildCards(prompts) {
      grid.innerHTML = '';
      const ac = aspectClass(ratio());
      const plan = durState.on ? window.clipPlan(durState.platform, durState.duration) : null;
      prompts.forEach((pr, i) => {
        if (plan && i % plan.perClip === 0) {
          const clipIdx = i / plan.perClip + 1;
          const end = Math.min(i + plan.perClip, prompts.length);
          const h = document.createElement('div');
          h.className = 'clip-divider';
          h.id = `${p}-clip-${clipIdx}`;
          h.innerHTML = `<span><i class="fas fa-clapperboard mr-1"></i>Klip ${clipIdx} — Scene ${i + 1}–${end} · ${plan.clipSec} dtk</span><span class="flex items-center gap-2"><button type="button" data-action="${p}-clip-download" data-clip="${clipIdx}" class="action-btn bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-download mr-1 pointer-events-none"></i>Unduh</button><button type="button" data-action="${p}-clip-prompt" data-clip="${clipIdx}" class="action-btn bg-fuchsia-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-film mr-1 pointer-events-none"></i>Prompt Klip</button></span>`;
          grid.appendChild(h);
        }
        const card = document.createElement('div');
        card.id = `${p}-card-${i + 1}`;
        card.className = 'result-card card p-4 flex flex-col justify-between';
        card.dataset.title = pr.title; card.dataset.prompt = pr.prompt;
        card.innerHTML = `<div class="mb-3"><h3 class="text-base font-semibold text-gray-800">${window.escHtml(pr.title)}</h3></div><div class="${p}-output-container ${ac} bg-gray-100 rounded-md flex items-center justify-center"><div class="loader"></div></div>`;
        grid.appendChild(card);
      });
    }

    async function generateSingle(id, title, prompt) {
      const card = document.getElementById(`${p}-card-${id}`); if (!card) return;
      const out = card.querySelector(`.${p}-output-container`);
      out.innerHTML = '<div class="loader"></div>';
      card.dataset.videoPromptCache = ''; // gambar berubah → buang cache prompt video lama
      if (durState.on) {
        const ci = Math.ceil(parseInt(id, 10) / window.clipPlan(durState.platform, durState.duration).perClip);
        const hd = document.getElementById(`${p}-clip-${ci}`);
        if (hd) hd.dataset.clipPromptCache = ''; // scene berubah → prompt klip lama tidak valid
      }
      const retries = 3; let lastError = null;
      for (let i = 0; i < retries; i++) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
          const finalPrompt = cfg.imageSuffix(!!modelBase64, prompt);
          const parts = [{ text: finalPrompt }];
          images.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
          if (modelBase64) parts.push({ inlineData: { mimeType: modelMime, data: modelBase64 } });
          const payload = {
            contents: [{ parts }],
            generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: ratio() } },
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
          };
          const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          const result = await res.json();
          const b64 = result?.candidates?.[0]?.content?.parts?.find(x => x.inlineData)?.inlineData?.data;
          if (!b64) throw new Error('No image data received');
          const imageUrl = `data:image/png;base64,${b64}`;
          const safe = (title || 'scene').replace(/[^a-z0-9]/gi, '_').toLowerCase();
          out.innerHTML = `<div class="relative w-full h-full group">
            <img src="${imageUrl}" class="w-full h-full object-cover rounded-md" alt="Scene">
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex flex-wrap gap-2 justify-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
              <button data-action="${p}-preview" data-scene-id="${id}" class="action-btn bg-violet-600 text-white px-3 py-2 rounded-lg"><i class="fas fa-search-plus pointer-events-none"></i></button>
              <button data-action="${p}-regenerate" data-scene-id="${id}" class="action-btn bg-green-500 text-white px-3 py-2 rounded-lg" title="Regenerate"><i class="fas fa-sync-alt pointer-events-none"></i></button>
              <button data-action="${p}-video" data-scene-id="${id}" class="action-btn bg-fuchsia-500 text-white px-3 py-2 rounded-lg" title="Buat Prompt Video"><i class="fas fa-film pointer-events-none"></i></button>
              <button data-action="${p}-download" data-scene-id="${id}" data-filename="${cfg.filenamePrefix}_${id}_${safe}.png" class="action-btn bg-cyan-600 text-white px-3 py-2 rounded-lg" title="Unduh"><i class="fas fa-download pointer-events-none"></i></button>
            </div>
          </div>`;
          return;
        } catch (err) {
          lastError = err; console.error(`Attempt ${i + 1} card ${id} failed:`, err);
          if (i < retries - 1) await new Promise(rz => setTimeout(rz, 1000 * Math.pow(2, i)));
        }
      }
      if (lastError) out.innerHTML = durState.on ? retryPlaceholder(id) : '';
    }

    generateBtn.addEventListener('click', async () => {
      if (!images.length) return;
      if (cfg.requireModel && !modelBase64) { window.uiNotify('Fitur ini butuh Foto Model — upload foto model dulu ya.'); return; }
      generateBtn.disabled = true;
      const orig = generateBtn.innerHTML;
      generateBtn.innerHTML = '<div class="loader"></div><span class="ml-2">Menganalisa...</span>';
      downloadAllBtn.classList.add('hidden');
      if (videoAllBtn) videoAllBtn.classList.add('hidden');
      if (audioStyleSel) audioStyleSel.classList.add('hidden');
      if (audioLangBtn) audioLangBtn.classList.add('hidden');
      grid.innerHTML = `<div class="col-span-full text-center py-10"><div class="loader inline-block"></div><p class="mt-4 text-gray-500">${cfg.analyzingMsg}</p></div>`;
      let ideas;
      try { ideas = await analyzeAndGetPrompts(); }
      catch (err) {
        console.error(err);
        grid.innerHTML = `<div class="col-span-full text-center py-10 text-red-500">Terjadi kesalahan: ${window.escHtml(err.message)}</div>`;
        generateBtn.disabled = false; generateBtn.innerHTML = orig; return;
      }
      generateBtn.innerHTML = '<div class="loader"></div><span class="ml-2">Membuat Visual...</span>';
      const MAX = 3; let attempts = 0, success = 0;
      while (attempts < MAX && success === 0) {
        attempts++;
        buildCards(ideas);
        const chunk = durState.on ? window.clipPlan(durState.platform, durState.duration).perClip : ideas.length;
        for (let s = 0; s < ideas.length; s += chunk) {
          await Promise.allSettled(ideas.slice(s, s + chunk).map((idea, j) => generateSingle(s + j + 1, idea.title, idea.prompt)));
        }
        success = Array.from(grid.querySelectorAll('.result-card')).filter(c => c.querySelector('img')).length;
      }
      if (!durState.on) {
        grid.querySelectorAll('.result-card').forEach(c => { if (!c.querySelector('img')) c.remove(); });
      }
      generateBtn.disabled = false; generateBtn.innerHTML = orig;
      if (success === 0) window.uiNotify('Akun Google ini sudah mencapai batas, silakan gunakan akun Google lain.');
      else { downloadAllBtn.classList.remove('hidden'); if (videoAllBtn) videoAllBtn.classList.remove('hidden'); if (audioStyleSel) audioStyleSel.classList.remove('hidden'); if (audioLangBtn) audioLangBtn.classList.remove('hidden'); }
    });

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]'); if (!btn) return;
      if (btn.dataset.action === `${p}-clip-prompt`) { generateClipPrompt(parseInt(btn.dataset.clip, 10)); return; }
      if (btn.dataset.action === `${p}-clip-download`) {
        const k = parseInt(btn.dataset.clip, 10);
        const plan = window.clipPlan(durState.platform, durState.duration);
        const all = Array.from(grid.querySelectorAll('.result-card'));
        downloadCards(all.slice((k - 1) * plan.perClip, k * plan.perClip));
        return;
      }
      const id = btn.dataset.sceneId;
      const card = document.getElementById(`${p}-card-${id}`);
      const img = card?.querySelector('img');
      if (btn.dataset.action === `${p}-download` && img) window.downloadDataURINew(img.src, btn.dataset.filename);
      else if (btn.dataset.action === `${p}-preview` && img) openPreview(img.src);
      else if (btn.dataset.action === `${p}-regenerate` && card) generateSingle(id, card.dataset.title, card.dataset.prompt);
      else if (btn.dataset.action === `${p}-video` && img) generateVideoPrompt(id);
    });

    function downloadCards(cards) {
      cards.forEach(card => {
        const img = card.querySelector('img'); if (!img) return;
        const safe = (card.dataset.title || 'scene').replace(/[^a-z0-9]/gi, '_').toLowerCase();
        window.downloadDataURINew(img.src, `${cfg.filenamePrefix}_${safe}.png`);
      });
    }
    downloadAllBtn.addEventListener('click', () => {
      const all = Array.from(grid.querySelectorAll('.result-card'));
      if (!durState.on) { downloadCards(all); return; }
      const plan = window.clipPlan(durState.platform, durState.duration);
      const totalClips = Math.ceil(all.length / plan.perClip);
      const choices = [{ label: `<i class="fas fa-download mr-2"></i>Semua foto (${all.length})`, onPick: () => downloadCards(all) }];
      for (let k = 1; k <= totalClips; k++) {
        const cards = all.slice((k - 1) * plan.perClip, k * plan.perClip);
        choices.push({ label: `<i class="fas fa-clapperboard mr-2"></i>Klip ${k} — Scene ${(k - 1) * plan.perClip + 1}–${(k - 1) * plan.perClip + cards.length} (${cards.length} foto)`, onPick: () => downloadCards(cards) });
      }
      showChoiceModal('Unduh foto yang mana?', choices);
    });

    function openPreview(src) {
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      modal.innerHTML = `<img src="${src}" class="max-w-[92vw] max-h-[90vh] rounded-lg object-contain">`;
      modal.addEventListener('click', () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
    }

    async function requestVideoPrompt(card) {
      const img = card.querySelector('img'); if (!img) throw new Error('Tidak ada gambar pada scene ini.');
      const title = card.dataset.title || 'Scene';
      const allCards = Array.from(grid.querySelectorAll('.result-card'));
      const idx = allCards.indexOf(card);
      const sceneNum = idx + 1, total = allCards.length;
      const storyList = allCards.map((c, i) => `${i + 1}. ${c.dataset.title || 'Scene'}`).join('\n');
      const prevTitle = idx > 0 ? (allCards[idx - 1].dataset.title || 'scene sebelumnya') : null;
      const nextTitle = idx < total - 1 ? (allCards[idx + 1].dataset.title || 'scene berikutnya') : null;
      const desc = descInput.value.trim();
      const cacheKey = `${audioStyle}:${audioLang}`;
      let cache = {};
      try { cache = JSON.parse(card.dataset.videoPromptCache || '{}'); } catch (e) { cache = {}; }
      if (cache[cacheKey]) return { sceneNum, total, title, vp: cache[cacheKey], imageUrl: img.src, cached: true }; // cache per gaya+bahasa
      const blob = await (await fetch(img.src)).blob();
      const base64 = await new Promise((resolve) => { const r = new FileReader(); r.onloadend = () => resolve(r.result.split(',')[1]); r.readAsDataURL(blob); });
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const systemPrompt = `You are an expert video prompt engineer. This image is **Scene ${sceneNum} of ${total}** in ONE continuous ${cfg.subject} review/story video that must flow smoothly from beginning to end. The full storyboard, in order, is:
${storyList}

Create a detailed cinematic English prompt for an AI image-to-video generator (Runway, Pika, Kling, Veo, Stable Video Diffusion) for THIS scene only, but crafted so all clips cut together into one seamless story:
1. Keep the main subject EXACTLY as shown — do not change the product/identity.
2. Keep visual style, color grading, lighting mood, and pacing CONSISTENT with the rest of the sequence.
3. Design camera motion for continuity: ${prevTitle ? `begin in a way that flows on from the previous scene ("${prevTitle}")` : 'this is the OPENING scene — start with an inviting establishing motion'}, and ${nextTitle ? `end in a way that leads into the next scene ("${nextTitle}")` : 'this is the FINAL scene — end on a confident closing / call-to-action beat'}.
4. Add subtle dynamic elements suited to the scene (soft light shifts, gentle particles, product rotation, steam/liquid motion if relevant).
5. ${AUDIO_DIRECTIONS[audioStyle] || AUDIO_DIRECTIONS.voiceover}
6. Any spoken words (dialogue or narration) MUST be written in ${LANG_LABEL[audioLang] || 'Indonesian'}, wrapped in double quotes. Auto-extract the product name and any slogan/tagline from the product context and weave them in naturally (place the slogan on the final/CTA scene).
7. Be optimized for image-to-video AI, under 200 words, highly detailed.
Output ONLY the video prompt for this scene, nothing else.`;
      const userText = `Scene ${sceneNum}/${total} — "${title}". Product/subject context: "${desc}". Audio style: ${audioStyle}. Spoken language: ${LANG_LABEL[audioLang]}. Write the continuous-story image-to-video prompt for this scene so it connects with the scene before and after.`;
      const payload = { contents: [{ parts: [{ text: userText }, { inlineData: { mimeType: 'image/png', data: base64 } }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
      const result = await (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).json();
      const vp = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
      if (!vp) throw new Error('Prompt kosong dari API.');
      cache[cacheKey] = vp;
      card.dataset.videoPromptCache = JSON.stringify(cache); // simpan cache per gaya+bahasa
      return { sceneNum, total, title, vp, imageUrl: img.src };
    }

    async function requestClipPrompt(clipIdx) {
      const plan = window.clipPlan(durState.platform, durState.duration);
      const all = Array.from(grid.querySelectorAll('.result-card'));
      const start = (clipIdx - 1) * plan.perClip;
      const cards = all.slice(start, start + plan.perClip);
      if (!cards.length) throw new Error('Klip tidak ditemukan.');
      const failed = cards.filter(c => !c.querySelector('img'));
      if (failed.length) throw new Error(`Ada ${failed.length} scene gagal di klip ini. Klik "Coba Lagi" pada scene yang gagal dulu supaya prompt klip utuh ${plan.perClip} scene.`);
      const header = document.getElementById(`${p}-clip-${clipIdx}`);
      const cacheKey = `${audioStyle}:${audioLang}`;
      let cache = {};
      try { cache = JSON.parse(header?.dataset.clipPromptCache || '{}'); } catch (e) { cache = {}; }
      if (cache[cacheKey]) return { clipIdx, vp: cache[cacheKey], cards, cached: true };
      const totalClips = Math.ceil(all.length / plan.perClip);
      const sceneLines = cards.map((c, j) => `${j + 1}. (detik ${j * 2}–${j * 2 + 2}) "${c.dataset.title}": ${c.dataset.prompt}`).join('\n');
      const prevBridge = clipIdx > 1 ? (all[start - 1]?.dataset.title || 'previous clip') : null;
      const nextBridge = start + plan.perClip < all.length ? (all[start + plan.perClip]?.dataset.title || 'next clip') : null;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const systemPrompt = `You are an expert video prompt engineer. Write ONE image-to-video prompt for CLIP ${clipIdx} of ${totalClips} in a continuous ${cfg.subject} story video. The user will feed ${cards.length} keyframe photos IN ORDER into ONE ${plan.clipSec}-second generation (each keyframe covers ~2 seconds). The keyframes of THIS clip, in order with timing:
${sceneLines}

Write ONE cinematic English prompt describing the FULL ${plan.clipSec}-second clip as continuous motion through these keyframes:
1. Reference the keyframes in order with explicit timing (0–2s, 2–4s, ...). Keep the subject/product identity EXACTLY as shown in the photos.
2. ONE consistent visual style, color grade, and lighting mood across the whole clip.
3. ${prevBridge ? `OPENING: flow on smoothly from the previous clip (which ended at "${prevBridge}").` : 'OPENING: this is the FIRST clip — start with an inviting establishing motion.'}
4. ${nextBridge ? `ENDING: end on a camera motion that bridges into the next clip (which starts at "${nextBridge}").` : 'ENDING: this is the FINAL clip — close on a confident CTA beat.'}
5. ${AUDIO_DIRECTIONS[audioStyle] || AUDIO_DIRECTIONS.voiceover}
6. Any spoken words MUST be written in ${LANG_LABEL[audioLang] || 'Indonesian'}, wrapped in double quotes. Auto-extract the product name and any slogan/tagline from the product context (place the slogan on the final clip/CTA).
7. Under 250 words, optimized for image-to-video AI (Runway, Pika, Kling, Veo, Seedance).
Output ONLY the video prompt, nothing else.`;
      const userText = `Clip ${clipIdx}/${totalClips}. Product/subject context: "${descInput.value.trim()}". Audio style: ${audioStyle}. Spoken language: ${LANG_LABEL[audioLang]}.`;
      const payload = { contents: [{ parts: [{ text: userText }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
      const result = await (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).json();
      const vp = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
      if (!vp) throw new Error('Prompt kosong dari API.');
      cache[cacheKey] = vp;
      if (header) header.dataset.clipPromptCache = JSON.stringify(cache);
      return { clipIdx, vp, cards };
    }

    async function generateClipPrompt(clipIdx) {
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const loadingHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-4 text-gray-800"><i class="fas fa-clapperboard text-fuchsia-500 mr-2"></i>Membuat Prompt Klip ${clipIdx}...</h3><div class="flex items-center justify-center py-8"><div class="loader"></div></div></div>`;
      modal.innerHTML = loadingHTML;
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      async function run() {
        modal.innerHTML = loadingHTML;
        try {
          const { vp, cards } = await requestClipPrompt(clipIdx);
          const plan = window.clipPlan(durState.platform, durState.duration);
          const thumbs = cards.map(c => `<img src="${c.querySelector('img').src}" class="h-16 rounded object-cover">`).join('');
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
            <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-clapperboard text-fuchsia-500 mr-2"></i>Prompt Video — Klip ${clipIdx} (${cards.length} foto · ${plan.clipSec} dtk)</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
            <div class="flex gap-2 mb-3 overflow-x-auto">${thumbs}</div>
            <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-3">
              <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">Satu prompt untuk SATU klip utuh (${cards.length} keyframe):</span><button data-copy class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>Copy</button></div>
              <textarea data-prompt rows="9" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm font-mono resize-none">${window.escHtml(vp)}</textarea>
            </div>
            <p class="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-lg p-3 mb-3"><i class="fas fa-info-circle mr-1"></i><strong>Cara pakai:</strong> unggah ${cards.length} foto klip ini BERURUTAN ke platform image-to-video (${window.VIDEO_PLATFORMS[durState.platform].label}) + paste prompt ini → 1 klip ${plan.clipSec} dtk. Gabungkan semua klip berurutan di CapCut/editor → satu story utuh.</p>
            <button data-close class="w-full btn-secondary py-2 rounded-lg font-semibold">Tutup</button>
          </div>`;
          modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
          const copyBtn = modal.querySelector('[data-copy]'), ta = modal.querySelector('[data-prompt]');
          copyBtn.addEventListener('click', () => {
            const ok = window.copyText(ta.value);
            if (!ok) { ta.focus(); ta.select(); }
            copyBtn.innerHTML = ok ? '<i class="fas fa-check mr-1 pointer-events-none"></i>Tersalin!' : '<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>Tekan Ctrl+C';
            setTimeout(() => { copyBtn.innerHTML = '<i class="fas fa-copy mr-1 pointer-events-none"></i>Copy'; }, 2000);
          });
        } catch (err) {
          console.error('clip prompt error', err);
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-3 text-red-600"><i class="fas fa-triangle-exclamation mr-2"></i>Gagal membuat prompt klip</h3><p class="text-gray-700 text-sm mb-4">${window.escHtml(err.message)}</p><div class="flex gap-2"><button data-retry class="flex-1 btn-primary py-2 rounded-lg font-semibold"><i class="fas fa-rotate-right mr-1"></i>Coba Lagi</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold">Tutup</button></div></div>`;
          modal.querySelector('[data-close]').addEventListener('click', close);
          modal.querySelector('[data-retry]').addEventListener('click', run);
        }
      }
      run();
    }

    async function generateVideoPrompt(id) {
      const card = document.getElementById(`${p}-card-${id}`); if (!card || !card.querySelector('img')) return;
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const loadingHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-4 text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>Membuat Prompt Video...</h3><div class="flex items-center justify-center py-8"><div class="loader"></div></div></div>`;
      modal.innerHTML = loadingHTML;
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      async function run() {
        modal.innerHTML = loadingHTML;
        try {
        const { sceneNum, total, title, vp, imageUrl } = await requestVideoPrompt(card);
        modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
          <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>Prompt Video — Scene ${sceneNum}/${total}: ${window.escHtml(title)}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
          <img src="${imageUrl}" class="w-full rounded-lg mb-3 max-h-56 object-contain bg-gray-100">
          <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-3">
            <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">Video Prompt (Scene ${sceneNum}/${total}, nyambung ke scene lain):</span><button data-copy class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>Copy</button></div>
            <textarea data-prompt rows="8" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm font-mono resize-none">${window.escHtml(vp)}</textarea>
          </div>
          <p class="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-lg p-3 mb-3"><i class="fas fa-info-circle mr-1"></i><strong>Tips:</strong> pakai tombol <strong>Semua Prompt Video</strong> untuk ambil semua scene sekaligus. Copy tiap prompt ke platform image-to-video (Runway, Pika, Kling, Veo) dengan gambar scene-nya, gabung berurutan → satu cerita utuh.</p>
          <button data-close class="w-full btn-secondary py-2 rounded-lg font-semibold">Tutup</button>
        </div>`;
        modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
        const copyBtn = modal.querySelector('[data-copy]'), ta = modal.querySelector('[data-prompt]');
        copyBtn.addEventListener('click', () => {
          const ok = window.copyText(ta.value);
          if (!ok) { ta.focus(); ta.select(); }
          copyBtn.innerHTML = ok ? '<i class="fas fa-check mr-1 pointer-events-none"></i>Tersalin!' : '<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>Tekan Ctrl+C';
          setTimeout(() => { copyBtn.innerHTML = '<i class="fas fa-copy mr-1 pointer-events-none"></i>Copy'; }, 2000);
        });
        } catch (err) {
          console.error('video prompt error', err);
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-3 text-red-600"><i class="fas fa-triangle-exclamation mr-2"></i>Gagal membuat prompt</h3><p class="text-gray-700 text-sm mb-4">${window.escHtml(err.message)}</p><div class="flex gap-2"><button data-retry class="flex-1 btn-primary py-2 rounded-lg font-semibold"><i class="fas fa-rotate-right mr-1"></i>Coba Lagi</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold">Tutup</button></div></div>`;
          modal.querySelector('[data-close]').addEventListener('click', close);
          modal.querySelector('[data-retry]').addEventListener('click', run);
        }
      }
      run();
    }

    async function generateAllVideoPrompts() {
      const cards = Array.from(grid.querySelectorAll('.result-card')).filter(c => c.querySelector('img'));
      if (!cards.length) return;
      const total = cards.length;
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[88vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-2"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>Semua Prompt Video (${total} scene)</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-3" data-progress>Menyiapkan 0/${total}...</p>
        <div data-list class="space-y-3"></div>
        <div class="flex gap-2 mt-4">
          <button data-copyall class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-copy mr-1"></i>Copy Semua</button>
          <button data-txt class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-download mr-1"></i>Unduh .txt</button>
        </div>
      </div>`;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      modal.querySelector('[data-close]').addEventListener('click', close);
      const listEl = modal.querySelector('[data-list]');
      const progressEl = modal.querySelector('[data-progress]');
      const copyAll = modal.querySelector('[data-copyall]'), txtBtn = modal.querySelector('[data-txt]');
      const resultsByIdx = new Array(total).fill(null);

      function aggregateText() {
        return resultsByIdx.map((r, i) => r ? `# Scene ${i + 1}/${total}: ${r.title}\n${r.vp}` : null).filter(Boolean).join('\n\n');
      }
      function refreshAggregate() {
        const done = resultsByIdx.filter(Boolean).length;
        progressEl.textContent = `Selesai ${done}/${total} prompt`;
        copyAll.classList.toggle('hidden', done === 0);
        txtBtn.classList.toggle('hidden', done === 0);
      }
      copyAll.addEventListener('click', () => {
        const ok = window.copyText(aggregateText());
        copyAll.innerHTML = ok ? '<i class="fas fa-check mr-1"></i>Tersalin!' : '<i class="fas fa-download mr-1"></i>Pakai Unduh .txt';
        setTimeout(() => { copyAll.innerHTML = '<i class="fas fa-copy mr-1"></i>Copy Semua'; }, 2200);
      });
      txtBtn.addEventListener('click', () => {
        const b = new Blob([aggregateText()], { type: 'text/plain' });
        const u = URL.createObjectURL(b);
        window.downloadDataURINew(u, `${cfg.filenamePrefix}_video_prompts.txt`);
        setTimeout(() => URL.revokeObjectURL(u), 1500);
      });

      async function runBlock(i, card, ta, st, retryBtn) {
        st.innerHTML = '<span class="loader !w-4 !h-4 !border-2 inline-block"></span>';
        retryBtn.classList.add('hidden');
        try {
          const r = await requestVideoPrompt(card); // story-aware: baca posisi scene + prev/next dari DOM
          ta.value = r.vp;
          resultsByIdx[i] = { title: card.dataset.title || `Scene ${i + 1}`, vp: r.vp };
          st.innerHTML = r.cached ? '<i class="fas fa-bookmark text-violet-500" title="tersimpan"></i>' : '<i class="fas fa-check text-green-500"></i>';
        } catch (err) {
          ta.value = 'Gagal: ' + err.message;
          resultsByIdx[i] = null;
          st.innerHTML = '<i class="fas fa-xmark text-red-500"></i>';
          retryBtn.classList.remove('hidden');
        }
        refreshAggregate();
      }

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const title = card.dataset.title || `Scene ${i + 1}`;
        const block = document.createElement('div');
        block.className = 'bg-gray-50 border border-gray-200 rounded-lg p-3';
        block.innerHTML = `<div class="flex items-center justify-between mb-1"><span class="text-sm font-semibold text-gray-700">Scene ${i + 1}/${total}: ${window.escHtml(title)}</span><span class="flex items-center gap-2"><button data-copyone class="text-xs bg-violet-500 hover:bg-violet-600 text-white px-2 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>Copy</button><button data-retry class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-2 py-1 rounded-full hidden"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>Coba Lagi</button><span data-st><span class="loader !w-4 !h-4 !border-2 inline-block"></span></span></span></div><textarea rows="5" readonly class="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 text-xs font-mono resize-none" data-ta></textarea>`;
        listEl.appendChild(block);
        const ta = block.querySelector('[data-ta]'), st = block.querySelector('[data-st]'), retryBtn = block.querySelector('[data-retry]');
        const copyOne = block.querySelector('[data-copyone]');
        copyOne.addEventListener('click', () => {
          const ok = window.copyText(ta.value);
          copyOne.innerHTML = ok ? '<i class="fas fa-check mr-1 pointer-events-none"></i>OK' : '<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>Ctrl+C';
          setTimeout(() => { copyOne.innerHTML = '<i class="fas fa-copy mr-1 pointer-events-none"></i>Copy'; }, 1800);
        });
        retryBtn.addEventListener('click', () => runBlock(i, card, ta, st, retryBtn));
        progressEl.textContent = `Menyiapkan ${i + 1}/${total}...`;
        await runBlock(i, card, ta, st, retryBtn);
      }
      refreshAggregate();
    }

    async function generateAllClipPrompts() {
      const plan = window.clipPlan(durState.platform, durState.duration);
      const all = Array.from(grid.querySelectorAll('.result-card'));
      if (!all.length) return;
      const totalClips = Math.ceil(all.length / plan.perClip);
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[88vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-2"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-clapperboard text-fuchsia-500 mr-2"></i>Semua Prompt Klip (${totalClips} klip · ${plan.clipSec} dtk/klip)</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-3" data-progress>Menyiapkan 0/${totalClips}...</p>
        <div data-list class="space-y-3"></div>
        <div class="flex gap-2 mt-4">
          <button data-copyall class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-copy mr-1"></i>Copy Semua</button>
          <button data-txt class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-download mr-1"></i>Unduh .txt</button>
        </div>
      </div>`;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      modal.querySelector('[data-close]').addEventListener('click', close);
      const listEl = modal.querySelector('[data-list]');
      const progressEl = modal.querySelector('[data-progress]');
      const copyAll = modal.querySelector('[data-copyall]'), txtBtn = modal.querySelector('[data-txt]');
      const resultsByIdx = new Array(totalClips).fill(null);

      function aggregateText() {
        return resultsByIdx.map((r, i) => r ? `## KLIP ${i + 1}/${totalClips} (Scene ${i * plan.perClip + 1}–${Math.min((i + 1) * plan.perClip, all.length)}, ${plan.clipSec} dtk)\n${r.vp}` : null).filter(Boolean).join('\n\n');
      }
      function refreshAggregate() {
        const done = resultsByIdx.filter(Boolean).length;
        progressEl.textContent = `Selesai ${done}/${totalClips} prompt klip`;
        copyAll.classList.toggle('hidden', done === 0);
        txtBtn.classList.toggle('hidden', done === 0);
      }
      copyAll.addEventListener('click', () => {
        const ok = window.copyText(aggregateText());
        copyAll.innerHTML = ok ? '<i class="fas fa-check mr-1"></i>Tersalin!' : '<i class="fas fa-download mr-1"></i>Pakai Unduh .txt';
        setTimeout(() => { copyAll.innerHTML = '<i class="fas fa-copy mr-1"></i>Copy Semua'; }, 2200);
      });
      txtBtn.addEventListener('click', () => {
        const b = new Blob([aggregateText()], { type: 'text/plain' });
        const u = URL.createObjectURL(b);
        window.downloadDataURINew(u, `${cfg.filenamePrefix}_clip_prompts.txt`);
        setTimeout(() => URL.revokeObjectURL(u), 1500);
      });

      async function runBlock(i, ta, st, retryBtn) {
        st.innerHTML = '<span class="loader !w-4 !h-4 !border-2 inline-block"></span>';
        retryBtn.classList.add('hidden');
        try {
          const r = await requestClipPrompt(i + 1);
          ta.value = r.vp;
          resultsByIdx[i] = { vp: r.vp };
          st.innerHTML = r.cached ? '<i class="fas fa-bookmark text-violet-500" title="tersimpan"></i>' : '<i class="fas fa-check text-green-500"></i>';
        } catch (err) {
          ta.value = 'Gagal: ' + err.message;
          resultsByIdx[i] = null;
          st.innerHTML = '<i class="fas fa-xmark text-red-500"></i>';
          retryBtn.classList.remove('hidden');
        }
        refreshAggregate();
      }

      for (let i = 0; i < totalClips; i++) {
        const block = document.createElement('div');
        block.className = 'bg-gray-50 border border-gray-200 rounded-lg p-3';
        block.innerHTML = `<div class="flex items-center justify-between mb-1"><span class="text-sm font-semibold text-gray-700">Klip ${i + 1}/${totalClips} — Scene ${i * plan.perClip + 1}–${Math.min((i + 1) * plan.perClip, all.length)}</span><span class="flex items-center gap-2"><button data-copyone class="text-xs bg-violet-500 hover:bg-violet-600 text-white px-2 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>Copy</button><button data-retry class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-2 py-1 rounded-full hidden"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>Coba Lagi</button><span data-st><span class="loader !w-4 !h-4 !border-2 inline-block"></span></span></span></div><textarea rows="6" readonly class="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 text-xs font-mono resize-none" data-ta></textarea>`;
        listEl.appendChild(block);
        const ta = block.querySelector('[data-ta]'), st = block.querySelector('[data-st]'), retryBtn = block.querySelector('[data-retry]');
        const copyOne = block.querySelector('[data-copyone]');
        copyOne.addEventListener('click', () => {
          const ok = window.copyText(ta.value);
          copyOne.innerHTML = ok ? '<i class="fas fa-check mr-1 pointer-events-none"></i>OK' : '<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>Ctrl+C';
          setTimeout(() => { copyOne.innerHTML = '<i class="fas fa-copy mr-1 pointer-events-none"></i>Copy'; }, 1800);
        });
        retryBtn.addEventListener('click', () => runBlock(i, ta, st, retryBtn));
        progressEl.textContent = `Menyiapkan ${i + 1}/${totalClips}...`;
        await runBlock(i, ta, st, retryBtn);
      }
      refreshAggregate();
    }
  }

  // === TAB: REVIEW PRODUK ===
  createReviewTab({
    prefix: 'review',
    subject: 'product',
    filenamePrefix: 'review',
    analyzingMsg: 'AI sedang menganalisis produk...',
    descUserText: 'Buatkan deskripsi produk untuk gambar ini.',
    descPrompt: `You are a professional affiliate reviewer. Analyze the product in the image and write a concise, authentic-sounding review intro in Indonesian. Highlight its key features from a user's perspective. Keep it under 500 characters.`,
    buildSystemPrompt: ({ count, ratio, model }) => model
      ? `You are an expert product reviewer and affiliate marketer. Analyze the product, description, and model to create a **${count}-part visual review story** (storyboard) for the aspect ratio ${ratio}. The story should feel authentic, like a real user's experience.

**CRITICAL VISUAL RULES FOR MODEL CONSISTENCY:**
1. The ENTIRE review MUST take place in the same professional studio setting; every scene shares the same consistent background.
2. For ALL ${count} scenes, the human model and the product MUST appear together in the same frame, actively holding/using/demonstrating the product. Never generate product-only or model-only shots.
3. The model must be the EXACT SAME person in ALL ${count} scenes — identical gender, age, ethnicity, hair color/length/style, clothing, and facial features, as if filmed in one continuous session. Always describe the model with the same details in every prompt.

**STRUCTURE:** Create ${count} scenes forming a complete sequential review narrative (Unboxing, Details, Features Demo, Usage, Results, Final Verdict). Scenes must connect into a coherent story.
For each scene provide a short title in Indonesian (e.g. 'Scene 1: Model Unboxing Produk') and a CONCISE English prompt for an AI image generator that always includes the consistent model description.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`
      : `You are an expert product reviewer. Generate a **${count}-part visual review story** (storyboard) for the product for the aspect ratio ${ratio}. **Absolutely no people, models, or human parts.** Focus on the product itself. The entire review MUST take place in a single professional studio setting (clean tabletop, seamless backdrop). Every scene shares the same consistent studio background.

**STRUCTURE (PRODUCT-ONLY):** Create ${count} scenes forming a complete sequential review narrative (Showcase, Details, Features, Benefits, Call to Action). Scenes must connect into a coherent story.
For each concept provide a short elegant title in Indonesian (e.g. 'Bagian 1: Detail Produk') and a CONCISE English prompt for the AI image generator.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`,
    imageSuffix: (model, prompt) => model
      ? `${prompt}, elegant, cinematic, professional product photography, dramatic lighting, 8k, photorealistic`
      : `${prompt}, professional commercial product photography, hyper-detailed, epic composition, cinematic lighting, no people, 8k, photorealistic`,
  });

  // === TAB: REVIEW SKINCARE ===
  createReviewTab({
    prefix: 'skincare',
    subject: 'skincare product',
    filenamePrefix: 'skincare',
    analyzingMsg: 'AI sedang menganalisis produk skincare...',
    descUserText: 'Buatkan deskripsi produk skincare untuk gambar ini.',
    descPrompt: `Kamu adalah ahli review skincare profesional. Analisa produk skincare pada gambar dan tulis intro review yang ringkas dan autentik dalam Bahasa Indonesia. Soroti kandungan dan manfaat utamanya dari sudut pandang pengguna. Maksimal 500 karakter.`,
    buildSystemPrompt: ({ count, ratio, model }) => model
      ? `Kamu adalah ahli review skincare dan content creator profesional. Analisis produk skincare, deskripsi, dan model untuk membuat **${count}-part visual review story** (storyboard) khusus produk skincare dengan aspect ratio ${ratio}.

**ATURAN VISUAL KRITIS UNTUK SKINCARE:**
1. Setting studio konsisten & profesional di SEMUA ${count} scene; setiap scene berbagi background yang sama.
2. Untuk SEMUA ${count} scene, model dan produk skincare tampil bersama; model aktif memegang/menggunakan/mendemonstrasikan produk.
3. Model harus orang yang SAMA PERSIS di SEMUA ${count} scene (gender, usia, etnis, rambut, pakaian, fitur wajah identik), berdasarkan foto model.

**STRUKTUR:** Buat ${count} scene membentuk narasi review sekuensial (Perkenalan, Tekstur/Kandungan, Cara Pakai, Hasil, Kesimpulan). Scene harus terhubung menjadi cerita yang koheren.
Untuk tiap scene berikan judul singkat Bahasa Indonesia dan prompt CONCISE (Inggris) untuk AI image generator yang selalu menyertakan deskripsi model yang konsisten.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`
      : `Kamu adalah ahli review skincare profesional. Buat **${count}-part visual review story** (storyboard) khusus produk skincare dengan aspect ratio ${ratio}. **Tanpa orang, model, atau bagian tubuh manusia.** Fokus pada produk. Seluruh review di satu setting studio profesional yang sama; setiap scene berbagi background yang konsisten.

**STRUKTUR (PRODUK SAJA):** Buat ${count} scene membentuk narasi review sekuensial (Showcase, Kandungan, Tekstur, Manfaat, Call to Action).
Untuk tiap konsep berikan judul singkat Bahasa Indonesia dan prompt CONCISE (Inggris) untuk AI image generator.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`,
    imageSuffix: (model, prompt) => model
      ? `${prompt}, clean beauty aesthetic, soft studio lighting, professional skincare photography, 8k, photorealistic`
      : `${prompt}, professional skincare product photography, clean minimal studio, soft lighting, no people, 8k, photorealistic`,
  });

  // === TAB: STORY IKLAN ===
  createReviewTab({
    prefix: 'ads',
    subject: 'product',
    filenamePrefix: 'iklan',
    analyzingMsg: 'AI sedang menyusun story iklan...',
    descUserText: 'Buatkan deskripsi produk untuk gambar ini, fokus untuk kebutuhan iklan.',
    descPrompt: `You are a professional advertising copywriter. Analyze the product in the image and write a concise, punchy product description in Indonesian suitable for an ad. Highlight the main selling point and target benefit. Keep it under 500 characters.`,
    buildSystemPrompt: ({ count, ratio, model }) => model
      ? `You are an expert AI storyboard artist and creative director. Analyze the product, description, and model to create a **${count}-part visual advertising story** (storyboard) for the aspect ratio ${ratio}.

**CRITICAL VISUAL RULES FOR MODEL CONSISTENCY:**
1. The ENTIRE ad MUST take place in a consistent professional setting; every scene shares the same visual world.
2. For ALL ${count} scenes, the human model and the product MUST appear together in the same frame, actively holding/using/demonstrating the product. Never generate product-only or model-only shots.
3. The model must be the EXACT SAME person in ALL ${count} scenes — identical gender, age, ethnicity, hair, clothing, and facial features, as if filmed in one continuous session. Always describe the model with the same details in every prompt.

**STRUCTURE IKLAN:** Create ${count} scenes forming a complete sequential ad narrative (Opening Hook → Product Demo → Benefits Showcase → Call to Action). Scenes must connect into a coherent story.
For each scene provide a short title in Indonesian (e.g. 'Scene 1: Awal Mula') and a CONCISE English prompt for an AI image generator that always includes the consistent model description.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`
      : `You are an elite-level creative director. Generate a **${count}-part visual advertising story** (storyboard) for the product for the aspect ratio ${ratio}. **Absolutely no people, models, or human parts.** Focus on the product. The entire ad shares one consistent professional visual world across every scene.

**STRUCTURE IKLAN:** Create ${count} scenes forming a complete sequential ad narrative (Product Introduction → Feature Highlight → Benefits Demo → Final Appeal). Scenes must connect into a coherent story.
For each concept provide a short elegant title in Indonesian (e.g. 'Bagian 1: Pengenalan') and a CONCISE English prompt for the AI image generator.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`,
    imageSuffix: (model, prompt) => model
      ? `${prompt}, premium advertising campaign, cinematic lighting, high-end commercial photography, 8k, photorealistic`
      : `${prompt}, premium product advertisement, epic cinematic composition, dramatic commercial lighting, no people, 8k, photorealistic`,
  });

  // === TAB: REVIEW MAKANAN ===
  createReviewTab({
    prefix: 'food',
    subject: 'food dish',
    filenamePrefix: 'makanan',
    analyzingMsg: 'AI sedang menganalisis makanan...',
    descUserText: 'Buatkan deskripsi makanan untuk gambar ini.',
    descPrompt: `You are a professional food writer. Analyze the food in the image and write a concise, appetizing description in Indonesian. Include nama makanan, rasa, tekstur, bahan utama, dan kesan keseluruhan. Keep it under 300 characters.`,
    buildSystemPrompt: ({ count, ratio, model }) => model
      ? `Kamu adalah ahli food content creator (mukbang/food vlogger TikTok & selebgram kuliner). Analisis makanan, deskripsi, dan model untuk membuat **${count}-part visual food review story** (storyboard) dengan aspect ratio ${ratio}. Cerita terasa autentik, seperti reviewer sungguhan menikmati makanan.

**ATURAN VISUAL KRITIS UNTUK MODEL KONSISTEN:**
1. Setting profesional yang konsisten (kafe/restoran/studio kuliner) di SEMUA ${count} scene; setiap scene berbagi latar yang sama.
2. Untuk SEMUA ${count} scene, model dan makanan tampil bersama dalam satu frame — memegang, mengangkat, mencicipi, atau bereaksi terhadap makanan. Jangan buat scene makanan-saja atau model-saja.
3. Model harus orang yang SAMA PERSIS di SEMUA ${count} scene (gender, usia, etnis, rambut, pakaian, fitur wajah identik), berdasarkan foto model, seolah difilmkan dalam satu sesi.

**STRUKTUR FOOD REVIEW (DENGAN MODEL):** Buat ${count} scene membentuk narasi review kuliner sekuensial (Perkenalan Makanan → Angkat/Tunjukkan Hidangan → Suapan Pertama → Reaksi Menikmati → Kesimpulan/CTA). Scene harus saling nyambung.

**KUALITAS VISUAL PROFESIONAL (WAJIB di tiap prompt):** lighting konsisten (window light hangat, golden hour, high-key studio), detail menggugah selera (uap, tekstur, saus mengalir, garnish segar), ekspresi model natural.
Untuk tiap scene berikan title (judul scene Bahasa Indonesia) dan prompt CONCISE English untuk AI image generator yang selalu menyertakan deskripsi model yang konsisten + makanan.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`
      : `Kamu adalah ahli food photography dan content creator kuliner. Analisis makanan untuk membuat **${count}-part visual food review story** (storyboard) fokus pada makanan dengan aspect ratio ${ratio}. **TANPA reviewer/orang.**

**STRUKTUR FOOD REVIEW (NO PEOPLE):** Buat ${count} scene yang membentuk narasi food presentation lengkap, menampilkan angle dan aspek makanan yang berbeda (Full Plate → Close-up Texture → Ingredients Detail → Plating Art). Scene harus saling nyambung.

**KUALITAS VISUAL PROFESIONAL (WAJIB di setiap prompt):**
- Angle kamera BERBEDA tiap scene (top-down flat lay, 45-degree hero, macro texture, side profile, wide establishing).
- Teknik lighting profesional yang konsisten (window light, moody low-key, golden hour, high-key studio).
- Detail menggugah selera: uap, tekstur, saus mengalir, garnish segar, kondensasi.

Untuk tiap scene berikan title (judul scene dalam Bahasa Indonesia) dan prompt CONCISE English untuk professional food photography dengan camera angle + lighting, NO PEOPLE.
Respond ONLY with a valid JSON array of ${count} objects, in sequential order.`,
    imageSuffix: (model, prompt) => model
      ? `${prompt}, authentic food vlogger photography, warm inviting lighting, shallow depth of field, appetizing detail, 8k, photorealistic`
      : `${prompt}, professional food photography, appetizing, mouth-watering detail, studio lighting, no people, 8k, photorealistic`,
  });

  // === TAB: REVIEW FASHION / OOTD ===
  createReviewTab({
    prefix: 'fashion',
    subject: 'fashion product',
    filenamePrefix: 'fashion',
    analyzingMsg: 'AI sedang menyusun story fashion...',
    descUserText: 'Buatkan deskripsi item fashion untuk gambar ini.',
    descPrompt: `You are a professional fashion content creator. Analyze the fashion item in the image and write a concise, stylish description in Indonesian (jenis, bahan, potongan, kesan gaya). Keep it under 500 characters.`,
    buildSystemPrompt: ({ count, ratio, model }) => model
      ? `You are an expert fashion vlog storyboard artist. Analyze the fashion item, description, and model to create a **${count}-part OOTD JOURNEY story** (storyboard) for the aspect ratio ${ratio}. This is a NARRATIVE about one person and this outfit through a real moment of their day — NOT a product catalog of angles.

**FIRST, INVENT THE ANCHOR (then reuse it):** silently decide ONE short "anchor" = the setting-world (e.g. "cozy bedroom → city street → café, warm afternoon light, soft film grade") + the exact model description + the exact outfit description. REPEAT this anchor wording in EVERY scene prompt so all scenes look like one continuous day filmed in one session.

**CRITICAL VISUAL RULES:**
1. The model must be the EXACT SAME person in ALL ${count} scenes — identical face, body, hair, skin tone. The fashion item stays EXACTLY as shown in the photo.
2. Locations may progress WITH the journey (room → mirror → outside destination), but keep ONE consistent color grade, lighting mood, and photography style across all scenes.
3. Each scene must visibly CONTINUE from the previous one (same day, same outfit state, logical next moment) — no random jumps.

**STRUCTURE OOTD JOURNEY:** Create ${count} sequential scenes telling one story arc: Menemukan/memilih outfit ini → Memakai & styling di depan cermin → Berangkat/beraktivitas dengan outfit ini (lokasi sesuai karakter produk: café/street/gym/kampus) → Momen detail bahan-tekstur terasa NATURAL saat dipakai beraktivitas → Final look percaya diri / CTA. Middle scenes show the outfit LIVING in the activity, not posing in a studio.
For each scene provide a short title in Indonesian and a CONCISE English prompt for an AI image generator that always includes the anchor (setting-world + model + outfit).
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`
      : `You are an expert fashion stylist storyboard artist. Generate a **${count}-part fashion item journey story** (storyboard) for the aspect ratio ${ratio}, no human faces (mannequin, flat-lay, or faceless detail shots only).

**FIRST, INVENT THE ANCHOR (then reuse it):** decide ONE setting-world (e.g. "minimal bedroom with warm window light, soft film grade") and REPEAT it in every prompt — all scenes must look like one continuous session in one place.

**STRUCTURE (NARRATIVE, NOT CATALOG):** Create ${count} sequential scenes telling one arc: Item baru tiba/tergantung rapi → Di-styling bertahap (flat-lay outfit lengkap tersusun) → Detail bahan & jahitan → Padu-padan dengan aksesori → Final presentation siap dipakai / CTA. Each scene continues visually from the previous one.
For each concept provide a short title in Indonesian and a CONCISE English prompt for the AI image generator that always includes the anchor setting.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`,
    imageSuffix: (model, prompt) => model
      ? `${prompt}, high-fashion editorial photography, professional studio lighting, sharp fabric detail, 8k, photorealistic`
      : `${prompt}, professional fashion product photography, clean styled composition, soft studio lighting, 8k, photorealistic`,
  });

  // === TAB: UNBOXING SCENE ===
  createReviewTab({
    prefix: 'unboxing',
    subject: 'product',
    filenamePrefix: 'unboxing',
    analyzingMsg: 'AI sedang menyusun scene unboxing...',
    descUserText: 'Buatkan deskripsi produk untuk gambar ini, fokus untuk konten unboxing.',
    descPrompt: `You are a professional affiliate reviewer. Analyze the product in the image and write a concise, exciting product description in Indonesian suitable for an unboxing video intro. Keep it under 500 characters.`,
    buildSystemPrompt: ({ count, ratio, model }) => model
      ? `You are an expert AI storyboard artist for UGC unboxing content. Analyze the product, description, and model to create a **${count}-part visual unboxing story** (storyboard) for the aspect ratio ${ratio}.

**CRITICAL VISUAL RULES FOR MODEL CONSISTENCY:**
1. One consistent professional setting for the whole unboxing; every scene shares the same background.
2. For ALL ${count} scenes, the model's hands (or the model) interact with the package/product — holding, opening, revealing, demonstrating.
3. The model must be the EXACT SAME person in ALL ${count} scenes — identical hands, skin tone, and appearance, as if filmed in one session.

**STRUCTURE UNBOXING:** Create ${count} sequential scenes (Kotak Tertutup / Hook → Buka Segel → Isi Paket Terlihat → Detail Produk → Reaksi / First Impression / CTA). Scenes must connect into a coherent unboxing journey.
For each scene provide a short title in Indonesian and a CONCISE English prompt for an AI image generator that includes the consistent model/hands description.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`
      : `You are an expert creative director for unboxing content. Generate a **${count}-part visual unboxing story** (storyboard) for the product for the aspect ratio ${ratio}. **No people or human parts.** Focus on the package and product. One consistent professional setting shared across every scene.

**STRUCTURE UNBOXING (PRODUCT-ONLY):** Create ${count} sequential scenes (Kotak Tertutup / Hook → Segel/Pembuka → Isi Paket Terlihat → Detail Produk → Final Presentation / CTA). Scenes must connect coherently.
For each concept provide a short title in Indonesian and a CONCISE English prompt for the AI image generator.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`,
    imageSuffix: (model, prompt) => model
      ? `${prompt}, cinematic UGC unboxing photography, cozy warm lighting, shallow depth of field, 8k, photorealistic`
      : `${prompt}, professional unboxing product photography, clean setup, cinematic lighting, no people, 8k, photorealistic`,
  });

  // === TAB: TUTORIAL / CARA PAKAI ===
  createReviewTab({
    prefix: 'tutorial',
    subject: 'product',
    filenamePrefix: 'tutorial',
    analyzingMsg: 'AI sedang menyusun langkah tutorial...',
    descUserText: 'Buatkan deskripsi produk untuk gambar ini, fokus untuk konten tutorial cara pakai.',
    descPrompt: `You are a professional product educator and affiliate content creator. Analyze the product in the image and write a concise description in Indonesian focused on HOW to use it: main function, key usage steps, and the end benefit. Keep it under 500 characters.`,
    buildSystemPrompt: ({ count, ratio, model }) => model
      ? `You are an expert tutorial content creator for social media. Analyze the product, description, and model to create a **${count}-part visual HOW-TO tutorial story** (storyboard) for the aspect ratio ${ratio}. The story teaches viewers how to use the product step by step, like a real creator's tutorial.

**CRITICAL VISUAL RULES FOR MODEL CONSISTENCY:**
1. The ENTIRE tutorial MUST take place in the same consistent setting; every scene shares the same background.
2. For ALL ${count} scenes, the model and the product MUST appear together — the model actively demonstrates each step (holding, applying, operating the product).
3. The model must be the EXACT SAME person in ALL ${count} scenes — identical gender, age, ethnicity, hair, clothing, and facial features, as if filmed in one continuous session. Always describe the model with the same details in every prompt.

**STRUCTURE TUTORIAL:** Create ${count} sequential scenes forming a complete how-to narrative (Hook masalah → Kenalan Produk → Langkah 1 → Langkah 2/3... → Hasil Akhir / CTA). Each middle scene demonstrates ONE clear step. Scenes must connect into a coherent lesson.
For each scene provide a short title in Indonesian (e.g. 'Langkah 1: Aplikasikan Tipis') and a CONCISE English prompt for an AI image generator that always includes the consistent model description.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`
      : `You are an expert tutorial content creator. Generate a **${count}-part visual HOW-TO tutorial story** (storyboard) for the product for the aspect ratio ${ratio}. **Absolutely no people, models, or human parts.** Focus on the product and its usage context. One consistent clean setting shared across every scene.

**STRUCTURE TUTORIAL (PRODUCT-ONLY):** Create ${count} sequential scenes forming a how-to narrative (Masalah/Konteks → Produk Intro → Langkah demi Langkah shown via product close-ups and arrangement → Hasil / CTA). Scenes must connect coherently.
For each concept provide a short title in Indonesian (e.g. 'Langkah 1: Siapkan Produk') and a CONCISE English prompt for the AI image generator.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`,
    imageSuffix: (model, prompt) => model
      ? `${prompt}, clear instructional photography, bright even lighting, step-by-step tutorial style, sharp focus on hands and product, 8k, photorealistic`
      : `${prompt}, clean instructional product photography, bright studio lighting, clear step-by-step composition, no people, 8k, photorealistic`,
  });

  // === TAB: DAY IN MY LIFE ===
  createReviewTab({
    prefix: 'daily',
    subject: 'product',
    filenamePrefix: 'daily',
    requireModel: true,
    analyzingMsg: 'AI sedang menyusun story harian...',
    descUserText: 'Buatkan deskripsi produk untuk gambar ini, fokus kapan dan bagaimana produk dipakai dalam keseharian.',
    descPrompt: `You are a lifestyle content creator. Analyze the product in the image and write a concise description in Indonesian that explains when and how this product fits naturally into a daily routine (morning/afternoon/evening moments). Keep it under 500 characters.`,
    buildSystemPrompt: ({ count, ratio, model }) => model
      ? `You are an expert lifestyle vlog storyboard artist. Analyze the product, description, and model to create a **${count}-part "Day in My Life" visual story** (storyboard) for the aspect ratio ${ratio}. The story follows ONE person through their day (morning → daytime → evening) with the product woven in NATURALLY — soft-selling, not a hard ad.

**CRITICAL VISUAL RULES FOR MODEL CONSISTENCY:**
1. The model must be the EXACT SAME person in ALL ${count} scenes — identical gender, age, ethnicity, hair, and facial features, as if one continuous vlog day. Outfit may change slightly only if the timeline justifies it (e.g. gym vs office), otherwise keep it consistent. Always describe the model with the same details in every prompt.
2. Locations may change with the time of day (bedroom → café → office → home), but keep ONE consistent color grade and visual mood across all scenes.
3. The product appears naturally in the scenes — being used, carried, or placed casually — at least in most scenes, with one clear "hero moment" scene for the product.

**STRUCTURE DAY IN MY LIFE:** Create ${count} sequential scenes following a daily timeline (Pagi/rutinitas bangun → Aktivitas siang → Momen produk terselip natural → Sore/malam → Penutup santai). Scenes must feel like one continuous vlog day.
For each scene provide a short title in Indonesian (e.g. 'Pagi: Mulai Hari') and a CONCISE English prompt for an AI image generator that always includes the consistent model description and the time-of-day lighting.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`
      : `Generate a **${count}-part lifestyle product story** (storyboard) for the aspect ratio ${ratio} showing the product in daily-life settings across one day (morning light → afternoon → evening), no people. Keep one consistent color grade. For each scene provide a short title in Indonesian and a CONCISE English prompt. Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`,
    imageSuffix: (model, prompt) => model
      ? `${prompt}, authentic lifestyle vlog photography, natural candid feel, soft realistic lighting matching time of day, 8k, photorealistic`
      : `${prompt}, lifestyle product photography, natural ambient lighting, candid everyday feel, no people, 8k, photorealistic`,
  });

  // === TAB: TESTIMONI PROBLEM-SOLUTION ===
  createReviewTab({
    prefix: 'testi',
    subject: 'product',
    filenamePrefix: 'testimoni',
    analyzingMsg: 'AI sedang menyusun story testimoni...',
    descUserText: 'Buatkan deskripsi produk untuk gambar ini, fokus masalah apa yang dipecahkan produk ini.',
    descPrompt: `You are a UGC ad copywriter. Analyze the product in the image and write a concise description in Indonesian framed as problem → solution: what everyday problem it solves and the outcome the user feels. Keep it under 500 characters.`,
    buildSystemPrompt: ({ count, ratio, model }) => model
      ? `You are an expert UGC testimonial storyboard artist. Analyze the product, description, and model to create a **${count}-part problem-solution testimonial story** (storyboard) for the aspect ratio ${ratio}. It must feel like an honest, relatable user testimonial — raw UGC style, NOT a polished studio ad.

**CRITICAL VISUAL RULES FOR MODEL CONSISTENCY:**
1. The ENTIRE story happens in the same natural home-like setting; every scene shares the same background and honest, unpolished lighting.
2. The model must be the EXACT SAME person in ALL ${count} scenes — identical gender, age, ethnicity, hair, clothing, and facial features. Always describe the model with the same details in every prompt.
3. Facial EXPRESSION arc is the heart of this story: frustrated/annoyed in the problem scenes → curious/hopeful when discovering the product → relieved/happy in the result scenes.

**STRUCTURE TESTIMONI:** Create ${count} sequential scenes forming a problem-solution arc (Scene keluhan/masalah terasa → Menemukan produk → Mencoba/memakai → Hasil terasa / perubahan → CTA testimoni puas). Scenes must connect into one believable personal story.
For each scene provide a short title in Indonesian (e.g. 'Scene 1: Masalahnya Kerasa') and a CONCISE English prompt for an AI image generator that always includes the consistent model description and the emotional expression for that beat.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`
      : `You are an expert UGC ad storyboard artist. Generate a **${count}-part problem-solution product story** (storyboard) for the aspect ratio ${ratio}. **No people or human parts.** Tell the arc visually with the product and its context (messy problem context → product arrives → product in use context → clean happy result). One consistent natural home-like setting, honest unpolished lighting.
For each concept provide a short title in Indonesian and a CONCISE English prompt for the AI image generator.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`,
    imageSuffix: (model, prompt) => model
      ? `${prompt}, authentic UGC smartphone-style photography, natural imperfect lighting, relatable candid realism, 8k, photorealistic`
      : `${prompt}, authentic UGC product photography, natural home lighting, honest candid style, no people, 8k, photorealistic`,
  });

  // === TAB: GRWM (GET READY WITH ME) ===
  createReviewTab({
    prefix: 'grwm',
    subject: 'beauty/fashion product',
    filenamePrefix: 'grwm',
    requireModel: true,
    analyzingMsg: 'AI sedang menyusun story GRWM...',
    descUserText: 'Buatkan deskripsi produk untuk gambar ini, fokus untuk konten GRWM (get ready with me).',
    descPrompt: `You are a beauty & fashion content creator. Analyze the product in the image and write a concise description in Indonesian for a GRWM video: what it is, at which step of getting ready it's used, and the look it helps achieve. Keep it under 500 characters.`,
    buildSystemPrompt: ({ count, ratio, model }) => model
      ? `You are an expert GRWM (Get Ready With Me) storyboard artist for TikTok beauty content. Analyze the product, description, and model to create a **${count}-part GRWM visual story** (storyboard) for the aspect ratio ${ratio}. The story shows ONE person getting ready, step by step, ending in a confident final look.

**CRITICAL VISUAL RULES FOR MODEL CONSISTENCY:**
1. The ENTIRE GRWM takes place in the same setting (vanity/bedroom); every scene shares the same background and lighting setup.
2. The model must be the EXACT SAME person in ALL ${count} scenes — identical gender, age, ethnicity, and facial features. Her/his appearance PROGRESSES logically: bare/simple at the start → gradually more done-up each scene → complete final look at the end. Hair and makeup continuity must carry over between consecutive scenes.
3. The product MUST get one clear hero scene where the model applies/uses it as a key step of the routine, and it may appear on the vanity in other scenes.

**STRUCTURE GRWM:** Create ${count} sequential scenes (Tampilan awal/wajah polos + hook → Tahapan skincare/makeup/outfit bertahap → Momen produk dipakai → Final look percaya diri → Selfie cermin / CTA). Scenes must read as one continuous getting-ready session.
For each scene provide a short title in Indonesian (e.g. 'Scene 1: Mulai Dari Polos') and a CONCISE English prompt for an AI image generator that always includes the consistent model description and the current stage of the transformation.
Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`
      : `Generate a **${count}-part getting-ready flat-lay story** (storyboard) for the aspect ratio ${ratio} showing the products of a get-ready routine arranged step by step, no people. One consistent vanity setting. For each scene provide a short title in Indonesian and a CONCISE English prompt. Respond ONLY with a valid JSON array of ${count} objects, in sequential story order.`,
    imageSuffix: (model, prompt) => model
      ? `${prompt}, beauty content creator photography, flattering ringlight glow, soft glam aesthetic, crisp detail on face and product, 8k, photorealistic`
      : `${prompt}, beauty product flat-lay photography, soft vanity lighting, aesthetic arrangement, no people, 8k, photorealistic`,
  });

  // === LOGIN SYSTEM (lisensi via GAS + Sheet) ===
  const LOGIN_CFG = {
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwQpKKxXYSLOKD6DOufkBoB4zbNiYaDfIMlyXX0vI7ALLiJhzV8flkWFerC8eqqftHS/exec",
    APP_SECRET: "03MOMUYHFoXdQ40YB6G3Q0yVl8Y5",
    PRODUCT_ID: "storyboard-studio-pro",
    BUY_LYNK_URL: "YOUR-LYNK-URL",
    BUY_MAYAR_URL: "YOUR-MAYAR-URL"
  };
  (function() {
    const overlay = document.getElementById('login-overlay');
    const emailInput = document.getElementById('login-email');
    const loginBtn = document.getElementById('login-btn');
    const errEl = document.getElementById('login-error');
    const loadingEl = document.getElementById('login-loading');
    const badge = document.getElementById('user-badge');
    let sesInterval = null;

    let deviceToken = localStorage.getItem('ssp_device');
    if (!deviceToken) {
      deviceToken = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now());
      localStorage.setItem('ssp_device', deviceToken);
    }

    const api = (action, email) => fetch(
      `${LOGIN_CFG.SCRIPT_URL}?action=${action}&email=${encodeURIComponent(email)}&token=${encodeURIComponent(deviceToken)}&app_secret=${encodeURIComponent(LOGIN_CFG.APP_SECRET)}&product=${LOGIN_CFG.PRODUCT_ID}`
    ).then(r => r.json());

    window.modelCloud = {
      _q(action, extra) {
        const email = localStorage.getItem('ssp_email') || '';
        return `${LOGIN_CFG.SCRIPT_URL}?action=${action}&email=${encodeURIComponent(email)}&token=${encodeURIComponent(deviceToken)}&app_secret=${encodeURIComponent(LOGIN_CFG.APP_SECRET)}${extra || ''}`;
      },
      async list() {
        const d = await fetch(this._q('model_list')).then(r => r.json());
        return d.status === 'SUKSES' ? (d.models || []) : null;
      },
      async get(id) {
        const d = await fetch(this._q('model_get', `&id=${encodeURIComponent(id)}`)).then(r => r.json());
        return d.status === 'SUKSES' ? d.base64 : null;
      },
      async del(id) {
        try {
          const d = await fetch(this._q('model_del', `&id=${encodeURIComponent(id)}`)).then(r => r.json());
          return d.status === 'SUKSES';
        } catch (e) { return false; }
      },
      async upload(rec) {
        const body = JSON.stringify({
          ssp_action: 'model_upload',
          app_secret: LOGIN_CFG.APP_SECRET,
          email: localStorage.getItem('ssp_email') || '',
          token: deviceToken,
          id: rec.id, name: rec.name, cfg: rec.cfg, base64: rec.base64
        });
        const d = await fetch(LOGIN_CFG.SCRIPT_URL, { method: 'POST', body }).then(r => r.json());
        return d.status === 'SUKSES';
      }
    };
    window.syncModels = async function () {
      if (!localStorage.getItem('ssp_email')) return;
      try {
        const server = await window.modelCloud.list();
        if (!server) return;
        const serverIds = new Set(server.map(m => String(m.id)));
        const local = await window.modelDB.list();
        const localIds = new Set(local.map(m => String(m.id)));
        for (const m of local) {
          if (m.cloud === true && !serverIds.has(String(m.id))) { await window.modelDB.remove(m.id); continue; }
          if (m.cloud === false) {
            try {
              const b64 = await window.blobToB64(m.blob);
              const ok = await window.modelCloud.upload({ id: m.id, name: m.name, cfg: m.cfg, base64: b64 });
              if (ok) await window.modelDB.put(Object.assign({}, m, { cloud: true }));
            } catch (e) {}
          }
        }
        for (const s of server) {
          if (!localIds.has(String(s.id))) {
            const b64 = await window.modelCloud.get(s.id);
            if (b64) await window.modelDB.put({ id: String(s.id), name: s.name, blob: window.b64ToBlob(b64, 'image/png'), mime: 'image/png', cfg: s.cfg, createdAt: s.createdAt, cloud: true });
          }
        }
      } catch (e) { console.error('syncModels:', e); }
      document.dispatchEvent(new CustomEvent('ssp-models-changed'));
    };

    function showError(msg) {
      errEl.textContent = msg;
      errEl.classList.remove('hidden');
    }
    function setLoading(on) {
      loadingEl.classList.toggle('hidden', !on);
      loginBtn.disabled = on;
    }
    function clearSession() {
      localStorage.removeItem('ssp_email');
      localStorage.removeItem('ssp_name');
    }
    function openApp(nama) {
      overlay.classList.add('hidden');
      badge.classList.remove('hidden');
      document.getElementById('user-name').textContent = nama;
      if (!sesInterval) sesInterval = setInterval(jagaSesi, 10000);
      if (window.syncModels) window.syncModels();
    }
    async function jagaSesi() {
      const email = localStorage.getItem('ssp_email');
      if (!email) return;
      try {
        const d = await api('cek', email);
        if (d.status === 'INVALID') {
          clearInterval(sesInterval);
          await window.uiNotify('Sesi berakhir. Akun ini login di perangkat lain.');
          clearSession();
          location.reload();
        }
      } catch (e) {}
    }

    loginBtn.addEventListener('click', async () => {
      errEl.classList.add('hidden');
      const email = emailInput.value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('Format email tidak valid.'); return; }
      setLoading(true);
      try {
        const d = await api('login', email);
        if (d.status === 'SUKSES') {
          localStorage.setItem('ssp_email', email);
          localStorage.setItem('ssp_name', d.nama || email);
          openApp(d.nama || email);
        } else {
          showError(d.message || 'Gagal terhubung ke server. Coba lagi.');
        }
      } catch (e) {
        showError('Gagal terhubung ke server. Coba lagi.');
      }
      setLoading(false);
    });
    emailInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') loginBtn.click(); });

    document.getElementById('logout-btn').addEventListener('click', async () => {
      const email = localStorage.getItem('ssp_email');
      clearInterval(sesInterval);
      if (email) { try { await api('logout', email); } catch (e) {} }
      clearSession();
      location.reload();
    });

    const lynkBtn = document.getElementById('buy-lynk-btn');
    const mayarBtn = document.getElementById('buy-mayar-btn');
    if (LOGIN_CFG.BUY_LYNK_URL.indexOf('YOUR-') === -1) {
      lynkBtn.classList.remove('hidden');
      lynkBtn.addEventListener('click', () => { try { window.open(LOGIN_CFG.BUY_LYNK_URL, '_blank', 'noopener'); } catch (e) {} });
    }
    if (LOGIN_CFG.BUY_MAYAR_URL.indexOf('YOUR-') === -1) {
      mayarBtn.classList.remove('hidden');
      mayarBtn.addEventListener('click', () => { try { window.open(LOGIN_CFG.BUY_MAYAR_URL, '_blank', 'noopener'); } catch (e) {} });
    }

    const savedEmail = localStorage.getItem('ssp_email');
    const savedName = localStorage.getItem('ssp_name');
    if (savedEmail && savedName) {
      setLoading(true);
      api('cek', savedEmail)
        .then(d => {
          setLoading(false);
          if (d.status === 'VALID') openApp(savedName);
          else { clearSession(); }
        })
        .catch(() => { setLoading(false); openApp(savedName); });
    }
  })();

  applyLanguage();
  switchTab('product-review');
});
