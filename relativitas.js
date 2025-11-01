const c = 299792458; 

const G = 6.67430e-11; 

const KALKULATOR_CONFIG = {
    'x-prime': {
        kategori: 'Transformasi Lorentz',
        inputs: { x: 'Koordinat x (m)', v: 'Kecepatan', t: 'Waktu (s)' }, 
        satuanHasil: 'meter (m)',
        namaVariabel: "x'",
        fungsiHitung: hitungTransformasiLorentz,
        argKeys: ['x', 'v', 't'],
        target: 'x-prime'
    },
    't-prime': {
        kategori: 'Transformasi Lorentz',
        inputs: { x: 'Koordinat x (m)', v: 'Kecepatan', t: 'Waktu (s)' }, 
        satuanHasil: 'detik (s)',
        namaVariabel: "t'",
        fungsiHitung: hitungTransformasiLorentz,
        argKeys: ['x', 'v', 't'],
        target: 't-prime'
    },
    'gamma': {
        kategori: 'Transformasi Lorentz',
        inputs: { v: 'Kecepatan' }, 
        satuanHasil: 'unitless',
        namaVariabel: 'γ',
        fungsiHitung: hitungTransformasiLorentz,
        argKeys: ['v', null, null], 
        target: 'gamma'
    },
    
    't-dilatasi': {
        kategori: 'Dilatasi Waktu',
        inputs: { t0: 'Waktu Proper (s)', v: 'Kecepatan' }, 
        satuanHasil: 'detik (s)',
        namaVariabel: 't',
        fungsiHitung: hitungDilatasiWaktu,
        argKeys: ['t0', 'v'],
        target: 't'
    },
    't0-dilatasi': {
        kategori: 'Dilatasi Waktu',
        inputs: { t: 'Waktu Dilatasi (s)', v: 'Kecepatan' }, 
        satuanHasil: 'detik (s)',
        namaVariabel: 't₀',
        fungsiHitung: hitungDilatasiWaktu,
        argKeys: ['t', 'v'],
        target: 't0'
    },
    'v-dilatasi': {
        kategori: 'Dilatasi Waktu',
        inputs: { t: 'Waktu Dilatasi (s)', t0: 'Waktu Proper (s)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungDilatasiWaktu,
        argKeys: ['t', 't0'],
        target: 'v'
    },
    
    'L-kontraksi': {
        kategori: 'Kontraksi Panjang',
        inputs: { L0: 'Panjang Proper (m)', v: 'Kecepatan' }, 
        satuanHasil: 'meter (m)',
        namaVariabel: 'L',
        fungsiHitung: hitungKontraksiPanjang,
        argKeys: ['L0', 'v'],
        target: 'L'
    },
    'L0-kontraksi': {
        kategori: 'Kontraksi Panjang',
        inputs: { L: 'Panjang Kontraksi (m)', v: 'Kecepatan' }, 
        satuanHasil: 'meter (m)',
        namaVariabel: 'L₀',
        fungsiHitung: hitungKontraksiPanjang,
        argKeys: ['L', 'v'],
        target: 'L0'
    },
    'v-kontraksi': {
        kategori: 'Kontraksi Panjang',
        inputs: { L: 'Panjang Kontraksi (m)', L0: 'Panjang Proper (m)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungKontraksiPanjang,
        argKeys: ['L', 'L0'],
        target: 'v'
    },
    
    'u-prime': {
        kategori: 'Relativitas Kecepatan',
        inputs: { u: 'Kecepatan u', v: 'Kecepatan v' }, 
        satuanHasil: 'm/s',
        namaVariabel: "u'",
        fungsiHitung: hitungRelativitasKecepatan,
        argKeys: ['u', 'v'],
        target: 'u-prime'
    },
    'u-kecepatan': {
        kategori: 'Relativitas Kecepatan',
        inputs: { u_prime: "Kecepatan u'", v: 'Kecepatan v' }, 
        satuanHasil: 'm/s',
        namaVariabel: 'u',
        fungsiHitung: hitungRelativitasKecepatan,
        argKeys: ['u_prime', 'v'],
        target: 'u'
    },
    'v-kecepatan': {
        kategori: 'Relativitas Kecepatan',
        inputs: { u: 'Kecepatan u', u_prime: "Kecepatan u'" }, 
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungRelativitasKecepatan,
        argKeys: ['u', 'u_prime'],
        target: 'v'
    },
    
    'E-relativistik': {
        kategori: 'Energi Relativistik',
        inputs: { m0: 'Massa Diam (kg)', v: 'Kecepatan' }, 
        satuanHasil: 'Joule (J)',
        namaVariabel: 'E',
        fungsiHitung: hitungEnergiRelativistik,
        argKeys: ['m0', 'v'],
        target: 'E'
    },
    'm0-relativistik': {
        kategori: 'Energi Relativistik',
        inputs: { E: 'Energi Relativistik (J)', v: 'Kecepatan' }, 
        satuanHasil: 'kg',
        namaVariabel: 'm₀',
        fungsiHitung: hitungEnergiRelativistik,
        argKeys: ['E', 'v'],
        target: 'm0'
    },
    'v-relativistik': {
        kategori: 'Energi Relativistik',
        inputs: { E: 'Energi Relativistik (J)', m0: 'Massa Diam (kg)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungEnergiRelativistik,
        argKeys: ['E', 'm0'],
        target: 'v'
    },
    
    'p-relativistik': {
        kategori: 'Momentum Relativistik',
        inputs: { m: 'Massa (kg)', v: 'Kecepatan' }, 
        satuanHasil: 'kg m/s',
        namaVariabel: 'p',
        fungsiHitung: hitungMomentumRelativistik,
        argKeys: ['m', 'v'],
        target: 'p'
    },
    'm-relativistik': {
        kategori: 'Momentum Relativistik',
        inputs: { p: 'Momentum (kg m/s)', v: 'Kecepatan' }, 
        satuanHasil: 'kg',
        namaVariabel: 'm',
        fungsiHitung: hitungMomentumRelativistik,
        argKeys: ['p', 'v'],
        target: 'm'
    },
    'v-momentum': {
        kategori: 'Momentum Relativistik',
        inputs: { p: 'Momentum (kg m/s)', m: 'Massa (kg)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungMomentumRelativistik,
        argKeys: ['p', 'm'],
        target: 'v'
    },
    
    'E-total': {
        kategori: 'Energi Total',
        inputs: { p: 'Momentum (kg m/s)', m0: 'Massa Diam (kg)' },
        satuanHasil: 'Joule (J)',
        namaVariabel: 'E',
        fungsiHitung: hitungEnergiTotal,
        argKeys: ['p', 'm0'],
        target: 'E'
    },
    'p-total': {
        kategori: 'Energi Total',
        inputs: { E: 'Energi (J)', m0: 'Massa Diam (kg)' },
        satuanHasil: 'kg m/s',
        namaVariabel: 'p',
        fungsiHitung: hitungEnergiTotal,
        argKeys: ['E', 'm0'],
        target: 'p'
    },
    'm0-total': {
        kategori: 'Energi Total',
        inputs: { E: 'Energi (J)', p: 'Momentum (kg m/s)' },
        satuanHasil: 'kg',
        namaVariabel: 'm₀',
        fungsiHitung: hitungEnergiTotal,
        argKeys: ['E', 'p'],
        target: 'm0'
    },
    
    'E0-diam': {
        kategori: 'Energi Diam',
        inputs: { m0: 'Massa Diam (kg)' },
        satuanHasil: 'Joule (J)',
        namaVariabel: 'E₀',
        fungsiHitung: hitungEnergiDiam,
        argKeys: ['m0'],
        target: 'E0'
    },
    'm0-diam': {
        kategori: 'Energi Diam',
        inputs: { E0: 'Energi Diam (J)' },
        satuanHasil: 'kg',
        namaVariabel: 'm₀',
        fungsiHitung: hitungEnergiDiam,
        argKeys: ['E0'],
        target: 'm0'
    },
    
    'm-massa': {
        kategori: 'Hubungan Massa-Energi',
        inputs: { m0: 'Massa Diam (kg)', v: 'Kecepatan' }, 
        satuanHasil: 'kg',
        namaVariabel: 'm',
        fungsiHitung: hitungHubunganMassaEnergi,
        argKeys: ['m0', 'v'],
        target: 'm'
    },
    'm0-massa': {
        kategori: 'Hubungan Massa-Energi',
        inputs: { m: 'Massa Relativistik (kg)', v: 'Kecepatan' }, 
        satuanHasil: 'kg',
        namaVariabel: 'm₀',
        fungsiHitung: hitungHubunganMassaEnergi,
        argKeys: ['m', 'v'],
        target: 'm0'
    },
    'v-massa': {
        kategori: 'Hubungan Massa-Energi',
        inputs: { m: 'Massa Relativistik (kg)', m0: 'Massa Diam (kg)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungHubunganMassaEnergi,
        argKeys: ['m', 'm0'],
        target: 'v'
    },
    
    'delta-t-paradoks': {
        kategori: 'Paradoks Kembar',
        inputs: { t0: 'Waktu Proper (s)', v: 'Kecepatan' }, 
        satuanHasil: 'detik (s)',
        namaVariabel: 'Δt',
        fungsiHitung: hitungParadoksKembar,
        argKeys: ['t0', 'v'],
        target: 'delta-t'
    },
    't0-paradoks': {
        kategori: 'Paradoks Kembar',
        inputs: { delta_t: 'Selisih Waktu (s)', v: 'Kecepatan' }, 
        satuanHasil: 'detik (s)',
        namaVariabel: 't₀',
        fungsiHitung: hitungParadoksKembar,
        argKeys: ['delta_t', 'v'],
        target: 't0'
    },
    'v-paradoks': {
        kategori: 'Paradoks Kembar',
        inputs: { t0: 'Waktu Proper (s)', delta_t: 'Selisih Waktu (s)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungParadoksKembar,
        argKeys: ['t0', 'delta_t'],
        target: 'v'
    },
    
    'p-mu': {
        kategori: 'Momentum Empat',
        inputs: { E: 'Energi (J)', p_vektor: 'Vektor Momentum (kg m/s)' },
        satuanHasil: 'unitless (invariant)',
        namaVariabel: 'p^μ p_μ',
        fungsiHitung: hitungMomentumEmpat,
        argKeys: ['E', 'p_vektor', null], 
        target: 'p-mu'
    },
    'E-empat': {
        kategori: 'Momentum Empat',
        inputs: { p_mu: 'Invariant Momentum (unitless)', p_vektor: 'Vektor Momentum (kg m/s)', m0: 'Massa Diam (kg)' },
        satuanHasil: 'Joule (J)',
        namaVariabel: 'E',
        fungsiHitung: hitungMomentumEmpat,
        argKeys: ['p_mu', 'p_vektor', 'm0'],
        target: 'E'
    },
    'p-vektor': {
        kategori: 'Momentum Empat',
        inputs: { E: 'Energi (J)', p_mu: 'Invariant Momentum (unitless)', m0: 'Massa Diam (kg)' },
        satuanHasil: 'kg m/s',
        namaVariabel: '|p|',
        fungsiHitung: hitungMomentumEmpat,
        argKeys: ['E', 'p_mu', 'm0'],
        target: 'p'
    },
    'm0-empat': {
        kategori: 'Momentum Empat',
        inputs: { E: 'Energi (J)', p_vektor: 'Vektor Momentum (kg m/s)' },
        satuanHasil: 'kg',
        namaVariabel: 'm₀',
        fungsiHitung: hitungMomentumEmpat,
        argKeys: ['E', 'p_vektor', null], 
        target: 'm0'
    },

    
    'G-mu-nu': {
        kategori: 'Persamaan Medan Einstein',
        inputs: { T_mu_nu: 'Tensor Energi-Momentum (kg/m s²)' },
        satuanHasil: '1/m²',
        namaVariabel: 'G',
        fungsiHitung: hitungPersamaanMedanEinstein,
        argKeys: ['T_mu_nu'],
        target: 'G-mu-nu'
    },
    'T-mu-nu': {
        kategori: 'Persamaan Medan Einstein',
        inputs: { G_mu_nu: 'Tensor Einstein (1/m²)' },
        satuanHasil: 'kg/m s²',
        namaVariabel: 'T',
        fungsiHitung: hitungPersamaanMedanEinstein,
        argKeys: ['G_mu_nu'],
        target: 'T-mu-nu'
    },
    
    't-gravitasi': {
        kategori: 'Dilatasi Waktu Gravitasi',
        inputs: { t0: 'Waktu Proper (s)', M: 'Massa (kg)', r: 'Jarak (m)' },
        satuanHasil: 'detik (s)',
        namaVariabel: 't',
        fungsiHitung: hitungDilatasiWaktuGravitasi,
        argKeys: ['t0', 'M', 'r'],
        target: 't'
    },
    't0-gravitasi': {
        kategori: 'Dilatasi Waktu Gravitasi',
        inputs: { t: 'Waktu Dilatasi (s)', M: 'Massa (kg)', r: 'Jarak (m)' },
        satuanHasil: 'detik (s)',
        namaVariabel: 't₀',
        fungsiHitung: hitungDilatasiWaktuGravitasi,
        argKeys: ['t', 'M', 'r'],
        target: 't0'
    },
    'M-gravitasi': {
        kategori: 'Dilatasi Waktu Gravitasi',
        inputs: { t: 'Waktu Dilatasi (s)', t0: 'Waktu Proper (s)', r: 'Jarak (m)' },
        satuanHasil: 'kg',
        namaVariabel: 'M',
        fungsiHitung: hitungDilatasiWaktuGravitasi,
        argKeys: ['t', 't0', 'r'],
        target: 'M'
    },
    'r-gravitasi': {
        kategori: 'Dilatasi Waktu Gravitasi',
        inputs: { t: 'Waktu Dilatasi (s)', t0: 'Waktu Proper (s)', M: 'Massa (kg)' },
        satuanHasil: 'meter (m)',
        namaVariabel: 'r',
        fungsiHitung: hitungDilatasiWaktuGravitasi,
        argKeys: ['t', 't0', 'M'],
        target: 'r'
    },
    
    'z-redshift': {
        kategori: 'Redshift Gravitasi',
        inputs: { M: 'Massa (kg)', r: 'Jarak (m)' },
        satuanHasil: 'unitless',
        namaVariabel: 'z',
        fungsiHitung: hitungRedshiftGravitasi,
        argKeys: ['M', 'r'],
        target: 'z'
    },
    'M-redshift': {
        kategori: 'Redshift Gravitasi',
        inputs: { z: 'Redshift (unitless)', r: 'Jarak (m)' },
        satuanHasil: 'kg',
        namaVariabel: 'M',
        fungsiHitung: hitungRedshiftGravitasi,
        argKeys: ['z', 'r'],
        target: 'M'
    },
    'r-redshift': {
        kategori: 'Redshift Gravitasi',
        inputs: { z: 'Redshift (unitless)', M: 'Massa (kg)' },
        satuanHasil: 'meter (m)',
        namaVariabel: 'r',
        fungsiHitung: hitungRedshiftGravitasi,
        argKeys: ['z', 'M'],
        target: 'r'
    },
    
    'delta-phi': {
        kategori: 'Orbit Relativistik',
        inputs: { M: 'Massa (kg)', a: 'Semi-Major Axis (m)', e: 'Eksentrisitas (unitless)' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'Δφ',
        fungsiHitung: hitungOrbitRelativistik,
        argKeys: ['M', 'a', 'e'],
        target: 'delta-phi'
    },
    'M-orbit': {
        kategori: 'Orbit Relativistik',
        inputs: { delta_phi: 'Precession Perihelion (rad)', a: 'Semi-Major Axis (m)', e: 'Eksentrisitas (unitless)' },
        satuanHasil: 'kg',
        namaVariabel: 'M',
        fungsiHitung: hitungOrbitRelativistik,
        argKeys: ['delta_phi', 'a', 'e'],
        target: 'M'
    },
    'a-orbit': {
        kategori: 'Orbit Relativistik',
        inputs: { delta_phi: 'Precession Perihelion (rad)', M: 'Massa (kg)', e: 'Eksentrisitas (unitless)' },
        satuanHasil: 'meter (m)',
        namaVariabel: 'a',
        fungsiHitung: hitungOrbitRelativistik,
        argKeys: ['delta_phi', 'M', 'e'],
        target: 'a'
    },
    'e-orbit': {
        kategori: 'Orbit Relativistik',
        inputs: { delta_phi: 'Precession Perihelion (rad)', M: 'Massa (kg)', a: 'Semi-Major Axis (m)' },
        satuanHasil: 'unitless',
        namaVariabel: 'e',
        fungsiHitung: hitungOrbitRelativistik,
        argKeys: ['delta_phi', 'M', 'a'],
        target: 'e'
    },
    
    'theta-lensing': {
        kategori: 'Pembengkokan Cahaya',
        inputs: { M: 'Massa (kg)', r: 'Jarak Terdekat (m)' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'θ',
        fungsiHitung: hitungPembengkokanCahaya,
        argKeys: ['M', 'r'],
        target: 'theta'
    },
    'M-lensing': {
        kategori: 'Pembengkokan Cahaya',
        inputs: { theta: 'Sudut (rad)', r: 'Jarak Terdekat (m)' },
        satuanHasil: 'kg',
        namaVariabel: 'M',
        fungsiHitung: hitungPembengkokanCahaya,
        argKeys: ['theta', 'r'],
        target: 'M'
    },
    'r-lensing': {
        kategori: 'Pembengkokan Cahaya',
        inputs: { theta: 'Sudut (rad)', M: 'Massa (kg)' },
        satuanHasil: 'meter (m)',
        namaVariabel: 'r',
        fungsiHitung: hitungPembengkokanCahaya,
        argKeys: ['theta', 'M'],
        target: 'r'
    },
    
    'U-potensial': {
        kategori: 'Energi Potensial Gravitasi Relativistik',
        inputs: { M: 'Massa 1 (kg)', m: 'Massa 2 (kg)', r: 'Jarak (m)' },
        satuanHasil: 'Joule (J)',
        namaVariabel: 'U',
        fungsiHitung: hitungEnergiPotensialGravitasiRelativistik,
        argKeys: ['M', 'm', 'r'],
        target: 'U'
    },
    'M-potensial': {
        kategori: 'Energi Potensial Gravitasi Relativistik',
        inputs: { U: 'Energi Potensial (J)', m: 'Massa 2 (kg)', r: 'Jarak (m)' },
        satuanHasil: 'kg',
        namaVariabel: 'M',
        fungsiHitung: hitungEnergiPotensialGravitasiRelativistik_Invers,
        argKeys: ['U', 'm', 'r'],
        target: 'M'
    },
    'm-potensial': {
        kategori: 'Energi Potensial Gravitasi Relativistik',
        inputs: { U: 'Energi Potensial (J)', M: 'Massa 1 (kg)', r: 'Jarak (m)' },
        satuanHasil: 'kg',
        namaVariabel: 'm',
        fungsiHitung: hitungEnergiPotensialGravitasiRelativistik_Invers,
        argKeys: ['U', 'M', 'r'],
        target: 'm'
    },
    'r-potensial': {
        kategori: 'Energi Potensial Gravitasi Relativistik',
        inputs: { U: 'Energi Potensial (J)', M: 'Massa 1 (kg)', m: 'Massa 2 (kg)' },
        satuanHasil: 'meter (m)',
        namaVariabel: 'r',
        fungsiHitung: hitungEnergiPotensialGravitasiRelativistik_Invers,
        argKeys: ['U', 'M', 'm'],
        target: 'r'
    }
};

function tampilkanKalkulator() {
    const topik = document.getElementById('pilih-topik').value;
    const kalkulatorArea = document.getElementById('kalkulator-area');
    kalkulatorArea.innerHTML = '';

    document.removeEventListener('keydown', handleEnterKey);

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
        hasilDiv.className = 'hasil-container'; 
        hasilDiv.style.marginTop = '20px';
        kalkulatorArea.appendChild(hasilDiv);

        document.addEventListener('keydown', handleEnterKey);
    }
}

function getOpsiParameter(topik) {
    switch (topik) {
        case 'transformasi-lorentz':
            return {
                'x-prime': 'Koordinat x\'',
                't-prime': 'Waktu t\'',
                'gamma': 'Faktor Gamma (γ)'
            };
        case 'dilatasi-waktu':
            return {
                't-dilatasi': 'Waktu Dilatasi (t)',
                't0-dilatasi': 'Waktu Proper (t₀)',
                'v-dilatasi': 'Kecepatan (v)'
            };
        case 'kontraksi-panjang':
            return {
                'L-kontraksi': 'Panjang Kontraksi (L)',
                'L0-kontraksi': 'Panjang Proper (L₀)',
                'v-kontraksi': 'Kecepatan (v)'
            };
        case 'relativitas-kecepatan':
            return {
                'u-prime': 'Kecepatan Relatif (u\' )',
                'u-kecepatan': 'Kecepatan u',
                'v-kecepatan': 'Kecepatan v'
            };
        case 'energi-relativistik':
            return {
                'E-relativistik': 'Energi Relativistik (E)',
                'm0-relativistik': 'Massa Diam (m₀)',
                'v-relativistik': 'Kecepatan (v)'
            };
        case 'momentum-relativistik':
            return {
                'p-relativistik': 'Momentum Relativistik (p)',
                'm-relativistik': 'Massa (m)',
                'v-momentum': 'Kecepatan (v)'
            };
        case 'energi-total':
            return {
                'E-total': 'Energi Total (E)',
                'p-total': 'Momentum (p)',
                'm0-total': 'Massa Diam (m₀)'
            };
        case 'energi-diam':
            return {
                'E0-diam': 'Energi Diam (E₀)',
                'm0-diam': 'Massa Diam (m₀)'
            };
        case 'hubungan-massa-energi':
            return {
                'm-massa': 'Massa Relativistik (m)',
                'm0-massa': 'Massa Diam (m₀)',
                'v-massa': 'Kecepatan (v)'
            };
        case 'paradoks-kembar':
            return {
                'delta-t-paradoks': 'Selisih Waktu (Δt)',
                't0-paradoks': 'Waktu Proper (t₀)',
                'v-paradoks': 'Kecepatan (v)'
            };
        case 'momentum-empat':
            return {
                'p-mu': 'Komponen Momentum Empat (p^μ)',
                'E-empat': 'Energi (E)',
                'p-vektor': 'Vektor Momentum (|p|)',
                'm0-empat': 'Massa Diam (m₀)'
            };
        case 'persamaan-medan-einstein':
            return {
                'G-mu-nu': 'Tensor Einstein (G)',
                'T-mu-nu': 'Tensor Energi-Momentum (T)'
            };
        case 'dilatasi-waktu-gravitasi':
            return {
                't-gravitasi': 'Waktu Dilatasi Gravitasi (t)',
                't0-gravitasi': 'Waktu Proper (t₀)',
                'M-gravitasi': 'Massa (M)',
                'r-gravitasi': 'Jarak (r)'
            };
        case 'redshift-gravitasi':
            return {
                'z-redshift': 'Redshift Gravitasi (z)',
                'M-redshift': 'Massa (M)',
                'r-redshift': 'Jarak (r)'
            };
        case 'orbit-relativistik':
            return {
                'delta-phi': 'Precession Perihelion (Δφ)',
                'M-orbit': 'Massa (M)',
                'a-orbit': 'Semi-Major Axis (a)',
                'e-orbit': 'Eksentrisitas (e)'
            };
        case 'pembengkokan-cahaya':
            return {
                'theta-lensing': 'Sudut Pembengkokan (θ)',
                'M-lensing': 'Massa (M)',
                'r-lensing': 'Jarak Terdekat (r)'
            };
        case 'energi-potensial-gravitasi-relativistik':
            return {
                'U-potensial': 'Energi Potensial Relativistik (U)',
                'M-potensial': 'Massa 1 (M)',
                'm-potensial': 'Massa 2 (m)',
                'r-potensial': 'Jarak (r)'
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

    const config = KALKULATOR_CONFIG[parameter];

    if (!config) {
        formDiv.innerHTML = '<p class="error">⚠️ Perhitungan untuk parameter ini belum diimplementasikan.</p>';
        return;
    }

    const inputs = config.inputs;
    const form = document.createElement('form');
    form.id = 'kalkulator-form';
    form.onsubmit = hitungKalkulasi;
    form.dataset.parameter = parameter;

    const inputKeys = Object.keys(inputs);
    let inputIndex = 0;

    for (const [key, label] of Object.entries(inputs)) {
        const labelEl = document.createElement('label');
        labelEl.setAttribute('for', key);
        labelEl.textContent = label + ': ';
        form.appendChild(labelEl);

        const isKecepatanField = label.toLowerCase().includes('kecepatan');

        if (key === 'theta') {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = key;
            input.name = key;
            input.required = true;
            input.step = 'any';
            input.style.width = '70%'; 
            input.style.display = 'inline-block';
            input.dataset.index = inputIndex; 
            inputIndex++;
            
            const select = document.createElement('select');
            select.id = `${key}-unit`;
            select.style.width = '25%';
            select.style.display = 'inline-block';
            
            const optDeg = document.createElement('option');
            optDeg.value = 'deg';
            optDeg.textContent = 'Derajat (°)';
            select.appendChild(optDeg);
            
            const optRad = document.createElement('option');
            optRad.value = 'rad';
            optRad.textContent = 'Radian (rad)';
            select.appendChild(optRad);
            
            form.appendChild(input);
            form.appendChild(select);

        } else if (isKecepatanField) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = key;
            input.name = key;
            input.required = true;
            input.step = 'any';
            input.style.width = '70%'; 
            input.style.display = 'inline-block';
            input.dataset.index = inputIndex; 
            inputIndex++;
            
            const select = document.createElement('select');
            select.id = `${key}-unit`;
            select.style.width = '25%';
            select.style.display = 'inline-block';
            
            const optMs = document.createElement('option');
            optMs.value = 'm/s';
            optMs.textContent = 'm/s';
            select.appendChild(optMs);
            
            const optC = document.createElement('option');
            optC.value = 'c';
            optC.textContent = 'c';
            select.appendChild(optC);
            
            form.appendChild(input);
            form.appendChild(select);

        } else {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = key;
            input.name = key;
            input.required = true;
            input.step = 'any';
            input.dataset.index = inputIndex; 
            inputIndex++;
            form.appendChild(input);
        }
        form.appendChild(document.createElement('br'));
    }

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Hitung';
    form.appendChild(submitBtn);

    formDiv.appendChild(form);

    if (inputKeys.length > 0) {
        const firstInput = document.getElementById(inputKeys[0]);
        if (firstInput) firstInput.focus();
    }
}

function hitungKalkulasi(event) {
    event.preventDefault();

    const form = event.target;
    const parameter = form.dataset.parameter;
    const hasilDiv = document.getElementById('hasil-kalkulasi');
    hasilDiv.innerHTML = '';
    hasilDiv.classList.remove('error');

    const config = KALKULATOR_CONFIG[parameter];
    if (!config) {
        hasilDiv.innerHTML = '<p class="error">⚠️ Konfigurasi kalkulasi tidak ditemukan.</p>';
        return;
    }

    const nilaiInput = {};
    let allInputsValid = true;

    for (const key of Object.keys(config.inputs)) {
        const inputElement = document.getElementById(key); 

        if (inputElement && inputElement.value.trim() !== '') {
            let parsedValue = parseFloat(inputElement.value);
            if (isNaN(parsedValue)) {
                allInputsValid = false;
                break;
            }

            if (key === 'theta') {
                const unitSelect = document.getElementById(`${key}-unit`);
                if (unitSelect) {
                    const unit = unitSelect.value;
                    if (unit === 'deg') {
                        nilaiInput[key] = parsedValue * (Math.PI / 180); 
                    } else {
                        nilaiInput[key] = parsedValue; 
                    }
                } else {
                    nilaiInput[key] = parsedValue;
                }
            } else {
                const unitSelect = document.getElementById(`${key}-unit`);
                if (unitSelect) {
                    const unit = unitSelect.value;
                    if (unit === 'c') {
                        if (parsedValue < 0 || parsedValue > 1) {
                            allInputsValid = false;
                            break; 
                        }
                        nilaiInput[key] = parsedValue * c; 
                    } else {
                        nilaiInput[key] = parsedValue; 
                    }
                } else {
                    nilaiInput[key] = parsedValue;
                }
            }
        } else {
            allInputsValid = false;
            break;
        }
    }

    if (!allInputsValid) {
        hasilDiv.innerHTML = '<p class="error">⚠️ Mohon isi semua kolom input dengan angka yang valid! Untuk kecepatan dalam \'c\', gunakan nilai antara 0-1.</p>';
        return;
    }

    try {
        const args = config.argKeys.map(key => {
            return key === null ? null : nilaiInput[key];
        });

        if (config.target !== null && config.target !== undefined) {
            args.push(config.target);
        }

        const hasilNumerik = config.fungsiHitung.apply(null, args);

        if (typeof hasilNumerik === 'string' && hasilNumerik.startsWith('Error:')) {
            throw new Error(hasilNumerik.replace('Error: ', ''));
        }

        if (!isFinite(hasilNumerik)) {
            throw new Error('Hasil perhitungan tidak valid (NaN atau Infinity). Periksa kembali input Anda dan pastikan tidak ada pembagian dengan nol.');
        }

        let formatted_fx;
        if (Math.abs(hasilNumerik) > 1e6 || (Math.abs(hasilNumerik) !== 0 && Math.abs(hasilNumerik) < 1e-6)) {
            formatted_fx = hasilNumerik.toPrecision(10);
        } else {
            if (hasilNumerik === 0) {
                 formatted_fx = "0";
            } else {
                formatted_fx = hasilNumerik.toFixed(3);
                formatted_fx = formatted_fx.replace(/\.?0+$/, '');
                if (formatted_fx === "" || formatted_fx === ".") formatted_fx = "0";
            }
        }

        hasilDiv.innerHTML = `
            <h2>Hasil Perhitungan</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr style="background-color: #0b2c66; color: white;">
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parameter</th>
                    <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Nilai Hasil (Satuan SI)</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 10px;">${config.namaVariabel}</td>
                    <td style="border: 1px solid #ccc; padding: 10px;">${formatted_fx} ${config.satuanHasil}</td>
                </tr>
            </table>
        `;

        const inputFields = form.querySelectorAll('input[type="number"]');
        inputFields.forEach(input => {
            input.value = '';
        });
        
        const unitSelects = form.querySelectorAll('select');
        unitSelects.forEach(select => {
            select.selectedIndex = 0; 
        });
        
        const firstInput = inputFields[0];
        if (firstInput) {
            setTimeout(() => {
                firstInput.focus();
            }, 100);
        }

    } catch (e) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `<h3>⚠️ Error Perhitungan!</h3><p>Terjadi kesalahan saat memproses data:</p>
            <p style="font-weight: bold;">${e.message}</p>
            <p>Pastikan semua variabel sudah terisi dengan angka yang valid dan sesuai dengan konteks rumus yang dipilih.</p>`;
    }
}

function handleEnterKey(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT' && event.target.type === 'number') {
        const currentInput = event.target;
        const form = document.getElementById('kalkulator-form');
        
        if (!form) return;

        const inputKeys = Array.from(form.querySelectorAll('input[type="number"]')).map(input => input.id);
        const currentKey = currentInput.id;
        const currentPos = inputKeys.indexOf(currentKey);

        const value = currentInput.value.trim();
        if (!value || isNaN(parseFloat(value))) {
            currentInput.style.borderColor = 'red';
            setTimeout(() => { currentInput.style.borderColor = ''; }, 500);
            return; 
        }

        if (currentPos === inputKeys.length - 1) {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
            return;
        }

        event.preventDefault();
        const nextInput = document.getElementById(inputKeys[currentPos + 1]);
        if (nextInput) {
            nextInput.focus();
            nextInput.select(); 
        }
    } else if (event.key === 'Enter') {
        const form = document.getElementById('kalkulator-form');
        if (form) {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    }
}

function hitungTransformasiLorentz(val1, val2, val3, target) {
    const v = (target === "gamma") ? val1 : val2;
    if (v === null) throw new Error('Input kecepatan (v) tidak ada untuk perhitungan gamma.');
    
    const beta = v / c;
    if (Math.abs(beta) >= 1) throw new Error('Kecepatan tidak boleh melebihi atau sama dengan c.');
    const gamma = 1 / Math.sqrt(1 - beta * beta);
    
    if (target === "gamma") return gamma;
    
    const x = val1, t = val3;
    if (target === "x-prime") return gamma * (x - v * t);
    if (target === "t-prime") return gamma * (t - (v * x) / (c * c));
    
    throw new Error('Target Transformasi Lorentz tidak valid');
}

function hitungDilatasiWaktu(val1, val2, target) {
    if (target === "v") {
        const t = val1, t0 = val2;
        if (t0 <= 0 || t <= 0) throw new Error('Waktu harus positif.');
        if (t0 >= t) throw new Error('Waktu dilatasi (t) harus lebih besar dari waktu proper (t₀).');
        const gamma_inv_sq = (t0 / t) ** 2;
        return c * Math.sqrt(1 - gamma_inv_sq);
    }
    
    const v = val2;
    const beta = v / c;
    if (Math.abs(beta) >= 1) throw new Error('Kecepatan tidak boleh melebihi atau sama dengan c.');
    const gamma = 1 / Math.sqrt(1 - beta * beta);
    
    if (target === "t") {
        const t0 = val1;
        if (t0 < 0) throw new Error('Waktu proper harus non-negatif.');
        return gamma * t0;
    }
    if (target === "t0") {
        const t = val1;
        if (t < 0) throw new Error('Waktu dilatasi harus non-negatif.');
        return t / gamma;
    }
    throw new Error('Target Dilatasi Waktu tidak valid');
}

function hitungKontraksiPanjang(val1, val2, target) {
    if (target === "v") {
        const L = val1, L0 = val2;
         if (L <= 0 || L0 <= 0) throw new Error('Panjang harus positif.');
        if (L >= L0) throw new Error('Panjang kontraksi (L) harus lebih kecil dari panjang proper (L₀).');
        const gamma_inv_sq = (L / L0) ** 2;
        return c * Math.sqrt(1 - gamma_inv_sq);
    }

    const v = val2;
    const beta = v / c;
    if (Math.abs(beta) >= 1) throw new Error('Kecepatan tidak boleh melebihi atau sama dengan c.');
    const gamma = 1 / Math.sqrt(1 - beta * beta);

    if (target === "L") {
        const L0 = val1;
        if (L0 < 0) throw new Error('Panjang proper harus non-negatif.');
        return L0 / gamma;
    }
    if (target === "L0") {
        const L = val1;
        if (L < 0) throw new Error('Panjang kontraksi harus non-negatif.');
        return L * gamma;
    }
    throw new Error('Target Kontraksi Panjang tidak valid');
}

function hitungRelativitasKecepatan(val1, val2, target) {
    if (target === "u-prime") {
        const u = val1, v = val2;
        if (Math.abs(u) >= c || Math.abs(v) >= c) throw new Error('Kecepatan tidak boleh melebihi c.');
        const numerator = u - v; 
        const denominator = (1 - (u * v) / (c * c));
        if (denominator === 0) throw new Error('Hasil perhitungan tidak valid (pembagian dengan nol).');
        return numerator / denominator;
    }
    if (target === "u") {
        const u_prime = val1, v = val2;
        if (Math.abs(u_prime) >= c || Math.abs(v) >= c) throw new Error('Kecepatan tidak boleh melebihi c.');
        const numerator = u_prime + v;
        const denominator = (1 + (u_prime * v) / (c * c));
        if (denominator === 0) throw new Error('Hasil perhitungan tidak valid (pembagian dengan nol).');
        return numerator / denominator;
    }
    if (target === "v") {
        const u = val1, u_prime = val2;
        if (Math.abs(u) >= c || Math.abs(u_prime) >= c) throw new Error('Kecepatan tidak boleh melebihi c.');
        const numerator = u - u_prime;
        const denominator = (1 - (u * u_prime) / (c * c));
        if (denominator === 0) throw new Error('Hasil perhitungan tidak valid (pembagian dengan nol).');
        return numerator / denominator;
    }
    throw new Error('Target Relativitas Kecepatan tidak valid');
}

function hitungEnergiRelativistik(val1, val2, target) {
    if (target === "E") {
        const m0 = val1, v = val2;
        if (m0 <= 0) throw new Error('Massa diam (m₀) harus positif.');
        if (Math.abs(v) >= c) throw new Error('Kecepatan tidak boleh melebihi atau sama dengan c.');
        const beta = v / c;
        const gamma = 1 / Math.sqrt(1 - beta * beta);
        return gamma * m0 * c * c;
    }
    if (target === "m0") {
        const E = val1, v = val2;
        if (E <= 0) throw new Error('Energi (E) harus positif.');
        if (Math.abs(v) >= c) throw new Error('Kecepatan tidak boleh melebihi atau sama dengan c.');
        const beta = v / c;
        const gamma = 1 / Math.sqrt(1 - beta * beta);
        return E / (gamma * c * c);
    }
    if (target === "v") {
        const E = val1, m0 = val2;
        if (E <= 0) throw new Error('Energi (E) harus positif.');
        if (m0 <= 0) throw new Error('Massa diam (m₀) harus positif.');
        const E0 = m0 * c * c;
        if (E < E0) throw new Error(`Energi relativistik (E) harus lebih besar atau sama dengan energi diam (m₀ c² ≈ ${E0.toExponential(2)} J).`);
        const gamma = E / E0;
        const beta_sq = 1 - (1 / (gamma * gamma));
        if (beta_sq < 0) throw new Error('Input tidak valid (beta kuadrat negatif—periksa E dan m₀).');
        return c * Math.sqrt(beta_sq);
    }
    throw new Error('Target Energi Relativistik tidak valid');
}

function hitungMomentumRelativistik(val1, val2, target) {
    if (target === "p") {
        const m = val1, v = val2;
        if (m < 0) throw new Error('Massa tidak boleh negatif.');
        if (Math.abs(v) >= c) throw new Error('Kecepatan tidak boleh melebihi c.');
        return m * v;  
    }
    if (target === "m") {
        const p = val1, v = val2;
        if (Math.abs(v) >= c) throw new Error('Kecepatan tidak boleh melebihi c.');
        if (v === 0) throw new Error('Kecepatan tidak boleh nol untuk perhitungan ini.');
        return p / v;
    }
    if (target === "v") {
        const p = val1, m = val2;
        if (m <= 0) throw new Error('Massa harus positif.');
        return p / m;
    }
    throw new Error('Target Momentum Relativistik tidak valid');
}

function hitungEnergiTotal(val1, val2, target) {
    if (target === "E") {
        const p = val1, m0 = val2;
        if (m0 < 0) throw new Error('Massa diam tidak boleh negatif.');
        const pc_sq = (p * c) ** 2;
        const m0c2_sq = (m0 * c * c) ** 2;
        return Math.sqrt(pc_sq + m0c2_sq);
    }
    if (target === "p") {
        const E = val1, m0 = val2;
        const E0 = m0 * c * c;
        if (E < E0) throw new Error('Energi total (E) tidak boleh lebih kecil dari energi diam (E₀).');
        return Math.sqrt(E ** 2 - E0 ** 2) / c;
    }
    if (target === "m0") {
        const E = val1, p = val2;
        const pc = p * c;
        if (E < Math.abs(pc)) throw new Error('Energi total (E) tidak boleh lebih kecil dari |p|c.');
        return Math.sqrt(E ** 2 - pc ** 2) / (c * c);
    }
    throw new Error('Target Energi Total tidak valid');
}

function hitungEnergiDiam(val1, target) {
    if (target === "E0") {
        const m0 = val1;
        if (m0 < 0) throw new Error('Massa diam tidak boleh negatif.');
        return m0 * c * c;
    }
    if (target === "m0") {
        const E0 = val1;
        if (E0 < 0) throw new Error('Energi diam tidak boleh negatif.');
        return E0 / (c * c);
    }
    throw new Error('Target Energi Diam tidak valid');
}

function hitungHubunganMassaEnergi(val1, val2, target) {
    if (target === "v") {
        const m = val1, m0 = val2;
        if (m0 <= 0 || m <= 0) throw new Error('Massa harus positif.');
        if (m0 > m) throw new Error('Massa relativistik (m) harus lebih besar atau sama dengan massa diam (m₀).');
        if (m === m0) return 0;
        const gamma_inv_sq = (m0 / m) ** 2;
        return c * Math.sqrt(1 - gamma_inv_sq);
    }

    const v = val2;
    const beta = v / c;
    if (Math.abs(beta) >= 1) throw new Error('Kecepatan tidak boleh melebihi atau sama dengan c.');
    const gamma = 1 / Math.sqrt(1 - beta * beta);

    if (target === "m") {
        const m0 = val1;
        return gamma * m0;
    }
    if (target === "m0") {
        const m = val1;
        return m / gamma;
    }
    throw new Error('Target Hubungan Massa-Energi tidak valid');
}

function hitungParadoksKembar(val1, val2, target) {
    if (target === "v") {
        const t0 = val1, delta_t = val2;
        if (t0 <= 0) throw new Error('Waktu proper (t0) harus positif.');
        if (delta_t < 0) throw new Error('Selisih waktu (delta_t) tidak boleh negatif.');
        
        const gamma = 1 + delta_t / t0; 
        if (gamma < 1) throw new Error('Input tidak valid (gamma < 1).');
        const gamma_inv_sq = (1 / gamma) ** 2;
        return c * Math.sqrt(1 - gamma_inv_sq);
    }
    
    const v = val2;
    const beta = v / c;
    if (Math.abs(beta) >= 1) throw new Error('Kecepatan tidak boleh melebihi atau sama dengan c.');
    const gamma = 1 / Math.sqrt(1 - beta * beta);

    if (target === "delta-t") {
        const t0 = val1; 
        if (t0 < 0) throw new Error('Waktu proper harus non-negatif.');
        const t_bumi = gamma * t0;
        return t_bumi - t0; 
    }
    if (target === "t0") {
        const delta_t = val1; 
        if (delta_t < 0) throw new Error('Selisih waktu tidak boleh negatif.');
        if (gamma <= 1) throw new Error('Kecepatan terlalu kecil (gamma ≈ 1), hasil tidak valid.');
        return delta_t / (gamma - 1);
    }
    
    throw new Error('Target Paradoks Kembar tidak valid');
}

function hitungMomentumEmpat(val1, val2, val3, target) {
    if (target === "p-mu") {
        const E = val1, p_vektor = val2;
        if (p_vektor < 0) throw new Error('Vektor momentum harus non-negatif.');
        return (E / c) ** 2 - p_vektor ** 2;
    }
    if (target === "m0") {
        const E = val1, p_vektor = val2;
        if (p_vektor < 0) throw new Error('Vektor momentum harus non-negatif.');
        const invariant_sq = (E / c) ** 2 - p_vektor ** 2;
        if (invariant_sq < 0) throw new Error('Kombinasi E dan p tidak valid (invariant negatif), menunjukkan partikel takhionik.');
        return Math.sqrt(invariant_sq) / c;
    }
    
    const m0 = val3;
    if (m0 === null || m0 === undefined) throw new Error('Massa diam (m0) diperlukan untuk perhitungan E dan |p|.');
    
    const invariant_m0c2 = (m0 * c) ** 2;
    const p_mu_input = val1; 
    
    if (target === 'E' || target === 'p') {
        if (target === 'E' && val3 === 'm0') { 
        }
        else if (target === 'p' && val3 === 'm0') { 
        }
        else if (Math.abs(p_mu_input - invariant_m0c2) / Math.abs(invariant_m0c2) > 1e-6) {
             throw new Error(`Invariant (p_mu) ${p_mu_input} tidak cocok dengan (m₀c)² ${invariant_m0c2.toPrecision(6)}.`);
        }
    }
   
    if (target === "E") {
        const p_vektor = val2;
        if (p_vektor < 0) throw new Error('Vektor momentum harus non-negatif.');
        const p_vektor_c_sq = (p_vektor * c) ** 2;
        const E0_sq = (m0 * c * c) ** 2;
        return Math.sqrt(p_vektor_c_sq + E0_sq);
    }
    if (target === "p") {
        const E = val1;
        const E0_sq = (m0 * c * c) ** 2;
        if (E*E < E0_sq) throw new Error('Energi (E) terlalu kecil untuk massa diam (m0).');
        return Math.sqrt(E ** 2 - E0_sq) / c;
    }
    
    throw new Error('Target Momentum Empat tidak valid');
}

function hitungPersamaanMedanEinstein(val1, target) {
    const konstantaEinstein = 8 * Math.PI * G / (c ** 4);
    if (konstantaEinstein === 0) throw new Error('Konstanta Einstein tidak valid (pembagian dengan nol).');
    
    if (target === "G-mu-nu") {
        const T_mu_nu = val1;
        return konstantaEinstein * T_mu_nu;
    }
    if (target === "T-mu-nu") {
        const G_mu_nu = val1;
        return G_mu_nu / konstantaEinstein;
    }
    throw new Error('Target Persamaan Medan Einstein tidak valid');
}

function hitungDilatasiWaktuGravitasi(val1, val2, val3, target) {
    const c_sq = c * c;
    const twoG = 2 * G;

    if (target === "M") {
        const t = val1, t0 = val2, r = val3;
        if (r <= 0) throw new Error('Jarak (r) harus positif.');
        if (t0 <= 0 || t <= 0) throw new Error('Waktu harus positif.');
        if (t0 >= t) throw new Error('Waktu dilatasi (t) harus lebih besar dari waktu proper (t₀).');
        
        const rs_over_r_factor = 1 - (t0 / t) ** 2;
        return (rs_over_r_factor * r * c_sq) / twoG;
    }
    if (target === "r") {
        const t = val1, t0 = val2, M = val3;
        if (M <= 0) throw new Error('Massa (M) harus positif.');
        if (t0 <= 0 || t <= 0) throw new Error('Waktu harus positif.');
        if (t0 >= t) throw new Error('Waktu dilatasi (t) harus lebih besar dari waktu proper (t₀).');
        
        const rs = twoG * M / c_sq;
        const denom_sq = (t0 / t) ** 2;
        if (denom_sq === 1) throw new Error('t dan t0 tidak boleh sama.');
        
        return rs / (1 - denom_sq);
    }

    const M = (target === 't') ? val2 : val2;
    const r = (target === 't') ? val3 : val3;
    if (M <= 0) throw new Error('Massa (M) harus positif.');
    if (r <= 0) throw new Error('Jarak (r) harus positif.');
    
    const rs = twoG * M / c_sq; 
    if (r <= rs) throw new Error(`Jarak (r) harus lebih besar dari radius Schwarzschild (${rs.toPrecision(4)} m).`);
    
    const factor = Math.sqrt(1 - rs / r);
    
    if (target === "t") {
        const t0 = val1;
        if (t0 < 0) throw new Error('Waktu proper harus non-negatif.');
        return t0 / factor;
    }
    if (target === "t0") {
        const t = val1;
        if (t < 0) throw new Error('Waktu dilatasi harus non-negatif.');
        return t * factor;
    }
    
    throw new Error('Target Dilatasi Waktu Gravitasi tidak valid');
}

function hitungRedshiftGravitasi(val1, val2, target) {
    const c_sq = c * c;
    const twoG = 2 * G;
    
     if (target === "M") {
        const z = val1, r = val2;
        if (z <= -1) throw new Error('Redshift (z) harus lebih besar dari -1.');
        if (r <= 0) throw new Error('Jarak (r) harus positif.');
        
        const denom = 1 / (z + 1);
        const factor = 1 - denom ** 2;
        return (factor * r * c_sq) / twoG;
    }
    if (target === "r") {
        const z = val1, M = val2;
        if (z <= -1) throw new Error('Redshift (z) harus lebih besar dari -1.');
        if (M <= 0) throw new Error('Massa (M) harus positif.');
        
        const rs = twoG * M / c_sq;
        const denom_sq = (1 / (z + 1)) ** 2;
        if (denom_sq === 1) throw new Error('z tidak boleh 0.');
        
        return rs / (1 - denom_sq);
    }
    
    const M = val1, r = val2;
    if (M <= 0) throw new Error('Massa (M) harus positif.');
    if (r <= 0) throw new Error('Jarak (r) harus positif.');
    
    const rs = twoG * M / c_sq;
    if (r <= rs) throw new Error(`Jarak (r) harus lebih besar dari radius Schwarzschild (${rs.toPrecision(4)} m).`);
    
    if (target === "z") {
        return 1 / Math.sqrt(1 - rs / r) - 1;
    }

    throw new Error('Target Redshift Gravitasi tidak valid');
}

function hitungOrbitRelativistik(val1, val2, val3, target) {
    const c_sq = c * c;
    const sixPiG = 6 * Math.PI * G;

    if (target === "delta-phi") {
        const M = val1, a = val2, e = val3;
        if (M <= 0) throw new Error('Massa (M) harus positif.');
        if (a <= 0) throw new Error('Semi-Major Axis (a) harus positif.');
        if (e < 0 || e >= 1) throw new Error('Eksentrisitas (e) harus antara 0 (inklusif) dan 1 (eksklusif).');
        
        const denominator = a * (1 - e * e) * c_sq;
        if (denominator === 0) throw new Error('Input tidak valid (pembagian dengan nol).');
        
        return sixPiG * M / denominator;
    }
    if (target === "M") {
        const delta_phi = val1, a = val2, e = val3;
        if (delta_phi <= 0) throw new Error('Precession (Δφ) harus positif.');
        if (a <= 0) throw new Error('Semi-Major Axis (a) harus positif.');
        if (e < 0 || e >= 1) throw new Error('Eksentrisitas (e) harus antara 0 (inklusif) dan 1 (eksklusif).');
        
        const denominator = a * (1 - e * e) * c_sq;
        if (denominator === 0) throw new Error('Input tidak valid (pembagian dengan nol).');
        
        return (delta_phi * denominator) / sixPiG;
    }
    if (target === "a") {
        const delta_phi = val1, M = val2, e = val3;
        if (delta_phi <= 0) throw new Error('Precession (Δφ) harus positif.');
        if (M <= 0) throw new Error('Massa (M) harus positif.');
        if (e < 0 || e >= 1) throw new Error('Eksentrisitas (e) harus antara 0 (inklusif) dan 1 (eksklusif).');
        
        const denominator = delta_phi * (1 - e * e) * c_sq;
        if (denominator === 0) throw new Error('Input tidak valid (pembagian dengan nol).');
        
        return sixPiG * M / denominator;
    }
    if (target === "e") {
        const delta_phi = val1, M = val2, a = val3;
        if (delta_phi <= 0) throw new Error('Precession (Δφ) harus positif.');
        if (M <= 0) throw new Error('Massa (M) harus positif.');
        if (a <= 0) throw new Error('Semi-Major Axis (a) harus positif.');
        
        const term = (sixPiG * M) / (a * c_sq * delta_phi);
        if (term >= 1) throw new Error('Input tidak valid (tidak ada eksentrisitas riil, term >= 1).');
        
        const e_sq = 1 - term;
        return Math.sqrt(e_sq);
    }
    throw new Error('Target Orbit Relativistik tidak valid');
}

function hitungPembengkokanCahaya(val1, val2, target) {
    const c_sq = c * c;
    const fourG = 4 * G;

    if (target === "theta") {
        const M = val1, r = val2;
        if (M <= 0) throw new Error('Massa (M) harus positif.');
        if (r <= 0) throw new Error('Jarak (r) harus positif.');
        
        const denominator = r * c_sq;
        return fourG * M / denominator;
    }
    if (target === "M") {
        const theta = val1, r = val2; 
        if (r <= 0) throw new Error('Jarak (r) harus positif.');
        if (theta <= 0) throw new Error('Sudut (theta) harus positif.');
        
        const denominator = fourG;
        return (theta * r * c_sq) / denominator;
    }
    if (target === "r") {
        const theta = val1, M = val2; 
        if (M <= 0) throw new Error('Massa (M) harus positif.');
        if (theta <= 0) throw new Error('Sudut (theta) harus positif.');
        
        const denominator = theta * c_sq;
        return fourG * M / denominator;
    }
    throw new Error('Target PembengkokanCahaya tidak valid');
}

function hitungEnergiPotensialGravitasiRelativistik(M, m, r, target) {
    if (r <= 0) throw new Error('Jarak r harus positif.');
    if (M <= 0 || m <= 0) throw new Error('Massa harus positif.');
    
    const rs_M = 2 * G * M / (c * c);
    if (r <= rs_M) throw new Error(`Jarak (r) harus lebih besar dari radius Schwarzschild M (${rs_M.toPrecision(4)} m).`);

    const term_gravitasi_klasik = G * M * m / r;
    const koreksi_relativistik = 3 * rs_M / (2 * r);
    
    if (target === "U") {
         return -term_gravitasi_klasik * (1 + koreksi_relativistik);
    }
    
    throw new Error('Target tidak valid untuk fungsi ini. Gunakan fungsi Invers untuk M, m, r.');
}

function hitungEnergiPotensialGravitasiRelativistik_Invers(val1, val2, val3, target) {
    
    if (target === "m") {
        const U = val1, M = val2, r = val3;
        if (r === 0 || c === 0 || M === 0) throw new Error("Input r, c, dan M tidak boleh nol.");
        if (U >= 0) throw new Error("Energi Potensial (U) harus negatif.");
        
        const c_sq = c * c;
        const G_sq = G * G;

        const term1 = - (G * M) / r;
        const term2 = - (3 * G_sq * M * M) / (r * r * c_sq);
        const denominator = term1 + term2;
        
        if (denominator === 0) throw new Error('Kombinasi input tidak valid (pembagian dengan nol).');
        
        return U / denominator;
    }
    
    if (target === "r") {
        const U = val1, M = val2, m = val3;
        if (U >= 0) throw new Error("Energi Potensial (U) harus negatif.");
        if (M <= 0 || m <= 0) throw new Error("Massa harus positif.");

        const c_sq = c * c;
        const G_sq = G * G;
        
        const a = U;
        const b = G * M * m;
        const d = (3 * G_sq * M * M * m) / c_sq;
        
        const discriminant = b * b - 4 * a * d;
        if (discriminant < 0) throw new Error('Input tidak valid (tidak ada solusi riil untuk r).');
        
        const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        
        if (r1 > 0) return r1;
        if (r2 > 0) return r2;
        
        throw new Error('Tidak ditemukan solusi jarak (r) yang positif dan riil.');
    }
    
    if (target === "M") {
        const U = val1, m = val2, r = val3;
        if (U >= 0) throw new Error("Energi Potensial (U) harus negatif.");
        if (r === 0 || c === 0 || m === 0) throw new Error("Input r, c, dan m tidak boleh nol.");
        
        const c_sq = c * c;
        const G_sq = G * G;
        
        const a = (3 * G_sq * m) / (r * r * c_sq);
        const b = (G * m) / r;
        const d = U;
        
        const discriminant = b * b - 4 * a * d;
        if (discriminant < 0) throw new Error('Input tidak valid (tidak ada solusi riil untuk M).');
        
        if (a === 0) throw new Error('Kombinasi input tidak valid (pembagian dengan nol).');
        
        const M1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const M2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        
        if (M1 > 0) return M1;
        if (M2 > 0) return M2;
        
        throw new Error('Tidak ditemukan solusi massa (M) yang positif dan riil.');
    }
    
    throw new Error('Target invers Energi Potensial tidak valid');
}