
$(document).ready(function () {

// date of searched city
    var datePosted = moment().format('MM/DD/YY)    ');
    $("#dateToday").text(datePosted);

// dates for 5-Day forecast
    $("#dateToday").text(datePosted);

// day 1
    var dateOne = moment().add(1, 'day').format('MM/DD/YY');
    $("#dateDay1").text(dateOne);
  
// day 2
    var dateTwo = moment().add(2, 'days').format('MM/DD/YY');
    $("#dateDay2").text(dateTwo);

// day 3
    var dateThree = moment().add(3, 'days').format('MM/DD/YY');
    $("#dateDay3").text(dateThree);

// day 4
    var dateFour = moment().add(4, 'days').format('MM/DD/YY');
    $("#dateDay4").text(dateFour);

// day 5
    var dateFive = moment().add(5, 'days').format('MM/DD/YY');
    $("#dateDay5").text(dateFive);


















// }

