// Core Module
// File System
    // const fs = require('fs')

    // menuliskan string ke file (synchronus)
        // try{
        //     fs.writeFileSync('data/test.txt', 'Hello World secara synchronus!')
        // }
        // catch(e) {
        //     console.log(e);
        // }

    // menuliskan string ke file (asynchronus)
        // fs.writeFile('data/test.txt', 'Hello World secara Asynchronus', (e) => {
        //     console.log(e);
        // })

    // membaca isi file (synchronus)
        // const data = fs.readFileSync('data/test.txt', 'utf-8')
        // console.log(data)

    // membaca isi file (asynchronus)
        // fs.readFile('data/test.txt', 'utf-8', (e, data) => {
        //     if (e) throw e
        //     console.log(data);
        // })
// ./FileSystem


// =============== Readline ===============
    // const readLine = require('readline')

    // const rl =  readLine.createInterface( {
    //     input: process.stdin,
    //     output: process.stdout,
    // })

    // rl.question('Masukan nama anda : ', (nama) => {
    //     // console.log(`Terima kasih ${nama}`);
        
    //     rl.question('Masukan nomor HP anda : ', (noHP) =>{
    //         // console.log(`Terima kasih ${noHP}`);
    //         console.log(`Terima kasih ${nama}, sudah menginputkan ${noHP}`);
    //         rl.close()
    //     })
    // })
// =============== ./Readline ===============

// =============== Readline + fs.writefileSync ===============
    const fs = require('fs')

    const readLine = require('readline')
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question('Masukan nama anda: ', (nama) => {
        rl.question('Masukan nomor HP anda : ', (noHP) => {
            const contact = {nama,noHP}
            file = fs.readFileSync('data/contacts.json', 'utf8') 
            const contacts = JSON.parse(file)

            contacts.push(contact)

            fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
            console.log('Terima kasih sudah memasukan data.');
            
            rl.close()
        })
    })
// =============== ./Readline + fs.writefileSync ===============