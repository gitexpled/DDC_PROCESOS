//angular.module('starter.controllersPreProcesoEx', [])
starter.lazyController('crtPPExistente', function ($scope, $routeParams, dataFactory, $rootScope) {
    $('div [data-role=page]').addClass('animated ' + $routeParams.animacion);

    var f = new Date();
    $scope.selFechaContabilizacionOpciones = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha2(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha2(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha2(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha2(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha2(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha2(-1) },
        { value: $scope.mostrarFecha(0), name: $scope.mostrarFecha2(0) }
    ];
    
    if($rootScope.datosLoteProcesoPaking.pakingGuia!=undefined)$rootScope.datosLoteProcesoPaking.pakingGuia=$rootScope.datosLoteProcesoPaking.pakingGuia
    
    $scope.irNotificacion = function (TIPONOTIFICACION,MATERIAL) {
        //alert('NARANJAPreProcesoExistente'+TIPONOTIFICACION)
        $rootScope.setServiceParameters(TIPONOTIFICACION,$scope.nombreMenuPagina);
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
        $rootScope.MATERIALNOTIFICACION=MATERIAL;
        //alert(('NARANJAProcesoExistenteExportacion'==$rootScope.datosExportadora.especie.DESCRIPTION+'ProcesoExistente'+TIPONOTIFICACION))
        //$scope.navegacionPagina($rootScope.datosExportadora.especie.DESCRIPTION+'ProcesoExistente'+TIPONOTIFICACION, 'fadeInRight', '');
        $scope.navegacionPagina('NARANJAPreProcesoExistente'+TIPONOTIFICACION, 'fadeInRight', '');
    
    }
 
})
starter.lazyController('crtPACK_EmbalajesProcesoEspeciePP', function ($scope, $routeParams, $rootScope, dataFactory) {
    $('div [data-role=page]').addClass('animated ' + $routeParams.animacion);
    $scope.accion = $routeParams.sid;
    $scope.selKilosDivPakingTab = 'none';

    
    $("#fechaEmbalagePakingTab").datepicker({ dateFormat: 'yy-mm-dd' ,
    onSelect: function(dateText) {
        $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab=dateText;
      }
    });
    
    
    //PRODUCTOR 
    $scope.listaProductores = [];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR, function (value, key) {
        if(true
                &&value.ZPRD_TIPO == "PRODUCTOR"
                //&&value.ZPRD_EXPORTADORA*1 == $rootScope.datosExportadora.exportadora.VALUE_CHAR*1
            ){
            $scope.listaProductores.push({ DESCRIPTION: value.NAME1,VALUE_CHAR:value.LIFNR})
        }
    });
    //variedad
    $scope.variedadOpciones = [];
    angular.forEach($rootScope.ZMOV_QUERY_VARIEDAD, function (value, key) {
        if(value.ATBEZ === $rootScope.datosExportadora.especie.DESCRIPTION)
            $scope.variedadOpciones.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR })
    });
    //material
    $scope.pakingTipoMaterialOpciones = [];
    var filtroMat=$rootScope.serviceParameters.filterMat;
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if( value.ZMAT_ESPECIE === $rootScope.datosExportadora.especie.DESCRIPTION
            &&value.ZMAT_VIGENTE === 'SI'
            &&value.ZMAT_PROCESO === filtroMat.ZMAT_PROCESO
            &&value.ZMAT_FORMATO === filtroMat.ZMAT_FORMATO
            &&value.ZMAT_TIPO === filtroMat.ZMAT_TIPO
            ){
				if(value[$rootScope.datoUsuario.sociedad]){
					if(value[$rootScope.datoUsuario.sociedad]=="SI"){
						$scope.pakingTipoMaterialOpciones.push({ DESCRIPTION: value.MAKTG + ' - ' + value.MATNR, VALUE_CHAR: value.MATNR , KILOS:value.NTGEW , MAKTG:value.MAKTG , MATNR:value.MATNR });
					}
				}
            }
        });
    //categoria 
     $scope.pakingCategoriaOpciones = [];
     angular.forEach($rootScope.ZMOV_QUERY_CATEGORIA, function (value, key) {
        
        if(true
           &&value.ATBEZ===$rootScope.datosExportadora.especie.DESCRIPTION
           ){
                $scope.pakingCategoriaOpciones.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR  });
            }
        });
    //categoria 
     $scope.pakingColorOpciones = [];
     angular.forEach($rootScope.ZMOV_QUERY_COLOR, function (value, key) {
        
        if(true
           &&value.ATBEZ===$rootScope.datosExportadora.especie.DESCRIPTION
           ){
                $scope.pakingColorOpciones.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR  });
            }
        });    
   //calibre
    $scope.pakingCalibreOpciones=[];
    angular.forEach($rootScope.ZMOV_QUERY_CALIBRE, function (value, key) {
        if(true
           &&value.ATBEZ===$rootScope.datosExportadora.especie.DESCRIPTION
           ){
                $scope.pakingCalibreOpciones.push({ VALUE_CHAR: value.VALUE_CHAR, DESCRIPTION: value.DESCRIPTION});
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
            VARIEDAD:'',
            fechaEmbalagePakingTabx:'',
            numExportacion:'',
            material:[],
            lotePacking:'',
            embalajeKilos:0,
            centro:'',
            almacenFumigacion:'',
            embalajeLoteProcesoPaking:'',
            ZCATEGORIA:[],
            calibre:[],
            ZNUM_PLU:'',
            ZETIQUETADO:'',
            ZQUIMICO:'',
            ZPLU:'',
            ZNARANJA_VARIEDAD_ET:[],
            ZPRODUCTOR_ET:[],
            color:[]
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
        $('.tab-embalajes').removeClass('animated fadeInUp');
        $('.tab-embalajes').hide();
        $('.tab-embalajes').show();
        $('.tab-embalajes').addClass('animated fadeInUp');
        $('#fechaEmbalagePakingTab').val('');
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
        $('.tab-embalajes').removeClass('animated fadeInUp');
        $('.tab-embalajes').hide();
        $('.tab-embalajes').show();
        $('.tab-embalajes').addClass('animated fadeInUp');
        $('#fechaEmbalagePakingTab').val($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab);
        $scope.selTab.pop();
        $scope.restaKgTotal();
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
        $('.tab-embalajes').removeClass('animated fadeInUp');
        $('.tab-embalajes').hide();
        $('.tab-embalajes').show();
        $('.tab-embalajes').addClass('animated fadeInUp');
        $('#fechaEmbalagePakingTab').val($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].fechaEmbalagePakingTab);
        $('#embalajeLoteTab1').val($rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab].lotePacking);
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
        /*
        for (var inx = 0; inx <= $rootScope.countTab; inx++) {
            if($rootScope.datosLoteProcesoPaking.detalle[inx].material===undefined ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking===undefined || $rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking ==='' ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos===undefined || isNaN($rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos)||
               $rootScope.datosLoteProcesoPaking.detalle[inx].fechaEmbalagePakingTab===undefined || $rootScope.datosLoteProcesoPaking.detalle[inx].fechaEmbalagePakingTab==='' ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].calibre===undefined ||
               $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD===undefined 
                ){
                $scope.mostrarAlerta(true, 'Advertencia', 'Faltan Campos para completar el envio'); return 0;
            }
        }*/
        //$rootScope.antiRefrescar()
        $rootScope.blockReEnvio = 1;
        $rootScope.recargarStockProceso = true;
        //$scope.mostrarRespuesta(true);
        var tagEspecie=$rootScope.datosExportadora.especie.DESCRIPTION;
        var tagItemEspecie=$rootScope.datosExportadora.especie.DESCRIPTION;
        console.log($rootScope.datosLoteProcesoPaking);

        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_RECEP_PREPRO_'+tagEspecie+'>';
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
        cadenaXML += '            <tem:ITEMS>';
        //<!--Zero or more repetitions:-->
        //console.log($rootScope.datosLoteProcesoPaking.detalle)tagItemEspecie+'_'+$rootScope.MATERIALNOTIFICACION
        for (var inx = 0; inx <= $rootScope.countTab; inx++) {
            cadenaXML += '               <tem:ZMOV_CREATE_RECEP_PREPRO_'+tagEspecie+'_ITEMS>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            //cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosLoteProcesoPaking.detalle[inx].material.MATNR + '</tem:MATERIAL>';
            cadenaXML += '                  <tem:MATERIAL>'+$rootScope.datosLoteProcesoPaking.detalle[inx].material.VALUE_CHAR+'</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH>' + angular.uppercase($rootScope.datosLoteProcesoPaking.detalle[inx].lotePacking) + '</tem:BATCH>';
          //cadenaXML += '                  <tem:QUANTITY>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos.toString().split(".").join(",") +'</tem:QUANTITY>';
            cadenaXML += '                  <tem:QUANTITY>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos +'</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT></tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].fechaEmbalagePakingTab.value +'</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>'+ $rootScope.datoUsuario.centro +'</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>'+ $rootScope.datoUsuario.almacenFumigacion +'</tem:STGE_LOC>';
            cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
            cadenaXML += '                  <tem:BATCH_GRANEL>'+ angular.uppercase($rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking) +'</tem:BATCH_GRANEL>';//lote existente
            cadenaXML += '                  <tem:Z'+tagItemEspecie+'_VARIEDAD>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].VARIEDAD.VALUE_CHAR +'</tem:Z'+tagItemEspecie+'_VARIEDAD>';
            cadenaXML += '                  <tem:Z'+tagItemEspecie+'_CATEGORIA>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZCATEGORIA.VALUE_CHAR +'</tem:Z'+tagItemEspecie+'_CATEGORIA>';
            cadenaXML += '                  <tem:Z'+tagItemEspecie+'_CALIBRE>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].calibre.VALUE_CHAR +'</tem:Z'+tagItemEspecie+'_CALIBRE>'; // campos agregar a otros html numExportacion
            cadenaXML += '                  <tem:Z'+tagItemEspecie+'_COLOR>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].color.VALUE_CHAR +'</tem:Z'+tagItemEspecie+'_COLOR>'; 
            cadenaXML += '                  <tem:ZNUM_PLU>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZNUM_PLU +'</tem:ZNUM_PLU>';
            cadenaXML += '                  <tem:ZPLU>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZPLU +'</tem:ZPLU>';
            cadenaXML += '                  <tem:ZETIQUETADO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZETIQUETADO +'</tem:ZETIQUETADO>';
            cadenaXML += '                  <tem:ZQUIMICO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZQUIMICO +'</tem:ZQUIMICO>';
            cadenaXML += '                  <tem:ZNUM_EXPO>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].numExportacion +'</tem:ZNUM_EXPO>'
            
            cadenaXML += '                  <tem:Z'+tagItemEspecie+'_VARIEDAD_ET>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZNARANJA_VARIEDAD_ET.VALUE_CHAR +'</tem:Z'+tagItemEspecie+'_VARIEDAD_ET>'
            cadenaXML += '                  <tem:ZPRODUCTOR_ET>'+ $rootScope.datosLoteProcesoPaking.detalle[inx].ZPRODUCTOR_ET.VALUE_CHAR +'</tem:ZPRODUCTOR_ET>'
              
            cadenaXML += '               </tem:ZMOV_CREATE_RECEP_PREPRO_'+tagEspecie+'_ITEMS>';
        }
        cadenaXML += '            </tem:ITEMS>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_RECEP_PREPRO_'+tagEspecie+'>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);
         var jsonXmlNodes=[
            {node:"MATERIALDOCUMENT",h1:"Material Document"},
            //{node:"MATERIALDOCUMENT5",h1:"Material Document 541"},
            {node:"PEDIDO",h1:"Pedido"},
            {node:"MESSAGE",h1:"Message"}
         ];
        $rootScope.sendDataService(cadenaXML,$rootScope,$scope,jsonXmlNodes,dataFactory);
   
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
        for (var inx = 0; inx <= $rootScope.countTab; inx++) {
            $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo=$rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo-$rootScope.datosLoteProcesoPaking.detalle[inx].embalajeKilos;
        }
        if ($rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo < 0) {
            $scope.mostrarAlerta(true, 'Advertencia', 'Supera los kilos');
        }
    }
    //DESCARTE Y MERMAS Y DESECHOS
    $rootScope.idxTab = 0;
    $rootScope.countTab = 0;
    $scope.selTab = [];
    $scope.auxKilo = 0;
    $scope.selTab.push({ idx: 0, nombre: "MAT 1", seleccionado: "on" });
    $scope.divDescarteOpcion = "none";
    $scope.divDescarteOpcionNA = "none";

    $rootScope.datosLoteProcesoPaking.kgLoteProcesoSaldo = (parseFloat($rootScope.datosLoteProcesoPaking.LBLAB)).toFixed(2);

    $rootScope.datosLoteProcesoPaking.detalle[$rootScope.idxTab]={
            fechaEmbalagePakingTab: '',
            embalajePakingBarTab: '',
            embalajeLotePakingTab: '',
            selVariedadPakingTab: '',
            selCuartelTab: '',
            embalajeCajaPaking: '',
            embalajeKilosPaking: '',
            VARIEDAD:'',
            fechaEmbalagePakingTabx:'',
            numExportacion:'',
            material:[],
            lotePacking:'',
            embalajeKilos:0,
            centro:'',
            almacenFumigacion:'',
            embalajeLoteProcesoPaking:'',
            ZCATEGORIA:[],
            calibre:[],
            ZNUM_PLU:'',
            ZETIQUETADO:'',
            ZQUIMICO:'',
            ZPLU:'',
            
            ZNARANJA_VARIEDAD_ET:[],
            ZPRODUCTOR_ET:[],
            color:[]
    };

    $scope.selTab[$rootScope.idxTab].seleccionado = "on";
    if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; };
     $scope.refreshPakingProceso = function () {

     var CHARG = $rootScope.datosLoteProcesoPaking.embalajeLoteProcesoPaking;
     var LIFNR;
     var nombreProductor = null;
     var var_LBLAB  ="";
     var var_VARIEDAD = "";
     var var_nombreProductor = "";
     console.log($rootScope.ZMOV_QUERY_STOCK_SUBCONTR);
     angular.forEach($rootScope.ZMOV_QUERY_STOCK_SUBCONTR, function (value, key) {
             if (CHARG === value.CHARG) {
                 nombreProductor = value.LIFNR;
                 if(isNaN(parseInt(value.LIFNR)))
                         LIFNR=value.LIFNR;
                 else
                         LIFNR=parseInt(value.LIFNR);
                 var_LBLAB = value.LBLAB;
                 var_VARIEDAD = value.VARIEDAD;
                 var_nombreProductor=value.LIFNR;
             }
     });
     if (nombreProductor === null){
             $rootScope.verLoading_(false, "");
             $rootScope.mostrarAlerta(true, 'Advertencia', 'Codigo Ya no esta disponible');
             return 0;
     }
     $rootScope.datosLoteProcesoPaking = {
             LBLAB: var_LBLAB,//kilos
             LIFNR: nombreProductor,
             VARIEDAD: var_VARIEDAD,
             nombreProductor: var_nombreProductor,
             codigoProductor: LIFNR,
             selFechaContabilizacion: "",
             pakingGuia: "",
             embalajeLoteProcesoPaking: CHARG,
             detalle: [
                 {material: [], kilos: "", codigoLoteDescarte: "", NOAPTA: {VALUE_CHAR: '', DESCRIPTION: ''},
                 VARIEDAD:'',
                 fechaEmbalagePakingTab:'',
                 fechaEmbalagePakingTabx:'',
                 numExportacion:''
                 },
             ],
             ctrContin: 1,
     };
     $rootScope.verLoading_(false, "");
     $scope.navegacionPagina('PACK_FiltroProductor'+$rootScope.controllerMenu, 'fadeInRight', '');

 }
    $scope.recargaStock = function(){
        $rootScope.verLoading_(true, "Recargando Stock ");
            //Stock sub cat
        $rootScope.ZMOV_QUERY_STOCK_SUBCONTR=[];
        dataFactory.getDatos('ZMOV_QUERY_STOCK_SUBCONTR','')
       .success(function (datos) {
           $rootScope.ZMOV_QUERY_STOCK_SUBCONTR=datos.STOCKSUBC;
           document.getElementById('preloadMsg').innerHTML = document.getElementById('preloadMsg').innerHTML + "<br>Recarga de Stock de Lotes OK";
           $rootScope.verLoading_(false, "Obteniendo datos...");
           //$scope.mostrarPop(false)
           $scope.refreshPakingProceso();  

       })
       .error(function (datos) {
           $rootScope.verLoading_(false, "");
           $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio de Recarga de Lotes');
       })
    }  
});