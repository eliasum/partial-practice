// jQuery Hot Keys
(function (jQuery) { jQuery.hotkeys = { version: "0.8", specialKeys: { 8: "backspace", 9: "tab", 10: "return", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause", 20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 59: ";", 61: "=", 96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111: "/", 112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" }, shiftNums: { "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", ".": ">", "/": "?", "\\": "|" }, textAcceptingInputTypes: ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color", "tel"], options: { filterTextInputs: true } }; function keyHandler(handleObj) { if (typeof handleObj.data === "string") { handleObj.data = { keys: handleObj.data } } if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") { return } var origHandler = handleObj.handler, keys = handleObj.data.keys.toLowerCase().split(" "); handleObj.handler = function (event) { if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) || (jQuery.hotkeys.options.filterTextInputs && jQuery.inArray(event.target.type, jQuery.hotkeys.textAcceptingInputTypes) > -1))) { return } var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which], character = String.fromCharCode(event.which).toLowerCase(), modif = "", possible = {}; jQuery.each(["alt", "ctrl", "shift"], function (index, specialKey) { if (event[specialKey + 'Key'] && special !== specialKey) { modif += specialKey + '+' } }); if (event.metaKey && !event.ctrlKey && special !== "meta") { modif += "meta+" } if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) { modif = modif.replace("alt+ctrl+shift+", "hyper+") } if (special) { possible[modif + special] = true } else { possible[modif + character] = true; possible[modif + jQuery.hotkeys.shiftNums[character]] = true; if (modif === "shift+") { possible[jQuery.hotkeys.shiftNums[character]] = true } } for (var i = 0, l = keys.length; i < l; i++) { if (possible[keys[i]]) { return origHandler.apply(this, arguments) } } } } jQuery.each(["keydown", "keyup", "keypress"], function () { jQuery.event.special[this] = { add: keyHandler } }) })(this.jQuery);

// FAdBlock
(function(n){var t=function(t){this._options={checkOnLoad:!1,resetOnEnd:!1,loopCheckTime:50,loopMaxNumber:5,baitClass:"pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",baitStyle:"width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",debug:!1};this._var={version:"3.2.0",bait:null,checking:!1,loop:null,loopNumber:0,event:{detected:[],notDetected:[]}};t!==undefined&&this.setOption(t);var i=this,r=function(){setTimeout(function(){i._options.checkOnLoad===!0&&(i._options.debug===!0&&i._log("onload->eventCallback","A check loading is launched"),i._var.bait===null&&i._creatBait(),setTimeout(function(){i.check()},1))},1)};n.addEventListener!==undefined?n.addEventListener("load",r,!1):n.attachEvent("onload",r)};t.prototype._options=null;t.prototype._var=null;t.prototype._bait=null;t.prototype._log=function(n,t){console.log("[FuckAdBlock]["+n+"] "+t)};t.prototype.setOption=function(n,t){var r,i;t!==undefined&&(r=n,n={},n[r]=t);for(i in n)this._options[i]=n[i],this._options.debug===!0&&this._log("setOption",'The option "'+i+'" he was assigned to "'+n[i]+'"');return this};t.prototype._creatBait=function(){var t=document.createElement("div");t.setAttribute("class",this._options.baitClass);t.setAttribute("style",this._options.baitStyle);this._var.bait=n.document.body.appendChild(t);this._var.bait.offsetParent;this._var.bait.offsetHeight;this._var.bait.offsetLeft;this._var.bait.offsetTop;this._var.bait.offsetWidth;this._var.bait.clientHeight;this._var.bait.clientWidth;this._options.debug===!0&&this._log("_creatBait","Bait has been created")};t.prototype._destroyBait=function(){n.document.body.removeChild(this._var.bait);this._var.bait=null;this._options.debug===!0&&this._log("_destroyBait","Bait has been removed")};t.prototype.check=function(n){if(n===undefined&&(n=!0),this._options.debug===!0&&this._log("check","An audit was requested "+(n===!0?"with a":"without")+" loop"),this._var.checking===!0)return this._options.debug===!0&&this._log("check","A check was canceled because there is already an ongoing"),!1;this._var.checking=!0;this._var.bait===null&&this._creatBait();var t=this;return this._var.loopNumber=0,n===!0&&(this._var.loop=setInterval(function(){t._checkBait(n)},this._options.loopCheckTime)),setTimeout(function(){t._checkBait(n)},1),this._options.debug===!0&&this._log("check","A check is in progress ..."),!0};t.prototype._checkBait=function(t){var i=!1,r;this._var.bait===null&&this._creatBait();(n.document.body.getAttribute("abp")!==null||this._var.bait.offsetParent===null||this._var.bait.offsetHeight==0||this._var.bait.offsetLeft==0||this._var.bait.offsetTop==0||this._var.bait.offsetWidth==0||this._var.bait.clientHeight==0||this._var.bait.clientWidth==0)&&(i=!0);n.getComputedStyle!==undefined&&(r=n.getComputedStyle(this._var.bait,null),(r.getPropertyValue("display")=="none"||r.getPropertyValue("visibility")=="hidden")&&(i=!0));this._options.debug===!0&&this._log("_checkBait","A check ("+(this._var.loopNumber+1)+"/"+this._options.loopMaxNumber+" ~"+(1+this._var.loopNumber*this._options.loopCheckTime)+"ms) was conducted and detection is "+(i===!0?"positive":"negative"));t===!0&&(this._var.loopNumber++,this._var.loopNumber>=this._options.loopMaxNumber&&this._stopLoop());i===!0?(this._stopLoop(),this._destroyBait(),this.emitEvent(!0),t===!0&&(this._var.checking=!1)):(this._var.loop===null||t===!1)&&(this._destroyBait(),this.emitEvent(!1),t===!0&&(this._var.checking=!1))};t.prototype._stopLoop=function(){clearInterval(this._var.loop);this._var.loop=null;this._var.loopNumber=0;this._options.debug===!0&&this._log("_stopLoop","A loop has been stopped")};t.prototype.emitEvent=function(n){var t,i;this._options.debug===!0&&this._log("emitEvent","An event with a "+(n===!0?"positive":"negative")+" detection was called");t=this._var.event[n===!0?"detected":"notDetected"];for(i in t)this._options.debug===!0&&this._log("emitEvent","Call function "+(parseInt(i)+1)+"/"+t.length),t.hasOwnProperty(i)&&t[i]();return this._options.resetOnEnd===!0&&this.clearEvent(),this};t.prototype.clearEvent=function(){this._var.event.detected=[];this._var.event.notDetected=[];this._options.debug===!0&&this._log("clearEvent","The event list has been cleared")};t.prototype.on=function(n,t){return this._var.event[n===!0?"detected":"notDetected"].push(t),this._options.debug===!0&&this._log("on",'A type of event "'+(n===!0?"detected":"notDetected")+'" was added'),this};t.prototype.onDetected=function(n){return this.on(!0,n)};t.prototype.onNotDetected=function(n){return this.on(!1,n)};n.FuckAdBlock=t;n.fuckAdBlock===undefined&&(n.fuckAdBlock=new t({checkOnLoad:!0,resetOnEnd:!0}))})(window)

$(document).ready(function() {
	
	var adtg = 1;
		
	$('#content table').wrap('<div class="table_wrapper"></div>"');

	$('body').on('mouseenter', '.flip', function() {
		$(this).addClass('hover').stop().animate({marginLeft:'170px'},500).addClass('hover');
	})
	.on('mouseleave', '.flip', function() {
		$(this).removeClass('hover').stop().animate({marginLeft:'0px'},500);
	})
	.on('click', '.theme span', function() {
		if(navigator.cookieEnabled){
			var c = getCookies();
			setCookie("theme", 1, 360);			
			window.location.reload();
		}
		else 
			alert('\u0414\u043b\u044f \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0446\u0432\u0435\u0442\u0430 \u043d\u0443\u0436\u043d\u043e \u0432\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u043f\u043e\u0434\u0435\u0440\u0436\u043a\u0443 cookie-\u0444\u0430\u0439\u043b\u043e\u0432 \u0432 \u0412\u0430\u0448\u0435\u043c \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435');
	})
	.on('click', '.wrapper_helper, a[data-action="cancel"]', function() {
		$('.wrapper, .wrapper_img').hide();
		$('.main').removeClass('blur');
	})
	.bind('keydown', 'Ctrl+return', function () {
		var selectText = getSelectionText();
            if (selectText.length > 255) alert("\u0412\u044b \u0432\u044b\u0431\u0440\u0430\u043b\u0438 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u0439 \u043e\u0431\u044a\u0435\u043c \u0442\u0435\u043a\u0441\u0442\u0430!")
            else if (selectText.length < 5 && selectText.length > 0) alert("\u041d\u0443\u0436\u043d\u043e \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u043d\u0435 \u043c\u0435\u043d\u0435\u0435 5 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432!")
			 else if (selectText.length > 4) {
				$('.wrapper_img').show().css({'margin-top': 0, 'margin-left': 0});
                $('.wrapper').show();
				$('.main').addClass('blur');
				$('.wrapper_img').empty().append($('#error-tmpl').tmpl({ Text: selectText }));
            }
	})
	.on('click', 'a[data-action="send"]', function() {
		$.ajax({
			url:"../../../../my/csharp/charp_theory/level1/senderrorindex.php",
			type: 'post',
			dataType: 'json',
			data: {text: $(this).prevAll('[name="text"]').val(),
				   error_comment: $(this).prevAll('[name="error_comment"]').val()}
		});
		
		$('.wrapper').hide();
		$('.main').removeClass('blur');
	})
	.on('click', 'div[class*="14073"]', function() {
		
		if (adtg == 1) {
			$(this).animate({
				height: 350}, 400);
			$('div[class*="22505"]').addClass('down');
		}
		else {
			$(this).animate({
				height: 50}, 400);
			$('div[class*="22505"]').removeClass('down');
		}
		
		adtg = adtg == 1 ? 0 : 1;
	});

	hljs.initHighlightingOnLoad();
	
	if(typeof fuckAdBlock === 'undefined') {
         abDetected();
	} else {
    	fuckAdBlock.onDetected(abDetected);
    	fuckAdBlock.onNotDetected(abNotDetected);
	}	
	
	jQuery('body').redraw();
});

jQuery.fn.redraw = function() {
    return this.hide(0, function(){jQuery(this).show()});
};

function abDetected() {
	setTimeout(function() {
		$('div[class*="14073"]').fadeIn(350);
		$('body').addClass('padding-lock');
	}, 1500);
};

function abNotDetected() {};

function setCookie(name,value,daysToLive){var cookie=name+"="+encodeURIComponent(value);cookie+="; path=/; max-age="+(daysToLive*60*60*24);document.cookie=cookie}function getCookies(){var cookies={};var all=document.cookie;if(all==="")return cookies;var list=all.split("; ");for(var i=0;i<list.length;i++){var cookie=list[i];var p=cookie.indexOf("=");var name=cookie.substring(0,p);var value=cookie.substring(p+1);value=decodeURIComponent(value);cookies[name]=value}return cookies}function deleteCookie(name){document.cookie=name+'=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'}

// Выделенный текст на странице
function getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text.replace(/\r?\n/g, "");
}