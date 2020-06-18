//﻿angular.module('starter.controllersPaletizaje', [])

appExpled.lazyController('ctrStockAlmacen', function ($scope, $routeParams, $rootScope) {
    $('#StockAlmacen').addClass('animated ' + $routeParams.animacion);
    $rootScope.preloadMsg = "Procesando datos...";
    $rootScope.verLoading_(true, "Procesando datos...");
    $rootScope.preloadMsg = "Procesando datos...";
    $scope.ctrVerVentanaSelect = 0;
    $rootScope.datosPaletiza = {};
    $scope.idxP = 0;
    $scope.stockVisible = { selA: 'block', selO: 'none', selNC: 'none' };
    $scope.estadoTabSel = { ok: 'inactivo', obj: '', no: '' };
    //alert(2)
    $scope.agregaPalet = function (dato) {
            var css = '';
            var ESTADO_REC = ' ';
            switch (dato.ESTADO_REC) {
                case 'A':
                    css = 'ok';
                    ESTADO_REC = 'A';
                    break;
                case 'O':
                    css = 'obj';
                    ESTADO_REC = 'O';
                    break;
                case '':
                    css = 'sn';
                    ESTADO_REC = 'X';
                    break;
            }
            $rootScope.datosPaletiza.manual[$scope.idxP] = {
                idx: $scope.idxP,
                MATNR: dato.MATNR,//"FFA0303",
                WERKS: dato.WERKS,//"1050",
                LGORT: dato.LGORT,//"0001",
                CHARG: dato.CHARG,//"123",
                MEINS: dato.MEINS,//"CS",
                CLABS: dato.CLABS,//0,
                CINS: dato.CINS,//0,
                CSPEM: dato.CSPEM,//516,
                LIFNR: dato.LIFNR,//"0000007016",
                ESTADO_REC: 'A',//"" A O '',
                css:css,
                VARIEDAD: dato.VARIEDAD,
                CALIBRE: dato.CALIBRE
            }
            console.log($rootScope.datosPaletiza.manual[$scope.idxP]);
            $scope.idxP++;
        
    }
    $rootScope.datosPaletiza.HU_GRP1=[];
    $rootScope.datosPaletiza.HU_GRP2=[];
    $rootScope.datosPaletiza.HU_GRP3=[];
    $rootScope.datosPaletiza.HU_GRP4=[];
    $rootScope.datosPaletiza.HU_GRP5=[];

    $scope.cargarStockSelect = function () {
        var idxA = 0; $rootScope.datosPaletiza.selA = [];
        var idxO = 0; $rootScope.datosPaletiza.selO = [];
        var idxNC = 0; $rootScope.datosPaletiza.selNC = [];
        $rootScope.datosPaletiza.manual = [];
        //console.log($rootScope.ZMOV_QUERY_STOCK_ALMACEN);
        var cont = 0;
        angular.forEach($rootScope.ZMOV_QUERY_STOCK_ALMACEN2, function (value, key) {
            if(value.ESPECIE!==$rootScope.datosExportadora.especie.DESCRIPTION
               ||value.LGORT!=='A050'
               ||$rootScope.datoUsuario.centro!==value.WERKS
                    ){
                console.log(value);
                var data =[];
                $rootScope.datosPaletiza.selA[idxA]=[];
                data = {
                    idx: idxA,
                    MATNR: value.MATNR,
                    WERKS: value.WERKS,
                    LGORT: value.LGORT,
                    CHARG: value.CHARG,
                    MEINS: value.MEINS,
                    CLABS: value.CLABS,
                    CINS: value.CINS,
                    CSPEM: value.CSPEM,
                    LIFNR: value.LIFNR,
                    //ESTADO_REC: value.ESTADO_REC,
                    ESTADO_REC: 'A',
                    seleccionado: 'false',
                    VARIEDAD: value.VARIEDAD,
                    CALIBRE: value.CALIBRE
                };
                $rootScope.datosPaletiza.selA[idxA]= data;
                idxA++;
            }
        });
        $rootScope.verLoading_(false, "Procesando datos...");
    }
    $scope.cargarStockSelect();

    $scope.verVentanaSelect1 = function () {
        $('#btnAlamcenSelect').removeClass('inactivo');
        $('#VentanStock').hide();
        $('#VentanaSelect').removeClass('animated fadeOutLeft');
        $('#VentanaSelect').show();
        $('#VentanaSelect').addClass('animated fadeInLeft');
        $('#btnAlmacenStock').addClass('inactivo');
        $scope.ctrVerVentanaSelect = 0;
    }

    $scope.verVentanaSelect2 = function () {
        $('#btnAlmacenStock').removeClass('inactivo');
        $('#VentanaSelect').hide();
        $('#VentanStock').removeClass('animated fadeOutLeft');
        $('#VentanStock').show();
        $('#VentanStock').addClass('animated fadeInLeft');
        $('#btnAlamcenSelect').addClass('inactivo');
        $scope.ctrVerVentanaSelect = 1;

       // console.log($rootScope.datosPaletiza)

    }

    $scope.verVentanaSelect1();


    $scope.paletizajeIngreso = function () {
    //alert($scope.inSelLotesManual);
        var existe = 0;
        if (existe == 0) {
            var busqueda = 0;
            angular.forEach($rootScope.ZMOV_QUERY_STOCK_ALMACEN2, function (value, key) {
                if(//value.ESPECIE!==$rootScope.datosExportadora.especie.DESCRIPTION
                    value.LGORT!=='A050'
                    )return;
                if (angular.uppercase($scope.inSelLotesManual) == value.CHARG) {
                    $scope.agregaPalet(value);
                    busqueda = 1;
                }
            });
            if (busqueda == 0) {
                $rootScope.mostrarAlerta(true, 'Error', 'Lote:' + angular.uppercase($scope.inSelLotesManual) + ' no encontrado.');
            }
            $scope.inSelLotesManual = '';
        } else {
            $rootScope.mostrarAlerta(true, 'Advertencia', 'Lote:' + angular.uppercase($scope.inSelLotesManual) + ' ya se encuentra agregado.');
        }
    }

    $scope.selPaletizaQuitar = function (idx) {
        var auxidx = 0;
        $scope.datosPaletizaAux = [];
        $scope.datosPaletizaAux = $rootScope.datosPaletiza.manual;
        $scope.datosPaletiza.manual = [];
        $scope.idxP--;
        angular.forEach($scope.datosPaletizaAux, function (value, key) {
            if (idx != value.idx) {
                    var css = '';
                    switch (value.ESTADO_REC) {
                        case 'A':
                            css = 'ok';
                            break;
                        case 'O':
                            css = 'obj';
                            break;
                        case '':
                            css = 'sn';
                            break;
                    }
                    $rootScope.datosPaletiza.manual[auxidx] = {
                        idx: auxidx,
                        MATNR: value.MATNR,
                        WERKS: value.WERKS,
                        LGORT: value.LGORT,
                        CHARG: value.CHARG,
                        MEINS: value.MEINS,
                        CLABS: value.CLABS,
                        CINS: value.CINS,
                        CSPEM: value.CSPEM,
                        LIFNR: value.LIFNR,
                        ESTADO_REC: value.ESTADO_REC,
                        inLotePaletizar: value.inLotePaletizar
                    }
                auxidx++;
            }
        });

    }
    
    $scope.limpiarCargaScaner = function () {
        $rootScope.datosPaletiza.manual = []
        $scope.idxP = 0;
    }

    $scope.verAlmacenOk = function () {
        $scope.stockVisible = { selA: 'block', selO: 'none', selNC: 'none' };
        $scope.estadoTabSel = { ok: 'inactivo', obj: '', no: '' };
    }

    $scope.verAlmacenObj = function () {
        $scope.stockVisible = { selA: 'none', selO: 'block', selNC: 'none' };
        $scope.estadoTabSel = { ok: '', obj: 'inactivo', no: '' };
    }
    $scope.verAlmacenNC = function () {
        $scope.stockVisible = { selA: 'none', selO: 'none', selNC: 'block' };
        $scope.estadoTabSel = { ok: '', obj: '', no: 'inactivo' };
    }

    $scope.filtroPaletiza = "TODOS";
    $scope.filtroPaletiza = "";
    $scope.fCHARG="";    
    $scope.fLIFNR="";
    $scope.fVARIEDAD="";
    $scope.fCALIBRE="";
    $scope.fMATNR="";
    $scope.fLGORT="";
    $scope.fCLABS="";
    


    $scope.continuarPelatizaPaso2=function(){
        $scope.navegacionPagina('PROD_Contabilizar', 'fadeInRight', '');
        if ($scope.ctrVerVentanaSelect == 0) { // lote manuel
            if (($rootScope.datosPaletiza.manual.length == 0) || ($rootScope.datosPaletiza.manual == null)) {
                $rootScope.mostrarAlerta(true, 'Error', 'Ingrese a lo menos un lote');
                return 0;
            }
        }
        if ($scope.ctrVerVentanaSelect == 1) { // lote stock filtro
            var idx = 0;
            $rootScope.datosPaletiza.manual = [];
            angular.forEach($rootScope.datosPaletiza.selA, function (value, key) {
                if (value.seleccionado == true) {
                    $rootScope.datosPaletiza.manual[idx] = {
                        idx: idx,
                        MATNR: value.MATNR,
                        WERKS: value.WERKS,
                        LGORT: value.LGORT,
                        CHARG: value.CHARG,
                        MEINS: value.MEINS,
                        CLABS: value.CLABS,
                        CINS: value.CINS,
                        CSPEM: value.CSPEM,
                        LIFNR: value.LIFNR,
                        ESTADO_REC: value.ESTADO_REC,
                        seleccionado: true,
                        inLotePaletizar: 0,
                        VARIEDAD: value.VARIEDAD,
                        CALIBRE: value.CALIBRE
                    }
                    idx++;
                }
            });
            angular.forEach($rootScope.datosPaletiza.selO, function (value, key) {
                if (value.seleccionado == true) {
                    $rootScope.datosPaletiza.manual[idx] = {
                        idx: idx,
                        MATNR: value.MATNR,
                        WERKS: value.WERKS,
                        LGORT: value.LGORT,
                        CHARG: value.CHARG,
                        MEINS: value.MEINS,
                        CLABS: value.CLABS,
                        CINS: value.CINS,
                        CSPEM: value.CSPEM,
                        LIFNR: value.LIFNR,
                        ESTADO_REC: value.ESTADO_REC,
                        seleccionado: true,
                        inLotePaletizar: 0
                    }
                    idx++;
                }
            });
            angular.forEach($rootScope.datosPaletiza.selNC, function (value, key) {
                if (value.seleccionado == true) {
                    $rootScope.datosPaletiza.manual[idx] = {
                        idx: idx,
                        MATNR: value.MATNR,
                        WERKS: value.WERKS,
                        LGORT: value.LGORT,
                        CHARG: value.CHARG,
                        MEINS: value.MEINS,
                        CLABS: value.CLABS,
                        CINS: value.CINS,
                        CSPEM: value.CSPEM,
                        LIFNR: value.LIFNR,
                        ESTADO_REC: 'X',
                        seleccionado: true,
                        inLotePaletizar: 0
                    }
                    idx++;
                }
            });
            if (idx == 0) {
                $rootScope.mostrarAlerta(true, 'Error', 'Ingrese a lo menos un lote');
                return 0;
            }
        }
        $scope.navegacionPagina('PROD_Contabilizar', 'fadeInRight', '');

    }


        $scope.codearPalet = function () {
            cordova.plugins.barcodeScanner.scan(
            function (result) {
                //alert(result.text)
                document.getElementById('inSelLotesManual').value = result.text;
                $scope.inSelLotesManual = result.text;
                $scope.paletizajeIngreso('OK');
                $scope.$apply();
            },
            function (error) {
                $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
            }
          );
        }

})

appExpled.lazyController('ctrPROD_Contabilizar', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('#ctrPROD_Contabilizar').addClass('animated ' + $routeParams.animacion);
    //console.log($rootScope.datosPaletiza)

    $scope.contabilizarPaletizaNOK = 'none';
    $scope.contabilizarPaletizaOK = 'none';
    $scope.contabilizarPaletizaNC = 'none';

    $rootScope.datosPaletiza.CONTENT=[];
    $rootScope.datosPaletiza.HU_GRP1=[];
    $rootScope.datosPaletiza.HU_GRP2=[];
    $rootScope.datosPaletiza.HU_GRP3=[];
    $rootScope.datosPaletiza.HU_GRP4=[];
    $rootScope.datosPaletiza.HU_GRP5=[];
    // llenado list box del popup
    $scope.selPaletizaTipiPalletOpciones = [];
    angular.forEach($rootScope.HU_DICCIONARIO.CONTENIDO, function (value, key) {
        $scope.selPaletizaTipiPalletOpciones.push({ value: value.TIPO_HU, name: value.TIPO_HU })
    });
    $scope.selPaletizaOtrasCOpciones = [];
    angular.forEach($rootScope.HU_DICCIONARIO.HU_GRP5, function (value, key) {
        $scope.selPaletizaOtrasCOpciones.push({ value: value.VEGR5, name: value.BEZEI })
    });


    $scope.mostrarPaletizaje = function (estado) {
        if (estado == true) {
            $scope.verPopPaletiza = "block";
            $scope.verBtnFin = "none";
            $scope.selPaletizaTipiPallet = { value: '', name: '-Sin Info-' };
            $scope.selPaletizaOtrasC = { value: '', name: 'Ninguno' };
        } else {
            $scope.verPopPaletiza = "none";
            $scope.verBtnFin = "block";
        }
    }
    // estableser oculto
    $scope.mostrarPaletizaje(false);

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

    $scope.finalizar = function () {
        $scope.mostrarRespuesta(false);
        $scope.navegacionPagina('menuPaletizar', 'fadeInRight', '');
    }


    angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
        if (value.ESTADO_REC == 'A') { $scope.contabilizarPaletizaOK = 'block'; }
        if (value.ESTADO_REC == 'O') { $scope.contabilizarPaletizaNOK = 'block'; }
        if (value.ESTADO_REC == 'X') { $scope.contabilizarPaletizaNC = 'block'; }
    });


    $scope.paletizarCajaEmbalada = function (grupo) {
        $scope.mostrarPaletizaje(true);
        switch (grupo) {
            case 'OK':
                $scope.pop = { css: 'ok', titulo: 'LOTES CORRECTOS', filtro: 'A', selPaletizaAlmacen: 'block' };
                break;
            case 'NOK':
                $scope.pop = { css: 'obj', titulo: 'LOTES OBJETADOS', filtro: 'O', selPaletizaAlmacen: 'block' };
                break;
            case 'NC':
                $scope.pop = { css: 'sn', titulo: 'LOTES SIN CLASIFICAR', filtro: 'X', selPaletizaAlmacen: 'block' };
                break;
        }
        $scope.selPaletizaAlmacenIr = '';
        $scope.paletizaCajaNumeroPalet = '';
        $scope.selPaletizaTipiPallet = '';
        $scope.selPaletizaPCompleto = false;
        $scope.selPaletizaOtrasC = '';
    }


    $scope.countVerifica = 0;
    $scope.countRealizado = 0;

    $scope.aceptaPaletizarCajaEmbalada = function () {
        if ($scope.paletizaCajaNumeroPalet == '') {
            $rootScope.mostrarAlerta(true, 'Advertencia!', 'Ingrese número de pallet');
            return 0;
        }
        $scope.mostrarPaletizaje(false);
        $scope.generaXML();return;

        if ($rootScope.datoUsuario.idUsuario == "demo") {
            // stco OK
        } else {//$scope.pop.filtro
            // verificar stock disponible
            $scope.countVerifica = 0;
            $scope.countRealizado = 0;

            angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
                if (value.ESTADO_REC == $scope.pop.filtro) {
                    $scope.countVerifica++;
                }
            });

            angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
                if (value.ESTADO_REC == $scope.pop.filtro) {
                    var aux = $scope.verificaSaldo(value.CHARG, value.LGORT, value.idx);
                }


            });

        }
    }

    $scope.verificaSaldo = function (CHARG, LGORT, idx) {
        //console.log(CHARG +" -*- "+ LGORT)
        dataFactory.getDatos('STOCK_LOTES_TB', 'CHARG=' + CHARG + '&WERKS='+$rootScope.datoUsuario.acopio)
            .success(function (datos) {
                //console.log(datos.STOCK_MCHB.length)
                for (i = 0; i < datos.STOCK_MCHB.length; i++) {
                    if (datos.STOCK_MCHB[i].LGORT == LGORT) {
                        $rootScope.datosPaletiza.manual[idx].CLABS = datos.STOCK_MCHB[i].CLABS;
                        //??????????????????
                        $scope.estadoObteniendo();
                        return 0;
                    }
                }
            })
            .error(function (datos) {
                //$rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio:JSON_ZXPI_PRODUCTORES');
            })
    }
    $scope.totalCajas = 0;
    $scope.estadoObteniendo = function () {
        $scope.countRealizado++;
        //console.log($scope.countRealizado +'>='+ $scope.countVerifica)
        if ($scope.countRealizado >= $scope.countVerifica) {
            // se actualizaron todos los saldos de stock

           // console.log($rootScope.datosPaletiza.manual);

            var estado = 0;

            angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
                if (value.ESTADO_REC == $scope.pop.filtro) {
                    if (value.inLotePaletizar <= value.CLABS) {
                        //console.log("OK Si existen saldos en todos los lotes se procede envio XML");
                        //$scope.generaXML();
                    } else {
                        //console.log("ya no hay disponible");
                        estado = -1;
                    }

                }
            });

            if (estado == 0) {
                $scope.generaXML();
            } else {
                $scope.mostrarRespuesta(false);
                $rootScope.mostrarAlerta(true, 'Advertencia!', 'Ya no hay disponiblilidad de cajas en uno o mas lotes ingresados');
            }



        }
    }
$scope.sumarLote = function(){
    var total = 0;
    angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
        total += $rootScope.datosPaletiza.manual[value.idx].inLotePaletizar;
    })
    $scope.totalCajas = total;
}

    $scope.generaXML=function(){
         var jsonValidate=[
                {campo:"Codigo Pallet",value:$rootScope.datosPaletiza.HU_EXID,type:"input"},
            ];
        if(!$rootScope.validaForm(jsonValidate))return 0;
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_HU>';
        cadenaXML += '         <tem:datos><tem:HEADER_HU>';
        cadenaXML += '            <tem:PACK_MAT>'+$rootScope.datosPaletiza.PACK_MAT+'</tem:PACK_MAT>\
                                  <tem:HU_EXID>'+$rootScope.datosPaletiza.HU_EXID.toUpperCase()+'</tem:HU_EXID>\
                                  <tem:EXT_ID_HU_2>'+$rootScope.datosPaletiza.EXT_ID_HU_2+'</tem:EXT_ID_HU_2>\
                                  <tem:CONTENT>'+$rootScope.datosPaletiza.CONTENT.INHALT+'</tem:CONTENT>\
                                  <tem:PACK_MAT_CUSTOMER>'+$rootScope.datosPaletiza.PACK_MAT_CUSTOMER+'</tem:PACK_MAT_CUSTOMER>\
                                  <tem:PACKAGE_CAT>'+$rootScope.datosPaletiza.PACKAGE_CAT+'</tem:PACKAGE_CAT>\
                                  <tem:KZGVH>'+$rootScope.datosPaletiza.KZGVH+'</tem:KZGVH>\
                                  <tem:HU_GRP1>'+$rootScope.datosPaletiza.HU_GRP1+'</tem:HU_GRP1>\
                                  <tem:HU_GRP2>'+$rootScope.datosPaletiza.HU_GRP2.VEGR2+'</tem:HU_GRP2>\
                                  <tem:HU_GRP3>'+$rootScope.datosPaletiza.HU_GRP3.VEGR3+'</tem:HU_GRP3>\
                                  <tem:HU_GRP4>'+$rootScope.datosPaletiza.HU_GRP4.VEGR4+'</tem:HU_GRP4>\
                                  <tem:HU_GRP5>'+$rootScope.datosPaletiza.HU_GRP5.VEGR5+'</tem:HU_GRP5>\
                                  <tem:LGORT_DS>A060</tem:LGORT_DS></tem:HEADER_HU>\
                                  ';
        cadenaXML += '            <tem:ITEM_HU>';
        //               <!--Zero or more repetitions:-->
        console.log($rootScope);
        var ValidaCanCaja = true;

        angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {

            if ($rootScope.varificaCero($rootScope.datosPaletiza.manual[value.idx].inLotePaletizar) > 0) {
                cadenaXML += '               <tem:ZMOV_CREATE_HU_ITEM_HU>';
                cadenaXML += '                  <tem:HU_ITEM_TYPE>1</tem:HU_ITEM_TYPE>\
                                                <tem:PACK_QTY>'+$rootScope.datosPaletiza.manual[value.idx].inLotePaletizar+'</tem:PACK_QTY>\
                                                <tem:BASE_UNIT_QTY></tem:BASE_UNIT_QTY>\
                                                <tem:MATERIAL>'+$rootScope.datosPaletiza.manual[value.idx].MATNR+'</tem:MATERIAL>\
                                                <tem:BATCH>'+$rootScope.datosPaletiza.manual[value.idx].CHARG+'</tem:BATCH>\
                                                <tem:PLANT>'+$rootScope.datoUsuario.PLANT+'</tem:PLANT>\
                                                <tem:STGE_LOC>'+$rootScope.datosPaletiza.manual[value.idx].LGORT+'</tem:STGE_LOC>\
                                                <tem:STOCK_CAT></tem:STOCK_CAT>\
                                             </tem:ZMOV_CREATE_HU_ITEM_HU>';
            }
            if ($rootScope.datosPaletiza.manual[value.idx].CLABS < $rootScope.datosPaletiza.manual[value.idx].inLotePaletizar && ValidaCanCaja == true) {
                $rootScope.mostrarAlerta(true, 'Advertencia!', 'La paletización no debe ser mayor a las cajas');
                ValidaCanCaja = false;
            }

        });
        if (ValidaCanCaja == false) {
                    return 0;
                }


        cadenaXML += '            </tem:ITEM_HU>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_HU>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML =cadenaXML.split('>undefined<').join('><')
        console.log(cadenaXML)

        var jsonXmlNodes=[
            {node:"HUKEY",h1:"Respuesta HUKEY"},
            {node:"MESSAGE",h1:"ERROR"},
         ];
	   $rootScope.sendDataService2(cadenaXML,$rootScope,$scope,jsonXmlNodes,dataFactory);
    }

    $scope.irMovimiento = function(mov){
       $scope.navegacionPagina('menuPaletizar', 'fadeInLeft', '');
       $scope.mostrarRespuesta(false);
    }

    $scope.codearPalet = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)
            document.getElementById('paletizaCajaNumeroPalet').value = result.text;
            $scope.datosPaletiza.HU_EXID = result.text;
            $scope.$apply();
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }

})