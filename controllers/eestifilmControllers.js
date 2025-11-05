const mysql = require("mysql2/promise");
const dbInfo = require("./../../vp2025config");

const dbConf = {
	host: dbInfo.configData.host,
	user: dbInfo.configData.user,
	password: dbInfo.configData.PassWord,
	database: dbInfo.configData.dataBase
	
};

//@desc Home page for Estonian movie section
//@route GET /eestifilm
//@access public


const filmHomePage = (req, res)=>{
	res.render("eestifilm");
};

//@desc Home page for people involved in Estonian movie industry
//@route GET /eestifilm/filmiinimesed
//@access public

const filmPeople = async (req, res)=>{
	let conn;
	const sqlReq = "SELECT * FROM person";
	let personList = [];
	try {
		conn = await mysql.createConnection(dbConf);
		console.log("Andmebaasi ühendus loodud");
		const [rows, fields] = await conn.execute(sqlReq)
		res.render("filmiinimesed", {personList: rows});
	}
	catch(err) {
		console.log("Viga: " + err);
		res.render("filmiinimesed", {personList: []});
		
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasi ühendus suletud!");
		}
	}
};

//@desc Home page for adding people involved in Estonian movie industry
//@route GET /eestifilm/filmiinimesed_add
//@access public

const filmPeopleAdd = (req, res)=>{
	res.render("filmiinimesed_add", {notice: "Ootan sisestust!"});
};

//@desc Home page for submitting people involved in Estonian movie industry
//@route GET /eestifilm/filmiinimesed_add
//@access public

const filmPeopleAddPost = async (req, res)=>{
	let conn;
	let sqlReq = "INSERT INTO person (first_name, last_name, born, deceased) VALUES (?,?,?,?)";
	if(!req.body.firstNameInput || !req.body.lastNameInput || !req.body.bornInput || req.body.bornInput > new Date()){
		res.render("filmiinimesed_add", {notice: "Andmed on vigased!"});
		return;
	}
	try {
		conn = await mysql.createConnection(dbConf);
		console.log("Andmebaasi ühendus loodud");
		let deceasedDate = null;
		if(req.body.deceasedInput != ""){
			deceasedDate = req.body.deceasedInput;
		}
		const [result] = await conn.execute(sqlReq, [req.body.firstNameInput, req.body.lastNameInput, req.body.bornInput, deceasedDate]);
		console.log("Salvestati kirje id: " + result.insertId);
		res.render("filmiinimesed_add", {notice: "Andmed edukalt salvestatud!"});
	}
	catch(err){
		console.log("Viga: " + err);
		res.render("filmiinimesed_add", {notice: "Tekkis tehniline viga!"});
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasi Ühendus suletud!");
		}
	}
};

//@desc Home page for professionals involved in movie industry
//@route GET /eestifilm/ametid
//@access public

const filmPosition = async (req, res)=>{
	let conn;
	const sqlReq = "SELECT * FROM `position`";
	let personList = [];
	try {
		conn = await mysql.createConnection(dbConf);
		console.log("Andmebaasi ühendus loodud");
		const [rows, fields] = await conn.execute(sqlReq)
		res.render("ametid", {positionList: rows});
	}
	catch(err) {
		console.log("Viga: " + err);
		res.render("ametid", {positionList: []});
		
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasi ühendus suletud!");
		}
	}
};

//@desc Home page for adding professionals involved in movie industry
//@route GET /eestifilm/ametid_add
//@access public

const filmPositionAdd = (req, res)=>{
	res.render("ametid_add", {notice: "Ootan sisestust!"});
};

//@desc page for submitting professions involved in movie industry
//@route POST /eestifilm/ametid_add
//@access public

const filmPositionAddPost = async (req, res)=>{
	let conn;
	let sqlReq = "INSERT INTO `position` (position_name, description) VALUES (?,?)";
	if(!req.body.positionNameInput || !req.body.positionDescriptionInput){
		res.render("ametid_add", {notice: "Andmed on vigased!"});
		return;
	}
	try {
		conn = await mysql.createConnection(dbConf);
		console.log("Andmebaasi ühendus loodud");
		const [result] = await conn.execute(sqlReq, [req.body.positionNameInput, req.body.positionDescriptionInput]);
		console.log("Salvestati kirje id: " + result.insertId);
		res.render("ametid_add", {notice: "Andmed edukalt salvestatud!"});
	}
	catch(err){
		console.log("Viga: " + err);
		res.render("ametid_add", {notice: "Tekkis tehniline viga!"});
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasi Ühendus suletud!");
		}
	}
};

//@desc Home page for movies in the movie industry
//@route GET /eestifilm/filmid
//@access public

const films = async (req, res)=>{
	let conn;
	const sqlReq = "SELECT * FROM movie";
	let movieList = [];
	try {
		conn = await mysql.createConnection(dbConf);
		console.log("Andmebaasi ühendus loodud");
		const [rows, fields] = await conn.execute(sqlReq)
		res.render("filmid", {movieList: rows});
	}
	catch(err) {
		console.log("Viga: " + err);
		res.render("filmid", {movieList: []});
		
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasi ühendus suletud!");
		}
	}
};

//@desc Home page for adding movies in the movie industry
//@route GET /eestifilm/filmid_add
//@access public

const filmsAdd = (req, res)=>{
	res.render("filmid_add", {notice: "Ootan sisestust!"});
};

//@desc page for submitting movies in the movie industry
//@route POST /eestifilm/filmid_add
//@access public

const filmsAddPost = async (req, res) =>{
	let conn;
	let sqlReq = "INSERT INTO movie (title, production_year, duration) VALUES (?,?,?)";
	if(!req.body.titleInput || !req.body.durationInput || !req.body.yearInput || req.body.yearInput >= new Date()){
		res.render("filmid_add", {notice: "Andmed on vigased!"});
	}
	else {
		try {
		conn = await mysql.createConnection(dbConf);
		console.log("Andmebaasiühendus loodud!");
		const [result] = await conn.execute(sqlReq, [req.body.titleInput, req.body.yearInput, req.body.durationInput]);
		console.log("Salvestati kirje id: " + result.insertId);
		res.render("filmid_add", {notice: "Andmed on vigased!"});
		}
	catch(err){
		console.log("Viga: " + err);
		res.render("ametid_add", {notice: "Tekkis tehniline viga!"});
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasi Ühendus suletud!");
		}
	}
}};

module.exports = {
	filmHomePage,
	filmPeople,
	filmPeopleAdd,
	filmPeopleAddPost,
	filmPosition,
	filmPositionAdd,
	filmPositionAddPost,
	films,
	filmsAdd,
	filmsAddPost
};