define(function (require, exports, module) {
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var DayInfo = function (date) {
        return {
            year:date.getFullYear(),
            month:date.getMonth() + 1,
            monthLabel:months[date.getMonth()],
            day:date.getDate(),
            weekDay:date.getDay() == 0 ? 7 : date.getDay(),
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

    exports.isSameMonth = function (monthInfo1, monthInfo2) {
        return monthInfo1.year == monthInfo2.year
            && monthInfo1.month == monthInfo2.month;
    };

    exports.getMonthInfo = function (dayInfo) {
        var tmp = new Date(dayInfo.date);
        tmp.setDate(1);
        return new DayInfo(tmp);
    };

    exports.getYearInfo = function (dayInfoOrMonthInfo) {
        var tmp = new Date(dayInfo.date);
        tmp.setDate(1);
        tmp.setMonth(0);
        return new DayInfo(tmp);
    };

    exports.getLastMonth = function (dayInfo) {
        var tmpDay = new Date(dayInfo.date);
        tmpDay.setDate(1);
        tmpDay.setMonth(tmpDay.getMonth() - 1);
        return new DayInfo(tmpDay);
    };

    exports.getNextMonth = function (dayInfo) {
        var tmpDay = new Date(dayInfo.date);
        tmpDay.setDate(1);
        tmpDay.setMonth(tmpDay.getMonth() + 1);
        return new DayInfo(tmpDay);
    };

    exports.getLastYear = function (dayInfoOrMonthInfo) {
        var tmpDay = new Date(dayInfoOrMonthInfo.date);
        tmpDay.setDate(1);
        tmpDay.setFullYear(tmpDay.getFullYear() - 1);
        return new DayInfo(tmpDay);
    };

    exports.getNextYear = function (dayInfoOrMonthInfo) {
        var tmpDay = new Date(dayInfoOrMonthInfo.date);
        tmpDay.setDate(1);
        tmpDay.setFullYear(tmpDay.getFullYear() + 1);
        return new DayInfo(tmpDay);
    };

    /**
     *  get dayInfo before or after some days of some day
     * @param dayInfo
     * @param count
     */
    exports.daysAround = function (dayInfo, count) {
        var tmpDay = new Date(dayInfo.date);
        tmpDay.setDate(tmpDay.getDate() + count);
        return new DayInfo(tmpDay);
    };

    exports.yearsAround = function (dateInfo, count) {
        var tmpDay = new Date(dateInfo.date);
        tmpDay.setDate(1);
        tmpDay.setFullYear(tmpDay.getFullYear() + count);
        return new DayInfo(tmpDay);
    };

    exports.toString = function (dayInfo, format) {
        if (format == 'Y-M') {
            return dayInfo.year + '年' + dayInfo.month + '月';
        } else if (format == 'Y') {
            return dayInfo.year + '年';
        } else if (format == 'Y-RANGE') {
            return parseInt(dayInfo.year / 10) + '0 - ' + parseInt(dayInfo.year / 10) + '9';
        } else {
            return dayInfo.year + '年' + dayInfo.month + '月' + dayInfo.day + '日';
        }
    };

});