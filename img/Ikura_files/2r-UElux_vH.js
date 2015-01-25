/*!CK:1482260019!*//*1420431319,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["DKD4K"]); }

__d("WindowComm",["URI"],function(a,b,c,d,e,f,g){var h={_callbacks:{},makeHandler:function(i,j,k){j=j||'opener';if(!k)k='f'+(Math.random()*(1<<30)).toString(16).replace('.','');h._callbacks[k]=i;return new g('/connect/window_comm.php').setQueryData({_id:k,_relation:j}).getQualifiedURI().toString();},_recv:function(i){var j=new g(i).getQueryData();h._callbacks[j._id](j);}};e.exports=h;a.WindowComm=h;},null);
__d("OpenIDRequest",["AsyncRequest","AsyncSignal","URI","UserAgent_DEPRECATED","PHPQuerySerializer","coalesce","copyProperties","createArrayFromMixed"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){function o(){var p=new g().setReadOnly(true).setHandler(this.asyncResponseHandler.bind(this)).setErrorHandler(this.asyncErrorHandler.bind(this));m(this,{openidUrl:null,requestId:o.maxRequestId++,successResponseHandler:null,cancelHandler:null,intermediateHandler:null,immediateMode:false,useExtensions:true,thirdPartyLogin:false,popupWindow:null,asyncRequest:p,retryCount:0});o.requests[this.requestId]=this;}o.getRequestById=function(p){return o.requests[p];};o.prototype.setOpenIDUrl=function(p){this.openidUrl=p;return this;};o.prototype.setSuccessHandler=function(p){this.successResponseHandler=p;return this;};o.prototype.setErrorHandler=function(p){this.errorHandler=p;return this;};o.prototype.setCancelHandler=function(p){this.cancelHandler=p;return this;};o.prototype.setImmediateMode=function(p){this.immediateMode=p;return this;};o.prototype.setUseExtensions=function(p){this.useExtensions=p;return this;};o.prototype.setIntermediateHandler=function(p){this.intermediateHandler=p;return this;};o.prototype.setThirdPartyLogin=function(p){this.thirdPartyLogin=p;return this;};o.prototype.send=function(){if(!this.openidUrl)throw "openidUrl is a required parameter. Call setOpenIDUrl()";var p=this.calculateRedirectUrl();if(!p){this.logMetrics('redirectUrlNotFound');return;}if(this.immediateMode){this.createHiddenIframe(p);}else{if(this.popupWindow)throw "OpenID popup is already in progress";this.showPopup(p);}this.logMetrics('requestSent');};o.prototype.calculateRedirectUrl=function(p){var q=this.immediateMode?'checkid_immediate':'checkid_setup',r={'openid.mode':q},s;if(!o.cache[this.openidUrl])return null;s=o.cache[this.openidUrl].url;var t=i(i(s).getQueryData()['openid.return_to']);t.addQueryData({context:o.context,request_id:this.requestId});r['openid.return_to']=t.toString();r.third_party_login=this.thirdPartyLogin;return i(s).addQueryData(r).getQualifiedURI();};o.prototype.createHiddenIframe=function(p){var q='openid_request_'+this.requestId,r=document.body.appendChild(document.createElement('div')),s=function(){r.innerHTML=('<iframe name="'+q+'"'+' src="'+p.toString()+'"'+' scrolling="no" '+' frameborder="0" class="hidden_elem"></iframe>');};if(j.ie()){r.innerHTML='<iframe src="javascript:false"></iframe>';setTimeout(s,0);}else s();};o.prototype.showPopup=function(p){var q;if(o.cache[this.openidUrl])q=o.cache[this.openidUrl].popup_dimensions;if(!q||!q.height||!q.width)q={height:'580',width:'790'};var r={x:l(window.screenX,window.screenLeft),y:l(window.screenY,window.screenTop),width:l(window.outerWidth,document.body.clientWidth),height:l(window.outerHeight,document.body.clientHeight)},s=r.x+((r.width-q.width)/2),t=r.y+((r.height-q.height)/2),u=["location=yes","scrollbars=1","left="+s,"top="+t,"resizable=yes","height="+q.height,"width="+q.width].join(",");this.popupWindow=window.open(p.toString(),'_blank',u);this.popupPollInterval=setInterval(this.pollPopupWindow.bind(this),100);this.popupWindow.focus();};o.prototype.pollPopupWindow=function(){if(!(this.popupPollInterval&&this.popupWindow))return;if(this.popupWindow.closed){clearInterval(this.popupPollInterval);this.cancel();}};o.prototype.closePopupIfOpen=function(){if(this.popupWindow){if(this.popupPollInterval)clearInterval(this.popupPollInterval);this.popupWindow.close();}this.popupWindow=null;};o.prototype.cancel=function(){this.closePopupIfOpen();if(this.cancelHandler)this.cancelHandler();this.logMetrics('requestCanceled');};o.prototype.logMetrics=function(p){new h('/ajax/openid/metrics.php',{metric:p,immediate:this.immediateMode,context:o.context,openid_url:this.openidUrl}).send();};o.prototype.triggerCompleteAuthAsync=function(p){if(p.charAt(0)=='?'||p.charAt(0)=='&')p=p.substr(1);var q=k.deserialize(p);this.closePopupIfOpen();if(q['openid.mode']=='cancel'){this.cancel();return;}if(this.intermediateHandler)this.intermediateHandler();this.asyncRequest.setData({openid_params:q}).send();};o.prototype.asyncResponseHandler=function(p){var q=p.getPayload();if(this.successResponseHandler)this.successResponseHandler(q);this.closePopupIfOpen();};o.prototype.cleanHandleResponse=function(p){if(p.css)p.css=n(p.css);this.asyncRequest.handleResponse(p);};o.prototype.asyncErrorHandler=function(p){this.closePopupIfOpen();if(p.error==1428010||p.error==1428011){this.cancel();return;}if(this.errorHandler)this.errorHandler(p);};o.prototype.retry=function(){++this.retryCount;this.requestId=o.maxRequestId++;this.send();};o.prototype.setProviderCache=function(p){o.cache=p;return this;};o.cache={};o.requests=[];o.maxRequestId=0;o.context='default';e.exports=o;},null);
__d("WidgetArbiter",["createArrayFromMixed"],function(a,b,c,d,e,f,g){var h={_findSiblings:function(){if(h._siblings)return;h._siblings=[];for(var i=parent.frames.length-1;i>=0;i--)try{if(parent.frames[i]&&parent.frames[i].Arbiter&&parent.frames[i].Arbiter.inform)h._siblings.push(parent.frames[i].Arbiter);}catch(j){}},inform:function(){h._findSiblings();var i=g(arguments);h._siblings.forEach(function(j){j.inform.apply(j,i);});}};e.exports=h;},null);
__d("CommentAdminPanelController",["Arbiter","AsyncRequest","Button","ChannelConstants","CSS","DOM","Event","Toggler","URI","Vector","$","copyProperties","ge","XD","MultiLoginPopup"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var t=b('XD').UnverifiedXD,u=function(v){r(this,{locale:v.locale,channel:v.channel,controllerID:v.controllerID,commentIDs:v.commentIDs,domIDs:v.domIDs,duplicateComments:[],fetchMoreCommentsIsPending:{},blacklistedActors:v.blacklistedActors,actorToCommentInfoMap:v.actorToCommentIDMap,commentInfoMap:v.commentInfoMap,inAggregatedView:v.inAggregatedView,inModerationQueue:v.inModerationQueue,inContextualDialog:v.inContextualDialog,isTopLevelCommentPollingEnabled:false,loggedIn:v.loggedIn,newestCommentTimestamp:v.newestCommentTimestamp,realTimePollingParams:{},userOwnsPages:v.userOwnsPages,recentlyBlacklistedActors:v.blacklistedActors});g.subscribe(j.getArbiterType('comments_plugin_new_post'),function(w,x){if(x.obj.target===this.realTimePollingParams.target){if(s(x.obj.comment_element_id))return;var y=r({},this.realTimePollingParams);y.post_fbid=x.obj.post_fbid;var z=x.obj.parent_comment_id;if(z){var aa=s(z);if(!aa)return;var ba=l.scry(aa,'.fbFeedbackPager.uiMorePager');if(ba.length>0)return;y.parent_comment_id=z;y.is_reply_thread=true;}else{if(!this.isTopLevelCommentPollingEnabled)return;y.is_reply_thread=false;}this.pollForComments(y);}}.bind(this));this.controlledRegion=q(this.controllerID);this.attachClickHandlers();if(this.inModerationQueue)this.registerModeratorQueueHandlers(true);};r(u,{allControllers:{},mainController:null,contextualControllers:{},initController:function(v){var w=new u(v),x=v.controllerID;u.allControllers[x]=w;if(w.inContextualDialog){u.contextualControllers[x]=w;}else u.mainController=w;},syncController:function(v,w){var x=u.allControllers[v];x.attachClickHandlers();if(!x.isControllingModerationQueue())return;x.deselectComments(w);x.registerModeratorQueueHandlers(false);x.synchronizeModeratorQueueUI();},resetController:function(v){var w=u.allControllers[v];w.resetController();},appendComments:function(v,w,x){var y=u.allControllers[v];y.appendComments(w,x);},prependComments:function(v,w,x){var y=u.allControllers[v];y.prependComments(w,x);},updateController:function(v,w,x,y,z,aa,ba){var ca=u.allControllers[v];ca.updateController(w,x,y,z,aa,ba);if(!u.mainController.loggedIn)b('MultiLoginPopup').reattachLoginInterceptors();if(!ca.isControllingModerationQueue())return;ca.registerModeratorQueueHandlers(false);ca.synchronizeModeratorQueueUI();},updatePollingParamsCommentas:function(v,w){var x=u.allControllers[v];x.updatePollingParamsCommentas(w);},registerMoreCommentsLinkHandler:function(v,w){var x=u.allControllers[v];x.registerMoreCommentsLinkHandler(w);},replaceContentMaybe:function(v,w){var x=l.scry(document.documentElement,v)[0];if(x)l.replace(x,w);},notifyCommentCreated:function(v){if(!u.mainController.channel)return;t.send({type:'commentCreated',href:v.href,parentCommentID:v.parentCommentID,commentID:v.commentID,message:v.message});},notifyCommentRemoved:function(v){if(!u.mainController.channel)return;t.send({type:'commentRemoved',href:v.href,commentID:v.commentID});},markAsShowingAllReplies:function(v){var w=v+' a.fbUpDownVoteOption',x=l.scry(document.documentElement,w),y=v+' li.fbUpDownVoteOption a.itemAnchor',z=l.scry(document.documentElement,y),aa=x.concat(z);for(var ba=0;ba<aa.length;ba++){var ca=aa[ba],da=new o(ca.getAttribute('ajaxify'));da.addQueryData({show_all_replies:1});ca.setAttribute('ajaxify',da.toString());}},setLoggedIn:function(v){u.mainController.loggedIn=v;},blacklistChangeListener:function(v,w,x){var y=q(w);m.listen(v,'change',function(){if(v.options[v.selectedIndex].value==x){k.show(y);}else k.hide(y);});}});r(u.prototype,{isControllingModerationQueue:function(){var v=this==u.mainController&&this.inModerationQueue;return v;},resetController:function(){this.commentIDs=[];this.domIDs=[];},updateController:function(v,w,x,y,z,aa){v.forEach(function(ca){this.commentIDs.push(ca);},this);w.forEach(function(ca){this.domIDs.push(ca);},this);r(this.blacklistedActors,y);for(var ba in z){if(!this.actorToCommentInfoMap[ba])this.actorToCommentInfoMap[ba]=[];z[ba].forEach(function(ca){this.actorToCommentInfoMap[ba].push(ca);},this);}this.newestCommentTimestamp=Math.max(this.newestCommentTimestamp,x);r(this.commentInfoMap,aa);this.attachClickHandlers();},updatePollingParamsCommentas:function(v){this.realTimePollingParams.commentas=v;},attachClickHandlers:function(){for(var v=0;v<this.domIDs.length;v++){var w='li[id="'+this.domIDs[v]+'"]',x=l.scry(this.controlledRegion,w);if(x.length===0)continue;var y=x[0],z=l.scry(y,'a.uiCloseButton');m.listen(y,'mouseleave',this.closeStickyMenuFlyouts.bind(this,z));var aa=l.scry(y,'.fbModerateDropdownContainer');if(aa.length>0){var ba=aa[0],ca=l.find(ba,'.fbModerateDropdownLink');m.listen(ca,'mouseover',function(la,event){k.addClass(la,'fbUnderlineText');}.bind(null,ca));m.listen(ca,'mouseout',function(la,event){k.removeClass(la,'fbUnderlineText');}.bind(null,ca));var da=l.find(ba,'.fbModerationDropdownList');m.listen(ca,'click',this.exposeDropDownMenu.bind(this,ca,da));m.listen(da.parentNode,'mouseleave',this.concealDropDownMenu.bind(this,ca,da));this.attachDropDownHandlers(y,this.commentIDs[v],da);}var ea=this.commentInfoMap[this.commentIDs[v]].actor,fa=!!this.recentlyBlacklistedActors[ea];if(fa){var ga=l.scry(y,'.fbUndoBlacklistLink');if(ga.length>0){var ha=ga[0];m.listen(ha,'click',this.toggleBlackListAndSync.bind(this,this.commentIDs[v]));}}}var ia=l.scry(this.controlledRegion,'.fbReplyButton'),ja=l.scry(this.controlledRegion,'.fbReplyAfterLoginButton');for(var ka=0;ka<ia.length;ka++)if(this.loggedIn){k.show(ia[ka]);k.hide(ja[ka]);}else{k.hide(ia[ka]);k.show(ja[ka]);}},closeStickyMenuFlyouts:function(v,event){n.hide();for(var w=0;w<v.length;w++)v[w].blur();},attachDropDownHandlers:function(v,w,x){var y=l.scry(x,'.fbBanUser');if(y.length>0){var z=y[0],aa=l.find(z,'^.fbFeedbackPost');if(aa.id.startsWith(w))m.listen(z,'click',this.toggleBlackListAndSync.bind(this,w));}},exposeDropDownMenu:function(v,w,event){if(k.shown(w))return this.concealDropDownMenu(v,w,event);m.stop(event);k.show(w);w.focus();v.blur();var x=l.find(document.documentElement,'.commentContent'),y=p.getElementPosition(w).y+p.getElementDimensions(w).y-p.getElementDimensions(x).y;if(y>0){y=y+2;this.menuBuffer=l.create('div',{className:'menuBuffer',style:{height:y+'px'}});l.appendContent(x,this.menuBuffer);}return false;},concealDropDownMenu:function(v,w,event){m.stop(event);k.removeClass(v,'fbUnderlineText');k.hide(w);v.blur();if(this.menuBuffer){l.remove(this.menuBuffer);delete this.menuBuffer;}return false;},registerMoreCommentsLinkHandler:function(v){var w=v.pager_id;if(!s(w))return;var x=q(w);m.listen(x,'click',this.fetchMoreComments.bind(this,v,x));},deselectComments:function(v){for(var w=0;w<v.length;w++)delete this.selectedCommentsMap[v[w]];},registerModeratorQueueHandlers:function(v){if(v)this.selectedCommentsMap={};this.selectableComments=this.findSelectableComments();this.selectableCheckboxes=[];this.selectAllCheckBoxes=l.scry(this.controlledRegion,'.fbSelectAllCheckbox');this.approveButtons=l.scry(this.controlledRegion,'.fbApproveButton');this.removeButtons=l.scry(this.controlledRegion,'.fbRemoveButton');for(var w=0;w<this.selectableComments.length;w++){var x=this.selectableComments[w].id,y=!!this.selectedCommentsMap[x];this.setCommentSelection(this.selectableComments[w],y);var z=l.find(this.selectableComments[w],'.fbCommentCheckbox');m.listen(z,'click',this.toggleCommentSelection.bind(this));m.listen(this.selectableComments[w],'click',this.toggleCommentSelection.bind(this));z.checked=y;this.selectableCheckboxes.push(z);}for(var aa=0;aa<this.selectAllCheckBoxes.length;aa++){this.selectAllCheckBoxes[aa].checked=false;this.selectAllCheckBoxes[aa].disabled=this.selectableComments.length===0;m.listen(this.selectAllCheckBoxes[aa],'click',this.toggleSelectAllCheckbox.bind(this,this.selectAllCheckBoxes[aa]));}for(var ba=0;ba<this.approveButtons.length;ba++)m.listen(this.approveButtons[ba],'click',this.setBulkPrivacy.bind(this,false));for(var ca=0;ca<this.removeButtons.length;ca++)m.listen(this.removeButtons[ca],'click',this.setBulkPrivacy.bind(this,true));},findSelectableComments:function(){var v=l.scry(this.controlledRegion,'.fbTopLevelComment'),w=[];for(var x=0;x<v.length;x++)if((l.scry(v[x],'.fbCommentCheckbox').length===1)&&(l.scry(v[x],'.fbCommentOverlay').length===0))w.push(v[x]);return w;},toggleCommentSelection:function(event){var v={a:true},w=event.getTarget(),x=w.tagName.toLowerCase(),y=w.parentNode.tagName.toLowerCase();if(v[x]||v[y])return;var z=k.hasClass(w,'fbFeedbackPost')?w:l.find(w,'^.fbFeedbackPost'),aa=this.commentIsSelected(z),ba=!aa;this.setCommentSelection(z,ba);this.synchronizeModeratorQueueUI();if(k.hasClass(w,'fbCommentCheckbox'))m.stop(event);},commentIsSelected:function(v){return k.hasClass(v,'fbCommentSelected');},setCommentSelection:function(v,w){if(w){this.selectComment(v);}else this.deselectComment(v);},selectComment:function(v){k.addClass(v,'fbCommentSelected');this.selectedCommentsMap[v.id]=true;l.find(v,'.fbCommentCheckbox').checked=true;},deselectComment:function(v){k.removeClass(v,'fbCommentSelected');delete this.selectedCommentsMap[v.id];l.find(v,'.fbCommentCheckbox').checked=false;},toggleSelectAllCheckbox:function(v,event){m.stop(event);var w=v.checked;for(var x=0;x<this.selectableComments.length;x++){this.setCommentSelection(this.selectableComments[x],v.checked);this.selectableCheckboxes[x].checked=w;}this.synchronizeBulkModerationCheckboxes(w);this.synchronizeBulkModerationButtons(w);},synchronizeModeratorQueueUI:function(){var v=0;for(var w=0;w<this.selectableCheckboxes.length;w++)if(this.selectableCheckboxes[w].checked)v++;var x=this.selectableCheckboxes.length>0&&v==this.selectableCheckboxes.length;this.synchronizeBulkModerationCheckboxes(x);this.synchronizeBulkModerationButtons(v>0);},synchronizeBulkModerationCheckboxes:function(v){for(var w=0;w<this.selectAllCheckBoxes.length;w++)this.selectAllCheckBoxes[w].checked=v;},synchronizeBulkModerationButtons:function(v){for(var w=0;w<this.approveButtons.length;w++)i.setEnabled(this.approveButtons[w],v);for(var x=0;x<this.removeButtons.length;x++)i.setEnabled(this.removeButtons[x],v);},setBulkPrivacy:function(v,event){m.stop(event);this.synchronizeBulkModerationButtons(false);var w=[];for(var x in this.selectedCommentsMap)w.push(x);var y={is_private:v,in_moderation_queue:true,comment_ids:w,uniqids:w,controller_id:this.controllerID,locale:this.locale,owns_pages:this.userOwnsPages,in_aggregated_view:this.inAggregatedView,in_contextual_dialog:this.inContextualDialog};new h().setURI('/ajax/connect/comments/set_bulk_private.php').setData(y).send();return false;},toggleBlackListAndSync:function(v,event){m.stop(event);var w=this.commentInfoMap[v].actor,x={blacklist:!this.blacklistedActors[w],in_moderation_queue:this.inModerationQueue,comment_id:v,other_comment_ids:this.getOtherCommentsByActor(w,v),uniqid:v,controller_id:this.controllerID,locale:this.locale,owns_pages:this.userOwnsPages,in_aggregated_view:this.inAggregatedView,in_contextual_dialog:this.inContextualDialog};new h().setURI('/ajax/connect/comments/set_blacklist.php').setData(x).setHandler(function(y){this.blacklistedActors[w]=!this.blacklistedActors[w];if(this.blacklistedActors[w]){this.recentlyBlacklistedActors[w]=true;}else delete this.recentlyBlacklistedActors[w];}.bind(this)).send();return false;},getOtherCommentsByActor:function(v,w){return this.actorToCommentInfoMap[v].filter(function(x){return x!=w;});},fetchMoreComments:function(v,w,event){m.kill(event);k.addClass(w,'async_saving');if(this.fetchMoreCommentsIsPending[v.pager_id]===true)return;this.fetchMoreCommentsIsPending[v.pager_id]=true;var x={is_reply_thread:false,in_moderation_queue:false,view_as_moderator:false};r(x,v);var y=l.scry(q(x.controller_id),this.getCommentsSelector(x));y=y.concat(l.scry(q(x.controller_id),this.getCollapsedCommentsSelector(x)));var z=0,aa=0;for(var ba=0;ba<y.length;ba++)if(!k.hasClass(y[ba],'fbCommentIgnored'))if(k.hasClass(y[ba],'fbCommentHidden')){aa++;}else z++;if(x.is_reply_thread)x.offset=z;x.hidden_offset=aa;if(!x.aggregate_view)delete x.aggregate_view;if(!x.comment_id)delete x.comment_id;if(!x.is_reply_thread)x.comment_ids=this.commentIDs;if(!x.commentas){var ca=u.allControllers[x.controller_id];x.commentas=ca.realTimePollingParams.commentas;}new h().setURI('/ajax/connect/feedback.php').setReadOnly(true).setData(x).setHandler(function(da){this.fetchMoreCommentsIsPending[v.pager_id]=false;}.bind(this)).send();},getCommentsSelector:function(v){var w=v.is_reply_thread?'li.fbCommentReply':'li.fbTopLevelComment';if(v.controller_id!=v.uniqid)w='div[id="'+v.uniqid+'"] '+w;return w;},getCollapsedCommentsSelector:function(v){var w=v.is_reply_thread?'div.fbCommentReply':'div.fbTopLevelComment';if(v.controller_id!=v.uniqid)w='div[id="'+v.uniqid+'"] '+w;return w;},getRecentlyBlacklistedActors:function(){var v=[];for(var w in this.recentlyBlacklistedActors)v.push(w);return v;},appendComments:function(v,w){var x=s(v);if(!x)return;var y=l.scry(x,'.fbFeedbackReplies')[0];if(!y)return;l.appendContent(y,w);},prependComments:function(v,w){var x=l.scry(document.documentElement,v)[0];if(!x)return;var y=w.getNodes(),z=[];for(var aa=y.length;aa-->0;){var ba={id:l.getID(y[aa]),element:y[aa]};z.push(ba);var ca=s(ba.id);if(ca){k.hide(ba.element);this.duplicateComments.push(ba.element);for(var da=0;da<z.length;++da)l.insertAfter(ca,z[da].element);z=[];}}for(aa=0;aa<z.length;++aa)l.prependContent(x,z[aa].element);setTimeout(this.removeDuplicateComments.bind(this),0);},removeDuplicateComments:function(){for(var v=0;v<this.duplicateComments.length;++v)l.remove(this.duplicateComments[v]);this.duplicateComments=[];},pollForComments:function(v){var w={locale:this.locale};r(w,v);if(!w.is_reply_thread)w.comment_ids=this.commentIDs;w.newest_comment_timestamp=this.newestCommentTimestamp;var x=this.handlePollResponse.bind(this),y=this.handlePollError.bind(this),z=this.handlePollFinally.bind(this);new h().setURI('/plugins/comments/poll').setReadOnly(true).setData(w).setMethod('GET').setHandler(x).setErrorHandler(y).setFinallyHandler(z).send();},handlePollResponse:function(v){},handlePollError:function(v){},handlePollFinally:function(v){}});e.exports=window.CommentAdminPanelController||u;},null);
__d("legacy:developer-comments-js",["CommentAdminPanelController"],function(a,b,c,d){a.CommentAdminPanelController=b('CommentAdminPanelController');},3);
__d("ConnectLogin",["PopupWindow","URI","WindowComm","XD"],function(a,b,c,d,e,f,g,h,i){var j=b('XD').XD,k={init:function(l){this.appID=l.appID;this.addToProfile=l.addToProfile;this.channelUrl=l.channelUrl;j.init(l);},login:function(l,m,n){this._openPopup(l,m,n);},logout:function(){j.send({type:'logout'});},_openPopup:function(l,m,n){n=n||{};var o=i.makeHandler(function(s){k._closePopup();if(k.appID)k._refreshLoginStatus();l&&l();}),p=i.makeHandler(function(s){k._closePopup();}),q=new h('/login.php');q.setQueryData({api_key:this.appID,next:o,channel_url:p,cancel_url:p,req_perms:m,v:'1.0',fbconnect:1,add_to_profile:this.addToProfile,display:'popup'});q.addQueryData(n);var r=this._getSize(n);this._popup=g.open(q.toString(),r.height,r.width);},_closePopup:function(){if(this._popup){this._popup.close();this._popup=null;}},_refreshLoginStatus:function(){if(this.channelUrl){j.send({type:'refreshLoginStatus'});}else window.location.reload();},_getSize:function(l){if(l.social_plugin=='registration'){return {width:640,height:370};}else return {width:610,height:280};}};e.exports=k;},null);
__d("legacy:connect-login",["ConnectLogin"],function(a,b,c,d){a.ConnectLogin=b('ConnectLogin');},3);
__d("PlatformOptInPopup",["PopupWindow","URI","copyProperties"],function(a,b,c,d,e,f,g,h,i){var j=function(){};i(j,{DIALOG_URL:'/connect/uiserver.php',DIALOG_WIDTH:420,DIALOG_HEIGHT:450,APP_ID:127760087237610,open:function(k,l,m){if(!k)k='generic';if(!l)l='plugin.optin';var n=new h(j.DIALOG_URL);n.addQueryData({social_plugin:k,method:l,display:'popup',secure:h.getRequestURI().isSecure(),app_id:j.APP_ID});if(m)n.addQueryData(m);return g.open(n.toString(),j.DIALOG_WIDTH,j.DIALOG_HEIGHT);}});e.exports=j;},null);
__d("Feedback",["AsyncRequest","CSS","Dialog","DOM","Event","Input","LegacyContextualDialog","MentionsInput","Parent","PlatformOptInPopup","Style","Vector","$","ge","fbt"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var v={comments:{},registerComment:function(w,x){v.comments[w]=x;return v;},getRegisteredComment:function(w){return v.comments[w];},deleteClickHandler:function(w,x,y,z,aa,ba){new i().setTitle("\u6295\u7a3f\u3092\u524a\u9664\u3057\u307e\u3059\u304b\uff1f").setBody("\u3053\u306e\u6295\u7a3f\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f").setButtons([i.newButton('delete',"\u524a\u9664"),i.CANCEL]).setHandler(function(event){new g().setURI('/ajax/connect/feedback.php').setData({command:'delete',url:w,uniqid:z,owns_pages:aa,controller_id:y,locale:ba,comment_id:x}).send();}.bind(this)).show();},attachAddCommentListener:function(w,x){var y=s(w);k.listen(y,'click',function(){var z=s(x);h.removeClass(z,'hidden_elem');j.find(z,'textarea').focus();h.addClass(y,'hidden_elem');v.resizeCommentas(z);return false;});},resizeCommentas:function(w){var x=j.scry(w,'div.post')[0];if(x){var y=r.getElementDimensions(x).x;if(y){var z=j.find(x,'.commentas'),aa=r.getElementDimensions(z).x;if((y-aa)<190&&(y-190)>60){q.set(z,'width',y-190+'px');var ba=j.scry(z,'span.commentas_inner')[0];if(ba){var ca=r.getElementDimensions(ba).x;q.set(z,'width',ca+'px');}}}}},exposeContextualDialogReply:function(w){var x=s(w),y=x.parentNode.parentNode;h.show(j.find(y,"form.composerReply"));j.find(y,"textarea").focus();return false;},concealContextualDialogReply:function(w){var x=s(w),y=x.parentNode.parentNode,z=j.find(y,"form"),aa=j.find(y,"textarea"),ba=aa.value.length;if(!l.getValue(aa))h.hide(z);return false;},closeContextualDialog:function(w){var x=m.getInstance(s(w));x.hide();return false;},_clickLocked:false,attachOptInClickListener:function(w){k.listen(w,'click',function(x){k.kill(x);if(!this._clickLocked){this._clickLocked=true;setTimeout(function(){this._clickLocked=false;}.bind(this),1000);p.open('feedback','plugin.optin');}});},attachReplyListener:function(w){var x=t(w);if(!x)return;var y=j.find(x,'textarea');x.suppressBlur=false;k.listen(x,'click',function(z){var aa=z.getTarget(),ba=o.byClass(aa,'commentas')!==null,ca=o.byClass(aa,'uiButton')!==null,da=o.byClass(aa,'uiSelector')!==null;x.suppressBlur=ba||ca||da;});k.listen(y,'blur',function(z,aa){if(x.interval)return;x.interval=setInterval((function(ba,ca){if(ba.suppressBlur||l.getValue(ca)||ca==document.activeElement)return;h.hide(ba);ba.suppressBlur=false;clearInterval(ba.interval);delete ba.interval;}).bind(null,x,z),100);}.bind(null,y));},attachReplyClickListenerToReply:function(w,x,y){var z=t(w);if(z){var aa=j.scry(z,'form.composerReply')[0];v.attachReplyClickListener(aa,x,y);}},attachReplyClickListenerToPost:function(w,x,y){var z=t(w);if(z){var aa=j.scry(o.byTag(z,'div'),'form.composerReply')[0];v.attachReplyClickListener(aa,x,y);}},attachReplyClickListener:function(w,x,y){if(!w)return;var z=s(x),aa=j.find(w,'textarea');k.listen(z,'click',function(ba){h.show(w);aa.focus();var ca=o.byClass(ba.target,'fbFeedbackPost').id,da=document.createElement("input");da.setAttribute("type","hidden");da.setAttribute("name","replied_to");da.setAttribute("value",ca);w.appendChild(da);setTimeout((function(){var ea=n.getInstance(aa);if(!y.isViewer&&y.isReply)if(ea){var fa=ea.getMentions();if(!fa[y.uid]&&l.getValue(aa)==='')ea.addMention(y);}else l.setValue(aa,y.text+' ');ba.preventDefault();}).bind(this),0);});},resetInput:function(w){var x=n.getInstance(w);if(x)x.reset();l.setValue(w,'');},attachPublishConfirmHandler:function(w,x,y){k.listen(w,'click',function(z){z.preventDefault();j.remove(x);window.open(y,'confirm_comment_story','scrollbars=0,resizable=no,toolbar=0,width=600,height=400');});}};e.exports=a.Feedback||v;},null);
__d("legacy:feedback",["Feedback"],function(a,b,c,d){a.Feedback=b('Feedback');},3);
__d("legacy:dom",["DOM"],function(a,b,c,d){a.DOM=b('DOM');},3);
__d("ReferrerTools",[],function(a,b,c,d,e,f){e.exports.storeAncestorOrigins=function(g){if(!location||!location.ancestorOrigins)return;for(var h=0;h<location.ancestorOrigins.length;h++){var i=document.createElement('input');i.type='hidden';i.name='ancestor_origins[]';i.value=location.ancestorOrigins.item(h);g.appendChild(i);}};},null);