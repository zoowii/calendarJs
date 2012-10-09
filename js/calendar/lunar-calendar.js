/*
 *PFA 边栏模块使用组件
 *农历Javascript类库，由Abe网络收集，并进行了更改，版权归原作者
 *
 *
 */
define(function (require, exports, module) {
    var lunarInfo = new Array(0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af, 0x9ad0, 0x55d2, 0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd295, 0xb54f, 0xd6a0, 0xada2, 0x95b0, 0x4977, 0x497f, 0xa4b0, 0xb4b5, 0x6a50, 0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970, 0x6566, 0xd4a0, 0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f, 0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2, 0xa950, 0xb557, 0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573, 0x52bf, 0xa9a8, 0xe950, 0x6aa0, 0xaea6, 0xab50, 0x4b60, 0xaae4, 0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0, 0x96d0, 0x4dd5, 0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6, 0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46, 0xab60, 0x9570, 0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58, 0x5ac0, 0xab60, 0x96d5, 0x92e0, 0xc960, 0xd954, 0xd4a0, 0xda50, 0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5, 0xa950, 0xb4a0, 0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930, 0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260, 0xea65, 0xd530, 0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0, 0xd0b6, 0xd25f, 0xd520, 0xdd45, 0xb5a0, 0x56d0, 0x55b2, 0x49b0, 0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0, 0x4b63, 0x937f, 0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef, 0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0, 0xa6d0, 0x55d4, 0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50, 0x55a0, 0xaba4, 0xa5b0, 0x52b0, 0xb273, 0x6930, 0x7337, 0x6aa0, 0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260, 0xe968, 0xd520, 0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252, 0xd520);

    var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
    var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
    var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
    var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
    var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
    var nStr2 = new Array('初', '十', '廿', '卅', '卌');
    var monthName = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月");

    function cMonthStr(m) {
        return monthName[m];
    }

    /*****************************************************************************
     日期計算
     *****************************************************************************/
//============================== 傳回農曆 y年的總天數
    function lYearDays(y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1)
            sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
        return (sum + leapDays(y));
    }

//============================== 傳回農曆 y年閏月的天數
    function leapDays(y) {
        if (leapMonth(y))
            return ((lunarInfo[y - 1899] & 0xf) == 0xf ? 30 : 29);
        else
            return (0);
    }

//============================== 傳回農曆 y年閏哪個月 1-12 , 沒閏傳回 0
    function leapMonth(y) {
        var lm = lunarInfo[y - 1900] & 0xf;
        return (lm == 0xf ? 0 : lm);
    }

//============================== 傳回農曆 y年m月的總天數
    function monthDays(y, m) {
        return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
    }

//============================== 算出農曆, 傳入日期物件, 傳回農曆日期物件
//                               該物件屬性有 .year .month .day .isLeap
    function Lunar(objDate) {

        var i, leap = 0, temp = 0;
        var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

        for (i = 1900; i < 2100 && offset > 0; i++) {
            temp = lYearDays(i);
            offset -= temp;
        }

        if (offset < 0) {
            offset += temp;
            i--;
        }

        this.year = i;

        leap = leapMonth(i); //閏哪個月
        this.isLeap = false;

        for (i = 1; i < 13 && offset > 0; i++) {
            //閏月
            if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
                --i;
                this.isLeap = true;
                temp = leapDays(this.year);
            }
            else {
                temp = monthDays(this.year, i);
            }

            //解除閏月
            if (this.isLeap == true && i == (leap + 1))
                this.isLeap = false;

            offset -= temp;
        }

        if (offset == 0 && leap > 0 && i == leap + 1)
            if (this.isLeap) {
                this.isLeap = false;
            }
            else {
                this.isLeap = true;
                --i;
            }

        if (offset < 0) {
            offset += temp;
            --i;
        }

        this.month = i;
        this.day = offset + 1;
    }

//============================== 傳回國曆 y年某m+1月的天數
    function solarDays(y, m) {
        if (m == 1)
            return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
        else
            return (solarMonth[m]);
    }

//============================== 傳入 offset 傳回干支, 0=甲子
    function cyclical(num) {
        return (Gan[num % 10] + Zhi[num % 12]);
    }

    function canimal(num) {
        return (Animals[num % 12]);
    }

//============================== 月曆屬性
    function LunarDay(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay, cA) {
        this.isToday = false;
        //國曆
        this.sYear = sYear; //西元年4位數字
        this.sMonth = sMonth; //西元月數字
        this.sDay = sDay; //西元日數字
        this.week = nStr1[week]; //星期, 1個中文
        this.weekIndex = week;//星期，索引数字
        //農曆
        this.lYear = lYear; //西元年4位數字
        this.lMonth = lMonth; //農曆月數字
        this.lDay = lDay; //農曆日數字
        this.lDayName = cDayStr(lDay);
        this.lMonthName = cMonthStr(lMonth);
        this.isLeap = isLeap; //是否為農曆閏月?
        //八字
        this.cYear = cYear; //年柱, 2個中文
        this.cMonth = cMonth; //月柱, 2個中文
        this.cDay = cDay; //日柱, 2個中文
        this.cA = cA;


        this.color = '';
        if (week == 0 || week == 6)
            this.color = "red";
        this.solarTerms = ''; //節氣
        //
        this.title = "公元"+this.sYear+"年"+this.sMonth+"月"+this.sDay+"日星期"+this.week+"\n"+"农历"+this.lMonthName+this.lDayName+"\n"+this.cYear+"("+this.cA+")年"+this.cMonth+"月"+this.cDay+"日";
    }

    //===== 某年的第n個節氣為幾日(從0小寒起算)
    var solarTermBase = new Array(4, 19, 3, 18, 4, 19, 4, 19, 4, 20, 4, 20, 6, 22, 6, 22, 6, 22, 7, 22, 6, 21, 6, 21);
    var solarTermIdx = '0123415341536789:;<9:=<>:=1>?012@015@015@015AB78CDE8CD=1FD01GH01GH01IH01IJ0KLMN;LMBEOPDQRST0RUH0RVH0RWH0RWM0XYMNZ[MB\\]PT^_ST`_WH`_WH`_WM`_WM`aYMbc[Mde]Sfe]gfh_gih_Wih_WjhaWjka[jkl[jmn]ope]qph_qrh_sth_W';
    var solarTermOS = '211122112122112121222211221122122222212222222221222122222232222222222222222233223232223232222222322222112122112121222211222122222222222222222222322222112122112121222111211122122222212221222221221122122222222222222222222223222232222232222222222222112122112121122111211122122122212221222221221122122222222222222221211122112122212221222211222122222232222232222222222222112122112121111111222222112121112121111111222222111121112121111111211122112122112121122111222212111121111121111111111122112122112121122111211122112122212221222221222211111121111121111111222111111121111111111111111122112121112121111111222111111111111111111111111122111121112121111111221122122222212221222221222111011111111111111111111122111121111121111111211122112122112121122211221111011111101111111111111112111121111121111111211122112122112221222211221111011111101111111110111111111121111111111111111122112121112121122111111011111121111111111111111011111111112111111111111011111111111111111111221111011111101110111110111011011111111111111111221111011011101110111110111011011111101111111111211111001011101110111110110011011111101111111111211111001011001010111110110011011111101111111110211111001011001010111100110011011011101110111110211111001011001010011100110011001011101110111110211111001010001010011000100011001011001010111110111111001010001010011000111111111111111111111111100011001011001010111100111111001010001010000000111111000010000010000000100011001011001010011100110011001011001110111110100011001010001010011000110011001011001010111110111100000010000000000000000011001010001010011000111100000000000000000000000011001010001010000000111000000000000000000000000011001010000010000000';

    function sTerm(y, n) {
        return (solarTermBase[n] + Math.floor(solarTermOS.charAt((Math.floor(solarTermIdx.charCodeAt(y - 1900)) - 48) * 24 + n)));
    }


//============================== 中文日期
    function cDayStr(d) {
        var s;

        switch (d) {
            case 10:
                s = '初十';
                break;
            case 20:
                s = '二十';
                break;
                break;
            case 30:
                s = '三十';
                break;
                break;
            default:
                s = nStr2[Math.floor(d / 10)];
                s += nStr1[d % 10];
        }
        return (s);
    }

    function cNum(n) {
        var r = String(n);
        var strNum = '零一二三四五六七八九';
        r = r.replace(/^(\d)(\d)$/, "$1十$2");
        r = r.replace(/^(\d)(\d)(\d)$/, "$1百$2十$3");
        r = r.replace(/(\d)/g, function ($0, $1) {
            return (strNum.charAt($1))
        });
        r = n < 100 ? r.replace(/一十/, "十") : r.replace(/零十/, "零");
        r = r.replace(/零+$/, "");
        return (r);
    }

    function cYNum(n) {
        var r = String(n);
        var strNum = '0123456789';
        r = r.replace(/(\d)/g, function ($0, $1) {
            return (strNum.charAt($1))
        });
        return (r);
    }


//============================== 傳回月曆物件 (y年,m+1月)
    /*
     功能說明: 傳回整個月的日期資料物件
     使用方式: OBJ = new calendar(年,零起算月);
     OBJ.length      傳回當月天數
     OBJ.firstWeek   傳回當月一日星期
     由 OBJ[零起算日].屬性名稱 即可取得各項值
     OBJ[零起算日].isToday  傳回是否為今日 true 或 false
     其他 OBJ[零起算日] 屬性參見 calElement() 中的註解
     */
    function calendar(y, m) {

        var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2, tmp3;
        var cY, cM, cD; //年柱,月柱,日柱
        var lDPOS = new Array(3);
        var n = 0;
        var firstLM = 0;
        var cA;
        sDObj = new Date(y, m, 1, 0, 0, 0, 0); //當月一日日期
        this.length = solarDays(y, m); //國曆當月天數
        this.firstWeek = sDObj.getDay(); //國曆當月1日星期幾
        ////////年柱 1900年立春後為庚子年(60進制36)
        if (m < 2) {
            cY = cyclical(y - 1900 + 36 - 1);
            cA = canimal(y - 1900 + 36 - 1);
        }
        else {
            cY = cyclical(y - 1900 + 36);
            cA = canimal(y - 1900 + 36);
        }
        var term2 = sTerm(y, 2); //立春日期
        ////////月柱 1900年1月小寒以前為 丙子月(60進制12)
        var firstNode = sTerm(y, m * 2) //傳回當月「節」為幾日開始
        cM = cyclical((y - 1900) * 12 + m + 12);

        //當月一日與 1900/1/1 相差天數
        //1900/1/1與 1970/1/1 相差25567日, 1900/1/1 日柱為甲戌日(60進制10)
        var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

        for (var i = 0; i < this.length; i++) {

            if (lD > lX) {
                sDObj = new Date(y, m, i + 1); //當月一日日期
                lDObj = new Lunar(sDObj); //農曆
                lY = lDObj.year; //農曆年
                lM = lDObj.month; //農曆月
                lD = lDObj.day; //農曆日
                lL = lDObj.isLeap; //農曆是否閏月
                lX = lL ? leapDays(lY) : monthDays(lY, lM); //農曆當月最後一天
                if (n == 0)
                    firstLM = lM;
                lDPOS[n++] = i - lD + 1;
            }

            //依節氣調整二月分的年柱, 以立春為界
            if (m == 1 && (i + 1) == term2) {
                cY = cyclical(y - 1900 + 36);
                cA = canimal(y - 1900 + 36);
            }
            //依節氣月柱, 以「節」為界
            if ((i + 1) == firstNode)
                cM = cyclical((y - 1900) * 12 + m + 13);
            //日柱
            cD = cyclical(dayCyclical + i);

            //sYear,sMonth,sDay,week,
            //lYear,lMonth,lDay,isLeap,
            //cYear,cMonth,cDay
            this[i] = new LunarDay(y, m + 1, i + 1, (i + this.firstWeek) % 7, lY, lM, lD++, lL, cY, cM, cD, cA);
        }

        //节气
        tmp1 = sTerm(y, m * 2) - 1;
        tmp2 = sTerm(y, m * 2 + 1) - 1;
        this[tmp1].solarTerms = solarTerm[m * 2];
        this[tmp1].title += "\n"+solarTerm[m * 2];
        this[tmp2].solarTerms = solarTerm[m * 2 + 1];
        this[tmp2].title += "\n" + solarTerm[m*2 + 1];


        //今日
        var today = new Date();
        var tY = today.getFullYear();
        var tM = today.getMonth();
        var tD = today.getDate();
        today = null;
        if (y == tY && m == tM)
            this[tD - 1].isToday = true;

    }

    function simuCalendar(y, m) {
        var _cal = new calendar(y, m);
        var _d = new Date(y, m-1, 1, 0, 0, 0);
        var _pre_cal = new calendar(_d.getFullYear(), _d.getMonth());
        var _n_d = new Date(y, m+1, 1, 0, 0, 0);
        var _nxt_cal = new calendar(_n_d.getFullYear(), _n_d.getMonth());

        this.firstWeek = _cal.firstWeek;

        var _p_n = this.firstWeek===0?7:this.firstWeek;
        var idx = 0, _p_i = _pre_cal.length - _p_n;
        for(var i=0;i<_p_n;i++) {
            this[idx++] = _pre_cal[_p_i + i];
        }
        for(var i=0;i<_cal.length;i++) {
            this[idx++] = _cal[i];
        }
        var _n_n = 42 - _cal.length - _p_n;
        for(var i=0;i<_n_n;i++) {
            this[idx++] = _nxt_cal[i];
        }
    }
    exports.get = function(year, month) {
        console.log("lunar create");
        return new simuCalendar(year, month - 1);
    }
    exports.cDayStr = cDayStr;
    exports.cNum = cNum;
    exports.cYNum = cYNum;
});
