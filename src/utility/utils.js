// Returns an array of dates between the two dates
export var getDates = function (startDate, endDate) {
    var dates = [],
        currentDate = startDate,
        addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        var dd = `0${currentDate.getDate()}`.slice(-2);
        var mm = `0${currentDate.getMonth() + 1}`.slice(-2); 
        var yyyy = currentDate.getFullYear();
        dates.push(`${yyyy}-${mm}-${dd}`);
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};

export var getRandomColor = function () {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}