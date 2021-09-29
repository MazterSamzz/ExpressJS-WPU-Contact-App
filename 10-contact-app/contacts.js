const fs = require('fs')

const readLine = require('readline')
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
})

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

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve ,reject) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama)
        })
    })
}

const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP}

    file = fs.readFileSync('data/contacts.json', 'utf8') 
    const contacts = JSON.parse(file)

    contacts.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log('Terima kasih sudah memasukan data.');
    
    rl.close()
}

module.exports = { tulisPertanyaan, simpanContact}