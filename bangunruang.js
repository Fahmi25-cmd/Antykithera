const PI = Math.PI;

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

function setupEnterListener(shape) {
    const inputArea = document.getElementById(`input-area-${shape}`);
    if (!inputArea) return;

    const inputs = inputArea.querySelectorAll('input[type="number"]');

    if (inputs.length === 0) {
        return;
    }

    inputs.forEach((input, index) => {
        input.onkeydown = null;

        input.onkeydown = function(event) {
            if (event.key === 'Enter' || event.keyCode === 13) {
                event.preventDefault(); 

                const isLastInput = (index === inputs.length - 1);

                if (isLastInput) {
                    hitung(shape);
                } else {
                    const nextInput = inputs[index + 1];
                    if (nextInput) {
                        nextInput.focus();
                        nextInput.select(); 
                    }
                }
            }
        };
    });
}

function clearInputs(shape) {
    const inputArea = document.getElementById(`input-area-${shape}`);
    if (!inputArea) return;

    const inputs = inputArea.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
    });

    const unitSelector = document.getElementById(`unit-${shape}`);
    if (unitSelector) {
        unitSelector.value = 'cm';
    }
}

function tampilkanKalkulator() {
    const pilihan = document.getElementById('pilih-bangun').value;
    const areaKalkulator = document.getElementById('kalkulator-area');
    areaKalkulator.innerHTML = ''; 
    let html = '';

    if (!pilihan) return;

    switch (pilihan) {
        case 'kubus':
            html = `<h3>Kalkulator Kubus</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-kubus">Hitung apa?</label>
                        <select id="pilihan-hitung-kubus" onchange="updateInput('kubus')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="sisi">Sisi (s)</option>
                            <option value="diagonal-bidang">Diagonal Bidang</option>
                            <option value="diagonal-ruang">Diagonal Ruang</option>
                        </select>
                    </div>
                    <div id="input-area-kubus"></div>
                    <button type="button" onclick="hitung('kubus')">Hitung</button>
                    <div id="hasil-kubus" class="hasil"></div>`;
            break;
        case 'balok':
            html = `<h3>Kalkulator Balok</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-balok">Hitung apa?</label>
                        <select id="pilihan-hitung-balok" onchange="updateInput('balok')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="panjang">Panjang (p)</option>
                            <option value="lebar">Lebar (l)</option>
                            <option value="tinggi">Tinggi (t)</option>
                            <option value="diagonal-bidang">Diagonal Bidang</option>
                            <option value="diagonal-ruang">Diagonal Ruang</option>
                        </select>
                    </div>
                    <div id="input-area-balok"></div>
                    <button type="button" onclick="hitung('balok')">Hitung</button>
                    <div id="hasil-balok" class="hasil"></div>`;
            break;
        case 'prisma-poligon':
            html = `<h3>Kalkulator Prisma Poligon (Alas Beraturan)</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-prisma-poligon">Hitung apa?</label>
                        <select id="pilihan-hitung-prisma-poligon" onchange="updateInput('prisma-poligon')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="tinggi">Tinggi Prisma (t)</option>
                            <option value="sisi-alas">Panjang Sisi Alas (s)</option>
                        </select>
                    </div>
                    <div id="input-area-prisma-poligon"></div>
                    <button type="button" onclick="hitung('prisma-poligon')">Hitung</button>
                    <div id="hasil-prisma-poligon" class="hasil"></div>`;
            break;
        case 'limas-poligon':
            html = `<h3>Kalkulator Limas Poligon (Alas Beraturan)</h3>
                    <div class="input-group">
                         <label for="pilihan-hitung-limas-poligon">Hitung apa?</label>
                        <select id="pilihan-hitung-limas-poligon" onchange="updateInput('limas-poligon')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="tinggi">Tinggi Limas (t)</option>
                            <option value="luas-alas">Luas Alas</option>
                        </select>
                    </div>
                    <div id="input-area-limas-poligon"></div>
                    <button type="button" onclick="hitung('limas-poligon')">Hitung</button>
                    <div id="hasil-limas-poligon" class="hasil"></div>`;
            break;

        case 'piramida-terpancung':
             html = `<h3>Kalkulator Piramida Terpancung (Frustum)</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-piramida-terpancung">Hitung apa?</label>
                        <select id="pilihan-hitung-piramida-terpancung" onchange="updateInput('piramida-terpancung')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="tinggi">Tinggi (t)</option>
                        </select>
                    </div>
                    <div id="input-area-piramida-terpancung"></div>
                    <button type="button" onclick="hitung('piramida-terpancung')">Hitung</button>
                    <div id="hasil-piramida-terpancung" class="hasil"></div>`;
            break;

        case 'tetrahedron':
            html = `<h3>Kalkulator Tetrahedron</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-tetrahedron">Hitung apa?</label>
                        <select id="pilihan-hitung-tetrahedron" onchange="updateInput('tetrahedron')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="sisi">Panjang Sisi (a)</option>
                        </select>
                    </div>
                    <div id="input-area-tetrahedron"></div>
                    <button type="button" onclick="hitung('tetrahedron')">Hitung</button>
                    <div id="hasil-tetrahedron" class="hasil"></div>`;
            break;
        case 'oktahedron':
             html = `<h3>Kalkulator Oktahedron</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-oktahedron">Hitung apa?</label>
                        <select id="pilihan-hitung-oktahedron" onchange="updateInput('oktahedron')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="sisi">Panjang Sisi (a)</option>
                        </select>
                    </div>
                    <div id="input-area-oktahedron"></div>
                    <button type="button" onclick="hitung('oktahedron')">Hitung</button>
                    <div id="hasil-oktahedron" class="hasil"></div>`;
            break;
        case 'dodekahedron':
             html = `<h3>Kalkulator Dodekahedron</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-dodekahedron">Hitung apa?</label>
                        <select id="pilihan-hitung-dodekahedron" onchange="updateInput('dodekahedron')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="sisi">Panjang Sisi (a)</option>
                        </select>
                    </div>
                    <div id="input-area-dodekahedron"></div>
                    <button type="button" onclick="hitung('dodekahedron')">Hitung</button>
                    <div id="hasil-dodekahedron" class="hasil"></div>`;
            break;
        case 'ikosahedron':
             html = `<h3>Kalkulator Ikosahedron</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-ikosahedron">Hitung apa?</label>
                        <select id="pilihan-hitung-ikosahedron" onchange="updateInput('ikosahedron')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="sisi">Panjang Sisi (a)</option>
                        </select>
                    </div>
                    <div id="input-area-ikosahedron"></div>
                    <button type="button" onclick="hitung('ikosahedron')">Hitung</button>
                    <div id="hasil-ikosahedron" class="hasil"></div>`;
            break;

        case 'tabung':
            html = `<h3>Kalkulator Tabung (Silinder)</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-tabung">Hitung apa?</label>
                        <select id="pilihan-hitung-tabung" onchange="updateInput('tabung')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="jari-jari">Jari-jari (r)</option>
                            <option value="tinggi">Tinggi (t)</option>
                        </select>
                    </div>
                    <div id="input-area-tabung"></div>
                    <button type="button" onclick="hitung('tabung')">Hitung</button>
                    <div id="hasil-tabung" class="hasil"></div>`;
            break;
        case 'kerucut':
            html = `<h3>Kalkulator Kerucut</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-kerucut">Hitung apa?</label>
                        <select id="pilihan-hitung-kerucut" onchange="updateInput('kerucut')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="jari-jari">Jari-jari (r)</option>
                            <option value="tinggi">Tinggi (t)</option>
                            <option value="pelukis">Garis Pelukis (s)</option>
                        </select>
                    </div>
                    <div id="input-area-kerucut"></div>
                    <button type="button" onclick="hitung('kerucut')">Hitung</button>
                    <div id="hasil-kerucut" class="hasil"></div>`;
            break;
        case 'bola':
            html = `<h3>Kalkulator Bola</h3>
                     <div class="input-group">
                        <label for="pilihan-hitung-bola">Hitung apa?</label>
                        <select id="pilihan-hitung-bola" onchange="updateInput('bola')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="jari-jari">Jari-jari (r)</option>
                            <option value="diameter">Diameter (d)</option>
                        </select>
                    </div>
                    <div id="input-area-bola"></div>
                    <button type="button" onclick="hitung('bola')">Hitung</button>
                    <div id="hasil-bola" class="hasil"></div>`;
            break;
        case 'torus':
             html = `<h3>Kalkulator Torus</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-torus">Hitung apa?</label>
                        <select id="pilihan-hitung-torus" onchange="updateInput('torus')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="mayor">Jari-jari Mayor (R)</option>
                            <option value="minor">Jari-jari Minor (r)</option>
                        </select>
                    </div>
                    <div id="input-area-torus"></div>
                    <button type="button" onclick="hitung('torus')">Hitung</button>
                    <div id="hasil-torus" class="hasil"></div>`;
            break;

        case 'kerucut-terpancung':
             html = `<h3>Kalkulator Kerucut Terpancung (Frustum)</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-kerucut-terpancung">Hitung apa?</label>
                        <select id="pilihan-hitung-kerucut-terpancung" onchange="updateInput('kerucut-terpancung')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="tinggi">Tinggi (t)</option>
                        </select>
                    </div>
                    <div id="input-area-kerucut-terpancung"></div>
                    <button type="button" onclick="hitung('kerucut-terpancung')">Hitung</button>
                    <div id="hasil-kerucut-terpancung" class="hasil"></div>`;
            break;
        case 'tembereng-bola':
             html = `<h3>Kalkulator Tembereng Bola</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-tembereng-bola">Hitung apa?</label>
                        <select id="pilihan-hitung-tembereng-bola" onchange="updateInput('tembereng-bola')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="tinggi">Tinggi Tembereng (t)</option>
                        </select>
                    </div>
                    <div id="input-area-tembereng-bola"></div>
                    <button type="button" onclick="hitung('tembereng-bola')">Hitung</button>
                    <div id="hasil-tembereng-bola" class="hasil"></div>`;
            break;
        case 'tabung-terpancung':
            html = `<h3>Kalkulator Tabung Terpancung</h3>
                    <div class="input-group">
                        <label for="pilihan-hitung-tabung-terpancung">Hitung apa?</label>
                        <select id="pilihan-hitung-tabung-terpancung" onchange="updateInput('tabung-terpancung')">
                            <option value="volume-lp">Volume & Luas Permukaan</option>
                            <option value="jari-jari">Jari-jari (r)</option>
                            <option value="t1">Tinggi Terpendek (t1)</option>
                            <option value="t2">Tinggi Tertinggi (t2)</option>
                        </select>
                    </div>
                    <div id="input-area-tabung-terpancung"></div>
                    <button type="button" onclick="hitung('tabung-terpancung')">Hitung</button>
                    <div id="hasil-tabung-terpancung" class="hasil"></div>`;
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
    const mode = modeSelector ? modeSelector.value : 'volume-lp';
    const inputArea = document.getElementById(`input-area-${shape}`);
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

    switch (shape) {
        case 'kubus':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="sisi-kubus">Sisi (s):</label><input type="number" id="sisi-kubus" min="0" step="any"></div>`;
            } else if (mode === 'sisi') {
                inputHtml = `<div class="input-group"><label for="volume-kubus">Volume (V):</label><input type="number" id="volume-kubus" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="lp-kubus">Luas Permukaan (LP):</label><input type="number" id="lp-kubus" min="0" step="any"></div>`;
            } else if (mode === 'diagonal-bidang') {
                inputHtml = `<div class="input-group"><label for="sisi-kubus">Sisi (s):</label><input type="number" id="sisi-kubus" min="0" step="any"></div>`;
            } else if (mode === 'diagonal-ruang') {
                inputHtml = `<div class="input-group"><label for="sisi-kubus">Sisi (s):</label><input type="number" id="sisi-kubus" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'balok':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="panjang-balok">Panjang (p):</label><input type="number" id="panjang-balok" min="0" step="any"></div>
                             <div class="input-group"><label for="lebar-balok">Lebar (l):</label><input type="number" id="lebar-balok" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-balok">Tinggi (t):</label><input type="number" id="tinggi-balok" min="0" step="any"></div>`;
            } else if (mode === 'panjang' || mode === 'lebar' || mode === 'tinggi') {
                inputHtml = `<div class="input-group"><label for="volume-balok">Volume (V):</label><input type="number" id="volume-balok" min="0" step="any"></div>`;
                if (mode === 'panjang') {
                    inputHtml += `<div class="input-group"><label for="lebar-balok">Lebar (l):</label><input type="number" id="lebar-balok" min="0" step="any"></div>
                                  <div class="input-group"><label for="tinggi-balok">Tinggi (t):</label><input type="number" id="tinggi-balok" min="0" step="any"></div>`;
                } else if (mode === 'lebar') {
                    inputHtml += `<div class="input-group"><label for="panjang-balok">Panjang (p):</label><input type="number" id="panjang-balok" min="0" step="any"></div>
                                  <div class="input-group"><label for="tinggi-balok">Tinggi (t):</label><input type="number" id="tinggi-balok" min="0" step="any"></div>`;
                } else {
                    inputHtml += `<div class="input-group"><label for="panjang-balok">Panjang (p):</label><input type="number" id="panjang-balok" min="0" step="any"></div>
                                  <div class="input-group"><label for="lebar-balok">Lebar (l):</label><input type="number" id="lebar-balok" min="0" step="any"></div>`;
                }
            } else if (mode === 'diagonal-bidang') {
                inputHtml = `<div class="input-group"><label for="panjang-balok">Panjang (p):</label><input type="number" id="panjang-balok" min="0" step="any"></div>
                             <div class="input-group"><label for="lebar-balok">Lebar (l):</label><input type="number" id="lebar-balok" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-balok">Tinggi (t):</label><input type="number" id="tinggi-balok" min="0" step="any"></div>`;
            } else if (mode === 'diagonal-ruang') {
                inputHtml = `<div class="input-group"><label for="panjang-balok">Panjang (p):</label><input type="number" id="panjang-balok" min="0" step="any"></div>
                             <div class="input-group"><label for="lebar-balok">Lebar (l):</label><input type="number" id="lebar-balok" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-balok">Tinggi (t):</label><input type="number" id="tinggi-balok" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'prisma-poligon':
            inputHtml = `<div class="input-group"><label for="n-sisi-prisma">Jumlah Sisi Alas (n):</label><input type="number" id="n-sisi-prisma" min="3" step="1"></div>`;
            if (mode === 'volume-lp') {
                inputHtml += `<div class="input-group"><label for="sisi-alas-prisma">Panjang Sisi Alas (s):</label><input type="number" id="sisi-alas-prisma" min="0" step="any"></div>
                              <div class="input-group"><label for="tinggi-prisma">Tinggi Prisma (t):</label><input type="number" id="tinggi-prisma" min="0" step="any"></div>`;
            } else if (mode === 'tinggi') {
                inputHtml += `<div class="input-group"><label for="sisi-alas-prisma">Panjang Sisi Alas (s):</label><input type="number" id="sisi-alas-prisma" min="0" step="any"></div>
                              <div class="input-group"><label for="volume-prisma">Volume (V):</label><input type="number" id="volume-prisma" min="0" step="any"></div>`;
            } else if (mode === 'sisi-alas') {
                inputHtml += `<div class="input-group"><label for="volume-prisma">Volume (V):</label><input type="number" id="volume-prisma" min="0" step="any"></div>
                              <div class="input-group"><label for="tinggi-prisma">Tinggi Prisma (t):</label><input type="number" id="tinggi-prisma" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'limas-poligon':
            inputHtml = `<div class="input-group"><label for="n-sisi-limas">Jumlah Sisi Alas (n):</label><input type="number" id="n-sisi-limas" min="3" step="1"></div>`;
            if (mode === 'volume-lp') {
                inputHtml += `<div class="input-group"><label for="sisi-alas-limas">Panjang Sisi Alas (s):</label><input type="number" id="sisi-alas-limas" min="0" step="any"></div>
                              <div class="input-group"><label for="tinggi-limas">Tinggi Limas (t):</label><input type="number" id="tinggi-limas" min="0" step="any"></div>
                              <div class="input-group"><label for="tinggi-miring-limas">Tinggi Miring Sisi Tegak (ts):</label><input type="number" id="tinggi-miring-limas" min="0" step="any"></div>`;
            } else if (mode === 'tinggi') {
                inputHtml += `<div class="input-group"><label for="luas-alas-limas">Luas Alas (A):</label><input type="number" id="luas-alas-limas" min="0" step="any"></div>
                              <div class="input-group"><label for="volume-limas">Volume (V):</label><input type="number" id="volume-limas" min="0" step="any"></div>`;
            } else if (mode === 'luas-alas') {
                inputHtml += `<div class="input-group"><label for="volume-limas">Volume (V):</label><input type="number" id="volume-limas" min="0" step="any"></div>
                              <div class="input-group"><label for="tinggi-limas">Tinggi Limas (t):</label><input type="number" id="tinggi-limas" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'piramida-terpancung':
            inputHtml = `<div class="input-group"><label for="n-sisi-frustum">Jumlah Sisi Alas (n):</label><input type="number" id="n-sisi-frustum" min="3" step="1"></div>`;
            if (mode === 'volume-lp') {
                inputHtml += `<div class="input-group"><label for="sisi-alas1-frustum">Panjang Sisi Alas Atas (s1):</label><input type="number" id="sisi-alas1-frustum" min="0" step="any"></div>
                              <div class="input-group"><label for="sisi-alas2-frustum">Panjang Sisi Alas Bawah (s2):</label><input type="number" id="sisi-alas2-frustum" min="0" step="any"></div>
                              <div class="input-group"><label for="tinggi-frustum">Tinggi (t):</label><input type="number" id="tinggi-frustum" min="0" step="any"></div>
                              <div class="input-group"><label for="pelukis-frustum">Garis Pelukis Miring (s):</label><input type="number" id="pelukis-frustum" min="0" step="any"></div>`;
            } else if (mode === 'tinggi') {
                inputHtml += `<div class="input-group"><label for="luas-alas1-frustum">Luas Alas Atas (A1):</label><input type="number" id="luas-alas1-frustum" min="0" step="any"></div>
                              <div class="input-group"><label for="luas-alas2-frustum">Luas Alas Bawah (A2):</label><input type="number" id="luas-alas2-frustum" min="0" step="any"></div>
                              <div class="input-group"><label for="volume-frustum">Volume (V):</label><input type="number" id="volume-frustum" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'tetrahedron':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="sisi-tetra">Panjang Sisi (a):</label><input type="number" id="sisi-tetra" min="0" step="any"></div>`;
            } else if (mode === 'sisi') {
                inputHtml = `<div class="input-group"><label for="volume-tetra">Volume (V):</label><input type="number" id="volume-tetra" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="lp-tetra">Luas Permukaan (LP):</label><input type="number" id="lp-tetra" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'oktahedron':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="sisi-okta">Panjang Sisi (a):</label><input type="number" id="sisi-okta" min="0" step="any"></div>`;
            } else if (mode === 'sisi') {
                inputHtml = `<div class="input-group"><label for="volume-okta">Volume (V):</label><input type="number" id="volume-okta" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="lp-okta">Luas Permukaan (LP):</label><input type="number" id="lp-okta" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'dodekahedron':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="sisi-dodeka">Panjang Sisi (a):</label><input type="number" id="sisi-dodeka" min="0" step="any"></div>`;
            } else if (mode === 'sisi') {
                inputHtml = `<div class="input-group"><label for="volume-dodeka">Volume (V):</label><input type="number" id="volume-dodeka" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="lp-dodeka">Luas Permukaan (LP):</label><input type="number" id="lp-dodeka" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'ikosahedron':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="sisi-ikosa">Panjang Sisi (a):</label><input type="number" id="sisi-ikosa" min="0" step="any"></div>`;
            } else if (mode === 'sisi') {
                inputHtml = `<div class="input-group"><label for="volume-ikosa">Volume (V):</label><input type="number" id="volume-ikosa" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="lp-ikosa">Luas Permukaan (LP):</label><input type="number" id="lp-ikosa" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'tabung':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="jari-tabung">Jari-jari (r):</label><input type="number" id="jari-tabung" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-tabung">Tinggi (t):</label><input type="number" id="tinggi-tabung" min="0" step="any"></div>`;
            } else if (mode === 'jari-jari') {
                inputHtml = `<div class="input-group"><label for="volume-tabung">Volume (V):</label><input type="number" id="volume-tabung" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-tabung">Tinggi (t):</label><input type="number" id="tinggi-tabung" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="lp-tabung">Luas Permukaan (LP):</label><input type="number" id="lp-tabung" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-lp-tabung">Tinggi (t):</label><input type="number" id="tinggi-lp-tabung" min="0" step="any"></div>`;
            } else if (mode === 'tinggi') {
                inputHtml = `<div class="input-group"><label for="jari-tabung">Jari-jari (r):</label><input type="number" id="jari-tabung" min="0" step="any"></div>
                             <div class="input-group"><label for="volume-tabung">Volume (V):</label><input type="number" id="volume-tabung" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="lp-tabung">Luas Permukaan (LP):</label><input type="number" id="lp-tabung" min="0" step="any"></div>
                             <div class="input-group"><label for="jari-lp-tabung">Jari-jari (r):</label><input type="number" id="jari-lp-tabung" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'kerucut':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="jari-kerucut">Jari-jari (r):</label><input type="number" id="jari-kerucut" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-kerucut">Tinggi (t):</label><input type="number" id="tinggi-kerucut" min="0" step="any"></div>`;
            } else if (mode === 'jari-jari') {
                inputHtml = `<div class="input-group"><label for="volume-kerucut">Volume (V):</label><input type="number" id="volume-kerucut" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-kerucut">Tinggi (t):</label><input type="number" id="tinggi-kerucut" min="0" step="any"></div>`;
            } else if (mode === 'tinggi') {
                inputHtml = `<div class="input-group"><label for="jari-kerucut">Jari-jari (r):</label><input type="number" id="jari-kerucut" min="0" step="any"></div>
                             <div class="input-group"><label for="volume-kerucut">Volume (V):</label><input type="number" id="volume-kerucut" min="0" step="any"></div>`;
            } else if (mode === 'pelukis') {
                inputHtml = `<div class="input-group"><label for="jari-kerucut">Jari-jari (r):</label><input type="number" id="jari-kerucut" min="0" step="any"></div>
                             <div class="input-group"><label for="tinggi-kerucut">Tinggi (t):</label><input type="number" id="tinggi-kerucut" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'bola':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="jari-bola">Jari-jari (r):</label><input type="number" id="jari-bola" min="0" step="any"></div>`;
            } else if (mode === 'jari-jari') {
                inputHtml = `<div class="input-group"><label for="volume-bola">Volume (V):</label><input type="number" id="volume-bola" min="0" step="any"></div>
                             <p>Atau</p>
                             <div class="input-group"><label for="lp-bola">Luas Permukaan (LP):</label><input type="number" id="lp-bola" min="0" step="any"></div>`;
            } else if (mode === 'diameter') {
                 inputHtml = `<div class="input-group"><label for="volume-bola">Volume (V):</label><input type="number" id="volume-bola" min="0" step="any"></div>
                              <p>Atau</p>
                              <div class="input-group"><label for="lp-bola">Luas Permukaan (LP):</label><input type="number" id="lp-bola" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'torus':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="mayor-torus">Jari-jari Mayor (R):</label><input type="number" id="mayor-torus" min="0" step="any"></div>
                             <div class="input-group"><label for="minor-torus">Jari-jari Minor (r):</label><input type="number" id="minor-torus" min="0" step="any"></div>`;
            } else if (mode === 'mayor') {
                inputHtml = `<div class="input-group"><label for="volume-torus">Volume (V):</label><input type="number" id="volume-torus" min="0" step="any"></div>
                             <div class="input-group"><label for="minor-torus">Jari-jari Minor (r):</label><input type="number" id="minor-torus" min="0" step="any"></div>`;
            } else if (mode === 'minor') {
                inputHtml = `<div class="input-group"><label for="volume-torus">Volume (V):</label><input type="number" id="volume-torus" min="0" step="any"></div>
                             <div class="input-group"><label for="mayor-torus">Jari-jari Mayor (R):</label><input type="number" id="mayor-torus" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'kerucut-terpancung':
            inputHtml = `<div class="input-group"><label for="jari1-frustum-kerucut">Jari-jari Atas (r1):</label><input type="number" id="jari1-frustum-kerucut" min="0" step="any"></div>
                         <div class="input-group"><label for="jari2-frustum-kerucut">Jari-jari Bawah (r2):</label><input type="number" id="jari2-frustum-kerucut" min="0" step="any"></div>
                         <div class="input-group"><label for="pelukis-frustum-kerucut">Garis Pelukis (s):</label><input type="number" id="pelukis-frustum-kerucut" min="0" step="any"></div>`;
            if (mode === 'volume-lp') {
                inputHtml += `<div class="input-group"><label for="tinggi-frustum-kerucut">Tinggi (t):</label><input type="number" id="tinggi-frustum-kerucut" min="0" step="any"></div>`;
            } else if (mode === 'tinggi') {
                inputHtml += `<div class="input-group"><label for="volume-frustum-kerucut">Volume (V):</label><input type="number" id="volume-frustum-kerucut" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'tembereng-bola':
            inputHtml = `<div class="input-group"><label for="jari-bola-tembereng">Jari-jari Bola (R):</label><input type="number" id="jari-bola-tembereng" min="0" step="any"></div>`;
            if (mode === 'volume-lp') {
                inputHtml += `<div class="input-group"><label for="tinggi-tembereng">Tinggi Tembereng (t):</label><input type="number" id="tinggi-tembereng" min="0" step="any"></div>`;
            } else if (mode === 'tinggi') {
                inputHtml += `<div class="input-group"><label for="volume-tembereng">Volume (V):</label><input type="number" id="volume-tembereng" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
        case 'tabung-terpancung':
            if (mode === 'volume-lp') {
                inputHtml = `<div class="input-group"><label for="jari-tabung-miring">Jari-jari (r):</label><input type="number" id="jari-tabung-miring" min="0" step="any"></div>
                             <div class="input-group"><label for="t1-tabung-miring">Tinggi Terpendek (t1):</label><input type="number" id="t1-tabung-miring" min="0" step="any"></div>
                             <div class="input-group"><label for="t2-tabung-miring">Tinggi Tertinggi (t2):</label><input type="number" id="t2-tabung-miring" min="0" step="any"></div>
                             <div class="input-group"><label for="lebar-miring-tabung">Lebar Miring Alas (w):</label><input type="number" id="lebar-miring-tabung" min="0" step="any"></div>`;
            } else if (mode === 'jari-jari') {
                inputHtml = `<div class="input-group"><label for="volume-tabung-miring">Volume (V):</label><input type="number" id="volume-tabung-miring" min="0" step="any"></div>
                             <div class="input-group"><label for="t1-tabung-miring">Tinggi Terpendek (t1):</label><input type="number" id="t1-tabung-miring" min="0" step="any"></div>
                             <div class="input-group"><label for="t2-tabung-miring">Tinggi Tertinggi (t2):</label><input type="number" id="t2-tabung-miring" min="0" step="any"></div>`;
            } else if (mode === 't1') {
                inputHtml = `<div class="input-group"><label for="volume-tabung-miring">Volume (V):</label><input type="number" id="volume-tabung-miring" min="0" step="any"></div>
                             <div class="input-group"><label for="jari-tabung-miring">Jari-jari (r):</label><input type="number" id="jari-tabung-miring" min="0" step="any"></div>
                             <div class="input-group"><label for="t2-tabung-miring">Tinggi Tertinggi (t2):</label><input type="number" id="t2-tabung-miring" min="0" step="any"></div>`;
            } else if (mode === 't2') {
                inputHtml = `<div class="input-group"><label for="volume-tabung-miring">Volume (V):</label><input type="number" id="volume-tabung-miring" min="0" step="any"></div>
                             <div class="input-group"><label for="jari-tabung-miring">Jari-jari (r):</label><input type="number" id="jari-tabung-miring" min="0" step="any"></div>
                             <div class="input-group"><label for="t1-tabung-miring">Tinggi Terpendek (t1):</label><input type="number" id="t1-tabung-miring" min="0" step="any"></div>`;
            }
            inputHtml += unitOptions; 
            break;
    }

    inputArea.innerHTML = inputHtml;

    setupEnterListener(shape);
}


function hitung(shape) {
    const modeSelector = document.getElementById(`pilihan-hitung-${shape}`);
    const mode = modeSelector ? modeSelector.value : 'volume-lp';
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
            return NaN;
        }
        
        if (element.value === '') {
            return null;
        }
        
        return value;
    };

    try {
        switch (shape) {
            case 'kubus':
                if (mode === 'volume-lp') {
                    const s = getInput('sisi-kubus', 'Sisi (s)');
                    if (s === null) throw new Error("Sisi (s) harus diisi.");
                    const V = Math.pow(s, 3);
                    const LP = 6 * Math.pow(s, 2);
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'sisi') {
                    const V = getInput('volume-kubus', 'Volume (V)');
                    const LP = getInput('lp-kubus', 'Luas Permukaan (LP)');
                    let s;
                    let source = '';

                    if (V !== null && !isNaN(V)) {
                        s = Math.cbrt(V);
                        source = 'dari Volume';
                    } else if (LP !== null && !isNaN(LP)) {
                        s = Math.sqrt(LP / 6);
                        source = 'dari Luas Permukaan';
                    } else {
                        throw new Error("Masukkan salah satu nilai: Volume atau Luas Permukaan.");
                    }
                    results.push({ label: `Panjang Sisi (s) ${source}`, value: formatNumber(s), unit: unit });
                } else if (mode === 'diagonal-bidang') {
                    const s = getInput('sisi-kubus', 'Sisi (s)');
                    if (s === null) throw new Error("Sisi (s) harus diisi.");
                    const dB = s * Math.sqrt(2);
                    results.push({ label: 'Diagonal Bidang', value: formatNumber(dB), unit: unit });
                } else if (mode === 'diagonal-ruang') {
                    const s = getInput('sisi-kubus', 'Sisi (s)');
                    if (s === null) throw new Error("Sisi (s) harus diisi.");
                    const dR = s * Math.sqrt(3);
                    results.push({ label: 'Diagonal Ruang', value: formatNumber(dR), unit: unit });
                }
                break;
            case 'balok':
                const p_b = getInput('panjang-balok', 'Panjang (p)');
                const l_b = getInput('lebar-balok', 'Lebar (l)');
                const t_b = getInput('tinggi-balok', 'Tinggi (t)');
                const V_b_val = getInput('volume-balok', 'Volume (V)');
                
                if (mode === 'volume-lp') {
                    if (p_b === null || l_b === null || t_b === null) throw new Error("Panjang, lebar, dan tinggi harus diisi.");
                    const V = p_b * l_b * t_b;
                    const LP = 2 * (p_b * l_b + p_b * t_b + l_b * t_b);
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'panjang') {
                    if (V_b_val === null || l_b === null || t_b === null) throw new Error("Volume, lebar, dan tinggi harus diisi.");
                    const p = V_b_val / (l_b * t_b);
                    results.push({ label: 'Panjang (p)', value: formatNumber(p), unit: unit });
                } else if (mode === 'lebar') {
                    if (V_b_val === null || p_b === null || t_b === null) throw new Error("Volume, panjang, dan tinggi harus diisi.");
                    const l = V_b_val / (p_b * t_b);
                    results.push({ label: 'Lebar (l)', value: formatNumber(l), unit: unit });
                } else if (mode === 'tinggi') {
                    if (V_b_val === null || p_b === null || l_b === null) throw new Error("Volume, panjang, dan lebar harus diisi.");
                    const t = V_b_val / (p_b * l_b);
                    results.push({ label: 'Tinggi (t)', value: formatNumber(t), unit: unit });
                } else if (mode === 'diagonal-bidang') {
                     if (p_b === null || l_b === null || t_b === null) throw new Error("Panjang, lebar, dan tinggi harus diisi.");
                     const dB_pl = Math.sqrt(p_b**2 + l_b**2);
                     const dB_pt = Math.sqrt(p_b**2 + t_b**2);
                     const dB_lt = Math.sqrt(l_b**2 + t_b**2);
                     results.push({ label: 'Diagonal Bidang (p-l)', value: formatNumber(dB_pl), unit: unit });
                     results.push({ label: 'Diagonal Bidang (p-t)', value: formatNumber(dB_pt), unit: unit });
                     results.push({ label: 'Diagonal Bidang (l-t)', value: formatNumber(dB_lt), unit: unit });
                } else if (mode === 'diagonal-ruang') {
                    if (p_b === null || l_b === null || t_b === null) throw new Error("Panjang, lebar, dan tinggi harus diisi.");
                    const dR = Math.sqrt(p_b**2 + l_b**2 + t_b**2);
                    results.push({ label: 'Diagonal Ruang', value: formatNumber(dR), unit: unit });
                }
                break;
            case 'prisma-poligon':
                const n_p = getInput('n-sisi-prisma', 'Jumlah Sisi Alas (n)');
                const s_alas_p = getInput('sisi-alas-prisma', 'Panjang Sisi Alas (s)');
                const t_p = getInput('tinggi-prisma', 'Tinggi Prisma (t)');
                const V_p_val = getInput('volume-prisma', 'Volume (V)');
                
                if (n_p === null) throw new Error("Jumlah Sisi Alas (n) harus diisi.");
                if (n_p < 3) throw new Error("Jumlah Sisi Alas (n) minimal 3.");
                
                const luasAlasP = (n_p * s_alas_p**2) / (4 * Math.tan(PI / n_p));
                const kelilingAlasP = n_p * s_alas_p;

                if (mode === 'volume-lp') {
                    if (s_alas_p === null || t_p === null) throw new Error("Panjang sisi alas dan tinggi prisma harus diisi.");
                    const V = luasAlasP * t_p;
                    const LP = 2 * luasAlasP + kelilingAlasP * t_p;
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'tinggi') {
                    if (s_alas_p === null || V_p_val === null) throw new Error("Panjang sisi alas dan Volume harus diisi.");
                    if (luasAlasP === 0) throw new Error("Luas alas tidak boleh nol.");
                    const t = V_p_val / luasAlasP;
                    results.push({ label: 'Tinggi Prisma (t)', value: formatNumber(t), unit: unit });
                } else if (mode === 'sisi-alas') {
                    if (t_p === null || V_p_val === null) throw new Error("Tinggi Prisma dan Volume harus diisi.");
                    const s_sq = (V_p_val * 4 * Math.tan(PI / n_p)) / (n_p * t_p);
                    if (s_sq < 0) throw new Error("Perhitungan sisi alas menghasilkan nilai negatif.");
                    const s = Math.sqrt(s_sq);
                    results.push({ label: 'Panjang Sisi Alas (s)', value: formatNumber(s), unit: unit });
                }
                break;
            case 'limas-poligon':
                const n_l = getInput('n-sisi-limas', 'Jumlah Sisi Alas (n)');
                const s_l = getInput('sisi-alas-limas', 'Panjang Sisi Alas (s)');
                const t_l = getInput('tinggi-limas', 'Tinggi Limas (t)');
                const ts_l = getInput('tinggi-miring-limas', 'Tinggi Miring Sisi Tegak (ts)');
                const luas_alas_l = getInput('luas-alas-limas', 'Luas Alas (A)');
                const V_l_val = getInput('volume-limas', 'Volume (V)');
                
                if (n_l === null) throw new Error("Jumlah Sisi Alas (n) harus diisi.");
                if (n_l < 3) throw new Error("Jumlah Sisi Alas (n) minimal 3.");

                let A_l = luas_alas_l;
                if (s_l !== null) {
                    A_l = (n_l * s_l**2) / (4 * Math.tan(PI / n_l));
                }

                if (mode === 'volume-lp') {
                    if (A_l === null || t_l === null || s_l === null || ts_l === null) throw new Error("Luas alas (atau sisi s), tinggi limas, dan tinggi miring harus diisi.");
                    const V = (1/3) * A_l * t_l;
                    const luas_sisi_tegak = n_l * (1/2) * s_l * ts_l;
                    const LP = A_l + luas_sisi_tegak;
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'tinggi') {
                    if (luas_alas_l === null || V_l_val === null) throw new Error("Luas alas dan Volume harus diisi.");
                    if (luas_alas_l === 0) throw new Error("Luas alas tidak boleh nol.");
                    const t = (3 * V_l_val) / luas_alas_l;
                    results.push({ label: 'Tinggi Limas (t)', value: formatNumber(t), unit: unit });
                } else if (mode === 'luas-alas') {
                    if (t_l === null || V_l_val === null) throw new Error("Tinggi Limas dan Volume harus diisi.");
                    if (t_l === 0) throw new Error("Tinggi limas tidak boleh nol.");
                    const A = (3 * V_l_val) / t_l;
                    results.push({ label: 'Luas Alas (A)', value: formatNumber(A), unit: unit });
                }
                break;
            case 'piramida-terpancung':
                 const n_frustum = getInput('n-sisi-frustum', 'Jumlah Sisi Alas (n)');
                 const s1_frustum = getInput('sisi-alas1-frustum', 'Panjang Sisi Alas Atas (s1)');
                 const s2_frustum = getInput('sisi-alas2-frustum', 'Panjang Sisi Alas Bawah (s2)');
                 const t_frustum = getInput('tinggi-frustum', 'Tinggi (t)');
                 const s_frustum = getInput('pelukis-frustum', 'Garis Pelukis Miring (s)');
                 const a1_frustum = getInput('luas-alas1-frustum', 'Luas Alas Atas (A1)');
                 const a2_frustum = getInput('luas-alas2-frustum', 'Luas Alas Bawah (A2)');
                 const V_frustum_val = getInput('volume-frustum', 'Volume (V)');
                 
                 if (n_frustum === null) throw new Error("Jumlah Sisi Alas (n) harus diisi.");
                 if (n_frustum < 3) throw new Error("Jumlah Sisi Alas (n) minimal 3.");

                 let A1_f = a1_frustum;
                 let A2_f = a2_frustum;
                 if (s1_frustum !== null) A1_f = (n_frustum * s1_frustum**2) / (4 * Math.tan(PI / n_frustum));
                 if (s2_frustum !== null) A2_f = (n_frustum * s2_frustum**2) / (4 * Math.tan(PI / n_frustum));

                 if (A1_f === null || A2_f === null) throw new Error("Luas Alas Atas (A1) dan Bawah (A2) harus diisi atau hitung dari s1/s2.");

                 if (mode === 'volume-lp') {
                     if (t_frustum === null || s_frustum === null || s1_frustum === null || s2_frustum === null) throw new Error("Tinggi (t), garis pelukis (s), s1, dan s2 harus diisi.");
                     const V = (t_frustum / 3) * (A1_f + A2_f + Math.sqrt(A1_f * A2_f));
                     const keliling1 = n_frustum * s1_frustum;
                     const keliling2 = n_frustum * s2_frustum;
                     const luas_sisi_miring = ((keliling1 + keliling2) / 2) * s_frustum;
                     const LP = A1_f + A2_f + luas_sisi_miring;
                     results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                     results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                 } else if (mode === 'tinggi') {
                     if (V_frustum_val === null || A1_f === null || A2_f === null) throw new Error("Volume (V), A1, dan A2 harus diisi.");
                     const denom = A1_f + A2_f + Math.sqrt(A1_f * A2_f);
                     if (denom === 0) throw new Error("Pembagi nol. Luas alas tidak boleh nol bersamaan.");
                     const t = (3 * V_frustum_val) / denom;
                     results.push({ label: 'Tinggi (t)', value: formatNumber(t), unit: unit });
                 }
                break;
            case 'tetrahedron':
                const a_tetra = getInput('sisi-tetra', 'Panjang Sisi (a)');
                const V_tetra_val = getInput('volume-tetra', 'Volume (V)');
                const LP_tetra_val = getInput('lp-tetra', 'Luas Permukaan (LP)');

                if (mode === 'volume-lp') {
                    if (a_tetra === null) throw new Error("Panjang Sisi (a) harus diisi.");
                    const V = (a_tetra**3) / (6 * Math.sqrt(2));
                    const LP = a_tetra**2 * Math.sqrt(3);
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'sisi') {
                    let a;
                    let source = '';
                    if (V_tetra_val !== null && !isNaN(V_tetra_val)) {
                        a = Math.cbrt(V_tetra_val * 6 * Math.sqrt(2));
                        source = 'dari Volume';
                    } else if (LP_tetra_val !== null && !isNaN(LP_tetra_val)) {
                        a = Math.sqrt(LP_tetra_val / Math.sqrt(3));
                        source = 'dari Luas Permukaan';
                    } else {
                        throw new Error("Masukkan salah satu nilai: Volume atau Luas Permukaan.");
                    }
                    results.push({ label: `Panjang Sisi (a) ${source}`, value: formatNumber(a), unit: unit });
                }
                break;
            case 'oktahedron':
                const a_okta = getInput('sisi-okta', 'Panjang Sisi (a)');
                const V_okta_val = getInput('volume-okta', 'Volume (V)');
                const LP_okta_val = getInput('lp-okta', 'Luas Permukaan (LP)');

                if (mode === 'volume-lp') {
                    if (a_okta === null) throw new Error("Panjang Sisi (a) harus diisi.");
                    const V = (a_okta**3 * Math.sqrt(2)) / 3;
                    const LP = 2 * a_okta**2 * Math.sqrt(3);
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'sisi') {
                    let a;
                    let source = '';
                    if (V_okta_val !== null && !isNaN(V_okta_val)) {
                        a = Math.cbrt((V_okta_val * 3) / Math.sqrt(2));
                        source = 'dari Volume';
                    } else if (LP_okta_val !== null && !isNaN(LP_okta_val)) {
                        a = Math.sqrt(LP_okta_val / (2 * Math.sqrt(3)));
                        source = 'dari Luas Permukaan';
                    } else {
                        throw new Error("Masukkan salah satu nilai: Volume atau Luas Permukaan.");
                    }
                    results.push({ label: `Panjang Sisi (a) ${source}`, value: formatNumber(a), unit: unit });
                }
                break;
            case 'dodekahedron':
                const a_dodeka = getInput('sisi-dodeka', 'Panjang Sisi (a)');
                const V_dodeka_val = getInput('volume-dodeka', 'Volume (V)');
                const LP_dodeka_val = getInput('lp-dodeka', 'Luas Permukaan (LP)');
                const phi = (1 + Math.sqrt(5)) / 2; 

                if (mode === 'volume-lp') {
                    if (a_dodeka === null) throw new Error("Panjang Sisi (a) harus diisi.");
                    const V = (a_dodeka**3 * (15 + 7 * Math.sqrt(5))) / 4;
                    const LP = 3 * a_dodeka**2 * Math.sqrt(25 + 10 * Math.sqrt(5));
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'sisi') {
                    let a;
                    let source = '';
                    if (V_dodeka_val !== null && !isNaN(V_dodeka_val)) {
                        a = Math.cbrt((V_dodeka_val * 4) / (15 + 7 * Math.sqrt(5)));
                        source = 'dari Volume';
                    } else if (LP_dodeka_val !== null && !isNaN(LP_dodeka_val)) {
                        a = Math.sqrt(LP_dodeka_val / (3 * Math.sqrt(25 + 10 * Math.sqrt(5))));
                        source = 'dari Luas Permukaan';
                    } else {
                        throw new Error("Masukkan salah satu nilai: Volume atau Luas Permukaan.");
                    }
                    results.push({ label: `Panjang Sisi (a) ${source}`, value: formatNumber(a), unit: unit });
                }
                break;
            case 'ikosahedron':
                const a_ikosa = getInput('sisi-ikosa', 'Panjang Sisi (a)');
                const V_ikosa_val = getInput('volume-ikosa', 'Volume (V)');
                const LP_ikosa_val = getInput('lp-ikosa', 'Luas Permukaan (LP)');

                if (mode === 'volume-lp') {
                    if (a_ikosa === null) throw new Error("Panjang Sisi (a) harus diisi.");
                    const V = (5 * a_ikosa**3 * (3 + Math.sqrt(5))) / 12;
                    const LP = 5 * a_ikosa**2 * Math.sqrt(3);
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'sisi') {
                    let a;
                    let source = '';
                    if (V_ikosa_val !== null && !isNaN(V_ikosa_val)) {
                        a = Math.cbrt((V_ikosa_val * 12) / (5 * (3 + Math.sqrt(5))));
                        source = 'dari Volume';
                    } else if (LP_ikosa_val !== null && !isNaN(LP_ikosa_val)) {
                        a = Math.sqrt(LP_ikosa_val / (5 * Math.sqrt(3)));
                        source = 'dari Luas Permukaan';
                    } else {
                        throw new Error("Masukkan salah satu nilai: Volume atau Luas Permukaan.");
                    }
                    results.push({ label: `Panjang Sisi (a) ${source}`, value: formatNumber(a), unit: unit });
                }
                break;
            case 'tabung':
                const r_tabung = getInput('jari-tabung', 'Jari-jari (r)');
                const t_tabung = getInput('tinggi-tabung', 'Tinggi (t)');
                const V_tabung_val = getInput('volume-tabung', 'Volume (V)');
                const LP_tabung_val = getInput('lp-tabung', 'Luas Permukaan (LP)');
                const r_lp_tabung = getInput('jari-lp-tabung', 'Jari-jari LP (r)');
                const t_lp_tabung = getInput('tinggi-lp-tabung', 'Tinggi LP (t)');

                if (mode === 'volume-lp') {
                    if (r_tabung === null || t_tabung === null) throw new Error("Jari-jari dan tinggi harus diisi.");
                    const V = PI * Math.pow(r_tabung, 2) * t_tabung;
                    const LP = 2 * PI * r_tabung * (r_tabung + t_tabung);
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'jari-jari') {
                    let r;
                    let source = '';
                    if (V_tabung_val !== null && !isNaN(V_tabung_val) && t_tabung !== null && !isNaN(t_tabung)) {
                        if (t_tabung === 0) throw new Error("Tinggi tidak boleh nol untuk mencari jari-jari dari Volume.");
                        r = Math.sqrt(V_tabung_val / (PI * t_tabung));
                        source = 'dari Volume';
                    } else if (LP_tabung_val !== null && !isNaN(LP_tabung_val) && t_lp_tabung !== null && !isNaN(t_lp_tabung)) {
                        const a_q = 2 * PI;
                        const b_q = 2 * PI * t_lp_tabung;
                        const c_q = -LP_tabung_val;
                        const diskriminan = b_q**2 - 4 * a_q * c_q;

                        if (diskriminan < 0) throw new Error("Luas Permukaan dan Tinggi tidak konsisten (Diskriminan < 0).");

                        r = (-b_q + Math.sqrt(diskriminan)) / (2 * a_q); 
                        source = 'dari Luas Permukaan';
                    } else {
                        throw new Error("Masukkan Volume dan Tinggi, ATAU Luas Permukaan dan Tinggi.");
                    }
                    results.push({ label: `Jari-jari (r) ${source}`, value: formatNumber(r), unit: unit });
                } else if (mode === 'tinggi') {
                    let t;
                    let source = '';
                    if (V_tabung_val !== null && !isNaN(V_tabung_val) && r_tabung !== null && !isNaN(r_tabung)) {
                        if (r_tabung === 0) throw new Error("Jari-jari tidak boleh nol untuk mencari tinggi dari Volume.");
                        t = V_tabung_val / (PI * Math.pow(r_tabung, 2));
                        source = 'dari Volume';
                    } else if (LP_tabung_val !== null && !isNaN(LP_tabung_val) && r_lp_tabung !== null && !isNaN(r_lp_tabung)) {
                        if (r_lp_tabung === 0) throw new Error("Jari-jari tidak boleh nol untuk mencari tinggi dari Luas Permukaan.");
                        t = (LP_tabung_val - 2 * PI * Math.pow(r_lp_tabung, 2)) / (2 * PI * r_lp_tabung);
                        source = 'dari Luas Permukaan';
                        if (t < 0) throw new Error("Hasil tinggi negatif. Luas Permukaan lebih kecil dari 2x Luas Alas.");
                    } else {
                        throw new Error("Masukkan Volume dan Jari-jari, ATAU Luas Permukaan dan Jari-jari.");
                    }
                    results.push({ label: `Tinggi (t) ${source}`, value: formatNumber(t), unit: unit });
                }
                break;
            case 'kerucut':
                const r_kerucut = getInput('jari-kerucut', 'Jari-jari (r)');
                const t_kerucut = getInput('tinggi-kerucut', 'Tinggi (t)');
                const s_kerucut_val = getInput('pelukis-kerucut', 'Garis Pelukis (s)');
                const V_kerucut_val = getInput('volume-kerucut', 'Volume (V)');

                let s_calc = (r_kerucut !== null && t_kerucut !== null) ? Math.sqrt(r_kerucut**2 + t_kerucut**2) : null;
                
                if (mode === 'volume-lp') {
                    if (r_kerucut === null || t_kerucut === null) throw new Error("Jari-jari dan tinggi harus diisi.");
                    const V = (1/3) * PI * Math.pow(r_kerucut, 2) * t_kerucut;
                    const s = s_calc;
                    const LP = PI * r_kerucut * (r_kerucut + s);
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'jari-jari') {
                    if (V_kerucut_val === null || t_kerucut === null) throw new Error("Volume dan tinggi harus diisi.");
                    if (t_kerucut === 0) throw new Error("Tinggi tidak boleh nol.");
                    const r = Math.sqrt((3 * V_kerucut_val) / (PI * t_kerucut));
                    results.push({ label: 'Jari-jari (r)', value: formatNumber(r), unit: unit });
                } else if (mode === 'tinggi') {
                    if (V_kerucut_val === null || r_kerucut === null) throw new Error("Volume dan jari-jari harus diisi.");
                    if (r_kerucut === 0) throw new Error("Jari-jari tidak boleh nol.");
                    const t = (3 * V_kerucut_val) / (PI * Math.pow(r_kerucut, 2));
                    results.push({ label: 'Tinggi (t)', value: formatNumber(t), unit: unit });
                } else if (mode === 'pelukis') {
                    if (r_kerucut === null || t_kerucut === null) throw new Error("Jari-jari dan tinggi harus diisi.");
                    if (s_calc === null) throw new Error("Gagal menghitung garis pelukis.");
                    results.push({ label: 'Garis Pelukis (s)', value: formatNumber(s_calc), unit: unit });
                }
                break;
            case 'bola':
                const r_bola = getInput('jari-bola', 'Jari-jari (r)');
                const V_bola_val = getInput('volume-bola', 'Volume (V)');
                const LP_bola_val = getInput('lp-bola', 'Luas Permukaan (LP)');

                if (mode === 'volume-lp') {
                    if (r_bola === null) throw new Error("Jari-jari (r) harus diisi.");
                    const V = (4/3) * PI * Math.pow(r_bola, 3);
                    const LP = 4 * PI * Math.pow(r_bola, 2);
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'jari-jari') {
                    let r;
                    let source = '';
                    if (V_bola_val !== null && !isNaN(V_bola_val)) {
                        r = Math.cbrt((3 * V_bola_val) / (4 * PI));
                        source = 'dari Volume';
                    } else if (LP_bola_val !== null && !isNaN(LP_bola_val)) {
                        r = Math.sqrt(LP_bola_val / (4 * PI));
                        source = 'dari Luas Permukaan';
                    } else {
                        throw new Error("Masukkan salah satu nilai: Volume atau Luas Permukaan.");
                    }
                    results.push({ label: `Jari-jari (r) ${source}`, value: formatNumber(r), unit: unit });
                } else if (mode === 'diameter') {
                     let d;
                     let r_calc;
                     let source = '';
                     if (V_bola_val !== null && !isNaN(V_bola_val)) {
                         r_calc = Math.cbrt((3 * V_bola_val) / (4 * PI));
                         source = 'dari Volume';
                     } else if (LP_bola_val !== null && !isNaN(LP_bola_val)) {
                         r_calc = Math.sqrt(LP_bola_val / (4 * PI));
                         source = 'dari Luas Permukaan';
                     } else {
                        throw new Error("Masukkan salah satu nilai: Volume atau Luas Permukaan.");
                    }
                    d = 2 * r_calc;
                    results.push({ label: `Diameter (d) ${source}`, value: formatNumber(d), unit: unit });
                }
                break;
            case 'torus':
                const R_torus = getInput('mayor-torus', 'Jari-jari Mayor (R)');
                const r_torus = getInput('minor-torus', 'Jari-jari Minor (r)');
                const V_torus_val = getInput('volume-torus', 'Volume (V)');

                if (mode === 'volume-lp') {
                    if (R_torus === null || r_torus === null) throw new Error("Jari-jari Mayor dan Minor harus diisi.");
                    if (r_torus >= R_torus) throw new Error("Jari-jari Minor (r) harus lebih kecil dari Jari-jari Mayor (R).");
                    const V = 2 * Math.pow(PI, 2) * R_torus * Math.pow(r_torus, 2);
                    const LP = 4 * Math.pow(PI, 2) * R_torus * r_torus;
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'mayor') {
                    if (V_torus_val === null || r_torus === null) throw new Error("Volume dan Jari-jari Minor harus diisi.");
                    if (r_torus === 0) throw new Error("Jari-jari Minor tidak boleh nol.");
                    const R = V_torus_val / (2 * Math.pow(PI, 2) * Math.pow(r_torus, 2));
                    if (R <= r_torus) throw new Error("Hasil Jari-jari Mayor (R) harus lebih besar dari Jari-jari Minor (r).");
                    results.push({ label: 'Jari-jari Mayor (R)', value: formatNumber(R), unit: unit });
                } else if (mode === 'minor') {
                    if (V_torus_val === null || R_torus === null) throw new Error("Volume dan Jari-jari Mayor harus diisi.");
                    if (R_torus === 0) throw new Error("Jari-jari Mayor tidak boleh nol.");
                    const r_sq = V_torus_val / (2 * Math.pow(PI, 2) * R_torus);
                    if (r_sq < 0) throw new Error("Perhitungan Jari-jari Minor menghasilkan nilai negatif.");
                    const r = Math.sqrt(r_sq);
                    if (r >= R_torus) throw new Error("Hasil Jari-jari Minor (r) harus lebih kecil dari Jari-jari Mayor (R).");
                    results.push({ label: 'Jari-jari Minor (r)', value: formatNumber(r), unit: unit });
                }
                break;
            case 'kerucut-terpancung':
                const r1_k = getInput('jari1-frustum-kerucut', 'Jari-jari Atas (r1)');
                const r2_k = getInput('jari2-frustum-kerucut', 'Jari-jari Bawah (r2)');
                const s_k = getInput('pelukis-frustum-kerucut', 'Garis Pelukis (s)');
                const t_k = getInput('tinggi-frustum-kerucut', 'Tinggi (t)');
                const V_k_val = getInput('volume-frustum-kerucut', 'Volume (V)');
                
                if (r1_k === null || r2_k === null || s_k === null) throw new Error("Jari-jari Atas (r1), Jari-jari Bawah (r2), dan Garis Pelukis (s) harus diisi.");

                let t_calc = t_k;
                if (t_k === null) {
                    const r_diff = Math.abs(r2_k - r1_k);
                    if (s_k < r_diff) throw new Error("Garis pelukis (s) harus lebih besar dari |r2 - r1|.");
                    t_calc = Math.sqrt(s_k**2 - r_diff**2);
                }

                if (mode === 'volume-lp') {
                    if (t_calc === null) throw new Error("Tinggi (t) harus diisi atau dapat dihitung dari r1, r2, dan s.");
                    const V = (PI * t_calc / 3) * (r1_k**2 + r2_k**2 + r1_k * r2_k);
                    const LP = PI * (r1_k**2 + r2_k**2 + s_k * (r1_k + r2_k));
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                    if (t_k === null) {
                        results.push({ label: 'Tinggi (t) Dihitung', value: formatNumber(t_calc), unit: unit });
                    }
                } else if (mode === 'tinggi') {
                     if (V_k_val === null) throw new Error("Volume (V) harus diisi.");
                     const denom = (PI / 3) * (r1_k**2 + r2_k**2 + r1_k * r2_k);
                     if (denom === 0) throw new Error("Pembagi nol. Jari-jari tidak boleh nol bersamaan.");
                     const t = V_k_val / denom;
                     results.push({ label: 'Tinggi (t)', value: formatNumber(t), unit: unit });
                }
                break;
            case 'tembereng-bola':
                const R_tembereng = getInput('jari-bola-tembereng', 'Jari-jari Bola (R)');
                const t_tembereng = getInput('tinggi-tembereng', 'Tinggi Tembereng (t)');
                const V_tembereng_val = getInput('volume-tembereng', 'Volume (V)');
                
                if (R_tembereng === null) throw new Error("Jari-jari Bola (R) harus diisi.");

                if (mode === 'volume-lp') {
                    if (t_tembereng === null) throw new Error("Tinggi Tembereng (t) harus diisi.");
                    if (t_tembereng > R_tembereng * 2) throw new Error("Tinggi Tembereng (t) tidak boleh lebih dari Diameter Bola.");
                    const V = (PI * t_tembereng**2 / 3) * (3 * R_tembereng - t_tembereng);
                    const LP = 2 * PI * R_tembereng * t_tembereng; 
                    const r_tembereng = Math.sqrt(t_tembereng * (2 * R_tembereng - t_tembereng));
                    const LT = LP + PI * r_tembereng**2; 
                    
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (Lengkung)', value: formatNumber(LP), unit: unit });
                    results.push({ label: 'Luas Total (LT)', value: formatNumber(LT), unit: unit });
                } else if (mode === 'tinggi') {
                    if (V_tembereng_val === null) throw new Error("Volume (V) harus diisi.");
                    
                    const f = (t) => (PI * t**3 / 3) - (PI * R_tembereng * t**2) + V_tembereng_val;
                    const t = bisection(f, 0, 2 * R_tembereng);

                    if (t === null) throw new Error("Volume tidak valid untuk Jari-jari Bola ini.");
                    results.push({ label: 'Tinggi Tembereng (t)', value: formatNumber(t), unit: unit });
                }
                break;
            case 'tabung-terpancung':
                const r_tm = getInput('jari-tabung-miring', 'Jari-jari (r)');
                const t1_tm = getInput('t1-tabung-miring', 'Tinggi Terpendek (t1)');
                const t2_tm = getInput('t2-tabung-miring', 'Tinggi Tertinggi (t2)');
                const w_tm = getInput('lebar-miring-tabung', 'Lebar Miring Alas (w)');
                const V_tm_val = getInput('volume-tabung-miring', 'Volume (V)');

                if (mode === 'volume-lp') {
                    if (r_tm === null || t1_tm === null || t2_tm === null || w_tm === null) throw new Error("Jari-jari, t1, t2, dan lebar miring harus diisi.");
                    if (t1_tm > t2_tm) throw new Error("Tinggi Terpendek (t1) harus lebih kecil atau sama dengan Tinggi Tertinggi (t2).");
                    const h_diff = t2_tm - t1_tm;
                    const slant_length = Math.sqrt(h_diff**2 + w_tm**2);
                    const t_avg = (t1_tm + t2_tm) / 2;
                    const V = PI * Math.pow(r_tm, 2) * t_avg;
                    const luas_sisi = 2 * PI * r_tm * slant_length;
                    const luas_alas_atas = PI * Math.pow(r_tm, 2); 
                    const luas_alas_bawah = PI * Math.pow(r_tm, 2); 
                    const LP = luas_alas_atas + luas_alas_bawah + luas_sisi;
                    
                    results.push({ label: 'Volume (V)', value: formatNumber(V), unit: unit });
                    results.push({ label: 'Luas Permukaan (LP)', value: formatNumber(LP), unit: unit });
                } else if (mode === 'jari-jari') {
                    if (V_tm_val === null || t1_tm === null || t2_tm === null) throw new Error("Volume, t1, dan t2 harus diisi.");
                    const t_avg = (t1_tm + t2_tm) / 2;
                    if (t_avg === 0) throw new Error("Rata-rata tinggi tidak boleh nol.");
                    const r_sq = V_tm_val / (PI * t_avg);
                    if (r_sq < 0) throw new Error("Perhitungan jari-jari menghasilkan nilai negatif.");
                    const r = Math.sqrt(r_sq);
                    results.push({ label: 'Jari-jari (r)', value: formatNumber(r), unit: unit });
                } else if (mode === 't1') {
                    if (V_tm_val === null || r_tm === null || t2_tm === null) throw new Error("Volume, Jari-jari, dan t2 harus diisi.");
                    if (r_tm === 0) throw new Error("Jari-jari tidak boleh nol.");
                    const t_avg = V_tm_val / (PI * Math.pow(r_tm, 2));
                    const t1 = 2 * t_avg - t2_tm;
                    if (t1 < 0) throw new Error("Hasil tinggi terpendek (t1) negatif. Periksa input Volume, Jari-jari, dan t2.");
                    results.push({ label: 'Tinggi Terpendek (t1)', value: formatNumber(t1), unit: unit });
                } else if (mode === 't2') {
                    if (V_tm_val === null || r_tm === null || t1_tm === null) throw new Error("Volume, Jari-jari, dan t1 harus diisi.");
                    if (r_tm === 0) throw new Error("Jari-jari tidak boleh nol.");
                    const t_avg = V_tm_val / (PI * Math.pow(r_tm, 2));
                    const t2 = 2 * t_avg - t1_tm;
                    if (t2 <= 0) throw new Error("Tinggi tertinggi (t2) harus positif.");
                    results.push({ label: 'Tinggi Tertinggi (t2)', value: formatNumber(t2), unit: unit });
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

            if (nilaiDisplay === 'Belum diimplementasikan sepenuhnya (hanya volume)') {
                 html += `
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold;" colspan="2">${label}: ${nilaiDisplay}</td>
                    </tr>`;
            } else {
                if (label.includes('Luas Permukaan') || label.includes('Luas Total') || label.includes('Luas Permukaan (Lengkung)')) {
                    satuanDisplay = `${satuanDisplay}²`;
                } else if (label.includes('Volume')) {
                    satuanDisplay = `${satuanDisplay}³`;
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

        clearInputs(shape);
    } else {
         hasilArea.innerHTML = '<p class="error">Tidak ada hasil yang valid. Periksa input Anda.</p>';
    }
}