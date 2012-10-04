seajs.config({
    alias:{
        'jquery':'./jquery.min.js'
    },
    preload:['jquery']
});

seajs.use(['./calendar'], function (calendar) {
    var month_table_body = $("#month-table-body");
    var today = calendar.getCurrentDayInfo();
    window.today = today;
    var firstDayOfCurrent = new Date();
    firstDayOfCurrent.setDate(1);
    window.currentMonth = new calendar.DayInfo(firstDayOfCurrent);

    function showMonth(oneDayOfMonth) {
        month_table_body.html('');
        var daysOfCurrentMonth = calendar.getMonthOfDay(oneDayOfMonth);
        var line = $("");
        var j = 0;
        var tmpDayItem = $("");
        for (var i in daysOfCurrentMonth) {
            var day = daysOfCurrentMonth[i];
            tmpDayItem = $("<td date='" + day.year + "-" + day.month + "-" + day.day + "'>" + day.day + "</td>");
            if (i == 0) { // 本月第一天
                line = $("<tr></tr>");
                for (j = 0; j < day.weekDay % 7; j++) { // 本月第一天前weekday天空着（暂时）
                    line.append($("<td></td>"));
                }
                line.append(tmpDayItem);
                month_table_body.append(line);
                if (day.weekDay == 6) {
                    line = $("<tr></tr>");
                    month_table_body.append(line);
                }
            } else {
                line.append(tmpDayItem);
                if (day.weekDay == 6) {
                    line = $("<tr></tr>");
                    month_table_body.append(line);
                } else if (i == daysOfCurrentMonth.length - 1) {
                    for (j = 0; j < 6 - day.weekDay % 7; j++) { // 最后一天后天几格全部空着（暂时））
                        line.append($("<td></td>"));
                    }
                }
            }
            if (calendar.isSameDay(day, today)) {
                tmpDayItem.addClass('today-item');
            }
        }
    }

    showMonth(today);

    $("#month-table-body>tr>td[date]").live('click', function () {
        var date = $(this).attr('date');
        $("#day_detail_title").text(date);
    });

    $("#previous_month").click(function () {
        var tmpDay = new Date(window.currentMonth.date);
        tmpDay.setMonth(tmpDay.getMonth() - 1);
        var tmpDayInfo = new calendar.DayInfo(tmpDay);
        showMonth(tmpDayInfo);
        window.currentMonth = tmpDayInfo;
    });

    $("#next_month").click(function () {
        var tmpDay = new Date(window.currentMonth.date);
        tmpDay.setMonth(tmpDay.getMonth() + 1);
        var tmpDayInfo = new calendar.DayInfo(tmpDay);
        showMonth(tmpDayInfo);
        window.currentMonth = tmpDayInfo;
    });

    $("#previous_year").click(function() {
        var tmpDay = new Date(window.currentMonth.date);
        tmpDay.setFullYear(tmpDay.getFullYear() - 1);
        var tmpDayInfo = new calendar.DayInfo(tmpDay);
        showMonth(tmpDayInfo);
        window.currentMonth = tmpDayInfo;
    });

    $("#next_year").click(function() {
        var tmpDay = new Date(window.currentMonth.date);
        tmpDay.setFullYear(tmpDay.getFullYear() + 1);
        var tmpDayInfo = new calendar.DayInfo(tmpDay);
        showMonth(tmpDayInfo);
        window.currentMonth = tmpDayInfo;
    });

});