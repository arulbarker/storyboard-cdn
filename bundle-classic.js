
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
    cinematic: 'AUDIO: No narration or dialogue. Mood-driven cinematic background music that drives the pacing, with thin ambient sound effects only.',
    timelapse: 'AUDIO: No human speech, voiceover, or dialogue at all. The footage plays as a fast time-lapse of the process; drive it with upbeat, rhythmic background music synced to the rapid progress, layered with light natural ambient and subtle whoosh SFX. Any label, name, or text appears on-screen only.'
  };
  const LANG_LABEL = { id: 'Indonesian', en: 'English' };
  // Gaya audio TANPA suara orang bicara sama sekali (musik + SFX saja)
  const NO_SPEECH_STYLES = ['asmr', 'cinematic', 'timelapse'];
  window.audioSpeechRule = function (audioStyle, audioLang) {
    return NO_SPEECH_STYLES.includes(audioStyle)
      ? 'STRICTLY NO human speech, voiceover, dialogue, or narration of any kind — nobody talks at all. The audio is ONLY music and sound effects. Any product name, slogan, or tagline may appear ONLY as on-screen text/graphics, never spoken.'
      : `Any spoken words (dialogue or narration) MUST be written in ${LANG_LABEL[audioLang] || 'Indonesian'}, wrapped in double quotes. Auto-extract the product name and any slogan/tagline from the context and weave them into the speech naturally (place the slogan on the final/CTA beat).`;
  };

  // === DURATION ENGINE ===
  // Mode Durasi Video: 1 foto ≈ 2 detik video. Satu klip = satu generate di platform image-to-video.
  window.VIDEO_PLATFORMS = {
    omni:     { label: 'Gemini Omni', perClip: 5, clipSec: 10 },
    seedance: { label: 'Seedance',    perClip: 7, clipSec: 14 }
  };
  window.MAX_STORY_CLIPS = 20;
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

    // Lanjutkan Cerita: perpanjang story +1 klip dari scene terakhir (Mode Durasi, maks window.MAX_STORY_CLIPS)
    const continueBtn = document.createElement('button');
    continueBtn.type = 'button';
    continueBtn.id = `${p}-continue-btn`;
    continueBtn.className = 'w-full btn-secondary font-bold py-3 px-6 rounded-xl mt-6 hidden items-center justify-center';
    grid.insertAdjacentElement('afterend', continueBtn);
    function hideContinueBtn() { continueBtn.classList.add('hidden'); continueBtn.classList.remove('flex'); }
    function updateContinueBtn() {
      if (!durState.on) { hideContinueBtn(); return; }
      const n = grid.querySelectorAll('.result-card').length;
      if (!n) { hideContinueBtn(); return; }
      const plan = window.clipPlan(durState.platform, durState.duration);
      const clips = Math.ceil(n / plan.perClip);
      if (clips >= window.MAX_STORY_CLIPS) { hideContinueBtn(); return; }
      continueBtn.innerHTML = `<i class="fas fa-forward mr-2"></i>Lanjutkan Cerita (+1 klip · ${plan.clipSec} dtk) — Klip ${clips + 1}/${window.MAX_STORY_CLIPS}`;
      continueBtn.classList.remove('hidden');
      continueBtn.classList.add('flex');
    }
    continueBtn.addEventListener('click', async () => {
      if (!durState.on) return;
      const all = Array.from(grid.querySelectorAll('.result-card'));
      if (!all.length) return;
      const plan = window.clipPlan(durState.platform, durState.duration);
      const clips = Math.ceil(all.length / plan.perClip);
      if (clips >= window.MAX_STORY_CLIPS) { hideContinueBtn(); return; }
      const orig = continueBtn.innerHTML;
      continueBtn.disabled = true;
      continueBtn.innerHTML = '<div class="loader"></div><span class="ml-2">Melanjutkan cerita...</span>';
      try {
        const lastCard = all[all.length - 1];
        const ideas = await analyzeAndGetPrompts({
          titles: all.map(c => c.dataset.title || 'Scene'),
          last: { title: lastCard.dataset.title || 'Scene', prompt: lastCard.dataset.prompt || '' },
          nextClip: clips + 1, plan
        });
        const batch = ideas.slice(0, plan.perClip);
        if (!batch.length) throw new Error('Storyboard lanjutan kosong.');
        const startAt = all.length;
        buildCards(batch, startAt);
        await Promise.allSettled(batch.map((idea, j) => generateSingle(startAt + j + 1, idea.title, idea.prompt)));
      } catch (err) {
        console.error(err);
        window.uiNotify('Gagal melanjutkan cerita: ' + err.message);
      } finally {
        continueBtn.disabled = false;
        continueBtn.innerHTML = orig;
        updateContinueBtn();
      }
    });

    // Tombol "Semua Prompt Video" di samping Unduh Semua (dibuat dinamis)
    // Gaya audio + bahasa untuk prompt video (global per fitur)
    let audioStyle = cfg.defaultAudio || 'voiceover';
    let audioLang = 'id';
    let videoAllBtn = null, audioStyleSel = null, audioLangBtn = null, captionBtn = null;
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
      audioStyleSel.innerHTML = '<option value="ugc">🎤 Model bicara (UGC)</option><option value="ugc_music">🎤🎶 Model bicara + musik</option><option value="voiceover">🗣️ Voiceover narasi</option><option value="asmr">🔊 ASMR + musik</option><option value="cinematic">🎬 Sinematik musik</option><option value="timelapse">⏩ Timelapse (tanpa narasi)</option>';
      audioStyleSel.value = audioStyle;
      audioStyleSel.addEventListener('change', () => { audioStyle = audioStyleSel.value; });

      audioLangBtn = document.createElement('button');
      audioLangBtn.type = 'button';
      audioLangBtn.id = `${p}-audio-lang`;
      audioLangBtn.className = 'btn-secondary text-sm font-semibold py-2 px-3 rounded-lg hidden';
      const renderLang = () => { audioLangBtn.innerHTML = `<i class="fas fa-language mr-1"></i>${audioLang.toUpperCase()}`; };
      renderLang();
      audioLangBtn.addEventListener('click', () => { audioLang = audioLang === 'id' ? 'en' : 'id'; renderLang(); });

      captionBtn = document.createElement('button');
      captionBtn.type = 'button';
      captionBtn.id = `${p}-caption-btn`;
      captionBtn.className = 'btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden';
      captionBtn.innerHTML = '<i class="fas fa-hashtag mr-1"></i>Caption';
      captionBtn.addEventListener('click', () => showCaptionModal());

      wrap.appendChild(audioStyleSel);
      wrap.appendChild(audioLangBtn);
      wrap.appendChild(captionBtn);
      wrap.appendChild(videoAllBtn);
      wrap.appendChild(downloadAllBtn);
    }

    let selectedCount = 4;
    let images = [];
    let modelBase64 = null, modelMime = null;

    function ratio() { return document.querySelector(`#${p}-ratio-selection .ratio-btn.selected`)?.dataset.ratio || '16:9'; }
    function currentTheme() {
      if (themeGrid) return selectedTheme === 'custom' ? (themeInput ? themeInput.value.trim() : '') : selectedTheme.trim();
      return themeInput ? themeInput.value.trim() : '';
    }
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
      if (pb) { durState.platform = pb.dataset.platform; hideContinueBtn(); }
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
      hideContinueBtn();
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

    async function analyzeAndGetPrompts(continueFrom = null) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const r = ratio();
      let systemPrompt = cfg.buildSystemPrompt({ count: continueFrom ? continueFrom.plan.perClip : effectiveCount(), ratio: r, model: !!modelBase64 });
      if (durState.on && !continueFrom) {
        const plan = window.clipPlan(durState.platform, durState.duration);
        systemPrompt += `\n\n**CLIP STRUCTURE (IMPORTANT):** These ${plan.photos} scenes will become ${plan.clips} separate video clip(s) of ${plan.clipSec} seconds each (${plan.perClip} scenes per clip, ~2 seconds per scene). Structure the story as ${plan.clips} chapter(s) of ONE continuous narrative, one chapter per clip. The LAST scene of each chapter must work as a smooth narrative AND visual bridge into the first scene of the next chapter, so separately generated clips cut together seamlessly in an editor.`;
      }
      if (continueFrom) {
        const done = continueFrom.titles.length;
        systemPrompt += `\n\n**CONTINUATION (IMPORTANT — THIS OVERRIDES ANY RULE ABOVE ABOUT STARTING AT THE VERY BEGINNING OR ENDING AT THE FINAL/CTA BEAT):** The story already exists and must NOT be restarted. Scenes so far, in order:\n${continueFrom.titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}\nThe story currently ends at scene ${done}: "${continueFrom.last.title}" — its image prompt was: "${continueFrom.last.prompt}".\nNow write ONLY the NEXT ${continueFrom.plan.perClip} scenes (scene ${done + 1}–${done + continueFrom.plan.perClip}) that CONTINUE this same story seamlessly as video clip ${continueFrom.nextClip} (${continueFrom.plan.clipSec} seconds, ~2 seconds per scene). Keep the EXACT same product, person/model identity, setting, lighting and style as the existing scenes. Do NOT restart the story, do NOT repeat existing scenes, and do NOT force a closing/CTA beat; the first new scene must flow directly on from that last scene, and the last new scene should end on a natural pause that can be continued again.`;
      }
      const theme = currentTheme();
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

    function buildCards(prompts, startAt = 0) {
      if (!startAt) grid.innerHTML = '';
      grid.dataset.captionCache = '';
      const ac = aspectClass(ratio());
      const plan = durState.on ? window.clipPlan(durState.platform, durState.duration) : null;
      prompts.forEach((pr, i) => {
        const gi = startAt + i;
        if (plan && gi % plan.perClip === 0) {
          const clipIdx = gi / plan.perClip + 1;
          const end = Math.min(gi + plan.perClip, startAt + prompts.length);
          const h = document.createElement('div');
          h.className = 'clip-divider';
          h.id = `${p}-clip-${clipIdx}`;
          h.innerHTML = `<span><i class="fas fa-clapperboard mr-1"></i>Klip ${clipIdx} — Scene ${gi + 1}–${end} · ${plan.clipSec} dtk</span><span class="flex items-center gap-2"><button type="button" data-action="${p}-clip-download" data-clip="${clipIdx}" class="action-btn bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-download mr-1 pointer-events-none"></i>Unduh</button><button type="button" data-action="${p}-clip-prompt" data-clip="${clipIdx}" class="action-btn bg-fuchsia-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-film mr-1 pointer-events-none"></i>Prompt Klip</button></span>`;
          grid.appendChild(h);
        }
        const card = document.createElement('div');
        card.id = `${p}-card-${gi + 1}`;
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
              <button data-action="${p}-editprompt" data-scene-id="${id}" class="action-btn bg-amber-500 text-white px-3 py-2 rounded-lg" title="Edit Prompt"><i class="fas fa-pen pointer-events-none"></i></button>
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
      hideContinueBtn();
      const orig = generateBtn.innerHTML;
      generateBtn.innerHTML = '<div class="loader"></div><span class="ml-2">Menganalisa...</span>';
      downloadAllBtn.classList.add('hidden');
      if (videoAllBtn) videoAllBtn.classList.add('hidden');
      if (captionBtn) captionBtn.classList.add('hidden');
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
      else { downloadAllBtn.classList.remove('hidden'); if (videoAllBtn) videoAllBtn.classList.remove('hidden'); if (audioStyleSel) audioStyleSel.classList.remove('hidden'); if (audioLangBtn) audioLangBtn.classList.remove('hidden'); if (captionBtn) captionBtn.classList.remove('hidden'); updateContinueBtn(); }
    });

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]'); if (!btn) return;
      if (btn.dataset.action === `${p}-clip-prompt`) {
        const k = parseInt(btn.dataset.clip, 10);
        const plan = window.clipPlan(durState.platform, durState.duration);
        const n = Math.min(plan.perClip, grid.querySelectorAll('.result-card').length - (k - 1) * plan.perClip);
        showChoiceModal(`Prompt Klip ${k} bentuk apa?`, [
          { label: `<i class="fas fa-image mr-2"></i>Per Scene — ${n} prompt (1 foto = 1 generate video)`, onPick: () => generateAllVideoPrompts(k) },
          { label: `<i class="fas fa-clapperboard mr-2"></i>Per Klip — 1 prompt (${n} foto = 1 klip ${plan.clipSec} dtk)`, onPick: () => generateClipPrompt(k) }
        ]);
        return;
      }
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
      else if (btn.dataset.action === `${p}-editprompt` && card) showEditPromptModal(id);
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

    function showEditPromptModal(id) {
      const card = document.getElementById(`${p}-card-${id}`); if (!card) return;
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-3"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-pen text-amber-500 mr-2"></i>Edit Prompt Gambar</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-2">Ubah prompt gambar scene ini, lalu klik <strong>Simpan</strong>. Tekan tombol <strong>Regenerate</strong> di kartu untuk membuat ulang gambar dengan prompt baru.</p>
        <textarea data-editp rows="7" class="w-full p-3 border-2 border-gray-200 rounded-lg text-sm font-mono resize-none focus:border-violet-500 transition">${window.escHtml(card.dataset.prompt || '')}</textarea>
        <div class="flex gap-2 mt-4"><button data-save class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-floppy-disk mr-1"></i>Simpan</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm">Batal</button></div>
      </div>`;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
      modal.querySelector('[data-save]').addEventListener('click', () => {
        const v = modal.querySelector('[data-editp]').value.trim();
        if (v) card.dataset.prompt = v;
        close();
      });
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
6. ${window.audioSpeechRule(audioStyle, audioLang)}
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
6. ${window.audioSpeechRule(audioStyle, audioLang)}
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

    // === CAPTION ===
    async function requestCaption() {
      const cards = Array.from(grid.querySelectorAll('.result-card')).filter(c => c.dataset.title);
      if (!cards.length) throw new Error('Belum ada scene — generate story dulu.');
      const cacheKey = audioLang;
      let cache = {};
      try { cache = JSON.parse(grid.dataset.captionCache || '{}'); } catch (e) { cache = {}; }
      if (cache[cacheKey]) return { text: cache[cacheKey], cached: true };
      const storyList = cards.map((c, i) => `${i + 1}. ${c.dataset.title || 'Scene'}`).join('\n');
      const theme = currentTheme();
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const systemPrompt = `You are a social media copywriter for short-form video (TikTok, Instagram Reels, Shopee Video). Write ready-to-post captions in ${LANG_LABEL[audioLang] || 'Indonesian'} for ONE final ${cfg.subject} video assembled from the storyboard below.

Output EXACTLY this structure, using these exact delimiter lines:

=== SOFT-SELLING ===
(caption: relatable opening hook + short value points + soft CTA)
=== STORYTELLING ===
(caption: narrative hook that follows the storyboard arc + CTA)
=== HARD-SELLING ===
(caption: direct benefit hook + urgency + strong CTA)
=== HASHTAG ===
(one line: 10-15 hashtags, mix niche hashtags from the product/category with popular general ones)

Rules:
1. Auto-extract the product name and any slogan/tagline from the product context and weave them in naturally.
2. Each caption: hook on the first line, 2-4 short lines total, tasteful emoji allowed, ready to paste as-is.
3. Match the mood to the photo theme if given.
4. Output ONLY the structure above — no explanations, no extra markdown.`;
      const userText = `Product/subject context: "${descInput.value.trim()}".${theme ? ` Photo theme/mood: "${theme}".` : ''} Storyboard of the final video, in order:\n${storyList}`;
      const payload = { contents: [{ parts: [{ text: userText }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
      const result = await (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).json();
      const text = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
      if (!text) throw new Error('Caption kosong dari API.');
      cache[cacheKey] = text;
      grid.dataset.captionCache = JSON.stringify(cache);
      return { text };
    }

    function parseCaptionText(text) {
      const secs = [
        { key: 'soft', label: 'Soft-Selling', re: /===\s*SOFT-SELLING\s*===([\s\S]*?)(?====|$)/i },
        { key: 'story', label: 'Storytelling', re: /===\s*STORYTELLING\s*===([\s\S]*?)(?====|$)/i },
        { key: 'hard', label: 'Hard-Selling', re: /===\s*HARD-SELLING\s*===([\s\S]*?)(?====|$)/i },
        { key: 'hashtag', label: 'Hashtag', re: /===\s*HASHTAG\s*===([\s\S]*?)(?====|$)/i }
      ];
      const out = [];
      secs.forEach(s => { const m = text.match(s.re); if (m && m[1].trim()) out.push({ key: s.key, label: s.label, body: m[1].trim() }); });
      return out.length ? out : [{ key: 'all', label: 'Caption', body: text }];
    }

    function showCaptionModal() {
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const loadingHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-4 text-gray-800"><i class="fas fa-hashtag text-cyan-500 mr-2"></i>Membuat Caption...</h3><div class="flex items-center justify-center py-8"><div class="loader"></div></div></div>`;
      modal.innerHTML = loadingHTML;
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      async function run() {
        modal.innerHTML = loadingHTML;
        try {
          const { text } = await requestCaption();
          const parts = parseCaptionText(text);
          const blocks = parts.map((s, i) => `
            <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-3">
              <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">${window.escHtml(s.label)}</span><button data-copyone="${i}" class="text-xs bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>Copy</button></div>
              <textarea data-cap="${i}" rows="${s.key === 'hashtag' ? 3 : 5}" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm resize-none">${window.escHtml(s.body)}</textarea>
            </div>`).join('');
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
            <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-hashtag text-cyan-500 mr-2"></i>Caption Video</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
            ${blocks}
            <div class="flex gap-2">
              <button data-copyall class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-copy mr-1"></i>Copy Semua</button>
              <button data-txt class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-download mr-1"></i>Unduh .txt</button>
            </div>
          </div>`;
          modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
          modal.querySelectorAll('[data-copyone]').forEach(btn => btn.addEventListener('click', () => {
            const ta = modal.querySelector(`[data-cap="${btn.dataset.copyone}"]`);
            const ok = window.copyText(ta.value);
            if (!ok) { ta.focus(); ta.select(); }
            btn.innerHTML = ok ? '<i class="fas fa-check mr-1 pointer-events-none"></i>Tersalin!' : '<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>Tekan Ctrl+C';
            setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy mr-1 pointer-events-none"></i>Copy'; }, 2000);
          }));
          const aggregate = () => parts.map(s => `# ${s.label}\n${s.body}`).join('\n\n');
          const copyAllBtn = modal.querySelector('[data-copyall]');
          copyAllBtn.addEventListener('click', () => {
            const ok = window.copyText(aggregate());
            copyAllBtn.innerHTML = ok ? '<i class="fas fa-check mr-1"></i>Tersalin!' : '<i class="fas fa-download mr-1"></i>Pakai Unduh .txt';
            setTimeout(() => { copyAllBtn.innerHTML = '<i class="fas fa-copy mr-1"></i>Copy Semua'; }, 2200);
          });
          modal.querySelector('[data-txt]').addEventListener('click', () => {
            const b = new Blob([aggregate()], { type: 'text/plain' });
            const u = URL.createObjectURL(b);
            window.downloadDataURINew(u, `${cfg.filenamePrefix}_caption.txt`);
            setTimeout(() => URL.revokeObjectURL(u), 1500);
          });
        } catch (err) {
          console.error('caption error', err);
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-3 text-red-600"><i class="fas fa-triangle-exclamation mr-2"></i>Gagal membuat caption</h3><p class="text-gray-700 text-sm mb-4">${window.escHtml(err.message)}</p><div class="flex gap-2"><button data-retry class="flex-1 btn-primary py-2 rounded-lg font-semibold"><i class="fas fa-rotate-right mr-1"></i>Coba Lagi</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold">Tutup</button></div></div>`;
          modal.querySelector('[data-close]').addEventListener('click', close);
          modal.querySelector('[data-retry]').addEventListener('click', run);
        }
      }
      run();
    }
    // === END CAPTION ===

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

    async function generateAllVideoPrompts(clipIdx) {
      const allCards = Array.from(grid.querySelectorAll('.result-card'));
      let pool = allCards;
      if (clipIdx) {
        const plan = window.clipPlan(durState.platform, durState.duration);
        pool = allCards.slice((clipIdx - 1) * plan.perClip, clipIdx * plan.perClip);
      }
      const cards = pool.filter(c => c.querySelector('img'));
      if (!cards.length) return;
      const total = cards.length;
      const sceneNo = (card) => allCards.indexOf(card) + 1;
      const sceneTotal = allCards.length;
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[88vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-2"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>${clipIdx ? `Prompt Per Scene — Klip ${clipIdx}` : 'Semua Prompt Video'} (${total} scene)</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
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
        return resultsByIdx.map((r) => r ? `# Scene ${r.no}/${sceneTotal}: ${r.title}\n${r.vp}` : null).filter(Boolean).join('\n\n');
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
        window.downloadDataURINew(u, `${cfg.filenamePrefix}${clipIdx ? `_klip${clipIdx}` : ''}_video_prompts.txt`);
        setTimeout(() => URL.revokeObjectURL(u), 1500);
      });

      async function runBlock(i, card, ta, st, retryBtn) {
        st.innerHTML = '<span class="loader !w-4 !h-4 !border-2 inline-block"></span>';
        retryBtn.classList.add('hidden');
        try {
          const r = await requestVideoPrompt(card); // story-aware: baca posisi scene + prev/next dari DOM
          ta.value = r.vp;
          resultsByIdx[i] = { no: sceneNo(card), title: card.dataset.title || `Scene ${i + 1}`, vp: r.vp };
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
        block.innerHTML = `<div class="flex items-center justify-between mb-1"><span class="text-sm font-semibold text-gray-700">Scene ${sceneNo(card)}/${sceneTotal}: ${window.escHtml(title)}</span><span class="flex items-center gap-2"><button data-copyone class="text-xs bg-violet-500 hover:bg-violet-600 text-white px-2 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>Copy</button><button data-retry class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-2 py-1 rounded-full hidden"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>Coba Lagi</button><span data-st><span class="loader !w-4 !h-4 !border-2 inline-block"></span></span></span></div><textarea rows="5" readonly class="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 text-xs font-mono resize-none" data-ta></textarea>`;
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

  // === VIRAL STUDIO ===
  // Fitur video proses/transformasi viral. B-copy dari createReviewTab (mesin durasi/
  // prompt video/caption disalin), diramping: text-to-image, tanpa upload/model.
  window.buildViralPrompt = function (cfg, sel, { count, showcase: forcedShowcase }) {
    const picks = Object.entries(sel)
      .filter(([k]) => k !== 'custom')
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    const subject = cfg.custom ? sel.custom : cfg.subject;
    const showcase = forcedShowcase !== undefined ? forcedShowcase : (count > 5 ? 2 : (count >= 3 ? 1 : 0));
    return `You are an expert short-form viral video storyboard artist. Create a **${count}-scene visual PROCESS/TRANSFORMATION story** (storyboard) for a satisfying viral short video.

**THE PROCESS:** ${subject}.
**TRANSFORMATION ARC:** ${cfg.arc}. ${showcase ? `Spread this arc evenly across scenes 1–${count - showcase}: begin at the very start, show clear step-by-step change, and the process must be FULLY COMPLETED at scene ${count - showcase} (the finished/reveal moment).` : `Spread this arc evenly across all ${count} scenes: begin at the very start, show clear step-by-step change, end at the finished/reveal moment.`}
${picks ? `**USER CHOICES:** ${picks}. Honor these exactly in every scene.\n` : ''}
**SUBJECT LOCK (CRITICAL):** The main subject, objects, tools, setting, lighting style and camera framing MUST stay perfectly consistent across ALL ${count} scenes — as if filmed in one continuous take, only the stage of the process advances. Repeat the same detailed subject description in every scene prompt so separately generated images look like one continuous video.
${showcase ? `\n**SHOWCASE ENDING:** the last ${showcase} scene(s) show the FINISHED result being showcased — beautifully displayed/staged in its setting, cinematic professional close-up shots from new flattering angles. NO new process steps in these scenes; the work is done, this is the payoff for the viewer.\n` : ''}
**STRUCTURE:** ${count} scenes in strict chronological order of the process. Each scene = one clear step forward.${showcase ? '' : ' The final scene delivers the satisfying "reveal" payoff.'}
For each scene provide a short Indonesian title (e.g. 'Scene 1: Awal') and a CONCISE English prompt for an AI image generator that always repeats the locked subject description.
Respond ONLY with a valid JSON array of ${count} objects with keys "title" and "prompt", in sequential story order.`;
  };

  window.buildCarCrashPrompt = function (cfg, sel, { count }) {
    const ARCS = {
      'Crash tabrakan': 'the vehicle accelerates fast → approaches the obstacle → violent impact → the body crumples and parts fly off → smoking wreck aftermath',
      'Obstacle rintangan gila': 'the vehicle starts → clears obstacle after obstacle taking progressive damage → nearly falls apart → barely survives or breaks apart at the final obstacle',
      'Downhill / terjun ramp': 'the vehicle at the very top → rolls down faster and faster → launches into the air off the ramp → slams and crashes on landing',
      'vs Objek raksasa': 'a giant object approaches the vehicle → first heavy collision → dramatic soft-body destruction → the crushed remains settle',
      'Demolition derby': 'many cars ram each other in an arena → escalating chaos and wreckage → dust and debris everywhere → one battered car remains',
      'Balapan chaos': 'a tight race → cars clip and touch → a chain-reaction pile-up crash → a chaotic wrecked finish',
    };
    const action = (sel['jenis aksi'] && sel['jenis aksi'] !== '__random__') ? sel['jenis aksi'] : null;
    const arc = (action && ARCS[action]) || 'the vehicle in motion → dramatic physics action builds up → peak crash impact → dramatic wreck aftermath';
    const picks = Object.entries(sel)
      .filter(([k]) => k !== 'custom')
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    return `You are an expert short-form viral video storyboard artist specializing in realistic car-crash physics/destruction videos (soft-body deformation style). Create a **${count}-scene visual CRASH/DESTRUCTION story** (storyboard) for a satisfying viral short video.

**THE ACTION:** ${cfg.subject}.
**PHYSICS ARC:** ${arc}. Spread this arc evenly across all ${count} scenes: begin before the action, show the destruction escalate step by step with realistic soft-body deformation (progressive denting, shattering glass, flying parts, motion blur, dust/sparks/smoke), and END on the dramatic crash climax or wreck aftermath — NOT a clean finished product.
${picks ? `**USER CHOICES:** ${picks}. Honor these exactly in every scene.\n` : ''}**SUBJECT LOCK (CRITICAL):** The exact vehicle (model + color), the arena/location, lighting style and camera treatment MUST stay perfectly consistent across ALL ${count} scenes — as if filmed in one continuous take, only the moment of the crash advances. Repeat the same detailed vehicle + setting description in every scene prompt so separately generated images look like one continuous video.
**CONTENT SAFETY:** Focus ONLY on vehicles and physics destruction. NO people getting hurt, NO drivers/passengers in danger, NO blood or gore — clean, monetization-safe crash simulation like the game itself.

**STRUCTURE:** ${count} scenes in strict chronological order of the crash sequence. Each scene = one clear moment forward. The final scene delivers the dramatic impact/aftermath payoff.
For each scene provide a short Indonesian title (e.g. 'Scene 1: Melaju') and a CONCISE English prompt for an AI image generator that always repeats the locked vehicle + setting description.
Respond ONLY with a valid JSON array of ${count} objects with keys "title" and "prompt", in sequential story order.`;
  };

  window.buildDollCraftPrompt = function (cfg, sel, { count, showcase: forcedShowcase }) {
    const picks = Object.entries(sel)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    const showcase = forcedShowcase !== undefined ? forcedShowcase : (count > 5 ? 2 : (count >= 3 ? 1 : 0));
    return `You are an expert stop-motion DIY craft storyboard artist. Create a **${count}-scene visual CRAFTING PROCESS story** (storyboard) showing ONE miniature handmade doll being built step by step, for a satisfying viral short video.

**THE CRAFT:** ${cfg.subject}.
${picks ? `**USER CHOICES:** ${picks}. Honor these exactly in every scene.\n` : ''}
**DOLL DESIGN SHEET (DO THIS FIRST):** Before writing any scene, invent ONE fixed doll design from the user choices and write it as one reusable description: skin pipe-cleaner color, yarn hair color + style, cute anime-style face with big eyes, every clothing piece with its exact color (each piece handmade from pipe cleaners), and accessories. Also fix ONE desk description: wooden craft desk, the visible tools and materials, warm cozy lighting, soft-focus room decor behind. You will reuse BOTH descriptions in every scene.

**SUBJECT LOCK (CRITICAL):** The same pair of hands, the same desk description and the SAME doll design sheet appear in ALL ${count} scenes — as if filmed in one continuous take, only the build progress advances. Every scene prompt MUST repeat the doll design sheet + desk description word-for-word so separately generated images look like one continuous video.

**MATERIAL & SCALE LOCK (CRITICAL):** The doll is a MINIATURE about 15 cm tall, always small in the hands. The doll and ALL its clothes are handmade ONLY from crumpled aluminum foil, fuzzy chenille pipe cleaners and yarn — the fuzzy pipe-cleaner texture must stay clearly visible. NEVER real fabric or sewn cloth, NEVER human-sized clothing, NEVER a factory-made plastic doll (no Barbie-like glossy doll) — in every scene it must look like a handmade pipe-cleaner craft.

**BUILD-STAGE LOCK:** Follow this exact build order, spread evenly across scenes 1–${count - showcase}: ${cfg.arc}. Each scene shows ONLY the parts that exist at that stage (early scenes: bare foil armature; middle scenes: partially wrapped body or unfinished clothes ON the doll). The doll must be FULLY COMPLETED at scene ${count - showcase} — the reveal payoff, standing upright on the desk.${showcase ? `

**SHOWCASE ENDING:** the last ${showcase} scene(s) show the FINISHED doll being showcased — posed and displayed proudly on the desk, cinematic professional close-up shots of its face and outfit details from new flattering angles (hands may gently present or turn it). NO new building steps in these scenes; the craft is done, this is the payoff for the viewer.` : ''}

**STRUCTURE:** ${count} scenes in strict chronological build order${showcase ? ` (hands actively working in scenes 1–${count - showcase})` : ', hands actively working in each scene'}. For each scene provide a short Indonesian title (e.g. 'Scene 1: Kerangka Foil') and a CONCISE English prompt for an AI image generator that always repeats the locked doll design sheet + desk description and states the exact build stage.
Respond ONLY with a valid JSON array of ${count} objects with keys "title" and "prompt", in sequential story order.`;
  };

  window.buildBottleCraftPrompt = function (cfg, sel, { count, showcase: forcedShowcase }) {
    const picks = Object.entries(sel)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    const showcase = forcedShowcase !== undefined ? forcedShowcase : (count > 5 ? 2 : (count >= 3 ? 1 : 0));
    return `You are an expert DIY recycling craft storyboard artist. Create a **${count}-scene visual CRAFTING PROCESS story** (storyboard) showing ONE cute display figure being built step by step from recycled plastic bottles, for a satisfying viral short video.

**THE CRAFT:** ${cfg.subject}.
${picks ? `**USER CHOICES:** ${picks}. Honor these exactly in every scene.\n` : ''}
**CRAFT DESIGN SHEET (DO THIS FIRST):** Before writing any scene, invent ONE fixed figure design from the user choices and write it as one reusable description: the overall shape, which bottle part forms each body part (e.g. bumpy ridged bottle bottoms for a turtle shell), the exact bottle color of every part, the twine/paint/marker decorations and the drawn face. Also fix ONE desk description: rustic wooden craft desk, the visible tools (scissors, sandpaper, hot glue gun, rustic twine, small brush, paint, black marker), small potted plants and warm bokeh fairy lights behind, warm natural light from a side window. You will reuse BOTH descriptions in every scene.

**SUBJECT LOCK (CRITICAL):** The same pair of hands with neat nails, the same desk description and the SAME craft design sheet appear in ALL ${count} scenes — as if filmed in one continuous take, only the build progress advances. Every scene prompt MUST repeat the craft design sheet + desk description word-for-word so separately generated images look like one continuous video.

**MATERIAL LOCK (CRITICAL):** The figure is handmade ONLY from cut recycled plastic bottles joined with hot glue, decorated with rustic twine, acrylic paint and marker — the translucent/colored plastic texture, the bumpy ridged bottle bottoms and the visible glued seams must stay clearly visible. NEVER a factory-made toy, NEVER ceramic, resin or smooth seamless molded plastic — in every scene it must look like a handmade recycled-bottle craft.

**BUILD-STAGE LOCK:** Follow this exact build order, spread evenly across scenes 1–${count - showcase}: ${cfg.arc}. Each scene shows ONLY the parts that exist at that stage (early scenes: loose cut bottle pieces being prepared; middle scenes: partially glued body without decorations). The figure must be FULLY COMPLETED at scene ${count - showcase} — the reveal payoff, displayed proudly on the desk.${showcase ? `

**SHOWCASE ENDING:** the last ${showcase} scene(s) show the FINISHED figure being showcased — beautifully displayed on the desk among the plants and fairy lights, cinematic professional close-up shots of its face and details from new flattering angles (hands may gently present or turn it). NO new building steps in these scenes; the craft is done, this is the payoff for the viewer.` : ''}

**STRUCTURE:** ${count} scenes in strict chronological build order${showcase ? ` (hands actively working in scenes 1–${count - showcase})` : ', hands actively working in each scene'}. For each scene provide a short Indonesian title (e.g. 'Scene 1: Potong Botol') and a CONCISE English prompt for an AI image generator that always repeats the locked craft design sheet + desk description and states the exact build stage.
Respond ONLY with a valid JSON array of ${count} objects with keys "title" and "prompt", in sequential story order.`;
  };

  window.buildMetalCraftPrompt = function (cfg, sel, { count, showcase: forcedShowcase }) {
    const picks = Object.entries(sel)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    const showcase = forcedShowcase !== undefined ? forcedShowcase : (count > 5 ? 2 : (count >= 3 ? 1 : 0));
    return `You are an expert DIY metal craft storyboard artist. Create a **${count}-scene visual CRAFTING PROCESS story** (storyboard) showing ONE miniature figurine being built step by step from industrial metal hardware (hex nuts, washers, copper wire), for a satisfying viral short video.

**THE CRAFT:** ${cfg.subject}.
${picks ? `**USER CHOICES:** ${picks}. Honor these exactly in every scene.\n` : ''}
**CRAFT DESIGN SHEET (DO THIS FIRST):** Before writing any scene, invent ONE fixed figurine design from the user choices and write it as one reusable description: the overall shape, which nuts and washers form each body part (e.g. hex nuts and round washers stacked into a dome shell for a turtle), the exact metal finish of every part (rustic, shiny steel, copper), the twisted thick copper wire limbs with round wire-loop eyes, and the small oval wooden display base. Also fix ONE workspace description: smooth matte dark grey work surface, the visible tools and materials (small clear bottle of liquid superglue, small pliers, bowls of loose nuts and washers), clean minimalist background, bright even soft studio lighting that highlights the metallic shine without harsh shadows, extreme close-up top-down camera on the hands. You will reuse BOTH descriptions in every scene.

**SUBJECT LOCK (CRITICAL):** The same pair of hands with neat clean nails, the same workspace description and the SAME craft design sheet appear in ALL ${count} scenes — as if filmed in one continuous take, only the build progress advances. Every scene prompt MUST repeat the craft design sheet + workspace description word-for-word so separately generated images look like one continuous video.

**MATERIAL LOCK (CRITICAL):** The figurine is handmade ONLY from steel hex nuts, round metal washers and thick twisted copper wire joined with drops of clear liquid superglue — the hexagonal nut shapes, the rustic/metallic texture, the copper wire twists and the visible glue joints must stay clearly visible. NEVER a factory-made toy, NEVER smooth cast or welded seamless metal sculpture, NEVER plastic or resin — in every scene it must look like a handmade nuts-and-wire craft.

**BUILD-STAGE LOCK:** Follow this exact build order, spread evenly across scenes 1–${count - showcase}: ${cfg.arc}. Each scene shows ONLY the parts that exist at that stage (early scenes: loose nuts and washers arranged flat on the table; middle scenes: partial dome shell or bare wire frame without the shell). The figurine must be FULLY COMPLETED at scene ${count - showcase} — the reveal payoff, displayed proudly on the wooden base.${showcase ? `

**SHOWCASE ENDING:** the last ${showcase} scene(s) show the FINISHED figurine being showcased — beautifully displayed on its oval wooden base on the dark grey surface, cinematic professional close-up shots of its shell and copper details from new flattering angles (hands may gently present or turn it). NO new building steps in these scenes; the craft is done, this is the payoff for the viewer.` : ''}

**STRUCTURE:** ${count} scenes in strict chronological build order${showcase ? ` (hands actively working in scenes 1–${count - showcase})` : ', hands actively working in each scene'}. For each scene provide a short Indonesian title (e.g. 'Scene 1: Susun Mur') and a CONCISE English prompt for an AI image generator that always repeats the locked craft design sheet + workspace description and states the exact build stage.
Respond ONLY with a valid JSON array of ${count} objects with keys "title" and "prompt", in sequential story order.`;
  };

  window.buildStrawCraftPrompt = function (cfg, sel, { count, showcase: forcedShowcase }) {
    const picks = Object.entries(sel)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    const showcase = forcedShowcase !== undefined ? forcedShowcase : (count > 5 ? 2 : (count >= 3 ? 1 : 0));
    return `You are an expert stop-motion DIY craft storyboard artist. Create a **${count}-scene visual CRAFTING PROCESS story** (storyboard) showing ONE miniature model being built step by step entirely from plastic drinking straws, precise satisfying stop-motion tutorial style, for a viral short video.

**THE CRAFT:** ${cfg.subject}.
${picks ? `**USER CHOICES:** ${picks}. Honor these exactly in every scene.\n` : ''}
**CRAFT DESIGN SHEET (DO THIS FIRST):** Before writing any scene, invent ONE fixed model design from the user choices and write it as one reusable description: the overall shape, which straw pieces form each part, the exact straw color of every part, the wheels or round details made of tightly packed circular straw segments (if the model has them), and the printed/drawn face or decal details (generic original cartoon design — NEVER name or copy a real franchise character). Also fix ONE workspace description: smooth plain beige/light-grey craft cutting mat, the visible tools (metal scissors, steel ruler, small brush, glue, folded cleaning cloth), a softly blurred background with assorted crafting tools and yellow hand tools out of focus, bright clean even studio lighting with no harsh shadows, static close-up camera focused on the fingers and material. You will reuse BOTH descriptions in every scene.

**SUBJECT LOCK (CRITICAL):** The same pair of hands with neat clean nails, the same workspace description and the SAME craft design sheet appear in ALL ${count} scenes — as if filmed in one continuous take, only the build progress advances. Every scene prompt MUST repeat the craft design sheet + workspace description word-for-word so separately generated images look like one continuous video.

**MATERIAL LOCK (CRITICAL):** The model is handmade ONLY from cut plastic drinking straws (some are bendy straws with ridged flexible segments) joined by snap-fitting pieces into one another and small drops of glue — the glossy tubular straw texture, the round open tube ends and the ridged bendy segments must stay clearly visible. NEVER a factory-made die-cast toy, NEVER a smooth molded plastic body, NEVER a real vehicle or object — in every scene it must look like a handmade straw-built craft.

**BUILD-STAGE LOCK:** Follow this exact build order, spread evenly across scenes 1–${count - showcase}: ${cfg.arc}. Each scene shows ONLY the parts that exist at that stage (early scenes: loose measured and cut straw pieces on the mat; middle scenes: bare tubular frame or chassis without the outer shell). The model must be FULLY COMPLETED at scene ${count - showcase} — the reveal payoff, presented proudly on the mat.${showcase ? `

**SHOWCASE ENDING:** the last ${showcase} scene(s) show the FINISHED model being showcased — displayed on the clean craft mat, cinematic professional close-up shots of its details from new flattering angles (hands may gently present, turn it, or wipe it with the cloth). NO new building steps in these scenes; the craft is done, this is the payoff for the viewer.` : ''}

**STRUCTURE:** ${count} scenes in strict chronological build order${showcase ? ` (hands actively working in scenes 1–${count - showcase})` : ', hands actively working in each scene'}. For each scene provide a short Indonesian title (e.g. 'Scene 1: Potong Sedotan') and a CONCISE English prompt for an AI image generator that always repeats the locked craft design sheet + workspace description and states the exact build stage.
Respond ONLY with a valid JSON array of ${count} objects with keys "title" and "prompt", in sequential story order.`;
  };

  function createViralTab(cfg) {
    const p = cfg.prefix;
    const apiKey = "";
    const host = document.getElementById(`content-${cfg.prefix}`);
    if (!host) return;

    // ---- Render panel dari config ----
    const extraOff = cfg.extraInput ? 1 : 0;
    const chipGroupsHtml = (cfg.chipGroups || []).map((g, gi) => `
      <div class="card p-6">
        <div class="flex items-center gap-2 mb-3"><div class="step-num">${gi + 1 + extraOff}</div><h2 class="text-lg font-semibold text-gray-800">${g.label}</h2></div>
        <div id="${p}-group-${g.key}" data-group="${g.key}" class="grid gap-2 p-2 border-2 border-gray-100 rounded-xl" style="grid-template-columns:repeat(auto-fill,minmax(110px,1fr));">
          <button type="button" data-val="__random__" class="theme-chip selected"><i class="fas fa-dice"></i>Kejutkan aku</button>
          ${g.options.map(o => `<button type="button" data-val="${window.escHtml(o)}" class="theme-chip">${window.escHtml(o)}</button>`).join('')}
          <button type="button" data-val="__custom__" class="theme-chip"><i class="fas fa-pen"></i>Custom</button>
        </div>
        <input type="text" id="${p}-group-${g.key}-custom" class="hidden w-full mt-2 p-3 bg-white border-2 border-violet-300 rounded-xl text-sm focus:border-violet-500 transition" placeholder="Tulis ${window.escHtml(g.label.toLowerCase())} versimu sendiri...">
      </div>`).join('');

    const customHtml = cfg.custom ? `
      <div class="card p-6">
        <div class="flex items-center gap-2 mb-3"><div class="step-num">1</div><h2 class="text-lg font-semibold text-gray-800">Ceritakan proses viralmu</h2></div>
        <textarea id="${p}-custom-input" rows="4" class="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-violet-500 transition resize-none" placeholder="Contoh: sabun batangan diukir pelan-pelan jadi bentuk mawar, lalu dibungkus cantik untuk dijual"></textarea>
        <p class="text-xs text-gray-400 mt-2">Tulis dari awal sampai hasil akhir — AI yang memecah jadi scene.</p>
      </div>` : '';

    const extraHtml = cfg.extraInput ? `
      <div class="card p-6">
        <div class="flex items-center gap-2 mb-3"><div class="step-num">1</div><h2 class="text-lg font-semibold text-gray-800">${cfg.extraInput.label}</h2></div>
        <textarea id="${p}-extra-input" rows="3" class="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-violet-500 transition resize-none" placeholder="${window.escHtml(cfg.extraInput.placeholder || '')}"></textarea>
        ${cfg.extraInput.fromImage ? `
        <input type="file" id="${p}-extra-image-input" accept="image/*" class="hidden">
        <button type="button" id="${p}-extra-image-btn" class="btn-secondary text-sm font-semibold py-2 px-4 rounded-lg mt-2 w-full flex items-center justify-center"><i class="fas fa-camera mr-2"></i>${window.escHtml(cfg.extraInput.imageBtnLabel || 'Ambil ciri dari Foto (kartun/manusia — hasil tetap boneka)')}</button>` : ''}
        <p class="text-xs text-gray-400 mt-2">Opsional — kosongkan biar AI berkreasi dari pilihan chip.</p>
      </div>` : '';

    const baseStep = (cfg.custom ? 1 : 0) + extraOff + (cfg.chipGroups ? cfg.chipGroups.length : 0);
    host.innerHTML = `
      <div class="container mx-auto p-4 md:p-8 max-w-7xl">
        <header class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold brand-gradient bg-clip-text text-transparent">${cfg.title}</h1>
          <p class="text-gray-500 mt-2">${cfg.subtitle}</p>
        </header>
        <main class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div class="lg:col-span-1 space-y-6">
            ${customHtml}
            ${extraHtml}
            ${chipGroupsHtml}
            <div class="card p-6">
              <div class="flex items-center gap-2 mb-3"><div class="step-num">${baseStep + 1}</div><h2 class="text-lg font-semibold text-gray-800">Aspect Ratio</h2></div>
              <div id="${p}-ratio-selection" class="grid grid-cols-2 gap-3">
                <button type="button" class="ratio-btn" data-ratio="1:1"><i class="fas fa-square"></i><span>1:1</span></button>
                <button type="button" class="ratio-btn" data-ratio="16:9"><i class="fas fa-tv"></i><span>16:9</span></button>
                <button type="button" class="ratio-btn" data-ratio="3:4"><i class="fas fa-portrait"></i><span>3:4</span></button>
                <button type="button" class="ratio-btn selected" data-ratio="9:16"><i class="fas fa-mobile-screen"></i><span>9:16 Story</span></button>
              </div>
            </div>
            <div class="card p-6">
              <div class="flex items-center gap-2 mb-3"><div class="step-num">${baseStep + 2}</div><h2 class="text-lg font-semibold text-gray-800">Panjang Video</h2></div>
              <div id="${p}-count-selection-grid" class="count-btn-grid">
                <button type="button" data-count="3">3</button><button type="button" data-count="4">4</button><button type="button" data-count="5" class="selected">5</button><button type="button" data-count="6">6</button><button type="button" data-count="7">7</button><button type="button" data-count="8">8</button><button type="button" data-count="9">9</button><button type="button" data-count="10">10</button>
              </div>
            </div>
            <button type="button" id="${p}-generate-btn" class="w-full btn-primary font-bold py-4 px-6 rounded-xl flex items-center justify-center text-lg"><i class="fas fa-bolt mr-2"></i><span>Buat Storyboard Viral</span></button>
          </div>
          <div class="lg:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-800">Hasil Storyboard</h2>
              <button id="${p}-download-all-btn" class="btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden"><i class="fas fa-download mr-1"></i>Unduh Semua</button>
            </div>
            <div id="${p}-b-roll-grid" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"></div>
          </div>
        </main>
      </div>`;

    // ---- Chip single-select per grup ----
    const selection = {};
    (cfg.chipGroups || []).forEach(g => {
      selection[g.key] = '';
      const gridEl = document.getElementById(`${p}-group-${g.key}`);
      const customEl = document.getElementById(`${p}-group-${g.key}-custom`);
      gridEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-val]'); if (!btn) return;
        gridEl.querySelectorAll('.theme-chip').forEach(x => x.classList.remove('selected'));
        btn.classList.add('selected');
        if (btn.dataset.val === '__custom__') {
          customEl.classList.remove('hidden');
          customEl.focus();
          selection[g.key] = customEl.value.trim();
        } else {
          customEl.classList.add('hidden');
          selection[g.key] = btn.dataset.val === '__random__' ? '' : btn.dataset.val;
        }
      });
      customEl.addEventListener('input', () => {
        if (gridEl.querySelector('.theme-chip.selected')?.dataset.val === '__custom__') selection[g.key] = customEl.value.trim();
      });
    });

    const grid = document.getElementById(`${p}-b-roll-grid`);
    const generateBtn = document.getElementById(`${p}-generate-btn`);
    const downloadAllBtn = document.getElementById(`${p}-download-all-btn`);
    const countGrid = document.getElementById(`${p}-count-selection-grid`);
    let selectedCount = 5;
    function ratio() { return document.querySelector(`#${p}-ratio-selection .ratio-btn.selected`)?.dataset.ratio || '9:16'; }
    function aspectClass(r) { return r === '1:1' ? 'aspect-square' : r === '3:4' ? 'aspect-[3/4]' : r === '9:16' ? 'aspect-[9/16]' : 'aspect-video'; }
    document.querySelectorAll(`#${p}-ratio-selection .ratio-btn`).forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll(`#${p}-ratio-selection .ratio-btn`).forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
    }));
    countGrid.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-count]'); if (!b) return;
      countGrid.querySelectorAll('button').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected'); selectedCount = parseInt(b.dataset.count, 10);
    });

    // Foto referensi → deskripsi teks (extraInput.fromImage). Foto TIDAK ikut ke generate gambar.
    if (cfg.extraInput && cfg.extraInput.fromImage) {
      const imgBtn = document.getElementById(`${p}-extra-image-btn`);
      const imgInput = document.getElementById(`${p}-extra-image-input`);
      imgBtn.addEventListener('click', () => imgInput.click());
      imgInput.addEventListener('change', async () => {
        const file = imgInput.files && imgInput.files[0];
        if (!file) return;
        const orig = imgBtn.innerHTML;
        imgBtn.disabled = true;
        imgBtn.innerHTML = '<div class="loader"></div><span class="ml-2">Membaca foto...</span>';
        try {
          const { base64, mimeType } = await window.compressImage(file);
          const describe = cfg.extraInput.imageDescribe || "Describe this character's visual appearance in Bahasa Indonesia as ONE short paragraph for a doll maker: jenis (cewek/cowok/hewan/robot dll), warna & gaya rambut, ciri wajah, SETIAP potong pakaian dengan warna persisnya, dan aksesori. JANGAN sebut nama karakter, orang, atau franchise. Balas deskripsinya saja.";
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: describe }, { inlineData: { mimeType, data: base64 } }] }] })
          });
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (!text) throw new Error('Deskripsi kosong');
          document.getElementById(`${p}-extra-input`).value = text;
          window.uiNotify('Ciri karakter berhasil diambil dari foto — silakan edit kalau perlu.');
        } catch (err) {
          window.uiNotify('Gagal membaca foto: ' + err.message);
        } finally {
          imgBtn.disabled = false;
          imgBtn.innerHTML = orig;
          imgInput.value = '';
        }
      });
    }

    // Lanjutkan Cerita: perpanjang story +1 klip dari scene terakhir (Mode Durasi, maks window.MAX_STORY_CLIPS)
    const continueBtn = document.createElement('button');
    continueBtn.type = 'button';
    continueBtn.id = `${p}-continue-btn`;
    continueBtn.className = 'w-full btn-secondary font-bold py-3 px-6 rounded-xl mt-6 hidden items-center justify-center';
    grid.insertAdjacentElement('afterend', continueBtn);
    function hideContinueBtn() { continueBtn.classList.add('hidden'); continueBtn.classList.remove('flex'); }
    function updateContinueBtn() {
      if (!durState.on) { hideContinueBtn(); return; }
      const n = grid.querySelectorAll('.result-card').length;
      if (!n) { hideContinueBtn(); return; }
      const plan = window.clipPlan(durState.platform, durState.duration);
      const clips = Math.ceil(n / plan.perClip);
      if (clips >= window.MAX_STORY_CLIPS) { hideContinueBtn(); return; }
      continueBtn.innerHTML = `<i class="fas fa-forward mr-2"></i>Lanjutkan Cerita (+1 klip · ${plan.clipSec} dtk) — Klip ${clips + 1}/${window.MAX_STORY_CLIPS}`;
      continueBtn.classList.remove('hidden');
      continueBtn.classList.add('flex');
    }
    continueBtn.addEventListener('click', async () => {
      if (!durState.on) return;
      const all = Array.from(grid.querySelectorAll('.result-card'));
      if (!all.length) return;
      const plan = window.clipPlan(durState.platform, durState.duration);
      const clips = Math.ceil(all.length / plan.perClip);
      if (clips >= window.MAX_STORY_CLIPS) { hideContinueBtn(); return; }
      const orig = continueBtn.innerHTML;
      continueBtn.disabled = true;
      continueBtn.innerHTML = '<div class="loader"></div><span class="ml-2">Melanjutkan cerita...</span>';
      try {
        const lastCard = all[all.length - 1];
        const ideas = await analyzeAndGetPrompts({
          titles: all.map(c => c.dataset.title || 'Scene'),
          last: { title: lastCard.dataset.title || 'Scene', prompt: lastCard.dataset.prompt || '' },
          nextClip: clips + 1, plan
        });
        const batch = ideas.slice(0, plan.perClip);
        if (!batch.length) throw new Error('Storyboard lanjutan kosong.');
        const startAt = all.length;
        buildCards(batch, startAt);
        const anc = storyAnchor();
        await Promise.allSettled(batch.map((idea, j) => generateSingle(startAt + j + 1, idea.title, idea.prompt, anc)));
      } catch (err) {
        console.error(err);
        window.uiNotify('Gagal melanjutkan cerita: ' + err.message);
      } finally {
        continueBtn.disabled = false;
        continueBtn.innerHTML = orig;
        updateContinueBtn();
      }
    });

    // Konteks proses viral (pengganti descInput/currentTheme di mesin salinan)
    function fullSelection() {
      if (!cfg.extraInput) return selection;
      const v = (document.getElementById(`${p}-extra-input`)?.value || '').trim();
      return v ? { ...selection, [cfg.extraInput.key]: v } : selection;
    }
    function viralContext() {
      if (cfg.custom) return document.getElementById(`${p}-custom-input`).value.trim();
      const picks = Object.entries(fullSelection()).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(', ');
      return `${cfg.subject}${picks ? ' — ' + picks : ''}`;
    }
    function currentTheme() { return selection['gaya'] || selection['latar'] || ''; }

    // ---- Header output: audio + bahasa + Semua Prompt Video + Caption (salinan) ----
    let audioStyle = cfg.defaultAudio || 'voiceover';
    let audioLang = 'id';
    let videoAllBtn = null, audioStyleSel = null, audioLangBtn = null, captionBtn = null;
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
      audioStyleSel.innerHTML = '<option value="ugc">🎤 Model bicara (UGC)</option><option value="ugc_music">🎤🎶 Model bicara + musik</option><option value="voiceover">🗣️ Voiceover narasi</option><option value="asmr">🔊 ASMR + musik</option><option value="cinematic">🎬 Sinematik musik</option><option value="timelapse">⏩ Timelapse (tanpa narasi)</option>';
      audioStyleSel.value = audioStyle;
      audioStyleSel.addEventListener('change', () => { audioStyle = audioStyleSel.value; });

      audioLangBtn = document.createElement('button');
      audioLangBtn.type = 'button';
      audioLangBtn.id = `${p}-audio-lang`;
      audioLangBtn.className = 'btn-secondary text-sm font-semibold py-2 px-3 rounded-lg hidden';
      const renderLang = () => { audioLangBtn.innerHTML = `<i class="fas fa-language mr-1"></i>${audioLang.toUpperCase()}`; };
      renderLang();
      audioLangBtn.addEventListener('click', () => { audioLang = audioLang === 'id' ? 'en' : 'id'; renderLang(); });

      captionBtn = document.createElement('button');
      captionBtn.type = 'button';
      captionBtn.id = `${p}-caption-btn`;
      captionBtn.className = 'btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden';
      captionBtn.innerHTML = '<i class="fas fa-hashtag mr-1"></i>Caption';
      captionBtn.addEventListener('click', () => showCaptionModal());

      wrap.appendChild(audioStyleSel);
      wrap.appendChild(audioLangBtn);
      wrap.appendChild(captionBtn);
      wrap.appendChild(videoAllBtn);
      wrap.appendChild(downloadAllBtn);
    }

    // ---- Mode Durasi Video (salinan) ----
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
      if (pb) { durState.platform = pb.dataset.platform; hideContinueBtn(); }
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
      hideContinueBtn();
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

    function buildCards(prompts, startAt = 0) {
      if (!startAt) grid.innerHTML = '';
      grid.dataset.captionCache = '';
      const ac = aspectClass(ratio());
      const plan = durState.on ? window.clipPlan(durState.platform, durState.duration) : null;
      prompts.forEach((pr, i) => {
        const gi = startAt + i;
        if (plan && gi % plan.perClip === 0) {
          const clipIdx = gi / plan.perClip + 1;
          const end = Math.min(gi + plan.perClip, startAt + prompts.length);
          const h = document.createElement('div');
          h.className = 'clip-divider';
          h.id = `${p}-clip-${clipIdx}`;
          h.innerHTML = `<span><i class="fas fa-clapperboard mr-1"></i>Klip ${clipIdx} — Scene ${gi + 1}–${end} · ${plan.clipSec} dtk</span><span class="flex items-center gap-2"><button type="button" data-action="${p}-clip-download" data-clip="${clipIdx}" class="action-btn bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-download mr-1 pointer-events-none"></i>Unduh</button><button type="button" data-action="${p}-clip-prompt" data-clip="${clipIdx}" class="action-btn bg-fuchsia-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-film mr-1 pointer-events-none"></i>Prompt Klip</button></span>`;
          grid.appendChild(h);
        }
        const card = document.createElement('div');
        card.id = `${p}-card-${gi + 1}`;
        card.className = 'result-card card p-4 flex flex-col justify-between';
        card.dataset.title = pr.title; card.dataset.prompt = pr.prompt;
        card.innerHTML = `<div class="mb-3"><h3 class="text-base font-semibold text-gray-800">${window.escHtml(pr.title)}</h3></div><div class="${p}-output-container ${ac} bg-gray-100 rounded-md flex items-center justify-center"><div class="loader"></div></div>`;
        grid.appendChild(card);
      });
    }

    function cardImgB64(card) {
      const m = (card?.querySelector('img')?.src || '').match(/^data:image\/\w+;base64,(.+)$/);
      return m ? m[1] : null;
    }
    function storyAnchor(excludeId) {
      const withImg = Array.from(grid.querySelectorAll('.result-card'))
        .filter(c => c.id !== `${p}-card-${excludeId}` && c.querySelector('img'));
      return withImg.length ? cardImgB64(withImg[withImg.length - 1]) : null;
    }

    async function generateSingle(id, title, prompt, anchor = null) {
      const card = document.getElementById(`${p}-card-${id}`); if (!card) return;
      const out = card.querySelector(`.${p}-output-container`);
      out.innerHTML = '<div class="loader"></div>';
      card.dataset.videoPromptCache = '';
      if (durState.on) {
        const ci = Math.ceil(parseInt(id, 10) / window.clipPlan(durState.platform, durState.duration).perClip);
        const hd = document.getElementById(`${p}-clip-${ci}`);
        if (hd) hd.dataset.clipPromptCache = '';
      }
      const retries = 3; let lastError = null;
      for (let i = 0; i < retries; i++) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
          const finalPrompt = `${prompt}, cinematic, hyper-detailed, natural lighting, photorealistic, 8k, satisfying viral short video still`;
          const parts = anchor
            ? [{ text: `REFERENCE (CRITICAL): the attached image shows the FINISHED RESULT of this exact video and its exact setting. Copy its hands, desk/setting, lighting, materials, every color and the object design EXACTLY. But render ONLY the moment described below — if it is an earlier build stage, show a partially-built version of the EXACT same object from the reference at that stage. Do NOT invent a different design, never change colors or materials.\n\nSCENE TO RENDER: ${finalPrompt}` }, { inlineData: { mimeType: 'image/png', data: anchor } }]
            : [{ text: finalPrompt }];
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
              <button data-action="${p}-editprompt" data-scene-id="${id}" class="action-btn bg-amber-500 text-white px-3 py-2 rounded-lg" title="Edit Prompt"><i class="fas fa-pen pointer-events-none"></i></button>
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

    async function analyzeAndGetPrompts(continueFrom = null) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const r = ratio();
      const plan = (durState.on && !continueFrom) ? window.clipPlan(durState.platform, durState.duration) : null;
      const clipShowcase = (plan && !cfg.noShowcase && plan.clips >= 2) ? plan.perClip : undefined;
      let systemPrompt = (cfg.promptFn || window.buildViralPrompt)(cfg, cfg.custom ? { custom: document.getElementById(`${p}-custom-input`).value.trim() } : fullSelection(), { count: continueFrom ? continueFrom.plan.perClip : effectiveCount(), showcase: continueFrom ? 0 : clipShowcase });
      if (plan) {
        systemPrompt += `\n\n**CLIP STRUCTURE (IMPORTANT):** These ${plan.photos} scenes will become ${plan.clips} separate video clip(s) of ${plan.clipSec} seconds each (${plan.perClip} scenes per clip, ~2 seconds per scene). Structure as ${plan.clips} chapter(s) of ONE continuous story; the LAST scene of each chapter must bridge smoothly into the first scene of the next.${clipShowcase ? ` The FINAL clip (clip ${plan.clips}, scenes ${plan.photos - plan.perClip + 1}–${plan.photos}) is entirely the SHOWCASE chapter — the process must be FULLY COMPLETED by the end of clip ${plan.clips - 1}, and every scene of the final clip only showcases the finished result.` : ''}`;
      }
      if (continueFrom) {
        const done = continueFrom.titles.length;
        systemPrompt += `\n\n**CONTINUATION (MOST IMPORTANT RULE — THIS OVERRIDES EVERY RULE ABOVE ABOUT ARC ORDER, BUILD STAGES, STRUCTURE, STARTING AT THE BEGINNING OR ENDING AT A REVEAL/SHOWCASE):** The story already exists and must NOT be restarted. Every arc / build-order / stage-mapping / showcase rule above described the ORIGINAL scenes only — do NOT map any of them onto the new scenes. Scenes so far, in order:\n${continueFrom.titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}\nThe story currently ends at scene ${done}: "${continueFrom.last.title}" — its image prompt was: "${continueFrom.last.prompt}".\nNow write ONLY the NEXT ${continueFrom.plan.perClip} scenes (scene ${done + 1}–${done + continueFrom.plan.perClip}) that CONTINUE this same story seamlessly as video clip ${continueFrom.nextClip} (${continueFrom.plan.clipSec} seconds, ~2 seconds per scene). Keep the EXACT same subject identity, setting, lighting and style locks as the existing scenes — repeat the same locked subject description in every new scene prompt. Do NOT restart the story, do NOT repeat existing scenes. The first new scene must flow directly on from that last scene. Judge the current state from the scene list above and pick exactly ONE of these two paths:\n- If the process/build was still IN PROGRESS at scene ${done}: continue it from that exact stage onward — NEVER go back to an earlier stage, never re-do a step already shown.\n- If the finished result was ALREADY revealed/completed: do NOT rebuild it and do NOT start a new one — the new scenes are a SHOWCASE/AFTERMATH chapter: the finished result displayed and celebrated in the same setting, cinematic professional close-up shots from new flattering angles, styling/decor details, satisfying final beauty shots.\nEnd the last new scene on a natural pause that can be continued again.`;
      }
      const userQuery = `Generate the storyboard now. Desired aspect ratio is ${r}.`;
      const payload = { contents: [{ parts: [{ text: userQuery }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { responseMimeType: "application/json", responseSchema: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, prompt: { type: "STRING" } }, required: ["title", "prompt"] } } } };
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await res.json();
      let raw = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!raw) throw new Error('Invalid response structure from API.');
      raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const s = raw.indexOf('['), e2 = raw.lastIndexOf(']');
      if (s === -1 || e2 === -1) throw new Error('No valid JSON array in response.');
      return JSON.parse(raw.substring(s, e2 + 1));
    }

    generateBtn.addEventListener('click', async () => {
      if (cfg.custom && !document.getElementById(`${p}-custom-input`).value.trim()) { window.uiNotify('Tulis dulu ide proses viralmu ya.'); return; }
      generateBtn.disabled = true;
      hideContinueBtn();
      const orig = generateBtn.innerHTML;
      generateBtn.innerHTML = '<div class="loader"></div><span class="ml-2">Menyusun cerita...</span>';
      downloadAllBtn.classList.add('hidden');
      if (videoAllBtn) videoAllBtn.classList.add('hidden');
      if (captionBtn) captionBtn.classList.add('hidden');
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
      const useAnchor = !cfg.noShowcase && ideas.length > 1;
      while (attempts < MAX && success === 0) {
        attempts++;
        buildCards(ideas);
        if (useAnchor) {
          const lastIdea = ideas[ideas.length - 1];
          await generateSingle(ideas.length, lastIdea.title, lastIdea.prompt);
        }
        const anchor = useAnchor ? storyAnchor() : null;
        const chunk = durState.on ? window.clipPlan(durState.platform, durState.duration).perClip : ideas.length;
        for (let s = 0; s < ideas.length; s += chunk) {
          await Promise.allSettled(ideas.slice(s, s + chunk).map((idea, j) => {
            const gid = s + j + 1;
            if (useAnchor && anchor && gid === ideas.length) return Promise.resolve();
            return generateSingle(gid, idea.title, idea.prompt, anchor);
          }));
        }
        success = Array.from(grid.querySelectorAll('.result-card')).filter(c => c.querySelector('img')).length;
      }
      if (!durState.on) { grid.querySelectorAll('.result-card').forEach(c => { if (!c.querySelector('img')) c.remove(); }); }
      generateBtn.disabled = false; generateBtn.innerHTML = orig;
      if (success === 0) window.uiNotify('Akun Google ini sudah mencapai batas, silakan gunakan akun Google lain.');
      else { downloadAllBtn.classList.remove('hidden'); if (videoAllBtn) videoAllBtn.classList.remove('hidden'); if (audioStyleSel) audioStyleSel.classList.remove('hidden'); if (audioLangBtn) audioLangBtn.classList.remove('hidden'); if (captionBtn) captionBtn.classList.remove('hidden'); updateContinueBtn(); }
    });

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]'); if (!btn) return;
      if (btn.dataset.action === `${p}-clip-prompt`) {
        const k = parseInt(btn.dataset.clip, 10);
        const plan = window.clipPlan(durState.platform, durState.duration);
        const n = Math.min(plan.perClip, grid.querySelectorAll('.result-card').length - (k - 1) * plan.perClip);
        showChoiceModal(`Prompt Klip ${k} bentuk apa?`, [
          { label: `<i class="fas fa-image mr-2"></i>Per Scene — ${n} prompt (1 foto = 1 generate video)`, onPick: () => generateAllVideoPrompts(k) },
          { label: `<i class="fas fa-clapperboard mr-2"></i>Per Klip — 1 prompt (${n} foto = 1 klip ${plan.clipSec} dtk)`, onPick: () => generateClipPrompt(k) }
        ]);
        return;
      }
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
      else if (btn.dataset.action === `${p}-regenerate` && card) generateSingle(id, card.dataset.title, card.dataset.prompt, cfg.noShowcase ? null : storyAnchor(id));
      else if (btn.dataset.action === `${p}-editprompt` && card) showEditPromptModal(id);
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

    function showEditPromptModal(id) {
      const card = document.getElementById(`${p}-card-${id}`); if (!card) return;
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-3"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-pen text-amber-500 mr-2"></i>Edit Prompt Gambar</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-2">Ubah prompt gambar scene ini, lalu klik <strong>Simpan</strong>. Tekan tombol <strong>Regenerate</strong> di kartu untuk membuat ulang gambar dengan prompt baru.</p>
        <textarea data-editp rows="7" class="w-full p-3 border-2 border-gray-200 rounded-lg text-sm font-mono resize-none focus:border-violet-500 transition">${window.escHtml(card.dataset.prompt || '')}</textarea>
        <div class="flex gap-2 mt-4"><button data-save class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-floppy-disk mr-1"></i>Simpan</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm">Batal</button></div>
      </div>`;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
      modal.querySelector('[data-save]').addEventListener('click', () => {
        const v = modal.querySelector('[data-editp]').value.trim();
        if (v) card.dataset.prompt = v;
        close();
      });
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
      const desc = viralContext();
      const cacheKey = `${audioStyle}:${audioLang}`;
      let cache = {};
      try { cache = JSON.parse(card.dataset.videoPromptCache || '{}'); } catch (e) { cache = {}; }
      if (cache[cacheKey]) return { sceneNum, total, title, vp: cache[cacheKey], imageUrl: img.src, cached: true };
      const blob = await (await fetch(img.src)).blob();
      const base64 = await new Promise((resolve) => { const r = new FileReader(); r.onloadend = () => resolve(r.result.split(',')[1]); r.readAsDataURL(blob); });
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const systemPrompt = `You are an expert video prompt engineer. This image is **Scene ${sceneNum} of ${total}** in ONE continuous ${cfg.subject} process/transformation video that must flow smoothly from beginning to end. The full storyboard, in order, is:
${storyList}

Create a detailed cinematic English prompt for an AI image-to-video generator (Runway, Pika, Kling, Veo, Stable Video Diffusion) for THIS scene only, but crafted so all clips cut together into one seamless story:
1. Keep the main subject EXACTLY as shown — do not change the subject/identity.
${durState.on ? `2. DURATION: this scene covers EXACTLY ~2 seconds in the final video — describe ONE clear, simple motion beat that reads fully within 2 seconds (no multi-step actions).\n` : ''}3. Keep visual style, color grading, lighting mood, and pacing CONSISTENT with the rest of the sequence.
4. Design camera motion for continuity: ${prevTitle ? `begin in a way that flows on from the previous scene ("${prevTitle}")` : 'this is the OPENING scene — start with an inviting establishing motion'}, and ${nextTitle ? `end in a way that leads into the next scene ("${nextTitle}")` : 'this is the FINAL scene — end on a satisfying reveal / closing beat'}.
5. Add subtle dynamic elements suited to the scene (soft light shifts, gentle particles, growth/build motion, steam/liquid motion if relevant).
6. ${AUDIO_DIRECTIONS[audioStyle] || AUDIO_DIRECTIONS.voiceover}
7. ${window.audioSpeechRule(audioStyle, audioLang)}
8. Be optimized for image-to-video AI, under 200 words, highly detailed.
Output ONLY the video prompt for this scene, nothing else.`;
      const userText = `Scene ${sceneNum}/${total} — "${title}". Process/subject context: "${desc}". Audio style: ${audioStyle}. Spoken language: ${LANG_LABEL[audioLang]}. Write the continuous-story image-to-video prompt for this scene so it connects with the scene before and after.`;
      const payload = { contents: [{ parts: [{ text: userText }, { inlineData: { mimeType: 'image/png', data: base64 } }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
      const result = await (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).json();
      const vp = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
      if (!vp) throw new Error('Prompt kosong dari API.');
      cache[cacheKey] = vp;
      card.dataset.videoPromptCache = JSON.stringify(cache);
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
      const systemPrompt = `You are an expert video prompt engineer. Write ONE image-to-video prompt for CLIP ${clipIdx} of ${totalClips} in a continuous ${cfg.subject} process/transformation video. The user will feed ${cards.length} keyframe photos IN ORDER into ONE ${plan.clipSec}-second generation (each keyframe covers ~2 seconds). The keyframes of THIS clip, in order with timing:
${sceneLines}

Write ONE cinematic English prompt describing the FULL ${plan.clipSec}-second clip as continuous motion through these keyframes:
1. STRICT TIMELINE (MOST IMPORTANT): structure the prompt as an explicit shot list with hard time codes, one segment per keyframe: [0s–2s] keyframe 1, [2s–4s] keyframe 2, and so on until [${(cards.length - 1) * 2}s–${cards.length * 2}s] keyframe ${cards.length}. EVERY keyframe MUST get its own ~2-second segment in the EXACT order given — NEVER skip, merge, reorder, or invent scenes. Each segment describes the motion FROM that keyframe TOWARD the next keyframe.
2. Keep the subject identity EXACTLY as shown in the photos. ONE consistent visual style, color grade, and lighting mood across the whole clip.
3. ${prevBridge ? `OPENING: flow on smoothly from the previous clip (which ended at "${prevBridge}").` : 'OPENING: this is the FIRST clip — start with an inviting establishing motion.'}
4. ${nextBridge ? `ENDING: end on a camera motion that bridges into the next clip (which starts at "${nextBridge}").` : 'ENDING: this is the FINAL clip — close on a satisfying reveal beat.'}
5. ${AUDIO_DIRECTIONS[audioStyle] || AUDIO_DIRECTIONS.voiceover}
6. ${window.audioSpeechRule(audioStyle, audioLang)}
7. Under 250 words, optimized for image-to-video AI (Runway, Pika, Kling, Veo, Seedance).
Output ONLY the video prompt, nothing else.`;
      const userText = `Clip ${clipIdx}/${totalClips}. Process/subject context: "${viralContext()}". Audio style: ${audioStyle}. Spoken language: ${LANG_LABEL[audioLang]}.`;
      const payload = { contents: [{ parts: [{ text: userText }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
      const result = await (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).json();
      const vp = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
      if (!vp) throw new Error('Prompt kosong dari API.');
      cache[cacheKey] = vp;
      if (header) header.dataset.clipPromptCache = JSON.stringify(cache);
      return { clipIdx, vp, cards };
    }

    // === CAPTION ===
    async function requestCaption() {
      const cards = Array.from(grid.querySelectorAll('.result-card')).filter(c => c.dataset.title);
      if (!cards.length) throw new Error('Belum ada scene — generate story dulu.');
      const cacheKey = audioLang;
      let cache = {};
      try { cache = JSON.parse(grid.dataset.captionCache || '{}'); } catch (e) { cache = {}; }
      if (cache[cacheKey]) return { text: cache[cacheKey], cached: true };
      const storyList = cards.map((c, i) => `${i + 1}. ${c.dataset.title || 'Scene'}`).join('\n');
      const theme = currentTheme();
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const systemPrompt = `You are a social media copywriter for short-form video (TikTok, Instagram Reels, YouTube Shorts). Write ready-to-post captions in ${LANG_LABEL[audioLang] || 'Indonesian'} for ONE final ${cfg.subject} viral process/transformation video assembled from the storyboard below.

Output EXACTLY this structure, using these exact delimiter lines:

=== SOFT-SELLING ===
(caption: relatable opening hook + short value points + soft CTA)
=== STORYTELLING ===
(caption: narrative hook that follows the storyboard arc + CTA)
=== HARD-SELLING ===
(caption: direct benefit hook + urgency + strong CTA)
=== HASHTAG ===
(one line: 10-15 hashtags, mix niche hashtags from the topic/category with popular general ones)

Rules:
1. Lean into the "oddly satisfying / how is this possible" curiosity that makes process videos go viral.
2. Each caption: hook on the first line, 2-4 short lines total, tasteful emoji allowed, ready to paste as-is.
3. Match the mood to the video style if given.
4. Output ONLY the structure above — no explanations, no extra markdown.`;
      const userText = `Process/subject context: "${viralContext()}".${theme ? ` Video style/mood: "${theme}".` : ''} Storyboard of the final video, in order:\n${storyList}`;
      const payload = { contents: [{ parts: [{ text: userText }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
      const result = await (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).json();
      const text = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
      if (!text) throw new Error('Caption kosong dari API.');
      cache[cacheKey] = text;
      grid.dataset.captionCache = JSON.stringify(cache);
      return { text };
    }

    function parseCaptionText(text) {
      const secs = [
        { key: 'soft', label: 'Soft-Selling', re: /===\s*SOFT-SELLING\s*===([\s\S]*?)(?====|$)/i },
        { key: 'story', label: 'Storytelling', re: /===\s*STORYTELLING\s*===([\s\S]*?)(?====|$)/i },
        { key: 'hard', label: 'Hard-Selling', re: /===\s*HARD-SELLING\s*===([\s\S]*?)(?====|$)/i },
        { key: 'hashtag', label: 'Hashtag', re: /===\s*HASHTAG\s*===([\s\S]*?)(?====|$)/i }
      ];
      const out = [];
      secs.forEach(s => { const m = text.match(s.re); if (m && m[1].trim()) out.push({ key: s.key, label: s.label, body: m[1].trim() }); });
      return out.length ? out : [{ key: 'all', label: 'Caption', body: text }];
    }

    function showCaptionModal() {
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const loadingHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-4 text-gray-800"><i class="fas fa-hashtag text-cyan-500 mr-2"></i>Membuat Caption...</h3><div class="flex items-center justify-center py-8"><div class="loader"></div></div></div>`;
      modal.innerHTML = loadingHTML;
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      async function run() {
        modal.innerHTML = loadingHTML;
        try {
          const { text } = await requestCaption();
          const parts = parseCaptionText(text);
          const blocks = parts.map((s, i) => `
            <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-3">
              <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">${window.escHtml(s.label)}</span><button data-copyone="${i}" class="text-xs bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>Copy</button></div>
              <textarea data-cap="${i}" rows="${s.key === 'hashtag' ? 3 : 5}" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm resize-none">${window.escHtml(s.body)}</textarea>
            </div>`).join('');
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
            <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-hashtag text-cyan-500 mr-2"></i>Caption Video</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
            ${blocks}
            <div class="flex gap-2">
              <button data-copyall class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-copy mr-1"></i>Copy Semua</button>
              <button data-txt class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-download mr-1"></i>Unduh .txt</button>
            </div>
          </div>`;
          modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
          modal.querySelectorAll('[data-copyone]').forEach(btn => btn.addEventListener('click', () => {
            const ta = modal.querySelector(`[data-cap="${btn.dataset.copyone}"]`);
            const ok = window.copyText(ta.value);
            if (!ok) { ta.focus(); ta.select(); }
            btn.innerHTML = ok ? '<i class="fas fa-check mr-1 pointer-events-none"></i>Tersalin!' : '<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>Tekan Ctrl+C';
            setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy mr-1 pointer-events-none"></i>Copy'; }, 2000);
          }));
          const aggregate = () => parts.map(s => `# ${s.label}\n${s.body}`).join('\n\n');
          const copyAllBtn = modal.querySelector('[data-copyall]');
          copyAllBtn.addEventListener('click', () => {
            const ok = window.copyText(aggregate());
            copyAllBtn.innerHTML = ok ? '<i class="fas fa-check mr-1"></i>Tersalin!' : '<i class="fas fa-download mr-1"></i>Pakai Unduh .txt';
            setTimeout(() => { copyAllBtn.innerHTML = '<i class="fas fa-copy mr-1"></i>Copy Semua'; }, 2200);
          });
          modal.querySelector('[data-txt]').addEventListener('click', () => {
            const b = new Blob([aggregate()], { type: 'text/plain' });
            const u = URL.createObjectURL(b);
            window.downloadDataURINew(u, `${cfg.filenamePrefix}_caption.txt`);
            setTimeout(() => URL.revokeObjectURL(u), 1500);
          });
        } catch (err) {
          console.error('caption error', err);
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-3 text-red-600"><i class="fas fa-triangle-exclamation mr-2"></i>Gagal membuat caption</h3><p class="text-gray-700 text-sm mb-4">${window.escHtml(err.message)}</p><div class="flex gap-2"><button data-retry class="flex-1 btn-primary py-2 rounded-lg font-semibold"><i class="fas fa-rotate-right mr-1"></i>Coba Lagi</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold">Tutup</button></div></div>`;
          modal.querySelector('[data-close]').addEventListener('click', close);
          modal.querySelector('[data-retry]').addEventListener('click', run);
        }
      }
      run();
    }
    // === END CAPTION ===

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

    async function generateAllVideoPrompts(clipIdx) {
      const allCards = Array.from(grid.querySelectorAll('.result-card'));
      let pool = allCards;
      if (clipIdx) {
        const plan = window.clipPlan(durState.platform, durState.duration);
        pool = allCards.slice((clipIdx - 1) * plan.perClip, clipIdx * plan.perClip);
      }
      const cards = pool.filter(c => c.querySelector('img'));
      if (!cards.length) return;
      const total = cards.length;
      const sceneNo = (card) => allCards.indexOf(card) + 1;
      const sceneTotal = allCards.length;
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[88vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-2"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>${clipIdx ? `Prompt Per Scene — Klip ${clipIdx}` : 'Semua Prompt Video'} (${total} scene)</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
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
        return resultsByIdx.map((r) => r ? `# Scene ${r.no}/${sceneTotal}: ${r.title}\n${r.vp}` : null).filter(Boolean).join('\n\n');
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
        window.downloadDataURINew(u, `${cfg.filenamePrefix}${clipIdx ? `_klip${clipIdx}` : ''}_video_prompts.txt`);
        setTimeout(() => URL.revokeObjectURL(u), 1500);
      });

      async function runBlock(i, card, ta, st, retryBtn) {
        st.innerHTML = '<span class="loader !w-4 !h-4 !border-2 inline-block"></span>';
        retryBtn.classList.add('hidden');
        try {
          const r = await requestVideoPrompt(card);
          ta.value = r.vp;
          resultsByIdx[i] = { no: sceneNo(card), title: card.dataset.title || `Scene ${i + 1}`, vp: r.vp };
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
        block.innerHTML = `<div class="flex items-center justify-between mb-1"><span class="text-sm font-semibold text-gray-700">Scene ${sceneNo(card)}/${sceneTotal}: ${window.escHtml(title)}</span><span class="flex items-center gap-2"><button data-copyone class="text-xs bg-violet-500 hover:bg-violet-600 text-white px-2 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>Copy</button><button data-retry class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-2 py-1 rounded-full hidden"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>Coba Lagi</button><span data-st><span class="loader !w-4 !h-4 !border-2 inline-block"></span></span></span></div><textarea rows="5" readonly class="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 text-xs font-mono resize-none" data-ta></textarea>`;
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

  createViralTab({
    prefix: 'fruitmold', title: 'Generator Video Cetakan Buah', subtitle: 'Buah tumbuh dalam cetakan bentuk lucu — dari pohon sampai laku di pasar.',
    filenamePrefix: 'cetakan_buah', analyzingMsg: 'AI sedang menyusun proses cetakan buah...',
    subject: 'a real fruit growing inside a transparent rigid plastic mold shaped like an animal, so the fruit slowly fills the mold and takes its shape, then is harvested and sold',
    arc: 'pasang cetakan bening pada buah kecil di pohon → buah tumbuh mengisi cetakan → buah penuh berbentuk sesuai cetakan → dipanen dan dibuka dari cetakan → dijual/dipajang di pasar',
    chipGroups: [
      { key: 'buah', label: 'Buah', options: ['Anggur', 'Apel', 'Melon', 'Semangka', 'Jeruk', 'Pir', 'Labu', 'Stroberi besar'] },
      { key: 'bentuk cetakan', label: 'Bentuk Cetakan', options: ['Keledai', 'Beruang', 'Hati', 'Bintang', 'Wajah lucu', 'Kelinci', 'Buddha', 'Kubus'] },
      { key: 'latar', label: 'Latar', options: ['Kebun/pohon', 'Rumah kaca', 'Pasar tradisional', 'Studio', 'Halaman rumah'] },
      { key: 'gaya', label: 'Gaya Video', options: ['Satisfying santai', 'Time-lapse cepat', 'Sinematik', 'POV tangan'] },
    ],
  });

  createViralTab({
    prefix: 'housebuild', title: 'Generator Video Pembangunan Rumah', subtitle: 'Dari lahan kosong sampai rumah jadi — progresi konstruksi yang memuaskan.',
    filenamePrefix: 'bangun_rumah', analyzingMsg: 'AI sedang menyusun proses pembangunan...', defaultAudio: 'timelapse',
    subject: 'the step-by-step construction of a house on an empty plot of land, from clearing and foundation to walls, roof and the finished furnished house',
    arc: 'lahan kosong → penggalian & pondasi → struktur & dinding → atap terpasang → finishing & cat → rumah jadi lengkap dengan taman',
    chipGroups: [
      { key: 'tipe rumah', label: 'Tipe Rumah', options: ['Minimalis 1 lantai', '2 lantai', 'Villa', 'Cabin kayu', 'Ruko', 'Rumah mewah modern'] },
      { key: 'gaya arsitektur', label: 'Gaya Arsitektur', options: ['Modern minimalis', 'Skandinavia', 'Industrial', 'Tropis', 'Klasik mewah', 'Jepang'] },
      { key: 'lokasi', label: 'Lokasi', options: ['Pedesaan', 'Tepi pantai', 'Perkotaan', 'Pegunungan', 'Tengah hutan'] },
      { key: 'kecepatan', label: 'Kecepatan Proses', options: ['Time-lapse cepat', 'Bertahap detail', 'Sinematik'] },
    ],
  });

  createViralTab({
    prefix: 'landclear', title: 'Generator Video Pembersihan Lahan', subtitle: 'Before kotor → proses → after bersih rapi. Transformasi satisfying.',
    filenamePrefix: 'bersih_lahan', analyzingMsg: 'AI sedang menyusun proses pembersihan...', defaultAudio: 'timelapse',
    subject: 'a satisfying land/area clearing transformation, from an overgrown or dirty state through the cleaning process to a clean, tidy final result',
    arc: 'kondisi awal kotor/semak lebat → mulai proses pembersihan → setengah jalan terlihat perubahan → area hampir bersih → hasil akhir rapi & memuaskan',
    chipGroups: [
      { key: 'jenis lahan', label: 'Jenis Lahan', options: ['Semak belukar', 'Kebun terbengkalai', 'Halaman kotor', 'Lahan sampah', 'Selokan/kolam', 'Sungai'] },
      { key: 'metode', label: 'Metode', options: ['Manual (parang/cangkul)', 'Alat berat (excavator)', 'Mesin potong rumput', 'Kombinasi'] },
      { key: 'hasil akhir', label: 'Hasil Akhir', options: ['Taman rapi', 'Lahan siap tanam', 'Halaman bersih', 'Kebun sayur', 'Rumput hijau'] },
      { key: 'gaya', label: 'Gaya Video', options: ['Before-after satisfying', 'Time-lapse', 'POV pekerja'] },
    ],
  });

  createViralTab({
    prefix: 'viralcustom', title: 'Generator Video Viral Custom', subtitle: 'Racik ide proses/transformasimu sendiri — AI yang pecah jadi scene.',
    filenamePrefix: 'viral_custom', analyzingMsg: 'AI sedang meracik ide viralmu...',
    custom: true,
    subject: 'a custom viral process/transformation',
    arc: 'titik awal jelas → proses/transformasi bertahap yang bikin penasaran → hasil akhir sebagai reveal yang memuaskan',
    chipGroups: [
      { key: 'gaya', label: 'Gaya Video', options: ['Satisfying santai', 'Time-lapse cepat', 'Sinematik', 'POV', 'Dokumenter'] },
      { key: 'latar', label: 'Latar', options: ['Studio', 'Alam terbuka', 'Dalam ruangan', 'Pasar', 'Workshop'] },
    ],
  });

  createViralTab({
    prefix: 'carcrash', title: 'Generator Video Car Crash', subtitle: 'Crash, stunt & destruction fisika mobil — konten viral YouTube/Shorts.',
    filenamePrefix: 'car_crash', analyzingMsg: 'AI sedang menyusun simulasi crash...',
    promptFn: window.buildCarCrashPrompt, noShowcase: true,
    subject: 'a realistic car crash/stunt simulation with soft-body physics destruction',
    arc: 'kendaraan mulai bergerak → aksi fisika memuncak → benturan klimaks → aftermath bangkai dramatis',
    chipGroups: [
      { key: 'jenis aksi', label: 'Jenis Aksi', options: ['Crash tabrakan', 'Obstacle rintangan gila', 'Downhill / terjun ramp', 'vs Objek raksasa', 'Demolition derby', 'Balapan chaos'] },
      { key: 'kendaraan', label: 'Kendaraan', options: ['Sedan', 'SUV', 'Truk', 'Bus sekolah', 'Mobil sport', 'Mobil klasik', 'Pickup', 'Mobil balap', 'Monster truck'] },
      { key: 'arena', label: 'Arena / Lokasi', options: ['Jalan tol', 'Tebing gunung', 'Tangga raksasa', 'Jembatan runtuh', 'Arena beton', 'Gurun', 'Jalan kota', 'Pabrik'] },
      { key: 'gaya', label: 'Gaya Kamera', options: ['Slow-motion sinematik', 'POV dashcam', 'Drone follow', 'Multi-angle replay', 'Time-lapse chaos'] },
    ],
  });

  createViralTab({
    prefix: 'dollcraft', title: 'Generator Video DIY Boneka', subtitle: 'Stop-motion bikin boneka dari kawat bulu + aluminium foil — dari kerangka sampai berdiri jadi.',
    filenamePrefix: 'diy_boneka', analyzingMsg: 'AI sedang menyusun proses pembuatan boneka...', defaultAudio: 'asmr',
    promptFn: window.buildDollCraftPrompt,
    subject: 'a pair of human hands building a handmade character doll on a wooden craft desk, stop-motion DIY tutorial style: shaping a crumpled aluminum foil armature, wrapping it in fuzzy chenille pipe cleaners, dressing and decorating it into a finished doll; top-down first-person camera focused on the hands and desk, warm cozy lighting, craft tools and soft-focus room decor in the background',
    arc: 'bentuk kerangka manusia (armature) dari aluminium foil yang diremas → balut seluruh kerangka dengan kawat bulu warna kulit sampai rata → pasang pakaian kawat bulu (atasan + bawahan sesuai pilihan) → tempel rambut benang, wajah gaya anime bermata besar & aksesori → boneka jadi berdiri tegak di meja (reveal)',
    extraInput: { key: 'deskripsi karakter', label: 'Deskripsi Karakter (opsional)', placeholder: 'Contoh: cewek rambut hitam panjang, crop top ungu, rok lilit pink motif bunga, kacamata kuning di atas kepala', fromImage: true },
    chipGroups: [
      { key: 'karakter', label: 'Karakter', options: ['Cewek anime', 'Cowok anime', 'Chibi lucu', 'Hewan lucu', 'Idol / K-pop', 'Princess', 'Superhero'] },
      { key: 'outfit', label: 'Outfit', options: ['Crop top & rok', 'Dress', 'Hoodie kasual', 'Seragam sekolah', 'Kimono / tradisional', 'Bebas warna-warni'] },
      { key: 'latar meja', label: 'Latar Meja', options: ['Meja kayu cozy', 'Meja putih minimalis', 'Meja kamar aesthetic', 'Meja craft penuh alat'] },
      { key: 'gaya', label: 'Gaya Video', options: ['Stop-motion cepat', 'Timelapse', 'POV tangan close-up', 'Satisfying santai'] },
    ],
  });

  createViralTab({
    prefix: 'bottlecraft', title: 'Generator Video DIY Botol Plastik', subtitle: 'Daur ulang botol plastik bekas jadi pajangan lucu — dari potong botol sampai reveal di meja.',
    filenamePrefix: 'diy_botol', analyzingMsg: 'AI sedang menyusun proses crafting botol...', defaultAudio: 'asmr',
    promptFn: window.buildBottleCraftPrompt,
    subject: 'a pair of human hands with neat nails crafting a cute display figure from recycled plastic bottles on a rustic wooden desk, aesthetic fast-paced DIY tutorial style: cutting bumpy bottle bottoms, sanding the edges, joining pieces with a hot glue gun, decorating with rustic twine, acrylic paint and black marker; close-up and top-down camera focused on the hands and the object, warm natural light from a side window, small potted plants and warm bokeh fairy lights in the background',
    arc: 'potong bagian botol plastik dengan gunting + amplas ujungnya sampai halus → susun & rekatkan potongan jadi bentuk dasar dengan lem tembak → dekorasi: tempel tali rami di sambungan, pasang bagian kecil/kaki, cat detail dengan kuas → gambar wajah & detail akhir dengan spidol → pajangan jadi ditampilkan utuh di meja (reveal)',
    extraInput: { key: 'deskripsi pajangan', label: 'Deskripsi Pajangan (opsional)', placeholder: 'Contoh: kura-kura dengan tempurung dari dasar botol hijau bergelombang, botol biru di tengah, kaki hijau berkuku kuning, mata besar & senyum dari spidol hitam', fromImage: true, imageBtnLabel: 'Ambil ciri dari Foto (objek/hewan — hasil tetap pajangan botol)', imageDescribe: "Describe this object or character's visual appearance in Bahasa Indonesia as ONE short paragraph for a recycled plastic bottle craft maker: bentuk keseluruhan, warna tiap bagian, ciri wajah/detail khas, dan dekorasinya. JANGAN sebut nama karakter, orang, atau franchise. Balas deskripsinya saja." },
    chipGroups: [
      { key: 'bentuk', label: 'Bentuk Pajangan', options: ['Kura-kura', 'Ikan', 'Burung hantu', 'Robot', 'Bunga & pot', 'Celengan babi', 'Lampu hias', 'Kepik / serangga lucu'] },
      { key: 'warna botol', label: 'Warna Botol', options: ['Hijau & biru', 'Bening transparan', 'Warna-warni campur', 'Hijau semua', 'Biru semua'] },
      { key: 'latar meja', label: 'Latar Meja', options: ['Meja kayu rustic + tanaman', 'Meja putih minimalis', 'Meja craft penuh alat', 'Meja kamar aesthetic + fairy lights'] },
      { key: 'gaya', label: 'Gaya Video', options: ['Tutorial cepat (fast-paced)', 'Stop-motion', 'Satisfying santai', 'Timelapse'] },
    ],
  });

  createViralTab({
    prefix: 'metalcraft', title: 'Generator Video DIY Metal Craft', subtitle: 'Miniatur dari mur, ring besi & kawat tembaga — dari susun cangkang sampai reveal di alas kayu.',
    filenamePrefix: 'diy_metal', analyzingMsg: 'AI sedang menyusun proses crafting metal...', defaultAudio: 'asmr',
    promptFn: window.buildMetalCraftPrompt,
    subject: 'a pair of human hands with neat clean nails assembling a miniature figurine from steel hex nuts, round metal washers and thick copper wire on a smooth matte dark grey work surface, fast-paced DIY crafting tutorial style: arranging nuts and washers into patterns, applying drops of clear liquid superglue, twisting thick copper wire into limbs with small pliers, mounting the finished piece on a small oval wooden base; extreme close-up and top-down camera focused entirely on the hands and materials, bright even soft studio lighting that highlights the metallic shine and copper glow, clean minimalist background',
    arc: 'susun mur heksagonal & ring besi membentuk pola melingkar di meja → teteskan superglue bening ke sela-sela untuk merekatkan → lilit & pelintir kawat tembaga jadi kepala (mata bulat dari kawat), empat kaki dan ekor → rakit kerangka kawat tembaga ke cangkang mur yang sudah berbentuk kubah 3D → tutup puncak cangkang dengan mur & ring tambahan → figur jadi dipajang di alas kayu oval (reveal)',
    extraInput: { key: 'deskripsi figur', label: 'Deskripsi Figur (opsional)', placeholder: 'Contoh: kura-kura dengan cangkang kubah dari mur rustic berkarat, kepala & kaki dari lilitan kawat tembaga, mata bulat kawat, di alas kayu oval', fromImage: true, imageBtnLabel: 'Ambil ciri dari Foto (objek/hewan — hasil tetap figur metal)', imageDescribe: "Describe this object or character's visual appearance in Bahasa Indonesia as ONE short paragraph for a metal nuts-and-wire craft maker: bentuk keseluruhan, bagian tubuh utamanya, warna/finish tiap bagian, dan ciri khasnya. JANGAN sebut nama karakter, orang, atau franchise. Balas deskripsinya saja." },
    chipGroups: [
      { key: 'bentuk', label: 'Bentuk Figur', options: ['Kura-kura', 'Laba-laba', 'Kalajengking', 'Burung hantu', 'Capung', 'Semut', 'Motor mini', 'Robot kecil'] },
      { key: 'material', label: 'Material Metal', options: ['Mur rustic berkarat', 'Baja silver mengkilap', 'Dominan kawat tembaga', 'Mur hitam matte', 'Kuningan emas'] },
      { key: 'latar meja', label: 'Latar Meja', options: ['Abu-abu gelap matte', 'Kayu workshop', 'Putih studio', 'Plat logam industrial'] },
      { key: 'gaya', label: 'Gaya Video', options: ['Tutorial cepat (fast-paced)', 'Stop-motion', 'Satisfying santai', 'Timelapse', 'Sinematik makro'] },
    ],
  });

  createViralTab({
    prefix: 'strawcraft', title: 'Generator Video DIY Sedotan', subtitle: 'Model rakitan presisi dari sedotan plastik — dari potong sedotan sampai reveal di cutting mat.',
    filenamePrefix: 'diy_sedotan', analyzingMsg: 'AI sedang menyusun proses rakit sedotan...', defaultAudio: 'asmr',
    promptFn: window.buildStrawCraftPrompt,
    subject: 'a pair of human hands with neat clean nails building a miniature model entirely from colored plastic drinking straws on a smooth plain beige craft cutting mat, precise fast-paced satisfying stop-motion DIY tutorial style: measuring straws with a steel ruler, cutting them with metal scissors, snap-fitting cut pieces into one another to build a tubular frame, assembling wheels from tightly packed circular straw segments, snapping on the outer shell piece by piece, wiping the finished model with a cloth; static extreme close-up camera focused on the fingers and material, bright clean even studio lighting with no harsh shadows, softly blurred background with assorted crafting tools and yellow hand tools',
    arc: 'ukur sedotan dengan penggaris besi lalu potong presisi dengan gunting logam → sambung potongan sedotan jadi kerangka & sasis (snap-fit) → susun potongan sedotan kecil melingkar rapat jadi roda/bagian detail lalu pasang ke sasis → pasang bodi luar satu per satu dengan efek snap-on + detail wajah/mata dan dekal → pasang bagian akhir (spoiler/atap) → lap model jadi dengan kain, dipajang utuh di cutting mat (reveal)',
    extraInput: { key: 'deskripsi model', label: 'Deskripsi Model (opsional)', placeholder: 'Contoh: mobil balap kartun merah glossy, mata besar di kaca depan, aksen petir kuning di samping, roda hitam dari susunan sedotan melingkar, spoiler belakang', fromImage: true, imageBtnLabel: 'Ambil ciri dari Foto (objek/karakter — hasil tetap model sedotan)', imageDescribe: "Describe this object or character's visual appearance in Bahasa Indonesia as ONE short paragraph for a plastic-straw model builder: bentuk keseluruhan, bagian-bagian utamanya, warna tiap bagian, dan ciri khas/detail wajahnya. JANGAN sebut nama karakter, orang, atau franchise. Balas deskripsinya saja." },
    chipGroups: [
      { key: 'bentuk', label: 'Bentuk Model', options: ['Mobil balap kartun', 'Motor', 'Pesawat', 'Helikopter', 'Kapal', 'Robot', 'Rumah mini', 'Kincir angin'] },
      { key: 'warna sedotan', label: 'Warna Sedotan', options: ['Merah', 'Warna-warni campur', 'Biru & putih', 'Hitam & kuning', 'Pastel'] },
      { key: 'latar meja', label: 'Latar Meja', options: ['Cutting mat krem', 'Meja putih studio', 'Meja kayu craft', 'Cutting mat hijau'] },
      { key: 'gaya', label: 'Gaya Video', options: ['Stop-motion cepat', 'Tutorial cepat (fast-paced)', 'Satisfying santai', 'Timelapse'] },
    ],
  });
  // === END VIRAL STUDIO ===

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
