//﻿angular.module('starter.controllersPaletizaje', [])

starter.lazyController('ctrAumentarDigitar', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('#aumentarDigitar').addClass('animated ' + $routeParams.animacion);
    $rootScope.blockReEnvio = 0;

    $scope.buscarPallet = function () {
        
        if (($scope.numeroPallet == "") || ($scope.numeroPallet == null)) {
            
            $scope.navegacionPagina('aumentarLotes', 'fadeInRight', '')
            $rootScope.mostrarAlerta(true, 'Advertencia!', 'Ingrese número de pallet');
            return 0;
        }
        //while($scope.numeroPallet.length<=20){$scope.numeroPallet='0'+$scope.numeroPallet;}
        $rootScope.verLoading_(true, "Obteniendo información del pallet");
        document.getElementById('preloadMsg').innerHTML = "Obteniendo información del pallet";
        
        $rootScope.ZMOV_QUERY_HU_READ=[];
        dataFactory.getDatos('ZMOV_QUERY_HU_READ','HUKEY='+$scope.numeroPallet.toUpperCase())
       .success(function (datos) {
            $rootScope.verLoading_(false, "");
            $rootScope.ZMOV_QUERY_HU_READ=datos;
            $rootScope.datosPaletiza.HUKEY=$scope.numeroPallet.toUpperCase();
            $rootScope.datosPaletiza.existente=datos;
            $rootScope.datosPaletiza.numeroPallet=$scope.numeroPallet.toUpperCase();
            if($rootScope.ZMOV_QUERY_HU_READ.HUHEADER[0]!==undefined&&$rootScope.ZMOV_QUERY_HU_READ.HUHEADER[0].HU_EXID.toUpperCase()==$scope.numeroPallet.toUpperCase())
                $scope.navegacionPagina('aumentarLotes', 'fadeInRight', '');
            else{
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

starter.lazyController('ctrAumentarLotes', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('#AumentaPallet_Pallet').addClass('animated ' + $routeParams.animacion);
    $rootScope.preloadMsg = "Procesando datos...";
    $rootScope.verLoading_(true, "Procesando datos...");
    $rootScope.preloadMsg = "Procesando datos...";
    //document.getElementById('preloadMsg') = "Obteniendo datos...";
    $scope.ctrVerVentanaSelect = 0;
    //$rootScope.datosPaletiza = {};
    $scope.idxP = 0;
    $scope.stockVisible = { selA: 'block', selO: 'none', selNC: 'none' };
    $scope.estadoTabSel = { ok: 'inactivo', obj: '', no: '' };


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

    if ($rootScope.datosPaletiza.existente.HUHEADER[0].HU_GRP5 == '') {
        $scope.HU_GRP5 = '----';
    } else {
        angular.forEach($rootScope.HU_DICCIONARIO.HU_GRP5, function (value, key) {
            if (value.VEGR5 == $rootScope.datosPaletiza.existente.HUHEADER[0].HU_GRP5) {
                $scope.HU_GRP5 = value.BEZEI;
            }
        });
    }*/





    $scope.agregaPalet = function (dato) {
        var css = '';
        var ESTADO_REC = ' ';
        switch (dato.ESTADO_REC) {
            case 'A':
                css = 'ok';
                ESTADO_REC='A';
                break;
            case 'O':
                css = 'obj';
                ESTADO_REC='O';
                break;
            case '':
                css = 'sn';
                ESTADO_REC='X';
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
            CALIBRE: dato.CALIBRE,
            CINS: dato.CINS,//0,
            CSPEM: dato.CSPEM,//516,
            LIFNR: dato.LIFNR,//"0000007016",
            ESTADO_REC: 'A',//"" A O '',
            css: css
        }
        $scope.idxP++;

    }

    $scope.cargarStockSelect = function () {
        var idxA = 0; $rootScope.datosPaletiza.selA = [];
        var idxO = 0; $rootScope.datosPaletiza.selO = [];
        var idxNC = 0; $rootScope.datosPaletiza.selNC = [];
        $rootScope.datosPaletiza.manual = [];
        //console.log($rootScope.ZMOV_QUERY_STOCK_HU)
        //angular.forEach($rootScope.ZMOV_QUERY_STOCK_HU.STOCKHU, function (value, key) {
        angular.forEach($rootScope.ZMOV_QUERY_STOCK_ALMACEN, function (value, key) {
            //if(value.EXIDV!==$rootScope.datosPaletiza.HUKEY)return;
            if(value.ESPECIE!==$rootScope.datosExportadora.especie.DESCRIPTION
               //|| value.LIFNR!=$rootScope.datosExportadora.exportadora.VALUE_CHAR  
               ||value.LGORT!=='A050'
               ||$rootScope.datoUsuario.centro!==value.WERKS
               //||value.XHUPF==='X'
                    )return;//console.log(value);
            if ('A' == value.ESTADO_REC || 1==1) {
                $rootScope.datosPaletiza.selA[idxA] = {
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
                    ESTADO_REC: value.ESTADO_REC,
                    seleccionado: 'false'
                };
                idxA++;
            }
            if ('O' == value.ESTADO_REC || 1==1) {
                $rootScope.datosPaletiza.selO[idxO] = {
                    idx: idxO,
                    MATNR: value.MATNR,
                    WERKS: value.WERKS,
                    LGORT: value.LGORT,
                    CHARG: value.CHARG,
                    MEINS: value.MEINS,
                    CLABS: value.CLABS,
                    CALIBRE: value.CALIBRE,
                    CINS: value.CINS,
                    CSPEM: value.CSPEM,
                    LIFNR: value.LIFNR,
                    ESTADO_REC: value.ESTADO_REC,
                    seleccionado: 'false'
                }
                idxO++;
            }
            if ('' == value.ESTADO_REC|| 1==1) {
                $rootScope.datosPaletiza.selNC[idxNC] = {
                    idx: idxNC,
                    MATNR: value.MATNR,
                    WERKS: value.WERKS,
                    LGORT: value.LGORT,
                    CHARG: value.CHARG,
                    MEINS: value.MEINS,
                    CLABS: value.CLABS,
                    CINS: value.CINS,
                    CSPEM: value.CSPEM,
                    CALIBRE: value.CALIBRE,
                    LIFNR: value.LIFNR,
                    ESTADO_REC: value.ESTADO_REC,
                    seleccionado: false
                }
                idxNC++;
            }
        });
        $rootScope.verLoading_(false, "");
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

        //console.log($rootScope.datosPaletiza)

    }

    $scope.verVentanaSelect1();


    $scope.paletizajeIngreso = function () {
        var existe = 0;
        angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
            if (angular.uppercase($scope.inSelLotesManual) == value.CHARG) {
                existe = 1
            }
        });

        if (existe == 0) {
            var busqueda = 0;
            angular.forEach($rootScope.ZMOV_QUERY_STOCK_ALMACEN, function (value, key) {
                 if(value.ESPECIE!==$rootScope.datosExportadora.especie.DESCRIPTION
                    //|| value.LIFNR!=$rootScope.datosExportadora.exportadora.VALUE_CHAR  
                    ||value.LGORT!=='A050'
                    //||value.XHUPF==='X'
                         )return;//console.log(value);
                if ($scope.inSelLotesManual.toUpperCase() == value.CHARG.toUpperCase()) {
                    $scope.agregaPalet(value);
                    busqueda = 1;
                }
            });
            if (busqueda == 0) {
                $rootScope.mostrarAlerta(true, 'Error', 'Lote:' + angular.uppercase($scope.inSelLotesManual) + ' no encontrado.');
            }
            $scope.inSelLotesManual = '';
        } else {
            $rootScope.mostrarAlerta(true, 'Advertencia', 'Lote:' + angular.uppercase($scope.inSelLotesManual) + ' ta se encuentra agregado.');
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
                    CALIBRE: value.CALIBRE,
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
    


    $scope.continuarPelatizaPaso2 = function () {
        if ($scope.ctrVerVentanaSelect == 0) { // lote manuel
            //console.log($rootScope.datosPaletiza.manual)
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
                        CALIBRE: value.CALIBRE,
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
            angular.forEach($rootScope.datosPaletiza.selO, function (value, key) {
                if (value.seleccionado == true) {
                    $rootScope.datosPaletiza.manual[idx] = {
                        idx: idx,
                        MATNR: value.MATNR,
                        WERKS: value.WERKS,
                        LGORT: value.LGORT,
                        CHARG: value.CHARG,
                        CALIBRE: value.CALIBRE,
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
                        CALIBRE: value.CALIBRE,
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
        $scope.navegacionPagina('aumentarCajas', 'fadeInRight', '');

    }

    $scope.codearPalet = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('inSelLotesManual').value = result.text;
            $scope.inSelLotesManual = result.text;
            $scope.paletizajeIngreso();
            $("#btnAlamcenSelect").click();
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }

})

starter.lazyController('ctrAumentarCajas', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('#AumentaPallet_Digitar').addClass('animated ' + $routeParams.animacion);
    $rootScope.antiRefrescar();
    $scope.HU_EXID = ($rootScope.datosPaletiza.existente.HUHEADER[0].HU_EXID);
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

    if ($rootScope.datosPaletiza.existente.HUHEADER[0].HU_GRP5 == '') {
        $scope.HU_GRP5 = '----';
    } else {
        angular.forEach($rootScope.HU_DICCIONARIO.HU_GRP5, function (value, key) {
            if (value.VEGR5 == $rootScope.datosPaletiza.existente.HUHEADER[0].HU_GRP5) {
                $scope.HU_GRP5 = value.BEZEI;
            }
        });
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
    // estableser oculto
    $scope.mostrarRespuesta(false);

    $scope.countVerifica = 0;
    $scope.countRealizado = 0;

    $scope.aceptaPaletizarCajaEmbalada = function () {
        //document.getElementById('btnContinuar_').style.display = 'none';
        document.getElementById('popRespuestaEnvioFumigacion').innerHTML = '';
        $('#PROD_EnvioFumigacion').show();
        $scope.mostrarRespuesta(true);
        if ($rootScope.datoUsuario.idUsuario == "demo") {
            // stco OK
        } else {//$scope.pop.filtro
            // verificar stock disponible
            $scope.countVerifica = 0;
            $scope.countRealizado = 0;

            angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
                $scope.countVerifica++;
                //console.log($scope.countVerifica)
            });

            angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
                    var aux = $scope.verificaSaldo(value.CHARG, value.LGORT, value.idx);
            });

        }
    }

    $scope.verificaSaldo = function (CHARG, LGORT, idx) {
        //console.log(CHARG + " -*- " + LGORT)
        dataFactory.getDatos('ZMOV_QUERY_STOCK_ALMACEN', 'CHARG=' + CHARG + '&WERKS=' + $rootScope.datoUsuario.acopio)
            .success(function (datos) {
                //console.log(datos.STOCK_MCHB.length)
                for (i = 0; i < datos.STOCK_MCHB.length; i++) {
                    if (datos.STOCK_MCHB[i].LGORT == LGORT) {
                        $rootScope.datosPaletiza.manual[idx].CSPEM = datos.STOCK_MCHB[i].CSPEM;
                        //console.log(datos.STOCK_MCHB[i].CSPEM)
                        $scope.estadoObteniendo();
                        return 0;
                    }
                }
            })
            .error(function (datos) {
                $scope.mostrarRespuesta(false);
                $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio:ZMOV_QUERY_STOCK_ALMACEN ');
                return 0;
            })
    }

    $scope.estadoObteniendo = function () {
        $scope.countRealizado++;
        //console.log($scope.countRealizado +'>='+ $scope.countVerifica)
        if ($scope.countRealizado >= $scope.countVerifica) {
            // se actualizaron todos los saldos de stock

            //console.log($rootScope.datosPaletiza.manual);

            var estado = 0;

            angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
                    if (value.inLotePaletizar <= value.CSPEM) {
                        //console.log("OK Si existen saldos en todos los lotes se procede envio XML");
                        
                    } else {
                        //console.log("ya no hay disponible");
                        estado = -1;
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

    $scope.generaXML = function () {
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_HU_PACK>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HUKEY>' + angular.uppercase($rootScope.datosPaletiza.numeroPallet) + '</tem:HUKEY>';
        cadenaXML += '            <tem:IT_ITEMPROPOSAL>';
        //               <!--Zero or more repetitions:-->
        var ValiAument = true;
        angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
            //if ($rootScope.varificaCero($rootScope.datosPaletiza.manual[value.idx].inLotePaletizar) > 0) {
                cadenaXML += '               <tem:ZMOV_CREATE_HU_PACK_IT_ITEMPROPOSAL>';
                cadenaXML += '                  <tem:HU_ITEM_TYPE>1</tem:HU_ITEM_TYPE>';
                cadenaXML += '                  <tem:LOWER_LEVEL_EXID></tem:LOWER_LEVEL_EXID>';
                cadenaXML += '                  <tem:PACK_QTY>' + $rootScope.varificaCero($rootScope.datosPaletiza.manual[value.idx].inLotePaletizar) + '</tem:PACK_QTY>';
                cadenaXML += '                  <tem:BASE_UNIT_QTY_ISO></tem:BASE_UNIT_QTY_ISO>';
                //cadenaXML += '                  <tem:BASE_UNIT_QTY>' + value.MEINS + '</tem:BASE_UNIT_QTY>';
                cadenaXML += '                  <tem:BASE_UNIT_QTY></tem:BASE_UNIT_QTY>';
                cadenaXML += '                  <tem:NUMBER_PACK_MAT>0</tem:NUMBER_PACK_MAT>';
                cadenaXML += '                  <tem:FLAG_SUPLMT_ITEM></tem:FLAG_SUPLMT_ITEM>';
                cadenaXML += '                  <tem:MATERIAL>' + value.MATNR + '</tem:MATERIAL>';
                cadenaXML += '                  <tem:BATCH>' + value.CHARG + '</tem:BATCH>';
                //cadenaXML += '                  <tem:PLANT>' + value.WERKS + '</tem:PLANT>';
                cadenaXML += '                  <tem:PLANT>'+$rootScope.datoUsuario.PLANT+'</tem:PLANT>';
                //cadenaXML += '                  <tem:STGE_LOC>' + value.LGORT + '</tem:STGE_LOC>';
                cadenaXML += '                  <tem:STGE_LOC>'+value.LGORT+'</tem:STGE_LOC>';
                cadenaXML += '                  <tem:STOCK_CAT></tem:STOCK_CAT>';
                cadenaXML += '                  <tem:SPEC_STOCK></tem:SPEC_STOCK>';
                cadenaXML += '                  <tem:SP_STCK_NO></tem:SP_STCK_NO>';
                cadenaXML += '                  <tem:NO_OF_SERIAL_NUMBERS>0</tem:NO_OF_SERIAL_NUMBERS>';
                cadenaXML += '                  <tem:MATERIAL_PARTNER></tem:MATERIAL_PARTNER>';
                cadenaXML += '                  <tem:EXPIRYDATE></tem:EXPIRYDATE>';
                cadenaXML += '                  <tem:GR_DATE></tem:GR_DATE>';
                cadenaXML += '                  <tem:MATERIAL_EXTERNAL></tem:MATERIAL_EXTERNAL>';
                cadenaXML += '                  <tem:MATERIAL_GUID></tem:MATERIAL_GUID>';
                cadenaXML += '                  <tem:MATERIAL_VERSION></tem:MATERIAL_VERSION>';
                cadenaXML += '               </tem:ZMOV_CREATE_HU_PACK_IT_ITEMPROPOSAL>';
                //cadenaXML += '                  <tem:PACK_QTY>' + value.inLotePaletizar + '</tem:PACK_QTY>';
           // }
          if ($rootScope.datosPaletiza.manual[value.idx].CLABS < $rootScope.datosPaletiza.manual[value.idx].inLotePaletizar && ValiAument == true) {
                            $rootScope.mostrarAlerta(true, 'Advertencia!', 'No puede aumentar cajas superando el stock');      
                             ValiAument = false;
                    }
           if ($rootScope.datosPaletiza.manual[value.idx].inLotePaletizar <= 0 && ValiAument == true) {
                            $rootScope.mostrarAlerta(true, 'Advertencia!', 'No puede aumentar en 0 o en numeros negativos');      
                             ValiAument = false;
                    }
        });
                if (ValiAument == false) {
                    return 0;
                }


        cadenaXML += '            </tem:IT_ITEMPROPOSAL>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_HU_PACK>';
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
            {node:"PEDIDO",h1:"Pedido"},
            {node:"MESSAGE_V1",h1:"MESSAGE_V1"},
            {node:"MESSAGE",h1:"Message"},
            //{node:"NUMBER",h1:"nUMBER"}
         ];
        $rootScope.sendDataService(cadenaXML,$rootScope,$scope,jsonXmlNodes,dataFactory);

    }
    $scope.irMovimiento = function(mov){
       $scope.mostrarRespuesta(false); 
    }

})
