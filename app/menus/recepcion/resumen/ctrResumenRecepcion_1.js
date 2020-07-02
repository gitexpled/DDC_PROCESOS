appExpled.lazyController('resumenRecepcionEspecie', function ($scope, $routeParams, $rootScope,$http) {
    $rootScope.totalNeto= "none";
    console.log($scope.datosGranel.LOTE);
    console.log($rootScope.datosGranel.TotalCantidadB)
    var t = $rootScope.formatNumber($rootScope.resumenTotalNeto);
    var B = $rootScope.formatNumber($rootScope.QUANTITY);
    /*$(function(){
    $("#resTotalNetoGranel").html("");
    $("#resTotalNetoGranel").html(String(t));
    $("#resTotalLotesGranel").html("");
    $("#resTotalLotesGranel").html(String(B));
    })*/
    $rootScope.new = false;
    $scope.recepcionSiguiente = function(){
        $rootScope.countLoteGranel=0;
        $rootScope.datosGranel.detalle=[];
        $rootScope.countTab=0;
        $rootScope.datosGranel.totalNeto=0;
        $rootScope.datosGranel.inpPesaBeans=0;
        $rootScope.goToPage('/ingresoRecepcion',{animation:"fadeInRight"});
    }
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
        $rootScope.goToPage('/seleccionEspecie',{animation:"fadeInRight"});
    }
    $scope.generaXMLImpresora = function(){
        $rootScope.datosGranel.fechaSalida = $rootScope.getFechaHora();
        var jsonImpresion = [{
                guia: $rootScope.datosGranel.XBLNR,
                lote: $rootScope.datosGranel.LOTE,
                transportador: '',
                conductor: $rootScope.datosGranel.ZCONDUCTOR,
                pesoBruto: $rootScope.datosGranel.kilosBrutosCamion,
                pesoTrata: $rootScope.datosGranel.kilosDestareCamion,
                patente: $rootScope.datosGranel.ZPATENTE,
                fechaEntrada: $rootScope.datosGranel.fechaEntrada,
                fechaSalida: $rootScope.datosGranel.fechaSalida,
                cantidadEnvases: $rootScope.datosGranel.CANTIDADBINS,
                pesoEnvase: $rootScope.datosGranel.tipoBins.KILOS,
                pesoNeto: $rootScope.kilosTotales,
                productor: $rootScope.datosGranel.LIFNR.DESCRIPTION,
                codProd:$rootScope.datosGranel.LIFNR.VALUE_CHAR,
                especie: $rootScope.seleccionEspecie.DESCRIPTION,
                variedad: $rootScope.datosGranel.VARIEDAD.DESCRIPTION
            }
        ];
         var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
            cadenaXML += '   <soapenv:Header/>';
            cadenaXML += '   <soapenv:Body>';
            cadenaXML += '   <tem:printTarja>';
            cadenaXML += '   <tem:cant>'+$rootScope.datosGranel.CANTIDADBINS +'</tem:cant>';
            cadenaXML += '   <tem:json>'+JSON.stringify(jsonImpresion) +'</tem:json>';
            cadenaXML += '   <tem:IP>'+$rootScope.userData.ipPrinter +'</tem:IP>';
            cadenaXML += '   <tem:centro>'+$rootScope.userData.centro+'</tem:centro>';
            cadenaXML += '   </tem:printTarja>';
            cadenaXML += '   </soapenv:Body>';
            cadenaXML += '</soapenv:Envelope>';
            cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        $scope.mostrarRespuesta(true);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml"); 
        console.log(docXml.firstChild);
        var xmlhttp = new XMLHttpRequest();
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
                        var xmlData = $.parseXML(print);
                        console.log(print)
                        document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + MATERIALDOCUMENT + '</p> <h1>Material Document BD:</h1> <p>' + MATERIALDOCUMENT_BD + '</p><h1>Pedido:</h1> <p>' + PEDIDO + '</p><h1>Mensajes:</h1><p>' + mensajeRespuesta2 + '</p></div>';
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
        }
    $scope.generaXML_Granelx = function(){
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_RECEP_GRANEL>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HEADER>';
        cadenaXML += '               <tem:BUKRS>'+$rootScope.userData.sociedad+'</tem:BUKRS>';
        cadenaXML += '               <tem:EKORG>'+$rootScope.userData.organizacion+'</tem:EKORG>';
        cadenaXML += '               <tem:EKGRP>'+$rootScope.userData.grupoCompra+'</tem:EKGRP>';
        cadenaXML += '               <tem:BSART>'+$rootScope.userData.clasePedido+'</tem:BSART>';
	cadenaXML += '               <tem:BUDAT>' + $rootScope.datosGranel.BUDAT.name + '</tem:BUDAT>';
	cadenaXML += '               <tem:HSDAT>' + $rootScope.datosGranel.HSDAT + '</tem:HSDAT>';
        cadenaXML += '               <tem:LIFNR>' + $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:LIFNR>';
        cadenaXML += '               <tem:XBLNR>' + $rootScope.datosGranel.XBLNR + '</tem:XBLNR>';
        cadenaXML += '               <tem:BKTXT>'+$rootScope.userData.usuario+'</tem:BKTXT>';
        cadenaXML += '               <tem:VARIEDAD>' + $rootScope.datosGranel.VARIEDAD.VALUE_CHAR + '</tem:VARIEDAD>';
        cadenaXML += '               <tem:LOTE>' + $rootScope.datosGranel.LOTE + '</tem:LOTE>';
        cadenaXML += '               <tem:PRODUCTOR>' + $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:PRODUCTOR>';
        cadenaXML += '               <tem:PREDIO>' + $rootScope.datosGranel.ZPREDIO.VALUE_CHAR + '</tem:PREDIO>';
        cadenaXML += '               <tem:CUARTEL>' + $rootScope.datosGranel.ZCUARTEL + '</tem:CUARTEL>';
        cadenaXML += '               <tem:ZPATENTE>' + $rootScope.datosGranel.ZPATENTE + '</tem:ZPATENTE>';
        cadenaXML += '               <tem:ZCONDUCTOR>' + $rootScope.datosGranel.ZCONDUCTOR + '</tem:ZCONDUCTOR>';
        cadenaXML += '               <tem:TRATAMIENTO>' + $rootScope.datosGranel.TRATAMIENTO.VALUE_CHAR + '</tem:TRATAMIENTO>';
        cadenaXML += '               <tem:TIPO_FRIO>' + $rootScope.datosGranel.TIPOFRIO.VALUE_CHAR + '</tem:TIPO_FRIO>';
        cadenaXML += '               <tem:QBINS>' + $rootScope.datosGranel.CANTIDADBINS + '</tem:QBINS>';
        cadenaXML += '            </tem:HEADER>';
        cadenaXML += '            <tem:DESTARE_GRANEL>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_GRANEL_DESTARE_GRANEL>';
        cadenaXML += '               <tem:LFPOS>0001</tem:LFPOS>';
        cadenaXML += '               <tem:QUANTITY>'+$rootScope.datosGranel.CANTIDADBINS+'</tem:QUANTITY>';
        cadenaXML += '               <tem:PO_UNIT>UND</tem:PO_UNIT>';
        cadenaXML += '               <tem:MATERIAL>'+ $rootScope.datosGranel.tipoBins.VALUE_CHAR +'</tem:MATERIAL>';
        cadenaXML += '               <tem:WERKS>' + $rootScope.userData.centro  + '</tem:WERKS>';
        cadenaXML += '               <tem:LGORT>PA01</tem:LGORT>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_GRANEL_DESTARE_GRANEL>';
        cadenaXML += '            </tem:DESTARE_GRANEL>';
        cadenaXML += '            <tem:ITEM_GRANEL>';
        for(var x=0;x<$scope.datosGranel.CANTIDADBINS;x++){
            var lote =1;
            lote = parseInt($scope.datosGranel.LOTE)+x+lote;
            console.log($scope.datosGranel.LOTE+(x+1));
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_GRANEL_ITEM_GRANEL>';
            cadenaXML += '               <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '               <tem:MATERIAL>' + $rootScope.datosGranel.MATERIAL.VALUE_CHAR + '</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH>' + lote + '</tem:BATCH>';
            cadenaXML += '               <tem:QUANTITY>' + $rootScope.QUANTITY + '</tem:QUANTITY>';
            cadenaXML += '               <tem:PO_UNIT>KG</tem:PO_UNIT>';
            cadenaXML += '               <tem:HSDAT>' + $rootScope.datosGranel.HSDAT + '</tem:HSDAT>';
            cadenaXML += '               <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>';
            cadenaXML += '               <tem:STGE_LOC>' + $rootScope.userData.almacenGranel  + '</tem:STGE_LOC>';
            cadenaXML += '               <tem:FREE_ITEM>X</tem:FREE_ITEM>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_GRANEL_ITEM_GRANEL>';;
        }
        cadenaXML += '            </tem:ITEM_GRANEL>'
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_RECEP_GRANEL>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);
        $scope.mostrarRespuesta(true);
        if ($rootScope.datoUsuario.idUsuario != "demo") {

            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', IPSERVER +'/rfcNET.asmx', true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
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
                            var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
                            MATERIALDOCUMENT = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT_BD")[0];
                            MATERIALDOCUMENT_BD = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            thirdPartyNode = $(xmlData).find("PEDIDO")[0];
                            PEDIDO = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta1 = 'NO HAY MATERIAL DOCUMENT (ERROR)';
                        }
                        try {
                            var thirdPartyNode = $(xmlData).find("MESSAGE")[0];
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            $scope.generaXMLImpresora();
                        } catch (e) {
                            mensajeRespuesta2 = 'NO HAY MENSAJES';
                        }
                        document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + MATERIALDOCUMENT + '</p> <h1>Material Document BD:</h1> <p>' + MATERIALDOCUMENT_BD + '</p><h1>Pedido:</h1> <p>' + PEDIDO + '</p><h1>Mensajes:</h1><p>' + mensajeRespuesta2 + '</p></div>';
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
        $scope.recepcionContinuar = function(){
            $rootScope.goToPage('/ingresoRecepcion',{animation:"fadeInRight"});
        }
    }	
    $scope.generaXML_Granel=function(lot){
        console.log(lot)
        //var cant2 = $rootScope.datosGranel.detalle[0].selCantidadGranel2;
        var fechTem =$rootScope.datosGranel.HSDAT;
        var produc = $rootScope.datosGranel.LIFNR.VALUE_CHAR;
        var pred = $rootScope.datosGranel.ZPREDIO.VALUE_CHAR;
        var vard=$rootScope.datosGranel.VARIEDAD.VALUE_CHAR;
        var D = new Date();
        var tempY = D.getFullYear();
        var lotarr = lot.split("-");
        var lotNum = lotarr[1]*1;
       // var num = 1;
        lot = lotarr[0];
        var cantt = $rootScope.datosGranel.TotalCantidadB;
        
		var cadenaXML='';
		cadenaXML+='\
		<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
   <soapenv:Header/>\
   <soapenv:Body>\
      <tem:ZMOV_CREATE_RECEP_GR_FRESCO>\
         <tem:datos>\
            <tem:HEADER>\
               <tem:BUKRS>DC01</tem:BUKRS>\
               <tem:EKORG>1000</tem:EKORG>\
               <tem:EKGRP>902</tem:EKGRP>\
               <tem:BSART>ZFRT</tem:BSART>\
               <tem:BUDAT>'+$rootScope.datosGranel.BUDAT.value+'</tem:BUDAT>\
               <tem:LIFNR>'+$rootScope.datosGranel.LIFNR.VALUE_CHAR+'</tem:LIFNR>\
               <tem:XBLNR>133</tem:XBLNR>\
               <tem:BKTXT>USUARIO</tem:BKTXT>\
            </tem:HEADER>\
            <tem:LOG>\
               <!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LOG>\
                  <tem:TYPE></tem:TYPE>\
                  <tem:ID></tem:ID>\
                  <tem:NUMBER>0</tem:NUMBER>\
                  <tem:MESSAGE></tem:MESSAGE>\
                  <tem:LOG_NO></tem:LOG_NO>\
                  <tem:LOG_MSG_NO>0</tem:LOG_MSG_NO>\
                  <tem:MESSAGE_V1></tem:MESSAGE_V1>\
                  <tem:MESSAGE_V2></tem:MESSAGE_V2>\
                  <tem:MESSAGE_V3></tem:MESSAGE_V3>\
                  <tem:MESSAGE_V4></tem:MESSAGE_V4>\
                  <tem:PARAMETER></tem:PARAMETER>\
                  <tem:ROW>0</tem:ROW>\
                  <tem:FIELD>0</tem:FIELD>\
                  <tem:SYSTEM></tem:SYSTEM>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LOG>\
            </tem:LOG><tem:LT_CARACT>';
       angular.forEach($rootScope.datosGranel.detalle,function(value,key){
                angular.forEach(value,function(value2,key2){
                    if(key2=="subDetalle")
                        angular.forEach(value2,function(subVal,subKey){
                             for(var i=0;i<subVal.selCantidadGranel;i++){
                                 cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:MATERIAL>M-CEREZAS</tem:MATERIAL>\
				   <tem:BATCH>'+lot+'-0'+(i+lotNum-2)+'</tem:BATCH>\
				   <tem:CHARACT>ZCEREZAS_VARIEDAD</tem:CHARACT>\
				   <tem:VALUE_CHAR>'+vard+'</tem:VALUE_CHAR>\
				</tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:MATERIAL>M-CEREZAS</tem:MATERIAL>\
				   <tem:BATCH>'+lot+'-0'+(i+lotNum-2)+'</tem:BATCH>\
				   <tem:CHARACT>ZCEREZAS_SDP</tem:CHARACT>\
				   <tem:VALUE_CHAR>'+pred+'</tem:VALUE_CHAR>\
				</tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:MATERIAL>M-CEREZAS</tem:MATERIAL>\
				   <tem:BATCH>'+lot+'-0'+(i+lotNum-2)+'</tem:BATCH>\
				   <tem:CHARACT>ZCEREZAS_PRODUCTOR</tem:CHARACT>\
				   <tem:VALUE_CHAR>'+produc+'</tem:VALUE_CHAR>\
				</tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				<tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:MATERIAL>M-CEREZAS</tem:MATERIAL>\
				   <tem:BATCH>'+lot+'-0'+(i+lotNum-2)+'</tem:BATCH>\
				   <tem:CHARACT>ZTEMPORADA</tem:CHARACT>\
				   <tem:VALUE_CHAR>'+tempY+'</tem:VALUE_CHAR>\
				</tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				<tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:MATERIAL>M-CEREZAS</tem:MATERIAL>\
				   <tem:BATCH>'+lot+'-0'+(i+lotNum-2)+'</tem:BATCH>\
				   <tem:CHARACT>ZFCOSECHA</tem:CHARACT>\
				   <tem:VALUE_CHAR>'+fechTem+'</tem:VALUE_CHAR>\
				</tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:MATERIAL>M-CEREZAS</tem:MATERIAL>\
				   <tem:BATCH>'+lot+'-0'+(i+lotNum-2)+'</tem:BATCH>\
				   <tem:CHARACT>ZNENVASES</tem:CHARACT>\
				   <tem:VALUE_CHAR>'+subVal.selCantidadGranel2+'</tem:VALUE_CHAR>\
				</tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:MATERIAL>M-CEREZAS</tem:MATERIAL>\
				   <tem:BATCH>'+lot+'-0'+(i+lotNum-2)+'</tem:BATCH>\
				   <tem:CHARACT>ZCEREZAS_TENVASES</tem:CHARACT>\
				   <tem:VALUE_CHAR>TOTE</tem:VALUE_CHAR>\
				</tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				<tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
				   <tem:MATERIAL>M-CEREZAS</tem:MATERIAL>\
				   <tem:BATCH>'+lot+'-0'+(i+lotNum-2)+'</tem:BATCH>\
				   <tem:CHARACT>ZNPARTIDA</tem:CHARACT>\
				   <tem:VALUE_CHAR>'+lot+'</tem:VALUE_CHAR>\
				</tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>';
                             }
                        });
                });
        });

            cadenaXML+='</tem:LT_CARACT><tem:LT_ITEMS>'; 
        for(var i=0;i<cantt;i++)  {  
        angular.forEach($rootScope.datosGranel.detalle,function(value,key){
				cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEMS>\
                  <tem:STCK_TYPE></tem:STCK_TYPE>\
                  <tem:MATERIAL>M-CEREZAS</tem:MATERIAL>\
                  <tem:BATCH>'+lot+'-0'+(i+lotNum-2)+'</tem:BATCH>\
                  <tem:QUANTITY>'+value.totalNeto+'</tem:QUANTITY>\
                  <tem:PO_UNIT>KG</tem:PO_UNIT>\
                  <tem:HSDAT>'+$rootScope.datosGranel.HSDAT+'</tem:HSDAT>\
                  <tem:PLANT>DC02</tem:PLANT>\
                  <tem:STGE_LOC>PA02</tem:STGE_LOC>\
                  <tem:FREE_ITEM>0</tem:FREE_ITEM>\
                  <tem:ITEM_CAT>0</tem:ITEM_CAT>\
                  <tem:MOVE_BATCH></tem:MOVE_BATCH>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEMS>';
        });	
    };
			cadenaXML+='</tem:LT_ITEMS><tem:LT_ITEM_DEST>';
			angular.forEach($rootScope.datosGranel.detalle,function(value,key){
				cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEM_DEST>\
                  <tem:LFPOS>0</tem:LFPOS>\
                  <tem:MATERIAL>M-CEREZAS</tem:MATERIAL>\
                  <tem:QUANTITY>0</tem:QUANTITY>\
                  <tem:PO_UNIT>KG</tem:PO_UNIT>\
                  <tem:WERKS>0</tem:WERKS>\
                  <tem:LGORT>0</tem:LGORT>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEM_DEST>';
			});
			cadenaXML+='</tem:LT_ITEM_DEST>\
         </tem:datos>\
      </tem:ZMOV_CREATE_RECEP_GR_FRESCO>\
   </soapenv:Body>\
</soapenv:Envelope>';
cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        console.log('2')
        
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);
		$rootScope.loading.show();
	$http({
            method: 'POST',
            url: IPSERVER + 'rfcNET.asmx?',
			//url: '/JSON_' + servicio + '.aspx?' + arguments,
            //contentType: 'text/xml; charset=utf-8',
			headers:{
				'Content-Type': 'text/xml; charset=utf-8'
			},
			processData: false,
            dataType: 'xml',
			data:cadenaXML
        }).success(function(data){
            $rootScope.loading.hide();
            console.log(data);
            var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
            console.log(print);
            var parser = new DOMParser();
            var docXml = parser.parseFromString(print, "text/xml");  
            console.log(docXml.firstChild);
            var material = docXml.getElementsByTagName("MATERIALDOCUMENT")[0];
            var pedido  = docXml.getElementsByTagName("PEDIDO")[0];
            //console.log(material,pedido.text)
            document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Documento Material: </h1> <p>' + (material.firstChild.nodeValue) + '</p><h1>Pedido: </h1> <p>' + (pedido.firstChild.nodeValue) + '</p><div></div><div></div> </div>';
            $('#cargandoPopLotesPaking').hide('fade');		
        //$rootScope.alert.show({message:"Documento Material: "+(material.firstChild.nodeValue)+", Pedido: "+(pedido.firstChild.nodeValue)})
		}).error(function(data){
			$rootScope.loading.hide();
			console.log(data)
		});
		/*
		$http.get(IPSERVER + 'rfcNET.asmx')
		.then(function(data) {
			console.log(data)
			$rootScope.loading.hide();
			//console.log(data);
			var print = data.data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
			var xmlData = $.parseXML(print);
			console.log(print);
		});*/
	}
    $scope.imprimir2=function(){
            //var direccionImpresora = '\\\\Desarrollo4\\ZDesigner';
            var direccionImpresora = $rootScope.userData.ipZebra;
            var codP = $rootScope.datosGranel.LIFNR.VALUE_CHAR;
            //var CodV = '2220/BROOKS';
            var CodV = $rootScope.datosGranel.VARIEDAD.VALUE_CHAR+" / "+$rootScope.datosGranel.VARIEDAD.DESCRIPTION;
            var FECHCOS = $rootScope.datosGranel.HSDAT;
            var especie = $rootScope.seleccionEspecie.DESCRIPTION;
           // var Material = $rootScope.datosGranel.MATERIAL.DESCRIPTION;
            var cantt = $rootScope.datosGranel.TotalCantidadB;
            var INF =codP+"|"+CodV+"|"+FECHCOS+"|"+especie+"|"; 
            var dato = "^XA^FO60,30^BY5^BC,80,Y,N^FD"+"*VALORREMPLAZO*"+"^FS^CFA,40^FO50,160^FD"+codP+"^FS^FO50,200^FD"+CodV+"^FS^FO50,240^FD"+FECHCOS+"^FS^FO50,280^FD"+especie+"^FS^FO50,330^FD^FS^FO540,160^BQN,2,7^FD"+INF+"^FS^XZ";
            console.log(dato)
             var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
            cadenaXML += '   <soapenv:Header/>';
            cadenaXML += '   <soapenv:Body>';
            cadenaXML += '   <tem:print>';
            cadenaXML += '   <tem:cant>'+cantt+'</tem:cant>';
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
        if ($rootScope.datoUsuario.idUsuario != "demo")
        {
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
                                $scope.men= estadoImpresion[1]
                                var lot = $rootScope.datosGranel.LOTE
                                $scope.generaXML_Granel(lot);
                        } catch (e) {
                            mensajeRespuesta1 = 'FALLA EN LA IMPRESIÓN';
                        }
                        try {
                            var thirdPartyNode = $(xmlData).find("MESSAGE")[0];
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta2 = 'NO HAY MENSAJES';
                        }
                        //document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Estado impresión:</h1> <p>' + MATERIALDOCUMENT + '</p><h1>N°Partida:</h1> <p>' + mensajeRespuesta1 + '</p><div></div><div></div> </div>';
                       // $('#cargandoPopLotesPaking').hide('fade');
                       //$scope.men = mensajeRespuesta1;
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
    $scope.viewFucntion = function(){
      if($rootScope.seleccionEspecie.DESCRIPTION == "CEREZA" && $rootScope.CerezaCamion.Camion == "SI" && $rootScope.xmlData.aux == "SI"){
          $scope.generaXML_Granel($rootScope.xmlData.data);
     }else{
        $scope.imprimir2();
     }
    }   
});