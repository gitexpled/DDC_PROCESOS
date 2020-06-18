
starter.lazyController('ctrMoverPallet_cod', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('#QuitarPallet_cod').addClass('animated ' + $routeParams.animacion);
    $rootScope.blockReEnvio = 0;

    $scope.buscarPallet = function () {
        
        if (($scope.numeroPallet == "") || ($scope.numeroPallet == null)) {
            
            //$scope.navegacionPagina('QuitarPallet_Pallet', 'fadeInRight', '')
            $rootScope.mostrarAlerta(true, 'Advertencia!', 'Ingrese número de pallet');
            return 0;
        }
        //while($scope.numeroPallet.length<=20){$scope.numeroPallet='0'+$scope.numeroPallet;}
        $rootScope.verLoading_(true, "Obteniendo información del pallet");
        document.getElementById('preloadMsg').innerHTML = "Obteniendo información del pallet";
        
        $rootScope.ZMOV_QUERY_HU_READ=[];
        dataFactory.getDatos('ZMOV_QUERY_HU_READ','HUKEY='+$scope.numeroPallet.toUpperCase())
       .success(function (datos) {
            console.log(datos)
            $rootScope.verLoading_(false, "");
            $rootScope.ZMOV_QUERY_HU_READ=datos;
            $rootScope.datosPaletiza.HUKEY=$scope.numeroPallet.toUpperCase();
            $rootScope.datosPaletiza.existente=datos;
            $rootScope.datosPaletiza.numeroPallet=$scope.numeroPallet.toUpperCase();
            if($rootScope.ZMOV_QUERY_HU_READ.HUHEADER[0]!==undefined&&$rootScope.ZMOV_QUERY_HU_READ.HUHEADER[0].HU_EXID.toUpperCase()==$scope.numeroPallet.toUpperCase()||$scope.numeroPallet=="asd")
                $scope.navegacionPagina('MoverPallet_Pallet', 'fadeInRight', '');
            else {
                $rootScope.mostrarAlerta(true, 'Error', 'Codigo de Pallet no registrado');
                }
           //console.log("Obtiene variedades OK:");
           //$scope.preloadMsg = $scope.preloadMsg+ "<br>Obtiene variedades OK";
           //document.getElementById('preloadMsg').innerHTML = document.getElementById('preloadMsg').innerHTML + "<br>JSON_ZMOV_QUERY_HU_READ OK";
           //listarProductores(); >>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<
           //console.log($rootScope.ZMOV_QUERY_VARIEDAD)
       })
       .error(function (datos) {
           $rootScope.verLoading_(false, "");
           $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio: ZMOV_QUERY_HU_READ');
       })
    }

    $scope.codearPalet = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('numeroPallet').value = result.text;
            $scope.numeroPallet = result.text;
            $scope.buscarPallet();
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }

})
starter.lazyController('ctrMoverPallet_Pallet', function ($scope, $routeParams, $rootScope, dataFactory) {
    //console.log($rootScope.datosPaletiza.existente)
    $('#QuitarPallet_Pallet').addClass('animated ' + $routeParams.animacion);
    $rootScope.antiRefrescar();
    /*$scope.HU_EXID = ($rootScope.datosPaletiza.existente.HUHEADER[0].HU_EXID);
    if ($rootScope.datosPaletiza.existente.HUHEADER[0].CLOSED_BOX == 'X') {
        $scope.CLOSED_BOX = 'SI';
    } else {
        $scope.CLOSED_BOX = 'NO';
    }

    if ($rootScope.datosPaletiza.existente.HUHEADER[0].STGE_LOC == '') {
        $scope.STGE_LOC = '----';
    } else {
        $scope.STGE_LOC = $rootScope.datosPaletiza.existente.HUHEADER[0].STGE_LOC;
    }

    if ($rootScope.datosPaletiza.existente.HUHEADER[0].CONTENT == '') {
        $scope.CONTENT = '----';
    } else {
        $scope.CONTENT = $rootScope.datosPaletiza.existente.HUHEADER[0].CONTENT;
    }

    if ($rootScope.datosPaletiza.existente.HUHEADER[0].STGE_LOC == '') {
        $scope.STGE_LOC = '----';
    } else {
        $scope.STGE_LOC = $rootScope.datosPaletiza.existente.HUHEADER[0].STGE_LOC;
    }

    if ($rootScope.datosPaletiza.existente.HUHEADER[0].HU_GRP5 == '') {
        $scope.HU_GRP5 = '----';
    } else {
        angular.forEach($rootScope.HU_DICCIONARIO.HU_GRP5, function (value, key) {
            if (value.VEGR5 == $rootScope.datosPaletiza.existente.HUHEADER[0].HU_GRP5) {
                $scope.HU_GRP5 = value.BEZEI;
            }
        });
    }*/
    $scope.listarBandasPorCamara = function(){
        console.log($scope.datosCamara.VEGR5_CAMARA);
        $scope.listarBanda = [];
        angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.CAMBAND,function(value,key){
            if($scope.datosCamara.VEGR5_CAMARA ==value.VEGR5_CAMARA){
                $scope.listarBanda.push({DESCRIPTION:value.VEGR5_BANDA,VALUE_CHAR:value.VEGR5_BANDA});
            }
        })
        console.log($scope.listarBanda);
    }
    
    $scope.limpiaDatos = function () {
            var idx = 0;
            $rootScope.datosPaletiza.manual = [];
            angular.forEach($rootScope.ZMOV_QUERY_HU_READ.HUITEM, function (value, key) {
                //if(value.EXIDV!==$rootScope.datosPaletiza.HUKEY)return;
                //var OBJ_ITEM_NUMBER;
                /*angular.forEach($rootScope.ZMOV_QUERY_HU_READ.HUITEM, function (valueHU, keyHU) {
                    if(value.CHARG===value.BATCH)
                    OBJ_ITEM_NUMBER=valueHU.OBJ_ITEM_NUMBER;
                });*/
                $rootScope.datosPaletiza.manual[idx] = {
                    idx: idx,
                    MATNR: value.MATERIAL,
                    WERKS: value.WERKS,
                    LGORT: value.STGE_LOC,
                    CHARG: value.BATCH,
                    MEINS: value.MEINS,
                    CLABS: value.CLABS,
                    CINS: value.CINS,
                    CSPEM: value.CSPEM,
                    LIFNR: value.LIFNR,
                    ESTADO_REC: value.ESTADO_REC,
                    VEMNG: value.PACK_QTY,
                    seleccionado: 'false',
                    inLotePaletizar: 0,
                    OBJ_ITEM_NUMBER:value.OBJ_ITEM_NUMBER
                }
                    idx++;
            });
            $rootScope.verLoading_(false, "");
    }
    $scope.limpiaDatos();


    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
            //$scope.verBtnFin = "none";
        } else {
            $scope.verPopRespuesta = "none";
            //$scope.verBtnFin = "block";
        }
    }
    // estableser oculto
    $scope.mostrarRespuesta(false);

    $scope.countVerifica = 0;
    $scope.countRealizado = 0;

    $scope.aceptaPaletizarCajaEmbalada = function () {
        //document.getElementById('btnContinuar_').style.display = 'none';
        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
        $('#cargandoDatosSAP').show();
        $scope.mostrarRespuesta(true);
        // para enviar valor calculado,  lo que venia mas lo del usuario ocupar la funcion,!!
        //      angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
        //         $rootScope.datosPaletiza.manual[value.idx].CSPEM = Number(value.CSPEM) + Number(value.inLotePaletizar);
        //         $rootScope.datosPaletiza.manual[value.idx].inLotePaletizar = 0;
        //         });
           $scope.generaXML();
    }

    $scope.generaXML = function () {
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
                        <soapenv:Header/>\
                        <soapenv:Body>\
                                <tem:ZMOV_UPDATE_HU_CABECERA>\
                                        <tem:datos>\
                                                <tem:HUCHANGED>\
                                                        <tem:EXT_ID_HU_2></tem:EXT_ID_HU_2>\
                                                        <tem:CONTENT></tem:CONTENT>\
                                                        <tem:PACK_MAT_CUSTOMER></tem:PACK_MAT_CUSTOMER>\
                                                        <tem:PACKAGE_CAT></tem:PACKAGE_CAT>\
                                                        <tem:KZGVH></tem:KZGVH>\
                                                        <tem:HU_GRP1></tem:HU_GRP1>\
                                                        <tem:HU_GRP2></tem:HU_GRP2>\
                                                        <tem:HU_GRP3></tem:HU_GRP3>\
                                                        <tem:HU_GRP4></tem:HU_GRP4>\
                                                        <tem:HU_GRP5>'+$rootScope.datosPaletiza.HU_GRP5.VEGR5+'</tem:HU_GRP5>\
                                                </tem:HUCHANGED>\
                                                <tem:HUKEY>'+$rootScope.datosPaletiza.HUKEY+'</tem:HUKEY>\
                                        </tem:datos>\
                                </tem:ZMOV_UPDATE_HU_CABECERA>\
                            </soapenv:Body>\
                    </soapenv:Envelope>';
        
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML)
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);
         var jsonXmlNodes=[
            //{node:"MATERIALDOCUMENT",h1:"Material Document"},
            //{node:"MATERIALDOCUMENT_BD",h1:"Material Document BD"},
            {node:"E",h1:"Error", noDataDisplay:"Movimiento sin errores"},
            {node:"RETURN",h1:"Respuesta", noDataDisplay:"Movimiento sin errores"},
            {node:"MESSAGE",h1:"Message"}
         ];
        $rootScope.sendDataService(cadenaXML,$rootScope,$scope,jsonXmlNodes,dataFactory);

    }
    $scope.irMovimiento = function(mov){
           $scope.mostrarRespuesta(false); 
        }

})
