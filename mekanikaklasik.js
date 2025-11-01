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

        document.removeEventListener('keydown', handleEnterKey); 
        document.addEventListener('keydown', handleEnterKey);
    } else {
        document.removeEventListener('keydown', handleEnterKey);
    }
}

function getOpsiParameter(topik) {
    switch (topik) {
        case 'glb-glbb':
            return {
                'v-glb': 'Kecepatan (v) GLB',
                's-glb': 'Jarak (s) GLB',
                'vt-glbb': 'Kecepatan Akhir (vt) GLBB',
                's-glbb': 'Jarak (s) GLBB (tanpa vt)',
                'a-glbb': 'Percepatan (a) GLBB'
            };
        case 'gerak-parabola':
            return {
                't-puncak': 'Waktu di Puncak (t_puncak)',
                'h-maks': 'Ketinggian Maksimum (h_maks)',
                'jangkauan': 'Jarak Jangkauan (R)'
            };
        case 'gaya-hukum-newton':
            return {
                'F-hukum2': 'Gaya Resultan (ΣF) Hukum II',
                'a-hukum2': 'Percepatan (a) Hukum II',
                'w-berat': 'Gaya Berat (w)',
                'f-gesek': 'Gaya Gesek (f)',
            };
        case 'usaha-energi':
            return {
                'W-usaha': 'Usaha (W)',
                'P-daya': 'Daya (P)',
                'Ek': 'Energi Kinetik (Ek)',
                'Ep': 'Energi Potensial (Ep)',
                'W-delta-Ek': 'Usaha dari ΔEk'
            };
        case 'momentum-impuls':
            return {
                'p-momentum': 'Momentum (p)',
                'I-impuls': 'Impuls (I)',
                'I-delta-p': 'Impuls dari Δp'
            };
        case 'dinamika-rotasi':
            return {
                'tau': 'Momen Gaya (τ)',
                'Ek-rotasi': 'Energi Kinetik Rotasi (Ek_rotasi)',
                'L-sudut': 'Momentum Sudut (L)'
            };
        case 'gravitasi':
            return {
                'F-grav': 'Gaya Gravitasi (F)',
                'g-grav': 'Percepatan Gravitasi (g)',
                'v-orbit': 'Kecepatan Orbit (v)'
            };
        case 'fluida-statis':
            return {
                'P-umum': 'Tekanan Umum (P)',
                'P-hidro': 'Tekanan Hidrostatik (P)',
                'F2-pascal': 'Gaya F2 Hukum Pascal',
                'Fa': 'Gaya Archimedes (Fa)'
            };
        case 'getaran-harmonis':
            return {
                'T-pegas': 'Periode Pegas (T)',
                'T-bandul': 'Periode Bandul (T)',
                'Et': 'Energi Total Getaran (Et)'
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
        case 'v-glb':
            inputs = { s: 'Jarak Tempuh (s, meter)', t: 'Waktu (t, sekon)' };
            rumusLatex = 'v = s/t';
            satuanHasil = 'm/s';
            fungsiHitung = 'hitungGLB(s, t, "v")';
            namaVariabel = 'v'; 
            break;
        case 's-glb':
            inputs = { v: 'Kecepatan (v, m/s)', t: 'Waktu (t, sekon)' };
            rumusLatex = 's = v * t';
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungGLB(v, t, "s")';
            namaVariabel = 's'; 
            break;
        case 'vt-glbb':
            inputs = { v0: 'Kecepatan Awal (v₀, m/s)', a: 'Percepatan (a, m/s²)', t: 'Waktu (t, sekon)' };
            rumusLatex = 'vt = v0 + a t';
            satuanHasil = 'm/s';
            fungsiHitung = 'hitungGLBB(v0, a, t, "vt")';
            namaVariabel = 'vt'; 
            break;
        case 's-glbb':
            inputs = { v0: 'Kecepatan Awal (v₀, m/s)', a: 'Percepatan (a, m/s²)', t: 'Waktu (t, sekon)' };
            rumusLatex = 's = v0 t + 1/2 a t²';
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungGLBB(v0, a, t, "s")';
            namaVariabel = 's'; 
            break;
        case 'a-glbb':
            inputs = { vt: 'Kecepatan Akhir (vₜ, m/s)', v0: 'Kecepatan Awal (v₀, m/s)', t: 'Waktu (t, sekon)' };
            rumusLatex = 'a = (vt - v0) / t';
            satuanHasil = 'm/s²';
            fungsiHitung = 'hitungGLBB(vt, v0, t, "a")';
            namaVariabel = 'a'; 
            break;
        case 't-puncak':
            inputs = { v0: 'Kecepatan Awal (v₀, m/s)', theta: 'Sudut Elevasi (θ)', g: 'Gravitasi (g, m/s²)' };
            rumusLatex = 't_puncak = (v0 sin θ) / g';
            satuanHasil = 'sekon (s)';
            fungsiHitung = 'hitungParabola(v0, theta, g, "t-puncak")';
            namaVariabel = 't_puncak'; 
            break;
        case 'h-maks':
            inputs = { v0: 'Kecepatan Awal (v₀, m/s)', theta: 'Sudut Elevasi (θ)', g: 'Gravitasi (g, m/s²)' };
            rumusLatex = 'h_maks = (v0² sin² θ) / 2g';
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungParabola(v0, theta, g, "h-maks")';
            namaVariabel = 'h_maks'; 
            break;
        case 'jangkauan':
            inputs = { v0: 'Kecepatan Awal (v₀, m/s)', theta: 'Sudut Elevasi (θ)', g: 'Gravitasi (g, m/s²)' };
            rumusLatex = 'R = (v0² sin(2θ)) / g';
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungParabola(v0, theta, g, "jangkauan")';
            namaVariabel = 'R'; 
            break;
        case 'F-hukum2':
            inputs = { m: 'Massa (m, kg)', a: 'Percepatan (a, m/s²)' };
            rumusLatex = 'ΣF = m a';
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungNewton(m, a, "F")';
            namaVariabel = 'ΣF'; 
            break;
        case 'a-hukum2':
            inputs = { F: 'Gaya Resultan (ΣF, N)', m: 'Massa (m, kg)' };
            rumusLatex = 'a = ΣF / m';
            satuanHasil = 'm/s²';
            fungsiHitung = 'hitungNewton(F, m, "a")';
            namaVariabel = 'a'; 
            break;
        case 'w-berat':
            inputs = { m: 'Massa (m, kg)', g: 'Gravitasi (g, m/s²)' };
            rumusLatex = 'w = m g';
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungNewton(m, g, "w")';
            namaVariabel = 'w'; 
            break;
        case 'f-gesek':
            inputs = { mu: 'Koefisien Gesek (μ, tanpa satuan)', N: 'Gaya Normal (N, N)' };
            rumusLatex = 'f = μ N';
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungNewton(mu, N, "f")';
            namaVariabel = 'f'; 
            break;
        case 'W-usaha':
            inputs = { F: 'Gaya (F, N)', s: 'Perpindahan (s, meter)', theta: 'Sudut (θ)' };
            rumusLatex = 'W = F * s * cos θ';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungUsahaEnergi(F, s, theta, "W")';
            namaVariabel = 'W'; 
            break;
        case 'P-daya':
            inputs = { W: 'Usaha (W, J)', t: 'Waktu (t, sekon)' };
            rumusLatex = 'P = W / t';
            satuanHasil = 'Watt (W)';
            fungsiHitung = 'hitungUsahaEnergi(W, t, null, "P1")';
            namaVariabel = 'P'; 
            break;
        case 'Ek':
            inputs = { m: 'Massa (m, kg)', v: 'Kecepatan (v, m/s)' };
            rumusLatex = 'Ek = 1/2 m v²';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungUsahaEnergi(m, v, null, "Ek")';
            namaVariabel = 'Ek'; 
            break;
        case 'Ep':
            inputs = { m: 'Massa (m, kg)', g: 'Gravitasi (g, m/s²)', h: 'Ketinggian (h, meter)' };
            rumusLatex = 'Ep = m g h';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungUsahaEnergi(m, g, h, "Ep")';
            namaVariabel = 'Ep'; 
            break;
        case 'W-delta-Ek':
            inputs = { m: 'Massa (m, kg)', vt: 'Kecepatan Akhir (vₜ, m/s)', v0: 'Kecepatan Awal (v₀, m/s)' };
            rumusLatex = 'W = ΔEk = 1/2 m (vₜ² - v₀²)';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungUsahaEnergi(m, vt, v0, "W-delta-Ek")';
            namaVariabel = 'W (ΔEk)'; 
            break;
        case 'p-momentum':
            inputs = { m: 'Massa (m, kg)', v: 'Kecepatan (v, m/s)' };
            rumusLatex = 'p = m v';
            satuanHasil = 'kg·m/s';
            fungsiHitung = 'hitungMomentumImpuls(m, v, null, "p")';
            namaVariabel = 'p'; 
            break;
        case 'I-impuls':
            inputs = { F: 'Gaya (F, N)', dt: 'Selang Waktu (Δt, sekon)' };
            rumusLatex = 'I = F Δt';
            satuanHasil = 'N·s';
            fungsiHitung = 'hitungMomentumImpuls(F, dt, null, "I")';
            namaVariabel = 'I'; 
            break;
        case 'I-delta-p':
            inputs = { m: 'Massa (m, kg)', vt: 'Kecepatan Akhir (vₜ, m/s)', v0: 'Kecepatan Awal (v₀, m/s)' };
            rumusLatex = 'I = m vₜ - m v₀';
            satuanHasil = 'N·s';
            fungsiHitung = 'hitungMomentumImpuls(m, vt, v0, "I-delta-p")';
            namaVariabel = 'I (Δp)'; 
            break;
        case 'tau':
            inputs = { F: 'Gaya (F, N)', r: 'Lengan Gaya (r, meter)', theta: 'Sudut (θ)' };
            rumusLatex = 'τ = F * r * sin θ';
            satuanHasil = 'N·m';
            fungsiHitung = 'hitungDinamikaRotasi(F, r, theta, "tau")';
            namaVariabel = 'τ'; 
            break;
        case 'Ek-rotasi':
            inputs = { I: 'Momen Inersia (I, kg·m²)', omega: 'Kecepatan Sudut (ω, rad/s)' };
            rumusLatex = 'Ek = 1/2 I ω²';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungDinamikaRotasi(I, omega, null, "Ek")';
            namaVariabel = 'E_k (rotasi)'; 
            break;
        case 'L-sudut':
            inputs = { I: 'Momen Inersia (I, kg·m²)', omega: 'Kecepatan Sudut (ω, rad/s)' };
            rumusLatex = 'L = I ω';
            satuanHasil = 'kg·m²/s';
            fungsiHitung = 'hitungDinamikaRotasi(I, omega, null, "L")';
            namaVariabel = 'L'; 
            break;
        case 'F-grav':
            inputs = { m1: 'Massa 1 (m₁, kg)', m2: 'Massa 2 (m₂, kg)', r: 'Jarak (r, meter)' };
            rumusLatex = 'F = G * m₁ m₂ / r² (G ≈ 6.674 x 10⁻¹¹ N·m²/kg² )';
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungGravitasi(m1, m2, r, "F")';
            namaVariabel = 'F'; 
            break;
        case 'g-grav':
            inputs = { M: 'Massa Pusat (M, kg)', r: 'Jarak (r, meter)' };
            rumusLatex = 'g = G * M / r² (G ≈ 6.674 x 10⁻¹¹ N·m²/kg² )';
            satuanHasil = 'm/s²';
            fungsiHitung = 'hitungGravitasi(M, r, null, "g")';
            namaVariabel = 'g'; 
            break;
        case 'v-orbit':
            inputs = { M: 'Massa Pusat (M, kg)', r: 'Jarak Orbit (r, meter)' };
            rumusLatex = 'v = sqrt(G M / r) (G ≈ 6.674 x 10⁻¹¹ N·m²/kg² )';
            satuanHasil = 'm/s';
            fungsiHitung = 'hitungGravitasi(M, r, null, "v-orbit")';
            namaVariabel = 'v_orbit'; 
            break;
        case 'P-umum':
            inputs = { F: 'Gaya Tekan (F, N)', A: 'Luas Permukaan (A, m²)' };
            rumusLatex = 'P = F / A';
            satuanHasil = 'Pascal (Pa)';
            fungsiHitung = 'hitungFluida(F, A, null, "P-umum")';
            namaVariabel = 'P'; 
            break;
        case 'P-hidro':
            inputs = { rho: 'Massa Jenis Fluida (ρ, kg/m³)', g: 'Gravitasi (g, m/s²)', h: 'Kedalaman (h, meter)' };
            rumusLatex = 'P = ρ g h';
            satuanHasil = 'Pascal (Pa)';
            fungsiHitung = 'hitungFluida(rho, g, h, "P-hidro")';
            namaVariabel = 'P_hidro'; 
            break;
        case 'F2-pascal':
            inputs = { F1: 'Gaya F₁ (N)', A1: 'Luas A₁ (m²)', A2: 'Luas A₂ (m²)' };
            rumusLatex = 'F₁ / A₁ = F₂ / A₂ => F₂ = F₁ * A₂ / A₁';
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungFluida(F1, A1, A2, "F2-pascal")';
            namaVariabel = 'F₂'; 
            break;
        case 'Fa':
            inputs = { rho: 'Massa Jenis Cairan (ρ_cair, kg/m³)', g: 'Gravitasi (g, m/s²)', V: 'Volume Benda Tercelup (V, m³)' };
            rumusLatex = 'FA = ρ_cair g V_benda';
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungFluida(rho, g, V, "Fa")';
            namaVariabel = 'F_A'; 
            break;
        case 'T-pegas':
            inputs = { m: 'Massa Benda (m, kg)', k: 'Konstanta Pegas (k, N/m)' };
            rumusLatex = 'T = 2π sqrt(m/k)';
            satuanHasil = 'sekon (s)';
            fungsiHitung = 'hitungGetaran(m, k, null, "T-pegas")';
            namaVariabel = 'T'; 
            break;
        case 'T-bandul':
            inputs = { l: 'Panjang Tali (l, meter)', g: 'Gravitasi (g, m/s²)' };
            rumusLatex = 'T = 2π sqrt(l/g)';
            satuanHasil = 'sekon (s)';
            fungsiHitung = 'hitungGetaran(l, g, null, "T-bandul")';
            namaVariabel = 'T'; 
            break;
        case 'Et':
            inputs = { k: 'Konstanta Pegas (k, N/m)', A: 'Amplitudo (A, meter)' };
            rumusLatex = 'Et = 1/2 k A²';
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungGetaran(k, A, null, "Et")';
            namaVariabel = 'E_t'; 
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
        if (key === 'theta') {
            form.innerHTML += `
                <div class="input-group">
                    <label for="${key}">${label}:</label>
                    <input type="number" step="any" id="${key}" required style="width: 70%; display: inline-block;" class="kalkulator-input">
                    <select id="${key}-unit" style="width: 25%; display: inline-block;" class="kalkulator-input-select">
                        <option value="deg">Derajat (°)</option>
                        <option value="rad">Radian (rad)</option>
                    </select>
                </div>
            `;
        } else {
            form.innerHTML += `
                <div class="input-group">
                    <label for="${key}">${label}:</label>
                    <input type="number" step="any" id="${key}" required class="kalkulator-input">
                </div>
            `;
        }
    }

    form.innerHTML += `<button type="submit" class="hitung-btn">Hitung</button>`;

    formDiv.appendChild(form);
}

document.getElementById('pilih-topik').addEventListener('change', tampilkanKalkulator);

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        const form = document.getElementById('kalkulator-form');
        if (!form) return;
        
        event.preventDefault(); 

        const numberInputs = Array.from(form.querySelectorAll('.kalkulator-input[type="number"]'));
        const activeElement = document.activeElement;
        
        const activeIndex = numberInputs.findIndex(input => input === activeElement);

        if (activeIndex !== -1) {
            if (activeElement.value !== '') {
                const nextIndex = activeIndex + 1;
                if (nextIndex < numberInputs.length) {
                    numberInputs[nextIndex].focus();
                } else {
                    form.dispatchEvent(new Event('submit'));
                }
            } else {
                activeElement.focus();
            }
        } else {
            const submitButton = form.querySelector('.hitung-btn');
            if (submitButton) submitButton.click();
        }
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
                const unit = document.getElementById('theta-unit').value;
                if (unit === 'deg') {
                    nilaiInput[key] = value * (Math.PI / 180);
                    nilaiInput['theta_unit_display'] = 'Derajat (°)'
                } else {
                    nilaiInput[key] = value;
                    nilaiInput['theta_unit_display'] = 'Radian (rad)'
                }
            } else {
                if (isNaN(value)) {
                    allInputsValid = false;
                    break;
                }
                nilaiInput[key] = value;
            }
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
            
            const targetName = argNames[argNames.length - 1]; 
            
            const argValues = argNames.map((name, index) => {
                
                if (index === argNames.length - 1) {
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
        const inputsToClear = form.querySelectorAll('.kalkulator-input');
        inputsToClear.forEach(input => {
            input.value = '';
        });
        
        const firstInput = form.querySelector('.kalkulator-input[type="number"]');
        if (firstInput) firstInput.focus();

    } catch (e) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `<h3>⚠️ Error Perhitungan!</h3><p>Terjadi kesalahan saat memproses data:</p>
            <p style="font-weight: bold;">${e.message}</p>
            <p>Pastikan semua variabel sudah terisi dengan angka yang valid dan sesuai dengan konteks rumus yang dipilih.</p>`;
    }
}

function hitungGLB(val1, val2, target) {
    if (target === "v") {
        if (val2 === 0) throw new Error("Waktu (t) tidak boleh nol.");
        return val1 / val2; 
    }
    if (target === "s") return val1 * val2; 
    throw new Error('Target GLB tidak valid');
}

function hitungGLBB(v_or_vt, v0_or_a, t, target) {
    if (target === "vt") { 
        const v0 = v_or_vt;
        const a = v0_or_a;
        return v0 + a * t;
    }
    if (target === "s") { 
        const v0 = v_or_vt;
        const a = v0_or_a;
        return v0 * t + 0.5 * a * Math.pow(t, 2);
    }
    if (target === "a") { 
        const vt = v_or_vt;
        const v0 = v0_or_a;
        if (t === 0) throw new Error("Waktu (t) tidak boleh nol untuk mencari percepatan.");
        return (vt - v0) / t;
    }
    throw new Error('Target GLBB tidak valid');
}

function hitungParabola(v0, theta, g, target) {
    if (g === 0) throw new Error("Gravitasi (g) tidak boleh nol.");
    if (target === "t-puncak") { 
        return (v0 * Math.sin(theta)) / g;
    }
    if (target === "h-maks") { 
        const sin_sq = Math.pow(Math.sin(theta), 2);
        return (Math.pow(v0, 2) * sin_sq) / (2 * g);
    }
    if (target === "jangkauan") { 
        return (Math.pow(v0, 2) * Math.sin(2 * theta)) / g;
    }
    throw new Error('Target Parabola tidak valid');
}

function hitungNewton(val1, val2, target) {
    if (target === "F") return val1 * val2; 
    if (target === "a") {
        if (val2 === 0) throw new Error("Massa (m) tidak boleh nol untuk mencari percepatan.");
        return val1 / val2; 
    }
    if (target === "w") return val1 * val2; 
    if (target === "f") return val1 * val2; 
    throw new Error('Target Newton tidak valid');
}

function hitungUsahaEnergi(val1, val2, val3, target) {
    if (target === "W") { 
        const F = val1;
        const s = val2;
        const theta = val3;
        return F * s * Math.cos(theta);
    }
    if (target === "P1") {
        if (val2 === 0) throw new Error("Waktu (t) tidak boleh nol untuk mencari Daya.");
        return val1 / val2; 
    }
    if (target === "Ek") { 
        const m = val1;
        const v = val2;
        return 0.5 * m * Math.pow(v, 2);
    }
    if (target === "Ep") { 
        const m = val1;
        const g = val2;
        const h = val3;
        return m * g * h;
    }
    if (target === "W-delta-Ek") { 
        const m = val1;
        const vt = val2;
        const v0 = val3;
        return 0.5 * m * (Math.pow(vt, 2) - Math.pow(v0, 2));
    }
    throw new Error('Target Usaha-Energi tidak valid');
}

function hitungMomentumImpuls(val1, val2, val3, target) {
    if (target === "p") return val1 * val2; 
    if (target === "I") return val1 * val2; 
    if (target === "I-delta-p") { 
        const m = val1;
        const vt = val2;
        const v0 = val3;
        return m * (vt - v0);
    }
    throw new Error('Target Momentum-Impuls tidak valid');
}

function hitungDinamikaRotasi(val1, val2, val3, target) {
    if (target === "tau") { 
        const F = val1;
        const r = val2;
        const theta = val3;
        return F * r * Math.sin(theta);
    }
    if (target === "Ek") { 
        const I = val1;
        const omega = val2;
        return 0.5 * I * Math.pow(omega, 2);
    }
    if (target === "L") return val1 * val2; 
    throw new Error('Target Dinamika Rotasi tidak valid');
}

const G = 6.674e-11; 
function hitungGravitasi(val1, val2, val3, target) {
    if (target === "F") { 
        const m1 = val1;
        const m2 = val2;
        const r = val3;
        if (r === 0) throw new Error("Jarak (r) tidak boleh nol.");
        return G * m1 * m2 / Math.pow(r, 2);
    }
    if (target === "g") { 
        const M = val1;
        const r = val2;
        if (r === 0) throw new Error("Jarak (r) tidak boleh nol.");
        return G * M / Math.pow(r, 2);
    }
    if (target === "v-orbit") { 
        const M = val1;
        const r = val2;
        if (r <= 0) throw new Error("Jarak Orbit (r) harus lebih besar dari nol.");
        return Math.sqrt((G * M) / r);
    }
    throw new Error('Target Gravitasi tidak valid');
}

function hitungFluida(val1, val2, val3, target) {
    if (target === "P-umum") {
        if (val2 === 0) throw new Error("Luas Permukaan (A) tidak boleh nol.");
        return val1 / val2; 
    }
    if (target === "P-hidro") return val1 * val2 * val3; 
    if (target === "F2-pascal") { 
        const F1 = val1;
        const A1 = val2;
        const A2 = val3;
        if (A1 === 0) throw new Error("Luas A₁ tidak boleh nol untuk Hukum Pascal.");
        return F1 * (A2 / A1);
    }
    if (target === "Fa") return val1 * val2 * val3; 
    throw new Error('Target Fluida Statis tidak valid');
}

function hitungGetaran(val1, val2, val3, target) {
    if (target === "T-pegas") { 
        const m = val1;
        const k = val2;
        if (k <= 0) throw new Error("Konstanta pegas (k) harus positif.");
        return 2 * Math.PI * Math.sqrt(m / k);
    }
    if (target === "T-bandul") { 
        const l = val1;
        const g = val2;
        if (l < 0 || g <= 0) throw new Error("Panjang tali (l) dan gravitasi (g) harus positif.");
        return 2 * Math.PI * Math.sqrt(l / g);
    }
    if (target === "Et") { 
        const k = val1;
        const A = val2;
        return 0.5 * k * Math.pow(A, 2);
    }
    throw new Error('Target Getaran Harmonis tidak valid');
}