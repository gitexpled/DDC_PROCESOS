angular.module('starter.controllersProcesoEx', [])
.controller('crtPExistente', function ($scope, $routeParams, dataFactory, $rootScope) {
            $('#PACK_FiltroProductorPrPoc').addClass('animated ' + $routeParams.animacion);

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
    //$rootScope.datosLoteProcesoPaking.selFechaContabilizacion = null;
    if($rootScope.datosLoteProcesoPaking.pakingGuia!=undefined)$rootScope.datosLoteProcesoPaking.pakingGuia=$rootScope.datosLoteProcesoPaking.pakingGuia
    
    $scope.obtieneProductor = function () {
        $rootScope.verLoading_(true, "Obteniendo dato del productor...");
        if ($rootScope.datoUsuario.idUsuario == "demo") {
            $rootScope.datoProductorDetalle = { LIFNR: "0000009016", NAME1: "testing 001", REGIO: 15, ORT02: "SANTIAGO", NAME4: "SANTIAGO", LMR_REST: "EU", ZPRD_CSG: 1, ZPRD_CSP: 1, ZPRD_GGN: 1, ZPRD_SDP: 1 };
            //$rootScope.datoProductorCertificados = [{ tipo: "CSG", UK: "", EU: "EU", HK: "", HK: "", JP: "", KO: "", TW: "", CH: "", BR: "", KR: "", CN: "" }];
            $rootScope.verLoading_(false, "");
        } else {
            /*dataFactory.getDatos('PRODUCTORES', 'LIFNR=' + $rootScope.datosLoteProcesoPaking.LIFNR)
            .success(function (datos) {
                //console.log(datos.getProductor)
                if (datos.ZPRODUCTORES == '') {// dato incorrecto
                    $rootScope.verLoading_(false, "");
                    $rootScope.mostrarAlerta(true, 'Error', 'Productor no encontrado o los datos no estan disponibles:' + $rootScope.datosLoteProcesoPaking.LIFNR)
                } else {// dato ok
                    $rootScope.verLoading_(false, "");
                    $rootScope.datoProductorDetalle = datos.ZPRODUCTORES[0];
                    $rootScope.blockReEnvio=0;
                }
            })
            .error(function (datos) {
                $rootScope.verLoading_(false, "");
                $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio:JSON_ZXPI_PRODUCTORES');
            })*/
			$rootScope.verLoading_(false, "");
        }
    }

    $scope.obtieneProductor();

    $scope.limpiarMaterialesDescarte = function (TIPONOTIFICACION) {
        if (($rootScope.datosLoteProcesoPaking.selFechaContabilizacion == "") || ($rootScope.datosLoteProcesoPaking.selFechaContabilizacion == undefined)) {
            $scope.mostrarAlerta(true, 'Error', 'Seleccione fecha de contabilización');
            return 0;
        }
        if (($rootScope.datosLoteProcesoPaking.pakingGuia == "") || ($rootScope.datosLoteProcesoPaking.pakingGuia == undefined)) {
            $scope.mostrarAlerta(true, 'Error', 'Ingrese guía de despacho');
            return 0;
        }
        $rootScope.blockReEnvio = 0;
        $rootScope.TIPONOTIFICACION=TIPONOTIFICACION;
        $scope.navegacionPagina('PACK_'+TIPONOTIFICACION+$rootScope.controllerMenu, 'fadeInRight', '');
    }

    $scope.aceptarPakingProceso = function (TIPONOTIFICACION) {
        if (($rootScope.datosLoteProcesoPaking.selFechaContabilizacion == "") || ($rootScope.datosLoteProcesoPaking.selFechaContabilizacion == undefined)) {
            $scope.mostrarAlerta(true, 'Error', 'Seleccione fecha de contabilización');
            return 0;
        }
        if (($rootScope.datosLoteProcesoPaking.pakingGuia == "") || ($rootScope.datosLoteProcesoPaking.pakingGuia == undefined)) {
            $scope.mostrarAlerta(true, 'Error', 'Ingrese guía de despacho');
            return 0;
        }
        $rootScope.blockReEnvio = 0;
        $rootScope.TIPONOTIFICACION=TIPONOTIFICACION;
        console.log('PACK_Embalajes'+$rootScope.controllerMenu)
        $scope.navegacionPagina('PACK_Embalajes'+$rootScope.controllerMenu, 'fadeInRight', '/new');
    }


})
.controller('crtPACK_EmbalajesP', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('#PACK_Embalajes').addClass('animated ' + $routeParams.animacion);
    $scope.accion = $routeParams.sid;
    $scope.selKilosDivPakingTab = 'none';

    $(function () {
        $("#fechaEmbalagePakingTab").datepicker({ dateFormat: 'yy-mm-dd' ,
        onSelect: function(dateText) {
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab=dateText;
          }
        });
    });
    $scope.variedadOpciones = [];
    console.log($rootScope.ZMOV_QUERY_VARIEDAD)
    angular.forEach($rootScope.ZMOV_QUERY_VARIEDAD, function (value, key) {
        if(value.ATBEZ==$rootScope.datosExportadora.especie.DESCRIPTION)
            $scope.variedadOpciones.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR })
    });
    //material
     $scope.pakingTipoMaterialOpciones = [];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        /*if(value.ZMAT_ESPECIE==$rootScope.datosExportadora.especie.DESCRIPTION){
            console.log(value);
        }*/
        if(true
            &&value.ZMAT_ESPECIE==$rootScope.datosExportadora.especie.DESCRIPTION
            &&value.ZMAT_VIGENTE == "SI"
            &&value.ZMAT_PROCESO=="PR-CJEXPO"
            &&value.ZMAT_PROC_NAR=="SI"
            ){
        
                $scope.pakingTipoMaterialOpciones.push({ DESCRIPTION: value.MAKTG + '  ' + value.MATNR, VALUE_CHAR: value.MATNR , KILOS:value.NTGEW , MAKTG:value.MAKTG , MATNR:value.MATNR })
            }
        });
    //categoria 
     $scope.pakingCategoriaOpciones = [];
     angular.forEach($rootScope.ZMOV_QUERY_CATEGORIA, function (value, key) {
        
        if(true
           &&value.ATBEZ==$rootScope.datosExportadora.especie.DESCRIPTION
           ){
                $scope.pakingCategoriaOpciones.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR  })
            }
        });
        //calibre
    $scope.pakingCalibreOpciones=[];
    //console.log($rootScope.calibre);
    angular.forEach($rootScope.ZMOV_QUERY_CALIBRE, function (value, key) {
        if(true
           &&value.ATBEZ==$rootScope.datosExportadora.especie.DESCRIPTION
           ){
                $scope.pakingCalibreOpciones.push({ VALUE_CHAR: value.VALUE_CHAR, DESCRIPTION: value.DESCRIPTION})
           }
    });
    $scope.cargaDatos = function (idx) {
        $rootScope.datosLoteProcesoPaking.TIPONOTIFICACION=$rootScope.TIPONOTIFICACION;
        $rootScope.datosLoteProcesoPaking.detalle[idx] = {
            fechaEmbalagePakingTab: '',
            embalajePakingBarTab: '',
            embalajeLotePakingTab: '',
            selVariedadPakingTab: '',
            selCuartelTab: '',
            embalajeCajaPaking: '',
            embalajeKilosPaking: '',
            selMercadoPakingTab: { MAKTG: '', MATNR: '', MEINS: '', NTGEW: '', ZMAT_LIDL: '', ZMAT_MERCADO: '', ZMAT_PTI: '', ZMAT_DESHIDRATACION:'' },
            selSDP:'',
            selCSG:'',
            selCSP:'',
            selGGN:'',
            trazabilidadProRegionTab:{ name: '', value: '' },
            trazabilidadProProvinciaTab:{ name: '', value: '' },
            trazabilidadProComunaTab:{ name: '', value: '' },
            trazabilidadPacRegionTab:{ name: '', value: '' },
            trazabilidadPacProvinciaTab: { name: '', value: '' },
            trazabilidadPacComunaTab: { name: '', value: '' },
            selDatosTrazabilidad_FechaSag: '',
            selDatosTrazabilidad_FechaJuliana: '',
            selDatosTrazabilidad_LIDL: '',
            selDatosTrazabilidad_PTI: '',
            VARIEDAD:'',
            fechaEmbalagePakingTabx:'',
            numExportacion:''
        }
    }

    if ($routeParams.sid == "new") {
        $scope.accion = "new";
        $scope.selMercadoDivTab1 = 'none';
        $scope.selKilosDivPakingTab = 'none';
        $rootScope.idxTab = 0;
        $rootScope.countTab = 0;
        $scope.selTab = [];
        $scope.selTab.push({ idx: 0, nombre: "MAT 1", seleccionado: "on" });
        $scope.verBtnEliminar = "none";
        $rootScope.datosLoteProcesoPaking.detalle = [];
        $scope.cargaDatos(0);
        $scope.auxKilo = 0;
        $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = (parseFloat($rootScope.datosLoteProcesoPaking.LBLAB)).toFixed(3);

    }
    
    if ($routeParams.sid == "volver") {
        document.getElementById('fechaEmbalagePakingTab').value = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab
        $scope.selTab = [];
        $scope.auxKilo = 0;
        //$scope.selTab[$rootScope.idxTab].seleccionado = "on"
        for (i = 0; i <= $rootScope.countTab; i++) {
            $scope.selTab.push({ idx: i, nombre: "MAT " + (i + 1), seleccionado: "off" })
        }
        $scope.selTab[$rootScope.idxTab].seleccionado = "on";
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }

        console.log($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab)

        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.MAKTG == undefined) {
            $scope.selMercadoDivTab1 = 'none';
        } else {
            $scope.selMercadoDivTab1 = 'block';
        }
    }

    $scope.verPopMercado = function (estado) {
        if (estado == true) {
            $scope.verMercado = "block";
        } else {
            $scope.verMercado = "none";
        }
    }
    $scope.verPopMercado(false)

    $scope.verimpKilos = function (estado) {
        if (estado == false) {
            $scope.selKilosDivPakingTab = "none";
        }
        if ((estado == 'FFA0130') || (estado == 'FFA0330')) {
            $scope.selKilosDivPakingTab = "block";
        } else {
            $scope.selKilosDivPakingTab = "none";
        }
    }
    $scope.verimpKilos(false)

    // funcion para agregar nuevo tab
    $scope.agregarTab = function () {
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab = $('#fechaEmbalagePakingTab').datepicker({ dateFormat: 'yy-mm-dd',onSelect: function(dateText) {$rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab=dateText;} }).val();
        $scope.selTab[$rootScope.idxTab].seleccionado = "off"
        $rootScope.countTab++;
        $rootScope.idxTab = $rootScope.countTab;
        $scope.selMercadoDivTab1 = 'none';
        try {
            if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.MAKTG == '') || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.MAKTG == undefined)) {
                $scope.selMercadoDivTab1 = 'none';
            } else {
                $scope.selMercadoDivTab1 = 'block';
            }
        } catch (e) {
            $scope.selMercadoDivTab1 = 'none';
        }
        $scope.selTab.push({ idx: $rootScope.countTab, nombre: "MAT " + ($rootScope.countTab + 1), seleccionado: "on" })
        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }
        $('#div_tab_embalajePaking').removeClass('animated fadeInUp');
        $('#div_tab_embalajePaking').hide();
        $('#div_tab_embalajePaking').show();
        $('#div_tab_embalajePaking').addClass('animated fadeInUp');
        document.getElementById('fechaEmbalagePakingTab').value = "";
        $scope.cargaDatos($rootScope.idxTab);
        $scope.auxKilo = 0;
    }

    // funcion para agregar nuevo tab
    $scope.deshacerTab = function () {
        var aux = 0;
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $scope.selTab[$rootScope.countTab] = [];
        $rootScope.countTab--;
        $scope.selTab[$rootScope.countTab].seleccionado = "on";
        $rootScope.idxTab = $rootScope.countTab;
        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }
        $('#div_tab_embalajePaking').removeClass('animated fadeInUp');
        $('#div_tab_embalajePaking').hide();
        $('#div_tab_embalajePaking').show();
        $('#div_tab_embalajePaking').addClass('animated fadeInUp');
        document.getElementById('fechaEmbalagePakingTab').value = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab;
        $scope.selTab.pop();
        $scope.recalculaPakingKilos
    }

    // cambiar de tab
    $scope.irAlTab = function (idx) {
        var aux = 0;
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab = $('#fechaEmbalagePakingTab').datepicker({ dateFormat: 'yy-mm-dd' }).val();
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $rootScope.idxTab = idx;
        $scope.selTab[idx].seleccionado = "on";
        $('#div_tab_embalajePaking').removeClass('animated fadeInUp');
        $('#div_tab_embalajePaking').hide();
        $('#div_tab_embalajePaking').show();
        $('#div_tab_embalajePaking').addClass('animated fadeInUp');
        document.getElementById('fechaEmbalagePakingTab').value = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab;
        document.getElementById('embalajeLoteTab1').value = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].lotePacking;
        $scope.selMercadoDivTab1 = 'none';
        //console.log($rootScope.datosLoteProcesoPaking)
        try {
            if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.MAKTG == '') || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.MAKTG == undefined)) {
                $scope.selMercadoDivTab1 = 'none';
            } else {
                $scope.selMercadoDivTab1 = 'block';
            }
        } catch (e) {
            $scope.selMercadoDivTab1 = 'none';
        };
        $scope.auxKilo = 0;
    }

    // Ingreso codigo de barras manual al ser >=ENTER cagacteres gatilla proceso
    $scope.embalajeIngreso = function (keyEvent) {

        // verificar si se permiten BULK, si hay bulk haver visible el campo kilos

        if (keyEvent == "OK") {


            $scope.verimpKilos(angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajePakingBarTab));

            $scope.verPopMercado(true);
            $('#cargandoPopMercado').show();
            $('#popListaNoMercado').hide();
            $('#popListaMercado').hide();
            $scope.listaMercado = [];
            //document.getElementById('popListaNoMercado').style.display = 'none';
            $rootScope.etiquetaMaterial = [];
            if ($rootScope.datoUsuario.idUsuario == "demo") {
                $rootScope.etiquetaMaterial[$rootScope.idxTab] = [{ MATNR: "FFA0306", MAKTG: "ARAND CONV BCOLL 12X125G GENERICA", ZMAT_MERCADO: "EU", MEINS: "CS", ZMAT_PTI: "NO", ZMAT_LIDL: "SI", NTGEW: " 1.500" }];
                // $rootScope.etiquetaMaterial[$rootScope.idxTab] = [{ codMaterial: "FFA0306", descripcion: "ARAND CONV BCOLL 12X125G GENERICA", mercado: "EU", unidad: "CS", PTI: "NO", LIDL: "NO", PESO_NETO: " 1.500" }, { codMaterial: "MERMA_LINEA", descripcion: "MERMA_LINEA", mercado: "", unidad: "KG", PTI: "", LIDL: "" }, { codMaterial: "DESECHO", descripcion: "DESECHO", mercado: "", unidad: "KG", PTI: "", LIDL: "" }];
                $scope.listaMercado = $rootScope.etiquetaMaterial[$rootScope.idxTab];
                $('#cargandoPopMercado').hide();
                $('#popListaNoMercado').hide();
                $('#popListaMercado').show();

            } else {
                //var aux = datoProductorDetalle.mercados + ' ';
                var count = 0;
                /*dataFactory.getDatos('MATERIAL', 'MATNR=' + angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajePakingBarTab))
                .success(function (datos) {
                    //console.log(datos)
                    if (datos.materiales.length > 0) {
                        angular.forEach(datos.materiales, function (value, key) {
                            var jsonArg = new Object();
                            jsonArg.MATNR = value.MATNR;//codMaterial
                            jsonArg.MAKTG = value.MAKTG;//descripcion
                            jsonArg.ZMAT_MERCADO = value.ZMAT_MERCADO;//mercado
                            jsonArg.MEINS = value.MEINS;//unidad
                            jsonArg.ZMAT_PTI = value.ZMAT_PTI;//PTI
                            jsonArg.ZMAT_LIDL = value.ZMAT_LIDL;//LIDL
                            jsonArg.NTGEW = value.NTGEW;//PESO_NETO
                            jsonArg.ZMAT_DESHIDRATACION = value.ZMAT_DESHIDRATACION;//PESO_NETO
                            $rootScope.etiquetaMaterial[$rootScope.idxTab] = (jsonArg);
                            var aux = $rootScope.datoProductorDetalle.LMR_REST + ' ';
                            var aux2 = value.ZMAT_MERCADO
                            //console.log($rootScope.datoProductorDetalle)
                            //console.log(aux + '-_-' + aux2)
                            //console.log(aux.indexOf(aux2))
                            if (aux.indexOf(aux2) == -1) {// no mostrar los mercados con el cidigo del productor devuelto por sac
                                $scope.listaMercado.push(jsonArg);
                                count++;
                            }
                        });
                        $('#cargandoPopMercado').hide();
                        $('#popListaNoMercado').hide();
                        $('#popListaMercado').show();
                        if (count == 0) {
                            // no existen mercados para el productor seleccionado	
                            $scope.msgNoEncontrado = 'El Productor NO se encuentra habilitado para exportar a este mercado, comunicarse con Personal de Calidad.';
                            $('#cargandoPopMercado').hide();
                            $('#popListaNoMercado').show();
                            $('#popListaMercado').hide();
                        }
                    } else {
                        $scope.msgNoEncontrado = 'Material no Existe, Valide digitacion o comunicarse con Jefatura.';
                        $('#cargandoPopMercado').hide();
                        $('#popListaNoMercado').show();
                        $('#popListaMercado').hide();
                    }

                })
                .error(function (datos) {
                    $rootScope.verLoading_(false, "");
                    $('#cargandoPopMercado').hide();
                    $('#popListaNoMercado').hide();
                    $('#popListaMercado').show();
                    $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio:JSON_ZXPI_MATERIAL');
                })
*/
            }
        }
    }

    //al seleccionar un mercado, accion y cerrar pop
    $scope.cerrarPopMercado = function (opciones) {
        $scope.verPopMercado(false);
        $scope.selMercadoDivTab1 = 'block';
        //console.log(opciones)
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab = opciones;
        //console.log($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab])
    }
    
    $scope.recalculaPakingKilos = function () {
     
    }

    $scope.verPopMercado=function(boll){
        $('#cargandoDatosSAP').hide('fade');
    }
    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
        } else {
            $scope.verPopRespuesta = "none";
        }
    }
    // estableser oculto
    $scope.mostrarRespuesta(false);
    $scope.embalajePakingContinuar = function () {
        
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            if($rootScope.datosLoteProcesoPaking.detalle[inx].material==undefined ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking==undefined || $rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking =='' ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos==undefined || isNaN($rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos)||
               $rootScope.datosLoteProcesoPaking.detalle[inx].fechaEmbalagePakingTab==undefined || $rootScope.datosLoteProcesoPaking.detalle[inx].fechaEmbalagePakingTab=='' ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].calibre==undefined ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD==undefined 
                ){
                $scope.mostrarAlerta(true, 'Advertencia', 'Faltan Campos para completar el envio'); return 0;
            }
        }
        //$rootScope.antiRefrescar()
        $rootScope.blockReEnvio = 1;
        document.getElementById('btnContinuar_').style.display = 'none';
        $scope.btnGeneraXML = 'none';
        document.getElementById('btnError').style.display = 'none';
        document.getElementById('popRespuestaLotesPaking').innerHTML = '';
        $('#cargandoPopLotesPaking').show();
        document.getElementById('loadingLotesPaking').style.display = 'block';
        $scope.mostrarRespuesta(true);
        //$scope.mostrarRespuesta(true);
        console.log('______DATOS__________');

        console.log($rootScope.datosLoteProcesoPaking);

        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_RECEP_PROCESO_NARA>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HEADER>';
        cadenaXML += '               <tem:BUKRS>' + $rootScope.datoUsuario.sociedad  + '</tem:BUKRS>'; // sociedad usuario
        cadenaXML += '               <tem:EKORG>'+ $rootScope.datoUsuario.organizacion +'</tem:EKORG>'; // en duro
        cadenaXML += '               <tem:EKGRP>'+ $rootScope.datoUsuario.grupoCompra +'</tem:EKGRP>';// grupo compra
        cadenaXML += '               <tem:BSART>'+ $rootScope.datoUsuario.clasePedido +'</tem:BSART>';// clase pedido
        cadenaXML += '               <tem:BUDAT>'+ $rootScope.datosLoteProcesoPaking.selFechaContabilizacion.value +'</tem:BUDAT>';//
        cadenaXML += '               <tem:LIFNR>'+ $rootScope.datosLoteProcesoPaking.LIFNR +'</tem:LIFNR>';//
        cadenaXML += '               <tem:XBLNR>'+ $rootScope.datosLoteProcesoPaking.pakingGuia +'</tem:XBLNR>';// guia de despacho
        cadenaXML += '               <tem:BKTXT>'+ $rootScope.datoUsuario.usuario +'</tem:BKTXT>';// usuario
        cadenaXML += '            </tem:HEADER>';
        cadenaXML += '            <tem:ITEM_NARANJA>';
        //<!--Zero or more repetitions:-->
        console.log($rootScope.datosLoteProcesoPaking.detalle)
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            cadenaXML += '               <tem:ZMOV_CREATE_RECEP_PROCESO_NARA_ITEM_NARANJA>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosLoteProcesoPaking.detalle[inx].material.MATNR + '</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH>' + angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking) + '</tem:BATCH>';
          //cadenaXML += '                  <tem:QUANTITY>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos.toString().split(".").join(",") +'</tem:QUANTITY>';
            cadenaXML += '                  <tem:QUANTITY>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos +'</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT>CS</tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].fechaEmbalagePakingTab +'</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>'+ $rootScope.datoUsuario.centro +'</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>'+ $rootScope.datoUsuario.almacenFumigacion +'</tem:STGE_LOC>';
            cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
            cadenaXML += '                  <tem:BATCH_GRANEL>'+ angular.uppercase($rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking) +'</tem:BATCH_GRANEL>';//lote existente
            cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNARANJA_VARIEDAD>';
            cadenaXML += '                  <tem:ZNARANJA_CATEGORIA>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNARANJA_CATEGORIA>';
            cadenaXML += '                  <tem:ZNARANJA_CALIBRE>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].calibre.VALUE_CHAR +'</tem:ZNARANJA_CALIBRE>'; // campos agregar a otros html numExportacion
            cadenaXML += '                  <tem:ZNUM_PLU>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZNUM_PLU +'</tem:ZNUM_PLU>';
            cadenaXML += '                  <tem:ZPLU>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZPLU +'</tem:ZPLU>';
            cadenaXML += '                  <tem:ZETIQUETADO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZETIQUETADO +'</tem:ZETIQUETADO>';
            cadenaXML += '                  <tem:ZQUIMICO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZQUIMICO +'</tem:ZQUIMICO>';
            cadenaXML += '                  <tem:ZNUM_EXPO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].numExportacion +'</tem:ZNUM_EXPO>'
            
            //cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNARANJA_VARIEDAD>';
            //cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNARANJA_VARIEDAD>';
           
            /*
            cadenaXML += '                  <tem:BATCH_GRANEL>'+ angular.uppercase($rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking) +'</tem:BATCH_GRANEL>';//lote existente
            cadenaXML += '                  <tem:ZNUEZ_CALIBRE>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].calibre.VALUE_CHAR +'</tem:ZNUEZ_CALIBRE>'; // campos agregar a otros html numExportacion
            cadenaXML += '                  <tem:ZNUEZ_NUMEXPORTA>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].numExportacion +'</tem:ZNUEZ_NUMEXPORTA>';
            cadenaXML += '                  <tem:ZNUEZ_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNUEZ_VARIEDAD>';
            */
                    
            cadenaXML += '               </tem:ZMOV_CREATE_RECEP_PROCESO_NARA_ITEM_NARANJA>';
        }
        cadenaXML += '            </tem:ITEM_NARANJA>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_RECEP_PROCESO_NARA>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);

        /// VALIDAR ENVIO POR USUARIO DEMO OFLINE
        if ($rootScope.datoUsuario.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', 'http://' + IPSERVER + '/'+RUTASERVER+'/rfcNET.asmx', true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingLotesPaking').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');

                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        var xmlData = $.parseXML(print);
                        var jsonXmlNodes=[
                            {node:"MATERIALDOCUMENT",h1:"Material Document"},
                            //{node:"MATERIALDOCUMENT_BD",h1:"Material Document BD"},
                            {node:"PEDIDO",h1:"Pedido"},
                            {node:"MESSAGE",h1:"Message"}
                        ];
                        var reespuestaNode=getXmlMessage(jsonXmlNodes,xmlData);
                        document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> '+reespuestaNode+'</div>'//'<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Material Document BD</h1><p>' + mensajeRespuesta2 + '</p><h1>Pedido</h1><p>' + mensajeRespuesta3 + '</p><h1>Mensajes</h1><p>' + mensajeRespuesta4 + '</p>';

                        /*
                        var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
                        var mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        var thirdPartyNode = $(xmlData).find("MESSAGE")[1]; //CONSUMOMAT
                        var mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        var thirdPartyNode = $(xmlData).find("MESSAGE")[2]; //MESSAGE
                        var mensajeRespuesta3 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        */
                        //document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Mensajes:</h1><p>' + mensajeRespuesta3 + '</p></div>';//<h1>Consumo Material:</h1> <p>' + mensajeRespuesta2 + '</p>

                        var parser = new DOMParser();
                        var docXml = parser.parseFromString(print, "text/xml");  
                        console.log(docXml.firstChild);
                        //$scope.recargaStock();
                    }
                    if (xmlhttp.status == 500) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingLotesPaking').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        document.getElementById('popRespuestaLotesPaking').innerHTML = 'El servidor rechazó recepción de datos!'
                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            document.getElementById('loadingCajaEmabalda').style.display = 'none';
            document.getElementById('btnContinuar_').style.display = 'block';
            $('#cargandoDatosSAP').hide('fade');
            document.getElementById('popRespuestaLotesPaking').innerHTML = "DATOS DEMOS CORRECTOS";
        }
        //$scope.navegacionPagina('PACK_Trazabilidad'+$rootScope.controllerMenu, 'fadeInRight', '/' + $scope.accion);
   
    }
    
    $scope.codearLote = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('embalajeLoteTab1').value = result.text;
          //$rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajeLotePakingTab = result.text;
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].lotePacking = result.text;
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }

    $scope.codearEmbalaje = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('embalajeBarTab').value = result.text;
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajePakingBarTab = result.text;
            $scope.embalajeIngreso('OK');
            $scope.irAlTab($rootScope.idxTab);
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }
    
    $scope.restaKgTotal = function(index){
        $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = (parseFloat($rootScope.datosLoteProcesoPaking.LBLAB)).toFixed(3);
        //$rootScope.datosLoteProcesoPaking.detalle[index].embalajeKilos
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            console.log($rootScope.datosLoteProcesoPaking.detalle);
            $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo=$rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo-$rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos;
        }
        
    }
    
    $scope.continuarPakingProceso = function () {
                $rootScope.verLoading_(true, "Obteniendo datos...");
                
                            var CHARG = $rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking;
                            var LIFNR;
                            var nombreProductor = null;
                            var var_LBLAB  ="";
                            var var_VARIEDAD = "";
                            var var_nombreProductor = "";
                            angular.forEach($rootScope.stockSubCat, function (value, key) {
                                    if (CHARG == value.CHARG) {
                                        nombreProductor = value.LIFNR;
                                        if(isNaN(parseInt(value.LIFNR)))
                                                LIFNR=value.LIFNR;
                                        else
                                                LIFNR=parseInt(value.LIFNR);
                                        var_LBLAB = value.LBLAB
                                        var_VARIEDAD = value.VARIEDAD;
                                        var_nombreProductor=value.LIFNR;
                                        angular.forEach($rootScope.productores, function (value2, key2) {
                                                if(Number(value.LIFNR) == value2.LIFNR){
                                                        var_nombreProductor = value2.nombre;
                                                }
                                        })
                                    }
                            });
                            if (nombreProductor == null){
                                    $rootScope.verLoading_(false, "");
                                    $rootScope.mostrarAlerta(true, 'Advertencia', 'Codigo No  Registrado en el Sistema');
                                    $('#btnError').css('display','inline')
                                    $('#btnContinuar_').css('display','none')
                            }else{
                                    $rootScope.datosLoteProcesoPaking = {
                                            LBLAB: var_LBLAB,//kilos
                                            LIFNR: var_nombreProductor,
                                            VARIEDAD: var_VARIEDAD,
                                            nombreProductor: var_nombreProductor,
                                            codigoProductor: LIFNR,
                                            pakingGuia: "",
                                            embalajeLoteProcesoPaking: $rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking,
                                            detalle: [
                                                {material: [], kilos: "", codigoLoteDescarte: "", NOAPTA: {VALUE_CHAR: '', DESCRIPTION: ''},
                                                VARIEDAD:'',
                                                fechaEmbalagePakingTab:'',
                                                fechaEmbalagePakingTabx:'',
                                                numExportacion:''
                                                },
                                            ],
                                            ctrContin: 1,
                                            pakingGuia: $rootScope.datosLoteProcesoPaking.pakingGuia,
                                            selFechaContabilizacion: $rootScope.datosLoteProcesoPaking.selFechaContabilizacion,
                                    };
                                    $scope.navegacionPagina('PACK_FiltroProductor'+$rootScope.controllerMenu, 'fadeInRight', '');
                           
                }
            }
            $scope.recargaStock = function(){
                $rootScope.verLoading_(true, "Obteniendo datos...");
                    //Stock sub cat
                $rootScope.stockSubCat=[];
                dataFactory.getDatos('ZMOV_QUERY_STOCKSUBC','')
               .success(function (datos) {
                   angular.forEach(datos.STOCKSUBC, function (value, key) {
                       var jsonArg = new Object();
                       jsonArg.WERKS = value.WERKS;
                       jsonArg.LIFNR = value.LIFNR;
                       jsonArg.codigo = value.CHARG;
                       jsonArg.LBLAB = value.LBLAB;//kilos
                       jsonArg.nombre = value.MAKTX;
                       jsonArg.MEINS = value.MEINS;
                       jsonArg.HSDAT = value.HSDAT;
                       jsonArg.VARIEDAD = value.VARIEDAD;
                       jsonArg.GUIA = value.GUIA;
                       jsonArg.CHARG = value.CHARG;
                       $rootScope.stockSubCat.push(jsonArg);
                   });
                   //console.log("Obtiene variedades OK:");
                   //$scope.preloadMsg = $scope.preloadMsg+ "<br>Obtiene variedades OK";
                   document.getElementById('preloadMsg').innerHTML = document.getElementById('preloadMsg').innerHTML + "<br>Recarga de Stock de Lotes OK";
                   //$scope.estadoObteniendo();
                   $rootScope.verLoading_(false, "Obteniendo datos...");
                   $scope.continuarPakingProceso()
                   
               })
               .error(function (datos) {
                   $rootScope.verLoading_(false, "");
                   $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio de Recarga de Lotes');
               })
            }
})
.controller('crtPACK_EmbalajesPMI', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('#PACK_Embalajes').addClass('animated ' + $routeParams.animacion);
    $scope.accion = $routeParams.sid;
    $scope.selKilosDivPakingTab = 'none';

    $(function () {
        $("#fechaEmbalagePakingTab").datepicker({ dateFormat: 'yy-mm-dd' ,
        onSelect: function(dateText) {
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab=dateText;
          }
        });
    });
    $scope.variedadOpciones = [];
    //console.log($rootScope.ZMOV_QUERY_VARIEDAD)
    angular.forEach($rootScope.ZMOV_QUERY_VARIEDAD, function (value, key) {
        if(value.ATBEZ==$rootScope.datosExportadora.especie.DESCRIPTION)
            $scope.variedadOpciones.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR })
    });
     $scope.pakingTipoMaterialOpciones = [];
   angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if(value.ZMAT_ESPECIE == "NARANJA")console.log(value);
        if (true
            &&value.ZMAT_ESPECIE == "NARANJA"
            &&value.ZMAT_PROCESO == "PR-MI"
            &&value.ZMAT_VIGENTE == "SI"
            &&value.ZMAT_PROC_NAR == "SI"
                ) {
                $scope.pakingTipoMaterialOpciones.push({ DESCRIPTION: value.MAKTG + '  ' + value.MATNR, VALUE_CHAR: value.MATNR , KILOS:value.NTGEW , MAKTG:value.MAKTG , MATNR:value.MATNR })
            }
        });
    $scope.pakingCategoriaOpciones = [];
     angular.forEach($rootScope.ZMOV_QUERY_CATEGORIA, function (value, key) {
        
        if(true
           &&value.ATBEZ==$rootScope.datosExportadora.especie.DESCRIPTION
           ){
                $scope.pakingCategoriaOpciones.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR  })
            }
        });
        //calibre
    $scope.pakingCalibreOpciones=[];
    //console.log($rootScope.calibre);
    angular.forEach($rootScope.ZMOV_QUERY_CALIBRE, function (value, key) {
        if(true
           &&value.ATBEZ==$rootScope.datosExportadora.especie.DESCRIPTION
           ){
                $scope.pakingCalibreOpciones.push({ VALUE_CHAR: value.VALUE_CHAR, DESCRIPTION: value.DESCRIPTION})
           }
    });
    $scope.cargaDatos = function (idx) {
        $rootScope.datosLoteProcesoPaking.TIPONOTIFICACION=$rootScope.TIPONOTIFICACION;
        $rootScope.datosLoteProcesoPaking.detalle[idx] = {
            fechaEmbalagePakingTab: '',
            embalajePakingBarTab: '',
            embalajeLotePakingTab: '',
            selVariedadPakingTab: '',
            selCuartelTab: '',
            embalajeCajaPaking: '',
            embalajeKilosPaking: '',
            selMercadoPakingTab: { MAKTG: '', MATNR: '', MEINS: '', NTGEW: '', ZMAT_LIDL: '', ZMAT_MERCADO: '', ZMAT_PTI: '', ZMAT_DESHIDRATACION:'' },
            selSDP:'',
            selCSG:'',
            selCSP:'',
            selGGN:'',
            trazabilidadProRegionTab:{ name: '', value: '' },
            trazabilidadProProvinciaTab:{ name: '', value: '' },
            trazabilidadProComunaTab:{ name: '', value: '' },
            trazabilidadPacRegionTab:{ name: '', value: '' },
            trazabilidadPacProvinciaTab: { name: '', value: '' },
            trazabilidadPacComunaTab: { name: '', value: '' },
            selDatosTrazabilidad_FechaSag: '',
            selDatosTrazabilidad_FechaJuliana: '',
            selDatosTrazabilidad_LIDL: '',
            selDatosTrazabilidad_PTI: '',
            VARIEDAD:'',
            fechaEmbalagePakingTabx:'',
            numExportacion:''
        }
        console.log()
    }

    if ($routeParams.sid == "new") {
        $scope.accion = "new";
        $scope.selMercadoDivTab1 = 'none';
        $scope.selKilosDivPakingTab = 'none';
        $rootScope.idxTab = 0;
        $rootScope.countTab = 0;
        $scope.selTab = [];
        $scope.selTab.push({ idx: 0, nombre: "MAT 1", seleccionado: "on" });
        $scope.verBtnEliminar = "none";
        $rootScope.datosLoteProcesoPaking.detalle = [];
        $scope.cargaDatos(0);
        $scope.auxKilo = 0;
        $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = (parseFloat($rootScope.datosLoteProcesoPaking.LBLAB)).toFixed(3);

    }
    angular.forEach($rootScope.VARIEDADES, function (value, key) {
            //if (value.MTART == 'FERT') {
            $scope.tipoOperacionOpciones.push({ DESCRIPTION: value.codigo , VALUE_CHAR: value.nombre })
            // }
    });
    if ($routeParams.sid == "volver") {
        document.getElementById('fechaEmbalagePakingTab').value = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab
        $scope.selTab = [];
        $scope.auxKilo = 0;
        //$scope.selTab[$rootScope.idxTab].seleccionado = "on"
        for (i = 0; i <= $rootScope.countTab; i++) {
            $scope.selTab.push({ idx: i, nombre: "MAT " + (i + 1), seleccionado: "off" })
        }
        $scope.selTab[$rootScope.idxTab].seleccionado = "on";
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }

        console.log($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab)

        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.MAKTG == undefined) {
            $scope.selMercadoDivTab1 = 'none';
        } else {
            $scope.selMercadoDivTab1 = 'block';
        }
    }

    $scope.verPopMercado = function (estado) {
        if (estado == true) {
            $scope.verMercado = "block";
        } else {
            $scope.verMercado = "none";
        }
    }
    $scope.verPopMercado(false)

    $scope.verimpKilos = function (estado) {
        if (estado == false) {
            $scope.selKilosDivPakingTab = "none";
        }
        if ((estado == 'FFA0130') || (estado == 'FFA0330')) {
            $scope.selKilosDivPakingTab = "block";
        } else {
            $scope.selKilosDivPakingTab = "none";
        }
    }
    $scope.verimpKilos(false)

    // funcion para agregar nuevo tab
    $scope.agregarTab = function () {
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab = $('#fechaEmbalagePakingTab').datepicker({ dateFormat: 'yy-mm-dd',onSelect: function(dateText) {$rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab=dateText;} }).val();
        $scope.selTab[$rootScope.idxTab].seleccionado = "off"
        $rootScope.countTab++;
        $rootScope.idxTab = $rootScope.countTab;
        $scope.selMercadoDivTab1 = 'none';
        try {
            if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.MAKTG == '') || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.MAKTG == undefined)) {
                $scope.selMercadoDivTab1 = 'none';
            } else {
                $scope.selMercadoDivTab1 = 'block';
            }
        } catch (e) {
            $scope.selMercadoDivTab1 = 'none';
        }
        $scope.selTab.push({ idx: $rootScope.countTab, nombre: "MAT " + ($rootScope.countTab + 1), seleccionado: "on" })
        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }
        $('#div_tab_embalajePaking').removeClass('animated fadeInUp');
        $('#div_tab_embalajePaking').hide();
        $('#div_tab_embalajePaking').show();
        $('#div_tab_embalajePaking').addClass('animated fadeInUp');
        document.getElementById('fechaEmbalagePakingTab').value = "";
        $scope.cargaDatos($rootScope.idxTab);
        $scope.auxKilo = 0;
    }

    // funcion para agregar nuevo tab
    $scope.deshacerTab = function () {
        var aux = 0;
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $scope.selTab[$rootScope.countTab] = [];
        $rootScope.countTab--;
        $scope.selTab[$rootScope.countTab].seleccionado = "on";
        $rootScope.idxTab = $rootScope.countTab;
        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }
        $('#div_tab_embalajePaking').removeClass('animated fadeInUp');
        $('#div_tab_embalajePaking').hide();
        $('#div_tab_embalajePaking').show();
        $('#div_tab_embalajePaking').addClass('animated fadeInUp');
        document.getElementById('fechaEmbalagePakingTab').value = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab;
        $scope.selTab.pop();
        $scope.recalculaPakingKilos
    }

    // cambiar de tab
    $scope.irAlTab = function (idx) {
        var aux = 0;
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab = $('#fechaEmbalagePakingTab').datepicker({ dateFormat: 'yy-mm-dd' }).val();
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $rootScope.idxTab = idx;
        $scope.selTab[idx].seleccionado = "on";
        $('#div_tab_embalajePaking').removeClass('animated fadeInUp');
        $('#div_tab_embalajePaking').hide();
        $('#div_tab_embalajePaking').show();
        $('#div_tab_embalajePaking').addClass('animated fadeInUp');
        document.getElementById('fechaEmbalagePakingTab').value = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab;
        document.getElementById('embalajeLoteTab1').value = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].lotePacking;
        $scope.selMercadoDivTab1 = 'none';
        //console.log($rootScope.datosLoteProcesoPaking)
        try {
            if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.MAKTG == '') || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.MAKTG == undefined)) {
                $scope.selMercadoDivTab1 = 'none';
            } else {
                $scope.selMercadoDivTab1 = 'block';
            }
        } catch (e) {
            $scope.selMercadoDivTab1 = 'none';
        };
        $scope.auxKilo = 0;
    }

    // Ingreso codigo de barras manual al ser >=ENTER cagacteres gatilla proceso
    $scope.embalajeIngreso = function (keyEvent) {

        // verificar si se permiten BULK, si hay bulk haver visible el campo kilos

        if (keyEvent == "OK") {


            $scope.verimpKilos(angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajePakingBarTab));

            $scope.verPopMercado(true);
            $('#cargandoPopMercado').show();
            $('#popListaNoMercado').hide();
            $('#popListaMercado').hide();
            $scope.listaMercado = [];
            //document.getElementById('popListaNoMercado').style.display = 'none';
            $rootScope.etiquetaMaterial = [];
            if ($rootScope.datoUsuario.idUsuario == "demo") {
                $rootScope.etiquetaMaterial[$rootScope.idxTab] = [{ MATNR: "FFA0306", MAKTG: "ARAND CONV BCOLL 12X125G GENERICA", ZMAT_MERCADO: "EU", MEINS: "CS", ZMAT_PTI: "NO", ZMAT_LIDL: "SI", NTGEW: " 1.500" }];
                // $rootScope.etiquetaMaterial[$rootScope.idxTab] = [{ codMaterial: "FFA0306", descripcion: "ARAND CONV BCOLL 12X125G GENERICA", mercado: "EU", unidad: "CS", PTI: "NO", LIDL: "NO", PESO_NETO: " 1.500" }, { codMaterial: "MERMA_LINEA", descripcion: "MERMA_LINEA", mercado: "", unidad: "KG", PTI: "", LIDL: "" }, { codMaterial: "DESECHO", descripcion: "DESECHO", mercado: "", unidad: "KG", PTI: "", LIDL: "" }];
                $scope.listaMercado = $rootScope.etiquetaMaterial[$rootScope.idxTab];
                $('#cargandoPopMercado').hide();
                $('#popListaNoMercado').hide();
                $('#popListaMercado').show();

            } else {
                //var aux = datoProductorDetalle.mercados + ' ';
                var count = 0;
                /*dataFactory.getDatos('MATERIAL', 'MATNR=' + angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajePakingBarTab))
                .success(function (datos) {
                    //console.log(datos)
                    if (datos.materiales.length > 0) {
                        angular.forEach(datos.materiales, function (value, key) {
                            var jsonArg = new Object();
                            jsonArg.MATNR = value.MATNR;//codMaterial
                            jsonArg.MAKTG = value.MAKTG;//descripcion
                            jsonArg.ZMAT_MERCADO = value.ZMAT_MERCADO;//mercado
                            jsonArg.MEINS = value.MEINS;//unidad
                            jsonArg.ZMAT_PTI = value.ZMAT_PTI;//PTI
                            jsonArg.ZMAT_LIDL = value.ZMAT_LIDL;//LIDL
                            jsonArg.NTGEW = value.NTGEW;//PESO_NETO
                            jsonArg.ZMAT_DESHIDRATACION = value.ZMAT_DESHIDRATACION;//PESO_NETO
                            $rootScope.etiquetaMaterial[$rootScope.idxTab] = (jsonArg);
                            var aux = $rootScope.datoProductorDetalle.LMR_REST + ' ';
                            var aux2 = value.ZMAT_MERCADO
                            //console.log($rootScope.datoProductorDetalle)
                            //console.log(aux + '-_-' + aux2)
                            //console.log(aux.indexOf(aux2))
                            if (aux.indexOf(aux2) == -1) {// no mostrar los mercados con el cidigo del productor devuelto por sac
                                $scope.listaMercado.push(jsonArg);
                                count++;
                            }
                        });
                        $('#cargandoPopMercado').hide();
                        $('#popListaNoMercado').hide();
                        $('#popListaMercado').show();
                        if (count == 0) {
                            // no existen mercados para el productor seleccionado	
                            $scope.msgNoEncontrado = 'El Productor NO se encuentra habilitado para exportar a este mercado, comunicarse con Personal de Calidad.';
                            $('#cargandoPopMercado').hide();
                            $('#popListaNoMercado').show();
                            $('#popListaMercado').hide();
                        }
                    } else {
                        $scope.msgNoEncontrado = 'Material no Existe, Valide digitacion o comunicarse con Jefatura.';
                        $('#cargandoPopMercado').hide();
                        $('#popListaNoMercado').show();
                        $('#popListaMercado').hide();
                    }

                })
                .error(function (datos) {
                    $rootScope.verLoading_(false, "");
                    $('#cargandoPopMercado').hide();
                    $('#popListaNoMercado').hide();
                    $('#popListaMercado').show();
                    $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio:JSON_ZXPI_MATERIAL');
                })
*/
            }
        }
    }

    //al seleccionar un mercado, accion y cerrar pop
    $scope.cerrarPopMercado = function (opciones) {
        $scope.verPopMercado(false);
        $scope.selMercadoDivTab1 = 'block';
        //console.log(opciones)
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab = opciones;
        //console.log($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab])
    }
    
    $scope.recalculaPakingKilos = function () {
     
    }

    $scope.verPopMercado=function(boll){
        $('#cargandoDatosSAP').hide('fade');
    }
    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
        } else {
            $scope.verPopRespuesta = "none";
        }
    }
    // estableser oculto
    $scope.mostrarRespuesta(false);
    $scope.embalajePakingContinuar = function () {
        
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            if($rootScope.datosLoteProcesoPaking.detalle[inx].material==undefined ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking==undefined || $rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking =='' ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos==undefined || isNaN($rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos)||
               $rootScope.datosLoteProcesoPaking.detalle[inx].fechaEmbalagePakingTab==undefined || $rootScope.datosLoteProcesoPaking.detalle[inx].fechaEmbalagePakingTab=='' ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].calibre==undefined ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD==undefined 
                ){
                $scope.mostrarAlerta(true, 'Advertencia', 'Faltan Campos para completar el envio'); return 0;
            }
        }
        //$rootScope.antiRefrescar()
        $rootScope.blockReEnvio = 1;
        document.getElementById('btnContinuar_').style.display = 'none';
        $scope.btnGeneraXML = 'none';
        document.getElementById('btnError').style.display = 'none';
        document.getElementById('popRespuestaLotesPaking').innerHTML = '';
        $('#cargandoPopLotesPaking').show();
        document.getElementById('loadingLotesPaking').style.display = 'block';
        $scope.mostrarRespuesta(true);
        //$scope.mostrarRespuesta(true);
        console.log('______DATOS__________');

        console.log($rootScope.datosLoteProcesoPaking);

       var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_RECEP_PROCESO_NARA>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HEADER>';
        cadenaXML += '               <tem:BUKRS>' + $rootScope.datoUsuario.sociedad  + '</tem:BUKRS>'; // sociedad usuario
        cadenaXML += '               <tem:EKORG>'+ $rootScope.datoUsuario.organizacion +'</tem:EKORG>'; // en duro
        cadenaXML += '               <tem:EKGRP>'+ $rootScope.datoUsuario.grupoCompra +'</tem:EKGRP>';// grupo compra
        cadenaXML += '               <tem:BSART>'+ $rootScope.datoUsuario.clasePedido +'</tem:BSART>';// clase pedido
        cadenaXML += '               <tem:BUDAT>'+ $rootScope.datosLoteProcesoPaking.selFechaContabilizacion.value +'</tem:BUDAT>';//
        cadenaXML += '               <tem:LIFNR>'+ $rootScope.datosLoteProcesoPaking.LIFNR +'</tem:LIFNR>';//
        cadenaXML += '               <tem:XBLNR>'+ $rootScope.datosLoteProcesoPaking.pakingGuia +'</tem:XBLNR>';// guia de despacho
        cadenaXML += '               <tem:BKTXT>'+ $rootScope.datoUsuario.usuario +'</tem:BKTXT>';// usuario
        cadenaXML += '            </tem:HEADER>';
        cadenaXML += '            <tem:ITEM_NARANJA>';
        //<!--Zero or more repetitions:-->
        console.log($rootScope.datosLoteProcesoPaking.detalle)
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            cadenaXML += '               <tem:ZMOV_CREATE_RECEP_PROCESO_NARA_ITEM_NARANJA>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosLoteProcesoPaking.detalle[inx].material.MATNR + '</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH>' + angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking) + '</tem:BATCH>';
          //cadenaXML += '                  <tem:QUANTITY>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos.toString().split(".").join(",") +'</tem:QUANTITY>';
            cadenaXML += '                  <tem:QUANTITY>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos +'</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT>CS</tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].fechaEmbalagePakingTab +'</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>'+ $rootScope.datoUsuario.centro +'</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>'+ $rootScope.datoUsuario.almacenFumigacion +'</tem:STGE_LOC>';
            cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
            cadenaXML += '                  <tem:BATCH_GRANEL>'+ angular.uppercase($rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking) +'</tem:BATCH_GRANEL>';//lote existente
            cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNARANJA_VARIEDAD>';
            cadenaXML += '                  <tem:ZNARANJA_CATEGORIA>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNARANJA_CATEGORIA>';
            cadenaXML += '                  <tem:ZNARANJA_CALIBRE>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].calibre.VALUE_CHAR +'</tem:ZNARANJA_CALIBRE>'; // campos agregar a otros html numExportacion
            cadenaXML += '                  <tem:ZNUM_PLU>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZNUM_PLU +'</tem:ZNUM_PLU>';
            cadenaXML += '                  <tem:ZPLU>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZPLU +'</tem:ZPLU>';
            cadenaXML += '                  <tem:ZETIQUETADO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZETIQUETADO +'</tem:ZETIQUETADO>';
            cadenaXML += '                  <tem:ZQUIMICO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZQUIMICO +'</tem:ZQUIMICO>';
            cadenaXML += '                  <tem:ZNUM_EXPO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].numExportacion +'</tem:ZNUM_EXPO>'
            
            //cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNARANJA_VARIEDAD>';
            //cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNARANJA_VARIEDAD>';
           
            /*
            cadenaXML += '                  <tem:BATCH_GRANEL>'+ angular.uppercase($rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking) +'</tem:BATCH_GRANEL>';//lote existente
            cadenaXML += '                  <tem:ZNUEZ_CALIBRE>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].calibre.VALUE_CHAR +'</tem:ZNUEZ_CALIBRE>'; // campos agregar a otros html numExportacion
            cadenaXML += '                  <tem:ZNUEZ_NUMEXPORTA>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].numExportacion +'</tem:ZNUEZ_NUMEXPORTA>';
            cadenaXML += '                  <tem:ZNUEZ_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNUEZ_VARIEDAD>';
            */
                    
            cadenaXML += '               </tem:ZMOV_CREATE_RECEP_PROCESO_NARA_ITEM_NARANJA>';
        }
        cadenaXML += '            </tem:ITEM_NARANJA>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_RECEP_PROCESO_NARA>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);

        /// VALIDAR ENVIO POR USUARIO DEMO OFLINE
        if ($rootScope.datoUsuario.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', 'http://' + IPSERVER + '/'+RUTASERVER+'/rfcNET.asmx', true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingLotesPaking').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');

                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        var xmlData = $.parseXML(print);
                        var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
                        var mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        var thirdPartyNode = $(xmlData).find("MESSAGE")[1]; //CONSUMOMAT
                        var mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        var thirdPartyNode = $(xmlData).find("MESSAGE")[2]; //MESSAGE
                        var mensajeRespuesta3 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Mensajes:</h1><p>' + mensajeRespuesta3 + '</p></div>';//<h1>Consumo Material:</h1> <p>' + mensajeRespuesta2 + '</p>

                        var parser = new DOMParser();
                        var docXml = parser.parseFromString(print, "text/xml");  
                        console.log(docXml.firstChild);
                        //$scope.recargaStock();
                    }
                    if (xmlhttp.status == 500) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingLotesPaking').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        document.getElementById('popRespuestaLotesPaking').innerHTML = 'El servidor rechazó recepción de datos!'
                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            document.getElementById('loadingCajaEmabalda').style.display = 'none';
            document.getElementById('btnContinuar_').style.display = 'block';
            $('#cargandoDatosSAP').hide('fade');
            document.getElementById('popRespuestaLotesPaking').innerHTML = "DATOS DEMOS CORRECTOS";
        }
        //$scope.navegacionPagina('PACK_Trazabilidad'+$rootScope.controllerMenu, 'fadeInRight', '/' + $scope.accion);
   
    }
    
    $scope.codearLote = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('embalajeLoteTab1').value = result.text;
          //$rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajeLotePakingTab = result.text;
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].lotePacking = result.text;
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }

    $scope.codearEmbalaje = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('embalajeBarTab').value = result.text;
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajePakingBarTab = result.text;
            $scope.embalajeIngreso('OK');
            $scope.irAlTab($rootScope.idxTab);
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }
    
    $scope.restaKgTotal = function(index){
        $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = (parseFloat($rootScope.datosLoteProcesoPaking.LBLAB)).toFixed(3);
        //$rootScope.datosLoteProcesoPaking.detalle[index].embalajeKilos
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            console.log($rootScope.datosLoteProcesoPaking.detalle);
            $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo=$rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo-$rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos;
        }
        
    }
    
    $scope.continuarPakingProceso = function () {
                $rootScope.verLoading_(true, "Obteniendo datos...");
                
                            var CHARG = $rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking;
                            var LIFNR;
                            var nombreProductor = null;
                            var var_LBLAB  ="";
                            var var_VARIEDAD = "";
                            var var_nombreProductor = "";
                            angular.forEach($rootScope.stockSubCat, function (value, key) {
                                    if (CHARG == value.CHARG) {
                                        nombreProductor = value.LIFNR;
                                        if(isNaN(parseInt(value.LIFNR)))
                                                LIFNR=value.LIFNR;
                                        else
                                                LIFNR=parseInt(value.LIFNR);
                                        var_LBLAB = value.LBLAB
                                        var_VARIEDAD = value.VARIEDAD;
                                        var_nombreProductor=value.LIFNR;
                                        angular.forEach($rootScope.productores, function (value2, key2) {
                                                if(Number(value.LIFNR) == value2.LIFNR){
                                                        var_nombreProductor = value2.nombre;
                                                }
                                        })
                                    }
                            });
                            if (nombreProductor == null){
                                    $rootScope.verLoading_(false, "");
                                    $rootScope.mostrarAlerta(true, 'Advertencia', 'Codigo No  Registrado en el Sistema');
                                    $('#btnError').css('display','inline')
                                    $('#btnContinuar_').css('display','none')
                            }else{
                                    $rootScope.datosLoteProcesoPaking = {
                                            LBLAB: var_LBLAB,//kilos
                                            LIFNR: var_nombreProductor,
                                            VARIEDAD: var_VARIEDAD,
                                            nombreProductor: var_nombreProductor,
                                            codigoProductor: LIFNR,
                                            pakingGuia: "",
                                            embalajeLoteProcesoPaking: $rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking,
                                            detalle: [
                                                {material: [], kilos: "", codigoLoteDescarte: "", NOAPTA: {VALUE_CHAR: '', DESCRIPTION: ''},
                                                VARIEDAD:'',
                                                fechaEmbalagePakingTab:'',
                                                fechaEmbalagePakingTabx:'',
                                                numExportacion:''
                                                },
                                            ],
                                            ctrContin: 1,
                                            pakingGuia: $rootScope.datosLoteProcesoPaking.pakingGuia,
                                            selFechaContabilizacion: $rootScope.datosLoteProcesoPaking.selFechaContabilizacion,
                                    };
                                    $scope.navegacionPagina('PACK_FiltroProductor'+$rootScope.controllerMenu, 'fadeInRight', '');
                           
                }
            }
            $scope.recargaStock = function(){
                $rootScope.verLoading_(true, "Obteniendo datos...");
                    //Stock sub cat
                $rootScope.stockSubCat=[];
                dataFactory.getDatos('ZMOV_QUERY_STOCKSUBC','')
               .success(function (datos) {
                   angular.forEach(datos.STOCKSUBC, function (value, key) {
                       var jsonArg = new Object();
                       jsonArg.WERKS = value.WERKS;
                       jsonArg.LIFNR = value.LIFNR;
                       jsonArg.codigo = value.CHARG;
                       jsonArg.LBLAB = value.LBLAB;//kilos
                       jsonArg.nombre = value.MAKTX;
                       jsonArg.MEINS = value.MEINS;
                       jsonArg.HSDAT = value.HSDAT;
                       jsonArg.VARIEDAD = value.VARIEDAD;
                       jsonArg.GUIA = value.GUIA;
                       jsonArg.CHARG = value.CHARG;
                       $rootScope.stockSubCat.push(jsonArg);
                   });
                   //console.log("Obtiene variedades OK:");
                   //$scope.preloadMsg = $scope.preloadMsg+ "<br>Obtiene variedades OK";
                   document.getElementById('preloadMsg').innerHTML = document.getElementById('preloadMsg').innerHTML + "<br>Recarga de Stock de Lotes OK";
                   //$scope.estadoObteniendo();
                   $rootScope.verLoading_(false, "Obteniendo datos...");
                   $scope.continuarPakingProceso()
                   
               })
               .error(function (datos) {
                   $rootScope.verLoading_(false, "");
                   $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio de Recarga de Lotes');
               })
            }
})
.controller('crtPACK_DescartesP', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('#PACK_Descartes').addClass('animated ' + $routeParams.animacion);
    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
        } else {
            $scope.verPopRespuesta = "none";
        }
    }
    // estableser oculto
    $scope.mostrarRespuesta(false);



    //console.log($rootScope.datosLoteProcesoPaking)

    $rootScope.idxTab = 0;
    $rootScope.countTab = 0;
    $scope.selTab = [];
    $scope.auxKilo = 0;
    $scope.selTab.push({ idx: 0, nombre: "MAT 1", seleccionado: "on" });
    $scope.divDescarteOpcion = "none";
    $scope.divDescarteOpcionNA = "none";

    $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = (parseFloat($rootScope.datosLoteProcesoPaking.LBLAB)).toFixed(3);

    $rootScope.datosLoteProcesoPaking.detalle[0].material = [];

    $rootScope.datosLoteProcesoPaking.detalle[0].kilos = '';

    $scope.selTab[$rootScope.idxTab].seleccionado = "on";
    if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; };

    $scope.pakingTipoMaterialOpciones = [];
    //console.log($rootScope.ZMOV_QUERY_MATERIAL);
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if(value.ZMAT_ESPECIE == "NARANJA")console.log(value);
        if (true
            &&value.ZMAT_ESPECIE == "NARANJA"
            &&value.ZMAT_PROCESO == "PR-DESECHO"
            &&value.ZMAT_VIGENTE == "SI"
            &&value.ZMAT_PROC_NAR == "SI"
                ) {
                $scope.pakingTipoMaterialOpciones.push({ DESCRIPTION: value.MAKTG + '  ' + value.MATNR, VALUE_CHAR: value.MATNR , KILOS:value.NTGEW , MAKTG:value.MAKTG , MATNR:value.MATNR })
            }
        });
    
    $scope.pakingTipoMaterialOpcionesNA = [];
    //console.log($rootScope.getMaterialesDescarte)
    angular.forEach($rootScope.datoTransportistaNA, function (value, key) {
        
                 $scope.pakingTipoMaterialOpcionesNA.push({ VALUE_CHAR: value.VALUE_CHAR, DESCRIPTION: value.DESCRIPTION})
            
            
    });
    $scope.pakingCategoriaOpciones = [];
     angular.forEach($rootScope.ZMOV_QUERY_CATEGORIA, function (value, key) {
        
        if(true
           &&value.ATBEZ==$rootScope.datosExportadora.especie.DESCRIPTION
           ){
                $scope.pakingCategoriaOpciones.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR  })
            }
        });
        //calibre
    $scope.pakingCalibreOpciones=[];
    //console.log($rootScope.calibre);
    angular.forEach($rootScope.ZMOV_QUERY_CALIBRE, function (value, key) {
        if(true
           &&value.ATBEZ==$rootScope.datosExportadora.especie.DESCRIPTION
           ){
                $scope.pakingCalibreOpciones.push({ VALUE_CHAR: value.VALUE_CHAR, DESCRIPTION: value.DESCRIPTION})
           }
    });
    //console.log($scope.pakingTipoMaterialOpciones)
    //$rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].material = null;

    $scope.agregarTab = function () {
        $scope.selTab[$rootScope.idxTab].seleccionado = "off";
        $scope.divDescarteOpcion = "none";
        $rootScope.countTab++;
        $rootScope.idxTab = $rootScope.countTab;
        $scope.selTab.push({ idx: $rootScope.countTab, nombre: "MAT " + ($rootScope.countTab + 1), seleccionado: "on" });
        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; };
        $('#div_tab_DescartePaking').removeClass('animated fadeInUp');
        $('#div_tab_DescartePaking').hide();
        $('#div_tab_DescartePaking').show();
        $('#div_tab_DescartePaking').addClass('animated fadeInUp');
        $scope.auxKilo = 0;
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab] = { material: [], kilos: '', codigoLoteDescarte: '', NOAPTA: { VALUE_CHAR: '', DESCRIPTION: '' } };
    }

    $scope.deshacerTab = function () {
        var aux = 0;
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $scope.selTab[$rootScope.countTab] = [];
        $rootScope.countTab--;
        $scope.selTab[$rootScope.countTab].seleccionado = "on";
        $rootScope.idxTab = $rootScope.countTab;

        if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.countTab].kilos == null) || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.countTab].kilos == '')) {
            $scope.auxKilo = 0;
        } else {
            $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = parseFloat($rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo) + parseFloat($rootScope.datosLoteProcesoPaking.detalle[$rootScope.countTab].kilos);
        }

        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }
        $('#div_tab_DescartePaking').removeClass('animated fadeInUp');
        $('#div_tab_DescartePaking').hide();
        $('#div_tab_DescartePaking').show();
        $('#div_tab_DescartePaking').addClass('animated fadeInUp');
        $scope.selTab.pop();
        $scope.auxKilo = 0;
        $scope.controlDescarte();
    }

    $scope.irAlTab = function (idx) {
        var aux = 0;
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $rootScope.idxTab = idx;
        $scope.selTab[idx].seleccionado = "on";
        $('#div_tab_DescartePaking').removeClass('animated fadeInUp');
        $('#div_tab_DescartePaking').hide();
        $('#div_tab_DescartePaking').show();
        $('#div_tab_DescartePaking').addClass('animated fadeInUp');
        $scope.auxKilo = 0;
        $scope.controlDescarte();


    }

    $scope.controlDescarte = function () {
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].material == undefined) { $scope.divDescarteOpcion = "none"; return 0;}
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].material.BISMT == "DESCARTE") {
            $scope.divDescarteOpcion = "block";
            if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].material.MATNR == "FRUTA_NO_APTA_PROC") {
                $scope.divDescarteOpcionNA = "block";
            } else {
                $scope.divDescarteOpcionNA = "none";
            }

        } else {
            $scope.divDescarteOpcion = "none";
        }
    }

    $scope.recalculaDescartes = function () {
        var kilo = 0;
        //for (inx = 0; inx < $rootScope.countTab; inx++) {
        try {
            if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].kilos) == null) {
                kilo = 0;
            } else {
                kilo = parseFloat($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].kilos);
            }//suma = suma + tem;
        } catch (e) {
            //suma = suma + 0;
            kilo = 0.0;
        }
        //}
        //var kgLoteProceso = parseFloat($rootScope.datosLoteProcesoPaking.LBLAB);
        var nuevoKgLoteProceso = ($rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo - kilo) + $scope.auxKilo;
        if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].kilos == null) || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].kilos == '')) {
            $scope.auxKilo = 0;
        } else {
            $scope.auxKilo = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].kilos;
        }

        $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = nuevoKgLoteProceso.toFixed(3);

        if (nuevoKgLoteProceso < 0) {
            $scope.mostrarAlerta(true, 'Advertencia', 'Supera los kilos');
        }
    }



    $scope.generaXML_Descartes = function () {
        try {
            if ($rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo < 0) {
                $scope.mostrarAlerta(true, 'Advertencia', 'Supera los kilos');; return 0;
            }
        } catch (e) {
            $scope.mostrarAlerta(true, 'Advertencia', 'Error en los cálculos de los kilos');; return 0;
        }
        
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            console.log($rootScope.datosLoteProcesoPaking.detalle[inx].kilos,$rootScope.datosLoteProcesoPaking.detalle[inx].material)
            if(isNaN($rootScope.datosLoteProcesoPaking.detalle[inx].kilos)|| $rootScope.datosLoteProcesoPaking.detalle[inx].kilos =='' ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].material.MATNR == undefined 
                ){
                $scope.mostrarAlerta(true, 'Advertencia', 'Faltan campos para el envio'); return 0;
            }
        }
        $rootScope.antiRefrescar();
        $rootScope.blockReEnvio = 1;
        document.getElementById('btnContinuar_').style.display = 'none';
        //$scope.btnGeneraXML = 'none';
        //document.getElementById('btnError').style.display = 'none';
        //document.getElementById('popRespuestaLotesPaking').innerHTML = '';
        //$('#cargandoPopLotesPaking').show();
        //document.getElementById('loadingLotesPaking').style.display = 'block';
        $scope.mostrarRespuesta(true);


        console.log("DATOS_______")
        console.log($rootScope.datoProductorDetalle)
        console.log($rootScope.datosLoteProcesoPaking)
        console.log($rootScope.datoUsuario)
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_RECEP_PROCESO_NARA>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HEADER>';
        cadenaXML += '               <tem:BUKRS>' + $rootScope.datoUsuario.sociedad  + '</tem:BUKRS>'; // sociedad usuario
        cadenaXML += '               <tem:EKORG>'+ $rootScope.datoUsuario.organizacion +'</tem:EKORG>'; // en duro
        cadenaXML += '               <tem:EKGRP>'+ $rootScope.datoUsuario.grupoCompra +'</tem:EKGRP>';// grupo compra
        cadenaXML += '               <tem:BSART>'+ $rootScope.datoUsuario.clasePedido +'</tem:BSART>';// clase pedido
        cadenaXML += '               <tem:BUDAT>'+ $rootScope.datosLoteProcesoPaking.selFechaContabilizacion.value +'</tem:BUDAT>';//
        cadenaXML += '               <tem:LIFNR>'+ $rootScope.datosLoteProcesoPaking.LIFNR +'</tem:LIFNR>';//
        cadenaXML += '               <tem:XBLNR>'+ $rootScope.datosLoteProcesoPaking.pakingGuia +'</tem:XBLNR>';// guia de despacho
        cadenaXML += '               <tem:BKTXT>'+ $rootScope.datoUsuario.usuario +'</tem:BKTXT>';// usuario
        cadenaXML += '            </tem:HEADER>';
        cadenaXML += '            <tem:ITEM_NARANJA>';
        //<!--Zero or more repetitions:-->
        console.log($rootScope.datosLoteProcesoPaking.detalle)
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            cadenaXML += '               <tem:ZMOV_CREATE_RECEP_PROCESO_NARA_ITEM_NARANJA>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosLoteProcesoPaking.detalle[inx].material.MATNR + '</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH>' + angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking) + '</tem:BATCH>';
          //cadenaXML += '                  <tem:QUANTITY>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos.toString().split(".").join(",") +'</tem:QUANTITY>';
            cadenaXML += '                  <tem:QUANTITY>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].kilos +'</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT>CS</tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>'+ $rootScope.datosLoteProcesoPaking.selFechaContabilizacion.value +'</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>'+ $rootScope.datoUsuario.centro +'</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>'+ $rootScope.datoUsuario.almacenFumigacion +'</tem:STGE_LOC>';
            cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
            cadenaXML += '                  <tem:BATCH_GRANEL>'+ angular.uppercase($rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking) +'</tem:BATCH_GRANEL>';//lote existente
            cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD +'</tem:ZNARANJA_VARIEDAD>';
            cadenaXML += '                  <tem:ZCATEGORIA>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD +'</tem:ZCATEGORIA>';
            cadenaXML += '                  <tem:ZCALIBRE>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].calibre +'</tem:ZCALIBRE>'; // campos agregar a otros html numExportacion
            cadenaXML += '                  <tem:ZNUM_PLU>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZNUM_PLU +'</tem:ZNUM_PLU>';
            cadenaXML += '                  <tem:ZPLU>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZPLU +'</tem:ZPLU>';
            cadenaXML += '                  <tem:ZETIQUETADO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZETIQUETADO +'</tem:ZETIQUETADO>';
            cadenaXML += '                  <tem:ZQUIMICO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZQUIMICO +'</tem:ZQUIMICO>';
            cadenaXML += '                  <tem:ZNUM_EXPO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].numExportacion +'</tem:ZNUM_EXPO>'
            
            //cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD +'</tem:ZNARANJA_VARIEDAD>';
            //cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNARANJA_VARIEDAD>';
           
            /*
            cadenaXML += '                  <tem:BATCH_GRANEL>'+ angular.uppercase($rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking) +'</tem:BATCH_GRANEL>';//lote existente
            cadenaXML += '                  <tem:ZNUEZ_CALIBRE>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].calibre.VALUE_CHAR +'</tem:ZNUEZ_CALIBRE>'; // campos agregar a otros html numExportacion
            cadenaXML += '                  <tem:ZNUEZ_NUMEXPORTA>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].numExportacion +'</tem:ZNUEZ_NUMEXPORTA>';
            cadenaXML += '                  <tem:ZNUEZ_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNUEZ_VARIEDAD>';
            */
                    
            cadenaXML += '               </tem:ZMOV_CREATE_RECEP_PROCESO_NARA_ITEM_NARANJA>';
        }
        cadenaXML += '            </tem:ITEM_NARANJA>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_RECEP_PROCESO_NARA>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';

        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);
        if ($rootScope.datoUsuario.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', 'http://' + IPSERVER + '/'+RUTASERVER+'/rfcNET.asmx', true);
            // build SOAP request
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {


                    if (xmlhttp.status == 200) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingLotesPaking').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='UTF-8' standalone='no' ?>").join("");
                        var xmlData = $.parseXML(print);
                        var parser = new DOMParser();
                        var docXml = parser.parseFromString(print, "text/xml");  
                        console.log(docXml.firstChild);
                        try {
                            var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
                            mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta1 = 'NO HAY MATERIAL DOCUMENT (ERROR)';
                        }
                        try {
                            var thirdPartyNode = $(xmlData).find("MESSAGE")[0];
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta2 = 'NO HAY MENSAJES';
                        }
                        document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Mensajes:</h1><p>' + mensajeRespuesta2 + '</p></div>';
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
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            $scope.btnContinuar = false;
            document.getElementById('loadingLotesPaking').style.display = 'none';
            document.getElementById('popRespuestaLotesPaking').innerHTML = "DATOS DEMOS CORRECTOS";
            $('#cargandoDatosSAP').hide('fade');
        }
    }

    /*$scope.codearLote = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('codigoLoteDescarte').value = result.text;
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].codigoLoteDescarte = result.text;
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }*/
    
     $scope.continuarPakingProceso = function () {
                $rootScope.verLoading_(true, "Obteniendo datos...");
                
                            var CHARG = $rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking;
                            var LIFNR;
                            var nombreProductor = null;
                            var var_LBLAB  ="";
                            var var_VARIEDAD = "";
                            var var_nombreProductor = "";
                            angular.forEach($rootScope.stockSubCat, function (value, key) {
                                    if (CHARG == value.CHARG) {
                                        nombreProductor = value.LIFNR;
                                        if(isNaN(parseInt(value.LIFNR)))
                                                LIFNR=value.LIFNR;
                                        else
                                                LIFNR=parseInt(value.LIFNR);
                                        var_LBLAB = value.LBLAB
                                        var_VARIEDAD = value.VARIEDAD;
                                        var_nombreProductor=value.LIFNR;
                                        angular.forEach($rootScope.productores, function (value2, key2) {
                                                if(Number(value.LIFNR) == value2.LIFNR){
                                                        var_nombreProductor = value2.nombre;
                                                }
                                        })
                                    }
                            });
                            if (nombreProductor == null){
                                    $rootScope.verLoading_(false, "");
                                    $scope.navegacionPagina('menuPrincipal', 'fadeInRight', '');
                                    $('#btnError').css('display','inline')
                                    $('#btnContinuar_').css('display','none')
                            }else{
                                    $rootScope.datosLoteProcesoPaking = {
                                            LBLAB: var_LBLAB,//kilos
                                            LIFNR: var_nombreProductor,
                                            VARIEDAD: var_VARIEDAD,
                                            nombreProductor: var_nombreProductor,
                                            codigoProductor: LIFNR,
                                            selFechaContabilizacion: $rootScope.datosLoteProcesoPaking.selFechaContabilizacion,
                                            pakingGuia: "",
                                            embalajeLoteProcesoPaking: $rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking,
                                            detalle: [
                                                {material: [], kilos: "", codigoLoteDescarte: "", NOAPTA: {VALUE_CHAR: '', DESCRIPTION: ''},
                                                VARIEDAD:'',
                                                fechaEmbalagePakingTab:'',
                                                fechaEmbalagePakingTabx:'',
                                                numExportacion:''
                                                },
                                            ],
                                            ctrContin: 1,
                                            pakingGuia: $rootScope.datosLoteProcesoPaking.pakingGuia,
                                            
                                    };
                                    $scope.navegacionPagina('PACK_FiltroProductor'+$rootScope.controllerMenu, 'fadeInRight', '');
                           
                }
            }
            $scope.recargaStock = function(){
                $rootScope.verLoading_(true, "Obteniendo datos...");
                    //Stock sub cat
                $rootScope.stockSubCat=[];
                dataFactory.getDatos('ZMOV_QUERY_STOCKSUBC','')
               .success(function (datos) {
                   angular.forEach(datos.STOCKSUBC, function (value, key) {
                       var jsonArg = new Object();
                       jsonArg.WERKS = value.WERKS;
                       jsonArg.LIFNR = value.LIFNR;
                       jsonArg.codigo = value.CHARG;
                       jsonArg.LBLAB = value.LBLAB;//kilos
                       jsonArg.nombre = value.MAKTX;
                       jsonArg.MEINS = value.MEINS;
                       jsonArg.HSDAT = value.HSDAT;
                       jsonArg.VARIEDAD = value.VARIEDAD;
                       jsonArg.GUIA = value.GUIA;
                       jsonArg.CHARG = value.CHARG;
                       $rootScope.stockSubCat.push(jsonArg);
                   });
                   //console.log("Obtiene variedades OK:");
                   //$scope.preloadMsg = $scope.preloadMsg+ "<br>Obtiene variedades OK";
                   document.getElementById('preloadMsg').innerHTML = document.getElementById('preloadMsg').innerHTML + "<br>Recarga de Stock de Lotes OK";
                   //$scope.estadoObteniendo();
                   $rootScope.verLoading_(false, "Obteniendo datos...");
                   $scope.continuarPakingProceso()
                   
               })
               .error(function (datos) {
                   $rootScope.verLoading_(false, "");
                   $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio de Recarga de Lotes');
               })
            }

})
.controller('ctrPACK_TrazabilidadP', function ($scope, $routeParams, $rootScope, dataFactory, localidadFactory) {
    $('#PACK_Trazabilidad').addClass('animated ' + $routeParams.animacion);
    $scope.accion = $routeParams.sid;

    $(function () {
        $("#selDatosTrazabilidad_FechaSag").datepicker({ dateFormat: 'yy-mm-dd' });
    });
    document.getElementById('selDatosTrazabilidad_FechaSag').value = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selDatosTrazabilidad_FechaSag;

    // actualiza cer-ocuñtar PTI-LIDL
    $scope.verPTILIDL = function () {
        if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.ZMAT_PTI == '') || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.ZMAT_PTI == 'NO')) {
            $scope.divCEPTI = 'none';
        } else {
            $scope.divCEPTI = 'block';
        }
        if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.ZMAT_LIDL == '') || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.ZMAT_LIDL == 'NO')) {
            $scope.divCELIDL = 'none';
        } else {
            $scope.divCELIDL = 'block';
        }
    }

    $scope.verPTILIDL();
    $scope.trazabilidadEmbalajeTab1 = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.descripcion;
    $scope.trazabilidadMercadoTab1 = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.mercado;
    $scope.trazabilidadLoteTab1 = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.codMaterial;

    $scope.region = localidadFactory.getRegion();
    //console.log($scope.region)
    // Regiones
    $scope.trazabilidadProRegionTabOpciones = [];
    $scope.trazabilidadPacRegionTabOpciones = [];
    angular.forEach($scope.region, function (value, key) {
        $scope.trazabilidadProRegionTabOpciones.push({ value: value.idx, name: value.region })
        $scope.trazabilidadPacRegionTabOpciones.push({ value: value.idx, name: value.region })
    });
    //console.log($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProRegionTab)

    // cargar provincias segun region seleccionada
    $scope.getProvinciaPro = function (id) {
        if (id != undefined) {
            $scope.provincia = localidadFactory.filProvincia(id.value);
            $scope.trazabilidadProProvinciaTabOpciones = [];
            angular.forEach($scope.provincia, function (value, key) {
                $scope.trazabilidadProProvinciaTabOpciones.push({ value: value.idProvincia, name: value.nombre })
            });
        }
    }
    $scope.getProvinciaPac = function (id) {
        if (id != undefined) {
            $scope.provincia = localidadFactory.filProvincia(id.value);
            $scope.trazabilidadPacProvinciaTabOpciones = [];
            angular.forEach($scope.provincia, function (value, key) {
                $scope.trazabilidadPacProvinciaTabOpciones.push({ value: value.idProvincia, name: value.nombre })
            });
        }
    }

    // cargar comunas segun provincias seleccionada
    $scope.getComunaPro = function (id) {
        //console.log(id)
        if (id != undefined) {
            $scope.comuna = localidadFactory.filComuna(id.value);
            $scope.trazabilidadProComunaTabOpciones = [];
            angular.forEach($scope.comuna, function (value, key) {
                $scope.trazabilidadProComunaTabOpciones.push({ value: value.idComuna, name: value.nombre })
            });
        }
    }
    $scope.getComunaPac = function (id) {
        //console.log(id)
        if (id != undefined) {
            $scope.comuna = localidadFactory.filComuna(id.value);
            $scope.trazabilidadPacComunaTabOpciones = [];
            angular.forEach($scope.comuna, function (value, key) {
                $scope.trazabilidadPacComunaTabOpciones.push({ value: value.idComuna, name: value.nombre })
            });
        }
    }


    if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProRegionTab == undefined) || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProRegionTab == null)) { // si datos del tab vacio selecione dafault o el dato correspondiente
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProRegionTab = null;
    } else {
        $scope.getProvinciaPro($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProRegionTab);
        $scope.getComunaPro($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProProvinciaTab);
    }
    if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacRegionTab == undefined) || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacRegionTab == null)) { // si datos del tab vacio selecione dafault o el dato correspondiente
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacRegionTab = null;
    } else {
        $scope.getProvinciaPac($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacRegionTab);
        $scope.getComunaPac($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacProvinciaTab);
    }

    //$scope.verificaRequerimientoMercado(); ya no va nueve version van los 4 sertificados siempre
    $scope.divSDPTab1 = 'block';
    $scope.divCSGTab1 = 'block';
    $scope.divCSPTab1 = 'block';
    $scope.divGGNTab1 = 'block';
    $scope.trazabilidadSinCertificados = 'none';

    $scope.selTab = [];
    //console.log($rootScope.countTab)
    //console.log($rootScope.idxTab)
    //$scope.selTab[$rootScope.idxTab].seleccionado = "on"
    for (i = 0; i <= $rootScope.countTab; i++) {
        $scope.selTab.push({ idx: i, nombre: "TRAZ " + (i + 1), seleccionado: "off" })
    }
    $scope.selTab[$rootScope.idxTab].seleccionado = "on";

    // cambiar de tab
    $scope.irAlTab = function (idx) {
        var aux = 0;
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selDatosTrazabilidad_FechaSag = $('#selDatosTrazabilidad_FechaSag').datepicker({ dateFormat: 'yy-mm-dd' }).val();
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $rootScope.idxTab = idx;
        $scope.selTab[idx].seleccionado = "on";
        $('#div_tab_trazabilidadPaking').removeClass('animated fadeInUp');
        $('#div_tab_trazabilidadPaking').hide();
        $('#div_tab_trazabilidadPaking').show();
        $('#div_tab_trazabilidadPaking').addClass('animated fadeInUp');
        $scope.verPTILIDL();
        document.getElementById('selDatosTrazabilidad_FechaSag').value = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selDatosTrazabilidad_FechaSag;
    }

    $scope.btnContinuar = function () {
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selDatosTrazabilidad_FechaSag = $('#selDatosTrazabilidad_FechaSag').datepicker({ dateFormat: 'yy-mm-dd' }).val();
        $scope.navegacionPagina('PACK_ResumenP', 'fadeInRight', '/' + $scope.accion);
    }


    $scope.btnVolver = function () {
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selDatosTrazabilidad_FechaSag = $('#selDatosTrazabilidad_FechaSag').datepicker({ dateFormat: 'yy-mm-dd' }).val();
        $scope.navegacionPagina('PACK_EmbalajesP', 'fadeInLeft', '/volver')
    }

})

.controller('crtPACK_ResumenP', function ($scope, $routeParams, $rootScope, dataFactory, $templateCache) {
    $('#ctrPACK_Resumen').addClass('animated ' + $routeParams.animacion);
    $templateCache.removeAll();
    $scope.selTab = [];

    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
        } else {
            $scope.verPopRespuesta = "none";
        }
    }
    // estableser oculto
    $scope.mostrarRespuesta(false);



    $scope.irAlTab = function (idx) {
        var aux = 0;
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $rootScope.idxTab = idx;
        $scope.selTab[idx].seleccionado = "on";
        $('#div_tab_resumen').removeClass('animated fadeInUp');
        $('#div_tab_resumen').hide();
        $('#div_tab_resumen').show();
        $('#div_tab_resumen').addClass('animated fadeInUp');
        $scope.compararDatosTab();
    }

    for (i = 0; i <= $rootScope.countTab; i++) {
        $scope.selTab.push({ idx: i, nombre: "RES " + (i + 1), seleccionado: "off", alerta: 'status-alert' });
    }
    $scope.selTab[$rootScope.idxTab].seleccionado = "on";


    $scope.selTab[$rootScope.idxTab].seleccionado = "on";

    $scope.resumenEmbalajeTab1 = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.descripcion;
    $scope.resumenMercadoTab1 = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.mercado;
    //$scope.trazabilidadLoteTab1 = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.codMaterial;

    //  VALIDACION OCMPARACION DE CAMPOS PARA RESALTAR CSS
    $scope.compararDatosTab = function () { // todos los tab
        /*  $('#resumenCabecera').removeClass('embalaje-resumen-erroneo');
	    $('#resumenCabecera').removeClass('embalaje-resumen-ok');
	    $('#status_tab_'+i).removeClass('status-alert');
	    $('#status_tab_'+i).removeClass('status-ok');*/
        $scope.resumenCabecera = 'embalaje-resumen-ok';
        $scope.resumFecha = 'bueno';
        $scope.resumLote = 'bueno';
        $scope.resumCaja = 'bueno';
        $scope.resumVariedad = 'bueno';
        $scope.resumCuertel = 'bueno';
        $scope.resumJuliano = 'bueno';
        $scope.resumKilosPaking = 'bueno';
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-ok', almacen: $rootScope.datoCentro.LGORT_OK, estado: 'A' };

        //Datos del embalaje
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab == "") {
            $scope.resumFecha = 'malo';
            $scope.resumJuliano = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            var ahora = new Date($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab);
            var comienzo = new Date(ahora.getFullYear(), 0, 0);
            var dif = ahora - comienzo;
            var unDia = 1000 * 60 * 60 * 24;
            var diaJuliano = Math.ceil(dif / unDia);
            //console.log("dia Juliano:"+diaJuliano)
            if (diaJuliano != $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selDatosTrazabilidad_FechaJuliana) {
                $scope.resumJuliano = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }

        }
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajeLotePakingTab == '') {
            $scope.resumLote = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        }
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajeCajaPaking == '') {
            $scope.resumCaja = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        }
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selCuartelTab == '') {
            $scope.resumCuertel = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        }


        if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajePakingBarTab == 'FFA0130') || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajePakingBarTab == 'FFA0330')) {
            $scope.selKilosDivPakingTab = "block";
            if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].embalajeKilosPaking == '') {
                $scope.resumKilosPaking = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        }
        } else {
            $scope.selKilosDivPakingTab = "none";
        }


        


        //Validacion requerimiento del mercado (certificados)
        $scope.resumSDP = 'bueno';
        $scope.resumCSG = 'bueno';
        $scope.resumCSP = 'bueno';
        $scope.resumGGN = 'bueno';
        //console.log($rootScope.datosLoteProcesoPaking.detalle)
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selSDP == "") {
            $scope.resumSDP = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selSDP == $rootScope.datoProductorDetalle.ZPRD_SDP) {
                $scope.resumSDP = 'bueno';
            } else {
                $scope.resumSDP = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selCSG == "") {
            $scope.resumCSG = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selCSG == $rootScope.datoProductorDetalle.ZPRD_CSG) {
                $scope.resumCSG = 'bueno';
            } else {
                $scope.resumCSG = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selCSP == "") {
            $scope.resumCSP = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selCSP == $rootScope.datoCentro.SORT2) {
                $scope.resumCSP = 'bueno';
            } else {
                $scope.resumCSP = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selGGN == "") {
            $scope.resumGGN = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selGGN == $rootScope.datoProductorDetalle.ZPRD_GGN) {
                $scope.resumGGN = 'bueno';
            } else {
                $scope.resumGGN = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        // validacion localidad, productor y paking       
        $scope.ProRegion = 'bueno';
        $scope.ProProvincia = 'bueno';
        $scope.ProComuna = 'bueno';
        $scope.PacRegion = 'bueno';
        $scope.PacProvincia = 'bueno';
        $scope.PacComuna = 'bueno';
        //console.log($rootScope.datoCentro);
        // region priductor
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProRegionTab == null) {
            $scope.ProRegion = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            if ($rootScope.comparaRegion($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProRegionTab.value, $rootScope.datoProductorDetalle.REGIO) == 0) {
                $scope.ProRegion = 'bueno';
            } else {
                $scope.ProRegion = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        //provincia productor
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProProvinciaTab == null) {
            $scope.ProProvincia = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            if ($rootScope.comparaCadenas($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProProvinciaTab.name, $rootScope.datoProductorDetalle.NAME4) == 0) {
                $scope.ProProvincia = 'bueno';
            } else {
                $scope.ProProvincia = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        // comuna productor
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProComunaTab == null) {
            $scope.ProComuna = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            if ($rootScope.comparaCadenas($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadProComunaTab.name, $rootScope.datoProductorDetalle.ORT02) == 0) {
                $scope.ProComuna = 'bueno';
            } else {
                $scope.ProComuna = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        // reguin centro paking
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacRegionTab == null) {
            $scope.PacRegion = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            if ($rootScope.comparaRegion($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacRegionTab.value, $rootScope.datoCentro.REGIO) == 0) {
                $scope.PacRegion = 'bueno';
            } else {
                $scope.PacRegion = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        //provincia centro paking
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacProvinciaTab == null) {
            $scope.PacProvincia = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            if ($rootScope.comparaCadenas($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacProvinciaTab.name, $rootScope.datoCentro.NAME4) == 0) {
                $scope.PacProvincia = 'bueno';
            } else {
                $scope.PacProvincia = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        // comuna centro paking
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacComunaTab == null) {
            $scope.PacComuna = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        } else {
            if ($rootScope.comparaCadenas($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].trazabilidadPacComunaTab.name, $rootScope.datoCentro.CITY2) == 0) {
                $scope.PacComuna = 'bueno';
            } else {
                $scope.PacComuna = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        // requerimiento del cliente, check vista filtro productor
        $scope.resumFechaSAG = 'bueno';
        $scope.resumLIDL = 'bueno';
        $scope.resumPTI = 'bueno';
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selDatosTrazabilidad_FechaSag == "") {
            $scope.resumFechaSAG = 'malo';
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
        }

        if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.ZMAT_PTI == '') || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.ZMAT_PTI == 'NO')) {
            $scope.divCEPTI = 'none';
        } else {
            $scope.divCEPTI = 'block';
            if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selDatosTrazabilidad_PTI == "") {
                $scope.resumPTI = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }
        if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.ZMAT_LIDL == '') || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selMercadoPakingTab.ZMAT_LIDL == 'NO')) {
            $scope.divCELIDL = 'none';
        } else {
            $scope.divCELIDL = 'block';
            if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].selDatosTrazabilidad_LIDL == "") {
                $scope.resumLIDL = 'malo';
                $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado = { css: 'embalaje-resumen-erroneo', almacen: $rootScope.datoCentro.LGORT_NOK, estado: 'O' };
            }
        }

        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].estado.estado == "O") {
            $scope.selTab[$rootScope.idxTab] = { idx: $rootScope.idxTab, nombre: "RES " + ($rootScope.idxTab + 1), seleccionado: "on", alerta: 'status-alert' };
        } else {
            $scope.selTab[$rootScope.idxTab] = { idx: $rootScope.idxTab, nombre: "RES " + ($rootScope.idxTab + 1), seleccionado: "on", alerta: 'status-ok' };
        }
    }


    // recorrer y validar todos los tab
    // recorrer y validar todos los tab
    for (i = 0; i <= $rootScope.countTab; i++) {
        $scope.irAlTab(i)
    }
    $scope.irAlTab($rootScope.idxTab);


    $scope.compararDatosTab();

    $scope.generaXML = function () {

        document.getElementById('btnContinuar_').style.display = 'none';
        $scope.btnGeneraXML = 'none';
        document.getElementById('btnError').style.display = 'none';
        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
        $('#cargandoDatosSAP').show();
        $scope.mostrarRespuesta(true);

        console.log('______DATOS__________');
        console.log($rootScope.datoProductorDetalle);
        console.log($rootScope.datosLoteProcesoPaking);
        console.log($rootScope.datoCentro);
        var auxBUDAT;
        try {
            auxBUDAT = $rootScope.datosLoteProcesoPaking.selFechaContabilizacion.name;
        } catch (e) {
            auxBUDAT = "";
        }



        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '    <soapenv:Header/>';
        cadenaXML += '    <soapenv:Body>';
        cadenaXML += '      <tem:ZXPI_RECEPCION_PROCESO>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HEADER>';
        cadenaXML += '               <tem:LIFNR>' + Number($rootScope.datoProductorDetalle.LIFNR) + '</tem:LIFNR>';
        cadenaXML += '               <tem:BUDAT>' + auxBUDAT + '</tem:BUDAT>';
        cadenaXML += '               <tem:XBLNR>' + $rootScope.datosLoteProcesoPaking.pakingGuia + '</tem:XBLNR>';
        cadenaXML += '               <tem:BKTXT>TABLET</tem:BKTXT>';// esta fijo
        cadenaXML += '            </tem:HEADER>';
        cadenaXML += '            <tem:ZXPI_ITEM_GR>';
        //<!--Zero or more repetitions:-->
        //console.log($rootScope.countTab)
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            //console.log($rootScope.datosLoteProcesoPaking.detalle[inx])
            cadenaXML += '               <tem:ZXPI_RECEPCION_PROCESO_ZXPI_ITEM_GR>';
            cadenaXML += '                  <tem:ITEM_CAT></tem:ITEM_CAT>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '                  <tem:MATERIAL>' + angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[inx].embalajePakingBarTab) + '</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH>' + angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[inx].embalajeLotePakingTab) + '</tem:BATCH>';
            cadenaXML += '                  <tem:QUANTITY>' + $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeCajaPaking + '</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT>CJ</tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>' + $rootScope.datosLoteProcesoPaking.detalle[inx].fechaEmbalagePakingTab + '</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>' + $rootScope.datoCentro.WERKS + '</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>' + $rootScope.datosLoteProcesoPaking.detalle[inx].estado.almacen + '</tem:STGE_LOC>';
            cadenaXML += '                  <tem:VARIEDAD>' + $rootScope.buscaCodigoVariedad2($rootScope.datosLoteProcesoPaking.detalle[inx].selVariedadPakingTab) + '</tem:VARIEDAD>';
            cadenaXML += '                  <tem:CUARTEL>' + angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[inx].selCuartelTab) + '</tem:CUARTEL>';
            cadenaXML += '                  <tem:ESTADO_REC>' + $rootScope.datosLoteProcesoPaking.detalle[inx].estado.estado + '</tem:ESTADO_REC>';
            cadenaXML += '                  <tem:BATCH_GRANEL>' + angular.uppercase($rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking) + '</tem:BATCH_GRANEL>';
            cadenaXML += '               </tem:ZXPI_RECEPCION_PROCESO_ZXPI_ITEM_GR>';
            //<!--Zero or more repetitions:-->
        }
        cadenaXML += '            </tem:ZXPI_ITEM_GR>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZXPI_RECEPCION_PROCESO>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        console.log(cadenaXML)

        /// VALIDAR ENVIO POR USUARIO DEMO OFLINE
        if ($rootScope.datoUsuario.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', 'http://' + IPSERVER + '/'+RUTASERVER+'/rfcNET.asmx', true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingCajaEmabalda').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');

                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        var xmlData = $.parseXML(print);
                        var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
                        var mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        var thirdPartyNode = $(xmlData).find("CONSUMOMAT")[0]; //CONSUMOMAT
                        var mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        var thirdPartyNode = $(xmlData).find("MESSAGE")[0]; //MESSAGE
                        var mensajeRespuesta3 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Consumo Material:</h1> <p>' + mensajeRespuesta2 + '</p><h1>Mensajes:</h1><p>' + mensajeRespuesta3 + '</p></div>';

                    }
                    if (xmlhttp.status == 500) {
                        document.getElementById('loadingCajaEmabalda').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        document.getElementById('btnError').style.display = 'block';
                        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = 'El servidor rechazó recepción de datos!'
                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            document.getElementById('loadingCajaEmabalda').style.display = 'none';
            document.getElementById('btnContinuar_').style.display = 'block';
            $('#cargandoDatosSAP').hide('fade');
            document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = "DATOS DEMOS CORRECTOS";
        }

    }



    $scope.btnAceptar = function () {
        //avanzar('','StockAlmacen','fadeInRight');
        $scope.btnGeneraXML = 'block';
        $scope.navegacionPagina('PACK_Contabilizar', 'fadeInRight', '');
    }



})
.controller('crtPACK_MermaP', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('#PACK_Descartes').addClass('animated ' + $routeParams.animacion);
    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
        } else {
            $scope.verPopRespuesta = "none";
        }
    }
    // estableser oculto
    $scope.mostrarRespuesta(false);



    //console.log($rootScope.datosLoteProcesoPaking)

    $rootScope.idxTab = 0;
    $rootScope.countTab = 0;
    $scope.selTab = [];
    $scope.auxKilo = 0;
    $scope.selTab.push({ idx: 0, nombre: "MAT 1", seleccionado: "on" });
    $scope.divDescarteOpcion = "none";
    $scope.divDescarteOpcionNA = "none";

    $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = (parseFloat($rootScope.datosLoteProcesoPaking.LBLAB)).toFixed(3);

    $rootScope.datosLoteProcesoPaking.detalle[0].material = [];

    $rootScope.datosLoteProcesoPaking.detalle[0].kilos = '';

    $scope.selTab[$rootScope.idxTab].seleccionado = "on";
    if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; };

    $scope.pakingTipoMaterialOpciones = [];
    //console.log($rootScope.ZMOV_QUERY_MATERIAL);
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if(value.ZMAT_ESPECIE == "NARANJA")console.log(value);
        if (true
            &&value.ZMAT_ESPECIE == "NARANJA"
            &&value.ZMAT_PROCESO == "PR-MERMA"
            &&value.ZMAT_VIGENTE == "SI"
            &&value.ZMAT_PROC_NAR == "SI"
                ) {
                $scope.pakingTipoMaterialOpciones.push({ DESCRIPTION: value.MAKTG + '  ' + value.MATNR, VALUE_CHAR: value.MATNR , KILOS:value.NTGEW , MAKTG:value.MAKTG , MATNR:value.MATNR })
            }
        });
    
    $scope.pakingTipoMaterialOpcionesNA = [];
    //console.log($rootScope.getMaterialesDescarte)
    angular.forEach($rootScope.datoTransportistaNA, function (value, key) {
        
                 $scope.pakingTipoMaterialOpcionesNA.push({ VALUE_CHAR: value.VALUE_CHAR, DESCRIPTION: value.DESCRIPTION})
            
            
    });
    $scope.pakingCalibreOpciones=[];
    console.log($rootScope.calibre);
    angular.forEach($rootScope.calibre, function (value, key) {
        
                $scope.pakingCalibreOpciones.push({ VALUE_CHAR: value.codigo, DESCRIPTION: value.nombre})
            
    });
    //console.log($scope.pakingTipoMaterialOpciones)
    //$rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].material = null;

    $scope.agregarTab = function () {
        $scope.selTab[$rootScope.idxTab].seleccionado = "off";
        $scope.divDescarteOpcion = "none";
        $rootScope.countTab++;
        $rootScope.idxTab = $rootScope.countTab;
        $scope.selTab.push({ idx: $rootScope.countTab, nombre: "MAT " + ($rootScope.countTab + 1), seleccionado: "on" });
        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; };
        $('#div_tab_DescartePaking').removeClass('animated fadeInUp');
        $('#div_tab_DescartePaking').hide();
        $('#div_tab_DescartePaking').show();
        $('#div_tab_DescartePaking').addClass('animated fadeInUp');
        $scope.auxKilo = 0;
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab] = { material: [], kilos: '', codigoLoteDescarte: '', NOAPTA: { VALUE_CHAR: '', DESCRIPTION: '' } };
    }

    $scope.deshacerTab = function () {
        var aux = 0;
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $scope.selTab[$rootScope.countTab] = [];
        $rootScope.countTab--;
        $scope.selTab[$rootScope.countTab].seleccionado = "on";
        $rootScope.idxTab = $rootScope.countTab;

        if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.countTab].kilos == null) || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.countTab].kilos == '')) {
            $scope.auxKilo = 0;
        } else {
            $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = parseFloat($rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo) + parseFloat($rootScope.datosLoteProcesoPaking.detalle[$rootScope.countTab].kilos);
        }

        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }
        $('#div_tab_DescartePaking').removeClass('animated fadeInUp');
        $('#div_tab_DescartePaking').hide();
        $('#div_tab_DescartePaking').show();
        $('#div_tab_DescartePaking').addClass('animated fadeInUp');
        $scope.selTab.pop();
        $scope.auxKilo = 0;
        $scope.controlDescarte();
    }

    $scope.irAlTab = function (idx) {
        var aux = 0;
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $rootScope.idxTab = idx;
        $scope.selTab[idx].seleccionado = "on";
        $('#div_tab_DescartePaking').removeClass('animated fadeInUp');
        $('#div_tab_DescartePaking').hide();
        $('#div_tab_DescartePaking').show();
        $('#div_tab_DescartePaking').addClass('animated fadeInUp');
        $scope.auxKilo = 0;
        $scope.controlDescarte();


    }

    $scope.controlDescarte = function () {
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].material == undefined) { $scope.divDescarteOpcion = "none"; return 0;}
        if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].material.BISMT == "DESCARTE") {
            $scope.divDescarteOpcion = "block";
            if ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].material.MATNR == "FRUTA_NO_APTA_PROC") {
                $scope.divDescarteOpcionNA = "block";
            } else {
                $scope.divDescarteOpcionNA = "none";
            }

        } else {
            $scope.divDescarteOpcion = "none";
        }
    }

    $scope.recalculaDescartes = function () {
        var kilo = 0;
        //for (inx = 0; inx < $rootScope.countTab; inx++) {
        try {
            if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].kilos) == null) {
                kilo = 0;
            } else {
                kilo = parseFloat($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].kilos);
            }//suma = suma + tem;
        } catch (e) {
            //suma = suma + 0;
            kilo = 0.0;
        }
        //}
        //var kgLoteProceso = parseFloat($rootScope.datosLoteProcesoPaking.LBLAB);
        var nuevoKgLoteProceso = ($rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo - kilo) + $scope.auxKilo;
        if (($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].kilos == null) || ($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].kilos == '')) {
            $scope.auxKilo = 0;
        } else {
            $scope.auxKilo = $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].kilos;
        }

        $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = nuevoKgLoteProceso.toFixed(3);

        if (nuevoKgLoteProceso < 0) {
            $scope.mostrarAlerta(true, 'Advertencia', 'Supera los kilos');
        }
    }



    $scope.generaXML_Descartes = function () {
        try {
            if ($rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo < 0) {
                $scope.mostrarAlerta(true, 'Advertencia', 'Supera los kilos');; return 0;
            }
        } catch (e) {
            $scope.mostrarAlerta(true, 'Advertencia', 'Error en los cálculos de los kilos');; return 0;
        }
        
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            console.log($rootScope.datosLoteProcesoPaking.detalle[inx].kilos,$rootScope.datosLoteProcesoPaking.detalle[inx].material)
            if(isNaN($rootScope.datosLoteProcesoPaking.detalle[inx].kilos)|| $rootScope.datosLoteProcesoPaking.detalle[inx].kilos =='' ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].material.MATNR == undefined 
                ){
                $scope.mostrarAlerta(true, 'Advertencia', 'Faltan campos para el envio'); return 0;
            }
        }
        $rootScope.antiRefrescar();
        $rootScope.blockReEnvio = 1;
        document.getElementById('btnContinuar_').style.display = 'none';
        //$scope.btnGeneraXML = 'none';
        //document.getElementById('btnError').style.display = 'none';
        //document.getElementById('popRespuestaLotesPaking').innerHTML = '';
        //$('#cargandoPopLotesPaking').show();
        //document.getElementById('loadingLotesPaking').style.display = 'block';
        $scope.mostrarRespuesta(true);


        console.log("DATOS_______")
        console.log($rootScope.datoProductorDetalle)
        console.log($rootScope.datosLoteProcesoPaking)
        console.log($rootScope.datoUsuario)
       var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_RECEP_PROCESO_NARA>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HEADER>';
        cadenaXML += '               <tem:BUKRS>' + $rootScope.datoUsuario.sociedad  + '</tem:BUKRS>'; // sociedad usuario
        cadenaXML += '               <tem:EKORG>'+ $rootScope.datoUsuario.organizacion +'</tem:EKORG>'; // en duro
        cadenaXML += '               <tem:EKGRP>'+ $rootScope.datoUsuario.grupoCompra +'</tem:EKGRP>';// grupo compra
        cadenaXML += '               <tem:BSART>'+ $rootScope.datoUsuario.clasePedido +'</tem:BSART>';// clase pedido
        cadenaXML += '               <tem:BUDAT>'+ $rootScope.datosLoteProcesoPaking.selFechaContabilizacion.value +'</tem:BUDAT>';//
        cadenaXML += '               <tem:LIFNR>'+ $rootScope.datosLoteProcesoPaking.LIFNR +'</tem:LIFNR>';//
        cadenaXML += '               <tem:XBLNR>'+ $rootScope.datosLoteProcesoPaking.pakingGuia +'</tem:XBLNR>';// guia de despacho
        cadenaXML += '               <tem:BKTXT>'+ $rootScope.datoUsuario.usuario +'</tem:BKTXT>';// usuario
        cadenaXML += '            </tem:HEADER>';
        cadenaXML += '            <tem:ITEM_NARANJA>';
        //<!--Zero or more repetitions:-->
        console.log($rootScope.datosLoteProcesoPaking.detalle)
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            cadenaXML += '               <tem:ZMOV_CREATE_RECEP_PROCESO_NARA_ITEM_NARANJA>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosLoteProcesoPaking.detalle[inx].material.MATNR + '</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH>' + angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking) + '</tem:BATCH>';
          //cadenaXML += '                  <tem:QUANTITY>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos.toString().split(".").join(",") +'</tem:QUANTITY>';
            cadenaXML += '                  <tem:QUANTITY>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].kilos +'</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT>CS</tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>'+ $rootScope.datosLoteProcesoPaking.selFechaContabilizacion.value +'</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>'+ $rootScope.datoUsuario.centro +'</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>'+ $rootScope.datoUsuario.almacenFumigacion +'</tem:STGE_LOC>';
            cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
            cadenaXML += '                  <tem:BATCH_GRANEL>'+ angular.uppercase($rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking) +'</tem:BATCH_GRANEL>';//lote existente
            cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD +'</tem:ZNARANJA_VARIEDAD>';
            cadenaXML += '                  <tem:ZCATEGORIA>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD +'</tem:ZCATEGORIA>';
            cadenaXML += '                  <tem:ZCALIBRE>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].calibre +'</tem:ZCALIBRE>'; // campos agregar a otros html numExportacion
            cadenaXML += '                  <tem:ZNUM_PLU>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZNUM_PLU +'</tem:ZNUM_PLU>';
            cadenaXML += '                  <tem:ZPLU>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZPLU +'</tem:ZPLU>';
            cadenaXML += '                  <tem:ZETIQUETADO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZETIQUETADO +'</tem:ZETIQUETADO>';
            cadenaXML += '                  <tem:ZQUIMICO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZQUIMICO +'</tem:ZQUIMICO>';
            cadenaXML += '                  <tem:ZNUM_EXPO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].numExportacion +'</tem:ZNUM_EXPO>'
            
            //cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD +'</tem:ZNARANJA_VARIEDAD>';
            //cadenaXML += '                  <tem:ZNARANJA_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNARANJA_VARIEDAD>';
           
            /*
            cadenaXML += '                  <tem:BATCH_GRANEL>'+ angular.uppercase($rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking) +'</tem:BATCH_GRANEL>';//lote existente
            cadenaXML += '                  <tem:ZNUEZ_CALIBRE>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].calibre.VALUE_CHAR +'</tem:ZNUEZ_CALIBRE>'; // campos agregar a otros html numExportacion
            cadenaXML += '                  <tem:ZNUEZ_NUMEXPORTA>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].numExportacion +'</tem:ZNUEZ_NUMEXPORTA>';
            cadenaXML += '                  <tem:ZNUEZ_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:ZNUEZ_VARIEDAD>';
            */
                    
            cadenaXML += '               </tem:ZMOV_CREATE_RECEP_PROCESO_NARA_ITEM_NARANJA>';
        }
        cadenaXML += '            </tem:ITEM_NARANJA>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_RECEP_PROCESO_NARA>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';

        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);
        if ($rootScope.datoUsuario.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', 'http://' + IPSERVER + '/'+RUTASERVER+'/rfcNET.asmx', true);
            // build SOAP request
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {


                    if (xmlhttp.status == 200) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingLotesPaking').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='UTF-8' standalone='no' ?>").join("");
                        var xmlData = $.parseXML(print);
                        var parser = new DOMParser();
                        var docXml = parser.parseFromString(print, "text/xml");  
                        console.log(docXml.firstChild);
                        try {
                            var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
                            mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta1 = 'NO HAY MATERIAL DOCUMENT (ERROR)';
                        }
                        try {
                            var thirdPartyNode = $(xmlData).find("MESSAGE")[0];
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta2 = 'NO HAY MENSAJES';
                        }
                        document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Mensajes:</h1><p>' + mensajeRespuesta2 + '</p></div>';
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
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            $scope.btnContinuar = false;
            document.getElementById('loadingLotesPaking').style.display = 'none';
            document.getElementById('popRespuestaLotesPaking').innerHTML = "DATOS DEMOS CORRECTOS";
            $('#cargandoDatosSAP').hide('fade');
        }
    }

    /*$scope.codearLote = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('codigoLoteDescarte').value = result.text;
            $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].codigoLoteDescarte = result.text;
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }*/
    
     $scope.continuarPakingProceso = function () {
                $rootScope.verLoading_(true, "Obteniendo datos...");
                
                            var CHARG = $rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking;
                            var LIFNR;
                            var nombreProductor = null;
                            var var_LBLAB  ="";
                            var var_VARIEDAD = "";
                            var var_nombreProductor = "";
                            angular.forEach($rootScope.stockSubCat, function (value, key) {
                                    if (CHARG == value.CHARG) {
                                        nombreProductor = value.LIFNR;
                                        if(isNaN(parseInt(value.LIFNR)))
                                                LIFNR=value.LIFNR;
                                        else
                                                LIFNR=parseInt(value.LIFNR);
                                        var_LBLAB = value.LBLAB
                                        var_VARIEDAD = value.VARIEDAD;
                                        var_nombreProductor=value.LIFNR;
                                        angular.forEach($rootScope.productores, function (value2, key2) {
                                                if(Number(value.LIFNR) == value2.LIFNR){
                                                        var_nombreProductor = value2.nombre;
                                                }
                                        })
                                    }
                            });
                            if (nombreProductor == null){
                                    $rootScope.verLoading_(false, "");
                                    $scope.navegacionPagina('menuPrincipal', 'fadeInRight', '');
                                    $('#btnError').css('display','inline')
                                    $('#btnContinuar_').css('display','none')
                            }else{
                                    $rootScope.datosLoteProcesoPaking = {
                                            LBLAB: var_LBLAB,//kilos
                                            LIFNR: var_nombreProductor,
                                            VARIEDAD: var_VARIEDAD,
                                            nombreProductor: var_nombreProductor,
                                            codigoProductor: LIFNR,
                                            selFechaContabilizacion: $rootScope.datosLoteProcesoPaking.selFechaContabilizacion,
                                            pakingGuia: "",
                                            embalajeLoteProcesoPaking: $rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking,
                                            detalle: [
                                                {material: [], kilos: "", codigoLoteDescarte: "", NOAPTA: {VALUE_CHAR: '', DESCRIPTION: ''},
                                                VARIEDAD:'',
                                                fechaEmbalagePakingTab:'',
                                                fechaEmbalagePakingTabx:'',
                                                numExportacion:''
                                                },
                                            ],
                                            ctrContin: 1,
                                            pakingGuia: $rootScope.datosLoteProcesoPaking.pakingGuia,
                                            
                                    };
                                    $scope.navegacionPagina('PACK_FiltroProductor'+$rootScope.controllerMenu, 'fadeInRight', '');
                           
                }
            }
            $scope.recargaStock = function(){
                $rootScope.verLoading_(true, "Obteniendo datos...");
                    //Stock sub cat
                $rootScope.stockSubCat=[];
                dataFactory.getDatos('ZMOV_QUERY_STOCKSUBC','')
               .success(function (datos) {
                   angular.forEach(datos.STOCKSUBC, function (value, key) {
                       var jsonArg = new Object();
                       jsonArg.WERKS = value.WERKS;
                       jsonArg.LIFNR = value.LIFNR;
                       jsonArg.codigo = value.CHARG;
                       jsonArg.LBLAB = value.LBLAB;//kilos
                       jsonArg.nombre = value.MAKTX;
                       jsonArg.MEINS = value.MEINS;
                       jsonArg.HSDAT = value.HSDAT;
                       jsonArg.VARIEDAD = value.VARIEDAD;
                       jsonArg.GUIA = value.GUIA;
                       jsonArg.CHARG = value.CHARG;
                       $rootScope.stockSubCat.push(jsonArg);
                   });
                   //console.log("Obtiene variedades OK:");
                   //$scope.preloadMsg = $scope.preloadMsg+ "<br>Obtiene variedades OK";
                   document.getElementById('preloadMsg').innerHTML = document.getElementById('preloadMsg').innerHTML + "<br>Recarga de Stock de Lotes OK";
                   //$scope.estadoObteniendo();
                   $rootScope.verLoading_(false, "Obteniendo datos...");
                   $scope.continuarPakingProceso()
                   
               })
               .error(function (datos) {
                   $rootScope.verLoading_(false, "");
                   $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio de Recarga de Lotes');
               })
            }

})