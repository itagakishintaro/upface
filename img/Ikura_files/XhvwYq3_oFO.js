/*!CK:4267288804!*//*1421682760,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["dV4Lu"]); }

__d("HashtagSpan.react",["React","cx"],function(a,b,c,d,e,f,g,h){var i=g.createClass({displayName:"HashtagSpan",render:function(){return (g.createElement("span",{"data-offset-key":this.props.offsetKey,className:"_5u8n",spellCheck:false},this.props.children));}});e.exports=i;},null);
__d("WeakMentionSpan.react",["React","cx"],function(a,b,c,d,e,f,g,h){var i=g.createClass({displayName:"WeakMentionSpan",render:function(){return (g.createElement("span",{"data-offset-key":this.props.offsetKey,className:"_whq",spellCheck:false},this.props.children));}});e.exports=i;},null);
__d("getHashtagMatchesExperimental",["getHashtagRegex"],function(a,b,c,d,e,f,g){var h=g();function i(j,k){var l=j.getText(),m,n,o,p;while((m=h.exec(l))!==null){n=m.index+m[1].length;o=m[2];p=m[3];k(n,n+o.length+p.length);}}e.exports=i;},null);
__d("getMentionsInputDecorator",["ComposedEntityType","DocumentCompositeDecorator.Experimental","DocumentDecorator","EmoticonSpan.react","HashtagSpan.react","MentionSpan.react","WeakMentionSpan.react","getEntityMatcherExperimental","getHashtagMatchesExperimental"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p=g.EMOTICON,q=g.MENTION,r;function s(){if(!r)r=new h([new i(n(function(t){var u=t.getData();return t.getType()===q&&u&&u.isWeak;}),m),new i(n(function(t){return t.getType()===q;}),l),new i(n(function(t){return t.getType()===p;}),j),new i(o,k)]);return r;}e.exports=s;},null);
__d("MentionsInput.Experimental.react",["AbstractMentionsTextEditor.Experimental.react","EditorState","MentionsLayer.react","React","createMentionEntity","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=j.PropTypes,o=j.createClass({displayName:"MentionsInput",propTypes:{editorState:n.instanceOf(h).isRequired,mentionsSource:n.object,typeaheadView:n.func.isRequired,typeaheadViewPropTypes:n.object,spellCheck:n.bool,placeholder:n.string,className:n.string,autoflip:n.bool,handleContentReturn:n.func,handleDroppedFiles:n.func,handlePastedFiles:n.func,onAddMention:n.func,onShowMentions:n.func,onChange:n.func,onInputFocus:n.func,onInputBlur:n.func},blur:function(){this.refs.textEditor.blur();},focus:function(){this.refs.textEditor.focus();},render:function(){var p=m(this.props.className,"_5yk1");return (j.createElement("div",{className:p,onClick:this.focus,onFocus:this.focus},j.createElement(g,j.__spread({},this.props,{mentionResultsComponent:i,mentionResultsProps:{typeaheadView:this.props.typeaheadView,typeaheadViewProps:this.props.typeaheadViewProps,autoflip:this.props.autoflip},mentionCreationFn:k,ref:"textEditor",className:"_5yk2",stripPastedStyles:true}))));}});e.exports=o;},null);
__d("createEditorStateWithMentions",["DocumentCharacters","EditorState","applyEntityToContentBlock","createContentStateFromBlocks","createInitialEditorState","createPlainBlocksFromText"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=new RegExp(g.SOFT_NEWLINE,'ig');function n(o){var p=o,q=p.text,r=p.ranges,s=p.decorator,t=p.mentionCreationFn,u=p.splitIntoBlocks,v=p.allowUndo,w,x;if(u===undefined)u=true;if(q){w=u?q.split(m):[q];x=[];var y=0;w.forEach(function(ba){x.push(y);y+=ba.length+1;});}else w=[''];var z=l(w);if(r&&r.length&&t)r.forEach(function(ba){var ca=t(ba.entity);if(ca===null)return;var da=ba.offset,ea,fa;for(var ga=0;ga<x.length;ga++){var ha=x[ga],ia=x[ga+1];if(ia===undefined||(da>=ha&&da<ia)){ea=z[ga];fa=da-ha;break;}}z[ga]=i(ea,fa,fa+ba.length,ca);});var aa=k(j(z,s),s);if(v===false)aa=h.set(aa,{allowUndo:false});return aa;}e.exports=n;},null);
__d("createEmptyEditorState",["createContentStateFromBlocks","createInitialEditorState","createPlainBlocksFromText"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(k){var l=i(['']),m=g(l);return h(m,k);}e.exports=j;},null);
__d("getMentionsTextForContentState",["ComposedEntityType","DocumentCharacters","DocumentEntity","emptyFunction"],function(a,b,c,d,e,f,g,h,i,j){var k=j.thatReturnsTrue,l=/[\\\]:]/g;function m(o){var p=o.getBlockMap().map(function(q){var r=q.getText(),s=[];q.findEntityRanges(k,function(t,u){s.push(n(r.slice(t,u),q.getEntityAt(t)));});return s.join('');});return p.join(h.SOFT_NEWLINE);}function n(o,p){if(p){var q=i.get(p);if(q.getType()===g.MENTION){o=o.replace(l,function(r){return '\\'+r;});return '@['+q.getData().id+':'+o+']';}else if(q.getType()===g.EMOTICON)return q.getData().originalEmoticon;}return o.replace('@[','@ [');}e.exports=m;},null);
__d("UFIMentionsInput.react",["Arbiter","BanzaiScuba","Bootloader","CommentPrelude","ComposedEntityMutability","ComposedEntityType","DocumentEntity","DocumentModifierExperimental","DOMVector","EditorChangeType","EditorState","Input","Keys","MentionsInput.Experimental.react","React","UserAgent","URI","createEditorStateWithMentions","createEmptyEditorState","createMentionEntity","cx","emptyFunction","getMentionsInputDecorator","getMentionsTextForContentState","getVisibleValueForContentState","handleBeforeInputForEmoticon","handleSoftNewlineForEmoticon","isSoftNewlineEvent","setImmediate"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca,da,ea,fa,ga,ha,ia){var ja=new h('ufi_tinder',null,{addBrowserFields:true,addGeoFields:true,addPredictedGeographyFields:true,addMobileDeviceFields:true,addUser:true}),ka=200,la=((v.isPlatform('iOS')||v.isPlatform('Linux')||v.isPlatform('Mac OS X')||v.isPlatform('Windows')||v.isPlatform('Chrome OS'))&&(v.isBrowser('Chrome')||v.isBrowser('Firefox >= 16')||v.isBrowser('IE >= 9')||v.isBrowser('Opera >= 12')||v.isBrowser('Mobile Safari >= 6')||v.isBrowser('Safari >= 5')));function ma(qa){var ra=qa.map(function(sa){return {kind:'file',type:sa.type,getAsFile:ba.thatReturns(sa)};});return {clipboardData:{items:ra}};}function na(qa){var ra=/^image\//;return qa.filter(function(sa){return ra.test(sa.type);});}var oa=u.createClass({displayName:"UFIMentionsInput",getInitialState:function(){var qa='',ra=[];if(this.props.initialData){qa=this.props.initialData.value||'';ra=this.props.initialData.mentions||[];ra=ra.map(function(ta){return Object.assign({},ta,{entity:{uid:ta.uid,weakreference:ta.weakreference}});});}var sa=x({text:qa,ranges:ra,decorator:ca(),mentionCreationFn:pa});sa=q.moveSelectionToEnd(sa);return {bootloaded:false,fullRender:!!(this.props.initialData&&this.props.initialData.value),typeaheadReporter:null,editorState:sa,mentionsSource:null,mentionableEntries:null,fallbackText:qa};},hasEnteredText:function(){return !!this.state.editorState.getCurrentContent().getPlainText().trim();},focus:function(){this._triggerFullRender(function(){if(la){this.refs.mentionsInput.focus();}else this.refs.textarea.getDOMNode().focus();}.bind(this));},submitComment:function(event){if(this._submitComment(event))this._clearDocumentState();},insertMention:function(qa){this._triggerFullRender(function(){if(la){var ra=this.state.editorState,sa=ra.getSelection(),ta=ra.getCurrentContent(),ua=sa.getStartKey(),va=sa.getStartOffset(),wa=ta.getBlockForKey(ua),xa;if(wa.getText().substr(va-1,1).trim().length>0){var ya=n.replaceText(ta,sa,' ');sa=ya.getSelectionAfter();xa=n.insertText(ya,sa,qa.getTitle(),ra.getCurrentInlineStyle(),z(qa));}else xa=n.replaceText(ta,sa,qa.getTitle(),ra.getCurrentInlineStyle(),z(qa));ra=q.push(ra,xa,p.INSERT_FRAGMENT);ra=q.forceSelection(ra,ra.getSelection());this.setState({editorState:ra});this.focus();}else{this.refs.textarea.getDOMNode().focus();if(this.state.fallbackText.length){this.setState({fallbackText:this.state.fallbackText+' '+qa.title});}else this.setState({fallbackText:qa.title});}}.bind(this));},insertEmoticon:function(qa){if(!la){this.setState({fallbackText:this.state.fallbackText+' '+qa});return;}var ra=this.state.editorState,sa=ra.getCurrentContent(),ta=ra.getSelection(),ua=sa.getBlockForKey(ta.getStartKey()).getText()[ta.getStartOffset()-1];if(ua&&ua!==' ')qa=' '+qa;var va=sa.getBlockForKey(ta.getEndKey()).getText()[ta.getEndOffset()];if(va&&va!==' ')qa+=' ';var wa=n.replaceText(ra.getCurrentContent(),ra.getSelection(),qa);ra=q.push(ra,wa,p.INSERT_CHARACTERS);ra=q.forceSelection(ra,ra.getSelection());this.setState({editorState:ra});},_informHeightChange:function(){if(this.props.monitorHeight)ia(function(){if(!this.isMounted())return;var qa=la?this.refs.mentionsInput.getDOMNode():this.refs.textarea.getDOMNode(),ra=o.getElementDimensions(qa).y;if(ra!==this._height){this._height=ra;g.inform('ufi/inputHeightChanged',{node:qa});}}.bind(this));},_onChange:function(qa){this.setState({editorState:qa},this._informHeightChange);},_clearDocumentState:function(){this.state.typeaheadReporter&&this.state.typeaheadReporter.sessionEnd();var qa=y(ca());this.setState({editorState:q.moveFocusToEnd(qa)});},_handleContentReturn:function(qa){if(ha(qa)){var ra=ga(this.state.editorState);if(ra===this.state.editorState){return false;}else{this.setState({editorState:ra});return true;}}if(this._submitComment(qa)){this._clearDocumentState();return true;}return false;},_handleBeforeInput:function(qa){var ra=fa(this.state.editorState,qa);if(ra===this.state.editorState){return false;}else{this.setState({editorState:ra});return true;}},_submitComment:function(qa){var ra=this.state.editorState.getCurrentContent(),sa=ea(ra),ta=da(ra),ua={visibleValue:sa,encodedValue:ta},va=r.getValue(this.refs.proxyInput.getDOMNode());if(va){var wa=new w(a.location.href);ja.addNormal('path',wa.getPath());ja.addNormal('proxy_value',va.substr(0,ka));ja.post();}return this.props.onEnterSubmit(ua,qa);},_handleFiles:function(qa){var ra=na(qa);if(ra.length){this.props.onPaste(ma(ra));return true;}return false;},_handleDroppedFiles:function(qa,ra){return this._handleFiles(ra);},_handlePastedFiles:function(qa){return this._handleFiles(qa);},_onMentionsInputBlur:function(){this.state.typeaheadReporter&&this.state.typeaheadReporter.sessionEnd();this.props.onBlur&&this.props.onBlur();},_onMentionsInputFocus:function(){if(!this.state.bootloaded&&!this._currentlyBootloading){this._currentlyBootloading=true;i.loadModules(["TypeaheadMetricReporter","getMentionsSearchSource"],function(qa,ra){if(!this.isMounted())return;var sa=new qa({event_name:'tinder_mentions'});sa.sessionStart();var ta=ra(this.props.datasource,sa);ta.bootstrap();this.setState({typeaheadReporter:sa,bootloaded:true,mentionsSource:ta},function(){this._currentlyBootloading=false;}.bind(this));}.bind(this));}else if(this.state.typeaheadReporter)this.state.typeaheadReporter.sessionStart();this.props.onFocus&&this.props.onFocus();},_onShowMentions:function(qa,ra){if(this.state.typeaheadReporter)this.state.typeaheadReporter.reportResults(qa.map(function(sa){return sa.getUniqueID();}));},_onAddMention:function(qa,ra,sa){if(this.state.typeaheadReporter){this.state.typeaheadReporter.reportSelect(qa.getUniqueID(),qa.getType(),ra,sa.button>=0);this.state.typeaheadReporter.sessionEnd();}},_onFallbackKeyDown:function(qa){if(qa.which!==s.RETURN)return;if(ha(qa)||!this.state.fallbackText.trim())return;qa.preventDefault();var ra={visibleValue:this.state.fallbackText,encodedValue:this.state.fallbackText};if(this.props.onEnterSubmit(ra,qa))this.setState({fallbackText:''});},_onFallbackChange:function(qa){this.setState({fallbackText:qa.target.value});},_onFallbackBlur:function(qa){this.props.onBlur&&this.props.onBlur();},_onFallbackFocus:function(qa){this.props.onFocus&&this.props.onFocus();},_sortByRenderType:function(qa,ra){var sa=qa.getAuxiliaryData().renderType,ta=ra.getAuxiliaryData().renderType;if(sa===ta)return qa.getOrder()-ra.getOrder();var ua=this.props.viewOptionsTypeObjectsOrder;return ua.indexOf(sa)-ua.indexOf(ta);},_triggerFullRender:function(qa){this.setState({fullRender:true},qa);},_triggerFullRenderWithoutCallback:function(){this._triggerFullRender();},_renderFallback:function(){return (u.createElement("div",null,u.createElement("textarea",{ref:"textarea",className:"UFIAddCommentInput _1os9",name:"add_comment_text",placeholder:this.props.placeholder,spellCheck:true,onKeyDown:this._onFallbackKeyDown,onChange:this._onFallbackChange,onBlur:this._onFallbackBlur,onFocus:this._onFallbackFocus,value:this.state.fallbackText})));},_renderProxyInput:function(){if(!this.props.hideProxyInput){var qa="_1osa mentionsHidden";return (u.createElement("input",{className:qa,name:"add_comment_text",ref:"proxyInput",onFocus:this.focus,tabIndex:"-1"}));}},_renderDummy:function(){var qa="UFIAddCommentInput _1osb _1osc";return (u.createElement("div",{onFocus:this._triggerFullRenderWithoutCallback,onSelect:ba,onClick:this._triggerFullRenderWithoutCallback,onTouchStart:this._triggerFullRenderWithoutCallback,onMouseOver:this._triggerFullRenderWithoutCallback},this._renderProxyInput(),u.createElement("div",{className:qa},this.props.placeholder)));},_onClickEditorContainer:function(qa){j.click(qa.target,false);},_renderMentionsInput:function(){var qa="UFIAddCommentInput _1osb",ra=Object.assign({mentionSortFn:(this.props.viewOptionsTypeObjectsOrder?this._sortByRenderType:null)},this.props.viewProps);return (u.createElement("div",{onClick:this._onClickEditorContainer},this._renderProxyInput(),u.createElement(t,{ref:"mentionsInput",className:qa,editorState:this.state.editorState,onChange:this._onChange,mentionsSource:this.state.mentionsSource,typeaheadView:this.props.viewComponent,typeaheadViewProps:ra,spellCheck:true,placeholder:this.props.placeholder,onAddMention:this._onAddMention,onShowMentions:this._onShowMentions,onFocus:this._onMentionsInputFocus,onBlur:this._onMentionsInputBlur,handleContentReturn:this._handleContentReturn,handleBeforeInput:this._handleBeforeInput,handlePastedFiles:this._handlePastedFiles,handleDroppedFiles:this._handleDroppedFiles,autoflip:this.props.autoflip})));},componentDidMount:function(){if(!la){if(this.state.fallbackText)this.refs.textarea.getDOMNode().focus();}else if(this.state.editorState.getCurrentContent().hasText())ia(function(){this.isMounted()&&this.focus();}.bind(this));},render:function(){if(!la)return this._renderFallback();if(!this.state.fullRender)return this._renderDummy();return this._renderMentionsInput();}});function pa(qa){return m.create(l.MENTION,k.IMMUTABLE,{id:qa.uid,isWeak:qa.weakreference});}e.exports=oa;},null);