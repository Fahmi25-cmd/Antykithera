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
    }
}

function getOpsiParameter(topik) {
    switch (topik) {
        case 'konversi-suhu':
            return {
                'C-dari-F': 'Celcius dari Fahrenheit',
                'F-dari-C': 'Fahrenheit dari Celcius',
                'K-dari-C': 'Kelvin dari Celcius',
                'C-dari-K': 'Celcius dari Kelvin',
                'R-dari-C': 'Reamur dari Celcius',
                'C-dari-R': 'Celcius dari Reamur'
            };
        case 'kalor':
            return {
                'Q-kalor': 'Kalor (Q)',
                'm-kalor': 'Massa (m)',
                'c-kalor': 'Kalor Jenis (c)',
                'dT-kalor': 'Perubahan Suhu (ΔT)'
            };
        case 'perubahan-wujud':
            return {
                'Q-wujud': 'Kalor Perubahan Wujud (Q)',
                'm-wujud': 'Massa (m)',
                'L-wujud': 'Kalor Laten (L)'
            };
        case 'asas-black':
            return {
                'T-akhir': 'Suhu Akhir Campuran (T_akhir)'
            };
        case 'pemuaian-linear':
            return {
                'dL': 'Pertambahan Panjang (ΔL)',
                'L': 'Panjang Akhir (L)',
                'alpha': 'Koefisien Muai Linear (α)'
            };
        case 'pemuaian-luas':
            return {
                'dA': 'Pertambahan Luas (ΔA)',
                'A': 'Luas Akhir (A)',
                'beta': 'Koefisien Muai Luas (β)'
            };
        case 'pemuaian-volume':
            return {
                'dV-muai': 'Pertambahan Volume (ΔV)',
                'V-muai': 'Volume Akhir (V)',
                'gamma-muai': 'Koefisien Muai Volume (γ)'
            };
        case 'gas-ideal':
            return {
                'P-ideal': 'Tekanan (P)',
                'V-ideal': 'Volume (V)',
                'T-ideal': 'Suhu (T)'
            };
        case 'boyle':
            return {
                'V2-boyle': 'Volume Akhir (V₂)',
                'P2-boyle': 'Tekanan Akhir (P₂)'
            };
        case 'charles':
            return {
                'V2-charles': 'Volume Akhir (V₂)',
                'T2-charles': 'Suhu Akhir (T₂)'
            };
        case 'gay-lussac':
            return {
                'P2-gay': 'Tekanan Akhir (P₂)',
                'T2-gay': 'Suhu Akhir (T₂)'
            };
        case 'avogadro':
            return {
                'V2-avo': 'Volume Akhir (V₂)',
                'n2-avo': 'Jumlah Mol Akhir (n₂)'
            };
        case 'van-der-waals':
            return {
                'P-vdw': 'Tekanan Gas Nyata (P)'
            };
        case 'energi-dalam':
            return {
                'U': 'Energi Dalam (U)',
                'dU': 'Perubahan Energi Dalam (ΔU)'
            };
        case 'usaha-gas':
            return {
                'W-gas': 'Usaha Gas (W)',
                'dV-gas': 'Perubahan Volume (ΔV)'
            };
        case 'usaha-isotermal':
            return {
                'W-iso': 'Usaha Isotermal (W)'
            };
        case 'usaha-adiabatik':
            return {
                'W-adiabat': 'Usaha Adiabatik (W)',
                'T2-adiabat': 'Suhu Akhir (T₂)',
                'V2-adiabat': 'Volume Akhir (V₂)'
            };
        case 'hukum-pertama':
            return {
                'dU-hp': 'Perubahan Energi Dalam (ΔU)',
                'Q-hp': 'Kalor (Q)',
                'W-hp': 'Usaha (W)'
            };
        case 'kapasitas-kalor-gas':
            return {
                'Cp': 'Kapasitas Kalor Tekanan Tetap (Cp)',
                'Cv': 'Kapasitas Kalor Volume Tetap (Cv)'
            };
        case 'perbandingan-cp-cv':
            return {
                'gamma': 'Perbandingan Gamma (γ = Cp/Cv)'
            };
        case 'isobarik':
            return {
                'W-isobar': 'Usaha Isobarik (W)',
                'Q-isobar': 'Kalor Isobarik (Q)',
                'dU-isobar': 'Perubahan Energi Dalam (ΔU)'
            };
        case 'isochorik':
            return {
                'Q-isochor': 'Kalor Isochorik (Q = ΔU)',
                'dU-isochor': 'Perubahan Energi Dalam (ΔU)'
            };
        case 'isotermal':
            return {
                'W-isoterm': 'Usaha Isotermal (W = Q)'
            };
        case 'adiabatik':
            return {
                'W-adiab': 'Usaha Adiabatik (W)',
                'dU-adiab': 'Perubahan Energi Dalam (ΔU)',
                'P2-adiab': 'Tekanan Akhir (P₂)',
                'V2-adiab-proses': 'Volume Akhir (V₂)'
            };
        case 'efisiensi-mesin':
            return {
                'eta-mesin': 'Efisiensi Mesin (η)',
                'W-mesin': 'Usaha Mesin (W)',
                'Qkeluar': 'Kalor Keluar (Q_keluar)'
            };
        case 'efisiensi-carnot':
            return {
                'eta-carnot': 'Efisiensi Carnot (η)'
            };
        case 'cop-pendingin':
            return {
                'COP-ref': 'COP Pendingin',
                'W-ref': 'Usaha Pendingin (W)'
            };
        case 'cop-pompa-kalor':
            return {
                'COP-hp': 'COP Pompa Kalor',
                'W-hp-pompa': 'Usaha Pompa Kalor (W)'
            };
        case 'entropi':
            return {
                'dS': 'Perubahan Entropi (ΔS)'
            };
        case 'entropi-isotermal':
            return {
                'dS-iso': 'Perubahan Entropi Isotermal (ΔS)'
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
    let rumusLatex = '';
    let satuanHasil = '';
    let fungsiHitung = '';
    let namaVariabel = '';

    switch (parameter) {
        case 'C-dari-F':
            inputs = { F: 'Suhu Fahrenheit (°F)' };
            rumusLatex = 'C = 5/9 (F - 32)';
            satuanHasil = '°C';
            fungsiHitung = 'hitungKonversiSuhu(F, "C-dari-F")';
            namaVariabel = 'C';
            break;
        case 'F-dari-C':
            inputs = { C: 'Suhu Celcius (°C)' };
            rumusLatex = 'F = 9/5 C + 32';
            satuanHasil = '°F';
            fungsiHitung = 'hitungKonversiSuhu(C, "F-dari-C")';
            namaVariabel = 'F';
            break;
        case 'K-dari-C':
            inputs = { C: 'Suhu Celcius (°C)' };
            rumusLatex = 'K = C + 273';
            satuanHasil = 'K';
            fungsiHitung = 'hitungKonversiSuhu(C, "K-dari-C")';
            namaVariabel = 'K';
            break;
        case 'C-dari-K':
            inputs = { K: 'Suhu Kelvin (K)' };
            rumusLatex = 'C = K - 273';
            satuanHasil = '°C';
            fungsiHitung = 'hitungKonversiSuhu(K, "C-dari-K")';
            namaVariabel = 'C';
            break;
        case 'R-dari-C':
            inputs = { C: 'Suhu Celcius (°C)' };
            rumusLatex = 'R = 4/5 C';
            satuanHasil = '°R';
            fungsiHitung = 'hitungKonversiSuhu(C, "R-dari-C")';
            namaVariabel = 'R';
            break;
        case 'C-dari-R':
            inputs = { R: 'Suhu Reamur (°R)' };
            rumusLatex = 'C = 5/4 R';
            satuanHasil = '°C';
            fungsiHitung = 'hitungKonversiSuhu(R, "C-dari-R")';
            namaVariabel = 'C';
            break;
        case 'Q-kalor':
            inputs = { m: 'Massa (kg)', c: 'Kalor Jenis (J/kg·K)', dT: 'Perubahan Suhu (K atau °C)' };
            rumusLatex = 'Q = m c ΔT';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungKalor(m, c, dT, "Q")';
            namaVariabel = 'Q';
            break;
        case 'm-kalor':
            inputs = { Q: 'Kalor (J)', c: 'Kalor Jenis (J/kg·K)', dT: 'Perubahan Suhu (K atau °C)' };
            rumusLatex = 'm = Q / (c ΔT)';
            satuanHasil = 'kilogram (kg)';
            fungsiHitung = 'hitungKalor(Q, c, dT, "m")';
            namaVariabel = 'm';
            break;
        case 'c-kalor':
            inputs = { Q: 'Kalor (J)', m: 'Massa (kg)', dT: 'Perubahan Suhu (K atau °C)' };
            rumusLatex = 'c = Q / (m ΔT)';
            satuanHasil = 'J/kg·K';
            fungsiHitung = 'hitungKalor(Q, m, dT, "c")';
            namaVariabel = 'c';
            break;
        case 'dT-kalor':
            inputs = { Q: 'Kalor (J)', m: 'Massa (kg)', c: 'Kalor Jenis (J/kg·K)' };
            rumusLatex = 'ΔT = Q / (m c)';
            satuanHasil = 'Kelvin (K)';
            fungsiHitung = 'hitungKalor(Q, m, c, "dT")';
            namaVariabel = 'ΔT';
            break;
        case 'Q-wujud':
            inputs = { m: 'Massa (kg)', L: 'Kalor Laten (J/kg)' };
            rumusLatex = 'Q = m L';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungPerubahanWujud(m, L, "Q")';
            namaVariabel = 'Q';
            break;
        case 'm-wujud':
            inputs = { Q: 'Kalor (J)', L: 'Kalor Laten (J/kg)' };
            rumusLatex = 'm = Q / L';
            satuanHasil = 'kilogram (kg)';
            fungsiHitung = 'hitungPerubahanWujud(Q, L, "m")';
            namaVariabel = 'm';
            break;
        case 'L-wujud':
            inputs = { Q: 'Kalor (J)', m: 'Massa (kg)' };
            rumusLatex = 'L = Q / m';
            satuanHasil = 'J/kg';
            fungsiHitung = 'hitungPerubahanWujud(Q, m, "L")';
            namaVariabel = 'L';
            break;
        case 'T-akhir':
            inputs = {
                m1: 'Massa Benda 1 (kg)',
                c1: 'Kalor Jenis Benda 1 (J/kg·K)',
                T1: 'Suhu Awal Benda 1 (°C atau K)',
                m2: 'Massa Benda 2 (kg)',
                c2: 'Kalor Jenis Benda 2 (J/kg·K)',
                T2: 'Suhu Awal Benda 2 (°C atau K)'
            };
            rumusLatex = 'T_akhir = (m₁c₁T₁ + m₂c₂T₂) / (m₁c₁ + m₂c₂)';
            satuanHasil = '°C atau K';
            fungsiHitung = 'hitungAsasBlack(m1, c1, T1, m2, c2, T2)';
            namaVariabel = 'T_akhir';
            break;
        case 'dL':
            inputs = { L0: 'Panjang Awal (m)', alpha: 'Koefisien Muai Linear (/K)', dT: 'Perubahan Suhu (K)' };
            rumusLatex = 'ΔL = L₀ α ΔT';
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungPemuaianLinear(L0, alpha, dT, "dL")';
            namaVariabel = 'ΔL';
            break;
        case 'L':
            inputs = { L0: 'Panjang Awal (m)', alpha: 'Koefisien Muai Linear (/K)', dT: 'Perubahan Suhu (K)' };
            rumusLatex = 'L = L₀ + L₀ α ΔT';
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungPemuaianLinear(L0, alpha, dT, "L")';
            namaVariabel = 'L';
            break;
        case 'alpha':
            inputs = { dL: 'Pertambahan Panjang (m)', L0: 'Panjang Awal (m)', dT: 'Perubahan Suhu (K)' };
            rumusLatex = 'α = ΔL / (L₀ ΔT)';
            satuanHasil = '/K';
            fungsiHitung = 'hitungPemuaianLinear(dL, L0, dT, "alpha")';
            namaVariabel = 'α';
            break;
        case 'dA':
            inputs = { A0: 'Luas Awal (m²)', beta: 'Koefisien Muai Luas (/K)', dT: 'Perubahan Suhu (K)' };
            rumusLatex = 'ΔA = A₀ β ΔT';
            satuanHasil = 'm²';
            fungsiHitung = 'hitungPemuaianLuas(A0, beta, dT, "dA")';
            namaVariabel = 'ΔA';
            break;
        case 'A':
            inputs = { A0: 'Luas Awal (m²)', beta: 'Koefisien Muai Luas (/K)', dT: 'Perubahan Suhu (K)' };
            rumusLatex = 'A = A₀ + A₀ β ΔT';
            satuanHasil = 'm²';
            fungsiHitung = 'hitungPemuaianLuas(A0, beta, dT, "A")';
            namaVariabel = 'A';
            break;
        case 'beta':
            inputs = { dA: 'Pertambahan Luas (m²)', A0: 'Luas Awal (m²)', dT: 'Perubahan Suhu (K)' };
            rumusLatex = 'β = ΔA / (A₀ ΔT)';
            satuanHasil = '/K';
            fungsiHitung = 'hitungPemuaianLuas(dA, A0, dT, "beta")';
            namaVariabel = 'β';
            break;
        case 'dV-muai':
            inputs = { V0: 'Volume Awal (m³)', gamma: 'Koefisien Muai Volume (/K)', dT: 'Perubahan Suhu (K)' };
            rumusLatex = 'ΔV = V₀ γ ΔT';
            satuanHasil = 'm³';
            fungsiHitung = 'hitungPemuaianVolume(V0, gamma, dT, "dV")';
            namaVariabel = 'ΔV';
            break;
        case 'V-muai':
            inputs = { V0: 'Volume Awal (m³)', gamma: 'Koefisien Muai Volume (/K)', dT: 'Perubahan Suhu (K)' };
            rumusLatex = 'V = V₀ + V₀ γ ΔT';
            satuanHasil = 'm³';
            fungsiHitung = 'hitungPemuaianVolume(V0, gamma, dT, "V")';
            namaVariabel = 'V';
            break;
        case 'gamma-muai':
            inputs = { dV: 'Pertambahan Volume (m³)', V0: 'Volume Awal (m³)', dT: 'Perubahan Suhu (K)' };
            rumusLatex = 'γ = ΔV / (V₀ ΔT)';
            satuanHasil = '/K';
            fungsiHitung = 'hitungPemuaianVolume(dV, V0, dT, "gamma")';
            namaVariabel = 'γ';
            break;
        case 'P-ideal':
            inputs = { n: 'Jumlah Mol (mol)', T: 'Suhu (K)', V: 'Volume (m³)' };
            rumusLatex = 'P = nRT / V (R = 8.314 J/mol·K)';
            satuanHasil = 'Pascal (Pa)';
            fungsiHitung = 'hitungGasIdeal(n, T, V, "P")';
            namaVariabel = 'P';
            break;
        case 'V-ideal':
            inputs = { n: 'Jumlah Mol (mol)', T: 'Suhu (K)', P: 'Tekanan (Pa)' };
            rumusLatex = 'V = nRT / P (R = 8.314 J/mol·K)';
            satuanHasil = 'm³';
            fungsiHitung = 'hitungGasIdeal(n, T, P, "V")';
            namaVariabel = 'V';
            break;
        case 'T-ideal':
            inputs = { P: 'Tekanan (Pa)', V: 'Volume (m³)', n: 'Jumlah Mol (mol)' };
            rumusLatex = 'T = PV / (nR) (R = 8.314 J/mol·K)';
            satuanHasil = 'Kelvin (K)';
            fungsiHitung = 'hitungGasIdeal(P, V, n, "T")';
            namaVariabel = 'T';
            break;
        case 'V2-boyle':
            inputs = { P1: 'Tekanan Awal (Pa)', V1: 'Volume Awal (m³)', P2: 'Tekanan Akhir (Pa)' };
            rumusLatex = 'V₂ = P₁V₁ / P₂';
            satuanHasil = 'm³';
            fungsiHitung = 'hitungBoyle(P1, V1, P2, "V2")';
            namaVariabel = 'V₂';
            break;
        case 'P2-boyle':
            inputs = { P1: 'Tekanan Awal (Pa)', V1: 'Volume Awal (m³)', V2: 'Volume Akhir (m³)' };
            rumusLatex = 'P₂ = P₁V₁ / V₂';
            satuanHasil = 'Pascal (Pa)';
            fungsiHitung = 'hitungBoyle(P1, V1, V2, "P2")';
            namaVariabel = 'P₂';
            break;
        case 'V2-charles':
            inputs = { V1: 'Volume Awal (m³)', T1: 'Suhu Awal (K)', T2: 'Suhu Akhir (K)' };
            rumusLatex = 'V₂ = V₁T₂ / T₁';
            satuanHasil = 'm³';
            fungsiHitung = 'hitungCharles(V1, T1, T2, "V2")';
            namaVariabel = 'V₂';
            break;
        case 'T2-charles':
            inputs = { V1: 'Volume Awal (m³)', T1: 'Suhu Awal (K)', V2: 'Volume Akhir (m³)' };
            rumusLatex = 'T₂ = T₁V₂ / V₁';
            satuanHasil = 'Kelvin (K)';
            fungsiHitung = 'hitungCharles(V1, T1, V2, "T2")';
            namaVariabel = 'T₂';
            break;
        case 'P2-gay':
            inputs = { P1: 'Tekanan Awal (Pa)', T1: 'Suhu Awal (K)', T2: 'Suhu Akhir (K)' };
            rumusLatex = 'P₂ = P₁T₂ / T₁';
            satuanHasil = 'Pascal (Pa)';
            fungsiHitung = 'hitungGayLussac(P1, T1, T2, "P2")';
            namaVariabel = 'P₂';
            break;
        case 'T2-gay':
            inputs = { P1: 'Tekanan Awal (Pa)', T1: 'Suhu Awal (K)', P2: 'Tekanan Akhir (Pa)' };
            rumusLatex = 'T₂ = T₁P₂ / P₁';
            satuanHasil = 'Kelvin (K)';
            fungsiHitung = 'hitungGayLussac(P1, T1, P2, "T2")';
            namaVariabel = 'T₂';
            break;
        case 'V2-avo':
            inputs = { V1: 'Volume Awal (m³)', n1: 'Jumlah Mol Awal (mol)', n2: 'Jumlah Mol Akhir (mol)' };
            rumusLatex = 'V₂ = V₁n₂ / n₁';
            satuanHasil = 'm³';
            fungsiHitung = 'hitungAvogadro(V1, n1, n2, "V2")';
            namaVariabel = 'V₂';
            break;
        case 'n2-avo':
            inputs = { V1: 'Volume Awal (m³)', n1: 'Jumlah Mol Awal (mol)', V2: 'Volume Akhir (m³)' };
            rumusLatex = 'n₂ = n₁V₂ / V₁';
            satuanHasil = 'mol';
            fungsiHitung = 'hitungAvogadro(V1, n1, V2, "n2")';
            namaVariabel = 'n₂';
            break;
        case 'P-vdw':
            inputs = {
                n: 'Jumlah Mol (mol)',
                T: 'Suhu (K)',
                V: 'Volume (m³)',
                a: 'Konstanta a (Pa·m⁶/mol²)',
                b: 'Konstanta b (m³/mol)'
            };
            rumusLatex = 'P = [nRT/(V-nb)] - a(n/V)²';
            satuanHasil = 'Pascal (Pa)';
            fungsiHitung = 'hitungVanDerWaals(n, T, V, a, b)';
            namaVariabel = 'P';
            break;
        case 'U':
            inputs = { n: 'Jumlah Mol (mol)', T: 'Suhu (K)' };
            rumusLatex = 'U = (3/2) nRT';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiDalam(n, T, "U")';
            namaVariabel = 'U';
            break;
        case 'dU':
            inputs = { n: 'Jumlah Mol (mol)', dT: 'Perubahan Suhu (K)' };
            rumusLatex = 'ΔU = (3/2) nR ΔT';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiDalam(n, dT, "dU")';
            namaVariabel = 'ΔU';
            break;
        case 'W-gas':
            inputs = { P: 'Tekanan (Pa)', dV: 'Perubahan Volume (m³)' };
            rumusLatex = 'W = P ΔV';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungUsahaGas(P, dV, "W")';
            namaVariabel = 'W';
            break;
        case 'dV-gas':
            inputs = { W: 'Usaha (J)', P: 'Tekanan (Pa)' };
            rumusLatex = 'ΔV = W / P';
            satuanHasil = 'm³';
            fungsiHitung = 'hitungUsahaGas(W, P, "dV")';
            namaVariabel = 'ΔV';
            break;
        case 'W-iso':
            inputs = { n: 'Jumlah Mol (mol)', T: 'Suhu (K)', V1: 'Volume Awal (m³)', V2: 'Volume Akhir (m³)' };
            rumusLatex = 'W = nRT ln(V₂/V₁)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungUsahaIsotermal(n, T, V1, V2)';
            namaVariabel = 'W';
            break;
        case 'W-adiabat':
            inputs = { P1: 'Tekanan Awal (Pa)', V1: 'Volume Awal (m³)', P2: 'Tekanan Akhir (Pa)', V2: 'Volume Akhir (m³)', gamma: 'Gamma (γ = Cp/Cv)' };
            rumusLatex = 'W = (P₁V₁ - P₂V₂) / (γ - 1)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungUsahaAdiabatik(P1, V1, P2, V2, gamma, "W")';
            namaVariabel = 'W';
            break;
        case 'T2-adiabat':
            inputs = { T1: 'Suhu Awal (K)', V1: 'Volume Awal (m³)', V2: 'Volume Akhir (m³)', gamma: 'Gamma (γ = Cp/Cv)' };
            rumusLatex = 'T₂ = T₁(V₁/V₂)^(γ-1)';
            satuanHasil = 'Kelvin (K)';
            fungsiHitung = 'hitungUsahaAdiabatik(T1, V1, V2, gamma, null, "T2")';
            namaVariabel = 'T₂';
            break;
        case 'V2-adiabat':
            inputs = { V1: 'Volume Awal (m³)', P1: 'Tekanan Awal (Pa)', P2: 'Tekanan Akhir (Pa)', gamma: 'Gamma (γ = Cp/Cv)' };
            rumusLatex = 'V₂ = V₁(P₁/P₂)^(1/γ)';
            satuanHasil = 'm³';
            fungsiHitung = 'hitungUsahaAdiabatik(V1, P1, P2, gamma, null, "V2")';
            namaVariabel = 'V₂';
            break;
        case 'dU-hp':
            inputs = { Q: 'Kalor (J)', W: 'Usaha (J)' };
            rumusLatex = 'ΔU = Q - W';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungHukumPertama(Q, W, "dU")';
            namaVariabel = 'ΔU';
            break;
        case 'Q-hp':
            inputs = { dU: 'Perubahan Energi Dalam (J)', W: 'Usaha (J)' };
            rumusLatex = 'Q = ΔU + W';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungHukumPertama(dU, W, "Q")';
            namaVariabel = 'Q';
            break;
        case 'W-hp':
            inputs = { Q: 'Kalor (J)', dU: 'Perubahan Energi Dalam (J)' };
            rumusLatex = 'W = Q - ΔU';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungHukumPertama(Q, dU, "W")';
            namaVariabel = 'W';
            break;
        case 'Cp':
            inputs = { Cv: 'Kapasitas Kalor Volume Tetap (J/mol·K)' };
            rumusLatex = 'Cp = Cv + R (R = 8.314 J/mol·K)';
            satuanHasil = 'J/mol·K';
            fungsiHitung = 'hitungKapasitasKalor(Cv, "Cp")';
            namaVariabel = 'Cp';
            break;
        case 'Cv':
            inputs = { Cp: 'Kapasitas Kalor Tekanan Tetap (J/mol·K)' };
            rumusLatex = 'Cv = Cp - R (R = 8.314 J/mol·K)';
            satuanHasil = 'J/mol·K';
            fungsiHitung = 'hitungKapasitasKalor(Cp, "Cv")';
            namaVariabel = 'Cv';
            break;
        case 'gamma':
            inputs = { Cp: 'Kapasitas Kalor Tekanan Tetap (J/mol·K)', Cv: 'Kapasitas Kalor Volume Tetap (J/mol·K)' };
            rumusLatex = 'γ = Cp / Cv';
            satuanHasil = '(tanpa satuan)';
            fungsiHitung = 'hitungGamma(Cp, Cv)';
            namaVariabel = 'γ';
            break;
        case 'W-isobar':
            inputs = { P: 'Tekanan (Pa)', V2: 'Volume Akhir (m³)', V1: 'Volume Awal (m³)' };
            rumusLatex = 'W = P(V₂ - V₁)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungIsobarik(P, V2, V1, "W")';
            namaVariabel = 'W';
            break;
        case 'Q-isobar':
            inputs = { n: 'Jumlah Mol (mol)', Cp: 'Kapasitas Kalor (J/mol·K)', T2: 'Suhu Akhir (K)', T1: 'Suhu Awal (K)' };
            rumusLatex = 'Q = n Cp (T₂ - T₁)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungIsobarik(n, Cp, T2, T1, "Q")';
            namaVariabel = 'Q';
            break;
        case 'dU-isobar':
            inputs = { n: 'Jumlah Mol (mol)', Cv: 'Kapasitas Kalor (J/mol·K)', T2: 'Suhu Akhir (K)', T1: 'Suhu Awal (K)' };
            rumusLatex = 'ΔU = n Cv (T₂ - T₁)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungIsobarik(n, Cv, T2, T1, "dU")';
            namaVariabel = 'ΔU';
            break;
        case 'Q-isochor':
            inputs = { n: 'Jumlah Mol (mol)', Cv: 'Kapasitas Kalor (J/mol·K)', T2: 'Suhu Akhir (K)', T1: 'Suhu Awal (K)' };
            rumusLatex = 'Q = ΔU = n Cv (T₂ - T₁)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungIsochorik(n, Cv, T2, T1, "Q")';
            namaVariabel = 'Q (= ΔU)';
            break;
        case 'dU-isochor':
            inputs = { n: 'Jumlah Mol (mol)', Cv: 'Kapasitas Kalor (J/mol·K)', T2: 'Suhu Akhir (K)', T1: 'Suhu Awal (K)' };
            rumusLatex = 'ΔU = n Cv (T₂ - T₁)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungIsochorik(n, Cv, T2, T1, "dU")';
            namaVariabel = 'ΔU';
            break;
        case 'W-isoterm':
            inputs = { n: 'Jumlah Mol (mol)', T: 'Suhu (K)', V1: 'Volume Awal (m³)', V2: 'Volume Akhir (m³)' };
            rumusLatex = 'W = Q = nRT ln(V₂/V₁)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungIsotermal(n, T, V1, V2)';
            namaVariabel = 'W (= Q)';
            break;
        case 'W-adiab':
            inputs = { P1: 'Tekanan Awal (Pa)', V1: 'Volume Awal (m³)', P2: 'Tekanan Akhir (Pa)', V2: 'Volume Akhir (m³)', gamma: 'Gamma (γ)' };
            rumusLatex = 'W = (P₁V₁ - P₂V₂) / (γ - 1)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungAdiabatik(P1, V1, P2, V2, gamma, "W")';
            namaVariabel = 'W';
            break;
        case 'dU-adiab':
            inputs = { W: 'Usaha (J)' };
            rumusLatex = 'ΔU = -W (karena Q = 0)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungAdiabatik(W, null, null, null, null, "dU")';
            namaVariabel = 'ΔU';
            break;
        case 'P2-adiab':
            inputs = { P1: 'Tekanan Awal (Pa)', V1: 'Volume Awal (m³)', V2: 'Volume Akhir (m³)', gamma: 'Gamma (γ)' };
            rumusLatex = 'P₂ = P₁(V₁/V₂)^γ';
            satuanHasil = 'Pascal (Pa)';
            fungsiHitung = 'hitungAdiabatik(P1, V1, V2, gamma, null, "P2")';
            namaVariabel = 'P₂';
            break;
        case 'V2-adiab-proses':
            inputs = { V1: 'Volume Awal (m³)', P1: 'Tekanan Awal (Pa)', P2: 'Tekanan Akhir (Pa)', gamma: 'Gamma (γ)' };
            rumusLatex = 'V₂ = V₁(P₁/P₂)^(1/γ)';
            satuanHasil = 'm³';
            fungsiHitung = 'hitungAdiabatik(V1, P1, P2, gamma, null, "V2")';
            namaVariabel = 'V₂';
            break;
        case 'eta-mesin':
            inputs = { W: 'Usaha (J)', Qmasuk: 'Kalor Masuk (J)' };
            rumusLatex = 'η = W / Q_masuk';
            satuanHasil = '(tanpa satuan, atau %)';
            fungsiHitung = 'hitungEfisiensiMesin(W, Qmasuk, "eta")';
            namaVariabel = 'η';
            break;
        case 'W-mesin':
            inputs = { eta: 'Efisiensi (0-1)', Qmasuk: 'Kalor Masuk (J)' };
            rumusLatex = 'W = η × Q_masuk';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEfisiensiMesin(eta, Qmasuk, "W")';
            namaVariabel = 'W';
            break;
        case 'Qkeluar':
            inputs = { Qmasuk: 'Kalor Masuk (J)', W: 'Usaha (J)' };
            rumusLatex = 'Q_keluar = Q_masuk - W';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEfisiensiMesin(Qmasuk, W, "Qkeluar")';
            namaVariabel = 'Q_keluar';
            break;
        case 'eta-carnot':
            inputs = { Th: 'Suhu Tinggi (K)', Tc: 'Suhu Rendah (K)' };
            rumusLatex = 'η = 1 - (Tc / Th)';
            satuanHasil = '(tanpa satuan, atau %)';
            fungsiHitung = 'hitungEfisiensiCarnot(Th, Tc)';
            namaVariabel = 'η_Carnot';
            break;
        case 'COP-ref':
            inputs = { Qc: 'Kalor dari Ruang Dingin (J)', W: 'Usaha (J)' };
            rumusLatex = 'COP = Qc / W';
            satuanHasil = '(tanpa satuan)';
            fungsiHitung = 'hitungCOPPendingin(Qc, W, "COP")';
            namaVariabel = 'COP_ref';
            break;
        case 'W-ref':
            inputs = { Qc: 'Kalor dari Ruang Dingin (J)', COP: 'COP Pendingin' };
            rumusLatex = 'W = Qc / COP';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungCOPPendingin(Qc, COP, "W")';
            namaVariabel = 'W';
            break;
        case 'COP-hp':
            inputs = { Qh: 'Kalor ke Ruang Panas (J)', W: 'Usaha (J)' };
            rumusLatex = 'COP = Qh / W';
            satuanHasil = '(tanpa satuan)';
            fungsiHitung = 'hitungCOPPompaKalor(Qh, W, "COP")';
            namaVariabel = 'COP_hp';
            break;
        case 'W-hp-pompa':
            inputs = { Qh: 'Kalor ke Ruang Panas (J)', COP: 'COP Pompa Kalor' };
            rumusLatex = 'W = Qh / COP';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungCOPPompaKalor(Qh, COP, "W")';
            namaVariabel = 'W';
            break;
        case 'dS':
            inputs = { Q: 'Kalor (J)', T: 'Suhu (K)' };
            rumusLatex = 'ΔS = Q / T';
            satuanHasil = 'J/K';
            fungsiHitung = 'hitungEntropi(Q, T)';
            namaVariabel = 'ΔS';
            break;
        case 'dS-iso':
            inputs = { n: 'Jumlah Mol (mol)', V1: 'Volume Awal (m³)', V2: 'Volume Akhir (m³)' };
            rumusLatex = 'ΔS = nR ln(V₂/V₁)';
            satuanHasil = 'J/K';
            fungsiHitung = 'hitungEntropiIsotermal(n, V1, V2)';
            namaVariabel = 'ΔS';
            break;
        default:
            formDiv.innerHTML = '<p>Parameter tidak dikenali.</p>';
            return;
    }

    const form = document.createElement('form');
    form.id = 'kalkulator-form';
    form.onsubmit = (e) => {
        e.preventDefault();
        hitungDanTampilkan(parameter, inputs, satuanHasil, fungsiHitung, namaVariabel);
    };

    form.innerHTML += `<h3>Hitung: ${document.querySelector('#pilih-parameter option:checked').textContent}</h3>`;

    for (const [key, label] of Object.entries(inputs)) {
        form.innerHTML += `
            <div class="input-group">
                <label for="${key}">${label}:</label>
                <input type="number" step="any" id="${key}" required>
            </div>
        `;
    }

    form.innerHTML += `<button type="submit" class="hitung-btn">Hitung</button>`;

    formDiv.appendChild(form);

    setTimeout(() => {
        const inputFields = form.querySelectorAll('input[type="number"]');
        inputFields.forEach((input, index) => {
            input.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    if (this.value.trim() !== '') {
                        const nextIndex = index + 1;
                        if (nextIndex < inputFields.length) {
                            inputFields[nextIndex].focus();
                        } else {
                            form.dispatchEvent(new Event('submit'));
                        }
                    }
                }
            });
        });
        if (inputFields.length > 0) {
            inputFields[0].focus();
        }
    }, 0);
}

if (document.getElementById('pilih-topik')) {
    document.getElementById('pilih-topik').addEventListener('change', tampilkanKalkulator);
}

function hitungDanTampilkan(parameter, inputs, satuanHasil, fungsiHitung, namaVariabel) {
    const nilaiInput = {};
    let allInputsValid = true;

    for (const key of Object.keys(inputs)) {
        const inputElement = document.getElementById(key);
        if (inputElement && inputElement.value !== '') {
            let value = parseFloat(inputElement.value);
            if (isNaN(value)) {
                allInputsValid = false;
                break;
            }
            nilaiInput[key] = value;
        } else {
            allInputsValid = false;
            break;
        }
    }

    const hasilDiv = document.getElementById('hasil-kalkulasi');
    hasilDiv.innerHTML = '';
    hasilDiv.classList.remove('error');

    if (!allInputsValid) {
        hasilDiv.innerHTML = '<p class="error">⚠️ Mohon isi semua kolom input dengan angka yang valid!</p>';
        return;
    }

    try {
        const argsMatch = fungsiHitung.match(/\((.*?)\)/);
        let finalFunctionCall = fungsiHitung;

        if (argsMatch && argsMatch[1]) {
            const argNames = argsMatch[1].split(',').map(arg => arg.trim().replace(/"/g, ''));
            const argValues = argNames.map((name, index) => {
                if (index === argNames.length - 1 && argNames.length > 1 && !nilaiInput.hasOwnProperty(name)) {
                    return `"${name}"`;
                }
                if (nilaiInput.hasOwnProperty(name)) {
                    return JSON.stringify(nilaiInput[name]);
                }
                return 'null';
            });

            const funcName = fungsiHitung.substring(0, fungsiHitung.indexOf('('));
            finalFunctionCall = `${funcName}(${argValues.join(', ')})`;
        }

        const hasilNumerik = eval(finalFunctionCall);

        if (!isFinite(hasilNumerik)) throw new Error('Nilai tidak terdefinisi. Pastikan input tidak nol jika dibutuhkan sebagai pembagi.');

        let formatted_fx;
        if (Math.abs(hasilNumerik) > 1e6 || Math.abs(hasilNumerik) !== 0 && Math.abs(hasilNumerik) < 1e-4) {
            formatted_fx = hasilNumerik.toPrecision(6);
        } else {
            formatted_fx = hasilNumerik.toFixed(6).replace(/\.?0+$/, '');
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

        const form = document.getElementById('kalkulator-form');
        if (form) {
            const inputFields = form.querySelectorAll('input[type="number"]');
            inputFields.forEach(input => input.value = '');
            if (inputFields.length > 0) {
                inputFields[0].focus();
            }
        }

    } catch (e) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `<h3>⚠️ Error Perhitungan!</h3><p>Terjadi kesalahan saat memproses data:</p>
            <p style="font-weight: bold;">${e.message}</p>
            <p>Pastikan semua variabel sudah terisi dengan angka yang valid dan sesuai dengan konteks rumus yang dipilih.</p>`;
    }
}

const R = 8.314;

function hitungKonversiSuhu(val, target) {
    if (target === "C-dari-F") return (5/9) * (val - 32);
    if (target === "F-dari-C") return (9/5) * val + 32;
    if (target === "K-dari-C") return val + 273;
    if (target === "C-dari-K") return val - 273;
    if (target === "R-dari-C") return (4/5) * val;
    if (target === "C-dari-R") return (5/4) * val;
    throw new Error('Target konversi suhu tidak valid');
}

function hitungKalor(val1, val2, val3, target) {
    if (target === "Q") return val1 * val2 * val3;
    if (target === "m") {
        if (val2 === 0 || val3 === 0) throw new Error("Kalor jenis atau perubahan suhu tidak boleh nol.");
        return val1 / (val2 * val3);
    }
    if (target === "c") {
        if (val1 === 0 || val3 === 0) throw new Error("Massa atau perubahan suhu tidak boleh nol.");
        return val1 / (val2 * val3);
    }
    if (target === "dT") {
        if (val1 === 0 || val2 === 0) throw new Error("Massa atau kalor jenis tidak boleh nol.");
        return val1 / (val2 * val3);
    }
    throw new Error('Target kalor tidak valid');
}

function hitungPerubahanWujud(val1, val2, target) {
    if (target === "Q") return val1 * val2;
    if (target === "m") {
        if (val2 === 0) throw new Error("Kalor laten tidak boleh nol.");
        return val1 / val2;
    }
    if (target === "L") {
        if (val1 === 0) throw new Error("Massa tidak boleh nol.");
        return val1 / val2;
    }
    throw new Error('Target perubahan wujud tidak valid');
}

function hitungAsasBlack(m1, c1, T1, m2, c2, T2) {
    const numerator = m1 * c1 * T1 + m2 * c2 * T2;
    const denominator = m1 * c1 + m2 * c2;
    if (denominator === 0) throw new Error("Pembagi tidak boleh nol.");
    return numerator / denominator;
}

function hitungPemuaianLinear(val1, val2, val3, target) {
    if (target === "dL") return val1 * val2 * val3;
    if (target === "L") return val1 + val1 * val2 * val3;
    if (target === "alpha") {
        if (val2 === 0 || val3 === 0) throw new Error("L0 atau dT tidak boleh nol.");
        return val1 / (val2 * val3);
    }
    throw new Error('Target pemuaian linear tidak valid');
}

function hitungPemuaianLuas(val1, val2, val3, target) {
    if (target === "dA") return val1 * val2 * val3;
    if (target === "A") return val1 + val1 * val2 * val3;
    if (target === "beta") {
        if (val2 === 0 || val3 === 0) throw new Error("A0 atau dT tidak boleh nol.");
        return val1 / (val2 * val3);
    }
    throw new Error('Target pemuaian luas tidak valid');
}

function hitungPemuaianVolume(val1, val2, val3, target) {
    if (target === "dV") return val1 * val2 * val3;
    if (target === "V") return val1 + val1 * val2 * val3;
    if (target === "gamma") {
        if (val2 === 0 || val3 === 0) throw new Error("V0 atau dT tidak boleh nol.");
        return val1 / (val2 * val3);
    }
    throw new Error('Target pemuaian volume tidak valid');
}

function hitungGasIdeal(val1, val2, val3, target) {
    if (target === "P") {
        if (val3 === 0) throw new Error("Volume tidak boleh nol.");
        return (val1 * R * val2) / val3;
    }
    if (target === "V") {
        if (val3 === 0) throw new Error("Tekanan tidak boleh nol.");
        return (val1 * R * val2) / val3;
    }
    if (target === "T") {
        if (val3 === 0) throw new Error("Jumlah mol tidak boleh nol.");
        return (val1 * val2) / (val3 * R);
    }
    throw new Error('Target gas ideal tidak valid');
}

function hitungBoyle(P1, V1, val3, target) {
    if (target === "V2") {
        if (val3 === 0) throw new Error("P2 tidak boleh nol.");
        return (P1 * V1) / val3;
    }
    if (target === "P2") {
        if (val3 === 0) throw new Error("V2 tidak boleh nol.");
        return (P1 * V1) / val3;
    }
    throw new Error('Target Boyle tidak valid');
}

function hitungCharles(V1, T1, val3, target) {
    if (target === "V2") {
        if (T1 === 0) throw new Error("T1 tidak boleh nol.");
        return (V1 * val3) / T1;
    }
    if (target === "T2") {
        if (V1 === 0) throw new Error("V1 tidak boleh nol.");
        return (T1 * val3) / V1;
    }
    throw new Error('Target Charles tidak valid');
}

function hitungGayLussac(P1, T1, val3, target) {
    if (target === "P2") {
        if (T1 === 0) throw new Error("T1 tidak boleh nol.");
        return (P1 * val3) / T1;
    }
    if (target === "T2") {
        if (P1 === 0) throw new Error("P1 tidak boleh nol.");
        return (T1 * val3) / P1;
    }
    throw new Error('Target Gay-Lussac tidak valid');
}

function hitungAvogadro(V1, n1, val3, target) {
    if (target === "V2") {
        if (n1 === 0) throw new Error("n1 tidak boleh nol.");
        return (V1 * val3) / n1;
    }
    if (target === "n2") {
        if (V1 === 0) throw new Error("V1 tidak boleh nol.");
        return (n1 * val3) / V1;
    }
    throw new Error('Target Avogadro tidak valid');
}

function hitungVanDerWaals(n, T, V, a, b) {
    if (V - n * b === 0) throw new Error("Volume terkoreksi (V - nb) tidak boleh nol.");
    if (V === 0) throw new Error("Volume tidak boleh nol.");
    const term1 = (n * R * T) / (V - n * b);
    const term2 = a * Math.pow(n / V, 2);
    return term1 - term2;
}

function hitungEnergiDalam(n, T_or_dT, target) {
    if (target === "U") return (3/2) * n * R * T_or_dT;
    if (target === "dU") return (3/2) * n * R * T_or_dT;
    throw new Error('Target energi dalam tidak valid');
}

function hitungUsahaGas(val1, val2, target) {
    if (target === "W") return val1 * val2;
    if (target === "dV") {
        if (val2 === 0) throw new Error("Tekanan tidak boleh nol.");
        return val1 / val2;
    }
    throw new Error('Target usaha gas tidak valid');
}

function hitungUsahaIsotermal(n, T, V1, V2) {
    if (V1 === 0) throw new Error("Volume awal tidak boleh nol.");
    return n * R * T * Math.log(V2 / V1);
}

function hitungUsahaAdiabatik(val1, val2, val3, val4, val5, target) {
    if (target === "W") {
        const P1 = val1, V1 = val2, P2 = val3, V2 = val4, gamma = val5;
        if (gamma === 1) throw new Error("Gamma tidak boleh sama dengan 1.");
        return (P1 * V1 - P2 * V2) / (gamma - 1);
    }
    if (target === "T2") {
        const T1 = val1, V1 = val2, V2 = val3, gamma = val4;
        return T1 * Math.pow(V1 / V2, gamma - 1);
    }
    if (target === "V2") {
        const V1 = val1, P1 = val2, P2 = val3, gamma = val4;
        return V1 * Math.pow(P1 / P2, 1 / gamma);
    }
    throw new Error('Target usaha adiabatik tidak valid');
}

function hitungHukumPertama(val1, val2, target) {
    if (target === "dU") return val1 - val2;
    if (target === "Q") return val1 + val2;
    if (target === "W") return val1 - val2;
    throw new Error('Target hukum pertama tidak valid');
}

function hitungKapasitasKalor(val, target) {
    if (target === "Cp") return val + R;
    if (target === "Cv") return val - R;
    throw new Error('Target kapasitas kalor tidak valid');
}

function hitungGamma(Cp, Cv) {
    if (Cv === 0) throw new Error("Cv tidak boleh nol.");
    return Cp / Cv;
}

function hitungIsobarik(val1, val2, val3, val4, target) {
    if (target === "W") {
        const P = val1, V2 = val2, V1 = val3;
        return P * (V2 - V1);
    }
    if (target === "Q") {
        const n = val1, Cp = val2, T2 = val3, T1 = val4;
        return n * Cp * (T2 - T1);
    }
    if (target === "dU") {
        const n = val1, Cv = val2, T2 = val3, T1 = val4;
        return n * Cv * (T2 - T1);
    }
    throw new Error('Target isobarik tidak valid');
}

function hitungIsochorik(n, Cv, T2, T1, target) {
    if (target === "Q" || target === "dU") {
        return n * Cv * (T2 - T1);
    }
    throw new Error('Target isochorik tidak valid');
}

function hitungIsotermal(n, T, V1, V2) {
    if (V1 === 0) throw new Error("Volume awal tidak boleh nol.");
    return n * R * T * Math.log(V2 / V1);
}

function hitungAdiabatik(val1, val2, val3, val4, val5, target) {
    if (target === "W") {
        const P1 = val1, V1 = val2, P2 = val3, V2 = val4, gamma = val5;
        if (gamma === 1) throw new Error("Gamma tidak boleh sama dengan 1.");
        return (P1 * V1 - P2 * V2) / (gamma - 1);
    }
    if (target === "dU") {
        return -val1;
    }
    if (target === "P2") {
        const P1 = val1, V1 = val2, V2 = val3, gamma = val4;
        return P1 * Math.pow(V1 / V2, gamma);
    }
    if (target === "V2") {
        const V1 = val1, P1 = val2, P2 = val3, gamma = val4;
        return V1 * Math.pow(P1 / P2, 1 / gamma);
    }
    throw new Error('Target adiabatik tidak valid');
}

function hitungEfisiensiMesin(val1, val2, target) {
    if (target === "eta") {
        if (val2 === 0) throw new Error("Kalor masuk tidak boleh nol.");
        return val1 / val2;
    }
    if (target === "W") {
        return val1 * val2;
    }
    if (target === "Qkeluar") {
        return val1 - val2;
    }
    throw new Error('Target efisiensi mesin tidak valid');
}

function hitungEfisiensiCarnot(Th, Tc) {
    if (Th === 0) throw new Error("Suhu tinggi tidak boleh nol.");
    return 1 - (Tc / Th);
}

function hitungCOPPendingin(val1, val2, target) {
    if (target === "COP") {
        if (val2 === 0) throw new Error("Usaha tidak boleh nol.");
        return val1 / val2;
    }
    if (target === "W") {
        if (val2 === 0) throw new Error("COP tidak boleh nol.");
        return val1 / val2;
    }
    throw new Error('Target COP pendingin tidak valid');
}

function hitungCOPPompaKalor(val1, val2, target) {
    if (target === "COP") {
        if (val2 === 0) throw new Error("Usaha tidak boleh nol.");
        return val1 / val2;
    }
    if (target === "W") {
        if (val2 === 0) throw new Error("COP tidak boleh nol.");
        return val1 / val2;
    }
    throw new Error('Target COP pompa kalor tidak valid');
}

function hitungEntropi(Q, T) {
    if (T === 0) throw new Error("Suhu tidak boleh nol.");
    return Q / T;
}

function hitungEntropiIsotermal(n, V1, V2) {
    if (V1 === 0) throw new Error("Volume awal tidak boleh nol.");
    return n * R * Math.log(V2 / V1);
}