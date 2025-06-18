/**  /components/com_jcomments/js/jcomments-v2.3.js?v=12  */

 function JCommentsEvents(){}
function JCommentsInput(){}
function JCommentsIndicator(){this.init();}
function JCommentsForm(id,editor){this.init(id,editor);}
function JCommentsEditor(textarea,resizable){this.init(textarea,resizable);}
function JComments(oi,og,r){this.init(oi,og,r);}

JCommentsEvents.prototype = {
	add: function(o,e,f){if(o.addEventListener){o.addEventListener(e,f,false);return true;}else if(o.attachEvent){return o.attachEvent("on"+e,f);}else{return false;}},
	remove: function(o,e,f){if(o.removeEventListener){o.removeEventListener(e,f,false);}else if(o.detachEvent){o.detachEvent( "on"+e,o[e+f] );o[e+f]=null;o["e"+e+f]=null;}},
	cancel: function(e){if(e.stopPropagation){e.cancelBubble=true;e.preventDefault();e.stopPropagation();}e.returnValue=false;return false;},
	target: function(e){var t;if(!e)e=window.event;if(e.target)t=e.target;else if(e.srcElement)t=e.srcElement;if(t.nodeType==3)t=t.parentNode;return t;}
};

JCommentsInput.prototype = {
	register: function(el){if(el){var th=this,events=new JCommentsEvents();events.add(el,'focus',function(e){return th.onFocus(e);});events.add(el,'blur',function(e){return th.onBlur(e);});}},
	unregister: function(el){if(el){var th=this,events=new JCommentsEvents();events.remove(el,'focus',function(e){return th.onFocus(e);});events.remove(el,'blur',function(e){return th.onBlur(e);});}},
	onFocus: function(e){var t=JCommentsEvents.prototype.target(e);if(t!=null){t.className=t.className.replace('error','')+' selected';}},
	onBlur: function(e){var t=JCommentsEvents.prototype.target(e);if(t!=null){var c=t.className.replace('error','');c=c.replace('error','');c=c.replace('selected','');t.className=c.replace(/^\s+/g,"");}}
};

JCommentsEditor.prototype = {
	ta: null,
	l10n: {},
	tags: {},
	smiles: {},
	events: null,
	counter: null,
	focused: false,
	resizable: true,

	init: function(textareaID, r) {
		this.ta=JComments.prototype.$(textareaID);
		this.l10n={counterPre:'',counterPost:' symbols left'};
		this.resizable=r;
		this.events=new JCommentsEvents();
		this.defaultHeight=this.ta.clientHeight;
		this.defaultRows=this.ta.rows;
		if(this.resizable){this.addGrippie();}
		this.isWebkit=/webkit/.test(navigator.userAgent.toLowerCase());

		var th = this;
		this.events.add(document,!window.opera&&document.all?'keydown':'keypress',function(e){return th.onKeyPress(e);});
		this.events.add(this.ta,'click',function(e){th.closeSmiles();return th.storeCaret(this.ta);});
		this.events.add(this.ta,'select',function(e){return th.storeCaret(this.ta);});
		this.events.add(this.ta,'change',function(e){th.onChange(); return th.storeCaret(this.ta);});
		this.events.add(this.ta,'keyup',function(e){return th.onChange();});
		this.events.add(this.ta,'focus',function(e){th.closeSmiles(); return th.focused=true;});
		this.events.add(this.ta,'blur',function(e){return th.focused=false;});
	},
	onKeyPress: function(e) {
		if (!this.focused){return;}
		var k=String.fromCharCode(e.keyCode?e.keyCode:e.charCode),t;
		for(var id in this.tags){
			t=this.tags[id];
			if(!t.key||k.toUpperCase()!=t.key.toUpperCase())continue;
			if(t.ctrl&&!e[t.ctrl+"Key"])continue;
			this.insertTag(id);
			return this.events.cancel(e);
		}
		return e.returnValue;
	},
	defined: function(v){return (typeof(v)!="undefined");},
	clear: function(){this.ta.value='';if(this.defaultHeight){this.ta.style.height=this.defaultHeight+'px';}this.updateCounter();},
	focus: function(){this.ta.focus();},
	storeCaret: function(){var ta=this.ta;if(ta.createTextRange)ta.caretPos=document.selection.createRange().duplicate();},
	getElementPos: function(e){var p={left:0,top:0,right:0,bottom:0};while(e!=null){p.left+=e.offsetLeft;p.top+=e.offsetTop;e=e.offsetParent;}p.right+=p.left;p.bottom+=p.top;return p;},
	getSelection: function(){var ta=this.ta,s='';if(document.selection&&document.selection.createRange){s=document.selection.createRange().text;}else{s=ta.value.substr(ta.selectionStart,ta.selectionEnd-ta.selectionStart);}return s;},
	insertText: function(text) {
		var ta=this.ta;
		if(this.defined(ta.caretPos)&&ta.createTextRange){ta.focus();var sel=document.selection.createRange();sel.text=sel.text+text;ta.focus();}
		else if(this.defined(ta.selectionStart)){
			var ss=ta.value.substr(0, ta.selectionStart);
			var se=ta.value.substr(ta.selectionEnd),sp=ta.scrollTop;
			ta.value=ss+text+se;
			if(ta.setSelectionRange){ta.focus();ta.setSelectionRange(ss.length+text.length,ss.length+text.length);}
			ta.scrollTop=sp;
		} else {ta.value+=text;ta.focus(ta.value.length-1);}
	},
	surroundText: function(t1,t2) {
		var ta=this.ta;
		if (this.defined(ta.caretPos) && ta.createTextRange){
			var cp=ta.caretPos,tl=cp.text.length;
			cp.text=cp.text.charAt(cp.text.length-1)==' '?t1+cp.text+t2+' ':t1+cp.text+t2;
			if(tl==0){cp.moveStart("character",-t2.length);cp.moveEnd("character",-t2.length);cp.select();}
			else{ta.focus(cp);}
		}else if(this.defined(ta.selectionStart)){
			var ss=ta.value.substr(0,ta.selectionStart),se=ta.value.substr(ta.selectionEnd);
			var sl=ta.value.substr(ta.selectionStart,ta.selectionEnd-ta.selectionStart);
			var nc=ta.selectionStart,sp=ta.scrollTop;
			ta.value=ss+t1+sl+t2+se;
			if(ta.setSelectionRange){
				if(sl.length==0){ta.setSelectionRange(nc+t1.length,nc+t1.length);}
				else{ta.setSelectionRange(nc,nc+t1.length+sl.length+t2.length);}
				ta.focus();
			}
			ta.scrollTop=sp;
		}else{ta.value+=t1+t2;ta.focus(ta.value.length-1);}
	},
	insertTag: function(id) {var tag=this.tags[id];if(!tag)return;var s=this.getSelection();if(s.length>0){this.surroundText(tag.open,tag.close);}},
	initTags: function(){
		if (this.bbc==null||this.bbc.length==0){
			this.bbc={};
			this.bbc['b']={id:'bbcode-b',open:'[b]',close:'[/b]',key:'B',ctrl:'ctrl',hint:'Bold'};
			this.bbc['i']={id:'bbcode-i',open:'[i]',close:'[/i]',key:'I',ctrl:'ctrl',hint:'Italic'};
			this.bbc['u']={id:'bbcode-u',open:'[u]',close:'[/u]',key:'U',ctrl:'ctrl',hint:'Underline'};
			this.bbc['s']={id:'bbcode-s',open:'[s]',close:'[/s]',key:null,ctrl:null,hint:'Strikeout'};
			this.bbc['img']={id:'bbcode-img',open:'[img]',close:'[/img]',key:null,ctrl:null,hint:'Image'};
			this.bbc['url']={id:'bbcode-url',open:'[url]',close:'[/url]',key:null,ctrl:null,hint:'Link'};
			this.bbc['hide']={id:'bbcode-hide',open:'[hide]',close:'[/hide]',key:null,ctrl:null,hint:'Hidden'};
			this.bbc['quote']={id:'bbcode-quote',open:'[quote]',close:'[/quote]',key:null,ctrl:null,hint:'Quote'};
			this.bbc['list']={id:'bbcode-list',open:'[list][*]',close:'[/list]',key:null,ctrl:null,hint:'List'};
		}
	},

	createButton: function(i,t,c,f,img){
		var e;if(img==null||img==""){e=document.createElement('a');e.style.display='block';e.setAttribute('href','#');}
		else{e=document.createElement('img');if(t){e.setAttribute('alt',t);}e.setAttribute('src',img);if(!c){c='custombbcode';}}
		if(i){e.setAttribute('id',i);}if(t){e.setAttribute('title',t);}if(c){e.className=c;}
		var ee=e;e.onclick=(f!=null?function(){f(ee); return false;}:function(){return false;});
		return e;
	},

	addButton: function(id,h,p,ot,ct,css,img) {
		if(this.ta){
			this.initTags();
			var tag=this.bbc[id],th=this;
			if(!tag){
				if(ot&&ct) {
					this.bbc[id]={id:id,open:ot,close:ct,key:null,ctrl:null,hint:h};
					tag=this.bbc[id];
				} else { return; }
			}
			if(this.bbcPanel==null){
				this.bbcPanel=document.createElement('span');
				this.bbcPanel.className='bbcode';
				this.bbcPanel.style.display='block';
				this.ta.parentNode.insertBefore(this.bbcPanel,this.ta);
			}
			var f=function(){var s=th.getSelection();if(s.length>0){th.surroundText(tag.open,tag.close);}else{var v=prompt(p,'');if(null!=v && ''!=v){th.insertText(tag.open+v+tag.close);}}return false;};
			tag.e=this.createButton(tag.id,(h!=null?h:tag.hint),(css?css:tag.id),f,img);
			this.bbcPanel.appendChild(tag.e);
			this.tags[tag.id]=tag;
		}
	},

	initSmiles: function(p){this.smilesPath=p;
		if(this.ta){
			this.smilesPanel=document.createElement('div');
			if(this.bbcPanel){
				document.body.appendChild(this.smilesPanel);
				this.smilesPanel.id='comments-form-smilespanel';
				this.smilesPanel.setAttribute('style','display:none;top:0;left:0;position:absolute;');
				this.smilesPanel.onclick=function(){this.style.display='none';};
				var jc=this,f=function(e){
					var sp=jc.smilesPanel,p=jc.getElementPos(e);
					if(sp){var sps=sp.style;sps.display=(sps.display=='none'||sps.display==''?'block':'none');sps.left=p.left+"px";sps.top=p.bottom+e.offsetHeight+"px";sps.zIndex=99;}
					return false;
				};
				this.bbcPanel.appendChild(this.createButton(null,null,'bbcode-smile',f));
			} else {
				this.smilesPanel.className='smiles';this.ta.parentNode.insertBefore(this.smilesPanel, this.ta);
			}
		}
	},
	closeSmiles: function(){if(this.smilesPanel&&this.bbcPanel){this.smilesPanel.style.display='none';}},

	addSmile: function(code,image){
		if(this.ta){
			if(!this.smilesPath||!this.smilesPanel){return;}
			var th=this,e=document.createElement('img');
			e.setAttribute('src',this.smilesPath+'/'+image);
			e.setAttribute('alt',code);
			e.className='smile';
			e.onclick=function(){th.insertText(' '+code+' ');};
			this.smilesPanel.appendChild(e);
		}
	},
	addCounter: function(m,pre,post,className){
		if(this.ta){
			if(pre!=null){this.l10n.counterPre=pre;}if(post!=null){this.l10n.counterPost=post;}
			var ch=document.createElement('span');ch.className=className!=null?className:'';
			var t1=document.createTextNode(this.l10n.counterPre+' '),t2=document.createTextNode(' '+this.l10n.counterPost);
			var c=document.createElement('span');ch.appendChild(t1);ch.appendChild(c);ch.appendChild(t2);
			if(this.resizable){if(this.grippie!=null){this.grippie.appendChild(ch);}}
			else{var d=document.createElement('div');d.className='counterpanel';this.ta.parentNode.insertBefore(d,this.ta.nextSibling);d.appendChild(ch);}
			this.counter={e:c,max:m};
			this.updateCounter();
		}
	},
	addGrippie: function() {
		this.offset=null;this.dragging=false;
		this.grippie=document.createElement('div');this.grippie.className='grippie';
		this.ta.parentNode.insertBefore(this.grippie,this.ta.nextSibling);
		var th=this;this.events.add(this.grippie,'mousedown',function(e){return th.onMouseDown(e);});
	},
	updateCounter: function(){if(this.counter!=null){var ta=this.ta,e=this.counter.e;try{var n=document.createElement(e.tagName),v=this.counter.max;if(ta.value.length>0){v=v-ta.value.length;var ln=ta.value.match(/[^\r]\n/g);if(ln){v=v-ln.length;}}n.innerHTML=(v>=0)?v:0;e.parentNode.replaceChild(n,e);this.counter.e=n;}catch(ex){}}},
	mousePosition: function(e){var px=0,py=0;if(!e){e=window.event;}if(e.pageX||e.pageY){px=e.pageX;py=e.pageY;}else if(e.clientX||e.clientY){px=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;py=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;}return {x:px,y:py};},
	onChange: function(){this.updateCounter();if(this.ta&&!this.isWebkit){var l=this.ta.value.split('\n');this.ta.rows=(l.length<this.defaultRows)?this.defaultRows:l.length+1;}return false;},
	onMouseDown: function(e){this.offset=this.mousePosition(e).y;this.height=this.ta.clientHeight;this.dragging=true;var th=this;this.events.add(document,'mousemove',function(e){return th.onMouseMove(e);});this.events.add(document,'mouseup',function(e){return th.onMouseUp(e);});return false;},
	onMouseUp: function(e){this.dragging=false;},
	onMouseMove: function(e){if(this.dragging)this.ta.style.height=Math.max(this.defaultHeight, this.height+this.mousePosition(e).y-this.offset)+'px';return false;}
};

var JCommentsScroll=JCommentsScroll||{
	getElementRect: function(e){var x=0,y=0,w=e.offsetWidth,h=e.offsetHeight;if(e.getBoundingClientRect){var b=e.getBoundingClientRect(),de=document.documentElement,db=document.body;var st=window.pageYOffset||de.scrollTop||db.scrollTop;var sl=window.pageXOffset||de.scrollLeft||db.scrollLeft;var ct=de.clientTop||db.clientTop||0;var cl=de.clientLeft||db.clientLeft||0;x=b.left+sl-cl;y=b.top+st-ct;}else{while(e.offsetParent!==null){x+=e.offsetLeft;y+=e.offsetTop;e=e.offsetParent;}x=Math.round(x);y=Math.round(y);}return [x,y,x+w,y+h];},
	getPageRect: function(){var de=document.documentElement,db=document.body;var x=window.pageXOffset||de.scrollLeft||db.scrollLeft;var y=window.pageYOffset||de.scrollTop||db.scrollTop;var w='innerWidth' in window ? window.innerWidth:(de.clientWidth||db.clientWidth);var h='innerHeight' in window ? window.innerHeight:(de.clientHeight||db.clientHeight);return [x,y,x+w,y+h];},
	scroll: function(element){var a=this.getElementRect(element),b=this.getPageRect();if(!(a[0]<b[2]&&a[2]>b[0]&&a[1]<b[3]&&a[3]>b[1])){window.scrollTo(a[0],a[1]);}}
};

JCommentsForm.prototype = {
	id:null,
	form: null,
	events: null,
	editor: null,
	elements: {},
	store: new Array('name','email','homepage'),
	fadeTimer: null,

	init: function(id,editor){this.id=id;this.form=this.$(id);this.editor=editor;this.events=new JCommentsEvents();this.setElements(new Array('name','email','homepage','title','comment'));this.restoreValues();this.clear('captcha');this.setCaptcha();},
	setCaptcha: function(){this.captchaImage=this.$(this.id+'-captcha-image');this.register('captcha');},
	setEditor: function(e){this.editor=e;},
	setElements: function(e){for(var i=0;i<e.length; i++){try{this.register(e[i]);}catch(e){}}},
	$:function(e){return JComments.prototype.$(e);},
	register: function(n){var f=this,e=this.$(this.id+'-'+n);if(e){this.elements[n]=e;JCommentsInput.prototype.register(e);this.events.add(e,!window.opera&&document.all?'keydown':'keypress',function(e){return f.keypress(e);});}},
	error: function(n){var e=this.elements[n];if(e){e.focus();var c=e.className.replace('/\berror\b/g','')+' error';e.className=c.replace(/\s{2,}/g,' ');}},

	clear: function(n){
		if(n==null){if(this.form!=null){this.form.reset();}return;}
		switch(n){
			case 'comment':if(this.editor!=null){this.editor.clear();}break;
			case 'captcha':var cim=this.captchaImage,cin=this.elements['captcha'];if(cim){var r=new String(Math.floor(Math.random()*100000));if(/\d+$/g.test(cim.src)){cim.src=cim.src.replace(/\d+$/g,r);}else if(/\?/g.test(cim.src)) {cim.src=cim.src+'&r='+r;}else{cim.src=cim.src+'?r='+new String(Math.floor(Math.random()*100000));}}if(cin){cin.value='';}break;
			default:var e=this.elements[n];if(e){e.value='';}break;					
		}
	},
	focus:function(n){var e;if(n==null){for(var nm in this.elements){e=this.elements[nm];if(e){e.focus();break;}}}else{e=this.elements[n];if(e){e.focus();}}},
	keypress: function(e){if(e.ctrlKey &&(e.keyCode==13||(e.type=='keypress'&&e.keyCode==10))){this.submit();e.returnValue=false;return this.events.cancel(e);}return this.keypressed(e);},
	add: function(n,i,v){if(this.form!=null){var e=document.createElement('input');e.setAttribute('type', 'hidden');e.setAttribute('name', n);e.setAttribute('id', i);e.setAttribute('value', v);this.form.appendChild(e);}},
	remove: function(i){var e=this.$(i);if(e){e.value=0;e.parentNode.removeChild(e);}},
	setText: function(n,t){if(n=='comment'){if(this.editor!=null){this.editor.clear();this.editor.insertText(t);}}else{var e=this.elements[n];if(e){e.value=t;}}},
	insertText: function(n,t){if(n=='comment'){if(this.editor!=null){this.editor.insertText(t);}}else{var e=this.elements[n];if(e){e.value+=t;}}},
	storeValues: function(){for(var i=0;i<this.store.length; i++){try{var el=JComments.prototype.$(this.id+'-'+this.store[i]);if(el){JComments.prototype.setCookie(this.store[i],encodeURIComponent(el.value),14);}}catch(e){}}},
	restoreValues: function(){for(var i=0;i<this.store.length; i++){try{var el=JComments.prototype.$(this.id+'-'+this.store[i]);if(el){if(el.type&&el.type=='hidden'){return;}else{el.value=decodeURIComponent(JComments.prototype.getCookie(this.store[i]));}}}catch(e){}}},
	submit: function(){},
	keypressed: function(e){}
};

JCommentsIndicator.prototype = {
	e: null,
	init: function(){if(this.e==null){this.e=document.createElement('div');this.e.className='busy';}},
	move: function(p,b){if(p){if(this.e.parentNode){this.e.parentNode.removeChild(this.e);}if(b){p.insertBefore(this.e,b);}else{p.appendChild(this.e);}}},
	show: function(){this.e.style.display='block';},
	hide: function(){this.e.style.display='none';},
	start: function(p,b){this.move(p,b);this.show();},
	stop: function(){this.hide();}
};

JComments.prototype = {
	oi:null,
	og:null,
	requestURI: '',
	busy: null,
	form: null,
	cache: {},
	mode:'add',
	readyList: [],
	isReady: false,

	init: function(oi,og,r){var ua=navigator.userAgent.toLowerCase();this.browser={safari: /webkit/.test(ua),opera: /opera/.test(ua),msie: /msie/.test(ua) && !(/opera/.test(ua)),mozilla: /mozilla/.test(ua) && !(/(compatible|webkit)/.test(ua))};this.oi=oi;this.og=og;this.busy=new JCommentsIndicator();this.requestURI=r;var th=this;jtajax.startLoading=function(){th.busy.show();};jtajax.finishLoading=function(){th.busy.hide();};},
	reinit: function(oi,og){this.oi=oi;this.og=og;var foi=this.$('object_id');if(foi){foi.value=oi;}var fog=this.$('object_group');if(fog){fog.value=og;}this.showPage(oi,og,0);},
	setForm: function(f){this.form=f;this.form_id=f.id;this.setMode('add',null);var jc=this;this.form.submit=function(){jc.saveComment();};this.form.keypressed=function(e){if(e.keyCode==27&&jc.mode=='reply'){jc.restoreForm(false);}};this.formLoaded();},
	setList: function(l){this.list_id=l;},
	setMode: function(m,i){var b=this.$('comments-form-cancel'),jc=this;if(b!=null){b.style.display=(m!='add')?'':'none';b.onclick=(m=='edit'?function(){jc.cancelEdit(i);}:(m=='reply'?function(){jc.cancelReply();}:null));}this.mode=m;},
	$: function(id){if(!id){return null;}var e=document.getElementById(id);if(!e&&document.all){e=document.all[id];}return e;},
	ajax: function(f,a,fid){var r,prevURI='';try{prevURI=jtajax.options.url;jtajax.setup({url:this.requestURI});r=jtajax.call(f,a,'post',fid);jtajax.options.url=prevURI;}catch(e){jtajax.options.url=prevURI;}return r;},
	initOnReady : function(){if(this.isReadyInited) return;this.isReadyInited=1;var jc=this;
		if(this.browser.mozilla||this.browser.opera){JCommentsEvents.prototype.add(document, 'DOMContentLoaded',jc.ready);}
		else if(this.browser.msie) {(function(){try{document.documentElement.doScroll('left');}catch(e){setTimeout(arguments.callee, 50);return;}jc.ready();})();}
		else if(this.browser.safari){(function(){if(jc.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}jc.ready();})();}
		JCommentsEvents.prototype.add(window, 'load', function(){jc.ready(jc);});
	},
	onReady: function(f){if(this.isReady){f();}else{var jc=this;jc.readyList.push(f);jc.initOnReady();}},
	ready: function(){var jc=window.jcomments;if(jc.isReady||jc.readyList==null) return;jc.isReady=1;for(var i=0,len=jc.readyList.length;i<len;i++){try{jc.readyList[i]();}catch(e){}}jc.readyList=null;},
	setAntiCache: function(c,p,f){this.aca=c;this.acp=p;this.acf=f;this.onReady(this.loadComments);},
	loadComments: function(){var jc=window.jcomments;var l=document.location.href,lc=true,i=l.lastIndexOf('#comment-');jc.clear('captcha');if(jc.aca){if(i!=0){var c=l.substring(i+9,l.length);if(!isNaN(c)){lc=false;jc.showComment(c);}}}if(jc.acp){if(lc){jc.showPage(jc.oi,jc.og,0);}}if(jc.acf){if(l.lastIndexOf('#addcomments')!=-1){jc.showForm(jc.oi,jc.og,'comments-form-link');}}},
	setCookie: function(n,v,d){var e='';if(d){var dt=new Date();dt.setTime(dt.getTime()+(d*24*60*60*1000));e="; expires="+dt.toGMTString();}document.cookie = "jc_"+n+"="+v+e+"; path=/";},
	getCookie: function(n){var re=new RegExp( "(\;|^)[^;]*(" + "jc_"+n + ")\=([^;]*)(;|$)" );var r=re.exec(document.cookie);return r != null ? r[3] : '';},
	removeCookie: function(n){this.setCookie(n,"",-1);},
	scrollTo: function(n){var e=this.$(n);if(e){JCommentsScroll.scroll(e);}},
	scrollToList: function(){this.scrollTo(this.list_id);},
	scrollToForm: function(){this.scrollTo(this.form_id);},
	scrollToComment: function(id){this.scrollTo('comment-'+id);},
	moveElement: function(e,p,b){if(e){if(p){if(e.parentNode){e.parentNode.removeChild(e);}if(b){p.insertBefore(e,b);}else{p.appendChild(e);}}}},
	createElement: function(t,i,c){var e=document.createElement(t);if(i){e.setAttribute('id',i);}if(c){e.className=c;}return e;},
	fade: function(id,s,e,m){var speed=Math.round(m/100),timer=0;if(s>e){for(var i=s;i>=e;i--){setTimeout("JComments.prototype.setOpacity('"+id+"',"+i+")",(timer*speed));timer++;}var o=JComments.prototype.$(id);if(o){setTimeout(function(){o.style.display='none';},((s-e)*speed));}}else if(s<e){for(var i=s;i<=e;i++){setTimeout("JComments.prototype.setOpacity('"+id+"',"+i+")",(timer*speed));timer++;}}},
	setOpacity: function(id,opacity){var e=this.$(id);if(e){var s=e.style;s.opacity=(opacity/100);s.MozOpacity=(opacity/100);s.KhtmlOpacity=(opacity / 100);s.filter="alpha(opacity="+opacity+")";}},
	clear:function(n){if(this.form!=null){this.form.clear(n);}},
	insertText:function(t){if(this.form!=null){this.form.insertText('comment',t);}else{var jc=this;window.setTimeout(function(){jc.insertText(t);},500);}},
	busyList: function(){if(this.list_id){var l=this.$(this.list_id);if(l){this.busy.move(l.parentNode,l);}}},
	busyForm: function(){if(this.form_id){var f=this.$(this.form_id);if(f){this.busy.move(f.parentNode,f);}}},
	busyComment: function(i){this.busy.move(this.$('comment-item-'+i),null);},
	saveComment: function(){var f='';if(this.mode!='edit'){f='JCommentsAddComment';this.busyForm();if(this.form){this.form.storeValues();}this.busy.show();}else{f='JCommentsSaveComment';this.busy.show();}return this.ajax(f,null, this.form_id);},
	editComment: function(i){this.busyComment(i);var a=arguments;if(this.form==null){a=new Array(i,1);}return this.ajax('JCommentsEditComment', a);},
	cancelEdit: function(i){if((!this.cache[i])||(this.cache[i]=='')){this.$('comment-body-'+i).innerHTML=this.cache[i];this.cache[i]='';}if(this.form){this.form.remove('comment-id-hidden-'+i);this.restoreForm(true);}var t=this.$('comment-toolbar-'+i);if(t){t.style.display='';}return this.ajax('JCommentsCancelComment',arguments);},
	cancelReply: function(){if(this.form){this.form.remove('comment-parent-id-hidden');this.restoreForm(false);}},
	quoteComment: function(i){var a=arguments;if(this.form==null){a=new Array(i,1);}return this.ajax('JCommentsQuoteComment',a);},
	publishComment: function(i){if(this.form){this.restoreForm();}this.busyComment(i); return this.ajax('JCommentsPublishComment',arguments);},
	deleteComment: function(i){this.busyComment(i); return this.ajax('JCommentsDeleteComment',arguments);},
	jump2email: function(i){return this.ajax('JCommentsJump2email',arguments);},
	updateList: function(t,m){if(this.list_id){var l=this.$(this.list_id);if(!l){l=this.$('comments');m='a';}switch(m){case 'a':l.innerHTML=l.innerHTML+t;break;case 'p':l.innerHTML=t+l.innerHTML;break;case 'r':l.parentNode.innerHTML=t;break;}}},
	updateTree: function(t,r,m){var l;if(r==null){l=this.$('comments');if(l){l.innerHTML=t;}return;}l=this.$('comments-list-'+r);if(!l){var p=this.$('comment-item-'+r);if(p){this.busyComment(r);l=this.createElement('div','comments-list-'+r,'comments-list');l.innerHTML=t;p.parentNode.insertBefore(l,p.nextSibling);}}else{l.innerHTML=(m=='b'?t+l.innerHTML:l.innerHTML+t);}this.restoreForm(true);},
	updateComment: function(id,t){if(t==''){var c=this.$('comment-item-'+id);c.parentNode.removeChild(c);var l=this.$('comments-list-'+id);if(l){l.parentNode.removeChild(l);} return;}this.$('comment-item-'+id).innerHTML=t;var te=this.$('comment-toolbar-'+id);if(te){te.style.display='';}if(this.form){this.form.remove('comment-id-hidden-'+id);this.restoreForm(true);}},
	voteComment: function(i){var v=this.$('comment-vote-holder-'+i);if(v){v.innerHTML='';this.busy.start(v,null);}return this.ajax('JCommentsVoteComment',arguments);},
	updateVote: function(i,t){this.busy.stop();var c=this.$('comment-vote-holder-'+i);if(c){c.innerHTML=t;}},
	showComment: function(id){return this.ajax('JCommentsShowComment',arguments);},
	showPage: function(i,g,p){if(this.form){this.restoreForm();}var l=this.$(this.list_id);if(!l){l=this.$(this.list_id+'-0');if(l){this.list_id=this.list_id+'-0';}}this.busyList();return this.ajax('JCommentsShowPage',arguments);},
	showForm: function(i,g,t){if(this.form){this.moveElement(this.form.form,this.$(t));return;}this.busyForm(); return this.ajax('JCommentsShowForm',arguments);},
	showEdit: function(id,n,e,h,t,txt){ 
		var jc=this;
		if(this.form==null){window.setTimeout(function(){jc.showEdit(id,n,e,h,t,txt);},500);return;}
		if((!this.cache[id])||(this.cache[id]=='')){this.cache[id]=this.$('comment-body-'+id).innerHTML;}
		this.busy.stop();
		var f=this.form,ff=this.form.form,c=this.$('comment-item-'+id);
		if(ff!=null&&c!=null){
			f.add('id','comment-id-hidden-'+id,id);f.setText('name', n);f.setText('email', e);f.setText('homepage', h);f.setText('title', t);f.setText('comment', txt);
			var d=this.$('comments-inline-edit');
			if(d){d.parentNode.removeChild(d);}else{d=this.createElement('div','comments-inline-edit','comments-inline-edit');}c.appendChild(d);this.moveElement(ff,d);
			this.setMode('edit',id);var te=this.$('comment-toolbar-'+id);if(te){te.style.display='none';}
			this.scrollTo('comments-inline-edit');
			this.form.focus('comment');
		}
	},
	showReply: function(id,q){
		this.busyComment(id);this.cancelReport();
		var jc=this,c=this.$('comment-item-'+id),d=this.$('comments-inline-edit');
		if(d){d.parentNode.removeChild(d);}else{d=this.createElement('div','comments-inline-edit','comments-inline-edit');}c.appendChild(d);
		if(!this.form){
			var t='comments-inline-edit',h=this.$('comments-form-link');if(h){t='comments-form-link';}
			this.showForm(this.oi, this.og,t);var pid=id;this.formLoaded=function(){var f=jc.form;if(f!=null){f.add('parent','comment-parent-id-hidden',pid);}jc.setMode('reply',pid);jc.moveElement(jc.form.form,jc.$('comments-inline-edit'));jc.form.focus();if(q){jc.quoteComment(id);}};
		}else{
			var f=this.form,ff=this.form.form,p=this.$('comment-parent-id-hidden');
			if(ff!=null&&c!=null){if(!p){f.add('parent','comment-parent-id-hidden',id);}else{p.value=id;}this.moveElement(ff,d);this.setMode('reply',id);this.form.focus();if(q){this.quoteComment(id);}}
		}
	},
	formLoaded: function(){},
	restoreForm: function(c){var f=this.form;if(f!=null){var ff=this.form.form;this.busy.stop();
		if(ff!=null){if(c){f.clear(null);}f.restoreValues();var a=this.$('addcomments'),p=this.$('comment-parent-id-hidden');if(p){p.value=0;}
		this.moveElement(ff,a.parentNode,a);var d=this.$('comments-inline-edit');if(d){d.parentNode.removeChild(d);}this.setMode('add',null);}
	}},
	reportComment: function(id){
		this.busyComment(id);this.cancelReply();
		var c=this.$('comment-item-'+id),d=this.$('comments-inline-report');
		if(d){d.parentNode.removeChild(d);}else{d=this.createElement('div','comments-inline-report','comments-inline-report');}c.appendChild(d);
		var a=new Array(id,'comments-inline-report');
		return this.ajax('JCommentsShowReportForm',a);
	},
	saveReport: function(){this.ajax('JCommentsReportComment',null, 'comments-report-form');return true;},
	cancelReport: function() {var d=this.$('comments-inline-report');if(d){d.innerHTML='';}},
	closeReport: function(m){this.cancelReport();if(m){this.showMessage(m,'info','comments-inline-report');}},
	banIP: function(id){this.ajax('JCommentsBanIP',arguments)},
	error:function(m,t,n){if(!t||t==''){t=this.form_id;}this.showMessage(m,'error',t);if(this.form!=null){this.form.error(n);}},
	message:function(m,t){if(!t||t==''){t=this.form_id;}this.showMessage(m,'info',t);},
	showMessage: function(m,c,t){
		clearTimeout(this.fadeTimer);var fe=this.$('comments-form-message');var af=this.$(t);
		if(fe){fe.parentNode.removeChild(fe);}fe=JComments.prototype.createElement('div','comments-form-message','');
		if(af){JComments.prototype.moveElement(fe,af,af.firstChild);}else{alert(m);return;}
		if(!c){c='info';}fe.className='comments-form-message-'+c;
		fe.innerHTML=m;	fe.style.display='block';JComments.prototype.setOpacity(fe.id,100);
		this.fadeTimer=setTimeout(function(){JComments.prototype.fade('comments-form-message', 100, 0, 1000);}, 6000);
		JCommentsScroll.scroll(fe);
	},

	subscribe: function(o,g){return this.ajax('JCommentsSubscribe',arguments);},
	unsubscribe: function(o,g){return this.ajax('JCommentsUnsubscribe',arguments);},
	updateSubscription: function(m,t){var e=this.$('comments-subscription');if(e){var jc=this;e.innerHTML=t;e.onclick=m?function(){jc.unsubscribe(jc.oi,jc.og);return false;}:function(){jc.subscribe(jc.oi,jc.og);return false;};e.blur();}},
	go: function(l){window.open(l);return false;}
}; 

/**  /components/com_jcomments/libraries/joomlatune/ajax.js?v=4  */

 /* based on xajax Javascript library (http://www.xajaxproject.org) */
if (!window.jtajax) {

function jtAJAX()
{
	this.options = {url: '',type: 'post',nocache: true,data: ''};

	this.$ = function(id) {if(!id){return null;}var o=document.getElementById(id);if(!o&&document.all){o=document.all[id];}return o;};
	this.extend = function(o, e){for(var k in (e||{}))o[k]=e[k];return o;};
	this.encode = function(t){return encodeURIComponent(t);};
	this.setup = function(options) {this.options = this.extend(this.options, options);};

	this.xhr = function()
	{
		var xhr = null;
		if ('undefined' != typeof XMLHttpRequest) xhr = new XMLHttpRequest();
		if (!xhr && 'undefined' != typeof ActiveXObject) {
			var msxmlhttp = new Array('Msxml2.XMLHTTP.4.0','Msxml2.XMLHTTP.3.0','Msxml2.XMLHTTP','Microsoft.XMLHTTP');
			for (var i=0;i<msxmlhttp.length;i++){try{xhr=new ActiveXObject(msxmlhttp[i]);}catch(e){xhr=null;}}
		}
		return xhr;
	};
	
	this.form2query = function(sId)
	{
		var frm = this.$(sId);
		if (frm && frm.tagName.toUpperCase() == 'FORM') {
			var e = frm.elements, query = [];
			for (var i=0; i < e.length; i++) {
				var name = e[i].name;
				if (!name) continue;
				if (e[i].type && ('radio' == e[i].type || 'checkbox' == e[i].type) && false === e[i].checked) continue;
				if ('select-multiple' == e[i].type) {
					for (var j = 0; j < e[i].length; j++) {
						if (true === e[i].options[j].selected)
							query.push(name+"="+this.encode(e[i].options[j].value));
					}
				} else { query.push(name+"="+this.encode(e[i].value)); 
				}
			}
			return query.join('&');
		}
		return '';
	};

	this.startLoading = function(){};
	this.finishLoading = function(){};

	this.ajax = function(options)
	{
		var xhr = this.xhr();
		if (!xhr) return false;
		var o = this.extend(this.options, options);
		var url = o.url, jtx = this;url=url.replace(/&amp;/g,'&');
		var r=url;var h=location.hostname,d,i1,i2;i1=r.indexOf('://');if(i1!=-1){i2=r.indexOf('/',i1+3);if(i2!=-1){d=r.substring(i1+3,i2);if(d!=h){if(location.port!=''){h=h+':'+location.port;}r=r.replace(d,h);url=r;}}}
		
		if ('get' == o.type) {
			if (true === o.nocache) {
				var ts=new Date().getTime();
				url += (url.indexOf("?")==-1 ? '?' : '&') + '_jtxr_' + ts;
			}
			if (o.data) {
				url += (url.indexOf("?")==-1 ? '?' : '&') + o.data;
				o.data = null;
			}
		}

		xhr.open(o.type.toUpperCase(), url, true);

		if ('post' == o.type)
			try {xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");}catch(e){}
		if (true === o.nocache)
			xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jan 1970 00:00:00 GMT');

		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			jtx.finishLoading();
			if (xhr.status==200) {
				jtx.processResponse(xhr.responseText);
			}
			delete xhr;
			xhr = null;
		};
		try {
			jtx.startLoading();
			xhr.send(o.data);
		} catch(e) { jtx.finishLoading(); }

		delete jtx;
		delete xhr;
		delete o;
		return true;
	};

	this.call = function(sFunction, aArgs, sType, sForm)
	{
		var params = 'jtxf=' + this.encode(sFunction);
		if (aArgs) {
			for (var i=0;i<aArgs.length;i++) {
				params += '&jtxa[]=' + this.encode(aArgs[i]);
			}
		} else if (sForm) {
			params += '&' + this.form2query(sForm);
		}

		this.ajax({type: sType, data: params});
		return true;
	};

	this.processResponse = function(sText)
	{
		if(sText==='') return false;
		if(sText.substring(0,3)!='[ {'){var idx=sText.indexOf('[ {');sText=sText.substr(idx);}
		var result;try {result=eval(sText);}catch(e){}
		if ('undefined' == typeof result) {return false;}

		var cmd, id, property, data, obj = null;

		for (var i=0;i<result.length;i++) {
			cmd 		= result[i]['n'];
			id 		= result[i]['t'];
			property	= result[i]['p'];
			data 		= result[i]['d'];
			obj 		= this.$(id);

			switch(cmd) {
				case 'as': if(obj){eval("obj."+property+"=data;");} break;
				case 'al': if(data){alert(data);} break;
				case 'js': if(data){eval(data);} break;
				default: this.error('Unknown command: ' + cmd);break;
			}
		}
		
		delete result;
		delete cmd;
		delete id;
		delete property;
		delete data;
		delete obj;
		return true;
	};

	this.error = function(){};
}
var jtajax = new jtAJAX();
}; 

/**  /media/system/js/mootools-core.js  */

 /* MooTools: the javascript framework. license: MIT-style license. copyright: Copyright (c) 2006-2020 [Valerio Proietti](https://mootools.net/).*/ 
/*!
Web Build: https://mootools.net/core/builder/e426a9ae7167c5807b173d5deff673fc
*/
/*
---

name: Core

description: The heart of MooTools.

license: MIT-style license.

copyright: Copyright (c) 2006-2015 [Valerio Proietti](https://github.com/kamicane/).

authors: The MooTools production team (http://mootools.net/developers/)

inspiration:
  - Class implementation inspired by [Base.js](http://dean.edwards.name/weblog/2006/03/base/) Copyright (c) 2006 Dean Edwards, [GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)
  - Some functionality inspired by [Prototype.js](http://prototypejs.org) Copyright (c) 2005-2007 Sam Stephenson, [MIT License](http://opensource.org/licenses/mit-license.php)

provides: [Core, MooTools, Type, typeOf, instanceOf, Native]

...
*/
/*! MooTools: the javascript framework. license: MIT-style license. copyright: Copyright (c) 2006-2015 [Valerio Proietti](https://github.com/kamicane/).*/
(function(){

this.MooTools = {
	version: '1.6.0',
	build: '529422872adfff401b901b8b6c7ca5114ee95e2b'
};

// typeOf, instanceOf

var typeOf = this.typeOf = function(item){
	if (item == null) return 'null';
	if (item.$family != null) return item.$family();

	if (item.nodeName){
		if (item.nodeType == 1) return 'element';
		if (item.nodeType == 3) return (/\S/).test(item.nodeValue) ? 'textnode' : 'whitespace';
	} else if (typeof item.length == 'number'){
		if ('callee' in item) return 'arguments';
		if ('item' in item) return 'collection';
	}

	return typeof item;
};

var instanceOf = this.instanceOf = function(item, object){
	if (item == null) return false;
	var constructor = item.$constructor || item.constructor;
	while (constructor){
		if (constructor === object) return true;
		constructor = constructor.parent;
	}
	/*<ltIE8>*/
	if (!item.hasOwnProperty) return false;
	/*</ltIE8>*/
	return item instanceof object;
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

/*<ltIE8>*/
var enumerables = true;
for (var i in {toString: 1}) enumerables = null;
if (enumerables) enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
function forEachObjectEnumberableKey(object, fn, bind){
	if (enumerables) for (var i = enumerables.length; i--;){
		var k = enumerables[i];
		// signature has key-value, so overloadSetter can directly pass the
		// method function, without swapping arguments.
		if (hasOwnProperty.call(object, k)) fn.call(bind, k, object[k]);
	}
}
/*</ltIE8>*/

// Function overloading

var Function = this.Function;

Function.prototype.overloadSetter = function(usePlural){
	var self = this;
	return function(a, b){
		if (a == null) return this;
		if (usePlural || typeof a != 'string'){
			for (var k in a) self.call(this, k, a[k]);
			/*<ltIE8>*/
			forEachObjectEnumberableKey(a, self, this);
			/*</ltIE8>*/
		} else {
			self.call(this, a, b);
		}
		return this;
	};
};

Function.prototype.overloadGetter = function(usePlural){
	var self = this;
	return function(a){
		var args, result;
		if (typeof a != 'string') args = a;
		else if (arguments.length > 1) args = arguments;
		else if (usePlural) args = [a];
		if (args){
			result = {};
			for (var i = 0; i < args.length; i++) result[args[i]] = self.call(this, args[i]);
		} else {
			result = self.call(this, a);
		}
		return result;
	};
};

Function.prototype.extend = function(key, value){
	this[key] = value;
}.overloadSetter();

Function.prototype.implement = function(key, value){
	this.prototype[key] = value;
}.overloadSetter();

// From

var slice = Array.prototype.slice;

Array.convert = function(item){
	if (item == null) return [];
	return (Type.isEnumerable(item) && typeof item != 'string') ? (typeOf(item) == 'array') ? item : slice.call(item) : [item];
};

Function.convert = function(item){
	return (typeOf(item) == 'function') ? item : function(){
		return item;
	};
};


Number.convert = function(item){
	var number = parseFloat(item);
	return isFinite(number) ? number : null;
};

String.convert = function(item){
	return item + '';
};



Function.from = Function.convert;
Number.from = Number.convert;
String.from = String.convert;

// hide, protect

Function.implement({

	hide: function(){
		this.$hidden = true;
		return this;
	},

	protect: function(){
		this.$protected = true;
		return this;
	}

});

// Type

var Type = this.Type = function(name, object){
	if (name){
		var lower = name.toLowerCase();
		var typeCheck = function(item){
			return (typeOf(item) == lower);
		};

		Type['is' + name] = typeCheck;
		if (object != null){
			object.prototype.$family = (function(){
				return lower;
			}).hide();
			
		}
	}

	if (object == null) return null;

	object.extend(this);
	object.$constructor = Type;
	object.prototype.$constructor = object;

	return object;
};

var toString = Object.prototype.toString;

Type.isEnumerable = function(item){
	return (item != null && typeof item.length == 'number' && toString.call(item) != '[object Function]' );
};

var hooks = {};

var hooksOf = function(object){
	var type = typeOf(object.prototype);
	return hooks[type] || (hooks[type] = []);
};

var implement = function(name, method){
	if (method && method.$hidden) return;

	var hooks = hooksOf(this);

	for (var i = 0; i < hooks.length; i++){
		var hook = hooks[i];
		if (typeOf(hook) == 'type') implement.call(hook, name, method);
		else hook.call(this, name, method);
	}

	var previous = this.prototype[name];
	if (previous == null || !previous.$protected) this.prototype[name] = method;

	if (this[name] == null && typeOf(method) == 'function') extend.call(this, name, function(item){
		return method.apply(item, slice.call(arguments, 1));
	});
};

var extend = function(name, method){
	if (method && method.$hidden) return;
	var previous = this[name];
	if (previous == null || !previous.$protected) this[name] = method;
};

Type.implement({

	implement: implement.overloadSetter(),

	extend: extend.overloadSetter(),

	alias: function(name, existing){
		implement.call(this, name, this.prototype[existing]);
	}.overloadSetter(),

	mirror: function(hook){
		hooksOf(this).push(hook);
		return this;
	}

});

new Type('Type', Type);

// Default Types

var force = function(name, object, methods){
	var isType = (object != Object),
		prototype = object.prototype;

	if (isType) object = new Type(name, object);

	for (var i = 0, l = methods.length; i < l; i++){
		var key = methods[i],
			generic = object[key],
			proto = prototype[key];

		if (generic) generic.protect();
		if (isType && proto) object.implement(key, proto.protect());
	}

	if (isType){
		var methodsEnumerable = prototype.propertyIsEnumerable(methods[0]);
		object.forEachMethod = function(fn){
			if (!methodsEnumerable) for (var i = 0, l = methods.length; i < l; i++){
				fn.call(prototype, prototype[methods[i]], methods[i]);
			}
			for (var key in prototype) fn.call(prototype, prototype[key], key);
		};
	}

	return force;
};

force('String', String, [
	'charAt', 'charCodeAt', 'concat', 'contains', 'indexOf', 'lastIndexOf', 'match', 'quote', 'replace', 'search',
	'slice', 'split', 'substr', 'substring', 'trim', 'toLowerCase', 'toUpperCase'
])('Array', Array, [
	'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice',
	'indexOf', 'lastIndexOf', 'filter', 'forEach', 'every', 'map', 'some', 'reduce', 'reduceRight', 'contains'
])('Number', Number, [
	'toExponential', 'toFixed', 'toLocaleString', 'toPrecision'
])('Function', Function, [
	'apply', 'call', 'bind'
])('RegExp', RegExp, [
	'exec', 'test'
])('Object', Object, [
	'create', 'defineProperty', 'defineProperties', 'keys',
	'getPrototypeOf', 'getOwnPropertyDescriptor', 'getOwnPropertyNames',
	'preventExtensions', 'isExtensible', 'seal', 'isSealed', 'freeze', 'isFrozen'
])('Date', Date, ['now']);

Object.extend = extend.overloadSetter();

Date.extend('now', function(){
	return +(new Date);
});

new Type('Boolean', Boolean);

// fixes NaN returning as Number

Number.prototype.$family = function(){
	return isFinite(this) ? 'number' : 'null';
}.hide();

// Number.random

Number.extend('random', function(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
});

// forEach, each, keys

Array.implement({

	/*<!ES5>*/
	forEach: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if (i in this) fn.call(bind, this[i], i, this);
		}
	},
	/*</!ES5>*/

	each: function(fn, bind){
		Array.forEach(this, fn, bind);
		return this;
	}

});

Object.extend({

	keys: function(object){
		var keys = [];
		for (var k in object){
			if (hasOwnProperty.call(object, k)) keys.push(k);
		}
		/*<ltIE8>*/
		forEachObjectEnumberableKey(object, function(k){
			keys.push(k);
		});
		/*</ltIE8>*/
		return keys;
	},

	forEach: function(object, fn, bind){
		Object.keys(object).forEach(function(key){
			fn.call(bind, object[key], key, object);
		});
	}

});

Object.each = Object.forEach;


// Array & Object cloning, Object merging and appending

var cloneOf = function(item){
	switch (typeOf(item)){
		case 'array': return item.clone();
		case 'object': return Object.clone(item);
		default: return item;
	}
};

Array.implement('clone', function(){
	var i = this.length, clone = new Array(i);
	while (i--) clone[i] = cloneOf(this[i]);
	return clone;
});

var mergeOne = function(source, key, current){
	switch (typeOf(current)){
		case 'object':
			if (typeOf(source[key]) == 'object') Object.merge(source[key], current);
			else source[key] = Object.clone(current);
			break;
		case 'array': source[key] = current.clone(); break;
		default: source[key] = current;
	}
	return source;
};

Object.extend({

	merge: function(source, k, v){
		if (typeOf(k) == 'string') return mergeOne(source, k, v);
		for (var i = 1, l = arguments.length; i < l; i++){
			var object = arguments[i];
			for (var key in object) mergeOne(source, key, object[key]);
		}
		return source;
	},

	clone: function(object){
		var clone = {};
		for (var key in object) clone[key] = cloneOf(object[key]);
		return clone;
	},

	append: function(original){
		for (var i = 1, l = arguments.length; i < l; i++){
			var extended = arguments[i] || {};
			for (var key in extended) original[key] = extended[key];
		}
		return original;
	}

});

// Object-less types

['Object', 'WhiteSpace', 'TextNode', 'Collection', 'Arguments'].each(function(name){
	new Type(name);
});

// Unique ID

var UID = Date.now();

String.extend('uniqueID', function(){
	return (UID++).toString(36);
});



})();

/*
---

name: Array

description: Contains Array Prototypes like each, contains, and erase.

license: MIT-style license.

requires: [Type]

provides: Array

...
*/

Array.implement({

	/*<!ES5>*/
	every: function(fn, bind){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && !fn.call(bind, this[i], i, this)) return false;
		}
		return true;
	},

	filter: function(fn, bind){
		var results = [];
		for (var value, i = 0, l = this.length >>> 0; i < l; i++) if (i in this){
			value = this[i];
			if (fn.call(bind, value, i, this)) results.push(value);
		}
		return results;
	},

	indexOf: function(item, from){
		var length = this.length >>> 0;
		for (var i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++){
			if (this[i] === item) return i;
		}
		return -1;
	},

	map: function(fn, bind){
		var length = this.length >>> 0, results = Array(length);
		for (var i = 0; i < length; i++){
			if (i in this) results[i] = fn.call(bind, this[i], i, this);
		}
		return results;
	},

	some: function(fn, bind){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && fn.call(bind, this[i], i, this)) return true;
		}
		return false;
	},
	/*</!ES5>*/

	clean: function(){
		return this.filter(function(item){
			return item != null;
		});
	},

	invoke: function(methodName){
		var args = Array.slice(arguments, 1);
		return this.map(function(item){
			return item[methodName].apply(item, args);
		});
	},

	associate: function(keys){
		var obj = {}, length = Math.min(this.length, keys.length);
		for (var i = 0; i < length; i++) obj[keys[i]] = this[i];
		return obj;
	},

	link: function(object){
		var result = {};
		for (var i = 0, l = this.length; i < l; i++){
			for (var key in object){
				if (object[key](this[i])){
					result[key] = this[i];
					delete object[key];
					break;
				}
			}
		}
		return result;
	},

	contains: function(item, from){
		return this.indexOf(item, from) != -1;
	},

	append: function(array){
		this.push.apply(this, array);
		return this;
	},

	getLast: function(){
		return (this.length) ? this[this.length - 1] : null;
	},

	getRandom: function(){
		return (this.length) ? this[Number.random(0, this.length - 1)] : null;
	},

	include: function(item){
		if (!this.contains(item)) this.push(item);
		return this;
	},

	combine: function(array){
		for (var i = 0, l = array.length; i < l; i++) this.include(array[i]);
		return this;
	},

	erase: function(item){
		for (var i = this.length; i--;){
			if (this[i] === item) this.splice(i, 1);
		}
		return this;
	},

	empty: function(){
		this.length = 0;
		return this;
	},

	flatten: function(){
		var array = [];
		for (var i = 0, l = this.length; i < l; i++){
			var type = typeOf(this[i]);
			if (type == 'null') continue;
			array = array.concat((type == 'array' || type == 'collection' || type == 'arguments' || instanceOf(this[i], Array)) ? Array.flatten(this[i]) : this[i]);
		}
		return array;
	},

	pick: function(){
		for (var i = 0, l = this.length; i < l; i++){
			if (this[i] != null) return this[i];
		}
		return null;
	},

	hexToRgb: function(array){
		if (this.length != 3) return null;
		var rgb = this.map(function(value){
			if (value.length == 1) value += value;
			return parseInt(value, 16);
		});
		return (array) ? rgb : 'rgb(' + rgb + ')';
	},

	rgbToHex: function(array){
		if (this.length < 3) return null;
		if (this.length == 4 && this[3] == 0 && !array) return 'transparent';
		var hex = [];
		for (var i = 0; i < 3; i++){
			var bit = (this[i] - 0).toString(16);
			hex.push((bit.length == 1) ? '0' + bit : bit);
		}
		return (array) ? hex : '#' + hex.join('');
	}

});



/*
---

name: Function

description: Contains Function Prototypes like create, bind, pass, and delay.

license: MIT-style license.

requires: Type

provides: Function

...
*/

Function.extend({

	attempt: function(){
		for (var i = 0, l = arguments.length; i < l; i++){
			try {
				return arguments[i]();
			} catch (e){}
		}
		return null;
	}

});

Function.implement({

	attempt: function(args, bind){
		try {
			return this.apply(bind, Array.convert(args));
		} catch (e){}

		return null;
	},

	/*<!ES5-bind>*/
	bind: function(that){
		var self = this,
			args = arguments.length > 1 ? Array.slice(arguments, 1) : null,
			F = function(){};

		var bound = function(){
			var context = that, length = arguments.length;
			if (this instanceof bound){
				F.prototype = self.prototype;
				context = new F;
			}
			var result = (!args && !length)
				? self.call(context)
				: self.apply(context, args && length ? args.concat(Array.slice(arguments)) : args || arguments);
			return context == that ? result : context;
		};
		return bound;
	},
	/*</!ES5-bind>*/

	pass: function(args, bind){
		var self = this;
		if (args != null) args = Array.convert(args);
		return function(){
			return self.apply(bind, args || arguments);
		};
	},

	delay: function(delay, bind, args){
		return setTimeout(this.pass((args == null ? [] : args), bind), delay);
	},

	periodical: function(periodical, bind, args){
		return setInterval(this.pass((args == null ? [] : args), bind), periodical);
	}

});



/*
---

name: Number

description: Contains Number Prototypes like limit, round, times, and ceil.

license: MIT-style license.

requires: Type

provides: Number

...
*/

Number.implement({

	limit: function(min, max){
		return Math.min(max, Math.max(min, this));
	},

	round: function(precision){
		precision = Math.pow(10, precision || 0).toFixed(precision < 0 ? -precision : 0);
		return Math.round(this * precision) / precision;
	},

	times: function(fn, bind){
		for (var i = 0; i < this; i++) fn.call(bind, i, this);
	},

	toFloat: function(){
		return parseFloat(this);
	},

	toInt: function(base){
		return parseInt(this, base || 10);
	}

});

Number.alias('each', 'times');

(function(math){

var methods = {};

math.each(function(name){
	if (!Number[name]) methods[name] = function(){
		return Math[name].apply(null, [this].concat(Array.convert(arguments)));
	};
});

Number.implement(methods);

})(['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max', 'min', 'pow', 'sin', 'sqrt', 'tan']);

/*
---

name: String

description: Contains String Prototypes like camelCase, capitalize, test, and toInt.

license: MIT-style license.

requires: [Type, Array]

provides: String

...
*/

String.implement({

	//<!ES6>
	contains: function(string, index){
		return (index ? String(this).slice(index) : String(this)).indexOf(string) > -1;
	},
	//</!ES6>

	test: function(regex, params){
		return ((typeOf(regex) == 'regexp') ? regex : new RegExp('' + regex, params)).test(this);
	},

	trim: function(){
		return String(this).replace(/^\s+|\s+$/g, '');
	},

	clean: function(){
		return String(this).replace(/\s+/g, ' ').trim();
	},

	camelCase: function(){
		return String(this).replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase();
		});
	},

	hyphenate: function(){
		return String(this).replace(/[A-Z]/g, function(match){
			return ('-' + match.charAt(0).toLowerCase());
		});
	},

	capitalize: function(){
		return String(this).replace(/\b[a-z]/g, function(match){
			return match.toUpperCase();
		});
	},

	escapeRegExp: function(){
		return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
	},

	toInt: function(base){
		return parseInt(this, base || 10);
	},

	toFloat: function(){
		return parseFloat(this);
	},

	hexToRgb: function(array){
		var hex = String(this).match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
		return (hex) ? hex.slice(1).hexToRgb(array) : null;
	},

	rgbToHex: function(array){
		var rgb = String(this).match(/\d{1,3}/g);
		return (rgb) ? rgb.rgbToHex(array) : null;
	},

	substitute: function(object, regexp){
		return String(this).replace(regexp || (/\\?\{([^{}]+)\}/g), function(match, name){
			if (match.charAt(0) == '\\') return match.slice(1);
			return (object[name] != null) ? object[name] : '';
		});
	}

});



/*
---

name: Browser

description: The Browser Object. Contains Browser initialization, Window and Document, and the Browser Hash.

license: MIT-style license.

requires: [Array, Function, Number, String]

provides: [Browser, Window, Document]

...
*/

(function(){

var document = this.document;
var window = document.window = this;

var parse = function(ua, platform){
	ua = ua.toLowerCase();
	platform = (platform ? platform.toLowerCase() : '');

	// chrome is included in the edge UA, so need to check for edge first,
	// before checking if it's chrome.
	var UA = ua.match(/(edge)[\s\/:]([\w\d\.]+)/);
	if (!UA){
		UA = ua.match(/(opera|ie|firefox|chrome|trident|crios|version)[\s\/:]([\w\d\.]+)?.*?(safari|(?:rv[\s\/:]|version[\s\/:])([\w\d\.]+)|$)/) || [null, 'unknown', 0];
	}

	if (UA[1] == 'trident'){
		UA[1] = 'ie';
		if (UA[4]) UA[2] = UA[4];
	} else if (UA[1] == 'crios'){
		UA[1] = 'chrome';
	}

	platform = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || ua.match(/mac|win|linux/) || ['other'])[0];
	if (platform == 'win') platform = 'windows';

	return {
		extend: Function.prototype.extend,
		name: (UA[1] == 'version') ? UA[3] : UA[1],
		version: parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]),
		platform: platform
	};
};

var Browser = this.Browser = parse(navigator.userAgent, navigator.platform);

if (Browser.name == 'ie' && document.documentMode){
	Browser.version = document.documentMode;
}

Browser.extend({
	Features: {
		xpath: !!(document.evaluate),
		air: !!(window.runtime),
		query: !!(document.querySelector),
		json: !!(window.JSON)
	},
	parseUA: parse
});



// Request

Browser.Request = (function(){

	var XMLHTTP = function(){
		return new XMLHttpRequest();
	};

	var MSXML2 = function(){
		return new ActiveXObject('MSXML2.XMLHTTP');
	};

	var MSXML = function(){
		return new ActiveXObject('Microsoft.XMLHTTP');
	};

	return Function.attempt(function(){
		XMLHTTP();
		return XMLHTTP;
	}, function(){
		MSXML2();
		return MSXML2;
	}, function(){
		MSXML();
		return MSXML;
	});

})();

Browser.Features.xhr = !!(Browser.Request);



// String scripts

Browser.exec = function(text){
	if (!text) return text;
	if (window.execScript){
		window.execScript(text);
	} else {
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.text = text;
		document.head.appendChild(script);
		document.head.removeChild(script);
	}
	return text;
};

String.implement('stripScripts', function(exec){
	var scripts = '';
	var text = this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(all, code){
		scripts += code + '\n';
		return '';
	});
	if (exec === true) Browser.exec(scripts);
	else if (typeOf(exec) == 'function') exec(scripts, text);
	return text;
});

// Window, Document

Browser.extend({
	Document: this.Document,
	Window: this.Window,
	Element: this.Element,
	Event: this.Event
});

this.Window = this.$constructor = new Type('Window', function(){});

this.$family = Function.convert('window').hide();

Window.mirror(function(name, method){
	window[name] = method;
});

this.Document = document.$constructor = new Type('Document', function(){});

document.$family = Function.convert('document').hide();

Document.mirror(function(name, method){
	document[name] = method;
});

document.html = document.documentElement;
if (!document.head) document.head = document.getElementsByTagName('head')[0];

if (document.execCommand) try {
	document.execCommand('BackgroundImageCache', false, true);
} catch (e){}

/*<ltIE9>*/
if (this.attachEvent && !this.addEventListener){
	var unloadEvent = function(){
		this.detachEvent('onunload', unloadEvent);
		document.head = document.html = document.window = null;
		window = this.Window = document = null;
	};
	this.attachEvent('onunload', unloadEvent);
}

// IE fails on collections and <select>.options (refers to <select>)
var arrayFrom = Array.convert;
try {
	arrayFrom(document.html.childNodes);
} catch (e){
	Array.convert = function(item){
		if (typeof item != 'string' && Type.isEnumerable(item) && typeOf(item) != 'array'){
			var i = item.length, array = new Array(i);
			while (i--) array[i] = item[i];
			return array;
		}
		return arrayFrom(item);
	};

	var prototype = Array.prototype,
		slice = prototype.slice;
	['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice'].each(function(name){
		var method = prototype[name];
		Array[name] = function(item){
			return method.apply(Array.convert(item), slice.call(arguments, 1));
		};
	});
}
/*</ltIE9>*/



})();

/*
---

name: Class

description: Contains the Class Function for easily creating, extending, and implementing reusable Classes.

license: MIT-style license.

requires: [Array, String, Function, Number]

provides: Class

...
*/

(function(){

var Class = this.Class = new Type('Class', function(params){
	if (instanceOf(params, Function)) params = {initialize: params};

	var newClass = function(){
		reset(this);
		if (newClass.$prototyping) return this;
		this.$caller = null;
		this.$family = null;
		var value = (this.initialize) ? this.initialize.apply(this, arguments) : this;
		this.$caller = this.caller = null;
		return value;
	}.extend(this).implement(params);

	newClass.$constructor = Class;
	newClass.prototype.$constructor = newClass;
	newClass.prototype.parent = parent;

	return newClass;
});

var parent = function(){
	if (!this.$caller) throw new Error('The method "parent" cannot be called.');
	var name = this.$caller.$name,
		parent = this.$caller.$owner.parent,
		previous = (parent) ? parent.prototype[name] : null;
	if (!previous) throw new Error('The method "' + name + '" has no parent.');
	return previous.apply(this, arguments);
};

var reset = function(object){
	for (var key in object){
		var value = object[key];
		switch (typeOf(value)){
			case 'object':
				var F = function(){};
				F.prototype = value;
				object[key] = reset(new F);
				break;
			case 'array': object[key] = value.clone(); break;
		}
	}
	return object;
};

var wrap = function(self, key, method){
	if (method.$origin) method = method.$origin;
	var wrapper = function(){
		if (method.$protected && this.$caller == null) throw new Error('The method "' + key + '" cannot be called.');
		var caller = this.caller, current = this.$caller;
		this.caller = current; this.$caller = wrapper;
		var result = method.apply(this, arguments);
		this.$caller = current; this.caller = caller;
		return result;
	}.extend({$owner: self, $origin: method, $name: key});
	return wrapper;
};

var implement = function(key, value, retain){
	if (Class.Mutators.hasOwnProperty(key)){
		value = Class.Mutators[key].call(this, value);
		if (value == null) return this;
	}

	if (typeOf(value) == 'function'){
		if (value.$hidden) return this;
		this.prototype[key] = (retain) ? value : wrap(this, key, value);
	} else {
		Object.merge(this.prototype, key, value);
	}

	return this;
};

var getInstance = function(klass){
	klass.$prototyping = true;
	var proto = new klass;
	delete klass.$prototyping;
	return proto;
};

Class.implement('implement', implement.overloadSetter());

Class.Mutators = {

	Extends: function(parent){
		this.parent = parent;
		this.prototype = getInstance(parent);
	},

	Implements: function(items){
		Array.convert(items).each(function(item){
			var instance = new item;
			for (var key in instance) implement.call(this, key, instance[key], true);
		}, this);
	}
};

})();

/*
---

name: Class.Extras

description: Contains Utility Classes that can be implemented into your own Classes to ease the execution of many common tasks.

license: MIT-style license.

requires: Class

provides: [Class.Extras, Chain, Events, Options]

...
*/

(function(){

this.Chain = new Class({

	$chain: [],

	chain: function(){
		this.$chain.append(Array.flatten(arguments));
		return this;
	},

	callChain: function(){
		return (this.$chain.length) ? this.$chain.shift().apply(this, arguments) : false;
	},

	clearChain: function(){
		this.$chain.empty();
		return this;
	}

});

var removeOn = function(string){
	return string.replace(/^on([A-Z])/, function(full, first){
		return first.toLowerCase();
	});
};

this.Events = new Class({

	$events: {},

	addEvent: function(type, fn, internal){
		type = removeOn(type);

		

		this.$events[type] = (this.$events[type] || []).include(fn);
		if (internal) fn.internal = true;
		return this;
	},

	addEvents: function(events){
		for (var type in events) this.addEvent(type, events[type]);
		return this;
	},

	fireEvent: function(type, args, delay){
		type = removeOn(type);
		var events = this.$events[type];
		if (!events) return this;
		args = Array.convert(args);
		events.each(function(fn){
			if (delay) fn.delay(delay, this, args);
			else fn.apply(this, args);
		}, this);
		return this;
	},

	removeEvent: function(type, fn){
		type = removeOn(type);
		var events = this.$events[type];
		if (events && !fn.internal){
			var index = events.indexOf(fn);
			if (index != -1) delete events[index];
		}
		return this;
	},

	removeEvents: function(events){
		var type;
		if (typeOf(events) == 'object'){
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		if (events) events = removeOn(events);
		for (type in this.$events){
			if (events && events != type) continue;
			var fns = this.$events[type];
			for (var i = fns.length; i--;) if (i in fns){
				this.removeEvent(type, fns[i]);
			}
		}
		return this;
	}

});

this.Options = new Class({

	setOptions: function(){
		var options = this.options = Object.merge.apply(null, [{}, this.options].append(arguments));
		if (this.addEvent) for (var option in options){
			if (typeOf(options[option]) != 'function' || !(/^on[A-Z]/).test(option)) continue;
			this.addEvent(option, options[option]);
			delete options[option];
		}
		return this;
	}

});

})();

/*
---

name: Class.Thenable

description: Contains a Utility Class that can be implemented into your own Classes to make them "thenable".

license: MIT-style license.

requires: Class

provides: [Class.Thenable]

...
*/

(function(){

var STATE_PENDING = 0,
	STATE_FULFILLED = 1,
	STATE_REJECTED = 2;

var Thenable = Class.Thenable = new Class({

	$thenableState: STATE_PENDING,
	$thenableResult: null,
	$thenableReactions: [],

	resolve: function(value){
		resolve(this, value);
		return this;
	},

	reject: function(reason){
		reject(this, reason);
		return this;
	},

	getThenableState: function(){
		switch (this.$thenableState){
			case STATE_PENDING:
				return 'pending';

			case STATE_FULFILLED:
				return 'fulfilled';

			case STATE_REJECTED:
				return 'rejected';
		}
	},

	resetThenable: function(reason){
		reject(this, reason);
		reset(this);
		return this;
	},

	then: function(onFulfilled, onRejected){
		if (typeof onFulfilled !== 'function') onFulfilled = 'Identity';
		if (typeof onRejected !== 'function') onRejected = 'Thrower';

		var thenable = new Thenable();

		this.$thenableReactions.push({
			thenable: thenable,
			fulfillHandler: onFulfilled,
			rejectHandler: onRejected
		});

		if (this.$thenableState !== STATE_PENDING){
			react(this);
		}

		return thenable;
	},

	'catch': function(onRejected){
		return this.then(null, onRejected);
	}

});

Thenable.extend({
	resolve: function(value){
		var thenable;
		if (value instanceof Thenable){
			thenable = value;
		} else {
			thenable = new Thenable();
			resolve(thenable, value);
		}
		return thenable;
	},
	reject: function(reason){
		var thenable = new Thenable();
		reject(thenable, reason);
		return thenable;
	}
});

// Private functions

function resolve(thenable, value){
	if (thenable.$thenableState === STATE_PENDING){
		if (thenable === value){
			reject(thenable, new TypeError('Tried to resolve a thenable with itself.'));
		} else if (value && (typeof value === 'object' || typeof value === 'function')){
			var then;
			try {
				then = value.then;
			} catch (exception){
				reject(thenable, exception);
			}
			if (typeof then === 'function'){
				var resolved = false;
				defer(function(){
					try {
						then.call(
							value,
							function(nextValue){
								if (!resolved){
									resolved = true;
									resolve(thenable, nextValue);
								}
							},
							function(reason){
								if (!resolved){
									resolved = true;
									reject(thenable, reason);
								}
							}
						);
					} catch (exception){
						if (!resolved){
							resolved = true;
							reject(thenable, exception);
						}
					}
				});
			} else {
				fulfill(thenable, value);
			}
		} else {
			fulfill(thenable, value);
		}
	}
}

function fulfill(thenable, value){
	if (thenable.$thenableState === STATE_PENDING){
		thenable.$thenableResult = value;
		thenable.$thenableState = STATE_FULFILLED;

		react(thenable);
	}
}

function reject(thenable, reason){
	if (thenable.$thenableState === STATE_PENDING){
		thenable.$thenableResult = reason;
		thenable.$thenableState = STATE_REJECTED;

		react(thenable);
	}
}

function reset(thenable){
	if (thenable.$thenableState !== STATE_PENDING){
		thenable.$thenableResult = null;
		thenable.$thenableState = STATE_PENDING;
	}
}

function react(thenable){
	var state = thenable.$thenableState,
		result = thenable.$thenableResult,
		reactions = thenable.$thenableReactions,
		type;

	if (state === STATE_FULFILLED){
		thenable.$thenableReactions = [];
		type = 'fulfillHandler';
	} else if (state == STATE_REJECTED){
		thenable.$thenableReactions = [];
		type = 'rejectHandler';
	}

	if (type){
		defer(handle.pass([result, reactions, type]));
	}
}

function handle(result, reactions, type){
	for (var i = 0, l = reactions.length; i < l; ++i){
		var reaction = reactions[i],
			handler = reaction[type];

		if (handler === 'Identity'){
			resolve(reaction.thenable, result);
		} else if (handler === 'Thrower'){
			reject(reaction.thenable, result);
		} else {
			try {
				resolve(reaction.thenable, handler(result));
			} catch (exception){
				reject(reaction.thenable, exception);
			}
		}
	}
}

var defer;
if (typeof process !== 'undefined' && typeof process.nextTick === 'function'){
	defer = process.nextTick;
} else if (typeof setImmediate !== 'undefined'){
	defer = setImmediate;
} else {
	defer = function(fn){
		setTimeout(fn, 0);
	};
}

})();

/*
---

name: Object

description: Object generic methods

license: MIT-style license.

requires: Type

provides: [Object, Hash]

...
*/

(function(){

Object.extend({

	subset: function(object, keys){
		var results = {};
		for (var i = 0, l = keys.length; i < l; i++){
			var k = keys[i];
			if (k in object) results[k] = object[k];
		}
		return results;
	},

	map: function(object, fn, bind){
		var results = {};
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i];
			results[key] = fn.call(bind, object[key], key, object);
		}
		return results;
	},

	filter: function(object, fn, bind){
		var results = {};
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i], value = object[key];
			if (fn.call(bind, value, key, object)) results[key] = value;
		}
		return results;
	},

	every: function(object, fn, bind){
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i];
			if (!fn.call(bind, object[key], key)) return false;
		}
		return true;
	},

	some: function(object, fn, bind){
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i];
			if (fn.call(bind, object[key], key)) return true;
		}
		return false;
	},

	values: function(object){
		var values = [];
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var k = keys[i];
			values.push(object[k]);
		}
		return values;
	},

	getLength: function(object){
		return Object.keys(object).length;
	},

	keyOf: function(object, value){
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i];
			if (object[key] === value) return key;
		}
		return null;
	},

	contains: function(object, value){
		return Object.keyOf(object, value) != null;
	},

	toQueryString: function(object, base){
		var queryString = [];

		Object.each(object, function(value, key){
			if (base) key = base + '[' + key + ']';
			var result;
			switch (typeOf(value)){
				case 'object': result = Object.toQueryString(value, key); break;
				case 'array':
					var qs = {};
					value.each(function(val, i){
						qs[i] = val;
					});
					result = Object.toQueryString(qs, key);
					break;
				default: result = key + '=' + encodeURIComponent(value);
			}
			if (value != null) queryString.push(result);
		});

		return queryString.join('&');
	}

});

})();



/*
---
name: Slick.Parser
description: Standalone CSS3 Selector parser
provides: Slick.Parser
...
*/

;(function(){

var parsed,
	separatorIndex,
	combinatorIndex,
	reversed,
	cache = {},
	reverseCache = {},
	reUnescape = /\\/g;

var parse = function(expression, isReversed){
	if (expression == null) return null;
	if (expression.Slick === true) return expression;
	expression = ('' + expression).replace(/^\s+|\s+$/g, '');
	reversed = !!isReversed;
	var currentCache = (reversed) ? reverseCache : cache;
	if (currentCache[expression]) return currentCache[expression];
	parsed = {
		Slick: true,
		expressions: [],
		raw: expression,
		reverse: function(){
			return parse(this.raw, true);
		}
	};
	separatorIndex = -1;
	while (expression != (expression = expression.replace(regexp, parser)));
	parsed.length = parsed.expressions.length;
	return currentCache[parsed.raw] = (reversed) ? reverse(parsed) : parsed;
};

var reverseCombinator = function(combinator){
	if (combinator === '!') return ' ';
	else if (combinator === ' ') return '!';
	else if ((/^!/).test(combinator)) return combinator.replace(/^!/, '');
	else return '!' + combinator;
};

var reverse = function(expression){
	var expressions = expression.expressions;
	for (var i = 0; i < expressions.length; i++){
		var exp = expressions[i];
		var last = {parts: [], tag: '*', combinator: reverseCombinator(exp[0].combinator)};

		for (var j = 0; j < exp.length; j++){
			var cexp = exp[j];
			if (!cexp.reverseCombinator) cexp.reverseCombinator = ' ';
			cexp.combinator = cexp.reverseCombinator;
			delete cexp.reverseCombinator;
		}

		exp.reverse().push(last);
	}
	return expression;
};

var escapeRegExp = function(string){// Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License
	return string.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(match){
		return '\\' + match;
	});
};

var regexp = new RegExp(
/*
#!/usr/bin/env ruby
puts "\t\t" + DATA.read.gsub(/\(\?x\)|\s+#.*$|\s+|\\$|\\n/,'')
__END__
	"(?x)^(?:\
	  \\s* ( , ) \\s*               # Separator          \n\
	| \\s* ( <combinator>+ ) \\s*   # Combinator         \n\
	|      ( \\s+ )                 # CombinatorChildren \n\
	|      ( <unicode>+ | \\* )     # Tag                \n\
	| \\#  ( <unicode>+       )     # ID                 \n\
	| \\.  ( <unicode>+       )     # ClassName          \n\
	|                               # Attribute          \n\
	\\[  \
		\\s* (<unicode1>+)  (?:  \
			\\s* ([*^$!~|]?=)  (?:  \
				\\s* (?:\
					([\"']?)(.*?)\\9 \
				)\
			)  \
		)?  \\s*  \
	\\](?!\\]) \n\
	|   :+ ( <unicode>+ )(?:\
	\\( (?:\
		(?:([\"'])([^\\12]*)\\12)|((?:\\([^)]+\\)|[^()]*)+)\
	) \\)\
	)?\
	)"
*/
	"^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:([\"'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)"
	.replace(/<combinator>/, '[' + escapeRegExp('>+~`!@$%^&={}\\;</') + ']')
	.replace(/<unicode>/g, '(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])')
	.replace(/<unicode1>/g, '(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])')
);

function parser(
	rawMatch,

	separator,
	combinator,
	combinatorChildren,

	tagName,
	id,
	className,

	attributeKey,
	attributeOperator,
	attributeQuote,
	attributeValue,

	pseudoMarker,
	pseudoClass,
	pseudoQuote,
	pseudoClassQuotedValue,
	pseudoClassValue
){
	if (separator || separatorIndex === -1){
		parsed.expressions[++separatorIndex] = [];
		combinatorIndex = -1;
		if (separator) return '';
	}

	if (combinator || combinatorChildren || combinatorIndex === -1){
		combinator = combinator || ' ';
		var currentSeparator = parsed.expressions[separatorIndex];
		if (reversed && currentSeparator[combinatorIndex])
			currentSeparator[combinatorIndex].reverseCombinator = reverseCombinator(combinator);
		currentSeparator[++combinatorIndex] = {combinator: combinator, tag: '*'};
	}

	var currentParsed = parsed.expressions[separatorIndex][combinatorIndex];

	if (tagName){
		currentParsed.tag = tagName.replace(reUnescape, '');

	} else if (id){
		currentParsed.id = id.replace(reUnescape, '');

	} else if (className){
		className = className.replace(reUnescape, '');

		if (!currentParsed.classList) currentParsed.classList = [];
		if (!currentParsed.classes) currentParsed.classes = [];
		currentParsed.classList.push(className);
		currentParsed.classes.push({
			value: className,
			regexp: new RegExp('(^|\\s)' + escapeRegExp(className) + '(\\s|$)')
		});

	} else if (pseudoClass){
		pseudoClassValue = pseudoClassValue || pseudoClassQuotedValue;
		pseudoClassValue = pseudoClassValue ? pseudoClassValue.replace(reUnescape, '') : null;

		if (!currentParsed.pseudos) currentParsed.pseudos = [];
		currentParsed.pseudos.push({
			key: pseudoClass.replace(reUnescape, ''),
			value: pseudoClassValue,
			type: pseudoMarker.length == 1 ? 'class' : 'element'
		});

	} else if (attributeKey){
		attributeKey = attributeKey.replace(reUnescape, '');
		attributeValue = (attributeValue || '').replace(reUnescape, '');

		var test, regexp;

		switch (attributeOperator){
			case '^=' : regexp = new RegExp(       '^'+ escapeRegExp(attributeValue)            ); break;
			case '$=' : regexp = new RegExp(            escapeRegExp(attributeValue) +'$'       ); break;
			case '~=' : regexp = new RegExp( '(^|\\s)'+ escapeRegExp(attributeValue) +'(\\s|$)' ); break;
			case '|=' : regexp = new RegExp(       '^'+ escapeRegExp(attributeValue) +'(-|$)'   ); break;
			case  '=' : test = function(value){
				return attributeValue == value;
			}; break;
			case '*=' : test = function(value){
				return value && value.indexOf(attributeValue) > -1;
			}; break;
			case '!=' : test = function(value){
				return attributeValue != value;
			}; break;
			default   : test = function(value){
				return !!value;
			};
		}

		if (attributeValue == '' && (/^[*$^]=$/).test(attributeOperator)) test = function(){
			return false;
		};

		if (!test) test = function(value){
			return value && regexp.test(value);
		};

		if (!currentParsed.attributes) currentParsed.attributes = [];
		currentParsed.attributes.push({
			key: attributeKey,
			operator: attributeOperator,
			value: attributeValue,
			test: test
		});

	}

	return '';
};

// Slick NS

var Slick = (this.Slick || {});

Slick.parse = function(expression){
	return parse(expression);
};

Slick.escapeRegExp = escapeRegExp;

if (!this.Slick) this.Slick = Slick;

}).apply(/*<CommonJS>*/(typeof exports != 'undefined') ? exports : /*</CommonJS>*/this);

/*
---
name: Slick.Finder
description: The new, superfast css selector engine.
provides: Slick.Finder
requires: Slick.Parser
...
*/

;(function(){

var local = {},
	featuresCache = {},
	toString = Object.prototype.toString;

// Feature / Bug detection

local.isNativeCode = function(fn){
	return (/\{\s*\[native code\]\s*\}/).test('' + fn);
};

local.isXML = function(document){
	return (!!document.xmlVersion) || (!!document.xml) || (toString.call(document) == '[object XMLDocument]') ||
	(document.nodeType == 9 && document.documentElement.nodeName != 'HTML');
};

local.setDocument = function(document){

	// convert elements / window arguments to document. if document cannot be extrapolated, the function returns.
	var nodeType = document.nodeType;
	if (nodeType == 9); // document
	else if (nodeType) document = document.ownerDocument; // node
	else if (document.navigator) document = document.document; // window
	else return;

	// check if it's the old document

	if (this.document === document) return;
	this.document = document;

	// check if we have done feature detection on this document before

	var root = document.documentElement,
		rootUid = this.getUIDXML(root),
		features = featuresCache[rootUid],
		feature;

	if (features){
		for (feature in features){
			this[feature] = features[feature];
		}
		return;
	}

	features = featuresCache[rootUid] = {};

	features.root = root;
	features.isXMLDocument = this.isXML(document);

	features.brokenStarGEBTN
	= features.starSelectsClosedQSA
	= features.idGetsName
	= features.brokenMixedCaseQSA
	= features.brokenGEBCN
	= features.brokenCheckedQSA
	= features.brokenEmptyAttributeQSA
	= features.isHTMLDocument
	= features.nativeMatchesSelector
	= false;

	var starSelectsClosed, starSelectsComments,
		brokenSecondClassNameGEBCN, cachedGetElementsByClassName,
		brokenFormAttributeGetter;

	var selected, id = 'slick_uniqueid';
	var testNode = document.createElement('div');

	var testRoot = document.body || document.getElementsByTagName('body')[0] || root;
	testRoot.appendChild(testNode);

	// on non-HTML documents innerHTML and getElementsById doesnt work properly
	try {
		testNode.innerHTML = '<a id="'+id+'"></a>';
		features.isHTMLDocument = !!document.getElementById(id);
	} catch (e){}

	if (features.isHTMLDocument){

		testNode.style.display = 'none';

		// IE returns comment nodes for getElementsByTagName('*') for some documents
		testNode.appendChild(document.createComment(''));
		starSelectsComments = (testNode.getElementsByTagName('*').length > 1);

		// IE returns closed nodes (EG:"</foo>") for getElementsByTagName('*') for some documents
		try {
			testNode.innerHTML = 'foo</foo>';
			selected = testNode.getElementsByTagName('*');
			starSelectsClosed = (selected && !!selected.length && selected[0].nodeName.charAt(0) == '/');
		} catch (e){};

		features.brokenStarGEBTN = starSelectsComments || starSelectsClosed;

		// IE returns elements with the name instead of just id for getElementsById for some documents
		try {
			testNode.innerHTML = '<a name="'+ id +'"></a><b id="'+ id +'"></b>';
			features.idGetsName = document.getElementById(id) === testNode.firstChild;
		} catch (e){}

		if (testNode.getElementsByClassName){

			// Safari 3.2 getElementsByClassName caches results
			try {
				testNode.innerHTML = '<a class="f"></a><a class="b"></a>';
				testNode.getElementsByClassName('b').length;
				testNode.firstChild.className = 'b';
				cachedGetElementsByClassName = (testNode.getElementsByClassName('b').length != 2);
			} catch (e){};

			// Opera 9.6 getElementsByClassName doesnt detects the class if its not the first one
			try {
				testNode.innerHTML = '<a class="a"></a><a class="f b a"></a>';
				brokenSecondClassNameGEBCN = (testNode.getElementsByClassName('a').length != 2);
			} catch (e){}

			features.brokenGEBCN = cachedGetElementsByClassName || brokenSecondClassNameGEBCN;
		}

		if (testNode.querySelectorAll){
			// IE 8 returns closed nodes (EG:"</foo>") for querySelectorAll('*') for some documents
			try {
				testNode.innerHTML = 'foo</foo>';
				selected = testNode.querySelectorAll('*');
				features.starSelectsClosedQSA = (selected && !!selected.length && selected[0].nodeName.charAt(0) == '/');
			} catch (e){}

			// Safari 3.2 querySelectorAll doesnt work with mixedcase on quirksmode
			try {
				testNode.innerHTML = '<a class="MiX"></a>';
				features.brokenMixedCaseQSA = !testNode.querySelectorAll('.MiX').length;
			} catch (e){}

			// Webkit and Opera dont return selected options on querySelectorAll
			try {
				testNode.innerHTML = '<select><option selected="selected">a</option></select>';
				features.brokenCheckedQSA = (testNode.querySelectorAll(':checked').length == 0);
			} catch (e){};

			// IE returns incorrect results for attr[*^$]="" selectors on querySelectorAll
			try {
				testNode.innerHTML = '<a class=""></a>';
				features.brokenEmptyAttributeQSA = (testNode.querySelectorAll('[class*=""]').length != 0);
			} catch (e){}

		}

		// IE6-7, if a form has an input of id x, form.getAttribute(x) returns a reference to the input
		try {
			testNode.innerHTML = '<form action="s"><input id="action"/></form>';
			brokenFormAttributeGetter = (testNode.firstChild.getAttribute('action') != 's');
		} catch (e){}

		// native matchesSelector function

		features.nativeMatchesSelector = root.matches || /*root.msMatchesSelector ||*/ root.mozMatchesSelector || root.webkitMatchesSelector;
		if (features.nativeMatchesSelector) try {
			// if matchesSelector trows errors on incorrect sintaxes we can use it
			features.nativeMatchesSelector.call(root, ':slick');
			features.nativeMatchesSelector = null;
		} catch (e){}

	}

	try {
		root.slick_expando = 1;
		delete root.slick_expando;
		features.getUID = this.getUIDHTML;
	} catch (e){
		features.getUID = this.getUIDXML;
	}

	testRoot.removeChild(testNode);
	testNode = selected = testRoot = null;

	// getAttribute

	features.getAttribute = (features.isHTMLDocument && brokenFormAttributeGetter) ? function(node, name){
		var method = this.attributeGetters[name];
		if (method) return method.call(node);
		var attributeNode = node.getAttributeNode(name);
		return (attributeNode) ? attributeNode.nodeValue : null;
	} : function(node, name){
		var method = this.attributeGetters[name];
		return (method) ? method.call(node) : node.getAttribute(name);
	};

	// hasAttribute

	features.hasAttribute = (root && this.isNativeCode(root.hasAttribute)) ? function(node, attribute){
		return node.hasAttribute(attribute);
	} : function(node, attribute){
		node = node.getAttributeNode(attribute);
		return !!(node && (node.specified || node.nodeValue));
	};

	// contains
	// FIXME: Add specs: local.contains should be different for xml and html documents?
	var nativeRootContains = root && this.isNativeCode(root.contains),
		nativeDocumentContains = document && this.isNativeCode(document.contains);

	features.contains = (nativeRootContains && nativeDocumentContains) ? function(context, node){
		return context.contains(node);
	} : (nativeRootContains && !nativeDocumentContains) ? function(context, node){
		// IE8 does not have .contains on document.
		return context === node || ((context === document) ? document.documentElement : context).contains(node);
	} : (root && root.compareDocumentPosition) ? function(context, node){
		return context === node || !!(context.compareDocumentPosition(node) & 16);
	} : function(context, node){
		if (node) do {
			if (node === context) return true;
		} while ((node = node.parentNode));
		return false;
	};

	// document order sorting
	// credits to Sizzle (http://sizzlejs.com/)

	features.documentSorter = (root.compareDocumentPosition) ? function(a, b){
		if (!a.compareDocumentPosition || !b.compareDocumentPosition) return 0;
		return a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
	} : ('sourceIndex' in root) ? function(a, b){
		if (!a.sourceIndex || !b.sourceIndex) return 0;
		return a.sourceIndex - b.sourceIndex;
	} : (document.createRange) ? function(a, b){
		if (!a.ownerDocument || !b.ownerDocument) return 0;
		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.setStart(a, 0);
		aRange.setEnd(a, 0);
		bRange.setStart(b, 0);
		bRange.setEnd(b, 0);
		return aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
	} : null;

	root = null;

	for (feature in features){
		this[feature] = features[feature];
	}
};

// Main Method

var reSimpleSelector = /^([#.]?)((?:[\w-]+|\*))$/,
	reEmptyAttribute = /\[.+[*$^]=(?:""|'')?\]/,
	qsaFailExpCache = {};

local.search = function(context, expression, append, first){

	var found = this.found = (first) ? null : (append || []);

	if (!context) return found;
	else if (context.navigator) context = context.document; // Convert the node from a window to a document
	else if (!context.nodeType) return found;

	// setup

	var parsed, i, node, nodes,
		uniques = this.uniques = {},
		hasOthers = !!(append && append.length),
		contextIsDocument = (context.nodeType == 9);

	if (this.document !== (contextIsDocument ? context : context.ownerDocument)) this.setDocument(context);

	// avoid duplicating items already in the append array
	if (hasOthers) for (i = found.length; i--;) uniques[this.getUID(found[i])] = true;

	// expression checks

	if (typeof expression == 'string'){ // expression is a string

		/*<simple-selectors-override>*/
		var simpleSelector = expression.match(reSimpleSelector);
		simpleSelectors: if (simpleSelector){

			var symbol = simpleSelector[1],
				name = simpleSelector[2];

			if (!symbol){

				if (name == '*' && this.brokenStarGEBTN) break simpleSelectors;
				nodes = context.getElementsByTagName(name);
				if (first) return nodes[0] || null;
				for (i = 0; node = nodes[i++];){
					if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
				}

			} else if (symbol == '#'){

				if (!this.isHTMLDocument || !contextIsDocument) break simpleSelectors;
				node = context.getElementById(name);
				if (!node) return found;
				if (this.idGetsName && node.getAttributeNode('id').nodeValue != name) break simpleSelectors;
				if (first) return node || null;
				if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);

			} else if (symbol == '.'){

				if (!this.isHTMLDocument || ((!context.getElementsByClassName || this.brokenGEBCN) && context.querySelectorAll)) break simpleSelectors;
				if (context.getElementsByClassName && !this.brokenGEBCN){
					nodes = context.getElementsByClassName(name);
					if (first) return nodes[0] || null;
					for (i = 0; node = nodes[i++];){
						if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
					}
				} else {
					var matchClass = new RegExp('(^|\\s)'+ Slick.escapeRegExp(name) +'(\\s|$)');
					nodes = context.getElementsByTagName('*');
					for (i = 0; node = nodes[i++];){
						className = node.className;
						if (!(className && matchClass.test(className))) continue;
						if (first) return node;
						if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
					}
				}

			}

			if (hasOthers) this.sort(found);
			return (first) ? null : found;

		}
		/*</simple-selectors-override>*/

		/*<query-selector-override>*/
		querySelector: if (context.querySelectorAll){

			if (!this.isHTMLDocument
				|| qsaFailExpCache[expression]
				//TODO: only skip when expression is actually mixed case
				|| this.brokenMixedCaseQSA
				|| (this.brokenCheckedQSA && expression.indexOf(':checked') > -1)
				|| (this.brokenEmptyAttributeQSA && reEmptyAttribute.test(expression))
				|| (!contextIsDocument //Abort when !contextIsDocument and...
					//  there are multiple expressions in the selector
					//  since we currently only fix non-document rooted QSA for single expression selectors
					&& expression.indexOf(',') > -1
				)
				|| Slick.disableQSA
			) break querySelector;

			var _expression = expression, _context = context, currentId;
			if (!contextIsDocument){
				// non-document rooted QSA
				// credits to Andrew Dupont
				currentId = _context.getAttribute('id'), slickid = 'slickid__';
				_context.setAttribute('id', slickid);
				_expression = '#' + slickid + ' ' + _expression;
				context = _context.parentNode;
			}

			try {
				if (first) return context.querySelector(_expression) || null;
				else nodes = context.querySelectorAll(_expression);
			} catch (e){
				qsaFailExpCache[expression] = 1;
				break querySelector;
			} finally {
				if (!contextIsDocument){
					if (currentId) _context.setAttribute('id', currentId);
					else _context.removeAttribute('id');
					context = _context;
				}
			}

			if (this.starSelectsClosedQSA) for (i = 0; node = nodes[i++];){
				if (node.nodeName > '@' && !(hasOthers && uniques[this.getUID(node)])) found.push(node);
			} else for (i = 0; node = nodes[i++];){
				if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
			}

			if (hasOthers) this.sort(found);
			return found;

		}
		/*</query-selector-override>*/

		parsed = this.Slick.parse(expression);
		if (!parsed.length) return found;
	} else if (expression == null){ // there is no expression
		return found;
	} else if (expression.Slick){ // expression is a parsed Slick object
		parsed = expression;
	} else if (this.contains(context.documentElement || context, expression)){ // expression is a node
		(found) ? found.push(expression) : found = expression;
		return found;
	} else { // other junk
		return found;
	}

	/*<pseudo-selectors>*//*<nth-pseudo-selectors>*/

	// cache elements for the nth selectors

	this.posNTH = {};
	this.posNTHLast = {};
	this.posNTHType = {};
	this.posNTHTypeLast = {};

	/*</nth-pseudo-selectors>*//*</pseudo-selectors>*/

	// if append is null and there is only a single selector with one expression use pushArray, else use pushUID
	this.push = (!hasOthers && (first || (parsed.length == 1 && parsed.expressions[0].length == 1))) ? this.pushArray : this.pushUID;

	if (found == null) found = [];

	// default engine

	var j, m, n;
	var combinator, tag, id, classList, classes, attributes, pseudos;
	var currentItems, currentExpression, currentBit, lastBit, expressions = parsed.expressions;

	search: for (i = 0; (currentExpression = expressions[i]); i++) for (j = 0; (currentBit = currentExpression[j]); j++){

		combinator = 'combinator:' + currentBit.combinator;
		if (!this[combinator]) continue search;

		tag        = (this.isXMLDocument) ? currentBit.tag : currentBit.tag.toUpperCase();
		id         = currentBit.id;
		classList  = currentBit.classList;
		classes    = currentBit.classes;
		attributes = currentBit.attributes;
		pseudos    = currentBit.pseudos;
		lastBit    = (j === (currentExpression.length - 1));

		this.bitUniques = {};

		if (lastBit){
			this.uniques = uniques;
			this.found = found;
		} else {
			this.uniques = {};
			this.found = [];
		}

		if (j === 0){
			this[combinator](context, tag, id, classes, attributes, pseudos, classList);
			if (first && lastBit && found.length) break search;
		} else {
			if (first && lastBit) for (m = 0, n = currentItems.length; m < n; m++){
				this[combinator](currentItems[m], tag, id, classes, attributes, pseudos, classList);
				if (found.length) break search;
			} else for (m = 0, n = currentItems.length; m < n; m++) this[combinator](currentItems[m], tag, id, classes, attributes, pseudos, classList);
		}

		currentItems = this.found;
	}

	// should sort if there are nodes in append and if you pass multiple expressions.
	if (hasOthers || (parsed.expressions.length > 1)) this.sort(found);

	return (first) ? (found[0] || null) : found;
};

// Utils

local.uidx = 1;
local.uidk = 'slick-uniqueid';

local.getUIDXML = function(node){
	var uid = node.getAttribute(this.uidk);
	if (!uid){
		uid = this.uidx++;
		node.setAttribute(this.uidk, uid);
	}
	return uid;
};

local.getUIDHTML = function(node){
	return node.uniqueNumber || (node.uniqueNumber = this.uidx++);
};

// sort based on the setDocument documentSorter method.

local.sort = function(results){
	if (!this.documentSorter) return results;
	results.sort(this.documentSorter);
	return results;
};

/*<pseudo-selectors>*//*<nth-pseudo-selectors>*/

local.cacheNTH = {};

local.matchNTH = /^([+-]?\d*)?([a-z]+)?([+-]\d+)?$/;

local.parseNTHArgument = function(argument){
	var parsed = argument.match(this.matchNTH);
	if (!parsed) return false;
	var special = parsed[2] || false;
	var a = parsed[1] || 1;
	if (a == '-') a = -1;
	var b = +parsed[3] || 0;
	parsed =
		(special == 'n')	? {a: a, b: b} :
		(special == 'odd')	? {a: 2, b: 1} :
		(special == 'even')	? {a: 2, b: 0} : {a: 0, b: a};

	return (this.cacheNTH[argument] = parsed);
};

local.createNTHPseudo = function(child, sibling, positions, ofType){
	return function(node, argument){
		var uid = this.getUID(node);
		if (!this[positions][uid]){
			var parent = node.parentNode;
			if (!parent) return false;
			var el = parent[child], count = 1;
			if (ofType){
				var nodeName = node.nodeName;
				do {
					if (el.nodeName != nodeName) continue;
					this[positions][this.getUID(el)] = count++;
				} while ((el = el[sibling]));
			} else {
				do {
					if (el.nodeType != 1) continue;
					this[positions][this.getUID(el)] = count++;
				} while ((el = el[sibling]));
			}
		}
		argument = argument || 'n';
		var parsed = this.cacheNTH[argument] || this.parseNTHArgument(argument);
		if (!parsed) return false;
		var a = parsed.a, b = parsed.b, pos = this[positions][uid];
		if (a == 0) return b == pos;
		if (a > 0){
			if (pos < b) return false;
		} else {
			if (b < pos) return false;
		}
		return ((pos - b) % a) == 0;
	};
};

/*</nth-pseudo-selectors>*//*</pseudo-selectors>*/

local.pushArray = function(node, tag, id, classes, attributes, pseudos){
	if (this.matchSelector(node, tag, id, classes, attributes, pseudos)) this.found.push(node);
};

local.pushUID = function(node, tag, id, classes, attributes, pseudos){
	var uid = this.getUID(node);
	if (!this.uniques[uid] && this.matchSelector(node, tag, id, classes, attributes, pseudos)){
		this.uniques[uid] = true;
		this.found.push(node);
	}
};

local.matchNode = function(node, selector){
	if (this.isHTMLDocument && this.nativeMatchesSelector){
		try {
			return this.nativeMatchesSelector.call(node, selector.replace(/\[([^=]+)=\s*([^'"\]]+?)\s*\]/g, '[$1="$2"]'));
		} catch (matchError){}
	}

	var parsed = this.Slick.parse(selector);
	if (!parsed) return true;

	// simple (single) selectors
	var expressions = parsed.expressions, simpleExpCounter = 0, i, currentExpression;
	for (i = 0; (currentExpression = expressions[i]); i++){
		if (currentExpression.length == 1){
			var exp = currentExpression[0];
			if (this.matchSelector(node, (this.isXMLDocument) ? exp.tag : exp.tag.toUpperCase(), exp.id, exp.classes, exp.attributes, exp.pseudos)) return true;
			simpleExpCounter++;
		}
	}

	if (simpleExpCounter == parsed.length) return false;

	var nodes = this.search(this.document, parsed), item;
	for (i = 0; item = nodes[i++];){
		if (item === node) return true;
	}
	return false;
};

local.matchPseudo = function(node, name, argument){
	var pseudoName = 'pseudo:' + name;
	if (this[pseudoName]) return this[pseudoName](node, argument);
	var attribute = this.getAttribute(node, name);
	return (argument) ? argument == attribute : !!attribute;
};

local.matchSelector = function(node, tag, id, classes, attributes, pseudos){
	if (tag){
		var nodeName = (this.isXMLDocument) ? node.nodeName : node.nodeName.toUpperCase();
		if (tag == '*'){
			if (nodeName < '@') return false; // Fix for comment nodes and closed nodes
		} else {
			if (nodeName != tag) return false;
		}
	}

	if (id && node.getAttribute('id') != id) return false;

	var i, part, cls;
	if (classes) for (i = classes.length; i--;){
		cls = this.getAttribute(node, 'class');
		if (!(cls && classes[i].regexp.test(cls))) return false;
	}
	if (attributes) for (i = attributes.length; i--;){
		part = attributes[i];
		if (part.operator ? !part.test(this.getAttribute(node, part.key)) : !this.hasAttribute(node, part.key)) return false;
	}
	if (pseudos) for (i = pseudos.length; i--;){
		part = pseudos[i];
		if (!this.matchPseudo(node, part.key, part.value)) return false;
	}
	return true;
};

var combinators = {

	' ': function(node, tag, id, classes, attributes, pseudos, classList){ // all child nodes, any level

		var i, item, children;

		if (this.isHTMLDocument){
			getById: if (id){
				item = this.document.getElementById(id);
				if ((!item && node.all) || (this.idGetsName && item && item.getAttributeNode('id').nodeValue != id)){
					// all[id] returns all the elements with that name or id inside node
					// if theres just one it will return the element, else it will be a collection
					children = node.all[id];
					if (!children) return;
					if (!children[0]) children = [children];
					for (i = 0; item = children[i++];){
						var idNode = item.getAttributeNode('id');
						if (idNode && idNode.nodeValue == id){
							this.push(item, tag, null, classes, attributes, pseudos);
							break;
						}
					}
					return;
				}
				if (!item){
					// if the context is in the dom we return, else we will try GEBTN, breaking the getById label
					if (this.contains(this.root, node)) return;
					else break getById;
				} else if (this.document !== node && !this.contains(node, item)) return;
				this.push(item, tag, null, classes, attributes, pseudos);
				return;
			}
			getByClass: if (classes && node.getElementsByClassName && !this.brokenGEBCN){
				children = node.getElementsByClassName(classList.join(' '));
				if (!(children && children.length)) break getByClass;
				for (i = 0; item = children[i++];) this.push(item, tag, id, null, attributes, pseudos);
				return;
			}
		}
		getByTag: {
			children = node.getElementsByTagName(tag);
			if (!(children && children.length)) break getByTag;
			if (!this.brokenStarGEBTN) tag = null;
			for (i = 0; item = children[i++];) this.push(item, tag, id, classes, attributes, pseudos);
		}
	},

	'>': function(node, tag, id, classes, attributes, pseudos){ // direct children
		if ((node = node.firstChild)) do {
			if (node.nodeType == 1) this.push(node, tag, id, classes, attributes, pseudos);
		} while ((node = node.nextSibling));
	},

	'+': function(node, tag, id, classes, attributes, pseudos){ // next sibling
		while ((node = node.nextSibling)) if (node.nodeType == 1){
			this.push(node, tag, id, classes, attributes, pseudos);
			break;
		}
	},

	'^': function(node, tag, id, classes, attributes, pseudos){ // first child
		node = node.firstChild;
		if (node){
			if (node.nodeType == 1) this.push(node, tag, id, classes, attributes, pseudos);
			else this['combinator:+'](node, tag, id, classes, attributes, pseudos);
		}
	},

	'~': function(node, tag, id, classes, attributes, pseudos){ // next siblings
		while ((node = node.nextSibling)){
			if (node.nodeType != 1) continue;
			var uid = this.getUID(node);
			if (this.bitUniques[uid]) break;
			this.bitUniques[uid] = true;
			this.push(node, tag, id, classes, attributes, pseudos);
		}
	},

	'++': function(node, tag, id, classes, attributes, pseudos){ // next sibling and previous sibling
		this['combinator:+'](node, tag, id, classes, attributes, pseudos);
		this['combinator:!+'](node, tag, id, classes, attributes, pseudos);
	},

	'~~': function(node, tag, id, classes, attributes, pseudos){ // next siblings and previous siblings
		this['combinator:~'](node, tag, id, classes, attributes, pseudos);
		this['combinator:!~'](node, tag, id, classes, attributes, pseudos);
	},

	'!': function(node, tag, id, classes, attributes, pseudos){ // all parent nodes up to document
		while ((node = node.parentNode)) if (node !== this.document) this.push(node, tag, id, classes, attributes, pseudos);
	},

	'!>': function(node, tag, id, classes, attributes, pseudos){ // direct parent (one level)
		node = node.parentNode;
		if (node !== this.document) this.push(node, tag, id, classes, attributes, pseudos);
	},

	'!+': function(node, tag, id, classes, attributes, pseudos){ // previous sibling
		while ((node = node.previousSibling)) if (node.nodeType == 1){
			this.push(node, tag, id, classes, attributes, pseudos);
			break;
		}
	},

	'!^': function(node, tag, id, classes, attributes, pseudos){ // last child
		node = node.lastChild;
		if (node){
			if (node.nodeType == 1) this.push(node, tag, id, classes, attributes, pseudos);
			else this['combinator:!+'](node, tag, id, classes, attributes, pseudos);
		}
	},

	'!~': function(node, tag, id, classes, attributes, pseudos){ // previous siblings
		while ((node = node.previousSibling)){
			if (node.nodeType != 1) continue;
			var uid = this.getUID(node);
			if (this.bitUniques[uid]) break;
			this.bitUniques[uid] = true;
			this.push(node, tag, id, classes, attributes, pseudos);
		}
	}

};

for (var c in combinators) local['combinator:' + c] = combinators[c];

var pseudos = {

	/*<pseudo-selectors>*/

	'empty': function(node){
		var child = node.firstChild;
		return !(child && child.nodeType == 1) && !(node.innerText || node.textContent || '').length;
	},

	'not': function(node, expression){
		return !this.matchNode(node, expression);
	},

	'contains': function(node, text){
		return (node.innerText || node.textContent || '').indexOf(text) > -1;
	},

	'first-child': function(node){
		while ((node = node.previousSibling)) if (node.nodeType == 1) return false;
		return true;
	},

	'last-child': function(node){
		while ((node = node.nextSibling)) if (node.nodeType == 1) return false;
		return true;
	},

	'only-child': function(node){
		var prev = node;
		while ((prev = prev.previousSibling)) if (prev.nodeType == 1) return false;
		var next = node;
		while ((next = next.nextSibling)) if (next.nodeType == 1) return false;
		return true;
	},

	/*<nth-pseudo-selectors>*/

	'nth-child': local.createNTHPseudo('firstChild', 'nextSibling', 'posNTH'),

	'nth-last-child': local.createNTHPseudo('lastChild', 'previousSibling', 'posNTHLast'),

	'nth-of-type': local.createNTHPseudo('firstChild', 'nextSibling', 'posNTHType', true),

	'nth-last-of-type': local.createNTHPseudo('lastChild', 'previousSibling', 'posNTHTypeLast', true),

	'index': function(node, index){
		return this['pseudo:nth-child'](node, '' + (index + 1));
	},

	'even': function(node){
		return this['pseudo:nth-child'](node, '2n');
	},

	'odd': function(node){
		return this['pseudo:nth-child'](node, '2n+1');
	},

	/*</nth-pseudo-selectors>*/

	/*<of-type-pseudo-selectors>*/

	'first-of-type': function(node){
		var nodeName = node.nodeName;
		while ((node = node.previousSibling)) if (node.nodeName == nodeName) return false;
		return true;
	},

	'last-of-type': function(node){
		var nodeName = node.nodeName;
		while ((node = node.nextSibling)) if (node.nodeName == nodeName) return false;
		return true;
	},

	'only-of-type': function(node){
		var prev = node, nodeName = node.nodeName;
		while ((prev = prev.previousSibling)) if (prev.nodeName == nodeName) return false;
		var next = node;
		while ((next = next.nextSibling)) if (next.nodeName == nodeName) return false;
		return true;
	},

	/*</of-type-pseudo-selectors>*/

	// custom pseudos

	'enabled': function(node){
		return !node.disabled;
	},

	'disabled': function(node){
		return node.disabled;
	},

	'checked': function(node){
		return node.checked || node.selected;
	},

	'focus': function(node){
		return this.isHTMLDocument && this.document.activeElement === node && (node.href || node.type || this.hasAttribute(node, 'tabindex'));
	},

	'root': function(node){
		return (node === this.root);
	},

	'selected': function(node){
		return node.selected;
	}

	/*</pseudo-selectors>*/
};

for (var p in pseudos) local['pseudo:' + p] = pseudos[p];

// attributes methods

var attributeGetters = local.attributeGetters = {

	'for': function(){
		return ('htmlFor' in this) ? this.htmlFor : this.getAttribute('for');
	},

	'href': function(){
		return ('href' in this) ? this.getAttribute('href', 2) : this.getAttribute('href');
	},

	'style': function(){
		return (this.style) ? this.style.cssText : this.getAttribute('style');
	},

	'tabindex': function(){
		var attributeNode = this.getAttributeNode('tabindex');
		return (attributeNode && attributeNode.specified) ? attributeNode.nodeValue : null;
	},

	'type': function(){
		return this.getAttribute('type');
	},

	'maxlength': function(){
		var attributeNode = this.getAttributeNode('maxLength');
		return (attributeNode && attributeNode.specified) ? attributeNode.nodeValue : null;
	}

};

attributeGetters.MAXLENGTH = attributeGetters.maxLength = attributeGetters.maxlength;

// Slick

var Slick = local.Slick = (this.Slick || {});

Slick.version = '1.1.7';

// Slick finder

Slick.search = function(context, expression, append){
	return local.search(context, expression, append);
};

Slick.find = function(context, expression){
	return local.search(context, expression, null, true);
};

// Slick containment checker

Slick.contains = function(container, node){
	local.setDocument(container);
	return local.contains(container, node);
};

// Slick attribute getter

Slick.getAttribute = function(node, name){
	local.setDocument(node);
	return local.getAttribute(node, name);
};

Slick.hasAttribute = function(node, name){
	local.setDocument(node);
	return local.hasAttribute(node, name);
};

// Slick matcher

Slick.match = function(node, selector){
	if (!(node && selector)) return false;
	if (!selector || selector === node) return true;
	local.setDocument(node);
	return local.matchNode(node, selector);
};

// Slick attribute accessor

Slick.defineAttributeGetter = function(name, fn){
	local.attributeGetters[name] = fn;
	return this;
};

Slick.lookupAttributeGetter = function(name){
	return local.attributeGetters[name];
};

// Slick pseudo accessor

Slick.definePseudo = function(name, fn){
	local['pseudo:' + name] = function(node, argument){
		return fn.call(node, argument);
	};
	return this;
};

Slick.lookupPseudo = function(name){
	var pseudo = local['pseudo:' + name];
	if (pseudo) return function(argument){
		return pseudo.call(this, argument);
	};
	return null;
};

// Slick overrides accessor

Slick.override = function(regexp, fn){
	local.override(regexp, fn);
	return this;
};

Slick.isXML = local.isXML;

Slick.uidOf = function(node){
	return local.getUIDHTML(node);
};

if (!this.Slick) this.Slick = Slick;

}).apply(/*<CommonJS>*/(typeof exports != 'undefined') ? exports : /*</CommonJS>*/this);

/*
---

name: Element

description: One of the most important items in MooTools. Contains the dollar function, the dollars function, and an handful of cross-browser, time-saver methods to let you easily work with HTML Elements.

license: MIT-style license.

requires: [Window, Document, Array, String, Function, Object, Number, Slick.Parser, Slick.Finder]

provides: [Element, Elements, $, $$, IFrame, Selectors]

...
*/

var Element = this.Element = function(tag, props){
	var konstructor = Element.Constructors[tag];
	if (konstructor) return konstructor(props);
	if (typeof tag != 'string') return document.id(tag).set(props);

	if (!props) props = {};

	if (!(/^[\w-]+$/).test(tag)){
		var parsed = Slick.parse(tag).expressions[0][0];
		tag = (parsed.tag == '*') ? 'div' : parsed.tag;
		if (parsed.id && props.id == null) props.id = parsed.id;

		var attributes = parsed.attributes;
		if (attributes) for (var attr, i = 0, l = attributes.length; i < l; i++){
			attr = attributes[i];
			if (props[attr.key] != null) continue;

			if (attr.value != null && attr.operator == '=') props[attr.key] = attr.value;
			else if (!attr.value && !attr.operator) props[attr.key] = true;
		}

		if (parsed.classList && props['class'] == null) props['class'] = parsed.classList.join(' ');
	}

	return document.newElement(tag, props);
};


if (Browser.Element){
	Element.prototype = Browser.Element.prototype;
	// IE8 and IE9 require the wrapping.
	Element.prototype._fireEvent = (function(fireEvent){
		return function(type, event){
			return fireEvent.call(this, type, event);
		};
	})(Element.prototype.fireEvent);
}

new Type('Element', Element).mirror(function(name){
	if (Array.prototype[name]) return;

	var obj = {};
	obj[name] = function(){
		var results = [], args = arguments, elements = true;
		for (var i = 0, l = this.length; i < l; i++){
			var element = this[i], result = results[i] = element[name].apply(element, args);
			elements = (elements && typeOf(result) == 'element');
		}
		return (elements) ? new Elements(results) : results;
	};

	Elements.implement(obj);
});

if (!Browser.Element){
	Element.parent = Object;

	Element.Prototype = {
		'$constructor': Element,
		'$family': Function.convert('element').hide()
	};

	Element.mirror(function(name, method){
		Element.Prototype[name] = method;
	});
}

Element.Constructors = {};



var IFrame = new Type('IFrame', function(){
	var params = Array.link(arguments, {
		properties: Type.isObject,
		iframe: function(obj){
			return (obj != null);
		}
	});

	var props = params.properties || {}, iframe;
	if (params.iframe) iframe = document.id(params.iframe);
	var onload = props.onload || function(){};
	delete props.onload;
	props.id = props.name = [props.id, props.name, iframe ? (iframe.id || iframe.name) : 'IFrame_' + String.uniqueID()].pick();
	iframe = new Element(iframe || 'iframe', props);

	var onLoad = function(){
		onload.call(iframe.contentWindow);
	};

	if (window.frames[props.id]) onLoad();
	else iframe.addListener('load', onLoad);
	return iframe;
});

var Elements = this.Elements = function(nodes){
	if (nodes && nodes.length){
		var uniques = {}, node;
		for (var i = 0; node = nodes[i++];){
			var uid = Slick.uidOf(node);
			if (!uniques[uid]){
				uniques[uid] = true;
				this.push(node);
			}
		}
	}
};

Elements.prototype = {length: 0};
Elements.parent = Array;

new Type('Elements', Elements).implement({

	filter: function(filter, bind){
		if (!filter) return this;
		return new Elements(Array.filter(this, (typeOf(filter) == 'string') ? function(item){
			return item.match(filter);
		} : filter, bind));
	}.protect(),

	push: function(){
		var length = this.length;
		for (var i = 0, l = arguments.length; i < l; i++){
			var item = document.id(arguments[i]);
			if (item) this[length++] = item;
		}
		return (this.length = length);
	}.protect(),

	unshift: function(){
		var items = [];
		for (var i = 0, l = arguments.length; i < l; i++){
			var item = document.id(arguments[i]);
			if (item) items.push(item);
		}
		return Array.prototype.unshift.apply(this, items);
	}.protect(),

	concat: function(){
		var newElements = new Elements(this);
		for (var i = 0, l = arguments.length; i < l; i++){
			var item = arguments[i];
			if (Type.isEnumerable(item)) newElements.append(item);
			else newElements.push(item);
		}
		return newElements;
	}.protect(),

	append: function(collection){
		for (var i = 0, l = collection.length; i < l; i++) this.push(collection[i]);
		return this;
	}.protect(),

	empty: function(){
		while (this.length) delete this[--this.length];
		return this;
	}.protect()

});



(function(){

// FF, IE
var splice = Array.prototype.splice, object = {'0': 0, '1': 1, length: 2};

splice.call(object, 1, 1);
if (object[1] == 1) Elements.implement('splice', function(){
	var length = this.length;
	var result = splice.apply(this, arguments);
	while (length >= this.length) delete this[length--];
	return result;
}.protect());

Array.forEachMethod(function(method, name){
	Elements.implement(name, method);
});

Array.mirror(Elements);

/*<ltIE8>*/
var createElementAcceptsHTML;
try {
	createElementAcceptsHTML = (document.createElement('<input name=x>').name == 'x');
} catch (e){}

var escapeQuotes = function(html){
	return ('' + html).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
};
/*</ltIE8>*/

/*<ltIE9>*/
// #2479 - IE8 Cannot set HTML of style element
var canChangeStyleHTML = (function(){
	var div = document.createElement('style'),
		flag = false;
	try {
		div.innerHTML = '#justTesing{margin: 0px;}';
		flag = !!div.innerHTML;
	} catch (e){}
	return flag;
})();
/*</ltIE9>*/

Document.implement({

	newElement: function(tag, props){
		if (props){
			if (props.checked != null) props.defaultChecked = props.checked;
			if ((props.type == 'checkbox' || props.type == 'radio') && props.value == null) props.value = 'on';
			/*<ltIE9>*/ // IE needs the type to be set before changing content of style element
			if (!canChangeStyleHTML && tag == 'style'){
				var styleElement = document.createElement('style');
				styleElement.setAttribute('type', 'text/css');
				if (props.type) delete props.type;
				return this.id(styleElement).set(props);
			}
			/*</ltIE9>*/
			/*<ltIE8>*/// Fix for readonly name and type properties in IE < 8
			if (createElementAcceptsHTML){
				tag = '<' + tag;
				if (props.name) tag += ' name="' + escapeQuotes(props.name) + '"';
				if (props.type) tag += ' type="' + escapeQuotes(props.type) + '"';
				tag += '>';
				delete props.name;
				delete props.type;
			}
			/*</ltIE8>*/
		}
		return this.id(this.createElement(tag)).set(props);
	}

});

})();

(function(){

Slick.uidOf(window);
Slick.uidOf(document);

Document.implement({

	newTextNode: function(text){
		return this.createTextNode(text);
	},

	getDocument: function(){
		return this;
	},

	getWindow: function(){
		return this.window;
	},

	id: (function(){

		var types = {

			string: function(id, nocash, doc){
				id = Slick.find(doc, '#' + id.replace(/(\W)/g, '\\$1'));
				return (id) ? types.element(id, nocash) : null;
			},

			element: function(el, nocash){
				Slick.uidOf(el);
				if (!nocash && !el.$family && !(/^(?:object|embed)$/i).test(el.tagName)){
					var fireEvent = el.fireEvent;
					// wrapping needed in IE7, or else crash
					el._fireEvent = function(type, event){
						return fireEvent(type, event);
					};
					Object.append(el, Element.Prototype);
				}
				return el;
			},

			object: function(obj, nocash, doc){
				if (obj.toElement) return types.element(obj.toElement(doc), nocash);
				return null;
			}

		};

		types.textnode = types.whitespace = types.window = types.document = function(zero){
			return zero;
		};

		return function(el, nocash, doc){
			if (el && el.$family && el.uniqueNumber) return el;
			var type = typeOf(el);
			return (types[type]) ? types[type](el, nocash, doc || document) : null;
		};

	})()

});

if (window.$ == null) Window.implement('$', function(el, nc){
	return document.id(el, nc, this.document);
});

Window.implement({

	getDocument: function(){
		return this.document;
	},

	getWindow: function(){
		return this;
	}

});

[Document, Element].invoke('implement', {

	getElements: function(expression){
		return Slick.search(this, expression, new Elements);
	},

	getElement: function(expression){
		return document.id(Slick.find(this, expression));
	}

});

var contains = {contains: function(element){
	return Slick.contains(this, element);
}};

if (!document.contains) Document.implement(contains);
if (!document.createElement('div').contains) Element.implement(contains);



// tree walking

var injectCombinator = function(expression, combinator){
	if (!expression) return combinator;

	expression = Object.clone(Slick.parse(expression));

	var expressions = expression.expressions;
	for (var i = expressions.length; i--;)
		expressions[i][0].combinator = combinator;

	return expression;
};

Object.forEach({
	getNext: '~',
	getPrevious: '!~',
	getParent: '!'
}, function(combinator, method){
	Element.implement(method, function(expression){
		return this.getElement(injectCombinator(expression, combinator));
	});
});

Object.forEach({
	getAllNext: '~',
	getAllPrevious: '!~',
	getSiblings: '~~',
	getChildren: '>',
	getParents: '!'
}, function(combinator, method){
	Element.implement(method, function(expression){
		return this.getElements(injectCombinator(expression, combinator));
	});
});

Element.implement({

	getFirst: function(expression){
		return document.id(Slick.search(this, injectCombinator(expression, '>'))[0]);
	},

	getLast: function(expression){
		return document.id(Slick.search(this, injectCombinator(expression, '>')).getLast());
	},

	getWindow: function(){
		return this.ownerDocument.window;
	},

	getDocument: function(){
		return this.ownerDocument;
	},

	getElementById: function(id){
		return document.id(Slick.find(this, '#' + ('' + id).replace(/(\W)/g, '\\$1')));
	},

	match: function(expression){
		return !expression || Slick.match(this, expression);
	}

});



if (window.$$ == null) Window.implement('$$', function(selector){
	if (arguments.length == 1){
		if (typeof selector == 'string') return Slick.search(this.document, selector, new Elements);
		else if (Type.isEnumerable(selector)) return new Elements(selector);
	}
	return new Elements(arguments);
});

// Inserters

var inserters = {

	before: function(context, element){
		var parent = element.parentNode;
		if (parent) parent.insertBefore(context, element);
	},

	after: function(context, element){
		var parent = element.parentNode;
		if (parent) parent.insertBefore(context, element.nextSibling);
	},

	bottom: function(context, element){
		element.appendChild(context);
	},

	top: function(context, element){
		element.insertBefore(context, element.firstChild);
	}

};

inserters.inside = inserters.bottom;



// getProperty / setProperty

var propertyGetters = {}, propertySetters = {};

// properties

var properties = {};
Array.forEach([
	'type', 'value', 'defaultValue', 'accessKey', 'cellPadding', 'cellSpacing', 'colSpan',
	'frameBorder', 'rowSpan', 'tabIndex', 'useMap'
], function(property){
	properties[property.toLowerCase()] = property;
});

properties.html = 'innerHTML';
properties.text = (document.createElement('div').textContent == null) ? 'innerText': 'textContent';

Object.forEach(properties, function(real, key){
	propertySetters[key] = function(node, value){
		node[real] = value;
	};
	propertyGetters[key] = function(node){
		return node[real];
	};
});

/*<ltIE9>*/
propertySetters.text = (function(){
	return function(node, value){
		if (node.get('tag') == 'style') node.set('html', value);
		else node[properties.text] = value;
	};
})(propertySetters.text);

propertyGetters.text = (function(getter){
	return function(node){
		return (node.get('tag') == 'style') ? node.innerHTML : getter(node);
	};
})(propertyGetters.text);
/*</ltIE9>*/

// Booleans

var bools = [
	'compact', 'nowrap', 'ismap', 'declare', 'noshade', 'checked',
	'disabled', 'readOnly', 'multiple', 'selected', 'noresize',
	'defer', 'defaultChecked', 'autofocus', 'controls', 'autoplay',
	'loop'
];

var booleans = {};
Array.forEach(bools, function(bool){
	var lower = bool.toLowerCase();
	booleans[lower] = bool;
	propertySetters[lower] = function(node, value){
		node[bool] = !!value;
	};
	propertyGetters[lower] = function(node){
		return !!node[bool];
	};
});

// Special cases

Object.append(propertySetters, {

	'class': function(node, value){
		('className' in node) ? node.className = (value || '') : node.setAttribute('class', value);
	},

	'for': function(node, value){
		('htmlFor' in node) ? node.htmlFor = value : node.setAttribute('for', value);
	},

	'style': function(node, value){
		(node.style) ? node.style.cssText = value : node.setAttribute('style', value);
	},

	'value': function(node, value){
		node.value = (value != null) ? value : '';
	}

});

propertyGetters['class'] = function(node){
	return ('className' in node) ? node.className || null : node.getAttribute('class');
};

/* <webkit> */
var el = document.createElement('button');
// IE sets type as readonly and throws
try { el.type = 'button'; } catch (e){}
if (el.type != 'button') propertySetters.type = function(node, value){
	node.setAttribute('type', value);
};
el = null;
/* </webkit> */

/*<IE>*/

/*<ltIE9>*/
// #2479 - IE8 Cannot set HTML of style element
var canChangeStyleHTML = (function(){
	var div = document.createElement('style'),
		flag = false;
	try {
		div.innerHTML = '#justTesing{margin: 0px;}';
		flag = !!div.innerHTML;
	} catch (e){}
	return flag;
})();
/*</ltIE9>*/

var input = document.createElement('input'), volatileInputValue, html5InputSupport;

// #2178
input.value = 't';
input.type = 'submit';
volatileInputValue = input.value != 't';

// #2443 - IE throws "Invalid Argument" when trying to use html5 input types
try {
	input.value = '';
	input.type = 'email';
	html5InputSupport = input.type == 'email';
} catch (e){}

input = null;

if (volatileInputValue || !html5InputSupport) propertySetters.type = function(node, type){
	try {
		var value = node.value;
		node.type = type;
		node.value = value;
	} catch (e){}
};
/*</IE>*/

/* getProperty, setProperty */

/* <ltIE9> */
var pollutesGetAttribute = (function(div){
	div.random = 'attribute';
	return (div.getAttribute('random') == 'attribute');
})(document.createElement('div'));

var hasCloneBug = (function(test){
	test.innerHTML = '<object><param name="should_fix" value="the unknown" /></object>';
	return test.cloneNode(true).firstChild.childNodes.length != 1;
})(document.createElement('div'));
/* </ltIE9> */

var hasClassList = !!document.createElement('div').classList;

var classes = function(className){
	var classNames = (className || '').clean().split(' '), uniques = {};
	return classNames.filter(function(className){
		if (className !== '' && !uniques[className]) return uniques[className] = className;
	});
};

var addToClassList = function(name){
	this.classList.add(name);
};

var removeFromClassList = function(name){
	this.classList.remove(name);
};

Element.implement({

	setProperty: function(name, value){
		var setter = propertySetters[name.toLowerCase()];
		if (setter){
			setter(this, value);
		} else {
			/* <ltIE9> */
			var attributeWhiteList;
			if (pollutesGetAttribute) attributeWhiteList = this.retrieve('$attributeWhiteList', {});
			/* </ltIE9> */

			if (value == null){
				this.removeAttribute(name);
				/* <ltIE9> */
				if (pollutesGetAttribute) delete attributeWhiteList[name];
				/* </ltIE9> */
			} else {
				this.setAttribute(name, '' + value);
				/* <ltIE9> */
				if (pollutesGetAttribute) attributeWhiteList[name] = true;
				/* </ltIE9> */
			}
		}
		return this;
	},

	setProperties: function(attributes){
		for (var attribute in attributes) this.setProperty(attribute, attributes[attribute]);
		return this;
	},

	getProperty: function(name){
		var getter = propertyGetters[name.toLowerCase()];
		if (getter) return getter(this);
		/* <ltIE9> */
		if (pollutesGetAttribute){
			var attr = this.getAttributeNode(name), attributeWhiteList = this.retrieve('$attributeWhiteList', {});
			if (!attr) return null;
			if (attr.expando && !attributeWhiteList[name]){
				var outer = this.outerHTML;
				// segment by the opening tag and find mention of attribute name
				if (outer.substr(0, outer.search(/\/?['"]?>(?![^<]*<['"])/)).indexOf(name) < 0) return null;
				attributeWhiteList[name] = true;
			}
		}
		/* </ltIE9> */
		var result = Slick.getAttribute(this, name);
		return (!result && !Slick.hasAttribute(this, name)) ? null : result;
	},

	getProperties: function(){
		var args = Array.convert(arguments);
		return args.map(this.getProperty, this).associate(args);
	},

	removeProperty: function(name){
		return this.setProperty(name, null);
	},

	removeProperties: function(){
		Array.each(arguments, this.removeProperty, this);
		return this;
	},

	set: function(prop, value){
		var property = Element.Properties[prop];
		(property && property.set) ? property.set.call(this, value) : this.setProperty(prop, value);
	}.overloadSetter(),

	get: function(prop){
		var property = Element.Properties[prop];
		return (property && property.get) ? property.get.apply(this) : this.getProperty(prop);
	}.overloadGetter(),

	erase: function(prop){
		var property = Element.Properties[prop];
		(property && property.erase) ? property.erase.apply(this) : this.removeProperty(prop);
		return this;
	},

	hasClass: hasClassList ? function(className){
		return this.classList.contains(className);
	} : function(className){
		return classes(this.className).contains(className);
	},

	addClass: hasClassList ? function(className){
		classes(className).forEach(addToClassList, this);
		return this;
	} : function(className){
		this.className = classes(className + ' ' + this.className).join(' ');
		return this;
	},

	removeClass: hasClassList ? function(className){
		classes(className).forEach(removeFromClassList, this);
		return this;
	} : function(className){
		var classNames = classes(this.className);
		classes(className).forEach(classNames.erase, classNames);
		this.className = classNames.join(' ');
		return this;
	},

	toggleClass: function(className, force){
		if (force == null) force = !this.hasClass(className);
		return (force) ? this.addClass(className) : this.removeClass(className);
	},

	adopt: function(){
		var parent = this, fragment, elements = Array.flatten(arguments), length = elements.length;
		if (length > 1) parent = fragment = document.createDocumentFragment();

		for (var i = 0; i < length; i++){
			var element = document.id(elements[i], true);
			if (element) parent.appendChild(element);
		}

		if (fragment) this.appendChild(fragment);

		return this;
	},

	appendText: function(text, where){
		return this.grab(this.getDocument().newTextNode(text), where);
	},

	grab: function(el, where){
		inserters[where || 'bottom'](document.id(el, true), this);
		return this;
	},

	inject: function(el, where){
		inserters[where || 'bottom'](this, document.id(el, true));
		return this;
	},

	replaces: function(el){
		el = document.id(el, true);
		el.parentNode.replaceChild(this, el);
		return this;
	},

	wraps: function(el, where){
		el = document.id(el, true);
		return this.replaces(el).grab(el, where);
	},

	getSelected: function(){
		this.selectedIndex; // Safari 3.2.1
		return new Elements(Array.convert(this.options).filter(function(option){
			return option.selected;
		}));
	},

	toQueryString: function(){
		var queryString = [];
		this.getElements('input, select, textarea').each(function(el){
			var type = el.type;
			if (!el.name || el.disabled || type == 'submit' || type == 'reset' || type == 'file' || type == 'image') return;

			var value = (el.get('tag') == 'select') ? el.getSelected().map(function(opt){
				// IE
				return document.id(opt).get('value');
			}) : ((type == 'radio' || type == 'checkbox') && !el.checked) ? null : el.get('value');

			Array.convert(value).each(function(val){
				if (typeof val != 'undefined') queryString.push(encodeURIComponent(el.name) + '=' + encodeURIComponent(val));
			});
		});
		return queryString.join('&');
	}

});


// appendHTML

var appendInserters = {
	before: 'beforeBegin',
	after: 'afterEnd',
	bottom: 'beforeEnd',
	top: 'afterBegin',
	inside: 'beforeEnd'
};

Element.implement('appendHTML', ('insertAdjacentHTML' in document.createElement('div')) ? function(html, where){
	this.insertAdjacentHTML(appendInserters[where || 'bottom'], html);
	return this;
} : function(html, where){
	var temp = new Element('div', {html: html}),
		children = temp.childNodes,
		fragment = temp.firstChild;

	if (!fragment) return this;
	if (children.length > 1){
		fragment = document.createDocumentFragment();
		for (var i = 0, l = children.length; i < l; i++){
			fragment.appendChild(children[i]);
		}
	}

	inserters[where || 'bottom'](fragment, this);
	return this;
});

var collected = {}, storage = {};

var get = function(uid){
	return (storage[uid] || (storage[uid] = {}));
};

var clean = function(item){
	var uid = item.uniqueNumber;
	if (item.removeEvents) item.removeEvents();
	if (item.clearAttributes) item.clearAttributes();
	if (uid != null){
		delete collected[uid];
		delete storage[uid];
	}
	return item;
};

var formProps = {input: 'checked', option: 'selected', textarea: 'value'};

Element.implement({

	destroy: function(){
		var children = clean(this).getElementsByTagName('*');
		Array.each(children, clean);
		Element.dispose(this);
		return null;
	},

	empty: function(){
		Array.convert(this.childNodes).each(Element.dispose);
		return this;
	},

	dispose: function(){
		return (this.parentNode) ? this.parentNode.removeChild(this) : this;
	},

	clone: function(contents, keepid){
		contents = contents !== false;
		var clone = this.cloneNode(contents), ce = [clone], te = [this], i;

		if (contents){
			ce.append(Array.convert(clone.getElementsByTagName('*')));
			te.append(Array.convert(this.getElementsByTagName('*')));
		}

		for (i = ce.length; i--;){
			var node = ce[i], element = te[i];
			if (!keepid) node.removeAttribute('id');
			/*<ltIE9>*/
			if (node.clearAttributes){
				node.clearAttributes();
				node.mergeAttributes(element);
				node.removeAttribute('uniqueNumber');
				if (node.options){
					var no = node.options, eo = element.options;
					for (var j = no.length; j--;) no[j].selected = eo[j].selected;
				}
			}
			/*</ltIE9>*/
			var prop = formProps[element.tagName.toLowerCase()];
			if (prop && element[prop]) node[prop] = element[prop];
		}

		/*<ltIE9>*/
		if (hasCloneBug){
			var co = clone.getElementsByTagName('object'), to = this.getElementsByTagName('object');
			for (i = co.length; i--;) co[i].outerHTML = to[i].outerHTML;
		}
		/*</ltIE9>*/
		return document.id(clone);
	}

});

[Element, Window, Document].invoke('implement', {

	addListener: function(type, fn){
		if (window.attachEvent && !window.addEventListener){
			collected[Slick.uidOf(this)] = this;
		}
		if (this.addEventListener) this.addEventListener(type, fn, !!arguments[2]);
		else this.attachEvent('on' + type, fn);
		return this;
	},

	removeListener: function(type, fn){
		if (this.removeEventListener) this.removeEventListener(type, fn, !!arguments[2]);
		else this.detachEvent('on' + type, fn);
		return this;
	},

	retrieve: function(property, dflt){
		var storage = get(Slick.uidOf(this)), prop = storage[property];
		if (dflt != null && prop == null) prop = storage[property] = dflt;
		return prop != null ? prop : null;
	},

	store: function(property, value){
		var storage = get(Slick.uidOf(this));
		storage[property] = value;
		return this;
	},

	eliminate: function(property){
		var storage = get(Slick.uidOf(this));
		delete storage[property];
		return this;
	}

});

/*<ltIE9>*/
if (window.attachEvent && !window.addEventListener){
	var gc = function(){
		Object.each(collected, clean);
		if (window.CollectGarbage) CollectGarbage();
		window.removeListener('unload', gc);
	};
	window.addListener('unload', gc);
}
/*</ltIE9>*/

Element.Properties = {};



Element.Properties.style = {

	set: function(style){
		this.style.cssText = style;
	},

	get: function(){
		return this.style.cssText;
	},

	erase: function(){
		this.style.cssText = '';
	}

};

Element.Properties.tag = {

	get: function(){
		return this.tagName.toLowerCase();
	}

};

Element.Properties.html = {

	set: function(html){
		if (html == null) html = '';
		else if (typeOf(html) == 'array') html = html.join('');

		/*<ltIE9>*/
		if (this.styleSheet && !canChangeStyleHTML) this.styleSheet.cssText = html;
		else /*</ltIE9>*/this.innerHTML = html;
	},
	erase: function(){
		this.set('html', '');
	}

};

var supportsHTML5Elements = true, supportsTableInnerHTML = true, supportsTRInnerHTML = true;

/*<ltIE9>*/
// technique by jdbarlett - http://jdbartlett.com/innershiv/
var div = document.createElement('div');
var fragment;
div.innerHTML = '<nav></nav>';
supportsHTML5Elements = (div.childNodes.length == 1);
if (!supportsHTML5Elements){
	var tags = 'abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video'.split(' ');
	fragment = document.createDocumentFragment(), l = tags.length;
	while (l--) fragment.createElement(tags[l]);
}
div = null;
/*</ltIE9>*/

/*<IE>*/
supportsTableInnerHTML = Function.attempt(function(){
	var table = document.createElement('table');
	table.innerHTML = '<tr><td></td></tr>';
	return true;
});

/*<ltFF4>*/
var tr = document.createElement('tr'), html = '<td></td>';
tr.innerHTML = html;
supportsTRInnerHTML = (tr.innerHTML == html);
tr = null;
/*</ltFF4>*/

if (!supportsTableInnerHTML || !supportsTRInnerHTML || !supportsHTML5Elements){

	Element.Properties.html.set = (function(set){

		var translations = {
			table: [1, '<table>', '</table>'],
			select: [1, '<select>', '</select>'],
			tbody: [2, '<table><tbody>', '</tbody></table>'],
			tr: [3, '<table><tbody><tr>', '</tr></tbody></table>']
		};

		translations.thead = translations.tfoot = translations.tbody;

		return function(html){

			/*<ltIE9>*/
			if (this.styleSheet) return set.call(this, html);
			/*</ltIE9>*/
			var wrap = translations[this.get('tag')];
			if (!wrap && !supportsHTML5Elements) wrap = [0, '', ''];
			if (!wrap) return set.call(this, html);

			var level = wrap[0], wrapper = document.createElement('div'), target = wrapper;
			if (!supportsHTML5Elements) fragment.appendChild(wrapper);
			wrapper.innerHTML = [wrap[1], html, wrap[2]].flatten().join('');
			while (level--) target = target.firstChild;
			this.empty().adopt(target.childNodes);
			if (!supportsHTML5Elements) fragment.removeChild(wrapper);
			wrapper = null;
		};

	})(Element.Properties.html.set);
}
/*</IE>*/

/*<ltIE9>*/
var testForm = document.createElement('form');
testForm.innerHTML = '<select><option>s</option></select>';

if (testForm.firstChild.value != 's') Element.Properties.value = {

	set: function(value){
		var tag = this.get('tag');
		if (tag != 'select') return this.setProperty('value', value);
		var options = this.getElements('option');
		value = String(value);
		for (var i = 0; i < options.length; i++){
			var option = options[i],
				attr = option.getAttributeNode('value'),
				optionValue = (attr && attr.specified) ? option.value : option.get('text');
			if (optionValue === value) return option.selected = true;
		}
	},

	get: function(){
		var option = this, tag = option.get('tag');

		if (tag != 'select' && tag != 'option') return this.getProperty('value');

		if (tag == 'select' && !(option = option.getSelected()[0])) return '';

		var attr = option.getAttributeNode('value');
		return (attr && attr.specified) ? option.value : option.get('text');
	}

};
testForm = null;
/*</ltIE9>*/

/*<IE>*/
if (document.createElement('div').getAttributeNode('id')) Element.Properties.id = {
	set: function(id){
		this.id = this.getAttributeNode('id').value = id;
	},
	get: function(){
		return this.id || null;
	},
	erase: function(){
		this.id = this.getAttributeNode('id').value = '';
	}
};
/*</IE>*/

})();

/*
---

name: Event

description: Contains the Event Type, to make the event object cross-browser.

license: MIT-style license.

requires: [Window, Document, Array, Function, String, Object]

provides: Event

...
*/

(function(){

var _keys = {};
var normalizeWheelSpeed = function(event){
	var normalized;
	if (event.wheelDelta){
		normalized = event.wheelDelta % 120 == 0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
	} else {
		var rawAmount = event.deltaY || event.detail || 0;
		normalized = -(rawAmount % 3 == 0 ? rawAmount / 3 : rawAmount * 10);
	}
	return normalized;
};

var DOMEvent = this.DOMEvent = new Type('DOMEvent', function(event, win){
	if (!win) win = window;
	event = event || win.event;
	if (event.$extended) return event;
	this.event = event;
	this.$extended = true;
	this.shift = event.shiftKey;
	this.control = event.ctrlKey;
	this.alt = event.altKey;
	this.meta = event.metaKey;
	var type = this.type = event.type;
	var target = event.target || event.srcElement;
	while (target && target.nodeType == 3) target = target.parentNode;
	this.target = document.id(target);

	if (type.indexOf('key') == 0){
		var code = this.code = (event.which || event.keyCode);
		if (!this.shift || type != 'keypress') this.key = _keys[code];
		if (type == 'keydown' || type == 'keyup'){
			if (code > 111 && code < 124) this.key = 'f' + (code - 111);
			else if (code > 95 && code < 106) this.key = code - 96;
		}
		if (this.key == null) this.key = String.fromCharCode(code).toLowerCase();
	} else if (type == 'click' || type == 'dblclick' || type == 'contextmenu' || type == 'wheel' || type == 'DOMMouseScroll' || type.indexOf('mouse') == 0){
		var doc = win.document;
		doc = (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html : doc.body;
		this.page = {
			x: (event.pageX != null) ? event.pageX : event.clientX + doc.scrollLeft,
			y: (event.pageY != null) ? event.pageY : event.clientY + doc.scrollTop
		};
		this.client = {
			x: (event.pageX != null) ? event.pageX - win.pageXOffset : event.clientX,
			y: (event.pageY != null) ? event.pageY - win.pageYOffset : event.clientY
		};
		if (type == 'DOMMouseScroll' || type == 'wheel' || type == 'mousewheel') this.wheel = normalizeWheelSpeed(event);
		this.rightClick = (event.which == 3 || event.button == 2);
		if (type == 'mouseover' || type == 'mouseout' || type == 'mouseenter' || type == 'mouseleave'){
			var overTarget = type == 'mouseover' || type == 'mouseenter';
			var related = event.relatedTarget || event[(overTarget ? 'from' : 'to') + 'Element'];
			while (related && related.nodeType == 3) related = related.parentNode;
			this.relatedTarget = document.id(related);
		}
	} else if (type.indexOf('touch') == 0 || type.indexOf('gesture') == 0){
		this.rotation = event.rotation;
		this.scale = event.scale;
		this.targetTouches = event.targetTouches;
		this.changedTouches = event.changedTouches;
		var touches = this.touches = event.touches;
		if (touches && touches[0]){
			var touch = touches[0];
			this.page = {x: touch.pageX, y: touch.pageY};
			this.client = {x: touch.clientX, y: touch.clientY};
		}
	}

	if (!this.client) this.client = {};
	if (!this.page) this.page = {};
});

DOMEvent.implement({

	stop: function(){
		return this.preventDefault().stopPropagation();
	},

	stopPropagation: function(){
		if (this.event.stopPropagation) this.event.stopPropagation();
		else this.event.cancelBubble = true;
		return this;
	},

	preventDefault: function(){
		if (this.event.preventDefault) this.event.preventDefault();
		else this.event.returnValue = false;
		return this;
	}

});

DOMEvent.defineKey = function(code, key){
	_keys[code] = key;
	return this;
};

DOMEvent.defineKeys = DOMEvent.defineKey.overloadSetter(true);

DOMEvent.defineKeys({
	'38': 'up', '40': 'down', '37': 'left', '39': 'right',
	'27': 'esc', '32': 'space', '8': 'backspace', '9': 'tab',
	'46': 'delete', '13': 'enter'
});

})();





/*
---

name: Element.Event

description: Contains Element methods for dealing with events. This file also includes mouseenter and mouseleave custom Element Events, if necessary.

license: MIT-style license.

requires: [Element, Event]

provides: Element.Event

...
*/

(function(){

Element.Properties.events = {set: function(events){
	this.addEvents(events);
}};

[Element, Window, Document].invoke('implement', {

	addEvent: function(type, fn){
		var events = this.retrieve('events', {});
		if (!events[type]) events[type] = {keys: [], values: []};
		if (events[type].keys.contains(fn)) return this;
		events[type].keys.push(fn);
		var realType = type,
			custom = Element.Events[type],
			condition = fn,
			self = this;
		if (custom){
			if (custom.onAdd) custom.onAdd.call(this, fn, type);
			if (custom.condition){
				condition = function(event){
					if (custom.condition.call(this, event, type)) return fn.call(this, event);
					return true;
				};
			}
			if (custom.base) realType = Function.convert(custom.base).call(this, type);
		}
		var defn = function(){
			return fn.call(self);
		};
		var nativeEvent = Element.NativeEvents[realType];
		if (nativeEvent){
			if (nativeEvent == 2){
				defn = function(event){
					event = new DOMEvent(event, self.getWindow());
					if (condition.call(self, event) === false) event.stop();
				};
			}
			this.addListener(realType, defn, arguments[2]);
		}
		events[type].values.push(defn);
		return this;
	},

	removeEvent: function(type, fn){
		var events = this.retrieve('events');
		if (!events || !events[type]) return this;
		var list = events[type];
		var index = list.keys.indexOf(fn);
		if (index == -1) return this;
		var value = list.values[index];
		delete list.keys[index];
		delete list.values[index];
		var custom = Element.Events[type];
		if (custom){
			if (custom.onRemove) custom.onRemove.call(this, fn, type);
			if (custom.base) type = Function.convert(custom.base).call(this, type);
		}
		return (Element.NativeEvents[type]) ? this.removeListener(type, value, arguments[2]) : this;
	},

	addEvents: function(events){
		for (var event in events) this.addEvent(event, events[event]);
		return this;
	},

	removeEvents: function(events){
		var type;
		if (typeOf(events) == 'object'){
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		var attached = this.retrieve('events');
		if (!attached) return this;
		if (!events){
			for (type in attached) this.removeEvents(type);
			this.eliminate('events');
		} else if (attached[events]){
			attached[events].keys.each(function(fn){
				this.removeEvent(events, fn);
			}, this);
			delete attached[events];
		}
		return this;
	},

	fireEvent: function(type, args, delay){
		var events = this.retrieve('events');
		if (!events || !events[type]) return this;
		args = Array.convert(args);

		events[type].keys.each(function(fn){
			if (delay) fn.delay(delay, this, args);
			else fn.apply(this, args);
		}, this);
		return this;
	},

	cloneEvents: function(from, type){
		from = document.id(from);
		var events = from.retrieve('events');
		if (!events) return this;
		if (!type){
			for (var eventType in events) this.cloneEvents(from, eventType);
		} else if (events[type]){
			events[type].keys.each(function(fn){
				this.addEvent(type, fn);
			}, this);
		}
		return this;
	}

});

Element.NativeEvents = {
	click: 2, dblclick: 2, mouseup: 2, mousedown: 2, contextmenu: 2, //mouse buttons
	wheel: 2, mousewheel: 2, DOMMouseScroll: 2, //mouse wheel
	mouseover: 2, mouseout: 2, mousemove: 2, selectstart: 2, selectend: 2, //mouse movement
	keydown: 2, keypress: 2, keyup: 2, //keyboard
	orientationchange: 2, // mobile
	touchstart: 2, touchmove: 2, touchend: 2, touchcancel: 2, // touch
	gesturestart: 2, gesturechange: 2, gestureend: 2, // gesture
	focus: 2, blur: 2, change: 2, reset: 2, select: 2, submit: 2, paste: 2, input: 2, //form elements
	load: 2, unload: 1, beforeunload: 2, resize: 1, move: 1, DOMContentLoaded: 1, readystatechange: 1, //window
	hashchange: 1, popstate: 2, pageshow: 2, pagehide: 2, // history
	error: 1, abort: 1, scroll: 1, message: 2 //misc
};

Element.Events = {
	mousewheel: {
		base: 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll'
	}
};

var check = function(event){
	var related = event.relatedTarget;
	if (related == null) return true;
	if (!related) return false;
	return (related != this && related.prefix != 'xul' && typeOf(this) != 'document' && !this.contains(related));
};

if ('onmouseenter' in document.documentElement){
	Element.NativeEvents.mouseenter = Element.NativeEvents.mouseleave = 2;
	Element.MouseenterCheck = check;
} else {
	Element.Events.mouseenter = {
		base: 'mouseover',
		condition: check
	};

	Element.Events.mouseleave = {
		base: 'mouseout',
		condition: check
	};
}

/*<ltIE9>*/
if (!window.addEventListener){
	Element.NativeEvents.propertychange = 2;
	Element.Events.change = {
		base: function(){
			var type = this.type;
			return (this.get('tag') == 'input' && (type == 'radio' || type == 'checkbox')) ? 'propertychange' : 'change';
		},
		condition: function(event){
			return event.type != 'propertychange' || event.event.propertyName == 'checked';
		}
	};
}
/*</ltIE9>*/



})();

/*
---

name: Element.Delegation

description: Extends the Element native object to include the delegate method for more efficient event management.

license: MIT-style license.

requires: [Element.Event]

provides: [Element.Delegation]

...
*/

(function(){

var eventListenerSupport = !!window.addEventListener;

Element.NativeEvents.focusin = Element.NativeEvents.focusout = 2;

var bubbleUp = function(self, match, fn, event, target){
	while (target && target != self){
		if (match(target, event)) return fn.call(target, event, target);
		target = document.id(target.parentNode);
	}
};

var map = {
	mouseenter: {
		base: 'mouseover',
		condition: Element.MouseenterCheck
	},
	mouseleave: {
		base: 'mouseout',
		condition: Element.MouseenterCheck
	},
	focus: {
		base: 'focus' + (eventListenerSupport ? '' : 'in'),
		capture: true
	},
	blur: {
		base: eventListenerSupport ? 'blur' : 'focusout',
		capture: true
	}
};

/*<ltIE9>*/
var _key = '$delegation:';
var formObserver = function(type){

	return {

		base: 'focusin',

		remove: function(self, uid){
			var list = self.retrieve(_key + type + 'listeners', {})[uid];
			if (list && list.forms) for (var i = list.forms.length; i--;){
				// the form may have been destroyed, so it won't have the
				// removeEvent method anymore. In that case the event was
				// removed as well.
				if (list.forms[i].removeEvent) list.forms[i].removeEvent(type, list.fns[i]);
			}
		},

		listen: function(self, match, fn, event, target, uid){
			var form = (target.get('tag') == 'form') ? target : event.target.getParent('form');
			if (!form) return;

			var listeners = self.retrieve(_key + type + 'listeners', {}),
				listener = listeners[uid] || {forms: [], fns: []},
				forms = listener.forms, fns = listener.fns;

			if (forms.indexOf(form) != -1) return;
			forms.push(form);

			var _fn = function(event){
				bubbleUp(self, match, fn, event, target);
			};
			form.addEvent(type, _fn);
			fns.push(_fn);

			listeners[uid] = listener;
			self.store(_key + type + 'listeners', listeners);
		}
	};
};

var inputObserver = function(type){
	return {
		base: 'focusin',
		listen: function(self, match, fn, event, target){
			var events = {blur: function(){
				this.removeEvents(events);
			}};
			events[type] = function(event){
				bubbleUp(self, match, fn, event, target);
			};
			event.target.addEvents(events);
		}
	};
};

if (!eventListenerSupport) Object.append(map, {
	submit: formObserver('submit'),
	reset: formObserver('reset'),
	change: inputObserver('change'),
	select: inputObserver('select')
});
/*</ltIE9>*/

var proto = Element.prototype,
	addEvent = proto.addEvent,
	removeEvent = proto.removeEvent;

var relay = function(old, method){
	return function(type, fn, useCapture){
		if (type.indexOf(':relay') == -1) return old.call(this, type, fn, useCapture);
		var parsed = Slick.parse(type).expressions[0][0];
		if (parsed.pseudos[0].key != 'relay') return old.call(this, type, fn, useCapture);
		var newType = parsed.tag;
		parsed.pseudos.slice(1).each(function(pseudo){
			newType += ':' + pseudo.key + (pseudo.value ? '(' + pseudo.value + ')' : '');
		});
		old.call(this, type, fn);
		return method.call(this, newType, parsed.pseudos[0].value, fn);
	};
};

var delegation = {

	addEvent: function(type, match, fn){
		var storage = this.retrieve('$delegates', {}), stored = storage[type];
		if (stored) for (var _uid in stored){
			if (stored[_uid].fn == fn && stored[_uid].match == match) return this;
		}

		var _type = type, _match = match, _fn = fn, _map = map[type] || {};
		type = _map.base || _type;

		match = function(target){
			return Slick.match(target, _match);
		};

		var elementEvent = Element.Events[_type];
		if (_map.condition || elementEvent && elementEvent.condition){
			var __match = match, condition = _map.condition || elementEvent.condition;
			match = function(target, event){
				return __match(target, event) && condition.call(target, event, type);
			};
		}

		var self = this, uid = String.uniqueID();
		var delegator = _map.listen ? function(event, target){
			if (!target && event && event.target) target = event.target;
			if (target) _map.listen(self, match, fn, event, target, uid);
		} : function(event, target){
			if (!target && event && event.target) target = event.target;
			if (target) bubbleUp(self, match, fn, event, target);
		};

		if (!stored) stored = {};
		stored[uid] = {
			match: _match,
			fn: _fn,
			delegator: delegator
		};
		storage[_type] = stored;
		return addEvent.call(this, type, delegator, _map.capture);
	},

	removeEvent: function(type, match, fn, _uid){
		var storage = this.retrieve('$delegates', {}), stored = storage[type];
		if (!stored) return this;

		if (_uid){
			var _type = type, delegator = stored[_uid].delegator, _map = map[type] || {};
			type = _map.base || _type;
			if (_map.remove) _map.remove(this, _uid);
			delete stored[_uid];
			storage[_type] = stored;
			return removeEvent.call(this, type, delegator, _map.capture);
		}

		var __uid, s;
		if (fn) for (__uid in stored){
			s = stored[__uid];
			if (s.match == match && s.fn == fn) return delegation.removeEvent.call(this, type, match, fn, __uid);
		} else for (__uid in stored){
			s = stored[__uid];
			if (s.match == match) delegation.removeEvent.call(this, type, match, s.fn, __uid);
		}
		return this;
	}

};

[Element, Window, Document].invoke('implement', {
	addEvent: relay(addEvent, delegation.addEvent),
	removeEvent: relay(removeEvent, delegation.removeEvent)
});

})();

/*
---

name: Element.Style

description: Contains methods for interacting with the styles of Elements in a fashionable way.

license: MIT-style license.

requires: Element

provides: Element.Style

...
*/

(function(){

var html = document.html, el;

//<ltIE9>
// Check for oldIE, which does not remove styles when they're set to null
el = document.createElement('div');
el.style.color = 'red';
el.style.color = null;
var doesNotRemoveStyles = el.style.color == 'red';

// check for oldIE, which returns border* shorthand styles in the wrong order (color-width-style instead of width-style-color)
var border = '1px solid #123abc';
el.style.border = border;
var returnsBordersInWrongOrder = el.style.border != border;
el = null;
//</ltIE9>

var hasGetComputedStyle = !!window.getComputedStyle,
	supportBorderRadius = document.createElement('div').style.borderRadius != null;

Element.Properties.styles = {set: function(styles){
	this.setStyles(styles);
}};

var hasOpacity = (html.style.opacity != null),
	hasFilter = (html.style.filter != null),
	reAlpha = /alpha\(opacity=([\d.]+)\)/i;

var setVisibility = function(element, opacity){
	element.store('$opacity', opacity);
	element.style.visibility = opacity > 0 || opacity == null ? 'visible' : 'hidden';
};

//<ltIE9>
var setFilter = function(element, regexp, value){
	var style = element.style,
		filter = style.filter || element.getComputedStyle('filter') || '';
	style.filter = (regexp.test(filter) ? filter.replace(regexp, value) : filter + ' ' + value).trim();
	if (!style.filter) style.removeAttribute('filter');
};
//</ltIE9>

var setOpacity = (hasOpacity ? function(element, opacity){
	element.style.opacity = opacity;
} : (hasFilter ? function(element, opacity){
	if (!element.currentStyle || !element.currentStyle.hasLayout) element.style.zoom = 1;
	if (opacity == null || opacity == 1){
		setFilter(element, reAlpha, '');
		if (opacity == 1 && getOpacity(element) != 1) setFilter(element, reAlpha, 'alpha(opacity=100)');
	} else {
		setFilter(element, reAlpha, 'alpha(opacity=' + (opacity * 100).limit(0, 100).round() + ')');
	}
} : setVisibility));

var getOpacity = (hasOpacity ? function(element){
	var opacity = element.style.opacity || element.getComputedStyle('opacity');
	return (opacity == '') ? 1 : opacity.toFloat();
} : (hasFilter ? function(element){
	var filter = (element.style.filter || element.getComputedStyle('filter')),
		opacity;
	if (filter) opacity = filter.match(reAlpha);
	return (opacity == null || filter == null) ? 1 : (opacity[1] / 100);
} : function(element){
	var opacity = element.retrieve('$opacity');
	if (opacity == null) opacity = (element.style.visibility == 'hidden' ? 0 : 1);
	return opacity;
}));

var floatName = (html.style.cssFloat == null) ? 'styleFloat' : 'cssFloat',
	namedPositions = {left: '0%', top: '0%', center: '50%', right: '100%', bottom: '100%'},
	hasBackgroundPositionXY = (html.style.backgroundPositionX != null),
	prefixPattern = /^-(ms)-/;

var camelCase = function(property){
	return property.replace(prefixPattern, '$1-').camelCase();
};

//<ltIE9>
var removeStyle = function(style, property){
	if (property == 'backgroundPosition'){
		style.removeAttribute(property + 'X');
		property += 'Y';
	}
	style.removeAttribute(property);
};
//</ltIE9>

Element.implement({

	getComputedStyle: function(property){
		if (!hasGetComputedStyle && this.currentStyle) return this.currentStyle[camelCase(property)];
		var defaultView = Element.getDocument(this).defaultView,
			computed = defaultView ? defaultView.getComputedStyle(this, null) : null;
		return (computed) ? computed.getPropertyValue((property == floatName) ? 'float' : property.hyphenate()) : '';
	},

	setStyle: function(property, value){
		if (property == 'opacity'){
			if (value != null) value = parseFloat(value);
			setOpacity(this, value);
			return this;
		}
		property = camelCase(property == 'float' ? floatName : property);
		if (typeOf(value) != 'string'){
			var map = (Element.Styles[property] || '@').split(' ');
			value = Array.convert(value).map(function(val, i){
				if (!map[i]) return '';
				return (typeOf(val) == 'number') ? map[i].replace('@', Math.round(val)) : val;
			}).join(' ');
		} else if (value == String(Number(value))){
			value = Math.round(value);
		}
		this.style[property] = value;
		//<ltIE9>
		if ((value == '' || value == null) && doesNotRemoveStyles && this.style.removeAttribute){
			removeStyle(this.style, property);
		}
		//</ltIE9>
		return this;
	},

	getStyle: function(property){
		if (property == 'opacity') return getOpacity(this);
		property = camelCase(property == 'float' ? floatName : property);
		if (supportBorderRadius && property.indexOf('borderRadius') != -1){
			return ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'].map(function(corner){
				return this.style[corner] || '0px';
			}, this).join(' ');
		}
		var result = this.style[property];
		if (!result || property == 'zIndex'){
			if (Element.ShortStyles.hasOwnProperty(property)){
				result = [];
				for (var s in Element.ShortStyles[property]) result.push(this.getStyle(s));
				return result.join(' ');
			}
			result = this.getComputedStyle(property);
		}
		if (hasBackgroundPositionXY && /^backgroundPosition[XY]?$/.test(property)){
			return result.replace(/(top|right|bottom|left)/g, function(position){
				return namedPositions[position];
			}) || '0px';
		}
		if (!result && property == 'backgroundPosition') return '0px 0px';
		if (result){
			result = String(result);
			var color = result.match(/rgba?\([\d\s,]+\)/);
			if (color) result = result.replace(color[0], color[0].rgbToHex());
		}
		if (!hasGetComputedStyle && !this.style[property]){
			if ((/^(height|width)$/).test(property) && !(/px$/.test(result))){
				var values = (property == 'width') ? ['left', 'right'] : ['top', 'bottom'], size = 0;
				values.each(function(value){
					size += this.getStyle('border-' + value + '-width').toInt() + this.getStyle('padding-' + value).toInt();
				}, this);
				return this['offset' + property.capitalize()] - size + 'px';
			}
			if ((/^border(.+)Width|margin|padding/).test(property) && isNaN(parseFloat(result))){
				return '0px';
			}
		}
		//<ltIE9>
		if (returnsBordersInWrongOrder && /^border(Top|Right|Bottom|Left)?$/.test(property) && /^#/.test(result)){
			return result.replace(/^(.+)\s(.+)\s(.+)$/, '$2 $3 $1');
		}
		//</ltIE9>

		return result;
	},

	setStyles: function(styles){
		for (var style in styles) this.setStyle(style, styles[style]);
		return this;
	},

	getStyles: function(){
		var result = {};
		Array.flatten(arguments).each(function(key){
			result[key] = this.getStyle(key);
		}, this);
		return result;
	}

});

Element.Styles = {
	left: '@px', top: '@px', bottom: '@px', right: '@px',
	width: '@px', height: '@px', maxWidth: '@px', maxHeight: '@px', minWidth: '@px', minHeight: '@px',
	backgroundColor: 'rgb(@, @, @)', backgroundSize: '@px', backgroundPosition: '@px @px', color: 'rgb(@, @, @)',
	fontSize: '@px', letterSpacing: '@px', lineHeight: '@px', clip: 'rect(@px @px @px @px)',
	margin: '@px @px @px @px', padding: '@px @px @px @px', border: '@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)',
	borderWidth: '@px @px @px @px', borderStyle: '@ @ @ @', borderColor: 'rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)',
	zIndex: '@', 'zoom': '@', fontWeight: '@', textIndent: '@px', opacity: '@', borderRadius: '@px @px @px @px'
};





Element.ShortStyles = {margin: {}, padding: {}, border: {}, borderWidth: {}, borderStyle: {}, borderColor: {}};

['Top', 'Right', 'Bottom', 'Left'].each(function(direction){
	var Short = Element.ShortStyles;
	var All = Element.Styles;
	['margin', 'padding'].each(function(style){
		var sd = style + direction;
		Short[style][sd] = All[sd] = '@px';
	});
	var bd = 'border' + direction;
	Short.border[bd] = All[bd] = '@px @ rgb(@, @, @)';
	var bdw = bd + 'Width', bds = bd + 'Style', bdc = bd + 'Color';
	Short[bd] = {};
	Short.borderWidth[bdw] = Short[bd][bdw] = All[bdw] = '@px';
	Short.borderStyle[bds] = Short[bd][bds] = All[bds] = '@';
	Short.borderColor[bdc] = Short[bd][bdc] = All[bdc] = 'rgb(@, @, @)';
});

if (hasBackgroundPositionXY) Element.ShortStyles.backgroundPosition = {backgroundPositionX: '@', backgroundPositionY: '@'};
})();

/*
---

name: Element.Dimensions

description: Contains methods to work with size, scroll, or positioning of Elements and the window object.

license: MIT-style license.

credits:
  - Element positioning based on the [qooxdoo](http://qooxdoo.org/) code and smart browser fixes, [LGPL License](http://www.gnu.org/licenses/lgpl.html).
  - Viewport dimensions based on [YUI](http://developer.yahoo.com/yui/) code, [BSD License](http://developer.yahoo.com/yui/license.html).

requires: [Element, Element.Style]

provides: [Element.Dimensions]

...
*/

(function(){

var element = document.createElement('div'),
	child = document.createElement('div');
element.style.height = '0';
element.appendChild(child);
var brokenOffsetParent = (child.offsetParent === element);
element = child = null;

var heightComponents = ['height', 'paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth'],
	widthComponents = ['width', 'paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'];

var svgCalculateSize = function(el){

	var gCS = window.getComputedStyle(el),
		bounds = {x: 0, y: 0};

	heightComponents.each(function(css){
		bounds.y += parseFloat(gCS[css]);
	});
	widthComponents.each(function(css){
		bounds.x += parseFloat(gCS[css]);
	});
	return bounds;
};

var isOffset = function(el){
	return styleString(el, 'position') != 'static' || isBody(el);
};

var isOffsetStatic = function(el){
	return isOffset(el) || (/^(?:table|td|th)$/i).test(el.tagName);
};

Element.implement({

	scrollTo: function(x, y){
		if (isBody(this)){
			this.getWindow().scrollTo(x, y);
		} else {
			this.scrollLeft = x;
			this.scrollTop = y;
		}
		return this;
	},

	getSize: function(){
		if (isBody(this)) return this.getWindow().getSize();

		//<ltIE9>
		// This if clause is because IE8- cannot calculate getBoundingClientRect of elements with visibility hidden.
		if (!window.getComputedStyle) return {x: this.offsetWidth, y: this.offsetHeight};
		//</ltIE9>

		// This svg section under, calling `svgCalculateSize()`, can be removed when FF fixed the svg size bug.
		// Bug info: https://bugzilla.mozilla.org/show_bug.cgi?id=530985
		if (this.get('tag') == 'svg') return svgCalculateSize(this);

		try {
			var bounds = this.getBoundingClientRect();
			return {x: bounds.width, y: bounds.height};
		} catch (e){
			return {x: 0, y: 0};
		}
	},

	getScrollSize: function(){
		if (isBody(this)) return this.getWindow().getScrollSize();
		return {x: this.scrollWidth, y: this.scrollHeight};
	},

	getScroll: function(){
		if (isBody(this)) return this.getWindow().getScroll();
		return {x: this.scrollLeft, y: this.scrollTop};
	},

	getScrolls: function(){
		var element = this.parentNode, position = {x: 0, y: 0};
		while (element && !isBody(element)){
			position.x += element.scrollLeft;
			position.y += element.scrollTop;
			element = element.parentNode;
		}
		return position;
	},

	getOffsetParent: brokenOffsetParent ? function(){
		var element = this;
		if (isBody(element) || styleString(element, 'position') == 'fixed') return null;

		var isOffsetCheck = (styleString(element, 'position') == 'static') ? isOffsetStatic : isOffset;
		while ((element = element.parentNode)){
			if (isOffsetCheck(element)) return element;
		}
		return null;
	} : function(){
		var element = this;
		if (isBody(element) || styleString(element, 'position') == 'fixed') return null;

		try {
			return element.offsetParent;
		} catch (e){}
		return null;
	},

	getOffsets: function(){
		var hasGetBoundingClientRect = this.getBoundingClientRect;

		if (hasGetBoundingClientRect){
			var bound = this.getBoundingClientRect(),
				html = document.id(this.getDocument().documentElement),
				htmlScroll = html.getScroll(),
				elemScrolls = this.getScrolls(),
				isFixed = (styleString(this, 'position') == 'fixed');

			return {
				x: bound.left.toFloat() + elemScrolls.x + ((isFixed) ? 0 : htmlScroll.x) - html.clientLeft,
				y: bound.top.toFloat() + elemScrolls.y + ((isFixed) ? 0 : htmlScroll.y) - html.clientTop
			};
		}

		var element = this, position = {x: 0, y: 0};
		if (isBody(this)) return position;

		while (element && !isBody(element)){
			position.x += element.offsetLeft;
			position.y += element.offsetTop;

			element = element.offsetParent;
		}

		return position;
	},

	getPosition: function(relative){
		var offset = this.getOffsets(),
			scroll = this.getScrolls();
		var position = {
			x: offset.x - scroll.x,
			y: offset.y - scroll.y
		};

		if (relative && (relative = document.id(relative))){
			var relativePosition = relative.getPosition();
			return {x: position.x - relativePosition.x - leftBorder(relative), y: position.y - relativePosition.y - topBorder(relative)};
		}
		return position;
	},

	getCoordinates: function(element){
		if (isBody(this)) return this.getWindow().getCoordinates();
		var position = this.getPosition(element),
			size = this.getSize();
		var obj = {
			left: position.x,
			top: position.y,
			width: size.x,
			height: size.y
		};
		obj.right = obj.left + obj.width;
		obj.bottom = obj.top + obj.height;
		return obj;
	},

	computePosition: function(obj){
		return {
			left: obj.x - styleNumber(this, 'margin-left'),
			top: obj.y - styleNumber(this, 'margin-top')
		};
	},

	setPosition: function(obj){
		return this.setStyles(this.computePosition(obj));
	}

});


[Document, Window].invoke('implement', {

	getSize: function(){
		var doc = getCompatElement(this);
		return {x: doc.clientWidth, y: doc.clientHeight};
	},

	getScroll: function(){
		var win = this.getWindow(), doc = getCompatElement(this);
		return {x: win.pageXOffset || doc.scrollLeft, y: win.pageYOffset || doc.scrollTop};
	},

	getScrollSize: function(){
		var doc = getCompatElement(this),
			min = this.getSize(),
			body = this.getDocument().body;

		return {x: Math.max(doc.scrollWidth, body.scrollWidth, min.x), y: Math.max(doc.scrollHeight, body.scrollHeight, min.y)};
	},

	getPosition: function(){
		return {x: 0, y: 0};
	},

	getCoordinates: function(){
		var size = this.getSize();
		return {top: 0, left: 0, bottom: size.y, right: size.x, height: size.y, width: size.x};
	}

});

// private methods

var styleString = Element.getComputedStyle;

function styleNumber(element, style){
	return styleString(element, style).toInt() || 0;
}



function topBorder(element){
	return styleNumber(element, 'border-top-width');
}

function leftBorder(element){
	return styleNumber(element, 'border-left-width');
}

function isBody(element){
	return (/^(?:body|html)$/i).test(element.tagName);
}

function getCompatElement(element){
	var doc = element.getDocument();
	return (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html : doc.body;
}

})();

//aliases
Element.alias({position: 'setPosition'}); //compatability

[Window, Document, Element].invoke('implement', {

	getHeight: function(){
		return this.getSize().y;
	},

	getWidth: function(){
		return this.getSize().x;
	},

	getScrollTop: function(){
		return this.getScroll().y;
	},

	getScrollLeft: function(){
		return this.getScroll().x;
	},

	getScrollHeight: function(){
		return this.getScrollSize().y;
	},

	getScrollWidth: function(){
		return this.getScrollSize().x;
	},

	getTop: function(){
		return this.getPosition().y;
	},

	getLeft: function(){
		return this.getPosition().x;
	}

});

/*
---

name: Fx

description: Contains the basic animation logic to be extended by all other Fx Classes.

license: MIT-style license.

requires: [Chain, Events, Options, Class.Thenable]

provides: Fx

...
*/

(function(){

var Fx = this.Fx = new Class({

	Implements: [Chain, Events, Options, Class.Thenable],

	options: {
		/*
		onStart: nil,
		onCancel: nil,
		onComplete: nil,
		*/
		fps: 60,
		unit: false,
		duration: 500,
		frames: null,
		frameSkip: true,
		link: 'ignore'
	},

	initialize: function(options){
		this.subject = this.subject || this;
		this.setOptions(options);
	},

	getTransition: function(){
		return function(p){
			return -(Math.cos(Math.PI * p) - 1) / 2;
		};
	},

	step: function(now){
		if (this.options.frameSkip){
			var diff = (this.time != null) ? (now - this.time) : 0, frames = diff / this.frameInterval;
			this.time = now;
			this.frame += frames;
		} else {
			this.frame++;
		}

		if (this.frame < this.frames){
			var delta = this.transition(this.frame / this.frames);
			this.set(this.compute(this.from, this.to, delta));
		} else {
			this.frame = this.frames;
			this.set(this.compute(this.from, this.to, 1));
			this.stop();
		}
	},

	set: function(now){
		return now;
	},

	compute: function(from, to, delta){
		return Fx.compute(from, to, delta);
	},

	check: function(){
		if (!this.isRunning()) return true;
		switch (this.options.link){
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(this.caller.pass(arguments, this)); return false;
		}
		return false;
	},

	start: function(from, to){
		if (!this.check(from, to)) return this;
		this.from = from;
		this.to = to;
		this.frame = (this.options.frameSkip) ? 0 : -1;
		this.time = null;
		this.transition = this.getTransition();
		var frames = this.options.frames, fps = this.options.fps, duration = this.options.duration;
		this.duration = Fx.Durations[duration] || duration.toInt();
		this.frameInterval = 1000 / fps;
		this.frames = frames || Math.round(this.duration / this.frameInterval);
		if (this.getThenableState() !== 'pending'){
			this.resetThenable(this.subject);
		}
		this.fireEvent('start', this.subject);
		pushInstance.call(this, fps);
		return this;
	},

	stop: function(){
		if (this.isRunning()){
			this.time = null;
			pullInstance.call(this, this.options.fps);
			if (this.frames == this.frame){
				this.fireEvent('complete', this.subject);
				if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
			} else {
				this.fireEvent('stop', this.subject);
			}
			this.resolve(this.subject === this ? null : this.subject);
		}
		return this;
	},

	cancel: function(){
		if (this.isRunning()){
			this.time = null;
			pullInstance.call(this, this.options.fps);
			this.frame = this.frames;
			this.fireEvent('cancel', this.subject).clearChain();
			this.reject(this.subject);
		}
		return this;
	},

	pause: function(){
		if (this.isRunning()){
			this.time = null;
			pullInstance.call(this, this.options.fps);
		}
		return this;
	},

	resume: function(){
		if (this.isPaused()) pushInstance.call(this, this.options.fps);
		return this;
	},

	isRunning: function(){
		var list = instances[this.options.fps];
		return list && list.contains(this);
	},

	isPaused: function(){
		return (this.frame < this.frames) && !this.isRunning();
	}

});

Fx.compute = function(from, to, delta){
	return (to - from) * delta + from;
};

Fx.Durations = {'short': 250, 'normal': 500, 'long': 1000};

// global timers

var instances = {}, timers = {};

var loop = function(){
	var now = Date.now();
	for (var i = this.length; i--;){
		var instance = this[i];
		if (instance) instance.step(now);
	}
};

var pushInstance = function(fps){
	var list = instances[fps] || (instances[fps] = []);
	list.push(this);
	if (!timers[fps]) timers[fps] = loop.periodical(Math.round(1000 / fps), list);
};

var pullInstance = function(fps){
	var list = instances[fps];
	if (list){
		list.erase(this);
		if (!list.length && timers[fps]){
			delete instances[fps];
			timers[fps] = clearInterval(timers[fps]);
		}
	}
};

})();

/*
---

name: Fx.CSS

description: Contains the CSS animation logic. Used by Fx.Tween, Fx.Morph, Fx.Elements.

license: MIT-style license.

requires: [Fx, Element.Style]

provides: Fx.CSS

...
*/

Fx.CSS = new Class({

	Extends: Fx,

	//prepares the base from/to object

	prepare: function(element, property, values){
		values = Array.convert(values);
		var from = values[0], to = values[1];
		if (to == null){
			to = from;
			from = element.getStyle(property);
			var unit = this.options.unit;
			// adapted from: https://github.com/ryanmorr/fx/blob/master/fx.js#L299
			if (unit && from && typeof from == 'string' && from.slice(-unit.length) != unit && parseFloat(from) != 0){
				element.setStyle(property, to + unit);
				var value = element.getComputedStyle(property);
				// IE and Opera support pixelLeft or pixelWidth
				if (!(/px$/.test(value))){
					value = element.style[('pixel-' + property).camelCase()];
					if (value == null){
						// adapted from Dean Edwards' http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
						var left = element.style.left;
						element.style.left = to + unit;
						value = element.style.pixelLeft;
						element.style.left = left;
					}
				}
				from = (to || 1) / (parseFloat(value) || 1) * (parseFloat(from) || 0);
				element.setStyle(property, from + unit);
			}
		}
		return {from: this.parse(from), to: this.parse(to)};
	},

	//parses a value into an array

	parse: function(value){
		value = Function.convert(value)();
		value = (typeof value == 'string') ? value.split(' ') : Array.convert(value);
		return value.map(function(val){
			val = String(val);
			var found = false;
			Object.each(Fx.CSS.Parsers, function(parser){
				if (found) return;
				var parsed = parser.parse(val);
				if (parsed || parsed === 0) found = {value: parsed, parser: parser};
			});
			found = found || {value: val, parser: Fx.CSS.Parsers.String};
			return found;
		});
	},

	//computes by a from and to prepared objects, using their parsers.

	compute: function(from, to, delta){
		var computed = [];
		(Math.min(from.length, to.length)).times(function(i){
			computed.push({value: from[i].parser.compute(from[i].value, to[i].value, delta), parser: from[i].parser});
		});
		computed.$family = Function.convert('fx:css:value');
		return computed;
	},

	//serves the value as settable

	serve: function(value, unit){
		if (typeOf(value) != 'fx:css:value') value = this.parse(value);
		var returned = [];
		value.each(function(bit){
			returned = returned.concat(bit.parser.serve(bit.value, unit));
		});
		return returned;
	},

	//renders the change to an element

	render: function(element, property, value, unit){
		element.setStyle(property, this.serve(value, unit));
	},

	//searches inside the page css to find the values for a selector

	search: function(selector){
		if (Fx.CSS.Cache[selector]) return Fx.CSS.Cache[selector];
		var to = {}, selectorTest = new RegExp('^' + selector.escapeRegExp() + '$');

		var searchStyles = function(rules){
			Array.each(rules, function(rule){
				if (rule.media){
					searchStyles(rule.rules || rule.cssRules);
					return;
				}
				if (!rule.style) return;
				var selectorText = (rule.selectorText) ? rule.selectorText.replace(/^\w+/, function(m){
					return m.toLowerCase();
				}) : null;
				if (!selectorText || !selectorTest.test(selectorText)) return;
				Object.each(Element.Styles, function(value, style){
					if (!rule.style[style] || Element.ShortStyles[style]) return;
					value = String(rule.style[style]);
					to[style] = ((/^rgb/).test(value)) ? value.rgbToHex() : value;
				});
			});
		};

		Array.each(document.styleSheets, function(sheet){
			var href = sheet.href;
			if (href && href.indexOf('://') > -1 && href.indexOf(document.domain) == -1) return;
			var rules = sheet.rules || sheet.cssRules;
			searchStyles(rules);
		});
		return Fx.CSS.Cache[selector] = to;
	}

});

Fx.CSS.Cache = {};

Fx.CSS.Parsers = {

	Color: {
		parse: function(value){
			if (value.match(/^#[0-9a-f]{3,6}$/i)) return value.hexToRgb(true);
			return ((value = value.match(/(\d+),\s*(\d+),\s*(\d+)/))) ? [value[1], value[2], value[3]] : false;
		},
		compute: function(from, to, delta){
			return from.map(function(value, i){
				return Math.round(Fx.compute(from[i], to[i], delta));
			});
		},
		serve: function(value){
			return value.map(Number);
		}
	},

	Number: {
		parse: parseFloat,
		compute: Fx.compute,
		serve: function(value, unit){
			return (unit) ? value + unit : value;
		}
	},

	String: {
		parse: Function.convert(false),
		compute: function(zero, one){
			return one;
		},
		serve: function(zero){
			return zero;
		}
	}

};



/*
---

name: Fx.Morph

description: Formerly Fx.Styles, effect to transition any number of CSS properties for an element using an object of rules, or CSS based selector rules.

license: MIT-style license.

requires: Fx.CSS

provides: Fx.Morph

...
*/

Fx.Morph = new Class({

	Extends: Fx.CSS,

	initialize: function(element, options){
		this.element = this.subject = document.id(element);
		this.parent(options);
	},

	set: function(now){
		if (typeof now == 'string') now = this.search(now);
		for (var p in now) this.render(this.element, p, now[p], this.options.unit);
		return this;
	},

	compute: function(from, to, delta){
		var now = {};
		for (var p in from) now[p] = this.parent(from[p], to[p], delta);
		return now;
	},

	start: function(properties){
		if (!this.check(properties)) return this;
		if (typeof properties == 'string') properties = this.search(properties);
		var from = {}, to = {};
		for (var p in properties){
			var parsed = this.prepare(this.element, p, properties[p]);
			from[p] = parsed.from;
			to[p] = parsed.to;
		}
		return this.parent(from, to);
	}

});

Element.Properties.morph = {

	set: function(options){
		this.get('morph').cancel().setOptions(options);
		return this;
	},

	get: function(){
		var morph = this.retrieve('morph');
		if (!morph){
			morph = new Fx.Morph(this, {link: 'cancel'});
			this.store('morph', morph);
		}
		return morph;
	}

};

Element.implement({

	morph: function(props){
		this.get('morph').start(props);
		return this;
	}

});

/*
---

name: Fx.Transitions

description: Contains a set of advanced transitions to be used with any of the Fx Classes.

license: MIT-style license.

credits:
  - Easing Equations by Robert Penner, <http://www.robertpenner.com/easing/>, modified and optimized to be used with MooTools.

requires: Fx

provides: Fx.Transitions

...
*/

Fx.implement({

	getTransition: function(){
		var trans = this.options.transition || Fx.Transitions.Sine.easeInOut;
		if (typeof trans == 'string'){
			var data = trans.split(':');
			trans = Fx.Transitions;
			trans = trans[data[0]] || trans[data[0].capitalize()];
			if (data[1]) trans = trans['ease' + data[1].capitalize() + (data[2] ? data[2].capitalize() : '')];
		}
		return trans;
	}

});

Fx.Transition = function(transition, params){
	params = Array.convert(params);
	var easeIn = function(pos){
		return transition(pos, params);
	};
	return Object.append(easeIn, {
		easeIn: easeIn,
		easeOut: function(pos){
			return 1 - transition(1 - pos, params);
		},
		easeInOut: function(pos){
			return (pos <= 0.5 ? transition(2 * pos, params) : (2 - transition(2 * (1 - pos), params))) / 2;
		}
	});
};

Fx.Transitions = {

	linear: function(zero){
		return zero;
	}

};



Fx.Transitions.extend = function(transitions){
	for (var transition in transitions) Fx.Transitions[transition] = new Fx.Transition(transitions[transition]);
};

Fx.Transitions.extend({

	Pow: function(p, x){
		return Math.pow(p, x && x[0] || 6);
	},

	Expo: function(p){
		return Math.pow(2, 8 * (p - 1));
	},

	Circ: function(p){
		return 1 - Math.sin(Math.acos(p));
	},

	Sine: function(p){
		return 1 - Math.cos(p * Math.PI / 2);
	},

	Back: function(p, x){
		x = x && x[0] || 1.618;
		return Math.pow(p, 2) * ((x + 1) * p - x);
	},

	Bounce: function(p){
		var value;
		for (var a = 0, b = 1; 1; a += b, b /= 2){
			if (p >= (7 - 4 * a) / 11){
				value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
				break;
			}
		}
		return value;
	},

	Elastic: function(p, x){
		return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x && x[0] || 1) / 3);
	}

});

['Quad', 'Cubic', 'Quart', 'Quint'].each(function(transition, i){
	Fx.Transitions[transition] = new Fx.Transition(function(p){
		return Math.pow(p, i + 2);
	});
});

/*
---

name: Fx.Tween

description: Formerly Fx.Style, effect to transition any CSS property for an element.

license: MIT-style license.

requires: Fx.CSS

provides: [Fx.Tween, Element.fade, Element.highlight]

...
*/

Fx.Tween = new Class({

	Extends: Fx.CSS,

	initialize: function(element, options){
		this.element = this.subject = document.id(element);
		this.parent(options);
	},

	set: function(property, now){
		if (arguments.length == 1){
			now = property;
			property = this.property || this.options.property;
		}
		this.render(this.element, property, now, this.options.unit);
		return this;
	},

	start: function(property, from, to){
		if (!this.check(property, from, to)) return this;
		var args = Array.flatten(arguments);
		this.property = this.options.property || args.shift();
		var parsed = this.prepare(this.element, this.property, args);
		return this.parent(parsed.from, parsed.to);
	}

});

Element.Properties.tween = {

	set: function(options){
		this.get('tween').cancel().setOptions(options);
		return this;
	},

	get: function(){
		var tween = this.retrieve('tween');
		if (!tween){
			tween = new Fx.Tween(this, {link: 'cancel'});
			this.store('tween', tween);
		}
		return tween;
	}

};

Element.implement({

	tween: function(property, from, to){
		this.get('tween').start(property, from, to);
		return this;
	},

	fade: function(){
		var fade = this.get('tween'), method, args = ['opacity'].append(arguments), toggle;
		if (args[1] == null) args[1] = 'toggle';
		switch (args[1]){
			case 'in': method = 'start'; args[1] = 1; break;
			case 'out': method = 'start'; args[1] = 0; break;
			case 'show': method = 'set'; args[1] = 1; break;
			case 'hide': method = 'set'; args[1] = 0; break;
			case 'toggle':
				var flag = this.retrieve('fade:flag', this.getStyle('opacity') == 1);
				method = 'start';
				args[1] = flag ? 0 : 1;
				this.store('fade:flag', !flag);
				toggle = true;
				break;
			default: method = 'start';
		}
		if (!toggle) this.eliminate('fade:flag');
		fade[method].apply(fade, args);
		var to = args[args.length - 1];

		if (method == 'set'){
			this.setStyle('visibility', to == 0 ? 'hidden' : 'visible');
		} else if (to != 0){
			if (fade.$chain.length){
				fade.chain(function(){
					this.element.setStyle('visibility', 'visible');
					this.callChain();
				});
			} else {
				this.setStyle('visibility', 'visible');
			}
		} else {
			fade.chain(function(){
				if (this.element.getStyle('opacity')) return;
				this.element.setStyle('visibility', 'hidden');
				this.callChain();
			});
		}

		return this;
	},

	highlight: function(start, end){
		if (!end){
			end = this.retrieve('highlight:original', this.getStyle('background-color'));
			end = (end == 'transparent') ? '#fff' : end;
		}
		var tween = this.get('tween');
		tween.start('background-color', start || '#ffff88', end).chain(function(){
			this.setStyle('background-color', this.retrieve('highlight:original'));
			tween.callChain();
		}.bind(this));
		return this;
	}

});

/*
---

name: Request

description: Powerful all purpose Request Class. Uses XMLHTTPRequest.

license: MIT-style license.

requires: [Object, Element, Chain, Events, Options, Class.Thenable, Browser]

provides: Request

...
*/

(function(){

var empty = function(){},
	progressSupport = ('onprogress' in new Browser.Request);

var Request = this.Request = new Class({

	Implements: [Chain, Events, Options, Class.Thenable],

	options: {/*
		onRequest: function(){},
		onLoadstart: function(event, xhr){},
		onProgress: function(event, xhr){},
		onComplete: function(){},
		onCancel: function(){},
		onSuccess: function(responseText, responseXML){},
		onFailure: function(xhr){},
		onException: function(headerName, value){},
		onTimeout: function(){},
		user: '',
		password: '',
		withCredentials: false,*/
		url: '',
		data: '',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
		},
		async: true,
		format: false,
		method: 'post',
		link: 'ignore',
		isSuccess: null,
		emulation: true,
		urlEncoded: true,
		encoding: 'utf-8',
		evalScripts: false,
		evalResponse: false,
		timeout: 0,
		noCache: false
	},

	initialize: function(options){
		this.xhr = new Browser.Request();
		this.setOptions(options);
		this.headers = this.options.headers;
	},

	onStateChange: function(){
		var xhr = this.xhr;
		if (xhr.readyState != 4 || !this.running) return;
		this.running = false;
		this.status = 0;
		Function.attempt(function(){
			var status = xhr.status;
			this.status = (status == 1223) ? 204 : status;
		}.bind(this));
		xhr.onreadystatechange = empty;
		if (progressSupport) xhr.onprogress = xhr.onloadstart = empty;
		if (this.timer){
			clearTimeout(this.timer);
			delete this.timer;
		}

		this.response = {text: this.xhr.responseText || '', xml: this.xhr.responseXML};
		if (this.options.isSuccess.call(this, this.status))
			this.success(this.response.text, this.response.xml);
		else
			this.failure();
	},

	isSuccess: function(){
		var status = this.status;
		return (status >= 200 && status < 300);
	},

	isRunning: function(){
		return !!this.running;
	},

	processScripts: function(text){
		if (this.options.evalResponse || (/(ecma|java)script/).test(this.getHeader('Content-type'))) return Browser.exec(text);
		return text.stripScripts(this.options.evalScripts);
	},

	success: function(text, xml){
		this.onSuccess(this.processScripts(text), xml);
		this.resolve({text: text, xml: xml});
	},

	onSuccess: function(){
		this.fireEvent('complete', arguments).fireEvent('success', arguments).callChain();
	},

	failure: function(){
		this.onFailure();
		this.reject({reason: 'failure', xhr: this.xhr});
	},

	onFailure: function(){
		this.fireEvent('complete').fireEvent('failure', this.xhr);
	},

	loadstart: function(event){
		this.fireEvent('loadstart', [event, this.xhr]);
	},

	progress: function(event){
		this.fireEvent('progress', [event, this.xhr]);
	},

	timeout: function(){
		this.fireEvent('timeout', this.xhr);
		this.reject({reason: 'timeout', xhr: this.xhr});
	},

	setHeader: function(name, value){
		this.headers[name] = value;
		return this;
	},

	getHeader: function(name){
		return Function.attempt(function(){
			return this.xhr.getResponseHeader(name);
		}.bind(this));
	},

	check: function(){
		if (!this.running) return true;
		switch (this.options.link){
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(this.caller.pass(arguments, this)); return false;
		}
		return false;
	},

	send: function(options){
		if (!this.check(options)) return this;

		this.options.isSuccess = this.options.isSuccess || this.isSuccess;
		this.running = true;

		var type = typeOf(options);
		if (type == 'string' || type == 'element') options = {data: options};

		var old = this.options;
		options = Object.append({data: old.data, url: old.url, method: old.method}, options);
		var data = options.data, url = String(options.url), method = options.method.toLowerCase();

		switch (typeOf(data)){
			case 'element': data = document.id(data).toQueryString(); break;
			case 'object': case 'hash': data = Object.toQueryString(data);
		}

		if (this.options.format){
			var format = 'format=' + this.options.format;
			data = (data) ? format + '&' + data : format;
		}

		if (this.options.emulation && !['get', 'post'].contains(method)){
			var _method = '_method=' + method;
			data = (data) ? _method + '&' + data : _method;
			method = 'post';
		}

		if (this.options.urlEncoded && ['post', 'put'].contains(method)){
			var encoding = (this.options.encoding) ? '; charset=' + this.options.encoding : '';
			this.headers['Content-type'] = 'application/x-www-form-urlencoded' + encoding;
		}

		if (!url) url = document.location.pathname;

		var trimPosition = url.lastIndexOf('/');
		if (trimPosition > -1 && (trimPosition = url.indexOf('#')) > -1) url = url.substr(0, trimPosition);

		if (this.options.noCache)
			url += (url.indexOf('?') > -1 ? '&' : '?') + String.uniqueID();

		if (data && (method == 'get' || method == 'delete')){
			url += (url.indexOf('?') > -1 ? '&' : '?') + data;
			data = null;
		}

		var xhr = this.xhr;
		if (progressSupport){
			xhr.onloadstart = this.loadstart.bind(this);
			xhr.onprogress = this.progress.bind(this);
		}

		xhr.open(method.toUpperCase(), url, this.options.async, this.options.user, this.options.password);
		if ((this.options.withCredentials) && 'withCredentials' in xhr) xhr.withCredentials = true;

		xhr.onreadystatechange = this.onStateChange.bind(this);

		Object.each(this.headers, function(value, key){
			try {
				xhr.setRequestHeader(key, value);
			} catch (e){
				this.fireEvent('exception', [key, value]);
				this.reject({reason: 'exception', xhr: xhr, exception: e});
			}
		}, this);

		if (this.getThenableState() !== 'pending'){
			this.resetThenable({reason: 'send'});
		}
		this.fireEvent('request');
		xhr.send(data);
		if (!this.options.async) this.onStateChange();
		else if (this.options.timeout) this.timer = this.timeout.delay(this.options.timeout, this);
		return this;
	},

	cancel: function(){
		if (!this.running) return this;
		this.running = false;
		var xhr = this.xhr;
		xhr.abort();
		if (this.timer){
			clearTimeout(this.timer);
			delete this.timer;
		}
		xhr.onreadystatechange = empty;
		if (progressSupport) xhr.onprogress = xhr.onloadstart = empty;
		this.xhr = new Browser.Request();
		this.fireEvent('cancel');
		this.reject({reason: 'cancel', xhr: xhr});
		return this;
	}

});

var methods = {};
['get', 'post', 'put', 'delete', 'patch', 'head', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'].each(function(method){
	methods[method] = function(data){
		var object = {
			method: method
		};
		if (data != null) object.data = data;
		return this.send(object);
	};
});

Request.implement(methods);

Element.Properties.send = {

	set: function(options){
		var send = this.get('send').cancel();
		send.setOptions(options);
		return this;
	},

	get: function(){
		var send = this.retrieve('send');
		if (!send){
			send = new Request({
				data: this, link: 'cancel', method: this.get('method') || 'post', url: this.get('action')
			});
			this.store('send', send);
		}
		return send;
	}

};

Element.implement({

	send: function(url){
		var sender = this.get('send');
		sender.send({data: this, url: url || sender.options.url});
		return this;
	}

});

})();

/*
---

name: Request.HTML

description: Extends the basic Request Class with additional methods for interacting with HTML responses.

license: MIT-style license.

requires: [Element, Request]

provides: Request.HTML

...
*/

Request.HTML = new Class({

	Extends: Request,

	options: {
		update: false,
		append: false,
		evalScripts: true,
		filter: false,
		headers: {
			Accept: 'text/html, application/xml, text/xml, */*'
		}
	},

	success: function(text){
		var options = this.options, response = this.response;

		response.html = text.stripScripts(function(script){
			response.javascript = script;
		});

		var match = response.html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
		if (match) response.html = match[1];
		var temp = new Element('div').set('html', response.html);

		response.tree = temp.childNodes;
		response.elements = temp.getElements(options.filter || '*');

		if (options.filter) response.tree = response.elements;
		if (options.update){
			var update = document.id(options.update).empty();
			if (options.filter) update.adopt(response.elements);
			else update.set('html', response.html);
		} else if (options.append){
			var append = document.id(options.append);
			if (options.filter) response.elements.reverse().inject(append);
			else append.adopt(temp.getChildren());
		}
		if (options.evalScripts) Browser.exec(response.javascript);

		this.onSuccess(response.tree, response.elements, response.html, response.javascript);
		this.resolve({tree: response.tree, elements: response.elements, html: response.html, javascript: response.javascript});
	}

});

Element.Properties.load = {

	set: function(options){
		var load = this.get('load').cancel();
		load.setOptions(options);
		return this;
	},

	get: function(){
		var load = this.retrieve('load');
		if (!load){
			load = new Request.HTML({data: this, link: 'cancel', update: this, method: 'get'});
			this.store('load', load);
		}
		return load;
	}

};

Element.implement({

	load: function(){
		this.get('load').send(Array.link(arguments, {data: Type.isObject, url: Type.isString}));
		return this;
	}

});

/*
---

name: JSON

description: JSON encoder and decoder.

license: MIT-style license.

SeeAlso: <http://www.json.org/>

requires: [Array, String, Number, Function]

provides: JSON

...
*/

if (typeof JSON == 'undefined') this.JSON = {};



(function(){

var special = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\'};

var escape = function(chr){
	return special[chr] || '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).slice(-4);
};

JSON.validate = function(string){
	string = string.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
					replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
					replace(/(?:^|:|,)(?:\s*\[)+/g, '');

	return (/^[\],:{}\s]*$/).test(string);
};

JSON.encode = JSON.stringify ? function(obj){
	return JSON.stringify(obj);
} : function(obj){
	if (obj && obj.toJSON) obj = obj.toJSON();

	switch (typeOf(obj)){
		case 'string':
			return '"' + obj.replace(/[\x00-\x1f\\"]/g, escape) + '"';
		case 'array':
			return '[' + obj.map(JSON.encode).clean() + ']';
		case 'object': case 'hash':
			var string = [];
			Object.each(obj, function(value, key){
				var json = JSON.encode(value);
				if (json) string.push(JSON.encode(key) + ':' + json);
			});
			return '{' + string + '}';
		case 'number': case 'boolean': return '' + obj;
		case 'null': return 'null';
	}

	return null;
};

JSON.secure = true;


JSON.decode = function(string, secure){
	if (!string || typeOf(string) != 'string') return null;

	if (secure == null) secure = JSON.secure;
	if (secure){
		if (JSON.parse) return JSON.parse(string);
		if (!JSON.validate(string)) throw new Error('JSON could not decode the input; security is enabled and the value is not secure.');
	}

	return eval('(' + string + ')');
};

})();

/*
---

name: Request.JSON

description: Extends the basic Request Class with additional methods for sending and receiving JSON data.

license: MIT-style license.

requires: [Request, JSON]

provides: Request.JSON

...
*/

Request.JSON = new Class({

	Extends: Request,

	options: {
		/*onError: function(text, error){},*/
		secure: true
	},

	initialize: function(options){
		this.parent(options);
		Object.append(this.headers, {
			'Accept': 'application/json',
			'X-Request': 'JSON'
		});
	},

	success: function(text){
		var json;
		try {
			json = this.response.json = JSON.decode(text, this.options.secure);
		} catch (error){
			this.fireEvent('error', [text, error]);
			return;
		}
		if (json == null){
			this.failure();
		} else {
			this.onSuccess(json, text);
			this.resolve({json: json, text: text});
		}
	}

});

/*
---

name: Cookie

description: Class for creating, reading, and deleting browser Cookies.

license: MIT-style license.

credits:
  - Based on the functions by Peter-Paul Koch (http://quirksmode.org).

requires: [Options, Browser]

provides: Cookie

...
*/

var Cookie = new Class({

	Implements: Options,

	options: {
		path: '/',
		domain: false,
		duration: false,
		secure: false,
		document: document,
		encode: true,
		httpOnly: false
	},

	initialize: function(key, options){
		this.key = key;
		this.setOptions(options);
	},

	write: function(value){
		if (this.options.encode) value = encodeURIComponent(value);
		if (this.options.domain) value += '; domain=' + this.options.domain;
		if (this.options.path) value += '; path=' + this.options.path;
		if (this.options.duration){
			var date = new Date();
			date.setTime(date.getTime() + this.options.duration * 24 * 60 * 60 * 1000);
			value += '; expires=' + date.toGMTString();
		}
		if (this.options.secure) value += '; secure';
		if (this.options.httpOnly) value += '; HttpOnly';
		this.options.document.cookie = this.key + '=' + value;
		return this;
	},

	read: function(){
		var value = this.options.document.cookie.match('(?:^|;)\\s*' + this.key.escapeRegExp() + '=([^;]*)');
		return (value) ? decodeURIComponent(value[1]) : null;
	},

	dispose: function(){
		new Cookie(this.key, Object.merge({}, this.options, {duration: -1})).write('');
		return this;
	}

});

Cookie.write = function(key, value, options){
	return new Cookie(key, options).write(value);
};

Cookie.read = function(key){
	return new Cookie(key).read();
};

Cookie.dispose = function(key, options){
	return new Cookie(key, options).dispose();
};

/*
---

name: DOMReady

description: Contains the custom event domready.

license: MIT-style license.

requires: [Browser, Element, Element.Event]

provides: [DOMReady, DomReady]

...
*/

(function(window, document){

var ready,
	loaded,
	checks = [],
	shouldPoll,
	timer,
	testElement = document.createElement('div');

var domready = function(){
	clearTimeout(timer);
	if (!ready){
		Browser.loaded = ready = true;
		document.removeListener('DOMContentLoaded', domready).removeListener('readystatechange', check);
		document.fireEvent('domready');
		window.fireEvent('domready');
	}
	// cleanup scope vars
	document = window = testElement = null;
};

var check = function(){
	for (var i = checks.length; i--;) if (checks[i]()){
		domready();
		return true;
	}
	return false;
};

var poll = function(){
	clearTimeout(timer);
	if (!check()) timer = setTimeout(poll, 10);
};

document.addListener('DOMContentLoaded', domready);

/*<ltIE8>*/
// doScroll technique by Diego Perini http://javascript.nwbox.com/IEContentLoaded/
// testElement.doScroll() throws when the DOM is not ready, only in the top window
var doScrollWorks = function(){
	try {
		testElement.doScroll();
		return true;
	} catch (e){}
	return false;
};
// If doScroll works already, it can't be used to determine domready
//   e.g. in an iframe
if (testElement.doScroll && !doScrollWorks()){
	checks.push(doScrollWorks);
	shouldPoll = true;
}
/*</ltIE8>*/

if (document.readyState) checks.push(function(){
	var state = document.readyState;
	return (state == 'loaded' || state == 'complete');
});

if ('onreadystatechange' in document) document.addListener('readystatechange', check);
else shouldPoll = true;

if (shouldPoll) poll();

Element.Events.domready = {
	onAdd: function(fn){
		if (ready) fn.call(this);
	}
};

// Make sure that domready fires before load
Element.Events.load = {
	base: 'load',
	onAdd: function(fn){
		if (loaded && this == window) fn.call(this);
	},
	condition: function(){
		if (this == window){
			domready();
			delete Element.Events.load;
		}
		return true;
	}
};

// This is based on the custom load event
window.addEvent('load', function(){
	loaded = true;
});

})(window, document); 

/**  /media/system/js/core.js  */

 /*
		GNU General Public License version 2 or later; see LICENSE.txt
*/
if("undefined"===typeof Joomla)var Joomla={};Joomla.editors={};Joomla.editors.instances={};Joomla.submitform=function(a,b){if("undefined"===typeof b&&(b=document.getElementById("adminForm"),!b))b=document.adminForm;if("undefined"!==typeof a&&''!==a)b.task.value=a;if("function"==typeof b.onsubmit)b.onsubmit();"function"==typeof b.fireEvent&&b.fireEvent("submit");b.submit()};Joomla.submitbutton=function(a){Joomla.submitform(a)};
Joomla.JText={strings:{},_:function(a,b){return"undefined"!==typeof this.strings[a.toUpperCase()]?this.strings[a.toUpperCase()]:b},load:function(a){for(var b in a)this.strings[b.toUpperCase()]=a[b];return this}};Joomla.replaceTokens=function(a){for(var b=document.getElementsByTagName("input"),c=0;c<b.length;c++)if("hidden"==b[c].type&&32==b[c].name.length&&"1"==b[c].value)b[c].name=a};Joomla.isEmail=function(a){return/^[\w-_.]*[\w-_.]@[\w].+[\w]+[\w]$/.test(a)};
Joomla.checkAll=function(a,b){b||(b="cb");if(a.form){for(var c=0,d=0,f=a.form.elements.length;d<f;d++){var e=a.form.elements[d];if(e.type==a.type&&(b&&0==e.id.indexOf(b)||!b))e.checked=a.checked,c+=!0==e.checked?1:0}if(a.form.boxchecked)a.form.boxchecked.value=c;return!0}return!1};
Joomla.renderMessages=function(a){Joomla.removeMessages();var b=document.id("system-message-container"),c=new Element("dl",{id:"system-message",role:"alert"});Object.each(a,function(a,b){(new Element("dt",{"class":b,html:b})).inject(c);var e=new Element("dd",{"class":b});e.addClass("message");var g=new Element("ul");Array.each(a,function(a){(new Element("li",{html:a})).inject(g)},this);g.inject(e);e.inject(c)},this);c.inject(b)};Joomla.removeMessages=function(){$$("#system-message-container > *").destroy()};
Joomla.isChecked=function(a,b){if("undefined"===typeof b&&(b=document.getElementById("adminForm"),!b))b=document.adminForm;!0==a?b.boxchecked.value++:b.boxchecked.value--};Joomla.popupWindow=function(a,b,c,d,f){window.open(a,b,"height="+d+",width="+c+",top="+(screen.height-d)/2+",left="+(screen.width-c)/2+",scrollbars="+f+",resizable").window.focus()};
Joomla.tableOrdering=function(a,b,c,d){if("undefined"===typeof d&&(d=document.getElementById("adminForm"),!d))d=document.adminForm;d.filter_order.value=a;d.filter_order_Dir.value=b;Joomla.submitform(c,d)};function writeDynaList(a,b,c,d,f){var a="\n\t<select "+a+">",e=0;for(x in b){if(b[x][0]==c){var g="";if(d==c&&f==b[x][1]||0==e&&d!=c)g='selected="selected"';a+='\n\t\t<option value="'+b[x][1]+'" '+g+">"+b[x][2]+"</option>"}e++}document.writeln(a+"\n\t</select>")}
function changeDynaList(a,b,c,d,f){a=document.adminForm[a];for(i in a.options.length)a.options[i]=null;i=0;for(x in b)if(b[x][0]==c){opt=new Option;opt.value=b[x][1];opt.text=b[x][2];if(d==c&&f==opt.value||0==i)opt.selected=!0;a.options[i++]=opt}a.length=i}function radioGetCheckedValue(a){if(!a)return"";var b=a.length;if(void 0==b)return a.checked?a.value:"";for(var c=0;c<b;c++)if(a[c].checked)return a[c].value;return""}
function getSelectedValue(a,b){var c=document[a][b];i=c.selectedIndex;return null!=i&&-1<i?c.options[i].value:null}
function checkAll(a,b){b||(b="cb");if(a.form){for(var c=0,d=0,f=a.form.elements.length;d<f;d++){var e=a.form.elements[d];if(e.type==a.type&&(b&&0==e.id.indexOf(b)||!b))e.checked=a.checked,c+=!0==e.checked?1:0}if(a.form.boxchecked)a.form.boxchecked.value=c;return!0}for(var e=document.adminForm,c=e.toggle.checked,f=a,g=0,d=0;d<f;d++){var h=e[b+""+d];if(h)h.checked=c,g++}document.adminForm.boxchecked.value=c?g:0}
function listItemTask(a,b){var c=document.adminForm,d=c[a];if(d){for(var f=0;;f++){var e=c["cb"+f];if(!e)break;e.checked=!1}d.checked=!0;c.boxchecked.value=1;submitbutton(b)}return!1}function isChecked(a){!0==a?document.adminForm.boxchecked.value++:document.adminForm.boxchecked.value--}function submitbutton(a){submitform(a)}
function submitform(a){if(a)document.adminForm.task.value=a;if("function"==typeof document.adminForm.onsubmit)document.adminForm.onsubmit();"function"==typeof document.adminForm.fireEvent&&document.adminForm.fireEvent("submit");document.adminForm.submit()}function popupWindow(a,b,c,d,f){winprops="height="+d+",width="+c+",top="+(screen.height-d)/2+",left="+(screen.width-c)/2+",scrollbars="+f+",resizable";win=window.open(a,b,winprops);4<=parseInt(navigator.appVersion)&&win.window.focus()}
function tableOrdering(a,b,c){var d=document.adminForm;d.filter_order.value=a;d.filter_order_Dir.value=b;submitform(c)}function saveorder(a,b){checkAll_button(a,b)}function checkAll_button(a,b){b||(b="saveorder");for(var c=0;c<=a;c++){var d=document.adminForm["cb"+c];if(d){if(!1==d.checked)d.checked=!0}else{alert("You cannot change the order of items, as an item in the list is `Checked Out`");return}}submitform(b)}; 

/**  /media/system/js/caption.js  */

 /*
		GNU General Public License version 2 or later; see LICENSE.txt
*/
var JCaption=new Class({initialize:function(a){this.selector=a;$$(a).each(function(a){this.createCaption(a)},this)},createCaption:function(a){var f=document.createTextNode(a.title),c=document.createElement("div"),d=document.createElement("p"),e=a.getAttribute("width"),b=a.getAttribute("align");if(!e)e=a.width;b||(b=a.getStyle("float"));if(!b)b=a.style.styleFloat;if(b==""||!b)b="none";d.appendChild(f);d.className=this.selector.replace(".","_");a.parentNode.insertBefore(c,a);c.appendChild(a);a.title!=
""&&c.appendChild(d);c.className=this.selector.replace(".","_");c.className=c.className+" "+b;c.setAttribute("style","float:"+b);c.style.width=e+"px"}}); 

/**  /media/system/js/mootools-more.js  */

 /* MooTools: the javascript framework. license: MIT-style license. copyright: Copyright (c) 2006-2020 [Valerio Proietti](https://mootools.net/).*/ 
/*!
Web Build: https://mootools.net/more/builder/a3048f4bfdf603b22a69c141dbd0fca9
*/
MooTools.More={version:"1.6.0",build:"45b71db70f879781a7e0b0d3fb3bb1307c2521eb"},function(){var e={wait:function(e){return this.chain(function(){return this.callChain.delay(null==e?500:e,this),this}.bind(this))}};Chain.implement(e),this.Fx&&Fx.implement(e),this.Element&&Element.implement&&this.Fx&&Element.implement({chains:function(e){return Array.convert(e||["tween","morph","reveal"]).each(function(e){(e=this.get(e))&&e.setOptions({link:"chain"})},this),this},pauseFx:function(e,t){return this.chains(t).get(t||"tween").wait(e),this}})}(),Class.Mutators.Binds=function(e){return this.prototype.initialize||this.implement("initialize",function(){}),Array.convert(e).concat(this.prototype.Binds||[])},Class.Mutators.initialize=function(e){return function(){return Array.convert(this.Binds).each(function(e){var t=this[e];t&&(this[e]=t.bind(this))},this),e.apply(this,arguments)}},Class.Occlude=new Class({occlude:function(e,t){t=document.id(t||this.element);var i=t.retrieve(e||this.property);return i&&!this.occluded?this.occluded=i:(this.occluded=!1,t.store(e||this.property,this),this.occluded)}}),Class.refactor=function(e,t){return Object.each(t,function(t,i){var n=e.prototype[i];n=n&&n.$origin||n||function(){},e.implement(i,"function"==typeof t?function(){var e=this.previous;this.previous=n;var i=t.apply(this,arguments);return this.previous=e,i}:t)}),e},Class.Singleton=new Class({initialize:function(e){var t,i=new Class(e);return function(){if(t)return t;t=Object.append({},i.prototype),t.constructor=i;var e=i.apply(t,arguments);return t="object"==typeof e?e:t}}}),function(){Events.Pseudos=function(e,t,i){var n=function(e){return{store:e.store?function(t,i){e.store("_monitorEvents:"+t,i)}:function(t,i){(e._monitorEvents||(e._monitorEvents={}))[t]=i},retrieve:e.retrieve?function(t,i){return e.retrieve("_monitorEvents:"+t,i)}:function(t,i){return e._monitorEvents?e._monitorEvents[t]||i:i}}},s=function(t){if(-1==t.indexOf(":")||!e)return null;for(var i=Slick.parse(t).expressions[0][0],n=i.pseudos,s=n.length,a=[];s--;){var r=n[s].key,o=e[r];null!=o&&a.push({event:i.tag,value:n[s].value,pseudo:r,original:t,listener:o})}return a.length?a:null};return{addEvent:function(e,i,a){var r=s(e);if(!r)return t.call(this,e,i,a);var o=n(this),l=o.retrieve(e,[]),h=r[0].event,u=Array.slice(arguments,2),d=i,c=this;return r.each(function(e){var t=e.listener,i=d;0==t?h+=":"+e.pseudo+"("+e.value+")":d=function(){t.call(c,e,i,arguments,d)}}),l.include({type:h,event:i,monitor:d}),o.store(e,l),e!=h&&t.apply(this,[e,i].concat(u)),t.apply(this,[h,d].concat(u))},removeEvent:function(e,t){if(!s(e))return i.call(this,e,t);var a=n(this),r=a.retrieve(e);if(!r)return this;var o=Array.slice(arguments,2);return i.apply(this,[e,t].concat(o)),r.each(function(e,n){t&&e.event!=t||i.apply(this,[e.type,e.monitor].concat(o)),delete r[n]},this),a.store(e,r),this}}};var e={once:function(e,t,i,n){t.apply(this,i),this.removeEvent(e.event,n).removeEvent(e.original,t)},throttle:function(e,t,i){t._throttled||(t.apply(this,i),t._throttled=setTimeout(function(){t._throttled=!1},e.value||250))},pause:function(e,t,i){clearTimeout(t._pause),t._pause=t.delay(e.value||250,this,i)}};Events.definePseudo=function(t,i){return e[t]=i,this},Events.lookupPseudo=function(t){return e[t]};var t=Events.prototype;Events.implement(Events.Pseudos(e,t.addEvent,t.removeEvent)),["Request","Fx"].each(function(e){this[e]&&this[e].implement(Events.prototype)})}(),function(){var e=this.Drag=new Class({Implements:[Events,Options],options:{snap:6,unit:"px",grid:!1,style:!0,limit:!1,handle:!1,invert:!1,unDraggableTags:["button","input","a","textarea","select","option"],preventDefault:!1,stopPropagation:!1,compensateScroll:!1,modifiers:{x:"left",y:"top"}},initialize:function(){var t=Array.link(arguments,{options:Type.isObject,element:function(e){return null!=e}});this.element=document.id(t.element),this.document=this.element.getDocument(),this.setOptions(t.options||{});var i=typeOf(this.options.handle);this.handles=("array"==i||"collection"==i?$$(this.options.handle):document.id(this.options.handle))||this.element,this.mouse={now:{},pos:{}},this.value={start:{},now:{}},this.offsetParent=function(e){var t=e.getOffsetParent();return!t||/^(?:body|html)$/i.test(t.tagName)?window:document.id(t)}(this.element),this.selection="selectstart"in document?"selectstart":"mousedown",this.compensateScroll={start:{},diff:{},last:{}},!("ondragstart"in document)||"FileReader"in window||e.ondragstartFixed||(document.ondragstart=Function.convert(!1),e.ondragstartFixed=!0),this.bound={start:this.start.bind(this),check:this.check.bind(this),drag:this.drag.bind(this),stop:this.stop.bind(this),cancel:this.cancel.bind(this),eventStop:Function.convert(!1),scrollListener:this.scrollListener.bind(this)},this.attach()},attach:function(){return this.handles.addEvent("mousedown",this.bound.start),this.handles.addEvent("touchstart",this.bound.start),this.options.compensateScroll&&this.offsetParent.addEvent("scroll",this.bound.scrollListener),this},detach:function(){return this.handles.removeEvent("mousedown",this.bound.start),this.handles.removeEvent("touchstart",this.bound.start),this.options.compensateScroll&&this.offsetParent.removeEvent("scroll",this.bound.scrollListener),this},scrollListener:function(){if(this.mouse.start){var e=this.offsetParent.getScroll();if("absolute"==this.element.getStyle("position")){var t=this.sumValues(e,this.compensateScroll.last,-1);this.mouse.now=this.sumValues(this.mouse.now,t,1)}else this.compensateScroll.diff=this.sumValues(e,this.compensateScroll.start,-1);this.offsetParent!=window&&(this.compensateScroll.diff=this.sumValues(this.compensateScroll.start,e,-1)),this.compensateScroll.last=e,this.render(this.options)}},sumValues:function(e,t,i){var n={},s=this.options;for(var a in s.modifiers)s.modifiers[a]&&(n[a]=e[a]+t[a]*i);return n},start:function(e){if(!this.options.unDraggableTags.contains(e.target.get("tag"))){var t=this.options;if(!e.rightClick){t.preventDefault&&e.preventDefault(),t.stopPropagation&&e.stopPropagation(),this.compensateScroll.start=this.compensateScroll.last=this.offsetParent.getScroll(),this.compensateScroll.diff={x:0,y:0},this.mouse.start=e.page,this.fireEvent("beforeStart",this.element);var i=t.limit;this.limit={x:[],y:[]};var n,s,a=this.offsetParent==window?null:this.offsetParent;for(n in t.modifiers)if(t.modifiers[n]){var r=this.element.getStyle(t.modifiers[n]);if(r&&!r.match(/px$/)&&(s||(s=this.element.getCoordinates(a)),r=s[t.modifiers[n]]),t.style?this.value.now[n]=(r||0).toInt():this.value.now[n]=this.element[t.modifiers[n]],t.invert&&(this.value.now[n]*=-1),this.mouse.pos[n]=e.page[n]-this.value.now[n],i&&i[n])for(var o=2;o--;){var l=i[n][o];(l||0===l)&&(this.limit[n][o]="function"==typeof l?l():l)}}"number"==typeOf(this.options.grid)&&(this.options.grid={x:this.options.grid,y:this.options.grid});var h={mousemove:this.bound.check,mouseup:this.bound.cancel,touchmove:this.bound.check,touchend:this.bound.cancel};h[this.selection]=this.bound.eventStop,this.document.addEvents(h)}}},check:function(e){this.options.preventDefault&&e.preventDefault(),Math.round(Math.sqrt(Math.pow(e.page.x-this.mouse.start.x,2)+Math.pow(e.page.y-this.mouse.start.y,2)))>this.options.snap&&(this.cancel(),this.document.addEvents({mousemove:this.bound.drag,mouseup:this.bound.stop,touchmove:this.bound.drag,touchend:this.bound.stop}),this.fireEvent("start",[this.element,e]).fireEvent("snap",this.element))},drag:function(e){var t=this.options;t.preventDefault&&e.preventDefault(),this.mouse.now=this.sumValues(e.page,this.compensateScroll.diff,-1),this.render(t),this.fireEvent("drag",[this.element,e])},render:function(e){for(var t in e.modifiers)e.modifiers[t]&&(this.value.now[t]=this.mouse.now[t]-this.mouse.pos[t],e.invert&&(this.value.now[t]*=-1),e.limit&&this.limit[t]&&((this.limit[t][1]||0===this.limit[t][1])&&this.value.now[t]>this.limit[t][1]?this.value.now[t]=this.limit[t][1]:(this.limit[t][0]||0===this.limit[t][0])&&this.value.now[t]<this.limit[t][0]&&(this.value.now[t]=this.limit[t][0])),e.grid[t]&&(this.value.now[t]-=(this.value.now[t]-(this.limit[t][0]||0))%e.grid[t]),e.style?this.element.setStyle(e.modifiers[t],this.value.now[t]+e.unit):this.element[e.modifiers[t]]=this.value.now[t])},cancel:function(e){this.document.removeEvents({mousemove:this.bound.check,mouseup:this.bound.cancel,touchmove:this.bound.check,touchend:this.bound.cancel}),e&&(this.document.removeEvent(this.selection,this.bound.eventStop),this.fireEvent("cancel",this.element))},stop:function(e){var t={mousemove:this.bound.drag,mouseup:this.bound.stop,touchmove:this.bound.drag,touchend:this.bound.stop};t[this.selection]=this.bound.eventStop,this.document.removeEvents(t),this.mouse.start=null,e&&this.fireEvent("complete",[this.element,e])}})}(),Element.implement({makeResizable:function(e){var t=new Drag(this,Object.merge({modifiers:{x:"width",y:"height"}},e));return this.store("resizer",t),t.addEvent("drag",function(){this.fireEvent("resize",t)}.bind(this))}}),Drag.Move=new Class({Extends:Drag,options:{droppables:[],container:!1,precalculate:!1,includeMargins:!0,checkDroppables:!0},initialize:function(e,t){if(this.parent(e,t),e=this.element,this.droppables=$$(this.options.droppables),this.setContainer(this.options.container),this.options.style){if("left"==this.options.modifiers.x&&"top"==this.options.modifiers.y){var i=e.getOffsetParent(),n=e.getStyles("left","top");!i||"auto"!=n.left&&"auto"!=n.top||e.setPosition(e.getPosition(i))}"static"==e.getStyle("position")&&e.setStyle("position","absolute")}this.addEvent("start",this.checkDroppables,!0),this.overed=null},setContainer:function(e){this.container=document.id(e),this.container&&"element"!=typeOf(this.container)&&(this.container=document.id(this.container.getDocument().body))},start:function(e){this.container&&(this.options.limit=this.calculateLimit()),this.options.precalculate&&(this.positions=this.droppables.map(function(e){return e.getCoordinates()})),this.parent(e)},calculateLimit:function(){var e=this.element,t=this.container,i=document.id(e.getOffsetParent())||document.body,n=t.getCoordinates(i),s={},a={},r={},o={},l={},h=i.getScroll();["top","right","bottom","left"].each(function(n){s[n]=e.getStyle("margin-"+n).toInt(),a[n]=e.getStyle("border-"+n).toInt(),r[n]=t.getStyle("margin-"+n).toInt(),o[n]=t.getStyle("border-"+n).toInt(),l[n]=i.getStyle("padding-"+n).toInt()},this);var u=e.offsetWidth+s.left+s.right,d=e.offsetHeight+s.top+s.bottom,c=0+h.x,m=0+h.y,g=n.right-o.right-u+h.x,p=n.bottom-o.bottom-d+h.y;if(this.options.includeMargins?(c+=s.left,m+=s.top):(g+=s.right,p+=s.bottom),"relative"==e.getStyle("position")){var f=e.getCoordinates(i);f.left-=e.getStyle("left").toInt(),f.top-=e.getStyle("top").toInt(),c-=f.left,m-=f.top,"relative"!=t.getStyle("position")&&(c+=o.left,m+=o.top),g+=s.left-f.left,p+=s.top-f.top,t!=i&&(c+=r.left+l.left,!l.left&&c<0&&(c=0),m+=i==document.body?0:r.top+l.top,!l.top&&m<0&&(m=0))}else c-=s.left,m-=s.top,t!=i&&(c+=n.left+o.left,m+=n.top+o.top);return{x:[c,g],y:[m,p]}},getDroppableCoordinates:function(e){var t=e.getCoordinates();if("fixed"==e.getStyle("position")){var i=window.getScroll();t.left+=i.x,t.right+=i.x,t.top+=i.y,t.bottom+=i.y}return t},checkDroppables:function(){var e=this.droppables.filter(function(e,t){e=this.positions?this.positions[t]:this.getDroppableCoordinates(e);var i=this.mouse.now;return i.x>e.left&&i.x<e.right&&i.y<e.bottom&&i.y>e.top},this).getLast();this.overed!=e&&(this.overed&&this.fireEvent("leave",[this.element,this.overed]),e&&this.fireEvent("enter",[this.element,e]),this.overed=e)},drag:function(e){this.parent(e),this.options.checkDroppables&&this.droppables.length&&this.checkDroppables()},stop:function(e){return this.checkDroppables(),this.fireEvent("drop",[this.element,this.overed,e]),this.overed=null,this.parent(e)}}),Element.implement({makeDraggable:function(e){var t=new Drag.Move(this,e);return this.store("dragger",t),t}}),function(){var e=function(e,t){var i=[];return Object.each(t,function(t){Object.each(t,function(t){e.each(function(e){i.push(e+"-"+t+("border"==e?"-width":""))})})}),i},t=function(e,t){var i=0;return Object.each(t,function(t,n){n.test(e)&&(i+=t.toInt())}),i},i=function(e){return!(e&&!e.offsetHeight&&!e.offsetWidth)};Element.implement({measure:function(e){if(i(this))return e.call(this);for(var t=this.getParent(),n=[];!i(t)&&t!=document.body;)n.push(t.expose()),t=t.getParent();var s=this.expose(),a=e.call(this);return s(),n.each(function(e){e()}),a},expose:function(){if("none"!=this.getStyle("display"))return function(){};var e=this.style.cssText;return this.setStyles({display:"block",position:"absolute",visibility:"hidden"}),function(){this.style.cssText=e}.bind(this)},getDimensions:function(e){e=Object.merge({computeSize:!1},e);var t={x:0,y:0},i=function(e,t){return t.computeSize?e.getComputedSize(t):e.getSize()},n=this.getParent("body");if(n&&"none"==this.getStyle("display"))t=this.measure(function(){return i(this,e)});else if(n)try{t=i(this,e)}catch(e){}return Object.append(t,t.x||0===t.x?{width:t.x,height:t.y}:{x:t.width,y:t.height})},getComputedSize:function(i){i=Object.merge({styles:["padding","border"],planes:{height:["top","bottom"],width:["left","right"]},mode:"both"},i);var n,s={},a={width:0,height:0};return"vertical"==i.mode?(delete a.width,delete i.planes.width):"horizontal"==i.mode&&(delete a.height,delete i.planes.height),e(i.styles,i.planes).each(function(e){s[e]=this.getStyle(e).toInt()},this),Object.each(i.planes,function(e,i){var r=i.capitalize(),o=this.getStyle(i);"auto"!=o||n||(n=this.getDimensions()),o=s[i]="auto"==o?n[i]:o.toInt(),a["total"+r]=o,e.each(function(e){var i=t(e,s);a["computed"+e.capitalize()]=i,a["total"+r]+=i})},this),Object.append(a,s)}})}(),function(){this.Slider=new Class({Implements:[Events,Options],Binds:["clickedElement","draggedKnob","scrolledElement"],options:{onTick:function(e){this.setKnobPosition(e)},initialStep:0,snap:!1,offset:0,range:!1,wheel:!1,steps:100,mode:"horizontal"},initialize:function(e,t,i){this.setOptions(i),i=this.options,this.element=document.id(e),t=this.knob=document.id(t),this.previousChange=this.previousEnd=this.step=i.initialStep?i.initialStep:i.range?i.range[0]:0;var n={},s={x:!1,y:!1};switch(i.mode){case"vertical":this.axis="y",this.property="top",this.offset="offsetHeight";break;case"horizontal":this.axis="x",this.property="left",this.offset="offsetWidth"}this.setSliderDimensions(),this.setRange(i.range,null,!0),"static"==t.getStyle("position")&&t.setStyle("position","relative"),t.setStyle(this.property,-i.offset),s[this.axis]=this.property,n[this.axis]=[-i.offset,this.full-i.offset];var a={snap:0,limit:n,modifiers:s,onDrag:this.draggedKnob,onStart:this.draggedKnob,onBeforeStart:function(){this.isDragging=!0}.bind(this),onCancel:function(){this.isDragging=!1}.bind(this),onComplete:function(){this.isDragging=!1,this.draggedKnob(),this.end()}.bind(this)};i.snap&&this.setSnap(a),this.drag=new Drag(t,a),null!=i.initialStep&&this.set(i.initialStep,!0),this.attach()},attach:function(){return this.element.addEvent("mousedown",this.clickedElement),this.options.wheel&&this.element.addEvent("mousewheel",this.scrolledElement),this.drag.attach(),this},detach:function(){return this.element.removeEvent("mousedown",this.clickedElement).removeEvent("mousewheel",this.scrolledElement),this.drag.detach(),this},autosize:function(){return this.setSliderDimensions().setKnobPosition(this.toPosition(this.step)),this.drag.options.limit[this.axis]=[-this.options.offset,this.full-this.options.offset],this.options.snap&&this.setSnap(),this},setSnap:function(e){return e||(e=this.drag.options),e.grid=Math.ceil(this.stepWidth),e.limit[this.axis][1]=this.element[this.offset],this},setKnobPosition:function(e){return this.options.snap&&(e=this.toPosition(this.step)),this.knob.setStyle(this.property,e),this},setSliderDimensions:function(){return this.full=this.element.measure(function(){return this.half=this.knob[this.offset]/2,this.element[this.offset]-this.knob[this.offset]+2*this.options.offset}.bind(this)),this},set:function(e,t){return this.range>0^e<this.min||(e=this.min),this.range>0^e>this.max||(e=this.max),this.step=e.round(this.modulus.decimalLength),t?this.checkStep().setKnobPosition(this.toPosition(this.step)):this.checkStep().fireEvent("tick",this.toPosition(this.step)).fireEvent("move").end(),this},setRange:function(e,t,i){this.min=Array.pick([e[0],0]),this.max=Array.pick([e[1],this.options.steps]),this.range=this.max-this.min,this.steps=this.options.steps||this.full;this.stepSize=Math.abs(this.range)/this.steps;return this.stepWidth=this.stepSize*this.full/Math.abs(this.range),this.setModulus(),e&&this.set(Array.pick([t,this.step]).limit(this.min,this.max),i),this},setModulus:function(){for(var e=((this.stepSize+"").split(".")[1]||[]).length,t="1";e--;)t+="0";this.modulus={multiplier:t.toInt(10),decimalLength:t.length-1}},clickedElement:function(e){if(!this.isDragging&&e.target!=this.knob){var t=this.range<0?-1:1,i=e.page[this.axis]-this.element.getPosition()[this.axis]-this.half;i=i.limit(-this.options.offset,this.full-this.options.offset),this.step=(this.min+t*this.toStep(i)).round(this.modulus.decimalLength),this.checkStep().fireEvent("tick",i).fireEvent("move").end()}},scrolledElement:function(e){var t="horizontal"==this.options.mode?e.wheel<0:e.wheel>0;this.set(this.step+(t?-1:1)*this.stepSize),e.stop()},draggedKnob:function(){var e=this.range<0?-1:1,t=this.drag.value.now[this.axis];t=t.limit(-this.options.offset,this.full-this.options.offset),this.step=(this.min+e*this.toStep(t)).round(this.modulus.decimalLength),this.checkStep(),this.fireEvent("move")},checkStep:function(){var e=this.step;return this.previousChange!=e&&(this.previousChange=e,this.fireEvent("change",e)),this},end:function(){var e=this.step;return this.previousEnd!==e&&(this.previousEnd=e,this.fireEvent("complete",e+"")),this},toStep:function(e){var t=(e+this.options.offset)*this.stepSize/this.full*this.steps;return this.options.steps?(t-t*this.modulus.multiplier%(this.stepSize*this.modulus.multiplier)/this.modulus.multiplier).round(this.modulus.decimalLength):t},toPosition:function(e){return this.full*Math.abs(this.min-e)/(this.steps*this.stepSize)-this.options.offset||0}})}(),function(){this.Sortables=new Class({Implements:[Events,Options],options:{opacity:1,clone:!1,revert:!1,handle:!1,dragOptions:{},unDraggableTags:["button","input","a","textarea","select","option"]},initialize:function(e,t){this.setOptions(t),this.elements=[],this.lists=[],this.idle=!0,this.addLists($$(document.id(e)||e)),this.options.clone||(this.options.revert=!1),this.options.revert&&(this.effect=new Fx.Morph(null,Object.merge({duration:250,link:"cancel"},this.options.revert)))},attach:function(){return this.addLists(this.lists),this},detach:function(){return this.lists=this.removeLists(this.lists),this},addItems:function(){return Array.flatten(arguments).each(function(e){this.elements.push(e);var t=e.retrieve("sortables:start",function(t){this.start.call(this,t,e)}.bind(this));(this.options.handle?e.getElement(this.options.handle)||e:e).addEvent("mousedown",t)},this),this},addLists:function(){return Array.flatten(arguments).each(function(e){this.lists.include(e),this.addItems(e.getChildren())},this),this},removeItems:function(){return $$(Array.flatten(arguments).map(function(e){this.elements.erase(e);var t=e.retrieve("sortables:start");return(this.options.handle?e.getElement(this.options.handle)||e:e).removeEvent("mousedown",t),e},this))},removeLists:function(){return $$(Array.flatten(arguments).map(function(e){return this.lists.erase(e),this.removeItems(e.getChildren()),e},this))},getDroppableCoordinates:function(e){var t=e.getOffsetParent(),i=e.getPosition(t),n={w:window.getScroll(),offsetParent:t.getScroll()};return i.x+=n.offsetParent.x,i.y+=n.offsetParent.y,"fixed"==t.getStyle("position")&&(i.x-=n.w.x,i.y-=n.w.y),i},getClone:function(e,t){if(!this.options.clone)return new Element(t.tagName).inject(document.body);if("function"==typeOf(this.options.clone))return this.options.clone.call(this,e,t,this.list);var i=t.clone(!0).setStyles({margin:0,position:"absolute",visibility:"hidden",width:t.getStyle("width")}).addEvent("mousedown",function(e){t.fireEvent("mousedown",e)});return i.get("html").test("radio")&&i.getElements("input[type=radio]").each(function(e,i){e.set("name","clone_"+i),e.get("checked")&&t.getElements("input[type=radio]")[i].set("checked",!0)}),i.inject(this.list).setPosition(this.getDroppableCoordinates(this.element))},getDroppables:function(){var e=this.list.getChildren().erase(this.clone).erase(this.element);return this.options.constrain||e.append(this.lists).erase(this.list),e},insert:function(e,t){var i="inside";this.lists.contains(t)?(this.list=t,this.drag.droppables=this.getDroppables()):i=this.element.getAllPrevious().contains(t)?"before":"after",this.element.inject(t,i),this.fireEvent("sort",[this.element,this.clone])},start:function(e,t){!this.idle||e.rightClick||!this.options.handle&&this.options.unDraggableTags.contains(e.target.get("tag"))||(this.idle=!1,this.element=t,this.opacity=t.getStyle("opacity"),this.list=t.getParent(),this.clone=this.getClone(e,t),this.drag=new Drag.Move(this.clone,Object.merge({droppables:this.getDroppables()},this.options.dragOptions)).addEvents({onSnap:function(){e.stop(),this.clone.setStyle("visibility","visible"),this.element.setStyle("opacity",this.options.opacity||0),this.fireEvent("start",[this.element,this.clone])}.bind(this),onEnter:this.insert.bind(this),onCancel:this.end.bind(this),onComplete:this.end.bind(this)}),this.clone.inject(this.element,"before"),this.drag.start(e))},end:function(){this.drag.detach(),this.element.setStyle("opacity",this.opacity);var e=this;if(this.effect){var t=this.element.getStyles("width","height"),i=this.clone,n=i.computePosition(this.getDroppableCoordinates(i)),s=function(){this.removeEvent("cancel",s),i.destroy(),e.reset()};this.effect.element=i,this.effect.start({top:n.top,left:n.left,width:t.width,height:t.height,opacity:.25}).addEvent("cancel",s).chain(s)}else this.clone.destroy(),e.reset()},reset:function(){this.idle=!0,this.fireEvent("complete",this.element)},serialize:function(){var e=Array.link(arguments,{modifier:Type.isFunction,index:function(e){return null!=e}}),t=this.lists.map(function(t){return t.getChildren().map(e.modifier||function(e){return e.get("id")},this)},this),i=e.index;return 1==this.lists.length&&(i=0),(i||0===i)&&i>=0&&i<this.lists.length?t[i]:t}})}(),function(){for(var e={relay:!1},t=["once","throttle","pause"],i=t.length;i--;)e[t[i]]=Events.lookupPseudo(t[i]);DOMEvent.definePseudo=function(t,i){return e[t]=i,this};var n=Element.prototype;[Element,Window,Document].invoke("implement",Events.Pseudos(e,n.addEvent,n.removeEvent))}(),function(){DOMEvent.definePseudo("keys",function(e,t,i){var n=i[0],s=[],a=this.retrieve("$moo:keys-pressed",[]),r=e.value;if("+"!=r?s.append(r.replace("++",function(){return s.push("+"),""}).split("+")):s=["+"],a.include(n.key),s.every(function(e){return a.contains(e)})&&t.apply(this,i),this.store("$moo:keys-pressed",a),!this.retrieve("$moo:keys-keyup")){var o=function(e){(function(){a=this.retrieve("$moo:keys-pressed",[]).erase(e.key),this.store("$moo:keys-pressed",a)}).delay(0,this)};this.store("$moo:keys-keyup",o).addEvent("keyup",o)}}),DOMEvent.defineKeys({16:"shift",17:"control",18:"alt",20:"capslock",33:"pageup",34:"pagedown",35:"end",36:"home",144:"numlock",145:"scrolllock",186:";",187:"=",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",107:"+",109:"-",189:"-"})}(),function(){var e={a:/[àáâãäåăą]/g,A:/[ÀÁÂÃÄÅĂĄ]/g,c:/[ćčç]/g,C:/[ĆČÇ]/g,d:/[ďđ]/g,D:/[ĎÐ]/g,e:/[èéêëěę]/g,E:/[ÈÉÊËĚĘ]/g,g:/[ğ]/g,G:/[Ğ]/g,i:/[ìíîï]/g,I:/[ÌÍÎÏ]/g,l:/[ĺľł]/g,L:/[ĹĽŁ]/g,n:/[ñňń]/g,N:/[ÑŇŃ]/g,o:/[òóôõöøő]/g,O:/[ÒÓÔÕÖØ]/g,r:/[řŕ]/g,R:/[ŘŔ]/g,s:/[ššş]/g,S:/[ŠŞŚ]/g,t:/[ťţ]/g,T:/[ŤŢ]/g,u:/[ùúûůüµ]/g,U:/[ÙÚÛŮÜ]/g,y:/[ÿý]/g,Y:/[ŸÝ]/g,z:/[žźż]/g,Z:/[ŽŹŻ]/g,th:/[þ]/g,TH:/[Þ]/g,dh:/[ð]/g,DH:/[Ð]/g,ss:/[ß]/g,oe:/[œ]/g,OE:/[Œ]/g,ae:/[æ]/g,AE:/[Æ]/g},t={" ":/[\xa0\u2002\u2003\u2009]/g,"*":/[\xb7]/g,"'":/[\u2018\u2019]/g,'"':/[\u201c\u201d]/g,"...":/[\u2026]/g,"-":/[\u2013]/g,"&raquo;":/[\uFFFD]/g},i={ms:1,s:1e3,m:6e4,h:36e5},n=/(\d*.?\d+)([msh]+)/,s=function(e,t){var i,n=e;for(i in t)n=n.replace(t[i],i);return n},a=function(e,t){e=e||(t?"":"\\w+");var i=t?"<"+e+"(?!\\w)[^>]*>([\\s\\S]*?)</"+e+"(?!\\w)>":"</?"+e+"/?>|<"+e+"[\\s|/][^>]*>";return new RegExp(i,"gi")};String.implement({standardize:function(){return s(this,e)},repeat:function(e){return new Array(e+1).join(this)},pad:function(e,t,i){if(this.length>=e)return this;var n=(null==t?" ":""+t).repeat(e-this.length).substr(0,e-this.length);return i&&"right"!=i?"left"==i?n+this:n.substr(0,(n.length/2).floor())+this+n.substr(0,(n.length/2).ceil()):this+n},getTags:function(e,t){return this.match(a(e,t))||[]},stripTags:function(e,t){return this.replace(a(e,t),"")},tidy:function(){return s(this,t)},truncate:function(e,t,i){var n=this;if(null==t&&1==arguments.length&&(t="…"),n.length>e){if(n=n.substring(0,e),i){var s=n.lastIndexOf(i);-1!=s&&(n=n.substr(0,s))}t&&(n+=t)}return n},ms:function(){var e=n.exec(this);return null==e?Number(this):Number(e[1])*i[e[2]]}})}(),Element.implement({tidy:function(){this.set("value",this.get("value").tidy())},getTextInRange:function(e,t){return this.get("value").substring(e,t)},getSelectedText:function(){return this.setSelectionRange?this.getTextInRange(this.getSelectionStart(),this.getSelectionEnd()):document.selection.createRange().text},getSelectedRange:function(){if(null!=this.selectionStart)return{start:this.selectionStart,end:this.selectionEnd};var e={start:0,end:0},t=this.getDocument().selection.createRange();if(!t||t.parentElement()!=this)return e;var i=t.duplicate();if("text"==this.type)e.start=0-i.moveStart("character",-1e5),e.end=e.start+t.text.length;else{var n=this.get("value"),s=n.length;i.moveToElementText(this),i.setEndPoint("StartToEnd",t),i.text.length&&(s-=n.match(/[\n\r]*$/)[0].length),e.end=s-i.text.length,i.setEndPoint("StartToStart",t),e.start=s-i.text.length}return e},getSelectionStart:function(){return this.getSelectedRange().start},getSelectionEnd:function(){return this.getSelectedRange().end},setCaretPosition:function(e){return"end"==e&&(e=this.get("value").length),this.selectRange(e,e),this},getCaretPosition:function(){return this.getSelectedRange().start},selectRange:function(e,t){if(this.setSelectionRange)this.focus(),this.setSelectionRange(e,t);else{var i=this.get("value"),n=i.substr(e,t-e).replace(/\r/g,"").length;e=i.substr(0,e).replace(/\r/g,"").length;var s=this.createTextRange();s.collapse(!0),s.moveEnd("character",e+n),s.moveStart("character",e),s.select()}return this},insertAtCursor:function(e,t){var i=this.getSelectedRange(),n=this.get("value");return this.set("value",n.substring(0,i.start)+e+n.substring(i.end,n.length)),!1!==t?this.selectRange(i.start,i.start+e.length):this.setCaretPosition(i.start+e.length),this},insertAroundCursor:function(e,t){e=Object.append({before:"",defaultMiddle:"",after:""},e);var i=this.getSelectedText()||e.defaultMiddle,n=this.getSelectedRange(),s=this.get("value");if(n.start==n.end)this.set("value",s.substring(0,n.start)+e.before+i+e.after+s.substring(n.end,s.length)),this.selectRange(n.start+e.before.length,n.end+e.before.length+i.length);else{var a=s.substring(n.start,n.end);this.set("value",s.substring(0,n.start)+e.before+a+e.after+s.substring(n.end,s.length));var r=n.start+e.before.length;!1!==t?this.selectRange(r,r+a.length):this.setCaretPosition(r+s.length)}return this}}),function(){var e=!1,t=!1,i=function(){var i=new Element("div").setStyles({position:"fixed",top:0,right:0}).inject(document.body);e=0===i.offsetTop,i.dispose(),t=!0};Element.implement({pin:function(n,s){if(t||i(),"none"==this.getStyle("display"))return this;var a,r,o,l=window.getScroll();if(!1!==n){if(a=this.getPosition(),!this.retrieve("pin:_pinned")){var h={top:a.y-l.y,left:a.x-l.x,margin:"0px",padding:"0px"};if(e&&!s)this.setStyle("position","fixed").setStyles(h);else{r=this.getOffsetParent();var u=this.getPosition(r),d=this.getStyles("left","top");(r&&"auto"==d.left||"auto"==d.top)&&this.setPosition(u),"static"==this.getStyle("position")&&this.setStyle("position","absolute"),u={x:d.left.toInt()-l.x,y:d.top.toInt()-l.y},o=function(){if(this.retrieve("pin:_pinned")){var e=window.getScroll();this.setStyles({left:u.x+e.x,top:u.y+e.y})}}.bind(this),this.store("pin:_scrollFixer",o),window.addEvent("scroll",o)}this.store("pin:_pinned",!0)}}else{if(!this.retrieve("pin:_pinned"))return this;r=this.getParent();"static"!=r.getComputedStyle("position")||r.getOffsetParent();a=this.getPosition(),this.store("pin:_pinned",!1),o=this.retrieve("pin:_scrollFixer"),o?(this.store("pin:_scrollFixer",null),window.removeEvent("scroll",o)):this.setStyles({position:"absolute",top:a.y+l.y,left:a.x+l.x}),this.removeClass("isPinned")}return this},unpin:function(){return this.pin(!1)},togglePin:function(){return this.pin(!this.retrieve("pin:_pinned"))}})}(),function(e){var t=Element.Position={options:{relativeTo:document.body,position:{x:"center",y:"center"},offset:{x:0,y:0}},getOptions:function(e,i){return i=Object.merge({},t.options,i),t.setPositionOption(i),t.setEdgeOption(i),t.setOffsetOption(e,i),t.setDimensionsOption(e,i),i},setPositionOption:function(e){e.position=t.getCoordinateFromValue(e.position)},setEdgeOption:function(e){var i=t.getCoordinateFromValue(e.edge);e.edge=i||("center"==e.position.x&&"center"==e.position.y?{x:"center",y:"center"}:{x:"left",y:"top"})},setOffsetOption:function(e,t){var i={x:0,y:0},n={x:0,y:0},s=e.measure(function(){return document.id(this.getOffsetParent())});s&&s!=e.getDocument().body&&(n=s.getScroll(),i=s.measure(function(){var e=this.getPosition();if("fixed"==this.getStyle("position")){var t=window.getScroll();e.x+=t.x,e.y+=t.y}return e}),t.offset={parentPositioned:s!=document.id(t.relativeTo),x:t.offset.x-i.x+n.x,y:t.offset.y-i.y+n.y})},setDimensionsOption:function(e,t){t.dimensions=e.getDimensions({computeSize:!0,styles:["padding","border","margin"]})},getPosition:function(e,i){var n={};i=t.getOptions(e,i);var s=document.id(i.relativeTo)||document.body;t.setPositionCoordinates(i,n,s),i.edge&&t.toEdge(n,i);var a=i.offset;return n.left=(n.x>=0||a.parentPositioned||i.allowNegative?n.x:0).toInt(),n.top=(n.y>=0||a.parentPositioned||i.allowNegative?n.y:0).toInt(),t.toMinMax(n,i),(i.relFixedPosition||"fixed"==s.getStyle("position"))&&t.toRelFixedPosition(s,n),i.ignoreScroll&&t.toIgnoreScroll(s,n),i.ignoreMargins&&t.toIgnoreMargins(n,i),n.left=Math.ceil(n.left),n.top=Math.ceil(n.top),delete n.x,delete n.y,n},setPositionCoordinates:function(e,t,i){var n=e.offset.y,s=e.offset.x,a=i==document.body?window.getScroll():i.getPosition(),r=a.y,o=a.x,l=window.getSize();switch(e.position.x){case"left":t.x=o+s;break;case"right":t.x=o+s+i.offsetWidth;break;default:t.x=o+(i==document.body?l.x:i.offsetWidth)/2+s}switch(e.position.y){case"top":t.y=r+n;break;case"bottom":t.y=r+n+i.offsetHeight;break;default:t.y=r+(i==document.body?l.y:i.offsetHeight)/2+n}},toMinMax:function(e,t){var i,n={left:"x",top:"y"};["minimum","maximum"].each(function(s){["left","top"].each(function(a){null!=(i=t[s]?t[s][n[a]]:null)&&("minimum"==s?e[a]<i:e[a]>i)&&(e[a]=i)})})},toRelFixedPosition:function(e,t){var i=window.getScroll();t.top+=i.y,t.left+=i.x},toIgnoreScroll:function(e,t){var i=e.getScroll();t.top-=i.y,t.left-=i.x},toIgnoreMargins:function(e,t){e.left+="right"==t.edge.x?t.dimensions["margin-right"]:"center"!=t.edge.x?-t.dimensions["margin-left"]:-t.dimensions["margin-left"]+(t.dimensions["margin-right"]+t.dimensions["margin-left"])/2,e.top+="bottom"==t.edge.y?t.dimensions["margin-bottom"]:"center"!=t.edge.y?-t.dimensions["margin-top"]:-t.dimensions["margin-top"]+(t.dimensions["margin-bottom"]+t.dimensions["margin-top"])/2},toEdge:function(e,t){var i={},n=t.dimensions,s=t.edge;switch(s.x){case"left":i.x=0;break;case"right":
i.x=-n.x-n.computedRight-n.computedLeft;break;default:i.x=-Math.round(n.totalWidth/2)}switch(s.y){case"top":i.y=0;break;case"bottom":i.y=-n.y-n.computedTop-n.computedBottom;break;default:i.y=-Math.round(n.totalHeight/2)}e.x+=i.x,e.y+=i.y},getCoordinateFromValue:function(e){return"string"!=typeOf(e)?e:(e=e.toLowerCase(),{x:e.test("left")?"left":e.test("right")?"right":"center",y:e.test(/upper|top/)?"top":e.test("bottom")?"bottom":"center"})}};Element.implement({position:function(t){if(t&&(null!=t.x||null!=t.y))return e?e.apply(this,arguments):this;var i=this.setStyle("position","absolute").calculatePosition(t);return t&&t.returnPos?i:this.setStyles(i)},calculatePosition:function(e){return t.getPosition(this,e)}})}(Element.prototype.position),Element.implement({isDisplayed:function(){return"none"!=this.getStyle("display")},isVisible:function(){var e=this.offsetWidth,t=this.offsetHeight;return(0!=e||0!=t)&&(e>0&&t>0||"none"!=this.style.display)},toggle:function(){return this[this.isDisplayed()?"hide":"show"]()},hide:function(){var e;try{e=this.getStyle("display")}catch(e){}return"none"==e?this:this.store("element:_originalDisplay",e||"").setStyle("display","none")},show:function(e){return!e&&this.isDisplayed()?this:(e=e||this.retrieve("element:_originalDisplay")||"block",this.setStyle("display","none"==e?"block":e))},swapClass:function(e,t){return this.removeClass(e).addClass(t)}}),Document.implement({clearSelection:function(){if(window.getSelection){var e=window.getSelection();e&&e.removeAllRanges&&e.removeAllRanges()}else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch(e){}}}),Elements.from=function(e,t){(t||null==t)&&(e=e.stripScripts());var i,n=e.match(/^\s*(?:<!--.*?-->\s*)*<(t[dhr]|tbody|tfoot|thead)/i);if(n){i=new Element("table");var s=n[1].toLowerCase();["td","th","tr"].contains(s)&&(i=new Element("tbody").inject(i),"tr"!=s&&(i=new Element("tr").inject(i)))}return(i||new Element("div")).set("html",e).getChildren()},function(){var e=this.IframeShim=new Class({Implements:[Options,Events,Class.Occlude],options:{className:"iframeShim",src:'javascript:false;document.write("");',display:!1,zIndex:null,margin:0,offset:{x:0,y:0},browsers:!1},property:"IframeShim",initialize:function(e,t){return this.element=document.id(e),this.occlude()?this.occluded:(this.setOptions(t),this.makeShim(),this)},makeShim:function(){if(this.options.browsers){var t=this.element.getStyle("zIndex").toInt();if(!t){t=1;var i=this.element.getStyle("position");"static"!=i&&i||this.element.setStyle("position","relative"),this.element.setStyle("zIndex",t)}t=(null!=this.options.zIndex||0===this.options.zIndex)&&t>this.options.zIndex?this.options.zIndex:t-1,t<0&&(t=1),this.shim=new Element("iframe",{src:this.options.src,scrolling:"no",frameborder:0,styles:{zIndex:t,position:"absolute",border:"none",filter:"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"},class:this.options.className}).store("IframeShim",this);var n=function(){this.shim.inject(this.element,"after"),this[this.options.display?"show":"hide"](),this.fireEvent("inject")}.bind(this);e.ready?n():window.addEvent("load",n)}else this.position=this.hide=this.show=this.dispose=Function.convert(this)},position:function(){if(!e.ready||!this.shim)return this;var t=this.element.measure(function(){return this.getSize()});return void 0!=this.options.margin&&(t.x=t.x-2*this.options.margin,t.y=t.y-2*this.options.margin,this.options.offset.x+=this.options.margin,this.options.offset.y+=this.options.margin),this.shim.set({width:t.x,height:t.y}).position({relativeTo:this.element,offset:this.options.offset}),this},hide:function(){return this.shim&&this.shim.setStyle("display","none"),this},show:function(){return this.shim&&this.shim.setStyle("display","block"),this.position()},dispose:function(){return this.shim&&this.shim.dispose(),this},destroy:function(){return this.shim&&this.shim.destroy(),this}})}(),window.addEvent("load",function(){IframeShim.ready=!0}),function(){this.Mask=new Class({Implements:[Options,Events],Binds:["position"],options:{style:{},class:"mask",maskMargins:!1,useIframeShim:!0,iframeShimOptions:{}},initialize:function(e,t){this.target=document.id(e)||document.id(document.body),this.target.store("mask",this),this.setOptions(t),this.render(),this.inject()},render:function(){this.element=new Element("div",{class:this.options.class,id:this.options.id||"mask-"+String.uniqueID(),styles:Object.merge({},this.options.style,{display:"none"}),events:{click:function(e){this.fireEvent("click",e),this.options.hideOnClick&&this.hide()}.bind(this)}}),this.hidden=!0},toElement:function(){return this.element},inject:function(e,t){t=t||(this.options.inject?this.options.inject.where:"")||(this.target==document.body?"inside":"after"),e=e||this.options.inject&&this.options.inject.target||this.target,this.element.inject(e,t),this.options.useIframeShim&&(this.shim=new IframeShim(this.element,this.options.iframeShimOptions),this.addEvents({show:this.shim.show.bind(this.shim),hide:this.shim.hide.bind(this.shim),destroy:this.shim.destroy.bind(this.shim)}))},position:function(){return this.resize(this.options.width,this.options.height),this.element.position({relativeTo:this.target,position:"topLeft",ignoreMargins:!this.options.maskMargins,ignoreScroll:this.target==document.body}),this},resize:function(e,t){var i={styles:["padding","border"]};this.options.maskMargins&&i.styles.push("margin");var n=this.target.getComputedSize(i);if(this.target==document.body){this.element.setStyles({width:0,height:0});var s=window.getScrollSize();n.totalHeight<s.y&&(n.totalHeight=s.y),n.totalWidth<s.x&&(n.totalWidth=s.x)}return this.element.setStyles({width:Array.pick([e,n.totalWidth,n.x]),height:Array.pick([t,n.totalHeight,n.y])}),this},show:function(){return this.hidden?(window.addEvent("resize",this.position),this.position(),this.showMask.apply(this,arguments),this):this},showMask:function(){this.element.setStyle("display","block"),this.hidden=!1,this.fireEvent("show")},hide:function(){return this.hidden?this:(window.removeEvent("resize",this.position),this.hideMask.apply(this,arguments),this.options.destroyOnHide?this.destroy():this)},hideMask:function(){this.element.setStyle("display","none"),this.hidden=!0,this.fireEvent("hide")},toggle:function(){this[this.hidden?"show":"hide"]()},destroy:function(){this.hide(),this.element.destroy(),this.fireEvent("destroy"),this.target.eliminate("mask")}})}(),Element.Properties.mask={set:function(e){var t=this.retrieve("mask");return t&&t.destroy(),this.eliminate("mask").store("mask:options",e)},get:function(){var e=this.retrieve("mask");return e||(e=new Mask(this,this.retrieve("mask:options")),this.store("mask",e)),e}},Element.implement({mask:function(e){return e&&this.set("mask",e),this.get("mask").show(),this},unmask:function(){return this.get("mask").hide(),this}}),function(){this.Spinner=new Class({Extends:this.Mask,Implements:Chain,options:{class:"spinner",containerPosition:{},content:{class:"spinner-content"},messageContainer:{class:"spinner-msg"},img:{class:"spinner-img"},fxOptions:{link:"chain"}},initialize:function(e,t){this.target=document.id(e)||document.id(document.body),this.target.store("spinner",this),this.setOptions(t),this.render(),this.inject();var i=function(){this.active=!1}.bind(this);this.addEvents({hide:i,show:i})},render:function(){this.parent(),this.element.set("id",this.options.id||"spinner-"+String.uniqueID()),this.content=document.id(this.options.content)||new Element("div",this.options.content),this.content.inject(this.element),this.options.message&&(this.msg=document.id(this.options.message)||new Element("p",this.options.messageContainer).appendText(this.options.message),this.msg.inject(this.content)),this.options.img&&(this.img=document.id(this.options.img)||new Element("div",this.options.img),this.img.inject(this.content)),this.element.set("tween",this.options.fxOptions)},show:function(e){return this.active?this.chain(this.show.bind(this)):this.hidden?(this.target.set("aria-busy","true"),this.active=!0,this.parent(e)):(this.callChain.delay(20,this),this)},showMask:function(e){var t=function(){this.content.position(Object.merge({relativeTo:this.element},this.options.containerPosition))}.bind(this);e?(this.parent(),t()):(this.options.style.opacity||(this.options.style.opacity=this.element.getStyle("opacity").toFloat()),this.element.setStyles({display:"block",opacity:0}).tween("opacity",this.options.style.opacity),t(),this.hidden=!1,this.fireEvent("show"),this.callChain())},hide:function(e){return this.active?this.chain(this.hide.bind(this)):this.hidden?(this.callChain.delay(20,this),this):(this.target.set("aria-busy","false"),this.active=!0,this.parent(e))},hideMask:function(e){if(e)return this.parent();this.element.tween("opacity",0).get("tween").chain(function(){this.element.setStyle("display","none"),this.hidden=!0,this.fireEvent("hide"),this.callChain()}.bind(this))},destroy:function(){this.content.destroy(),this.parent(),this.target.eliminate("spinner")}})}(),Request=Class.refactor(Request,{options:{useSpinner:!1,spinnerOptions:{},spinnerTarget:!1},initialize:function(e){this._send=this.send,this.send=function(e){var t=this.getSpinner();return t?t.chain(this._send.pass(e,this)).show():this._send(e),this},this.previous(e)},getSpinner:function(){if(!this.spinner){var e=document.id(this.options.spinnerTarget)||document.id(this.options.update);if(this.options.useSpinner&&e){e.set("spinner",this.options.spinnerOptions);var t=this.spinner=e.get("spinner");["complete","exception","cancel"].each(function(e){this.addEvent(e,t.hide.bind(t))},this)}}return this.spinner}}),Element.Properties.spinner={set:function(e){var t=this.retrieve("spinner");return t&&t.destroy(),this.eliminate("spinner").store("spinner:options",e)},get:function(){var e=this.retrieve("spinner");return e||(e=new Spinner(this,this.retrieve("spinner:options")),this.store("spinner",e)),e}},Element.implement({spin:function(e){return e&&this.set("spinner",e),this.get("spinner").show(),this},unspin:function(){return this.get("spinner").hide(),this}}),function(){var e=function(e){return decodeURIComponent(e.replace(/\+/g," "))};String.implement({parseQueryString:function(t,i){null==t&&(t=!0),null==i&&(i=!0);var n=this.split(/[&;]/),s={};return n.length?(n.each(function(n){var a=n.indexOf("=")+1,r=a?n.substr(a):"",o=a?n.substr(0,a-1).match(/([^\]\[]+|(\B)(?=\]))/g):[n],l=s;o&&(i&&(r=e(r)),o.each(function(i,n){t&&(i=e(i));var s=l[i];n<o.length-1?l=l[i]=s||{}:"array"==typeOf(s)?s.push(r):l[i]=null!=s?[s,r]:r}))}),s):s},cleanQueryString:function(e){return this.split("&").filter(function(t){var i=t.indexOf("="),n=i<0?"":t.substr(0,i),s=t.substr(i+1);return e?e.call(null,n,s):s||0===s}).join("&")}})}(),window.Form||(window.Form={}),function(){Form.Request=new Class({Binds:["onSubmit","onFormValidate"],Implements:[Options,Events,Class.Occlude],options:{requestOptions:{evalScripts:!0,useSpinner:!0,emulation:!1,link:"ignore"},sendButtonClicked:!0,extraData:{},resetForm:!0},property:"form.request",initialize:function(e,t,i){if(this.element=document.id(e),this.occlude())return this.occluded;this.setOptions(i).setTarget(t).attach()},setTarget:function(e){return this.target=document.id(e),this.request?this.request.setOptions({update:this.target}):this.makeRequest(),this},toElement:function(){return this.element},makeRequest:function(){var e=this;return this.request=new Request.HTML(Object.merge({update:this.target,emulation:!1,spinnerTarget:this.element,method:this.element.get("method")||"post"},this.options.requestOptions)).addEvents({success:function(t,i,n,s){["complete","success"].each(function(a){e.fireEvent(a,[e.target,t,i,n,s])})},failure:function(){e.fireEvent("complete",arguments).fireEvent("failure",arguments)},exception:function(){e.fireEvent("failure",arguments)}}),this.attachReset()},attachReset:function(){return this.options.resetForm?(this.request.addEvent("success",function(){Function.attempt(function(){this.element.reset()}.bind(this)),window.OverText&&OverText.update()}.bind(this)),this):this},attach:function(e){var t=0!=e?"addEvent":"removeEvent";this.element[t]("click:relay(button, input[type=submit])",this.saveClickedButton.bind(this));var i=this.element.retrieve("validator");return i?i[t]("onFormValidate",this.onFormValidate):this.element[t]("submit",this.onSubmit),this},detach:function(){return this.attach(!1)},enable:function(){return this.attach()},disable:function(){return this.detach()},onFormValidate:function(e,t,i){if(i){var n=this.element.retrieve("validator");(e||n&&!n.options.stopOnFailure)&&(i.stop(),this.send())}},onSubmit:function(e){var t=this.element.retrieve("validator");if(t)return this.element.removeEvent("submit",this.onSubmit),t.addEvent("onFormValidate",this.onFormValidate),void t.validate(e);e&&e.stop(),this.send()},saveClickedButton:function(e,t){var i=t.get("name");i&&this.options.sendButtonClicked&&(this.options.extraData[i]=t.get("value")||!0,this.clickedCleaner=function(){delete this.options.extraData[i],this.clickedCleaner=function(){}}.bind(this))},clickedCleaner:function(){},send:function(){var e=this.element.toQueryString().trim(),t=Object.toQueryString(this.options.extraData);return e?e+="&"+t:e=t,this.fireEvent("send",[this.element,e.parseQueryString()]),this.request.send({data:e,url:this.options.requestOptions.url||this.element.get("action")}),this.clickedCleaner(),this}}),Element.implement("formUpdate",function(e,t){var i=this.retrieve("form.request");return i?(e&&i.setTarget(e),t&&i.setOptions(t).makeRequest()):i=new Form.Request(this,e,t),i.send(),this})}(),function(){var e=function(e){var t=e.options.hideInputs;if(window.OverText){var i=[null];OverText.each(function(e){i.include("."+e.options.labelClass)}),i&&(t+=i.join(", "))}return t?e.element.getElements(t):null};Fx.Reveal=new Class({Extends:Fx.Morph,options:{link:"cancel",styles:["padding","border","margin"],transitionOpacity:"opacity"in document.documentElement,mode:"vertical",display:function(){return"tr"!=this.element.get("tag")?"block":"table-row"},opacity:1,hideInputs:"opacity"in document.documentElement?null:"select, input, textarea, object, embed"},dissolve:function(){if(this.hiding||this.showing)"chain"==this.options.link?this.chain(this.dissolve.bind(this)):"cancel"!=this.options.link||this.hiding||(this.cancel(),this.dissolve());else if("none"!=this.element.getStyle("display")){this.hiding=!0,this.showing=!1,this.hidden=!0,this.cssText=this.element.style.cssText;var t=this.element.getComputedSize({styles:this.options.styles,mode:this.options.mode});this.options.transitionOpacity&&(t.opacity=this.options.opacity);var i={};Object.each(t,function(e,t){i[t]=[e,0]}),this.element.setStyles({display:Function.convert(this.options.display).call(this),overflow:"hidden"});var n=e(this);n&&n.setStyle("visibility","hidden"),this.$chain.unshift(function(){this.hidden&&(this.hiding=!1,this.element.style.cssText=this.cssText,this.element.setStyle("display","none"),n&&n.setStyle("visibility","visible")),this.fireEvent("hide",this.element),this.callChain()}.bind(this)),this.start(i)}else this.callChain.delay(10,this),this.fireEvent("complete",this.element),this.fireEvent("hide",this.element);return this},reveal:function(){if(this.showing||this.hiding)"chain"==this.options.link?this.chain(this.reveal.bind(this)):"cancel"!=this.options.link||this.showing||(this.cancel(),this.reveal());else if("none"==this.element.getStyle("display")){this.hiding=!1,this.showing=!0,this.hidden=!1,this.cssText=this.element.style.cssText;var t;this.element.measure(function(){t=this.element.getComputedSize({styles:this.options.styles,mode:this.options.mode})}.bind(this)),null!=this.options.heightOverride&&(t.height=this.options.heightOverride.toInt()),null!=this.options.widthOverride&&(t.width=this.options.widthOverride.toInt()),this.options.transitionOpacity&&(this.element.setStyle("opacity",0),t.opacity=this.options.opacity);var i={height:0,display:Function.convert(this.options.display).call(this)};Object.each(t,function(e,t){i[t]=0}),i.overflow="hidden",this.element.setStyles(i);var n=e(this);n&&n.setStyle("visibility","hidden"),this.$chain.unshift(function(){this.element.style.cssText=this.cssText,this.element.setStyle("display",Function.convert(this.options.display).call(this)),this.hidden||(this.showing=!1),n&&n.setStyle("visibility","visible"),this.callChain(),this.fireEvent("show",this.element)}.bind(this)),this.start(t)}else this.callChain(),this.fireEvent("complete",this.element),this.fireEvent("show",this.element);return this},toggle:function(){return"none"==this.element.getStyle("display")?this.reveal():this.dissolve(),this},cancel:function(){return this.parent.apply(this,arguments),null!=this.cssText&&(this.element.style.cssText=this.cssText),this.hiding=!1,this.showing=!1,this}}),Element.Properties.reveal={set:function(e){return this.get("reveal").cancel().setOptions(e),this},get:function(){var e=this.retrieve("reveal");return e||(e=new Fx.Reveal(this),this.store("reveal",e)),e}},Element.Properties.dissolve=Element.Properties.reveal,Element.implement({reveal:function(e){return this.get("reveal").setOptions(e).reveal(),this},dissolve:function(e){return this.get("reveal").setOptions(e).dissolve(),this},nix:function(e){var t=Array.link(arguments,{destroy:Type.isBoolean,options:Type.isObject});return this.get("reveal").setOptions(e).dissolve().chain(function(){this[t.destroy?"destroy":"dispose"]()}.bind(this)),this},wink:function(){var e=Array.link(arguments,{duration:Type.isNumber,options:Type.isObject}),t=this.get("reveal").setOptions(e.options);t.reveal().chain(function(){(function(){t.dissolve()}).delay(e.duration||2e3)})}})}(),Form.Request.Append=new Class({Extends:Form.Request,options:{useReveal:!0,revealOptions:{},inject:"bottom"},makeRequest:function(){this.request=new Request.HTML(Object.merge({url:this.element.get("action"),method:this.element.get("method")||"post",spinnerTarget:this.element},this.options.requestOptions,{evalScripts:!1})).addEvents({success:function(e,t,i,n){var s,a=Elements.from(i);s=1==a.length?a[0]:new Element("div",{styles:{display:"none"}}).adopt(a),s.inject(this.target,this.options.inject),this.options.requestOptions.evalScripts&&Browser.exec(n),this.fireEvent("beforeEffect",s);var r=function(){this.fireEvent("success",[s,this.target,e,t,i,n])}.bind(this);this.options.useReveal?(s.set("reveal",this.options.revealOptions).get("reveal").chain(r),s.reveal()):r()}.bind(this),failure:function(e){this.fireEvent("failure",e)}.bind(this)}),this.attachReset()}}),function(){var e=function(e){return null!=e},t=Object.prototype.hasOwnProperty;Object.extend({getFromPath:function(e,i){"string"==typeof i&&(i=i.split("."));for(var n=0,s=i.length;n<s;n++){if(!t.call(e,i[n]))return null;e=e[i[n]]}return e},cleanValues:function(t,i){i=i||e;for(var n in t)i(t[n])||delete t[n];return t},erase:function(e,i){return t.call(e,i)&&delete e[i],e},run:function(e){var t=Array.slice(arguments,1);for(var i in e)e[i].apply&&e[i].apply(e,t);return e}})}(),function(){var e=null,t={},i=function(e){return instanceOf(e,n.Set)?e:t[e]},n=this.Locale={define:function(i,s,a,r){var o;return instanceOf(i,n.Set)?(o=i.name)&&(t[o]=i):(o=i,t[o]||(t[o]=new n.Set(o)),i=t[o]),s&&i.define(s,a,r),e||(e=i),i},use:function(t){return t=i(t),t&&(e=t,this.fireEvent("change",t)),this},getCurrent:function(){return e},get:function(t,i){return e?e.get(t,i):""},inherit:function(e,t,n){return e=i(e),e&&e.inherit(t,n),this},list:function(){return Object.keys(t)}};Object.append(n,new Events),n.Set=new Class({sets:{},inherits:{locales:[],sets:{}},initialize:function(e){this.name=e||""},define:function(e,t,i){var n=this.sets[e];return n||(n={}),t&&("object"==typeOf(t)?n=Object.merge(n,t):n[t]=i),this.sets[e]=n,this},get:function(e,i,n){var s=Object.getFromPath(this.sets,e);if(null!=s){var a=typeOf(s);return"function"==a?s=s.apply(null,Array.convert(i)):"object"==a&&(s=Object.clone(s)),s}var r=e.indexOf("."),o=r<0?e:e.substr(0,r),l=(this.inherits.sets[o]||[]).combine(this.inherits.locales).include("en-US");n||(n=[]);for(var h=0,u=l.length;h<u;h++)if(!n.contains(l[h])){n.include(l[h]);var d=t[l[h]];if(d&&null!=(s=d.get(e,i,n)))return s}return""},inherit:function(e,t){e=Array.convert(e),t&&!this.inherits.sets[t]&&(this.inherits.sets[t]=[]);for(var i=e.length;i--;)(t?this.inherits.sets[t]:this.inherits.locales).unshift(e[i]);return this}})}(),Locale.define("en-US","Date",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],months_abbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],days_abbr:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dateOrder:["month","date","year"],shortDate:"%m/%d/%Y",shortTime:"%I:%M%p",AM:"AM",PM:"PM",firstDayOfWeek:0,ordinal:function(e){return e>3&&e<21?"th":["th","st","nd","rd","th"][Math.min(e%10,4)]},lessThanMinuteAgo:"less than a minute ago",minuteAgo:"about a minute ago",minutesAgo:"{delta} minutes ago",hourAgo:"about an hour ago",hoursAgo:"about {delta} hours ago",dayAgo:"1 day ago",daysAgo:"{delta} days ago",weekAgo:"1 week ago",weeksAgo:"{delta} weeks ago",monthAgo:"1 month ago",monthsAgo:"{delta} months ago",yearAgo:"1 year ago",yearsAgo:"{delta} years ago",lessThanMinuteUntil:"less than a minute from now",minuteUntil:"about a minute from now",minutesUntil:"{delta} minutes from now",hourUntil:"about an hour from now",hoursUntil:"about {delta} hours from now",dayUntil:"1 day from now",daysUntil:"{delta} days from now",weekUntil:"1 week from now",weeksUntil:"{delta} weeks from now",monthUntil:"1 month from now",monthsUntil:"{delta} months from now",yearUntil:"1 year from now",yearsUntil:"{delta} years from now"}),function(){var e=this.Date,t=e.Methods={ms:"Milliseconds",year:"FullYear",min:"Minutes",mo:"Month",sec:"Seconds",hr:"Hours"};["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds","Time","TimezoneOffset","Week","Timezone","GMTOffset","DayOfYear","LastMonth","LastDayOfMonth","UTCDate","UTCDay","UTCFullYear","AMPM","Ordinal","UTCHours","UTCMilliseconds","UTCMinutes","UTCMonth","UTCSeconds","UTCMilliseconds"].each(function(t){e.Methods[t.toLowerCase()]=t});var i=function(e,t,n){return 1==t?e:e<Math.pow(10,t-1)?(n||"0")+i(e,t-1,n):e};e.implement({set:function(e,i){e=e.toLowerCase();var n=t[e]&&"set"+t[e];return n&&this[n]&&this[n](i),this}.overloadSetter(),get:function(e){e=e.toLowerCase();var i=t[e]&&"get"+t[e];return i&&this[i]?this[i]():null}.overloadGetter(),clone:function(){return new e(this.get("time"))},increment:function(t,i){switch(t=t||"day",i=null!=i?i:1,t){case"year":return this.increment("month",12*i);case"month":var n=this.get("date");return this.set("date",1).set("mo",this.get("mo")+i),this.set("date",n.min(this.get("lastdayofmonth")));case"week":return this.increment("day",7*i);case"day":return this.set("date",this.get("date")+i)}if(!e.units[t])throw new Error(t+" is not a supported interval");return this.set("time",this.get("time")+i*e.units[t]())},decrement:function(e,t){return this.increment(e,-1*(null!=t?t:1))},isLeapYear:function(){return e.isLeapYear(this.get("year"))},clearTime:function(){return this.set({hr:0,min:0,sec:0,ms:0})},diff:function(t,i){return"string"==typeOf(t)&&(t=e.parse(t)),((t-this)/e.units[i||"day"](3,3)).round()},getLastDayOfMonth:function(){return e.daysInMonth(this.get("mo"),this.get("year"))},getDayOfYear:function(){return(e.UTC(this.get("year"),this.get("mo"),this.get("date")+1)-e.UTC(this.get("year"),0,1))/e.units.day()},setDay:function(t,i){null==i&&""===(i=e.getMsg("firstDayOfWeek"))&&(i=1),t=(7+e.parseDay(t,!0)-i)%7;var n=(7+this.get("day")-i)%7;return this.increment("day",t-n)},getWeek:function(t){null==t&&""===(t=e.getMsg("firstDayOfWeek"))&&(t=1);var i,n=this,s=(7+n.get("day")-t)%7,a=0;if(1==t){var r=n.get("month"),o=n.get("date")-s;if(11==r&&o>28)return 1;0==r&&o<-2&&(n=new e(n).decrement("day",s),s=0),i=new e(n.get("year"),0,1).get("day")||7,i>4&&(a=-7)}else i=new e(n.get("year"),0,1).get("day");return a+=n.get("dayofyear"),a+=6-s,(a+=(7+i-t)%7)/7},getOrdinal:function(t){return e.getMsg("ordinal",t||this.get("date"))},getTimezone:function(){return this.toString().replace(/^.*? ([A-Z]{3}).[0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3")},getGMTOffset:function(){var e=this.get("timezoneOffset");return(e>0?"-":"+")+i((e.abs()/60).floor(),2)+i(e%60,2)},setAMPM:function(e){e=e.toUpperCase();var t=this.get("hr");return t>11&&"AM"==e?this.decrement("hour",12):t<12&&"PM"==e?this.increment("hour",12):this},getAMPM:function(){return this.get("hr")<12?"AM":"PM"},parse:function(t){return this.set("time",e.parse(t)),this},isValid:function(e){return e||(e=this),"date"==typeOf(e)&&!isNaN(e.valueOf())},format:function(t){if(!this.isValid())return"invalid date";if(t||(t="%x %X"),"string"==typeof t&&(t=a[t.toLowerCase()]||t),"function"==typeof t)return t(this);var n=this;return t.replace(/%([a-z%])/gi,function(t,s){switch(s){case"a":return e.getMsg("days_abbr")[n.get("day")];case"A":return e.getMsg("days")[n.get("day")];case"b":return e.getMsg("months_abbr")[n.get("month")];case"B":return e.getMsg("months")[n.get("month")];case"c":return n.format("%a %b %d %H:%M:%S %Y");case"d":return i(n.get("date"),2);case"e":return i(n.get("date"),2," ");case"H":return i(n.get("hr"),2);case"I":return i(n.get("hr")%12||12,2);case"j":return i(n.get("dayofyear"),3);case"k":return i(n.get("hr"),2," ");case"l":return i(n.get("hr")%12||12,2," ");case"L":return i(n.get("ms"),3);case"m":return i(n.get("mo")+1,2);case"M":return i(n.get("min"),2);case"o":return n.get("ordinal");case"p":return e.getMsg(n.get("ampm"));case"s":return Math.round(n/1e3);case"S":return i(n.get("seconds"),2);case"T":return n.format("%H:%M:%S");case"U":return i(n.get("week"),2);case"w":return n.get("day");case"x":return n.format(e.getMsg("shortDate"));case"X":return n.format(e.getMsg("shortTime"));case"y":return n.get("year").toString().substr(2);case"Y":return n.get("year");case"z":return n.get("GMTOffset");case"Z":return n.get("Timezone")}return s})},toISOString:function(){return this.format("iso8601")}}).alias({toJSON:"toISOString",compare:"diff",strftime:"format"});var n=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],s=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],a={db:"%Y-%m-%d %H:%M:%S",compact:"%Y%m%dT%H%M%S",short:"%d %b %H:%M",long:"%B %d, %Y %H:%M",rfc822:function(e){return n[e.get("day")]+e.format(", %d ")+s[e.get("month")]+e.format(" %Y %H:%M:%S %Z")},rfc2822:function(e){return n[e.get("day")]+e.format(", %d ")+s[e.get("month")]+e.format(" %Y %H:%M:%S %z")},iso8601:function(e){return e.getUTCFullYear()+"-"+i(e.getUTCMonth()+1,2)+"-"+i(e.getUTCDate(),2)+"T"+i(e.getUTCHours(),2)+":"+i(e.getUTCMinutes(),2)+":"+i(e.getUTCSeconds(),2)+"."+i(e.getUTCMilliseconds(),3)+"Z"}},r=[],o=e.parse,l=function(t,i,n){var s=-1,a=e.getMsg(t+"s");switch(typeOf(i)){case"object":s=a[i.get(t)];break;case"number":if(!(s=a[i]))throw new Error("Invalid "+t+" index: "+i);break;case"string":var r=a.filter(function(e){return this.test(e)},new RegExp("^"+i,"i"));if(!r.length)throw new Error("Invalid "+t+" string");if(r.length>1)throw new Error("Ambiguous "+t);s=r[0]}return n?a.indexOf(s):s},h=1900,u=70;e.extend({getMsg:function(e,t){return Locale.get("Date."+e,t)},units:{ms:Function.convert(1),second:Function.convert(1e3),minute:Function.convert(6e4),hour:Function.convert(36e5),day:Function.convert(864e5),week:Function.convert(6084e5),month:function(t,i){var n=new e;return 864e5*e.daysInMonth(null!=t?t:n.get("mo"),null!=i?i:n.get("year"))},year:function(t){return t=t||(new e).get("year"),e.isLeapYear(t)?316224e5:31536e6}},daysInMonth:function(t,i){return[31,e.isLeapYear(i)?29:28,31,30,31,30,31,31,30,31,30,31][t]},isLeapYear:function(e){return e%4==0&&e%100!=0||e%400==0},parse:function(t){var i=typeOf(t);if("number"==i)return new e(t);if("string"!=i)return t;if(t=t.clean(),!t.length)return null;var n;return r.some(function(e){var i=e.re.exec(t);return!!i&&(n=e.handler(i))}),n&&n.isValid()||(n=new e(o(t)))&&n.isValid()||(n=new e(t.toInt())),n},parseDay:function(e,t){return l("day",e,t)},parseMonth:function(e,t){return l("month",e,t)},parseUTC:function(t){var i=new e(t),n=e.UTC(i.get("year"),i.get("mo"),i.get("date"),i.get("hr"),i.get("min"),i.get("sec"),i.get("ms"));return new e(n)},orderIndex:function(t){return e.getMsg("dateOrder").indexOf(t)+1},defineFormat:function(e,t){return a[e]=t,this},defineParser:function(e){return r.push(e.re&&e.handler?e:f(e)),this},defineParsers:function(){return Array.flatten(arguments).each(e.defineParser),this},define2DigitYearStart:function(e){return u=e%100,h=e-u,this}}).extend({defineFormats:e.defineFormat.overloadSetter()});var d=function(t){return new RegExp("(?:"+e.getMsg(t).map(function(e){return e.substr(0,3)}).join("|")+")[a-z]*")},c=function(t){switch(t){case"T":return"%H:%M:%S";case"x":return(1==e.orderIndex("month")?"%m[-./]%d":"%d[-./]%m")+"([-./]%y)?";case"X":return"%H([.:]%M)?([.:]%S([.:]%s)?)? ?%p? ?%z?"}return null},m={d:/[0-2]?[0-9]|3[01]/,H:/[01]?[0-9]|2[0-3]/,I:/0?[1-9]|1[0-2]/,M:/[0-5]?\d/,s:/\d+/,o:/[a-z]*/,p:/[ap]\.?m\.?/,y:/\d{2}|\d{4}/,Y:/\d{4}/,z:/Z|[+-]\d{2}(?::?\d{2})?/};m.m=m.I,m.S=m.M;var g,p=function(e){g=e,m.a=m.A=d("days"),m.b=m.B=d("months"),r.each(function(e,t){e.format&&(r[t]=f(e.format))})},f=function(t){if(!g)return{format:t};var i=[],n=(t.source||t).replace(/%([a-z])/gi,function(e,t){return c(t)||e}).replace(/\((?!\?)/g,"(?:").replace(/ (?!\?|\*)/g,",? ").replace(/%([a-z%])/gi,function(e,t){var n=m[t];return n?(i.push(t),"("+n.source+")"):t}).replace(/\[a-z\]/gi,"[a-z\\u00c0-\\uffff;&]");return{format:t,re:new RegExp("^"+n+"$","i"),handler:function(t){t=t.slice(1).associate(i);var n=(new e).clearTime(),s=t.y||t.Y;null!=s&&v.call(n,"y",s),"d"in t&&v.call(n,"d",1),("m"in t||t.b||t.B)&&v.call(n,"m",1);for(var a in t)v.call(n,a,t[a]);return n}}},v=function(t,i){if(!i)return this;switch(t){case"a":case"A":return this.set("day",e.parseDay(i,!0));case"b":case"B":return this.set("mo",e.parseMonth(i,!0));case"d":return this.set("date",i);case"H":case"I":return this.set("hr",i);case"m":return this.set("mo",i-1);case"M":return this.set("min",i);case"p":return this.set("ampm",i.replace(/\./g,""));case"S":return this.set("sec",i);case"s":return this.set("ms",1e3*("0."+i));case"w":return this.set("day",i);case"Y":return this.set("year",i);case"y":return i=+i,i<100&&(i+=h+(i<u?100:0)),this.set("year",i);case"z":"Z"==i&&(i="+00");var n=i.match(/([+-])(\d{2}):?(\d{2})?/);return n=(n[1]+"1")*(60*n[2]+(+n[3]||0))+this.getTimezoneOffset(),this.set("time",this-6e4*n)}return this};e.defineParsers("%Y([-./]%m([-./]%d((T| )%X)?)?)?","%Y%m%d(T%H(%M%S?)?)?","%x( %X)?","%d%o( %b( %Y)?)?( %X)?","%b( %d%o)?( %Y)?( %X)?","%Y %b( %d%o( %X)?)?","%o %b %d %X %z %Y","%T","%H:%M( ?%p)?"),Locale.addEvent("change",function(e){Locale.get("Date")&&p(e)}).fireEvent("change",Locale.getCurrent())}(),Locale.define("en-US","FormValidator",{required:"This field is required.",length:"Please enter {length} characters (you entered {elLength} characters)",minLength:"Please enter at least {minLength} characters (you entered {length} characters).",maxLength:"Please enter no more than {maxLength} characters (you entered {length} characters).",integer:"Please enter an integer in this field. Numbers with decimals (e.g. 1.25) are not permitted.",numeric:'Please enter only numeric values in this field (i.e. "1" or "1.1" or "-1" or "-1.1").',digits:"Please use numbers and punctuation only in this field (for example, a phone number with dashes or dots is permitted).",alpha:"Please use only letters (a-z) within this field. No spaces or other characters are allowed.",alphanum:"Please use only letters (a-z) or numbers (0-9) in this field. No spaces or other characters are allowed.",
dateSuchAs:"Please enter a valid date such as {date}",dateInFormatMDY:'Please enter a valid date such as MM/DD/YYYY (i.e. "12/31/1999")',email:'Please enter a valid email address. For example "fred@domain.com".',url:"Please enter a valid URL such as http://www.example.com.",currencyDollar:"Please enter a valid $ amount. For example $100.00 .",oneRequired:"Please enter something for at least one of these inputs.",errorPrefix:"Error: ",warningPrefix:"Warning: ",noSpace:"There can be no spaces in this input.",reqChkByNode:"No items are selected.",requiredChk:"This field is required.",reqChkByName:"Please select a {label}.",match:"This field needs to match the {matchName} field",startDate:"the start date",endDate:"the end date",currentDate:"the current date",afterDate:"The date should be the same or after {label}.",beforeDate:"The date should be the same or before {label}.",startMonth:"Please select a start month",sameMonth:"These two dates must be in the same month - you must change one or the other.",creditcard:"The credit card number entered is invalid. Please check the number and try again. {length} digits entered."}),window.Form||(window.Form={});var InputValidator=this.InputValidator=new Class({Implements:[Options],options:{errorMsg:"Validation failed.",test:Function.convert(!0)},initialize:function(e,t){this.setOptions(t),this.className=e},test:function(e,t){return!!(e=document.id(e))&&this.options.test(e,t||this.getProps(e))},getError:function(e,t){e=document.id(e);var i=this.options.errorMsg;return"function"==typeOf(i)&&(i=i(e,t||this.getProps(e))),i},getProps:function(e){return e=document.id(e),e?e.get("validatorProps"):{}}});Element.Properties.validators={get:function(){return(this.get("data-validators")||this.className).clean().replace(/'(\\.|[^'])*'|"(\\.|[^"])*"/g,function(e){return e.replace(" ","\\x20")}).split(" ")}},Element.Properties.validatorProps={set:function(e){return this.eliminate("$moo:validatorProps").store("$moo:validatorProps",e)},get:function(e){if(e&&this.set(e),this.retrieve("$moo:validatorProps"))return this.retrieve("$moo:validatorProps");if(this.getProperty("data-validator-properties")||this.getProperty("validatorProps"))try{this.store("$moo:validatorProps",JSON.decode(this.getProperty("validatorProps")||this.getProperty("data-validator-properties"),!1))}catch(e){return{}}else{var t=this.get("validators").filter(function(e){return e.test(":")});t.length?(e={},t.each(function(t){var i=t.split(":");if(i[1])try{e[i[0]]=JSON.decode(i[1],!1)}catch(e){}}),this.store("$moo:validatorProps",e)):this.store("$moo:validatorProps",{})}return this.retrieve("$moo:validatorProps")}},Form.Validator=new Class({Implements:[Options,Events],options:{fieldSelectors:"input, select, textarea",ignoreHidden:!0,ignoreDisabled:!0,useTitles:!1,evaluateOnSubmit:!0,evaluateFieldsOnBlur:!0,evaluateFieldsOnChange:!0,serial:!0,stopOnFailure:!0,warningPrefix:function(){return Form.Validator.getMsg("warningPrefix")||"Warning: "},errorPrefix:function(){return Form.Validator.getMsg("errorPrefix")||"Error: "}},initialize:function(e,t){this.setOptions(t),this.element=document.id(e),this.warningPrefix=Function.convert(this.options.warningPrefix)(),this.errorPrefix=Function.convert(this.options.errorPrefix)(),this._bound={onSubmit:this.onSubmit.bind(this),blurOrChange:function(e,t){this.validationMonitor(t,!0)}.bind(this)},this.enable()},toElement:function(){return this.element},getFields:function(){return this.fields=this.element.getElements(this.options.fieldSelectors)},enable:function(){this.element.store("validator",this),this.options.evaluateOnSubmit&&this.element.addEvent("submit",this._bound.onSubmit),this.options.evaluateFieldsOnBlur&&this.element.addEvent("blur:relay(input,select,textarea)",this._bound.blurOrChange),this.options.evaluateFieldsOnChange&&this.element.addEvent("change:relay(input,select,textarea)",this._bound.blurOrChange)},disable:function(){this.element.eliminate("validator"),this.element.removeEvents({submit:this._bound.onSubmit,"blur:relay(input,select,textarea)":this._bound.blurOrChange,"change:relay(input,select,textarea)":this._bound.blurOrChange})},validationMonitor:function(){clearTimeout(this.timer),this.timer=this.validateField.delay(50,this,arguments)},onSubmit:function(e){this.validate(e)&&this.reset()},reset:function(){return this.getFields().each(this.resetField,this),this},validate:function(e){var t=this.getFields().map(function(e){return this.validateField(e,!0)},this).every(function(e){return e});return this.fireEvent("formValidate",[t,this.element,e]),this.options.stopOnFailure&&!t&&e&&e.preventDefault(),t},validateField:function(e,t){if(this.paused)return!0;e=document.id(e);var i,n,s=!e.hasClass("validation-failed");if(this.options.serial&&!t&&(i=this.element.getElement(".validation-failed"),n=this.element.getElement(".warning")),e&&(!i||t||e.hasClass("validation-failed")||i&&!this.options.serial)){var a=e.get("validators"),r=a.some(function(e){return this.getValidator(e)},this),o=[];if(a.each(function(t){t&&!this.test(t,e)&&o.include(t)},this),s=0===o.length,r&&!this.hasValidator(e,"warnOnly")&&(s?(e.addClass("validation-passed").removeClass("validation-failed"),this.fireEvent("elementPass",[e])):(e.addClass("validation-failed").removeClass("validation-passed"),this.fireEvent("elementFail",[e,o]))),!n){a.some(function(e){return e.test("^warn")?this.getValidator(e.replace(/^warn-/,"")):null},this);e.removeClass("warning");a.map(function(t){return t.test("^warn")?this.test(t.replace(/^warn-/,""),e,!0):null},this)}}return s},test:function(e,t,i){if(t=document.id(t),this.options.ignoreHidden&&!t.isVisible()||this.options.ignoreDisabled&&t.get("disabled"))return!0;var n=this.getValidator(e);null!=i&&(i=!1),this.hasValidator(t,"warnOnly")&&(i=!0);var s=t.hasClass("ignoreValidation")||!n||n.test(t);return n&&this.fireEvent("elementValidate",[s,t,e,i]),!!i||s},hasValidator:function(e,t){return e.get("validators").contains(t)},resetField:function(e){return e=document.id(e),e&&e.get("validators").each(function(t){t.test("^warn-")&&(t=t.replace(/^warn-/,"")),e.removeClass("validation-failed"),e.removeClass("warning"),e.removeClass("validation-passed")},this),this},stop:function(){return this.paused=!0,this},start:function(){return this.paused=!1,this},ignoreField:function(e,t){return e=document.id(e),e&&(this.enforceField(e),t?e.addClass("warnOnly"):e.addClass("ignoreValidation")),this},enforceField:function(e){return e=document.id(e),e&&e.removeClass("warnOnly").removeClass("ignoreValidation"),this}}),Form.Validator.getMsg=function(e){return Locale.get("FormValidator."+e)},Form.Validator.adders={validators:{},add:function(e,t){this.validators[e]=new InputValidator(e,t),this.initialize||this.implement({validators:this.validators})},addAllThese:function(e){Array.convert(e).each(function(e){this.add(e[0],e[1])},this)},getValidator:function(e){return this.validators[e.split(":")[0]]}},Object.append(Form.Validator,Form.Validator.adders),Form.Validator.implement(Form.Validator.adders),Form.Validator.add("IsEmpty",{errorMsg:!1,test:function(e){return"select-one"==e.type||"select"==e.type?!(e.selectedIndex>=0&&""!=e.options[e.selectedIndex].value):null==e.get("value")||0==e.get("value").length}}),Form.Validator.addAllThese([["required",{errorMsg:function(){return Form.Validator.getMsg("required")},test:function(e){return!Form.Validator.getValidator("IsEmpty").test(e)}}],["length",{errorMsg:function(e,t){return"null"!=typeOf(t.length)?Form.Validator.getMsg("length").substitute({length:t.length,elLength:e.get("value").length}):""},test:function(e,t){return"null"==typeOf(t.length)||(e.get("value").length==t.length||0==e.get("value").length)}}],["minLength",{errorMsg:function(e,t){return"null"!=typeOf(t.minLength)?Form.Validator.getMsg("minLength").substitute({minLength:t.minLength,length:e.get("value").length}):""},test:function(e,t){return"null"==typeOf(t.minLength)||e.get("value").length>=(t.minLength||0)}}],["maxLength",{errorMsg:function(e,t){return"null"!=typeOf(t.maxLength)?Form.Validator.getMsg("maxLength").substitute({maxLength:t.maxLength,length:e.get("value").length}):""},test:function(e,t){return e.get("value").length<=(t.maxLength||1e4)}}],["validate-integer",{errorMsg:Form.Validator.getMsg.pass("integer"),test:function(e){return Form.Validator.getValidator("IsEmpty").test(e)||/^(-?[1-9]\d*|0)$/.test(e.get("value"))}}],["validate-numeric",{errorMsg:Form.Validator.getMsg.pass("numeric"),test:function(e){return Form.Validator.getValidator("IsEmpty").test(e)||/^-?(?:0$0(?=\d*\.)|[1-9]|0)\d*(\.\d+)?$/.test(e.get("value"))}}],["validate-digits",{errorMsg:Form.Validator.getMsg.pass("digits"),test:function(e){return Form.Validator.getValidator("IsEmpty").test(e)||/^[\d() .:\-\+#]+$/.test(e.get("value"))}}],["validate-alpha",{errorMsg:Form.Validator.getMsg.pass("alpha"),test:function(e){return Form.Validator.getValidator("IsEmpty").test(e)||/^[a-zA-Z]+$/.test(e.get("value"))}}],["validate-alphanum",{errorMsg:Form.Validator.getMsg.pass("alphanum"),test:function(e){return Form.Validator.getValidator("IsEmpty").test(e)||!/\W/.test(e.get("value"))}}],["validate-date",{errorMsg:function(e,t){if(Date.parse){var i=t.dateFormat||"%x";return Form.Validator.getMsg("dateSuchAs").substitute({date:(new Date).format(i)})}return Form.Validator.getMsg("dateInFormatMDY")},test:function(e,t){if(Form.Validator.getValidator("IsEmpty").test(e))return!0;var i=Locale.get("Date"),n=new RegExp([i.days,i.days_abbr,i.months,i.months_abbr,i.AM,i.PM].flatten().join("|"),"i"),s=e.get("value"),a=s.match(/[a-z]+/gi);if(a&&!a.every(n.exec,n))return!1;var r=Date.parse(s);if(!r)return!1;var o=t.dateFormat||"%x",l=r.format(o);return"invalid date"!=l&&e.set("value",l),r.isValid()}}],["validate-email",{errorMsg:Form.Validator.getMsg.pass("email"),test:function(e){return Form.Validator.getValidator("IsEmpty").test(e)||/^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]\.?){0,63}[a-z0-9!#$%&'*+\/=?^_`{|}~-]@(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\])$/i.test(e.get("value"))}}],["validate-url",{errorMsg:Form.Validator.getMsg.pass("url"),test:function(e){return Form.Validator.getValidator("IsEmpty").test(e)||/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(e.get("value"))}}],["validate-currency-dollar",{errorMsg:Form.Validator.getMsg.pass("currencyDollar"),test:function(e){return Form.Validator.getValidator("IsEmpty").test(e)||/^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(e.get("value"))}}],["validate-one-required",{errorMsg:Form.Validator.getMsg.pass("oneRequired"),test:function(e,t){return(document.id(t["validate-one-required"])||e.getParent(t["validate-one-required"])).getElements("input").some(function(e){return["checkbox","radio"].contains(e.get("type"))?e.get("checked"):e.get("value")})}}]]),Element.Properties.validator={set:function(e){this.get("validator").setOptions(e)},get:function(){var e=this.retrieve("validator");return e||(e=new Form.Validator(this),this.store("validator",e)),e}},Element.implement({validate:function(e){return e&&this.set("validator",e),this.get("validator").validate()}}),function(){function e(e,t,i,n){if(t&&e[t])return e[t];var s=document.id(e[i]);return s?s.getElements(n):[]}Form.Validator.addAllThese([["validate-enforce-oncheck",{test:function(t,i){var n=t.getParent("form").retrieve("validator");return!n||(e(i,"toEnforce","enforceChildrenOf","input, select, textarea").each(function(e){t.checked?n.enforceField(e):(n.ignoreField(e),n.resetField(e))}),!0)}}],["validate-ignore-oncheck",{test:function(t,i){var n=t.getParent("form").retrieve("validator");return!n||(e(i,"toIgnore","ignoreChildrenOf","input, select, textarea").each(function(e){t.checked?(n.ignoreField(e),n.resetField(e)):n.enforceField(e)}),!0)}}],["validate-enforce-onselect-value",{test:function(t,i){if(!i.value)return!0;var n=t.getParent("form").retrieve("validator");return!n||(e(i,"toEnforce","enforceChildrenOf","input, select, textarea").each(function(e){i.value==t.value?n.enforceField(e):(n.ignoreField(e),n.resetField(e))}),!0)}}],["validate-nospace",{errorMsg:function(){return Form.Validator.getMsg("noSpace")},test:function(e,t){return!e.get("value").test(/\s/)}}],["validate-toggle-oncheck",{test:function(t,i){var n=t.getParent("form").retrieve("validator");if(!n)return!0;var s=e(i,"toToggle","toToggleChildrenOf","input, select, textarea");return t.checked?s.each(function(e){n.enforceField(e)}):s.each(function(e){n.ignoreField(e),n.resetField(e)}),!0}}],["validate-reqchk-bynode",{errorMsg:function(){return Form.Validator.getMsg("reqChkByNode")},test:function(t,i){return e(i,!1,"nodeId",i.selector||"input[type=checkbox], input[type=radio]").some(function(e){return e.checked})}}],["validate-required-check",{errorMsg:function(e,t){return t.useTitle?e.get("title"):Form.Validator.getMsg("requiredChk")},test:function(e,t){return!!e.checked}}],["validate-reqchk-byname",{errorMsg:function(e,t){return Form.Validator.getMsg("reqChkByName").substitute({label:t.label||e.get("type")})},test:function(e,t){var i=t.groupName||e.get("name"),n=$$("[name="+i+"]"),s=n.some(function(e,t){return e.checked}),a=e.getParent("form").retrieve("validator");return s&&a&&n.each(function(e,t){a.resetField(e)}),s}}],["validate-match",{errorMsg:function(e,t){return Form.Validator.getMsg("match").substitute({matchName:decodeURIComponent((t.matchName+"").replace(/\+/g,"%20"))||document.id(t.matchInput).get("name")})},test:function(e,t){var i=e.get("value"),n=document.id(t.matchInput)&&document.id(t.matchInput).get("value");return!i||!n||i==n}}],["validate-after-date",{errorMsg:function(e,t){return Form.Validator.getMsg("afterDate").substitute({label:t.afterLabel||(t.afterElement?Form.Validator.getMsg("startDate"):Form.Validator.getMsg("currentDate"))})},test:function(e,t){var i=document.id(t.afterElement)?Date.parse(document.id(t.afterElement).get("value")):new Date,n=Date.parse(e.get("value"));return!n||!i||n>=i}}],["validate-before-date",{errorMsg:function(e,t){return Form.Validator.getMsg("beforeDate").substitute({label:t.beforeLabel||(t.beforeElement?Form.Validator.getMsg("endDate"):Form.Validator.getMsg("currentDate"))})},test:function(e,t){var i=Date.parse(e.get("value")),n=document.id(t.beforeElement)?Date.parse(document.id(t.beforeElement).get("value")):new Date;return!n||!i||n>=i}}],["validate-custom-required",{errorMsg:function(){return Form.Validator.getMsg("required")},test:function(e,t){return e.get("value")!=t.emptyValue}}],["validate-same-month",{errorMsg:function(e,t){var i=document.id(t.sameMonthAs)&&document.id(t.sameMonthAs).get("value");if(""!=e.get("value"))return Form.Validator.getMsg(i?"sameMonth":"startMonth")},test:function(e,t){var i=Date.parse(e.get("value")),n=Date.parse(document.id(t.sameMonthAs)&&document.id(t.sameMonthAs).get("value"));return!i||!n||i.format("%B")==n.format("%B")}}],["validate-cc-num",{errorMsg:function(e){var t=e.get("value").replace(/[^0-9]/g,"");return Form.Validator.getMsg("creditcard").substitute({length:t.length})},test:function(e){if(Form.Validator.getValidator("IsEmpty").test(e))return!0;var t=e.get("value");t=t.replace(/[^0-9]/g,"");var i=!1;if(t.test(/^4[0-9]{12}([0-9]{3})?$/)?i="Visa":t.test(/^5[1-5]([0-9]{14})$/)?i="Master Card":t.test(/^3[47][0-9]{13}$/)?i="American Express":t.test(/^6(?:011|5[0-9]{2})[0-9]{12}$/)?i="Discover":t.test(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/)&&(i="Diners Club"),i){for(var n=0,s=0,a=t.length-1;a>=0;--a)0!=(s=t.charAt(a).toInt())&&((t.length-a)%2==0&&(s+=s),s>9&&(s=s.toString().charAt(0).toInt()+s.toString().charAt(1).toInt()),n+=s);if(n%10==0)return!0}for(var r="";""!=t;)r+=" "+t.substr(0,4),t=t.substr(4);return e.getParent("form").retrieve("validator").ignoreField(e),e.set("value",r.clean()),e.getParent("form").retrieve("validator").enforceField(e),!1}}]])}(),Form.Validator.Inline=new Class({Extends:Form.Validator,options:{showError:function(e){e.reveal?e.reveal():e.setStyle("display","block")},hideError:function(e){e.dissolve?e.dissolve():e.setStyle("display","none")},scrollToErrorsOnSubmit:!0,scrollToErrorsOnBlur:!1,scrollToErrorsOnChange:!1,scrollFxOptions:{transition:"quad:out",offset:{y:-20}}},initialize:function(e,t){this.parent(e,t),this.addEvent("onElementValidate",function(e,t,i,n){var s=this.getValidator(i);if(!e&&s.getError(t)){n&&t.addClass("warning");var a=this.makeAdvice(i,t,s.getError(t),n);this.insertAdvice(a,t),this.showAdvice(i,t)}else this.hideAdvice(i,t)})},makeAdvice:function(e,t,i,n){var s=n?this.warningPrefix:this.errorPrefix;s+=this.options.useTitles?t.title||i:i;var a=n?"warning-advice":"validation-advice",r=this.getAdvice(e,t);return r=r?r.set("html",s):new Element("div",{html:s,styles:{display:"none"},id:"advice-"+e.split(":")[0]+"-"+this.getFieldId(t)}).addClass(a),t.store("$moo:advice-"+e,r),r},getFieldId:function(e){return e.id?e.id:e.id="input_"+e.name},showAdvice:function(e,t){var i=this.getAdvice(e,t);!i||t.retrieve("$moo:"+this.getPropName(e))||"none"!=i.getStyle("display")&&"hidden"!=i.getStyle("visibility")&&0!=i.getStyle("opacity")||(t.store("$moo:"+this.getPropName(e),!0),this.options.showError(i),this.fireEvent("showAdvice",[t,i,e]))},hideAdvice:function(e,t){var i=this.getAdvice(e,t);i&&t.retrieve("$moo:"+this.getPropName(e))&&(t.store("$moo:"+this.getPropName(e),!1),this.options.hideError(i),this.fireEvent("hideAdvice",[t,i,e]))},getPropName:function(e){return"advice"+e},resetField:function(e){return(e=document.id(e))?(this.parent(e),e.get("validators").each(function(t){this.hideAdvice(t,e)},this),this):this},getAllAdviceMessages:function(e,t){var i=[];if(e.hasClass("ignoreValidation")&&!t)return i;e.get("validators").some(function(t){var n=t.test("^warn-")||e.hasClass("warnOnly");n&&(t=t.replace(/^warn-/,""));var s=this.getValidator(t);s&&i.push({message:s.getError(e),warnOnly:n,passed:s.test(),validator:s})},this);return i},getAdvice:function(e,t){return t.retrieve("$moo:advice-"+e)},insertAdvice:function(e,t){var i=t.get("validatorProps");i.msgPos&&document.id(i.msgPos)?document.id(i.msgPos).grab(e):t.type&&"radio"==t.type.toLowerCase()?t.getParent().adopt(e):e.inject(document.id(t),"after")},validateField:function(e,t,i){var n=this.parent(e,t);if((this.options.scrollToErrorsOnSubmit&&null==i||i)&&!n){for(var s=document.id(this).getElement(".validation-failed"),a=document.id(this).getParent();a!=document.body&&a.getScrollSize().y==a.getSize().y;)a=a.getParent();var r=a.retrieve("$moo:fvScroller");!r&&window.Fx&&Fx.Scroll&&(r=new Fx.Scroll(a,this.options.scrollFxOptions),a.store("$moo:fvScroller",r)),s&&(r?r.toElement(s):a.scrollTo(a.getScroll().x,s.getPosition(a).y-20))}return n},watchFields:function(e){e.each(function(e){this.options.evaluateFieldsOnBlur&&e.addEvent("blur",this.validationMonitor.pass([e,!1,this.options.scrollToErrorsOnBlur],this)),this.options.evaluateFieldsOnChange&&e.addEvent("change",this.validationMonitor.pass([e,!0,this.options.scrollToErrorsOnChange],this))},this)}}),function(){var e=this.OverText=new Class({Implements:[Options,Events,Class.Occlude],Binds:["reposition","assert","focus","hide"],options:{element:"label",labelClass:"overTxtLabel",positionOptions:{position:"upperLeft",edge:"upperLeft",offset:{x:4,y:2}},poll:!1,pollInterval:250,wrap:!1},property:"OverText",initialize:function(t,i){if(t=this.element=document.id(t),this.occlude())return this.occluded;this.setOptions(i),this.attach(t),e.instances.push(this),this.options.poll&&this.poll()},toElement:function(){return this.element},attach:function(){var e=this.element,t=this.options,i=t.textOverride||e.get("alt")||e.get("title");if(!i)return this;var n=this.text=new Element(t.element,{class:t.labelClass,styles:{lineHeight:"normal",position:"absolute",cursor:"text"},html:i,events:{click:this.hide.pass("label"==t.element,this)}}).inject(e,"after");return"label"==t.element&&(e.get("id")||e.set("id","input_"+String.uniqueID()),n.set("for",e.get("id"))),t.wrap&&(this.textHolder=new Element("div.overTxtWrapper",{styles:{lineHeight:"normal",position:"relative"}}).grab(n).inject(e,"before")),this.enable()},destroy:function(){return this.element.eliminate(this.property),this.disable(),this.text&&this.text.destroy(),this.textHolder&&this.textHolder.destroy(),this},disable:function(){return this.element.removeEvents({focus:this.focus,blur:this.assert,change:this.assert}),window.removeEvent("resize",this.reposition),this.hide(!0,!0),this},enable:function(){return this.element.addEvents({focus:this.focus,blur:this.assert,change:this.assert}),window.addEvent("resize",this.reposition),this.reposition(),this},wrap:function(){"label"==this.options.element&&(this.element.get("id")||this.element.set("id","input_"+String.uniqueID()),this.text.set("for",this.element.get("id")))},startPolling:function(){return this.pollingPaused=!1,this.poll()},poll:function(e){return this.poller&&!e?this:(e?clearInterval(this.poller):this.poller=function(){this.pollingPaused||this.assert(!0)}.periodical(this.options.pollInterval,this),this)},stopPolling:function(){return this.pollingPaused=!0,this.poll(!0)},focus:function(){return!this.text||this.text.isDisplayed()&&!this.element.get("disabled")?this.hide():this},hide:function(e,t){if(this.text&&this.text.isDisplayed()&&(!this.element.get("disabled")||t)&&(this.text.hide(),this.fireEvent("textHide",[this.text,this.element]),this.pollingPaused=!0,!e))try{this.element.fireEvent("focus"),this.element.focus()}catch(e){}return this},show:function(){return document.id(this.text)&&!this.text.isDisplayed()&&(this.text.show(),this.reposition(),this.fireEvent("textShow",[this.text,this.element]),this.pollingPaused=!1),this},test:function(){return!this.element.get("value")},assert:function(e){return this[this.test()?"show":"hide"](e)},reposition:function(){return this.assert(!0),this.element.isVisible()?(this.text&&this.test()&&this.text.position(Object.merge(this.options.positionOptions,{relativeTo:this.element})),this):this.stopPolling().hide()}})}(),OverText.instances=[],Object.append(OverText,{each:function(e){return OverText.instances.each(function(t,i){t.element&&t.text&&e.call(OverText,t,i)})},update:function(){return OverText.each(function(e){return e.reposition()})},hideAll:function(){return OverText.each(function(e){return e.hide(!0,!0)})},showAll:function(){return OverText.each(function(e){return e.show()})}}),Fx.Elements=new Class({Extends:Fx.CSS,initialize:function(e,t){this.elements=this.subject=$$(e),this.parent(t)},compute:function(e,t,i){var n={};for(var s in e){var a=e[s],r=t[s],o=n[s]={};for(var l in a)o[l]=this.parent(a[l],r[l],i)}return n},set:function(e){for(var t in e)if(this.elements[t]){var i=e[t];for(var n in i)this.render(this.elements[t],n,i[n],this.options.unit)}return this},start:function(e){if(!this.check(e))return this;var t={},i={};for(var n in e)if(this.elements[n]){var s=e[n],a=t[n]={},r=i[n]={};for(var o in s){var l=this.prepare(this.elements[n],o,s[o]);a[o]=l.from,r[o]=l.to}}return this.parent(t,i)}}),Fx.Accordion=new Class({Extends:Fx.Elements,options:{fixedHeight:!1,fixedWidth:!1,display:0,show:!1,height:!0,width:!1,opacity:!0,alwaysHide:!1,trigger:"click",initialDisplayFx:!0,resetHeight:!0,keepOpen:!1},initialize:function(){var e=function(e){return null!=e},t=Array.link(arguments,{container:Type.isElement,options:Type.isObject,togglers:e,elements:e});this.parent(t.elements,t.options);var i=this.options,n=this.togglers=$$(t.togglers);this.previous=-1,this.internalChain=new Chain,i.alwaysHide&&(this.options.link="chain"),(i.show||0===this.options.show)&&(i.display=!1,this.previous=i.show),i.start&&(i.display=!1,i.show=!1);var s=this.effects={};i.opacity&&(s.opacity="fullOpacity"),i.width&&(s.width=i.fixedWidth?"fullWidth":"offsetWidth"),i.height&&(s.height=i.fixedHeight?"fullHeight":"scrollHeight");for(var a=0,r=n.length;a<r;a++)this.addSection(n[a],this.elements[a]);this.elements.each(function(e,t){if(i.show===t)this.fireEvent("active",[n[t],e]);else for(var a in s)e.setStyle(a,0)},this),(i.display||0===i.display||!1===i.initialDisplayFx)&&this.display(i.display,i.initialDisplayFx),!1!==i.fixedHeight&&(i.resetHeight=!1),this.addEvent("complete",this.internalChain.callChain.bind(this.internalChain))},addSection:function(e,t){e=document.id(e),t=document.id(t),this.togglers.include(e),this.elements.include(t);var i=this.togglers,n=this.options,s=i.contains(e),a=i.indexOf(e),r=this.display.pass(a,this);if(e.store("accordion:display",r).addEvent(n.trigger,r),n.height&&t.setStyles({"padding-top":0,"border-top":"none","padding-bottom":0,"border-bottom":"none"}),n.width&&t.setStyles({"padding-left":0,"border-left":"none","padding-right":0,"border-right":"none"}),t.fullOpacity=1,n.fixedWidth&&(t.fullWidth=n.fixedWidth),n.fixedHeight&&(t.fullHeight=n.fixedHeight),t.setStyle("overflow","hidden"),!s)for(var o in this.effects)t.setStyle(o,0);return this},removeSection:function(e,t){var i=this.togglers,n=i.indexOf(e),s=this.elements[n],a=function(){i.erase(e),this.elements.erase(s),this.detach(e)}.bind(this);return this.now==n||null!=t?this.display(null!=t?t:n-1>=0?n-1:0).chain(a):a(),this},detach:function(e){var t=function(e){e.removeEvent(this.options.trigger,e.retrieve("accordion:display"))}.bind(this);return e?t(e):this.togglers.each(t),this},display:function(e,t){if(!this.check(e,t))return this;var i={},n=this.elements,s=this.options,a=this.effects,r=s.keepOpen,o=s.alwaysHide;if(null==t&&(t=!0),"element"==typeOf(e)&&(e=n.indexOf(e)),e==this.current&&!o&&!r)return this;if(s.resetHeight){var l=n[this.current];if(l&&!this.selfHidden)for(var h in a)l.setStyle(h,l[a[h]])}return this.timer&&"chain"==s.link?this:(null!=this.current&&(this.previous=this.current),this.current=e,this.selfHidden=!1,n.each(function(n,l){i[l]={};var h,u;if(!r||l==e){l==e&&(u=n.offsetHeight>0&&s.height||n.offsetWidth>0&&s.width),l!=e?h=!0:(o||r)&&u&&(h=!0,this.selfHidden=!0),this.fireEvent(h?"background":"active",[this.togglers[l],n]);for(var d in a)i[l][d]=h?0:n[a[d]];t||h||!s.resetHeight||(i[l].height="auto")}},this),this.internalChain.clearChain(),this.internalChain.chain(function(){if(s.resetHeight&&!this.selfHidden){var t=n[e];t&&t.setStyle("height","auto")}}.bind(this)),t?this.start(i):this.set(i).internalChain.callChain())}}),Fx.Move=new Class({Extends:Fx.Morph,options:{relativeTo:document.body,position:"center",edge:!1,offset:{x:0,y:0}},start:function(e){var t=this.element,i=t.getStyles("top","left");return"auto"!=i.top&&"auto"!=i.left||t.setPosition(t.getPosition(t.getOffsetParent())),this.parent(t.position(Object.merge({},this.options,e,{returnPos:!0})))}}),Element.Properties.move={set:function(e){return this.get("move").cancel().setOptions(e),this},get:function(){var e=this.retrieve("move");return e||(e=new Fx.Move(this,{link:"cancel"}),this.store("move",e)),e}},Element.implement({move:function(e){return this.get("move").start(e),this}}),function(){function e(e){return/^(?:body|html)$/i.test(e.tagName)}Fx.Scroll=new Class({Extends:Fx,options:{offset:{x:0,y:0},wheelStops:!0},initialize:function(e,t){if(this.element=this.subject=document.id(e),this.parent(t),"element"!=typeOf(this.element)&&(this.element=document.id(this.element.getDocument().body)),this.options.wheelStops){var i=this.element,n=this.cancel.pass(!1,this);this.addEvent("start",function(){i.addEvent("mousewheel",n)},!0),this.addEvent("complete",function(){i.removeEvent("mousewheel",n)},!0)}},set:function(){var e=Array.flatten(arguments);return this.element.scrollTo(e[0],e[1]),this},compute:function(e,t,i){return[0,1].map(function(n){return Fx.compute(e[n],t[n],i)})},start:function(e,t){if(!this.check(e,t))return this;var i=this.element.getScroll();return this.parent([i.x,i.y],[e,t])},calculateScroll:function(e,t){var i=this.element,n=i.getScrollSize(),s=i.getScroll(),a=i.getSize(),r=this.options.offset,o={x:e,y:t};for(var l in o)o[l]||0===o[l]||(o[l]=s[l]),"number"!=typeOf(o[l])&&(o[l]=n[l]-a[l]),o[l]+=r[l];return[o.x,o.y]},toTop:function(){return this.start.apply(this,this.calculateScroll(!1,0))},toLeft:function(){return this.start.apply(this,this.calculateScroll(0,!1))},toRight:function(){return this.start.apply(this,this.calculateScroll("right",!1))},toBottom:function(){return this.start.apply(this,this.calculateScroll(!1,"bottom"))},toElement:function(t,i){i=i?Array.convert(i):["x","y"];var n=e(this.element)?{x:0,y:0}:this.element.getScroll(),s=Object.map(document.id(t).getPosition(this.element),function(e,t){return!!i.contains(t)&&e+n[t]});return this.start.apply(this,this.calculateScroll(s.x,s.y))},toElementEdge:function(e,t,i){t=t?Array.convert(t):["x","y"],e=document.id(e);var n={},s=e.getPosition(this.element),a=e.getSize(),r=this.element.getScroll(),o=this.element.getSize(),l={x:s.x+a.x,y:s.y+a.y};return["x","y"].each(function(e){t.contains(e)&&(l[e]>r[e]+o[e]&&(n[e]=l[e]-o[e]),s[e]<r[e]&&(n[e]=s[e])),null==n[e]&&(n[e]=r[e]),i&&i[e]&&(n[e]=n[e]+i[e])},this),n.x==r.x&&n.y==r.y||this.start(n.x,n.y),this},toElementCenter:function(e,t,i){t=t?Array.convert(t):["x","y"],e=document.id(e);var n={},s=e.getPosition(this.element),a=e.getSize(),r=this.element.getScroll(),o=this.element.getSize();return["x","y"].each(function(e){t.contains(e)&&(n[e]=s[e]-(o[e]-a[e])/2),null==n[e]&&(n[e]=r[e]),i&&i[e]&&(n[e]=n[e]+i[e])},this),n.x==r.x&&n.y==r.y||this.start(n.x,n.y),this}})}(),Fx.Slide=new Class({Extends:Fx,options:{mode:"vertical",wrapper:!1,hideOverflow:!0,resetHeight:!1},initialize:function(e,t){e=this.element=this.subject=document.id(e),this.parent(t),t=this.options;var i=e.retrieve("wrapper"),n=e.getStyles("margin","position","overflow");t.hideOverflow&&(n=Object.append(n,{overflow:"hidden"})),t.wrapper&&(i=document.id(t.wrapper).setStyles(n)),i||(i=new Element("div",{styles:n}).wraps(e)),e.store("wrapper",i).setStyle("margin",0),"visible"==e.getStyle("overflow")&&e.setStyle("overflow","hidden"),this.now=[],this.open=!0,this.wrapper=i,this.addEvent("complete",function(){this.open=0!=i["offset"+this.layout.capitalize()],this.open&&this.options.resetHeight&&i.setStyle("height","")},!0)},vertical:function(){this.margin="margin-top",this.layout="height",this.offset=this.element.offsetHeight},horizontal:function(){this.margin="margin-left",this.layout="width",this.offset=this.element.offsetWidth},set:function(e){return this.element.setStyle(this.margin,e[0]),this.wrapper.setStyle(this.layout,e[1]),this},compute:function(e,t,i){return[0,1].map(function(n){return Fx.compute(e[n],t[n],i)})},start:function(e,t){if(!this.check(e,t))return this;this[t||this.options.mode]();var i,n=this.element.getStyle(this.margin).toInt(),s=this.wrapper.getStyle(this.layout).toInt(),a=[[n,s],[0,this.offset]],r=[[n,s],[-this.offset,0]];switch(e){case"in":i=a;break;case"out":i=r;break;case"toggle":i=0==s?a:r}return this.parent(i[0],i[1])},slideIn:function(e){return this.start("in",e)},slideOut:function(e){return this.start("out",e)},hide:function(e){return this[e||this.options.mode](),this.open=!1,this.set([-this.offset,0])},show:function(e){return this[e||this.options.mode](),this.open=!0,this.set([0,this.offset])},toggle:function(e){return this.start("toggle",e)}}),Element.Properties.slide={set:function(e){return this.get("slide").cancel().setOptions(e),this},get:function(){var e=this.retrieve("slide");return e||(e=new Fx.Slide(this,{link:"cancel"}),this.store("slide",e)),e}},Element.implement({slide:function(e,t){e=e||"toggle";var i,n=this.get("slide");switch(e){case"hide":n.hide(t);break;case"show":n.show(t);break;case"toggle":var s=this.retrieve("slide:flag",n.open);n[s?"slideOut":"slideIn"](t),this.store("slide:flag",!s),i=!0;break;default:n.start(e,t)}return i||this.eliminate("slide:flag"),this}}),Fx.SmoothScroll=new Class({Extends:Fx.Scroll,options:{axes:["x","y"]},initialize:function(e,t){t=t||document,this.doc=t.getDocument(),
this.parent(this.doc,e);var i=t.getWindow(),n=i.location.href.match(/^[^#]*/)[0]+"#";$$(this.options.links||this.doc.links).each(function(e){if(0==e.href.indexOf(n)){var t=e.href.substr(n.length);t&&this.useLink(e,t)}},this),this.addEvent("complete",function(){i.location.hash=this.anchor,this.element.scrollTo(this.to[0],this.to[1])},!0)},useLink:function(e,t){return e.addEvent("click",function(i){var n=document.id(t)||this.doc.getElement("a[name="+t+"]");n&&(i.preventDefault(),this.toElement(n,this.options.axes).chain(function(){this.fireEvent("scrolledTo",[e,n])}.bind(this)),this.anchor=t)}.bind(this)),this}}),Fx.Sort=new Class({Extends:Fx.Elements,options:{mode:"vertical"},initialize:function(e,t){this.parent(e,t),this.elements.each(function(e){"static"==e.getStyle("position")&&e.setStyle("position","relative")}),this.setDefaultOrder()},setDefaultOrder:function(){this.currentOrder=this.elements.map(function(e,t){return t})},sort:function(){if(!this.check(arguments))return this;var e=Array.flatten(arguments),t=0,i=0,n={},s={},a="vertical"==this.options.mode,r=this.elements.map(function(e,n){var r,o=e.getComputedSize({styles:["border","padding","margin"]});a?(r={top:t,margin:o["margin-top"],height:o.totalHeight},t+=r.height-o["margin-top"]):(r={left:i,margin:o["margin-left"],width:o.totalWidth},i+=r.width);var l=a?"top":"left";s[n]={};var h=e.getStyle(l).toInt();return s[n][l]=h||0,r},this);this.set(s),e=e.map(function(e){return e.toInt()}),e.length!=this.elements.length&&(this.currentOrder.each(function(t){e.contains(t)||e.push(t)}),e.length>this.elements.length&&e.splice(this.elements.length-1,e.length-this.elements.length));var o=0;t=i=0,e.each(function(e){var s={};a?(s.top=t-r[e].top-o,t+=r[e].height):(s.left=i-r[e].left,i+=r[e].width),o+=r[e].margin,n[e]=s},this);var l={};return Array.clone(e).sort().each(function(e){l[e]=n[e]}),this.start(l),this.currentOrder=e,this},rearrangeDOM:function(e){e=e||this.currentOrder;var t=this.elements[0].getParent(),i=[];return this.elements.setStyle("opacity",0),e.each(function(e){i.push(this.elements[e].inject(t).setStyles({top:0,left:0}))},this),this.elements.setStyle("opacity",1),this.elements=$$(i),this.setDefaultOrder(),this},getDefaultOrder:function(){return this.elements.map(function(e,t){return t})},getCurrentOrder:function(){return this.currentOrder},forward:function(){return this.sort(this.getDefaultOrder())},backward:function(){return this.sort(this.getDefaultOrder().reverse())},reverse:function(){return this.sort(this.currentOrder.reverse())},sortByElements:function(e){return this.sort(e.map(function(e){return this.elements.indexOf(e)},this))},swap:function(e,t){"element"==typeOf(e)&&(e=this.elements.indexOf(e)),"element"==typeOf(t)&&(t=this.elements.indexOf(t));var i=Array.clone(this.currentOrder);return i[this.currentOrder.indexOf(e)]=t,i[this.currentOrder.indexOf(t)]=e,this.sort(i)}}),function(){var e=this.Keyboard=new Class({Extends:Events,Implements:[Options],options:{defaultEventType:"keydown",active:!1,manager:null,events:{},nonParsedEvents:["activate","deactivate","onactivate","ondeactivate","changed","onchanged"]},initialize:function(e){e&&e.manager&&(this._manager=e.manager,delete e.manager),this.setOptions(e),this._setup()},addEvent:function(t,i,n){return this.parent(e.parse(t,this.options.defaultEventType,this.options.nonParsedEvents),i,n)},removeEvent:function(t,i){return this.parent(e.parse(t,this.options.defaultEventType,this.options.nonParsedEvents),i)},toggleActive:function(){return this[this.isActive()?"deactivate":"activate"]()},activate:function(t){if(t){if(t.isActive())return this;this._activeKB&&t!=this._activeKB&&(this.previous=this._activeKB,this.previous.fireEvent("deactivate")),this._activeKB=t.fireEvent("activate"),e.manager.fireEvent("changed")}else this._manager&&this._manager.activate(this);return this},isActive:function(){return this._manager?this._manager._activeKB==this:e.manager==this},deactivate:function(t){return t?t===this._activeKB&&(this._activeKB=null,t.fireEvent("deactivate"),e.manager.fireEvent("changed")):this._manager&&this._manager.deactivate(this),this},relinquish:function(){return this.isActive()&&this._manager&&this._manager.previous?this._manager.activate(this._manager.previous):this.deactivate(),this},manage:function(e){return e._manager&&e._manager.drop(e),this._instances.push(e),e._manager=this,this._activeKB||this.activate(e),this},drop:function(e){return e.relinquish(),this._instances.erase(e),this._activeKB==e&&(this.previous&&this._instances.contains(this.previous)?this.activate(this.previous):this._activeKB=this._instances[0]),this},trace:function(){e.trace(this)},each:function(t){e.each(this,t)},_instances:[],_disable:function(e){this._activeKB==e&&(this._activeKB=null)},_setup:function(){this.addEvents(this.options.events),e.manager&&!this._manager&&e.manager.manage(this),this.options.active?this.activate():this.relinquish()},_handle:function(e,t){if(!e.preventKeyboardPropagation){var i=!!this._manager;i&&this._activeKB&&(this._activeKB._handle(e,t),e.preventKeyboardPropagation)||(this.fireEvent(t,e),!i&&this._activeKB&&this._activeKB._handle(e,t))}}}),t={},i=["shift","control","alt","meta"],n=/^(?:shift|control|ctrl|alt|meta)$/;e.parse=function(e,s,a){if(a&&a.contains(e.toLowerCase()))return e;if(e=e.toLowerCase().replace(/^(keyup|keydown):/,function(e,t){return s=t,""}),!t[e])if("+"!=e){var r,o={};e.split("+").each(function(e){n.test(e)?o[e]=!0:r=e}),o.control=o.control||o.ctrl;var l=[];i.each(function(e){o[e]&&l.push(e)}),r&&l.push(r),t[e]=l.join("+")}else t[e]=e;return s+":keys("+t[e]+")"},e.each=function(t,i){for(var n=t||e.manager;n;)i(n),n=n._activeKB},e.stop=function(e){e.preventKeyboardPropagation=!0},e.manager=new e({active:!0}),e.trace=function(t){t=t||e.manager;var i=window.console&&console.log;i&&console.log("the following items have focus: "),e.each(t,function(e){i&&console.log(document.id(e.widget)||e.wiget||e)})};var s=function(t){var s=[];i.each(function(e){t[e]&&s.push(e)}),n.test(t.key)||s.push(t.key),e.manager._handle(t,t.type+":keys("+s.join("+")+")")};document.addEvents({keyup:s,keydown:s})}(),Keyboard.prototype.options.nonParsedEvents.combine(["rebound","onrebound"]),Keyboard.implement({addShortcut:function(e,t){return this._shortcuts=this._shortcuts||[],this._shortcutIndex=this._shortcutIndex||{},t.getKeyboard=Function.convert(this),t.name=e,this._shortcutIndex[e]=t,this._shortcuts.push(t),t.keys&&this.addEvent(t.keys,t.handler),this},addShortcuts:function(e){for(var t in e)this.addShortcut(t,e[t]);return this},removeShortcut:function(e){var t=this.getShortcut(e);return t&&t.keys&&(this.removeEvent(t.keys,t.handler),delete this._shortcutIndex[e],this._shortcuts.erase(t)),this},removeShortcuts:function(e){return e.each(this.removeShortcut,this),this},getShortcuts:function(){return this._shortcuts||[]},getShortcut:function(e){return(this._shortcutIndex||{})[e]}}),Keyboard.rebind=function(e,t){Array.convert(t).each(function(t){t.getKeyboard().removeEvent(t.keys,t.handler),t.getKeyboard().addEvent(e,t.handler),t.keys=e,t.getKeyboard().fireEvent("rebound")})},Keyboard.getActiveShortcuts=function(e){var t=[],i=[];return Keyboard.each(e,[].push.bind(t)),t.each(function(e){i.extend(e.getShortcuts())}),i},Keyboard.getShortcut=function(e,t,i){i=i||{};var n=i.many?[]:null,s=i.many?function(t){var i=t.getShortcut(e);i&&n.push(i)}:function(t){n||(n=t.getShortcut(e))};return Keyboard.each(t,s),n},Keyboard.getShortcuts=function(e,t){return Keyboard.getShortcut(e,t,{many:!0})},function(){this.HtmlTable=new Class({Implements:[Options,Events,Class.Occlude],options:{properties:{cellpadding:0,cellspacing:0,border:0},rows:[],headers:[],footers:[]},property:"HtmlTable",initialize:function(){var e=Array.link(arguments,{options:Type.isObject,table:Type.isElement,id:Type.isString});if(this.setOptions(e.options),!e.table&&e.id&&(e.table=document.id(e.id)),this.element=e.table||new Element("table",this.options.properties),this.occlude())return this.occluded;this.build()},build:function(){this.element.store("HtmlTable",this),this.body=document.id(this.element.tBodies[0])||new Element("tbody").inject(this.element),$$(this.body.rows),this.options.headers.length?this.setHeaders(this.options.headers):this.thead=document.id(this.element.tHead),this.thead&&(this.head=this.getHead()),this.options.footers.length&&this.setFooters(this.options.footers),this.tfoot=document.id(this.element.tFoot),this.tfoot&&(this.foot=document.id(this.tfoot.rows[0])),this.options.rows.each(function(e){this.push(e)},this)},toElement:function(){return this.element},empty:function(){return this.body.empty(),this},set:function(e,t){var i="headers"==e?"tHead":"tFoot",n=i.toLowerCase();this[n]=(document.id(this.element[i])||new Element(n).inject(this.element,"top")).empty();var s=this.push(t,{},this[n],"headers"==e?"th":"td");return"headers"==e?this.head=this.getHead():this.foot=this.getHead(),s},getHead:function(){var e=this.thead.rows;return e.length>1?$$(e):!!e.length&&document.id(e[0])},setHeaders:function(e){return this.set("headers",e),this},setFooters:function(e){return this.set("footers",e),this},update:function(e,t,i){var n=e.getChildren(i||"td"),s=n.length-1;return t.each(function(t,a){var r=n[a]||new Element(i||"td").inject(e),o=(t&&Object.prototype.hasOwnProperty.call(t,"content")?t.content:"")||t,l=typeOf(o);t&&Object.prototype.hasOwnProperty.call(t,"properties")&&r.set(t.properties),/(element(s?)|array|collection)/.test(l)?r.empty().adopt(o):r.set("html",o),a>s?n.push(r):n[a]=r}),{tr:e,tds:n}},push:function(e,t,i,n,s){return"element"==typeOf(e)&&"tr"==e.get("tag")?(e.inject(i||this.body,s),{tr:e,tds:e.getChildren("td")}):this.update(new Element("tr",t).inject(i||this.body,s),e,n)},pushMany:function(e,t,i,n,s){return e.map(function(e){return this.push(e,t,i,n,s)},this)}})}(),["adopt","inject","wraps","grab","replaces","dispose"].each(function(e){HtmlTable.implement(e,function(){return this.element[e].apply(this.element,arguments),this})}),HtmlTable=Class.refactor(HtmlTable,{options:{useKeyboard:!0,classRowSelected:"table-tr-selected",classRowHovered:"table-tr-hovered",classSelectable:"table-selectable",shiftForMultiSelect:!0,allowMultiSelect:!0,selectable:!1,selectHiddenRows:!1},initialize:function(){if(this.previous.apply(this,arguments),this.occluded)return this.occluded;this.selectedRows=new Elements,this.bound||(this.bound={}),this.bound.mouseleave=this.mouseleave.bind(this),this.bound.clickRow=this.clickRow.bind(this),this.bound.activateKeyboard=function(){this.keyboard&&this.selectEnabled&&this.keyboard.activate()}.bind(this),this.options.selectable&&this.enableSelect()},empty:function(){return this.body.rows.length&&this.selectNone(),this.previous()},enableSelect:function(){return this.selectEnabled=!0,this.attachSelects(),this.element.addClass(this.options.classSelectable),this},disableSelect:function(){return this.selectEnabled=!1,this.attachSelects(!1),this.element.removeClass(this.options.classSelectable),this},push:function(){var e=this.previous.apply(this,arguments);return this.updateSelects(),e},toggleRow:function(e){return this[(this.isSelected(e)?"de":"")+"selectRow"](e)},selectRow:function(e,t){if(!this.isSelected(e)&&(t||this.body.getChildren().contains(e)))return this.options.allowMultiSelect||this.selectNone(),this.isSelected(e)||(this.selectedRows.push(e),e.addClass(this.options.classRowSelected),this.fireEvent("rowFocus",[e,this.selectedRows]),this.fireEvent("stateChanged")),this.focused=e,document.clearSelection(),this},isSelected:function(e){return this.selectedRows.contains(e)},getSelected:function(){return this.selectedRows},serialize:function(){var e=this.previous.apply(this,arguments)||{};return this.options.selectable&&(e.selectedRows=this.selectedRows.map(function(e){return Array.indexOf(this.body.rows,e)}.bind(this))),e},restore:function(e){this.options.selectable&&e.selectedRows&&e.selectedRows.each(function(e){this.selectRow(this.body.rows[e])}.bind(this)),this.previous.apply(this,arguments)},deselectRow:function(e,t){if(this.isSelected(e)&&(t||this.body.getChildren().contains(e)))return this.selectedRows=new Elements(Array.convert(this.selectedRows).erase(e)),e.removeClass(this.options.classRowSelected),this.fireEvent("rowUnfocus",[e,this.selectedRows]),this.fireEvent("stateChanged"),this},selectAll:function(e){if(e||this.options.allowMultiSelect)return this.selectRange(0,this.body.rows.length,e),this},selectNone:function(){return this.selectAll(!0)},selectRange:function(e,t,i){if(this.options.allowMultiSelect||i){var n=i?"deselectRow":"selectRow",s=Array.clone(this.body.rows);if("element"==typeOf(e)&&(e=s.indexOf(e)),"element"==typeOf(t)&&(t=s.indexOf(t)),(t=t<s.length-1?t:s.length-1)<e){var a=e;e=t,t=a}for(var r=e;r<=t;r++)(this.options.selectHiddenRows||s[r].isDisplayed())&&this[n](s[r],!0);return this}},deselectRange:function(e,t){this.selectRange(e,t,!0)},enterRow:function(e){this.hovered&&(this.hovered=this.leaveRow(this.hovered)),this.hovered=e.addClass(this.options.classRowHovered)},leaveRow:function(e){e.removeClass(this.options.classRowHovered)},updateSelects:function(){Array.each(this.body.rows,function(e){var t=e.retrieve("binders");(t||this.selectEnabled)&&(t||(t={mouseenter:this.enterRow.pass([e],this),mouseleave:this.leaveRow.pass([e],this)},e.store("binders",t)),this.selectEnabled?e.addEvents(t):e.removeEvents(t))},this)},shiftFocus:function(e,t){if(!this.focused)return this.selectRow(this.body.rows[0],t);var i=this.getRowByOffset(e,this.options.selectHiddenRows);if(null===i||this.focused==this.body.rows[i])return this;this.toggleRow(this.body.rows[i],t)},clickRow:function(e,t){(e.shift||e.meta||e.control)&&this.options.shiftForMultiSelect||e.rightClick&&this.isSelected(t)&&this.options.allowMultiSelect||this.selectNone(),e.rightClick?this.selectRow(t):this.toggleRow(t),e.shift&&(this.selectRange(this.rangeStart||this.body.rows[0],t,!this.rangeStart||!this.isSelected(t)),this.focused=t),this.rangeStart=t},getRowByOffset:function(e,t){if(!this.focused)return 0;var i=Array.indexOf(this.body.rows,this.focused);if(0==i&&e<0||i==this.body.rows.length-1&&e>0)return null;if(t)i+=e;else{var n=0;if(e>0)for(;n<e&&i<this.body.rows.length-1;)this.body.rows[++i].isDisplayed()&&n++;else for(;n>e&&i>0;)this.body.rows[--i].isDisplayed()&&n--}return i},attachSelects:function(e){e=null==e||e;var t=e?"addEvents":"removeEvents";if(this.element[t]({mouseleave:this.bound.mouseleave,click:this.bound.activateKeyboard}),this.body[t]({"click:relay(tr)":this.bound.clickRow,"contextmenu:relay(tr)":this.bound.clickRow}),this.options.useKeyboard||this.keyboard){if(this.keyboard||(this.keyboard=new Keyboard),!this.selectKeysDefined){this.selectKeysDefined=!0;var i,n,s=function(e){var t=function(s){clearTimeout(i),s.preventDefault();var a=this.body.rows[this.getRowByOffset(e,this.options.selectHiddenRows)];s.shift&&a&&this.isSelected(a)?(this.deselectRow(this.focused),this.focused=a):(!a||this.options.allowMultiSelect&&s.shift||this.selectNone(),this.shiftFocus(e,s)),i=n?t.delay(100,this,s):function(){n=!0,t(s)}.delay(400)}.bind(this);return t}.bind(this),a=function(){clearTimeout(i),n=!1};this.keyboard.addEvents({"keydown:shift+up":s(-1),"keydown:shift+down":s(1),"keyup:shift+up":a,"keyup:shift+down":a,"keyup:up":a,"keyup:down":a});var r="";this.options.allowMultiSelect&&this.options.shiftForMultiSelect&&this.options.useKeyboard&&(r=" (Shift multi-selects)."),this.keyboard.addShortcuts({"Select Previous Row":{keys:"up",shortcut:"up arrow",handler:s(-1),description:"Select the previous row in the table."+r},"Select Next Row":{keys:"down",shortcut:"down arrow",handler:s(1),description:"Select the next row in the table."+r}})}this.keyboard[e?"activate":"deactivate"]()}this.updateSelects()},mouseleave:function(){this.hovered&&this.leaveRow(this.hovered)}}),function(){var e=document.createElement("table");try{e.innerHTML="<tr><td></td></tr>",e=0===e.childNodes.length}catch(t){e=!0}HtmlTable=Class.refactor(HtmlTable,{options:{sortIndex:0,sortReverse:!1,parsers:[],defaultParser:"string",classSortable:"table-sortable",classHeadSort:"table-th-sort",classHeadSortRev:"table-th-sort-rev",classNoSort:"table-th-nosort",classGroupHead:"table-tr-group-head",classGroup:"table-tr-group",classCellSort:"table-td-sort",classSortSpan:"table-th-sort-span",sortable:!1,thSelector:"th"},initialize:function(){if(this.previous.apply(this,arguments),this.occluded)return this.occluded;this.sorted={index:null,dir:1},this.bound||(this.bound={}),this.bound.headClick=this.headClick.bind(this),this.sortSpans=new Elements,this.options.sortable&&(this.enableSort(),null!=this.options.sortIndex&&this.sort(this.options.sortIndex,this.options.sortReverse))},attachSorts:function(e){this.detachSorts(),!1!==e&&this.element.addEvent("click:relay("+this.options.thSelector+")",this.bound.headClick)},detachSorts:function(){this.element.removeEvents("click:relay("+this.options.thSelector+")")},setHeaders:function(){this.previous.apply(this,arguments),this.sortable&&this.setParsers()},setParsers:function(){this.parsers=this.detectParsers()},detectParsers:function(){return this.head&&this.head.getElements(this.options.thSelector).flatten().map(this.detectParser,this)},detectParser:function(e,t){if(e.hasClass(this.options.classNoSort)||e.retrieve("htmltable-parser"))return e.retrieve("htmltable-parser");var i=new Element("div");i.adopt(e.childNodes).inject(e);var n=new Element("span",{class:this.options.classSortSpan}).inject(i,"top");this.sortSpans.push(n);var s,a=this.options.parsers[t],r=this.body.rows;switch(typeOf(a)){case"function":a={convert:a},s=!0;break;case"string":a=a,s=!0}return s||HtmlTable.ParserPriority.some(function(e){var i=HtmlTable.Parsers[e],n=i.match;if(!n)return!1;for(var s=0,o=r.length;s<o;s++){var l=document.id(r[s].cells[t]),h=l?l.get("html").clean():"";if(h&&n.test(h))return a=i,!0}}),a||(a=this.options.defaultParser),e.store("htmltable-parser",a),a},headClick:function(e,t){if(this.head&&!t.hasClass(this.options.classNoSort))return this.sort(Array.indexOf(this.head.getElements(this.options.thSelector).flatten(),t)%this.body.rows[0].cells.length)},serialize:function(){var e=this.previous.apply(this,arguments)||{};return this.options.sortable&&(e.sortIndex=this.sorted.index,e.sortReverse=this.sorted.reverse),e},restore:function(e){this.options.sortable&&e.sortIndex&&this.sort(e.sortIndex,e.sortReverse),this.previous.apply(this,arguments)},setSortedState:function(e,t){null!=t?this.sorted.reverse=t:this.sorted.index==e?this.sorted.reverse=!this.sorted.reverse:this.sorted.reverse=null==this.sorted.index,null!=e&&(this.sorted.index=e)},setHeadSort:function(e){var t=$$(this.head.length?this.head.map(function(e){return e.getElements(this.options.thSelector)[this.sorted.index]},this).clean():this.head.cells[this.sorted.index]);t.length&&(e?(t.addClass(this.options.classHeadSort),this.sorted.reverse?t.addClass(this.options.classHeadSortRev):t.removeClass(this.options.classHeadSortRev)):t.removeClass(this.options.classHeadSort).removeClass(this.options.classHeadSortRev))},setRowSort:function(e,t){for(var i,n,s=e.length,a=this.body;s;){var r=e[--s],o=r.position,l=a.rows[o];if(!l.disabled)for(t||(i=this.setGroupSort(i,l,r),this.setRowStyle(l,s)),a.appendChild(l),n=0;n<s;n++)e[n].position>o&&e[n].position--}},setRowStyle:function(e,t){this.previous(e,t),e.cells[this.sorted.index].addClass(this.options.classCellSort)},setGroupSort:function(e,t,i){return e==i.value?t.removeClass(this.options.classGroupHead).addClass(this.options.classGroup):t.removeClass(this.options.classGroup).addClass(this.options.classGroupHead),i.value},getParser:function(){var e=this.parsers[this.sorted.index];return"string"==typeOf(e)?HtmlTable.Parsers[e]:e},sort:function(t,i,n,s){if(this.head){n||(this.clearSort(),this.setSortedState(t,i),this.setHeadSort(!0));var a=this.getParser();if(a){var r;e||(r=this.body.getParent(),this.body.dispose());var o=this.parseData(a).sort(s||function(e,t){return e.value===t.value?0:e.value>t.value?1:-1}),l=this.sorted.reverse==(a==HtmlTable.Parsers["input-checked"]);return l&&o.reverse(!0),this.setRowSort(o,n),r&&r.grab(this.body),this.fireEvent("stateChanged"),this.fireEvent("sort",[this.body,this.sorted.index,l?"asc":"desc"])}}},parseData:function(e){return Array.map(this.body.rows,function(t,i){return{position:i,value:e.convert.call(document.id(t.cells[this.sorted.index]))}},this)},clearSort:function(){this.setHeadSort(!1),this.body.getElements("td").removeClass(this.options.classCellSort)},reSort:function(){return this.sortable&&this.sort.call(this,this.sorted.index,this.sorted.reverse),this},enableSort:function(){return this.element.addClass(this.options.classSortable),this.attachSorts(!0),this.setParsers(),this.sortable=!0,this},disableSort:function(){return this.element.removeClass(this.options.classSortable),this.attachSorts(!1),this.sortSpans.each(function(e){e.destroy()}),this.sortSpans.empty(),this.sortable=!1,this}}),HtmlTable.ParserPriority=["date","input-checked","input-value","float","number"],HtmlTable.Parsers={date:{match:/^\d{2}[-\/ ]\d{2}[-\/ ]\d{2,4}$/,convert:function(){var e=Date.parse(this.get("text").stripTags());return"date"==typeOf(e)?e.format("db"):""},type:"date"},"input-checked":{match:/ type="(radio|checkbox)"/,convert:function(){return this.getElement("input").checked}},"input-value":{match:/<input/,convert:function(){return this.getElement("input").value}},number:{match:/^\d+[^\d.,]*$/,convert:function(){return this.get("text").stripTags().toInt()},number:!0},numberLax:{match:/^[^\d]+\d+$/,convert:function(){return this.get("text").replace(/[^-?^0-9]/,"").stripTags().toInt()},number:!0},float:{match:/^[\d]+\.[\d]+/,convert:function(){return this.get("text").replace(/[^-?^\d.e]/,"").stripTags().toFloat()},number:!0},floatLax:{match:/^[^\d]+[\d]+\.[\d]+$/,convert:function(){return this.get("text").replace(/[^-?^\d.]/,"").stripTags().toFloat()},number:!0},string:{match:null,convert:function(){return this.get("text").stripTags().toLowerCase()}},title:{match:null,convert:function(){return this.title}}},HtmlTable.defineParsers=function(e){HtmlTable.Parsers=Object.append(HtmlTable.Parsers,e);for(var t in e)HtmlTable.ParserPriority.unshift(t)}}(),HtmlTable=Class.refactor(HtmlTable,{options:{classZebra:"table-tr-odd",zebra:!0,zebraOnlyVisibleRows:!0},initialize:function(){if(this.previous.apply(this,arguments),this.occluded)return this.occluded;this.options.zebra&&this.updateZebras()},updateZebras:function(){var e=0;Array.each(this.body.rows,function(t){this.options.zebraOnlyVisibleRows&&!t.isDisplayed()||this.zebra(t,e++)},this)},setRowStyle:function(e,t){this.previous&&this.previous(e,t),this.zebra(e,t)},zebra:function(e,t){return e[(t%2?"remove":"add")+"Class"](this.options.classZebra)},push:function(){var e=this.previous.apply(this,arguments);return this.options.zebra&&this.updateZebras(),e}}),function(){this.Scroller=new Class({Implements:[Events,Options],options:{area:20,velocity:1,onChange:function(e,t){this.element.scrollTo(e,t)},fps:50},initialize:function(e,t){this.setOptions(t),this.element=document.id(e),this.docBody=document.id(this.element.getDocument().body),this.listener="element"!=typeOf(this.element)?this.docBody:this.element,this.timer=null,this.bound={attach:this.attach.bind(this),detach:this.detach.bind(this),getCoords:this.getCoords.bind(this)}},start:function(){return this.listener.addEvents({mouseover:this.bound.attach,mouseleave:this.bound.detach}),this},stop:function(){return this.listener.removeEvents({mouseover:this.bound.attach,mouseleave:this.bound.detach}),this.detach(),this.timer=clearInterval(this.timer),this},attach:function(){this.listener.addEvent("mousemove",this.bound.getCoords)},detach:function(){this.listener.removeEvent("mousemove",this.bound.getCoords),this.timer=clearInterval(this.timer)},getCoords:function(e){this.page="body"==this.listener.get("tag")?e.client:e.page,this.timer||(this.timer=this.scroll.periodical(Math.round(1e3/this.options.fps),this))},scroll:function(){var e=this.element.getSize(),t=this.element.getScroll(),i=this.element!=this.docBody&&this.element!=window?this.element.getOffsets():{x:0,y:0},n=this.element.getScrollSize(),s={x:0,y:0},a=this.options.area.top||this.options.area,r=this.options.area.bottom||this.options.area;for(var o in this.page)this.page[o]<a+i[o]&&0!=t[o]?s[o]=(this.page[o]-a-i[o])*this.options.velocity:this.page[o]+r>e[o]+i[o]&&t[o]+e[o]!=n[o]&&(s[o]=(this.page[o]-e[o]+r-i[o])*this.options.velocity),s[o]=s[o].round();(s.y||s.x)&&this.fireEvent("change",[t.x+s.x,t.y+s.y])}})}(),function(){var e=function(e,t){return e?"function"==typeOf(e)?e(t):t.get(e):""};this.Tips=new Class({Implements:[Events,Options],options:{onShow:function(){this.tip.setStyle("display","block")},onHide:function(){this.tip.setStyle("display","none")},title:"title",text:function(e){return e.get("rel")||e.get("href")},showDelay:100,hideDelay:100,className:"tip-wrap",offset:{x:16,y:16},windowPadding:{x:0,y:0},fixed:!1,waiAria:!0,hideEmpty:!1},initialize:function(){var e=Array.link(arguments,{options:Type.isObject,elements:function(e){return null!=e}});this.setOptions(e.options),e.elements&&this.attach(e.elements),this.container=new Element("div",{class:"tip"}),this.options.id&&(this.container.set("id",this.options.id),this.options.waiAria&&this.attachWaiAria())},toElement:function(){return this.tip?this.tip:(this.tip=new Element("div",{class:this.options.className,styles:{position:"absolute",top:0,left:0,display:"none"}}).adopt(new Element("div",{class:"tip-top"}),this.container,new Element("div",{class:"tip-bottom"})),this.tip)},attachWaiAria:function(){var e=this.options.id;this.container.set("role","tooltip"),this.waiAria||(this.waiAria={show:function(t){e&&t.set("aria-describedby",e),this.container.set("aria-hidden","false")},hide:function(t){e&&t.erase("aria-describedby"),this.container.set("aria-hidden","true")}}),this.addEvents(this.waiAria)},detachWaiAria:function(){this.waiAria&&(this.container.erase("role"),this.container.erase("aria-hidden"),this.removeEvents(this.waiAria))},attach:function(t){return $$(t).each(function(t){var i=e(this.options.title,t),n=e(this.options.text,t);t.set("title","").store("tip:native",i).retrieve("tip:title",i),t.retrieve("tip:text",n),this.fireEvent("attach",[t]);var s=["enter","leave"];this.options.fixed||s.push("move"),s.each(function(e){var i=t.retrieve("tip:"+e);i||(i=function(i){this["element"+e.capitalize()].apply(this,[i,t])}.bind(this)),t.store("tip:"+e,i).addEvent("mouse"+e,i)},this)},this),this},detach:function(e){return $$(e).each(function(e){if(["enter","leave","move"].each(function(t){e.removeEvent("mouse"+t,e.retrieve("tip:"+t)).eliminate("tip:"+t)}),this.fireEvent("detach",[e]),"title"==this.options.title){var t=e.retrieve("tip:native");t&&e.set("title",t)}},this),this},elementEnter:function(e,t){clearTimeout(this.timer),this.timer=function(){this.container.empty();var i=!this.options.hideEmpty;["title","text"].each(function(e){var n=t.retrieve("tip:"+e),s=this["_"+e+"Element"]=new Element("div",{class:"tip-"+e}).inject(this.container);n&&(this.fill(s,n),i=!0)},this),i?this.show(t):this.hide(t),this.position(this.options.fixed?{page:t.getPosition()}:e)}.delay(this.options.showDelay,this)},elementLeave:function(e,t){clearTimeout(this.timer),this.timer=this.hide.delay(this.options.hideDelay,this,t),this.fireForParent(e,t)},setTitle:function(e){return this._titleElement&&(this._titleElement.empty(),this.fill(this._titleElement,e)),this},setText:function(e){return this._textElement&&(this._textElement.empty(),this.fill(this._textElement,e)),this},fireForParent:function(e,t){(t=t.getParent())&&t!=document.body&&(t.retrieve("tip:enter")?t.fireEvent("mouseenter",e):this.fireForParent(e,t))},elementMove:function(e,t){this.position(e)},position:function(e){this.tip||document.id(this);var t=window.getSize(),i=window.getScroll(),n={x:this.tip.offsetWidth,y:this.tip.offsetHeight},s={x:"left",y:"top"},a={y:!1,x2:!1,y2:!1,x:!1},r={};for(var o in s)r[s[o]]=e.page[o]+this.options.offset[o],r[s[o]]<0&&(a[o]=!0),r[s[o]]+n[o]-i[o]>t[o]-this.options.windowPadding[o]&&(r[s[o]]=e.page[o]-this.options.offset[o]-n[o],a[o+"2"]=!0);this.fireEvent("bound",a),this.tip.setStyles(r)},fill:function(e,t){"string"==typeof t?e.set("html",t):e.adopt(t)},show:function(e){this.tip||document.id(this),this.tip.getParent()||this.tip.inject(document.body),this.fireEvent("show",[this.tip,e])},hide:function(e){this.tip||document.id(this),this.fireEvent("hide",[this.tip,e])}})}(),Locale.define("CH","Number",{decimal:",",group:"'",currency:{decimal:".",suffix:" CHF"}}),Locale.define("EU","Number",{decimal:",",group:".",currency:{prefix:"€ "}}),function(){var e={json:JSON.decode};Locale.Set.defineParser=function(t,i){e[t]=i},Locale.Set.from=function(t,i){if(instanceOf(t,Locale.Set))return t;i||"string"!=typeOf(t)||(i="json"),e[i]&&(t=e[i](t));var n=new Locale.Set;return n.sets=t.sets||{},t.inherits&&(n.inherits.locales=Array.convert(t.inherits.locales),n.inherits.sets=t.inherits.sets||{}),n}}(),Locale.define("ZA","Number",{decimal:".",group:",",currency:{prefix:"R "}}),Locale.define("af-ZA","Date",{months:["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember"],months_abbr:["Jan","Feb","Mrt","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Des"],days:["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"],days_abbr:["Son","Maa","Din","Woe","Don","Vry","Sat"],dateOrder:["date","month","year"],shortDate:"%d-%m-%Y",shortTime:"%H:%M",AM:"VM",PM:"NM",firstDayOfWeek:1,ordinal:function(e){return e>1&&e<20&&8!=e||e>100&&"1"==e.toString().substr(-2,1)?"de":"ste"},lessThanMinuteAgo:"minder as 'n minuut gelede",minuteAgo:"ongeveer 'n minuut gelede",minutesAgo:"{delta} minute gelede",hourAgo:"omtret 'n uur gelede",hoursAgo:"ongeveer {delta} ure gelede",dayAgo:"1 dag gelede",daysAgo:"{delta} dae gelede",weekAgo:"1 week gelede",weeksAgo:"{delta} weke gelede",monthAgo:"1 maand gelede",monthsAgo:"{delta} maande gelede",yearAgo:"1 jaar gelede",yearsAgo:"{delta} jare gelede",lessThanMinuteUntil:"oor minder as 'n minuut",minuteUntil:"oor ongeveer 'n minuut",minutesUntil:"oor {delta} minute",hourUntil:"oor ongeveer 'n uur",hoursUntil:"oor {delta} uur",dayUntil:"oor ongeveer 'n dag",daysUntil:"oor {delta} dae",weekUntil:"oor 'n week",weeksUntil:"oor {delta} weke",monthUntil:"oor 'n maand",monthsUntil:"oor {delta} maande",yearUntil:"oor 'n jaar",yearsUntil:"oor {delta} jaar"}),Locale.define("af-ZA","FormValidator",{required:"Hierdie veld word vereis.",length:"Voer asseblief {length} karakters in (u het {elLength} karakters ingevoer)",minLength:"Voer asseblief ten minste {minLength} karakters in (u het {length} karakters ingevoer).",maxLength:"Moet asseblief nie meer as {maxLength} karakters invoer nie (u het {length} karakters ingevoer).",integer:"Voer asseblief 'n heelgetal in hierdie veld in. Getalle met desimale (bv. 1.25) word nie toegelaat nie.",numeric:'Voer asseblief slegs numeriese waardes in hierdie veld in (bv. "1" of "1.1" of "-1" of "-1.1").',digits:"Gebruik asseblief slegs nommers en punktuasie in hierdie veld. (by voorbeeld, 'n telefoon nommer wat koppeltekens en punte bevat is toelaatbaar).",alpha:"Gebruik asseblief slegs letters (a-z) binne-in hierdie veld. Geen spasies of ander karakters word toegelaat nie.",alphanum:"Gebruik asseblief slegs letters (a-z) en nommers (0-9) binne-in hierdie veld. Geen spasies of ander karakters word toegelaat nie.",dateSuchAs:"Voer asseblief 'n geldige datum soos {date} in",dateInFormatMDY:'Voer asseblief \'n geldige datum soos MM/DD/YYYY in (bv. "12/31/1999")',email:'Voer asseblief \'n geldige e-pos adres in. Byvoorbeeld "fred@domain.com".',url:"Voer asseblief 'n geldige bronadres (URL) soos http://www.example.com in.",currencyDollar:"Voer asseblief 'n geldige $ bedrag in. Byvoorbeeld $100.00 .",
oneRequired:"Voer asseblief iets in vir ten minste een van hierdie velde.",errorPrefix:"Fout: ",warningPrefix:"Waarskuwing: ",noSpace:"Daar mag geen spasies in hierdie toevoer wees nie.",reqChkByNode:"Geen items is gekies nie.",requiredChk:"Hierdie veld word vereis.",reqChkByName:"Kies asseblief 'n {label}.",match:"Hierdie veld moet by die {matchName} veld pas",startDate:"die begin datum",endDate:"die eind datum",currentDate:"die huidige datum",afterDate:"Die datum moet dieselfde of na {label} wees.",beforeDate:"Die datum moet dieselfde of voor {label} wees.",startMonth:"Kies asseblief 'n begin maand",sameMonth:"Hierdie twee datums moet in dieselfde maand wees - u moet een of beide verander.",creditcard:"Die ingevoerde kredietkaart nommer is ongeldig. Bevestig asseblief die nommer en probeer weer. {length} syfers is ingevoer."}),Locale.define("af-ZA").inherit("ZA","Number"),Locale.define("ar","Date",{dateOrder:["date","month","year"],shortDate:"%d/%m/%Y",shortTime:"%H:%M"}),Locale.define("ar","FormValidator",{required:"هذا الحقل مطلوب.",minLength:"رجاءً إدخال {minLength} أحرف على الأقل (تم إدخال {length} أحرف).",maxLength:"الرجاء عدم إدخال أكثر من {maxLength} أحرف (تم إدخال {length} أحرف).",integer:"الرجاء إدخال عدد صحيح في هذا الحقل. أي رقم ذو كسر عشري أو مئوي (مثال 1.25 ) غير مسموح.",numeric:'الرجاء إدخال قيم رقمية في هذا الحقل (مثال "1" أو "1.1" أو "-1" أو "-1.1").',digits:"الرجاء أستخدام قيم رقمية وعلامات ترقيمية فقط في هذا الحقل (مثال, رقم هاتف مع نقطة أو شحطة)",alpha:"الرجاء أستخدام أحرف فقط (ا-ي) في هذا الحقل. أي فراغات أو علامات غير مسموحة.",alphanum:"الرجاء أستخدام أحرف فقط (ا-ي) أو أرقام (0-9) فقط في هذا الحقل. أي فراغات أو علامات غير مسموحة.",dateSuchAs:"الرجاء إدخال تاريخ صحيح كالتالي {date}",dateInFormatMDY:"الرجاء إدخال تاريخ صحيح (مثال, 31-12-1999)",email:"الرجاء إدخال بريد إلكتروني صحيح.",url:"الرجاء إدخال عنوان إلكتروني صحيح مثل http://www.example.com",currencyDollar:"الرجاء إدخال قيمة $ صحيحة. مثال, 100.00$",oneRequired:"الرجاء إدخال قيمة في أحد هذه الحقول على الأقل.",errorPrefix:"خطأ: ",warningPrefix:"تحذير: "}),Locale.define("ca-CA","Date",{months:["Gener","Febrer","Març","Abril","Maig","Juny","Juli","Agost","Setembre","Octubre","Novembre","Desembre"],months_abbr:["gen.","febr.","març","abr.","maig","juny","jul.","ag.","set.","oct.","nov.","des."],days:["Diumenge","Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte"],days_abbr:["dg","dl","dt","dc","dj","dv","ds"],dateOrder:["date","month","year"],shortDate:"%d/%m/%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:0,ordinal:"",lessThanMinuteAgo:"fa menys d`un minut",minuteAgo:"fa un minut",minutesAgo:"fa {delta} minuts",hourAgo:"fa un hora",hoursAgo:"fa unes {delta} hores",dayAgo:"fa un dia",daysAgo:"fa {delta} dies",lessThanMinuteUntil:"menys d`un minut des d`ara",minuteUntil:"un minut des d`ara",minutesUntil:"{delta} minuts des d`ara",hourUntil:"un hora des d`ara",hoursUntil:"unes {delta} hores des d`ara",dayUntil:"1 dia des d`ara",daysUntil:"{delta} dies des d`ara"}),Locale.define("ca-CA","FormValidator",{required:"Aquest camp es obligatori.",minLength:"Per favor introdueix al menys {minLength} caracters (has introduit {length} caracters).",maxLength:"Per favor introdueix no mes de {maxLength} caracters (has introduit {length} caracters).",integer:"Per favor introdueix un nombre enter en aquest camp. Nombres amb decimals (p.e. 1,25) no estan permesos.",numeric:'Per favor introdueix sols valors numerics en aquest camp (p.e. "1" o "1,1" o "-1" o "-1,1").',digits:"Per favor usa sols numeros i puntuacio en aquest camp (per exemple, un nombre de telefon amb guions i punts no esta permes).",alpha:"Per favor utilitza lletres nomes (a-z) en aquest camp. No s´admiteixen espais ni altres caracters.",alphanum:"Per favor, utilitza nomes lletres (a-z) o numeros (0-9) en aquest camp. No s´admiteixen espais ni altres caracters.",dateSuchAs:"Per favor introdueix una data valida com {date}",dateInFormatMDY:'Per favor introdueix una data valida com DD/MM/YYYY (p.e. "31/12/1999")',email:'Per favor, introdueix una adreça de correu electronic valida. Per exemple, "fred@domain.com".',url:"Per favor introdueix una URL valida com http://www.example.com.",currencyDollar:"Per favor introdueix una quantitat valida de €. Per exemple €100,00 .",oneRequired:"Per favor introdueix alguna cosa per al menys una d´aquestes entrades.",errorPrefix:"Error: ",warningPrefix:"Avis: ",noSpace:"No poden haver espais en aquesta entrada.",reqChkByNode:"No hi han elements seleccionats.",requiredChk:"Aquest camp es obligatori.",reqChkByName:"Per favor selecciona una {label}.",match:"Aquest camp necessita coincidir amb el camp {matchName}",startDate:"la data de inici",endDate:"la data de fi",currentDate:"la data actual",afterDate:"La data deu ser igual o posterior a {label}.",beforeDate:"La data deu ser igual o anterior a {label}.",startMonth:"Per favor selecciona un mes d´orige",sameMonth:"Aquestes dos dates deuen estar dins del mateix mes - deus canviar una o altra."}),function(){var e=function(e,t,i,n){return 1==e?t:2==e||3==e||4==e?i:n};Locale.define("cs-CZ","Date",{months:["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"],months_abbr:["ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince"],days:["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"],days_abbr:["ne","po","út","st","čt","pá","so"],dateOrder:["date","month","year"],shortDate:"%d.%m.%Y",shortTime:"%H:%M",AM:"dop.",PM:"odp.",firstDayOfWeek:1,ordinal:".",lessThanMinuteAgo:"před chvílí",minuteAgo:"přibližně před minutou",minutesAgo:function(t){return"před {delta} "+e(t,"minutou","minutami","minutami")},hourAgo:"přibližně před hodinou",hoursAgo:function(t){return"před {delta} "+e(t,"hodinou","hodinami","hodinami")},dayAgo:"před dnem",daysAgo:function(t){return"před {delta} "+e(t,"dnem","dny","dny")},weekAgo:"před týdnem",weeksAgo:function(t){return"před {delta} "+e(t,"týdnem","týdny","týdny")},monthAgo:"před měsícem",monthsAgo:function(t){return"před {delta} "+e(t,"měsícem","měsíci","měsíci")},yearAgo:"před rokem",yearsAgo:function(t){return"před {delta} "+e(t,"rokem","lety","lety")},lessThanMinuteUntil:"za chvíli",minuteUntil:"přibližně za minutu",minutesUntil:function(t){return"za {delta} "+e(t,"minutu","minuty","minut")},hourUntil:"přibližně za hodinu",hoursUntil:function(t){return"za {delta} "+e(t,"hodinu","hodiny","hodin")},dayUntil:"za den",daysUntil:function(t){return"za {delta} "+e(t,"den","dny","dnů")},weekUntil:"za týden",weeksUntil:function(t){return"za {delta} "+e(t,"týden","týdny","týdnů")},monthUntil:"za měsíc",monthsUntil:function(t){return"za {delta} "+e(t,"měsíc","měsíce","měsíců")},yearUntil:"za rok",yearsUntil:function(t){return"za {delta} "+e(t,"rok","roky","let")}})}(),Locale.define("cs-CZ","FormValidator",{required:"Tato položka je povinná.",minLength:"Zadejte prosím alespoň {minLength} znaků (napsáno {length} znaků).",maxLength:"Zadejte prosím méně než {maxLength} znaků (nápsáno {length} znaků).",integer:"Zadejte prosím celé číslo. Desetinná čísla (např. 1.25) nejsou povolena.",numeric:'Zadejte jen číselné hodnoty (tj. "1" nebo "1.1" nebo "-1" nebo "-1.1").',digits:"Zadejte prosím pouze čísla a interpunkční znaménka(například telefonní číslo s pomlčkami nebo tečkami je povoleno).",alpha:"Zadejte prosím pouze písmena (a-z). Mezery nebo jiné znaky nejsou povoleny.",alphanum:"Zadejte prosím pouze písmena (a-z) nebo číslice (0-9). Mezery nebo jiné znaky nejsou povoleny.",dateSuchAs:"Zadejte prosím platné datum jako {date}",dateInFormatMDY:'Zadejte prosím platné datum jako MM / DD / RRRR (tj. "12/31/1999")',email:'Zadejte prosím platnou e-mailovou adresu. Například "fred@domain.com".',url:"Zadejte prosím platnou URL adresu jako http://www.example.com.",currencyDollar:"Zadejte prosím platnou částku. Například $100.00.",oneRequired:"Zadejte prosím alespoň jednu hodnotu pro tyto položky.",errorPrefix:"Chyba: ",warningPrefix:"Upozornění: ",noSpace:"V této položce nejsou povoleny mezery",reqChkByNode:"Nejsou vybrány žádné položky.",requiredChk:"Tato položka je vyžadována.",reqChkByName:"Prosím vyberte {label}.",match:"Tato položka se musí shodovat s položkou {matchName}",startDate:"datum zahájení",endDate:"datum ukončení",currentDate:"aktuální datum",afterDate:"Datum by mělo být stejné nebo větší než {label}.",beforeDate:"Datum by mělo být stejné nebo menší než {label}.",startMonth:"Vyberte počáteční měsíc.",sameMonth:"Tyto dva datumy musí být ve stejném měsíci - změňte jeden z nich.",creditcard:"Zadané číslo kreditní karty je neplatné. Prosím opravte ho. Bylo zadáno {length} čísel."}),Locale.define("da-DK","Date",{months:["Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","Oktober","November","December"],months_abbr:["jan.","feb.","mar.","apr.","maj.","jun.","jul.","aug.","sep.","okt.","nov.","dec."],days:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"],days_abbr:["søn","man","tir","ons","tor","fre","lør"],dateOrder:["date","month","year"],shortDate:"%d-%m-%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:".",lessThanMinuteAgo:"mindre end et minut siden",minuteAgo:"omkring et minut siden",minutesAgo:"{delta} minutter siden",hourAgo:"omkring en time siden",hoursAgo:"omkring {delta} timer siden",dayAgo:"1 dag siden",daysAgo:"{delta} dage siden",weekAgo:"1 uge siden",weeksAgo:"{delta} uger siden",monthAgo:"1 måned siden",monthsAgo:"{delta} måneder siden",yearAgo:"1 år siden",yearsAgo:"{delta} år siden",lessThanMinuteUntil:"mindre end et minut fra nu",minuteUntil:"omkring et minut fra nu",minutesUntil:"{delta} minutter fra nu",hourUntil:"omkring en time fra nu",hoursUntil:"omkring {delta} timer fra nu",dayUntil:"1 dag fra nu",daysUntil:"{delta} dage fra nu",weekUntil:"1 uge fra nu",weeksUntil:"{delta} uger fra nu",monthUntil:"1 måned fra nu",monthsUntil:"{delta} måneder fra nu",yearUntil:"1 år fra nu",yearsUntil:"{delta} år fra nu"}),Locale.define("da-DK","FormValidator",{required:"Feltet skal udfyldes.",minLength:"Skriv mindst {minLength} tegn (du skrev {length} tegn).",maxLength:"Skriv maksimalt {maxLength} tegn (du skrev {length} tegn).",integer:"Skriv et tal i dette felt. Decimal tal (f.eks. 1.25) er ikke tilladt.",numeric:'Skriv kun tal i dette felt (i.e. "1" eller "1.1" eller "-1" eller "-1.1").',digits:"Skriv kun tal og tegnsætning i dette felt (eksempel, et telefon nummer med bindestreg eller punktum er tilladt).",alpha:"Skriv kun bogstaver (a-z) i dette felt. Mellemrum og andre tegn er ikke tilladt.",alphanum:"Skriv kun bogstaver (a-z) eller tal (0-9) i dette felt. Mellemrum og andre tegn er ikke tilladt.",dateSuchAs:"Skriv en gyldig dato som {date}",dateInFormatMDY:'Skriv dato i formatet DD-MM-YYYY (f.eks. "31-12-1999")',email:'Skriv en gyldig e-mail adresse. F.eks "fred@domain.com".',url:'Skriv en gyldig URL adresse. F.eks "http://www.example.com".',currencyDollar:"Skriv et gldigt beløb. F.eks Kr.100.00 .",oneRequired:"Et eller flere af felterne i denne formular skal udfyldes.",errorPrefix:"Fejl: ",warningPrefix:"Advarsel: ",noSpace:"Der må ikke benyttes mellemrum i dette felt.",reqChkByNode:"Foretag et valg.",requiredChk:"Dette felt skal udfyldes.",reqChkByName:"Vælg en {label}.",match:"Dette felt skal matche {matchName} feltet",startDate:"start dato",endDate:"slut dato",currentDate:"dags dato",afterDate:"Datoen skal være større end eller lig med {label}.",beforeDate:"Datoen skal være mindre end eller lig med {label}.",startMonth:"Vælg en start måned",sameMonth:"De valgte datoer skal være i samme måned - skift en af dem."}),Locale.define("de-DE","Date",{months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],months_abbr:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],days:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],days_abbr:["So","Mo","Di","Mi","Do","Fr","Sa"],dateOrder:["date","month","year"],shortDate:"%d.%m.%Y",shortTime:"%H:%M",AM:"vormittags",PM:"nachmittags",firstDayOfWeek:1,ordinal:".",lessThanMinuteAgo:"vor weniger als einer Minute",minuteAgo:"vor einer Minute",minutesAgo:"vor {delta} Minuten",hourAgo:"vor einer Stunde",hoursAgo:"vor {delta} Stunden",dayAgo:"vor einem Tag",daysAgo:"vor {delta} Tagen",weekAgo:"vor einer Woche",weeksAgo:"vor {delta} Wochen",monthAgo:"vor einem Monat",monthsAgo:"vor {delta} Monaten",yearAgo:"vor einem Jahr",yearsAgo:"vor {delta} Jahren",lessThanMinuteUntil:"in weniger als einer Minute",minuteUntil:"in einer Minute",minutesUntil:"in {delta} Minuten",hourUntil:"in ca. einer Stunde",hoursUntil:"in ca. {delta} Stunden",dayUntil:"in einem Tag",daysUntil:"in {delta} Tagen",weekUntil:"in einer Woche",weeksUntil:"in {delta} Wochen",monthUntil:"in einem Monat",monthsUntil:"in {delta} Monaten",yearUntil:"in einem Jahr",yearsUntil:"in {delta} Jahren"}),Locale.define("de-CH").inherit("de-DE","Date"),Locale.define("de-CH","FormValidator",{required:"Dieses Feld ist obligatorisch.",minLength:"Geben Sie bitte mindestens {minLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).",maxLength:"Bitte geben Sie nicht mehr als {maxLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).",integer:"Geben Sie bitte eine ganze Zahl ein. Dezimalzahlen (z.B. 1.25) sind nicht erlaubt.",numeric:"Geben Sie bitte nur Zahlenwerte in dieses Eingabefeld ein (z.B. &quot;1&quot;, &quot;1.1&quot;, &quot;-1&quot; oder &quot;-1.1&quot;).",digits:"Benutzen Sie bitte nur Zahlen und Satzzeichen in diesem Eingabefeld (erlaubt ist z.B. eine Telefonnummer mit Bindestrichen und Punkten).",alpha:"Benutzen Sie bitte nur Buchstaben (a-z) in diesem Feld. Leerzeichen und andere Zeichen sind nicht erlaubt.",alphanum:"Benutzen Sie bitte nur Buchstaben (a-z) und Zahlen (0-9) in diesem Eingabefeld. Leerzeichen und andere Zeichen sind nicht erlaubt.",dateSuchAs:"Geben Sie bitte ein g&uuml;ltiges Datum ein. Wie zum Beispiel {date}",dateInFormatMDY:"Geben Sie bitte ein g&uuml;ltiges Datum ein. Wie zum Beispiel TT.MM.JJJJ (z.B. &quot;31.12.1999&quot;)",email:"Geben Sie bitte eine g&uuml;ltige E-Mail Adresse ein. Wie zum Beispiel &quot;maria@bernasconi.ch&quot;.",url:"Geben Sie bitte eine g&uuml;ltige URL ein. Wie zum Beispiel http://www.example.com.",currencyDollar:"Geben Sie bitte einen g&uuml;ltigen Betrag in Schweizer Franken ein. Wie zum Beispiel 100.00 CHF .",oneRequired:"Machen Sie f&uuml;r mindestens eines der Eingabefelder einen Eintrag.",errorPrefix:"Fehler: ",warningPrefix:"Warnung: ",noSpace:"In diesem Eingabefeld darf kein Leerzeichen sein.",reqChkByNode:"Es wurden keine Elemente gew&auml;hlt.",requiredChk:"Dieses Feld ist obligatorisch.",reqChkByName:"Bitte w&auml;hlen Sie ein {label}.",match:"Dieses Eingabefeld muss mit dem Feld {matchName} &uuml;bereinstimmen.",startDate:"Das Anfangsdatum",endDate:"Das Enddatum",currentDate:"Das aktuelle Datum",afterDate:"Das Datum sollte zur gleichen Zeit oder sp&auml;ter sein {label}.",beforeDate:"Das Datum sollte zur gleichen Zeit oder fr&uuml;her sein {label}.",startMonth:"W&auml;hlen Sie bitte einen Anfangsmonat",sameMonth:"Diese zwei Datumsangaben m&uuml;ssen im selben Monat sein - Sie m&uuml;ssen eine von beiden ver&auml;ndern.",creditcard:"Die eingegebene Kreditkartennummer ist ung&uuml;ltig. Bitte &uuml;berpr&uuml;fen Sie diese und versuchen Sie es erneut. {length} Zahlen eingegeben."}),Locale.define("de-CH").inherit("CH","Number"),Locale.define("de-DE","FormValidator",{required:"Dieses Eingabefeld muss ausgefüllt werden.",minLength:"Geben Sie bitte mindestens {minLength} Zeichen ein (Sie haben nur {length} Zeichen eingegeben).",maxLength:"Geben Sie bitte nicht mehr als {maxLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).",integer:'Geben Sie in diesem Eingabefeld bitte eine ganze Zahl ein. Dezimalzahlen (z.B. "1.25") sind nicht erlaubt.',numeric:'Geben Sie in diesem Eingabefeld bitte nur Zahlenwerte (z.B. "1", "1.1", "-1" oder "-1.1") ein.',digits:"Geben Sie in diesem Eingabefeld bitte nur Zahlen und Satzzeichen ein (z.B. eine Telefonnummer mit Bindestrichen und Punkten ist erlaubt).",alpha:"Geben Sie in diesem Eingabefeld bitte nur Buchstaben (a-z) ein. Leerzeichen und andere Zeichen sind nicht erlaubt.",alphanum:"Geben Sie in diesem Eingabefeld bitte nur Buchstaben (a-z) und Zahlen (0-9) ein. Leerzeichen oder andere Zeichen sind nicht erlaubt.",dateSuchAs:'Geben Sie bitte ein gültiges Datum ein (z.B. "{date}").',dateInFormatMDY:'Geben Sie bitte ein gültiges Datum im Format TT.MM.JJJJ ein (z.B. "31.12.1999").',email:'Geben Sie bitte eine gültige E-Mail-Adresse ein (z.B. "max@mustermann.de").',url:'Geben Sie bitte eine gültige URL ein (z.B. "http://www.example.com").',currencyDollar:"Geben Sie bitte einen gültigen Betrag in EURO ein (z.B. 100.00€).",oneRequired:"Bitte füllen Sie mindestens ein Eingabefeld aus.",errorPrefix:"Fehler: ",warningPrefix:"Warnung: ",noSpace:"Es darf kein Leerzeichen in diesem Eingabefeld sein.",reqChkByNode:"Es wurden keine Elemente gewählt.",requiredChk:"Dieses Feld muss ausgefüllt werden.",reqChkByName:"Bitte wählen Sie ein {label}.",match:"Dieses Eingabefeld muss mit dem {matchName} Eingabefeld übereinstimmen.",startDate:"Das Anfangsdatum",endDate:"Das Enddatum",currentDate:"Das aktuelle Datum",afterDate:"Das Datum sollte zur gleichen Zeit oder später sein als {label}.",beforeDate:"Das Datum sollte zur gleichen Zeit oder früher sein als {label}.",startMonth:"Wählen Sie bitte einen Anfangsmonat",sameMonth:"Diese zwei Datumsangaben müssen im selben Monat sein - Sie müssen eines von beiden verändern.",creditcard:"Die eingegebene Kreditkartennummer ist ungültig. Bitte überprüfen Sie diese und versuchen Sie es erneut. {length} Zahlen eingegeben."}),Locale.define("de-DE").inherit("EU","Number"),Locale.define("el-GR","Date",{months:["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"],months_abbr:["Ιαν","Φεβ","Μαρ","Απρ","Μάι","Ιουν","Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ"],days:["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"],days_abbr:["Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ"],dateOrder:["date","month","year"],shortDate:"%d/%m/%Y",shortTime:"%I:%M%p",AM:"πμ",PM:"μμ",firstDayOfWeek:1,ordinal:function(e){return e>3&&e<21?"ος":["ος"][Math.min(e%10,4)]},lessThanMinuteAgo:"λιγότερο από ένα λεπτό πριν",minuteAgo:"περίπου ένα λεπτό πριν",minutesAgo:"{delta} λεπτά πριν",hourAgo:"περίπου μια ώρα πριν",hoursAgo:"περίπου {delta} ώρες πριν",dayAgo:"1 ημέρα πριν",daysAgo:"{delta} ημέρες πριν",weekAgo:"1 εβδομάδα πριν",weeksAgo:"{delta} εβδομάδες πριν",monthAgo:"1 μήνα πριν",monthsAgo:"{delta} μήνες πριν",yearAgo:"1 χρόνο πριν",yearsAgo:"{delta} χρόνια πριν",lessThanMinuteUntil:"λιγότερο από λεπτό από τώρα",minuteUntil:"περίπου ένα λεπτό από τώρα",minutesUntil:"{delta} λεπτά από τώρα",hourUntil:"περίπου μια ώρα από τώρα",hoursUntil:"περίπου {delta} ώρες από τώρα",dayUntil:"1 ημέρα από τώρα",daysUntil:"{delta} ημέρες από τώρα",weekUntil:"1 εβδομάδα από τώρα",weeksUntil:"{delta} εβδομάδες από τώρα",monthUntil:"1 μήνας από τώρα",monthsUntil:"{delta} μήνες από τώρα",yearUntil:"1 χρόνος από τώρα",yearsUntil:"{delta} χρόνια από τώρα"}),Locale.define("el-GR","FormValidator",{required:"Αυτό το πεδίο είναι απαραίτητο.",length:"Παρακαλούμε, εισάγετε {length} χαρακτήρες (έχετε ήδη εισάγει {elLength} χαρακτήρες).",minLength:"Παρακαλούμε, εισάγετε τουλάχιστον {minLength} χαρακτήρες (έχετε ήδη εισάγε {length} χαρακτήρες).",maxlength:"Παρακαλούμε, εισάγετε εώς {maxlength} χαρακτήρες (έχετε ήδη εισάγε {length} χαρακτήρες).",integer:"Παρακαλούμε, εισάγετε έναν ακέραιο αριθμό σε αυτό το πεδίο. Οι αριθμοί με δεκαδικά ψηφία (π.χ. 1.25) δεν επιτρέπονται.",numeric:'Παρακαλούμε, εισάγετε μόνο αριθμητικές τιμές σε αυτό το πεδίο (π.χ." 1 " ή " 1.1 " ή " -1 " ή " -1.1 " ).',digits:"Παρακαλούμε, χρησιμοποιήστε μόνο αριθμούς και σημεία στίξης σε αυτόν τον τομέα (π.χ. επιτρέπεται αριθμός τηλεφώνου με παύλες ή τελείες).",alpha:"Παρακαλούμε, χρησιμοποιήστε μόνο γράμματα (a-z) σε αυτό το πεδίο. Δεν επιτρέπονται κενά ή άλλοι χαρακτήρες.",alphanum:"Παρακαλούμε, χρησιμοποιήστε μόνο γράμματα (a-z) ή αριθμούς (0-9) σε αυτόν τον τομέα. Δεν επιτρέπονται κενά ή άλλοι χαρακτήρες.",dateSuchAs:"Παρακαλούμε, εισάγετε μια έγκυρη ημερομηνία, όπως {date}",dateInFormatMDY:'Παρακαλώ εισάγετε μια έγκυρη ημερομηνία, όπως ΜΜ/ΗΗ/ΕΕΕΕ (π.χ. "12/31/1999").',email:'Παρακαλούμε, εισάγετε μια έγκυρη διεύθυνση ηλεκτρονικού ταχυδρομείου (π.χ. "fred@domain.com").',url:"Παρακαλούμε, εισάγετε μια έγκυρη URL διεύθυνση, όπως http://www.example.com",currencyDollar:"Παρακαλούμε, εισάγετε ένα έγκυρο ποσό σε δολλάρια (π.χ. $100.00).",oneRequired:"Παρακαλούμε, εισάγετε κάτι για τουλάχιστον ένα από αυτά τα πεδία.",errorPrefix:"Σφάλμα: ",warningPrefix:"Προσοχή: ",noSpace:"Δεν επιτρέπονται τα κενά σε αυτό το πεδίο.",reqChkByNode:"Δεν έχει επιλεγεί κάποιο αντικείμενο",requiredChk:"Αυτό το πεδίο είναι απαραίτητο.",reqChkByName:"Παρακαλούμε, επιλέξτε μια ετικέτα {label}.",match:"Αυτό το πεδίο πρέπει να ταιριάζει με το πεδίο {matchName}.",startDate:"η ημερομηνία έναρξης",endDate:"η ημερομηνία λήξης",currentDate:"η τρέχουσα ημερομηνία",afterDate:"Η ημερομηνία πρέπει να είναι η ίδια ή μετά από την {label}.",beforeDate:"Η ημερομηνία πρέπει να είναι η ίδια ή πριν από την {label}.",startMonth:"Παρακαλώ επιλέξτε ένα μήνα αρχής.",sameMonth:"Αυτές οι δύο ημερομηνίες πρέπει να έχουν τον ίδιο μήνα - θα πρέπει να αλλάξετε ή το ένα ή το άλλο",creditcard:"Ο αριθμός της πιστωτικής κάρτας δεν είναι έγκυρος. Παρακαλούμε ελέγξτε τον αριθμό και δοκιμάστε ξανά. {length} μήκος ψηφίων."}),Locale.define("en-GB","Date",{dateOrder:["date","month","year"],shortDate:"%d/%m/%Y",shortTime:"%H:%M"}).inherit("en-US","Date"),Locale.define("en-US","Number",{decimal:".",group:",",currency:{prefix:"$ "}}),Locale.define("es-ES","Date",{months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],months_abbr:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],days:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],days_abbr:["dom","lun","mar","mié","juv","vie","sáb"],dateOrder:["date","month","year"],shortDate:"%d/%m/%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:"",lessThanMinuteAgo:"hace menos de un minuto",minuteAgo:"hace un minuto",minutesAgo:"hace {delta} minutos",hourAgo:"hace una hora",hoursAgo:"hace unas {delta} horas",dayAgo:"hace un día",daysAgo:"hace {delta} días",weekAgo:"hace una semana",weeksAgo:"hace unas {delta} semanas",monthAgo:"hace un mes",monthsAgo:"hace {delta} meses",yearAgo:"hace un año",yearsAgo:"hace {delta} años",lessThanMinuteUntil:"menos de un minuto desde ahora",minuteUntil:"un minuto desde ahora",minutesUntil:"{delta} minutos desde ahora",hourUntil:"una hora desde ahora",hoursUntil:"unas {delta} horas desde ahora",dayUntil:"un día desde ahora",daysUntil:"{delta} días desde ahora",weekUntil:"una semana desde ahora",weeksUntil:"unas {delta} semanas desde ahora",monthUntil:"un mes desde ahora",monthsUntil:"{delta} meses desde ahora",yearUntil:"un año desde ahora",yearsUntil:"{delta} años desde ahora"}),Locale.define("es-AR").inherit("es-ES","Date"),Locale.define("es-AR","FormValidator",{required:"Este campo es obligatorio.",minLength:"Por favor ingrese al menos {minLength} caracteres (ha ingresado {length} caracteres).",maxLength:"Por favor no ingrese más de {maxLength} caracteres (ha ingresado {length} caracteres).",integer:"Por favor ingrese un número entero en este campo. Números con decimales (p.e. 1,25) no se permiten.",numeric:'Por favor ingrese solo valores numéricos en este campo (p.e. "1" o "1,1" o "-1" o "-1,1").',digits:"Por favor use sólo números y puntuación en este campo (por ejemplo, un número de teléfono con guiones y/o puntos no está permitido).",alpha:"Por favor use sólo letras (a-z) en este campo. No se permiten espacios ni otros caracteres.",alphanum:"Por favor, usa sólo letras (a-z) o números (0-9) en este campo. No se permiten espacios u otros caracteres.",dateSuchAs:"Por favor ingrese una fecha válida como {date}",dateInFormatMDY:'Por favor ingrese una fecha válida, utulizando el formato DD/MM/YYYY (p.e. "31/12/1999")',email:'Por favor, ingrese una dirección de e-mail válida. Por ejemplo, "fred@dominio.com".',url:"Por favor ingrese una URL válida como http://www.example.com.",currencyDollar:"Por favor ingrese una cantidad válida de pesos. Por ejemplo $100,00 .",oneRequired:"Por favor ingrese algo para por lo menos una de estas entradas.",errorPrefix:"Error: ",warningPrefix:"Advertencia: ",noSpace:"No se permiten espacios en este campo.",reqChkByNode:"No hay elementos seleccionados.",requiredChk:"Este campo es obligatorio.",reqChkByName:"Por favor selecciona una {label}.",match:"Este campo necesita coincidir con el campo {matchName}",startDate:"la fecha de inicio",endDate:"la fecha de fin",currentDate:"la fecha actual",afterDate:"La fecha debe ser igual o posterior a {label}.",beforeDate:"La fecha debe ser igual o anterior a {label}.",startMonth:"Por favor selecciona un mes de origen",sameMonth:"Estas dos fechas deben estar en el mismo mes - debes cambiar una u otra."}),Locale.define("es-AR","Number",{decimal:",",group:".",currency:{decimals:2,prefix:"$ "}}),Locale.define("es-ES","FormValidator",{required:"Este campo es obligatorio.",minLength:"Por favor introduce al menos {minLength} caracteres (has introducido {length} caracteres).",maxLength:"Por favor introduce no m&aacute;s de {maxLength} caracteres (has introducido {length} caracteres).",integer:"Por favor introduce un n&uacute;mero entero en este campo. N&uacute;meros con decimales (p.e. 1,25) no se permiten.",numeric:'Por favor introduce solo valores num&eacute;ricos en este campo (p.e. "1" o "1,1" o "-1" o "-1,1").',digits:"Por favor usa solo n&uacute;meros y puntuaci&oacute;n en este campo (por ejemplo, un n&uacute;mero de tel&eacute;fono con guiones y puntos no esta permitido).",alpha:"Por favor usa letras solo (a-z) en este campo. No se admiten espacios ni otros caracteres.",alphanum:"Por favor, usa solo letras (a-z) o n&uacute;meros (0-9) en este campo. No se admiten espacios ni otros caracteres.",dateSuchAs:"Por favor introduce una fecha v&aacute;lida como {date}",dateInFormatMDY:'Por favor introduce una fecha v&aacute;lida como DD/MM/YYYY (p.e. "31/12/1999")',email:'Por favor, introduce una direcci&oacute;n de email v&aacute;lida. Por ejemplo, "fred@domain.com".',url:"Por favor introduce una URL v&aacute;lida como http://www.example.com.",currencyDollar:"Por favor introduce una cantidad v&aacute;lida de €. Por ejemplo €100,00 .",oneRequired:"Por favor introduce algo para por lo menos una de estas entradas.",errorPrefix:"Error: ",warningPrefix:"Aviso: ",noSpace:"No pueden haber espacios en esta entrada.",reqChkByNode:"No hay elementos seleccionados.",requiredChk:"Este campo es obligatorio.",reqChkByName:"Por favor selecciona una {label}.",match:"Este campo necesita coincidir con el campo {matchName}",startDate:"la fecha de inicio",endDate:"la fecha de fin",currentDate:"la fecha actual",afterDate:"La fecha debe ser igual o posterior a {label}.",beforeDate:"La fecha debe ser igual o anterior a {label}.",startMonth:"Por favor selecciona un mes de origen",sameMonth:"Estas dos fechas deben estar en el mismo mes - debes cambiar una u otra."}),Locale.define("es-VE").inherit("es-ES","Date"),Locale.define("es-VE","FormValidator",{digits:"Por favor usa solo n&uacute;meros y puntuaci&oacute;n en este campo. Por ejemplo, un n&uacute;mero de tel&eacute;fono con guiones y puntos no esta permitido.",alpha:"Por favor usa solo letras (a-z) en este campo. No se admiten espacios ni otros caracteres.",currencyDollar:"Por favor introduce una cantidad v&aacute;lida de Bs. Por ejemplo Bs. 100,00 .",oneRequired:"Por favor introduce un valor para por lo menos una de estas entradas.",startDate:"La fecha de inicio",endDate:"La fecha de fin",currentDate:"La fecha actual"}).inherit("es-ES","FormValidator"),Locale.define("es-VE","Number",{decimal:",",group:".",negative:{prefix:"-"},currency:{decimals:2,prefix:"Bs. "},percentage:{decimals:2,suffix:"%"}}),Locale.define("et-EE","Date",{months:["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember"],months_abbr:["jaan","veebr","märts","apr","mai","juuni","juuli","aug","sept","okt","nov","dets"],days:["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"],days_abbr:["pühap","esmasp","teisip","kolmap","neljap","reede","laup"],dateOrder:["month","date","year"],shortDate:"%m.%d.%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:"",lessThanMinuteAgo:"vähem kui minut aega tagasi",minuteAgo:"umbes minut aega tagasi",minutesAgo:"{delta} minutit tagasi",hourAgo:"umbes tund aega tagasi",hoursAgo:"umbes {delta} tundi tagasi",dayAgo:"1 päev tagasi",daysAgo:"{delta} päeva tagasi",weekAgo:"1 nädal tagasi",weeksAgo:"{delta} nädalat tagasi",monthAgo:"1 kuu tagasi",monthsAgo:"{delta} kuud tagasi",yearAgo:"1 aasta tagasi",yearsAgo:"{delta} aastat tagasi",lessThanMinuteUntil:"vähem kui minuti aja pärast",minuteUntil:"umbes minuti aja pärast",minutesUntil:"{delta} minuti pärast",hourUntil:"umbes tunni aja pärast",hoursUntil:"umbes {delta} tunni pärast",dayUntil:"1 päeva pärast",daysUntil:"{delta} päeva pärast",weekUntil:"1 nädala pärast",weeksUntil:"{delta} nädala pärast",monthUntil:"1 kuu pärast",monthsUntil:"{delta} kuu pärast",yearUntil:"1 aasta pärast",yearsUntil:"{delta} aasta pärast"}),Locale.define("et-EE","FormValidator",{required:"Väli peab olema täidetud.",minLength:"Palun sisestage vähemalt {minLength} tähte (te sisestasite {length} tähte).",maxLength:"Palun ärge sisestage rohkem kui {maxLength} tähte (te sisestasite {length} tähte).",integer:"Palun sisestage väljale täisarv. Kümnendarvud (näiteks 1.25) ei ole lubatud.",numeric:'Palun sisestage ainult numbreid väljale (näiteks "1", "1.1", "-1" või "-1.1").',digits:"Palun kasutage ainult numbreid ja kirjavahemärke (telefoninumbri sisestamisel on lubatud kasutada kriipse ja punkte).",alpha:"Palun kasutage ainult tähti (a-z). Tühikud ja teised sümbolid on keelatud.",alphanum:"Palun kasutage ainult tähti (a-z) või numbreid (0-9). Tühikud ja teised sümbolid on keelatud.",dateSuchAs:"Palun sisestage kehtiv kuupäev kujul {date}",dateInFormatMDY:'Palun sisestage kehtiv kuupäev kujul MM.DD.YYYY (näiteks: "12.31.1999").',email:'Palun sisestage kehtiv e-maili aadress (näiteks: "fred@domain.com").',url:"Palun sisestage kehtiv URL (näiteks: http://www.example.com).",currencyDollar:"Palun sisestage kehtiv $ summa (näiteks: $100.00).",oneRequired:"Palun sisestage midagi vähemalt ühele antud väljadest.",errorPrefix:"Viga: ",warningPrefix:"Hoiatus: ",noSpace:"Väli ei tohi sisaldada tühikuid.",reqChkByNode:"Ükski väljadest pole valitud.",requiredChk:"Välja täitmine on vajalik.",reqChkByName:"Palun valige üks {label}.",match:"Väli peab sobima {matchName} väljaga",startDate:"algkuupäev",endDate:"lõppkuupäev",currentDate:"praegune kuupäev",afterDate:"Kuupäev peab olema võrdne või pärast {label}.",beforeDate:"Kuupäev peab olema võrdne või enne {label}.",startMonth:"Palun valige algkuupäev.",sameMonth:"Antud kaks kuupäeva peavad olema samas kuus - peate muutma ühte kuupäeva."}),Locale.define("fa","Date",{months:["ژانویه","فوریه","مارس","آپریل","مه","ژوئن","ژوئیه","آگوست","سپتامبر","اکتبر","نوامبر","دسامبر"],months_abbr:["1","2","3","4","5","6","7","8","9","10","11","12"],days:["یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],days_abbr:["ي","د","س","چ","پ","ج","ش"],dateOrder:["month","date","year"],shortDate:"%m/%d/%Y",shortTime:"%I:%M%p",AM:"ق.ظ",PM:"ب.ظ",ordinal:"ام",lessThanMinuteAgo:"کمتر از یک دقیقه پیش",minuteAgo:"حدود یک دقیقه پیش",minutesAgo:"{delta} دقیقه پیش",hourAgo:"حدود یک ساعت پیش",hoursAgo:"حدود {delta} ساعت پیش",
dayAgo:"1 روز پیش",daysAgo:"{delta} روز پیش",weekAgo:"1 هفته پیش",weeksAgo:"{delta} هفته پیش",monthAgo:"1 ماه پیش",monthsAgo:"{delta} ماه پیش",yearAgo:"1 سال پیش",yearsAgo:"{delta} سال پیش",lessThanMinuteUntil:"کمتر از یک دقیقه از حالا",minuteUntil:"حدود یک دقیقه از حالا",minutesUntil:"{delta} دقیقه از حالا",hourUntil:"حدود یک ساعت از حالا",hoursUntil:"حدود {delta} ساعت از حالا",dayUntil:"1 روز از حالا",daysUntil:"{delta} روز از حالا",weekUntil:"1 هفته از حالا",weeksUntil:"{delta} هفته از حالا",monthUntil:"1 ماه از حالا",monthsUntil:"{delta} ماه از حالا",yearUntil:"1 سال از حالا",yearsUntil:"{delta} سال از حالا"}),Locale.define("fa","FormValidator",{required:"این فیلد الزامی است.",minLength:"شما باید حداقل {minLength} حرف وارد کنید ({length} حرف وارد کرده اید).",maxLength:"لطفا حداکثر {maxLength} حرف وارد کنید (شما {length} حرف وارد کرده اید).",integer:"لطفا از عدد صحیح استفاده کنید. اعداد اعشاری (مانند 1.25) مجاز نیستند.",numeric:'لطفا فقط داده عددی وارد کنید (مانند "1" یا "1.1" یا "1-" یا "1.1-").',digits:"لطفا فقط از اعداد و علامتها در این فیلد استفاده کنید (برای مثال شماره تلفن با خط تیره و نقطه قابل قبول است).",alpha:"لطفا فقط از حروف الفباء برای این بخش استفاده کنید. کاراکترهای دیگر و فاصله مجاز نیستند.",alphanum:"لطفا فقط از حروف الفباء و اعداد در این بخش استفاده کنید. کاراکترهای دیگر و فاصله مجاز نیستند.",dateSuchAs:"لطفا یک تاریخ معتبر مانند {date} وارد کنید.",dateInFormatMDY:'لطفا یک تاریخ معتبر به شکل MM/DD/YYYY وارد کنید (مانند "12/31/1999").',email:'لطفا یک آدرس ایمیل معتبر وارد کنید. برای مثال "fred@domain.com".',url:"لطفا یک URL معتبر مانند http://www.example.com وارد کنید.",currencyDollar:"لطفا یک محدوده معتبر برای این بخش وارد کنید مانند 100.00$ .",oneRequired:"لطفا حداقل یکی از فیلدها را پر کنید.",errorPrefix:"خطا: ",warningPrefix:"هشدار: ",noSpace:"استفاده از فاصله در این بخش مجاز نیست.",reqChkByNode:"موردی انتخاب نشده است.",requiredChk:"این فیلد الزامی است.",reqChkByName:"لطفا یک {label} را انتخاب کنید.",match:"این فیلد باید با فیلد {matchName} مطابقت داشته باشد.",startDate:"تاریخ شروع",endDate:"تاریخ پایان",currentDate:"تاریخ کنونی",afterDate:"تاریخ میبایست برابر یا بعد از {label} باشد",beforeDate:"تاریخ میبایست برابر یا قبل از {label} باشد",startMonth:"لطفا ماه شروع را انتخاب کنید",sameMonth:"این دو تاریخ باید در یک ماه باشند - شما باید یکی یا هر دو را تغییر دهید.",creditcard:"شماره کارت اعتباری که وارد کرده اید معتبر نیست. لطفا شماره را بررسی کنید و مجددا تلاش کنید. {length} رقم وارد شده است."}),Locale.define("fi-FI","Date",{months:["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],months_abbr:["tammik.","helmik.","maalisk.","huhtik.","toukok.","kesäk.","heinäk.","elok.","syysk.","lokak.","marrask.","jouluk."],days:["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],days_abbr:["su","ma","ti","ke","to","pe","la"],dateOrder:["date","month","year"],shortDate:"%d.%m.%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:".",lessThanMinuteAgo:"vajaa minuutti sitten",minuteAgo:"noin minuutti sitten",minutesAgo:"{delta} minuuttia sitten",hourAgo:"noin tunti sitten",hoursAgo:"noin {delta} tuntia sitten",dayAgo:"päivä sitten",daysAgo:"{delta} päivää sitten",weekAgo:"viikko sitten",weeksAgo:"{delta} viikkoa sitten",monthAgo:"kuukausi sitten",monthsAgo:"{delta} kuukautta sitten",yearAgo:"vuosi sitten",yearsAgo:"{delta} vuotta sitten",lessThanMinuteUntil:"vajaan minuutin kuluttua",minuteUntil:"noin minuutin kuluttua",minutesUntil:"{delta} minuutin kuluttua",hourUntil:"noin tunnin kuluttua",hoursUntil:"noin {delta} tunnin kuluttua",dayUntil:"päivän kuluttua",daysUntil:"{delta} päivän kuluttua",weekUntil:"viikon kuluttua",weeksUntil:"{delta} viikon kuluttua",monthUntil:"kuukauden kuluttua",monthsUntil:"{delta} kuukauden kuluttua",yearUntil:"vuoden kuluttua",yearsUntil:"{delta} vuoden kuluttua"}),Locale.define("fi-FI","FormValidator",{required:"Tämä kenttä on pakollinen.",minLength:"Ole hyvä ja anna vähintään {minLength} merkkiä (annoit {length} merkkiä).",maxLength:"Älä anna enempää kuin {maxLength} merkkiä (annoit {length} merkkiä).",integer:"Ole hyvä ja anna kokonaisluku. Luvut, joissa on desimaaleja (esim. 1.25) eivät ole sallittuja.",numeric:'Anna tähän kenttään lukuarvo (kuten "1" tai "1.1" tai "-1" tai "-1.1").',digits:"Käytä pelkästään numeroita ja välimerkkejä tässä kentässä (syötteet, kuten esim. puhelinnumero, jossa on väliviivoja, pilkkuja tai pisteitä, kelpaa).",alpha:"Anna tähän kenttään vain kirjaimia (a-z). Välilyönnit tai muut merkit eivät ole sallittuja.",alphanum:"Anna tähän kenttään vain kirjaimia (a-z) tai numeroita (0-9). Välilyönnit tai muut merkit eivät ole sallittuja.",dateSuchAs:"Ole hyvä ja anna kelvollinen päivmäärä, kuten esimerkiksi {date}",dateInFormatMDY:'Ole hyvä ja anna kelvollinen päivämäärä muodossa pp/kk/vvvv (kuten "12/31/1999")',email:'Ole hyvä ja anna kelvollinen sähköpostiosoite (kuten esimerkiksi "matti@meikalainen.com").',url:"Ole hyvä ja anna kelvollinen URL, kuten esimerkiksi http://www.example.com.",currencyDollar:"Ole hyvä ja anna kelvollinen eurosumma (kuten esimerkiksi 100,00 EUR) .",oneRequired:"Ole hyvä ja syötä jotakin ainakin johonkin näistä kentistä.",errorPrefix:"Virhe: ",warningPrefix:"Varoitus: ",noSpace:"Tässä syötteessä ei voi olla välilyöntejä",reqChkByNode:"Ei valintoja.",requiredChk:"Tämä kenttä on pakollinen.",reqChkByName:"Ole hyvä ja valitse {label}.",match:"Tämän kentän tulee vastata kenttää {matchName}",startDate:"alkupäivämäärä",endDate:"loppupäivämäärä",currentDate:"nykyinen päivämäärä",afterDate:"Päivämäärän tulisi olla sama tai myöhäisempi ajankohta kuin {label}.",beforeDate:"Päivämäärän tulisi olla sama tai aikaisempi ajankohta kuin {label}.",startMonth:"Ole hyvä ja valitse aloituskuukausi",sameMonth:"Näiden kahden päivämäärän tulee olla saman kuun sisällä -- sinun pitää muuttaa jompaa kumpaa.",creditcard:"Annettu luottokortin numero ei kelpaa. Ole hyvä ja tarkista numero sekä yritä uudelleen. {length} numeroa syötetty."}),Locale.define("fi-FI","Number",{group:" "}).inherit("EU","Number"),Locale.define("fr-FR","Date",{months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],months_abbr:["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],days:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],days_abbr:["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],dateOrder:["date","month","year"],shortDate:"%d/%m/%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:function(e){return e>1?"":"er"},lessThanMinuteAgo:"il y a moins d'une minute",minuteAgo:"il y a une minute",minutesAgo:"il y a {delta} minutes",hourAgo:"il y a une heure",hoursAgo:"il y a {delta} heures",dayAgo:"il y a un jour",daysAgo:"il y a {delta} jours",weekAgo:"il y a une semaine",weeksAgo:"il y a {delta} semaines",monthAgo:"il y a 1 mois",monthsAgo:"il y a {delta} mois",yearthAgo:"il y a 1 an",yearsAgo:"il y a {delta} ans",lessThanMinuteUntil:"dans moins d'une minute",minuteUntil:"dans une minute",minutesUntil:"dans {delta} minutes",hourUntil:"dans une heure",hoursUntil:"dans {delta} heures",dayUntil:"dans un jour",daysUntil:"dans {delta} jours",weekUntil:"dans 1 semaine",weeksUntil:"dans {delta} semaines",monthUntil:"dans 1 mois",monthsUntil:"dans {delta} mois",yearUntil:"dans 1 an",yearsUntil:"dans {delta} ans"}),Locale.define("fr-FR","FormValidator",{required:"Ce champ est obligatoire.",length:"Veuillez saisir {length} caract&egrave;re(s) (vous avez saisi {elLength} caract&egrave;re(s)",minLength:"Veuillez saisir un minimum de {minLength} caract&egrave;re(s) (vous avez saisi {length} caract&egrave;re(s)).",maxLength:"Veuillez saisir un maximum de {maxLength} caract&egrave;re(s) (vous avez saisi {length} caract&egrave;re(s)).",integer:'Veuillez saisir un nombre entier dans ce champ. Les nombres d&eacute;cimaux (ex : "1,25") ne sont pas autoris&eacute;s.',numeric:'Veuillez saisir uniquement des chiffres dans ce champ (ex : "1" ou "1,1" ou "-1" ou "-1,1").',digits:"Veuillez saisir uniquement des chiffres et des signes de ponctuation dans ce champ (ex : un num&eacute;ro de t&eacute;l&eacute;phone avec des traits d'union est autoris&eacute;).",alpha:"Veuillez saisir uniquement des lettres (a-z) dans ce champ. Les espaces ou autres caract&egrave;res ne sont pas autoris&eacute;s.",alphanum:"Veuillez saisir uniquement des lettres (a-z) ou des chiffres (0-9) dans ce champ. Les espaces ou autres caract&egrave;res ne sont pas autoris&eacute;s.",dateSuchAs:"Veuillez saisir une date correcte comme {date}",dateInFormatMDY:'Veuillez saisir une date correcte, au format JJ/MM/AAAA (ex : "31/11/1999").',email:'Veuillez saisir une adresse de courrier &eacute;lectronique. Par exemple "fred@domaine.com".',url:"Veuillez saisir une URL, comme http://www.exemple.com.",currencyDollar:"Veuillez saisir une quantit&eacute; correcte. Par exemple 100,00&euro;.",oneRequired:"Veuillez s&eacute;lectionner au moins une de ces options.",errorPrefix:"Erreur : ",warningPrefix:"Attention : ",noSpace:"Ce champ n'accepte pas les espaces.",reqChkByNode:"Aucun &eacute;l&eacute;ment n'est s&eacute;lectionn&eacute;.",requiredChk:"Ce champ est obligatoire.",reqChkByName:"Veuillez s&eacute;lectionner un(e) {label}.",match:"Ce champ doit correspondre avec le champ {matchName}.",startDate:"date de d&eacute;but",endDate:"date de fin",currentDate:"date actuelle",afterDate:"La date doit &ecirc;tre identique ou post&eacute;rieure &agrave; {label}.",beforeDate:"La date doit &ecirc;tre identique ou ant&eacute;rieure &agrave; {label}.",startMonth:"Veuillez s&eacute;lectionner un mois de d&eacute;but.",sameMonth:"Ces deux dates doivent &ecirc;tre dans le m&ecirc;me mois - vous devez en modifier une.",creditcard:"Le num&eacute;ro de carte de cr&eacute;dit est invalide. Merci de v&eacute;rifier le num&eacute;ro et de r&eacute;essayer. Vous avez entr&eacute; {length} chiffre(s)."}),Locale.define("fr-FR","Number",{group:" "}).inherit("EU","Number"),Locale.define("he-IL","Date",{months:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],months_abbr:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],days:["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],days_abbr:["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],dateOrder:["date","month","year"],shortDate:"%d/%m/%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:0,ordinal:"",lessThanMinuteAgo:"לפני פחות מדקה",minuteAgo:"לפני כדקה",minutesAgo:"לפני {delta} דקות",hourAgo:"לפני כשעה",hoursAgo:"לפני {delta} שעות",dayAgo:"לפני יום",daysAgo:"לפני {delta} ימים",weekAgo:"לפני שבוע",weeksAgo:"לפני {delta} שבועות",monthAgo:"לפני חודש",monthsAgo:"לפני {delta} חודשים",yearAgo:"לפני שנה",yearsAgo:"לפני {delta} שנים",lessThanMinuteUntil:"בעוד פחות מדקה",minuteUntil:"בעוד כדקה",minutesUntil:"בעוד {delta} דקות",hourUntil:"בעוד כשעה",hoursUntil:"בעוד {delta} שעות",dayUntil:"בעוד יום",daysUntil:"בעוד {delta} ימים",weekUntil:"בעוד שבוע",weeksUntil:"בעוד {delta} שבועות",monthUntil:"בעוד חודש",monthsUntil:"בעוד {delta} חודשים",yearUntil:"בעוד שנה",yearsUntil:"בעוד {delta} שנים"}),Locale.define("he-IL","FormValidator",{required:"נא למלא שדה זה.",minLength:"נא להזין לפחות {minLength} תווים (הזנת {length} תווים).",maxLength:"נא להזין עד {maxLength} תווים (הזנת {length} תווים).",integer:"נא להזין מספר שלם לשדה זה. מספרים עשרוניים (כמו 1.25) אינם חוקיים.",numeric:'נא להזין ערך מספרי בלבד בשדה זה (כמו "1", "1.1", "-1" או "-1.1").',digits:"נא להזין רק ספרות וסימני הפרדה בשדה זה (למשל, מספר טלפון עם מקפים או נקודות הוא חוקי).",alpha:"נא להזין רק אותיות באנגלית (a-z) בשדה זה. רווחים או תווים אחרים אינם חוקיים.",alphanum:"נא להזין רק אותריות באנגלית (a-z) או ספרות (0-9) בשדה זה. אווחרים או תווים אחרים אינם חוקיים.",dateSuchAs:"נא להזין תאריך חוקי, כמו {date}",dateInFormatMDY:'נא להזין תאריך חוקי בפורמט MM/DD/YYYY (כמו "12/31/1999")',email:'נא להזין כתובת אימייל חוקית. לדוגמה: "fred@domain.com".',url:"נא להזין כתובת אתר חוקית, כמו http://www.example.com.",currencyDollar:"נא להזין סכום דולרי חוקי. לדוגמה $100.00.",oneRequired:"נא לבחור לפחות בשדה אחד.",errorPrefix:"שגיאה: ",warningPrefix:"אזהרה: ",noSpace:"אין להזין רווחים בשדה זה.",reqChkByNode:"נא לבחור אחת מהאפשרויות.",requiredChk:"שדה זה נדרש.",reqChkByName:"נא לבחור {label}.",match:"שדה זה צריך להתאים לשדה {matchName}",startDate:"תאריך ההתחלה",endDate:"תאריך הסיום",currentDate:"התאריך הנוכחי",afterDate:"התאריך צריך להיות זהה או אחרי {label}.",beforeDate:"התאריך צריך להיות זהה או לפני {label}.",startMonth:"נא לבחור חודש התחלה",sameMonth:"שני תאריכים אלה צריכים להיות באותו חודש - נא לשנות אחד התאריכים.",creditcard:"מספר כרטיס האשראי שהוזן אינו חוקי. נא לבדוק שנית. הוזנו {length} ספרות."}),Locale.define("he-IL","Number",{decimal:".",group:",",currency:{suffix:" ₪"}}),Locale.define("hu-HU","Date",{months:["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"],months_abbr:["jan.","febr.","márc.","ápr.","máj.","jún.","júl.","aug.","szept.","okt.","nov.","dec."],days:["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"],days_abbr:["V","H","K","Sze","Cs","P","Szo"],dateOrder:["year","month","date"],shortDate:"%Y.%m.%d.",shortTime:"%I:%M",AM:"de.",PM:"du.",firstDayOfWeek:1,ordinal:".",lessThanMinuteAgo:"alig egy perce",minuteAgo:"egy perce",minutesAgo:"{delta} perce",hourAgo:"egy órája",hoursAgo:"{delta} órája",dayAgo:"1 napja",daysAgo:"{delta} napja",weekAgo:"1 hete",weeksAgo:"{delta} hete",monthAgo:"1 hónapja",monthsAgo:"{delta} hónapja",yearAgo:"1 éve",yearsAgo:"{delta} éve",lessThanMinuteUntil:"alig egy perc múlva",minuteUntil:"egy perc múlva",minutesUntil:"{delta} perc múlva",hourUntil:"egy óra múlva",hoursUntil:"{delta} óra múlva",dayUntil:"1 nap múlva",daysUntil:"{delta} nap múlva",weekUntil:"1 hét múlva",weeksUntil:"{delta} hét múlva",monthUntil:"1 hónap múlva",monthsUntil:"{delta} hónap múlva",yearUntil:"1 év múlva",yearsUntil:"{delta} év múlva"}),Locale.define("hu-HU","FormValidator",{required:"A mező kitöltése kötelező.",minLength:"Legalább {minLength} karakter megadása szükséges (megadva {length} karakter).",maxLength:"Legfeljebb {maxLength} karakter megadása lehetséges (megadva {length} karakter).",integer:"Egész szám megadása szükséges. A tizedesjegyek (pl. 1.25) nem engedélyezettek.",numeric:'Szám megadása szükséges (pl. "1" vagy "1.1" vagy "-1" vagy "-1.1").',digits:"Csak számok és írásjelek megadása lehetséges (pl. telefonszám kötőjelek és/vagy perjelekkel).",alpha:"Csak betűk (a-z) megadása lehetséges. Szóköz és egyéb karakterek nem engedélyezettek.",alphanum:"Csak betűk (a-z) vagy számok (0-9) megadása lehetséges. Szóköz és egyéb karakterek nem engedélyezettek.",dateSuchAs:"Valós dátum megadása szükséges (pl. {date}).",dateInFormatMDY:'Valós dátum megadása szükséges ÉÉÉÉ.HH.NN. formában. (pl. "1999.12.31.")',email:'Valós e-mail cím megadása szükséges (pl. "fred@domain.hu").',url:"Valós URL megadása szükséges (pl. http://www.example.com).",currencyDollar:"Valós pénzösszeg megadása szükséges (pl. 100.00 Ft.).",oneRequired:"Az alábbi mezők legalább egyikének kitöltése kötelező.",errorPrefix:"Hiba: ",warningPrefix:"Figyelem: ",noSpace:"A mező nem tartalmazhat szóközöket.",reqChkByNode:"Nincs egyetlen kijelölt elem sem.",requiredChk:"A mező kitöltése kötelező.",reqChkByName:"Egy {label} kiválasztása szükséges.",match:"A mezőnek egyeznie kell a(z) {matchName} mezővel.",startDate:"a kezdet dátuma",endDate:"a vég dátuma",currentDate:"jelenlegi dátum",afterDate:"A dátum nem lehet kisebb, mint {label}.",beforeDate:"A dátum nem lehet nagyobb, mint {label}.",startMonth:"Kezdeti hónap megadása szükséges.",sameMonth:"A két dátumnak ugyanazon hónapban kell lennie.",creditcard:"A megadott bankkártyaszám nem valódi (megadva {length} számjegy)."}),Locale.define("it-IT","Date",{months:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],months_abbr:["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],days:["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],days_abbr:["dom","lun","mar","mer","gio","ven","sab"],dateOrder:["date","month","year"],shortDate:"%d/%m/%Y",shortTime:"%H.%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:"º",lessThanMinuteAgo:"meno di un minuto fa",minuteAgo:"circa un minuto fa",minutesAgo:"circa {delta} minuti fa",hourAgo:"circa un'ora fa",hoursAgo:"circa {delta} ore fa",dayAgo:"circa 1 giorno fa",daysAgo:"circa {delta} giorni fa",weekAgo:"una settimana fa",weeksAgo:"{delta} settimane fa",monthAgo:"un mese fa",monthsAgo:"{delta} mesi fa",yearAgo:"un anno fa",yearsAgo:"{delta} anni fa",lessThanMinuteUntil:"tra meno di un minuto",minuteUntil:"tra circa un minuto",minutesUntil:"tra circa {delta} minuti",hourUntil:"tra circa un'ora",hoursUntil:"tra circa {delta} ore",dayUntil:"tra circa un giorno",daysUntil:"tra circa {delta} giorni",weekUntil:"tra una settimana",weeksUntil:"tra {delta} settimane",monthUntil:"tra un mese",monthsUntil:"tra {delta} mesi",yearUntil:"tra un anno",yearsUntil:"tra {delta} anni"}),Locale.define("it-IT","FormValidator",{required:"Il campo &egrave; obbligatorio.",minLength:"Inserire almeno {minLength} caratteri (ne sono stati inseriti {length}).",maxLength:"Inserire al massimo {maxLength} caratteri (ne sono stati inseriti {length}).",integer:"Inserire un numero intero. Non sono consentiti decimali (es.: 1.25).",numeric:'Inserire solo valori numerici (es.: "1" oppure "1.1" oppure "-1" oppure "-1.1").',digits:"Inserire solo numeri e caratteri di punteggiatura. Per esempio &egrave; consentito un numero telefonico con trattini o punti.",alpha:"Inserire solo lettere (a-z). Non sono consentiti spazi o altri caratteri.",alphanum:"Inserire solo lettere (a-z) o numeri (0-9). Non sono consentiti spazi o altri caratteri.",dateSuchAs:"Inserire una data valida del tipo {date}",dateInFormatMDY:'Inserire una data valida nel formato MM/GG/AAAA (es.: "12/31/1999")',email:'Inserire un indirizzo email valido. Per esempio "nome@dominio.com".',url:'Inserire un indirizzo valido. Per esempio "http://www.example.com".',currencyDollar:'Inserire un importo valido. Per esempio "$100.00".',oneRequired:"Completare almeno uno dei campi richiesti.",errorPrefix:"Errore: ",warningPrefix:"Attenzione: ",noSpace:"Non sono consentiti spazi.",reqChkByNode:"Nessuna voce selezionata.",requiredChk:"Il campo &egrave; obbligatorio.",reqChkByName:"Selezionare un(a) {label}.",match:"Il valore deve corrispondere al campo {matchName}",startDate:"data d'inizio",endDate:"data di fine",currentDate:"data attuale",afterDate:"La data deve corrispondere o essere successiva al {label}.",beforeDate:"La data deve corrispondere o essere precedente al {label}.",startMonth:"Selezionare un mese d'inizio",sameMonth:"Le due date devono essere dello stesso mese - occorre modificarne una."}),Locale.define("ja-JP","Date",{months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],months_abbr:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],days:["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],days_abbr:["日","月","火","水","木","金","土"],dateOrder:["year","month","date"],shortDate:"%Y/%m/%d",shortTime:"%H:%M",AM:"午前",PM:"午後",firstDayOfWeek:0,ordinal:"",lessThanMinuteAgo:"1分以内前",minuteAgo:"約1分前",minutesAgo:"約{delta}分前",hourAgo:"約1時間前",hoursAgo:"約{delta}時間前",dayAgo:"1日前",daysAgo:"{delta}日前",weekAgo:"1週間前",weeksAgo:"{delta}週間前",monthAgo:"1ヶ月前",monthsAgo:"{delta}ヶ月前",yearAgo:"1年前",yearsAgo:"{delta}年前",lessThanMinuteUntil:"今から約1分以内",minuteUntil:"今から約1分",minutesUntil:"今から約{delta}分",hourUntil:"今から約1時間",hoursUntil:"今から約{delta}時間",dayUntil:"今から1日間",daysUntil:"今から{delta}日間",weekUntil:"今から1週間",weeksUntil:"今から{delta}週間",monthUntil:"今から1ヶ月",monthsUntil:"今から{delta}ヶ月",yearUntil:"今から1年",yearsUntil:"今から{delta}年"}),Locale.define("ja-JP","FormValidator",{required:"入力は必須です。",minLength:"入力文字数は{minLength}以上にしてください。({length}文字)",maxLength:"入力文字数は{maxLength}以下にしてください。({length}文字)",integer:"整数を入力してください。",numeric:'入力できるのは数値だけです。(例: "1", "1.1", "-1", "-1.1"....)',digits:"入力できるのは数値と句読記号です。 (例: -や+を含む電話番号など).",alpha:"入力できるのは半角英字だけです。それ以外の文字は入力できません。",alphanum:"入力できるのは半角英数字だけです。それ以外の文字は入力できません。",dateSuchAs:"有効な日付を入力してください。{date}",dateInFormatMDY:'日付の書式に誤りがあります。YYYY/MM/DD (i.e. "1999/12/31")',email:"メールアドレスに誤りがあります。",url:"URLアドレスに誤りがあります。",currencyDollar:"金額に誤りがあります。",oneRequired:"ひとつ以上入力してください。",errorPrefix:"エラー: ",warningPrefix:"警告: ",noSpace:"スペースは入力できません。",reqChkByNode:"選択されていません。",requiredChk:"この項目は必須です。",reqChkByName:"{label}を選択してください。",match:"{matchName}が入力されている場合必須です。",startDate:"開始日",endDate:"終了日",currentDate:"今日",afterDate:"{label}以降の日付にしてください。",beforeDate:"{label}以前の日付にしてください。",startMonth:"開始月を選択してください。",sameMonth:"日付が同一です。どちらかを変更してください。"}),Locale.define("ja-JP","Number",{decimal:".",group:",",currency:{decimals:0,prefix:"\\"}}),Locale.define("nl-NL","Date",{months:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],months_abbr:["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],days:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],days_abbr:["zo","ma","di","wo","do","vr","za"],dateOrder:["date","month","year"],shortDate:"%d-%m-%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:"e",lessThanMinuteAgo:"minder dan een minuut geleden",minuteAgo:"ongeveer een minuut geleden",minutesAgo:"{delta} minuten geleden",hourAgo:"ongeveer een uur geleden",hoursAgo:"ongeveer {delta} uur geleden",dayAgo:"een dag geleden",daysAgo:"{delta} dagen geleden",weekAgo:"een week geleden",weeksAgo:"{delta} weken geleden",monthAgo:"een maand geleden",monthsAgo:"{delta} maanden geleden",yearAgo:"een jaar geleden",yearsAgo:"{delta} jaar geleden",lessThanMinuteUntil:"over minder dan een minuut",minuteUntil:"over ongeveer een minuut",minutesUntil:"over {delta} minuten",hourUntil:"over ongeveer een uur",hoursUntil:"over {delta} uur",dayUntil:"over ongeveer een dag",daysUntil:"over {delta} dagen",weekUntil:"over een week",weeksUntil:"over {delta} weken",monthUntil:"over een maand",monthsUntil:"over {delta} maanden",yearUntil:"over een jaar",yearsUntil:"over {delta} jaar"}),Locale.define("nl-NL","FormValidator",{required:"Dit veld is verplicht.",length:"Vul precies {length} karakters in (je hebt {elLength} karakters ingevoerd).",minLength:"Vul minimaal {minLength} karakters in (je hebt {length} karakters ingevoerd).",maxLength:"Vul niet meer dan {maxLength} karakters in (je hebt {length} karakters ingevoerd).",integer:"Vul een getal in. Getallen met decimalen (bijvoorbeeld 1.25) zijn niet toegestaan.",numeric:'Vul alleen numerieke waarden in (bijvoorbeeld "1" of "1.1" of "-1" of "-1.1").',digits:"Vul alleen nummers en leestekens in (bijvoorbeeld een telefoonnummer met streepjes is toegestaan).",alpha:"Vul alleen letters in (a-z). Spaties en andere karakters zijn niet toegestaan.",alphanum:"Vul alleen letters (a-z) of nummers (0-9) in. Spaties en andere karakters zijn niet toegestaan.",dateSuchAs:"Vul een geldige datum in, zoals {date}",dateInFormatMDY:'Vul een geldige datum, in het formaat MM/DD/YYYY (bijvoorbeeld "12/31/1999")',email:'Vul een geldig e-mailadres in. Bijvoorbeeld "fred@domein.nl".',url:"Vul een geldige URL in, zoals http://www.example.com.",currencyDollar:"Vul een geldig $ bedrag in. Bijvoorbeeld $100.00 .",oneRequired:"Vul iets in bij in ieder geval een van deze velden.",warningPrefix:"Waarschuwing: ",errorPrefix:"Fout: ",noSpace:"Spaties zijn niet toegestaan in dit veld.",reqChkByNode:"Er zijn geen items geselecteerd.",requiredChk:"Dit veld is verplicht.",reqChkByName:"Selecteer een {label}.",match:"Dit veld moet overeen komen met het {matchName} veld",startDate:"de begin datum",endDate:"de eind datum",currentDate:"de huidige datum",afterDate:"De datum moet hetzelfde of na {label} zijn.",beforeDate:"De datum moet hetzelfde of voor {label} zijn.",startMonth:"Selecteer een begin maand",sameMonth:"Deze twee data moeten in dezelfde maand zijn - u moet een van beide aanpassen.",creditcard:"Het ingevulde creditcardnummer is niet geldig. Controleer het nummer en probeer opnieuw. {length} getallen ingevuld."}),Locale.define("nl-NL").inherit("EU","Number"),Locale.define("no-NO","Date",{months:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],months_abbr:["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Des"],days:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"],days_abbr:["Søn","Man","Tir","Ons","Tor","Fre","Lør"],dateOrder:["date","month","year"],shortDate:"%d.%m.%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:1,lessThanMinuteAgo:"mindre enn et minutt siden",minuteAgo:"omtrent et minutt siden",minutesAgo:"{delta} minutter siden",hourAgo:"omtrent en time siden",hoursAgo:"omtrent {delta} timer siden",dayAgo:"{delta} dag siden",daysAgo:"{delta} dager siden",weekAgo:"en uke siden",weeksAgo:"{delta} uker siden",monthAgo:"en måned siden",monthsAgo:"{delta} måneder siden",yearAgo:"ett år siden",yearsAgo:"{delta} år siden",lessThanMinuteUntil:"mindre enn et minutt til",minuteUntil:"omtrent et minutt til",minutesUntil:"{delta} minutter til",hourUntil:"omtrent en time til",hoursUntil:"omtrent {delta} timer til",dayUntil:"en dag til",daysUntil:"{delta} dager til",weekUntil:"en uke til",weeksUntil:"{delta} uker til",monthUntil:"en måned til",monthsUntil:"{delta} måneder til",yearUntil:"et år til",yearsUntil:"{delta} år til"}),Locale.define("no-NO","FormValidator",{required:"Dette feltet er påkrevd.",length:"Skriv inn {length} tegn (du skrev {elLength} tegn)",minLength:"Skriv inn minst {minLength} tegn (du skrev {length} tegn).",maxLength:"Ikke skriv mer enn {maxLength} tegn (du skrev {length} tegn).",integer:"Skriv inn et tall i dette feltet. Tall med desimaler (f.eks. 1,25) er ikke tillat.",numeric:'Skriv kun inn numeriske verdier i dette feltet (f.eks. "1", "1.1", "-1" eller "-1.1").',digits:"Skriv kun nummer og skilletegn i dette feltet.",alpha:"Skriv kun bokstaver (a-å) i dette feltet. Ingen mellomrom eller andre tegn er tillat.",alphanum:"Skriv kun bokstaver (a-å) eller nummer (0-9) i dette feltet. Ingen mellomrom eller andre tegn er tillat.",dateSuchAs:"Skriv inn en gyldig dato, som f.eks. {date}",dateInFormatMDY:'Skriv inn en gyldig dato, f.eks. DD/MM/YYYY ("31/12/1999")',email:'Skriv inn en gyldig epost-adresse. F.eks. "ola.nordmann@example.com".',url:"Skriv inn en gyldig URL, f.eks. http://www.example.com.",currencyDollar:"Skriv inn et gyldig beløp. F.eks. 100,00.",oneRequired:"Minst ett av disse feltene må fylles ut.",errorPrefix:"Feil: ",warningPrefix:"Advarsel: ",noSpace:"Mellomrom er ikke tillatt i dette feltet.",reqChkByNode:"Ingen objekter er valgt.",requiredChk:"Dette feltet er påkrevd.",reqChkByName:"Velg en {label}.",match:"Dette feltet må være lik {matchName}",startDate:"startdato",endDate:"sluttdato",currentDate:"dagens dato",afterDate:"Datoen må være den samme som eller etter {label}.",beforeDate:"Datoen må være den samme som eller før {label}.",startMonth:"Velg en startmåned",sameMonth:"Datoene må være i den samme måneden - velg den ene eller den andre.",creditcard:"Kortnummeret du skrev inn er ikke gyldig. Prøv igjen. Du skrev {length} siffer."}),Locale.define("no-NO","Number",{currency:{prefix:"NOK "}}).inherit("EU","Number"),Locale.define("pl-PL","Date",{months:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],months_abbr:["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"],days:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],days_abbr:["niedz.","pon.","wt.","śr.","czw.","pt.","sob."],dateOrder:["year","month","date"],shortDate:"%Y-%m-%d",shortTime:"%H:%M",AM:"nad ranem",PM:"po południu",firstDayOfWeek:1,ordinal:function(e){return e>3&&e<21?"ty":["ty","szy","gi","ci","ty"][Math.min(e%10,4)]},lessThanMinuteAgo:"mniej niż minute temu",minuteAgo:"około minutę temu",minutesAgo:"{delta} minut temu",hourAgo:"około godzinę temu",hoursAgo:"około {delta} godzin temu",dayAgo:"Wczoraj",daysAgo:"{delta} dni temu",lessThanMinuteUntil:"za niecałą minutę",minuteUntil:"za około minutę",minutesUntil:"za {delta} minut",hourUntil:"za około godzinę",hoursUntil:"za około {delta} godzin",dayUntil:"za 1 dzień",daysUntil:"za {delta} dni"}),Locale.define("pl-PL","FormValidator",{required:"To pole jest wymagane.",minLength:"Wymagane jest przynajmniej {minLength} znaków (wpisanych zostało tylko {length}).",maxLength:"Dozwolone jest nie więcej niż {maxLength} znaków (wpisanych zostało {length})",integer:"To pole wymaga liczb całych. Liczby dziesiętne (np. 1.25) są niedozwolone.",numeric:'Prosimy używać tylko numerycznych wartości w tym polu (np. "1", "1.1", "-1" lub "-1.1").',digits:"Prosimy używać liczb oraz zankow punktuacyjnych w typ polu (dla przykładu, przy numerze telefonu myślniki i kropki są dozwolone).",alpha:"Prosimy używać tylko liter (a-z) w tym polu. Spacje oraz inne znaki są niedozwolone.",alphanum:"Prosimy używać tylko liter (a-z) lub liczb (0-9) w tym polu. Spacje oraz inne znaki są niedozwolone.",dateSuchAs:"Prosimy podać prawidłową datę w formacie: {date}",dateInFormatMDY:'Prosimy podać poprawną date w formacie DD.MM.RRRR (i.e. "12.01.2009")',email:'Prosimy podać prawidłowy adres e-mail, np. "jan@domena.pl".',url:"Prosimy podać prawidłowy adres URL, np. http://www.example.com.",currencyDollar:"Prosimy podać prawidłową sumę w PLN. Dla przykładu: 100.00 PLN.",oneRequired:"Prosimy wypełnić chociaż jedno z pól.",errorPrefix:"Błąd: ",warningPrefix:"Uwaga: ",noSpace:"W tym polu nie mogą znajdować się spacje.",reqChkByNode:"Brak zaznaczonych elementów.",requiredChk:"To pole jest wymagane.",reqChkByName:"Prosimy wybrać z {label}.",match:"To pole musi być takie samo jak {matchName}",startDate:"data początkowa",endDate:"data końcowa",currentDate:"aktualna data",afterDate:"Podana data poinna być taka sama lub po {label}.",beforeDate:"Podana data poinna być taka sama lub przed {label}.",startMonth:"Prosimy wybrać początkowy miesiąc.",sameMonth:"Te dwie daty muszą być w zakresie tego samego miesiąca - wymagana jest zmiana któregoś z pól."}),Locale.define("pt-PT","Date",{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],months_abbr:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],days:["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],days_abbr:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],dateOrder:["date","month","year"],shortDate:"%d-%m-%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:"º",lessThanMinuteAgo:"há menos de um minuto",minuteAgo:"há cerca de um minuto",minutesAgo:"há {delta} minutos",hourAgo:"há cerca de uma hora",hoursAgo:"há cerca de {delta} horas",dayAgo:"há um dia",daysAgo:"há {delta} dias",weekAgo:"há uma semana",weeksAgo:"há {delta} semanas",monthAgo:"há um mês",monthsAgo:"há {delta} meses",yearAgo:"há um ano",yearsAgo:"há {delta} anos",lessThanMinuteUntil:"em menos de um minuto",minuteUntil:"em um minuto",minutesUntil:"em {delta} minutos",hourUntil:"em uma hora",hoursUntil:"em {delta} horas",dayUntil:"em um dia",daysUntil:"em {delta} dias",weekUntil:"em uma semana",weeksUntil:"em {delta} semanas",monthUntil:"em um mês",monthsUntil:"em {delta} meses",yearUntil:"em um ano",yearsUntil:"em {delta} anos"}),Locale.define("pt-BR","Date",{shortDate:"%d/%m/%Y"}).inherit("pt-PT","Date"),Locale.define("pt-BR","FormValidator",{required:"Este campo é obrigatório.",minLength:"Digite pelo menos {minLength} caracteres (tamanho atual: {length}).",maxLength:"Não digite mais de {maxLength} caracteres (tamanho atual: {length}).",
integer:"Por favor digite apenas um número inteiro neste campo. Não são permitidos números decimais (por exemplo, 1,25).",numeric:'Por favor digite apenas valores numéricos neste campo (por exemplo, "1" ou "1.1" ou "-1" ou "-1,1").',digits:"Por favor use apenas números e pontuação neste campo (por exemplo, um número de telefone com traços ou pontos é permitido).",alpha:"Por favor use somente letras (a-z). Espaço e outros caracteres não são permitidos.",alphanum:"Use somente letras (a-z) ou números (0-9) neste campo. Espaço e outros caracteres não são permitidos.",dateSuchAs:"Digite uma data válida, como {date}",dateInFormatMDY:'Digite uma data válida, como DD/MM/YYYY (por exemplo, "31/12/1999")',email:'Digite um endereço de email válido. Por exemplo "nome@dominio.com".',url:"Digite uma URL válida. Exemplo: http://www.example.com.",currencyDollar:"Digite um valor em dinheiro válido. Exemplo: R$100,00 .",oneRequired:"Digite algo para pelo menos um desses campos.",errorPrefix:"Erro: ",warningPrefix:"Aviso: ",noSpace:"Não é possível digitar espaços neste campo.",reqChkByNode:"Não foi selecionado nenhum item.",requiredChk:"Este campo é obrigatório.",reqChkByName:"Por favor digite um {label}.",match:"Este campo deve ser igual ao campo {matchName}.",startDate:"a data inicial",endDate:"a data final",currentDate:"a data atual",afterDate:"A data deve ser igual ou posterior a {label}.",beforeDate:"A data deve ser igual ou anterior a {label}.",startMonth:"Por favor selecione uma data inicial.",sameMonth:"Estas duas datas devem ter o mesmo mês - você deve modificar uma das duas.",creditcard:"O número do cartão de crédito informado é inválido. Por favor verifique o valor e tente novamente. {length} números informados."}),Locale.define("pt-BR","Number",{decimal:",",group:".",currency:{prefix:"R$ "}}),Locale.define("pt-PT","FormValidator",{required:"Este campo é necessário.",minLength:"Digite pelo menos{minLength} caracteres (comprimento {length} caracteres).",maxLength:"Não insira mais de {maxLength} caracteres (comprimento {length} caracteres).",integer:"Digite um número inteiro neste domínio. Com números decimais (por exemplo, 1,25), não são permitidas.",numeric:'Digite apenas valores numéricos neste domínio (p.ex., "1" ou "1.1" ou "-1" ou "-1,1").',digits:"Por favor, use números e pontuação apenas neste campo (p.ex., um número de telefone com traços ou pontos é permitida).",alpha:"Por favor use somente letras (a-z), com nesta área. Não utilize espaços nem outros caracteres são permitidos.",alphanum:"Use somente letras (a-z) ou números (0-9) neste campo. Não utilize espaços nem outros caracteres são permitidos.",dateSuchAs:"Digite uma data válida, como {date}",dateInFormatMDY:'Digite uma data válida, como DD/MM/YYYY (p.ex. "31/12/1999")',email:'Digite um endereço de email válido. Por exemplo "fred@domain.com".',url:"Digite uma URL válida, como http://www.example.com.",currencyDollar:"Digite um valor válido $. Por exemplo $ 100,00. ",oneRequired:"Digite algo para pelo menos um desses insumos.",errorPrefix:"Erro: ",warningPrefix:"Aviso: "}),function(){var e=function(e,t,i,n,s){var a=e%10,r=e%100;return 1==a&&11!=r?t:2!=a&&3!=a&&4!=a||12==r||13==r||14==r?0==a||5==a||6==a||7==a||8==a||9==a||11==r||12==r||13==r||14==r?n:s:i};Locale.define("ru-RU","Date",{months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],months_abbr:["янв","февр","март","апр","май","июнь","июль","авг","сент","окт","нояб","дек"],days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],days_abbr:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],dateOrder:["date","month","year"],shortDate:"%d.%m.%Y",shortTime:"%H:%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:"",lessThanMinuteAgo:"меньше минуты назад",minuteAgo:"минуту назад",minutesAgo:function(t){return"{delta} "+e(t,"минуту","минуты","минут")+" назад"},hourAgo:"час назад",hoursAgo:function(t){return"{delta} "+e(t,"час","часа","часов")+" назад"},dayAgo:"вчера",daysAgo:function(t){return"{delta} "+e(t,"день","дня","дней")+" назад"},weekAgo:"неделю назад",weeksAgo:function(t){return"{delta} "+e(t,"неделя","недели","недель")+" назад"},monthAgo:"месяц назад",monthsAgo:function(t){return"{delta} "+e(t,"месяц","месяца","месяцев")+" назад"},yearAgo:"год назад",yearsAgo:function(t){return"{delta} "+e(t,"год","года","лет")+" назад"},lessThanMinuteUntil:"меньше чем через минуту",minuteUntil:"через минуту",minutesUntil:function(t){return"через {delta} "+e(t,"минуту","минуты","минут")},hourUntil:"через час",hoursUntil:function(t){return"через {delta} "+e(t,"час","часа","часов")},dayUntil:"завтра",daysUntil:function(t){return"через {delta} "+e(t,"день","дня","дней")},weekUntil:"через неделю",weeksUntil:function(t){return"через {delta} "+e(t,"неделю","недели","недель")},monthUntil:"через месяц",monthsUntil:function(t){return"через {delta} "+e(t,"месяц","месяца","месяцев")},yearUntil:"через",yearsUntil:function(t){return"через {delta} "+e(t,"год","года","лет")}})}(),Locale.define("ru-RU","FormValidator",{required:"Это поле обязательно к заполнению.",minLength:"Пожалуйста, введите хотя бы {minLength} символов (Вы ввели {length}).",maxLength:"Пожалуйста, введите не больше {maxLength} символов (Вы ввели {length}).",integer:"Пожалуйста, введите в это поле число. Дробные числа (например 1.25) тут не разрешены.",numeric:'Пожалуйста, введите в это поле число (например "1" или "1.1", или "-1", или "-1.1").',digits:"В этом поле Вы можете использовать только цифры и знаки пунктуации (например, телефонный номер со знаками дефиса или с точками).",alpha:"В этом поле можно использовать только латинские буквы (a-z). Пробелы и другие символы запрещены.",alphanum:"В этом поле можно использовать только латинские буквы (a-z) и цифры (0-9). Пробелы и другие символы запрещены.",dateSuchAs:"Пожалуйста, введите корректную дату {date}",dateInFormatMDY:'Пожалуйста, введите дату в формате ММ/ДД/ГГГГ (например "12/31/1999")',email:'Пожалуйста, введите корректный емейл-адрес. Для примера "fred@domain.com".',url:"Пожалуйста, введите правильную ссылку вида http://www.example.com.",currencyDollar:"Пожалуйста, введите сумму в долларах. Например: $100.00 .",oneRequired:"Пожалуйста, выберите хоть что-нибудь в одном из этих полей.",errorPrefix:"Ошибка: ",warningPrefix:"Внимание: "}),function(){var e=function(e,t,i,n){return 1==e?t:2==e||3==e||4==e?i:n};Locale.define("sk-SK","Date",{months:["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"],months_abbr:["januára","februára","marca","apríla","mája","júna","júla","augusta","septembra","októbra","novembra","decembra"],days:["Nedele","Pondelí","Úterý","Streda","Čtvrtek","Pátek","Sobota"],days_abbr:["ne","po","ut","st","št","pi","so"],dateOrder:["date","month","year"],shortDate:"%d.%m.%Y",shortTime:"%H:%M",AM:"dop.",PM:"pop.",firstDayOfWeek:1,ordinal:".",lessThanMinuteAgo:"pred chvíľou",minuteAgo:"približne pred minútou",minutesAgo:function(t){return"pred {delta} "+e(t,"minútou","minútami","minútami")},hourAgo:"približne pred hodinou",hoursAgo:function(t){return"pred {delta} "+e(t,"hodinou","hodinami","hodinami")},dayAgo:"pred dňom",daysAgo:function(t){return"pred {delta} "+e(t,"dňom","dňami","dňami")},weekAgo:"pred týždňom",weeksAgo:function(t){return"pred {delta} "+e(t,"týždňom","týždňami","týždňami")},monthAgo:"pred mesiacom",monthsAgo:function(t){return"pred {delta} "+e(t,"mesiacom","mesiacmi","mesiacmi")},yearAgo:"pred rokom",yearsAgo:function(t){return"pred {delta} "+e(t,"rokom","rokmi","rokmi")},lessThanMinuteUntil:"o chvíľu",minuteUntil:"približne o minútu",minutesUntil:function(t){return"o {delta} "+e(t,"minútu","minúty","minúty")},hourUntil:"približne o hodinu",hoursUntil:function(t){return"o {delta} "+e(t,"hodinu","hodiny","hodín")},dayUntil:"o deň",daysUntil:function(t){return"o {delta} "+e(t,"deň","dni","dní")},weekUntil:"o týždeň",weeksUntil:function(t){return"o {delta} "+e(t,"týždeň","týždne","týždňov")},monthUntil:"o mesiac",monthsUntil:function(t){return"o {delta} "+e(t,"mesiac","mesiace","mesiacov")},yearUntil:"o rok",yearsUntil:function(t){return"o {delta} "+e(t,"rok","roky","rokov")}})}(),Locale.define("sk-SK","FormValidator",{required:"Táto položka je povinná.",minLength:"Zadajte prosím aspoň {minLength} znakov (momentálne {length} znakov).",maxLength:"Zadajte prosím menej ako {maxLength} znakov (momentálne {length} znakov).",integer:"Zadajte prosím celé číslo. Desetinné čísla (napr. 1.25) nie sú povolené.",numeric:"Zadajte len číselné hodnoty (t.j. „1“ alebo „1.1“ alebo „-1“ alebo „-1.1“).",digits:"Zadajte prosím len čísla a interpunkčné znamienka (napríklad telefónne číslo s pomlčkami albo bodkami je povolené).",alpha:"Zadajte prosím len písmená (a-z). Medzery alebo iné znaky nie sú povolené.",alphanum:"Zadajte prosím len písmená (a-z) alebo číslice (0-9). Medzery alebo iné znaky nie sú povolené.",dateSuchAs:"Zadajte prosím platný dátum v tvare {date}",dateInFormatMDY:"Zadajte prosím platný datum v tvare MM / DD / RRRR (t.j. „12/31/1999“)",email:"Zadajte prosím platnú emailovú adresu. Napríklad „fred@domain.com“.",url:"Zadajte prosím platnoú adresu URL v tvare http://www.example.com.",currencyDollar:"Zadajte prosím platnú čiastku. Napríklad $100.00.",oneRequired:"Zadajte prosím aspoň jednu hodnotu z týchto položiek.",errorPrefix:"Chyba: ",warningPrefix:"Upozornenie: ",noSpace:"V tejto položle nie sú povolené medzery",reqChkByNode:"Nie sú vybrané žiadne položky.",requiredChk:"Táto položka je povinná.",reqChkByName:"Prosím vyberte {label}.",match:"Táto položka sa musí zhodovať s položkou {matchName}",startDate:"dátum začiatku",endDate:"dátum ukončenia",currendDate:"aktuálny dátum",afterDate:"Dátum by mal býť rovnaký alebo väčší ako {label}.",beforeDate:"Dátum by mal byť rovnaký alebo menší ako {label}.",startMonth:"Vyberte počiatočný mesiac.",sameMonth:"Tieto dva dátumy musia býť v rovnakom mesiaci - zmeňte jeden z nich.",creditcard:"Zadané číslo kreditnej karty je neplatné. Prosím, opravte ho. Bolo zadaných {length} číslic."}),function(){var e=function(e,t,i,n,s){return e>=1&&e<=3?arguments[e]:s};Locale.define("sl-SI","Date",{months:["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"],months_abbr:["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec"],days:["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"],days_abbr:["ned","pon","tor","sre","čet","pet","sob"],dateOrder:["date","month","year"],shortDate:"%d.%m.%Y",shortTime:"%H.%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:".",lessThanMinuteAgo:"manj kot minuto nazaj",minuteAgo:"minuto nazaj",minutesAgo:function(t){return"{delta} "+e(t,"minuto","minuti","minute","minut")+" nazaj"},hourAgo:"uro nazaj",hoursAgo:function(t){return"{delta} "+e(t,"uro","uri","ure","ur")+" nazaj"},dayAgo:"dan nazaj",daysAgo:function(t){return"{delta} "+e(t,"dan","dneva","dni","dni")+" nazaj"},weekAgo:"teden nazaj",weeksAgo:function(t){return"{delta} "+e(t,"teden","tedna","tedne","tednov")+" nazaj"},monthAgo:"mesec nazaj",monthsAgo:function(t){return"{delta} "+e(t,"mesec","meseca","mesece","mesecov")+" nazaj"},yearthAgo:"leto nazaj",yearsAgo:function(t){return"{delta} "+e(t,"leto","leti","leta","let")+" nazaj"},lessThanMinuteUntil:"še manj kot minuto",minuteUntil:"še minuta",minutesUntil:function(t){return"še {delta} "+e(t,"minuta","minuti","minute","minut")},hourUntil:"še ura",hoursUntil:function(t){return"še {delta} "+e(t,"ura","uri","ure","ur")},dayUntil:"še dan",daysUntil:function(t){return"še {delta} "+e(t,"dan","dneva","dnevi","dni")},weekUntil:"še tedn",weeksUntil:function(t){return"še {delta} "+e(t,"teden","tedna","tedni","tednov")},monthUntil:"še mesec",monthsUntil:function(t){return"še {delta} "+e(t,"mesec","meseca","meseci","mesecov")},yearUntil:"še leto",yearsUntil:function(t){return"še {delta} "+e(t,"leto","leti","leta","let")}})}(),Locale.define("sl-SI","FormValidator",{required:"To polje je obvezno",minLength:"Prosim, vnesite vsaj {minLength} znakov (vnesli ste {length} znakov).",maxLength:"Prosim, ne vnesite več kot {maxLength} znakov (vnesli ste {length} znakov).",integer:"Prosim, vnesite celo število. Decimalna števila (kot 1,25) niso dovoljena.",numeric:'Prosim, vnesite samo numerične vrednosti (kot "1" ali "1.1" ali "-1" ali "-1.1").',digits:"Prosim, uporabite številke in ločila le na tem polju (na primer, dovoljena je telefonska številka z pomišlaji ali pikami).",alpha:"Prosim, uporabite le črke v tem plju. Presledki in drugi znaki niso dovoljeni.",alphanum:"Prosim, uporabite samo črke ali številke v tem polju. Presledki in drugi znaki niso dovoljeni.",dateSuchAs:"Prosim, vnesite pravilen datum kot {date}",dateInFormatMDY:'Prosim, vnesite pravilen datum kot MM.DD.YYYY (primer "12.31.1999")',email:'Prosim, vnesite pravilen email naslov. Na primer "fred@domain.com".',url:"Prosim, vnesite pravilen URL kot http://www.example.com.",currencyDollar:"Prosim, vnesit epravilno vrednost €. Primer 100,00€ .",oneRequired:"Prosimo, vnesite nekaj za vsaj eno izmed teh polj.",errorPrefix:"Napaka: ",warningPrefix:"Opozorilo: ",noSpace:"To vnosno polje ne dopušča presledkov.",reqChkByNode:"Nič niste izbrali.",requiredChk:"To polje je obvezno",reqChkByName:"Prosim, izberite {label}.",match:"To polje se mora ujemati z poljem {matchName}",startDate:"datum začetka",endDate:"datum konca",currentDate:"trenuten datum",afterDate:"Datum bi moral biti isti ali po {label}.",beforeDate:"Datum bi moral biti isti ali pred {label}.",startMonth:"Prosim, vnesite začetni datum",sameMonth:"Ta dva datuma morata biti v istem mesecu - premeniti morate eno ali drugo.",creditcard:"Številka kreditne kartice ni pravilna. Preverite številko ali poskusite še enkrat. Vnešenih {length} znakov."}),Locale.define("sv-SE","Date",{months:["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],months_abbr:["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],days:["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],days_abbr:["sön","mån","tis","ons","tor","fre","lör"],dateOrder:["year","month","date"],shortDate:"%Y-%m-%d",shortTime:"%H:%M",AM:"",PM:"",firstDayOfWeek:1,ordinal:"",lessThanMinuteAgo:"mindre än en minut sedan",minuteAgo:"ungefär en minut sedan",minutesAgo:"{delta} minuter sedan",hourAgo:"ungefär en timme sedan",hoursAgo:"ungefär {delta} timmar sedan",dayAgo:"1 dag sedan",daysAgo:"{delta} dagar sedan",lessThanMinuteUntil:"mindre än en minut sedan",minuteUntil:"ungefär en minut sedan",minutesUntil:"{delta} minuter sedan",hourUntil:"ungefär en timme sedan",hoursUntil:"ungefär {delta} timmar sedan",dayUntil:"1 dag sedan",daysUntil:"{delta} dagar sedan"}),Locale.define("sv-SE","FormValidator",{required:"Fältet är obligatoriskt.",minLength:"Ange minst {minLength} tecken (du angav {length} tecken).",maxLength:"Ange högst {maxLength} tecken (du angav {length} tecken). ",integer:"Ange ett heltal i fältet. Tal med decimaler (t.ex. 1,25) är inte tillåtna.",numeric:'Ange endast numeriska värden i detta fält (t.ex. "1" eller "1.1" eller "-1" eller "-1,1").',digits:"Använd endast siffror och skiljetecken i detta fält (till exempel ett telefonnummer med bindestreck tillåtet).",alpha:"Använd endast bokstäver (a-ö) i detta fält. Inga mellanslag eller andra tecken är tillåtna.",alphanum:"Använd endast bokstäver (a-ö) och siffror (0-9) i detta fält. Inga mellanslag eller andra tecken är tillåtna.",dateSuchAs:"Ange ett giltigt datum som t.ex. {date}",dateInFormatMDY:'Ange ett giltigt datum som t.ex. YYYY-MM-DD (i.e. "1999-12-31")',email:'Ange en giltig e-postadress. Till exempel "erik@domain.com".',url:"Ange en giltig webbadress som http://www.example.com.",currencyDollar:"Ange en giltig belopp. Exempelvis 100,00.",oneRequired:"Vänligen ange minst ett av dessa alternativ.",errorPrefix:"Fel: ",warningPrefix:"Varning: ",noSpace:"Det får inte finnas några mellanslag i detta fält.",reqChkByNode:"Inga objekt är valda.",requiredChk:"Detta är ett obligatoriskt fält.",reqChkByName:"Välj en {label}.",match:"Detta fält måste matcha {matchName}",startDate:"startdatumet",endDate:"slutdatum",currentDate:"dagens datum",afterDate:"Datumet bör vara samma eller senare än {label}.",beforeDate:"Datumet bör vara samma eller tidigare än {label}.",startMonth:"Välj en start månad",sameMonth:"Dessa två datum måste vara i samma månad - du måste ändra det ena eller det andra."}),Locale.define("sv-SE","Number",{currency:{prefix:"SEK "}}).inherit("EU","Number"),Locale.define("tr-TR","Date",{months:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],months_abbr:["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],days:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],days_abbr:["Pa","Pzt","Sa","Ça","Pe","Cu","Cmt"],dateOrder:["date","month","year"],shortDate:"%d/%m/%Y",shortTime:"%H.%M",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:"",lessThanMinuteAgo:"bir dakikadan önce",minuteAgo:"yaklaşık bir dakika önce",minutesAgo:"{delta} dakika önce",hourAgo:"bir saat kadar önce",hoursAgo:"{delta} saat kadar önce",dayAgo:"bir gün önce",daysAgo:"{delta} gün önce",weekAgo:"bir hafta önce",weeksAgo:"{delta} hafta önce",monthAgo:"bir ay önce",monthsAgo:"{delta} ay önce",yearAgo:"bir yıl önce",yearsAgo:"{delta} yıl önce",lessThanMinuteUntil:"bir dakikadan az sonra",minuteUntil:"bir dakika kadar sonra",minutesUntil:"{delta} dakika sonra",hourUntil:"bir saat kadar sonra",hoursUntil:"{delta} saat kadar sonra",dayUntil:"bir gün sonra",daysUntil:"{delta} gün sonra",weekUntil:"bir hafta sonra",weeksUntil:"{delta} hafta sonra",monthUntil:"bir ay sonra",monthsUntil:"{delta} ay sonra",yearUntil:"bir yıl sonra",yearsUntil:"{delta} yıl sonra"}),Locale.define("tr-TR","FormValidator",{required:"Bu alan zorunlu.",minLength:"Lütfen en az {minLength} karakter girin (siz {length} karakter girdiniz).",maxLength:"Lütfen en fazla {maxLength} karakter girin (siz {length} karakter girdiniz).",integer:"Lütfen bu alana sadece tamsayı girin. Ondalıklı sayılar (ör: 1.25) kullanılamaz.",numeric:'Lütfen bu alana sadece sayısal değer girin (ör: "1", "1.1", "-1" ya da "-1.1").',digits:"Lütfen bu alana sadece sayısal değer ve noktalama işareti girin (örneğin, nokta ve tire içeren bir telefon numarası kullanılabilir).",alpha:"Lütfen bu alanda yalnızca harf kullanın. Boşluk ve diğer karakterler kullanılamaz.",alphanum:"Lütfen bu alanda sadece harf ve rakam kullanın. Boşluk ve diğer karakterler kullanılamaz.",dateSuchAs:"Lütfen geçerli bir tarih girin (Ör: {date})",dateInFormatMDY:'Lütfen geçerli bir tarih girin (GG/AA/YYYY, ör: "31/12/1999")',email:'Lütfen geçerli bir email adresi girin. Ör: "kemal@etikan.com".',url:"Lütfen geçerli bir URL girin. Ör: http://www.example.com.",currencyDollar:"Lütfen geçerli bir TL miktarı girin. Ör: 100,00 TL .",oneRequired:"Lütfen en az bir tanesini doldurun.",errorPrefix:"Hata: ",warningPrefix:"Uyarı: ",noSpace:"Bu alanda boşluk kullanılamaz.",reqChkByNode:"Hiçbir öğe seçilmemiş.",requiredChk:"Bu alan zorunlu.",reqChkByName:"Lütfen bir {label} girin.",match:"Bu alan, {matchName} alanıyla uyuşmalı",startDate:"başlangıç tarihi",endDate:"bitiş tarihi",currentDate:"bugünün tarihi",afterDate:"Tarih, {label} tarihiyle aynı gün ya da ondan sonra olmalıdır.",beforeDate:"Tarih, {label} tarihiyle aynı gün ya da ondan önce olmalıdır.",startMonth:"Lütfen bir başlangıç ayı seçin",sameMonth:"Bu iki tarih aynı ayda olmalı - bir tanesini değiştirmeniz gerekiyor.",creditcard:"Girdiğiniz kredi kartı numarası geçersiz. Lütfen kontrol edip tekrar deneyin. {length} hane girildi."}),Locale.define("tr-TR","Number",{currency:{decimals:0,suffix:" TL"}}).inherit("EU","Number"),function(){var e=function(e,t,i,n,s){var a=(e/10).toInt(),r=e%10;(e/100).toInt();return 1==a&&e>10?n:1==r?t:r>0&&r<5?i:n};Locale.define("uk-UA","Date",{months:["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],months_abbr:["Січ","Лют","Бер","Квіт","Трав","Черв","Лип","Серп","Вер","Жовт","Лист","Груд"],days:["Неділя","Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота"],days_abbr:["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],dateOrder:["date","month","year"],shortDate:"%d/%m/%Y",shortTime:"%H:%M",AM:"до полудня",PM:"по полудню",firstDayOfWeek:1,ordinal:"",lessThanMinuteAgo:"меньше хвилини тому",minuteAgo:"хвилину тому",minutesAgo:function(t){return"{delta} "+e(t,"хвилину","хвилини","хвилин")+" тому"},hourAgo:"годину тому",hoursAgo:function(t){return"{delta} "+e(t,"годину","години","годин")+" тому"},dayAgo:"вчора",daysAgo:function(t){return"{delta} "+e(t,"день","дня","днів")+" тому"},weekAgo:"тиждень тому",weeksAgo:function(t){return"{delta} "+e(t,"тиждень","тижні","тижнів")+" тому"},monthAgo:"місяць тому",monthsAgo:function(t){return"{delta} "+e(t,"місяць","місяці","місяців")+" тому"},yearAgo:"рік тому",yearsAgo:function(t){return"{delta} "+e(t,"рік","роки","років")+" тому"},lessThanMinuteUntil:"за мить",minuteUntil:"через хвилину",minutesUntil:function(t){return"через {delta} "+e(t,"хвилину","хвилини","хвилин")},hourUntil:"через годину",hoursUntil:function(t){return"через {delta} "+e(t,"годину","години","годин")},dayUntil:"завтра",daysUntil:function(t){return"через {delta} "+e(t,"день","дня","днів")},weekUntil:"через тиждень",weeksUntil:function(t){return"через {delta} "+e(t,"тиждень","тижні","тижнів")},monthUntil:"через місяць",monthesUntil:function(t){return"через {delta} "+e(t,"місяць","місяці","місяців")},yearUntil:"через рік",yearsUntil:function(t){return"через {delta} "+e(t,"рік","роки","років")}})}(),Locale.define("uk-UA","FormValidator",{required:"Це поле повинне бути заповненим.",minLength:"Введіть хоча б {minLength} символів (Ви ввели {length}).",maxLength:"Кількість символів не може бути більше {maxLength} (Ви ввели {length}).",integer:"Введіть в це поле число. Дробові числа (наприклад 1.25) не дозволені.",numeric:'Введіть в це поле число (наприклад "1" або "1.1", або "-1", або "-1.1").',digits:"В цьому полі ви можете використовувати лише цифри і знаки пунктіації (наприклад, телефонний номер з знаками дефізу або з крапками).",alpha:"В цьому полі можна використовувати лише латинські літери (a-z). Пробіли і інші символи заборонені.",alphanum:"В цьому полі можна використовувати лише латинські літери (a-z) і цифри (0-9). Пробіли і інші символи заборонені.",dateSuchAs:"Введіть коректну дату {date}.",dateInFormatMDY:'Введіть дату в форматі ММ/ДД/РРРР (наприклад "12/31/2009").',email:'Введіть коректну адресу електронної пошти (наприклад "name@domain.com").',url:"Введіть коректне інтернет-посилання (наприклад http://www.example.com).",currencyDollar:'Введіть суму в доларах (наприклад "$100.00").',oneRequired:"Заповніть одне з полів.",errorPrefix:"Помилка: ",warningPrefix:"Увага: ",noSpace:"Пробіли заборонені.",reqChkByNode:"Не відмічено жодного варіанту.",requiredChk:"Це поле повинне бути віміченим.",reqChkByName:"Будь ласка, відмітьте {label}.",match:"Це поле повинно відповідати {matchName}",startDate:"початкова дата",endDate:"кінцева дата",currentDate:"сьогоднішня дата",afterDate:"Ця дата повинна бути такою ж, або пізнішою за {label}.",beforeDate:"Ця дата повинна бути такою ж, або ранішою за {label}.",startMonth:"Будь ласка, виберіть початковий місяць",sameMonth:"Ці дати повинні відноситись одного і того ж місяця. Будь ласка, змініть одну з них.",creditcard:"Номер кредитної карти введений неправильно. Будь ласка, перевірте його. Введено {length} символів."}),Locale.define("zh-CHS","Date",{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],months_abbr:["一","二","三","四","五","六","七","八","九","十","十一","十二"],days:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],days_abbr:["日","一","二","三","四","五","六"],dateOrder:["year","month","date"],shortDate:"%Y-%m-%d",shortTime:"%I:%M%p",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:"",lessThanMinuteAgo:"不到1分钟前",minuteAgo:"大约1分钟前",minutesAgo:"{delta}分钟之前",hourAgo:"大约1小时前",hoursAgo:"大约{delta}小时前",dayAgo:"1天前",daysAgo:"{delta}天前",weekAgo:"1星期前",weeksAgo:"{delta}星期前",monthAgo:"1个月前",monthsAgo:"{delta}个月前",yearAgo:"1年前",yearsAgo:"{delta}年前",lessThanMinuteUntil:"从现在开始不到1分钟",minuteUntil:"从现在开始約1分钟",minutesUntil:"从现在开始约{delta}分钟",hourUntil:"从现在开始1小时",hoursUntil:"从现在开始约{delta}小时",dayUntil:"从现在开始1天",daysUntil:"从现在开始{delta}天",weekUntil:"从现在开始1星期",weeksUntil:"从现在开始{delta}星期",monthUntil:"从现在开始一个月",monthsUntil:"从现在开始{delta}个月",yearUntil:"从现在开始1年",yearsUntil:"从现在开始{delta}年"}),Locale.define("zh-CHT","Date",{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],months_abbr:["一","二","三","四","五","六","七","八","九","十","十一","十二"],days:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],days_abbr:["日","一","二","三","四","五","六"],dateOrder:["year","month","date"],shortDate:"%Y-%m-%d",shortTime:"%I:%M%p",AM:"AM",PM:"PM",firstDayOfWeek:1,ordinal:"",lessThanMinuteAgo:"不到1分鐘前",minuteAgo:"大約1分鐘前",minutesAgo:"{delta}分鐘之前",hourAgo:"大約1小時前",hoursAgo:"大約{delta}小時前",dayAgo:"1天前",daysAgo:"{delta}天前",weekAgo:"1星期前",weeksAgo:"{delta}星期前",monthAgo:"1个月前",monthsAgo:"{delta}个月前",yearAgo:"1年前",yearsAgo:"{delta}年前",lessThanMinuteUntil:"從現在開始不到1分鐘",minuteUntil:"從現在開始約1分鐘",minutesUntil:"從現在開始約{delta}分鐘",hourUntil:"從現在開始1小時",hoursUntil:"從現在開始約{delta}小時",dayUntil:"從現在開始1天",daysUntil:"從現在開始{delta}天",weekUntil:"從現在開始1星期",weeksUntil:"從現在開始{delta}星期",monthUntil:"從現在開始一個月",monthsUntil:"從現在開始{delta}個月",yearUntil:"從現在開始1年",yearsUntil:"從現在開始{delta}年"}),Locale.define("zh-CHS","FormValidator",{required:"此项必填。",minLength:"请至少输入 {minLength} 个字符 (已输入 {length} 个)。",maxLength:"最多只能输入 {maxLength} 个字符 (已输入 {length} 个)。",integer:'请输入一个整数，不能包含小数点。例如："1", "200"。',numeric:'请输入一个数字，例如："1", "1.1", "-1", "-1.1"。',digits:"请输入由数字和标点符号组成的内容。例如电话号码。",alpha:"请输入 A-Z 的 26 个字母，不能包含空格或任何其他字符。",alphanum:"请输入 A-Z 的 26 个字母或 0-9 的 10 个数字，不能包含空格或任何其他字符。",dateSuchAs:"请输入合法的日期格式，如：{date}。",dateInFormatMDY:'请输入合法的日期格式，例如：YYYY-MM-DD ("2010-12-31")。',email:'请输入合法的电子信箱地址，例如："fred@domain.com"。',url:"请输入合法的 Url 地址，例如：http://www.example.com。",currencyDollar:"请输入合法的货币符号，例如：￥100.0",oneRequired:"请至少选择一项。",errorPrefix:"错误：",warningPrefix:"警告：",noSpace:"不能包含空格。",reqChkByNode:"未选择任何内容。",requiredChk:"此项必填。",reqChkByName:"请选择 {label}.",match:"必须与{matchName}相匹配",startDate:"起始日期",endDate:"结束日期",currentDate:"当前日期",afterDate:"日期必须等于或晚于 {label}.",beforeDate:"日期必须早于或等于 {label}.",startMonth:"请选择起始月份",sameMonth:"您必须修改两个日期中的一个，以确保它们在同一月份。",creditcard:"您输入的信用卡号码不正确。当前已输入{length}个字符。"}),Locale.define("zh-CHT","FormValidator",{required:"此項必填。 ",minLength:"請至少輸入{minLength} 個字符(已輸入{length} 個)。 ",maxLength:"最多只能輸入{maxLength} 個字符(已輸入{length} 個)。 ",integer:'請輸入一個整數，不能包含小數點。例如："1", "200"。 ',numeric:'請輸入一個數字，例如："1", "1.1", "-1", "-1.1"。 ',digits:"請輸入由數字和標點符號組成的內容。例如電話號碼。 ",alpha:"請輸入AZ 的26 個字母，不能包含空格或任何其他字符。 ",alphanum:"請輸入AZ 的26 個字母或0-9 的10 個數字，不能包含空格或任何其他字符。 ",dateSuchAs:"請輸入合法的日期格式，如：{date}。 ",dateInFormatMDY:'請輸入合法的日期格式，例如：YYYY-MM-DD ("2010-12-31")。 ',email:'請輸入合法的電子信箱地址，例如："fred@domain.com"。 ',url:"請輸入合法的Url 地址，例如：http://www.example.com。 ",currencyDollar:"請輸入合法的貨幣符號，例如：￥100.0",oneRequired:"請至少選擇一項。 ",errorPrefix:"錯誤：",warningPrefix:"警告：",noSpace:"不能包含空格。 ",reqChkByNode:"未選擇任何內容。 ",requiredChk:"此項必填。 ",reqChkByName:"請選擇 {label}.",match:"必須與{matchName}相匹配",startDate:"起始日期",endDate:"結束日期",currentDate:"當前日期",afterDate:"日期必須等於或晚於{label}.",beforeDate:"日期必須早於或等於{label}.",startMonth:"請選擇起始月份",sameMonth:"您必須修改兩個日期中的一個，以確保它們在同一月份。 ",creditcard:"您輸入的信用卡號碼不正確。當前已輸入{length}個字符。 "}),Form.Validator.add("validate-currency-yuan",{errorMsg:function(){return Form.Validator.getMsg("currencyYuan")},test:function(e){return Form.Validator.getValidator("IsEmpty").test(e)||/^￥?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(e.get("value"))}}),Locale.define("zh-CHS","Number",{currency:{prefix:"￥ "}}).inherit("en-US","Number"),Locale.define("zh-CHT").inherit("zh-CHS","Number"),Request.JSONP=new Class({Implements:[Chain,Events,Options],options:{onRequest:function(e){this.options.log&&window.console&&console.log&&console.log("JSONP retrieving script with url:"+e)},onError:function(e){this.options.log&&window.console&&console.warn&&console.warn("JSONP "+e+" will fail in Internet Explorer, which enforces a 2083 bytes length limit on URIs")},url:"",callbackKey:"callback",injectScript:document.head,data:"",link:"ignore",timeout:0,log:!1},initialize:function(e){this.setOptions(e)},send:function(e){if(!Request.prototype.check.call(this,e))return this;this.running=!0;var t=typeOf(e);"string"!=t&&"element"!=t||(e={data:e}),e=Object.merge(this.options,e||{});var i=e.data;switch(typeOf(i)){case"element":i=document.id(i).toQueryString();break;case"object":case"hash":i=Object.toQueryString(i)}var n=this.index=Request.JSONP.counter++,s="request_"+n,a=e.url+(e.url.test("\\?")?"&":"?")+e.callbackKey+"=Request.JSONP.request_map.request_"+n+(i?"&"+i:"");a.length>2083&&this.fireEvent("error",a),Request.JSONP.request_map[s]=function(){delete Request.JSONP.request_map[s],this.success(arguments,n)}.bind(this);var r=this.getScript(a).inject(e.injectScript);return this.fireEvent("request",[a,r]),e.timeout&&this.timeout.delay(e.timeout,this),this},getScript:function(e){return this.script||(this.script=new Element("script",{type:"text/javascript",async:!0,src:e})),this.script},success:function(e){this.running&&this.clear().fireEvent("complete",e).fireEvent("success",e).callChain()},cancel:function(){return this.running&&this.clear().fireEvent("cancel"),this},isRunning:function(){return!!this.running},clear:function(){return this.running=!1,this.script&&(this.script.destroy(),this.script=null),this},timeout:function(){return this.running&&(this.running=!1,this.fireEvent("timeout",[this.script.get("src"),this.script]).fireEvent("failure").cancel()),this}}),Request.JSONP.counter=0,Request.JSONP.request_map={},Request.implement({options:{initialDelay:5e3,delay:5e3,limit:6e4},startTimer:function(e){var t=function(){this.running||this.send({data:e})};return this.lastDelay=this.options.initialDelay,this.timer=t.delay(this.lastDelay,this),this.completeCheck=function(e){clearTimeout(this.timer),this.lastDelay=e?this.options.delay:(this.lastDelay+this.options.delay).min(this.options.limit),this.timer=t.delay(this.lastDelay,this)},this.addEvent("complete",this.completeCheck)},stopTimer:function(){return clearTimeout(this.timer),this.removeEvent("complete",this.completeCheck)}}),Request.Queue=new Class({Implements:[Options,Events],Binds:["attach","request","complete","cancel","success","failure","exception"],options:{stopOnFailure:!0,autoAdvance:!0,concurrent:1,requests:{}},initialize:function(e){var t;e&&(t=e.requests,delete e.requests),this.setOptions(e),this.requests={},this.queue=[],this.reqBinders={},t&&this.addRequests(t)},addRequest:function(e,t){return this.requests[e]=t,this.attach(e,t),this},addRequests:function(e){return Object.each(e,function(e,t){this.addRequest(t,e)},this),this},getName:function(e){return Object.keyOf(this.requests,e)},attach:function(e,t){return t._groupSend?this:(["request","complete","cancel","success","failure","exception"].each(function(i){this.reqBinders[e]||(this.reqBinders[e]={}),this.reqBinders[e][i]=function(){this["on"+i.capitalize()].apply(this,[e,t].append(arguments))}.bind(this),t.addEvent(i,this.reqBinders[e][i])},this),t._groupSend=t.send,t.send=function(i){return this.send(e,i),t}.bind(this),this)},removeRequest:function(e){var t="object"==typeOf(e)?this.getName(e):e;return(t||"string"==typeOf(t))&&(e=this.requests[t])?(["request","complete","cancel","success","failure","exception"].each(function(i){e.removeEvent(i,this.reqBinders[t][i])},this),e.send=e._groupSend,delete e._groupSend,this):this},getRunning:function(){return Object.filter(this.requests,function(e){return e.running})},isRunning:function(){return!!Object.keys(this.getRunning()).length},send:function(e,t){var i=function(){this.requests[e]._groupSend(t),
this.queue.erase(i)}.bind(this);return i.name=e,Object.keys(this.getRunning()).length>=this.options.concurrent||this.error&&this.options.stopOnFailure?this.queue.push(i):i(),this},hasNext:function(e){return e?!!this.queue.filter(function(t){return t.name==e}).length:!!this.queue.length},resume:function(){return this.error=!1,(this.options.concurrent-Object.keys(this.getRunning()).length).times(this.runNext,this),this},runNext:function(e){if(!this.queue.length)return this;if(e){var t;this.queue.each(function(i){t||i.name!=e||(t=!0,i())})}else this.queue[0]();return this},runAll:function(){return this.queue.each(function(e){e()}),this},clear:function(e){return e?this.queue=this.queue.map(function(t){return t.name!=e&&t}).filter(function(e){return e}):this.queue.empty(),this},cancel:function(e){return this.requests[e].cancel(),this},onRequest:function(){this.fireEvent("request",arguments)},onComplete:function(){this.fireEvent("complete",arguments),this.queue.length||this.fireEvent("end")},onCancel:function(){this.options.autoAdvance&&!this.error&&this.runNext(),this.fireEvent("cancel",arguments)},onSuccess:function(){this.options.autoAdvance&&!this.error&&this.runNext(),this.fireEvent("success",arguments)},onFailure:function(){this.error=!0,!this.options.stopOnFailure&&this.options.autoAdvance&&this.runNext(),this.fireEvent("failure",arguments)},onException:function(){this.error=!0,!this.options.stopOnFailure&&this.options.autoAdvance&&this.runNext(),this.fireEvent("exception",arguments)}}),function(e){Array.implement({min:function(){return Math.min.apply(null,this)},max:function(){return Math.max.apply(null,this)},average:function(){return this.length?this.sum()/this.length:0},sum:function(){var e=0,t=this.length;if(t)for(;t--;)null!=this[t]&&(e+=parseFloat(this[t]));return e},unique:function(){return[].combine(this)},shuffle:function(){for(var e=this.length;e&&--e;){var t=this[e],i=Math.floor(Math.random()*(e+1));this[e]=this[i],this[i]=t}return this},reduce:function(e,t){for(var i=0,n=this.length;i<n;i++)i in this&&(t=void 0===t?this[i]:e.call(null,t,this[i],i,this));return t},reduceRight:function(e,t){for(var i=this.length;i--;)i in this&&(t=void 0===t?this[i]:e.call(null,t,this[i],i,this));return t},pluck:function(e){return this.map(function(t){return t[e]})}})}(),Date.implement({timeDiffInWords:function(e){return Date.distanceOfTimeInWords(this,e||new Date)},timeDiff:function(e,t){null==e&&(e=new Date);for(var i,n,s=((e-this)/1e3).floor().abs(),a=[],r=[60,60,24,365,0],o=["s","m","h","d","y"],l=0;l<r.length&&(!l||s);l++)i=s,(n=r[l])&&(i=s%n,s=(s/n).floor()),a.unshift(i+(o[l]||""));return a.join(t||":")}}).extend({distanceOfTimeInWords:function(e,t){return Date.getTimePhrase(((t-e)/1e3).toInt())},getTimePhrase:function(e){var t=e<0?"Until":"Ago";e<0&&(e*=-1);var i={minute:60,hour:60,day:24,week:7,month:52/12,year:12,eon:1/0},n="lessThanMinute";for(var s in i){var a=i[s];if(e<1.5*a){e>.75*a&&(n=s);break}e/=a,n=s+"s"}return e=e.round(),Date.getMsg(n+t,e).substitute({delta:e})}}).defineParsers({re:/^(?:tod|tom|yes)/i,handler:function(e){var t=(new Date).clearTime();switch(e[0]){case"tom":return t.increment();case"yes":return t.decrement();default:return t}}},{re:/^(next|last) ([a-z]+)$/i,handler:function(e){var t=(new Date).clearTime(),i=t.getDay(),n=Date.parseDay(e[2],!0),s=n-i;return n<=i&&(s+=7),"last"==e[1]&&(s-=7),t.set("date",t.getDate()+s)}}).alias("timeAgoInWords","timeDiffInWords"),function(){if(!this.Hash){var e=this.Hash=new Type("Hash",function(e){"hash"==typeOf(e)&&(e=Object.clone(e.getClean()));for(var t in e)this[t]=e[t];return this});this.$H=function(t){return new e(t)},e.implement({forEach:function(e,t){Object.forEach(this,e,t)},getClean:function(){var e={};for(var t in this)this.hasOwnProperty(t)&&(e[t]=this[t]);return e},getLength:function(){var e=0;for(var t in this)this.hasOwnProperty(t)&&e++;return e}}),e.alias("each","forEach"),e.implement({has:Object.prototype.hasOwnProperty,keyOf:function(e){return Object.keyOf(this,e)},hasValue:function(e){return Object.contains(this,e)},extend:function(t){return e.each(t||{},function(t,i){e.set(this,i,t)},this),this},combine:function(t){return e.each(t||{},function(t,i){e.include(this,i,t)},this),this},erase:function(e){return this.hasOwnProperty(e)&&delete this[e],this},get:function(e){return this.hasOwnProperty(e)?this[e]:null},set:function(e,t){return this[e]&&!this.hasOwnProperty(e)||(this[e]=t),this},empty:function(){return e.each(this,function(e,t){delete this[t]},this),this},include:function(e,t){return void 0==this[e]&&(this[e]=t),this},map:function(t,i){return new e(Object.map(this,t,i))},filter:function(t,i){return new e(Object.filter(this,t,i))},every:function(e,t){return Object.every(this,e,t)},some:function(e,t){return Object.some(this,e,t)},getKeys:function(){return Object.keys(this)},getValues:function(){return Object.values(this)},toQueryString:function(e){return Object.toQueryString(this,e)}}),e.alias({indexOf:"keyOf",contains:"hasValue"})}}(),Hash.implement({getFromPath:function(e){return Object.getFromPath(this,e)},cleanValues:function(e){return new Hash(Object.cleanValues(this,e))},run:function(){Object.run(arguments)}}),Number.implement({format:function(e){var t=this;e=e?Object.clone(e):{};var i=function(t){return null!=e[t]?e[t]:Locale.get("Number."+t)},n=t<0,s=i("decimal"),a=i("precision"),r=i("group"),o=i("decimals");if(n){var l=i("negative")||{};null==l.prefix&&null==l.suffix&&(l.prefix="-"),["prefix","suffix"].each(function(t){l[t]&&(e[t]=i(t)+l[t])}),t=-t}var h=i("prefix"),u=i("suffix");""!==o&&o>=0&&o<=20&&(t=t.toFixed(o)),a>=1&&a<=21&&(t=(+t).toPrecision(a)),t+="";var d;if(!1===i("scientific")&&t.indexOf("e")>-1){var c=t.split("e"),m=+c[1];if(t=c[0].replace(".",""),m<0){for(m=-m-1,d=c[0].indexOf("."),d>-1&&(m-=d-1);m--;)t="0"+t;t="0."+t}else for(d=c[0].lastIndexOf("."),d>-1&&(m-=c[0].length-d-1);m--;)t+="0"}if("."!=s&&(t=t.replace(".",s)),r){d=t.lastIndexOf(s),d=d>-1?d:t.length;for(var g=t.substring(d),p=d;p--;)(d-p-1)%3==0&&p!=d-1&&(g=r+g),g=t.charAt(p)+g;t=g}return h&&(t=h+t),u&&(t+=u),t},formatCurrency:function(e){var t=Locale.get("Number.currency")||{};return null==t.scientific&&(t.scientific=!1),t.decimals=null!=e?e:null==t.decimals?2:t.decimals,this.format(t)},formatPercentage:function(e){var t=Locale.get("Number.percentage")||{};return null==t.suffix&&(t.suffix="%"),t.decimals=null!=e?e:null==t.decimals?2:t.decimals,this.format(t)}}),function(){var e=function(){return this.get("value")},t=this.URI=new Class({Implements:Options,options:{},regex:/^(?:(\w+):)?(?:\/\/(?:(?:([^:@\/]*):?([^:@\/]*))?@)?(\[[A-Fa-f0-9:]+\]|[^:\/?#]*)(?::(\d*))?)?(\.\.?$|(?:[^?#\/]*\/)*)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,parts:["scheme","user","password","host","port","directory","file","query","fragment"],schemes:{http:80,https:443,ftp:21,rtsp:554,mms:1755,file:0},initialize:function(e,i){this.setOptions(i);var n=this.options.base||t.base;e||(e=n),e&&e.parsed?this.parsed=Object.clone(e.parsed):this.set("value",e.href||e.toString(),!!n&&new t(n))},parse:function(e,t){var i=e.match(this.regex);return!!i&&(i.shift(),this.merge(i.associate(this.parts),t))},merge:function(e,t){return!!(e&&e.scheme||t&&t.scheme)&&(t&&this.parts.every(function(i){return!e[i]&&(e[i]=t[i]||"",!0)}),e.port=e.port||this.schemes[e.scheme.toLowerCase()],e.directory=e.directory?this.parseDirectory(e.directory,t?t.directory:""):"/",e)},parseDirectory:function(e,i){if(e=("/"==e.substr(0,1)?"":i||"/")+e,!e.test(t.regs.directoryDot))return e;var n=[];return e.replace(t.regs.endSlash,"").split("/").each(function(e){".."==e&&n.length>0?n.pop():"."!=e&&n.push(e)}),n.join("/")+"/"},combine:function(e){return e.value||e.scheme+"://"+(e.user?e.user+(e.password?":"+e.password:"")+"@":"")+(e.host||"")+(e.port&&e.port!=this.schemes[e.scheme]?":"+e.port:"")+(e.directory||"/")+(e.file||"")+(e.query?"?"+e.query:"")+(e.fragment?"#"+e.fragment:"")},set:function(e,i,n){if("value"==e){var s=i.match(t.regs.scheme);s&&(s=s[1]),s&&null==this.schemes[s.toLowerCase()]?this.parsed={scheme:s,value:i}:this.parsed=this.parse(i,(n||this).parsed)||(s?{scheme:s,value:i}:{value:i})}else"data"==e?this.setData(i):this.parsed[e]=i;return this},get:function(e,t){switch(e){case"value":return this.combine(this.parsed,!!t&&t.parsed);case"data":return this.getData()}return this.parsed[e]||""},go:function(){document.location.href=this.toString()},toURI:function(){return this},getData:function(e,t){var i=this.get(t||"query");if(!i&&0!==i)return e?null:{};var n=i.parseQueryString();return e?n[e]:n},setData:function(e,t,i){if("string"==typeof e){var n=this.getData();n[arguments[0]]=arguments[1],e=n}else t&&(e=Object.merge(this.getData(null,i),e));return this.set(i||"query",Object.toQueryString(e))},clearData:function(e){return this.set(e||"query","")},toString:e,valueOf:e});t.regs={endSlash:/\/$/,scheme:/^(\w+):/,directoryDot:/\.\/|\.$/},t.base=new t(Array.convert(document.getElements("base[href]",!0)).getLast(),{base:document.location}),String.implement({toURI:function(e){return new t(this,e)}})}(),URI=Class.refactor(URI,{combine:function(e,t){if(!t||e.scheme!=t.scheme||e.host!=t.host||e.port!=t.port)return this.previous.apply(this,arguments);var i=e.file+(e.query?"?"+e.query:"")+(e.fragment?"#"+e.fragment:"");if(!t.directory)return(e.directory||(e.file?"":"./"))+i;var n,s=t.directory.split("/"),a=e.directory.split("/"),r="",o=0;for(n=0;n<s.length&&n<a.length&&s[n]==a[n];n++);for(o=0;o<s.length-n-1;o++)r+="../";for(o=n;o<a.length-1;o++)r+=a[o]+"/";return(r||(e.file?"":"./"))+i},toAbsolute:function(e){return e=new URI(e),e&&e.set("directory","").set("file",""),this.toRelative(e)},toRelative:function(e){return this.get("value",new URI(e))}}),function(){var e=this.Asset={javascript:function(e,t){t||(t={});var i=new Element("script",{src:e,type:"text/javascript"}),n=t.document||document,s=t.onload||t.onLoad;return delete t.onload,delete t.onLoad,delete t.document,s&&(i.addEventListener?i.addEvent("load",s):i.addEvent("readystatechange",function(){["loaded","complete"].contains(this.readyState)&&s.call(this)})),i.set(t).inject(n.head)},css:function(e,t){t||(t={});var i=t.onload||t.onLoad,n=t.document||document,s=t.timeout||3e3;["onload","onLoad","document"].each(function(e){delete t[e]});var a=new Element("link",{type:"text/css",rel:"stylesheet",media:"screen",href:e}).setProperties(t).inject(n.head);if(i){var r=!1,o=0,l=function(){for(var e=document.styleSheets,t=0;t<e.length;t++){var n=e[t],h=n.ownerNode?n.ownerNode:n.owningElement;if(h&&h==a)return r=!0,i.call(a)}if(o++,!r&&o<s/50)return setTimeout(l,50)};setTimeout(l,0)}return a},image:function(e,t){t||(t={});var i=new Image,n=document.id(i)||new Element("img");return["load","abort","error"].each(function(e){var s="on"+e,a="on"+e.capitalize(),r=t[s]||t[a]||function(){};delete t[a],delete t[s],i[s]=function(){i&&(n.parentNode||(n.width=i.width,n.height=i.height),i=i.onload=i.onabort=i.onerror=null,r.delay(1,n,n),n.fireEvent(e,n,1))}}),i.src=n.src=e,i&&i.complete&&i.onload.delay(1),n.set(t)},images:function(t,i){t=Array.convert(t);var n=function(){},s=0;return i=Object.merge({onComplete:n,onProgress:n,onError:n,properties:{}},i),new Elements(t.map(function(n,a){return e.image(n,Object.append(i.properties,{onload:function(){s++,i.onProgress.call(this,s,a,n),s==t.length&&i.onComplete()},onerror:function(){s++,i.onError.call(this,s,a,n),s==t.length&&i.onComplete()}}))}))}}}(),function(){var e=this.Color=new Type("Color",function(e,t){switch(arguments.length>=3?(t="rgb",e=Array.slice(arguments,0,3)):"string"==typeof e&&(e=e.match(/rgb/)?e.rgbToHex().hexToRgb(!0):e.match(/hsb/)?e.hsbToRgb():e.hexToRgb(!0)),t=t||"rgb"){case"hsb":var i=e;e=e.hsbToRgb(),e.hsb=i;break;case"hex":e=e.hexToRgb(!0)}return e.rgb=e.slice(0,3),e.hsb=e.hsb||e.rgbToHsb(),e.hex=e.rgbToHex(),Object.append(e,this)});e.implement({mix:function(){var t=Array.slice(arguments),i="number"==typeOf(t.getLast())?t.pop():50,n=this.slice();return t.each(function(t){t=new e(t);for(var s=0;s<3;s++)n[s]=Math.round(n[s]/100*(100-i)+t[s]/100*i)}),new e(n,"rgb")},invert:function(){return new e(this.map(function(e){return 255-e}))},setHue:function(t){return new e([t,this.hsb[1],this.hsb[2]],"hsb")},setSaturation:function(t){return new e([this.hsb[0],t,this.hsb[2]],"hsb")},setBrightness:function(t){return new e([this.hsb[0],this.hsb[1],t],"hsb")}}),this.$RGB=function(t,i,n){return new e([t,i,n],"rgb")},this.$HSB=function(t,i,n){return new e([t,i,n],"hsb")},this.$HEX=function(t){return new e(t,"hex")},Array.implement({rgbToHsb:function(){var e=this[0],t=this[1],i=this[2],n=0,s=Math.max(e,t,i),a=Math.min(e,t,i),r=s-a,o=s/255,l=0!=s?r/s:0;if(0!=l){var h=(s-e)/r,u=(s-t)/r,d=(s-i)/r;n=e==s?d-u:t==s?2+h-d:4+u-h,n/=6,n<0&&n++}return[Math.round(360*n),Math.round(100*l),Math.round(100*o)]},hsbToRgb:function(){var e=Math.round(this[2]/100*255);if(0==this[1])return[e,e,e];var t=this[0]%360,i=t%60,n=Math.round(this[2]*(100-this[1])/1e4*255),s=Math.round(this[2]*(6e3-this[1]*i)/6e5*255),a=Math.round(this[2]*(6e3-this[1]*(60-i))/6e5*255);switch(Math.floor(t/60)){case 0:return[e,a,n];case 1:return[s,e,n];case 2:return[n,e,a];case 3:return[n,s,e];case 4:return[a,n,e];case 5:return[e,n,s]}return!1}}),String.implement({rgbToHsb:function(){var e=this.match(/\d{1,3}/g);return e?e.rgbToHsb():null},hsbToRgb:function(){var e=this.match(/\d{1,3}/g);return e?e.hsbToRgb():null}})}(),function(){this.Group=new Class({initialize:function(){this.instances=Array.flatten(arguments)},addEvent:function(e,t){var i=this.instances,n=i.length,s=n,a=new Array(n),r=this;i.each(function(o,l){o.addEvent(e,function(){a[l]||s--,a[l]=arguments,s||(t.call(r,i,o,a),s=n,a=new Array(n))})})}})}(),Hash.Cookie=new Class({Extends:Cookie,options:{autoSave:!0},initialize:function(e,t){this.parent(e,t),this.load()},save:function(){var e=JSON.encode(this.hash);return!(!e||e.length>4096)&&("{}"==e?this.dispose():this.write(e),!0)},load:function(){return this.hash=new Hash(JSON.decode(this.read(),!0)),this}}),Hash.each(Hash.prototype,function(e,t){"function"==typeof e&&Hash.Cookie.implement(t,function(){var t=e.apply(this.hash,arguments);return this.options.autoSave&&this.save(),t})}),function(){var Swiff=this.Swiff=new Class({Implements:Options,options:{id:null,height:1,width:1,container:null,properties:{},params:{quality:"high",allowScriptAccess:"always",wMode:"window",swLiveConnect:!0},callBacks:{},vars:{}},toElement:function(){return this.object},initialize:function(e,t){this.instance="Swiff_"+String.uniqueID(),this.setOptions(t),t=this.options;var i=this.id=t.id||this.instance,n=document.id(t.container);Swiff.CallBacks[this.instance]={};var s=t.params,a=t.vars,r=t.callBacks,o=Object.append({height:t.height,width:t.width},t.properties),l=this;for(var h in r)Swiff.CallBacks[this.instance][h]=function(e){return function(){return e.apply(l.object,arguments)}}(r[h]),a[h]="Swiff.CallBacks."+this.instance+"."+h;s.flashVars=Object.toQueryString(a),"ActiveXObject"in window?(o.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",s.movie=e):o.type="application/x-shockwave-flash",o.data=e;var u='<object id="'+i+'"';for(var d in o)u+=" "+d+'="'+o[d]+'"';u+=">";for(var c in s)s[c]&&(u+='<param name="'+c+'" value="'+s[c]+'" />');u+="</object>",this.object=(n?n.empty():new Element("div")).set("html",u).firstChild},replaces:function(e){return e=document.id(e,!0),e.parentNode.replaceChild(this.toElement(),e),this},inject:function(e){return document.id(e,!0).appendChild(this.toElement()),this},remote:function(){return Swiff.remote.apply(Swiff,[this.toElement()].append(arguments))}});Swiff.CallBacks={},Swiff.remote=function(obj,fn){var rs=obj.CallFunction('<invoke name="'+fn+'" returntype="javascript">'+__flash__argumentsToXML(arguments,2)+"</invoke>");return eval(rs)}}(),function(){var e=this.Table=function(){this.length=0;var e=[],t=[];this.set=function(i,n){var s=e.indexOf(i);if(-1==s){var a=e.length;e[a]=i,t[a]=n,this.length++}else t[s]=n;return this},this.get=function(i){var n=e.indexOf(i);return-1==n?null:t[n]},this.erase=function(i){var n=e.indexOf(i);return-1!=n?(this.length--,e.splice(n,1),t.splice(n,1)[0]):null},this.each=this.forEach=function(i,n){for(var s=0,a=this.length;s<a;s++)i.call(n,e[s],t[s],this)}};this.Type&&new Type("Table",e)}(); 

/**  /plugins/content/hs_highlighter/lib/scripts/shCore.js  */

 eval(function(h,b,j,f,g,i){g=function(a){return(a<b?"":g(parseInt(a/b)))+((a=a%b)>35?String.fromCharCode(a+29):a.toString(36))};if(!"".replace(/^/,String)){while(j--){i[g(j)]=f[j]||g(j)}f=[function(a){return i[a]}];g=function(){return"\\w+"};j=1}while(j--){if(f[j]){h=h.replace(new RegExp("\\b"+g(j)+"\\b","g"),f[j])}}return h}('K M;I(M)1S 2U("2a\'t 4k M 4K 2g 3l 4G 4H");(6(){6 r(f,e){I(!M.1R(f))1S 3m("3s 15 4R");K a=f.1w;f=M(f.1m,t(f)+(e||""));I(a)f.1w={1m:a.1m,19:a.19?a.19.1a(0):N};H f}6 t(f){H(f.1J?"g":"")+(f.4s?"i":"")+(f.4p?"m":"")+(f.4v?"x":"")+(f.3n?"y":"")}6 B(f,e,a,b){K c=u.L,d,h,g;v=R;5K{O(;c--;){g=u[c];I(a&g.3r&&(!g.2p||g.2p.W(b))){g.2q.12=e;I((h=g.2q.X(f))&&h.P===e){d={3k:g.2b.W(b,h,a),1C:h};1N}}}}5v(i){1S i}5q{v=11}H d}6 p(f,e,a){I(3b.Z.1i)H f.1i(e,a);O(a=a||0;a<f.L;a++)I(f[a]===e)H a;H-1}M=6(f,e){K a=[],b=M.1B,c=0,d,h;I(M.1R(f)){I(e!==1d)1S 3m("2a\'t 5r 5I 5F 5B 5C 15 5E 5p");H r(f)}I(v)1S 2U("2a\'t W 3l M 59 5m 5g 5x 5i");e=e||"";O(d={2N:11,19:[],2K:6(g){H e.1i(g)>-1},3d:6(g){e+=g}};c<f.L;)I(h=B(f,c,b,d)){a.U(h.3k);c+=h.1C[0].L||1}Y I(h=n.X.W(z[b],f.1a(c))){a.U(h[0]);c+=h[0].L}Y{h=f.3a(c);I(h==="[")b=M.2I;Y I(h==="]")b=M.1B;a.U(h);c++}a=15(a.1K(""),n.Q.W(e,w,""));a.1w={1m:f,19:d.2N?d.19:N};H a};M.3v="1.5.0";M.2I=1;M.1B=2;K C=/\\$(?:(\\d\\d?|[$&`\'])|{([$\\w]+)})/g,w=/[^5h]+|([\\s\\S])(?=[\\s\\S]*\\1)/g,A=/^(?:[?*+]|{\\d+(?:,\\d*)?})\\??/,v=11,u=[],n={X:15.Z.X,1A:15.Z.1A,1C:1r.Z.1C,Q:1r.Z.Q,1e:1r.Z.1e},x=n.X.W(/()??/,"")[1]===1d,D=6(){K f=/^/g;n.1A.W(f,"");H!f.12}(),y=6(){K f=/x/g;n.Q.W("x",f,"");H!f.12}(),E=15.Z.3n!==1d,z={};z[M.2I]=/^(?:\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S]))/;z[M.1B]=/^(?:\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\d*|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S])|\\(\\?[:=!]|[?*+]\\?|{\\d+(?:,\\d*)?}\\??)/;M.1h=6(f,e,a,b){u.U({2q:r(f,"g"+(E?"y":"")),2b:e,3r:a||M.1B,2p:b||N})};M.2n=6(f,e){K a=f+"/"+(e||"");H M.2n[a]||(M.2n[a]=M(f,e))};M.3c=6(f){H r(f,"g")};M.5l=6(f){H f.Q(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g,"\\\\$&")};M.5e=6(f,e,a,b){e=r(e,"g"+(b&&E?"y":""));e.12=a=a||0;f=e.X(f);H b?f&&f.P===a?f:N:f};M.3q=6(){M.1h=6(){1S 2U("2a\'t 55 1h 54 3q")}};M.1R=6(f){H 53.Z.1q.W(f)==="[2m 15]"};M.3p=6(f,e,a,b){O(K c=r(e,"g"),d=-1,h;h=c.X(f);){a.W(b,h,++d,f,c);c.12===h.P&&c.12++}I(e.1J)e.12=0};M.57=6(f,e){H 6 a(b,c){K d=e[c].1I?e[c]:{1I:e[c]},h=r(d.1I,"g"),g=[],i;O(i=0;i<b.L;i++)M.3p(b[i],h,6(k){g.U(d.3j?k[d.3j]||"":k[0])});H c===e.L-1||!g.L?g:a(g,c+1)}([f],0)};15.Z.1p=6(f,e){H J.X(e[0])};15.Z.W=6(f,e){H J.X(e)};15.Z.X=6(f){K e=n.X.1p(J,14),a;I(e){I(!x&&e.L>1&&p(e,"")>-1){a=15(J.1m,n.Q.W(t(J),"g",""));n.Q.W(f.1a(e.P),a,6(){O(K c=1;c<14.L-2;c++)I(14[c]===1d)e[c]=1d})}I(J.1w&&J.1w.19)O(K b=1;b<e.L;b++)I(a=J.1w.19[b-1])e[a]=e[b];!D&&J.1J&&!e[0].L&&J.12>e.P&&J.12--}H e};I(!D)15.Z.1A=6(f){(f=n.X.W(J,f))&&J.1J&&!f[0].L&&J.12>f.P&&J.12--;H!!f};1r.Z.1C=6(f){M.1R(f)||(f=15(f));I(f.1J){K e=n.1C.1p(J,14);f.12=0;H e}H f.X(J)};1r.Z.Q=6(f,e){K a=M.1R(f),b,c;I(a&&1j e.58()==="3f"&&e.1i("${")===-1&&y)H n.Q.1p(J,14);I(a){I(f.1w)b=f.1w.19}Y f+="";I(1j e==="6")c=n.Q.W(J,f,6(){I(b){14[0]=1f 1r(14[0]);O(K d=0;d<b.L;d++)I(b[d])14[0][b[d]]=14[d+1]}I(a&&f.1J)f.12=14[14.L-2]+14[0].L;H e.1p(N,14)});Y{c=J+"";c=n.Q.W(c,f,6(){K d=14;H n.Q.W(e,C,6(h,g,i){I(g)5b(g){24"$":H"$";24"&":H d[0];24"`":H d[d.L-1].1a(0,d[d.L-2]);24"\'":H d[d.L-1].1a(d[d.L-2]+d[0].L);5a:i="";g=+g;I(!g)H h;O(;g>d.L-3;){i=1r.Z.1a.W(g,-1)+i;g=1Q.3i(g/10)}H(g?d[g]||"":"$")+i}Y{g=+i;I(g<=d.L-3)H d[g];g=b?p(b,i):-1;H g>-1?d[g+1]:h}})})}I(a&&f.1J)f.12=0;H c};1r.Z.1e=6(f,e){I(!M.1R(f))H n.1e.1p(J,14);K a=J+"",b=[],c=0,d,h;I(e===1d||+e<0)e=5D;Y{e=1Q.3i(+e);I(!e)H[]}O(f=M.3c(f);d=f.X(a);){I(f.12>c){b.U(a.1a(c,d.P));d.L>1&&d.P<a.L&&3b.Z.U.1p(b,d.1a(1));h=d[0].L;c=f.12;I(b.L>=e)1N}f.12===d.P&&f.12++}I(c===a.L){I(!n.1A.W(f,"")||h)b.U("")}Y b.U(a.1a(c));H b.L>e?b.1a(0,e):b};M.1h(/\\(\\?#[^)]*\\)/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?"":"(?:)"});M.1h(/\\((?!\\?)/,6(){J.19.U(N);H"("});M.1h(/\\(\\?<([$\\w]+)>/,6(f){J.19.U(f[1]);J.2N=R;H"("});M.1h(/\\\\k<([\\w$]+)>/,6(f){K e=p(J.19,f[1]);H e>-1?"\\\\"+(e+1)+(3R(f.2S.3a(f.P+f[0].L))?"":"(?:)"):f[0]});M.1h(/\\[\\^?]/,6(f){H f[0]==="[]"?"\\\\b\\\\B":"[\\\\s\\\\S]"});M.1h(/^\\(\\?([5A]+)\\)/,6(f){J.3d(f[1]);H""});M.1h(/(?:\\s+|#.*)+/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?"":"(?:)"},M.1B,6(){H J.2K("x")});M.1h(/\\./,6(){H"[\\\\s\\\\S]"},M.1B,6(){H J.2K("s")})})();1j 2e!="1d"&&(2e.M=M);K 1v=6(){6 r(a,b){a.1l.1i(b)!=-1||(a.1l+=" "+b)}6 t(a){H a.1i("3e")==0?a:"3e"+a}6 B(a){H e.1Y.2A[t(a)]}6 p(a,b,c){I(a==N)H N;K d=c!=R?a.3G:[a.2G],h={"#":"1c",".":"1l"}[b.1o(0,1)]||"3h",g,i;g=h!="3h"?b.1o(1):b.5u();I((a[h]||"").1i(g)!=-1)H a;O(a=0;d&&a<d.L&&i==N;a++)i=p(d[a],b,c);H i}6 C(a,b){K c={},d;O(d 2g a)c[d]=a[d];O(d 2g b)c[d]=b[d];H c}6 w(a,b,c,d){6 h(g){g=g||1P.5y;I(!g.1F){g.1F=g.52;g.3N=6(){J.5w=11}}c.W(d||1P,g)}a.3g?a.3g("4U"+b,h):a.4y(b,h,11)}6 A(a,b){K c=e.1Y.2j,d=N;I(c==N){c={};O(K h 2g e.1U){K g=e.1U[h];d=g.4x;I(d!=N){g.1V=h.4w();O(g=0;g<d.L;g++)c[d[g]]=h}}e.1Y.2j=c}d=e.1U[c[a]];d==N&&b!=11&&1P.1X(e.13.1x.1X+(e.13.1x.3E+a));H d}6 v(a,b){O(K c=a.1e("\\n"),d=0;d<c.L;d++)c[d]=b(c[d],d);H c.1K("\\n")}6 u(a,b){I(a==N||a.L==0||a=="\\n")H a;a=a.Q(/</g,"&1y;");a=a.Q(/ {2,}/g,6(c){O(K d="",h=0;h<c.L-1;h++)d+=e.13.1W;H d+" "});I(b!=N)a=v(a,6(c){I(c.L==0)H"";K d="";c=c.Q(/^(&2s;| )+/,6(h){d=h;H""});I(c.L==0)H d;H d+\'<17 1g="\'+b+\'">\'+c+"</17>"});H a}6 n(a,b){a.1e("\\n");O(K c="",d=0;d<50;d++)c+="                    ";H a=v(a,6(h){I(h.1i("\\t")==-1)H h;O(K g=0;(g=h.1i("\\t"))!=-1;)h=h.1o(0,g)+c.1o(0,b-g%b)+h.1o(g+1,h.L);H h})}6 x(a){H a.Q(/^\\s+|\\s+$/g,"")}6 D(a,b){I(a.P<b.P)H-1;Y I(a.P>b.P)H 1;Y I(a.L<b.L)H-1;Y I(a.L>b.L)H 1;H 0}6 y(a,b){6 c(k){H k[0]}O(K d=N,h=[],g=b.2D?b.2D:c;(d=b.1I.X(a))!=N;){K i=g(d,b);I(1j i=="3f")i=[1f e.2L(i,d.P,b.23)];h=h.1O(i)}H h}6 E(a){K b=/(.*)((&1G;|&1y;).*)/;H a.Q(e.3A.3M,6(c){K d="",h=N;I(h=b.X(c)){c=h[1];d=h[2]}H\'<a 2h="\'+c+\'">\'+c+"</a>"+d})}6 z(){O(K a=1E.36("1k"),b=[],c=0;c<a.L;c++)a[c].3s=="20"&&b.U(a[c]);H b}6 f(a){a=a.1F;K b=p(a,".20",R);a=p(a,".3O",R);K c=1E.4i("3t");I(!(!a||!b||p(a,"3t"))){B(b.1c);r(b,"1m");O(K d=a.3G,h=[],g=0;g<d.L;g++)h.U(d[g].4z||d[g].4A);h=h.1K("\\r");c.39(1E.4D(h));a.39(c);c.2C();c.4C();w(c,"4u",6(){c.2G.4E(c);b.1l=b.1l.Q("1m","")})}}I(1j 3F!="1d"&&1j M=="1d")M=3F("M").M;K e={2v:{"1g-27":"","2i-1s":1,"2z-1s-2t":11,1M:N,1t:N,"42-45":R,"43-22":4,1u:R,16:R,"3V-17":R,2l:11,"41-40":R,2k:11,"1z-1k":11},13:{1W:"&2s;",2M:R,46:11,44:11,34:"4n",1x:{21:"4o 1m",2P:"?",1X:"1v\\n\\n",3E:"4r\'t 4t 1D O: ",4g:"4m 4B\'t 51 O 1z-1k 4F: ",37:\'<!4T 1z 4S "-//4V//3H 4W 1.0 4Z//4Y" "1Z://2y.3L.3K/4X/3I/3H/3I-4P.4J"><1z 4I="1Z://2y.3L.3K/4L/5L"><3J><4N 1Z-4M="5G-5M" 6K="2O/1z; 6J=6I-8" /><1t>6L 1v</1t></3J><3B 1L="25-6M:6Q,6P,6O,6N-6F;6y-2f:#6x;2f:#6w;25-22:6v;2O-3D:3C;"><T 1L="2O-3D:3C;3w-32:1.6z;"><T 1L="25-22:6A-6E;">1v</T><T 1L="25-22:.6C;3w-6B:6R;"><T>3v 3.0.76 (72 73 3x)</T><T><a 2h="1Z://3u.2w/1v" 1F="38" 1L="2f:#3y">1Z://3u.2w/1v</a></T><T>70 17 6U 71.</T><T>6T 6X-3x 6Y 6D.</T></T><T>6t 61 60 J 1k, 5Z <a 2h="6u://2y.62.2w/63-66/65?64=5X-5W&5P=5O" 1L="2f:#3y">5R</a> 5V <2R/>5U 5T 5S!</T></T></3B></1z>\'}},1Y:{2j:N,2A:{}},1U:{},3A:{6n:/\\/\\*[\\s\\S]*?\\*\\//2c,6m:/\\/\\/.*$/2c,6l:/#.*$/2c,6k:/"([^\\\\"\\n]|\\\\.)*"/g,6o:/\'([^\\\\\'\\n]|\\\\.)*\'/g,6p:1f M(\'"([^\\\\\\\\"]|\\\\\\\\.)*"\',"3z"),6s:1f M("\'([^\\\\\\\\\']|\\\\\\\\.)*\'","3z"),6q:/(&1y;|<)!--[\\s\\S]*?--(&1G;|>)/2c,3M:/\\w+:\\/\\/[\\w-.\\/?%&=:@;]*/g,6a:{18:/(&1y;|<)\\?=?/g,1b:/\\?(&1G;|>)/g},69:{18:/(&1y;|<)%=?/g,1b:/%(&1G;|>)/g},6d:{18:/(&1y;|<)\\s*1k.*?(&1G;|>)/2T,1b:/(&1y;|<)\\/\\s*1k\\s*(&1G;|>)/2T}},16:{1H:6(a){6 b(i,k){H e.16.2o(i,k,e.13.1x[k])}O(K c=\'<T 1g="16">\',d=e.16.2x,h=d.2X,g=0;g<h.L;g++)c+=(d[h[g]].1H||b)(a,h[g]);c+="</T>";H c},2o:6(a,b,c){H\'<2W><a 2h="#" 1g="6e 6h\'+b+" "+b+\'">\'+c+"</a></2W>"},2b:6(a){K b=a.1F,c=b.1l||"";b=B(p(b,".20",R).1c);K d=6(h){H(h=15(h+"6f(\\\\w+)").X(c))?h[1]:N}("6g");b&&d&&e.16.2x[d].2B(b);a.3N()},2x:{2X:["21","2P"],21:{1H:6(a){I(a.V("2l")!=R)H"";K b=a.V("1t");H e.16.2o(a,"21",b?b:e.13.1x.21)},2B:6(a){a=1E.6j(t(a.1c));a.1l=a.1l.Q("47","")}},2P:{2B:6(){K a="68=0";a+=", 18="+(31.30-33)/2+", 32="+(31.2Z-2Y)/2+", 30=33, 2Z=2Y";a=a.Q(/^,/,"");a=1P.6Z("","38",a);a.2C();K b=a.1E;b.6W(e.13.1x.37);b.6V();a.2C()}}}},35:6(a,b){K c;I(b)c=[b];Y{c=1E.36(e.13.34);O(K d=[],h=0;h<c.L;h++)d.U(c[h]);c=d}c=c;d=[];I(e.13.2M)c=c.1O(z());I(c.L===0)H d;O(h=0;h<c.L;h++){O(K g=c[h],i=a,k=c[h].1l,j=3W 0,l={},m=1f M("^\\\\[(?<2V>(.*?))\\\\]$"),s=1f M("(?<27>[\\\\w-]+)\\\\s*:\\\\s*(?<1T>[\\\\w-%#]+|\\\\[.*?\\\\]|\\".*?\\"|\'.*?\')\\\\s*;?","g");(j=s.X(k))!=N;){K o=j.1T.Q(/^[\'"]|[\'"]$/g,"");I(o!=N&&m.1A(o)){o=m.X(o);o=o.2V.L>0?o.2V.1e(/\\s*,\\s*/):[]}l[j.27]=o}g={1F:g,1n:C(i,l)};g.1n.1D!=N&&d.U(g)}H d},1M:6(a,b){K c=J.35(a,b),d=N,h=e.13;I(c.L!==0)O(K g=0;g<c.L;g++){b=c[g];K i=b.1F,k=b.1n,j=k.1D,l;I(j!=N){I(k["1z-1k"]=="R"||e.2v["1z-1k"]==R){d=1f e.4l(j);j="4O"}Y I(d=A(j))d=1f d;Y 6H;l=i.3X;I(h.2M){l=l;K m=x(l),s=11;I(m.1i("<![6G[")==0){m=m.4h(9);s=R}K o=m.L;I(m.1i("]]\\>")==o-3){m=m.4h(0,o-3);s=R}l=s?m:l}I((i.1t||"")!="")k.1t=i.1t;k.1D=j;d.2Q(k);b=d.2F(l);I((i.1c||"")!="")b.1c=i.1c;i.2G.74(b,i)}}},2E:6(a){w(1P,"4k",6(){e.1M(a)})}};e.2E=e.2E;e.1M=e.1M;e.2L=6(a,b,c){J.1T=a;J.P=b;J.L=a.L;J.23=c;J.1V=N};e.2L.Z.1q=6(){H J.1T};e.4l=6(a){6 b(j,l){O(K m=0;m<j.L;m++)j[m].P+=l}K c=A(a),d,h=1f e.1U.5Y,g=J,i="2F 1H 2Q".1e(" ");I(c!=N){d=1f c;O(K k=0;k<i.L;k++)(6(){K j=i[k];g[j]=6(){H h[j].1p(h,14)}})();d.28==N?1P.1X(e.13.1x.1X+(e.13.1x.4g+a)):h.2J.U({1I:d.28.17,2D:6(j){O(K l=j.17,m=[],s=d.2J,o=j.P+j.18.L,F=d.28,q,G=0;G<s.L;G++){q=y(l,s[G]);b(q,o);m=m.1O(q)}I(F.18!=N&&j.18!=N){q=y(j.18,F.18);b(q,j.P);m=m.1O(q)}I(F.1b!=N&&j.1b!=N){q=y(j.1b,F.1b);b(q,j.P+j[0].5Q(j.1b));m=m.1O(q)}O(j=0;j<m.L;j++)m[j].1V=c.1V;H m}})}};e.4j=6(){};e.4j.Z={V:6(a,b){K c=J.1n[a];c=c==N?b:c;K d={"R":R,"11":11}[c];H d==N?c:d},3Y:6(a){H 1E.4i(a)},4c:6(a,b){K c=[];I(a!=N)O(K d=0;d<a.L;d++)I(1j a[d]=="2m")c=c.1O(y(b,a[d]));H J.4e(c.6b(D))},4e:6(a){O(K b=0;b<a.L;b++)I(a[b]!==N)O(K c=a[b],d=c.P+c.L,h=b+1;h<a.L&&a[b]!==N;h++){K g=a[h];I(g!==N)I(g.P>d)1N;Y I(g.P==c.P&&g.L>c.L)a[b]=N;Y I(g.P>=c.P&&g.P<d)a[h]=N}H a},4d:6(a){K b=[],c=2u(J.V("2i-1s"));v(a,6(d,h){b.U(h+c)});H b},3U:6(a){K b=J.V("1M",[]);I(1j b!="2m"&&b.U==N)b=[b];a:{a=a.1q();K c=3W 0;O(c=c=1Q.6c(c||0,0);c<b.L;c++)I(b[c]==a){b=c;1N a}b=-1}H b!=-1},2r:6(a,b,c){a=["1s","6i"+b,"P"+a,"6r"+(b%2==0?1:2).1q()];J.3U(b)&&a.U("67");b==0&&a.U("1N");H\'<T 1g="\'+a.1K(" ")+\'">\'+c+"</T>"},3Q:6(a,b){K c="",d=a.1e("\\n").L,h=2u(J.V("2i-1s")),g=J.V("2z-1s-2t");I(g==R)g=(h+d-1).1q().L;Y I(3R(g)==R)g=0;O(K i=0;i<d;i++){K k=b?b[i]:h+i,j;I(k==0)j=e.13.1W;Y{j=g;O(K l=k.1q();l.L<j;)l="0"+l;j=l}a=j;c+=J.2r(i,k,a)}H c},49:6(a,b){a=x(a);K c=a.1e("\\n");J.V("2z-1s-2t");K d=2u(J.V("2i-1s"));a="";O(K h=J.V("1D"),g=0;g<c.L;g++){K i=c[g],k=/^(&2s;|\\s)+/.X(i),j=N,l=b?b[g]:d+g;I(k!=N){j=k[0].1q();i=i.1o(j.L);j=j.Q(" ",e.13.1W)}i=x(i);I(i.L==0)i=e.13.1W;a+=J.2r(g,l,(j!=N?\'<17 1g="\'+h+\' 5N">\'+j+"</17>":"")+i)}H a},4f:6(a){H a?"<4a>"+a+"</4a>":""},4b:6(a,b){6 c(l){H(l=l?l.1V||g:g)?l+" ":""}O(K d=0,h="",g=J.V("1D",""),i=0;i<b.L;i++){K k=b[i],j;I(!(k===N||k.L===0)){j=c(k);h+=u(a.1o(d,k.P-d),j+"48")+u(k.1T,j+k.23);d=k.P+k.L+(k.75||0)}}h+=u(a.1o(d),c()+"48");H h},1H:6(a){K b="",c=["20"],d;I(J.V("2k")==R)J.1n.16=J.1n.1u=11;1l="20";J.V("2l")==R&&c.U("47");I((1u=J.V("1u"))==11)c.U("6S");c.U(J.V("1g-27"));c.U(J.V("1D"));a=a.Q(/^[ ]*[\\n]+|[\\n]*[ ]*$/g,"").Q(/\\r/g," ");b=J.V("43-22");I(J.V("42-45")==R)a=n(a,b);Y{O(K h="",g=0;g<b;g++)h+=" ";a=a.Q(/\\t/g,h)}a=a;a:{b=a=a;h=/<2R\\s*\\/?>|&1y;2R\\s*\\/?&1G;/2T;I(e.13.46==R)b=b.Q(h,"\\n");I(e.13.44==R)b=b.Q(h,"");b=b.1e("\\n");h=/^\\s*/;g=4Q;O(K i=0;i<b.L&&g>0;i++){K k=b[i];I(x(k).L!=0){k=h.X(k);I(k==N){a=a;1N a}g=1Q.4q(k[0].L,g)}}I(g>0)O(i=0;i<b.L;i++)b[i]=b[i].1o(g);a=b.1K("\\n")}I(1u)d=J.4d(a);b=J.4c(J.2J,a);b=J.4b(a,b);b=J.49(b,d);I(J.V("41-40"))b=E(b);1j 2H!="1d"&&2H.3S&&2H.3S.1C(/5s/)&&c.U("5t");H b=\'<T 1c="\'+t(J.1c)+\'" 1g="\'+c.1K(" ")+\'">\'+(J.V("16")?e.16.1H(J):"")+\'<3Z 5z="0" 5H="0" 5J="0">\'+J.4f(J.V("1t"))+"<3T><3P>"+(1u?\'<2d 1g="1u">\'+J.3Q(a)+"</2d>":"")+\'<2d 1g="17"><T 1g="3O">\'+b+"</T></2d></3P></3T></3Z></T>"},2F:6(a){I(a===N)a="";J.17=a;K b=J.3Y("T");b.3X=J.1H(a);J.V("16")&&w(p(b,".16"),"5c",e.16.2b);J.V("3V-17")&&w(p(b,".17"),"56",f);H b},2Q:6(a){J.1c=""+1Q.5d(1Q.5n()*5k).1q();e.1Y.2A[t(J.1c)]=J;J.1n=C(e.2v,a||{});I(J.V("2k")==R)J.1n.16=J.1n.1u=11},5j:6(a){a=a.Q(/^\\s+|\\s+$/g,"").Q(/\\s+/g,"|");H"\\\\b(?:"+a+")\\\\b"},5f:6(a){J.28={18:{1I:a.18,23:"1k"},1b:{1I:a.1b,23:"1k"},17:1f M("(?<18>"+a.18.1m+")(?<17>.*?)(?<1b>"+a.1b.1m+")","5o")}}};H e}();1j 2e!="1d"&&(2e.1v=1v);',62,441,"||||||function|||||||||||||||||||||||||||||||||||||return|if|this|var|length|XRegExp|null|for|index|replace|true||div|push|getParam|call|exec|else|prototype||false|lastIndex|config|arguments|RegExp|toolbar|code|left|captureNames|slice|right|id|undefined|split|new|class|addToken|indexOf|typeof|script|className|source|params|substr|apply|toString|String|line|title|gutter|SyntaxHighlighter|_xregexp|strings|lt|html|test|OUTSIDE_CLASS|match|brush|document|target|gt|getHtml|regex|global|join|style|highlight|break|concat|window|Math|isRegExp|throw|value|brushes|brushName|space|alert|vars|http|syntaxhighlighter|expandSource|size|css|case|font|Fa|name|htmlScript|dA|can|handler|gm|td|exports|color|in|href|first|discoveredBrushes|light|collapse|object|cache|getButtonHtml|trigger|pattern|getLineHtml|nbsp|numbers|parseInt|defaults|com|items|www|pad|highlighters|execute|focus|func|all|getDiv|parentNode|navigator|INSIDE_CLASS|regexList|hasFlag|Match|useScriptTags|hasNamedCapture|text|help|init|br|input|gi|Error|values|span|list|250|height|width|screen|top|500|tagName|findElements|getElementsByTagName|aboutDialog|_blank|appendChild|charAt|Array|copyAsGlobal|setFlag|highlighter_|string|attachEvent|nodeName|floor|backref|output|the|TypeError|sticky|Za|iterate|freezeTokens|scope|type|textarea|alexgorbatchev|version|margin|2010|005896|gs|regexLib|body|center|align|noBrush|require|childNodes|DTD|xhtml1|head|org|w3|url|preventDefault|container|tr|getLineNumbersHtml|isNaN|userAgent|tbody|isLineHighlighted|quick|void|innerHTML|create|table|links|auto|smart|tab|stripBrs|tabs|bloggerMode|collapsed|plain|getCodeLinesHtml|caption|getMatchesHtml|findMatches|figureOutLineNumbers|removeNestedMatches|getTitleHtml|brushNotHtmlScript|substring|createElement|Highlighter|load|HtmlScript|Brush|pre|expand|multiline|min|Can|ignoreCase|find|blur|extended|toLowerCase|aliases|addEventListener|innerText|textContent|wasn|select|createTextNode|removeChild|option|same|frame|xmlns|dtd|twice|1999|equiv|meta|htmlscript|transitional|1E3|expected|PUBLIC|DOCTYPE|on|W3C|XHTML|TR|EN|Transitional||configured|srcElement|Object|after|run|dblclick|matchChain|valueOf|constructor|default|switch|click|round|execAt|forHtmlScript|token|gimy|functions|getKeywords|1E6|escape|within|random|sgi|another|finally|supply|MSIE|ie|toUpperCase|catch|returnValue|definition|event|border|imsx|constructing|one|Infinity|from|when|Content|cellpadding|flags|cellspacing|try|xhtml|Type|spaces|2930402|hosted_button_id|lastIndexOf|donate|active|development|keep|to|xclick|_s|Xml|please|like|you|paypal|cgi|cmd|webscr|bin|highlighted|scrollbars|aspScriptTags|phpScriptTags|sort|max|scriptScriptTags|toolbar_item|_|command|command_|number|getElementById|doubleQuotedString|singleLinePerlComments|singleLineCComments|multiLineCComments|singleQuotedString|multiLineDoubleQuotedString|xmlComments|alt|multiLineSingleQuotedString|If|https|1em|000|fff|background|5em|xx|bottom|75em|Gorbatchev|large|serif|CDATA|continue|utf|charset|content|About|family|sans|Helvetica|Arial|Geneva|3em|nogutter|Copyright|syntax|close|write|2004|Alex|open|JavaScript|highlighter|July|02|replaceChild|offset|83".split("|"),0,{}));eval(function(h,b,j,f,g,i){g=function(a){return(a<b?"":g(parseInt(a/b)))+((a=a%b)>35?String.fromCharCode(a+29):a.toString(36))};if(!"".replace(/^/,String)){while(j--){i[g(j)]=f[j]||g(j)}f=[function(a){return i[a]}];g=function(){return"\\w+"};j=1}while(j--){if(f[j]){h=h.replace(new RegExp("\\b"+g(j)+"\\b","g"),f[j])}}return h}('(2(){1 h=5;h.I=2(){2 n(c,a){4(1 d=0;d<c.9;d++)i[c[d]]=a}2 o(c){1 a=r.H("J"),d=3;a.K=c;a.M="L/t";a.G="t";a.u=a.v=2(){6(!d&&(!8.7||8.7=="F"||8.7=="z")){d=q;e[c]=q;a:{4(1 p y e)6(e[p]==3)B a;j&&5.C(k)}a.u=a.v=x;a.D.O(a)}};r.N.R(a)}1 f=Q,l=h.P(),i={},e={},j=3,k=x,b;5.T=2(c){k=c;j=q};4(b=0;b<f.9;b++){1 m=f[b].w?f[b]:f[b].S(/\\s+/),g=m.w();n(m,g)}4(b=0;b<l.9;b++)6(g=i[l[b].E.A]){e[g]=3;o(g)}}})();',56,56,"|var|function|false|for|SyntaxHighlighter|if|readyState|this|length|||||||||||||||||true|document||javascript|onload|onreadystatechange|pop|null|in|complete|brush|break|highlight|parentNode|params|loaded|language|createElement|autoloader|script|src|text|type|body|removeChild|findElements|arguments|appendChild|split|all".split("|"),0,{})); 

/**  /media/system/js/modal.js  */

 var SqueezeBox={presets:{onOpen:function(){},onClose:function(){},onUpdate:function(){},onResize:function(){},onMove:function(){},onShow:function(){},onHide:function(){},size:{x:600,y:450},sizeLoading:{x:200,y:150},marginInner:{x:20,y:20},marginImage:{x:50,y:75},handler:!1,target:null,closable:!0,closeBtn:!0,zIndex:65555,overlayOpacity:0.7,classWindow:"",classOverlay:"",overlayFx:{},resizeFx:{},contentFx:{},parse:!1,parseSecure:!1,shadow:!0,overlay:!0,document:null,ajaxOptions:{}},initialize:function(b){if(this.options){return this}this.presets=Object.merge(this.presets,b);this.doc=this.presets.document||document;this.options={};this.setOptions(this.presets).build();this.bound={window:this.reposition.bind(this,[null]),scroll:this.checkTarget.bind(this),close:this.close.bind(this),key:this.onKey.bind(this)};this.isOpen=this.isLoading=!1;return this},build:function(){this.overlay=new Element("div",{id:"sbox-overlay","aria-hidden":"true",styles:{zIndex:this.options.zIndex},tabindex:-1});this.win=new Element("div",{id:"sbox-window",role:"dialog","aria-hidden":"true",styles:{zIndex:this.options.zIndex+2}});if(this.options.shadow){if(Browser.chrome||Browser.safari&&3<=Browser.version||Browser.opera&&10.5<=Browser.version||Browser.firefox&&3.5<=Browser.version||Browser.ie&&9<=Browser.version){this.win.addClass("shadow")}else{if(!Browser.ie6){var d=(new Element("div",{"class":"sbox-bg-wrap"})).inject(this.win),c=function(b){this.overlay.fireEvent("click",[b])}.bind(this);"n,ne,e,se,s,sw,w,nw".split(",").each(function(a){(new Element("div",{"class":"sbox-bg sbox-bg-"+a})).inject(d).addEvent("click",c)})}}}this.content=(new Element("div",{id:"sbox-content"})).inject(this.win);this.closeBtn=(new Element("a",{id:"sbox-btn-close",href:"#",role:"button"})).inject(this.win);this.closeBtn.setProperty("aria-controls","sbox-window");this.fx={overlay:(new Fx.Tween(this.overlay,Object.merge({property:"opacity",onStart:Events.prototype.clearChain,duration:250,link:"cancel"},this.options.overlayFx))).set(0),win:new Fx.Morph(this.win,Object.merge({onStart:Events.prototype.clearChain,unit:"px",duration:750,transition:Fx.Transitions.Quint.easeOut,link:"cancel",unit:"px"},this.options.resizeFx)),content:(new Fx.Tween(this.content,Object.merge({property:"opacity",duration:250,link:"cancel"},this.options.contentFx))).set(0)};document.id(this.doc.body).adopt(this.overlay,this.win)},assign:function(d,c){return(document.id(d)||$$(d)).addEvent("click",function(){return !SqueezeBox.fromElement(this,c)})},open:function(f,e){this.initialize();null!=this.element&&this.trash();this.element=document.id(f)||!1;this.setOptions(Object.merge(this.presets,e||{}));if(this.element&&this.options.parse){var h=this.element.getProperty(this.options.parse);h&&(h=JSON.decode(h,this.options.parseSecure))&&this.setOptions(h)}this.url=(this.element?this.element.get("href"):f)||this.options.url||"";this.assignOptions();var g=g||this.options.handler;return g?this.setContent(g,this.parsers[g].call(this,!0)):this.parsers.some(function(i,d){var j=i.call(this);return j?(this.setContent(d,j),!0):!1},this)},fromElement:function(d,c){return this.open(d,c)},assignOptions:function(){this.overlay.addClass(this.options.classOverlay);this.win.addClass(this.options.classWindow)},close:function(d){var c="domevent"==typeOf(d);c&&d.stop();if(!this.isOpen||c&&!Function.from(this.options.closable).call(this,d)){return this}this.fx.overlay.start(0).chain(this.toggleOverlay.bind(this));this.win.setProperty("aria-hidden","true");this.fireEvent("onClose",[this.content]);this.trash();this.toggleListeners();this.isOpen=!1;return this},trash:function(){this.element=this.asset=null;this.content.empty();this.options={};this.removeEvents().setOptions(this.presets).callChain()},onError:function(){this.asset=null;this.setContent("string",this.options.errorMsg||"An error occurred")},setContent:function(d,c){if(!this.handlers[d]){return !1}this.content.className="sbox-content-"+d;this.applyTimer=this.applyContent.delay(this.fx.overlay.options.duration,this,this.handlers[d].call(this,c));if(this.overlay.retrieve("opacity")){return this}this.toggleOverlay(!0);this.fx.overlay.start(this.options.overlayOpacity);return this.reposition()},applyContent:function(d,c){if(this.isOpen||this.applyTimer){this.applyTimer=clearTimeout(this.applyTimer),this.hideContent(),d?(this.isLoading&&this.toggleLoading(!1),this.fireEvent("onUpdate",[this.content],20)):this.toggleLoading(!0),d&&(["string","array"].contains(typeOf(d))?this.content.set("html",d):d!==this.content&&this.content.contains(d)||this.content.adopt(d)),this.callChain(),this.isOpen?this.resize(c):(this.toggleListeners(!0),this.resize(c,!0),this.isOpen=!0,this.win.setProperty("aria-hidden","false"),this.fireEvent("onOpen",[this.content]))}},resize:function(f,e){this.showTimer=clearTimeout(this.showTimer||null);var h=this.doc.getSize(),g=this.doc.getScroll();this.size=Object.merge(this.isLoading?this.options.sizeLoading:this.options.size,f);this.size.x==self.getSize().x&&(this.size.y-=50,this.size.x-=20);h={width:this.size.x,height:this.size.y,left:(g.x+(h.x-this.size.x-this.options.marginInner.x)/2).toInt(),top:(g.y+(h.y-this.size.y-this.options.marginInner.y)/2).toInt()};this.hideContent();e?(this.win.setStyles(h),this.showTimer=this.showContent.delay(50,this)):this.fx.win.start(h).chain(this.showContent.bind(this));return this.reposition()},toggleListeners:function(b){b=b?"addEvent":"removeEvent";this.closeBtn[b]("click",this.bound.close);this.overlay[b]("click",this.bound.close);this.doc[b]("keydown",this.bound.key)[b]("mousewheel",this.bound.scroll);this.doc.getWindow()[b]("resize",this.bound.window)[b]("scroll",this.bound.window)},toggleLoading:function(b){this.isLoading=b;this.win[b?"addClass":"removeClass"]("sbox-loading");b&&(this.win.setProperty("aria-busy",b),this.fireEvent("onLoading",[this.win]))},toggleOverlay:function(d){if(this.options.overlay){var c=this.doc.getSize().x;this.overlay.set("aria-hidden",d?"false":"true");this.doc.body[d?"addClass":"removeClass"]("body-overlayed");d?this.scrollOffset=this.doc.getWindow().getSize().x-c:this.doc.body.setStyle("margin-right","")}},showContent:function(){this.content.get("opacity")&&this.fireEvent("onShow",[this.win]);this.fx.content.start(1)},hideContent:function(){this.content.get("opacity")||this.fireEvent("onHide",[this.win]);this.fx.content.cancel().set(0)},onKey:function(b){switch(b.key){case"esc":this.close(b);case"up":case"down":return !1}},checkTarget:function(b){return b.target!==this.content&&this.content.contains(b.target)},reposition:function(){var f=this.doc.getSize(),e=this.doc.getScroll(),h=this.doc.getScrollSize(),g=this.overlay.getStyles("height"),g=parseInt(g.height);h.y>g&&f.y>=g&&(this.overlay.setStyles({width:h.x+"px",height:h.y+"px"}),this.win.setStyles({left:(e.x+(f.x-this.win.offsetWidth)/2-this.scrollOffset).toInt()+"px",top:(e.y+(f.y-this.win.offsetHeight)/2).toInt()+"px"}));return this.fireEvent("onMove",[this.overlay,this.win])},removeEvents:function(b){if(!this.$events){return this}b?this.$events[b]&&(this.$events[b]=null):this.$events=null;return this},extend:function(b){return Object.append(this,b)},handlers:new Hash,parsers:new Hash};SqueezeBox.extend(new Events(function(){})).extend(new Options(function(){})).extend(new Chain(function(){}));SqueezeBox.parsers.extend({image:function(b){return b||/\.(?:jpg|png|gif)$/i.test(this.url)?this.url:!1},clone:function(d){if(document.id(this.options.target)){return document.id(this.options.target)}if(this.element&&!this.element.parentNode){return this.element}var c=this.url.match(/#([\w-]+)$/);return c?document.id(c[1]):d?this.element:!1},ajax:function(b){return b||this.url&&!/^(?:javascript|#)/i.test(this.url)?this.url:!1},iframe:function(b){return b||this.url?this.url:!1},string:function(){return !0}});SqueezeBox.handlers.extend({image:function(e){var d,f=new Image;this.asset=null;f.onload=f.onabort=f.onerror=function(){f.onload=f.onabort=f.onerror=null;if(f.width){var b=this.doc.getSize();b.x-=this.options.marginImage.x;b.y-=this.options.marginImage.y;d={x:f.width,y:f.height};for(var c=2;c--;){if(d.x>b.x){d.y*=b.x/d.x,d.x=b.x}else{if(d.y>b.y){d.x*=b.y/d.y,d.y=b.y}}}d.x=d.x.toInt();d.y=d.y.toInt();this.asset=document.id(f);f=null;this.asset.width=d.x;this.asset.height=d.y;this.applyContent(this.asset,d)}else{this.onError.delay(10,this)}}.bind(this);f.src=e;if(f&&f.onload&&f.complete){f.onload()}return this.asset?[this.asset,d]:null},clone:function(b){return b?b.clone():this.onError()},adopt:function(b){return b?b:this.onError()},ajax:function(d){var c=this.options.ajaxOptions||{};this.asset=(new Request.HTML(Object.merge({method:"get",evalScripts:!1},this.options.ajaxOptions))).addEvents({onSuccess:function(b){this.applyContent(b);null!==c.evalScripts&&!c.evalScripts&&Browser.exec(this.asset.response.javascript);this.fireEvent("onAjax",[b,this.asset]);this.asset=null}.bind(this),onFailure:this.onError.bind(this)});this.asset.send.delay(10,this.asset,[{url:d}])},iframe:function(b){this.asset=new Element("iframe",Object.merge({src:b,frameBorder:0,width:this.options.size.x,height:this.options.size.y},this.options.iframeOptions));return this.options.iframePreload?(this.asset.addEvent("load",function(){this.applyContent(this.asset.setStyle("display",""))}.bind(this)),this.asset.setStyle("display","none").inject(this.content),!1):this.asset},string:function(b){return b}});SqueezeBox.handlers.url=SqueezeBox.handlers.ajax;SqueezeBox.parsers.url=SqueezeBox.parsers.ajax;SqueezeBox.parsers.adopt=SqueezeBox.parsers.clone; 

/**  /media/com_finder/js/autocompleter.js  */

 var Observer = new Class({
	Implements: [Options, Events],
	options: {
		periodical: false,
		delay: 1000
	},
	initialize: function (el, onFired, options) {
		this.element = document.id(el) || $document.id(el);
		this.addEvent('onFired', onFired);
		this.setOptions(options);
		this.bound = this.changed.bind(this);
		this.resume();
	},
	changed: function () {
		var value = this.element.get('value');
		if ($equals(this.value, value)) return;
		this.clear();
		this.value = value;
		this.timeout = this.onFired.delay(this.options.delay, this);
	},
	setValue: function (value) {
		this.value = value;
		this.element.set('value', value);
		return this.clear();
	},
	onFired: function () {
		this.fireEvent('onFired', [this.value, this.element]);
	},
	clear: function () {
		clearTimeout(this.timeout || null);
		return this;
	},
	pause: function () {
		if (this.timer) clearTimeout(this.timer);
		else this.element.removeEvent('keyup', this.bound);
		return this.clear();
	},
	resume: function () {
		this.value = this.element.get('value');
		if (this.options.periodical) this.timer = this.changed.periodical(this.options.periodical, this);
		else this.element.addEvent('keyup', this.bound);
		return this;
	}
});
var $equals = function (obj1, obj2) {
		return (obj1 == obj2 || JSON.encode(obj1) == JSON.encode(obj2));
	};
var Autocompleter = new Class({
	Implements: [Options, Events],
	options: {
		minLength: 1,
		markQuery: true,
		width: 'inherit',
		maxChoices: 10,
		injectChoice: null,
		customChoices: null,
		emptyChoices: null,
		visibleChoices: true,
		className: 'autocompleter-choices',
		zIndex: 1000,
		delay: 400,
		observerOptions: {},
		fxOptions: {},
		autoSubmit: false,
		overflow: false,
		overflowMargin: 25,
		selectFirst: false,
		filter: null,
		filterCase: false,
		filterSubset: false,
		forceSelect: false,
		selectMode: true,
		choicesMatch: null,
		multiple: false,
		separator: ', ',
		separatorSplit: /\s*[,;]\s*/,
		autoTrim: false,
		allowDupes: false,
		cache: true,
		relative: false
	},
	initialize: function (element, options) {
		this.element = document.id(element);
		this.setOptions(options);
		this.build();
		this.observer = new Observer(this.element, this.prefetch.bind(this), Object.merge({}, {
			'delay': this.options.delay
		}, this.options.observerOptions));
		this.queryValue = null;
		if (this.options.filter) this.filter = this.options.filter.bind(this);
		var mode = this.options.selectMode;
		this.typeAhead = (mode == 'type-ahead');
		this.selectMode = (mode === true) ? 'selection' : mode;
		this.cached = [];
	},
	build: function () {
		if (document.id(this.options.customChoices)) {
			this.choices = this.options.customChoices;
		} else {
			this.choices = new Element('ul', {
				'class': this.options.className,
				'styles': {
					'zIndex': this.options.zIndex
				}
			}).inject(document.body);
			this.relative = false;
			if (this.options.relative) {
				this.choices.inject(this.element, 'after');
				this.relative = this.element.getOffsetParent();
			}
			this.fix = new OverlayFix(this.choices);
		}
		if (!this.options.separator.test(this.options.separatorSplit)) {
			this.options.separatorSplit = this.options.separator;
		}
		this.fx = (!this.options.fxOptions) ? null : new Fx.Tween(this.choices, Object.merge({}, {
			'property': 'opacity',
			'link': 'cancel',
			'duration': 200
		}, this.options.fxOptions)).addEvent('onStart', Chain.prototype.clearChain).set(0);
		this.element.setProperty('autocomplete', 'off').addEvent((Browser.ie || Browser.safari || Browser.chrome) ? 'keydown' : 'keypress', this.onCommand.bind(this)).addEvent('click', this.onCommand.bind(this, [false])).addEvent('focus', this.toggleFocus.create({
			bind: this,
			arguments: true,
			delay: 100
		})).addEvent('blur', this.toggleFocus.create({
			bind: this,
			arguments: false,
			delay: 100
		}));
	},
	destroy: function () {
		if (this.fix) this.fix.destroy();
		this.choices = this.selected = this.choices.destroy();
	},
	toggleFocus: function (state) {
		this.focussed = state;
		if (!state) this.hideChoices(true);
		this.fireEvent((state) ? 'onFocus' : 'onBlur', [this.element]);
	},
	onCommand: function (e) {
		if (!e && this.focussed) return this.prefetch();
		if (e && e.key && !e.shift) {
			switch (e.key) {
			case 'enter':
				if (this.element.value != this.opted) return true;
				if (this.selected && this.visible) {
					this.choiceSelect(this.selected);
					return !!(this.options.autoSubmit);
				}
				break;
			case 'up':
			case 'down':
				if (!this.prefetch() && this.queryValue !== null) {
					var up = (e.key == 'up');
					this.choiceOver((this.selected || this.choices)[(this.selected) ? ((up) ? 'getPrevious' : 'getNext') : ((up) ? 'getLast' : 'getFirst')](this.options.choicesMatch), true);
				}
				return false;
			case 'esc':
			case 'tab':
				this.hideChoices(true);
				break;
			}
		}
		return true;
	},
	setSelection: function (finish) {
		var input = this.selected.inputValue,
			value = input;
		var start = this.queryValue.length,
			end = input.length;
		if (input.substr(0, start).toLowerCase() != this.queryValue.toLowerCase()) start = 0;
		if (this.options.multiple) {
			var split = this.options.separatorSplit;
			value = this.element.value;
			start += this.queryIndex;
			end += this.queryIndex;
			var old = value.substr(this.queryIndex).split(split, 1)[0];
			value = value.substr(0, this.queryIndex) + input + value.substr(this.queryIndex + old.length);
			if (finish) {
				var tokens = value.split(this.options.separatorSplit).filter(function (entry) {
					return this.test(entry);
				}, /[^\s,]+/);
				if (!this.options.allowDupes) tokens = [].combine(tokens);
				var sep = this.options.separator;
				value = tokens.join(sep) + sep;
				end = value.length;
			}
		}
		this.observer.setValue(value);
		this.opted = value;
		if (finish || this.selectMode == 'pick') start = end;
		this.element.selectRange(start, end);
		this.fireEvent('onSelection', [this.element, this.selected, value, input]);
	},
	showChoices: function () {
		var match = this.options.choicesMatch,
			first = this.choices.getFirst(match);
		this.selected = this.selectedValue = null;
		if (this.fix) {
			var pos = this.element.getCoordinates(this.relative),
				width = this.options.width || 'auto';
			this.choices.setStyles({
				'left': pos.left,
				'top': pos.bottom,
				'width': (width === true || width == 'inherit') ? pos.width : width
			});
		}
		if (!first) return;
		if (!this.visible) {
			this.visible = true;
			this.choices.setStyle('display', '');
			if (this.fx) this.fx.start(1);
			this.fireEvent('onShow', [this.element, this.choices]);
		}
		if (this.options.selectFirst || this.typeAhead || first.inputValue == this.queryValue) this.choiceOver(first, this.typeAhead);
		var items = this.choices.getChildren(match),
			max = this.options.maxChoices;
		var styles = {
			'overflowY': 'hidden',
			'height': ''
		};
		this.overflown = false;
		if (items.length > max) {
			var item = items[max - 1];
			styles.overflowY = 'scroll';
			styles.height = item.getCoordinates(this.choices).bottom;
			this.overflown = true;
		};
		this.choices.setStyles(styles);
		this.fix.show();
		if (this.options.visibleChoices) {
			var scroll = document.getScroll(),
				size = document.getSize(),
				coords = this.choices.getCoordinates();
			if (coords.right > scroll.x + size.x) scroll.x = coords.right - size.x;
			if (coords.bottom > scroll.y + size.y) scroll.y = coords.bottom - size.y;
			window.scrollTo(Math.min(scroll.x, coords.left), Math.min(scroll.y, coords.top));
		}
	},
	// TODO: No $arguments in MT 1.3
	hideChoices: function (clear) {
		if (clear) {
			var value = this.element.value;
			if (this.options.forceSelect) value = this.opted;
			if (this.options.autoTrim) {
				value = value.split(this.options.separatorSplit).filter($arguments(0)).join(this.options.separator);
			}
			this.observer.setValue(value);
		}
		if (!this.visible) return;
		this.visible = false;
		if (this.selected) this.selected.removeClass('autocompleter-selected');
		this.observer.clear();
		var hide = function () {
				this.choices.setStyle('display', 'none');
				this.fix.hide();
			}.bind(this);
		if (this.fx) this.fx.start(0).chain(hide);
		else hide();
		this.fireEvent('onHide', [this.element, this.choices]);
	},
	prefetch: function () {
		var value = this.element.value,
			query = value;
		if (this.options.multiple) {
			var split = this.options.separatorSplit;
			var values = value.split(split);
			var index = this.element.getSelectedRange().start;
			var toIndex = value.substr(0, index).split(split);
			var last = toIndex.length - 1;
			index -= toIndex[last].length;
			query = values[last];
		}
		if (query.length < this.options.minLength) {
			this.hideChoices();
		} else {
			if (query === this.queryValue || (this.visible && query == this.selectedValue)) {
				if (this.visible) return false;
				this.showChoices();
			} else {
				this.queryValue = query;
				this.queryIndex = index;
				if (!this.fetchCached()) this.query();
			}
		}
		return true;
	},
	fetchCached: function () {
		return false;
		if (!this.options.cache || !this.cached || !this.cached.length || this.cached.length >= this.options.maxChoices || this.queryValue) return false;
		this.update(this.filter(this.cached));
		return true;
	},
	update: function (tokens) {
		this.choices.empty();
		this.cached = tokens;
		var type = tokens && typeOf(tokens);
		if (!type || (type == 'array' && !tokens.length) || (type == 'hash' && !tokens.getLength())) {
			(this.options.emptyChoices || this.hideChoices).call(this);
		} else {
			if (this.options.maxChoices < tokens.length && !this.options.overflow) tokens.length = this.options.maxChoices;
			tokens.each(this.options.injectChoice ||
			function (token) {
				var choice = new Element('li', {
					'html': this.markQueryValue(token)
				});
				choice.inputValue = token;
				this.addChoiceEvents(choice).inject(this.choices);
			}, this);
			this.showChoices();
		}
	},
	choiceOver: function (choice, selection) {
		if (!choice || choice == this.selected) return;
		if (this.selected) this.selected.removeClass('autocompleter-selected');
		this.selected = choice.addClass('autocompleter-selected');
		this.fireEvent('onSelect', [this.element, this.selected, selection]);
		if (!this.selectMode) this.opted = this.element.value;
		if (!selection) return;
		this.selectedValue = this.selected.inputValue;
		if (this.overflown) {
			var coords = this.selected.getCoordinates(this.choices),
				margin = this.options.overflowMargin,
				top = this.choices.scrollTop,
				height = this.choices.offsetHeight,
				bottom = top + height;
			if (coords.top - margin < top && top) this.choices.scrollTop = Math.max(coords.top - margin, 0);
			else if (coords.bottom + margin > bottom) this.choices.scrollTop = Math.min(coords.bottom - height + margin, bottom);
		}
		if (this.selectMode) this.setSelection();
	},
	choiceSelect: function (choice) {
		if (choice) this.choiceOver(choice);
		this.setSelection(true);
		this.queryValue = false;
		this.hideChoices();
	},
	filter: function (tokens) {
		return (tokens || this.tokens).filter(function (token) {
			return this.test(token);
		}, new RegExp(((this.options.filterSubset) ? '' : '^') + this.queryValue.escapeRegExp(), (this.options.filterCase) ? '' : 'i'));
	},
	markQueryValue: function (str) {
		return (!this.options.markQuery || !this.queryValue) ? str : str.replace(new RegExp('(' + ((this.options.filterSubset) ? '' : '^') + this.queryValue.escapeRegExp() + ')', (this.options.filterCase) ? '' : 'i'), '<span class="autocompleter-queried">$1</span>');
	},
	addChoiceEvents: function (el) {
		return el.addEvents({
			'mouseover': this.choiceOver.bind(this, el),
			'click': this.choiceSelect.bind(this, el)
		});
	}
});
var OverlayFix = new Class({
	initialize: function (el) {
		if (Browser.ie) {
			this.element = document.id(el);
			this.relative = this.element.getOffsetParent();
			this.fix = new Element('iframe', {
				'frameborder': '0',
				'scrolling': 'no',
				'src': 'javascript:false;',
				'styles': {
					'position': 'absolute',
					'border': 'none',
					'display': 'none',
					'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)'
				}
			}).inject(this.element, 'after');
		}
	},
	show: function () {
		if (this.fix) {
			var coords = this.element.getCoordinates(this.relative);
			delete coords.right;
			delete coords.bottom;
			this.fix.setStyles(Object.append(coords, {
				'display': '',
				'zIndex': (this.element.getStyle('zIndex') || 1) - 1
			}));
		}
		return this;
	},
	hide: function () {
		if (this.fix) this.fix.setStyle('display', 'none');
		return this;
	},
	destroy: function () {
		if (this.fix) this.fix = this.fix.destroy();
	}
});
Element.implement({
	getSelectedRange: function () {
		if (!Browser.ie) return {
			start: this.selectionStart,
			end: this.selectionEnd
		};
		var pos = {
			start: 0,
			end: 0
		};
		var range = this.getDocument().selection.createRange();
		if (!range || range.parentElement() != this) return pos;
		var dup = range.duplicate();
		if (this.type == 'text') {
			pos.start = 0 - dup.moveStart('character', -100000);
			pos.end = pos.start + range.text.length;
		} else {
			var value = this.value;
			var offset = value.length - value.match(/[\n\r]*$/)[0].length;
			dup.moveToElementText(this);
			dup.setEndPoint('StartToEnd', range);
			pos.end = offset - dup.text.length;
			dup.setEndPoint('StartToStart', range);
			pos.start = offset - dup.text.length;
		}
		return pos;
	},
	selectRange: function (start, end) {
		if (Browser.ie) {
			var diff = this.value.substr(start, end - start).replace(/\r/g, '').length;
			start = this.value.substr(0, start).replace(/\r/g, '').length;
			var range = this.createTextRange();
			range.collapse(true);
			range.moveEnd('character', start + diff);
			range.moveStart('character', start);
			range.select();
		} else {
			this.focus();
			this.setSelectionRange(start, end);
		}
		return this;
	}
});
Autocompleter.Base = Autocompleter;
Autocompleter.Request = new Class({
	Extends: Autocompleter,
	options: {
		postData: {},
		ajaxOptions: {},
		postVar: 'value'
	},
	query: function () {
		var data = this.options.postData.unlink || {};
		data[this.options.postVar] = this.queryValue;
		var indicator = document.id(this.options.indicator);
		if (indicator) indicator.setStyle('display', '');
		var cls = this.options.indicatorClass;
		if (cls) this.element.addClass(cls);
		this.fireEvent('onRequest', [this.element, this.request, data, this.queryValue]);
		this.request.send({
			'data': data
		});
	},
	queryResponse: function () {
		var indicator = document.id(this.options.indicator);
		if (indicator) indicator.setStyle('display', 'none');
		var cls = this.options.indicatorClass;
		if (cls) this.element.removeClass(cls);
		return this.fireEvent('onComplete', [this.element, this.request]);
	}
});
Autocompleter.Request.JSON = new Class({
	Extends: Autocompleter.Request,
	initialize: function (el, url, options) {
		this.parent(el, options);
		this.request = new Request.JSON(Object.merge({}, {
			'url': url,
			'link': 'cancel'
		}, this.options.ajaxOptions)).addEvent('onComplete', this.queryResponse.bind(this));
	},
	queryResponse: function (response) {
		this.parent();
		this.update(response);
	}
});
Autocompleter.Request.HTML = new Class({
	Extends: Autocompleter.Request,
	initialize: function (el, url, options) {
		this.parent(el, options);
		this.request = new Request.HTML(Object.merge({}, {
			'url': url,
			'link': 'cancel',
			'update': this.choices
		}, this.options.ajaxOptions)).addEvent('onComplete', this.queryResponse.bind(this));
	},
	queryResponse: function (tree, elements) {
		this.parent();
		if (!elements || !elements.length) {
			this.hideChoices();
		} else {
			this.choices.getChildren(this.options.choicesMatch).each(this.options.injectChoice ||
			function (choice) {
				var value = choice.innerHTML;
				choice.inputValue = value;
				this.addChoiceEvents(choice.set('html', this.markQueryValue(value)));
			}, this);
			this.showChoices();
		}
	}
});
Autocompleter.Ajax = {
	Base: Autocompleter.Request,
	Json: Autocompleter.Request.JSON,
	Xhtml: Autocompleter.Request.HTML
};