const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const { body, validationResult, check } = require('express-validator')
const methodOverride = require('method-override')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

// setup method override
app.use(methodOverride('_method'))

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

// =================== Form Add Contact ===================
app.get('/contact/add', (req, res) => {
	res.render('add-contact', {
		layout: 'layouts/main-layout',
		title: 'Form Tambah Data Contact',
	})
})
// =================== /-Form Add Contact ===================

// =================== Store Contact ===================
// proses data contact
app.post(
	'/contact',
	[
		body('nama').custom(async (value) => {
			const duplikat = await Contact.findOne({ nama: value })
			if (duplikat) {
				throw new Error('Nama contact sudah digunakan!')
			}
			return true
		}),
		check('email', 'Email tidak valid').isEmail(),
		check('noHP', ' no HP Tidak valid').isMobilePhone('id-ID'),
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.render('add-contact', {
				title: 'Form Data Contact',
				layout: 'layouts/main-layout',
				errors: errors.array(),
			})
		} else {
			Contact.insertMany(req.body, (error, result) => {
				// kirimkan flash message
				req.flash('msg', 'Data contact berhasil ditambahkan!')
				res.redirect('/contact')
			})
		}
	}
)
// =================== /-Store Contact ===================

// =================== Delete Contact ===================
// app.get('/contact/delete/:nama', async (req, res) => {
// 	const contact = await Contact.findOne({ nama: req.params.nama })

// 	// jika contact tidak ada
// 	if (!contact) {
// 		res.status(404)
// 		res.send('<h1>404</h1>')
// 	} else {
// 		Contact.deleteOne({ _id: contact._id }).then((result) => {
// 			req.flash('msg', 'Data contact berhasil dihapus!')
// 			res.redirect('/contact')
// 		})
// 	}
// })
app.delete('/contact', (req, res) => {
	Contact.deleteOne({ nama: req.body.nama }).then((result) => {
		req.flash('msg', 'Data contact berhasil dihapus!')
		res.redirect('/contact')
	})
})
// =================== /-Delete Contact ===================

// =================== Form Edit Contact ===================
app.get('/contact/edit/:nama', async (req, res) => {
	const contact = await Contact.findOne({ nama: req.params.nama })

	res.render('edit-contact', {
		layout: 'layouts/main-layout',
		title: 'Form Tambah Data Contact',
		contact,
	})
})
// =================== /-Form Edit Contact ===================

// =================== Update Contact ===================
app.put(
	'/contact',
	[
		body('nama').custom(async (value, { req }) => {
			const duplikat = await Contact.findOne({ nama: value })
			if (value !== req.body.oldNama && duplikat) {
				throw new Error('Nama contact sudah digunakan!')
			}
			return true
		}),
		check('email', 'Email tidak valid').isEmail(),
		check('noHP', ' no HP Tidak valid').isMobilePhone('id-ID'),
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			// return res.status(400).json({ errors: errors.array() })
			res.render('edit-contact', {
				title: 'Form Ubah Data Contact',
				layout: 'layouts/main-layout',
				errors: errors.array(),
				contact: req.body,
			})
		} else {
			Contact.updateOne(
				{ _id: req.body._id },
				{
					$set: {
						nama: req.body.nama,
						email: req.body.email,
						noHP: req.body.noHP,
					},
				}
			).then((result) => {
				// kirimkan flash message
				req.flash('msg', 'Data contact berhasil diubah!')
				res.redirect('/contact')
			})
		}
	}
)
// =================== /-Update Contact ===================

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
