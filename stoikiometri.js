const NA = 6.02214076e23;
const R = 0.0821;
const Vm_STP = 22.4;
const T_STP = 273.15;
const P_STP = 1;

const T_DEFAULT = 298;

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

function hitungMassaMolarFormula(formula, target) {
    if (target !== "M") throw new Error('Target tidak valid');
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
    switch (topik) {
        case 'massa-molar':
            return { 
                'M-massa-molar': 'Massa Molar Manual (M)', 
                'M-formula': 'Massa Molar dari Formula (e.g., NaCl)' 
            };
        case 'jumlah-mol':
            return { 'n-jumlah-mol': 'Jumlah Mol (n)' };
        case 'massa-zat':
            return { 'm-massa-zat': 'Massa Zat (m)' };
        case 'volume-gas':
            return { 'V-volume-gas': 'Volume Gas (V) STP' };
        case 'jumlah-partikel':
            return { 'N-jumlah-partikel': 'Jumlah Partikel (N)' };
        case 'mol-dari-partikel':
            return { 'n-mol-partikel': 'Mol dari Jumlah Partikel (n)' };
        case 'mol-dari-volume':
            return { 'n-mol-volume': 'Mol dari Volume Gas (n) STP' };
        case 'pv-nrt':
            return {
                'n-pv-nrt': 'Jumlah Mol dari PV=nRT (n)',
                'V-pv-nrt': 'Volume dari PV=nRT (V)',
                'P-pv-nrt': 'Tekanan dari PV=nRT (P)',
                'T-pv-nrt': 'Suhu dari PV=nRT (T)'
            };
        case 'penyetaraan-reaksi':
            return { 'koefisien-penyetaraan': 'Koefisien Reaksi (ratio)' };
        case 'hubungan-mol-reaksi':
            return { 'n-hubungan-mol': 'Mol Produk dari Mol Pereaksi (n_C)' };
        case 'pereaksi-pembatas':
            return { 'pereaksi-pembatas': 'Pereaksi Pembatas' };
        case 'pereaksi-berlebih':
            return { 'n-sisa-berlebih': 'Mol Pereaksi Sisa (n_sisa)' };
        case 'hasil-teoritis':
            return { 'm-teoritis': 'Hasil Teoritis (m_teoritis)' };
        case 'hasil-sebenarnya':
            return { 'm-sebenarnya': 'Hasil Sebenarnya (m_sebenarnya)' };
        case 'persentase-hasil':
            return { 'persen-hasil': 'Persentase Hasil (%)' };
        case 'volume-gas-reaksi':
            return { 'V-gas-reaksi': 'Volume Gas Produk (V_C)' };
        case 'mol-dari-hukum-gas':
            return { 'n-hukum-gas': 'Mol dari Hukum Gas (n)' };
        case 'densitas-gas':
            return { 'd-densitas-gas': 'Densitas Gas (d)' };
        case 'massa-molar-gas':
            return { 'M-massa-molar-gas': 'Massa Molar Gas (M)' };
        case 'mol-dari-volume-dan-molaritas':
            return { 'n-mol-molaritas': 'Mol dari Volume dan Molaritas (n)' };
        case 'molaritas-larutan':
            return { 'M-molaritas': 'Molaritas (M)' };
        case 'pengenceran-larutan':
            return { 'M2-pengenceran': 'Molaritas Akhir Pengenceran (M₂)' };
        case 'fraksi-mol':
            return { 'X-fraksi-mol': 'Fraksi Mol (X_A)' };
        case 'massa-jenis-larutan':
            return { 'rho-massa-jenis': 'Massa Jenis Larutan (ρ)' };
        case 'persen-massa':
            return { 'persen-massa': 'Persen Massa (% w/w)' };
        case 'ppm-larutan':
            return { 'ppm-ppm': 'Konsentrasi ppm' };
        case 'molalitas-larutan':
            return { 'm-molalitas': 'Molalitas (m)' };
        case 'pereaksi-lengkap':
            return { 'n-produk-lengkap': 'Mol Produk Pereaksi Lengkap (n_C)' };
        case 'stoikiometri-padat-cair-gas':
            return { 'konversi-pcg': 'Konversi Stoikiometri PCG (V_gas)' };
        case 'perbandingan-zat':
            return { 'rasio-zat': 'Perbandingan Zat (rasio m_B/m_A)' };
        case 'konversi-unit':
            return { 
                'g-to-mol': 'Massa (g) ke Mol (n)',
                'mol-to-g': 'Mol (n) ke Massa (g)',
                'L-to-mol': 'Volume STP (L) ke Mol (n)',
                'mol-to-L': 'Mol (n) ke Volume STP (L)',
                'partikel-to-mol': 'Partikel (N) ke Mol (n)',
                'mol-to-partikel': 'Mol (n) ke Partikel (N)',
                'C-to-K': 'Celcius (°C) ke Kelvin (K)',
                'K-to-C': 'Kelvin (K) ke Celcius (°C)'
            };
        case 'hukum-gas-lanjutan':
            return {
                'V2-boyle': 'Volume dari Hukum Boyle (V₂)',
                'V2-charles': 'Volume dari Hukum Charles (V₂)',
                'P2-gaylussac': 'Tekanan dari Hukum Gay-Lussac (P₂)',
                'V2-avogadro': 'Volume dari Hukum Avogadro (V₂)',
                'V2-kombinasi': 'Volume dari Kombinasi Hukum Gas (V₂)'
            };
        case 'konsentrasi-lanjutan':
            return {
                'persen-volume': 'Persen Volume (% v/v)',
                'N-normalitas': 'Normalitas Larutan (N)',
                'N-hubungan-molaritas': 'Normalitas dari Molaritas (N)',
                'persen-keenceran': 'Persen Keenceran (%)'
            };
        case 'rumus-senyawa':
            return {
                'rasio-empiris': 'Rasio Rumus Empiris (rasio)',
                'Mr-molekul': 'Massa Molekul dari Empiris (Mr_molekul)'
            };
        case 'disosiasi-osmosis':
            return {
                'N-ion': 'Jumlah Ion (N_ion)',
                'alpha-derajat': 'Derajat Disosiasi (α)',
                'pi-osmotik': 'Tekanan Osmotik (π)',
                'C_E-ekuivalen': 'Konsentrasi Ekuivalen (C_E)'
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

    switch (parameter) {
        case 'M-massa-molar':
            inputs = { m: 'Massa zat/Simbol Unsur (m, g/simbol)', n: 'Jumlah mol (n, mol)' };
            satuanHasil = 'g/mol';
            fungsiHitung = 'hitungMassaMolar(m, n, "M")';
            namaVariabel = 'M';
            break;
        case 'M-formula':
            inputs = { formula: 'Formula kimia (e.g., NaCl, H2O, CaCO3)' };
            satuanHasil = 'g/mol';
            fungsiHitung = 'hitungMassaMolarFormula(formula, "M")';
            namaVariabel = 'M';
            break;
        case 'n-jumlah-mol':
            inputs = { m: 'Massa zat (m, g)', M: 'Massa molar (M, g/mol)' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungJumlahMol(m, M, "n")';
            namaVariabel = 'n';
            break;
        case 'm-massa-zat':
            inputs = { n: 'Jumlah mol (n, mol)', M: 'Massa molar (M, g/mol)' };
            satuanHasil = 'g';
            fungsiHitung = 'hitungMassaZat(n, M, "m")';
            namaVariabel = 'm';
            break;
        case 'V-volume-gas':
            inputs = { n: 'Jumlah mol (n, mol)' };
            satuanHasil = 'L';
            fungsiHitung = 'hitungVolumeGas(n, null, "V")';
            namaVariabel = 'V';
            break;
        case 'N-jumlah-partikel':
            inputs = { n: 'Jumlah mol (n, mol)' };
            satuanHasil = 'partikel';
            fungsiHitung = 'hitungJumlahPartikel(n, null, "N")';
            namaVariabel = 'N';
            break;
        case 'n-mol-partikel':
            inputs = { N: 'Jumlah partikel (N)' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungMolDariPartikel(N, null, "n")';
            namaVariabel = 'n';
            break;
        case 'n-mol-volume':
            inputs = { V: 'Volume gas (V, L)' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungMolDariVolume(V, null, "n")';
            namaVariabel = 'n';
            break;
        case 'n-pv-nrt':
            inputs = { P: 'Tekanan (P, atm)', V: 'Volume (V, L)', T: 'Suhu (T, K)' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungHukumGasIdeal(P, V, T, "n")';
            namaVariabel = 'n';
            break;
        case 'V-pv-nrt':
            inputs = { P: 'Tekanan (P, atm)', n: 'Jumlah mol (n, mol)', T: 'Suhu (T, K)' };
            satuanHasil = 'L';
            fungsiHitung = 'hitungHukumGasIdeal(P, n, T, "V")';
            namaVariabel = 'V';
            break;
        case 'P-pv-nrt':
            inputs = { V: 'Volume (V, L)', n: 'Jumlah mol (n, mol)', T: 'Suhu (T, K)' };
            satuanHasil = 'atm';
            fungsiHitung = 'hitungHukumGasIdeal(V, n, T, "P")';
            namaVariabel = 'P';
            break;
        case 'T-pv-nrt':
            inputs = { P: 'Tekanan (P, atm)', V: 'Volume (V, L)', n: 'Jumlah mol (n, mol)' };
            satuanHasil = 'K';
            fungsiHitung = 'hitungHukumGasIdeal(P, V, n, "T")';
            namaVariabel = 'T';
            break;
        case 'koefisien-penyetaraan':
            inputs = { formula: 'Formula reaksi (contoh: H2 + O2 -> H2O)' };
            satuanHasil = 'ratio';
            fungsiHitung = 'hitungPenyetaraanReaksi(formula, null, "ratio")';
            namaVariabel = 'koefisien';
            break;
        case 'n-hubungan-mol':
            inputs = { nA: 'Mol pereaksi A (n_A, mol)', a: 'Koefisien A (a)', c: 'Koefisien C (c)' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungHubunganMolReaksi(nA, a, c, "nC")';
            namaVariabel = 'n_C';
            break;
        case 'pereaksi-pembatas':
            inputs = { nA: 'Mol A (mol)', a: 'Koef A', nB: 'Mol B (mol)', b: 'Koef B' };
            satuanHasil = 'pereaksi';
            fungsiHitung = 'hitungPereaksiPembatas(nA, a, nB, b, "pembatas")';
            namaVariabel = 'pereaksi pembatas';
            break;
        case 'n-sisa-berlebih':
            inputs = { nB: 'Mol B awal (mol)', nB_reaksi: 'Mol B bereaksi (mol)' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungPereaksiBerlebih(nB, nB_reaksi, "n_sisa")';
            namaVariabel = 'n_sisa';
            break;
        case 'm-teoritis':
            inputs = { nC: 'Mol produk C (mol)', MC: 'Massa molar C (g/mol)' };
            satuanHasil = 'g';
            fungsiHitung = 'hitungHasilTeoritis(nC, MC, "m_teoritis")';
            namaVariabel = 'm_teoritis';
            break;
        case 'm-sebenarnya':
            inputs = { m_eksperimen: 'Hasil eksperimen (g)' };
            satuanHasil = 'g';
            fungsiHitung = 'm_eksperimen';
            namaVariabel = 'm_sebenarnya';
            break;
        case 'persen-hasil':
            inputs = { m_sebenarnya: 'Hasil sebenarnya (g)', m_teoritis: 'Hasil teoritis (g)' };
            satuanHasil = '%';
            fungsiHitung = 'hitungPersentaseHasil(m_sebenarnya, m_teoritis, "persen")';
            namaVariabel = '% hasil';
            break;
        case 'V-gas-reaksi':
            inputs = { VA: 'Volume gas A (L)', a: 'Koef A', c: 'Koef C' };
            satuanHasil = 'L';
            fungsiHitung = 'hitungVolumeGasReaksi(VA, a, c, "VC")';
            namaVariabel = 'V_C';
            break;
        case 'n-hukum-gas':
            inputs = { P: 'Tekanan (atm)', V: 'Volume (L)', T: 'Suhu (K)' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungMolDariHukumGas(P, V, T, "n")';
            namaVariabel = 'n';
            break;
        case 'd-densitas-gas':
            inputs = { P: 'Tekanan (atm)', M: 'Massa molar (g/mol)', T: 'Suhu (K)' };
            satuanHasil = 'g/L';
            fungsiHitung = 'hitungDensitasGas(P, M, T, "d")';
            namaVariabel = 'd';
            break;
        case 'M-massa-molar-gas':
            inputs = { m: 'Massa (g)', P: 'Tekanan (atm)', V: 'Volume (L)', T: 'Suhu (K)' };
            satuanHasil = 'g/mol';
            fungsiHitung = 'hitungMassaMolarGas(m, P, V, T, "M")';
            namaVariabel = 'M';
            break;
        case 'n-mol-molaritas':
            inputs = { M: 'Molaritas (M, mol/L)', V: 'Volume (L)' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungMolDariMolaritas(M, V, "n")';
            namaVariabel = 'n';
            break;
        case 'M-molaritas':
            inputs = { n: 'Jumlah mol (mol)', V: 'Volume (L)' };
            satuanHasil = 'mol/L';
            fungsiHitung = 'hitungMolaritas(n, V, "M")';
            namaVariabel = 'M';
            break;
        case 'M2-pengenceran':
            inputs = { M1: 'Molaritas awal (mol/L)', V1: 'Volume awal (L)', V2: 'Volume akhir (L)' };
            satuanHasil = 'mol/L';
            fungsiHitung = 'hitungPengenceran(M1, V1, V2, "M2")';
            namaVariabel = 'M₂';
            break;
        case 'X-fraksi-mol':
            inputs = { nA: 'Mol A (mol)', nB: 'Mol B (mol)' };
            satuanHasil = 'fraksi';
            fungsiHitung = 'hitungFraksiMol(nA, nB, "X_A")';
            namaVariabel = 'X_A';
            break;
        case 'rho-massa-jenis':
            inputs = { m_larutan: 'Massa larutan (g)', V_larutan: 'Volume larutan (L)' };
            satuanHasil = 'g/L';
            fungsiHitung = 'hitungMassaJenis(m_larutan, V_larutan, "rho")';
            namaVariabel = 'ρ';
            break;
        case 'persen-massa':
            inputs = { m_terlarut: 'Massa terlarut (g)', m_larutan: 'Massa larutan (g)' };
            satuanHasil = '%';
            fungsiHitung = 'hitungPersenMassa(m_terlarut, m_larutan, "persen")';
            namaVariabel = '% w/w';
            break;
        case 'ppm-ppm':
            inputs = { m_terlarut: 'Massa terlarut (g)', m_larutan: 'Massa larutan (kg)' };
            satuanHasil = 'ppm';
            fungsiHitung = 'hitungPPM(m_terlarut, m_larutan, "ppm")';
            namaVariabel = 'ppm';
            break;
        case 'm-molalitas':
            inputs = { n_terlarut: 'Mol terlarut (mol)', m_pelarut: 'Massa pelarut (kg)' };
            satuanHasil = 'mol/kg';
            fungsiHitung = 'hitungMolalitas(n_terlarut, m_pelarut, "m")';
            namaVariabel = 'm';
            break;
        case 'g-to-mol':
            inputs = { value: 'Massa (g)', M: 'Massa Molar (g/mol)' };
            satuanHasil = 'mol';
            fungsiHitung = 'konversiSatuan("g-to-mol", value, M)';
            namaVariabel = 'Mol (n)';
            break;
        case 'mol-to-g':
            inputs = { value: 'Mol (n)', M: 'Massa Molar (g/mol)' };
            satuanHasil = 'g';
            fungsiHitung = 'konversiSatuan("mol-to-g", value, M)';
            namaVariabel = 'Massa (m)';
            break;
        case 'L-to-mol':
            inputs = { value: 'Volume STP (L)' };
            satuanHasil = 'mol';
            fungsiHitung = 'konversiSatuan("L-to-mol", value)';
            namaVariabel = 'Mol (n)';
            break;
        case 'mol-to-L':
            inputs = { value: 'Mol (n)' };
            satuanHasil = 'L';
            fungsiHitung = 'konversiSatuan("mol-to-L", value)';
            namaVariabel = 'Volume STP (V)';
            break;
        case 'partikel-to-mol':
            inputs = { value: 'Jumlah Partikel (N)' };
            satuanHasil = 'mol';
            fungsiHitung = 'konversiSatuan("partikel-to-mol", value)';
            namaVariabel = 'Mol (n)';
            break;
        case 'mol-to-partikel':
            inputs = { value: 'Mol (n)' };
            satuanHasil = 'partikel';
            fungsiHitung = 'konversiSatuan("mol-to-partikel", value)';
            namaVariabel = 'Partikel (N)';
            break;
        case 'C-to-K':
            inputs = { value: 'Suhu Celcius (°C)' };
            satuanHasil = 'K';
            fungsiHitung = 'konversiSatuan("C-to-K", value)';
            namaVariabel = 'Suhu Kelvin (T)';
            break;
        case 'K-to-C':
            inputs = { value: 'Suhu Kelvin (K)' };
            satuanHasil = '°C';
            fungsiHitung = 'konversiSatuan("K-to-C", value)';
            namaVariabel = 'Suhu Celcius (T)';
            break;
        case 'n-produk-lengkap':
            inputs = { nA: 'Mol A (mol)', a: 'Koef A', c: 'Koef C' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungPereaksiLengkap(nA, a, c, "nC")';
            namaVariabel = 'n_C';
            break;
        case 'konversi-pcg':
            inputs = { m_padat: 'Massa padat (g)', M_padat: 'M padat (g/mol)', c_gas: 'Koef gas' };
            satuanHasil = 'L';
            fungsiHitung = 'hitungStoikiometriPCG(m_padat, M_padat, c_gas, "V_gas")';
            namaVariabel = 'V_gas';
            break;
        case 'rasio-zat':
            inputs = { mA: 'Massa A (g)', MA: 'M A (g/mol)', a: 'Koef A', b: 'Koef B', MB: 'M B (g/mol)' };
            satuanHasil = 'rasio';
            fungsiHitung = 'hitungPerbandinganZat(mA, MA, a, b, MB, "rasio")';
            namaVariabel = 'm_B / m_A';
            break;
        case 'V2-boyle':
            inputs = { P1: 'Tekanan awal (P₁, atm)', V1: 'Volume awal (V₁, L)', P2: 'Tekanan akhir (P₂, atm)' };
            satuanHasil = 'L';
            fungsiHitung = 'hitungHukumBoyle(P1, V1, P2, "V2")';
            namaVariabel = 'V₂';
            break;
        case 'V2-charles':
            inputs = { V1: 'Volume awal (V₁, L)', T1: 'Suhu awal (T₁, K)', T2: 'Suhu akhir (T₂, K)' };
            satuanHasil = 'L';
            fungsiHitung = 'hitungHukumCharles(V1, T1, T2, "V2")';
            namaVariabel = 'V₂';
            break;
        case 'P2-gaylussac':
            inputs = { P1: 'Tekanan awal (P₁, atm)', T1: 'Suhu awal (T₁, K)', T2: 'Suhu akhir (T₂, K)' };
            satuanHasil = 'atm';
            fungsiHitung = 'hitungHukumGayLussac(P1, T1, T2, "P2")';
            namaVariabel = 'P₂';
            break;
        case 'V2-avogadro':
            inputs = { V1: 'Volume awal (V₁, L)', n1: 'Mol awal (n₁, mol)', n2: 'Mol akhir (n₂, mol)' };
            satuanHasil = 'L';
            fungsiHitung = 'hitungHukumAvogadro(V1, n1, n2, "V2")';
            namaVariabel = 'V₂';
            break;
        case 'V2-kombinasi':
            inputs = { P1: 'Tekanan awal (P₁, atm)', V1: 'Volume awal (V₁, L)', T1: 'Suhu awal (T₁, K)', P2: 'Tekanan akhir (P₂, atm)', T2: 'Suhu akhir (T₂, K)' };
            satuanHasil = 'L';
            fungsiHitung = 'hitungHukumKombinasiGas(P1, V1, T1, P2, T2, "V2")';
            namaVariabel = 'V₂';
            break;
        case 'persen-volume':
            inputs = { V_terlarut: 'Volume terlarut (L)', V_larutan: 'Volume larutan (L)' };
            satuanHasil = '%';
            fungsiHitung = 'hitungPersenVolume(V_terlarut, V_larutan, "persen")';
            namaVariabel = '% v/v';
            break;
        case 'N-normalitas':
            inputs = { n_ekivalen: 'Jumlah ekuivalen (n_ekivalen)', V: 'Volume (L)' };
            satuanHasil = 'eq/L';
            fungsiHitung = 'hitungNormalitas(n_ekivalen, V, "N")';
            namaVariabel = 'N';
            break;
        case 'N-hubungan-molaritas':
            inputs = { n_valensi: 'Jumlah valensi (n_valensi)', M: 'Molaritas (M, mol/L)' };
            satuanHasil = 'eq/L';
            fungsiHitung = 'hitungHubunganNormalitasMolaritas(n_valensi, M, "N")';
            namaVariabel = 'N';
            break;
        case 'persen-keenceran':
            inputs = { V1: 'Volume awal (L)', V2: 'Volume akhir (L)' };
            satuanHasil = '%';
            fungsiHitung = 'hitungPersenKeenceran(V1, V2, "persen")';
            namaVariabel = '% keenceran';
            break;
        case 'rasio-empiris':
            inputs = { molC: 'Mol C (mol)', molH: 'Mol H (mol)' };
            satuanHasil = 'rasio';
            fungsiHitung = 'hitungRumusEmpiris(molC, molH, "rasio")';
            namaVariabel = 'rasio empiris';
            break;
        case 'Mr-molekul':
            inputs = { Mr_empiris: 'Mr empiris (g/mol)', n: 'Faktor perkalian (n)' };
            satuanHasil = 'g/mol';
            fungsiHitung = 'hitungRumusMolekul(Mr_empiris, n, "Mr_molekul")';
            namaVariabel = 'Mr_molekul';
            break;
        case 'N-ion':
            inputs = { n_zat: 'Mol zat (mol)', i: 'Faktor van\'t Hoff (i)' };
            satuanHasil = 'partikel';
            fungsiHitung = 'hitungJumlahIon(n_zat, i, "N_ion")';
            namaVariabel = 'N_ion';
            break;
        case 'alpha-derajat':
            inputs = { n_terurai: 'Mol terurai (mol)', n_mula: 'Mol awal (mol)' };
            satuanHasil = 'fraksi';
            fungsiHitung = 'hitungDerajatDisosiasi(n_terurai, n_mula, "alpha")';
            namaVariabel = 'α';
            break;
        case 'pi-osmotik':
            inputs = { M: 'Molaritas (M, mol/L)', i: 'Faktor van\'t Hoff (i)' };
            satuanHasil = 'atm';
            fungsiHitung = 'hitungTekananOsmotik(M, i, "pi")';
            namaVariabel = 'π';
            break;
        case 'C_E-ekuivalen':
            inputs = { n_H: 'Mol H+ atau OH- (mol)', V: 'Volume (L)' };
            satuanHasil = 'eq/L';
            fungsiHitung = 'hitungKonsentrasiEkivalen(n_H, V, "C_E")';
            namaVariabel = 'C_E';
            break;
        default:
            return;
    }

    configPerhitungan = { fungsiHitung, satuanHasil, namaVariabel, parameter, inputs }; 

    const form = document.createElement('form');
    form.id = 'kalkulator-form';
    form.onsubmit = (e) => { e.preventDefault(); prosesPerhitungan(); };

    for (const [key, labelText] of Object.entries(inputs)) {
        const label = document.createElement('label');
        label.setAttribute('for', key);
        label.textContent = labelText + ': ';

        let input;
        if (key === 'formula' || (parameter === 'M-massa-molar' && key === 'm')) {
            input = document.createElement('input');
            input.type = 'text';
        } else {
            input = document.createElement('input');
            input.type = 'number';
            input.step = 'any';
        }
        input.id = key;
        input.name = key;
        input.required = true;

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

    const { fungsiHitung, satuanHasil, namaVariabel, parameter } = configPerhitungan;

    for (const [key, value] of formData.entries()) {
        const inputElement = document.getElementById(key);
        if (inputElement && inputElement.required) {
            let parsedValue;
            const trimmedValue = value.trim();

            if (key === 'm' && parameter === 'M-massa-molar') {
                const mass = getAtomicMass(trimmedValue);
                if (mass !== null) {
                    parsedValue = mass;
                } else {
                    parsedValue = parseFloat(trimmedValue);
                }
                
                if (isNaN(parsedValue)) {
                    allInputsValid = false;
                    break;
                }
            } else if (inputElement.type === 'number') {
                parsedValue = parseFloat(trimmedValue);
                if (isNaN(parsedValue)) {
                    allInputsValid = false;
                    break;
                }
            } else {
                parsedValue = trimmedValue;
                if (!parsedValue) {
                    allInputsValid = false;
                    break;
                }
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
        hasilDiv.innerHTML = '<p class="error">⚠️ Mohon isi semua kolom input dengan data yang valid!</p>';
        return;
    }

    try {
        const argsMatch = fungsiHitung.match(/\((.*?)\)/);
        let finalFunctionCall = fungsiHitung;

        if (argsMatch && argsMatch[1]) {
            const argNames = argsMatch[1].split(',').map(arg => arg.trim()); 
            
            const argValues = argNames.map(name => {
                if (name.startsWith('"') && name.endsWith('"')) {
                    return name;
                }
                if (name === 'null') {
                    return 'null';
                }
                if (nilaiInput.hasOwnProperty(name)) {
                    const val = nilaiInput[name];
                    return typeof val === 'string' ? `"${val}"` : JSON.stringify(val); 
                }
                return 'null';
            });

            const funcName = fungsiHitung.substring(0, fungsiHitung.indexOf('('));
            finalFunctionCall = `${funcName}(${argValues.join(', ')})`;
        }
        
        let hasilNumerik;
        if (finalFunctionCall === 'm_eksperimen') {
            hasilNumerik = nilaiInput.m_eksperimen;
        } else {
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
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai Hasil (Satuan SI)</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 10px;">${namaVariabel}</td>
                    <td style="border: 1px solid #ccc; padding: 10px;">${formatted_fx} ${satuanHasil}</td>
                </tr>
            </table>
        `;

        form.reset();

    } catch (e) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `<h3>⚠️ Error Perhitungan!</h3><p>Terjadi kesalahan saat memproses data:</p>
            <p style="font-weight: bold;">${e.message}</p>
            <p>Pastikan semua variabel sudah terisi dengan data yang valid dan sesuai dengan konteks rumus yang dipilih.</p>`;
    }
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        const form = document.getElementById('kalkulator-form');
        if (!form) return;

        const activeElement = event.target;
        if (activeElement.tagName !== 'INPUT' || !activeElement.required) return;

        const currentValue = activeElement.value.trim();
        if (!currentValue) {
            return;
        }

        const inputs = Array.from(form.querySelectorAll('input[required]'));
        const currentIndex = inputs.indexOf(activeElement);

        if (currentIndex === -1 || currentIndex === inputs.length - 1) {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        } else {
            event.preventDefault();
            const nextInput = inputs[currentIndex + 1];
            nextInput.focus();
            nextInput.select();
        }
    }
}

function konversiSatuan(tipeKonversi, value, M = null) {
    switch (tipeKonversi) {
        case 'g-to-mol':
            if (M === 0 || M === null) throw new Error("Massa molar (M) tidak boleh nol atau kosong.");
            return value / M;
        case 'mol-to-g':
            if (M === 0 || M === null) throw new Error("Massa molar (M) tidak boleh nol atau kosong.");
            return value * M;
        case 'L-to-mol':
            if (Vm_STP === 0) throw new Error("Volume molar STP tidak boleh nol.");
            return value / Vm_STP;
        case 'mol-to-L':
            return value * Vm_STP;
        case 'partikel-to-mol':
            if (NA === 0) throw new Error("Bilangan Avogadro (NA) tidak boleh nol.");
            return value / NA;
        case 'mol-to-partikel':
            return value * NA;
        case 'C-to-K':
            return value + 273.15;
        case 'K-to-C':
            return value - 273.15;
        default:
            throw new Error(`Tipe konversi '${tipeKonversi}' tidak valid.`);
    }
}

function hitungMassaMolar(m, n, target) {
    if (target === "M") {
        if (n === 0) throw new Error("Jumlah mol (n) tidak boleh nol.");
        return m / n;
    }
    throw new Error('Target tidak valid');
}

function hitungJumlahMol(m, M, target) {
    if (target === "n") {
        if (M === 0) throw new Error("Massa molar (M) tidak boleh nol.");
        return m / M;
    }
    throw new Error('Target tidak valid');
}

function hitungMassaZat(n, M, target) {
    if (target === "m") {
        return n * M;
    }
    throw new Error('Target tidak valid');
}

function hitungVolumeGas(n, _, target) {
    if (target === "V") {
        return n * Vm_STP;
    }
    throw new Error('Target tidak valid');
}

function hitungJumlahPartikel(n, _, target) {
    if (target === "N") {
        return n * NA;
    }
    throw new Error('Target tidak valid');
}

function hitungMolDariPartikel(N, _, target) {
    if (target === "n") {
        return N / NA;
    }
    throw new Error('Target tidak valid');
}

function hitungMolDariVolume(V, _, target) {
    if (target === "n") {
        return V / Vm_STP;
    }
    throw new Error('Target tidak valid');
}

function hitungHukumGasIdeal(val1, val2, val3, target) {
    if (target === "n") {
        const P = val1, V = val2, T = val3;
        if (P === 0 || T === 0) throw new Error("P atau T tidak boleh nol.");
        return (P * V) / (R * T);
    }
    if (target === "V") {
        const P = val1, n = val2, T = val3;
        if (P === 0) throw new Error("P tidak boleh nol.");
        return (n * R * T) / P;
    }
    if (target === "P") {
        const V = val1, n = val2, T = val3;
        if (V === 0) throw new Error("V tidak boleh nol.");
        return (n * R * T) / V;
    }
    if (target === "T") {
        const P = val1, V = val2, n = val3;
        if (P === 0 || V === 0 || n === 0) throw new Error("P, V, atau n tidak boleh nol.");
        return (P * V) / (R * n);
    }
    throw new Error('Target Hukum Gas Ideal tidak valid');
}

function hitungPenyetaraanReaksi(formula, _, target) {
    if (target === "ratio") {
        const lowerFormula = formula.toLowerCase();
        if (lowerFormula.includes('h2 + o2 -> h2o')) {
            return '2:1:2';
        }
        if (lowerFormula.includes('ch4 + o2 -> co2 + h2o')) {
            return '1:2:1:2';
        }
        if (lowerFormula.includes('na + cl2 -> nacl')) {
            return '2:1:2';
        }
        if (lowerFormula.includes('n2 + h2 -> nh3')) {
            return '1:3:2';
        }
        if (lowerFormula.includes('c + o2 -> co2')) {
            return '1:1:1';
        }
        if (lowerFormula.includes('2h2 + o2 -> 2h2o')) {
            return '2:1:2';
        }
        throw new Error('Formula tidak dikenali. Gunakan contoh seperti "H2 + O2 -> H2O", "CH4 + O2 -> CO2 + H2O", "Na + Cl2 -> NaCl", "N2 + H2 -> NH3", atau "C + O2 -> CO2".');
    }
    throw new Error('Target tidak valid');
}

function hitungHubunganMolReaksi(nA, a, c, target) {
    if (target === "nC") {
        if (a === 0) throw new Error("Koefisien a tidak boleh nol.");
        return (c / a) * nA;
    }
    throw new Error('Target tidak valid');
}

function hitungPereaksiPembatas(nA, a, nB, b, target) {
    if (target === "pembatas") {
        if (a === 0 || b === 0) throw new Error("Koefisien tidak boleh nol.");
        const ratioA = nA / a;
        const ratioB = nB / b;
        return ratioA <= ratioB ? 'A' : 'B';
    }
    throw new Error('Target tidak valid');
}

function hitungPereaksiBerlebih(nB, nB_reaksi, target) {
    if (target === "n_sisa") {
        return Math.max(0, nB - nB_reaksi);
    }
    throw new Error('Target tidak valid');
}

function hitungHasilTeoritis(nC, MC, target) {
    if (target === "m_teoritis") {
        return nC * MC;
    }
    throw new Error('Target tidak valid');
}

function hitungPersentaseHasil(m_sebenarnya, m_teoritis, target) {
    if (target === "persen") {
        if (m_teoritis === 0) throw new Error("Hasil teoritis tidak boleh nol.");
        return (m_sebenarnya / m_teoritis) * 100;
    }
    throw new Error('Target tidak valid');
}

function hitungVolumeGasReaksi(VA, a, c, target) {
    if (target === "VC") {
        if (a === 0) throw new Error("Koefisien a tidak boleh nol.");
        return (c / a) * VA;
    }
    throw new Error('Target tidak valid');
}

function hitungMolDariHukumGas(P, V, T, target) {
    if (target === "n") {
        if (T === 0) throw new Error("Suhu T tidak boleh nol.");
        return (P * V) / (R * T);
    }
    throw new Error('Target tidak valid');
}

function hitungDensitasGas(P, M, T, target) {
    if (target === "d") {
        if (T === 0) throw new Error("Suhu T tidak boleh nol.");
        return (P * M) / (R * T);
    }
    throw new Error('Target tidak valid');
}

function hitungMassaMolarGas(m, P, V, T, target) {
    if (target === "M") {
        if (P === 0 || V === 0 || T === 0) throw new Error("P, V, atau T tidak boleh nol.");
        return (m * R * T) / (P * V);
    }
    throw new Error('Target tidak valid');
}

function hitungMolDariMolaritas(M, V, target) {
    if (target === "n") {
        return M * V;
    }
    throw new Error('Target tidak valid');
}

function hitungMolaritas(n, V, target) {
    if (target === "M") {
        if (V === 0) throw new Error("Volume V tidak boleh nol.");
        return n / V;
    }
    throw new Error('Target tidak valid');
}

function hitungPengenceran(M1, V1, V2, target) {
    if (target === "M2") {
        if (V2 === 0) throw new Error("Volume akhir V2 tidak boleh nol.");
        return (M1 * V1) / V2;
    }
    throw new Error('Target tidak valid');
}

function hitungFraksiMol(nA, nB, target) {
    if (target === "X_A") {
        const total = nA + nB;
        if (total === 0) throw new Error("Total mol tidak boleh nol.");
        return nA / total;
    }
    throw new Error('Target tidak valid');
}

function hitungMassaJenis(m_larutan, V_larutan, target) {
    if (target === "rho") {
        if (V_larutan === 0) throw new Error("Volume larutan tidak boleh nol.");
        return m_larutan / V_larutan;
    }
    throw new Error('Target tidak valid');
}

function hitungPersenMassa(m_terlarut, m_larutan, target) {
    if (target === "persen") {
        if (m_larutan === 0) throw new Error("Massa larutan tidak boleh nol.");
        return (m_terlarut / m_larutan) * 100;
    }
    throw new Error('Target tidak valid');
}

function hitungPPM(m_terlarut, m_larutan, target) {
    if (target === "ppm") {
        if (m_larutan === 0) throw new Error("Massa larutan tidak boleh nol.");
        return (m_terlarut / (m_larutan * 1000)) * 1e6;
    }
    throw new Error('Target tidak valid');
}

function hitungMolalitas(n_terlarut, m_pelarut, target) {
    if (target === "m") {
        if (m_pelarut === 0) throw new Error("Massa pelarut (kg) tidak boleh nol.");
        return n_terlarut / m_pelarut;
    }
    throw new Error('Target tidak valid');
}

function hitungPereaksiLengkap(nA, a, c, target) {
    if (target === "nC") {
        if (a === 0) throw new Error("Koefisien a tidak boleh nol.");
        return (c / a) * nA;
    }
    throw new Error('Target tidak valid');
}

function hitungStoikiometriPCG(m_padat, M_padat, c_gas, target) {
    if (target === "V_gas") {
        if (M_padat === 0) throw new Error("Massa molar padat tidak boleh nol.");
        const n_padat = m_padat / M_padat;
        return n_padat * c_gas * Vm_STP;
    }
    throw new Error('Target tidak valid');
}

function hitungPerbandinganZat(mA, MA, a, b, MB, target) {
    if (target === "rasio") {
        if (MA === 0 || a === 0 || b === 0 || MB === 0) throw new Error("Input koefisien atau massa molar tidak boleh nol.");
        return (b / a) * (MA / MB);
    }
    throw new Error('Target tidak valid');
}

function hitungHukumBoyle(P1, V1, P2, target) {
    if (target === "V2") {
        if (P2 === 0) throw new Error("P2 tidak boleh nol.");
        return (P1 * V1) / P2;
    }
    throw new Error('Target tidak valid');
}

function hitungHukumCharles(V1, T1, T2, target) {
    if (target === "V2") {
        if (T2 === 0) throw new Error("T2 tidak boleh nol.");
        return V1 * (T2 / T1);
    }
    throw new Error('Target tidak valid');
}

function hitungHukumGayLussac(P1, T1, T2, target) {
    if (target === "P2") {
        if (T2 === 0) throw new Error("T2 tidak boleh nol.");
        return P1 * (T2 / T1);
    }
    throw new Error('Target tidak valid');
}

function hitungHukumAvogadro(V1, n1, n2, target) {
    if (target === "V2") {
        if (n2 === 0) throw new Error("n2 tidak boleh nol.");
        return V1 * (n2 / n1);
    }
    throw new Error('Target tidak valid');
}

function hitungHukumKombinasiGas(P1, V1, T1, P2, V2, T2, target) {
    if (target === "V2") {
        const k = (P1 * V1) / T1;
        if (P2 === 0 || T2 === 0) throw new Error("P2 atau T2 tidak boleh nol.");
        return (k * T2) / P2;
    }
    throw new Error('Target tidak valid');
}

function hitungPersenVolume(V_terlarut, V_larutan, target) {
    if (target === "persen") {
        if (V_larutan === 0) throw new Error("V_larutan tidak boleh nol.");
        return (V_terlarut / V_larutan) * 100;
    }
    throw new Error('Target tidak valid');
}

function hitungNormalitas(n_ekivalen, V, target) {
    if (target === "N") {
        if (V === 0) throw new Error("V tidak boleh nol.");
        return n_ekivalen / V;
    }
    throw new Error('Target tidak valid');
}

function hitungHubunganNormalitasMolaritas(n_valensi, M, target) {
    if (target === "N") {
        return n_valensi * M;
    }
    throw new Error('Target tidak valid');
}

function hitungPersenKeenceran(V1, V2, target) {
    if (target === "persen") {
        if (V2 === 0) throw new Error("V2 tidak boleh nol.");
        return (V1 / V2) * 100;
    }
    throw new Error('Target tidak valid');
}

function hitungRumusEmpiris(molC, molH, target) {
    if (target === "rasio") {
        const minMol = Math.min(molC, molH);
        return `${molC / minMol}:${molH / minMol}`;
    }
    throw new Error('Target tidak valid');
}

function hitungRumusMolekul(Mr_empiris, n, target) {
    if (target === "Mr_molekul") {
        return Mr_empiris * n;
    }
    throw new Error('Target tidak valid');
}

function hitungJumlahIon(n_zat, i, target) {
    if (target === "N_ion") {
        return n_zat * NA * i;
    }
    throw new Error('Target tidak valid');
}

function hitungDerajatDisosiasi(n_terurai, n_mula, target) {
    if (target === "alpha") {
        if (n_mula === 0) throw new Error("n_mula tidak boleh nol.");
        return n_terurai / n_mula;
    }
    throw new Error('Target tidak valid');
}

function hitungTekananOsmotik(M, i, target) {
    if (target === "pi") {
        return i * M * R * T_DEFAULT;
    }
    throw new Error('Target tidak valid');
}

function hitungKonsentrasiEkivalen(n_H, V, target) {
    if (target === "C_E") {
        if (V === 0) throw new Error("V tidak boleh nol.");
        return n_H / V;
    }
    throw new Error('Target tidak valid');
}