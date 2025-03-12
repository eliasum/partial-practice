var tutorial = function(t) {
var e = {};
function n(r) {
if (e[r]) return e[r].exports;
var i = e[r] = {
i: r,
l: !1,
exports: {}
};
return t[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
}
return n.m = t, n.c = e, n.d = function(t, e, r) {
n.o(t, e) || Object.defineProperty(t, e, {
enumerable: !0,
get: r
});
}, n.r = function(t) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
value: "Module"
}), Object.defineProperty(t, "__esModule", {
value: !0
});
}, n.t = function(t, e) {
if (1 & e && (t = n(t)), 8 & e) return t;
if (4 & e && "object" == typeof t && t && t.__esModule) return t;
var r = Object.create(null);
if (n.r(r), Object.defineProperty(r, "default", {
enumerable: !0,
value: t
}), 2 & e && "string" != typeof t) for (var i in t) n.d(r, i, function(e) {
return t[e];
}.bind(null, i));
return r;
}, n.n = function(t) {
var e = t && t.__esModule ? function() {
return t.default;
} : function() {
return t;
};
return n.d(e, "a", e), e;
}, n.o = function(t, e) {
return Object.prototype.hasOwnProperty.call(t, e);
}, n.p = "/pack/", n(n.s = 212);
}({
0: function(t, e) {
t.exports = {
lang: "ru",
currency: {
code: "RUB",
sign: "₽"
},
env: "production",
ordersMail: "orders@javascript.info",
providers: [ {
name: "Facebook",
id: "facebook"
}, {
name: "Google+",
id: "google"
}, {
name: "Вконтакте",
id: "vkontakte"
}, {
name: "Github",
id: "github"
}, {
name: "Яндекс",
id: "yandex"
} ],
stripeKey: "pk_live_ukCHHaAAUHELtXYFa9EwbROW"
};
},
1: function(t, e, n) {
"use strict";
var r = new (n(5))("en"), i = console.error;
function o(t) {
return r.hasPhrase(a, t) || i("No such phrase", t), r.t.apply(r, [ a ].concat(Array.prototype.slice.call(arguments)));
}
t.exports = o;
var a = n(0).lang;
"en" !== a && r.setFallback(a, "en"), r.add = function() {
for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
return r.addPhrase.apply(r, [ a ].concat(e));
}, o.i18n = r;
},
10: function(t, e) {
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
105: function(t, e) {
function n(t) {
return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
})(t);
}
t.exports = function(t) {
var e = n(t);
return null != t && ("object" == e || "function" == e);
};
},
106: function(t, e) {
function n(t) {
var e = document.createElement("div"), n = getComputedStyle(t);
return e.style.width = t.offsetWidth + "px", e.style.marginLeft = n.marginLeft, 
e.style.marginRight = n.marginRight, e.style.position = n.position, e.style.height = t.offsetHeight + "px", 
e.style.marginBottom = n.marginBottom, e.style.marginTop = n.marginTop, e;
}
t.exports = function() {
for (var t = document.querySelectorAll("[data-sticky]"), e = 0; e < t.length; e++) {
var r = t[e], i = r.dataset.sticky ? JSON.parse(r.dataset.sticky) : {}, o = i.bottomLimit ? document.querySelector(i.bottomLimit) : null, a = i.container ? document.querySelector(i.container) : document.body, s = !i.minWidth || document.documentElement.clientWidth > i.minWidth;
if (r.placeholder) (r.placeholder.getBoundingClientRect().top > 0 || !s) && (r.style.cssText = "", 
r.classList.remove("sticky"), r.placeholder.parentNode.insertBefore(r, r.placeholder), 
r.placeholder.remove(), r.placeholder = null); else if (r.placeholder && o) o.getBoundingClientRect().top <= r.offsetHeight ? ("fixed" == r.style.position && (r.style.top = window.pageYOffset + "px"), 
r.style.position = "absolute") : (r.style.position = "fixed", r.style.top = 0); else if (r.getBoundingClientRect().top < 0 && s) {
if (r.style.cssText) return;
var l = r.getBoundingClientRect().left, c = i.noPlaceholder ? document.createElement("div") : n(r), u = r.offsetWidth;
r.after(c), a.appendChild(r), r.classList.add("sticky"), r.style.position = "fixed", 
r.style.top = 0, r.style.left = l + "px", r.style.zIndex = 101, r.style.background = "white", 
r.style.margin = 0, r.style.width = u + "px", r.placeholder = c;
}
}
};
},
11: function(t, e, n) {
var r = {
"./ru.yml": 12
};
function i(t) {
var e = o(t);
return n(e);
}
function o(t) {
if (!n.o(r, t)) {
var e = new Error("Cannot find module '" + t + "'");
throw e.code = "MODULE_NOT_FOUND", e;
}
return r[t];
}
i.keys = function() {
return Object.keys(r);
}, i.resolve = o, t.exports = i, i.id = 11;
},
12: function(t, e) {
t.exports = {
site: {
privacy_policy: "политика конфиденциальности",
terms: "пользовательское соглашение",
gdpr_dialog: {
title: "Этот сайт использует cookie",
text: 'Мы используем браузерные технологии, такие как cookie и local storage для хранения ваших предпочтений. Вы принимаете <a href="/privacy">политику конфиденциальности</a> и <a href="/terms">соглашение пользователя</a>?',
accept: "Принять",
cancel: "Отмена"
},
toolbar: {
lang_switcher: {
cta_text: 'Мы хотим сделать этот проект с открытым исходным кодом доступным для людей во всем мире. Пожалуйста, <a href="https://github.com/javascript-tutorial/translate" rel="noopener noreferrer" target="_blank">помогите нам перевести</a> это руководство на свой язык',
footer_text: "количество контента, переведенное на соотвествующий язык",
old_version: "Опубликована полная, но предыдущая версия учебника."
},
logo: {
normal: {
svg: "sitetoolbar__logo_ru.svg",
width: 171
},
"normal-white": {
svg: "sitetoolbar__logo_ru-white.svg"
},
small: {
svg: "sitetoolbar__logo_small_ru.svg",
width: 80
},
"small-white": {
svg: "sitetoolbar__logo_small_ru-white.svg"
}
},
sections: [ {
slug: "tutorial",
url: "/",
title: "Учебник"
}, {
slug: "courses",
title: "Курсы"
}, {
url: "https://javascript.ru/forum/",
title: "Форум"
}, {
url: "https://es5.javascript.ru",
title: "ES5"
}, {
slug: "quiz",
title: "Тесты знаний"
} ],
sections_bak: [ {
slug: "jobs",
title: "Стажировки"
} ],
buy_ebook_extra: "Купить",
buy_ebook: "EPUB/PDF",
search_placeholder: "Искать на Javascript.ru",
search_button: "Найти",
public_profile: "Публичный профиль",
account: "Аккаунт",
notifications: "Уведомления",
admin: "Админ",
logout: "Выйти"
},
sorry_old_browser: "Извините, IE<10 не поддерживается, пожалуйста используйте более новый браузер.",
contact_us: "связаться с нами",
about_the_project: "о проекте",
ilya_kantor: "Илья Кантор",
comments: "Комментарии",
loading: "Загружается...",
search: "Искать",
share: "Поделиться",
read_before_commenting: "перед тем как писать…",
last_updated_at: "Последнее обновление: #{date}",
"tablet-menu": {
choose_section: "Выберите раздел",
search_placeholder: "Поиск в учебнике",
search_button: "Поиск"
},
comment: {
help: [ 'Если вам кажется, что в статье что-то не так - вместо комментария напишите <a href="https://github.com/javascript-tutorial/ru.javascript.info/issues/new">на GitHub</a>.', "Для одной строки кода используйте тег <code>&lt;code&gt;</code>, для нескольких строк кода&nbsp;&mdash; тег <code>&lt;pre&gt;</code>, если больше 10 строк&nbsp;&mdash; ссылку на песочницу (<a href='https://plnkr.co/edit/?p=preview'>plnkr</a>, <a href='http://jsbin.com'>JSBin</a>, <a href='http://codepen.io'>codepen</a>…)", "Если что-то непонятно в статье&nbsp;&mdash; пишите, что именно и с какого места." ]
},
meta: {
description: "Современный учебник JavaScript, начиная с основ, включающий в себя много тонкостей и фишек JavaScript/DOM."
},
edit_on_github: "Редактировать на GitHub",
error: "ошибка",
close: "закрыть",
hide_forever: "не показывать",
hidden_forever: "Эта информация больше не будет выводиться.",
subscribe: {
title: "Следите за обновлениями javascript.ru",
text: "Мы не рассылаем рекламу, все только по делу. Вы сами выбираете, что получать:",
agreement: 'Подписываясь на рассылку, вы соглашаетесь с <a href="#{link}" target="_blank">пользовательским соглашением</a>.',
button: "Подписаться",
button_unsubscribe: "Отписаться от всех",
common_updates: "Общие обновления",
common_updates_text: "новые курсы, интенсивы, выпуски статей и скринкастов",
your_email: "ваш@email",
newsletters: "рассылка,рассылки,рассылок",
no_selected: "Не выбрано"
},
form: {
value_must_not_be_empty: "Значение не должно быть пустым.",
value_is_too_long: "Значение слишком длинное.",
value_is_too_short: "Значение слишком короткое.",
invalid_email: "Некорректный email.",
invalid_value: "Некорректное значение.",
invalid_autocomplete: "Пожалуйста, выберите значение из списка",
invalid_date: "Дата неверна, формат: дд.мм.гггг.",
invalid_range: "Такой даты здесь не может быть.",
save: "Сохранить",
upload_file: "Загрузить файл",
cancel: "Отмена",
server_error: "Ошибка загрузки, статус"
}
}
};
},
13: function(t, e, n) {
var r = {
"./ru.yml": 14
};
function i(t) {
var e = o(t);
return n(e);
}
function o(t) {
if (!n.o(r, t)) {
var e = new Error("Cannot find module '" + t + "'");
throw e.code = "MODULE_NOT_FOUND", e;
}
return r[t];
}
i.keys = function() {
return Object.keys(r);
}, i.resolve = o, t.exports = i, i.id = 13;
},
14: function(t, e) {
t.exports = {
server_connection_error: "Ошибка связи с сервером.",
server_request_timeout: "Превышено максимально допустимое время ожидания ответа от сервера.",
request_aborted: "Запрос был прерван.",
no_response: "Не получен ответ от сервера.",
server_error: "Ошибка на стороне сервера (код #{status}), попытайтесь позднее.",
invalid_format: "Некорректный формат ответа от сервера."
};
},
143: function(t, e, n) {
function r(t) {
return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
})(t);
}
var i = n(270), o = "object" == ("undefined" == typeof self ? "undefined" : r(self)) && self && self.Object === Object && self, a = i || o || Function("return this")();
t.exports = a;
},
144: function(t, e, n) {
var r = n(143).Symbol;
t.exports = r;
},
149: function(t, e, n) {
function r(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
var i = n(267), o = n(3), a = function() {
function t(e) {
var n = this;
!function(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}(this, t), this.elem = e, this.throttleFilter = i(this.filter, 200), this.showTasksCheckbox = e.querySelector("[data-tutorial-map-show-tasks]"), 
this.showTasksCheckbox.checked = +sessionStorage.showTasksCheckbox, this.updateShowTasks(), 
this.showTasksCheckbox.onchange = this.updateShowTasks.bind(this), this.filterInput = this.elem.querySelector("[data-tutorial-map-filter]"), 
this.textInputBlock = this.elem.querySelector(".tutorial-map__filter .text-input"), 
this.filterInput.oninput = this.onFilterInput.bind(this), this.filterInput.onkeydown = this.onFilterKeydown.bind(this), 
this.elem.querySelector(".text-input__clear").onclick = function() {
n.filterInput.value = "", n.showClearButton(!1), n.filter("");
}, this.chaptersCollapsed = JSON.parse(sessionStorage.tutorialMapChapters || "{}"), 
this.showChaptersCollapsed(), this.delegate(".tutorial-map__item > .tutorial-map__link", "click", function(t) {
t.preventDefault();
var e = t.delegateTarget.getAttribute("href");
n.chaptersCollapsed[e] ? delete n.chaptersCollapsed[e] : n.chaptersCollapsed[e] = 1, 
sessionStorage.tutorialMapChapters = JSON.stringify(n.chaptersCollapsed), n.showChaptersCollapsed();
});
var r = this.elem.querySelector('.tutorial-map-list-three__link[href="' + location.pathname + '"]');
r && r.classList.add("tutorial-map-list-three__link_active"), this.filterInput.focus();
}
var e, n, o;
return e = t, (n = [ {
key: "showChaptersCollapsed",
value: function() {
for (var t = this.elem.querySelectorAll(".tutorial-map__item > .tutorial-map__link"), e = 0; e < t.length; e++) {
var n = t[e];
this.chaptersCollapsed[n.getAttribute("href")] ? n.parentNode.classList.add("tutorial-map__item_collapsed") : n.parentNode.classList.remove("tutorial-map__item_collapsed");
}
}
}, {
key: "updateShowTasks",
value: function() {
this.showTasksCheckbox.checked ? this.elem.classList.add("tutorial-map_show-tasks") : this.elem.classList.remove("tutorial-map_show-tasks"), 
sessionStorage.showTasksCheckbox = this.showTasksCheckbox.checked ? "1" : "0";
}
}, {
key: "onFilterInput",
value: function(t) {
this.showClearButton(t.target.value), this.throttleFilter(t.target.value);
}
}, {
key: "onFilterKeydown",
value: function(t) {
27 === t.keyCode && (this.filterInput.value = "", this.showClearButton(!1), this.filter(""));
}
}, {
key: "showClearButton",
value: function(t) {
t ? this.textInputBlock.classList.add("text-input_clear-button") : this.textInputBlock.classList.remove("text-input_clear-button");
}
}, {
key: "focus",
value: function() {
this.elem.tabIndex = -1, this.elem.focus();
}
}, {
key: "filter",
value: function(t) {
t = t.toLowerCase();
var e = this.showTasksCheckbox.checked, n = (this.elem.querySelectorAll(".tutorial-map-list a"), 
this.elem.querySelectorAll(".tutorial-map-list-two__item"));
function r(e) {
return function(t, e) {
var n = 0, r = 0;
for (;n < t.length && r < e.length; ) t[n] === e[r] ? (n++, r++) : n++;
return r === e.length;
}(e.querySelector("a").innerHTML.toLowerCase(), t.replace(/\s/g, ""));
}
for (var i = 0; i < n.length; i++) {
var o = n[i], a = o.querySelectorAll(".tutorial-map-list-three__item"), s = Array.prototype.reduce.call(a, function(t, n) {
var i = !1;
if (e) {
var o = n.querySelectorAll(".tutorial-map-list-four__item");
i = Array.prototype.reduce.call(o, function(t, e) {
var n = r(e);
return e.hidden = !n, t || n;
}, !1);
}
var a = i || r(n);
return n.hidden = !a, t || a;
}, !1);
o.hidden = !(s || r(o));
}
}
} ]) && r(e.prototype, n), o && r(e, o), t;
}();
t.exports = a, o.delegateMixin(a.prototype);
},
2: function(t, e, n) {
"use strict";
function r(t) {
return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
})(t);
}
function i(t, e) {
return !e || "object" !== r(e) && "function" != typeof e ? function(t) {
if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return t;
}(t) : e;
}
function o(t) {
return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
return t.__proto__ || Object.getPrototypeOf(t);
})(t);
}
function a(t, e) {
if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
t.prototype = Object.create(e && e.prototype, {
constructor: {
value: t,
writable: !0,
configurable: !0
}
}), e && s(t, e);
}
function s(t, e) {
return (s = Object.setPrototypeOf || function(t, e) {
return t.__proto__ = e, t;
})(t, e);
}
function l(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function c(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
function u(t, e, n) {
return e && c(t.prototype, e), n && c(t, n), t;
}
n.r(e), n.d(e, "init", function() {
return p;
}), n.d(e, "Info", function() {
return m;
}), n.d(e, "Warning", function() {
return g;
}), n.d(e, "Success", function() {
return v;
}), n.d(e, "Error", function() {
return y;
});
var f = n(3), d = function() {
function t() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
l(this, t), this.notifications = [], this.verticalSpace = e.verticalSpace || 8;
}
return u(t, [ {
key: "register",
value: function(t) {
var e = this;
this.notifications.unshift(t), setTimeout(function() {
return e.recalculate();
}, 20);
}
}, {
key: "unregister",
value: function(t) {
var e = this.notifications.indexOf(t);
this.notifications.splice(e, 1), this.recalculate();
}
}, {
key: "recalculate",
value: function() {
var t = this, e = this.verticalSpace;
this.notifications.forEach(function(n) {
n.top = e, e += n.height + t.verticalSpace;
});
}
} ]), t;
}();
function p(t) {
window.notificationManager || (window.notificationManager = new d(t));
}
var h = function() {
function t(e, n, r) {
l(this, t);
var i = '<div class="notification notification_popup notification_'.concat(n, '">\n    <div class="notification__content">').concat(e, '</div>\n    <button title="Закрыть" class="notification__close"></button></div>');
switch (document.body.insertAdjacentHTML("beforeEnd", i), this.elem = document.body.lastElementChild, 
r) {
case void 0:
this.timeout = this.TIMEOUT_DEFAULT;
break;

case "slow":
this.timeout = this.TIMEOUT_SLOW;
break;

case "fast":
this.timeout = this.TIMEOUT_FAST;
break;

default:
this.timeout = r;
}
window.notificationManager.register(this), this.setupCloseHandler(), this.setupCloseTimeout();
}
return u(t, [ {
key: "close",
value: function() {
this.elem.parentNode && (this.elem.remove(), window.notificationManager.unregister(this));
}
}, {
key: "setupCloseHandler",
value: function() {
var t = this;
this.delegate(".notification__close", "click", function() {
return t.close();
});
}
}, {
key: "setupCloseTimeout",
value: function() {
var t = this;
this.timeout && setTimeout(function() {
return t.close();
}, this.timeout);
}
}, {
key: "TIMEOUT_DEFAULT",
get: function() {
return 3e3;
}
}, {
key: "TIMEOUT_SLOW",
get: function() {
return 5e3;
}
}, {
key: "TIMEOUT_FAST",
get: function() {
return 1500;
}
}, {
key: "height",
get: function() {
return this.elem.offsetHeight;
}
}, {
key: "top",
set: function(t) {
this.elem.style.transform = "translateY(" + t + "px)";
}
} ]), t;
}();
f.delegateMixin(h.prototype);
var m = function(t) {
function e(t, n) {
return l(this, e), i(this, o(e).call(this, t, "info", n));
}
return a(e, h), e;
}(), g = function(t) {
function e(t, n) {
return l(this, e), i(this, o(e).call(this, t, "warning", n));
}
return a(e, h), e;
}(), v = function(t) {
function e(t, n) {
return l(this, e), i(this, o(e).call(this, t, "success", n));
}
return a(e, h), e;
}(), y = function(t) {
function e(t, n) {
return l(this, e), i(this, o(e).call(this, t, "error", n));
}
return a(e, h), u(e, [ {
key: "TIMEOUT_DEFAULT",
get: function() {
return 5e3;
}
} ]), e;
}();
},
212: function(t, e, n) {
n(213), t.exports = n(399);
},
213: function(module, exports, __webpack_require__) {
var delegate = __webpack_require__(3), prism = __webpack_require__(74), ItemSlider = __webpack_require__(79);
function init() {
initTaskButtons(), initFolderList(), initViewMoreButton(), initCoursesSlider(), 
prism.init();
}
function initTaskButtons() {
delegate(document, ".task__solution", "click", function(t) {
t.target.closest(".task").classList.toggle("task_answer_open");
}), delegate(document, ".task__answer-close", "click", function(t) {
t.target.closest(".task").classList.toggle("task_answer_open");
}), delegate(document, ".task__step-show", "click", function(t) {
t.target.closest(".task__step").classList.toggle("task_step_open");
});
}
function initViewMoreButton() {
delegate(document, "a.list-sub__more", "click", function(t) {
t.preventDefault();
var e = t.target, n = !0, r = !1, i = void 0;
try {
for (var o, a = e.closest(".list-sub").querySelectorAll(".list-sub__item_phone_hidden")[Symbol.iterator](); !(n = (o = a.next()).done); n = !0) {
o.value.classList.remove("list-sub__item_phone_hidden");
}
} catch (t) {
r = !0, i = t;
} finally {
try {
n || null == a.return || a.return();
} finally {
if (r) throw i;
}
}
e.style.display = "none";
});
}
function initFolderList() {
delegate(document, ".lessons-list__lesson_level_1 > .lessons-list__link", "click", function(t) {
var e = t.delegateTarget, n = e.closest(".lessons-list").querySelector(".lessons-list__lesson_open");
n && n !== e.parentNode && n.classList.remove("lessons-list__lesson_open"), e.parentNode.classList.toggle("lessons-list__lesson_open"), 
t.preventDefault();
});
}
function initCoursesSlider() {
var t = document.querySelector("[data-courses-slider]");
t && new ItemSlider({
el: t,
class: "slider_frontpage"
});
}
window.runDemo = function(button) {
for (var demoElem, parent = button; (parent = parent.parentElement) && (demoElem = parent.querySelector("[data-demo]"), 
!demoElem); ) ;
demoElem ? eval(demoElem.textContent) : alert("Error, no demo element");
}, init();
},
267: function(t, e, n) {
var r = n(268), i = n(105), o = "Expected a function";
t.exports = function(t, e, n) {
var a = !0, s = !0;
if ("function" != typeof t) throw new TypeError(o);
return i(n) && (a = "leading" in n ? !!n.leading : a, s = "trailing" in n ? !!n.trailing : s), 
r(t, e, {
leading: a,
maxWait: e,
trailing: s
});
};
},
268: function(t, e, n) {
var r = n(105), i = n(269), o = n(271), a = "Expected a function", s = Math.max, l = Math.min;
t.exports = function(t, e, n) {
var c, u, f, d, p, h, m = 0, g = !1, v = !1, y = !0;
if ("function" != typeof t) throw new TypeError(a);
function b(e) {
var n = c, r = u;
return c = u = void 0, m = e, d = t.apply(r, n);
}
function E(t) {
var n = t - h;
return void 0 === h || n >= e || n < 0 || v && t - m >= f;
}
function w() {
var t = i();
if (E(t)) return _(t);
p = setTimeout(w, function(t) {
var n = e - (t - h);
return v ? l(n, f - (t - m)) : n;
}(t));
}
function _(t) {
return p = void 0, y && c ? b(t) : (c = u = void 0, d);
}
function T() {
var t = i(), n = E(t);
if (c = arguments, u = this, h = t, n) {
if (void 0 === p) return function(t) {
return m = t, p = setTimeout(w, e), g ? b(t) : d;
}(h);
if (v) return p = setTimeout(w, e), b(h);
}
return void 0 === p && (p = setTimeout(w, e)), d;
}
return e = o(e) || 0, r(n) && (g = !!n.leading, f = (v = "maxWait" in n) ? s(o(n.maxWait) || 0, e) : f, 
y = "trailing" in n ? !!n.trailing : y), T.cancel = function() {
void 0 !== p && clearTimeout(p), m = 0, c = h = u = p = void 0;
}, T.flush = function() {
return void 0 === p ? d : _(i());
}, T;
};
},
269: function(t, e, n) {
var r = n(143);
t.exports = function() {
return r.Date.now();
};
},
270: function(t, e, n) {
(function(e) {
function n(t) {
return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
})(t);
}
var r = "object" == (void 0 === e ? "undefined" : n(e)) && e && e.Object === Object && e;
t.exports = r;
}).call(this, n(37));
},
271: function(t, e, n) {
var r = n(105), i = n(272), o = NaN, a = /^\s+|\s+$/g, s = /^[-+]0x[0-9a-f]+$/i, l = /^0b[01]+$/i, c = /^0o[0-7]+$/i, u = parseInt;
t.exports = function(t) {
if ("number" == typeof t) return t;
if (i(t)) return o;
if (r(t)) {
var e = "function" == typeof t.valueOf ? t.valueOf() : t;
t = r(e) ? e + "" : e;
}
if ("string" != typeof t) return 0 === t ? t : +t;
t = t.replace(a, "");
var n = l.test(t);
return n || c.test(t) ? u(t.slice(2), n ? 2 : 8) : s.test(t) ? o : +t;
};
},
272: function(t, e, n) {
function r(t) {
return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
})(t);
}
var i = n(273), o = n(276), a = "[object Symbol]";
t.exports = function(t) {
return "symbol" == r(t) || o(t) && i(t) == a;
};
},
273: function(t, e, n) {
var r = n(144), i = n(274), o = n(275), a = "[object Null]", s = "[object Undefined]", l = r ? r.toStringTag : void 0;
t.exports = function(t) {
return null == t ? void 0 === t ? s : a : l && l in Object(t) ? i(t) : o(t);
};
},
274: function(t, e, n) {
var r = n(144), i = Object.prototype, o = i.hasOwnProperty, a = i.toString, s = r ? r.toStringTag : void 0;
t.exports = function(t) {
var e = o.call(t, s), n = t[s];
try {
t[s] = void 0;
var r = !0;
} catch (t) {}
var i = a.call(t);
return r && (e ? t[s] = n : delete t[s]), i;
};
},
275: function(t, e) {
var n = Object.prototype.toString;
t.exports = function(t) {
return n.call(t);
};
},
276: function(t, e) {
function n(t) {
return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
})(t);
}
t.exports = function(t) {
return null != t && "object" == n(t);
};
},
3: function(t, e) {
function n(t, e, n, r, i) {
t.addEventListener(n, function(t) {
var n = function(t, e) {
for (var n = t.target; n; ) {
if (n.matches(e)) return n;
if (n == t.currentTarget) break;
n = n.parentElement;
}
return null;
}(t, e);
t.delegateTarget = n, n && r.call(i || this, t);
});
}
n.delegateMixin = function(t) {
t.delegate = function(t, e, r) {
n(this.elem, t, e, r, this);
};
}, t.exports = n;
},
37: function(t, e) {
function n(t) {
return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
})(t);
}
var r;
r = function() {
return this;
}();
try {
r = r || new Function("return this")();
} catch (t) {
"object" === ("undefined" == typeof window ? "undefined" : n(window)) && (r = window);
}
t.exports = r;
},
399: function(t, e, n) {
var r = n(400), i = n(149), o = n(3);
function a() {
/[&?]map\b/.test(location.href) || window.history.replaceState(null, null, ~location.href.indexOf("?") ? location.href + "&map" : location.href + "?map"), 
new r().elem.addEventListener("tutorial-map-remove", function() {
window.history.replaceState(null, null, location.href.replace(/[&?]map\b/, ""));
});
}
!function() {
o(document, '[data-action="tutorial-map"]', "click", function(t) {
1 === t.which && (t.preventDefault(), a());
});
var t = document.querySelector(".tutorial-map");
t ? new i(t) : /[&?]map\b/.test(location.href) && a();
}();
},
4: function(t, e, n) {
var r = n(2), i = n(10), o = n(0).lang, a = n(1);
a.i18n.add("", n(11)("./" + o + ".yml")), a.i18n.add("error.network", n(13)("./" + o + ".yml")), 
document.addEventListener("xhrfail", function(t) {
new r.Error(t.reason);
}), t.exports = function(t) {
var e = new XMLHttpRequest(), n = t.method || "GET", r = t.body, o = t.url;
e.open(n, o, !t.sync), e.method = n;
var s = i();
s && !t.skipCsrf && e.setRequestHeader("X-XSRF-TOKEN", s), t.responseType && (e.responseType = t.responseType), 
"[object Object]" == {}.toString.call(r) && (e.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
r = JSON.stringify(r)), t.noDocumentEvents || (e.addEventListener("loadstart", function(t) {
e.timeStart = Date.now();
var n = c("xhrstart", t);
document.dispatchEvent(n);
}), e.addEventListener("loadend", function(t) {
var e = c("xhrend", t);
document.dispatchEvent(e);
}), e.addEventListener("success", function(t) {
var e = c("xhrsuccess", t);
e.result = t.result, document.dispatchEvent(e);
}), e.addEventListener("fail", function(t) {
var e = c("xhrfail", t);
e.reason = t.reason, document.dispatchEvent(e);
})), t.raw || e.setRequestHeader("Accept", "application/json"), e.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var l = t.normalStatuses || [ 200 ];
function c(t, e) {
var n = new CustomEvent(t);
return n.originalEvent = e, n;
}
function u(t, n) {
var r = c("fail", n);
r.reason = t, e.dispatchEvent(r);
}
return e.addEventListener("error", function(t) {
u(a("error.network.server_connection_error"), t);
}), e.addEventListener("timeout", function(t) {
u(a("error.network.server_request_timeout"), t);
}), e.addEventListener("abort", function(t) {
u(a("error.network.request_aborted"), t);
}), e.addEventListener("load", function(n) {
if (e.status) if (l.includes(e.status)) {
var r = t.responseType && "text" !== t.responseType ? e.response : e.responseText;
if ((e.getResponseHeader("Content-Type") || "").match(/^application\/json/) || t.json) try {
r = JSON.parse(r);
} catch (n) {
return void u(a("error.network.invalid_format"), n);
}
!function(t, n) {
var r = c("success", n);
r.result = t, e.dispatchEvent(r);
}(r, n);
} else u(a("error.network.server_error", {
status: e.status
}), n); else u(a("error.network.no_response"), n);
}), setTimeout(function() {
e.send(r);
}, 0), e;
};
},
400: function(t, e, n) {
function r(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
var i = n(4), o = n(3), a = n(9), s = n(149), l = n(106), c = function() {
function t() {
var e = this;
!function(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}(this, t), this.elem = document.createElement("div"), document.body.appendChild(this.elem);
var n = new Modal({
hasClose: !1
}), r = new a();
n.setContent(r.elem), r.start(), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
var o = i({
url: "/tutorial/map"
});
o.addEventListener("success", function(t) {
n.remove(), e.elem.innerHTML = '<div class="tutorial-map-overlay"></div>', e.mapElem = e.elem.firstChild, 
e.mapElem.innerHTML = t.result + '<button class="close-button tutorial-map-overlay__close"></button>', 
e.mapElem.addEventListener("click", function(t) {
t.target.classList.contains("tutorial-map-overlay__close") && e.remove();
}), document.addEventListener("keydown", e.onDocumentKeyDown), document.body.classList.add("tutorial-map_on"), 
e.mapElem.addEventListener("scroll", l), new s(e.mapElem.firstElementChild);
}), o.addEventListener("fail", function() {
return n.remove();
});
}
var e, n, o;
return e = t, (n = [ {
key: "remove",
value: function() {
this.elem.dispatchEvent(new CustomEvent("tutorial-map-remove")), this.elem.remove(), 
document.body.classList.remove("tutorial-map_on"), document.removeEventListener("keydown", this.onDocumentKeyDown);
}
}, {
key: "onDocumentKeyDown",
value: function(t) {
27 == t.keyCode && (t.preventDefault(), this.remove());
}
} ]) && r(e.prototype, n), o && r(e, o), t;
}();
o.delegateMixin(c.prototype), t.exports = c;
},
45: function(t, e) {
t.exports = function(t, e) {
var n, r, i = !1;
return function o() {
if (i) return n = arguments, void (r = this);
t.apply(this, arguments), i = !0, setTimeout(function() {
i = !1, n && (o.apply(r, n), n = r = null);
}, e);
};
};
},
49: function(t, e) {
t.exports = function(t) {
var e = 1 + t.split("\n").length, n = new Array(e);
return n = n.join("<span></span>"), '<span class="line-numbers-rows">'.concat(n, "</span>");
};
},
5: function(t, e, n) {
t.exports = n(6);
},
52: function(t, e, n) {
n(57), n(58), n(59), n(60), n(61), n(62), n(63), n(64), n(65), n(66), Prism.hooks.add("wrap", function(t) {
"span" === t.tag && (t.tag = "code");
});
},
53: function(t, e, n) {
var r = n(54), i = n(45), o = [];
e.iframe = function(t) {
r.async(t, function(e, n) {
n && (t.style.height = n + "px");
});
}, e.codeTabs = function(t) {
function e() {
var e = t.closest(".code-tabs"), n = (t.closest("[data-code-tabs-content]"), e.querySelector("[data-code-tabs-switches]"));
n.firstElementChild.offsetWidth > n.offsetWidth ? e.classList.add("code-tabs_scroll") : e.classList.remove("code-tabs_scroll");
}
e(), o.push(e);
}, window.addEventListener("resize", i(function() {
o.forEach(function(t) {
t();
});
}, 200));
},
54: function(t, e, n) {
var r = n(55);
function i(t, e) {
var n = setTimeout(function() {
e(new Error("timeout"));
}, 500);
function i(t, r) {
clearTimeout(n), e(t, r);
}
try {
(t.contentDocument || t.contentWindow.document).body;
} catch (t) {
!function(t, e) {
throw new Error("Not implemented yet");
}();
}
if (!t.offsetWidth) {
var o = t.cloneNode(!0);
return o.name = "", o.style.height = "50px", o.style.position = "absolute", o.style.display = "block", 
o.style.top = "10000px", o.onload = function() {
var e = r(this.contentDocument);
t.style.display = "block", o.remove(), i(null, e);
}, void document.body.appendChild(o);
}
t.style.display = "block", t.style.height = "1px";
var a = r(t.contentDocument);
t.style.height = "", i(null, a);
}
i.async = function(t, e) {
setTimeout(function() {
i(t, e);
}, 0);
}, t.exports = i;
},
55: function(t, e, n) {
var r, i = n(56);
t.exports = function(t) {
t = t || document;
var e = Math.max(t.body.scrollHeight, t.documentElement.scrollHeight, t.body.offsetHeight, t.documentElement.offsetHeight, t.body.clientHeight, t.documentElement.clientHeight);
return t.documentElement.scrollWidth > t.documentElement.clientWidth && (r || (r = i()), 
e += r), e;
};
},
56: function(t, e) {
t.exports = function() {
var t = document.createElement("div");
if (t.style.cssText = "visibility:hidden;height:100px", !document.body) throw new Error("getScrollbarHeight called to early: no document.body");
document.body.appendChild(t);
var e = t.offsetWidth;
t.style.overflow = "scroll";
var n = document.createElement("div");
n.style.width = "100%", t.appendChild(n);
var r = n.offsetWidth;
return t.parentNode.removeChild(t), e - r;
};
},
57: function(t, e) {
var n = function(t) {
var e = /\blang(?:uage)?-([\w-]+)\b/i, n = 0, r = {
manual: t.Prism && t.Prism.manual,
disableWorkerMessageHandler: t.Prism && t.Prism.disableWorkerMessageHandler,
util: {
encode: function(t) {
return t instanceof i ? new i(t.type, r.util.encode(t.content), t.alias) : Array.isArray(t) ? t.map(r.util.encode) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
},
type: function(t) {
return Object.prototype.toString.call(t).slice(8, -1);
},
objId: function(t) {
return t.__id || Object.defineProperty(t, "__id", {
value: ++n
}), t.__id;
},
clone: function t(e, n) {
var i, o, a = r.util.type(e);
switch (n = n || {}, a) {
case "Object":
if (o = r.util.objId(e), n[o]) return n[o];
for (var s in i = {}, n[o] = i, e) e.hasOwnProperty(s) && (i[s] = t(e[s], n));
return i;

case "Array":
return o = r.util.objId(e), n[o] ? n[o] : (i = [], n[o] = i, e.forEach(function(e, r) {
i[r] = t(e, n);
}), i);

default:
return e;
}
}
},
languages: {
extend: function(t, e) {
var n = r.util.clone(r.languages[t]);
for (var i in e) n[i] = e[i];
return n;
},
insertBefore: function(t, e, n, i) {
var o = (i = i || r.languages)[t], a = {};
for (var s in o) if (o.hasOwnProperty(s)) {
if (s == e) for (var l in n) n.hasOwnProperty(l) && (a[l] = n[l]);
n.hasOwnProperty(s) || (a[s] = o[s]);
}
var c = i[t];
return i[t] = a, r.languages.DFS(r.languages, function(e, n) {
n === c && e != t && (this[e] = a);
}), a;
},
DFS: function t(e, n, i, o) {
o = o || {};
var a = r.util.objId;
for (var s in e) if (e.hasOwnProperty(s)) {
n.call(e, s, e[s], i || s);
var l = e[s], c = r.util.type(l);
"Object" !== c || o[a(l)] ? "Array" !== c || o[a(l)] || (o[a(l)] = !0, t(l, n, s, o)) : (o[a(l)] = !0, 
t(l, n, null, o));
}
}
},
plugins: {},
highlightAll: function(t, e) {
r.highlightAllUnder(document, t, e);
},
highlightAllUnder: function(t, e, n) {
var i = {
callback: n,
selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
};
r.hooks.run("before-highlightall", i);
for (var o, a = i.elements || t.querySelectorAll(i.selector), s = 0; o = a[s++]; ) r.highlightElement(o, !0 === e, i.callback);
},
highlightElement: function(n, i, o) {
for (var a, s, l = n; l && !e.test(l.className); ) l = l.parentNode;
l && (a = (l.className.match(e) || [ , "" ])[1].toLowerCase(), s = r.languages[a]), 
n.className = n.className.replace(e, "").replace(/\s+/g, " ") + " language-" + a, 
n.parentNode && (l = n.parentNode, /pre/i.test(l.nodeName) && (l.className = l.className.replace(e, "").replace(/\s+/g, " ") + " language-" + a));
var c = {
element: n,
language: a,
grammar: s,
code: n.textContent
}, u = function(t) {
c.highlightedCode = t, r.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, 
r.hooks.run("after-highlight", c), r.hooks.run("complete", c), o && o.call(c.element);
};
if (r.hooks.run("before-sanity-check", c), c.code) if (r.hooks.run("before-highlight", c), 
c.grammar) if (i && t.Worker) {
var f = new Worker(r.filename);
f.onmessage = function(t) {
u(t.data);
}, f.postMessage(JSON.stringify({
language: c.language,
code: c.code,
immediateClose: !0
}));
} else u(r.highlight(c.code, c.grammar, c.language)); else u(r.util.encode(c.code)); else r.hooks.run("complete", c);
},
highlight: function(t, e, n) {
var o = {
code: t,
grammar: e,
language: n
};
return r.hooks.run("before-tokenize", o), o.tokens = r.tokenize(o.code, o.grammar), 
r.hooks.run("after-tokenize", o), i.stringify(r.util.encode(o.tokens), o.language);
},
matchGrammar: function(t, e, n, o, a, s, l) {
for (var c in n) if (n.hasOwnProperty(c) && n[c]) {
if (c == l) return;
var u = n[c];
u = "Array" === r.util.type(u) ? u : [ u ];
for (var f = 0; f < u.length; ++f) {
var d = u[f], p = d.inside, h = !!d.lookbehind, m = !!d.greedy, g = 0, v = d.alias;
if (m && !d.pattern.global) {
var y = d.pattern.toString().match(/[imuy]*$/)[0];
d.pattern = RegExp(d.pattern.source, y + "g");
}
d = d.pattern || d;
for (var b = o, E = a; b < e.length; E += e[b].length, ++b) {
var w = e[b];
if (e.length > t.length) return;
if (!(w instanceof i)) {
if (m && b != e.length - 1) {
if (d.lastIndex = E, !(F = d.exec(t))) break;
for (var _ = F.index + (h ? F[1].length : 0), T = F.index + F[0].length, S = b, k = E, A = e.length; S < A && (k < T || !e[S].type && !e[S - 1].greedy); ++S) _ >= (k += e[S].length) && (++b, 
E = k);
if (e[b] instanceof i) continue;
O = S - b, w = t.slice(E, k), F.index -= E;
} else {
d.lastIndex = 0;
var F = d.exec(w), O = 1;
}
if (F) {
h && (g = F[1] ? F[1].length : 0);
T = (_ = F.index + g) + (F = F[0].slice(g)).length;
var L = w.slice(0, _), x = w.slice(T), C = [ b, O ];
L && (++b, E += L.length, C.push(L));
var N = new i(c, p ? r.tokenize(F, p) : F, v, F, m);
if (C.push(N), x && C.push(x), Array.prototype.splice.apply(e, C), 1 != O && r.matchGrammar(t, e, n, b, E, !0, c), 
s) break;
} else if (s) break;
}
}
}
}
},
tokenize: function(t, e) {
var n = [ t ], i = e.rest;
if (i) {
for (var o in i) e[o] = i[o];
delete e.rest;
}
return r.matchGrammar(t, n, e, 0, 0, !1), n;
},
hooks: {
all: {},
add: function(t, e) {
var n = r.hooks.all;
n[t] = n[t] || [], n[t].push(e);
},
run: function(t, e) {
var n = r.hooks.all[t];
if (n && n.length) for (var i, o = 0; i = n[o++]; ) i(e);
}
},
Token: i
};
function i(t, e, n, r, i) {
this.type = t, this.content = e, this.alias = n, this.length = 0 | (r || "").length, 
this.greedy = !!i;
}
if (t.Prism = r, i.stringify = function(t, e, n) {
if ("string" == typeof t) return t;
if (Array.isArray(t)) return t.map(function(n) {
return i.stringify(n, e, t);
}).join("");
var o = {
type: t.type,
content: i.stringify(t.content, e, n),
tag: "span",
classes: [ "token", t.type ],
attributes: {},
language: e,
parent: n
};
if (t.alias) {
var a = Array.isArray(t.alias) ? t.alias : [ t.alias ];
Array.prototype.push.apply(o.classes, a);
}
r.hooks.run("wrap", o);
var s = Object.keys(o.attributes).map(function(t) {
return t + '="' + (o.attributes[t] || "").replace(/"/g, "&quot;") + '"';
}).join(" ");
return "<" + o.tag + ' class="' + o.classes.join(" ") + '"' + (s ? " " + s : "") + ">" + o.content + "</" + o.tag + ">";
}, !t.document) return t.addEventListener ? (r.disableWorkerMessageHandler || t.addEventListener("message", function(e) {
var n = JSON.parse(e.data), i = n.language, o = n.code, a = n.immediateClose;
t.postMessage(r.highlight(o, r.languages[i], i)), a && t.close();
}, !1), r) : r;
var o = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
return o && (r.filename = o.src, r.manual || o.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(r.highlightAll) : window.setTimeout(r.highlightAll, 16) : document.addEventListener("DOMContentLoaded", r.highlightAll))), 
r;
}("undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {});
void 0 !== t && t.exports && (t.exports = n), "undefined" != typeof global && (global.Prism = n);
},
58: function(t, e) {
Prism.languages.markup = {
comment: /<!--[\s\S]*?-->/,
prolog: /<\?[\s\S]+?\?>/,
doctype: /<!DOCTYPE[\s\S]+?>/i,
cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
tag: {
pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
greedy: !0,
inside: {
tag: {
pattern: /^<\/?[^\s>\/]+/i,
inside: {
punctuation: /^<\/?/,
namespace: /^[^\s>\/:]+:/
}
},
"attr-value": {
pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
inside: {
punctuation: [ /^=/, {
pattern: /^(\s*)["']|["']$/,
lookbehind: !0
} ]
}
},
punctuation: /\/?>/,
"attr-name": {
pattern: /[^\s>\/]+/,
inside: {
namespace: /^[^\s>\/:]+:/
}
}
}
},
entity: /&#?[\da-z]{1,8};/i
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, 
Prism.hooks.add("wrap", function(t) {
"entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"));
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
value: function(t, e) {
var n = {};
n["language-" + e] = {
pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
lookbehind: !0,
inside: Prism.languages[e]
}, n.cdata = /^<!\[CDATA\[|\]\]>$/i;
var r = {
"included-cdata": {
pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
inside: n
}
};
r["language-" + e] = {
pattern: /[\s\S]+/,
inside: Prism.languages[e]
};
var i = {};
i[t] = {
pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, t), "i"),
lookbehind: !0,
greedy: !0,
inside: r
}, Prism.languages.insertBefore("markup", "cdata", i);
}
}), Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.html = Prism.languages.markup, 
Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
},
59: function(t, e) {
!function(t) {
var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
t.languages.css = {
comment: /\/\*[\s\S]*?\*\//,
atrule: {
pattern: /@[\w-]+?[\s\S]*?(?:;|(?=\s*\{))/i,
inside: {
rule: /@[\w-]+/
}
},
url: RegExp("url\\((?:" + e.source + "|.*?)\\)", "i"),
selector: RegExp("[^{}\\s](?:[^{};\"']|" + e.source + ")*?(?=\\s*\\{)"),
string: {
pattern: e,
greedy: !0
},
property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
important: /!important\b/i,
function: /[-a-z0-9]+(?=\()/i,
punctuation: /[(){};:,]/
}, t.languages.css.atrule.inside.rest = t.languages.css;
var n = t.languages.markup;
n && (n.tag.addInlined("style", "css"), t.languages.insertBefore("inside", "attr-value", {
"style-attr": {
pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
inside: {
"attr-name": {
pattern: /^\s*style/i,
inside: n.tag.inside
},
punctuation: /^\s*=\s*['"]|['"]\s*$/,
"attr-value": {
pattern: /.+/i,
inside: t.languages.css
}
},
alias: "language-css"
}
}, n.tag));
}(Prism);
},
6: function(t, e, n) {
"use strict";
function r(t) {
return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
})(t);
}
var i = n(7), o = n(8);
function a(t) {
return Object.prototype.toString.call(t);
}
function s(t) {
return "[object String]" === a(t);
}
function l(t) {
return !isNaN(t) && isFinite(t);
}
function c(t) {
return !0 === t || !1 === t;
}
function u(t) {
return "[object Object]" === a(t);
}
var f = Array.isArray || function(t) {
return "[object Array]" === a(t);
}, d = Array.prototype.forEach;
function p(t, e, n) {
if (null !== t) if (d && t.forEach === d) t.forEach(e, n); else if (t.length === +t.length) for (var r = 0, i = t.length; r < i; r += 1) e.call(n, t[r], r, t); else for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && e.call(n, t[o], o, t);
}
var h = /%[sdj%]/g;
function m(t) {
var e = 1, n = arguments, r = n.length;
return String(t).replace(h, function(t) {
if ("%%" === t) return "%";
if (e >= r) return t;
switch (t) {
case "%s":
return String(n[e++]);

case "%d":
return Number(n[e++]);

case "%j":
return JSON.stringify(n[e++]);

default:
return t;
}
});
}
var g = "en";
function v(t) {
var e = {};
return p(t || {}, function(t, n) {
t && "object" === r(t) ? p(v(t), function(t, r) {
e[n + "." + r] = t;
}) : e[n] = t;
}), e;
}
var y = "#@$";
function b(t, e) {
return t + y + e;
}
function E(t, e, n) {
var r = b(e, n), i = t._storage;
if (i.hasOwnProperty(r)) return r;
if (e === t._defaultLocale) return null;
var o = t._fallbacks_cache;
if (o.hasOwnProperty(r)) return o[r];
for (var a, s = t._fallbacks[e] || [ t._defaultLocale ], l = 0, c = s.length; l < c; l++) if (a = b(s[l], n), 
i.hasOwnProperty(a)) return o[r] = a, o[r];
return o[r] = null, null;
}
function w(t, e, n) {
var r = o.indexOf(t, e);
return -1 === r ? m('[pluralizer for "%s" locale not found]', t) : void 0 === n[r] ? m('[plural form %d ("%s") not found in translation]', r, o.forms(t)[r]) : n[r];
}
function _(t) {
if (!(this instanceof _)) return new _(t);
this._defaultLocale = t ? String(t) : g, this._fallbacks = {}, this._fallbacks_cache = {}, 
this._storage = {}, this._plurals_cache = {};
}
_.prototype.addPhrase = function(t, e, n, r) {
var i, o = this;
if (c(r)) i = r ? 1 / 0 : 0; else if (l(r)) {
if ((i = Math.floor(r)) < 0) throw new TypeError("Invalid flatten level (should be >= 0).");
} else i = 1 / 0;
if (u(n) && i > 0) return p(n, function(n, r) {
o.addPhrase(t, (e ? e + "." : "") + r, n, i - 1);
}), this;
if (s(n)) this._storage[b(t, e)] = {
translation: n,
locale: t,
raw: !1
}; else {
if (!(f(n) || l(n) || c(n) || 0 === i && u(n))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[b(t, e)] = {
translation: n,
locale: t,
raw: !0
};
}
return o._fallbacks_cache = {}, this;
}, _.prototype.setFallback = function(t, e) {
var n = this._defaultLocale;
if (n === t) throw new Error("Default locale can't have fallbacks");
var r = f(e) ? e.slice() : [ e ];
return r[r.length - 1] !== n && r.push(n), this._fallbacks[t] = r, this._fallbacks_cache = {}, 
this;
};
var T = /#\{|\(\(|\\\\/;
_.prototype.translate = function(t, e, n) {
var r, o = E(this, t, e);
return o ? (r = this._storage[o]).raw ? r.translation : (r.hasOwnProperty("compiled") || (r.compiled = function(t, e, n) {
var r, o, a, s, l, c;
return T.test(e) ? 1 === (r = i.parse(e)).length && "literal" === r[0].type ? r[0].text : (t._plurals_cache[n] || (t._plurals_cache[n] = new _(n)), 
c = t._plurals_cache[n], (o = []).push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
o.push("params = flatten(params);"), p(r, function(t) {
if ("literal" !== t.type) {
if ("variable" === t.type) return a = t.anchor, void o.push(m('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', a, a, a));
if ("plural" !== t.type) throw new Error("Unknown node type");
a = t.anchor, s = {}, p(t.strict, function(e, r) {
var o = i.parse(e);
if (1 === o.length && "literal" === o[0].type) return s[r] = !1, void (t.strict[r] = o[0].text);
s[r] = !0, c.hasPhrase(n, e, !0) || c.addPhrase(n, e, e);
}), l = {}, p(t.forms, function(e, r) {
var o, a = i.parse(e);
if (1 === a.length && "literal" === a[0].type) return o = a[0].text, t.forms[r] = o, 
void (l[o] = !1);
l[e] = !0, c.hasPhrase(n, e, !0) || c.addPhrase(n, e, e);
}), o.push(m("loc = %j;", n)), o.push(m("loc_plzr = %j;", n.split(/[-_]/)[0])), 
o.push(m("anchor = params[%j];", a)), o.push(m("cache = this._plurals_cache[loc];")), 
o.push(m("strict = %j;", t.strict)), o.push(m("strict_exec = %j;", s)), o.push(m("forms = %j;", t.forms)), 
o.push(m("forms_exec = %j;", l)), o.push("if (+(anchor) != anchor) {"), o.push(m('  str += "[invalid plurals amount: %s(" + anchor + ")]";', a)), 
o.push("} else {"), o.push("  if (strict[anchor] !== undefined) {"), o.push("    plrl = strict[anchor];"), 
o.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), o.push("  } else {"), 
o.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), o.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
o.push("  }"), o.push("}");
} else o.push(m("str += %j;", t.text));
}), o.push("return str;"), new Function("params", "flatten", "pluralizer", o.join("\n"))) : e;
}(this, r.translation, r.locale)), "[object Function]" !== a(r.compiled) ? r.compiled : ((l(n) || s(n)) && (n = {
count: n,
value: n
}), r.compiled.call(this, n, v, w))) : t + ": No translation for [" + e + "]";
}, _.prototype.hasPhrase = function(t, e, n) {
return n ? this._storage.hasOwnProperty(b(t, e)) : !!E(this, t, e);
}, _.prototype.getLocale = function(t, e, n) {
if (n) return this._storage.hasOwnProperty(b(t, e)) ? t : null;
var r = E(this, t, e);
return r ? r.split(y, 2)[0] : null;
}, _.prototype.t = _.prototype.translate, _.prototype.stringify = function(t) {
var e = this, n = {};
p(this._storage, function(t, e) {
n[e.split(y)[1]] = !0;
});
var r = {};
p(n, function(n, i) {
var o = E(e, t, i);
if (o) {
var a = e._storage[o].locale;
r[a] || (r[a] = {}), r[a][i] = e._storage[o].translation;
}
});
var i = {
fallback: {},
locales: r
}, o = (e._fallbacks[t] || []).slice(0, -1);
return o.length && (i.fallback[t] = o), JSON.stringify(i);
}, _.prototype.load = function(t) {
var e = this;
return s(t) && (t = JSON.parse(t)), p(t.locales, function(t, n) {
p(t, function(t, r) {
e.addPhrase(n, r, t, 0);
});
}), p(t.fallback, function(t, n) {
e.setFallback(n, t);
}), this;
}, t.exports = _;
},
60: function(t, e) {
Prism.languages.css.selector = {
pattern: Prism.languages.css.selector,
inside: {
"pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
"pseudo-class": /:[-\w]+/,
class: /\.[-:.\w]+/,
id: /#[-:.\w]+/,
attribute: {
pattern: /\[(?:[^[\]"']|("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1)*\]/,
greedy: !0,
inside: {
punctuation: /^\[|\]$/,
"case-sensitivity": {
pattern: /(\s)[si]$/i,
lookbehind: !0,
alias: "keyword"
},
namespace: {
pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/,
lookbehind: !0,
inside: {
punctuation: /\|$/
}
},
attribute: {
pattern: /^(\s*)[-\w\xA0-\uFFFF]+/,
lookbehind: !0
},
value: [ /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, {
pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/,
lookbehind: !0
} ],
operator: /[|~*^$]?=/
}
},
"n-th": {
pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
lookbehind: !0,
inside: {
number: /[\dn]+/,
operator: /[+-]/
}
},
punctuation: /[()]/
}
}, Prism.languages.insertBefore("css", "property", {
variable: {
pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
lookbehind: !0
}
}), Prism.languages.insertBefore("css", "function", {
operator: {
pattern: /(\s)[+\-*\/](?=\s)/,
lookbehind: !0
},
hexcode: /#[\da-f]{3,8}/i,
entity: /\\[\da-f]{1,8}/i,
unit: {
pattern: /(\d)(?:%|[a-z]+)/,
lookbehind: !0
},
number: /-?[\d.]+/
});
},
61: function(t, e) {
Prism.languages.clike = {
comment: [ {
pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
lookbehind: !0
}, {
pattern: /(^|[^\\:])\/\/.*/,
lookbehind: !0,
greedy: !0
} ],
string: {
pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
greedy: !0
},
"class-name": {
pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
lookbehind: !0,
inside: {
punctuation: /[.\\]/
}
},
keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
boolean: /\b(?:true|false)\b/,
function: /\w+(?=\()/,
number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
punctuation: /[{}[\];(),.:]/
};
},
62: function(t, e) {
Prism.languages.javascript = Prism.languages.extend("clike", {
"class-name": [ Prism.languages.clike["class-name"], {
pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
lookbehind: !0
} ],
keyword: [ {
pattern: /((?:^|})\s*)(?:catch|finally)\b/,
lookbehind: !0
}, {
pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
lookbehind: !0
} ],
number: /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, 
Prism.languages.insertBefore("javascript", "keyword", {
regex: {
pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
lookbehind: !0,
greedy: !0
},
"function-variable": {
pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
alias: "function"
},
parameter: [ {
pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
lookbehind: !0,
inside: Prism.languages.javascript
}, {
pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
inside: Prism.languages.javascript
}, {
pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
lookbehind: !0,
inside: Prism.languages.javascript
}, {
pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
lookbehind: !0,
inside: Prism.languages.javascript
} ],
constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
"template-string": {
pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
greedy: !0,
inside: {
interpolation: {
pattern: /\${[^}]+}/,
inside: {
"interpolation-punctuation": {
pattern: /^\${|}$/,
alias: "punctuation"
},
rest: Prism.languages.javascript
}
},
string: /[\s\S]+/
}
}
}), Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"), 
Prism.languages.js = Prism.languages.javascript;
},
63: function(t, e) {
!function(t) {
t.languages.http = {
"request-line": {
pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
inside: {
property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
"attr-name": /:\w+/
}
},
"response-status": {
pattern: /^HTTP\/1.[01] \d+.*/m,
inside: {
property: {
pattern: /(^HTTP\/1.[01] )\d+.*/i,
lookbehind: !0
}
}
},
"header-name": {
pattern: /^[\w-]+:(?=.)/m,
alias: "keyword"
}
};
var e, n = t.languages, r = {
"application/javascript": n.javascript,
"application/json": n.json || n.javascript,
"application/xml": n.xml,
"text/xml": n.xml,
"text/html": n.html,
"text/css": n.css
}, i = {
"application/json": !0,
"application/xml": !0
};
function o(t) {
return "(?:" + t + "|" + ("\\w+/(?:[\\w.-]+\\+)+" + t.replace(/^[a-z]+\//, "") + "(?![+\\w.-])") + ")";
}
for (var a in r) if (r[a]) {
e = e || {};
var s = i[a] ? o(a) : a;
e[a] = {
pattern: RegExp("(content-type:\\s*" + s + "[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*", "i"),
lookbehind: !0,
inside: {
rest: r[a]
}
};
}
e && t.languages.insertBefore("http", "header-name", e);
}(Prism);
},
64: function(t, e) {
Prism.languages.scss = Prism.languages.extend("css", {
comment: {
pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
lookbehind: !0
},
atrule: {
pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
inside: {
rule: /@[\w-]+/
}
},
url: /(?:[-a-z]+-)*url(?=\()/i,
selector: {
pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
inside: {
parent: {
pattern: /&/,
alias: "important"
},
placeholder: /%[-\w]+/,
variable: /\$[-\w]+|#\{\$[-\w]+\}/
}
},
property: {
pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
inside: {
variable: /\$[-\w]+|#\{\$[-\w]+\}/
}
}
}), Prism.languages.insertBefore("scss", "atrule", {
keyword: [ /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
pattern: /( +)(?:from|through)(?= )/,
lookbehind: !0
} ]
}), Prism.languages.insertBefore("scss", "important", {
variable: /\$[-\w]+|#\{\$[-\w]+\}/
}), Prism.languages.insertBefore("scss", "function", {
placeholder: {
pattern: /%[-\w]+/,
alias: "selector"
},
statement: {
pattern: /\B!(?:default|optional)\b/i,
alias: "keyword"
},
boolean: /\b(?:true|false)\b/,
null: {
pattern: /\bnull\b/,
alias: "keyword"
},
operator: {
pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
lookbehind: !0
}
}), Prism.languages.scss.atrule.inside.rest = Prism.languages.scss;
},
65: function(t, e) {
Prism.languages.sql = {
comment: {
pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
lookbehind: !0
},
variable: [ {
pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
greedy: !0
}, /@[\w.$]+/ ],
string: {
pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
greedy: !0,
lookbehind: !0
},
function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
punctuation: /[;[\]()`,.]/
};
},
66: function(t, e) {
!function(t) {
var e = /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while|var|null|exports|module|open|opens|provides|requires|to|transitive|uses|with)\b/, n = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
t.languages.java = t.languages.extend("clike", {
"class-name": [ n, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/ ],
keyword: e,
function: [ t.languages.clike.function, {
pattern: /(\:\:)[a-z_]\w*/,
lookbehind: !0
} ],
number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
operator: {
pattern: /(^|[^.])(?:<<=?|>>>?=?|->|([-+&|])\2|[?:~]|[-+*/%&|^!=<>]=?)/m,
lookbehind: !0
}
}), t.languages.insertBefore("java", "class-name", {
annotation: {
alias: "punctuation",
pattern: /(^|[^.])@\w+/,
lookbehind: !0
},
namespace: {
pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(\.[a-z]\w*)+/,
lookbehind: !0,
inside: {
punctuation: /\./
}
},
generics: {
pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
inside: {
"class-name": n,
keyword: e,
punctuation: /[<>(),.:]/,
operator: /[?&|]/
}
}
});
}(Prism);
},
7: function(t, e) {
t.exports = function() {
function t(t, e, n, r, i, o) {
this.message = t, this.expected = e, this.found = n, this.offset = r, this.line = i, 
this.column = o, this.name = "SyntaxError";
}
return function(t, e) {
function n() {
this.constructor = t;
}
n.prototype = e.prototype, t.prototype = new n();
}(t, Error), {
SyntaxError: t,
parse: function(e) {
var n, r = arguments.length > 1 ? arguments[1] : {}, i = {}, o = {
start: ut
}, a = ut, s = i, l = "((", c = {
type: "literal",
value: "((",
description: '"(("'
}, u = "))", f = {
type: "literal",
value: "))",
description: '"))"'
}, d = null, p = function(t, e) {
return {
type: "plural",
forms: function(t) {
for (var e = [], n = 0; n < t.length; n++) void 0 === t[n].strict && e.push(t[n].text);
return e;
}(t),
strict: function(t) {
for (var e = {}, n = 0; n < t.length; n++) void 0 !== t[n].strict && (e[t[n].strict] = t[n].text);
return e;
}(t),
anchor: e || "count"
};
}, h = "|", m = {
type: "literal",
value: "|",
description: '"|"'
}, g = function(t, e) {
return [ t ].concat(e);
}, v = function(t) {
return [ t ];
}, y = "=", b = {
type: "literal",
value: "=",
description: '"="'
}, E = /^[0-9]/, w = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, _ = " ", T = {
type: "literal",
value: " ",
description: '" "'
}, S = function(t, e) {
return {
strict: t.join(""),
text: e.join("")
};
}, k = function() {
return {
text: at()
};
}, A = "\\", F = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, O = /^[\\|)(]/, L = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, x = function(t) {
return t;
}, C = void 0, N = {
type: "any",
description: "any character"
}, I = function() {
return at();
}, R = ":", P = {
type: "literal",
value: ":",
description: '":"'
}, j = function(t) {
return t;
}, D = "#{", M = {
type: "literal",
value: "#{",
description: '"#{"'
}, U = "}", B = {
type: "literal",
value: "}",
description: '"}"'
}, H = function(t) {
return {
type: "variable",
anchor: t
};
}, W = ".", q = {
type: "literal",
value: ".",
description: '"."'
}, $ = function() {
return at();
}, z = /^[a-zA-Z_$]/, G = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, X = /^[a-zA-Z0-9_$]/, Y = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, K = function(t) {
return t;
}, V = function(t) {
return {
type: "literal",
text: t.join("")
};
}, Z = /^[\\#()|]/, J = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, Q = 0, tt = 0, et = 0, nt = {
line: 1,
column: 1,
seenCR: !1
}, rt = 0, it = [], ot = 0;
if ("startRule" in r) {
if (!(r.startRule in o)) throw new Error("Can't start parsing from rule \"" + r.startRule + '".');
a = o[r.startRule];
}
function at() {
return e.substring(tt, Q);
}
function st(t) {
return et !== t && (et > t && (et = 0, nt = {
line: 1,
column: 1,
seenCR: !1
}), function(t, n, r) {
var i, o;
for (i = n; i < r; i++) "\n" === (o = e.charAt(i)) ? (t.seenCR || t.line++, t.column = 1, 
t.seenCR = !1) : "\r" === o || "\u2028" === o || "\u2029" === o ? (t.line++, t.column = 1, 
t.seenCR = !0) : (t.column++, t.seenCR = !1);
}(nt, et, t), et = t), nt;
}
function lt(t) {
Q < rt || (Q > rt && (rt = Q, it = []), it.push(t));
}
function ct(n, r, i) {
var o = st(i), a = i < e.length ? e.charAt(i) : null;
return null !== r && function(t) {
var e = 1;
for (t.sort(function(t, e) {
return t.description < e.description ? -1 : t.description > e.description ? 1 : 0;
}); e < t.length; ) t[e - 1] === t[e] ? t.splice(e, 1) : e++;
}(r), new t(null !== n ? n : function(t, e) {
var n, r = new Array(t.length);
for (n = 0; n < t.length; n++) r[n] = t[n].description;
return "Expected " + (t.length > 1 ? r.slice(0, -1).join(", ") + " or " + r[t.length - 1] : r[0]) + " but " + (e ? '"' + function(t) {
function e(t) {
return t.charCodeAt(0).toString(16).toUpperCase();
}
return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(t) {
return "\\x0" + e(t);
}).replace(/[\x10-\x1F\x80-\xFF]/g, function(t) {
return "\\x" + e(t);
}).replace(/[\u0180-\u0FFF]/g, function(t) {
return "\\u0" + e(t);
}).replace(/[\u1080-\uFFFF]/g, function(t) {
return "\\u" + e(t);
});
}(e) + '"' : "end of input") + " found.";
}(r, a), r, a, i, o.line, o.column);
}
function ut() {
var t, e;
for (t = [], (e = vt()) === i && (e = ft()) === i && (e = ht()); e !== i; ) t.push(e), 
(e = vt()) === i && (e = ft()) === i && (e = ht());
return t;
}
function ft() {
var t, n, r, o, a;
return t = Q, e.substr(Q, 2) === l ? (n = l, Q += 2) : (n = i, 0 === ot && lt(c)), 
n !== i && (r = function t() {
var n, r, o, a;
return n = Q, (r = dt()) !== i ? (124 === e.charCodeAt(Q) ? (o = h, Q++) : (o = i, 
0 === ot && lt(m)), o !== i && (a = t()) !== i ? (tt = n, r = g(r, a), n = r) : (Q = n, 
n = s)) : (Q = n, n = s), n === i && (n = Q, (r = dt()) !== i && (tt = n, r = v(r)), 
n = r), n;
}()) !== i ? (e.substr(Q, 2) === u ? (o = u, Q += 2) : (o = i, 0 === ot && lt(f)), 
o !== i ? ((a = function() {
var t, n, r;
return t = Q, 58 === e.charCodeAt(Q) ? (n = R, Q++) : (n = i, 0 === ot && lt(P)), 
n !== i && (r = mt()) !== i ? (tt = t, n = j(r), t = n) : (Q = t, t = s), t;
}()) === i && (a = d), a !== i ? (tt = t, t = n = p(r, a)) : (Q = t, t = s)) : (Q = t, 
t = s)) : (Q = t, t = s), t;
}
function dt() {
var t, n, r, o, a, l;
if (t = Q, 61 === e.charCodeAt(Q) ? (n = y, Q++) : (n = i, 0 === ot && lt(b)), n !== i) {
if (r = [], E.test(e.charAt(Q)) ? (o = e.charAt(Q), Q++) : (o = i, 0 === ot && lt(w)), 
o !== i) for (;o !== i; ) r.push(o), E.test(e.charAt(Q)) ? (o = e.charAt(Q), Q++) : (o = i, 
0 === ot && lt(w)); else r = s;
if (r !== i) if (32 === e.charCodeAt(Q) ? (o = _, Q++) : (o = i, 0 === ot && lt(T)), 
o === i && (o = d), o !== i) {
if (a = [], (l = pt()) !== i) for (;l !== i; ) a.push(l), l = pt(); else a = s;
a !== i ? (tt = t, t = n = S(r, a)) : (Q = t, t = s);
} else Q = t, t = s; else Q = t, t = s;
} else Q = t, t = s;
if (t === i) {
if (t = Q, n = [], (r = pt()) !== i) for (;r !== i; ) n.push(r), r = pt(); else n = s;
n !== i && (tt = t, n = k()), t = n;
}
return t;
}
function pt() {
var t, n, r;
return t = Q, 92 === e.charCodeAt(Q) ? (n = A, Q++) : (n = i, 0 === ot && lt(F)), 
n !== i ? (O.test(e.charAt(Q)) ? (r = e.charAt(Q), Q++) : (r = i, 0 === ot && lt(L)), 
r !== i ? (tt = t, t = n = x(r)) : (Q = t, t = s)) : (Q = t, t = s), t === i && (t = Q, 
n = Q, ot++, 124 === e.charCodeAt(Q) ? (r = h, Q++) : (r = i, 0 === ot && lt(m)), 
r === i && (e.substr(Q, 2) === u ? (r = u, Q += 2) : (r = i, 0 === ot && lt(f))), 
ot--, r === i ? n = C : (Q = n, n = s), n !== i ? (e.length > Q ? (r = e.charAt(Q), 
Q++) : (r = i, 0 === ot && lt(N)), r !== i ? (tt = t, t = n = I()) : (Q = t, t = s)) : (Q = t, 
t = s)), t;
}
function ht() {
var t, n, r, o;
return t = Q, e.substr(Q, 2) === D ? (n = D, Q += 2) : (n = i, 0 === ot && lt(M)), 
n !== i && (r = mt()) !== i ? (125 === e.charCodeAt(Q) ? (o = U, Q++) : (o = i, 
0 === ot && lt(B)), o !== i ? (tt = t, t = n = H(r)) : (Q = t, t = s)) : (Q = t, 
t = s), t;
}
function mt() {
var t, n, r, o;
if (t = Q, gt() !== i) if (46 === e.charCodeAt(Q) ? (n = W, Q++) : (n = i, 0 === ot && lt(q)), 
n !== i) {
if (r = [], (o = mt()) !== i) for (;o !== i; ) r.push(o), o = mt(); else r = s;
r !== i ? (tt = t, t = $()) : (Q = t, t = s);
} else Q = t, t = s; else Q = t, t = s;
return t === i && (t = gt()), t;
}
function gt() {
var t, n, r, o;
if (t = Q, z.test(e.charAt(Q)) ? (n = e.charAt(Q), Q++) : (n = i, 0 === ot && lt(G)), 
n !== i) {
for (r = [], X.test(e.charAt(Q)) ? (o = e.charAt(Q), Q++) : (o = i, 0 === ot && lt(Y)); o !== i; ) r.push(o), 
X.test(e.charAt(Q)) ? (o = e.charAt(Q), Q++) : (o = i, 0 === ot && lt(Y));
r !== i ? (tt = t, t = n = I()) : (Q = t, t = s);
} else Q = t, t = s;
return t;
}
function vt() {
var t, e, n, r, o;
if (t = Q, e = [], n = Q, r = Q, ot++, (o = ft()) === i && (o = ht()), ot--, o === i ? r = C : (Q = r, 
r = s), r !== i && (o = yt()) !== i ? (tt = n, n = r = K(o)) : (Q = n, n = s), n !== i) for (;n !== i; ) e.push(n), 
n = Q, r = Q, ot++, (o = ft()) === i && (o = ht()), ot--, o === i ? r = C : (Q = r, 
r = s), r !== i && (o = yt()) !== i ? (tt = n, n = r = K(o)) : (Q = n, n = s); else e = s;
return e !== i && (tt = t, e = V(e)), t = e;
}
function yt() {
var t, n, r;
return t = Q, 92 === e.charCodeAt(Q) ? (n = A, Q++) : (n = i, 0 === ot && lt(F)), 
n !== i ? (Z.test(e.charAt(Q)) ? (r = e.charAt(Q), Q++) : (r = i, 0 === ot && lt(J)), 
r !== i ? (tt = t, t = n = x(r)) : (Q = t, t = s)) : (Q = t, t = s), t === i && (e.length > Q ? (t = e.charAt(Q), 
Q++) : (t = i, 0 === ot && lt(N))), t;
}
if ((n = a()) !== i && Q === e.length) return n;
throw n !== i && Q < e.length && lt({
type: "end",
description: "end of input"
}), ct(null, it, rt);
}
};
}();
},
74: function(t, e, n) {
(document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop()).setAttribute("data-manual", 1), 
n(52);
var r = n(75), i = n(78);
function o(t) {
!function(t) {
var e = t.querySelectorAll(".code-example:not([data-prism-highlighted])"), n = !0, i = !1, o = void 0;
try {
for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
var l = a.value;
new r(l), l.setAttribute("data-prism-highlighted", "1");
}
} catch (t) {
i = !0, o = t;
} finally {
try {
n || null == s.return || s.return();
} finally {
if (i) throw o;
}
}
}(t), function(t) {
var e = t.querySelectorAll("div.code-tabs:not([data-prism-highlighted])"), n = !0, r = !1, o = void 0;
try {
for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
var l = a.value;
new i(l), l.setAttribute("data-prism-highlighted", "1");
}
} catch (t) {
r = !0, o = t;
} finally {
try {
n || null == s.return || s.return();
} finally {
if (r) throw o;
}
}
}(t);
}
e.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
o(document);
});
}, e.highlight = o;
},
75: function(t, e, n) {
var r = n(53), i = n(77), o = n(49), a = n(76);
t.exports = function(t) {
var e = t.querySelector("pre"), n = Array.from(e.childNodes).find(function(t) {
return "CODE" === t.tagName;
}), s = n.textContent, l = s;
t.hasAttribute("data-async") && (l = "(async () => {\n".concat(s, "\n})()")), Prism.highlightElement(n);
var c = o(e.innerHTML);
e.insertAdjacentHTML("beforeEnd", c);
var u = a(JSON.parse(t.getAttribute("data-highlight")));
e.insertAdjacentHTML("afterBegin", u);
var f, d, p, h = e.classList.contains("language-javascript"), m = e.classList.contains("language-markup"), g = +t.getAttribute("data-trusted");
!+t.getAttribute("data-no-strict") && h && (l = "'use strict';\n\n" + l);
var v = !0;
if (h || m) {
var y = t.querySelector('[data-action="run"]');
y && (y.onclick = function() {
return this.blur(), T(), !1;
});
var b = t.querySelector('[data-action="edit"]');
b && (b.onclick = function() {
return this.blur(), function() {
var t;
t = m ? _(s) : "<!DOCTYPE html>\n<script>\n".concat(l, "\n<\/script>");
var e = document.createElement("form");
e.action = "https://plnkr.co/edit/?p=preview", e.method = "POST", e.target = "_blank", 
document.body.appendChild(e);
var n = document.createElement("textarea");
n.name = "files[index.html]", n.value = t, e.appendChild(n);
var r = document.createElement("input");
r.name = "description", r.value = "Fork from " + window.location, e.appendChild(r), 
e.submit(), e.remove();
}(), !1;
}), t.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == t.getAttribute("data-autorun") ? t.querySelector("iframe").remove() : setTimeout(T, 100));
}
function E() {
var t = f.contentWindow;
"function" == typeof t.postMessage ? t.postMessage(l, "https://lookatcode.com/showjs") : alert("Sorry, your browser is too old");
}
function w() {
if (t.hasAttribute("data-global")) {
d || ((d = document.createElement("iframe")).className = "js-frame", d.style.width = 0, 
d.style.height = 0, d.style.border = "none", d.name = "js-global-frame", document.body.appendChild(d));
var e = document.createElement("form");
e.style.display = "none", e.method = "POST", e.enctype = "multipart/form-data", 
e.action = "https://lookatcode.com/showhtml", e.target = "js-global-frame";
var n = document.createElement("textarea");
n.name = "code", n.value = _("<script>\n".concat(l, "\n<\/script>")), e.appendChild(n), 
d.parentNode.insertBefore(e, d.nextSibling), e.submit(), e.remove();
} else if (g) {
if (t.hasAttribute("data-autorun")) return r = l, (i = document.createElement("script")).text = r, 
void document.head.appendChild(i).parentNode.removeChild(i);
try {
window.eval.call(window, l);
} catch (t) {
alert(t.constructor.name + ": " + t.message);
}
} else t.hasAttribute("data-refresh") && f && (f.remove(), f = null), f ? E() : ((f = document.createElement("iframe")).className = "js-frame", 
f.src = "https://lookatcode.com/showjs", f.style.width = 0, f.style.height = 0, 
f.style.border = "none", f.onload = function() {
E();
}, document.body.appendChild(f));
var r, i;
}
function _(t) {
if (t.match(/^\s*<!doctype/i)) return t;
var e = t;
return t.match(/<body/i) || (e = "<body>\n".concat(e, "\n</body>")), e = "<!doctype html>\n" + e;
}
function T() {
h ? w() : function() {
var e;
if (p && t.hasAttribute("data-refresh") && (p.remove(), p = null), p || (p = t.querySelector(".code-result")), 
p) e = p.querySelector("iframe"); else {
if ((p = document.createElement("div")).className = "code-result code-example__result", 
(e = document.createElement("iframe")).name = "frame-" + Math.random(), e.className = "code-result__iframe", 
"0" === t.getAttribute("data-demo-height")) p.style.display = "none"; else if (t.hasAttribute("data-demo-height")) {
var n = +t.getAttribute("data-demo-height");
e.style.height = n + "px";
}
p.appendChild(e), t.appendChild(p);
}
if (g) {
var o = e.contentDocument || e.contentWindow.document;
o.open(), o.write(_(s)), o.close(), t.hasAttribute("data-demo-height") || r.iframe(e), 
v && t.hasAttribute("data-autorun") || i(p) || p.scrollIntoView(!1);
} else {
var a = document.createElement("form");
a.style.display = "none", a.method = "POST", a.enctype = "multipart/form-data", 
a.action = "https://lookatcode.com/showhtml", a.target = e.name;
var l = document.createElement("textarea");
l.name = "code", l.value = _(s), a.appendChild(l), e.parentNode.insertBefore(a, e.nextSibling), 
a.submit(), a.remove(), v && t.hasAttribute("data-autorun") || (e.onload = function() {
t.hasAttribute("data-demo-height") || r.iframe(e), i(p) || p.scrollIntoView(!1);
});
}
}(), v = !1;
}
};
},
76: function(t, e) {
t.exports = function(t) {
if (!t || !t.length) return "";
var e = [], n = !0, r = !1, i = void 0;
try {
for (var o, a = t[Symbol.iterator](); !(n = (o = a.next()).done); n = !0) {
var s = o.value, l = '<code class="block-highlight'.concat(s.cols ? " block-highlight_inline" : "", '" data-start="').concat(s.start, '">');
if (l += "\n".repeat(s.start), s.end) l += '<code class="mask">'.concat("\n".repeat(s.end - s.start + 1), "</code>"); else if (s.cols) for (var c = 0; c < s.cols.length; c++) {
var u = s.cols[c], f = 0 === c ? null : s.cols[c - 1];
l += " ".repeat(f ? u.start - f.end : u.start), l += '<code class="mask-inline">'.concat(" ".repeat(u.end - u.start), "</code>");
}
l += "</code>", e.push(l);
}
} catch (t) {
r = !0, i = t;
} finally {
try {
n || null == a.return || a.return();
} finally {
if (r) throw i;
}
}
return e.join("");
};
},
77: function(t, e) {
t.exports = function(t) {
var e = t.getBoundingClientRect(), n = 0;
if (e.top < 0) n = e.bottom; else {
if (!(e.bottom > window.innerHeight)) return !0;
n = window.innerHeight - top;
}
return n > 10;
};
},
78: function(t, e, n) {
function r(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
var i = n(3), o = n(49), a = function() {
function t(e) {
var n = this;
if (function(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}(this, t), !window.ebookType) {
this.elem = e, this.translateX = 0, this.switchesElem = e.querySelector("[data-code-tabs-switches]"), 
this.switchesElemItems = this.switchesElem.firstElementChild, this.arrowLeft = e.querySelector("[data-code-tabs-left]"), 
this.arrowRight = e.querySelector("[data-code-tabs-right]"), this.arrowLeft.onclick = function(t) {
t.preventDefault(), n.translateX = Math.max(0, n.translateX - n.switchesElem.offsetWidth), 
n.renderTranslate();
}, this.arrowRight.onclick = function(t) {
t.preventDefault(), n.translateX = Math.min(n.translateX + n.switchesElem.offsetWidth, n.switchesElemItems.offsetWidth - n.switchesElem.offsetWidth), 
n.renderTranslate();
};
var r = this.elem.querySelector(".code-tabs__section_current");
r !== r.parentElement.firstElementChild && this.highlightTab(r), this.delegate(".code-tabs__switch", "click", this.onSwitchClick);
}
}
var e, n, i;
return e = t, (n = [ {
key: "onSwitchClick",
value: function(t) {
t.preventDefault();
for (var e, n = t.delegateTarget.parentNode.children, r = this.elem.querySelector("[data-code-tabs-content]").children, i = 0; i < n.length; i++) {
var o = n[i], a = r[i];
o === t.delegateTarget ? (e = i, a.classList.add("code-tabs__section_current"), 
o.classList.add("code-tabs__switch_current")) : (a.classList.remove("code-tabs__section_current"), 
o.classList.remove("code-tabs__switch_current"));
}
0 === e ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(r[e]));
}
}, {
key: "highlightTab",
value: function(t) {
if (!t.highlighted) {
var e = t.querySelector("pre"), n = e.querySelector("code");
Prism.highlightElement(n), e.insertAdjacentHTML("beforeEnd", o(e.innerHTML)), t.highlighted = !0;
}
}
}, {
key: "renderTranslate",
value: function() {
this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)", 
0 === this.translateX ? this.arrowLeft.setAttribute("disabled", "") : this.arrowLeft.removeAttribute("disabled"), 
this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth ? this.arrowRight.setAttribute("disabled", "") : this.arrowRight.removeAttribute("disabled");
}
} ]) && r(e.prototype, n), i && r(e, i), t;
}();
i.delegateMixin(a.prototype), t.exports = a;
},
79: function(t, e, n) {
function r(t) {
return function(t) {
if (Array.isArray(t)) {
for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
return n;
}
}(t) || function(t) {
if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
}(t) || function() {
throw new TypeError("Invalid attempt to spread non-iterable instance");
}();
}
function i(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
var o = n(267), a = function() {
function t(e) {
!function(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}(this, t), this.slider = e.el, this.list = this.slider.querySelector("ul"), e.class && (this.classList = e.class.split(" ")), 
this.disabled = !1, this.init(), this.bindHandlers();
}
var e, n, a;
return e = t, (n = [ {
key: "init",
value: function() {
var t;
this.classList && this.classList.length && (t = this.slider.classList).add.apply(t, r(this.classList)), 
this.slider.classList.add("slider_disable-left");
var e = document.createElement("div");
e.classList.add("slider__container"), e.appendChild(this.list), this.slider.innerHTML = '<button class="slider__arrow slider__arrow_left"></button><button class="slider__arrow slider__arrow_right"></button>', 
this.slider.appendChild(e), this.innerWidth = this.countInnerWidth(), this.arrowLeft = this.slider.querySelector(".slider__arrow_left"), 
this.arrowRight = this.slider.querySelector(".slider__arrow_right");
}
}, {
key: "countInnerWidth",
value: function() {
return r(this.list.querySelectorAll("li")).reduce(function(t, e) {
var n = window.getComputedStyle(e);
return t + (e.offsetWidth + parseFloat(n.marginLeft) + parseFloat(n.marginRight));
}, 0);
}
}, {
key: "bindHandlers",
value: function() {
var t = this;
this.transformX = 0, this.arrowLeft.addEventListener("click", function() {
t.transformX -= t.list.clientWidth, t.transformX < 0 && (t.transformX = 0), t.render();
}), this.arrowRight.addEventListener("click", function() {
t.transformX = Math.min(t.transformX + t.list.clientWidth, t.list.scrollWidth - t.list.clientWidth), 
t.render();
}), window.addEventListener("resize", o(function() {
t.onResize();
}, 200)), this.onResize();
}
}, {
key: "onResize",
value: function() {
!this.disabled && this.innerWidth <= this.list.offsetWidth ? (this.slider.classList.add("slider_disabled"), 
this.disabled = !0, this.transformX > 0 && (this.transformX = 0, this.slider.classList.contains("slider_disable-right") && this.slider.classList.remove("slider_disable-right"), 
this.render())) : this.disabled && this.innerWidth > this.list.offsetWidth && (this.slider.classList.remove("slider_disabled"), 
this.slider.classList.contains("slider_disable-right") && this.slider.classList.remove("slider_disable-right"), 
this.disabled = !1);
}
}, {
key: "render",
value: function() {
this.list.style.transform = this.transformX > 0 ? "translateX(".concat(-this.transformX, "px)") : "translateX(0)", 
0 === this.transformX ? this.slider.classList.add("slider_disable-left") : this.slider.classList.remove("slider_disable-left"), 
this.transformX == this.list.scrollWidth - this.list.clientWidth ? this.slider.classList.add("slider_disable-right") : this.slider.classList.remove("slider_disable-right");
}
} ]) && i(e.prototype, n), a && i(e, a), t;
}();
t.exports = a;
},
8: function(t, e, n) {
"use strict";
var r = {};
function i(t) {
var e;
return r[t] ? t : (e = t.toLowerCase().replace("_", "-"), r[e] ? e : (e = e.split("-")[0], 
r[e] ? e : null));
}
function o(t, e) {
var n = i(t);
if (!n) return -1;
if (!r[n].cFn) return 0;
var o = String(e), a = o.indexOf(".") < 0 ? "" : o.split(".")[1], s = a.length, l = +e, c = +o.split(".")[0], u = 0 === a.length ? 0 : +a.replace(/0+$/, "");
return r[n].cFn(l, c, s, +a, u);
}
function a(t, e) {
var n = i(t);
if (!n) return -1;
if (!r[n].oFn) return 0;
var o = String(e), a = o.indexOf(".") < 0 ? "" : o.split(".")[1], s = a.length, l = +e, c = +o.split(".")[0], u = 0 === a.length ? 0 : +a.replace(/0+$/, "");
return r[n].oFn(l, c, s, +a, u);
}
t.exports = function(t, e) {
var n = i(t);
return n ? r[n].c[o(n, e)] : null;
}, t.exports.indexOf = o, t.exports.forms = function(t) {
var e = i(t);
return r[e] ? r[e].c : null;
}, t.exports.ordinal = function(t, e) {
var n = i(t);
return r[n] ? r[n].o[a(n, e)] : null;
}, t.exports.ordinal.indexOf = a, t.exports.ordinal.forms = function(t) {
var e = i(t);
return r[e] ? r[e].o : null;
};
var s = [ "zero", "one", "two", "few", "many", "other" ];
function l(t) {
return s[t];
}
function c(t, e) {
var n;
for (e.c = e.c ? e.c.map(l) : [ "other" ], e.o = e.o ? e.o.map(l) : [ "other" ], 
n = 0; n < t.length; n++) r[t[n]] = e;
}
function u(t, e, n) {
return t <= n && n <= e && n % 1 == 0;
}
function f(t, e) {
return t.indexOf(e) >= 0;
}
c([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
}
}), c([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(t) {
return u(0, 1, t) ? 0 : 1;
}
}), c([ "am", "fa", "kn", "zu" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
}
}), c([ "ar", "ars" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(t) {
var e = t % 100;
return 0 === t ? 0 : 1 === t ? 1 : 2 === t ? 2 : u(3, 10, e) ? 3 : u(11, 99, e) ? 4 : 5;
}
}), c([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(t) {
return f([ 1, 5, 7, 8, 9, 10 ], t) ? 0 : f([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 6 === t ? 3 : 4;
}
}), c([ "ast", "de", "et", "fi", "fy", "gl", "ji", "nl", "sw", "ur", "yi" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
}
}), c([ "az" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 3, 4, 5 ],
oFn: function(t, e) {
var n = e % 10, r = e % 100, i = e % 1e3;
return f([ 1, 2, 5, 7, 8 ], n) || f([ 20, 50, 70, 80 ], r) ? 0 : f([ 3, 4 ], n) || f([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], i) ? 1 : 0 === e || 6 === n || f([ 40, 60, 90 ], r) ? 2 : 3;
}
}), c([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t) {
var e = t % 10, n = t % 100;
return 1 === e && 11 !== n ? 0 : u(2, 4, e) && !u(12, 14, n) ? 1 : 0 === e || u(5, 9, e) || u(11, 14, n) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(t) {
var e = t % 100;
return f([ 2, 3 ], t % 10) && !f([ 12, 13 ], e) ? 0 : 1;
}
}), c([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "yue", "zh" ], {}), 
c([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t) {
var e = t % 10, n = t % 100, r = t % 1e6;
return 1 !== e || f([ 11, 71, 91 ], n) ? 2 !== e || f([ 12, 72, 92 ], n) ? !u(3, 4, e) && 9 !== e || u(10, 19, n) || u(70, 79, n) || u(90, 99, n) ? 0 !== t && 0 === r ? 3 : 4 : 2 : 1 : 0;
}
}), c([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e, n, r) {
var i = e % 10, o = e % 100, a = r % 10, s = r % 100;
return 0 === n && 1 === i && 11 !== o || 1 === a && 11 !== s ? 0 : 0 === n && u(2, 4, i) && !u(12, 14, o) || u(2, 4, a) && !u(12, 14, s) ? 1 : 2;
}
}), c([ "ca" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
return f([ 1, 3 ], t) ? 0 : 2 === t ? 1 : 4 === t ? 2 : 3;
}
}), c([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : u(2, 4, e) && 0 === n ? 1 : 0 !== n ? 2 : 3;
}
}), c([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : 2 === t ? 2 : 3 === t ? 3 : 6 === t ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(t) {
return f([ 0, 7, 8, 9 ], t) ? 0 : 1 === t ? 1 : 2 === t ? 2 : f([ 3, 4 ], t) ? 3 : f([ 5, 6 ], t) ? 4 : 5;
}
}), c([ "da" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r, i) {
return 1 === t || 0 !== i && f([ 0, 1 ], e) ? 0 : 1;
}
}), c([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t, e, n, r) {
var i = e % 100, o = r % 100;
return 0 === n && 1 === i || 1 === o ? 0 : 0 === n && 2 === i || 2 === o ? 1 : 0 === n && u(3, 4, i) || u(3, 4, o) ? 2 : 3;
}
}), c([ "en" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return 1 === e && 11 !== n ? 0 : 2 === e && 12 !== n ? 1 : 3 === e && 13 !== n ? 2 : 3;
}
}), c([ "ff", "kab" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return f([ 0, 1 ], e) ? 0 : 1;
}
}), c([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
var i = e % 10, o = r % 10;
return 0 === n && f([ 1, 2, 3 ], e) || 0 === n && !f([ 4, 6, 9 ], i) || 0 !== n && !f([ 4, 6, 9 ], o) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), c([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return f([ 0, 1 ], e) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), c([ "ga" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 2 === t ? 1 : u(3, 6, t) ? 2 : u(7, 10, t) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), c([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t) {
return f([ 1, 11 ], t) ? 0 : f([ 2, 12 ], t) ? 1 : u(3, 10, t) || u(13, 19, t) ? 2 : 3;
}
}), c([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(t) {
return 1 === t ? 0 : f([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 6 === t ? 3 : 4;
}
}), c([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && f([ 0, 20, 40, 60, 80 ], e % 100) ? 2 : 0 !== n ? 3 : 4;
}
}), c([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(t, e, n) {
var r = t % 10;
return 1 === e && 0 === n ? 0 : 2 === e && 0 === n ? 1 : 0 !== n || u(0, 10, t) || 0 !== r ? 3 : 2;
}
}), c([ "hu" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return f([ 1, 5 ], t) ? 0 : 1;
}
}), c([ "is" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r, i) {
return 0 === i && 1 === e % 10 && 11 !== e % 100 || 0 !== i ? 0 : 1;
}
}), c([ "it" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(t) {
return f([ 11, 8, 80, 800 ], t) ? 0 : 1;
}
}), c([ "iu", "kw", "naq", "se", "sma", "smi", "smj", "smn", "sms" ], {
c: [ 1, 2, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 2 === t ? 1 : 2;
}
}), c([ "ka" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(t, e) {
var n = e % 100;
return 1 === e ? 0 : 0 === e || u(2, 20, n) || 40 === n || 60 === n || 80 === n ? 1 : 2;
}
}), c([ "kk" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(t) {
var e = t % 10;
return 6 === e || 9 === e || 0 === e && 0 !== t ? 0 : 1;
}
}), c([ "ksh" ], {
c: [ 0, 1, 5 ],
cFn: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : 2;
}
}), c([ "lag" ], {
c: [ 0, 1, 5 ],
cFn: function(t, e) {
return 0 === t ? 0 : f([ 0, 1 ], e) && 0 !== t ? 1 : 2;
}
}), c([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), c([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n, r) {
var i = t % 10, o = t % 100;
return 1 !== i || u(11, 19, o) ? u(2, 9, i) && !u(11, 19, o) ? 1 : 0 !== r ? 2 : 3 : 0;
}
}), c([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(t, e, n, r) {
var i = t % 10, o = t % 100, a = r % 100, s = r % 10;
return 0 === i || u(11, 19, o) || 2 === n && u(11, 19, a) ? 0 : 1 === i && 11 !== o || 2 === n && 1 === s && 11 !== a || 2 !== n && 1 === s ? 1 : 2;
}
}), c([ "mk" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
return 0 === n && 1 === e % 10 || 1 === r % 10 ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(t, e) {
var n = e % 10, r = e % 100;
return 1 === n && 11 !== r ? 0 : 2 === n && 12 !== r ? 1 : f([ 7, 8 ], n) && !f([ 17, 18 ], r) ? 2 : 3;
}
}), c([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 0 !== n || 0 === t || 1 !== t && u(1, 19, t % 100) ? 1 : 2;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), c([ "mr" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
return 1 === t ? 0 : f([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 3;
}
}), c([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t) {
var e = t % 100;
return 1 === t ? 0 : 0 === t || u(2, 10, e) ? 1 : u(11, 19, e) ? 2 : 3;
}
}), c([ "ne" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return u(1, 4, t) ? 0 : 1;
}
}), c([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 1 === e && 0 === n ? 0 : 0 === n && u(2, 4, r) && !u(12, 14, i) ? 1 : 0 === n && 1 !== e && u(0, 1, r) || 0 === n && u(5, 9, r) || 0 === n && u(12, 14, i) ? 2 : 3;
}
}), c([ "pt" ], {
c: [ 1, 5 ],
cFn: function(t) {
return u(0, 2, t) && 2 !== t ? 0 : 1;
}
}), c([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === t && 0 === n ? 0 : 1;
}
}), c([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 0 === n && 1 === r && 11 !== i ? 0 : 0 === n && u(2, 4, r) && !u(12, 14, i) ? 1 : 0 === n && 0 === r || 0 === n && u(5, 9, r) || 0 === n && u(11, 14, i) ? 2 : 3;
}
}), c([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : u(2, 10, t) ? 1 : 2;
}
}), c([ "si" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
return f([ 0, 1 ], t) || 0 === e && 1 === r ? 0 : 1;
}
}), c([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t, e, n) {
var r = e % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && u(3, 4, r) || 0 !== n ? 2 : 3;
}
}), c([ "sq" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 4 === t % 10 && 14 !== t % 100 ? 1 : 2;
}
}), c([ "sv" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
var e = t % 100;
return f([ 1, 2 ], t % 10) && !f([ 11, 12 ], e) ? 0 : 1;
}
}), c([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(t) {
return u(0, 1, t) || u(11, 99, t) ? 0 : 1;
}
}), c([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 0 === n && 1 === r && 11 !== i ? 0 : 0 === n && u(2, 4, r) && !u(12, 14, i) ? 1 : 0 === n && 0 === r || 0 === n && u(5, 9, r) || 0 === n && u(11, 14, i) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(t) {
return 3 === t % 10 && 13 !== t % 100 ? 0 : 1;
}
});
},
9: function(t, e) {
function n(t) {
if (t = t || {}, this.elem = t.elem, this.size = t.size || "medium", this.class = t.class ? " " + t.class : "", 
this.elemClass = t.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw new Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
n.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, n.prototype.stop = function() {
var t = this.elem.querySelector(".spinner");
t && (t.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, window.Spinner = n, t.exports = n;
}
});