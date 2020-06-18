appExpled.lazyController('crtPaletizar', function ($scope, $routeParams, $rootScope) 
{
    $rootScope.datoProductorDetalle ={
        
    }
    $rootScope.datosPaletizaje = {
        detalle:[]
    }
    $scope.cargaDatos = function (idx) {
        $rootScope.datosPaletizaje.detalle[idx] = {
            fechaEmbalagePakingTab: '',
            altura:'',
            material:'',
            palletCompleto:'NO',
            codigoPallet:'',
            productorRotulado:'',
            selFechaContabilizacion:'',
            calibre:'',
            variedadRotulada:{VALUE_CHAR:''}
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
    $scope.selFechaContabilizacionOpciones = [
        { value: $scope.mostrarFecha(0), name: $scope.mostrarFecha(0) }
    ];
    $scope.selFechaContabilizacionOpciones2 = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha(-1) },
        { value: $scope.mostrarFecha(0), name: $scope.mostrarFecha(0) }
    ];
    $rootScope.listarAltura =[];
    angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.VEGR4, function(value,key){
            $scope.listarAltura.push({DESCRIPTION:value.BEZEI,VALUE_CHAR:value.VEGR4});
    })
    $scope.Chnge = function(){
        //console.log($rootScope.datosPaletizaje.palletCompleto)
     };
     $scope.listarMaterial=[];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function(value,key){
        if(value.MTART=="FERT" && value.ZMAT_ESPECIE==$rootScope.dataSeleccion.especie.VALUE_CHAR){
            $scope.listarMaterial.push({MAKTG:value.MAKTG,MATNR:value.MATNR,KG:value.NTGEW});
        }
    })
    
    $scope.listarProductor = [];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PRODUCT, function (value,key){
        if(value.ESPECIE == $rootScope.dataSeleccion.especie.VALUE_CHAR){
            $scope.listarProductor.push({DESCRIPTION:value.NAME1,VALUE_CHAR:value.LIFNR})
        }
    })
    $scope.listarCalibre = [];
    angular.forEach($rootScope.ZMOV_QUERY_GRUPO_CATE, function (value,key){
        $scope.listarCalibre.push({DESCRIPTION:value.DESCRIPTION,VALUE_CHAR:value.VALUE_CHAR})
    })
    $scope.listarVariedad = [];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_VAR, function (value, key) {
        if(value.ESPECIE ===  $rootScope.dataSeleccion.especie.VALUE_CHAR){
            $scope.listarVariedad.push({DESCRIPTION: value.VAR, VALUE_CHAR: value.COD_VAR})
        }
     });
    $scope.listarMercado = [];
    angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.VEGR5 , function(value,key){
            $scope.listarMercado.push({DESCRIPTION:value.BEZEI ,VALUE_CHAR:value.VEGR5});
    })
    $scope.validaFormRecep = function (){
            jsonValidate = [
                {campo:"Codigo Pallet",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].codigoPallet,type:"input"},
                {campo:"Altura",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].altura,type:"aSelect",index:"VALUE_CHAR"},
                {campo:"Fecha Contabilización",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].selFechaContabilizacion,type:"aSelect",index:"value"},
                {campo:"Productor Rotulado",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].productorRotulado,type:"aSelect",index:"VALUE_CHAR"},
                {campo:"Variedad Rotulada",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].variedadRotulada,type:"aSelect",index:"VALUE_CHAR"},
                {campo:"Fecha de embalaje",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab,type:"aSelect",index:"value"},
                {campo:"Material",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material,type:"aSelect",index:"MATNR"},
                {campo:"Lote Packing",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].lotePacking,type:"input"},
                {campo:"Calibre",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].calibre,type:"aSelect",index:"VALUE_CHAR"},
                {campo:"Mercado",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].cantidad,type:"input"},
            ];
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
        $('#embalajeLoteTab1').val($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].lotePacking);
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
        $rootScope.blockReEnvio =1;

        document.getElementById('btnContinuar_').style.display = 'none';
        $scope.btnGeneraXML = 'none';
        document.getElementById('btnError').style.display = 'none';
        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
        $('#cargandoDatosSAP').show();
        $scope.mostrarRespuesta(true);

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
        cadenaXML += '               <tem:BUKRS>' + $rootScope.datoUsuario.sociedad + '</tem:BUKRS>';
        cadenaXML += '               <tem:EKORG>' + $rootScope.datoUsuario.organizacion + '</tem:EKORG>';
        cadenaXML += '               <tem:EKGRP>' + $rootScope.datoUsuario.grupoCompra + '</tem:EKGRP>';
        cadenaXML += '               <tem:BSART>NB</tem:BSART>';
        cadenaXML += '               <tem:BUDAT>'+$rootScope.datosPaletizaje.detalle[0].selFechaContabilizacion.value+'</tem:BUDAT>';
        cadenaXML += '               <tem:LIFNR>' + $rootScope.setDatosProductor.LIFNR + '</tem:LIFNR>';
        cadenaXML += '               <tem:XBLNR>' + $rootScope.eliminaUndefined($rootScope.datoGeneralCajaEmbalada.embalajeGuia) + '</tem:XBLNR>';
        cadenaXML += '               <tem:BKTXT>tablet</tem:BKTXT>';
        cadenaXML += '            </tem:HEADER>';
        cadenaXML += '            <tem:HEADER_HU>';
        cadenaXML += '               <tem:PACK_MAT>' + $rootScope.datoUsuario.sociedad + '</tem:PACK_MAT>';
        cadenaXML += '               <tem:HU_EXID>' + $rootScope.datosPaletizaje.detalle[0].codigoPallet + '</tem:HU_EXID>';
        cadenaXML += '               <tem:EXT_ID_HU_2>' + $rootScope.datoUsuario.grupoCompra + '</tem:EXT_ID_HU_2>';
        cadenaXML += '               <tem:CONTENT>NB</tem:CONTENT>';
        cadenaXML += '               <tem:PACK_MAT_CUSTOMER>'+auxBUDAT+'</tem:PACK_MAT_CUSTOMER>';
        cadenaXML += '               <tem:PACKAGE_CAT>' + $rootScope.setDatosProductor.LIFNR + '</tem:PACKAGE_CAT>';
        cadenaXML += '               <tem:KZGVH>' + $rootScope.datosPaletizaje.detalle[0].palletCompleto + '</tem:KZGVH>';
        cadenaXML += '               <tem:HU_GRP1></tem:HU_GRP1>';
        cadenaXML += '               <tem:HU_GRP2></tem:HU_GRP2>';
        cadenaXML += '               <tem:HU_GRP3></tem:HU_GRP3>';
        cadenaXML += '               <tem:HU_GRP4>'+$rootScope.datosPaletizaje.detalle[0].altura +'</tem:HU_GRP4>';
        cadenaXML += '               <tem:HU_GRP5></tem:HU_GRP5>';
        cadenaXML += '               <tem:LGORT_DS></tem:LGORT_DS>';
        cadenaXML += '            </tem:HEADER_HU>';
        cadenaXML += '            <tem:LOG>';
        cadenaXML += '            </tem:LOG>';
        cadenaXML += '            <tem:LT_CARACT>';
        var arrCaract= ['variedadSel','huertoSel','sectorSel'];
        for (inx = 0; inx <= $rootScope.countTab; inx++) {
            angular.forEach(arrCaract,function(value,key){
                var caracteristica = "";
                var value_char="";
                cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
                cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosTabCajaEmbalada[inx].materialSel.VALUE_CHAR)+'</tem:MATERIAL>';
                cadenaXML += '               <tem:BATCH>'+angular.uppercase($rootScope.datosTabCajaEmbalada[inx].embalajeLoteTab1)+'</tem:BATCH>';
                caracteristica= $rootScope.datosTabCajaEmbalada[inx][value].ATNAM;
                value_char= $rootScope.datosTabCajaEmbalada[inx][value].VALUE_CHAR;
                cadenaXML += '               <tem:CHARACT>'+caracteristica+'</tem:CHARACT>';
                cadenaXML += '               <tem:VALUE_CHAR>'+value_char+'</tem:VALUE_CHAR>';
                cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
            })
        }
        cadenaXML += '            </tem:LT_CARACT>';
        cadenaXML += '            <tem:LT_ITEMS>';
        //for (inx = 0; inx <= $rootScope.countTab; inx++) {
            cadenaXML += '               <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_ITEMS>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
            cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosPaletizaje.detalle[0].material.MATNR + '</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].lotePacking) + '</tem:BATCH>';
            cadenaXML += '                  <tem:QUANTITY>' + $rootScope.datosTabCajaEmbalada[inx].embalajeCaja + '</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT>CS</tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>' + $rootScope.datosPaletizaje.detalle[0].fechaEmbalagePakingTab + '</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>' + $rootScope.datoUsuario.centro + '</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>0001</tem:STGE_LOC>';
            cadenaXML += '                  <tem:FREE_ITEM></tem:FREE_ITEM>';
            cadenaXML += '                  <tem:TAX_CODE>' + $rootScope.datoUsuario.iva + '</tem:TAX_CODE>';
            cadenaXML += '                  <tem:ABLAD>'+$rootScope.setDatosProductor.LIFNR+'H'+$rootScope.datosTabCajaEmbalada[inx].huertoSel.VALUE_CHAR+'S'+$rootScope.datosTabCajaEmbalada[inx].sectorSel.VALUE_CHAR+'</tem:ABLAD>';
            cadenaXML += '               </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_ITEMS>';
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
        console.log(cadenaXML)


        /// VALIDAR ENVIO POR USUARIO DEMO OFLINE
        if ($rootScope.datoUsuario.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', 'http://'+ IPSERVER +'/rfcNET.asmx', true);
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
                        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Pedido:</h1><p>' + mensajeRespuesta2 + '</p><h1>Mensaje:</h1><p>' + mensajeRespuesta3 + '</p></div>';
                        
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