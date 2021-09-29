const yargs = require('yargs');
const contacts = require('./contacts');

// ================== Add Contact ==================
    yargs.command({
        command: 'add',
        describe: 'menambah contact baru',
        builder: {
            nama: {
                describe: 'Nama lengkap',
                demandOption: true,
                type: 'string',
            },
            email: {
                describe: 'Email',
                demandOption: false,
                type: 'string',
            },
            noHP: {
                describe: 'Nomor Handphone',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            contacts.simpanContact(argv.nama, argv.email, argv.noHP)
        }
    }).demandCommand()
// ================== ./Add Contact ==================

// ================== All Contact ==================
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & no HP contact',
    handler() {
        contacts.listContact()
    }
})
// ================== ./All Contact ==================

// ================ Show Contacts ================
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.detailContact(argv.nama)
    }
})
// ================ ./Show Contacts ================

// ================ Delete Contacts ================
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.deleteContact(argv.nama)
    }
})
// ================ ./Delete Contacts ================

yargs.parse()