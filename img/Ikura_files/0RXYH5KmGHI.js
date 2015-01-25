/*!CK:4071615161!*//*1421682796,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["v6YPj"]); }

__d("tickerPhoteSnowLiftOpenStatus",["ArbiterMixin","copyProperties"],function(a,b,c,d,e,f,g,h){var i='CheckIsOpen',j={registerOpenChecker:function(k){return j.subscribe(i,function(l,m){if(k())m.is_Open=true;});},checkIsOpen:function(){var k={is_Open:false};j.inform(i,k);return k.is_Open;}};h(j,g);e.exports=j;},null);