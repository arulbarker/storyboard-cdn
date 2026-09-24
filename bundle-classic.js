
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
      'hdr.product-review.title': 'Generator Review Produk',
      'hdr.product-review.sub': 'Solusi AI untuk konten review produk afiliasi Anda.',
      'hdr.skincare-review.title': 'Generator Review Skincare',
      'hdr.skincare-review.sub': 'Buat scene review skincare profesional untuk konten Anda.',
      'hdr.product-ads.title': 'Generator Story Iklan',
      'hdr.product-ads.sub': 'Solusi AI untuk konten promosi & storyboard iklan brand Anda.',
      'hdr.fashion.title': 'Generator Review Fashion / OOTD',
      'hdr.fashion.sub': 'Storyboard review baju & aksesoris dengan model konsisten.',
      'hdr.unboxing.title': 'Generator Unboxing Scene',
      'hdr.unboxing.sub': 'Storyboard buka paket produk — hook kuat untuk konten afiliasi.',
      'hdr.food-review.title': 'Generator Review Makanan Profesional',
      'hdr.food-review.sub': 'Buat review makanan seperti TikToker & Selebgram dengan AI.',
      'hdr.tutorial.title': 'Generator Tutorial Cara Pakai',
      'hdr.tutorial.sub': 'Story langkah demi langkah: masalah → cara pakai → hasil. Cocok untuk konten edukasi affiliate.',
      'hdr.daily.title': 'Generator Day in My Life',
      'hdr.daily.sub': 'Story vlog harian pagi → malam dengan produk terselip natural. Soft-selling ala TikTok.',
      'hdr.testi.title': 'Generator Testimoni',
      'hdr.testi.sub': 'Story problem → solution ala UGC: keluhan → nemu produk → pakai → hasil. Format iklan konversi.',
      'hdr.grwm.title': 'Generator GRWM',
      'hdr.grwm.sub': 'Get Ready With Me: tampilan awal → tahapan makeup/skincare/outfit → final look. Tren kuat TikTok.',
      'hdr.influencer.title': 'AI Influencer Studio',
      'hdr.influencer.sub': 'Racik model virtual, simpan, lalu pakai di semua fitur review.',
      'step.upload-product': 'Unggah Gambar Produk',
      'step.upload-skincare': 'Unggah Produk Skincare',
      'step.upload-fashion': 'Unggah Produk Fashion',
      'step.upload-food': 'Upload Foto Makanan',
      'step.desc-product': 'Deskripsi Produk',
      'step.desc-skincare': 'Deskripsi Skincare',
      'step.desc-fashion': 'Deskripsi Fashion',
      'step.desc-food': 'Deskripsi Makanan',
      'step.photo-theme': 'Tema Foto',
      'step.theme-setting': 'Tema / Setting',
      'step.theme-ambience': 'Tema / Ambience',
      'step.aspect-ratio': 'Aspect Ratio',
      'step.count': 'Jumlah Generate',
      'step.compose-model': 'Racik Model',
      'step.result': 'Hasil',
      'step.model-library': 'Pustaka Model',
      'field.upload-click-drag': 'Klik atau seret gambar ke sini',
      'field.upload-hint-png': 'PNG, JPG, WEBP (bisa lebih dari satu)',
      'field.upload-click-food': 'Klik untuk upload foto makanan',
      'field.upload-hint-heic': 'JPG, PNG, WEBP, HEIC (iPhone) — bisa lebih dari satu',
      'btn.ai-generate': 'AI Generate',
      'field.upload-click-model': 'Klik untuk pilih foto model',
      'field.model-photo': 'Foto Model',
      'field.optional': '(Opsional)',
      'field.required': '(Wajib)',
      'hint.model-food': 'Reviewer akan tampil mencicipi makanan di semua scene',
      'field.gender': 'Gender',
      'field.age': 'Usia',
      'field.look': 'Negara',
      'field.hijab': 'Hijab',
      'field.influencer.or': 'atau',
      'btn.download-all': 'Unduh Semua',
      'opt.natural-photo': 'Foto Natural (anti-plastik)', 'opt.natural-photo-hint': 'Kurangi kesan AI/CGI — kulit & pencahayaan lebih realistis.',
      'btn.sheet': 'Ekspor Storyboard',
      'loading.sheet': 'Membuat prompt...',
      'warn.no-scene-sheet': 'Belum ada foto scene untuk digabung.',
      'err.sheet': 'Gagal menggabung foto: ',
      'btn.generate.product-review': 'Buat Scene Review',
      'btn.generate.skincare-review': 'Buat Scene Skincare',
      'btn.generate.product-ads': 'Buat Story Iklan',
      'btn.generate.fashion': 'Buat Story Fashion',
      'btn.generate.unboxing': 'Buat Unboxing Scene',
      'btn.generate.food-review': 'Buat Review Makanan',
      'btn.generate.tutorial': 'Buat Story Tutorial',
      'btn.generate.daily': 'Buat Story Harian',
      'btn.generate.testi': 'Buat Story Testimoni',
      'btn.generate.grwm': 'Buat Story GRWM',
      'btn.generate.model': 'Buat Model AI',
      'btn.upload-own-photo': 'Upload Foto Sendiri',
      'btn.influencer.regen': 'Regenerate',
      'btn.influencer.save': 'Simpan',
      'result.heading': 'Hasil Review',
      'result.heading.ads': 'Hasil Story Iklan',
      'result.heading.fashion': 'Hasil Fashion Story',
      'result.heading.unboxing': 'Hasil Unboxing Story',
      'result.heading.food': 'Hasil Review Makanan',
      'result.heading.tutorial': 'Hasil Story Tutorial',
      'result.heading.daily': 'Hasil Day in My Life',
      'result.heading.testi': 'Hasil Story Testimoni',
      'result.heading.grwm': 'Hasil Story GRWM',
      'hint.theme-generic': 'Pilih konsep tempat & mood untuk seluruh scene. "Tidak Ada" = biar AI yang tentukan.',
      'hint.theme-fashion': 'Pilih konsep tempat & gaya untuk seluruh scene OOTD. "Tidak Ada" = biar AI yang tentukan.',
      'hint.theme-ads': 'Pilih konsep tempat & mood untuk seluruh scene iklan. "Tidak Ada" = biar AI yang tentukan.',
      'hint.theme-unboxing': 'Pilih konsep tempat & mood untuk seluruh scene unboxing. "Tidak Ada" = biar AI yang tentukan.',
      'hint.theme-food': 'Pilih konsep tempat & mood untuk seluruh scene makanan. "Tidak Ada" = biar AI yang tentukan.',
      'hint.theme-tutorial': 'Pilih konsep tempat & mood untuk seluruh langkah tutorial. "Tidak Ada" = biar AI yang tentukan.',
      'hint.theme-daily': 'Pilih vibe keseharian untuk seluruh scene. "Tidak Ada" = biar AI yang tentukan.',
      'hint.theme-testi': 'Pilih suasana natural untuk testimoni yang jujur & relatable. "Tidak Ada" = biar AI yang tentukan.',
      'hint.theme-grwm': 'Pilih vibe & occasion GRWM untuk seluruh scene. "Tidak Ada" = biar AI yang tentukan.',
      'tip.desc-quality': 'Tip: deskripsi detail menghasilkan review yang lebih berkualitas.',
      'hint.model-tutorial': 'Model akan memperagakan tiap langkah di semua scene',
      'hint.model-daily': 'Model jadi tokoh utama sepanjang hari',
      'hint.model-testi': 'Model jadi orang yang bertestimoni di semua scene',
      'hint.model-grwm': 'Model yang sama dari awal sampai siap pergi',
      'hint.model-required-daily': 'Day in My Life bercerita tentang orangnya — foto model wajib supaya wajah konsisten di semua scene.',
      'hint.model-required-grwm': 'GRWM bercerita tentang proses bersiap orangnya — foto model wajib supaya wajah konsisten dari polos sampai final look.',
      'hint.product-tutorial': 'Cocok untuk: hampir semua produk yang punya cara pakai — skincare, gadget, alat dapur, peralatan rumah, produk perawatan.',
      'hint.product-daily': 'Cocok untuk: produk yang dipakai sehari-hari — tumbler, tas, gadget, skincare, outfit kasual, snack/minuman.',
      'hint.product-testi': 'Cocok untuk: produk pemecah masalah yang ada efek sebelum-sesudahnya — obat jerawat, pembersih, suplemen, alat bantu.',
      'hint.product-grwm': 'Cocok untuk: produk dandan — makeup, skincare, hijab, parfum, aksesori. Story selalu mulai dari tampilan polos → final look; untuk baju/outfit lebih pas pakai tab <strong>Review Fashion</strong>.',
      'hint.influencer-empty': 'Belum ada foto — racik lalu klik "Buat Model AI".',
      'ph.desc-product': 'Deskripsikan produk Anda... atau gunakan AI Generate',
      'ph.desc-skincare': 'Deskripsikan skincare Anda (kandungan, manfaat, tekstur)... atau gunakan AI Generate',
      'ph.desc-ads': 'Deskripsikan produk & pesan iklan Anda... atau gunakan AI Generate',
      'ph.desc-fashion': 'Jelaskan item fashion (jenis, bahan, gaya, ukuran)... atau gunakan AI Generate',
      'ph.desc-unboxing': 'Deskripsikan produk & isi paketnya... atau gunakan AI Generate',
      'ph.desc-food': 'Jelaskan makanan ini (nama, rasa, tekstur, bahan, harga)... atau gunakan AI Generate',
      'ph.desc-tutorial': 'Deskripsikan produk & cara pakainya... atau gunakan AI Generate',
      'ph.desc-daily': 'Deskripsikan produk & kapan dipakainya dalam sehari... atau gunakan AI Generate',
      'ph.desc-testi': 'Deskripsikan produk & masalah yang dipecahkannya... atau gunakan AI Generate',
      'ph.desc-grwm': 'Deskripsikan produk & untuk acara apa bersiap-siapnya... atau gunakan AI Generate',
      'ph.review-theme': 'Tulis tema sendiri: minimalis & bersih, nuansa alam tropis, futuristik neon...',
      'ph.skincare-theme': 'Tulis tema sendiri: clean beauty, glowing skin, aesthetic pastel...',
      'ph.ads-theme': 'Tulis tema sendiri: urban modern, luxury dark, cerah ceria outdoor...',
      'ph.fashion-theme': 'Tulis tema sendiri: street style urban, aesthetic pastel, studio minimalis...',
      'ph.unboxing-theme': 'Tulis tema sendiri: meja kayu hangat, studio bersih, nuansa cozy...',
      'ph.food-theme': 'Tulis tema sendiri: rustic kayu hangat, moody low-key, cerah high-key studio...',
      'ph.tutorial-theme': 'Tulis tema sendiri: meja kayu hangat, studio bersih, nuansa cozy...',
      'ph.daily-theme': 'Tulis vibe sendiri: pagi cozy, kerja di kafe, sore di taman...',
      'ph.testi-theme': 'Tulis suasana sendiri: kamar apa adanya, teras sore, selfie-cam...',
      'ph.grwm-theme': 'Tulis vibe sendiri: vanity ringlight, GRWM kondangan, clean girl...',
      'ph.custom-theme': 'Tulis tema sendiri...',
      'ph.model-name': 'Nama model, mis. Salsa',
      'btn.all-video-prompt': 'Semua Prompt Video',
      'mode.duration': 'Durasi Video',
      'mode.count': 'Jumlah Foto',
      'btn.pick-model-library': 'Pilih dari Pustaka Model',
      'btn.retry': 'Coba Lagi',
      'title.regenerate': 'Regenerate',
      'title.editprompt': 'Edit Prompt',
      'title.video': 'Buat Prompt Video',
      'title.download': 'Unduh',
      'loading.visual': 'Membuat Visual...',
      'loading.continue': 'Melanjutkan cerita...',
      'loading.caption': 'Membuat Caption...',
      'loading.clip-prompt': 'Membuat Prompt Klip',
      'loading.video-prompt': 'Membuat Prompt Video...',
      'msg.scene-failed': 'Scene gagal dibuat',
      'btn.copy': 'Copy',
      'btn.copy-all': 'Copy Semua',
      'btn.download-txt': 'Unduh .txt',
      'msg.copied': 'Tersalin!',
      'msg.use-download-txt': 'Pakai Unduh .txt',
      'msg.press-ctrl-c': 'Tekan Ctrl+C',
      'modal.edit-prompt-title': 'Edit Prompt Gambar',
      'modal.caption-title': 'Caption Video',
      'login.subtitle': 'Masuk dengan email pembelianmu',
      'login.email-ph': 'Email pembelian...',
      'login.submit': 'Masuk',
      'login.checking': 'Memeriksa akses...',
      'login.no-access': 'Belum punya akses?',
      'login.buy-lynk': 'Beli di Lynk.id',
      'login.buy-mayar': 'Beli di Mayar',
      'err.login.email-required': 'Masukkan email pembelianmu dulu.',
      'err.login.invalid-email': 'Format email tidak valid.',
      'err.login.failed': 'Login gagal. Periksa email atau koneksi lalu coba lagi.',
      'warn.model-required': 'Fitur ini butuh Foto Model — upload foto model dulu ya.',
      'warn.viral-idea-required': 'Tulis dulu ide proses viralmu ya.',
      'warn.model-name-required': 'Kasih nama modelnya dulu ya.',
      'warn.library-full': 'Pustaka penuh (maksimal 5 model). Hapus salah satu dulu ya.',
      'warn.no-models': 'Belum ada model tersimpan — buat dulu di menu AI Influencer.',
      'warn.google-limit': 'Akun Google ini sudah mencapai batas, silakan gunakan akun Google lain.',
      'warn.file-unreadable': 'File tidak bisa dibaca — pastikan itu file gambar (JPG/PNG/HEIC).',
      'warn.session-ended': 'Sesi berakhir. Akun ini login di perangkat lain.',
      'menu.model-studio': 'Model Studio', 'menu.viral': 'Video Short Viral', 'nav.logout': 'Keluar',
      'menu.guide': '⭐ Mulai Di Sini', 'nav.guide': 'Panduan Aplikasi', 'navd.guide': 'Cara pakai semua fitur', 'hdr.guide.title': 'Panduan Aplikasi', 'hdr.guide.sub': 'Klik tiap bagian untuk membuka penjelasannya.',
      'nav.influencer': 'AI Influencer', 'navd.influencer': 'Buat & simpan model AI',
      'nav.talker': 'Influencer Bicara', 'navd.talker': 'Konten bicara per niche',
      'hdr.talker.title': 'AI Influencer Bicara', 'hdr.talker.sub': 'Naskah nyambung antar klip — satukan di CapCut jadi satu monolog utuh.',
      'talk.step-model': 'Foto Model (Wajib)', 'talk.step-niche': 'Pilih Niche', 'talk.step-topic': 'Topik (Opsional)',
      'talk.islami-note': 'Naskah dakwah dibuat AI — hindari mengutip ayat/hadits, tinjau sendiri sebelum posting.',
      'talk.step-latar': 'Latar', 'talk.step-gaya': 'Gaya Bicara', 'talk.step-branding': 'Nama Akun di Backdrop (Opsional)',
      'talk.step-duration': 'Platform & Durasi', 'talk.script-lang': 'Bahasa naskah',
      'talk.btn-script': 'Buat Naskah', 'talk.btn-rescript': 'Buat Ulang Naskah', 'talk.btn-photos': 'Generate Foto',
      'talk.script-title': 'Naskah per Klip (bisa diedit)', 'talk.result': 'Hasil Klip', 'talk.btn-copy': 'Salin Semua',
      'talk.flow-copy': 'Salin Prompt Flow', 'talk.flow-hint': 'Tombol 📋 = salin prompt siap-pakai untuk Flow/Veo (gambar storyboard dibaca AI, lembarannya tidak ikut ke video).',
      'ph.talk-topic': 'Contoh: ikhlas menghadapi ujian hidup', 'ph.talk-branding': 'Contoh: Ruang Bicara bersama Arul', 'ph.talk-suasana-custom': 'Tulis suasana sendiri, cth: studio gelap dengan lampu neon merah',
      'warn.talker-model-required': 'Pilih foto model dulu (upload atau dari Pustaka Model).',
      'talk.step-product': 'Foto Produk (Opsional, maks 5)',
      'talk.product-hint': 'Baju, sepatu, tas, dll — influencer akan memakainya di foto (cocok untuk affiliate).',
      'btn.upload-product': 'Upload Produk',
      'btn.pick-product-library': 'Pustaka Produk',
      'btn.save-product': 'Simpan ke akun',
      'badge.product-saved': 'Tersimpan',
      'modal.product-name': 'Nama produk',
      'warn.product-limit': 'Maksimal 5 produk per video.',
      'warn.product-name-required': 'Isi nama produk dulu.',
      'warn.product-library-full': 'Pustaka produk penuh (maksimal 5 produk).',
      'warn.no-products': 'Belum ada produk tersimpan.',
      'confirm.delete-product': 'Hapus produk "%N" dari akun?',
      'talk.step-brand': 'Logo/Brand Sponsor (Opsional)',
      'talk.brand-hint': 'Tampil sebagai properti set (layar/papan di meja atau banner di latar) — tidak disimpan ke akun.',
      'field.upload-click-brand': 'Klik untuk pilih logo brand',
      'talk.step-suasana': 'Suasana',
      'talk.step-angle': 'Angle Kamera',
      'warn.talker-script-first': 'Buat naskah dulu sebelum generate foto.',
      'warn.talker-custom-empty': 'Isi dulu teks custom-nya ya.',
      'err.talker-script': 'Gagal membuat naskah: ',
      'talk.caption-title': 'Caption & Hashtag', 'talk.btn-recaption': 'Buat Ulang Caption',
      'talk.caption-hint': 'Caption otomatis dari naskah — edit naskah lalu tekan Buat Ulang Caption kalau berubah.',
      'cap.short': 'Caption Pendek', 'cap.long': 'Caption Panjang', 'cap.hashtag': 'Hashtag',
      'loading.talker-caption': 'AI sedang menulis caption...', 'err.talker-caption': 'Gagal membuat caption: ',
      'loading.talker-script': 'AI sedang menulis naskah...', 'loading.talker-photos': 'Membuat foto klip...',
      'navd.product-review': 'Foto review produk afiliasi', 'navd.skincare-review': 'Scene review skincare',
      'navd.fashion': 'OOTD & fashion story', 'navd.unboxing': 'Story buka paket produk',
      'navd.product-ads': 'Storyboard iklan brand', 'navd.food-review': 'Food review ala selebgram',
      'navd.tutorial': 'Story cara pakai produk', 'navd.daily': 'Vlog harian + produk',
      'navd.testi': 'Story masalah → solusi', 'navd.grwm': 'Get ready with me story',
      'nav.viralcustom': 'Custom Viral', 'navd.viralcustom': 'Racik ide prosesmu sendiri',
      'nav.fruitmold': 'Cetakan Buah', 'navd.fruitmold': 'Buah tumbuh dalam cetakan lucu',
      'nav.housebuild': 'Pembangunan Rumah', 'navd.housebuild': 'Lahan kosong → rumah jadi',
      'nav.landclear': 'Pembersihan Lahan', 'navd.landclear': 'Kotor → bersih satisfying',
      'nav.carcrash': 'Car Crash', 'navd.carcrash': 'Crash & stunt fisika mobil',
      'nav.dollcraft': 'DIY Boneka', 'navd.dollcraft': 'Stop-motion boneka pipe cleaner',
      'nav.bottlecraft': 'DIY Botol Plastik', 'navd.bottlecraft': 'Daur ulang botol jadi pajangan',
      'nav.metalcraft': 'DIY Metal Craft', 'navd.metalcraft': 'Miniatur dari mur & kawat tembaga',
      'nav.strawcraft': 'DIY Sedotan', 'navd.strawcraft': 'Model rakitan dari sedotan plastik',
      'menu.kids': 'Cerita Anak',
      'nav.kidpedia': 'Ensiklopedia Anak', 'navd.kidpedia': 'Pengetahuan 1 subjek untuk anak',
      'nav.kidcycle': 'Siklus Hidup', 'navd.kidcycle': 'Telur jadi kupu-kupu, biji jadi pohon',
      'nav.tutorial-app': 'Tutorial Aplikasi', 'navd.tutorial-app': 'Video cara pakai app ini',
      'tut.title': 'Pilih Video Tutorial', 'tut.basic': 'Tutorial Dasar Aplikasi', 'tut.new': 'Tutorial Terbaru',
      'dur.platform': 'Platform video', 'dur.story-duration': 'Durasi story',
      'unit.photos': 'foto', 'unit.clips': 'klip', 'unit.sec-per-clip': 'dtk/klip', 'unit.sec': 'dtk',
      'modal.close': 'Tutup', 'modal.fail-prompt': 'Gagal membuat prompt', 'btn.save': 'Simpan', 'btn.cancel': 'Batal',
      'progress.preparing': 'Menyiapkan', 'progress.done': 'Selesai', 'unit.prompt': 'prompt', 'unit.keyframe': 'keyframe',
      'vp.title-prefix': 'Prompt Video — Scene', 'vp.section-label': 'Video Prompt', 'vp.per-scene': 'Prompt Per Scene',
      'vp.all-clip-prompts': 'Semua Prompt Klip', 'vp.clip-title-prefix': 'Prompt Video — Klip', 'vp.one-clip-prompt': 'Satu prompt untuk SATU klip utuh',
      'edit.hint': 'Ubah prompt gambar scene ini, lalu klik <strong>Simpan</strong>. Tekan tombol <strong>Regenerate</strong> di kartu untuk membuat ulang gambar dengan prompt baru.',
      'vp.tips': '<strong>Tips:</strong> pakai tombol <strong>Semua Prompt Video</strong> untuk ambil semua scene sekaligus. Copy tiap prompt ke platform image-to-video (Runway, Pika, Kling, Veo) dengan gambar scene-nya, gabung berurutan → satu cerita utuh.',
      'clip.howto': '<strong>Cara pakai:</strong> unggah %C foto klip ini BERURUTAN ke platform image-to-video (%P) + paste prompt ini → 1 klip %S dtk. Gabungkan semua klip berurutan di CapCut/editor → satu story utuh.',
      'err.continue-story': 'Gagal melanjutkan cerita: ', 'err.delete-server': 'Gagal menghapus di server — cek koneksi lalu coba lagi.', 'err.read-photo': 'Gagal membaca foto: ', 'ok.features-extracted': 'Ciri karakter berhasil diambil dari foto — silakan edit kalau perlu.', 'warn.storage-unavailable': 'Penyimpanan browser tidak tersedia (mode private/incognito?). Model tidak tersimpan — kamu tetap bisa klik kanan foto untuk menyimpannya manual.', 'warn.storage-short': 'Penyimpanan browser tidak tersedia di sesi ini.', 'ph.group-custom': 'Tulis %L versimu sendiri...',
      'lib.empty': 'Belum ada model — racik di atas lalu Simpan.', 'ios.save-hint': 'Tekan dan <b>tahan</b> foto di bawah, lalu pilih <b>"Simpan ke Foto"</b> atau <b>"Tambahkan ke Foto"</b>.',
      'whatsnew.title': 'Yang Baru', 'whatsnew.empty': 'Belum ada catatan perubahan.',
      'btn.delete': 'Hapus', 'confirm.delete-model': 'Hapus model "%N"?',
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
      'hdr.product-review.title': 'Product Review Generator',
      'hdr.product-review.sub': 'AI solution for your affiliate product review content.',
      'hdr.skincare-review.title': 'Skincare Review Generator',
      'hdr.skincare-review.sub': 'Create professional skincare review scenes for your content.',
      'hdr.product-ads.title': 'Ad Story Generator',
      'hdr.product-ads.sub': 'AI solution for promotional content & brand ad storyboards.',
      'hdr.fashion.title': 'Fashion / OOTD Review Generator',
      'hdr.fashion.sub': 'Storyboard clothing & accessories reviews with consistent models.',
      'hdr.unboxing.title': 'Unboxing Scene Generator',
      'hdr.unboxing.sub': 'Product unboxing storyboard — strong hooks for affiliate content.',
      'hdr.food-review.title': 'Professional Food Review Generator',
      'hdr.food-review.sub': 'Create food reviews like TikTokers & Influencers with AI.',
      'hdr.tutorial.title': 'How-To Tutorial Generator',
      'hdr.tutorial.sub': 'Step-by-step story: problem → usage → result. Perfect for affiliate education content.',
      'hdr.daily.title': 'Day in My Life Generator',
      'hdr.daily.sub': 'Morning to night daily vlog story with products naturally integrated. Soft-selling TikTok style.',
      'hdr.testi.title': 'Testimonial Generator',
      'hdr.testi.sub': 'Problem → solution story UGC style: complaint → found product → used → result. Conversion ad format.',
      'hdr.grwm.title': 'GRWM Generator',
      'hdr.grwm.sub': 'Get Ready With Me: initial look → makeup/skincare/outfit steps → final look. TikTok trend.',
      'hdr.influencer.title': 'AI Influencer Studio',
      'hdr.influencer.sub': 'Design virtual models, save them, then use across all review features.',
      'step.upload-product': 'Upload Product Image',
      'step.upload-skincare': 'Upload Skincare Product',
      'step.upload-fashion': 'Upload Fashion Product',
      'step.upload-food': 'Upload Food Photo',
      'step.desc-product': 'Product Description',
      'step.desc-skincare': 'Skincare Description',
      'step.desc-fashion': 'Fashion Description',
      'step.desc-food': 'Food Description',
      'step.photo-theme': 'Photo Theme',
      'step.theme-setting': 'Theme / Setting',
      'step.theme-ambience': 'Theme / Ambience',
      'step.aspect-ratio': 'Aspect Ratio',
      'step.count': 'Generate Count',
      'step.compose-model': 'Design Model',
      'step.result': 'Result',
      'step.model-library': 'Model Library',
      'field.upload-click-drag': 'Click or drag image here',
      'field.upload-hint-png': 'PNG, JPG, WEBP (multiple allowed)',
      'field.upload-click-food': 'Click to upload food photo',
      'field.upload-hint-heic': 'JPG, PNG, WEBP, HEIC (iPhone) — multiple allowed',
      'btn.ai-generate': 'AI Generate',
      'field.upload-click-model': 'Click to select model photo',
      'field.model-photo': 'Model Photo',
      'field.optional': '(Optional)',
      'field.required': '(Required)',
      'hint.model-food': 'Reviewer will appear tasting the food in all scenes',
      'field.gender': 'Gender',
      'field.age': 'Age',
      'field.look': 'Country',
      'field.hijab': 'Hijab',
      'field.influencer.or': 'or',
      'btn.download-all': 'Download All',
      'opt.natural-photo': 'Natural Photo (less plastic)', 'opt.natural-photo-hint': 'Reduces the AI/CGI look — more realistic skin & lighting.',
      'btn.sheet': 'Export Storyboard',
      'loading.sheet': 'Generating prompts...',
      'warn.no-scene-sheet': 'No scene photos to merge yet.',
      'err.sheet': 'Failed to merge image: ',
      'btn.generate.product-review': 'Create Review Scene',
      'btn.generate.skincare-review': 'Create Skincare Scene',
      'btn.generate.product-ads': 'Create Ad Story',
      'btn.generate.fashion': 'Create Fashion Story',
      'btn.generate.unboxing': 'Create Unboxing Scene',
      'btn.generate.food-review': 'Create Food Review',
      'btn.generate.tutorial': 'Create Tutorial Story',
      'btn.generate.daily': 'Create Daily Story',
      'btn.generate.testi': 'Create Testimonial Story',
      'btn.generate.grwm': 'Create GRWM Story',
      'btn.generate.model': 'Create AI Model',
      'btn.upload-own-photo': 'Upload Your Own Photo',
      'btn.influencer.regen': 'Regenerate',
      'btn.influencer.save': 'Save',
      'result.heading': 'Review Results',
      'result.heading.ads': 'Ad Story Results',
      'result.heading.fashion': 'Fashion Story Results',
      'result.heading.unboxing': 'Unboxing Story Results',
      'result.heading.food': 'Food Review Results',
      'result.heading.tutorial': 'Tutorial Story Results',
      'result.heading.daily': 'Day in My Life Results',
      'result.heading.testi': 'Testimonial Story Results',
      'result.heading.grwm': 'GRWM Story Results',
      'hint.theme-generic': 'Choose a place concept & mood for all scenes. "None" = let AI decide.',
      'hint.theme-fashion': 'Choose a place concept & style for all OOTD scenes. "None" = let AI decide.',
      'hint.theme-ads': 'Choose a place concept & mood for all ad scenes. "None" = let AI decide.',
      'hint.theme-unboxing': 'Choose a place concept & mood for all unboxing scenes. "None" = let AI decide.',
      'hint.theme-food': 'Choose a place concept & mood for all food scenes. "None" = let AI decide.',
      'hint.theme-tutorial': 'Choose a place concept & mood for all tutorial steps. "None" = let AI decide.',
      'hint.theme-daily': 'Choose a daily vibe for all scenes. "None" = let AI decide.',
      'hint.theme-testi': 'Choose a natural setting for honest & relatable testimonials. "None" = let AI decide.',
      'hint.theme-grwm': 'Choose a GRWM vibe & occasion for all scenes. "None" = let AI decide.',
      'tip.desc-quality': 'Tip: detailed descriptions produce higher quality reviews.',
      'hint.model-tutorial': 'Model will demonstrate each step in all scenes',
      'hint.model-daily': 'Model becomes the main character throughout the day',
      'hint.model-testi': 'Model becomes the person giving testimonials in all scenes',
      'hint.model-grwm': 'Same model from start to ready to go',
      'hint.model-required-daily': 'Day in My Life is about the person — a model photo is required for consistent face across all scenes.',
      'hint.model-required-grwm': 'GRWM is about the getting-ready process — a model photo is required for consistent face from bare to final look.',
      'hint.product-tutorial': 'Works for: almost any product with instructions — skincare, gadgets, kitchen tools, home equipment, care products.',
      'hint.product-daily': 'Works for: everyday products — tumblers, bags, gadgets, skincare, casual outfits, snacks/drinks.',
      'hint.product-testi': 'Works for: problem-solving products with before-after effects — acne treatment, cleaners, supplements, aids.',
      'hint.product-grwm': 'Works for: beauty products — makeup, skincare, hijab, perfume, accessories. Story always starts bare → final look; for clothing/outfits use the <strong>Fashion Review</strong> tab.',
      'hint.influencer-empty': 'No photo yet — design and click "Create AI Model".',
      'ph.desc-product': 'Describe your product... or use AI Generate',
      'ph.desc-skincare': 'Describe your skincare (ingredients, benefits, texture)... or use AI Generate',
      'ph.desc-ads': 'Describe the product & your ad message... or use AI Generate',
      'ph.desc-fashion': 'Describe the fashion item (type, fabric, style, size)... or use AI Generate',
      'ph.desc-unboxing': 'Describe the product & package contents... or use AI Generate',
      'ph.desc-food': 'Describe this food (name, taste, texture, ingredients, price)... or use AI Generate',
      'ph.desc-tutorial': 'Describe the product & how to use it... or use AI Generate',
      'ph.desc-daily': 'Describe the product & when it is used throughout the day... or use AI Generate',
      'ph.desc-testi': 'Describe the product & the problem it solves... or use AI Generate',
      'ph.desc-grwm': 'Describe the product & what occasion you are getting ready for... or use AI Generate',
      'ph.review-theme': 'Write your own theme: minimalist & clean, tropical nature vibes, futuristic neon...',
      'ph.skincare-theme': 'Write your own theme: clean beauty, glowing skin, aesthetic pastel...',
      'ph.ads-theme': 'Write your own theme: urban modern, luxury dark, bright cheerful outdoor...',
      'ph.fashion-theme': 'Write your own theme: street style urban, aesthetic pastel, minimalist studio...',
      'ph.unboxing-theme': 'Write your own theme: warm wooden desk, clean studio, cozy vibes...',
      'ph.food-theme': 'Write your own theme: warm rustic wood, moody low-key, bright high-key studio...',
      'ph.tutorial-theme': 'Write your own theme: warm wooden desk, clean studio, cozy vibes...',
      'ph.daily-theme': 'Write your own vibe: cozy morning, working at a cafe, afternoon in the park...',
      'ph.testi-theme': 'Write your own setting: bare bedroom, evening porch, selfie-cam...',
      'ph.grwm-theme': 'Write your own vibe: vanity ringlight, GRWM for a wedding, clean girl...',
      'ph.custom-theme': 'Write your own theme...',
      'ph.model-name': 'Model name, e.g. Salsa',
      'btn.all-video-prompt': 'All Video Prompts',
      'mode.duration': 'Video Duration',
      'mode.count': 'Photo Count',
      'btn.pick-model-library': 'Choose from Model Library',
      'btn.retry': 'Retry',
      'title.regenerate': 'Regenerate',
      'title.editprompt': 'Edit Prompt',
      'title.video': 'Make Video Prompt',
      'title.download': 'Download',
      'loading.visual': 'Creating visuals...',
      'loading.continue': 'Continuing story...',
      'loading.caption': 'Creating caption...',
      'loading.clip-prompt': 'Creating clip prompt',
      'loading.video-prompt': 'Creating video prompt...',
      'msg.scene-failed': 'Scene failed to generate',
      'btn.copy': 'Copy',
      'btn.copy-all': 'Copy All',
      'btn.download-txt': 'Download .txt',
      'msg.copied': 'Copied!',
      'msg.use-download-txt': 'Use Download .txt',
      'msg.press-ctrl-c': 'Press Ctrl+C',
      'modal.edit-prompt-title': 'Edit Image Prompt',
      'modal.caption-title': 'Video Caption',
      'login.subtitle': 'Sign in with your purchase email',
      'login.email-ph': 'Purchase email...',
      'login.submit': 'Sign In',
      'login.checking': 'Checking access...',
      'login.no-access': "Don't have access yet?",
      'login.buy-lynk': 'Buy on Lynk.id',
      'login.buy-mayar': 'Buy on Mayar',
      'err.login.email-required': 'Enter your purchase email first.',
      'err.login.invalid-email': 'Invalid email format.',
      'err.login.failed': 'Login failed. Check your email or connection and try again.',
      'warn.model-required': 'This feature needs a Model Photo — upload one first.',
      'warn.viral-idea-required': 'Write your viral process idea first.',
      'warn.model-name-required': 'Give your model a name first.',
      'warn.library-full': 'Library full (max 5 models). Delete one first.',
      'warn.no-models': 'No saved models yet — create one in the AI Influencer menu.',
      'warn.google-limit': 'This Google account has reached its limit, please use another Google account.',
      'warn.file-unreadable': "File can't be read — make sure it's an image (JPG/PNG/HEIC).",
      'warn.session-ended': 'Session ended. This account is signed in on another device.',
      'menu.model-studio': 'Model Studio', 'menu.viral': 'Viral Short Video', 'nav.logout': 'Log Out',
      'menu.guide': '⭐ Start Here', 'nav.guide': 'App Guide', 'navd.guide': 'How to use every feature', 'hdr.guide.title': 'App Guide', 'hdr.guide.sub': 'Tap each section to expand its explanation.',
      'nav.influencer': 'AI Influencer', 'navd.influencer': 'Create & save AI models',
      'nav.talker': 'Talking Influencer', 'navd.talker': 'Niche talking-head content',
      'hdr.talker.title': 'AI Talking Influencer', 'hdr.talker.sub': 'The script flows across clips — join them in CapCut into one full monologue.',
      'talk.step-model': 'Model Photo (Required)', 'talk.step-niche': 'Pick a Niche', 'talk.step-topic': 'Topic (Optional)',
      'talk.islami-note': 'AI-written reminder script — avoid quoting verses/hadith; review it yourself before posting.',
      'talk.step-latar': 'Setting', 'talk.step-gaya': 'Speaking Style', 'talk.step-branding': 'Account Name on Backdrop (Optional)',
      'talk.step-duration': 'Platform & Duration', 'talk.script-lang': 'Script language',
      'talk.btn-script': 'Write Script', 'talk.btn-rescript': 'Rewrite Script', 'talk.btn-photos': 'Generate Photos',
      'talk.script-title': 'Script per Clip (editable)', 'talk.result': 'Clip Results', 'talk.btn-copy': 'Copy All',
      'talk.flow-copy': 'Copy Flow Prompt', 'talk.flow-hint': 'The 📋 button copies a ready-to-use prompt for Flow/Veo (the AI reads the storyboard image; the sheet itself will not appear in the video).',
      'ph.talk-topic': 'e.g. finding peace through hard times', 'ph.talk-branding': 'e.g. Ruang Bertumbuh Fatimah Zahra', 'ph.talk-suasana-custom': 'Describe your own mood, e.g. dark studio with red neon lights',
      'warn.talker-model-required': 'Pick a model photo first (upload or from the Model Library).',
      'talk.step-product': 'Product Photos (Optional, max 5)',
      'talk.product-hint': 'Clothes, shoes, bags, etc — the influencer will wear/use them in the photos (great for affiliate).',
      'btn.upload-product': 'Upload Product',
      'btn.pick-product-library': 'Product Library',
      'btn.save-product': 'Save to account',
      'badge.product-saved': 'Saved',
      'modal.product-name': 'Product name',
      'warn.product-limit': 'Maximum 5 products per video.',
      'warn.product-name-required': 'Enter a product name first.',
      'warn.product-library-full': 'Product library is full (max 5 products).',
      'warn.no-products': 'No saved products yet.',
      'confirm.delete-product': 'Delete product "%N" from your account?',
      'talk.step-brand': 'Sponsor Logo/Brand (Optional)',
      'talk.brand-hint': 'Shown as a set prop (screen/sign on the table or a backdrop banner) — not saved to your account.',
      'field.upload-click-brand': 'Click to pick a brand logo',
      'talk.step-suasana': 'Ambience',
      'talk.step-angle': 'Camera Angle',
      'warn.talker-script-first': 'Write the script first before generating photos.',
      'warn.talker-custom-empty': 'Fill in the custom text first.',
      'err.talker-script': 'Failed to write the script: ',
      'talk.caption-title': 'Caption & Hashtags', 'talk.btn-recaption': 'Regenerate Caption',
      'talk.caption-hint': 'Caption auto-generated from the script — edit the script then tap Regenerate Caption if it changes.',
      'cap.short': 'Short Caption', 'cap.long': 'Long Caption', 'cap.hashtag': 'Hashtags',
      'loading.talker-caption': 'AI is writing the caption...', 'err.talker-caption': 'Failed to write the caption: ',
      'loading.talker-script': 'AI is writing the script...', 'loading.talker-photos': 'Generating clip photos...',
      'navd.product-review': 'Affiliate product review photos', 'navd.skincare-review': 'Skincare review scenes',
      'navd.fashion': 'OOTD & fashion story', 'navd.unboxing': 'Product unboxing story',
      'navd.product-ads': 'Brand ad storyboard', 'navd.food-review': 'Celeb-style food review',
      'navd.tutorial': 'Product how-to story', 'navd.daily': 'Daily vlog + product',
      'navd.testi': 'Problem → solution story', 'navd.grwm': 'Get ready with me story',
      'nav.viralcustom': 'Custom Viral', 'navd.viralcustom': 'Craft your own process idea',
      'nav.fruitmold': 'Fruit Mold', 'navd.fruitmold': 'Fruit growing in cute molds',
      'nav.housebuild': 'House Building', 'navd.housebuild': 'Empty land → finished house',
      'nav.landclear': 'Land Clearing', 'navd.landclear': 'Dirty → clean, satisfying',
      'nav.carcrash': 'Car Crash', 'navd.carcrash': 'Car crash & stunt physics',
      'nav.dollcraft': 'DIY Doll', 'navd.dollcraft': 'Pipe-cleaner doll stop-motion',
      'nav.bottlecraft': 'DIY Plastic Bottle', 'navd.bottlecraft': 'Recycle bottles into decor',
      'nav.metalcraft': 'DIY Metal Craft', 'navd.metalcraft': 'Miniature from nuts & copper wire',
      'nav.strawcraft': 'DIY Straw', 'navd.strawcraft': 'Model built from plastic straws',
      'menu.kids': 'Kids Story',
      'nav.kidpedia': 'Kids Encyclopedia', 'navd.kidpedia': 'One-subject knowledge for kids',
      'nav.kidcycle': 'Life Cycle', 'navd.kidcycle': 'Egg to butterfly, seed to tree',
      'nav.tutorial-app': 'App Tutorial', 'navd.tutorial-app': 'How to use this app (video)',
      'tut.title': 'Choose a Tutorial Video', 'tut.basic': 'App Basics Tutorial', 'tut.new': 'Latest Tutorial',
      'dur.platform': 'Video platform', 'dur.story-duration': 'Story duration',
      'unit.photos': 'photos', 'unit.clips': 'clips', 'unit.sec-per-clip': 'sec/clip', 'unit.sec': 'sec',
      'modal.close': 'Close', 'modal.fail-prompt': 'Failed to create prompt', 'btn.save': 'Save', 'btn.cancel': 'Cancel',
      'progress.preparing': 'Preparing', 'progress.done': 'Done', 'unit.prompt': 'prompts', 'unit.keyframe': 'keyframes',
      'vp.title-prefix': 'Video Prompt — Scene', 'vp.section-label': 'Video Prompt', 'vp.per-scene': 'Per-Scene Prompts',
      'vp.all-clip-prompts': 'All Clip Prompts', 'vp.clip-title-prefix': 'Video Prompt — Clip', 'vp.one-clip-prompt': 'One prompt for ONE full clip',
      'edit.hint': 'Edit this scene image prompt, then click <strong>Save</strong>. Press the <strong>Regenerate</strong> button on the card to rebuild the image with the new prompt.',
      'vp.tips': '<strong>Tips:</strong> use the <strong>All Video Prompts</strong> button to grab all scenes at once. Copy each prompt into an image-to-video platform (Runway, Pika, Kling, Veo) with its scene image, join them in order → one complete story.',
      'clip.howto': '<strong>How to use:</strong> upload these %C clip photos IN ORDER to an image-to-video platform (%P) + paste this prompt → one %S-sec clip. Join all clips in order in CapCut/your editor → one complete story.',
      'err.continue-story': 'Failed to continue the story: ', 'err.delete-server': 'Failed to delete on the server — check your connection and try again.', 'err.read-photo': 'Failed to read the photo: ', 'ok.features-extracted': 'Character features extracted from the photo — edit if needed.', 'warn.storage-unavailable': 'Browser storage is unavailable (private/incognito mode?). The model was not saved — you can still right-click the photo to save it manually.', 'warn.storage-short': 'Browser storage is unavailable in this session.', 'ph.group-custom': 'Write your own %L...',
      'lib.empty': 'No models yet — create one above then Save.', 'ios.save-hint': 'Press and <b>hold</b> the photo below, then choose <b>"Save to Photos"</b> or <b>"Add to Photos"</b>.',
      'whatsnew.title': "What's New", 'whatsnew.empty': 'No changelog yet.',
      'btn.delete': 'Delete', 'confirm.delete-model': 'Delete model "%N"?',
    },
    ms: {
      'menu.review': 'Penjana Ulasan',
      'menu.food': 'Foto Makanan Profesional',
      'nav.product-review': 'Ulasan Produk',
      'nav.skincare-review': 'Ulasan Penjagaan Kulit',
      'nav.fashion': 'Ulasan Fesyen',
      'nav.unboxing': 'Babak Buka Kotak',
      'nav.product-ads': 'Kisah Iklan',
      'nav.food-review': 'Ulasan Makanan',
      'nav.tutorial': 'Tutorial Guna',
      'nav.daily': 'Day in My Life',
      'nav.testi': 'Testimoni',
      'nav.grwm': 'GRWM',
      'hdr.product-review.title': 'Penjana Ulasan Produk',
      'hdr.product-review.sub': 'Penyelesaian AI untuk kandungan ulasan produk afiliasi anda.',
      'hdr.skincare-review.title': 'Penjana Ulasan Penjagaan Kulit',
      'hdr.skincare-review.sub': 'Cipta babak ulasan penjagaan kulit profesional untuk kandungan anda.',
      'hdr.product-ads.title': 'Penjana Kisah Iklan',
      'hdr.product-ads.sub': 'Penyelesaian AI untuk kandungan promosi & papan cerita iklan jenama anda.',
      'hdr.fashion.title': 'Penjana Ulasan Fesyen / OOTD',
      'hdr.fashion.sub': 'Papan cerita ulasan baju & aksesori dengan model yang konsisten.',
      'hdr.unboxing.title': 'Penjana Babak Buka Kotak',
      'hdr.unboxing.sub': 'Papan cerita buka peket produk — cangkuk kuat untuk kandungan afiliasi.',
      'hdr.food-review.title': 'Penjana Ulasan Makanan Profesional',
      'hdr.food-review.sub': 'Cipta ulasan makanan seperti TikToker & Selebgram dengan AI.',
      'hdr.tutorial.title': 'Penjana Tutorial Cara Guna',
      'hdr.tutorial.sub': 'Kisah langkah demi langkah: masalah → cara guna → keputusan. Sesuai untuk kandungan pendidikan afiliasi.',
      'hdr.daily.title': 'Penjana Day in My Life',
      'hdr.daily.sub': 'Kisah vlog harian pagi → malam dengan produk tersisip semula jadi. Jualan lembut gaya TikTok.',
      'hdr.testi.title': 'Penjana Testimoni',
      'hdr.testi.sub': 'Kisah masalah → penyelesaian gaya UGC: aduan → jumpa produk → guna → keputusan. Format iklan penukaran.',
      'hdr.grwm.title': 'Penjana GRWM',
      'hdr.grwm.sub': 'Get Ready With Me: penampilan awal → langkah solek/penjagaan kulit/pakaian → penampilan akhir. Tren kuat TikTok.',
      'hdr.influencer.title': 'AI Influencer Studio',
      'hdr.influencer.sub': 'Reka model maya, simpan, kemudian guna dalam semua ciri ulasan.',
      'step.upload-product': 'Muat Naik Gambar Produk',
      'step.upload-skincare': 'Muat Naik Produk Penjagaan Kulit',
      'step.upload-fashion': 'Muat Naik Produk Fesyen',
      'step.upload-food': 'Muat Naik Foto Makanan',
      'step.desc-product': 'Penerangan Produk',
      'step.desc-skincare': 'Penerangan Penjagaan Kulit',
      'step.desc-fashion': 'Penerangan Fesyen',
      'step.desc-food': 'Penerangan Makanan',
      'step.photo-theme': 'Tema Foto',
      'step.theme-setting': 'Tema / Tetapan',
      'step.theme-ambience': 'Tema / Suasana',
      'step.aspect-ratio': 'Nisbah Aspek',
      'step.count': 'Bilangan Jana',
      'step.compose-model': 'Reka Model',
      'step.result': 'Keputusan',
      'step.model-library': 'Pustaka Model',
      'field.upload-click-drag': 'Klik atau seret gambar ke sini',
      'field.upload-hint-png': 'PNG, JPG, WEBP (boleh lebih daripada satu)',
      'field.upload-click-food': 'Klik untuk muat naik foto makanan',
      'field.upload-hint-heic': 'JPG, PNG, WEBP, HEIC (iPhone) — boleh lebih daripada satu',
      'btn.ai-generate': 'Jana AI',
      'field.upload-click-model': 'Klik untuk pilih foto model',
      'field.model-photo': 'Foto Model',
      'field.optional': '(Pilihan)',
      'field.required': '(Wajib)',
      'hint.model-food': 'Pengulas akan kelihatan merasa makanan di semua babak',
      'field.gender': 'Jantina',
      'field.age': 'Umur',
      'field.look': 'Negara',
      'field.hijab': 'Hijab',
      'field.influencer.or': 'atau',
      'btn.download-all': 'Muat Turun Semua',
      'opt.natural-photo': 'Foto Natural (kurang plastik)', 'opt.natural-photo-hint': 'Kurangkan kesan AI/CGI — kulit & pencahayaan lebih realistik.',
      'btn.sheet': 'Ekspor Storyboard',
      'loading.sheet': 'Membuat prompt...',
      'warn.no-scene-sheet': 'Belum ada foto scene untuk digabung.',
      'err.sheet': 'Gagal menggabung foto: ',
      'btn.generate.product-review': 'Cipta Babak Ulasan',
      'btn.generate.skincare-review': 'Cipta Babak Penjagaan Kulit',
      'btn.generate.product-ads': 'Cipta Kisah Iklan',
      'btn.generate.fashion': 'Cipta Kisah Fesyen',
      'btn.generate.unboxing': 'Cipta Babak Buka Kotak',
      'btn.generate.food-review': 'Cipta Ulasan Makanan',
      'btn.generate.tutorial': 'Cipta Kisah Tutorial',
      'btn.generate.daily': 'Cipta Kisah Harian',
      'btn.generate.testi': 'Cipta Kisah Testimoni',
      'btn.generate.grwm': 'Cipta Kisah GRWM',
      'btn.generate.model': 'Cipta Model AI',
      'btn.upload-own-photo': 'Muat Naik Foto Sendiri',
      'btn.influencer.regen': 'Jana Semula',
      'btn.influencer.save': 'Simpan',
      'result.heading': 'Keputusan Ulasan',
      'result.heading.ads': 'Keputusan Kisah Iklan',
      'result.heading.fashion': 'Keputusan Kisah Fesyen',
      'result.heading.unboxing': 'Keputusan Kisah Buka Kotak',
      'result.heading.food': 'Keputusan Ulasan Makanan',
      'result.heading.tutorial': 'Keputusan Kisah Tutorial',
      'result.heading.daily': 'Keputusan Day in My Life',
      'result.heading.testi': 'Keputusan Kisah Testimoni',
      'result.heading.grwm': 'Keputusan Kisah GRWM',
      'hint.theme-generic': 'Pilih konsep tempat & mood untuk semua babak. "Tiada" = biar AI yang tentukan.',
      'hint.theme-fashion': 'Pilih konsep tempat & gaya untuk semua babak OOTD. "Tiada" = biar AI yang tentukan.',
      'hint.theme-ads': 'Pilih konsep tempat & mood untuk semua babak iklan. "Tiada" = biar AI yang tentukan.',
      'hint.theme-unboxing': 'Pilih konsep tempat & mood untuk semua babak buka kotak. "Tiada" = biar AI yang tentukan.',
      'hint.theme-food': 'Pilih konsep tempat & mood untuk semua babak makanan. "Tiada" = biar AI yang tentukan.',
      'hint.theme-tutorial': 'Pilih konsep tempat & mood untuk semua langkah tutorial. "Tiada" = biar AI yang tentukan.',
      'hint.theme-daily': 'Pilih vibe keseharian untuk semua babak. "Tiada" = biar AI yang tentukan.',
      'hint.theme-testi': 'Pilih suasana semula jadi untuk testimoni yang jujur & relatable. "Tiada" = biar AI yang tentukan.',
      'hint.theme-grwm': 'Pilih vibe & majlis GRWM untuk semua babak. "Tiada" = biar AI yang tentukan.',
      'tip.desc-quality': 'Petua: penerangan terperinci menghasilkan ulasan yang lebih berkualiti.',
      'hint.model-tutorial': 'Model akan memperagakan setiap langkah di semua babak',
      'hint.model-daily': 'Model menjadi watak utama sepanjang hari',
      'hint.model-testi': 'Model menjadi orang yang memberi testimoni di semua babak',
      'hint.model-grwm': 'Model yang sama dari awal hingga siap keluar',
      'hint.model-required-daily': 'Day in My Life bercerita tentang orangnya — foto model wajib supaya wajah konsisten di semua babak.',
      'hint.model-required-grwm': 'GRWM bercerita tentang proses bersedia — foto model wajib supaya wajah konsisten dari polos hingga penampilan akhir.',
      'hint.product-tutorial': 'Sesuai untuk: hampir semua produk yang ada cara penggunaan — penjagaan kulit, alat, peralatan dapur, peralatan rumah, produk penjagaan.',
      'hint.product-daily': 'Sesuai untuk: produk yang digunakan sehari-hari — tumbler, beg, alat, penjagaan kulit, pakaian kasual, snek/minuman.',
      'hint.product-testi': 'Sesuai untuk: produk penyelesaian masalah dengan kesan sebelum-selepas — ubat jerawat, pembersih, suplemen, alat bantu.',
      'hint.product-grwm': 'Sesuai untuk: produk solek — makeup, penjagaan kulit, hijab, wangian, aksesori. Kisah sentiasa bermula dari polos → penampilan akhir; untuk baju/pakaian lebih sesuai gunakan tab <strong>Ulasan Fesyen</strong>.',
      'hint.influencer-empty': 'Tiada foto lagi — reka dan klik "Cipta Model AI".',
      'ph.desc-product': 'Huraikan produk anda... atau gunakan Jana AI',
      'ph.desc-skincare': 'Huraikan penjagaan kulit anda (bahan, manfaat, tekstur)... atau gunakan Jana AI',
      'ph.desc-ads': 'Huraikan produk & mesej iklan anda... atau gunakan Jana AI',
      'ph.desc-fashion': 'Huraikan item fesyen (jenis, bahan, gaya, saiz)... atau gunakan Jana AI',
      'ph.desc-unboxing': 'Huraikan produk & kandungan peket... atau gunakan Jana AI',
      'ph.desc-food': 'Huraikan makanan ini (nama, rasa, tekstur, bahan, harga)... atau gunakan Jana AI',
      'ph.desc-tutorial': 'Huraikan produk & cara menggunakannya... atau gunakan Jana AI',
      'ph.desc-daily': 'Huraikan produk & bila digunakan dalam sehari... atau gunakan Jana AI',
      'ph.desc-testi': 'Huraikan produk & masalah yang diselesaikannya... atau gunakan Jana AI',
      'ph.desc-grwm': 'Huraikan produk & untuk majlis apa anda bersiap... atau gunakan Jana AI',
      'ph.review-theme': 'Tulis tema sendiri: minimalis & bersih, nuansa alam tropika, futuristik neon...',
      'ph.skincare-theme': 'Tulis tema sendiri: clean beauty, kulit bercahaya, aesthetic pastel...',
      'ph.ads-theme': 'Tulis tema sendiri: urban moden, luxury dark, cerah ceria luar...',
      'ph.fashion-theme': 'Tulis tema sendiri: street style urban, aesthetic pastel, studio minimalis...',
      'ph.unboxing-theme': 'Tulis tema sendiri: meja kayu hangat, studio bersih, nuansa cozy...',
      'ph.food-theme': 'Tulis tema sendiri: kayu rustik hangat, moody low-key, terang high-key studio...',
      'ph.tutorial-theme': 'Tulis tema sendiri: meja kayu hangat, studio bersih, nuansa cozy...',
      'ph.daily-theme': 'Tulis vibe sendiri: pagi cozy, kerja di kafe, petang di taman...',
      'ph.testi-theme': 'Tulis suasana sendiri: bilik apa adanya, teras petang, selfie-cam...',
      'ph.grwm-theme': 'Tulis vibe sendiri: vanity ringlight, GRWM kenduri, clean girl...',
      'ph.custom-theme': 'Tulis tema sendiri...',
      'ph.model-name': 'Nama model, cth. Salsa',
      'btn.all-video-prompt': 'Semua Prompt Video',
      'mode.duration': 'Durasi Video',
      'mode.count': 'Bilangan Foto',
      'btn.pick-model-library': 'Pilih dari Pustaka Model',
      'btn.retry': 'Cuba Lagi',
      'title.regenerate': 'Jana Semula',
      'title.editprompt': 'Edit Prompt',
      'title.video': 'Jana Prompt Video',
      'title.download': 'Muat Turun',
      'loading.visual': 'Menjana visual...',
      'loading.continue': 'Menyambung cerita...',
      'loading.caption': 'Menjana kapsyen...',
      'loading.clip-prompt': 'Menjana Prompt Klip',
      'loading.video-prompt': 'Menjana Prompt Video...',
      'msg.scene-failed': 'Babak gagal dijana',
      'btn.copy': 'Salin',
      'btn.copy-all': 'Salin Semua',
      'btn.download-txt': 'Muat Turun .txt',
      'msg.copied': 'Disalin!',
      'msg.use-download-txt': 'Guna Muat Turun .txt',
      'msg.press-ctrl-c': 'Tekan Ctrl+C',
      'modal.edit-prompt-title': 'Edit Prompt Gambar',
      'modal.caption-title': 'Kapsyen Video',
      'login.subtitle': 'Log masuk dengan e-mel pembelian anda',
      'login.email-ph': 'E-mel pembelian...',
      'login.submit': 'Log Masuk',
      'login.checking': 'Menyemak akses...',
      'login.no-access': 'Belum ada akses?',
      'login.buy-lynk': 'Beli di Lynk.id',
      'login.buy-mayar': 'Beli di Mayar',
      'err.login.email-required': 'Masukkan e-mel pembelian anda dahulu.',
      'err.login.invalid-email': 'Format e-mel tidak sah.',
      'err.login.failed': 'Log masuk gagal. Semak e-mel atau sambungan dan cuba lagi.',
      'warn.model-required': 'Ciri ini perlukan Foto Model — muat naik foto model dahulu.',
      'warn.viral-idea-required': 'Tulis idea proses viral anda dahulu.',
      'warn.model-name-required': 'Beri nama model anda dahulu.',
      'warn.library-full': 'Pustaka penuh (maksimum 5 model). Padam salah satu dahulu.',
      'warn.no-models': 'Belum ada model disimpan — cipta dahulu di menu AI Influencer.',
      'warn.google-limit': 'Akaun Google ini telah mencapai had, sila guna akaun Google lain.',
      'warn.file-unreadable': 'Fail tidak dapat dibaca — pastikan ia fail imej (JPG/PNG/HEIC).',
      'warn.session-ended': 'Sesi tamat. Akaun ini log masuk di peranti lain.',
      'menu.model-studio': 'Studio Model', 'menu.viral': 'Video Pendek Viral', 'nav.logout': 'Log Keluar',
      'menu.guide': '⭐ Mula Di Sini', 'nav.guide': 'Panduan Aplikasi', 'navd.guide': 'Cara guna semua ciri', 'hdr.guide.title': 'Panduan Aplikasi', 'hdr.guide.sub': 'Ketik setiap bahagian untuk buka penjelasannya.',
      'nav.influencer': 'AI Influencer', 'navd.influencer': 'Cipta & simpan model AI',
      'nav.talker': 'Influencer Bercakap', 'navd.talker': 'Kandungan bercakap ikut niche',
      'hdr.talker.title': 'AI Influencer Bercakap', 'hdr.talker.sub': 'Skrip bersambung antara klip — gabungkan di CapCut jadi satu monolog penuh.',
      'talk.step-model': 'Foto Model (Wajib)', 'talk.step-niche': 'Pilih Niche', 'talk.step-topic': 'Topik (Pilihan)',
      'talk.islami-note': 'Skrip tazkirah ditulis AI — elak memetik ayat/hadis; semak sendiri sebelum menyiarkan.',
      'talk.step-latar': 'Latar', 'talk.step-gaya': 'Gaya Percakapan', 'talk.step-branding': 'Nama Akaun di Latar (Pilihan)',
      'talk.step-duration': 'Platform & Tempoh', 'talk.script-lang': 'Bahasa skrip',
      'talk.btn-script': 'Buat Skrip', 'talk.btn-rescript': 'Buat Semula Skrip', 'talk.btn-photos': 'Jana Foto',
      'talk.script-title': 'Skrip per Klip (boleh diedit)', 'talk.result': 'Hasil Klip', 'talk.btn-copy': 'Salin Semua',
      'talk.flow-copy': 'Salin Prompt Flow', 'talk.flow-hint': 'Butang 📋 = salin prompt sedia-guna untuk Flow/Veo (imej storyboard dibaca AI, helaiannya tidak masuk ke video).',
      'ph.talk-topic': 'Contoh: ikhlas menghadapi ujian hidup', 'ph.talk-branding': 'Contoh: Ruang Bertumbuh Fatimah Zahra', 'ph.talk-suasana-custom': 'Tulis suasana sendiri, cth: studio gelap dengan lampu neon merah',
      'warn.talker-model-required': 'Pilih foto model dahulu (muat naik atau dari Pustaka Model).',
      'talk.step-product': 'Foto Produk (Pilihan, maks 5)',
      'talk.product-hint': 'Baju, kasut, beg, dll — influencer akan memakainya dalam foto (sesuai untuk affiliate).',
      'btn.upload-product': 'Muat Naik Produk',
      'btn.pick-product-library': 'Pustaka Produk',
      'btn.save-product': 'Simpan ke akaun',
      'badge.product-saved': 'Tersimpan',
      'modal.product-name': 'Nama produk',
      'warn.product-limit': 'Maksimum 5 produk setiap video.',
      'warn.product-name-required': 'Isi nama produk dahulu.',
      'warn.product-library-full': 'Pustaka produk penuh (maksimum 5 produk).',
      'warn.no-products': 'Belum ada produk tersimpan.',
      'confirm.delete-product': 'Padam produk "%N" dari akaun?',
      'talk.step-brand': 'Logo/Jenama Penaja (Pilihan)',
      'talk.brand-hint': 'Dipapar sebagai prop set (skrin/papan di meja atau sepanduk latar) — tidak disimpan ke akaun.',
      'field.upload-click-brand': 'Klik untuk pilih logo jenama',
      'talk.step-suasana': 'Suasana',
      'talk.step-angle': 'Sudut Kamera',
      'warn.talker-script-first': 'Buat skrip dahulu sebelum jana foto.',
      'warn.talker-custom-empty': 'Isi dahulu teks custom.',
      'err.talker-script': 'Gagal membuat skrip: ',
      'talk.caption-title': 'Kapsyen & Hashtag', 'talk.btn-recaption': 'Jana Semula Kapsyen',
      'talk.caption-hint': 'Kapsyen auto daripada skrip — sunting skrip kemudian tekan Jana Semula Kapsyen jika berubah.',
      'cap.short': 'Kapsyen Pendek', 'cap.long': 'Kapsyen Panjang', 'cap.hashtag': 'Hashtag',
      'loading.talker-caption': 'AI sedang menulis kapsyen...', 'err.talker-caption': 'Gagal membuat kapsyen: ',
      'loading.talker-script': 'AI sedang menulis skrip...', 'loading.talker-photos': 'Menjana foto klip...',
      'navd.product-review': 'Foto ulasan produk afiliat', 'navd.skincare-review': 'Babak ulasan penjagaan kulit',
      'navd.fashion': 'Kisah OOTD & fesyen', 'navd.unboxing': 'Kisah buka bungkusan produk',
      'navd.product-ads': 'Papan cerita iklan jenama', 'navd.food-review': 'Ulasan makanan gaya selebriti',
      'navd.tutorial': 'Kisah cara guna produk', 'navd.daily': 'Vlog harian + produk',
      'navd.testi': 'Kisah masalah → penyelesaian', 'navd.grwm': 'Kisah get ready with me',
      'nav.viralcustom': 'Viral Tersuai', 'navd.viralcustom': 'Cipta idea proses sendiri',
      'nav.fruitmold': 'Acuan Buah', 'navd.fruitmold': 'Buah membesar dalam acuan comel',
      'nav.housebuild': 'Pembinaan Rumah', 'navd.housebuild': 'Tanah kosong → rumah siap',
      'nav.landclear': 'Pembersihan Tanah', 'navd.landclear': 'Kotor → bersih, memuaskan',
      'nav.carcrash': 'Car Crash', 'navd.carcrash': 'Perlanggaran & aksi fizik kereta',
      'nav.dollcraft': 'DIY Patung', 'navd.dollcraft': 'Stop-motion patung pipe cleaner',
      'nav.bottlecraft': 'DIY Botol Plastik', 'navd.bottlecraft': 'Kitar semula botol jadi hiasan',
      'nav.metalcraft': 'DIY Metal Craft', 'navd.metalcraft': 'Miniatur dari nat & dawai tembaga',
      'nav.strawcraft': 'DIY Straw', 'navd.strawcraft': 'Model binaan dari straw plastik',
      'menu.kids': 'Cerita Kanak-kanak',
      'nav.kidpedia': 'Ensiklopedia Kanak-kanak', 'navd.kidpedia': 'Pengetahuan 1 subjek untuk kanak-kanak',
      'nav.kidcycle': 'Kitaran Hidup', 'navd.kidcycle': 'Telur jadi rama-rama, biji jadi pokok',
      'nav.tutorial-app': 'Tutorial Aplikasi', 'navd.tutorial-app': 'Video cara guna app ini',
      'tut.title': 'Pilih Video Tutorial', 'tut.basic': 'Tutorial Asas Aplikasi', 'tut.new': 'Tutorial Terkini',
      'dur.platform': 'Platform video', 'dur.story-duration': 'Durasi story',
      'unit.photos': 'foto', 'unit.clips': 'klip', 'unit.sec-per-clip': 'saat/klip', 'unit.sec': 'saat',
      'modal.close': 'Tutup', 'modal.fail-prompt': 'Gagal cipta prompt', 'btn.save': 'Simpan', 'btn.cancel': 'Batal',
      'progress.preparing': 'Menyediakan', 'progress.done': 'Selesai', 'unit.prompt': 'prompt', 'unit.keyframe': 'keyframe',
      'vp.title-prefix': 'Prompt Video — Babak', 'vp.section-label': 'Prompt Video', 'vp.per-scene': 'Prompt Setiap Babak',
      'vp.all-clip-prompts': 'Semua Prompt Klip', 'vp.clip-title-prefix': 'Prompt Video — Klip', 'vp.one-clip-prompt': 'Satu prompt untuk SATU klip penuh',
      'edit.hint': 'Edit prompt gambar babak ini, kemudian klik <strong>Simpan</strong>. Tekan butang <strong>Regenerate</strong> pada kad untuk jana semula gambar dengan prompt baharu.',
      'vp.tips': '<strong>Petua:</strong> guna butang <strong>Semua Prompt Video</strong> untuk ambil semua babak sekaligus. Salin setiap prompt ke platform image-to-video (Runway, Pika, Kling, Veo) dengan imej babaknya, gabung ikut turutan → satu cerita penuh.',
      'clip.howto': '<strong>Cara guna:</strong> muat naik %C foto klip ini MENGIKUT TURUTAN ke platform image-to-video (%P) + tampal prompt ini → 1 klip %S saat. Gabungkan semua klip ikut turutan di CapCut/editor → satu cerita penuh.',
      'err.continue-story': 'Gagal menyambung cerita: ', 'err.delete-server': 'Gagal padam di pelayan — semak sambungan dan cuba lagi.', 'err.read-photo': 'Gagal membaca foto: ', 'ok.features-extracted': 'Ciri watak berjaya diambil dari foto — sunting jika perlu.', 'warn.storage-unavailable': 'Storan pelayar tidak tersedia (mod peribadi/incognito?). Model tidak disimpan — anda masih boleh klik kanan foto untuk simpan secara manual.', 'warn.storage-short': 'Storan pelayar tidak tersedia dalam sesi ini.', 'ph.group-custom': 'Tulis %L versi anda...',
      'lib.empty': 'Belum ada model — cipta di atas kemudian Simpan.', 'ios.save-hint': 'Tekan dan <b>tahan</b> foto di bawah, kemudian pilih <b>"Simpan ke Foto"</b> atau <b>"Tambah ke Foto"</b>.',
      'whatsnew.title': 'Apa yang Baru', 'whatsnew.empty': 'Belum ada catatan perubahan.',
      'btn.delete': 'Padam', 'confirm.delete-model': 'Padam model "%N"?',
    },
  };
  function detectLang() {
    const list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    for (const raw of list) {
      const p = String(raw).toLowerCase().split('-')[0];
      if (p === 'ms') return 'ms';
      if (p === 'id' || p === 'in') return 'id';
      if (p === 'en') return 'en';
    }
    return 'en';
  }
  function getLang() {
    const saved = localStorage.getItem('app_language');
    if (saved && ['id', 'en', 'ms'].includes(saved)) return saved;
    return detectLang();
  }
  function tr(lang, key) {
    const v = T[lang] && T[lang][key];
    if (v != null) return v;
    const f = T.id && T.id[key];
    return f != null ? f : null;
  }
  function t(key) { return tr(getLang(), key) || key; }
  window.__t = t;
  window.__dynT = (txt) => dynTr(getLang(), txt);

  function applyLanguage() {
    const lang = getLang();
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = tr(lang, el.getAttribute('data-i18n')); if (v != null) el.textContent = v; });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { const v = tr(lang, el.getAttribute('data-i18n-html')); if (v != null) el.innerHTML = v; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const v = tr(lang, el.getAttribute('data-i18n-placeholder')); if (v != null) el.setAttribute('placeholder', v); });
    applyChipLabels(lang);
    applyDynLabels(lang);
    const sw = document.getElementById('lang-switcher');
    if (sw && sw.value !== lang) sw.value = lang;
  }

  // Teks dinamis bikinan JS (chrome viral: title/subtitle/label grup/section): terjemah via DYN_LABELS keyed teks ID sumber
  function dynTr(lang, idText) {
    const map = window.DYN_LABELS && window.DYN_LABELS[lang];
    return (map && map[idText]) || idText;
  }
  function applyDynLabels(lang) {
    document.querySelectorAll('[data-i18n-dyn]').forEach(el => {
      if (!el.dataset.i18nId) el.dataset.i18nId = el.textContent.trim();
      el.textContent = dynTr(lang, el.dataset.i18nId);
    });
    document.querySelectorAll('[data-i18n-dyn-ph]').forEach(el => {
      if (!el.dataset.i18nIdPh) el.dataset.i18nIdPh = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', dynTr(lang, el.dataset.i18nIdPh));
    });
  }

  function applyChipLabels(lang) {
    document.querySelectorAll('.theme-chip').forEach(chip => {
      if (!chip.dataset.i18nId) {
        const txt = getLastText(chip);
        if (!txt) return;
        chip.dataset.i18nId = txt.textContent.trim();
      }
      const idLabel = chip.dataset.i18nId;
      const map = window.CHIP_LABELS && window.CHIP_LABELS[lang];
      const label = (map && map[idLabel]) || idLabel;
      const node = getLastText(chip);
      if (node) node.textContent = label;
    });
  }
  function getLastText(el) {
    for (let i = el.childNodes.length - 1; i >= 0; i--) {
      const n = el.childNodes[i];
      if (n.nodeType === 3 && n.textContent.trim()) return n;
    }
    return null;
  }
  window.__applyLanguage = applyLanguage;
  window.__setLang = function (lang) {
    if (!['id', 'en', 'ms'].includes(lang)) return;
    localStorage.setItem('app_language', lang);
    applyLanguage();
    document.dispatchEvent(new CustomEvent('ssp-lang-changed'));
  };
  (function initLangSwitcher() {
    const sw = document.getElementById('lang-switcher');
    if (sw) { sw.value = getLang(); sw.addEventListener('change', () => window.__setLang(sw.value)); }
    applyLanguage();
  })();

  // === end i18n engine ===

  // === VERSION & WHAT'S NEW ===
  window.APP_VERSION = '2.1';
  window.CHANGELOG = [
    { version: '2.1', date: '13 Sep 2026', changes: [
      { id: 'Antarmuka 3 bahasa (English/Melayu/Indonesia) + deteksi otomatis & pemilih bahasa di sidebar',
        en: 'Trilingual interface (English/Malay/Indonesian) + auto-detect & language switcher in the sidebar',
        ms: 'Antara muka tiga bahasa (Inggeris/Melayu/Indonesia) + auto-kesan & penukar bahasa di sidebar' },
    ] },
    { version: '2.0', date: '12 Sep 2026', changes: [
      { id: 'Simpan foto hasil generate langsung ke Galeri di iPhone/iPad (iOS)',
        en: 'Save generated photos straight to the Gallery on iPhone/iPad (iOS)',
        ms: 'Simpan foto hasil terus ke Galeri pada iPhone/iPad (iOS)' },
    ] },
  ];
  function showWhatsNew() {
    const lang = getLang();
    const body = (window.CHANGELOG || []).map(rel => {
      const lines = (rel.changes || []).map(c => `<li class="flex gap-2 text-sm text-gray-600 mb-1.5"><i class="fas fa-check text-violet-500 mt-1" style="font-size:.7rem;"></i><span>${window.escHtml(c[lang] || c.id)}</span></li>`).join('');
      return `<div class="mb-4"><div class="flex items-center gap-2 mb-2"><span class="text-sm font-bold text-white px-2 py-0.5 rounded-full" style="background:linear-gradient(135deg,#6d28d9,#4f46e5);">v${window.escHtml(rel.version)}</span><span class="text-xs text-gray-400">${window.escHtml(rel.date)}</span></div><ul>${lines}</ul></div>`;
    }).join('') || `<p class="text-sm text-gray-500">${t('whatsnew.empty')}</p>`;
    const modal = document.createElement('div');
    modal.className = 'image-preview-modal';
    const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
    modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-gift text-violet-500 mr-2"></i>${t('whatsnew.title')}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
      ${body}
      <button data-close class="w-full btn-secondary py-2 rounded-lg font-semibold mt-2">${t('modal.close')}</button>
    </div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
  }
  window.__showWhatsNew = showWhatsNew;
  (function initVersionBadge() {
    const badge = document.getElementById('version-badge');
    const label = document.getElementById('version-badge-label');
    const dot = document.getElementById('version-badge-dot');
    if (!badge || !label) return;
    label.textContent = 'v' + window.APP_VERSION;
    if (dot) dot.classList.toggle('hidden', localStorage.getItem('ssp_seen_version') === window.APP_VERSION);
    badge.addEventListener('click', () => {
      showWhatsNew();
      localStorage.setItem('ssp_seen_version', window.APP_VERSION);
      if (dot) dot.classList.add('hidden');
    });
  })();

  // === CHIP LABELS (i18n label chip; nilai data-theme/data-val TETAP) ===
  // Hanya label yang BERBEDA dari teks ID yang perlu entri; sisanya fallback ke ID.
  // EN dibuat komprehensif; MS hanya yang beda dari Indonesia (ID≈MS).
  window.CHIP_LABELS = {
    en: {
      'Tidak Ada': 'None', 'Custom': 'Custom', 'Kejutkan aku': 'Surprise me',
      'Kata Bijak / Motivasi': 'Wisdom / Motivation', 'Islami': 'Islamic', 'Kerja Harian / Karier': 'Daily Work / Career',
      'Keuangan': 'Finance', 'Cinta / Hubungan': 'Love / Relationships', 'Kesehatan Mental': 'Mental Health',
      'Studio Podcast': 'Podcast Studio', 'Ruang Tamu Cozy': 'Cozy Living Room', 'Kafe': 'Coffee Shop',
      'Dalam Mobil': 'In the Car', 'Taman': 'Park',
      'Tenang / Reflektif': 'Calm / Reflective', 'Semangat / Motivator': 'Energetic / Motivator', 'Ceramah Lembut': 'Gentle Preaching',
      'Wanita': 'Woman', 'Pria': 'Man', 'Remaja': 'Teen', 'Non-hijab': 'Non-hijab',
      'Minimalis': 'Minimalist', 'Minimalis 1 lantai': 'Minimalist 1 Floor', '2 lantai': '2 Floors',
      'Modern minimalis': 'Modern Minimalist', 'Klasik mewah': 'Classic Luxury', 'Rustic Kayu': 'Rustic Wood',
      'Cerah Outdoor': 'Bright Outdoor', 'Sinematik': 'Cinematic', 'Sinematik makro': 'Macro Cinematic',
      'Slow-motion sinematik': 'Cinematic Slow-motion', 'Stop-motion cepat': 'Fast Stop-motion',
      'Time-lapse cepat': 'Fast Time-lapse', 'Time-lapse chaos': 'Chaos Time-lapse',
      'Tutorial cepat (fast-paced)': 'Fast Tutorial', 'Satisfying santai': 'Relaxed Satisfying',
      'Bertahap detail': 'Gradual Detail', 'Multi-angle replay': 'Multi-angle Replay',
      'Cermin Rias': 'Vanity Mirror', 'Meja Rias': 'Vanity Table', 'Close-up Wajah': 'Face Close-up',
      'POV tangan': 'Hand POV', 'POV Tangan': 'Hand POV', 'POV tangan close-up': 'Hand Close-up POV',
      'POV pekerja': 'Worker POV', 'Hands Reveal': 'Hands Reveal',
      'Dalam Mobil': 'Inside Car', 'Dalam ruangan': 'Indoor', 'Di Kantor': 'At the Office',
      'Kantor Modern': 'Modern Office', 'Meja Kerja': 'Work Desk', 'Meja Makan': 'Dining Table',
      'Meja Kayu': 'Wooden Table', 'Meja kayu cozy': 'Cozy Wooden Table', 'Meja kayu craft': 'Craft Wooden Table',
      'Meja kayu rustic + tanaman': 'Rustic Wooden Table + Plants', 'Meja craft penuh alat': 'Craft Table Full of Tools',
      'Meja kamar aesthetic': 'Aesthetic Room Desk', 'Meja kamar aesthetic + fairy lights': 'Aesthetic Desk + Fairy Lights',
      'Meja putih minimalis': 'Minimalist White Table', 'Meja putih studio': 'Studio White Table',
      'Kamar Tidur': 'Bedroom', 'Kamar Mandi': 'Bathroom', 'Kamar Aesthetic': 'Aesthetic Room',
      'Kamar Estetik': 'Aesthetic Room', 'Kamar Natural': 'Natural Room', 'Ruang Tamu': 'Living Room',
      'Dapur': 'Kitchen', 'Dapur Rumah': 'Home Kitchen', 'Teras Rumah': 'House Porch',
      'Halaman rumah': 'House Yard', 'Halaman bersih': 'Clean Yard', 'Halaman kotor': 'Messy Yard',
      'Rumah kaca': 'Greenhouse', 'Rumah mewah modern': 'Modern Luxury House', 'Rumah mini': 'Mini House',
      'Ruko': 'Shophouse', 'Kafe Santai': 'Chill Café', 'Malam Santai': 'Relaxed Night', 'Me Time Malam': 'Night Me Time',
      'Pagi Fresh': 'Fresh Morning', 'Kost Vibe': 'Dorm Vibe', 'Gym Ringan': 'Light Gym',
      'Pantai': 'Beach', 'Tepi pantai': 'Seaside', 'Pegunungan': 'Mountains', 'Tebing gunung': 'Mountain Cliff',
      'Gurun': 'Desert', 'Sungai': 'River', 'Taman': 'Park', 'Taman Kota': 'City Park', 'Taman rapi': 'Tidy Garden',
      'Pedesaan': 'Countryside', 'Perkotaan': 'Urban', 'Alam terbuka': 'Open Nature', 'Tengah hutan': 'Deep Forest',
      'Jalan kota': 'City Street', 'Jalan tol': 'Highway', 'Apartemen City': 'City Apartment',
      'Pabrik': 'Factory', 'Pasar': 'Market', 'Pasar tradisional': 'Traditional Market', 'Kebun sayur': 'Vegetable Garden',
      'Kebun terbengkalai': 'Abandoned Garden', 'Kebun/pohon': 'Garden/Trees', 'Rumput hijau': 'Green Grass',
      'Lahan sampah': 'Trash Land', 'Lahan siap tanam': 'Ready-to-plant Land', 'Semak belukar': 'Bushes',
      'Selokan/kolam': 'Ditch/Pond', 'Arena beton': 'Concrete Arena', 'Tangga raksasa': 'Giant Stairs',
      'Jembatan runtuh': 'Collapsing Bridge', 'Obstacle rintangan gila': 'Crazy Obstacle Course',
      'Downhill / terjun ramp': 'Downhill / Ramp Jump', 'Balapan chaos': 'Chaotic Race', 'Crash tabrakan': 'Crash Collision',
      'vs Objek raksasa': 'vs Giant Object', 'Lampu hias': 'Decorative Lights',
      'Mobil balap': 'Race Car', 'Mobil balap kartun': 'Cartoon Race Car', 'Mobil klasik': 'Classic Car',
      'Mobil sport': 'Sports Car', 'Motor': 'Motorcycle', 'Motor mini': 'Mini Motorcycle', 'Motoran': 'Riding Motorcycle',
      'Truk': 'Truck', 'Pesawat': 'Airplane', 'Kapal': 'Ship', 'Helikopter': 'Helicopter', 'Bus sekolah': 'School Bus',
      'Mesin potong rumput': 'Lawn Mower', 'Alat berat (excavator)': 'Heavy Equipment (Excavator)',
      'Manual (parang/cangkul)': 'Manual (machete/hoe)', 'Robot kecil': 'Small Robot', 'Kincir angin': 'Windmill',
      'Kubus': 'Cube', 'Bintang': 'Star', 'Hati': 'Heart',
      'Kura-kura': 'Turtle', 'Laba-laba': 'Spider', 'Kalajengking': 'Scorpion', 'Burung hantu': 'Owl',
      'Capung': 'Dragonfly', 'Semut': 'Ant', 'Beruang': 'Bear', 'Kelinci': 'Rabbit', 'Keledai': 'Donkey',
      'Ikan': 'Fish', 'Hewan lucu': 'Cute Animal', 'Kepik / serangga lucu': 'Ladybug / Cute Bug',
      'Celengan babi': 'Piggy Bank', 'Wajah lucu': 'Cute Face', 'Chibi lucu': 'Cute Chibi',
      'Cewek anime': 'Anime Girl', 'Cowok anime': 'Anime Boy', 'Kimono / tradisional': 'Kimono / Traditional',
      'Apel': 'Apple', 'Jeruk': 'Orange', 'Anggur': 'Grapes', 'Semangka': 'Watermelon', 'Melon': 'Melon',
      'Pir': 'Pear', 'Labu': 'Pumpkin', 'Stroberi besar': 'Big Strawberry', 'Bunga & pot': 'Flowers & Pot',
      'Jepang': 'Japan', 'Barat': 'Western', 'Asia Timur': 'East Asia', 'Skandinavia': 'Scandinavian',
      'Acak': 'Random', 'Filipina': 'Philippines', 'Arab / Timur Tengah': 'Middle East / Arab',
      'Afrika': 'Africa', 'Barat (Eropa/Amerika)': 'Western (EU/US)',
      'Seragam sekolah': 'School Uniform', 'Hoodie kasual': 'Casual Hoodie', 'Crop top & rok': 'Crop Top & Skirt',
      'Kondangan': 'Wedding Party', 'Kombinasi': 'Combination', 'Bebas warna-warni': 'Free Colorful',
      'Warna-warni campur': 'Mixed Colorful', 'Merah': 'Red', 'Biru & putih': 'Blue & White', 'Biru semua': 'All Blue',
      'Hijau & biru': 'Green & Blue', 'Hijau semua': 'All Green', 'Hitam & kuning': 'Black & Yellow',
      'Abu-abu gelap matte': 'Matte Dark Grey', 'Baja silver mengkilap': 'Shiny Silver Steel',
      'Dominan kawat tembaga': 'Mostly Copper Wire', 'Mur hitam matte': 'Matte Black Nuts',
      'Mur rustic berkarat': 'Rusty Rustic Nuts', 'Kuningan emas': 'Golden Brass', 'Bening transparan': 'Clear Transparent',
      'Plat logam industrial': 'Industrial Metal Plate', 'Kayu workshop': 'Workshop Wood', 'Cabin kayu': 'Wooden Cabin',
      'Cutting mat hijau': 'Green Cutting Mat', 'Cutting mat krem': 'Beige Cutting Mat', 'Putih studio': 'Studio White',
      'Tropis': 'Tropical', 'Piknik': 'Picnic', '20-an': '20s', '30-an': '30s',
      'Balkon': 'Balcony', 'Dokumenter': 'Documentary',
      'Hewan darat': 'Land animals', 'Hewan laut': 'Sea animals', 'Burung': 'Birds', 'Serangga': 'Insects',
      'Dinosaurus': 'Dinosaurs', 'Luar angkasa': 'Outer space', 'Alam': 'Nature',
      '3D film animasi': '3D animated film', 'Ilustrasi buku cerita (cat air)': 'Storybook illustration (watercolor)',
      'Kartun 2D ceria': 'Cheerful 2D cartoon', 'Semi-realistis lembut': 'Soft semi-realistic', 'Clay / plastisin': 'Clay / plasticine',
      'Kupu-kupu': 'Butterfly', 'Katak': 'Frog', 'Ayam': 'Chicken', 'Kumbang': 'Beetle', 'Capung': 'Dragonfly',
      'Nyamuk': 'Mosquito', 'Ikan': 'Fish', 'Tanaman kacang': 'Bean plant', 'Bunga matahari': 'Sunflower', 'Pohon apel': 'Apple tree',
    },
    ms: {
      'Tidak Ada': 'Tiada', 'Custom': 'Tersuai', 'Kejutkan aku': 'Kejutkan saya',
      'Acak': 'Rawak', 'Jepang': 'Jepun', 'Barat (Eropa/Amerika)': 'Barat (Eropah/Amerika)',
      'Kerja Harian / Karier': 'Kerja Harian / Kerjaya', 'Keuangan': 'Kewangan', 'Kesehatan Mental': 'Kesihatan Mental',
      'Ruang Tamu Cozy': 'Ruang Tamu Selesa', 'Dalam Mobil': 'Dalam Kereta',
      'Semangat / Motivator': 'Bersemangat / Motivator',
      'Pria': 'Lelaki', 'Wanita': 'Wanita', 'Remaja': 'Remaja',
      'Mobil balap': 'Kereta Lumba', 'Mobil balap kartun': 'Kereta Lumba Kartun', 'Mobil klasik': 'Kereta Klasik',
      'Mobil sport': 'Kereta Sport', 'Motor': 'Motosikal', 'Motor mini': 'Motosikal Mini', 'Motoran': 'Menunggang Motosikal',
      'Truk': 'Trak', 'Pesawat': 'Kapal Terbang', 'Bus sekolah': 'Bas Sekolah', 'Mesin potong rumput': 'Mesin Pemotong Rumput',
      'Kamar Tidur': 'Bilik Tidur', 'Kamar Mandi': 'Bilik Mandi', 'Kamar Aesthetic': 'Bilik Aesthetic',
      'Kamar Estetik': 'Bilik Estetik', 'Kamar Natural': 'Bilik Natural', 'Dalam ruangan': 'Dalam Bilik',
      'Di Kantor': 'Di Pejabat', 'Kantor Modern': 'Pejabat Moden', 'Pabrik': 'Kilang',
      'Jalan tol': 'Lebuh Raya', 'Jalan kota': 'Jalan Bandar', 'Perkotaan': 'Bandar', 'Pedesaan': 'Luar Bandar',
      'Pegunungan': 'Pergunungan', 'Apartemen City': 'Apartmen Bandar', 'Rumah mewah modern': 'Rumah Mewah Moden',
      'Modern minimalis': 'Moden Minimalis', 'Teras Rumah': 'Beranda Rumah', 'Kebun sayur': 'Kebun Sayur',
      'Jeruk': 'Oren', 'Apel': 'Epal', 'Semangka': 'Tembikai', 'Stroberi besar': 'Strawberi Besar',
      'Kelinci': 'Arnab', 'Keledai': 'Keldai', 'Celengan babi': 'Tabung Babi',
      'Cewek anime': 'Gadis Anime', 'Cowok anime': 'Teruna Anime', 'Seragam sekolah': 'Pakaian Seragam Sekolah',
      'Kondangan': 'Majlis Kahwin', 'Kombinasi': 'Kombinasi', 'Bebas warna-warni': 'Bebas Warna-warni',
      'Minimalis': 'Minimalis', 'Minimalis 1 lantai': 'Minimalis 1 Tingkat', '2 lantai': '2 Tingkat',
      'Lahan siap tanam': 'Tanah Sedia Tanam', 'Lahan sampah': 'Tanah Sampah', 'Semak belukar': 'Semak Samun',
      'Jembatan runtuh': 'Jambatan Runtuh', 'Tangga raksasa': 'Tangga Gergasi', 'vs Objek raksasa': 'vs Objek Gergasi',
      'Obstacle rintangan gila': 'Halangan Gila', 'Crash tabrakan': 'Pelanggaran', 'Balapan chaos': 'Perlumbaan Kelam-kabut',
      'Bunga & pot': 'Bunga & Pasu', 'Lampu hias': 'Lampu Hiasan', 'Rumput hijau': 'Rumput Hijau',
      'Halaman kotor': 'Laman Kotor', 'Halaman bersih': 'Laman Bersih', 'Halaman rumah': 'Laman Rumah',
      'Hewan darat': 'Haiwan Darat', 'Hewan laut': 'Haiwan Laut', 'Luar angkasa': 'Angkasa Lepas',
      'Kupu-kupu': 'Rama-rama', 'Pohon apel': 'Pokok Epal', 'Tanaman kacang': 'Pokok Kacang',
    },
  };

  // === DYN LABELS (teks chrome dinamis bikinan JS: header viral, label grup chip, section) ===
  window.DYN_LABELS = {
    en: {
      'Generator Video Cetakan Buah': 'Fruit Mold Video Generator',
      'Generator Video Pembangunan Rumah': 'House Building Video Generator',
      'Generator Video Pembersihan Lahan': 'Land Clearing Video Generator',
      'Generator Video Viral Custom': 'Custom Viral Video Generator',
      'Generator Video Car Crash': 'Car Crash Video Generator',
      'Generator Video DIY Boneka': 'DIY Doll Video Generator',
      'Generator Video DIY Botol Plastik': 'DIY Plastic Bottle Video Generator',
      'Generator Video DIY Metal Craft': 'DIY Metal Craft Video Generator',
      'Generator Video DIY Sedotan': 'DIY Straw Video Generator',
      'Buah tumbuh dalam cetakan bentuk lucu — dari pohon sampai laku di pasar.': 'Fruit growing in cute-shaped molds — from tree to selling at the market.',
      'Dari lahan kosong sampai rumah jadi — progresi konstruksi yang memuaskan.': 'From empty land to a finished house — a satisfying construction progression.',
      'Before kotor → proses → after bersih rapi. Transformasi satisfying.': 'Before dirty → process → after clean and tidy. A satisfying transformation.',
      'Racik ide proses/transformasimu sendiri — AI yang pecah jadi scene.': 'Craft your own process/transformation idea — AI splits it into scenes.',
      'Crash, stunt & destruction fisika mobil — konten viral YouTube/Shorts.': 'Car crash, stunt & destruction physics — viral YouTube/Shorts content.',
      'Stop-motion bikin boneka dari kawat bulu + aluminium foil — dari kerangka sampai berdiri jadi.': 'Stop-motion doll-making from pipe cleaners + aluminium foil — from frame to standing finished.',
      'Daur ulang botol plastik bekas jadi pajangan lucu — dari potong botol sampai reveal di meja.': 'Recycle used plastic bottles into cute decor — from cutting the bottle to the reveal on the table.',
      'Miniatur dari mur, ring besi & kawat tembaga — dari susun cangkang sampai reveal di alas kayu.': 'Miniature from nuts, washers & copper wire — from stacking the shell to the reveal on a wooden base.',
      'Model rakitan presisi dari sedotan plastik — dari potong sedotan sampai reveal di cutting mat.': 'A precise model built from plastic straws — from cutting straws to the reveal on the cutting mat.',
      'Buah': 'Fruit', 'Bentuk Cetakan': 'Mold Shape', 'Latar': 'Background', 'Gaya Video': 'Video Style',
      'Tipe Rumah': 'House Type', 'Gaya Arsitektur': 'Architecture Style', 'Lokasi': 'Location', 'Kecepatan Proses': 'Process Speed',
      'Jenis Lahan': 'Land Type', 'Metode': 'Method', 'Hasil Akhir': 'Final Result',
      'Jenis Aksi': 'Action Type', 'Kendaraan': 'Vehicle', 'Arena / Lokasi': 'Arena / Location', 'Gaya Kamera': 'Camera Style',
      'Karakter': 'Character', 'Outfit': 'Outfit', 'Latar Meja': 'Table Background',
      'Bentuk Pajangan': 'Decor Shape', 'Warna Botol': 'Bottle Color', 'Bentuk Figur': 'Figure Shape', 'Material Metal': 'Metal Material',
      'Bentuk Model': 'Model Shape', 'Warna Sedotan': 'Straw Color',
      'Deskripsi Karakter (opsional)': 'Character Description (optional)', 'Deskripsi Pajangan (opsional)': 'Decor Description (optional)',
      'Deskripsi Figur (opsional)': 'Figure Description (optional)', 'Deskripsi Model (opsional)': 'Model Description (optional)',
      'Ceritakan proses viralmu': 'Tell your viral process',
      'Tulis dari awal sampai hasil akhir — AI yang memecah jadi scene.': 'Write from start to final result — the AI splits it into scenes.',
      'Opsional — kosongkan biar AI berkreasi dari pilihan chip.': 'Optional — leave empty to let AI create from the chip choices.',
      'Ambil ciri dari Foto (objek/hewan — hasil tetap pajangan botol)': 'Get features from Photo (object/animal — result stays a bottle decor)',
      'Ambil ciri dari Foto (objek/hewan — hasil tetap figur metal)': 'Get features from Photo (object/animal — result stays a metal figure)',
      'Ambil ciri dari Foto (objek/karakter — hasil tetap model sedotan)': 'Get features from Photo (object/character — result stays a straw model)',
      'Ambil ciri dari Foto (kartun/manusia — hasil tetap boneka)': 'Get features from Photo (cartoon/human — result stays a doll)',
      'Contoh: cewek rambut hitam panjang, crop top ungu, rok lilit pink motif bunga, kacamata kuning di atas kepala': 'Example: girl with long black hair, purple crop top, pink floral wrap skirt, yellow glasses on her head',
      'Contoh: kura-kura dengan tempurung dari dasar botol hijau bergelombang, botol biru di tengah, kaki hijau berkuku kuning, mata besar & senyum dari spidol hitam': 'Example: a turtle with a shell from a wavy green bottle base, a blue bottle in the middle, green legs with yellow claws, big eyes & a smile from a black marker',
      'Contoh: kura-kura dengan cangkang kubah dari mur rustic berkarat, kepala & kaki dari lilitan kawat tembaga, mata bulat kawat, di alas kayu oval': 'Example: a turtle with a domed shell from rusty rustic nuts, head & legs from coiled copper wire, round wire eyes, on an oval wooden base',
      'Contoh: mobil balap kartun merah glossy, mata besar di kaca depan, aksen petir kuning di samping, roda hitam dari susunan sedotan melingkar, spoiler belakang': 'Example: a glossy red cartoon race car, big eyes on the windshield, yellow lightning accents on the sides, black wheels from coiled straws, a rear spoiler',
      'AI sedang menganalisis produk...': 'AI is analyzing the product...',
      'AI sedang menganalisis produk skincare...': 'AI is analyzing the skincare product...',
      'AI sedang menyusun story iklan...': 'AI is composing the ad story...',
      'AI sedang menganalisis makanan...': 'AI is analyzing the food...',
      'AI sedang menyusun story fashion...': 'AI is composing the fashion story...',
      'AI sedang menyusun scene unboxing...': 'AI is composing the unboxing scenes...',
      'AI sedang menyusun langkah tutorial...': 'AI is composing the tutorial steps...',
      'AI sedang menyusun story harian...': 'AI is composing the daily story...',
      'AI sedang menyusun story testimoni...': 'AI is composing the testimonial story...',
      'AI sedang menyusun story GRWM...': 'AI is composing the GRWM story...',
      'AI sedang menyusun proses cetakan buah...': 'AI is composing the fruit mold process...',
      'AI sedang menyusun proses pembangunan...': 'AI is composing the construction process...',
      'AI sedang menyusun proses pembersihan...': 'AI is composing the cleaning process...',
      'AI sedang meracik ide viralmu...': 'AI is crafting your viral idea...',
      'AI sedang menyusun simulasi crash...': 'AI is composing the crash simulation...',
      'AI sedang menyusun proses pembuatan boneka...': 'AI is composing the doll-making process...',
      'AI sedang menyusun proses crafting botol...': 'AI is composing the bottle crafting process...',
      'AI sedang menyusun proses crafting metal...': 'AI is composing the metal crafting process...',
      'AI sedang menyusun proses rakit sedotan...': 'AI is composing the straw assembly process...',
      'Ensiklopedia Anak': 'Kids Encyclopedia', 'Siklus Hidup': 'Life Cycle',
      'Video pengetahuan 1 subjek untuk anak — narasi dokumenter ramah anak. Fakta dibuat AI: cek dulu sebelum diposting.': 'One-subject knowledge videos for kids — kid-friendly documentary narration. Facts are AI-generated: verify before posting.',
      'Transformasi tahapan hidup satu subjek — telur jadi kupu-kupu, biji jadi pohon. Narasi dokumenter ramah anak.': 'One subject transforming through its life stages — egg to butterfly, seed to tree. Kid-friendly documentary narration.',
      'Subjek Spesifik (opsional)': 'Specific Subject (optional)',
      'Kategori Subjek': 'Subject Category', 'Gaya Visual': 'Visual Style', 'Subjek': 'Subject',
      'Contoh: Gajah Afrika, Hiu Paus, Planet Saturnus — kosongkan biar AI pilih dari kategori': 'Example: African Elephant, Whale Shark, Planet Saturn — leave empty to let AI pick from the category',
      'AI sedang menyusun cerita pengetahuan...': 'AI is composing the knowledge story...',
      'AI sedang menyusun tahapan siklus hidup...': 'AI is composing the life-cycle stages...',
    },
    ms: {
      'Generator Video Cetakan Buah': 'Penjana Video Acuan Buah',
      'Generator Video Pembangunan Rumah': 'Penjana Video Pembinaan Rumah',
      'Generator Video Pembersihan Lahan': 'Penjana Video Pembersihan Tanah',
      'Generator Video Viral Custom': 'Penjana Video Viral Tersuai',
      'Generator Video Car Crash': 'Penjana Video Car Crash',
      'Generator Video DIY Boneka': 'Penjana Video DIY Patung',
      'Generator Video DIY Botol Plastik': 'Penjana Video DIY Botol Plastik',
      'Generator Video DIY Metal Craft': 'Penjana Video DIY Metal Craft',
      'Generator Video DIY Sedotan': 'Penjana Video DIY Straw',
      'Buah tumbuh dalam cetakan bentuk lucu — dari pohon sampai laku di pasar.': 'Buah membesar dalam acuan bentuk comel — dari pokok hingga laku di pasar.',
      'Dari lahan kosong sampai rumah jadi — progresi konstruksi yang memuaskan.': 'Dari tanah kosong hingga rumah siap — progres pembinaan yang memuaskan.',
      'Before kotor → proses → after bersih rapi. Transformasi satisfying.': 'Sebelum kotor → proses → selepas bersih kemas. Transformasi memuaskan.',
      'Racik ide proses/transformasimu sendiri — AI yang pecah jadi scene.': 'Cipta idea proses/transformasi sendiri — AI pecahkan jadi babak.',
      'Crash, stunt & destruction fisika mobil — konten viral YouTube/Shorts.': 'Perlanggaran, aksi & pemusnahan fizik kereta — kandungan viral YouTube/Shorts.',
      'Stop-motion bikin boneka dari kawat bulu + aluminium foil — dari kerangka sampai berdiri jadi.': 'Stop-motion buat patung dari pipe cleaner + kerajang aluminium — dari rangka hingga siap berdiri.',
      'Daur ulang botol plastik bekas jadi pajangan lucu — dari potong botol sampai reveal di meja.': 'Kitar semula botol plastik terpakai jadi hiasan comel — dari potong botol hingga reveal di meja.',
      'Miniatur dari mur, ring besi & kawat tembaga — dari susun cangkang sampai reveal di alas kayu.': 'Miniatur dari nat, ring besi & dawai tembaga — dari susun cangkang hingga reveal di alas kayu.',
      'Model rakitan presisi dari sedotan plastik — dari potong sedotan sampai reveal di cutting mat.': 'Model binaan tepat dari straw plastik — dari potong straw hingga reveal di cutting mat.',
      'Buah': 'Buah', 'Bentuk Cetakan': 'Bentuk Acuan', 'Latar': 'Latar', 'Gaya Video': 'Gaya Video',
      'Tipe Rumah': 'Jenis Rumah', 'Gaya Arsitektur': 'Gaya Seni Bina', 'Lokasi': 'Lokasi', 'Kecepatan Proses': 'Kelajuan Proses',
      'Jenis Lahan': 'Jenis Tanah', 'Metode': 'Kaedah', 'Hasil Akhir': 'Hasil Akhir',
      'Jenis Aksi': 'Jenis Aksi', 'Kendaraan': 'Kenderaan', 'Arena / Lokasi': 'Arena / Lokasi', 'Gaya Kamera': 'Gaya Kamera',
      'Karakter': 'Watak', 'Outfit': 'Pakaian', 'Latar Meja': 'Latar Meja',
      'Bentuk Pajangan': 'Bentuk Hiasan', 'Warna Botol': 'Warna Botol', 'Bentuk Figur': 'Bentuk Figura', 'Material Metal': 'Bahan Logam',
      'Bentuk Model': 'Bentuk Model', 'Warna Sedotan': 'Warna Straw',
      'Deskripsi Karakter (opsional)': 'Penerangan Watak (pilihan)', 'Deskripsi Pajangan (opsional)': 'Penerangan Hiasan (pilihan)',
      'Deskripsi Figur (opsional)': 'Penerangan Figura (pilihan)', 'Deskripsi Model (opsional)': 'Penerangan Model (pilihan)',
      'Ceritakan proses viralmu': 'Ceritakan proses viral anda',
      'Tulis dari awal sampai hasil akhir — AI yang memecah jadi scene.': 'Tulis dari mula hingga hasil akhir — AI pecahkan jadi babak.',
      'Opsional — kosongkan biar AI berkreasi dari pilihan chip.': 'Pilihan — biar kosong supaya AI berkarya dari pilihan chip.',
      'Ambil ciri dari Foto (objek/hewan — hasil tetap pajangan botol)': 'Ambil ciri dari Foto (objek/haiwan — hasil kekal hiasan botol)',
      'Ambil ciri dari Foto (objek/hewan — hasil tetap figur metal)': 'Ambil ciri dari Foto (objek/haiwan — hasil kekal figura logam)',
      'Ambil ciri dari Foto (objek/karakter — hasil tetap model sedotan)': 'Ambil ciri dari Foto (objek/watak — hasil kekal model straw)',
      'Ambil ciri dari Foto (kartun/manusia — hasil tetap boneka)': 'Ambil ciri dari Foto (kartun/manusia — hasil kekal patung)',
      'Contoh: cewek rambut hitam panjang, crop top ungu, rok lilit pink motif bunga, kacamata kuning di atas kepala': 'Contoh: gadis berambut hitam panjang, crop top ungu, skirt lilit pink corak bunga, cermin mata kuning atas kepala',
      'Contoh: kura-kura dengan tempurung dari dasar botol hijau bergelombang, botol biru di tengah, kaki hijau berkuku kuning, mata besar & senyum dari spidol hitam': 'Contoh: kura-kura dengan cangkang dari dasar botol hijau beralun, botol biru di tengah, kaki hijau berkuku kuning, mata besar & senyum dari marker hitam',
      'Contoh: kura-kura dengan cangkang kubah dari mur rustic berkarat, kepala & kaki dari lilitan kawat tembaga, mata bulat kawat, di alas kayu oval': 'Contoh: kura-kura dengan cangkang kubah dari nat rustic berkarat, kepala & kaki dari lilitan dawai tembaga, mata bulat dawai, di alas kayu bujur',
      'Contoh: mobil balap kartun merah glossy, mata besar di kaca depan, aksen petir kuning di samping, roda hitam dari susunan sedotan melingkar, spoiler belakang': 'Contoh: kereta lumba kartun merah glossy, mata besar pada cermin depan, aksen kilat kuning di tepi, roda hitam dari susunan straw melingkar, spoiler belakang',
      'AI sedang menganalisis produk...': 'AI sedang menganalisis produk...',
      'AI sedang menganalisis produk skincare...': 'AI sedang menganalisis produk penjagaan kulit...',
      'AI sedang menyusun story iklan...': 'AI sedang menyusun kisah iklan...',
      'AI sedang menganalisis makanan...': 'AI sedang menganalisis makanan...',
      'AI sedang menyusun story fashion...': 'AI sedang menyusun kisah fesyen...',
      'AI sedang menyusun scene unboxing...': 'AI sedang menyusun babak buka bungkusan...',
      'AI sedang menyusun langkah tutorial...': 'AI sedang menyusun langkah tutorial...',
      'AI sedang menyusun story harian...': 'AI sedang menyusun kisah harian...',
      'AI sedang menyusun story testimoni...': 'AI sedang menyusun kisah testimoni...',
      'AI sedang menyusun story GRWM...': 'AI sedang menyusun kisah GRWM...',
      'AI sedang menyusun proses cetakan buah...': 'AI sedang menyusun proses acuan buah...',
      'AI sedang menyusun proses pembangunan...': 'AI sedang menyusun proses pembinaan...',
      'AI sedang menyusun proses pembersihan...': 'AI sedang menyusun proses pembersihan...',
      'AI sedang meracik ide viralmu...': 'AI sedang mengolah idea viral anda...',
      'AI sedang menyusun simulasi crash...': 'AI sedang menyusun simulasi perlanggaran...',
      'AI sedang menyusun proses pembuatan boneka...': 'AI sedang menyusun proses pembuatan patung...',
      'AI sedang menyusun proses crafting botol...': 'AI sedang menyusun proses kraf botol...',
      'AI sedang menyusun proses crafting metal...': 'AI sedang menyusun proses kraf logam...',
      'AI sedang menyusun proses rakit sedotan...': 'AI sedang menyusun proses pasang straw...',
      'Ensiklopedia Anak': 'Ensiklopedia Kanak-kanak', 'Siklus Hidup': 'Kitaran Hidup',
      'Video pengetahuan 1 subjek untuk anak — narasi dokumenter ramah anak. Fakta dibuat AI: cek dulu sebelum diposting.': 'Video pengetahuan 1 subjek untuk kanak-kanak — narasi dokumentari mesra kanak-kanak. Fakta dijana AI: semak dahulu sebelum muat naik.',
      'Transformasi tahapan hidup satu subjek — telur jadi kupu-kupu, biji jadi pohon. Narasi dokumenter ramah anak.': 'Transformasi peringkat hidup satu subjek — telur jadi rama-rama, biji jadi pokok. Narasi dokumentari mesra kanak-kanak.',
      'Subjek Spesifik (opsional)': 'Subjek Spesifik (pilihan)',
      'Contoh: Gajah Afrika, Hiu Paus, Planet Saturnus — kosongkan biar AI pilih dari kategori': 'Contoh: Gajah Afrika, Yu Paus, Planet Zuhal — biar kosong supaya AI pilih dari kategori',
      'AI sedang menyusun tahapan siklus hidup...': 'AI sedang menyusun peringkat kitaran hidup...',
    },
  };

  // === TUTORIAL VIDEOS ===
  const TUTORIAL_VIDEOS = [
    { key: 'tut.basic', url: 'https://youtu.be/UaSsRKmJDdg' },
    { key: 'tut.new', url: 'https://youtu.be/rYBc1RADUwc', isNew: true }
  ];
  function showTutorialChoice() {
    const modal = document.createElement('div');
    modal.className = 'image-preview-modal';
    const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
    modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-sm w-full" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between mb-4"><h3 class="text-base font-bold text-gray-800">${t('tut.title')}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
      <div class="space-y-2" data-choices></div>
    </div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    const wrap = modal.querySelector('[data-choices]');
    TUTORIAL_VIDEOS.forEach(v => {
      const a = document.createElement('a');
      a.href = v.url; a.target = '_blank'; a.rel = 'noopener';
      a.className = 'w-full btn-secondary py-2.5 px-4 rounded-lg font-semibold text-sm text-left flex items-center gap-2';
      a.innerHTML = `<i class="fab fa-youtube" style="color:#ff0033;"></i><span>${t(v.key)}</span>${v.isNew ? '<span class="badge-new">NEW</span>' : ''}`;
      a.addEventListener('click', close);
      wrap.appendChild(a);
    });
    modal.querySelector('[data-close]').addEventListener('click', close);
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
  }
  ['tutorial-link', 'tutorial-link-top'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', (e) => { e.preventDefault(); showTutorialChoice(); });
  });
  // === END TUTORIAL VIDEOS ===

  // === TUTORIAL PANEL ===
  const GUIDE_CONTENT = {
    id: [
      { t: '1. Mulai Cepat', h: '<p>Aplikasi ini mengubah foto produk/ide jadi <b>foto storyboard</b> (scene 1→N) untuk kamu jadikan video.</p><ul><li>Masuk dengan <b>email pembelian</b> kamu.</li><li>Pilih fitur di menu kiri, isi input, tekan <b>Generate</b>.</li><li>Tiap kartu hasil bisa di-Regenerate, Edit Prompt, ambil <b>Prompt Video</b>, dan diunduh.</li></ul><p>Penting: app menghasilkan <b>foto + teks prompt</b>. Proses foto→video kamu lakukan di platform luar (Runway/Pika/Kling/Veo).</p>' },
      { t: '2. Pilih Bahasa', h: '<p>Ganti bahasa antarmuka lewat menu <b>🌐</b> di sidebar (English / Melayu / Indonesia).</p><p><b>Bahasa ucapan video otomatis ikut</b> bahasa aplikasi — pilih Melayu, model di prompt video bicara Melayu. Kamu tetap bisa mengubahnya per fitur lewat tombol bahasa (ID→EN→MS) di header hasil.</p>' },
      { t: '3. Model Studio (AI Influencer)', h: '<p>Buat model virtual: racik lewat chip (gender/usia/look/hijab) lalu Generate, atau <b>upload foto</b> sendiri. Simpan ke <b>Pustaka Model</b> (ikut akun, maks 5).</p><p>Saat pakai fitur review, tekan <b>Pilih dari Pustaka Model</b> untuk memasukkan model tersimpan ke story.</p>' },
      { t: '4. Mode Durasi vs Jumlah Foto', h: '<p>Dua cara menentukan panjang story:</p><ul><li><b>Mode Durasi</b> — pilih platform + durasi (mis. 30 dtk); app hitung jumlah klip & scene otomatis.</li><li><b>Jumlah Foto</b> — kamu pilih sendiri berapa foto (1–10).</li></ul>' },
      { t: '5. Tema Foto', h: '<p>Tiap fitur punya <b>chip tema</b>: "Tidak Ada" (acak/default), "Custom" (tulis sendiri), atau preset tempat/mood sesuai konteks fitur. Cukup klik salah satu chip.</p>' },
      { t: '6. Review Generator (10 fitur)', h: '<ul><li><b>Review Produk</b> — foto review produk afiliasi.</li><li><b>Skincare</b> — scene review skincare glowing.</li><li><b>Fashion / OOTD</b> — story fashion & outfit.</li><li><b>Unboxing</b> — story buka paket.</li><li><b>Story Iklan</b> — storyboard iklan brand.</li><li><b>Review Makanan</b> — food review; isi Foto Model untuk gaya food vlogger.</li><li><b>Tutorial Pakai</b> — cara pakai produk.</li><li><b>Day in My Life</b> — vlog harian (model wajib).</li><li><b>Testimoni</b> — story masalah → solusi.</li><li><b>GRWM</b> — get ready with me (model wajib).</li></ul>' },
      { t: '7. Video Short Viral (9 fitur)', h: '<ul><li><b>Custom Viral</b> — racik ide prosesmu sendiri.</li><li><b>Cetakan Buah</b> — buah tumbuh dalam cetakan lucu.</li><li><b>Pembangunan Rumah</b> — lahan kosong → rumah jadi.</li><li><b>Pembersihan Lahan</b> — kotor → bersih satisfying.</li><li><b>Car Crash</b> — crash & stunt fisika mobil.</li><li><b>DIY Boneka</b> — stop-motion pipe cleaner.</li><li><b>DIY Botol</b> — daur ulang botol jadi pajangan.</li><li><b>DIY Metal</b> — miniatur mur & kawat tembaga.</li><li><b>DIY Sedotan</b> — model rakitan sedotan.</li></ul><p>Fitur viral text-to-image (tanpa upload); hasil scene akhir dipakai sebagai acuan agar desain konsisten.</p>' },
      { t: '8. Generate & Kartu Hasil', h: '<p>Tiap kartu punya: <b>Preview</b>, <b>Regenerate</b>, <b>Edit Prompt</b> (ubah prompt lalu Regenerate), <b>Video</b> (ambil prompt image-to-video), <b>Download</b>. Scene yang gagal punya tombol <b>Coba Lagi</b>.</p>' },
      { t: '9. Prompt Video', h: '<p>Tombol <b>Video</b> di kartu menghasilkan prompt image-to-video sadar-cerita. Atur <b>Gaya Audio</b> (UGC, Voiceover, ASMR, Sinematik, Timelapse, dll) dan <b>bahasa ucapan</b>. Di header ada <b>Semua Prompt Video</b> (Per Scene / Per Klip).</p>' },
      { t: '10. Lanjutkan Cerita', h: '<p>Di Mode Durasi, tombol <b>Lanjutkan Cerita</b> memperpanjang story <b>+1 klip</b> dari scene terakhir tanpa mengulang dari awal.</p>' },
      { t: '11. Caption', h: '<p>Tombol <b>Caption</b> membuat 3 varian caption (Soft/Story/Hard-selling) + hashtag untuk video final. Bahasa ikut tombol bahasa ucapan.</p>' },
      { t: '12. Ekspor Storyboard', h: '<p>Gabung foto scene + prompt video jadi <b>1 gambar per klip</b> — tekan <b>Ekspor Storyboard</b> di header atau <b>Storyboard</b> di tiap pembatas klip.</p>' },
      { t: '13. Tips & FAQ', h: '<ul><li>App hanya keluarkan <b>foto + teks prompt</b> — buat videonya di Runway/Pika/Kling/Veo.</li><li>ASMR/Sinematik/Timelapse sengaja <b>tanpa suara orang</b> (musik + SFX saja).</li><li>Kalau hasil kurang pas, tekan Regenerate atau Edit Prompt.</li></ul>' },
      { t: '14. Influencer Bicara', h: '<p>Buat konten <b>talking-head per niche</b> (kata bijak, islami, parenting, dll): pilih foto model (wajib), niche, latar, gaya bicara → <b>Buat Naskah</b> (AI menulis monolog utuh, bisa diedit per klip) → <b>Generate Foto</b> (1 foto per klip).</p><p><b>Naskah nyambung antar klip</b> — prompt video tiap klip berisi kata-kata persis segmen itu. Generate video per klip di platform luar (Kling/Veo), lalu satukan di CapCut jadi satu monolog utuh (mis. 6 klip × 10 dtk = 60 dtk).</p>' },
      { t: '15. Cerita Anak', h: '<p>Kategori konten edukasi anak — <b>narasi narator, subjek tidak bicara</b> (gaya dokumenter/dongeng).</p><ul><li><b>Ensiklopedia Anak</b> — pengetahuan 1 subjek (mis. Gajah Afrika): pilih kategori + gaya visual, atau ketik subjek spesifik. Scene mengalir: kenalan → habitat → makanan → keunikan → fakta seru → rekap.</li><li><b>Siklus Hidup</b> — tahapan hidup 1 subjek (telur → ulat → kepompong → kupu-kupu) urut maju, scene akhir bentuk dewasa.</li></ul><p>Gaya audio default <b>Voiceover</b> — prompt video berisi narasi ramah anak. <b>Fakta dibuat AI: cek dulu sebelum diposting.</b></p>' },
    ],
    en: [
      { t: '1. Quick Start', h: '<p>This app turns product photos/ideas into <b>storyboard photos</b> (scene 1→N) for you to turn into video.</p><ul><li>Sign in with your <b>purchase email</b>.</li><li>Pick a feature on the left, fill the inputs, hit <b>Generate</b>.</li><li>Each result card can Regenerate, Edit Prompt, grab a <b>Video Prompt</b>, and download.</li></ul><p>Note: the app produces <b>photos + prompt text</b>. Turning photos into video is done on external platforms (Runway/Pika/Kling/Veo).</p>' },
      { t: '2. Choose Language', h: '<p>Switch the interface language via the <b>🌐</b> menu in the sidebar (English / Malay / Indonesian).</p><p>The <b>video speech language follows automatically</b> — pick Malay and the model speaks Malay in the video prompt. You can still change it per feature with the language button (ID→EN→MS) in the results header.</p>' },
      { t: '3. Model Studio (AI Influencer)', h: '<p>Create a virtual model: mix via chips (gender/age/look/hijab) then Generate, or <b>upload your own photo</b>. Save to the <b>Model Library</b> (tied to your account, max 5).</p><p>Inside review features, tap <b>Pick from Model Library</b> to insert a saved model into the story.</p>' },
      { t: '4. Duration Mode vs Photo Count', h: '<p>Two ways to set story length:</p><ul><li><b>Duration Mode</b> — pick platform + duration (e.g. 30s); the app computes clips & scenes automatically.</li><li><b>Photo Count</b> — you choose how many photos (1–10).</li></ul>' },
      { t: '5. Photo Theme', h: '<p>Each feature has <b>theme chips</b>: "None" (random/default), "Custom" (write your own), or place/mood presets fitting the feature. Just click one chip.</p>' },
      { t: '6. Review Generator (10 features)', h: '<ul><li><b>Product Review</b> — affiliate product review photos.</li><li><b>Skincare</b> — glowing skincare review scenes.</li><li><b>Fashion / OOTD</b> — fashion & outfit story.</li><li><b>Unboxing</b> — parcel-opening story.</li><li><b>Ad Story</b> — brand ad storyboard.</li><li><b>Food Review</b> — food review; add a Model Photo for a food-vlogger style.</li><li><b>How-To</b> — how to use the product.</li><li><b>Day in My Life</b> — daily vlog (model required).</li><li><b>Testimonial</b> — problem → solution story.</li><li><b>GRWM</b> — get ready with me (model required).</li></ul>' },
      { t: '7. Viral Short Video (9 features)', h: '<ul><li><b>Custom Viral</b> — craft your own process idea.</li><li><b>Fruit Mold</b> — fruit growing in a cute mold.</li><li><b>House Build</b> — empty land → finished house.</li><li><b>Land Clearing</b> — messy → clean, satisfying.</li><li><b>Car Crash</b> — car crash & stunt physics.</li><li><b>DIY Doll</b> — pipe-cleaner stop-motion.</li><li><b>DIY Bottle</b> — recycle bottles into decor.</li><li><b>DIY Metal</b> — miniatures from nuts & copper wire.</li><li><b>DIY Straw</b> — models assembled from straws.</li></ul><p>Viral features are text-to-image (no upload); the final scene is used as a reference so the design stays consistent.</p>' },
      { t: '8. Generate & Result Cards', h: '<p>Each card has: <b>Preview</b>, <b>Regenerate</b>, <b>Edit Prompt</b> (edit then Regenerate), <b>Video</b> (grab image-to-video prompt), <b>Download</b>. Failed scenes have a <b>Retry</b> button.</p>' },
      { t: '9. Video Prompt', h: '<p>The <b>Video</b> button on a card produces a story-aware image-to-video prompt. Set the <b>Audio Style</b> (UGC, Voiceover, ASMR, Cinematic, Timelapse, etc.) and <b>speech language</b>. The header has <b>All Video Prompts</b> (Per Scene / Per Clip).</p>' },
      { t: '10. Continue Story', h: '<p>In Duration Mode, the <b>Continue Story</b> button extends the story by <b>+1 clip</b> from the last scene without restarting.</p>' },
      { t: '11. Caption', h: '<p>The <b>Caption</b> button creates 3 caption variants (Soft/Story/Hard-selling) + hashtags for the final video. Language follows the speech-language button.</p>' },
      { t: '12. Export Storyboard', h: '<p>Combine scene photos + video prompts into <b>1 image per clip</b> — tap <b>Export Storyboard</b> in the header or <b>Storyboard</b> on each clip divider.</p>' },
      { t: '13. Tips & FAQ', h: '<ul><li>The app only outputs <b>photos + prompt text</b> — make the video on Runway/Pika/Kling/Veo.</li><li>ASMR/Cinematic/Timelapse are intentionally <b>without human speech</b> (music + SFX only).</li><li>If a result is off, hit Regenerate or Edit Prompt.</li></ul>' },
      { t: '14. Talking Influencer', h: '<p>Create <b>niche talking-head content</b> (wisdom, Islamic, parenting, etc.): pick a model photo (required), niche, setting, speaking style → <b>Write Script</b> (AI writes one full monologue, editable per clip) → <b>Generate Photos</b> (1 photo per clip).</p><p><b>The script flows across clips</b> — each clip\'s video prompt contains that exact segment. Generate each clip on an external platform (Kling/Veo), then join them in CapCut into one full monologue (e.g. 6 clips × 10 s = 60 s).</p>' },
      { t: '15. Kids Story', h: '<p>Kids educational content category — <b>narrator voiceover, the subject never talks</b> (documentary/fairy-tale style).</p><ul><li><b>Kids Encyclopedia</b> — one-subject knowledge (e.g. African Elephant): pick a category + visual style, or type a specific subject. Scenes flow: intro → habitat → food → uniqueness → fun facts → recap.</li><li><b>Life Cycle</b> — one subject through its life stages (egg → caterpillar → chrysalis → butterfly) in strict forward order, final scene is the adult form.</li></ul><p>Default audio style is <b>Voiceover</b> — video prompts carry kid-friendly narration. <b>Facts are AI-generated: verify before posting.</b></p>' },
    ],
    ms: [
      { t: '1. Mula Pantas', h: '<p>Aplikasi ini menukar foto produk/idea menjadi <b>foto storyboard</b> (adegan 1→N) untuk kamu jadikan video.</p><ul><li>Log masuk dengan <b>e-mel pembelian</b> kamu.</li><li>Pilih ciri di menu kiri, isi input, tekan <b>Generate</b>.</li><li>Setiap kad hasil boleh Regenerate, Edit Prompt, ambil <b>Prompt Video</b>, dan muat turun.</li></ul><p>Penting: app menghasilkan <b>foto + teks prompt</b>. Proses foto→video dibuat di platform luar (Runway/Pika/Kling/Veo).</p>' },
      { t: '2. Pilih Bahasa', h: '<p>Tukar bahasa antara muka melalui menu <b>🌐</b> di sidebar (English / Melayu / Indonesia).</p><p><b>Bahasa pertuturan video ikut secara automatik</b> — pilih Melayu, model dalam prompt video bercakap Melayu. Kamu masih boleh mengubahnya per ciri melalui butang bahasa (ID→EN→MS) di pengepala hasil.</p>' },
      { t: '3. Studio Model (AI Influencer)', h: '<p>Cipta model maya: gabung melalui cip (jantina/umur/gaya/hijab) kemudian Generate, atau <b>muat naik foto</b> sendiri. Simpan ke <b>Pustaka Model</b> (ikut akaun, maks 5).</p><p>Semasa guna ciri review, tekan <b>Pilih dari Pustaka Model</b> untuk memasukkan model tersimpan ke dalam cerita.</p>' },
      { t: '4. Mod Tempoh vs Bilangan Foto', h: '<p>Dua cara menetapkan panjang cerita:</p><ul><li><b>Mod Tempoh</b> — pilih platform + tempoh (cth. 30 saat); app kira klip & adegan automatik.</li><li><b>Bilangan Foto</b> — kamu pilih berapa foto (1–10).</li></ul>' },
      { t: '5. Tema Foto', h: '<p>Setiap ciri ada <b>cip tema</b>: "Tiada" (rawak/lalai), "Custom" (tulis sendiri), atau pratetap tempat/mood mengikut konteks ciri. Cuma klik satu cip.</p>' },
      { t: '6. Review Generator (10 ciri)', h: '<ul><li><b>Review Produk</b> — foto review produk afiliasi.</li><li><b>Skincare</b> — adegan review skincare glowing.</li><li><b>Fashion / OOTD</b> — cerita fesyen & pakaian.</li><li><b>Unboxing</b> — cerita buka bungkusan.</li><li><b>Cerita Iklan</b> — storyboard iklan jenama.</li><li><b>Review Makanan</b> — food review; isi Foto Model untuk gaya food vlogger.</li><li><b>Cara Guna</b> — cara guna produk.</li><li><b>Day in My Life</b> — vlog harian (model wajib).</li><li><b>Testimoni</b> — cerita masalah → penyelesaian.</li><li><b>GRWM</b> — get ready with me (model wajib).</li></ul>' },
      { t: '7. Video Pendek Viral (9 ciri)', h: '<ul><li><b>Custom Viral</b> — reka idea proses kamu sendiri.</li><li><b>Acuan Buah</b> — buah membesar dalam acuan comel.</li><li><b>Pembinaan Rumah</b> — tanah kosong → rumah siap.</li><li><b>Pembersihan Tanah</b> — kotor → bersih memuaskan.</li><li><b>Car Crash</b> — fizik kemalangan & aksi kereta.</li><li><b>DIY Patung</b> — stop-motion pipe cleaner.</li><li><b>DIY Botol</b> — kitar semula botol jadi hiasan.</li><li><b>DIY Logam</b> — miniatur dari nat & dawai tembaga.</li><li><b>DIY Straw</b> — model dipasang dari straw.</li></ul><p>Ciri viral ialah text-to-image (tanpa muat naik); adegan akhir dijadikan rujukan supaya reka bentuk konsisten.</p>' },
      { t: '8. Generate & Kad Hasil', h: '<p>Setiap kad ada: <b>Preview</b>, <b>Regenerate</b>, <b>Edit Prompt</b> (ubah kemudian Regenerate), <b>Video</b> (ambil prompt image-to-video), <b>Muat Turun</b>. Adegan gagal ada butang <b>Cuba Lagi</b>.</p>' },
      { t: '9. Prompt Video', h: '<p>Butang <b>Video</b> pada kad menghasilkan prompt image-to-video sedar-cerita. Tetapkan <b>Gaya Audio</b> (UGC, Voiceover, ASMR, Sinematik, Timelapse, dll) dan <b>bahasa pertuturan</b>. Pengepala ada <b>Semua Prompt Video</b> (Per Adegan / Per Klip).</p>' },
      { t: '10. Sambung Cerita', h: '<p>Dalam Mod Tempoh, butang <b>Sambung Cerita</b> memanjangkan cerita <b>+1 klip</b> dari adegan terakhir tanpa mula semula.</p>' },
      { t: '11. Caption', h: '<p>Butang <b>Caption</b> menghasilkan 3 varian caption (Soft/Story/Hard-selling) + hashtag untuk video akhir. Bahasa ikut butang bahasa pertuturan.</p>' },
      { t: '12. Eksport Storyboard', h: '<p>Gabung foto adegan + prompt video jadi <b>1 imej per klip</b> — tekan <b>Eksport Storyboard</b> di pengepala atau <b>Storyboard</b> pada setiap pembahagi klip.</p>' },
      { t: '13. Tips & FAQ', h: '<ul><li>App hanya keluarkan <b>foto + teks prompt</b> — buat videonya di Runway/Pika/Kling/Veo.</li><li>ASMR/Sinematik/Timelapse sengaja <b>tanpa suara orang</b> (muzik + SFX sahaja).</li><li>Jika hasil kurang tepat, tekan Regenerate atau Edit Prompt.</li></ul>' },
      { t: '14. Influencer Bercakap', h: '<p>Buat <b>kandungan talking-head ikut niche</b> (kata bijak, islami, parenting, dll): pilih foto model (wajib), niche, latar, gaya percakapan → <b>Buat Skrip</b> (AI menulis satu monolog penuh, boleh diedit per klip) → <b>Jana Foto</b> (1 foto per klip).</p><p><b>Skrip bersambung antara klip</b> — prompt video setiap klip mengandungi kata-kata tepat segmen itu. Jana video per klip di platform luaran (Kling/Veo), kemudian gabungkan di CapCut jadi satu monolog penuh (cth. 6 klip × 10 saat = 60 saat).</p>' },
      { t: '15. Cerita Kanak-kanak', h: '<p>Kategori kandungan pendidikan kanak-kanak — <b>narasi perawi, subjek tidak bercakap</b> (gaya dokumentari/dongeng).</p><ul><li><b>Ensiklopedia Kanak-kanak</b> — pengetahuan 1 subjek (cth. Gajah Afrika): pilih kategori + gaya visual, atau taip subjek spesifik. Adegan mengalir: kenalan → habitat → makanan → keunikan → fakta menarik → rekap.</li><li><b>Kitaran Hidup</b> — peringkat hidup 1 subjek (telur → ulat → kepompong → rama-rama) urutan ke hadapan, adegan akhir bentuk dewasa.</li></ul><p>Gaya audio lalai <b>Voiceover</b> — prompt video membawa narasi mesra kanak-kanak. <b>Fakta dijana AI: semak dahulu sebelum muat naik.</b></p>' },
    ],
  };
  function renderGuide() {
    const box = document.getElementById('guide-accordion');
    if (!box) return;
    const lang = getLang();
    const list = GUIDE_CONTENT[lang] || GUIDE_CONTENT.id;
    box.innerHTML = '';
    list.forEach(sec => {
      const item = document.createElement('div');
      item.className = 'guide-acc-item';
      const head = document.createElement('button');
      head.type = 'button';
      head.className = 'guide-acc-head';
      head.innerHTML = `<span>${sec.t}</span><i class="fas fa-chevron-right chev"></i>`;
      const body = document.createElement('div');
      body.className = 'guide-acc-body';
      body.innerHTML = sec.h;
      head.addEventListener('click', () => item.classList.toggle('open'));
      item.appendChild(head);
      item.appendChild(body);
      box.appendChild(item);
    });
  }
  renderGuide();
  document.addEventListener('ssp-lang-changed', renderGuide);
  // === end TUTORIAL PANEL ===

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

  // === FOTO NATURAL (anti AI-slop) ===
  // Fragmen prompt yang ditempel ke generate GAMBAR saat checkbox dicentang.
  window.NATURAL_PHOTO_HINT = ' PHOTOREALISM (VERY IMPORTANT): render this as a REAL candid photo taken on a phone or mirrorless camera, NOT an AI render. Natural human skin with visible pores, fine texture, tiny natural blemishes, flyaway hairs and slightly uneven skin tone; absolutely NO smooth plastic, waxy or airbrushed CGI skin. Natural imperfect lighting with soft real shadows, realistic shallow depth of field, subtle lens/sensor noise and a faint film grain, natural colors that are not oversaturated. Avoid the glossy over-perfect "AI look".';
  window.naturalToggleHTML = function (id) {
    return `<label class="flex items-start gap-3 cursor-pointer select-none mb-4 p-3 bg-violet-50 border-2 border-violet-100 rounded-xl">
      <input type="checkbox" id="${id}" class="mt-0.5 w-5 h-5 accent-violet-600 shrink-0">
      <span class="text-sm leading-snug"><span class="font-semibold text-gray-700" data-i18n="opt.natural-photo">Foto Natural (anti-plastik)</span><span class="block text-xs text-gray-400 mt-0.5" data-i18n="opt.natural-photo-hint">Kurangi kesan AI/CGI — kulit &amp; pencahayaan lebih realistis.</span></span>
    </label>`;
  };
  window.naturalHint = function (id) { return document.getElementById(id)?.checked ? window.NATURAL_PHOTO_HINT : ''; };

  // === Helper simpan foto iOS → langsung ke Galeri (bukan Files) ===
  // iPadOS 13+ menyamar sebagai "Mac" — cek touchPoints
  window.__isIOS = function () {
    var ua = navigator.userAgent || '';
    if (/iPad|iPhone|iPod/.test(ua)) return true;
    if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true;
    return false;
  };
  // Web Share API level 2: File ber-MIME asli → share sheet native "Simpan ke Foto".
  // Fallback berlapis: kalau iframe blokir web-share → modal long-press (JANGAN buka tab baru).
  window.__iosShareOrSaveImage = async function (blob, filename) {
    var mime = blob.type || 'image/png';
    var file = null;
    try { file = new File([blob], filename, { type: mime }); } catch (e) { file = null; }
    if (file && navigator.canShare) {
      try {
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: filename });
          return;
        }
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    var url = URL.createObjectURL(blob);
    var modal = document.createElement('div');
    modal.className = 'image-preview-modal';
    modal.innerHTML = '<div class="bg-white rounded-xl p-5 max-w-sm w-full" onclick="event.stopPropagation()">'
      + '<p class="text-sm text-gray-700 mb-3 leading-relaxed">' + t('ios.save-hint') + '</p>'
      + '<img alt="" class="w-full rounded-lg" style="-webkit-touch-callout:default;pointer-events:auto;">'
      + '<p class="text-[11px] text-gray-400 mt-3 break-all" data-fn></p>'
      + '<div class="flex justify-end mt-4"><button type="button" data-ok class="btn-primary font-semibold py-2 px-5 rounded-lg text-sm">' + t('modal.close') + '</button></div>'
      + '</div>';
    modal.querySelector('img').src = url;
    modal.querySelector('[data-fn]').textContent = filename;
    document.body.appendChild(modal);
    setTimeout(function () { modal.classList.add('show'); }, 10);
    var close = function () { modal.classList.remove('show'); setTimeout(function () { modal.remove(); URL.revokeObjectURL(url); }, 200); };
    modal.querySelector('[data-ok]').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  };

  // === Helper download global ===
  window.downloadDataURINew = function (dataURI, filename) {
    const name = filename || 'storyboard.png';
    const isImage = /\.(png|jpe?g|webp)$/i.test(name) || /^data:image\//i.test(dataURI);
    if (isImage && window.__isIOS && window.__isIOS()) {
      if (/^data:/i.test(dataURI)) {
        const head = dataURI.slice(0, dataURI.indexOf(','));
        const b64 = dataURI.slice(dataURI.indexOf(',') + 1);
        const mime = (head.match(/data:([^;]+)/) || [])[1] || 'image/png';
        window.__iosShareOrSaveImage(window.b64ToBlob(b64, mime), name);
      } else {
        fetch(dataURI).then(function (r) { return r.blob(); }).then(function (b) { window.__iosShareOrSaveImage(b, name); });
      }
      return;
    }
    const a = document.createElement('a');
    a.href = dataURI; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
  };

  // === STORYBOARD SHEET (gabung semua scene + prompt jadi 1 foto) ===
  window.loadImg = window.loadImg || function (src) {
    return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => rej(new Error('img load failed')); im.src = src; });
  };
  window.buildStoryboardSheet = async function (scenes, meta) {
    meta = meta || {};
    // Layout GRID VERTIKAL: foto atas + prompt bawah. Dipanggil PER KLIP (sedikit scene) → grid pendek & prompt jelas.
    const n = scenes.length;
    const cols = meta.cols || (n <= 4 ? Math.max(1, n) : n <= 8 ? 4 : n <= 15 ? 5 : n <= 24 ? 6 : 7);
    const pad = 40, gutter = 24, innerPad = 24, bannerH = 150;
    const cardW = 720, maxPhotoH = 1100; // kartu diperlebar (layout tetap horizontal) biar foto & teks besar
    const numSize = 40, titleSize = 46, metaSize = 36, promptSize = 44, lineH = 60; // font diperbesar semua — terutama prompt biar terbaca besar
    const innerW = cardW - innerPad * 2;
    const W = pad * 2 + cols * cardW + (cols - 1) * gutter;
    const font = (s, w) => `${w ? w + ' ' : ''}${s}px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
    const mc = document.createElement('canvas').getContext('2d');
    function wrap(text, maxW, size, weight) {
      mc.font = font(size, weight);
      const words = String(text || '').split(/\s+/);
      const lines = []; let line = '';
      for (const w of words) {
        const test = line ? line + ' ' + w : w;
        if (mc.measureText(test).width > maxW && line) { lines.push(line); line = w; }
        else line = test;
      }
      if (line) lines.push(line);
      return lines.length ? lines : [''];
    }
    function rr(ctx, x, y, w, h, r) {
      ctx.beginPath();
      if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); return; }
      ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }
    const imgs = await Promise.all(scenes.map(s => s.img ? window.loadImg(s.img).catch(() => null) : Promise.resolve(null)));
    const cells = scenes.map((s, i) => {
      const im = imgs[i];
      const aspect = (im && im.naturalHeight) ? im.naturalWidth / im.naturalHeight : 16 / 9;
      let dw = innerW, dh = Math.round(innerW / aspect); // foto isi lebar kartu, tinggi ikut rasio asli (9:16 → tinggi)
      if (dh > maxPhotoH) { dh = maxPhotoH; dw = Math.round(maxPhotoH * aspect); }
      const promptLines = wrap(s.prompt, innerW, promptSize);
      const timingH = s.timing ? (metaSize + 10) : 0;
      return { im, dw, dh, promptLines, timingH };
    });
    const photoAreaH = Math.max(...cells.map(c => c.dh)); // area foto = foto tertinggi → kartu ikut rasio konten (potret/lanskap)
    cells.forEach(cm => { cm.h = innerPad + photoAreaH + 16 + (titleSize + 12) + cm.timingH + cm.promptLines.length * lineH + innerPad; });
    const rows = Math.ceil(n / cols);
    const rowH = [];
    for (let r = 0; r < rows; r++) {
      let mx = 0;
      for (let c = 0; c < cols; c++) { const i = r * cols + c; if (i < cells.length) mx = Math.max(mx, cells[i].h); }
      rowH.push(mx);
    }
    let totalH = bannerH + pad;
    rowH.forEach(h => totalH += h + gutter);
    totalH += pad - gutter;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = totalH;
    const ctx = cv.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#1b1830'; ctx.fillRect(0, 0, W, totalH);
    ctx.fillStyle = '#6d28d9'; ctx.fillRect(0, 0, W, bannerH);
    ctx.fillStyle = '#ffffff'; ctx.font = font(42, '800');
    ctx.fillText(meta.title || 'Storyboard', pad, 30);
    if (meta.sub) { ctx.font = font(23, '500'); ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fillText(meta.sub, pad, 84); }
    let y = bannerH + pad;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c; if (idx >= cells.length) continue;
        const cm = cells[idx], s = scenes[idx];
        const x = pad + c * (cardW + gutter);
        rr(ctx, x, y, cardW, rowH[r], 18); ctx.fillStyle = '#2a2640'; ctx.fill();
        const cx = x + innerPad; let cy = y + innerPad;
        const photoX = cx + Math.round((innerW - cm.dw) / 2);
        if (cm.im) { ctx.save(); rr(ctx, photoX, cy, cm.dw, cm.dh, 12); ctx.clip(); ctx.drawImage(cm.im, photoX, cy, cm.dw, cm.dh); ctx.restore(); }
        else { ctx.fillStyle = '#3a3550'; ctx.fillRect(photoX, cy, cm.dw, cm.dh); }
        rr(ctx, photoX + 8, cy + 8, 48, 42, 10); ctx.fillStyle = 'rgba(109,40,217,0.94)'; ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = font(numSize, '800'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String(s.num), photoX + 32, cy + 30);
        ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        cy += photoAreaH + 16;
        ctx.fillStyle = '#f3f4f6'; ctx.font = font(titleSize, '700');
        ctx.fillText(s.title || '', cx, cy); cy += titleSize + 12;
        if (s.timing) { ctx.fillStyle = '#06b6d4'; ctx.font = font(metaSize, '700'); ctx.fillText(s.timing, cx, cy); cy += metaSize + 10; }
        ctx.fillStyle = '#cbd5e1'; ctx.font = font(promptSize, '400');
        cm.promptLines.forEach(ln => { ctx.fillText(ln, cx, cy); cy += lineH; });
      }
      y += rowH[r] + gutter;
    }
    return cv.toDataURL('image/jpeg', 0.92);
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
  const LANG_LABEL = { id: 'Indonesian', en: 'English', ms: 'Malay' };
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
  window.INFLUENCER_COUNTRIES = ['indonesia', 'malaysia', 'thailand', 'vietnam', 'filipina', 'india', 'arab', 'korea', 'jepang', 'china', 'barat', 'afrika', 'latin'];
  window.FACE_VARIETY = {
    face: ['a soft oval face', 'a round friendly face', 'a slim heart-shaped face', 'a defined angular face with a gentle jawline', 'a gracefully square face'],
    hairFemale: ['long straight black hair', 'shoulder-length wavy hair', 'a neat low bun', 'a high ponytail', 'short chic bob hair', 'long natural curly hair', 'long hair with soft curtain bangs'],
    hairMale: ['short neat hair', 'a modern textured crop haircut', 'medium side-parted hair', 'a clean short undercut hairstyle', 'slightly wavy medium-length hair'],
    feature: ['subtle dimples when smiling', 'a small beauty mark near the lip', 'naturally thick well-groomed eyebrows', 'a bright warm toothy smile', 'faint natural freckles across the nose', 'gentle monolid eyes with a warm gaze', 'expressive double-lidded eyes'],
    tone: ['a fair natural skin tone with minimal natural makeup', 'a warm tan skin tone with natural makeup', 'a medium golden skin tone with a fresh dewy look', 'a sun-kissed skin tone with an effortless natural look']
  };
  window.pickFaceVariety = function (c, rnd) {
    rnd = rnd || Math.random;
    const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
    const v = window.FACE_VARIETY;
    const out = { face: pick(v.face), feature: pick(v.feature), tone: pick(v.tone) };
    const hijabOn = c && c.gender !== 'pria' && c.hijab === 'hijab';
    if (!hijabOn) out.hair = pick(c && c.gender === 'pria' ? v.hairMale : v.hairFemale);
    return out;
  };
  window.buildModelPrompt = function (c) {
    c = c || {};
    const age = { remaja: 'late-teenage', '20an': 'mid-20s', '30an': 'mid-30s', '40plus': 'mid-40s' }[c.usia] || 'mid-20s';
    const look = { indonesia: 'Indonesian', malaysia: 'Malaysian Malay', thailand: 'Thai', vietnam: 'Vietnamese', filipina: 'Filipino', india: 'Indian', arab: 'Middle Eastern Arab', korea: 'Korean', jepang: 'Japanese', china: 'Chinese', barat: 'Western Caucasian', afrika: 'African', latin: 'Latin American', asia: 'East Asian' }[c.look] || 'Indonesian';
    const person = c.gender === 'pria' ? 'man' : 'woman';
    const veil = (c.gender !== 'pria' && c.hijab === 'hijab') ? ', wearing a neat modern hijab' : '';
    const v = c.variety;
    const variety = v ? `, with ${v.face}${v.hair ? ', ' + v.hair : ''}, ${v.feature}, ${v.tone}` : '';
    return `Photorealistic half-body studio portrait photo of a ${age} ${look} ${person}${veil}${variety}, facing the camera with a natural friendly smile, plain light neutral studio background, soft diffused lighting, sharp focus on the face, natural skin texture, high detail, suitable as a model reference photo. No text, no watermark.`;
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
  window.productDB = {
    _open() {
      return new Promise((res, rej) => {
        const rq = indexedDB.open('ssp_products', 1);
        rq.onupgradeneeded = () => rq.result.createObjectStore('products', { keyPath: 'id' });
        rq.onsuccess = () => res(rq.result);
        rq.onerror = () => rej(rq.error);
      });
    },
    async put(rec) {
      const db = await this._open();
      return new Promise((res, rej) => {
        const tx = db.transaction('products', 'readwrite');
        tx.objectStore('products').put(rec);
        tx.oncomplete = () => { document.dispatchEvent(new CustomEvent('ssp-products-changed')); res(); };
        tx.onerror = () => rej(tx.error);
      });
    },
    async list() {
      const db = await this._open();
      return new Promise((res, rej) => {
        const rq = db.transaction('products', 'readonly').objectStore('products').getAll();
        rq.onsuccess = () => res((rq.result || []).sort((a, b) => b.id.localeCompare(a.id)));
        rq.onerror = () => rej(rq.error);
      });
    },
    async remove(id) {
      const db = await this._open();
      return new Promise((res, rej) => {
        const tx = db.transaction('products', 'readwrite');
        tx.objectStore('products').delete(id);
        tx.oncomplete = () => { document.dispatchEvent(new CustomEvent('ssp-products-changed')); res(); };
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
        '<button type="button" data-no class="btn-secondary font-semibold py-2 px-5 rounded-lg text-sm">' + t('btn.cancel') + '</button>' +
        `<button type="button" data-yes class="font-semibold py-2 px-5 rounded-lg text-sm" style="background:#dc2626;color:#fff;">${labelYa || t('btn.delete')}</button>`);
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
    genBtn.insertAdjacentHTML('beforebegin', window.naturalToggleHTML('influencer-natural'));
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
      const c = currentCfg();
      if (c.look === 'acak') c.look = window.INFLUENCER_COUNTRIES[Math.floor(Math.random() * window.INFLUENCER_COUNTRIES.length)];
      c.variety = window.pickFaceVariety(c);
      const prompt = window.buildModelPrompt(c) + window.naturalHint('influencer-natural');
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
        window.uiNotify(t('warn.file-unreadable'));
      }
    });

    saveBtn.addEventListener('click', async () => {
      const name = nameInput.value.trim();
      if (!name) { window.uiNotify(t('warn.model-name-required')); nameInput.focus(); return; }
      if (!currentB64) return;
      let existing = [];
      try { existing = await window.modelDB.list(); } catch (err) {}
      if (existing.length >= 5) { window.uiNotify(t('warn.library-full')); return; }
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
        window.uiNotify(t('warn.storage-unavailable'));
      }
    });

    async function renderLibrary() {
      let list = [];
      try { list = await window.modelDB.list(); }
      catch (err) { console.error('modelDB list failed:', err); libGrid.innerHTML = '<p class="text-sm text-gray-400 col-span-full">' + t('warn.storage-short') + '</p>'; return; }
      libCount.textContent = `${list.length}/5 model`;
      if (!list.length) { libGrid.innerHTML = '<p class="text-sm text-gray-400 col-span-full">' + t('lib.empty') + '</p>'; return; }
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
              <button type="button" data-dl class="flex-1 btn-secondary text-xs font-semibold py-1.5 rounded-lg text-center"><i class="fas fa-download pointer-events-none"></i></button>
              <button type="button" data-del="${m.id}" class="flex-1 text-xs font-semibold py-1.5 rounded-lg" style="color:#dc2626;border:1px solid rgba(220,38,38,.3);"><i class="fas fa-trash pointer-events-none"></i></button>
            </div>
          </div>`;
        card.querySelector('[data-dl]').addEventListener('click', () => {
          const fn = `model_${m.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
          if (window.__isIOS && window.__isIOS()) { window.__iosShareOrSaveImage(m.blob, fn); return; }
          const a = document.createElement('a');
          a.href = objUrl; a.download = fn;
          document.body.appendChild(a); a.click(); a.remove();
        });
        card.querySelector('[data-del]').addEventListener('click', async (e) => {
          const delBtn = e.currentTarget;
          if (!(await window.uiConfirm(t('confirm.delete-model').replace('%N', m.name)))) return;
          delBtn.disabled = true;
          if (m.cloud === true && window.modelCloud) {
            const ok = await window.modelCloud.del(m.id);
            if (!ok) {
              delBtn.disabled = false;
              window.uiNotify(t('err.delete-server'));
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
    generateBtn.insertAdjacentHTML('beforebegin', window.naturalToggleHTML(`${p}-natural`));

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
      continueBtn.innerHTML = `<div class="loader"></div><span class="ml-2">${t('loading.continue')}</span>`;
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
        window.uiNotify(t('err.continue-story') + err.message);
      } finally {
        continueBtn.disabled = false;
        continueBtn.innerHTML = orig;
        updateContinueBtn();
      }
    });

    // Tombol "Semua Prompt Video" di samping Unduh Semua (dibuat dinamis)
    // Gaya audio + bahasa untuk prompt video (global per fitur)
    let audioStyle = cfg.defaultAudio || 'voiceover';
    let audioLang = getLang();
    let audioLangManual = false;
    let videoAllBtn = null, audioStyleSel = null, audioLangBtn = null, captionBtn = null;
    if (downloadAllBtn && downloadAllBtn.parentNode) {
      const wrap = document.createElement('div');
      wrap.className = 'flex items-center gap-2';
      downloadAllBtn.parentNode.insertBefore(wrap, downloadAllBtn);
      videoAllBtn = document.createElement('button');
      videoAllBtn.type = 'button';
      videoAllBtn.className = 'btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden';
      videoAllBtn.innerHTML = '<i class="fas fa-film mr-1"></i><span data-i18n="btn.all-video-prompt">Semua Prompt Video</span>';
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
      audioStyleSel.innerHTML = '<option value="ugc">🎤 Model bicara ke kamera (UGC)</option><option value="ugc_music">🎤🎶 Model bicara + musik</option><option value="voiceover">🗣️ Voiceover narasi (model diam)</option><option value="asmr">🔊 ASMR + musik</option><option value="cinematic">🎬 Sinematik musik</option><option value="timelapse">⏩ Timelapse (tanpa narasi)</option>';
      audioStyleSel.value = audioStyle;
      audioStyleSel.addEventListener('change', () => { audioStyle = audioStyleSel.value; });

      audioLangBtn = document.createElement('button');
      audioLangBtn.type = 'button';
      audioLangBtn.id = `${p}-audio-lang`;
      audioLangBtn.className = 'btn-secondary text-sm font-semibold py-2 px-3 rounded-lg hidden';
      const renderLang = () => { audioLangBtn.innerHTML = `<i class="fas fa-language mr-1"></i>${audioLang.toUpperCase()}`; };
      renderLang();
      audioLangBtn.addEventListener('click', () => { audioLang = audioLang === 'id' ? 'en' : audioLang === 'en' ? 'ms' : 'id'; audioLangManual = true; renderLang(); });
      document.addEventListener('ssp-lang-changed', () => { if (!audioLangManual) { audioLang = getLang(); renderLang(); } });

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
      const sheetBtn = document.createElement('button');
      sheetBtn.type = 'button';
      sheetBtn.id = `${p}-sheet-btn`;
      sheetBtn.className = 'btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden';
      sheetBtn.innerHTML = '<i class="fas fa-images mr-1"></i><span data-i18n="btn.sheet">Ekspor Storyboard</span>';
      sheetBtn.addEventListener('click', exportStoryboardSheet);
      wrap.appendChild(sheetBtn);
      const syncSheet = () => sheetBtn.classList.toggle('hidden', downloadAllBtn.classList.contains('hidden'));
      new MutationObserver(syncSheet).observe(downloadAllBtn, { attributes: true, attributeFilter: ['class'] });
      syncSheet();
      wrap.appendChild(downloadAllBtn);
    }

    let selectedCount = 4;
    let images = [];
    let modelBase64 = null, modelMime = null;

    async function exportStoryboardSheet(onlyClip) {
      const allCards = Array.from(grid.querySelectorAll('.result-card')).filter(c => c.querySelector('img'));
      if (!allCards.length) { window.uiNotify(t('warn.no-scene-sheet')); return; }
      const btn = document.getElementById(`${p}-sheet-btn`);
      const fmt = audioStyleSel ? audioStyleSel.options[audioStyleSel.selectedIndex].text : '';
      // Bikin 1 gambar untuk sekelompok kartu (1 klip). startIdx = indeks scene global untuk penomoran & timing.
      async function makeSheet(cards, startIdx, clipLabel, cols) {
        const plan = durState.on ? window.clipPlan(durState.platform, durState.duration) : null;
        const persec = plan && plan.perClip ? plan.clipSec / plan.perClip : 0;
        // Teks yang ditempel = PROMPT VIDEO per scene (ikut format audio terpilih), digenerate dulu → SAMA dgn hasil realtime. Fallback ke prompt gambar bila gagal.
        const vps = await Promise.all(cards.map(c => requestVideoPrompt(c).then(r => r.vp).catch(() => c.dataset.prompt || '')));
        const scenes = cards.map((c, j) => {
          const gi = startIdx + j;
          const timing = plan ? `${Math.round(j * persec)}-${Math.round((j + 1) * persec)}s` : '';
          return { num: gi + 1, title: c.dataset.title || `Scene ${gi + 1}`, timing, prompt: vps[j], img: c.querySelector('img').src };
        });
        const sub = [clipLabel, plan ? `${plan.clipSec} dtk` : '', `${scenes.length} scene`, fmt ? `Format: ${fmt}` : ''].filter(Boolean).join('  ·  ');
        return window.buildStoryboardSheet(scenes, { title: cfg.sheetTitle || 'Storyboard', sub, cols });
      }
      async function runJobs(jobs) {
        const orig = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = '<div class="loader"></div><span class="ml-2">' + t('loading.sheet') + '</span>'; }
        try {
          for (const j of jobs) {
            const url = await makeSheet(j.cards, j.startIdx, j.label, j.cols);
            window.downloadDataURINew(url, j.fname);
            await new Promise(r => setTimeout(r, 400)); // jeda antar unduhan biar tidak diblokir browser
          }
        } catch (err) { console.error(err); window.uiNotify(t('err.sheet') + err.message); }
        finally { if (btn) { btn.disabled = false; btn.innerHTML = orig; } }
      }
      if (durState.on) {
        const plan = window.clipPlan(durState.platform, durState.duration);
        const totalClips = Math.ceil(allCards.length / plan.perClip);
        const jobFor = (k) => {
          const s = (k - 1) * plan.perClip;
          const cards = allCards.slice(s, s + plan.perClip);
          return { cards, startIdx: s, label: `Klip ${k}/${totalClips}`, fname: `${cfg.filenamePrefix}_klip${k}.jpg`, cols: cards.length };
        };
        if (onlyClip) { runJobs([jobFor(onlyClip)]); return; } // dipanggil dari tombol di bar klip → langsung 1 gambar klip itu
        if (totalClips <= 1) { runJobs([jobFor(1)]); return; }
        const choices = [{ label: `<i class="fas fa-images mr-2"></i>Semua klip (${totalClips} gambar)`, onPick: () => runJobs(Array.from({ length: totalClips }, (_, i) => jobFor(i + 1))) }];
        for (let k = 1; k <= totalClips; k++) {
          const jb = jobFor(k);
          choices.push({ label: `<i class="fas fa-clapperboard mr-2"></i>Klip ${k} — Scene ${jb.startIdx + 1}–${jb.startIdx + jb.cards.length}`, onPick: () => runJobs([jb]) });
        }
        showChoiceModal('Storyboard klip yang mana?', choices);
      } else {
        runJobs([{ cards: allCards, startIdx: 0, label: '', fname: `${cfg.filenamePrefix}_storyboard.jpg`, cols: undefined }]);
      }
    }

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
    modeWrap.innerHTML = `<button type="button" data-mode="duration" class="theme-chip selected"><i class="fas fa-film mr-1"></i><span data-i18n="mode.duration">Durasi Video</span></button><button type="button" data-mode="count" class="theme-chip"><i class="fas fa-images mr-1"></i><span data-i18n="mode.count">Jumlah Foto</span></button>`;
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
        <div class="text-xs font-semibold text-gray-500 mb-1">${t('dur.platform')}</div>
        <div class="flex flex-wrap gap-2 mb-3">${Object.entries(window.VIDEO_PLATFORMS).map(([k, v]) => `<button type="button" data-platform="${k}" class="theme-chip ${k === durState.platform ? 'selected' : ''}">${v.label} — ${v.clipSec} ${t('unit.sec-per-clip')}</button>`).join('')}</div>
        <div class="text-xs font-semibold text-gray-500 mb-1">${t('dur.story-duration')}</div>
        <div class="flex flex-wrap gap-2 mb-3">${opts.map(s => `<button type="button" data-duration="${s}" class="theme-chip ${s === durState.duration ? 'selected' : ''}">${s} ${t('unit.sec')}</button>`).join('')}</div>
        <p class="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-lg p-2" data-clip-info><i class="fas fa-info-circle mr-1"></i>= ${plan.photos} ${t('unit.photos')} · ${plan.clips} ${t('unit.clips')} × ${plan.perClip} ${t('unit.photos')} (${plan.clipSec} ${t('unit.sec-per-clip')})</p>`;
    }
    renderDurPanel();
    document.addEventListener('ssp-lang-changed', renderDurPanel);
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
      return `<div class="text-center p-3"><p class="text-xs text-red-500 mb-2">${t('msg.scene-failed')}</p><button data-action="${p}-regenerate" data-scene-id="${id}" class="action-btn bg-fuchsia-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>${t('btn.retry')}</button></div>`;
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
      libBtn.innerHTML = '<i class="fas fa-user-astronaut mr-1"></i><span data-i18n="btn.pick-model-library">Pilih dari Pustaka Model</span>';
      modelPreviewContainer.insertAdjacentElement('afterend', libBtn);
      libBtn.addEventListener('click', async () => {
        let list = [];
        try { list = await window.modelDB.list(); } catch (err) { console.error(err); }
        if (!list.length) { window.uiNotify(t('warn.no-models')); return; }
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
          h.innerHTML = `<span><i class="fas fa-clapperboard mr-1"></i>Klip ${clipIdx} — Scene ${gi + 1}–${end} · ${plan.clipSec} dtk</span><span class="flex items-center gap-2"><button type="button" data-action="${p}-clip-download" data-clip="${clipIdx}" class="action-btn bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-download mr-1 pointer-events-none"></i>Unduh</button><button type="button" data-action="${p}-clip-prompt" data-clip="${clipIdx}" class="action-btn bg-fuchsia-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-film mr-1 pointer-events-none"></i>Prompt Klip</button><button type="button" data-action="${p}-clip-sheet" data-clip="${clipIdx}" class="action-btn bg-violet-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-images mr-1 pointer-events-none"></i>Storyboard</button></span>`;
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
          const finalPrompt = cfg.imageSuffix(!!modelBase64, prompt) + window.naturalHint(`${p}-natural`);
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
              <button data-action="${p}-regenerate" data-scene-id="${id}" class="action-btn bg-green-500 text-white px-3 py-2 rounded-lg" title="${t('title.regenerate')}"><i class="fas fa-sync-alt pointer-events-none"></i></button>
              <button data-action="${p}-editprompt" data-scene-id="${id}" class="action-btn bg-amber-500 text-white px-3 py-2 rounded-lg" title="${t('title.editprompt')}"><i class="fas fa-pen pointer-events-none"></i></button>
              <button data-action="${p}-video" data-scene-id="${id}" class="action-btn bg-fuchsia-500 text-white px-3 py-2 rounded-lg" title="${t('title.video')}"><i class="fas fa-film pointer-events-none"></i></button>
              <button data-action="${p}-download" data-scene-id="${id}" data-filename="${cfg.filenamePrefix}_${id}_${safe}.png" class="action-btn bg-cyan-600 text-white px-3 py-2 rounded-lg" title="${t('title.download')}"><i class="fas fa-download pointer-events-none"></i></button>
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
      if (cfg.requireModel && !modelBase64) { window.uiNotify(t('warn.model-required')); return; }
      generateBtn.disabled = true;
      hideContinueBtn();
      const orig = generateBtn.innerHTML;
      generateBtn.innerHTML = '<div class="loader"></div><span class="ml-2">Menganalisa...</span>';
      downloadAllBtn.classList.add('hidden');
      if (videoAllBtn) videoAllBtn.classList.add('hidden');
      if (captionBtn) captionBtn.classList.add('hidden');
      if (audioStyleSel) audioStyleSel.classList.add('hidden');
      if (audioLangBtn) audioLangBtn.classList.add('hidden');
      grid.innerHTML = `<div class="col-span-full text-center py-10"><div class="loader inline-block"></div><p class="mt-4 text-gray-500">${window.__dynT(cfg.analyzingMsg)}</p></div>`;
      let ideas;
      try { ideas = await analyzeAndGetPrompts(); }
      catch (err) {
        console.error(err);
        grid.innerHTML = `<div class="col-span-full text-center py-10 text-red-500">Terjadi kesalahan: ${window.escHtml(err.message)}</div>`;
        generateBtn.disabled = false; generateBtn.innerHTML = orig; return;
      }
      generateBtn.innerHTML = `<div class="loader"></div><span class="ml-2">${t('loading.visual')}</span>`;
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
      if (success === 0) window.uiNotify(t('warn.google-limit'));
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
      if (btn.dataset.action === `${p}-clip-sheet`) {
        exportStoryboardSheet(parseInt(btn.dataset.clip, 10));
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
        <div class="flex items-center justify-between mb-3"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-pen text-amber-500 mr-2"></i>${t('modal.edit-prompt-title')}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-2">${t('edit.hint')}</p>
        <textarea data-editp rows="7" class="w-full p-3 border-2 border-gray-200 rounded-lg text-sm font-mono resize-none focus:border-violet-500 transition">${window.escHtml(card.dataset.prompt || '')}</textarea>
        <div class="flex gap-2 mt-4"><button data-save class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-floppy-disk mr-1"></i>${t('btn.save')}</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm">${t('btn.cancel')}</button></div>
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
      const loadingHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-4 text-gray-800"><i class="fas fa-hashtag text-cyan-500 mr-2"></i>${t('loading.caption')}</h3><div class="flex items-center justify-center py-8"><div class="loader"></div></div></div>`;
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
              <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">${window.escHtml(s.label)}</span><button data-copyone="${i}" class="text-xs bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button></div>
              <textarea data-cap="${i}" rows="${s.key === 'hashtag' ? 3 : 5}" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm resize-none">${window.escHtml(s.body)}</textarea>
            </div>`).join('');
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
            <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-hashtag text-cyan-500 mr-2"></i>${t('modal.caption-title')}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
            ${blocks}
            <div class="flex gap-2">
              <button data-copyall class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}</button>
              <button data-txt class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-download mr-1"></i>${t('btn.download-txt')}</button>
            </div>
          </div>`;
          modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
          modal.querySelectorAll('[data-copyone]').forEach(btn => btn.addEventListener('click', () => {
            const ta = modal.querySelector(`[data-cap="${btn.dataset.copyone}"]`);
            const ok = window.copyText(ta.value);
            if (!ok) { ta.focus(); ta.select(); }
            btn.innerHTML = ok ? `<i class="fas fa-check mr-1 pointer-events-none"></i>${t('msg.copied')}` : `<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>${t('msg.press-ctrl-c')}`;
            setTimeout(() => { btn.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 2000);
          }));
          const aggregate = () => parts.map(s => `# ${s.label}\n${s.body}`).join('\n\n');
          const copyAllBtn = modal.querySelector('[data-copyall]');
          copyAllBtn.addEventListener('click', () => {
            const ok = window.copyText(aggregate());
            copyAllBtn.innerHTML = ok ? `<i class="fas fa-check mr-1"></i>${t('msg.copied')}` : `<i class="fas fa-download mr-1"></i>${t('msg.use-download-txt')}`;
            setTimeout(() => { copyAllBtn.innerHTML = `<i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}`; }, 2200);
          });
          modal.querySelector('[data-txt]').addEventListener('click', () => {
            const b = new Blob([aggregate()], { type: 'text/plain' });
            const u = URL.createObjectURL(b);
            window.downloadDataURINew(u, `${cfg.filenamePrefix}_caption.txt`);
            setTimeout(() => URL.revokeObjectURL(u), 1500);
          });
        } catch (err) {
          console.error('caption error', err);
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-3 text-red-600"><i class="fas fa-triangle-exclamation mr-2"></i>Gagal membuat caption</h3><p class="text-gray-700 text-sm mb-4">${window.escHtml(err.message)}</p><div class="flex gap-2"><button data-retry class="flex-1 btn-primary py-2 rounded-lg font-semibold"><i class="fas fa-rotate-right mr-1"></i>Coba Lagi</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold">${t('modal.close')}</button></div></div>`;
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
      const loadingHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-4 text-gray-800"><i class="fas fa-clapperboard text-fuchsia-500 mr-2"></i>${t('loading.clip-prompt')} ${clipIdx}...</h3><div class="flex items-center justify-center py-8"><div class="loader"></div></div></div>`;
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
            <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-clapperboard text-fuchsia-500 mr-2"></i>${t('vp.clip-title-prefix')} ${clipIdx} (${cards.length} ${t('unit.photos')} · ${plan.clipSec} ${t('unit.sec')})</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
            <div class="flex gap-2 mb-3 overflow-x-auto">${thumbs}</div>
            <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-3">
              <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">${t('vp.one-clip-prompt')} (${cards.length} ${t('unit.keyframe')}):</span><button data-copy class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button></div>
              <textarea data-prompt rows="9" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm font-mono resize-none">${window.escHtml(vp)}</textarea>
            </div>
            <p class="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-lg p-3 mb-3"><i class="fas fa-info-circle mr-1"></i>${t('clip.howto').replace('%C', cards.length).replace('%P', window.VIDEO_PLATFORMS[durState.platform].label).replace('%S', plan.clipSec)}</p>
            <button data-close class="w-full btn-secondary py-2 rounded-lg font-semibold">${t('modal.close')}</button>
          </div>`;
          modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
          const copyBtn = modal.querySelector('[data-copy]'), ta = modal.querySelector('[data-prompt]');
          copyBtn.addEventListener('click', () => {
            const ok = window.copyText(ta.value);
            if (!ok) { ta.focus(); ta.select(); }
            copyBtn.innerHTML = ok ? `<i class="fas fa-check mr-1 pointer-events-none"></i>${t('msg.copied')}` : `<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>${t('msg.press-ctrl-c')}`;
            setTimeout(() => { copyBtn.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 2000);
          });
        } catch (err) {
          console.error('clip prompt error', err);
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-3 text-red-600"><i class="fas fa-triangle-exclamation mr-2"></i>Gagal membuat prompt klip</h3><p class="text-gray-700 text-sm mb-4">${window.escHtml(err.message)}</p><div class="flex gap-2"><button data-retry class="flex-1 btn-primary py-2 rounded-lg font-semibold"><i class="fas fa-rotate-right mr-1"></i>Coba Lagi</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold">${t('modal.close')}</button></div></div>`;
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
      const loadingHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-4 text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>${t('loading.video-prompt')}</h3><div class="flex items-center justify-center py-8"><div class="loader"></div></div></div>`;
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
          <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>${t('vp.title-prefix')} ${sceneNum}/${total}: ${window.escHtml(title)}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
          <img src="${imageUrl}" class="w-full rounded-lg mb-3 max-h-56 object-contain bg-gray-100">
          <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-3">
            <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">${t('vp.section-label')} (Scene ${sceneNum}/${total}):</span><button data-copy class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button></div>
            <textarea data-prompt rows="8" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm font-mono resize-none">${window.escHtml(vp)}</textarea>
          </div>
          <p class="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-lg p-3 mb-3"><i class="fas fa-info-circle mr-1"></i>${t('vp.tips')}</p>
          <button data-close class="w-full btn-secondary py-2 rounded-lg font-semibold">${t('modal.close')}</button>
        </div>`;
        modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
        const copyBtn = modal.querySelector('[data-copy]'), ta = modal.querySelector('[data-prompt]');
        copyBtn.addEventListener('click', () => {
          const ok = window.copyText(ta.value);
          if (!ok) { ta.focus(); ta.select(); }
          copyBtn.innerHTML = ok ? `<i class="fas fa-check mr-1 pointer-events-none"></i>${t('msg.copied')}` : `<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>${t('msg.press-ctrl-c')}`;
          setTimeout(() => { copyBtn.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 2000);
        });
        } catch (err) {
          console.error('video prompt error', err);
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-3 text-red-600"><i class="fas fa-triangle-exclamation mr-2"></i>${t('modal.fail-prompt')}</h3><p class="text-gray-700 text-sm mb-4">${window.escHtml(err.message)}</p><div class="flex gap-2"><button data-retry class="flex-1 btn-primary py-2 rounded-lg font-semibold"><i class="fas fa-rotate-right mr-1"></i>Coba Lagi</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold">${t('modal.close')}</button></div></div>`;
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
        <div class="flex items-center justify-between mb-2"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>${clipIdx ? `${t('vp.per-scene')} — ${t('unit.clip-title')} ${clipIdx}` : t('btn.all-video-prompt')} (${total} scene)</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-3" data-progress>${t('progress.preparing')} 0/${total}...</p>
        <div data-list class="space-y-3"></div>
        <div class="flex gap-2 mt-4">
          <button data-copyall class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}</button>
          <button data-txt class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-download mr-1"></i>${t('btn.download-txt')}</button>
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
        progressEl.textContent = `${t('progress.done')} ${done}/${total} ${t('unit.prompt')}`;
        copyAll.classList.toggle('hidden', done === 0);
        txtBtn.classList.toggle('hidden', done === 0);
      }
      copyAll.addEventListener('click', () => {
        const ok = window.copyText(aggregateText());
        copyAll.innerHTML = ok ? `<i class="fas fa-check mr-1"></i>${t('msg.copied')}` : `<i class="fas fa-download mr-1"></i>${t('msg.use-download-txt')}`;
        setTimeout(() => { copyAll.innerHTML = `<i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}`; }, 2200);
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
        block.innerHTML = `<div class="flex items-center justify-between mb-1"><span class="text-sm font-semibold text-gray-700">Scene ${sceneNo(card)}/${sceneTotal}: ${window.escHtml(title)}</span><span class="flex items-center gap-2"><button data-copyone class="text-xs bg-violet-500 hover:bg-violet-600 text-white px-2 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button><button data-retry class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-2 py-1 rounded-full hidden"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>Coba Lagi</button><span data-st><span class="loader !w-4 !h-4 !border-2 inline-block"></span></span></span></div><textarea rows="5" readonly class="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 text-xs font-mono resize-none" data-ta></textarea>`;
        listEl.appendChild(block);
        const ta = block.querySelector('[data-ta]'), st = block.querySelector('[data-st]'), retryBtn = block.querySelector('[data-retry]');
        const copyOne = block.querySelector('[data-copyone]');
        copyOne.addEventListener('click', () => {
          const ok = window.copyText(ta.value);
          copyOne.innerHTML = ok ? '<i class="fas fa-check mr-1 pointer-events-none"></i>OK' : '<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>Ctrl+C';
          setTimeout(() => { copyOne.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 1800);
        });
        retryBtn.addEventListener('click', () => runBlock(i, card, ta, st, retryBtn));
        progressEl.textContent = `${t('progress.preparing')} ${i + 1}/${total}...`;
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
        <div class="flex items-center justify-between mb-2"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-clapperboard text-fuchsia-500 mr-2"></i>${t('vp.all-clip-prompts')} (${totalClips} ${t('unit.clips')} · ${plan.clipSec} ${t('unit.sec-per-clip')})</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-3" data-progress>${t('progress.preparing')} 0/${totalClips}...</p>
        <div data-list class="space-y-3"></div>
        <div class="flex gap-2 mt-4">
          <button data-copyall class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}</button>
          <button data-txt class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-download mr-1"></i>${t('btn.download-txt')}</button>
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
        progressEl.textContent = `${t('progress.done')} ${done}/${totalClips} ${t('unit.prompt')} ${t('unit.clip')}`;
        copyAll.classList.toggle('hidden', done === 0);
        txtBtn.classList.toggle('hidden', done === 0);
      }
      copyAll.addEventListener('click', () => {
        const ok = window.copyText(aggregateText());
        copyAll.innerHTML = ok ? `<i class="fas fa-check mr-1"></i>${t('msg.copied')}` : `<i class="fas fa-download mr-1"></i>${t('msg.use-download-txt')}`;
        setTimeout(() => { copyAll.innerHTML = `<i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}`; }, 2200);
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
        block.innerHTML = `<div class="flex items-center justify-between mb-1"><span class="text-sm font-semibold text-gray-700">Klip ${i + 1}/${totalClips} — Scene ${i * plan.perClip + 1}–${Math.min((i + 1) * plan.perClip, all.length)}</span><span class="flex items-center gap-2"><button data-copyone class="text-xs bg-violet-500 hover:bg-violet-600 text-white px-2 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button><button data-retry class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-2 py-1 rounded-full hidden"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>Coba Lagi</button><span data-st><span class="loader !w-4 !h-4 !border-2 inline-block"></span></span></span></div><textarea rows="6" readonly class="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 text-xs font-mono resize-none" data-ta></textarea>`;
        listEl.appendChild(block);
        const ta = block.querySelector('[data-ta]'), st = block.querySelector('[data-st]'), retryBtn = block.querySelector('[data-retry]');
        const copyOne = block.querySelector('[data-copyone]');
        copyOne.addEventListener('click', () => {
          const ok = window.copyText(ta.value);
          copyOne.innerHTML = ok ? '<i class="fas fa-check mr-1 pointer-events-none"></i>OK' : '<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>Ctrl+C';
          setTimeout(() => { copyOne.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 1800);
        });
        retryBtn.addEventListener('click', () => runBlock(i, ta, st, retryBtn));
        progressEl.textContent = `${t('progress.preparing')} ${i + 1}/${totalClips}...`;
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
    sheetTitle: 'Storyboard — Review Produk',
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

  window.buildKidPediaPrompt = function (cfg, sel, { count, showcase: forcedShowcase }) {
    const subject = (sel['subjek spesifik'] || '').trim();
    const picks = Object.entries(sel)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    const showcase = forcedShowcase !== undefined ? forcedShowcase : (count > 5 ? 1 : 0);
    return `You are an expert children's educational storyboard artist. Create a **${count}-scene visual KIDS ENCYCLOPEDIA story** (storyboard) about ONE subject, documentary style for children aged 3-8, for a narrated short video.

**THE SUBJECT:** ${subject ? `${subject} (use EXACTLY this subject)` : `pick ONE popular, instantly recognizable, kid-friendly subject that fits the chosen category`}.
${picks ? `**USER CHOICES:** ${picks}. Honor these exactly in every scene.\n` : ''}
**SUBJECT DESIGN SHEET (DO THIS FIRST):** Before writing any scene, write ONE fixed reusable description of the subject: species/type, size impression, the exact colors of every part, its most distinctive features, plus ONE fixed rendering description of the chosen visual style and color palette. You will repeat BOTH descriptions word-for-word in every scene so separately generated images look like one continuous video.

**SUBJECT LOCK (CRITICAL):** The SAME single subject with the same design sheet and the same art style appears in ALL ${count} scenes. Backgrounds may change per chapter (habitat, feeding place) but the subject's design and the art style NEVER change.

**EDUCATIONAL CHAPTERS:** Spread these chapters evenly and strictly in this order across scenes 1–${count - showcase} (a chapter may span more than one scene, never go back to a finished chapter): ${cfg.arc}.

${showcase ? `**CLOSING RECAP:** the last ${showcase} scene(s) are a cheerful closing — the subject in its most iconic beautiful pose, warm goodbye mood, NO new educational chapters.
` : ''}

**CHILD-SAFE LOCK (CRITICAL):** bright cheerful colors, warm soft lighting, cute friendly expressions, wholesome mood in every scene. NEVER scary, dark, bloody, violent or distressing imagery; predators or dangers are NEVER shown hunting, fighting or gory.

**NARRATION LOCK (CRITICAL):** This is narrator-voiceover content. The subject NEVER talks — NO speech bubbles, NO open-mouth talking pose toward the camera, NO human presenter, NO lip-sync. The subject simply lives naturally while an unseen narrator explains.

**NO TEXT LOCK (CRITICAL):** absolutely NO written text, letters, numbers, labels, captions, subtitles, speech bubbles, logos or watermarks anywhere inside the image. Never put narration sentences, quotes or facts inside a scene prompt — anything written in the prompt as display text WILL get drawn into the image.

Art style: follow the chosen visual style described generically — NEVER name a real studio or franchise.

**STRUCTURE:** ${count} scenes in strict chapter order. For each scene provide a short Indonesian title (e.g. 'Scene 1: Kenalan dengan Gajah') and a CONCISE English prompt for an AI image generator that always repeats the locked subject design sheet + art style description word-for-word, states the chapter moment, and ends with this exact sentence: "Absolutely no text, no letters, no numbers, no words, no captions anywhere in the image."
Respond ONLY with a valid JSON array of ${count} objects with keys "title" and "prompt", in sequential story order.`;
  };

  window.buildLifeCyclePrompt = function (cfg, sel, { count, showcase: forcedShowcase }) {
    const picks = Object.entries(sel)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    const showcase = forcedShowcase !== undefined ? forcedShowcase : (count > 5 ? 1 : 0);
    return `You are an expert children's educational storyboard artist. Create a **${count}-scene visual LIFE CYCLE story** (storyboard) showing the scientifically CORRECT life cycle of ONE subject, documentary style for children aged 3-8, for a narrated short video.

**THE SUBJECT:** ${cfg.subject}.
${picks ? `**USER CHOICES:** ${picks}. Honor these exactly in every scene.\n` : ''}
**SUBJECT DESIGN SHEET (DO THIS FIRST):** Before writing any scene, fix ONE reusable description: the species identity, its signature color palette at every stage, ONE consistent natural habitat backdrop, and ONE rendering description of the chosen visual style. Repeat ALL of it word-for-word in every scene — the body SHAPE changes per stage, but the species identity, palette, habitat and art style NEVER change.

**STAGE LOCK (CRITICAL):** First determine the real scientific life-cycle stages of the subject (e.g. butterfly: egg → caterpillar → chrysalis → adult butterfly; frog: egg → tadpole → froglet → adult frog; bean plant: seed → sprout → seedling → mature plant with flowers/pods). Map the stages evenly across scenes 1–${count - showcase} in strict forward order — NEVER go backward, NEVER skip a stage then return, NEVER repeat a finished stage. Scene ${count - showcase} shows the fully mature adult/final form.${showcase ? `

**ADULT SHOWCASE:** the last ${showcase} scene(s) show the finished adult/final form being celebrated — beautiful proud poses in its habitat from new flattering angles, warm joyful mood, NO new life-cycle stages.` : ''}

**CHILD-SAFE LOCK (CRITICAL):** bright cheerful colors, warm soft lighting, cute friendly rendering, wholesome mood. NEVER scary, dark, bloody, violent or distressing imagery.

**NARRATION LOCK (CRITICAL):** narrator-voiceover content. The subject NEVER talks — NO speech bubbles, NO talking pose toward camera, NO human presenter, NO lip-sync.

**NO TEXT LOCK (CRITICAL):** absolutely NO written text, letters, numbers, labels, captions, subtitles, speech bubbles, logos or watermarks anywhere inside the image. Never put narration sentences, quotes or facts inside a scene prompt — anything written in the prompt as display text WILL get drawn into the image.

Art style: follow the chosen visual style described generically — NEVER name a real studio or franchise.

**STRUCTURE:** ${count} scenes in strict stage order. For each scene provide a short Indonesian title (e.g. 'Scene 1: Telur di Daun') and a CONCISE English prompt for an AI image generator that always repeats the locked design sheet word-for-word, names the exact stage, and ends with this exact sentence: "Absolutely no text, no letters, no numbers, no words, no captions anywhere in the image."
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
        <div class="flex items-center gap-2 mb-3"><div class="step-num">${gi + 1 + extraOff}</div><h2 class="text-lg font-semibold text-gray-800" data-i18n-dyn>${g.label}</h2></div>
        <div id="${p}-group-${g.key}" data-group="${g.key}" class="grid gap-2 p-2 border-2 border-gray-100 rounded-xl" style="grid-template-columns:repeat(auto-fill,minmax(110px,1fr));">
          <button type="button" data-val="__random__" class="theme-chip selected"><i class="fas fa-dice"></i>Kejutkan aku</button>
          ${g.options.map(o => `<button type="button" data-val="${window.escHtml(o)}" class="theme-chip">${window.escHtml(o)}</button>`).join('')}
          <button type="button" data-val="__custom__" class="theme-chip"><i class="fas fa-pen"></i>Custom</button>
        </div>
        <input type="text" id="${p}-group-${g.key}-custom" class="hidden w-full mt-2 p-3 bg-white border-2 border-violet-300 rounded-xl text-sm focus:border-violet-500 transition" placeholder="${t('ph.group-custom').replace('%L', window.escHtml(g.label.toLowerCase()))}">
      </div>`).join('');

    const customHtml = cfg.custom ? `
      <div class="card p-6">
        <div class="flex items-center gap-2 mb-3"><div class="step-num">1</div><h2 class="text-lg font-semibold text-gray-800" data-i18n-dyn>Ceritakan proses viralmu</h2></div>
        <textarea id="${p}-custom-input" rows="4" class="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-violet-500 transition resize-none" data-i18n-dyn-ph placeholder="Contoh: sabun batangan diukir pelan-pelan jadi bentuk mawar, lalu dibungkus cantik untuk dijual"></textarea>
        <p class="text-xs text-gray-400 mt-2" data-i18n-dyn>Tulis dari awal sampai hasil akhir — AI yang memecah jadi scene.</p>
      </div>` : '';

    const extraHtml = cfg.extraInput ? `
      <div class="card p-6">
        <div class="flex items-center gap-2 mb-3"><div class="step-num">1</div><h2 class="text-lg font-semibold text-gray-800" data-i18n-dyn>${cfg.extraInput.label}</h2></div>
        <textarea id="${p}-extra-input" rows="3" class="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-violet-500 transition resize-none" data-i18n-dyn-ph placeholder="${window.escHtml(cfg.extraInput.placeholder || '')}"></textarea>
        ${cfg.extraInput.fromImage ? `
        <input type="file" id="${p}-extra-image-input" accept="image/*" class="hidden">
        <button type="button" id="${p}-extra-image-btn" class="btn-secondary text-sm font-semibold py-2 px-4 rounded-lg mt-2 w-full flex items-center justify-center"><i class="fas fa-camera mr-2"></i><span data-i18n-dyn>${window.escHtml(cfg.extraInput.imageBtnLabel || 'Ambil ciri dari Foto (kartun/manusia — hasil tetap boneka)')}</span></button>` : ''}
        <p class="text-xs text-gray-400 mt-2" data-i18n-dyn>Opsional — kosongkan biar AI berkreasi dari pilihan chip.</p>
      </div>` : '';

    const baseStep = (cfg.custom ? 1 : 0) + extraOff + (cfg.chipGroups ? cfg.chipGroups.length : 0);
    host.innerHTML = `
      <div class="container mx-auto p-4 md:p-8 max-w-7xl">
        <header class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold brand-gradient bg-clip-text text-transparent" data-i18n-dyn>${cfg.title}</h1>
          <p class="text-gray-500 mt-2" data-i18n-dyn>${cfg.subtitle}</p>
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
              <button id="${p}-download-all-btn" class="btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden"><i class="fas fa-download mr-1"></i><span data-i18n="btn.download-all">Unduh Semua</span></button>
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

    // "Kejutkan aku" = acak betulan di sisi klien, dikunci per cerita (pola currentSuasana)
    let resolvedRandom = {};
    function isRandomKey(key) {
      return document.querySelector(`#${p}-group-${key} .theme-chip.selected`)?.dataset.val === '__random__';
    }
    function rollRandomSel() {
      resolvedRandom = {};
      (cfg.chipGroups || []).forEach(g => {
        if (isRandomKey(g.key) && g.options.length) resolvedRandom[g.key] = g.options[Math.floor(Math.random() * g.options.length)];
      });
      if (cfg.onRoll) cfg.onRoll();
    }

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
          window.uiNotify(t('ok.features-extracted'));
        } catch (err) {
          window.uiNotify(t('err.read-photo') + err.message);
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
      continueBtn.innerHTML = `<div class="loader"></div><span class="ml-2">${t('loading.continue')}</span>`;
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
        window.uiNotify(t('err.continue-story') + err.message);
      } finally {
        continueBtn.disabled = false;
        continueBtn.innerHTML = orig;
        updateContinueBtn();
      }
    });

    // Konteks proses viral (pengganti descInput/currentTheme di mesin salinan)
    function fullSelection() {
      const base = { ...selection };
      (cfg.chipGroups || []).forEach(g => {
        if (isRandomKey(g.key) && resolvedRandom[g.key]) base[g.key] = resolvedRandom[g.key];
      });
      let out = base;
      if (cfg.extraInput) {
        const v = (document.getElementById(`${p}-extra-input`)?.value || '').trim();
        if (v) out = { ...base, [cfg.extraInput.key]: v };
      }
      return cfg.mapSelection ? cfg.mapSelection(out) : out;
    }
    function viralContext() {
      if (cfg.custom) return document.getElementById(`${p}-custom-input`).value.trim();
      const picks = Object.entries(fullSelection()).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(', ');
      return `${cfg.subject}${picks ? ' — ' + picks : ''}`;
    }
    function currentTheme() { return selection['gaya'] || selection['latar'] || ''; }

    // ---- Header output: audio + bahasa + Semua Prompt Video + Caption (salinan) ----
    let audioStyle = cfg.defaultAudio || 'voiceover';
    let audioLang = getLang();
    let audioLangManual = false;
    let videoAllBtn = null, audioStyleSel = null, audioLangBtn = null, captionBtn = null;
    if (downloadAllBtn && downloadAllBtn.parentNode) {
      const wrap = document.createElement('div');
      wrap.className = 'flex items-center gap-2';
      downloadAllBtn.parentNode.insertBefore(wrap, downloadAllBtn);
      videoAllBtn = document.createElement('button');
      videoAllBtn.type = 'button';
      videoAllBtn.className = 'btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden';
      videoAllBtn.innerHTML = '<i class="fas fa-film mr-1"></i><span data-i18n="btn.all-video-prompt">Semua Prompt Video</span>';
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
      audioStyleSel.innerHTML = '<option value="ugc">🎤 Model bicara ke kamera (UGC)</option><option value="ugc_music">🎤🎶 Model bicara + musik</option><option value="voiceover">🗣️ Voiceover narasi (model diam)</option><option value="asmr">🔊 ASMR + musik</option><option value="cinematic">🎬 Sinematik musik</option><option value="timelapse">⏩ Timelapse (tanpa narasi)</option>';
      audioStyleSel.value = audioStyle;
      audioStyleSel.addEventListener('change', () => { audioStyle = audioStyleSel.value; });

      audioLangBtn = document.createElement('button');
      audioLangBtn.type = 'button';
      audioLangBtn.id = `${p}-audio-lang`;
      audioLangBtn.className = 'btn-secondary text-sm font-semibold py-2 px-3 rounded-lg hidden';
      const renderLang = () => { audioLangBtn.innerHTML = `<i class="fas fa-language mr-1"></i>${audioLang.toUpperCase()}`; };
      renderLang();
      audioLangBtn.addEventListener('click', () => { audioLang = audioLang === 'id' ? 'en' : audioLang === 'en' ? 'ms' : 'id'; audioLangManual = true; renderLang(); });
      document.addEventListener('ssp-lang-changed', () => { if (!audioLangManual) { audioLang = getLang(); renderLang(); } });

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
      const sheetBtn = document.createElement('button');
      sheetBtn.type = 'button';
      sheetBtn.id = `${p}-sheet-btn`;
      sheetBtn.className = 'btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden';
      sheetBtn.innerHTML = '<i class="fas fa-images mr-1"></i><span data-i18n="btn.sheet">Ekspor Storyboard</span>';
      sheetBtn.addEventListener('click', exportStoryboardSheet);
      wrap.appendChild(sheetBtn);
      const syncSheet = () => sheetBtn.classList.toggle('hidden', downloadAllBtn.classList.contains('hidden'));
      new MutationObserver(syncSheet).observe(downloadAllBtn, { attributes: true, attributeFilter: ['class'] });
      syncSheet();
      wrap.appendChild(downloadAllBtn);
    }

    // ---- Mode Durasi Video (salinan) ----
    const durState = { on: true, platform: 'omni', duration: 10 };

    async function exportStoryboardSheet(onlyClip) {
      const allCards = Array.from(grid.querySelectorAll('.result-card')).filter(c => c.querySelector('img'));
      if (!allCards.length) { window.uiNotify(t('warn.no-scene-sheet')); return; }
      const btn = document.getElementById(`${p}-sheet-btn`);
      const fmt = audioStyleSel ? audioStyleSel.options[audioStyleSel.selectedIndex].text : '';
      async function makeSheet(cards, startIdx, clipLabel, cols) {
        const plan = durState.on ? window.clipPlan(durState.platform, durState.duration) : null;
        const persec = plan && plan.perClip ? plan.clipSec / plan.perClip : 0;
        // Teks yang ditempel = PROMPT VIDEO per scene (ikut format audio terpilih), digenerate dulu → SAMA dgn hasil realtime. Fallback ke prompt gambar bila gagal.
        const vps = await Promise.all(cards.map(c => requestVideoPrompt(c).then(r => r.vp).catch(() => c.dataset.prompt || '')));
        const scenes = cards.map((c, j) => {
          const gi = startIdx + j;
          const timing = plan ? `${Math.round(j * persec)}-${Math.round((j + 1) * persec)}s` : '';
          return { num: gi + 1, title: c.dataset.title || `Scene ${gi + 1}`, timing, prompt: vps[j], img: c.querySelector('img').src };
        });
        const sub = [clipLabel, plan ? `${plan.clipSec} dtk` : '', `${scenes.length} scene`, fmt ? `Format: ${fmt}` : ''].filter(Boolean).join('  ·  ');
        return window.buildStoryboardSheet(scenes, { title: cfg.sheetTitle || 'Storyboard', sub, cols });
      }
      async function runJobs(jobs) {
        const orig = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = '<div class="loader"></div><span class="ml-2">' + t('loading.sheet') + '</span>'; }
        try {
          for (const j of jobs) {
            const url = await makeSheet(j.cards, j.startIdx, j.label, j.cols);
            window.downloadDataURINew(url, j.fname);
            await new Promise(r => setTimeout(r, 400)); // jeda antar unduhan biar tidak diblokir browser
          }
        } catch (err) { console.error(err); window.uiNotify(t('err.sheet') + err.message); }
        finally { if (btn) { btn.disabled = false; btn.innerHTML = orig; } }
      }
      if (durState.on) {
        const plan = window.clipPlan(durState.platform, durState.duration);
        const totalClips = Math.ceil(allCards.length / plan.perClip);
        const jobFor = (k) => {
          const s = (k - 1) * plan.perClip;
          const cards = allCards.slice(s, s + plan.perClip);
          return { cards, startIdx: s, label: `Klip ${k}/${totalClips}`, fname: `${cfg.filenamePrefix}_klip${k}.jpg`, cols: cards.length };
        };
        if (onlyClip) { runJobs([jobFor(onlyClip)]); return; } // dipanggil dari tombol di bar klip → langsung 1 gambar klip itu
        if (totalClips <= 1) { runJobs([jobFor(1)]); return; }
        const choices = [{ label: `<i class="fas fa-images mr-2"></i>Semua klip (${totalClips} gambar)`, onPick: () => runJobs(Array.from({ length: totalClips }, (_, i) => jobFor(i + 1))) }];
        for (let k = 1; k <= totalClips; k++) {
          const jb = jobFor(k);
          choices.push({ label: `<i class="fas fa-clapperboard mr-2"></i>Klip ${k} — Scene ${jb.startIdx + 1}–${jb.startIdx + jb.cards.length}`, onPick: () => runJobs([jb]) });
        }
        showChoiceModal('Storyboard klip yang mana?', choices);
      } else {
        runJobs([{ cards: allCards, startIdx: 0, label: '', fname: `${cfg.filenamePrefix}_storyboard.jpg`, cols: undefined }]);
      }
    }
    const modeWrap = document.createElement('div');
    modeWrap.className = 'flex gap-2 mb-3';
    modeWrap.innerHTML = `<button type="button" data-mode="duration" class="theme-chip selected"><i class="fas fa-film mr-1"></i><span data-i18n="mode.duration">Durasi Video</span></button><button type="button" data-mode="count" class="theme-chip"><i class="fas fa-images mr-1"></i><span data-i18n="mode.count">Jumlah Foto</span></button>`;
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
        <div class="text-xs font-semibold text-gray-500 mb-1">${t('dur.platform')}</div>
        <div class="flex flex-wrap gap-2 mb-3">${Object.entries(window.VIDEO_PLATFORMS).map(([k, v]) => `<button type="button" data-platform="${k}" class="theme-chip ${k === durState.platform ? 'selected' : ''}">${v.label} — ${v.clipSec} ${t('unit.sec-per-clip')}</button>`).join('')}</div>
        <div class="text-xs font-semibold text-gray-500 mb-1">${t('dur.story-duration')}</div>
        <div class="flex flex-wrap gap-2 mb-3">${opts.map(s => `<button type="button" data-duration="${s}" class="theme-chip ${s === durState.duration ? 'selected' : ''}">${s} ${t('unit.sec')}</button>`).join('')}</div>
        <p class="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-lg p-2" data-clip-info><i class="fas fa-info-circle mr-1"></i>= ${plan.photos} ${t('unit.photos')} · ${plan.clips} ${t('unit.clips')} × ${plan.perClip} ${t('unit.photos')} (${plan.clipSec} ${t('unit.sec-per-clip')})</p>`;
    }
    renderDurPanel();
    document.addEventListener('ssp-lang-changed', renderDurPanel);
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
      return `<div class="text-center p-3"><p class="text-xs text-red-500 mb-2">${t('msg.scene-failed')}</p><button data-action="${p}-regenerate" data-scene-id="${id}" class="action-btn bg-fuchsia-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>${t('btn.retry')}</button></div>`;
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
          h.innerHTML = `<span><i class="fas fa-clapperboard mr-1"></i>Klip ${clipIdx} — Scene ${gi + 1}–${end} · ${plan.clipSec} dtk</span><span class="flex items-center gap-2"><button type="button" data-action="${p}-clip-download" data-clip="${clipIdx}" class="action-btn bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-download mr-1 pointer-events-none"></i>Unduh</button><button type="button" data-action="${p}-clip-prompt" data-clip="${clipIdx}" class="action-btn bg-fuchsia-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-film mr-1 pointer-events-none"></i>Prompt Klip</button><button type="button" data-action="${p}-clip-sheet" data-clip="${clipIdx}" class="action-btn bg-violet-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"><i class="fas fa-images mr-1 pointer-events-none"></i>Storyboard</button></span>`;
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
              <button data-action="${p}-regenerate" data-scene-id="${id}" class="action-btn bg-green-500 text-white px-3 py-2 rounded-lg" title="${t('title.regenerate')}"><i class="fas fa-sync-alt pointer-events-none"></i></button>
              <button data-action="${p}-editprompt" data-scene-id="${id}" class="action-btn bg-amber-500 text-white px-3 py-2 rounded-lg" title="${t('title.editprompt')}"><i class="fas fa-pen pointer-events-none"></i></button>
              <button data-action="${p}-video" data-scene-id="${id}" class="action-btn bg-fuchsia-500 text-white px-3 py-2 rounded-lg" title="${t('title.video')}"><i class="fas fa-film pointer-events-none"></i></button>
              <button data-action="${p}-download" data-scene-id="${id}" data-filename="${cfg.filenamePrefix}_${id}_${safe}.png" class="action-btn bg-cyan-600 text-white px-3 py-2 rounded-lg" title="${t('title.download')}"><i class="fas fa-download pointer-events-none"></i></button>
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
      if (cfg.custom && !document.getElementById(`${p}-custom-input`).value.trim()) { window.uiNotify(t('warn.viral-idea-required')); return; }
      generateBtn.disabled = true;
      hideContinueBtn();
      rollRandomSel();
      const orig = generateBtn.innerHTML;
      generateBtn.innerHTML = '<div class="loader"></div><span class="ml-2">Menyusun cerita...</span>';
      downloadAllBtn.classList.add('hidden');
      if (videoAllBtn) videoAllBtn.classList.add('hidden');
      if (captionBtn) captionBtn.classList.add('hidden');
      if (audioStyleSel) audioStyleSel.classList.add('hidden');
      if (audioLangBtn) audioLangBtn.classList.add('hidden');
      grid.innerHTML = `<div class="col-span-full text-center py-10"><div class="loader inline-block"></div><p class="mt-4 text-gray-500">${window.__dynT(cfg.analyzingMsg)}</p></div>`;
      let ideas;
      try { ideas = await analyzeAndGetPrompts(); }
      catch (err) {
        console.error(err);
        grid.innerHTML = `<div class="col-span-full text-center py-10 text-red-500">Terjadi kesalahan: ${window.escHtml(err.message)}</div>`;
        generateBtn.disabled = false; generateBtn.innerHTML = orig; return;
      }
      generateBtn.innerHTML = `<div class="loader"></div><span class="ml-2">${t('loading.visual')}</span>`;
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
      if (success === 0) window.uiNotify(t('warn.google-limit'));
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
      if (btn.dataset.action === `${p}-clip-sheet`) {
        exportStoryboardSheet(parseInt(btn.dataset.clip, 10));
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
        <div class="flex items-center justify-between mb-3"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-pen text-amber-500 mr-2"></i>${t('modal.edit-prompt-title')}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-2">${t('edit.hint')}</p>
        <textarea data-editp rows="7" class="w-full p-3 border-2 border-gray-200 rounded-lg text-sm font-mono resize-none focus:border-violet-500 transition">${window.escHtml(card.dataset.prompt || '')}</textarea>
        <div class="flex gap-2 mt-4"><button data-save class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-floppy-disk mr-1"></i>${t('btn.save')}</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm">${t('btn.cancel')}</button></div>
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
      let vp = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
      if (!vp) throw new Error('Prompt kosong dari API.');
      if (cfg.voicePersona && !NO_SPEECH_STYLES.includes(audioStyle)) vp += `\n\nNARRATOR VOICE LOCK (identical in every scene): ${cfg.voicePersona}. Keep this exact narrator voice — same gender, age, tone, pace and accent — for the entire video; the narrator voice must NEVER change between scenes.`;
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
      let vp = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
      if (!vp) throw new Error('Prompt kosong dari API.');
      if (cfg.voicePersona && !NO_SPEECH_STYLES.includes(audioStyle)) vp += `\n\nNARRATOR VOICE LOCK (identical in every clip and scene): ${cfg.voicePersona}. Keep this exact narrator voice — same gender, age, tone, pace and accent — for the entire video; the narrator voice must NEVER change between clips or scenes.`;
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
      const loadingHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-4 text-gray-800"><i class="fas fa-hashtag text-cyan-500 mr-2"></i>${t('loading.caption')}</h3><div class="flex items-center justify-center py-8"><div class="loader"></div></div></div>`;
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
              <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">${window.escHtml(s.label)}</span><button data-copyone="${i}" class="text-xs bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button></div>
              <textarea data-cap="${i}" rows="${s.key === 'hashtag' ? 3 : 5}" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm resize-none">${window.escHtml(s.body)}</textarea>
            </div>`).join('');
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
            <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-hashtag text-cyan-500 mr-2"></i>${t('modal.caption-title')}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
            ${blocks}
            <div class="flex gap-2">
              <button data-copyall class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}</button>
              <button data-txt class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-download mr-1"></i>${t('btn.download-txt')}</button>
            </div>
          </div>`;
          modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
          modal.querySelectorAll('[data-copyone]').forEach(btn => btn.addEventListener('click', () => {
            const ta = modal.querySelector(`[data-cap="${btn.dataset.copyone}"]`);
            const ok = window.copyText(ta.value);
            if (!ok) { ta.focus(); ta.select(); }
            btn.innerHTML = ok ? `<i class="fas fa-check mr-1 pointer-events-none"></i>${t('msg.copied')}` : `<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>${t('msg.press-ctrl-c')}`;
            setTimeout(() => { btn.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 2000);
          }));
          const aggregate = () => parts.map(s => `# ${s.label}\n${s.body}`).join('\n\n');
          const copyAllBtn = modal.querySelector('[data-copyall]');
          copyAllBtn.addEventListener('click', () => {
            const ok = window.copyText(aggregate());
            copyAllBtn.innerHTML = ok ? `<i class="fas fa-check mr-1"></i>${t('msg.copied')}` : `<i class="fas fa-download mr-1"></i>${t('msg.use-download-txt')}`;
            setTimeout(() => { copyAllBtn.innerHTML = `<i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}`; }, 2200);
          });
          modal.querySelector('[data-txt]').addEventListener('click', () => {
            const b = new Blob([aggregate()], { type: 'text/plain' });
            const u = URL.createObjectURL(b);
            window.downloadDataURINew(u, `${cfg.filenamePrefix}_caption.txt`);
            setTimeout(() => URL.revokeObjectURL(u), 1500);
          });
        } catch (err) {
          console.error('caption error', err);
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-3 text-red-600"><i class="fas fa-triangle-exclamation mr-2"></i>Gagal membuat caption</h3><p class="text-gray-700 text-sm mb-4">${window.escHtml(err.message)}</p><div class="flex gap-2"><button data-retry class="flex-1 btn-primary py-2 rounded-lg font-semibold"><i class="fas fa-rotate-right mr-1"></i>Coba Lagi</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold">${t('modal.close')}</button></div></div>`;
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
      const loadingHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-4 text-gray-800"><i class="fas fa-clapperboard text-fuchsia-500 mr-2"></i>${t('loading.clip-prompt')} ${clipIdx}...</h3><div class="flex items-center justify-center py-8"><div class="loader"></div></div></div>`;
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
            <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-clapperboard text-fuchsia-500 mr-2"></i>${t('vp.clip-title-prefix')} ${clipIdx} (${cards.length} ${t('unit.photos')} · ${plan.clipSec} ${t('unit.sec')})</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
            <div class="flex gap-2 mb-3 overflow-x-auto">${thumbs}</div>
            <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-3">
              <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">${t('vp.one-clip-prompt')} (${cards.length} ${t('unit.keyframe')}):</span><button data-copy class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button></div>
              <textarea data-prompt rows="9" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm font-mono resize-none">${window.escHtml(vp)}</textarea>
            </div>
            <p class="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-lg p-3 mb-3"><i class="fas fa-info-circle mr-1"></i>${t('clip.howto').replace('%C', cards.length).replace('%P', window.VIDEO_PLATFORMS[durState.platform].label).replace('%S', plan.clipSec)}</p>
            <button data-close class="w-full btn-secondary py-2 rounded-lg font-semibold">${t('modal.close')}</button>
          </div>`;
          modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
          const copyBtn = modal.querySelector('[data-copy]'), ta = modal.querySelector('[data-prompt]');
          copyBtn.addEventListener('click', () => {
            const ok = window.copyText(ta.value);
            if (!ok) { ta.focus(); ta.select(); }
            copyBtn.innerHTML = ok ? `<i class="fas fa-check mr-1 pointer-events-none"></i>${t('msg.copied')}` : `<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>${t('msg.press-ctrl-c')}`;
            setTimeout(() => { copyBtn.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 2000);
          });
        } catch (err) {
          console.error('clip prompt error', err);
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-3 text-red-600"><i class="fas fa-triangle-exclamation mr-2"></i>Gagal membuat prompt klip</h3><p class="text-gray-700 text-sm mb-4">${window.escHtml(err.message)}</p><div class="flex gap-2"><button data-retry class="flex-1 btn-primary py-2 rounded-lg font-semibold"><i class="fas fa-rotate-right mr-1"></i>Coba Lagi</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold">${t('modal.close')}</button></div></div>`;
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
      const loadingHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-4 text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>${t('loading.video-prompt')}</h3><div class="flex items-center justify-center py-8"><div class="loader"></div></div></div>`;
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
          <div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>${t('vp.title-prefix')} ${sceneNum}/${total}: ${window.escHtml(title)}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
          <img src="${imageUrl}" class="w-full rounded-lg mb-3 max-h-56 object-contain bg-gray-100">
          <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-3">
            <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">${t('vp.section-label')} (Scene ${sceneNum}/${total}):</span><button data-copy class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button></div>
            <textarea data-prompt rows="8" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm font-mono resize-none">${window.escHtml(vp)}</textarea>
          </div>
          <p class="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-lg p-3 mb-3"><i class="fas fa-info-circle mr-1"></i>${t('vp.tips')}</p>
          <button data-close class="w-full btn-secondary py-2 rounded-lg font-semibold">${t('modal.close')}</button>
        </div>`;
        modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
        const copyBtn = modal.querySelector('[data-copy]'), ta = modal.querySelector('[data-prompt]');
        copyBtn.addEventListener('click', () => {
          const ok = window.copyText(ta.value);
          if (!ok) { ta.focus(); ta.select(); }
          copyBtn.innerHTML = ok ? `<i class="fas fa-check mr-1 pointer-events-none"></i>${t('msg.copied')}` : `<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>${t('msg.press-ctrl-c')}`;
          setTimeout(() => { copyBtn.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 2000);
        });
        } catch (err) {
          console.error('video prompt error', err);
          modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-md w-full" onclick="event.stopPropagation()"><h3 class="text-lg font-bold mb-3 text-red-600"><i class="fas fa-triangle-exclamation mr-2"></i>${t('modal.fail-prompt')}</h3><p class="text-gray-700 text-sm mb-4">${window.escHtml(err.message)}</p><div class="flex gap-2"><button data-retry class="flex-1 btn-primary py-2 rounded-lg font-semibold"><i class="fas fa-rotate-right mr-1"></i>Coba Lagi</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold">${t('modal.close')}</button></div></div>`;
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
        <div class="flex items-center justify-between mb-2"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>${clipIdx ? `${t('vp.per-scene')} — ${t('unit.clip-title')} ${clipIdx}` : t('btn.all-video-prompt')} (${total} scene)</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-3" data-progress>${t('progress.preparing')} 0/${total}...</p>
        <div data-list class="space-y-3"></div>
        <div class="flex gap-2 mt-4">
          <button data-copyall class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}</button>
          <button data-txt class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-download mr-1"></i>${t('btn.download-txt')}</button>
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
        progressEl.textContent = `${t('progress.done')} ${done}/${total} ${t('unit.prompt')}`;
        copyAll.classList.toggle('hidden', done === 0);
        txtBtn.classList.toggle('hidden', done === 0);
      }
      copyAll.addEventListener('click', () => {
        const ok = window.copyText(aggregateText());
        copyAll.innerHTML = ok ? `<i class="fas fa-check mr-1"></i>${t('msg.copied')}` : `<i class="fas fa-download mr-1"></i>${t('msg.use-download-txt')}`;
        setTimeout(() => { copyAll.innerHTML = `<i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}`; }, 2200);
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
        block.innerHTML = `<div class="flex items-center justify-between mb-1"><span class="text-sm font-semibold text-gray-700">Scene ${sceneNo(card)}/${sceneTotal}: ${window.escHtml(title)}</span><span class="flex items-center gap-2"><button data-copyone class="text-xs bg-violet-500 hover:bg-violet-600 text-white px-2 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button><button data-retry class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-2 py-1 rounded-full hidden"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>Coba Lagi</button><span data-st><span class="loader !w-4 !h-4 !border-2 inline-block"></span></span></span></div><textarea rows="5" readonly class="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 text-xs font-mono resize-none" data-ta></textarea>`;
        listEl.appendChild(block);
        const ta = block.querySelector('[data-ta]'), st = block.querySelector('[data-st]'), retryBtn = block.querySelector('[data-retry]');
        const copyOne = block.querySelector('[data-copyone]');
        copyOne.addEventListener('click', () => {
          const ok = window.copyText(ta.value);
          copyOne.innerHTML = ok ? '<i class="fas fa-check mr-1 pointer-events-none"></i>OK' : '<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>Ctrl+C';
          setTimeout(() => { copyOne.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 1800);
        });
        retryBtn.addEventListener('click', () => runBlock(i, card, ta, st, retryBtn));
        progressEl.textContent = `${t('progress.preparing')} ${i + 1}/${total}...`;
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
        <div class="flex items-center justify-between mb-2"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-clapperboard text-fuchsia-500 mr-2"></i>${t('vp.all-clip-prompts')} (${totalClips} ${t('unit.clips')} · ${plan.clipSec} ${t('unit.sec-per-clip')})</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-3" data-progress>${t('progress.preparing')} 0/${totalClips}...</p>
        <div data-list class="space-y-3"></div>
        <div class="flex gap-2 mt-4">
          <button data-copyall class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}</button>
          <button data-txt class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm hidden"><i class="fas fa-download mr-1"></i>${t('btn.download-txt')}</button>
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
        progressEl.textContent = `${t('progress.done')} ${done}/${totalClips} ${t('unit.prompt')} ${t('unit.clip')}`;
        copyAll.classList.toggle('hidden', done === 0);
        txtBtn.classList.toggle('hidden', done === 0);
      }
      copyAll.addEventListener('click', () => {
        const ok = window.copyText(aggregateText());
        copyAll.innerHTML = ok ? `<i class="fas fa-check mr-1"></i>${t('msg.copied')}` : `<i class="fas fa-download mr-1"></i>${t('msg.use-download-txt')}`;
        setTimeout(() => { copyAll.innerHTML = `<i class="fas fa-copy mr-1"></i>${t('btn.copy-all')}`; }, 2200);
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
        block.innerHTML = `<div class="flex items-center justify-between mb-1"><span class="text-sm font-semibold text-gray-700">Klip ${i + 1}/${totalClips} — Scene ${i * plan.perClip + 1}–${Math.min((i + 1) * plan.perClip, all.length)}</span><span class="flex items-center gap-2"><button data-copyone class="text-xs bg-violet-500 hover:bg-violet-600 text-white px-2 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button><button data-retry class="text-xs bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-2 py-1 rounded-full hidden"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>Coba Lagi</button><span data-st><span class="loader !w-4 !h-4 !border-2 inline-block"></span></span></span></div><textarea rows="6" readonly class="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 text-xs font-mono resize-none" data-ta></textarea>`;
        listEl.appendChild(block);
        const ta = block.querySelector('[data-ta]'), st = block.querySelector('[data-st]'), retryBtn = block.querySelector('[data-retry]');
        const copyOne = block.querySelector('[data-copyone]');
        copyOne.addEventListener('click', () => {
          const ok = window.copyText(ta.value);
          copyOne.innerHTML = ok ? '<i class="fas fa-check mr-1 pointer-events-none"></i>OK' : '<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>Ctrl+C';
          setTimeout(() => { copyOne.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 1800);
        });
        retryBtn.addEventListener('click', () => runBlock(i, ta, st, retryBtn));
        progressEl.textContent = `${t('progress.preparing')} ${i + 1}/${totalClips}...`;
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

  // Persona narator kids DIKUNCI satu suara (tanpa ini tiap scene AI mengarang suara beda → video hasil I2V ganti-ganti narator)
  const KIDS_VOICE = 'a warm, gentle female storyteller voice for young children: calm, cheerful, slow-paced and friendly, like a kindergarten teacher reading a picture book aloud';

  // === KIDPEDIA SUBJECT VARIETY ===
  // Subjek diacak client-side saat kolom subjek spesifik kosong (pola variasi-generate):
  // shuffle-bag per kategori (tak terulang sampai daftar habis), dikunci per cerita — Lanjutkan Cerita tidak ganti subjek.
  window.KIDPEDIA_SUBJECTS = {
    'Hewan darat': ['Gajah Afrika', 'Singa', 'Jerapah', 'Harimau Sumatra', 'Panda', 'Kanguru', 'Beruang kutub', 'Zebra', 'Badak Jawa', 'Koala'],
    'Hewan laut': ['Hiu paus', 'Lumba-lumba', 'Paus biru', 'Penyu hijau', 'Gurita', 'Kuda laut', 'Ubur-ubur', 'Pari manta', 'Anjing laut', 'Bintang laut'],
    'Burung': ['Elang', 'Burung hantu', 'Penguin', 'Merak', 'Kolibri', 'Flamingo', 'Kakatua', 'Burung unta', 'Pelikan', 'Cendrawasih'],
    'Serangga': ['Kupu-kupu', 'Lebah madu', 'Semut', 'Kumbang tanduk', 'Belalang sembah', 'Kunang-kunang', 'Capung', 'Kepik', 'Jangkrik', 'Rayap'],
    'Dinosaurus': ['Tyrannosaurus rex', 'Triceratops', 'Brachiosaurus', 'Stegosaurus', 'Velociraptor', 'Pteranodon', 'Ankylosaurus', 'Spinosaurus', 'Diplodocus', 'Parasaurolophus'],
    'Luar angkasa': ['Planet Saturnus', 'Planet Mars', 'Bulan', 'Matahari', 'Planet Jupiter', 'Komet', 'Meteor / bintang jatuh', 'Galaksi Bima Sakti', 'Astronot', 'Roket luar angkasa'],
    'Kendaraan': ['Pesawat terbang', 'Kereta api cepat', 'Kapal selam', 'Truk pemadam kebakaran', 'Excavator', 'Helikopter', 'Kapal layar', 'Bus tingkat', 'Traktor', 'Mobil balap'],
    'Alam': ['Gunung berapi', 'Pelangi', 'Air terjun', 'Hutan hujan', 'Gurun pasir', 'Sungai', 'Aurora', 'Salju', 'Terumbu karang', 'Gua'],
  };
  (function () {
    const pools = {};
    let locked = '';
    window.__kidpediaRoll = false;
    window.kidPediaSubjectSel = function (sel) {
      const out = Object.assign({}, sel);
      if ((out['subjek spesifik'] || '').trim()) return out;
      const cat = out['kategori'];
      const list = window.KIDPEDIA_SUBJECTS[cat] || [];
      if (!list.length) return out;
      if (window.__kidpediaRoll || !locked) {
        if (!pools[cat] || !pools[cat].length) pools[cat] = list.slice().sort(() => Math.random() - 0.5);
        locked = pools[cat].pop();
        window.__kidpediaRoll = false;
      }
      out['subjek spesifik'] = locked;
      return out;
    };
  })();
  // === END KIDPEDIA SUBJECT VARIETY ===

  createViralTab({
    prefix: 'kidpedia', title: 'Ensiklopedia Anak', subtitle: 'Video pengetahuan 1 subjek untuk anak — narasi dokumenter ramah anak. Fakta dibuat AI: cek dulu sebelum diposting.',
    filenamePrefix: 'ensiklopedia_anak', analyzingMsg: 'AI sedang menyusun cerita pengetahuan...', defaultAudio: 'voiceover',
    promptFn: window.buildKidPediaPrompt, voicePersona: KIDS_VOICE,
    onRoll: () => { window.__kidpediaRoll = true; },
    mapSelection: (sel) => window.kidPediaSubjectSel(sel),
    subject: 'ONE kid-friendly encyclopedia subject presented documentary-style for children, narrator voiceover only',
    arc: 'perkenalan subjek (hero shot pose khas) → habitat asli → makanan & cara makan → kemampuan/keunikan tubuh → fakta seru tambahan → penutup rekap ceria',
    extraInput: { key: 'subjek spesifik', label: 'Subjek Spesifik (opsional)', placeholder: 'Contoh: Gajah Afrika, Hiu Paus, Planet Saturnus — kosongkan biar AI pilih dari kategori' },
    chipGroups: [
      { key: 'kategori', label: 'Kategori Subjek', options: ['Hewan darat', 'Hewan laut', 'Burung', 'Serangga', 'Dinosaurus', 'Luar angkasa', 'Kendaraan', 'Alam'] },
      { key: 'gaya visual', label: 'Gaya Visual', options: ['3D film animasi', 'Ilustrasi buku cerita (cat air)', 'Kartun 2D ceria', 'Semi-realistis lembut', 'Clay / plastisin'] },
    ],
  });

  createViralTab({
    prefix: 'kidcycle', title: 'Siklus Hidup', subtitle: 'Transformasi tahapan hidup satu subjek — telur jadi kupu-kupu, biji jadi pohon. Narasi dokumenter ramah anak.',
    filenamePrefix: 'siklus_hidup', analyzingMsg: 'AI sedang menyusun tahapan siklus hidup...', defaultAudio: 'voiceover',
    promptFn: window.buildLifeCyclePrompt, voicePersona: KIDS_VOICE,
    subject: 'the scientifically correct life cycle of ONE kid-friendly subject shown stage by stage, narrator voiceover only',
    chipGroups: [
      { key: 'subjek', label: 'Subjek', options: ['Kupu-kupu', 'Katak', 'Ayam', 'Kumbang', 'Capung', 'Nyamuk', 'Ikan', 'Tanaman kacang', 'Bunga matahari', 'Pohon apel'] },
      { key: 'gaya visual', label: 'Gaya Visual', options: ['3D film animasi', 'Ilustrasi buku cerita (cat air)', 'Kartun 2D ceria', 'Semi-realistis lembut', 'Clay / plastisin'] },
    ],
  });
  // === END VIRAL STUDIO ===

  // === TALKING INFLUENCER ===
  // Tab "Influencer Bicara": talking-head per niche, 1 foto per klip, naskah nyambung antar klip.
  window.TALKER_PLATFORMS = {
    omni:     { label: 'Gemini Omni', clipSec: 10 },
    seedance: { label: 'Seedance',    clipSec: 15 }
  };

  window.SCRIPT_ANGLES = [
    'a deeply personal relatable story: narrate one specific vivid moment from daily life that illustrates the point',
    'a bold contrarian take: open by challenging a popular belief about this topic, then kindly defend the unpopular truth',
    'a letter to my younger self: frame the whole monologue as advice the speaker wishes they had received years ago',
    'a chain of reflective questions: drive the monologue with questions aimed straight at the viewer, answering each briefly',
    'a lesson from failure: build the monologue around one honest mistake and what it taught the speaker',
    'the perspective of a loved one: explore how a spouse, child or close friend silently experiences this topic',
    'myth vs reality: contrast what people commonly believe about this topic with what actually happens',
    'the unsaid truth: talk about the part of this topic nobody dares to say out loud, with empathy',
    'an everyday-object analogy: explain the whole topic through one simple physical object or daily activity as a metaphor',
    'before vs after: contrast life before and after one key realization about this topic',
    'one tiny habit: focus the entire monologue on one small practical action the viewer can start today',
    'a social observation: start from a small everyday scene everyone recognizes, then zoom out to the deeper meaning'
  ];

  window.buildTalkerScriptPrompt = function (sel, plan) {
    const L = { id: 'Bahasa Indonesia', en: 'English', ms: 'Bahasa Melayu (Malay)' };
    const lang = L[sel.lang] || L.id;
    const lo = Math.round(plan.clipSec * 1.6), hi = Math.round(plan.clipSec * 2.0);
    const maxChars = Math.round(plan.clipSec * 14);
    const islami = sel.niche === 'Islami' ? `**ISLAMIC CONTENT SAFETY (STRICT — applies to this niche only):** This is a gentle Indonesian-style reminder/tausiyah. You MAY use everyday Muslim expressions naturally (Alhamdulillah, InsyaAllah, Masya Allah, Bismillah, Subhanallah). You MUST NEVER quote Quran verses (neither Arabic script NOR Latin transliteration), NEVER quote hadith text, and NEVER cite any source or attribution (no "HR. Bukhari", no "QS. Al-Baqarah:...", no hadith numbers, no narrator names). Keep it to sincere moral reflection and heartfelt du'a expressed ONLY in the meaning, in ${lang}. If a religious point is needed, phrase it as general reflection ("mari kita renungkan...", "semoga Allah...") — never as a quoted proof.\n` : '';
    return `You are an expert scriptwriter for short-form social-media talking-head videos (wisdom quotes, life advice, niche monologues).
Write ONE continuous ${plan.totalSec}-second spoken monologue in ${lang} for the niche "${sel.niche}"${sel.topic ? ` about this topic: "${sel.topic}"` : ' (pick one strong specific topic yourself that fits the niche)'} then split it into ${plan.clips} consecutive segments — one per ${plan.clipSec}-second video clip.

**SPEAKING STYLE:** ${sel.gaya}. Natural spoken language, warm and personal, like talking to one close friend. No bullet points, no headings — pure speech.
${sel.angle ? `**NARRATIVE ANGLE (follow strictly):** build the whole monologue as ${sel.angle}.\n` : ''}${islami}**CONTINUITY LOCK (MOST IMPORTANT):** the segments are ONE flowing monologue cut into pieces. Every segment MUST end exactly at the end of a complete sentence — NEVER cut a sentence in the middle across two segments; the next segment starts a NEW sentence that continues the same train of thought. NEVER restart, NEVER greet again, NEVER re-introduce or summarize previous segments in segment 2 and onward.
**LENGTH BUDGET (CRITICAL — the #1 reason clips fail is a segment too long to finish speaking in time):** each segment must be ${lo}–${hi} words AND at most ${maxChars} characters (≈2 relaxed spoken words per second). Count the characters; if a segment is over ${maxChars} characters, trim words until it fits. Write so the sentence lands COMFORTABLY with a little time to spare BEFORE the ${plan.clipSec}-second clip ends — never pack words to the last second, because the video model needs a breath at the start and end of every clip. Prefer short, natural, everyday phrasing over dense wording; this keeps the delivery calm and human.
**STRUCTURE:** segment 1 opens with a strong hook (a bold statement or a question — NO "hai semuanya"-style greeting). Middle segments deliver the substance with concrete, relatable moments. The final segment lands a memorable takeaway plus a soft call-to-action (save/share/follow).
Respond ONLY with valid JSON: {"title": "short content title in ${lang}", "segments": ["segment 1 text", "segment 2 text", ...]} with EXACTLY ${plan.clips} segments.`;
  };

  window.buildTalkerVideoPrompt = function (segment, idx, plan, sel) {
    const L = { id: 'Bahasa Indonesia', en: 'English', ms: 'Bahasa Melayu (Malay)' };
    const lang = L[sel.lang] || L.id;
    const isFirst = idx === 0, isLast = idx === plan.clips - 1;
    const open = isFirst
      ? 'This is the OPENING clip: the person starts speaking with confident hook energy from the very first frame.'
      : `This clip CONTINUES one ongoing monologue (clip ${idx + 1} of ${plan.clips}): the person is ALREADY mid-talk — NO greeting, NO restart, NO long pause at the start; they begin a new sentence that continues the ongoing train of thought from the previous clip.`;
    const end = isLast
      ? 'Ending: this is the CLOSING clip — the person finishes the final sentence and gives a warm sincere closing smile to camera.'
      : 'Ending: the person finishes their last sentence naturally, but the monologue is NOT done — do NOT wrap up, no goodbye; the next clip continues the talk.';
    return `Talking-head video, EXACTLY ${plan.clipSec} seconds, 9:16 vertical. Animate the person in the image speaking DIRECTLY to camera with accurate natural lip-sync.

SPEECH — the person speaks these EXACT words in ${lang}, nothing more, nothing less:
"${segment}"

DELIVERY: ${sel.gaya}. ${open} ${end}
CAMERA & MOTION: static podcast-style framing, subtle micro-movements only — natural blinks, small head tilts, light hand gestures; identity, outfit, background and lighting stay EXACTLY as in the image. The camera angle stays EXACTLY as in the image (multi-cam podcast setup): if the image shows a side angle, the person still speaks toward the main front camera, NOT into this lens.
AUDIO: the person's clear voice only, soft room tone; NO music, NO other voices.
ON-SCREEN TEXT: none — do NOT add captions or new text (text already in the background stays as is).`;
  };

  (function createTalkerTab() {
    const p = 'talker';
    const apiKey = "";
    const host = document.getElementById(`content-${p}`);
    if (!host) return;

    const NICHE_OPTS = ['Kata Bijak / Motivasi', 'Islami', 'Parenting', 'Kerja Harian / Karier', 'Keuangan', 'Cinta / Hubungan', 'Kesehatan Mental'];
    const LATAR_OPTS = ['Studio Podcast', 'Ruang Tamu Cozy', 'Kafe', 'Dalam Mobil', 'Taman'];
    const GAYA_OPTS = ['Tenang / Reflektif', 'Semangat / Motivator', 'Storytelling', 'Ceramah Lembut'];
    const LATAR_EN = {
      'Studio Podcast': 'in a cozy professional podcast studio: seated at a dark wooden table with a large broadcast microphone on a boom arm in front, warm wood-panel wall and soft warm lamps softly blurred behind',
      'Ruang Tamu Cozy': 'in a warm cozy living room: seated on a sofa with soft cushions, a warm lamp and house plants softly blurred behind',
      'Kafe': 'in an aesthetic coffee shop: seated at a table near a window with a cup of coffee beside, warm cafe interior softly blurred behind',
      'Dalam Mobil': 'inside a parked car: seated in the driver seat talking to a mounted phone camera, soft daylight through the windows',
      'Taman': 'outdoors in a green park: soft natural daylight, trees and greenery softly blurred behind'
    };

    // Varian suasana terkurasi per latar — jenis lokasi tetap, atmosfer berbeda (anti-seragam antar user).
    const SUASANA = {
      'Studio Podcast': [
        { label: 'Kayu Hangat Klasik', en: 'classic podcast studio ambience: warm wood-paneled walls, soft tungsten table lamps, cozy brown-amber tones' },
        { label: 'Neon Malam', en: 'dark night studio ambience: moody purple-blue neon strip lights glowing on the back wall, sleek dark surfaces, subtle haze' },
        { label: 'Minimalis Putih', en: 'bright minimalist studio: clean white walls, soft daylight-balanced lighting, airy modern feel with one green plant accent' },
        { label: 'Industrial Bata', en: 'industrial loft studio: exposed red brick wall, black metal pipes, warm Edison bulbs hanging, rugged textures' },
        { label: 'Broadcast Pro', en: 'professional broadcast studio: large soft LED panel backdrop with subtle gradient, polished desk, crisp studio lighting' },
        { label: 'Loteng Senja', en: 'attic loft studio at golden hour: warm sunset light streaming through a large window, soft lens glow, honey tones' },
        { label: 'Perpustakaan', en: 'library-style studio: tall bookshelves filled with books behind, warm reading lamps, scholarly cozy atmosphere' },
        { label: 'Garasi Kreatif', en: 'creative garage studio: casual DIY vibe, acoustic foam panels, posters on the wall, warm practical lamps' }
      ],
      'Ruang Tamu Cozy': [
        { label: 'Skandinavia Terang', en: 'bright Scandinavian living room: light oak furniture, white walls, soft natural daylight, airy and clean' },
        { label: 'Senja Temaram', en: 'dim evening living room: warm low lamplight, golden glow, deep cozy shadows, relaxed intimate mood' },
        { label: 'Boho Tanaman', en: 'bohemian living room: many lush house plants, rattan furniture, macrame wall decor, warm earthy tones' },
        { label: 'Klasik Elegan', en: 'elegant classic living room: dark wood furniture, deep green sofa, brass lamp accents, refined warm ambience' },
        { label: 'Apartemen Kota Malam', en: 'modern city apartment at night: large window with blurred city lights bokeh behind, mixed cool-warm lighting' },
        { label: 'Minimalis Jepang', en: 'Japanese minimalist living room: low wooden furniture, shoji-style panels, neutral beige tones, calm zen light' },
        { label: 'Fairy Lights', en: 'cozy living room decorated with warm fairy string lights glowing softly behind, dreamy warm bokeh' },
        { label: 'Pagi Cerah', en: 'bright morning living room: fresh sunlight through big windows, white curtains, cheerful clean atmosphere' }
      ],
      'Kafe': [
        { label: 'Kayu Klasik', en: 'classic wooden coffee shop: warm brown wood interior, shelves of coffee jars, soft pendant lamps' },
        { label: 'Industrial', en: 'industrial cafe: concrete walls, black steel frames, hanging Edison bulbs, urban rugged feel' },
        { label: 'Minimalis Terang', en: 'bright minimalist cafe: white and light-wood interior, large windows, soft daylight, clean modern look' },
        { label: 'Malam Hangat', en: 'cafe at night: warm amber interior lights, dark windows with street light bokeh outside, intimate mood' },
        { label: 'Vintage Retro', en: 'vintage retro cafe: pastel colors, old posters, retro furniture, nostalgic warm film-like tones' },
        { label: 'Rooftop Sore', en: 'rooftop cafe in late afternoon: open air, golden hour sky behind, string lights, city skyline softly blurred' },
        { label: 'Outdoor Taman', en: 'garden cafe outdoors: green plants around wooden tables, dappled natural daylight through leaves' },
        { label: 'Coffee Bar Modern', en: 'modern specialty coffee bar: sleek counter with espresso machine behind, marble and matte black accents, crisp lighting' }
      ],
      'Dalam Mobil': [
        { label: 'Mewah Malam Hujan', en: 'luxurious dark leather car interior at night, rain drops streaking the windows, soft cool dashboard ambient light' },
        { label: 'SUV Siang Cerah', en: 'bright modern SUV interior on a sunny day, light grey seats, clear daylight through the windows' },
        { label: 'Retro Golden Hour', en: 'retro classic car interior at golden hour, warm sunset light flooding in, tan leather seats, nostalgic glow' },
        { label: 'Malam Kota Bokeh', en: 'car interior at night parked on a city street, colorful city light bokeh through the windows, cinematic mood' },
        { label: 'Hujan Kaca Berembun', en: 'car interior on a rainy day, fogged-up windows with soft grey daylight, cozy rainy-day atmosphere' },
        { label: 'Sport Gelap', en: 'dark sporty car interior: black alcantara seats, red stitching, subtle red-blue ambient light strips' },
        { label: 'Pagi Parkiran Taman', en: 'car parked by a green park in the morning, fresh soft daylight, trees visible through the windows' },
        { label: 'Senja Pantai', en: 'car parked near the beach at dusk, warm orange-pink sky through the windshield, relaxed vacation vibe' }
      ],
      'Taman': [
        { label: 'Pagi Segar', en: 'fresh park morning: soft cool sunlight, dewy green grass, light mist between trees' },
        { label: 'Golden Hour', en: 'park at golden hour: warm low sunlight through the trees, glowing rim light, long soft shadows' },
        { label: 'Taman Bunga', en: 'flower garden: colorful blooming flower beds softly blurred behind, bright cheerful daylight' },
        { label: 'Hutan Kota Rindang', en: 'shaded urban forest: tall leafy trees, dappled light through the canopy, deep green tones' },
        { label: 'Tepi Danau', en: 'lakeside park: calm water shimmering behind, soft reflections, gentle open daylight' },
        { label: 'Musim Gugur', en: 'autumn park: golden-orange leaves on the trees and ground, warm crisp seasonal light' },
        { label: 'Mendung Lembut', en: 'overcast park: soft diffused grey light, muted calm green tones, gentle even lighting' },
        { label: 'Taman Malam Lampu', en: 'park at night: warm garden lanterns and string lights glowing, dark blue evening sky' }
      ]
    };

    // ---- Render panel ----
    function chipGrid(key, opts, withCustom) {
      return `<div id="${p}-group-${key}" data-group="${key}" class="grid gap-2 p-2 border-2 border-gray-100 rounded-xl" style="grid-template-columns:repeat(auto-fill,minmax(130px,1fr));">
        ${opts.map((o, i) => `<button type="button" data-val="${window.escHtml(o)}" class="theme-chip${i === 0 ? ' selected' : ''}">${window.escHtml(o)}</button>`).join('')}
        ${withCustom ? '<button type="button" data-val="__custom__" class="theme-chip"><i class="fas fa-pen"></i>Custom</button>' : ''}
      </div>
      ${withCustom ? `<input type="text" id="${p}-group-${key}-custom" class="hidden w-full mt-2 p-3 bg-white border-2 border-violet-300 rounded-xl text-sm focus:border-violet-500 transition">` : ''}`;
    }
    host.innerHTML = `
      <div class="container mx-auto p-4 md:p-8 max-w-7xl">
        <header class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold brand-gradient bg-clip-text text-transparent" data-i18n="hdr.talker.title">AI Influencer Bicara</h1>
          <p class="text-gray-500 mt-2" data-i18n="hdr.talker.sub">Naskah nyambung antar klip — satukan di CapCut jadi satu monolog utuh.</p>
        </header>
        <main class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div class="lg:col-span-1 space-y-6">
            <div class="card p-6">
              <div class="flex items-center gap-2 mb-3"><div class="step-num">1</div><h2 class="text-lg font-semibold text-gray-800" data-i18n="talk.step-model">Foto Model (Wajib)</h2></div>
              <div id="${p}-model-image-upload-area">
                <label for="${p}-model-image-input" class="file-input-label rounded-xl p-6 text-center text-gray-500 flex flex-col items-center justify-center min-h-[120px]">
                  <i class="fas fa-user text-3xl mb-2"></i><span class="font-medium" data-i18n="field.upload-click-model">Klik untuk pilih foto model</span>
                </label>
                <input type="file" id="${p}-model-image-input" class="hidden" accept="image/png, image/jpeg, image/webp">
              </div>
              <div id="${p}-model-image-preview-container" class="hidden mt-2 relative">
                <img id="${p}-model-image-preview" src="#" alt="Model" class="rounded-xl w-full h-auto object-contain">
                <button id="${p}-model-remove-btn" class="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full"><i class="fas fa-times pointer-events-none"></i></button>
              </div>
              <button type="button" id="${p}-library-btn" class="btn-secondary w-full text-sm font-semibold py-2 px-3 rounded-lg mt-3 hidden"><i class="fas fa-user-astronaut mr-1"></i><span data-i18n="btn.pick-model-library">Pilih dari Pustaka Model</span></button>
            </div>
            <div class="card p-6">
              <div class="flex items-center gap-2 mb-3"><div class="step-num">1b</div><h2 class="text-lg font-semibold text-gray-800" data-i18n="talk.step-product">Foto Produk (Opsional, maks 5)</h2></div>
              <p class="text-xs text-gray-400 mb-3" data-i18n="talk.product-hint">Baju, sepatu, tas, dll — influencer akan memakainya di foto (cocok untuk affiliate).</p>
              <div id="${p}-product-slots" class="grid grid-cols-3 gap-2 mb-3"></div>
              <div class="flex gap-2">
                <button type="button" id="${p}-product-add-btn" class="btn-secondary flex-1 text-sm font-semibold py-2 px-3 rounded-lg"><i class="fas fa-plus mr-1"></i><span data-i18n="btn.upload-product">Upload Produk</span></button>
                <button type="button" id="${p}-product-library-btn" class="btn-secondary flex-1 text-sm font-semibold py-2 px-3 rounded-lg hidden"><i class="fas fa-box-open mr-1"></i><span data-i18n="btn.pick-product-library">Pustaka Produk</span></button>
              </div>
              <input type="file" id="${p}-product-input" class="hidden" accept="image/png, image/jpeg, image/webp">
              <label class="block text-sm font-semibold text-gray-600 mt-4 mb-1" data-i18n="talk.step-brand">Logo/Brand Sponsor (Opsional)</label>
              <p class="text-xs text-gray-400 mb-2" data-i18n="talk.brand-hint">Tampil sebagai properti set (layar/papan di meja atau banner di latar) — tidak disimpan ke akun.</p>
              <div id="${p}-brand-upload-area">
                <label for="${p}-brand-input" class="file-input-label rounded-xl p-4 text-center text-gray-500 flex flex-col items-center justify-center min-h-[80px]">
                  <i class="fas fa-rectangle-ad text-2xl mb-1"></i><span class="text-sm font-medium" data-i18n="field.upload-click-brand">Klik untuk pilih logo brand</span>
                </label>
                <input type="file" id="${p}-brand-input" class="hidden" accept="image/png, image/jpeg, image/webp">
              </div>
              <div id="${p}-brand-preview-container" class="hidden mt-2 relative">
                <img id="${p}-brand-preview" src="#" alt="Brand" class="rounded-xl w-full h-auto object-contain max-h-40 bg-white border-2 border-gray-100">
                <button id="${p}-brand-remove-btn" class="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full"><i class="fas fa-times pointer-events-none"></i></button>
              </div>
            </div>
            <div class="card p-6">
              <div class="flex items-center gap-2 mb-3"><div class="step-num">2</div><h2 class="text-lg font-semibold text-gray-800" data-i18n="talk.step-niche">Pilih Niche</h2></div>
              ${chipGrid('niche', NICHE_OPTS, true)}
              <label class="block text-sm font-semibold text-gray-600 mt-4 mb-1" data-i18n="talk.step-topic">Topik (Opsional)</label>
              <textarea id="${p}-topic-input" rows="2" class="w-full p-3 bg-white border-2 border-gray-200 rounded-xl focus:border-violet-500 transition resize-none" data-i18n-placeholder="ph.talk-topic" placeholder="Contoh: ikhlas menghadapi ujian hidup"></textarea>
              <p id="${p}-islami-note" class="hidden text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-3" data-i18n="talk.islami-note">Naskah dakwah dibuat AI — hindari mengutip ayat/hadits, tinjau sendiri sebelum posting.</p>
            </div>
            <div class="card p-6">
              <div class="flex items-center gap-2 mb-3"><div class="step-num">3</div><h2 class="text-lg font-semibold text-gray-800" data-i18n="talk.step-latar">Latar</h2></div>
              ${chipGrid('latar', LATAR_OPTS, true)}
              <div id="${p}-suasana-wrap">
                <label class="block text-sm font-semibold text-gray-600 mt-4 mb-1" data-i18n="talk.step-suasana">Suasana</label>
                <div id="${p}-suasana-grid" class="grid gap-2 p-2 border-2 border-gray-100 rounded-xl" style="grid-template-columns:repeat(auto-fill,minmax(130px,1fr));"></div>
                <input type="text" id="${p}-suasana-custom" class="hidden w-full mt-2 p-3 bg-white border-2 border-violet-300 rounded-xl text-sm focus:border-violet-500 transition" data-i18n-placeholder="ph.talk-suasana-custom" placeholder="Tulis suasana sendiri, cth: studio gelap dengan lampu neon merah">
              </div>
              <label class="block text-sm font-semibold text-gray-600 mt-4 mb-1" data-i18n="talk.step-branding">Nama Akun di Backdrop (Opsional)</label>
              <input type="text" id="${p}-branding-input" class="w-full p-3 bg-white border-2 border-gray-200 rounded-xl focus:border-violet-500 transition" data-i18n-placeholder="ph.talk-branding" placeholder="Contoh: Ruang Bertumbuh Fatimah Zahra">
            </div>
            <div class="card p-6">
              <div class="flex items-center gap-2 mb-3"><div class="step-num">4</div><h2 class="text-lg font-semibold text-gray-800" data-i18n="talk.step-gaya">Gaya Bicara</h2></div>
              ${chipGrid('gaya', GAYA_OPTS, false)}
              <label class="block text-sm font-semibold text-gray-600 mt-4 mb-1" data-i18n="talk.step-angle">Angle Kamera</label>
              <div id="${p}-angle-grid" class="flex flex-wrap gap-2">
                <button type="button" data-val="random" class="theme-chip selected"><i class="fas fa-shuffle"></i>Acak</button>
                <button type="button" data-val="center" class="theme-chip">Tengah</button>
                <button type="button" data-val="left" class="theme-chip">Kiri</button>
                <button type="button" data-val="right" class="theme-chip">Kanan</button>
              </div>
            </div>
            <div class="card p-6">
              <div class="flex items-center gap-2 mb-3"><div class="step-num">5</div><h2 class="text-lg font-semibold text-gray-800" data-i18n="talk.step-duration">Platform & Durasi</h2></div>
              <div id="${p}-duration-panel"></div>
              <div class="flex items-center justify-between mt-3">
                <span class="text-xs font-semibold text-gray-500" data-i18n="talk.script-lang">Bahasa naskah</span>
                <button type="button" id="${p}-script-lang" class="btn-secondary text-sm font-semibold py-2 px-3 rounded-lg"></button>
              </div>
            </div>
            <button type="button" id="${p}-script-btn" class="w-full btn-primary font-bold py-4 px-6 rounded-xl flex items-center justify-center text-lg"><i class="fas fa-pen-nib mr-2"></i><span data-i18n="talk.btn-script">Buat Naskah</span></button>
            <div id="${p}-script-card" class="card p-6 hidden">
              <h2 class="text-lg font-semibold text-gray-800 mb-1" data-i18n="talk.script-title">Naskah per Klip (bisa diedit)</h2>
              <p id="${p}-script-name" class="text-sm text-violet-700 font-semibold mb-3"></p>
              <div id="${p}-script-list" class="space-y-3"></div>
              <button type="button" id="${p}-rescript-btn" class="btn-secondary w-full text-sm font-semibold py-2 px-3 rounded-lg mt-3"><i class="fas fa-rotate mr-1"></i><span data-i18n="talk.btn-rescript">Buat Ulang Naskah</span></button>
            </div>
            <div id="${p}-caption-card" class="card p-6 hidden">
              <div class="flex items-center justify-between mb-1">
                <h2 class="text-lg font-semibold text-gray-800"><i class="fas fa-hashtag text-cyan-500 mr-2"></i><span data-i18n="talk.caption-title">Caption & Hashtag</span></h2>
                <button type="button" id="${p}-recaption-btn" class="btn-secondary text-sm font-semibold py-2 px-3 rounded-lg"><i class="fas fa-rotate mr-1"></i><span data-i18n="talk.btn-recaption">Buat Ulang Caption</span></button>
              </div>
              <p class="text-xs text-gray-400 mb-3" data-i18n="talk.caption-hint">Caption otomatis dari naskah — edit naskah lalu tekan Buat Ulang Caption kalau berubah.</p>
              <div id="${p}-caption-body" class="space-y-3"></div>
            </div>
            <button type="button" id="${p}-photos-btn" class="w-full btn-primary font-bold py-4 px-6 rounded-xl flex items-center justify-center text-lg" disabled><i class="fas fa-bolt mr-2"></i><span data-i18n="talk.btn-photos">Generate Foto</span></button>
          </div>
          <div class="lg:col-span-2">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 class="text-xl font-bold text-gray-800" data-i18n="talk.result">Hasil Klip</h2>
              <div class="flex items-center gap-2">
                <button type="button" id="${p}-video-all-btn" class="btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden"><i class="fas fa-film mr-1"></i><span data-i18n="btn.all-video-prompt">Semua Prompt Video</span></button>
                <button type="button" id="${p}-sheet-btn" class="btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden"><i class="fas fa-images mr-1"></i><span data-i18n="btn.sheet">Ekspor Storyboard</span></button>
                <button type="button" id="${p}-download-all-btn" class="btn-secondary text-sm font-semibold py-2 px-4 rounded-lg hidden"><i class="fas fa-download mr-1"></i><span data-i18n="btn.download-all">Unduh Semua</span></button>
              </div>
            </div>
            <div id="${p}-b-roll-grid" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"></div>
          </div>
        </main>
      </div>`;

    // ---- Chip single-select (default = opsi pertama) ----
    const selection = { niche: NICHE_OPTS[0], latar: LATAR_OPTS[0], gaya: GAYA_OPTS[0], suasana: '__random__', suasanaCustom: '' };
    let anglePool = [];
    function nextAngle() {
      if (!anglePool.length) anglePool = [...window.SCRIPT_ANGLES].sort(() => Math.random() - 0.5);
      return anglePool.pop();
    }
    ['niche', 'latar', 'gaya'].forEach(key => {
      const gridEl = document.getElementById(`${p}-group-${key}`);
      const customEl = document.getElementById(`${p}-group-${key}-custom`);
      gridEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-val]'); if (!btn) return;
        gridEl.querySelectorAll('.theme-chip').forEach(x => x.classList.remove('selected'));
        btn.classList.add('selected');
        if (btn.dataset.val === '__custom__' && customEl) {
          customEl.classList.remove('hidden'); customEl.focus();
          selection[key] = customEl.value.trim();
          if (key === 'latar') renderSuasana();
        } else {
          if (customEl) customEl.classList.add('hidden');
          selection[key] = btn.dataset.val;
          if (key === 'latar') renderSuasana();
        }
        if (key === 'niche') updateIslamiNote();
      });
      if (customEl) customEl.addEventListener('input', () => {
        if (gridEl.querySelector('.theme-chip.selected')?.dataset.val === '__custom__') selection[key] = customEl.value.trim();
      });
    });

    const islamiNoteEl = document.getElementById(`${p}-islami-note`);
    function updateIslamiNote() {
      if (islamiNoteEl) islamiNoteEl.classList.toggle('hidden', selection.niche !== 'Islami');
    }
    updateIslamiNote();

    // ---- Suasana latar (Acak = dipilih dari kurasi SEKALI per generate) ----
    const suasanaGrid = document.getElementById(`${p}-suasana-grid`);
    const suasanaCustomEl = document.getElementById(`${p}-suasana-custom`);
    function renderSuasana() {
      const wrap = document.getElementById(`${p}-suasana-wrap`);
      const list = SUASANA[selection.latar];
      selection.suasana = '__random__';
      selection.suasanaCustom = '';
      suasanaCustomEl.value = '';
      suasanaCustomEl.classList.add('hidden');
      if (!list) { wrap.classList.add('hidden'); return; }
      wrap.classList.remove('hidden');
      suasanaGrid.innerHTML = `<button type="button" data-val="__random__" class="theme-chip selected"><i class="fas fa-shuffle"></i>Acak</button>`
        + list.map(v => `<button type="button" data-val="${window.escHtml(v.label)}" class="theme-chip">${window.escHtml(v.label)}</button>`).join('')
        + `<button type="button" data-val="__custom__" class="theme-chip"><i class="fas fa-pen"></i>Custom</button>`;
    }
    suasanaGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-val]'); if (!btn) return;
      suasanaGrid.querySelectorAll('.theme-chip').forEach(x => x.classList.remove('selected'));
      btn.classList.add('selected');
      selection.suasana = btn.dataset.val;
      if (btn.dataset.val === '__custom__') {
        suasanaCustomEl.classList.remove('hidden'); suasanaCustomEl.focus();
        selection.suasanaCustom = suasanaCustomEl.value.trim();
      } else {
        suasanaCustomEl.classList.add('hidden');
      }
    });
    suasanaCustomEl.addEventListener('input', () => {
      if (selection.suasana === '__custom__') selection.suasanaCustom = suasanaCustomEl.value.trim();
    });
    renderSuasana();
    let currentSuasana = null;
    function resolveSuasana() {
      const list = SUASANA[selection.latar];
      if (!list) { currentSuasana = null; return; }
      if (selection.suasana === '__custom__') {
        currentSuasana = selection.suasanaCustom ? { label: 'Custom', en: selection.suasanaCustom } : null;
        return;
      }
      currentSuasana = selection.suasana === '__random__'
        ? list[Math.floor(Math.random() * list.length)]
        : (list.find(v => v.label === selection.suasana) || null);
    }

    // ---- Angle kamera (terkunci satu sisi, atau acak = rotasi multi-cam existing) ----
    let angleMode = 'random';
    const angleGrid = document.getElementById(`${p}-angle-grid`);
    angleGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-val]'); if (!btn) return;
      angleGrid.querySelectorAll('.theme-chip').forEach(x => x.classList.remove('selected'));
      btn.classList.add('selected');
      angleMode = btn.dataset.val;
    });

    // ---- Foto model (upload + pustaka) ----
    let modelBase64 = null, modelMime = null;
    const modelInput = document.getElementById(`${p}-model-image-input`);
    const modelUploadArea = document.getElementById(`${p}-model-image-upload-area`);
    const modelPreviewContainer = document.getElementById(`${p}-model-image-preview-container`);
    const modelPreview = document.getElementById(`${p}-model-image-preview`);
    function setModel(b64, mime, srcUrl) {
      modelBase64 = b64; modelMime = mime;
      modelPreview.src = srcUrl;
      modelUploadArea.classList.add('hidden');
      modelPreviewContainer.classList.remove('hidden');
    }
    modelInput.addEventListener('change', async () => {
      const file = modelInput.files && modelInput.files[0]; if (!file) return;
      try {
        const { base64, mimeType } = await window.compressImage(file);
        setModel(base64, mimeType, `data:${mimeType};base64,${base64}`);
      } catch (err) { window.uiNotify(t('warn.file-unreadable')); }
    });
    document.getElementById(`${p}-model-remove-btn`).addEventListener('click', () => {
      modelBase64 = null; modelMime = null; modelInput.value = '';
      modelUploadArea.classList.remove('hidden'); modelPreviewContainer.classList.add('hidden');
    });
    const libBtn = document.getElementById(`${p}-library-btn`);
    libBtn.addEventListener('click', async () => {
      let list = [];
      try { list = await window.modelDB.list(); } catch (err) { console.error(err); }
      if (!list.length) { window.uiNotify(t('warn.no-models')); return; }
      showChoiceModal(t('btn.pick-model-library'), list.map(m => ({
        label: `<span class="flex items-center gap-3"><img src="${URL.createObjectURL(m.blob)}" class="w-12 h-12 rounded-lg object-cover shrink-0">${window.escHtml(m.name)}</span>`,
        onPick: async () => setModel(await window.blobToB64(m.blob), m.mime, URL.createObjectURL(m.blob))
      })));
    });
    async function refreshLibBtn() {
      try { libBtn.classList.toggle('hidden', !(await window.modelDB.list()).length); }
      catch { libBtn.classList.add('hidden'); }
    }
    document.addEventListener('ssp-models-changed', refreshLibBtn);
    refreshLibBtn();

    // ---- Foto produk (opsional, maks 5) — influencer memakainya, cocok untuk affiliate ----
    const PRODUCT_MAX = 5;
    const products = []; // {b64, mime, name, cloudId} — cloudId terisi = sudah di pustaka akun
    const prodSlots = document.getElementById(`${p}-product-slots`);
    const prodAddBtn = document.getElementById(`${p}-product-add-btn`);
    const prodLibBtn = document.getElementById(`${p}-product-library-btn`);
    const prodInput = document.getElementById(`${p}-product-input`);
    function renderProducts() {
      prodSlots.innerHTML = products.map((pr, i) => `
        <div class="relative rounded-xl border-2 border-gray-100 overflow-hidden bg-white">
          <img src="data:${pr.mime};base64,${pr.b64}" class="w-full aspect-square object-cover" alt="${window.escHtml(pr.name || 'Produk')}">
          <button type="button" data-prod-remove="${i}" class="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs"><i class="fas fa-times pointer-events-none"></i></button>
          ${pr.cloudId
            ? `<span class="absolute bottom-1 left-1 right-1 text-center text-[10px] font-semibold text-white bg-violet-600/80 rounded-md py-0.5"><i class="fas fa-cloud mr-1"></i>${t('badge.product-saved')}</span>`
            : `<button type="button" data-prod-save="${i}" class="absolute bottom-1 left-1 right-1 text-[10px] font-semibold text-white bg-gray-800/70 rounded-md py-0.5"><i class="fas fa-cloud-arrow-up mr-1 pointer-events-none"></i><span class="pointer-events-none">${t('btn.save-product')}</span></button>`}
        </div>`).join('');
      prodAddBtn.classList.toggle('hidden', products.length >= PRODUCT_MAX);
    }
    prodAddBtn.addEventListener('click', () => prodInput.click());
    prodInput.addEventListener('change', async () => {
      const file = prodInput.files && prodInput.files[0];
      prodInput.value = '';
      if (!file) return;
      if (products.length >= PRODUCT_MAX) { window.uiNotify(t('warn.product-limit')); return; }
      try {
        const { base64, mimeType } = await window.compressImage(file);
        products.push({ b64: base64, mime: mimeType, name: '', cloudId: null });
        renderProducts();
      } catch (err) { window.uiNotify(t('warn.file-unreadable')); }
    });
    prodSlots.addEventListener('click', (e) => {
      const rm = e.target.closest('[data-prod-remove]');
      if (rm) { products.splice(parseInt(rm.dataset.prodRemove, 10), 1); renderProducts(); return; }
      const sv = e.target.closest('[data-prod-save]');
      if (sv) saveProduct(parseInt(sv.dataset.prodSave, 10));
    });
    function showNameModal(title, onOk) {
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-sm w-full" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-4"><h3 class="text-base font-bold text-gray-800">${title}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <input type="text" data-name maxlength="60" class="w-full p-3 bg-white border-2 border-gray-200 rounded-xl text-sm focus:border-violet-500 transition">
        <button type="button" data-ok class="w-full btn-primary font-bold py-2.5 px-4 rounded-xl mt-3">OK</button>
      </div>`;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      modal.querySelector('[data-close]').addEventListener('click', close);
      modal.querySelector('[data-ok]').addEventListener('click', () => {
        const v = modal.querySelector('[data-name]').value.trim();
        if (!v) { window.uiNotify(t('warn.product-name-required')); return; }
        close(); onOk(v);
      });
      document.body.appendChild(modal);
      setTimeout(() => { modal.classList.add('show'); modal.querySelector('[data-name]').focus(); }, 10);
    }
    async function saveProduct(i) {
      const pr = products[i]; if (!pr || pr.cloudId) return;
      let existing = [];
      try { existing = await window.productDB.list(); } catch (err) {}
      if (existing.length >= PRODUCT_MAX) { window.uiNotify(t('warn.product-library-full')); return; }
      showNameModal(t('modal.product-name'), async (name) => {
        const rec = { id: String(Date.now()), name, mime: pr.mime, createdAt: new Date().toISOString() };
        let cloudOk = false;
        try { if (window.productCloud) cloudOk = await window.productCloud.upload({ id: rec.id, name, base64: pr.b64 }); }
        catch (err) { console.error('product cloud upload failed:', err); }
        try {
          await window.productDB.put(Object.assign({}, rec, { blob: window.b64ToBlob(pr.b64, pr.mime), cloud: cloudOk }));
          pr.cloudId = rec.id; pr.name = name;
          renderProducts();
        } catch (err) { console.error('productDB put failed:', err); window.uiNotify(t('warn.storage-unavailable')); }
      });
    }
    function showProductLibraryModal(list) {
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-4"><h3 class="text-base font-bold text-gray-800">${t('btn.pick-product-library')}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <div class="space-y-2" data-rows></div>
      </div>`;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      modal.querySelector('[data-close]').addEventListener('click', close);
      const rows = modal.querySelector('[data-rows]');
      list.forEach(m => {
        const row = document.createElement('div');
        row.className = 'flex items-center gap-2';
        const objUrl = URL.createObjectURL(m.blob);
        row.innerHTML = `
          <button type="button" data-use class="flex-1 btn-secondary py-2 px-3 rounded-lg font-semibold text-sm text-left"><span class="flex items-center gap-3"><img src="${objUrl}" class="w-12 h-12 rounded-lg object-cover shrink-0">${window.escHtml(m.name)}</span></button>
          <button type="button" data-del class="text-xs font-semibold py-2.5 px-3 rounded-lg" style="color:#dc2626;border:1px solid rgba(220,38,38,.3);"><i class="fas fa-trash pointer-events-none"></i></button>`;
        row.querySelector('[data-use]').addEventListener('click', async () => {
          if (products.length >= PRODUCT_MAX) { window.uiNotify(t('warn.product-limit')); return; }
          close();
          products.push({ b64: await window.blobToB64(m.blob), mime: m.mime, name: m.name, cloudId: m.id });
          renderProducts();
        });
        row.querySelector('[data-del]').addEventListener('click', async (e) => {
          const btn = e.currentTarget;
          if (!(await window.uiConfirm(t('confirm.delete-product').replace('%N', m.name)))) return;
          btn.disabled = true;
          if (m.cloud === true && window.productCloud) {
            const ok = await window.productCloud.del(m.id);
            if (!ok) { btn.disabled = false; window.uiNotify(t('err.delete-server')); return; }
          }
          try { await window.productDB.remove(m.id); row.remove(); } catch (err) { console.error(err); btn.disabled = false; }
        });
        rows.appendChild(row);
      });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
    }
    prodLibBtn.addEventListener('click', async () => {
      let list = [];
      try { list = await window.productDB.list(); } catch (err) { console.error(err); }
      if (!list.length) { window.uiNotify(t('warn.no-products')); return; }
      showProductLibraryModal(list);
    });
    async function refreshProdLibBtn() {
      try { prodLibBtn.classList.toggle('hidden', !(await window.productDB.list()).length); }
      catch { prodLibBtn.classList.add('hidden'); }
    }
    document.addEventListener('ssp-products-changed', refreshProdLibBtn);
    refreshProdLibBtn();

    // ---- Logo/brand sponsor (opsional, TANPA database — properti set, ikut anchor klip 1) ----
    let brandB64 = null, brandMime = null;
    const brandInput = document.getElementById(`${p}-brand-input`);
    const brandUploadArea = document.getElementById(`${p}-brand-upload-area`);
    const brandPreviewContainer = document.getElementById(`${p}-brand-preview-container`);
    const brandPreview = document.getElementById(`${p}-brand-preview`);
    brandInput.addEventListener('change', async () => {
      const file = brandInput.files && brandInput.files[0]; if (!file) return;
      try {
        const { base64, mimeType } = await window.compressImage(file);
        brandB64 = base64; brandMime = mimeType;
        brandPreview.src = `data:${mimeType};base64,${base64}`;
        brandUploadArea.classList.add('hidden');
        brandPreviewContainer.classList.remove('hidden');
      } catch (err) { window.uiNotify(t('warn.file-unreadable')); }
    });
    document.getElementById(`${p}-brand-remove-btn`).addEventListener('click', () => {
      brandB64 = null; brandMime = null; brandInput.value = '';
      brandUploadArea.classList.remove('hidden'); brandPreviewContainer.classList.add('hidden');
    });

    // ---- Platform & durasi (engine sendiri — TIDAK pakai window.VIDEO_PLATFORMS) ----
    const state = { platform: 'omni', totalSec: 60 };
    const durPanel = document.getElementById(`${p}-duration-panel`);
    function plan() {
      const clipSec = window.TALKER_PLATFORMS[state.platform].clipSec;
      return { clipSec, clips: Math.round(state.totalSec / clipSec), totalSec: state.totalSec };
    }
    function renderDurPanel() {
      const pf = window.TALKER_PLATFORMS[state.platform];
      const opts = []; for (let s = pf.clipSec; s <= 60; s += pf.clipSec) opts.push(s);
      if (!opts.includes(state.totalSec)) state.totalSec = opts[opts.length - 1];
      const pl = plan();
      durPanel.innerHTML = `
        <div class="text-xs font-semibold text-gray-500 mb-1">${t('dur.platform')}</div>
        <div class="flex flex-wrap gap-2 mb-3">${Object.entries(window.TALKER_PLATFORMS).map(([k, v]) => `<button type="button" data-platform="${k}" class="theme-chip ${k === state.platform ? 'selected' : ''}">${v.label} — ${v.clipSec} ${t('unit.sec-per-clip')}</button>`).join('')}</div>
        <div class="text-xs font-semibold text-gray-500 mb-1">${t('dur.story-duration')}</div>
        <div class="flex flex-wrap gap-2 mb-2">${opts.map(s => `<button type="button" data-duration="${s}" class="theme-chip ${s === state.totalSec ? 'selected' : ''}">${s} ${t('unit.sec')}</button>`).join('')}</div>
        <p class="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-lg p-2"><i class="fas fa-info-circle mr-1"></i>= ${pl.clips} ${t('unit.clips')} × 1 ${t('unit.photos')} (${pl.clipSec} ${t('unit.sec-per-clip')})</p>`;
    }
    renderDurPanel();
    document.addEventListener('ssp-lang-changed', renderDurPanel);
    durPanel.addEventListener('click', (e) => {
      const pb = e.target.closest('[data-platform]');
      const db = e.target.closest('[data-duration]');
      if (pb) state.platform = pb.dataset.platform;
      else if (db) state.totalSec = parseInt(db.dataset.duration, 10);
      else return;
      renderDurPanel();
      resetOutputs();
    });

    // ---- Bahasa naskah (default ikut bahasa app, override manual — pola audioLang) ----
    let talkerLang = getLang();
    let talkerLangManual = false;
    const langBtn = document.getElementById(`${p}-script-lang`);
    const renderScriptLang = () => { langBtn.innerHTML = `<i class="fas fa-language mr-1"></i>${talkerLang.toUpperCase()}`; };
    renderScriptLang();
    langBtn.addEventListener('click', () => { talkerLang = talkerLang === 'id' ? 'en' : talkerLang === 'en' ? 'ms' : 'id'; talkerLangManual = true; renderScriptLang(); });
    document.addEventListener('ssp-lang-changed', () => { if (!talkerLangManual) { talkerLang = getLang(); renderScriptLang(); } });

    // ---- State naskah + reset ----
    const grid = document.getElementById(`${p}-b-roll-grid`);
    const scriptBtn = document.getElementById(`${p}-script-btn`);
    const rescriptBtn = document.getElementById(`${p}-rescript-btn`);
    const photosBtn = document.getElementById(`${p}-photos-btn`);
    photosBtn.insertAdjacentHTML('beforebegin', window.naturalToggleHTML(`${p}-natural`));
    const scriptCard = document.getElementById(`${p}-script-card`);
    const scriptList = document.getElementById(`${p}-script-list`);
    const captionCard = document.getElementById(`${p}-caption-card`);
    const captionBody = document.getElementById(`${p}-caption-body`);
    const recaptionBtn = document.getElementById(`${p}-recaption-btn`);
    const videoAllBtn = document.getElementById(`${p}-video-all-btn`);
    const sheetBtn = document.getElementById(`${p}-sheet-btn`);
    const downloadAllBtn = document.getElementById(`${p}-download-all-btn`);
    let script = null;
    function resetOutputs() {
      script = null;
      scriptCard.classList.add('hidden');
      scriptList.innerHTML = '';
      captionCard.classList.add('hidden');
      captionBody.innerHTML = '';
      photosBtn.disabled = true;
      grid.innerHTML = '';
      [videoAllBtn, sheetBtn, downloadAllBtn].forEach(b => b.classList.add('hidden'));
    }

    function currentSel() {
      return {
        niche: selection.niche, topic: document.getElementById(`${p}-topic-input`).value.trim(),
        latar: selection.latar, gaya: selection.gaya,
        branding: document.getElementById(`${p}-branding-input`).value.trim(), lang: talkerLang
      };
    }

    // ---- Buat Naskah ----
    async function generateScript(triggerBtn) {
      const sel = currentSel();
      if (!sel.niche || !sel.latar) { window.uiNotify(t('warn.talker-custom-empty')); return; }
      sel.angle = nextAngle();
      const pl = plan();
      const orig = triggerBtn.innerHTML;
      triggerBtn.disabled = true;
      triggerBtn.innerHTML = `<div class="loader"></div><span class="ml-2">${t('loading.talker-script')}</span>`;
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const payload = {
          contents: [{ parts: [{ text: 'Write the monologue script now.' }] }],
          systemInstruction: { parts: [{ text: window.buildTalkerScriptPrompt(sel, pl) }] },
          generationConfig: { responseMimeType: 'application/json', responseSchema: { type: 'OBJECT', properties: { title: { type: 'STRING' }, segments: { type: 'ARRAY', items: { type: 'STRING' } } }, required: ['title', 'segments'] } }
        };
        const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const result = await res.json();
        let raw = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!raw) throw new Error('Invalid response structure from API.');
        raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        const s = raw.indexOf('{'), e2 = raw.lastIndexOf('}');
        if (s === -1 || e2 === -1) throw new Error('No valid JSON in response.');
        const js = JSON.parse(raw.substring(s, e2 + 1));
        if (!Array.isArray(js.segments) || !js.segments.length) throw new Error('Segments kosong.');
        js.segments = js.segments.slice(0, pl.clips);
        if (js.segments.length < pl.clips) throw new Error(`Naskah hanya ${js.segments.length}/${pl.clips} segmen — coba lagi.`);
        script = js;
        renderScript(pl);
        grid.innerHTML = '';
        [videoAllBtn, sheetBtn, downloadAllBtn].forEach(b => b.classList.add('hidden'));
        generateCaption();
      } catch (err) {
        console.error(err);
        window.uiNotify(t('err.talker-script') + err.message);
      } finally {
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = orig;
      }
    }
    function renderScript(pl) {
      document.getElementById(`${p}-script-name`).textContent = script.title || '';
      scriptList.innerHTML = script.segments.map((seg, i) => `
        <div>
          <div class="text-xs font-semibold text-gray-500 mb-1">Klip ${i + 1} · ${pl.clipSec} ${t('unit.sec')}</div>
          <textarea id="${p}-seg-${i + 1}" rows="3" class="w-full p-3 bg-white border-2 border-gray-200 rounded-xl text-sm focus:border-violet-500 transition resize-none">${window.escHtml(seg)}</textarea>
        </div>`).join('');
      scriptCard.classList.remove('hidden');
      photosBtn.disabled = false;
    }
    function readSegments() {
      if (!script) return [];
      return script.segments.map((seg, i) => (document.getElementById(`${p}-seg-${i + 1}`)?.value || seg).trim());
    }
    scriptBtn.addEventListener('click', () => generateScript(scriptBtn));
    rescriptBtn.addEventListener('click', () => generateScript(rescriptBtn));

    // ---- Caption & Hashtag (nyambung dgn naskah) ----
    function parseTalkerCaption(text) {
      const secs = [
        { key: 'short', label: t('cap.short'), re: /===\s*SHORT\s*===([\s\S]*?)(?====|$)/i },
        { key: 'long', label: t('cap.long'), re: /===\s*LONG\s*===([\s\S]*?)(?====|$)/i },
        { key: 'hashtag', label: t('cap.hashtag'), re: /===\s*HASHTAG\s*===([\s\S]*?)(?====|$)/i }
      ];
      const out = [];
      secs.forEach(s => { const m = text.match(s.re); if (m && m[1].trim()) out.push({ key: s.key, label: s.label, body: m[1].trim() }); });
      return out.length ? out : [{ key: 'all', label: t('cap.short'), body: text }];
    }
    function renderCaption(parts) {
      captionBody.innerHTML = parts.map((s, i) => `
        <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2"><span class="text-sm font-semibold text-gray-700">${window.escHtml(s.label)}</span><button type="button" data-capcopy="${i}" class="text-xs bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-full"><i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}</button></div>
          <textarea data-capbody="${i}" rows="${s.key === 'hashtag' ? 3 : 5}" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm resize-none">${window.escHtml(s.body)}</textarea>
        </div>`).join('');
      captionBody.querySelectorAll('[data-capcopy]').forEach(btn => btn.addEventListener('click', () => {
        const ta = captionBody.querySelector(`[data-capbody="${btn.dataset.capcopy}"]`);
        const ok = ta && window.copyText(ta.value);
        if (!ok && ta) { ta.focus(); ta.select(); }
        btn.innerHTML = ok ? `<i class="fas fa-check mr-1 pointer-events-none"></i>${t('msg.copied')}` : `<i class="fas fa-i-cursor mr-1 pointer-events-none"></i>${t('msg.press-ctrl-c')}`;
        setTimeout(() => { btn.innerHTML = `<i class="fas fa-copy mr-1 pointer-events-none"></i>${t('btn.copy')}`; }, 2000);
      }));
    }
    async function generateCaption() {
      if (!script) return;
      const segs = readSegments();
      const monologue = segs.join(' ');
      const langName = LANG_LABEL[talkerLang] || 'Indonesian';
      captionCard.classList.remove('hidden');
      captionBody.innerHTML = `<div class="flex items-center justify-center py-6"><div class="loader"></div><span class="ml-2 text-sm text-gray-500">${t('loading.talker-caption')}</span></div>`;
      recaptionBtn.disabled = true;
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const systemPrompt = `You are a social media copywriter for short-form talking-head video (TikTok, Instagram Reels, YouTube Shorts). Based on the monologue script below, write ready-to-post captions in ${langName} for ONE final vertical video.

Output EXACTLY this structure, using these exact delimiter lines:

=== SHORT ===
(a punchy caption: strong hook line + 1-2 short lines that capture the core message + a soft CTA like save/follow/share; tasteful emoji allowed)
=== LONG ===
(a longer reflective caption: hook line, then 3-5 short lines that expand the message of the monologue, end with a gentle CTA and an invitation to comment)
=== HASHTAG ===
(one line: 10-15 relevant hashtags matching the topic/niche, mix specific and popular ones)

Rules:
1. The caption MUST clearly reflect the theme and message of the monologue — same topic, same emotional tone.
2. Do NOT quote the monologue word-for-word; rephrase it as a caption that makes people want to watch.
3. Output ONLY the structure above — no explanations, no extra markdown.`;
        const userText = `Video title: "${script.title || ''}".\nMonologue script (spoken in the video, in order):\n${monologue}`;
        const payload = { contents: [{ parts: [{ text: userText }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
        const result = await (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).json();
        const text = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
        if (!text) throw new Error('Caption kosong dari API.');
        renderCaption(parseTalkerCaption(text));
      } catch (err) {
        console.error(err);
        captionBody.innerHTML = `<p class="text-sm text-red-500">${t('err.talker-caption')}${window.escHtml(err.message)}</p>`;
      } finally {
        recaptionBtn.disabled = false;
      }
    }
    recaptionBtn.addEventListener('click', () => generateCaption());

    // showChoiceModal lokal (pola factory — fungsi ini function-scoped di factory lain, tidak global)
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

    // ---- Prompt scene foto (1 foto per klip) ----
    const POSES = [
      'hands resting relaxed on the table, warm confident smile',
      'one hand raised mid-explanation, engaged expression',
      'both hands gesturing gently while talking',
      'leaning slightly forward toward the camera, sincere look',
      'hands loosely clasped, calm thoughtful expression',
      'one hand on chest, warm heartfelt expression'
    ];
    // Multi-cam podcast pakai kode kamera industri (diagram user 2026-09-19): host di tengah, CAM A kiri 45°, WIDE CAM tengah, CAM B kanan 45°, 180-degree rule.
    // Orang TETAP bicara menghadap WIDE CAM; klip 1 & terakhir = WIDE CAM (eye contact), klip tengah = cross-shot CAM A/B (LOOKING OFF-CAMERA).
    const ANGLES = [
      "CAM A — professional interview CROSS-SHOT from 45 degrees camera-LEFT, same eye level (standard multicam podcast setup, 180-degree rule respected): the subject framed in THREE-QUARTER PROFILE, LOOKING OFF-CAMERA — eyeline locked on the unseen WIDE CAM straight in front of them — ZERO eye contact with this lens, NOT into this side camera",
      "CAM B — professional interview CROSS-SHOT from 45 degrees camera-RIGHT, same eye level (standard multicam podcast setup, 180-degree rule respected): the subject framed in THREE-QUARTER PROFILE, LOOKING OFF-CAMERA — eyeline locked on the unseen WIDE CAM straight in front of them — ZERO eye contact with this lens, NOT into this side camera",
      "CAM A — WIDE CROSS-SHOT from 45 degrees camera-LEFT: wider framing showing more of the desk and room, subject in three-quarter profile, LOOKING OFF-CAMERA toward the unseen WIDE CAM in front of them — ZERO eye contact with this lens, NOT into this side camera",
      "CAM B — TIGHT CROSS-SHOT from 45 degrees camera-RIGHT: chest-up close-up, face in three-quarter profile, LOOKING OFF-CAMERA toward the unseen WIDE CAM in front of them — ZERO eye contact with this lens, NOT into this side camera"
    ];
    const FRONT_CAM = 'MAIN FRONT CAMERA (WIDE CAM, dead-center in front of the subject): straight-on eye-level shot, the person looks directly into this lens with warm direct eye contact';
    function angleFor(k, total) {
      if (angleMode === 'center') return FRONT_CAM;
      if (angleMode === 'left') return ANGLES[0];
      if (angleMode === 'right') return ANGLES[1];
      if (k === 1 || k === total) return FRONT_CAM;
      return ANGLES[(k - 2) % ANGLES.length];
    }
    function scenePrompt(k, total) {
      const sel = currentSel();
      const base = LATAR_EN[sel.latar] || `in this setting: ${sel.latar}`;
      const setting = currentSuasana ? `${base}. AMBIENCE (override the default mood of this setting with this specific atmosphere): ${currentSuasana.en}` : base;
      const hasBrand = k === 1 && brandB64;
      const branding = sel.branding
        ? `A backdrop sign/wall text behind the person reads EXACTLY "${sel.branding}" — spell it perfectly letter by letter; ${hasBrand ? 'apart from the sponsor logo prop, this is the only other readable text in the scene.' : 'this is the ONLY readable text in the scene.'}`
        : (hasBrand ? 'No readable text anywhere in the scene except the sponsor logo prop.' : 'No readable text anywhere in the scene.');
      const productLine = (k === 1 && products.length)
        ? ' PRODUCTS: the person WEARS/USES the exact products from the additional product reference photos, worn or held naturally and clearly visible — if a product replaces part of the outfit (clothing, shoes), wear the product version; same design, color and material.'
        : '';
      const brandLine = hasBrand
        ? ' SPONSOR (MANDATORY — this prop MUST be visible in the frame): a set prop displaying the sponsor brand is REQUIRED — a small tablet screen or acrylic sign standing on the table (or a small standing banner in the background if there is no table) showing the EXACT logo/artwork from the sponsor reference photo. NEVER omit this prop: it stays clearly visible and readable even when a backdrop name/text is also present — the backdrop text and the sponsor prop are two SEPARATE elements that BOTH appear. The person does NOT wear or hold it.'
        : '';
      return `Photorealistic 9:16 vertical photo from a multi-cam podcast setup. CAMERA ANGLE — THE MOST IMPORTANT RULE, the composition MUST clearly show it: ${angleFor(k, total)}. The subject: the EXACT same person as the reference photo (same face, same hair/hijab, same modest outfit), a social-media content creator mid-speech, ${setting}. ${branding}${productLine}${brandLine} Half-body framing, ${POSES[(k - 1) % POSES.length]}. Warm inviting light, sharp focus on the face, softly blurred background, high-end social media content quality, 8k.`;
    }

    function cardImgB64(card) {
      const m = (card?.querySelector('img')?.src || '').match(/^data:image\/\w+;base64,(.+)$/);
      return m ? m[1] : null;
    }
    function anchorB64() { return cardImgB64(document.getElementById(`${p}-card-1`)); }

    function retryPlaceholder(id) {
      return `<div class="text-center p-3"><p class="text-xs text-red-500 mb-2">${t('msg.scene-failed')}</p><button data-action="${p}-regenerate" data-scene-id="${id}" class="action-btn bg-fuchsia-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"><i class="fas fa-rotate-right mr-1 pointer-events-none"></i>${t('btn.retry')}</button></div>`;
    }

    function buildCards(segs, pl) {
      grid.innerHTML = '';
      segs.forEach((seg, i) => {
        const k = i + 1;
        const card = document.createElement('div');
        card.id = `${p}-card-${k}`;
        card.className = 'result-card card p-4 flex flex-col justify-between';
        card.dataset.title = `Klip ${k}`;
        card.dataset.seg = seg;
        card.dataset.prompt = scenePrompt(k, segs.length);
        card.innerHTML = `<div class="mb-3"><h3 class="text-base font-semibold text-gray-800">Klip ${k} · ${pl.clipSec} ${t('unit.sec')}</h3><p class="text-xs text-gray-400 mt-1">${window.escHtml(seg.length > 90 ? seg.slice(0, 90) + '…' : seg)}</p></div><div class="${p}-output-container aspect-[9/16] bg-gray-100 rounded-md flex items-center justify-center"><div class="loader"></div></div>`;
        grid.appendChild(card);
      });
    }

    async function generateSingle(id, anchor) {
      const card = document.getElementById(`${p}-card-${id}`); if (!card) return;
      const out = card.querySelector(`.${p}-output-container`);
      out.innerHTML = '<div class="loader"></div>';
      const prompt = card.dataset.prompt;
      const retries = 3; let lastError = null;
      for (let i = 0; i < retries; i++) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
          let refText = `REFERENCE PHOTO 1 (CRITICAL): the FIRST attached image is the person — copy their face, hair/hijab and overall identity EXACTLY.`;
          if (anchor) refText += ` REFERENCE PHOTO 2 (CRITICAL): the SECOND attached image is clip 1 of this SAME video — copy its outfit, setting, backdrop text, sponsor logo prop (if present), lighting and color grade EXACTLY; only the pose/gesture, expression and CAMERA ANGLE may differ. IGNORE the camera angle of both reference photos — compose this scene STRICTLY from the CAMERA ANGLE described below (multi-cam setup, same room and seat), do NOT copy the frontal composition of the references.`;
          if (id === 1 && products.length) refText += ` PRODUCT REFERENCE PHOTOS (CRITICAL): the ${products.length} additional attached image(s) after the person are products the person WEARS/USES in this scene (clothing worn on the body, shoes on the feet, bag/accessory held or clearly visible) — copy each product's design, color, material and logo EXACTLY; do NOT invent different products.`;
          if (id === 1 && brandB64) refText += ` SPONSOR BRAND REFERENCE PHOTO (CRITICAL, MANDATORY): the LAST attached image is a sponsor logo/brand — it MUST appear in the frame as a natural set prop (tablet screen or acrylic sign on the table, or a small standing banner in the background), copying the logo's shapes, colors and text EXACTLY. NEVER omit it: even if a backdrop sign/name text is also requested, BOTH must appear — the backdrop text behind the person AND the sponsor logo prop on the table are separate elements. Do NOT change or reinterpret the logo; the person does NOT wear or hold it.`;
          const parts = [{ text: `${refText}\n\nSCENE TO RENDER: ${prompt}${window.naturalHint(`${p}-natural`)}` }, { inlineData: { mimeType: modelMime || 'image/png', data: modelBase64 } }];
          if (anchor) parts.push({ inlineData: { mimeType: 'image/png', data: anchor } });
          if (id === 1) products.forEach(pr => parts.push({ inlineData: { mimeType: pr.mime || 'image/png', data: pr.b64 } }));
          if (id === 1 && brandB64) parts.push({ inlineData: { mimeType: brandMime || 'image/png', data: brandB64 } });
          const payload = {
            contents: [{ parts }],
            generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '9:16' } },
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
          out.innerHTML = `<div class="relative w-full h-full group">
            <img src="data:image/png;base64,${b64}" class="w-full h-full object-cover rounded-md" alt="Klip ${id}">
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex flex-wrap gap-2 justify-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
              <button data-action="${p}-preview" data-scene-id="${id}" class="action-btn bg-violet-600 text-white px-3 py-2 rounded-lg"><i class="fas fa-search-plus pointer-events-none"></i></button>
              <button data-action="${p}-regenerate" data-scene-id="${id}" class="action-btn bg-green-500 text-white px-3 py-2 rounded-lg" title="${t('title.regenerate')}"><i class="fas fa-sync-alt pointer-events-none"></i></button>
              <button data-action="${p}-editprompt" data-scene-id="${id}" class="action-btn bg-amber-500 text-white px-3 py-2 rounded-lg" title="${t('title.editprompt')}"><i class="fas fa-pen pointer-events-none"></i></button>
              <button data-action="${p}-video" data-scene-id="${id}" class="action-btn bg-fuchsia-500 text-white px-3 py-2 rounded-lg" title="${t('title.video')}"><i class="fas fa-film pointer-events-none"></i></button>
              <button data-action="${p}-download" data-scene-id="${id}" data-filename="talker_klip${id}.png" class="action-btn bg-cyan-600 text-white px-3 py-2 rounded-lg" title="${t('title.download')}"><i class="fas fa-download pointer-events-none"></i></button>
            </div>
          </div>`;
          return;
        } catch (err) {
          lastError = err; console.error(`Attempt ${i + 1} klip ${id} failed:`, err);
          if (i < retries - 1) await new Promise(rz => setTimeout(rz, 1000 * Math.pow(2, i)));
        }
      }
      if (lastError) out.innerHTML = retryPlaceholder(id);
    }

    // ---- Generate Foto (klip 1 dulu → anchor → sisanya paralel) ----
    photosBtn.addEventListener('click', async () => {
      if (!modelBase64) { window.uiNotify(t('warn.talker-model-required')); return; }
      if (!script) { window.uiNotify(t('warn.talker-script-first')); return; }
      const segs = readSegments();
      const pl = plan();
      const orig = photosBtn.innerHTML;
      photosBtn.disabled = true;
      photosBtn.innerHTML = `<div class="loader"></div><span class="ml-2">${t('loading.talker-photos')}</span>`;
      [videoAllBtn, sheetBtn, downloadAllBtn].forEach(b => b.classList.add('hidden'));
      try {
        resolveSuasana();
        buildCards(segs, pl);
        await generateSingle(1, null);
        const anc = anchorB64(); // gagal → fail-soft: klip lain jalan tanpa anchor
        await Promise.allSettled(segs.slice(1).map((_, j) => generateSingle(j + 2, anc)));
        const success = Array.from(grid.querySelectorAll('.result-card')).filter(c => c.querySelector('img')).length;
        if (!success) window.uiNotify(t('warn.google-limit'));
        else [videoAllBtn, sheetBtn, downloadAllBtn].forEach(b => b.classList.remove('hidden'));
      } finally {
        photosBtn.disabled = false;
        photosBtn.innerHTML = orig;
      }
    });

    // ---- Aksi kartu ----
    function segText(id) {
      return (document.getElementById(`${p}-seg-${id}`)?.value || document.getElementById(`${p}-card-${id}`)?.dataset.seg || '').trim();
    }
    function openPreview(src) {
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      modal.innerHTML = `<img src="${src}" class="max-w-[92vw] max-h-[90vh] rounded-lg object-contain">`;
      modal.addEventListener('click', () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
    }
    function editPromptModal(id) {
      const card = document.getElementById(`${p}-card-${id}`); if (!card) return;
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-3"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-pen text-amber-500 mr-2"></i>${t('modal.edit-prompt-title')}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-2">${t('edit.hint')}</p>
        <textarea data-editp rows="7" class="w-full p-3 border-2 border-gray-200 rounded-lg text-sm font-mono resize-none focus:border-violet-500 transition">${window.escHtml(card.dataset.prompt || '')}</textarea>
        <div class="flex gap-2 mt-4"><button data-save class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-floppy-disk mr-1"></i>${t('btn.save')}</button><button data-close class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm">${t('btn.cancel')}</button></div>
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
    function videoPromptModal(id) {
      const vp = window.buildTalkerVideoPrompt(segText(id), id - 1, plan(), currentSel());
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-3"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i>Prompt Video — Klip ${id}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <textarea readonly rows="12" class="w-full p-3 border-2 border-gray-200 rounded-lg text-sm font-mono resize-none">${window.escHtml(vp)}</textarea>
        <button data-copy class="w-full btn-primary py-2 rounded-lg font-semibold text-sm mt-3"><i class="fas fa-copy mr-1"></i>${t('talk.btn-copy')}</button>
      </div>`;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
      modal.querySelector('[data-copy]').addEventListener('click', (e) => {
        const ok = window.copyText(vp);
        e.currentTarget.innerHTML = ok ? '<i class="fas fa-check mr-1"></i>OK' : `<i class="fas fa-i-cursor mr-1"></i>${t('msg.press-ctrl-c')}`;
      });
    }
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]'); if (!btn) return;
      const id = parseInt(btn.dataset.sceneId, 10);
      const card = document.getElementById(`${p}-card-${id}`);
      const img = card?.querySelector('img');
      if (btn.dataset.action === `${p}-download` && img) window.downloadDataURINew(img.src, btn.dataset.filename);
      else if (btn.dataset.action === `${p}-preview` && img) openPreview(img.src);
      else if (btn.dataset.action === `${p}-regenerate` && card) generateSingle(id, id === 1 ? null : anchorB64());
      else if (btn.dataset.action === `${p}-editprompt` && card) editPromptModal(id);
      else if (btn.dataset.action === `${p}-video` && card) videoPromptModal(id);
    });

    // ---- Header output ----
    function allVideoPrompts() {
      const pl = plan();
      const sel = currentSel();
      const segs = readSegments();
      return segs.map((seg, i) => `=== KLIP ${i + 1} (${i * pl.clipSec}–${(i + 1) * pl.clipSec} dtk) ===\n${window.buildTalkerVideoPrompt(seg, i, pl, sel)}`).join('\n\n');
    }
    videoAllBtn.addEventListener('click', () => {
      const text = allVideoPrompts();
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-3"><h3 class="text-lg font-bold text-gray-800"><i class="fas fa-film text-fuchsia-500 mr-2"></i><span data-i18n="btn.all-video-prompt">Semua Prompt Video</span></h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <textarea readonly rows="16" class="w-full p-3 border-2 border-gray-200 rounded-lg text-xs font-mono resize-none">${window.escHtml(text)}</textarea>
        <div class="flex gap-2 mt-3">
          <button data-copy class="flex-1 btn-primary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-copy mr-1"></i>${t('talk.btn-copy')}</button>
          <button data-dl class="flex-1 btn-secondary py-2 rounded-lg font-semibold text-sm"><i class="fas fa-download mr-1"></i>.txt</button>
        </div>
      </div>`;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
      modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
      modal.querySelector('[data-copy]').addEventListener('click', (e) => {
        const ok = window.copyText(text);
        e.currentTarget.innerHTML = ok ? '<i class="fas fa-check mr-1"></i>OK' : `<i class="fas fa-i-cursor mr-1"></i>${t('msg.press-ctrl-c')}`;
      });
      modal.querySelector('[data-dl]').addEventListener('click', () => {
        window.downloadDataURINew('data:text/plain;charset=utf-8,' + encodeURIComponent(text), 'influencer_bicara_prompts.txt');
      });
    });

    // Ekspor Storyboard KHUSUS talker: PER KLIP — 1 gambar per klip (foto + prompt-nya), TIDAK digabung (keputusan user 2026-09-18)
    sheetBtn.addEventListener('click', () => {
      const cards = Array.from(grid.querySelectorAll('.result-card')).filter(c => c.querySelector('img'));
      if (!cards.length) { window.uiNotify(t('warn.no-scene-sheet')); return; }
      const pl = plan();
      const sel = currentSel();
      async function makeClipSheet(c) {
        const k = parseInt(c.id.replace(`${p}-card-`, ''), 10);
        const scenes = [{ num: k, title: `Klip ${k}/${pl.clips}`, timing: `${(k - 1) * pl.clipSec}-${k * pl.clipSec}s`, prompt: window.buildTalkerVideoPrompt(segText(k), k - 1, pl, sel), img: c.querySelector('img').src }];
        const sub = `Klip ${k}/${pl.clips} · ${pl.clipSec} ${t('unit.sec')}`;
        const url = await window.buildStoryboardSheet(scenes, { title: t('hdr.talker.title'), sub, cols: 1 });
        window.downloadDataURINew(url, `talker_storyboard_klip${k}.jpg`);
      }
      async function runJobs(list) {
        const orig = sheetBtn.innerHTML;
        sheetBtn.disabled = true;
        sheetBtn.innerHTML = '<div class="loader"></div><span class="ml-2">' + t('loading.sheet') + '</span>';
        try {
          for (const c of list) {
            await makeClipSheet(c);
            await new Promise(r => setTimeout(r, 400)); // jeda antar unduhan biar tidak diblokir browser
          }
        } catch (err) { console.error(err); window.uiNotify(t('err.sheet') + err.message); }
        finally { sheetBtn.disabled = false; sheetBtn.innerHTML = orig; }
      }
      const choices = [{ label: `<i class="fas fa-images mr-2"></i>Semua klip (${cards.length} gambar — 1 per klip)`, onPick: () => runJobs(cards) }];
      cards.forEach(c => {
        const k = parseInt(c.id.replace(`${p}-card-`, ''), 10);
        choices.push({ label: `<i class="fas fa-clapperboard mr-2"></i>Klip ${k}`, onPick: () => runJobs([c]) });
      });
      showSheetModal('Storyboard klip yang mana?', choices);
    });

    // Prompt siap-pakai untuk Flow/Veo: gambar storyboard dibaca sebagai LEMBAR INSTRUKSI, bukan frame video (feedback user 2026-09-19)
    function flowSheetPrompt() {
      const pl = plan();
      return `The attached image is a STORYBOARD SHEET, not a video frame. It contains one reference photo and the full video direction written as text below it.

READ the direction text on the sheet and follow it EXACTLY as the complete instruction (speech words, delivery, camera, audio).

OUTPUT: generate ONLY the actual scene — the person from the reference photo speaking to camera as directed, 9:16 vertical, ${pl.clipSec} seconds. Do NOT show the sheet itself: no borders, no header, no text overlay, no photo-in-photo. The video must look like a real camera recording of the person, nothing else.`;
    }
    // Modal khusus storyboard: tiap baris punya tombol 📋 salin prompt Flow di samping tombol klip
    function showSheetModal(title, choices) {
      const modal = document.createElement('div');
      modal.className = 'image-preview-modal';
      const close = () => { modal.classList.remove('show'); setTimeout(() => modal.remove(), 200); };
      modal.innerHTML = `<div class="bg-white rounded-xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-2"><h3 class="text-base font-bold text-gray-800">${title}</h3><button data-close class="text-gray-400 hover:text-gray-700"><i class="fas fa-times text-xl pointer-events-none"></i></button></div>
        <p class="text-xs text-gray-500 mb-3">${t('talk.flow-hint')}</p>
        <div class="space-y-2" data-choices></div>
      </div>`;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      const wrap = modal.querySelector('[data-choices]');
      choices.forEach(c => {
        const row = document.createElement('div');
        row.className = 'flex gap-2';
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'flex-1 btn-secondary py-2.5 px-4 rounded-lg font-semibold text-sm text-left';
        b.innerHTML = c.label;
        b.addEventListener('click', () => { close(); c.onPick(); });
        const cp = document.createElement('button');
        cp.type = 'button';
        cp.setAttribute('data-copyflow', '1');
        cp.title = t('talk.flow-copy');
        cp.className = 'btn-secondary px-3 rounded-lg text-sm';
        cp.innerHTML = '<i class="fas fa-copy pointer-events-none"></i>';
        cp.addEventListener('click', () => {
          const ok = window.copyText(flowSheetPrompt());
          cp.innerHTML = ok ? '<i class="fas fa-check pointer-events-none"></i>' : '<i class="fas fa-i-cursor pointer-events-none"></i>';
          setTimeout(() => { cp.innerHTML = '<i class="fas fa-copy pointer-events-none"></i>'; }, 1500);
        });
        row.appendChild(b);
        row.appendChild(cp);
        wrap.appendChild(row);
      });
      modal.querySelector('[data-close]').addEventListener('click', close);
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('show'), 10);
    }

    downloadAllBtn.addEventListener('click', () => {
      grid.querySelectorAll('.result-card').forEach(card => {
        const img = card.querySelector('img'); if (!img) return;
        const k = parseInt(card.id.replace(`${p}-card-`, ''), 10);
        window.downloadDataURINew(img.src, `talker_klip${k}.png`);
      });
    });
  })();
  // === END TALKING INFLUENCER ===

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
        await Promise.all(server.filter(s => !localIds.has(String(s.id))).map(async s => {
          try {
            const b64 = await window.modelCloud.get(s.id);
            if (b64) await window.modelDB.put({ id: String(s.id), name: s.name, blob: window.b64ToBlob(b64, 'image/png'), mime: 'image/png', cfg: s.cfg, createdAt: s.createdAt, cloud: true });
          } catch (e) {}
        }));
      } catch (e) { console.error('syncModels:', e); }
      document.dispatchEvent(new CustomEvent('ssp-models-changed'));
    };
    window.productCloud = {
      _q(action, extra) {
        const email = localStorage.getItem('ssp_email') || '';
        return `${LOGIN_CFG.SCRIPT_URL}?action=${action}&email=${encodeURIComponent(email)}&token=${encodeURIComponent(deviceToken)}&app_secret=${encodeURIComponent(LOGIN_CFG.APP_SECRET)}${extra || ''}`;
      },
      async list() {
        const d = await fetch(this._q('product_list')).then(r => r.json());
        return d.status === 'SUKSES' ? (d.products || []) : null;
      },
      async get(id) {
        const d = await fetch(this._q('product_get', `&id=${encodeURIComponent(id)}`)).then(r => r.json());
        return d.status === 'SUKSES' ? d.base64 : null;
      },
      async del(id) {
        try {
          const d = await fetch(this._q('product_del', `&id=${encodeURIComponent(id)}`)).then(r => r.json());
          return d.status === 'SUKSES';
        } catch (e) { return false; }
      },
      async upload(rec) {
        const body = JSON.stringify({
          ssp_action: 'product_upload',
          app_secret: LOGIN_CFG.APP_SECRET,
          email: localStorage.getItem('ssp_email') || '',
          token: deviceToken,
          id: rec.id, name: rec.name, base64: rec.base64
        });
        const d = await fetch(LOGIN_CFG.SCRIPT_URL, { method: 'POST', body }).then(r => r.json());
        return d.status === 'SUKSES';
      }
    };
    window.syncProducts = async function () {
      if (!localStorage.getItem('ssp_email')) return;
      try {
        const server = await window.productCloud.list();
        if (!server) return;
        const serverIds = new Set(server.map(x => String(x.id)));
        const local = await window.productDB.list();
        const localIds = new Set(local.map(x => String(x.id)));
        for (const m of local) {
          if (m.cloud === true && !serverIds.has(String(m.id))) { await window.productDB.remove(m.id); continue; }
          if (m.cloud === false) {
            try {
              const b64 = await window.blobToB64(m.blob);
              const ok = await window.productCloud.upload({ id: m.id, name: m.name, base64: b64 });
              if (ok) await window.productDB.put(Object.assign({}, m, { cloud: true }));
            } catch (e) {}
          }
        }
        await Promise.all(server.filter(s => !localIds.has(String(s.id))).map(async s => {
          try {
            const b64 = await window.productCloud.get(s.id);
            if (b64) await window.productDB.put({ id: String(s.id), name: s.name, blob: window.b64ToBlob(b64, 'image/png'), mime: 'image/png', createdAt: s.createdAt, cloud: true });
          } catch (e) {}
        }));
      } catch (e) { console.error('syncProducts:', e); }
      document.dispatchEvent(new CustomEvent('ssp-products-changed'));
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
      if (window.syncProducts) window.syncProducts();
    }
    async function jagaSesi() {
      const email = localStorage.getItem('ssp_email');
      if (!email) return;
      try {
        const d = await api('cek', email);
        if (d.status === 'INVALID') {
          clearInterval(sesInterval);
          await window.uiNotify(t('warn.session-ended'));
          clearSession();
          location.reload();
        }
      } catch (e) {}
    }

    loginBtn.addEventListener('click', async () => {
      errEl.classList.add('hidden');
      const email = emailInput.value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError(t('err.login.invalid-email')); return; }
      setLoading(true);
      try {
        const d = await api('login', email);
        if (d.status === 'SUKSES') {
          localStorage.setItem('ssp_email', email);
          localStorage.setItem('ssp_name', d.nama || email);
          openApp(d.nama || email);
        } else {
          showError(d.message || t('err.login.failed'));
        }
      } catch (e) {
        showError(t('err.login.failed'));
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
