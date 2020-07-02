
appExpled.lazyController('ctrMoverPallet_cod', function ($scope, $routeParams, $rootScope, $http) {
    $rootScope.datosPaletiza = {
        HUKEY: '',
        existente: '',
        numeroPallet: ''
    }
    $scope.autocompletarCero = function () {
        if ($scope.numeroPallet != "") {
            if ($rootScope.parseLotePallet($scope.numeroPallet) != 0)
                $scope.numeroPallet = $rootScope.parseLotePallet($scope.numeroPallet);
            else {
                $rootScope.alert.show({ message: "Solo números" });
                $scope.numeroPallet = '';
            }
        }
    }
    $scope.mostrarRespuesta(false);
    $scope.buscarPallet = function () {
        $http({
            method: 'POST',
            url: IPSERVER + '/JSON_ZMOV_QUERY_HU_INFO.aspx?IR_EXIDV=' + angular.uppercase($scope.numeroPallet),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout: 500000
        }).success(function (datos) {
            console.log(datos)
            if (datos.LT_HU_CABECERA.length == 0) {
                $rootScope.alert.show({ message: "Codigo de Pallet sin registro" });
                return 0;
            }
            $rootScope.ZMOV_QUERY_HU_READ = datos;
            $rootScope.datosPaletiza.HUKEY = $scope.numeroPallet.toUpperCase();
            $rootScope.datosPaletiza.existente = datos;
            $rootScope.datosPaletiza.numeroPallet = $scope.numeroPallet.toUpperCase();
            $rootScope.datosPaletiza.numero = parseInt($scope.numeroPallet);
            var HU_EXID = '';
            if (isNaN($rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].EXIDV)) {
                HU_EXID = $rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].EXIDV.toUpperCase()
            } else {
                HU_EXID = parseInt($rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].EXIDV);
            }
            if ($rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0] !== undefined && HU_EXID == $scope.numeroPallet.toUpperCase()) {
                $rootScope.HU_EXID = angular.uppercase($rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].EXIDV);
                $rootScope.goToPage('MoverPallet_Pallet');
            } else {
                $rootScope.alert.show({ message: "Codigo de Pallet no registrado" });
            }
        }).error($rootScope.httpRequest.error);
    }
    $scope.codearPalet = function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                //alert(result.text)
                document.getElementById('numeroPallet').value = $rootScope.parseLotePallet(result.text);
                $scope.numeroPallet = $rootScope.parseLotePallet(result.text);
                $scope.$apply();
                $scope.buscarPallet();
            },
            function (error) {
                $rootScope.alert.show({ message: "Error: " + error });
            }
        );
    }
})
appExpled.lazyController('ctrMoverPallet_Pallet', function ($scope, $routeParams, $rootScope, $http) {
    $scope.datosPallet = {
        camara: '',
        banda: ''
    }
    $scope.listarBandasPorCamara = function (data) {
        console.log(data.VALUE_CHAR);
        $scope.listarBanda = [];
        angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.CAMBAND, function (value, key) {
            if (data.VALUE_CHAR == value.VEGR5_CAMARA) {
                $scope.listarBanda.push({ DESCRIPTION: value.VEGR5_BANDA, VALUE_CHAR: value.VEGR5_BANDA });
            }
        })
        console.log($scope.listarBanda);
    }
    $scope.listarCamara = [];
    var arrCam = [];
    angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.CAMBAND, function (value, key) {
        if (arrCam.indexOf(value.VEGR5_CAMARA) === -1) {
            $scope.listarCamara.push({ DESCRIPTION: value.VEGR5_CAMARA, VALUE_CHAR: value.VEGR5_CAMARA });
            arrCam.push(value.VEGR5_CAMARA);
        }
    })
    $scope.JSON_ESQUINERO = [
        { MATNR: '000002003002003706', MAKTX: 'ESQUINERO CTN. 2X2X100 S/IMP', CANTIDAD: '4', BOOL: '' },
        { MATNR: '000002003002003702', MAKTX: 'ESQUINERO CTN. 2X2X204 S/IMP', CANTIDAD: '4', BOOL: 'X' },
        { MATNR: '000002003002003705', MAKTX: 'ESQUINERO CTN. 2X2X230 S/IMP', CANTIDAD: '4', BOOL: '' }
    ]
    $scope.limpiaDatos = function () {
        var idx = 0;
        $rootScope.datosPaletiza.manual = [];
        angular.forEach($rootScope.ZMOV_QUERY_HU_READ.LT_HU_POSICION, function (value, key) {
            $rootScope.datosPaletiza.manual[idx] = {
                idx: idx,
                MATNR: value.MATNR,
                WERKS: value.WERKS,
                LGORT: value.LGORT,
                CHARG: value.CHARG,
                CALIBRE: value.CALIBRE,
                PRODUCTOR_ET: value.PRODUCTOR_ET,
                VEMNG: value.VEMNG,
                seleccionado: 'false',
                inLotePaletizar: 0
            }
            idx++;
        });
    }
    $scope.limpiaDatos();
    // estableser oculto
    $rootScope.mostrarRespuesta(false);
    console.log($rootScope.ZMOV_QUERY_HU_READ);
    $scope.Componentes = false;
    $scope.countVerifica = 0;
    $scope.countRealizado = 0;
    $scope.POP_DATA = true;
    $scope.clickearCheck = function (id) {
       /* var aux_esquinita = [false,''];
        if ($scope.dataTable.LT_DETALLE[id].Esquina) {
            if (!$scope.dataTable.LT_DETALLE[id].disable) {
                angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
                    if(v.Esquina){
                        if(v.chek){
                            aux_esquinita[0] = true;
                            aux_esquinita[1] = v.MATNR;
                        }
                    }
                })
                console.log(aux_esquinita);
                if(aux_esquinita[0]){
                    if(aux_esquinita[1] == $scope.dataTable.LT_DETALLE[id].MATNR){
                        $scope.dataTable.LT_DETALLE[id].img = "img/check.png";
                        $scope.dataTable.LT_DETALLE[id].chek = false;
                    }
                }else{
                    $scope.dataTable.LT_DETALLE[id].img = "img/x.png";
                    $scope.dataTable.LT_DETALLE[id].chek = true;
                }
            }

        } else {*/
            if (!$scope.dataTable.LT_DETALLE[id].disable) {
                if ($scope.dataTable.LT_DETALLE[id].chek) {
                    $scope.dataTable.LT_DETALLE[id].img = "img/check.png";
                    $scope.dataTable.LT_DETALLE[id].chek = false;
                } else {
                    $scope.dataTable.LT_DETALLE[id].img = "img/x.png";
                    $scope.dataTable.LT_DETALLE[id].chek = true;
                }
            }
       // }
    };
    $scope.Completo = '';
    var auxALT = $rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].VEGR4.replace('ALT', '');
    (auxALT < 97) ? $scope.Completo = 'X' : $scope.Completo = '';
    $scope.Pop_Up_Material = function () {
        if (!$scope.datosPallet.almacen) {
            $rootScope.alert.show({ message: "Favor agregar Almacen" });
            return;
        }
        $rootScope.loading.show();
        if ($rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].ZCONS_PALLET == 'X') {
            $rootScope.loading.hide();
            $scope.dataTable = { LT_DETALLE: [] };
            $scope.Componentes = true;
            $scope.POP_DATA = false;
        } else {
            $http({
                method: 'POST',
                url: IPSERVER + 'JSON_ZMOV_10020.aspx?IV_MATNR=' + $rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].MATNR + '&IV_WERKS=' + angular.uppercase($rootScope.userData.centro) + '&IV_HU_GRP4=' + $rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].VEGR4 + '&IV_TIP_PACKING=' + (($rootScope.userData.mail === 'recepcionPallet') ? 'S' : 'C'),
                headers: { 'Content-Type': 'text/xml; charset=utf-8' },
                processData: false,
                dataType: 'json',
            }).success(function (data) {
                $rootScope.loading.hide();
                console.log(data);
                if (data.LT_DETALLE.length > 0) {
                    $scope.POP_DATA = false;
                    $scope.dataTable = data;
                    angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
                        v.img = "img/check.png";
                        v.chek = false;
                        v.Esquina = false;
                        if ($scope.Completo !== 'X') {
                            v.disable = false;
                        } else {
                            v.disable = true;
                        }
                    })
                    angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
                        angular.forEach($scope.JSON_ESQUINERO, function (value, ley) {
                            if (value.MATNR == v.MATNR) {
                                v.Esquina = true;
                            }
                        })
                    })
                } else {
                    $rootScope.alert.show({ message: "Falta configurar lista 99, Componente Pallet" });
                }
            })
        }
    }
    $scope.aceptaPaletizarCajaEmbalada = function () {
        $scope.Pop_Up_Material();
        return;
        //document.getElementById('btnContinuar_').style.display = 'none';
        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
        $('#cargandoDatosSAP').show();
        $rootScope.mostrarRespuesta(true);
        // para enviar valor calculado,  lo que venia mas lo del usuario ocupar la funcion,!!
        //      angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
        //         $rootScope.datosPaletiza.manual[value.idx].CSPEM = Number(value.CSPEM) + Number(value.inLotePaletizar);
        //         $rootScope.datosPaletiza.manual[value.idx].inLotePaletizar = 0;
        //         });
        $scope.generaXML();
    }
    $scope.listarAlmacen = [{ DESCRIPTION: 'FR01', VALUE_CHAR: 'FR01' }];
    var arrCam = [];
    /*console.log($rootScope.JSON_ZMOV_QUERY_HU_ALMACEN);
    console.log($rootScope.datosPaletiza.manual);
    console.log($rootScope.ZMF_GET_USER);
    console.log($rootScope.ZMOV_QUERY_HU_READ);*/
    /* angular.forEach($rootScope.JSON_ZMOV_QUERY_HU_ALMACEN,function(value,key){
         if(value.XHUPF=="X" && $rootScope.datosPaletiza.manual[0].LGORT != value.LGORT){
             /*if(arrCam.indexOf(value.LGORT)===-1){
                 angular.forEach($rootScope.ZMF_GET_USER,function(value2,key){
                     if(value2.LGORT == value.LGORT){
                         $scope.listarAlmacen.push({DESCRIPTION:value.LGORT,VALUE_CHAR:value.LGORT});
                         arrCam.push(value.LGORT);
                     }
                 })
             }*/
    //if(arrCam.indexOf(value.LGORT)===-1){
    // angular.forEach($rootScope.ZMF_GET_USER,function(value2,key){
    // if(value2.LGORT == value.LGORT){
    //      $scope.listarAlmacen.push({DESCRIPTION:value.LGORT,VALUE_CHAR:value.LGORT});
    //    arrCam.push(value.LGORT);
    // }
    //})
    //      }
    //    }
    //  })
    $scope.Get_XML = function () {
        var item = new Date();
        var dato = '';
        var year = item.getFullYear().toString();
        var month = ((item.getMonth() + 1) < 10) ? '0' + (item.getMonth() + 1).toString() : (item.getMonth() + 1).toString();
        var day = (item.getDate() < 10) ? '0' + item.getDate().toString() : item.getDate().toString();
        //dato = day + '.' + month + '.' + year;
        dato = year + month + day;
        var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
                    <soapenv:Header/>\
                    <soapenv:Body>\
                    <tem:ZMOV_20032>\
                        <tem:datos>\
                            <tem:ALMACEN_HU>'+ $scope.datosPallet.almacen.VALUE_CHAR + '</tem:ALMACEN_HU>\
                            <tem:CENTRO_HU>'+ $rootScope.datosPaletiza.manual[0].WERKS + '</tem:CENTRO_HU>\
                            <tem:EXIDV_HU>\
                                <tem:ZMOV_20032_EXIDV_HU>\
                                    <tem:EXIDV>'+ $rootScope.datosPaletiza.numeroPallet + '</tem:EXIDV>\
                                </tem:ZMOV_20032_EXIDV_HU>\
                            </tem:EXIDV_HU>\
                            <tem:HEADER>\
                                <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>\
                                <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>\
                                <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>\
                                <tem:BSART>' + $rootScope.userData.clasePedido + '</tem:BSART>\
                                <tem:BUDAT>'+ dato + '</tem:BUDAT>\
                                <tem:LIFNR>'+ $rootScope.datosPaletiza.manual[0].PRODUCTOR_ET + '</tem:LIFNR>\
                                <tem:XBLNR>'+ $rootScope.datosPaletiza.manual[0].CHARG + '</tem:XBLNR>\
                                <tem:BKTXT>' + $rootScope.userData.usuario + '</tem:BKTXT>\
                            </tem:HEADER>\
                            <tem:HEADER_ADIC>\
                                <tem:TIP_PACKING>'+ (($rootScope.userData.mail === 'recepcionPallet') ? 'S' : 'C') + '</tem:TIP_PACKING>\
                                <tem:LGORT_TRASP>FR07</tem:LGORT_TRASP>\
                                <tem:STLAL_PALLET>99</tem:STLAL_PALLET>\
                            </tem:HEADER_ADIC>\
                            <tem:LT_ITEMS>\
                                <tem:ZMOV_20032_LT_ITEMS>\
                                <tem:STCK_TYPE></tem:STCK_TYPE>\
                                <tem:MATERIAL>'+ $rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].MATNR + '</tem:MATERIAL>\
                                <tem:QUANTITY>'+ $rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].VEMNG + '</tem:QUANTITY>\
                                <tem:PO_UNIT>'+ $rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].VEMEH + '</tem:PO_UNIT>\
                                <tem:HSDAT>'+ dato + '</tem:HSDAT>\
                                <tem:PLANT>'+ $rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].WERKS + '</tem:PLANT>\
                                <tem:STGE_LOC>PA02</tem:STGE_LOC>\
                                <tem:FREE_ITEM>X</tem:FREE_ITEM>\
                                <tem:ITEM_CAT>L</tem:ITEM_CAT>\
                                <tem:ACCTASSCAT>F</tem:ACCTASSCAT>\
                                <tem:ALMAC_TRASP></tem:ALMAC_TRASP>\
                                </tem:ZMOV_20032_LT_ITEMS>\
                            </tem:LT_ITEMS>\
                            <tem:LT_LOG></tem:LT_LOG>\
                            <tem:LT_LOG_HU></tem:LT_LOG_HU>\
                            <tem:LT_MATNR_PALLET>';
        angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
            if (v.img == 'img/x.png') {
                xml += '<tem:ZMOV_20032_LT_MATNR_PALLET>\
                                            <tem:MATNR>'+ v.MATNR + '</tem:MATNR>\
                                        </tem:ZMOV_20032_LT_MATNR_PALLET>';
            }
        })
        xml += '</tem:LT_MATNR_PALLET>\
                        </tem:datos>\
                    </tem:ZMOV_20032>\
                    </soapenv:Body>\
                </soapenv:Envelope>';
        xml = xml.split('>undefined<').join('><');
        console.log(xml);
        return xml;
    }
    $scope.Send_XML = function () {
        $rootScope.loading.show();
        $http({
            method: 'POST',
            url: IPSERVER + 'rfcNET.asmx?',
            headers: {
                'Content-Type': 'text/xml; charset=utf-8'
            },
            processData: false,
            dataType: 'xml',
            data: $scope.Get_XML()
        }).success(function (data) {
            $rootScope.loading.hide();
            $rootScope.httpRequest.successRedirect = 'menuPaletizar';
            console.log(data);
            var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
            console.log(print);
            $rootScope.mostrarRespuesta(true);
            var parser = new DOMParser();
            var docXml = parser.parseFromString(print, "text/xml");
            var jsonRespuesta = xml2json(docXml, '');
            var json = JSON.parse(jsonRespuesta);
            console.log(json);
            var E_MATERIALDOCUMENT_PALLET = "";
            try {
                if (docXml.getElementsByTagName("E_MATERIALDOCUMENT_PALLET")[0].firstChild != null && docXml.getElementsByTagName("E_MATERIALDOCUMENT_PALLET")[0].firstChild != undefined) {
                    E_MATERIALDOCUMENT_PALLET = docXml.getElementsByTagName("E_MATERIALDOCUMENT_PALLET")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var E_MBLNR_311_PALLET = "";
            try {
                if (docXml.getElementsByTagName("E_MBLNR_311_PALLET")[0].firstChild != null && docXml.getElementsByTagName("E_MBLNR_311_PALLET")[0].firstChild != undefined) {
                    E_MBLNR_311_PALLET = docXml.getElementsByTagName("E_MBLNR_311_PALLET")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var E_MBLNR_541_PALLET = "";
            try {
                if (docXml.getElementsByTagName("E_MBLNR_541_PALLET")[0].firstChild != null && docXml.getElementsByTagName("E_MBLNR_541_PALLET")[0].firstChild != undefined) {
                    E_MBLNR_541_PALLET = docXml.getElementsByTagName("E_MBLNR_541_PALLET")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var PEDIDO_PALLET = '';
            try {
                if (docXml.getElementsByTagName("PEDIDO_PALLET")[0].firstChild != null && docXml.getElementsByTagName("PEDIDO_PALLET")[0].firstChild != undefined) {
                    PEDIDO_PALLET = docXml.getElementsByTagName("PEDIDO_PALLET")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var MESSAGE = "";
            try {
                if (docXml.getElementsByTagName("MESSAGE")[0].firstChild != null && docXml.getElementsByTagName("MESSAGE")[0].firstChild != undefined) {
                    MESSAGE = docXml.getElementsByTagName("MESSAGE")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var messages = [];
            try {
                angular.forEach(json['soap:Envelope']['soap:Body'].ZMOV_20032Response.ZMOV_20032Result.LT_LOG.ZMOV_20032_LT_LOG, function (v, k) {
                    //(!isNaN(k))?document.getElementById('ERROR').innerHTML += '<h1>ERROR '+aux+': </h1><p>'+v.MESSAGE+'</p>':(k==='MESSAGE')?document.getElementById('ERROR').innerHTML += '<h1>ERROR : </h1><p>'+v+'</p>':'nada';
                    //  aux++;
                    //(!isNaN(k))?v.MESSAGE:(k=='MESSAGE')?v:''
                    messages.push((!isNaN(k)) ? v.MESSAGE : (k == 'MESSAGE') ? v : '');
                })
            } catch (e) { console.log(e) }
            var messagesHU = [];
            try {
                angular.forEach(json['soap:Envelope']['soap:Body'].ZMOV_20032Response.ZMOV_20032Result.LT_LOG_HU.ZMOV_20032_LT_LOG_HU, function (v, k) {
                    //(!isNaN(k))?document.getElementById('ERROR').innerHTML += '<h1>ERROR '+aux+': </h1><p>'+v.MESSAGE+'</p>':(k==='MESSAGE')?document.getElementById('ERROR').innerHTML += '<h1>ERROR : </h1><p>'+v+'</p>':'nada';
                    //  aux++;
                    //var algo = (!isNaN(k))?v.MESSAGE:(k==='MESSAGE')?v:'';
                    messagesHU.push((!isNaN(k)) ? v.MSGV1 : (k == 'MSGV1') ? v : '');
                })
            } catch (e) { console.log(e) }
            var mensaje = '<div class="contabilizar-text">';
            if ($rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].ZCONS_PALLET != 'X') {
                mensaje += '<h1>Pedido Pallet: </h1> <p>' + (PEDIDO_PALLET) + '</p>';
                mensaje += '<h1>Comp. Pallets Mov 541: </h1> <p>' + (E_MBLNR_541_PALLET) + '</p>';
                mensaje += '<h1>Consumo Comp. Pallet Mov 543: </h1> <p>' + (E_MATERIALDOCUMENT_PALLET) + '</p>';
                mensaje += '<h1>Traslado de Almacen Mov 311: </h1> <p>' + (E_MBLNR_311_PALLET) + '</p>';
            }
            if (messages.length > 0) {
                for (var i = 0; i < messages.length; i++) {
                    if (messages[i] != '') {
                        mensaje += '<h1>Mensaje ' + (i + 1) + ': </h1> <p>' + messages[i] + '</p>';
                    }
                }
            }
            if (messagesHU.length > 0) {
                for (var i = 0; i < messagesHU.length; i++) {
                    if (messagesHU[i] != '') {
                        mensaje += '<h1>Mensaje HU ' + (i + 1) + ': </h1> <p>' + messagesHU[i] + '</p>';
                    }
                }
            }
            //mensaje += '<h1>Mensaje: </h1> <p>' + + '</p>';
            mensaje += '<div></div><div></div> </div>';
            console.log(mensaje);
            document.getElementById('popRespuestaLotesPaking').innerHTML = mensaje;
            $rootScope.btnContinuar = "block";
            $('#cargandoPopLotesPaking').hide('fade');
            //$rootScope.alert.show({message:"Documento Material: "+(material.firstChild.nodeValue)+", Pedido: "+(pedido.firstChild.nodeValue)})
        }).error(function (data) {
            $rootScope.loading.hide();
            console.log(data);
        });
    }
    $scope.generaXML = function () {
        var jsonValidate = [
            { campo: "Almacen", value: $scope.datosPallet.almacen, type: "aSelect", index: "VALUE_CHAR" },
        ];
        if (!$rootScope.validaForm(jsonValidate)) return 0;
        $rootScope.httpRequest.successRedirect = "menuPaletizar";
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
                        <soapenv:Header/>\
                        <soapenv:Body>\
                                <tem:ZMOV_HU_MOVER>\
                                        <tem:datos>\
                                            <tem:ALMACEN>'+ $scope.datosPallet.almacen.VALUE_CHAR + '</tem:ALMACEN>\
                                            <tem:CENTRO>'+ $rootScope.userData.centro + '</tem:CENTRO>\
                                                <tem:EXIDV>\
                                                    <tem:ZMOV_HU_MOVER_EXIDV>\
                                                        <tem:EXIDV>'+ $rootScope.datosPaletiza.numeroPallet + '</tem:EXIDV>\
                                                    </tem:ZMOV_HU_MOVER_EXIDV>\
                                                </tem:EXIDV>\
                                        </tem:datos>\
                                </tem:ZMOV_HU_MOVER>\
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
            $rootScope.loading.hide();
            //console.log(data);
            var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
            console.log(print);
            $rootScope.mostrarRespuesta(true);
            var parser = new DOMParser();
            var docXml = parser.parseFromString(print, "text/xml");
            console.log(docXml.getElementsByTagName("MSGV1")[0].childNodes[0].textContent)
            var message = "";
            try {
                message = docXml.getElementsByTagName("MSGV1")[0].childNodes[0].textContent;
            } catch (e) {
                message = "NO HAY MENSAJE";
            }
            var mensaje = '<div class="contabilizar-text">';
            mensaje += '<h1>MSGV1: </h1> <p>' + (message) + '</p>';
            mensaje += '<div></div><div></div> </div>';
            console.log(mensaje);
            document.getElementById('popRespuestaLotesPaking').innerHTML = mensaje;
            $('#cargandoPopLotesPaking').hide('fade');
            $rootScope.btnContinuar = "block";
            //$rootScope.alert.show({message:"Documento Material: "+(material.firstChild.nodeValue)+", Pedido: "+(pedido.firstChild.nodeValue)})
        }).error(function (data) {
            $rootScope.loading.hide();
            console.log(data);
        });

    }
    $scope.redireccion = function () {
        $rootSocope.goToPage('menuPaletizar');
    }
    $scope.irMovimiento = function (mov) {
        console.log(mov);
        $rootScope.mostrarRespuesta(false);
    }
})
