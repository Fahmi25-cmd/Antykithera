// File: fisikakuantum.js - Kalkulator Fisika Kuantum Lengkap (Diperbaiki: Hapus auto-hitung untuk lambda-compton)

const h = 6.62607015e-34; 
const hbar = h / (2 * Math.PI); 
const c = 299792458; 
const me = 9.10938356e-31; 
const e = 1.602176634e-19; 
const kB = 1.380649e-23; 
const Ry = 13.605693122994; 
const eV_to_J = 1.602176634e-19; 

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
        
        case 'energi-foton':
            return {
                'E-dari-f': 'Energi dari Frekuensi (E)',
                'E-dari-lambda': 'Energi dari Panjang Gelombang (E)',
                'f-dari-E': 'Frekuensi dari Energi (f)',
                'lambda-dari-E': 'Panjang Gelombang dari Energi (λ)'
            };
        case 'frekuensi-foton':
            return {
                'f-foton': 'Frekuensi Foton (f)',
                'lambda-foton': 'Panjang Gelombang (λ)'
            };
        case 'panjang-gelombang-de-broglie':
            return {
                'lambda-debroglie': 'Panjang Gelombang de Broglie (λ)',
                'p-debroglie': 'Momentum (p)'
            };
        case 'momentum-foton':
            return {
                'p-dari-lambda': 'Momentum dari λ (p)',
                'p-dari-E': 'Momentum dari E (p)'
            };
        case 'energi-partikel':
            return {
                'E-kinetik': 'Energi Kinetik (E)',
                'v-partikel': 'Kecepatan (v)'
            };

        
        case 'efek-fotoelektrik':
            return {
                'Ek-fotoelektrik': 'Energi Kinetik Elektron (Ek)'
            };
        case 'energi-kinetik-fotoelektron':
            return {
                'Ek-elektron': 'Energi Kinetik (Ek)'
            };
        case 'fungsi-kerja-logam':
            return {
                'W-kerja': 'Fungsi Kerja (W)'
            };
        case 'energi-ambang':
            return {
                'E0-ambang': 'Energi Ambang (E₀)',
                'f0-ambang': 'Frekuensi Ambang (f₀)'
            };

        
        case 'energi-tingkat-atom-hidrogen':
            return {
                'En-hidrogen': 'Energi Tingkat n (Eₙ)'
            };
        case 'transisi-atom-hidrogen':
            return {
                'dE-transisi': 'Energi Transisi (ΔE)'
            };
        case 'frekuensi-spektrum-hidrogen':
            return {
                'f-spektrum': 'Frekuensi Spektrum (f)'
            };
        case 'panjang-gelombang-spektrum-hidrogen':
            return {
                'lambda-spektrum': 'Panjang Gelombang Spektrum (λ)'
            };

        
        case 'energi-partikel-kotak-1d':
            return {
                'E-kotak-1d': 'Energi Partikel dalam Kotak 1D (E)'
            };
        case 'energi-partikel-kotak-3d':
            return {
                'E-kotak-3d': 'Energi Partikel dalam Kotak 3D (E)'
            };
        case 'energi-osilator-harmonik':
            return {
                'E-osilator': 'Energi Osilator Harmonik (E)'
            };
        case 'energi-spin-elektron':
            return {
                'E-spin': 'Energi Spin Elektron (E)'
            };

        
        case 'ketidakpastian-posisi-momentum':
            return {
                'dx-heisenberg': 'Ketidakpastian Posisi (Δx)',
                'dp-heisenberg': 'Ketidakpastian Momentum (Δp)'
            };
        case 'ketidakpastian-energi-waktu':
            return {
                'dE-heisenberg': 'Ketidakpastian Energi (ΔE)',
                'dt-heisenberg': 'Ketidakpastian Waktu (Δt)'
            };
        case 'efek-compton':
            return {
                'dlambda-compton': 'Pergeseran Compton (Δλ)'
            };
        case 'panjang-gelombang-compton':
            return {
                'lambda-compton': 'Panjang Gelombang Compton (λc)'
            };
        case 'energi-foton-terhambur':
            return {
                'Ep-terhambur': 'Energi Foton Terhambur (E\' )'
            };
        case 'energi-recoil-elektron':
            return {
                'Ee-recoil': 'Energi Recoil Elektron (Ee)'
            };

        
        case 'radiasi-planck':
            return {
                'I-planck': 'Intensitas Radiasi Planck (I)'
            };
        case 'energi-foton-temperatur':
            return {
                'E-thermal': 'Energi Foton dari Temperatur (E)'
            };
        case 'intensitas-spektrum':
            return {
                'I-spektrum': 'Intensitas Spektrum (I)'
            };

        
        case 'energi-ikatan':
            return {
                'Eb-ikatan': 'Energi Ikatan (Eb)'
            };
        case 'energi-ionisasi':
            return {
                'Ei-ionisasi': 'Energi Ionisasi (Ei)'
            };
        case 'energi-transisi-elektron':
            return {
                'dE-elektron': 'Energi Transisi (ΔE)'
            };
        case 'panjang-gelombang-transisi':
            return {
                'lambda-transisi': 'Panjang Gelombang Transisi (λ)'
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
        
        case 'E-dari-f':
            inputs = { f: 'Frekuensi (f, Hz)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiFoton(f, null, "E-dari-f")';
            namaVariabel = 'E';
            break;
        case 'E-dari-lambda':
            inputs = { lambda: 'Panjang Gelombang (λ, m)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiFoton(lambda, null, "E-dari-lambda")';
            namaVariabel = 'E';
            break;
        case 'f-dari-E':
            inputs = { E: 'Energi (E, Joule)' };
            satuanHasil = 'Hertz (Hz)';
            fungsiHitung = 'hitungEnergiFoton(E, null, "f-dari-E")';
            namaVariabel = 'f';
            break;
        case 'lambda-dari-E':
            inputs = { E: 'Energi (E, Joule)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungEnergiFoton(E, null, "lambda-dari-E")';
            namaVariabel = 'λ';
            break;

        
        case 'f-foton':
            inputs = { lambda: 'Panjang Gelombang (λ, m)' };
            satuanHasil = 'Hertz (Hz)';
            fungsiHitung = 'hitungFrekuensiFoton(lambda, "f")';
            namaVariabel = 'f';
            break;
        case 'lambda-foton':
            inputs = { f: 'Frekuensi (f, Hz)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungFrekuensiFoton(f, "lambda")';
            namaVariabel = 'λ';
            break;

        
        case 'lambda-debroglie':
            inputs = { m: 'Massa (m, kg)', v: 'Kecepatan (v, m/s)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungDeBroglie(m, v, "lambda")';
            namaVariabel = 'λ';
            break;
        case 'p-debroglie':
            inputs = { lambda: 'Panjang Gelombang (λ, m)' };
            satuanHasil = 'kg·m/s';
            fungsiHitung = 'hitungDeBroglie(lambda, null, "p")';
            namaVariabel = 'p';
            break;

        
        case 'p-dari-lambda':
            inputs = { lambda: 'Panjang Gelombang (λ, m)' };
            satuanHasil = 'kg·m/s';
            fungsiHitung = 'hitungMomentumFoton(lambda, null, "p-dari-lambda")';
            namaVariabel = 'p';
            break;
        case 'p-dari-E':
            inputs = { E: 'Energi (E, Joule)' };
            satuanHasil = 'kg·m/s';
            fungsiHitung = 'hitungMomentumFoton(E, null, "p-dari-E")';
            namaVariabel = 'p';
            break;

        
        case 'E-kinetik':
            inputs = { m: 'Massa (m, kg)', v: 'Kecepatan (v, m/s)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiPartikel(m, v, "E")';
            namaVariabel = 'E';
            break;
        case 'v-partikel':
            inputs = { E: 'Energi (E, Joule)', m: 'Massa (m, kg)' };
            satuanHasil = 'm/s';
            fungsiHitung = 'hitungEnergiPartikel(E, m, "v")';
            namaVariabel = 'v';
            break;

        
        case 'Ek-fotoelektrik':
            inputs = { f: 'Frekuensi (f, Hz) - Contoh: 1e15 untuk UV', W: 'Fungsi Kerja (W, eV) - Contoh: 2' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungEfekFotoelektrik(f, W)';
            namaVariabel = 'Ek';
            break;

        
        case 'Ek-elektron':
            inputs = { Ef: 'Energi Foton (Ef, eV) - Contoh: 5', W: 'Fungsi Kerja (W, eV) - Contoh: 2' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungEnergiKinetikFotoelektron(Ef, W)';
            namaVariabel = 'Ek';
            break;

        
        case 'W-kerja':
            inputs = { Ef: 'Energi Foton (Ef, eV)', Ek: 'Energi Kinetik (Ek, eV)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungFungsiKerja(Ef, Ek)';
            namaVariabel = 'W';
            break;

        
        case 'E0-ambang':
            inputs = { W: 'Fungsi Kerja (W, eV)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungEnergiAmbang(W, "E0")';
            namaVariabel = 'E₀';
            break;
        case 'f0-ambang':
            inputs = { W: 'Fungsi Kerja (W, eV)' };
            satuanHasil = 'Hz';
            fungsiHitung = 'hitungEnergiAmbang(W, "f0")';
            namaVariabel = 'f₀';
            break;

        
        case 'En-hidrogen':
            inputs = { n: 'Bilangan Kuantum (n)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungEnergiHidrogen(n)';
            namaVariabel = 'Eₙ';
            break;

        
        case 'dE-transisi':
            inputs = { n1: 'Tingkat Awal (n₁)', n2: 'Tingkat Akhir (n₂)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungTransisiHidrogen(n1, n2)';
            namaVariabel = 'ΔE';
            break;

        
        case 'f-spektrum':
            inputs = { n1: 'Tingkat Awal (n₁)', n2: 'Tingkat Akhir (n₂)' };
            satuanHasil = 'Hz';
            fungsiHitung = 'hitungFrekuensiSpektrum(n1, n2)';
            namaVariabel = 'f';
            break;

        
        case 'lambda-spektrum':
            inputs = { n1: 'Tingkat Awal (n₁)', n2: 'Tingkat Akhir (n₂)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungPanjangGelombangSpektrum(n1, n2)';
            namaVariabel = 'λ';
            break;

        
        case 'E-kotak-1d':
            inputs = { n: 'Bilangan Kuantum (n)', L: 'Panjang Kotak (L, m)', m: 'Massa Partikel (m, kg)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungPartikelKotak1D(n, L, m)';
            namaVariabel = 'E';
            break;

        
        case 'E-kotak-3d':
            inputs = { nx: 'Bilangan Kuantum nx', ny: 'Bilangan Kuantum ny', nz: 'Bilangan Kuantum nz', L: 'Panjang Kotak (L, m)', m: 'Massa Partikel (m, kg)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungPartikelKotak3D(nx, ny, nz, L, m)';
            namaVariabel = 'E';
            break;

        
        case 'E-osilator':
            inputs = { n: 'Bilangan Kuantum (n)', f: 'Frekuensi (f, Hz)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungOsilatorHarmonik(n, f)';
            namaVariabel = 'E';
            break;

        
        case 'E-spin':
            inputs = { B: 'Medan Magnet (B, Tesla)', ms: 'Bilangan Kuantum Spin (ms, ±1/2)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiSpin(B, ms)';
            namaVariabel = 'E';
            break;

        
        case 'dx-heisenberg':
            inputs = { dp: 'Ketidakpastian Momentum (Δp, kg·m/s)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungHeisenbergPosisiMomentum(dp, "dx")';
            namaVariabel = 'Δx';
            break;
        case 'dp-heisenberg':
            inputs = { dx: 'Ketidakpastian Posisi (Δx, m)' };
            satuanHasil = 'kg·m/s';
            fungsiHitung = 'hitungHeisenbergPosisiMomentum(dx, "dp")';
            namaVariabel = 'Δp';
            break;

        
        case 'dE-heisenberg':
            inputs = { dt: 'Ketidakpastian Waktu (Δt, s)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungHeisenbergEnergiWaktu(dt, "dE")';
            namaVariabel = 'ΔE';
            break;
        case 'dt-heisenberg':
            inputs = { dE: 'Ketidakpastian Energi (ΔE, J)' };
            satuanHasil = 'detik (s)';
            fungsiHitung = 'hitungHeisenbergEnergiWaktu(dE, "dt")';
            namaVariabel = 'Δt';
            break;

        
        case 'dlambda-compton':
            inputs = { theta: 'Sudut Hamburan (θ, derajat)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungEfekCompton(theta)';
            namaVariabel = 'Δλ';
            break;

        
        case 'lambda-compton':
            inputs = {}; 
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungPanjangGelombangCompton()';
            namaVariabel = 'λc';
            break;

        
        case 'Ep-terhambur':
            inputs = { E0: 'Energi Foton Awal (E₀, eV)', theta: 'Sudut Hamburan (θ, derajat)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungEnergifotonTerhambur(E0, theta)';
            namaVariabel = 'E\'';
            break;

        
        case 'Ee-recoil':
            inputs = { E0: 'Energi Foton Awal (E₀, eV)', theta: 'Sudut Hamburan (θ, derajat)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungEnergiRecoilElektron(E0, theta)';
            namaVariabel = 'Ee';
            break;

        
        case 'I-planck':
            inputs = { lambda: 'Panjang Gelombang (λ, m)', T: 'Temperatur (T, K)' };
            satuanHasil = 'W/(m²·m)';
            fungsiHitung = 'hitungRadiasiPlanck(lambda, T)';
            namaVariabel = 'I';
            break;

        
        case 'E-thermal':
            inputs = { T: 'Temperatur (T, K)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiFotonTemperatur(T)';
            namaVariabel = 'E';
            break;

        
        case 'I-spektrum':
            inputs = { lambda: 'Panjang Gelombang (λ, m)', T: 'Temperatur (T, K)' };
            satuanHasil = 'W/(m²·m)';
            fungsiHitung = 'hitungIntensitasSpektrum(lambda, T)';
            namaVariabel = 'I';
            break;

        
        case 'Eb-ikatan':
            inputs = { E1: 'Energi Atom 1 (E₁, eV)', E2: 'Energi Atom 2 (E₂, eV)', Em: 'Energi Molekul (Em, eV)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungEnergiIkatan(E1, E2, Em)';
            namaVariabel = 'Eb';
            break;

        
        case 'Ei-ionisasi':
            inputs = { n: 'Tingkat Energi (n)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungEnergiIonisasi(n)';
            namaVariabel = 'Ei';
            break;

        
        case 'dE-elektron':
            inputs = { Ei: 'Energi Awal (Ei, eV)', Ef: 'Energi Akhir (Ef, eV)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungEnergiTransisiElektron(Ei, Ef)';
            namaVariabel = 'ΔE';
            break;

        
        case 'lambda-transisi':
            inputs = { dE: 'Energi Transisi (ΔE, eV)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungPanjangGelombangTransisi(dE)';
            namaVariabel = 'λ';
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

    
    if (Object.keys(inputs).length > 0) {
        for (const [key, label] of Object.entries(inputs)) {
            form.innerHTML += `
                <div class="input-group">
                    <label for="${key}">${label}:</label>
                    <input type="number" step="any" id="${key}" required>
                </div>
            `;
        }
    } else {
        
        form.innerHTML += `
            <div class="input-group">
                <p style="font-style: italic;">Konstanta tetap - Tidak perlu input. Klik tombol di bawah untuk menghitung.</p>
            </div>
        `;
    }

    
    form.innerHTML += `<button type="submit" class="hitung-btn">Hitung</button>`;

    formDiv.appendChild(form);

    
    
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

    
    if (Object.keys(inputs).length === 0) {
        allInputsValid = true;
    }

    if (!allInputsValid) {
        hasilDiv.innerHTML = '<p class="error">⚠️ Mohon isi semua kolom input dengan angka yang valid!</p>';
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
                    return JSON.stringify(nilaiInput[name]);
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

        if (!isFinite(hasilNumerik)) {
            throw new Error('Hasil perhitungan tidak valid (NaN atau Infinity). Periksa kembali input Anda.');
        }

        
        let formatted_fx;
        if (Math.abs(hasilNumerik) > 1e6 || (Math.abs(hasilNumerik) !== 0 && Math.abs(hasilNumerik) < 1e-4)) {
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

        
        for (const key of Object.keys(inputs)) {
            const inputElement = document.getElementById(key);
            if (inputElement) {
                inputElement.value = '';
            }
        }

    } catch (e) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `<h3>⚠️ Error Perhitungan!</h3><p>Terjadi kesalahan saat memproses data:</p>
            <p style="font-weight: bold;">${e.message}</p>
            <p>Pastikan semua variabel sudah terisi dengan angka yang valid dan sesuai dengan konteks rumus yang dipilih.</p>`;
    }
}

function handleEnterKey(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT' && event.target.type === 'number') {
        event.preventDefault();
        const currentInput = event.target;
        const form = document.getElementById('kalkulator-form');
        if (!form) return;

        const inputs = Array.from(form.querySelectorAll('input[type="number"]'));
        const currentIndex = inputs.indexOf(currentInput);

        if (currentIndex < inputs.length - 1) {
            
            inputs[currentIndex + 1].focus();
            inputs[currentIndex + 1].select();
        } else {
            
            form.dispatchEvent(new Event('submit'));
        }
    }
}

// ====================================================================
// FUNGSI-FUNGSI KALKULASI FISIKA KUANTUM
// ====================================================================

function hitungEnergiFoton(val1, val2, target) {
    if (target === "E-dari-f") {
        const f = val1;
        return h * f;
    }
    if (target === "E-dari-lambda") {
        const lambda = val1;
        if (lambda === 0) throw new Error("Panjang gelombang (λ) tidak boleh nol.");
        return (h * c) / lambda;
    }
    if (target === "f-dari-E") {
        const E = val1;
        if (h === 0) throw new Error("Konstanta Planck tidak boleh nol.");
        return E / h;
    }
    if (target === "lambda-dari-E") {
        const E = val1;
        if (E === 0) throw new Error("Energi (E) tidak boleh nol.");
        return (h * c) / E;
    }
    throw new Error('Target Energi Foton tidak valid');
}

function hitungFrekuensiFoton(val1, target) {
    if (target === "f") {
        const lambda = val1;
        if (lambda === 0) throw new Error("Panjang gelombang (λ) tidak boleh nol.");
        return c / lambda;
    }
    if (target === "lambda") {
        const f = val1;
        if (f === 0) throw new Error("Frekuensi (f) tidak boleh nol.");
        return c / f;
    }
    throw new Error('Target Frekuensi Foton tidak valid');
}

function hitungDeBroglie(val1, val2, target) {
    if (target === "lambda") {
        const m = val1, v = val2;
        if (m === 0 || v === 0) throw new Error("Massa dan kecepatan tidak boleh nol.");
        return h / (m * v);
    }
    if (target === "p") {
        const lambda = val1;
        if (lambda === 0) throw new Error("Panjang gelombang (λ) tidak boleh nol.");
        return h / lambda;
    }
    throw new Error('Target de Broglie tidak valid');
}

function hitungMomentumFoton(val1, val2, target) {
    if (target === "p-dari-lambda") {
        const lambda = val1;
        if (lambda === 0) throw new Error("Panjang gelombang (λ) tidak boleh nol.");
        return h / lambda;
    }
    if (target === "p-dari-E") {
        const E = val1;
        if (c === 0) throw new Error("Kecepatan cahaya tidak boleh nol.");
        return E / c;
    }
    throw new Error('Target Momentum Foton tidak valid');
}

function hitungEnergiPartikel(val1, val2, target) {
    if (target === "E") {
        const m = val1, v = val2;
        return 0.5 * m * Math.pow(v, 2);
    }
    if (target === "v") {
        const E = val1, m = val2;
        if (m === 0) throw new Error("Massa tidak boleh nol.");
        return Math.sqrt((2 * E) / m);
    }
    throw new Error('Target Energi Partikel tidak valid');
}

function hitungEfekFotoelektrik(f, W) {
    const Ef = h * f;
    const W_joule = W * eV_to_J;
    let Ek = Ef - W_joule;
    if (Ek < 0) {
        const Ef_eV = Ef / eV_to_J;
        return `Error: 0 eV - Energi foton (${Ef_eV.toFixed(4)} eV) kurang dari fungsi kerja (${W} eV). Tidak ada emisi elektron. Coba tingkatkan frekuensi (f > ${(W * eV_to_J / h).toExponential(2)} Hz).`;
    }
    return Ek / eV_to_J;
}

function hitungEnergiKinetikFotoelektron(Ef, W) {
    let Ef_joule = Ef * eV_to_J;
    const W_joule = W * eV_to_J;
    let Ek = Ef_joule - W_joule;
    if (Ek < 0) {
        return `Error: 0 eV - Energi foton (${Ef} eV) kurang dari fungsi kerja (${W} eV). Tidak ada emisi elektron.`;
    }
    return Ek / eV_to_J;
}

function hitungFungsiKerja(Ef, Ek) {
    if (Ef < Ek) {
        return `Error: Energi foton (${Ef} eV) kurang dari energi kinetik (${Ek} eV). Input tidak valid secara fisik.`;
    }
    return Ef - Ek;
}

function hitungEnergiAmbang(W, target) {
    if (target === "E0") {
        return W;
    }
    if (target === "f0") {
        const W_joule = W * eV_to_J;
        return W_joule / h;
    }
    throw new Error('Target Energi Ambang tidak valid');
}

function hitungEnergiHidrogen(n) {
    if (n <= 0) throw new Error("Bilangan kuantum (n) harus lebih besar dari 0.");
    return -Ry / Math.pow(n, 2);
}

function hitungTransisiHidrogen(n1, n2) {
    if (n1 <= 0 || n2 <= 0) throw new Error("Bilangan kuantum harus lebih besar dari 0.");
    const E1 = -Ry / Math.pow(n1, 2);
    const E2 = -Ry / Math.pow(n2, 2);
    return Math.abs(E2 - E1);
}

function hitungFrekuensiSpektrum(n1, n2) {
    const dE = hitungTransisiHidrogen(n1, n2);
    const dE_joule = dE * eV_to_J;
    return dE_joule / h;
}

function hitungPanjangGelombangSpektrum(n1, n2) {
    const f = hitungFrekuensiSpektrum(n1, n2);
    if (f === 0) throw new Error("Frekuensi tidak boleh nol.");
    return c / f;
}

function hitungPartikelKotak1D(n, L, m) {
    if (n <= 0) throw new Error("Bilangan kuantum (n) harus lebih besar dari 0.");
    if (L === 0) throw new Error("Panjang kotak (L) tidak boleh nol.");
    if (m === 0) throw new Error("Massa tidak boleh nol.");
    return (Math.pow(n, 2) * Math.pow(h, 2)) / (8 * m * Math.pow(L, 2));
}

function hitungPartikelKotak3D(nx, ny, nz, L, m) {
    if (nx <= 0 || ny <= 0 || nz <= 0) throw new Error("Bilangan kuantum harus lebih besar dari 0.");
    if (L === 0) throw new Error("Panjang kotak (L) tidak boleh nol.");
    if (m === 0) throw new Error("Massa tidak boleh nol.");
    return (Math.pow(h, 2) / (8 * m * Math.pow(L, 2))) * (Math.pow(nx, 2) + Math.pow(ny, 2) + Math.pow(nz, 2));
}

function hitungOsilatorHarmonik(n, f) {
    if (n < 0) throw new Error("Bilangan kuantum (n) tidak boleh negatif.");
    return h * f * (n + 0.5);
}

function hitungEnergiSpin(B, ms) {
    const muB = (e * hbar) / (2 * me); 
    return -2 * muB * B * ms;
}

function hitungHeisenbergPosisiMomentum(val1, target) {
    if (target === "dx") {
        const dp = val1;
        if (dp === 0) throw new Error("Ketidakpastian momentum (Δp) tidak boleh nol.");
        return hbar / (2 * dp);
    }
    if (target === "dp") {
        const dx = val1;
        if (dx === 0) throw new Error("Ketidakpastian posisi (Δx) tidak boleh nol.");
        return hbar / (2 * dx);
    }
    throw new Error('Target Heisenberg Posisi-Momentum tidak valid');
}

function hitungHeisenbergEnergiWaktu(val1, target) {
    if (target === "dE") {
        const dt = val1;
        if (dt === 0) throw new Error("Ketidakpastian waktu (Δt) tidak boleh nol.");
        return hbar / (2 * dt);
    }
    if (target === "dt") {
        const dE = val1;
        if (dE === 0) throw new Error("Ketidakpastian energi (ΔE) tidak boleh nol.");
        return hbar / (2 * dE);
    }
    throw new Error('Target Heisenberg Energi-Waktu tidak valid');
}

function hitungEfekCompton(theta_deg) {
    const theta = theta_deg * (Math.PI / 180);
    const lambda_c = h / (me * c); 
    return lambda_c * (1 - Math.cos(theta));
}

function hitungPanjangGelombangCompton() {
    return h / (me * c);
}

function hitungEnergifotonTerhambur(E0, theta_deg) {
    const theta = theta_deg * (Math.PI / 180);
    const E0_joule = E0 * eV_to_J;
    const lambda_c = h / (me * c);
    const denominator = 1 + (E0_joule / (me * Math.pow(c, 2))) * (1 - Math.cos(theta));
    if (denominator === 0) throw new Error("Pembagi tidak boleh nol.");
    const Ep_joule = E0_joule / denominator;
    return Ep_joule / eV_to_J; 
}

function hitungEnergiRecoilElektron(E0, theta_deg) {
    const Ep = hitungEnergifotonTerhambur(E0, theta_deg);
    return E0 - Ep;
}

function hitungRadiasiPlanck(lambda, T) {
    if (lambda === 0) throw new Error("Panjang gelombang (λ) tidak boleh nol.");
    if (T === 0) throw new Error("Temperatur (T) tidak boleh nol.");
    const numerator = 2 * h * Math.pow(c, 2) / Math.pow(lambda, 5);
    const exponent = (h * c) / (lambda * kB * T);
    const denominator = Math.exp(exponent) - 1;
    if (denominator === 0) throw new Error("Pembagi tidak boleh nol.");
    return numerator / denominator;
}

function hitungEnergiFotonTemperatur(T) {
    return kB * T;
}

function hitungIntensitasSpektrum(lambda, T) {
    return hitungRadiasiPlanck(lambda, T);
}

function hitungEnergiIkatan(E1, E2, Em) {
    return E1 + E2 - Em;
}

function hitungEnergiIonisasi(n) {
    if (n <= 0) throw new Error("Tingkat energi (n) harus lebih besar dari 0.");
    return Math.abs(-Ry / Math.pow(n, 2));
}

function hitungEnergiTransisiElektron(Ei, Ef) {
    return Math.abs(Ef - Ei);
}

function hitungPanjangGelombangTransisi(dE) {
    if (dE === 0) throw new Error("Energi transisi (ΔE) tidak boleh nol.");
    const dE_joule = dE * eV_to_J;
    return (h * c) / dE_joule;
}