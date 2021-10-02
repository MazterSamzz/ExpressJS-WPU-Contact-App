const fs = require("fs")

// membuat folder data jika belum ada
const dirPath = "./data"
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath)
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json"
if (!fs.existsSync(dataPath)) {
	fs.writeFileSync(dataPath, "[]", "utf-8")
}

const loadContact = () => {
	file = fs.readFileSync("data/contacts.json", "utf8")
	const contacts = JSON.parse(file)
	return contacts
}

// cari contact berdasarkan nama
const findContact = (nama) => {
	const contacts = loadContact()
	const contact = contacts.find(
		(contact) => contact.nama.toLowerCase() === nama.toLowerCase()
	)
	return contact
}

// menuliskan / menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
	fs.writeFileSync("data/contacts.json", JSON.stringify(contacts))
}
// menambahkan contact baru
const addContact = (contact) => {
	const contacts = loadContact()
	contacts.push(contact)
	saveContacts(contacts)
}

// cek nama yang duplikat
const cekDuplikat = (nama) => {
	const contacts = loadContact()
	return contacts.find((contact) => contact.nama === nama)
}

module.exports = { loadContact, findContact, addContact, cekDuplikat }
