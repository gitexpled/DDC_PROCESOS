var appExpled = angular.module("appExpled", ['ngRoute', 'ngDraggable']);
//las rutas que vamos a utilizar para nuestro ejemplo
appExpled.run(function ($rootScope, $templateCache,$location,$timeout,$interval) {
    $rootScope.VERSION=VERSION;
    $rootScope.LINKDESCARGA=LINKDESCARGA;
    $rootScope.paisarr =[]
           $rootScope.paisarr['AF'] = 'AFGANISTAN';
           $rootScope.paisarr['AL'] = 'ALBANIA';
           $rootScope.paisarr['DE'] = 'ALEMANIA';
           $rootScope.paisarr['AD'] = 'ANDORRA';
           $rootScope.paisarr['AO'] = 'ANGOLA';
           $rootScope.paisarr['AR'] = 'ARGENTINA';
           $rootScope.paisarr['DZ'] = 'ARGELIA';
           $rootScope.paisarr['SA'] = 'ARABIA SAUDITA';
           $rootScope.paisarr['AT'] = 'AUSTRIA';
           $rootScope.paisarr['AU'] = 'AUSTRALIA';
           $rootScope.paisarr['BH'] = 'BAHREIN';
           $rootScope.paisarr['BS'] = 'BAHAMAS';
           $rootScope.paisarr['BD'] = 'BANGLADESH';
           $rootScope.paisarr['BB'] = 'BARBADOS';
           $rootScope.paisarr['BE'] = 'BELGICA';
           $rootScope.paisarr['BJ'] = 'BENIN';
           $rootScope.paisarr['BM'] = 'BERMUDAS';
           $rootScope.paisarr['BO'] = 'BOLIVIA';
           $rootScope.paisarr['BW'] = 'BOTSWANA';
           $rootScope.paisarr['BR'] = 'BRASIL';
           $rootScope.paisarr['BN'] = 'BRUNEI';
           $rootScope.paisarr['BG'] = 'BULGARIA';
           $rootScope.paisarr['BI'] = 'BURUNDI';
           $rootScope.paisarr['BT'] = 'BUTAN';
           $rootScope.paisarr['KH'] = 'CAMBOYA';
           $rootScope.paisarr['CM'] = 'CAMERUN';
           $rootScope.paisarr['CA'] = 'CANADA';
           $rootScope.paisarr['TD'] = 'CHAD';
           $rootScope.paisarr['CN'] = 'CHINA';
           $rootScope.paisarr['CL'] = 'CHILE';
           $rootScope.paisarr['CY'] = 'CHIPRE';
           $rootScope.paisarr['KP'] = 'COREA DEL NORTE';
           $rootScope.paisarr['CO'] = 'COLOMBIA';
           $rootScope.paisarr['CG'] = 'CONGO';
           $rootScope.paisarr['CI'] = 'COSTA MARFIL';
           $rootScope.paisarr['CR'] = 'COSTA RICA';
           $rootScope.paisarr['KR'] = 'COREA DEL SUR';
           $rootScope.paisarr['CU'] = 'CUBA';
           $rootScope.paisarr['DK'] = 'DINAMARCA';
           $rootScope.paisarr['EAU'] = 'EMIRATOS ARABES';
           $rootScope.paisarr['EC'] = 'ECUADOR';
           $rootScope.paisarr['EG'] = 'EGIPTO';
           $rootScope.paisarr['SI'] = 'ESLOVENIA';
           $rootScope.paisarr['ES'] = 'ESPAÑA';
           $rootScope.paisarr['ET'] = 'ETIOPIA';
           $rootScope.paisarr['FJ'] = 'FIJI';
           $rootScope.paisarr['PH'] = 'FILIPINAS';
           $rootScope.paisarr['FI'] = 'FINLANDIA';
           $rootScope.paisarr['FR'] = 'FRANCIA';
           $rootScope.paisarr['GA'] = 'GABON';
           $rootScope.paisarr['GM'] = 'GAMBIA';
           $rootScope.paisarr['GE'] = 'GEORGIA';
           $rootScope.paisarr['GH'] = 'GHANA';
           $rootScope.paisarr['GR'] = 'GRECIA';
           $rootScope.paisarr['GT'] = 'GUATEMALA';
           $rootScope.paisarr['GW'] = 'GUINEA-BISSAU';
           $rootScope.paisarr['GQ'] = 'GUINEA ECUATORIAL';
           $rootScope.paisarr['GN'] = 'GUINEA';
           $rootScope.paisarr['GY'] = 'GUYANA';
           $rootScope.paisarr['HT'] = 'HAITI';
           $rootScope.paisarr['NL'] = 'HOLANDA';
           $rootScope.paisarr['HN'] = 'HONDURAS';
           $rootScope.paisarr['HK'] = 'HONG KONG';
           $rootScope.paisarr['HU'] = 'HUNGRIA';
           $rootScope.paisarr['KM'] = 'ISLAS COMORAS';
           $rootScope.paisarr['CK'] = 'ISLAS COOK';
           $rootScope.paisarr['CV'] = 'CABO VERDE';
           $rootScope.paisarr['FO'] = 'ISLAS FAROE';
           $rootScope.paisarr['GP'] = 'GUADALUPE';
           $rootScope.paisarr['NF'] = 'ISLAS FALKLAND';
           $rootScope.paisarr['IN'] = 'INDIA';
           $rootScope.paisarr['ID'] = 'INDONESIA';
           $rootScope.paisarr['GB'] = 'INGLATERRA';
           $rootScope.paisarr['IQ'] = 'IRAK';
           $rootScope.paisarr['IR'] = 'IRAN';
           $rootScope.paisarr['IE'] = 'IRLANDA';
           $rootScope.paisarr['IS'] = 'ISLANDIA';
           $rootScope.paisarr['IL'] = 'ISRAEL';
           $rootScope.paisarr['IT'] = 'ITALIA';
           $rootScope.paisarr['JM'] = 'JAMAICA';
           $rootScope.paisarr['JP'] = 'JAPON';
           $rootScope.paisarr['JO'] = 'JORDANIA';
           $rootScope.paisarr['KE'] = 'KENYA';
           $rootScope.paisarr['KW'] = 'KUWAIT';
           $rootScope.paisarr['LA'] = 'LAOS';
           $rootScope.paisarr['LS'] = 'LESOTHO';
           $rootScope.paisarr['LV'] = 'LETONIA';
           $rootScope.paisarr['LB'] = 'LIBANO';
           $rootScope.paisarr['LR'] = 'LIBERIA';
           $rootScope.paisarr['LY'] = 'LIBIA';
           $rootScope.paisarr['LI'] = 'LIECHTENSTEIN';
           $rootScope.paisarr['LT'] = 'LITUANIA';
           $rootScope.paisarr['LU'] = 'LUXEMBURGO';
           $rootScope.paisarr['MO'] = 'MACAO';
           $rootScope.paisarr['MG'] = 'MADAGASCAR';
           $rootScope.paisarr['MY'] = 'MALASIA';
           $rootScope.paisarr['ML'] = 'MALI';
           $rootScope.paisarr['MT'] = 'MALTA';
           $rootScope.paisarr['MW'] = 'MALAWI';
           $rootScope.paisarr['MQ'] = 'MARTINICA';
           $rootScope.paisarr['MA'] = 'MARRUECOS';
           $rootScope.paisarr['MU'] = 'MAURICIO';
           $rootScope.paisarr['MR'] = 'MAURITANIA';
           $rootScope.paisarr['MX'] = 'MEXICO';
           $rootScope.paisarr['MN'] = 'MONGOLIA';
           $rootScope.paisarr['MZ'] = 'MOZAMBIQUE';
           $rootScope.paisarr['NR'] = 'NAURU';
           $rootScope.paisarr['NC'] = 'NUEVA CALEDONIA';
           $rootScope.paisarr['NP'] = 'NEPAL';
           $rootScope.paisarr['NI'] = 'NICARAGUA';
           $rootScope.paisarr['NE'] = 'NIGER';
           $rootScope.paisarr['NG'] = 'NIGERIA';
           $rootScope.paisarr['NO'] = 'NORUEGA';
           $rootScope.paisarr['NZ'] = 'NUEVA ZELANDIA';
           $rootScope.paisarr['OM'] = 'OMAN';
           $rootScope.paisarr['PK'] = 'PAKISTAN';
           $rootScope.paisarr['PA'] = 'PANAMA';
           $rootScope.paisarr['PG'] = 'PAPUA/NUEVA GUINEA';
           $rootScope.paisarr['PY'] = 'PARAGUAY';
           $rootScope.paisarr['PE'] = 'PERU';
           $rootScope.paisarr['PL'] = 'POLONIA';
           $rootScope.paisarr['PT'] = 'PORTUGAL';
           $rootScope.paisarr['PR'] = 'PUERTO RICO';
           $rootScope.paisarr['QA'] = 'QATAR';
           $rootScope.paisarr['DO'] = 'REP. DOMINICANA';
           $rootScope.paisarr['RW'] = 'RUANDA';
           $rootScope.paisarr['RO'] = 'RUMANIA';
           $rootScope.paisarr['RU'] = 'RUSIA';
           $rootScope.paisarr['SV'] = 'SALVADOR';
           $rootScope.paisarr['WS'] = 'SAMOA';
           $rootScope.paisarr['SN'] = 'SENEGAL';
           $rootScope.paisarr['SL'] = 'SIERRA LEONA';
           $rootScope.paisarr['SG'] = 'SINGAPUR';
           $rootScope.paisarr['SY'] = 'SIRIA';
           $rootScope.paisarr['SO'] = 'SOMALIA';
           $rootScope.paisarr['LK'] = 'SRI LANKA';
           $rootScope.paisarr['SD'] = 'SUDAN';
           $rootScope.paisarr['ZA'] = 'SUDAFRICA';
           $rootScope.paisarr['SE'] = 'SUECIA';
           $rootScope.paisarr['CH'] = 'SUIZA';
           $rootScope.paisarr['TW'] = 'TAIWAN';
           $rootScope.paisarr['TZ'] = 'TANZANIA';
           $rootScope.paisarr['TH'] = 'THAILANDIA';
           $rootScope.paisarr['TG'] = 'TOGO';
           $rootScope.paisarr['TO'] = 'TONGA';
           $rootScope.paisarr['TT'] = 'TRINIDAD Y TOBAGO';
           $rootScope.paisarr['TN'] = 'TUNEZ';
           $rootScope.paisarr['TR'] = 'TURQUIA';
           $rootScope.paisarr['UA'] = 'UCRANIA';
           $rootScope.paisarr['EU'] = 'UNION EUROPEA';
           $rootScope.paisarr['UG'] = 'UGANDA';
           $rootScope.paisarr['UY'] = 'URUGUAY';
           $rootScope.paisarr['US'] = 'ESTADOS UNIDOS';
           $rootScope.paisarr['VE'] = 'VENEZUELA';
           $rootScope.paisarr['VN'] = 'VIETNAM';
           $rootScope.paisarr['YE'] = 'YEMEN';
           $rootScope.paisarr['ZM'] = 'ZAMBIA';
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
        
        (!$rootScope.header.state)?$rootScope.header.set():$rootScope.header.state=0;
    });
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        $interval.cancel($rootScope.interval);
        if (typeof (current) !== 'undefined') {
            
            $templateCache.remove(current.templateUrl);
        }
    });
    $rootScope.varificaCero = function (valor) {
        if ((valor == "") || (valor == undefined) || (valor == null)) {
            return 0;
        } else {
            return valor;
        }
    }
    
    $rootScope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $rootScope.verPopRespuesta = "block";
            $rootScope.btnContinuar="none";
        } else {
            $rootScope.verPopRespuesta = "none";
            $rootScope.btnContinuar="none";
        }
    }
    $rootScope.sendDataService=function(cadenaXML,$rootScope,$scope,jsonXmlNodes){
    //$rootScope.countTab = 0;
    $('#btnContinuar_').css('display','none');
    $('#btnError').css('display','none');
    $('#cargandoPopLotesPaking').show();
    $('#popRespuestaLotesPaking').hide();
   
     var xmlhttp = new XMLHttpRequest();
                xmlhttp.open('POST', IPSERVER + '/rfcNET.asmx', true);
                var sr = cadenaXML;
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {
                            $('#btnContinuar_').css('display','block');
                            $('#btnContinuar_22').css('display','block');
                            $('#btnError').css('display','none');
                            //$( "#cargandoPopLotesPaking" ).fadeOut( "slow", function(){
                            //    $( "#popRespuestaLotesPaking" ).fadeIn( "slow" );
                             //});
                            $('#cargandoPopLotesPaking').hide('slow');
                            $('#popRespuestaLotesPaking').show('slow');
                            
                            var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                            var xmlData = $.parseXML(print);
                            console.log(print);
                            
                            var reespuestaNode=getXmlMessage(jsonXmlNodes,xmlData);
                            $('#popRespuestaLotesPaking').html('<div class="contabilizar-text">'+reespuestaNode+'</div>');
                            
                            /*$rootScope.getService('ZMOV_QUERY_STOCK_SUBCONTR',$rootScope,'','STOCKSUBC');
                            $rootScope.getService('ZMOV_QUERY_STOCK_ALMACEN',$rootScope,'WERKS='+$rootScope.datoUsuario.WERKS,'STOCKLOTES');
                            $rootScope.getService('ZMOV_QUERY_STOCK_HU',$rootScope,'WERKS='+$rootScope.datoUsuario.WERKS,null);*/
                            
                        }
                        if (xmlhttp.status == 500 || xmlhttp.status == 400) {
                            $('#btnContinuar_').css('display','none');
                            $('#btnError').css('display','block');
                            $('#cargandoPopLotesPaking').hide('fade');
                            $('#popRespuestaLotesPaking').show('fade');
                            
                            var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                            var xmlData = $.parseXML(print);
                            console.log(print);
                            
                            jsonXmlNodes=[
                                    {node:"faultcode",h1:"faultcode"},
                                    {node:"faultstring",h1:"faultstring"}
                            ];
                            var reespuestaNode=getXmlMessage(jsonXmlNodes,xmlData);
                            $('#popRespuestaLotesPaking').html('<div class="contabilizar-text">'+reespuestaNode+'</div>');
                            $rootScope.blockReEnvio = 0;
                        }
                    }
                    
                };
                // Send the POST request
                xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                $scope.mostrarRespuesta(true);
                setTimeout(function(){xmlhttp.send(sr);},1000);
}
function xml2json(xml, tab) {
   var X = {
      toObj: function(xml) {
         var o = {};
         if (xml.nodeType==1) {   // element node ..
            if (xml.attributes.length)   // element with attributes  ..
               for (var i=0; i<xml.attributes.length; i++)
                  o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
            if (xml.firstChild) { // element has child nodes ..
               var textChild=0, cdataChild=0, hasElementChild=false;
               for (var n=xml.firstChild; n; n=n.nextSibling) {
                  if (n.nodeType==1) hasElementChild = true;
                  else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                  else if (n.nodeType==4) cdataChild++; // cdata section node
               }
               if (hasElementChild) {
                  if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                     X.removeWhite(xml);
                     for (var n=xml.firstChild; n; n=n.nextSibling) {
                        if (n.nodeType == 3)  // text node
                           o["#text"] = X.escape(n.nodeValue);
                        else if (n.nodeType == 4)  // cdata node
                           o["#cdata"] = X.escape(n.nodeValue);
                        else if (o[n.nodeName]) {  // multiple occurence of element ..
                           if (o[n.nodeName] instanceof Array)
                              o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                           else
                              o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                        }
                        else  // first occurence of element..
                           o[n.nodeName] = X.toObj(n);
                     }
                  }
                  else { // mixed content
                     if (!xml.attributes.length)
                        o = X.escape(X.innerXml(xml));
                     else
                        o["#text"] = X.escape(X.innerXml(xml));
                  }
               }
               else if (textChild) { // pure text
                  if (!xml.attributes.length)
                     o = X.escape(X.innerXml(xml));
                  else
                     o["#text"] = X.escape(X.innerXml(xml));
               }
               else if (cdataChild) { // cdata
                  if (cdataChild > 1)
                     o = X.escape(X.innerXml(xml));
                  else
                     for (var n=xml.firstChild; n; n=n.nextSibling)
                        o["#cdata"] = X.escape(n.nodeValue);
               }
            }
            if (!xml.attributes.length && !xml.firstChild) o = null;
         }
         else if (xml.nodeType==9) { // document.node
            o = X.toObj(xml.documentElement);
         }
         else
            alert("unhandled node type: " + xml.nodeType);
         return o;
      },
      toJson: function(o, name, ind) {
         var json = name ? ("\""+name+"\"") : "";
         if (o instanceof Array) {
            for (var i=0,n=o.length; i<n; i++)
               o[i] = X.toJson(o[i], "", ind+"\t");
            json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
         }
         else if (o == null)
            json += (name&&":") + "null";
         else if (typeof(o) == "object") {
            var arr = [];
            for (var m in o)
               arr[arr.length] = X.toJson(o[m], m, ind+"\t");
            json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
         }
         else if (typeof(o) == "string")
            json += (name&&":") + "\"" + o.toString() + "\"";
         else
            json += (name&&":") + o.toString();
         return json;
      },
      innerXml: function(node) {
         var s = ""
         if ("innerHTML" in node)
            s = node.innerHTML;
         else {
            var asXml = function(n) {
               var s = "";
               if (n.nodeType == 1) {
                  s += "<" + n.nodeName;
                  for (var i=0; i<n.attributes.length;i++)
                     s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                  if (n.firstChild) {
                     s += ">";
                     for (var c=n.firstChild; c; c=c.nextSibling)
                        s += asXml(c);
                     s += "</"+n.nodeName+">";
                  }
                  else
                     s += "/>";
               }
               else if (n.nodeType == 3)
                  s += n.nodeValue;
               else if (n.nodeType == 4)
                  s += "<![CDATA[" + n.nodeValue + "]]>";
               return s;
            };
            for (var c=node.firstChild; c; c=c.nextSibling)
               s += asXml(c);
         }
         return s;
      },
      escape: function(txt) {
         return txt.replace(/[\\]/g, "\\\\")
                   .replace(/[\"]/g, '\\"')
                   .replace(/[\n]/g, '\\n')
                   .replace(/[\r]/g, '\\r');
      },
      removeWhite: function(e) {
         e.normalize();
         for (var n = e.firstChild; n; ) {
            if (n.nodeType == 3) {  // text node
               if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                  var nxt = n.nextSibling;
                  e.removeChild(n);
                  n = nxt;
               }
               else
                  n = n.nextSibling;
            }
            else if (n.nodeType == 1) {  // element node
               X.removeWhite(n);
               n = n.nextSibling;
            }
            else                      // any other node
               n = n.nextSibling;
         }
         return e;
      }
   };
   if (xml.nodeType == 9) // document node
      xml = xml.documentElement;
   var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
   return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}
 $rootScope.parseLotePallet= function(value){
    console.log(value)
    var res
    if(!isNaN(parseInt(value))){
         res = ("00000000000000000000" + value).slice (-20);
    }else{
        res = 0;
    }
    return res;
}
function getXmlMessage(jsonData,xmlData){
    var response='';
    var jsonResponse= xml2json(xmlData,'');
    console.log(JSON.parse(jsonResponse));
    if(xmlData===undefined || xmlData ==='')return 'Respuesta no valida';
    angular.forEach(jsonData, function (value, key) {
    //for (var i in jsonData) {
        response +=getNodekeyJson(JSON.parse(jsonResponse),null,value);
        /*
      var thirdPartyNode = $(xmlData).find(jsonData[i].node)[0];
      var respuesta = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
      response+= '<h1>'+jsonData[i].h1+'</h1> <p>' + respuesta + '</p>';
        */
    })
    return response;
}
    $rootScope.getFechaHora = function(){
        var ahora = new Date()
        var fecEntrada = ahora.getDate()+"-"+(ahora.getMonth() + 1)+"-"+ahora.getFullYear()+" "+ahora.getHours()+":"+ahora.getMinutes();
        return fecEntrada;
    }
    $rootScope.pageHistory = [];
    $rootScope.$on('$routeChangeSuccess', function() {
	//INICIAR FASTCLICK
	if ('addEventListener' in document){ 
	    FastClick.attach(document.body);
            //console.log(FastClick);
        }
	else alert('no FastClick');
        $timeout.cancel(promise);
        $interval.cancel(promise);
        
        if($rootScope.pageHistory.indexOf($location.$$path)===-1)$rootScope.pageHistory.push($location.$$path);
        
        var options=$rootScope.page.options;
        $rootScope.page.animation=(options.animation)?options.animation:'fadeInRight';
        $rootScope.header.options.display=(options.headerOptions)?options.headerOptions:'block';
        
        (options.loading)?$rootScope.loading.show(options.loading):0;
    });
}).config(['$routeProvider', '$controllerProvider','$httpProvider',function ($routeProvider, $controllerProvider,$httpProvider) {
    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    appExpled.lazyController = $controllerProvider.register;
    setModel(modelMenu,"app",$routeProvider);
    //appExpled.routeProvider=$routeProvider;
    
    //$controllerProvider.otherwise({redirectTo: '/'});
    //RESIZE PARA TABLET
    if($( window ).width()>600){
            var viewport = document.querySelector("meta[name=viewport]");
            //viewport.setAttribute('content', 'width=640, initial-scale=1, maximum-scale=1.0, user-scalable=1');
    }
    //INICIAR CAMARA
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia ||
    function() {
      alert('Su navegador no soporta navigator.getUserMedia().');
    };
    
    document.addEventListener("backbutton", function(){}, false);	
	
}]).controller('ctrGlobal', function ($scope, $location, $http, $rootScope, $templateCache,$sce,$interval) {
    $scope.inspeccion={
        index:'',
        lastMenuSelect:{},
        indexList:[]
    };
    
    $rootScope.alert = {
        message2:''
    }
    $scope.pallet={
        index:'',
        lastMenuSelect:{},
        indexList:[]
    };
    $scope.container={
        index:'',
        lastMenuSelect:{},
        indexList:[]
    };
    $rootScope.userData=[];
    $rootScope.reportData=[];
    $rootScope.header={
        set:function(options){
            options=(options)?options:{};
            $rootScope.header.state=1;
            $rootScope.header.visibility=(options.visibility)?options.visibility:'visible';
            $rootScope.header.display=(options.display)?options.display:'-webkit-box';
            $rootScope.header.title=(options.title)?options.title:$rootScope.header.title;
            $rootScope.header.navBackButtonDisplay=(options.navBackButtonDisplay)?options.navBackButtonDisplay:'block';
            $rootScope.header.navBackButtonClick=(options.navBackButtonClick)?options.navBackButtonClick:$rootScope.header.navBackButtonClickDefault;
            //options
            $rootScope.header.options.display=(options.optionsButtonDisplay)?options.optionsButtonDisplay:'block';
        },
        visible:'',
        display:'',
        title:'',
        navBackButtonDisplay:'',
        navBackButtonClick:'',
        navBackButtonClickDefault:function(){
            $rootScope.pageHistory.pop();
            //console.log($rootScope.pageHistory);
            //console.log($rootScope.pageHistory[$rootScope.pageHistory.length-1]);
            $rootScope.goToPage($rootScope.pageHistory[$rootScope.pageHistory.length-1],{animation:"fadeInLeft"});
        },
        state:0,
        options:{
            display:'block'
        }
    };
    $rootScope.getFechaBapi = function(){
        var d = new Date();
        var mes =d.getMonth()+1;
        if(mes>=1 && mes<=9){
            mes="0"+mes;
        }else{
            mes =d.getMonth()+1;
            //mes ="09"
        }
        var dia = d.getDate();
        if(dia>=1 && dia<=9){
            dia="0"+dia;
        }
        var fechaIngreso = d.getFullYear()+ "" + mes + "" + dia;
        return fechaIngreso;
    }
    $rootScope.getFechaSeparado = function(sep){
        var d = new Date();
        var mes =d.getMonth()+1;
        if(mes>=1 && mes<=9){
            mes="0"+mes;
        }else{
            mes =d.getMonth()+1;
            //mes ="09"
        }
        var dia = d.getDate();
        if(dia>=1 && dia<=9){
            dia="0"+dia;
        }
        var fechaIngreso = dia+sep+ mes + sep + d.getFullYear();
        return fechaIngreso;
    }
    $rootScope.alert={
        show:function(options){
            options=(options)?options:{};
            $rootScope.alert.trustedHtml='';
            $rootScope.alert.display=(options.show)?options.show:'block';
            $rootScope.alert.title=(options.title)?options.title:'Alerta';
            $rootScope.alert.message=(options.message)?options.message:'Mensaje';
            (options.html)?$rootScope.alert.message=$sce.trustAsHtml($rootScope.alert.message):0;
            $rootScope.alert.type=(options.type)?options.type:'alert';
            $rootScope.alert.buttons.cancel.show='none';
            switch($rootScope.alert.type){
                case'alert':
                    break;
                case'confirm':
                    $rootScope.alert.buttons.cancel.text=(options.cancelButtonText)?options.cancelButtonText:'Cancel';
                    $rootScope.alert.buttons.cancel.click=(options.cancelClick)?options.cancelClick:$rootScope.alert.buttons.cancel.dClick;
                    $rootScope.alert.buttons.cancel.show='block';
                    break;
            }
            $rootScope.alert.buttons.accept.text=(options.acceptButtonText)?options.acceptButtonText:'Accept';
            $rootScope.alert.buttons.accept.click=(options.acceptClick)?options.acceptClick:$rootScope.alert.buttons.accept.dClick;
        },
        display:'none',
        message:'',
        title:'',
        type:'',
        html:false,
        trustedHtml:'',
        buttons:{
            cancel:{
               show:'none',
               text:'',
               click:'',
               dClick:function(){$rootScope.alert.display='none';    $rootScope.alert.message2=''}
            },
            accept:{
               show:'block',
               text:'',
               click:'',
               dClick:function(){$rootScope.alert.display='none';    $rootScope.alert.message2=''}
            }
        }
    };
    $templateCache.removeAll();
    $rootScope.verPopRespuesta='none';
    // Variables globales
    $rootScope.datoUsuario = [];
    
    // mostrar el loading
    $rootScope.loading={
        show : function (message,display) {
            $rootScope.loading.message=(message)?message:'Cargando...';
            $rootScope.loading.display=(display)?display:'block';
        },
        hide:function(){$rootScope.loading.display='none';},
        message:'',
        display:'none'
    };
    
    $rootScope.page={
        animation:'',
        loading:'',
        options:[]
    };
    
    $rootScope.goToPage = function (page,options) {
        options=(options)?options:{};
        $rootScope.page.options=options;
        $location.path(page);
        
    };
    $rootScope.mostrarFecha = function (days) {
        // milisegundos=Number(35*24*60*60*1000);
        fecha = new Date();
        day = fecha.getDate();
        // el mes es devuelto entre 0 y 11
        month = Number(fecha.getMonth()) + 1;
        year = fecha.getFullYear();
        //Obtenemos los milisegundos desde media noche del 1/1/1970
        tiempo = fecha.getTime();
        //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
        milisegundos = Number(1 * 24 * 60 * 60 * 1000);
        //Modificamos la fecha actual
        switch (days) {
            case 0:
                total = fecha.setTime(tiempo);
                break;
            case -1:
                total = fecha.setTime(tiempo - milisegundos);
                break;
            case -2:
                total = fecha.setTime(tiempo - (milisegundos*2));
                break;
            case -3:
                total = fecha.setTime(tiempo - (milisegundos * 3));
                break;
            case -4:
                total = fecha.setTime(tiempo - (milisegundos * 4));
                break;
            case -5:
                total = fecha.setTime(tiempo - (milisegundos * 5));
                break;
            case -6:
                total = fecha.setTime(tiempo - (milisegundos * 6));
                break;
            case -7:
                total = fecha.setTime(tiempo - (milisegundos * 7));
                break;
            case 5:
                total = fecha.setTime(tiempo + (milisegundos * 5));
                break;
        }
        day = ('00' + fecha.getDate()).slice(-2);
        month = ('00' + (fecha.getMonth() + 1)).slice(-2);
        year = fecha.getFullYear();
        return ( year + "-" + month + "-" + day);
    }
     $rootScope.mostrarFecha2 = function (days) {
        // milisegundos=Number(35*24*60*60*1000);
        fecha = new Date();
        day = fecha.getDate();
        // el mes es devuelto entre 0 y 11
        month = Number(fecha.getMonth()) + 1;
        year = fecha.getFullYear();
        //Obtenemos los milisegundos desde media noche del 1/1/1970
        tiempo = fecha.getTime();
        //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
        milisegundos = Number(1 * 24 * 60 * 60 * 1000);
        //Modificamos la fecha actual
        switch (days) {
            case 0:
                total = fecha.setTime(tiempo);
                break;
            case -1:
                total = fecha.setTime(tiempo - milisegundos);
                break;
            case -2:
                total = fecha.setTime(tiempo - (milisegundos*2));
                break;
            case -3:
                total = fecha.setTime(tiempo - (milisegundos * 3));
                break;
            case -4:
                total = fecha.setTime(tiempo - (milisegundos * 4));
                break;
            case -5:
                total = fecha.setTime(tiempo - (milisegundos * 5));
                break;
            case -6:
                total = fecha.setTime(tiempo - (milisegundos * 6));
                break;
            case -7:
                total = fecha.setTime(tiempo - (milisegundos * 7));
                break;
            case 5:
                total = fecha.setTime(tiempo + (milisegundos * 5));
                break;
        }
        day = ('00' + fecha.getDate()).slice(-2);
        month = ('00' + (fecha.getMonth() + 1)).slice(-2);
        year = fecha.getFullYear();
        return ( day + "." + month + "." +year );
    }
    $rootScope.getDatos = function (servicio,arguments) {
        return $http({
            method: 'POST',
            url: IPSERVER + '/JSON_' + servicio + '.aspx?' + arguments,
			//url: '/JSON_' + servicio + '.aspx?' + arguments,
            contentType: 'application/json; charset=ISO-8859-1',
            dataType: 'json'
        });
    };
    $rootScope.getService=function(service,$rootScope,param,index){
    $rootScope[service]=[];
    
       $rootScope.getDatos(service,param)
       .success(function (datos) {
           if(index===null){
               $rootScope[service]=datos;
           }else{  
               angular.forEach(datos[index], function (value, key) {
               var jsonArg = new Object();
               angular.forEach(value, function (value, key) {
                   jsonArg[key]=value;
               });
               $rootScope[service].push(jsonArg);
               });
            }
           //document.getElementById('preloadMsg').innerHTML = document.getElementById('preloadMsg').innerHTML + "<br>"+service+" OK";
       })
       .error(function (datos) {
           $rootScope.verLoading_(false, "");
           $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio: '+service);
       })
       
}
    $rootScope.getServicePost=function(service,$rootScope,param,index){
           $rootScope[service]=[];
            $http({
                 method: 'POST',
                 url: IPSERVER+'/JSON_'+service+'.aspx?'+param,
                 contentType: 'application/json; charset=utf-8',
                 dataType: 'json',
                 timeout:500000
             })
           .success(function (datos) {
               if(index===null){
                   $rootScope[service]=datos;
               }else{  
                   angular.forEach(datos[index], function (value, key) {
                   var jsonArg = new Object();
                   angular.forEach(value, function (value, key) {
                       jsonArg[key]=value;
                   });
                   $rootScope[service].push(jsonArg);
                   });
                }
               //document.getElementById('preloadMsg').innerHTML = document.getElementById('preloadMsg').innerHTML + "<br>"+service+" OK";
           })
           .error(function (datos) {
               console.log(datos);
               //$rootScope.alert.show({message:"No se pudo conectar al servicio "+service});
           })

    }
   
    $rootScope.httpRequest={
        error:function(result,status, header, config){
            console.log(status,header,config)
            $rootScope.loading.hide();
            $rootScope.alert.show({message:status+': '+HTTP_STATUS_CODES['CODE_'+status]+'\n'+config.url.split("/")[config.url.split("/").length-1],html:false});
        },
        successRedirect:"",
        goToRedirect:function(){
            if($rootScope.httpRequest.successRedirect=="imprime"){
                $rootScope.imprimirCamion = "none";
                $rootScope.RecepDDC="";
            }else
            if($rootScope.httpRequest.successRedirect!=""){
                $rootScope.goToPage($rootScope.httpRequest.successRedirect);
            }
            $rootScope.httpRequest.successRedirect="";
            $rootScope.loading.display="none";
        }
    }
    $rootScope.validaForm = function (jsonValidate){
        var validateFormResult=true;        
             angular.forEach(jsonValidate, function (value, key) {
                 if(!validateFormResult)return false;
                 var arrBaseValue =[undefined,'',null];
                 //console.log(value);
                 //console.log(arrBaseValue,arrBaseValue.indexOf(value.value));
                 switch(value.type){
                     case 'input':{
                             if(arrBaseValue.indexOf(value.value)>-1){
                                 $rootScope.alert.show({message:'Ingrese el campo "'+value.campo+'"'});
                                 validateFormResult=false;
                             }
                     };break;
                     case 'aSelect':{
                             if(arrBaseValue.indexOf(value.value)>-1 || arrBaseValue.indexOf(value.value[value.index])>-1){
                                 $rootScope.alert.show({message:'Ingrese el campo "'+value.campo+'"'});
                                 validateFormResult=false;
                             }
                     };break;
                     case 'number':{
                             if(arrBaseValue.indexOf(value.value)>-1){
                                 $rootScope.alert.show({message:'Ingrese el campo "'+value.campo+'"'});
                                 validateFormResult=false;
                             }else if(value.min!=undefined && !isNaN(value.min) && value.value*1<value.min ){
                                 $rootScope.alert.show({message:'El minimo permitido en el campo "'+value.campo+'" es "'+value.min+'"'});
                                 validateFormResult=false;
                             }else if(value.max!=undefined && !isNaN(value.max) &&value.value*1>value.max ){
                                 $rootScope.alert.show({message:'El maximo permitido en el campo "'+value.campo+'" es "'+value.max+'"'});
                                 validateFormResult=false;
                             }
                     };break;
                     case 'array':{
                             angular.forEach(value.value, function (valueArr, keyArr) {
                                 if(!validateFormResult)return false;
                                 var jsonValidateArr=[
                                    {campo:value.campo +" ("+(keyArr+1)+")",value:valueArr[value.index],type:value.subType,index:value.subIndex}
                                ];
                                if(!$rootScope.validaForm(jsonValidateArr))validateFormResult=false;
                             });
                     }
                 }
             });
             
             return validateFormResult;
    };
    $rootScope.formatNumber = function(nStr){
    nStr += '';
    var  x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
    }
    
    $rootScope.displayBt='none';
    $rootScope.hideBluetooth=function(){
        $rootScope.displayBt='none';
    };
   
   if (session === 0) { $rootScope.goToPage("/",{animation:"-"}); }
}).directive('onLongPress', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $elm, $attrs) {
			$elm.bind((APPMOVIL)?'touchstart':'mousedown', function(evt) {
				// Locally scoped variable that will keep track of the long press
				$scope.longPress = true;

				
				//$timeout(function() {
					if ($scope.longPress) {
						// If the touchend event hasn't fired,
						// apply the function given in on the element's on-long-press attribute
						$scope.$apply(function() {
							$scope.$eval($attrs.onLongPress)
						});
					}
				//}, 600);
			});

			$elm.bind((APPMOVIL)?'touchend':'mouseup', function(evt) {
				// Prevent the onLongPress event from firing
				$scope.longPress = false;
				// If there is an on-touch-end function attached to this element, apply it
				if ($attrs.onTouchEnd) {
					$scope.$apply(function() {
						$scope.$eval($attrs.onTouchEnd)
					});
				}
			});
		}
	};
});