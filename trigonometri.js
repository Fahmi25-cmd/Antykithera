function handleEnterKey(event, functionNameString) {
    if (event.key !== 'Enter') return;
    event.preventDefault(); 

    const currentInput = event.target;
    const value = currentInput.value.trim(); 

    
    const container = document.getElementById('kalkulator-area');
    
    const inputs = Array.from(container.querySelectorAll('input[type="number"]:not([disabled])'));
    const currentIndex = inputs.indexOf(currentInput);

    const nextInput = inputs[currentIndex + 1];

    
    if (nextInput && value !== '') {
        nextInput.focus();
        nextInput.select(); 
    } else {
        
        
        if (typeof window[functionNameString] === 'function') {
            window[functionNameString]();
            
            
            clearAllInputsAfterCalc(inputs);
        }
    }
}


function clearAllInputsAfterCalc(inputs) {
    setTimeout(() => { 
        inputs.forEach(input => {
            input.value = ''; 
        });
        if (inputs.length > 0) {
            inputs[0].focus(); 
        }
    }, 100);
}


function clearHasil(hasilDivId) {
    const hasilDiv = document.getElementById(hasilDivId);
    if (hasilDiv) {
        hasilDiv.innerHTML = '';
        hasilDiv.classList.remove('error'); 
    }
}


function tampilkanKalkulator() {
    const select = document.getElementById('pilih-bangun');
    const value = select.value;
    const area = document.getElementById('kalkulator-area');
    area.innerHTML = ''; 

    if (value === '') {
        return;
    }

    let content = '';

    switch (value) {
        case 'perbandingan-dasar':
            content = `
                <h2>Perbandingan Trigonometri Dasar</h2>
                <p>Masukkan sudut untuk menghitung sin, cos, tan, dll.</p>
                <label>Sudut (θ):</label>
                <input type="number" id="sudut-dasar" placeholder="Masukkan sudut" onkeypress="handleEnterKey(event, 'hitungDasar');" oninput="clearHasil('hasil-dasar')">
                <select id="unit-dasar" onchange="clearHasil('hasil-dasar')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sin-check" checked onchange="clearHasil('hasil-dasar')"> Sin
                    <input type="checkbox" id="cos-check" checked onchange="clearHasil('hasil-dasar')"> Cos
                    <input type="checkbox" id="tan-check" checked onchange="clearHasil('hasil-dasar')"> Tan
                    <input type="checkbox" id="csc-check" checked onchange="clearHasil('hasil-dasar')"> Csc
                    <input type="checkbox" id="sec-check" checked onchange="clearHasil('hasil-dasar')"> Sec
                    <input type="checkbox" id="cot-check" checked onchange="clearHasil('hasil-dasar')"> Cot
                </div>
                <button onclick="hitungDasar()">Hitung</button>
                <div id="hasil-dasar"></div>
            `;
            area.innerHTML = content;
            break;

        case 'identitas-dasar':
            content = `
                <h2>Identitas Dasar Trigonometri</h2>
                <p>Verifikasi identitas seperti sin²θ + cos²θ = 1. Masukkan sudut.</p>
                <label>Sudut (θ):</label>
                <input type="number" id="sudut-identitas" placeholder="Masukkan sudut" onkeypress="handleEnterKey(event, 'hitungIdentitas');" oninput="clearHasil('hasil-identitas')">
                <select id="unit-identitas" onchange="clearHasil('hasil-identitas')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="pythagoras-check" checked onchange="clearHasil('hasil-identitas')"> sin²θ + cos²θ
                    <input type="checkbox" id="tan-sec-check" checked onchange="clearHasil('hasil-identitas')"> 1 + tan²θ
                    <input type="checkbox" id="cot-csc-check" checked onchange="clearHasil('hasil-identitas')"> 1 + cot²θ
                </div>
                <button onclick="hitungIdentitas()">Hitung</button>
                <div id="hasil-identitas"></div>
            `;
            area.innerHTML = content;
            break;

        case 'sudut-istimewa':
            content = `
                <h2>Sudut-Sudut Istimewa</h2>
                <p>Pilih sudut istimewa untuk melihat nilai trig-nya.</p>
                <select id="sudut-istimewa-select" onchange="clearHasil('hasil-istimewa')">
                    <option value="0">0°</option>
                    <option value="30">30°</option>
                    <option value="45">45°</option>
                    <option value="60">60°</option>
                    <option value="90">90°</option>
                </select>
                <select id="unit-istimewa" onchange="clearHasil('hasil-istimewa')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sin-istimewa-check" checked onchange="clearHasil('hasil-istimewa')"> Sin
                    <input type="checkbox" id="cos-istimewa-check" checked onchange="clearHasil('hasil-istimewa')"> Cos
                    <input type="checkbox" id="tan-istimewa-check" checked onchange="clearHasil('hasil-istimewa')"> Tan
                    <input type="checkbox" id="csc-istimewa-check" checked onchange="clearHasil('hasil-istimewa')"> Csc
                    <input type="checkbox" id="sec-istimewa-check" checked onchange="clearHasil('hasil-istimewa')"> Sec
                    <input type="checkbox" id="cot-istimewa-check" checked onchange="clearHasil('hasil-istimewa')"> Cot
                </div>
                <button onclick="hitungIstimewa()">Tampilkan</button>
                <div id="hasil-istimewa"></div>
            `;
            area.innerHTML = content;
            break;

        case 'hubungan-kuadran':
            content = `
                <h2>Tanda Fungsi di Kuadran</h2>
                <p>Masukkan sudut untuk menentukan kuadran dan tanda fungsi.</p>
                <label>Sudut (θ):</label>
                <input type="number" id="sudut-kuadran" placeholder="Masukkan sudut" onkeypress="handleEnterKey(event, 'hitungKuadran');" oninput="clearHasil('hasil-kuadran')">
                <select id="unit-kuadran" onchange="clearHasil('hasil-kuadran')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sin-kuadran-check" checked onchange="clearHasil('hasil-kuadran')"> Sin
                    <input type="checkbox" id="cos-kuadran-check" checked onchange="clearHasil('hasil-kuadran')"> Cos
                    <input type="checkbox" id="tan-kuadran-check" checked onchange="clearHasil('hasil-kuadran')"> Tan
                    <input type="checkbox" id="csc-kuadran-check" checked onchange="clearHasil('hasil-kuadran')"> Csc
                    <input type="checkbox" id="sec-kuadran-check" checked onchange="clearHasil('hasil-kuadran')"> Sec
                    <input type="checkbox" id="cot-kuadran-check" checked onchange="clearHasil('hasil-kuadran')"> Cot
                </div>
                <button onclick="hitungKuadran()">Hitung</button>
                <div id="hasil-kuadran"></div>
            `;
            area.innerHTML = content;
            break;

        case 'sudut-berelasi':
            content = `
                <h2>Rumus Sudut Berelasi</h2>
                <p>Masukkan sudut untuk menghitung nilai di sudut berelasi (180° - θ, dll).</p>
                <label>Sudut (θ):</label>
                <input type="number" id="sudut-berelasi" placeholder="Masukkan sudut" onkeypress="handleEnterKey(event, 'hitungBerelasi');" oninput="clearHasil('hasil-berelasi')">
                <select id="unit-berelasi" onchange="clearHasil('hasil-berelasi')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sin-180min-check" checked onchange="clearHasil('hasil-berelasi')"> sin(180° - θ)
                    <input type="checkbox" id="cos-180plus-check" checked onchange="clearHasil('hasil-berelasi')"> cos(180° + θ)
                    <input type="checkbox" id="tan-360min-check" checked onchange="clearHasil('hasil-berelasi')"> tan(360° - θ)
                    <input type="checkbox" id="csc-180min-check" checked onchange="clearHasil('hasil-berelasi')"> csc(180° - θ)
                    <input type="checkbox" id="sec-180plus-check" checked onchange="clearHasil('hasil-berelasi')"> sec(180° + θ)
                    <input type="checkbox" id="cot-360min-check" checked onchange="clearHasil('hasil-berelasi')"> cot(360° - θ)
                </div>
                <button onclick="hitungBerelasi()">Hitung</button>
                <div id="hasil-berelasi"></div>
            `;
            area.innerHTML = content;
            break;

        case 'penjumlahan-pengurangan':
            content = `
                <h2>Rumus Penjumlahan & Pengurangan Sudut</h2>
                <p>Masukkan dua sudut untuk sin(A + B), cos(A - B), dll.</p>
                <label>Sudut A:</label>
                <input type="number" id="sudut-a-penjum" placeholder="Sudut A" onkeypress="handleEnterKey(event, 'hitungPenjum');" oninput="clearHasil('hasil-penjum')">
                <label>Sudut B:</label>
                <input type="number" id="sudut-b-penjum" placeholder="Sudut B" onkeypress="handleEnterKey(event, 'hitungPenjum');" oninput="clearHasil('hasil-penjum')">
                <select id="unit-penjum" onchange="clearHasil('hasil-penjum')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sin-plus-check" checked onchange="clearHasil('hasil-penjum')"> sin(A + B)
                    <input type="checkbox" id="sin-min-check" checked onchange="clearHasil('hasil-penjum')"> sin(A - B)
                    <input type="checkbox" id="cos-plus-check" checked onchange="clearHasil('hasil-penjum')"> cos(A + B)
                    <input type="checkbox" id="cos-min-check" checked onchange="clearHasil('hasil-penjum')"> cos(A - B)
                    <input type="checkbox" id="tan-plus-check" checked onchange="clearHasil('hasil-penjum')"> tan(A + B)
                    <input type="checkbox" id="tan-min-check" checked onchange="clearHasil('hasil-penjum')"> tan(A - B)
                    <input type="checkbox" id="cot-plus-check" checked onchange="clearHasil('hasil-penjum')"> cot(A + B)
                    <input type="checkbox" id="cot-min-check" checked onchange="clearHasil('hasil-penjum')"> cot(A - B)
                </div>
                <button onclick="hitungPenjum()">Hitung</button>
                <div id="hasil-penjum"></div>
            `;
            area.innerHTML = content;
            break;

        case 'sudut-ganda-setengah':
            content = `
                <h2>Rumus Sudut Ganda & Setengah</h2>
                <p>Masukkan sudut untuk sin(2θ), cos(θ/2), dll.</p>
                <label>Sudut (θ):</label>
                <input type="number" id="sudut-ganda" placeholder="Masukkan sudut" onkeypress="handleEnterKey(event, 'hitungGanda');" oninput="clearHasil('hasil-ganda')">
                <select id="unit-ganda" onchange="clearHasil('hasil-ganda')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sin-2theta-check" checked onchange="clearHasil('hasil-ganda')"> sin(2θ)
                    <input type="checkbox" id="cos-2theta-check" checked onchange="clearHasil('hasil-ganda')"> cos(2θ)
                    <input type="checkbox" id="tan-2theta-check" checked onchange="clearHasil('hasil-ganda')"> tan(2θ)
                    <input type="checkbox" id="sin-half-check" checked onchange="clearHasil('hasil-ganda')"> sin(θ/2)
                    <input type="checkbox" id="cos-half-check" checked onchange="clearHasil('hasil-ganda')"> cos(θ/2)
                    <input type="checkbox" id="tan-half-check" checked onchange="clearHasil('hasil-ganda')"> tan(θ/2)
                    <input type="checkbox" id="csc-2theta-check" checked onchange="clearHasil('hasil-ganda')"> csc(2θ)
                    <input type="checkbox" id="sec-2theta-check" checked onchange="clearHasil('hasil-ganda')"> sec(2θ)
                    <input type="checkbox" id="cot-2theta-check" checked onchange="clearHasil('hasil-ganda')"> cot(2θ)
                </div>
                <button onclick="hitungGanda()">Hitung</button>
                <div id="hasil-ganda"></div>
            `;
            area.innerHTML = content;
            break;

        case 'jumlah-selisih':
            content = `
                <h2>Rumus Jumlah & Selisih Sinus dan Cosinus</h2>
                <p>Masukkan nilai untuk sin A + sin B = 2 sin((A+B)/2) cos((A-B)/2), dll.</p>
                <label>Sudut A:</label>
                <input type="number" id="sudut-a-selisih" placeholder="Sudut A" onkeypress="handleEnterKey(event, 'hitungSelisih');" oninput="clearHasil('hasil-selisih')">
                <label>Sudut B:</label>
                <input type="number" id="sudut-b-selisih" placeholder="Sudut B" onkeypress="handleEnterKey(event, 'hitungSelisih');" oninput="clearHasil('hasil-selisih')">
                <select id="unit-selisih" onchange="clearHasil('hasil-selisih')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sin-plus-sin-check" checked onchange="clearHasil('hasil-selisih')"> sin A + sin B
                    <input type="checkbox" id="sin-min-sin-check" checked onchange="clearHasil('hasil-selisih')"> sin A - sin B
                    <input type="checkbox" id="cos-plus-cos-check" checked onchange="clearHasil('hasil-selisih')"> cos A + cos B
                    <input type="checkbox" id="cos-min-cos-check" checked onchange="clearHasil('hasil-selisih')"> cos A - cos B
                    <input type="checkbox" id="tan-plus-tan-check" checked onchange="clearHasil('hasil-selisih')"> tan A + tan B
                    <input type="checkbox" id="tan-min-tan-check" checked onchange="clearHasil('hasil-selisih')"> tan A - tan B
                </div>
                <button onclick="hitungSelisih()">Hitung</button>
                <div id="hasil-selisih"></div>
            `;
            area.innerHTML = content;
            break;

        case 'hukum-sinus-cosinus':
            content = `
                <h2>Hukum Sinus & Cosinus</h2>
                <p>Masukkan sisi dan sudut untuk menghitung sisi lain menggunakan hukum sinus/cosinus.</p>
                <label>Sisi a:</label>
                <input type="number" id="sisi-a" placeholder="Sisi a" onkeypress="handleEnterKey(event, 'hitungHukum');" oninput="clearHasil('hasil-hukum')">
                <label>Sudut A:</label>
                <input type="number" id="sudut-a-hukum" placeholder="Sudut A" onkeypress="handleEnterKey(event, 'hitungHukum');" oninput="clearHasil('hasil-hukum')">
                <label>Sisi b:</label>
                <input type="number" id="sisi-b" placeholder="Sisi b" onkeypress="handleEnterKey(event, 'hitungHukum');" oninput="clearHasil('hasil-hukum')">
                <label>Sudut B:</label>
                <input type="number" id="sudut-b-hukum" placeholder="Sudut B" onkeypress="handleEnterKey(event, 'hitungHukum');" oninput="clearHasil('hasil-hukum')">
                <label>Sisi c:</label>
                <input type="number" id="sisi-c" placeholder="Sisi c" onkeypress="handleEnterKey(event, 'hitungHukum');" oninput="clearHasil('hasil-hukum')">
                <label>Sudut C:</label>
                <input type="number" id="sudut-c-hukum" placeholder="Sudut C" onkeypress="handleEnterKey(event, 'hitungHukum');" oninput="clearHasil('hasil-hukum')">
                <select id="unit-hukum" onchange="clearHasil('hasil-hukum')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sinus-law-check" checked onchange="clearHasil('hasil-hukum')"> Hukum Sinus
                    <input type="checkbox" id="cosinus-law-check" checked onchange="clearHasil('hasil-hukum')"> Hukum Cosinus
                </div>
                <button onclick="hitungHukum()">Hitung</button>
                <div id="hasil-hukum"></div>
            `;
            area.innerHTML = content;
            break;

        case 'luas-segitiga':
            content = `
                <h2>Rumus Luas Segitiga</h2>
                <p>Hitung luas segitiga menggunakan ½ ab sin C.</p>
                <label>Sisi a:</label>
                <input type="number" id="sisi-a-luas" placeholder="Sisi a" onkeypress="handleEnterKey(event, 'hitungLuas');" oninput="clearHasil('hasil-luas')">
                <label>Sisi b:</label>
                <input type="number" id="sisi-b-luas" placeholder="Sisi b" onkeypress="handleEnterKey(event, 'hitungLuas');" oninput="clearHasil('hasil-luas')">
                <label>Sudut C:</label>
                <input type="number" id="sudut-c-luas" placeholder="Sudut C" onkeypress="handleEnterKey(event, 'hitungLuas');" oninput="clearHasil('hasil-luas')">
                <select id="unit-luas" onchange="clearHasil('hasil-luas')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <button onclick="hitungLuas()">Hitung</button>
                <div id="hasil-luas"></div>
            `;
            area.innerHTML = content;
            break;

        case 'lingkaran-trigonometri':
            content = `
                <h2>Lingkaran Trigonometri</h2>
                <p>Masukkan sudut untuk koordinat pada lingkaran satuan.</p>
                <label>Sudut (θ):</label>
                <input type="number" id="sudut-lingkaran" placeholder="Masukkan sudut" onkeypress="handleEnterKey(event, 'hitungLingkaran');" oninput="clearHasil('hasil-lingkaran')">
                <select id="unit-lingkaran" onchange="clearHasil('hasil-lingkaran')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <button onclick="hitungLingkaran()">Hitung</button>
                <div id="hasil-lingkaran"></div>
            `;
            area.innerHTML = content;
            break;

        case 'konversi-radian-derajat':
            content = `
                <h2>Konversi Derajat ↔ Radian</h2>
                <p>Masukkan nilai untuk konversi.</p>
                <label>Nilai:</label>
                <input type="number" id="nilai-konversi" placeholder="Masukkan nilai" onkeypress="handleEnterKey(event, 'hitungKonversi');" oninput="clearHasil('hasil-konversi')">
                <select id="tipe-konversi" onchange="clearHasil('hasil-konversi')">
                    <option value="degToRad">Derajat ke Radian</option>
                    <option value="radToDeg">Radian ke Derajat</option>
                </select>
                <button onclick="hitungKonversi()">Konversi</button>
                <div id="hasil-konversi"></div>
            `;
            area.innerHTML = content;
            break;

        case 'persamaan-trigonometri':
            content = `
                <h2>Persamaan Trigonometri</h2>
                <p>Solver sederhana untuk sin θ = k, dll. Masukkan koefisien.</p>
                <label>Fungsi:</label>
                <select id="fungsi-pers" onchange="clearHasil('hasil-pers')">
                    <option value="sin">sin θ =</option>
                    <option value="cos">cos θ =</option>
                    <option value="tan">tan θ =</option>
                    <option value="csc">csc θ =</option>
                    <option value="sec">sec θ =</option>
                    <option value="cot">cot θ =</option>
                </select>
                <label>Nilai k:</label>
                <input type="number" id="nilai-k" placeholder="Masukkan k" step="0.01" onkeypress="handleEnterKey(event, 'hitungPersamaan');" oninput="clearHasil('hasil-pers')">
                <label>Unit output:</label>
                <select id="unit-pers" onchange="clearHasil('hasil-pers')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <button onclick="hitungPersamaan()">Solusi</button>
                <div id="hasil-pers"></div>
            `;
            area.innerHTML = content;
            break;

        case 'grafik-fungsi':
            content = `
                <h2>Grafik Fungsi Trigonometri</h2>
                <p>Tampilkan grafik sederhana menggunakan canvas. Anda juga bisa menandai nilai fungsi pada sudut tertentu.</p>
                <select id="fungsi-grafik" onchange="clearCanvasGrafik()">
                    <option value="sin">sin x</option>
                    <option value="cos">cos x</option>
                    <option value="tan">tan x</option>
                    <option value="cosec">cosec x</option>
                    <option value="sec">sec x</option>
                    <option value="cotan">cotan x</option>
                </select>
                <label>Sudut untuk ditandai (optional):</label>
                <input type="number" id="sudut-grafik" placeholder="Masukkan sudut" onkeypress="handleEnterKey(event, 'gambarGrafik');" oninput="clearCanvasGrafik()">
                <select id="unit-grafik" onchange="clearCanvasGrafik()">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <label>Nilai fungsi untuk ditandai (optional, misal sin=0.5, sec=90):</label>
                <input type="number" id="nilai-fungsi" placeholder="Masukkan nilai fungsi" step="0.01" onkeypress="handleEnterKey(event, 'gambarGrafik');" oninput="clearCanvasGrafik()">
                <button onclick="gambarGrafik()">Gambar</button>
                <canvas id="canvas-grafik" width="600" height="400" style="border:1px solid #ddd; background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"></canvas>
            `;
            area.innerHTML = content;
            break;

        case 'aplikasi':
            content = `
                <h2>Aplikasi Trigonometri</h2>
                <p>Contoh aplikasi: Hitung tinggi pohon dengan sudut elevasi.</p>
                <label>Jarak ke pohon (m):</label>
                <input type="number" id="jarak-aplikasi" placeholder="Jarak" onkeypress="handleEnterKey(event, 'hitungAplikasi');" oninput="clearHasil('hasil-aplikasi')">
                <label>Sudut elevasi:</label>
                <input type="number" id="sudut-aplikasi" placeholder="Sudut" onkeypress="handleEnterKey(event, 'hitungAplikasi');" oninput="clearHasil('hasil-aplikasi')">
                <select id="unit-aplikasi" onchange="clearHasil('hasil-aplikasi')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <button onclick="hitungAplikasi()">Hitung Tinggi</button>
                <div id="hasil-aplikasi"></div>
            `;
            area.innerHTML = content;
            break;

        case 'produk-ke-jumlah':
            content = `
                <h2>Rumus Produk ke Jumlah</h2>
                <p>Masukkan dua sudut untuk sin A cos B, dll.</p>
                <label>Sudut A:</label>
                <input type="number" id="sudut-a-produk" placeholder="Sudut A" onkeypress="handleEnterKey(event, 'hitungProduk');" oninput="clearHasil('hasil-produk')">
                <label>Sudut B:</label>
                <input type="number" id="sudut-b-produk" placeholder="Sudut B" onkeypress="handleEnterKey(event, 'hitungProduk');" oninput="clearHasil('hasil-produk')">
                <select id="unit-produk" onchange="clearHasil('hasil-produk')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sinAcosB-check" checked onchange="clearHasil('hasil-produk')"> sin A cos B
                    <input type="checkbox" id="cosAcosB-check" checked onchange="clearHasil('hasil-produk')"> cos A cos B
                    <input type="checkbox" id="sinAsinB-check" checked onchange="clearHasil('hasil-produk')"> sin A sin B
                    <input type="checkbox" id="tanAtanB-check" checked onchange="clearHasil('hasil-produk')"> tan A tan B
                    <input type="checkbox" id="cotAcotB-check" checked onchange="clearHasil('hasil-produk')"> cot A cot B
                </div>
                <button onclick="hitungProduk()">Hitung</button>
                <div id="hasil-produk"></div>
            `;
            area.innerHTML = content;
            break;

        case 'sudut-tiga-kali':
            content = `
                <h2>Rumus Sudut Tiga Kali</h2>
                <p>Masukkan sudut untuk sin(3θ), cos(3θ), tan(3θ).</p>
                <label>Sudut (θ):</label>
                <input type="number" id="sudut-tiga" placeholder="Masukkan sudut" onkeypress="handleEnterKey(event, 'hitungTiga');" oninput="clearHasil('hasil-tiga')">
                <select id="unit-tiga" onchange="clearHasil('hasil-tiga')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sin-3theta-check" checked onchange="clearHasil('hasil-tiga')"> sin(3θ)
                    <input type="checkbox" id="cos-3theta-check" checked onchange="clearHasil('hasil-tiga')"> cos(3θ)
                    <input type="checkbox" id="tan-3theta-check" checked onchange="clearHasil('hasil-tiga')"> tan(3θ)
                    <input type="checkbox" id="csc-3theta-check" checked onchange="clearHasil('hasil-tiga')"> csc(3θ)
                    <input type="checkbox" id="sec-3theta-check" checked onchange="clearHasil('hasil-tiga')"> sec(3θ)
                    <input type="checkbox" id="cot-3theta-check" checked onchange="clearHasil('hasil-tiga')"> cot(3θ)
                </div>
                <button onclick="hitungTiga()">Hitung</button>
                <div id="hasil-tiga"></div>
            `;
            area.innerHTML = content;
            break;

        case 'invers-trigonometri':
            content = `
                <h2>Fungsi Invers Trigonometri</h2>
                <p>Masukkan nilai untuk menghitung arcsin, arccos, dll.</p>
                <label>Nilai (k):</label>
                <input type="number" id="nilai-invers" placeholder="Masukkan nilai (-1 to 1)" step="0.01" onkeypress="handleEnterKey(event, 'hitungInvers');" oninput="clearHasil('hasil-invers')">
                <label>Unit output:</label>
                <select id="unit-invers" onchange="clearHasil('hasil-invers')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="arcsin-check" checked onchange="clearHasil('hasil-invers')"> arcsin(k)
                    <input type="checkbox" id="arccos-check" checked onchange="clearHasil('hasil-invers')"> arccos(k)
                    <input type="checkbox" id="arctan-check" checked onchange="clearHasil('hasil-invers')"> arctan(k)
                    <input type="checkbox" id="arccsc-check" checked onchange="clearHasil('hasil-invers')"> arccsc(k)
                    <input type="checkbox" id="arcsec-check" checked onchange="clearHasil('hasil-invers')"> arcsec(k)
                    <input type="checkbox" id="arccot-check" checked onchange="clearHasil('hasil-invers')"> arccot(k)
                </div>
                <button onclick="hitungInvers()">Hitung</button>
                <div id="hasil-invers"></div>
            `;
            area.innerHTML = content;
            break;

        case 'identitas-lanjutan':
            content = `
                <h2>Identitas Trigonometri Lanjutan</h2>
                <p>Verifikasi identitas lanjutan. Masukkan sudut.</p>
                <label>Sudut (θ):</label>
                <input type="number" id="sudut-lanjutan" placeholder="Masukkan sudut" onkeypress="handleEnterKey(event, 'hitungIdentitasLanjutan');" oninput="clearHasil('hasil-lanjutan')">
                <select id="unit-lanjutan" onchange="clearHasil('hasil-lanjutan')">
                    <option value="derajat" selected>Derajat</option>
                    <option value="radian">Radian</option>
                </select>
                <div>
                    <input type="checkbox" id="sin-cos-check" checked onchange="clearHasil('hasil-lanjutan')"> sin θ / cos θ = tan θ
                    <input type="checkbox" id="csc-sec-check" checked onchange="clearHasil('hasil-lanjutan')"> 1 / sin θ = csc θ, dll.
                </div>
                <button onclick="hitungIdentitasLanjutan()">Hitung</button>
                <div id="hasil-lanjutan"></div>
            `;
            area.innerHTML = content;
            break;
    }
}


function clearCanvasGrafik() {
    const canvas = document.getElementById('canvas-grafik');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        
        
        
    }
}



function toRad(deg) {
    return deg * Math.PI / 180;
}


function toDeg(rad) {
    return rad * 180 / Math.PI;
}


function formatNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) {
        return num.toString();
    }
    return parseFloat(num.toFixed(4)).toString();
}


function renderHasilTabel(hasilDiv, entries, error = null) {
    if (!hasilDiv) return; 
    
    hasilDiv.classList.remove('error'); 
    if (error) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `Error: ${error}`;
        return;
    }

    let tableContent = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #0b2c66; color: white;">
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
            </tr>
    `;

    entries.forEach(([param, value]) => {
        
        const formattedValue = (typeof value === 'number') ? formatNumber(value).replace(/\.0+$/, '') : value;
        tableContent += `
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px;">${param}</td>
                <td style="border: 1px solid #ccc; padding: 10px;">${formattedValue}</td>
            </tr>
        `;
    });

    tableContent += '</table>';
    hasilDiv.innerHTML = tableContent;
}


function hitungDasar() {
    const sudutInput = document.getElementById('sudut-dasar');
    if (!sudutInput) return; 
    const sudut = parseFloat(sudutInput.value);
    const unit = document.getElementById('unit-dasar').value;
    const rad = unit === 'derajat' ? toRad(sudut) : sudut;
    const hasilDiv = document.getElementById('hasil-dasar');
    const entries = [];
    
    if (isNaN(sudut)) {
        renderHasilTabel(hasilDiv, [], "Input sudut tidak valid.");
        return;
    }

    try {
        if (document.getElementById('sin-check').checked) {
            const val = Math.sin(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin θ', val]);
        }
        if (document.getElementById('cos-check').checked) {
            const val = Math.cos(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cos θ', val]);
        }
        if (document.getElementById('tan-check').checked) {
            const val = Math.tan(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['tan θ', val]);
        }
        if (document.getElementById('csc-check').checked) {
            const val = 1 / Math.sin(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['csc θ', val]);
        }
        if (document.getElementById('sec-check').checked) {
            const val = 1 / Math.cos(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sec θ', val]);
        }
        if (document.getElementById('cot-check').checked) {
            const val = 1 / Math.tan(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cot θ', val]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}


function hitungIdentitas() {
    const sudutInput = document.getElementById('sudut-identitas');
    if (!sudutInput) return;
    const sudut = parseFloat(sudutInput.value);
    const unit = document.getElementById('unit-identitas').value;
    const rad = unit === 'derajat' ? toRad(sudut) : sudut;
    const hasilDiv = document.getElementById('hasil-identitas');
    const entries = [];

    if (isNaN(sudut)) {
        renderHasilTabel(hasilDiv, [], "Input sudut tidak valid.");
        return;
    }

    try {
        if (document.getElementById('pythagoras-check').checked) {
            const val = Math.pow(Math.sin(rad), 2) + Math.pow(Math.cos(rad), 2);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin²θ + cos²θ', val]);
        }
        if (document.getElementById('tan-sec-check').checked) {
            const val = 1 + Math.pow(Math.tan(rad), 2);
            const sec2 = Math.pow(1 / Math.cos(rad), 2);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            
            entries.push(['1 + tan²θ', val]);
            entries.push(['sec²θ', sec2]);
        }
        if (document.getElementById('cot-csc-check').checked) {
            const val = 1 + Math.pow(1 / Math.tan(rad), 2);
            const csc2 = Math.pow(1 / Math.sin(rad), 2);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            
            entries.push(['1 + cot²θ', val]);
            entries.push(['csc²θ', csc2]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}


function hitungIstimewa() {
    const sudutSelect = document.getElementById('sudut-istimewa-select');
    if (!sudutSelect) return;
    let sudut = parseFloat(sudutSelect.value);
    const unit = document.getElementById('unit-istimewa').value;
    
    
    
    
    
    
    
    
    const rad = toRad(sudut); 
    const hasilDiv = document.getElementById('hasil-istimewa');
    const entries = [];
    
    
    let displaySudut = unit === 'derajat' ? `${sudut}°` : `${formatNumber(rad)} rad`;
    entries.push(['Sudut (θ)', displaySudut]);

    try {
        if (document.getElementById('sin-istimewa-check').checked) {
            const val = Math.sin(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push([`sin(${displaySudut})`, val]);
        }
        if (document.getElementById('cos-istimewa-check').checked) {
            const val = Math.cos(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push([`cos(${displaySudut})`, val]);
        }
        if (document.getElementById('tan-istimewa-check').checked) {
            const val = Math.tan(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push([`tan(${displaySudut})`, val]);
        }
        if (document.getElementById('csc-istimewa-check').checked) {
            const val = 1 / Math.sin(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push([`csc(${displaySudut})`, val]);
        }
        if (document.getElementById('sec-istimewa-check').checked) {
            const val = 1 / Math.cos(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push([`sec(${displaySudut})`, val]);
        }
        if (document.getElementById('cot-istimewa-check').checked) {
            const val = 1 / Math.tan(rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push([`cot(${displaySudut})`, val]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}


function hitungKuadran() {
    const sudutInput = document.getElementById('sudut-kuadran');
    if (!sudutInput) return;
    let sudut = parseFloat(sudutInput.value);
    const unit = document.getElementById('unit-kuadran').value;
    const hasilDiv = document.getElementById('hasil-kuadran');
    
    if (isNaN(sudut)) {
        renderHasilTabel(hasilDiv, [], "Input sudut tidak valid.");
        return;
    }

    let sudutDeg = (unit === 'radian') ? toDeg(sudut) : sudut;
    
    
    let sudutNorm = sudutDeg % 360;
    if (sudutNorm < 0) sudutNorm += 360;

    let kuadran;
    
    if (sudutNorm === 0 || sudutNorm === 360) kuadran = 'Sumbu X Positif';
    else if (sudutNorm === 90) kuadran = 'Sumbu Y Positif';
    else if (sudutNorm === 180) kuadran = 'Sumbu X Negatif';
    else if (sudutNorm === 270) kuadran = 'Sumbu Y Negatif';
    
    else if (sudutNorm > 0 && sudutNorm < 90) kuadran = 'I (+sin, +cos, +tan)';
    else if (sudutNorm > 90 && sudutNorm < 180) kuadran = 'II (+sin, -cos, -tan)';
    else if (sudutNorm > 180 && sudutNorm < 270) kuadran = 'III (-sin, -cos, +tan)';
    else kuadran = 'IV (-sin, +cos, -tan)';
    
    const entries = [['Kuadran', kuadran]];

    try {
        const rad = toRad(sudutNorm); 
        
        const epsilon = 1e-10;

        if (document.getElementById('sin-kuadran-check').checked) {
            const val = Math.sin(rad);
            entries.push(['Tanda sin', val > epsilon ? '+' : (val < -epsilon ? '-' : '0')]);
        }
        if (document.getElementById('cos-kuadran-check').checked) {
            const val = Math.cos(rad);
            entries.push(['Tanda cos', val > epsilon ? '+' : (val < -epsilon ? '-' : '0')]);
        }
        if (document.getElementById('tan-kuadran-check').checked) {
            const val = Math.tan(rad);
            if (!isFinite(val)) entries.push(['Tanda tan', 'Tidak Terdefinisi']);
            else entries.push(['Tanda tan', val > epsilon ? '+' : (val < -epsilon ? '-' : '0')]);
        }
        if (document.getElementById('csc-kuadran-check').checked) {
            const val = 1 / Math.sin(rad);
            if (!isFinite(val)) entries.push(['Tanda csc', 'Tidak Terdefinisi']);
            else entries.push(['Tanda csc', val > epsilon ? '+' : (val < -epsilon ? '-' : '0')]);
        }
        if (document.getElementById('sec-kuadran-check').checked) {
            const val = 1 / Math.cos(rad);
            if (!isFinite(val)) entries.push(['Tanda sec', 'Tidak Terdefinisi']);
            else entries.push(['Tanda sec', val > epsilon ? '+' : (val < -epsilon ? '-' : '0')]);
        }
        if (document.getElementById('cot-kuadran-check').checked) {
            const val = 1 / Math.tan(rad);
            if (!isFinite(val)) entries.push(['Tanda cot', 'Tidak Terdefinisi']);
            else entries.push(['Tanda cot', val > epsilon ? '+' : (val < -epsilon ? '-' : '0')]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}


function hitungBerelasi() {
    const sudutInput = document.getElementById('sudut-berelasi');
    if (!sudutInput) return;
    const sudut = parseFloat(sudutInput.value);
    const unit = document.getElementById('unit-berelasi').value;
    const rad = unit === 'derajat' ? toRad(sudut) : sudut;
    const hasilDiv = document.getElementById('hasil-berelasi');
    const entries = [];

    if (isNaN(sudut)) {
        renderHasilTabel(hasilDiv, [], "Input sudut tidak valid.");
        return;
    }

    try {
        const pi = Math.PI;
        
        const rad180 = pi;
        const rad360 = 2 * pi;

        if (document.getElementById('sin-180min-check').checked) {
            const val = Math.sin(rad180 - rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin(180° - θ)', val]);
        }
        if (document.getElementById('cos-180plus-check').checked) {
            const val = Math.cos(rad180 + rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cos(180° + θ)', val]);
        }
        if (document.getElementById('tan-360min-check').checked) {
            const val = Math.tan(rad360 - rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['tan(360° - θ)', val]);
        }
        if (document.getElementById('csc-180min-check').checked) {
            const val = 1 / Math.sin(rad180 - rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['csc(180° - θ)', val]);
        }
        if (document.getElementById('sec-180plus-check').checked) {
            const val = 1 / Math.cos(rad180 + rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sec(180° + θ)', val]);
        }
        if (document.getElementById('cot-360min-check').checked) {
            const val = 1 / Math.tan(rad360 - rad);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cot(360° - θ)', val]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}


function hitungPenjum() {
    const aInput = document.getElementById('sudut-a-penjum');
    const bInput = document.getElementById('sudut-b-penjum');
    if (!aInput || !bInput) return;
    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    const unit = document.getElementById('unit-penjum').value;
    const radA = unit === 'derajat' ? toRad(a) : a;
    const radB = unit === 'derajat' ? toRad(b) : b;
    const hasilDiv = document.getElementById('hasil-penjum');
    const entries = [];

    if (isNaN(a) || isNaN(b)) {
        renderHasilTabel(hasilDiv, [], "Input sudut A atau B tidak valid.");
        return;
    }

    try {
        if (document.getElementById('sin-plus-check').checked) {
            const val = Math.sin(radA + radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin(A + B)', val]);
        }
        if (document.getElementById('sin-min-check').checked) {
            const val = Math.sin(radA - radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin(A - B)', val]);
        }
        if (document.getElementById('cos-plus-check').checked) {
            const val = Math.cos(radA + radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cos(A + B)', val]);
        }
        if (document.getElementById('cos-min-check').checked) {
            const val = Math.cos(radA - radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cos(A - B)', val]);
        }
        if (document.getElementById('tan-plus-check').checked) {
            const val = Math.tan(radA + radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['tan(A + B)', val]);
        }
        if (document.getElementById('tan-min-check').checked) {
            const val = Math.tan(radA - radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['tan(A - B)', val]);
        }
        if (document.getElementById('cot-plus-check').checked) {
            const val = 1 / Math.tan(radA + radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cot(A + B)', val]);
        }
        if (document.getElementById('cot-min-check').checked) {
            const val = 1 / Math.tan(radA - radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cot(A - B)', val]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}


function hitungGanda() {
    const sudutInput = document.getElementById('sudut-ganda');
    if (!sudutInput) return;
    const sudut = parseFloat(sudutInput.value);
    const unit = document.getElementById('unit-ganda').value;
    const rad = unit === 'derajat' ? toRad(sudut) : sudut;
    const rad2 = 2 * rad;
    const radHalf = rad / 2;
    const hasilDiv = document.getElementById('hasil-ganda');
    const entries = [];

    if (isNaN(sudut)) {
        renderHasilTabel(hasilDiv, [], "Input sudut tidak valid.");
        return;
    }

    try {
        if (document.getElementById('sin-2theta-check').checked) {
            const val = Math.sin(rad2);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin(2θ)', val]);
        }
        if (document.getElementById('cos-2theta-check').checked) {
            const val = Math.cos(rad2);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cos(2θ)', val]);
        }
        if (document.getElementById('tan-2theta-check').checked) {
            const val = Math.tan(rad2);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['tan(2θ)', val]);
        }
        if (document.getElementById('sin-half-check').checked) {
            const val = Math.sin(radHalf);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin(θ/2)', val]);
        }
        if (document.getElementById('cos-half-check').checked) {
            const val = Math.cos(radHalf);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cos(θ/2)', val]);
        }
        if (document.getElementById('tan-half-check').checked) {
            const val = Math.tan(radHalf);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['tan(θ/2)', val]);
        }
        if (document.getElementById('csc-2theta-check').checked) {
            const val = 1 / Math.sin(rad2);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['csc(2θ)', val]);
        }
        if (document.getElementById('sec-2theta-check').checked) {
            const val = 1 / Math.cos(rad2);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sec(2θ)', val]);
        }
        if (document.getElementById('cot-2theta-check').checked) {
            const val = 1 / Math.tan(rad2);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cot(2θ)', val]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function hitungSelisih() {
    const aInput = document.getElementById('sudut-a-selisih');
    const bInput = document.getElementById('sudut-b-selisih');
    if (!aInput || !bInput) return;
    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    const unit = document.getElementById('unit-selisih').value;
    const radA = unit === 'derajat' ? toRad(a) : a;
    const radB = unit === 'derajat' ? toRad(b) : b;
    const hasilDiv = document.getElementById('hasil-selisih');
    const entries = [];

    if (isNaN(a) || isNaN(b)) {
        renderHasilTabel(hasilDiv, [], "Input sudut A atau B tidak valid.");
        return;
    }

    try {
        if (document.getElementById('sin-plus-sin-check').checked) {
            const sumSin = Math.sin(radA) + Math.sin(radB);
            if (!isFinite(sumSin)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin A + sin B', sumSin]);
        }
        if (document.getElementById('sin-min-sin-check').checked) {
            const diffSin = Math.sin(radA) - Math.sin(radB);
            if (!isFinite(diffSin)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin A - sin B', diffSin]);
        }
        if (document.getElementById('cos-plus-cos-check').checked) {
            const sumCos = Math.cos(radA) + Math.cos(radB);
            if (!isFinite(sumCos)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cos A + cos B', sumCos]);
        }
        if (document.getElementById('cos-min-cos-check').checked) {
            const diffCos = Math.cos(radA) - Math.cos(radB);
            if (!isFinite(diffCos)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cos A - cos B', diffCos]);
        }
        if (document.getElementById('tan-plus-tan-check').checked) {
            const sumTan = Math.tan(radA) + Math.tan(radB);
            if (!isFinite(sumTan)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['tan A + tan B', sumTan]);
        }
        if (document.getElementById('tan-min-tan-check').checked) {
            const diffTan = Math.tan(radA) - Math.tan(radB);
            if (!isFinite(diffTan)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['tan A - tan B', diffTan]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function hitungHukum() {
    const a = parseFloat(document.getElementById('sisi-a').value);
    const A = parseFloat(document.getElementById('sudut-a-hukum').value);
    const b = parseFloat(document.getElementById('sisi-b').value);
    const B = parseFloat(document.getElementById('sudut-b-hukum').value);
    const c = parseFloat(document.getElementById('sisi-c').value);
    const C = parseFloat(document.getElementById('sudut-c-hukum').value);
    const unit = document.getElementById('unit-hukum').value;
    const radA = unit === 'derajat' ? toRad(A) : A;
    const radB = unit === 'derajat' ? toRad(B) : B;
    const radC = unit === 'derajat' ? toRad(C) : C;
    const hasilDiv = document.getElementById('hasil-hukum');
    const entries = [];
    
    
    if (isNaN(a) && isNaN(A) && isNaN(b) && isNaN(B) && isNaN(c) && isNaN(C)) {
         renderHasilTabel(hasilDiv, [], "Masukkan setidaknya beberapa nilai (sisi/sudut).");
        return;
    }

    try {
        if (document.getElementById('sinus-law-check').checked) {
            
            if (!isNaN(a) && !isNaN(A) && A !== 0 && A !== 180) {
                 const ratioA = a / Math.sin(radA);
                 if (!isFinite(ratioA)) throw new Error('Nilai tidak terdefinisi dari a/sin A');
                 entries.push(['Rasio (a/sin A)', ratioA]);
                 
                 if (!isNaN(b) && isNaN(B)) { 
                     const sinB = b / ratioA;
                     if (Math.abs(sinB) > 1) entries.push(['Sudut B (dari b)', 'Tidak valid (sin B > 1)']);
                     else {
                         const angB = unit === 'derajat' ? toDeg(Math.asin(sinB)) : Math.asin(sinB);
                         entries.push(['Sudut B (dari b)', angB]);
                     }
                 }
                 if (isNaN(b) && !isNaN(B) && B !== 0 && B !== 180) { 
                     const sideB = ratioA * Math.sin(radB);
                     entries.push(['Sisi b (dari B)', sideB]);
                 }
            } else if (!isNaN(b) && !isNaN(B) && B !== 0 && B !== 180) {
                 const ratioB = b / Math.sin(radB);
                 if (!isFinite(ratioB)) throw new Error('Nilai tidak terdefinisi dari b/sin B');
                 entries.push(['Rasio (b/sin B)', ratioB]);
                 
            }
        }
        if (document.getElementById('cosinus-law-check').checked) {
            
            if (!isNaN(a) && !isNaN(b) && !isNaN(C)) {
                const cc = Math.sqrt(a*a + b*b - 2*a*b*Math.cos(radC));
                if (!isFinite(cc)) throw new Error('Nilai tidak terdefinisi');
                entries.push(['Sisi c (dari a, b, C)', cc]);
            }
            
            if (!isNaN(b) && !isNaN(c) && !isNaN(A)) {
                const aa = Math.sqrt(b*b + c*c - 2*b*c*Math.cos(radA));
                if (!isFinite(aa)) throw new Error('Nilai tidak terdefinisi');
                entries.push(['Sisi a (dari b, c, A)', aa]);
            }
            
            if (!isNaN(a) && !isNaN(c) && !isNaN(B)) {
                const bb = Math.sqrt(a*a + c*c - 2*a*c*Math.cos(radB));
                if (!isFinite(bb)) throw new Error('Nilai tidak terdefinisi');
                entries.push(['Sisi b (dari a, c, B)', bb]);
            }
            
            
            if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
                const cosA = (b*b + c*c - a*a) / (2*b*c);
                if (Math.abs(cosA) > 1) entries.push(['Sudut A (dari SSS)', 'Segitiga tidak valid (cos A > 1)']);
                else {
                    const angA = unit === 'derajat' ? toDeg(Math.acos(cosA)) : Math.acos(cosA);
                    entries.push(['Sudut A (dari SSS)', angA]);
                }
                
            }
        }
        if (entries.length === 0) {
            entries.push(['Info', 'Tidak ada perhitungan yang dapat dilakukan dengan input yang diberikan.']);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function hitungLuas() {
    const aInput = document.getElementById('sisi-a-luas');
    const bInput = document.getElementById('sisi-b-luas');
    const cInput = document.getElementById('sudut-c-luas');
    if (!aInput || !bInput || !cInput) return;
    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    const c = parseFloat(cInput.value);
    const unit = document.getElementById('unit-luas').value;
    const radC = unit === 'derajat' ? toRad(c) : c;
    const hasilDiv = document.getElementById('hasil-luas');
    
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        renderHasilTabel(hasilDiv, [], "Input sisi a, b, atau sudut C tidak valid.");
        return;
    }

    const luas = 0.5 * a * b * Math.sin(radC);
    const entries = [];

    try {
        if (!isFinite(luas)) throw new Error('Nilai tidak terdefinisi');
        entries.push(['Luas (½ ab sin C)', luas]);
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function hitungLingkaran() {
    const sudutInput = document.getElementById('sudut-lingkaran');
    if (!sudutInput) return;
    const sudut = parseFloat(sudutInput.value);
    const unit = document.getElementById('unit-lingkaran').value;
    const rad = unit === 'derajat' ? toRad(sudut) : sudut;
    const hasilDiv = document.getElementById('hasil-lingkaran');

    if (isNaN(sudut)) {
        renderHasilTabel(hasilDiv, [], "Input sudut tidak valid.");
        return;
    }

    const x = Math.cos(rad);
    const y = Math.sin(rad);
    const entries = [];

    try {
        if (!isFinite(x) || !isFinite(y)) throw new Error('Nilai tidak terdefinisi');
        entries.push(['Koordinat (x, y)', `(${formatNumber(x)}, ${formatNumber(y)})`]);
        entries.push(['cos θ (x)', x]);
        entries.push(['sin θ (y)', y]);
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function hitungKonversi() {
    const nilaiInput = document.getElementById('nilai-konversi');
    if (!nilaiInput) return;
    const nilai = parseFloat(nilaiInput.value);
    const tipe = document.getElementById('tipe-konversi').value;
    const hasilDiv = document.getElementById('hasil-konversi');
    const entries = [];
    
    if (isNaN(nilai)) {
        renderHasilTabel(hasilDiv, [], "Input nilai tidak valid.");
        return;
    }

    let hasil;

    try {
        if (tipe === 'degToRad') {
            hasil = nilai * Math.PI / 180;
            if (!isFinite(hasil)) throw new Error('Nilai tidak terdefinisi');
            entries.push([`${formatNumber(nilai)}°`, `${formatNumber(hasil)} rad`]);
        } else {
            hasil = nilai * 180 / Math.PI;
            if (!isFinite(hasil)) throw new Error('Nilai tidak terdefinisi');
            entries.push([`${formatNumber(nilai)} rad`, `${formatNumber(hasil)}°`]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function hitungPersamaan() {
    const fungsi = document.getElementById('fungsi-pers').value;
    const kInput = document.getElementById('nilai-k');
    if (!kInput) return;
    const k = parseFloat(kInput.value);
    const unit = document.getElementById('unit-pers').value;
    const hasilDiv = document.getElementById('hasil-pers');
    
    if (isNaN(k)) {
        renderHasilTabel(hasilDiv, [], "Input nilai k tidak valid.");
        return;
    }
    
    let solusi = '';
    const entries = [];

    try {
        let theta;
        let unitSymbol = unit === 'derajat' ? '°' : ' rad';
        let period = unit === 'derajat' ? 360 : 2 * Math.PI;
        let periodHalf = unit === 'derajat' ? 180 : Math.PI;
        
        
        const fPeriod = formatNumber(period);
        const fPeriodHalf = formatNumber(periodHalf);

        if (fungsi === 'sin') {
            if (Math.abs(k) > 1) throw new Error('Tidak ada solusi real (k harus antara -1 dan 1).');
            theta = Math.asin(k);
            theta = unit === 'derajat' ? toDeg(theta) : theta;
            let theta2 = periodHalf - theta;
            solusi = `θ = ${formatNumber(theta)}${unitSymbol} + n*${fPeriod}${unitSymbol} ATAU θ = ${formatNumber(theta2)}${unitSymbol} + n*${fPeriod}${unitSymbol}`;
        } else if (fungsi === 'cos') {
            if (Math.abs(k) > 1) throw new Error('Tidak ada solusi real (k harus antara -1 dan 1).');
            theta = Math.acos(k);
            theta = unit === 'derajat' ? toDeg(theta) : theta;
            solusi = `θ = ±${formatNumber(theta)}${unitSymbol} + n*${fPeriod}${unitSymbol}`;
        } else if (fungsi === 'tan') {
            theta = Math.atan(k);
            theta = unit === 'derajat' ? toDeg(theta) : theta;
            solusi = `θ = ${formatNumber(theta)}${unitSymbol} + n*${fPeriodHalf}${unitSymbol}`;
        } else if (fungsi === 'csc') {
            if (Math.abs(k) < 1) throw new Error('Tidak ada solusi real (k harus |k| >= 1).');
            theta = Math.asin(1/k);
            theta = unit === 'derajat' ? toDeg(theta) : theta;
            let theta2 = periodHalf - theta;
            solusi = `θ = ${formatNumber(theta)}${unitSymbol} + n*${fPeriod}${unitSymbol} ATAU θ = ${formatNumber(theta2)}${unitSymbol} + n*${fPeriod}${unitSymbol}`;
        } else if (fungsi === 'sec') {
            if (Math.abs(k) < 1) throw new Error('Tidak ada solusi real (k harus |k| >= 1).');
            theta = Math.acos(1/k);
            theta = unit === 'derajat' ? toDeg(theta) : theta;
            solusi = `θ = ±${formatNumber(theta)}${unitSymbol} + n*${fPeriod}${unitSymbol}`;
        } else if (fungsi === 'cot') {
            theta = (k === 0) ? (unit === 'derajat' ? 90 : Math.PI / 2) : Math.atan(1/k);
             if (k !== 0 && theta < 0) { 
                theta += periodHalf;
            }
            theta = unit === 'derajat' ? toDeg(theta) : theta;
            solusi = `θ = ${formatNumber(theta)}${unitSymbol} + n*${fPeriodHalf}${unitSymbol}`;
        }
        
        if (!isFinite(theta)) throw new Error('Perhitungan tidak terdefinisi.');
        entries.push(['Solusi Umum (n=integer)', solusi]);
        
        
        let solusiUtama = unit === 'derajat' ? toDeg(Math.asin(k)) : Math.asin(k); 
        if (fungsi === 'cos') solusiUtama = unit === 'derajat' ? toDeg(Math.acos(k)) : Math.acos(k);
        if (fungsi === 'tan') solusiUtama = unit === 'derajat' ? toDeg(Math.atan(k)) : Math.atan(k);
        if (fungsi === 'csc') solusiUtama = unit === 'derajat' ? toDeg(Math.asin(1/k)) : Math.asin(1/k);
        if (fungsi === 'sec') solusiUtama = unit === 'derajat' ? toDeg(Math.acos(1/k)) : Math.acos(1/k);
        if (fungsi === 'cot') solusiUtama = (k === 0) ? (unit === 'derajat' ? 90 : Math.PI / 2) : (unit === 'derajat' ? toDeg(Math.atan(1/k)) : Math.atan(1/k));
        
        entries.push(['Solusi Utama (Principal)', `${formatNumber(solusiUtama)}${unitSymbol}`]);
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function gambarGrafik() {
    const fungsi = document.getElementById('fungsi-grafik').value;
    let sudutInputVal = parseFloat(document.getElementById('sudut-grafik').value);
    const unit = document.getElementById('unit-grafik').value;
    const nilaiInput = parseFloat(document.getElementById('nilai-fungsi').value);
    
    let sudutInput = sudutInputVal; 
    if (unit === 'radian' && !isNaN(sudutInputVal)) {
        sudutInput = toDeg(sudutInputVal);
    }
    
    const canvas = document.getElementById('canvas-grafik');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scaleX = 50; 
    const scaleY = 50; 
    const gridSize = 20; 

    
    ctx.clearRect(0, 0, width, height);

    
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    
    ctx.strokeStyle = '#007bff'; 
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, centerY); ctx.lineTo(width, centerY); ctx.stroke();
    
    ctx.strokeStyle = '#28a745'; 
    ctx.beginPath(); ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height); ctx.stroke();

    
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right'; ctx.fillText('x', width - 10, centerY - 5);
    ctx.textAlign = 'center'; ctx.fillText('y', centerX + 10, 10);

    
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    for (let i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI / 2) {
        const xTick = centerX + i * scaleX * (2/Math.PI); 
        if (xTick < 0 || xTick > width) continue;
        ctx.beginPath(); ctx.moveTo(xTick, centerY - 5); ctx.lineTo(xTick, centerY + 5); ctx.stroke();
        let labelRad = (i/Math.PI).toFixed(1) + "π";
        if (i===0) labelRad = "0";
        if (i===Math.PI) labelRad = "π";
        if (i===-Math.PI) labelRad = "-π";
        ctx.fillText(labelRad, xTick, centerY + 20);
        ctx.fillText((i * 180 / Math.PI).toFixed(0) + '°', xTick, centerY + 35);
    }
    
    for (let i = -height/2; i <= height/2; i += scaleY) {
        if (i === 0) continue;
        const yTick = centerY - i;
        if (yTick < 0 || yTick > height) continue;
        ctx.beginPath(); ctx.moveTo(centerX - 5, yTick); ctx.lineTo(centerX + 5, yTick); ctx.stroke();
        ctx.fillText((i / scaleY).toFixed(0), centerX - 15, yTick + 5);
    }

    
    ctx.strokeStyle = '#dc3545';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let prevY = null;
    
    
    const plot = (x, y) => {
        if (isNaN(y) || !isFinite(y) || Math.abs(y) > height * 2) {
            prevY = null; 
        } else {
            if (prevY === null) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            prevY = y;
        }
    };

    for (let x = 0; x < width; x++) {
        const rad = (x - centerX) / (scaleX * 2 / Math.PI); 
        let y_val;
        switch (fungsi) {
            case 'sin': y_val = Math.sin(rad); break;
            case 'cos': y_val = Math.cos(rad); break;
            case 'tan': y_val = Math.tan(rad); break;
            case 'cosec': y_val = 1 / Math.sin(rad); break;
            case 'sec': y_val = 1 / Math.cos(rad); break;
            case 'cotan': y_val = 1 / Math.tan(rad); break;
        }
        const y = centerY - y_val * scaleY; 
        plot(x, y);
    }
    ctx.stroke();

    
    if (!isNaN(sudutInput)) {
        const deg = sudutInput;
        const rad = toRad(deg);
        let fungsiVal;
        switch (fungsi) {
            case 'sin': fungsiVal = Math.sin(rad); break;
            case 'cos': fungsiVal = Math.cos(rad); break;
            case 'tan': fungsiVal = Math.tan(rad); break;
            case 'cosec': fungsiVal = 1 / Math.sin(rad); break;
            case 'sec': fungsiVal = 1 / Math.cos(rad); break;
            case 'cotan': fungsiVal = 1 / Math.tan(rad); break;
        }
        if (isFinite(fungsiVal)) {
            const xPos = centerX + rad * (scaleX * 2 / Math.PI);
            const yPos = centerY - fungsiVal * scaleY;
            if (xPos > 0 && xPos < width && yPos > 0 && yPos < height) {
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(xPos, yPos, 5, 0, 2 * Math.PI); 
                ctx.fill();
                ctx.fillText(`${fungsi}(${deg}°) = ${fungsiVal.toFixed(2)}`, xPos + 10, yPos - 10);
            }
        }
    }

    
    if (!isNaN(nilaiInput)) {
        let thetaRad;
        let valid = true;
        switch (fungsi) {
            case 'sin':
                if (Math.abs(nilaiInput) > 1) valid = false;
                else thetaRad = Math.asin(nilaiInput);
                break;
            case 'cos':
                if (Math.abs(nilaiInput) > 1) valid = false;
                else thetaRad = Math.acos(nilaiInput);
                break;
            case 'tan': thetaRad = Math.atan(nilaiInput); break;
            case 'cosec':
                if (Math.abs(nilaiInput) < 1) valid = false;
                else thetaRad = Math.asin(1 / nilaiInput);
                break;
            case 'sec':
                if (Math.abs(nilaiInput) < 1) valid = false;
                else thetaRad = Math.acos(1 / nilaiInput);
                break;
            case 'cotan': thetaRad = Math.atan(1 / nilaiInput); break;
        }
        if (valid && isFinite(thetaRad)) {
            const thetaDeg = toDeg(thetaRad);
            const xPos = centerX + thetaRad * (scaleX * 2 / Math.PI);
            const yPos = centerY - nilaiInput * scaleY;
            if (xPos > 0 && xPos < width && yPos > 0 && yPos < height) {
                ctx.fillStyle = '#ff00ff';
                ctx.beginPath();
                ctx.arc(xPos, yPos, 5, 0, 2 * Math.PI); 
                ctx.fill();
                ctx.fillText(`${fungsi} = ${nilaiInput} at ${thetaDeg.toFixed(2)}°`, xPos + 10, yPos - 25);
            }
        }
    }

    
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
}


function hitungAplikasi() {
    const jarakInput = document.getElementById('jarak-aplikasi');
    const sudutInput = document.getElementById('sudut-aplikasi');
    if (!jarakInput || !sudutInput) return;
    const jarak = parseFloat(jarakInput.value);
    const sudut = parseFloat(sudutInput.value);
    const unit = document.getElementById('unit-aplikasi').value;
    const rad = unit === 'derajat' ? toRad(sudut) : sudut;
    const hasilDiv = document.getElementById('hasil-aplikasi');

    if (isNaN(jarak) || isNaN(sudut)) {
        renderHasilTabel(hasilDiv, [], "Input jarak atau sudut tidak valid.");
        return;
    }

    const tinggi = jarak * Math.tan(rad);
    const entries = [];

    try {
        if (!isFinite(tinggi)) throw new Error('Nilai tidak terdefinisi (mungkin sudut 90°?)');
        entries.push(['Tinggi pohon (jarak * tan θ)', `${formatNumber(tinggi)} m`]);
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function hitungProduk() {
    const aInput = document.getElementById('sudut-a-produk');
    const bInput = document.getElementById('sudut-b-produk');
    if (!aInput || !bInput) return;
    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    const unit = document.getElementById('unit-produk').value;
    const radA = unit === 'derajat' ? toRad(a) : a;
    const radB = unit === 'derajat' ? toRad(b) : b;
    const hasilDiv = document.getElementById('hasil-produk');
    const entries = [];
    
    if (isNaN(a) || isNaN(b)) {
        renderHasilTabel(hasilDiv, [], "Input sudut A atau B tidak valid.");
        return;
    }

    try {
        if (document.getElementById('sinAcosB-check').checked) {
            const val = Math.sin(radA) * Math.cos(radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin A cos B', val]);
        }
        if (document.getElementById('cosAcosB-check').checked) {
            const val = Math.cos(radA) * Math.cos(radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cos A cos B', val]);
        }
        if (document.getElementById('sinAsinB-check').checked) {
            const val = Math.sin(radA) * Math.sin(radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin A sin B', val]);
        }
        if (document.getElementById('tanAtanB-check').checked) {
            const val = Math.tan(radA) * Math.tan(radB);
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['tan A tan B', val]);
        }
        if (document.getElementById('cotAcotB-check').checked) {
            const val = (1 / Math.tan(radA)) * (1 / Math.tan(radB));
            if (!isFinite(val)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cot A cot B', val]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function hitungTiga() {
    const sudutInput = document.getElementById('sudut-tiga');
    if (!sudutInput) return;
    const sudut = parseFloat(sudutInput.value);
    const unit = document.getElementById('unit-tiga').value;
    const rad = unit === 'derajat' ? toRad(sudut) : sudut;
    const rad3 = 3 * rad;
    const hasilDiv = document.getElementById('hasil-tiga');
    const entries = [];
    
    if (isNaN(sudut)) {
        renderHasilTabel(hasilDiv, [], "Input sudut tidak valid.");
        return;
    }

    try {
        if (document.getElementById('sin-3theta-check').checked) {
            
            const sin3_rumus = 3 * Math.sin(rad) - 4 * Math.pow(Math.sin(rad), 3);
            const sin3_langsung = Math.sin(rad3);
            if (!isFinite(sin3_rumus)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin(3θ) (langsung)', sin3_langsung]);
            entries.push(['3sinθ - 4sin³θ (rumus)', sin3_rumus]);
        }
        if (document.getElementById('cos-3theta-check').checked) {
            const cos3_rumus = 4 * Math.pow(Math.cos(rad), 3) - 3 * Math.cos(rad);
            const cos3_langsung = Math.cos(rad3);
            if (!isFinite(cos3_rumus)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cos(3θ) (langsung)', cos3_langsung]);
            entries.push(['4cos³θ - 3cosθ (rumus)', cos3_rumus]);
        }
        if (document.getElementById('tan-3theta-check').checked) {
            const tan3 = Math.tan(rad3);
            if (!isFinite(tan3)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['tan(3θ)', tan3]);
        }
        if (document.getElementById('csc-3theta-check').checked) {
            const csc3 = 1 / Math.sin(rad3);
            if (!isFinite(csc3)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['csc(3θ)', csc3]);
        }
        if (document.getElementById('sec-3theta-check').checked) {
            const sec3 = 1 / Math.cos(rad3);
            if (!isFinite(sec3)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sec(3θ)', sec3]);
        }
        if (document.getElementById('cot-3theta-check').checked) {
            const cot3 = 1 / Math.tan(rad3);
            if (!isFinite(cot3)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['cot(3θ)', cot3]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function hitungInvers() {
    const kInput = document.getElementById('nilai-invers');
    if (!kInput) return;
    const k = parseFloat(kInput.value);
    const unit = document.getElementById('unit-invers').value;
    const hasilDiv = document.getElementById('hasil-invers');
    const entries = [];
    
    if (isNaN(k)) {
        renderHasilTabel(hasilDiv, [], "Input nilai k tidak valid.");
        return;
    }

    try {
        const unitSymbol = unit === 'derajat' ? '°' : ' rad';
        
        if (document.getElementById('arcsin-check').checked) {
            if (Math.abs(k) > 1) {
                entries.push([`arcsin(${k})`, 'Tidak terdefinisi (k > 1)']);
            } else {
                let theta = Math.asin(k);
                theta = unit === 'derajat' ? toDeg(theta) : theta;
                if (!isFinite(theta)) throw new Error('Nilai tidak terdefinisi');
                entries.push([`arcsin(${k})`, `${formatNumber(theta)}${unitSymbol}`]);
            }
        }
        if (document.getElementById('arccos-check').checked) {
             if (Math.abs(k) > 1) {
                entries.push([`arccos(${k})`, 'Tidak terdefinisi (k > 1)']);
            } else {
                let theta = Math.acos(k);
                theta = unit === 'derajat' ? toDeg(theta) : theta;
                if (!isFinite(theta)) throw new Error('Nilai tidak terdefinisi');
                entries.push([`arccos(${k})`, `${formatNumber(theta)}${unitSymbol}`]);
            }
        }
        if (document.getElementById('arctan-check').checked) {
            let theta = Math.atan(k);
            theta = unit === 'derajat' ? toDeg(theta) : theta;
            if (!isFinite(theta)) throw new Error('Nilai tidak terdefinisi');
            entries.push([`arctan(${k})`, `${formatNumber(theta)}${unitSymbol}`]);
        }
        if (document.getElementById('arccsc-check').checked) {
            if (Math.abs(k) < 1) {
                entries.push([`arccsc(${k})`, 'Tidak terdefinisi (k < 1)']);
            } else {
                let theta = Math.asin(1/k);
                theta = unit === 'derajat' ? toDeg(theta) : theta;
                if (!isFinite(theta)) throw new Error('Nilai tidak terdefinisi');
                entries.push([`arccsc(${k})`, `${formatNumber(theta)}${unitSymbol}`]);
            }
        }
        if (document.getElementById('arcsec-check').checked) {
             if (Math.abs(k) < 1) {
                entries.push([`arcsec(${k})`, 'Tidak terdefinisi (k < 1)']);
            } else {
                let theta = Math.acos(1/k);
                theta = unit === 'derajat' ? toDeg(theta) : theta;
                if (!isFinite(theta)) throw new Error('Nilai tidak terdefinisi');
                entries.push([`arcsec(${k})`, `${formatNumber(theta)}${unitSymbol}`]);
            }
        }
        if (document.getElementById('arccot-check').checked) {
            let theta = (k === 0) ? (Math.PI / 2) : Math.atan(1/k);
            if (k < 0) theta += Math.PI; 
            theta = unit === 'derajat' ? toDeg(theta) : theta;
            if (!isFinite(theta)) throw new Error('Nilai tidak terdefinisi');
            entries.push([`arccot(${k})`, `${formatNumber(theta)}${unitSymbol}`]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}

function hitungIdentitasLanjutan() {
    const sudutInput = document.getElementById('sudut-lanjutan');
    if (!sudutInput) return;
    const sudut = parseFloat(sudutInput.value);
    const unit = document.getElementById('unit-lanjutan').value;
    const rad = unit === 'derajat' ? toRad(sudut) : sudut;
    const hasilDiv = document.getElementById('hasil-lanjutan');
    const entries = [];
    
    if (isNaN(sudut)) {
        renderHasilTabel(hasilDiv, [], "Input sudut tidak valid.");
        return;
    }

    try {
        if (document.getElementById('sin-cos-check').checked) {
            const sinDivCos = Math.sin(rad) / Math.cos(rad);
            const tanVal = Math.tan(rad);
            if (!isFinite(sinDivCos) || !isFinite(tanVal)) throw new Error('Nilai tidak terdefinisi');
            entries.push(['sin θ / cos θ', sinDivCos]);
            entries.push(['tan θ', tanVal]);
        }
        if (document.getElementById('csc-sec-check').checked) {
            const csc = 1 / Math.sin(rad);
            const sec = 1 / Math.cos(rad);
            const cot = 1 / Math.tan(rad);
            if (!isFinite(csc)) entries.push(['1 / sin θ (csc θ)', 'Tidak Terdefinisi']);
            else entries.push(['1 / sin θ (csc θ)', csc]);
            
            if (!isFinite(sec)) entries.push(['1 / cos θ (sec θ)', 'Tidak Terdefinisi']);
            else entries.push(['1 / cos θ (sec θ)', sec]);

            if (!isFinite(cot)) entries.push(['1 / tan θ (cot θ)', 'Tidak Terdefinisi']);
            else entries.push(['1 / tan θ (cot θ)', cot]);
        }
        renderHasilTabel(hasilDiv, entries);
    } catch (e) {
        renderHasilTabel(hasilDiv, [], e.message);
    }
}