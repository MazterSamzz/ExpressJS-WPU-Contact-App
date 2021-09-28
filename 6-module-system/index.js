// console.log('Hello WPU');

// const nama = 'Sandhika Galih'
// const cetakNama = (nama) => `Hi, nama saya ${nama}`
// console.log(cetakNama(nama));

// const fs = require('fs') // core module
// const cetakNama = require('./coba') // local module
// const moment = require('moment') // third party module / npm module / node modules

const coba = require('./coba')

console.log(coba.cetakNama('Sandhika'), coba.PI, coba.mahasiswa.cetakMhs() , new coba.Orang)
// 15:21