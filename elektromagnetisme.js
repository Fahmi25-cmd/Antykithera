const k = 8.987551787e9; 
const epsilon0 = 8.854187817e-12; 
const mu0 = 4 * Math.PI * 1e-7; 
const c = 299792458; 

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

        document.addEventListener('keydown', handleEnterKey);
    } else {
        document.removeEventListener('keydown', handleEnterKey);
    }
}

function getOpsiParameter(topik) {
    switch (topik) {
        case 'hukum-coulomb':
            return {
                'F-coulomb': 'Gaya Coulomb (F)',
                'q1-coulomb': 'Muatan q₁',
                'q2-coulomb': 'Muatan q₂',
                'r-coulomb': 'Jarak (r)'
            };
        case 'medan-listrik':
            return {
                'E-dari-F': 'Medan Listrik dari Gaya (E)',
                'E-dari-Q': 'Medan Listrik dari Muatan (E)',
                'F-medan': 'Gaya pada Muatan (F)',
                'Q-medan': 'Muatan Sumber (Q)'
            };
        case 'potensial-listrik':
            return {
                'V-dari-W': 'Potensial dari Usaha (V)',
                'V-dari-Q': 'Potensial dari Muatan (V)',
                'W-potensial': 'Usaha (W)',
                'Q-potensial': 'Muatan Sumber (Q)'
            };
        case 'energi-potensial-listrik':
            return {
                'U-potensial': 'Energi Potensial (U)'
            };
        case 'fluks-listrik':
            return {
                'fluks-E': 'Fluks Listrik (ΦE)'
            };
        case 'hukum-gauss':
            return {
                'fluks-gauss': 'Fluks dari Muatan (ΦE)',
                'E-gauss': 'Medan Listrik (E)'
            };
        case 'kapasitansi':
            return {
                'C-dari-QV': 'Kapasitansi dari Q dan V (C)',
                'C-kepingan': 'Kapasitansi Kepingan Sejajar (C)',
                'Q-kapasitor': 'Muatan (Q)',
                'V-kapasitor': 'Tegangan (V)'
            };
        case 'energi-kapasitor':
            return {
                'U-dari-CV': 'Energi dari C dan V (U)',
                'U-dari-Q': 'Energi dari Q (U)',
                'U-dari-QV': 'Energi dari Q dan V (U)'
            };
        case 'kapasitor-seri':
            return {
                'C-seri-2': 'Kapasitor Seri (2 buah)',
                'C-seri-3': 'Kapasitor Seri (3 buah)'
            };
        case 'kapasitor-paralel':
            return {
                'C-paralel-2': 'Kapasitor Paralel (2 buah)',
                'C-paralel-3': 'Kapasitor Paralel (3 buah)'
            };
        case 'arus-listrik':
            return {
                'I-arus': 'Arus Listrik (I)',
                'Q-arus': 'Muatan (Q)',
                't-arus': 'Waktu (t)'
            };
        case 'hambatan':
            return {
                'R-hambatan': 'Hambatan (R)',
                'rho-hambatan': 'Resistivitas (ρ)',
                'L-hambatan': 'Panjang Kawat (L)'
            };
        case 'hukum-ohm':
            return {
                'V-ohm': 'Tegangan (V)',
                'I-ohm': 'Arus (I)',
                'R-ohm': 'Hambatan (R)'
            };
        case 'daya-listrik':
            return {
                'P-dari-VI': 'Daya dari V dan I (P)',
                'P-dari-I2R': 'Daya dari I² R (P)',
                'P-dari-V2R': 'Daya dari V²/R (P)'
            };
        case 'energi-listrik':
            return {
                'E-listrik': 'Energi Listrik (E)'
            };
        case 'rangkaian-seri':
            return {
                'R-seri-2': 'Hambatan Seri (2 buah)',
                'R-seri-3': 'Hambatan Seri (3 buah)'
            };
        case 'rangkaian-paralel':
            return {
                'R-paralel-2': 'Hambatan Paralel (2 buah)',
                'R-paralel-3': 'Hambatan Paralel (3 buah)'
            };
        case 'rangkaian-campuran':
            return {
                'R-campuran': 'Hambatan Total Campuran'
            };
        case 'tegangan':
            return {
                'V-ggl': 'Tegangan pada GGL (V)'
            };
        case 'gaya-magnetik':
            return {
                'F-magnetik': 'Gaya Magnetik (F)',
                'B-magnetik': 'Medan Magnet (B)',
                'q-magnetik': 'Muatan (q)'
            };
        case 'medan-magnetik':
            return {
                'B-kawat-lurus': 'Medan Magnet Kawat Lurus (B)'
            };
        case 'hukum-biotsavart':
            return {
                'B-biotsavart': 'Medan Magnet Biot-Savart (B)'
            };
        case 'gaya-lorentz':
            return {
                'F-lorentz': 'Gaya Lorentz (F)'
            };
        case 'gaya-pada-kawat':
            return {
                'F-kawat': 'Gaya pada Kawat (F)'
            };
        case 'hukum-ampere':
            return {
                'B-ampere': 'Medan Magnet Ampere (B)'
            };
        case 'hukum-faraday':
            return {
                'ggl-faraday': 'GGL Induksi Faraday (ε)'
            };
        case 'ggl-induksi':
            return {
                'ggl-induksi': 'GGL Induksi (ε)'
            };
        case 'hukum-lenz':
            return {
                'ggl-lenz': 'GGL Induksi Lenz (ε)'
            };
        case 'induktansi':
            return {
                'L-induktansi': 'Induktansi (L)',
                'fluks-induktansi': 'Fluks Magnet (ΦB)'
            };
        case 'energi-induktor':
            return {
                'U-induktor': 'Energi Induktor (U)'
            };
        case 'arus-ac':
            return {
                'I-ac': 'Arus AC Sesaat (I)',
                'Irms-ac': 'Arus RMS (Irms)'
            };
        case 'tegangan-ac':
            return {
                'V-ac': 'Tegangan AC Sesaat (V)',
                'Vrms-ac': 'Tegangan RMS (Vrms)'
            };
        case 'impedansi':
            return {
                'Z-impedansi': 'Impedansi (Z)',
                'XL-impedansi': 'Reaktansi Induktif (XL)',
                'XC-impedansi': 'Reaktansi Kapasitif (XC)'
            };
        case 'resonansi':
            return {
                'f-resonansi': 'Frekuensi Resonansi (f)'
            };
        case 'daya-ac':
            return {
                'P-ac': 'Daya AC (P)',
                'cos-phi': 'Faktor Daya (cos φ)'
            };
        case 'persamaan-gelombang':
            return {
                'E-gelombang': 'Medan Listrik Gelombang (E)',
                'B-gelombang': 'Medan Magnet Gelombang (B)'
            };
        case 'kecepatan-gelombang':
            return {
                'v-dari-lambda-f': 'Kecepatan dari λ dan f (v)',
                'v-vakum': 'Kecepatan di Vakum (c)'
            };
        case 'intensitas-gelombang':
            return {
                'I-gelombang': 'Intensitas Gelombang (I)'
            };
        case 'panjang-gelombang':
            return {
                'lambda-gelombang': 'Panjang Gelombang (λ)'
            };
        case 'frekuensi-gelombang':
            return {
                'f-gelombang': 'Frekuensi (f)'
            };
        case 'energi-magnetik':
            return {
                'U-magnetik-volume': 'Energi Magnetik dari B (U)',
                'U-magnetik-induktor': 'Energi Magnetik dari L (U)'
            };
        case 'momentum-magnetik':
            return {
                'mu-magnetik': 'Momen Magnetik (μ)'
            };
        case 'gaya-pada-partikel':
            return {
                'F-partikel': 'Gaya pada Partikel (F)'
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
        case 'F-coulomb':
            inputs = { q1: 'Muatan q₁ (C, Coulomb)', q2: 'Muatan q₂ (C, Coulomb)', r: 'Jarak (r, meter)' };
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungCoulomb(q1, q2, r, "F")';
            namaVariabel = 'F';
            break;
        case 'q1-coulomb':
            inputs = { F: 'Gaya (F, Newton)', q2: 'Muatan q₂ (C, Coulomb)', r: 'Jarak (r, meter)' };
            satuanHasil = 'Coulomb (C)';
            fungsiHitung = 'hitungCoulomb(F, q2, r, "q1")';
            namaVariabel = 'q₁';
            break;
        case 'q2-coulomb':
            inputs = { F: 'Gaya (F, Newton)', q1: 'Muatan q₁ (C, Coulomb)', r: 'Jarak (r, meter)' };
            satuanHasil = 'Coulomb (C)';
            fungsiHitung = 'hitungCoulomb(F, q1, r, "q2")';
            namaVariabel = 'q₂';
            break;
        case 'r-coulomb':
            inputs = { F: 'Gaya (F, Newton)', q1: 'Muatan q₁ (C, Coulomb)', q2: 'Muatan q₂ (C, Coulomb)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungCoulomb(F, q1, q2, "r")';
            namaVariabel = 'r';
            break;

        case 'E-dari-F':
            inputs = { F: 'Gaya (F, Newton)', q: 'Muatan Uji (q, Coulomb)' };
            satuanHasil = 'N/C';
            fungsiHitung = 'hitungMedanListrik(F, q, null, "E-dari-F")';
            namaVariabel = 'E';
            break;
        case 'E-dari-Q':
            inputs = { Q: 'Muatan Sumber (Q, Coulomb)', r: 'Jarak (r, meter)' };
            satuanHasil = 'N/C';
            fungsiHitung = 'hitungMedanListrik(Q, r, null, "E-dari-Q")';
            namaVariabel = 'E';
            break;
        case 'F-medan':
            inputs = { q: 'Muatan (q, Coulomb)', E: 'Medan Listrik (E, N/C)' };
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungMedanListrik(q, E, null, "F")';
            namaVariabel = 'F';
            break;
        case 'Q-medan':
            inputs = { E: 'Medan Listrik (E, N/C)', r: 'Jarak (r, meter)' };
            satuanHasil = 'Coulomb (C)';
            fungsiHitung = 'hitungMedanListrik(E, r, null, "Q")';
            namaVariabel = 'Q';
            break;

        case 'V-dari-W':
            inputs = { W: 'Usaha (W, Joule)', q: 'Muatan (q, Coulomb)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungPotensialListrik(W, q, null, "V-dari-W")';
            namaVariabel = 'V';
            break;
        case 'V-dari-Q':
            inputs = { Q: 'Muatan Sumber (Q, Coulomb)', r: 'Jarak (r, meter)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungPotensialListrik(Q, r, null, "V-dari-Q")';
            namaVariabel = 'V';
            break;
        case 'W-potensial':
            inputs = { q: 'Muatan (q, Coulomb)', V: 'Potensial (V, Volt)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungPotensialListrik(q, V, null, "W")';
            namaVariabel = 'W';
            break;
        case 'Q-potensial':
            inputs = { V: 'Potensial (V, Volt)', r: 'Jarak (r, meter)' };
            satuanHasil = 'Coulomb (C)';
            fungsiHitung = 'hitungPotensialListrik(V, r, null, "Q")';
            namaVariabel = 'Q';
            break;

        case 'U-potensial':
            inputs = { q1: 'Muatan q₁ (C)', q2: 'Muatan q₂ (C)', r: 'Jarak (r, m)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiPotensialListrik(q1, q2, r)';
            namaVariabel = 'U';
            break;

        case 'fluks-E':
            inputs = { E: 'Medan Listrik (E, N/C)', A: 'Luas Permukaan (A, m²)', theta: 'Sudut (θ)' };
            satuanHasil = 'Nm²/C';
            fungsiHitung = 'hitungFluksListrik(E, A, theta)';
            namaVariabel = 'ΦE';
            break;

        case 'fluks-gauss':
            inputs = { Q: 'Muatan Tertutup (Q, C)' };
            satuanHasil = 'Nm²/C';
            fungsiHitung = 'hitungHukumGauss(Q, null, null, "fluks")';
            namaVariabel = 'ΦE';
            break;
        case 'E-gauss':
            inputs = { Q: 'Muatan Tertutup (Q, C)', A: 'Luas Permukaan (A, m²)' };
            satuanHasil = 'N/C';
            fungsiHitung = 'hitungHukumGauss(Q, A, null, "E")';
            namaVariabel = 'E';
            break;

        case 'C-dari-QV':
            inputs = { Q: 'Muatan (Q, C)', V: 'Tegangan (V, Volt)' };
            satuanHasil = 'Farad (F)';
            fungsiHitung = 'hitungKapasitansi(Q, V, null, null, null, "C-dari-QV")';
            namaVariabel = 'C';
            break;
        case 'C-kepingan':
            inputs = { A: 'Luas Kepingan (A, m²)', d: 'Jarak Kepingan (d, m)', er: 'Permitivitas Relatif (εr)' };
            satuanHasil = 'Farad (F)';
            fungsiHitung = 'hitungKapasitansi(A, d, er, null, null, "C-kepingan")';
            namaVariabel = 'C';
            break;
        case 'Q-kapasitor':
            inputs = { C: 'Kapasitansi (C, F)', V: 'Tegangan (V, Volt)' };
            satuanHasil = 'Coulomb (C)';
            fungsiHitung = 'hitungKapasitansi(C, V, null, null, null, "Q")';
            namaVariabel = 'Q';
            break;
        case 'V-kapasitor':
            inputs = { Q: 'Muatan (Q, C)', C: 'Kapasitansi (C, F)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungKapasitansi(Q, C, null, null, null, "V")';
            namaVariabel = 'V';
            break;

        case 'U-dari-CV':
            inputs = { C: 'Kapasitansi (C, F)', V: 'Tegangan (V, Volt)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiKapasitor(C, V, null, "U-dari-CV")';
            namaVariabel = 'U';
            break;
        case 'U-dari-Q':
            inputs = { Q: 'Muatan (Q, C)', C: 'Kapasitansi (C, F)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiKapasitor(Q, C, null, "U-dari-Q")';
            namaVariabel = 'U';
            break;
        case 'U-dari-QV':
            inputs = { Q: 'Muatan (Q, C)', V: 'Tegangan (V, Volt)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiKapasitor(Q, V, null, "U-dari-QV")';
            namaVariabel = 'U';
            break;

        case 'C-seri-2':
            inputs = { C1: 'Kapasitor 1 (C1, F)', C2: 'Kapasitor 2 (C2, F)' };
            satuanHasil = 'Farad (F)';
            fungsiHitung = 'hitungKapasitorSeri(C1, C2, null)';
            namaVariabel = 'C_total';
            break;
        case 'C-seri-3':
            inputs = { C1: 'Kapasitor 1 (C1, F)', C2: 'Kapasitor 2 (C2, F)', C3: 'Kapasitor 3 (C3, F)' };
            satuanHasil = 'Farad (F)';
            fungsiHitung = 'hitungKapasitorSeri(C1, C2, C3)';
            namaVariabel = 'C_total';
            break;

        case 'C-paralel-2':
            inputs = { C1: 'Kapasitor 1 (C1, F)', C2: 'Kapasitor 2 (C2, F)' };
            satuanHasil = 'Farad (F)';
            fungsiHitung = 'hitungKapasitorParalel(C1, C2, null)';
            namaVariabel = 'C_total';
            break;
        case 'C-paralel-3':
            inputs = { C1: 'Kapasitor 1 (C1, F)', C2: 'Kapasitor 2 (C2, F)', C3: 'Kapasitor 3 (C3, F)' };
            satuanHasil = 'Farad (F)';
            fungsiHitung = 'hitungKapasitorParalel(C1, C2, C3)';
            namaVariabel = 'C_total';
            break;

        case 'I-arus':
            inputs = { Q: 'Muatan (Q, C)', t: 'Waktu (t, s)' };
            satuanHasil = 'Ampere (A)';
            fungsiHitung = 'hitungArusListrik(Q, t, "I")';
            namaVariabel = 'I';
            break;
        case 'Q-arus':
            inputs = { I: 'Arus (I, A)', t: 'Waktu (t, s)' };
            satuanHasil = 'Coulomb (C)';
            fungsiHitung = 'hitungArusListrik(I, t, "Q")';
            namaVariabel = 'Q';
            break;
        case 't-arus':
            inputs = { Q: 'Muatan (Q, C)', I: 'Arus (I, A)' };
            satuanHasil = 'detik (s)';
            fungsiHitung = 'hitungArusListrik(Q, I, "t")';
            namaVariabel = 't';
            break;

        case 'R-hambatan':
            inputs = { rho: 'Resistivitas (ρ, Ωm)', L: 'Panjang (L, m)', A: 'Luas Penampang (A, m²)' };
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'hitungHambatan(rho, L, A, "R")';
            namaVariabel = 'R';
            break;
        case 'rho-hambatan':
            inputs = { R: 'Hambatan (R, Ω)', A: 'Luas Penampang (A, m²)', L: 'Panjang (L, m)' };
            satuanHasil = 'Ωm';
            fungsiHitung = 'hitungHambatan(R, A, L, "rho")';
            namaVariabel = 'ρ';
            break;
        case 'L-hambatan':
            inputs = { R: 'Hambatan (R, Ω)', A: 'Luas Penampang (A, m²)', rho: 'Resistivitas (ρ, Ωm)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungHambatan(R, A, rho, "L")';
            namaVariabel = 'L';
            break;

        case 'V-ohm':
            inputs = { I: 'Arus (I, A)', R: 'Hambatan (R, Ω)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungHukumOhm(I, R, "V")';
            namaVariabel = 'V';
            break;
        case 'I-ohm':
            inputs = { V: 'Tegangan (V, V)', R: 'Hambatan (R, Ω)' };
            satuanHasil = 'Ampere (A)';
            fungsiHitung = 'hitungHukumOhm(V, R, "I")';
            namaVariabel = 'I';
            break;
        case 'R-ohm':
            inputs = { V: 'Tegangan (V, V)', I: 'Arus (I, A)' };
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'hitungHukumOhm(V, I, "R")';
            namaVariabel = 'R';
            break;

        case 'P-dari-VI':
            inputs = { V: 'Tegangan (V, V)', I: 'Arus (I, A)' };
            satuanHasil = 'Watt (W)';
            fungsiHitung = 'hitungDayaListrik(V, I, null, "P-dari-VI")';
            namaVariabel = 'P';
            break;
        case 'P-dari-I2R':
            inputs = { I: 'Arus (I, A)', R: 'Hambatan (R, Ω)' };
            satuanHasil = 'Watt (W)';
            fungsiHitung = 'hitungDayaListrik(I, R, null, "P-dari-I2R")';
            namaVariabel = 'P';
            break;
        case 'P-dari-V2R':
            inputs = { V: 'Tegangan (V, V)', R: 'Hambatan (R, Ω)' };
            satuanHasil = 'Watt (W)';
            fungsiHitung = 'hitungDayaListrik(V, R, null, "P-dari-V2R")';
            namaVariabel = 'P';
            break;

        case 'E-listrik':
            inputs = { P: 'Daya (P, W)', t: 'Waktu (t, s)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiListrik(P, t)';
            namaVariabel = 'E';
            break;

        case 'R-seri-2':
            inputs = { R1: 'Hambatan 1 (R1, Ω)', R2: 'Hambatan 2 (R2, Ω)' };
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'hitungRangkaianSeri(R1, R2, null)';
            namaVariabel = 'R_total';
            break;
        case 'R-seri-3':
            inputs = { R1: 'Hambatan 1 (R1, Ω)', R2: 'Hambatan 2 (R2, Ω)', R3: 'Hambatan 3 (R3, Ω)' };
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'hitungRangkaianSeri(R1, R2, R3)';
            namaVariabel = 'R_total';
            break;

        case 'R-paralel-2':
            inputs = { R1: 'Hambatan 1 (R1, Ω)', R2: 'Hambatan 2 (R2, Ω)' };
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'hitungRangkaianParalel(R1, R2, null)';
            namaVariabel = 'R_total';
            break;
        case 'R-paralel-3':
            inputs = { R1: 'Hambatan 1 (R1, Ω)', R2: 'Hambatan 2 (R2, Ω)', R3: 'Hambatan 3 (R3, Ω)' };
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'hitungRangkaianParalel(R1, R2, R3)';
            namaVariabel = 'R_total';
            break;

        case 'R-campuran':
            inputs = { Rseri: 'Hambatan Seri (Rseri, Ω)', Rparalel: 'Hambatan Paralel (Rparalel, Ω)' };
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'hitungRangkaianCampuran(Rseri, Rparalel)';
            namaVariabel = 'R_total';
            break;

        case 'V-ggl':
            inputs = { E: 'GGL Elektromotor (E, V)', I: 'Arus (I, A)', r: 'Hambatan Dalam (r, Ω)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungTeganganGGL(E, I, r)';
            namaVariabel = 'V';
            break;

        case 'F-magnetik':
            inputs = { q: 'Muatan (q, C)', v: 'Kecepatan (v, m/s)', B: 'Medan Magnet (B, T)', theta: 'Sudut (θ)' };
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungGayaMagnetik(q, v, B, theta, "F")';
            namaVariabel = 'F';
            break;
        case 'B-magnetik':
            inputs = { F: 'Gaya (F, N)', q: 'Muatan (q, C)', v: 'Kecepatan (v, m/s)', theta: 'Sudut (θ)' };
            satuanHasil = 'Tesla (T)';
            fungsiHitung = 'hitungGayaMagnetik(F, q, v, theta, "B")';
            namaVariabel = 'B';
            break;
        case 'q-magnetik':
            inputs = { F: 'Gaya (F, N)', v: 'Kecepatan (v, m/s)', B: 'Medan Magnet (B, T)', theta: 'Sudut (θ)' };
            satuanHasil = 'Coulomb (C)';
            fungsiHitung = 'hitungGayaMagnetik(F, v, B, theta, "q")';
            namaVariabel = 'q';
            break;

        case 'B-kawat-lurus':
            inputs = { I: 'Arus (I, A)', r: 'Jarak (r, m)' };
            satuanHasil = 'Tesla (T)';
            fungsiHitung = 'hitungMedanMagnetikKawat(I, r)';
            namaVariabel = 'B';
            break;

        case 'B-biotsavart':
            inputs = { I: 'Arus (I, A)', dl: 'Elemen Panjang (dl, m)', r: 'Jarak (r, m)', theta: 'Sudut (θ)' };
            satuanHasil = 'Tesla (T)';
            fungsiHitung = 'hitungBiotSavart(I, dl, r, theta)';
            namaVariabel = 'B';
            break;

        case 'F-lorentz':
            inputs = { q: 'Muatan (q, C)', v: 'Kecepatan (v, m/s)', B: 'Medan Magnet (B, T)', theta: 'Sudut (θ)' };
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungGayaLorentz(q, v, B, theta)';
            namaVariabel = 'F';
            break;

        case 'F-kawat':
            inputs = { B: 'Medan Magnet (B, T)', I: 'Arus (I, A)', L: 'Panjang Kawat (L, m)', theta: 'Sudut (θ)' };
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungGayaKawat(B, I, L, theta)';
            namaVariabel = 'F';
            break;

        case 'B-ampere':
            inputs = { I: 'Arus Tertutup (I, A)', l: 'Panjang Lintasan (l, m)' };
            satuanHasil = 'Tesla (T)';
            fungsiHitung = 'hitungHukumAmpere(I, l)';
            namaVariabel = 'B';
            break;

        case 'ggl-faraday':
            inputs = { N: 'Jumlah Lilitan (N)', dPhi: 'Perubahan Fluks (ΔΦ, Wb)', dt: 'Perubahan Waktu (Δt, s)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungHukumFaraday(N, dPhi, dt)';
            namaVariabel = 'ε';
            break;

        case 'ggl-induksi':
            inputs = { dPhi: 'Perubahan Fluks (ΔΦ, Wb)', dt: 'Perubahan Waktu (Δt, s)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungGGLInduksi(dPhi, dt)';
            namaVariabel = 'ε';
            break;

        case 'ggl-lenz':
            inputs = { N: 'Jumlah Lilitan (N)', dPhi: 'Perubahan Fluks (ΔΦ, Wb)', dt: 'Perubahan Waktu (dt, s)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungHukumLenz(N, dPhi, dt)';
            namaVariabel = 'ε';
            break;

        case 'L-induktansi':
            inputs = { N: 'Jumlah Lilitan (N)', Phi: 'Fluks Magnet (Φ, Wb)', I: 'Arus (I, A)' };
            satuanHasil = 'Henry (H)';
            fungsiHitung = 'hitungInduktansi(N, Phi, I, "L")';
            namaVariabel = 'L';
            break;
        case 'fluks-induktansi':
            inputs = { L: 'Induktansi (L, H)', I: 'Arus (I, A)', N: 'Jumlah Lilitan (N)' };
            satuanHasil = 'Weber (Wb)';
            fungsiHitung = 'hitungInduktansi(L, I, N, "Phi")';
            namaVariabel = 'ΦB';
            break;

        case 'U-induktor':
            inputs = { L: 'Induktansi (L, H)', I: 'Arus (I, A)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiInduktor(L, I)';
            namaVariabel = 'U';
            break;

        case 'I-ac':
            inputs = { Im: 'Amplitudo Arus (Im, A)', omega: 'Frekuensi Sudut (ω, rad/s)', t: 'Waktu (t, s)' };
            satuanHasil = 'Ampere (A)';
            fungsiHitung = 'hitungArusAC(Im, omega, t, "I")';
            namaVariabel = 'I';
            break;
        case 'Irms-ac':
            inputs = { Im: 'Amplitudo Arus (Im, A)' };
            satuanHasil = 'Ampere (A)';
            fungsiHitung = 'hitungArusAC(Im, null, null, "Irms")';
            namaVariabel = 'Irms';
            break;

        case 'V-ac':
            inputs = { Vm: 'Amplitudo Tegangan (Vm, V)', omega: 'Frekuensi Sudut (ω, rad/s)', t: 'Waktu (t, s)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungTeganganAC(Vm, omega, t, "V")';
            namaVariabel = 'V';
            break;
        case 'Vrms-ac':
            inputs = { Vm: 'Amplitudo Tegangan (Vm, V)' };
            satuanHasil = 'Volt (V)';
            fungsiHitung = 'hitungTeganganAC(Vm, null, null, "Vrms")';
            namaVariabel = 'Vrms';
            break;

        case 'Z-impedansi':
            inputs = { R: 'Hambatan (R, Ω)', XL: 'Reaktansi Induktif (XL, Ω)', XC: 'Reaktansi Kapasitif (XC, Ω)' };
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'hitungImpedansi(R, XL, XC, "Z")';
            namaVariabel = 'Z';
            break;
        case 'XL-impedansi':
            inputs = { omega: 'Frekuensi Sudut (ω, rad/s)', L: 'Induktansi (L, H)' };
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'hitungImpedansi(omega, L, null, "XL")';
            namaVariabel = 'XL';
            break;
        case 'XC-impedansi':
            inputs = { omega: 'Frekuensi Sudut (ω, rad/s)', C: 'Kapasitansi (C, F)' };
            satuanHasil = 'Ohm (Ω)';
            fungsiHitung = 'hitungImpedansi(omega, C, null, "XC")';
            namaVariabel = 'XC';
            break;

        case 'f-resonansi':
            inputs = { L: 'Induktansi (L, H)', C: 'Kapasitansi (C, F)' };
            satuanHasil = 'Hertz (Hz)';
            fungsiHitung = 'hitungResonansi(L, C)';
            namaVariabel = 'f';
            break;

        case 'P-ac':
            inputs = { Vrms: 'Tegangan RMS (Vrms, V)', Irms: 'Arus RMS (Irms, A)', phi: 'Sudut Fase (φ)' };
            satuanHasil = 'Watt (W)';
            fungsiHitung = 'hitungDayaAC(Vrms, Irms, phi, "P")';
            namaVariabel = 'P';
            break;
        case 'cos-phi':
            inputs = { R: 'Hambatan (R, Ω)', Z: 'Impedansi (Z, Ω)' };
            satuanHasil = '';
            fungsiHitung = 'hitungDayaAC(R, Z, null, "cos-phi")';
            namaVariabel = 'cos φ';
            break;

        case 'E-gelombang':
            inputs = { E0: 'Amplitudo E (E0, V/m)', k: 'Bilangan Gelombang (k, 1/m)', x: 'Posisi (x, m)', omega: 'Frekuensi Sudut (ω, rad/s)', t: 'Waktu (t, s)' };
            satuanHasil = 'V/m';
            fungsiHitung = 'hitungPersamaanGelombang(E0, k, x, omega, t, "E")';
            namaVariabel = 'E';
            break;
        case 'B-gelombang':
            inputs = { B0: 'Amplitudo B (B0, T)', k: 'Bilangan Gelombang (k, 1/m)', x: 'Posisi (x, m)', omega: 'Frekuensi Sudut (ω, rad/s)', t: 'Waktu (t, s)' };
            satuanHasil = 'Tesla (T)';
            fungsiHitung = 'hitungPersamaanGelombang(B0, k, x, omega, t, "B")';
            namaVariabel = 'B';
            break;

        case 'v-dari-lambda-f':
            inputs = { lambda: 'Panjang Gelombang (λ, m)', f: 'Frekuensi (f, Hz)' };
            satuanHasil = 'm/s';
            fungsiHitung = 'hitungKecepatanGelombang(lambda, f, "v")';
            namaVariabel = 'v';
            break;
        case 'v-vakum':
            inputs = {};
            satuanHasil = 'm/s';
            fungsiHitung = 'hitungKecepatanGelombang(null, null, "c")';
            namaVariabel = 'c';
            break;

        case 'I-gelombang':
            inputs = { E0: 'Amplitudo Medan Listrik (E0, V/m)' };
            satuanHasil = 'W/m²';
            fungsiHitung = 'hitungIntensitasGelombang(E0)';
            namaVariabel = 'I';
            break;

        case 'lambda-gelombang':
            inputs = { v: 'Kecepatan (v, m/s)', f: 'Frekuensi (f, Hz)' };
            satuanHasil = 'meter (m)';
            fungsiHitung = 'hitungPanjangGelombang(v, f)';
            namaVariabel = 'λ';
            break;

        case 'f-gelombang':
            inputs = { T: 'Periode (T, s)' };
            satuanHasil = 'Hertz (Hz)';
            fungsiHitung = 'hitungFrekuensiGelombang(T)';
            namaVariabel = 'f';
            break;

        case 'U-magnetik-volume':
            inputs = { B: 'Medan Magnet (B, T)', V: 'Volume (V, m³)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiMagnetik(B, V, null, "U-volume")';
            namaVariabel = 'U';
            break;
        case 'U-magnetik-induktor':
            inputs = { L: 'Induktansi (L, H)', I: 'Arus (I, A)' };
            satuanHasil = 'Joule (J)';
            fungsiHitung = 'hitungEnergiMagnetik(L, I, null, "U-induktor")';
            namaVariabel = 'U';
            break;

        case 'mu-magnetik':
            inputs = { N: 'Jumlah Lilitan (N)', I: 'Arus (I, A)', A: 'Luas (A, m²)' };
            satuanHasil = 'Am²';
            fungsiHitung = 'hitungMomenMagnetik(N, I, A)';
            namaVariabel = 'μ';
            break;

        case 'F-partikel':
            inputs = { q: 'Muatan (q, C)', E: 'Medan Listrik (E, N/C)', v: 'Kecepatan (v, m/s)', B: 'Medan Magnet (B, T)' };
            satuanHasil = 'Newton (N)';
            fungsiHitung = 'hitungGayaPartikel(q, E, v, B)';
            namaVariabel = 'F';
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
        if (key === 'theta' || key === 'phi') {
            form.innerHTML += `
                <div class="input-group">
                    <label for="${key}">${label}:</label>
                    <input type="number" step="any" id="${key}" required style="width: 70%; display: inline-block;" oninput="bersihkanHasilSaatInputBaru()">
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
                    <input type="number" step="any" id="${key}" required oninput="bersihkanHasilSaatInputBaru()">
                </div>
            `;
        }
    }

    form.innerHTML += `<button type="submit" class="hitung-btn">Hitung</button>`;

    formDiv.appendChild(form);
}

function hitungDanTampilkan(parameter, inputs, satuanHasil, fungsiHitung, namaVariabel) {
    const nilaiInput = {};
    let allInputsValid = true;

    for (const key of Object.keys(inputs)) {
        const inputElement = document.getElementById(key);

        if (inputElement && inputElement.value !== '') {
            let value = parseFloat(inputElement.value);

            if (key === 'theta' || key === 'phi') {
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
            const argNames = argsMatch[1].split(',').map(arg => arg.trim()); 
            
            const argValues = argNames.map(name => {
                if (name.startsWith('"') && name.endsWith('"')) {
                    return name;
                }

                if (name === 'null') {
                    return 'null';
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

        for (const key of Object.keys(inputs)) {
            const inputElement = document.getElementById(key);
            if (inputElement) {
                inputElement.value = '';
            }
        }

    } catch (e) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `<h3>⚠️ Error Perhitungan!</h3><p>Terjadi kesalahan saat memproses data:</p>
            <p style="font-weight: bold;">${e.message}</p>
            <p>Pastikan semua variabel sudah terisi dengan angka yang valid dan sesuai dengan konteks rumus yang dipilih.</p>`;
    }
}

function bersihkanHasilSaatInputBaru() {
    const hasilDiv = document.getElementById('hasil-kalkulasi');
    hasilDiv.innerHTML = '';
    hasilDiv.classList.remove('error');
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        const form = document.getElementById('kalkulator-form');
        if (!form) return;

        event.preventDefault(); 

        const inputFields = Array.from(form.querySelectorAll('input[type="number"][required]'));
        const activeElement = document.activeElement;
        const currentIndex = inputFields.indexOf(activeElement);

        if (currentIndex > -1) {
            if (activeElement.value !== '') {
                const nextIndex = currentIndex + 1;

                if (nextIndex < inputFields.length) {
                    inputFields[nextIndex].focus();
                } else {
                    form.dispatchEvent(new Event('submit'));
                }
            } else {
                form.dispatchEvent(new Event('submit'));
            }
        } else if (activeElement.type === 'submit') {
             form.dispatchEvent(new Event('submit'));
        } else {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                 form.dispatchEvent(new Event('submit'));
            }
        }
    }
}

function hitungCoulomb(val1, val2, val3, target) {
    if (target === "F") {
        const q1 = val1, q2 = val2, r = val3;
        if (r === 0) throw new Error("Jarak (r) tidak boleh nol.");
        return k * Math.abs(q1 * q2) / Math.pow(r, 2);
    }
    if (target === "q1") {
        const F = val1, q2 = val2, r = val3;
        if (q2 === 0 || r === 0) throw new Error("Muatan q₂ dan jarak (r) tidak boleh nol.");
        return (F * Math.pow(r, 2)) / (k * Math.abs(q2));
    }
    if (target === "q2") {
        const F = val1, q1 = val2, r = val3;
        if (q1 === 0 || r === 0) throw new Error("Muatan q₁ dan jarak (r) tidak boleh nol.");
        return (F * Math.pow(r, 2)) / (k * Math.abs(q1));
    }
    if (target === "r") {
        const F = val1, q1 = val2, q2 = val3;
        if (F === 0) throw new Error("Gaya (F) tidak boleh nol.");
        return Math.sqrt((k * Math.abs(q1 * q2)) / F);
    }
    throw new Error('Target Hukum Coulomb tidak valid');
}

function hitungMedanListrik(val1, val2, val3, target) {
    if (target === "E-dari-F") {
        const F = val1, q = val2;
        if (q === 0) throw new Error("Muatan uji (q) tidak boleh nol.");
        return F / q;
    }
    if (target === "E-dari-Q") {
        const Q = val1, r = val2;
        if (r === 0) throw new Error("Jarak (r) tidak boleh nol.");
        return k * Q / Math.pow(r, 2);
    }
    if (target === "F") {
        const q = val1, E = val2;
        return q * E;
    }
    if (target === "Q") {
        const E = val1, r = val2;
        return E * Math.pow(r, 2) / k;
    }
    throw new Error('Target Medan Listrik tidak valid');
}

function hitungPotensialListrik(val1, val2, val3, target) {
    if (target === "V-dari-W") {
        const W = val1, q = val2;
        if (q === 0) throw new Error("Muatan (q) tidak boleh nol.");
        return W / q;
    }
    if (target === "V-dari-Q") {
        const Q = val1, r = val2;
        if (r === 0) throw new Error("Jarak (r) tidak boleh nol.");
        return k * Q / r;
    }
    if (target === "W") {
        const q = val1, V = val2;
        return q * V;
    }
    if (target === "Q") {
        const V = val1, r = val2;
        return V * r / k;
    }
    throw new Error('Target Potensial Listrik tidak valid');
}

function hitungEnergiPotensialListrik(q1, q2, r) {
    if (r === 0) throw new Error("Jarak (r) tidak boleh nol.");
    return k * q1 * q2 / r;
}

function hitungFluksListrik(E, A, theta) {
    return E * A * Math.cos(theta);
}

function hitungHukumGauss(val1, val2, val3, target) {
    if (target === "fluks") {
        const Q = val1;
        return Q / epsilon0;
    }
    if (target === "E") {
        const Q = val1, A = val2;
        if (A === 0) throw new Error("Luas permukaan (A) tidak boleh nol.");
        return Q / (epsilon0 * A);
    }
    throw new Error('Target Hukum Gauss tidak valid');
}

function hitungKapasitansi(val1, val2, val3, val4, val5, target) {
    if (target === "C-dari-QV") {
        const Q = val1, V = val2;
        if (V === 0) throw new Error("Tegangan (V) tidak boleh nol.");
        return Q / V;
    }
    if (target === "C-kepingan") {
        const A = val1, d = val2, er = val3 || 1;
        if (d === 0) throw new Error("Jarak kepingan (d) tidak boleh nol.");
        return epsilon0 * er * A / d;
    }
    if (target === "Q") {
        const C = val1, V = val2;
        return C * V;
    }
    if (target === "V") {
        const Q = val1, C = val2;
        if (C === 0) throw new Error("Kapasitansi (C) tidak boleh nol.");
        return Q / C;
    }
    throw new Error('Target Kapasitansi tidak valid');
}

function hitungEnergiKapasitor(val1, val2, val3, target) {
    if (target === "U-dari-CV") {
        const C = val1, V = val2;
        return 0.5 * C * Math.pow(V, 2);
    }
    if (target === "U-dari-Q") {
        const Q = val1, C = val2;
        if (C === 0) throw new Error("Kapasitansi (C) tidak boleh nol.");
        return Math.pow(Q, 2) / (2 * C);
    }
    if (target === "U-dari-QV") {
        const Q = val1, V = val2;
        return 0.5 * Q * V;
    }
    throw new Error('Target Energi Kapasitor tidak valid');
}

function hitungKapasitorSeri(C1, C2, C3) {
    if (C1 === 0 || C2 === 0) throw new Error("Kapasitor tidak boleh nol.");
    if (C3 === null) {
        return 1 / (1/C1 + 1/C2);
    } else {
        if (C3 === 0) throw new Error("Kapasitor tidak boleh nol.");
        return 1 / (1/C1 + 1/C2 + 1/C3);
    }
}

function hitungKapasitorParalel(C1, C2, C3) {
    if (C3 === null) {
        return C1 + C2;
    } else {
        return C1 + C2 + C3;
    }
}

function hitungArusListrik(val1, val2, target) {
    if (target === "I") {
        const Q = val1, t = val2;
        if (t === 0) throw new Error("Waktu (t) tidak boleh nol.");
        return Q / t;
    }
    if (target === "Q") {
        const I = val1, t = val2;
        return I * t;
    }
    if (target === "t") {
        const Q = val1, I = val2;
        if (I === 0) throw new Error("Arus (I) tidak boleh nol.");
        return Q / I;
    }
    throw new Error('Target Arus Listrik tidak valid');
}

function hitungHambatan(val1, val2, val3, target) {
    if (target === "R") {
        const rho = val1, L = val2, A = val3;
        if (A === 0) throw new Error("Luas penampang (A) tidak boleh nol.");
        return rho * L / A;
    }
    if (target === "rho") {
        const R = val1, A = val2, L = val3;
        if (L === 0) throw new Error("Panjang kawat (L) tidak boleh nol.");
        return R * A / L;
    }
    if (target === "L") {
        const R = val1, A = val2, rho = val3;
        if (rho === 0) throw new Error("Resistivitas (ρ) tidak boleh nol.");
        return R * A / rho;
    }
    throw new Error('Target Hambatan tidak valid');
}

function hitungHukumOhm(val1, val2, target) {
    if (target === "V") {
        const I = val1, R = val2;
        return I * R;
    }
    if (target === "I") {
        const V = val1, R = val2;
        if (R === 0) throw new Error("Hambatan (R) tidak boleh nol.");
        return V / R;
    }
    if (target === "R") {
        const V = val1, I = val2;
        if (I === 0) throw new Error("Arus (I) tidak boleh nol.");
        return V / I;
    }
    throw new Error('Target Hukum Ohm tidak valid');
}

function hitungDayaListrik(val1, val2, val3, target) {
    if (target === "P-dari-VI") {
        const V = val1, I = val2;
        return V * I;
    }
    if (target === "P-dari-I2R") {
        const I = val1, R = val2;
        return Math.pow(I, 2) * R;
    }
    if (target === "P-dari-V2R") {
        const V = val1, R = val2;
        if (R === 0) throw new Error("Hambatan (R) tidak boleh nol.");
        return Math.pow(V, 2) / R;
    }
    throw new Error('Target Daya Listrik tidak valid');
}

function hitungEnergiListrik(P, t) {
    return P * t;
}

function hitungRangkaianSeri(R1, R2, R3) {
    if (R3 === null) {
        return R1 + R2;
    } else {
        return R1 + R2 + R3;
    }
}

function hitungRangkaianParalel(R1, R2, R3) {
    if (R1 === 0 || R2 === 0) throw new Error("Hambatan tidak boleh nol.");
    if (R3 === null) {
        return 1 / (1/R1 + 1/R2);
    } else {
        if (R3 === 0) throw new Error("Hambatan tidak boleh nol.");
        return 1 / (1/R1 + 1/R2 + 1/R3);
    }
}

function hitungRangkaianCampuran(Rseri, Rparalel) {
    return Rseri + Rparalel;
}

function hitungTeganganGGL(E, I, r) {
    return E - I * r;
}

function hitungGayaMagnetik(val1, val2, val3, val4, target) {
    if (target === "F") {
        const q = val1, v = val2, B = val3, theta = val4;
        return q * v * B * Math.sin(theta);
    }
    if (target === "B") {
        const F = val1, q = val2, v = val3, theta = val4;
        const sinTheta = Math.sin(theta);
        if (q === 0 || v === 0 || sinTheta === 0) throw new Error("q, v, dan sin(θ) tidak boleh nol.");
        return F / (q * v * sinTheta);
    }
    if (target === "q") {
        const F = val1, v = val2, B = val3, theta = val4;
        const sinTheta = Math.sin(theta);
        if (v === 0 || B === 0 || sinTheta === 0) throw new Error("v, B, dan sin(θ) tidak boleh nol.");
        return F / (v * B * sinTheta);
    }
    throw new Error('Target Gaya Magnetik tidak valid');
}

function hitungMedanMagnetikKawat(I, r) {
    if (r === 0) throw new Error("Jarak (r) tidak boleh nol.");
    return (mu0 * I) / (2 * Math.PI * r);
}

function hitungBiotSavart(I, dl, r, theta) {
    if (r === 0) throw new Error("Jarak (r) tidak boleh nol.");
    return (mu0 / (4 * Math.PI)) * (I * dl * Math.sin(theta)) / Math.pow(r, 2);
}

function hitungGayaLorentz(q, v, B, theta) {
    return q * v * B * Math.sin(theta);
}

function hitungGayaKawat(B, I, L, theta) {
    return B * I * L * Math.sin(theta);
}

function hitungHukumAmpere(I, l) {
    if (l === 0) throw new Error("Panjang lintasan (l) tidak boleh nol.");
    return (mu0 * I) / l;
}

function hitungHukumFaraday(N, dPhi, dt) {
    if (dt === 0) throw new Error("Perubahan waktu (Δt) tidak boleh nol.");
    return Math.abs(N * dPhi / dt);
}

function hitungGGLInduksi(dPhi, dt) {
    if (dt === 0) throw new Error("Perubahan waktu (Δt) tidak boleh nol.");
    return Math.abs(dPhi / dt);
}

function hitungHukumLenz(N, dPhi, dt) {
    if (dt === 0) throw new Error("Perubahan waktu (dt) tidak boleh nol.");
    return Math.abs(N * dPhi / dt);
}

function hitungInduktansi(val1, val2, val3, target) {
    if (target === "L") {
        const N = val1, Phi = val2, I = val3;
        if (I === 0) throw new Error("Arus (I) tidak boleh nol.");
        return N * Phi / I;
    }
    if (target === "Phi") {
        const L = val1, I = val2, N = val3;
        if (N === 0) throw new Error("Jumlah lilitan (N) tidak boleh nol.");
        return L * I / N;
    }
    throw new Error('Target Induktansi tidak valid');
}

function hitungEnergiInduktor(L, I) {
    return 0.5 * L * Math.pow(I, 2);
}

function hitungArusAC(val1, val2, val3, target) {
    if (target === "I") {
        const Im = val1, omega = val2, t = val3;
        return Im * Math.sin(omega * t);
    }
    if (target === "Irms") {
        const Im = val1;
        return Im / Math.sqrt(2);
    }
    throw new Error('Target Arus AC tidak valid');
}

function hitungTeganganAC(val1, val2, val3, target) {
    if (target === "V") {
        const Vm = val1, omega = val2, t = val3;
        return Vm * Math.sin(omega * t);
    }
    if (target === "Vrms") {
        const Vm = val1;
        return Vm / Math.sqrt(2);
    }
    throw new Error('Target Tegangan AC tidak valid');
}

function hitungImpedansi(val1, val2, val3, target) {
    if (target === "Z") {
        const R = val1, XL = val2, XC = val3;
        return Math.sqrt(Math.pow(R, 2) + Math.pow(XL - XC, 2));
    }
    if (target === "XL") {
        const omega = val1, L = val2;
        return omega * L;
    }
    if (target === "XC") {
        const omega = val1, C = val2;
        if (omega === 0 || C === 0) throw new Error("ω dan C tidak boleh nol.");
        return 1 / (omega * C);
    }
    throw new Error('Target Impedansi tidak valid');
}

function hitungResonansi(L, C) {
    if (L === 0 || C === 0) throw new Error("L dan C tidak boleh nol.");
    return 1 / (2 * Math.PI * Math.sqrt(L * C));
}

function hitungDayaAC(val1, val2, val3, target) {
    if (target === "P") {
        const Vrms = val1, Irms = val2, phi = val3;
        return Vrms * Irms * Math.cos(phi);
    }
    if (target === "cos-phi") {
        const R = val1, Z = val2;
        if (Z === 0) throw new Error("Impedansi (Z) tidak boleh nol.");
        return R / Z;
    }
    throw new Error('Target Daya AC tidak valid');
}

function hitungPersamaanGelombang(val1, val2, val3, val4, val5, target) {
    if (target === "E") {
        const E0 = val1, k = val2, x = val3, omega = val4, t = val5;
        return E0 * Math.sin(k * x - omega * t);
    }
    if (target === "B") {
        const B0 = val1, k = val2, x = val3, omega = val4, t = val5;
        return B0 * Math.sin(k * x - omega * t);
    }
    throw new Error('Target Persamaan Gelombang tidak valid');
}

function hitungKecepatanGelombang(val1, val2, target) {
    if (target === "v") {
        const lambda = val1, f = val2;
        return lambda * f;
    }
    if (target === "c") {
        return c;
    }
    throw new Error('Target Kecepatan Gelombang tidak valid');
}

function hitungIntensitasGelombang(E0) {
    return 0.5 * epsilon0 * c * Math.pow(E0, 2);
}

function hitungPanjangGelombang(v, f) {
    if (f === 0) throw new Error("Frekuensi (f) tidak boleh nol.");
    return v / f;
}

function hitungFrekuensiGelombang(T) {
    if (T === 0) throw new Error("Periode (T) tidak boleh nol.");
    return 1 / T;
}

function hitungEnergiMagnetik(val1, val2, val3, target) {
    if (target === "U-volume") {
        const B = val1, V = val2;
        return (Math.pow(B, 2) / (2 * mu0)) * V;
    }
    if (target === "U-induktor") {
        const L = val1, I = val2;
        return 0.5 * L * Math.pow(I, 2);
    }
    throw new Error('Target Energi Magnetik tidak valid');
}

function hitungMomenMagnetik(N, I, A) {
    return N * I * A;
}

function hitungGayaPartikel(q, E, v, B) {
    return q * Math.sqrt(Math.pow(E, 2) + Math.pow(v * B, 2));
}