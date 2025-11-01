const c = 299792458; 
const h = 6.62607015e-34; 
const I0 = 1e-12; 
const gamma_gas = 1.4; 
const R_gas = 8.314; 
const M_air = 0.02897; 
const v0_air = 331; 
const temp_factor = 0.6; 
const near_point = 0.25; 

const ANGLE_KEYS = ['theta', 'phi', 'theta1', 'theta2', 'theta_i', 'theta_r', 'theta_c', 'beta'];


const KALKULATOR_CONFIG = {
    
    'y-gelombang': {
        inputs: { A: 'Amplitudo (m)', k: 'Bilangan Gelombang (rad/m)', x: 'Posisi (m)', omega: 'Frekuensi Sudut (rad/s)', t: 'Waktu (s)', phi: 'Fase Awal (rad)' },
        satuanHasil: 'meter (m)',
        namaVariabel: 'y(x,t)',
        fungsiHitung: hitungPersamaanGelombang,
        argKeys: ['A', 'k', 'x', 'omega', 't', 'phi'],
        target: 'y'
    },
    'A-gelombang': { 
        inputs: { y: 'Posisi y (m)', k: 'Bilangan Gelombang (rad/m)', x: 'Posisi (m)', omega: 'Frekuensi Sudut (rad/s)', t: 'Waktu (s)', phi: 'Fase Awal (rad)' },
        satuanHasil: 'meter (m)',
        namaVariabel: 'A',
        fungsiHitung: hitungPersamaanGelombang,
        argKeys: ['y', 'k', 'x', 'omega', 't', 'phi'],
        target: 'A'
    },
    'k-gelombang': {
        inputs: { lambda: 'Panjang Gelombang (m)' },
        satuanHasil: 'rad/m',
        namaVariabel: 'k',
        fungsiHitung: hitungPersamaanGelombang,
        argKeys: ['lambda', null, null, null, null, null], 
        target: 'k'
    },
    'omega-gelombang': {
        inputs: { f: 'Frekuensi (Hz)' },
        satuanHasil: 'rad/s',
        namaVariabel: 'ω',
        fungsiHitung: hitungPersamaanGelombang,
        argKeys: ['f', null, null, null, null, null], 
        target: 'omega'
    },

    'v-gelombang': {
        inputs: { lambda: 'Panjang Gelombang (m)', f: 'Frekuensi (Hz)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungKecepatanGelombang,
        argKeys: ['lambda', 'f'],
        target: 'v'
    },
    'lambda-gelombang': {
        inputs: { v: 'Kecepatan (m/s)', f: 'Frekuensi (Hz)' },
        satuanHasil: 'm',
        namaVariabel: 'λ',
        fungsiHitung: hitungKecepatanGelombang,
        argKeys: ['v', 'f'],
        target: 'lambda'
    },
    'f-gelombang': {
        inputs: { v: 'Kecepatan (m/s)', lambda: 'Panjang Gelombang (m)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f',
        fungsiHitung: hitungKecepatanGelombang,
        argKeys: ['v', 'lambda'],
        target: 'f'
    },

    'f-frekuensi': {
        inputs: { T: 'Periode (s)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f',
        fungsiHitung: hitungFrekuensi,
        argKeys: ['T', null],
        target: 'f'
    },
    'T-frekuensi': {
        inputs: { f: 'Frekuensi (Hz)' },
        satuanHasil: 's',
        namaVariabel: 'T',
        fungsiHitung: hitungFrekuensi,
        argKeys: ['f', null],
        target: 'T'
    },
    'omega-frekuensi': {
        inputs: { f: 'Frekuensi (Hz)' },
        satuanHasil: 'rad/s',
        namaVariabel: 'ω',
        fungsiHitung: hitungFrekuensi,
        argKeys: ['f', null],
        target: 'omega'
    },

    'T-periode': {
        inputs: { f: 'Frekuensi (Hz)' },
        satuanHasil: 's',
        namaVariabel: 'T',
        fungsiHitung: hitungPeriode,
        argKeys: ['f'],
        target: 'T'
    },
    'f-periode': {
        inputs: { T: 'Periode (s)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f',
        fungsiHitung: hitungPeriode,
        argKeys: ['T'],
        target: 'f'
    },

    'lambda-panjang': {
        inputs: { v: 'Kecepatan (m/s)', f: 'Frekuensi (Hz)' },
        satuanHasil: 'm',
        namaVariabel: 'λ',
        fungsiHitung: hitungPanjangGelombang,
        argKeys: ['v', 'f'],
        target: 'lambda'
    },
    'v-panjang': {
        inputs: { lambda: 'Panjang Gelombang (m)', f: 'Frekuensi (Hz)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungPanjangGelombang,
        argKeys: ['lambda', 'f'],
        target: 'v'
    },
    'f-panjang': {
        inputs: { v: 'Kecepatan (m/s)', lambda: 'Panjang Gelombang (m)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f',
        fungsiHitung: hitungPanjangGelombang,
        argKeys: ['v', 'lambda'],
        target: 'f'
    },
    
    'E-tali': {
        inputs: { mu: 'Densitas Linear (kg/m)', omega: 'Frekuensi Sudut (rad/s)', A: 'Amplitudo (m)' },
        satuanHasil: 'J/m',
        namaVariabel: 'E/L',
        fungsiHitung: hitungEnergiGelombang,
        argKeys: ['mu', 'omega', 'A'],
        target: 'E'
    },
    'mu-tali': {
        inputs: { E: 'Energi per Panjang (J/m)', omega: 'Frekuensi Sudut (rad/s)', A: 'Amplitudo (m)' },
        satuanHasil: 'kg/m',
        namaVariabel: 'μ',
        fungsiHitung: hitungEnergiGelombang,
        argKeys: ['E', 'omega', 'A'],
        target: 'mu'
    },
    'omega-tali': {
        inputs: { E: 'Energi per Panjang (J/m)', mu: 'Densitas Linear (kg/m)', A: 'Amplitudo (m)' },
        satuanHasil: 'rad/s',
        namaVariabel: 'ω',
        fungsiHitung: hitungEnergiGelombang,
        argKeys: ['E', 'mu', 'A'],
        target: 'omega'
    },
    'A-tali': { 
        inputs: { E: 'Energi per Panjang (J/m)', mu: 'Densitas Linear (kg/m)', omega: 'Frekuensi Sudut (rad/s)' },
        satuanHasil: 'm',
        namaVariabel: 'A',
        fungsiHitung: hitungEnergiGelombang,
        argKeys: ['E', 'mu', 'omega'],
        target: 'A'
    },

    'I-intensitas': {
        inputs: { P: 'Daya (W)', A: 'Luas (m²)' },
        satuanHasil: 'W/m²',
        namaVariabel: 'I',
        fungsiHitung: hitungIntensitasGelombang,
        argKeys: ['P', 'A'],
        target: 'I'
    },
    'P-intensitas': {
        inputs: { I: 'Intensitas (W/m²)', A: 'Luas (m²)' },
        satuanHasil: 'W',
        namaVariabel: 'P',
        fungsiHitung: hitungIntensitasGelombang,
        argKeys: ['I', 'A'],
        target: 'P'
    },
    'A-intensitas': {
        inputs: { P: 'Daya (W)', I: 'Intensitas (W/m²)' },
        satuanHasil: 'm²',
        namaVariabel: 'A',
        fungsiHitung: hitungIntensitasGelombang,
        argKeys: ['P', 'I'],
        target: 'A'
    },

    'P-daya': {
        inputs: { I: 'Intensitas (W/m²)', A: 'Luas (m²)' },
        satuanHasil: 'W',
        namaVariabel: 'P',
        fungsiHitung: hitungDayaGelombang,
        argKeys: ['I', 'A'],
        target: 'P'
    },
    'I-daya': {
        inputs: { P: 'Daya (W)', A: 'Luas (m²)' },
        satuanHasil: 'W/m²',
        namaVariabel: 'I',
        fungsiHitung: hitungDayaGelombang,
        argKeys: ['P', 'A'],
        target: 'I'
    },
    'A-daya': {
        inputs: { P: 'Daya (W)', I: 'Intensitas (W/m²)' },
        satuanHasil: 'm²',
        namaVariabel: 'A',
        fungsiHitung: hitungDayaGelombang,
        argKeys: ['P', 'I'],
        target: 'A'
    },

    
    'v-suara': {
        inputs: { T: 'Suhu (°C)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungKecepatanSuara,
        argKeys: ['T', null],
        target: 'v'
    },
    'T-suara': {
        inputs: { v: 'Kecepatan Suara (m/s)' },
        satuanHasil: '°C',
        namaVariabel: 'T',
        fungsiHitung: hitungKecepatanSuara,
        argKeys: ['v', null],
        target: 'T'
    },
    'v-ideal': {
        inputs: { T_kelvin: 'Suhu (K)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungKecepatanSuara,
        argKeys: [null, 'T_kelvin'],
        target: 'v-ideal'
    },

    'beta-dB': {
        inputs: { I: 'Intensitas (W/m²)' },
        satuanHasil: 'dB',
        namaVariabel: 'β',
        fungsiHitung: hitungTarafIntensitas,
        argKeys: ['I'],
        target: 'beta'
    },
    'I-dB': {
        inputs: { beta: 'Taraf Intensitas (dB)' },
        satuanHasil: 'W/m²',
        namaVariabel: 'I',
        fungsiHitung: hitungTarafIntensitas,
        argKeys: ['beta'],
        target: 'I'
    },

    'f-tabung-terbuka': {
        inputs: { n: 'Harmonik (n)', v: 'Kecepatan (m/s)', L: 'Panjang (m)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f_n',
        fungsiHitung: hitungResonansiTabung,
        argKeys: ['n', 'v', 'L', 'terbuka'],
        target: 'f'
    },
    'f-tabung-tertutup': {
        inputs: { n: 'Harmonik (n, ganjil)', v: 'Kecepatan (m/s)', L: 'Panjang (m)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f_n',
        fungsiHitung: hitungResonansiTabung,
        argKeys: ['n', 'v', 'L', 'tertutup'],
        target: 'f'
    },
    'L-tabung': {
        inputs: { f: 'Frekuensi (Hz)', v: 'Kecepatan (m/s)', n: 'Harmonik (n)', tipe: 'Tipe (terbuka/tertutup)' },
        satuanHasil: 'm',
        namaVariabel: 'L',
        fungsiHitung: hitungResonansiTabung,
        argKeys: ['n', 'v', 'f', 'tipe'], 
        target: 'L'
    },
    'v-tabung': {
        inputs: { f: 'Frekuensi (Hz)', L: 'Panjang (m)', n: 'Harmonik (n)', tipe: 'Tipe (terbuka/tertutup)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungResonansiTabung,
        argKeys: ['n', 'L', 'f', 'tipe'], 
        target: 'v'
    },
    'n-tabung': {
        inputs: { f: 'Frekuensi (Hz)', v: 'Kecepatan (m/s)', L: 'Panjang (m)', tipe: 'Tipe (terbuka/tertutup)' },
        satuanHasil: '(orde)',
        namaVariabel: 'n',
        fungsiHitung: hitungResonansiTabung,
        argKeys: ['f', 'v', 'L', 'tipe'], 
        target: 'n'
    },

    'f-resonansi': {
        inputs: { n: 'Harmonik (n)', v: 'Kecepatan (m/s)', L: 'Panjang (m)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f_n',
        fungsiHitung: hitungFrekuensiResonansi,
        argKeys: ['n', 'v', 'L'],
        target: 'f'
    },
    'L-resonansi': {
        inputs: { f: 'Frekuensi (Hz)', v: 'Kecepatan (m/s)', n: 'Harmonik (n)' },
        satuanHasil: 'm',
        namaVariabel: 'L',
        fungsiHitung: hitungFrekuensiResonansi,
        argKeys: ['n', 'v', 'f'],
        target: 'L'
    },
    'v-resonansi': {
        inputs: { f: 'Frekuensi (Hz)', L: 'Panjang (m)', n: 'Harmonik (n)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungFrekuensiResonansi,
        argKeys: ['n', 'f', 'L'],
        target: 'v'
    },

    'f-doppler': {
        inputs: { f: 'Frekuensi Sumber (Hz)', v: 'Kecepatan Medium (m/s)', vo: 'Kecepatan Pengamat (m/s)', vs: 'Kecepatan Sumber (m/s)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f\'',
        fungsiHitung: hitungEfekDoppler,
        argKeys: ['f', 'v', 'vo', 'vs'],
        target: 'f-prime'
    },
    'f-sumber': {
        inputs: { f_prime: 'Frekuensi Diamati (Hz)', v: 'Kecepatan Medium (m/s)', vo: 'Kecepatan Pengamat (m/s)', vs: 'Kecepatan Sumber (m/s)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f',
        fungsiHitung: hitungEfekDoppler,
        argKeys: ['f_prime', 'v', 'vo', 'vs'],
        target: 'f-sumber'
    },
    'v-medium-doppler': {
        inputs: { f_prime: 'Frekuensi Diamati (Hz)', f: 'Frekuensi Sumber (Hz)', vo: 'Kecepatan Pengamat (m/s)', vs: 'Kecepatan Sumber (m/s)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungEfekDoppler,
        argKeys: ['f_prime', 'f', 'vo', 'vs'],
        target: 'v-medium'
    },
    'v-pengamat': {
        inputs: { f_prime: 'Frekuensi Diamati (Hz)', f: 'Frekuensi Sumber (Hz)', v: 'Kecepatan Medium (m/s)', vs: 'Kecepatan Sumber (m/s)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v_o',
        fungsiHitung: hitungEfekDoppler,
        argKeys: ['f_prime', 'f', 'v', 'vs'],
        target: 'v-pengamat'
    },
    'v-sumber': {
        inputs: { f_prime: 'Frekuensi Diamati (Hz)', f: 'Frekuensi Sumber (Hz)', v: 'Kecepatan Medium (m/s)', vo: 'Kecepatan Pengamat (m/s)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v_s',
        fungsiHitung: hitungEfekDoppler,
        argKeys: ['f_prime', 'f', 'v', 'vo'],
        target: 'v-sumber'
    },
    
    'delta-l-konstruktif': {
        inputs: { m: 'Orde (m)', lambda: 'Panjang Gelombang (m)' },
        satuanHasil: 'm',
        namaVariabel: 'Δl',
        fungsiHitung: hitungInterferensiBunyi,
        argKeys: ['m', 'lambda', 'konstruktif'],
        target: 'delta-l'
    },
    'delta-l-destruktif': {
        inputs: { m: 'Orde (m)', lambda: 'Panjang Gelombang (m)' },
        satuanHasil: 'm',
        namaVariabel: 'Δl',
        fungsiHitung: hitungInterferensiBunyi,
        argKeys: ['m', 'lambda', 'destruktif'],
        target: 'delta-l'
    },
    'lambda-interferensi': {
        inputs: { delta_l: 'Selisih Jalur (m)', m: 'Orde (m)', tipe: 'Tipe (konstruktif/destruktif)' },
        satuanHasil: 'm',
        namaVariabel: 'λ',
        fungsiHitung: hitungInterferensiBunyi,
        argKeys: ['m', 'delta_l', 'tipe'], 
        target: 'lambda'
    },
    'm-interferensi': {
        inputs: { delta_l: 'Selisih Jalur (m)', lambda: 'Panjang Gelombang (m)', tipe: 'Tipe (konstruktif/destruktif)' },
        satuanHasil: '(orde)',
        namaVariabel: 'm',
        fungsiHitung: hitungInterferensiBunyi,
        argKeys: ['delta_l', 'lambda', 'tipe'], 
        target: 'm'
    },

    'f-beat': {
        inputs: { f1: 'Frekuensi 1 (Hz)', f2: 'Frekuensi 2 (Hz)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f_beat',
        fungsiHitung: hitungPembentukanBeat,
        argKeys: ['f1', 'f2'],
        target: 'f-beat'
    },
    'f1-beat': {
        inputs: { f_beat: 'Frekuensi Beat (Hz)', f2: 'Frekuensi 2 (Hz)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f1 (asumsi f1 > f2)',
        fungsiHitung: hitungPembentukanBeat,
        argKeys: ['f_beat', 'f2'],
        target: 'f1'
    },
    'f2-beat': {
        inputs: { f_beat: 'Frekuensi Beat (Hz)', f1: 'Frekuensi 1 (Hz)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f2 (asumsi f1 > f2)',
        fungsiHitung: hitungPembentukanBeat,
        argKeys: ['f_beat', 'f1'],
        target: 'f2'
    },

    
    'c-cahaya': {
        inputs: {},
        satuanHasil: 'm/s',
        namaVariabel: 'c',
        fungsiHitung: () => c, 
        argKeys: [],
        target: null
    },

    'lambda-cahaya': {
        inputs: { f: 'Frekuensi (Hz)', n: 'Indeks Bias (optional, default 1)' },
        satuanHasil: 'm',
        namaVariabel: 'λ',
        fungsiHitung: hitungPanjangGelombangCahaya,
        argKeys: ['f', 'n'],
        target: 'lambda'
    },
    'f-cahaya': {
        inputs: { lambda: 'Panjang Gelombang (m)', n: 'Indeks Bias (optional, default 1)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f',
        fungsiHitung: hitungPanjangGelombangCahaya,
        argKeys: ['lambda', 'n'],
        target: 'f'
    },
    'n-cahaya': {
        inputs: { lambda: 'Panjang Gelombang (m)', f: 'Frekuensi (Hz)' },
        satuanHasil: 'unitless',
        namaVariabel: 'n',
        fungsiHitung: hitungPanjangGelombangCahaya,
        argKeys: ['lambda', 'f'],
        target: 'n'
    },

    'E-foton': {
        inputs: { f: 'Frekuensi (Hz)' },
        satuanHasil: 'J',
        namaVariabel: 'E',
        fungsiHitung: hitungEnergiFoton,
        argKeys: ['f', null],
        target: 'E'
    },
    'f-foton': {
        inputs: { E: 'Energi (J)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f',
        fungsiHitung: hitungEnergiFoton,
        argKeys: ['E', null],
        target: 'f'
    },
    'lambda-foton': {
        inputs: { E: 'Energi (J)' },
        satuanHasil: 'm',
        namaVariabel: 'λ',
        fungsiHitung: hitungEnergiFoton,
        argKeys: ['E', null],
        target: 'lambda'
    },

    'n-bias': {
        inputs: { v: 'Kecepatan di Medium (m/s)' },
        satuanHasil: 'unitless',
        namaVariabel: 'n',
        fungsiHitung: hitungIndeksBias,
        argKeys: ['v'],
        target: 'n'
    },
    'v-medium': {
        inputs: { n: 'Indeks Bias (unitless)' },
        satuanHasil: 'm/s',
        namaVariabel: 'v',
        fungsiHitung: hitungIndeksBias,
        argKeys: ['n'],
        target: 'v'
    },

    'theta2-pembiasan': {
        inputs: { n1: 'Indeks 1', theta1: 'Sudut Datang', n2: 'Indeks 2' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'θ₂',
        fungsiHitung: hitungPembiasan,
        argKeys: ['n1', 'theta1', 'n2'],
        target: 'theta2'
    },
    'n1-pembiasan': {
        inputs: { theta1: 'Sudut Datang', theta2: 'Sudut Bias', n2: 'Indeks 2' },
        satuanHasil: 'unitless',
        namaVariabel: 'n₁',
        fungsiHitung: hitungPembiasan,
        argKeys: ['theta1', 'theta2', 'n2'],
        target: 'n1'
    },
    'theta1-pembiasan': {
        inputs: { n1: 'Indeks 1', theta2: 'Sudut Bias', n2: 'Indeks 2' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'θ₁',
        fungsiHitung: hitungPembiasan,
        argKeys: ['n1', 'theta2', 'n2'],
        target: 'theta1'
    },
    'n2-pembiasan': {
        inputs: { n1: 'Indeks 1', theta1: 'Sudut Datang', theta2: 'Sudut Bias' },
        satuanHasil: 'unitless',
        namaVariabel: 'n₂',
        fungsiHitung: hitungPembiasan,
        argKeys: ['n1', 'theta1', 'theta2'],
        target: 'n2'
    },

    'theta-r-pemantulan': {
        inputs: { theta_i: 'Sudut Datang' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'θ_r',
        fungsiHitung: hitungPemantulan,
        argKeys: ['theta_i'],
        target: 'theta_r'
    },
    'theta-i-pemantulan': {
        inputs: { theta_r: 'Sudut Pantul' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'θ_i',
        fungsiHitung: hitungPemantulan,
        argKeys: ['theta_r'],
        target: 'theta_i'
    },

    'theta-c-kritis': {
        inputs: { n1: 'Indeks 1 (medium >)', n2: 'Indeks 2 (medium <)' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'θ_c',
        fungsiHitung: hitungSudutKritis,
        argKeys: ['n1', 'n2'],
        target: 'theta_c'
    },
    'n1-kritis': {
        inputs: { theta_c: 'Sudut Kritis', n2: 'Indeks 2 (medium <)' },
        satuanHasil: 'unitless',
        namaVariabel: 'n₁',
        fungsiHitung: hitungSudutKritis,
        argKeys: ['theta_c', 'n2'],
        target: 'n1'
    },
    'n2-kritis': {
        inputs: { theta_c: 'Sudut Kritis', n1: 'Indeks 1 (medium >)' },
        satuanHasil: 'unitless',
        namaVariabel: 'n₂',
        fungsiHitung: hitungSudutKritis,
        argKeys: ['theta_c', 'n1'],
        target: 'n2'
    },

    'total-reflection': {
        inputs: { theta_i: 'Sudut Datang', theta_c: 'Sudut Kritis' },
        satuanHasil: '(Terjadi / Tidak)',
        namaVariabel: 'Total Internal Reflection',
        fungsiHitung: hitungPembelokanTotal,
        argKeys: ['theta_i', 'theta_c'],
        target: 'total'
    },

    
    's-prime-datar': {
        inputs: { s: 'Jarak Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 's\'',
        fungsiHitung: hitungCerminDatar,
        argKeys: ['s'],
        target: 's-prime'
    },
    's-datar': {
        inputs: { s_prime: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 's',
        fungsiHitung: hitungCerminDatar,
        argKeys: ['s_prime'],
        target: 's'
    },

    'f-cermin': {
        inputs: { R: 'Radius Kelengkungan (m)' },
        satuanHasil: 'm',
        namaVariabel: 'f',
        fungsiHitung: hitungCerminLengkung,
        argKeys: [null, null, null, 'R'],
        target: 'f'
    },
    'R-cermin': {
        inputs: { f: 'Jarak Fokus (m)' },
        satuanHasil: 'm',
        namaVariabel: 'R',
        fungsiHitung: hitungCerminLengkung,
        argKeys: ['f', null, null, null],
        target: 'R'
    },
    's-i-cermin': {
        inputs: { f: 'Jarak Fokus (m)', s_o: 'Jarak Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_i',
        fungsiHitung: hitungCerminLengkung,
        argKeys: ['f', 's_o', null, null],
        target: 's_i'
    },
    's-o-cermin': {
        inputs: { f: 'Jarak Fokus (m)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_o',
        fungsiHitung: hitungCerminLengkung,
        argKeys: ['f', null, 's_i', null],
        target: 's_o'
    },

    'f-lensa': {
        inputs: { s_o: 'Jarak Benda (m)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 'f',
        fungsiHitung: hitungPersamaanLensa,
        argKeys: ['s_o', 's_i'],
        target: 'f'
    },
    's-o-lensa': {
        inputs: { f: 'Jarak Fokus (m)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_o',
        fungsiHitung: hitungPersamaanLensa,
        argKeys: ['f', 's_i'],
        target: 's_o'
    },
    's-i-lensa': {
        inputs: { f: 'Jarak Fokus (m)', s_o: 'Jarak Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_i',
        fungsiHitung: hitungPersamaanLensa,
        argKeys: ['f', 's_o'],
        target: 's_i'
    },

    'm-perbesaran': {
        inputs: { s_i: 'Jarak Bayangan (m)', s_o: 'Jarak Benda (m)' },
        satuanHasil: 'unitless',
        namaVariabel: 'm',
        fungsiHitung: hitungPerbesaran,
        argKeys: ['s_i', 's_o', null, null],
        target: 'm'
    },
    'h-i-perbesaran': {
        inputs: { m: 'Perbesaran (unitless)', h_o: 'Tinggi Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 'h_i',
        fungsiHitung: hitungPerbesaran,
        argKeys: ['m', null, 'h_o', null],
        target: 'h_i'
    },
    'h-o-perbesaran': {
        inputs: { m: 'Perbesaran (unitless)', h_i: 'Tinggi Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 'h_o',
        fungsiHitung: hitungPerbesaran,
        argKeys: ['m', null, null, 'h_i'],
        target: 'h_o'
    },
    's-i-perbesaran': {
        inputs: { m: 'Perbesaran (unitless)', s_o: 'Jarak Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_i',
        fungsiHitung: hitungPerbesaran,
        argKeys: ['m', 's_o', null, null],
        target: 's_i'
    },
    's-o-perbesaran': {
        inputs: { m: 'Perbesaran (unitless)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_o',
        fungsiHitung: hitungPerbesaran,
        argKeys: ['m', null, null, 's_i'],
        target: 's_o'
    },

    
    'theta-interferensi': {
        inputs: { d: 'Jarak Celah (m)', lambda: 'Panjang Gelombang (m)', m: 'Orde (m)' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'θ',
        fungsiHitung: hitungInterferensiCahaya,
        argKeys: ['d', 'lambda', 'm'],
        target: 'theta'
    },
    'd-interferensi': {
        inputs: { theta: 'Sudut', lambda: 'Panjang Gelombang (m)', m: 'Orde (m)' },
        satuanHasil: 'm',
        namaVariabel: 'd',
        fungsiHitung: hitungInterferensiCahaya,
        argKeys: ['theta', 'lambda', 'm'],
        target: 'd'
    },
    'lambda-inter-cahaya': {
        inputs: { theta: 'Sudut', d: 'Jarak Celah (m)', m: 'Orde (m)' },
        satuanHasil: 'm',
        namaVariabel: 'λ',
        fungsiHitung: hitungInterferensiCahaya,
        argKeys: ['theta', 'd', 'm'],
        target: 'lambda'
    },
    'm-inter-cahaya': {
        inputs: { theta: 'Sudut', d: 'Jarak Celah (m)', lambda: 'Panjang Gelombang (m)' },
        satuanHasil: '(orde)',
        namaVariabel: 'm',
        fungsiHitung: hitungInterferensiCahaya,
        argKeys: ['theta', 'd', 'lambda'],
        target: 'm'
    },

    'delta-y-inter': {
        inputs: { lambda: 'Panjang Gelombang (m)', D: 'Jarak ke Layar (m)', d: 'Jarak Celah (m)' },
        satuanHasil: 'm',
        namaVariabel: 'Δy',
        fungsiHitung: hitungJarakGarisInterferensi,
        argKeys: ['lambda', 'D', 'd'],
        target: 'delta-y'
    },
    'lambda-inter': {
        inputs: { delta_y: 'Jarak Garis (m)', D: 'Jarak ke Layar (m)', d: 'Jarak Celah (m)' },
        satuanHasil: 'm',
        namaVariabel: 'λ',
        fungsiHitung: hitungJarakGarisInterferensi,
        argKeys: ['delta_y', 'D', 'd'],
        target: 'lambda'
    },
    'D-inter': {
        inputs: { delta_y: 'Jarak Garis (m)', lambda: 'Panjang Gelombang (m)', d: 'Jarak Celah (m)' },
        satuanHasil: 'm',
        namaVariabel: 'D',
        fungsiHitung: hitungJarakGarisInterferensi,
        argKeys: ['delta_y', 'lambda', 'd'],
        target: 'D'
    },
    'd-inter': {
        inputs: { delta_y: 'Jarak Garis (m)', lambda: 'Panjang Gelombang (m)', D: 'Jarak ke Layar (m)' },
        satuanHasil: 'm',
        namaVariabel: 'd',
        fungsiHitung: hitungJarakGarisInterferensi,
        argKeys: ['delta_y', 'lambda', 'D'],
        target: 'd'
    },

    'theta-difraksi': {
        inputs: { a: 'Lebar Celah (m)', lambda: 'Panjang Gelombang (m)', m: 'Orde (m, non-zero)' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'θ',
        fungsiHitung: hitungDifraksiCelahTunggal,
        argKeys: ['a', 'lambda', 'm'],
        target: 'theta'
    },
    'a-difraksi': {
        inputs: { theta: 'Sudut', lambda: 'Panjang Gelombang (m)', m: 'Orde (m, non-zero)' },
        satuanHasil: 'm',
        namaVariabel: 'a',
        fungsiHitung: hitungDifraksiCelahTunggal,
        argKeys: ['theta', 'lambda', 'm'],
        target: 'a'
    },
    'lambda-difraksi': {
        inputs: { theta: 'Sudut', a: 'Lebar Celah (m)', m: 'Orde (m, non-zero)' },
        satuanHasil: 'm',
        namaVariabel: 'λ',
        fungsiHitung: hitungDifraksiCelahTunggal,
        argKeys: ['theta', 'a', 'm'],
        target: 'lambda'
    },
    'm-difraksi': {
        inputs: { theta: 'Sudut', a: 'Lebar Celah (m)', lambda: 'Panjang Gelombang (m)' },
        satuanHasil: '(orde, non-zero)',
        namaVariabel: 'm',
        fungsiHitung: hitungDifraksiCelahTunggal,
        argKeys: ['theta', 'a', 'lambda'],
        target: 'm'
    },
    
    'theta-ganda': {
        inputs: { d: 'Jarak Celah (m)', lambda: 'Panjang Gelombang (m)', m: 'Orde (m)' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'θ',
        fungsiHitung: hitungDifraksiCelahGanda,
        argKeys: ['d', 'lambda', 'm'],
        target: 'theta'
    },
    'd-ganda': {
        inputs: { theta: 'Sudut', lambda: 'Panjang Gelombang (m)', m: 'Orde (m)' },
        satuanHasil: 'm',
        namaVariabel: 'd',
        fungsiHitung: hitungDifraksiCelahGanda,
        argKeys: ['theta', 'lambda', 'm'],
        target: 'd'
    },
    'lambda-ganda': {
        inputs: { theta: 'Sudut', d: 'Jarak Celah (m)', m: 'Orde (m)' },
        satuanHasil: 'm',
        namaVariabel: 'λ',
        fungsiHitung: hitungDifraksiCelahGanda,
        argKeys: ['theta', 'd', 'm'],
        target: 'lambda'
    },
    'm-ganda': {
        inputs: { theta: 'Sudut', d: 'Jarak Celah (m)', lambda: 'Panjang Gelombang (m)' },
        satuanHasil: '(orde)',
        namaVariabel: 'm',
        fungsiHitung: hitungDifraksiCelahGanda,
        argKeys: ['theta', 'd', 'lambda'],
        target: 'm'
    },
    
    'I-pola': {
        inputs: { beta: 'Parameter β' },
        satuanHasil: 'relative (I/I₀)',
        namaVariabel: 'I(θ)',
        fungsiHitung: hitungPolaDifraksi,
        argKeys: [null, null, null, 'beta'],
        target: 'I'
    },
    'beta-pola': {
        inputs: { a: 'Lebar Celah (m)', theta: 'Sudut', lambda: 'Panjang Gelombang (m)' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'β',
        fungsiHitung: hitungPolaDifraksi,
        argKeys: ['a', 'theta', 'lambda', null],
        target: 'beta'
    },
    'a-pola': {
        inputs: { beta: 'Parameter β', theta: 'Sudut', lambda: 'Panjang Gelombang (m)' },
        satuanHasil: 'm',
        namaVariabel: 'a',
        fungsiHitung: hitungPolaDifraksi,
        argKeys: ['beta', 'theta', 'lambda', null],
        target: 'a'
    },
    'theta-pola': {
        inputs: { beta: 'Parameter β', a: 'Lebar Celah (m)', lambda: 'Panjang Gelombang (m)' },
        satuanHasil: 'radian (rad)',
        namaVariabel: 'θ',
        fungsiHitung: hitungPolaDifraksi,
        argKeys: ['beta', 'a', 'lambda', null],
        target: 'theta'
    },
    'lambda-pola': {
        inputs: { beta: 'Parameter β', a: 'Lebar Celah (m)', theta: 'Sudut' },
        satuanHasil: 'm',
        namaVariabel: 'λ',
        fungsiHitung: hitungPolaDifraksi,
        argKeys: ['beta', 'a', 'theta', null],
        target: 'lambda'
    },

    
    'phi-mata': {
        inputs: { s_o: 'Jarak Benda (m)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'dioptri (1/m)',
        namaVariabel: 'Φ',
        fungsiHitung: hitungMata,
        argKeys: ['s_o', 's_i'],
        target: 'phi'
    },
    'f-mata': {
        inputs: { phi: 'Daya Lensa (1/m)' },
        satuanHasil: 'm',
        namaVariabel: 'f',
        fungsiHitung: hitungMata,
        argKeys: ['phi', null],
        target: 'f'
    },
    's-o-mata': {
        inputs: { phi: 'Daya Lensa (1/m)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_o',
        fungsiHitung: hitungMata,
        argKeys: ['phi', 's_i'],
        target: 's_o'
    },
    's-i-mata': {
        inputs: { phi: 'Daya Lensa (1/m)', s_o: 'Jarak Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_i',
        fungsiHitung: hitungMata,
        argKeys: ['phi', 's_o'],
        target: 's_i'
    },

    'M-mikroskop': {
        inputs: { L: 'Panjang Tabung (m)', f_o: 'Fokus Objektif (m)', f_e: 'Fokus Okuler (m)' },
        satuanHasil: 'unitless',
        namaVariabel: 'M',
        fungsiHitung: hitungMikroskop,
        argKeys: ['L', 'f_o', 'f_e'],
        target: 'M'
    },
    'L-mikroskop': {
        inputs: { M: 'Perbesaran (unitless)', f_o: 'Fokus Objektif (m)', f_e: 'Fokus Okuler (m)' },
        satuanHasil: 'm',
        namaVariabel: 'L',
        fungsiHitung: hitungMikroskop,
        argKeys: ['M', 'f_o', 'f_e'],
        target: 'L'
    },
    'f-o-mikroskop': {
        inputs: { M: 'Perbesaran (unitless)', L: 'Panjang Tabung (m)', f_e: 'Fokus Okuler (m)' },
        satuanHasil: 'm',
        namaVariabel: 'f_o',
        fungsiHitung: hitungMikroskop,
        argKeys: ['M', 'L', 'f_e'],
        target: 'f_o'
    },
    'f-e-mikroskop': {
        inputs: { M: 'Perbesaran (unitless)', L: 'Panjang Tabung (m)', f_o: 'Fokus Objektif (m)' },
        satuanHasil: 'm',
        namaVariabel: 'f_e',
        fungsiHitung: hitungMikroskop,
        argKeys: ['M', 'L', 'f_o'],
        target: 'f_e'
    },

    'M-teropong': {
        inputs: { f_obj: 'Fokus Objektif (m)', f_ok: 'Fokus Okuler (m)' },
        satuanHasil: 'unitless',
        namaVariabel: 'M',
        fungsiHitung: hitungTeropongBintang,
        argKeys: ['f_obj', 'f_ok'],
        target: 'M'
    },
    'f-obj-teropong': {
        inputs: { M: 'Perbesaran (unitless)', f_ok: 'Fokus Okuler (m)' },
        satuanHasil: 'm',
        namaVariabel: 'f_obj',
        fungsiHitung: hitungTeropongBintang,
        argKeys: ['M', 'f_ok'],
        target: 'f_obj'
    },
    'f-ok-teropong': {
        inputs: { M: 'Perbesaran (unitless)', f_obj: 'Fokus Objektif (m)' },
        satuanHasil: 'm',
        namaVariabel: 'f_ok',
        fungsiHitung: hitungTeropongBintang,
        argKeys: ['M', 'f_obj'],
        target: 'f_ok'
    },

    'f-number-kamera': {
        inputs: { f: 'Jarak Fokus (m)', D: 'Diameter Bukaan (m)' },
        satuanHasil: 'unitless',
        namaVariabel: 'f-number',
        fungsiHitung: hitungKamera,
        argKeys: ['f', 'D', null, null],
        target: 'f-number'
    },
    'f-kamera': {
        inputs: { f_number: 'F-Number (unitless)', D: 'Diameter Bukaan (m)' },
        satuanHasil: 'm',
        namaVariabel: 'f',
        fungsiHitung: hitungKamera,
        argKeys: ['f_number', 'D', null, null],
        target: 'f'
    },
    'D-kamera': {
        inputs: { f_number: 'F-Number (unitless)', f: 'Jarak Fokus (m)' },
        satuanHasil: 'm',
        namaVariabel: 'D',
        fungsiHitung: hitungKamera,
        argKeys: ['f_number', 'f', null, null],
        target: 'D'
    },
    's-i-kamera': {
        inputs: { f: 'Jarak Fokus (m)', s_o: 'Jarak Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_i',
        fungsiHitung: hitungKamera,
        argKeys: ['f', null, 's_o', null],
        target: 's_i'
    },
    's-o-kamera': {
        inputs: { f: 'Jarak Fokus (m)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_o',
        fungsiHitung: hitungKamera,
        argKeys: ['f', null, null, 's_i'],
        target: 's_o'
    },

    'M-lup': {
        inputs: { f: 'Jarak Fokus (m)' },
        satuanHasil: 'unitless',
        namaVariabel: 'M',
        fungsiHitung: hitungLup,
        argKeys: ['f'],
        target: 'M'
    },
    'f-lup': {
        inputs: { M: 'Perbesaran (unitless)' },
        satuanHasil: 'm',
        namaVariabel: 'f',
        fungsiHitung: hitungLup,
        argKeys: ['M'],
        target: 'f'
    },

    
    
    
    'M-alat-optik': {
        inputs: { 
            tipe: 'Tipe Alat (mikroskop/teropong/lup)', 
            L: 'Panjang Tabung (m, optional)', 
            f_o: 'Fokus Objektif (m, optional)', 
            f_e: 'Fokus Okuler (m, optional)', 
            f: 'Fokus Lup (m, optional)' 
        },
        satuanHasil: 'unitless',
        namaVariabel: 'M',
        fungsiHitung: hitungPembesaranAlatOptik,
        argKeys: ['tipe', 'L', 'f_o', 'f_e', 'f'],
        target: 'M'
    },

    
    'f-lensa-cembung': {
        inputs: { s_o: 'Jarak Benda (m)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm (positif)',
        namaVariabel: 'f (cembung)',
        fungsiHitung: hitungPersamaanLensa,
        argKeys: ['s_o', 's_i'],
        target: 'f'
    },
    's-o-lensa-cembung': {
        inputs: { f: 'Jarak Fokus (m, positif)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_o',
        fungsiHitung: hitungPersamaanLensa,
        argKeys: ['f', 's_i'],
        target: 's_o'
    },
    's-i-lensa-cembung': {
        inputs: { f: 'Jarak Fokus (m, positif)', s_o: 'Jarak Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_i',
        fungsiHitung: hitungPersamaanLensa,
        argKeys: ['f', 's_o'],
        target: 's_i'
    },

    
    'f-lensa-cekung': {
        inputs: { s_o: 'Jarak Benda (m)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm (negatif)',
        namaVariabel: 'f (cekung)',
        fungsiHitung: hitungPersamaanLensa,
        argKeys: ['s_o', 's_i'],
        target: 'f'
    },
    's-o-lensa-cekung': {
        inputs: { f: 'Jarak Fokus (m, negatif)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_o',
        fungsiHitung: hitungPersamaanLensa,
        argKeys: ['f', 's_i'],
        target: 's_o'
    },
    's-i-lensa-cekung': {
        inputs: { f: 'Jarak Fokus (m, negatif)', s_o: 'Jarak Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_i',
        fungsiHitung: hitungPersamaanLensa,
        argKeys: ['f', 's_o'],
        target: 's_i'
    },

    
    's-i-cermin-lengkung': {
        inputs: { f: 'Jarak Fokus (m)', s_o: 'Jarak Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_i (lengkung)',
        fungsiHitung: hitungCerminLengkung,
        argKeys: ['f', 's_o', null, null],
        target: 's_i'
    },
    's-o-cermin-lengkung': {
        inputs: { f: 'Jarak Fokus (m)', s_i: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 's_o (lengkung)',
        fungsiHitung: hitungCerminLengkung,
        argKeys: ['f', null, 's_i', null],
        target: 's_o'
    },

    
    's-prime-cermin-datar': {
        inputs: { s: 'Jarak Benda (m)' },
        satuanHasil: 'm (maya, negatif)',
        namaVariabel: 's\' (datar)',
        fungsiHitung: hitungCerminDatar,
        argKeys: ['s'],
        target: 's-prime'
    },
    's-cermin-datar': {
        inputs: { s_prime: 'Jarak Bayangan (m)' },
        satuanHasil: 'm',
        namaVariabel: 's (datar)',
        fungsiHitung: hitungCerminDatar,
        argKeys: ['s_prime'],
        target: 's'
    },

    
    'delta-y-jarak-interferensi': {
        inputs: { lambda: 'Panjang Gelombang (m)', D: 'Jarak ke Layar (m)', d: 'Jarak Celah (m)' },
        satuanHasil: 'm',
        namaVariabel: 'Δy (interferensi)',
        fungsiHitung: hitungJarakGarisInterferensi,
        argKeys: ['lambda', 'D', 'd'],
        target: 'delta-y'
    },
    'lambda-jarak-interferensi': {
        inputs: { delta_y: 'Jarak Garis (m)', D: 'Jarak ke Layar (m)', d: 'Jarak Celah (m)' },
        satuanHasil: 'm',
        namaVariabel: 'λ (interferensi)',
        fungsiHitung: hitungJarakGarisInterferensi,
        argKeys: ['delta_y', 'D', 'd'],
        target: 'lambda'
    },

    
    'm-perbesaran-optik': {
        inputs: { s_i: 'Jarak Bayangan (m)', s_o: 'Jarak Benda (m)' },
        satuanHasil: 'unitless',
        namaVariabel: 'm (optik)',
        fungsiHitung: hitungPerbesaran,
        argKeys: ['s_i', 's_o', null, null],
        target: 'm'
    },
    'h-i-perbesaran-optik': {
        inputs: { m: 'Perbesaran (unitless)', h_o: 'Tinggi Benda (m)' },
        satuanHasil: 'm',
        namaVariabel: 'h_i (optik)',
        fungsiHitung: hitungPerbesaran,
        argKeys: ['m', null, 'h_o', null],
        target: 'h_i'
    },

    
    'f-frekuensi-cahaya': {
        inputs: { lambda: 'Panjang Gelombang (m)', n: 'Indeks Bias (optional, default 1)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f (cahaya)',
        fungsiHitung: hitungPanjangGelombangCahaya,
        argKeys: ['lambda', 'n'],
        target: 'f'
    },

    
    'lambda-panjang-cahaya': {
        inputs: { f: 'Frekuensi (Hz)', n: 'Indeks Bias (optional, default 1)' },
        satuanHasil: 'm',
        namaVariabel: 'λ (cahaya)',
        fungsiHitung: hitungPanjangGelombangCahaya,
        argKeys: ['f', 'n'],
        target: 'lambda'
    },

    
    'c-kecepatan-cahaya': {
        inputs: {},
        satuanHasil: 'm/s',
        namaVariabel: 'c (cahaya)',
        fungsiHitung: () => c,
        argKeys: [],
        target: null
    },

    
    'delta-l-interferensi-bunyi': {
        inputs: { m: 'Orde (m)', lambda: 'Panjang Gelombang (m)', tipe: 'Tipe (konstruktif/destruktif)' },
        satuanHasil: 'm',
        namaVariabel: 'Δl (bunyi)',
        fungsiHitung: hitungInterferensiBunyi,
        argKeys: ['m', 'lambda', 'tipe'],
        target: 'delta-l'
    },
    'lambda-interferensi-bunyi': {
        inputs: { delta_l: 'Selisih Jalur (m)', m: 'Orde (m)', tipe: 'Tipe (konstruktif/destruktif)' },
        satuanHasil: 'm',
        namaVariabel: 'λ (bunyi)',
        fungsiHitung: hitungInterferensiBunyi,
        argKeys: ['m', 'delta_l', 'tipe'],
        target: 'lambda'
    },

    
    'f-frekuensi-resonansi': {
        inputs: { n: 'Harmonik (n)', v: 'Kecepatan (m/s)', L: 'Panjang (m)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f_n (resonansi)',
        fungsiHitung: hitungFrekuensiResonansi,
        argKeys: ['n', 'v', 'L'],
        target: 'f'
    },

    
    'f-resonansi-tabung-udara': {
        inputs: { n: 'Harmonik (n)', v: 'Kecepatan (m/s)', L: 'Panjang (m)', tipe: 'Tipe (terbuka/tertutup)' },
        satuanHasil: 'Hz',
        namaVariabel: 'f_n (tabung udara)',
        fungsiHitung: hitungResonansiTabung,
        argKeys: ['n', 'v', 'L', 'tipe'],
        target: 'f'
    },
    'L-resonansi-tabung-udara': {
        inputs: { f: 'Frekuensi (Hz)', v: 'Kecepatan (m/s)', n: 'Harmonik (n)', tipe: 'Tipe (terbuka/tertutup)' },
        satuanHasil: 'm',
        namaVariabel: 'L (tabung udara)',
        fungsiHitung: hitungResonansiTabung,
        argKeys: ['n', 'v', 'f', 'tipe'],
        target: 'L'
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
        case 'persamaan-gelombang':
            return {
                'y-gelombang': 'Posisi Gelombang y(x,t)',
                'A-gelombang': 'Amplitudo (A)', 
                'k-gelombang': 'Bilangan Gelombang (k)',
                'omega-gelombang': 'Frekuensi Sudut (ω)'
            };
        case 'kecepatan-gelombang':
            return {
                'v-gelombang': 'Kecepatan Gelombang (v)',
                'lambda-gelombang': 'Panjang Gelombang (λ)',
                'f-gelombang': 'Frekuensi (f)'
            };
        case 'frekuensi':
            return {
                'f-frekuensi': 'Frekuensi (f)',
                'T-frekuensi': 'Periode (T)',
                'omega-frekuensi': 'Frekuensi Sudut (ω)'
            };
        case 'periode':
            return {
                'T-periode': 'Periode (T)',
                'f-periode': 'Frekuensi (f)'
            };
        case 'panjang-gelombang':
            return {
                'lambda-panjang': 'Panjang Gelombang (λ)',
                'v-panjang': 'Kecepatan (v)',
                'f-panjang': 'Frekuensi (f)'
            };
        case 'energi-tali':
            return {
                'E-tali': 'Energi per Panjang (E/L)',
                'mu-tali': 'Densitas Linear (μ)',
                'omega-tali': 'Frekuensi Sudut (ω)',
                'A-tali': 'Amplitudo (A)'
            };
        case 'intensitas':
            return {
                'I-intensitas': 'Intensitas (I)',
                'P-intensitas': 'Daya (P)',
                'A-intensitas': 'Luas (A)'
            };
        case 'daya':
            return {
                'P-daya': 'Daya (P)',
                'I-daya': 'Intensitas (I)',
                'A-daya': 'Luas (A)'
            };
        case 'amplitudo':
            return {
                'A-gelombang': 'Amplitudo Gelombang (A)',
                'A-tali': 'Amplitudo Tali (A)'
            };
        case 'energi-gelombang':
            return {
                'E-tali': 'Energi per Panjang (E/L)'
            };
        case 'intensitas-gelombang':
            return {
                'I-intensitas': 'Intensitas (I)'
            };
        case 'daya-gelombang':
            return {
                'P-daya': 'Daya (P)'
            };
        case 'kecepatan-suara':
            return {
                'v-suara': 'Kecepatan Suara (v)',
                'T-suara': 'Suhu (T)',
                'v-ideal': 'Kecepatan Ideal (v)'
            };
        case 'taraf-intensitas':
            return {
                'beta-dB': 'Taraf Intensitas (β)',
                'I-dB': 'Intensitas (I)'
            };
        case 'resonansi-tabung-udara':
            return {
                'f-tabung-terbuka': 'Frekuensi Tabung Terbuka (f_n)',
                'f-tabung-tertutup': 'Frekuensi Tabung Tertutup (f_n)',
                'L-tabung': 'Panjang Tabung (L)',
                'v-tabung': 'Kecepatan (v)',
                'n-tabung': 'Harmonik (n)',
                'f-resonansi-tabung-udara': 'Frekuensi Resonansi Tabung Udara (f_n)',
                'L-resonansi-tabung-udara': 'Panjang Resonansi Tabung Udara (L)'
            };
        case 'frekuensi-resonansi':
            return {
                'f-frekuensi-resonansi': 'Frekuensi Resonansi (f_n)',
                'L-resonansi': 'Panjang (L)',
                'v-resonansi': 'Kecepatan (v)'
            };
        case 'efek-doppler':
            return {
                'f-doppler': 'Frekuensi Diamati (f\' )',
                'f-sumber': 'Frekuensi Sumber (f)',
                'v-medium-doppler': 'Kecepatan Medium (v)',
                'v-pengamat': 'Kecepatan Pengamat (v_o)',
                'v-sumber': 'Kecepatan Sumber (v_s)'
            };
        case 'interferensi-bunyi':
            return {
                'delta-l-konstruktif': 'Selisih Jalur Konstruktif (Δl)',
                'delta-l-destruktif': 'Selisih Jalur Destruktif (Δl)',
                'lambda-interferensi-bunyi': 'Panjang Gelombang (λ)',
                'm-interferensi': 'Orde (m)',
                'delta-l-interferensi-bunyi': 'Selisih Jalur Bunyi (Δl)'
            };
        case 'pembentukan-beat':
            return {
                'f-beat': 'Frekuensi Beat (f_beat)',
                'f1-beat': 'Frekuensi 1 (f1)',
                'f2-beat': 'Frekuensi 2 (f2)'
            };
        case 'sifat-cahaya-medium':
            return {
                'lambda-cahaya': 'Panjang Gelombang (λ)',
                'f-cahaya': 'Frekuensi (f)',
                'n-cahaya': 'Indeks Bias (n)',
                'lambda-panjang-cahaya': 'Panjang Gelombang Cahaya (λ)',
                'f-frekuensi-cahaya': 'Frekuensi Cahaya (f)',
                'c-kecepatan-cahaya': 'Kecepatan Cahaya (c)'
            };
        case 'energi-foton':
            return {
                'E-foton': 'Energi Foton (E)',
                'f-foton': 'Frekuensi (f)',
                'lambda-foton': 'Panjang Gelombang (λ)'
            };
        case 'indeks-bias':
            return {
                'n-bias': 'Indeks Bias (n)',
                'v-medium': 'Kecepatan di Medium (v)'
            };
        case 'pembiasan':
            return {
                'theta2-pembiasan': 'Sudut Bias (θ₂)',
                'n1-pembiasan': 'Indeks 1 (n₁)',
                'theta1-pembiasan': 'Sudut Datang (θ₁)',
                'n2-pembiasan': 'Indeks 2 (n₂)'
            };
        case 'pemantulan':
            return {
                'theta-r-pemantulan': 'Sudut Pantul (θ_r)',
                'theta-i-pemantulan': 'Sudut Datang (θ_i)'
            };
        case 'sudut-kritis':
            return {
                'theta-c-kritis': 'Sudut Kritis (θ_c)',
                'n1-kritis': 'Indeks 1 (n₁)',
                'n2-kritis': 'Indeks 2 (n₂)'
            };
        case 'total-internal-reflection':
            return {
                'total-reflection': 'Total Internal Reflection'
            };
        case 'cermin-datar':
            return {
                's-prime-cermin-datar': 'Jarak Bayangan (s\' )',
                's-cermin-datar': 'Jarak Benda (s)'
            };
        case 'cermin-lengkung':
            return {
                'f-cermin': 'Jarak Fokus (f)',
                'R-cermin': 'Radius Kelengkungan (R)',
                's-i-cermin-lengkung': 'Jarak Bayangan (s_i)',
                's-o-cermin-lengkung': 'Jarak Benda (s_o)'
            };
        case 'lensa-cembung':
            return {
                'f-lensa-cembung': 'Jarak Fokus (f, positif)',
                's-o-lensa-cembung': 'Jarak Benda (s_o)',
                's-i-lensa-cembung': 'Jarak Bayangan (s_i)'
            };
        case 'lensa-cekung':
            return {
                'f-lensa-cekung': 'Jarak Fokus (f, negatif)',
                's-o-lensa-cekung': 'Jarak Benda (s_o)',
                's-i-lensa-cekung': 'Jarak Bayangan (s_i)'
            };
        case 'perbesaran-optik':
            return {
                'm-perbesaran-optik': 'Perbesaran (m)',
                'h-i-perbesaran-optik': 'Tinggi Bayangan (h_i)',
                'h-o-perbesaran': 'Tinggi Benda (h_o)',
                's-i-perbesaran': 'Jarak Bayangan (s_i)',
                's-o-perbesaran': 'Jarak Benda (s_o)'
            };
        case 'jarak-garis-interferensi':
            return {
                'delta-y-jarak-interferensi': 'Jarak Garis Interferensi (Δy)',
                'lambda-jarak-interferensi': 'Panjang Gelombang (λ)',
                'D-inter': 'Jarak ke Layar (D)',
                'd-inter': 'Jarak Celah (d)'
            };
        case 'interferensi-cahaya':
            return {
                'theta-interferensi': 'Sudut (θ)',
                'd-interferensi': 'Jarak Celah (d)',
                'lambda-inter-cahaya': 'Panjang Gelombang (λ)',
                'm-inter-cahaya': 'Orde (m)'
            };
        case 'difraksi-celah-tunggal':
            return {
                'theta-difraksi': 'Sudut (θ)',
                'a-difraksi': 'Lebar Celah (a)',
                'lambda-difraksi': 'Panjang Gelombang (λ)',
                'm-difraksi': 'Orde (m, non-zero)'
            };
        case 'difraksi-celah-ganda':
            return {
                'theta-ganda': 'Sudut (θ)',
                'd-ganda': 'Jarak Celah (d)',
                'lambda-ganda': 'Panjang Gelombang (λ)',
                'm-ganda': 'Orde (m)'
            };
        case 'pola-difraksi':
            return {
                'I-pola': 'Intensitas Relatif (I)',
                'beta-pola': 'Parameter β',
                'a-pola': 'Lebar Celah (a)',
                'theta-pola': 'Sudut (θ)',
                'lambda-pola': 'Panjang Gelombang (λ)'
            };
        case 'mata':
            return {
                'phi-mata': 'Daya Lensa (Φ)',
                'f-mata': 'Jarak Fokus (f)',
                's-o-mata': 'Jarak Benda (s_o)',
                's-i-mata': 'Jarak Bayangan (s_i)'
            };
        case 'mikroskop':
            return {
                'M-mikroskop': 'Perbesaran (M)',
                'L-mikroskop': 'Panjang Tabung (L)',
                'f-o-mikroskop': 'Fokus Objektif (f_o)',
                'f-e-mikroskop': 'Fokus Okuler (f_e)'
            };
        case 'teropong':
            return {
                'M-teropong': 'Perbesaran (M)',
                'f-obj-teropong': 'Fokus Objektif (f_obj)',
                'f-ok-teropong': 'Fokus Okuler (f_ok)'
            };
        case 'kamera':
            return {
                'f-number-kamera': 'F-Number',
                'f-kamera': 'Jarak Fokus (f)',
                'D-kamera': 'Diameter Bukaan (D)',
                's-i-kamera': 'Jarak Bayangan (s_i)',
                's-o-kamera': 'Jarak Benda (s_o)'
            };
        case 'lup':
            return {
                'M-lup': 'Perbesaran (M)',
                'f-lup': 'Jarak Fokus (f)'
            };
        case 'pembesaran-alat-optik':
            return {
                'M-alat-optik': 'Perbesaran Alat Optik (M)'
            };
        default:
            return {};
    }
}


function buatFormKalkulasi(topik) {
    const parameter = document.getElementById('pilih-parameter').value;
    if (!parameter) return;

    const config = KALKULATOR_CONFIG[parameter];
    if (!config) return;

    const formDiv = document.getElementById('form-kalkulasi');
    formDiv.innerHTML = '';

    const form = document.createElement('form');
    form.id = 'kalkulator-form';

    
    Object.entries(config.inputs).forEach(([key, label]) => {
        const div = document.createElement('div');
        div.style.marginBottom = '10px';

        const labelEl = document.createElement('label');
        labelEl.textContent = `${label}: `;
        labelEl.setAttribute('for', key);

        const input = document.createElement('input');
        input.type = 'number';
        input.id = key;
        input.name = key;
        input.step = 'any';
        input.required = true;

        
        if (ANGLE_KEYS.includes(key)) {
            const unitSelect = document.createElement('select');
            unitSelect.id = `${key}-unit`;
            unitSelect.name = `${key}-unit`;
            const options = [
                {value: 'rad', text: 'Radian (rad)'},
                {value: 'deg', text: 'Derajat (°)'}
            ];
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.text;
                unitSelect.appendChild(option);
            });
            unitSelect.onchange = () => konversiSudut(key, unitSelect.value);
            div.appendChild(unitSelect);
        }

        div.appendChild(labelEl);
        div.appendChild(input);
        form.appendChild(div);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Hitung';
    form.appendChild(submitBtn);

    form.onsubmit = (e) => {
        e.preventDefault();
        prosesKalkulasi(parameter);
    };

    formDiv.appendChild(form);
}


function prosesKalkulasi(parameter) {
    const config = KALKULATOR_CONFIG[parameter];
    const form = document.getElementById('kalkulator-form');
    const nilaiInput = {};
    let valid = true;

    
    Object.keys(config.inputs).forEach(key => {
        const input = document.getElementById(key);
        const value = parseFloat(input.value);
        if (isNaN(value)) {
            valid = false;
            return;
        }
        
        if (ANGLE_KEYS.includes(key)) {
            const unitSelect = document.getElementById(`${key}-unit`);
            if (unitSelect && unitSelect.value === 'deg') {
                nilaiInput[key] = value * (Math.PI / 180);
            } else {
                nilaiInput[key] = value;
            }
        } else {
            nilaiInput[key] = value;
        }
    });

    if (!valid) {
        alert('Mohon isi semua field dengan angka yang valid.');
        return;
    }

    const hasilDiv = document.getElementById('hasil-kalkulasi');

    try {
        
        const args = config.argKeys.map(key => {
            
            return key === null ? null : nilaiInput[key];
        });

        
        if (config.target !== null && config.target !== undefined) {
            args.push(config.target);
        }
        
        
        const hasilNumerik = config.fungsiHitung.apply(null, args);
        
        
        if (typeof hasilNumerik === 'string' && hasilNumerik.toLowerCase().startsWith('error:')) {
            throw new Error(hasilNumerik.replace('Error: ', ''));
        }
        
        let formatted_fx;
        
        if (typeof hasilNumerik === 'boolean' || (typeof hasilNumerik === 'string')) {
             
            formatted_fx = hasilNumerik.toString();
        }
        else if (!isFinite(hasilNumerik)) {
            throw new Error('Hasil perhitungan tidak valid (NaN atau Infinity). Periksa kembali input Anda dan pastikan tidak ada pembagian dengan nol.');
        } else {
             
            if (Math.abs(hasilNumerik) > 1e6 || (Math.abs(hasilNumerik) !== 0 && Math.abs(hasilNumerik) < 1e-4)) {
                formatted_fx = hasilNumerik.toPrecision(6);
            } else {
                if (hasilNumerik === 0) {
                     formatted_fx = "0";
                } else {
                    
                    if (config.satuanHasil.includes("orde") || config.satuanHasil.includes("bilangan bulat")) {
                        formatted_fx = Math.round(hasilNumerik).toString();
                    } else {
                        formatted_fx = hasilNumerik.toFixed(6).replace(/\.?0+$/, '');
                        if (formatted_fx === "" || formatted_fx === ".") formatted_fx = "0";
                    }
                }
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

        
        
        form.reset();
        
        document.querySelectorAll('select[id$="-unit"]').forEach(select => {
            select.selectedIndex = 0; 
        });

    } catch (e) {
        hasilDiv.classList.add('error');
        hasilDiv.innerHTML = `<h3>⚠️ Error Perhitungan!</h3><p>Terjadi kesalahan saat memproses data:</p>
            <p style="font-weight: bold;">${e.message}</p>
            <p>Pastikan semua variabel sudah terisi dengan angka yang valid dan sesuai dengan konteks rumus yang dipilih (misal: 'n' ganjil untuk tabung tertutup, 'm' non-zero untuk difraksi, dll).</p>`;
    }
}


function handleEnterKey(event) {
    if (event.key === 'Enter') {
        const target = event.target;
        const form = document.getElementById('kalkulator-form');
        if (!form) return;

        
        if (target.tagName.toLowerCase() === 'select') {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
            return;
        }

        
        if (target.tagName.toLowerCase() === 'input' && target.type === 'number') {
            event.preventDefault(); 

            
            const value = target.value.trim();
            if (value === '' || isNaN(parseFloat(value))) {
                
                return;
            }

            
            const inputs = Array.from(form.querySelectorAll('input[type="number"]'));
            const currentIndex = inputs.indexOf(target);

            if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
                
                const nextInput = inputs[currentIndex + 1];
                nextInput.focus();
                nextInput.select(); 
            } else if (currentIndex === inputs.length - 1) {
                
                form.dispatchEvent(new Event('submit'));
            }
            
        } else {
            
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    }
}


function konversiSudut(key, unit) {
    const input = document.getElementById(key);
    const value = parseFloat(input.value);
    if (isNaN(value)) return;

    if (unit === 'deg') {
        input.value = value * (180 / Math.PI); 
    } else {
        input.value = value * (Math.PI / 180); 
    }
}



function hitungPersamaanGelombang(val1, val2, val3, val4, val5, val6, target) {
    if (target === "y") { 
        return val1 * Math.sin(val2 * val3 - val4 * val5 + val6);
    }
    if (target === "A") { 
        const sinVal = Math.sin(val2 * val3 - val4 * val5 + val6);
        if (sinVal === 0) throw new Error('Posisi 0 (y=0) pada (kx - ωt + φ) = nπ, Amplitudo tidak dapat ditentukan.');
        return val1 / sinVal; 
    }
    if (target === "k") { 
        if (val1 === 0) throw new Error('Panjang gelombang (λ) tidak boleh nol.');
        return 2 * Math.PI / val1;
    }
    if (target === "omega") { 
        return 2 * Math.PI * val1;
    }
    throw new Error('Target Persamaan Gelombang tidak valid');
}

function hitungKecepatanGelombang(val1, val2, target) {
    if (target === "v") return val1 * val2; 
    if (target === "lambda") { 
        if (val2 === 0) throw new Error('Frekuensi (f) tidak boleh nol.');
        return val1 / val2;
    }
    if (target === "f") { 
        if (val2 === 0) throw new Error('Panjang gelombang (λ) tidak boleh nol.');
        return val1 / val2;
    }
    throw new Error('Target Kecepatan Gelombang tidak valid');
}

function hitungFrekuensi(val1, val2, target) {
    if (target === "f") { 
        if (val1 === 0) throw new Error('Periode (T) tidak boleh nol.');
        return 1 / val1;
    }
    if (target === "T") { 
        if (val1 === 0) throw new Error('Frekuensi (f) tidak boleh nol.');
        return 1 / val1;
    }
    if (target === "omega") { 
        return 2 * Math.PI * val1;
    }
    throw new Error('Target Frekuensi tidak valid');
}

function hitungPeriode(val1, target) {
    if (target === "T") { 
        if (val1 === 0) throw new Error('Frekuensi (f) tidak boleh nol.');
        return 1 / val1;
    }
    if (target === "f") { 
        if (val1 === 0) throw new Error('Periode (T) tidak boleh nol.');
        return 1 / val1;
    }
    throw new Error('Target Periode tidak valid');
}

function hitungPanjangGelombang(val1, val2, target) {
    if (target === "lambda") { 
        if (val2 === 0) throw new Error('Frekuensi (f) tidak boleh nol.');
        return val1 / val2;
    }
    if (target === "v") return val1 * val2; 
    if (target === "f") { 
        if (val2 === 0) throw new Error('Panjang gelombang (λ) tidak boleh nol.');
        return val1 / val2;
    }
    throw new Error('Target Panjang Gelombang tidak valid');
}

function hitungEnergiGelombang(val1, val2, val3, target) {
    if (target === "E") { 
        return 0.5 * val1 * val2 * val2 * val3 * val3;
    }
    const denom_mu = val2 * val2 * val3 * val3;
    if (target === "mu") { 
        if (denom_mu === 0) throw new Error('omega dan A tidak boleh nol.');
        return 2 * val1 / denom_mu;
    }
    const denom_omega = val2 * val3 * val3;
    if (target === "omega") { 
        if (denom_omega <= 0) throw new Error('mu dan A^2 harus positif.');
        return Math.sqrt(2 * val1 / denom_omega);
    }
    const denom_A = val2 * val3 * val3; 
    if (target === "A") { 
        if (denom_A <= 0) throw new Error('mu dan omega^2 harus positif.');
        return Math.sqrt(2 * val1 / denom_A);
    }
    throw new Error('Target Energi Gelombang tidak valid');
}

function hitungIntensitasGelombang(val1, val2, target) {
    if (target === "I") { 
        if (val2 === 0) throw new Error('Luas (A) tidak boleh nol.');
        return val1 / val2;
    }
    if (target === "P") return val1 * val2; 
    if (target === "A") { 
        if (val2 === 0) throw new Error('Intensitas (I) tidak boleh nol.');
        return val1 / val2;
    }
    throw new Error('Target Intensitas Gelombang tidak valid');
}

function hitungDayaGelombang(val1, val2, target) {
    
    if (target === "P") return val1 * val2; 
    if (target === "I") { 
        if (val2 === 0) throw new Error('Luas (A) tidak boleh nol.');
        return val1 / val2;
    }
    if (target === "A") { 
        if (val2 === 0) throw new Error('Intensitas (I) tidak boleh nol.');
        return val1 / val2;
    }
    throw new Error('Target Daya Gelombang tidak valid');
}


function hitungKecepatanSuara(val1, val2, target) {
    if (target === "v") { 
        return v0_air + temp_factor * val1;
    }
    if (target === "T") { 
        return (val1 - v0_air) / temp_factor;
    }
    if (target === "v-ideal") { 
        if (M_air === 0) throw new Error('Massa molar tidak boleh nol.');
        if (val2 < 0) throw new Error('Suhu (K) harus positif.');
        return Math.sqrt(gamma_gas * R_gas * val2 / M_air);
    }
    throw new Error('Target Kecepatan Suara tidak valid');
}

function hitungTarafIntensitas(val1, target) {
    if (target === "beta") { 
        if (val1 <= 0) throw new Error('Intensitas (I) harus positif.');
        return 10 * Math.log10(val1 / I0);
    }
    if (target === "I") { 
        return I0 * Math.pow(10, val1 / 10);
    }
    throw new Error('Target Taraf Intensitas tidak valid');
}

function hitungResonansiTabung(val1, val2, val3, val4, target) {
    if (target === "f") { 
        const n = val1, v = val2, L = val3, tipe = val4;
        if (L === 0) throw new Error('Panjang (L) tidak boleh nol.');
        if (tipe === "terbuka") return n * v / (2 * L);
        if (tipe === "tertutup") {
             if (n % 2 === 0) throw new Error('Harmonik (n) harus ganjil untuk tabung tertutup.');
             return n * v / (4 * L);
        }
    }
    if (target === "L") { 
        const n = val1, v = val2, f = val3, tipe = val4;
        if (f === 0) throw new Error('Frekuensi (f) tidak boleh nol.');
        if (tipe === "terbuka") return n * v / (2 * f);
        if (tipe === "tertutup") {
            if (n % 2 === 0) throw new Error('Harmonik (n) harus ganjil untuk tabung tertutup.');
            return n * v / (4 * f);
        }
    }
    if (target === "v") { 
        const n = val1, L = val2, f = val3, tipe = val4;
        if (n === 0) throw new Error('Harmonik (n) tidak boleh nol.');
        if (tipe === "terbuka") return f * 2 * L / n;
        if (tipe === "tertutup") return f * 4 * L / n;
    }
    if (target === "n") { 
        const f = val1, v = val2, L = val3, tipe = val4;
        if (v === 0) throw new Error('Kecepatan (v) tidak boleh nol.');
        let n_calc;
        if (tipe === "terbuka") n_calc = (f * 2 * L) / v;
        if (tipe === "tertutup") n_calc = (f * 4 * L) / v;
        
        const n_round = Math.round(n_calc);
        if (Math.abs(n_calc - n_round) > 1e-6) {
             return `Error: Kombinasi input tidak menghasilkan n bilangan bulat (hasil: ${n_calc.toFixed(3)}).`;
        }
        if (tipe === "tertutup" && n_round % 2 === 0) {
             return `Error: Hasil n (${n_round}) genap, tidak valid untuk tabung tertutup.`;
        }
        return n_round;
    }
    throw new Error('Target Resonansi Tabung tidak valid');
}

function hitungFrekuensiResonansi(val1, val2, val3, target) { 
    
    if (target === "f") {
        if (val3 === 0) throw new Error('Panjang (L) tidak boleh nol.');
        return val1 * val2 / (2 * val3);
    }
    
    if (target === "L") {
        if (val3 === 0) throw new Error('Frekuensi (f) tidak boleh nol.');
        return val1 * val2 / (2 * val3);
    }
    
    if (target === "v") {
        if (val1 === 0) throw new Error('Harmonik (n) tidak boleh nol.');
        return 2 * val2 * val3 / val1;
    }
    
    throw new Error('Target Frekuensi Resonansi tidak valid');
}

function hitungEfekDoppler(val1, val2, val3, val4, target) {
    
    
    
    
    
    if (target === "f-prime") {
        const f = val1, v = val2, vo = val3, vs = val4;
        const denom = (v - vs); 
        if (denom === 0) throw new Error('Kecepatan medium dan sumber tidak boleh sama (v = vs).');
        return f * (v + vo) / denom; 
    }
    
    
    if (target === "f-sumber") {
         
         const f_prime = val1, v = val2, vo = val3, vs = val4;
         const numer = v + vo;
         if (numer === 0) throw new Error('Kecepatan medium dan pengamat tidak boleh saling meniadakan (v = -vo).');
         return f_prime * (v - vs) / numer;
    }
    if (target === "v-medium") {
        
        const f_prime = val1, f = val2, vo = val3, vs = val4;
        
        
        const denom = f_prime - f;
        if (denom === 0) throw new Error('Frekuensi sumber dan pengamat tidak boleh sama (f\' = f), kecuali vo dan vs = 0.');
        return (f_prime * vs + f * vo) / denom;
    }
    if (target === "v-pengamat") {
        
        const f_prime = val1, f = val2, v = val3, vs = val4;
        if (f === 0) throw new Error('Frekuensi sumber (f) tidak boleh nol.');
        
        return (f_prime * (v - vs) / f) - v;
    }
    if (target === "v-sumber") {
         
        const f_prime = val1, f = val2, v = val3, vo = val4;
        if (f_prime === 0) throw new Error('Frekuensi diamati (f\') tidak boleh nol.');
        
        return v - (f * (v + vo) / f_prime);
    }
    
    throw new Error('Target Efek Doppler tidak valid');
}

function hitungInterferensiBunyi(val1, val2, val3, target) {
    if (target === "delta-l") { 
        if (val3 === "konstruktif") return val1 * val2;
        if (val3 === "destruktif") return (val1 + 0.5) * val2;
    }
    if (target === "lambda") { 
        if (val3 === "konstruktif") {
            if (val1 === 0) throw new Error('Orde (m) tidak boleh nol untuk konstruktif (selain pusat).');
            return val2 / val1;
        }
        if (val3 === "destruktif") {
            if (val1 + 0.5 === 0) throw new Error('Input tidak valid.');
            return val2 / (val1 + 0.5);
        }
    }
    if (target === "m") { 
        if (val2 === 0) throw new Error('Panjang gelombang (λ) tidak boleh nol.');
        let m_calc;
        if (val3 === "konstruktif") m_calc = val1 / val2;
        if (val3 === "destruktif") m_calc = (val1 / val2) - 0.5;
        
        const m_round = Math.round(m_calc);
         if (Math.abs(m_calc - m_round) > 1e-6) {
             return `Error: Kombinasi input tidak menghasilkan m bilangan bulat (hasil: ${m_calc.toFixed(3)}).`;
        }
        return m_round;
    }
    throw new Error('Target Interferensi Bunyi tidak valid');
}

function hitungPembentukanBeat(val1, val2, target) {
    if (target === "f-beat") return Math.abs(val1 - val2); 
    if (target === "f1") return val2 + val1; 
    if (target === "f2") return val2 - val1; 
    throw new Error('Target Pembentukan Beat tidak valid');
}


function hitungPanjangGelombangCahaya(val1, val2, target) {
    const n = val2 || 1; 
    if (n === 0) throw new Error("Indeks bias (n) tidak boleh nol.");
    const v = c / n;
    
    if (target === "lambda") { 
        if (val1 === 0) throw new Error('Frekuensi (f) tidak boleh nol.');
        return v / val1;
    }
    if (target === "f") { 
        if (val1 === 0) throw new Error('Panjang gelombang (λ) tidak boleh nol.');
        return v / val1;
    }
    if (target === "n") { 
        if (val1 === 0 || val2 === 0) throw new Error('f dan λ tidak boleh nol.');
        return c / (val1 * val2); 
    }
    throw new Error('Target Sifat Cahaya Medium tidak valid');
}

function hitungEnergiFoton(val1, val2, target) {
    if (target === "E") { 
        return h * val1;
    }
    if (target === "f") { 
        if (h === 0) throw new Error('Konstanta Planck tidak boleh nol.');
        return val1 / h;
    }
    if (target === "lambda") { 
        if (val1 === 0) throw new Error('Energi (E) tidak boleh nol.');
        return h * c / val1;
    }
    throw new Error('Target Energi Foton tidak valid');
}

function hitungIndeksBias(val1, target) {
    if (target === "n") { 
        if (val1 === 0) throw new Error('Kecepatan (v) tidak boleh nol.');
        return c / val1;
    }
    if (target === "v") { 
        if (val1 === 0) throw new Error('Indeks bias (n) tidak boleh nol.');
        return c / val1;
    }
    throw new Error('Target Indeks Bias tidak valid');
}

function hitungPembiasan(val1, val2, val3, target) {
    
    if (target === "theta2") { 
        if (val3 === 0) throw new Error('Indeks 2 (n₂) tidak boleh nol.');
        const sinVal = (val1 * Math.sin(val2)) / val3;
        if (sinVal > 1 || sinVal < -1) return "Error: Total Internal Reflection terjadi atau input tidak valid (sin > 1).";
        return Math.asin(sinVal);
    }
    if (target === "n1") { 
        const sinTheta1 = Math.sin(val1);
        if (sinTheta1 === 0) throw new Error('Sudut datang (θ₁) tidak boleh 0 atau 180 derajat.');
        return val3 * Math.sin(val2) / sinTheta1;
    }
    if (target === "theta1") { 
        if (val1 === 0) throw new Error('Indeks 1 (n₁) tidak boleh nol.');
        const sinVal = (val3 * Math.sin(val2)) / val1;
        if (sinVal > 1 || sinVal < -1) return "Error: Kombinasi input tidak valid (sin > 1).";
        return Math.asin(sinVal);
    }
    if (target === "n2") { 
        const sinTheta2 = Math.sin(val3);
        if (sinTheta2 === 0) throw new Error('Sudut bias (θ₂) tidak boleh 0 atau 180 derajat.');
        return val1 * Math.sin(val2) / sinTheta2;
    }
    throw new Error('Target Pembiasan tidak valid');
}

function hitungPemantulan(val1, target) {
    
    if (target === "theta_r") return val1;
    if (target === "theta_i") return val1;
    throw new Error('Target Pemantulan tidak valid');
}

function hitungSudutKritis(val1, val2, target) {
    
    if (target === "theta_c") {
        if (val1 === 0) throw new Error('Indeks 1 (n₁) tidak boleh nol.');
        if (val2 > val1) return "Error: n₂ harus lebih kecil dari n₁ untuk Sudut Kritis.";
        return Math.asin(val2 / val1);
    }
    
    if (target === "n1") {
        const sinC = Math.sin(val1);
        if (sinC === 0) throw new Error('Sudut kritis tidak boleh 0.');
        return val2 / sinC;
    }
    
    if (target === "n2") {
        return val2 * Math.sin(val1);
    }
    throw new Error('Target Sudut Kritis tidak valid');
}

function hitungPembelokanTotal(val1, val2) {
    
    return (val1 > val2) ? "Terjadi" : "Tidak Terjadi";
}


function hitungCerminDatar(val1, target) {
    if (target === "s-prime") return -val1; 
    if (target === "s") return -val1; 
    throw new Error('Target Cermin Datar tidak valid');
}

function hitungCerminLengkung(val1, val2, val3, val4, target) {
    
    if (target === "f") return val4 / 2; 
    if (target === "R") return 2 * val1; 
    if (target === "s_i") { 
        
        const denom = val2 - val1; 
        if (denom === 0) return Infinity; 
        return (val1 * val2) / denom; 
    }
    if (target === "s_o") { 
        
        const denom = val3 - val1; 
        if (denom === 0) return Infinity; 
        return (val1 * val3) / denom; 
    }
    throw new Error('Target Cermin Lengkung tidak valid');
}

function hitungPersamaanLensa(val1, val2, target) {
    
    
    
    if (target === "f") { 
        
        const denom = val1 + val2; 
        if (denom === 0) return Infinity; 
        return (val1 * val2) / denom;
    }
    if (target === "s_i") { 
        
        const denom = val2 - val1; 
        if (denom === 0) return Infinity; 
        return (val1 * val2) / denom;
    }
    if (target === "s_o") { 
        
        const denom = val2 - val1; 
        if (denom === 0) return Infinity; 
        return (val1 * val2) / denom;
    }
    throw new Error('Target Persamaan Lensa tidak valid');
}

function hitungPerbesaran(val1, val2, val3, val4, target) {
    
    if (target === "m") { 
        if (val2 === 0) throw new Error('Jarak benda (s_o) tidak boleh nol.');
        return -val1 / val2;
    }
    if (target === "h_i") return val1 * val3; 
    if (target === "h_o") { 
        if (val1 === 0) throw new Error('Perbesaran (m) tidak boleh nol.');
        return val4 / val1;
    }
    if (target === "s_i") return -val1 * val2; 
    if (target === "s_o") { 
        if (val1 === 0) throw new Error('Perbesaran (m) tidak boleh nol.');
        return -val4 / val1;
    }
    throw new Error('Target Perbesaran tidak valid');
}


function hitungInterferensiCahaya(val1, val2, val3, target) {
    
    if (target === "theta") { 
        if (val1 === 0) throw new Error('Jarak celah (d) tidak boleh nol.');
        const sinVal = (val3 * val2) / val1;
        if (sinVal > 1 || sinVal < -1) return "Error: Kombinasi input tidak valid (sin > 1).";
        return Math.asin(sinVal);
    }
    if (target === "d") { 
        const sinTheta = Math.sin(val1);
        if (sinTheta === 0) throw new Error('Sudut (θ) tidak boleh 0.');
        return (val3 * val2) / sinTheta;
    }
    if (target === "lambda") { 
        if (val3 === 0) throw new Error('Orde (m) tidak boleh nol (selain pusat).');
        return (val2 * Math.sin(val1)) / val3;
    }
    if (target === "m") { 
        if (val3 === 0) throw new Error('Panjang gelombang (λ) tidak boleh nol.');
        const m_calc = (val2 * Math.sin(val1)) / val3;
        const m_round = Math.round(m_calc);
         if (Math.abs(m_calc - m_round) > 1e-6) {
             return `Error: Kombinasi input tidak menghasilkan m bilangan bulat (hasil: ${m_calc.toFixed(3)}).`;
        }
        return m_round;
    }
    throw new Error('Target Interferensi Cahaya tidak valid');
}

function hitungJarakGarisInterferensi(val1, val2, val3, target) {
    
    if (target === "delta-y") { 
        if (val3 === 0) throw new Error('Jarak celah (d) tidak boleh nol.');
        return (val1 * val2) / val3;
    }
    if (target === "lambda") { 
        if (val2 === 0) throw new Error('Jarak layar (D) tidak boleh nol.');
        return (val1 * val3) / val2;
    }
    if (target === "D") { 
        if (val2 === 0) throw new Error('Panjang gelombang (λ) tidak boleh nol.');
        return (val1 * val3) / val2; 
    }
    if (target === "d") { 
        if (val1 === 0) throw new Error('Jarak garis (Δy) tidak boleh nol.');
        return (val2 * val3) / val1;
    }
    throw new Error('Target Jarak Garis Interferensi tidak valid');
}

function hitungDifraksiCelahTunggal(val1, val2, val3, target) {
    
    
    if (target === "theta") { 
        if (val3 === 0) throw new Error('Orde (m) tidak boleh nol untuk minima difraksi.');
        if (val1 === 0) throw new Error('Lebar celah (a) tidak boleh nol.');
        const sinVal = (val3 * val2) / val1;
        if (sinVal > 1 || sinVal < -1) return "Error: Kombinasi input tidak valid (sin > 1).";
        return Math.asin(sinVal);
    }
    if (target === "a") { 
        if (val3 === 0) throw new Error('Orde (m) tidak boleh nol untuk minima difraksi.');
        const sinTheta = Math.sin(val1);
        if (sinTheta === 0) throw new Error('Sudut (θ) tidak boleh 0.');
        return (val3 * val2) / sinTheta;
    }
    if (target === "lambda") { 
        if (val3 === 0) throw new Error('Orde (m) tidak boleh nol untuk minima difraksi.');
        return (val2 * Math.sin(val1)) / val3;
    }
    if (target === "m") { 
        if (val3 === 0) throw new Error('Panjang gelombang (λ) tidak boleh nol.');
        const m_calc = (val2 * Math.sin(val1)) / val3;
        const m_round = Math.round(m_calc);
        if (m_round === 0) return "Error: Orde 0 tidak valid untuk minima difraksi.";
         if (Math.abs(m_calc - m_round) > 1e-6) {
             return `Error: Kombinasi input tidak menghasilkan m bilangan bulat (hasil: ${m_calc.toFixed(3)}).`;
        }
        return m_round;
    }
    throw new Error('Target Difraksi Celah Tunggal tidak valid');
}

function hitungDifraksiCelahGanda(val1, val2, val3, target) {
    
    
    return hitungInterferensiCahaya(val1, val2, val3, target);
}

function hitungPolaDifraksi(val1, val2, val3, val4, target) {
    
    
    
    if (target === "I") { 
        if (val4 === 0) return 1; 
        return Math.pow(Math.sin(val4) / val4, 2);
    }
    
    if (target === "beta") { 
        if (val3 === 0) throw new Error('Panjang gelombang (λ) tidak boleh nol.');
        return (Math.PI * val1 * Math.sin(val2)) / val3;
    }
    if (target === "a") { 
        const denom = Math.PI * Math.sin(val2);
        if (denom === 0) throw new Error('Sudut (θ) tidak boleh 0.');
        return (val1 * val3) / denom;
    }
    if (target === "theta") { 
        const denom = Math.PI * val2;
        if (denom === 0) throw new Error('Lebar celah (a) tidak boleh nol.');
        const sinVal = (val1 * val3) / denom;
        if (sinVal > 1 || sinVal < -1) return "Error: Kombinasi input tidak valid (sin > 1).";
        return Math.asin(sinVal);
    }
    if (target === "lambda") { 
        if (val1 === 0) return "Error: Parameter β tidak boleh nol (kecuali di pusat).";
        return (Math.PI * val2 * Math.sin(val3)) / val1;
    }
    throw new Error('Target Pola Difraksi tidak valid');
}


function hitungMata(val1, val2, target) {
    
    if (target === "phi") { 
        if (val1 === 0 || val2 === 0) throw new Error('Jarak tidak boleh nol.');
        return (1/val1) + (1/val2);
    }
    if (target === "f") { 
        if (val1 === 0) return Infinity; 
        return 1 / val1;
    }
    if (target === "s_o") { 
        
        const denom = val1 - (1/val2);
        if (denom === 0) return Infinity;
        return 1 / denom;
    }
    if (target === "s_i") { 
        
        const denom = val1 - (1/val2); 
        if (denom === 0) return Infinity;
        return 1 / denom;
    }
    throw new Error('Target Mata tidak valid');
}

function hitungMikroskop(val1, val2, val3, target) {
    
    if (target === "M") { 
        if (val2 === 0 || val3 === 0) throw new Error('Fokus (f_o, f_e) tidak boleh nol.');
        return (val1 / val2) * (near_point / val3);
    }
    if (target === "L") { 
        if (near_point === 0) throw new Error('Jarak dekat tidak boleh nol.');
        return (val1 * val2 * val3) / near_point;
    }
    if (target === "f_o") { 
        const denom = val1 * val3;
        if (denom === 0) throw new Error('Perbesaran (M) dan f_e tidak boleh nol.');
        return (val2 * near_point) / denom;
    }
    if (target === "f_e") { 
        const denom = val1 * val3; 
        if (denom === 0) throw new Error('Perbesaran (M) dan f_o tidak boleh nol.');
        return (val2 * near_point) / denom;
    }
    throw new Error('Target Mikroskop tidak valid');
}

function hitungTeropongBintang(val1, val2, target) {
    
    if (target === "M") { 
        if (val2 === 0) throw new Error('Fokus okuler (f_ok) tidak boleh nol.');
        return val1 / val2;
    }
    if (target === "f_obj") return val1 * val2; 
    if (target === "f_ok") { 
        if (val1 === 0) throw new Error('Perbesaran (M) tidak boleh nol.');
        return val2 / val1;
    }
    throw new Error('Target Teropong Bintang tidak valid');
}

function hitungKamera(val1, val2, val3, val4, target) {
    if (target === "f-number") { 
        if (val2 === 0) throw new Error('Diameter (D) tidak boleh nol.');
        return val1 / val2;
    }
    if (target === "f") return val1 * val2; 
    if (target === "D") { 
        if (val1 === 0) throw new Error('F-Number tidak boleh nol.');
        return val2 / val1;
    }
    
    
    if (target === "s_i") { 
        const f = val1, s_o = val3;
        const denom = s_o - f;
        if (denom === 0) return Infinity; 
        return (f * s_o) / denom;
    }
    if (target === "s_o") { 
        const f = val1, s_i = val4;
        const denom = s_i - f;
        if (denom === 0) return Infinity; 
        return (f * s_i) / denom;
    }
    throw new Error('Target Kamera tidak valid');
}

function hitungLup(val1, target) {
    
    if (target === "M") { 
        if (val1 === 0) throw new Error('Fokus (f) tidak boleh nol.');
        return near_point / val1;
    }
    if (target === "f") { 
        if (val1 === 0) throw new Error('Perbesaran (M) tidak boleh nol.');
        return near_point / val1;
    }
    throw new Error('Target Lup tidak valid');
}



function hitungPembesaranAlatOptik(tipe, L, f_o, f_e, f, target) {
    if (target === "M") {
        if (tipe === "mikroskop") {
            
            if (L === null || f_o === null || f_e === null) throw new Error('Lengkapi parameter untuk mikroskop: L, f_o, f_e.');
            if (f_o === 0 || f_e === 0) throw new Error('Parameter fokus mikroskop tidak boleh nol.');
            return (L / f_o) * (near_point / f_e);
        } else if (tipe === "teropong") {
            
            if (f_o === null || f_e === null) throw new Error('Lengkapi parameter untuk teropong: f_o (obj), f_e (ok).');
            if (f_e === 0) throw new Error('Fokus okuler teropong tidak boleh nol.');
            return f_o / f_e;
        } else if (tipe === "lup") {
            
            if (f === null) throw new Error('Lengkapi parameter untuk lup: f.');
            if (f === 0) throw new Error('Fokus lup tidak boleh nol.');
            return near_point / f;
        } else {
            throw new Error('Tipe alat optik tidak valid (mikroskop/teropong/lup).');
        }
    }
    
    throw new Error('Target Pembesaran Alat Optik hanya mendukung perhitungan M saat ini.');
}


document.addEventListener('DOMContentLoaded', function() {
    const topikSelect = document.getElementById('pilih-topik');
    if (topikSelect) {
        topikSelect.addEventListener('change', tampilkanKalkulator);
        
        if (topikSelect.value) {
            tampilkanKalkulator();
        }
    } else {
        console.error('Elemen #pilih-topik tidak ditemukan. Pastikan HTML memiliki <select id="pilih-topik">.');
    }
});


if (typeof document !== 'undefined' && !document.getElementById('pilih-topik')) {
    const container = document.getElementById('kalkulator-area') || document.body;
    const selectTopik = document.createElement('select');
    selectTopik.id = 'pilih-topik';
    
    const optionsTopik = [
        {value: 'persamaan-gelombang', text: 'Persamaan Gelombang'},
        {value: 'kecepatan-gelombang', text: 'Kecepatan Gelombang'},
        {value: 'frekuensi', text: 'Frekuensi'},
        {value: 'periode', text: 'Periode'},
        {value: 'panjang-gelombang', text: 'Panjang Gelombang'},
        {value: 'energi-tali', text: 'Energi Tali'},
        {value: 'intensitas', text: 'Intensitas'},
        {value: 'daya', text: 'Daya'},
        {value: 'amplitudo', text: 'Amplitudo'},
        {value: 'energi-gelombang', text: 'Energi Gelombang'},
        {value: 'intensitas-gelombang', text: 'Intensitas Gelombang'},
        {value: 'daya-gelombang', text: 'Daya Gelombang'},
        {value: 'kecepatan-suara', text: 'Kecepatan Suara'},
        {value: 'taraf-intensitas', text: 'Taraf Intensitas'},
        {value: 'resonansi-tabung-udara', text: 'Resonansi Tabung Udara'},
        {value: 'frekuensi-resonansi', text: 'Frekuensi Resonansi'},
        {value: 'efek-doppler', text: 'Efek Doppler'},
        {value: 'interferensi-bunyi', text: 'Interferensi Bunyi'},
        {value: 'pembentukan-beat', text: 'Pembentukan Beat'},
        {value: 'sifat-cahaya-medium', text: 'Sifat Cahaya Medium'},
        {value: 'energi-foton', text: 'Energi Foton'},
        {value: 'indeks-bias', text: 'Indeks Bias'},
        {value: 'pembiasan', text: 'Pembiasan'},
        {value: 'pemantulan', text: 'Pemantulan'},
        {value: 'sudut-kritis', text: 'Sudut Kritis'},
        {value: 'total-internal-reflection', text: 'Total Internal Reflection'},
        {value: 'cermin-datar', text: 'Cermin Datar'},
        {value: 'cermin-lengkung', text: 'Cermin Lengkung'},
        {value: 'lensa-cembung', text: 'Lensa Cembung'},
        {value: 'lensa-cekung', text: 'Lensa Cekung'},
        {value: 'perbesaran-optik', text: 'Perbesaran Optik'},
        {value: 'jarak-garis-interferensi', text: 'Jarak Garis Interferensi'},
        {value: 'interferensi-cahaya', text: 'Interferensi Cahaya'},
        {value: 'difraksi-celah-tunggal', text: 'Difraksi Celah Tunggal'},
        {value: 'difraksi-celah-ganda', text: 'Difraksi Celah Ganda'},
        {value: 'pola-difraksi', text: 'Pola Difraksi'},
        {value: 'mata', text: 'Mata'},
        {value: 'mikroskop', text: 'Mikroskop'},
        {value: 'teropong', text: 'Teropong'},
        {value: 'kamera', text: 'Kamera'},
        {value: 'lup', text: 'Lup'},
        {value: 'pembesaran-alat-optik', text: 'Pembesaran Alat Optik'}
    ];
    optionsTopik.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        selectTopik.appendChild(option);
    });
    container.insertBefore(selectTopik, container.firstChild);
    selectTopik.addEventListener('change', tampilkanKalkulator);
}