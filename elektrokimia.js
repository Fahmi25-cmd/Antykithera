const F = 96485; 
const R = 8.314; 
const R_ATM = 0.0821; 
const T_STD = 298.15; 
const RT_PER_F = 0.02569; 
const LOG_FACTOR = 0.0592; 

const atomicMasses = {
    'H': 1.008, 'He': 4.002, 'Li': 6.941, 'Be': 9.012, 'B': 10.81, 'C': 12.01, 'N': 14.01, 'O': 16.00, 'F': 19.00, 'Ne': 20.18,
    'Na': 22.99, 'Mg': 24.31, 'Al': 26.98, 'Si': 28.09, 'P': 30.97, 'S': 32.07, 'Cl': 35.45, 'Ar': 39.95, 'K': 39.10, 'Ca': 40.08,
    'Fe': 55.85, 'Cu': 63.55, 'Zn': 65.38, 'Ag': 107.87, 'Pb': 207.2, 'Sn': 118.71, 'Pt': 195.08, 'Au': 196.97, 'Hg': 200.59
    
};

let configPerhitungan = {}; 

function getAtomicMass(symbol) {
    if (!symbol) return null;
    const cleanSymbol = symbol.trim();
    const twoLetterSymbol = cleanSymbol.charAt(0).toUpperCase() + cleanSymbol.slice(1).toLowerCase();
    if (atomicMasses.hasOwnProperty(twoLetterSymbol)) return atomicMasses[twoLetterSymbol];
    const oneLetterSymbol = cleanSymbol.charAt(0).toUpperCase();
    if (atomicMasses.hasOwnProperty(oneLetterSymbol)) return atomicMasses[oneLetterSymbol];
    return null;
}

function hitungMassaMolarFormula(formula, target) {
    if (formula.toUpperCase().includes('CU')) return 63.55;
    if (formula.toUpperCase().includes('ZN')) return 65.38;
    throw new Error('Massa molar dari formula tidak didukung di kalkulator elektrokimia ini. Masukkan nilai M manual.');
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
        case 'potensial-sel':
            return { 'E-sel': 'Potensial Sel Standar (E°sel)' };
        case 'reaksi-redoks-sel':
            return { 'reaksi-jenis': 'Jenis Reaksi (Oksidasi/Reduksi)' };
        case 'arah-aliran-elektron':
            return { 'arah-e': 'Arah Aliran Elektron' };
        case 'elektroda-anoda-katoda':
            return { 'elektroda-jenis': 'Penentuan Anoda/Katoda' };

        case 'persamaan-nernst':
            return { 'E-nernst': 'Potensial Sel Non-Standar (Esel) (25°C)' };
        case 'potensial-non-standar':
            return { 'E-nonstd-general': 'Potensial Sel Non-Standar (Esel) (Suhu T)' };
        case 'energi-gibbs':
            return { 'deltaG': 'Energi Gibbs (ΔG)' };
        case 'hubungan-delta-g-dan-e':
            return { 'E-dari-deltaG': 'Potensial Sel dari ΔG (Esel)' };
        case 'konstanta-kesetimbangan-elektrokimia':
            return { 'K-dari-E': 'Konstanta Kesetimbangan (K) dari E°sel (25°C)' };

        case 'hukum-faraday-pertama':
            return { 'm-faraday1': 'Massa Endapan (m) dari I & t' };
        case 'hukum-faraday-kedua':
            return { 'm1-faraday2': 'Massa Zat 1 dari Massa Zat 2 (m₁)' };
        case 'massa-endapan':
            return { 'm-dari-Q': 'Massa Endapan (m) dari Muatan (Q)' };
        case 'jumlah-mol-elektron':
            return { 'ne-mol-e': 'Jumlah Mol Elektron (nₑ⁻)' };
        case 'hubungan-arus-waktu':
            return { 'Q-arus-waktu': 'Muatan Listrik Total (Q)' };

        case 'jumlah-mol-gas':
            return { 'n-gas-elektro': 'Jumlah Mol Gas (n)' };
        case 'massa-logam-endapan':
            return { 'm-logam': 'Massa Logam Endapan (m)' };
        case 'volume-gas-elektrolisis':
            return { 'V-gas-elektro': 'Volume Gas (V) STP (atau T, P tertentu)' };
        case 'efisiensi-elektrolisis':
            return { 'persen-efisiensi': 'Efisiensi Elektrolisis (%)' };

        case 'potensial-elektroda-standar':
            return { 'E-red-ox': 'Potensial Reduksi/Oksidasi (E°)' };
        case 'reaksi-setengah-sel':
            return { 'reaksi-setengah': 'Penulisan Reaksi Setengah Sel' };
        case 'persamaan-sel-volta':
            return { 'persamaan-sel': 'Penulisan Persamaan Sel (Notasi Sel)' };
        case 'susunan-sel-volta':
            return { 'susunan-sel': 'Penentuan Susunan Sel Volta' };

        case 'delta-g-dari-e':
            return { 'deltaG-dari-E': 'ΔG° dari E°sel' };
        case 'konstanta-k-dari-e':
            return { 'K-dari-E-std': 'K dari E°sel (Suhu T)' };
        case 'hubungan-nernst-dengan-k':
            return { 'E-std-dari-K': 'E°sel dari K (25°C)' };
        case 'hubungan-energi-dan-massa':
            return { 'W-dari-m': 'Energi Listrik (W) dari Massa Endapan (m)' };
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
        case 'E-sel':
            inputs = { E_katoda: 'E° Katoda (V)', E_anoda: 'E° Anoda (V)' };
            satuanHasil = 'Volt';
            fungsiHitung = 'hitungPotensialSelStandar(E_katoda, E_anoda, "E_sel")';
            namaVariabel = 'E°sel';
            break;
        case 'reaksi-jenis':
            inputs = { E_red: 'E° Reduksi (V)', E_ox: 'E° Oksidasi (V)' };
            satuanHasil = 'Jenis Reaksi';
            fungsiHitung = 'tentukanJenisReaksi(E_red, E_ox, "jenis")';
            namaVariabel = 'Reaksi';
            break;
        case 'arah-e':
            inputs = { E_katoda: 'E° Katoda (V)', E_anoda: 'E° Anoda (V)' };
            satuanHasil = 'Arah';
            fungsiHitung = 'tentukanArahAliranElektron(E_katoda, E_anoda, "arah")';
            namaVariabel = 'Aliran e⁻';
            break;
        case 'elektroda-jenis':
            inputs = { E_red_a: 'E° Reduksi A (V)', E_red_k: 'E° Reduksi K (V)' };
            satuanHasil = 'Elektroda';
            fungsiHitung = 'tentukanAnodaKatoda(E_red_a, E_red_k, "elektroda")';
            namaVariabel = 'Anoda/Katoda';
            break;

        case 'E-nernst':
            inputs = { E_std: 'E°sel (V)', n: 'Jumlah e⁻ (n)', Q: 'Kuosien Reaksi (Q)' };
            satuanHasil = 'Volt';
            fungsiHitung = 'hitungPersamaanNernst(E_std, n, Q, T_STD, "E_sel_25C")';
            namaVariabel = 'Esel (25°C)';
            break;
        case 'E-nonstd-general':
            inputs = { E_std: 'E°sel (V)', n: 'Jumlah e⁻ (n)', Q: 'Kuosien Reaksi (Q)', T: 'Suhu (T, K)' };
            satuanHasil = 'Volt';
            fungsiHitung = 'hitungPersamaanNernst(E_std, n, Q, T, "E_sel_T")';
            namaVariabel = 'Esel (T)';
            break;
        case 'deltaG':
            inputs = { n: 'Jumlah e⁻ (n)', E_sel: 'Potensial Sel (Esel, V)' };
            satuanHasil = 'Joule';
            fungsiHitung = 'hitungEnergiGibbs(n, E_sel, "deltaG")';
            namaVariabel = 'ΔG';
            break;
        case 'E-dari-deltaG':
            inputs = { deltaG: 'Energi Gibbs (ΔG, J)', n: 'Jumlah e⁻ (n)' };
            satuanHasil = 'Volt';
            fungsiHitung = 'hitungPotensialSelDariDeltaG(deltaG, n, "E_sel")';
            namaVariabel = 'Esel';
            break;
        case 'K-dari-E':
            inputs = { E_std: 'E°sel (V)', n: 'Jumlah e⁻ (n)' };
            satuanHasil = 'Konstanta';
            fungsiHitung = 'hitungKonstantaKesetimbanganDariEstd(E_std, n, T_STD, "K_25C")';
            namaVariabel = 'K (25°C)';
            break;

        case 'm-faraday1':
            inputs = { I: 'Arus (I, A)', t: 'Waktu (t, s)', M: 'Massa Molar (M, g/mol)', n: 'Jumlah e⁻ (n)' };
            satuanHasil = 'gram';
            fungsiHitung = 'hitungHukumFaradayI(I, t, M, n, "m")';
            namaVariabel = 'm';
            break;
        case 'm1-faraday2':
            inputs = { m2: 'Massa Zat 2 (m₂, g)', M1: 'Massa Molar 1 (M₁, g/mol)', n1: 'e⁻ Zat 1 (n₁)', M2: 'Massa Molar 2 (M₂, g/mol)', n2: 'e⁻ Zat 2 (n₂)' };
            satuanHasil = 'gram';
            fungsiHitung = 'hitungHukumFaradayII(m2, M1, n1, M2, n2, "m1")';
            namaVariabel = 'm₁';
            break;
        case 'm-dari-Q':
            inputs = { Q: 'Muatan (Q, C)', M: 'Massa Molar (M, g/mol)', n: 'Jumlah e⁻ (n)' };
            satuanHasil = 'gram';
            fungsiHitung = 'hitungMassaDariMuatan(Q, M, n, "m")';
            namaVariabel = 'm';
            break;
        case 'ne-mol-e':
            inputs = { Q: 'Muatan (Q, C)' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungMolElektron(Q, null, "ne")';
            namaVariabel = 'nₑ⁻';
            break;
        case 'Q-arus-waktu':
            inputs = { I: 'Arus (I, A)', t: 'Waktu (t, s)' };
            satuanHasil = 'Coulomb';
            fungsiHitung = 'hitungMuatanTotal(I, t, "Q")';
            namaVariabel = 'Q';
            break;

        case 'n-gas-elektro':
            inputs = { I: 'Arus (I, A)', t: 'Waktu (t, s)', n_koef: 'e⁻ per mol gas (n)' };
            satuanHasil = 'mol';
            fungsiHitung = 'hitungMolZatElektrolisis(I, t, n_koef, "n_gas")';
            namaVariabel = 'n_gas';
            break;
        case 'm-logam':
            inputs = { I: 'Arus (I, A)', t: 'Waktu (t, s)', M: 'Massa Molar (M, g/mol)', n: 'Jumlah e⁻ (n)' };
            satuanHasil = 'gram';
            fungsiHitung = 'hitungHukumFaradayI(I, t, M, n, "m_logam")'; 
            namaVariabel = 'm_logam';
            break;
        case 'V-gas-elektro':
            inputs = { I: 'Arus (I, A)', t: 'Waktu (t, s)', n_koef: 'e⁻ per mol gas (n)', T: 'Suhu (T, K)', P: 'Tekanan (P, atm)' };
            satuanHasil = 'Liter';
            fungsiHitung = 'hitungVolumeGasElektrolisis(I, t, n_koef, T, P, "V_gas")';
            namaVariabel = 'V_gas';
            break;
        case 'persen-efisiensi':
            inputs = { m_eks: 'Massa Eksperimen (g)', m_teori: 'Massa Teoritis (g)' };
            satuanHasil = '%';
            fungsiHitung = 'hitungEfisiensiElektrolisis(m_eks, m_teori, "efisiensi")';
            namaVariabel = 'Efisiensi';
            break;

        case 'E-red-ox':
            inputs = { E_red: 'E° Reduksi (V)', jenis: 'Jenis (reduksi/oksidasi)' };
            satuanHasil = 'Volt';
            fungsiHitung = 'hitungPotensialRedOks(E_red, jenis, "E_result")';
            namaVariabel = 'E° (Red/Oks)';
            break;
        case 'reaksi-setengah':
            inputs = { ion: 'Ion (misal: Zn2+)', bentuk: 'Bentuk (logam/ion)', jenis: 'Jenis (oksidasi/reduksi)' };
            satuanHasil = 'Reaksi';
            fungsiHitung = 'penulisanReaksiSetengahSel(ion, bentuk, jenis, "reaksi")';
            namaVariabel = 'Reaksi Setengah Sel';
            break;
        case 'persamaan-sel':
            inputs = { anoda: 'Reaksi Anoda (text)', katoda: 'Reaksi Katoda (text)', n: 'Jumlah e⁻ (n)' };
            satuanHasil = 'Notasi Sel';
            fungsiHitung = 'penulisanPersamaanSelVolta(anoda, katoda, n, "notasi")';
            namaVariabel = 'Persamaan Sel';
            break;
        case 'susunan-sel':
            inputs = { E_anoda: 'E° Anoda (V)', E_katoda: 'E° Katoda (V)', anoda_desc: 'Deskripsi Anoda (text)', katoda_desc: 'Deskripsi Katoda (text)' };
            satuanHasil = 'Susunan';
            fungsiHitung = 'tentukanSusunanSelVolta(E_anoda, E_katoda, anoda_desc, katoda_desc, "susunan")';
            namaVariabel = 'Susunan Sel Volta';
            break;

        case 'deltaG-dari-E':
            inputs = { E_std: 'E°sel (V)', n: 'Jumlah e⁻ (n)' };
            satuanHasil = 'Joule';
            fungsiHitung = 'hitungDeltaGStandar(E_std, n, "deltaG_std")';
            namaVariabel = 'ΔG°';
            break;
        case 'K-dari-E-std':
            inputs = { E_std: 'E°sel (V)', n: 'Jumlah e⁻ (n)', T: 'Suhu (T, K)' };
            satuanHasil = 'Konstanta';
            fungsiHitung = 'hitungKonstantaKesetimbanganDariEstd(E_std, n, T, "K_T")';
            namaVariabel = 'K (Suhu T)';
            break;
        case 'E-std-dari-K':
            inputs = { K: 'Konstanta Kesetimbangan (K)', n: 'Jumlah e⁻ (n)' };
            satuanHasil = 'Volt';
            fungsiHitung = 'hitungEstdDariKonstantaKesetimbangan(K, n, T_STD, "E_std_25C")';
            namaVariabel = 'E°sel (25°C)';
            break;
        case 'W-dari-m':
            inputs = { m: 'Massa Endapan (g)', M: 'Massa Molar (g/mol)', n: 'Jumlah e⁻ (n)', E_sel: 'Potensial Sel (Esel, V)' };
            satuanHasil = 'Joule';
            fungsiHitung = 'hitungEnergiListrikDariMassa(m, M, n, E_sel, "W")';
            namaVariabel = 'W (Energi Listrik)';
            break;

        default:
            return;
    }

    configPerhitungan = { fungsiHitung, satuanHasil, namaVariabel, parameter };

    const form = document.createElement('form');
    form.id = 'kalkulator-form';
    form.onsubmit = (e) => { e.preventDefault(); prosesPerhitungan(); };

    for (const [key, labelText] of Object.entries(inputs)) {
        const label = document.createElement('label');
        label.setAttribute('for', key);
        label.textContent = labelText + ': ';

        let input = document.createElement('input');
        input.type = 'number';
        input.step = 'any';
        input.id = key;
        input.name = key;
        input.required = true;

        if (key.includes('jenis') || key.includes('arah') || key.includes('elektroda') || key.includes('reaksi-setengah') || key.includes('persamaan-sel') || key.includes('susunan-sel') || key.includes('ion') || key.includes('bentuk') || key.includes('anoda') || key.includes('katoda') || key.includes('desc')) {
             input.type = 'text';
             input.required = false; 
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

            if (inputElement.type === 'number') {
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
        }
        else if (inputElement && inputElement.type === 'text') {
            nilaiInput[key] = value.trim();
        }
    }

    const hasilDiv = document.getElementById('hasil-kalkulasi');
    hasilDiv.innerHTML = '';
    hasilDiv.classList.remove('error');

    if (!allInputsValid) {
        hasilDiv.innerHTML = '<p class="error">⚠️ Mohon isi semua kolom input yang diperlukan dengan data yang valid!</p>';
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
                if (name === 'null' || name.match(/T_STD|R|F|R_ATM/)) {
                    return name;
                }
                if (nilaiInput.hasOwnProperty(name)) {
                    const val = nilaiInput[name];
                    return typeof val === 'string' && name !== 'Q' ? `"${val}"` : JSON.stringify(val);
                }
                return 'null';
            });

            const funcName = fungsiHitung.substring(0, fungsiHitung.indexOf('('));
            finalFunctionCall = `${funcName}(${argValues.join(', ')})`;
        }

        let hasil;
        hasil = eval(finalFunctionCall);

        if (typeof hasil === 'string' && hasil.startsWith('Error:')) {
            throw new Error(hasil.replace('Error: ', ''));
        }

        if (typeof hasil === 'number' && !isFinite(hasil)) {
            throw new Error('Hasil perhitungan tidak valid (NaN atau Infinity). Periksa kembali input Anda.');
        }

        let formatted_fx = hasil;
        if (typeof hasil === 'number') {
            if (Math.abs(hasil) > 1e6 || (Math.abs(hasil) !== 0 && Math.abs(hasil) < 1e-4)) {
                formatted_fx = hasil.toPrecision(6);
            } else {
                formatted_fx = hasil.toFixed(6).replace(/\.?0+$/, '');
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
                    <td style="border: 1px solid #ccc; padding: 10px; white-space: pre-wrap;">${formatted_fx} ${satuanHasil}</td>
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

        if (event.target.tagName === 'INPUT' && event.target.type !== 'submit') {
            event.preventDefault();

            const inputs = Array.from(form.querySelectorAll('input[type="number"], input[type="text"]'));
            const currentIndex = inputs.indexOf(event.target);

            if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
                inputs[currentIndex + 1].focus();
                inputs[currentIndex + 1].select(); 
            } else {
                form.dispatchEvent(new Event('submit'));
            }
        } else {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    }
}

function hitungPotensialSelStandar(E_katoda, E_anoda, target) {
    if (target === "E_sel") {
        return E_katoda - E_anoda;
    }
    throw new Error('Target Potensial Sel Standar tidak valid.');
}

function tentukanJenisReaksi(E_red, E_ox, target) {
    if (target === "jenis") {
        if (E_red > E_ox) {
            return `Reaksi Reduksi/Redoks Spontan. Katoda: Reduksi (E° tinggi), Anoda: Oksidasi (E° rendah).`;
        } else {
            return `Reaksi Reduksi/Redoks Non-Spontan. Katoda: Reduksi (E° rendah), Anoda: Oksidasi (E° tinggi).`;
        }
    }
    throw new Error('Target Jenis Reaksi tidak valid.');
}

function tentukanArahAliranElektron(E_katoda, E_anoda, target) {
    if (target === "arah") {
        const E_sel = E_katoda - E_anoda;
        if (E_sel > 0) {
            return 'Dari Anoda (potensial rendah) ke Katoda (potensial tinggi).';
        } else {
            return 'Dipaksa oleh sumber listrik eksternal (Sel Elektrolisis).';
        }
    }
    throw new Error('Target Arah Aliran Elektron tidak valid.');
}

function tentukanAnodaKatoda(E_red_a, E_red_k, target) {
    if (target === "elektroda") {
        if (E_red_k > E_red_a) {
            return `Katoda: yang memiliki E° Reduksi lebih tinggi (${E_red_k} V). Anoda: yang memiliki E° Reduksi lebih rendah (${E_red_a} V).`;
        } else {
            return `Katoda: yang memiliki E° Reduksi lebih tinggi (${E_red_a} V). Anoda: yang memiliki E° Reduksi lebih rendah (${E_red_k} V).`;
        }
    }
    throw new Error('Target Anoda/Katoda tidak valid.');
}

function hitungPersamaanNernst(E_std, n, Q, T, target) {
    if (n === 0) throw new Error("Jumlah elektron (n) tidak boleh nol.");
    if (Q <= 0) throw new Error("Kuosien Reaksi (Q) harus lebih besar dari nol.");

    if (T === T_STD) {
        const logQ = Math.log10(Q);
        return E_std - ((LOG_FACTOR / n) * logQ);
    } else {
        const lnQ = Math.log(Q);
        const term = (R * T) / (n * F);
        return E_std - (term * lnQ);
    }
}

function hitungMuatanTotal(I, t, target) {
    if (target === "Q") {
        return I * t; 
    }
    throw new Error('Target Muatan Total tidak valid.');
}

function hitungMolElektron(Q, _, target) {
    if (target === "ne") {
        if (F === 0) throw new Error("Konstanta Faraday (F) tidak boleh nol.");
        return Q / F; 
    }
    throw new Error('Target Mol Elektron tidak valid.');
}

function hitungMassaDariMuatan(Q, M, n, target) {
    if (target === "m") {
        if (n === 0 || F === 0) throw new Error("n atau F tidak boleh nol.");
        return (Q / F) * (M / n); 
    }
    throw new Error('Target Massa dari Muatan tidak valid.');
}

function hitungHukumFaradayI(I, t, M, n, target) {
    if (target === "m" || target === "m_logam") {
        if (n === 0 || F === 0) throw new Error("n atau F tidak boleh nol.");
        return (I * t * M) / (n * F); 
    }
    throw new Error('Target Hukum Faraday I tidak valid.');
}

function hitungHukumFaradayII(m2, M1, n1, M2, n2, target) {
    if (target === "m1") {
        if (M2 === 0 || n2 === 0) throw new Error("M₂ atau n₂ tidak boleh nol.");
        const E1 = M1 / n1; 
        const E2 = M2 / n2; 
        return m2 * (E1 / E2); 
    }
    throw new Error('Target Hukum Faraday II tidak valid.');
}

function hitungEfisiensiElektrolisis(m_eks, m_teori, target) {
    if (target === "efisiensi") {
        if (m_teori === 0) throw new Error("Massa teoritis (m_teori) tidak boleh nol.");
        return (m_eks / m_teori) * 100;
    }
    throw new Error('Target Efisiensi Elektrolisis tidak valid.');
}

function hitungMolZatElektrolisis(I, t, n_koef, target) {
    if (target === "n_gas") {
        if (n_koef === 0 || F === 0) throw new Error("n (elektron per mol) atau F tidak boleh nol.");
        const Q = hitungMuatanTotal(I, t, "Q");
        return Q / (n_koef * F); 
    }
    throw new Error('Target Mol Zat Elektrolisis tidak valid.');
}

function hitungVolumeGasElektrolisis(I, t, n_koef, T, P, target) {
    if (target === "V_gas") {
        if (P === 0) throw new Error("Tekanan (P) tidak boleh nol.");
        const n_gas = hitungMolZatElektrolisis(I, t, n_koef, "n_gas");
        return (n_gas * R_ATM * T) / P; 
    }
    throw new Error('Target Volume Gas Elektrolisis tidak valid.');
}

function hitungEnergiGibbs(n, E_sel, target) {
    if (target === "deltaG") {
        return -n * F * E_sel; 
    }
    throw new Error('Target Energi Gibbs tidak valid.');
}

function hitungPotensialSelDariDeltaG(deltaG, n, target) {
    if (target === "E_sel") {
        if (n === 0 || F === 0) throw new Error("n atau F tidak boleh nol.");
        return -deltaG / (n * F); 
    }
    throw new Error('Target Potensial Sel dari ΔG tidak valid.');
}

function hitungDeltaGStandar(E_std, n, target) {
    if (target === "deltaG_std") {
        return -n * F * E_std; 
    }
    throw new Error('Target ΔG° tidak valid.');
}

function hitungKonstantaKesetimbanganDariEstd(E_std, n, T, target) {
    if (n === 0 || R === 0 || T === 0) throw new Error("n, R, atau T tidak boleh nol.");

    const exponent = (n * F * E_std) / (R * T);
    return Math.exp(exponent); 
}

function hitungEstdDariKonstantaKesetimbangan(K, n, T, target) {
    if (n === 0 || F === 0 || R === 0 || T === 0) throw new Error("n, F, R, atau T tidak boleh nol.");
    if (K <= 0) throw new Error("Konstanta Kesetimbangan (K) harus > 0.");

    const lnK = Math.log(K);
    const term = (R * T) / (n * F);
    return term * lnK; 
}

function hitungEnergiListrikDariMassa(m, M, n, E_sel, target) {
    if (target === "W") {
        if (M === 0) throw new Error("Massa Molar (M) tidak boleh nol.");
        const Q = (m * n * F) / M; 
        return Q * E_sel; 
    }
    throw new Error('Target Energi Listrik dari Massa tidak valid.');
}

function hitungPotensialRedOks(E_red, jenis, target) {
    if (target === "E_result") {
        if (!jenis || typeof jenis !== 'string') throw new Error('Jenis harus "reduksi" atau "oksidasi".');
        const jenisLower = jenis.toLowerCase();
        if (jenisLower === 'reduksi') {
            return E_red;
        } else if (jenisLower === 'oksidasi') {
            return -E_red; 
        } else {
            throw new Error('Jenis harus "reduksi" atau "oksidasi".');
        }
    }
    throw new Error('Target tidak valid.');
}

function penulisanReaksiSetengahSel(ion, bentuk, jenis, target) {
    if (target === "reaksi") {
        if (!ion || !bentuk || !jenis) throw new Error('Semua input harus diisi.');
        const jenisLower = jenis.toLowerCase();
        const bentukLower = bentuk.toLowerCase();
        let reaksi = '';
        if (jenisLower === 'reduksi') {
            if (bentukLower === 'logam') {
                reaksi = `M^{n+} + n e^- → M (untuk ion ${ion})`;
            } else if (bentukLower === 'ion') {
                reaksi = `M + n e^- → M^{n-} (untuk logam ${ion})`;
            }
        } else if (jenisLower === 'oksidasi') {
            if (bentukLower === 'logam') {
                reaksi = `M → M^{n+} + n e^- (untuk logam ${ion})`;
            } else if (bentukLower === 'ion') {
                reaksi = `M^{n-} → M + n e^- (untuk ion ${ion})`;
            }
        } else {
            throw new Error('Jenis harus "oksidasi" atau "reduksi".');
        }
        return reaksi;
    }
    throw new Error('Target tidak valid.');
}

function penulisanPersamaanSelVolta(anoda, katoda, n, target) {
    if (target === "notasi") {
        if (!anoda || !katoda || n === 0) throw new Error('Input tidak lengkap atau n tidak valid.');
        return `${anoda} || ${katoda} | E° = (E_katoda - E_anoda) V, n = ${n}`;
    }
    throw new Error('Target tidak valid.');
}

function tentukanSusunanSelVolta(E_anoda, E_katoda, anoda_desc, katoda_desc, target) {
    if (target === "susunan") {
        if (E_katoda <= E_anoda) throw new Error('E° Katoda harus lebih besar dari E° Anoda untuk sel spontan.');
        return `Susunan: ${anoda_desc} (Anoda, Oksidasi) | garam | ${katoda_desc} (Katoda, Reduksi). Aliran e⁻: Anoda → Katoda.`;
    }
    throw new Error('Target tidak valid.');
}