/*!CK:4158425488!*//*1421717183,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["ZpKAc"]); }

__d("PlaceTagType",[],function(a,b,c,d,e,f){e.exports={CITY:"city",STATE_PROVINCE:"state_province",COUNTRY:"country",PLACE:"place",EVENT:"event",RESIDENCE:"residence",TEXT:"text"};},null);
__d("PlacesDataSource",["DataSource"],function(a,b,c,d,e,f,g){for(var h in g)if(g.hasOwnProperty(h))j[h]=g[h];var i=g===null?null:g.prototype;j.prototype=Object.create(i);j.prototype.constructor=j;j.__superConstructor__=g;function j(k){"use strict";g.call(this,k);this._origBootstrapEndpoint=this.bootstrapEndpoint;}j.prototype.shouldFetchMoreResults=function(k){"use strict";if(this.queryData.new_js_ranking){return true;}else return i.shouldFetchMoreResults.call(this,k);};j.prototype.mergeUids=function(k,l,m,n){"use strict";if(this.queryData.new_js_ranking){this._checkExtendedMatch(n,k);return this.deduplicateByKey(m.concat(l,k));}else return i.mergeUids.call(this,k,l,m,n);};j.prototype.resetBootstrapEndpoint=function(k){"use strict";this.setBootstrapEndpoint(this._origBootstrapEndpoint,k);return this;};j.prototype.setBootstrapEndpoint=function(k,l){"use strict";if(this.bootstrapEndpoint!==k){this.bootstrapEndpoint=k;if(this._bootstrapped||this._bootstrapping)l=true;}if(l)this.dirty().bootstrap();return this;};j.prototype.getQueryEndpoint=function(){"use strict";return this.queryEndpoint;};j.prototype.getBootstrapData=function(){"use strict";return this.bootstrapData;};e.exports=j;},null);
__d("PlaceUtils",["PlaceTagType"],function(a,b,c,d,e,f,g){var h={placesClose:function(i,j,k,l){i=i||0;j=j||0;k=k||0;l=l||0;return (Math.abs(i-k)<1e-05)&&(Math.abs(j-l)<1e-05);},isNonSpecificPlace:function(i){return (i==g.CITY||i==g.STATE_PROVINCE||i==g.COUNTRY);}};e.exports=h;},null);
__d("PlacesTypeaheadCore",["Arbiter","CSS","Focus","Run","StickyPlaceholderInput","Style","TypeaheadCore","copyProperties"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){for(var o in m)if(m.hasOwnProperty(o))q[o]=m[o];var p=m===null?null:m.prototype;q.prototype=Object.create(p);q.prototype.constructor=q;q.__superConstructor__=m;function q(){"use strict";if(m!==null)m.apply(this,arguments);}q.prototype.init=function(r,s,t){"use strict";p.init.call(this,r,s,t);this.arbiterTokens=[g.subscribe('Places/PlaceCreationCancel'+this.callbackID,function(u,v){this.view.allowPlaceCreation=false;this.view.allowFreeformOption=true;this.view.reset();this.focusElement();}.bind(this))];j.onLeave(function(){this.arbiterTokens.forEach(g.unsubscribe);}.bind(this));this._typeaheadID=t.id;this._citySet=false;this.data.subscribe('fetchComplete',this.update.bind(this));};q.prototype.initToggle=function(){"use strict";var r=this.root.parentNode,s=l.get(r,'position')!='static'?r:this.root,t=this.view,u='PlacesTypeaheadFocused';this.subscribe('focus',function(){t.show();h.addClass(s,u);});this.subscribe('blur',function(){t.hide();h.removeClass(s,u);});};q.prototype.focusElement=function(){"use strict";i.set(this.element);this.value='';this.checkValue();};q.prototype.setValue=function(r){"use strict";p.setValue.call(this,r);k.update(this.element);};q.prototype.updateDataSource=function(r){"use strict";this.data.setQueryData({city_id:this._cityId,city_set:this._citySet});this.data.setBootstrapData({city_id:this._cityId});if(r){this.data.dirty();this.data.bootstrap();}};q.prototype.setCity=function(r,s){"use strict";this._citySet=s;if(this._cityId!==r){this._cityId=r;this.updateDataSource(s);}};q.prototype.update=function(r,s){"use strict";var t=s.response;if(!t)return;var u=t.getPayload();if(u.cityId)if(!this._citySet)this.setCity(u.cityId,false);};q.prototype.setLocation=function(r){"use strict";if(!r||!r.latitude||!r.longitude)return;this.data.setQueryData({latitude:r.latitude,longitude:r.longitude});this.data.setBootstrapData({latitude:r.latitude,longitude:r.longitude});this.data.resetBootstrapEndpoint(true);};n(q.prototype,{resetOnKeyup:false});e.exports=q;},null);
__d("PlacesTypeaheadBehavior",["CSS","DOM"],function(a,b,c,d,e,f,g,h){var i={init:function(j,k){j.subscribe(['reset','select','highlight'],function(l,m){if(l==='highlight'&&m.index!==-1&&m.selected.type!='freeform'&&m.selected.map&&!m.selected.changeCity){h.setContent(k,m.selected.map);g.show(k);}else g.hide(k);});}};e.exports=i;},null);
__d("NoTrucatingCompactTypeaheadRenderer",["CompactTypeaheadRenderer"],function(a,b,c,d,e,f,g){function h(i,j){return g(i,j);}h.className='noTrucating compact';e.exports=h;},null);
__d("PlacesTypeaheadView",["Arbiter","CSS","Dialog","DOM","Parent","Run","ScrollableArea","Style","TypeaheadView","copyProperties","fbt"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){for(var r in o)if(o.hasOwnProperty(r))t[r]=o[r];var s=o===null?null:o.prototype;t.prototype=Object.create(s);t.prototype.constructor=t;t.__superConstructor__=o;function t(){"use strict";if(o!==null)o.apply(this,arguments);}t.prototype.init=function(){"use strict";this.content=j.find(this.element,'div.PlacesTypeaheadViewList');s.init.call(this);this.subscribe(['render','reset'],this.renderBorders.bind(this));this.arbiterTokens=[g.subscribe('Places/PlaceCreated'+this.callbackID,function(u,v){var w={text:v.name,rawtext:v.name,uid:v.fbid,city_id:v.city_id,city_name:v.city_name,city_page_id:v.city_page_id};this.inform('select',{index:-1,clicked:true,selected:w});this.inform('afterSelect');}.bind(this))];this.arbiterTokens.push(g.subscribe('Events/autoSuggestionSelected',function(u,v){this.inform('select',{index:-1,clicked:true,selected:{text:v.event_name,rawtext:v.event_name,uid:v.event_fbid}});this.inform('afterSelect');}.bind(this)));l.onLeave(function(){this.arbiterTokens.forEach(g.unsubscribe);}.bind(this));};t.prototype.renderBorders=function(){"use strict";h.conditionClass(this.element,'PlacesTypeaheadViewPopulated',this.items.length);};t.prototype.show=function(){"use strict";s.show.call(this);if(!this.results||!this.results.length)n.set(this.element,'height',0);};t.prototype.render=function(u,v,w){"use strict";v.forEach(function(aa){aa.value=u;});if(this.allowFreeformOption&&u&&(!v||v.length===0||v[v.length-1].type!='freeform')){var x=q._("\u300c{custom_location}\u300d\u3092\u4f7f\u7528\u3059\u308b",[q.param("custom_location",u)]);v.push({uid:'0',rawtext:u,text:x,type:'freeform'});}if(this.allowPlaceCreation&&u&&(!v||v.length===0||v[v.length-1].type!='placecreate')){var y=q._("\u30b9\u30dd\u30c3\u30c8\u300c{custom_location}\u300d\u3092\u8ffd\u52a0",[q.param("custom_location",u)]);v.push({uid:'0',rawtext:u,text:y,type:'placecreate'});}s.render.call(this,u,v,w);this.element.style.visibility='hidden';if(this.visible&&this.results&&this.results.length)n.set(this.element,'height','');var z=m.getInstance(this.content);z&&z.adjustGripper();this.inform('afterRender',v);this.element.style.visibility='';};t.prototype.select=function(u){"use strict";var v=this.index,w=this.results[v];if(w){if(w.type==='placecreate'){i.bootstrap('/ajax/places/create/dialog.php',{name:w.rawtext,callback_id:this.callbackID});return;}if(w.type==='freeform')w.text=w.rawtext;s.select.call(this,u);}};t.prototype.next=function(){"use strict";s.next.call(this);this._scrollIntoView(this.selected);};t.prototype.prev=function(){"use strict";s.prev.call(this);this._scrollIntoView(this.selected);};t.prototype._scrollIntoView=function(u){"use strict";if(!k.byClass(u,'uiScrollableArea'))return;this.ignoreNextMouseover=true;var v=k.byClass(u,'uiScrollableAreaWrap'),w=u.offsetTop-v.offsetTop;if(w<v.scrollTop){v.scrollTop=w;return;}var x=w+u.offsetHeight;if(x>v.scrollTop+v.offsetHeight)v.scrollTop=x-v.offsetHeight;};t.prototype.mouseover=function(event){"use strict";this.ignoreNextMouseover||s.mouseover.call(this,event);this.ignoreNextMouseover=false;};t.prototype.highlight=function(u){"use strict";s.highlight.call(this,u,true);};p(t.prototype,{ignoreNextMouseover:false});e.exports=t;},null);
__d("ProgressiveDatepicker",["Arbiter","ArbiterMixin","CSS","DataStore","DOM","Event","Parent","copyProperties","getElementText","mixin","shield"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){function r(x){return new Date(x[0],x[1],x[2],x[3],x[4]);}function s(x,y){while(x.length)k.insertAfter(y,x.pop());}var t=p(h);for(var u in t)if(t.hasOwnProperty(u))w[u]=t[u];var v=t===null?null:t.prototype;w.prototype=Object.create(v);w.prototype.constructor=w;w.__superConstructor__=t;function w(x,y){"use strict";this._root=x;this._savedLabels={};this._savedPeriodsBack=[];this._savedPeriodsFront=[];this._menus={};var z=0;if(y.gmtoffset!==(void 0))z=-(new Date()).getTimezoneOffset()-y.gmtoffset;this._mintime=y.mintime&&new Date(1000*y.mintime-z*60000);this._maxtime=y.maxtime&&new Date(1000*y.maxtime-z*60000);j.set(x,'datepicker',this);k.scry(x,'select').forEach(function(aa){l.listen(aa,'change',q(this._handleChange,this,aa));var ba=m.byClass(aa,'period');l.listen(aa,'focus',i.addClass.bind(null,ba,'periodFocus'));l.listen(aa,'blur',i.removeClass.bind(null,ba,'periodFocus'));this._setMenuSelectionState(aa);if(aa.getAttribute('data-name')==='month')this._filterInvalidDates();}.bind(this));k.scry(x,'a.periodLabel').forEach(function(aa){var ba=m.byClass(aa,'period');l.listen(aa,'click',function(){i.addClass(ba,'periodSelected');i.addClass(ba,'periodFocus');});});this._filterInvalidDates();this.inform('initialized',this,g.BEHAVIOR_STATE);}w.prototype.setDate=function(x,y,z,aa,ba){"use strict";this._addSavedPeriods();var ca=w.PERIODS;for(var da=0;da<ca.length;da++)this._setValueForPeriod(ca[da],arguments[da]);this._filterInvalidDates();this.inform('changed');};w.prototype.setDateWithTimestamp=function(x){"use strict";var y=new Date(x);this.setDate(y.getFullYear(),y.getMonth()+1,y.getDate(),y.getHours(),y.getMinutes());};w.prototype.isSet=function(){"use strict";var x=w.PERIODS;for(var y=0;y<x.length;y++)if(this._getValueForPeriod(x[y]))return true;return false;};w.prototype.getRoot=function(){"use strict";return this._root;};w.prototype.getValues=function(){"use strict";var x=w.PERIODS,y={};for(var z=0;z<x.length;z++){var aa=this._getValueForPeriod(x[z]);if(aa)y[x[z]]=aa;}return y;};w.prototype.getDate=function(){"use strict";var x=this.getValues();return new Date(x.year||0,(x.month||1)-1,x.day||1,x.hour||0,x.minute||0);};w.prototype.getTimestamp=function(){"use strict";return Math.round(this.getDate().getTime()/1000);};w.prototype._setValueForPeriod=function(x,y){"use strict";var z=this._menuForPeriodName(x);if(!z)return;if(y===(void 0))y='';var aa=z.options;for(var ba=0,ca=aa.length;ba<ca;ba++)if(aa[ba].value==y){z.selectedIndex=ba;break;}this._setMenuSelectionState(z);};w.prototype._getValueForPeriod=function(x){"use strict";var y=this._menuForPeriodName(x);return (y&&y.options[y.selectedIndex].value);};w.prototype._handleChange=function(x){"use strict";this._setMenuSelectionState(x);this._filterInvalidDates();this.inform('changed');};w.prototype._setMenuSelectionState=function(x){"use strict";var y=m.byClass(x,'period');if(!y)return;if(i.hasClass(y,'periodRequired')){if(x.selectedIndex===0)x.selectedIndex=1;}else this._updateLabel(x);var z=x.getAttribute('data-name'),aa=x.options[x.selectedIndex].value;i.conditionClass(y,'periodSelected',aa);i.conditionClass(this._root,this._selectedClass(z),aa);if(!aa)this._resetMenu(w.PERIODS.indexOf(z)+1);};w.prototype._updateLabel=function(x){"use strict";var y=x.getAttribute('data-name'),z=x.options[0];if(!this._savedLabels[y])this._savedLabels[y]=o(z);if(x.selectedIndex===0){k.setContent(z,this._savedLabels[y]);}else k.setContent(z,'--');};w.prototype._daysInMonth=function(x,y){"use strict";return new Date(x||1999,y+1||1,0).getDate();};w.prototype._daysInCurrentMonth=function(){"use strict";return this._daysInMonth(this._getValueForPeriod('year'),this._getValueForPeriod('month')-1);};w.prototype._menuForPeriodName=function(x){"use strict";if(!this._menus[x])this._menus[x]=k.scry(this._root,'.'+x+'Menu')[0];return this._menus[x];};w.prototype._selectedClass=function(x){"use strict";return 'uiProgressiveDatepickerSelected-'+x;};w.prototype._resetMenu=function(x){"use strict";var y=w.PERIODS;for(;x<y.length;x++){var z=y[x],aa=this._menuForPeriodName(z);if(!aa)return;if(m.byClass(aa,'periodRequired')){aa.selectedIndex=1;}else{i.removeClass(m.byClass(aa,'period'),'periodSelected');i.removeClass(this._root,this._selectedClass(z));aa.selectedIndex=0;this._updateLabel(aa);}}};w.prototype._addSavedPeriods=function(){"use strict";var x=w.PERIODS;for(var y=0;y<x.length;y++){var z=this._menuForPeriodName(x[y]);if(!z)return;this._savedPeriodsFront[y]||(this._savedPeriodsFront[y]=[]);this._savedPeriodsBack[y]||(this._savedPeriodsBack[y]=[]);var aa=z.options[0],ba=z.options[z.options.length-1];if(y===w.PERIODS.indexOf('hour')||y===w.PERIODS.indexOf('minute')){s(this._savedPeriodsFront[y],aa);s(this._savedPeriodsBack[y],ba);}else{s(this._savedPeriodsBack[y],aa);s(this._savedPeriodsFront[y],ba);}}};w.prototype._filterInvalidDates=function(){"use strict";this._addSavedPeriods();var x=w.PERIODS,y=this.getValues();for(var z=0;z<x.length;z++){var aa=this._menuForPeriodName(x[z]);if(!aa)return;this._savedPeriodsFront[z]||(this._savedPeriodsFront[z]=[]);this._savedPeriodsBack[z]||(this._savedPeriodsBack[z]=[]);for(var ba=1;ba<aa.options.length;){var ca=aa.options[ba],da=[((z-1>=0)?y[x[0]]:0),((z-1>=1)?y[x[1]]-1:0),((z-1>=2)?y[x[2]]:1),((z-1>=3)?y[x[3]]:0),((z-1>=4)?y[x[4]]:0)];da[z]=ca.value;if(z===w.PERIODS.indexOf('month'))da[z]=da[z]-1;var ea=r(da),fa=[((z-1>=0)?y[x[0]]:9001),((z-1>=1)?y[x[1]]-1:11),((z-1>=2)?y[x[2]]:this._daysInCurrentMonth()),((z-1>=3)?y[x[3]]:23),((z-1>=4)?y[x[4]]:59)];fa[z]=ca.value;if(z===w.PERIODS.indexOf('month')){fa[z]--;fa[z+1]=this._daysInMonth(fa[0],fa[1]);}var ga=r(fa),ha=(ea>this._maxtime),ia=(ga<this._mintime),ja=(z===w.PERIODS.indexOf('day')&&ca.value>this._daysInCurrentMonth());if(ia||ha||ja){if(ca.selected){ca.selected=false;this._resetMenu(z);}k.remove(ca);if(ha||ja){this._savedPeriodsBack[z].push(ca);}else this._savedPeriodsFront[z].push(ca);}else ba++;}}};w.getInstance=function(x){"use strict";return x?j.get(x,'datepicker'):null;};n(w,{PERIODS:['year','month','day','hour','minute']});e.exports=w;},null);
__d("legacy:PreventSubmitOnEnterTypeaheadBehavior",["TypeaheadPreventSubmitOnEnter"],function(a,b,c,d,e,f,g){if(!a.TypeaheadBehaviors)a.TypeaheadBehaviors={};a.TypeaheadBehaviors.preventSubmitOnEnter=function(h){h.enableBehavior(g);};},3);
__d("legacy:ShowResultsOnFocusTypeaheadBehavior",["TypeaheadShowResultsOnFocus"],function(a,b,c,d,e,f,g){if(!a.TypeaheadBehaviors)a.TypeaheadBehaviors={};a.TypeaheadBehaviors.showResultsOnFocus=function(h){h.enableBehavior(g);};},3);
__d("XPhotoBatchEditLocationControllerURIBuilder",["XControllerURIBuilder"],function(a,b,c,d,e,f){e.exports=b("XControllerURIBuilder").create("\/photos\/edit\/batch\/location\/",{});},null);