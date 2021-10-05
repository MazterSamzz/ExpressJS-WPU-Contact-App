const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')
// Thrid-party middleware
app.use(expressLayouts)
// Built-in middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(
	session({
		cookie: { maxAge: 6000 },
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
)
app.use(flash())

// =================== Halaman Home ===================
app.get('/', (req, res) => {
	// res.sendFile('./index.html', {root: __dirname})
	const mahasiswa = [
		{
			nama: 'Sandhika Galih',
			email: 'sandhika@gmail.com',
		},
		{
			nama: 'Erik',
			email: 'erik@gmail.com',
		},
		{
			nama: 'Doddy Ferdiansyah',
			email: 'doddy@gmail.com',
		},
	]
	res.render('index', {
		nama: 'Sandhika Galih',
		layout: 'layouts/main-layout',
		title: 'Halaman Home',
		mahasiswa,
	})
})
// =================== /-Halaman Home ===================

// =================== Halaman About ===================
app.get('/about', (req, res) => {
	res.render('about', {
		layout: 'layouts/main-layout',
		title: 'Halaman About',
	})
})
// =================== /-Halaman About ===================

// =================== Halaman Contact ===================
app.get('/contact', async (req, res) => {
	// Contact.find().then((contact) => {
	// 	res.send(contact)
	// })

	const contacts = await Contact.find()
	res.render('contact', {
		layout: 'layouts/main-layout',
		title: 'Halaman Contact',
		contacts,
		msg: req.flash('msg'),
	})
})
// =================== /-Halaman Contact ===================

// =================== Halaman Detail Contact ===================
app.get('/contact/:nama', async (req, res) => {
	const contact = await Contact.findOne({ nama: req.params.nama })

	res.render('detail', {
		layout: 'layouts/main-layout',
		title: 'Halaman Detail Contact',
		contact,
	})
})
// =================== /-Halaman Detail Contact ===================

app.listen(port, () => {
	console.log(`Mongo contact App | listening at http://localhost:${port}`)
})
