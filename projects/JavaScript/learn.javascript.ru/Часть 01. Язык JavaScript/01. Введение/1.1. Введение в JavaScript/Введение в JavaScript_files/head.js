var head = function(t) {
function e(e) {
for (var n, r, o = e[0], s = e[1], a = 0, u = []; a < o.length; a++) r = o[a], i[r] && u.push(i[r][0]), 
i[r] = 0;
for (n in s) Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n]);
for (l && l(e); u.length; ) u.shift()();
}
var n = {}, i = {
1: 0
};
function r(e) {
if (n[e]) return n[e].exports;
var i = n[e] = {
i: e,
l: !1,
exports: {}
};
return t[e].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
}
r.e = function(t) {
var e = [], n = i[t];
if (0 !== n) if (n) e.push(n[2]); else {
var o = new Promise((function(e, r) {
n = i[t] = [ e, r ];
}));
e.push(n[2] = o);
var s, a = document.createElement("script");
a.charset = "utf-8", a.timeout = 120, r.nc && a.setAttribute("nonce", r.nc), a.src = function(t) {
return r.p + "" + ({
0: "authClient",
2: "vendors~authClient"
}[t] || t) + "-" + t + ".f7cb2388724a39880852.js";
}(t), s = function(e) {
a.onerror = a.onload = null, clearTimeout(l);
var n = i[t];
if (0 !== n) {
if (n) {
var r = e && ("load" === e.type ? "missing" : e.type), o = e && e.target && e.target.src, s = new Error("Loading chunk " + t + " failed.\n(" + r + ": " + o + ")");
s.type = r, s.request = o, n[1](s);
}
i[t] = void 0;
}
};
var l = setTimeout((function() {
s({
type: "timeout",
target: a
});
}), 12e4);
a.onerror = a.onload = s, document.head.appendChild(a);
}
return Promise.all(e);
}, r.m = t, r.c = n, r.d = function(t, e, n) {
r.o(t, e) || Object.defineProperty(t, e, {
enumerable: !0,
get: n
});
}, r.r = function(t) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
value: "Module"
}), Object.defineProperty(t, "__esModule", {
value: !0
});
}, r.t = function(t, e) {
if (1 & e && (t = r(t)), 8 & e) return t;
if (4 & e && "object" == typeof t && t && t.__esModule) return t;
var n = Object.create(null);
if (r.r(n), Object.defineProperty(n, "default", {
enumerable: !0,
value: t
}), 2 & e && "string" != typeof t) for (var i in t) r.d(n, i, function(e) {
return t[e];
}.bind(null, i));
return n;
}, r.n = function(t) {
var e = t && t.__esModule ? function() {
return t.default;
} : function() {
return t;
};
return r.d(e, "a", e), e;
}, r.o = function(t, e) {
return Object.prototype.hasOwnProperty.call(t, e);
}, r.p = "/pack/", r.oe = function(t) {
throw t;
};
var o = window.webpackJsonp_name_ = window.webpackJsonp_name_ || [], s = o.push.bind(o);
o.push = e, o = o.slice();
for (var a = 0; a < o.length; a++) e(o[a]);
var l = s;
return r(r.s = 35);
}([ function(t, e) {
var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
"number" == typeof __g && (__g = n);
}, function(t, e) {
var n = t.exports = {
version: "2.6.12"
};
"number" == typeof __e && (__e = n);
}, function(t, e, n) {
var i = n(3);
t.exports = function(t) {
if (!i(t)) throw TypeError(t + " is not an object!");
return t;
};
}, function(t, e) {
t.exports = function(t) {
return "object" == typeof t ? null !== t : "function" == typeof t;
};
}, function(t, e, n) {
t.exports = !n(18)((function() {
return 7 != Object.defineProperty({}, "a", {
get: function() {
return 7;
}
}).a;
}));
}, function(t, e, n) {
var i = n(6), r = n(20);
t.exports = n(4) ? function(t, e, n) {
return i.f(t, e, r(1, n));
} : function(t, e, n) {
return t[e] = n, t;
};
}, function(t, e, n) {
var i = n(2), r = n(47), o = n(48), s = Object.defineProperty;
e.f = n(4) ? Object.defineProperty : function(t, e, n) {
if (i(t), e = o(e, !0), i(n), r) try {
return s(t, e, n);
} catch (t) {}
if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
return "value" in n && (t[e] = n.value), t;
};
}, function(t, e) {
var n = {}.hasOwnProperty;
t.exports = function(t, e) {
return n.call(t, e);
};
}, function(t, e) {
var n = 0, i = Math.random();
t.exports = function(t) {
return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + i).toString(36));
};
}, function(t, e, n) {
var i = n(1), r = n(0), o = "__core-js_shared__", s = r[o] || (r[o] = {});
(t.exports = function(t, e) {
return s[t] || (s[t] = void 0 !== e ? e : {});
})("versions", []).push({
version: i.version,
mode: n(51) ? "pure" : "global",
copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
});
}, function(t, e, n) {
var i = n(9)("wks"), r = n(8), o = n(0).Symbol, s = "function" == typeof o;
(t.exports = function(t) {
return i[t] || (i[t] = s && o[t] || (s ? o : r)("Symbol." + t));
}).store = i;
}, function(t, e) {
const n = "//" + window.disqus_shortname + ".disqus.com/embed.js", i = "//" + window.disqus_shortname + ".disqus.com/count.js";
function r() {
const t = document.getElementById("disqus_thread");
if (t.classList.contains("disqus-loading")) return;
t.classList.add("disqus-loading");
const e = new Spinner({
size: "large"
});
t.append(e.elem), e.start();
const i = document.createElement("script");
i.src = n, i.setAttribute("data-timestamp", +new Date), document.head.appendChild(i), 
i.onload = () => {
e.stop(), e.elem.remove();
};
}
e.loadDisqus = r, e.loadDisqusComments = function() {
const t = document.getElementById("disqus_comments");
if (!t) return;
window.disqus_config(), t.dataset.disqusIdentifier = window.page.identifier;
let e = document.createElement("script");
e.id = "dsq-count-scr", e.src = i, e.setAttribute("data-timestamp", +new Date), 
document.head.appendChild(e);
}, e.loadDisqusIfVisible = function() {
if (!window.disqus_enabled) return;
const t = document.getElementById("disqus_thread");
if (new MutationObserver((t => {
for (let e of t) {
if ("childList" !== e.type) return;
if (!e.addedNodes) return;
e.addedNodes.forEach((t => {
"IFRAME" !== t.tagName || t.src.includes("embed/comments") || t.remove();
}));
}
})).observe(t, {
childList: !0
}), document.querySelector('script[src="'.concat(n, '"]'))) return;
if (t.hasChildNodes()) return;
const e = t.getBoundingClientRect();
e.top > document.documentElement.clientHeight + 150 || e.bottom < -150 || r();
};
}, function(t, e, n) {
const i = n(16).lang;
let r = n(13);
"ru" === i ? (n(14), r.updateLocale("ru", {
monthsShort: {
format: "янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_"),
standalone: "янв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_")
}
})) : "zh" === i ? n(86) : "en" !== i && n(30)("./" + i), t.exports = r;
}, function(t, e, n) {
(function(t) {
t.exports = function() {
"use strict";
var e, i;
function r() {
return e.apply(null, arguments);
}
function o(t) {
e = t;
}
function s(t) {
return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t);
}
function a(t) {
return null != t && "[object Object]" === Object.prototype.toString.call(t);
}
function l(t) {
if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(t).length;
var e;
for (e in t) if (t.hasOwnProperty(e)) return !1;
return !0;
}
function u(t) {
return void 0 === t;
}
function c(t) {
return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t);
}
function d(t) {
return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t);
}
function h(t, e) {
var n, i = [];
for (n = 0; n < t.length; ++n) i.push(e(t[n], n));
return i;
}
function f(t, e) {
return Object.prototype.hasOwnProperty.call(t, e);
}
function m(t, e) {
for (var n in e) f(e, n) && (t[n] = e[n]);
return f(e, "toString") && (t.toString = e.toString), f(e, "valueOf") && (t.valueOf = e.valueOf), 
t;
}
function p(t, e, n, i) {
return Bn(t, e, n, i, !0).utc();
}
function _() {
return {
empty: !1,
unusedTokens: [],
unusedInput: [],
overflow: -2,
charsLeftOver: 0,
nullInput: !1,
invalidMonth: null,
invalidFormat: !1,
userInvalidated: !1,
iso: !1,
parsedDateParts: [],
meridiem: null,
rfc2822: !1,
weekdayMismatch: !1
};
}
function g(t) {
return null == t._pf && (t._pf = _()), t._pf;
}
function y(t) {
if (null == t._isValid) {
var e = g(t), n = i.call(e.parsedDateParts, (function(t) {
return null != t;
})), r = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.weekdayMismatch && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && n);
if (t._strict && (r = r && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), 
null != Object.isFrozen && Object.isFrozen(t)) return r;
t._isValid = r;
}
return t._isValid;
}
function v(t) {
var e = p(NaN);
return null != t ? m(g(e), t) : g(e).userInvalidated = !0, e;
}
i = Array.prototype.some ? Array.prototype.some : function(t) {
for (var e = Object(this), n = e.length >>> 0, i = 0; i < n; i++) if (i in e && t.call(this, e[i], i, e)) return !0;
return !1;
};
var w = r.momentProperties = [];
function b(t, e) {
var n, i, r;
if (u(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), u(e._i) || (t._i = e._i), 
u(e._f) || (t._f = e._f), u(e._l) || (t._l = e._l), u(e._strict) || (t._strict = e._strict), 
u(e._tzm) || (t._tzm = e._tzm), u(e._isUTC) || (t._isUTC = e._isUTC), u(e._offset) || (t._offset = e._offset), 
u(e._pf) || (t._pf = g(e)), u(e._locale) || (t._locale = e._locale), w.length > 0) for (n = 0; n < w.length; n++) u(r = e[i = w[n]]) || (t[i] = r);
return t;
}
var S = !1;
function M(t) {
b(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), 
!1 === S && (S = !0, r.updateOffset(this), S = !1);
}
function k(t) {
return t instanceof M || null != t && null != t._isAMomentObject;
}
function D(t) {
return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
}
function E(t) {
var e = +t, n = 0;
return 0 !== e && isFinite(e) && (n = D(e)), n;
}
function T(t, e, n) {
var i, r = Math.min(t.length, e.length), o = Math.abs(t.length - e.length), s = 0;
for (i = 0; i < r; i++) (n && t[i] !== e[i] || !n && E(t[i]) !== E(e[i])) && s++;
return s + o;
}
function C(t) {
!1 === r.suppressDeprecationWarnings && "undefined" != typeof console && console.warn;
}
function x(t, e) {
var n = !0;
return m((function() {
if (null != r.deprecationHandler && r.deprecationHandler(null, t), n) {
for (var i, o = [], s = 0; s < arguments.length; s++) {
if (i = "", "object" == typeof arguments[s]) {
for (var a in i += "\n[" + s + "] ", arguments[0]) i += a + ": " + arguments[0][a] + ", ";
i = i.slice(0, -2);
} else i = arguments[s];
o.push(i);
}
C(t + "\nArguments: " + Array.prototype.slice.call(o).join("") + "\n" + (new Error).stack), 
n = !1;
}
return e.apply(this, arguments);
}), e);
}
var Y, O = {};
function L(t, e) {
null != r.deprecationHandler && r.deprecationHandler(t, e), O[t] || (C(e), O[t] = !0);
}
function P(t) {
return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t);
}
function N(t) {
var e, n;
for (n in t) P(e = t[n]) ? this[n] = e : this["_" + n] = e;
this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
}
function A(t, e) {
var n, i = m({}, t);
for (n in e) f(e, n) && (a(t[n]) && a(e[n]) ? (i[n] = {}, m(i[n], t[n]), m(i[n], e[n])) : null != e[n] ? i[n] = e[n] : delete i[n]);
for (n in t) f(t, n) && !f(e, n) && a(t[n]) && (i[n] = m({}, i[n]));
return i;
}
function H(t) {
null != t && this.set(t);
}
r.suppressDeprecationWarnings = !1, r.deprecationHandler = null, Y = Object.keys ? Object.keys : function(t) {
var e, n = [];
for (e in t) f(t, e) && n.push(e);
return n;
};
var F = {
sameDay: "[Today at] LT",
nextDay: "[Tomorrow at] LT",
nextWeek: "dddd [at] LT",
lastDay: "[Yesterday at] LT",
lastWeek: "[Last] dddd [at] LT",
sameElse: "L"
};
function W(t, e, n) {
var i = this._calendar[t] || this._calendar.sameElse;
return P(i) ? i.call(e, n) : i;
}
var R = {
LTS: "h:mm:ss A",
LT: "h:mm A",
L: "MM/DD/YYYY",
LL: "MMMM D, YYYY",
LLL: "MMMM D, YYYY h:mm A",
LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function j(t) {
var e = this._longDateFormat[t], n = this._longDateFormat[t.toUpperCase()];
return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, (function(t) {
return t.slice(1);
})), this._longDateFormat[t]);
}
var U = "Invalid date";
function I() {
return this._invalidDate;
}
var G = "%d", V = /\d{1,2}/;
function z(t) {
return this._ordinal.replace("%d", t);
}
var q = {
future: "in %s",
past: "%s ago",
s: "a few seconds",
ss: "%d seconds",
m: "a minute",
mm: "%d minutes",
h: "an hour",
hh: "%d hours",
d: "a day",
dd: "%d days",
M: "a month",
MM: "%d months",
y: "a year",
yy: "%d years"
};
function Z(t, e, n, i) {
var r = this._relativeTime[n];
return P(r) ? r(t, e, n, i) : r.replace(/%d/i, t);
}
function B(t, e) {
var n = this._relativeTime[t > 0 ? "future" : "past"];
return P(n) ? n(e) : n.replace(/%s/i, e);
}
var $ = {};
function J(t, e) {
var n = t.toLowerCase();
$[n] = $[n + "s"] = $[e] = t;
}
function K(t) {
return "string" == typeof t ? $[t] || $[t.toLowerCase()] : void 0;
}
function X(t) {
var e, n, i = {};
for (n in t) f(t, n) && (e = K(n)) && (i[e] = t[n]);
return i;
}
var Q = {};
function tt(t, e) {
Q[t] = e;
}
function et(t) {
var e = [];
for (var n in t) e.push({
unit: n,
priority: Q[n]
});
return e.sort((function(t, e) {
return t.priority - e.priority;
})), e;
}
function nt(t, e, n) {
var i = "" + Math.abs(t), r = e - i.length;
return (t >= 0 ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + i;
}
var it = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, rt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, ot = {}, st = {};
function at(t, e, n, i) {
var r = i;
"string" == typeof i && (r = function() {
return this[i]();
}), t && (st[t] = r), e && (st[e[0]] = function() {
return nt(r.apply(this, arguments), e[1], e[2]);
}), n && (st[n] = function() {
return this.localeData().ordinal(r.apply(this, arguments), t);
});
}
function lt(t) {
return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
}
function ut(t) {
var e, n, i = t.match(it);
for (e = 0, n = i.length; e < n; e++) st[i[e]] ? i[e] = st[i[e]] : i[e] = lt(i[e]);
return function(e) {
var r, o = "";
for (r = 0; r < n; r++) o += P(i[r]) ? i[r].call(e, t) : i[r];
return o;
};
}
function ct(t, e) {
return t.isValid() ? (e = dt(e, t.localeData()), ot[e] = ot[e] || ut(e), ot[e](t)) : t.localeData().invalidDate();
}
function dt(t, e) {
var n = 5;
function i(t) {
return e.longDateFormat(t) || t;
}
for (rt.lastIndex = 0; n >= 0 && rt.test(t); ) t = t.replace(rt, i), rt.lastIndex = 0, 
n -= 1;
return t;
}
var ht = /\d/, ft = /\d\d/, mt = /\d{3}/, pt = /\d{4}/, _t = /[+-]?\d{6}/, gt = /\d\d?/, yt = /\d\d\d\d?/, vt = /\d\d\d\d\d\d?/, wt = /\d{1,3}/, bt = /\d{1,4}/, St = /[+-]?\d{1,6}/, Mt = /\d+/, kt = /[+-]?\d+/, Dt = /Z|[+-]\d\d:?\d\d/gi, Et = /Z|[+-]\d\d(?::?\d\d)?/gi, Tt = /[+-]?\d+(\.\d{1,3})?/, Ct = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, xt = {};
function Yt(t, e, n) {
xt[t] = P(e) ? e : function(t, i) {
return t && n ? n : e;
};
}
function Ot(t, e) {
return f(xt, t) ? xt[t](e._strict, e._locale) : new RegExp(Lt(t));
}
function Lt(t) {
return Pt(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, (function(t, e, n, i, r) {
return e || n || i || r;
})));
}
function Pt(t) {
return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Nt = {};
function At(t, e) {
var n, i = e;
for ("string" == typeof t && (t = [ t ]), c(e) && (i = function(t, n) {
n[e] = E(t);
}), n = 0; n < t.length; n++) Nt[t[n]] = i;
}
function Ht(t, e) {
At(t, (function(t, n, i, r) {
i._w = i._w || {}, e(t, i._w, i, r);
}));
}
function Ft(t, e, n) {
null != e && f(Nt, t) && Nt[t](e, n._a, n, t);
}
var Wt = 0, Rt = 1, jt = 2, Ut = 3, It = 4, Gt = 5, Vt = 6, zt = 7, qt = 8;
function Zt(t) {
return Bt(t) ? 366 : 365;
}
function Bt(t) {
return t % 4 == 0 && t % 100 != 0 || t % 400 == 0;
}
at("Y", 0, 0, (function() {
var t = this.year();
return t <= 9999 ? "" + t : "+" + t;
})), at(0, [ "YY", 2 ], 0, (function() {
return this.year() % 100;
})), at(0, [ "YYYY", 4 ], 0, "year"), at(0, [ "YYYYY", 5 ], 0, "year"), at(0, [ "YYYYYY", 6, !0 ], 0, "year"), 
J("year", "y"), tt("year", 1), Yt("Y", kt), Yt("YY", gt, ft), Yt("YYYY", bt, pt), 
Yt("YYYYY", St, _t), Yt("YYYYYY", St, _t), At([ "YYYYY", "YYYYYY" ], Wt), At("YYYY", (function(t, e) {
e[Wt] = 2 === t.length ? r.parseTwoDigitYear(t) : E(t);
})), At("YY", (function(t, e) {
e[Wt] = r.parseTwoDigitYear(t);
})), At("Y", (function(t, e) {
e[Wt] = parseInt(t, 10);
})), r.parseTwoDigitYear = function(t) {
return E(t) + (E(t) > 68 ? 1900 : 2e3);
};
var $t, Jt = Xt("FullYear", !0);
function Kt() {
return Bt(this.year());
}
function Xt(t, e) {
return function(n) {
return null != n ? (te(this, t, n), r.updateOffset(this, e), this) : Qt(this, t);
};
}
function Qt(t, e) {
return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN;
}
function te(t, e, n) {
t.isValid() && !isNaN(n) && ("FullYear" === e && Bt(t.year()) && 1 === t.month() && 29 === t.date() ? t._d["set" + (t._isUTC ? "UTC" : "") + e](n, t.month(), re(n, t.month())) : t._d["set" + (t._isUTC ? "UTC" : "") + e](n));
}
function ee(t) {
return P(this[t = K(t)]) ? this[t]() : this;
}
function ne(t, e) {
if ("object" == typeof t) for (var n = et(t = X(t)), i = 0; i < n.length; i++) this[n[i].unit](t[n[i].unit]); else if (P(this[t = K(t)])) return this[t](e);
return this;
}
function ie(t, e) {
return (t % e + e) % e;
}
function re(t, e) {
if (isNaN(t) || isNaN(e)) return NaN;
var n = ie(e, 12);
return t += (e - n) / 12, 1 === n ? Bt(t) ? 29 : 28 : 31 - n % 7 % 2;
}
$t = Array.prototype.indexOf ? Array.prototype.indexOf : function(t) {
var e;
for (e = 0; e < this.length; ++e) if (this[e] === t) return e;
return -1;
}, at("M", [ "MM", 2 ], "Mo", (function() {
return this.month() + 1;
})), at("MMM", 0, 0, (function(t) {
return this.localeData().monthsShort(this, t);
})), at("MMMM", 0, 0, (function(t) {
return this.localeData().months(this, t);
})), J("month", "M"), tt("month", 8), Yt("M", gt), Yt("MM", gt, ft), Yt("MMM", (function(t, e) {
return e.monthsShortRegex(t);
})), Yt("MMMM", (function(t, e) {
return e.monthsRegex(t);
})), At([ "M", "MM" ], (function(t, e) {
e[Rt] = E(t) - 1;
})), At([ "MMM", "MMMM" ], (function(t, e, n, i) {
var r = n._locale.monthsParse(t, i, n._strict);
null != r ? e[Rt] = r : g(n).invalidMonth = t;
}));
var oe = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, se = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
function ae(t, e) {
return t ? s(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || oe).test(e) ? "format" : "standalone"][t.month()] : s(this._months) ? this._months : this._months.standalone;
}
var le = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
function ue(t, e) {
return t ? s(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[oe.test(e) ? "format" : "standalone"][t.month()] : s(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function ce(t, e, n) {
var i, r, o, s = t.toLocaleLowerCase();
if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], 
this._shortMonthsParse = [], i = 0; i < 12; ++i) o = p([ 2e3, i ]), this._shortMonthsParse[i] = this.monthsShort(o, "").toLocaleLowerCase(), 
this._longMonthsParse[i] = this.months(o, "").toLocaleLowerCase();
return n ? "MMM" === e ? -1 !== (r = $t.call(this._shortMonthsParse, s)) ? r : null : -1 !== (r = $t.call(this._longMonthsParse, s)) ? r : null : "MMM" === e ? -1 !== (r = $t.call(this._shortMonthsParse, s)) || -1 !== (r = $t.call(this._longMonthsParse, s)) ? r : null : -1 !== (r = $t.call(this._longMonthsParse, s)) || -1 !== (r = $t.call(this._shortMonthsParse, s)) ? r : null;
}
function de(t, e, n) {
var i, r, o;
if (this._monthsParseExact) return ce.call(this, t, e, n);
for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), 
i = 0; i < 12; i++) {
if (r = p([ 2e3, i ]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), 
this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), 
n || this._monthsParse[i] || (o = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), 
this._monthsParse[i] = new RegExp(o.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i;
if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i;
if (!n && this._monthsParse[i].test(t)) return i;
}
}
function he(t, e) {
var n;
if (!t.isValid()) return t;
if ("string" == typeof e) if (/^\d+$/.test(e)) e = E(e); else if (!c(e = t.localeData().monthsParse(e))) return t;
return n = Math.min(t.date(), re(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), 
t;
}
function fe(t) {
return null != t ? (he(this, t), r.updateOffset(this, !0), this) : Qt(this, "Month");
}
function me() {
return re(this.year(), this.month());
}
var pe = Ct;
function _e(t) {
return this._monthsParseExact ? (f(this, "_monthsRegex") || ve.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (f(this, "_monthsShortRegex") || (this._monthsShortRegex = pe), 
this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
var ge = Ct;
function ye(t) {
return this._monthsParseExact ? (f(this, "_monthsRegex") || ve.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (f(this, "_monthsRegex") || (this._monthsRegex = ge), 
this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex);
}
function ve() {
function t(t, e) {
return e.length - t.length;
}
var e, n, i = [], r = [], o = [];
for (e = 0; e < 12; e++) n = p([ 2e3, e ]), i.push(this.monthsShort(n, "")), r.push(this.months(n, "")), 
o.push(this.months(n, "")), o.push(this.monthsShort(n, ""));
for (i.sort(t), r.sort(t), o.sort(t), e = 0; e < 12; e++) i[e] = Pt(i[e]), r[e] = Pt(r[e]);
for (e = 0; e < 24; e++) o[e] = Pt(o[e]);
this._monthsRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, 
this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i");
}
function we(t, e, n, i, r, o, s) {
var a;
return t < 100 && t >= 0 ? (a = new Date(t + 400, e, n, i, r, o, s), isFinite(a.getFullYear()) && a.setFullYear(t)) : a = new Date(t, e, n, i, r, o, s), 
a;
}
function be(t) {
var e;
if (t < 100 && t >= 0) {
var n = Array.prototype.slice.call(arguments);
n[0] = t + 400, e = new Date(Date.UTC.apply(null, n)), isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t);
} else e = new Date(Date.UTC.apply(null, arguments));
return e;
}
function Se(t, e, n) {
var i = 7 + e - n;
return -(7 + be(t, 0, i).getUTCDay() - e) % 7 + i - 1;
}
function Me(t, e, n, i, r) {
var o, s, a = 1 + 7 * (e - 1) + (7 + n - i) % 7 + Se(t, i, r);
return a <= 0 ? s = Zt(o = t - 1) + a : a > Zt(t) ? (o = t + 1, s = a - Zt(t)) : (o = t, 
s = a), {
year: o,
dayOfYear: s
};
}
function ke(t, e, n) {
var i, r, o = Se(t.year(), e, n), s = Math.floor((t.dayOfYear() - o - 1) / 7) + 1;
return s < 1 ? i = s + De(r = t.year() - 1, e, n) : s > De(t.year(), e, n) ? (i = s - De(t.year(), e, n), 
r = t.year() + 1) : (r = t.year(), i = s), {
week: i,
year: r
};
}
function De(t, e, n) {
var i = Se(t, e, n), r = Se(t + 1, e, n);
return (Zt(t) - i + r) / 7;
}
function Ee(t) {
return ke(t, this._week.dow, this._week.doy).week;
}
at("w", [ "ww", 2 ], "wo", "week"), at("W", [ "WW", 2 ], "Wo", "isoWeek"), J("week", "w"), 
J("isoWeek", "W"), tt("week", 5), tt("isoWeek", 5), Yt("w", gt), Yt("ww", gt, ft), 
Yt("W", gt), Yt("WW", gt, ft), Ht([ "w", "ww", "W", "WW" ], (function(t, e, n, i) {
e[i.substr(0, 1)] = E(t);
}));
var Te = {
dow: 0,
doy: 6
};
function Ce() {
return this._week.dow;
}
function xe() {
return this._week.doy;
}
function Ye(t) {
var e = this.localeData().week(this);
return null == t ? e : this.add(7 * (t - e), "d");
}
function Oe(t) {
var e = ke(this, 1, 4).week;
return null == t ? e : this.add(7 * (t - e), "d");
}
function Le(t, e) {
return "string" != typeof t ? t : isNaN(t) ? "number" == typeof (t = e.weekdaysParse(t)) ? t : null : parseInt(t, 10);
}
function Pe(t, e) {
return "string" == typeof t ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t;
}
function Ne(t, e) {
return t.slice(e, 7).concat(t.slice(0, e));
}
at("d", 0, "do", "day"), at("dd", 0, 0, (function(t) {
return this.localeData().weekdaysMin(this, t);
})), at("ddd", 0, 0, (function(t) {
return this.localeData().weekdaysShort(this, t);
})), at("dddd", 0, 0, (function(t) {
return this.localeData().weekdays(this, t);
})), at("e", 0, 0, "weekday"), at("E", 0, 0, "isoWeekday"), J("day", "d"), J("weekday", "e"), 
J("isoWeekday", "E"), tt("day", 11), tt("weekday", 11), tt("isoWeekday", 11), Yt("d", gt), 
Yt("e", gt), Yt("E", gt), Yt("dd", (function(t, e) {
return e.weekdaysMinRegex(t);
})), Yt("ddd", (function(t, e) {
return e.weekdaysShortRegex(t);
})), Yt("dddd", (function(t, e) {
return e.weekdaysRegex(t);
})), Ht([ "dd", "ddd", "dddd" ], (function(t, e, n, i) {
var r = n._locale.weekdaysParse(t, i, n._strict);
null != r ? e.d = r : g(n).invalidWeekday = t;
})), Ht([ "d", "e", "E" ], (function(t, e, n, i) {
e[i] = E(t);
}));
var Ae = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
function He(t, e) {
var n = s(this._weekdays) ? this._weekdays : this._weekdays[t && !0 !== t && this._weekdays.isFormat.test(e) ? "format" : "standalone"];
return !0 === t ? Ne(n, this._week.dow) : t ? n[t.day()] : n;
}
var Fe = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
function We(t) {
return !0 === t ? Ne(this._weekdaysShort, this._week.dow) : t ? this._weekdaysShort[t.day()] : this._weekdaysShort;
}
var Re = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
function je(t) {
return !0 === t ? Ne(this._weekdaysMin, this._week.dow) : t ? this._weekdaysMin[t.day()] : this._weekdaysMin;
}
function Ue(t, e, n) {
var i, r, o, s = t.toLocaleLowerCase();
if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], 
this._minWeekdaysParse = [], i = 0; i < 7; ++i) o = p([ 2e3, 1 ]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(o, "").toLocaleLowerCase(), 
this._shortWeekdaysParse[i] = this.weekdaysShort(o, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(o, "").toLocaleLowerCase();
return n ? "dddd" === e ? -1 !== (r = $t.call(this._weekdaysParse, s)) ? r : null : "ddd" === e ? -1 !== (r = $t.call(this._shortWeekdaysParse, s)) ? r : null : -1 !== (r = $t.call(this._minWeekdaysParse, s)) ? r : null : "dddd" === e ? -1 !== (r = $t.call(this._weekdaysParse, s)) || -1 !== (r = $t.call(this._shortWeekdaysParse, s)) || -1 !== (r = $t.call(this._minWeekdaysParse, s)) ? r : null : "ddd" === e ? -1 !== (r = $t.call(this._shortWeekdaysParse, s)) || -1 !== (r = $t.call(this._weekdaysParse, s)) || -1 !== (r = $t.call(this._minWeekdaysParse, s)) ? r : null : -1 !== (r = $t.call(this._minWeekdaysParse, s)) || -1 !== (r = $t.call(this._weekdaysParse, s)) || -1 !== (r = $t.call(this._shortWeekdaysParse, s)) ? r : null;
}
function Ie(t, e, n) {
var i, r, o;
if (this._weekdaysParseExact) return Ue.call(this, t, e, n);
for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], 
this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) {
if (r = p([ 2e3, 1 ]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(r, "").replace(".", "\\.?") + "$", "i"), 
this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", "\\.?") + "$", "i"), 
this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", "\\.?") + "$", "i")), 
this._weekdaysParse[i] || (o = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), 
this._weekdaysParse[i] = new RegExp(o.replace(".", ""), "i")), n && "dddd" === e && this._fullWeekdaysParse[i].test(t)) return i;
if (n && "ddd" === e && this._shortWeekdaysParse[i].test(t)) return i;
if (n && "dd" === e && this._minWeekdaysParse[i].test(t)) return i;
if (!n && this._weekdaysParse[i].test(t)) return i;
}
}
function Ge(t) {
if (!this.isValid()) return null != t ? this : NaN;
var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
return null != t ? (t = Le(t, this.localeData()), this.add(t - e, "d")) : e;
}
function Ve(t) {
if (!this.isValid()) return null != t ? this : NaN;
var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
return null == t ? e : this.add(t - e, "d");
}
function ze(t) {
if (!this.isValid()) return null != t ? this : NaN;
if (null != t) {
var e = Pe(t, this.localeData());
return this.day(this.day() % 7 ? e : e - 7);
}
return this.day() || 7;
}
var qe = Ct;
function Ze(t) {
return this._weekdaysParseExact ? (f(this, "_weekdaysRegex") || Xe.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (f(this, "_weekdaysRegex") || (this._weekdaysRegex = qe), 
this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
var Be = Ct;
function $e(t) {
return this._weekdaysParseExact ? (f(this, "_weekdaysRegex") || Xe.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (f(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Be), 
this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
var Je = Ct;
function Ke(t) {
return this._weekdaysParseExact ? (f(this, "_weekdaysRegex") || Xe.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (f(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Je), 
this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Xe() {
function t(t, e) {
return e.length - t.length;
}
var e, n, i, r, o, s = [], a = [], l = [], u = [];
for (e = 0; e < 7; e++) n = p([ 2e3, 1 ]).day(e), i = this.weekdaysMin(n, ""), r = this.weekdaysShort(n, ""), 
o = this.weekdays(n, ""), s.push(i), a.push(r), l.push(o), u.push(i), u.push(r), 
u.push(o);
for (s.sort(t), a.sort(t), l.sort(t), u.sort(t), e = 0; e < 7; e++) a[e] = Pt(a[e]), 
l[e] = Pt(l[e]), u[e] = Pt(u[e]);
this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, 
this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), 
this._weekdaysShortStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + s.join("|") + ")", "i");
}
function Qe() {
return this.hours() % 12 || 12;
}
function tn() {
return this.hours() || 24;
}
function en(t, e) {
at(t, 0, 0, (function() {
return this.localeData().meridiem(this.hours(), this.minutes(), e);
}));
}
function nn(t, e) {
return e._meridiemParse;
}
function rn(t) {
return "p" === (t + "").toLowerCase().charAt(0);
}
at("H", [ "HH", 2 ], 0, "hour"), at("h", [ "hh", 2 ], 0, Qe), at("k", [ "kk", 2 ], 0, tn), 
at("hmm", 0, 0, (function() {
return "" + Qe.apply(this) + nt(this.minutes(), 2);
})), at("hmmss", 0, 0, (function() {
return "" + Qe.apply(this) + nt(this.minutes(), 2) + nt(this.seconds(), 2);
})), at("Hmm", 0, 0, (function() {
return "" + this.hours() + nt(this.minutes(), 2);
})), at("Hmmss", 0, 0, (function() {
return "" + this.hours() + nt(this.minutes(), 2) + nt(this.seconds(), 2);
})), en("a", !0), en("A", !1), J("hour", "h"), tt("hour", 13), Yt("a", nn), Yt("A", nn), 
Yt("H", gt), Yt("h", gt), Yt("k", gt), Yt("HH", gt, ft), Yt("hh", gt, ft), Yt("kk", gt, ft), 
Yt("hmm", yt), Yt("hmmss", vt), Yt("Hmm", yt), Yt("Hmmss", vt), At([ "H", "HH" ], Ut), 
At([ "k", "kk" ], (function(t, e, n) {
var i = E(t);
e[Ut] = 24 === i ? 0 : i;
})), At([ "a", "A" ], (function(t, e, n) {
n._isPm = n._locale.isPM(t), n._meridiem = t;
})), At([ "h", "hh" ], (function(t, e, n) {
e[Ut] = E(t), g(n).bigHour = !0;
})), At("hmm", (function(t, e, n) {
var i = t.length - 2;
e[Ut] = E(t.substr(0, i)), e[It] = E(t.substr(i)), g(n).bigHour = !0;
})), At("hmmss", (function(t, e, n) {
var i = t.length - 4, r = t.length - 2;
e[Ut] = E(t.substr(0, i)), e[It] = E(t.substr(i, 2)), e[Gt] = E(t.substr(r)), g(n).bigHour = !0;
})), At("Hmm", (function(t, e, n) {
var i = t.length - 2;
e[Ut] = E(t.substr(0, i)), e[It] = E(t.substr(i));
})), At("Hmmss", (function(t, e, n) {
var i = t.length - 4, r = t.length - 2;
e[Ut] = E(t.substr(0, i)), e[It] = E(t.substr(i, 2)), e[Gt] = E(t.substr(r));
}));
var on = /[ap]\.?m?\.?/i;
function sn(t, e, n) {
return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
}
var an, ln = Xt("Hours", !0), un = {
calendar: F,
longDateFormat: R,
invalidDate: U,
ordinal: G,
dayOfMonthOrdinalParse: V,
relativeTime: q,
months: se,
monthsShort: le,
week: Te,
weekdays: Ae,
weekdaysMin: Re,
weekdaysShort: Fe,
meridiemParse: on
}, cn = {}, dn = {};
function hn(t) {
return t ? t.toLowerCase().replace("_", "-") : t;
}
function fn(t) {
for (var e, n, i, r, o = 0; o < t.length; ) {
for (e = (r = hn(t[o]).split("-")).length, n = (n = hn(t[o + 1])) ? n.split("-") : null; e > 0; ) {
if (i = mn(r.slice(0, e).join("-"))) return i;
if (n && n.length >= e && T(r, n, !0) >= e - 1) break;
e--;
}
o++;
}
return an;
}
function mn(e) {
var i = null;
if (!cn[e] && void 0 !== t && t && t.exports) try {
i = an._abbr, n(30)("./" + e), pn(i);
} catch (t) {}
return cn[e];
}
function pn(t, e) {
var n;
return t && ((n = u(e) ? yn(t) : _n(t, e)) ? an = n : "undefined" != typeof console && console.warn), 
an._abbr;
}
function _n(t, e) {
if (null !== e) {
var n, i = un;
if (e.abbr = t, null != cn[t]) L("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), 
i = cn[t]._config; else if (null != e.parentLocale) if (null != cn[e.parentLocale]) i = cn[e.parentLocale]._config; else {
if (null == (n = mn(e.parentLocale))) return dn[e.parentLocale] || (dn[e.parentLocale] = []), 
dn[e.parentLocale].push({
name: t,
config: e
}), null;
i = n._config;
}
return cn[t] = new H(A(i, e)), dn[t] && dn[t].forEach((function(t) {
_n(t.name, t.config);
})), pn(t), cn[t];
}
return delete cn[t], null;
}
function gn(t, e) {
if (null != e) {
var n, i, r = un;
null != (i = mn(t)) && (r = i._config), (n = new H(e = A(r, e))).parentLocale = cn[t], 
cn[t] = n, pn(t);
} else null != cn[t] && (null != cn[t].parentLocale ? cn[t] = cn[t].parentLocale : null != cn[t] && delete cn[t]);
return cn[t];
}
function yn(t) {
var e;
if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return an;
if (!s(t)) {
if (e = mn(t)) return e;
t = [ t ];
}
return fn(t);
}
function vn() {
return Y(cn);
}
function wn(t) {
var e, n = t._a;
return n && -2 === g(t).overflow && (e = n[Rt] < 0 || n[Rt] > 11 ? Rt : n[jt] < 1 || n[jt] > re(n[Wt], n[Rt]) ? jt : n[Ut] < 0 || n[Ut] > 24 || 24 === n[Ut] && (0 !== n[It] || 0 !== n[Gt] || 0 !== n[Vt]) ? Ut : n[It] < 0 || n[It] > 59 ? It : n[Gt] < 0 || n[Gt] > 59 ? Gt : n[Vt] < 0 || n[Vt] > 999 ? Vt : -1, 
g(t)._overflowDayOfYear && (e < Wt || e > jt) && (e = jt), g(t)._overflowWeeks && -1 === e && (e = zt), 
g(t)._overflowWeekday && -1 === e && (e = qt), g(t).overflow = e), t;
}
function bn(t, e, n) {
return null != t ? t : null != e ? e : n;
}
function Sn(t) {
var e = new Date(r.now());
return t._useUTC ? [ e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate() ] : [ e.getFullYear(), e.getMonth(), e.getDate() ];
}
function Mn(t) {
var e, n, i, r, o, s = [];
if (!t._d) {
for (i = Sn(t), t._w && null == t._a[jt] && null == t._a[Rt] && kn(t), null != t._dayOfYear && (o = bn(t._a[Wt], i[Wt]), 
(t._dayOfYear > Zt(o) || 0 === t._dayOfYear) && (g(t)._overflowDayOfYear = !0), 
n = be(o, 0, t._dayOfYear), t._a[Rt] = n.getUTCMonth(), t._a[jt] = n.getUTCDate()), 
e = 0; e < 3 && null == t._a[e]; ++e) t._a[e] = s[e] = i[e];
for (;e < 7; e++) t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
24 === t._a[Ut] && 0 === t._a[It] && 0 === t._a[Gt] && 0 === t._a[Vt] && (t._nextDay = !0, 
t._a[Ut] = 0), t._d = (t._useUTC ? be : we).apply(null, s), r = t._useUTC ? t._d.getUTCDay() : t._d.getDay(), 
null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[Ut] = 24), 
t._w && void 0 !== t._w.d && t._w.d !== r && (g(t).weekdayMismatch = !0);
}
}
function kn(t) {
var e, n, i, r, o, s, a, l;
if (null != (e = t._w).GG || null != e.W || null != e.E) o = 1, s = 4, n = bn(e.GG, t._a[Wt], ke($n(), 1, 4).year), 
i = bn(e.W, 1), ((r = bn(e.E, 1)) < 1 || r > 7) && (l = !0); else {
o = t._locale._week.dow, s = t._locale._week.doy;
var u = ke($n(), o, s);
n = bn(e.gg, t._a[Wt], u.year), i = bn(e.w, u.week), null != e.d ? ((r = e.d) < 0 || r > 6) && (l = !0) : null != e.e ? (r = e.e + o, 
(e.e < 0 || e.e > 6) && (l = !0)) : r = o;
}
i < 1 || i > De(n, o, s) ? g(t)._overflowWeeks = !0 : null != l ? g(t)._overflowWeekday = !0 : (a = Me(n, i, r, o, s), 
t._a[Wt] = a.year, t._dayOfYear = a.dayOfYear);
}
var Dn = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, En = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Tn = /Z|[+-]\d\d(?::?\d\d)?/, Cn = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/ ], [ "YYYY-MM-DD", /\d{4}-\d\d-\d\d/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d\d-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d\d/, !1 ], [ "YYYY-DDD", /\d{4}-\d{3}/ ], [ "YYYY-MM", /\d{4}-\d\d/, !1 ], [ "YYYYYYMMDD", /[+-]\d{10}/ ], [ "YYYYMMDD", /\d{8}/ ], [ "GGGG[W]WWE", /\d{4}W\d{3}/ ], [ "GGGG[W]WW", /\d{4}W\d{2}/, !1 ], [ "YYYYDDD", /\d{7}/ ] ], xn = [ [ "HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/ ], [ "HH:mm:ss", /\d\d:\d\d:\d\d/ ], [ "HH:mm", /\d\d:\d\d/ ], [ "HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/ ], [ "HHmmss,SSSS", /\d\d\d\d\d\d,\d+/ ], [ "HHmmss", /\d\d\d\d\d\d/ ], [ "HHmm", /\d\d\d\d/ ], [ "HH", /\d\d/ ] ], Yn = /^\/?Date\((\-?\d+)/i;
function On(t) {
var e, n, i, r, o, s, a = t._i, l = Dn.exec(a) || En.exec(a);
if (l) {
for (g(t).iso = !0, e = 0, n = Cn.length; e < n; e++) if (Cn[e][1].exec(l[1])) {
r = Cn[e][0], i = !1 !== Cn[e][2];
break;
}
if (null == r) return void (t._isValid = !1);
if (l[3]) {
for (e = 0, n = xn.length; e < n; e++) if (xn[e][1].exec(l[3])) {
o = (l[2] || " ") + xn[e][0];
break;
}
if (null == o) return void (t._isValid = !1);
}
if (!i && null != o) return void (t._isValid = !1);
if (l[4]) {
if (!Tn.exec(l[4])) return void (t._isValid = !1);
s = "Z";
}
t._f = r + (o || "") + (s || ""), Un(t);
} else t._isValid = !1;
}
var Ln = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
function Pn(t, e, n, i, r, o) {
var s = [ Nn(t), le.indexOf(e), parseInt(n, 10), parseInt(i, 10), parseInt(r, 10) ];
return o && s.push(parseInt(o, 10)), s;
}
function Nn(t) {
var e = parseInt(t, 10);
return e <= 49 ? 2e3 + e : e <= 999 ? 1900 + e : e;
}
function An(t) {
return t.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function Hn(t, e, n) {
return !t || Fe.indexOf(t) === new Date(e[0], e[1], e[2]).getDay() || (g(n).weekdayMismatch = !0, 
n._isValid = !1, !1);
}
var Fn = {
UT: 0,
GMT: 0,
EDT: -240,
EST: -300,
CDT: -300,
CST: -360,
MDT: -360,
MST: -420,
PDT: -420,
PST: -480
};
function Wn(t, e, n) {
if (t) return Fn[t];
if (e) return 0;
var i = parseInt(n, 10), r = i % 100;
return (i - r) / 100 * 60 + r;
}
function Rn(t) {
var e = Ln.exec(An(t._i));
if (e) {
var n = Pn(e[4], e[3], e[2], e[5], e[6], e[7]);
if (!Hn(e[1], n, t)) return;
t._a = n, t._tzm = Wn(e[8], e[9], e[10]), t._d = be.apply(null, t._a), t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), 
g(t).rfc2822 = !0;
} else t._isValid = !1;
}
function jn(t) {
var e = Yn.exec(t._i);
null === e ? (On(t), !1 === t._isValid && (delete t._isValid, Rn(t), !1 === t._isValid && (delete t._isValid, 
r.createFromInputFallback(t)))) : t._d = new Date(+e[1]);
}
function Un(t) {
if (t._f !== r.ISO_8601) if (t._f !== r.RFC_2822) {
t._a = [], g(t).empty = !0;
var e, n, i, o, s, a = "" + t._i, l = a.length, u = 0;
for (i = dt(t._f, t._locale).match(it) || [], e = 0; e < i.length; e++) o = i[e], 
(n = (a.match(Ot(o, t)) || [])[0]) && ((s = a.substr(0, a.indexOf(n))).length > 0 && g(t).unusedInput.push(s), 
a = a.slice(a.indexOf(n) + n.length), u += n.length), st[o] ? (n ? g(t).empty = !1 : g(t).unusedTokens.push(o), 
Ft(o, n, t)) : t._strict && !n && g(t).unusedTokens.push(o);
g(t).charsLeftOver = l - u, a.length > 0 && g(t).unusedInput.push(a), t._a[Ut] <= 12 && !0 === g(t).bigHour && t._a[Ut] > 0 && (g(t).bigHour = void 0), 
g(t).parsedDateParts = t._a.slice(0), g(t).meridiem = t._meridiem, t._a[Ut] = In(t._locale, t._a[Ut], t._meridiem), 
Mn(t), wn(t);
} else Rn(t); else On(t);
}
function In(t, e, n) {
var i;
return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? ((i = t.isPM(n)) && e < 12 && (e += 12), 
i || 12 !== e || (e = 0), e) : e;
}
function Gn(t) {
var e, n, i, r, o;
if (0 === t._f.length) return g(t).invalidFormat = !0, void (t._d = new Date(NaN));
for (r = 0; r < t._f.length; r++) o = 0, e = b({}, t), null != t._useUTC && (e._useUTC = t._useUTC), 
e._f = t._f[r], Un(e), y(e) && (o += g(e).charsLeftOver, o += 10 * g(e).unusedTokens.length, 
g(e).score = o, (null == i || o < i) && (i = o, n = e));
m(t, n || e);
}
function Vn(t) {
if (!t._d) {
var e = X(t._i);
t._a = h([ e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond ], (function(t) {
return t && parseInt(t, 10);
})), Mn(t);
}
}
function zn(t) {
var e = new M(wn(qn(t)));
return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e;
}
function qn(t) {
var e = t._i, n = t._f;
return t._locale = t._locale || yn(t._l), null === e || void 0 === n && "" === e ? v({
nullInput: !0
}) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), k(e) ? new M(wn(e)) : (d(e) ? t._d = e : s(n) ? Gn(t) : n ? Un(t) : Zn(t), 
y(t) || (t._d = null), t));
}
function Zn(t) {
var e = t._i;
u(e) ? t._d = new Date(r.now()) : d(e) ? t._d = new Date(e.valueOf()) : "string" == typeof e ? jn(t) : s(e) ? (t._a = h(e.slice(0), (function(t) {
return parseInt(t, 10);
})), Mn(t)) : a(e) ? Vn(t) : c(e) ? t._d = new Date(e) : r.createFromInputFallback(t);
}
function Bn(t, e, n, i, r) {
var o = {};
return !0 !== n && !1 !== n || (i = n, n = void 0), (a(t) && l(t) || s(t) && 0 === t.length) && (t = void 0), 
o._isAMomentObject = !0, o._useUTC = o._isUTC = r, o._l = n, o._i = t, o._f = e, 
o._strict = i, zn(o);
}
function $n(t, e, n, i) {
return Bn(t, e, n, i, !1);
}
r.createFromInputFallback = x("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", (function(t) {
t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
})), r.ISO_8601 = function() {}, r.RFC_2822 = function() {};
var Jn = x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", (function() {
var t = $n.apply(null, arguments);
return this.isValid() && t.isValid() ? t < this ? this : t : v();
})), Kn = x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", (function() {
var t = $n.apply(null, arguments);
return this.isValid() && t.isValid() ? t > this ? this : t : v();
}));
function Xn(t, e) {
var n, i;
if (1 === e.length && s(e[0]) && (e = e[0]), !e.length) return $n();
for (n = e[0], i = 1; i < e.length; ++i) e[i].isValid() && !e[i][t](n) || (n = e[i]);
return n;
}
function Qn() {
return Xn("isBefore", [].slice.call(arguments, 0));
}
function ti() {
return Xn("isAfter", [].slice.call(arguments, 0));
}
var ei = function() {
return Date.now ? Date.now() : +new Date;
}, ni = [ "year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond" ];
function ii(t) {
for (var e in t) if (-1 === $t.call(ni, e) || null != t[e] && isNaN(t[e])) return !1;
for (var n = !1, i = 0; i < ni.length; ++i) if (t[ni[i]]) {
if (n) return !1;
parseFloat(t[ni[i]]) !== E(t[ni[i]]) && (n = !0);
}
return !0;
}
function ri() {
return this._isValid;
}
function oi() {
return Ti(NaN);
}
function si(t) {
var e = X(t), n = e.year || 0, i = e.quarter || 0, r = e.month || 0, o = e.week || e.isoWeek || 0, s = e.day || 0, a = e.hour || 0, l = e.minute || 0, u = e.second || 0, c = e.millisecond || 0;
this._isValid = ii(e), this._milliseconds = +c + 1e3 * u + 6e4 * l + 1e3 * a * 60 * 60, 
this._days = +s + 7 * o, this._months = +r + 3 * i + 12 * n, this._data = {}, this._locale = yn(), 
this._bubble();
}
function ai(t) {
return t instanceof si;
}
function li(t) {
return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t);
}
function ui(t, e) {
at(t, 0, 0, (function() {
var t = this.utcOffset(), n = "+";
return t < 0 && (t = -t, n = "-"), n + nt(~~(t / 60), 2) + e + nt(~~t % 60, 2);
}));
}
ui("Z", ":"), ui("ZZ", ""), Yt("Z", Et), Yt("ZZ", Et), At([ "Z", "ZZ" ], (function(t, e, n) {
n._useUTC = !0, n._tzm = di(Et, t);
}));
var ci = /([\+\-]|\d\d)/gi;
function di(t, e) {
var n = (e || "").match(t);
if (null === n) return null;
var i = ((n[n.length - 1] || []) + "").match(ci) || [ "-", 0, 0 ], r = 60 * i[1] + E(i[2]);
return 0 === r ? 0 : "+" === i[0] ? r : -r;
}
function hi(t, e) {
var n, i;
return e._isUTC ? (n = e.clone(), i = (k(t) || d(t) ? t.valueOf() : $n(t).valueOf()) - n.valueOf(), 
n._d.setTime(n._d.valueOf() + i), r.updateOffset(n, !1), n) : $n(t).local();
}
function fi(t) {
return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
}
function mi(t, e, n) {
var i, o = this._offset || 0;
if (!this.isValid()) return null != t ? this : NaN;
if (null != t) {
if ("string" == typeof t) {
if (null === (t = di(Et, t))) return this;
} else Math.abs(t) < 16 && !n && (t *= 60);
return !this._isUTC && e && (i = fi(this)), this._offset = t, this._isUTC = !0, 
null != i && this.add(i, "m"), o !== t && (!e || this._changeInProgress ? Li(this, Ti(t - o, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, 
r.updateOffset(this, !0), this._changeInProgress = null)), this;
}
return this._isUTC ? o : fi(this);
}
function pi(t, e) {
return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset();
}
function _i(t) {
return this.utcOffset(0, t);
}
function gi(t) {
return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(fi(this), "m")), 
this;
}
function yi() {
if (null != this._tzm) this.utcOffset(this._tzm, !1, !0); else if ("string" == typeof this._i) {
var t = di(Dt, this._i);
null != t ? this.utcOffset(t) : this.utcOffset(0, !0);
}
return this;
}
function vi(t) {
return !!this.isValid() && (t = t ? $n(t).utcOffset() : 0, (this.utcOffset() - t) % 60 == 0);
}
function wi() {
return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function bi() {
if (!u(this._isDSTShifted)) return this._isDSTShifted;
var t = {};
if (b(t, this), (t = qn(t))._a) {
var e = t._isUTC ? p(t._a) : $n(t._a);
this._isDSTShifted = this.isValid() && T(t._a, e.toArray()) > 0;
} else this._isDSTShifted = !1;
return this._isDSTShifted;
}
function Si() {
return !!this.isValid() && !this._isUTC;
}
function Mi() {
return !!this.isValid() && this._isUTC;
}
function ki() {
return !!this.isValid() && this._isUTC && 0 === this._offset;
}
r.updateOffset = function() {};
var Di = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/, Ei = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function Ti(t, e) {
var n, i, r, o = t, s = null;
return ai(t) ? o = {
ms: t._milliseconds,
d: t._days,
M: t._months
} : c(t) ? (o = {}, e ? o[e] = t : o.milliseconds = t) : (s = Di.exec(t)) ? (n = "-" === s[1] ? -1 : 1, 
o = {
y: 0,
d: E(s[jt]) * n,
h: E(s[Ut]) * n,
m: E(s[It]) * n,
s: E(s[Gt]) * n,
ms: E(li(1e3 * s[Vt])) * n
}) : (s = Ei.exec(t)) ? (n = "-" === s[1] ? -1 : 1, o = {
y: Ci(s[2], n),
M: Ci(s[3], n),
w: Ci(s[4], n),
d: Ci(s[5], n),
h: Ci(s[6], n),
m: Ci(s[7], n),
s: Ci(s[8], n)
}) : null == o ? o = {} : "object" == typeof o && ("from" in o || "to" in o) && (r = Yi($n(o.from), $n(o.to)), 
(o = {}).ms = r.milliseconds, o.M = r.months), i = new si(o), ai(t) && f(t, "_locale") && (i._locale = t._locale), 
i;
}
function Ci(t, e) {
var n = t && parseFloat(t.replace(",", "."));
return (isNaN(n) ? 0 : n) * e;
}
function xi(t, e) {
var n = {};
return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, 
n.milliseconds = +e - +t.clone().add(n.months, "M"), n;
}
function Yi(t, e) {
var n;
return t.isValid() && e.isValid() ? (e = hi(e, t), t.isBefore(e) ? n = xi(t, e) : ((n = xi(e, t)).milliseconds = -n.milliseconds, 
n.months = -n.months), n) : {
milliseconds: 0,
months: 0
};
}
function Oi(t, e) {
return function(n, i) {
var r;
return null === i || isNaN(+i) || (L(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), 
r = n, n = i, i = r), Li(this, Ti(n = "string" == typeof n ? +n : n, i), t), this;
};
}
function Li(t, e, n, i) {
var o = e._milliseconds, s = li(e._days), a = li(e._months);
t.isValid() && (i = null == i || i, a && he(t, Qt(t, "Month") + a * n), s && te(t, "Date", Qt(t, "Date") + s * n), 
o && t._d.setTime(t._d.valueOf() + o * n), i && r.updateOffset(t, s || a));
}
Ti.fn = si.prototype, Ti.invalid = oi;
var Pi = Oi(1, "add"), Ni = Oi(-1, "subtract");
function Ai(t, e) {
var n = t.diff(e, "days", !0);
return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse";
}
function Hi(t, e) {
var n = t || $n(), i = hi(n, this).startOf("day"), o = r.calendarFormat(this, i) || "sameElse", s = e && (P(e[o]) ? e[o].call(this, n) : e[o]);
return this.format(s || this.localeData().calendar(o, this, $n(n)));
}
function Fi() {
return new M(this);
}
function Wi(t, e) {
var n = k(t) ? t : $n(t);
return !(!this.isValid() || !n.isValid()) && ("millisecond" === (e = K(e) || "millisecond") ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(e).valueOf());
}
function Ri(t, e) {
var n = k(t) ? t : $n(t);
return !(!this.isValid() || !n.isValid()) && ("millisecond" === (e = K(e) || "millisecond") ? this.valueOf() < n.valueOf() : this.clone().endOf(e).valueOf() < n.valueOf());
}
function ji(t, e, n, i) {
var r = k(t) ? t : $n(t), o = k(e) ? e : $n(e);
return !!(this.isValid() && r.isValid() && o.isValid()) && ("(" === (i = i || "()")[0] ? this.isAfter(r, n) : !this.isBefore(r, n)) && (")" === i[1] ? this.isBefore(o, n) : !this.isAfter(o, n));
}
function Ui(t, e) {
var n, i = k(t) ? t : $n(t);
return !(!this.isValid() || !i.isValid()) && ("millisecond" === (e = K(e) || "millisecond") ? this.valueOf() === i.valueOf() : (n = i.valueOf(), 
this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf()));
}
function Ii(t, e) {
return this.isSame(t, e) || this.isAfter(t, e);
}
function Gi(t, e) {
return this.isSame(t, e) || this.isBefore(t, e);
}
function Vi(t, e, n) {
var i, r, o;
if (!this.isValid()) return NaN;
if (!(i = hi(t, this)).isValid()) return NaN;
switch (r = 6e4 * (i.utcOffset() - this.utcOffset()), e = K(e)) {
case "year":
o = zi(this, i) / 12;
break;

case "month":
o = zi(this, i);
break;

case "quarter":
o = zi(this, i) / 3;
break;

case "second":
o = (this - i) / 1e3;
break;

case "minute":
o = (this - i) / 6e4;
break;

case "hour":
o = (this - i) / 36e5;
break;

case "day":
o = (this - i - r) / 864e5;
break;

case "week":
o = (this - i - r) / 6048e5;
break;

default:
o = this - i;
}
return n ? o : D(o);
}
function zi(t, e) {
var n = 12 * (e.year() - t.year()) + (e.month() - t.month()), i = t.clone().add(n, "months");
return -(n + (e - i < 0 ? (e - i) / (i - t.clone().add(n - 1, "months")) : (e - i) / (t.clone().add(n + 1, "months") - i))) || 0;
}
function qi() {
return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function Zi(t) {
if (!this.isValid()) return null;
var e = !0 !== t, n = e ? this.clone().utc() : this;
return n.year() < 0 || n.year() > 9999 ? ct(n, e ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : P(Date.prototype.toISOString) ? e ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", ct(n, "Z")) : ct(n, e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
}
function Bi() {
if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
var t = "moment", e = "";
this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", 
e = "Z");
var n = "[" + t + '("]', i = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", r = "-MM-DD[T]HH:mm:ss.SSS", o = e + '[")]';
return this.format(n + i + r + o);
}
function $i(t) {
t || (t = this.isUtc() ? r.defaultFormatUtc : r.defaultFormat);
var e = ct(this, t);
return this.localeData().postformat(e);
}
function Ji(t, e) {
return this.isValid() && (k(t) && t.isValid() || $n(t).isValid()) ? Ti({
to: this,
from: t
}).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
}
function Ki(t) {
return this.from($n(), t);
}
function Xi(t, e) {
return this.isValid() && (k(t) && t.isValid() || $n(t).isValid()) ? Ti({
from: this,
to: t
}).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
}
function Qi(t) {
return this.to($n(), t);
}
function tr(t) {
var e;
return void 0 === t ? this._locale._abbr : (null != (e = yn(t)) && (this._locale = e), 
this);
}
r.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", r.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
var er = x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", (function(t) {
return void 0 === t ? this.localeData() : this.locale(t);
}));
function nr() {
return this._locale;
}
var ir = 1e3, rr = 60 * ir, or = 60 * rr, sr = 3506328 * or;
function ar(t, e) {
return (t % e + e) % e;
}
function lr(t, e, n) {
return t < 100 && t >= 0 ? new Date(t + 400, e, n) - sr : new Date(t, e, n).valueOf();
}
function ur(t, e, n) {
return t < 100 && t >= 0 ? Date.UTC(t + 400, e, n) - sr : Date.UTC(t, e, n);
}
function cr(t) {
var e;
if (void 0 === (t = K(t)) || "millisecond" === t || !this.isValid()) return this;
var n = this._isUTC ? ur : lr;
switch (t) {
case "year":
e = n(this.year(), 0, 1);
break;

case "quarter":
e = n(this.year(), this.month() - this.month() % 3, 1);
break;

case "month":
e = n(this.year(), this.month(), 1);
break;

case "week":
e = n(this.year(), this.month(), this.date() - this.weekday());
break;

case "isoWeek":
e = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
break;

case "day":
case "date":
e = n(this.year(), this.month(), this.date());
break;

case "hour":
e = this._d.valueOf(), e -= ar(e + (this._isUTC ? 0 : this.utcOffset() * rr), or);
break;

case "minute":
e = this._d.valueOf(), e -= ar(e, rr);
break;

case "second":
e = this._d.valueOf(), e -= ar(e, ir);
}
return this._d.setTime(e), r.updateOffset(this, !0), this;
}
function dr(t) {
var e;
if (void 0 === (t = K(t)) || "millisecond" === t || !this.isValid()) return this;
var n = this._isUTC ? ur : lr;
switch (t) {
case "year":
e = n(this.year() + 1, 0, 1) - 1;
break;

case "quarter":
e = n(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
break;

case "month":
e = n(this.year(), this.month() + 1, 1) - 1;
break;

case "week":
e = n(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
break;

case "isoWeek":
e = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
break;

case "day":
case "date":
e = n(this.year(), this.month(), this.date() + 1) - 1;
break;

case "hour":
e = this._d.valueOf(), e += or - ar(e + (this._isUTC ? 0 : this.utcOffset() * rr), or) - 1;
break;

case "minute":
e = this._d.valueOf(), e += rr - ar(e, rr) - 1;
break;

case "second":
e = this._d.valueOf(), e += ir - ar(e, ir) - 1;
}
return this._d.setTime(e), r.updateOffset(this, !0), this;
}
function hr() {
return this._d.valueOf() - 6e4 * (this._offset || 0);
}
function fr() {
return Math.floor(this.valueOf() / 1e3);
}
function mr() {
return new Date(this.valueOf());
}
function pr() {
var t = this;
return [ t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond() ];
}
function _r() {
var t = this;
return {
years: t.year(),
months: t.month(),
date: t.date(),
hours: t.hours(),
minutes: t.minutes(),
seconds: t.seconds(),
milliseconds: t.milliseconds()
};
}
function gr() {
return this.isValid() ? this.toISOString() : null;
}
function yr() {
return y(this);
}
function vr() {
return m({}, g(this));
}
function wr() {
return g(this).overflow;
}
function br() {
return {
input: this._i,
format: this._f,
locale: this._locale,
isUTC: this._isUTC,
strict: this._strict
};
}
function Sr(t, e) {
at(0, [ t, t.length ], 0, e);
}
function Mr(t) {
return Tr.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
}
function kr(t) {
return Tr.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4);
}
function Dr() {
return De(this.year(), 1, 4);
}
function Er() {
var t = this.localeData()._week;
return De(this.year(), t.dow, t.doy);
}
function Tr(t, e, n, i, r) {
var o;
return null == t ? ke(this, i, r).year : (e > (o = De(t, i, r)) && (e = o), Cr.call(this, t, e, n, i, r));
}
function Cr(t, e, n, i, r) {
var o = Me(t, e, n, i, r), s = be(o.year, 0, o.dayOfYear);
return this.year(s.getUTCFullYear()), this.month(s.getUTCMonth()), this.date(s.getUTCDate()), 
this;
}
function xr(t) {
return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3);
}
at(0, [ "gg", 2 ], 0, (function() {
return this.weekYear() % 100;
})), at(0, [ "GG", 2 ], 0, (function() {
return this.isoWeekYear() % 100;
})), Sr("gggg", "weekYear"), Sr("ggggg", "weekYear"), Sr("GGGG", "isoWeekYear"), 
Sr("GGGGG", "isoWeekYear"), J("weekYear", "gg"), J("isoWeekYear", "GG"), tt("weekYear", 1), 
tt("isoWeekYear", 1), Yt("G", kt), Yt("g", kt), Yt("GG", gt, ft), Yt("gg", gt, ft), 
Yt("GGGG", bt, pt), Yt("gggg", bt, pt), Yt("GGGGG", St, _t), Yt("ggggg", St, _t), 
Ht([ "gggg", "ggggg", "GGGG", "GGGGG" ], (function(t, e, n, i) {
e[i.substr(0, 2)] = E(t);
})), Ht([ "gg", "GG" ], (function(t, e, n, i) {
e[i] = r.parseTwoDigitYear(t);
})), at("Q", 0, "Qo", "quarter"), J("quarter", "Q"), tt("quarter", 7), Yt("Q", ht), 
At("Q", (function(t, e) {
e[Rt] = 3 * (E(t) - 1);
})), at("D", [ "DD", 2 ], "Do", "date"), J("date", "D"), tt("date", 9), Yt("D", gt), 
Yt("DD", gt, ft), Yt("Do", (function(t, e) {
return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient;
})), At([ "D", "DD" ], jt), At("Do", (function(t, e) {
e[jt] = E(t.match(gt)[0]);
}));
var Yr = Xt("Date", !0);
function Or(t) {
var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
return null == t ? e : this.add(t - e, "d");
}
at("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear"), J("dayOfYear", "DDD"), tt("dayOfYear", 4), 
Yt("DDD", wt), Yt("DDDD", mt), At([ "DDD", "DDDD" ], (function(t, e, n) {
n._dayOfYear = E(t);
})), at("m", [ "mm", 2 ], 0, "minute"), J("minute", "m"), tt("minute", 14), Yt("m", gt), 
Yt("mm", gt, ft), At([ "m", "mm" ], It);
var Lr = Xt("Minutes", !1);
at("s", [ "ss", 2 ], 0, "second"), J("second", "s"), tt("second", 15), Yt("s", gt), 
Yt("ss", gt, ft), At([ "s", "ss" ], Gt);
var Pr, Nr = Xt("Seconds", !1);
for (at("S", 0, 0, (function() {
return ~~(this.millisecond() / 100);
})), at(0, [ "SS", 2 ], 0, (function() {
return ~~(this.millisecond() / 10);
})), at(0, [ "SSS", 3 ], 0, "millisecond"), at(0, [ "SSSS", 4 ], 0, (function() {
return 10 * this.millisecond();
})), at(0, [ "SSSSS", 5 ], 0, (function() {
return 100 * this.millisecond();
})), at(0, [ "SSSSSS", 6 ], 0, (function() {
return 1e3 * this.millisecond();
})), at(0, [ "SSSSSSS", 7 ], 0, (function() {
return 1e4 * this.millisecond();
})), at(0, [ "SSSSSSSS", 8 ], 0, (function() {
return 1e5 * this.millisecond();
})), at(0, [ "SSSSSSSSS", 9 ], 0, (function() {
return 1e6 * this.millisecond();
})), J("millisecond", "ms"), tt("millisecond", 16), Yt("S", wt, ht), Yt("SS", wt, ft), 
Yt("SSS", wt, mt), Pr = "SSSS"; Pr.length <= 9; Pr += "S") Yt(Pr, Mt);
function Ar(t, e) {
e[Vt] = E(1e3 * ("0." + t));
}
for (Pr = "S"; Pr.length <= 9; Pr += "S") At(Pr, Ar);
var Hr = Xt("Milliseconds", !1);
function Fr() {
return this._isUTC ? "UTC" : "";
}
function Wr() {
return this._isUTC ? "Coordinated Universal Time" : "";
}
at("z", 0, 0, "zoneAbbr"), at("zz", 0, 0, "zoneName");
var Rr = M.prototype;
function jr(t) {
return $n(1e3 * t);
}
function Ur() {
return $n.apply(null, arguments).parseZone();
}
function Ir(t) {
return t;
}
Rr.add = Pi, Rr.calendar = Hi, Rr.clone = Fi, Rr.diff = Vi, Rr.endOf = dr, Rr.format = $i, 
Rr.from = Ji, Rr.fromNow = Ki, Rr.to = Xi, Rr.toNow = Qi, Rr.get = ee, Rr.invalidAt = wr, 
Rr.isAfter = Wi, Rr.isBefore = Ri, Rr.isBetween = ji, Rr.isSame = Ui, Rr.isSameOrAfter = Ii, 
Rr.isSameOrBefore = Gi, Rr.isValid = yr, Rr.lang = er, Rr.locale = tr, Rr.localeData = nr, 
Rr.max = Kn, Rr.min = Jn, Rr.parsingFlags = vr, Rr.set = ne, Rr.startOf = cr, Rr.subtract = Ni, 
Rr.toArray = pr, Rr.toObject = _r, Rr.toDate = mr, Rr.toISOString = Zi, Rr.inspect = Bi, 
Rr.toJSON = gr, Rr.toString = qi, Rr.unix = fr, Rr.valueOf = hr, Rr.creationData = br, 
Rr.year = Jt, Rr.isLeapYear = Kt, Rr.weekYear = Mr, Rr.isoWeekYear = kr, Rr.quarter = Rr.quarters = xr, 
Rr.month = fe, Rr.daysInMonth = me, Rr.week = Rr.weeks = Ye, Rr.isoWeek = Rr.isoWeeks = Oe, 
Rr.weeksInYear = Er, Rr.isoWeeksInYear = Dr, Rr.date = Yr, Rr.day = Rr.days = Ge, 
Rr.weekday = Ve, Rr.isoWeekday = ze, Rr.dayOfYear = Or, Rr.hour = Rr.hours = ln, 
Rr.minute = Rr.minutes = Lr, Rr.second = Rr.seconds = Nr, Rr.millisecond = Rr.milliseconds = Hr, 
Rr.utcOffset = mi, Rr.utc = _i, Rr.local = gi, Rr.parseZone = yi, Rr.hasAlignedHourOffset = vi, 
Rr.isDST = wi, Rr.isLocal = Si, Rr.isUtcOffset = Mi, Rr.isUtc = ki, Rr.isUTC = ki, 
Rr.zoneAbbr = Fr, Rr.zoneName = Wr, Rr.dates = x("dates accessor is deprecated. Use date instead.", Yr), 
Rr.months = x("months accessor is deprecated. Use month instead", fe), Rr.years = x("years accessor is deprecated. Use year instead", Jt), 
Rr.zone = x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", pi), 
Rr.isDSTShifted = x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", bi);
var Gr = H.prototype;
function Vr(t, e, n, i) {
var r = yn(), o = p().set(i, e);
return r[n](o, t);
}
function zr(t, e, n) {
if (c(t) && (e = t, t = void 0), t = t || "", null != e) return Vr(t, e, n, "month");
var i, r = [];
for (i = 0; i < 12; i++) r[i] = Vr(t, i, n, "month");
return r;
}
function qr(t, e, n, i) {
"boolean" == typeof t ? (c(e) && (n = e, e = void 0), e = e || "") : (n = e = t, 
t = !1, c(e) && (n = e, e = void 0), e = e || "");
var r, o = yn(), s = t ? o._week.dow : 0;
if (null != n) return Vr(e, (n + s) % 7, i, "day");
var a = [];
for (r = 0; r < 7; r++) a[r] = Vr(e, (r + s) % 7, i, "day");
return a;
}
function Zr(t, e) {
return zr(t, e, "months");
}
function Br(t, e) {
return zr(t, e, "monthsShort");
}
function $r(t, e, n) {
return qr(t, e, n, "weekdays");
}
function Jr(t, e, n) {
return qr(t, e, n, "weekdaysShort");
}
function Kr(t, e, n) {
return qr(t, e, n, "weekdaysMin");
}
Gr.calendar = W, Gr.longDateFormat = j, Gr.invalidDate = I, Gr.ordinal = z, Gr.preparse = Ir, 
Gr.postformat = Ir, Gr.relativeTime = Z, Gr.pastFuture = B, Gr.set = N, Gr.months = ae, 
Gr.monthsShort = ue, Gr.monthsParse = de, Gr.monthsRegex = ye, Gr.monthsShortRegex = _e, 
Gr.week = Ee, Gr.firstDayOfYear = xe, Gr.firstDayOfWeek = Ce, Gr.weekdays = He, 
Gr.weekdaysMin = je, Gr.weekdaysShort = We, Gr.weekdaysParse = Ie, Gr.weekdaysRegex = Ze, 
Gr.weekdaysShortRegex = $e, Gr.weekdaysMinRegex = Ke, Gr.isPM = rn, Gr.meridiem = sn, 
pn("en", {
dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
ordinal: function(t) {
var e = t % 10;
return t + (1 === E(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th");
}
}), r.lang = x("moment.lang is deprecated. Use moment.locale instead.", pn), r.langData = x("moment.langData is deprecated. Use moment.localeData instead.", yn);
var Xr = Math.abs;
function Qr() {
var t = this._data;
return this._milliseconds = Xr(this._milliseconds), this._days = Xr(this._days), 
this._months = Xr(this._months), t.milliseconds = Xr(t.milliseconds), t.seconds = Xr(t.seconds), 
t.minutes = Xr(t.minutes), t.hours = Xr(t.hours), t.months = Xr(t.months), t.years = Xr(t.years), 
this;
}
function to(t, e, n, i) {
var r = Ti(e, n);
return t._milliseconds += i * r._milliseconds, t._days += i * r._days, t._months += i * r._months, 
t._bubble();
}
function eo(t, e) {
return to(this, t, e, 1);
}
function no(t, e) {
return to(this, t, e, -1);
}
function io(t) {
return t < 0 ? Math.floor(t) : Math.ceil(t);
}
function ro() {
var t, e, n, i, r, o = this._milliseconds, s = this._days, a = this._months, l = this._data;
return o >= 0 && s >= 0 && a >= 0 || o <= 0 && s <= 0 && a <= 0 || (o += 864e5 * io(so(a) + s), 
s = 0, a = 0), l.milliseconds = o % 1e3, t = D(o / 1e3), l.seconds = t % 60, e = D(t / 60), 
l.minutes = e % 60, n = D(e / 60), l.hours = n % 24, s += D(n / 24), a += r = D(oo(s)), 
s -= io(so(r)), i = D(a / 12), a %= 12, l.days = s, l.months = a, l.years = i, this;
}
function oo(t) {
return 4800 * t / 146097;
}
function so(t) {
return 146097 * t / 4800;
}
function ao(t) {
if (!this.isValid()) return NaN;
var e, n, i = this._milliseconds;
if ("month" === (t = K(t)) || "quarter" === t || "year" === t) switch (e = this._days + i / 864e5, 
n = this._months + oo(e), t) {
case "month":
return n;

case "quarter":
return n / 3;

case "year":
return n / 12;
} else switch (e = this._days + Math.round(so(this._months)), t) {
case "week":
return e / 7 + i / 6048e5;

case "day":
return e + i / 864e5;

case "hour":
return 24 * e + i / 36e5;

case "minute":
return 1440 * e + i / 6e4;

case "second":
return 86400 * e + i / 1e3;

case "millisecond":
return Math.floor(864e5 * e) + i;

default:
throw new Error("Unknown unit " + t);
}
}
function lo() {
return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * E(this._months / 12) : NaN;
}
function uo(t) {
return function() {
return this.as(t);
};
}
var co = uo("ms"), ho = uo("s"), fo = uo("m"), mo = uo("h"), po = uo("d"), _o = uo("w"), go = uo("M"), yo = uo("Q"), vo = uo("y");
function wo() {
return Ti(this);
}
function bo(t) {
return t = K(t), this.isValid() ? this[t + "s"]() : NaN;
}
function So(t) {
return function() {
return this.isValid() ? this._data[t] : NaN;
};
}
var Mo = So("milliseconds"), ko = So("seconds"), Do = So("minutes"), Eo = So("hours"), To = So("days"), Co = So("months"), xo = So("years");
function Yo() {
return D(this.days() / 7);
}
var Oo = Math.round, Lo = {
ss: 44,
s: 45,
m: 45,
h: 22,
d: 26,
M: 11
};
function Po(t, e, n, i, r) {
return r.relativeTime(e || 1, !!n, t, i);
}
function No(t, e, n) {
var i = Ti(t).abs(), r = Oo(i.as("s")), o = Oo(i.as("m")), s = Oo(i.as("h")), a = Oo(i.as("d")), l = Oo(i.as("M")), u = Oo(i.as("y")), c = r <= Lo.ss && [ "s", r ] || r < Lo.s && [ "ss", r ] || o <= 1 && [ "m" ] || o < Lo.m && [ "mm", o ] || s <= 1 && [ "h" ] || s < Lo.h && [ "hh", s ] || a <= 1 && [ "d" ] || a < Lo.d && [ "dd", a ] || l <= 1 && [ "M" ] || l < Lo.M && [ "MM", l ] || u <= 1 && [ "y" ] || [ "yy", u ];
return c[2] = e, c[3] = +t > 0, c[4] = n, Po.apply(null, c);
}
function Ao(t) {
return void 0 === t ? Oo : "function" == typeof t && (Oo = t, !0);
}
function Ho(t, e) {
return void 0 !== Lo[t] && (void 0 === e ? Lo[t] : (Lo[t] = e, "s" === t && (Lo.ss = e - 1), 
!0));
}
function Fo(t) {
if (!this.isValid()) return this.localeData().invalidDate();
var e = this.localeData(), n = No(this, !t, e);
return t && (n = e.pastFuture(+this, n)), e.postformat(n);
}
var Wo = Math.abs;
function Ro(t) {
return (t > 0) - (t < 0) || +t;
}
function jo() {
if (!this.isValid()) return this.localeData().invalidDate();
var t, e, n = Wo(this._milliseconds) / 1e3, i = Wo(this._days), r = Wo(this._months);
t = D(n / 60), e = D(t / 60), n %= 60, t %= 60;
var o = D(r / 12), s = r %= 12, a = i, l = e, u = t, c = n ? n.toFixed(3).replace(/\.?0+$/, "") : "", d = this.asSeconds();
if (!d) return "P0D";
var h = d < 0 ? "-" : "", f = Ro(this._months) !== Ro(d) ? "-" : "", m = Ro(this._days) !== Ro(d) ? "-" : "", p = Ro(this._milliseconds) !== Ro(d) ? "-" : "";
return h + "P" + (o ? f + o + "Y" : "") + (s ? f + s + "M" : "") + (a ? m + a + "D" : "") + (l || u || c ? "T" : "") + (l ? p + l + "H" : "") + (u ? p + u + "M" : "") + (c ? p + c + "S" : "");
}
var Uo = si.prototype;
return Uo.isValid = ri, Uo.abs = Qr, Uo.add = eo, Uo.subtract = no, Uo.as = ao, 
Uo.asMilliseconds = co, Uo.asSeconds = ho, Uo.asMinutes = fo, Uo.asHours = mo, Uo.asDays = po, 
Uo.asWeeks = _o, Uo.asMonths = go, Uo.asQuarters = yo, Uo.asYears = vo, Uo.valueOf = lo, 
Uo._bubble = ro, Uo.clone = wo, Uo.get = bo, Uo.milliseconds = Mo, Uo.seconds = ko, 
Uo.minutes = Do, Uo.hours = Eo, Uo.days = To, Uo.weeks = Yo, Uo.months = Co, Uo.years = xo, 
Uo.humanize = Fo, Uo.toISOString = jo, Uo.toString = jo, Uo.toJSON = jo, Uo.locale = tr, 
Uo.localeData = nr, Uo.toIsoString = x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", jo), 
Uo.lang = er, at("X", 0, 0, "unix"), at("x", 0, 0, "valueOf"), Yt("x", kt), Yt("X", Tt), 
At("X", (function(t, e, n) {
n._d = new Date(1e3 * parseFloat(t, 10));
})), At("x", (function(t, e, n) {
n._d = new Date(E(t));
})), r.version = "2.24.0", o($n), r.fn = Rr, r.min = Qn, r.max = ti, r.now = ei, 
r.utc = p, r.unix = jr, r.months = Zr, r.isDate = d, r.locale = pn, r.invalid = v, 
r.duration = Ti, r.isMoment = k, r.weekdays = $r, r.parseZone = Ur, r.localeData = yn, 
r.isDuration = ai, r.monthsShort = Br, r.weekdaysMin = Kr, r.defineLocale = _n, 
r.updateLocale = gn, r.locales = vn, r.weekdaysShort = Jr, r.normalizeUnits = K, 
r.relativeTimeRounding = Ao, r.relativeTimeThreshold = Ho, r.calendarFormat = Ai, 
r.prototype = Rr, r.HTML5_FMT = {
DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
DATE: "YYYY-MM-DD",
TIME: "HH:mm",
TIME_SECONDS: "HH:mm:ss",
TIME_MS: "HH:mm:ss.SSS",
WEEK: "GGGG-[W]WW",
MONTH: "YYYY-MM"
}, r;
}();
}).call(this, n(85)(t));
}, function(t, e, n) {
!function(t) {
"use strict";
function e(t, e) {
var n = t.split("_");
return e % 10 == 1 && e % 100 != 11 ? n[0] : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? n[1] : n[2];
}
function n(t, n, i) {
return "m" === i ? n ? "минута" : "минуту" : t + " " + e({
ss: n ? "секунда_секунды_секунд" : "секунду_секунды_секунд",
mm: n ? "минута_минуты_минут" : "минуту_минуты_минут",
hh: "час_часа_часов",
dd: "день_дня_дней",
MM: "месяц_месяца_месяцев",
yy: "год_года_лет"
}[i], +t);
}
var i = [ /^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i ];
t.defineLocale("ru", {
months: {
format: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),
standalone: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_")
},
monthsShort: {
format: "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),
standalone: "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_")
},
weekdays: {
standalone: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
format: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"),
isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
},
weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
monthsParse: i,
longMonthsParse: i,
shortMonthsParse: i,
monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
longDateFormat: {
LT: "H:mm",
LTS: "H:mm:ss",
L: "DD.MM.YYYY",
LL: "D MMMM YYYY г.",
LLL: "D MMMM YYYY г., H:mm",
LLLL: "dddd, D MMMM YYYY г., H:mm"
},
calendar: {
sameDay: "[Сегодня, в] LT",
nextDay: "[Завтра, в] LT",
lastDay: "[Вчера, в] LT",
nextWeek: function(t) {
if (t.week() === this.week()) return 2 === this.day() ? "[Во] dddd, [в] LT" : "[В] dddd, [в] LT";
switch (this.day()) {
case 0:
return "[В следующее] dddd, [в] LT";

case 1:
case 2:
case 4:
return "[В следующий] dddd, [в] LT";

case 3:
case 5:
case 6:
return "[В следующую] dddd, [в] LT";
}
},
lastWeek: function(t) {
if (t.week() === this.week()) return 2 === this.day() ? "[Во] dddd, [в] LT" : "[В] dddd, [в] LT";
switch (this.day()) {
case 0:
return "[В прошлое] dddd, [в] LT";

case 1:
case 2:
case 4:
return "[В прошлый] dddd, [в] LT";

case 3:
case 5:
case 6:
return "[В прошлую] dddd, [в] LT";
}
},
sameElse: "L"
},
relativeTime: {
future: "через %s",
past: "%s назад",
s: "несколько секунд",
ss: n,
m: n,
mm: n,
h: "час",
hh: n,
d: "день",
dd: n,
M: "месяц",
MM: n,
y: "год",
yy: n
},
meridiemParse: /ночи|утра|дня|вечера/i,
isPM: function(t) {
return /^(дня|вечера)$/.test(t);
},
meridiem: function(t, e, n) {
return t < 4 ? "ночи" : t < 12 ? "утра" : t < 17 ? "дня" : "вечера";
},
dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
ordinal: function(t, e) {
switch (e) {
case "M":
case "d":
case "DDD":
return t + "-й";

case "D":
return t + "-го";

case "w":
case "W":
return t + "-я";

default:
return t;
}
},
week: {
dow: 1,
doy: 4
}
});
}(n(13));
}, function(t, e) {
let n = new Intl.DateTimeFormat([], {
timeZoneName: "short"
}).formatToParts;
t.exports = function() {
if (n) return new Intl.DateTimeFormat([], {
timeZoneName: "short"
}).formatToParts(new Date).find((t => "timeZoneName" == t.type)).value;
let t = -(new Date).getTimezoneOffset(), e = (new Date).toLocaleTimeString([], {
timeZoneName: "short"
}).split(" ");
return e[0].match(/[+-]/) ? e = e[0] : e[e.length - 1].match(/[+-]/) || e[e.length - 1].match(/[A-Z]{2,}/) ? e = e[e.length - 1] : (e = "GMT", 
t > 0 && (e += "+" + t / 60), t < 0 && (e += "-" + -t / 60)), e;
};
}, function(t, e) {
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
}, function(t, e, n) {
"use strict";
n.r(e), n.d(e, "init", (function() {
return o;
})), n.d(e, "Info", (function() {
return a;
})), n.d(e, "Warning", (function() {
return l;
})), n.d(e, "Success", (function() {
return u;
})), n.d(e, "Error", (function() {
return c;
}));
let i = n(32);
class r {
constructor(t = {}) {
this.notifications = [], this.verticalSpace = t.verticalSpace || 8;
}
register(t) {
this.notifications.unshift(t), setTimeout((() => this.recalculate()), 20);
}
unregister(t) {
let e = this.notifications.indexOf(t);
this.notifications.splice(e, 1), this.recalculate();
}
recalculate() {
let t = this.verticalSpace;
this.notifications.forEach((e => {
e.top = t, t += e.height + this.verticalSpace;
}));
}
}
function o(t) {
window.notificationManager || (window.notificationManager = new r(t));
}
class s {
constructor(t, e, n) {
let i = '<div class="notification notification_popup notification_'.concat(e, '">\n    <div class="notification__content">').concat(t, '</div>\n    <button title="Закрыть" class="notification__close"></button></div>');
switch (document.body.insertAdjacentHTML("beforeEnd", i), this.elem = document.body.lastElementChild, 
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
set top(t) {
this.elem.style.transform = "translateY(" + t + "px)";
}
}
i.delegateMixin(s.prototype);
class a extends s {
constructor(t, e) {
super(t, "info", e);
}
}
class l extends s {
constructor(t, e) {
super(t, "warning", e);
}
}
class u extends s {
constructor(t, e) {
super(t, "success", e);
}
}
class c extends s {
constructor(t, e) {
super(t, "error", e);
}
get TIMEOUT_DEFAULT() {
return 5e3;
}
}
}, function(t, e) {
t.exports = function(t) {
try {
return !!t();
} catch (t) {
return !0;
}
};
}, function(t, e, n) {
var i = n(3), r = n(0).document, o = i(r) && i(r.createElement);
t.exports = function(t) {
return o ? r.createElement(t) : {};
};
}, function(t, e) {
t.exports = function(t, e) {
return {
enumerable: !(1 & t),
configurable: !(2 & t),
writable: !(4 & t),
value: e
};
};
}, function(t, e) {
t.exports = function(t) {
if (null == t) throw TypeError("Can't call method on  " + t);
return t;
};
}, function(t, e, n) {
var i = n(23), r = Math.min;
t.exports = function(t) {
return t > 0 ? r(i(t), 9007199254740991) : 0;
};
}, function(t, e) {
var n = Math.ceil, i = Math.floor;
t.exports = function(t) {
return isNaN(t = +t) ? 0 : (t > 0 ? i : n)(t);
};
}, function(t, e) {
var n = {}.toString;
t.exports = function(t) {
return n.call(t).slice(8, -1);
};
}, function(t, e, n) {
var i = n(61), r = n(21);
t.exports = function(t) {
return i(r(t));
};
}, function(t, e, n) {
var i = n(9)("keys"), r = n(8);
t.exports = function(t) {
return i[t] || (i[t] = r(t));
};
}, function(t, e) {
t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(t, e, n) {
let i = n(29);
t.exports = class {
constructor(t) {
this.elem = t, this.renderPromise = new Promise(((t, e) => {
this.renderPromiseResolve = t, this.renderPromiseReject = e;
})), this.render();
}
async render() {
if (!window.RECAPTCHA_ID) return;
if (void 0 !== this.widgetId) return;
await i();
let t = document.createElement("div");
this.elem.append(t), this.widgetId = grecaptcha.render(t, {
sitekey: window.RECAPTCHA_ID,
size: "invisible",
callback: this.renderPromiseResolve
});
}
async execute() {
if (!window.RECAPTCHA_ID) return "";
await this.render();
let t = grecaptcha.getResponse(this.widgetId);
return t || (grecaptcha.execute(this.widgetId), this.renderPromise);
}
async validateForm(t) {
if (!window.RECAPTCHA_ID) return;
let e = await this.execute(), n = t.elements["g-recaptcha-response"];
n || (n = document.createElement("input"), n.name = "g-recaptcha-response", n.type = "hidden", 
t.append(n)), n.value = e;
}
};
}, function(t, e) {
let n;
t.exports = async function() {
if (window.RECAPTCHA_ID) return n || (n = new Promise(((t, e) => {
window.recaptchaCallback = t;
let n = document.createElement("script");
n.src = "https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit", 
n.onerror = e, document.head.appendChild(n);
})), n);
};
}, function(t, e, n) {
var i = {
"./ru": 14,
"./ru.js": 14
};
function r(t) {
var e = o(t);
return n(e);
}
function o(t) {
var e = i[t];
if (!(e + 1)) {
var n = new Error("Cannot find module '" + t + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return e;
}
r.keys = function() {
return Object.keys(i);
}, r.resolve = o, t.exports = r, r.id = 30;
}, function(t, e) {
function n(t) {
if (t = t || {}, this.elem = t.elem, this.size = t.size || "medium", this.class = t.class ? " " + t.class : "", 
this.elemClass = t.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw new Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
n.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, n.prototype.stop = function() {
let t = this.elem.querySelector(".spinner");
t && (t.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, window.Spinner = n, t.exports = n;
}, function(t, e) {
function n(t, e, n, i, r) {
t.addEventListener(n, (function(t) {
let n = function(t, e) {
let n = t.target;
for (;n; ) {
if (n.matches(e)) return n;
if (n == t.currentTarget) break;
n = n.parentElement;
}
return null;
}(t, e);
t.delegateTarget = n, n && i.call(r || this, t);
}));
}
n.delegateMixin = function(t) {
t.delegate = function(t, e, i) {
n(this.elem, t, e, i, this);
};
}, t.exports = n;
}, function(t, e, n) {
e.Recaptcha = n(28), e.initForms = n(83);
}, , function(t, e, n) {
n(36), e.login = n(66), n(67), e.resizeOnload = n(68), n(73), n(74), n(75), n(76), 
n(78), n(79), n(81), n(82), n(17).init(), n(33).initForms(), n(84), n(87), n(88);
}, function(t, e, n) {
n(37), n(43), "undefined" == typeof globalThis && (window.globalThis = window);
}, function(t, e, n) {
function i(t) {
if (t.length) {
if (1 === t.length) return "string" == typeof t[0] ? document.createTextNode(t[0]) : t[0];
{
let e, n = document.createDocumentFragment(), i = t.length, r = -1;
for (;++r < i; ) e = t[r], n.appendChild("string" == typeof e ? document.createTextNode(e) : e);
return n;
}
}
throw new Error("DOM Exception 8");
}
let r = {
matches: Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector,
replace() {
this.parentNode && this.parentNode.replaceChild(i(arguments), this);
},
prepend() {
this.insertBefore(i(arguments), this.firstChild);
},
append() {
this.appendChild(i(arguments));
},
remove() {
let t = this.parentNode;
if (t) return t.removeChild(this);
},
before: function() {
this.parentNode && this.parentNode.insertBefore(i(arguments), this);
},
after: function() {
this.parentNode && this.parentNode.insertBefore(i(arguments), this.nextSibling);
},
closest: function(t) {
let e = this;
for (;e; ) {
if (e.matches && e.matches(t)) return e;
e = e.parentElement;
}
return null;
}
};
for (let t in r) Element.prototype[t] || (Element.prototype[t] = r[t]);
n(38), n(39), n(40), n(41), n(42);
}, function(t, e) {
try {
new CustomEvent("IE has CustomEvent, but doesn't support constructor");
} catch (t) {
window.CustomEvent = function(t, e) {
let n;
return e = e || {
bubbles: !1,
cancelable: !1,
detail: void 0
}, n = document.createEvent("CustomEvent"), n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), 
n;
}, CustomEvent.prototype = Object.create(window.Event.prototype);
}
}, function(t, e) {
if (!(document.documentElement.dataset || Object.getOwnPropertyDescriptor(Element.prototype, "dataset") && Object.getOwnPropertyDescriptor(Element.prototype, "dataset").get)) {
let t = {
enumerable: !0,
get: function() {
"use strict";
let t, e, n, i, r, o, s = this, a = this.attributes, l = a.length, u = function(t) {
return t.charAt(1).toUpperCase();
}, c = function() {
return this;
}, d = function(t, e) {
return void 0 !== e ? this.setAttribute(t, e) : this.removeAttribute(t);
};
try {
({}).__defineGetter__("test", (function() {})), e = {};
} catch (t) {
e = document.createElement("div");
}
for (t = 0; t < l; t++) if (o = a[t], o && o.name && /^data-\w[\w\-]*$/.test(o.name)) {
n = o.value, i = o.name, r = i.substr(5).replace(/-./g, u);
try {
Object.defineProperty(e, r, {
enumerable: this.enumerable,
get: c.bind(n || ""),
set: d.bind(s, i)
});
} catch (t) {
e[r] = n;
}
}
return e;
}
};
try {
Object.defineProperty(Element.prototype, "dataset", t);
} catch (e) {
t.enumerable = !1, Object.defineProperty(Element.prototype, "dataset", t);
}
}
}, function(t, e) {
void 0 === document.documentElement.hidden && (document.head.insertAdjacentHTML("beforeEnd", "<style> [hidden] { display: none } </style>"), 
Object.defineProperty(Element.prototype, "hidden", {
set: function(t) {
this.setAttribute("hidden", t);
},
get: function() {
return this.getAttribute("hidden");
}
}));
}, function(t, e) {
!function() {
let t = 0;
window.requestAnimationFrame || (window.requestAnimationFrame = function(e, n) {
let i = (new Date).getTime(), r = Math.max(0, 16 - (i - t)), o = window.setTimeout((function() {
e(i + r);
}), r);
return t = i + r, o;
}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
clearTimeout(t);
});
}();
}, function(t, e) {
(function() {
"use strict";
var t = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));
function e(e) {
var n = t.has(e);
return e = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(e), !n && e;
}
function n(t) {
var e = t.isConnected;
if (void 0 !== e) return e;
for (;t && !(t.__CE_isImportDocument || t instanceof Document); ) t = t.parentNode || (window.ShadowRoot && t instanceof ShadowRoot ? t.host : void 0);
return !(!t || !(t.__CE_isImportDocument || t instanceof Document));
}
function i(t, e) {
for (;e && e !== t && !e.nextSibling; ) e = e.parentNode;
return e && e !== t ? e.nextSibling : null;
}
function r(t, e, n) {
n = void 0 === n ? new Set : n;
for (var o = t; o; ) {
if (o.nodeType === Node.ELEMENT_NODE) {
var s = o;
e(s);
var a = s.localName;
if ("link" === a && "import" === s.getAttribute("rel")) {
if ((o = s.import) instanceof Node && !n.has(o)) for (n.add(o), o = o.firstChild; o; o = o.nextSibling) r(o, e, n);
o = i(t, s);
continue;
}
if ("template" === a) {
o = i(t, s);
continue;
}
if (s = s.__CE_shadowRoot) for (s = s.firstChild; s; s = s.nextSibling) r(s, e, n);
}
o = o.firstChild ? o.firstChild : i(t, o);
}
}
function o(t, e, n) {
t[e] = n;
}
function s() {
this.a = new Map, this.g = new Map, this.c = [], this.f = [], this.b = !1;
}
function a(t, e) {
t.b && r(e, (function(e) {
return l(t, e);
}));
}
function l(t, e) {
if (t.b && !e.__CE_patched) {
e.__CE_patched = !0;
for (var n = 0; n < t.c.length; n++) t.c[n](e);
for (n = 0; n < t.f.length; n++) t.f[n](e);
}
}
function u(t, e) {
var n = [];
for (r(e, (function(t) {
return n.push(t);
})), e = 0; e < n.length; e++) {
var i = n[e];
1 === i.__CE_state ? t.connectedCallback(i) : h(t, i);
}
}
function c(t, e) {
var n = [];
for (r(e, (function(t) {
return n.push(t);
})), e = 0; e < n.length; e++) {
var i = n[e];
1 === i.__CE_state && t.disconnectedCallback(i);
}
}
function d(t, e, n) {
var i = (n = void 0 === n ? {} : n).u || new Set, o = n.i || function(e) {
return h(t, e);
}, s = [];
if (r(e, (function(e) {
if ("link" === e.localName && "import" === e.getAttribute("rel")) {
var n = e.import;
n instanceof Node && (n.__CE_isImportDocument = !0, n.__CE_hasRegistry = !0), n && "complete" === n.readyState ? n.__CE_documentLoadHandled = !0 : e.addEventListener("load", (function() {
var n = e.import;
if (!n.__CE_documentLoadHandled) {
n.__CE_documentLoadHandled = !0;
var r = new Set(i);
r.delete(n), d(t, n, {
u: r,
i: o
});
}
}));
} else s.push(e);
}), i), t.b) for (e = 0; e < s.length; e++) l(t, s[e]);
for (e = 0; e < s.length; e++) o(s[e]);
}
function h(t, e) {
if (void 0 === e.__CE_state) {
var i = e.ownerDocument;
if ((i.defaultView || i.__CE_isImportDocument && i.__CE_hasRegistry) && (i = t.a.get(e.localName))) {
i.constructionStack.push(e);
var r = i.constructorFunction;
try {
try {
if (new r !== e) throw Error("The custom element constructor did not produce the element being upgraded.");
} finally {
i.constructionStack.pop();
}
} catch (t) {
throw e.__CE_state = 2, t;
}
if (e.__CE_state = 1, e.__CE_definition = i, i.attributeChangedCallback) for (i = i.observedAttributes, 
r = 0; r < i.length; r++) {
var o = i[r], s = e.getAttribute(o);
null !== s && t.attributeChangedCallback(e, o, null, s, null);
}
n(e) && t.connectedCallback(e);
}
}
}
function f(t) {
var e = document;
this.c = t, this.a = e, this.b = void 0, d(this.c, this.a), "loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), 
this.b.observe(this.a, {
childList: !0,
subtree: !0
}));
}
function m(t) {
t.b && t.b.disconnect();
}
function p() {
var t = this;
this.b = this.a = void 0, this.c = new Promise((function(e) {
t.b = e, t.a && e(t.a);
}));
}
function _(t) {
if (t.a) throw Error("Already resolved.");
t.a = void 0, t.b && t.b(void 0);
}
function g(t) {
this.c = !1, this.a = t, this.j = new Map, this.f = function(t) {
return t();
}, this.b = !1, this.g = [], this.o = new f(t);
}
s.prototype.connectedCallback = function(t) {
var e = t.__CE_definition;
e.connectedCallback && e.connectedCallback.call(t);
}, s.prototype.disconnectedCallback = function(t) {
var e = t.__CE_definition;
e.disconnectedCallback && e.disconnectedCallback.call(t);
}, s.prototype.attributeChangedCallback = function(t, e, n, i, r) {
var o = t.__CE_definition;
o.attributeChangedCallback && -1 < o.observedAttributes.indexOf(e) && o.attributeChangedCallback.call(t, e, n, i, r);
}, f.prototype.f = function(t) {
var e = this.a.readyState;
for ("interactive" !== e && "complete" !== e || m(this), e = 0; e < t.length; e++) for (var n = t[e].addedNodes, i = 0; i < n.length; i++) d(this.c, n[i]);
}, g.prototype.l = function(t, n) {
var i = this;
if (!(n instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
if (!e(t)) throw new SyntaxError("The element name '" + t + "' is not valid.");
if (this.a.a.get(t)) throw Error("A custom element with name '" + t + "' has already been defined.");
if (this.c) throw Error("A custom element is already being defined.");
this.c = !0;
try {
var r = function(t) {
var e = o[t];
if (void 0 !== e && !(e instanceof Function)) throw Error("The '" + t + "' callback must be a function.");
return e;
}, o = n.prototype;
if (!(o instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
var s = r("connectedCallback"), a = r("disconnectedCallback"), l = r("adoptedCallback"), u = r("attributeChangedCallback"), c = n.observedAttributes || [];
} catch (t) {
return;
} finally {
this.c = !1;
}
n = {
localName: t,
constructorFunction: n,
connectedCallback: s,
disconnectedCallback: a,
adoptedCallback: l,
attributeChangedCallback: u,
observedAttributes: c,
constructionStack: []
}, function(t, e, n) {
t.a.set(e, n), t.g.set(n.constructorFunction, n);
}(this.a, t, n), this.g.push(n), this.b || (this.b = !0, this.f((function() {
return function(t) {
if (!1 !== t.b) {
t.b = !1;
for (var e = t.g, n = [], i = new Map, r = 0; r < e.length; r++) i.set(e[r].localName, []);
for (d(t.a, document, {
i: function(e) {
if (void 0 === e.__CE_state) {
var r = e.localName, o = i.get(r);
o ? o.push(e) : t.a.a.get(r) && n.push(e);
}
}
}), r = 0; r < n.length; r++) h(t.a, n[r]);
for (;0 < e.length; ) {
var o = e.shift();
r = o.localName, o = i.get(o.localName);
for (var s = 0; s < o.length; s++) h(t.a, o[s]);
(r = t.j.get(r)) && _(r);
}
}
}(i);
})));
}, g.prototype.i = function(t) {
d(this.a, t);
}, g.prototype.get = function(t) {
if (t = this.a.a.get(t)) return t.constructorFunction;
}, g.prototype.m = function(t) {
if (!e(t)) return Promise.reject(new SyntaxError("'" + t + "' is not a valid custom element name."));
var n = this.j.get(t);
return n || (n = new p, this.j.set(t, n), this.a.a.get(t) && !this.g.some((function(e) {
return e.localName === t;
})) && _(n)), n.c;
}, g.prototype.s = function(t) {
m(this.o);
var e = this.f;
this.f = function(n) {
return t((function() {
return e(n);
}));
};
}, window.CustomElementRegistry = g, g.prototype.define = g.prototype.l, g.prototype.upgrade = g.prototype.i, 
g.prototype.get = g.prototype.get, g.prototype.whenDefined = g.prototype.m, g.prototype.polyfillWrapFlushCallback = g.prototype.s;
var y = window.Document.prototype.createElement, v = window.Document.prototype.createElementNS, w = window.Document.prototype.importNode, b = window.Document.prototype.prepend, S = window.Document.prototype.append, M = window.DocumentFragment.prototype.prepend, k = window.DocumentFragment.prototype.append, D = window.Node.prototype.cloneNode, E = window.Node.prototype.appendChild, T = window.Node.prototype.insertBefore, C = window.Node.prototype.removeChild, x = window.Node.prototype.replaceChild, Y = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"), O = window.Element.prototype.attachShadow, L = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"), P = window.Element.prototype.getAttribute, N = window.Element.prototype.setAttribute, A = window.Element.prototype.removeAttribute, H = window.Element.prototype.getAttributeNS, F = window.Element.prototype.setAttributeNS, W = window.Element.prototype.removeAttributeNS, R = window.Element.prototype.insertAdjacentElement, j = window.Element.prototype.insertAdjacentHTML, U = window.Element.prototype.prepend, I = window.Element.prototype.append, G = window.Element.prototype.before, V = window.Element.prototype.after, z = window.Element.prototype.replaceWith, q = window.Element.prototype.remove, Z = window.HTMLElement, B = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"), $ = window.HTMLElement.prototype.insertAdjacentElement, J = window.HTMLElement.prototype.insertAdjacentHTML, K = new function() {};
function X(t, e, i) {
function r(e) {
return function(i) {
for (var r = [], o = 0; o < arguments.length; ++o) r[o] = arguments[o];
o = [];
for (var s = [], a = 0; a < r.length; a++) {
var l = r[a];
if (l instanceof Element && n(l) && s.push(l), l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) o.push(l); else o.push(l);
}
for (e.apply(this, r), r = 0; r < s.length; r++) c(t, s[r]);
if (n(this)) for (r = 0; r < o.length; r++) (s = o[r]) instanceof Element && u(t, s);
};
}
void 0 !== i.h && (e.prepend = r(i.h)), void 0 !== i.append && (e.append = r(i.append));
}
var Q, tt = window.customElements;
if (!tt || tt.forcePolyfill || "function" != typeof tt.define || "function" != typeof tt.get) {
var et = new s;
Q = et, window.HTMLElement = function() {
function t() {
var t = this.constructor, e = Q.g.get(t);
if (!e) throw Error("The custom element being constructed was not registered with `customElements`.");
var n = e.constructionStack;
if (0 === n.length) return n = y.call(document, e.localName), Object.setPrototypeOf(n, t.prototype), 
n.__CE_state = 1, n.__CE_definition = e, l(Q, n), n;
var i = n[e = n.length - 1];
if (i === K) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
return n[e] = K, Object.setPrototypeOf(i, t.prototype), l(Q, i), i;
}
return t.prototype = Z.prototype, Object.defineProperty(t.prototype, "constructor", {
writable: !0,
configurable: !0,
enumerable: !1,
value: t
}), t;
}(), function() {
var t = et;
o(Document.prototype, "createElement", (function(e) {
if (this.__CE_hasRegistry) {
var n = t.a.get(e);
if (n) return new n.constructorFunction;
}
return e = y.call(this, e), l(t, e), e;
})), o(Document.prototype, "importNode", (function(e, n) {
return e = w.call(this, e, !!n), this.__CE_hasRegistry ? d(t, e) : a(t, e), e;
})), o(Document.prototype, "createElementNS", (function(e, n) {
if (this.__CE_hasRegistry && (null === e || "http://www.w3.org/1999/xhtml" === e)) {
var i = t.a.get(n);
if (i) return new i.constructorFunction;
}
return e = v.call(this, e, n), l(t, e), e;
})), X(t, Document.prototype, {
h: b,
append: S
});
}(), X(et, DocumentFragment.prototype, {
h: M,
append: k
}), function() {
function t(t, i) {
Object.defineProperty(t, "textContent", {
enumerable: i.enumerable,
configurable: !0,
get: i.get,
set: function(t) {
if (this.nodeType === Node.TEXT_NODE) i.set.call(this, t); else {
var r = void 0;
if (this.firstChild) {
var o = this.childNodes, s = o.length;
if (0 < s && n(this)) {
r = Array(s);
for (var a = 0; a < s; a++) r[a] = o[a];
}
}
if (i.set.call(this, t), r) for (t = 0; t < r.length; t++) c(e, r[t]);
}
}
});
}
var e = et;
o(Node.prototype, "insertBefore", (function(t, i) {
if (t instanceof DocumentFragment) {
var r = Array.prototype.slice.apply(t.childNodes);
if (t = T.call(this, t, i), n(this)) for (i = 0; i < r.length; i++) u(e, r[i]);
return t;
}
return r = n(t), i = T.call(this, t, i), r && c(e, t), n(this) && u(e, t), i;
})), o(Node.prototype, "appendChild", (function(t) {
if (t instanceof DocumentFragment) {
var i = Array.prototype.slice.apply(t.childNodes);
if (t = E.call(this, t), n(this)) for (var r = 0; r < i.length; r++) u(e, i[r]);
return t;
}
return i = n(t), r = E.call(this, t), i && c(e, t), n(this) && u(e, t), r;
})), o(Node.prototype, "cloneNode", (function(t) {
return t = D.call(this, !!t), this.ownerDocument.__CE_hasRegistry ? d(e, t) : a(e, t), 
t;
})), o(Node.prototype, "removeChild", (function(t) {
var i = n(t), r = C.call(this, t);
return i && c(e, t), r;
})), o(Node.prototype, "replaceChild", (function(t, i) {
if (t instanceof DocumentFragment) {
var r = Array.prototype.slice.apply(t.childNodes);
if (t = x.call(this, t, i), n(this)) for (c(e, i), i = 0; i < r.length; i++) u(e, r[i]);
return t;
}
r = n(t);
var o = x.call(this, t, i), s = n(this);
return s && c(e, i), r && c(e, t), s && u(e, t), o;
})), Y && Y.get ? t(Node.prototype, Y) : function(t, e) {
t.b = !0, t.c.push(e);
}(e, (function(e) {
t(e, {
enumerable: !0,
configurable: !0,
get: function() {
for (var t = [], e = 0; e < this.childNodes.length; e++) {
var n = this.childNodes[e];
n.nodeType !== Node.COMMENT_NODE && t.push(n.textContent);
}
return t.join("");
},
set: function(t) {
for (;this.firstChild; ) C.call(this, this.firstChild);
null != t && "" !== t && E.call(this, document.createTextNode(t));
}
});
}));
}(), function() {
function t(t, e) {
Object.defineProperty(t, "innerHTML", {
enumerable: e.enumerable,
configurable: !0,
get: e.get,
set: function(t) {
var i = this, o = void 0;
if (n(this) && (o = [], r(this, (function(t) {
t !== i && o.push(t);
}))), e.set.call(this, t), o) for (var l = 0; l < o.length; l++) {
var u = o[l];
1 === u.__CE_state && s.disconnectedCallback(u);
}
return this.ownerDocument.__CE_hasRegistry ? d(s, this) : a(s, this), t;
}
});
}
function e(t, e) {
o(t, "insertAdjacentElement", (function(t, i) {
var r = n(i);
return t = e.call(this, t, i), r && c(s, i), n(t) && u(s, i), t;
}));
}
function i(t, e) {
function n(t, e) {
for (var n = []; t !== e; t = t.nextSibling) n.push(t);
for (e = 0; e < n.length; e++) d(s, n[e]);
}
o(t, "insertAdjacentHTML", (function(t, i) {
if ("beforebegin" === (t = t.toLowerCase())) {
var r = this.previousSibling;
e.call(this, t, i), n(r || this.parentNode.firstChild, this);
} else if ("afterbegin" === t) r = this.firstChild, e.call(this, t, i), n(this.firstChild, r); else if ("beforeend" === t) r = this.lastChild, 
e.call(this, t, i), n(r || this.firstChild, null); else {
if ("afterend" !== t) throw new SyntaxError("The value provided (" + String(t) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
r = this.nextSibling, e.call(this, t, i), n(this.nextSibling, r);
}
}));
}
var s = et;
O && o(Element.prototype, "attachShadow", (function(t) {
t = O.call(this, t);
var e = s;
if (e.b && !t.__CE_patched) {
t.__CE_patched = !0;
for (var n = 0; n < e.c.length; n++) e.c[n](t);
}
return this.__CE_shadowRoot = t;
})), L && L.get ? t(Element.prototype, L) : B && B.get ? t(HTMLElement.prototype, B) : function(t, e) {
t.b = !0, t.f.push(e);
}(s, (function(e) {
t(e, {
enumerable: !0,
configurable: !0,
get: function() {
return D.call(this, !0).innerHTML;
},
set: function(t) {
var e = "template" === this.localName, n = e ? this.content : this, i = v.call(document, this.namespaceURI, this.localName);
for (i.innerHTML = t; 0 < n.childNodes.length; ) C.call(n, n.childNodes[0]);
for (t = e ? i.content : i; 0 < t.childNodes.length; ) E.call(n, t.childNodes[0]);
}
});
})), o(Element.prototype, "setAttribute", (function(t, e) {
if (1 !== this.__CE_state) return N.call(this, t, e);
var n = P.call(this, t);
N.call(this, t, e), e = P.call(this, t), s.attributeChangedCallback(this, t, n, e, null);
})), o(Element.prototype, "setAttributeNS", (function(t, e, n) {
if (1 !== this.__CE_state) return F.call(this, t, e, n);
var i = H.call(this, t, e);
F.call(this, t, e, n), n = H.call(this, t, e), s.attributeChangedCallback(this, e, i, n, t);
})), o(Element.prototype, "removeAttribute", (function(t) {
if (1 !== this.__CE_state) return A.call(this, t);
var e = P.call(this, t);
A.call(this, t), null !== e && s.attributeChangedCallback(this, t, e, null, null);
})), o(Element.prototype, "removeAttributeNS", (function(t, e) {
if (1 !== this.__CE_state) return W.call(this, t, e);
var n = H.call(this, t, e);
W.call(this, t, e);
var i = H.call(this, t, e);
n !== i && s.attributeChangedCallback(this, e, n, i, t);
})), $ ? e(HTMLElement.prototype, $) : R && e(Element.prototype, R), J ? i(HTMLElement.prototype, J) : j && i(Element.prototype, j), 
X(s, Element.prototype, {
h: U,
append: I
}), function(t) {
function e(e) {
return function(i) {
for (var r = [], o = 0; o < arguments.length; ++o) r[o] = arguments[o];
o = [];
for (var s = [], a = 0; a < r.length; a++) {
var l = r[a];
if (l instanceof Element && n(l) && s.push(l), l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) o.push(l); else o.push(l);
}
for (e.apply(this, r), r = 0; r < s.length; r++) c(t, s[r]);
if (n(this)) for (r = 0; r < o.length; r++) (s = o[r]) instanceof Element && u(t, s);
};
}
var i = Element.prototype;
void 0 !== G && (i.before = e(G)), void 0 !== G && (i.after = e(V)), void 0 !== z && o(i, "replaceWith", (function(e) {
for (var i = [], r = 0; r < arguments.length; ++r) i[r] = arguments[r];
r = [];
for (var o = [], s = 0; s < i.length; s++) {
var a = i[s];
if (a instanceof Element && n(a) && o.push(a), a instanceof DocumentFragment) for (a = a.firstChild; a; a = a.nextSibling) r.push(a); else r.push(a);
}
for (s = n(this), z.apply(this, i), i = 0; i < o.length; i++) c(t, o[i]);
if (s) for (c(t, this), i = 0; i < r.length; i++) (o = r[i]) instanceof Element && u(t, o);
})), void 0 !== q && o(i, "remove", (function() {
var e = n(this);
q.call(this), e && c(t, this);
}));
}(s);
}(), document.__CE_hasRegistry = !0;
var nt = new g(et);
Object.defineProperty(window, "customElements", {
configurable: !0,
enumerable: !0,
value: nt
});
}
}).call(self);
}, function(t, e, n) {
n(44), String.prototype.startsWith || (String.prototype.startsWith = function(t) {
let e = arguments.length < 2 ? 0 : arguments[1];
return 0 === this.slice(e).indexOf(t);
}), String.prototype.endsWith || (String.prototype.endsWith = function(t) {
let e = arguments.length < 2 ? this.length : arguments[1], n = this.lastIndexOf(t);
return -1 !== n && n === e - t.length;
}), String.prototype.includes || (String.prototype.includes = function(t, e) {
if ("object" == typeof t && t instanceof RegExp) throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
return -1 !== this.indexOf(t, e);
}), String.prototype.padStart || (String.prototype.padStart = function(t, e) {
return t >>= 0, e = String(void 0 !== e ? e : " "), this.length >= t ? String(this) : ((t -= this.length) > e.length && (e += e.repeat(t / e.length)), 
e.slice(0, t) + String(this));
});
}, function(t, e, n) {
n(45), t.exports = n(1).String.matchAll;
}, function(t, e, n) {
"use strict";
var i = n(46), r = n(21), o = n(22), s = n(54), a = n(55), l = RegExp.prototype, u = function(t, e) {
this._r = t, this._s = e;
};
n(56)(u, "RegExp String", (function() {
var t = this._r.exec(this._s);
return {
value: t,
done: null === t
};
})), i(i.P, "String", {
matchAll: function(t) {
if (r(this), !s(t)) throw TypeError(t + " is not a regexp!");
var e = String(this), n = "flags" in l ? String(t.flags) : a.call(t), i = new RegExp(t.source, ~n.indexOf("g") ? n : "g" + n);
return i.lastIndex = o(t.lastIndex), new u(i, e);
}
});
}, function(t, e, n) {
var i = n(0), r = n(1), o = n(5), s = n(49), a = n(52), l = function(t, e, n) {
var u, c, d, h, f = t & l.F, m = t & l.G, p = t & l.S, _ = t & l.P, g = t & l.B, y = m ? i : p ? i[e] || (i[e] = {}) : (i[e] || {}).prototype, v = m ? r : r[e] || (r[e] = {}), w = v.prototype || (v.prototype = {});
for (u in m && (n = e), n) d = ((c = !f && y && void 0 !== y[u]) ? y : n)[u], h = g && c ? a(d, i) : _ && "function" == typeof d ? a(Function.call, d) : d, 
y && s(y, u, d, t & l.U), v[u] != d && o(v, u, h), _ && w[u] != d && (w[u] = d);
};
i.core = r, l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, 
t.exports = l;
}, function(t, e, n) {
t.exports = !n(4) && !n(18)((function() {
return 7 != Object.defineProperty(n(19)("div"), "a", {
get: function() {
return 7;
}
}).a;
}));
}, function(t, e, n) {
var i = n(3);
t.exports = function(t, e) {
if (!i(t)) return t;
var n, r;
if (e && "function" == typeof (n = t.toString) && !i(r = n.call(t))) return r;
if ("function" == typeof (n = t.valueOf) && !i(r = n.call(t))) return r;
if (!e && "function" == typeof (n = t.toString) && !i(r = n.call(t))) return r;
throw TypeError("Can't convert object to primitive value");
};
}, function(t, e, n) {
var i = n(0), r = n(5), o = n(7), s = n(8)("src"), a = n(50), l = "toString", u = ("" + a).split(l);
n(1).inspectSource = function(t) {
return a.call(t);
}, (t.exports = function(t, e, n, a) {
var l = "function" == typeof n;
l && (o(n, "name") || r(n, "name", e)), t[e] !== n && (l && (o(n, s) || r(n, s, t[e] ? "" + t[e] : u.join(String(e)))), 
t === i ? t[e] = n : a ? t[e] ? t[e] = n : r(t, e, n) : (delete t[e], r(t, e, n)));
})(Function.prototype, l, (function() {
return "function" == typeof this && this[s] || a.call(this);
}));
}, function(t, e, n) {
t.exports = n(9)("native-function-to-string", Function.toString);
}, function(t, e) {
t.exports = !1;
}, function(t, e, n) {
var i = n(53);
t.exports = function(t, e, n) {
if (i(t), void 0 === e) return t;
switch (n) {
case 1:
return function(n) {
return t.call(e, n);
};

case 2:
return function(n, i) {
return t.call(e, n, i);
};

case 3:
return function(n, i, r) {
return t.call(e, n, i, r);
};
}
return function() {
return t.apply(e, arguments);
};
};
}, function(t, e) {
t.exports = function(t) {
if ("function" != typeof t) throw TypeError(t + " is not a function!");
return t;
};
}, function(t, e, n) {
var i = n(3), r = n(24), o = n(10)("match");
t.exports = function(t) {
var e;
return i(t) && (void 0 !== (e = t[o]) ? !!e : "RegExp" == r(t));
};
}, function(t, e, n) {
"use strict";
var i = n(2);
t.exports = function() {
var t = i(this), e = "";
return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), 
t.unicode && (e += "u"), t.sticky && (e += "y"), e;
};
}, function(t, e, n) {
"use strict";
var i = n(57), r = n(20), o = n(65), s = {};
n(5)(s, n(10)("iterator"), (function() {
return this;
})), t.exports = function(t, e, n) {
t.prototype = i(s, {
next: r(1, n)
}), o(t, e + " Iterator");
};
}, function(t, e, n) {
var i = n(2), r = n(58), o = n(27), s = n(26)("IE_PROTO"), a = function() {}, l = function() {
var t, e = n(19)("iframe"), i = o.length;
for (e.style.display = "none", n(64).appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), 
t.write("<script>document.F=Object<\/script>"), t.close(), l = t.F; i--; ) delete l.prototype[o[i]];
return l();
};
t.exports = Object.create || function(t, e) {
var n;
return null !== t ? (a.prototype = i(t), n = new a, a.prototype = null, n[s] = t) : n = l(), 
void 0 === e ? n : r(n, e);
};
}, function(t, e, n) {
var i = n(6), r = n(2), o = n(59);
t.exports = n(4) ? Object.defineProperties : function(t, e) {
r(t);
for (var n, s = o(e), a = s.length, l = 0; a > l; ) i.f(t, n = s[l++], e[n]);
return t;
};
}, function(t, e, n) {
var i = n(60), r = n(27);
t.exports = Object.keys || function(t) {
return i(t, r);
};
}, function(t, e, n) {
var i = n(7), r = n(25), o = n(62)(!1), s = n(26)("IE_PROTO");
t.exports = function(t, e) {
var n, a = r(t), l = 0, u = [];
for (n in a) n != s && i(a, n) && u.push(n);
for (;e.length > l; ) i(a, n = e[l++]) && (~o(u, n) || u.push(n));
return u;
};
}, function(t, e, n) {
var i = n(24);
t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
return "String" == i(t) ? t.split("") : Object(t);
};
}, function(t, e, n) {
var i = n(25), r = n(22), o = n(63);
t.exports = function(t) {
return function(e, n, s) {
var a, l = i(e), u = r(l.length), c = o(s, u);
if (t && n != n) {
for (;u > c; ) if ((a = l[c++]) != a) return !0;
} else for (;u > c; c++) if ((t || c in l) && l[c] === n) return t || c || 0;
return !t && -1;
};
};
}, function(t, e, n) {
var i = n(23), r = Math.max, o = Math.min;
t.exports = function(t, e) {
return (t = i(t)) < 0 ? r(t + e, 0) : o(t, e);
};
}, function(t, e, n) {
var i = n(0).document;
t.exports = i && i.documentElement;
}, function(t, e, n) {
var i = n(6).f, r = n(7), o = n(10)("toStringTag");
t.exports = function(t, e, n) {
t && !r(t = n ? t : t.prototype, o) && i(t, o, {
configurable: !0,
value: e
});
};
}, function(t, e, n) {
let i = n(31);
for (let t of document.querySelectorAll("[data-action-login]")) for (let e of t.classList) e.endsWith("_unready") && t.classList.remove(e);
function r(t) {
let e = new Modal({
hasClose: !1,
mixClass: "login-modal"
}), r = new i;
e.setContent(r.elem), r.start(), Promise.all([ n.e(2), n.e(0) ]).then(function() {
e.remove(), new (n(34))(t);
}.bind(null, n)).catch(n.oe);
}
document.addEventListener("click", (function(t) {
if (!t.target.hasAttribute("data-action-login")) return;
let e = {
email: t.target.getAttribute("data-action-login")
};
t.preventDefault(), r(e);
})), t.exports = r;
}, function(t, e) {
function n() {
let t = document.createElement("form");
t.method = "POST", t.action = "/auth/logout?_csrf=" + document.cookie.match(/XSRF-TOKEN=([\w-]+)/)[1], 
document.body.appendChild(t), t.submit();
}
document.addEventListener("click", (function(t) {
t.target.hasAttribute("data-action-user-logout") && (t.preventDefault(), n());
})), t.exports = n;
}, function(t, e, n) {
let i = n(69), r = n(72), o = [];
e.iframe = function(t) {
i.async(t, (function(e, n) {
n && (t.style.height = n + "px");
}));
}, e.codeTabs = function(t) {
function e() {
let e = t.closest(".code-tabs"), n = (t.closest("[data-code-tabs-content]"), e.querySelector("[data-code-tabs-switches]"));
n.firstElementChild.offsetWidth > n.offsetWidth ? e.classList.add("code-tabs_scroll") : e.classList.remove("code-tabs_scroll");
}
e(), o.push(e);
}, window.addEventListener("resize", r((function() {
o.forEach((t => t()));
}), 200));
}, function(t, e, n) {
let i = n(70);
function r(t, e) {
try {
(t.contentDocument || t.contentWindow.document).body;
} catch (t) {
return;
}
let n = setTimeout((function() {
e(new Error("timeout"));
}), 500);
function r(t, i) {
clearTimeout(n), e(t, i);
}
if (!t.offsetWidth) {
let e = t.cloneNode(!0);
return e.name = "", e.style.height = "50px", e.style.position = "absolute", e.style.display = "block", 
e.style.top = "10000px", e.onload = function() {
let n = i(this.contentDocument);
t.style.display = "block", e.remove(), r(null, n);
}, void document.body.appendChild(e);
}
t.style.display = "block", t.style.height = "1px";
let o = i(t.contentDocument);
t.style.height = "", r(null, o);
}
r.async = function(t, e) {
setTimeout((function() {
r(t, e);
}), 0);
}, t.exports = r;
}, function(t, e, n) {
let i, r = n(71);
t.exports = function(t) {
t = t || document;
let e = Math.max(t.body.scrollHeight, t.documentElement.scrollHeight, t.body.offsetHeight, t.documentElement.offsetHeight, t.body.clientHeight, t.documentElement.clientHeight);
return t.documentElement.scrollWidth > t.documentElement.clientWidth && (i || (i = r()), 
e += i), e;
};
}, function(t, e) {
t.exports = function() {
let t = document.createElement("div");
if (t.style.cssText = "visibility:hidden;height:100px", !document.body) throw new Error("getScrollbarHeight called to early: no document.body");
document.body.appendChild(t);
let e = t.offsetWidth;
t.style.overflow = "scroll";
let n = document.createElement("div");
n.style.width = "100%", t.appendChild(n);
let i = n.offsetWidth;
return t.parentNode.removeChild(t), e - i;
};
}, function(t, e) {
t.exports = function(t, e) {
let n, i, r = !1;
return function o() {
if (r) return n = arguments, void (i = this);
t.apply(this, arguments), r = !0, setTimeout((() => {
r = !1, n && (o.apply(i, n), n = i = null);
}), e);
};
};
}, function(t, e, n) {
const i = n(11).loadDisqus, r = n(11).loadDisqusComments, o = n(11).loadDisqusIfVisible;
let s;
function a() {
false;
}
function l() {
a("onWindowScrollAndResizeThrottled", s), s || (s = window.requestAnimationFrame((function() {
!function() {
let t = ".sitetoolbar", e = document.querySelector(t);
if (!e) return void a("no sitetoolbar");
let n = document.querySelector(".sidebar");
if (n) {
const t = document.querySelector(".page"), i = t.classList.contains("page_profile") && "flex" === getComputedStyle(t).display ? 0 : Math.max(e.getBoundingClientRect().bottom, 0) + "px";
n.style.top = i, function() {
a("compactifySidebar");
let t = document.querySelector(".sidebar");
if (!t.observer) {
(t.observer = new MutationObserver((t => {
for (let e of t) {
if ("childList" !== e.type) return;
l();
}
}))).observe(t, {
childList: !0,
subtree: !0
});
}
let e = t.querySelector(".sidebar__content"), n = t.querySelector(".sidebar__inner"), i = t.classList.contains("sidebar_sticky-footer");
if (t.classList.contains("sidebar_compact")) {
let n;
n = i ? e.lastElementChild.getBoundingClientRect().top - e.lastElementChild.previousElementSibling.getBoundingClientRect().bottom : e.getBoundingClientRect().bottom - e.lastElementChild.getBoundingClientRect().bottom, 
a("decompact?", n), n > 150 && t.classList.remove("sidebar_compact");
} else a(n.scrollHeight, n.clientHeight), n.scrollHeight > n.clientHeight && (a("compact!"), 
t.classList.add("sidebar_compact"));
}();
}
(function() {
let t = document.documentElement.clientWidth <= 840, e = document.querySelector('meta[name="viewport"]').content;
e = e.replace(/user-scalable=\w+/, "user-scalable=" + (t ? "yes" : "no")), document.querySelector('meta[name="viewport"]').content = e;
})(), o();
}(), s = null;
})));
}
function u() {
window.location.hash.match(/#comment-/) && i(), r(), l();
}
window.addEventListener("resize-internal", l), window.addEventListener("scroll", l), 
window.addEventListener("resize", l), "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", u) : u();
}, function(t, e) {
document.addEventListener("click", (function(t) {
if (!t.target.closest) return;
t.target.closest(".sitetoolbar__search-toggle") && (n || function() {
let t, e = document.querySelector(i), o = e.querySelector(".sitetoolbar__search-input input");
e.querySelector(".sitetoolbar__find").onmousedown = function(e) {
t = !0;
}, o.onkeydown = function(t) {
27 == t.keyCode && (this.value = "", r());
}, o.onblur = function(e) {
!t && r();
}, n = !0;
}(), r());
})), document.addEventListener("click", (function(t) {
if (!t.target.closest) return;
let e = t.target.closest("[data-dropdown-toggler]");
if (!e) return;
e.nextElementSibling.style.display = e.nextElementSibling.offsetWidth ? "none" : "block";
})), document.addEventListener("click", (function(t) {
if (!t.target.closest) return;
if (!t.target.closest(".sitetoolbar__nav-toggle")) return;
t.target.classList.toggle("sitetoolbar__nav-toggle_active"), document.querySelector(".sitetoolbar").classList.toggle("sitetoolbar_menu_open");
}));
let n = !1, i = ".sitetoolbar";
function r() {
let t, e = document.querySelector(i);
e.classList.toggle("sitetoolbar_search_open");
let n = e.querySelector(".sitetoolbar__search-input input");
e.classList.contains("sitetoolbar_search_open") ? (n.focus(), t = document.createElement("div"), 
t.className = "search-paranja", t.style.top = e.offsetHeight + "px", document.body.appendChild(t), 
document.body.classList.add("paranja-open")) : (t = document.querySelector(".search-paranja"), 
t.parentNode.removeChild(t), document.body.classList.remove("paranja-open"));
}
}, function(t, e) {
function n() {
let t = document.querySelector(".page-wrapper");
document.querySelector(".page").classList.toggle("page_sidebar_on"), t && t.classList.toggle("page-wrapper_sidebar_on"), 
document.querySelector(".page").classList.contains("page_sidebar_on") ? delete localStorage.noSidebar : localStorage.noSidebar = 1;
}
document.addEventListener("click", (function(t) {
if (!t.target.hasAttribute("data-sidebar-toggle")) return;
n();
})), document.addEventListener("keydown", (function(t) {
if (document.activeElement && ~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName)) return;
if (t.keyCode != "S".charCodeAt(0)) return;
if (~navigator.userAgent.toLowerCase().indexOf("mac os x")) {
if (!t.metaKey || !t.altKey) return;
} else if (!t.altKey) return;
n(), t.preventDefault();
})), function() {
function t() {
let t = document.getElementsByClassName("sidebar__navigation-link_active");
t[0] && t[0].classList.remove("sidebar__navigation-link_active");
let e, n = document.getElementsByTagName("h2");
for (e = 0; e < n.length; e++) {
if (n[e].getBoundingClientRect().top > 1) break;
}
if (e--, e >= 0) {
let t = n[e].firstElementChild && n[e].firstElementChild.getAttribute("href"), i = document.querySelector('.sidebar__navigation-link a[href="' + t + '"]');
t && i && i.classList.add("sidebar__navigation-link_active");
}
}
document.addEventListener("DOMContentLoaded", (function() {
t(), window.addEventListener("scroll", t);
}));
}();
}, function(t, e, n) {
function i() {
let t, e = document.querySelector('link[rel="next"]');
e && (t = document.querySelector('a[href="' + e.getAttribute("href") + '"] .page__nav-text-shortcut'), 
t.innerHTML = 'Ctrl + <span class="page__nav-text-arr">→</span>');
let n = document.querySelector('link[rel="prev"]');
n && (t = document.querySelector('a[href="' + n.getAttribute("href") + '"] .page__nav-text-shortcut'), 
t.innerHTML = 'Ctrl + <span class="page__nav-text-arr">←</span>');
}
n(77)(document, {
onRight: function() {
let t = document.querySelector('link[rel="prev"]');
t && (document.location = t.href);
},
onLeft: function() {
let t = document.querySelector('link[rel="next"]');
t && (document.location = t.href);
}
}), document.addEventListener("keydown", (function(t) {
if (document.activeElement && ~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName)) return;
if (!t.ctrlKey) return;
let e = null;
switch (t.keyCode) {
case 37:
e = "prev";
break;

case 39:
e = "next";
break;

default:
return;
}
let n = document.querySelector('link[rel="' + e + '"]');
n && (document.location = n.href, t.preventDefault());
})), "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", i) : i();
}, function(t, e) {
t.exports = function(t, e) {
let n, i, r, o, s, a = (e = e || {}).onRight || function() {}, l = e.onLeft || function() {}, u = e.tolerance || 50, c = e.threshold || 150, d = e.allowedTime || 500;
t.addEventListener("touchstart", (function(t) {
let e = t.changedTouches[0];
r = 0, n = e.pageX, i = e.pageY, s = Date.now();
})), t.addEventListener("touchend", (function(t) {
let e = t.changedTouches[0];
if (r = e.pageX - n, o = Date.now() - s, Math.abs(e.pageY - i) > u) return;
if (o > d) return;
let h = !1, f = t.target;
for (;f != document.body; ) {
if (f.scrollWidth > f.clientWidth) {
h = !0;
break;
}
f = f.parentElement;
}
h || (r > c && a(t), r < -c && l(t));
}));
};
}, function(t, e) {
let n;
document.addEventListener("mouseover", (function(t) {
if (!t.target.closest) return;
let e = t.target.closest("[data-add-class-on-hover]") || t.target.closest(".button");
e && (n = e, e.classList.add("hover"));
})), document.addEventListener("touchend", (function(t) {
setTimeout((function() {
n && (n.classList.remove("hover"), n = null);
}), 500);
})), document.addEventListener("mouseout", (function(t) {
n && (n.contains(t.relatedTarget) || (n.classList.remove("hover"), n = null));
})), navigator.userAgent.match(/(iPad|iPhone|iPod)/g) || document.documentElement.classList.add("working-hover");
}, function(t, e, n) {
let i = window.location.host, r = n(80);
document.addEventListener("click", (function(t) {
if (1 != t.which) return;
if (t.defaultPrevented) return;
let e = t.target.closest && t.target.closest("a");
if (!e || i == e.host && !e.hasAttribute("data-track-outbound")) return;
if (!~[ "_self", "_top", "_parent" ].indexOf(e.target)) return;
if (t.shiftKey || t.ctrlKey || t.altKey) return;
t.preventDefault();
let n = e.href;
window.ga("send", "event", {
eventCategory: "outbound",
eventAction: "click",
eventLabel: n,
hitCallback: r((function() {
document.location = n;
}))
});
}));
}, function(t, e) {
t.exports = function(t) {
function e() {
e.wasCalled || (e.wasCalled = !0, t());
}
return setTimeout(e, 500), e;
};
}, function(t, e) {
document.addEventListener("click", (t => {
if (t.target.classList.contains("spoiler__button")) {
let e = t.target.closest(".spoiler");
e.classList.toggle("open"), e.classList.toggle("closed");
}
}));
}, function(t, e, n) {
let i = n(17);
document.addEventListener("click", (function(t) {
let e = t.target.closest("[data-banner-close]");
e && (localStorage["hideBanner" + e.dataset.bannerClose] = 1, new i.Success(e.dataset.bannerCloseMessage), 
e.parentNode.remove());
}));
}, function(t, e, n) {
let i = n(29), r = n(28);
t.exports = async function() {
let t = document.querySelectorAll("[data-recaptcha-submit]");
if (t.length) {
for (let e of t) e.disabled = !0;
await i();
for (let e of t) {
let t = e.form, n = new r(t);
t.onsubmit = async e => {
e.preventDefault(), await n.validateForm(t), t.checkValidity() ? t.submit() : t.reportValidity();
}, e.disabled = !1;
}
}
};
}, function(t, e, n) {
let i = n(12), r = n(15);
class o extends HTMLElement {
constructor() {
super(), this.render();
}
connectedCallback() {
this.render();
}
static get observedAttributes() {
return [ "timestamp", "format", "with-zone", "to", "from" ];
}
attributeChangedCallback(t, e, n) {
this.render();
}
format(t, e, n) {
let o = i(t).utcOffset(-(new Date).getTimezoneOffset()).format(e);
return n && (o += " " + r()), o;
}
render() {
let t = [ "timestamp", "from", "to", "format" ].map((t => this.getAttribute(t))).join(":");
if (this.lastParams === t) return;
if (this.lastParams = t, this.hasAttribute("with-zone")) {
let t = r();
this.setAttribute("data-tooltip", "Время в вашем часовом поясе,<br>по данным браузера это " + t);
}
if (this.getAttribute("timestamp")) {
if ("{" === this.getAttribute("timestamp")[0]) return;
return void (this.innerHTML = this.format(this.getAttribute("timestamp"), this.getAttribute("format"), this.hasAttribute("with-zone")));
}
let e = [];
if ("{" === this.getAttribute("from")[0] || "{" === this.getAttribute("to")[0]) return;
let n = new Date(this.getAttribute("from")), i = new Date(this.getAttribute("to")), o = this.getAttribute("format"), s = this.getAttribute("format");
n.getFullYear() === i.getFullYear() && (o = o.replace(/ YY(YY)?$/g, "")), n.getFullYear() === i.getFullYear() && n.getMonth() === i.getMonth() && n.getDate() === i.getDate() || e.push(this.format(n, o)), 
e.push(this.format(i, s, this.hasAttribute("with-zone"))), this.innerHTML = e.join(" – ");
}
}
window.DateLocalElement = o, window.customElements.define("date-local", o);
}, function(t, e) {
t.exports = function(t) {
return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), 
Object.defineProperty(t, "loaded", {
enumerable: !0,
get: function() {
return t.l;
}
}), Object.defineProperty(t, "id", {
enumerable: !0,
get: function() {
return t.i;
}
}), t.webpackPolyfill = 1), t;
};
}, function(t, e, n) {
!function(t) {
"use strict";
t.defineLocale("zh-cn", {
months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
weekdaysMin: "日_一_二_三_四_五_六".split("_"),
longDateFormat: {
LT: "HH:mm",
LTS: "HH:mm:ss",
L: "YYYY/MM/DD",
LL: "YYYY年M月D日",
LLL: "YYYY年M月D日Ah点mm分",
LLLL: "YYYY年M月D日ddddAh点mm分",
l: "YYYY/M/D",
ll: "YYYY年M月D日",
lll: "YYYY年M月D日 HH:mm",
llll: "YYYY年M月D日dddd HH:mm"
},
meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
meridiemHour: function(t, e) {
return 12 === t && (t = 0), "凌晨" === e || "早上" === e || "上午" === e ? t : "下午" === e || "晚上" === e ? t + 12 : t >= 11 ? t : t + 12;
},
meridiem: function(t, e, n) {
var i = 100 * t + e;
return i < 600 ? "凌晨" : i < 900 ? "早上" : i < 1130 ? "上午" : i < 1230 ? "中午" : i < 1800 ? "下午" : "晚上";
},
calendar: {
sameDay: "[今天]LT",
nextDay: "[明天]LT",
nextWeek: "[下]ddddLT",
lastDay: "[昨天]LT",
lastWeek: "[上]ddddLT",
sameElse: "L"
},
dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
ordinal: function(t, e) {
switch (e) {
case "d":
case "D":
case "DDD":
return t + "日";

case "M":
return t + "月";

case "w":
case "W":
return t + "周";

default:
return t;
}
},
relativeTime: {
future: "%s内",
past: "%s前",
s: "几秒",
ss: "%d 秒",
m: "1 分钟",
mm: "%d 分钟",
h: "1 小时",
hh: "%d 小时",
d: "1 天",
dd: "%d 天",
M: "1 个月",
MM: "%d 个月",
y: "1 年",
yy: "%d 年"
},
week: {
dow: 1,
doy: 4
}
});
}(n(13));
}, function(t, e, n) {
let i = n(12), r = n(15);
class o extends HTMLElement {
constructor() {
super(), this.render();
}
connectedCallback() {
this.render();
}
static get observedAttributes() {
return [ "except" ];
}
attributeChangedCallback(t, e, n) {
this.render();
}
format(t, e, n) {
let o = i(t).utcOffset(-(new Date).getTimezoneOffset()).format(e);
return n && (o += " " + r()), o;
}
render() {
let t = [ "except" ].map((t => this.getAttribute(t))).join(":");
if (this.lastParams === t) return;
if (this.lastParams = t, "{" === this.getAttribute("except")[0]) return;
if (!this.getAttribute("except")) return;
let e = this.getAttribute("except").split(",").map((t => new Date(t))), n = [];
for (let t = 0; t < e.length; t++) {
let r = e[t], o = e[t + 1], s = !o || o.getMonth() != r.getMonth(), a = i(r).utcOffset(-(new Date).getTimezoneOffset()).format(s ? "D MMM" : "D");
n.push(a);
}
this.innerHTML = "(кроме ".concat(n.join(", "), ")");
}
}
window.DateExceptElement = o, window.customElements.define("date-except", o);
}, function(t, e, n) {
let i = n(12), r = n(15), o = n(89);
const s = n(16).lang;
class a extends HTMLElement {
constructor() {
super(), this.render();
}
static get observedAttributes() {
return [ "weekdays", "format", "with-zone", "to", "from" ];
}
attributeChangedCallback(t, e, n) {
this.render();
}
connectedCallback() {
this.render();
}
format(t, e, n) {
let o = i(t).utcOffset(-(new Date).getTimezoneOffset()).format(e);
return n && (o += " " + r()), o;
}
render() {
if ("{" === this.getAttribute("weekdays")[0]) return;
let t = [ "weekdays", "with-zone", "from", "to" ].map((t => this.getAttribute(t))).join(":");
if (this.lastParams === t) return;
this.lastParams = t;
let e, n = this.getAttribute("weekdays").split(",").map(Number), i = this.getAttribute("from"), a = this.getAttribute("to");
if ([n, i, a] = o(n, i, a, -(new Date).getTimezoneOffset()), e = "ru" === s ? [ "", "пн", "вт", "ср", "чт", "пт", "сб", "вс" ] : [ "", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ], 
n = n.map((t => e[t])), n = "ru" === s ? n.join("/") : n.join(", "), this.hasAttribute("with-zone")) {
let t = r();
this.setAttribute("data-tooltip", "Время указано в вашем часовом поясе,<br>по данным браузера это " + t);
}
this.innerHTML = n + " " + i + " – " + a;
}
}
window.WeekRangeElement = a, window.customElements.define("week-range", a);
}, function(t, e) {
t.exports = function(t, e, n, i) {
i = +i, e.split && (e = e.split(":").map(Number)), n.split && (n = n.split(":").map(Number)), 
e = 60 * e[0] + e[1] + i, n = 60 * n[0] + n[1] + i, e < 0 ? (e += 1440, n += 1440, 
t = t.map((t => 1 === t ? 7 : t - 1))) : e >= 1440 && (e -= 1440, n -= 1440, t = t.map((t => 7 === t ? 1 : t + 1))), 
n > 1440 && (n -= 1440), n < 0 && (n += 1440);
let r = t => 0 === t ? "00" : t < 10 ? "0" + t : t;
return [ t, e = [ Math.floor(e / 60), e % 60 ].map(r).join(":"), n = [ Math.floor(n / 60), n % 60 ].map(r).join(":") ];
};
} ]);
//# sourceMappingURL=head.f7cb2388724a39880852.js.map