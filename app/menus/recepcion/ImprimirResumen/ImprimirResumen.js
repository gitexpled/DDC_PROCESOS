appExpled.lazyController('imprimirResumen', function ($scope, $routeParams, $rootScope, $http) {
    $rootScope.new=false;
    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
            //$scope.verBtnFin = "none";
        } else {
            $scope.verPopRespuesta = "none";
            //$scope.verBtnFin = "block";
        }
    }
    $scope.finalizar = function(){
        $scope.showCamionViewv();
        $rootScope.goToPage('/ingresoRecepcion',{animation:"fadeInRight"});
    }
    $scope.showCamionViewv=function(){
        $rootScope.listaCamionesRecepcion=[];
        var arguments = 'patente='+$rootScope.datosGranel.ZPATENTE+'&guia='+$rootScope.datosGranel.XBLNR+'&centro='+$rootScope.userData.centro+'&especie='+$rootScope.seleccionEspecie.DESCRIPTION+'&proceso=listaRecepcion';
        var jsonUrl =  IPSERVER +  '/JSON_DB_RECEPCION.aspx?' + arguments;
        if($rootScope.datosGranel.ZPATENTE===undefined){
            $rootScope.alert.show({message:"Seleccione patente"});
            return 0;
        }
        if($rootScope.datosGranel.XBLNR===undefined){
            $rootScope.alert.show({message:"Seleccione guía"});
            return 0;
        }
        var dg=[];
        dg = JSON.parse(JSON.stringify($rootScope.datosGranel))
        var listaCamionesRecepcionaAUX =[];
        $http({
        method: 'GET',
        url: jsonUrl,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
        }).success(function(data){
                angular.forEach(data, function (value, key) {
                        if (value.dataGranel.ZPATENTE !== $rootScope.datosGranel.ZPATENTE && value.dataGranel.ZPATENTE!='') {
                                listaCamionesRecepcionaAUX.push(JSON.parse(JSON.stringify(value.dataGranel)));
                        }
                });
                $rootScope.listaCamionesRecepcion=listaCamionesRecepcionaAUX;
                $rootScope.listaCamionesRecepcion.push(dg);

                $rootScope.getServicePost('DB_RECEPCION',$rootScope,'patente='+$rootScope.datosGranel.ZPATENTE+'&guia='+$rootScope.datosGranel.XBLNR+'&centro='+$rootScope.userData.centro+'&proceso=nuevaRecepcion&especie='+$rootScope.seleccionEspecie.DESCRIPTION+'&dataGranel='+encodeURI(JSON.stringify($rootScope.datosGranel)) ,null);
                $scope.actualizaKilos();
        }).error(function(data, status, headers, config){
            console.log(data);
        });
    };
    $scope.imprimir=function(){
            //var direccionImpresora = '\\\\Desarrollo4\\ZDesigner';
            var direccionImpresora = $rootScope.userData.ipZebra;
            var lote = $rootScope.datosGranel.LOTE;
            var codP = $rootScope.datosGranel.LIFNR.VALUE_CHAR;
            var CodV = $rootScope.datosGranel.VARIEDAD.VALUE_CHAR+" / "+$rootScope.datosGranel.VARIEDAD.DESCRIPTION;
            var FECHCOS = $rootScope.datosGranel.HSDAT+" / "+$rootScope.datosGranel.CANTIDADBINS ;
            var especie = $rootScope.seleccionEspecie.DESCRIPTION;
            var Material = $rootScope.datosGranel.MATERIAL.DESCRIPTION;
            var INF =codP+"|"+CodV+"|"+FECHCOS+"|"+especie+"|"+Material; 
            var dato = "^XA^FO60,30^BY5^BC,80,Y,N^FD"+"*VALORREMPLAZO*"+"^FS^CFA,40^FO50,160^FD"+codP+"^FS^FO50,200^FD"+CodV+"^FS^FO50,240^FD"+FECHCOS+"^FS^FO50,280^FD"+especie+"^FS^FO50,330^FD"+Material+"^FS^FO540,160^BQN,2,7^FD"+INF+"^FS^XZ";
            console.log(dato)
             var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
            cadenaXML += '   <soapenv:Header/>';
            cadenaXML += '   <soapenv:Body>';
            cadenaXML += '   <tem:print>';
            cadenaXML += '   <tem:cant>'+$rootScope.datosGranel.CANTIDADBINS +'</tem:cant>';
            cadenaXML += '   <tem:zpl>'+dato +'</tem:zpl>';
            cadenaXML += '   <tem:IP>'+direccionImpresora +'</tem:IP>';
            cadenaXML += '   <tem:centro>'+$rootScope.userData.centro+'</tem:centro>';
            cadenaXML += '   <tem:continuaLote>false</tem:continuaLote>';
            cadenaXML += '   </tem:print>';
            cadenaXML += '   </soapenv:Body>';
            cadenaXML += '</soapenv:Envelope>';
            cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        $scope.mostrarRespuesta(true);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml"); 
        if ($rootScope.datoUsuario.idUsuario != "demo") {

            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST',$rootScope.userData.wsPrint, true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingLotesPaking').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        var mensajeRespuesta1;
                        var mensajeRespuesta2;
                        var MATERIALDOCUMENT;
                        var MATERIALDOCUMENT_BD;
                        var PEDIDO;
                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        //$("#response").text(print)
                        var xmlData = $.parseXML(print);
                        console.log(print)
                        try {
                            var thirdPartyNode = $(xmlData).find("printResult")[0];
                            MATERIALDOCUMENT = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            var estadoImpresion = MATERIALDOCUMENT.split(";");
                                MATERIALDOCUMENT = estadoImpresion[0];
                                if(estadoImpresion[0] == '<printResult xmlns="http://tempuri.org/">OK'){
                                    $rootScope.datosGranel.LOTE = (estadoImpresion[1]).replace("</printResult>","");
                                    $rootScope.datosGranel.fechaEntrada = $rootScope.getFechaHora();
                                }
                                console.log(estadoImpresion[0]);
                                mensajeRespuesta1 = estadoImpresion[1];
                        } catch (e) {
                            mensajeRespuesta1 = 'FALLA EN LA IMPRESIÓN';
                        }
                        try {
                            var thirdPartyNode = $(xmlData).find("MESSAGE")[0];
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta2 = 'NO HAY MENSAJES';
                        }
                        document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Estado impresión:</h1> <p>' + MATERIALDOCUMENT + '</p><h1>Lotes:</h1> <p>' + mensajeRespuesta1 + '</p><div></div><div></div> </div>';
                        $('#cargandoPopLotesPaking').hide('fade');
                    }
                    if (xmlhttp.status == 500) {
                        document.getElementById('loadingLotesPaking').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        document.getElementById('btnError').style.display = 'block';
                        document.getElementById('popRespuestaLotesPaking').innerHTML = 'El servidor rechazó recepción de datos!';
                        $rootScope.blockReEnvio = 0;
                    }
                }
            }
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            $scope.btnContinuar = false;
            document.getElementById('loadingLotesPaking').style.display = 'none';
            document.getElementById('popRespuestaLotesPaking').innerHTML = "DATOS DEMOS CORRECTOS";
            $('#cargandoDatosSAP').hide('fade');
        }
        }
    $scope.previo=function(){
        
          $rootScope.goToPage('/vistaimpresion',{animation:"fadeInRight"});
        
    };
})