/*calendar funcs*/

/* all registred calendars of the page */
var calendarsObjs = [];

function register_new_calendar(idobj, lang) {
    var obj = document.getElementById(idobj);
    a = new CalendarObj(obj, lang);
    calendarsObjs.push(a);
    return a;     
}

function find_CalendarObj_class(Obj, index) {
    for (var i = calendarsObjs.length - 1; i>=0; i--) {
        if (calendarsObjs[i].htmlContainer == Obj || calendarsObjs[i].inputObj == Obj) return index ? i : calendarsObjs[i];
    }
    return null;
}

/* calendar class-object */
function CalendarObj(container, lang) {
    this.htmlContainer = container;
    this.widget = null; //pointer to widget container
    this.inputObj = null; //pointer to input text element of form where string representation of date is stored
    this.lang = lang;
    
    this.hideCalendar = function(ev) {
        targ = (ev.target) ? ev.target : ev.target = ev.srcElement;
        obj = find_CalendarObj_class(targ.parentNode, false);
        if (obj != null)
            obj.widget.style.display = 'none';
        else 
            alert('Calendar object error');
    }

    this.showCalendar = function(ev) {
        targ = (ev.target) ? ev.target : ev.target = ev.srcElement;
        obj = find_CalendarObj_class(targ.parentNode, false);
        if (obj != null)
            obj.doWidget(0, 0);
        else 
            alert('Calendar object error');        
    }
    
    this.getDate = function() {
        var dtStr = this.inputObj.value;
        var expr = /([\d]{1,2}).([\d]{1,2}).([\d]{4})/;
        var res  = expr.exec(dtStr);
        var D = new Date();
        if (res != null) {
            var D = new Date(res[3], res[2] - 1 , res[1]);
            if (D.toString() == 'Invalid Date') D = new Date();
        }
        return D;
    }
    
    this.setDate = function(DT) {
        var mn = DT.getMonth() + 1;
        var da = DT.getDate();
        this.inputObj.value = (da < 10 ? '0' : '') + da + '.' + (mn < 10 ? '0' : '') + mn + '.' + DT.getFullYear();
    }
    
    this.setNHide = function(DTint) {
        var DT = new Date(DTint);
        this.setDate(DT);
        this.widget.style.display = 'none';
    }
    
    this.doWidget = function(mn, ye) { /* mn = +-1 */
        var dt = this.getDate();
        var currentDate = new Date(dt.getFullYear() + ye, dt.getMonth() + mn, dt.getDate());
        var index = find_CalendarObj_class(this.htmlContainer, true);
        var ws = "";
        switch (this.lang) {
        case 'ru':
            var mntArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            break;
        default:
            var mntArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];        
            break;
        }
        ws = '<div onclick="calendarsObjs[' + index + '].widget.style.display = \'none\'" class="close">x</div>';
        ws += '<div class="clear">&#160;</div>';
        ws += '<div style="text-align: center;">';
        ws += '  <a class="monthSlide" href="#" onclick="calendarsObjs[' + index + '].doWidget(-1, 0);">&lt;</a>';
        ws += '  <div class="monthTab" onclick="calendarsObjs[' + index + '].doWidget(0, 0);">' + mntArray[currentDate.getMonth()] + '</div>';
        ws += '  <a class="monthSlide" href="#" onclick="calendarsObjs[' + index + '].doWidget(1, 0);">&gt;</a>';
        ws += '</div>';
        ws += '<div class="clear">&#160;</div>';
        ws += '<div style="text-align: center;">';
        ws += '  <a class="monthSlide" href="#" onclick="calendarsObjs[' + index + '].doWidget(0, -1);">&lt;</a>';
        ws += '  <div class="monthTab" onclick="calendarsObjs[' + index + '].doWidget(0, 0);">' + currentDate.getFullYear() + '</div>';
        ws += '<a class="monthSlide" href="#" onclick="calendarsObjs[' + index + '].doWidget(0, 1);">&gt;</a>';
        ws += '</div>'
        ws += '<div class="clear">&#160;</div>';
        ws += '<div class="month">';
        
        dtm = [currentDate.getMonth(), currentDate.getFullYear()];
    
        dateF = new Date(dtm[1], dtm[0], 1);
        dateL = new Date(dtm[1], dtm[0] + 1, 1);
    
        wd = dateF.getDay() - 1;
        switch (wd){
        case -1:
            dateCRS = new Date(dtm[1], dtm[0], -5);
            break;
        default:
            dateCRS = new Date(dtm[1], dtm[0], 1 - wd);
        }
    
        var out = '<div class="clear">&#160;</div>';
        var nowDate = new Date();
        var nowDateStr = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate();

        while (dateCRS.getTime() < dateL.getTime()) {
            k = 7;
            while(k-- > 0) {
                addStyle = nowDateStr == dateCRS.getFullYear() + '/' + (dateCRS.getMonth() + 1) + '/' + dateCRS.getDate() ? 'curr' : '';
                if (dateCRS < dateF || dateCRS >= dateL) addStyle += ' nonM';
        
                out += '<div class="dayH"><a href="#" onclick="calendarsObjs[' + index + '].setNHide(' + dateCRS.valueOf() + ')"'
                    + ' class="day ' + addStyle + '">' + dateCRS.getDate() + '</a></div>';
                dateCRS.setDate(dateCRS.getDate( ) + 1);
            }
            out += '<div class="clear">&#160;</div>';
        }
        ws += out + '</div>';

        this.setDate(currentDate);
        this.widget.innerHTML = ws;
        this.widget.style.display = 'block';        
    }
    
    /* find input object && widget container */
    for (var i = container.childNodes.length - 1 ; i >= 0; i--) {
        var t = container.childNodes[i];
        if (t.className == 'widgetCalendar' && t.tagName == 'DIV') {
            t.style.width = this.htmlContainer.style.width;
            this.widget = t;
        }
        else
        if (t.tagName == 'INPUT' && t.type == 'text') {
            this.inputObj = t;
            if (t.addEventListener) t.addEventListener('focus', this.showCalendar, false);
            else t.attachEvent("onfocus", this.showCalendar);
        }
    }
}
