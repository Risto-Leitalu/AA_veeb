const express = require("express");
//loome rakenduse, mis käivitab express raamistikku
const fs = require("fs");
const bodyparser = require("body-parser");
const dateEt = require("./src/dateTimeET.js");
const textRef = "./public/txt/vanasonad.txt";
const textRef2 = "./public/txt/visitlog.txt";
const app = express();
//määran lehtede renderdaja (view engine)
app.set("view engine", "ejs");
//muudame public kataloogi veebiserverile kättesaadavaks
app.use(express.static("public"));
//Asun päringut parsima. Parameeter lõpus on false, kui ainult tekst ja true, kui muud infot ka
app.use(bodyparser.urlencoded({extended: false}));

app.get("/", (req, res)=>{
	//res.send("Express.js rakendus läkski käima!");
	res.render("index");
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
	let visitlog = [];
	fs.readFile(textRef2, "utf8", (err, data)=>{
			if(err){
				res.render("visitlog", {h2: "Registreeritud külastajad", listData: ["Vabandame, ühtki külastajat ei leitud!"]});
			} else {
				res.render("visitlog", {h2: "Registreeritud külastajad", listData: data.split(";")});
			}
	});
});

app.get("/regvisit", (req, res)=>{
	res.render("regvisit");
});

app.post("/regvisit", (req, res)=>{
	console.log(req.body);
	//avan tekstifaili kirjutamiseks sellisel moel, et kui teda pole, luuakse (parameeter "a")
	fs.open("public/txt/visitlog.txt", "a", (err, file)=>{
		if(err){
			throw(err);
		}
		else {
			//faili senisele sisule lisamine
			fs.appendFile("public/txt/visitlog.txt", req.body.nameInput + ", " + dateEt.longDate() + " Kell " + dateEt.time() + ";", (err)=>{
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

app.listen(5307);