    const fs = require('fs')
    const chalk = require('chalk')
    const validator = require('validator')
    const yargs = require('yargs')

    // membuat folder data jika belum ada
    const dirPath = './data'
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath)
    }

    // membuat file contacts.json jika belum ada
    const dataPath = './data/contacts.json'
    if(!fs.existsSync(dataPath)){
        fs.writeFileSync(dataPath, '[]', 'utf-8')
    }

    const loadContact = () => {
        file = fs.readFileSync('data/contacts.json', 'utf8')
        const contacts = JSON.parse(file)
        return contacts
    }

// ================ Add Contact ================
    const simpanContact = (nama, email, noHP) => {
        const contact = {nama, email, noHP}

        // file = fs.readFileSync('data/contacts.json', 'utf8') 
        // const contacts = JSON.parse(file)
        const contacts = loadContact()
    // ---------- Validate ----------
        // cek duplikat
        const duplikat = contacts.find((contact) => contact.nama === nama)
        if(duplikat) {
            console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
            return false
        }
        // cek email
        if(email) {
            if(!validator.isEmail(email)) {
                console.log(chalk.red.inverse.bold('Email tidak valid!'));
                return false
            }
        }
        // cek no HP
        if(!validator.isMobilePhone(noHP, 'id-ID')) {
            console.log(chalk.red.inverse.bold('Nomor HP tidak valid!'));
            return false
        }
    // ---------- ./Validate ----------
    
        contacts.push(contact)

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
        console.log(chalk.green.inverse.bold('Terima kasih sudah memasukan data.'));
    }
// ================ ./Add Contact ================

// ================ All Contacts ================
    const listContact = () => {
        const contacts = loadContact()
        console.log(chalk.cyan.inverse.bold('Daftar Kontak :'));
        contacts.forEach((contact, i) => {
            console.log(`${i+1}. ${contact.nama} - ${contact.noHP}`);
        })
    }
// ================ ./All Contacts ================

// ================ Show Contacts ================
    const detailContact = (nama) => {
        const contacts = loadContact()
        const contact = contacts.find( (contact) => contact.nama.toLowerCase() === nama.toLowerCase())

        if(!contact) {
            console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
            return false
        }

        console.log(chalk.cyan.inverse.bold(contact.nama));
        console.log(contact.email);
        if(contact.email)
            console.log(contact.noHP);

    }
// ================ ./Show Contacts ================

// ================ Delete Contacts ================
    const deleteContact = (nama) => {
        const contacts = loadContact()
        const newContacts = contacts.filter( (contact) => contact.nama.toLowerCase() !== nama.toLowerCase() )
        
        if(contacts.length === newContacts.length) {
            console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
            return false
        }

        fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))
        console.log(chalk.green.inverse.bold(`${nama} berhasil dihapus!`));
    }
// ================ ./Delete Contacts ================



module.exports = { simpanContact, listContact, detailContact, deleteContact }