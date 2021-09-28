const validator = require('validator')
const chalk = require('chalk')
// console.log(validator.isEmail('sandika@gmail.com'));
// console.log(validator.isMobilePhone('0782345678', 'id-ID'));
// console.log(validator.isNumeric('0782345678'));

// console.log(chalk.italic.bgBlue.black('Hello World!'));

// const pesan1 = 'Hello World'
// console.log(chalk.bgRed.black(pesan1));

const nama = 'Ivan'
const pesan = chalk`Lorem ipsum dolor {bgGreen.black.bold sit amet}, consectetur {bgGreen.italic.black adipisicing} elit. Veritatis, soluta? Nama saya: ${nama}`
console.log(pesan);