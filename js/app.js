seajs.use(['./js/calendar/calendar.html.js'], function (calendar) {
    var cal = calendar.create($("#calendar")[0], function (dayInfo) {
        alert(dayInfo.date);
    });
    cal.monthSelect(function (data) {
            alert(data.month);
        }
    );
    calendar.datepicker(document.getElementById('outerCalendar2'), function (dayInfo) {
        alert(dayInfo.date);
    }, 130);
});