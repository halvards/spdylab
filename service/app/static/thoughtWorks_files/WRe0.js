var WRWarn="Copyright 2006-2013 ClickTale Ltd., US Patent and US Patent Pending",WRA,WRCU,WRD=document,WRAt=false,WRCW,WRAu,WRs,WRK,WRBy,WRE=".clicktale.net/",WRAH,WRk,WRBW,WRCV,WRB=[],WRt,ClickTaleCookieDomain,ClickTaleUnloadPause=200,ClickTaleEventsMask=511-128,ClickTaleFetchFrom,ClickTaleCookieExpiryDays=365,ClickTaleUIDCookieName="WRUID",ClickTaleIgnoreCookieName="WRIgnore",WRBT,WRAX,WRAE,WRAL,WRAM,WRAN,WRAO,WRBX=!(!(window.WRU));(function(a){if(a.search(/www\.\w+\.\w+/i)==0){ClickTaleCookieDomain=a.substring(4,a.length)}})(WRD.domain);WRAv();if(WRAt){WRAw("note1: entering debug mode, ClickTale script is installed")}if(typeof WRInitTime=="undefined"){var WRInitTime=(new Date()).getTime();if(WRAt){WRAw("warning1: top ClickTale script is missing in the page")}}if(!WRBW){WRBW=WRBY()}if(!WRk){WRk=WRBW.a}var WRCJ=WRCK();WRt=(WRD.compatMode=="BackCompat");WRs=(WRt?WRD.body:WRD.documentElement);if(WRBW){WRCV=(window.ClickTaleSettings&&typeof ClickTaleSettings.CookieName!="undefined")?ClickTaleSettings.CookieName:"__CT_Data";if(WRCV){WRCP(WRCV,"gpv",ClickTaleCookieExpiryDays)}}WRl(window,"load",WRc);if(!window.ClickTaleIncludedOnDOMReady){if(WRD.addEventListener){WRD.addEventListener("DOMContentLoaded",WRondomload,false)}else{if(WRBW&&WRBW.t==WRBW.IE){WRD.write('<script id="ClickTaleDefer" defer="defer" src=//:><\/script>');(function(a){if(a){a.onreadystatechange=function(){if(this.readyState=="complete"){WRondomload()}}}})(WRD.getElementById("ClickTaleDefer"))}}}else{WRondomload()}function WRCK(){var a=document.getElementsByTagName("script");if(a.length){var b=a[a.length-1];if(b.src){return b.src}}return false}function ClickTale(e,f,a){function d(){if(typeof ClickTaleScriptSource!="undefined"){if(typeof ClickTaleScriptSource=="string"){return ClickTaleScriptSource}else{return WRE}}if(WRCJ){if(WRCJ.substr(0,23)=="http://s.clicktale.net/"){return"http://s.clicktale.net/"}if(WRCJ.substr(0,33)=="https://clicktale.pantherssl.com/"){return"https://clicktale.pantherssl.com/"}}var g=a.substr(0,3)=="www"?a:"www";if(typeof ClickTaleSSL!="undefined"&&((ClickTaleSSL==1&&location.protocol=="https:")||ClickTaleSSL==2)){return"https://clicktalecdn.sslcs.cdngc.net/"+g+"/"}else{return"http://cdn.clicktale.net/"+g+"/"}}if(WRAX){if(WRAt){WRAw("error3: Monitoring has already started")}throw"CT: Monitoring has already started"}if(ClickTaleIsPlayback()){return}if(f==undefined){f=1}WRA=e;if(!a){a="www"}WRCU=a;if(WRAt){WRAw("note2: preparing to record (ver "+14+"."+1+") for project id "+e+" and partition "+a);if(f==1){WRAw("note3: recording all visitors to this page ("+f+")")}else{WRAw("note3: recording approximately 1 of every "+Math.ceil(1/f)+" visitors to this page ("+f+")")}}if(!WRk){if(WRAt){WRAw("warning2: the current browser is not supported")}return}if(location.protocol=="file:"){if(WRAt){WRAw("warning3: the current protocol is not supported")}return}var c="_"+WRA+"_"+WRCU;if(WRCV){WRCP(WRCV,"apv"+c,ClickTaleCookieExpiryDays)}if(!ClickTaleIgnoreCookieName||!ClickTaleUIDCookieName||!WRCV){if(WRAt){WRAw("warning9: can't record when cookies are not specified")}return}if(WRi(ClickTaleIgnoreCookieName)){if(WRAt){WRAw("warning6: the current machine/user is temporarily disabled for recording")}return}WRK=WRi(ClickTaleUIDCookieName);WRBy=false;if(WRK==null){WRBy=true;if(Math.random()<f){WRK=WRAY()}else{WRK=0}}WRh(ClickTaleUIDCookieName,WRK,ClickTaleCookieExpiryDays);if(WRK==0||(WRi(ClickTaleUIDCookieName)==null&&f!=1)){if(WRAt){WRAw("warning4: the current machine/user is disabled for recording")}return}if(WRAt){WRAw("note3b: visitor id "+WRK)}WRE="http://"+a+WRE;if(typeof ClickTaleSSL!="undefined"){if((ClickTaleSSL==1&&location.protocol=="https:")||ClickTaleSSL==2){WRE=WRE.replace(/^http/,"https")}}WRAH=d();WRAX=true;WRC({a:"start",t:WRH()});if(WRCV){WRCP(WRCV,"cpv"+c,ClickTaleCookieExpiryDays)}var b=new Image();b.src=WRE+"i/"+WRA+".gif?r="+f+"&UID="+WRK+(WRBy?"&new":"")+(WRBT?"&as=1":"")+(WRBW.m?"&m=1":"")+"&"+WRG();b.onerror=function(){b.onload=null;b.onerror=null;WRAx()};b.onload=function(){b.onload=null;b.onerror=null;WRF(b)}}function ClickTaleDetectAgent(){return WRBg(navigator.userAgent)}function ClickTaleIsPlayback(){if(typeof ClickTaleContext=="object"){return true}try{return parent&&parent!=window&&parent.WebPlayer}catch(a){}return false}var ClickTaleIsRecording=WRB1;function WRF(b){if(b.width==2&&b.height==1){WRAx();return}if(WRBX){if(WRAt){WRAw("note4: preparing for stage 2")}WRU()}else{var c=WRD.createElement("script");c.src=WRAH+"WRe1b.js";var a=WRD.getElementById("ClickTaleDiv");if(!a){a=WRD.getElementById("ClickTale")}if(a){if(WRAt){WRAw("note4: preparing for stage 2")}a.appendChild(c)}else{if(WRAt){WRAw("error1: no 'ClickTale' DIV element found in this page")}}}}function WRAx(){if(WRAt){WRAw('error2: unable to record because either there are no credits for project, the domain is not checked in the account\'s "Manage Domains" section or communication is down')}WRh(ClickTaleIgnoreCookieName,true,ClickTaleCookieExpiryDays?0.007:false)}function WRG(){return Math.floor(Math.random()*2147483647)}function WRAY(){return WRG()+"."+(WRInitTime&2147483647)}function WRH(){return(new Date()).getTime()-WRInitTime}function WRB1(){return typeof WRSID=="number"}function WRC(a){if(WRB1()){WRZ(a)}else{if(WRB.push){WRB.push(a)}}}function WRc(){WRAE={a:"load",w:WRp(),h:WRq(),sw:WRAR(),sh:WRAS(),cw:WRBm(),ch:WRBn(),lw:WRBp(),lh:WRBq(),o:WRBo(),t:WRH()};WRC(WRAE)}function WRp(){return self.innerWidth||WRs.offsetWidth}function WRq(){return self.innerHeight||WRs.offsetHeight}function WRAR(){return WRs.scrollWidth}function WRAS(){return WRs.scrollHeight}function WRBo(){return window.orientation|0}function WRBm(){return WRBW.m?self.innerWidth:WRs.clientWidth}function WRBn(){return WRBW.m?self.innerHeight:WRs.clientHeight}function WRBp(){return WRs.clientWidth}function WRBq(){return WRs.clientHeight}function WRh(c,d,e){if(e){var b=new Date();b.setTime(b.getTime()+(e*86400000));var a="; expires="+b.toGMTString()}else{var a=""}WRD.cookie=c+"="+d+a+"; path=/;"+(ClickTaleCookieDomain?" domain="+ClickTaleCookieDomain+";":"")}function WRCQ(a){WRh(a,null,-1)}function WRi(b){var e=b+"=";var a=WRD.cookie.split(";");for(var d=0;d<a.length;d++){var f=a[d];f=f.replace(/^\s\s*/,"");if(f.indexOf(e)==0){return f.substring(e.length,f.length)}}return null}function WRCR(c,f,e,a){var b=WRCS(c);if(!b){b=[]}for(var d=0;d<b.length;d++){if(b[d][0]==f){b[d][1]=e;break}}if(d==b.length){b.push([f,e])}var g=[];for(var d=0;d<b.length;d++){if(b[d][1]!==null){g.push(b[d].join("="))}}WRh(c,g.join("&"),a)}function WRCT(b,c,a){WRCR(b,c,null,a)}function WRCS(b,h){var e=WRi(b);if(!e){return null}var a=e.split("&"),f=[];for(var d=0;d<a.length;d++){var g=a[d];var c=g.split("=");if(c.length==2){f.push(c)}}if(!h){return f}for(var d=0;d<f.length;d++){if(f[d][0]==h){return f[d][1]}}return null}function WRCP(c,d,a){var b=parseInt(WRCS(c,d))||0;WRCR(c,d,b+1,a)}function ClickTaleGetSID(){return typeof WRSID=="number"?WRSID:null}function ClickTaleGetUID(){var a=WRi(ClickTaleUIDCookieName);return a>0?a:null}function ClickTaleSetUID(a){if(a>0||a===0||a==="0"){WRh(ClickTaleUIDCookieName,a,ClickTaleCookieExpiryDays)}else{WRCQ(ClickTaleUIDCookieName)}}function ClickTaleGetPID(){return typeof WRA=="number"?WRA:null}function ClickTaleTag(a){WRC({a:"tag",c:a,t:WRH()})}var ClickTaleEvent=ClickTaleTag;function ClickTaleNote(a){WRC({a:"note",c:a,t:WRH()})}function ClickTaleField(b,a){WRC({a:"field",f:b,v:a,t:WRH()})}function ClickTaleExec(a){if(a.length>2000&&WRBW.XDR){WRC({a:"exec",streamval:a,t:WRH()})}else{WRC({a:"exec",c:a,t:WRH()})}}function ClickTaleRegisterFormSubmitSuccess(b){if(WRB1()){WRB4(b)}else{if(b==null){WRC({a:"submitsuccess",i:false,t:WRH()})}}}function ClickTaleRegisterFormSubmitFailure(b){if(WRB1()){WRB5(b)}else{if(b==null){WRC({a:"submitfail",i:false,t:WRH()})}}}function ClickTaleIgnore(a){WRh(ClickTaleUIDCookieName,0,a)}function ClickTaleUploadPage(a,b){if(WRAX){throw"CTUP: Monitoring has already started"}WRAL=true;WRAN=a;WRAO=b;if(WRAM&&WRB1()){WRAZ()}}function ClickTaleSetAllSensitive(){WRBT=true}function ClickTaleGetVersion(){return[14,1]}function ClickTaleSetCustomElementID(a,b){a.ClickTale=a.ClickTale||{};a.ClickTale.CustomID=b}function WRondomload(){if(ClickTaleIsPlayback()||WRAM){return}var b=WRD.getElementById("ClickTaleDefer");if(b){b.parentNode.removeChild(b)}var a=new RegExp('(<div id="?ClickTaleDiv"?[^>]+>)\\s*<script[^>]+><\/script>\\s*(</div>)',"i");WRAM=WRD.documentElement.innerHTML.replace(a,"$1$2");WRC({a:"domload",t:WRH()});if(WRB1()){WRAP()}if(WRAL&&WRB1()){WRAZ()}}function WRAv(){if(ClickTaleIsPlayback()){return}WRAy(location.hash.substr(1));WRAy(location.search.substr(1))}function WRAy(d){var c=d.split("&");for(var b=0;b<c.length;b++){var e=c[b].split("=");var a=decodeURIComponent(e[0]).toLowerCase();if(e.length==2&&(a=="ct"||a=="clicktale")){WRAz(e[1])}}}function WRAz(d){var c=d.split(",");for(var b=0;b<c.length;b++){switch(c[b].toLowerCase()){case"debug":if(!window.ClickTaleIncludedOnDOMReady){WRD.write('<textarea id="ClickTaleDebugDump" rows="5" cols="80" style="position: absolute; left:10px; top:10px; border: solid #6C358D;"></textarea>')}WRAu=WRD.getElementById("ClickTaleDebugDump");if(WRAu){WRAu.value=""}WRAt=1;break;case"enable":WRCQ(ClickTaleIgnoreCookieName);var a=WRi(ClickTaleUIDCookieName);if(a==null||a==0){WRh(ClickTaleUIDCookieName,WRAY(),ClickTaleCookieExpiryDays)}break;case"disable":WRh(ClickTaleUIDCookieName,0,ClickTaleCookieExpiryDays);break;case"reset":WRCQ(ClickTaleUIDCookieName);break;case"uaskipcheck":WRBW=WRBY(true);WRAw("warning8: skipping userAgent support check, running as: "+WRBW.a);break;default:ts=c[b].match(/^(\w+)(\(|%28)(.+)(\)|%29)$/i);if(ts&&ts.length==5){var a=decodeURIComponent(ts[3]),e=ts[1];switch(e.toLowerCase()){case"t":ClickTaleTag(a);break;case"u":ClickTaleSetUID(a);break;case"ua":WRk=decodeURIComponent(a);WRAw("warning7: forcing userAgent type: "+WRk);break;case"uao":WRBW=JSON.parse(a);WRAw("warning7: forcing userAgentObj type: "+a);break;case"report":if(/test|subs\d?\d?/.test(a)){WRAt=2;WRCW="http://"+(a=="test"?"ct.test":(a+".app.clicktale.com"))}break;default:WRAw("warning5: unknown parameter in URL: "+e);break}}break}}}function WRAw(a){if(WRAt==1){if(WRAu){WRAu.value+=(a+"\n")}else{if(console&&console.log){console.log("CT: "+a)}else{alert("CT: "+a)}}}if(WRAt==2){try{if(parent&&parent!=window){if(parent.postMessage){parent.postMessage(a,WRCW)}else{alert("CT: Browser doesn't support diagnostics.")}}else{console.log("CT: "+a)}}catch(b){alert("CT: exception trying to communicate diagnostics data.")}}}function WRBY(a){var b=WRBg(navigator.userAgent);if(!a){if(window.ClickTaleSettings&&ClickTaleSettings.CheckAgentSupport){b=ClickTaleSettings.CheckAgentSupport(WRBh,b)}else{b=WRBh(b)}}return b}function WRBh(a){if(!a){return false}if((a.t==a.IE&&a.v>=7&&a.v<=10&&!a.m)||(a.t==a.FF&&a.v>=1.5&&a.v<=22&&!a.m)||(a.t==a.Ch&&a.v>=9&&a.v<=28)||(a.t==a.Sa&&a.v>=5.1&&a.v<6.1)||(a.t==a.WK&&a.v>=534&&a.v<=539)){return a}return false}function WRBr(b){var d={};var e=" "+b+" ";var c=/ (\w+)(?:\/([\w\.]+))? (?:(\([^\)]+\)) )?/img;var a;while((a=c.exec(e))!=null){d[a[1]]={value:a[2],extra:a[3]};c.lastIndex--}return d}function WRBg(b){var c={IE:0,FF:1,Ch:2,Sa:3,Op:4,WK:5};var f=WRBr(b);if(f.Opera){c.t=c.Op;c.v=0;c.a="Op";c.m=false;return c}if(f.Mozilla&&f.Mozilla.extra){var d=f.Mozilla.extra;var a=d.indexOf("MSIE ");if(a!=-1){c.t=c.IE;c.v=parseFloat(d.substr(a+5,3));c.a="IE"+c.v;c.m=(d.indexOf("; Touch")!=-1);if(c.v>=8){c.XDR=true}return c}}if(f.Firefox&&f.Firefox.value){c.t=c.FF;c.v=parseFloat(f.Firefox.value);if(c.v<10){c.a="FF"+(c.v*10)}else{c.a="FF"+c.v}c.m=(f.Mozilla&&f.Mozilla.extra&&f.Mozilla.extra.indexOf("Android; ")!=-1);if(c.v>=3.5){c.XDR=true}return c}if((f.Chrome&&f.Chrome.value)||(f.CriOS&&f.CriOS.value)){c.t=c.Ch;c.v=parseFloat(f.Chrome?f.Chrome.value:f.CriOS.value);c.a="Ch"+c.v;c.m=(!(!f.CriOS))||(f.Mozilla&&f.Mozilla.extra&&f.Mozilla.extra.indexOf("; Android ")!=-1);if(c.v>=9){c.XDR=true}return c}if(f.Safari){if(f.Mozilla&&f.Mozilla.extra&&f.Mozilla.extra.indexOf("; Android ")!=-1&&f.AppleWebKit&&f.AppleWebKit.value){c.t=c.WK;c.v=parseFloat(f.AppleWebKit.value);c.a="WK"+parseInt(c.v);c.m=true;if(c.v>=5){c.XDR=true}return c}if(f.Version&&f.Version.value){c.t=c.Sa;c.v=parseFloat(f.Version.value);c.a="Sa"+c.v;c.m=!(!f.Mobile);if(c.v>=5){c.XDR=true}return c}}return false}function WRl(c,a,b){if(c.attachEvent){c.attachEvent("on"+a,b)}else{if(c.addEventListener){c.addEventListener(a,b,false)}}}var ClickTaleFetchFromWithCookies=(function(){var b=[],e,h,d,a,g,c;a=function(n,m){m=m||b;for(var k=0,j=b.length;k<j;k++){if(n.call(m,b[k],k)){return true}}return false};e=function(i){return a(function(k,j){return k.k==i})};h=function(i){var j=null;a(function(l,k){if(l.k==i){j=l;return true}return false});return j};c=function(i,j){var k=h(i);if(k){k.v=j}else{b.push({k:i,v:j})}};g=function(k){var j=arguments.callee;if(!j.sRE){var i=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];j.sRE=new RegExp("(\\"+i.join("|\\")+")","g")}return k.replace(j.sRE,"\\$1")};d=function(i){if(i instanceof String||i instanceof Boolean||i instanceof Number){i=i.valueOf()}else{if(i===null){return"null"}}switch(typeof i){case"number":i=isFinite(i)?String(i):"null";break;case"boolean":i=String(i);break;case"object":if(typeof i.toString=="function"){i=i.toString()}else{i="[Object]"}break}return i};var f={_URL_PARAM_NAME:"CTFetchCookies",cookieNameDecoder:decodeURIComponent,cookieValueDecoder:function(i){return i},clear:function(){b=[]},set:function(j,i){if(i===null||typeof i=="undefined"){f.setFromCookie(j);return}i=d(i);c(j,i)},setFromCookie:function(j){var q,p,k,n,o=document.cookie.split(/;\s/g),m;if(typeof j=="string"){q=function(i){return i==j}}else{if(typeof j.test=="function"){q=function(i){return j.test(i)}}else{q=function(){return false}}}for(m=0;m<o.length;m++){k=o[m].match(/([^=]+)=/i);if(k instanceof Array){try{p=f.cookieNameDecoder(k[1]);n=f.cookieValueDecoder(o[m].substring(k[1].length+1))}catch(l){}}else{p=f.cookieNameDecoder(o[m]);n=p}if(q(p)){c(p,n)}}},constructCookiesParam:function(){var i=[];a(function(k,j){i.push(k.k);i.push("=");i.push(k.v);i.push(";");return false});return f._URL_PARAM_NAME+"="+encodeURIComponent(i.join(""))},constructCookiesHash:function(){return"#"+f.constructCookiesParam()},constructFetchFromUrl:function(i){i=i||window.location.href;if(!(i.indexOf("#")>=0)){i+="#"}else{i+="&"}i+=f.constructCookiesParam();return i}};return f})();
/*
 * Copyright 2010-2012 ClickTale Ltd.
 */
(function(){var aP=!0,aO=null,aN=!1;function ar(i,g,j){return i.call.apply(i.bind,arguments)}function aQ(i,g,m){if(!i){throw Error()}if(2<arguments.length){var j=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(n,j);return i.apply(g,n)}}return function(){return i.apply(g,arguments)}}function aM(i,g,j){aM=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ar:aQ;return aM.apply(aO,arguments)}var aL;var aK;function aJ(){if(!aK){var g;aL?g=aL:(g=window.ClickTaleGlobal,g||(g={},window.ClickTaleGlobal=g),g.exports=g.exports||{},aL=g);g.exports.xhr=g.exports.xhr||{};aK=g.exports.xhr}return aK}function ax(i,g,j){Object.prototype.__defineGetter__&&!aI?("get" in j&&i.__defineGetter__(g,j.get),"set" in j&&i.__defineSetter__(g,j.set)):Object.defineProperty&&Object.defineProperty(i,g,j)}var aI;try{aI=Object.defineProperty({},"x",{get:function(){return aP}}).x}catch(at){aI=aN}var aH;function aG(){}var aF=aO,aE=aO,aD=50000,aC=aI||Object.prototype.__defineGetter__?1:2;var au=0,aB=aO;function aA(i,g,m){try{return i[g]}catch(j){return m}}var az=aN,aq="";function ap(){}var ao={};function an(i,g){ax(g,i,{get:function(){return this.x[i]},set:function(j){this.x[i]=j},enumerable:aP,configurable:aP})}function am(i,g){var m=new Function("a","b","c","d","e","f","g","h",'return this["x"].'+i+"(a,b,c,d,e,f,g,h);");if(2==aC){var j=m,m=function(p,n,u,s,o,q,r,t){al(this,this.x,ak);return j.call(this,p,n,u,s,o,q,r,t)}}g[i]=m}function aj(i){var g=ai.prototype,m;for(m in i){if("string"==typeof m&&ao[m]!==ap){try{"function"==typeof i[m]?(am(m,g),ao[m]=ap):1===aC&&(an(m,g),ao[m]=ap)}catch(j){ao[m]=ap,1===aC&&an(m,g)}}}}function al(i,g,o){for(var n=o.length,m,j;n--;){j=o[n],m=j[0],j=aA(i,m,j[1]),g[m]=j}}var ah=[["status",""],["timeout",0],["responseXML",aO],["responseBody",aO],["readyState",0],["responseText",aO],["statusText",aO]],ak=[["ontimeout",aO]];function ag(){var g=aH;return !!g&&!!g.f&&0<g.f.length}function ai(){var g=new ai.OriginalXMLHttpRequest;this.x=g;this.p=au++;g.onreadystatechange=aM(a,this);az||(aj(g),az=aP);2==aC&&(al(g,this,ah),al(g,this,ak))}function a(){var s=this.x,r=this.A,q=this.skip;2==aC&&al(s,this,ah);var p=aA(s,"readyState",0),o=aA(s,"status",0),n=aA(s,"statusText",""),i=aA(s,"responseText",""),m=this.headersToRecord;if(!q&&r!=p){if(0<p&&4>p){aB.readyState(this.p,p)}else{if(4==p){var g=[];if(m&&"number"==typeof m.length){for(q=m.length;0<q--;){r=m[q],g.push(r+":"+s.getResponseHeader.call(s,r))}}else{m=aO;try{m=this.getAllResponseHeaders()}catch(j){}g=m!=aO&&0<m.length?m.split("\n"):["Error: headers are null"]}o={status:o,statusText:n,headers:g,responseText:i};aF&&aF(o);o.responseText&&o.responseText.length>aD&&(o.responseText="",o.statusText="responseText is larger than MaxResponseSize");n=aO;i=aN;m=this.urlRule;ag()&&m&&(n=s.getResponseHeader.call(s,"X-ClickTale-IMToken"),i=m.s);aB.g(this.p,o.status,o.statusText,o.headers,o.responseText,n,i)}}}this.A=p;return"function"!=typeof this.onreadystatechange?void 0:this.onreadystatechange.apply(this,[])}ai.prototype.open=function(i,g,o,n,m){var j=this.x;"undefined"==typeof o&&(o=aP);aE&&aE(i,g)==aN?this.skip=aP:aB.open(this.p,g,i.toUpperCase());i=j.open(i,g,o,n,m);this.urlRule=aO;if(ag()){o=aO;n=aH.f;for(m=0;m<n.length;m++){if(j=n[m],j.m instanceof RegExp&&j.m.test(g)||g==j.m){o=j;break}}if(g=o){this.urlRule=g,o=this.x,o.setRequestHeader.call(o,"X-ClickTale-IMCache","1"),g.r&&o.setRequestHeader.call(o,"X-ClickTale-IMRuleSet",g.r)}}return i};ao.open=ap;ao.onreadystatechange=ap;ai.prototype.skip=aN;function af(){this.b=aO;this.d=[]}af.prototype.b=aO;af.prototype.open=function(i,g,j){this.b!=aO?this.b.open(i,g,j):this.d.push([this.open,[i,g,j]])};af.prototype.readyState=function(i,g){this.b!=aO?this.b.readyState(i,g):this.d.push([this.readyState,[i,g]])};af.prototype.g=function(i,g,p,o,n,m,j){this.b!=aO?this.b.g(i,g,p,o,n,m,j):this.d.push([this.g,[i,g,p,o,n,m,j]])};af.prototype.d=[];function ae(i,g,m,j){this.o=i;this.n=g;this.w=m;this.z=j}ae.GET=1;ae.HEAD=2;ae.POST=3;ae.OPTIONS=4;ae.PUT=5;ae.DELETE=6;ae.prototype.open=function(i,g,m){var m=ae[m],j={a:"xhropen"};j.xhrid=i;j.u=g;j.methodid=m;j.t=this.n();this.o(j)};ae.prototype.readyState=function(i,g){var j={a:"xhrstate"};j.xhrid=i;j.stateid=g;j.t=this.n();this.o(j)};ae.prototype.g=function(r,q,p,o,n,m,i){var j=m&&m.length,g={v:1};g.h=o;j||(g.c=n);n=this.w(this.z(g));o={a:"xhrstatedone"};o.xhrid=r;o.status=q;o.statusText=p;o.streamid=n;o.t=this.n();if(j){o.a="xhrstatedoneim";if(!aq||0==aq.length){if((r=window.ClickTaleFetchFrom)&&0<r.length){(q=/\?[th]=(\w+)/ig.exec(r))&&(q=q[1]),aq=r=r.replace(q,"")}}o.fetchUrl=aq+m;o.fetcherDoRewriteRules=!!i}this.o(o)};function ay(){var g=ad;ai.OriginalXMLHttpRequest=ac;ai.RegisterRecorderFunction=g;ai.ClickTaleWrapperVersion=1;ai.addMethodDelegation=function(i){am(i,ai.prototype)}}function av(g){am(g,ai.prototype)}var ab=aO;function S(){ab===aO&&(ab=new af);return ab}function ad(i,g,n){g=new ae(i,g,n,aG);i=S();i.b=g;for(var g=i.d.length,n=i.d,m,j=0;j<g;j++){m=n[j],m[0].apply(i,m[1])}}var l=window,k=void 0,k=function(){var i=l.ClickTaleSettings,g={};"object"!=typeof i&&(i={});"object"!=typeof i.XHRWrapper&&(i.XHRWrapper={});i=i.XHRWrapper;g.e=i.Enable;g.j=i.MaxResponseSize;g.k=i.RequestFilter;g.l=i.ResponseFilter;g.i=i.JSONStringify;var m=aO;if(m=i.IM){if(g.q={f:[]},i=aO,(i=m.Urls)&&i.length){for(m=0;m<i.length;m++){var j=i[m];g.q.f.push({m:j.UrlRule,s:j.FetcherDoRewriteRules,r:j.IMRewriteRulesSet})}}}"boolean"!=typeof g.e&&(g.e=aN);"number"!=typeof g.j&&(g.j=50000);"function"!=typeof g.k&&(g.k=function(){return aP});"function"!=typeof g.l&&(g.l=function(){});"function"!=typeof g.i&&(l.JSON&&"function"==typeof l.JSON.stringify?g.i=l.JSON.stringify:g.e=aN);return g}(),h;if(h=k.e){var f=l,f=f||window;h=f.XMLHttpRequest?aP:aN}if(h&&!("number"==typeof aJ().v||"number"==typeof(l||window).XMLHttpRequest.ClickTaleWrapperVersion)&&k.e){for(var e=k,ac=l.XMLHttpRequest,d=ai.prototype,c=["setRequestHeader","send","abort","getAllResponseHeaders","getResponseHeader"],b=c.length;b--;){am(c[b],d),ao[c[b]]=ap}if(1===aC){c="responseXML,responseText,statusText,status,readyState,responseType".split(",");for(b=c.length;b--;){an(c[b],d),ao[c[b]]=ap}}aj(l.XMLHttpRequest.prototype);aB=S();aF=e.l;aE=e.k;aD=e.j;aG=e.i;aH=e.q;var aw=aJ();aw.v=1;aw.registerRecorderFunctionAPI=ad;aw.originalXHR=ac;aw.addMethodDelegation=av;ay();l.XMLHttpRequest=ai}})();if(typeof ClickTaleOnReady=="function"){ClickTaleOnReady()};