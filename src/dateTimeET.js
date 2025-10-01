//function tellDateET(){
const tellDateET = function(){
	let timeNow = new Date ();
    const dateNamesET = ["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"];
	let monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
	return dateNamesET[timeNow.getDay()] + ", " + timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
}

//function tellTimeET(){
const tellTimeET = function(){
	let timeNow = new Date ();
	return timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
}

module.exports = {dateAndDay:tellDateET, time:tellTimeET};