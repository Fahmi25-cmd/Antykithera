const konversiData = {
    'panjang': {
        'pikometer': 1e-12,
        'nanometer': 1e-9,
        'mikrometer': 1e-6,
        'inci': 0.0254,
        'milimeter': 0.001,
        'sentimeter': 0.01,
        'kaki': 0.3048,
        'desimeter': 0.1,
        'yard': 0.9144,
        'meter': 1,
        'dekameter': 10,
        'hektometer': 100,
        'kilometer': 1000,
        'mil': 1609.34,
        'mil laut': 1852,
        'tahun cahaya': 9.461e15
    },
    'massa': {
        'mikrogram': 1e-9,
        'karat': 0.0002,
        'miligram': 1e-6,
        'sentigram': 1e-5,
        'desigram': 1e-4,
        'gram': 0.001,
        'dekagram': 0.01,
        'ons': 0.1,
        'hektogram': 0.1,
        'pon': 0.453592,
        'kilogram': 1,
        'kwintal': 100,
        'ton': 1000,
    },
    'waktu': {
        'nanodetik': 1e-9,
        'mikrodetik': 1e-6,
        'milidetik': 0.001,
        'detik': 1,
        'menit': 60,
        'jam': 3600,
        'hari': 86400,
        'minggu': 604800,
        'bulan': 2592000,
        'tahun': 31536000,
        'dekade': 315360000,
        'abad': 3153600000
    },
    'arus-listrik': {
        'nanoampere': 1e-9,
        'mikroampere': 1e-6,
        'miliampere': 0.001,
        'ampere': 1,
        'kiloampere': 1000
    },
    'suhu': {
        
        'rankine': 'Ra', 
        'fahrenheit': 'F',
        'celsius': 'C',
        'reamur': 'R',
        'kelvin': 'K' 
    },
    'jumlah-zat': {
        'mikromol': 1e-6,
        'milimol': 0.001,
        'mol': 1,
        'kilomol': 1000,
    },
    'intensitas-cahaya': {
        'milicandela': 0.001,
        'candela': 1,
        'kilocandela': 1000,
    },
    'luas': {
        'milimeter persegi': 1e-6,
        'sentimeter persegi': 1e-4,
        'kaki persegi': 0.092903,
        'yard persegi': 0.836127,
        'meter persegi': 1,
        'are': 100,
        'akre': 4046.86,
        'hektar': 10000,
        'kilometer persegi': 1e6,
        'mil persegi': 2.59e6
    },
    'volume': {
        'mililiter': 1e-6,
        'sentiliter': 1e-5,
        'pint': 0.000473176,
        'quart': 0.000946353,
        'desiliter': 1e-4,
        'liter': 0.001,
        'galon': 0.00378541,
        'kaki kubik': 0.0283168,
        'barrel': 0.158987,
        'meter kubik': 1,
        'kilometer kubik': 1e9,
    },
    'kecepatan': {
        'sentimeter per detik': 0.01,
        'kilometer per jam': 0.277778,
        'kaki per detik': 0.3048,
        'mil per jam': 0.44704,
        'knot': 0.514444,
        'meter per detik': 1,
    },
    'percepatan': {
        'kilometer per jam kuadrat': 7.716e-5,
        'sentimeter per detik kuadrat': 0.01,
        'meter per detik kuadrat': 1,
        'gravitasi standar': 9.80665,
    },
    'gaya': {
        'dyne': 1e-5,
        'pon-gaya': 4.44822,
        'kilogram-gaya': 9.80665,
        'newton': 1,
        'kilonewton': 1000,
        'meganewton': 1e6,
    },
    'tekanan': {
        'pascal': 1,
        'milibar': 100,
        'torr': 133.322,
        'milimeter merkuri': 133.322,
        'psi': 6894.76,
        'bar': 1e5,
        'kilopascal': 1000, 
        
        
        'atmosfer': 101325,
        'megapascal': 1e6,
    },
    'energi': {
        'elektronvolt': 1.602e-19,
        'joule': 1,
        'kalori': 4.184,
        'BTU': 1055.06,
        'kilojoule': 1000,
        'kilokalori': 4184,
        'watt-jam': 3600,
        'megajoule': 1e6,
        'kilowatt-jam': 3.6e6,
    },
    'daya': {
        'BTU per jam': 0.293071,
        'watt': 1,
        'tenaga kuda': 745.7,
        'kilowatt': 1000,
        'megawatt': 1e6,
    },
    'usaha': {
        'erg': 1e-7,
        'joule': 1,
        'watt-detik': 1,
        'kalori': 4.184,
        'kilojoule': 1000,
    },
    'berat': {
        'gram-gaya': 0.00980665,
        'pon-gaya': 4.44822,
        'kilogram-gaya': 9.80665,
        'newton': 1,
        'kilonewton': 1000,
    },
    'densitas': {
        'kilogram per meter kubik': 1,
        'pon per kaki kubik': 16.0185,
        'pon per galon': 119.826,
        'gram per sentimeter kubik': 1000,
        'gram per mililiter': 1000,
        'kilogram per liter': 1000,
    },
    'frekuensi': {
        'RPM': 0.0166667,
        'hertz': 1,
        'kilohertz': 1000,
        'megahertz': 1e6,
        'gigahertz': 1e9,
    },
    'tegangan-listrik': {
        'nanovolt': 1e-9,
        'mikrovolt': 1e-6,
        'milivolt': 0.001,
        'volt': 1,
        'kilovolt': 1000,
        'megavolt': 1e6
    },
    'hambatan-listrik': {
        'mikroohm': 1e-6,
        'miliohm': 0.001,
        'ohm': 1,
        'kiloohm': 1000,
        'megaohm': 1e6
    },
    'muatan-listrik': {
        'nanocoulomb': 1e-9,
        'microcoulomb': 1e-6,
        'millicoulomb': 0.001,
        'coulomb': 1,
        'milliampere-jam': 3.6,
        'ampere-jam': 3600,
    },
    'uang': {
        'IDR': 1,
        'JPY': 105,
        'CNY': 2200,
        'MYR': 3500,
        'AUD': 10300,
        'SGD': 11600,
        'USD': 15700,
        'EUR': 17000,
        'GBP': 19800,
    }
};

function tampilkanKalkulator() {
    const besaran = document.getElementById('pilih-besaran').value;
    const area = document.getElementById('kalkulator-area');
    area.innerHTML = '';

    if (!besaran) return;

    let html = `<h2>Konversi ${besaran.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}</h2>`;
    
    
    if (besaran === 'suhu') {
        
        html += `<p><label>Jenis Konversi:</label>`;
        html += `<select id="jenis-konversi-suhu" onchange="tampilkanFormSuhu()">`;
        html += `<option value="">--Pilih--</option>`;
        html += `<option value="standar">Konversi Standar (C, F, K, R, Ra)</option>`;
        html += `<option value="custom">Konversi Custom (Titik Beku & Didih)</option>`;
        html += `</select></p>`;
        html += `<div id="form-suhu"></div>`;
    } else {
        const satuan = konversiData[besaran];
        if (!satuan) return;

        
        const orderedKeys = Object.keys(satuan);

        
        html += `<p><label for="nilai-input">Nilai:</label>`;
        html += `<input type="number" id="nilai-input" placeholder="Masukkan nilai" step="any"></p>`;
        
        
        html += `<p><label for="satuan-asal">Dari Satuan:</label>`;
        html += `<select id="satuan-asal">`;
        for (let key of orderedKeys) { 
            html += `<option value="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</option>`;
        }
        html += `</select></p>`;
        
        
        html += `<p><label for="satuan-tujuan">Ke Satuan:</label>`;
        html += `<select id="satuan-tujuan">`;
        for (let key of orderedKeys) { 
            html += `<option value="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</option>`;
        }
        html += `</select></p><br>`;
        
        html += `<button onclick="hitungKonversi('${besaran}')">Konversi</button>`;
    }
    
    html += `<div id="hasil-konversi"></div>`;
    area.innerHTML = html;

    
    if (besaran !== 'suhu') {
        const inputs = area.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    hitungKonversi(besaran);
                }
            });
        });
    }
}

function tampilkanFormSuhu() {
    const jenis = document.getElementById('jenis-konversi-suhu').value;
    const formArea = document.getElementById('form-suhu');
    const hasilArea = document.getElementById('hasil-konversi');
    formArea.innerHTML = '';
    hasilArea.innerHTML = '';

    if (!jenis) return;

    let html = '';
    
    
    const satuanSuhu = konversiData['suhu'];
    const orderedKeys = Object.keys(satuanSuhu);

    if (jenis === 'standar') {
        
        html += `<p><label for="nilai-input">Nilai:</label>`;
        html += `<input type="number" id="nilai-input" placeholder="Masukkan nilai" step="any"></p>`;
        
        
        html += `<p><label for="satuan-asal">Dari Satuan:</label>`;
        html += `<select id="satuan-asal">`;
        for (let key of orderedKeys) {
            const symbol = satuanSuhu[key];
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            html += `<option value="${key}">${label} (${symbol === 'K' ? 'K' : `°${symbol}`})</option>`;
        }
        html += `</select></p>`;
        
        
        html += `<p><label for="satuan-tujuan">Ke Satuan:</label>`;
        html += `<select id="satuan-tujuan">`;
        for (let key of orderedKeys) {
            const symbol = satuanSuhu[key];
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            html += `<option value="${key}">${label} (${symbol === 'K' ? 'K' : `°${symbol}`})</option>`;
        }
        html += `</select></p><br>`;
        
        html += `<button onclick="hitungKonversiSuhu('standar')">Konversi</button>`;
    } else if (jenis === 'custom') {
        html += `<h3>Parameter Skala Custom</h3>`;
        
        html += `<p><label for="titik-beku-custom">Titik Beku Air (°X):</label>`;
        html += `<input type="number" id="titik-beku-custom" placeholder="Contoh: 100" step="any"></p>`;
        
        
        html += `<p><label for="titik-didih-custom">Titik Didih Air (°X):</label>`;
        html += `<input type="number" id="titik-didih-custom" placeholder="Contoh: 215" step="any"></p>`;
        
        html += `<h3>Konversi</h3>`;
        
        html += `<p><label for="nilai-input">Nilai:</label>`;
        html += `<input type="number" id="nilai-input" placeholder="Masukkan nilai" step="any"></p>`;
        
        
        html += `<p><label for="arah-konversi">Arah Konversi:</label>`;
        html += `<select id="arah-konversi">`;
        html += `<option value="celsius-to-custom">Celsius ke Custom (°X)</option>`;
        html += `<option value="custom-to-celsius">Custom (°X) ke Celsius</option>`;
        html += `</select></p><br>`;
        
        html += `<button onclick="hitungKonversiSuhu('custom')">Konversi</button>`;
    }

    formArea.innerHTML = html;

    
    const inputs = formArea.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                hitungKonversiSuhu(jenis);
            }
        });
    });
}


function hitungKonversi(besaran) {
    const hasilArea = document.getElementById('hasil-konversi');
    
    try {
        const nilai = parseFloat(document.getElementById('nilai-input').value);
        const satuanAsal = document.getElementById('satuan-asal').value;
        const satuanTujuan = document.getElementById('satuan-tujuan').value;
        
        if (isNaN(nilai)) throw new Error('Nilai harus berupa angka');
        
        const konversi = konversiData[besaran];
        
        const nilaiDasar = nilai * konversi[satuanAsal];
        let hasil = nilaiDasar / konversi[satuanTujuan];
        
        if (Math.abs(hasil) < 9e-99) {
            hasil = 0;
        }
        
        const hasilFormatted = parseFloat(hasil.toPrecision(15)).toString();
        
        const labelAsal = satuanAsal.charAt(0).toUpperCase() + satuanAsal.slice(1);
        const labelTujuan = satuanTujuan.charAt(0).toUpperCase() + satuanTujuan.slice(1);

        hasilArea.innerHTML = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #0b2c66; color: white;">
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 10px;">Nilai Awal</td>
                    <td style="border: 1px solid #ccc; padding: 10px;">${nilai} ${labelAsal}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 10px;">Hasil Konversi</td>
                    <td style="border: 1px solid #ccc; padding: 10px;">${hasilFormatted} ${labelTujuan}</td>
                </tr>
            </table>
        `;
    } catch (error) {
        hasilArea.innerHTML = `<p style="color: red;">Error: ${error.message || 'Input tidak valid'}</p>`;
    }
}


function hitungKonversiSuhu(jenis) {
    const hasilArea = document.getElementById('hasil-konversi');
    
    try {
        const nilai = parseFloat(document.getElementById('nilai-input').value);
        if (isNaN(nilai)) throw new Error('Nilai harus berupa angka');
        
        let hasil;
        let labelAsal, labelTujuan;
        
        
        const simbolSuhu = {'celsius': '°C', 'fahrenheit': '°F', 'kelvin': 'K', 'reamur': '°R', 'rankine': '°Ra'};
        
        if (jenis === 'standar') {
            const satuanAsal = document.getElementById('satuan-asal').value;
            const satuanTujuan = document.getElementById('satuan-tujuan').value;
            
            
            let celsius;
            switch (satuanAsal) {
                case 'celsius':
                    celsius = nilai;
                    break;
                case 'fahrenheit':
                    celsius = (nilai - 32) * 5/9;
                    break;
                case 'kelvin':
                    celsius = nilai - 273.15;
                    break;
                case 'reamur':
                    
                                           
                    celsius = nilai * 5/4; 
                    break;
                case 'rankine':
                    celsius = (nilai - 491.67) * 5/9;
                    break;
            }
            
            
            switch (satuanTujuan) {
                case 'celsius':
                    hasil = celsius;
                    break;
                case 'fahrenheit':
                    hasil = (celsius * 9/5) + 32;
                    break;
                case 'kelvin':
                    hasil = celsius + 273.15;
                    break;
                case 'reamur':
                    hasil = celsius * 4/5;
                    break;
                case 'rankine':
                    hasil = (celsius * 9/5) + 491.67;
                    break;
            }
            
            labelAsal = simbolSuhu[satuanAsal];
            labelTujuan = simbolSuhu[satuanTujuan]; 

            
            const hasilFormatted = parseFloat(hasil.toFixed(4)).toString();
            
            hasilArea.innerHTML = `
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr style="background-color: #0b2c66; color: white;">
                        <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                        <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 10px;">Nilai Awal</td>
                        <td style="border: 1px solid #ccc; padding: 10px;">${nilai} ${labelAsal}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 10px;">Hasil Konversi</td>
                        <td style="border: 1px solid #ccc; padding: 10px;">${hasilFormatted} ${labelTujuan}</td>
                    </tr>
                </table>
            `;
            
        } else if (jenis === 'custom') {
            const titikBeku = parseFloat(document.getElementById('titik-beku-custom').value);
            const titikDidih = parseFloat(document.getElementById('titik-didih-custom').value);
            const arah = document.getElementById('arah-konversi').value;
            
            if (isNaN(titikBeku) || isNaN(titikDidih)) {
                throw new Error('Titik beku dan didih harus diisi');
            }
            
            if (titikBeku >= titikDidih) {
                throw new Error('Titik didih harus lebih besar dari titik beku');
            }
            
            
            if (arah === 'celsius-to-custom') {
                
                hasil = (nilai / 100) * (titikDidih - titikBeku) + titikBeku;
                labelAsal = '°C';
                labelTujuan = '°X';
            } else {
                
                hasil = ((nilai - titikBeku) / (titikDidih - titikBeku)) * 100;
                labelAsal = '°X';
                labelTujuan = '°C';
            }
            
            
            const hasilFormatted = parseFloat(hasil.toFixed(4)).toString();

            hasilArea.innerHTML = `
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr style="background-color: #0b2c66; color: white;">
                        <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                        <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 10px;">Titik Beku Air (Custom)</td>
                        <td style="border: 1px solid #ccc; padding: 10px;">${titikBeku} °X</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 10px;">Titik Didih Air (Custom)</td>
                        <td style="border: 1px solid #ccc; padding: 10px;">${titikDidih} °X</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 10px;">Nilai Awal</td>
                        <td style="border: 1px solid #ccc; padding: 10px;">${nilai} ${labelAsal}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 10px;">Hasil Konversi</td>
                        <td style="border: 1px solid #ccc; padding: 10px;">${hasilFormatted} ${labelTujuan}</td>
                    </tr>
                </table>
            `;
            return;
        }
    } catch (error) {
        hasilArea.innerHTML = `<p style="color: red;">Error: ${error.message || 'Input tidak valid'}</p>`;
    }
}
