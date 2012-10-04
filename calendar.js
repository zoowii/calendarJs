define(function (require, exports, module) {
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var DayInfo = function (date) {
        return {
            year:date.getFullYear(),
            month: date.getMonth() + 1,
            monthLabel:months[date.getMonth()],
            day:date.getDate(),
            weekDay:date.getDay(),
            hour:date.getHours(),
            minute:date.getMinutes(),
            second:date.getSeconds(),
            date:date
        };
    };
    exports.DayInfo = DayInfo;
    exports.getCurrentDayInfo = function () {
        var now = new Date();
        return new DayInfo(now);
    };
    exports.getWeekOfDay = function (dayInfo) {
        var date = dayInfo.date;
        var mDate = date.getDate();
        var mWeekDay = date.getDay();
        var weekOfDays = [];
        for (var i = -mWeekDay; i < 6 - mWeekDay; i++) { // 当前date加上i就是当周日期，从周日到周六
            var tmpDate = new Date(date);
            tmpDate.setDate(mDate + i);
            weekOfDays.push(new DayInfo(tmpDate));
        }
        return weekOfDays;
    };
    function maxDayOfDate(d) {
        var date1 = new Date(d.getFullYear(), (d.getMonth() + 1), 0);
        return date1.getDate();
    }

    exports.maxDayOfDate = maxDayOfDate;

    exports.getMonthOfDay = function (dayInfo) {
        var date = dayInfo.date;
        var monthOfDay = [];
        for (var i = 1; i <= maxDayOfDate(date); i++) {
            var tmpDate = new Date(date);
            tmpDate.setDate(i);
            monthOfDay.push(new DayInfo(tmpDate));
        }
        return monthOfDay;
    };

    exports.isSameDay = function (dayInfo1, dayInfo2) {
        return dayInfo1.year == dayInfo2.year
            && dayInfo1.month == dayInfo2.month
            && dayInfo1.day == dayInfo2.day;
    };

});