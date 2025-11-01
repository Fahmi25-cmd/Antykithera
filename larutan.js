const R = 0.0821; 
const T_AIR_BEKU = 0.00; 
const T_AIR_DIDIH = 100.00; 
const KF_AIR = 1.86; 
const KB_AIR = 0.512; 

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

function getOpsiParameter(topik) {
    switch (topik) {
        case 'penurunan-tekanan-uap':
            return { 'dP': 'Penurunan Tekanan Uap (ΔP)' };
        case 'tekanan-uap-larutan':
            return { 'P': 'Tekanan Uap Larutan (P)' };
        case 'fraksi-mol-pelarut':
            return { 
                'X1': 'Fraksi Mol Pelarut (X₁)',
                'X2': 'Fraksi Mol Zat Terlarut (X₂)'
            };

        case 'penurunan-titik-beku':
            return { 'dTf': 'Penurunan Titik Beku (ΔTf)' };
        case 'konstanta-penurunan-titik-beku':
            return { 'Kf': 'Konstanta Penurunan Titik Beku (Kf)' };
        case 'massa-molar-dari-titik-beku':
            return { 'M2_dTf': 'Massa Molar Terlarut (M₂)' };
        
        case 'kenaikan-titik-didih':
            return { 'dTb': 'Kenaikan Titik Didih (ΔTb)' };
        case 'konstanta-kenaikan-titik-didih':
            return { 'Kb': 'Konstanta Kenaikan Titik Didih (Kb)' };
        case 'massa-molar-dari-titik-didih':
            return { 'M2_dTb': 'Massa Molar Terlarut (M₂)' };

        case 'tekanan-osmotik':
            return { 'pi': 'Tekanan Osmotik (π)' };
        case 'massa-molar-dari-tekanan-osmotik':
            return { 'M2_pi': 'Massa Molar Terlarut (M₂)' };
        case 'pengaruh-suhu-tekanan-osmotik':
            return { 'pi2_T': 'Tekanan Osmotik Akhir (π₂)' };

        case 'faktor-vant-hoff':
            return { 'i_alpha': 'Faktor van’t Hoff (i)' };
        case 'derajat-disosiasi-elektrolit':
            return { 'alpha': 'Derajat Disosiasi (α)' };
        
        case 'perhitungan-dengan-vant-hoff': 
        case 'elektrolit-vant-hoff':
            return {
                'dTf_i': 'ΔTf Elektrolit (ΔTf)',
                'dTb_i': 'ΔTb Elektrolit (ΔTb)',
                'pi_i': 'π Elektrolit (π)',
                'dP_i': 'ΔP Elektrolit (ΔP)'
            };

        case 'perbandingan-sifat-koligatif':
            return { 'dTb_per_dTf': 'Perbandingan ΔTb/ΔTf' };
        case 'sifat-non-elektrolit':
            return { 'Tf_larutan_non': 'Titik Beku Larutan (Tf)' };
        case 'sifat-elektrolit':
            return { 'Tb_larutan_elektrolit': 'Titik Didih Larutan Elektrolit (Tb)' };
        
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
    let catatan = '';

    switch (parameter) {
        case 'dP':
            inputs = { P0: 'Tekanan Uap Murni (P⁰, atm)', n1: 'Mol Pelarut (n₁, mol)', n2: 'Mol Terlarut (n₂, mol)' };
            satuanHasil = 'atm';
            fungsiHitung = 'hitungPenurunanTekananUap(P0, n1, n2, "dP")';
            namaVariabel = 'ΔP';
            break;
        case 'P':
            inputs = { P0: 'Tekanan Uap Murni (P⁰, atm)', n1: 'Mol Pelarut (n₁, mol)', n2: 'Mol Terlarut (n₂, mol)' };
            satuanHasil = 'atm';
            fungsiHitung = 'hitungTekananUapLarutan(P0, n1, n2, "P")';
            namaVariabel = 'P';
            break;
        case 'X1':
            inputs = { n1: 'Mol Pelarut (n₁, mol)', n2: 'Mol Terlarut (n₂, mol)' };
            satuanHasil = 'fraksi';
            fungsiHitung = 'hitungFraksiMolKoligatif(n1, n2, "X1")';
            namaVariabel = 'X₁';
            break;
        case 'X2':
            inputs = { n1: 'Mol Pelarut (n₁, mol)', n2: 'Mol Terlarut (n₂, mol)' };
            satuanHasil = 'fraksi';
            fungsiHitung = 'hitungFraksiMolKoligatif(n1, n2, "X2")';
            namaVariabel = 'X₂';
            break;

        case 'dTf':
            inputs = { m: 'Molalitas (m, mol/kg)', Kf: 'Konstanta Kf (°C·kg/mol)', i: 'Faktor van’t Hoff (i, default 1)' };
            satuanHasil = '°C';
            fungsiHitung = 'hitungPenurunanTitikBeku(m, Kf, i, "dTf")';
            namaVariabel = 'ΔTf';
            catatan = `Titik beku larutan (Tf) = ${T_AIR_BEKU} °C - ΔTf (asumsi pelarut air).`;
            break;
        case 'Kf':
            inputs = { dTf: 'ΔTf (°C)', m: 'Molalitas (m, mol/kg)', i: 'Faktor van’t Hoff (i, default 1)' };
            satuanHasil = '°C·kg/mol';
            fungsiHitung = 'hitungKonstantaKf(dTf, m, i, "Kf")';
            namaVariabel = 'Kf';
            break;
        case 'M2_dTf':
            inputs = { Kf: 'Konstanta Kf (°C·kg/mol)', m2: 'Massa Terlarut (m₂, g)', dTf: 'ΔTf (°C)', m1: 'Massa Pelarut (m₁, g)', i: 'Faktor van’t Hoff (i, default 1)' };
            satuanHasil = 'g/mol';
            fungsiHitung = 'hitungMassaMolarDariDeltaT(Kf, m2, dTf, m1, i, "M2")';
            namaVariabel = 'M₂ (dari ΔTf)';
            break;

        case 'dTb':
            inputs = { m: 'Molalitas (m, mol/kg)', Kb: 'Konstanta Kb (°C·kg/mol)', i: 'Faktor van’t Hoff (i, default 1)' };
            satuanHasil = '°C';
            fungsiHitung = 'hitungKenaikanTitikDidih(m, Kb, i, "dTb")';
            namaVariabel = 'ΔTb';
            catatan = `Titik didih larutan (Tb) = ${T_AIR_DIDIH} °C + ΔTb (asumsi pelarut air).`;
            break;
        case 'Kb':
            inputs = { dTb: 'ΔTb (°C)', m: 'Molalitas (m, mol/kg)', i: 'Faktor van’t Hoff (i, default 1)' };
            satuanHasil = '°C·kg/mol';
            fungsiHitung = 'hitungKonstantaKb(dTb, m, i, "Kb")';
            namaVariabel = 'Kb';
            break;
        case 'M2_dTb':
            inputs = { Kb: 'Konstanta Kb (°C·kg/mol)', m2: 'Massa Terlarut (m₂, g)', dTb: 'ΔTb (°C)', m1: 'Massa Pelarut (m₁, g)', i: 'Faktor van’t Hoff (i, default 1)' };
            satuanHasil = 'g/mol';
            fungsiHitung = 'hitungMassaMolarDariDeltaT(Kb, m2, dTb, m1, i, "M2")';
            namaVariabel = 'M₂ (dari ΔTb)';
            break;

        case 'pi':
            inputs = { M: 'Molaritas (M, mol/L)', T: 'Suhu (T, K)', i: 'Faktor van’t Hoff (i, default 1)' };
            satuanHasil = 'atm';
            fungsiHitung = 'hitungTekananOsmotik(M, T, i, "pi")';
            namaVariabel = 'π';
            break;
        case 'M2_pi':
            inputs = { m: 'Massa Terlarut (m, g)', T: 'Suhu (T, K)', pi: 'Tekanan Osmotik (π, atm)', V: 'Volume Larutan (V, L)', i: 'Faktor van’t Hoff (i, default 1)' };
            satuanHasil = 'g/mol';
            fungsiHitung = 'hitungMassaMolarDariOsmotik(m, T, pi, V, i, "M2")';
            namaVariabel = 'M₂ (dari π)';
            break;
        case 'pi2_T':
            inputs = { pi1: 'Tekanan Osmotik Awal (π₁, atm)', T1: 'Suhu Awal (T₁, K)', T2: 'Suhu Akhir (T₂, K)' };
            satuanHasil = 'atm';
            fungsiHitung = 'hitungPengaruhSuhuOsmotik(pi1, T1, T2, "pi2")';
            namaVariabel = 'π₂';
            catatan = 'Menggunakan rumus $\\frac{\\pi_1}{T_1} = \\frac{\\pi_2}{T_2}$ (konsentrasi tetap)';
            break;

        case 'i_alpha':
            inputs = { alpha: 'Derajat Disosiasi (α)', n: 'Jumlah Ion (n)' };
            satuanHasil = 'rasio';
            fungsiHitung = 'hitungFaktorVantHoff(alpha, n, "i")';
            namaVariabel = 'i';
            break;
        case 'alpha':
            inputs = { i: 'Faktor van’t Hoff (i)', n: 'Jumlah Ion (n)' };
            satuanHasil = 'rasio';
            fungsiHitung = 'hitungDerajatDisosiasi(i, n, "alpha")';
            namaVariabel = 'α';
            break;
        case 'dTf_i':
            inputs = { m: 'Molalitas (m, mol/kg)', Kf: 'Konstanta Kf (°C·kg/mol)', alpha: 'Derajat Disosiasi (α)', n: 'Jumlah Ion (n)' };
            satuanHasil = '°C';
            fungsiHitung = 'hitungSifatKoligatifElektrolit(m, Kf, alpha, n, "dTf")';
            namaVariabel = 'ΔTf Elektrolit';
            break;
        case 'dTb_i':
            inputs = { m: 'Molalitas (m, mol/kg)', Kb: 'Konstanta Kb (°C·kg/mol)', alpha: 'Derajat Disosiasi (α)', n: 'Jumlah Ion (n)' };
            satuanHasil = '°C';
            fungsiHitung = 'hitungSifatKoligatifElektrolit(m, Kb, alpha, n, "dTb")';
            namaVariabel = 'ΔTb Elektrolit';
            break;
        case 'pi_i':
            inputs = { M: 'Molaritas (M, mol/L)', T: 'Suhu (T, K)', alpha: 'Derajat Disosiasi (α)', n: 'Jumlah Ion (n)' };
            satuanHasil = 'atm';
            fungsiHitung = 'hitungSifatKoligatifElektrolit(M, T, alpha, n, "pi")';
            namaVariabel = 'π Elektrolit';
            break;
        case 'dP_i':
            inputs = { P0: 'Tekanan Uap Murni (P⁰, atm)', n2: 'Mol Terlarut (n₂, mol)', n1: 'Mol Pelarut (n₁, mol)', alpha: 'Derajat Disosiasi (α)', n: 'Jumlah Ion (n)' };
            satuanHasil = 'atm';
            fungsiHitung = 'hitungPenurunanTekananUapElektrolit(P0, n2, n1, alpha, n, "dP")';
            namaVariabel = 'ΔP Elektrolit';
            break;

        case 'dTb_per_dTf':
            inputs = { Kb: 'Konstanta Kb (°C·kg/mol)', Kf: 'Konstanta Kf (°C·kg/mol)' };
            satuanHasil = 'rasio';
            fungsiHitung = 'hitungPerbandinganDeltaT(Kb, Kf, "rasio")';
            namaVariabel = 'ΔTb/ΔTf';
            break;
        case 'Tf_larutan_non':
            inputs = { m: 'Molalitas (m, mol/kg)', Kf: 'Konstanta Kf (°C·kg/mol)', Tf0: 'Titik Beku Murni (Tf⁰, °C)' };
            satuanHasil = '°C';
            fungsiHitung = 'hitungTitikBekuLarutanNonElektrolit(m, Kf, Tf0, "Tf")';
            namaVariabel = 'Tf Larutan';
            break;
        case 'Tb_larutan_elektrolit':
            inputs = { m: 'Molalitas (m, mol/kg)', Kb: 'Konstanta Kb (°C·kg/mol)', Tb0: 'Titik Didih Murni (Tb⁰, °C)', alpha: 'Derajat Disosiasi (α)', n: 'Jumlah Ion (n)' };
            satuanHasil = '°C';
            fungsiHitung = 'hitungTitikDidihLarutanElektrolit(m, Kb, Tb0, alpha, n, "Tb")';
            namaVariabel = 'Tb Larutan Elektrolit';
            break;
        
        default:
            return;
    }

    configPerhitungan = { fungsiHitung, satuanHasil, namaVariabel, parameter, catatan }; 

    const form = document.createElement('form');
    form.id = 'kalkulator-form';
    form.onsubmit = (e) => { e.preventDefault(); prosesPerhitungan(); };

    for (const [key, labelText] of Object.entries(inputs)) {
        const label = document.createElement('label');
        label.setAttribute('for', key);
        label.textContent = labelText + ': ';

        const input = document.createElement('input');
        input.type = 'number';
        input.step = 'any';
        input.id = key;
        input.name = key;
        input.required = true;

        if (key === 'i') {
             input.value = 1;
             input.required = false; 
        }
        if (key === 'Kf' && parameter.includes('dTf')) {
            input.value = KF_AIR;
        }
        if (key === 'Kb' && parameter.includes('dTb')) {
            input.value = KB_AIR;
        }
        if (key === 'Tf0') {
            input.value = T_AIR_BEKU;
        }
        if (key === 'Tb0') {
            input.value = T_AIR_DIDIH;
        }
        if (key === 'alpha') {
            input.value = 1;
        }

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    }

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Hitung';
    form.appendChild(submitBtn);

    formDiv.appendChild(form);
    
    const inputElements = form.querySelectorAll('input[type="number"]');
    inputElements.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const value = input.value.trim();
                if (value === '' && input.required) {
                    input.focus();
                    return;
                }
                if (index === inputElements.length - 1) {
                    prosesPerhitungan();
                } else {
                    inputElements[index + 1].focus();
                }
            }
        });
    });

    if (inputElements.length > 0) {
        inputElements[0].focus();
    }
}

function prosesPerhitungan() {
    const form = document.getElementById('kalkulator-form');
    const formData = new FormData(form);
    const nilaiInput = {};
    let allInputsValid = true;

    const { fungsiHitung, satuanHasil, namaVariabel, parameter, catatan } = configPerhitungan;

    for (const [key, value] of formData.entries()) {
        const inputElement = document.getElementById(key);
        let parsedValue;
        const trimmedValue = value.trim();
        
        if (!inputElement.required && trimmedValue === '') {
            if (key === 'i') {
                parsedValue = 1; 
            } else if (key === 'alpha') {
                parsedValue = 1; 
            } else {
                parsedValue = null; 
            }
        } else {
            parsedValue = parseFloat(trimmedValue);
            if (isNaN(parsedValue)) {
                allInputsValid = false;
                break;
            }
        }

        nilaiInput[key] = parsedValue;
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
                    if (name === 'i' && val === null) return JSON.stringify(1);
                    if (name === 'alpha' && val === null) return JSON.stringify(1);
                    return typeof val === 'string' ? `"${val}"` : JSON.stringify(val); 
                }
                return 'null';
            });

            const funcName = fungsiHitung.substring(0, fungsiHitung.indexOf('('));
            finalFunctionCall = `${funcName}(${argValues.join(', ')})`;
        }
        
        const hasilNumerik = eval(finalFunctionCall);

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
        
        let sifatKoligatifKeterangan = '';
        if (['dTf', 'dTb', 'pi', 'dP', 'dTf_i', 'dTb_i', 'pi_i', 'dP_i'].includes(parameter)) {
             sifatKoligatifKeterangan = ` (bersifat ${hasilNumerik > 0 ? 'koligatif' : 'non-koligatif'}/${hasilNumerik === 0 ? 'ideal' : '...' })`;
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
                    <td style="border: 1px solid #ccc; padding: 10px;">${formatted_fx} ${satuanHasil}${sifatKoligatifKeterangan}</td>
                </tr>
            </table>
        `;

        const inputElements = form.querySelectorAll('input[type="number"]');
        inputElements.forEach(input => {
            input.value = ''; 
        });

        if (inputElements.length > 0) {
            inputElements[0].focus();
        }

    } catch (e) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `<h3>⚠️ Error Perhitungan!</h3><p>Terjadi kesalahan saat memproses data:</p>
            <p style="font-weight: bold;">${e.message}</p>
            <p>Pastikan semua variabel sudah terisi dengan data yang valid dan sesuai dengan konteks rumus yang dipilih.</p>`;
    }
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

        if (Object.keys(opsi).length === 0) {
            console.error(`[Debug] Tidak ditemukan parameter untuk topik: '${topik}'. Fungsi getOpsiParameter() mengembalikan objek kosong.`);
            kalkulatorArea.innerHTML = '<p style="color: red; font-weight: bold;">Maaf, belum ada parameter perhitungan yang tersedia untuk topik ini.</p>';
            return; 
        }

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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pilih-topik').onchange = tampilkanKalkulator;
});

function hitungFraksiMolKoligatif(n1, n2, target) {
    const total = n1 + n2;
    if (total === 0) throw new Error("Total mol (n1 + n2) tidak boleh nol.");

    if (target === "X1") {
        return n1 / total;
    }
    if (target === "X2") {
        return n2 / total;
    }
    throw new Error('Target tidak valid');
}

function hitungTekananUapLarutan(P0, n1, n2, target) {
    if (target === "P") {
        const X1 = hitungFraksiMolKoligatif(n1, n2, "X1");
        return P0 * X1;
    }
    throw new Error('Target tidak valid');
}

function hitungPenurunanTekananUap(P0, n1, n2, target) {
    if (target === "dP") {
        const X2 = hitungFraksiMolKoligatif(n1, n2, "X2");
        return P0 * X2;
    }
    throw new Error('Target tidak valid');
}

function hitungPenurunanTitikBeku(m, Kf, i = 1, target) {
    if (target === "dTf") {
        return i * Kf * m;
    }
    throw new Error('Target tidak valid');
}

function hitungKonstantaKf(dTf, m, i = 1, target) {
    if (target === "Kf") {
        if (m === 0 || i === 0) throw new Error("Molalitas (m) atau Faktor i tidak boleh nol.");
        return dTf / (i * m);
    }
    throw new Error('Target tidak valid');
}

function hitungMassaMolarDariDeltaT(K_const, m2, deltaT, m1, i = 1, target) {
    if (target === "M2") {
        if (deltaT === 0 || m1 === 0 || i === 0) throw new Error("ΔT, massa pelarut (m₁), atau Faktor i tidak boleh nol.");
        return (K_const * m2 * 1000) / (deltaT * m1 * i);
    }
    throw new Error('Target tidak valid');
}

function hitungTitikBekuLarutanNonElektrolit(m, Kf, Tf0, target) {
    if (target === "Tf") {
        const i = 1; 
        const dTf = hitungPenurunanTitikBeku(m, Kf, i, "dTf");
        return Tf0 - dTf;
    }
    throw new Error('Target tidak valid');
}

function hitungKenaikanTitikDidih(m, Kb, i = 1, target) {
    if (target === "dTb") {
        return i * Kb * m;
    }
    throw new Error('Target tidak valid');
}

function hitungKonstantaKb(dTb, m, i = 1, target) {
    if (target === "Kb") {
        if (m === 0 || i === 0) throw new Error("Molalitas (m) atau Faktor i tidak boleh nol.");
        return dTb / (i * m);
    }
    throw new Error('Target tidak valid');
}

function hitungTitikDidihLarutanElektrolit(m, Kb, Tb0, alpha, n, target) {
    if (target === "Tb") {
        const i = hitungFaktorVantHoff(alpha, n, "i");
        const dTb = hitungKenaikanTitikDidih(m, Kb, i, "dTb");
        return Tb0 + dTb;
    }
    throw new Error('Target tidak valid');
}

function hitungTekananOsmotik(M, T, i = 1, target) {
    if (target === "pi") {
        return i * M * R * T;
    }
    throw new Error('Target tidak valid');
}

function hitungMassaMolarDariOsmotik(m, T, pi, V, i = 1, target) {
    if (target === "M2") {
        if (pi === 0 || V === 0 || i === 0) throw new Error("Tekanan osmotik (π), Volume (V), atau Faktor i tidak boleh nol.");
        return (m * R * T) / (pi * V * i);
    }
    throw new Error('Target tidak valid');
}

function hitungPengaruhSuhuOsmotik(pi1, T1, T2, target) {
    if (target === "pi2") {
        if (T1 === 0) throw new Error("Suhu awal (T₁) tidak boleh nol (dalam Kelvin).");
        return pi1 * (T2 / T1);
    }
    throw new Error('Target tidak valid');
}

function hitungFaktorVantHoff(alpha, n, target) {
    if (target === "i") {
        if (n < 1) throw new Error("Jumlah ion (n) harus minimal 1.");
        return 1 + alpha * (n - 1);
    }
    throw new Error('Target tidak valid');
}

function hitungDerajatDisosiasi(i, n, target) {
    if (target === "alpha") {
        if (n === 1) throw new Error("Untuk n=1, zat terlarut adalah non-elektrolit, dan α tidak terdefinisi (i=1).");
        if ((n - 1) === 0) throw new Error("Penyebut (n-1) tidak boleh nol.");
        return (i - 1) / (n - 1);
    }
    throw new Error('Target tidak valid');
}

function hitungSifatKoligatifElektrolit(val1, val2, alpha, n, target) {
    const i = hitungFaktorVantHoff(alpha, n, "i");

    if (target === "dTf") {
        return hitungPenurunanTitikBeku(val1, val2, i, "dTf"); 
    }
    if (target === "dTb") {
        return hitungKenaikanTitikDidih(val1, val2, i, "dTb"); 
    }
    if (target === "pi") {
        return hitungTekananOsmotik(val1, val2, i, "pi"); 
    }
    throw new Error('Target tidak valid');
}

function hitungPenurunanTekananUapElektrolit(P0, n2, n1, alpha, n, target) {
    if (target === "dP") {
        const i = hitungFaktorVantHoff(alpha, n, "i");
        const X2 = hitungFraksiMolKoligatif(n1, n2, "X2");
        
        const n_total_elektrolit = n1 + (i * n2);
        if (n_total_elektrolit === 0) throw new Error("Mol total larutan tidak boleh nol.");

        return P0 * ((i * n2) / n_total_elektrolit);
    }
    throw new Error('Target tidak valid');
}

function hitungPerbandinganDeltaT(Kb, Kf, target) {
    if (target === "rasio") {
        if (Kf === 0) throw new Error("Konstanta Kf tidak boleh nol.");
        return Kb / Kf;
    }
    throw new Error('Target tidak valid');
}