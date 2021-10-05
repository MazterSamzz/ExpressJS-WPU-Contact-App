const { ObjectID } = require("bson")
const { mongoClient, MongoClient } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const dbName = "wpu"

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

client.connect((error, client) => {
	if (error) {
		return console.log("Koneksi Gagal!")
	}

	// pilih database
	const db = client.db(dbName)

	// =========== Menambahkan 1 data ke collection mahasiswa ===========
	// db.collection("mahasiswa").insertOne(
	// 	{
	// 		nama: "Erik",
	// 		email: "erik@gmail.com",
	// 	},
	// 	(error, result) => {
	// 		if (error) {
	// 			return console.log("gagal menambahkan data!")
	// 		}
	// 		console.log(result)
	// 	}
	// )

	// =========== Menambahkan lebih dari 1 data ===========
	// db.collection("mahasiswa").insertMany([
	// 	{
	// 		nama: "Erik",
	// 		email: "erik@yahoo.com",
	// 	},
	// 	{
	// 		nama: "Avip",
	// 		email: "avip@gmail.com",
	// 	},
	// 	(error, result) => {
	// 		if (error) {
	// 			return console.log("data gagal ditambahkan!")
	// 		}
	// 		console.log(result)
	// 	},
	// ])

	// =========== menampilkan semua data yang ada di collection 'mahasiswa' ===========
	// console.log(
	// 	db
	// 		.collection("mahasiswa")
	// 		.find()
	// 		.toArray((error, result) => {
	// 			console.log(result)
	// 		})
	// )

	// =========== menampilkan data berdasarkan kriteria yang ada di collection 'mahasiswa' ===========
	// console.log(
	// 	db
	// 		.collection("mahasiswa")
	// 		.find({ _id: ObjectID("615baaccde679d04710388f4") })
	// 		.toArray((error, result) => {
	// 			console.log(result)
	// 		})
	// )

	// =========== mengubah data berdasarkan id ===========
	// const updatePromise = db.collection("mahasiswa").updateOne(
	// 	{
	// 		_id: ObjectID("615baaccde679d04710388f5"),
	// 	},
	// 	{
	// 		$set: {
	// 			nama: "Avip  Syaifulloh",
	// 		},
	// 	}
	// )

	// updatePromise
	// 	.then((result) => {
	// 		console.log(result)
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	})

	// =========== mengubah data lebih dari 1, berdasarkan kriteria ===========
	// db.collection("mahasiswa").updateMany(
	// 	{
	// 		nama: "Erik",
	// 	},
	// 	{
	// 		$set: {
	// 			nama: "Erik Doank",
	// 		},
	// 	}
	// )

	// =========== Menghapus 1 data ===========
	// db.collection("mahasiswa")
	// 	.deleteOne({
	// 		_id: ObjectID("615baaccde679d04710388f5"),
	// 	})
	// 	.then((result) => {
	// 		console.log(result)
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	})

	// =========== mengubah data lebih dari 1, berdasarkan kriteria ===========
	db.collection("mahasiswa")
		.deleteMany({
			nama: "Erik Doank",
		})
		.then((result) => {
			console.log(result)
		})
		.catch((error) => {
			console.log(error)
		})
})
