let currentFungsi = '';

const getCleanValue = (id) => {
    const el = document.getElementById(id);
    if (!el) {
        return NaN;
    }
    let raw = el.value.trim();
    if (!raw) return NaN;
    raw = raw.replace(',', '.');
    const num = Number(raw);
    return isNaN(num) ? NaN : num;
};

function addRealTimeValidation(containerId = 'kalkulator-area') {
    const area = document.getElementById(containerId);
    if (!area) return;

    const attachValidationToInput = (inp) => {
        if (inp.listenerAdded) return;
        inp.listenerAdded = true;

        inp.addEventListener('input', function() {
            const val = this.value.trim().replace(',', '.');

            if (val === '') {
                this.style.borderColor = '';
                this.title = '';
                return;
            }

            const num = Number(val);
            const isValid = !isNaN(num);

            if (isValid) {
                this.style.borderColor = 'green';
                this.title = '';
            } else {
                this.style.borderColor = 'red';
                this.title = 'Harus angka murni (contoh: 3, -2.5, atau 2,5). Gunakan titik/koma untuk desimal.';
            }
        });

        const initialVal = inp.value.trim().replace(',', '.');
        if (initialVal !== '') {
            const num = Number(initialVal);
            inp.style.borderColor = !isNaN(num) ? 'green' : 'red';
            if (isNaN(num)) {
                inp.title = 'Harus angka murni (contoh: 3, -2.5, atau 2,5). Gunakan titik/koma untuk desimal.';
            }
        }
    };

    const numericInputs = area.querySelectorAll('input[type="text"], textarea');
    numericInputs.forEach(attachValidationToInput);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const newInputs = node.querySelectorAll ? node.querySelectorAll('input[type="text"], textarea') : (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' ? [node] : []);
                        newInputs.forEach(attachValidationToInput);
                    }
                });
            }
        });
    });
    observer.observe(area, { childList: true, subtree: true });
}

function addEnterListeners() {
    const area = document.getElementById('kalkulator-area');
    const navigableElements = Array.from(area.querySelectorAll('input[type="text"], select, textarea'));

    navigableElements.forEach((element, index) => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const currentIndex = navigableElements.indexOf(e.target);
                if (currentIndex !== -1) {
                    if (currentIndex < navigableElements.length - 1) {
                        const nextElement = navigableElements[currentIndex + 1];
                        nextElement.focus();
                        if (nextElement.tagName === 'SELECT') {
                            nextElement.dispatchEvent(new Event('change'));
                        }
                    } else {
                        hitung(currentFungsi);
                    }
                } else {
                    hitung(currentFungsi);
                }
            }
        });
    });
}

function tampilkanKalkulator() {
    const selectElement = document.getElementById('pilih-fungsi');
    const fungsi = selectElement.value;
    currentFungsi = fungsi;
    const selectedOption = selectElement.options[selectElement.selectedIndex].text;
    const area = document.getElementById('kalkulator-area');
    area.innerHTML = '';
    if (!fungsi) return;

    let title = selectedOption.split(' (')[0];
    let html = `<div style="max-width: 900px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: white;">`;
    html += `<h2>${title}</h2>`;

    switch (fungsi) {
        case 'linear':
            html += `<label for="a">a:</label><input type="text" id="a" placeholder="Masukkan koefisien a">`;
            html += `<label for="b">b:</label><input type="text" id="b" placeholder="Masukkan konstanta b">`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('linear')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'kuadrat':
            html += `<label for="a">a:</label><input type="text" id="a" placeholder="Masukkan koefisien a">`;
            html += `<label for="b">b:</label><input type="text" id="b" placeholder="Masukkan koefisien b">`;
            html += `<label for="c">c:</label><input type="text" id="c" placeholder="Masukkan konstanta c">`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('kuadrat')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'kubik':
            html += `<label for="a">a:</label><input type="text" id="a" placeholder="Masukkan koefisien a">`;
            html += `<label for="b">b:</label><input type="text" id="b" placeholder="Masukkan koefisien b">`;
            html += `<label for="c">c:</label><input type="text" id="c" placeholder="Masukkan koefisien c">`;
            html += `<label for="d">d:</label><input type="text" id="d" placeholder="Masukkan konstanta d">`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('kubik')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        
        case 'polinomial':
            html += `<label for="degree">Derajat n:</label><input type="text" id="degree" placeholder="Masukkan derajat n (mis: 5)" style="width: 150px;">`;
            html += `<button onclick="tampilkanCoeff()" style="margin-left: 10px;">Set Derajat</button><br>`;
            html += `<div id="coeff-area" style="margin: 10px 0;"></div>`;
            html += `<label for="x_poly">x:</label><input type="text" id="x_poly" placeholder="Masukkan nilai x"><br>`;
            html += `<button onclick="hitung('polinomial')" style="margin-top: 10px;">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;

        case 'rasional':
            html += `<h3>Numerator P(x)</h3>`;
            html += `<label for="degree_p">Derajat P:</label><select id="degree_p" onchange="tampilkanCoeff('p')">`;
            for (let i = 0; i <= 10; i++) {
                html += `<option value="${i}">${i}</option>`;
            }
            html += `</select>`;
            html += `<div id="coeff-area_p"></div>`;
            html += `<h3>Denominator Q(x)</h3>`;
            html += `<label for="degree_q">Derajat Q:</label><select id="degree_q" onchange="tampilkanCoeff('q')">`;
            for (let i = 1; i <= 10; i++) {
                html += `<option value="${i}">${i}</option>`;
            }
            html += `</select>`;
            html += `<div id="coeff-area_q"></div>`;
            html += `<label for="x">x (≤2):</label><input type="text" id="x" placeholder="Masukkan nilai x" title="x harus ≤2 untuk validasi">`;
            html += `<button onclick="hitung('rasional')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'akar':
            html += `<label for="a">a:</label><input type="text" id="a" placeholder="Masukkan koefisien a">`;
            html += `<label for="b">b:</label><input type="text" id="b" placeholder="Masukkan konstanta b">`;
            html += `<label for="n">n (akar):</label><input type="text" id="n" placeholder="Masukkan 1 atau lebih">`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('akar')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'pangkat':
            html += `<label for="n">n:</label><input type="text" id="n" placeholder="Masukkan eksponen n">`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('pangkat')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'eksponensial':
            html += `<label for="a">a (basis):</label><input type="text" id="a" placeholder="Masukkan basis a >0, !=1">`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('eksponensial')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'logaritma':
            html += `<label for="a">a (basis):</label><input type="text" id="a" placeholder="Masukkan basis a >0, !=1">`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan x >0">`;
            html += `<button onclick="hitung('logaritma')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'sin':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<label for="unit">Unit:</label><select id="unit"><option value="radians">Radians</option><option value="degrees">Degrees</option></select>`;
            html += `<button onclick="hitung('sin')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'cos':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<label for="unit">Unit:</label><select id="unit"><option value="radians">Radians</option><option value="degrees">Degrees</option></select>`;
            html += `<button onclick="hitung('cos')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'tan':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<label for="unit">Unit:</label><select id="unit"><option value="radians">Radians</option><option value="degrees">Degrees</option></select>`;
            html += `<button onclick="hitung('tan')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'cot':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x" title="Hindari x = k*π (k integer)">`;
            html += `<label for="unit">Unit:</label><select id="unit"><option value="radians">Radians</option><option value="degrees">Degrees</option></select>`;
            html += `<button onclick="hitung('cot')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'sec':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x" title="Hindari x = (2k+1)π/2 (k integer)">`;
            html += `<label for="unit">Unit:</label><select id="unit"><option value="radians">Radians</option><option value="degrees">Degrees</option></select>`;
            html += `<button onclick="hitung('sec')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'csc':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x" title="Hindari x = k*π (k integer)">`;
            html += `<label for="unit">Unit:</label><select id="unit"><option value="radians">Radians</option><option value="degrees">Degrees</option></select>`;
            html += `<button onclick="hitung('csc')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'invers':
            html += `<label for="type_f">Jenis f:</label><select id="type_f" onchange="tampilkanParam('invers')">
                      <option value="linear">Linear (y = ax + b)</option>
                      <option value="eksponensial">Eksponensial (y = a^x)</option>
                      <option value="logaritma">Logaritma (y = log_a x)</option>
                      <option value="sin">Sin (y = sin x)</option>
                      <option value="cos">Cos (y = cos x)</option>
                      <option value="tan">Tan (y = tan x)</option>
                    </select>`;
            html += `<div id="param-area"></div>`;
            html += `<label for="y">y:</label><input type="text" id="y" placeholder="Masukkan nilai y">`;
            html += `<button onclick="hitung('invers')">Hitung x</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'komposisi':
            html += `<label for="g">g(x):</label><input type="text" id="g" placeholder="Masukkan ekspresi g(x)">`;
            html += `<label for="f">f(x):</label><input type="text" id="f" placeholder="Masukkan ekspresi f(x)">`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('komposisi')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'self_komposisi':
            html += `<label for="f">f(x):</label><input type="text" id="f" placeholder="Masukkan ekspresi f(x)">`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('self_komposisi')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'mutlak':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('mutlak')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'signum':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('signum')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'tangga':
            html += `<label for="type">Jenis:</label><select id="type" title="Floor: pembulatan ke bawah; Ceil: ke atas"><option value="floor">Floor</option><option value="ceil">Ceil</option></select>`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('tangga')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'piecewise':
            html += `<label for="piecewise_def">Definisi Piecewise:</label><textarea id="piecewise_def" rows="5" placeholder="Contoh: if(x < 0) return -x; else return x;"></textarea>`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('piecewise')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'modulus':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<label for="n">n:</label><input type="text" id="n" placeholder="Masukkan modulus n">`;
            html += `<button onclick="hitung('modulus')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'identitas':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('identitas')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'konstan':
            html += `<label for="c">c:</label><input type="text" id="c" placeholder="Masukkan konstanta c">`;
            html += `<button onclick="hitung('konstan')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'reciprocal':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan x !=0">`;
            html += `<button onclick="hitung('reciprocal')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'mutlak-kuadrat':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('mutlak-kuadrat')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'eksponensial-natural':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('eksponensial-natural')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'log-natural':
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan x >0">`;
            html += `<button onclick="hitung('log-natural')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'trig-invers':
            html += `<label for="type">Jenis:</label><select id="type"><option value="arcsin">Arcsin</option><option value="arccos">Arccos</option><option value="arctan">Arctan</option></select>`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x (domain: [-1,1] untuk arcsin/arccos)" title="Arcsin/Arccos: x di [-1,1]; Arctan: semua real">`;
            html += `<label for="unit">Output Unit:</label><select id="unit"><option value="radians">Radians</option><option value="degrees">Degrees</option></select>`;
            html += `<button onclick="hitung('trig-invers')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
        case 'hiperbolik':
            html += `<label for="type">Jenis:</label><select id="type"><option value="sinh">Sinh</option><option value="cosh">Cosh</option><option value="tanh">Tanh</option></select>`;
            html += `<label for="x">x:</label><input type="text" id="x" placeholder="Masukkan nilai x">`;
            html += `<button onclick="hitung('hiperbolik')">Hitung</button>`;
            html += `<div id="hasil"></div>`;
            break;
    }

    html += `</div>`;
    area.innerHTML = html;

    setTimeout(() => {
        if (fungsi === 'polinomial') {
            const xPolyEl = document.getElementById('x_poly');
            if (xPolyEl) {
                xPolyEl.dispatchEvent(new Event('input'));
            }
        }
        if (fungsi === 'rasional') {
            const degreeP = document.getElementById('degree_p');
            const degreeQ = document.getElementById('degree_q');
            if (degreeP) {
                degreeP.addEventListener('change', () => tampilkanCoeff('p'));
                degreeP.value = '1';
                tampilkanCoeff('p');
            }
            if (degreeQ) {
                degreeQ.addEventListener('change', () => tampilkanCoeff('q'));
                tampilkanCoeff('q');
            }
        }
        if (fungsi === 'invers') {
            const typeF = document.getElementById('type_f');
            if (typeF) {
                typeF.addEventListener('change', () => tampilkanParam('invers'));
                tampilkanParam('invers');
            }
        }
        addRealTimeValidation();
        addEnterListeners();
    }, 100);
}

function hitung(fungsi) {
    const hasil = document.getElementById('hasil');
    hasil.classList.remove('error');
    hasil.innerHTML = '';
    let x, fx;
    let labelFungsi = '';

    const createInputError = (id, label) => {
        const el = document.getElementById(id);
        const rawValue = el ? el.value.trim() : 'element not found';
        return new Error(`Input ${label} invalid: "${rawValue || 'kosong'}". Pastikan angka murni (titik/koma untuk desimal).`);
    };

    try {
        switch (fungsi) {
            case 'linear': {
                const a = getCleanValue('a');
                const b = getCleanValue('b');
                x = getCleanValue('x');
                if (isNaN(a)) throw createInputError('a', 'a');
                if (isNaN(b)) throw createInputError('b', 'b');
                if (isNaN(x)) throw createInputError('x', 'x');
                fx = a * x + b;
                labelFungsi = `f(${x}) untuk f(x)=${a}x+${b}`;
                break;
            }
            case 'kuadrat': {
                const a = getCleanValue('a');
                const b = getCleanValue('b');
                const c = getCleanValue('c');
                x = getCleanValue('x');
                if (isNaN(a)) throw createInputError('a', 'a');
                if (isNaN(b)) throw createInputError('b', 'b');
                if (isNaN(c)) throw createInputError('c', 'c');
                if (isNaN(x)) throw createInputError('x', 'x');
                fx = a * Math.pow(x, 2) + b * x + c;
                labelFungsi = `f(${x}) untuk f(x)=${a}x² + ${b}x + ${c}`;
                break;
            }
            case 'kubik': {
                const a = getCleanValue('a');
                const b = getCleanValue('b');
                const c = getCleanValue('c');
                const d = getCleanValue('d');
                x = getCleanValue('x');
                if (isNaN(a)) throw createInputError('a', 'a');
                if (isNaN(b)) throw createInputError('b', 'b');
                if (isNaN(c)) throw createInputError('c', 'c');
                if (isNaN(d)) throw createInputError('d', 'd');
                if (isNaN(x)) throw createInputError('x', 'x');
                fx = a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
                labelFungsi = `f(${x}) untuk f(x)=${a}x³ + ${b}x² + ${c}x + ${d}`;
                break;
            }
            
            case 'polinomial': {
                const degree = getCleanValue('degree');
                if (isNaN(degree) || degree < 0 || !Number.isInteger(degree)) {
                    throw createInputError('degree', 'Derajat n (harus bilangan bulat >= 0)');
                }
                if (degree > 100) {
                    throw new Error('Derajat n terlalu tinggi (maks 100).');
                }
                
                x = getCleanValue('x_poly');
                if (isNaN(x)) throw createInputError('x_poly', 'x');

                let coeffs = [];
                let polyStr = '';
                for (let i = degree; i >= 0; i--) {
                    const coeffId = `coeff_${i}`;
                    const c = getCleanValue(coeffId);
                    if (isNaN(c)) throw createInputError(coeffId, `a_${i}`);
                    coeffs[degree - i] = c;

                    if (c !== 0) {
                        const absC = Math.abs(c);
                        let term = '';
                        if (i > 0) {
                            if (absC === 1) {
                                term = i === 1 ? 'x' : `x^${i}`;
                            } else {
                                term = `${absC}${i === 1 ? 'x' : `x^${i}`}`;
                            }
                        } else {
                            term = absC.toString();
                        }
                        const sign = polyStr === '' ? (c < 0 ? '-' : '') : (c > 0 ? ' + ' : ' - ');
                        polyStr += sign + term;
                    }
                }
                if (polyStr === '') polyStr = '0';

                fx = coeffs[0] || 0;
                for (let i = 1; i <= degree; i++) {
                    fx = fx * x + (coeffs[i] || 0);
                }

                labelFungsi = `f(${x}) untuk f(x)=${polyStr}`;
                break;
            }

            case 'rasional': {
                const degree_p = parseInt(document.getElementById('degree_p').value || 1);
                const degree_q = parseInt(document.getElementById('degree_q').value || 1);
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');

                let pCoeffs = [], qCoeffs = [], pStr = '', qStr = '';
                for (let i = degree_p; i >= 0; i--) {
                    const coeffId = `coeff_p${i}`;
                    const c = getCleanValue(coeffId);
                    if (isNaN(c)) throw createInputError(coeffId, `a_p${i}`);
                    pCoeffs[degree_p - i] = c;
                }
                for (let i = degree_q; i >= 0; i--) {
                    const coeffId = `coeff_q${i}`;
                    const c = getCleanValue(coeffId);
                    if (isNaN(c)) throw createInputError(coeffId, `a_q${i}`);
                    qCoeffs[degree_q - i] = c;
                }

                let p = 0, q = 0;
                for (let i = 0; i <= degree_p; i++) p += pCoeffs[i] * Math.pow(x, i);
                for (let i = 0; i <= degree_q; i++) q += qCoeffs[i] * Math.pow(x, i);

                if (q === 0) throw new Error('Denominator nol (pembagian dengan nol).');
                fx = p / q;

                for (let i = degree_p; i >= 0; i--) {
                    const coeff = pCoeffs[degree_p - i];
                    if (coeff !== 0) {
                        const sign = pStr === "" ? (coeff < 0 ? "-" : "") : (coeff > 0 ? " + " : " - ");
                        let term = "";
                        if (i > 0) {
                            if (Math.abs(coeff) === 1) {
                                term = (i === 1 ? "x" : `x^${i}`);
                            } else {
                                term = `${Math.abs(coeff)}${i === 1 ? "x" : `x^${i}`}`;
                            }
                        } else {
                            term = Math.abs(coeff).toString();
                        }
                        pStr += sign + term;
                    }
                }
                for (let i = degree_q; i >= 0; i--) {
                    const coeff = qCoeffs[degree_q - i];
                    if (coeff !== 0) {
                        const sign = qStr === "" ? (coeff < 0 ? "-" : "") : (coeff > 0 ? " + " : " - ");
                        let term = "";
                        if (i > 0) {
                            if (Math.abs(coeff) === 1) {
                                term = (i === 1 ? "x" : `x^${i}`);
                            } else {
                                term = `${Math.abs(coeff)}${i === 1 ? "x" : `x^${i}`}`;
                            }
                        } else {
                            term = Math.abs(coeff).toString();
                        }
                        qStr += sign + term;
                    }
                }

                if (pStr === "") pStr = "0";
                if (qStr === "") qStr = "0";

                labelFungsi = `f(${x}) untuk f(x)=(${pStr}) / (${qStr})`;
                break;
            }
            case 'akar': {
                const a = getCleanValue('a');
                const b = getCleanValue('b');
                const n = getCleanValue('n');
                x = getCleanValue('x');
                if (isNaN(a)) throw createInputError('a', 'a');
                if (isNaN(b)) throw createInputError('b', 'b');
                if (isNaN(n)) throw createInputError('n', 'n (akar)');
                if (isNaN(x)) throw createInputError('x', 'x');
                if (n <= 0) throw new Error('n (akar) harus >0');
                const inner = a * x + b;
                if (inner < 0 && Math.floor(n) % 2 === 0) throw new Error(`Inner (${inner}) negatif untuk akar genap (n=${n}).`);
                fx = Math.pow(inner, 1 / n);
                labelFungsi = `f(${x}) untuk f(x) = (${a}x + ${b})^{1/${n}}`;
                break;
            }
            case 'pangkat': {
                const n_p = getCleanValue('n');
                x = getCleanValue('x');
                if (isNaN(n_p)) throw createInputError('n', 'n (eksponen)');
                if (isNaN(x)) throw createInputError('x', 'x');
                fx = Math.pow(x, n_p);
                labelFungsi = `f(${x}) untuk f(x) = x^${n_p}`;
                break;
            }
            case 'eksponensial': {
                const a_e = getCleanValue('a');
                x = getCleanValue('x');
                if (isNaN(a_e)) throw createInputError('a', 'a (basis)');
                if (isNaN(x)) throw createInputError('x', 'x');
                if (a_e <= 0 || a_e === 1) throw new Error('Basis a harus >0 dan !=1');
                fx = Math.pow(a_e, x);
                labelFungsi = `f(${x}) untuk f(x) = ${a_e}^x`;
                break;
            }
            case 'logaritma': {
                const a_l = getCleanValue('a');
                x = getCleanValue('x');
                if (isNaN(a_l)) throw createInputError('a', 'a (basis)');
                if (isNaN(x)) throw createInputError('x', 'x');
                if (x <= 0) throw new Error('x harus >0');
                if (a_l <= 0 || a_l === 1) throw new Error('Basis a harus >0 dan !=1');
                fx = Math.log(x) / Math.log(a_l);
                labelFungsi = `f(${x}) untuk f(x) = log_${a_l}(x)`;
                break;
            }
            case 'sin': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                const unit = document.getElementById('unit').value;
                let angle = unit === 'degrees' ? x * Math.PI / 180 : x;
                fx = Math.sin(angle);
                if (!isFinite(fx)) throw new Error('Nilai tidak terdefinisi');
                labelFungsi = `sin(${x} ${unit})`;
                break;
            }
            case 'cos': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                const unit = document.getElementById('unit').value;
                let angle = unit === 'degrees' ? x * Math.PI / 180 : x;
                fx = Math.cos(angle);
                if (!isFinite(fx)) throw new Error('Nilai tidak terdefinisi');
                labelFungsi = `cos(${x} ${unit})`;
                break;
            }
            case 'tan': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                const unit = document.getElementById('unit').value;
                let angle = unit === 'degrees' ? x * Math.PI / 180 : x;
                fx = Math.tan(angle);
                if (!isFinite(fx)) throw new Error('Nilai tidak terdefinisi');
                labelFungsi = `tan(${x} ${unit})`;
                break;
            }
            case 'cot': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                const unit = document.getElementById('unit').value;
                let angle = unit === 'degrees' ? x * Math.PI / 180 : x;
                fx = 1 / Math.tan(angle);
                if (!isFinite(fx)) throw new Error('Nilai tidak terdefinisi (mungkin x = k*π)');
                labelFungsi = `cot(${x} ${unit})`;
                break;
            }
            case 'sec': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                const unit = document.getElementById('unit').value;
                let angle = unit === 'degrees' ? x * Math.PI / 180 : x;
                fx = 1 / Math.cos(angle);
                if (!isFinite(fx)) throw new Error('Nilai tidak terdefinisi (mungkin x = (2k+1)π/2)');
                labelFungsi = `sec(${x} ${unit})`;
                break;
            }
            case 'csc': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                const unit = document.getElementById('unit').value;
                let angle = unit === 'degrees' ? x * Math.PI / 180 : x;
                fx = 1 / Math.sin(angle);
                if (!isFinite(fx)) throw new Error('Nilai tidak terdefinisi (mungkin x = k*π)');
                labelFungsi = `csc(${x} ${unit})`;
                break;
            }
            case 'invers': {
                const type_f = document.getElementById('type_f').value;
                const y = getCleanValue('y');
                if (isNaN(y)) throw createInputError('y', 'y');
                let unit_i = document.getElementById('unit') ? document.getElementById('unit').value : 'radians';
                let x_i;
                let fStr;

                switch (type_f) {
                    case 'linear': {
                        const a_i = getCleanValue('a');
                        const b_i = getCleanValue('b');
                        if (isNaN(a_i)) throw createInputError('a', 'a');
                        if (isNaN(b_i)) throw createInputError('b', 'b');
                        if (a_i === 0) throw new Error('a tidak boleh 0');
                        x_i = (y - b_i) / a_i;
                        fStr = `f(x)=${a_i}x+${b_i}`;
                        break;
                    }
                    case 'eksponensial': {
                        const a_ei = getCleanValue('a');
                        if (isNaN(a_ei)) throw createInputError('a', 'a (basis)');
                        if (a_ei <= 0 || a_ei === 1 || y <= 0) throw new Error('Input invalid (a >0 !=1, y>0)');
                        x_i = Math.log(y) / Math.log(a_ei);
                        fStr = `f(x)=${a_ei}^x`;
                        break;
                    }
                    case 'logaritma': {
                        const a_li = getCleanValue('a');
                        if (isNaN(a_li)) throw createInputError('a', 'a (basis)');
                        if (a_li <= 0 || a_li === 1) throw new Error('Basis a harus >0 dan !=1');
                        x_i = Math.pow(a_li, y);
                        fStr = `f(x)=log_${a_li}(x)`;
                        break;
                    }
                    case 'sin': {
                        if (y < -1 || y > 1) throw new Error('y di [-1,1]');
                        x_i = Math.asin(y);
                        if (unit_i === 'degrees') x_i *= 180 / Math.PI;
                        fStr = `f(x)=sin(x)`;
                        break;
                    }
                    case 'cos': {
                        if (y < -1 || y > 1) throw new Error('y di [-1,1]');
                        x_i = Math.acos(y);
                        if (unit_i === 'degrees') x_i *= 180 / Math.PI;
                        fStr = `f(x)=cos(x)`;
                        break;
                    }
                    case 'tan': {
                        x_i = Math.atan(y);
                        if (unit_i === 'degrees') x_i *= 180 / Math.PI;
                        fStr = `f(x)=tan(x)`;
                        break;
                    }
                    default:
                        throw new Error('Jenis fungsi invers tidak didukung');
                }
                const formatted_x_i = x_i.toFixed(6).replace(/\.0+$/, '');

                hasil.innerHTML = `
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr style="background-color: #0b2c66; color: white;">
                            <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Fungsi</th>
                            <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai y</th>
                            <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai x = f⁻¹(y)</th>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ccc; padding: 10px;">${fStr}</td>
                            <td style="border: 1px solid #ccc; padding: 10px;">${y}</td>
                            <td style="border: 1px solid #ccc; padding: 10px;">${formatted_x_i} ${unit_i === 'degrees' ? '°' : ''}</td>
                        </tr>
                    </table>
                `;
                autoClearInputs();
                return;
            }
            case 'komposisi': {
                const g_str = document.getElementById('g').value.trim();
                const f_str = document.getElementById('f').value.trim();
                x = getCleanValue('x');
                if (!g_str || !f_str) throw new Error('Ekspresi f/g harus diisi.');
                if (isNaN(x)) throw createInputError('x', 'x');

                const g_func = (x_val) => Function('x', `with (Math) { return ${g_str} }`)(x_val);
                const f_func = (x_val) => Function('x', `with (Math) { return ${f_str} }`)(x_val);

                const gx = g_func(x);
                if (typeof gx !== 'number' || !isFinite(gx)) throw new Error(`Hasil g(${x}) tidak valid: ${gx}. Cek ekspresi g(x).`);

                fx = f_func(gx);
                if (typeof fx !== 'number' || !isFinite(fx)) throw new Error(`Hasil f(g(${x})) tidak valid: ${fx}. Cek ekspresi f(x).`);

                labelFungsi = `(f ∘ g)(${x}) untuk f(x)=${f_str} & g(x)=${g_str}`;
                break;
            }
            case 'self_komposisi': {
                const f_str = document.getElementById('f').value.trim();
                x = getCleanValue('x');
                if (!f_str) throw new Error('Ekspresi f harus diisi.');
                if (isNaN(x)) throw createInputError('x', 'x');

                const f_func = (x_val) => Function('x', `with (Math) { return ${f_str} }`)(x_val);

                const fx_inner = f_func(x);
                if (typeof fx_inner !== 'number' || !isFinite(fx_inner)) throw new Error(`Hasil f(${x}) tidak valid: ${fx_inner}. Cek ekspresi f(x).`);

                fx = f_func(fx_inner);
                if (typeof fx !== 'number' || !isFinite(fx)) throw new Error(`Hasil f(f(${x})) tidak valid: ${fx}. Cek ekspresi f(x).`);

                labelFungsi = `(f ∘ f)(${x}) untuk f(x)=${f_str}`;
                break;
            }
            case 'mutlak': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                fx = Math.abs(x);
                labelFungsi = `|${x}|`;
                break;
            }
            case 'signum': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                fx = Math.sign(x);
                labelFungsi = `sgn(${x})`;
                break;
            }
            case 'tangga': {
                const type_t = document.getElementById('type').value;
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                fx = type_t === 'floor' ? Math.floor(x) : Math.ceil(x);
                labelFungsi = `${type_t}(${x}) = pembulatan ${type_t === 'floor' ? 'ke bawah' : 'ke atas'}`;
                break;
            }
            case 'piecewise': {
                const def = document.getElementById('piecewise_def').value.trim();
                x = getCleanValue('x');
                if (!def) throw new Error('Definisi piecewise harus diisi.');
                if (isNaN(x)) throw createInputError('x', 'x');
                try {
                    fx = Function('x', `with (Math) { ${def} }`)(x);
                    if (typeof fx !== 'number' || !isFinite(fx)) throw new Error('Definisi harus return nilai numerik valid');
                } catch (e) {
                    throw new Error('Definisi piecewise invalid: ' + e.message);
                }
                labelFungsi = `f(${x}) piecewise`;
                break;
            }
            case 'modulus': {
                const n_m = getCleanValue('n');
                x = getCleanValue('x');
                if (isNaN(n_m)) throw createInputError('n', 'n (modulus)');
                if (isNaN(x)) throw createInputError('x', 'x');
                if (n_m === 0) throw new Error('n (modulus) tidak boleh 0');
                fx = x % n_m;
                labelFungsi = `${x} mod ${n_m}`;
                break;
            }
            case 'identitas': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                fx = x;
                labelFungsi = `f(${x}) = x`;
                break;
            }
            case 'konstan': {
                const c_k = getCleanValue('c');
                if (isNaN(c_k)) throw createInputError('c', 'c (konstanta)');
                fx = c_k;
                labelFungsi = `f(x) = ${c_k}`;
                break;
            }
            case 'reciprocal': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                if (x === 0) throw new Error('x tidak boleh 0');
                fx = 1 / x;
                labelFungsi = `f(${x}) = 1/${x}`;
                break;
            }
            case 'mutlak-kuadrat': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                fx = Math.pow(Math.abs(x), 2);
                labelFungsi = `|${x}|²`;
                break;
            }
            case 'eksponensial-natural': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                fx = Math.exp(x);
                labelFungsi = `e^${x}`;
                break;
            }
            case 'log-natural': {
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                if (x <= 0) throw new Error('x harus >0');
                fx = Math.log(x);
                labelFungsi = `ln(${x})`;
                break;
            }
            case 'trig-invers': {
                const type_ti = document.getElementById('type').value;
                let input_x = getCleanValue('x');
                if (isNaN(input_x)) throw createInputError('x', 'x');
                const unit_ti = document.getElementById('unit').value;
                if ((type_ti === 'arcsin' || type_ti === 'arccos') && (input_x < -1 || input_x > 1)) {
                    throw new Error(`x harus di [-1,1] untuk ${type_ti}`);
                }
                let fx_ti;
                if (type_ti === 'arcsin') fx_ti = Math.asin(input_x);
                if (type_ti === 'arccos') fx_ti = Math.acos(input_x);
                if (type_ti === 'arctan') fx_ti = Math.atan(input_x);
                if (unit_ti === 'degrees') fx_ti *= 180 / Math.PI;
                fx = fx_ti;
                labelFungsi = `${type_ti}(${input_x}) di ${unit_ti}`;
                break;
            }
            case 'hiperbolik': {
                const type_h = document.getElementById('type').value;
                x = getCleanValue('x');
                if (isNaN(x)) throw createInputError('x', 'x');
                if (type_h === 'sinh') fx = Math.sinh(x);
                if (type_h === 'cosh') fx = Math.cosh(x);
                if (type_h === 'tanh') fx = Math.tanh(x);
                labelFungsi = `${type_h}(${x})`;
                break;
            }
            default:
                throw new Error('Fungsi tidak dikenal');
        }

        if (!isFinite(fx)) throw new Error('Nilai tidak terdefinisi');
        const formatted_fx = fx.toFixed(6).replace(/\.0+$/, '');

        hasil.innerHTML = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #0b2c66; color: white;">
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Fungsi/Ekspresi</th>
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai Hasil</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 10px;">${labelFungsi}</td>
                    <td style="border: 1px solid #ccc; padding: 10px;">${formatted_fx}</td>
                </tr>
            </table>
        `;

        autoClearInputs();
    } catch (e) {
        hasil.classList.add('error');
        hasil.innerHTML = `Error: ${e.message}`;
    }
}

function autoClearInputs() {
    const hasil = document.getElementById('hasil');
    if (hasil && !hasil.classList.contains('error')) {
        const area = document.getElementById('kalkulator-area');
        const inputs = area.querySelectorAll('input[type="text"], textarea');
        const selects = area.querySelectorAll('select');

        inputs.forEach(input => input.value = '');
        selects.forEach(select => {
            select.selectedIndex = 0;
            if (select.id.includes('degree') || select.id === 'type_f') {
                select.dispatchEvent(new Event('change'));
            }
        });

        const coeffArea = document.getElementById('coeff-area');
        if (coeffArea) coeffArea.innerHTML = '';


        const firstInput = area.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
    }
}

function tampilkanCoeff(prefix = '') {
    let degreeId = 'degree';
    let areaId = 'coeff-area';
    let coeffPrefix = prefix ? `${prefix}` : '';

    if (prefix) {
        degreeId += `_${prefix}`;
        areaId += `_${prefix}`;
    }
    
    const degreeEl = document.getElementById(degreeId);
    const degreeRaw = getCleanValue(degreeId);
    const coeffArea = document.getElementById(areaId);
    if (!coeffArea) return;

    if (isNaN(degreeRaw) || degreeRaw < 0 || !Number.isInteger(degreeRaw)) {
        coeffArea.innerHTML = '<span style="color: red;">Silakan masukkan derajat n (bilangan bulat non-negatif).</span>';
        return;
    }
    
    const degree = degreeRaw;

    if (degree > 100) {
        coeffArea.innerHTML = '<span style="color: red;">Derajat terlalu tinggi (maks 100) untuk performa.</span>';
        return;
    }

    coeffArea.innerHTML = '';
    for (let i = degree; i >= 0; i--) {
        const coeffId = prefix ? `coeff_${coeffPrefix}${i}` : `coeff_${i}`;
        const placeholder = (i === 0) ? 'Masukkan konstanta' : 'Masukkan koefisien';
        const titleText = (i === 0) ? `Konstanta a${i}` : `Koefisien a${i}`;
        coeffArea.innerHTML += `<label for="${coeffId}">a<sub>${i}</sub>:</label><input type="text" id="${coeffId}" placeholder="${placeholder}" title="${titleText}"><br>`;
    }

    setTimeout(() => {
        const area = document.getElementById('kalkulator-area');
        const newInputs = area.querySelectorAll('input[type="text"]');
        newInputs.forEach(inp => {
            if (inp.id.startsWith('coeff_') || inp.id === 'x_poly') {
                inp.dispatchEvent(new Event('input'));
            }
        });
        addEnterListeners();
    }, 50);
}


function tampilkanParam(fungsi) {
    if (fungsi === 'invers') {
        const type = document.getElementById('type_f').value;
        const paramArea = document.getElementById('param-area');
        paramArea.innerHTML = '';
        if (type === 'linear') {
            paramArea.innerHTML += `<label for="a">a:</label><input type="text" id="a" placeholder="Masukkan a">`;
            paramArea.innerHTML += `<label for="b">b:</label><input type="text" id="b" placeholder="Masukkan b">`;
        } else if (type === 'eksponensial' || type === 'logaritma') {
            paramArea.innerHTML += `<label for="a">a (basis):</label><input type="text" id="a" placeholder="Masukkan basis a">`;
        } else if (type === 'sin' || type === 'cos' || type === 'tan') {
            paramArea.innerHTML += `<label for="unit">Output Unit:</label><select id="unit"><option value="radians">Radians</option><option value="degrees">Degrees</option></select>`;
        }

        setTimeout(() => {
            const area = document.getElementById('kalkulator-area');
            area.querySelectorAll('input[type="text"]').forEach(inp => {
                if (inp.id === 'a' || inp.id === 'b') inp.dispatchEvent(new Event('input'));
            });
            addEnterListeners();
        }, 50);
    }
}

document.getElementById('pilih-fungsi').addEventListener('change', tampilkanKalkulator);