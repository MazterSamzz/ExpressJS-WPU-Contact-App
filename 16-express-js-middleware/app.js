const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const morgan = require("morgan")
const app = express()
const port = 3000

// gunakan ejs
app.set("view engine", "ejs")

// Thrid-party middleware
app.use(expressLayouts)
app.use(morgan("dev"))

// Built-in middleware
app.use(express.static("public"))

// Application level middleware
app.use((req, res, next) => {
	console.log("Time: ", Date.now())
	next()
})

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
	res.sendFile("./about.html", { root: __dirname })
	res.render("about", {
		layout: "layouts/main-layout",
		title: "Halaman About",
	})
})

app.get("/contact", (req, res) => {
	// res.sendFile('./contact.html', {root: __dirname})
	res.render("contact", {
		layout: "layouts/main-layout",
		title: "Halaman Contact",
	})
})

app.get("/product/:id", (req, res) => {
	res.send(
		`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`
	)
})

app.use((req, res) => {
	res.status(404)
	res.send("<h1>404</h1>")
})

app.listen(port, () => `Example app listening at http://localhost:${port}`)
