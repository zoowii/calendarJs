define(function (require, exports, module) {

    var lunar_helper = require("./lunar-calendar");
    var lunar_hash = {};

    function _delegate(instance, func) {
        return function() {
            func.apply(instance, arguments);
        }
    }

    function _calendar(calendarElement) {
        this.currentPageSelectShow = $("<span class='calendar-page-title cursor-default'></span>");
        var calendarOuter = $(calendarElement);
        var outer1 = $("<div style='height:25px;'></div>");
        this.previousBtn = $("<span class='calendar-btn previous-page-btn cursor-default'>&lArr;</span>");
        this.nextBtn = $("<span class='calendar-btn next-page-btn cursor-default'>&rArr;</span>");
        this.backToTodayBtn = $("<span class='back-to-today-btn cursor-default'>Today</span>");
        outer1.append(this.previousBtn);
        outer1.append(this.currentPageSelectShow);
        outer1.append(this.backToTodayBtn);
        outer1.append(this.nextBtn);
        calendarOuter.append(outer1);

        this.monthTD = [];
        this.yearTD = [];
        this.dayTD = [];
        this.monthTable = null;
        this.yearTable = null;
        this.dayTable = null;

        this.initMonthTable();
        this.initYearTable();
        this.initDayTable();

        calendarOuter.append(this.dayTable);
        calendarOuter.append(this.monthTable);
        calendarOuter.append(this.yearTable);

        this.dayChangeHandler = null;
        this.monthChangeHandler = null;
        this.cur_month = {
            year : 1990,
            month : 4
        };
        var _d = new Date();
        this.cur_day = {
            sYear : _d.getFullYear(),
            sMonth : _d.getMonth() + 1,
            sDay : _d.getDate(),
            isToday : true
        };
        this.view = 'day';

        this.initEvent();
        this.showDayView(this.cur_day.sYear, this.cur_day.sMonth);
    }

    _calendar.prototype = {
        attachChangeHandler : function(name, handler_func) {
           switch (name) {
               case 'day':
                   this.dayChangeHandler = handler_func;
                   break;
               case 'month' :
                  this.monthChangeHandler = handler_func;
                  break;
               default :
                   this.dayChangeHandler = handler_func;
                  break;
           }
        },
        getCalendar : function(y, m) {
            var m_str = y+"-"+m;
            if(!lunar_hash[m_str]) {
                lunar_hash[m_str] = lunar_helper.get(y, m);
            }
            return lunar_hash[m_str];
        },
        showDayView : function(year, month) {
            this.view = "day";
            var cm = this.cur_month;
            if(cm.year !== year || cm.month !== month) {
                var cal = this.getCalendar(year, month);
                for(var i=0;i<42;i++) {
                    var _d = this.dayTD[i], _c = cal[i];
                    _d.attr({
                        "day" : i,
                        "title" : cal[i].title,
                        "class" : ""
                    }).html("<p>"+cal[i].sDay+"</p><p class='lunar-day'>"+ cal[i].lDayName+ "</p>");
                    if(_c.sYear<year || _c.sMonth<month) {
                        _d.addClass("lastMonthItem");
                    } else if(_c.sYear>year || _c.sMonth>month) {
                        _d.addClass("nextMonthItem");
                    }
                    if(_c.isToday) {
                        _d.addClass("today-item");
                    }
                }
                cm.year =  year;
                cm.month = month;
                if(typeof this.monthChangeHandler === 'function') {
                    this.monthChangeHandler(year, month);
                }
            }
            this.currentPageSelectShow.html(cm.year+"年"+cm.month+"月");
            this.monthTable.hide();
            this.yearTable.hide();
            this.dayTable.show();

        },
        showMonthView : function(year) {
            this.view = "month";
            var cm = this.cur_month;

            for(var i=0;i<12;i++) {
                var mt = this.monthTD[i];
                if(Number(mt.attr("month"))===cm.month) {
                    mt.addClass("today-month-item")
                } else {
                    mt.removeClass("today-month-item");
                }
            }

            cm.year =  year;

            this.currentPageSelectShow.html(cm.year+"年");
            this.monthTable.show();
            this.yearTable.hide();
            this.dayTable.hide();
        },
        showYearView : function(year) {
            this.view = 'year';
            var cm = this.cur_month;
            cm.year = year;
            var f = parseInt(year / 10) * 10;
            for(var i=0;i<12;i++) {
                this.yearTD[i].attr("year", f-1+i).text(f-1+i);
            }
            this.currentPageSelectShow.html(f+"-"+(f+9));
            this.monthTable.hide();
            this.yearTable.show();
            this.dayTable.hide();
        },
        changeView : function() {
           switch (this.view) {
               case 'day' :
                   this.showMonthView(this.cur_month.year);
                   break;
               case 'month' :
                   this.showYearView(this.cur_month.year);
                   break;
           }
        },
        previous : function() {
            var cm = this.cur_month;
           switch(this.view) {
               case 'day':
                   var _d = new Date(cm.year, cm.month-2, 1, 0, 0, 0);
                   this.showDayView(_d.getFullYear(), _d.getMonth()+1);
                   break;
               case 'month' :
                   this.showMonthView(cm.year-1);
                   break;
               case 'year' :
                   this.showYearView(cm.year - 10);
                   break;
           }
        },
        next : function() {
            var cm = this.cur_month;
            switch(this.view) {
                case 'day':
                    var _d = new Date(cm.year, cm.month, 1, 0, 0, 0);
                    this.showDayView(_d.getFullYear(), _d.getMonth()+1);
                    break;
                case 'month' :
                    this.showMonthView(cm.year + 1);
                    break;
                case 'year' :
                    this.showYearView(cm.year + 10);
                    break;
            }
        },
        backToToday : function() {
            var _d = new Date();
            this.showDayView(_d.getFullYear(), _d.getMonth()+1);
        },
        initEvent : function() {
            var me = this;
            this.previousBtn.click(function () {
                me.previous();
            });
            this.nextBtn.click(function () {
                me.next();
            });
            this.backToTodayBtn.click(function () {
                me.backToToday();
            });
            this.currentPageSelectShow.click(function () {
                me.changeView();
            });
        },
        initMonthTable : function() {
            this.monthTable = $("<table class='calendar-table'></table>").hide();
            var tbody = $("<tbody></tbody>");
            var months = [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ];
            var me = this;
            for (var i = 0; i < 3; i++) {
                var tr = $("<tr></tr>");
                for (var j = 0; j < 4; j++) {
                    var td = $("<td></td>");
                    td.text(months[4 * i + j]);
                    td.attr({
                        'month' : 4 * i + j + 1,
                        'year' : 1990
                    });
                    td.click(function() {
                        me.onMonthClick(Number($(this).attr("month")));
                    });
                    this.monthTD.push(td);
                    tr.append(td);
                }
                tbody.append(tr);
            }
            this.monthTable.append(tbody);
        },
         initYearTable : function() {
            this.yearTable = $("<table class='calendar-table'></table>").hide()
            var tbody = $("<tbody></tbody>");
            var me = this;
             for (var i = 0; i < 3; i++) {
                var tr = $("<tr></tr>");
                for (var j = 0; j < 4; j++) {
                    var td = $("<td></td>");
                    td.attr('year', 1990).text(1990);
                    td.click(function() {
                        me.onYearClick(Number($(this).attr("year")));
                    });
                    this.yearTD.push(td);
                    tr.append(td);
                }
                tbody.append(tr);
            }
            this.yearTable.append(tbody);
        },
        initDayTable : function() {
            this.dayTable = $("<table class='calendar-table'></table>").hide();
            var thead = $("<thead><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></thead>");
            this.dayTable.append(thead);
            var tbody = $("<tbody></tbody>");

            var me = this;

            for(var i=0;i<6;i++){
                var tr = $("<tr></tr>");
                for(var j=0;j<7;j++) {
                    var td = $("<td class='day-item'></td>").html("1").attr("day", 1);
                    td.click(function() {
                        me.onDayClick(Number($(this).attr("day")));
                    });
                    this.dayTD.push(td);
                    tr.append(td);
                }
                tbody.append(tr);
            }
            this.dayTable.append(tbody);
        },
        onDayClick : function(idx) {
            var cm = this.cur_month,
                cal = lunar_hash[cm.year+"-"+cm.month];
            if(!cal) {
                console.log("wrong at onDayClick");
                return;
            }
            var c_d = cal[idx];
            if(c_d.sYear !== cm.year || c_d.sMonth !== cm.month) {
                this.showDayView(c_d.sYear, c_d.sMonth);
            }
            for(var i=0;i<42;i++) {
                if(i!==idx) {
                    this.dayTD[i].removeClass("select-item");
                } else {
                    this.dayTD[i].addClass("select-item");
                }
            }
            if(!(this.cur_day.sYear===c_d.sYear&&this.cur_day.sMonth===c_d.sMonth&&this.cur_day.sDay===c_d.sDay)){
                if (typeof this.dayChangeHandler === 'function') {
                    this.dayChangeHandler(c_d);
                }
            }
            this.cur_day = c_d;
        },
        onMonthClick : function(month) {
            this.showDayView(this.cur_month.year, month);
        },
        onYearClick : function(year) {
            this.showMonthView(year);
        }
    }

    function create(calendarElement) {
        var _cal = new _calendar(calendarElement);

        return {

            previous:function () {
                return _cal.previous();
            },
            next:function () {
                return _cal.next();
            },
            attachChangeHandler : function(name, handler_func) {
                _cal.attachChangeHandler(name, handler_func);
            }
        }
    }

    exports.create = create;
});