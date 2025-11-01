const kalkulatorArea = document.getElementById('kalkulator-area');

function setupInputHandlers(hitungFunction) {
    const inputs = kalkulatorArea.querySelectorAll('input[type="number"]');
    const hasilDiv = document.getElementById('hasil-perhitungan');

    inputs.forEach((input, index) => {
        
        input.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); 

                if (index < inputs.length - 1) {
                    
                    inputs[index + 1].focus();
                } else {
                    
                    hitungFunction();
                }
            }
        });

        
        input.addEventListener('input', () => {
            if (hasilDiv) {
                
                hasilDiv.innerHTML = ''; 
            }
        });
    });
}


function resetInputs() {
    const inputs = kalkulatorArea.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
    });
    
    if (inputs.length > 0) {
        inputs[0].focus();
    }
}


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
    let hitungFunctionName = ''; 

    switch (pilihBangun) {
        
        case 'rasio-geometri':
            judul = 'Kalkulator Rasio (r) Geometri';
            instruksi = 'Masukkan suku pertama (a1), suku ke-n (an), dan posisi suku (n) untuk mencari rasio (r).';
            hitungFunctionName = 'hitungRasioGeometri';
            inputForm = `
                <label for="sukuAwal">Suku Pertama (a1):</label>
                <input type="number" id="sukuAwal" placeholder="Masukkan suku pertama (a1)" required>

                <label for="sukuKeN">Suku ke-n (an):</label>
                <input type="number" id="sukuKeN" placeholder="Masukkan suku ke-n (an)" required>

                <label for="sukuKe">Posisi Suku (n):</label>
                <input type="number" id="sukuKe" placeholder="Masukkan n (n > 1)" min="2" required>
            `;
            break;
            
        
        case 'barisan-geometri':
            judul = 'Kalkulator Suku ke-n (an) Geometri';
            instruksi = 'Masukkan suku pertama, rasio, dan suku yang dicari (n).';
            hitungFunctionName = 'hitungSukuGeometri';
            inputForm = `
                <label for="sukuAwal">Suku Pertama (a):</label>
                <input type="number" id="sukuAwal" placeholder="Masukkan suku pertama (U1)" required>

                <label for="rasio">Rasio (r):</label>
                <input type="number" id="rasio" placeholder="Masukkan rasio" required>

                <label for="sukuKe">Suku ke- (n):</label>
                <input type="number" id="sukuKe" placeholder="Masukkan suku ke-n (n)" min="1" required>
            `;
            break;

        
        case 'deret-geometri':
            judul = 'Kalkulator Jumlah n Suku (Sn) Geometri';
            instruksi = 'Masukkan suku pertama, rasio, dan jumlah suku (n).';
            hitungFunctionName = 'hitungDeretGeometri';
            inputForm = `
                <label for="sukuAwal">Suku Pertama (a):</label>
                <input type="number" id="sukuAwal" placeholder="Masukkan suku pertama (U1)" required>

                <label for="rasio">Rasio (r):</label>
                <input type="number" id="rasio" placeholder="Masukkan rasio" required>

                <label for="sukuKe">Jumlah Suku (n):</label>
                <input type="number" id="sukuKe" placeholder="Masukkan jumlah suku (n)" min="1" required>
            `;
            break;

        
        case 'deret-tak-hingga':
            judul = 'Kalkulator Deret Geometri Tak Hingga (S∞)';
            instruksi = 'Masukkan suku pertama dan rasio (r harus antara -1 dan 1).';
            hitungFunctionName = 'hitungDeretTakHingga';
            inputForm = `
                <label for="sukuAwal">Suku Pertama (a):</label>
                <input type="number" id="sukuAwal" placeholder="Masukkan suku pertama (U1)" required>

                <label for="rasio">Rasio (r):</label>
                <input type="number" id="rasio" placeholder="Masukkan rasio (-1 < r < 1)" required>
            `;
            break;

        default:
            kalkulatorArea.innerHTML = '';
            return;
    }

    
    htmlContent = `
        <div class="kalkulator-container">
            <h2>${judul}</h2>
            <p>${instruksi}</p>
            ${inputForm}
            <button onclick="${hitungFunctionName}()">Hitung</button>
            <div id="hasil-perhitungan" class="hasil"></div>
        </div>
    `;

    kalkulatorArea.innerHTML = htmlContent;

    
    
    setTimeout(() => {
        
        const hitungFunction = window[hitungFunctionName];
        if (hitungFunction) {
            setupInputHandlers(hitungFunction);
        }
    }, 0);
}



function generateResultTable(data) {
    let tableRows = '';
    
    data.forEach(item => {
        const formattedValue = parseFloat(item.value).toFixed(6).replace(/\.0+$/, '');
        const style = item.isResult ? 'font-weight: bold; background-color: #f2f2f2;' : '';
        tableRows += `
            <tr style="${style}">
                <td style="border: 1px solid #ccc; padding: 10px;">${item.label}</td>
                <td style="border: 1px solid #ccc; padding: 10px;">${formattedValue}</td>
            </tr>
        `;
    });

    return `
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #0b2c66; color: white;">
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
            </tr>
            ${tableRows}
        </table>
    `;
}





function getGeometriInputs(isNRequired = true, isRasioRequired = true) {
    const sukuAwal = parseFloat(document.getElementById('sukuAwal')?.value);
    const rasioInput = document.getElementById('rasio');
    const rasio = isRasioRequired ? parseFloat(rasioInput?.value) : null;
    const sukuKe = isNRequired ? parseInt(document.getElementById('sukuKe')?.value) : null;
    const hasilDiv = document.getElementById('hasil-perhitungan');

    const isValidA = !isNaN(sukuAwal);
    const isValidN = !isNRequired || (!isNaN(sukuKe) && sukuKe >= 1);
    const isValidRasio = !isRasioRequired || !isNaN(rasio);

    if (!isValidA || !isValidRasio || !isValidN || !hasilDiv) {
        
        if (hasilDiv) hasilDiv.innerHTML = '<p class="error">Masukkan semua nilai dengan benar! (n harus ≥ 1 jika diperlukan)</p>';
        return { valid: false };
    }
    
    return { a: sukuAwal, r: rasio, n: sukuKe, hasilDiv, valid: true };
}

function hitungRasioGeometri() {
    const sukuAwal = parseFloat(document.getElementById('sukuAwal')?.value);
    const sukuKeN = parseFloat(document.getElementById('sukuKeN')?.value);
    const sukuKe = parseInt(document.getElementById('sukuKe')?.value); 
    const hasilDiv = document.getElementById('hasil-perhitungan');

    if (isNaN(sukuAwal) || isNaN(sukuKeN) || isNaN(sukuKe) || sukuKe < 2 || !hasilDiv) {
        if (hasilDiv) hasilDiv.innerHTML = '<p class="error">Masukkan Suku Pertama (a1), Suku ke-n (an), dan n (n harus ≥ 2) dengan benar!</p>';
        return;
    }

    if (sukuAwal === 0) {
        hasilDiv.innerHTML = '<p class="error">Suku Pertama (a1) tidak boleh nol (0) untuk perhitungan rasio.</p>';
        return;
    }
    
    
    const rasioPangkat = sukuKeN / sukuAwal;
    const pangkat = 1 / (sukuKe - 1);
    
    let rasio;

    
    if (rasioPangkat < 0 && (sukuKe - 1) % 2 === 0) {
        hasilDiv.innerHTML = '<p class="error">Rasio tidak dapat ditentukan (hasilnya adalah bilangan imajiner).</p>';
        return;
    }

    rasio = Math.pow(rasioPangkat, pangkat);
    
    const resultData = [
        { label: `Rasio (r)`, value: rasio, isResult: true }
    ];

    hasilDiv.innerHTML = generateResultTable(resultData);
    
    
    resetInputs();
}

function hitungSukuGeometri() {
    const { a, r, n, hasilDiv, valid } = getGeometriInputs(true, true);
    if (!valid) return;

    
    const an = a * Math.pow(r, n - 1);
    
    const resultData = [
        { label: `Suku ke-${n} (a${n})`, value: an, isResult: true }
    ];

    hasilDiv.innerHTML = generateResultTable(resultData);
    
    
    resetInputs();
}

function hitungDeretGeometri() {
    const { a, r, n, hasilDiv, valid } = getGeometriInputs(true, true);
    if (!valid) return;

    let sn;
    
    if (r === 1) {
        
        sn = n * a;
    }
    
    else {
        
        sn = a * (Math.pow(r, n) - 1) / (r - 1);
    }

    
    const an = a * Math.pow(r, n - 1);
    
    const resultData = [
        { label: `Suku ke-${n} (a${n})`, value: an, isResult: false },
        { label: `Jumlah ${n} Suku (S${n})`, value: sn, isResult: true }
    ];

    hasilDiv.innerHTML = generateResultTable(resultData);
    
    
    resetInputs();
}

function hitungDeretTakHingga() {
    const { a, r, hasilDiv, valid } = getGeometriInputs(false, true);
    if (!valid) return;

    
    if (Math.abs(r) >= 1) {
        hasilDiv.innerHTML = '<p class="error">Deret Divergen (Tidak memiliki jumlah tak hingga). Rasio (r) harus memenuhi syarat: -1 < r < 1.</p>';
        return;
    }

    
    const s_tak_hingga = a / (1 - r);
    
    const resultData = [
        { label: 'Jumlah Tak Hingga (S∞)', value: s_tak_hingga, isResult: true }
    ];

    hasilDiv.innerHTML = generateResultTable(resultData);
    
    
    resetInputs();
}