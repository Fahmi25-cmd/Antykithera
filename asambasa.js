const Kw = 1.0e-14;
const pKw = 14;
const R = 0.0821;

const atomicMasses = {
    'H': 1.008, 'He': 4.002, 'Li': 6.941, 'Be': 9.012, 'B': 10.81, 'C': 12.01, 'N': 14.01, 'O': 16.00, 'F': 19.00, 'Ne': 20.18,
    'Na': 22.99, 'Mg': 24.31, 'Al': 26.98, 'Si': 28.09, 'P': 30.97, 'S': 32.07, 'Cl': 35.45, 'Ar': 39.95, 'K': 39.10, 'Ca': 40.08,
    'Sc': 44.96, 'Ti': 47.87, 'V': 50.94, 'Cr': 52.00, 'Mn': 54.94, 'Fe': 55.85, 'Co': 58.93, 'Ni': 58.69, 'Cu': 63.55, 'Zn': 65.38,
    'Ga': 69.72, 'Ge': 72.63, 'As': 74.92, 'Se': 78.96, 'Br': 79.90, 'Kr': 83.80, 'Rb': 85.47, 'Sr': 87.62, 'Y': 88.91, 'Zr': 91.22,
    'Nb': 92.91, 'Mo': 95.95, 'Tc': 98.00, 'Ru': 101.07, 'Rh': 102.91, 'Pd': 106.42, 'Ag': 107.87, 'Cd': 112.41, 'In': 114.82, 'Sn': 118.71,
    'Sb': 121.76, 'Te': 127.60, 'I': 126.90, 'Xe': 131.29, 'Cs': 132.91, 'Ba': 137.33, 'La': 138.91, 'Ce': 140.12, 'Pr': 140.91, 'Nd': 144.24,
    'Pm': 145.00, 'Sm': 150.36, 'Eu': 151.96, 'Gd': 157.25, 'Tb': 158.93, 'Dy': 162.50, 'Ho': 164.93, 'Er': 167.26, 'Tm': 168.93, 'Yb': 173.05,
    'Lu': 174.97, 'Hf': 178.49, 'Ta': 180.95, 'W': 183.84, 'Re': 186.21, 'Os': 190.23, 'Ir': 192.22, 'Pt': 195.08, 'Au': 196.97, 'Hg': 200.59,
    'Tl': 204.38, 'Pb': 207.2, 'Bi': 208.98, 'Po': 209.00, 'At': 210.00, 'Rn': 222.00, 'Fr': 223.00, 'Ra': 226.00, 'Ac': 227.00, 'Th': 232.04,
    'Pa': 231.04, 'U': 238.03, 'Np': 237.00, 'Pu': 244.00, 'Am': 243.00, 'Cm': 247.00, 'Bk': 247.00, 'Cf': 251.00, 'Es': 252.00, 'Fm': 257.00,
    'Md': 258.00, 'No': 259.00, 'Lr': 262.00, 'Rf': 261.00, 'Db': 262.00, 'Sg': 266.00, 'Bh': 264.00, 'Hs': 269.00, 'Mt': 268.00
};

let configPerhitungan = {};

const petaTopikKePerhitungan = {
    'ph-poh': [
        { teks: 'pH Asam Kuat', nilai: 'ph-larutan-asam' },
        { teks: 'pH Basa Kuat', nilai: 'ph-larutan-basa' },
        { teks: 'pH Asam Lemah', nilai: 'ph-asam-lemah' },
        { teks: 'pH Basa Lemah', nilai: 'ph-basa-lemah' },
        { teks: 'pH dari [H⁺]', nilai: 'ph-dari-h' },
        { teks: 'pH dari [OH⁻]', nilai: 'ph-dari-oh' },
        { teks: 'pOH dari pH', nilai: 'hubungan-ph-poh' }
    ],
    'konsentrasi-ion-h': [
        { teks: 'Hitung [H⁺] dari pH', nilai: 'h-dari-ph' },
        { teks: 'Hitung [OH⁻] dari pH', nilai: 'oh-dari-ph' },
        { teks: 'Hitung [H⁺] dari pOH', nilai: 'h-dari-poh' },
        { teks: 'Hitung [OH⁻] dari pOH', nilai: 'oh-dari-poh' }
    ],
    'konstanta': [
        { teks: 'Cari Ka Asam Lemah', nilai: 'ka-asam-lemah' },
        { teks: 'Cari Kb Basa Lemah', nilai: 'kb-basa-lemah' },
        { teks: 'Cari Kw Air', nilai: 'kw-air' },
        { teks: 'Cari Kb dari Ka', nilai: 'hubungan-ka-kb' },
        { teks: 'Cari pKb dari pKa', nilai: 'hubungan-pka-pkb' }
    ],
    'buffer': [
        { teks: 'pH Buffer Asam (Henderson-Hasselbalch)', nilai: 'ph-buffer-asam' },
        { teks: 'pH Buffer Basa (Henderson-Hasselbalch)', nilai: 'ph-buffer-basa' },
        { teks: 'Kapasitas Buffer Asam', nilai: 'kapasitas-buffer-asam' },
        { teks: 'Kapasitas Buffer Basa', nilai: 'kapasitas-buffer-basa' },
        { teks: 'pH Buffer Asam + Asam', nilai: 'ph-buffer-setelah-asam' },
        { teks: 'pH Buffer Basa + Basa', nilai: 'ph-buffer-setelah-basa' }
    ],
    'ionisasi': [
        { teks: 'Derajat Ionisasi (α)', nilai: 'derajat-ionisasi' },
        { teks: 'Persentase Ionisasi (%)', nilai: 'persentase-ionisasi' }
    ],
    'campuran': [
        { teks: 'pH Campuran Asam & Basa (Umum)', nilai: 'ph-campuran-larutan' }
    ],
    'titrasi': [
        { teks: 'pH Titrasi Asam Kuat - Basa Kuat', nilai: 'titrasi-asam-kuat-basa-kuat' },
        { teks: 'pH Titrasi Asam Lemah - Basa Kuat', nilai: 'titrasi-asam-lemah-basa-kuat' },
        { teks: 'pH Titrasi Basa Lemah - Asam Kuat', nilai: 'titrasi-basa-lemah-asam-kuat' },
        { teks: 'Volume Titik Ekivalen (Umum)', nilai: 'volume-titik-ekivalen' },
        { teks: 'pH Titik Ekivalen (Umum)', nilai: 'ph-titik-ekivalen' }
    ],
    'ph-ekivalen': [
        { teks: 'pH Ekivalen Kuat - Kuat', nilai: 'ph-ekivalen-kuat-kuat' },
        { teks: 'pH Ekivalen Lemah - Kuat', nilai: 'ph-ekivalen-lemah-kuat' },
        { teks: 'pH Ekivalen Kuat - Lemah', nilai: 'ph-ekivalen-kuat-lemah' },
        { teks: 'pH Ekivalen Lemah - Lemah', nilai: 'ph-ekivalen-lemah-lemah' }
    ],
    'pengenceran': [
        { teks: 'Pengenceran Asam Kuat', nilai: 'pengenceran-asam-kuat' },
        { teks: 'Pengenceran Asam Lemah', nilai: 'pengenceran-asam-lemah' },
        { teks: 'Pengenceran Basa Kuat', nilai: 'pengenceran-basa-kuat' },
        { teks: 'Pengenceran Basa Lemah', nilai: 'pengenceran-basa-lemah' },
        { teks: 'Pengenceran Buffer', nilai: 'pengenceran-buffer' }
    ]
};

function getAtomicMass(symbol) {
    if (!symbol) return null;
    const cleanSymbol = symbol.trim();
    if (cleanSymbol.length >= 2 && cleanSymbol.length <= 3) {
        const twoLetterSymbol = cleanSymbol.charAt(0).toUpperCase() + cleanSymbol.slice(1).toLowerCase();
        if (atomicMasses.hasOwnProperty(twoLetterSymbol)) {
            return atomicMasses[twoLetterSymbol];
        }
    }
    if (cleanSymbol.length === 1) {
        const oneLetterSymbol = cleanSymbol.charAt(0).toUpperCase();
        if (atomicMasses.hasOwnProperty(oneLetterSymbol)) {
            return atomicMasses[oneLetterSymbol];
        }
    }
    return null;
}

function hitungMassaMolarFormula(formula) {
    if (!formula || typeof formula !== 'string') throw new Error('Formula kimia tidak valid.');
    let totalMass = 0;
    let i = 0;
    const len = formula.length;
    while (i < len) {
        let symbol = formula[i];
        i++;
        if (i < len && formula[i] === formula[i].toLowerCase()) {
            symbol += formula[i];
            i++;
        }
        let coeff = '';
        while (i < len && /\d/.test(formula[i])) {
            coeff += formula[i];
            i++;
        }
        const num = coeff ? parseInt(coeff) : 1;
        const mass = getAtomicMass(symbol);
        if (mass === null) throw new Error(`Massa atom untuk ${symbol} tidak ditemukan.`);
        totalMass += num * mass;
    }
    return totalMass;
}

function getSifatLarutan(pH) {
    if (pH < 7.0) {
        return 'Asam';
    } else if (pH > 7.0) {
        return 'Basa';
    } else {
        return 'Netral';
    }
}

function tampilkanKalkulator() {
    const topik = document.getElementById('pilih-topik').value;
    const kalkulatorArea = document.getElementById('kalkulator-area');
    kalkulatorArea.innerHTML = '';
    document.removeEventListener('keydown', handleEnterKey);
    if (topik && petaTopikKePerhitungan.hasOwnProperty(topik)) {
        const daftarPerhitungan = petaTopikKePerhitungan[topik];
        const formDiv = document.createElement('div');
        formDiv.id = 'form-kalkulasi';
        const hasilDiv = document.createElement('div');
        hasilDiv.id = 'hasil-kalkulasi';
        hasilDiv.className = 'referensi-bangun-datar';
        hasilDiv.style.marginTop = '20px';
        if (daftarPerhitungan.length === 1) {
            kalkulatorArea.appendChild(formDiv);
            kalkulatorArea.appendChild(hasilDiv);
            const parameter = daftarPerhitungan[0].nilai;
            buatFormKalkulasi(topik, parameter);
            document.addEventListener('keydown', handleEnterKey);
        } else {
            const labelParam = document.createElement('label');
            labelParam.setAttribute('for', 'pilih-parameter');
            labelParam.textContent = 'Pilih Jenis Perhitungan:';
            labelParam.style.display = 'block';
            labelParam.style.marginTop = '15px';
            labelParam.style.fontWeight = 'bold';
            const selectParam = document.createElement('select');
            selectParam.id = 'pilih-parameter';
            selectParam.style.width = '100%';
            selectParam.style.padding = '10px';
            selectParam.style.fontSize = '1rem';
            selectParam.style.border = '1px solid #ccc';
            selectParam.style.borderRadius = '4px';
            selectParam.style.marginBottom = '15px';
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.textContent = '-- Pilih Perhitungan Spesifik --';
            selectParam.appendChild(defaultOpt);
            daftarPerhitungan.forEach(calc => {
                const opt = document.createElement('option');
                opt.value = calc.nilai;
                opt.textContent = calc.teks;
                selectParam.appendChild(opt);
            });
            kalkulatorArea.appendChild(labelParam);
            kalkulatorArea.appendChild(selectParam);
            kalkulatorArea.appendChild(formDiv);
            kalkulatorArea.appendChild(hasilDiv);
            selectParam.onchange = () => {
                const parameter = selectParam.value;
                if (parameter) {
                    buatFormKalkulasi(topik, parameter);
                    document.addEventListener('keydown', handleEnterKey);
                } else {
                    formDiv.innerHTML = '';
                    hasilDiv.innerHTML = '';
                    document.removeEventListener('keydown', handleEnterKey);
                }
            };
        }
    } else if (topik) {
        kalkulatorArea.innerHTML = `<p class="error" style="color: red; font-weight: bold;">Opsi perhitungan untuk topik ini ('${topik}') belum dikonfigurasi di 'petaTopikKePerhitungan'.</p><p>Periksa 'value' di HTML dan samakan dengan kunci di objek 'petaTopikKePerhitungan' di file JS.</p>`;
    }
}

function buatFormKalkulasi(topik, parameter) {
    const formDiv = document.getElementById('form-kalkulasi');
    const hasilDiv = document.getElementById('hasil-kalkulasi');
    formDiv.innerHTML = '';
    hasilDiv.innerHTML = '';
    if (!parameter) return;
    let inputs = {};
    let satuanHasil = '';
    let fungsiHitung = '';
    let namaVariabel = '';
    let catatan = '';
    switch (parameter) {
        case 'ph-larutan-asam':
            inputs = { Ma: 'Molaritas Asam Kuat (M)', valensi: 'Valensi Asam (jumlah H⁺, e.g., 1 for HCl, 2 for H₂SO₄)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHAsamKuat(Ma, valensi, "pH")';
            namaVariabel = 'pH';
            break;
        case 'ph-larutan-basa':
            inputs = { Mb: 'Molaritas Basa Kuat (M)', valensi: 'Valensi Basa (jumlah OH⁻, e.g., 1 for NaOH, 2 for Ca(OH)₂)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHBasaKuat(Mb, valensi, "pH")';
            namaVariabel = 'pH';
            break;
        case 'ph-asam-lemah':
            inputs = { Ma: 'Molaritas Asam Lemah ([HA], M)', Ka: 'Konstanta Asam (Ka)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHAsamLemah(Ma, Ka, "pH")';
            namaVariabel = 'pH';
            catatan = 'Menggunakan aproksimasi alpha << 1.';
            break;
        case 'ph-basa-lemah':
            inputs = { Mb: 'Molaritas Basa Lemah ([BOH], M)', Kb: 'Konstanta Basa (Kb)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHBasaLemah(Mb, Kb, "pH")';
            namaVariabel = 'pH';
            catatan = 'Menggunakan aproksimasi alpha << 1.';
            break;
        case 'ph-dari-h':
            inputs = { H: 'Konsentrasi [H⁺] (M)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHDasar(H, "pH")';
            namaVariabel = 'pH';
            break;
        case 'ph-dari-oh':
            inputs = { OH: 'Konsentrasi [OH⁻] (M)' };
            satuanHasil = 'pOH, pH';
            fungsiHitung = 'hitungPOHDasar(OH, "pH")';
            namaVariabel = 'pH';
            break;
        case 'hubungan-ph-poh':
            inputs = { pH: 'Nilai pH' };
            satuanHasil = 'pOH';
            fungsiHitung = 'hitungHubunganPHPOH(pH, "pOH")';
            namaVariabel = 'pOH';
            break;
        case 'ka-asam-lemah':
            inputs = { H: 'Konsentrasi [H⁺] (M)', Ma: 'Molaritas Asam ([HA], M)' };
            satuanHasil = '';
            fungsiHitung = 'hitungKaAsamLemah(H, Ma, "Ka")';
            namaVariabel = 'Ka';
            catatan = 'Dari Ka = [H⁺]² / [HA].';
            break;
        case 'kb-basa-lemah':
            inputs = { OH: 'Konsentrasi [OH⁻] (M)', Mb: 'Molaritas Basa ([B], M)' };
            satuanHasil = '';
            fungsiHitung = 'hitungKbBasaLemah(OH, Mb, "Kb")';
            namaVariabel = 'Kb';
            catatan = 'Dari Kb = [OH⁻]² / [B].';
            break;
        case 'kw-air':
            inputs = { H: 'Konsentrasi [H⁺] (M)', OH: 'Konsentrasi [OH⁻] (M)' };
            satuanHasil = '';
            fungsiHitung = 'hitungKwAir(H, OH, "Kw")';
            namaVariabel = 'Kw';
            catatan = 'Akan selalu 1.0 x 10^-14 pada 25°C jika [H⁺]=[OH⁻]=1.0 x 10^-7.';
            break;
        case 'hubungan-ka-kb':
            inputs = { Ka: 'Konstanta Asam (Ka)' };
            satuanHasil = '';
            fungsiHitung = 'hitungHubunganKaKb(Ka, "Kb")';
            namaVariabel = 'Kb';
            break;
        case 'hubungan-pka-pkb':
            inputs = { pKa: 'Nilai pKa' };
            satuanHasil = '';
            fungsiHitung = 'hitungHubunganPKaPKb(pKa, "pKb")';
            namaVariabel = 'pKb';
            break;
        case 'ph-buffer-asam':
            inputs = { pKa: 'Nilai pKa', A: 'Konsentrasi Basa Konjugasi ([A⁻] atau [Garam], M)', HA: 'Konsentrasi Asam Lemah ([HA], M)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHBufferAsam(pKa, A, HA, "pH")';
            namaVariabel = 'pH';
            catatan = 'Rumus Henderson–Hasselbalch: pH = pKa + log([A⁻]/[HA]).';
            break;
        case 'ph-buffer-basa':
            inputs = { pKb: 'Nilai pKb', BH: 'Konsentrasi Asam Konjugasi ([BH⁺] atau [Garam], M)', BOH: 'Konsentrasi Basa Lemah ([BOH], M)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHBufferBasa(pKb, BH, BOH, "pH")';
            namaVariabel = 'pH';
            catatan = 'Rumus Henderson–Hasselbalch: pOH = pKb + log([BH⁺]/[BOH]).';
            break;
        case 'kapasitas-buffer-asam':
            inputs = { pKa: 'Nilai pKa', HA: 'Konsentrasi Asam Lemah ([HA], M)', A: 'Konsentrasi Basa Konjugasi ([A⁻], M)', V: 'Volume Larutan (L)' };
            satuanHasil = 'mol/L';
            fungsiHitung = 'hitungKapasitasBufferAsam(pKa, HA, A, V, "beta")';
            namaVariabel = 'Kapasitas Buffer (β)';
            catatan = 'Rumus: β = 2.303 × C × [Ka × H⁺] / (Ka + H⁺)²';
            break;
        case 'kapasitas-buffer-basa':
            inputs = { pKb: 'Nilai pKb', BOH: 'Konsentrasi Basa Lemah ([BOH], M)', BH: 'Konsentrasi Asam Konjugasi ([BH⁺], M)', V: 'Volume Larutan (L)' };
            satuanHasil = 'mol/L';
            fungsiHitung = 'hitungKapasitasBufferBasa(pKb, BOH, BH, V, "beta")';
            namaVariabel = 'Kapasitas Buffer (β)';
            catatan = 'Rumus: β = 2.303 × C × [Kb × OH⁻] / (Kb + OH⁻)²';
            break;
        case 'ph-buffer-setelah-asam':
            inputs = { pKa: 'Nilai pKa', HA: 'Konsentrasi Asam Lemah Awal ([HA], M)', A: 'Konsentrasi Basa Konjugasi Awal ([A⁻], M)', V: 'Volume Buffer (L)', n_asam: 'Mol Asam Ditambahkan' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHBufferSetelahAsam(pKa, HA, A, V, n_asam, null, null, "pH")';
            namaVariabel = 'pH Setelah Penambahan Asam';
            catatan = 'Asumsi volume tambahan negligible.';
            break;
        case 'ph-buffer-setelah-basa':
            inputs = { pKb: 'Nilai pKb', BOH: 'Konsentrasi Basa Lemah Awal ([BOH], M)', BH: 'Konsentrasi Asam Konjugasi Awal ([BH⁺], M)', V: 'Volume Buffer (L)', n_basa: 'Mol Basa Ditambahkan' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHBufferSetelahBasa(pKb, BOH, BH, V, n_basa, null, null, "pH")';
            namaVariabel = 'pH Setelah Penambahan Basa';
            catatan = 'Asumsi volume tambahan negligible.';
            break;
        case 'derajat-ionisasi':
            inputs = { H: 'Konsentrasi [H⁺] (M)', C: 'Molaritas Awal (C, M)' };
            satuanHasil = '';
            fungsiHitung = 'hitungDerajatIonisasi(H, C, "alpha")';
            namaVariabel = 'Derajat Ionisasi (α)';
            break;
        case 'persentase-ionisasi':
            inputs = { H: 'Konsentrasi [H⁺] (M)', C: 'Molaritas Awal (C, M)' };
            satuanHasil = '%';
            fungsiHitung = 'hitungPersenIonisasi(H, C, "persen")';
            namaVariabel = 'Persentase Ionisasi';
            break;
        case 'ph-campuran-larutan':
            inputs = { Ma: 'Molaritas Asam (M)', Va: 'Volume Asam (L)', Mb: 'Molaritas Basa (M)', Vb: 'Volume Basa (L)', valensi_a: 'Valensi Asam', valensi_b: 'Valensi Basa', jenis_asam: 'Jenis Asam (Kuat/Lemah)', jenis_basa: 'Jenis Basa (Kuat/Lemah)', Ka: 'Ka Asam (jika lemah, 0 jika kuat)', Kb: 'Kb Basa (jika lemah, 0 jika kuat)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHCampuran(Ma, Va, Mb, Vb, valensi_a, valensi_b, jenis_asam, jenis_basa, Ka, Kb, "pH")';
            namaVariabel = 'pH Campuran';
            catatan = 'Asumsi titrasi (netralisasi) yang menghasilkan pH, buffer, atau hidrolisis. Masukkan 0 untuk Ka/Kb jika asam/basa Kuat.';
            break;
        case 'titrasi-asam-kuat-basa-kuat':
            inputs = { Ma: 'Molaritas Asam (M)', Va: 'Volume Asam (L)', Mb: 'Molaritas Basa (M)', Vb: 'Volume Basa (L)', valensi_a: 'Valensi Asam', valensi_b: 'Valensi Basa' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHTitrasiKuatKuat(Ma, Va, Mb, Vb, valensi_a, valensi_b, "pH")';
            namaVariabel = 'pH';
            break;
        case 'titrasi-asam-lemah-basa-kuat':
            inputs = { Ma: 'Molaritas Asam (M)', Va: 'Volume Asam (L)', Mb: 'Molaritas Basa (M)', Vb: 'Volume Basa (L)', valensi_a: 'Valensi Asam', valensi_b: 'Valensi Basa', Ka: 'Konstanta Asam (Ka)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHTitrasiLemahKuat(Ma, Va, Mb, Vb, valensi_a, valensi_b, Ka, "pH")';
            namaVariabel = 'pH';
            break;
        case 'titrasi-basa-lemah-asam-kuat':
            inputs = { Ma: 'Molaritas Asam (M)', Va: 'Volume Asam (L)', Mb: 'Molaritas Basa (M)', Vb: 'Volume Basa (L)', valensi_a: 'Valensi Asam', valensi_b: 'Valensi Basa', Kb: 'Konstanta Basa (Kb)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHTitrasiKuatLemah(Ma, Va, Mb, Vb, valensi_a, valensi_b, Kb, "pH")';
            namaVariabel = 'pH';
            break;
        case 'volume-titik-ekivalen':
            inputs = { Ma: 'Molaritas Asam (M)', Va: 'Volume Asam (L)', Mb: 'Molaritas Basa (M)', valensi_a: 'Valensi Asam', valensi_b: 'Valensi Basa' };
            satuanHasil = 'L';
            fungsiHitung = 'hitungVolumeTitikEkivalen(Ma, Va, Mb, valensi_a, valensi_b, "Vb_eq")';
            namaVariabel = 'Volume Ekivalen';
            break;
        case 'ph-titik-ekivalen':
            inputs = { Ma: 'Molaritas Asam (M)', Va: 'Volume Asam (L)', Mb: 'Molaritas Basa (M)', valensi_a: 'Valensi Asam', valensi_b: 'Valensi Basa', jenis_asam: 'Jenis Asam (Kuat/Lemah)', jenis_basa: 'Jenis Basa (Kuat/Lemah)', Ka: 'Ka Asam (jika lemah, 0 jika kuat)', Kb: 'Kb Basa (jika lemah, 0 jika kuat)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHTitikEkivalen(Ma, Va, Mb, valensi_a, valensi_b, jenis_asam, jenis_basa, Ka, Kb, "pH_eq")';
            namaVariabel = 'pH Ekivalen';
            break;
        case 'ph-ekivalen-kuat-kuat':
            inputs = { Ma: 'Molaritas Asam (M)', Va: 'Volume Asam (L)', Mb: 'Molaritas Basa (M)', valensi_a: 'Valensi Asam', valensi_b: 'Valensi Basa' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHEkivalenKuatKuat(Ma, Va, Mb, valensi_a, valensi_b, "pH")';
            namaVariabel = 'pH';
            break;
        case 'ph-ekivalen-lemah-kuat':
            inputs = { Ma: 'Molaritas Asam (M)', Va: 'Volume Asam (L)', Mb: 'Molaritas Basa (M)', valensi_a: 'Valensi Asam', valensi_b: 'Valensi Basa', Ka: 'Konstanta Asam (Ka)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHEkivalenLemahKuat(Ma, Va, Mb, valensi_a, valensi_b, Ka, "pH")';
            namaVariabel = 'pH';
            break;
        case 'ph-ekivalen-kuat-lemah':
            inputs = { Ma: 'Molaritas Asam (M)', Va: 'Volume Asam (L)', Mb: 'Molaritas Basa (M)', valensi_a: 'Valensi Asam', valensi_b: 'Valensi Basa', Kb: 'Konstanta Basa (Kb)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHEkivalenKuatLemah(Ma, Va, Mb, valensi_a, valensi_b, Kb, "pH")';
            namaVariabel = 'pH';
            break;
        case 'ph-ekivalen-lemah-lemah':
            inputs = { Ma: 'Molaritas Asam (M)', Va: 'Volume Asam (L)', Mb: 'Molaritas Basa (M)', valensi_a: 'Valensi Asam', valensi_b: 'Valensi Basa', Ka: 'Konstanta Asam (Ka)', Kb: 'Konstanta Basa (Kb)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPHEkivalenLemahLemah(Ma, Va, Mb, valensi_a, valensi_b, Ka, Kb, "pH")';
            namaVariabel = 'pH';
            break;
        case 'h-dari-ph':
            inputs = { pH: 'Nilai pH' };
            satuanHasil = 'M';
            fungsiHitung = 'hitungHDariPH(pH, "[H⁺]")';
            namaVariabel = '[H⁺]';
            break;
        case 'oh-dari-ph':
            inputs = { pH: 'Nilai pH' };
            satuanHasil = 'M';
            fungsiHitung = 'hitungOHDariPH(pH, "[OH⁻]")';
            namaVariabel = '[OH⁻]';
            break;
        case 'h-dari-poh':
            inputs = { pOH: 'Nilai pOH' };
            satuanHasil = 'M';
            fungsiHitung = 'hitungHDariPOH(pOH, "[H⁺]")';
            namaVariabel = '[H⁺]';
            break;
        case 'oh-dari-poh':
            inputs = { pOH: 'Nilai pOH' };
            satuanHasil = 'M';
            fungsiHitung = 'hitungOHDariPOH(pOH, "[OH⁻]")';
            namaVariabel = '[OH⁻]';
            break;
        case 'pengenceran-asam-kuat':
            inputs = { Ma_awal: 'Molaritas Awal (M)', V_awal: 'Volume Awal (L)', V_akhir: 'Volume Akhir (L)', valensi: 'Valensi Asam' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPengenceranAsamKuat(Ma_awal, V_awal, V_akhir, valensi, "pH")';
            namaVariabel = 'pH Setelah Pengenceran';
            break;
        case 'pengenceran-asam-lemah':
            inputs = { Ma_awal: 'Molaritas Awal (M)', V_awal: 'Volume Awal (L)', V_akhir: 'Volume Akhir (L)', Ka: 'Konstanta Asam (Ka)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPengenceranAsamLemah(Ma_awal, V_awal, V_akhir, Ka, "pH")';
            namaVariabel = 'pH Setelah Pengenceran';
            break;
        case 'pengenceran-basa-kuat':
            inputs = { Mb_awal: 'Molaritas Awal (M)', V_awal: 'Volume Awal (L)', V_akhir: 'Volume Akhir (L)', valensi: 'Valensi Basa' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPengenceranBasaKuat(Mb_awal, V_awal, V_akhir, valensi, "pH")';
            namaVariabel = 'pH Setelah Pengenceran';
            break;
        case 'pengenceran-basa-lemah':
            inputs = { Mb_awal: 'Molaritas Awal (M)', V_awal: 'Volume Awal (L)', V_akhir: 'Volume Akhir (L)', Kb: 'Konstanta Basa (Kb)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPengenceranBasaLemah(Mb_awal, V_awal, V_akhir, Kb, "pH")';
            namaVariabel = 'pH Setelah Pengenceran';
            break;
        case 'pengenceran-buffer':
            inputs = { pKa: 'Nilai pKa', HA: 'Konsentrasi Asam Lemah Awal ([HA], M)', A: 'Konsentrasi Basa Konjugasi Awal ([A⁻], M)', V_awal: 'Volume Awal (L)', V_akhir: 'Volume Akhir (L)' };
            satuanHasil = 'pH';
            fungsiHitung = 'hitungPengenceranBuffer(pKa, HA, A, V_awal, V_akhir, "pH")';
            namaVariabel = 'pH Setelah Pengenceran';
            break;
        default:
            formDiv.innerHTML = '<p class="error">Parameter tidak dikenali. Silakan pilih ulang.</p>';
            return;
    }
}

function hitungPHDasar(H, target) {
    if (target === "pH") {
        return -Math.log10(H);
    }
    throw new Error('Target tidak valid');
}

function hitungPOHDasar(OH, target) {
    if (target === "pOH") {
        return -Math.log10(OH);
    } else if (target === "pH") {
        const pOH = -Math.log10(OH);
        return pKw - pOH;
    }
    throw new Error('Target tidak valid');
}

function hitungHubunganPHPOH(pH, target) {
    if (target === "pOH") {
        return pKw - pH;
    }
    throw new Error('Target tidak valid');
}

function hitungPHAsamKuat(Ma, valensi, target) {
    if (target === "pH") {
        const H = Ma * valensi;
        return hitungPHDasar(H, "pH");
    }
    throw new Error('Target tidak valid');
}

function hitungPHBasaKuat(Mb, valensi, target) {
    if (target === "pH") {
        const OH = Mb * valensi;
        return hitungPOHDasar(OH, "pH");
    }
    throw new Error('Target tidak valid');
}

function hitungPHAsamLemah(Ma, Ka, target) {
    if (target === "pH") {
        const H = Math.sqrt(Ka * Ma);
        return hitungPHDasar(H, "pH");
    }
    throw new Error('Target tidak valid');
}

function hitungPHBasaLemah(Mb, Kb, target) {
    if (target === "pH") {
        const OH = Math.sqrt(Kb * Mb);
        return hitungPOHDasar(OH, "pH");
    }
    throw new Error('Target tidak valid');
}

function hitungHubunganKaKb(Ka, target) {
    if (target === "Kb") {
        return Kw / Ka;
    }
    throw new Error('Target tidak valid');
}

function hitungHubunganPKaPKb(pKa, target) {
    if (target === "pKb") {
        return pKw - pKa;
    }
    throw new Error('Target tidak valid');
}

function hitungKwAir(H, OH, target) {
    if (target === "Kw") {
        return H * OH;
    }
    throw new Error('Target tidak valid');
}

function hitungKaAsamLemah(H, Ma, target) {
    if (target === "Ka") {
        if (Ma <= 0) throw new Error("Molaritas asam ([HA]) harus positif.");
        return (H * H) / Ma;
    }
    throw new Error('Target tidak valid');
}

function hitungKbBasaLemah(OH, Mb, target) {
    if (target === "Kb") {
        if (Mb <= 0) throw new Error("Molaritas basa ([B]) harus positif.");
        return (OH * OH) / Mb;
    }
    throw new Error('Target tidak valid');
}

function hitungPHBufferAsam(pKa, A, HA, target) {
    if (target === "pH") {
        if (HA <= 0) throw new Error("Konsentrasi asam lemah ([HA]) harus positif.");
        return pKa + Math.log10(A / HA);
    }
    throw new Error('Target tidak valid');
}

function hitungPHBufferBasa(pKb, BH, BOH, target) {
    if (target === "pH") {
        if (BOH <= 0) throw new Error("Konsentrasi basa lemah ([BOH]) harus positif.");
        const pOH = pKb + Math.log10(BH / BOH);
        return pKw - pOH;
    }
    throw new Error('Target tidak valid');
}

function hitungDerajatIonisasi(H, C, target) {
    if (target === "alpha") {
        if (C === 0) throw new Error("Molaritas awal (C) tidak boleh nol.");
        return H / C;
    }
    throw new Error('Target tidak valid');
}

function hitungPersenIonisasi(H, C, target) {
    if (target === "persen") {
        const alpha = hitungDerajatIonisasi(H, C, "alpha");
        return alpha * 100;
    }
    throw new Error('Target tidak valid');
}

function hitungPHCampuran(Ma, Va, Mb, Vb, valensi_a, valensi_b, jenis_asam, jenis_basa, Ka, Kb, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (jenis_asam === 'Lemah' && Ka <= 0) throw new Error("Ka untuk Asam Lemah harus positif.");
    if (jenis_basa === 'Lemah' && Kb <= 0) throw new Error("Kb untuk Basa Lemah harus positif.");
    if (jenis_asam === 'Kuat') Ka = null;
    if (jenis_basa === 'Kuat') Kb = null;
    const mol_H_equiv = Ma * Va * valensi_a;
    const mol_OH_equiv = Mb * Vb * valensi_b;
    const V_total = Va + Vb;
    if (jenis_asam === 'Kuat' && jenis_basa === 'Kuat') {
        if (mol_H_equiv > mol_OH_equiv) {
            const mol_H_sisa = mol_H_equiv - mol_OH_equiv;
            const H = mol_H_sisa / V_total;
            return hitungPHDasar(H, "pH");
        } else if (mol_OH_equiv > mol_H_equiv) {
            const mol_OH_sisa = mol_OH_equiv - mol_H_equiv;
            const OH = mol_OH_sisa / V_total;
            return hitungPOHDasar(OH, "pH");
        } else {
            return 7.0;
        }
    } else if (jenis_asam === 'Lemah' && jenis_basa === 'Kuat') {
        if (mol_H_equiv > mol_OH_equiv) {
            const mol_garam = mol_OH_equiv;
            const mol_HA_sisa = mol_H_equiv - mol_OH_equiv;
            const HA = mol_HA_sisa / V_total;
            const A = mol_garam / V_total;
            const pKa = -Math.log10(Ka);
            return pKa + Math.log10(A / HA);
        } else if (mol_OH_equiv > mol_H_equiv) {
            const mol_OH_sisa = mol_OH_equiv - mol_H_equiv;
            const OH = mol_OH_sisa / V_total;
            return hitungPOHDasar(OH, "pH");
        } else {
            const C_garam = mol_OH_equiv / V_total;
            const Kb_hidrolisis = Kw / Ka;
            const OH = Math.sqrt(Kb_hidrolisis * C_garam);
            return hitungPOHDasar(OH, "pH");
        }
    } else if (jenis_asam === 'Kuat' && jenis_basa === 'Lemah') {
        if (mol_H_equiv > mol_OH_equiv) {
            const mol_H_sisa = mol_H_equiv - mol_OH_equiv;
            const H = mol_H_sisa / V_total;
            return hitungPHDasar(H, "pH");
        } else if (mol_OH_equiv > mol_H_equiv) {
            const mol_basa_awal = Mb * Vb;
            const mol_basa_beraksi = mol_H_equiv / valensi_b;
            const mol_basa_sisa = mol_basa_awal - mol_basa_beraksi;
            const Mb_sisa = mol_basa_sisa / V_total;
            return hitungPHBasaLemah(Mb_sisa, Kb, "pH");
        } else {
            const mol_garam = Mb * Vb;
            const C_garam = mol_garam / V_total;
            const Ka_hidrolisis = Kw / Kb;
            const H = Math.sqrt(Ka_hidrolisis * C_garam);
            return hitungPHDasar(H, "pH");
        }
    } else if (jenis_asam === 'Lemah' && jenis_basa === 'Lemah') {
        if (Ka <= 0 || Kb <= 0) throw new Error("Ka dan Kb untuk Asam/Basa Lemah harus positif.");
        const pKa = -Math.log10(Ka);
        const pKb = -Math.log10(Kb);
        const mol_H_equiv = Ma * Va * valensi_a;
        const mol_OH_equiv = Mb * Vb * valensi_b;
        const V_total = Va + Vb;
        if (mol_H_equiv > mol_OH_equiv) {
            const mol_garam = mol_OH_equiv;
            const mol_HA_sisa = mol_H_equiv - mol_OH_equiv;
            if (mol_HA_sisa <= 0) throw new Error("Perhitungan sisa tidak valid.");
            const HA = mol_HA_sisa / V_total;
            const A = mol_garam / V_total;
            return pKa + Math.log10(A / HA);
        } else if (mol_OH_equiv > mol_H_equiv) {
            const mol_garam = mol_H_equiv;
            const mol_BOH_sisa = mol_OH_equiv - mol_H_equiv;
            if (mol_BOH_sisa <= 0) throw new Error("Perhitungan sisa tidak valid.");
            const BOH = mol_BOH_sisa / V_total;
            const BH = mol_garam / V_total;
            const pOH = pKb + Math.log10(BH / BOH);
            return pKw - pOH;
        } else {
            const mol_garam = mol_H_equiv;
            const C_garam = mol_garam / V_total;
            if (C_garam <= 0) throw new Error("Konsentrasi garam tidak valid.");
            const Kb_A = Kw / Ka;
            const Ka_BH = Kw / Kb;
            if (Kb_A > Ka_BH) {
                const OH = Math.sqrt(Kb_A * C_garam);
                return hitungPOHDasar(OH, "pH");
            } else {
                const H = Math.sqrt(Ka_BH * C_garam);
                return hitungPHDasar(H, "pH");
            }
        }
    } else {
        throw new Error('Kombinasi jenis asam/basa tidak didukung.');
    }
}

function hitungPHTitrasiKuatKuat(Ma, Va, Mb, Vb, valensi_a, valensi_b, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (valensi_a <= 0 || valensi_b <= 0) throw new Error("Valensi harus positif.");
    const mol_H = Ma * Va * valensi_a;
    const mol_OH = Mb * Vb * valensi_b;
    const V_total = Va + Vb;
    if (mol_OH < mol_H) {
        const H = (mol_H - mol_OH) / V_total;
        return hitungPHDasar(H, "pH");
    } else if (mol_OH > mol_H) {
        const OH = (mol_OH - mol_H) / V_total;
        return hitungPOHDasar(OH, "pH");
    } else {
        return 7.0;
    }
}

function hitungPHTitrasiLemahKuat(Ma, Va, Mb, Vb, valensi_a, valensi_b, Ka, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (Ka <= 0) throw new Error("Ka harus positif untuk asam lemah.");
    const pKa = -Math.log10(Ka);
    const mol_H_eq = Ma * Va * valensi_a;
    const mol_OH = Mb * Vb * valensi_b;
    const V_total = Va + Vb;
    const f = mol_OH / mol_H_eq;
    if (f < 1) {
        const mol_HA_sisa = Ma * Va * (1 - f);
        const mol_A_sisa = Ma * Va * f;
        const HA = mol_HA_sisa / V_total;
        const A_minus = mol_A_sisa / V_total;
        return pKa + Math.log10(A_minus / HA);
    } else if (f > 1) {
        const Vb_eq = mol_H_eq / (Mb * valensi_b);
        const mol_OH_sisa = Mb * (Vb - Vb_eq);
        const OH = mol_OH_sisa / V_total;
        return hitungPOHDasar(OH, "pH");
    } else {
        const C_salt = Ma * Va / V_total;
        const Kb_salt = Kw / Ka;
        const OH = Math.sqrt(Kb_salt * C_salt);
        return hitungPOHDasar(OH, "pH");
    }
}

function hitungPHTitrasiKuatLemah(Ma, Va, Mb, Vb, valensi_a, valensi_b, Kb, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (Kb <= 0) throw new Error("Kb harus positif untuk basa lemah.");
    const pKb = -Math.log10(Kb);
    const mol_OH_eq = Mb * Vb * valensi_b;
    const mol_H = Ma * Va * valensi_a;
    const V_total = Va + Vb;
    const f = mol_H / mol_OH_eq;
    if (f < 1) {
        const mol_BOH_sisa = Mb * Vb * (1 - f);
        const BOH = mol_BOH_sisa / V_total;
        return hitungPHBasaLemah(BOH, Kb, "pH");
    } else if (f > 1) {
        const mol_H_sisa = mol_H - mol_OH_eq;
        const H = mol_H_sisa / V_total;
        return hitungPHDasar(H, "pH");
    } else {
        const C_salt = Mb * Vb / V_total;
        const Ka_salt = Kw / Kb;
        const H = Math.sqrt(Ka_salt * C_salt);
        return hitungPHDasar(H, "pH");
    }
}

function hitungVolumeTitikEkivalen(Ma, Va, Mb, valensi_a, valensi_b, target) {
    if (target !== "Vb_eq") throw new Error('Target tidak valid');
    if (Mb <= 0 || valensi_b <= 0) throw new Error("Molaritas dan valensi basa harus positif.");
    return (Ma * Va * valensi_a) / (Mb * valensi_b);
}

function hitungPHTitikEkivalen(Ma, Va, Mb, valensi_a, valensi_b, jenis_asam, jenis_basa, Ka, Kb, target) {
    if (target !== "pH_eq") throw new Error('Target tidak valid');
    const V_eq = hitungVolumeTitikEkivalen(Ma, Va, Mb, valensi_a, valensi_b, "Vb_eq");
    return hitungPHCampuran(Ma, Va, Mb, V_eq, valensi_a, valensi_b, jenis_asam, jenis_basa, Ka, Kb, "pH");
}

function hitungHDariPH(pH, target) {
    if (target === "[H⁺]") {
        if (pH < 0 || pH > 14) throw new Error("Nilai pH harus antara 0 dan 14.");
        return Math.pow(10, -pH);
    }
    throw new Error('Target tidak valid');
}

function hitungOHDariPH(pH, target) {
    if (target === "[OH⁻]") {
        const H = hitungHDariPH(pH, "[H⁺]");
        return Kw / H;
    }
    throw new Error('Target tidak valid');
}

function hitungHDariPOH(pOH, target) {
    if (target === "[H⁺]") {
        if (pOH < 0 || pOH > 14) throw new Error("Nilai pOH harus antara 0 dan 14.");
        const pH = pKw - pOH;
        return hitungHDariPH(pH, "[H⁺]");
    }
    throw new Error('Target tidak valid');
}

function hitungOHDariPOH(pOH, target) {
    if (target === "[OH⁻]") {
        if (pOH < 0 || pOH > 14) throw new Error("Nilai pOH harus antara 0 dan 14.");
        return Math.pow(10, -pOH);
    }
    throw new Error('Target tidak valid');
}

function hitungPHEkivalenKuatKuat(Ma, Va, Mb, valensi_a, valensi_b, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    return 7.0;
}

function hitungPHEkivalenLemahKuat(Ma, Va, Mb, valensi_a, valensi_b, Ka, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (Ka <= 0) throw new Error("Ka harus positif.");
    const V_eq = (Ma * Va * valensi_a) / (Mb * valensi_b);
    const C_salt = (Ma * Va) / (Va + V_eq);
    const Kb_salt = Kw / Ka;
    const OH = Math.sqrt(Kb_salt * C_salt);
    return hitungPOHDasar(OH, "pH");
}

function hitungPHEkivalenKuatLemah(Ma, Va, Mb, valensi_a, valensi_b, Kb, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (Kb <= 0) throw new Error("Kb harus positif.");
    const V_eq = (Mb * Vb * valensi_b) / (Ma * valensi_a);
    const C_salt = (Mb * Vb) / (Vb + V_eq);
    const Ka_salt = Kw / Kb;
    const H = Math.sqrt(Ka_salt * C_salt);
    return hitungPHDasar(H, "pH");
}

function hitungPHEkivalenLemahLemah(Ma, Va, Mb, valensi_a, valensi_b, Ka, Kb, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (Ka <= 0 || Kb <= 0) throw new Error("Ka dan Kb harus positif.");
    const V_eq = (Ma * Va * valensi_a) / (Mb * valensi_b);
    const C_salt = (Ma * Va) / (Va + V_eq);
    const Kb_A = Kw / Ka;
    const Ka_BH = Kw / Kb;
    if (Kb_A > Ka_BH) {
        const OH = Math.sqrt(Kb_A * C_salt);
        return hitungPOHDasar(OH, "pH");
    } else {
        const H = Math.sqrt(Ka_BH * C_salt);
        return hitungPHDasar(H, "pH");
    }
}

function hitungKapasitasBufferAsam(pKa, HA, A, V, target) {
    if (target === "beta") {
        if (HA <= 0 || A <= 0 || V <= 0) throw new Error("Konsentrasi dan volume harus positif.");
        const C = HA + A;
        const ratio = A / HA;
        const pH = pKa + Math.log10(ratio);
        const H = Math.pow(10, -pH);
        const Ka = Math.pow(10, -pKa);
        return 2.303 * C * (Ka * H) / Math.pow(Ka + H, 2) * V;
    }
    throw new Error('Target tidak valid');
}

function hitungKapasitasBufferBasa(pKb, BOH, BH, V, target) {
    if (target === "beta") {
        if (BOH <= 0 || BH <= 0 || V <= 0) throw new Error("Konsentrasi dan volume harus positif.");
        const C = BOH + BH;
        const ratio = BH / BOH;
        const pOH = pKb + Math.log10(ratio);
        const OH = Math.pow(10, -pOH);
        const Kb = Math.pow(10, -pKb);
        return 2.303 * C * (Kb * OH) / Math.pow(Kb + OH, 2) * V;
    }
    throw new Error('Target tidak valid');
}

function hitungPHBufferSetelahAsam(pKa, HA, A, V, n_asam, jenis_asam, Ka_asam, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (n_asam < 0) throw new Error("Mol asam ditambahkan harus non-negatif.");
    let mol_HA = HA * V;
    let mol_A = A * V;
    mol_HA += n_asam;
    mol_A -= n_asam;
    if (mol_A < 0) throw new Error("Buffer habis (A⁻ terlalu sedikit)");
    const HA_baru = mol_HA / V;
    const A_baru = mol_A / V;
    return pKa + Math.log10(A_baru / HA_baru);
}

function hitungPHBufferSetelahBasa(pKb, BOH, BH, V, n_basa, jenis_basa, Kb_basa, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (n_basa < 0) throw new Error("Mol basa ditambahkan harus non-negatif.");
    let mol_BOH = BOH * V;
    let mol_BH = BH * V;
    mol_BOH += n_basa;
    mol_BH -= n_basa;
    if (mol_BH < 0) throw new Error("Buffer habis (BH⁺ terlalu sedikit)");
    const BOH_baru = mol_BOH / V;
    const BH_baru = mol_BH / V;
    const pOH = pKb + Math.log10(BH_baru / BOH_baru);
    return pKw - pOH;
}

function hitungPengenceranAsamKuat(Ma_awal, V_awal, V_akhir, valensi, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (V_akhir <= V_awal) throw new Error("Volume akhir harus lebih besar dari awal.");
    const Ma_akhir = (Ma_awal * V_awal) / V_akhir;
    const H = Ma_akhir * valensi;
    return hitungPHDasar(H, "pH");
}

function hitungPengenceranAsamLemah(Ma_awal, V_awal, V_akhir, Ka, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (V_akhir <= V_awal) throw new Error("Volume akhir harus lebih besar dari awal.");
    const Ma_akhir = (Ma_awal * V_awal) / V_akhir;
    return hitungPHAsamLemah(Ma_akhir, Ka, "pH");
}

function hitungPengenceranBasaKuat(Mb_awal, V_awal, V_akhir, valensi, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (V_akhir <= V_awal) throw new Error("Volume akhir harus lebih besar dari awal.");
    const Mb_akhir = (Mb_awal * V_awal) / V_akhir;
    const OH = Mb_akhir * valensi;
    return hitungPOHDasar(OH, "pH");
}

function hitungPengenceranBasaLemah(Mb_awal, V_awal, V_akhir, Kb, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (V_akhir <= V_awal) throw new Error("Volume akhir harus lebih besar dari awal.");
    const Mb_akhir = (Mb_awal * V_awal) / V_akhir;
    return hitungPHBasaLemah(Mb_akhir, Kb, "pH");
}

function hitungPengenceranBuffer(pKa, HA, A, V_awal, V_akhir, target) {
    if (target !== "pH") throw new Error('Target tidak valid');
    if (V_akhir <= V_awal) throw new Error("Volume akhir harus lebih besar dari awal.");
    const HA_akhir = (HA * V_awal) / V_akhir;
    const A_akhir = (A * V_awal) / V_akhir;
    return pKa + Math.log10(A_akhir / HA_akhir);
}

document.addEventListener('DOMContentLoaded', () => {
    const selectTopik = document.getElementById('pilih-topik');
    if (selectTopik) {
        selectTopik.onchange = tampilkanKalkulator;
    }
});