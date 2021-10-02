const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const {
	loadContact,
	findContact,
	addContact,
	cekDuplikat,
} = require("./utils/contacts")
const { body, validationResult, check } = require("express-validator")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")

const app = express()
const port = 3000

// gunakan ejs
app.set("view engine", "ejs")
// Thrid-party middleware
app.use(expressLayouts)
// Built-in middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

// konfigurasi flash
app.use(cookieParser("secret"))
app.use(
	session({
		cookie: { maxAge: 6000 },
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
)
app.use(flash())

app.get("/", (req, res) => {
	// res.sendFile('./index.html', {root: __dirname})
	const mahasiswa = [
		{
			nama: "Sandhika Galih",
			email: "sandhika@gmail.com",
		},
		{
			nama: "Erik",
			email: "erik@gmail.com",
		},
		{
			nama: "Doddy Ferdiansyah",
			email: "doddy@gmail.com",
		},
	]
	res.render("index", {
		nama: "Sandhika Galih",
		layout: "layouts/main-layout",
		title: "Halaman Home",
		mahasiswa,
	})
})
app.get("/about", (req, res) => {
	res.render("about", {
		layout: "layouts/main-layout",
		title: "Halaman About",
	})
})

app.get("/contact", (req, res) => {
	const contacts = loadContact()
	res.render("contact", {
		layout: "layouts/main-layout",
		title: "Halaman Contact",
		contacts,
		msg: req.flash("msg"),
	})
})

// halaman form tambah data contact
app.get("/contact/add", (req, res) => {
	res.render("add-contact", {
		layout: "layouts/main-layout",
		title: "form Tambah Data Contact",
	})
})

// proses data contact
app.post(
	"/contact",
	[
		body("nama").custom((value) => {
			const duplikat = cekDuplikat(value)
			if (duplikat) {
				throw new Error("Nama contact sudah digunakan!")
			}
			return true
		}),
		check("email", "Email tidak valid").isEmail(),
		check("noHP", " no HP Tidak valid").isMobilePhone("id-ID"),
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			// return res.status(400).json({ errors: errors.array() })
			res.render("add-contact", {
				title: "Form Data Contact",
				layout: "layouts/main-layout",
				errors: errors.array(),
			})
		} else {
			addContact(req.body)
			// kirimkan flash message
			req.flash("msg", "Data contact berhasil ditambahkan!")
			res.redirect("/contact")
		}
	}
)

// halaman detail contact
app.get("/contact/:nama", (req, res) => {
	const contact = findContact(req.params.nama)
	res.render("detail", {
		layout: "layouts/main-layout",
		title: "Halaman Detail Contact",
		contact,
	})
})

app.use((req, res) => {
	res.status(404)
	res.send("<h1>404</h1>")
})

app.listen(port, () => `Example app listening at http://localhost:${port}`)
