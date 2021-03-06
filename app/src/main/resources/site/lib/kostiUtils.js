var contentLib = require('/lib/xp/content');
var portal = require('/lib/xp/portal');
var norseUtils = require('norseUtils');

//Takes post creation date in '2014-10-10' string format as an argument
//and return string with how much time past since creation date
exports.getTimePassedSincePostCreation = function(postCreationDate){
	if(!postCreationDate || (!typeof postCreationDate === 'string' && !postCreationDate instanceof String))
		return null;

	var daysPassed = getDaysDifference(postCreationDate);

	if(daysPassed === 0)
		return 'меньше дня назад';
	else if(daysPassed >= 1 && daysPassed < 31)
		return daysPassed + ' ' + getCyrilicDay(daysPassed) + ' назад';
	else if(daysPassed >= 31 && daysPassed < 366){
		var m = Math.floor((daysPassed - 1)/30.4166);
		return m + ' ' + getCyrilicMonth(m) + ' назад';
	}
	else if(daysPassed >= 366){
		var y = Math.floor((daysPassed - 1)/365.25);
		return y + ' ' + getCyrilicYear(y) + ' назад';
	}

	return null;
}

//Takes Number of days
// and return cyrilic "day/days" word with correct ending
function getCyrilicDay(daysNum){
	if(isNaN(daysNum))
		return null;

	var day = ['день','дня','дней'];
	if(daysNum % 10 === 1 && daysNum % 1000 != 11)
		return day[0];
	else if((daysNum % 10 === 2 && daysNum % 1000 != 12) || (daysNum % 10 === 3 && daysNum % 1000 != 13) || (daysNum % 10 === 4 && daysNum % 1000 != 14))
		return day[1];
	else
		return day[2];
}

//Takes Number of month
// and return cyrilic "month/months" word with correct ending
function getCyrilicMonth(monthNum){
	if(isNaN(monthNum))
		return null;

	var month = ['месяц','месяца','месяцев'];

	if(monthNum % 10 === 1 && monthNum % 1000 != 11)
		return month[0];
	else if((monthNum % 10 === 2 && monthNum % 1000 != 12) || (monthNum % 10 === 3 && monthNum % 1000 != 13) || (monthNum % 10 === 4 && monthNum % 1000 != 14))
		return month[1];
	else
		return month[2];
}

//Takes Number of years
// and return cyrilic "year/years" word with correct ending
function getCyrilicYear(yearNum){
	if(isNaN(yearsNum))
		return null;

	var year = ['год','года','лет'];

	if(yearNum % 10 === 1 && yearNum % 1000 != 11)
		return year[0];
	else if((yearNum % 10 === 2 && yearNum%1000 != 12) || (yearNum % 10 === 3 && yearNum % 1000 != 13) || (yearNum % 10 === 4 && yearNum % 1000 != 14))
		return year[1];
	else
		return year[2];
}

// Takes date in '2014-10-10' string format as an argument
// and returns difference in days between now and passed date.
function getDaysDifference(dateString) {
	if(!dateString || (!typeof dateString === 'string' && !dateString instanceof String))
		return null;

	var creationDate = new Date(dateString).getTime(),
			now = new Date().getTime();

	return Math.round((now-creationDate)/24/60/60/1000);
}