
starter.lazyController('ctrQuitarPallet_cod', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('#QuitarPallet_cod').addClass('animated ' + $routeParams.animacion);
    $rootScope.blockReEnvio = 0;

    $scope.buscarPallet = function () {
        
        if (($scope.numeroPallet == "") || ($scope.numeroPallet == null)) {
            
            $scope.navegacionPagina('QuitarPallet_Pallet', 'fadeInRight', '')
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
            if($rootScope.ZMOV_QUERY_HU_READ.HUHEADER[0]!==undefined&&$rootScope.ZMOV_QUERY_HU_READ.HUHEADER[0].HU_EXID.toUpperCase()==$scope.numeroPallet.toUpperCase())
                $scope.navegacionPagina('QuitarPallet_Pallet', 'fadeInRight', '');
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
starter.lazyController('ctrQuitarPallet_Pallet', function ($scope, $routeParams, $rootScope, dataFactory) {
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
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_HU_UNPACK>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HUKEY>' + angular.uppercase($rootScope.datosPaletiza.numeroPallet) + '</tem:HUKEY>';
        cadenaXML += '            <tem:IT_ITEMUNPACK>';
        //               <!--Zero or more repetitions:-->
        var ValiQuitar = true;
        angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
            if ($rootScope.varificaCero($rootScope.datosPaletiza.manual[value.idx].inLotePaletizar) > 0) {
                cadenaXML += '               <tem:ZMOV_CREATE_HU_UNPACK_IT_ITEMUNPACK>';
                cadenaXML += '                  <tem:HU_ITEM_TYPE>1</tem:HU_ITEM_TYPE>';
                cadenaXML += '                  <tem:HU_ITEM_NUMBER>'+value.OBJ_ITEM_NUMBER+'</tem:HU_ITEM_NUMBER>';
                //cadenaXML += '                  <tem:LOWER_LEVEL_EXID></tem:LOWER_LEVEL_EXID>';
                cadenaXML += '                  <tem:UNPACK_EXID></tem:UNPACK_EXID>';
                cadenaXML += '                  <tem:PACK_QTY>' + $rootScope.varificaCero($rootScope.datosPaletiza.manual[value.idx].inLotePaletizar) + '</tem:PACK_QTY>';
                cadenaXML += '                  <tem:BASE_UNIT_QTY_ISO></tem:BASE_UNIT_QTY_ISO>';
                //cadenaXML += '                  <tem:BASE_UNIT_QTY>' + value.MEINS + '</tem:BASE_UNIT_QTY>';
                cadenaXML += '                  <tem:BASE_UNIT_QTY></tem:BASE_UNIT_QTY>';
                //cadenaXML += '                  <tem:NUMBER_PACK_MAT>0</tem:NUMBER_PACK_MAT>';
                //cadenaXML += '                  <tem:FLAG_SUPLMT_ITEM></tem:FLAG_SUPLMT_ITEM>';
                //cadenaXML += '                  <tem:MATERIAL>' + value.MATNR + '</tem:MATERIAL>';
                cadenaXML += '                  <tem:MATERIAL></tem:MATERIAL>';
                cadenaXML += '                  <tem:BATCH>' + value.CHARG + '</tem:BATCH>';
                //cadenaXML += '                  <tem:PLANT>' + value.WERKS + '</tem:PLANT>';
                cadenaXML += '                  <tem:PLANT>'+$rootScope.datoUsuario.PLANT+'</tem:PLANT>';
                ///cadenaXML += '                  <tem:STGE_LOC>' + value.LGORT + '</tem:STGE_LOC>';
                cadenaXML += '                  <tem:STGE_LOC></tem:STGE_LOC>';
                cadenaXML += '                  <tem:STOCK_CAT></tem:STOCK_CAT>';
                cadenaXML += '                  <tem:SPEC_STOCK></tem:SPEC_STOCK>';
                cadenaXML += '                  <tem:SP_STCK_NO></tem:SP_STCK_NO>';
                cadenaXML += '                  <tem:MATERIAL_PARTNER></tem:MATERIAL_PARTNER>';
                cadenaXML += '                  <tem:EXPIRYDATE></tem:EXPIRYDATE>';
                cadenaXML += '                  <tem:GR_DATE></tem:GR_DATE>';
                cadenaXML += '                  <tem:MATERIAL_EXTERNAL></tem:MATERIAL_EXTERNAL>';
                cadenaXML += '                  <tem:MATERIAL_GUID></tem:MATERIAL_GUID>';
                cadenaXML += '                  <tem:MATERIAL_VERSION></tem:MATERIAL_VERSION>';
                cadenaXML += '               </tem:ZMOV_CREATE_HU_UNPACK_IT_ITEMUNPACK>';
            }  
            if($rootScope.datosPaletiza.manual[value.idx].inLotePaletizar > $rootScope.datosPaletiza.manual[value.idx].VEMNG && ValiQuitar == true ){
                ValiQuitar = false;
                 $rootScope.mostrarAlerta(true, 'Advertencia!', 'No puede quitar más que el Stock');
            }
        });
        if(ValiQuitar == false){
            return 0;
            
        }

        cadenaXML += '            </tem:IT_ITEMUNPACK>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_HU_UNPACK>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML)
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);
         var jsonXmlNodes=[
            {node:"MATERIALDOCUMENT",h1:"Material Document"},
            {node:"MATERIALDOCUMENT_BD",h1:"Material Document BD"},
            {node:"MESSAGE_V1",h1:"MESSAGE_V1"},
            {node:"MESSAGE",h1:"Message"}
         ];
        $rootScope.sendDataService(cadenaXML,$rootScope,$scope,jsonXmlNodes,dataFactory);

    }
    $scope.irMovimiento = function(mov){
           $scope.mostrarRespuesta(false); 
        }

})
