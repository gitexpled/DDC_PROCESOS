window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('{"Error":"' + errorMsg + '","Script:"' + url + '","Line:"' + lineNumber  + '","Column:' + column + '","StackTrace:"' +  errorObj+'"}');
};
var session = 0;
var appConfig={};
var IPSERVER = 'http://ddcprd.expled.cl/ddc/';
var IPSERVER2 = 'http://200.55.206.140/ddcprd/';
var IP_WS = 'http://sistema.ptichile.cl/ws/ws_pti_recepcion.php?';
//var IPSERVER = 'http://ddcprd.expled.cl/ddc2/';
var VERSION = '1.26';
var LINKDESCARGA = 'http://ddcprd.expled.cl/DDC/descargas/DDC-android.apk'
//var LINKDESCARGA = 'http://ddcprd.expled.cl/baika/descargas/DDC-android-qas.apk'
var DISPOSITIVO = 'WEB'; // MOVIL   WEB
var APPMOVIL=false;

//TEMEOUT PARA BOTONES
var promise;
var time=200;

//DATOS CAMARA
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
appConfig.camera={
		"options":{ 
			 quality: 50,
			 targetWidth: 500,
			 targetHeight: 500,
  			 //destinationType : Camera.DestinationType.FILE_URI
  			 destinationType :0, //Camera.DestinationType.DATA_URL
  			 correctOrientation:true,
  			 saveToPhotoAlbum:true,
	  		 //encodingType: Camera.EncodingType.JPEG
  			 encodingType: 0
	  }
}
appConfig.log=function(r){
    
};
var modelMenu={
    "/login":{
        url:"/login.html",
        path:"/"
    },
    "/menus":{
        url:{
            "/menuBase":{
                path:"/menuBase",
                url:"/menuBase.html",
                useIndex:false
            },
            "/menuBase2":{
                path:"/menuPaking",
                url:"/menuPaking.html",
                useIndex:false
            },
            "/menuPaletizar":{
                path:"/menuPaletizar",
                url:"/menuPaletizar.html",
                useIndex:false
            },
            "/menuProceso":{
                path:"/menuProceso",
                url:"/menuProceso.html",
                useIndex:false
            },
            "/menuRecepPallet":{
                path:"/menuRecepPallet",
                url:"/menuRecepPallet.html",
                useIndex:false
            },
            "/menuReembalaje":{
                path:"/menuReembalaje",
                url:"/menuReembalaje.html",
                useIndex:false
            },
            "/asignacion":{
                path:"/asignacion",
                url:"/asignacionCalidad.html",
            },
			 "/repaletizar":{
                path:"/repaletizar",
                url:"/repaletizar.html",
            },
            "/seleccionEspecie":{
                path:"/seleccionEspecie",
                url:"/seleccionEspecie.html"
            },
            "/inspeccion":{
                url:{
                    "/inspeccion1":{
                    path:"/numeroinspeccion",
                    url:"/numeroinspeccion.html",
                    useIndex:false
                    },
                    "/inspeccion2":{
                    path:"/inspeccion",
                    url:"/inspeccion.html",
                    useIndex:false
                    }
                }
            },
            "/recepcionPallet":{
                url:{
                    "/palletProductor":{
                        path:"/palletProductor",
                        url:"/palletProductor.html",
                        useIndex:false
                    },
                    "/palletLote":{
                        path:"/palletLote",
                        url:"/palletLote.html",
                        useIndex:false
                    }
                }
            },
            
            "/reembalaje":{
                url:{
                    "/reembalajeEntrada":{
                        path:"/reembalajeEntrada",
                        url:"/reembalajeEntrada.html",
                        useIndex:false
                    },
                    "/reembalajeSalida":{
                        path:"/reembalajeSalida",
                        url:"/reembalajeSalida.html",
                        useIndex:false
                    }
                },
            },
            "/recepcion":{
                url:{
                    "/recepcion":{
                        url:{
                            "/recepcion2":{
                                path:"/recepcionGranel",
                                url:"/recepcionGranel.html",
                                useIndex:false
                            },
                            "/recepcion":{
                                path:"/ingresoRecepcion",
                                url:"/ingresoRecepcion.html",
                                useIndex:false
                            }
                        }
                    },
                    "/resumen":{
                        path:"/resumenRecepcionEspecie",
                        url:"/resumen.html"
                    },
                    "/ImprimirResumen":{
                        path:"/ImprimirResumen",
                        url:"/ImprimirResumen.html"
                    },
                      "/vistaimpresion":{
                          url:{
                            "/vistaimpresion":{
                                path:"/vistaimpresion",
                                url:"/vistaimpresion.html",
                                useIndex:false
                              },
                            "/vistaimpresion2":{
                                path:"/zpl",
                                url:"/ZPL.html",
                                useIndex:false
                                },
                          },
                    },
                    "/galeria":{
                        url:{
                            "/galeria":{
                                path:"/galeria",
                                url:"/galeriazpl.html",
                                useIndex:false
                            },
                            "/pantalla":{
                              path:"/pantalla",
                              url:"/Pantalla.html",
                              useIndex:false
                            }
                        }
                        
                    }

                }
            },
            "/proceso":{
                url:{
                    "/mercadoInterno":{
                        url:{
                            "/mercadoInterno":{
                                path:"/mercadoInterno",
                                url:"/mercadoInterno.html",
                                useIndex:false
                            },
                        }
                    },
                    "/exportacion":{
                        url:{
                            "/exportacion":{
                                path:"/exportacion",
                                url:"/exportacion.html",
                                useIndex:false
                            },
                            "/resumenPaletizar":{
                                path:"/resumenPaletizar",
                                url:"/resumen.html",
                                useIndex:false
                            },
                        }
                    },
                    "/merma":{
                        url:{
                            "/merma":{
                                path:"/merma",
                                url:"/merma.html",
                                useIndex:false
                            },
                        }
                    },
                    "/desecho":{
                        url:{
                            "/desecho":{
                                path:"/desecho",
                                url:"/desecho.html",
                                useIndex:false
                            },
                        }
                    },
                }
            },
            "/paletizar":{
                url:{
                    "/aumentar":{
                        url:{
                            "/aumentar":{
                                    path:"/aumentarCajas",
                                    url:"/aumentarCajas.html",
                                    useIndex:false

                            },
                            "/aumentar2":{
                                    path:"/aumentarDigitar",
                                    url:"/aumentarDigitar.html",
                                    useIndex:false
                            },
                            "/aumentar3":{
                                    path:"/aumentarLotes",
                                    url:"/aumentarLotes.html",
                                    useIndex:false
                            },
                        },
                    },
                    "/mover":{
                        url:{
                            "/mover":{
                                    path:"/MoverPallet_Pallet",
                                    url:"/MoverPallet_Pallet.html",
                                    useIndex:false

                            },
                            "/mover2":{
                                    path:"/MoverPallet_cod",
                                    url:"/MoverPallet_cod.html",
                                    useIndex:false
                            },
                        },
                    },
                    "/paletizar":{
                        url:{
                            "/mover":{
                                    path:"/PROD_Contabilizar",
                                    url:"/PROD_Contabilizar.html",
                                    useIndex:false

                            },
                            "/mover2":{
                                    path:"/StockAlmacen",
                                    url:"/StockAlmacen.html",
                                    useIndex:false
                            },
                        },
                    },
                    "/quitar":{
                        url:{
                            "/quitar":{
                                    path:"/QuitarPallet_Pallet",
                                    url:"/QuitarPallet_Pallet.html",
                                    useIndex:false

                            },
                            "/quitar2":{
                                    path:"/QuitarPallet_cod",
                                    url:"/QuitarPallet_cod.html",
                                    useIndex:false
                            },
                        },
                    },
                    "/rePaletizar":{
                        url:{
                            "/rePaletizar":{
                                path:"/rePaletizar",
                                url:"/rePaletizar.html",
                                useIndex:false
                            }
                        },
                    },
                    "/actualizarHU":{
                        url:{
                            "actualizarHU":{
                                path:"/actualizarHU",
                                url:"/actualizarHU.html",
                                useIndex:false
                            }
                        }
                    }
                },
            },
        }
    }
};
function setModel(object,url,$routeProvider){
    angular.forEach(
        object,
        function(value,key){
            if(typeof value.url==='string'){
                var templateUrl=(value.useIndex===false)?url+value.url:url+key+value.url;
                //console.log(url,value.path,templateUrl);
                $routeProvider.when(value.path, {templateUrl:templateUrl}) ;
            }else if(typeof value.url==='object'){
                setModel(value.url,url+key,$routeProvider);
            }
        }
    )
}

function NumCheck(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
    // 0-9
    if (key > 47 && key < 58) return true
    // .
    if (key == 46) return true

    if (key == 180) return true
    // other key
    return false
}
function verificaRetroceder(){
    document.addEventListener("backbutton", function(){
        alert("Esta seguro de salir");
    }, false);
}
function serializeXmlNode(xmlNode) {
    if (typeof window.XMLSerializer != "undefined" && xmlNode!=undefined && xmlNode!='' ) {
        return new window.XMLSerializer().serializeToString(xmlNode);
    } else if ( xmlNode!=undefined && xmlNode!='' && typeof xmlNode.xml != "undefined") {
        return xmlNode.xml;
    }
    return "Sin Datos";
}
function getXmlMessage(jsonData,xmlData){
    var response='';
    var jsonResponse= xml2json(xmlData,'')
    console.log(JSON.parse(jsonResponse));
    if(xmlData===undefined || xmlData ==='')return 'Respuesta no valida';
    angular.forEach(jsonData, function (value, key) {
        response +=getNodekeyJson(JSON.parse(jsonResponse),null,value);
    });
    return response;
}
function getNodekeyJson(message,key,index) {
    var response='';
    if (typeof message === 'object'&& message!==null) {
            $.each( message, function( key, value ) {
                    response+=getNodekeyJson(value,key,index);
            });
    }else{
        if(key!==index.node)return "";
        else response +='<h1>'+index.h1+'</h1> <p>' + message + '</p>';
    }
    return response;
}
remover_acentos = function (str) {
    try {
        var map = {
            'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ý': 'Y', 'ß': 's', 'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y', 'Ā': 'A', 'ā': 'a', 'Ă': 'A', 'ă': 'a', 'Ą': 'A', 'ą': 'a', 'Ć': 'C', 'ć': 'c', 'Ĉ': 'C', 'ĉ': 'c', 'Ċ': 'C', 'ċ': 'c', 'Č': 'C', 'č': 'c', 'Ď': 'D', 'ď': 'd', 'Đ': 'D', 'đ': 'd', 'Ē': 'E', 'ē': 'e', 'Ĕ': 'E', 'ĕ': 'e', 'Ė': 'E', 'ė': 'e', 'Ę': 'E', 'ę': 'e', 'Ě': 'E', 'ě': 'e', 'Ĝ': 'G', 'ĝ': 'g', 'Ğ': 'G', 'ğ': 'g', 'Ġ': 'G', 'ġ': 'g', 'Ģ': 'G', 'ģ': 'g', 'Ĥ': 'H', 'ĥ': 'h', 'Ħ': 'H', 'ħ': 'h', 'Ĩ': 'I', 'ĩ': 'i', 'Ī': 'I', 'ī': 'i', 'Ĭ': 'I', 'ĭ': 'i', 'Į': 'I', 'į': 'i', 'İ': 'I', 'ı': 'i', 'Ĳ': 'IJ', 'ĳ': 'ij', 'Ĵ': 'J', 'ĵ': 'j', 'Ķ': 'K', 'ķ': 'k', 'Ĺ': 'L', 'ĺ': 'l', 'Ļ': 'L', 'ļ': 'l', 'Ľ': 'L', 'ľ': 'l', 'Ŀ': 'L', 'ŀ': 'l', 'Ł': 'L', 'ł': 'l', 'Ń': 'N', 'ń': 'n', 'Ņ': 'N', 'ņ': 'n', 'Ň': 'N', 'ň': 'n', 'ŉ': 'n', 'Ō': 'O', 'ō': 'o', 'Ŏ': 'O', 'ŏ': 'o', 'Ő': 'O', 'ő': 'o', 'Œ': 'OE', 'œ': 'oe', 'Ŕ': 'R', 'ŕ': 'r', 'Ŗ': 'R', 'ŗ': 'r', 'Ř': 'R', 'ř': 'r', 'Ś': 'S', 'ś': 's', 'Ŝ': 'S', 'ŝ': 's', 'Ş': 'S', 'ş': 's', 'Š': 'S', 'š': 's', 'Ţ': 'T', 'ţ': 't', 'Ť': 'T', 'ť': 't', 'Ŧ': 'T', 'ŧ': 't', 'Ũ': 'U', 'ũ': 'u', 'Ū': 'U', 'ū': 'u', 'Ŭ': 'U', 'ŭ': 'u', 'Ů': 'U', 'ů': 'u', 'Ű': 'U', 'ű': 'u', 'Ų': 'U', 'ų': 'u', 'Ŵ': 'W', 'ŵ': 'w', 'Ŷ': 'Y', 'ŷ': 'y', 'Ÿ': 'Y', 'Ź': 'Z', 'ź': 'z', 'Ż': 'Z', 'ż': 'z', 'Ž': 'Z', 'ž': 'z', 'ſ': 's', 'ƒ': 'f', 'Ơ': 'O', 'ơ': 'o', 'Ư': 'U', 'ư': 'u', 'Ǎ': 'A', 'ǎ': 'a', 'Ǐ': 'I', 'ǐ': 'i', 'Ǒ': 'O', 'ǒ': 'o', 'Ǔ': 'U', 'ǔ': 'u', 'Ǖ': 'U', 'ǖ': 'u', 'Ǘ': 'U', 'ǘ': 'u', 'Ǚ': 'U', 'ǚ': 'u', 'Ǜ': 'U', 'ǜ': 'u', 'Ǻ': 'A', 'ǻ': 'a', 'Ǽ': 'AE', 'ǽ': 'ae', 'Ǿ': 'O', 'ǿ': 'o'
        };
        var res = ''; //Está variable almacenará el valor de str, pero sin acentos y tildes
        for (var i = 0; i < str.length; i++) {
            c = str.charAt(i); res += map[c] || c;
        }
    } catch (e) {
        return '';
    }
    return res;
};

mostrarFecha = function (days) {
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
        return (year + "-" + month + "-" + day);
    };
  
var HTTP_STATUS_CODES = {
        'CODE_200' : 'OK',
        'CODE_201' : 'Created',
        'CODE_202' : 'Accepted',
        'CODE_203' : 'Non-Authoritative Information',
        'CODE_204' : 'No Content',
        'CODE_205' : 'Reset Content',
        'CODE_206' : 'Partial Content',
        'CODE_300' : 'Multiple Choices',
        'CODE_301' : 'Moved Permanently',
        'CODE_302' : 'Found',
        'CODE_303' : 'See Other',
        'CODE_304' : 'Not Modified',
        'CODE_305' : 'Use Proxy',
        'CODE_307' : 'Temporary Redirect',
        'CODE_400' : 'Bad Request',
        'CODE_401' : 'Unauthorized',
        'CODE_402' : 'Payment Required',
        'CODE_403' : 'Forbidden',
        'CODE_404' : 'Not Found',
        'CODE_405' : 'Method Not Allowed',
        'CODE_406' : 'Not Acceptable',
        'CODE_407' : 'Proxy Authentication Required',
        'CODE_408' : 'Request Timeout',
        'CODE_409' : 'Conflict',
        'CODE_410' : 'Gone',
        'CODE_411' : 'Length Required',
        'CODE_412' : 'Precondition Failed',
        'CODE_413' : 'Request Entity Too Large',
        'CODE_414' : 'Request-URI Too Long',
        'CODE_415' : 'Unsupported Media Type',
        'CODE_416' : 'Requested Range Not Satisfiable',
        'CODE_417' : 'Expectation Failed',
        'CODE_500' : 'Internal Server Error',
        'CODE_501' : 'Not Implemented',
        'CODE_502' : 'Bad Gateway',
        'CODE_503' : 'Service Unavailable',
        'CODE_504' : 'Gateway Timeout',
        'CODE_505' : 'HTTP Version Not Supported',
        'CODE_0'   : 'Time Out' 
    };


function downloadApkAndroid(rootScope) {
    var dialog;
    try{
        var fileURL = "cdvfile://localhost/persistent/appCalidad6.apk";
        var apkurl = 'http://200.68.4.145/hana/destino/app2016/appCalidad6.apk';
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(apkurl);
            /*dialog = new sap.m.BusyDialog({text:"Esto puede tardar, por favor espere",showCancelButton:true,close:function(){
                    fileTransfer.abort();
                    dialog.close();
                    }
            });
            dialog.open();*/
        fileTransfer.download(
            uri,
            fileURL,
            function (entry) {
                //alert("download complete: " + entry.fullPath);
                    //app.setBusy(false);
                //dialog.close();
                promptForUpdateAndroid(entry);
            },
            function (error) {
                alert("No es posible descargar la aplicacion, Conexion no estable o cancelada");
                //app.setBusy(false);
                //dialog.close();
                //alert("download error target " + error.target);
                //alert("upload error code" + error.code);
            },
            false,
            {

            }
        );
    }catch(err){
            alert(err.message);
    }
}
/*
 * Uses the borismus webintent plugin
 */
function promptForUpdateAndroid(entry) {
    try{
        window.plugins.webintent.startActivity({
        action: window.plugins.webintent.ACTION_VIEW,
        url: entry.toURL(),
        type: 'application/vnd.android.package-archive'
            },
            function () {
                navigator.app.exitApp();
                //alert('INSTALAR')
            },
            function () {
                alert('Failed to open URL via Android Intent.');
                //alert("<p>Failed to open URL via Android Intent. URL: " + entry.fullPath+"</p>");
            }
        );

    }catch(err){
            alert(err.message);
    }
}

function SalirApp(){
	
    //console.log(sap.m.MessageBox.Icon);
    /*sap.m.MessageBox.show(
                 "¿Desea salir la aplicacion?", {
                   icon: sap.m.MessageBox.Icon.QUESTION,
                   title:"Terminar APP Calidad" ,
                   actions: [
                             sap.m.MessageBox.Action.OK
                             ,"NO"
                             ],
                  onClose: function(oAction){
                      if(oAction==='OK'){
                              navigator.app.exitApp();
                      }else{

                      }
                  }     
                 }
               );
	*/
}
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    switch(states[networkState]){
    case 'No network connection':
    	alert("Sin Conexion a Internet, Revise su Conexion");
    	return false;break;
    }
    return true;
    //alert('Connection type: ' + states[networkState]);
}
    
appConfig.ZPL = {
    'width':"",
    'height':"",
    'ZPL':"",
    "dpmn":"",
    "nom":""
}

appConfig.DatosZPL ={
    'Tamanio':"",
    'Derivado':"",
    'IpZebra':"",
    'Ruta':""
}