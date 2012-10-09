define(function (require, exports, module) {
    exports.create = create;

    var calendar = require('./lunar-calendar');
    var today = calendar.getCurrentDayInfo();
    var firstDayOfCurrent = new Date();
    firstDayOfCurrent.setDate(1);

    function create(calendarElement, datePickHandler) {



        var currentPageSelectShow = $("<span class='calendar-page-title cursor-default'></span>");
        var calendarOuter = $(calendarElement);
        calendarOuter.html('');
        var outer1 = $("<div style='height:25px;'></div>");
        var previousBtn = $("<span class='calendar-btn previous-page-btn cursor-default'>&lArr;</span>");
        var nextBtn = $("<span class='calendar-btn next-page-btn cursor-default'>&rArr;</span>");
        var backToTodayBtn = $("<span class='back-to-today-btn cursor-default'>Today</span>");
        outer1.append(previousBtn);
        outer1.append(currentPageSelectShow);
        outer1.append(backToTodayBtn);
        outer1.append(nextBtn);
        calendarOuter.append(outer1);

        var monthTable = _initMonthTable();
        var yearTable = _initYearTable();
        var calendarTable = $("<table class='calendar-table'></table>");
        calendarOuter.append(calendarTable);
        calendarOuter.append(monthTable);
        calendarTable.append(yearTable);



        var log = _.bind(console.log, console);
        var calendarState = {
                daySelectHandler:dateSelectHandler,
                monthSelectHandler:undefined,
                yearSelectHandler:undefined,
                currentMonth:new calendar.DayInfo(firstDayOfCurrent),
                selectedDay:null,
                today:today,
                type:'day',
                onChangePage:function () {
                    if (this.type == 'day') {
                        currentPageSelectShow.html(calendar.toString(this.currentMonth, 'Y-M'));
                        this.showDaySelect();
                    } else if (this.type == 'month') {
                        currentPageSelectShow.html(calendar.toString(this.currentMonth, 'Y'));
                        this.showMonthSelect();
                    } else if (this.type == 'year') {
                        currentPageSelectShow.html(calendar.toString(this.currentMonth, 'Y-RANGE'));
                        this.showYearSelect();
                    }
                },
                backToDoday:function () {
                    this.type = 'day';
                    this.changePage(this.today);
                },
                changePage:function (monthDayInfo) {
                    this.currentMonth = monthDayInfo;
                    this.onChangePage();
                },
                triggerTypeChange:_.throttle(function () {
                    if (this.type == 'day') {
                        this.changeType('month');
                    } else if (this.type == 'month') {
                        this.changeType('year');
                    } else if (this.type == 'year') {
                        this.changeType('day');
                    } else {

                    }
                }, 200),
                changeType:function (type) {
                    this.type = type;
                    this.onChangePage();
                },
                previous:function () {
                    if (this.type == 'day') {
                        var tmpDayInfo = calendar.getLastMonth(this.currentMonth);
                        this.changePage(tmpDayInfo);
                    } else if (this.type == 'month') {
                        var tmpDayInfo = calendar.getLastYear(this.currentMonth);
                        this.changePage(tmpDayInfo);
                    } else if (this.type == 'year') {
                        var tmpDayInfo = calendar.yearsAround(this.currentMonth, -10);
                        this.changePage(tmpDayInfo);
                    }
                },
                next:function () {
                    if (this.type == 'day') {
                        var tmpDayInfo = calendar.getNextMonth(this.currentMonth);
                        this.changePage(tmpDayInfo);
                    } else if (this.type == 'month') {
                        var tmpDayInfo = calendar.getNextYear(this.currentMonth);
                        this.changePage(tmpDayInfo);
                    } else if (this.type == 'year') {
                        var tmpDayInfo = calendar.yearsAround(this.currentMonth, 10);
                        this.changePage(tmpDayInfo);
                    }
                },
                showDaySelect:_.throttle(function () {
                    function generateItem(dayInfo) {
                        var dateVal = dayInfo.year + "-" + dayInfo.month + "-" + dayInfo.day;
                        var td = $("<td class='day-item' date='" + dateVal + "'>" + dayInfo.day + "</td>");
                        td.addClass('day-item');
                        td.addClass('date-item');
                        td.attr('data', dateVal);
                        return td;
                    }

                    calendarTable.html('');
                    var thead = $("<thead><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></thead>");
                    calendarTable.append(thead);
                    month_table_body = $("<tbody></tbody>");
                    var daysOfCurrentMonth = calendar.getMonthOfDay(this.currentMonth);
                    var line, tmpLine;
                    var j = 0;
                    var tmpDayItem = $("");
                    var showMoreInUp = false; // 在第一行之前显示上个月的一周
                    for (var i in daysOfCurrentMonth) {
                        var day = daysOfCurrentMonth[i];
                        tmpDayItem = generateItem(day);
                        if (i == 0) { // 本月第一天
                            if (day.weekDay % 7 == 0) {
                                tmpLine = $("<tr></tr>");
                                for (j = 7; j > 0; j--) {
                                    var td = calendar.daysAround(day, -(j + (day.weekDay % 7)));
                                    var toAdd = generateItem(td);
                                    toAdd.addClass('lastMonthItem');
                                    tmpLine.append(toAdd);
                                }
                                showMoreInUp = true;
                                month_table_body.append(tmpLine);
                            }
                            line = $("<tr></tr>");
                            for (j = 0; j < day.weekDay % 7; j++) { // 本月第一天前weekday % 7天
                                var td = calendar.daysAround(day, -(day.weekDay % 7 - j));
                                var toAdd = generateItem(td);
                                toAdd.addClass('lastMonthItem');
                                line.append(toAdd);
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
                            } else if (i == daysOfCurrentMonth.length - 1) { // 最后一天
                                for (j = 0; j < 6 - day.weekDay % 7; j++) { // 最后一天后几天
                                    var td = calendar.daysAround(day, j + 1);
                                    var toAdd = generateItem(td);
                                    toAdd.addClass('nextMonthItem');
                                    line.append(toAdd);
                                }
                            }
                        }
                        if (calendar.isSameDay(day, today)) {
                            tmpDayItem.addClass('today-item');
                        }
                        if (i == daysOfCurrentMonth.length - 1) { // 最后一天后面加上下个月的前几天
                            if (showMoreInUp == false) {
                                tmpLine = $("<tr></tr>");
                                for (j = 1; j <= 7; j++) {
                                    var td = calendar.daysAround(day, 6 - day.weekDay + j);
                                    var toAdd = generateItem(td);
                                    toAdd.addClass('nextMonthItem');
                                    tmpLine.append(toAdd);
                                }
                                month_table_body.append(tmpLine);
                            }
                        }
                    }
                    calendarTable.append(month_table_body);
                    (_.once(function () {
                        calendarOuter.show();
                    }))();
                }, 100),
                showMonthSelect:function () {

                },
                showYearSelect:function () {

                },
                // 绑定事件
                daySelect:function (func) {
                    this.daySelectHandler = func;
                },
                monthSelect:function (func) {
                    this.monthSelectHandler = func;
                },
                yearSelect:function (func) {
                    this.yearSelectHandler = func;
                },
                onItemClick:_.throttle(function (clickedElement) {
                    if (this.type == 'day') {
                        var date = $(clickedElement).attr('date');
                        var tmp = date.split('-');
                        date = new Date(tmp[0], tmp[1] - 1, tmp[2]);
                        var dateInfo = new calendar.DayInfo(date);
                        if (calendar.isSameMonth(dateInfo, this.currentMonth)) {
                            if (_.isFunction(this.daySelectHandler)) {
                                this.daySelectHandler(dateInfo);
                            }
                        } else if (dateInfo.date < new Date(this.currentMonth.year, this.currentMonth.month - 1, 1)) {
                            this.previous();
                        } else if (dateInfo.date >= new Date(this.currentMonth.year, this.currentMonth.month, 1)) {
                            this.next();
                        } else {

                        }
                    } else if (this.type == 'month') {
                        var month = $(clickedElement).attr('data');
                        var tmpDay = new Date(this.currentMonth.date);
                        tmpDay.setDate(1);
                        tmpDay.setMonth(month - 1);
                        this.type = 'day';
                        var dateInfo = new calendar.DayInfo(tmpDay);
                        this.changePage(dateInfo);
                        if (_.isFunction(this.monthSelectHandler)) {
                            this.monthSelectHandler(dateInfo);
                        }
                    } else if (this.type == 'year') {
                        var year = $(clickedElement).attr('data');
                        var tmpDay = new Date(this.currentMonth.date);
                        tmpDay.setDate(1);
                        tmpDay.setFullYear(year);
                        this.type = 'month';
                        var dateInfo = new calendar.DayInfo(tmpDay);
                        this.changePage(dateInfo);
                        if (_.isFunction(this.yearSelectHandler)) {
                            this.yearSelectHandler(dateInfo);
                        }
                    }
                }, 100)
            }
        calendarState.onChangePage();

        previousBtn.click(function () {
            calendarState.previous();
        });

        nextBtn.click(function () {
            calendarState.next();
        });

        backToTodayBtn.click(function () {
            calendarState.backToDoday();
        });

        currentPageSelectShow.click(_.throttle(function () {
            calendarState.triggerTypeChange();
        }, 200));

        return {
            getCurrentPage:function () {
                return calendarState.currentMonth;
            },
            getCurrentPageType:function () {
                return calendarState.type;
            },
            previous:function () {
                return calendarState.previous();
            },
            next:function () {
                return calendarState.next();
            },
            changeToDay:function (date) {
                calendarState.changeType('day');
                if (date != undefined && date instanceof Date) {
                    calendarState.changePage(new calendar.DayInfo(date));
                }
            },
            changeToMonth:function (date) {
                calendarState.changeType('month');
                if (date != undefined && date instanceof Date) {
                    calendarState.changePage(new calendar.DayInfo(date));
                }
            },
            changeToYear:function (date) {
                calendarState.changeType('year');
                if (date != undefined && date instanceof Date) {
                    calendarState.changePage(new calendar.DayInfo(date));
                }
            },
            daySelect:function (func) {
                calendarState.daySelect(func);
            },
            monthSelect:function (func) {
                calendarState.monthSelect(func);
            },
            yearSelect:function (func) {
                calendarState.yearSelect(func);
            }
        };
    }
});