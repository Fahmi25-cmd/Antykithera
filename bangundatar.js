// bangunruang.js

const PI = Math.PI;
const UNIMPLEMENTED_STATUS = 'Belum diimplementasikan sepenuhnya (hanya volume)';

function formatNumber(num) {
  if (typeof num === 'number' && isFinite(num)) {
    return num.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
  }
  return 'N/A';
}

function bisection(f, a, b, tol = 1e-6, maxIter = 100) {
  if (f(a) * f(b) >= 0) return null;
  let c = a;
  for (let i = 0; i < maxIter; i++) {
    c = (a + b) / 2;
    if (f(c) === 0 || (b - a) / 2 < tol) return c;
    if (f(c) * f(a) < 0) {
      b = c;
    } else {
      a = c;
    }
  }
  return c;
}

function getSelectedUnit(shape) {
  const unitSelector = document.getElementById(`unit-${shape}`);
  return unitSelector ? unitSelector.value : 'cm';
}

function displayResult(results, shape, satuan) {
    const hasilArea = document.getElementById('hasil-perhitungan'); 

    if (results && results.length > 0) {
        let html = '<table style="width: 100%; border-collapse: collapse;">';
        
        results.forEach(({ label, nilai, satuanDisplay }) => {
            const nilaiDisplay = (typeof nilai === 'number' && isFinite(nilai)) ? formatNumber(nilai) : nilai;

            if (nilaiDisplay === UNIMPLEMENTED_STATUS) {
                 html += `\r\n                    <tr>\r\n                        <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold;" colspan="2">${label}: ${nilaiDisplay}</td>\r\n                    </tr>`;
            } else {
                if (label.includes('Luas Permukaan') || label.includes('Luas Total') || label.includes('Luas Permukaan (Lengkung)')) {
                    satuanDisplay = `${satuanDisplay}²`;
                } else if (label.includes('Volume')) {
                    satuanDisplay = `${satuanDisplay}³`;
                }

                html += `\r\n                    <tr>\r\n                        <td style="border: 1px solid #ccc; padding: 10px;">${label}</td>\r\n                        <td style="border: 1px solid #ccc; padding: 10px;">${nilaiDisplay} ${satuanDisplay}</td>\r\n                    </tr>`;
            }
        });

        html += `</table>`;
        hasilArea.innerHTML = html;


    } else {
         hasilArea.innerHTML = '<p class="error">Tidak ada hasil yang valid. Periksa input Anda.</p>';
    }
}
const SHAPE_INPUT_MAP = {
    'persegi': {
        'luas-keliling': ['sisi-persegi'],
        'sisi': ['luas-persegi', 'keliling-persegi'] 
    },
    'persegi-panjang': {
        'luas-keliling': ['panjang-pp', 'lebar-pp'],
        'panjang': ['luas-pp', 'lebar-pp-luas', 'keliling-pp', 'lebar-pp-keliling'],
        'lebar': ['luas-pp', 'panjang-pp-luas', 'keliling-pp', 'panjang-pp-keliling']
    },
    'lingkaran': {
        'luas-keliling': ['jari-lingkaran'],
        'jari-jari': ['luas-lingkaran', 'keliling-lingkaran'],
        'diameter': ['luas-lingkaran', 'keliling-lingkaran']
    },
    'segitiga': {
        'luas-keliling-heron': ['sisi-a-segitiga', 'sisi-b-segitiga', 'sisi-c-segitiga'],
        'luas-keliling-samasisi': ['sisi-samasisi-segitiga'],
        'luas-keliling-sikusiku': ['alas-sikusiku-segitiga', 'tinggi-sikusiku-segitiga'],
        'cari-sisi-dari-luas': ['luas-segitiga', 'alas-segitiga-luas', 'tinggi-segitiga-luas'],
        'cari-sisi-samasisi-keliling': ['keliling-samasisi-segitiga'],
        'pythagoras-miring': ['sisi-a-pythagoras', 'sisi-b-pythagoras'],
        'pythagoras-siku': ['sisi-c-pythagoras', 'sisi-a-pythagoras-siku']
    },
    'jajargenjang': {
        'luas-keliling': ['alas-jajar', 'tinggi-jajar', 'sisi-miring-jajar'],
        'alas-tinggi': ['luas-jajar', 'alas-jajar-luas', 'tinggi-jajar-luas']
    },
    'trapesium': {
        'luas-keliling': ['sisi-a-trapesium', 'sisi-b-trapesium', 'tinggi-trapesium', 'sisi-c-trapesium', 'sisi-d-trapesium'],
        'tinggi': ['luas-trapesium', 'sisi-a-trapesium-luas', 'sisi-b-trapesium-luas'],
        'sisi-sejajar': ['luas-trapesium', 'tinggi-trapesium-luas', 'sisi-lain-trapesium-luas']
    },
    'belah-ketupat': {
        'luas-keliling-diagonal': ['d1-bk', 'd2-bk'],
        'luas-keliling-sisi-tinggi': ['sisi-bk', 'tinggi-bk'],
        'diagonal': ['luas-bk', 'd-lain-bk'],
        'sisi': ['keliling-bk', 'd1-bk-sisi', 'd2-bk-sisi']
    },
    'layang-layang': {
        'luas-keliling': ['d1-ll', 'd2-ll', 'sisi-a-ll', 'sisi-b-ll'],
        'diagonal': ['luas-ll', 'd-lain-ll']
    },
    'segi-n': {
        'luas-keliling': ['n-sisi-segin', 'sisi-segin'],
        'sisi': ['n-sisi-segin', 'luas-segin', 'keliling-segin']
    },
    'segi-n-tak-beraturan': { 'shoelace': ['koordinat-points-segi-n'] },
    'koordinat': { 'shoelace': ['koordinat-points'] }
};

const LAST_INPUT_OF_FIRST_GROUP = [
    'luas-persegi',
    'lebar-pp-luas',
    'panjang-pp-luas',
    'luas-lingkaran',
    'alas-segitiga-luas',
    'keliling-bk',
    'luas-segin'
];


function setupEnterListener(shape) {
    const modeSelector = document.getElementById(`pilihan-hitung-${shape}`);
    const mode = modeSelector ? modeSelector.value : 'luas-keliling';
    const inputArea = document.getElementById(`input-area-${shape}`);
    if (!inputArea) return;

    const existingInputs = inputArea.querySelectorAll('input, textarea');
    existingInputs.forEach(el => {
        el.onkeydown = null;
        el.oninput = null;
    });

    const inputIds = SHAPE_INPUT_MAP[shape] ? (SHAPE_INPUT_MAP[shape][mode] || []) : [];
    const inputs = inputIds
        .map(id => document.getElementById(id))
        .filter(el => el !== null);
    
    if (inputs.length === 0 && inputArea.querySelectorAll('input, textarea').length > 0) {
        Array.from(inputArea.querySelectorAll('input, textarea')).forEach(input => {
             if (input.tagName.toLowerCase() !== 'select') inputs.push(input);
        });
    }
    
    function clearResultOnInput(currentShape) {
        const resultEl = document.getElementById(`hasil-${currentShape}`);
        if (resultEl) resultEl.innerHTML = '';
    }

    function focusNextInput(currentInput) {
        const currentIndex = inputs.indexOf(currentInput);
        if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        }
    }

    function insertNewline(event, textarea) {
        event.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        textarea.value = value.substring(0, start) + '\n' + value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
    }

    inputs.forEach((input) => {
        input.onkeydown = function(event) {
            if (event.key === 'Enter' || event.keyCode === 13) {
                
                if (input.tagName.toLowerCase() === 'textarea') {
                    if (event.ctrlKey) {
                        insertNewline(event, input);
                        return; 
                    } else {
                        event.preventDefault(); 
                        hitung(shape);
                    }
                } else {
                    event.preventDefault(); 

                    const currentIndex = inputs.indexOf(input);
                    
                    const isLastOfFirstGroup = LAST_INPUT_OF_FIRST_GROUP.includes(input.id);
                    
                    const isLastInputOverall = (currentIndex === inputs.length - 1);

                    if (isLastOfFirstGroup || isLastInputOverall) {
                        hitung(shape);
                    } else {
                        focusNextInput(input);
                    }
                }
            } else if (event.key === 'Tab') {
                return;
            }
        };

        const originalHandler = input.onkeydown;
        input.onkeydown = function(event) {
            if (event.ctrlKey && (event.key === 'Enter' || event.keyCode === 13)) {
                if (input.tagName.toLowerCase() === 'textarea') {
                    insertNewline(event, input);
                } else {
                    event.preventDefault();
                    hitung(shape);
                }
                return;
            }
            if (originalHandler) {
                originalHandler.call(this, event);
            }
        };
        
        input.oninput = function() {
            clearResultOnInput(shape);
        };
    });

    if (inputs.length > 0) {
        inputs[0].focus();
    }
}


function tampilkanKalkulator() {
    const pilihan = document.getElementById('pilih-bangun').value;
    const areaKalkulator = document.getElementById('kalkulator-area');
    areaKalkulator.innerHTML = ''; 
    let html = '';

    if (!pilihan) return;

    switch (pilihan) {
        case 'persegi':
            html = `<h3>Kalkulator Persegi</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-persegi">Hitung apa?</label>
                        <select id="pilihan-hitung-persegi" onchange="updateInput('persegi')">
                            <option value="luas-keliling">Luas & Keliling</option>
                            <option value="sisi">Sisi (s)</option>
                        </select>
                    </div>
                    <div id="input-area-persegi"></div>
                    <button type="button" onclick="hitung('persegi')">Hitung</button>
                    <div id="hasil-persegi" class="hasil"></div>`;
            break;
        case 'persegi-panjang':
            html = `<h3>Kalkulator Persegi Panjang</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-persegi-panjang">Hitung apa?</label>
                        <select id="pilihan-hitung-persegi-panjang" onchange="updateInput('persegi-panjang')">
                            <option value="luas-keliling">Luas & Keliling</option>
                            <option value="panjang">Panjang (p)</option>
                            <option value="lebar">Lebar (l)</option>
                        </select>
                    </div>
                    <div id="input-area-persegi-panjang"></div>
                    <button type="button" onclick="hitung('persegi-panjang')">Hitung</button>
                    <div id="hasil-persegi-panjang" class="hasil"></div>`;
            break;
        case 'lingkaran':
            html = `<h3>Kalkulator Lingkaran</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-lingkaran">Hitung apa?</label>
                        <select id="pilihan-hitung-lingkaran" onchange="updateInput('lingkaran')">
                            <option value="luas-keliling">Luas & Keliling</option>
                            <option value="jari-jari">Jari-jari (r)</option>
                            <option value="diameter">Diameter (d)</option>
                        </select>
                    </div>
                    <div id="input-area-lingkaran"></div>
                    <button type="button" onclick="hitung('lingkaran')">Hitung</button>
                    <div id="hasil-lingkaran" class="hasil"></div>`;
            break;
        case 'segitiga':
            html = `<h3>Kalkulator Segitiga</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-segitiga">Hitung apa?</label>
                        <select id="pilihan-hitung-segitiga" onchange="updateInput('segitiga')">
                            <option value="luas-keliling-heron">Luas & Keliling (dari 3 Sisi / Heron)</option>
                            <option value="luas-keliling-samasisi">Luas & Keliling (Sama Sisi)</option>
                            <option value="luas-keliling-sikusiku">Luas & Keliling (Siku-Siku)</option>
                            <option value="cari-sisi-dari-luas">Cari Alas/Tinggi (dari Luas)</option>
                            <option value="cari-sisi-samasisi-keliling">Cari Sisi (dari Keliling Sama Sisi)</option>
                            <option value="pythagoras-miring">Pythagoras (Cari Sisi Miring 'c')</option>
                            <option value="pythagoras-siku">Pythagoras (Cari Sisi Siku-siku 'a' atau 'b')</option>
                        </select>
                    </div>
                    <div id="input-area-segitiga"></div>
                    <button type="button" onclick="hitung('segitiga')">Hitung</button>
                    <div id="hasil-segitiga" class="hasil"></div>`;
            break;
        case 'jajargenjang':
            html = `<h3>Kalkulator Jajargenjang</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-jajargenjang">Hitung apa?</label>
                        <select id="pilihan-hitung-jajargenjang" onchange="updateInput('jajargenjang')">
                            <option value="luas-keliling">Luas & Keliling</option>
                            <option value="alas-tinggi">Alas atau Tinggi (dari Luas)</option>
                        </select>
                    </div>
                    <div id="input-area-jajargenjang"></div>
                    <button type="button" onclick="hitung('jajargenjang')">Hitung</button>
                    <div id="hasil-jajargenjang" class="hasil"></div>`;
            break;
        case 'trapesium':
             html = `<h3>Kalkulator Trapesium</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-trapesium">Hitung apa?</label>
                        <select id="pilihan-hitung-trapesium" onchange="updateInput('trapesium')">
                            <option value="luas-keliling">Luas & Keliling</option>
                            <option value="tinggi">Tinggi (h) (dari Luas)</option>
                            <option value="sisi-sejajar">Sisi Sejajar (a atau b) (dari Luas)</option>
                        </select>
                    </div>
                    <div id="input-area-trapesium"></div>
                    <button type="button" onclick="hitung('trapesium')">Hitung</button>
                    <div id="hasil-trapesium" class="hasil"></div>`;
            break;
        case 'belah-ketupat':
            html = `<h3>Kalkulator Belah Ketupat</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-belah-ketupat">Hitung apa?</label>
                        <select id="pilihan-hitung-belah-ketupat" onchange="updateInput('belah-ketupat')">
                            <option value="luas-keliling-diagonal">Luas & Keliling (dari Diagonal)</option>
                            <option value="luas-keliling-sisi-tinggi">Luas & Keliling (dari Sisi & Tinggi)</option>
                            <option value="diagonal">Diagonal (d1 atau d2) (dari Luas)</option>
                            <option value="sisi">Sisi (s) (dari Keliling / Diagonal)</option>
                        </select>
                    </div>
                    <div id="input-area-belah-ketupat"></div>
                    <button type="button" onclick="hitung('belah-ketupat')">Hitung</button>
                    <div id="hasil-belah-ketupat" class="hasil"></div>`;
            break;
        case 'layang-layang':
            html = `<h3>Kalkulator Layang-Layang</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-layang-layang">Hitung apa?</label>
                        <select id="pilihan-hitung-layang-layang" onchange="updateInput('layang-layang')">
                            <option value="luas-keliling">Luas & Keliling</option>
                            <option value="diagonal">Diagonal (d1 atau d2) (dari Luas)</option>
                        </select>
                    </div>
                    <div id="input-area-layang-layang"></div>
                    <button type="button" onclick="hitung('layang-layang')">Hitung</button>
                    <div id="hasil-layang-layang" class="hasil"></div>`;
            break;
        case 'segi-n':
            html = `<h3>Kalkulator Segi-n Beraturan</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-segi-n">Hitung apa?</label>
                        <select id="pilihan-hitung-segi-n" onchange="updateInput('segi-n')">
                            <option value="luas-keliling">Luas & Keliling (dari Sisi)</option>
                            <option value="sisi">Sisi (s) (dari Luas / Keliling)</option>
                        </select>
                    </div>
                    <div id="input-area-segi-n"></div>
                    <button type="button" onclick="hitung('segi-n')">Hitung</button>
                    <div id="hasil-segi-n" class="hasil"></div>`;
            break;
        case 'segi-n-tak-beraturan': 
            html = `<h3>Kalkulator Segi-n Tak Beraturan (Koordinat)</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-segi-n-tak-beraturan">Hitung apa?</label>
                        <select id="pilihan-hitung-segi-n-tak-beraturan" onchange="updateInput('segi-n-tak-beraturan')">
                            <option value="shoelace">Luas & Keliling (Metode Shoelace)</option>
                        </select>
                    </div>
                    <div id="input-area-segi-n-tak-beraturan"></div>
                    <button type="button" onclick="hitung('segi-n-tak-beraturan')">Hitung</button>
                    <div id="hasil-segi-n-tak-beraturan" class="hasil"></div>`;
            break;
        case 'koordinat':
            html = `<h3>Kalkulator Bangun Tak Beraturan (Koordinat)</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-koordinat">Hitung apa?</label>
                        <select id="pilihan-hitung-koordinat" onchange="updateInput('koordinat')">
                            <option value="shoelace">Luas & Keliling (Metode Shoelace)</option>
                        </select>
                    </div>
                    <div id="input-area-koordinat"></div>
                    <button type="button" onclick="hitung('koordinat')">Hitung</button>
                    <div id="hasil-koordinat" class="hasil"></div>`;
            break;
        default:
            html = ''; 
            break;
    }
    areaKalkulator.innerHTML = html;
    
    if (pilihan) {
        updateInput(pilihan);
    }
}

function updateInput(shape) {
    const modeSelector = document.getElementById(`pilihan-hitung-${shape}`);
    const mode = modeSelector ? modeSelector.value : 'luas-keliling';
    const inputArea = document.getElementById(`input-area-${shape}`);
    
    const hasilArea = document.getElementById(`hasil-${shape}`);
    if (hasilArea) {
        hasilArea.innerHTML = '';
    }
    
    let inputHtml = '';

    const unitOptions = `
        <div class="input-group">
            <label for="unit-${shape}">Satuan:</label>
            <select id="unit-${shape}">
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="mm">mm</option>
            </select>
        </div>`;
        
    const noUnitOptions = `<input type="hidden" id="unit-${shape}" value="">`;

    switch (shape) {
        case 'persegi':
            if (mode === 'luas-keliling') {
                inputHtml = `<div class="input-group"><label for="sisi-persegi">Sisi (s):</label><input type="number" id="sisi-persegi" min="0" step="any"></div>`;
            } else if (mode === 'sisi') {
                inputHtml = `<div class="input-group"><label for="luas-persegi">Luas (L):</label><input type="number" id="luas-persegi" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="keliling-persegi">Keliling (K):</label><input type="number" id="keliling-persegi" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'persegi-panjang':
            if (mode === 'luas-keliling') {
                inputHtml = `<div class="input-group"><label for="panjang-pp">Panjang (p):</label><input type="number" id="panjang-pp" min="0" step="any"></div>
                             <div class="input-group"><label for="lebar-pp">Lebar (l):</label><input type="number" id="lebar-pp" min="0" step="any"></div>`;
            } else if (mode === 'panjang') {
                inputHtml = `<div class="input-group"><label for="luas-pp">Luas (L):</label><input type="number" id="luas-pp" min="0" step="any"></div>
                             <div class="input-group"><label for="lebar-pp-luas">Lebar (l):</label><input type="number" id="lebar-pp-luas" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="keliling-pp">Keliling (K):</label><input type="number" id="keliling-pp" min="0" step="any"></div>
                             <div class="input-group"><label for="lebar-pp-keliling">Lebar (l):</label><input type="number" id="lebar-pp-keliling" min="0" step="any"></div>`;
            } else if (mode === 'lebar') {
                inputHtml = `<div class="input-group"><label for="luas-pp">Luas (L):</label><input type="number" id="luas-pp" min="0" step="any"></div>
                             <div class="input-group"><label for="panjang-pp-luas">Panjang (p):</label><input type="number" id="panjang-pp-luas" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="keliling-pp">Keliling (K):</label><input type="number" id="keliling-pp" min="0" step="any"></div>
                             <div class="input-group"><label for="panjang-pp-keliling">Panjang (p):</label><input type="number" id="panjang-pp-keliling" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'lingkaran':
            if (mode === 'luas-keliling') {
                inputHtml = `<div class="input-group"><label for="jari-lingkaran">Jari-jari (r):</label><input type="number" id="jari-lingkaran" min="0" step="any"></div>`;
            } else if (mode === 'jari-jari') {
                inputHtml = `<div class="input-group"><label for="luas-lingkaran">Luas (L):</label><input type="number" id="luas-lingkaran" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="keliling-lingkaran">Keliling (K):</label><input type="number" id="keliling-lingkaran" min="0" step="any"></div>`;
            } else if (mode === 'diameter') {
                inputHtml = `<div class="input-group"><label for="luas-lingkaran">Luas (L):</label><input type="number" id="luas-lingkaran" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="keliling-lingkaran">Keliling (K):</label><input type="number" id="keliling-lingkaran" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'segitiga':
            if (mode === 'luas-keliling-heron') {
                inputHtml = `<div class="input-group"><label for="sisi-a-segitiga">Sisi a:</label><input type="number" id="sisi-a-segitiga" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-b-segitiga">Sisi b:</label><input type="number" id="sisi-b-segitiga" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-c-segitiga">Sisi c:</label><input type="number" id="sisi-c-segitiga" min="0" step="any"></div>`;
            } else if (mode === 'luas-keliling-samasisi') {
                inputHtml = `<div class="input-group"><label for="sisi-samasisi-segitiga">Sisi (s):</label><input type="number" id="sisi-samasisi-segitiga" min="0" step="any"></div>`;
            } else if (mode === 'luas-keliling-sikusiku') {
                inputHtml = `<div class="input-group"><label for="alas-sikusiku-segitiga">Alas (a):</label><input type="number" id="alas-sikusiku-segitiga" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-sikusiku-segitiga">Tinggi (b):</label><input type="number" id="tinggi-sikusiku-segitiga" min="0" step="any"></div>`;
            } else if (mode === 'cari-sisi-dari-luas') {
                 inputHtml = `<div class="input-group"><label for="luas-segitiga">Luas (L):</label><input type="number" id="luas-segitiga" min="0" step="any"></div>
                              <p>Cari Tinggi (h) dari:</p>
                              <div class="input-group"><label for="alas-segitiga-luas">Alas (a):</label><input type="number" id="alas-segitiga-luas" min="0" step="any"></div>
                              <p>Atau Cari Alas (a) dari:</p>
                              <div class="input-group"><label for="tinggi-segitiga-luas">Tinggi (h):</label><input type="number" id="tinggi-segitiga-luas" min="0" step="any"></div>`;
            } else if (mode === 'cari-sisi-samasisi-keliling') {
                inputHtml = `<div class="input-group"><label for="keliling-samasisi-segitiga">Keliling (K):</label><input type="number" id="keliling-samasisi-segitiga" min="0" step="any"></div>`;
            } else if (mode === 'pythagoras-miring') {
                inputHtml = `<div class="input-group"><label for="sisi-a-pythagoras">Sisi Siku-siku (a):</label><input type="number" id="sisi-a-pythagoras" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-b-pythagoras">Sisi Siku-siku (b):</label><input type="number" id="sisi-b-pythagoras" min="0" step="any"></div>`;
            } else if (mode === 'pythagoras-siku') {
                inputHtml = `<div class="input-group"><label for="sisi-c-pythagoras">Sisi Miring (c):</label><input type="number" id="sisi-c-pythagoras" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-a-pythagoras-siku">Sisi Siku-siku (a atau b):</label><input type="number" id="sisi-a-pythagoras-siku" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'jajargenjang':
            if (mode === 'luas-keliling') {
                inputHtml = `<div class="input-group"><label for="alas-jajar">Alas (a):</label><input type="number" id="alas-jajar" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-jajar">Tinggi (h):</label><input type="number" id="tinggi-jajar" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-miring-jajar">Sisi Miring (b):</label><input type="number" id="sisi-miring-jajar" min="0" step="any"></div>`;
            } else if (mode === 'alas-tinggi') {
                inputHtml = `<div class="input-group"><label for="luas-jajar">Luas (L):</label><input type="number" id="luas-jajar" min="0" step="any"></div>
                             <p>Cari Tinggi (h) dari:</p>
                             <div class="input-group"><label for="alas-jajar-luas">Alas (a):</label><input type="number" id="alas-jajar-luas" min="0" step="any"></div>
                             <p>Atau Cari Alas (a) dari:</p>
                             <div class="input-group"><label for="tinggi-jajar-luas">Tinggi (h):</label><input type="number" id="tinggi-jajar-luas" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'trapesium':
             if (mode === 'luas-keliling') {
                inputHtml = `<div class="input-group"><label for="sisi-a-trapesium">Sisi Sejajar (a):</label><input type="number" id="sisi-a-trapesium" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-b-trapesium">Sisi Sejajar (b):</label><input type="number" id="sisi-b-trapesium" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-trapesium">Tinggi (h):</label><input type="number" id="tinggi-trapesium" min="0" step="any"></div>
                             <p>(Untuk Keliling)</p>
                             <div class="input-group"><label for="sisi-c-trapesium">Sisi Miring (c):</label><input type="number" id="sisi-c-trapesium" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-d-trapesium">Sisi Miring (d):</label><input type="number" id="sisi-d-trapesium" min="0" step="any"></div>`;
            } else if (mode === 'tinggi') {
                inputHtml = `<div class="input-group"><label for="luas-trapesium">Luas (L):</label><input type="number" id="luas-trapesium" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-a-trapesium-luas">Sisi Sejajar (a):</label><input type="number" id="sisi-a-trapesium-luas" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-b-trapesium-luas">Sisi Sejajar (b):</label><input type="number" id="sisi-b-trapesium-luas" min="0" step="any"></div>`;
            } else if (mode === 'sisi-sejajar') {
                inputHtml = `<div class="input-group"><label for="luas-trapesium">Luas (L):</label><input type="number" id="luas-trapesium" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-trapesium-luas">Tinggi (h):</label><input type="number" id="tinggi-trapesium-luas" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-lain-trapesium-luas">Sisi Sejajar Lain (a atau b):</label><input type="number" id="sisi-lain-trapesium-luas" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'belah-ketupat':
            if (mode === 'luas-keliling-diagonal') {
                inputHtml = `<div class="input-group"><label for="d1-bk">Diagonal 1 (d1):</label><input type="number" id="d1-bk" min="0" step="any"></div>
                             <div class="input-group"><label for="d2-bk">Diagonal 2 (d2):</label><input type="number" id="d2-bk" min="0" step="any"></div>`;
            } else if (mode === 'luas-keliling-sisi-tinggi') {
                 inputHtml = `<div class="input-group"><label for="sisi-bk">Sisi (s):</label><input type="number" id="sisi-bk" min="0" step="any"></div>
                              <div class="input-group"><label for="tinggi-bk">Tinggi (h):</label><input type="number" id="tinggi-bk" min="0" step="any"></div>`;
            } else if (mode === 'diagonal') {
                inputHtml = `<div class="input-group"><label for="luas-bk">Luas (L):</label><input type="number" id="luas-bk" min="0" step="any"></div>
                             <div class="input-group"><label for="d-lain-bk">Diagonal Lain (d1 atau d2):</label><input type="number" id="d-lain-bk" min="0" step="any"></div>`;
            } else if (mode === 'sisi') {
                inputHtml = `<div class="input-group"><label for="keliling-bk">Keliling (K):</label><input type="number" id="keliling-bk" min="0" step="any"></div>
                             <p>Atau (dari Diagonal)</p>
                             <div class="input-group"><label for="d1-bk-sisi">Diagonal 1 (d1):</label><input type="number" id="d1-bk-sisi" min="0" step="any"></div>
                             <div class="input-group"><label for="d2-bk-sisi">Diagonal 2 (d2):</label><input type="number" id="d2-bk-sisi" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'layang-layang':
            if (mode === 'luas-keliling') {
                inputHtml = `<div class="input-group"><label for="d1-ll">Diagonal 1 (d1):</label><input type="number" id="d1-ll" min="0" step="any"></div>
                             <div class="input-group"><label for="d2-ll">Diagonal 2 (d2):</label><input type="number" id="d2-ll" min="0" step="any"></div>
                             <p>(Untuk Keliling)</p>
                             <div class="input-group"><label for="sisi-a-ll">Sisi a (pasang pendek):</label><input type="number" id="sisi-a-ll" min="0" step="any"></div>
                             <div class="input-group"><label for="sisi-b-ll">Sisi b (pasang panjang):</label><input type="number" id="sisi-b-ll" min="0" step="any"></div>`;
            } else if (mode === 'diagonal') {
                inputHtml = `<div class="input-group"><label for="luas-ll">Luas (L):</label><input type="number" id="luas-ll" min="0" step="any"></div>
                             <div class="input-group"><label for="d-lain-ll">Diagonal Lain (d1 atau d2):</label><input type="number" id="d-lain-ll" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'segi-n':
            inputHtml = `<div class="input-group"><label for="n-sisi-segin">Jumlah Sisi (n):</label><input type="number" id="n-sisi-segin" min="3" step="1"></div>`;
            if (mode === 'luas-keliling') {
                inputHtml += `<div class="input-group"><label for="sisi-segin">Panjang Sisi (s):</label><input type="number" id="sisi-segin" min="0" step="any"></div>`;
            } else if (mode === 'sisi') {
                inputHtml += `<div class="input-group"><label for="luas-segin">Luas (L):</label><input type="number" id="luas-segin" min="0" step="any"></div>
                              <p>Atau</p>
                              <div class="input-group"><label for="keliling-segin">Keliling (K):</label><input type="number" id="keliling-segin" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'segi-n-tak-beraturan':
            if (mode === 'shoelace') {
                inputHtml = `<div class="input-group">
                                <label for="koordinat-points-segi-n">Titik Koordinat (x,y) (satu per baris):</label>
                                <textarea id="koordinat-points-segi-n" rows="6" placeholder="Contoh:\n0,0\n5,0\n5,5\n0,5"></textarea>
                                <p style="font-size: 0.9em; color: #777;">Masukkan setidaknya 3 titik koordinat (format: x,y, satu per baris). Titik akhir akan otomatis terhubung ke titik awal untuk membentuk poligon. Gunakan tombol <strong>Enter</strong> untuk memproses perhitungan (hitung luas & keliling), atau <strong>Ctrl + Enter</strong> untuk menambahkan baris baru tanpa memproses.</p>
                             </div>`;
            }
            inputHtml += noUnitOptions; 
            break;
        case 'koordinat':
            if (mode === 'shoelace') {
                inputHtml = `<div class="input-group">
                                <label for="koordinat-points">Titik Koordinat (x,y) (satu per baris):</label>
                                <textarea id="koordinat-points" rows="6" placeholder="Contoh:\n0,0\n5,0\n5,5\n0,5"></textarea>
                                <p style="font-size: 0.9em; color: #777;">Masukkan setidaknya 3 titik koordinat (format: x,y, satu per baris). Titik akhir akan otomatis terhubung ke titik awal untuk membentuk poligon. Gunakan tombol <strong>Enter</strong> untuk memproses perhitungan (hitung luas & keliling), atau <strong>Ctrl + Enter</strong> untuk menambahkan baris baru tanpa memproses.</p>
                             </div>`;
            }
            inputHtml += noUnitOptions; 
            break;
    }

    inputArea.innerHTML = inputHtml;

    setupEnterListener(shape);
}

function calculatePolygonAreaAndPerimeter(text) {
    if (!text) throw new Error("Masukkan titik koordinat.");
    
    const lines = text.trim().split('\n').filter(line => line.trim() !== '');
    if (lines.length < 3) throw new Error("Masukkan minimal 3 titik koordinat.");
    
    const points = [];
    for (const line of lines) {
        const parts = line.split(',').map(p => p.trim());
        if (parts.length !== 2) throw new Error(`Format baris tidak valid: "${line}". Gunakan 'x,y'`);
        const x = parseFloat(parts[0]);
        const y = parseFloat(parts[1]);
        if (isNaN(x) || isNaN(y)) throw new Error(`Koordinat tidak valid: "${line}"`);
        points.push({ x, y });
    }
    
    points.push(points[0]);
    
    let L = 0;
    let K = 0;
    
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i+1];
        
        L += (p1.x * p2.y - p2.x * p1.y);
        
        K += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    
    L = 0.5 * Math.abs(L);
    
    return { L, K };
}


function hitung(shape) {
    const modeSelector = document.getElementById(`pilihan-hitung-${shape}`);
    const mode = modeSelector ? modeSelector.value : 'luas-keliling';
    const unit = getSelectedUnit(shape);
    const hasilArea = document.getElementById(`hasil-${shape}`);
    hasilArea.innerHTML = '';
    let results = [];
    let error = null;

    const getInput = (id, label) => {
        const element = document.getElementById(id);
        if (!element) return null;
        const value = parseFloat(element.value);
        
        if (element.value !== '' && (isNaN(value) || value < 0)) {
            error = `Input '${label}' harus berupa angka positif.`;
            if (!isNaN(value)) return value;
            return NaN;
        }
        
        if (element.value === '') {
            return null;
        }
        
        return value;
    };
    
    const getTextInput = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : null;
    };


    try {
        switch (shape) {
            case 'persegi':
                if (mode === 'luas-keliling') {
                    const s = getInput('sisi-persegi', 'Sisi (s)');
                    if (s === null) throw new Error("Sisi (s) harus diisi.");
                    const L = Math.pow(s, 2);
                    const K = 4 * s;
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                } else if (mode === 'sisi') {
                    const L_val = getInput('luas-persegi', 'Luas (L)');
                    const K_val = getInput('keliling-persegi', 'Keliling (K)');
                    let s;
                    let source = '';

                    if (L_val !== null && !isNaN(L_val)) {
                        s = Math.sqrt(L_val);
                        source = 'dari Luas';
                    } else if (K_val !== null && !isNaN(K_val)) {
                        s = K_val / 4;
                        source = 'dari Keliling';
                    } else {
                        throw new Error("Masukkan salah satu nilai: Luas atau Keliling.");
                    }
                    results.push({ label: `Sisi (s) ${source}`, value: formatNumber(s), unit: unit });
                }
                break;
            case 'persegi-panjang':
                if (mode === 'luas-keliling') {
                    const p = getInput('panjang-pp', 'Panjang (p)');
                    const l = getInput('lebar-pp', 'Lebar (l)');
                    if (p === null || l === null) throw new Error("Panjang dan Lebar harus diisi.");
                    const L = p * l;
                    const K = 2 * (p + l);
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                } else if (mode === 'panjang') {
                    const L_val = getInput('luas-pp', 'Luas (L)');
                    const l_luas = getInput('lebar-pp-luas', 'Lebar (l) dari Luas');
                    const K_val = getInput('keliling-pp', 'Keliling (K)');
                    const l_keliling = getInput('lebar-pp-keliling', 'Lebar (l) dari Keliling');
                    
                    let p;
                    let source = '';

                    if (L_val !== null && l_luas !== null) {
                        if ((K_val !== null && l_keliling !== null) && L_val !== null && l_luas !== null) {
                            throw new Error("Hanya boleh mengisi Luas & Lebar, ATAU Keliling & Lebar, jangan keduanya.");
                        }
                        if (l_luas === 0) throw new Error("Lebar tidak boleh nol untuk mencari Panjang dari Luas.");
                        p = L_val / l_luas;
                        source = 'dari Luas';
                    } else if (K_val !== null && l_keliling !== null) {
                        p = (K_val / 2) - l_keliling;
                        if (p <= 0) throw new Error("Hasil Panjang negatif atau nol. Keliling harus lebih besar dari 2x Lebar.");
                        source = 'dari Keliling';
                    } else {
                        throw new Error("Masukkan Luas dan Lebar, ATAU Keliling dan Lebar.");
                    }
                    results.push({ label: `Panjang (p) ${source}`, value: formatNumber(p), unit: unit });
                } else if (mode === 'lebar') {
                     const L_val = getInput('luas-pp', 'Luas (L)');
                     const p_luas = getInput('panjang-pp-luas', 'Panjang (p) dari Luas');
                     const K_val = getInput('keliling-pp', 'Keliling (K)');
                     const p_keliling = getInput('panjang-pp-keliling', 'Panjang (p) dari Keliling');
                     
                     let l;
                     let source = '';

                     if (L_val !== null && p_luas !== null) {
                        if ((K_val !== null && p_keliling !== null) && L_val !== null && p_luas !== null) {
                            throw new Error("Hanya boleh mengisi Luas & Panjang, ATAU Keliling & Panjang, jangan keduanya.");
                        }
                         if (p_luas === 0) throw new Error("Panjang tidak boleh nol untuk mencari Lebar dari Luas.");
                         l = L_val / p_luas;
                         source = 'dari Luas';
                     } else if (K_val !== null && p_keliling !== null) {
                         l = (K_val / 2) - p_keliling;
                         if (l <= 0) throw new Error("Hasil Lebar negatif atau nol. Keliling harus lebih besar dari 2x Panjang.");
                         source = 'dari Keliling';
                     } else {
                         throw new Error("Masukkan Luas dan Panjang, ATAU Keliling dan Panjang.");
                     }
                     results.push({ label: `Lebar (l) ${source}`, value: formatNumber(l), unit: unit });
                }
                break;
            case 'lingkaran':
                if (mode === 'luas-keliling') {
                    const r = getInput('jari-lingkaran', 'Jari-jari (r)');
                    if (r === null) throw new Error("Jari-jari (r) harus diisi.");
                    const L = Math.PI * Math.pow(r, 2); 
                    const K = 2 * Math.PI * r; 
                    const d = 2 * r;
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                    results.push({ label: 'Diameter (d)', value: formatNumber(d), unit: unit });
                } else if (mode === 'jari-jari') {
                    const L_val = getInput('luas-lingkaran', 'Luas (L)');
                    const K_val = getInput('keliling-lingkaran', 'Keliling (K)');
                    let r;
                    let source = '';

                    if (L_val !== null) {
                        r = Math.sqrt(L_val / Math.PI); 
                        source = 'dari Luas';
                    } else if (K_val !== null) {
                        r = K_val / (2 * Math.PI); 
                        source = 'dari Keliling';
                    } else {
                        throw new Error("Masukkan Luas atau Keliling.");
                    }
                    results.push({ label: `Jari-jari (r) ${source}`, value: formatNumber(r), unit: unit });
                } else if (mode === 'diameter') {
                    const L_val = getInput('luas-lingkaran', 'Luas (L)');
                    const K_val = getInput('keliling-lingkaran', 'Keliling (K)');
                    let d;
                    let source = '';
                    
                    if (L_val !== null) {
                        d = Math.sqrt(4 * L_val / Math.PI); 
                        source = 'dari Luas';
                    } else if (K_val !== null) {
                        d = K_val / Math.PI; 
                        source = 'dari Keliling';
                    } else {
                        throw new Error("Masukkan Luas atau Keliling.");
                    }
                    results.push({ label: `Diameter (d) ${source}`, value: formatNumber(d), unit: unit });
                }
                break;
            case 'segitiga':
                if (mode === 'luas-keliling-heron') {
                    const a = getInput('sisi-a-segitiga', 'Sisi a');
                    const b = getInput('sisi-b-segitiga', 'Sisi b');
                    const c = getInput('sisi-c-segitiga', 'Sisi c');
                    if (a === null || b === null || c === null) throw new Error("Sisi a, b, dan c harus diisi.");
                    
                    if (a + b <= c || a + c <= b || b + c <= a) {
                        throw new Error("Sisi tidak valid. Pastikan a + b > c, a + c > b, dan b + c > a.");
                    }

                    const K = a + b + c;
                    const p = K / 2;
                    const L = Math.sqrt(p * (p - a) * (p - b) * (p - c));
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                } else if (mode === 'luas-keliling-samasisi') {
                    const s = getInput('sisi-samasisi-segitiga', 'Sisi (s)');
                    if (s === null) throw new Error("Sisi (s) harus diisi.");
                    const K = 3 * s;
                    const L = (Math.sqrt(3) / 4) * Math.pow(s, 2);
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                } else if (mode === 'luas-keliling-sikusiku') {
                    const a = getInput('alas-sikusiku-segitiga', 'Alas (a)');
                    const b = getInput('tinggi-sikusiku-segitiga', 'Tinggi (b)');
                    if (a === null || b === null) throw new Error("Alas (a) dan Tinggi (b) harus diisi.");
                    
                    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
                    const L = 0.5 * a * b;
                    const K = a + b + c;
                    
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                    results.push({ label: 'Sisi Miring (c)', value: formatNumber(c), unit: unit });
                } else if (mode === 'cari-sisi-dari-luas') {
                    const L_val = getInput('luas-segitiga', 'Luas (L)');
                    const a_val = getInput('alas-segitiga-luas', 'Alas (a)');
                    const h_val = getInput('tinggi-segitiga-luas', 'Tinggi (h)');

                    if (L_val === null) throw new Error("Luas (L) harus diisi.");
                    
                    if (a_val !== null) {
                        if (a_val === 0) throw new Error("Alas tidak boleh nol.");
                        const h = (2 * L_val) / a_val;
                        results.push({ label: 'Tinggi (h) dari Luas', value: formatNumber(h), unit: unit });
                    } else if (h_val !== null) {
                         if (h_val === 0) throw new Error("Tinggi tidak boleh nol.");
                        const a = (2 * L_val) / h_val;
                        results.push({ label: 'Alas (a) dari Luas', value: formatNumber(a), unit: unit });
                    } else {
                        throw new Error("Masukkan Luas dan Alas, ATAU Luas dan Tinggi.");
                    }
                } else if (mode === 'cari-sisi-samasisi-keliling') {
                    const K_val = getInput('keliling-samasisi-segitiga', 'Keliling (K)');
                    if (K_val === null) throw new Error("Keliling (K) harus diisi.");
                    const s = K_val / 3;
                    results.push({ label: 'Sisi (s) dari Keliling', value: formatNumber(s), unit: unit });
                } else if (mode === 'pythagoras-miring') {
                    const a = getInput('sisi-a-pythagoras', 'Sisi Siku-siku (a)');
                    const b = getInput('sisi-b-pythagoras', 'Sisi Siku-siku (b)');
                    if (a === null || b === null) throw new Error("Sisi a dan Sisi b harus diisi.");
                    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
                    results.push({ label: 'Sisi Miring (c)', value: formatNumber(c), unit: unit });
                } else if (mode === 'pythagoras-siku') {
                    const c = getInput('sisi-c-pythagoras', 'Sisi Miring (c)');
                    const a = getInput('sisi-a-pythagoras-siku', 'Sisi Siku-siku (a atau b)');
                    if (c === null || a === null) throw new Error("Sisi miring (c) dan Sisi siku-siku (a atau b) harus diisi.");
                    
                    if (c <= a) {
                        throw new Error("Sisi miring (c) harus lebih besar dari sisi siku-siku (a atau b).");
                    }
                    
                    const b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
                    results.push({ label: 'Sisi Siku-siku lainnya', value: formatNumber(b), unit: unit });
                }
                break;
            case 'jajargenjang':
                if (mode === 'luas-keliling') {
                    const a = getInput('alas-jajar', 'Alas (a)');
                    const h = getInput('tinggi-jajar', 'Tinggi (h)');
                    const b = getInput('sisi-miring-jajar', 'Sisi Miring (b)');
                    if (a === null || h === null || b === null) throw new Error("Alas (a), Tinggi (h), dan Sisi Miring (b) harus diisi.");
                    
                    const L = a * h;
                    const K = 2 * (a + b);
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                } else if (mode === 'alas-tinggi') {
                    const L_val = getInput('luas-jajar', 'Luas (L)');
                    const a_val = getInput('alas-jajar-luas', 'Alas (a)');
                    const h_val = getInput('tinggi-jajar-luas', 'Tinggi (h)');

                    if (L_val === null) throw new Error("Luas (L) harus diisi.");
                    
                    if (a_val !== null) {
                        if (a_val === 0) throw new Error("Alas tidak boleh nol.");
                        const h = L_val / a_val;
                        results.push({ label: 'Tinggi (h) dari Luas', value: formatNumber(h), unit: unit });
                    } else if (h_val !== null) {
                        if (h_val === 0) throw new Error("Tinggi tidak boleh nol.");
                        const a = L_val / h_val;
                        results.push({ label: 'Alas (a) dari Luas', value: formatNumber(a), unit: unit });
                    } else {
                        throw new Error("Masukkan Luas dan Alas, ATAU Luas dan Tinggi.");
                    }
                }
                break;
            case 'trapesium':
                if (mode === 'luas-keliling') {
                    const a = getInput('sisi-a-trapesium', 'Sisi Sejajar (a)');
                    const b = getInput('sisi-b-trapesium', 'Sisi Sejajar (b)');
                    const h = getInput('tinggi-trapesium', 'Tinggi (h)');
                    const c = getInput('sisi-c-trapesium', 'Sisi Miring (c)');
                    const d = getInput('sisi-d-trapesium', 'Sisi Miring (d)');

                    if (a === null || b === null || h === null) throw new Error("Sisi Sejajar (a), (b), dan Tinggi (h) harus diisi untuk Luas.");
                    
                    const L = 0.5 * (a + b) * h;
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    
                    if (c !== null && d !== null) {
                        const K = a + b + c + d;
                        results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                    } else {
                        results.push({ label: 'Keliling (K)', value: 'N/A', unit: 'Sisi miring c/d tidak diisi' });
                    }
                } else if (mode === 'tinggi') {
                    const L_val = getInput('luas-trapesium', 'Luas (L)');
                    const a = getInput('sisi-a-trapesium-luas', 'Sisi Sejajar (a)');
                    const b = getInput('sisi-b-trapesium-luas', 'Sisi Sejajar (b)');
                    
                    if (L_val === null || a === null || b === null) throw new Error("Luas (L) dan kedua Sisi Sejajar (a, b) harus diisi.");
                    const ab_sum = a + b;
                    if (ab_sum === 0) throw new Error("Jumlah sisi sejajar tidak boleh nol.");
                    
                    const h = (2 * L_val) / ab_sum;
                    results.push({ label: 'Tinggi (h) dari Luas', value: formatNumber(h), unit: unit });
                } else if (mode === 'sisi-sejajar') {
                    const L_val = getInput('luas-trapesium', 'Luas (L)');
                    const h = getInput('tinggi-trapesium-luas', 'Tinggi (h)');
                    const s_lain = getInput('sisi-lain-trapesium-luas', 'Sisi Sejajar Lain');
                    
                    if (L_val === null || h === null || s_lain === null) throw new Error("Luas (L), Tinggi (h), dan Sisi Sejajar Lain harus diisi.");
                    if (h === 0) throw new Error("Tinggi (h) tidak boleh nol.");
                    
                    const s = (2 * L_val / h) - s_lain;
                    if (s <= 0) throw new Error("Hasil Sisi Sejajar negatif atau nol. Periksa input.");
                    results.push({ label: 'Sisi Sejajar yang dicari', value: formatNumber(s), unit: unit });
                }
                break;
            case 'belah-ketupat':
                if (mode === 'luas-keliling-diagonal') {
                    const d1 = getInput('d1-bk', 'Diagonal 1 (d1)');
                    const d2 = getInput('d2-bk', 'Diagonal 2 (d2)');
                    if (d1 === null || d2 === null) throw new Error("Diagonal d1 dan d2 harus diisi.");
                    
                    const L = (d1 * d2) / 2;
                    const s = Math.sqrt(Math.pow(d1 / 2, 2) + Math.pow(d2 / 2, 2));
                    const K = 4 * s;
                    
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    results.push({ label: 'Sisi (s) (dihitung)', value: formatNumber(s), unit: unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                } else if (mode === 'luas-keliling-sisi-tinggi') {
                    const s = getInput('sisi-bk', 'Sisi (s)');
                    const h = getInput('tinggi-bk', 'Tinggi (h)');
                    if (s === null || h === null) throw new Error("Sisi (s) dan Tinggi (h) harus diisi.");
                    
                    const L = s * h;
                    const K = 4 * s;
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                } else if (mode === 'diagonal') {
                    const L_val = getInput('luas-bk', 'Luas (L)');
                    const d_lain = getInput('d-lain-bk', 'Diagonal Lain');
                    if (L_val === null || d_lain === null) throw new Error("Luas (L) dan Diagonal Lain harus diisi.");
                    if (d_lain === 0) throw new Error("Diagonal Lain tidak boleh nol.");
                    
                    const d = (2 * L_val) / d_lain;
                    results.push({ label: 'Diagonal yang dicari', value: formatNumber(d), unit: unit });
                } else if (mode === 'sisi') {
                    const K_val = getInput('keliling-bk', 'Keliling (K)');
                    const d1 = getInput('d1-bk-sisi', 'Diagonal 1 (d1)');
                    const d2 = getInput('d2-bk-sisi', 'Diagonal 2 (d2)');
                    
                    let s;
                    let source = '';

                    if (K_val !== null) {
                        s = K_val / 4;
                        source = 'dari Keliling';
                    } else if (d1 !== null && d2 !== null) {
                        s = Math.sqrt(Math.pow(d1 / 2, 2) + Math.pow(d2 / 2, 2));
                        source = 'dari Diagonal';
                    } else {
                        throw new Error("Masukkan Keliling, ATAU kedua Diagonal (d1 dan d2).");
                    }
                    results.push({ label: `Sisi (s) ${source}`, value: formatNumber(s), unit: unit });
                }
                break;
            case 'layang-layang':
                if (mode === 'luas-keliling') {
                    const d1 = getInput('d1-ll', 'Diagonal 1 (d1)');
                    const d2 = getInput('d2-ll', 'Diagonal 2 (d2)');
                    const a = getInput('sisi-a-ll', 'Sisi a');
                    const b = getInput('sisi-b-ll', 'Sisi b');
                    
                    if (d1 === null || d2 === null) throw new Error("Diagonal d1 dan d2 harus diisi untuk Luas.");
                    const L = (d1 * d2) / 2;
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    
                    if (a !== null && b !== null) {
                        const K = 2 * (a + b);
                        results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                    } else {
                        results.push({ label: 'Keliling (K)', value: 'N/A', unit: 'Sisi a/b tidak diisi' });
                    }
                } else if (mode === 'diagonal') {
                    const L_val = getInput('luas-ll', 'Luas (L)');
                    const d_lain = getInput('d-lain-ll', 'Diagonal Lain');
                    if (L_val === null || d_lain === null) throw new Error("Luas (L) dan Diagonal Lain harus diisi.");
                    if (d_lain === 0) throw new Error("Diagonal Lain tidak boleh nol.");
                    
                    const d = (2 * L_val) / d_lain;
                    results.push({ label: 'Diagonal yang dicari', value: formatNumber(d), unit: unit });
                }
                break;
            case 'segi-n':
                const n = getInput('n-sisi-segin', 'Jumlah Sisi (n)');
                if (n === null) throw new Error("Jumlah Sisi (n) harus diisi.");
                if (n < 3) throw new Error("Jumlah Sisi (n) minimal 3.");
                
                if (mode === 'luas-keliling') {
                    const s = getInput('sisi-segin', 'Panjang Sisi (s)');
                    if (s === null) throw new Error("Panjang Sisi (s) harus diisi.");
                    
                    const K = n * s;
                    const L = (n * Math.pow(s, 2)) / (4 * Math.tan(Math.PI / n)); 
                    
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: unit });
                } else if (mode === 'sisi') {
                    const L_val = getInput('luas-segin', 'Luas (L)');
                    const K_val = getInput('keliling-segin', 'Keliling (K)');
                    
                    let s;
                    let source = '';

                    if (K_val !== null) {
                        s = K_val / n;
                        source = 'dari Keliling';
                    } else if (L_val !== null) {
                        const tan_val = Math.tan(Math.PI / n);
                        if (tan_val === 0) throw new Error("Perhitungan tidak valid untuk n ini.");
                        s = Math.sqrt((4 * L_val * tan_val) / n);
                        source = 'dari Luas';
                    } else {
                        throw new Error("Masukkan Luas atau Keliling.");
                    }
                    results.push({ label: `Sisi (s) ${source}`, value: formatNumber(s), unit: unit });
                }
                break;
            case 'segi-n-tak-beraturan':
                if (mode === 'shoelace') {
                    const text = getTextInput('koordinat-points-segi-n');
                    const { L, K } = calculatePolygonAreaAndPerimeter(text);
                    
                    const coord_unit = 'unit'; 
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: coord_unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: coord_unit });
                }
                break;
            case 'koordinat':
                if (mode === 'shoelace') {
                    const text = getTextInput('koordinat-points');
                    const { L, K } = calculatePolygonAreaAndPerimeter(text);

                    const coord_unit = 'unit'; 
                    results.push({ label: 'Luas (L)', value: formatNumber(L), unit: coord_unit });
                    results.push({ label: 'Keliling (K)', value: formatNumber(K), unit: coord_unit });
                }
                break;
        }
    } catch (e) {
        error = e.message;
    }


    if (error) {
        hasilArea.innerHTML = `<p class="error">Error: ${error}</p>`;
        return; 
    }

    if (results.length > 0) {
        let html = `
        <h4>Hasil Perhitungan:</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #0b2c66; color: white;">
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
            </tr>`;

        results.forEach(res => {
            let nilaiDisplay = res.value;
            let satuanDisplay = res.unit || '';
            let label = res.label;

            if (nilaiDisplay === 'N/A') {
                 html += `
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 10px;">${label}</td>
                        <td style="border: 1px solid #ccc; padding: 10px;">N/A (${satuanDisplay})</td>
                    </tr>`;
            } else {
                if (label.includes('Luas')) {
                    if (satuanDisplay === 'unit') {
                        satuanDisplay = `${satuanDisplay}²`;
                    } else if (satuanDisplay) {
                         satuanDisplay = `${satuanDisplay}²`;
                    }
                }

                html += `
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 10px;">${label}</td>
                        <td style="border: 1px solid #ccc; padding: 10px;">${nilaiDisplay} ${satuanDisplay}</td>
                    </tr>`;
            }
        });

        html += `</table>`;
        hasilArea.innerHTML = html;

        const inputArea = document.getElementById(`input-area-${shape}`);
        if (inputArea) {
            const allInputs = inputArea.querySelectorAll('input, textarea');
            allInputs.forEach(input => {
                input.value = '';
            });
        }
    } else {
         hasilArea.innerHTML = '<p class="error">Tidak ada hasil yang valid. Periksa input Anda.</p>';
    }
}