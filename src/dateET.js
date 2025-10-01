//function tellDateET(){
exports.tellDateET = function(){
	let timeNow = new Date ();
    const dateNamesET = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
	let monthNamesET = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
	return dateNamesET[timeNow.getDay()] + ", " + timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
}