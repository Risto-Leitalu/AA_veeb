const express = require("express");
const fs = require("fs");
const bodyparser = require("body-parser");
const mysql = require("mysql2/promise");
const dateEt = require("./src/dateTimeET");
const dbInfo = require("../vp2025config");
const textRef = "./public/txt/vanasonad.txt";
const textRef2 = "./public/txt/visitlog.txt";
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
//kui vormist tuleb vaid tekst, siis false, kui muud ka, siis true
app.use(bodyparser.urlencoded({extended: true}));
const dbConf = {
	host: dbInfo.configData.host,
	user: dbInfo.configData.user,
	password: dbInfo.configData.PassWord,
	database: dbInfo.configData.dataBase
	
};

app.get("/", async (req, res)=>{
	let conn;
	try {
		const privacy = 3;
		conn = await mysql.createConnection(dbConf);
		console.log("Andmebaasi ühendus loodud");
		let sqlReq = "SELECT filename, alttext FROM galleryphotos WHERE id=(SELECT MAX(id) FROM galleryphotos WHERE privacy=? AND deleted IS NULL)";
		const [rows, fields] = await conn.execute(sqlReq, [privacy]);
		console.log(rows);
		let imgAlt = "Avalik foto";
		if(rows[0].alttext != ""){
			imgAlt = rows[0].alttext;
		}
		res.render("index", {imgFile: "gallery/normal/" + rows[0].filename, imgAlt: imgAlt});
	}
	catch(err){
		res.render("index");
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasi ühendus suletud!");
		}
	}
});

app.get("/timenow", (req, res)=>{
	res.render("timenow", {wd: dateEt.weekDay(), date: dateEt.longDate(), time: dateEt.time()});
});

app.get("/vanasonad", (req, res)=>{
	fs.readFile(textRef, "utf8", (err, data)=>{
		if(err){
			res.render("genericlist", {h2: "Vanasõnad", listData: ["Vabandame, ühtki vanasõna ei leitud!"]});
		}
		else {
			res.render("genericlist", {h2: "Vanasõnad", listData: data.split(";")});
		}
	});		
});

app.get("/visitlog", (req, res)=>{
	let listData = [];
	fs.readFile(textRef2, "utf8", (err, data)=>{
			if(err){
				res.render("visitlog", {h2: "Registreeritud külastajad", listData: ["Vabandame, ühtki külastajat ei leitud!"]});
			} 
			else {
				let tempListData = data.split(";");
				for (let i = 0; i < tempListData.length - 1; i ++){
					listData.push(tempListData[i]);
				}
				res.render("visitlog", {h2: "Registreeritud külastajad", listData: listData});
			}
	});
});

app.get("/regvisit", (req, res)=>{
	res.render("regvisit");
});

app.post("/regvisit", (req, res)=>{
	console.log(req.body);
	fs.open("public/txt/visitlog.txt", "a", (err, file)=>{
		if(err){
			throw(err);
		}
		else {
			fs.appendFile("public/txt/visitlog.txt", req.body.firstNameInput + " " + req.body.lastNameInput + ", " + dateEt.longDate() + " Kell " + dateEt.time() + ";", (err)=>{
				if(err){
					throw(err);
				}
				else {
					console.log("Salvestatud!");
					res.render("regvisit");
				}
			});
		}
	});
});

//Eesti filmi marsruudid
const eestifilmRouter = require("./routes/eestifilmRoutes");
app.use("/eestifilm", eestifilmRouter);

//Galerii üleslaadimise marsruudid
const galleryphotouploadRouter = require("./routes/galleryphotouploadRoutes");
app.use("/galleryphotoupload", galleryphotouploadRouter);


app.listen(5307);