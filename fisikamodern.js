const h = 6.62607015e-34; 
const hbar = h / (2 * Math.PI); 
const c = 299792458; 
const e = 1.602176634e-19; 
const me = 9.1093837015e-31; 
const mp = 1.67262192369e-27; 
const mn = 1.67492749804e-27; 
const k_B = 1.380649e-23; 
const RH = 1.0973731568160e7; 
const NA = 6.02214076e23; 

const RQ_KUANTUM = h / (2 * Math.pow(e, 2)); 

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

    } else {
        
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
        case 'efek-fotoelektrik':
            return {
                'Ek-fotoelektrik': 'Energi Kinetik Elektron (Ek)',
                'W-fotoelektrik': 'Fungsi Kerja (W)',
                'f-fotoelektrik': 'Frekuensi Cahaya (f)'
            };
        case 'frekuensi-ambang':
            return {
                'f0-ambang': 'Frekuensi Ambang (f₀)',
                'W-ambang': 'Fungsi Kerja (W)'
            };
        case 'panjang-gelombang-de-broglie':
            return {
                'lambda-debroglie': 'Panjang Gelombang de Broglie (λ)',
                'p-debroglie': 'Momentum Partikel (p)',
                'v-debroglie': 'Kecepatan dari m dan λ (v)'
            };
        case 'energi-tingkat-atom':
            return {
                'En-hidrogen': 'Energi Tingkat n (En)'
            };
        case 'transisi-elektron':
            return {
                'deltaE-transisi': 'Perubahan Energi (ΔE)',
                'lambda-transisi': 'Panjang Gelombang Transisi (λ)',
                'f-transisi': 'Frekuensi Transisi (f)'
            };
        case 'energi-osilator-harmonik':
            return {
                'En-osilator': 'Energi Tingkat n (En)'
            };
        case 'efek-compton':
            return {
                'delta-lambda-compton': 'Perubahan Panjang Gelombang (Δλ)',
                'lambda-prime-compton': 'Panjang Gelombang Akhir (λ\')'
            };
        case 'ketidakpastian-heisenberg':
            return {
                'delta-p-heisenberg': 'Ketidakpastian Momentum (Δp)',
                'delta-x-heisenberg': 'Ketidakpastian Posisi (Δx)'
            };

        case 'energi-ikatan-nuklir':
            return {
                'Eb-ikatan': 'Energi Ikatan Total (Eb)',
                'Ebn-ikatan': 'Energi Ikatan per Nukleon (Eb/A)'
            };
        case 'defek-massa':
            return {
                'delta-m-defek': 'Defek Massa (Δm)'
            };
        case 'energi-reaksi':
            return {
                'E-reaksi': 'Energi Reaksi Nuklir (E)'
            };
        case 'peluruhan-radioaktif':
            return {
                'N-peluruhan': 'Jumlah Inti Sisa (N)',
                'lambda-peluruhan': 'Konstanta Peluruhan (λ)',
                't-peluruhan': 'Waktu Peluruhan (t)'
            };
        case 'waktu-paruh':
            return {
                'T-half': 'Waktu Paruh (T₁/₂)',
                'lambda-half': 'Konstanta Peluruhan (λ)'
            };
        case 'aktivitas-radioaktif':
            return {
                'A-aktivitas': 'Aktivitas Radioaktif (A)',
                'A0-aktivitas': 'Aktivitas Awal (A₀)'
            };
        case 'energi-fisi':
            return {
                'E-fisi': 'Energi Fisi (E)'
            };
        case 'energi-fusi':
            return {
                'E-fusi': 'Energi Fusi (E)'
            };

        case 'energi-partikel':
            return {
                'E-total-partikel': 'Energi Total (E)',
                'K-kinetik-partikel': 'Energi Kinetik (K)'
            };
        case 'momentum-partikel':
            return {
                'p-momentum': 'Momentum (p)',
                'v-momentum': 'Kecepatan (v)'
            };
        case 'muatan-partikel':
            return {
                'q-muatan': 'Muatan Total (q)'
            };
        case 'energi-tumbukan':
            return {
                'E-tumbukan': 'Energi Total Tumbukan (E)'
            };
        case 'massa-partikel':
            return {
                'm-partikel': 'Massa Partikel (m)'
            };

        case 'energi-celah-pita':
            return {
                'Eg-bandgap': 'Energi Celah Pita (Eg)'
            };
        case 'energi-elektron-konduksi':
            return {
                'Ec-konduksi': 'Energi Elektron Konduksi (Ec)'
            };
        case 'efek-hall':
            return {
                'VH-hall': 'Tegangan Hall (VH)',
                'n-hall': 'Konsentrasi Pembawa (n)'
            };
        case 'efek-foto-konduktif':
            return {
                'sigma-fotokonduktif': 'Konduktivitas (σ)'
            };
        case 'efek-tunnel':
            return {
                'T-tunnel': 'Koefisien Transmisi (T)'
            };
        case 'hambatan-kuantum':
            return {
                'RQ-kuantum': 'Hambatan Kuantum (RQ)'
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
            fungsiHitung = 'hitungEnergiFoton(null, lambda, "E-dari-lambda")';
            namaVariabel = 'E';
            break;
        case 'f-dari-E':
            inputs = { E: 'Energi Foton (E, J)' };
            satuanHasil = 'Hertz (Hz)';
            fungsiHitung = 'hitungEnergiFoton(E, null, "f-dari-E")';
            namaVariabel = 'f';
            break;
        case 'lambda-dari-E':
            inputs = { E: 'Energi Foton (E, J)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungEnergiFoton(E, null, "lambda-dari-E")';
            namaVariabel = 'λ';
            break;

        case 'Ek-fotoelektrik':
            inputs = { f: 'Frekuensi Cahaya (f, Hz)', W: 'Fungsi Kerja (W, J)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEfekFotoelektrik(f, W, null, "Ek")';
            namaVariabel = 'Ek';
            break;
        case 'W-fotoelektrik':
            inputs = { f: 'Frekuensi Cahaya (f, Hz)', Ek: 'Energi Kinetik (Ek, J)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEfekFotoelektrik(f, null, Ek, "W")';
            namaVariabel = 'W';
            break;
        case 'f-fotoelektrik':
            inputs = { Ek: 'Energi Kinetik (Ek, J)', W: 'Fungsi Kerja (W, J)' };
            satuanHasil = 'Hertz (Hz)';
            fungsiHitung = 'hitungEfekFotoelektrik(null, W, Ek, "f")';
            namaVariabel = 'f';
            break;

        case 'f0-ambang':
            inputs = { W: 'Fungsi Kerja (W, J)' };
            satuanHasil = 'Hertz (Hz)';
            fungsiHitung = 'hitungFrekuensiAmbang(W, "f0")';
            namaVariabel = 'f₀';
            break;
        case 'W-ambang':
            inputs = { f0: 'Frekuensi Ambang (f₀, Hz)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungFrekuensiAmbang(f0, "W")';
            namaVariabel = 'W';
            break;

        case 'lambda-debroglie':
            inputs = { p: 'Momentum (p, kg·m/s)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungDeBroglie(p, null, null, "lambda")';
            namaVariabel = 'λ';
            break;
        case 'p-debroglie':
            inputs = { lambda: 'Panjang Gelombang (λ, m)' };
            satuanHasil = 'kg·m/s';
            fungsiHitung = 'hitungDeBroglie(null, lambda, null, "p")';
            namaVariabel = 'p';
            break;
        case 'v-debroglie':
            inputs = { m: 'Massa Partikel (m, kg)', lambda: 'Panjang Gelombang (λ, m)' };
            satuanHasil = 'm/s';
            fungsiHitung = 'hitungDeBroglie(null, lambda, m, "v")';
            namaVariabel = 'v';
            break;

        case 'En-hidrogen':
            inputs = { n: 'Bilangan Kuantum Utama (n)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiHidrogen(n)';
            namaVariabel = 'En';
            break;

        case 'deltaE-transisi':
            inputs = { n1: 'Tingkat Awal (n₁)', n2: 'Tingkat Akhir (n₂)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungTransisiElektron(n1, n2, "deltaE")';
            namaVariabel = 'ΔE';
            break;
        case 'lambda-transisi':
            inputs = { n1: 'Tingkat Awal (n₁)', n2: 'Tingkat Akhir (n₂)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungTransisiElektron(n1, n2, "lambda")';
            namaVariabel = 'λ';
            break;
        case 'f-transisi':
            inputs = { n1: 'Tingkat Awal (n₁)', n2: 'Tingkat Akhir (n₂)' };
            satuanHasil = 'Hertz (Hz)';
            fungsiHitung = 'hitungTransisiElektron(n1, n2, "f")';
            namaVariabel = 'f';
            break;

        case 'En-osilator':
            inputs = { n: 'Bilangan Kuantum (n)', f: 'Frekuensi Osilator (f, Hz)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungOsilatorHarmonik(n, f)';
            namaVariabel = 'En';
            break;

        case 'delta-lambda-compton':
            inputs = { theta: 'Sudut Hamburan (θ)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungEfekCompton(null, theta, "delta-lambda")';
            namaVariabel = 'Δλ';
            break;
        case 'lambda-prime-compton':
            inputs = { lambda: 'Panjang Gelombang Awal (λ, m)', theta: 'Sudut Hamburan (θ)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungEfekCompton(lambda, theta, "lambda-prime")';
            namaVariabel = 'λ\'';
            break;

        case 'delta-p-heisenberg':
            inputs = { delta_x: 'Ketidakpastian Posisi (Δx, m)' };
            satuanHasil = 'kg·m/s';
            fungsiHitung = 'hitungHeisenberg(delta_x, null, "delta-p")';
            namaVariabel = 'Δp';
            break;
        case 'delta-x-heisenberg':
            inputs = { delta_p: 'Ketidakpastian Momentum (Δp, kg·m/s)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungHeisenberg(null, delta_p, "delta-x")';
            namaVariabel = 'Δx';
            break;

        case 'Eb-ikatan':
            inputs = { delta_m: 'Defek Massa (Δm, kg)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiIkatan(delta_m, null, "Eb")';
            namaVariabel = 'Eb';
            break;
        case 'Ebn-ikatan':
            inputs = { delta_m: 'Defek Massa (Δm, kg)', A: 'Nomor Massa (A)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiIkatan(delta_m, A, "Ebn")';
            namaVariabel = 'Eb/A';
            break;

        case 'delta-m-defek':
            inputs = { Z: 'Nomor Atom (Z)', N: 'Jumlah Neutron (N)', m_inti: 'Massa Inti (m_inti, kg)' };
            satuanHasil = 'kilogram (kg)';
            fungsiHitung = 'hitungDefekMassa(Z, N, m_inti)';
            namaVariabel = 'Δm';
            break;

        case 'E-reaksi':
            inputs = { m_reaktan: 'Massa Reaktan Total (m_reaktan, kg)', m_produk: 'Massa Produk Total (m_produk, kg)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiReaksi(m_reaktan, m_produk)';
            namaVariabel = 'E';
            break;

        case 'N-peluruhan':
            inputs = { N0: 'Jumlah Inti Awal (N₀)', lambda: 'Konstanta Peluruhan (λ, s⁻¹)', t: 'Waktu (t, s)' };
            satuanHasil = 'inti';
            fungsiHitung = 'hitungPeluruhan(N0, lambda, t, "N")';
            namaVariabel = 'N';
            break;
        case 'lambda-peluruhan':
            inputs = { N: 'Jumlah Inti Sisa (N)', N0: 'Jumlah Inti Awal (N₀)', t: 'Waktu (t, s)' };
            satuanHasil = 's⁻¹';
            fungsiHitung = 'hitungPeluruhan(N0, N, t, "lambda")';
            namaVariabel = 'λ';
            break;
        case 't-peluruhan':
            inputs = { N: 'Jumlah Inti Sisa (N)', N0: 'Jumlah Inti Awal (N₀)', lambda: 'Konstanta Peluruhan (λ, s⁻¹)' };
            satuanHasil = 'detik (s)';
            fungsiHitung = 'hitungPeluruhan(N0, lambda, N, "t")';
            namaVariabel = 't';
            break;

        case 'T-half':
            inputs = { lambda: 'Konstanta Peluruhan (λ, s⁻¹)' };
            satuanHasil = 'detik (s)';
            fungsiHitung = 'hitungWaktuParuh(lambda, "T")';
            namaVariabel = 'T₁/₂';
            break;
        case 'lambda-half':
            inputs = { T: 'Waktu Paruh (T₁/₂, s)' };
            satuanHasil = 's⁻¹';
            fungsiHitung = 'hitungWaktuParuh(T, "lambda")';
            namaVariabel = 'λ';
            break;

        case 'A-aktivitas':
            inputs = { A0: 'Aktivitas Awal (A₀, Bq)', lambda: 'Konstanta Peluruhan (λ, s⁻¹)', t: 'Waktu (t, s)' };
            satuanHasil = 'Becquerel (Bq)';
            fungsiHitung = 'hitungAktivitas(A0, lambda, t, "A")';
            namaVariabel = 'A';
            break;
        case 'A0-aktivitas':
            inputs = { lambda: 'Konstanta Peluruhan (λ, s⁻¹)', N0: 'Jumlah Inti Awal (N₀)' };
            satuanHasil = 'Becquerel (Bq)';
            fungsiHitung = 'hitungAktivitas(lambda, N0, null, "A0")';
            namaVariabel = 'A₀';
            break;

        case 'E-fisi':
            inputs = { delta_m: 'Defek Massa (Δm, kg)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiFisi(delta_m)';
            namaVariabel = 'E';
            break;

        case 'E-fusi':
            inputs = { delta_m: 'Defek Massa (Δm, kg)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiFusi(delta_m)';
            namaVariabel = 'E';
            break;

        case 'E-total-partikel':
            inputs = { K: 'Energi Kinetik (K, J)', m0: 'Massa Diam (m₀, kg)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiPartikel(K, m0, "E-total")';
            namaVariabel = 'E';
            break;
        case 'K-kinetik-partikel':
            inputs = { E: 'Energi Total (E, J)', m0: 'Massa Diam (m₀, kg)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiPartikel(E, m0, "K")';
            namaVariabel = 'K';
            break;

        case 'p-momentum':
            inputs = { m: 'Massa (m, kg)', v: 'Kecepatan (v, m/s)' };
            satuanHasil = 'kg·m/s';
            fungsiHitung = 'hitungMomentumPartikel(m, v, "p")';
            namaVariabel = 'p';
            break;
        case 'v-momentum':
            inputs = { p: 'Momentum (p, kg·m/s)', m: 'Massa (m, kg)' };
            satuanHasil = 'm/s';
            fungsiHitung = 'hitungMomentumPartikel(p, m, "v")';
            namaVariabel = 'v';
            break;

        case 'q-muatan':
            inputs = { n: 'Jumlah Muatan Elementer (n)' };
            satuanHasil = 'Coulomb (C)';
            fungsiHitung = 'hitungMuatanPartikel(n)';
            namaVariabel = 'q';
            break;

        case 'E-tumbukan':
            inputs = { E1: 'Energi Partikel 1 (E₁, J)', E2: 'Energi Partikel 2 (E₂, J)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiTumbukan(E1, E2)';
            namaVariabel = 'E_total';
            break;

        case 'm-partikel':
            inputs = { E: 'Energi Diam (E, J)' };
            satuanHasil = 'kilogram (kg)';
            fungsiHitung = 'hitungMassaPartikel(E)';
            namaVariabel = 'm';
            break;

        case 'Eg-bandgap':
            inputs = { Ec: 'Energi Pita Konduksi (Ec, eV)', Ev: 'Energi Pita Valensi (Ev, eV)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungBandGap(Ec, Ev)';
            namaVariabel = 'Eg';
            break;

        case 'Ec-konduksi':
            inputs = { Eg: 'Energi Celah Pita (Eg, eV)', Ev: 'Energi Pita Valensi (Ev, eV)' };
            satuanHasil = 'eV';
            fungsiHitung = 'hitungEnergiKonduksi(Eg, Ev)';
            namaVariabel = 'Ec';
            break;

        case 'VH-hall':
            inputs = { I: 'Arus (I, A)', B: 'Medan Magnet (B, T)', n: 'Konsentrasi Pembawa (n, m⁻³)', d: 'Ketebalan (d, m)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungEfekHall(I, B, n, d, "VH")';
            namaVariabel = 'VH';
            break;
        case 'n-hall':
            inputs = { I: 'Arus (I, A)', B: 'Medan Magnet (B, T)', VH: 'Tegangan Hall (VH, V)', d: 'Ketebalan (d, m)' };
            satuanHasil = 'm⁻³';
            fungsiHitung = 'hitungEfekHall(I, B, VH, d, "n")';
            namaVariabel = 'n';
            break;

        case 'sigma-fotokonduktif':
            inputs = { n: 'Konsentrasi Elektron (n, m⁻³)', mu: 'Mobilitas (μ, m²/V·s)' };
            satuanHasil = 'S/m';
            fungsiHitung = 'hitungFotokonduktif(n, mu)';
            namaVariabel = 'σ';
            break;

        case 'T-tunnel':
            inputs = { m: 'Massa Partikel (m, kg)', U: 'Tinggi Potensial (U, J)', E: 'Energi Partikel (E, J)', L: 'Lebar Penghalang (L, m)' };
            satuanHasil = '';
            fungsiHitung = 'hitungEfekTunnel(m, U, E, L)';
            namaVariabel = 'T';
            break;

        case 'RQ-kuantum':
            inputs = {}; 
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'RQ_KUANTUM'; 
            namaVariabel = 'RQ';
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

    const inputFields = [];

    for (const [key, label] of Object.entries(inputs)) {
        if (key === 'theta') {
            form.innerHTML += `
                <div class="input-group">
                    <label for="${key}">${label}:</label>
                    <input type="number" step="any" id="${key}" required style="width: 70%; display: inline-block;">
                    <select id="${key}-unit" style="width: 25%; display: inline-block;">
                        <option value="deg">Derajat (°)</option>
                        <option value="rad">Radian (rad)</option>
                    </select>
                </div>
            `;
        } else {
            form.innerHTML += `
                <div class="input-group">
                    <label for="${key}">${label}:</label>
                    <input type="number" step="any" id="${key}" required>
                </div>
            `;
        }

        const inputElement = document.getElementById(key);
        if (inputElement) {
            inputFields.push(inputElement);
        }
    }

    form.innerHTML += `<button type="submit" class="hitung-btn">Hitung</button>`;

    formDiv.appendChild(form);

    if (inputFields.length > 0) {
        inputFields.forEach((input, index) => {
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault(); 

                    if (input.value.trim() !== '') {
                        if (index < inputFields.length - 1) {
                            inputFields[index + 1].focus();
                            inputFields[index + 1].select(); 
                        } else {
                            form.dispatchEvent(new Event('submit'));
                        }
                    }
                }
            });

        });

        inputFields[0].focus();
    }

}

function hitungDanTampilkan(parameter, inputs, satuanHasil, fungsiHitung, namaVariabel) {
    const nilaiInput = {};
    let allInputsValid = true;

    for (const key of Object.keys(inputs)) {
        const inputElement = document.getElementById(key);

        if (inputElement && inputElement.value !== '') {
            let value = parseFloat(inputElement.value);

            if (key === 'theta') {
                const unit = document.getElementById(`${key}-unit`).value;
                if (unit === 'deg') {
                    nilaiInput[key] = value * (Math.PI / 180);
                } else {
                    nilaiInput[key] = value;
                }
            } else {
                if (isNaN(value)) {
                    allInputsValid = false;
                    break;
                }
                nilaiInput[key] = value;
            }
        } else {
            if (Object.keys(inputs).length > 0) {
                 allInputsValid = false;
                 break;
            }
        }
    }

    const hasilDiv = document.getElementById('hasil-kalkulasi');
    hasilDiv.innerHTML = '';
    hasilDiv.classList.remove('error');

    if (Object.keys(inputs).length > 0 && !allInputsValid) {
        hasilDiv.innerHTML = '<p class="error">⚠️ Mohon isi semua kolom input dengan angka yang valid!</p>';
        return;
    }

    try {
        const argsMatch = fungsiHitung.match(/\((.*?)\)/);
        let finalFunctionCall = fungsiHitung;

        if (argsMatch && argsMatch[1]) {
            const argNames = argsMatch[1].split(',').map(arg => arg.trim());
            
            const argValues = argNames.map(name => {
                if (name.startsWith('"') && name.endsWith('"') || name === 'null') {
                    return name;
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
            throw new Error('Hasil perhitungan tidak valid (NaN atau Infinity). Periksa kembali input Anda dan pastikan tidak ada pembagian dengan nol.');
        }

        let formatted_fx;
        if (Math.abs(hasilNumerik) > 1e6 || (Math.abs(hasilNumerik) !== 0 && Math.abs(hasilNumerik) < 1e-4)) {
            formatted_fx = hasilNumerik.toExponential(6);
        } else {
            formatted_fx = hasilNumerik.toFixed(6).replace(/\.?0+$/, '');
        }

        hasilDiv.innerHTML = `
            <h2>Hasil Perhitungan</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
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

        resetInputFields(inputs);

        const firstInput = document.querySelector('#kalkulator-form input[type="number"]');
        if (firstInput) {
            firstInput.focus();
        }

    } catch (e) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `<h3>⚠️ Error Perhitungan!</h3><p>Terjadi kesalahan saat memproses data:</p>
            <p style="font-weight: bold;">${e.message}</p>
            <p>Pastikan semua variabel sudah terisi dengan angka yang valid dan sesuai dengan konteks rumus yang dipilih.</p>`;
    }
}

function resetInputFields(inputs) {
    for (const key of Object.keys(inputs)) {
        const inputElement = document.getElementById(key);
        if (inputElement) {
            inputElement.value = ''; 
        }
        if (key === 'theta') {
            const unitSelect = document.getElementById(`${key}-unit`);
            if (unitSelect) {
                unitSelect.value = 'deg'; 
            }
        }
    }
}

function hitungEnergiFoton(val1, val2, target) {
    if (target === "E-dari-f") {
        const f = val1;
        return h * f;
    }
    if (target === "E-dari-lambda") {
        const lambda = val2;
        if (lambda === 0) throw new Error("Panjang gelombang tidak boleh nol.");
        return (h * c) / lambda;
    }
    if (target === "f-dari-E") {
        const E = val1;
        if (h === 0) throw new Error("Konstanta Planck tidak boleh nol.");
        return E / h;
    }
    if (target === "lambda-dari-E") {
        const E = val1;
        if (E === 0) throw new Error("Energi tidak boleh nol.");
        return (h * c) / E;
    }
    throw new Error('Target Energi Foton tidak valid');
}

function hitungEfekFotoelektrik(val1, val2, val3, target) {
    if (target === "Ek") {
        const f = val1, W = val2;
        return h * f - W;
    }
    if (target === "W") {
        const f = val1, Ek = val3;
        return h * f - Ek;
    }
    if (target === "f") {
        const Ek = val3, W = val2;
        return (Ek + W) / h;
    }
    throw new Error('Target Efek Fotoelektrik tidak valid');
}

function hitungFrekuensiAmbang(val, target) {
    if (target === "f0") {
        const W = val;
        return W / h;
    }
    if (target === "W") {
        const f0 = val;
        return h * f0;
    }
    throw new Error('Target Frekuensi Ambang tidak valid');
}

function hitungDeBroglie(val1, val2, val3, target) {
    if (target === "lambda") {
        const p = val1;
        if (p === 0) throw new Error("Momentum tidak boleh nol.");
        return h / p;
    }
    if (target === "p") {
        const lambda = val2;
        if (lambda === 0) throw new Error("Panjang gelombang tidak boleh nol.");
        return h / lambda;
    }
    if (target === "v") {
        const m = val3, lambda = val2;
        if (m === 0 || lambda === 0) throw new Error("Massa dan panjang gelombang tidak boleh nol.");
        return h / (m * lambda);
    }
    throw new Error('Target de Broglie tidak valid');
}

function hitungEnergiHidrogen(n) {
    if (n <= 0) throw new Error("Bilangan kuantum n tidak boleh nol atau negatif.");
    const E1_J = 13.6 * e; 
    return -E1_J / Math.pow(n, 2); 
}

function hitungTransisiElektron(n1, n2, target) {
    if (n1 <= 0 || n2 <= 0) throw new Error("Bilangan kuantum tidak boleh nol atau negatif.");
    
    const En1 = hitungEnergiHidrogen(n1); 
    const En2 = hitungEnergiHidrogen(n2); 
    const deltaE = Math.abs(En2 - En1); 
    
    if (target === "deltaE") {
        return deltaE; 
    }
    if (target === "lambda") {
        if (deltaE === 0) throw new Error("Perubahan energi tidak boleh nol.");
        return (h * c) / deltaE; 
    }
    if (target === "f") {
        return deltaE / h; 
    }
    throw new Error('Target Transisi Elektron tidak valid');
}

function hitungOsilatorHarmonik(n, f) {
    return (n + 0.5) * h * f;
}

function hitungEfekCompton(val1, val2, target) {
    const theta = val2;
    const lambda_c = h / (me * c); 
    
    if (target === "delta-lambda") {
        return lambda_c * (1 - Math.cos(theta));
    }
    if (target === "lambda-prime") {
        const lambda = val1;
        return lambda + lambda_c * (1 - Math.cos(theta));
    }
    throw new Error('Target Efek Compton tidak valid');
}

function hitungHeisenberg(val1, val2, target) {
    if (target === "delta-p") {
        const delta_x = val1;
        if (delta_x === 0) throw new Error("Ketidakpastian posisi tidak boleh nol.");
        return hbar / (2 * delta_x);
    }
    if (target === "delta-x") {
        const delta_p = val2;
        if (delta_p === 0) throw new Error("Ketidakpastian momentum tidak boleh nol.");
        return hbar / (2 * delta_p);
    }
    throw new Error('Target Heisenberg tidak valid');
}

function hitungEnergiIkatan(delta_m, A, target) {
    if (target === "Eb") {
        return delta_m * Math.pow(c, 2);
    }
    if (target === "Ebn") {
        if (A === 0) throw new Error("Nomor massa tidak boleh nol.");
        return (delta_m * Math.pow(c, 2)) / A;
    }
    throw new Error('Target Energi Ikatan tidak valid');
}

function hitungDefekMassa(Z, N, m_inti) {
    return Z * mp + N * mn - m_inti;
}

function hitungEnergiReaksi(m_reaktan, m_produk) {
    return (m_reaktan - m_produk) * Math.pow(c, 2);
}

function hitungPeluruhan(val1, val2, val3, target) {
    if (target === "N") {
        const N0 = val1, lambda = val2, t = val3;
        return N0 * Math.exp(-lambda * t);
    }
    if (target === "lambda") {
        const N0 = val1, N = val2, t = val3; 
        if (t <= 0) throw new Error("Waktu (t) harus positif.");
        if (N0 <= 0 || N < 0) throw new Error("N₀ harus positif, dan N tidak boleh negatif.");
        if (N > N0) throw new Error("Jumlah inti sisa (N) tidak boleh lebih besar dari jumlah inti awal (N₀).");
        return -Math.log(N / N0) / t;
    }
    if (target === "t") {
        const N0 = val1, lambda = val2, N = val3; 
        if (lambda <= 0) throw new Error("Konstanta peluruhan (λ) harus positif.");
        if (N0 <= 0 || N < 0) throw new Error("N₀ harus positif, dan N tidak boleh negatif.");
        if (N > N0) throw new Error("Jumlah inti sisa (N) tidak boleh lebih besar dari jumlah inti awal (N₀).");
        return -Math.log(N / N0) / lambda;
    }
    throw new Error('Target Peluruhan tidak valid');
}

function hitungWaktuParuh(val, target) {
    if (target === "T") {
        const lambda = val;
        if (lambda === 0) throw new Error("Konstanta peluruhan tidak boleh nol.");
        return Math.log(2) / lambda;
    }
    if (target === "lambda") {
        const T = val;
        if (T === 0) throw new Error("Waktu paruh tidak boleh nol.");
        return Math.log(2) / T;
    }
    throw new Error('Target Waktu Paruh tidak valid');
}

function hitungAktivitas(val1, val2, val3, target) {
    if (target === "A") {
        const A0 = val1, lambda = val2, t = val3;
        return A0 * Math.exp(-lambda * t);
    }
    if (target === "A0") {
        const lambda = val1, N0 = val2;
        return lambda * N0;
    }
    throw new Error('Target Aktivitas tidak valid');
}

function hitungEnergiFisi(delta_m) {
    return delta_m * Math.pow(c, 2);
}

function hitungEnergiFusi(delta_m) {
    return delta_m * Math.pow(c, 2);
}

function hitungEnergiPartikel(val1, val2, target) {
    if (target === "E-total") {
        const K = val1, m0 = val2;
        return K + m0 * Math.pow(c, 2);
    }
    if (target === "K") {
        const E = val1, m0 = val2;
        return E - m0 * Math.pow(c, 2);
    }
    throw new Error('Target Energi Partikel tidak valid');
}

function hitungMomentumPartikel(val1, val2, target) {
    if (target === "p") {
        const m = val1, v = val2;
        return m * v;
    }
    if (target === "v") {
        const p = val1, m = val2;
        if (m === 0) throw new Error("Massa tidak boleh nol.");
        return p / m;
    }
    throw new Error('Target Momentum Partikel tidak valid');
}

function hitungMuatanPartikel(n) {
    return n * e;
}

function hitungEnergiTumbukan(E1, E2) {
    return E1 + E2;
}

function hitungMassaPartikel(E) {
    return E / Math.pow(c, 2);
}

function hitungBandGap(Ec, Ev) {
    return Ec - Ev;
}

function hitungEnergiKonduksi(Eg, Ev) {
    return Eg + Ev;
}

function hitungEfekHall(I, B, val3, d, target) {
    if (target === "VH") {
        const n = val3;
        if (n === 0 || d === 0) throw new Error("Konsentrasi pembawa dan ketebalan tidak boleh nol.");
        return (I * B) / (n * e * d);
    }
    if (target === "n") {
        const VH = val3;
        if (VH === 0 || d === 0) throw new Error("Tegangan Hall dan ketebalan tidak boleh nol.");
        return (I * B) / (VH * e * d);
    }
    throw new Error('Target Efek Hall tidak valid');
}

function hitungFotokonduktif(n, mu) {
    return n * e * mu;
}

function hitungEfekTunnel(m, U, E, L) {
    if (U <= E) throw new Error("Tinggi potensial (U) harus lebih besar dari energi partikel (E) untuk tunneling.");
    if (m <= 0 || L <= 0) throw new Error("Massa partikel (m) dan Lebar Penghalang (L) harus positif.");
    
    const diff = U - E;
    const kappa = Math.sqrt((2 * m * diff) / Math.pow(hbar, 2));
    const exponent = 2 * kappa * L;
    
    if (exponent > 800) { 
         throw new Error("Hasil perhitungan mendekati nol (di luar batas presisi floating-point). Gunakan nilai berskala kuantum (massa ~10⁻³⁰ kg, energi ~10⁻¹⁹ J, lebar ~10⁻⁹ m) agar efek terowongan terukur.");
    }

    return Math.exp(-exponent);
}