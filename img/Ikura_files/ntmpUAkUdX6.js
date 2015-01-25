/*!CK:2530030109!*//*1401162790,178179405*/

if (self.CavalryLogger) { CavalryLogger.start_js(["U55fI"]); }

__d("EntstreamGroupFeedObjectOptionsMenu",["EntstreamFeedObjectFollow","EntstreamFeedObjectHide"],function(a,b,c,d,e,f,g,h){function i(j,k,l){j.subscribe('itemclick',function(m,n){switch(n.item.getValue()){case 'markspam':h.hide(k);break;case 'follow_post':case 'unfollow_post':g.toggleFollow(n.item,k,l);break;}}.bind(this));}e.exports=i;},null);
__d("legacy:timeline-edit-checkdirty",["TimelineEditCheckDirty"],function(a,b,c,d){a.TimelineEditCheckDirty=b('TimelineEditCheckDirty');},3);