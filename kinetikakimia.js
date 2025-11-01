const R_J = 8.314; 
const ln2 = 0.69314718; 


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

let configPerhitungan = {};



function tampilkanKalkulator() {
    const topik = document.getElementById('pilih-topik').value;
    const kalkulatorArea = document.getElementById('kalkulator-area');
    kalkulatorArea.innerHTML = '';

    if (topik) {
        const selectParam = document.createElement('select');
        selectParam.id = 'pilih-parameter';
        selectParam.onchange = () => buatFormKalkulasi(topik);

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '--Pilih Parameter yang Dicari--';
        selectParam.appendChild(defaultOption);

        const opsi = getOpsiParameter(topik);
        for (const [nilai, teks] of Object.entries(opsi)) {
            const option = document.createElement('option');
            option.value = nilai;
            option.textContent = teks;
            selectParam.appendChild(option);
        }

        const label = document.createElement('label');
        label.setAttribute('for', 'pilih-parameter');
        label.textContent = 'Pilih Parameter yang Dicari:';

        kalkulatorArea.appendChild(label);
        kalkulatorArea.appendChild(selectParam);
        kalkulatorArea.appendChild(document.createElement('hr'));

        const formDiv = document.createElement('div');
        formDiv.id = 'form-kalkulasi';
        kalkulatorArea.appendChild(formDiv);

        const hasilDiv = document.createElement('div');
        hasilDiv.id = 'hasil-kalkulasi';
        hasilDiv.className = 'referensi-bangun-datar';
        hasilDiv.style.marginTop = '20px';
        kalkulatorArea.appendChild(hasilDiv);

        document.addEventListener('keydown', handleEnterKey);
    } else {
        document.removeEventListener('keydown', handleEnterKey);
    }
}

function getOpsiParameter(topik) {
    
    const normalizedTopik = topik.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '').replace(/\(.*?\)/g, '');
    
    switch (normalizedTopik) {
        
        case 'laju-reaksi':
        case 'laju-rata-rata':
        case 'laju-seketika':
        case 'hubungan-laju-stoikiometri':
            return { 
                'r-laju-reaksi': 'Laju Reaksi (r)', 
                'r-rata-rata': 'Laju Rata-Rata (r)', 
                'r-sesaat': 'Laju Sesaat (r)', 
                'rA-dari-rB': 'Laju Reaktan A dari Laju Reaktan B (rA)' 
            };

        
        case 'persamaan-laju':
            return { 'r-hukum-laju': 'Laju Reaksi dari Hukum Laju (r)', 'm-parsial': 'Orde Parsial (m)', 'orde-total': 'Orde Total', 'm-log-orde': 'Orde Parsial dari Data (m)', 'k-laju': 'Konstanta Laju (k)' };
        case 'orde-reaksi':
            return { 'orde-total': 'Orde Total', 'm-parsial': 'Orde Parsial (m)' };
        case 'penentuan-orde-reaksi':
            return { 'm-log-orde': 'Orde Parsial dari Data (m)' };
        case 'konstanta-laju':
            return { 'k-laju': 'Konstanta Laju (k)' };

        
        case 'orde-nol':
            return { '[A]-orde-nol': 'Konsentrasi Akhir ([A])', 'k-orde-nol': 'Konstanta Laju (k)', 't1/2-orde-nol': 'Waktu Paruh (t½)' };
        case 'orde-satu':
            return { '[A]-orde-satu': 'Konsentrasi Akhir ([A])', 'k-orde-satu': 'Konstanta Laju (k)', 't1/2-orde-satu': 'Waktu Paruh (t½)' };
        case 'orde-dua':
            return { '1/[A]-orde-dua': 'Invers Konsentrasi Akhir (1/[A])', 'k-orde-dua': 'Konstanta Laju (k)', 't1/2-orde-dua': 'Waktu Paruh (t½)' };
        case 'waktu-paruh':
            return { 't1/2-dari-k-dan-[A]0': 'Waktu Paruh (t½) Semua Orde' };

        
        case 'persamaan-arrhenius':
            return { 'k-arrhenius': 'Konstanta Laju (k)', 'ln-k': 'ln k' };
        case 'energi-aktivasi':
            return { 'Ea-arrhenius': 'Energi Aktivasi (Ea)', 'Ea-dua-titik': 'Ea dari Dua Suhu' };
        case 'konstanta-laju-suhu':
            return { 'k2-dari-arrhenius': 'Konstanta Laju Baru (k2)', 'ln-k2/k1': 'ln(k2/k1)' };
        case 'log-k1-k2':
            return { 'ln-k2/k1': 'ln(k2/k1)' };

        
        case 'reaksi-elementer':
        case 'molekularitas':
            return { 'r-langkah-lambat': 'Laju Langkah Elementer (r)', 'jenis-molekularitas': 'Jenis Molekularitas', 'Kc-dari-k1-k-1': 'Konstanta Kesetimbangan (Kc)' };
        case 'reaksi-langkah-maju-mundur':
            return { 'Kc-dari-k1-k-1': 'Konstanta Kesetimbangan (Kc)' };
        case 'reaksi-kesetimbangan-dinamis':
            return { 'Kc-dari-k1-k-1': 'Konstanta Kesetimbangan (Kc)' };

        
        case 'konsentrasi':
            return { 
                'rasio-konsentrasi': 'Rasio Laju Reaksi dari Perubahan Konsentrasi (r2/r1)'
            };
        case 'suhu':
            return {
                'k2-dari-arrhenius': 'Konstanta Laju Baru (k2) dari Perubahan Suhu'
            };
        case 'luas-permukaan':
            return {
                'rasio-luas': 'Rasio Laju dari Perubahan Luas Permukaan (r2/r1)'
            };
        case 'katalis':
            return {
                'Ea-katalis-pengurangan': 'Pengurangan Ea oleh Katalis' 
            };
        
        case 'tekanan':
            return {
                'rasio-tekanan': 'Rasio Laju Reaksi dari Perubahan Tekanan (r2/r1)'
            };
        default:
            return {};
    }
}

function buatFormKalkulasi(topik) {
    const parameter = document.getElementById('pilih-parameter').value;
    const formDiv = document.getElementById('form-kalkulasi');
    const hasilDiv = document.getElementById('hasil-kalkulasi');
    formDiv.innerHTML = '';
    hasilDiv.innerHTML = '';

    if (!parameter) return;

    let inputs = {};
    let satuanHasil = '';
    let fungsiHitung = '';
    let namaVariabel = '';
    let keteranganRumus = '';

    
    switch (parameter) {
        
        case 'r-laju-reaksi':
            inputs = { dZ: 'Perubahan konsentrasi (Delta [Z], mol/L)', dt: 'Perubahan waktu (Delta t, s)' };
            satuanHasil = 'mol/L·s';
            fungsiHitung = 'hitungLajuReaksiUmum(dZ, dt, "r")';
            namaVariabel = 'r';
            keteranganRumus = 'r = Δ[Z] / Δt';
            break;
        case 'r-rata-rata':
            inputs = { dZ: 'Perubahan konsentrasi (Delta [Z], mol/L)', dt: 'Perubahan waktu (Delta t, s)' };
            satuanHasil = 'mol/L·s';
            fungsiHitung = 'hitungLajuReaksiUmum(dZ, dt, "r")';
            namaVariabel = 'r rata-rata';
            keteranganRumus = 'r = Δ[Z] / Δt';
            break;
        case 'r-sesaat':
            inputs = { dZ_dt: 'Nilai Turunan d[Z]/dt (mol/L·s)' };
            satuanHasil = 'mol/L·s';
            fungsiHitung = 'dZ_dt';
            namaVariabel = 'r sesaat';
            keteranganRumus = 'r = d[Z]/dt';
            break;
        case 'rA-dari-rB':
            inputs = { 
                a: 'Koefisien stoikiometri A (a, tanpa tanda negatif)', 
                b: 'Koefisien stoikiometri B (b, tanpa tanda negatif)', 
                rB: 'Laju konsumsi B (-d[B]/dt, mol/L·s)' 
            };
            satuanHasil = 'mol/L·s';
            fungsiHitung = 'hitungHubunganLajuStoikiometri(a, b, rB, "rA")';
            namaVariabel = 'rA (-d[A]/dt)';
            keteranganRumus = 'rA = (a/b) × rB';
            break;

        
        case 'r-hukum-laju':
            inputs = { k: 'Konstanta Laju (k)', A: '[A] (mol/L)', m: 'Orde m', B: '[B] (mol/L)', n: 'Orde n' };
            satuanHasil = 'tergantung orde';
            fungsiHitung = 'hitungHukumLaju(k, A, m, B, n, "r")';
            namaVariabel = 'r';
            keteranganRumus = 'r = k[A]^m[B]^n';
            break;
        case 'm-parsial':
        case 'm-log-orde':
            inputs = { r1: 'Laju 1 (r1)', r2: 'Laju 2 (r2)', A1: '[A]1', A2: '[A]2' };
            satuanHasil = '';
            fungsiHitung = 'hitungOrdeParsial(r1, r2, A1, A2, "m")';
            namaVariabel = 'm';
            keteranganRumus = 'm = log(r1/r2) / log([A]1/[A]2)';
            break;
        case 'orde-total':
            inputs = { m: 'Orde m', n: 'Orde n' };
            satuanHasil = '';
            fungsiHitung = 'm + n';
            namaVariabel = 'Orde Total';
            keteranganRumus = 'Orde Total = m + n';
            break;
        case 'k-laju':
            inputs = { r: 'Laju Reaksi (r)', A: '[A] (mol/L)', m: 'Orde m', B: '[B] (mol/L)', n: 'Orde n' };
            satuanHasil = 'tergantung orde';
            fungsiHitung = 'hitungKonstantaLaju(r, A, m, B, n, "k")';
            namaVariabel = 'k';
            keteranganRumus = 'k = r / ([A]^m[B]^n)';
            break;

        
        
        case '[A]-orde-nol':
            inputs = { A0: '[A]0 (mol/L)', k: 'k (mol/L·s)', t: 't (s)' };
            satuanHasil = 'mol/L';
            fungsiHitung = 'hitungOrdeNol(A0, k, t, "[A]")';
            namaVariabel = '[A]';
            keteranganRumus = '[A] = [A]0 - k t';
            break;
        case 'k-orde-nol':
            inputs = { A0: '[A]0 (mol/L)', A: '[A] (mol/L)', t: 't (s)' };
            satuanHasil = 'mol/L·s';
            fungsiHitung = 'hitungOrdeNol(A0, A, t, "k")';
            namaVariabel = 'k';
            keteranganRumus = 'k = ([A]0 - [A]) / t';
            break;
        case 't1/2-orde-nol':
            inputs = { A0: '[A]0 (mol/L)', k: 'k (mol/L·s)' };
            satuanHasil = 's';
            fungsiHitung = 'hitungWaktuParuhOrdeNol(A0, k, "t1/2")';
            namaVariabel = 't½';
            keteranganRumus = 't½ = [A]0 / 2k';
            break;

        
        case '[A]-orde-satu':
            inputs = { A0: '[A]0 (mol/L)', k: 'k (s^-1)', t: 't (s)' };
            satuanHasil = 'mol/L';
            fungsiHitung = 'hitungOrdeSatu(A0, k, t, "[A]")';
            namaVariabel = '[A]';
            keteranganRumus = '[A] = [A]0 e^(-kt)';
            break;
        case 'k-orde-satu':
            inputs = { A0: '[A]0 (mol/L)', A: '[A] (mol/L)', t: 't (s)' };
            satuanHasil = 's^-1';
            fungsiHitung = 'hitungOrdeSatu(A0, A, t, "k")';
            namaVariabel = 'k';
            keteranganRumus = 'k = (ln[A]0 - ln[A]) / t';
            break;
        case 't1/2-orde-satu':
            inputs = { k: 'k (s^-1)' };
            satuanHasil = 's';
            fungsiHitung = 'hitungWaktuParuhOrdeSatu(k, null, "t1/2")';
            namaVariabel = 't½';
            keteranganRumus = 't½ = 0.693 / k';
            break;

        
        case '1/[A]-orde-dua':
            inputs = { invA0: '1/[A]0 (L/mol)', k: 'k (L/mol·s)', t: 't (s)' };
            satuanHasil = 'L/mol';
            fungsiHitung = 'hitungOrdeDua(invA0, k, t, "1/[A]")';
            namaVariabel = '1/[A]';
            keteranganRumus = '1/[A] = 1/[A]0 + k t';
            break;
        case 'k-orde-dua':
            inputs = { invA0: '1/[A]0 (L/mol)', invA: '1/[A] (L/mol)', t: 't (s)' };
            satuanHasil = 'L/mol·s';
            fungsiHitung = 'hitungOrdeDua(invA0, invA, t, "k")';
            namaVariabel = 'k';
            keteranganRumus = 'k = (1/[A] - 1/[A]0) / t';
            break;
        case 't1/2-orde-dua':
            inputs = { k: 'k (L/mol·s)', A0: '[A]0 (mol/L)' };
            satuanHasil = 's';
            fungsiHitung = 'hitungWaktuParuhOrdeDua(k, A0, "t1/2")';
            namaVariabel = 't½';
            keteranganRumus = 't½ = 1 / (k[A]0)';
            break;
        case 't1/2-dari-k-dan-[A]0':
            inputs = { k: 'k', A0: '[A]0', orde: 'Orde Reaksi (0, 1, atau 2)' };
            satuanHasil = 's';
            fungsiHitung = 'hitungWaktuParuhTotal(k, A0, orde, "t1/2")';
            namaVariabel = 't½';
            keteranganRumus = 'Rumus t½ berdasarkan orde';
            break;

        
        case 'k-arrhenius':
            inputs = { A: 'Faktor Frekuensi (A)', Ea: 'Ea (J/mol)', T: 'Suhu (T, K)' };
            satuanHasil = 'tergantung orde';
            fungsiHitung = 'hitungKonstantaLajuArrhenius(A, Ea, T, "k")';
            namaVariabel = 'k';
            keteranganRumus = 'k = A · e^(-Ea/RT)';
            break;
        case 'ln-k':
            inputs = { A: 'ln A', Ea: 'Ea (J/mol)', invT: '1/T (K^-1)' };
            satuanHasil = '';
            fungsiHitung = 'hitungLnKArrhenius(A, Ea, invT, "ln_k")';
            namaVariabel = 'ln k';
            keteranganRumus = 'ln k = ln A - (Ea/R) · (1/T)';
            break;
        case 'Ea-arrhenius':
            inputs = { k: 'ln k', A: 'ln A', invT: '1/T (K^-1)' };
            satuanHasil = 'J/mol';
            fungsiHitung = 'hitungEaDariArrhenius(k, A, invT, "Ea")';
            namaVariabel = 'Ea';
            keteranganRumus = 'Ea = R · (ln A - ln k) / (1/T)';
            break;
        case 'Ea-dua-titik':
            inputs = { k1: 'k1', k2: 'k2', T1: 'T1 (K)', T2: 'T2 (K)' };
            satuanHasil = 'J/mol';
            fungsiHitung = 'hitungEaDuaTitik(k1, k2, T1, T2, "Ea")';
            namaVariabel = 'Ea';
            keteranganRumus = 'Ea = (R · ln(k2/k1)) / (1/T1 - 1/T2)';
            break;
        case 'ln-k2/k1':
            inputs = { Ea: 'Ea (J/mol)', T1: 'T1 (K)', T2: 'T2 (K)' };
            satuanHasil = '';
            fungsiHitung = 'hitungLnRatioK(Ea, T1, T2, "ln_ratio")';
            namaVariabel = 'ln(k2/k1)';
            keteranganRumus = 'ln(k2/k1) = (Ea/R) · (1/T1 - 1/T2)';
            break;
        case 'k2-dari-arrhenius':
            inputs = { k1: 'k1', Ea: 'Ea (J/mol)', T1: 'T1 (K)', T2: 'T2 (K)' };
            satuanHasil = 'tergantung orde';
            fungsiHitung = 'hitungK2DariArrhenius(k1, Ea, T1, T2, "k2")';
            namaVariabel = 'k2';
            keteranganRumus = 'k2 = k1 · exp[(Ea/R) · (1/T1 - 1/T2)]';
            break;

        
        case 'r-langkah-lambat':
            inputs = { k: 'Konstanta Laju (k)', A: '[A]', x: 'Koefisien x', B: '[B]', y: 'Koefisien y' };
            satuanHasil = 'mol/L·s';
            fungsiHitung = 'hitungHukumLaju(k, A, x, B, y, "r")';
            namaVariabel = 'r';
            keteranganRumus = 'r = k[A]^x[B]^y (dari langkah lambat)';
            break;
        case 'jenis-molekularitas':
            inputs = { num_partikel: 'Jumlah partikel pereaksi dalam langkah elementer' };
            satuanHasil = '';
            fungsiHitung = 'tentukanMolekularitas(num_partikel, "molekularitas")';
            namaVariabel = 'Molekularitas';
            keteranganRumus = '1: Unimolekular, 2: Bimolekular, 3: Termolekular';
            break;
        case 'Kc-dari-k1-k-1':
            inputs = { k1: 'k maju', km1: 'k mundur' };
            satuanHasil = '';
            fungsiHitung = 'hitungKcDariKonstantaLaju(k1, km1, "Kc")';
            namaVariabel = 'Kc';
            keteranganRumus = 'Kc = k1 / k-1';
            break;

        
        case 'rasio-konsentrasi':
            inputs = { A1: '[A]1', A2: '[A]2', m: 'Orde m' };
            satuanHasil = 'rasio';
            fungsiHitung = 'hitungRasioLaju(A1, A2, m, "rasio")';
            namaVariabel = 'r2/r1';
            keteranganRumus = 'r2/r1 = ([A]2/[A]1)^m';
            break;
        case 'rasio-tekanan': 
            inputs = { P1: 'Tekanan Awal (P1, atm)', P2: 'Tekanan Akhir (P2, atm)', n: 'Orde Reaksi (n)' };
            satuanHasil = 'rasio';
            fungsiHitung = 'hitungRasioLajuTekanan(P1, P2, n, "rasio")';
            namaVariabel = 'r2/r1';
            keteranganRumus = 'r2/r1 = (P2/P1)^n';
            break;
        case 'rasio-luas':
            inputs = { S1: 'Luas Permukaan Awal (S1, cm²)', S2: 'Luas Permukaan Akhir (S2, cm²)' };
            satuanHasil = 'rasio';
            fungsiHitung = 'S2 / S1';
            namaVariabel = 'r2/r1';
            keteranganRumus = 'r2/r1 = S2 / S1 (untuk reaksi dependen luas permukaan)';
            break;
        case 'Ea-katalis-pengurangan':
            inputs = { Ea_tanpa: 'Ea tanpa katalis (J/mol)', Ea_dengan: 'Ea dengan katalis (J/mol)' };
            satuanHasil = 'J/mol';
            fungsiHitung = 'Ea_tanpa - Ea_dengan';
            namaVariabel = 'Pengurangan Ea';
            keteranganRumus = 'ΔEa = Ea(tanpa) - Ea(dengan)';
            break;

        default:
            return;
    }

    
    configPerhitungan = { fungsiHitung, satuanHasil, namaVariabel, keteranganRumus };

    
    const form = document.createElement('form');
    form.id = 'kalkulator-form';
    form.onsubmit = (e) => { e.preventDefault(); prosesPerhitungan(); };

    for (const [key, labelText] of Object.entries(inputs)) {
        const label = document.createElement('label');
        label.setAttribute('for', key);
        label.textContent = labelText + ': ';

        let input;
        
        if (key === 'orde' || key === 'num_partikel' || key === 'm' || key === 'n' || key === 'x' || key === 'y' || key.includes('mass')) {
            input = document.createElement('input');
            input.type = 'text'; 
        } else {
            input = document.createElement('input');
            input.type = 'text'; 
        }
        input.id = key;
        input.name = key;
        input.required = true;

        
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                
                const hasilDiv = document.getElementById('hasil-kalkulasi');
                if (hasilDiv && hasilDiv.innerHTML.trim() !== '') {
                    hasilDiv.innerHTML = '';
                }
            }
        });

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    }

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Hitung';
    form.appendChild(submitBtn);

    formDiv.appendChild(form);
}

function prosesPerhitungan() {
    const form = document.getElementById('kalkulator-form');
    const formData = new FormData(form);
    const nilaiInput = {};
    let allInputsValid = true;

    const { fungsiHitung, satuanHasil, namaVariabel, keteranganRumus } = configPerhitungan;

    for (const [key, value] of formData.entries()) {
        const inputElement = document.getElementById(key);
        if (inputElement && inputElement.required) {
            let parsedValue;
            const trimmedValue = value.trim();

            
            
            
            const isPotentialMassInput = key.toLowerCase().includes('mass') || key.toLowerCase() === 'm';

            if (isPotentialMassInput) {
                const mass = getAtomicMass(trimmedValue);
                if (mass !== null) {
                    parsedValue = mass; 
                } else {
                    parsedValue = parseFloat(trimmedValue); 
                }
            } else {
                
                parsedValue = parseFloat(trimmedValue);
            }

            
            if (!isNaN(parseFloat(trimmedValue))) {
                 parsedValue = parseFloat(trimmedValue);
            } else if (isPotentialMassInput) {
                 
            } else if (trimmedValue.length > 0) {
                 
                 parsedValue = trimmedValue; 
            } else {
                 allInputsValid = false;
                 break;
            }
            
            if (typeof parsedValue === 'number' && isNaN(parsedValue)) {
                 allInputsValid = false;
                 break;
            }

            nilaiInput[key] = parsedValue;
        } else {
            allInputsValid = false;
            break;
        }
    }

    const hasilDiv = document.getElementById('hasil-kalkulasi');
    hasilDiv.innerHTML = '';
    hasilDiv.classList.remove('error');

    if (!allInputsValid) {
        hasilDiv.innerHTML = '<p class="error">⚠️ Mohon isi semua kolom input dengan data yang valid. Jika memasukkan simbol, gunakan simbol unsur yang benar (misal: Na, C, H).</p>';
        return;
    }

    try {
        let hasilNumerik;
        let finalFunctionCall = fungsiHitung;

        if (fungsiHitung.match(/^\w+ \+ \w+$/) || fungsiHitung.match(/^\w+ \- \w+$/) || fungsiHitung.match(/^\w+ \/ \w+$/) || fungsiHitung.match(/^\w+$/)) {
            let evaluableString = fungsiHitung;
            for (const key in nilaiInput) {
                const regex = new RegExp(`\\b${key}\\b`, 'g');
                evaluableString = evaluableString.replace(regex, nilaiInput[key]);
            }
            hasilNumerik = eval(evaluableString);
        } else {
            const argsMatch = fungsiHitung.match(/\((.*?)\)/);
            
            if (argsMatch && argsMatch[1]) {
                const argNames = argsMatch[1].split(',').map(arg => arg.trim()); 
                
                const argValues = argNames.map(name => {
                    if (name.startsWith('"') && name.endsWith('"')) return name;
                    if (name === 'null') return 'null';
                    if (nilaiInput.hasOwnProperty(name)) {
                        const val = nilaiInput[name];
                        return typeof val === 'string' ? `"${val}"` : JSON.stringify(val); 
                    }
                    return 'null';
                });

                const funcName = fungsiHitung.substring(0, fungsiHitung.indexOf('('));
                finalFunctionCall = `${funcName}(${argValues.join(', ')})`;
            }

            hasilNumerik = eval(finalFunctionCall);
        }
        
        if (typeof hasilNumerik === 'string' && hasilNumerik.startsWith('Error:')) {
            throw new Error(hasilNumerik.replace('Error: ', ''));
        }

        if (!isFinite(hasilNumerik) && typeof hasilNumerik !== 'string') {
            throw new Error('Hasil perhitungan tidak valid (NaN atau Infinity). Periksa kembali input Anda.');
        }

        let formatted_fx = hasilNumerik;
        if (typeof hasilNumerik === 'number') {
            if (Math.abs(hasilNumerik) > 1e6 || (Math.abs(hasilNumerik) !== 0 && Math.abs(hasilNumerik) < 1e-4)) {
                formatted_fx = hasilNumerik.toPrecision(6);
            } else {
                formatted_fx = hasilNumerik.toFixed(6).replace(/\.?0+$/, '');
            }
        }

        hasilDiv.innerHTML = `
            <h2>Hasil Perhitungan</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr style="background-color: #0b2c66; color: white;">
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai Hasil (Satuan)</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 10px;">${namaVariabel}</td>
                    <td style="border: 1px solid #ccc; padding: 10px;">${formatted_fx} ${satuanHasil}</td>
                </tr>
            </table>
        `;

        
        const inputFields = document.querySelectorAll('#kalkulator-form input');
        inputFields.forEach(input => {
            input.value = '';
        });

    } catch (e) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `<h3>⚠️ Error Perhitungan!</h3><p>Terjadi kesalahan saat memproses data:</p>
            <p style="font-weight: bold;">${e.message}</p>
            <p>Pastikan semua variabel sudah terisi dengan data yang valid dan sesuai dengan konteks rumus yang dipilih.</p>`;
    }
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        const target = event.target;
        if (target.tagName === 'INPUT' && target.closest('#kalkulator-form')) {
            const value = target.value.trim();
            if (value !== '') {
                
                const inputs = Array.from(document.querySelectorAll('#kalkulator-form input[type="text"]'));
                const currentIndex = inputs.indexOf(target);
                if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
                    
                    inputs[currentIndex + 1].focus();
                    event.preventDefault();
                    return;
                }
            }
            
            const form = document.getElementById('kalkulator-form');
            if (form) {
                event.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        }
    }
}



function hitungLajuReaksiUmum(dZ, dt, target) {
    if (target === "r") {
        if (dt === 0) throw new Error("Perubahan waktu (Delta t) tidak boleh nol.");
        return dZ / dt;
    }
    throw new Error('Target tidak valid');
}

function hitungHubunganLajuStoikiometri(a, b, rB, target) {
    if (target === "rA") {
        if (b === 0) throw new Error("Koefisien b tidak boleh nol.");
        if (a <= 0 || b <= 0) throw new Error("Koefisien stoikiometri harus positif.");
        return (a / b) * rB;
    }
    throw new Error('Target tidak valid');
}


function hitungHukumLaju(k, A, m, B, n, target) {
    if (target === "r") {
        return k * Math.pow(A, m) * Math.pow(B, n);
    }
    throw new Error('Target tidak valid');
}

function hitungOrdeParsial(r1, r2, A1, A2, target) {
    if (target === "m") {
        if (r2 === 0 || A2 === 0 || A1 === A2) throw new Error("Laju, konsentrasi, atau rasio konsentrasi tidak valid.");
        const ratio_r = r1 / r2;
        const ratio_A = A1 / A2;
        if (ratio_A <= 0) throw new Error("Rasio konsentrasi ([A]1/[A]2) harus positif.");

        return Math.log(ratio_r) / Math.log(ratio_A);
    }
    throw new Error('Target tidak valid');
}

function hitungKonstantaLaju(r, A, m, B, n, target) {
    if (target === "k") {
        const konsentrasi_orde = Math.pow(A, m) * Math.pow(B, n);
        if (konsentrasi_orde === 0) throw new Error("Pembagi ([A]^m[B]^n) tidak boleh nol.");
        return r / konsentrasi_orde;
    }
    throw new Error('Target tidak valid');
}


function hitungOrdeNol(A0, var2, var3, target) {
    if (target === "[A]") {
        const k = var2, t = var3;
        const A = A0 - k * t;
        if (A < 0) throw new Error("Konsentrasi akhir negatif (reaksi sudah selesai).");
        return A;
    } else if (target === "k") {
        const A = var2, t = var3;
        if (t === 0) throw new Error("Waktu (t) tidak boleh nol.");
        return (A0 - A) / t;
    }
    throw new Error('Target tidak valid');
}

function hitungWaktuParuhOrdeNol(A0, k, target) {
    if (target === "t1/2") {
        if (k === 0) throw new Error("Konstanta laju (k) tidak boleh nol.");
        return A0 / (2 * k);
    }
    throw new Error('Target tidak valid');
}

function hitungOrdeSatu(A0, var2, var3, target) {
    if (target === "[A]") {
        const k = var2, t = var3;
        return A0 * Math.exp(-k * t);
    } else if (target === "k") {
        const A = var2, t = var3;
        if (t === 0) throw new Error("Waktu (t) tidak boleh nol.");
        if (A0 <= 0 || A <= 0) throw new Error("Konsentrasi harus positif.");
        return (Math.log(A0) - Math.log(A)) / t;
    }
    throw new Error('Target tidak valid');
}

function hitungWaktuParuhOrdeSatu(k, _, target) {
    if (target === "t1/2") {
        if (k === 0) throw new Error("Konstanta laju (k) tidak boleh nol.");
        return ln2 / k;
    }
    throw new Error('Target tidak valid');
}

function hitungOrdeDua(invA0, var2, var3, target) {
    if (target === "1/[A]") {
        const k = var2, t = var3;
        return invA0 + k * t;
    } else if (target === "k") {
        const invA = var2, t = var3;
        if (t === 0) throw new Error("Waktu (t) tidak boleh nol.");
        return (invA - invA0) / t;
    }
    throw new Error('Target tidak valid');
}

function hitungWaktuParuhOrdeDua(k, A0, target) {
    if (target === "t1/2") {
        if (k === 0 || A0 === 0) throw new Error("k atau [A]0 tidak boleh nol.");
        return 1 / (k * A0);
    }
    throw new Error('Target tidak valid');
}

function hitungWaktuParuhTotal(k, A0, orde, target) {
    if (target === "t1/2") {
        const ordeNum = parseInt(orde);
        if (ordeNum == 0) return hitungWaktuParuhOrdeNol(A0, k, "t1/2");
        if (ordeNum == 1) return hitungWaktuParuhOrdeSatu(k, A0, "t1/2");
        if (ordeNum == 2) return hitungWaktuParuhOrdeDua(k, A0, "t1/2");
        throw new Error('Orde harus 0, 1, atau 2.');
    }
    throw new Error('Target tidak valid');
}


function hitungKonstantaLajuArrhenius(A, Ea, T, target) {
    if (target === "k") {
        if (T === 0) throw new Error("Suhu (T) tidak boleh nol.");
        return A * Math.exp(-Ea / (R_J * T));
    }
    throw new Error('Target tidak valid');
}

function hitungLnKArrhenius(lnA, Ea, invT, target) {
    if (target === "ln_k") {
        return lnA - (Ea / R_J) * invT;
    }
    throw new Error('Target tidak valid');
}

function hitungEaDariArrhenius(ln_k, ln_A, invT, target) {
    if (target === "Ea") {
        if (invT === 0) throw new Error("1/T tidak boleh nol.");
        return R_J * (ln_A - ln_k) / invT;
    }
    throw new Error('Target tidak valid');
}

function hitungEaDuaTitik(k1, k2, T1, T2, target) {
    if (target === "Ea") {
        if (T1 === 0 || T2 === 0 || T1 === T2) throw new Error("Suhu (T) tidak boleh nol atau sama.");
        if (k1 <= 0 || k2 <= 0) throw new Error("Konstanta laju (k) harus positif.");

        const diff_inv_T = (1 / T1 - 1 / T2);
        if (diff_inv_T === 0) throw new Error("Perbedaan 1/T1 dan 1/T2 tidak boleh nol.");
        
        return (R_J * Math.log(k2 / k1)) / diff_inv_T;
    }
    throw new Error('Target tidak valid');
}

function hitungLnRatioK(Ea, T1, T2, target) {
    if (target === "ln_ratio") {
        if (T1 === 0 || T2 === 0) throw new Error("Suhu (T) tidak boleh nol.");
        return (Ea / R_J) * (1 / T1 - 1 / T2);
    }
    throw new Error('Target tidak valid');
}

function hitungK2DariArrhenius(k1, Ea, T1, T2, target) {
    if (target === "k2") {
        if (T1 === 0 || T2 === 0) throw new Error("Suhu (T) tidak boleh nol.");
        const exponent = (Ea / R_J) * (1 / T1 - 1 / T2);
        return k1 * Math.exp(exponent);
    }
    throw new Error('Target tidak valid');
}


function tentukanMolekularitas(num_partikel, target) {
    if (target === "molekularitas") {
        const np = parseInt(num_partikel);
        if (np === 1) return "Unimolekular";
        if (np === 2) return "Bimolekular";
        if (np === 3) return "Termolekular";
        if (np > 3) return "Tidak mungkin terjadi";
        throw new Error('Jumlah partikel harus 1, 2, atau 3.');
    }
    throw new Error('Target tidak valid');
}

function hitungKcDariKonstantaLaju(k1, km1, target) {
    if (target === "Kc") {
        if (km1 === 0) throw new Error("Konstanta laju mundur (k-1) tidak boleh nol.");
        return k1 / km1;
    }
    throw new Error('Target tidak valid');
}


function hitungRasioLaju(A1, A2, m, target) {
    if (target === "rasio") {
        if (A1 === 0) throw new Error("[A]1 tidak boleh nol.");
        return Math.pow(A2 / A1, m);
    }
    throw new Error('Target tidak valid');
}


function hitungRasioLajuTekanan(P1, P2, n, target) {
    if (target === "rasio") {
        if (P1 === 0) throw new Error("Tekanan awal (P1) tidak boleh nol.");
        
        
        return Math.pow(P2 / P1, n);
    }
    throw new Error('Target tidak valid');
}