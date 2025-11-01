let currentFungsi = '';

function parseDataTunggal(dataString) {
    if (!dataString) throw new Error("Data tidak boleh kosong");
    const data = dataString.split(',').map(s => parseFloat(s.trim()));
    if (data.some(isNaN)) throw new Error("Semua data harus berupa angka");
    return data;
}

function parseDataKelompok(dataString) {
    if (!dataString) throw new Error("Data tidak boleh kosong");
    const dataArray = dataString.split(';').map(item => item.trim());
    const parsedData = [];
    let n = 0; 

    for (const item of dataArray) {
        const parts = item.split(',');
        if (parts.length !== 2) throw new Error("Format input kelas salah. Gunakan 'BatasBawah-BatasAtas,Frekuensi'");
        
        const range = parts[0].split('-');
        const frekuensi = parseInt(parts[1]);
        
        if (range.length !== 2 || isNaN(frekuensi) || frekuensi < 0) throw new Error("Batas kelas atau Frekuensi invalid");
        
        const bb = parseFloat(range[0]);
        const ba = parseFloat(range[1]);

        if (isNaN(bb) || isNaN(ba)) throw new Error("Batas kelas harus angka");

        const kelas = {
            kelas: [bb, ba],
            f: frekuensi,
            tb: bb - 0.5, 
            p: ba - bb + 1, 
            xi: (bb + ba) / 2 
        };
        parsedData.push(kelas);
        n += frekuensi;
    }

    if (parsedData.length === 0) throw new Error("Data kelas kosong");

    let fk = 0;
    for (const item of parsedData) {
        item.F = fk; 
        fk += item.f;
    }

    return { data: parsedData, n: n, p: parsedData[0].p }; 
}

function factorial(n) {
    if (n < 0) throw new Error("Faktorial hanya untuk bilangan non-negatif");
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function clearHasil() {
    const hasil = document.getElementById('hasil');
    if (hasil) {
        hasil.innerHTML = '';
        hasil.classList.remove('error');
    }
}

function clearInputFields() {
    const inputs = document.querySelectorAll('#kalkulator-area input, #kalkulator-area textarea, #kalkulator-area select');
    inputs.forEach(input => {
        if (input.tagName === 'TEXTAREA' || input.type === 'text' || input.type === 'number') {
            input.value = '';
        } else if (input.tagName === 'SELECT') {
            input.selectedIndex = 0; 
        }
    });
    const firstInput = document.querySelector('#kalkulator-area input, #kalkulator-area textarea');
    if (firstInput) {
        firstInput.focus();
    }
}

function addEnterListeners() {
    const calculatorArea = document.getElementById('kalkulator-area');
    if (!calculatorArea) return;

    const inputs = Array.from(calculatorArea.querySelectorAll('input:not([type="button"]):not([type="submit"]), textarea'));
    const relevantInputs = inputs.filter(input => 
        input.id !== 'data-type' && input.id !== 'sampel' && input.offsetParent !== null 
    );
    
    relevantInputs.forEach(input => {
        input.removeEventListener('keydown', handleEnterKey);
        input.removeEventListener('input', clearHasil);
    });

    relevantInputs.forEach((input, index) => {
        input.addEventListener('keydown', handleEnterKey.bind(null, relevantInputs, index));
        
        input.addEventListener('input', clearHasil);
    });
}

function handleEnterKey(inputs, currentIndex, e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 

        const nextIndex = currentIndex + 1;
        if (nextIndex < inputs.length) {
            inputs[nextIndex].focus();
        } else {
            const hitungButton = document.querySelector('#kalkulator-area button');
            if (hitungButton) {
                hitung(currentFungsi);
            }
        }
    }
}

function tampilkanKalkulator() {
    const selectElement = document.getElementById('pilih-bangun');
    const fungsi = selectElement.value;
    currentFungsi = fungsi;
    const selectedOption = selectElement.options[selectElement.selectedIndex].text;
    const area = document.getElementById('kalkulator-area');
    area.innerHTML = '';
    if (!fungsi) return;

    clearHasil(); 

    let title = selectedOption;
    let html = `<h2>${title}</h2>`;

    const dataTunggalInput = `
        <label for="data-tunggal">Data Tunggal (pisahkan koma, cth: 1,2,3):</label>
        <textarea id="data-tunggal" rows="3" placeholder="Masukkan data"></textarea>
    `;
    const dataKelompokInput = `
        <label for="data-kelompok">Data Kelompok (BatasBawah-BatasAtas,Frekuensi; pisahkan titik koma, cth: 50-59,2; 60-69,5):</label>
        <textarea id="data-kelompok" rows="5" placeholder="Masukkan data kelas dan frekuensi"></textarea>
    `;
    const dataTypeSelect = `
        <label for="data-type">Tipe Data:</label>
        <select id="data-type" onchange="updateInputType('${fungsi}')">
            <option value="tunggal">Data Tunggal</option>
            <option value="kelompok">Data Kelompok</option>
        </select>
    `;
    const kInput = `<label for="k">k:</label><input type="number" id="k" placeholder="Masukkan kuartil/persentil ke-k">`;
    const sInput = `<label for="sampel">Sampel (s):</label><select id="sampel"><option value="populasi">Populasi</option><option value="sampel">Sampel</option></select>`;
    
    switch (fungsi) {
        case 'mean':
        case 'median':
        case 'modus':
        case 'kuartil':
        case 'persentil':
            html += dataTypeSelect;
            html += `<div id="data-input-container">`; 
            html += `</div>`;
            html += `<button onclick="hitung('${fungsi}')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;

        case 'jangkauan':
        case 'varians':
        case 'simpangan-baku':
            html += `<h3>Hanya Data Tunggal</h3>`;
            html += dataTunggalInput;
            if (fungsi === 'varians' || fungsi === 'simpangan-baku') {
                html += sInput;
            }
            html += `<button onclick="hitung('${fungsi}')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
            
        case 'peluang':
            html += `<label for="n_e">n(E) (Banyak kejadian):</label><input type="number" id="n_e" placeholder="Jumlah kejadian yang diinginkan">`;
            html += `<label for="n_s">n(S) (Banyak ruang sampel):</label><input type="number" id="n_s" placeholder="Total ruang sampel">`;
            html += `<button onclick="hitung('${fungsi}')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'kombinasi':
        case 'permutasi':
            html += `<label for="n">n:</label><input type="number" id="n" placeholder="Total elemen n">`;
            html += `<label for="r">r:</label><input type="number" id="r" placeholder="Elemen yang dipilih r">`;
            html += `<button onclick="hitung('${fungsi}')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
    }

    area.innerHTML = html;
    
    if (['mean', 'median', 'modus', 'kuartil', 'persentil'].includes(fungsi)) {
        updateInputType(fungsi); 
    } else {
         addEnterListeners(); 
    }
}

function updateInputType(fungsi) {
    const dataType = document.getElementById('data-type').value;
    const container = document.getElementById('data-input-container');
    const kInputHtml = (fungsi === 'kuartil' || fungsi === 'persentil') ? 
        `<label for="k">k:</label><input type="number" id="k" placeholder="Masukkan kuartil/persentil ke-k">` : 
        '';

    let html = '';
    if (dataType === 'tunggal') {
        html = `
            <label for="data-tunggal">Data Tunggal (pisahkan koma, cth: 1,2,3):</label>
            <textarea id="data-tunggal" rows="3" placeholder="Masukkan data"></textarea>
            ${kInputHtml}
        `;
    } else { 
        html = `
            <label for="data-kelompok">Data Kelompok (BatasBawah-BatasAtas,Frekuensi; pisahkan titik koma, cth: 50-59,2; 60-69,5):</label>
            <textarea id="data-kelompok" rows="5" placeholder="Masukkan data kelas dan frekuensi"></textarea>
            ${kInputHtml}
        `;
    }
    container.innerHTML = html;
    addEnterListeners(); 
}

function hitung(fungsi) {
    const hasil = document.getElementById('hasil');
    hasil.classList.remove('error');
    let result, x, k, isSampel; 

    const dataType = document.getElementById('data-type') ? document.getElementById('data-type').value : 'tunggal';

    try {
        switch (fungsi) {
            case 'mean': {
                if (dataType === 'tunggal') {
                    const data = parseDataTunggal(document.getElementById('data-tunggal').value);
                    const sum = data.reduce((acc, val) => acc + val, 0);
                    result = sum / data.length;
                    x = `Σx / n`; 
                } else { 
                    const dataKel = parseDataKelompok(document.getElementById('data-kelompok').value);
                    const sum_fxi = dataKel.data.reduce((acc, item) => acc + (item.f * item.xi), 0);
                    result = sum_fxi / dataKel.n;
                    x = `Σ(f · xᵢ) / n`;
                }
                break;
            }
            case 'median': {
                if (dataType === 'tunggal') {
                    const data = parseDataTunggal(document.getElementById('data-tunggal').value).sort((a, b) => a - b);
                    const n_d = data.length;
                    if (n_d === 0) throw new Error("Data kosong");
                    
                    if (n_d % 2 === 1) { 
                        const pos = Math.floor(n_d / 2);
                        result = data[pos];
                    } else { 
                        const pos1 = n_d / 2 - 1;
                        const pos2 = n_d / 2;
                        result = (data[pos1] + data[pos2]) / 2;
                    }
                    x = `Data terurut`;
                } else { 
                    const dataKel = parseDataKelompok(document.getElementById('data-kelompok').value);
                    const n = dataKel.n;
                    const pos_me = n / 2;
                    
                    const kelasMedian = dataKel.data.find(item => item.F + item.f >= pos_me);
                    if (!kelasMedian) throw new Error("Kelas median tidak ditemukan. Periksa data.");
                    
                    const F = kelasMedian.F; 
                    const f = kelasMedian.f; 
                    const p = kelasMedian.p; 
                    const Tb = kelasMedian.tb; 

                    result = Tb + ((pos_me - F) / f) * p;
                    x = `T_{b} + ( (n/2 - F) / f ) * p`;
                }
                break;
            }
            case 'modus': {
                if (dataType === 'tunggal') {
                    const data = parseDataTunggal(document.getElementById('data-tunggal').value);
                    const counts = {};
                    let maxCount = 0;
                    let modes = [];

                    for (const val of data) {
                        counts[val] = (counts[val] || 0) + 1;
                        if (counts[val] > maxCount) {
                            maxCount = counts[val];
                        }
                    }

                    if (maxCount === 1) {
                        result = "Tidak ada modus (setiap angka muncul sekali)";
                    } else {
                        for (const key in counts) {
                            if (counts[key] === maxCount) {
                                modes.push(parseFloat(key));
                            }
                        }
                        result = modes.join(', ');
                    }
                    x = `Data`;
                } else { 
                    const dataKel = parseDataKelompok(document.getElementById('data-kelompok').value);
                    
                    let kelasModus = dataKel.data.reduce((max, item) => item.f > max.f ? item : max, {f:-1});
                    
                    const idx = dataKel.data.findIndex(item => item === kelasModus);
                    
                    if (kelasModus.f <= 0) {
                        result = "Tidak ada modus";
                        x = "Tidak ada modus";
                        break;
                    }

                    const f_prev = (idx > 0) ? dataKel.data[idx - 1].f : 0;
                    const f_next = (idx < dataKel.data.length - 1) ? dataKel.data[idx + 1].f : 0;
                    
                    const d1 = kelasModus.f - f_prev;
                    const d2 = kelasModus.f - f_next;
                    const p = kelasModus.p;
                    const Tb = kelasModus.tb;

                    if (d1 + d2 === 0) throw new Error("Modus tidak dapat dihitung (d1 + d2 = 0)");

                    result = Tb + (d1 / (d1 + d2)) * p;
                    x = `T_{b} + ( d1 / (d1 + d2) ) * p`;
                }
                break;
            }
            
            case 'kuartil':
            case 'persentil': {
                k = parseInt(document.getElementById('k').value);
                const pembagi = (fungsi === 'kuartil') ? 4 : 100;
                const max_k = (fungsi === 'kuartil') ? 3 : 99;
                if (isNaN(k) || k < 1 || k > max_k) throw new Error(`${fungsi} ke-k invalid (1-${max_k})`);
                const simbol = (fungsi === 'kuartil') ? 'Q' : 'P';

                if (dataType === 'tunggal') {
                    const data = parseDataTunggal(document.getElementById('data-tunggal').value).sort((a, b) => a - b);
                    const n_d = data.length;
                    if (n_d === 0) throw new Error("Data kosong");

                    const pos = k * (n_d + 1) / pembagi - 1; 
                    
                    const index_low = Math.floor(pos);
                    const fraction = pos - index_low;

                    if (index_low < 0) {
                        result = data[0]; 
                    } else if (index_low >= n_d - 1) {
                        result = data[n_d - 1]; 
                    } else {
                        result = data[index_low] + fraction * (data[index_low + 1] - data[index_low]);
                    }
                    x = `Posisi ${simbol}${k}: ${k}(n+1)/${pembagi}`;

                } else { 
                    const dataKel = parseDataKelompok(document.getElementById('data-kelompok').value);
                    const n = dataKel.n;
                    const pos_ki = k * n / pembagi; 

                    const kelasKuartil = dataKel.data.find(item => item.F + item.f >= pos_ki);
                    if (!kelasKuartil) throw new Error(`Kelas ${simbol}${k} tidak ditemukan. Periksa data.`);
                    
                    const F = kelasKuartil.F; 
                    const f = kelasKuartil.f; 
                    const p = kelasKuartil.p; 
                    const Tb = kelasKuartil.tb; 

                    result = Tb + ((pos_ki - F) / f) * p;
                    x = `T_{b} + ( (k·n/${pembagi} - F) / f ) * p`;
                }
                break;
            }
            
            case 'jangkauan': {
                const data = parseDataTunggal(document.getElementById('data-tunggal').value);
                const max = Math.max(...data);
                const min = Math.min(...data);
                result = max - min;
                x = `${max} - ${min}`;
                break;
            }
            case 'varians': {
                const data = parseDataTunggal(document.getElementById('data-tunggal').value);
                isSampel = document.getElementById('sampel').value === 'sampel';
                const n_v = data.length;
                if (n_v <= (isSampel ? 1 : 0)) throw new Error("Data tidak cukup");
                
                const mean = data.reduce((acc, val) => acc + val, 0) / n_v;
                const sumSquaredDiff = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
                
                const denominator = isSampel ? n_v - 1 : n_v;
                result = sumSquaredDiff / denominator;
                x = `(Σ(x - μ)² / N) atau (Σ(x - x̄)² / (n-1))`;
                break;
            }
            case 'simpangan-baku': {
                const data = parseDataTunggal(document.getElementById('data-tunggal').value);
                isSampel = document.getElementById('sampel').value === 'sampel';
                const n_v = data.length;
                if (n_v <= (isSampel ? 1 : 0)) throw new Error("Data tidak cukup");
                
                const mean = data.reduce((acc, val) => acc + val, 0) / n_v;
                const sumSquaredDiff = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
                
                const denominator = isSampel ? n_v - 1 : n_v;
                const variance = sumSquaredDiff / denominator;
                result = Math.sqrt(variance);
                x = `√Varians`;
                break;
            }
            
            case 'peluang': {
                const n_e = parseInt(document.getElementById('n_e').value);
                const n_s = parseInt(document.getElementById('n_s').value);
                if (isNaN(n_e) || isNaN(n_s) || n_s <= 0 || n_e < 0 || n_e > n_s) throw new Error('Input invalid. Pastikan n(E) di antara 0 dan n(S), dan n(S) > 0');
                result = n_e / n_s;
                x = `${n_e} / ${n_s}`;
                break;
            }
            case 'kombinasi': {
                const n = parseInt(document.getElementById('n').value);
                const r = parseInt(document.getElementById('r').value);
                if (isNaN(n) || isNaN(r) || r < 0 || n < r) throw new Error('Input invalid. Pastikan 0 ≤ r ≤ n');
                
                const num = factorial(n);
                const den = factorial(r) * factorial(n - r);
                result = num / den;
                x = `C(${n}, ${r})`;
                break;
            }
            case 'permutasi': {
                const n = parseInt(document.getElementById('n').value);
                const r = parseInt(document.getElementById('r').value);
                if (isNaN(n) || isNaN(r) || r < 0 || n < r) throw new Error('Input invalid. Pastikan 0 ≤ r ≤ n');
                
                const num = factorial(n);
                const den = factorial(n - r);
                result = num / den;
                x = `P(${n}, ${r})`;
                break;
            }
        }
        
        if (typeof result === 'number' && !isFinite(result)) throw new Error('Nilai tidak terdefinisi');

        let formatted_fx;
        if (typeof result === 'string') {
            formatted_fx = result;
        } else {
            formatted_fx = result.toFixed(6).replace(/\.?0+$/, ''); 
        }

        let titleText = document.getElementById('pilih-bangun').options[document.getElementById('pilih-bangun').selectedIndex].text;
        
        if (fungsi === 'varians' || fungsi === 'simpangan-baku') {
             titleText = (isSampel ? `Hasil ${titleText} (Sampel)` : `Hasil ${titleText} (Populasi)`);
        } else if (fungsi === 'kuartil' || fungsi === 'persentil') {
            titleText = `Hasil ${titleText} ke-${k} (${dataType === 'tunggal' ? 'Tunggal' : 'Kelompok'})`;
        } else if (dataType !== undefined) {
            titleText = `Hasil ${titleText} (${dataType === 'tunggal' ? 'Tunggal' : 'Kelompok'})`;
        }
        
        hasil.innerHTML = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #0b2c66; color: white;">
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Perhitungan</th>
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 10px;">${titleText}</td>
                    <td style="border: 1px solid #ccc; padding: 10px;">${formatted_fx}</td>
                </tr>
            </table>
        `;

        clearInputFields();

    } catch (e) {
        hasil.classList.add('error');
        hasil.innerHTML = `Error: ${e.message}`;
    }
}

document.getElementById('pilih-bangun').addEventListener('change', tampilkanKalkulator);