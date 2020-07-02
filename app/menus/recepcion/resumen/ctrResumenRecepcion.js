appExpled.lazyController('resumenRecepcionEspecie', function ($scope, $routeParams, $rootScope, $http) {
    $rootScope.totalNeto = "none";
    $scope.cantidad1 = "";
    $scope.material1 = "";
    $scope.cantidad2 = "";
    $scope.material2 = "";
    console.log($rootScope.datosGranel.TotalCantidadB)
    console.log($rootScope.datosGranel.detalle)
    console.log($rootScope.datosGranel)
    var t = $rootScope.formatNumber($rootScope.resumenTotalNeto);
    var B = $rootScope.formatNumber($rootScope.QUANTITY);
    /*$(function(){
     $("#resTotalNetoGranel").html("");
     $("#resTotalNetoGranel").html(String(t));
     $("#resTotalLotesGranel").html("");
     $("#resTotalLotesGranel").html(String(B));
     })*/
    if (!$rootScope.datosGranel.detalle[0].aux) { $rootScope.datosGranel.detalle[0].aux = 'NO' }
    $rootScope.new = false;
    $scope.recepcionSiguiente = function () {
        $rootScope.countLoteGranel = 0;
        $rootScope.datosGranel.detalle = [{ aux: '' }];
        $rootScope.countTab = 0;
        $rootScope.datosGranel.totalNeto = 0;
        $rootScope.datosGranel.inpPesaBeans = 0;
        $rootScope.goToPage('/ingresoRecepcion', { animation: "fadeInRight" });
    }
    $scope.finalizar = function () {
        $rootScope.goToPage('/seleccionEspecie', { animation: "fadeInRight" });
    }
    $scope.generaXMLImpresora = function () {
        //$rootScope.loading.display="";
        $rootScope.datosGranel.fechaSalida = $rootScope.getFechaHora();
        var jsonImpresion = [{
            guia: $rootScope.datosGranel.XBLNR,
            lote: $rootScope.datosGranel.LOTE,
            transportador: '',
            conductor: $rootScope.datosGranel.ZCONDUCTOR,
            pesoBruto: $rootScope.datosGranel.detalle[0].KILOSBRUTO,
            pesoTrata: $rootScope.datosGranel.kilosBrutosCamion,
            patente: $rootScope.datosGranel.ZPATENTE,
            fechaEntrada: $rootScope.datosGranel.fechaEntrada,
            fechaSalida: $rootScope.datosGranel.fechaSalida,
            tipoEnvase: $scope.material1,
            tipoEnvase2: $scope.material2,
            cantidadEnvases: $scope.cantidad1,
            cantidadEnvases2: $scope.cantidad2,
            codigoFruto: $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR,
            pesoEnvase: $rootScope.datosGranel.tipoBins.KILOS,
            pesoNeto: $rootScope.datosGranel.detalle[0].TotalNeto,
            productor: $rootScope.datosGranel.LIFNR.DESCRIPTION,
            codProd: $rootScope.datosGranel.LIFNR.VALUE_CHAR,
            especie: $rootScope.seleccionEspecie.DESCRIPTION,
            variedad: $rootScope.datosGranel.VARIEDAD.DESCRIPTION,
            centro: $rootScope.userData.centro,
            observacion: $rootScope.datosGranel.observacion
        }
        ];
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '   <tem:printTarja>';
        cadenaXML += '   <tem:cant>1</tem:cant>';
        cadenaXML += '   <tem:json>' + JSON.stringify(jsonImpresion) + '</tem:json>';
        cadenaXML += '   <tem:IP>' + $rootScope.userData.ipPrinter + '</tem:IP>';
        cadenaXML += '   <tem:centro>' + $rootScope.userData.centro + '</tem:centro>';
        cadenaXML += '   </tem:printTarja>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        //$rootScope.mostrarRespuesta(true);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");
        console.log(docXml.firstChild);
        var sr = cadenaXML;
        /*if ($rootScope.userData.centro === 'DC02' || $rootScope.userData.centro === 'DC05' || $rootScope.userData.centro === 'DC10')
        {
            let seg = 0;
            for (var x = 0; x < 3; x++)
            {
				seg=seg+2000
				setTimeout(function(){

                console.log(' ' + seg + ' segundos');
                $scope.EnvioXML(sr, seg);

				},seg)
            }
        } else
        {

            // xmlhttp.send(sr);
        }
		*/

        $scope.EnvioXML(sr);

        /*
         var xmlhttp = new XMLHttpRequest();
         xmlhttp.open('POST',$rootScope.userData.wsPrint, true);
         var sr = cadenaXML;
         xmlhttp.onreadystatechange = function () {

         if (xmlhttp.readyState == 4) {
         if (xmlhttp.status == 200) {
         var mensajeRespuesta1;
         var mensajeRespuesta2;
         var MATERIALDOCUMENT;
         var MATERIALDOCUMENT_BD;
         var PEDIDO;
         var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
         var xmlData = $.parseXML(print);
         console.log(print);
         console.log(xmlData);
         $scope.mensajeTarja = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + MATERIALDOCUMENT + '</p> <h1>Material Document BD:</h1> <p>' + MATERIALDOCUMENT_BD + '</p><h1>Pedido:</h1> <p>' + PEDIDO + '</p><h1>Mensajes:</h1><p>' + mensajeRespuesta2 + '</p></div>';
         console.log($scope.mensajeTarja)
         //$('#cargandoPopLotesPaking').hide('fade');
         if($rootScope.datosGranel.detalle[0].aux == "SI")
         $scope.generaXML_Granel($rootScope.datosGranel.LOTE);
         }
         if (xmlhttp.status == 500) {
         $('#cargandoDatosSAP').hide('fade');
         document.getElementById('btnError').style.display = 'block';
         //document.getElementById('popRespuestaLotesPaking').innerHTML = 'El servidor rechazó recepción de datos!';
         $rootScope.blockReEnvio = 0;
         }
         }
         }
         xmlhttp.setRequestHeader('Content-Type', 'text/xml');*/
    }


    $scope.AUX = 0;
    $scope.EnvioXML = function (sr, seg) {

        $rootScope.loading.show();
        /*if ($rootScope.datosGranel.detalle[0].aux == "SI") {
            $scope.generaXML_Granel($rootScope.datosGranel.LOTE);
            $rootScope.loading.hide();
        }
        return*/
        $http({
            method: 'POST',
            url: $rootScope.userData.wsPrint,
            headers: { 'Content-Type': 'text/xml; charset=utf-8', "Accept": "application/xml" },
            processData: false,
            dataType: 'xml',
            data: sr
        }).success(function (data) {
            $scope.AUX = $scope.AUX + seg;
            //$('#cargandoPopLotesPaking').hide('fade');
            //console.log($rootScope.datosGranel.detalle[0].aux, seg, $scope.AUX);
            if ($rootScope.datosGranel.detalle[0].aux == "SI") {
                /*if ($rootScope.userData.centro === 'DC02' ||$rootScope.userData.centro === 'DC05' || $rootScope.userData.centro === 'DC10') {
                    if ($scope.AUX == 6) {
                        $rootScope.loading.display = "";
                        $rootScope.LoadingMercados = "";
                        $rootScope.verPopRespuesta = 'none';
                        document.getElementById('popRespuestaLotesPaking').innerHTML = '';
                        document.getElementById('loadingLotesPaking').style.display = '';
                        $scope.generaXML_Granel($rootScope.datosGranel.LOTE);
                        $rootScope.loading.hide();
                    } else {
                        console.log('Segundo ' + seg);
                    }
                    ;
                } else {
					*/
                $scope.generaXML_Granel($rootScope.datosGranel.LOTE);
                $rootScope.loading.hide();
                //}
            }

        })
    }
    $scope.json_productores = {
        DC05: 35,
        DC02: 1,
        UN06: 13,
        RU02: 49
    }
    $scope.Get_Other_other_xml = function (lot) {
        var budat = $rootScope.datosGranel.BUDAT.value.split('-');
        var hsdaat = $rootScope.datosGranel.HSDAT.value.split('-');
        var d = new Date();
        var hh = (d.getHours() < 10) ? '0' + d.getHours().toString() : d.getHours().toString();
        var mm = (d.getMinutes() < 10) ? '0' + d.getMinutes().toString() : d.getMinutes().toString();
        var xml = '<?xml version="1.0" encoding="UTF-8"?>\
                    <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:Organization">\
					<soapenv:Header/>\
						<soapenv:Body>\
							<urn:RecibeMaster soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\
								<Especie xsi:type="xsd:integer">1</Especie>\
                    			<Exportador xsi:type="xsd:integer">'+ $scope.json_productores[$rootScope.userData.centro] + '</Exportador>\
                    			<Partida xsi:type="xsd:integer">'+ lot + '</Partida>\
                    			<Estado xsi:type="xsd:string">NUEVO</Estado>\
                    			<CodCentral xsi:type="xsd:string">'+ $rootScope.userData.centro + '</CodCentral>\
                    			<CodProductor xsi:type="xsd:string">'+ $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</CodProductor>\
                    			<NroGuiaDespacho xsi:type="xsd:integer">'+ $rootScope.datosGranel.XBLNR + '</NroGuiaDespacho>\
                    			<FechaRecepcion xsi:type="xsd:string">'+ budat[2] + '/' + budat[1] + '/' + budat[0] + '</FechaRecepcion>\
                    			<FechaCosecha xsi:type="xsd:string">' + hsdaat[2] + '/' + hsdaat[1] + '/' + hsdaat[0] + '</FechaCosecha>\
                    			<CodVariedad xsi:type="xsd:integer">' + $rootScope.datosGranel.VARIEDAD.VALUE_CHAR + '</CodVariedad>\
                    			<EstibaCamion xsi:type="xsd:string"></EstibaCamion>\
                    			<EsponjasCloradas xsi:type="xsd:string"></EsponjasCloradas>\
                    			<NroBandeja xsi:type="xsd:integer">' + $rootScope.datosGranel.detalle.length + '</NroBandeja>\
                    			<HoraLlegada xsi:type="xsd:time">'+ hh + ':' + mm + '</HoraLlegada>\
                    			<KiloMuestra xsi:type="xsd:decimal">0</KiloMuestra>\
                    			<KiloNeto xsi:type="xsd:decimal">'+ (($rootScope.datosGranel.detalle[0].TotalNeto <= 0) ? 0 : $rootScope.datosGranel.detalle[0].TotalNeto) + '</KiloNeto>\
                    			<TempIngreso xsi:type="xsd:decimal">0</TempIngreso>\
                    			<TempSalida xsi:type="xsd:decimal">0</TempSalida>\
                    			<Lote xsi:type="xsd:string">'+ lot + '</Lote>\
                    			<Huerto xsi:type="xsd:string"/>\
                    			<Hidro xsi:type="xsd:string"></Hidro>\
					</urn:RecibeMaster>\
					</soapenv:Body>\
					</soapenv:Envelope>';
        console.log(xml);
        return xml;
    }
    $scope.Send_XML_Other = function (lot) {
        $http({
            method: 'POST',
            url: 'http://sistema-test.ptichile.cl/ws/ws_pti_recepcion.php?',
            //headers: {'Content-Type': 'text/xml; charset=utf-8', "Accept": "application/xml"},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                //'X-Requested-With':'XMLHttpRequest'
            },
            processData: false,
            dataType: 'xml',
            data: $scope.Get_Other_other_xml(lot)
        }).success(function (data) {
            console.log(data);
        })
    }
    $scope.generaXML_Granelx = function () {
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_RECEP_GRANEL>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HEADER>';
        cadenaXML += '               <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>';
        cadenaXML += '               <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>';
        cadenaXML += '               <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>';
        cadenaXML += '               <tem:BSART>' + $rootScope.userData.clasePedido + '</tem:BSART>';
        cadenaXML += '               <tem:BUDAT>' + $rootScope.datosGranel.BUDAT.name + '</tem:BUDAT>';
        cadenaXML += '               <tem:HSDAT>' + $rootScope.datosGranel.HSDAT + '</tem:HSDAT>';
        cadenaXML += '               <tem:LIFNR>' + $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:LIFNR>';
        cadenaXML += '               <tem:XBLNR>' + $rootScope.datosGranel.XBLNR + '</tem:XBLNR>';
        cadenaXML += '               <tem:BKTXT>' + $rootScope.userData.usuario + '</tem:BKTXT>';
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
        cadenaXML += '               <tem:QUANTITY>' + $rootScope.datosGranel.CANTIDADBINS + '</tem:QUANTITY>';
        cadenaXML += '               <tem:PO_UNIT>UND</tem:PO_UNIT>';
        cadenaXML += '               <tem:MATERIAL>' + $rootScope.datosGranel.tipoBins.VALUE_CHAR + '</tem:MATERIAL>';
        cadenaXML += '               <tem:WERKS>' + $rootScope.userData.centro + '</tem:WERKS>';
        cadenaXML += '               <tem:LGORT>PA01</tem:LGORT>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_GRANEL_DESTARE_GRANEL>';
        cadenaXML += '            </tem:DESTARE_GRANEL>';
        cadenaXML += '            <tem:ITEM_GRANEL>';
        for (var x = 0; x < $scope.datosGranel.CANTIDADBINS; x++) {
            var lote = 1;
            lote = parseInt($scope.datosGranel.LOTE) + x + lote;
            console.log($scope.datosGranel.LOTE + (x + 1));
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_GRANEL_ITEM_GRANEL>';
            cadenaXML += '               <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '               <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH>' + lote + '</tem:BATCH>';
            cadenaXML += '               <tem:QUANTITY>' + $rootScope.QUANTITY + '</tem:QUANTITY>';
            cadenaXML += '               <tem:PO_UNIT>KG</tem:PO_UNIT>';
            cadenaXML += '               <tem:HSDAT>' + $rootScope.datosGranel.HSDAT + '</tem:HSDAT>';
            cadenaXML += '               <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>';
            cadenaXML += '               <tem:STGE_LOC>' + $rootScope.userData.almacenGranel + '</tem:STGE_LOC>';
            cadenaXML += '               <tem:FREE_ITEM>X</tem:FREE_ITEM>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_GRANEL_ITEM_GRANEL>';
            ;
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
        if ($rootScope.datoUsuario.idUsuario != "demo") {

            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', IPSERVER + '/rfcNET.asmx', true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        $rootScope.ZMOV_QUERY_STOCK_ALMACEN = [];
                        $http({
                            method: 'POST',
                            url: IPSERVER + '/JSON_ZMOV_QUERY_STOCK_ALMACEN.aspx?WERKS=DCO2&LGORT=PA02',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            timeout: 500000
                        }).success(function (data) {
                            angular.forEach(data.STOCKLOTES, function (value, key) {
                                var jsonArg = new Object();
                                angular.forEach(value, function (value, key) {
                                    jsonArg[key] = value;
                                });
                                $rootScope.ZMOV_QUERY_STOCK_ALMACEN.push(jsonArg);
                            });
                        }).error($rootScope.httpRequest.error);
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
                            //console.log($scope.Get_Other_other_xml())
                            //$scope.Send_XML_Other();
                        } catch (e) {
                            mensajeRespuesta1 = 'NO HAY MATERIAL DOCUMENT (ERROR)';
                        }
                        try {
                            var thirdPartyNode = $(xmlData).find("MESSAGE")[0];
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta2 = 'NO HAY MENSAJES';
                        }
                        //document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + MATERIALDOCUMENT + '</p> <h1>Material Document BD:</h1> <p>' + MATERIALDOCUMENT_BD + '</p><h1>Pedido:</h1> <p>' + PEDIDO + '</p><h1>Mensajes:</h1><p>' + mensajeRespuesta2 + '</p></div>';
                        //$('#cargandoPopLotesPaking').hide('fade');
                        //$scope.recargaStock();
                        //$rootScope.getService('ZMOV_QUERY_STOCK_SUBCONTR',$rootScope,'','STOCKSUBC',dataFactory);
                    }
                    if (xmlhttp.status == 500) {
                        //document.getElementById('loadingLotesPaking').style.display = 'none';
                        //$('#cargandoDatosSAP').hide('fade');
                        document.getElementById('btnError').style.display = 'block';
                        //document.getElementById('popRespuestaLotesPaking').innerHTML = 'El servidor rechazó recepción de datos!';
                        $rootScope.blockReEnvio = 0;
                    }
                }
            }
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            $scope.btnContinuar = false;
        }
        $scope.recepcionContinuar = function () {
            $rootScope.goToPage('/ingresoRecepcion', { animation: "fadeInRight" });
        }
    }
    $rootScope.detalleXML = [];
    var aux = [];
    var aux1 = 0;
    var aux2 = 0;
    angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
        angular.forEach(value, function (value2, key2) {
            if (key2 == "subDetalle")
                angular.forEach(value2, function (subVal, subKey) {
                    if (subVal.selTipoMaterialGranel != undefined && subVal.selTipoMaterialGranel.VALUE_CHAR != "") {
                        $scope.material1 = subVal.selTipoMaterialGranel.VALUE_CHAR + "-" + $scope.material1;
                    }
                    if (subVal.Destare2 != undefined && subVal.Destare2 != 0) {
                        $scope.material2 = subVal.Destare2.VALUE_CHAR + "-" + $scope.material2;
                    }
                    if (subVal.selCantidadGranel != undefined && subVal.selCantidadGranel != "")
                        $scope.cantidad1 = subVal.selCantidadGranel + "-" + $scope.cantidad1;
                    if (subVal.selCanstidadGranel2 != undefined && subVal.selCantidadGranel2 != "")
                        $scope.cantidad2 = subVal.selCantidadGranel2 + "-" + $scope.cantidad2;
                    aux1 = subVal.selCantidadGranel + aux1;
                    aux2 = subVal.selCantidadGranel2 + aux2;
                    angular.forEach(subVal, function (SubValue, SubKey2) {
                        //console.log(subVal.selCantidadGranel+' - '+subVal.selCantidadGranel2);
                        if (SubKey2 === "selTipoMaterialGranel")
                            //console.log(SubValue)
                            aux.push({ material: SubValue.VALUE_CHAR, total: aux1 });
                        if (SubKey2 === "Destare2")
                            //console.log(SubValue)

                            aux.push({ material: SubValue.VALUE_CHAR, total: aux2 });
                    });
                });
        });
    });
    var arr = {};
    for (var i = 0, len = aux.length; i < len; i++)
        arr[aux[i]['material']] = aux[i];
    aux = new Array();
    for (var key in arr)
        aux.push(arr[key]);
    $rootScope.detalleXML = aux;
    console.log($rootScope.detalleXML);


    $scope.generaCarct = function (lot) {
        var contNumLote = 0;
        var cadenaXML = "";
        var fechTem = $rootScope.datosGranel.HSDAT.value;
        var produc = $rootScope.datosGranel.LIFNR.VALUE_CHAR;
        var pred = $rootScope.datosGranel.ZPREDIO.VALUE_CHAR;
        var vard = $rootScope.datosGranel.VARIEDAD.VALUE_CHAR;
        //angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
        //    angular.forEach(value.subDetalle, function (subVal, subKey) {
                for (var i = 1; i <= $rootScope.datosGranel.CANTIDADLOTE; i++) {
                    var lote = "";
                    contNumLote++;
                    if ($rootScope.datosGranel.LOTE2 == 0 || $rootScope.datosGranel.LOTE2 == "" || $rootScope.datosGranel.LOTE2 == undefined) {
                        lote = lot + "-" + ("00" + contNumLote).slice(-2)
                    } else {
                        lote = $rootScope.datosGranel.LOTE2 + "-" + ("00" + contNumLote).slice(-2)
                    }
                    cadenaXML += '<!--Zero or more repetitions:-->\
                   <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                      <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                      <tem:BATCH>' + lote + '</tem:BATCH>\
                      <tem:CHARACT>Z' + $rootScope.seleccionEspecie.VALUE_CHAR + '_VARIEDAD</tem:CHARACT>\
                      <tem:VALUE_CHAR>' + vard + '</tem:VALUE_CHAR>\
                   </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                   <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                      <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                      <tem:BATCH>' + lote + '</tem:BATCH>\
                      <tem:CHARACT>ZSAG_SDP</tem:CHARACT>\
                      <tem:VALUE_CHAR>' + pred + '</tem:VALUE_CHAR>\
                   </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                   <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                      <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                      <tem:BATCH>' + lote + '</tem:BATCH>\
                      <tem:CHARACT>ZUAT</tem:CHARACT>\
                      <tem:VALUE_CHAR>' + $rootScope.datosGranel.UAT.VALUE_CHAR + '</tem:VALUE_CHAR>\
                   </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                   <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                      <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                      <tem:BATCH>' + lote + '</tem:BATCH>\
                      <tem:CHARACT>ZFCOSECHA</tem:CHARACT>\
                      <tem:VALUE_CHAR>' + formattedDate(fechTem) + '</tem:VALUE_CHAR>\
                   </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                   <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                      <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                      <tem:BATCH>' + lote + '</tem:BATCH>\
                      <tem:CHARACT>ZPRODUCTOR</tem:CHARACT>\
                      <tem:VALUE_CHAR>' + $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:VALUE_CHAR>\
                   </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                   <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                      <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                      <tem:BATCH>' + lote + '</tem:BATCH>\
                      <tem:CHARACT>ZGPRODUCTOR</tem:CHARACT>\
                      <tem:VALUE_CHAR>' + $rootScope.datosGranel.XBLNR + '</tem:VALUE_CHAR>\
                   </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                   <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                      <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                      <tem:BATCH>' + lote + '</tem:BATCH>\
                      <tem:CHARACT>ZNPARTIDA</tem:CHARACT>\
                      <tem:VALUE_CHAR>' + lot + '</tem:VALUE_CHAR>\
                   </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';
                    if ($scope.verPopColor == "") {
                        cadenaXML += '<tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                                <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                                <tem:BATCH>' + lote + '</tem:BATCH>\
                                <tem:CHARACT>' + $rootScope.datosGranel.COLOR.ATNAM + '</tem:CHARACT>\
                                <tem:VALUE_CHAR>' + $rootScope.datosGranel.COLOR.VALUE_CHAR + '</tem:VALUE_CHAR>\
                             </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';
                    }

                    cadenaXML += ' <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                      <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                      <tem:BATCH>' + lote + '</tem:BATCH>\
                      <tem:CHARACT>ZNENVASES</tem:CHARACT>\
                      <tem:VALUE_CHAR>' + $rootScope.datosGranel.selCantidadGranel + '</tem:VALUE_CHAR>\
                   </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                        <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                        <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                        <tem:BATCH>' + lote + '</tem:BATCH>\
                        <tem:CHARACT>Z' + $rootScope.seleccionEspecie.VALUE_CHAR + '_TENVASES</tem:CHARACT>\
                        <tem:VALUE_CHAR>' + $rootScope.datosGranel.selTipoMaterialGranel.VALUE_CHAR + '</tem:VALUE_CHAR>\
                    </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';
                    
                    if($rootScope.datosGranel.CANTIDADLOTE == i) {
                        cadenaXML+='<!--Zero or more repetitions:-->\
                        <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>'+lote+'</tem:BATCH>\
                            <tem:CHARACT>ZUNIDAD_LOTE</tem:CHARACT>\
                            <tem:VALUE_CHAR>'+$rootScope.datosGranel.pesoUltimoLote+'</tem:VALUE_CHAR>\
                        </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';
                    } else 
                    {
                        cadenaXML+='<!--Zero or more repetitions:-->\
                        <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>'+lote+'</tem:BATCH>\
                            <tem:CHARACT>ZUNIDAD_LOTE</tem:CHARACT>\
                            <tem:VALUE_CHAR>'+$rootScope.datosGranel.UNIDADLOTE+'</tem:VALUE_CHAR>\
                        </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';
                    }
                    

               cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
               <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:BATCH>'+lote+'</tem:BATCH>\
                  <tem:CHARACT>MATERIAL_2</tem:CHARACT>\
                  <tem:VALUE_CHAR>'+$rootScope.datosGranel.Destare2.VALUE_CHAR+'</tem:VALUE_CHAR>\
               </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';

               cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
               <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:BATCH>'+lote+'</tem:BATCH>\
                  <tem:CHARACT>CANTIDAD_MAT_2</tem:CHARACT>\
                  <tem:VALUE_CHAR>'+$rootScope.datosGranel.selCantidadGranel2+'</tem:VALUE_CHAR>\
               </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';

               cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
               <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:BATCH>'+lote+'</tem:BATCH>\
                  <tem:CHARACT>MATERIAL_3</tem:CHARACT>\
                  <tem:VALUE_CHAR>'+$rootScope.datosGranel.selTipoMaterialGranel3.VALUE_CHAR+'</tem:VALUE_CHAR>\
               </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';

               cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:BATCH>'+lote+'</tem:BATCH>\
                  <tem:CHARACT>CANTIDAD_MAT_3</tem:CHARACT>\
                  <tem:VALUE_CHAR>'+$rootScope.datosGranel.selCantidadGranel3+'</tem:VALUE_CHAR>\
               </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';

               cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
               <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:BATCH>'+lote+'</tem:BATCH>\
                  <tem:CHARACT>MATERIAL_4</tem:CHARACT>\
                  <tem:VALUE_CHAR>'+$rootScope.datosGranel.Destare4.VALUE_CHAR+'</tem:VALUE_CHAR>\
               </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';

               cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>\
                  <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:BATCH>'+lote+'</tem:BATCH>\
                  <tem:CHARACT>CANTIDAD_MAT_4</tem:CHARACT>\
                  <tem:VALUE_CHAR>'+$rootScope.datosGranel.selCantidadGranel4+'</tem:VALUE_CHAR>\
               </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_CARACT>';

                   
                }
            //})
        //})
		console.log(cadenaXML);
        return cadenaXML;
    };
    $scope.generaItems = function (lot) {
        var D = new Date();
        var tempY = D.getFullYear();
        var contNumLote = 0;
        var cadenaXML = "";
        //angular.forEach($rootScope.datosGranel.detalle, function (value2, key) {
            var lote = "";
            var KilosNetosPorLote = $rootScope.datosGranel.KILOSNETO /$rootScope.datosGranel.CANTIDADLOTE;

            if ($rootScope.CerezaCamion.Camion == "NO") {
                //for (var i = 1; i <= value2.SUMBINS; i++) {
                
                for (var i = 1; i <= $rootScope.datosGranel.CANTIDADLOTE; i++) {
                    
                    contNumLote++;
                    lote = lot + "-" + ("00" + contNumLote).slice(-2)
                    cadenaXML += '<!--Zero or more repetitions2:-->\
                   <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEMS>\
                      <tem:STCK_TYPE></tem:STCK_TYPE>\
                      <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>';
                    cadenaXML += '<tem:BATCH>' + lote + '</tem:BATCH>';
                    cadenaXML += '<tem:QUANTITY>' + KilosNetosPorLote.toFixed(2) + '</tem:QUANTITY>\
                      <tem:PO_UNIT>KG</tem:PO_UNIT>\
                      <tem:HSDAT>' + $rootScope.datosGranel.HSDAT.value + '</tem:HSDAT>\
                      <tem:PLANT>' + $rootScope.userData.acopio + '</tem:PLANT>\
                      <tem:STGE_LOC>' + $rootScope.userData.almacenGranel + '</tem:STGE_LOC>';
                    if ($rootScope.userData.usuario == "servicio") {
                        cadenaXML += '<tem:FREE_ITEM>X</tem:FREE_ITEM>';
                    } else {
                        cadenaXML += '<tem:FREE_ITEM></tem:FREE_ITEM>';
                    }
                    cadenaXML += '<tem:ITEM_CAT/>\
                      <tem:MOVE_BATCH/>\
                   </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEMS>';
                }
            } else {
                //for (var i = 1; i <= $rootScope.datosGranel.TotalCantidadB; i++) {
                for (var i = 1; i <=  $rootScope.datosGranel.CANTIDADLOTE; i++) {
                    
                    contNumLote++;
                    lote = lot + "-" + ("00" + contNumLote).slice(-2)
                    cadenaXML += '<!--Zero or more repetitions2:-->\
                   <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEMS>\
                      <tem:STCK_TYPE></tem:STCK_TYPE>\
                      <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>';
                    cadenaXML += '<tem:BATCH>' + lote + '</tem:BATCH>';
                    cadenaXML += '<tem:QUANTITY>' + KilosNetosPorLote.toFixed(2) + '</tem:QUANTITY>\
                      <tem:PO_UNIT>KG</tem:PO_UNIT>\
                      <tem:HSDAT>' + $rootScope.datosGranel.HSDAT.value + '</tem:HSDAT>\
                      <tem:PLANT>' + $rootScope.userData.acopio + '</tem:PLANT>\
                      <tem:STGE_LOC>' + $rootScope.userData.almacenGranel + '</tem:STGE_LOC>';
                    if ($rootScope.userData.usuario == "servicio") {
                        cadenaXML += '<tem:FREE_ITEM>X</tem:FREE_ITEM>';
                    } else {
                        cadenaXML += '<tem:FREE_ITEM></tem:FREE_ITEM>';
                    }
                    cadenaXML += '<tem:ITEM_CAT/>\
                      <tem:MOVE_BATCH/>\
                   </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEMS>';
                }
            }
        //});
        console.log(cadenaXML);
        return cadenaXML;
    };
    function formattedDate(date) {
        var parts = date.split("-");
        return parts[2] + '.' + parts[1] + '.' + parts[0];
    }
    $scope.generaXML_Granel = function (lot) {
        var fechTem = $rootScope.datosGranel.HSDAT.value;
        var produc = $rootScope.datosGranel.LIFNR.VALUE_CHAR;
        var pred = $rootScope.datosGranel.ZPREDIO.VALUE_CHAR;
        var vard = $rootScope.datosGranel.VARIEDAD.VALUE_CHAR;
        var D = new Date();
        var tempY = D.getFullYear();
        // var num = 1;
        console.log($rootScope.datosGranel);
        if ($rootScope.datosGranel.LOTE2 == 0 || $rootScope.datosGranel.LOTE2 == "" || $rootScope.datosGranel.LOTE2 == undefined) {
            //lot = lotarr[0];
            //var lotarr = lot.split("-");
            //var lot = lotarr[1] * 1;

            console.log("Lote 2 vacio");
        } else {
            lot = $rootScope.datosGranel.LOTE2;
        }
        console.log(lot);
        var cadenaXML = '';
        cadenaXML += '\
		<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
   <soapenv:Header/>\
   <soapenv:Body>\
      <tem:ZMOV_CREATE_RECEP_FRESCO_UAT>\
         <tem:datos>\
            <tem:HEADER>\
               <tem:BUKRS>DC01</tem:BUKRS>\
               <tem:EKORG>1000</tem:EKORG>\
               <tem:EKGRP>902</tem:EKGRP>\
               <tem:BSART>' + $rootScope.userData.clasePedido + '</tem:BSART>\
               <tem:BUDAT>' + $rootScope.datosGranel.BUDAT.value + '</tem:BUDAT>\
               <tem:LIFNR>' + $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:LIFNR>\
               <tem:XBLNR>' + $rootScope.datosGranel.XBLNR + '</tem:XBLNR>\
               <tem:BKTXT>' + $rootScope.userData.usuario + '</tem:BKTXT>\
               <tem:ALMACEN_CONSUMO></tem:ALMACEN_CONSUMO>\
               <tem:CHOFER>'+$rootScope.datosGranel.ZCONDUCTOR+'</tem:CHOFER>\
               <tem:RUT>'+$.formatRut($rootScope.datosGranel.rut)+'</tem:RUT>\
               <tem:TRANSPORTE>' + $rootScope.datosGranel.transporte + '</tem:TRANSPORTE>\
               <tem:PATENTE>' + $rootScope.datosGranel.ZPATENTE + '</tem:PATENTE>\
               <tem:TELEFONO>' + $rootScope.datosGranel.telefono + '</tem:TELEFONO>\
               <tem:TEXTO1>' + $rootScope.datosGranel.observacion + '</tem:TEXTO1>\
               <tem:SOLPED>' + $rootScope.datosGranel.solped + '</tem:SOLPED>\
            </tem:HEADER>\
            <tem:I_COPEQUEN>' + $rootScope.datosGranel.LIFNR.COPEQUEN + '</tem:I_COPEQUEN>\
            <tem:I_UAT>' + $rootScope.datosGranel.UAT.VALUE_CHAR + '</tem:I_UAT>\
            <tem:IR_CLASSNUM>\
               <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_IR_CLASSNUM>\
                  <tem:SIGN>I</tem:SIGN>\
                  <tem:OPTION>EQ</tem:OPTION>\
                  <tem:LOW>BLOCK</tem:LOW>\
                  <tem:HIGH></tem:HIGH>\
               </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_IR_CLASSNUM>\
               <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_IR_CLASSNUM>\
                  <tem:SIGN>I</tem:SIGN>\
                  <tem:OPTION>EQ</tem:OPTION>\
                  <tem:LOW>CROP</tem:LOW>\
                  <tem:HIGH></tem:HIGH>\
               </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_IR_CLASSNUM>\
            </tem:IR_CLASSNUM>\
            <tem:I_RECEIVED_VARIETY>' + $rootScope.datosGranel.VARIEDAD.VALUE_CHAR + '</tem:I_RECEIVED_VARIETY>\
            <tem:LOG>\
            </tem:LOG>\
        <tem:LT_CARACT>';
        var arrLote = [];
        var contNumLote = 0;
        console.log(cadenaXML);
        cadenaXML += $scope.generaCarct(lot);
        cadenaXML += '</tem:LT_CARACT><tem:LT_ITEMS>';
        cadenaXML += $scope.generaItems(lot);
        cadenaXML += '</tem:LT_ITEMS><tem:LT_ITEM_DEST>';
        if($rootScope.datosGranel.selCantidadGranel >0){
            cadenaXML += '<!--Zero or more repetitions:-->\
            <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEM_DEST>\
               <tem:LFPOS>0</tem:LFPOS>\
               <tem:MATERIAL>' + $rootScope.datosGranel.selTipoMaterialGranel.VALUE_CHAR + '</tem:MATERIAL>\
               <tem:QUANTITY>' + $rootScope.datosGranel.selCantidadGranel + '</tem:QUANTITY>\
               <tem:PO_UNIT>UND</tem:PO_UNIT>\
               <tem:WERKS>' + $rootScope.userData.acopio + '</tem:WERKS>\
               <tem:LGORT>' + $rootScope.userData.almacenFumigacion + '</tem:LGORT>\
            </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEM_DEST>';
        }
        if($rootScope.datosGranel.selCantidadGranel2 >0){
            cadenaXML += '<!--Zero or more repetitions:-->\
            <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEM_DEST>\
               <tem:LFPOS>0</tem:LFPOS>\
               <tem:MATERIAL>' + $rootScope.datosGranel.Destare2.VALUE_CHAR + '</tem:MATERIAL>\
               <tem:QUANTITY>' + $rootScope.datosGranel.selCantidadGranel2 + '</tem:QUANTITY>\
               <tem:PO_UNIT>UND</tem:PO_UNIT>\
               <tem:WERKS>' + $rootScope.userData.acopio + '</tem:WERKS>\
               <tem:LGORT>' + $rootScope.userData.almacenFumigacion + '</tem:LGORT>\
            </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEM_DEST>';
        }
        if($rootScope.datosGranel.selCantidadGranel3 >0){
            cadenaXML += '<!--Zero or more repetitions:-->\
            <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEM_DEST>\
               <tem:LFPOS>0</tem:LFPOS>\
               <tem:MATERIAL>' + $rootScope.datosGranel.selTipoMaterialGranel3.VALUE_CHAR + '</tem:MATERIAL>\
               <tem:QUANTITY>' + $rootScope.datosGranel.selCantidadGranel3 + '</tem:QUANTITY>\
               <tem:PO_UNIT>UND</tem:PO_UNIT>\
               <tem:WERKS>' + $rootScope.userData.acopio + '</tem:WERKS>\
               <tem:LGORT>' + $rootScope.userData.almacenFumigacion + '</tem:LGORT>\
            </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEM_DEST>';
        }
        if($rootScope.datosGranel.selCantidadGranel4 >0){
            cadenaXML += '<!--Zero or more repetitions:-->\
            <tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEM_DEST>\
               <tem:LFPOS>0</tem:LFPOS>\
               <tem:MATERIAL>' + $rootScope.datosGranel.Destare4.VALUE_CHAR + '</tem:MATERIAL>\
               <tem:QUANTITY>' + $rootScope.datosGranel.selCantidadGranel4 + '</tem:QUANTITY>\
               <tem:PO_UNIT>UND</tem:PO_UNIT>\
               <tem:WERKS>' + $rootScope.userData.acopio + '</tem:WERKS>\
               <tem:LGORT>' + $rootScope.userData.almacenFumigacion + '</tem:LGORT>\
            </tem:ZMOV_CREATE_RECEP_FRESCO_UAT_LT_ITEM_DEST>';
        }
      

        cadenaXML += '</tem:LT_ITEM_DEST>\
         </tem:datos>\
      </tem:ZMOV_CREATE_RECEP_FRESCO_UAT>\
   </soapenv:Body>\
</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");
        console.log(docXml);
        $rootScope.loading.show();
        $http({
            method: 'POST',
            url: IPSERVER + 'rfcNET.asmx?',
            headers: {
                'Content-Type': 'text/xml; charset=utf-8'
            },
            processData: false,
            dataType: 'xml',
            data: cadenaXML
        }).success(function (data) {
            $rootScope.httpRequest.successRedirect = "/seleccionEspecie";
            //console.log(data);
            var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
            console.log(print);
            $rootScope.mostrarRespuesta(true);
            var parser = new DOMParser();
            var docXml = parser.parseFromString(print, "text/xml");
            console.log(docXml);
            var message = "";
            if (docXml.getElementsByTagName("MESSAGE")[0].firstChild != null && docXml.getElementsByTagName("MESSAGE")[0].firstChild != undefined) {
                message = docXml.getElementsByTagName("MESSAGE")[0].firstChild.nodeValue;
            }
            var documentoRecepcion = "";
            if (docXml.getElementsByTagName("MATERIALDOCUMENT")[0].firstChild != null && docXml.getElementsByTagName("MATERIALDOCUMENT")[0].firstChild != undefined) {
                documentoRecepcion = docXml.getElementsByTagName("MATERIALDOCUMENT")[0].firstChild.nodeValue;
            }
            var documentoDestare = "";
            if (docXml.getElementsByTagName("MATERIALDOCUMENT_BD")[0].firstChild != null && docXml.getElementsByTagName("MATERIALDOCUMENT_BD")[0].firstChild != undefined) {
                documentoDestare = docXml.getElementsByTagName("MATERIALDOCUMENT_BD")[0].firstChild.nodeValue;
            }
            console.log(documentoDestare)
            var documentoCosecha = "";
            if (docXml.getElementsByTagName("E_MATDOC_COS")[0].firstChild != null && docXml.getElementsByTagName("E_MATDOC_COS")[0].firstChild != undefined) {
                documentoCosecha = docXml.getElementsByTagName("E_MATDOC_COS")[0].firstChild.nodeValue;
            }
            var documentoFruto = "";
            if (docXml.getElementsByTagName("E_MATDOC_FRU")[0].firstChild != null && docXml.getElementsByTagName("E_MATDOC_FRU")[0].firstChild != undefined) {
                var documentoFruto = docXml.getElementsByTagName("E_MATDOC_FRU")[0].firstChild.nodeValue;
            }
            var documentoTransformacion = "";
            if (docXml.getElementsByTagName("E_MATDOC_TRA")[0].firstChild != null && docXml.getElementsByTagName("E_MATDOC_TRA")[0].firstChild != undefined) {
                documentoTransformacion = docXml.getElementsByTagName("E_MATDOC_TRA")[0].firstChild.nodeValue;
            }
            var ordenCompra = "";
            if (docXml.getElementsByTagName("PEDIDO")[0].firstChild != null && docXml.getElementsByTagName("PEDIDO")[0].firstChild != undefined) {
                ordenCompra = docXml.getElementsByTagName("PEDIDO")[0].firstChild.nodeValue;
            }
            var mensaje = '<div class="contabilizar-text">' +
                '<h1>Orden de Compra: </h1> <p>' + (ordenCompra) + '</p>' +
                '<h1>Documento Recepción: </h1> <p>' + (documentoRecepcion) + '</p>' +
                '<h1>Documento Destare: </h1> <p>' + (documentoDestare) + '</p>' +
                '<h1>Num. Lote: </h1> <p>' + (lot) + '</p>';
            if ($rootScope.datosGranel.UAT.VALUE_CHAR != "") {
                mensaje += '<hr><h1>Copequen</h1>' +
                    '<h1>Documento Cosecha: </h1> <p>' + (documentoCosecha) + '</p>' +
                    '<h1>Documento Fruto: </h1> <p>' + (documentoFruto) + '</p>' +
                    '<h1>Orden de Transformación: </h1> <p>' + (documentoTransformacion) + '</p>';
            }
            mensaje += '<h1>Mensaje: </h1> <p>' + (message) + '</p>';
            mensaje += '<div></div><div></div> </div>';
            $rootScope.LoadingMercados = "none";
            $rootScope.btnContinuar = "block";
            document.getElementById('popRespuestaLotesPaking').innerHTML = mensaje;
            $('#cargandoPopLotesPaking').hide('fade');
            $rootScope.loading.hide();
            if ($rootScope.seleccionEspecie.VALUE_CHAR == 'CEREZAS') { $scope.Send_XML_Other(lot); }
            //$rootScope.alert.show({message:"Documento Material: "+(material.firstChild.nodeValue)+", Pedido: "+(pedido.firstChild.nodeValue)})
        })
            .error(function (data) {
                console.log(data);
            });
    }
    $scope.imprimir2 = function (reimprime) {
        console.log($rootScope);
        /*if ($rootScope.userData.mail == 'servicio') {
            $scope.XmlServicio();
        } else {
            $scope.generaXML_Granel(lot);
        }
        return;*/
		$scope.generaCarct(123);
        $rootScope.loading.display = "";
        //var direccionImpresora = '\\\\Desarrollo4\\ZDesigner';
        var direccionImpresora = $rootScope.userData.ipZebra;
        var codP = $rootScope.datosGranel.LIFNR.VALUE_CHAR;
        var nomP = $rootScope.datosGranel.LIFNR.DESCRIPTION;
        nomP = nomP.substring(0, 19);
        var nomP2 = $rootScope.datosGranel.LIFNR.DESCRIPTION;
        nomP2 = nomP2.substring(20, 39);
        var COD_CSG = $rootScope.datosGranel.LIFNR.COD_CSG;
        var sdp = $rootScope.datosGranel.ZPREDIO.VALUE_CHAR;
        //var CodV = '2220/BROOKS';
        var FECHCOS = $rootScope.datosGranel.HSDAT.value;
        var especie = $rootScope.seleccionEspecie.DESCRIPTION;
        var codVar = $rootScope.datosGranel.VARIEDAD.VALUE_CHAR;
        var mantr = $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR;
        var nomVar = $rootScope.datosGranel.VARIEDAD.DESCRIPTION;

        var SUMCANT = $rootScope.SUMCANT;
        // var Material = $rootScope.datosMaterial.MATERIAL.DESCRIPTION;
        var cantt = $rootScope.datosGranel.CANTIDADLOTE;
        var dato = $rootScope.userData.zpl;
        dato = dato.split("{COD_PROD}").join(codP);
        dato = dato.split("{NOM_PROD}").join(nomP);
        dato = dato.split("{NOM_PROD2}").join(nomP2);
        dato = dato.split("{SDP}").join(sdp);
        dato = dato.split("{ENVASE}").join(SUMCANT);
        dato = dato.split("{ESPECIE}").join(especie);
        dato = dato.split("{MATNR}").join(mantr);
        dato = dato.split("{CSG}").join(COD_CSG);
        dato = dato.split("{FECH_COSECHA}").join(FECHCOS);
        dato = dato.split("{COD_VAR}").join(codVar);
        dato = dato.split("{VARIEDAD}").join(nomVar);
        //var dato = "^XA^FO60,30^BY5^BC,80,Y,N^FD"+"*VALORREMPLAZO*"+"^FS^CFA,40^FO50,160^FD"+codP+"^FS^FO50,200^FD"+CodV+"^FS^FO50,240^FD"+FECHCOS+"^FS^FO50,280^FD"+especie+"^FS^FO50,330^FD^FS^FO540,160^BQN,2,7^FD"+INF+"^FS^XZ";
        console.log(dato)
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '   <tem:print>';
        cadenaXML += '   <tem:cant>' + cantt + '</tem:cant>';
        cadenaXML += '   <tem:zpl>' + dato + '</tem:zpl>';
        cadenaXML += '   <tem:IP>' + direccionImpresora + '</tem:IP>';
        cadenaXML += '   <tem:centro>' + $rootScope.userData.centro + '</tem:centro>';
        cadenaXML += '   <tem:continuaLote>' + reimprime + '</tem:continuaLote>';
        cadenaXML += '   <tem:loteReimprime>' + $rootScope.datosGranel.LOTE + '</tem:loteReimprime>';
        cadenaXML += '   </tem:print>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        $rootScope.mostrarRespuesta(true);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");
        if ($rootScope.datoUsuario.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', $rootScope.userData.wsPrint, true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var mensajeRespuesta1;
                        var mensajeRespuesta2;
                        var MATERIALDOCUMENT;
                        var MATERIALDOCUMENT_BD;
                        var PEDIDO;
                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        //$("#response").text(print)
                        var xmlData = $.parseXML(print);
                        console.log(xmlData)
                        try {
                            var thirdPartyNode = $(xmlData).find("printResult")[0];
                            MATERIALDOCUMENT = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            var estadoImpresion = MATERIALDOCUMENT.split(";");
                            MATERIALDOCUMENT = estadoImpresion[0];
                            $rootScope.datosGranel.LOTE2 = "";
                            if (estadoImpresion[0] == '<printResult xmlns="http://tempuri.org/">OK') {
                                $rootScope.datosGranel.LOTE = (estadoImpresion[1]).replace("</printResult>", "");
                                var loteImpresa = $rootScope.datosGranel.LOTE;
                                loteImpresa = loteImpresa.split("-");
                                $rootScope.datosGranel.LOTE2 = loteImpresa[0];
                                $rootScope.datosGranel.fechaEntrada = $rootScope.getFechaHora();
                                console.log('Hola Mario')
                                //$scope.generaXMLImpresora();
                            }
                            console.log(estadoImpresion[0]);
                            mensajeRespuesta1 = estadoImpresion[1];
                            $scope.men = estadoImpresion[1]
                            var lot = $rootScope.datosGranel.LOTE
                            console.log($rootScope.userData.mail);
                            if ($rootScope.userData.mail == 'servicio') {
                                $scope.XmlServicio();
                            } else {
                                $scope.generaXML_Granel(lot);
                            }
                        } catch (e) {
                            mensajeRespuesta1 = 'FALLA EN LA IMPRESIÓN';
                        }
                        try {
                            var thirdPartyNode = $(xmlData).find("MESSAGE")[0];
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta2 = 'NO HAY MENSAJES';
                        }
                        $scope.logImresion = '<div class="contabilizar-text"> <h1>Estado impresión:</h1> <p>' + MATERIALDOCUMENT + '</p><h1>N°Partida:</h1> <p>' + mensajeRespuesta1 + '</p><div></div><div></div> </div>';
                        console.log($scope.logImresion)
                        // $('#cargandoPopLotesPaking').hide('fade');
                        //$scope.men = mensajeRespuesta1;
                    }
                    if (xmlhttp.status == 500) {
                        //document.getElementById('loadingLotesPaking').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        document.getElementById('btnError').style.display = 'block';
                        //document.getElementById('popRespuestaLotesPaking').innerHTML = 'El servidor rechazó recepción de datos!';
                        $rootScope.blockReEnvio = 0;
                    }
                }
            }
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            $scope.btnContinuar = false;
            //document.getElementById('loadingLotesPaking').style.display = 'none';
            //document.getElementById('popRespuestaLotesPaking').innerHTML = "DATOS DEMOS CORRECTOS";
            $('#cargandoDatosSAP').hide('fade');
        }
    }
    $scope.printNewPdf = function (){
        
        myEl = angular.element(document.querySelector('#LOTE_FINAL'));
        myEl.text($rootScope.datosGranel.LOTE_FINAL);
        myEl = angular.element(document.querySelector('#XBLNR'));
        myEl.text($rootScope.datosGranel.XBLNR);
        myEl = angular.element(document.querySelector('rut'));
        myEl.text($rootScope.datosGranel.rut);
        myEl = angular.element(document.querySelector('#transporte'));
        myEl.text($rootScope.datosGranel.transporte);
        myEl = angular.element(document.querySelector('#ZCONDUCTOR'));
        myEl.text($rootScope.datosGranel.ZCONDUCTOR);
        myEl = angular.element(document.querySelector('#KILOSBRUTO'));
        myEl.text($rootScope.datosGranel.detalle[0].KILOSBRUTO);
        myEl = angular.element(document.querySelector('#kilosBrutosCamion'));
        myEl.text($rootScope.datosGranel.kilosBrutosCamion);
        myEl = angular.element(document.querySelector('rut2'));
        myEl.text($rootScope.datosGranel.rut);
        myEl = angular.element(document.querySelector('ZPATENTE'));
        myEl.text($rootScope.datosGranel.ZPATENTE);
        myEl = angular.element(document.querySelector('BUDAT'));
        myEl.text($rootScope.datosGranel.BUDAT.value);
        myEl = angular.element(document.querySelector('BUDAT2'));
        myEl.text($rootScope.datosGranel.BUDAT.value);
        myEl = angular.element(document.querySelector('tenvase1'));
        myEl.text($rootScope.datosGranel.selTipoMaterialGranel.DESCRIPTION);
        myEl = angular.element(document.querySelector('cenvase1'));
        myEl.text($rootScope.datosGranel.selCantidadGranel);
        myEl = angular.element(document.querySelector('tenvase2'));
        myEl.text($rootScope.datosGranel.Destare2.DESCRIPTION);
        myEl = angular.element(document.querySelector('cenvase2'));
        myEl.text($rootScope.datosGranel.selCantidadGranel2);
        myEl = angular.element(document.querySelector('totalNeto'));
        myEl.text($rootScope.datosGranel.detalle[0].totalNeto);
        myEl = angular.element(document.querySelector('KILOSNETO'));
        myEl.text( $rootScope.datosGranel.KILOSNETO);
        myEl = angular.element(document.querySelector('LIFNRD'));
        myEl.text($rootScope.datosGranel.LIFNR.DESCRIPTION);
        myEl = angular.element(document.querySelector('LIFNR'));
        myEl.text($rootScope.datosGranel.LIFNR.VALUE_CHAR);
        myEl = angular.element(document.querySelector('ESPECIE'));
        myEl.text($rootScope.datosGranel.ESPECIE);
        myEl = angular.element(document.querySelector('VARIEDAD'));
        myEl.text($rootScope.datosGranel.VARIEDAD.DESCRIPTION);
        myEl = angular.element(document.querySelector('observacion'));
        myEl.text($rootScope.datosGranel.observacion);
        console.log($('#printableArea').html());
        if (APPMOVIL) {
            $rootScope.print($('#printableArea').html());
        }
    }
    $scope.printNewZPL = function (){
        var codP = $rootScope.datosGranel.LIFNR.VALUE_CHAR;
        var nomP = $rootScope.datosGranel.LIFNR.DESCRIPTION;
        nomP = nomP.substring(0, 19);
        var nomP2 = $rootScope.datosGranel.LIFNR.DESCRIPTION;
        nomP2 = nomP2.substring(20, 39);
        var COD_CSG = $rootScope.datosGranel.LIFNR.COD_CSG;
        var sdp = $rootScope.datosGranel.ZPREDIO.VALUE_CHAR;
        //var CodV = '2220/BROOKS';
        var FECHCOS = $rootScope.datosGranel.HSDAT.value;
        var especie = $rootScope.seleccionEspecie.DESCRIPTION;
        var codVar = $rootScope.datosGranel.VARIEDAD.VALUE_CHAR;
        var mantr = $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR;
        var nomVar = $rootScope.datosGranel.VARIEDAD.DESCRIPTION;

        var SUMCANT = $rootScope.SUMCANT;
        var zpl = "";

        var contNumLote = 0;
        for (var i = 1; i <= $rootScope.datosGranel.CANTIDADLOTE; i++) {
            var lote = "";
            contNumLote++;
            lote = $rootScope.datosGranel.LOTE_FINAL + "-" + ("00" + contNumLote).slice(-2)
            
            var dato = $rootScope.userData.zpl;
            dato = dato.split("{COD_PROD}").join(codP);
            dato = dato.split("{NOM_PROD}").join(nomP);
            dato = dato.split("{NOM_PROD2}").join(nomP2);
            dato = dato.split("{SDP}").join(sdp);
            dato = dato.split("{ENVASE}").join(SUMCANT);
            dato = dato.split("{ESPECIE}").join(especie);
            dato = dato.split("{MATNR}").join(mantr);
            dato = dato.split("{CSG}").join(COD_CSG);
            dato = dato.split("{FECH_COSECHA}").join(FECHCOS);
            dato = dato.split("{COD_VAR}").join(codVar);
            dato = dato.split("{VARIEDAD}").join(nomVar);
            dato = dato.split("*VALORREMPLAZO*").join(lote);
            zpl += dato + "^PQ1,0,1,Y^XZ";
        }
       
        var config={"ip":$rootScope.userData.ipZebra,"zpl":zpl};
        console.log(config);
        if(APPMOVIL){
            cordova.plugins.ZplWifiPrinter.print(config,successCallback,errorCallback);
        }
    }

    $scope.viewFucntion = function () {
        $rootScope.loading.display = "";
        $rootScope.LoadingMercados = "";
        $rootScope.verPopRespuesta = 'none';
        document.getElementById('popRespuestaLotesPaking').innerHTML = '';
        document.getElementById('loadingLotesPaking').style.display = '';
        if ($rootScope.CerezaCamion.Camion == "SI" && $rootScope.datosGranel.detalle[0].aux == "SI") {
            if ($rootScope.userData.mail == 'servicio') {
                $scope.XmlServicio();
            } else {
                $scope.generaXMLImpresora();
            }
            //$scope.generaXMLImpresora();

        } else {
             if ($rootScope.userData.mail == 'servicio') {
                  $scope.XmlServicio();
              } else {
                
                if(!APPMOVIL){
                    $scope.imprimir2(false);
                } else {
                    console.log(IPSERVER+'/GET_LOTE_NEW.aspx?USER='+$rootScope.userData.idUsuario+'&CENTRO='+angular.uppercase($rootScope.userData.centro));
                    if($rootScope.datosGranel.LOTE != 0){
                        $http({
                            method: 'POST',
                            url: IPSERVER+'/GET_LOTE_NEW.aspx?USER='+$rootScope.userData.idUsuario+'&CENTRO='+angular.uppercase($rootScope.userData.centro),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            timeout:500000
                        }).success(function(data){
                            console.log(data);
                            $rootScope.datosGranel.LOTE = data;
                            $scope.generaXML_Granel(parseInt(data));
                        }).error($rootScope.httpRequest.error);
                    }
                    //$scope.generaXML_Granel(parseInt($rootScope.datosGranel.LOTE_FINAL));
                    if ($rootScope.CerezaCamion.Camion == "NO") {
                        $scope.printNewZPL();
                    } else {
                        $scope.printNewPdf();
                    }
                }
                
            //GET_LOTE_NEW.aspx?USER=13&CENTRO=DC02
           /* console.log($rootScope.userData);
            console.log(IPSERVER+'/GET_LOTE_NEW.aspx?USER='+$rootScope.userData.idUsuario+'&CENTRO='+angular.uppercase($rootScope.userData.centro));
            if($rootScope.datosGranel.LOTE != 0){
                $http({
                    method: 'POST',
                    url: IPSERVER+'/GET_LOTE_NEW.aspx?USER='+$rootScope.userData.idUsuario+'&CENTRO='+angular.uppercase($rootScope.userData.centro),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    timeout:500000
                }).success(function(data){
                    console.log(data);
                    $rootScope.datosGranel.LOTE = data;
                    $scope.generaXML_Granel(parseInt(data));
                }).error($rootScope.httpRequest.error);
            }*/
            /*
            $scope.generaXML_Granel(parseInt($rootScope.datosGranel.LOTE_FINAL));
            if ($rootScope.CerezaCamion.Camion == "NO") {
                $scope.printNewZPL();
            } else {
                $scope.printNewPdf();
            }
            */
            }
        }
    }


   

    $scope.LT_ITEMS_SERVICIO = function () {
        var LT_ITEMS = '';
        var SumaCant = 0;

        angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
            angular.forEach(value.subDetalle, function (subVal, subKey) {
                SumaCant = SumaCant + subVal.selCantidadGranel;
            })
        })
        console.log(SumaCant)
        for (var i = 0; i < SumaCant; i++) {
            var LOTE = '';
            if (i < 9) {
                LOTE = $rootScope.datosGranel.LOTE2 + '-0' + (i + 1);
            } else {
                LOTE = $rootScope.datosGranel.LOTE2 + '-' + (i + 1);
            }
            LT_ITEMS += '<tem:ZMOV_GOODSMVT_CREATE_LT_ITEMS>\
                  <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>\
                  <tem:STGE_LOC>' + $rootScope.userData.almacenGranel + '</tem:STGE_LOC>\
                  <tem:BATCH>' + LOTE + '</tem:BATCH>\
                  <tem:MOVE_TYPE>501</tem:MOVE_TYPE>\
                  <tem:STCK_TYPE></tem:STCK_TYPE>\
                  <tem:SPEC_STOCK></tem:SPEC_STOCK>\
                  <tem:VENDOR>' + $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:VENDOR>\
                  <tem:CUSTOMER></tem:CUSTOMER>\
                  <tem:SALES_ORD></tem:SALES_ORD>\
                  <tem:S_ORD_ITEM>0</tem:S_ORD_ITEM>\
                  <tem:SCHED_LINE>0</tem:SCHED_LINE>\
                  <tem:VAL_TYPE></tem:VAL_TYPE>\
                  <tem:ENTRY_QNT>' + $rootScope.datosGranel.detalle[0].totalNeto + '</tem:ENTRY_QNT>\
                  <tem:ENTRY_UOM>KG</tem:ENTRY_UOM>\
                  <tem:ENTRY_UOM_ISO></tem:ENTRY_UOM_ISO>\
                  <tem:PO_PR_QNT>0</tem:PO_PR_QNT>\
                  <tem:ORDERPR_UN></tem:ORDERPR_UN>\
                  <tem:ORDERPR_UN_ISO></tem:ORDERPR_UN_ISO>\
                  <tem:PO_NUMBER></tem:PO_NUMBER>\
                  <tem:PO_ITEM>0</tem:PO_ITEM>\
                  <tem:SHIPPING></tem:SHIPPING>\
                  <tem:COMP_SHIP></tem:COMP_SHIP>\
                  <tem:NO_MORE_GR></tem:NO_MORE_GR>\
                  <tem:ITEM_TEXT>SERVICIO</tem:ITEM_TEXT>\
                  <tem:GR_RCPT></tem:GR_RCPT>\
                  <tem:UNLOAD_PT></tem:UNLOAD_PT>\
                  <tem:COSTCENTER></tem:COSTCENTER>\
                  <tem:ORDERID></tem:ORDERID>\
                  <tem:ORDER_ITNO>0</tem:ORDER_ITNO>\
                  <tem:CALC_MOTIVE></tem:CALC_MOTIVE>\
                  <tem:ASSET_NO></tem:ASSET_NO>\
                  <tem:SUB_NUMBER></tem:SUB_NUMBER>\
                  <tem:RESERV_NO>0</tem:RESERV_NO>\
                  <tem:RES_ITEM>0</tem:RES_ITEM>\
                  <tem:RES_TYPE></tem:RES_TYPE>\
                  <tem:WITHDRAWN></tem:WITHDRAWN>\
                  <tem:MOVE_MAT></tem:MOVE_MAT>\
                  <tem:MOVE_PLANT></tem:MOVE_PLANT>\
                  <tem:MOVE_STLOC></tem:MOVE_STLOC>\
                  <tem:MOVE_BATCH></tem:MOVE_BATCH>\
                  <tem:MOVE_VAL_TYPE></tem:MOVE_VAL_TYPE>\
                  <tem:MVT_IND></tem:MVT_IND>\
                  <tem:MOVE_REAS>0</tem:MOVE_REAS>\
                  <tem:RL_EST_KEY></tem:RL_EST_KEY>\
                  <tem:REF_DATE></tem:REF_DATE>\
                  <tem:COST_OBJ></tem:COST_OBJ>\
                  <tem:PROFIT_SEGM_NO>0</tem:PROFIT_SEGM_NO>\
                  <tem:PROFIT_CTR></tem:PROFIT_CTR>\
                  <tem:WBS_ELEM></tem:WBS_ELEM>\
                  <tem:NETWORK></tem:NETWORK>\
                  <tem:ACTIVITY></tem:ACTIVITY>\
                  <tem:PART_ACCT></tem:PART_ACCT>\
                  <tem:AMOUNT_LC>0</tem:AMOUNT_LC>\
                  <tem:AMOUNT_SV>0</tem:AMOUNT_SV>\
                  <tem:REF_DOC_YR>0</tem:REF_DOC_YR>\
                  <tem:REF_DOC></tem:REF_DOC>\
                  <tem:REF_DOC_IT>0</tem:REF_DOC_IT>\
                  <tem:EXPIRYDATE></tem:EXPIRYDATE>\
                  <tem:PROD_DATE></tem:PROD_DATE>\
                  <tem:FUND></tem:FUND>\
                  <tem:FUNDS_CTR></tem:FUNDS_CTR>\
                  <tem:CMMT_ITEM></tem:CMMT_ITEM>\
                  <tem:VAL_SALES_ORD></tem:VAL_SALES_ORD>\
                  <tem:VAL_S_ORD_ITEM>0</tem:VAL_S_ORD_ITEM>\
                  <tem:VAL_WBS_ELEM></tem:VAL_WBS_ELEM>\
                  <tem:GL_ACCOUNT></tem:GL_ACCOUNT>\
                  <tem:IND_PROPOSE_QUANX></tem:IND_PROPOSE_QUANX>\
                  <tem:XSTOB></tem:XSTOB>\
                  <tem:EAN_UPC></tem:EAN_UPC>\
                  <tem:DELIV_NUMB_TO_SEARCH></tem:DELIV_NUMB_TO_SEARCH>\
                  <tem:DELIV_ITEM_TO_SEARCH>0</tem:DELIV_ITEM_TO_SEARCH>\
                  <tem:SERIALNO_AUTO_NUMBERASSIGNMENT></tem:SERIALNO_AUTO_NUMBERASSIGNMENT>\
                  <tem:VENDRBATCH></tem:VENDRBATCH>\
                  <tem:STGE_TYPE></tem:STGE_TYPE>\
                  <tem:STGE_BIN></tem:STGE_BIN>\
                  <tem:SU_PL_STCK_1>0</tem:SU_PL_STCK_1>\
                  <tem:ST_UN_QTYY_1>0</tem:ST_UN_QTYY_1>\
                  <tem:ST_UN_QTYY_1_ISO></tem:ST_UN_QTYY_1_ISO>\
                  <tem:UNITTYPE_1></tem:UNITTYPE_1>\
                  <tem:SU_PL_STCK_2>0</tem:SU_PL_STCK_2>\
                  <tem:ST_UN_QTYY_2>0</tem:ST_UN_QTYY_2>\
                  <tem:ST_UN_QTYY_2_ISO></tem:ST_UN_QTYY_2_ISO>\
                  <tem:UNITTYPE_2></tem:UNITTYPE_2>\
                  <tem:STGE_TYPE_PC></tem:STGE_TYPE_PC>\
                  <tem:STGE_BIN_PC></tem:STGE_BIN_PC>\
                  <tem:NO_PST_CHGNT></tem:NO_PST_CHGNT>\
                  <tem:GR_NUMBER></tem:GR_NUMBER>\
                  <tem:STGE_TYPE_ST></tem:STGE_TYPE_ST>\
                  <tem:STGE_BIN_ST></tem:STGE_BIN_ST>\
                  <tem:MATDOC_TR_CANCEL></tem:MATDOC_TR_CANCEL>\
                  <tem:MATITEM_TR_CANCEL>0</tem:MATITEM_TR_CANCEL>\
                  <tem:MATYEAR_TR_CANCEL>0</tem:MATYEAR_TR_CANCEL>\
                  <tem:NO_TRANSFER_REQ></tem:NO_TRANSFER_REQ>\
                  <tem:CO_BUSPROC></tem:CO_BUSPROC>\
                  <tem:ACTTYPE></tem:ACTTYPE>\
                  <tem:SUPPL_VEND></tem:SUPPL_VEND>\
                  <tem:MATERIAL_EXTERNAL></tem:MATERIAL_EXTERNAL>\
                  <tem:MATERIAL_GUID></tem:MATERIAL_GUID>\
                  <tem:MATERIAL_VERSION></tem:MATERIAL_VERSION>\
                  <tem:MOVE_MAT_EXTERNAL></tem:MOVE_MAT_EXTERNAL>\
                  <tem:MOVE_MAT_GUID></tem:MOVE_MAT_GUID>\
                  <tem:MOVE_MAT_VERSION></tem:MOVE_MAT_VERSION>\
                  <tem:FUNC_AREA></tem:FUNC_AREA>\
                  <tem:TR_PART_BA></tem:TR_PART_BA>\
                  <tem:PAR_COMPCO></tem:PAR_COMPCO>\
                  <tem:DELIV_NUMB></tem:DELIV_NUMB>\
                  <tem:DELIV_ITEM>0</tem:DELIV_ITEM>\
                  <tem:NB_SLIPS>0</tem:NB_SLIPS>\
                  <tem:NB_SLIPSX></tem:NB_SLIPSX>\
                  <tem:GR_RCPTX></tem:GR_RCPTX>\
                  <tem:UNLOAD_PTX></tem:UNLOAD_PTX>\
                  <tem:SPEC_MVMT></tem:SPEC_MVMT>\
                  <tem:GRANT_NBR></tem:GRANT_NBR>\
                  <tem:CMMT_ITEM_LONG></tem:CMMT_ITEM_LONG>\
                  <tem:FUNC_AREA_LONG></tem:FUNC_AREA_LONG>\
                  <tem:LINE_ID>0</tem:LINE_ID>\
                  <tem:PARENT_ID>0</tem:PARENT_ID>\
                  <tem:LINE_DEPTH>0</tem:LINE_DEPTH>\
                  <tem:QUANTITY>0</tem:QUANTITY>\
                  <tem:BASE_UOM></tem:BASE_UOM>\
                  <tem:LONGNUM></tem:LONGNUM>\
                  <tem:BUDGET_PERIOD></tem:BUDGET_PERIOD>\
                  <tem:EARMARKED_NUMBER></tem:EARMARKED_NUMBER>\
                  <tem:EARMARKED_ITEM>0</tem:EARMARKED_ITEM>\
                  <tem:STK_SEGMENT></tem:STK_SEGMENT>\
                  <tem:MOVE_SEGMENT></tem:MOVE_SEGMENT>\
               </tem:ZMOV_GOODSMVT_CREATE_LT_ITEMS>';
        }
        return LT_ITEMS;
    }

    /*$scope.LT_CARACT_SERVICIO = function () {
        console.log($rootScope.cliente);
        var HSDAT0 = $rootScope.datosGranel.HSDAT.name;
        var HSDAT1 = HSDAT0.split('-');
        var HSDAT = HSDAT1[2] + '.' + HSDAT1[1] + '.' + HSDAT1[0];
        console.log(HSDAT);
        var LT_CARACT = '';
        var SumaGranel = 0;
        angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
            angular.forEach(value.subDetalle, function (subVal, subKey) {
                console.log(subVal);
                for (var i = 1; i <= subVal.selCantidadGranel; i++) {
                    var LOTE = '';
                    if (i < 9) {
                        LOTE = $rootScope.datosGranel.LOTE2 + '-0' + (i + 1);
                    } else {
                        LOTE = $rootScope.datosGranel.LOTE2 + '-' + (i + 1);
                    }
                    LT_CARACT += '<tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>ZPRODUCTOR</tem:CHARACT>\
                            <tem:VALUE_CHAR>' + $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>Z' + $rootScope.datosGranel.ESPECIE + '_VARIEDAD</tem:CHARACT>\
                            <tem:VALUE_CHAR>' + $rootScope.datosGranel.VARIEDAD.VALUE_CHAR + '</tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>ZNPARTIDA</tem:CHARACT>\
                            <tem:VALUE_CHAR>' + $rootScope.datosGranel.LOTE2 + '</tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>ZGPRODUCTOR</tem:CHARACT>\
                            <tem:VALUE_CHAR>' + $rootScope.datosGranel.XBLNR + '</tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>ZFCOSECHA</tem:CHARACT>\
                            <tem:VALUE_CHAR>' + HSDAT + '</tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>ZSAG_SDP </tem:CHARACT>\
                            <tem:VALUE_CHAR>'+ $rootScope.datosGranel.ZPREDIO.VALUE_CHAR + '</tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>ZNENVASES</tem:CHARACT>\
                            <tem:VALUE_CHAR>1</tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>Z' + $rootScope.datosGranel.ESPECIE + '_TENVASES </tem:CHARACT>\
                            <tem:VALUE_CHAR>' + subVal.formato_mat + '</tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>ZUAT</tem:CHARACT>\
                            <tem:VALUE_CHAR>' + (($rootScope.datosGranel.UAT.VALUE_CHAR)?$rootScope.datosGranel.UAT.VALUE_CHAR:'N/A')+ '</tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>ZCLIENTE</tem:CHARACT>\
                            <tem:VALUE_CHAR>' + $rootScope.cliente.VALUE_CHAR + '</tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>ZTFRIO</tem:CHARACT>\
                            <tem:VALUE_CHAR></tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                         <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                            <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                            <tem:BATCH>' + LOTE + '</tem:BATCH>\
                            <tem:CHARACT>TIPIFICACION</tem:CHARACT>\
                            <tem:VALUE_CHAR></tem:VALUE_CHAR>\
                         </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>';
                }
            })
        })
        console.log(SumaGranel);
        return LT_CARACT;
    }*/

    $scope.LT_CARACT_SERVICIO = function () {
        console.log($rootScope.cliente);
        var HSDAT0 = $rootScope.datosGranel.HSDAT.name;
        var HSDAT1 = HSDAT0.split('-');
        var HSDAT = HSDAT1[2] + '.' + HSDAT1[1] + '.' + HSDAT1[0];
        console.log(HSDAT);
        var LT_CARACT = '';
        var SumaGranel = 0;
        var formato_mat_aux = '';
        angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
            angular.forEach(value.subDetalle, function (subVal, subKey) {
                SumaGranel = SumaGranel + subVal.selCantidadGranel;
                formato_mat_aux = subVal.formato_mat;
            })
        })
        console.log(SumaGranel)
        for (var i = 0; i < SumaGranel; i++) {
            var LOTE = '';
            if (i < 9) {
                LOTE = $rootScope.datosGranel.LOTE2 + '-0' + (i + 1);
            } else {
                LOTE = $rootScope.datosGranel.LOTE2 + '-' + (i + 1);
            }
            LT_CARACT += '<tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>ZPRODUCTOR</tem:CHARACT>\
                    <tem:VALUE_CHAR>' + $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>Z' + $rootScope.datosGranel.ESPECIE + '_VARIEDAD</tem:CHARACT>\
                    <tem:VALUE_CHAR>' + $rootScope.datosGranel.VARIEDAD.VALUE_CHAR + '</tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>ZNPARTIDA</tem:CHARACT>\
                    <tem:VALUE_CHAR>' + $rootScope.datosGranel.LOTE2 + '</tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>ZGPRODUCTOR</tem:CHARACT>\
                    <tem:VALUE_CHAR>' + $rootScope.datosGranel.XBLNR + '</tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>ZFCOSECHA</tem:CHARACT>\
                    <tem:VALUE_CHAR>' + HSDAT + '</tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>ZSAG_SDP </tem:CHARACT>\
                    <tem:VALUE_CHAR>'+ $rootScope.datosGranel.ZPREDIO.VALUE_CHAR + '</tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>ZNENVASES</tem:CHARACT>\
                    <tem:VALUE_CHAR>1</tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>Z' + $rootScope.datosGranel.ESPECIE + '_TENVASES </tem:CHARACT>\
                    <tem:VALUE_CHAR>' + formato_mat_aux + '</tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>ZUAT</tem:CHARACT>\
                    <tem:VALUE_CHAR>' + (($rootScope.datosGranel.UAT.VALUE_CHAR)?$rootScope.datosGranel.UAT.VALUE_CHAR:'N/A')+ '</tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>ZCLIENTE</tem:CHARACT>\
                    <tem:VALUE_CHAR>' + $rootScope.cliente.VALUE_CHAR + '</tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>ZTFRIO</tem:CHARACT>\
                    <tem:VALUE_CHAR></tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                 <tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>\
                    <tem:MATERIAL>' + $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR + '</tem:MATERIAL>\
                    <tem:BATCH>' + LOTE + '</tem:BATCH>\
                    <tem:CHARACT>TIPIFICACION</tem:CHARACT>\
                    <tem:VALUE_CHAR></tem:VALUE_CHAR>\
                 </tem:ZMOV_GOODSMVT_CREATE_LT_CARACT>';
        }
        return LT_CARACT;
    }
    $scope.XmlServicio = function () {
        var f = new Date();
        var mes = (f.getMonth() + 1) * 1;
        console.log(mes);
        var dia = f.getDate();
        if (mes < 10) {
            mes = '0' + (f.getMonth() + 1);
        }
        if (dia < 10) {
            dia = '0' + dia;
        }
        var year = f.getFullYear();
        //var Fecha1 = dia+'.'+mes+'.'+year;
        var Fecha1 = year + '-' + mes + '-' + dia;
        var xml = '';
        xml += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
                    <soapenv:Header/>\
                    <soapenv:Body>\
                        <tem:ZMOV_GOODSMVT_CREATE>\
                            <tem:datos>\
                               <tem:GOODSMVT_CODE>\
                                  <tem:GM_CODE>01</tem:GM_CODE>\
                               </tem:GOODSMVT_CODE>\
                               <tem:HEADER>\
                                   <tem:PSTNG_DATE>' + $rootScope.datosGranel.BUDAT.name + '</tem:PSTNG_DATE>\
                                   <tem:DOC_DATE>' + Fecha1 + '</tem:DOC_DATE>\
                                   <tem:REF_DOC_NO>SERVICIO GRANEL</tem:REF_DOC_NO>\
                                   <tem:BILL_OF_LADING></tem:BILL_OF_LADING>\
                                   <tem:GR_GI_SLIP_NO></tem:GR_GI_SLIP_NO>\
                                   <tem:PR_UNAME></tem:PR_UNAME>\
                                   <tem:HEADER_TXT></tem:HEADER_TXT>\
                                   <tem:VER_GR_GI_SLIP></tem:VER_GR_GI_SLIP>\
                                   <tem:VER_GR_GI_SLIPX></tem:VER_GR_GI_SLIPX>\
                                   <tem:EXT_WMS></tem:EXT_WMS>\
                                   <tem:REF_DOC_NO_LONG></tem:REF_DOC_NO_LONG>\
                                   <tem:BILL_OF_LADING_LONG></tem:BILL_OF_LADING_LONG>\
                                   <tem:BAR_CODE></tem:BAR_CODE>\
                                </tem:HEADER>\
                                <tem:LOG></tem:LOG>\
                               <tem:LT_CARACT>';
        xml += $scope.LT_CARACT_SERVICIO();
        xml += '</tem:LT_CARACT>\
                                <!--Optional:-->\
                               <tem:LT_ITEMS>';
        xml += $scope.LT_ITEMS_SERVICIO();
        xml += '</tem:LT_ITEMS>\
                       </tem:datos>\
                        </tem:ZMOV_GOODSMVT_CREATE>\
                    </soapenv:Body>\
            </soapenv:Envelope>';
        xml = xml.split('>undefined<').join('><');
        console.log(xml);
        //return;
        $http({
            method: 'POST',
            url: IPSERVER + 'rfcNET.asmx',
            headers: { 'Content-Type': 'text/xml; charset=utf-8', "Accept": "application/xml" },
            processData: false,
            dataType: 'xml',
            data: xml
        }).success(function (data) {
            console.log(data)
            //$rootScope.httpRequest.successRedirect="/seleccionEspecie";
            //console.log(data);
            var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
            console.log(print);
            $rootScope.mostrarRespuesta(true);
            var parser = new DOMParser();
            var docXml = parser.parseFromString(print, "text/xml");
            var jsonRespuesta = xml2json(docXml, '');
            console.log(jsonRespuesta);
            jsonRespuesta = JSON.parse(jsonRespuesta)
            $scope.generaXMLImpresora();
            var message = "";
            var mensaje = '<div class="contabilizar-text">' +
                '<h1>Orden de Compra: </h1> <p>' + jsonRespuesta['soap:Envelope']['soap:Body']['ZMOV_GOODSMVT_CREATEResponse']['ZMOV_GOODSMVT_CREATEResult'].MATERIALDOCUMENT + '</p>' +
                '<h1>Num. Lote: </h1> <p>' + ($rootScope.datosGranel.LOTE2) + '</p>';
            mensaje += '<h1>Mensaje: </h1> <p>' + (message) + '</p>';
            mensaje += '<div></div><div></div> </div>';
            $rootScope.LoadingMercados = "none";
            $rootScope.btnContinuarMARIO = "block";
            $rootScope.loading.hide();
            document.getElementById('popRespuestaLotesPaking').innerHTML = mensaje;
        }).error($rootScope.httpRequest.error);
    }
    $scope.alert = {
        show: false
    };
    $rootScope.print = function (html) {
        cordova.plugins.printer.print(html, { duplex: 'long' }, function (res) {
            //alert(res ? 'Done' : 'Canceled');
        });
    };
});
