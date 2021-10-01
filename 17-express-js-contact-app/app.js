const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const { loadContact, findContact } = require("./utils/contacts")

const app = express()
const port = 3000

// gunakan ejs
app.set("view engine", "ejs")

// Thrid-party middleware
app.use(expressLayouts)

// Built-in middleware
app.use(express.static("public"))

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
	})
})

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
