/*! For license information please see tutorial.2354a6c38f06ce783a89.js.LICENSE.txt */
var tutorial = function(e) {
var t = {};
function n(r) {
if (t[r]) return t[r].exports;
var a = t[r] = {
i: r,
l: !1,
exports: {}
};
return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports;
}
return n.m = e, n.c = t, n.d = function(e, t, r) {
n.o(e, t) || Object.defineProperty(e, t, {
enumerable: !0,
get: r
});
}, n.r = function(e) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value: "Module"
}), Object.defineProperty(e, "__esModule", {
value: !0
});
}, n.t = function(e, t) {
if (1 & t && (e = n(e)), 8 & t) return e;
if (4 & t && "object" == typeof e && e && e.__esModule) return e;
var r = Object.create(null);
if (n.r(r), Object.defineProperty(r, "default", {
enumerable: !0,
value: e
}), 2 & t && "string" != typeof e) for (var a in e) n.d(r, a, function(t) {
return e[t];
}.bind(null, a));
return r;
}, n.n = function(e) {
var t = e && e.__esModule ? function() {
return e.default;
} : function() {
return e;
};
return n.d(t, "a", t), t;
}, n.o = function(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}, n.p = "/pack/", n(n.s = 8);
}([ function(e, t) {
function n(e, t, n, r, a) {
e.addEventListener(n, (function(e) {
let n = function(e, t) {
let n = e.target;
for (;n; ) {
if (n.matches(t)) return n;
if (n == e.currentTarget) break;
n = n.parentElement;
}
return null;
}(e, t);
e.delegateTarget = n, n && r.call(a || this, e);
}));
}
n.delegateMixin = function(e) {
e.delegate = function(e, t, r) {
n(this.elem, e, t, r, this);
};
}, e.exports = n;
}, function(e, t) {
e.exports = {
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
name: "Google",
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
stripeKey: "pk_live_51HXm0nFjeNqw1p5a3mjFxSeNHh8OL94IyGcp3PHbZVoNuYUYjlM57YtZMIAM1zrEd1F6WIKfFs67KbTemRdNIySo00KfWS1yhr",
lookatCodeUrlBase: "https://lookatcode.com"
};
}, function(e, t) {
e.exports = function(e) {
var t = typeof e;
return null != e && ("object" == t || "function" == t);
};
}, function(e, t) {
e.exports = function(e) {
let t, n = 1 + e.split("\n").length, r = new Array(n);
return r = r.join("<span></span>"), t = '<span class="line-numbers-rows">'.concat(r, "</span>"), 
t;
};
}, function(e, t, n) {
var r = n(36), a = n(2);
e.exports = function(e, t, n) {
var i = !0, s = !0;
if ("function" != typeof e) throw new TypeError("Expected a function");
return a(n) && (i = "leading" in n ? !!n.leading : i, s = "trailing" in n ? !!n.trailing : s), 
r(e, t, {
leading: i,
maxWait: t,
trailing: s
});
};
}, function(e, t, n) {
var r = n(38), a = "object" == typeof self && self && self.Object === Object && self, i = r || a || Function("return this")();
e.exports = i;
}, function(e, t, n) {
var r = n(5).Symbol;
e.exports = r;
}, function(e, t, n) {
let r = n(4), a = n(0);
class i {
constructor(e) {
this.elem = e, this.throttleFilter = r(this.filter, 200), this.showTasksCheckbox = e.querySelector("[data-tutorial-map-show-tasks]"), 
this.showTasksCheckbox.checked = +sessionStorage.showTasksCheckbox, this.updateShowTasks(), 
this.showTasksCheckbox.onchange = this.updateShowTasks.bind(this), this.filterInput = this.elem.querySelector("[data-tutorial-map-filter]"), 
this.textInputBlock = this.elem.querySelector(".tutorial-map__filter .text-input"), 
this.filterInput.oninput = this.onFilterInput.bind(this), this.filterInput.onkeydown = this.onFilterKeydown.bind(this), 
this.elem.querySelector(".text-input__clear").onclick = () => {
this.filterInput.value = "", this.showClearButton(!1), this.filter("");
}, this.chaptersCollapsed = JSON.parse(sessionStorage.tutorialMapChapters || "{}"), 
this.showChaptersCollapsed(), this.delegate(".tutorial-map__item > .tutorial-map__link", "click", (e => {
e.preventDefault();
let t = e.delegateTarget.getAttribute("href");
this.chaptersCollapsed[t] ? delete this.chaptersCollapsed[t] : this.chaptersCollapsed[t] = 1, 
sessionStorage.tutorialMapChapters = JSON.stringify(this.chaptersCollapsed), this.showChaptersCollapsed();
}));
let t = this.elem.querySelector('.tutorial-map-list-three__link[href="' + location.pathname + '"]');
t && t.classList.add("tutorial-map-list-three__link_active"), this.filterInput.focus();
}
showChaptersCollapsed() {
let e = this.elem.querySelectorAll(".tutorial-map__item > .tutorial-map__link");
for (let t = 0; t < e.length; t++) {
let n = e[t];
this.chaptersCollapsed[n.getAttribute("href")] ? n.parentNode.classList.add("tutorial-map__item_collapsed") : n.parentNode.classList.remove("tutorial-map__item_collapsed");
}
}
updateShowTasks() {
this.showTasksCheckbox.checked ? this.elem.classList.add("tutorial-map_show-tasks") : this.elem.classList.remove("tutorial-map_show-tasks"), 
sessionStorage.showTasksCheckbox = this.showTasksCheckbox.checked ? "1" : "0";
}
onFilterInput(e) {
this.showClearButton(e.target.value), this.throttleFilter(e.target.value);
}
onFilterKeydown(e) {
27 === e.keyCode && (this.filterInput.value = "", this.showClearButton(!1), this.filter(""));
}
showClearButton(e) {
e ? this.textInputBlock.classList.add("text-input_clear-button") : this.textInputBlock.classList.remove("text-input_clear-button");
}
focus() {
this.elem.tabIndex = -1, this.elem.focus();
}
filter(e) {
e = e.toLowerCase();
let t = this.showTasksCheckbox.checked, n = (this.elem.querySelectorAll(".tutorial-map-list a"), 
this.elem.querySelectorAll(".tutorial-map-list-two__item"));
function r(t) {
return function(e, t) {
let n = 0, r = 0;
for (;n < e.length && r < t.length; ) e[n] === t[r] ? (n++, r++) : n++;
return r === t.length;
}(t.querySelector("a").innerHTML.toLowerCase(), e.replace(/\s/g, ""));
}
for (let e = 0; e < n.length; e++) {
let a = n[e], i = a.querySelectorAll(".tutorial-map-list-three__item"), s = Array.prototype.reduce.call(i, (function(e, n) {
let a = !1;
if (t) {
let e = n.querySelectorAll(".tutorial-map-list-four__item");
a = Array.prototype.reduce.call(e, (function(e, t) {
let n = r(t);
return t.hidden = !n, e || n;
}), !1);
}
let i = a || r(n);
return n.hidden = !i, e || i;
}), !1);
a.hidden = !(s || r(a));
}
}
}
e.exports = i, a.delegateMixin(i.prototype);
}, function(e, t, n) {
n(9), e.exports = n(46);
}, function(module, exports, __webpack_require__) {
const delegate = __webpack_require__(0), prism = __webpack_require__(10), ItemSlider = __webpack_require__(35);
function init() {
initTaskButtons(), initFolderList(), initViewMoreButton(), initCoursesSlider(), 
prism.init();
}
function initTaskButtons() {
delegate(document, ".task__solution", "click", (function(e) {
e.target.closest(".task").classList.toggle("task_answer_open");
})), delegate(document, ".task__answer-close", "click", (function(e) {
e.target.closest(".task").classList.toggle("task_answer_open");
})), delegate(document, ".task__step-show", "click", (function(e) {
e.target.closest(".task__step").classList.toggle("task_step_open");
}));
}
function initViewMoreButton() {
delegate(document, "a.list-sub__more", "click", (function(e) {
e.preventDefault();
const t = e.target;
for (let e of t.closest(".list-sub").querySelectorAll(".list-sub__item_phone_hidden")) e.classList.remove("list-sub__item_phone_hidden");
t.style.display = "none";
}));
}
function initFolderList() {
delegate(document, ".lessons-list__lesson_level_1 > .lessons-list__link", "click", (function(e) {
let t = e.delegateTarget, n = t.closest(".lessons-list").querySelector(".lessons-list__lesson_open");
n && n !== t.parentNode && n.classList.remove("lessons-list__lesson_open"), t.parentNode.classList.toggle("lessons-list__lesson_open"), 
e.preventDefault();
}));
}
function initCoursesSlider() {
const e = document.querySelector("[data-courses-slider]");
e && new ItemSlider({
el: e,
class: "slider_frontpage"
});
}
window.runDemo = function(button) {
let demoElem, parent = button;
for (;(parent = parent.parentElement) && (demoElem = parent.querySelector("[data-demo]"), 
!demoElem); ) ;
demoElem ? eval(demoElem.textContent) : alert("Error, no demo element");
}, init();
}, function(e, t, n) {
(document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop()).setAttribute("data-manual", 1), 
n(11);
let r = n(23), a = n(32), i = n(33);
function s(e) {
!function(e) {
let t = e.querySelectorAll(".code-example:not([data-prism-highlighted])");
for (let e of t) new r(e), e.setAttribute("data-prism-highlighted", "1");
}(e), function(e) {
let t = e.querySelectorAll("div.code-tabs:not([data-prism-highlighted])");
for (let e of t) new a(e), e.setAttribute("data-prism-highlighted", "1");
}(e);
}
t.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", (function() {
s(document);
})), i();
}, t.highlight = s;
}, function(e, t, n) {
n(12), n(13), n(14), n(15), n(16), n(17), n(18), n(19), n(20), n(21), n(22), Prism.hooks.add("wrap", (function(e) {
"span" === e.tag && (e.tag = "code");
}));
}, function(e, t) {
var n = function(e) {
var t = /\blang(?:uage)?-([\w-]+)\b/i, n = 0, r = {
manual: e.Prism && e.Prism.manual,
disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
util: {
encode: function e(t) {
return t instanceof a ? new a(t.type, e(t.content), t.alias) : Array.isArray(t) ? t.map(e) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
},
type: function(e) {
return Object.prototype.toString.call(e).slice(8, -1);
},
objId: function(e) {
return e.__id || Object.defineProperty(e, "__id", {
value: ++n
}), e.__id;
},
clone: function e(t, n) {
var a, i;
switch (n = n || {}, r.util.type(t)) {
case "Object":
if (i = r.util.objId(t), n[i]) return n[i];
for (var s in a = {}, n[i] = a, t) t.hasOwnProperty(s) && (a[s] = e(t[s], n));
return a;

case "Array":
return i = r.util.objId(t), n[i] ? n[i] : (a = [], n[i] = a, t.forEach((function(t, r) {
a[r] = e(t, n);
})), a);

default:
return t;
}
},
getLanguage: function(e) {
for (;e && !t.test(e.className); ) e = e.parentElement;
return e ? (e.className.match(t) || [ , "none" ])[1].toLowerCase() : "none";
},
currentScript: function() {
if ("undefined" == typeof document) return null;
if ("currentScript" in document) return document.currentScript;
try {
throw new Error;
} catch (r) {
var e = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(r.stack) || [])[1];
if (e) {
var t = document.getElementsByTagName("script");
for (var n in t) if (t[n].src == e) return t[n];
}
return null;
}
},
isActive: function(e, t, n) {
for (var r = "no-" + t; e; ) {
var a = e.classList;
if (a.contains(t)) return !0;
if (a.contains(r)) return !1;
e = e.parentElement;
}
return !!n;
}
},
languages: {
extend: function(e, t) {
var n = r.util.clone(r.languages[e]);
for (var a in t) n[a] = t[a];
return n;
},
insertBefore: function(e, t, n, a) {
var i = (a = a || r.languages)[e], s = {};
for (var o in i) if (i.hasOwnProperty(o)) {
if (o == t) for (var l in n) n.hasOwnProperty(l) && (s[l] = n[l]);
n.hasOwnProperty(o) || (s[o] = i[o]);
}
var c = a[e];
return a[e] = s, r.languages.DFS(r.languages, (function(t, n) {
n === c && t != e && (this[t] = s);
})), s;
},
DFS: function e(t, n, a, i) {
i = i || {};
var s = r.util.objId;
for (var o in t) if (t.hasOwnProperty(o)) {
n.call(t, o, t[o], a || o);
var l = t[o], c = r.util.type(l);
"Object" !== c || i[s(l)] ? "Array" !== c || i[s(l)] || (i[s(l)] = !0, e(l, n, o, i)) : (i[s(l)] = !0, 
e(l, n, null, i));
}
}
},
plugins: {},
highlightAll: function(e, t) {
r.highlightAllUnder(document, e, t);
},
highlightAllUnder: function(e, t, n) {
var a = {
callback: n,
container: e,
selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
};
r.hooks.run("before-highlightall", a), a.elements = Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)), 
r.hooks.run("before-all-elements-highlight", a);
for (var i, s = 0; i = a.elements[s++]; ) r.highlightElement(i, !0 === t, a.callback);
},
highlightElement: function(n, a, i) {
var s = r.util.getLanguage(n), o = r.languages[s];
n.className = n.className.replace(t, "").replace(/\s+/g, " ") + " language-" + s;
var l = n.parentElement;
l && "pre" === l.nodeName.toLowerCase() && (l.className = l.className.replace(t, "").replace(/\s+/g, " ") + " language-" + s);
var c = {
element: n,
language: s,
grammar: o,
code: n.textContent
};
function u(e) {
c.highlightedCode = e, r.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, 
r.hooks.run("after-highlight", c), r.hooks.run("complete", c), i && i.call(c.element);
}
if (r.hooks.run("before-sanity-check", c), !c.code) return r.hooks.run("complete", c), 
void (i && i.call(c.element));
if (r.hooks.run("before-highlight", c), c.grammar) if (a && e.Worker) {
var d = new Worker(r.filename);
d.onmessage = function(e) {
u(e.data);
}, d.postMessage(JSON.stringify({
language: c.language,
code: c.code,
immediateClose: !0
}));
} else u(r.highlight(c.code, c.grammar, c.language)); else u(r.util.encode(c.code));
},
highlight: function(e, t, n) {
var i = {
code: e,
grammar: t,
language: n
};
return r.hooks.run("before-tokenize", i), i.tokens = r.tokenize(i.code, i.grammar), 
r.hooks.run("after-tokenize", i), a.stringify(r.util.encode(i.tokens), i.language);
},
tokenize: function(e, t) {
var n = t.rest;
if (n) {
for (var r in n) t[r] = n[r];
delete t.rest;
}
var a = new o;
return l(a, a.head, e), s(e, a, t, a.head, 0), function(e) {
var t = [], n = e.head.next;
for (;n !== e.tail; ) t.push(n.value), n = n.next;
return t;
}(a);
},
hooks: {
all: {},
add: function(e, t) {
var n = r.hooks.all;
n[e] = n[e] || [], n[e].push(t);
},
run: function(e, t) {
var n = r.hooks.all[e];
if (n && n.length) for (var a, i = 0; a = n[i++]; ) a(t);
}
},
Token: a
};
function a(e, t, n, r) {
this.type = e, this.content = t, this.alias = n, this.length = 0 | (r || "").length;
}
function i(e, t, n, r) {
e.lastIndex = t;
var a = e.exec(n);
if (a && r && a[1]) {
var i = a[1].length;
a.index += i, a[0] = a[0].slice(i);
}
return a;
}
function s(e, t, n, o, u, d) {
for (var p in n) if (n.hasOwnProperty(p) && n[p]) {
var h = n[p];
h = Array.isArray(h) ? h : [ h ];
for (var f = 0; f < h.length; ++f) {
if (d && d.cause == p + "," + f) return;
var g = h[f], m = g.inside, b = !!g.lookbehind, v = !!g.greedy, y = g.alias;
if (v && !g.pattern.global) {
var E = g.pattern.toString().match(/[imsuy]*$/)[0];
g.pattern = RegExp(g.pattern.source, E + "g");
}
for (var w = g.pattern || g, _ = o.next, S = u; _ !== t.tail && !(d && S >= d.reach); S += _.value.length, 
_ = _.next) {
var k = _.value;
if (t.length > e.length) return;
if (!(k instanceof a)) {
var A, T = 1;
if (v) {
if (!(A = i(w, S, e, b))) break;
var x = A.index, F = A.index + A[0].length, L = S;
for (L += _.value.length; x >= L; ) L += (_ = _.next).value.length;
if (S = L -= _.value.length, _.value instanceof a) continue;
for (var O = _; O !== t.tail && (L < F || "string" == typeof O.value); O = O.next) T++, 
L += O.value.length;
T--, k = e.slice(S, L), A.index -= S;
} else if (!(A = i(w, 0, k, b))) continue;
x = A.index;
var C = A[0], I = k.slice(0, x), N = k.slice(x + C.length), R = S + k.length;
d && R > d.reach && (d.reach = R);
var P = _.prev;
I && (P = l(t, P, I), S += I.length), c(t, P, T), _ = l(t, P, new a(p, m ? r.tokenize(C, m) : C, y, C)), 
N && l(t, _, N), T > 1 && s(e, t, n, _.prev, S, {
cause: p + "," + f,
reach: R
});
}
}
}
}
}
function o() {
var e = {
value: null,
prev: null,
next: null
}, t = {
value: null,
prev: e,
next: null
};
e.next = t, this.head = e, this.tail = t, this.length = 0;
}
function l(e, t, n) {
var r = t.next, a = {
value: n,
prev: t,
next: r
};
return t.next = a, r.prev = a, e.length++, a;
}
function c(e, t, n) {
for (var r = t.next, a = 0; a < n && r !== e.tail; a++) r = r.next;
t.next = r, r.prev = t, e.length -= a;
}
if (e.Prism = r, a.stringify = function e(t, n) {
if ("string" == typeof t) return t;
if (Array.isArray(t)) {
var a = "";
return t.forEach((function(t) {
a += e(t, n);
})), a;
}
var i = {
type: t.type,
content: e(t.content, n),
tag: "span",
classes: [ "token", t.type ],
attributes: {},
language: n
}, s = t.alias;
s && (Array.isArray(s) ? Array.prototype.push.apply(i.classes, s) : i.classes.push(s)), 
r.hooks.run("wrap", i);
var o = "";
for (var l in i.attributes) o += " " + l + '="' + (i.attributes[l] || "").replace(/"/g, "&quot;") + '"';
return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + o + ">" + i.content + "</" + i.tag + ">";
}, !e.document) return e.addEventListener ? (r.disableWorkerMessageHandler || e.addEventListener("message", (function(t) {
var n = JSON.parse(t.data), a = n.language, i = n.code, s = n.immediateClose;
e.postMessage(r.highlight(i, r.languages[a], a)), s && e.close();
}), !1), r) : r;
var u = r.util.currentScript();
function d() {
r.manual || r.highlightAll();
}
if (u && (r.filename = u.src, u.hasAttribute("data-manual") && (r.manual = !0)), 
!r.manual) {
var p = document.readyState;
"loading" === p || "interactive" === p && u && u.defer ? document.addEventListener("DOMContentLoaded", d) : window.requestAnimationFrame ? window.requestAnimationFrame(d) : window.setTimeout(d, 16);
}
return r;
}("undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {});
void 0 !== e && e.exports && (e.exports = n), "undefined" != typeof global && (global.Prism = n);
}, function(e, t) {
Prism.languages.markup = {
comment: /<!--[\s\S]*?-->/,
prolog: /<\?[\s\S]+?\?>/,
doctype: {
pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
greedy: !0,
inside: {
"internal-subset": {
pattern: /(\[)[\s\S]+(?=\]>$)/,
lookbehind: !0,
greedy: !0,
inside: null
},
string: {
pattern: /"[^"]*"|'[^']*'/,
greedy: !0
},
punctuation: /^<!|>$|[[\]]/,
"doctype-tag": /^DOCTYPE/,
name: /[^\s<>'"]+/
}
},
cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
tag: {
pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
greedy: !0,
inside: {
tag: {
pattern: /^<\/?[^\s>\/]+/,
inside: {
punctuation: /^<\/?/,
namespace: /^[^\s>\/:]+:/
}
},
"attr-value": {
pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
inside: {
punctuation: [ {
pattern: /^=/,
alias: "attr-equals"
}, /"|'/ ]
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
entity: [ {
pattern: /&[\da-z]{1,8};/i,
alias: "named-entity"
}, /&#x?[\da-f]{1,8};/i ]
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, 
Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, 
Prism.hooks.add("wrap", (function(e) {
"entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"));
})), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
value: function(e, t) {
var n = {};
n["language-" + t] = {
pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
lookbehind: !0,
inside: Prism.languages[t]
}, n.cdata = /^<!\[CDATA\[|\]\]>$/i;
var r = {
"included-cdata": {
pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
inside: n
}
};
r["language-" + t] = {
pattern: /[\s\S]+/,
inside: Prism.languages[t]
};
var a = {};
a[e] = {
pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, (function() {
return e;
})), "i"),
lookbehind: !0,
greedy: !0,
inside: r
}, Prism.languages.insertBefore("markup", "cdata", a);
}
}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, 
Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), 
Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, 
Prism.languages.rss = Prism.languages.xml;
}, function(e, t) {
!function(e) {
var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
e.languages.css = {
comment: /\/\*[\s\S]*?\*\//,
atrule: {
pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
inside: {
rule: /^@[\w-]+/,
"selector-function-argument": {
pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
lookbehind: !0,
alias: "selector"
},
keyword: {
pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
lookbehind: !0
}
}
},
url: {
pattern: RegExp("\\burl\\((?:" + t.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
greedy: !0,
inside: {
function: /^url/i,
punctuation: /^\(|\)$/,
string: {
pattern: RegExp("^" + t.source + "$"),
alias: "url"
}
}
},
selector: RegExp("[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + t.source + ")*(?=\\s*\\{)"),
string: {
pattern: t,
greedy: !0
},
property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
important: /!important\b/i,
function: /[-a-z0-9]+(?=\()/i,
punctuation: /[(){};:,]/
}, e.languages.css.atrule.inside.rest = e.languages.css;
var n = e.languages.markup;
n && (n.tag.addInlined("style", "css"), e.languages.insertBefore("inside", "attr-value", {
"style-attr": {
pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
lookbehind: !0,
inside: {
"attr-value": {
pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
inside: {
style: {
pattern: /(["'])[\s\S]+(?=["']$)/,
lookbehind: !0,
alias: "language-css",
inside: e.languages.css
},
punctuation: [ {
pattern: /^=/,
alias: "attr-equals"
}, /"|'/ ]
}
},
"attr-name": /^style/i
}
}
}, n.tag));
}(Prism);
}, function(e, t) {
!function(e) {
var t, n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
e.languages.css.selector = {
pattern: e.languages.css.selector,
inside: t = {
"pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
"pseudo-class": /:[-\w]+/,
class: /\.[-\w]+/,
id: /#[-\w]+/,
attribute: {
pattern: RegExp("\\[(?:[^[\\]\"']|" + n.source + ")*\\]"),
greedy: !0,
inside: {
punctuation: /^\[|\]$/,
"case-sensitivity": {
pattern: /(\s)[si]$/i,
lookbehind: !0,
alias: "keyword"
},
namespace: {
pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
lookbehind: !0,
inside: {
punctuation: /\|$/
}
},
"attr-name": {
pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
lookbehind: !0
},
"attr-value": [ n, {
pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
lookbehind: !0
} ],
operator: /[|~*^$]?=/
}
},
"n-th": [ {
pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
lookbehind: !0,
inside: {
number: /[\dn]+/,
operator: /[+-]/
}
}, {
pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
lookbehind: !0
} ],
combinator: />|\+|~|\|\|/,
punctuation: /[(),]/
}
}, e.languages.css.atrule.inside["selector-function-argument"].inside = t, e.languages.insertBefore("css", "property", {
variable: {
pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
lookbehind: !0
}
});
var r = {
pattern: /(\b\d+)(?:%|[a-z]+\b)/,
lookbehind: !0
}, a = {
pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
lookbehind: !0
};
e.languages.insertBefore("css", "function", {
operator: {
pattern: /(\s)[+\-*\/](?=\s)/,
lookbehind: !0
},
hexcode: {
pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i,
alias: "color"
},
color: [ /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i, {
pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
inside: {
unit: r,
number: a,
function: /[\w-]+(?=\()/,
punctuation: /[(),]/
}
} ],
entity: /\\[\da-f]{1,8}/i,
unit: r,
number: a
});
}(Prism);
}, function(e, t) {
Prism.languages.clike = {
comment: [ {
pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
lookbehind: !0,
greedy: !0
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
pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
lookbehind: !0,
inside: {
punctuation: /[.\\]/
}
},
keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
boolean: /\b(?:true|false)\b/,
function: /\w+(?=\()/,
number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
punctuation: /[{}[\];(),.:]/
};
}, function(e, t) {
Prism.languages.javascript = Prism.languages.extend("clike", {
"class-name": [ Prism.languages.clike["class-name"], {
pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
lookbehind: !0
} ],
keyword: [ {
pattern: /((?:^|})\s*)(?:catch|finally)\b/,
lookbehind: !0
}, {
pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
lookbehind: !0
} ],
function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, 
Prism.languages.insertBefore("javascript", "keyword", {
regex: {
pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
lookbehind: !0,
greedy: !0,
inside: {
"regex-source": {
pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
lookbehind: !0,
alias: "language-regex",
inside: Prism.languages.regex
},
"regex-flags": /[a-z]+$/,
"regex-delimiter": /^\/|\/$/
}
},
"function-variable": {
pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
alias: "function"
},
parameter: [ {
pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
lookbehind: !0,
inside: Prism.languages.javascript
}, {
pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
inside: Prism.languages.javascript
}, {
pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
lookbehind: !0,
inside: Prism.languages.javascript
}, {
pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
lookbehind: !0,
inside: Prism.languages.javascript
} ],
constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
"template-string": {
pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
greedy: !0,
inside: {
"template-punctuation": {
pattern: /^`|`$/,
alias: "string"
},
interpolation: {
pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
lookbehind: !0,
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
}, function(e, t) {
!function(e) {
e.languages.http = {
"request-line": {
pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
inside: {
property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
"attr-name": /:\w+/
}
},
"response-status": {
pattern: /^HTTP\/1.[01] \d.*/m,
inside: {
property: {
pattern: /(^HTTP\/1.[01] )\d.*/i,
lookbehind: !0
}
}
},
"header-name": {
pattern: /^[\w-]+:(?=.)/m,
alias: "keyword"
}
};
var t, n = e.languages, r = {
"application/javascript": n.javascript,
"application/json": n.json || n.javascript,
"application/xml": n.xml,
"text/xml": n.xml,
"text/html": n.html,
"text/css": n.css
}, a = {
"application/json": !0,
"application/xml": !0
};
function i(e) {
var t = e.replace(/^[a-z]+\//, "");
return "(?:" + e + "|" + ("\\w+/(?:[\\w.-]+\\+)+" + t + "(?![+\\w.-])") + ")";
}
for (var s in r) if (r[s]) {
t = t || {};
var o = a[s] ? i(s) : s;
t[s.replace(/\//g, "-")] = {
pattern: RegExp("(content-type:\\s*" + o + ".*)(?:\\r?\\n|\\r){2}[\\s\\S]*", "i"),
lookbehind: !0,
inside: r[s]
};
}
t && e.languages.insertBefore("http", "header-name", t);
}(Prism);
}, function(e, t) {
Prism.languages.scss = Prism.languages.extend("css", {
comment: {
pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
lookbehind: !0
},
atrule: {
pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
inside: {
rule: /@[\w-]+/
}
},
url: /(?:[-a-z]+-)?url(?=\()/i,
selector: {
pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]+))/m,
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
pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
inside: {
variable: /\$[-\w]+|#\{\$[-\w]+\}/
}
}
}), Prism.languages.insertBefore("scss", "atrule", {
keyword: [ /@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i, {
pattern: /( +)(?:from|through)(?= )/,
lookbehind: !0
} ]
}), Prism.languages.insertBefore("scss", "important", {
variable: /\$[-\w]+|#\{\$[-\w]+\}/
}), Prism.languages.insertBefore("scss", "function", {
"module-modifier": {
pattern: /\b(?:as|with|show|hide)\b/i,
alias: "keyword"
},
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
}, function(e, t) {
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
keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
punctuation: /[;[\]()`,.]/
};
}, function(e, t) {
!function(e) {
var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/, n = /(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source, r = {
pattern: RegExp(n + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
lookbehind: !0,
inside: {
namespace: {
pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
inside: {
punctuation: /\./
}
},
punctuation: /\./
}
};
e.languages.java = e.languages.extend("clike", {
"class-name": [ r, {
pattern: RegExp(n + /[A-Z]\w*(?=\s+\w+\s*[;,=())])/.source),
lookbehind: !0,
inside: r.inside
} ],
keyword: t,
function: [ e.languages.clike.function, {
pattern: /(\:\:\s*)[a-z_]\w*/,
lookbehind: !0
} ],
number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
operator: {
pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
lookbehind: !0
}
}), e.languages.insertBefore("java", "string", {
"triple-quoted-string": {
pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
greedy: !0,
alias: "string"
}
}), e.languages.insertBefore("java", "class-name", {
annotation: {
pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
lookbehind: !0,
alias: "punctuation"
},
generics: {
pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
inside: {
"class-name": r,
keyword: t,
punctuation: /[<>(),.:]/,
operator: /[?&|]/
}
},
namespace: {
pattern: RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g, (function() {
return t.source;
}))),
lookbehind: !0,
inside: {
punctuation: /\./
}
}
});
}(Prism);
}, function(e, t) {
!function(e) {
var t = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b", n = {
pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
lookbehind: !0,
alias: "punctuation",
inside: null
}, r = {
bash: n,
environment: {
pattern: RegExp("\\$" + t),
alias: "constant"
},
variable: [ {
pattern: /\$?\(\([\s\S]+?\)\)/,
greedy: !0,
inside: {
variable: [ {
pattern: /(^\$\(\([\s\S]+)\)\)/,
lookbehind: !0
}, /^\$\(\(/ ],
number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
punctuation: /\(\(?|\)\)?|,|;/
}
}, {
pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
greedy: !0,
inside: {
variable: /^\$\(|^`|\)$|`$/
}
}, {
pattern: /\$\{[^}]+\}/,
greedy: !0,
inside: {
operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
punctuation: /[\[\]]/,
environment: {
pattern: RegExp("(\\{)" + t),
lookbehind: !0,
alias: "constant"
}
}
}, /\$(?:\w+|[#?*!@$])/ ],
entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
};
e.languages.bash = {
shebang: {
pattern: /^#!\s*\/.*/,
alias: "important"
},
comment: {
pattern: /(^|[^"{\\$])#.*/,
lookbehind: !0
},
"function-name": [ {
pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
lookbehind: !0,
alias: "function"
}, {
pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/,
alias: "function"
} ],
"for-or-select": {
pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
alias: "variable",
lookbehind: !0
},
"assign-left": {
pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
inside: {
environment: {
pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
lookbehind: !0,
alias: "constant"
}
},
alias: "variable",
lookbehind: !0
},
string: [ {
pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/,
lookbehind: !0,
greedy: !0,
inside: r
}, {
pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
lookbehind: !0,
greedy: !0,
inside: {
bash: n
}
}, {
pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|(?!\2)[^\\`$])*\2/,
lookbehind: !0,
greedy: !0,
inside: r
} ],
environment: {
pattern: RegExp("\\$?" + t),
alias: "constant"
},
variable: r.variable,
function: {
pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
lookbehind: !0
},
keyword: {
pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
lookbehind: !0
},
builtin: {
pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
lookbehind: !0,
alias: "class-name"
},
boolean: {
pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
lookbehind: !0
},
"file-descriptor": {
pattern: /\B&\d\b/,
alias: "important"
},
operator: {
pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
inside: {
"file-descriptor": {
pattern: /^\d/,
alias: "important"
}
}
},
punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
number: {
pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
lookbehind: !0
}
}, n.inside = e.languages.bash;
for (var a = [ "comment", "function-name", "for-or-select", "assign-left", "string", "environment", "function", "keyword", "builtin", "boolean", "file-descriptor", "operator", "punctuation", "number" ], i = r.variable[1].inside, s = 0; s < a.length; s++) i[a[s]] = e.languages.bash[a[s]];
e.languages.shell = e.languages.bash;
}(Prism);
}, function(e, t, n) {
let r = n(24), a = n(29), i = n(3);
n(30);
const {highlight: s} = n(31), o = n(1);
let l = n(34);
const c = n(51), u = n(1).lang;
c.i18n.add("prism", n(62)("./" + u + ".yml")), e.exports = function(e) {
let t, n = e.querySelector("pre"), s = Array.from(n.childNodes).find((e => "CODE" === e.tagName)), u = s.textContent;
e.codeBox = this;
let d = u;
e.hasAttribute("data-async") && (d = "(async () => {\n".concat(u, "\n})()")), Prism.highlightElement(s);
let p = i(n.innerHTML);
n.insertAdjacentHTML("afterBegin", p);
let h = JSON.parse(e.getAttribute("data-highlight"));
h && function(e, t) {
let n = e.innerHTML.split(/\n/);
for (let e of t) if (void 0 !== e.end) n[e.start] = '<em class="block-highlight">' + n[e.start], 
n[e.end] += "</em>"; else {
let t = n[e.start], r = e.cols, a = !1, i = -1, s = "";
for (let e = 0; e < t.length; e++) {
if ("<" == t[e] && (a = !0), a) s += t[e]; else {
if (i++, r.find((e => e.start == i)) && (s += '<em class="inline-highlight">'), 
s += t[e], "&" == t[e]) {
let n = [ "lt;", "gt;", "amp;", "quot;" ];
for (let r of n) t.slice(e + 1, e + 1 + r.length) == r && (e += r.length, s += r);
}
r.find((e => e.end == i + 1)) && (s += "</em>");
}
">" == t[e] && (a = !1);
}
n[e.start] = s;
}
e.innerHTML = n.join("\n");
}(s, h);
let f, g, m, b = n.classList.contains("language-javascript"), v = n.classList.contains("language-markup"), y = +e.getAttribute("data-trusted"), E = !+e.getAttribute("data-no-strict") && b ? '"use strict";' : "", w = 'globalThis.__codeBoxId = "'.concat(e.id, '";');
d = "".concat(E).concat(w, "\n\n").concat(d);
let _ = !0;
if (!b && !v) return;
let S = e.querySelector('[data-action="run"]');
S && (S.onclick = function() {
return this.blur(), F(), !1;
});
let k = e.querySelector('[data-action="edit"]');
function A() {
let e = f.contentWindow;
"function" == typeof e.postMessage ? e.postMessage(d, o.lookatCodeUrlBase + "/showjs") : alert("Sorry, your browser is too old");
}
function T() {
if (e.hasAttribute("data-global")) {
g || (g = document.createElement("iframe"), g.className = "js-frame", g.style.width = 0, 
g.style.height = 0, g.style.border = "none", g.name = "js-global-frame", document.body.appendChild(g));
let e = document.createElement("form");
e.style.display = "none", e.method = "POST", e.enctype = "multipart/form-data", 
e.action = o.lookatCodeUrlBase + "/showhtml", e.target = "js-global-frame";
let t = document.createElement("textarea");
t.name = "code", t.value = x("<script>\n".concat(d, "\n<\/script>")), e.appendChild(t), 
g.parentNode.insertBefore(e, g.nextSibling), e.submit(), e.remove();
} else if (y) {
if (e.hasAttribute("data-autorun")) return void function(e) {
let t = document.createElement("script");
t.type = "module", t.text = e, document.head.append(t), t.remove();
}(d);
try {
window.eval.call(window, d);
} catch (e) {
alert(e.constructor.name + ": " + e.message);
}
} else e.hasAttribute("data-refresh") && f && (f.remove(), f = null), f ? A() : (f = document.createElement("iframe"), 
f.className = "js-frame", f.src = o.lookatCodeUrlBase + "/showjs", f.style.width = 0, 
f.style.height = 0, f.style.border = "none", f.onload = function() {
A();
}, document.body.appendChild(f));
}
function x(e) {
if (e.match(/^\s*<!doctype/i)) return e;
let t = e;
return e.match(/<body/i) || (t = "<body>\n".concat(t, "\n</body>")), t = "<!doctype html>\n" + t, 
t;
}
function F() {
t && (t.remove(), t = null), b ? T() : function() {
let t;
if (m && e.hasAttribute("data-refresh") && (m.remove(), m = null), m || (m = e.querySelector(".code-result")), 
m) t = m.querySelector("iframe"); else {
if (m = document.createElement("div"), m.className = "code-result code-example__result", 
t = document.createElement("iframe"), t.name = e.id, t.className = "code-result__iframe", 
"0" === e.getAttribute("data-demo-height")) m.style.display = "none"; else if (e.hasAttribute("data-demo-height")) {
let n = +e.getAttribute("data-demo-height");
t.style.height = n + "px";
}
m.appendChild(t), e.appendChild(m);
}
if (y && !t.hasCustomConsoleLog) {
t.hasCustomConsoleLog = !0;
let n = t.contentWindow.console.log.bind(t.contentWindow.console);
t.contentWindow.console.log = function(...t) {
n(...t);
let r = l(t);
window.postMessage({
type: "console-log",
log: r,
codeBoxId: e.id
}, "*");
};
}
if (y) {
let n = t.contentDocument || t.contentWindow.document;
n.open(), n.write(x(u)), n.close(), e.hasAttribute("data-demo-height") || r.iframe(t), 
_ && e.hasAttribute("data-autorun") || a(m) || m.scrollIntoView(!1);
} else {
let n = document.createElement("form");
n.style.display = "none", n.method = "POST", n.enctype = "multipart/form-data", 
n.action = o.lookatCodeUrlBase + "/showhtml", n.target = t.name;
let i = document.createElement("textarea");
i.name = "code";
let s = x(u);
s.includes("console.log") && (s = s.replace(/<head>|<body>/im, "$&__LOOKATCODE_SCRIPT__")), 
i.value = s, n.appendChild(i), t.parentNode.insertBefore(n, t.nextSibling), n.submit(), 
n.remove(), _ && e.hasAttribute("data-autorun") || (t.onload = function() {
e.hasAttribute("data-demo-height") || r.iframe(t), a(m) || m.scrollIntoView(!1);
});
}
}(), _ = !1;
}
k && (k.onclick = function() {
return this.blur(), function() {
let e;
e = v ? x(u) : "<!DOCTYPE html>\n<script>\n".concat(d, "\n<\/script>");
let t = document.createElement("form");
t.action = "https://plnkr.co/edit/?p=preview", t.method = "POST", t.target = "_blank", 
document.body.appendChild(t);
let n = document.createElement("textarea");
n.name = "files[index.html]", n.value = e, t.appendChild(n);
let r = document.createElement("input");
r.name = "description", r.value = "Fork from " + window.location, t.appendChild(r), 
t.submit(), t.remove();
}(), !1;
}), e.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == e.getAttribute("data-autorun") ? e.querySelector("iframe").remove() : setTimeout(F, 100)), 
this.consoleLog = function(n) {
if (!t) {
t = document.createElement("div"), t.className = "codebox__output", e.append(t);
let n = document.createElement("div");
n.className = "codebox__output-label", n.innerHTML = c("prism.output"), t.append(n);
}
let r = document.createElement("div");
r.className = "codebox__output-line", r.innerHTML = n, t.append(r);
};
};
}, function(e, t, n) {
let r = n(25), a = n(28), i = [];
t.iframe = function(e) {
r.async(e, (function(t, n) {
n && (e.style.height = n + "px");
}));
}, t.codeTabs = function(e) {
function t() {
let t = e.closest(".code-tabs"), n = (e.closest("[data-code-tabs-content]"), t.querySelector("[data-code-tabs-switches]"));
n.firstElementChild.offsetWidth > n.offsetWidth ? t.classList.add("code-tabs_scroll") : t.classList.remove("code-tabs_scroll");
}
t(), i.push(t);
}, window.addEventListener("resize", a((function() {
i.forEach((e => e()));
}), 200));
}, function(e, t, n) {
let r = n(26);
function a(e, t) {
try {
(e.contentDocument || e.contentWindow.document).body;
} catch (e) {
return;
}
let n = setTimeout((function() {
t(new Error("timeout"));
}), 500);
function a(e, r) {
clearTimeout(n), t(e, r);
}
if (!e.offsetWidth) {
let t = e.cloneNode(!0);
return t.name = "", t.style.height = "50px", t.style.position = "absolute", t.style.display = "block", 
t.style.top = "10000px", t.onload = function() {
let n = r(this.contentDocument);
e.style.display = "block", t.remove(), a(null, n);
}, void document.body.appendChild(t);
}
e.style.display = "block", e.style.height = "1px";
let i = r(e.contentDocument);
e.style.height = "", a(null, i);
}
a.async = function(e, t) {
setTimeout((function() {
a(e, t);
}), 0);
}, e.exports = a;
}, function(e, t, n) {
let r, a = n(27);
e.exports = function(e) {
e = e || document;
let t = Math.max(e.body.scrollHeight, e.documentElement.scrollHeight, e.body.offsetHeight, e.documentElement.offsetHeight, e.body.clientHeight, e.documentElement.clientHeight);
return e.documentElement.scrollWidth > e.documentElement.clientWidth && (r || (r = a()), 
t += r), t;
};
}, function(e, t) {
e.exports = function() {
let e = document.createElement("div");
if (e.style.cssText = "visibility:hidden;height:100px", !document.body) throw new Error("getScrollbarHeight called to early: no document.body");
document.body.appendChild(e);
let t = e.offsetWidth;
e.style.overflow = "scroll";
let n = document.createElement("div");
n.style.width = "100%", e.appendChild(n);
let r = n.offsetWidth;
return e.parentNode.removeChild(e), t - r;
};
}, function(e, t) {
e.exports = function(e, t) {
let n, r, a = !1;
return function i() {
if (a) return n = arguments, void (r = this);
e.apply(this, arguments), a = !0, setTimeout((() => {
a = !1, n && (i.apply(r, n), n = r = null);
}), t);
};
};
}, function(e, t) {
e.exports = function(e) {
let t = e.getBoundingClientRect(), n = 0;
if (t.top < 0) n = t.bottom; else {
if (!(t.bottom > window.innerHeight)) return !0;
n = window.innerHeight - top;
}
return n > 10;
};
}, function(e, t) {
e.exports = function(e) {
if (!e || !e.length) return "";
let t = [];
for (let n of e) {
let e = '<code class="block-highlight'.concat(n.cols ? " block-highlight_inline" : "", '" data-start="').concat(n.start, '">');
if (e += "\n".repeat(n.start), n.end) e += '<code class="mask">'.concat("\n".repeat(n.end - n.start + 1), "</code>"); else if (n.cols) for (let t = 0; t < n.cols.length; t++) {
let r = n.cols[t], a = 0 === t ? null : n.cols[t - 1];
e += " ".repeat(a ? r.start - a.end : r.start), e += '<code class="mask-inline">'.concat(" ".repeat(r.end - r.start), "</code>");
}
e += "</code>", t.push(e);
}
return t.join("");
};
}, function(e, t) {
var n = function(e) {
var t = /\blang(?:uage)?-([\w-]+)\b/i, n = 0, r = {
manual: e.Prism && e.Prism.manual,
disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
util: {
encode: function e(t) {
return t instanceof a ? new a(t.type, e(t.content), t.alias) : Array.isArray(t) ? t.map(e) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
},
type: function(e) {
return Object.prototype.toString.call(e).slice(8, -1);
},
objId: function(e) {
return e.__id || Object.defineProperty(e, "__id", {
value: ++n
}), e.__id;
},
clone: function e(t, n) {
var a, i;
switch (n = n || {}, r.util.type(t)) {
case "Object":
if (i = r.util.objId(t), n[i]) return n[i];
for (var s in a = {}, n[i] = a, t) t.hasOwnProperty(s) && (a[s] = e(t[s], n));
return a;

case "Array":
return i = r.util.objId(t), n[i] ? n[i] : (a = [], n[i] = a, t.forEach((function(t, r) {
a[r] = e(t, n);
})), a);

default:
return t;
}
},
getLanguage: function(e) {
for (;e && !t.test(e.className); ) e = e.parentElement;
return e ? (e.className.match(t) || [ , "none" ])[1].toLowerCase() : "none";
},
currentScript: function() {
if ("undefined" == typeof document) return null;
if ("currentScript" in document) return document.currentScript;
try {
throw new Error;
} catch (r) {
var e = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(r.stack) || [])[1];
if (e) {
var t = document.getElementsByTagName("script");
for (var n in t) if (t[n].src == e) return t[n];
}
return null;
}
},
isActive: function(e, t, n) {
for (var r = "no-" + t; e; ) {
var a = e.classList;
if (a.contains(t)) return !0;
if (a.contains(r)) return !1;
e = e.parentElement;
}
return !!n;
}
},
languages: {
extend: function(e, t) {
var n = r.util.clone(r.languages[e]);
for (var a in t) n[a] = t[a];
return n;
},
insertBefore: function(e, t, n, a) {
var i = (a = a || r.languages)[e], s = {};
for (var o in i) if (i.hasOwnProperty(o)) {
if (o == t) for (var l in n) n.hasOwnProperty(l) && (s[l] = n[l]);
n.hasOwnProperty(o) || (s[o] = i[o]);
}
var c = a[e];
return a[e] = s, r.languages.DFS(r.languages, (function(t, n) {
n === c && t != e && (this[t] = s);
})), s;
},
DFS: function e(t, n, a, i) {
i = i || {};
var s = r.util.objId;
for (var o in t) if (t.hasOwnProperty(o)) {
n.call(t, o, t[o], a || o);
var l = t[o], c = r.util.type(l);
"Object" !== c || i[s(l)] ? "Array" !== c || i[s(l)] || (i[s(l)] = !0, e(l, n, o, i)) : (i[s(l)] = !0, 
e(l, n, null, i));
}
}
},
plugins: {},
highlightAll: function(e, t) {
r.highlightAllUnder(document, e, t);
},
highlightAllUnder: function(e, t, n) {
var a = {
callback: n,
container: e,
selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
};
r.hooks.run("before-highlightall", a), a.elements = Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)), 
r.hooks.run("before-all-elements-highlight", a);
for (var i, s = 0; i = a.elements[s++]; ) r.highlightElement(i, !0 === t, a.callback);
},
highlightElement: function(n, a, i) {
var s = r.util.getLanguage(n), o = r.languages[s];
n.className = n.className.replace(t, "").replace(/\s+/g, " ") + " language-" + s;
var l = n.parentElement;
l && "pre" === l.nodeName.toLowerCase() && (l.className = l.className.replace(t, "").replace(/\s+/g, " ") + " language-" + s);
var c = {
element: n,
language: s,
grammar: o,
code: n.textContent
};
function u(e) {
c.highlightedCode = e, r.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, 
r.hooks.run("after-highlight", c), r.hooks.run("complete", c), i && i.call(c.element);
}
if (r.hooks.run("before-sanity-check", c), !c.code) return r.hooks.run("complete", c), 
void (i && i.call(c.element));
if (r.hooks.run("before-highlight", c), c.grammar) if (a && e.Worker) {
var d = new Worker(r.filename);
d.onmessage = function(e) {
u(e.data);
}, d.postMessage(JSON.stringify({
language: c.language,
code: c.code,
immediateClose: !0
}));
} else u(r.highlight(c.code, c.grammar, c.language)); else u(r.util.encode(c.code));
},
highlight: function(e, t, n) {
var i = {
code: e,
grammar: t,
language: n
};
return r.hooks.run("before-tokenize", i), i.tokens = r.tokenize(i.code, i.grammar), 
r.hooks.run("after-tokenize", i), a.stringify(r.util.encode(i.tokens), i.language);
},
tokenize: function(e, t) {
var n = t.rest;
if (n) {
for (var r in n) t[r] = n[r];
delete t.rest;
}
var a = new o;
return l(a, a.head, e), s(e, a, t, a.head, 0), function(e) {
var t = [], n = e.head.next;
for (;n !== e.tail; ) t.push(n.value), n = n.next;
return t;
}(a);
},
hooks: {
all: {},
add: function(e, t) {
var n = r.hooks.all;
n[e] = n[e] || [], n[e].push(t);
},
run: function(e, t) {
var n = r.hooks.all[e];
if (n && n.length) for (var a, i = 0; a = n[i++]; ) a(t);
}
},
Token: a
};
function a(e, t, n, r) {
this.type = e, this.content = t, this.alias = n, this.length = 0 | (r || "").length;
}
function i(e, t, n, r) {
e.lastIndex = t;
var a = e.exec(n);
if (a && r && a[1]) {
var i = a[1].length;
a.index += i, a[0] = a[0].slice(i);
}
return a;
}
function s(e, t, n, o, u, d) {
for (var p in n) if (n.hasOwnProperty(p) && n[p]) {
var h = n[p];
h = Array.isArray(h) ? h : [ h ];
for (var f = 0; f < h.length; ++f) {
if (d && d.cause == p + "," + f) return;
var g = h[f], m = g.inside, b = !!g.lookbehind, v = !!g.greedy, y = g.alias;
if (v && !g.pattern.global) {
var E = g.pattern.toString().match(/[imsuy]*$/)[0];
g.pattern = RegExp(g.pattern.source, E + "g");
}
for (var w = g.pattern || g, _ = o.next, S = u; _ !== t.tail && !(d && S >= d.reach); S += _.value.length, 
_ = _.next) {
var k = _.value;
if (t.length > e.length) return;
if (!(k instanceof a)) {
var A, T = 1;
if (v) {
if (!(A = i(w, S, e, b))) break;
var x = A.index, F = A.index + A[0].length, L = S;
for (L += _.value.length; x >= L; ) L += (_ = _.next).value.length;
if (S = L -= _.value.length, _.value instanceof a) continue;
for (var O = _; O !== t.tail && (L < F || "string" == typeof O.value); O = O.next) T++, 
L += O.value.length;
T--, k = e.slice(S, L), A.index -= S;
} else if (!(A = i(w, 0, k, b))) continue;
x = A.index;
var C = A[0], I = k.slice(0, x), N = k.slice(x + C.length), R = S + k.length;
d && R > d.reach && (d.reach = R);
var P = _.prev;
I && (P = l(t, P, I), S += I.length), c(t, P, T), _ = l(t, P, new a(p, m ? r.tokenize(C, m) : C, y, C)), 
N && l(t, _, N), T > 1 && s(e, t, n, _.prev, S, {
cause: p + "," + f,
reach: R
});
}
}
}
}
}
function o() {
var e = {
value: null,
prev: null,
next: null
}, t = {
value: null,
prev: e,
next: null
};
e.next = t, this.head = e, this.tail = t, this.length = 0;
}
function l(e, t, n) {
var r = t.next, a = {
value: n,
prev: t,
next: r
};
return t.next = a, r.prev = a, e.length++, a;
}
function c(e, t, n) {
for (var r = t.next, a = 0; a < n && r !== e.tail; a++) r = r.next;
t.next = r, r.prev = t, e.length -= a;
}
if (e.Prism = r, a.stringify = function e(t, n) {
if ("string" == typeof t) return t;
if (Array.isArray(t)) {
var a = "";
return t.forEach((function(t) {
a += e(t, n);
})), a;
}
var i = {
type: t.type,
content: e(t.content, n),
tag: "span",
classes: [ "token", t.type ],
attributes: {},
language: n
}, s = t.alias;
s && (Array.isArray(s) ? Array.prototype.push.apply(i.classes, s) : i.classes.push(s)), 
r.hooks.run("wrap", i);
var o = "";
for (var l in i.attributes) o += " " + l + '="' + (i.attributes[l] || "").replace(/"/g, "&quot;") + '"';
return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + o + ">" + i.content + "</" + i.tag + ">";
}, !e.document) return e.addEventListener ? (r.disableWorkerMessageHandler || e.addEventListener("message", (function(t) {
var n = JSON.parse(t.data), a = n.language, i = n.code, s = n.immediateClose;
e.postMessage(r.highlight(i, r.languages[a], a)), s && e.close();
}), !1), r) : r;
var u = r.util.currentScript();
function d() {
r.manual || r.highlightAll();
}
if (u && (r.filename = u.src, u.hasAttribute("data-manual") && (r.manual = !0)), 
!r.manual) {
var p = document.readyState;
"loading" === p || "interactive" === p && u && u.defer ? document.addEventListener("DOMContentLoaded", d) : window.requestAnimationFrame ? window.requestAnimationFrame(d) : window.setTimeout(d, 16);
}
return r;
}("undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {});
void 0 !== e && e.exports && (e.exports = n), "undefined" != typeof global && (global.Prism = n), 
n.languages.markup = {
comment: /<!--[\s\S]*?-->/,
prolog: /<\?[\s\S]+?\?>/,
doctype: {
pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
greedy: !0,
inside: {
"internal-subset": {
pattern: /(\[)[\s\S]+(?=\]>$)/,
lookbehind: !0,
greedy: !0,
inside: null
},
string: {
pattern: /"[^"]*"|'[^']*'/,
greedy: !0
},
punctuation: /^<!|>$|[[\]]/,
"doctype-tag": /^DOCTYPE/,
name: /[^\s<>'"]+/
}
},
cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
tag: {
pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
greedy: !0,
inside: {
tag: {
pattern: /^<\/?[^\s>\/]+/,
inside: {
punctuation: /^<\/?/,
namespace: /^[^\s>\/:]+:/
}
},
"attr-value": {
pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
inside: {
punctuation: [ {
pattern: /^=/,
alias: "attr-equals"
}, /"|'/ ]
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
entity: [ {
pattern: /&[\da-z]{1,8};/i,
alias: "named-entity"
}, /&#x?[\da-f]{1,8};/i ]
}, n.languages.markup.tag.inside["attr-value"].inside.entity = n.languages.markup.entity, 
n.languages.markup.doctype.inside["internal-subset"].inside = n.languages.markup, 
n.hooks.add("wrap", (function(e) {
"entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"));
})), Object.defineProperty(n.languages.markup.tag, "addInlined", {
value: function(e, t) {
var r = {};
r["language-" + t] = {
pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
lookbehind: !0,
inside: n.languages[t]
}, r.cdata = /^<!\[CDATA\[|\]\]>$/i;
var a = {
"included-cdata": {
pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
inside: r
}
};
a["language-" + t] = {
pattern: /[\s\S]+/,
inside: n.languages[t]
};
var i = {};
i[e] = {
pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, (function() {
return e;
})), "i"),
lookbehind: !0,
greedy: !0,
inside: a
}, n.languages.insertBefore("markup", "cdata", i);
}
}), n.languages.html = n.languages.markup, n.languages.mathml = n.languages.markup, 
n.languages.svg = n.languages.markup, n.languages.xml = n.languages.extend("markup", {}), 
n.languages.ssml = n.languages.xml, n.languages.atom = n.languages.xml, n.languages.rss = n.languages.xml, 
function(e) {
var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
e.languages.css = {
comment: /\/\*[\s\S]*?\*\//,
atrule: {
pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
inside: {
rule: /^@[\w-]+/,
"selector-function-argument": {
pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
lookbehind: !0,
alias: "selector"
},
keyword: {
pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
lookbehind: !0
}
}
},
url: {
pattern: RegExp("\\burl\\((?:" + t.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
greedy: !0,
inside: {
function: /^url/i,
punctuation: /^\(|\)$/,
string: {
pattern: RegExp("^" + t.source + "$"),
alias: "url"
}
}
},
selector: RegExp("[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + t.source + ")*(?=\\s*\\{)"),
string: {
pattern: t,
greedy: !0
},
property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
important: /!important\b/i,
function: /[-a-z0-9]+(?=\()/i,
punctuation: /[(){};:,]/
}, e.languages.css.atrule.inside.rest = e.languages.css;
var n = e.languages.markup;
n && (n.tag.addInlined("style", "css"), e.languages.insertBefore("inside", "attr-value", {
"style-attr": {
pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
lookbehind: !0,
inside: {
"attr-value": {
pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
inside: {
style: {
pattern: /(["'])[\s\S]+(?=["']$)/,
lookbehind: !0,
alias: "language-css",
inside: e.languages.css
},
punctuation: [ {
pattern: /^=/,
alias: "attr-equals"
}, /"|'/ ]
}
},
"attr-name": /^style/i
}
}
}, n.tag));
}(n), n.languages.clike = {
comment: [ {
pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
lookbehind: !0,
greedy: !0
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
pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
lookbehind: !0,
inside: {
punctuation: /[.\\]/
}
},
keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
boolean: /\b(?:true|false)\b/,
function: /\w+(?=\()/,
number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
punctuation: /[{}[\];(),.:]/
}, n.languages.javascript = n.languages.extend("clike", {
"class-name": [ n.languages.clike["class-name"], {
pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
lookbehind: !0
} ],
keyword: [ {
pattern: /((?:^|})\s*)(?:catch|finally)\b/,
lookbehind: !0
}, {
pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
lookbehind: !0
} ],
function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), n.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, 
n.languages.insertBefore("javascript", "keyword", {
regex: {
pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
lookbehind: !0,
greedy: !0,
inside: {
"regex-source": {
pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
lookbehind: !0,
alias: "language-regex",
inside: n.languages.regex
},
"regex-flags": /[a-z]+$/,
"regex-delimiter": /^\/|\/$/
}
},
"function-variable": {
pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
alias: "function"
},
parameter: [ {
pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
lookbehind: !0,
inside: n.languages.javascript
}, {
pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
inside: n.languages.javascript
}, {
pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
lookbehind: !0,
inside: n.languages.javascript
}, {
pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
lookbehind: !0,
inside: n.languages.javascript
} ],
constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), n.languages.insertBefore("javascript", "string", {
"template-string": {
pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
greedy: !0,
inside: {
"template-punctuation": {
pattern: /^`|`$/,
alias: "string"
},
interpolation: {
pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
lookbehind: !0,
inside: {
"interpolation-punctuation": {
pattern: /^\${|}$/,
alias: "punctuation"
},
rest: n.languages.javascript
}
},
string: /[\s\S]+/
}
}
}), n.languages.markup && n.languages.markup.tag.addInlined("script", "javascript"), 
n.languages.js = n.languages.javascript, function() {
if ("undefined" != typeof self && self.Prism && self.document) {
Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
var e = window.Prism, t = {
js: "javascript",
py: "python",
rb: "ruby",
ps1: "powershell",
psm1: "powershell",
sh: "bash",
bat: "batch",
h: "c",
tex: "latex"
}, n = "data-src-status", r = "loading", a = "loaded", i = 'pre[data-src]:not([data-src-status="loaded"]):not([data-src-status="loading"])', s = /\blang(?:uage)?-([\w-]+)\b/i;
e.hooks.add("before-highlightall", (function(e) {
e.selector += ", " + i;
})), e.hooks.add("before-sanity-check", (function(s) {
var o = s.element;
if (o.matches(i)) {
s.code = "", o.setAttribute(n, r);
var c = o.appendChild(document.createElement("CODE"));
c.textContent = "Loading…";
var u = o.getAttribute("data-src"), d = s.language;
if ("none" === d) {
var p = (/\.(\w+)$/.exec(u) || [ , "none" ])[1];
d = t[p] || p;
}
l(c, d), l(o, d);
var h = e.plugins.autoloader;
h && h.loadLanguages(d);
var f = new XMLHttpRequest;
f.open("GET", u, !0), f.onreadystatechange = function() {
var t, r;
4 == f.readyState && (f.status < 400 && f.responseText ? (o.setAttribute(n, a), 
c.textContent = f.responseText, e.highlightElement(c)) : (o.setAttribute(n, "failed"), 
f.status >= 400 ? c.textContent = (t = f.status, r = f.statusText, "✖ Error " + t + " while fetching file: " + r) : c.textContent = "✖ Error: File does not exist or is empty"));
}, f.send(null);
}
})), e.plugins.fileHighlight = {
highlight: function(t) {
for (var n, r = (t || document).querySelectorAll(i), a = 0; n = r[a++]; ) e.highlightElement(n);
}
};
var o = !1;
e.fileHighlight = function() {
o || (o = !0), e.plugins.fileHighlight.highlight.apply(this, arguments);
};
}
function l(e, t) {
var n = e.className;
n = n.replace(s, " ") + " language-" + t, e.className = n.replace(/\s+/g, " ").trim();
}
}();
}, function(e, t, n) {
let r = n(0), a = n(3);
class i {
constructor(e) {
if (window.ebookType) return;
this.elem = e, this.translateX = 0, this.switchesElem = e.querySelector("[data-code-tabs-switches]"), 
this.switchesElemItems = this.switchesElem.firstElementChild, this.arrowLeft = e.querySelector("[data-code-tabs-left]"), 
this.arrowRight = e.querySelector("[data-code-tabs-right]"), this.arrowLeft.onclick = e => {
e.preventDefault(), this.translateX = Math.max(0, this.translateX - this.switchesElem.offsetWidth), 
this.renderTranslate();
}, this.arrowRight.onclick = e => {
e.preventDefault(), this.translateX = Math.min(this.translateX + this.switchesElem.offsetWidth, this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth), 
this.renderTranslate();
};
let t = this.elem.querySelector(".code-tabs__section_current");
t !== t.parentElement.firstElementChild && this.highlightTab(t), this.delegate(".code-tabs__switch", "click", this.onSwitchClick);
}
onSwitchClick(e) {
e.preventDefault();
let t, n = e.delegateTarget.parentNode.children, r = this.elem.querySelector("[data-code-tabs-content]").children;
for (let a = 0; a < n.length; a++) {
let i = n[a], s = r[a];
i === e.delegateTarget ? (t = a, s.classList.add("code-tabs__section_current"), 
i.classList.add("code-tabs__switch_current")) : (s.classList.remove("code-tabs__section_current"), 
i.classList.remove("code-tabs__switch_current"));
}
0 === t ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(r[t]));
}
highlightTab(e) {
if (e.highlighted) return;
let t = e.querySelector("pre"), n = t.querySelector("code");
Prism.highlightElement(n), t.insertAdjacentHTML("beforeEnd", a(t.innerHTML)), e.highlighted = !0;
}
renderTranslate() {
this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)", 
0 === this.translateX ? this.arrowLeft.setAttribute("disabled", "") : this.arrowLeft.removeAttribute("disabled"), 
this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth ? this.arrowRight.setAttribute("disabled", "") : this.arrowRight.removeAttribute("disabled");
}
}
r.delegateMixin(i.prototype), e.exports = i;
}, function(e, t, n) {
let r = n(34);
e.exports = function() {
window.consoleLogNative = window.console.log.bind(console), console.log = function(...e) {
consoleLogNative(...e);
let t = r(e);
window.postMessage({
type: "console-log",
log: t,
codeBoxId: window.__codeBoxId
}, "*");
}, window.addEventListener("message", (({source: e, data: t}) => {
if (e != window && e == window.parent) return;
if ("console-log" != t.type) return;
let n = document.getElementById(t.codeBoxId);
n && n.codeBox.consoleLog(t.log);
}));
};
}, function(e, t) {
function n(e, t = 0) {
if (null == e) return "null";
if ("function" == typeof e) return function(e, t = 0) {
if (t) return "function " + e.name;
(e = (e = e.toString()).split("\n")).length > 10 && (e = e.slice(0, 10).join("\n") + "\n...");
return e;
}(e, t);
if (Array.isArray(e)) return function(e, t = 0) {
if (t > 2) return "[...]";
let r = 1 == t ? 3 : 10;
e.length > r && (e = e.slice(0, r)).push("...");
return "[" + e.map((e => n(e, t + 1))).join(", ") + "]";
}(e, t);
if ("object" == typeof window) {
if (e instanceof Node) return n(e.outerHTML, t);
if (e instanceof Event) {
let r = [ Symbol.toStringTag, "type", "clientX", "clientY", "key", "code" ], a = {};
for (let t of r) t in e && (a[t] = e[t]);
return n(a, t);
}
}
return "object" == typeof e ? function(e, t = 0) {
let r = e.constructor.name;
"Object" == r && e[Symbol.toStringTag] && (r = e[Symbol.toStringTag]);
if ("Object" != r && e.toString != Object.prototype.toString) return e.toString();
let a = "";
"Object" != r && (a += r + " ");
if (a += "{", t > 1) a += "..."; else {
let r = [];
for (let a in e) e.hasOwnProperty(a) && r.push("".concat(a, ": ").concat(n(e[a], t + 1)));
a += r.join(", ");
}
return a += "}", a;
}(e, t) : "string" == typeof e ? function(e, t = 0) {
let n = 1 == t ? 20 : 60;
e.length > n && (e = e.slice(0, e.limit - 1) + "…");
return '"'.concat(e, '"');
}(e, t) : JSON.stringify(e);
}
e.exports = function(e) {
return Array.from(e).map(n).join(", ");
};
}, function(e, t, n) {
let r = n(4);
e.exports = class {
constructor(e) {
this.slider = e.el, this.list = this.slider.querySelector("ul"), e.class && (this.classList = e.class.split(" ")), 
this.disabled = !1, this.init(), this.bindHandlers();
}
init() {
this.classList && this.classList.length && this.slider.classList.add(...this.classList), 
this.slider.classList.add("slider_disable-left");
const e = document.createElement("div");
e.classList.add("slider__container"), e.appendChild(this.list), this.slider.innerHTML = '<button class="slider__arrow slider__arrow_left"></button><button class="slider__arrow slider__arrow_right"></button>', 
this.slider.appendChild(e), this.innerWidth = this.countInnerWidth(), this.arrowLeft = this.slider.querySelector(".slider__arrow_left"), 
this.arrowRight = this.slider.querySelector(".slider__arrow_right");
}
countInnerWidth() {
return [ ...this.list.querySelectorAll("li") ].reduce(((e, t) => {
const n = window.getComputedStyle(t);
return e + (t.offsetWidth + parseFloat(n.marginLeft) + parseFloat(n.marginRight));
}), 0);
}
bindHandlers() {
this.transformX = 0, this.arrowLeft.addEventListener("click", (() => {
this.transformX -= this.list.clientWidth, this.transformX < 0 && (this.transformX = 0), 
this.render();
})), this.arrowRight.addEventListener("click", (() => {
this.transformX = Math.min(this.transformX + this.list.clientWidth, this.list.scrollWidth - this.list.clientWidth), 
this.render();
})), window.addEventListener("resize", r((() => {
this.onResize();
}), 200)), this.onResize();
}
onResize() {
!this.disabled && this.innerWidth <= this.list.offsetWidth ? (this.slider.classList.add("slider_disabled"), 
this.disabled = !0, this.transformX > 0 && (this.transformX = 0, this.slider.classList.contains("slider_disable-right") && this.slider.classList.remove("slider_disable-right"), 
this.render())) : this.disabled && this.innerWidth > this.list.offsetWidth && (this.slider.classList.remove("slider_disabled"), 
this.slider.classList.contains("slider_disable-right") && this.slider.classList.remove("slider_disable-right"), 
this.disabled = !1);
}
render() {
this.list.style.transform = this.transformX > 0 ? "translateX(".concat(-this.transformX, "px)") : "translateX(0)", 
0 === this.transformX ? this.slider.classList.add("slider_disable-left") : this.slider.classList.remove("slider_disable-left"), 
this.transformX == this.list.scrollWidth - this.list.clientWidth ? this.slider.classList.add("slider_disable-right") : this.slider.classList.remove("slider_disable-right");
}
};
}, function(e, t, n) {
var r = n(2), a = n(37), i = n(40), s = Math.max, o = Math.min;
e.exports = function(e, t, n) {
var l, c, u, d, p, h, f = 0, g = !1, m = !1, b = !0;
if ("function" != typeof e) throw new TypeError("Expected a function");
function v(t) {
var n = l, r = c;
return l = c = void 0, f = t, d = e.apply(r, n);
}
function y(e) {
return f = e, p = setTimeout(w, t), g ? v(e) : d;
}
function E(e) {
var n = e - h;
return void 0 === h || n >= t || n < 0 || m && e - f >= u;
}
function w() {
var e = a();
if (E(e)) return _(e);
p = setTimeout(w, function(e) {
var n = t - (e - h);
return m ? o(n, u - (e - f)) : n;
}(e));
}
function _(e) {
return p = void 0, b && l ? v(e) : (l = c = void 0, d);
}
function S() {
var e = a(), n = E(e);
if (l = arguments, c = this, h = e, n) {
if (void 0 === p) return y(h);
if (m) return clearTimeout(p), p = setTimeout(w, t), v(h);
}
return void 0 === p && (p = setTimeout(w, t)), d;
}
return t = i(t) || 0, r(n) && (g = !!n.leading, u = (m = "maxWait" in n) ? s(i(n.maxWait) || 0, t) : u, 
b = "trailing" in n ? !!n.trailing : b), S.cancel = function() {
void 0 !== p && clearTimeout(p), f = 0, l = h = c = p = void 0;
}, S.flush = function() {
return void 0 === p ? d : _(a());
}, S;
};
}, function(e, t, n) {
var r = n(5);
e.exports = function() {
return r.Date.now();
};
}, function(e, t, n) {
(function(t) {
var n = "object" == typeof t && t && t.Object === Object && t;
e.exports = n;
}).call(this, n(39));
}, function(e, t) {
var n;
n = function() {
return this;
}();
try {
n = n || new Function("return this")();
} catch (e) {
"object" == typeof window && (n = window);
}
e.exports = n;
}, function(e, t, n) {
var r = n(2), a = n(41), i = /^\s+|\s+$/g, s = /^[-+]0x[0-9a-f]+$/i, o = /^0b[01]+$/i, l = /^0o[0-7]+$/i, c = parseInt;
e.exports = function(e) {
if ("number" == typeof e) return e;
if (a(e)) return NaN;
if (r(e)) {
var t = "function" == typeof e.valueOf ? e.valueOf() : e;
e = r(t) ? t + "" : t;
}
if ("string" != typeof e) return 0 === e ? e : +e;
e = e.replace(i, "");
var n = o.test(e);
return n || l.test(e) ? c(e.slice(2), n ? 2 : 8) : s.test(e) ? NaN : +e;
};
}, function(e, t, n) {
var r = n(42), a = n(45);
e.exports = function(e) {
return "symbol" == typeof e || a(e) && "[object Symbol]" == r(e);
};
}, function(e, t, n) {
var r = n(6), a = n(43), i = n(44), s = r ? r.toStringTag : void 0;
e.exports = function(e) {
return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : s && s in Object(e) ? a(e) : i(e);
};
}, function(e, t, n) {
var r = n(6), a = Object.prototype, i = a.hasOwnProperty, s = a.toString, o = r ? r.toStringTag : void 0;
e.exports = function(e) {
var t = i.call(e, o), n = e[o];
try {
e[o] = void 0;
var r = !0;
} catch (e) {}
var a = s.call(e);
return r && (t ? e[o] = n : delete e[o]), a;
};
}, function(e, t) {
var n = Object.prototype.toString;
e.exports = function(e) {
return n.call(e);
};
}, function(e, t) {
e.exports = function(e) {
return null != e && "object" == typeof e;
};
}, function(e, t, n) {
let r = n(47), a = n(7), i = n(0);
function s() {
/[&?]map\b/.test(location.href) || window.history.replaceState(null, null, ~location.href.indexOf("?") ? location.href + "&map" : location.href + "?map"), 
(new r).elem.addEventListener("tutorial-map-remove", (() => {
window.history.replaceState(null, null, location.href.replace(/[&?]map\b/, ""));
}));
}
!function() {
i(document, '[data-action="tutorial-map"]', "click", (e => {
1 === e.which && (e.preventDefault(), s());
}));
let e = document.querySelector(".tutorial-map");
e ? new a(e) : /[&?]map\b/.test(location.href) && s();
}();
}, function(e, t, n) {
let r = n(48), a = n(0), i = n(60), s = n(7), o = n(61);
class l {
constructor() {
this.elem = document.createElement("div"), document.body.appendChild(this.elem);
let e = new Modal({
hasClose: !1
}), t = new i;
e.setContent(t.elem), t.start(), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
let n = r({
url: "/tutorial/map"
});
n.addEventListener("success", (t => {
e.remove(), this.elem.innerHTML = '<div class="tutorial-map-overlay"></div>', this.mapElem = this.elem.firstChild, 
this.mapElem.innerHTML = t.result + '<button class="close-button tutorial-map-overlay__close"></button>', 
this.mapElem.addEventListener("click", (e => {
e.target.classList.contains("tutorial-map-overlay__close") && this.remove();
})), document.addEventListener("keydown", this.onDocumentKeyDown), document.body.classList.add("tutorial-map_on"), 
this.mapElem.addEventListener("scroll", o, {
passive: !0
}), new s(this.mapElem.firstElementChild);
})), n.addEventListener("fail", (() => e.remove()));
}
remove() {
this.elem.dispatchEvent(new CustomEvent("tutorial-map-remove")), this.elem.remove(), 
document.body.classList.remove("tutorial-map_on"), document.removeEventListener("keydown", this.onDocumentKeyDown);
}
onDocumentKeyDown(e) {
27 == e.keyCode && (e.preventDefault(), this.remove());
}
}
a.delegateMixin(l.prototype), e.exports = l;
}, function(e, t, n) {
let r = n(49), a = n(50);
const i = n(1).lang, s = n(51);
s.i18n.add("", n(56)("./" + i + ".yml")), s.i18n.add("error.network", n(58)("./" + i + ".yml")), 
document.addEventListener("xhrfail", (function(e) {
new r.Error(e.reason);
})), e.exports = function(e) {
let t = new XMLHttpRequest, n = e.method || "GET", r = e.body, i = e.url;
t.open(n, i, !e.sync), t.method = n;
let o = a();
o && !e.skipCsrf && t.setRequestHeader("X-XSRF-TOKEN", o), e.responseType && (t.responseType = e.responseType), 
"[object Object]" == {}.toString.call(r) && (t.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
r = JSON.stringify(r)), e.noDocumentEvents || (t.addEventListener("loadstart", (e => {
t.timeStart = Date.now();
let n = c("xhrstart", e);
document.dispatchEvent(n);
})), t.addEventListener("loadend", (e => {
let t = c("xhrend", e);
document.dispatchEvent(t);
})), t.addEventListener("success", (e => {
let t = c("xhrsuccess", e);
t.result = e.result, document.dispatchEvent(t);
})), t.addEventListener("fail", (e => {
let t = c("xhrfail", e);
t.reason = e.reason, document.dispatchEvent(t);
}))), e.raw || t.setRequestHeader("Accept", "application/json"), t.setRequestHeader("X-Requested-With", "XMLHttpRequest");
let l = e.normalStatuses || [ 200 ];
function c(e, t) {
let n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function u(e, n) {
let r = c("fail", n);
r.reason = e, t.dispatchEvent(r);
}
return t.addEventListener("error", (e => {
u(s("error.network.server_connection_error"), e);
})), t.addEventListener("timeout", (e => {
u(s("error.network.server_request_timeout"), e);
})), t.addEventListener("abort", (e => {
u(s("error.network.request_aborted"), e);
})), t.addEventListener("load", (n => {
if (!t.status) return void u(s("error.network.no_response"), n);
if (!l.includes(t.status)) return void u(s("error.network.server_error", {
status: t.status
}), n);
let r = e.responseType && "text" !== e.responseType ? t.response : t.responseText;
if ((t.getResponseHeader("Content-Type") || "").match(/^application\/json/) || e.json) try {
r = JSON.parse(r);
} catch (n) {
return void u(s("error.network.invalid_format"), n);
}
!function(e, n) {
let r = c("success", n);
r.result = e, t.dispatchEvent(r);
}(r, n);
})), setTimeout((function() {
t.send(r);
}), 0), t;
};
}, function(e, t, n) {
"use strict";
n.r(t), n.d(t, "init", (function() {
return i;
})), n.d(t, "Info", (function() {
return o;
})), n.d(t, "Warning", (function() {
return l;
})), n.d(t, "Success", (function() {
return c;
})), n.d(t, "Error", (function() {
return u;
}));
let r = n(0);
class a {
constructor(e = {}) {
this.notifications = [], this.verticalSpace = e.verticalSpace || 8;
}
register(e) {
this.notifications.unshift(e), setTimeout((() => this.recalculate()), 20);
}
unregister(e) {
let t = this.notifications.indexOf(e);
this.notifications.splice(t, 1), this.recalculate();
}
recalculate() {
let e = this.verticalSpace;
this.notifications.forEach((t => {
t.top = e, e += t.height + this.verticalSpace;
}));
}
}
function i(e) {
window.notificationManager || (window.notificationManager = new a(e));
}
class s {
constructor(e, t, n) {
let r = '<div class="notification notification_popup notification_'.concat(t, '">\n    <div class="notification__content">').concat(e, '</div>\n    <button title="Закрыть" class="notification__close"></button></div>');
switch (document.body.insertAdjacentHTML("beforeEnd", r), this.elem = document.body.lastElementChild, 
n) {
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
this.timeout = n;
}
window.notificationManager.register(this), this.setupCloseHandler(), this.setupCloseTimeout();
}
get TIMEOUT_DEFAULT() {
return 3e3;
}
get TIMEOUT_SLOW() {
return 5e3;
}
get TIMEOUT_FAST() {
return 1500;
}
close() {
this.elem.parentNode && (this.elem.remove(), window.notificationManager.unregister(this));
}
setupCloseHandler() {
this.delegate(".notification__close", "click", (() => this.close()));
}
setupCloseTimeout() {
this.timeout && setTimeout((() => this.close()), this.timeout);
}
get height() {
return this.elem.offsetHeight;
}
set top(e) {
this.elem.style.transform = "translateY(" + e + "px)";
}
}
r.delegateMixin(s.prototype);
class o extends s {
constructor(e, t) {
super(e, "info", t);
}
}
class l extends s {
constructor(e, t) {
super(e, "warning", t);
}
}
class c extends s {
constructor(e, t) {
super(e, "success", t);
}
}
class u extends s {
constructor(e, t) {
super(e, "error", t);
}
get TIMEOUT_DEFAULT() {
return 5e3;
}
}
}, function(e, t) {
e.exports = function() {
let e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
}, function(e, t, n) {
"use strict";
const r = new (n(52))("en");
let a = console.error;
function i(e) {
return r.hasPhrase(s, e) || a("No such phrase", e), r.t(s, ...arguments);
}
e.exports = i;
const s = n(1).lang;
"en" !== s && r.setFallback(s, "en"), r.add = (...e) => r.addPhrase(s, ...e), i.i18n = r;
}, function(e, t, n) {
e.exports = n(53);
}, function(e, t, n) {
"use strict";
var r = n(54), a = n(55);
function i(e) {
return Object.prototype.toString.call(e);
}
function s(e) {
return "[object String]" === i(e);
}
function o(e) {
return !isNaN(e) && isFinite(e);
}
function l(e) {
return !0 === e || !1 === e;
}
function c(e) {
return "[object Object]" === i(e);
}
var u = Array.isArray || function(e) {
return "[object Array]" === i(e);
}, d = Array.prototype.forEach;
function p(e, t, n) {
if (null !== e) if (d && e.forEach === d) e.forEach(t, n); else if (e.length === +e.length) for (var r = 0, a = e.length; r < a; r += 1) t.call(n, e[r], r, e); else for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(n, e[i], i, e);
}
var h = /%[sdj%]/g;
function f(e) {
var t = 1, n = arguments, r = n.length, a = String(e).replace(h, (function(e) {
if ("%%" === e) return "%";
if (t >= r) return e;
switch (e) {
case "%s":
return String(n[t++]);

case "%d":
return Number(n[t++]);

case "%j":
return JSON.stringify(n[t++]);

default:
return e;
}
}));
return a;
}
function g(e) {
var t = {};
return p(e || {}, (function(e, n) {
e && "object" == typeof e ? p(g(e), (function(e, r) {
t[n + "." + r] = e;
})) : t[n] = e;
})), t;
}
var m = "#@$";
function b(e, t) {
return e + m + t;
}
function v(e, t, n) {
var r = b(t, n), a = e._storage;
if (a.hasOwnProperty(r)) return r;
if (t === e._defaultLocale) return null;
var i = e._fallbacks_cache;
if (i.hasOwnProperty(r)) return i[r];
for (var s, o = e._fallbacks[t] || [ e._defaultLocale ], l = 0, c = o.length; l < c; l++) if (s = b(o[l], n), 
a.hasOwnProperty(s)) return i[r] = s, i[r];
return i[r] = null, null;
}
function y(e, t, n) {
var r = a.indexOf(e, t);
return -1 === r ? f('[pluralizer for "%s" locale not found]', e) : void 0 === n[r] ? f('[plural form %d ("%s") not found in translation]', r, a.forms(e)[r]) : n[r];
}
function E(e) {
if (!(this instanceof E)) return new E(e);
this._defaultLocale = e ? String(e) : "en", this._fallbacks = {}, this._fallbacks_cache = {}, 
this._storage = {}, this._plurals_cache = {};
}
E.prototype.addPhrase = function(e, t, n, r) {
var a, i = this;
if (l(r)) a = r ? 1 / 0 : 0; else if (o(r)) {
if ((a = Math.floor(r)) < 0) throw new TypeError("Invalid flatten level (should be >= 0).");
} else a = 1 / 0;
if (c(n) && a > 0) return p(n, (function(n, r) {
i.addPhrase(e, (t ? t + "." : "") + r, n, a - 1);
})), this;
if (s(n)) this._storage[b(e, t)] = {
translation: n,
locale: e,
raw: !1
}; else {
if (!(u(n) || o(n) || l(n) || 0 === a && c(n))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[b(e, t)] = {
translation: n,
locale: e,
raw: !0
};
}
return i._fallbacks_cache = {}, this;
}, E.prototype.setFallback = function(e, t) {
var n = this._defaultLocale;
if (n === e) throw new Error("Default locale can't have fallbacks");
var r = u(t) ? t.slice() : [ t ];
return r[r.length - 1] !== n && r.push(n), this._fallbacks[e] = r, this._fallbacks_cache = {}, 
this;
};
var w = /#\{|\(\(|\\\\/;
E.prototype.translate = function(e, t, n) {
var a, l = v(this, e, t);
return l ? (a = this._storage[l]).raw ? a.translation : (a.hasOwnProperty("compiled") || (a.compiled = function(e, t, n) {
var a, i, s, o, l, c;
return w.test(t) ? 1 === (a = r.parse(t)).length && "literal" === a[0].type ? a[0].text : (e._plurals_cache[n] || (e._plurals_cache[n] = new E(n)), 
c = e._plurals_cache[n], (i = []).push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
i.push("params = flatten(params);"), p(a, (function(e) {
if ("literal" !== e.type) {
if ("variable" === e.type) return s = e.anchor, void i.push(f('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', s, s, s));
if ("plural" !== e.type) throw new Error("Unknown node type");
s = e.anchor, o = {}, p(e.strict, (function(t, a) {
var i = r.parse(t);
if (1 === i.length && "literal" === i[0].type) return o[a] = !1, void (e.strict[a] = i[0].text);
o[a] = !0, c.hasPhrase(n, t, !0) || c.addPhrase(n, t, t);
})), l = {}, p(e.forms, (function(t, a) {
var i, s = r.parse(t);
if (1 === s.length && "literal" === s[0].type) return i = s[0].text, e.forms[a] = i, 
void (l[i] = !1);
l[t] = !0, c.hasPhrase(n, t, !0) || c.addPhrase(n, t, t);
})), i.push(f("loc = %j;", n)), i.push(f("loc_plzr = %j;", n.split(/[-_]/)[0])), 
i.push(f("anchor = params[%j];", s)), i.push(f("cache = this._plurals_cache[loc];")), 
i.push(f("strict = %j;", e.strict)), i.push(f("strict_exec = %j;", o)), i.push(f("forms = %j;", e.forms)), 
i.push(f("forms_exec = %j;", l)), i.push("if (+(anchor) != anchor) {"), i.push(f('  str += "[invalid plurals amount: %s(" + anchor + ")]";', s)), 
i.push("} else {"), i.push("  if (strict[anchor] !== undefined) {"), i.push("    plrl = strict[anchor];"), 
i.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), i.push("  } else {"), 
i.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), i.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
i.push("  }"), i.push("}");
} else i.push(f("str += %j;", e.text));
})), i.push("return str;"), new Function("params", "flatten", "pluralizer", i.join("\n"))) : t;
}(this, a.translation, a.locale)), "[object Function]" !== i(a.compiled) ? a.compiled : ((o(n) || s(n)) && (n = {
count: n,
value: n
}), a.compiled.call(this, n, g, y))) : e + ": No translation for [" + t + "]";
}, E.prototype.hasPhrase = function(e, t, n) {
return n ? this._storage.hasOwnProperty(b(e, t)) : !!v(this, e, t);
}, E.prototype.getLocale = function(e, t, n) {
if (n) return this._storage.hasOwnProperty(b(e, t)) ? e : null;
var r = v(this, e, t);
return r ? r.split(m, 2)[0] : null;
}, E.prototype.t = E.prototype.translate, E.prototype.stringify = function(e) {
var t = this, n = {};
p(this._storage, (function(e, t) {
n[t.split(m)[1]] = !0;
}));
var r = {};
p(n, (function(n, a) {
var i = v(t, e, a);
if (i) {
var s = t._storage[i].locale;
r[s] || (r[s] = {}), r[s][a] = t._storage[i].translation;
}
}));
var a = {
fallback: {},
locales: r
}, i = (t._fallbacks[e] || []).slice(0, -1);
return i.length && (a.fallback[e] = i), JSON.stringify(a);
}, E.prototype.load = function(e) {
var t = this;
return s(e) && (e = JSON.parse(e)), p(e.locales, (function(e, n) {
p(e, (function(e, r) {
t.addPhrase(n, r, e, 0);
}));
})), p(e.fallback, (function(e, n) {
t.setFallback(n, e);
})), this;
}, e.exports = E;
}, function(e, t) {
e.exports = function() {
function e(e, t, n, r, a, i) {
this.message = e, this.expected = t, this.found = n, this.offset = r, this.line = a, 
this.column = i, this.name = "SyntaxError";
}
return function(e, t) {
function n() {
this.constructor = e;
}
n.prototype = t.prototype, e.prototype = new n;
}(e, Error), {
SyntaxError: e,
parse: function(t) {
var n, r = arguments.length > 1 ? arguments[1] : {}, a = {}, i = {
start: ue
}, s = ue, o = a, l = "((", c = {
type: "literal",
value: "((",
description: '"(("'
}, u = "))", d = {
type: "literal",
value: "))",
description: '"))"'
}, p = null, h = function(e, t) {
return {
type: "plural",
forms: we(e),
strict: _e(e),
anchor: t || "count"
};
}, f = "|", g = {
type: "literal",
value: "|",
description: '"|"'
}, m = function(e, t) {
return [ e ].concat(t);
}, b = function(e) {
return [ e ];
}, v = "=", y = {
type: "literal",
value: "=",
description: '"="'
}, E = /^[0-9]/, w = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, _ = " ", S = {
type: "literal",
value: " ",
description: '" "'
}, k = function(e, t) {
return {
strict: e.join(""),
text: t.join("")
};
}, A = function() {
return {
text: se()
};
}, T = "\\", x = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, F = /^[\\|)(]/, L = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, O = function(e) {
return e;
}, C = void 0, I = {
type: "any",
description: "any character"
}, N = function() {
return se();
}, R = ":", P = {
type: "literal",
value: ":",
description: '":"'
}, D = function(e) {
return e;
}, M = "#{", B = {
type: "literal",
value: "#{",
description: '"#{"'
}, j = "}", U = {
type: "literal",
value: "}",
description: '"}"'
}, $ = function(e) {
return {
type: "variable",
anchor: e
};
}, H = ".", G = {
type: "literal",
value: ".",
description: '"."'
}, q = function() {
return se();
}, W = /^[a-zA-Z_$]/, z = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, X = /^[a-zA-Z0-9_$]/, Y = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, K = function(e) {
return e;
}, Z = function(e) {
return {
type: "literal",
text: e.join("")
};
}, V = /^[\\#()|]/, J = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, Q = 0, ee = 0, te = 0, ne = {
line: 1,
column: 1,
seenCR: !1
}, re = 0, ae = [], ie = 0;
if ("startRule" in r) {
if (!(r.startRule in i)) throw new Error("Can't start parsing from rule \"" + r.startRule + '".');
s = i[r.startRule];
}
function se() {
return t.substring(ee, Q);
}
function oe(e) {
return te !== e && (te > e && (te = 0, ne = {
line: 1,
column: 1,
seenCR: !1
}), function(e, n, r) {
var a, i;
for (a = n; a < r; a++) "\n" === (i = t.charAt(a)) ? (e.seenCR || e.line++, e.column = 1, 
e.seenCR = !1) : "\r" === i || "\u2028" === i || "\u2029" === i ? (e.line++, e.column = 1, 
e.seenCR = !0) : (e.column++, e.seenCR = !1);
}(ne, te, e), te = e), ne;
}
function le(e) {
Q < re || (Q > re && (re = Q, ae = []), ae.push(e));
}
function ce(n, r, a) {
var i = oe(a), s = a < t.length ? t.charAt(a) : null;
return null !== r && function(e) {
var t = 1;
for (e.sort((function(e, t) {
return e.description < t.description ? -1 : e.description > t.description ? 1 : 0;
})); t < e.length; ) e[t - 1] === e[t] ? e.splice(t, 1) : t++;
}(r), new e(null !== n ? n : function(e, t) {
var n, r = new Array(e.length);
for (n = 0; n < e.length; n++) r[n] = e[n].description;
return "Expected " + (e.length > 1 ? r.slice(0, -1).join(", ") + " or " + r[e.length - 1] : r[0]) + " but " + (t ? '"' + function(e) {
function t(e) {
return e.charCodeAt(0).toString(16).toUpperCase();
}
return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, (function(e) {
return "\\x0" + t(e);
})).replace(/[\x10-\x1F\x80-\xFF]/g, (function(e) {
return "\\x" + t(e);
})).replace(/[\u0180-\u0FFF]/g, (function(e) {
return "\\u0" + t(e);
})).replace(/[\u1080-\uFFFF]/g, (function(e) {
return "\\u" + t(e);
}));
}(t) + '"' : "end of input") + " found.";
}(r, s), r, s, a, i.line, i.column);
}
function ue() {
var e, t;
for (e = [], (t = ye()) === a && (t = de()) === a && (t = me()); t !== a; ) e.push(t), 
(t = ye()) === a && (t = de()) === a && (t = me());
return e;
}
function de() {
var e, n, r, i, s;
return e = Q, t.substr(Q, 2) === l ? (n = l, Q += 2) : (n = a, 0 === ie && le(c)), 
n !== a && (r = pe()) !== a ? (t.substr(Q, 2) === u ? (i = u, Q += 2) : (i = a, 
0 === ie && le(d)), i !== a ? ((s = ge()) === a && (s = p), s !== a ? (ee = e, e = n = h(r, s)) : (Q = e, 
e = o)) : (Q = e, e = o)) : (Q = e, e = o), e;
}
function pe() {
var e, n, r, i;
return e = Q, (n = he()) !== a ? (124 === t.charCodeAt(Q) ? (r = f, Q++) : (r = a, 
0 === ie && le(g)), r !== a && (i = pe()) !== a ? (ee = e, e = n = m(n, i)) : (Q = e, 
e = o)) : (Q = e, e = o), e === a && (e = Q, (n = he()) !== a && (ee = e, n = b(n)), 
e = n), e;
}
function he() {
var e, n, r, i, s, l;
if (e = Q, 61 === t.charCodeAt(Q) ? (n = v, Q++) : (n = a, 0 === ie && le(y)), n !== a) {
if (r = [], E.test(t.charAt(Q)) ? (i = t.charAt(Q), Q++) : (i = a, 0 === ie && le(w)), 
i !== a) for (;i !== a; ) r.push(i), E.test(t.charAt(Q)) ? (i = t.charAt(Q), Q++) : (i = a, 
0 === ie && le(w)); else r = o;
if (r !== a) if (32 === t.charCodeAt(Q) ? (i = _, Q++) : (i = a, 0 === ie && le(S)), 
i === a && (i = p), i !== a) {
if (s = [], (l = fe()) !== a) for (;l !== a; ) s.push(l), l = fe(); else s = o;
s !== a ? (ee = e, e = n = k(r, s)) : (Q = e, e = o);
} else Q = e, e = o; else Q = e, e = o;
} else Q = e, e = o;
if (e === a) {
if (e = Q, n = [], (r = fe()) !== a) for (;r !== a; ) n.push(r), r = fe(); else n = o;
n !== a && (ee = e, n = A()), e = n;
}
return e;
}
function fe() {
var e, n, r;
return e = Q, 92 === t.charCodeAt(Q) ? (n = T, Q++) : (n = a, 0 === ie && le(x)), 
n !== a ? (F.test(t.charAt(Q)) ? (r = t.charAt(Q), Q++) : (r = a, 0 === ie && le(L)), 
r !== a ? (ee = e, e = n = O(r)) : (Q = e, e = o)) : (Q = e, e = o), e === a && (e = Q, 
n = Q, ie++, 124 === t.charCodeAt(Q) ? (r = f, Q++) : (r = a, 0 === ie && le(g)), 
r === a && (t.substr(Q, 2) === u ? (r = u, Q += 2) : (r = a, 0 === ie && le(d))), 
ie--, r === a ? n = C : (Q = n, n = o), n !== a ? (t.length > Q ? (r = t.charAt(Q), 
Q++) : (r = a, 0 === ie && le(I)), r !== a ? (ee = e, e = n = N()) : (Q = e, e = o)) : (Q = e, 
e = o)), e;
}
function ge() {
var e, n, r;
return e = Q, 58 === t.charCodeAt(Q) ? (n = R, Q++) : (n = a, 0 === ie && le(P)), 
n !== a && (r = be()) !== a ? (ee = e, e = n = D(r)) : (Q = e, e = o), e;
}
function me() {
var e, n, r, i;
return e = Q, t.substr(Q, 2) === M ? (n = M, Q += 2) : (n = a, 0 === ie && le(B)), 
n !== a && (r = be()) !== a ? (125 === t.charCodeAt(Q) ? (i = j, Q++) : (i = a, 
0 === ie && le(U)), i !== a ? (ee = e, e = n = $(r)) : (Q = e, e = o)) : (Q = e, 
e = o), e;
}
function be() {
var e, n, r, i;
if (e = Q, ve() !== a) if (46 === t.charCodeAt(Q) ? (n = H, Q++) : (n = a, 0 === ie && le(G)), 
n !== a) {
if (r = [], (i = be()) !== a) for (;i !== a; ) r.push(i), i = be(); else r = o;
r !== a ? (ee = e, e = q()) : (Q = e, e = o);
} else Q = e, e = o; else Q = e, e = o;
return e === a && (e = ve()), e;
}
function ve() {
var e, n, r, i;
if (e = Q, W.test(t.charAt(Q)) ? (n = t.charAt(Q), Q++) : (n = a, 0 === ie && le(z)), 
n !== a) {
for (r = [], X.test(t.charAt(Q)) ? (i = t.charAt(Q), Q++) : (i = a, 0 === ie && le(Y)); i !== a; ) r.push(i), 
X.test(t.charAt(Q)) ? (i = t.charAt(Q), Q++) : (i = a, 0 === ie && le(Y));
r !== a ? (ee = e, e = n = N()) : (Q = e, e = o);
} else Q = e, e = o;
return e;
}
function ye() {
var e, t, n, r, i;
if (e = Q, t = [], n = Q, r = Q, ie++, (i = de()) === a && (i = me()), ie--, i === a ? r = C : (Q = r, 
r = o), r !== a && (i = Ee()) !== a ? (ee = n, n = r = K(i)) : (Q = n, n = o), n !== a) for (;n !== a; ) t.push(n), 
n = Q, r = Q, ie++, (i = de()) === a && (i = me()), ie--, i === a ? r = C : (Q = r, 
r = o), r !== a && (i = Ee()) !== a ? (ee = n, n = r = K(i)) : (Q = n, n = o); else t = o;
return t !== a && (ee = e, t = Z(t)), e = t;
}
function Ee() {
var e, n, r;
return e = Q, 92 === t.charCodeAt(Q) ? (n = T, Q++) : (n = a, 0 === ie && le(x)), 
n !== a ? (V.test(t.charAt(Q)) ? (r = t.charAt(Q), Q++) : (r = a, 0 === ie && le(J)), 
r !== a ? (ee = e, e = n = O(r)) : (Q = e, e = o)) : (Q = e, e = o), e === a && (t.length > Q ? (e = t.charAt(Q), 
Q++) : (e = a, 0 === ie && le(I))), e;
}
function we(e) {
for (var t = [], n = 0; n < e.length; n++) void 0 === e[n].strict && t.push(e[n].text);
return t;
}
function _e(e) {
for (var t = {}, n = 0; n < e.length; n++) void 0 !== e[n].strict && (t[e[n].strict] = e[n].text);
return t;
}
if ((n = s()) !== a && Q === t.length) return n;
throw n !== a && Q < t.length && le({
type: "end",
description: "end of input"
}), ce(null, ae, re);
}
};
}();
}, function(e, t, n) {
"use strict";
var r = {};
function a(e) {
var t;
return r[e] ? e : (t = e.toLowerCase().replace("_", "-"), r[t] ? t : (t = t.split("-")[0], 
r[t] ? t : null));
}
function i(e, t) {
var n = a(e);
if (!n) return -1;
if (!r[n].cFn) return 0;
var i = String(t), s = i.indexOf(".") < 0 ? "" : i.split(".")[1], o = s.length, l = +t, c = +i.split(".")[0], u = 0 === s.length ? 0 : +s.replace(/0+$/, "");
return r[n].cFn(l, c, o, +s, u);
}
function s(e, t) {
var n = a(e);
if (!n) return -1;
if (!r[n].oFn) return 0;
var i = String(t), s = i.indexOf(".") < 0 ? "" : i.split(".")[1], o = s.length, l = +t, c = +i.split(".")[0], u = 0 === s.length ? 0 : +s.replace(/0+$/, "");
return r[n].oFn(l, c, o, +s, u);
}
e.exports = function(e, t) {
var n = a(e);
return n ? r[n].c[i(n, t)] : null;
}, e.exports.indexOf = i, e.exports.forms = function(e) {
var t = a(e);
return r[t] ? r[t].c : null;
}, e.exports.ordinal = function(e, t) {
var n = a(e);
return r[n] ? r[n].o[s(n, t)] : null;
}, e.exports.ordinal.indexOf = s, e.exports.ordinal.forms = function(e) {
var t = a(e);
return r[t] ? r[t].o : null;
};
var o = [ "zero", "one", "two", "few", "many", "other" ];
function l(e) {
return o[e];
}
function c(e, t) {
var n;
for (t.c = t.c ? t.c.map(l) : [ "other" ], t.o = t.o ? t.o.map(l) : [ "other" ], 
n = 0; n < e.length; n++) r[e[n]] = t;
}
function u(e, t, n) {
return e <= n && n <= t && n % 1 == 0;
}
function d(e, t) {
return e.indexOf(t) >= 0;
}
c([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
}
}), c([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(e) {
return u(0, 1, e) ? 0 : 1;
}
}), c([ "am", "fa", "kn", "zu" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
}
}), c([ "ar", "ars" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : u(3, 10, t) ? 3 : u(11, 99, t) ? 4 : 5;
}
}), c([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return d([ 1, 5, 7, 8, 9, 10 ], e) ? 0 : d([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), c([ "ast", "de", "et", "fi", "fy", "gl", "ji", "nl", "sw", "ur", "yi" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
}
}), c([ "az" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 3, 4, 5 ],
oFn: function(e, t) {
var n = t % 10, r = t % 100, a = t % 1e3;
return d([ 1, 2, 5, 7, 8 ], n) || d([ 20, 50, 70, 80 ], r) ? 0 : d([ 3, 4 ], n) || d([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], a) ? 1 : 0 === t || 6 === n || d([ 40, 60, 90 ], r) ? 2 : 3;
}
}), c([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === t && 11 !== n ? 0 : u(2, 4, t) && !u(12, 14, n) ? 1 : 0 === t || u(5, 9, t) || u(11, 14, n) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
var t = e % 100;
return d([ 2, 3 ], e % 10) && !d([ 12, 13 ], t) ? 0 : 1;
}
}), c([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "yue", "zh" ], {}), 
c([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, n = e % 100, r = e % 1e6;
return 1 !== t || d([ 11, 71, 91 ], n) ? 2 !== t || d([ 12, 72, 92 ], n) ? !u(3, 4, t) && 9 !== t || u(10, 19, n) || u(70, 79, n) || u(90, 99, n) ? 0 !== e && 0 === r ? 3 : 4 : 2 : 1 : 0;
}
}), c([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, n, r) {
var a = t % 10, i = t % 100, s = r % 10, o = r % 100;
return 0 === n && 1 === a && 11 !== i || 1 === s && 11 !== o ? 0 : 0 === n && u(2, 4, a) && !u(12, 14, i) || u(2, 4, s) && !u(12, 14, o) ? 1 : 2;
}
}), c([ "ca" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return d([ 1, 3 ], e) ? 0 : 2 === e ? 1 : 4 === e ? 2 : 3;
}
}), c([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : u(2, 4, t) && 0 === n ? 1 : 0 !== n ? 2 : 3;
}
}), c([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : 3 === e ? 3 : 6 === e ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(e) {
return d([ 0, 7, 8, 9 ], e) ? 0 : 1 === e ? 1 : 2 === e ? 2 : d([ 3, 4 ], e) ? 3 : d([ 5, 6 ], e) ? 4 : 5;
}
}), c([ "da" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r, a) {
return 1 === e || 0 !== a && d([ 0, 1 ], t) ? 0 : 1;
}
}), c([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, n, r) {
var a = t % 100, i = r % 100;
return 0 === n && 1 === a || 1 === i ? 0 : 0 === n && 2 === a || 2 === i ? 1 : 0 === n && u(3, 4, a) || u(3, 4, i) ? 2 : 3;
}
}), c([ "en" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === t && 11 !== n ? 0 : 2 === t && 12 !== n ? 1 : 3 === t && 13 !== n ? 2 : 3;
}
}), c([ "ff", "kab" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return d([ 0, 1 ], t) ? 0 : 1;
}
}), c([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
var a = t % 10, i = r % 10;
return 0 === n && d([ 1, 2, 3 ], t) || 0 === n && !d([ 4, 6, 9 ], a) || 0 !== n && !d([ 4, 6, 9 ], i) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), c([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return d([ 0, 1 ], t) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), c([ "ga" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : u(3, 6, e) ? 2 : u(7, 10, e) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), c([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e) {
return d([ 1, 11 ], e) ? 0 : d([ 2, 12 ], e) ? 1 : u(3, 10, e) || u(13, 19, e) ? 2 : 3;
}
}), c([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return 1 === e ? 0 : d([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), c([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && d([ 0, 20, 40, 60, 80 ], t % 100) ? 2 : 0 !== n ? 3 : 4;
}
}), c([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(e, t, n) {
var r = e % 10;
return 1 === t && 0 === n ? 0 : 2 === t && 0 === n ? 1 : 0 !== n || u(0, 10, e) || 0 !== r ? 3 : 2;
}
}), c([ "hu" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return d([ 1, 5 ], e) ? 0 : 1;
}
}), c([ "is" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r, a) {
return 0 === a && 1 === t % 10 && 11 !== t % 100 || 0 !== a ? 0 : 1;
}
}), c([ "it" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
return d([ 11, 8, 80, 800 ], e) ? 0 : 1;
}
}), c([ "iu", "kw", "naq", "se", "sma", "smi", "smj", "smn", "sms" ], {
c: [ 1, 2, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : 2;
}
}), c([ "ka" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e, t) {
var n = t % 100;
return 1 === t ? 0 : 0 === t || u(2, 20, n) || 40 === n || 60 === n || 80 === n ? 1 : 2;
}
}), c([ "kk" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
var t = e % 10;
return 6 === t || 9 === t || 0 === t && 0 !== e ? 0 : 1;
}
}), c([ "ksh" ], {
c: [ 0, 1, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2;
}
}), c([ "lag" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t) {
return 0 === e ? 0 : d([ 0, 1 ], t) && 0 !== e ? 1 : 2;
}
}), c([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), c([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n, r) {
var a = e % 10, i = e % 100;
return 1 !== a || u(11, 19, i) ? u(2, 9, a) && !u(11, 19, i) ? 1 : 0 !== r ? 2 : 3 : 0;
}
}), c([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t, n, r) {
var a = e % 10, i = e % 100, s = r % 100, o = r % 10;
return 0 === a || u(11, 19, i) || 2 === n && u(11, 19, s) ? 0 : 1 === a && 11 !== i || 2 === n && 1 === o && 11 !== s || 2 !== n && 1 === o ? 1 : 2;
}
}), c([ "mk" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
return 0 === n && 1 === t % 10 || 1 === r % 10 ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(e, t) {
var n = t % 10, r = t % 100;
return 1 === n && 11 !== r ? 0 : 2 === n && 12 !== r ? 1 : d([ 7, 8 ], n) && !d([ 17, 18 ], r) ? 2 : 3;
}
}), c([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 0 !== n || 0 === e || 1 !== e && u(1, 19, e % 100) ? 1 : 2;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), c([ "mr" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return 1 === e ? 0 : d([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 3;
}
}), c([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 1 === e ? 0 : 0 === e || u(2, 10, t) ? 1 : u(11, 19, t) ? 2 : 3;
}
}), c([ "ne" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return u(1, 4, e) ? 0 : 1;
}
}), c([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, a = t % 100;
return 1 === t && 0 === n ? 0 : 0 === n && u(2, 4, r) && !u(12, 14, a) ? 1 : 0 === n && 1 !== t && u(0, 1, r) || 0 === n && u(5, 9, r) || 0 === n && u(12, 14, a) ? 2 : 3;
}
}), c([ "pt" ], {
c: [ 1, 5 ],
cFn: function(e) {
return u(0, 2, e) && 2 !== e ? 0 : 1;
}
}), c([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === e && 0 === n ? 0 : 1;
}
}), c([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, a = t % 100;
return 0 === n && 1 === r && 11 !== a ? 0 : 0 === n && u(2, 4, r) && !u(12, 14, a) ? 1 : 0 === n && 0 === r || 0 === n && u(5, 9, r) || 0 === n && u(11, 14, a) ? 2 : 3;
}
}), c([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : u(2, 10, e) ? 1 : 2;
}
}), c([ "si" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
return d([ 0, 1 ], e) || 0 === t && 1 === r ? 0 : 1;
}
}), c([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, n) {
var r = t % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && u(3, 4, r) || 0 !== n ? 2 : 3;
}
}), c([ "sq" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 4 === e % 10 && 14 !== e % 100 ? 1 : 2;
}
}), c([ "sv" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
var t = e % 100;
return d([ 1, 2 ], e % 10) && !d([ 11, 12 ], t) ? 0 : 1;
}
}), c([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(e) {
return u(0, 1, e) || u(11, 99, e) ? 0 : 1;
}
}), c([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, a = t % 100;
return 0 === n && 1 === r && 11 !== a ? 0 : 0 === n && u(2, 4, r) && !u(12, 14, a) ? 1 : 0 === n && 0 === r || 0 === n && u(5, 9, r) || 0 === n && u(11, 14, a) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
return 3 === e % 10 && 13 !== e % 100 ? 0 : 1;
}
});
}, function(e, t, n) {
var r = {
"./ru.yml": 57
};
function a(e) {
var t = i(e);
return n(t);
}
function i(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
a.keys = function() {
return Object.keys(r);
}, a.resolve = i, e.exports = a, a.id = 56;
}, function(e, t) {
e.exports = {
site: {
privacy_policy: "политика конфиденциальности",
terms: "пользовательское соглашение",
banner_bottom: 'Проводим <a href="/courses">курсы по JavaScript и фреймворкам</a>.',
action_required: "Требуется действие",
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
sorry_old_browser: "Извините, Internet Explorer не поддерживается, пожалуйста используйте более новый браузер.",
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
}, function(e, t, n) {
var r = {
"./ru.yml": 59
};
function a(e) {
var t = i(e);
return n(t);
}
function i(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
a.keys = function() {
return Object.keys(r);
}, a.resolve = i, e.exports = a, a.id = 58;
}, function(e, t) {
e.exports = {
server_connection_error: "Ошибка связи с сервером.",
server_request_timeout: "Превышено максимально допустимое время ожидания ответа от сервера.",
request_aborted: "Запрос был прерван.",
no_response: "Не получен ответ от сервера.",
server_error: "Ошибка на стороне сервера (код #{status}), попытайтесь позднее.",
invalid_format: "Некорректный формат ответа от сервера."
};
}, function(e, t) {
function n(e) {
if (e = e || {}, this.elem = e.elem, this.size = e.size || "medium", this.class = e.class ? " " + e.class : "", 
this.elemClass = e.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw new Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
n.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, n.prototype.stop = function() {
let e = this.elem.querySelector(".spinner");
e && (e.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, window.Spinner = n, e.exports = n;
}, function(e, t) {
function n(e) {
let t = document.createElement("div"), n = getComputedStyle(e);
return t.style.width = e.offsetWidth + "px", t.style.marginLeft = n.marginLeft, 
t.style.marginRight = n.marginRight, t.style.position = n.position, t.style.height = e.offsetHeight + "px", 
t.style.marginBottom = n.marginBottom, t.style.marginTop = n.marginTop, t;
}
e.exports = function() {
let e = document.querySelectorAll("[data-sticky]");
for (let t = 0; t < e.length; t++) {
let r = e[t], a = r.dataset.sticky ? JSON.parse(r.dataset.sticky) : {}, i = a.bottomLimit ? document.querySelector(a.bottomLimit) : null, s = a.container ? document.querySelector(a.container) : document.body, o = !a.minWidth || document.documentElement.clientWidth > a.minWidth;
if (r.placeholder) (r.placeholder.getBoundingClientRect().top > 0 || !o) && (r.style.cssText = "", 
r.classList.remove("sticky"), r.placeholder.parentNode.insertBefore(r, r.placeholder), 
r.placeholder.remove(), r.placeholder = null); else if (r.placeholder && i) i.getBoundingClientRect().top <= r.offsetHeight ? ("fixed" == r.style.position && (r.style.top = window.pageYOffset + "px"), 
r.style.position = "absolute") : (r.style.position = "fixed", r.style.top = 0); else if (r.getBoundingClientRect().top < 0 && o) {
if (r.style.cssText) return;
let e, t;
a.saveRight ? t = document.documentElement.clientWidth - r.getBoundingClientRect().right : e = r.getBoundingClientRect().left;
let i = a.noPlaceholder ? document.createElement("div") : n(r), o = r.offsetWidth;
r.after(i), s.appendChild(r), r.classList.add("sticky"), r.style.position = "fixed", 
r.style.top = 0, a.saveRight ? r.style.right = t + "px" : r.style.left = e + "px", 
r.style.zIndex = 101, r.style.background = "white", r.style.margin = 0, r.style.width = o + "px", 
r.placeholder = i;
}
}
};
}, function(e, t, n) {
var r = {
"./ru.yml": 63
};
function a(e) {
var t = i(e);
return n(t);
}
function i(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
a.keys = function() {
return Object.keys(r);
}, a.resolve = i, e.exports = a, a.id = 62;
}, function(e, t) {
e.exports = {
output: "ВЫВОД"
};
} ]);
//# sourceMappingURL=tutorial.2354a6c38f06ce783a89.js.map