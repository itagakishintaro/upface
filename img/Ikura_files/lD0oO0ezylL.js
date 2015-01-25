/*!CK:154105766!*//*1420430602,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["YI6R+"]); }

__d("PluginSend",["Arbiter","CSS","DOM","DOMEvent","DOMEventListener","Focus","Plugin","PluginOptin","PluginResize","copyProperties"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=function(r,s,t,u,v,w){if(v)new o(function(){return r.offsetWidth;},function(){return r.offsetHeight;}).resize().auto();if(!u){var x=new n('send').addReturnParams({act:'send'});k.add(s,'click',x.start.bind(x));return;}var y=false,z=false;function aa(){z=!z;h.toggle(s);h.toggle(t);h.toggle(u);if(z){setTimeout(function(){var da=i.find(u,'.textInput');l.set(da);},500);}else{var ba=i.find(s,'button');l.set(ba);}if(!y){var ca=window.ServerJSAsyncLoader;ca&&ca.ondemandjs&&ca.run(ca.ondemandjs);y=true;}new o(function(){return Math.max(r.offsetWidth,u.offsetWidth);},function(){return Math.max(r.offsetHeight,u.offsetHeight+u.offsetTop);},'resize.iframe',true).resize().auto();}k.add(s,'click',aa);k.add(t,'click',aa);k.add(r.parentNode,'click',function(ba){ba=new j(ba);if(ba.target===r.parentNode){ba.kill();aa();}});g.subscribe(q.CLOSE,aa);g.subscribe(m.ERROR,function(event,ba){i.setContent(r,ba.content);aa();});if(w)aa();};p(q,{SUCCESS:'platform/plugins/send/success',CLOSE:'platform/plugins/send/close',success:function(){g.inform(this.SUCCESS);}});e.exports=q;},null);
__d("PluginUITypeahead",["DOMDimensions","DOMQuery","Tokenizer","getElementPosition"],function(a,b,c,d,e,f,g,h,i,j){function k(){return h.scry(document.body,'.uiTokenizer').map(function(m){var n=i.getInstance(m);if(!n)return {x:0,y:0};var o=n.getTypeahead().getView(),p=j(o.getElement()),q=g.getElementDimensions(o.getElement());return {x:p.x+q.width,y:p.y+q.height};});}var l={width:function(){return Math.max.apply(null,k().map(function(m){return m.x;}));},height:function(){return Math.max.apply(null,k().map(function(m){return m.y;}));}};e.exports=l;},null);
__d("PluginSendFlyout",["Arbiter","Button","DOMEvent","DOMEventListener","DOMQuery","Focus","Form","PluginResize","PluginSend","PluginUITypeahead","Tokenizer","copyProperties"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){function s(){}r(s,{init:function(t){var u=k.find(t,'.uiTokenizer'),v=q.getInstance(u),w=k.find(t,'.textInput'),x=k.find(t,'.pluginSendFlyoutTextarea'),y=k.find(t,'form'),z=k.find(document.body,'.pluginSend'),aa=k.find(y,'.pluginSendFlyoutCancelButton'),ba=k.find(y,'.pluginSendFlyoutSendButton');g.subscribe('Form/change',function(da,ea){if(ea.node!==u)return;h.setEnabled(ba,v.getTokens().length>0);});function ca(){v.reset();x.value='';l.setWithoutOutline(z);g.inform(o.CLOSE);}j.add(y,'submit',function(da){new i(da).kill();m.bootstrap(y);});j.add(aa,'click',function(da){new i(da).kill();ca();});j.add(aa,'keydown',function(da){da=new i(da);var ea=da.event.keyCode||da.event.which;if(ea==9&&!da.event.shiftKey){da.preventDefault();l.set(w);}});j.add(w,'keydown',function(da){da=new i(da);var ea=da.event.keyCode||da.event.which;if(ea==9&&da.event.shiftKey){da.preventDefault();if(w.getAttribute('aria-expanded')=='true'){w.setAttribute('aria-expanded','false');}else l.set(aa);}});j.add(y,'keyup',function(da){da=new i(da);var ea=da.event.keyCode||da.event.which;if(ea==27)ca();});g.subscribe(o.SUCCESS,ca);new n(function(){return Math.max(z.offsetWidth,t.offsetWidth,p.width());},function(){return Math.max(z.offsetHeight,t.offsetHeight+t.offsetTop,p.height());},'resize.iframe',false).resize().auto();}});e.exports=s;},null);
__d("TypeaheadPreventSubmitOnEnter",["Event","Keys","copyProperties"],function(a,b,c,d,e,f,g,h,i){function j(k){"use strict";this._typeahead=k;}j.prototype.enable=function(){"use strict";var k=this._typeahead.getCore().getElement();this._listener=g.listen(k,'keypress',function(l){if(g.getKeyCode(l)==h.RETURN)l.kill();});};j.prototype.disable=function(){"use strict";this._listener.remove();this._listener=null;};i(j.prototype,{_listener:null});e.exports=j;},null);
__d("TypeaheadShowResultsOnFocus",["Event","Keys","copyProperties"],function(a,b,c,d,e,f,g,h,i){function j(k){"use strict";this._typeahead=k;}j.prototype.enable=function(){"use strict";this._typeahead.getCore().resetOnKeyup=false;this._subscription=this._typeahead.subscribe('bootstrap',function(k,l){this.firstFetch(l,this._typeahead.getCore(),this._typeahead.getData());}.bind(this));this._keyUpListener=g.listen(this._typeahead.getCore().getElement(),'keyup',function(event){if(g.getKeyCode(event)==h.BACKSPACE||g.getKeyCode(event)==h.DELETE)this.respond(this._typeahead.getCore(),this._typeahead.getData());}.bind(this));this._focusListener=g.listen(this._typeahead.getCore().getElement(),'focus',function(event){this.respond(this._typeahead.getCore(),this._typeahead.getData());}.bind(this));};j.prototype.disable=function(){"use strict";this._typeahead.unsubscribe(this._subscription);this._subscription=null;this._keyUpListener.remove();this._keyUpListener=null;this._focusListener.remove();this._focusListener=null;};j.prototype.firstFetch=function(k,l,m){"use strict";!k.bootstrapping&&this.respond(l,m);};j.prototype.respond=function(k,l){"use strict";if(!k.getValue()){var m=this.getUidsFromData(l);k.setValue('');var n=l.buildUids(' ',m);l.respond('',n);}};j.prototype.getUidsFromData=function(k){"use strict";var l=k.getAllEntries(),m=[];for(var n in l)m.push({uid:l[n].uid,index:l[n].index});m.sort(function(o,p){return o.index-p.index;});return m.map(function(o){return o.uid;});};i(j.prototype,{_subscription:null,_keyUpListener:null,_focusListener:null});e.exports=j;},null);