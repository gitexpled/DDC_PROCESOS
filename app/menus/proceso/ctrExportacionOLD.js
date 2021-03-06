appExpled.lazyController('ctrExportacion', function ($scope, $routeParams, $rootScope) 
{
    $scope.clienteSeleccion = "none";
    if($rootScope.userData.mail=="servicio"){
       $scope.clienteSeleccion = "";
    }
    if($rootScope.dataSeleccion.especie.VALUE_CHAR==="UVAS"){
        $scope.vistaUva="";
    }else{
        $scope.vistaUva="none";
    }
    $rootScope.datoProductorDetalle ={
        
    }
    $rootScope.datosPaletizaje = {
        detalle:[]
    }
    
    $scope.listarColor =[];
    angular.forEach($rootScope.ZMOV_QUERY_COLOR, function (value, key) {
        if(value.ATBEZ===$rootScope.dataSeleccion.especie.DESCRIPTION){
            $scope.listarColor.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR,ATNAM:value.ATNAM });
        }
    });
    $scope.cargaDatos = function (idx) {
        $rootScope.datosPaletizaje.detalle[idx] = {
            fechaEmbalagePakingTab: '',
            altura:'',
            material:'',
            palletCompleto:'',
            codigoPallet:'',
            productorRotulado:'',
            selFechaContabilizacion:'',
            calibre:'',
            cantidad:'',
            ZPREDIO:'',
            lotePacking:'',
            variedadRotulada:'',
            IDG:'',
            tipificacion:''
        }
    }
    if ($rootScope.sid == "new") {
        $scope.accion = "new";
        $scope.selMercadoDivTab1 = 'none';
        $scope.selKilosDivPakingTab = 'none';
        $rootScope.idxTab = 0;
        $rootScope.countTab = 0;
        $scope.selTab = [];
        $scope.selTab.push({ idx: 0, nombre: "MAT 1", seleccionado: "on" });
        $scope.verBtnEliminar = "none";
        $rootScope.datosPaletizaje.detalle = [];
        $scope.cargaDatos(0);
        $scope.auxKilo = 0;
        //$rootScope.datosPaletizaje.kgLoteProcesoSaldo = (parseFloat($rootScope.datosLoteProcesoPaking.LBLAB)).toFixed(3);

    }
    console.log($rootScope.dataSeleccion.especie)
    if($rootScope.dataSeleccion.especie.ATBEZ==="CAROZO"){
        $scope.campoCaroso="block";
    }else{
        $scope.campoCaroso="none";
    }
    $scope.validaLotePallet = function(){
        var jsonValidate = [
            {campo:"Codigo Pallet",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].codigoPallet,type:"number",min:8000000000,max:99999999999999999999}
        ];
        if(!$rootScope.validaForm(jsonValidate))return 0;
    }
    function parseLotePallet(value){
        console.log(value)
        var res
        if(!isNaN(parseInt(value))){
             res = ("00000000000000000000" + value).slice (-20);
        }else{
            res = false;
        }
        return res;
    }
    $scope.codearLote = function (data,id) {
        if(APPMOVIL){
            cordova.plugins.barcodeScanner.scan(
            function (result) {
                //alert(result.text)
                if(data=="codigoPallet"){
                    document.getElementById('codigoPallet').value = parseLotePallet(result.text);
                    $rootScope.datosPaletizaje.detalle[0].codigoPallet = parseLotePallet(result.text);
                    $rootScope.$apply();
                }else{
                    document.getElementById('embalajeLoteTab1').value = parseLotePallet(result.text);
                    $rootScope.datosPaletizaje.detalle[0].lotePacking = parseLotePallet(result.text);
                    $rootScope.$apply();
                }
            },
            function (error) {
                $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
            }
          );
        }
    }
    $rootScope.kiloInicial =$rootScope.dataSeleccion.totalKilo;
    $scope.selFechaContabilizacionOpciones = [
        { value: $scope.mostrarFecha(0), name: $scope.mostrarFecha2(0) }
    ];
    $scope.selFechaContabilizacionOpciones2 = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha2(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha2(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha2(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha2(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha2(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha2(-1) },
        { value: $scope.mostrarFecha(0), name: $scope.mostrarFecha2(0) }
    ];
    $scope.listarAltura =[];
    angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.VEGR4, function(value,key){
            $scope.listarAltura.push({DESCRIPTION:value.BEZEI,VALUE_CHAR:value.VEGR4});
    })
    $rootScope.listarCategoria =[];
    angular.forEach($rootScope.CATEGORIA, function(value,key){
        if(value.ATBEZ==$rootScope.dataSeleccion.especie.VALUE_CHAR){
            $scope.listarCategoria.push({DESCRIPTION:value.DESCRIPTION,VALUE_CHAR:value.VALUE_CHAR});
        }
    })
    $scope.listarMaterial=[];
     if($rootScope.userData.mail=="servicio"){
         angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function(value,key){
            if(value.MTART=="UNBW" && 
                    value.ZMAT_ESPECIE==$rootScope.dataSeleccion.especie.VALUE_CHAR
                    &&value.ZMAT_PROCESO=="SEXPORTACION"
                    && value.ZMAT_VIGENTE =="SI"){
                console.log(value)
                $scope.listarMaterial.push({MAKTG:value.MATNR,MATNR:value.MATNR,KG:value.NTGEW,MEINS:value.MEINS});
            }
        })
     }else{
        angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function(value,key){
            if(value.MTART=="FERT" && 
                    value.ZMAT_ESPECIE==$rootScope.dataSeleccion.especie.VALUE_CHAR
                    && value.ZMAT_VIGENTE =="SI"){
                $scope.listarMaterial.push({MAKTG:value.MATNR,MATNR:value.MATNR,KG:value.NTGEW,MEINS:value.MEINS});
            }
        })
    }
    $scope.Chnge = function(){
        //console.log($rootScope.datosPaletizaje.palletCompleto)
     };
    $scope.controlDescarte = function(){
        var kilos = $rootScope.kiloInicial;
        if($rootScope.datosPaletizaje.detalle[0].cantidad=="" || $rootScope.datosPaletizaje.detalle[0].cantidad==0 || $rootScope.datosPaletizaje.detalle[0].cantidad== undefined){
            $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
        }else{
            if(!isNaN($rootScope.datosPaletizaje.detalle[0].cantidad) && !isNaN($rootScope.datosPaletizaje.detalle[0].material.KG)){
                kilos=kilos-($rootScope.datosPaletizaje.detalle[0].cantidad*$rootScope.datosPaletizaje.detalle[0].material.KG);
                if(!isNaN(kilos)){
                    if(kilos>=0)
                        $rootScope.dataSeleccion.totalKilo = kilos.toFixed(3);
                    else{
                        $rootScope.alert.show({message:"Los kilos no pueden ser menor a cero"});
                        $rootScope.datosPaletizaje.detalle[0].cantidad=0;
                        $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
                    }
                }else{
                    $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
                }
            }else{
                $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
            }
        }
        console.log($rootScope.dataSeleccion.totalKilo)
    }
    $scope.getPredios=function(){
        $rootScope.listaPredio=[];//ZPRD_CSDP , NAME1=PRODUCTOR
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_SDP, function (value, key) {
            if(true
                    &&value.ESPECIE === $rootScope.dataSeleccion.especie.VALUE_CHAR && value.LIFNR === $rootScope.datosPaletizaje.detalle[0].productorRotulado.VALUE_CHAR
                ){

                if($scope.listaPredio.indexOf(value.SDP)===-1 && value.ESPECIE === $rootScope.dataSeleccion.especie.VALUE_CHAR &&value.LIFNR === $rootScope.datosPaletizaje.detalle[0].productorRotulado.VALUE_CHAR){
                       $scope.listaPredio.push({ DESCRIPTION: value.SDP,VALUE_CHAR:value.SDP,MANDT:value.MANDT})
                }
            }
        });
    }
    $scope.listarProductor = [];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PRODUCT, function (value,key){
        if(value.ESPECIE == $rootScope.dataSeleccion.especie.VALUE_CHAR){
            $scope.listarProductor.push({DESCRIPTION:value.LIFNR,VALUE_CHAR:value.LIFNR})
        }
        if($rootScope.dataSeleccion.LIFNR==value.LIFNR){
            $rootScope.datosPaletizaje.detalle[0].productorRotulado={DESCRIPTION:value.LIFNR,VALUE_CHAR:value.LIFNR};
        }
        $scope.getPredios();
    })
    $scope.listarCalibre = [];
    angular.forEach($rootScope.ZMOV_QUERY_GRUPO_CATE, function (value,key){
        if(value.ATBEZ == $rootScope.dataSeleccion.especie.VALUE_CHAR){
            $scope.listarCalibre.push({DESCRIPTION:value.DESCRIPTION,VALUE_CHAR:value.VALUE_CHAR})
        }
    })
    $scope.listarVariedad = [];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_VAR, function (value, key) {
        if(value.ESPECIE ===  $rootScope.dataSeleccion.especie.VALUE_CHAR
           && $rootScope.dataSeleccion.LIFNR==value.LIFNR
           ){
            $scope.listarVariedad.push({DESCRIPTION: value.VAR, VALUE_CHAR: value.COD_VAR})
        }
        if($rootScope.dataSeleccion.variedad==value.VAR){
            $rootScope.datosPaletizaje.detalle[0].variedadRotulada={DESCRIPTION: value.VAR, VALUE_CHAR: value.COD_VAR};
        }
     });
     $rootScope.listaCuartel=[];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_IDG, function(value,key){
        if(true
            &&value.LIFNR === $rootScope.dataSeleccion.LIFNR && value.ESPECIE === $rootScope.dataSeleccion.especie.VALUE_CHAR
            ){
                $scope.listaCuartel.push({ DESCRIPTION: value.IDG,VALUE_CHAR:value.IDG,LIFNR:value.IDG})
        }
    });
    $rootScope.listaIDP=[];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_IDP, function(value,key){
        if(true
            &&value.LIFNR === $rootScope.dataSeleccion.LIFNR && value.ESPECIE === $rootScope.dataSeleccion.especie.VALUE_CHAR
            ){
                $scope.listaIDP.push({ DESCRIPTION: value.IDP,VALUE_CHAR:value.IDP})
        }
    });
     $scope.listarTipoPallet = [];
    angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.INHALT, function (value, key) {
        $scope.listarTipoPallet.push({DESCRIPTION: value.INHALT, VALUE_CHAR: value.INHALT})
     });
    $scope.listarMercado = [];
    angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.VEGR5 , function(value,key){
            $scope.listarMercado.push({DESCRIPTION:value.BEZEI ,VALUE_CHAR:value.VEGR5});
    })
    //$rootScope.PLU
    $scope.listarPLU =[];
    angular.forEach($rootScope.PLU , function(value,key){
            $scope.listarPLU.push({DESCRIPTION:value.DESCRIPTION ,VALUE_CHAR:value.VALUE_CHAR});
    })
    
    $scope.listarTipificacion =[];
    angular.forEach($rootScope.TIPIFICACION, function (value, key) {
        if(value.ATBEZ===$rootScope.dataSeleccion.especie.VALUE_CHAR ){
            $scope.listarTipificacion.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR,ATNAM:value.ATNAM });
        }
    });
    $scope.validaFormRecep = function (){
           var jsonValidate = [
                {campo:"Codigo Pallet",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].codigoPallet,type:"input"},
                {campo:"Altura",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].altura,type:"aSelect",index:"VALUE_CHAR"},
                {campo:"Fecha Contabilización",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].selFechaContabilizacion,type:"aSelect",index:"value"},
                {campo:"Fecha de embalaje",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab,type:"aSelect",index:"value"},
                {campo:"Tipo de pallet",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].tipoPallet,type:"aSelect",index:"VALUE_CHAR"},
                {campo:"Material",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material,type:"aSelect",index:"MATNR"},
                {campo:"Calibre",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].calibre,type:"aSelect",index:"VALUE_CHAR"},
                {campo:"Productor Rotulado",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].productorRotulado,type:"aSelect",index:"VALUE_CHAR"},
                {campo:"Variedad Rotulada",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].variedadRotulada,type:"aSelect",index:"VALUE_CHAR"},
                //{campo:"Lote Packing",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].lotePacking,type:"input"},
                {campo:"Calidad",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].categoria,type:"aSelect",index:"VALUE_CHAR"},
                //{campo:"Lista de Materiales",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].listaMateriales,type:"aSelect",index:"VALUE_CHAR"},
            ];
        if($rootScope.dataSeleccion.especie.ATBEZ==="CAROZO"){
            jsonValidate.push([
                {campo:"PLU",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].PLU,type:"aSelect",index:"MATNR"},
                {campo:"Color",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].color,type:"aSelect",index:"VALUE_CHAR"},
            ]);
        }
        if($rootScope.userData.mail=="servicio"){
            jsonValidate.push({campo:"Cliente",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].cliente,type:"aSelect",index:"VALUE_CHAR"});
        }
        if($rootScope.dataSeleccion.especie.VALUE_CHAR==="UVAS"){
            jsonValidate.push([
                {campo:"IDG",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].IDG,type:"aSelect",index:"VALUE_CHAR"},
                {campo:"IDP",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].IDP,type:"aSelect",index:"VALUE_CHAR"},
                {campo:"Lote Packing",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].tipificacion,type:"aSelect",index:"VALUE_CHAR"},
            ]);
        }
        if($rootScope.userData.mail=="servicio"){
            jsonValidate.push({campo:"Cliente",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].cliente,type:"aSelect",index:"VALUE_CHAR"});
        }
        if(!$rootScope.validaForm(jsonValidate))return 0;
        
    }
    $scope.agregarTab = function () {
        if(!$scope.validaFormRecep()){
            return 0;
        }
        $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab = $('#fechaEmbalagePakingTab').datepicker({ dateFormat: 'yy-mm-dd',onSelect: function(dateText) {$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab=dateText;} }).val();
        $scope.selTab[$rootScope.idxTab].seleccionado = "off"
        $rootScope.countTab++;
        $rootScope.idxTab = $rootScope.countTab;
        $scope.selMercadoDivTab1 = 'none';
        try {
            if (($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material.MAKTG == '') || ($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material.MAKTG == undefined)) {
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
    $scope.autoCompletaLote= function(){
        var lote = parseLotePallet($rootScope.datosPaletizaje.detalle[0].codigoPallet);
        if(lote){
            $rootScope.datosPaletizaje.detalle[0].codigoPallet=lote;
        }
        console.log($rootScope.datosPaletizaje.detalle[0].codigoPallet)
    }
    $scope.irAlTab = function (idx) {
        if(!$scope.validaFormRecep()){
            return 0;
        };
        var aux = 0;
        $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab = $('#fechaEmbalagePakingTab').datepicker({ dateFormat: 'yy-mm-dd' }).val();
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
        $('#fechaEmbalagePakingTab').val($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab);
        //$('#embalajeLoteTab1').val($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].lotePacking);
        $scope.selMercadoDivTab1 = 'none';
        //console.log($rootScope.datosLoteProcesoPaking)
        try {
            if (($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material.MAKTG == '') || ($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material.MAKTG == undefined)) {
                $scope.selMercadoDivTab1 = 'none';
            } else {
                $scope.selMercadoDivTab1 = 'block';
            }
        } catch (e) {
            $scope.selMercadoDivTab1 = 'none';
        };
        $scope.auxKilo = 0;
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
        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }
        $('.tab-embalajes').removeClass('animated fadeInUp');
        $('.tab-embalajes').hide();
        $('.tab-embalajes').show();
        $('.tab-embalajes').addClass('animated fadeInUp');
        $('#fechaEmbalagePakingTab').val($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab);
        $scope.selTab.pop();
        $scope.restaKgTotal();
    }
    
    $scope.embalajePakingContinuar = function(){
        if($scope.validaFormRecep()==0){
            return 0;
        }else{
            $rootScope.goToPage('/resumenPaletizar');
        }
    }
})
appExpled.lazyController('crtResumen', function ($scope, $routeParams, $rootScope){
    //$rootScope.antiRefrescar();
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

    $scope.btnFinalizar = function () {
        $rootScope.goToPage('/resumenPaletizar');
    }

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
    }

    for (i = 0; i <= $rootScope.countTab; i++) {
        $scope.selTab.push({ idx: i, nombre: "RES " + (i + 1), seleccionado: "off", alerta: 'status-alert' });
    }
    $scope.selTab[$rootScope.idxTab].seleccionado = "on";


    $scope.selTab[$rootScope.idxTab].seleccionado = "on";

    //$scope.resumenEmbalajeTab1 = $rootScope.datosTabCajaEmbalada[$rootScope.idxTab].selMercadoTab1.descripcion;
    //$scope.resumenMercadoTab1 = $rootScope.datosTabCajaEmbalada[$rootScope.idxTab].selMercadoTab1.mercado;
    
    // recorrer y validar todos los tab
    for (i = 0; i <= $rootScope.countTab; i++) {
        $scope.irAlTab(i);
    }
    $scope.irAlTab($rootScope.idxTab);

    $scope.generaXML = function () {
        if($rootScope.userData.mail=="servicio"){
            $scope.generaXMLServicio();
            return;
        }
        $rootScope.blockReEnvio =1;

        document.getElementById('btnContinuar_').style.display = 'none';
        $scope.btnGeneraXML = 'none';
        document.getElementById('btnError').style.display = 'none';
        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
        $('#cargandoDatosSAP').show();
        $scope.mostrarRespuesta(true);
        $rootScope.httpRequest.successRedirect="menuProceso";
        var auxBUDAT;
        try {
            auxBUDAT = $rootScope.datoGeneralCajaEmbalada.fechaContabiliza.name;
        } catch (e) {
            auxBUDAT = "";
        }
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '    <soapenv:Header/>';
        cadenaXML += '    <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_RECEP_HU_FRESCO>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HEADER>';
        cadenaXML += '               <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>';
        cadenaXML += '               <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>';
        cadenaXML += '               <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>';
        cadenaXML += '               <tem:BSART>'+ $rootScope.userData.clasePedido+'</tem:BSART>';
        cadenaXML += '               <tem:BUDAT>'+ $rootScope.datosPaletizaje.detalle[0].selFechaContabilizacion.value+'</tem:BUDAT>';
        cadenaXML += '               <tem:LIFNR>' + $rootScope.dataSeleccion.LIFNR + '</tem:LIFNR>';
        cadenaXML += '               <tem:XBLNR>'+$rootScope.dataSeleccion.loteProceso+'</tem:XBLNR>';
        cadenaXML += '               <tem:BKTXT>'+$rootScope.userData.usuario+'</tem:BKTXT>';
        cadenaXML += '            </tem:HEADER>';
        cadenaXML += '            <tem:HEADER_HU>';
        cadenaXML += '               <tem:PACK_MAT>PALLET</tem:PACK_MAT>';
        cadenaXML += '               <tem:HU_EXID>' + $rootScope.datosPaletizaje.detalle[0].codigoPallet + '</tem:HU_EXID>';
        cadenaXML += '               <tem:EXT_ID_HU_2></tem:EXT_ID_HU_2>';
        cadenaXML += '               <tem:CONTENT>'+$rootScope.datosPaletizaje.detalle[0].tipoPallet.VALUE_CHAR+'</tem:CONTENT>';
        cadenaXML += '               <tem:PACK_MAT_CUSTOMER></tem:PACK_MAT_CUSTOMER>';
        cadenaXML += '               <tem:PACKAGE_CAT></tem:PACKAGE_CAT>';
        cadenaXML += '               <tem:KZGVH>' + $rootScope.datosPaletizaje.detalle[0].palletCompleto + '</tem:KZGVH>';
        cadenaXML += '               <tem:HU_GRP1></tem:HU_GRP1>';
        cadenaXML += '               <tem:HU_GRP2></tem:HU_GRP2>';
        cadenaXML += '               <tem:HU_GRP3></tem:HU_GRP3>';
        cadenaXML += '               <tem:HU_GRP4>'+$rootScope.datosPaletizaje.detalle[0].altura.VALUE_CHAR +'</tem:HU_GRP4>';
        cadenaXML += '               <tem:HU_GRP5></tem:HU_GRP5>';
        cadenaXML += '               <tem:LGORT_DS>'+$rootScope.userData.almacenPallet+'</tem:LGORT_DS>';
        cadenaXML += '            </tem:HEADER_HU>';
        cadenaXML += '            <tem:LOG>';
        cadenaXML += '            </tem:LOG>';
        cadenaXML += '            <tem:LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].variedadRotulada.VALUE_CHAR+'</tem:VALUE_CHAR>';
        cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_VARIEDAD</tem:CHARACT>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.userData.linea+'</tem:VALUE_CHAR>';
        cadenaXML += '               <tem:CHARACT>ZLINEA</tem:CHARACT>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.userData.turno+'</tem:VALUE_CHAR>';
        cadenaXML += '               <tem:CHARACT>ZTURNO</tem:CHARACT>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_VARIEDAD_ET</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].variedadRotulada.VALUE_CHAR+'</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_CALIBRE</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].calibre.VALUE_CHAR+'</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_CALIDAD</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].categoria.VALUE_CHAR+'</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>ZEMBALA</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>DDC</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>ZPRODUCTOR_ET</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].productorRotulado.VALUE_CHAR+'</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>ZSAG_CSP</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.userData.CSP+'</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        if($rootScope.dataSeleccion.especie.ATBEZ==="CAROZO"){
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>ZPLU</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].PLU.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_COLOR</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].color.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        }
        if($rootScope.dataSeleccion.especie.VALUE_CHAR=="UVAS"){
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>ZSAG_IDP</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].IDP.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>ZSAG_IDG</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].IDG.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_T</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].tipificacion.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_CARACT>';
        }
        if($rootScope.userData.mail=="servicio"){
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>ZCLIENTE</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].cliente.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
        }
        cadenaXML += '            </tem:LT_CARACT>';
        cadenaXML += '            <tem:LT_ITEMS>';
        //for (inx = 0; inx <= $rootScope.countTab; inx++) {
            cadenaXML += '               <tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_ITEMS>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
            cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosPaletizaje.detalle[0].material.MATNR + '</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH></tem:BATCH>';
            cadenaXML += '                  <tem:QUANTITY>' + $rootScope.datosPaletizaje.detalle[0].cantidad + '</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT>'+$rootScope.datosPaletizaje.detalle[0].material.MEINS+'</tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>' + $rootScope.datosPaletizaje.detalle[0].fechaEmbalagePakingTab.value + '</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>'+$rootScope.userData.almacenGranel+'</tem:STGE_LOC>';
            cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
            cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
            cadenaXML += '                  <tem:MOVE_BATCH></tem:MOVE_BATCH>';
            cadenaXML += '                  <tem:BATCH_GRANEL>'+angular.uppercase($rootScope.dataSeleccion.loteProceso)+'</tem:BATCH_GRANEL>';
            cadenaXML += '                  <tem:ACCTASSCAT>'+$rootScope.dataSeleccion.ACCTASSCAT+'</tem:ACCTASSCAT>';
            cadenaXML += '               </tem:ZMOV_CREATE_RECEP_HU_FRESCO_LT_ITEMS>';
            //<!--Zero or more repetitions:-->
        //}
        cadenaXML += '            </tem:LT_ITEMS>';
        cadenaXML += '            <tem:LT_ITEM_DEST>';
        cadenaXML += '            </tem:LT_ITEM_DEST>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_RECEP_HU_FRESCO>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);


        if ($rootScope.userData.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', IPSERVER +'/rfcNET.asmx', true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {
  
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingCajaEmabalda').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        
                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        var xmlData = $.parseXML(print);
                        console.log(xmlData);
                        var mensajeRespuesta1;
                        var mensajeRespuesta2;
                        try {
                            var thirdPartyNode = $(xmlData).find("E_EXIDV")[0];
                            var mensajeRespuesta4 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            
                            var thirdPartyNode = $(xmlData).find("E_MATERIALDOCUMENT")[0];
                            var mensajeRespuesta5 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));                            
                            
                            var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
                            var mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            
                            var thirdPartyNode = $(xmlData).find("PEDIDO")[0]; 
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            
                        } catch (e) {
                            mensajeRespuesta1 = '"No se generó documento material, favor consultar en SAP';
                        }

                        if (mensajeRespuesta1 == '<MATERIALDOCUMENT xmlns="http://tempuri.org/"/>') {
                            mensajeRespuesta1 = 'ERROR, No se generó documento material, favor consultar en SAP';
                        } 

                        var thirdPartyNode = $(xmlData).find("MESSAGE")[0]; //MESSAGE
                        var mensajeRespuesta3 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        
                        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Material Document 2:</h1> <p>' + mensajeRespuesta5 + '</p><h1>Pallet:</h1> <p>' + mensajeRespuesta4 + '</p><h1>Pedido:</h1><p>' + mensajeRespuesta2 + '</p><h1>Mensaje:</h1><p>' + mensajeRespuesta3 + '</p></div>';
                        
                    }
                    if (xmlhttp.status == 500) {
                        document.getElementById('loadingCajaEmabalda').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        document.getElementById('btnError').style.display = 'block';
                        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = 'El servidor rechazó recepción de datos!'
                        $rootScope.blockReEnvio = 0;
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
    $scope.generaXMLServicio = function () {
        $rootScope.blockReEnvio =1;
        console.log($rootScope.datosPaletizaje.detalle[0]);
       // return;
        document.getElementById('btnContinuar_').style.display = 'none';
        $scope.btnGeneraXML = 'none';
        document.getElementById('btnError').style.display = 'none';
        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
        $('#cargandoDatosSAP').show();
        $scope.mostrarRespuesta(true);
        $rootScope.httpRequest.successRedirect="menuProceso";
        var auxBUDAT;
        try {
            auxBUDAT = $rootScope.datoGeneralCajaEmbalada.fechaContabiliza.name;
        } catch (e) {
            auxBUDAT = "";
        }
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '    <soapenv:Header/>';
        cadenaXML += '<soapenv:Body>';
        cadenaXML += '<tem:ZMOV_CREATE_RECEP_HU_FRESCO_C>';
        cadenaXML += ' <tem:datos>';
        cadenaXML += '    <tem:HEADER>';
        cadenaXML += '       <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>';
        cadenaXML += '       <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>';
        cadenaXML += '       <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>';
        cadenaXML += '       <tem:BSART>'+ $rootScope.userData.clasePedido+'</tem:BSART>';
        cadenaXML += '       <tem:BUDAT>'+ $rootScope.datosPaletizaje.detalle[0].selFechaContabilizacion.value+'</tem:BUDAT>';
        cadenaXML += '       <tem:LIFNR>' + $rootScope.dataSeleccion.LIFNR + '</tem:LIFNR>';
        cadenaXML += '      <tem:XBLNR>' + $rootScope.dataSeleccion.loteProceso+ '</tem:XBLNR>';
        cadenaXML += '       <tem:BKTXT>'+$rootScope.userData.usuario+'</tem:BKTXT>';
        cadenaXML += '    </tem:HEADER>';
        cadenaXML += '    <tem:HEADER_HU>';
        cadenaXML += '       <tem:PACK_MAT>PALLET</tem:PACK_MAT>';
        cadenaXML += '       <tem:HU_EXID>' + $rootScope.datosPaletizaje.detalle[0].codigoPallet + '</tem:HU_EXID>';
        cadenaXML += '       <tem:EXT_ID_HU_2></tem:EXT_ID_HU_2>';
        cadenaXML += '      <tem:CONTENT>'+$rootScope.datosPaletizaje.detalle[0].tipoPallet.VALUE_CHAR+'</tem:CONTENT>';
        cadenaXML += '       <tem:PACK_MAT_CUSTOMER></tem:PACK_MAT_CUSTOMER>';
        cadenaXML += '       <tem:PACKAGE_CAT></tem:PACKAGE_CAT>';
        cadenaXML += '       <tem:KZGVH>' + $rootScope.datosPaletizaje.detalle[0].palletCompleto + '</tem:KZGVH>';
        cadenaXML += '       <tem:HU_GRP1></tem:HU_GRP1>';
        cadenaXML += '       <tem:HU_GRP2></tem:HU_GRP2>';
        cadenaXML += '       <tem:HU_GRP3></tem:HU_GRP3>';
        cadenaXML += '       <tem:HU_GRP4>'+$rootScope.datosPaletizaje.detalle[0].altura.VALUE_CHAR +'</tem:HU_GRP4>';
        cadenaXML += '       <tem:HU_GRP5></tem:HU_GRP5>';
        cadenaXML += '       <tem:LGORT_DS>'+$rootScope.userData.almacenPallet+'</tem:LGORT_DS>';
        cadenaXML += '    </tem:HEADER_HU>';
        cadenaXML += '    <tem:LOG>';
        cadenaXML += '    </tem:LOG>';
        cadenaXML += '            <tem:LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].variedadRotulada.VALUE_CHAR+'</tem:VALUE_CHAR>';
        cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_VARIEDAD</tem:CHARACT>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.userData.linea+'</tem:VALUE_CHAR>';
        cadenaXML += '               <tem:CHARACT>ZLINEA</tem:CHARACT>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.userData.turno+'</tem:VALUE_CHAR>';
        cadenaXML += '               <tem:CHARACT>ZTURNO</tem:CHARACT>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_VARIEDAD_ET</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].variedadRotulada.VALUE_CHAR+'</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_CALIBRE</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].calibre.VALUE_CHAR+'</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_CALIDAD</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].categoria.VALUE_CHAR+'</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>ZEMBALA</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>DDC</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>ZPRODUCTOR_ET</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].productorRotulado.VALUE_CHAR+'</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>ZSAG_CSP</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.userData.CSP+'</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        if($rootScope.dataSeleccion.especie.ATBEZ==="CAROZO"){
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>ZPLU</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].PLU.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_COLOR</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].color.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        }
        if($rootScope.dataSeleccion.especie.VALUE_CHAR=="UVAS"){
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>ZSAG_IDP</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].IDP.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>ZSAG_IDG</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].IDG.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_T</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].tipificacion.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        }
            cadenaXML += '            <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
            cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
            cadenaXML += '               <tem:BATCH></tem:BATCH>';
            cadenaXML += '               <tem:CHARACT>ZCLIENTE</tem:CHARACT>';
            cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].cliente.VALUE_CHAR+'</tem:VALUE_CHAR>';
            cadenaXML += '            </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_CARACT>';
        cadenaXML += '            </tem:LT_CARACT>';
        cadenaXML += '            <tem:LT_ITEMS>';
        //for (inx = 0; inx <= $rootScope.countTab; inx++) {
            cadenaXML += '               <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_ITEMS>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
            cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosPaletizaje.detalle[0].material.MATNR + '</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH></tem:BATCH>';
            cadenaXML += '                  <tem:QUANTITY>' + $rootScope.datosPaletizaje.detalle[0].cantidad + '</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT>'+$rootScope.datosPaletizaje.detalle[0].material.MEINS+'</tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>' + $rootScope.datosPaletizaje.detalle[0].fechaEmbalagePakingTab.value + '</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>'+$rootScope.userData.almacenGranel+'</tem:STGE_LOC>';
            cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
            cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
            cadenaXML += '                  <tem:MOVE_BATCH></tem:MOVE_BATCH>';
            cadenaXML += '                  <tem:BATCH_GRANEL>'+angular.uppercase($rootScope.dataSeleccion.loteProceso)+'</tem:BATCH_GRANEL>';
            cadenaXML += '                  <tem:ACCTASSCAT>'+$rootScope.dataSeleccion.ACCTASSCAT+'</tem:ACCTASSCAT>';
            cadenaXML += '               </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_ITEMS>';
            //<!--Zero or more repetitions:-->
        //}
        cadenaXML += '            </tem:LT_ITEMS>';
        cadenaXML += '            <tem:LT_ITEM_DEST>';
        cadenaXML += ' <tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_ITEM_DEST></tem:ZMOV_CREATE_RECEP_HU_FRESCO_C_LT_ITEM_DEST>'
        cadenaXML += '            </tem:LT_ITEM_DEST>';
        cadenaXML += ' </tem:datos>';
         cadenaXML += ' </tem:ZMOV_CREATE_RECEP_HU_FRESCO_C>';
        cadenaXML += '</soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);


        if ($rootScope.userData.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', IPSERVER +'/rfcNET.asmx', true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {
  
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingCajaEmabalda').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        
                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        var xmlData = $.parseXML(print);
                        console.log(xmlData);
                        var mensajeRespuesta1;
                        var mensajeRespuesta2;
                        try {
                            var thirdPartyNode = $(xmlData).find("E_EXIDV")[0];
                            var mensajeRespuesta4 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            
                            var thirdPartyNode = $(xmlData).find("E_MATERIALDOCUMENT")[0];
                            var mensajeRespuesta5 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));                            
                            
                            var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
                            var mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            
                            var thirdPartyNode = $(xmlData).find("PEDIDO")[0]; 
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            
                        } catch (e) {
                            mensajeRespuesta1 = '"No se generó documento material, favor consultar en SAP';
                        }

                        if (mensajeRespuesta1 == '<MATERIALDOCUMENT xmlns="http://tempuri.org/"/>') {
                            mensajeRespuesta1 = 'ERROR, No se generó documento material, favor consultar en SAP';
                        } 

                        var thirdPartyNode = $(xmlData).find("MESSAGE")[0]; //MESSAGE
                        var mensajeRespuesta3 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        
                        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Material Document 2:</h1> <p>' + mensajeRespuesta5 + '</p><h1>Pallet:</h1> <p>' + mensajeRespuesta4 + '</p><h1>Pedido:</h1><p>' + mensajeRespuesta2 + '</p><h1>Mensaje:</h1><p>' + mensajeRespuesta3 + '</p></div>';
                        
                    }
                    if (xmlhttp.status == 500) {
                        document.getElementById('loadingCajaEmabalda').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        document.getElementById('btnError').style.display = 'block';
                        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = 'El servidor rechazó recepción de datos!'
                        $rootScope.blockReEnvio = 0;
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
        $scope.navegacionPagina('PROD_FiltroProductor', 'fadeInRight', '/reset');
    }

})