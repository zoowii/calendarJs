seajs.use(['./js/calendar/calendar.html.js'], function (calendar) {
	calendar.create($("#calendar")[0], function(dayInfo) { alert(dayInfo.date); });
});