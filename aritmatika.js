const kalkulatorArea = document.getElementById('kalkulator-area');

function tampilkanKalkulator() {
    const pilihBangun = document.getElementById('pilih-bangun').value;
    let htmlContent = '';

    if (pilihBangun === '') {
        kalkulatorArea.innerHTML = '';
        return;
    }

    let judul = '';
    let instruksi = '';
    let inputForm = '';
    let hitungFunction = '';

    switch (pilihBangun) {
        case 'penjumlahan':
            judul = 'Kalkulator Penjumlahan (+)';
            instruksi = 'Masukkan dua angka untuk dijumlahkan.';
            hitungFunction = 'hitungPenjumlahan';
            inputForm = `
                <div class="input-group">
                    <label for="angka1">Angka Pertama (a):</label>
                    <input type="number" id="angka1" step="any" required>
                </div>
                <div class="input-group">
                    <label for="angka2">Angka Kedua (b):</label>
                    <input type="number" id="angka2" step="any" required>
                </div>
            `;
            break;

        case 'pengurangan':
            judul = 'Kalkulator Pengurangan (-)';
            instruksi = 'Masukkan dua angka (Angka 1 - Angka 2).';
            hitungFunction = 'hitungPengurangan';
            inputForm = `
                <div class="input-group">
                    <label for="angka1">Angka Pertama (a):</label>
                    <input type="number" id="angka1" step="any" required>
                </div>
                <div class="input-group">
                    <label for="angka2">Angka Kedua (b):</label>
                    <input type="number" id="angka2" step="any" required>
                </div>
            `;
            break;

        case 'perkalian':
            judul = 'Kalkulator Perkalian (×)';
            instruksi = 'Masukkan dua angka untuk dikalikan.';
            hitungFunction = 'hitungPerkalian';
            inputForm = `
                <div class="input-group">
                    <label for="angka1">Angka Pertama (a):</label>
                    <input type="number" id="angka1" step="any" required>
                </div>
                <div class="input-group">
                    <label for="angka2">Angka Kedua (b):</label>
                    <input type="number" id="angka2" step="any" required>
                </div>
            `;
            break;

        case 'pembagian':
            judul = 'Kalkulator Pembagian (÷)';
            instruksi = 'Masukkan Pembilang dan Penyebut (Angka 1 / Angka 2).';
            hitungFunction = 'hitungPembagian';
            inputForm = `
                <div class="input-group">
                    <label for="angka1">Pembilang (a):</label>
                    <input type="number" id="angka1" step="any" required>
                </div>
                <div class="input-group">
                    <label for="angka2">Penyebut (b):</label>
                    <input type="number" id="angka2" step="any" required>
                </div>
            `;
            break;

        case 'perpangkatan':
            judul = 'Kalkulator Perpangkatan (a<sup>b</sup>)';
            instruksi = 'Masukkan Basis dan Eksponen.';
            hitungFunction = 'hitungPerpangkatan';
            inputForm = `
                <div class="input-group">
                    <label for="angka1">Basis (a):</label>
                    <input type="number" id="angka1" step="any" required>
                </div>
                <div class="input-group">
                    <label for="angka2">Eksponen (b):</label>
                    <input type="number" id="angka2" step="any" required>
                </div>
            `;
            break;

        case 'akar-kuadrat':
            judul = 'Kalkulator Akar Kuadrat (√a)';
            instruksi = 'Masukkan angka non-negatif yang akan dihitung akar kuadratnya.';
            hitungFunction = 'hitungAkarKuadrat';
            inputForm = `
                <div class="input-group">
                    <label for="angka1">Angka (a):</label>
                    <input type="number" id="angka1" step="any" required>
                </div>
            `;
            break;

        case 'logaritma':
            judul = 'Kalkulator Logaritma (log<sub>b</sub> a)';
            instruksi = 'Masukkan Numerus (a) dan Basis.';
            hitungFunction = 'hitungLogaritma';
            inputForm = `
                <div class="input-group">
                    <label for="angka1">Numerus (a):</label>
                    <input type="number" id="angka1" step="any" required>
                </div>
                <div class="input-group">
                    <label for="angka2">Basis (b):</label>
                    <input type="number" id="angka2" step="any" required>
                </div>
            `;
            break;

        case 'barisan-aritmetika':
            judul = 'Kalkulator Suku ke-n (a<sub>n</sub>) Aritmetika';
            instruksi = 'Masukkan suku pertama, beda, dan suku yang dicari (n).';
            hitungFunction = 'hitungSukuAritmetika';
            inputForm = `
                <div class="input-group">
                    <label for="sukuAwal">Suku Pertama (a):</label>
                    <input type="number" id="sukuAwal" step="any" required>
                </div>
                <div class="input-group">
                    <label for="beda">Beda (b):</label>
                    <input type="number" id="beda" step="any" required>
                </div>
                <div class="input-group">
                    <label for="sukuKe">Suku ke- (n):</label>
                    <input type="number" id="sukuKe" min="1" step="1" required>
                </div>
            `;
            break;

        case 'deret-aritmetika':
            judul = 'Kalkulator Jumlah n Suku (S<sub>n</sub>) Aritmetika';
            instruksi = 'Masukkan suku pertama, beda, dan jumlah suku (n).';
            hitungFunction = 'hitungDeretAritmetika';
            inputForm = `
                <div class="input-group">
                    <label for="sukuAwal">Suku Pertama (a):</label>
                    <input type="number" id="sukuAwal" step="any" required>
                </div>
                <div class="input-group">
                    <label for="beda">Beda (b):</label>
                    <input type="number" id="beda" step="any" required>
                </div>
                <div class="input-group">
                    <label for="sukuKe">Jumlah Suku (n):</label>
                    <input type="number" id="sukuKe" min="1" step="1" required>
                </div>
            `;
            break;

        case 'beda-aritmetika':
            judul = 'Kalkulator Beda (b) Aritmetika';
            instruksi = 'Masukkan Suku ke-m (U<sub>m</sub>), Suku ke-n (U<sub>n</sub>), dan Urutan Suku (m dan n).';
            hitungFunction = 'hitungBedaAritmetika';
            inputForm = `
                <div class="input-group">
                    <label for="sukuUm">Suku ke-m (U<sub>m</sub>):</label>
                    <input type="number" id="sukuUm" step="any" required>
                </div>
                <div class="input-group">
                    <label for="urutanM">Urutan Suku m:</label>
                    <input type="number" id="urutanM" min="1" step="1" required>
                </div>
                <div class="input-group">
                    <label for="sukuUn">Suku ke-n (U<sub>n</sub>):</label>
                    <input type="number" id="sukuUn" step="any" required>
                </div>
                <div class="input-group">
                    <label for="urutanN">Urutan Suku n:</label>
                    <input type="number" id="urutanN" min="1" step="1" required>
                </div>
            `;
            break;

        default:
            kalkulatorArea.innerHTML = '';
            return;
    }

    htmlContent = `
        <div class="kalkulator-container" id="kalkulator-container">
            <h3>${judul}</h3>
            <p style="margin-bottom: 20px; color: #555;">${instruksi}</p>
            <div id="input-form-container">
                ${inputForm}
                <button type="button" onclick="${hitungFunction}()" id="hitung-btn">Hitung</button>
            </div>
            <div id="hasil-perhitungan" class="hasil"></div>
        </div>
    `;

    kalkulatorArea.innerHTML = htmlContent;

    clearInputValues();

    setupInputListeners(hitungFunction);
}

function clearInputValues() {
    const inputs = kalkulatorArea.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
    });
}

function setupInputListeners(hitungFunction) {
    const container = document.getElementById('kalkulator-container');
    if (!container) return;

    const inputs = container.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const hasilDiv = document.getElementById('hasil-perhitungan');
            const inputContainer = document.getElementById('input-form-container');
            if (hasilDiv) {
                hasilDiv.innerHTML = '';
                if (inputContainer) {
                    inputContainer.style.display = 'block';
                }
            }
        });
    });

    container.addEventListener('keydown', function(event) {
        handleEnter(event, hitungFunction);
    });

    if (inputs.length > 0) {
        inputs[0].focus();
    }
}

function getInputs(numInputs = 2) {
    const a = parseFloat(document.getElementById('angka1')?.value);
    let b = numInputs === 2 ? parseFloat(document.getElementById('angka2')?.value) : null;
    const hasilDiv = document.getElementById('hasil-perhitungan');

    if (hasilDiv) {
        if (isNaN(a) || (numInputs === 2 && isNaN(b))) {
            hasilDiv.innerHTML = '<p class="error">Masukkan semua angka dengan benar!</p>';
            return { valid: false };
        }
    }

    return { a, b, hasilDiv, valid: true };
}

function generateResultTable(label, value) {
    const formattedValue = parseFloat(value).toFixed(3).replace(/\.0+$/, '').replace(/\.$/, '');
    return `
        <h4>Hasil Perhitungan:</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #0b2c66; color: white;">
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px;">${label}</td>
                <td style="border: 1px solid #ccc; padding: 10px;">${formattedValue}</td>
            </tr>
        </table>
    `;
}

function handleEnter(event, hitungFunction) {
    if (event.key !== 'Enter') return;

    const target = event.target;
    if (target.tagName !== 'INPUT' || target.type !== 'number') return;

    event.preventDefault();

    const container = document.getElementById('kalkulator-container');
    if (!container) return;

    const inputs = Array.from(container.querySelectorAll('input[type="number"]'));
    const currentIndex = inputs.indexOf(target);

    if (currentIndex === -1) return;

    const currentValue = target.value.trim();
    if (currentValue === '') return;

    if (currentIndex < inputs.length - 1) {
        const nextInput = inputs[currentIndex + 1];
        nextInput.focus();
        nextInput.select();
    } else {
        const hitungButton = document.getElementById('hitung-btn');
        if (hitungButton) {
             hitungButton.click();
        }
    }
}

function formatNumber(num) {
    if (typeof num === 'number' && isFinite(num)) {
        return num.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
    }
    return 'N/A';
}

function hitungPenjumlahan() {
    const { a, b, hasilDiv, valid } = getInputs(2);
    if (!valid) return;
    const hasil = a + b;

    hasilDiv.innerHTML = generateResultTable(`Hasil ${formatNumber(a)} + ${formatNumber(b)}`, hasil);

    clearInputValues();
}

function hitungPengurangan() {
    const { a, b, hasilDiv, valid } = getInputs(2);
    if (!valid) return;
    const hasil = a - b;

    hasilDiv.innerHTML = generateResultTable(`Hasil ${formatNumber(a)} - ${formatNumber(b)}`, hasil);

    clearInputValues();
}

function hitungPerkalian() {
    const { a, b, hasilDiv, valid } = getInputs(2);
    if (!valid) return;
    const hasil = a * b;

    hasilDiv.innerHTML = generateResultTable(`Hasil ${formatNumber(a)} × ${formatNumber(b)}`, hasil);

    clearInputValues();
}

function hitungPembagian() {
    const { a, b, hasilDiv, valid } = getInputs(2);
    if (!valid) return;

    if (b === 0) {
        hasilDiv.innerHTML = '<p class="error">Pembagian dengan nol (0) tidak terdefinisi.</p>';
        return;
    }

    const hasil = a / b;

    hasilDiv.innerHTML = generateResultTable(`Hasil ${formatNumber(a)} ÷ ${formatNumber(b)}`, hasil);

    clearInputValues();
}

function hitungPerpangkatan() {
    const { a, b, hasilDiv, valid } = getInputs(2);
    if (!valid) return;

    const hasil = Math.pow(a, b);

    hasilDiv.innerHTML = generateResultTable(`Hasil ${formatNumber(a)}<sup>${formatNumber(b)}</sup>`, hasil);

    clearInputValues();
}

function hitungAkarKuadrat() {
    const { a, hasilDiv, valid } = getInputs(1);
    if (!valid) return;

    if (a < 0) {
        hasilDiv.innerHTML = '<p class="error">Akar kuadrat hanya bisa dihitung untuk angka non-negatif.</p>';
        return;
    }

    const hasil = Math.sqrt(a);

    hasilDiv.innerHTML = generateResultTable(`Hasil √${formatNumber(a)}`, hasil);

    clearInputValues();
}

function hitungLogaritma() {
    const { a, b, hasilDiv, valid } = getInputs(2);
    if (!valid) return;

    if (a <= 0) {
        hasilDiv.innerHTML = '<p class="error">Numerus harus lebih besar dari nol (a > 0).</p>';
        return;
    }
    if (b <= 0 || b === 1) {
        hasilDiv.innerHTML = '<p class="error">Basis harus lebih besar dari nol (b > 0) dan tidak sama dengan satu (b ≠ 1).</p>';
        return;
    }

    const hasil = Math.log(a) / Math.log(b);

    hasilDiv.innerHTML = generateResultTable(`Hasil log<sub>${formatNumber(b)}</sub> ${formatNumber(a)}`, hasil);

    clearInputValues();
}

function hitungSukuAritmetika() {
    const sukuAwal = parseFloat(document.getElementById('sukuAwal')?.value);
    const beda = parseFloat(document.getElementById('beda')?.value);
    const sukuKe = parseInt(document.getElementById('sukuKe')?.value);
    const hasilDiv = document.getElementById('hasil-perhitungan');

    if (isNaN(sukuAwal) || isNaN(beda) || isNaN(sukuKe) || sukuKe < 1 || !hasilDiv) {
        if (hasilDiv) hasilDiv.innerHTML = '<p class="error">Masukkan Suku Pertama, Beda, dan n (n harus ≥ 1) dengan benar!</p>';
        return;
    }

    const an = sukuAwal + (sukuKe - 1) * beda;
    const anFormatted = formatNumber(an);

    hasilDiv.innerHTML = `
        <h4>Hasil Perhitungan:</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #0b2c66; color: white;">
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
            </tr>
            <tr style="font-weight: bold;">
                <td style="border: 1px solid #ccc; padding: 10px;">Suku ke-${sukuKe} (a<sub>${sukuKe}</sub>)</td>
                <td style="border: 1px solid #ccc; padding: 10px;">${anFormatted}</td>
            </tr>
        </table>
    `;

    clearInputValues();
}

function hitungDeretAritmetika() {
    const sukuAwal = parseFloat(document.getElementById('sukuAwal')?.value);
    const beda = parseFloat(document.getElementById('beda')?.value);
    const sukuKe = parseInt(document.getElementById('sukuKe')?.value);
    const hasilDiv = document.getElementById('hasil-perhitungan');

    if (isNaN(sukuAwal) || isNaN(beda) || isNaN(sukuKe) || sukuKe < 1 || !hasilDiv) {
        if (hasilDiv) hasilDiv.innerHTML = '<p class="error">Masukkan Suku Pertama, Beda, dan n (n harus ≥ 1) dengan benar!</p>';
        return;
    }

    const an = sukuAwal + (sukuKe - 1) * beda;

    const sn = (sukuKe / 2) * (sukuAwal + an);
    const snFormatted = formatNumber(sn);

    hasilDiv.innerHTML = `
        <h4>Hasil Perhitungan:</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #0b2c66; color: white;">
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px;">Suku ke-${sukuKe} (a<sub>${sukuKe}</sub>)</td>
                <td style="border: 1px solid #ccc; padding: 10px;">${formatNumber(an)}</td>
            </tr>
            <tr style="font-weight: bold;">
                <td style="border: 1px solid #ccc; padding: 10px; background-color: #f2f2f2;">Jumlah ${sukuKe} Suku (S<sub>${sukuKe}</sub>)</td>
                <td style="border: 1px solid #ccc; padding: 10px; background-color: #f2f2f2;">${snFormatted}</td>
            </tr>
        </table>
    `;

    clearInputValues();
}

function hitungBedaAritmetika() {
    const sukuUm = parseFloat(document.getElementById('sukuUm')?.value);
    const urutanM = parseInt(document.getElementById('urutanM')?.value);
    const sukuUn = parseFloat(document.getElementById('sukuUn')?.value);
    const urutanN = parseInt(document.getElementById('urutanN')?.value);
    const hasilDiv = document.getElementById('hasil-perhitungan');

    if (isNaN(sukuUm) || isNaN(urutanM) || isNaN(sukuUn) || isNaN(urutanN) || urutanM < 1 || urutanN < 1 || !hasilDiv) {
        if (hasilDiv) hasilDiv.innerHTML = '<p class="error">Masukkan nilai suku ke-m, urutan m, nilai suku ke-n, dan urutan n (urutan harus ≥ 1) dengan benar!</p>';
        return;
    }

    if (urutanM === urutanN) {
        hasilDiv.innerHTML = '<p class="error">Urutan suku m dan n tidak boleh sama untuk menghitung beda.</p>';
        return;
    }

    const beda = (sukuUm - sukuUn) / (urutanM - urutanN);
    const bedaFormatted = formatNumber(beda);

    const sukuAwal = sukuUm - (urutanM - 1) * beda;
    const sukuAwalFormatted = formatNumber(sukuAwal);

    hasilDiv.innerHTML = `
        <h4>Hasil Perhitungan:</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #0b2c66; color: white;">
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
            </tr>
            <tr style="font-weight: bold;">
                <td style="border: 1px solid #ccc; padding: 10px;">Beda (b)</td>
                <td style="border: 1px solid #ccc; padding: 10px;">${bedaFormatted}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px;">Suku Pertama (a)</td>
                <td style="border: 1px solid #ccc; padding: 10px;">${sukuAwalFormatted}</td>
            </tr>
        </table>
    `;

    clearInputValues();
}