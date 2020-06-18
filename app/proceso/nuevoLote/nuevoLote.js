appExpled.lazyController('nuevoLote', function ($scope, $routeParams, $rootScope) {
    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
        } else {
            $scope.verPopRespuesta = "none";
        }
    }
    $scope.listaAsignado = [];
    var idxAsignado = 0;
    
    $scope.productoresAsignar=[];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR, function (value, key) {
        if (
            value.ZPRD_VIGENTE =="SI") {
             $scope.productoresAsignar.push({ text: value.NAME1,value:value.LIFNR,nombre:value.NAME1,LIFNR:value.LIFNR})
         }
    }); 
    
    var f = new Date();
    $scope.selFechaContabilizacionOpciones = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha(-1) },
        { value: $scope.mostrarFecha(0), name: $scope.mostrarFecha(0) }
    ];
    $scope.fechaContabilizacionAgrupaLote="";
    $scope.referenciaAgrupaLote="";
    $scope.tipoMaterialPacking="";
    
    //console.log($rootScope.ZMOV_QUERY_STOCK_ALMACEN);
    $scope.validaLotePack = function(index){
        $scope.listaAsignado[index].kilos='';
        $scope.listaAsignado[index].LGORT='';
	angular.forEach($rootScope.ZMOV_QUERY_STOCK_ALMACEN, function (value, key) {
            if(value.CHARG==$scope.listaAsignado[index].lote){
                $scope.listaAsignado[index].listadoMaterial = [{DESCRIPTION: value.MAKTX , VALUE_CHAR: value.MATNR , KILOS:value.CLABS}];
		$scope.listaAsignado[index].kilos=value.CLABS //kilos
                $scope.listaAsignado[index].LGORT=value.LGORT;
                $('#codeLotePakingKilos'+index).val(value.CLABS)
                $('#codeLotePakingLGORT'+index).val(value.WERKS)
                $scope.listaAsignado[index].tipoMaterial = $scope.listaAsignado[index].listadoMaterial[0];
            }
        });
    }
    $scope.asignarLotesPaking = function () {
        //console.log("entra agrega bryan")
        $scope.listaAsignado[idxAsignado] = { id: idxAsignado, lote: '', tipoMaterial: $scope.tipoMaterialPacking,clasificacion:'',kilos:0,LGORT:'' };
        idxAsignado++;
        $scope.totalLoteAsignadoPaking = idxAsignado;
        if(APPMOVIL)$scope.codearLote(idxAsignado-1);
    }
    $scope.remueveLotePaking = function (id) {
        //console.log("entra renueva")
        //console.log($scope.listaAsignado)
        //console.log(id);
        var idxAsignadoAux = 0;
        $scope.listaAsignadoAux = [];
        for (aux = 0; aux < idxAsignado; aux++) {
            if (id != $scope.listaAsignado[aux].id) {
                $scope.listaAsignadoAux[idxAsignadoAux] = {
                    id: idxAsignadoAux,
                    lote: $scope.listaAsignado[aux].lote,
                    tipoMaterial: $scope.listaAsignado[aux].tipoMaterial
                };
                idxAsignadoAux++;
            }
        }
        idxAsignado--;
        $scope.listaAsignado = [];
        $scope.listaAsignado = $scope.listaAsignadoAux;
        //console.log($scope.listaAsignado)
        $scope.totalLoteAsignadoPaking = idxAsignado;
    }
    $scope.finalizar = function (){
        $rootScope.goToPage('/menuPaking',{animation:"fadeInRight"});
    }
    $scope.finalizarEnvioLotePaking = function () {
         //console.log($scope.productorAsignado);
        if (idxAsignado > 0) {
            for (inx = 0; inx < idxAsignado; inx++) {
                if (($scope.listaAsignado[inx].lote == "") || ($scope.listaAsignado[inx].lote == undefined)) {
                    $rootScope.mostrarAlerta(true, "Advertencia", "No ha ingresado codigo al lote:" + (inx + 1));
                    return 0;
                }
                
                if (($scope.listaAsignado[inx].tipoMaterial == "") || ($scope.listaAsignado[inx].tipoMaterial == undefined)) {
                    $rootScope.mostrarAlerta(true, "Advertencia", "No ha ingresado tipo de material al lote:" + (inx + 1));
                    return 0;
                }
                
                if (($scope.listaAsignado[inx].LGORT == "") || ($scope.listaAsignado[inx].LGORT == undefined)) {
                    $rootScope.mostrarAlerta(true, "Advertencia", "Lote Ingresado no tiene Acopio Valido" + (inx + 1));
                    return 0;
                }
                if (($scope.listaAsignado[inx].kilos == "") || ($scope.listaAsignado[inx].kilos == undefined)) {
                    $rootScope.mostrarAlerta(true, "Advertencia", "Lote Ingresado no tiene Kilos" + (inx + 1));
                    return 0;
                }
                
            }
        }
        if (idxAsignado == 0) {
            
            $rootScope.mostrarAlerta(true, "Advertencia", "Ingrese a lo menos un lote");
        } else {
           
           if (($scope.numeroLoteProcesoPaking == "") || ($scope.numeroLoteProcesoPaking == undefined)) {
                $rootScope.mostrarAlerta(true, "Advertencia", "Ingrese número de lote proceso");
                return false;
            }
            if (($scope.referenciaAgrupaLote == "") || ($scope.referenciaAgrupaLote == undefined)) {
                $rootScope.mostrarAlerta(true, "Advertencia", "Ingrese número de Referencia");
                return false;
            } 
            if (($scope.fechaContabilizacionAgrupaLote == "") || ($scope.fechaContabilizacionAgrupaLote == undefined)) {
                $rootScope.mostrarAlerta(true, "Advertencia", "Ingrese Fecha de Contabilizacion");
                return false;
            } 
            {
                //$rootScope.antiRefrescar()
                $rootScope.blockReEnvio = 1;
                document.getElementById('btnContinuar_').style.display = 'none';
                $scope.btnGeneraXML = 'none';
                document.getElementById('btnError').style.display = 'none';
                document.getElementById('popRespuestaLotesPaking').innerHTML = '';
                $('#cargandoPopLotesPaking').show();
                document.getElementById('loadingLotesPaking').style.display = 'block';
                $scope.mostrarRespuesta(true);

                console.log($rootScope.datoUsuario)
                if ($rootScope.datoUsuario.idUsuario != "demo") {
                    var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
                    cadenaXML += '  <soapenv:Header/>';
                    cadenaXML += '<soapenv:Body>';
                    cadenaXML += '  <tem:ZMOV_CREATE_AGRUPALOTE>';
                    cadenaXML += '      <tem:datos>';
                    cadenaXML += '        <tem:HEADER>';
                    cadenaXML += '           <tem:PSTNG_DATE>'+$scope.fechaContabilizacionAgrupaLote.value+'</tem:PSTNG_DATE>';
                    cadenaXML += '           <tem:REF_DOC_NO>'+$scope.referenciaAgrupaLote+'</tem:REF_DOC_NO>';
                    cadenaXML += '           <tem:HEADER_TXT>' + $rootScope.userData.usuario + '</tem:HEADER_TXT>';
                    cadenaXML += '        </tem:HEADER>';
                    cadenaXML += '        <tem:ITEMS>';
                    //<!--Zero or more repetitions:-->';
                    //console.log(idxAsignado)
                    for (inx = 0; inx < idxAsignado; inx++) {
                        console.log($scope.listaAsignado[inx])
                        cadenaXML += '           <tem:ZMOV_CREATE_AGRUPALOTE_ITEMS>';
                        cadenaXML += '              <tem:MATERIAL>'+$scope.listaAsignado[inx].tipoMaterial.VALUE_CHAR+'</tem:MATERIAL>';
                        cadenaXML += '              <tem:BATCH>' + angular.uppercase($scope.listaAsignado[inx].lote) + '</tem:BATCH>';
                        cadenaXML += '              <tem:PLANT>' + $rootScope.userData.acopio + '</tem:PLANT>';
                        cadenaXML += '              <tem:MOVE_BATCH>' + angular.uppercase($scope.numeroLoteProcesoPaking) + '</tem:MOVE_BATCH>';// ESTE ES EL LOTE DE PROCESO
                        cadenaXML += '              <tem:ENTRY_QNT>'+$scope.listaAsignado[inx].kilos+'</tem:ENTRY_QNT>';
                        cadenaXML += '              <tem:STGE_LOC>' + $scope.listaAsignado[inx].LGORT + '</tem:STGE_LOC>';
                        cadenaXML += '              <tem:VENDOR>' + $scope.productorAsignado.value+  '</tem:VENDOR>';
                        
                        cadenaXML += '           </tem:ZMOV_CREATE_AGRUPALOTE_ITEMS>';
                    }
                    cadenaXML += '        </tem:ITEMS>';
                    cadenaXML += '     </tem:datos>';
                    cadenaXML += '  </tem:ZMOV_CREATE_AGRUPALOTE>';
                    cadenaXML += ' </soapenv:Body>';
                    cadenaXML += '</soapenv:Envelope>';
                      cadenaXML = cadenaXML.split('>undefined<').join('><');
                    console.log(cadenaXML);
                    var parser = new DOMParser();
                    var docXml = parser.parseFromString(cadenaXML, "text/xml");  
                    console.log(docXml.firstChild);
                    if ($rootScope.datoUsuario.idUsuario != "demo") {

                        var xmlhttp = new XMLHttpRequest();
                        var mensajeRespuesta1;
                        var mensajeRespuesta2;
                        xmlhttp.open('POST', IPSERVER +'/rfcNET.asmx', true);
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
                                        var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT309")[0];
                                        MATERIALDOCUMENT = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                                        thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT541")[0];
                                        MATERIALDOCUMENT_BD = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                                    } catch (e) {
                                        mensajeRespuesta1 = 'NO HAY MATERIAL DOCUMENT (ERROR)';
                                    }
                                    try {
                                        var thirdPartyNode = $(xmlData).find("MESSAGE")[0];
                                        mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                                    } catch (e) {
                                        mensajeRespuesta2 = 'NO HAY MENSAJES';
                                    }
                                    document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>MATERIALDOCUMENT 309:</h1> <p>' + MATERIALDOCUMENT + '</p> <h1>MATERIALDOCUMENT 541:</h1> <p>' + MATERIALDOCUMENT_BD + '</p><h1>Mensajes:</h1><p>' + mensajeRespuesta2 + '</p></div>';
                                    $('#cargandoPopLotesPaking').hide('fade');
                                    //$scope.recargaStock();
                                    //$rootScope.getService('ZMOV_QUERY_STOCK_SUBCONTR',$rootScope,'','STOCKSUBC',dataFactory);                                
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
            }
        }
    }
       $scope.recargaStock = function(){
            $rootScope.ZMOV_QUERY_STOCK_ALMACEN=[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_STOCK_ALMACEN.aspx?WERKS=DCO2&LGORT=PA02',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
               angular.forEach(data.STOCKLOTES, function (value, key) {
                   var jsonArg = new Object();
                   angular.forEach(value, function (value, key) {
                       jsonArg[key]=value;
                   });
                $rootScope.ZMOV_QUERY_STOCK_ALMACEN.push(jsonArg);
               });
            }).error($rootScope.httpRequest.error);
            }
    $scope.codearProceso = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('numeroLoteProcesoPaking').value = result.text;
            $scope.numeroLoteProcesoPaking = result.text;
        },
        function (error) {
            //$rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }


    $scope.codearLote = function (idx) {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('codeLotePaking'+idx).value = result.text;
            $scope.listaAsignado[idx].lote = result.text;
            $scope.validaLotePack(idx);
        },
        function (error) {
            //$rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }
})