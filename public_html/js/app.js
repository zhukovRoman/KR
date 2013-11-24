Array.prototype.max = function() {
var max = this[0];
var len = this.length;
for (var i = 1; i < len; i++) if (this[i] > max) max = this[i];
return max;
};
Array.prototype.min = function() {
var min = this[0];
var len = this.length;
for (var i = 1; i < len; i++) if (this[i] < min) min = this[i];
return min;
};
Array.prototype.avg = function() {
var sum = 0;
var len = this.length;
for (var i = 0; i < len; i++) sum=sum+this[i];
return sum/len;
};
Array.prototype.mediana = function() {
temp = this.sort(function(a,b){return a-b;});
if (this.length % 2 === 0)
    return (temp[this.length/2]+temp[this.length/2+1])/2;
else 
    return (temp[(this.length-1)/2]);
};



if (typeof app === 'undefined' || !app) { var app = {}; }

app.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

app.shuffle = function(o){
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

app.startTimeTest = null;
app.currentPartOfTestTime = null;
app.arrOfLabels = [
    'Печать',
    'Обновить',
    'Отправить',
    'Удалить',
    'Закрыть',
    'Позвонить',
    'Нравится',
    'Домой',
    'Корзина'   
];
app.needLabel = 'Сохранить';
app.arrOfGlyph = [
    '<span class="glyphicon glyphicon-print"></span>',
    '<span class="glyphicon glyphicon-refresh"></span>',
    '<span class="glyphicon glyphicon-send"></span>',
    '<span class="glyphicon glyphicon-trash"></span>',
    '<span class="glyphicon glyphicon-remove"></span>',
    '<span class="glyphicon glyphicon-phone-alt"></span>',
    '<span class="glyphicon glyphicon-heart"></span>',
    '<span class="glyphicon glyphicon-home"></span>',
    '<span class="glyphicon glyphicon-shopping-cart"></span>'   
];
app.needGlyph = '<span class="glyphicon glyphicon-floppy-disk"></span>';
app.results = [];
app.count = 3;
app.currentCount = 0;
app.btnHTML = '<a href="#" class="btn btn-primary btn-lg test-button col-sm-2 @class" onclick="@function@">@text@</a>';
//app.btnCount = 4;
app.btnCount1 = 4;
app.btnCount2 = 9;
app.btnCount3 = 14;
app.currentBtnCount = 0;
app.type=1;
app.currentStyle = '';
var statistic = [];
app.name = "test";
//window.sessionStorage.results = $.toJSON(results); 

app.start = function (btnCount, type, style, name)
{ 
   if (style !== 'undefined') 
       app.currentStyle = style;
   app.currentBtnCount = btnCount;
   app.currentCount = app.count;
   app.name = name;
   app.type=type;
   app.startTimeTest = new Date().getTime();
   app.iteration();
};

app.iteration = function ()
{
    $('.maincontent').html(''); 
    if (app.currentCount===0) {app.endtest (); return;}
    var buttons = [];
    for (var i =app.currentBtnCount; i>0; i-- ){
        var rIndex = app.getRandomInt(0,app.arrOfLabels.length-1);
            if (app.type===1)
                var tmp = app.btnHTML.replace('@text@',app.arrOfLabels[rIndex]);
            else if (app.type === 2)
                var tmp = app.btnHTML.replace('@text@',app.arrOfGlyph[rIndex]+' '+app.arrOfLabels[rIndex]);
            else 
                var tmp = app.btnHTML.replace('@text@',app.arrOfGlyph[rIndex]);
            tmp = tmp.replace('@function@','app.error()');
            tmp = tmp.replace ('@class', app.currentStyle);
            buttons.push(tmp);
    }
    if (app.type===1)
        var tmp = app.btnHTML.replace('@text@',app.needLabel);
    else if (app.type === 2)
        var tmp = app.btnHTML.replace('@text@',app.needGlyph+' '+app.needLabel);
    else 
        var tmp = app.btnHTML.replace('@text@',app.needGlyph);
    tmp = tmp.replace('@function@','app.success()');
    
    tmp = tmp.replace ('@class', app.currentStyle);
    
    buttons.push(tmp);
    
    buttons = app.shuffle(buttons);
    $('.maincontent').append(buttons);
    
    app.currentPartOfTestTime = new Date().getTime();
    app.currentCount--;
};

app.error = function (){
    $('.maincontent').addClass('alert-danger');
    setTimeout(function (){ $('.maincontent').removeClass('alert-danger');},500);
};

app.success = function (){
    app.results.push(new Date().getTime()-app.currentPartOfTestTime);
    $('.maincontent').removeClass('alert-danger');
    app.iteration();
};
app.endtest = function (){
    var res = new Date().getTime()-app.startTimeTest;
//    console.log(res);
//    console.log(app.test1.results);
    
    $('#total').text(res+' мс');
    $('#min').text(app.results.min()+' мс');
    $('#avg').text(app.results.avg()+' мс');
    $('#max').text(app.results.max()+' мс');
    $('.maincontent').html($('#res').html());
    var result = {
        'total': res,
        'min': app.results.min(),
        'max': app.results.max(),
        'avg': app.results.avg(),
        'med': app.results.mediana(),
        'all': app.results
    };
    var tmp = window.localStorage.results;
    if (tmp === 'undefined' || !tmp) { var tmp = []; }
    else 
    var tmp =  $.parseJSON(window.localStorage.results);
    //tmp[app.name] = result;
    //tmp.push(result);
    window.localStorage.setItem(app.name, $.toJSON(result));
    //window.sessionStorage.results = $.toJSON(tmp);
//    console.log($.evalJSON(window.sessionStorage.resultTest1));
};

