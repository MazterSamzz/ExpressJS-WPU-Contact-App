const contacts = require('./contacts')

const main = async () => {
    const nama = await contacts.tulisPertanyaan('Masukan nama anda : ')
    const email = await contacts.tulisPertanyaan('Masukan email anda : ')
    const noHP = await contacts.tulisPertanyaan('Masukan no HP anda : ')

    contacts.simpanContact(nama, email, noHP)
}

main()

// rl.question('Masukan nama anda: ', (nama) => {
//     rl.question('Masukan nomor HP anda : ', (noHP) => {
//         const contact = {nama,noHP}
//         file = fs.readFileSync('data/contacts.json', 'utf8') 
//         const contacts = JSON.parse(file)

//         contacts.push(contact)

//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
//         console.log('Terima kasih sudah memasukan data.');
        
//         rl.close()
//     })
// })